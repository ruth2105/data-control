const SHEET_ID = '1lVTpBiw6LfSatgIMSOEpT6zG_5UVd3c_HzSTZxHGEzY';

const HEADERS = [
  'id','submittedAt','fillDate','salesPerson','hospitalName','hospitalAddress',
  'visitingName','position','department','visitTime','visitLocation','phone',
  'hospitalType','doctorsOnDuty','doctorsPartTime','visitType','visitPurpose',
  'objectiveAchievement','otherBrand1','otherOrigin1','otherBrand2','otherOrigin2',
  'otherBrand3','otherOrigin3','wondfostockName','wondfostockQty',
  'elecBrand','elecOrigin','elecDaily','elecPrice',
  'bioBrand','bioOrigin','bioFull','bioSemi','bioDaily','bioPrice',
  'hemBrand','hemOrigin','hemDaily','hemPrice',
  'tubeBrand','tubeOrigin','tubeQty','tubePrice','tubeColor',
  'btBrand','btOrigin','btQtyPrice',
  'needleBrand','needleOrigin','needleQty','needleModel','needlePrice',
  'nwBrand','nwOrigin','nwQty','nwPrice',
  'pfBrand','pfOrigin','pfQty','pfPrice',
  'equipNeeds','medicationHabits','fluidMedicine','medicationHabits2',
  'customerCategory','customerPotential','visitProgress','nextVisitDate','nextVisitTarget'
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheets()[0];

    // Ensure headers row exists
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    const action = data.action || 'insert';

    if (action === 'delete') {
      // Find row by id and delete it
      const idCol = 1; // 'id' is first column
      const lastRow = sheet.getLastRow();
      for (let i = 2; i <= lastRow; i++) {
        if (String(sheet.getRange(i, idCol).getValue()) === String(data.id)) {
          sheet.deleteRow(i);
          break;
        }
      }
      return ok();
    }

    if (action === 'update') {
      // Find row by id and update it
      const idCol = 1;
      const lastRow = sheet.getLastRow();
      for (let i = 2; i <= lastRow; i++) {
        if (String(sheet.getRange(i, idCol).getValue()) === String(data.id)) {
          const row = HEADERS.map(h => {
            const v = data[h];
            return Array.isArray(v) ? v.join(', ') : (v !== undefined ? v : sheet.getRange(i, HEADERS.indexOf(h)+1).getValue());
          });
          sheet.getRange(i, 1, 1, row.length).setValues([row]);
          return ok();
        }
      }
      return ok(); // not found, ignore
    }

    // Default: insert new row
    const row = HEADERS.map(h => {
      const v = data[h];
      return Array.isArray(v) ? v.join(', ') : (v || '');
    });
    sheet.appendRow(row);
    return ok();

  } catch(err) {
    return err_(err.message);
  }
}

function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheets()[0];
    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({status:'ok',data:[]}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      return obj;
    }).reverse();
    return ContentService.createTextOutput(JSON.stringify({status:'ok',data}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return err_(err.message);
  }
}

function ok() {
  return ContentService.createTextOutput(JSON.stringify({status:'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}
function err_(msg) {
  return ContentService.createTextOutput(JSON.stringify({status:'error',message:msg}))
    .setMimeType(ContentService.MimeType.JSON);
}

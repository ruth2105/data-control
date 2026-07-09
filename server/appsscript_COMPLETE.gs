// ============================================
// COMPLETE GOOGLE APPS SCRIPT FOR FREMENATOS
// ============================================
// Replace your current Apps Script with this
// ============================================

const SHEET_ID = '1lVTpBiw6LfSatgIMSOEpT6zG_5UVd3c_HzSTZxHGEzY'; // Your existing sheet ID

// ===================== MAIN HANDLERS =====================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    // Route to appropriate handler based on action
    if (action === 'getCustomers') return getCustomers();
    if (action === 'updateCustomer') return updateCustomer(data);
    if (action === 'getUsers') return getUsers();
    if (action === 'registerUser') return registerUser(data);
    if (action === 'approveUser') return approveUser(data);
    if (action === 'addUser') return addUser(data);
    if (action === 'updateUser') return updateUser(data);
    if (action === 'deleteUser') return deleteUser(data);
    if (action === 'getVisitReports') return getVisitReports();
    if (action === 'addVisitReport') return addVisitReport(data);
    if (action === 'updateVisitReport') return updateVisitReport(data);
    if (action === 'deleteVisitReport') return deleteVisitReport(data);
    if (action === 'authenticate') return authenticate(data);
    
    // Legacy visit report actions (for backward compatibility)
    if (action === 'insert') return addVisitReport(data);
    if (action === 'update') return updateVisitReport(data);
    if (action === 'delete') return deleteVisitReport(data);
    
    return error_('Unknown action: ' + action);
    
  } catch(err) {
    return error_(err.message + '\n' + err.stack);
  }
}

function doPostLegacy(e) {
  return doPost(e);
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getCustomers') return getCustomers();
    if (action === 'getUsers') return getUsers();
    if (action === 'getVisitReports') return getVisitReports();
    
    // Default: return visit reports (legacy)
    return getVisitReports();
    
  } catch(err) {
    return error_(err.message);
  }
}

// ===================== CUSTOMER FUNCTIONS =====================

function getCustomers() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Customers');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('Customers');
      const headers = ['id','name','nameZh','city','cityZh','model','contact','phone','email','doctor',
                       'lastVisit','teamId','potential','notes','address','specialty','type','createdAt','updatedAt'];
      sheet.appendRow(headers);
      return success_([]);
    }
    
    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) return success_([]);
    
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = row[i] === '' ? null : row[i];
      });
      return obj;
    });
    
    return success_(data);
    
  } catch(err) {
    return error_(err.message);
  }
}

function updateCustomer(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Customers');
    
    if (!sheet) {
      return error_('Customers sheet not found');
    }
    
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];
    const customerId = data.id;
    
    // Find row with matching ID
    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === String(customerId)) {
        rowIndex = i + 1; // Sheet rows are 1-indexed
        break;
      }
    }
    
    if (rowIndex === -1) {
      // Customer not found, add new row
      data.createdAt = new Date().toISOString();
      data.updatedAt = new Date().toISOString();
      const row = headers.map(h => data[h] || '');
      sheet.appendRow(row);
    } else {
      // Update existing row
      data.updatedAt = new Date().toISOString();
      const row = headers.map(h => {
        return data[h] !== undefined ? data[h] : rows[rowIndex-1][headers.indexOf(h)];
      });
      sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
    }
    
    return success_({message: 'Customer updated'});
    
  } catch(err) {
    return error_(err.message);
  }
}

// ===================== USER FUNCTIONS =====================

function getUsers() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Users');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('Users');
      const headers = ['username','password','role','teamId','name','nameZh','createdAt','lastLogin','status','phone','email','preferredTeam','registeredAt'];
      sheet.appendRow(headers);
      
      // Add default admin user
      sheet.appendRow(['admin', 'admin123', 'admin', '', 'Administrator', '管理员', new Date().toISOString(), '', 'active', '', '', '', '']);
      
      return success_([{username:'admin',role:'admin',name:'Administrator',status:'active'}]);
    }
    
    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) return success_([]);
    
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = row[i] === '' ? null : row[i];
      });
      // Don't return password in list
      delete obj.password;
      return obj;
    });
    
    return success_(data);
    
  } catch(err) {
    return error_(err.message);
  }
}

function authenticate(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('Users');
    
    if (!sheet) return error_('Users sheet not found');
    
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];
    const username = data.username;
    const password = data.password;
    
    // Find matching user
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const user = {};
      headers.forEach((h, idx) => user[h] = row[idx]);
      
      if (user.username === username && user.password === password) {
        // Update last login
        const rowNum = i + 1;
        const lastLoginCol = headers.indexOf('lastLogin') + 1;
        sheet.getRange(rowNum, lastLoginCol).setValue(new Date().toISOString());
        
        // Return user info (without password)
        return success_({
          username: user.username,
          role: user.role,
          teamId: user.teamId,
          name: user.name,
          nameZh: user.nameZh
        });
      }
    }
    
    return error_('Invalid username or password');
    
  } catch(err) {
    return error_(err.message);
  }
}

function addUser(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('Users');
    
    if (!sheet) return error_('Users sheet not found');
    
    const headers = ['username','password','role','teamId','name','nameZh','createdAt','lastLogin','status','phone','email','preferredTeam','registeredAt'];
    data.createdAt = new Date().toISOString();
    data.lastLogin = '';
    if (!data.status) data.status = 'active';
    
    const row = headers.map(h => data[h] || '');
    sheet.appendRow(row);
    
    return success_({message: 'User added'});
    
  } catch(err) {
    return error_(err.message);
  }
}

function registerUser(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Users');
    
    if (!sheet) {
      sheet = ss.insertSheet('Users');
      const headers = ['username','password','role','teamId','name','nameZh','createdAt','lastLogin','status','phone','email','preferredTeam','registeredAt'];
      sheet.appendRow(headers);
    }
    
    const rows = sheet.getDataRange().getValues();
    if (rows.length > 1) {
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][0] === data.username) {
          return error_('Username already exists');
        }
      }
    }
    
    const headers = ['username','password','role','teamId','name','nameZh','createdAt','lastLogin','status','phone','email','preferredTeam','registeredAt'];
    data.role = 'sales';
    data.teamId = '';
    data.createdAt = new Date().toISOString();
    data.lastLogin = '';
    data.status = 'pending';
    if (!data.registeredAt) data.registeredAt = new Date().toISOString();
    
    const row = headers.map(h => data[h] || '');
    sheet.appendRow(row);
    
    return success_({message: 'Registration submitted', user: data});
    
  } catch(err) {
    return error_(err.message);
  }
}

function approveUser(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('Users');
    
    if (!sheet) return error_('Users sheet not found');
    
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];
    const statusCol = headers.indexOf('status') + 1;
    const teamIdCol = headers.indexOf('teamId') + 1;
    
    // Find user row
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === data.username) {
        const rowNum = i + 1;
        sheet.getRange(rowNum, statusCol).setValue('active');
        if (data.teamId) {
          sheet.getRange(rowNum, teamIdCol).setValue(data.teamId);
        }
        return success_({message: 'User approved'});
      }
    }
    
    return error_('User not found');
    
  } catch(err) {
    return error_(err.message);
  }
}

function updateUser(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('Users');
    
    if (!sheet) return error_('Users sheet not found');
    
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];
    
    // Find user row
    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === data.username) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex === -1) return error_('User not found');
    
    // Update row
    const row = headers.map(h => {
      return data[h] !== undefined ? data[h] : rows[rowIndex-1][headers.indexOf(h)];
    });
    sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
    
    return success_({message: 'User updated'});
    
  } catch(err) {
    return error_(err.message);
  }
}

function deleteUser(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Users');

    if (!sheet) {
      sheet = ss.insertSheet('Users');
      const headers = ['username','password','role','teamId','name','nameZh','createdAt','lastLogin','status','phone','email','preferredTeam','registeredAt'];
      sheet.appendRow(headers);
      return success_({message: 'Users sheet created, nothing to delete'});
    }

    const rows = sheet.getDataRange().getValues();

    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === String(data.username)) {
        sheet.deleteRow(i + 1);
        return success_({message: 'User deleted'});
      }
    }

    return error_('User not found');

  } catch(err) {
    return error_(err.message);
  }
}

// ===================== VISIT REPORT FUNCTIONS =====================

const VISIT_HEADERS = [
  'id','submittedAt','fillDate','salesPerson','teamId','hospitalName','hospitalAddress',
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
  'equipNeeds','medicationHabits','fluidMedicine','medicationHabits2',
  'customerCategory','customerPotential','visitProgress','nextVisitDate','nextVisitTarget',
  'discussionNotes','currentEquipment','outcome','orders'
];

function getVisitReports() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('VisitReports');
    
    // Try legacy name if not found
    if (!sheet) {
      sheet = ss.getSheets()[0];
      if (sheet.getName() !== 'VisitReports') {
        sheet.setName('VisitReports');
      }
    }
    
    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) return success_([]);
    
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = row[i] === '' ? null : row[i];
      });
      return obj;
    }).reverse();
    
    return success_(data);
    
  } catch(err) {
    return error_(err.message);
  }
}

function addVisitReport(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('VisitReports');
    
    if (!sheet) {
      sheet = ss.getSheets()[0];
      sheet.setName('VisitReports');
    }
    
    // Ensure headers exist
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(VISIT_HEADERS);
    }
    
    // Add submission timestamp and ID if not present
    if (!data.submittedAt) data.submittedAt = new Date().toISOString();
    if (!data.id) data.id = 'V' + Date.now();
    
    const row = VISIT_HEADERS.map(h => {
      const v = data[h];
      return Array.isArray(v) ? v.join(', ') : (v || '');
    });
    sheet.appendRow(row);
    
    return success_({message: 'Visit report added', id: data.id});
    
  } catch(err) {
    return error_(err.message);
  }
}

function updateVisitReport(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('VisitReports') || ss.getSheets()[0];
    
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];
    
    // Find report by ID
    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === String(data.id)) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex === -1) return error_('Report not found');
    
    // Update row
    const row = VISIT_HEADERS.map(h => {
      const v = data[h];
      if (v !== undefined) {
        return Array.isArray(v) ? v.join(', ') : v;
      }
      return rows[rowIndex-1][VISIT_HEADERS.indexOf(h)] || '';
    });
    sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
    
    return success_({message: 'Visit report updated'});
    
  } catch(err) {
    return error_(err.message);
  }
}

function deleteVisitReport(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('VisitReports') || ss.getSheets()[0];
    
    const rows = sheet.getDataRange().getValues();
    
    // Find and delete report
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === String(data.id)) {
        sheet.deleteRow(i + 1);
        return success_({message: 'Visit report deleted'});
      }
    }
    
    return error_('Report not found');
    
  } catch(err) {
    return error_(err.message);
  }
}

// ===================== HELPER FUNCTIONS =====================

function success_(data) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    data: data
  })).setMimeType(ContentService.MimeType.JSON);
}

function error_(message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}

// ===================== INITIALIZE FUNCTION =====================
// Run this once to set up all sheets

function initializeSheets() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  // Create Customers sheet
  let customersSheet = ss.getSheetByName('Customers');
  if (!customersSheet) {
    customersSheet = ss.insertSheet('Customers');
    const headers = ['id','name','nameZh','city','cityZh','model','contact','phone','email','doctor',
                     'lastVisit','teamId','potential','notes','address','specialty','type','createdAt','updatedAt'];
    customersSheet.appendRow(headers);
    Logger.log('✅ Customers sheet created');
  }
  
  // Create Users sheet
  let usersSheet = ss.getSheetByName('Users');
  if (!usersSheet) {
    usersSheet = ss.insertSheet('Users');
    const headers = ['username','password','role','teamId','name','nameZh','createdAt','lastLogin'];
    usersSheet.appendRow(headers);
    
    // Add default admin
    usersSheet.appendRow(['admin', 'admin123', 'admin', '', 'Administrator', '管理员', new Date().toISOString(), '']);
    
    Logger.log('✅ Users sheet created with admin user');
  }
  
  // Create or rename VisitReports sheet
  let reportsSheet = ss.getSheetByName('VisitReports');
  if (!reportsSheet) {
    reportsSheet = ss.getSheets()[0];
    reportsSheet.setName('VisitReports');
    Logger.log('✅ VisitReports sheet created/renamed');
  }
  
  Logger.log('✅ All sheets initialized successfully!');
}

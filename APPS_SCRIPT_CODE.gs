// Google Apps Script for Hospital Management System
// Deploy as Web App with access: "Anyone"

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydEed-7vDffnAsL6knmhie8pxspuv311KE6c81WH20Pr5K4U8QBXidcBKr3YqN_OSJ/exec";

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const params = e.parameter;
    const action = params.action;
    const data = e.postData ? JSON.parse(e.postData.contents) : {};
    
    let result = {};
    
    switch(action) {
      case 'getUsers':
        result = getUsers();
        break;
      case 'saveUser':
        result = saveUser(data);
        break;
      case 'deleteUser':
        result = deleteUser(data);
        break;
      case 'authenticate':
        result = authenticateUser(data);
        break;
      case 'getCustomers':
        result = getCustomers();
        break;
      case 'saveCustomer':
        result = saveCustomer(data);
        break;
      case 'deleteCustomer':
        result = deleteCustomer(data);
        break;
      case 'getVisitReports':
        result = getVisitReports();
        break;
      case 'saveVisitReport':
        result = saveVisitReport(data);
        break;
      case 'deleteVisitReport':
        result = deleteVisitReport(data);
        break;
      case 'getPotentialCustomers':
        result = getPotentialCustomers();
        break;
      case 'savePotentialCustomer':
        result = savePotentialCustomer(data);
        break;
      case 'deletePotentialCustomer':
        result = deletePotentialCustomer(data);
        break;
      case 'getFacilitySummaries':
        result = getFacilitySummaries();
        break;
      case 'saveFacilitySummary':
        result = saveFacilitySummary(data);
        break;
      case 'getAnnouncements':
        result = getAnnouncements();
        break;
      case 'saveAnnouncement':
        result = saveAnnouncement(data);
        break;
      case 'deleteAnnouncement':
        result = deleteAnnouncement(data);
        break;
      default:
        result = {success: false, error: 'Invalid action'};
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Helper function to get sheet by name
function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

// Helper function to get headers from sheet
function getHeaders(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow === 0) return [];
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

// Helper function to convert row to object
function rowToObject(headers, row) {
  const obj = {};
  headers.forEach((header, index) => {
    obj[header] = row[index];
  });
  return obj;
}

// Helper function to convert object to row
function objectToRow(headers, obj) {
  return headers.map(header => obj[header] || '');
}

// USERS
function getUsers() {
  const sheet = getSheet('Users');
  const headers = getHeaders(sheet);
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  return {success: true, data: data.map(row => rowToObject(headers, row))};
}

function saveUser(userData) {
  const sheet = getSheet('Users');
  const headers = getHeaders(sheet);
  
  if (headers.length === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  
  const existingData = getUsers().data;
  const existingIndex = existingData.findIndex(u => u.username === userData.username);
  
  if (existingIndex >= 0) {
    // Update existing user
    sheet.getRange(existingIndex + 2, 1, 1, headers.length).setValues([objectToRow(headers, userData)]);
  } else {
    // Add new user
    sheet.appendRow(objectToRow(headers, userData));
  }
  
  return {success: true};
}

function deleteUser(userData) {
  const sheet = getSheet('Users');
  const data = getUsers().data;
  const index = data.findIndex(u => u.username === userData.username);
  
  if (index >= 0) {
    sheet.deleteRow(index + 2);
  }
  
  return {success: true};
}

function authenticateUser(credentials) {
  const users = getUsers().data;
  const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
  
  if (user) {
    return {success: true, user: user};
  } else {
    return {success: false, error: 'Invalid credentials'};
  }
}

// CUSTOMERS
function getCustomers() {
  const sheet = getSheet('Customers');
  const headers = getHeaders(sheet);
  if (sheet.getLastRow() <= 1) return {success: true, data: []};
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  return {success: true, data: data.map(row => rowToObject(headers, row))};
}

function saveCustomer(customerData) {
  const sheet = getSheet('Customers');
  let headers = getHeaders(sheet);
  
  if (headers.length === 0) {
    headers = ['id','name','nameZh','city','cityZh','model','contact','phone','email','doctor','lastVisit','teamId','potential','notes','address','specialty','type','createdAt','updatedAt'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  
  const existingData = getCustomers().data;
  const existingIndex = existingData.findIndex(c => c.id === customerData.id);
  
  if (existingIndex >= 0) {
    sheet.getRange(existingIndex + 2, 1, 1, headers.length).setValues([objectToRow(headers, customerData)]);
  } else {
    sheet.appendRow(objectToRow(headers, customerData));
  }
  
  return {success: true};
}

function deleteCustomer(customerData) {
  const sheet = getSheet('Customers');
  const data = getCustomers().data;
  const index = data.findIndex(c => c.id === customerData.id);
  
  if (index >= 0) {
    sheet.deleteRow(index + 2);
  }
  
  return {success: true};
}

// VISIT REPORTS
function getVisitReports() {
  const sheet = getSheet('VisitReports');
  const headers = getHeaders(sheet);
  if (sheet.getLastRow() <= 1) return {success: true, data: []};
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  return {success: true, data: data.map(row => rowToObject(headers, row))};
}

function saveVisitReport(reportData) {
  const sheet = getSheet('VisitReports');
  let headers = getHeaders(sheet);
  
  if (headers.length === 0) {
    headers = ['id','submittedAt','fillDate','salesPerson','teamId','hospitalName','hospitalAddress','visitingName','position','department','visitTime','visitLocation','phone','hospitalType','doctorsOnDuty','doctorsPartTime','visitType','visitPurpose','objectiveAchievement','otherBrand1','otherOrigin1','otherBrand2','otherOrigin2','otherBrand3','otherOrigin3','wondfostockName','wondfostockQty','elecBrand','elecOrigin','elecDaily','elecPrice','bioBrand','bioOrigin','bioFull','bioSemi','bioDaily','bioPrice','hemBrand','hemOrigin','hemDaily','hemPrice','tubeBrand','tubeOrigin','tubeQty','tubePrice','tubeColor','btBrand','btOrigin','btQtyPrice','needleBrand','needleOrigin','needleQty','needleModel','needlePrice','equipNeeds','medicationHabits','fluidMedicine','medicationHabits2','customerCategory','customerPotential','visitProgress','nextVisitDate','nextVisitTarget','discussionNotes','currentEquipment','outcome','orders'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  
  const existingData = getVisitReports().data;
  const existingIndex = existingData.findIndex(r => r.id === reportData.id);
  
  if (existingIndex >= 0) {
    sheet.getRange(existingIndex + 2, 1, 1, headers.length).setValues([objectToRow(headers, reportData)]);
  } else {
    sheet.appendRow(objectToRow(headers, reportData));
  }
  
  return {success: true};
}

function deleteVisitReport(reportData) {
  const sheet = getSheet('VisitReports');
  const data = getVisitReports().data;
  const index = data.findIndex(r => r.id === reportData.id);
  
  if (index >= 0) {
    sheet.deleteRow(index + 2);
  }
  
  return {success: true};
}

// POTENTIAL CUSTOMERS
function getPotentialCustomers() {
  const sheet = getSheet('PotentialCustomers');
  const headers = getHeaders(sheet);
  if (sheet.getLastRow() <= 1) return {success: true, data: []};
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  return {success: true, data: data.map(row => rowToObject(headers, row))};
}

function savePotentialCustomer(potentialData) {
  const sheet = getSheet('PotentialCustomers');
  let headers = getHeaders(sheet);
  
  if (headers.length === 0) {
    headers = ['name','address','contact','phone','patientLoad','hormoneAnalyzer','chemAnalyzer','electrolyteAnalyzer','testTubes','status','notes','salesRep','fromVisit','teamId'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  
  sheet.appendRow(objectToRow(headers, potentialData));
  return {success: true};
}

function deletePotentialCustomer(potentialData) {
  const sheet = getSheet('PotentialCustomers');
  const data = getPotentialCustomers().data;
  const index = data.findIndex(p => p.name === potentialData.name && p.address === potentialData.address);
  
  if (index >= 0) {
    sheet.deleteRow(index + 2);
  }
  
  return {success: true};
}

// FACILITY SUMMARIES
function getFacilitySummaries() {
  const sheet = getSheet('FacilitySummaries');
  const headers = getHeaders(sheet);
  if (sheet.getLastRow() <= 1) return {success: true, data: []};
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  return {success: true, data: data.map(row => rowToObject(headers, row))};
}

function saveFacilitySummary(summaryData) {
  const sheet = getSheet('FacilitySummaries');
  let headers = getHeaders(sheet);
  
  if (headers.length === 0) {
    headers = ['hospitalName','summary'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  
  const existingData = getFacilitySummaries().data;
  const existingIndex = existingData.findIndex(s => s.hospitalName === summaryData.hospitalName);
  
  if (existingIndex >= 0) {
    sheet.getRange(existingIndex + 2, 1, 1, headers.length).setValues([objectToRow(headers, summaryData)]);
  } else {
    sheet.appendRow(objectToRow(headers, summaryData));
  }
  
  return {success: true};
}

// ANNOUNCEMENTS
function getAnnouncements() {
  const sheet = getSheet('Announcements');
  const headers = getHeaders(sheet);
  if (sheet.getLastRow() <= 1) return {success: true, data: []};
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  return {success: true, data: data.map(row => rowToObject(headers, row))};
}

function saveAnnouncement(announcementData) {
  const sheet = getSheet('Announcements');
  let headers = getHeaders(sheet);
  
  if (headers.length === 0) {
    headers = ['id','hospitalName','hospitalAddress','contact','phone','salesPerson','teamId','purchaseType','machineModel','status','notes','announcedAt','reportId','confirmedAt','confirmedBy','rejectReason'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  
  const existingData = getAnnouncements().data;
  const existingIndex = existingData.findIndex(a => a.id === announcementData.id);
  
  if (existingIndex >= 0) {
    sheet.getRange(existingIndex + 2, 1, 1, headers.length).setValues([objectToRow(headers, announcementData)]);
  } else {
    sheet.appendRow(objectToRow(headers, announcementData));
  }
  
  return {success: true};
}

function deleteAnnouncement(announcementData) {
  const sheet = getSheet('Announcements');
  const data = getAnnouncements().data;
  const index = data.findIndex(a => a.id === announcementData.id);
  
  if (index >= 0) {
    sheet.deleteRow(index + 2);
  }
  
  return {success: true};
}

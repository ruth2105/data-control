// ============================================
// COMPLETE GOOGLE APPS SCRIPT
// Visit Reports + User Management
// ============================================
// INSTRUCTIONS:
// 1. Select ALL code below (Ctrl+A)
// 2. Copy it (Ctrl+C)
// 3. Go to Apps Script editor
// 4. Select all existing code and delete it
// 5. Paste this code
// 6. Click Save (💾)
// 7. Deploy → Manage deployments → Edit → New version → Deploy
// 8. Run initializeSheets() function ONCE
// ============================================

const SHEET_ID = '1lVTpBiw6LfSatgIMSOEpT6zG_5UVd3c_HzSTZxHGEzY';

// ===================== MAIN HANDLERS =====================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    // Route to appropriate handler
    if (action === 'getCustomers') return getCustomers();
    if (action === 'updateCustomer') return updateCustomer(data);
    if (action === 'getUsers') return getUsers();
    if (action === 'registerUser') return registerUser(data);
    if (action === 'approveUser') return approveUser(data);
    if (action === 'addUser') return addUser(data);
    if (action === 'updateUser') return updateUser(data);
    if (action === 'deleteUser') return deleteUser(data);
    if (action === 'authenticate') return authenticate(data);
    
    // Visit report actions
    if (action === 'getVisitReports') return getVisitReports();
    if (action === 'addVisitReport') return addVisitReport(data);
    if (action === 'updateVisitReport') return updateVisitReport(data);
    if (action === 'deleteVisitReport') return deleteVisitReport(data);
    
    // Legacy actions
    if (action === 'insert') return addVisitReport(data);
    if (action === 'update') return updateVisitReport(data);
    if (action === 'delete') return deleteVisitReport(data);
    
    return error_('Unknown action: ' + action);
    
  } catch(err) {
    return error_(err.message + '\n' + err.stack);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getCustomers') return getCustomers();
    if (action === 'getUsers') return getUsers();
    if (action === 'getVisitReports') return getVisitReports();
    
    // Default: return visit reports
    return getVisitReports();
    
  } catch(err) {
    return error_(err.message);
  }
}

// ===================== USER MANAGEMENT FUNCTIONS =====================

function getUsers() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Users');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      return error_('Users sheet not found. Run initializeSheets() function first.');
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

function registerUser(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Users');
    
    if (!sheet) {
      return error_('Users sheet not found. Run initializeSheets() function first.');
    }
    
    // Check if username already exists
    const rows = sheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === data.username) {
        return error_('Username already exists');
      }
    }
    
    // Add new user with pending status
    const headers = ['username','password','role','teamId','name','nameZh','createdAt','lastLogin','status','phone','email','preferredTeam','registeredAt'];
    data.role = 'sales';
    data.teamId = '';
    data.createdAt = new Date().toISOString();
    data.lastLogin = '';
    data.status = 'pending';
    if (!data.registeredAt) data.registeredAt = new Date().toISOString();
    
    const row = headers.map(h => data[h] || '');
    sheet.appendRow(row);
    
    return success_({message: 'Registration submitted'});
    
  } catch(err) {
    return error_(err.message);
  }
}

function approveUser(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('Users');
    
    if (!sheet) {
      return error_('Users sheet not found');
    }
    
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
    
    if (!sheet) {
      return error_('Users sheet not found');
    }
    
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
    const sheet = ss.getSheetByName('Users');
    
    if (!sheet) {
      return error_('Users sheet not found');
    }
    
    const rows = sheet.getDataRange().getValues();
    
    // Find and delete user row
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === data.username) {
        sheet.deleteRow(i + 1);
        return success_({message: 'User deleted'});
      }
    }
    
    return error_('User not found');
    
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
        // Check if active
        if (user.status !== 'active') {
          return error_('Account pending approval');
        }
        
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
    
    // Try legacy sheet names
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
    }
    
    // Ensure headers exist
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(VISIT_HEADERS);
    }
    
    const row = VISIT_HEADERS.map(h => {
      const v = data[h];
      return Array.isArray(v) ? v.join(', ') : (v || '');
    });
    sheet.appendRow(row);
    
    return success_({message: 'Visit report added'});
    
  } catch(err) {
    return error_(err.message);
  }
}

function updateVisitReport(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('VisitReports');
    
    if (!sheet) {
      sheet = ss.getSheets()[0];
    }
    
    const idCol = 1;
    const lastRow = sheet.getLastRow();
    
    for (let i = 2; i <= lastRow; i++) {
      if (String(sheet.getRange(i, idCol).getValue()) === String(data.id)) {
        const row = VISIT_HEADERS.map(h => {
          const v = data[h];
          return Array.isArray(v) ? v.join(', ') : (v !== undefined ? v : sheet.getRange(i, VISIT_HEADERS.indexOf(h)+1).getValue());
        });
        sheet.getRange(i, 1, 1, row.length).setValues([row]);
        return success_({message: 'Visit report updated'});
      }
    }
    
    return error_('Visit report not found');
    
  } catch(err) {
    return error_(err.message);
  }
}

function deleteVisitReport(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('VisitReports');
    
    if (!sheet) {
      sheet = ss.getSheets()[0];
    }
    
    const idCol = 1;
    const lastRow = sheet.getLastRow();
    
    for (let i = 2; i <= lastRow; i++) {
      if (String(sheet.getRange(i, idCol).getValue()) === String(data.id)) {
        sheet.deleteRow(i);
        return success_({message: 'Visit report deleted'});
      }
    }
    
    return error_('Visit report not found');
    
  } catch(err) {
    return error_(err.message);
  }
}

// ===================== CUSTOMER FUNCTIONS (Placeholder) =====================

function getCustomers() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Customers');
    
    if (!sheet) {
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
    return success_({message: 'Customer update not implemented yet'});
  } catch(err) {
    return error_(err.message);
  }
}

// ===================== INITIALIZATION =====================

function initializeSheets() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    
    // Create Users sheet if it doesn't exist
    let usersSheet = ss.getSheetByName('Users');
    if (!usersSheet) {
      usersSheet = ss.insertSheet('Users');
      const headers = ['username','password','role','teamId','name','nameZh','createdAt','lastLogin','status','phone','email','preferredTeam','registeredAt'];
      usersSheet.appendRow(headers);
      
      // Add default admin user
      usersSheet.appendRow(['admin', 'admin123', 'admin', '', 'Administrator', '管理员', new Date().toISOString(), '', 'active', '', '', '', '']);
      
      Logger.log('✅ Users sheet created with admin account');
    } else {
      Logger.log('ℹ️ Users sheet already exists');
    }
    
    // Ensure VisitReports sheet exists
    let visitSheet = ss.getSheetByName('VisitReports');
    if (!visitSheet) {
      visitSheet = ss.getSheets()[0];
      visitSheet.setName('VisitReports');
      Logger.log('✅ Renamed first sheet to VisitReports');
    }
    
    Logger.log('✅ Initialization complete!');
    return 'Success! Users sheet created.';
    
  } catch(err) {
    Logger.log('❌ Error: ' + err.message);
    return 'Error: ' + err.message;
  }
}

// ===================== HELPER FUNCTIONS =====================

function success_(data) {
  return ContentService.createTextOutput(JSON.stringify({status:'success', data: data}))
    .setMimeType(ContentService.MimeType.JSON);
}

function error_(message) {
  return ContentService.createTextOutput(JSON.stringify({status:'error', message: message}))
    .setMimeType(ContentService.MimeType.JSON);
}

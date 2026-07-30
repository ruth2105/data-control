// Google Sheets API Client for Hospital Management System
// This replaces localStorage with Google Sheets backend

window.SCRIPT_URL = window.SCRIPT_URL || '/.netlify/functions/proxy';

// Generic GET request helper
async function apiGet(action, params = {}) {
  try {
    const url = new URL(SCRIPT_URL, window.location.origin);
    url.searchParams.append('action', action);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`API GET failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API GET failed:', error);
    return { success: false, error: error.message };
  }
}

// Generic POST request helper
async function apiPost(action, data = {}) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ action, data })
    });

    if (!response.ok) {
      throw new Error(`API POST failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API POST failed:', error);
    return { success: false, error: error.message };
  }
}

// USERS
async function getUsers() {
  return await apiGet('getUsers');
}

async function saveUser(userData) {
  return await apiPost('saveUser', userData);
}

async function deleteUser(username) {
  return await apiPost('deleteUser', {username});
}

async function authenticateUser(username, password) {
  return await apiPost('authenticate', {username, password});
}

// CUSTOMERS
async function getCustomers() {
  return await apiGet('getCustomers');
}

async function saveCustomer(customerData) {
  return await apiPost('saveCustomer', customerData);
}

async function deleteCustomer(customerId) {
  return await apiPost('deleteCustomer', {id: customerId});
}

// VISIT REPORTS
async function getVisitReports() {
  return await apiGet('getVisitReports');
}

async function saveVisitReport(reportData) {
  return await apiPost('saveVisitReport', reportData);
}

async function deleteVisitReport(reportId) {
  return await apiPost('deleteVisitReport', {id: reportId});
}

// POTENTIAL CUSTOMERS
async function getPotentialCustomers() {
  return await apiGet('getPotentialCustomers');
}

async function savePotentialCustomer(potentialData) {
  return await apiPost('savePotentialCustomer', potentialData);
}

async function deletePotentialCustomer(name, address) {
  return await apiPost('deletePotentialCustomer', {name, address});
}

// FACILITY SUMMARIES
async function getFacilitySummaries() {
  return await apiGet('getFacilitySummaries');
}

async function saveFacilitySummary(summaryData) {
  return await apiPost('saveFacilitySummary', summaryData);
}

// ANNOUNCEMENTS
async function getAnnouncements() {
  return await apiGet('getAnnouncements');
}

async function saveAnnouncement(announcementData) {
  return await apiPost('saveAnnouncement', announcementData);
}

async function deleteAnnouncement(announcementId) {
  return await apiPost('deleteAnnouncement', {id: announcementId});
}

// Helper function to convert Google Sheets data to localStorage format
function syncToLocalStorage() {
  // This function will sync data from Google Sheets to localStorage
  // Call this on page load to ensure local data is up to date
  Promise.all([
    getCustomers(),
    getVisitReports(),
    getPotentialCustomers(),
    getFacilitySummaries(),
    getUsers()
  ]).then(([customers, reports, potentials, summaries, users]) => {
    if (customers.success) {
      const machineCustomers = customers.data.filter(c => c.model === 'A8' || c.model === 'A90');
      const externalCustomers = customers.data.filter(c => c.model === 'EXT');
      localStorage.setItem('fremenatos_machine', JSON.stringify(machineCustomers));
      localStorage.setItem('fremenatos_external', JSON.stringify(externalCustomers));
    }
    
    if (reports.success) {
      localStorage.setItem('fremenatos_reports', JSON.stringify(reports.data));
    }
    
    if (potentials.success) {
      localStorage.setItem('fremenatos_potentials', JSON.stringify(potentials.data));
    }
    
    if (summaries.success) {
      const summaryMap = {};
      summaries.data.forEach(s => {
        summaryMap[s.hospitalName] = s.summary;
      });
      localStorage.setItem('fremenatos_facility_summaries', JSON.stringify(summaryMap));
    }
    
    if (users.success) {
      localStorage.setItem('fremenatos_users', JSON.stringify(users.data));
    }
  });
}

// Helper function to save localStorage data to Google Sheets
function syncToGoogleSheets() {
  // This function will save localStorage data to Google Sheets
  // Call this after making changes to localStorage
  const machineCustomers = JSON.parse(localStorage.getItem('fremenatos_machine') || '[]');
  const externalCustomers = JSON.parse(localStorage.getItem('fremenatos_external') || '[]');
  const allCustomers = [...machineCustomers, ...externalCustomers];
  
  const reports = JSON.parse(localStorage.getItem('fremenatos_reports') || '[]');
  const potentials = JSON.parse(localStorage.getItem('fremenatos_potentials') || '[]');
  const facilitySummaries = JSON.parse(localStorage.getItem('fremenatos_facility_summaries') || '{}');
  
  // Save customers
  allCustomers.forEach(customer => {
    saveCustomer(customer);
  });
  
  // Save reports
  reports.forEach(report => {
    saveVisitReport(report);
  });
  
  // Save potentials
  potentials.forEach(potential => {
    savePotentialCustomer(potential);
  });
  
  // Save facility summaries
  Object.keys(facilitySummaries).forEach(hospitalName => {
    saveFacilitySummary({
      hospitalName,
      summary: facilitySummaries[hospitalName]
    });
  });
}

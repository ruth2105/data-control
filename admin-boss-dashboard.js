// ===================== ADMIN BOSS DASHBOARD =====================
// This file contains the dashboard functionality for the admin/boss view

// Google Sheets Script URL (replace with your actual URL)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx...'; // Replace with actual URL

// ===================== GET REPORTS FUNCTION =====================
function getReports(callback) {
  // Try to fetch from Google Sheets
  try {
    fetch(SCRIPT_URL + '?action=getReports')
      .then(response => response.json())
      .then(data => {
        if (data && data.status === 'success') {
          callback(data.data || []);
        } else {
          // Fallback to localStorage
          const localReports = JSON.parse(localStorage.getItem('fremenatos_visitReports') || '[]');
          callback(localReports);
        }
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
        // Fallback to localStorage
        const localReports = JSON.parse(localStorage.getItem('fremenatos_visitReports') || '[]');
        callback(localReports);
      });
  } catch (error) {
    console.error('Error in getReports:', error);
    const localReports = JSON.parse(localStorage.getItem('fremenatos_visitReports') || '[]');
    callback(localReports);
  }
}

// ===================== GET LOCAL REPORTS =====================
function getLocalReports() {
  try {
    return JSON.parse(localStorage.getItem('fremenatos_visitReports') || '[]');
  } catch (error) {
    return [];
  }
}

// ===================== SAVE REPORT =====================
function saveReport(report) {
  const reports = getLocalReports();
  const existingIndex = reports.findIndex(r => r.id === report.id);
  
  if (existingIndex >= 0) {
    reports[existingIndex] = report;
  } else {
    reports.push(report);
  }
  
  localStorage.setItem('fremenatos_visitReports', JSON.stringify(reports));
  
  // Try to sync with Google Sheets
  try {
    fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'saveReport',
        report: report
      })
    }).catch(error => {
      console.error('Error syncing report to Google Sheets:', error);
    });
  } catch (error) {
    console.error('Error syncing report:', error);
  }
}

// ===================== DELETE REPORT =====================
function deleteReport(reportId) {
  const reports = getLocalReports();
  const filtered = reports.filter(r => r.id !== reportId);
  localStorage.setItem('fremenatos_visitReports', JSON.stringify(filtered));
  
  // Try to sync with Google Sheets
  try {
    fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'deleteReport',
        reportId: reportId
      })
    }).catch(error => {
      console.error('Error deleting report from Google Sheets:', error);
    });
  } catch (error) {
    console.error('Error deleting report:', error);
  }
}

// ===================== INITIALIZE DASHBOARD =====================
function initializeDashboard() {
  // Load visit reports
  getReports(function(reports) {
    window.liveVisitReports = reports;
    console.log('Loaded', reports.length, 'visit reports');
  });
  
  // Initialize charts if they exist
  if (typeof Chart !== 'undefined') {
    initializeCharts();
  }
}

// ===================== INITIALIZE CHARTS =====================
function initializeCharts() {
  // Sales chart
  const salesCtx = document.getElementById('salesChart');
  if (salesCtx) {
    new Chart(salesCtx, {
      type: 'bar',
      data: {
        labels: ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6'],
        datasets: [{
          label: 'Visits',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  
  // Category chart
  const categoryCtx = document.getElementById('categoryChart');
  if (categoryCtx) {
    new Chart(categoryCtx, {
      type: 'pie',
      data: {
        labels: ['Hot', 'Warm', 'Cold'],
        datasets: [{
          data: [30, 50, 20],
          backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}

// ===================== EXPORT FUNCTIONS =====================
function exportHotCustomers() {
  const hotCustomers = potentialFiltered.filter(c => c.status.toLowerCase() === 'hot');
  
  if (hotCustomers.length === 0) {
    alert('No hot customers to export');
    return;
  }
  
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Hot Customers');
  
  const headers = ['Hospital Name', 'Address', 'Contact', 'Phone', 'Patient Load', 'Status', 'Sales Rep', 'Notes'];
  sheet.addRow(headers);
  
  hotCustomers.forEach(c => {
    sheet.addRow([c.name, c.address, c.contact, c.phone, c.patientLoad, c.status, c.salesRep, c.notes]);
  });
  
  workbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `hot_customers_${new Date().toISOString().split('T')[0]}.xlsx`;
    link.click();
  });
}

function exportPeriodReport() {
  alert('Export period report functionality - implement based on dashboard filters');
}

function exportEquipmentAnalysis() {
  alert('Export equipment analysis functionality - implement based on equipment data');
}

// ===================== HOT CUSTOMERS RENDERING =====================
function renderHotCustomers() {
  const teamFilter = document.getElementById('hotCustomersTeamFilter').value;
  let hotCustomers = potentialFiltered.filter(c => c.status.toLowerCase() === 'hot');
  
  if (teamFilter !== 'all') {
    hotCustomers = hotCustomers.filter(c => c.salesRep === getTeamSalesperson(teamFilter));
  }
  
  document.getElementById('hotCustomersCount').textContent = hotCustomers.length;
  
  const container = document.getElementById('hotCustomersList');
  if (container) {
    container.innerHTML = hotCustomers.map(c => `
      <div style="background:#fff;border:2px solid #dc2626;border-radius:8px;padding:12px;margin-bottom:8px">
        <div style="font-weight:700;color:#991b1b">${c.name}</div>
        <div style="font-size:0.85rem;color:#64748b">
          ${c.address ? `📍 ${c.address}<br>` : ''}
          ${c.contact ? `👤 ${c.contact}<br>` : ''}
          ${c.phone ? `📱 ${c.phone}<br>` : ''}
          👔 ${c.salesRep}
        </div>
      </div>
    `).join('');
  }
}

function getTeamSalesperson(teamId) {
  // Map team ID to salesperson name
  const teamSales = {
    1: 'Ephrata',
    2: 'Kalkidan', 
    3: 'Tizita',
    4: 'Team 4',
    5: 'Team 5',
    6: 'Team 6'
  };
  return teamSales[teamId] || 'Unknown';
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
  initializeDashboard();
}

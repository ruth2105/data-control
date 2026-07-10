// ===================== ADMIN BOSS DASHBOARD =====================
// This file contains the dashboard functionality for the admin/boss view

// SCRIPT_URL is defined in index.html and google-sheets-sync.js
// NOTE: Google Sheets sync disabled due to CORS issues

// ===================== GET REPORTS FUNCTION =====================
function getReports(callback) {
  try {
    const localReports = JSON.parse(localStorage.getItem('fremenatos_visitReports') || '[]');
    const reports = Array.isArray(localReports) ? localReports : [];
    callback(reports);
  } catch (error) {
    console.warn('Failed to read visit reports from localStorage:', error);
    callback([]);
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
  // Google Sheets sync disabled
}

// ===================== DELETE REPORT =====================
function deleteReport(reportId) {
  const reports = getLocalReports();
  const filtered = reports.filter(r => r.id !== reportId);
  localStorage.setItem('fremenatos_visitReports', JSON.stringify(filtered));
  // Google Sheets sync disabled
}

// ===================== INITIALIZE DASHBOARD =====================
function initializeDashboard() {
  // Load visit reports
  getReports(function(reports) {
    window.liveVisitReports = reports;
    window.potentialFiltered = loadMergedPotentials();
    window.livePotentialCustomers = window.potentialFiltered;
    console.log('Loaded', reports.length, 'visit reports');
    if (typeof renderHotCustomers === 'function') {
      renderHotCustomers();
    }
  });
  
  // Avoid duplicate chart initialization when the main dashboard already renders charts.
  if (typeof Chart !== 'undefined' && typeof window.renderDashboard !== 'function') {
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
  const teamFilter = document.getElementById('hotCustomersTeamFilter')?.value || 'all';
  const sourceCustomers = Array.isArray(window.potentialFiltered) && window.potentialFiltered.length > 0
    ? window.potentialFiltered
    : (Array.isArray(window.livePotentialCustomers) && window.livePotentialCustomers.length > 0
      ? window.livePotentialCustomers
      : (typeof potentialFiltered !== 'undefined' && Array.isArray(potentialFiltered) && potentialFiltered.length > 0
        ? potentialFiltered
        : (typeof loadMergedPotentials === 'function' ? loadMergedPotentials() : [])));

  let hotCustomers = sourceCustomers.filter(c => String(c.status || '').toLowerCase() === 'hot');
  
  if (teamFilter !== 'all') {
    hotCustomers = hotCustomers.filter(c => c.salesRep === getTeamSalesperson(teamFilter));
  }
  
  const countEl = document.getElementById('hotCustomersCount');
  if (countEl) {
    countEl.textContent = hotCustomers.length;
  }
  
  const container = document.getElementById('hotCustomersList');
  if (container) {
    container.innerHTML = hotCustomers.length > 0
      ? hotCustomers.map(c => `
          <div style="background:#fff;border:2px solid #dc2626;border-radius:8px;padding:12px;margin-bottom:8px">
            <div style="font-weight:700;color:#991b1b">${c.name || 'Unnamed customer'}</div>
            <div style="font-size:0.85rem;color:#64748b">
              ${c.address ? `📍 ${c.address}<br>` : ''}
              ${c.contact ? `👤 ${c.contact}<br>` : ''}
              ${c.phone ? `📱 ${c.phone}<br>` : ''}
              ${c.salesRep ? `👔 ${c.salesRep}` : ''}
            </div>
          </div>
        `).join('')
      : '<div style="text-align:center;padding:24px;color:#64748b">No hot customers yet.</div>';
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

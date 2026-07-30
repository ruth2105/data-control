// ===================== ADMIN BOSS DASHBOARD =====================
// This file contains the dashboard functionality for the admin/boss view.
// It avoids redefining page-level helpers such as getReports/deleteReport
// so that the main app behavior remains intact.

// ===================== INITIALIZE DASHBOARD =====================
function initializeDashboard() {
  if (typeof getReports !== 'function') {
    console.warn('getReports is not defined; admin dashboard cannot load reports.');
    return;
  }

  getReports(function(reports) {
    if (!reports || !Array.isArray(reports) || reports.length === 0) {
      if (typeof getLocalReports === 'function') {
        reports = getLocalReports() || [];
      } else {
        try {
          reports = JSON.parse(localStorage.getItem('fremenatos_visitReports') || '[]') || [];
        } catch (error) {
          reports = [];
        }
      }
    }

    window.liveVisitReports = reports;
    window.potentialFiltered = loadMergedPotentials();
    window.livePotentialCustomers = window.potentialFiltered;
    console.log('Loaded', reports.length, 'visit reports');
    if (typeof renderHotCustomers === 'function') {
      renderHotCustomers();
    }
    if (typeof renderTeamPerformance === 'function') {
      renderTeamPerformance();
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

function loadVisitReportsFallback() {
  if (typeof getLocalReports === 'function') {
    return getLocalReports() || [];
  }
  try {
    return JSON.parse(localStorage.getItem('fremenatos_visitReports') || '[]') || [];
  } catch (error) {
    return [];
  }
}

function getTeamIdBySalespersonName(salesPersonName) {
  if (typeof getAllSalespeople !== 'function') return null;
  const normalizedName = typeof normalizeSalesName === 'function'
    ? normalizeSalesName(salesPersonName)
    : (salesPersonName || '').trim();
  const salespeople = getAllSalespeople();
  const person = salespeople.find(s => {
    const name = typeof normalizeSalesName === 'function' ? normalizeSalesName(s.name) : s.name;
    return name === normalizedName;
  });
  return person ? person.teamId : null;
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
    3: 'Team 3',
    4: 'Team 4',
    5: 'Team 5',
    6: 'Team 6'
  };
  return teamSales[teamId] || 'Unknown';
}

function renderTeamPerformance() {
  const reports = loadVisitReportsFallback().map(r => {
    const report = {...r};
    report.salesPerson = typeof normalizeSalesName === 'function'
      ? normalizeSalesName(report.salesPerson || report.salesRep || report.username || 'Unknown')
      : (report.salesPerson || report.salesRep || report.username || 'Unknown');
    if (!report.teamId) {
      report.teamId = getTeamIdBySalespersonName(report.salesPerson);
    }
    report.teamId = report.teamId != null && report.teamId !== '' ? Number(report.teamId) : null;
    return report;
  });

  const deletedCustomers = JSON.parse(localStorage.getItem('fremenatos_deleted_customers') || '[]');
  const localPotentials = JSON.parse(localStorage.getItem('fremenatos_potentials') || '[]');
  const allPotentials = potentialCustomers.filter(c => !deletedCustomers.includes(c.name));
  localPotentials.forEach(lp => {
    if (!deletedCustomers.includes(lp.name) && !allPotentials.some(p => p.name.toLowerCase() === lp.name.toLowerCase())) {
      allPotentials.push(lp);
    }
  });

  const pdfCustomers = allPotentials.map(c => ({
    id: 'pdf_' + c.name.toLowerCase().replace(/\s+/g, '_'),
    hospitalName: c.name,
    salesPerson: typeof normalizeSalesName === 'function' ? normalizeSalesName(c.salesRep) : c.salesRep,
    teamId: Number(c.teamId) || null,
    customerPotential: c.status,
    source: 'PDF'
  }));

  const allData = [...reports, ...pdfCustomers];
  const teams = [1, 2, 3, 4, 5, 6];

  const html = teams.map(teamId => {
    const teamInfo = TEAMS[teamId] || { name: `Team ${teamId}`, color: '#94a3b8' };
    const teamReports = allData.filter(r => Number(r.teamId) === teamId);
    const hotCount = teamReports.filter(r => r.customerPotential === 'Hot').length;
    const warmCount = teamReports.filter(r => r.customerPotential === 'Warm').length;
    const coldCount = teamReports.filter(r => r.customerPotential === 'Cold').length;

    const allUsers = {...USERS};
    const localUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
    localUsers.forEach(u => {
      if (u.username && u.status === 'active') {
        allUsers[u.username] = u;
      }
    });

    const teamMembers = Object.values(allUsers).filter(u => u.role === 'sales' && Number(u.teamId) === teamId);

    return `
      <div style="background:#fff;border-radius:10px;padding:16px;border:2px solid ${teamInfo.color}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <span style="background:${teamInfo.color};color:#fff;padding:4px 12px;border-radius:12px;font-size:0.8rem;font-weight:800">${teamInfo.name}</span>
          <span style="font-size:0.85rem;font-weight:700;color:#64748b">${teamReports.length} visits</span>
        </div>
        <div style="font-size:0.75rem;color:#64748b;margin-bottom:12px;min-height:20px">
          ${teamMembers.length > 0 ? teamMembers.map(m => m.name).join(', ') : 'No members yet'}
        </div>
        ${teamReports.length > 0 ? `
          <div style="display:flex;gap:8px;margin-bottom:12px">
            <span style="background:#fee2e2;color:#991b1b;padding:4px 8px;border-radius:6px;font-size:0.72rem;font-weight:700">🔥 ${hotCount}</span>
            <span style="background:#fef3c7;color:#92400e;padding:4px 8px;border-radius:6px;font-size:0.72rem;font-weight:700">🌤️ ${warmCount}</span>
            <span style="background:#e0f2fe;color:#075985;padding:4px 8px;border-radius:6px;font-size:0.72rem;font-weight:700">❄️ ${coldCount}</span>
          </div>
          <button onclick="switchTab('reports')" style="width:100%;background:${teamInfo.color}15;color:${teamInfo.color};border:2px solid ${teamInfo.color};padding:8px;border-radius:6px;font-size:0.78rem;font-weight:700;cursor:pointer">
            View Reports
          </button>
        ` : `
          <div style="text-align:center;padding:12px;background:#f1f5f9;border-radius:6px;font-size:0.75rem;color:#94a3b8">
            No reports yet
          </div>
        `}
      </div>
    `;
  }).join('');

  const grid = document.getElementById('teamPerformanceGrid');
  if (grid) {
    grid.innerHTML = html;
  }
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
  initializeDashboard();
}

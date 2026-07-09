// ===================== BOSS DASHBOARD FEATURES =====================
// Functions for Hot Customers, Team Performance, Purchase Announcements, Change Password
// Note: SCRIPT_URL is defined in admin.html

// Render Hot Customers List (Boss Priority!)
function renderHotCustomers() {
  const teamFilter = document.getElementById('hotCustomersTeamFilter').value;
  
  getReports(function(reports) {
    // Get deleted customers list
    const deletedCustomers = JSON.parse(localStorage.getItem('fremenatos_deleted_customers') || '[]');
    
    // Merge with PDF customers (excluding deleted)
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
      hospitalAddress: c.address,
      city: c.city || '',
      salesPerson: c.salesRep,
      teamId: c.teamId,
      customerPotential: c.status,
      fillDate: '',
      submittedAt: '',
      source: 'PDF'
    }));
    
    // Combine all data
    const allData = [...reports, ...pdfCustomers];
    
    // Filter Hot customers only
    let hotCustomers = allData.filter(r => r.customerPotential === 'Hot');
    
    // Filter by team if selected
    if (teamFilter !== 'all') {
      hotCustomers = hotCustomers.filter(r => r.teamId === parseInt(teamFilter));
    }
    
    // Sort by last visit date (most recent first)
    hotCustomers.sort((a, b) => {
      const dateA = new Date(a.fillDate || a.submittedAt || 0);
      const dateB = new Date(b.fillDate || b.submittedAt || 0);
      return dateB - dateA;
    });
    
    // Update count
    document.getElementById('hotCustomersCount').textContent = hotCustomers.length;
    
    // Render list
    const listEl = document.getElementById('hotCustomersList');
    
    if (hotCustomers.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center;padding:40px 20px;color:#7f1d1d">
          <div style="font-size:3rem;margin-bottom:12px">🔥</div>
          <div style="font-size:1rem;font-weight:700;margin-bottom:8px">No Hot Customers Yet</div>
          <div style="font-size:0.85rem;opacity:0.8">Hot customers will appear here when marked by sales team</div>
        </div>
      `;
      return;
    }
    
    const html = hotCustomers.map((customer, index) => {
      const teamInfo = TEAMS[customer.teamId] || { name: 'Unknown', color: '#94a3b8' };
      const lastVisit = customer.fillDate || customer.submittedAt;
      const lastVisitText = lastVisit ? new Date(lastVisit).toLocaleDateString('en-GB') : 'No visit record';
      
      return `
        <div style="background:#fff;border-radius:8px;padding:14px;margin-bottom:10px;border:2px solid #fca5a5;cursor:pointer;transition:all .2s" 
             onmouseover="this.style.borderColor='#dc2626';this.style.transform='translateX(4px)'" 
             onmouseout="this.style.borderColor='#fca5a5';this.style.transform='translateX(0)'">
          <div style="display:flex;align-items:start;gap:12px">
            <div style="width:32px;height:32px;border-radius:50%;background:#dc2626;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:800;flex-shrink:0">
              ${index + 1}
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:0.95rem;font-weight:800;color:#0f172a;margin-bottom:4px">${customer.hospitalName}</div>
              <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:0.78rem;color:#64748b;margin-bottom:6px">
                <span style="background:${teamInfo.color}15;color:${teamInfo.color};padding:2px 8px;border-radius:10px;font-weight:700">${teamInfo.name}</span>
                <span>👤 ${customer.salesPerson || 'Unknown'}</span>
                ${customer.city ? `<span>📍 ${customer.city}</span>` : ''}
              </div>
              <div style="font-size:0.75rem;color:#991b1b;font-weight:600">
                🕒 Last Visit: ${lastVisitText}
              </div>
            </div>
            <button onclick="viewCustomerReport(event, '${customer.id}')" style="background:#dc2626;color:#fff;border:none;padding:6px 12px;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer;flex-shrink:0">
              👁️ View
            </button>
          </div>
        </div>
      `;
    }).join('');
    
    listEl.innerHTML = html;
  });
}

// View customer report details
function viewCustomerReport(event, reportId) {
  event.stopPropagation();
  
  if (reportId.startsWith('pdf_')) {
    alert('PDF customer - no visit report details available');
    return;
  }
  
  // Find and show report details
  const reports = JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]');
  const report = reports.find(r => r.id === reportId || r.id === parseInt(reportId));
  
  if (report) {
    viewReportDetail(reportId);
  } else {
    alert('Report not found');
  }
}

// Render Team Performance Grid
function renderTeamPerformance() {
  getReports(function(reports) {
    // Get deleted customers list
    const deletedCustomers = JSON.parse(localStorage.getItem('fremenatos_deleted_customers') || '[]');
    
    // Merge with PDF customers (excluding deleted)
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
      salesPerson: c.salesRep,
      teamId: c.teamId,
      customerPotential: c.status,
      source: 'PDF'
    }));
    
    const allData = [...reports, ...pdfCustomers];
    
    const teams = [1, 2, 3, 4, 5, 6];
    
    const html = teams.map(teamId => {
      const teamInfo = TEAMS[teamId];
      const teamReports = allData.filter(r => r.teamId === teamId);
      const hotCount = teamReports.filter(r => r.customerPotential === 'Hot').length;
      const warmCount = teamReports.filter(r => r.customerPotential === 'Warm').length;
      const coldCount = teamReports.filter(r => r.customerPotential === 'Cold').length;
      
      // Get team members
      const allUsers = {...USERS};
      const localUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
      localUsers.forEach(u => {
        if (u.username && u.status === 'active') {
          allUsers[u.username] = u;
        }
      });
      
      const teamMembers = Object.values(allUsers).filter(u => u.role === 'sales' && u.teamId === teamId);
      
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
    
    document.getElementById('teamPerformanceGrid').innerHTML = html;
  });
}

// Export Hot Customers List
function exportHotCustomers() {
  const teamFilter = document.getElementById('hotCustomersTeamFilter').value;
  const teamText = teamFilter === 'all' ? 'All Teams' : `Team ${teamFilter}`;
  
  getReports(function(reports) {
    // Get deleted customers list
    const deletedCustomers = JSON.parse(localStorage.getItem('fremenatos_deleted_customers') || '[]');
    
    // Merge with PDF customers (excluding deleted)
    const localPotentials = JSON.parse(localStorage.getItem('fremenatos_potentials') || '[]');
    const allPotentials = potentialCustomers.filter(c => !deletedCustomers.includes(c.name));
    localPotentials.forEach(lp => {
      if (!deletedCustomers.includes(lp.name) && !allPotentials.some(p => p.name.toLowerCase() === lp.name.toLowerCase())) {
        allPotentials.push(lp);
      }
    });
    
    const pdfCustomers = allPotentials.map(c => ({
      hospitalName: c.name,
      hospitalAddress: c.address,
      city: c.city || '',
      contact: c.contact || '',
      phone: c.phone || '',
      salesPerson: c.salesRep,
      teamId: c.teamId,
      customerPotential: c.status,
      fillDate: '',
      source: 'PDF'
    }));
    
    const allData = [...reports, ...pdfCustomers];
    
    // Filter Hot customers
    let hotCustomers = allData.filter(r => r.customerPotential === 'Hot');
    
    if (teamFilter !== 'all') {
      hotCustomers = hotCustomers.filter(r => r.teamId === parseInt(teamFilter));
    }
    
    // Sort by last visit date
    hotCustomers.sort((a, b) => {
      const dateA = new Date(a.fillDate || a.submittedAt || 0);
      const dateB = new Date(b.fillDate || b.submittedAt || 0);
      return dateB - dateA;
    });
    
    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Hot Customers');
    
    // Add headers
    worksheet.columns = [
      { header: '#', key: 'number', width: 6 },
      { header: 'Hospital Name', key: 'name', width: 30 },
      { header: 'City', key: 'city', width: 15 },
      { header: 'Team', key: 'team', width: 10 },
      { header: 'Salesperson', key: 'sales', width: 15 },
      { header: 'Contact', key: 'contact', width: 20 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Last Visit', key: 'lastVisit', width: 15 },
      { header: 'Address', key: 'address', width: 40 }
    ];
    
    // Style header
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFDC2626' }
    };
    
    // Add data
    hotCustomers.forEach((customer, index) => {
      const teamInfo = TEAMS[customer.teamId] || { name: 'Unknown' };
      const lastVisit = customer.fillDate || customer.submittedAt;
      
      worksheet.addRow({
        number: index + 1,
        name: customer.hospitalName,
        city: customer.city || '',
        team: teamInfo.name,
        sales: customer.salesPerson || '',
        contact: customer.contact || customer.contactPerson || '',
        phone: customer.phone || customer.contactPhone || '',
        lastVisit: lastVisit ? new Date(lastVisit).toLocaleDateString('en-GB') : 'No record',
        address: customer.hospitalAddress || ''
      });
    });
    
    // Generate and download
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Hot_Customers_${teamText}_${new Date().toISOString().split('T')[0]}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    });
  });
}

// Change Admin Password
async function changePassword(event) {
  event.preventDefault();
  
  const currentPwd = document.getElementById('currentPassword').value;
  const newPwd = document.getElementById('newPassword').value;
  const confirmPwd = document.getElementById('confirmPassword').value;
  
  // Validation
  if (!currentPwd || !newPwd || !confirmPwd) {
    alert('❌ All fields are required');
    return;
  }
  
  // Check current password
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    alert('❌ Admin access required');
    return;
  }
  
  // Verify current password
  if (USERS.admin.password !== currentPwd) {
    alert('❌ Current password is incorrect');
    return;
  }
  
  // Check new password length
  if (newPwd.length < 6) {
    alert('❌ New password must be at least 6 characters');
    return;
  }
  
  // Check new password different from old
  if (newPwd === currentPwd) {
    alert('❌ New password must be different from current password');
    return;
  }
  
  // Check passwords match
  if (newPwd !== confirmPwd) {
    alert('❌ New password and confirm password do not match');
    return;
  }
  
  // Update password locally first
  USERS.admin.password = newPwd;
  localStorage.setItem('admin_password', newPwd);
  
  // Try to sync with Google Sheets backend
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'updateUser',
        username: 'admin',
        password: newPwd
      })
    });
    
    const data = await response.json();
    
    if (data.status === 'success' || data.status === 'ok') {
      console.log('✅ Password updated in Google Sheets');
      alert('✅ Password updated successfully!\n\nYou will be logged out. Please login again with your new password.');
    } else {
      console.warn('⚠️ Backend update warning:', data.message);
      alert('✅ Password updated locally. Backend returned: ' + (data.message || 'unknown error') + '\n\nYou will be logged out.');
    }
  } catch (error) {
    console.warn('⚠️ Backend sync failed (offline mode):', error);
    alert('✅ Password updated locally (offline mode).\n\nYou will be logged out. Please login again with your new password.');
  }
  
  // Logout and redirect
  setTimeout(() => {
    logout();
  }, 1000);
}

// Confirm Purchase Announcement (Admin Function)
function confirmPurchase(id) {
  const announcements = JSON.parse(localStorage.getItem('fremenatos_announcements') || '[]');
  const announcement = announcements.find(a => a.id === parseInt(id));
  
  if (!announcement) {
    alert('❌ Announcement not found');
    return;
  }
  
  // Confirm action
  if (!confirm(`Confirm purchase for:\n\n${announcement.hospitalName}\n\nType: ${announcement.purchaseType}\nModel: ${announcement.machineModel}\n\nThis will add the customer to the main database.`)) {
    return;
  }
  
  // Update announcement status
  announcement.status = 'confirmed';
  announcement.confirmedBy = 'admin';
  announcement.confirmedAt = new Date().toISOString();
  
  // Save updated announcements
  localStorage.setItem('fremenatos_announcements', JSON.stringify(announcements));
  
  // Add customer to Old Customers (potentials)
  const potentials = JSON.parse(localStorage.getItem('fremenatos_potentials') || '[]');
  
  // Check if already exists
  const exists = potentials.some(p => p.name.toLowerCase() === announcement.hospitalName.toLowerCase());
  
  if (!exists) {
    const newCustomer = {
      name: announcement.hospitalName,
      nameZh: announcement.hospitalName,
      address: announcement.hospitalAddress || '',
      city: announcement.city || '',
      model: announcement.machineModel, // A8 or A90
      contact: announcement.contact || '',
      phone: announcement.phone || '',
      salesRep: announcement.salesPerson,
      teamId: announcement.teamId,
      addedAt: announcement.confirmedAt,
      addedFrom: 'purchase_announcement',
      status: 'Hot' // They just purchased!
    };
    
    potentials.push(newCustomer);
    localStorage.setItem('fremenatos_potentials', JSON.stringify(potentials));
  }
  
  // Save to Google Sheets if online
  if (typeof GOOGLE_APPS_SCRIPT_URL !== 'undefined' && GOOGLE_APPS_SCRIPT_URL) {
    fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'confirmPurchase',
        announcement: announcement
      })
    }).catch(err => console.log('Offline mode - data saved locally'));
  }
  
  alert('✅ Purchase confirmed!\n\nCustomer has been added to the main database.');
  refreshAnnouncements();
}

// Reject Purchase Announcement (Admin Function)
function rejectPurchase(id) {
  const reason = prompt('Optional: Enter reason for rejection');
  
  const announcements = JSON.parse(localStorage.getItem('fremenatos_announcements') || '[]');
  const announcement = announcements.find(a => a.id === parseInt(id));
  
  if (!announcement) {
    alert('❌ Announcement not found');
    return;
  }
  
  // Update announcement status
  announcement.status = 'rejected';
  announcement.rejectedBy = 'admin';
  announcement.rejectedAt = new Date().toISOString();
  announcement.rejectReason = reason || '';
  
  // Save updated announcements
  localStorage.setItem('fremenatos_announcements', JSON.stringify(announcements));
  
  alert('❌ Purchase announcement rejected.');
  refreshAnnouncements();
}

// Refresh Announcements Display
function refreshAnnouncements() {
  displayAnnouncements();
}

// Display Purchase Announcements
function displayAnnouncements() {
  const announcements = JSON.parse(localStorage.getItem('fremenatos_announcements') || '[]');
  
  const pending = announcements.filter(a => a.status === 'pending');
  const confirmed = announcements.filter(a => a.status === 'confirmed').slice(0, 10); // Last 10
  
  // Update counts
  document.getElementById('pendingAnnouncementsCount').textContent = pending.length;
  document.getElementById('confirmedAnnouncementsCount').textContent = confirmed.length;
  
  // Pending announcements
  const pendingEl = document.getElementById('pendingAnnouncementsList');
  if (pending.length === 0) {
    pendingEl.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:#94a3b8">
        <div style="font-size:2.5rem;margin-bottom:12px">📢</div>
        <div style="font-size:0.95rem;font-weight:600">No Pending Announcements</div>
        <div style="font-size:0.8rem;margin-top:8px">Purchase announcements from sales team will appear here</div>
      </div>
    `;
  } else {
    pendingEl.innerHTML = pending.map(ann => {
      const teamInfo = TEAMS[ann.teamId] || { name: 'Unknown', color: '#94a3b8' };
      const announcedDate = new Date(ann.announcedAt).toLocaleString('en-GB');
      
      return `
        <div style="background:#fff;border:2px solid #10b981;border-radius:12px;padding:18px;margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px">
            <div>
              <div style="font-size:1.1rem;font-weight:800;color:#0f172a;margin-bottom:4px">
                🔔 ${ann.hospitalName}
              </div>
              <div style="font-size:0.8rem;color:#64748b;display:flex;flex-wrap:wrap;gap:8px">
                <span style="background:${teamInfo.color}15;color:${teamInfo.color};padding:2px 8px;border-radius:10px;font-weight:700">${teamInfo.name}</span>
                <span>👤 ${ann.salesPerson}</span>
                <span>📅 ${announcedDate}</span>
              </div>
            </div>
            <span style="background:#fef3c7;color:#92400e;padding:4px 12px;border-radius:12px;font-size:0.75rem;font-weight:800">PENDING</span>
          </div>
          
          <div style="background:#f8fafc;border-radius:8px;padding:12px;margin-bottom:12px">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:0.8rem">
              <div><strong>📍 Address:</strong> ${ann.hospitalAddress || 'N/A'}</div>
              <div><strong>🏙️ City:</strong> ${ann.city || 'N/A'}</div>
              <div><strong>👤 Contact:</strong> ${ann.contact || 'N/A'}</div>
              <div><strong>📞 Phone:</strong> ${ann.phone || 'N/A'}</div>
              <div><strong>📦 Type:</strong> ${ann.purchaseType === 'new' ? '🆕 New Machine' : '🔄 Replacement'}</div>
              <div><strong>🔬 Model:</strong> ${ann.machineModel}</div>
            </div>
            ${ann.notes ? `
              <div style="margin-top:8px;padding-top:8px;border-top:1px solid #e2e8f0">
                <strong style="font-size:0.75rem;color:#64748b">💬 Notes:</strong>
                <div style="font-size:0.85rem;color:#334155;margin-top:4px">${ann.notes}</div>
              </div>
            ` : ''}
          </div>
          
          <div style="display:flex;gap:8px">
            <button onclick="confirmPurchase(${ann.id})" style="flex:1;background:#10b981;color:#fff;border:none;padding:10px;border-radius:8px;font-weight:700;cursor:pointer">
              ✅ Confirm Purchase
            </button>
            <button onclick="rejectPurchase(${ann.id})" style="flex:1;background:#ef4444;color:#fff;border:none;padding:10px;border-radius:8px;font-weight:700;cursor:pointer">
              ❌ Reject
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Confirmed announcements
  const confirmedEl = document.getElementById('confirmedAnnouncementsList');
  if (confirmed.length === 0) {
    confirmedEl.innerHTML = `
      <div style="text-align:center;padding:30px 20px;color:#94a3b8;font-size:0.85rem">
        No confirmed purchases yet
      </div>
    `;
  } else {
    confirmedEl.innerHTML = confirmed.map(ann => {
      const confirmedDate = new Date(ann.confirmedAt).toLocaleString('en-GB');
      
      return `
        <div style="background:#f8fafc;border:2px solid #3b82f6;border-radius:8px;padding:14px;margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:0.9rem;font-weight:700;color:#0f172a">${ann.hospitalName}</div>
              <div style="font-size:0.75rem;color:#64748b;margin-top:2px">
                Confirmed by ${ann.confirmedBy} on ${confirmedDate}
              </div>
            </div>
            <span style="background:#dbeafe;color:#1e40af;padding:4px 10px;border-radius:10px;font-size:0.7rem;font-weight:800">✅ CONFIRMED</span>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Initialize Boss Dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
  // Render hot customers and team performance when dashboard loads
  if (document.getElementById('page-dashboard')) {
    setTimeout(() => {
      renderHotCustomers();
      renderTeamPerformance();
    }, 500);
  }
  
  // Initialize announcements display if on updates page
  if (document.getElementById('page-updates')) {
    displayAnnouncements();
  }
});

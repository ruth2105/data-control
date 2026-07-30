// Firestore synchronization helpers for the hospital management app
function isFirebaseSyncReady() {
  return window.firebaseService && typeof window.firebaseService.isReady === 'function' && window.firebaseService.isReady();
}

async function syncUsersFromFirestore() {
  if (!isFirebaseSyncReady()) {
    return [];
  }

  try {
    const users = await window.firebaseService.getUsers();
    if (Array.isArray(users)) {
      localStorage.setItem('fremenatos_users', JSON.stringify(users));
      window.dispatchEvent(new Event('users:updated'));
    }
    return users;
  } catch (error) {
    console.warn('syncUsersFromFirestore failed:', error);
    return [];
  }
}

async function getVisitReportsFromFirestore() {
  if (!isFirebaseSyncReady()) {
    return [];
  }
  try {
    const reports = await window.firebaseService.getVisitReports();
    if (Array.isArray(reports)) {
      localStorage.setItem('fremenatos_visitReports', JSON.stringify(reports));
    }
    return reports;
  } catch (error) {
    console.warn('getVisitReportsFromFirestore failed:', error);
    return [];
  }
}

async function saveVisitReportToFirestore(reportData) {
  if (!isFirebaseSyncReady()) {
    return { success: false, message: 'Firebase unavailable' };
  }
  return await window.firebaseService.saveVisitReport(reportData);
}

async function deleteVisitReportFromFirestore(reportId) {
  if (!isFirebaseSyncReady()) {
    return { success: false, message: 'Firebase unavailable' };
  }
  return await window.firebaseService.deleteVisitReport(reportId);
}

function listenFirestoreUsers() {
  if (!isFirebaseSyncReady()) {
    return null;
  }

  return window.firebaseService.listenUsers(users => {
    if (Array.isArray(users)) {
      localStorage.setItem('fremenatos_users', JSON.stringify(users));
      window.dispatchEvent(new Event('users:updated'));
    }
  });
}

function listenFirestoreVisitReports(onUpdate) {
  if (!isFirebaseSyncReady()) {
    return null;
  }

  return window.firebaseService.listenVisitReports(reports => {
    if (Array.isArray(reports)) {
      localStorage.setItem('fremenatos_visitReports', JSON.stringify(reports));
    }
    if (typeof onUpdate === 'function') {
      onUpdate(reports);
    }
  });
}

function approveUserInFirestore(username, updates) {
  if (!isFirebaseSyncReady()) {
    return Promise.resolve({ success: false, message: 'Firebase unavailable' });
  }
  return window.firebaseService.updateUser(username, updates);
}

function deleteUserInFirestore(username) {
  if (!isFirebaseSyncReady()) {
    return Promise.resolve({ success: false, message: 'Firebase unavailable' });
  }
  return window.firebaseService.deleteUser(username);
}

// ===================== REAL-TIME ADMIN DASHBOARD LISTENERS =====================
// Set up real-time listeners so admin sees all changes from sales team immediately

let adminReportListener = null;
let adminPurchaseListener = null;
let adminDashboardUpdateTimer = null;

// Setup real-time listeners for admin dashboard
function setupAdminRealtimeListeners() {
  if (typeof window.getCurrentUser !== 'function') {
    return; // Not on admin page or user function not loaded
  }

  const user = window.getCurrentUser();
  if (!user || user.role !== 'admin') {
    return; // Only for admin users
  }

  // Listen for visit report changes and refresh dashboard if active
  adminReportListener = listenFirestoreVisitReports(function(reports) {
    console.log('📊 Real-time reports update:', reports.length, 'reports');
    
    // Dispatch event for any page listening to report changes
    window.dispatchEvent(new CustomEvent('reports:updated', { detail: { reports } }));
    
    // If admin is viewing the reports tab or dashboard, auto-refresh
    if (typeof window.currentTab !== 'undefined') {
      const activeTab = window.currentTab;
      if (activeTab === 'reports' || activeTab === 'dashboard') {
        // Schedule refresh (debounced to avoid too many refreshes)
        if (adminDashboardUpdateTimer) {
          clearTimeout(adminDashboardUpdateTimer);
        }
        adminDashboardUpdateTimer = setTimeout(() => {
          if (typeof window.renderReports === 'function' && activeTab === 'reports') {
            console.log('🔄 Auto-refreshing reports for admin...');
            window.renderReports();
          }
          if (typeof window.renderDashboard === 'function' && activeTab === 'dashboard') {
            console.log('🔄 Auto-refreshing dashboard for admin...');
            window.renderDashboard();
          }
        }, 500); // Wait 500ms to batch multiple updates
      }
    }
  });

  console.log('✅ Admin real-time listeners activated');
}

// Listen for customer/purchase data changes
function listenAdminCustomerUpdates(onUpdate) {
  if (!isFirebaseSyncReady()) {
    return null;
  }

  // Listen to localStorage changes (for local updates from sales)
  window.addEventListener('storage', (e) => {
    if (e.key === 'fremenatos_visitReports' || e.key === 'fremenatos_customers') {
      if (typeof onUpdate === 'function') {
        onUpdate();
      }
    }
  });

  // Also listen to custom events
  window.addEventListener('reports:updated', () => {
    if (typeof onUpdate === 'function') {
      onUpdate();
    }
  });

  return true;
}

// Cleanup listeners (call when leaving admin dashboard)
function cleanupAdminRealtimeListeners() {
  if (adminReportListener && typeof adminReportListener === 'function') {
    try {
      adminReportListener(); // Most Firebase listeners return an unsubscribe function
    } catch (e) {
      console.log('Note: Report listener cleanup not available');
    }
  }
  
  if (adminDashboardUpdateTimer) {
    clearTimeout(adminDashboardUpdateTimer);
  }
  
  console.log('✅ Admin real-time listeners cleaned up');
}

// Auto-setup on page load if user is admin
document.addEventListener('DOMContentLoaded', function() {
  // Delay setup slightly to ensure user info is loaded
  setTimeout(() => {
    if (typeof window.setupAdminRealtimeListeners === 'function') {
      try {
        window.setupAdminRealtimeListeners();
      } catch (e) {
        console.log('Admin listeners auto-setup skipped:', e.message);
      }
    }
  }, 1000);
});

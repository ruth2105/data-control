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

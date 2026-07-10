// Firestore helper functions for Fremenatos Hospital Management System
// Provides shared helpers for user authentication, registration, approvals, and visit report sync.

(function initializeFirebaseService() {
  function isReady() {
    return typeof window.firebaseDB !== 'undefined' && window.firebaseDB && typeof window.firebaseFieldValue !== 'undefined';
  }

  function collection(name) {
    if (!isReady()) throw new Error('Firebase is not initialized');
    return window.firebaseDB.collection(name);
  }

  async function getCollection(name, orderBy) {
    if (!isReady()) return [];
    let query = collection(name);
    if (orderBy) query = query.orderBy(orderBy, 'desc');
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async function getUser(username) {
    if (!isReady()) return null;
    const doc = await collection('users').doc(username).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async function authenticateUser(username, password) {
    if (!isReady()) return { success: false, message: 'Firebase unavailable' };
    if (!username || !password) return { success: false, message: 'Missing credentials' };

    try {
      const user = await getUser(username);
      if (!user || String(user.password || '') !== String(password)) {
        return { success: false, message: 'Invalid username or password' };
      }
      if (String(user.status || '').toLowerCase() === 'pending') {
        return { success: false, message: 'Account pending approval. Please wait for admin approval.' };
      }

      const resultUser = {
        username: user.username,
        role: user.role || 'sales',
        teamId: user.teamId || null,
        name: user.name || user.username,
        nameZh: user.nameZh || user.name || user.username
      };
      return { success: true, user: resultUser };
    } catch (error) {
      return { success: false, message: error.message || 'Firebase authentication failed' };
    }
  }

  async function registerUser(userData) {
    if (!isReady()) return { success: false, message: 'Firebase unavailable' };
    if (!userData || !userData.username) return { success: false, message: 'Missing user data' };

    try {
      const username = String(userData.username).trim().toLowerCase();
      const existing = await getUser(username);
      if (existing) {
        return { success: false, message: 'Username already exists' };
      }

      const payload = {
        ...userData,
        username,
        status: 'pending',
        role: userData.role || 'sales',
        teamId: userData.teamId || null,
        registeredAt: userData.registeredAt || new Date().toISOString(),
        updatedAt: window.firebaseFieldValue.serverTimestamp()
      };

      await collection('users').doc(username).set(payload, { merge: true });
      return { success: true, user: payload };
    } catch (error) {
      return { success: false, message: error.message || 'Firebase registration failed' };
    }
  }

  async function updateUser(username, updates) {
    if (!isReady()) return { success: false, message: 'Firebase unavailable' };
    if (!username) return { success: false, message: 'Missing username' };

    try {
      await collection('users').doc(username).set({ ...updates, updatedAt: window.firebaseFieldValue.serverTimestamp() }, { merge: true });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || 'Firebase update failed' };
    }
  }

  async function deleteUser(username) {
    if (!isReady()) return { success: false, message: 'Firebase unavailable' };
    if (!username) return { success: false, message: 'Missing username' };

    try {
      await collection('users').doc(username).delete();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || 'Firebase delete failed' };
    }
  }

  async function getVisitReports() {
    if (!isReady()) return [];
    const snapshot = await collection('visitReports').orderBy('submittedAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async function saveVisitReport(reportData) {
    if (!isReady()) return { success: false, message: 'Firebase unavailable' };
    if (!reportData) return { success: false, message: 'Missing report data' };

    try {
      const id = String(reportData.id || Date.now());
      const payload = {
        ...reportData,
        id,
        updatedAt: window.firebaseFieldValue.serverTimestamp()
      };
      await collection('visitReports').doc(id).set(payload, { merge: true });
      return { success: true, report: payload };
    } catch (error) {
      return { success: false, message: error.message || 'Firebase save failed' };
    }
  }

  async function deleteVisitReport(reportId) {
    if (!isReady()) return { success: false, message: 'Firebase unavailable' };
    if (!reportId) return { success: false, message: 'Missing report id' };

    try {
      await collection('visitReports').doc(String(reportId)).delete();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || 'Firebase delete failed' };
    }
  }

  function listenCollection(name, callback, orderBy) {
    if (!isReady()) return null;
    let query = collection(name);
    if (orderBy) query = query.orderBy(orderBy, 'desc');

    return query.onSnapshot(snapshot => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (typeof callback === 'function') {
        callback(items);
      }
    }, error => {
      console.warn(`Firestore listener error for ${name}:`, error);
    });
  }

  async function getUsers() {
    return await getCollection('users', 'registeredAt');
  }

  function listenUsers(callback) {
    return listenCollection('users', callback, 'registeredAt');
  }

  function listenVisitReports(callback) {
    return listenCollection('visitReports', callback, 'submittedAt');
  }

  window.firebaseService = {
    isReady,
    getCollection,
    getUser,
    authenticateUser,
    registerUser,
    updateUser,
    deleteUser,
    getUsers,
    listenUsers,
    getVisitReports,
    saveVisitReport,
    deleteVisitReport,
    listenVisitReports,
    listenCollection
  };
})();

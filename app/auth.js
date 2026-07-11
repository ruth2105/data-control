// ===================== AUTHENTICATION SYSTEM =====================

const LOCAL_USERS_KEY = 'fremenatos_users';

// User database (in production, this should be on a server)
const USERS = {
  admin: {
    password: '',
    role: 'admin',
    teamId: null,
    name: 'Administrator',
    nameZh: '管理员'
  },
  // Team 1
  sales1: { password: 'team1', role: 'sales', teamId: 1, name: 'Ephrata', nameZh: 'Ephrata' },
  // Team 2
  sales2: { password: 'team2', role: 'sales', teamId: 2, name: 'Kalkidan', nameZh: 'Kalkidan' },
  // Team 3
  sales3: { password: 'team3', role: 'sales', teamId: 3, name: 'Tizita', nameZh: 'Tizita' }
  // Team 4, 5, 6 - Add new salespeople here when they join
};

// Team definitions
const TEAMS = {
  1: { name: 'Team 1', nameZh: '第一组', color: '#3b82f6' },
  2: { name: 'Team 2', nameZh: '第二组', color: '#10b981' },
  3: { name: 'Team 3', nameZh: '第三组', color: '#f59e0b' },
  4: { name: 'Team 4', nameZh: '第四组', color: '#8b5cf6' },
  5: { name: 'Team 5', nameZh: '第五组', color: '#ec4899' },
  6: { name: 'Team 6', nameZh: '第六组', color: '#06b6d4' }
};

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

function getDeletedUsers() {
  try {
    return JSON.parse(localStorage.getItem('fremenatos_deleted_users') || '[]');
  } catch (e) {
    return [];
  }
}

function getUserRecord(username) {
  const normalizedUsername = String(username || '').trim().toLowerCase();
  const localUsers = getStoredUsers();
  const deleted = getDeletedUsers();
  if (deleted.includes(normalizedUsername)) return null;
  const localUser = localUsers.find(u => String(u.username || '').trim().toLowerCase() === normalizedUsername);

  if (localUser) {
    return { ...localUser, username: normalizedUsername };
  }

  if (USERS[normalizedUsername]) {
    return { ...USERS[normalizedUsername], username: normalizedUsername };
  }

  return null;
}

function saveUserRecords(users) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function updateCurrentUserProfile(updates) {
  const user = getCurrentUser();
  if (!user) {
    return { success: false, message: 'Not logged in' };
  }

  const normalizedUsername = String(user.username || '').trim().toLowerCase();
  const localUsers = getStoredUsers();
  const existingIndex = localUsers.findIndex(u => String(u.username || '').trim().toLowerCase() === normalizedUsername);
  const existingUser = getUserRecord(normalizedUsername) || {};
  const nextUser = {
    ...existingUser,
    ...updates,
    username: normalizedUsername,
    role: existingUser.role || user.role,
    teamId: existingUser.teamId ?? user.teamId,
    name: updates.name ?? existingUser.name ?? user.name,
    nameZh: updates.nameZh ?? existingUser.nameZh ?? user.nameZh
  };

  if (existingIndex >= 0) {
    localUsers[existingIndex] = nextUser;
  } else {
    localUsers.push(nextUser);
  }

  saveUserRecords(localUsers);

  const updatedSession = {
    ...user,
    ...nextUser,
    username: normalizedUsername,
    name: nextUser.name,
    nameZh: nextUser.nameZh
  };

  if (localStorage.getItem('userSession')) {
    localStorage.setItem('userSession', JSON.stringify(updatedSession));
  }
  sessionStorage.setItem('userSession', JSON.stringify(updatedSession));

  return { success: true, message: 'Profile updated successfully' };
}

function changeCurrentUserPassword(currentPassword, newPassword) {
  const user = getCurrentUser();
  if (!user) {
    return { success: false, message: 'Not logged in' };
  }

  const normalizedUsername = String(user.username || '').trim().toLowerCase();
  const userRecord = getUserRecord(normalizedUsername);
  if (!userRecord) {
    return { success: false, message: 'User not found' };
  }

  let actualPassword = userRecord.password;
  if (normalizedUsername === 'admin') {
    const storedAdminPassword = localStorage.getItem('admin_password');
    if (storedAdminPassword) {
      actualPassword = storedAdminPassword;
    }
  }

  if (String(actualPassword || '') !== String(currentPassword || '')) {
    return { success: false, message: 'Current password is incorrect' };
  }

  if (String(newPassword || '').length < 6) {
    return { success: false, message: 'New password must be at least 6 characters' };
  }

  if (String(newPassword || '') === String(currentPassword || '')) {
    return { success: false, message: 'New password must be different from current password' };
  }

  const localUsers = getStoredUsers();
  const existingIndex = localUsers.findIndex(u => String(u.username || '').trim().toLowerCase() === normalizedUsername);
  const updatedUser = { ...userRecord, username: normalizedUsername, password: newPassword };

  if (existingIndex >= 0) {
    localUsers[existingIndex] = updatedUser;
  } else {
    localUsers.push(updatedUser);
  }

  saveUserRecords(localUsers);

  if (normalizedUsername === 'admin') {
    localStorage.setItem('admin_password', newPassword);
  }

  return { success: true, message: 'Password changed successfully' };
}

// ===================== LOGIN FUNCTION =====================
function login(username, password, rememberMe = false) {
  const normalizedUsername = String(username || '').trim().toLowerCase();
  const normalizedPassword = String(password || '');

  const localUsers = (() => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
    } catch (error) {
      return [];
    }
  })();

  const localUser = localUsers.find(u => String(u.username || '').toLowerCase() === normalizedUsername);
  const fallbackUser = USERS[normalizedUsername];
  const user = localUser || fallbackUser;
  
  if (!user) {
    return { success: false, message: 'Invalid username' };
  }
  
  // Admin accounts start without a fixed password and are forced to set one on first login.
  let actualPassword = user.password;
  if (normalizedUsername === 'admin') {
    const storedAdminPassword = localStorage.getItem('admin_password');
    if (storedAdminPassword) {
      actualPassword = storedAdminPassword;
    }
  }

  if (normalizedUsername === 'admin' && !String(actualPassword || '').trim()) {
    const isInitialSetup = Boolean(normalizedPassword && normalizedPassword.trim());
    if (!isInitialSetup) {
      return { success: false, message: 'Please choose a password for the admin account' };
    }

    return {
      success: true,
      role: user.role,
      teamId: user.teamId,
      message: 'Please set a new password',
      mustChangePassword: true
    };
  }

  if (String(actualPassword || '') !== normalizedPassword) {
    return { success: false, message: 'Invalid password' };
  }
  
  // 🔒 Check if user is approved (not pending)
  if (user.status && String(user.status).toLowerCase() === 'pending') {
    return { 
      success: false, 
      message: 'Account pending approval. Please wait for admin to approve your registration.' 
    };
  }
  
  const session = {
    username: normalizedUsername,
    role: user.role,
    teamId: user.teamId,
    name: user.name,
    nameZh: user.nameZh,
    loginTime: new Date().toISOString(),
    rememberMe: rememberMe  // ✅ Store rememberMe preference
  };
  
  // Store session ONLY if Remember Me is checked
  if (rememberMe) {
    localStorage.setItem('userSession', JSON.stringify(session));
  } else {
    // Don't store session anywhere - will require re-login on refresh
    sessionStorage.setItem('userSession', JSON.stringify(session));
  }
  
  return {
    success: true,
    role: user.role,
    teamId: user.teamId,
    user: {
      username: normalizedUsername,
      role: user.role,
      teamId: user.teamId,
      name: user.name,
      nameZh: user.nameZh
    },
    message: 'Login successful'
  };
}

// ===================== CLEAR SESSION =====================
function clearSession() {
  localStorage.removeItem('userSession');
  sessionStorage.removeItem('userSession');
}

// ===================== LOGOUT FUNCTION =====================
function getLoginRedirectUrl() {
  const path = (window.location.pathname || '').toLowerCase();
  if (path.includes('/app/')) {
    return '../login.html?v=20260711';
  }
  return 'login.html?v=20260711';
}

function logout() {
  clearSession();
  window.location.replace(getLoginRedirectUrl());
}

// ===================== GET CURRENT USER =====================
function getCurrentUser() {
  // Check localStorage first (Remember Me = checked, persists for 8 hours)
  const localData = localStorage.getItem('userSession');
  
  if (localData) {
    try {
      const session = JSON.parse(localData);
      
      // Check if session is expired (8 hours)
      const loginTime = new Date(session.loginTime);
      const now = new Date();
      const hoursDiff = (now - loginTime) / 1000 / 60 / 60;
      
      if (hoursDiff > 8) {
        localStorage.removeItem('userSession');
        return null;
      }
      
      return session;
    } catch (e) {
      localStorage.removeItem('userSession');
      return null;
    }
  }
  
  // Check sessionStorage (Remember Me = NOT checked, persists for the current browser tab)
  const sessionData = sessionStorage.getItem('userSession');
  
  if (sessionData) {
    try {
      const session = JSON.parse(sessionData);
      const loginTime = new Date(session.loginTime);
      const now = new Date();
      const hoursDiff = (now - loginTime) / 1000 / 60 / 60;
      
      if (hoursDiff > 8) {
        sessionStorage.removeItem('userSession');
        return null;
      }
      
      return session;
    } catch (e) {
      sessionStorage.removeItem('userSession');
      return null;
    }
  }
  
  // No session found
  return null;
}

// ===================== CHECK ACCESS =====================
function requireAuth(requiredRole = null) {
  const user = getCurrentUser();
  
  if (!user) {
    return null;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return user;
  }
  
  return user;
}

// ===================== CHECK IF ADMIN =====================
function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

// ===================== GET USER'S TEAM =====================
function getUserTeam() {
  const user = getCurrentUser();
  return user ? user.teamId : null;
}

// ===================== GET TEAM INFO =====================
function getTeamInfo(teamId) {
  return TEAMS[teamId] || null;
}

// ===================== GET ALL TEAMS =====================
function getAllTeams() {
  return TEAMS;
}

// ===================== FILTER CUSTOMERS BY TEAM =====================
function filterCustomersByTeam(customers, teamId) {
  if (!teamId) return customers; // Admin sees all
  return customers.filter(c => c.teamId === teamId);
}

// ===================== AUTO-REDIRECT IF LOGGED IN =====================
function redirectIfLoggedIn() {
  const user = getCurrentUser();
  if (user) {
    if (user.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'sales.html';
    }
  }
}

// ===================== UPDATE USER DISPLAY =====================
function updateUserDisplay() {
  const user = getCurrentUser();
  if (!user) return;
  
  const userNameEl = document.getElementById('userName');
  const userRoleEl = document.getElementById('userRole');
  
  if (userNameEl) {
    userNameEl.textContent = user.name;
  }
  
  if (userRoleEl) {
    if (user.role === 'admin') {
      userRoleEl.textContent = 'Administrator';
    } else {
      const teamInfo = getTeamInfo(user.teamId);
      userRoleEl.textContent = teamInfo ? teamInfo.name : 'Sales Team';
    }
  }
}

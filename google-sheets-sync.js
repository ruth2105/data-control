// ===================== GOOGLE SHEETS SYNC MODULE =====================
// This module provides cross-device synchronization using Google Sheets

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwd9xSndeU_Lvm2-Dtb-E5MVvC5aIYj5_GQ8j2AW6F8IVRIehNmKM0fQaqC7Hmoex9g/exec';

// Data type constants
const DATA_TYPES = {
  USERS: 'users',
  CUSTOMERS: 'customers', 
  VISIT_REPORTS: 'visitReports',
  POTENTIAL_CUSTOMERS: 'potentialCustomers',
  FACILITY_SUMMARIES: 'facilitySummaries'
};

// LocalStorage keys
const STORAGE_KEYS = {
  [DATA_TYPES.USERS]: 'fremenatos_users',
  [DATA_TYPES.CUSTOMERS]: 'fremenatos_machine', // Will handle both machine and external
  [DATA_TYPES.VISIT_REPORTS]: 'fremenatos_visitReports',
  [DATA_TYPES.POTENTIAL_CUSTOMERS]: 'fremenatos_potentials',
  [DATA_TYPES.FACILITY_SUMMARIES]: 'fremenatos_facility_summaries'
};

// ===================== GENERIC SYNC FUNCTIONS =====================

/**
 * Fetch data from Google Sheets
 * @param {string} dataType - The type of data to fetch
 * @returns {Promise<Array>} - Array of data objects
 */
async function fetchFromGoogleSheets(dataType) {
  try {
    const response = await fetch(`${SCRIPT_URL}?action=get${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`);
    const result = await response.json();
    
    if (result.status === 'success' || result.status === 'ok') {
      return result.data || [];
    }
    return [];
  } catch (error) {
    console.error(`Error fetching ${dataType} from Google Sheets:`, error);
    return [];
  }
}

/**
 * Save data to Google Sheets
 * @param {string} dataType - The type of data to save
 * @param {Array} data - Array of data objects
 * @returns {Promise<boolean>} - Success status
 */
async function saveToGoogleSheets(dataType, data) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: `save${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`,
        data: data
      })
    });
    const result = await response.json();
    return result.status === 'success' || result.status === 'ok';
  } catch (error) {
    console.error(`Error saving ${dataType} to Google Sheets:`, error);
    return false;
  }
}

/**
 * Sync data between localStorage and Google Sheets
 * @param {string} dataType - The type of data to sync
 * @param {boolean} forceRefresh - Force refresh from server
 * @returns {Promise<Array>} - Synced data array
 */
async function syncData(dataType, forceRefresh = false) {
  const storageKey = STORAGE_KEYS[dataType];
  if (!storageKey) {
    console.error(`Unknown data type: ${dataType}`);
    return [];
  }

  // Get local data
  const localData = JSON.parse(localStorage.getItem(storageKey) || '[]');
  
  // Fetch remote data
  const remoteData = await fetchFromGoogleSheets(dataType);
  
  // Merge data (remote takes precedence for conflicts)
  const mergedData = mergeData(localData, remoteData, dataType);
  
  // Save merged data to localStorage
  localStorage.setItem(storageKey, JSON.stringify(mergedData));
  
  // If local data was newer or different, sync back to server
  if (JSON.stringify(localData) !== JSON.stringify(remoteData) && !forceRefresh) {
    await saveToGoogleSheets(dataType, mergedData);
  }
  
  return mergedData;
}

/**
 * Merge local and remote data
 * @param {Array} localData - Local data array
 * @param {Array} remoteData - Remote data array
 * @param {string} dataType - Type of data for merge logic
 * @returns {Array} - Merged data array
 */
function mergeData(localData, remoteData, dataType) {
  const merged = new Map();
  
  // Add remote data first (takes precedence)
  remoteData.forEach(item => {
    const key = getDataKey(item, dataType);
    if (key) merged.set(key, item);
  });
  
  // Add local data, only if not in remote (local wins for conflicts)
  localData.forEach(item => {
    const key = getDataKey(item, dataType);
    if (key && !merged.has(key)) {
      merged.set(key, item);
    }
  });
  
  return Array.from(merged.values());
}

/**
 * Get unique key for data item based on type
 * @param {Object} item - Data item
 * @param {string} dataType - Type of data
 * @returns {string} - Unique key
 */
function getDataKey(item, dataType) {
  switch (dataType) {
    case DATA_TYPES.USERS:
      return item.username;
    case DATA_TYPES.CUSTOMERS:
      return `${item.id}_${item.model}`;
    case DATA_TYPES.VISIT_REPORTS:
      return String(item.id);
    case DATA_TYPES.POTENTIAL_CUSTOMERS:
      return item.name.toLowerCase();
    case DATA_TYPES.FACILITY_SUMMARIES:
      return Object.keys(item)[0]; // Key is hospital name
    default:
      return JSON.stringify(item);
  }
}

// ===================== SPECIFIC SYNC FUNCTIONS =====================

/**
 * Sync users
 */
async function syncUsers() {
  return syncData(DATA_TYPES.USERS);
}

/**
 * Sync customers (both machine and external)
 */
async function syncCustomers() {
  // Sync machine customers
  const machineData = await syncData(DATA_TYPES.CUSTOMERS);
  localStorage.setItem('fremenatos_machine', JSON.stringify(machineData));
  
  // Sync external customers (stored separately but synced similarly)
  const externalData = JSON.parse(localStorage.getItem('fremenatos_external') || '[]');
  // For now, external customers use the same sync logic
  // You may need to adjust this based on your Google Sheets structure
  
  return machineData;
}

/**
 * Sync visit reports
 */
async function syncVisitReports() {
  return syncData(DATA_TYPES.VISIT_REPORTS);
}

/**
 * Sync potential customers
 */
async function syncPotentialCustomers() {
  return syncData(DATA_TYPES.POTENTIAL_CUSTOMERS);
}

/**
 * Sync facility summaries
 */
async function syncFacilitySummaries() {
  return syncData(DATA_TYPES.FACILITY_SUMMARIES);
}

/**
 * Sync all data
 */
async function syncAll() {
  try {
    const results = await Promise.allSettled([
      syncUsers(),
      syncCustomers(),
      syncVisitReports(),
      syncPotentialCustomers(),
      syncFacilitySummaries()
    ]);
    
    const failures = results.filter(r => r.status === 'rejected');
    if (failures.length > 0) {
      console.warn('Some sync operations failed:', failures);
    }
    
    return results.every(r => r.status === 'fulfilled');
  } catch (error) {
    console.error('Error during full sync:', error);
    return false;
  }
}

// ===================== AUTO-SYNC ON DATA CHANGES =====================

/**
 * Wrapper for localStorage setItem that triggers sync
 */
const originalSetItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value) {
  originalSetItem.call(this, key, value);
  
  // Determine data type and trigger sync
  const dataType = Object.values(STORAGE_KEYS).find(k => k === key);
  if (dataType) {
    const type = Object.keys(STORAGE_KEYS).find(k => STORAGE_KEYS[k] === key);
    if (type) {
      // Debounced sync to avoid excessive API calls
      debouncedSync(type);
    }
  }
};

// Debounce function
let syncTimeouts = {};
function debouncedSync(dataType, delay = 2000) {
  if (syncTimeouts[dataType]) {
    clearTimeout(syncTimeouts[dataType]);
  }
  syncTimeouts[dataType] = setTimeout(() => {
    syncData(dataType).catch(err => {
      console.error(`Auto-sync failed for ${dataType}:`, err);
    });
  }, delay);
}

// ===================== OFFLINE DETECTION =====================

let isOnline = navigator.onLine;

window.addEventListener('online', () => {
  isOnline = true;
  console.log('Back online - syncing data...');
  syncAll();
});

window.addEventListener('offline', () => {
  isOnline = false;
  console.log('Gone offline - using localStorage only');
});

/**
 * Check if online
 */
function checkOnline() {
  return isOnline;
}

// ===================== INITIALIZATION =====================

/**
 * Initialize sync on page load
 */
function initializeSync() {
  if (checkOnline()) {
    // Sync all data on load
    syncAll().then(success => {
      if (success) {
        console.log('Initial sync completed successfully');
      } else {
        console.warn('Initial sync had some failures');
      }
    });
  } else {
    console.log('Offline - using cached data from localStorage');
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSync);
} else {
  initializeSync();
}

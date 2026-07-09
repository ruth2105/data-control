# 🔄 Data Sync Solution for Multi-Device Access

## 📋 Current Problem

**Device A (your PC):**
- ✅ Has all hospitals in localStorage
- ✅ Has all summaries in localStorage
- ✅ Can add visit reports
- ✅ Visit reports sync to Google Sheets

**Device B (another user):**
- ❌ NO hospitals (localStorage is empty)
- ❌ NO summaries (localStorage is empty)
- ✅ Can see visit reports from Google Sheets
- ❌ Can't see which hospitals exist to create new reports

---

## ✅ Solution: Unified Data Source (Google Sheets)

### What Needs to Change:

1. **Hospital List** → Store in Google Sheets
2. **Hospital Summaries** → Store in Google Sheets (as part of hospital record)
3. **Visit Reports** → Already syncing ✅
4. **Page Load** → Fetch everything from Sheets first, then fallback to localStorage

---

## 🎯 Implementation Steps:

### Step 1: Upload Master Data to Google Sheets

Use `UPLOAD_TO_SHEETS.html` to upload:
- All 76 hospitals
- All 69 summaries
- All existing visit reports

This is a **ONE-TIME migration**.

### Step 2: Modify Apps Script to Store Hospitals

Your Google Apps Script needs these functions:

```javascript
// Save hospital
function saveHospital(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hospitals');
  // Check if exists, update or append
  // Return success
}

// Get all hospitals
function getHospitals() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hospitals');
  const data = sheet.getDataRange().getValues();
  // Convert to JSON array
  return data;
}

// Get hospital summary by name
function getHospitalSummary(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hospitals');
  // Find hospital by name
  // Return summary field
}
```

### Step 3: Modify HTML Pages to Load from Sheets

In `app/sales.html` and `index.html`, change data loading:

**OLD (localStorage only):**
```javascript
const potentials = JSON.parse(localStorage.getItem('fremenatos_potentials') || '[]');
const summaries = JSON.parse(localStorage.getItem('fremenatos_facility_summaries') || '{}');
```

**NEW (Sheets first, localStorage fallback):**
```javascript
// Load hospitals from Google Sheets
async function loadHospitals() {
  try {
    const response = await fetch(SCRIPT_URL + '?action=getHospitals');
    const data = await response.json();
    if (data.status === 'success') {
      // Save to localStorage as cache
      localStorage.setItem('fremenatos_potentials', JSON.stringify(data.hospitals));
      localStorage.setItem('fremenatos_facility_summaries', JSON.stringify(data.summaries));
      return data.hospitals;
    }
  } catch (error) {
    console.warn('Failed to load from Sheets, using localStorage:', error);
  }
  
  // Fallback to localStorage if offline
  return JSON.parse(localStorage.getItem('fremenatos_potentials') || '[]');
}

// Call on page load
window.addEventListener('DOMContentLoaded', async () => {
  const hospitals = await loadHospitals();
  // Render UI with hospitals
});
```

---

## 🚀 Simpler Alternative: Hybrid Sync

If modifying Apps Script is complex, use this approach:

### 1. Master Data Upload (One-Time)
- Upload hospitals + summaries once using `UPLOAD_TO_SHEETS.html`
- This populates Google Sheets with baseline data

### 2. Page Load Logic
```javascript
async function initializeData() {
  // Try to fetch from Google Sheets
  try {
    const response = await fetch(SCRIPT_URL + '?action=getAllData');
    const data = await response.json();
    
    if (data.hospitals && data.hospitals.length > 0) {
      // Use Sheets data
      window.hospitals = data.hospitals;
      window.summaries = data.summaries;
      // Cache locally for offline use
      localStorage.setItem('cache_hospitals', JSON.stringify(data.hospitals));
      localStorage.setItem('cache_summaries', JSON.stringify(data.summaries));
    } else {
      // Fallback to localStorage
      window.hospitals = JSON.parse(localStorage.getItem('cache_hospitals') || '[]');
      window.summaries = JSON.parse(localStorage.getItem('cache_summaries') || '{}');
    }
  } catch (error) {
    // Offline - use cached data
    window.hospitals = JSON.parse(localStorage.getItem('cache_hospitals') || '[]');
    window.summaries = JSON.parse(localStorage.getItem('cache_summaries') || '{}');
  }
  
  // Render UI
  renderHospitals(window.hospitals);
}
```

### 3. Visit Report Flow (Already Working)
- User adds visit report
- Saves to localStorage
- Queues for sync to Google Sheets
- Syncs when online

---

## 📊 Data Flow After Implementation:

### Device A (First Time):
1. Opens app → Loads from Google Sheets
2. Sees all 76 hospitals + 69 summaries
3. Adds visit report → Saves to Sheets
4. Other devices see the new report

### Device B (Any Time Later):
1. Opens app → Loads from Google Sheets
2. Sees same 76 hospitals + 69 summaries
3. Can add reports for any hospital
4. Reports sync back to Sheets

### Offline Mode:
1. Opens app → Loads from cached localStorage
2. Can still add reports
3. Reports queue for sync
4. Syncs when back online

---

## ✅ What You Need to Do:

### Option 1: Full Implementation (Best)
1. ✅ Upload master data using `UPLOAD_TO_SHEETS.html`
2. ✅ Modify Apps Script to handle hospital CRUD operations
3. ✅ Update HTML pages to load from Sheets first
4. ✅ Test on multiple devices

### Option 2: Quick Fix (Faster)
1. ✅ Upload master data using `UPLOAD_TO_SHEETS.html`
2. ✅ Add a "Refresh Data" button that loads from Sheets
3. ✅ Users click refresh to get latest data
4. ✅ Visit reports still auto-sync

---

## 🔧 Apps Script Code Needed:

Add to your `appsscript.gs`:

```javascript
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getHospitals') {
    return getHospitalsData();
  }
  if (action === 'getVisitReports') {
    return getVisitReportsData();
  }
  
  return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Unknown action'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;
  
  if (action === 'saveHospital') {
    return saveHospitalData(data);
  }
  if (action === 'saveVisitReport') {
    return saveVisitReportData(data);
  }
  
  return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Unknown action'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function getHospitalsData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hospitals');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const hospitals = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = {};
    headers.forEach((header, index) => {
      row[header] = data[i][index];
    });
    hospitals.push(row);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    hospitals: hospitals
  })).setMimeType(ContentService.MimeType.JSON);
}

function saveHospitalData(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hospitals');
  
  // Check if hospital exists
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values[0];
  const nameIndex = headers.indexOf('hospitalName');
  
  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][nameIndex] === data.hospitalName) {
      rowIndex = i + 1;
      break;
    }
  }
  
  if (rowIndex > 0) {
    // Update existing
    headers.forEach((header, index) => {
      if (data[header] !== undefined) {
        sheet.getRange(rowIndex, index + 1).setValue(data[header]);
      }
    });
  } else {
    // Append new
    const newRow = headers.map(header => data[header] || '');
    sheet.appendRow(newRow);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Hospital saved'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

---

## 📝 Summary:

**Current State:** Data only local to each device  
**Goal:** Data shared across all devices via Google Sheets  
**Solution:** Upload master data once, then all new data auto-syncs  
**Result:** Any device can access and update shared data  

**Next Step:** Run `UPLOAD_TO_SHEETS.html` to migrate your data! 🚀

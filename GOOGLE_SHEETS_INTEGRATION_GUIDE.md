# Google Sheets Integration - Complete Setup Guide

## ✅ COMPLETED STEPS

### 1. Google Sheet Structure Created
- File: `GOOGLE_SHEET_SETUP.txt`
- Tabs created with proper headers:
  - Users
  - Customers
  - VisitReports
  - PotentialCustomers
  - FacilitySummaries
  - Announcements (Optional)

### 2. Apps Script Code Created
- File: `APPS_SCRIPT_CODE.gs`
- Complete API endpoints for all operations
- Handles GET and POST requests
- Proper error handling and data validation

### 3. JavaScript API Client Created
- File: `google-sheets-api.js`
- Client library for API calls
- Sync functions for localStorage integration
- Fallback to localStorage if API fails

### 4. HTML Files Updated
- `index.html` - Added Google Sheets API integration
- `app/sales.html` - Added Google Sheets API integration
- Both files now sync data with Google Sheets

## 🚀 NEXT STEPS TO COMPLETE SETUP

### Step 1: Copy Apps Script to Google Sheet
1. Open your Google Sheet
2. Go to Extensions → Apps Script
3. Delete any existing code
4. Copy contents of `APPS_SCRIPT_CODE.gs`
5. Paste into the Apps Script editor
6. Save the script

### Step 2: Deploy as Web App
1. In Apps Script editor, click "Deploy" → "New deployment"
2. Select type: "Web app"
3. Description: "Hospital Management API"
4. Execute as: "Me"
5. Who has access: "Anyone"
6. Click "Deploy"
7. Copy the Web App URL

### Step 3: Update API URL in Client
1. Open `google-sheets-api.js`
2. Replace the SCRIPT_URL with your deployed URL
3. Save the file

### Step 4: Test Integration
1. Open `index.html` in browser
2. Login with admin credentials
3. Create a test customer
4. Check if it appears in Google Sheet
5. Create a test visit report
6. Check if it appears in Google Sheet

## 🔧 TROUBLESHOOTING

### If API calls fail:
- Check console for CORS errors
- Verify Web App deployment settings
- Ensure "Anyone" has access
- Check Apps Script execution logs

### If data doesn't sync:
- Check network connection
- Verify API URL is correct
- Check browser console for errors
- Ensure Google Sheet has proper permissions

### If localStorage is used instead:
- This is expected fallback behavior
- System will use localStorage if API fails
- Data will sync when connection is restored

## 📊 DATA FLOW

### Reading Data:
1. Page loads
2. Tries Google Sheets API first
3. Falls back to localStorage if API fails
4. Updates UI with data

### Writing Data:
1. User makes changes
2. Saves to localStorage immediately
3. Syncs to Google Sheets in background
4. Shows success/error in console

## 🎯 KEY FEATURES

- **Offline Support**: Works with localStorage when offline
- **Auto Sync**: Syncs data when connection restored
- **Error Handling**: Graceful fallback to localStorage
- **Cross-Device**: Data syncs across all devices
- **Real-time**: Changes reflect immediately in Google Sheet

## 📝 NOTES

- The system uses a hybrid approach (localStorage + Google Sheets)
- localStorage is primary storage for speed
- Google Sheets is for cross-device sync
- Both storage methods stay in sync automatically
- No data loss if either system fails

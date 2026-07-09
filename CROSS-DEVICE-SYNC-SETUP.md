# Cross-Device Sync Setup Guide

This guide explains how to set up Google Sheets sync for cross-device data synchronization.

## Overview

The Hospital Management System now supports real-time data synchronization across multiple devices using Google Sheets as the backend database. This means:
- Data entered on one device automatically appears on other devices
- All users see the same customer data, reports, and user information
- No need for manual data export/import between devices

## Prerequisites

1. A Google account
2. Access to Google Sheets
3. The Hospital Management System files

## Setup Instructions

### Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it something like "Hospital Management Database"
4. Keep this tab open - you'll need it

### Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code in the editor
3. Open the file `GoogleAppsScriptBackend.txt` from your project folder
4. Copy all the code from that file
5. Paste it into the Apps Script editor
6. Save the script (Ctrl+S or Cmd+S)

### Step 3: Initialize the Sheets

1. In the Apps Script editor, select the function `initializeSheets` from the dropdown
2. Click **Run**
3. Grant permissions when prompted (this allows the script to access your spreadsheet)
4. This will create the necessary sheets with proper headers:
   - Users
   - Customers
   - VisitReports
   - PotentialCustomers
   - FacilitySummaries

### Step 4: Deploy the Web App

1. In the Apps Script editor, click **Deploy > New Deployment**
2. Select type: **Web app**
3. Fill in the details:
   - **Description**: Hospital Management Backend
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web App URL** (it will look like: `https://script.google.com/macros/s/.../exec`)

### Step 5: Update Your Project Files

1. Open `google-sheets-sync.js` in your project
2. Find the line: `const SCRIPT_URL = 'https://script.google.com/macros/s/...'`
3. Replace the URL with your new Web App URL from Step 4
4. Open `index.html` in your project
5. Find the line: `const SCRIPT_URL = 'https://script.google.com/macros/s/...'`
6. Replace it with your new Web App URL as well

### Step 6: Test the Sync

1. Open `index.html` in your browser
2. Login as admin
3. Register a new user in the login page
4. Go to Users tab in the admin dashboard
5. You should see the new user in pending approvals
6. Approve the user
7. Open the same `index.html` on a different device or browser
8. Login as admin
9. The approved user should appear there too

## How It Works

### Automatic Sync

- **On page load**: The system automatically syncs all data from Google Sheets
- **On data changes**: When you save data (customers, reports, users), it automatically syncs to Google Sheets
- **Offline mode**: If you're offline, data is saved to localStorage and syncs when you're back online

### Data Types Synced

1. **Users**: User accounts, registrations, team assignments
2. **Customers**: Machine and external customer data
3. **Visit Reports**: All visit reports and customer interactions
4. **Potential Customers**: Leads and potential customers
5. **Facility Summaries**: Hospital summaries for reports

### Conflict Resolution

- Google Sheets data takes precedence over local data
- If multiple devices edit the same data simultaneously, the last save wins
- The system attempts to merge data intelligently

## Troubleshooting

### "Sync failed" errors

- Check your internet connection
- Verify the SCRIPT_URL is correct in both files
- Make sure the Google Apps Script is deployed as a Web App
- Check that the Web App has "Anyone" access permissions

### Data not appearing on other devices

- Wait 2-3 seconds for auto-sync to complete
- Refresh the page on the other device
- Check browser console for sync errors
- Verify the Google Sheet has the data

### Permission errors

- Make sure you granted permissions when running initializeSheets
- Re-deploy the Web App if permissions changed
- Check that your Google account has access to the spreadsheet

### Slow performance

- The initial sync may take a few seconds
- Large datasets may sync slower
- Consider archiving old data if performance is poor

## Security Notes

- **Web App Access**: Set to "Anyone" allows public access to your data
- **Data Privacy**: Your data is stored in your Google Sheets account
- **Authentication**: The system uses localStorage for user sessions, not Google authentication
- **Recommendation**: For production use, consider adding proper authentication to the Google Apps Script

## Advanced Configuration

### Custom Sheet Names

If you want to use different sheet names, edit the `SHEET_NAMES` constant in the Google Apps Script:
```javascript
const SHEET_NAMES = {
  USERS: 'MyUsers',
  CUSTOMERS: 'MyCustomers',
  // etc.
};
```

### Sync Frequency

Auto-sync happens 2 seconds after data changes. To change this, edit the delay in `google-sheets-sync.js`:
```javascript
debouncedSync(dataType, delay = 2000) // Change 2000 to your desired milliseconds
```

### Disable Auto-Sync

To disable automatic syncing and sync only manually:
1. Comment out the Storage.prototype.setItem override in `google-sheets-sync.js`
2. Call sync functions manually when needed

## Maintenance

### Backup Your Data

- Regularly export your Google Sheet as Excel/CSV
- Keep a copy of the Google Apps Script code
- Document any customizations you make

### Monitor Usage

- Check Google Sheet for data integrity
- Monitor for duplicate entries
- Clean up old/unused data periodically

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all setup steps were completed correctly
3. Test with a simple data change first
4. Check Google Apps Script execution logs

## Future Enhancements

Potential improvements:
- Real-time push notifications for data changes
- Conflict resolution with user selection
- Data encryption for sensitive information
- Audit trail for data changes
- Rate limiting to prevent API abuse

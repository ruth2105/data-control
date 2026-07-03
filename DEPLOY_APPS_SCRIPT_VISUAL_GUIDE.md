# 📸 Visual Step-by-Step: Deploy Google Apps Script

## 🎯 YOUR GOAL
Connect your website to Google Sheets so you can see customer potential data (Hot/Warm/Cold status, notes, patient loads)

---

## 🔍 CURRENT SITUATION

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR WEBSITE                              │
│                   (index.html)                               │
│                                                              │
│  ❌ Visit Reports Tab shows: "没有数据!" (No data!)         │
│                                                              │
│  Looking for data at:                                       │
│  SCRIPT_URL = 'https://script.google.com/macros/s/         │
│               AKfycbx5es8aX99NaIQ7i.../exec'                │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ ❌ BROKEN CONNECTION
                        │
┌───────────────────────▼──────────────────────────────────────┐
│              APPS SCRIPT PROJECT                             │
│   https://script.google.com/home/projects/                  │
│   1Jw72y2GkwI5Wd4uIyxZNapGL4-yJawXyXj4SmHoDURq...          │
│                                                              │
│  const SHEET_ID = '1lVTpBiw6LfSatgIMSOEpT6zG_5U...'         │
│                                                              │
│  ❌ Problem: This SHEET_ID doesn't exist or                 │
│              doesn't match your actual spreadsheet           │
└──────────────────────────────────────────────────────────────┘
```

---

## ✅ WHAT YOU NEED TO DO

### 🔸 TASK 1: Find Your Real Spreadsheet

```
1. Go to Google Drive
   https://drive.google.com

2. Find your spreadsheet for hospital/customer data
   
3. Open it and look at the URL:
   
   https://docs.google.com/spreadsheets/d/1abcXYZ123.../edit
                                           ↑
                                    THIS IS YOUR SHEET_ID
                                    (copy this part)
```

### 🔸 TASK 2: Update Apps Script

```
1. Go to Apps Script:
   https://script.google.com/home/projects/1Jw72y2GkwI5Wd4uIyxZNapGL4-yJawXyXj4SmHoDURqQR1H-lKCh_RY0/edit

2. Find line 1:
   const SHEET_ID = '1lVTpBiw6LfSatgIMSOEpT6zG_5UVd3c_HzSTZxHGEzY';

3. Replace with your real SHEET_ID from Task 1:
   const SHEET_ID = 'YOUR_REAL_SHEET_ID_HERE';

4. Click Save (💾)
```

### 🔸 TASK 3: Deploy as Web App

```
┌────────────────────────────────────────────────────────────┐
│  In Apps Script Editor:                                    │
│                                                            │
│  1. Click "Deploy" button (top right)                     │
│     ↓                                                      │
│  2. Select "New deployment"                               │
│     ↓                                                      │
│  3. Click gear icon ⚙️ → Select "Web app"                │
│     ↓                                                      │
│  4. Configure:                                            │
│     • Description: Hospital Customer API                  │
│     • Execute as: Me (your@email.com)                    │
│     • Who has access: Anyone ⚠️ IMPORTANT!               │
│     ↓                                                      │
│  5. Click "Deploy"                                        │
│     ↓                                                      │
│  6. Click "Authorize access"                              │
│     • Choose your Google account                          │
│     • Click "Advanced"                                    │
│     • Click "Go to Hospital Customer... (unsafe)"         │
│     • Click "Allow"                                       │
│     ↓                                                      │
│  7. COPY the Web App URL that appears!                    │
│     Example:                                              │
│     https://script.google.com/macros/s/AKfycbx.../exec   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 🔸 TASK 4: Update Website

```
1. Open index.html in text editor

2. Find line 1611 (press Ctrl+G to go to line):

   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5es8aX99NaIQ7iLFE3FNTmee-ONfLmYZ6SgHYFNlJlzozG9EqB-OoabAue81xz26HUQ/exec';

3. Replace with YOUR NEW URL from Task 3:

   const SCRIPT_URL = 'YOUR_NEW_WEB_APP_URL_FROM_TASK_3';

4. Save the file
```

### 🔸 TASK 5: Test!

```
1. Open index.html in web browser

2. Click "拜访报告" (Visit Reports) tab

3. You should see customer categories:
   • Popular Clients (Hot) 🔥
   • Warm Customers 🌡️
   • Cold customers ❄️
```

---

## 🎬 VISUAL FLOW AFTER SETUP

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR WEBSITE                              │
│                   (index.html)                               │
│                                                              │
│  ✅ Visit Reports Tab shows customer data!                  │
│     • Popular Clients (Hot): 18 facilities                  │
│     • Warm Customers: 8 facilities                          │
│     • Cold customers: 9 facilities                          │
│                                                              │
│  Sending requests to:                                       │
│  SCRIPT_URL = 'https://script.google.com/macros/s/         │
│               YOUR_NEW_URL.../exec'                         │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ ✅ WORKING CONNECTION
                        │
┌───────────────────────▼──────────────────────────────────────┐
│              DEPLOYED WEB APP                                │
│   https://script.google.com/macros/s/YOUR_NEW_URL/exec     │
│                                                              │
│   • Receives visit reports from website                     │
│   • Stores them in Google Sheets                            │
│   • Returns data to website for display                     │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ ✅ CORRECT SHEET_ID
                        │
┌───────────────────────▼──────────────────────────────────────┐
│              YOUR GOOGLE SPREADSHEET                         │
│   https://docs.google.com/spreadsheets/d/YOUR_REAL_ID/edit │
│                                                              │
│  Contains all customer and visit data:                      │
│  • Customer names, addresses, contacts                      │
│  • Status: Hot/Warm/Cold                                    │
│  • Patient loads, equipment info                            │
│  • Visit reports from sales team                            │
└──────────────────────────────────────────────────────────────┘
```

---

## ⚠️ COMMON MISTAKES TO AVOID

### ❌ Mistake 1: Wrong SHEET_ID
```
Symptom: "Exception: You do not have permission to call SpreadsheetApp.openById"
Solution: Use the SHEET_ID from YOUR actual Google Spreadsheet
```

### ❌ Mistake 2: Wrong Access Level
```
Symptom: "Authorization required" error in website
Solution: Set "Who has access" to "Anyone" in deployment settings
```

### ❌ Mistake 3: Old Web App URL
```
Symptom: Website still shows "No data!"
Solution: Update SCRIPT_URL in index.html with NEW deployment URL
```

### ❌ Mistake 4: Not Saving Files
```
Symptom: Changes don't take effect
Solution: 
  • Save appsscript.gs (💾 icon)
  • Save index.html (Ctrl+S)
  • Refresh browser (F5)
```

---

## 📞 VERIFICATION CHECKLIST

Before asking for help, verify:

- [ ] I found my real spreadsheet in Google Drive
- [ ] I copied the SHEET_ID from the URL
- [ ] I updated `const SHEET_ID = '...'` in Apps Script
- [ ] I saved the Apps Script file (💾)
- [ ] I clicked "Deploy" → "New deployment"
- [ ] I set "Who has access" to "Anyone"
- [ ] I authorized the app when prompted
- [ ] I copied the NEW Web App URL
- [ ] I updated `const SCRIPT_URL = '...'` in index.html (line 1611)
- [ ] I saved index.html
- [ ] I refreshed my browser (F5)
- [ ] I checked browser console for errors (F12)

---

## 🚀 ALTERNATIVE: Use Standalone Dashboard

**If you're having trouble with Google Sheets**, you can use the standalone dashboard immediately:

1. Open `CUSTOMER_POTENTIAL_DASHBOARD.html` in your browser
2. It shows all customer data without needing Google Sheets
3. Has Hot/Warm/Cold categories with all facility details

This is a working alternative while you set up the Google Sheets connection!

---

## 📊 SCREENSHOT LOCATIONS

When you need help, take screenshots of:

1. **Apps Script Editor** - showing the SHEET_ID line
2. **Deployment Settings** - showing "Who has access: Anyone"
3. **Web App URL** - the URL you got after deployment
4. **index.html line 1611** - showing the SCRIPT_URL
5. **Browser Console** (F12) - showing any error messages
6. **Visit Reports tab** - showing what you see (error or data)

# 📥 How to Import All Customer Potential Data to Your Website

## 🎯 GOAL
Show customer potential data (Hot/Warm/Cold status, notes, patient loads) in your website's Visit Reports tab

---

## ✅ I FIXED YOUR WEBSITE URL

Your `SCRIPT_URL` was corrupted (had two URLs mixed together). I fixed it to:
```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwd3Xpe2LTQeJ84XCWpJ-HTepFOC2aLSB-aSJJ6Ff0atg1ISiIW9E8Sl295qnKYghVIvQ/exec';
```

---

## 🔍 NOW CHECK THESE 3 THINGS:

### ✅ CHECK 1: Is your Apps Script using the correct spreadsheet?

1. **Find your spreadsheet ID**:
   - Go to https://drive.google.com
   - Open your spreadsheet with hospital data
   - Look at URL: `https://docs.google.com/spreadsheets/d/XXXXXXXXXX/edit`
   - Copy the `XXXXXXXXXX` part (your SHEET_ID)

2. **Check Apps Script**:
   - Open: https://script.google.com/home/projects/1Jw72y2GkwI5Wd4uIyxZNapGL4-yJawXyXj4SmHoDURqQR1H-lKCh_RY0/edit
   - Line 1 should be: `const SHEET_ID = 'YOUR_CORRECT_ID';`
   - If it's wrong, update it and click Save (💾)

### ✅ CHECK 2: Is the Apps Script deployed correctly?

The URL I found suggests it IS deployed: `AKfycbwd3Xpe2LTQeJ84XCWpJ-HTepFOC2aLSB-aSJJ6Ff0atg1ISiIW9E8Sl295qnKYghVIvQ`

To verify:
1. Go to Apps Script editor
2. Click "Deploy" → "Manage deployments"
3. You should see:
   - Status: Active ✅
   - Who has access: **Anyone** ⚠️ (must be "Anyone", not "Only myself")
   - Web app URL should match the one in your website

If "Who has access" is NOT "Anyone":
1. Click "Edit" (pencil icon)
2. Change "Who has access" to "Anyone"
3. Click "Deploy"
4. Copy the NEW web app URL
5. Update `SCRIPT_URL` in `index.html` with the new URL

### ✅ CHECK 3: Does your spreadsheet have data?

Your website's "Visit Reports" tab shows data from Google Sheets visit reports, NOT from the PDF data we extracted.

**The PDF data (Hot/Warm/Cold customers) is separate!**

To show the Hot/Warm/Cold potential data on your website, you need to either:

**OPTION A: Add potential fields to visit reports** (recommended)
1. When filling visit forms, add fields for:
   - Customer Status (Hot/Warm/Cold)
   - Customer Potential (High/Medium/Low)
   - Notes about the customer

**OPTION B: Create a separate customers database**
1. Create a new sheet in your spreadsheet called "Customers"
2. Import the data from `KALKIDAN_FACILITIES_DATA.csv`
3. Modify the website to read from both sheets (visits AND customers)

---

## 🚀 QUICK TEST

1. **Refresh your browser** (press F5)
2. **Open browser console** (press F12)
3. **Go to "拜访报告" (Visit Reports) tab**
4. **Check for errors in console**

**If you see**:
- ✅ "No data!" → Spreadsheet is empty (normal if you haven't submitted any visit reports)
- ❌ "CORS error" → Apps Script access is not set to "Anyone"
- ❌ "404 Not Found" → Wrong web app URL
- ❌ "Permission denied" → Wrong SHEET_ID in Apps Script

---

## 📊 UNDERSTANDING THE DATA FLOW

```
┌─────────────────────────────────────────────────────────┐
│  PDF FILES (Ephrata, Tizita, Kalkidan)                 │
│  • 80+ facilities with Hot/Warm/Cold status            │
│  • Already extracted to CSV files ✅                    │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ These are STATIC files
                 │ NOT connected to website yet
                 ▼
┌─────────────────────────────────────────────────────────┐
│  CSV FILES (in your folder)                            │
│  • KALKIDAN_FACILITIES_DATA.csv                        │
│  • CONTACT_DATA_IMPORT.csv                             │
│  • EQUIPMENT_DATA_IMPORT.csv                           │
└─────────────────────────────────────────────────────────┘

                 ❌ NOT CONNECTED

┌─────────────────────────────────────────────────────────┐
│  GOOGLE SPREADSHEET                                     │
│  • Stores VISIT REPORTS from sales team                │
│  • Updated when they fill the form on website          │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ Connected via Apps Script
                 ▼
┌─────────────────────────────────────────────────────────┐
│  APPS SCRIPT WEB APP                                    │
│  • Receives form submissions                            │
│  • Returns report data to website                       │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ SCRIPT_URL connection
                 ▼
┌─────────────────────────────────────────────────────────┐
│  YOUR WEBSITE (index.html)                             │
│  • Shows visit reports in "拜访报告" tab               │
│  • Form for submitting new visits                      │
└─────────────────────────────────────────────────────────┘
```

---

## 💡 TO SEE HOT/WARM/COLD DATA ON YOUR WEBSITE

You have TWO options:

### OPTION 1: Use the Standalone Dashboard (EASIEST!)
```
Just open this file in your browser:
CUSTOMER_POTENTIAL_DASHBOARD.html

It shows ALL 28 facilities with:
✅ Hot/Warm/Cold status
✅ Patient loads
✅ Equipment details
✅ Contact information
✅ Detailed notes

No Google Sheets connection needed!
```

### OPTION 2: Import to Google Sheets (for sales team)
1. Open your Google Spreadsheet
2. Create a new sheet/tab called "Customers"
3. Open `KALKIDAN_FACILITIES_DATA.csv`
4. Copy all data
5. Paste into the "Customers" sheet
6. Modify website to read from this sheet

---

## 🆘 STILL NOT WORKING?

Take a screenshot of:
1. **Browser console** (F12) showing any errors
2. **Apps Script line 1** showing your SHEET_ID
3. **Apps Script Deploy settings** showing "Who has access"
4. **What you see** in Visit Reports tab

Then I can help you fix the exact issue!

---

## ✅ SUMMARY OF WHAT'S FIXED

- ✅ Fixed corrupted SCRIPT_URL in index.html
- ✅ URL now points to your deployed Apps Script
- ✅ PDF data extracted to CSV files (28 facilities from Kalkidan)
- ✅ Standalone dashboard ready to use

**What you need to check**:
- ⚠️ SHEET_ID in Apps Script matches your real spreadsheet
- ⚠️ Apps Script deployed with "Anyone" access
- ⚠️ Understanding that Visit Reports ≠ Customer Potential data (they're separate!)

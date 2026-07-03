# 🔧 Export Troubleshooting Guide

## Error: "今安壳谨到错误" / "An error occurred"

This error appears when trying to export visit reports. Here's how to fix it:

---

## ✅ Quick Fix Steps

### Step 1: Check Browser Console
1. Press **F12** (or Right-click → Inspect)
2. Click **Console** tab
3. Look for red error messages
4. Take a screenshot and share with me

### Step 2: Verify Google Sheets Connection
1. Open your browser's console (F12)
2. Type this and press Enter:
```javascript
console.log(SCRIPT_URL)
```
3. You should see a URL like: `https://script.google.com/macros/s/...`
4. If you see `undefined`, the Google Sheets URL is missing!

### Step 3: Test Data Loading
1. Open browser console (F12)
2. Type this and press Enter:
```javascript
fetch(SCRIPT_URL).then(r=>r.json()).then(d=>console.log(d))
```
3. You should see data with `status: "ok"` and a `data` array
4. If you see an error, Google Sheets connection is broken

---

## 🎯 Common Causes & Solutions

### Cause 1: Google Sheets URL Not Set

**Symptoms:**
- Export fails immediately
- Console shows "SCRIPT_URL is not defined"

**Solution:**
1. Open `index.html` in a text editor
2. Find this line near the top:
```javascript
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL'` with your actual Apps Script web app URL
4. Should look like:
```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
```
5. Save and refresh the page

---

### Cause 2: Google Sheets Not Deployed

**Symptoms:**
- URL is set but export still fails
- Console shows 404 or 403 error

**Solution:**
1. Open Google Sheets
2. Click **Extensions** → **Apps Script**
3. Click **Deploy** → **Manage deployments**
4. If no deployments, click **New deployment**
5. Select type: **Web app**
6. Execute as: **Me**
7. Who has access: **Anyone**
8. Click **Deploy**
9. Copy the URL
10. Paste into `index.html`

---

### Cause 3: Browser Blocking Pop-ups

**Symptoms:**
- Export seems to work but no file downloads
- Browser shows "Pop-up blocked" message

**Solution:**
1. Look for pop-up blocked icon in address bar
2. Click it
3. Select "Always allow pop-ups from this site"
4. Try export again

---

### Cause 4: No Reports in Database

**Symptoms:**
- Error says "No data available"
- You see reports on screen but can't export

**Solution:**
This is normal if:
- Reports are only in browser local storage
- Not synced to Google Sheets yet

**Fix:**
1. Open any report
2. Click **Edit**
3. Click **Update Report** (even without changes)
4. This forces sync to Google Sheets
5. Try export again

---

### Cause 5: Browser Cache Issue

**Symptoms:**
- Export worked before but stopped working
- Recent code changes not taking effect

**Solution:**
1. Hard refresh the page:
   - Windows: `Ctrl + Shift + R` or `Ctrl + F5`
   - Mac: `Cmd + Shift + R`
2. Or clear browser cache:
   - Chrome: Settings → Privacy → Clear browsing data
   - Select "Cached images and files"
   - Click "Clear data"
3. Refresh the page

---

## 🔍 Debug Mode

### Enable Debug Logging:

1. Open browser console (F12)
2. The export function now logs:
```
Export button clicked - fetching reports...
Reports received: 80
```

3. If you see "Reports received: 0", the problem is data loading
4. If you see an error after that, the problem is in export logic

---

## 📋 Step-by-Step Export Test

### Test 1: Can You See Reports?
- Go to **📋 Visit Reports** tab
- Do you see report cards? ✅ YES / ❌ NO

**If NO**: Problem is with data loading, not export

### Test 2: Console Check
- Press F12
- Go to **Console** tab
- Type: `getReports(d => console.log(d.length))`
- Press Enter
- Do you see a number? ✅ YES / ❌ NO

**If NO**: Google Sheets connection broken

### Test 3: Manual Export Test
- Press F12
- Go to **Console** tab  
- Copy and paste this entire block:
```javascript
getReports(function(reports) {
  console.log('Total reports:', reports.length);
  if (reports.length > 0) {
    console.log('First report:', reports[0]);
    alert('✅ Data loaded successfully! ' + reports.length + ' reports found.');
  } else {
    alert('❌ No reports found. Check Google Sheets connection.');
  }
});
```
- Press Enter
- What message do you see?

---

## 🚨 Emergency Export (Manual Method)

If automatic export fails, use this manual method:

### Method 1: Export from Google Sheets
1. Open your Google Sheet
2. Click **File** → **Download** → **Microsoft Excel (.xlsx)**
3. Done! You have your data.

### Method 2: Copy-Paste to Excel
1. Open your Google Sheet
2. Select all data (Ctrl+A)
3. Copy (Ctrl+C)
4. Open Microsoft Excel
5. Paste (Ctrl+V)
6. Save as Excel file

### Method 3: Browser Console Export
1. Press F12
2. Go to Console tab
3. Type this:
```javascript
getReports(function(reports) {
  const json = JSON.stringify(reports, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'reports_backup.json';
  a.click();
});
```
4. Press Enter
5. JSON file downloads
6. Open in Excel or any JSON viewer

---

## 🛠️ Fix Checklist

Before asking for help, verify:

- [ ] `SCRIPT_URL` is set in index.html
- [ ] Google Apps Script is deployed
- [ ] Browser console shows no red errors
- [ ] Can see reports in Visit Reports tab
- [ ] `getReports()` test in console works
- [ ] Browser allows pop-ups
- [ ] Hard refreshed the page (Ctrl+Shift+R)
- [ ] Using latest version of code
- [ ] Internet connection is working
- [ ] Google Sheets is accessible

---

## 📞 Get Help

If still not working, provide these details:

1. **Screenshot of error** (including full browser window)
2. **Browser console log** (F12 → Console tab → screenshot)
3. **Test results** from above
4. **Browser version** (Chrome/Firefox/Edge?)
5. **What you clicked** (which export button?)

### Share This Info:
```
Browser: [Chrome/Firefox/Edge] version [XX]
Error message: [copy exact text]
Console log: [screenshot or copy text]
SCRIPT_URL set: [YES/NO]
Can see reports: [YES/NO]
getReports test: [PASS/FAIL]
```

---

## ✅ Prevention

To avoid export issues:

### Daily:
- Test export once to make sure it works
- Keep browser updated

### Weekly:
- Clear browser cache
- Verify Google Sheets is accessible

### Monthly:
- Backup Google Sheets
- Test export on different browsers

---

## 🎉 Success Indicators

Export is working correctly when:

- ✅ No error messages appear
- ✅ File downloads automatically
- ✅ Excel file opens with data
- ✅ All report fields are populated
- ✅ Chinese and English headers show correctly
- ✅ Statistics at top are accurate

---

Need more help? Show me the error message and console log! 🆘

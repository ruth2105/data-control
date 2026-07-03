# 🚀 Google Sheets Setup Guide - Fix Your Website Connection

## ⚠️ THE PROBLEM
Your website shows "没有数据!" (No data!) because:
1. The SHEET_ID in `appsscript.gs` doesn't match your actual Google Spreadsheet
2. The web app needs to be deployed and the URL needs to be updated in your website

---

## 📋 STEP-BY-STEP SOLUTION

### STEP 1: Find Your Correct Google Spreadsheet

1. **Open your Google Drive** at https://drive.google.com
2. **Search for** any spreadsheet related to "hospital" or "customer" or "visit reports"
3. **Click on the spreadsheet** to open it
4. **Look at the URL** - it should look like:
   ```
   https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/edit
   ```
5. **Copy the long ID** between `/d/` and `/edit` - this is your SHEET_ID

### STEP 2: Update the Apps Script with Correct SHEET_ID

1. **Go to your Apps Script project**: https://script.google.com/home/projects/1Jw72y2GkwI5Wd4uIyxZNapGL4-yJawXyXj4SmHoDURqQR1H-lKCh_RY0/edit

2. **Find this line** at the top of the code:
   ```javascript
   const SHEET_ID = '1lVTpBiw6LfSatgIMSOEpT6zG_5UVd3c_HzSTZxHGEzY';
   ```

3. **Replace it with your correct SHEET_ID** from Step 1:
   ```javascript
   const SHEET_ID = 'YOUR_ACTUAL_SHEET_ID_HERE';
   ```

4. **Click the Save icon** (💾) at the top

### STEP 3: Deploy the Apps Script as Web App

1. **Click "Deploy"** button (top right) → **"New deployment"**

2. **Configuration**:
   - Click the gear icon ⚙️ next to "Select type"
   - Select **"Web app"**
   - Description: `Hospital Customer Management API`
   - Execute as: **Me (your email)**
   - Who has access: **Anyone** ⚠️ (Important!)

3. **Click "Deploy"**

4. **Authorize the app**:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to Hospital Customer Management (unsafe)"
   - Click "Allow"

5. **Copy the Web App URL**:
   - After deployment, you'll see a URL like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
   - **COPY THIS ENTIRE URL** - you'll need it for the next step!

### STEP 4: Update Your Website HTML File

1. **Open** `index.html` in your text editor

2. **Find line 1611** (search for `SCRIPT_URL`):
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5es8aX99NaIQ7iLFE3FNTmee-ONfLmYZ6SgHYFNlJlzozG9EqB-OoabAue81xz26HUQ/exec';
   ```

3. **Replace it with your NEW Web App URL** from Step 3:
   ```javascript
   const SCRIPT_URL = 'YOUR_NEW_WEB_APP_URL_HERE';
   ```

4. **Save the file**

### STEP 5: Test the Connection

1. **Open** `index.html` in your web browser
2. **Go to the "拜访报告" (Visit Reports)** tab
3. **You should now see**:
   - Popular Clients (Hot)
   - Warm Customers  
   - Cold customers

If you still see "No data!", check the browser console (F12) for errors.

---

## 🎯 QUICK TROUBLESHOOTING

### Still seeing "No data!"?

**Check 1: Is the Web App URL correct?**
- Open browser console (F12)
- Look for error messages
- The URL should end with `/exec`

**Check 2: Is the deployment set to "Anyone"?**
- Go back to Apps Script
- Click "Deploy" → "Manage deployments"
- Make sure "Who has access" is set to **Anyone**

**Check 3: Does your spreadsheet have the correct headers?**
Your spreadsheet should have these columns in the first row:
```
id, submittedAt, fillDate, salesPerson, hospitalName, hospitalAddress, visitingName, position, department, visitTime, visitLocation, phone, hospitalType, doctorsOnDuty, doctorsPartTime, visitType, visitPurpose, objectiveAchievement, otherBrand1, otherOrigin1, otherBrand2, otherOrigin2, otherBrand3, otherOrigin3, wondfostockName, wondfostockQty, elecBrand, elecOrigin, elecDaily, elecPrice, bioBrand, bioOrigin, bioFull, bioSemi, bioDaily, bioPrice, hemBrand, hemOrigin, hemDaily, hemPrice, tubeBrand, tubeOrigin, tubeQty, tubePrice, tubeColor, btBrand, btOrigin, btQtyPrice, needleBrand, needleOrigin, needleQty, needleModel, needlePrice, nwBrand, nwOrigin, nwQty, nwPrice, pfBrand, pfOrigin, pfQty, pfPrice, equipNeeds, medicationHabits, fluidMedicine, medicationHabits2, customerCategory, customerPotential, visitProgress, nextVisitDate, nextVisitTarget
```

If your sheet is empty, that's OK - the headers will be created automatically when you submit the first visit report.

---

## 📊 ADDING CUSTOMER POTENTIAL DATA TO YOUR WEBSITE

After fixing the connection, you can add Hot/Warm/Cold status to your customer cards:

1. **Open your Google Spreadsheet**
2. **Add these columns** (if not present):
   - `Status` (Hot/Warm/Cold)
   - `Notes` (detailed notes about the customer)
   - `Patient Load` (daily test volume)

3. **Import the data** from `KALKIDAN_FACILITIES_DATA.csv`

The website Visit Reports tab will then show:
- 🔥 **Popular Clients (Hot)** - 18 facilities ready to close
- 🌡️ **Warm Customers** - 8 facilities under evaluation  
- ❄️ **Cold customers** - 9 facilities with low interest

---

## 🆘 NEED HELP?

If you're still having issues:
1. Share a screenshot of your Apps Script editor
2. Share the error message from browser console (F12)
3. Confirm you completed all 5 steps above

**Alternative Solution**: Use the standalone dashboard at `CUSTOMER_POTENTIAL_DASHBOARD.html` - it works immediately without Google Sheets!

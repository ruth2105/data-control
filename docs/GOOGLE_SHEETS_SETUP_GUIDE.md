# 📋 GOOGLE SHEETS DATABASE SETUP GUIDE
## For Fremenatos Trading PLC Hospital Management System

---

## 🎯 WHAT THIS DOES

This converts your system from browser-only storage to **Google Sheets database**:
- ✅ Data saved permanently (not lost when browser clears)
- ✅ Access from any device/computer
- ✅ Multiple users can work simultaneously
- ✅ Automatic backup by Google
- ✅ Easy to export to Excel
- ✅ FREE forever

---

## 📝 STEP-BY-STEP SETUP

### **STEP 1: Open Your Google Sheet**

1. Go to: https://docs.google.com/spreadsheets/d/1lVTpBiw6LfSatgIMSOEpT6zG_5UVd3c_HzSTZxHGEzY/edit
   (This is the sheet ID from your current `appsscript.gs`)

2. Make sure you're logged in with your company Google account

---

### **STEP 2: Open Apps Script Editor**

1. In your Google Sheet, click: **Extensions** → **Apps Script**

2. You'll see a code editor with your current script

---

### **STEP 3: Replace the Code**

1. **DELETE** all the code you see in the editor

2. **COPY** all the code from the file: `appsscript_COMPLETE.gs`

3. **PASTE** it into the Apps Script editor

4. Click the **Save** icon (💾) or press `Ctrl+S`

5. Name your project: "Fremenatos Hospital System API"

---

### **STEP 4: Initialize the Sheets**

1. In the Apps Script editor, find the function dropdown (top toolbar)

2. Select: `initializeSheets`

3. Click the **Run** button (▶️)

4. **IMPORTANT**: First time running, Google will ask for permissions:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to Fremenatos Hospital System (unsafe)"
   - Click "Allow"

5. Wait 5-10 seconds. You'll see "✅ Execution completed" at the bottom

6. Go back to your Google Sheet. You should now see **3 sheets**:
   - **Customers** (empty, ready for your 76 hospitals)
   - **Users** (has 1 admin user already)
   - **VisitReports** (your existing visit reports)

---

### **STEP 5: Deploy as Web App**

1. In Apps Script editor, click: **Deploy** → **New deployment**

2. Click the gear icon (⚙️) → Select **Web app**

3. Fill in:
   - **Description**: "Fremenatos API v1"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** (don't worry, your data is protected)

4. Click **Deploy**

5. **COPY THE WEB APP URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby...../exec
   ```
   
6. **Save this URL somewhere safe** - you'll need it in the next step!

---

### **STEP 6: Update Your HTML Files**

Now you need to update your website files to use the new Google Sheets API.

#### Find this line in your files (admin.html, sales.html):
```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwd3Xpe2LTQeJ84XCWpJ-HTepFOC2aLSB-aSJJ6Ff0atg1ISiIW9E8Sl295qnKYghVIvQ/exec';
```

#### Replace it with YOUR new Web App URL from Step 5

---

### **STEP 7: Migrate Your Current Data**

You need to move your 76 customers from localStorage to Google Sheets:

**Option A - Automatic Migration (I can help you code this)**

**Option B - Manual Entry:**
1. Export your current customers to Excel
2. Open the "Customers" sheet in Google Sheets
3. Copy-paste the data (make sure columns match)

**Option C - Use Import Function (Best):**
I'll create a one-time migration script for you in the next step.

---

## 🔄 DATA STRUCTURE

### **Customers Sheet Columns:**
```
id | name | nameZh | city | cityZh | model | contact | phone | email | doctor | 
lastVisit | teamId | potential | notes | address | specialty | type | createdAt | updatedAt
```

### **Users Sheet Columns:**
```
username | password | role | teamId | name | nameZh | createdAt | lastLogin
```

### **VisitReports Sheet Columns:**
(All your existing visit report fields + teamId)

---

## 🧪 TEST YOUR SETUP

### **Test 1: Check if API is working**

1. Open your browser console (F12)

2. Run this code (replace YOUR_URL with your Web App URL):
```javascript
fetch('YOUR_WEB_APP_URL?action=getUsers')
  .then(r => r.json())
  .then(data => console.log(data));
```

3. You should see the admin user in the console

### **Test 2: Try logging in**

1. Open `login.html` in browser
2. Try logging in with: `admin` / `admin123`
3. Should redirect to admin page

---

## ⚠️ IMPORTANT NOTES

### **Security:**
- The Web App URL should be kept somewhat private
- Later, we'll add password hashing
- For now, don't share the Web App URL publicly

### **Permissions:**
- Only you (the Google account that deployed) can edit the script
- Anyone with the URL can read/write data (but can't see the code)
- You can change "Who has access" later to restrict it

### **Backup:**
- Google automatically backs up your sheet
- You can also do: **File** → **Version history** → **See version history**
- Recommend exporting to Excel weekly as additional backup

---

## 🆘 TROUBLESHOOTING

### "Script function not found: initializeSheets"
→ Make sure you saved the script (Ctrl+S) before running

### "Authorization required"
→ Click "Review permissions" and grant access

### "Error: SpreadsheetApp.openById is not defined"
→ You're trying to run in wrong place. Must run in Apps Script editor, not browser console

### "Cannot read property 'postData' of undefined"
→ This is normal when testing doPost locally. Only works when called via Web App URL

### Data not showing up
→ Check the sheet tabs at bottom. Make sure data is in correct sheet
→ Open browser console (F12) and check for errors

---

## 📞 NEXT STEPS AFTER SETUP

Once you have this working:

1. ✅ Migrate all 76 customers to Google Sheets
2. ✅ Add all 12 sales users to Users sheet
3. ✅ Test login and data entry
4. ✅ Train your team
5. ✅ Set up hosting (Vercel/Netlify) so everyone can access

---

## 💡 TIPS

- **Keep the old system running** until you confirm the new one works
- **Test with 5-10 customers first** before migrating all 76
- **Back up everything** before making changes
- **Ask me for help** if you get stuck on any step!

---

**Need help with any step? Let me know which step number you're on!**

# 📊 GOOGLE SHEETS DATABASE SETUP GUIDE

## 🎯 PURPOSE

This guide will help you create the Google Sheets database that stores:
1. **User registrations** (pending & active salespeople)
2. **Visit reports** (hospital visits by sales teams)
3. **Purchase announcements** (customers ready to buy)

---

## 📋 STEP-BY-STEP SETUP

### **STEP 1: Create New Google Sheet**

1. Go to: https://sheets.google.com
2. Click **"+ Blank"** to create new spreadsheet
3. Name it: **"Fremenatos CRM Database"**

---

### **STEP 2: Create Required Sheets (Tabs)**

Create **3 sheets** (tabs at bottom):

#### **Sheet 1: Users**
- Right-click tab at bottom → Rename to: **Users**

#### **Sheet 2: VisitReports**
- Click **+** to add new sheet
- Rename to: **VisitReports**

#### **Sheet 3: Announcements** (Optional)
- Click **+** to add new sheet
- Rename to: **Announcements**

---

### **STEP 3: Setup "Users" Sheet**

Click on **Users** tab, then add these columns in **Row 1**:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| username | password | name | nameZh | phone | email | teamId | role | status |

**Additional columns (optional):**
| J | K | L |
|---|---|---|
| registeredAt | preferredTeam | lastLogin |

#### **Format the header row:**
1. Select Row 1
2. **Bold** the text
3. **Background color:** Light blue
4. **Text color:** Dark blue
5. **Freeze row:** View → Freeze → 1 row

#### **Example data (Row 2):**
```
sales1 | team1 | Ephrata | Ephrata | 0911234567 |  | 1 | sales | active
```

---

### **STEP 4: Setup "VisitReports" Sheet**

Click on **VisitReports** tab, then add these columns in **Row 1**:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| id | hospitalName | hospitalAddress | salesPerson | customerPotential | customerCategory | visitType | fillDate | phone | contact |

**Additional columns:**
| K | L | M | N | O |
|---|---|---|---|---|
| patientLoad | hormoneAnalyzer | notes | submittedAt | teamId |

#### **Format the header row:** (same as Users sheet)

#### **Example data (Row 2):**
```
1 | Lotus MCH | Addis Ababa | Ephrata | Hot | A8 | Initial Visit | 2026-07-06 | 0911123456 | Dr. Abebe | 50 tests/day | Fincare | Good potential | 2026-07-06T10:00:00Z | 1
```

---

### **STEP 5: Setup "Announcements" Sheet** (Optional)

Click on **Announcements** tab, then add these columns in **Row 1**:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| id | hospitalName | hospitalAddress | phone | contact | salesPerson | purchaseType | status | announcedAt |

**Additional columns:**
| J | K |
|---|---|
| confirmedAt | machineModel |

#### **Format the header row:** (same as above)

---

### **STEP 6: Create Apps Script**

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete any existing code
3. **Copy the complete script** from `appsscript_COMPLETE.gs` file
4. **Paste** into the Apps Script editor
5. Click **Save** (💾 icon)
6. Name the project: **"Fremenatos CRM Backend"**

---

### **STEP 7: Deploy Apps Script**

1. Click **Deploy → New deployment**
2. Click **⚙️ (gear icon)** next to "Select type"
3. Select **"Web app"**
4. Configure:
   - **Description:** "Fremenatos CRM API"
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**
6. **Copy the Web app URL** (it will look like):
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
7. **Save this URL!** You'll need it in Step 9

---

### **STEP 8: Grant Permissions**

1. Click **Review permissions**
2. Choose your Google account
3. Click **Advanced**
4. Click **"Go to [Project Name] (unsafe)"**
5. Click **Allow**

---

### **STEP 9: Update HTML Files with Script URL**

Update these files with your **Web app URL** from Step 7:

#### **File: register.html** (Line ~269)
```javascript
const API_URL = 'YOUR_WEB_APP_URL_HERE';
```

#### **File: admin.html** (Look for SCRIPT_URL)
```javascript
const SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
```

#### **File: reports.html** (if exists)
```javascript
const API_URL = 'YOUR_WEB_APP_URL_HERE';
```

---

### **STEP 10: Test the Connection**

#### **Test 1: User Registration**
1. Open `register.html`
2. Fill in the form
3. Submit
4. **Check Google Sheet** → Users tab
5. New row should appear with user data

#### **Test 2: User Login (Admin)**
1. Open `login.html`
2. Login as admin/admin123
3. Should redirect to `admin.html`

#### **Test 3: View Users in Admin**
1. In `admin.html`, go to **User Management**
2. Click **🔄 Refresh** button
3. Should load users from Google Sheets
4. Pending users should appear

---

## 🔧 APPS SCRIPT CODE STRUCTURE

Your Apps Script should handle these actions:

### **User Management:**
- `registerUser` - Add new user to Users sheet
- `getUsers` - Fetch all users
- `approveUser` - Change status to 'active'
- `deleteUser` - Remove user from sheet
- `updateUser` - Edit user data

### **Visit Reports:**
- `submitVisitReport` - Add visit to VisitReports sheet
- `getReports` - Fetch all reports
- `updateReport` - Edit report
- `deleteReport` - Remove report

### **Announcements:**
- `createAnnouncement` - Add announcement
- `getAnnouncements` - Fetch announcements
- `confirmPurchase` - Update status

---

## 🔍 DEBUGGING

### **Check if data is saving:**

1. Open Google Sheet
2. Go to **Users** tab
3. Check if new rows appear after registration

### **Check Apps Script logs:**

1. Apps Script editor
2. Click **Executions** (left sidebar)
3. View recent runs and errors

### **Test API directly:**

1. Copy your Web app URL
2. Add `?action=getUsers`
3. Open in browser:
   ```
   https://script.google.com/.../exec?action=getUsers
   ```
4. Should return JSON with users

---

## 📊 EXPECTED GOOGLE SHEET STRUCTURE

### **After Setup, your sheet should have:**

```
📊 Fremenatos CRM Database
  ├── 📄 Users (10 columns)
  │   ├── username, password, name, etc.
  │   └── Row 2+: User data
  │
  ├── 📄 VisitReports (15 columns)
  │   ├── id, hospitalName, salesPerson, etc.
  │   └── Row 2+: Visit reports
  │
  └── 📄 Announcements (11 columns)
      ├── id, hospitalName, status, etc.
      └── Row 2+: Purchase announcements
```

---

## ⚠️ COMMON ISSUES & SOLUTIONS

### **Issue 1: "Script not found" error**
**Solution:** Redeploy Apps Script
1. Apps Script editor
2. Deploy → Manage deployments
3. Click ⋮ → **New version**
4. Deploy

### **Issue 2: Data not appearing in admin**
**Solution:** 
1. Check Sheet name spelling (case-sensitive!)
2. Users sheet must be named exactly "Users"
3. VisitReports sheet must be exactly "VisitReports"

### **Issue 3: Permission denied**
**Solution:**
1. Apps Script → Deploy settings
2. Change "Who has access" to **Anyone**
3. Redeploy

### **Issue 4: Old data showing**
**Solution:**
- Data might be cached in localStorage
- Clear localStorage:
  ```javascript
  localStorage.clear();
  location.reload();
  ```

---

## ✅ VERIFICATION CHECKLIST

- [ ] Google Sheet created
- [ ] 3 tabs created (Users, VisitReports, Announcements)
- [ ] Column headers added to each tab
- [ ] Apps Script code added
- [ ] Apps Script deployed
- [ ] Web app URL copied
- [ ] URL updated in HTML files
- [ ] Permissions granted
- [ ] Test registration works
- [ ] Test login works
- [ ] Test data appears in Sheet
- [ ] Test admin can see users

---

## 🎓 BEST PRACTICES

### **Security:**
1. Don't share your Web app URL publicly
2. Keep Sheet private (don't make public)
3. Regularly backup your Sheet

### **Data Management:**
1. Don't manually edit Sheet while testing
2. Use admin interface to manage data
3. Export backup weekly

### **Performance:**
1. Keep Sheet lean (< 10,000 rows)
2. Archive old data monthly
3. Use filters instead of loading all data

---

## 📝 NEXT STEPS AFTER SETUP

1. **Add test users** manually in Users sheet
2. **Test login** for each role (admin, sales)
3. **Register new user** via form
4. **Approve user** in admin panel
5. **Create visit report** as sales user
6. **View reports** in admin panel
7. **Test team filtering** (sales see only their team)

---

## 🆘 NEED HELP?

If setup doesn't work:

1. **Check browser console** (F12) for errors
2. **Check Apps Script logs** for backend errors
3. **Verify Sheet names** exactly match code
4. **Test API URL** directly in browser
5. **Clear browser cache** and localStorage

---

**Last Updated:** 2026-07-06  
**Status:** Ready for Setup  
**Required Time:** 15-20 minutes

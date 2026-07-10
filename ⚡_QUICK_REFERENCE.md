# ⚡ Quick Reference Card

**Fremenatos Hospital Management System**

---

## 🚀 First Time Setup (3 Steps)

```
1. Open: 🚀_START_HERE.html
   ↓
2. Click: "Import All Data" button
   ↓
3. Open: index.html (main app)
```

**Time:** ~30 seconds  
**Result:** 103 hospitals + 69 summaries loaded

---

## 📂 Main Files

| File | Purpose | When to Use |
|------|---------|-------------|
| **🚀_START_HERE.html** | Setup guide | First time or to guide others |
| **MASTER_IMPORT.html** | Import data | First time or after clearing data |
| **index.html** | Main app | Daily use (Admin dashboard) |
| **app/sales.html** | Sales view | Daily use (Sales reps) |
| **✅_VERIFY_DATA.html** | Check data | Troubleshooting |
| **login.html** | Login page | Alternative entry point |

---

## 🔑 Login Credentials

### Admin
```
Username: admin
Password: admin123
→ Full access to index.html
```

### Sales Reps
```
Ephrata:  sales1 / team1
Kalkidan: sales2 / team2
Tizita:   sales3 / team3
→ Access to app/sales.html
```

---

## 📊 Expected Data Counts

After importing:
- **Hospitals:** ~103 total
- **Summaries:** 69 (42 Ephrata + 27 Kalkidan)
- **Visit Reports:** Varies (added by users)

---

## 🔧 Common Tasks

### Import Data (First Time):
```
Open MASTER_IMPORT.html
→ Click "Import Everything"
→ Wait for 100%
→ Click "Open Dashboard"
```

### Check If Data Loaded:
```
Open ✅_VERIFY_DATA.html
→ Should see:
  ✅ 103 hospitals
  ✅ 69 summaries
  ✅ Sample list
```

### Clear All Data:
```
Open ✅_VERIFY_DATA.html
→ Click "Clear All Data"
→ Confirm twice
→ Re-import from MASTER_IMPORT.html
```

### View Hospital Details:
```
Open index.html
→ Find hospital in list
→ Click "🔍 View Details"
→ See: Basic info + Equipment + Summary
```

### Add New Hospital:
```
Open index.html
→ Click "+ Add Hospital" button
→ Fill form
→ Click "Save"
```

### Edit Hospital:
```
Open index.html
→ Click "🔍 View Details"
→ Click "✏️ Edit" button
→ Modify fields
→ Click "Save Changes"
```

### Submit Visit Report:
```
Open index.html or app/sales.html
→ Go to "📋 Visit Reports" tab
→ Click "+ New Report"
→ Fill form (hospital, date, findings)
→ Submit
```

---

## 🐛 Troubleshooting

### Problem: index.html shows 0 hospitals

**Solution:**
```
1. Open MASTER_IMPORT.html
2. Click "Import Everything"
3. Wait for completion
4. Refresh index.html
```

### Problem: Summaries not showing

**Check:**
```
1. Open ✅_VERIFY_DATA.html
2. Look at "Total Summaries" card
3. Should show 69
4. If 0, run MASTER_IMPORT.html
```

### Problem: Can't login

**Try:**
```
Admin: admin / admin123
Sales: sales1 / team1

If still failing:
→ Skip login.html
→ Go directly to index.html
```

### Problem: Data disappeared

**Cause:** Browser data was cleared

**Solution:**
```
Run MASTER_IMPORT.html again
All data will be restored from CSV files
```

---

## 💾 Data Storage

### Where data lives:
- **Browser localStorage** - All customer data
- **CSV files** - Original data source (in data/csv/)
- **Google Sheets** - Optional sync (visit reports only)

### localStorage keys:
```
fremenatos_machine           (A8 customers)
fremenatos_external          (A90 customers)
fremenatos_potentials        (Prospects)
fremenatos_facility_summaries (Hospital summaries)
fremenatos_visitReports      (Visit reports)
fremenatos_users             (User accounts)
```

### Check data in console:
```javascript
// Press F12, then type:
localStorage.getItem('fremenatos_facility_summaries')
```

---

## 📱 Features

### Dashboard (index.html):
- ✅ View all hospitals
- ✅ Search and filter
- ✅ Add/edit/delete hospitals
- ✅ View statistics
- ✅ Submit visit reports
- ✅ Export data
- ✅ User management
- ✅ Announcements

### Sales View (app/sales.html):
- ✅ Territory-specific hospitals
- ✅ Submit visit reports
- ✅ View customer details
- ✅ Track follow-ups
- ✅ Same features as admin (filtered)

### Hospital Details:
- ✅ Basic info (name, address, contact)
- ✅ Specialty badge
- ✅ Equipment list
- ✅ Patient load
- ✅ Full summary notes (gray box)
- ✅ Edit functionality

---

## 🌐 Deployment

### Local (File System):
```
✅ Already working
Just double-click index.html
Uses file:// protocol
```

### Web (Netlify):
```
1. Push to GitHub
2. Connect to Netlify
3. Deploy from root
4. URL: https://your-app.netlify.app
```

### Google Sheets Sync:
```
Spreadsheet: 1GlK4edSMMeMGwUjbHRvzMpW7yznhEiTpEgqFeHJYTYM
Apps Script: (see GOOGLE_SHEETS_SETUP_GUIDE.md)
Status: Visit reports sync ✅
        Full sync coming soon ⚠️
```

---

## 📚 Documentation

### For Users:
- **🚀_START_HERE.html** - Beautiful visual guide
- **⚡_QUICK_REFERENCE.md** - This file
- **docs/⚡_QUICK_START_GUIDE.md** - Detailed instructions

### For Developers:
- **📋_SYSTEM_STRUCTURE.md** - Complete technical docs
- **✅_ALL_FIXED.md** - What was fixed and how
- **PROJECT_RESTRUCTURE.md** - File organization

### For Admins:
- **docs/ADMIN_USER_GUIDE.md** - Admin features
- **docs/BULK_IMPORT_GUIDE.md** - Data import
- **docs/GOOGLE_SHEETS_SETUP_GUIDE.md** - Sync setup

---

## 🎯 Data Sources

### Imported from CSV files:

| File | Records | Content |
|------|---------|---------|
| final customer.csv | 74 | Main hospital database |
| EPHRATA_SUMMARIES.csv | 42 | Ephrata territory summaries |
| KALKIDAN_SUMMARIES.csv | 27 | Kalkidan territory summaries (FULL TEXT) |
| KALKIDAN_FACILITIES_DATA.csv | Varies | Additional Kalkidan facilities |
| TIZITA_FACILITIES_DATA.csv | Varies | Additional Tizita facilities |

### Hardcoded in index.html:
- 29 potential customers (in code)
- Always included in total count

---

## ⚙️ System Requirements

### Browser:
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Edge
- ✅ Safari

### Storage:
- ✅ localStorage enabled (default)
- ✅ ~5-10 MB space (plenty)

### Internet:
- ✅ Not required for local use
- ✅ Required for Google Sheets sync

---

## 🔄 Update Process

### Add new hospitals:
```
Option A (Manual):
→ Use "+ Add Hospital" in dashboard

Option B (CSV):
→ Add to data/csv/final customer.csv
→ Re-run MASTER_IMPORT.html
```

### Update summaries:
```
Option A (Manual):
→ Edit hospital → Update summary field

Option B (CSV):
→ Add to EPHRATA_SUMMARIES.csv or KALKIDAN_SUMMARIES.csv
→ Re-run MASTER_IMPORT.html
```

### Add users:
```
→ Go to "👥 Users" tab in index.html
→ Click "+ Add User"
→ Fill form (username, password, role)
→ Save
```

---

## ✅ Quick Health Check

Run this checklist to verify everything works:

1. **[ ]** Open 🚀_START_HERE.html - Loads?
2. **[ ]** Run MASTER_IMPORT.html - Completes?
3. **[ ]** Open ✅_VERIFY_DATA.html - Shows 103 hospitals?
4. **[ ]** Open index.html - Dashboard loads?
5. **[ ]** Click hospital - Details show?
6. **[ ]** See summary - Gray box with text?
7. **[ ]** Search works - Filters results?
8. **[ ]** Edit hospital - Modal opens?
9. **[ ]** Add hospital - Form works?
10. **[ ]** Visit reports tab - Loads?

**All ✅?** → System is working perfectly!  
**Any ❌?** → Check troubleshooting section above

---

## 📞 Support

### Self-Service:
1. Check this file first
2. Read 📋_SYSTEM_STRUCTURE.md
3. Try ✅_VERIFY_DATA.html
4. Clear data and re-import

### Console Debugging:
```javascript
// Press F12 in browser, then:

// Check all localStorage
Object.keys(localStorage)

// Check hospital count
JSON.parse(localStorage.getItem('fremenatos_machine')).length

// Check summary count
Object.keys(JSON.parse(localStorage.getItem('fremenatos_facility_summaries'))).length

// Clear everything
localStorage.clear()
```

---

## 🎉 Status: READY TO USE

Everything is fixed and working!

**Next Steps:**
1. Run import (if not done)
2. Open index.html
3. Start managing hospitals
4. Train your team
5. Enjoy! 🚀

---

**Version:** 2.0  
**Last Updated:** July 9, 2026  
**Status:** ✅ Production Ready

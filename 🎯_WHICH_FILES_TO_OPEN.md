# 🎯 WHICH FILES TO OPEN - Quick Guide

## ❌ **DON'T OPEN FILES IN `.archive` FOLDER!**

The `.archive` folder has **OLD, BROKEN** files.

---

## ✅ **CORRECT FILES TO OPEN**

### **Main Entry Point:**
```
Open: index.html
Location: C:\Users\user\Desktop\hospital list\index.html
```
**This is the main login page!**

---

### **For Admin:**
```
Option 1: index.html (main entry)
Option 2: app/admin.html (direct to admin page)

Full path: C:\Users\user\Desktop\hospital list\app\admin.html
```

### **For Sales:**
```
Open: app/sales.html

Full path: C:\Users\user\Desktop\hospital list\app\sales.html
```

### **For Registration:**
```
Open: app/register.html

Full path: C:\Users\user\Desktop\hospital list\app\register.html
```

---

## 📂 **Folder Structure**

```
hospital list/
├── index.html          ← OPEN THIS (main login)
├── app/                ← OPEN FILES FROM HERE
│   ├── admin.html      ← Admin dashboard
│   ├── sales.html      ← Sales dashboard
│   ├── register.html   ← Registration
│   └── auth.js         ← Authentication (needed by above)
├── .archive/           ← ❌ DON'T TOUCH (old files)
├── data/
├── docs/
├── server/
└── tools/
```

---

## 🔧 **Step-by-Step: How to Open Correctly**

### **Method 1: From File Explorer (Windows)**

1. Open File Explorer
2. Navigate to: `C:\Users\user\Desktop\hospital list\`
3. **Double-click**: `index.html`
4. Opens in browser with login form
5. Use credentials: `admin` / `admin123`

---

### **Method 2: Direct Admin Page**

1. Open File Explorer
2. Navigate to: `C:\Users\user\Desktop\hospital list\app\`
3. **Double-click**: `admin.html`
4. Redirects to login if not logged in
5. Login with: `admin` / `admin123`

---

### **Method 3: Direct Sales Page**

1. Open File Explorer
2. Navigate to: `C:\Users\user\Desktop\hospital list\app\`
3. **Double-click**: `sales.html`
4. Redirects to login if not logged in
5. Login with: `sales1` / `team1` (or sales2/team2, sales3/team3)

---

## ⚠️ **Common Mistakes**

### **Mistake 1: Opening from `.archive` folder**
```
❌ C:\Users\user\Desktop\hospital list\.archive\login.html
✅ C:\Users\user\Desktop\hospital list\index.html
```

### **Mistake 2: Opening wrong file in root**
```
❌ C:\Users\user\Desktop\hospital list\TEST_WEBSITE.html
✅ C:\Users\user\Desktop\hospital list\index.html
```

### **Mistake 3: Looking for old filenames**
```
❌ login.html (doesn't exist in root)
❌ admin.html (in /app folder, not root)
✅ index.html (THIS is the login page!)
```

---

## ✅ **Quick Test**

**Open the RIGHT file:**

1. Navigate to: `C:\Users\user\Desktop\hospital list\`
2. Double-click: `index.html`
3. Browser opens
4. See login form with:
   - Username field
   - Password field
   - Login button
   - Company logo
5. Enter: `admin` / `admin123`
6. Click: Login
7. Should redirect to admin dashboard!

---

## 🎯 **What Each File Does**

### **index.html** (Root folder)
- **Purpose**: Main login page
- **For**: Everyone (admin and sales)
- **Use**: Main entry point to system

### **app/admin.html**
- **Purpose**: Admin dashboard
- **For**: Admin users only
- **Features**: 
  - View all customers
  - Team performance
  - User management
  - Boss dashboard

### **app/sales.html**
- **Purpose**: Sales dashboard
- **For**: Sales team members
- **Features**:
  - Add visit reports
  - View personal customers
  - Track performance
  - Announce purchases

### **app/register.html**
- **Purpose**: New user registration
- **For**: New users signing up
- **Creates**: New account in system

### **app/auth.js**
- **Purpose**: Authentication logic
- **For**: Backend (don't open directly)
- **Contains**: Login functions, user data

---

## 🚀 **Start Here (Right Now)**

**Copy this exact path and open it:**

```
C:\Users\user\Desktop\hospital list\index.html
```

**Or in File Explorer:**
1. Go to Desktop
2. Open "hospital list" folder
3. Double-click "index.html"
4. Login with: `admin` / `admin123`

---

## 📁 **Files You Can Safely Ignore**

These folders/files are for advanced users or archive:

- ❌ `.archive/` - Old unused files
- ❌ `.git/` - Git version control
- ❌ `.vscode/` - Editor settings
- ❌ `tools/` - Admin import tools only
- ❌ `server/` - Backend scripts
- ❌ `docs/` - Documentation (for reading, not opening)
- ❌ `PROJECT_RESTRUCTURE.md` - Info file
- ❌ `TEST_WEBSITE.html` - Test file

---

## ✅ **Files You SHOULD Open**

### **For Daily Use:**
- ✅ `index.html` - Main login
- ✅ `app/admin.html` - Admin work
- ✅ `app/sales.html` - Sales work

### **For Setup/Import:**
- ✅ `tools/import/import-ephrata-summaries.html` - Import Ephrata data
- ✅ `tools/import/import-kalkidan-summaries.html` - Import Kalkidan data

### **For Reading:**
- ✅ Any `.md` files in root or `/docs` folder

---

## 🔑 **After Opening Correct File**

You should see:

```
┌────────────────────────────────────┐
│   [Company Logo]                   │
│                                    │
│   Hospital Management System       │
│                                    │
│   ┌─────────────────────────┐     │
│   │ Username: [          ]  │     │
│   └─────────────────────────┘     │
│                                    │
│   ┌─────────────────────────┐     │
│   │ Password: [          ]  │     │
│   └─────────────────────────┘     │
│                                    │
│   [ ] Remember Me                  │
│                                    │
│   [      Login Button      ]       │
│                                    │
│   Don't have account? Register     │
│                                    │
└────────────────────────────────────┘
```

---

**NOW OPEN**: `C:\Users\user\Desktop\hospital list\index.html`

**LOGIN**: `admin` / `admin123`

**DONE!** 🎉

---

**Created**: July 9, 2026  
**Status**: ✅ Correct file paths provided  
**Action**: Open index.html from root folder!


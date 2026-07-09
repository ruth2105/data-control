# 🔑 Login Troubleshooting - Quick Fix Guide

## 🎯 **DEFAULT LOGIN CREDENTIALS**

### **Admin Account:**
```
Username: admin
Password: admin123
```

### **Sales Team Accounts:**

#### **Ephrata (Team 1):**
```
Username: sales1
Password: team1
```

#### **Kalkidan (Team 2):**
```
Username: sales2
Password: team2
```

#### **Tizita (Team 3):**
```
Username: sales3
Password: team3
```

---

## ✅ **Try These Credentials Now:**

### **To Login as Admin:**
1. Open: `index.html` or `app/admin.html`
2. Username: `admin`
3. Password: `admin123`
4. Click Login

### **To Login as Sales Person:**
1. Open: `app/sales.html`
2. Username: `sales1` (or `sales2`, `sales3`)
3. Password: `team1` (or `team2`, `team3`)
4. Click Login

---

## 🔍 **Common Login Problems & Solutions**

### **Problem 1: "Invalid username" Error**
**Cause:** Username is case-sensitive or has spaces

**Solutions:**
- ✅ Use **lowercase** only: `admin` not `Admin`
- ✅ No spaces: `sales1` not `sales 1`
- ✅ Try default credentials above

---

### **Problem 2: "Invalid password" Error**
**Cause:** Password doesn't match or has spaces

**Solutions:**
- ✅ Check you're using exact password from list above
- ✅ No spaces before or after password
- ✅ Copy-paste password to avoid typos
- ✅ For admin: try `admin123` (default)

---

### **Problem 3: Login Button Does Nothing**
**Cause:** JavaScript not loading or file path issue

**Solutions:**
- ✅ Make sure you opened file correctly
- ✅ Check browser console (F12) for errors
- ✅ Try different browser (Chrome/Edge/Firefox)
- ✅ Make sure `auth.js` exists in same folder

---

### **Problem 4: Page Redirects Back to Login**
**Cause:** Session not being saved

**Solutions:**
- ✅ Check "Remember Me" checkbox before login
- ✅ Clear browser cache and cookies
- ✅ Try in Incognito/Private mode
- ✅ Check localStorage is enabled in browser

---

### **Problem 5: Can't Find Login Page**
**Cause:** Wrong file opened

**Solutions:**

**For Admin:**
- ✅ Open `index.html` (shows login)
- ✅ OR open `app/admin.html` (redirects to login if not logged in)

**For Sales:**
- ✅ Open `app/sales.html` (redirects to login if not logged in)

**For Direct Login:**
- ✅ Open `app/register.html` and look for "Login here" link

---

## 🔧 **Advanced Troubleshooting**

### **Reset Everything:**

If nothing works, try this:

1. **Open Browser Console (F12)**
2. **Run this command:**
```javascript
// Clear all local storage
localStorage.clear();
sessionStorage.clear();
console.log('✅ Storage cleared!');
```

3. **Refresh page**
4. **Try login again with default credentials**

---

### **Check if Users Exist:**

1. **Open Browser Console (F12)**
2. **Run this command:**
```javascript
// Check what users are stored
console.log('Stored users:', JSON.parse(localStorage.getItem('fremenatos_users') || '[]'));
console.log('Current session:', JSON.parse(localStorage.getItem('userSession') || 'null'));
```

3. **See what's stored**

---

### **Manually Create Admin User:**

If admin account is missing:

1. **Open Browser Console (F12)**
2. **Run this command:**
```javascript
// Create admin user
const users = JSON.parse(localStorage.getItem('fremenatos_users') || '[]');
users.push({
  username: 'admin',
  password: 'admin123',
  role: 'admin',
  name: 'Administrator',
  teamId: null,
  createdAt: new Date().toISOString()
});
localStorage.setItem('fremenatos_users', JSON.stringify(users));
console.log('✅ Admin user created!');
```

3. **Refresh page**
4. **Login with admin/admin123**

---

## 📝 **Step-by-Step Test**

### **Test 1: Can You Open the Page?**
```
□ Open index.html in browser
□ Page loads (not blank)
□ See login form
□ Has username and password fields
□ Has login button
```

### **Test 2: Can You Type?**
```
□ Click in username field
□ Type: admin
□ Click in password field
□ Type: admin123
□ Both fields show what you typed
```

### **Test 3: Can You Click Login?**
```
□ Click "Login" or "登录" button
□ Button responds (changes color/style)
□ Either:
   - Redirects to dashboard, OR
   - Shows error message
```

### **Test 4: Check Browser Console**
```
□ Press F12
□ Look for red errors
□ If you see errors, share them
```

---

## 🎯 **Most Likely Solutions**

### **90% of login issues are:**

1. **Wrong password** → Try exact credentials from top of this file
2. **Wrong file opened** → Open `index.html` or `app/admin.html`
3. **Browser security** → Try different browser or check security settings
4. **File path issues** → Make sure auth.js is in same folder

---

## 📞 **What to Share if Still Not Working:**

If still can't login, share:

1. **Which file you opened** (index.html? app/admin.html?)
2. **What credentials you tried** (username/password)
3. **What happens** (error message? nothing? redirect?)
4. **Browser console errors** (F12 → Console tab → screenshot)
5. **Browser & version** (Chrome 120? Edge 119?)

---

## ✅ **Quick Reference Card**

```
┌─────────────────────────────────────┐
│      DEFAULT LOGIN CREDENTIALS      │
├─────────────────────────────────────┤
│                                     │
│  ADMIN:                             │
│  Username: admin                    │
│  Password: admin123                 │
│                                     │
│  SALES (Ephrata):                   │
│  Username: sales1                   │
│  Password: team1                    │
│                                     │
│  SALES (Kalkidan):                  │
│  Username: sales2                   │
│  Password: team2                    │
│                                     │
│  SALES (Tizita):                    │
│  Username: sales3                   │
│  Password: team3                    │
│                                     │
└─────────────────────────────────────┘
```

---

## 🚀 **Next Steps After Successful Login:**

### **If you logged in as Admin:**
1. ✅ You'll see admin dashboard
2. ✅ Can view all customers
3. ✅ Can manage users
4. ✅ Can see team performance

### **If you logged in as Sales:**
1. ✅ You'll see sales dashboard
2. ✅ Can add visit reports
3. ✅ Can view your customers
4. ✅ Can track your performance

---

**Created**: July 9, 2026  
**Status**: ✅ Default credentials provided  
**Try**: admin/admin123 first!


# 👥 Administrator's User Management Guide
## Quick Reference for Managing Team Members

---

## 🎯 Quick Actions

### When Someone New Joins:
1. **DON'T** edit any code files
2. **DO** send them the registration link: `register.html`
3. Wait for them to register
4. Approve them in the admin panel

### When Someone Leaves:
1. Login to admin panel
2. Go to "👥 User Management" tab
3. Find their card
4. Click 🗑️ Delete button
5. Confirm deletion

---

## 📋 Daily Admin Tasks

### Check for Pending Approvals

```
1. Login to admin panel
2. Click "👥 User Management" tab
3. Look for yellow "⏳ Pending Approvals" box
4. Review each registration
5. Click "✅ Approve" or "❌ Reject"
```

The badge shows number of pending approvals:
- **⏳ Pending Approvals (3)** ← You have 3 people waiting!

---

## ✅ How to Approve a New User

### Step-by-Step:

**1. Review the Registration**
```
📝 Abebe Kebede
   👤 abebe123 • 📅 2024-01-15
   📱 0911123456 • Prefers Team 3
```

**2. Click "✅ Approve" Button**

**3. Assign Team**
- A popup will ask: "Assign to which team? (1-6)"
- Enter a number from 1 to 6
- Click OK

**4. Done!**
- User moves to "Active Sales Team" section
- They can now login immediately

### Team Numbers:
- Team 1 = Addis North
- Team 2 = Addis South  
- Team 3 = East Region
- Team 4 = South Region
- Team 5 = West Region
- Team 6 = North Region

---

## ❌ How to Reject a Registration

**When to Reject:**
- Duplicate registration
- Invalid information
- Unknown person
- Testing/spam

**How to Reject:**
1. Click "❌ Reject" button
2. Confirm deletion
3. Registration is permanently deleted
4. User must re-register if they want to try again

---

## ✏️ How to Edit a User

### What You Can Edit:
- Name
- Team assignment

### Steps:
1. Find the user card in "Active Sales Team"
2. Click "✏️ Edit" button
3. Enter new name when prompted
4. Enter new team number (1-6)
5. Click OK

### Example Use Cases:
- User got married and changed name
- Reassign user to different territory
- Fix typo in registration

---

## 🗑️ How to Delete a User

### ⚠️ WARNING: This is PERMANENT!
Deleted users:
- Cannot login anymore
- Are completely removed from system
- Must re-register if you change your mind

### Steps:
1. Find user card in "Active Sales Team"
2. Click 🗑️ button
3. Confirm "Delete user [username]?"
4. User is immediately deleted

### When to Delete:
- Employee left the company
- Contractor finished their term
- User requested account removal
- Duplicate account needs cleanup

---

## 👁️ User Card Information

Each active user shows:

```
┌─────────────────────────────┐
│  [A] Abebe Kebede          │ ← Avatar (first letter)
│      Team 3 • abeke123     │ ← Team and username
│                            │
│  📱 0911123456             │ ← Contact info
│  📧 abebe@example.com      │
│  Last login: Jan 20, 2:30pm│ ← Activity tracking
│                            │
│  [✏️ Edit]  [🗑️]           │ ← Action buttons
└─────────────────────────────┘
```

**Color Code:**
- Blue avatar = Team 1
- Green avatar = Team 2  
- Orange avatar = Team 3
- Purple avatar = Team 4
- Pink avatar = Team 5
- Cyan avatar = Team 6

---

## 🔄 Refresh Users List

If someone just registered but you don't see them:
1. Click "🔄 Refresh" button (top right)
2. Wait 1-2 seconds
3. Pending users will appear

**Auto-refresh is NOT enabled** - you must manually refresh!

---

## 📊 User Statistics

Top of page shows:
- **⏳ Pending Approvals (2)** ← Waiting for you
- **✅ Active Sales Team (12)** ← Currently working

---

## 🚨 Common Issues & Solutions

### Issue: "No pending users showing"
**Solutions:**
- Click 🔄 Refresh button
- Check if Users sheet exists in Google Sheets
- Verify SCRIPT_URL is correct in admin.html
- Check browser console (F12) for errors

### Issue: "Approved user can't login"
**Solutions:**
- Verify status = "active" in Users sheet
- Check team was assigned (not blank)
- Ask user to clear browser cache
- Verify password wasn't changed during approval

### Issue: "Can't delete user"
**Solutions:**
- Check internet connection
- Refresh the page and try again
- Verify SCRIPT_URL is correct
- Don't delete admin account (yourself!)

### Issue: "Username already exists"
**Solutions:**
- User already registered before
- Check Users sheet in Google Sheets
- Delete old duplicate entry manually
- Or ask user to choose different username

---

## 🔐 Security Best Practices

### DO:
- ✅ Review each registration carefully
- ✅ Assign correct team numbers
- ✅ Delete users immediately when they leave
- ✅ Keep your admin password secret
- ✅ Logout when done

### DON'T:
- ❌ Share your admin credentials
- ❌ Approve unknown registrations
- ❌ Delete users without confirming first
- ❌ Leave admin panel open unattended
- ❌ Give everyone admin access

---

## 📞 Getting Help

### For Technical Issues:
1. Check browser console (F12 → Console tab)
2. Look for red error messages
3. Screenshot the error
4. Contact IT support

### For User Questions:
**"I forgot my username"**
→ Look it up in User Management tab

**"I forgot my password"**  
→ Not yet supported - admin must update in Google Sheets

**"Can I change my team?"**
→ Yes, you can reassign using Edit button

**"I registered but not approved yet"**
→ Wait for admin approval, usually within 24 hours

---

## 📈 Monitoring User Activity

### Check Last Login:
- Each user card shows last login time
- "Never" = User hasn't logged in yet
- Old date = User may be inactive

### Identify Inactive Users:
```
Last login: 3 months ago ← Consider checking with them
Last login: Never ← User never activated account
Last login: Today 10:30 AM ← Active user
```

### Regular Cleanup:
- Monthly: Review users who haven't logged in for 30+ days
- Quarterly: Delete accounts of employees who left
- Annually: Audit all user accounts

---

## 🎓 Training New Admins

### Checklist for New Admin:
- [ ] Show them how to login
- [ ] Demo the User Management tab
- [ ] Practice approving a test user
- [ ] Practice editing user details
- [ ] Explain team assignments
- [ ] Show them this guide
- [ ] Give them admin credentials
- [ ] Add their contact for support

---

## 📋 Weekly Admin Checklist

```
Monday Morning:
□ Check pending approvals
□ Process new registrations
□ Review any weekend activity

Throughout Week:
□ Monitor for new registrations (check daily)
□ Respond to user access issues
□ Update team assignments as needed

Friday Afternoon:
□ Review active user list
□ Process any pending deletions
□ Verify team assignments are correct
```

---

## 🎯 Performance Tips

### Speed Up Approvals:
1. Keep a team assignment guide handy
2. Pre-approve registrations in batches
3. Use keyboard shortcuts (Tab to navigate)
4. Have registration link bookmarked

### Reduce Support Tickets:
1. Approve registrations quickly (same day)
2. Send new users a welcome email with login link
3. Keep this guide accessible to all users
4. Provide clear registration instructions

---

## 📱 Mobile Admin Access

**Good News:** Admin panel works on mobile!

**Tips for Mobile:**
- Use landscape mode for better view
- Tap 🔄 Refresh if list doesn't load
- Approve one user at a time
- Delete function works same as desktop

**Limitations:**
- Smaller screen = harder to see details
- Typing team numbers can be tricky
- Better to use desktop for bulk operations

---

## 🔮 Future Features (Coming Soon)

**Phase 2 Enhancements:**
- Email notifications when user registers
- Bulk approve multiple users
- Export user list to Excel
- Password reset functionality
- User profile photos
- Activity dashboard
- Auto-approve from specific domains

**Want a feature?** Request it from IT team!

---

## ✅ Quick Reference Card

### Most Common Tasks:

| Task | Steps |
|------|-------|
| **Approve User** | User Mgmt tab → Click ✅ Approve → Enter team (1-6) |
| **Delete User** | User Mgmt tab → Click 🗑️ → Confirm |
| **Edit User** | User Mgmt tab → Click ✏️ Edit → Enter new info |
| **Check Pending** | User Mgmt tab → Look for yellow box badge |
| **Refresh List** | Click 🔄 Refresh button (top right) |

---

**Remember:** User Management makes your life easier!  
No more editing code files when employees come and go. 🎉

**Questions?** Refer to this guide or contact IT support.

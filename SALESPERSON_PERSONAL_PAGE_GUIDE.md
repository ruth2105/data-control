# 👤 Salesperson Personal Page Guide

## ✅ NEW FEATURE: "My Reports" View

Each salesperson now has their **OWN PERSONAL VIEW** where they can:
- ✅ See **ONLY THEIR OWN** visit reports
- ✅ **Edit** their own reports
- ✅ **Delete** their own reports
- ✅ **Add new** visit reports
- ✅ Toggle between "My Reports" and "All Reports"

---

## 🔐 HOW IT WORKS

### STEP 1: Login
Salesperson opens the website and goes to **"📝 拜访登记"** (Visit Form) tab:

```
┌──────────────────────────────────────────┐
│  🔐 销售人员登录                          │
│                                          │
│  Name: [Kalkidan Awoke ▼]               │
│  Password: [••••]                        │
│                                          │
│  [登录 / Login]                          │
└──────────────────────────────────────────┘
```

**Default passwords** (you can change these):
- Ephrata: `1234`
- Kalkidan: `1234`
- Tizita: `1234`
- Admin: `admin123`

### STEP 2: See Their Personal Dashboard
After login, they see a form to submit NEW reports.

### STEP 3: View Their Reports
Click on **"📋 拜访报告"** (Visit Reports) tab and see:

```
┌───────────────────────────────────────────────────────┐
│ 📊 拜访报告列表 / Visit Reports List                  │
├───────────────────────────────────────────────────────┤
│  ┌─────────────────────┬─────────────────────┐       │
│  │ 📋 所有报告          │ 👤 我的报告         │←ACTIVE│
│  │ All Reports         │ My Reports          │       │
│  └─────────────────────┴─────────────────────┘       │
├───────────────────────────────────────────────────────┤
│  Showing: 12 reports from Kalkidan Awoke             │
├───────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────┐       │
│  │ 🏥 Lotus MCH                               │       │
│  │ 📅 2026-06-20  👤 Kalkidan  🔥 热门       │       │
│  │ 📍 Garment                                 │       │
│  │ [✏️ 编辑 / Edit]  [🗑 删除 / Delete]       │       │
│  └───────────────────────────────────────────┘       │
│                                                       │
│  ┌───────────────────────────────────────────┐       │
│  │ 🏥 Novamed Clinic                          │       │
│  │ 📅 2026-06-21  👤 Kalkidan  🌡️ 温暖       │       │
│  │ 📍 Goro                                    │       │
│  │ [✏️ 编辑 / Edit]  [🗑 删除 / Delete]       │       │
│  └───────────────────────────────────────────┘       │
└───────────────────────────────────────────────────────┘
```

**BY DEFAULT**: They see **ONLY THEIR OWN** reports (👤 My Reports mode)

### STEP 4: Edit Their Reports
Click **"✏️ 编辑"** button on any of their reports:

```
┌──────────────────────────────────────────┐
│  Form opens with all data filled in      │
│  They can change any field               │
│  Click [💾 更新 / Update] to save        │
└──────────────────────────────────────────┘
```

### STEP 5: View All Reports (Optional)
If they want to see **EVERYONE'S** reports (for learning or coordination):

Click **"📋 所有报告 / All Reports"** button

```
Now shows reports from ALL salespeople:
- Ephrata's reports
- Kalkidan's reports
- Tizita's reports

BUT: They can only EDIT/DELETE their own reports
     Other people's reports show without edit buttons
```

---

## 🎯 FEATURES BY USER TYPE

### SALESPERSON (Ephrata, Kalkidan, Tizita)

| Feature | Can Do? | Details |
|---------|---------|---------|
| **View own reports** | ✅ YES | Default view shows only their reports |
| **Add new reports** | ✅ YES | Via visit form, auto-filled with their name |
| **Edit own reports** | ✅ YES | Click ✏️ button on their reports |
| **Delete own reports** | ✅ YES | Click 🗑 button on their reports |
| **View all reports** | ✅ YES | Toggle to "All Reports" mode |
| **Edit others' reports** | ❌ NO | No edit buttons on others' reports |
| **Delete others' reports** | ❌ NO | No delete buttons |
| **Export to Excel** | ✅ YES | Can export all reports (for analysis) |
| **Change salesperson name** | ❌ NO | Locked to their name in forms |

### ADMIN/BOSS

| Feature | Can Do? | Details |
|---------|---------|---------|
| **View all reports** | ✅ YES | Always sees all reports |
| **Edit any report** | ✅ YES | Can edit anyone's reports |
| **Delete any report** | ✅ YES | Can delete any reports |
| **Edit customer data** | ✅ YES | Can manage machine/external customers |
| **Manage users** | ✅ YES | Can see admin panel |
| **Export everything** | ✅ YES | Full access to all data |
| **"My Reports" toggle** | ❌ NO | Not shown (sees all by default) |

---

## 📱 MULTI-DEVICE WORKFLOW

### Scenario: Kalkidan's Daily Work

**Morning - On Phone:**
```
1. Opens website on phone
2. Logs in as Kalkidan
3. Goes to "📝 拜访登记" (Visit Form)
4. Fills out visit to Lotus MCH
5. Selects: 🔥 Hot customer
6. Submits → Saved to Google Sheets
```

**Afternoon - On Laptop:**
```
1. Opens website on laptop
2. Logs in as Kalkidan
3. Goes to "📋 拜访报告" (Visit Reports)
4. Sees morning's report from Lotus MCH ✅
5. Clicks "✏️ 编辑" to add more notes
6. Updates and saves → Synced to cloud
```

**Evening - On Tablet at Home:**
```
1. Opens website on tablet
2. Logs in as Kalkidan
3. Goes to "📋 拜访报告"
4. Sees BOTH reports (morning + afternoon updates) ✅
5. Exports to Excel for weekly summary
```

**Manager on Their Computer:**
```
1. Opens website
2. Goes to "📋 拜访报告"
3. Toggles to "📋 所有报告" (All Reports)
4. Sees Kalkidan's 2 reports today ✅
5. Also sees Ephrata's and Tizita's reports
6. Exports all to Excel for team review
```

---

## 🎨 VISUAL INDICATORS

### Report Cards Show:

```
┌────────────────────────────────────────────────┐
│  EA                                            │ ← Avatar (initials)
│  ┌────────────────────────────────────────┐   │
│  │ 🏥 Lotus MCH                            │   │ ← Hospital name
│  │ 👤 [Kalkidan]  📅 2026-06-29            │   │ ← Salesperson + Date
│  │ 📍 Garment                              │   │ ← Address
│  │ 🏷 First contact                        │   │ ← Visit type
│  │ [🔥 热门] [重点客户]                    │   │ ← Potential + Category
│  │                                          │   │
│  │ [✏️ 编辑]  [🗑 删除]  ← ONLY IF YOURS   │   │
│  └──────────────────────────────────────────┘   │
└────────────────────────────────────────────────┘

If it's SOMEONE ELSE'S report:
┌────────────────────────────────────────────────┐
│  ET                                            │
│  ┌────────────────────────────────────────┐   │
│  │ 🏥 Yerer Hospital                       │   │
│  │ 👤 [Ephrata]  📅 2026-06-28             │   │
│  │ 📍 Yerer                                │   │
│  │ [🔥 热门] [有需求客户]                  │   │
│  │                                          │   │
│  │ (No edit buttons - not your report)     │   │
│  └──────────────────────────────────────────┘   │
└────────────────────────────────────────────────┘
```

---

## 🔒 SECURITY & PERMISSIONS

### Data Access Rules:

| Data Type | Salesperson | Admin |
|-----------|------------|-------|
| **View own reports** | ✅ Always | ✅ Always |
| **View others' reports** | ✅ When "All Reports" selected | ✅ Always |
| **Edit own reports** | ✅ Anytime | ✅ Anytime |
| **Edit others' reports** | ❌ Never | ✅ Anytime |
| **Delete own reports** | ✅ With confirmation | ✅ With confirmation |
| **Delete others' reports** | ❌ Never | ✅ With confirmation |
| **Submit new reports** | ✅ With own name | ✅ With any name |
| **Export to Excel** | ✅ All reports | ✅ All reports |

---

## 📝 HOW TO EDIT A REPORT

### For Salesperson:

1. **Go to "📋 拜访报告" tab**
2. **Find your report** (in "My Reports" mode)
3. **Click "✏️ 编辑" button**
4. **Form opens** with all data pre-filled
5. **Change any fields** you need
6. **Click "💾 更新报告"** (Update Report)
7. **Report saved** to Google Sheets
8. **All devices see updated version** immediately

### What Can Be Edited:

✅ Visit date
✅ Hospital information
✅ Contact details
✅ Visit type and purpose
✅ Equipment information
✅ Competitor data
✅ **Customer potential** (Hot/Warm/Cold)
✅ Customer category
✅ Visit notes and next steps

### What CANNOT Be Changed:

❌ Report ID (internal)
❌ Original submission timestamp
❌ Salesperson name (locked to their account)

---

## 🗑️ HOW TO DELETE A REPORT

### Process:

1. **Find report** in "My Reports" view
2. **Click "🗑 删除" button**
3. **Confirmation popup** appears:
   ```
   ⚠️ 确定要删除这条报告吗？
   Are you sure you want to delete this report?
   
   医院: Lotus MCH
   日期: 2026-06-29
   
   此操作无法撤销！
   This action cannot be undone!
   
   [取消 / Cancel]  [确定删除 / Delete]
   ```
4. **Click "确定删除"** if sure
5. **Report removed** from Google Sheets
6. **All devices** see it disappear

**⚠️ WARNING**: Deleted reports **CANNOT BE RECOVERED**!

---

## 📊 STATISTICS IN "MY REPORTS" MODE

When in "👤 My Reports" mode, statistics show **ONLY YOUR DATA**:

```
┌────────────────────────────────────────────┐
│ Kalkidan's Statistics:                     │
│                                            │
│ 🔥 Hot customers: 8                        │
│ 🌡️ Warm customers: 4                       │
│ ❄️ Cold customers: 3                       │
│ ⚪ Unknown: 1                              │
│                                            │
│ Total reports: 16                          │
│ This week: 5                               │
│ Closed deals: 2                            │
└────────────────────────────────────────────┘
```

When switching to "📋 All Reports" mode, statistics show **EVERYONE'S DATA**:

```
┌────────────────────────────────────────────┐
│ Team Statistics:                           │
│                                            │
│ 🔥 Hot customers: 24                       │
│ 🌡️ Warm customers: 12                      │
│ ❄️ Cold customers: 8                       │
│ ⚪ Unknown: 3                              │
│                                            │
│ Total reports: 47                          │
│ Salespeople: 3                             │
│ Hospitals: 35                              │
└────────────────────────────────────────────┘
```

---

## 💡 USAGE TIPS

### For Salespeople:

✅ **Default to "My Reports"** - Focus on your own work
✅ **Edit right after visit** - Add notes while fresh
✅ **Use potential status** - Mark Hot/Warm/Cold to prioritize
✅ **Export weekly** - Download your reports for review
✅ **Check "All Reports"** - Learn from teammates' approaches
✅ **Update old reports** - Add follow-up notes as situation changes

### For Managers:

✅ **Review "All Reports"** - See team activity
✅ **Filter by salesperson** - Check individual performance
✅ **Filter by potential** - Focus on Hot leads
✅ **Export to Excel** - Analyze trends and patterns
✅ **Check closed deals** - Track success rate
✅ **Monitor visit frequency** - Ensure consistent coverage

---

## 🆘 TROUBLESHOOTING

### "I can't see my reports"
**Check**:
- Are you in "👤 My Reports" mode? (should be default)
- Did you log in with correct name?
- Try toggling to "📋 All Reports" and back
- Try refreshing browser (F5)

### "I can't edit a report"
**Check**:
- Is the report yours? (check salesperson name)
- Are you logged in?
- Is your login expired? (log out and back in)

### "Edit button doesn't appear"
**Reason**: This report belongs to another salesperson
**Solution**: You can only edit YOUR OWN reports

### "My edits don't save"
**Check**:
- Is Google Sheets connection working?
- Check browser console for errors (F12)
- Try submitting again
- Verify SCRIPT_URL is correct

### "Reports from phone don't show on laptop"
**Reason**: Google Sheets not connected
**Solution**: Follow `GOOGLE_SHEETS_SETUP_GUIDE.md`

---

## ✅ SUMMARY

**WHAT SALESPEOPLE CAN DO:**
- ✅ View only their reports (default)
- ✅ Add new reports from any device
- ✅ Edit their own reports anytime
- ✅ Delete their own reports (with confirmation)
- ✅ Switch to view all reports (for learning)
- ✅ Export all data to Excel
- ✅ See their personal statistics

**WHAT SALESPEOPLE CANNOT DO:**
- ❌ Edit other salespeople's reports
- ❌ Delete other salespeople's reports
- ❌ Change their username in forms
- ❌ Access admin customer management

**DATA SYNCS AUTOMATICALLY:**
- ✅ Submit on phone → See on laptop
- ✅ Edit on laptop → Updated on tablet
- ✅ All devices see same data instantly
- ✅ Manager sees everyone's reports
- ✅ Real-time collaboration

🚀 **Everything is ready to use!** Just connect Google Sheets and start submitting reports!

# 📝 SALES PAGE - EXACT REQUIREMENTS

**Based on your description**

---

## 🎯 USER FLOW

1. **Sales person registers** (register.html)
2. **Admin approves** them (admin.html)
3. **Sales person logs in** (login.html)
4. **Sees sales dashboard** with 5 tabs (sales.html)

---

## 📱 SALES DASHBOARD - 5 TABS

### **Tab 1: 🏥 Old Customers (Current Buyers)**
**Purpose:** Show hospitals that are ALREADY buying reagents and using your machines

**Features:**
- Display 76 hospitals (A8, A90, External products)
- Filter by city, machine model
- Search by hospital name
- Click hospital → See details modal
- Show: Name, city, machine type, contact, phone, last visit

**Data Source:**
- From `MACHINE_DEFAULTS` and `EXTERNAL_DEFAULTS` arrays in HTML
- These are hospitals already using your products

---

### **Tab 2: 📊 Data Dashboard (Statistics)**
**Purpose:** Show team performance and statistics

**Features:**
- Total visits this week/month
- Hot/Warm/Cold customer breakdown
- Team member performance
- Charts and graphs
- Visit trends

**Data Source:**
- Calculate from VisitReports in Google Sheets
- Filter by user's teamId

---

### **Tab 3: 📝 Visit Report Form (Daily Visits)**
**Purpose:** Sales person fills form DAILY when they visit a hospital

**Form Fields:**
1. **Basic Info:**
   - Hospital Name (dropdown or text input)
   - Hospital Address
   - Visit Date (today by default)
   - Contact Person Name
   - Contact Phone

2. **Visit Details:**
   - Visit Type (checkboxes: First Contact, Product Promotion, Relationship Maintenance, Issue Follow-up, Other)
   - Discussion Notes (what was discussed?)
   - Current Equipment (what machines do they use?)
   - Visit Outcome (what happened?)

3. **Customer Analysis:**
   - Customer Potential: Hot 🔥 / Warm 🌤️ / Cold ❄️
   - Customer Category (checkboxes: Active Customer, Target Customer, Key Customer, etc.)
   - Next Visit Date
   - Next Target (what to do next visit)

4. **Products/Orders:**
   - Product orders placed (name, quantity, price)

**Actions:**
- ✅ Submit → Saves to Google Sheets + localStorage
- ↺ Reset → Clear form

**Data Flow:**
```
Fill form → Click Submit
    ↓
Save to localStorage (immediate backup)
    ↓
Save to Google Sheets VisitReports tab
    ↓
Include: salesPerson, teamId, submittedAt
    ↓
Redirect to Tab 4 to see submitted report
```

---

### **Tab 4: 📋 Team Reports (View & Update)**
**Purpose:** See OWN reports + OTHER team members' reports

**Features:**

#### **A. View Reports**
- Show all reports from MY TEAM ONLY
- Filter by:
  - Salesperson (team members)
  - Customer Potential (Hot/Warm/Cold)
  - Customer Category
  - Date range
- Search by hospital name
- Sort by date (newest first)

#### **B. Update Reports**
- Click report card → Opens modal
- Can EDIT if missing information:
  - Update hospital name
  - Update contact info
  - Update visit notes
  - Update customer potential ⬅️ **IMPORTANT**
  - Update any field
- Save changes → Updates Google Sheets

**Team Filtering:**
```javascript
// Only show reports where report.teamId === user.teamId
const userTeam = getCurrentUser().teamId;
const teamReports = allReports.filter(r => r.teamId === userTeam);
```

**Data Source:**
- Google Sheets → VisitReports tab
- Filter by teamId

---

### **Tab 5: 🔔 Purchase Announcements**
**Purpose:** Announce when hospital agrees to BUY machine

**Workflow:**

#### **Step 1: Customer Agrees to Purchase**
- Sales person visits hospital
- Hospital says: "Yes, we'll buy your machine!"
- Sales person opens Tab 4 (Team Reports)
- Finds that hospital's report
- Clicks "🔔 Announce Purchase" button

#### **Step 2: Fill Purchase Form**
**Modal opens with:**
- Hospital Name (pre-filled from report)
- Hospital Address (pre-filled)
- Contact Person (pre-filled)
- Contact Phone (pre-filled)
- Purchase Type:
  - ○ New Machine (first time buyer)
  - ○ Replacement Machine (replacing old machine)
- Machine Model:
  - ○ A8
  - ○ A90
- Notes (optional)

#### **Step 3: Submit Announcement**
- Click "📢 Announce Purchase"
- Saved to:
  - Google Sheets → Announcements tab
  - Status: "pending"
  - Includes: salesPerson, teamId, announcedAt (timestamp)

#### **Step 4: Admin Reviews (admin.html)**
- Admin sees announcement in Updates tab
- Admin can:
  - ✅ Confirm Purchase → Customer added to "Old Customers" list
  - ❌ Reject → Announcement deleted

#### **Step 5: Customer Moved to Old Customers**
- After admin confirms:
  - Customer automatically added to Tab 1 (Old Customers)
  - Now shows in main customer database
  - Purchase date recorded
  - Salesperson gets credit

**Data Flow:**
```
Sales visits hospital
    ↓
Hospital agrees to buy
    ↓
Sales clicks "🔔 Announce Purchase" on report
    ↓
Fills purchase form (type, model)
    ↓
Submits → Saves to Announcements tab
    ↓
Admin sees in admin.html Updates tab
    ↓
Admin clicks ✅ Confirm
    ↓
Customer added to Old Customers database
    ↓
Sales person sees customer in Tab 1! ✅
```

---

## 🔐 SECURITY & FILTERING

### **Team-Based Access:**
```
Team 1 user logs in:
  ✅ Sees Tab 1: All 76 old customers (everyone sees same)
  ✅ Sees Tab 2: Team 1 statistics only
  ✅ Sees Tab 3: Can create reports (tagged with teamId=1)
  ✅ Sees Tab 4: Team 1 reports only (NOT Team 2, 3, 4, 5, 6)
  ✅ Sees Tab 5: Can announce purchases (tagged with teamId=1)
  
  ❌ Cannot see Team 2, 3, 4, 5, 6 reports
  ❌ Cannot edit other teams' reports
```

### **Code Implementation:**
```javascript
function displayReports(reports) {
  const user = getCurrentUser();
  
  // Filter by team
  if (user && user.role === 'sales' && user.teamId) {
    reports = reports.filter(r => r.teamId === user.teamId);
  }
  
  // Now display filtered reports
  renderReportCards(reports);
}
```

---

## 💾 DATA STRUCTURE

### **VisitReports (Google Sheets Tab)**
```
| id | hospitalName | hospitalAddress | salesPerson | teamId | customerPotential | customerCategory | visitType | visitDate | contact | phone | discussionNotes | currentEquipment | outcome | nextVisitDate | nextTarget | productOrders | submittedAt |
```

### **Announcements (Google Sheets Tab)**
```
| id | hospitalName | hospitalAddress | contact | phone | salesPerson | teamId | purchaseType | machineModel | status | notes | announcedAt | confirmedAt |
```

### **Example Report:**
```javascript
{
  id: 156,
  hospitalName: "Lotus MCH",
  hospitalAddress: "Bole, Addis Ababa",
  salesPerson: "Ephrata",
  teamId: 1,
  customerPotential: "Hot",
  customerCategory: "Target Customer, Key Customer",
  visitType: "Product Promotion, Relationship Maintenance",
  visitDate: "2026-07-07",
  contact: "Dr. Abebe",
  phone: "0911234567",
  discussionNotes: "Discussed A8 machine benefits",
  currentEquipment: "Finecare hormone analyzer",
  outcome: "Customer very interested, wants quotation",
  nextVisitDate: "2026-07-14",
  nextTarget: "Bring quotation and demo",
  productOrders: "[{product:'TSH',qty:50,price:45}]",
  submittedAt: "2026-07-07T10:30:00Z"
}
```

### **Example Announcement:**
```javascript
{
  id: 12,
  hospitalName: "Lotus MCH",
  hospitalAddress: "Bole, Addis Ababa",
  contact: "Dr. Abebe",
  phone: "0911234567",
  salesPerson: "Ephrata",
  teamId: 1,
  purchaseType: "new",
  machineModel: "A8",
  status: "pending",
  notes: "Customer ready to purchase next week",
  announcedAt: "2026-07-07T14:00:00Z",
  confirmedAt: null
}
```

---

## 🎨 UI DESIGN

### **Header:**
```
[Logo] Fremenatos Sales Dashboard
                                    [EN / 中文]  [Ephrata]  [Team 1]  [Logout]
```

### **Tabs:**
```
[ 🏥 Old Customers ] [ 📊 Dashboard ] [ 📝 Visit Form ] [ 📋 Team Reports ] [ 🔔 Announcements ]
```

### **Tab 1 - Old Customers:**
```
Search: [🔍 Search hospital...]   City: [All Cities ▼]   Model: [All ▼] [A8] [A90] [External]

┌─────────────────────────────────────────┐
│ #1  🏥 Lotus MCH                         │
│     📍 Addis Ababa  🏷️ A8               │
│     👤 Dr. Abebe  📞 0911234567         │
│     📅 Last Visit: 2026-06-15           │
└─────────────────────────────────────────┘
```

### **Tab 3 - Visit Form:**
```
┌─ 📝 Daily Visit Report ─────────────────┐
│                                          │
│ Hospital: [Lotus MCH        ▼]         │
│ Address:  [Bole, Addis Ababa]          │
│ Date:     [2026-07-07]                 │
│ Contact:  [Dr. Abebe]                  │
│ Phone:    [0911234567]                 │
│                                          │
│ Visit Type:                             │
│ ☑ Product Promotion                     │
│ ☑ Relationship Maintenance              │
│                                          │
│ Discussion:                             │
│ [Discussed A8 machine...]               │
│                                          │
│ Customer Potential: [Hot ▼]            │
│                                          │
│ [✅ Submit Report] [↺ Reset]            │
└─────────────────────────────────────────┘
```

### **Tab 4 - Team Reports:**
```
Filter: [All Team Members ▼] [All Potential ▼] [Search...]

┌─────────────────────────────────────────┐
│ 🏥 Lotus MCH                             │
│ 👤 Ephrata (Team 1)  📅 2026-07-07      │
│ 🔥 Hot Customer                          │
│ "Discussed A8 machine benefits..."       │
│                                          │
│ [✏️ Edit] [🔔 Announce Purchase]        │
└─────────────────────────────────────────┘
```

---

## ✅ SUCCESS CRITERIA

After building, sales user should be able to:

1. ✅ Login after admin approval
2. ✅ See Tab 1: All 76 old customers
3. ✅ See Tab 2: Team statistics
4. ✅ Use Tab 3: Fill daily visit form → Submits to database
5. ✅ See Tab 4: View team reports → Can update if info missing
6. ✅ Use Tab 4: Update customer potential (Hot/Warm/Cold)
7. ✅ Use Tab 4: Click "Announce Purchase" → Fills purchase form
8. ✅ Announcement saved → Admin sees it → Admin confirms
9. ✅ Customer appears in Tab 1 (Old Customers) after confirmation
10. ✅ Cannot see other teams' reports (only own team)

---

## 📁 FILES NEEDED

1. **sales.html** - Main sales dashboard (new/updated)
2. **auth.js** - Already exists (login authentication)
3. **Google Sheets** - 3 tabs (Users, VisitReports, Announcements)
4. **appsscript_COMPLETE.gs** - Already exists (backend API)

---

**Ready to build?** Let me know and I'll create the complete sales.html file!


# Hospital Management System
## Fremenatos Trading PLC - Customer Portal

A comprehensive customer relationship management system for tracking hospital customers, visit reports, equipment data, and sales activities across Ethiopia.

---

## 🚀 Quick Start

1. **Access the System:**
   - Open `index.html` in a web browser
   - Login with your credentials (admin or sales user)
   - System automatically redirects to your dashboard

2. **Admin Dashboard:** `/app/admin.html`
   - View all hospitals and visit reports
   - Manage users and announcements
   - Access full system statistics
   - Edit hospital information and summaries

3. **Sales Dashboard:** `/app/sales.html`
   - Submit visit reports
   - View your assigned customers
   - Track your sales activities
   - Change your password

---

## 📂 Project Structure

```
hospital-management-system/
│
├── index.html                   # Main entry point (login redirect)
│
├── app/                         # Main application files
│   ├── admin.html               # Admin dashboard
│   ├── sales.html               # Sales user dashboard
│   ├── register.html            # User registration page
│   └── auth.js                  # Authentication logic
│
├── server/                      # Backend scripts
│   ├── appsscript.gs            # Google Apps Script (main)
│   ├── appsscript_COMPLETE.gs   # Complete backup version
│   ├── COPY_THIS_TO_APPS_SCRIPT.gs
│   └── admin-boss-dashboard.js  # Dashboard logic
│
├── data/                        # Data files
│   ├── csv/                     # CSV import files
│   │   ├── HOSPITAL_SPECIALTIES_IMPORT.csv
│   │   ├── HOSPITAL_SUMMARIES_IMPORT.csv
│   │   ├── CONTACT_DATA_IMPORT.csv
│   │   └── ... (13 CSV files)
│   ├── source/                  # Source documents
│   │   ├── Customer_Facility_Summaries.docx
│   │   ├── report summary.pdf
│   │   └── ... (other documents)
│   └── IMPORT_READY_HOSPITALS.json
│
├── tools/                       # Utility tools
│   ├── import/                  # Import utilities
│   │   ├── import-summaries.html
│   │   ├── import-specialties.html
│   │   ├── import-complete-visit-reports.html
│   │   ├── check-data.html
│   │   └── RUN_IMPORT_SUMMARIES.html
│   ├── scripts/                 # Python/JS utilities
│   │   ├── create_excel_template.py
│   │   ├── import_summaries.py
│   │   └── ... (utility scripts)
│   └── migration/
│       └── MIGRATE_TO_SHEETS.html
│
├── docs/                        # Documentation
│   ├── QUICK_START_GUIDE.md    # Quick start guide
│   ├── HOW_TO_ADD_SUMMARIES_AND_SPECIALTIES.md
│   ├── ADMIN_USER_GUIDE.md
│   ├── GOOGLE_SHEETS_DATABASE_SETUP.md
│   ├── NETLIFY_DEPLOYMENT_GUIDE.md
│   └── ... (30+ documentation files)
│
├── .archive/                    # Archived/old files
│   ├── login.html
│   └── reports.html
│
├── .git/                        # Git repository
├── .vscode/                     # VS Code settings
├── README.md                    # This file
└── PROJECT_RESTRUCTURE.md       # Restructure documentation
```

---

## 💾 Database

**Google Sheets Backend:**
- Sheet ID: `1GlK4edSMMeMGwUjbHRvzMpW7yznhEiTpEgqFeHJYTYM`
- Apps Script URL: `https://script.google.com/macros/s/AKfycbzTM_EPvzVaIwG2GpexwCz5m9KC-LTqNbX2OT9NRy1Qi8H3peCe7YY55w5-pYMQMYE/exec`

**Sheets:**
1. **Users** - User authentication and roles
2. **VisitReports** - All visit reports and hospital data
3. **Announcements** - System-wide announcements

See `/docs/GOOGLE_SHEETS_DATABASE_SETUP.md` for setup instructions.

---

## 👥 User Roles

### **Admin**
- Full system access
- View all visit reports
- Manage users
- Post announcements
- Edit hospital information
- Add summaries and specialties

### **Sales**
- Submit visit reports
- View own reports
- View assigned customers
- Change password
- Announce purchases

---

## 🎯 Key Features

### **Hospital Management**
- Track 76 hospitals across 17 cities
- Store detailed hospital information
- Add hospital specialties
- Add comprehensive summaries
- Track equipment (ACCRE machines, analyzers)

### **Visit Reports**
- Submit detailed visit reports
- Track visit type and purpose
- Record customer potential (Hot/Warm/Cold)
- Track equipment and reagent needs
- Monitor follow-up actions

### **Sales Team Management**
- 6 sales teams (Kalkidan, Tizita, Ephrata, Melat, Admin, External)
- Team-based filtering
- Individual performance tracking

### **Data Import/Export**
- Import hospitals from CSV
- Import specialties and summaries
- Export to Google Sheets
- Template-based imports

---

## 🔧 Installation & Deployment

### **Local Development**
1. Clone repository
2. Open `index.html` in browser
3. No build step required (pure HTML/JS)

### **Production Deployment (Netlify)**
1. Connect repository to Netlify
2. Build settings:
   - Base directory: `/`
   - Publish directory: `/`
   - No build command needed
3. Deploy

See `/docs/NETLIFY_DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 📖 Documentation

### **User Guides**
- [Quick Start Guide](/docs/QUICK_START_GUIDE.md) - Get started in 5 minutes
- [Admin User Guide](/docs/ADMIN_USER_GUIDE.md) - Complete admin guide
- [How to Add Summaries & Specialties](/docs/HOW_TO_ADD_SUMMARIES_AND_SPECIALTIES.md)

### **Setup Guides**
- [Google Sheets Setup](/docs/GOOGLE_SHEETS_DATABASE_SETUP.md)
- [Deployment Guide](/docs/NETLIFY_DEPLOYMENT_GUIDE.md)
- [Bulk Import Guide](/docs/BULK_IMPORT_GUIDE.md)

### **Technical Docs**
- [Architecture Diagram](/docs/ARCHITECTURE_DIAGRAM.txt)
- [Complete System Overview](/docs/COMPLETE_SYSTEM_OVERVIEW.md)
- [Project Restructure Plan](/PROJECT_RESTRUCTURE.md)

---

## 🔄 Recent Updates

### **Latest (Context Transfer Continuation)**
- ✅ Added specialty field to hospital/visit reports
- ✅ Enhanced summary display with prominent styling
- ✅ Reorganized project structure for better maintainability
- ✅ Created comprehensive documentation
- ✅ Fixed file paths after restructure

### **Previous Updates**
- Fixed Apps Script permissions
- Added sales password change feature
- Shortened registration form
- Added hospital summaries and specialties
- Created import tools for bulk data

---

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Google Apps Script
- **Database:** Google Sheets
- **Hosting:** Netlify
- **Version Control:** Git

---

## 📊 Data Statistics

- **76 hospitals** tracked
- **17 cities** covered
- **6 sales teams**
- **68 hospital summaries** available
- **55+ hospital specialties** documented

---

## 🔐 Security

- User authentication via Google Sheets
- Role-based access control (Admin/Sales)
- localStorage for session management
- Secure Apps Script backend

---

## 🤝 Contributing

1. Make changes in your branch
2. Test thoroughly
3. Update documentation
4. Submit for review

---

## 📞 Support

For issues or questions:
1. Check `/docs` folder for guides
2. Review `/docs/TROUBLESHOOTING.md`
3. Contact system administrator

---

## 📝 License

Proprietary - Fremenatos Trading PLC

---

## 🏆 Acknowledgments

Built for Fremenatos Trading PLC to manage hospital customer relationships and sales activities across Ethiopia.

---

**Last Updated:** July 9, 2026
**Version:** 2.0 (Restructured)
**Status:** ✅ Production Ready

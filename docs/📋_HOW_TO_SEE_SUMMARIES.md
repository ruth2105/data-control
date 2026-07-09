# 📋 HOW TO SEE SUMMARIES IN VISIT REPORTS

**Current Status**: Summaries are ready but NOT imported yet!

---

## 🎯 WHAT YOU NEED TO DO:

### **Step 1: Import the Summaries** (Do this FIRST!)

1. **Open** `import-summaries.html` in your browser
2. **Upload** `HOSPITAL_SUMMARIES_IMPORT.csv` file
3. **Click** "Import Summaries" button
4. **Wait** for confirmation message

✅ This will add summaries to 68 hospitals!

---

### **Step 2: View Summaries in Admin Page**

1. **Open** `admin.html`
2. **Go to** "📊 Visit Reports" tab
3. **Click** on any hospital card to view details
4. **Scroll down** to see the new "📝 Hospital Summary" section

---

## 🖼️ WHAT YOU WILL SEE:

### **Before Import:**
```
Visit Report Details:
- Basic Info
- Other Info
- Progress Info
[No summary section]
```

### **After Import:**
```
Visit Report Details:
- Basic Info
- Other Info
- Progress Info
- 📝 Hospital Summary ← NEW SECTION!
  [Detailed summary with equipment, tests/day, follow-up actions]
```

---

## 📊 TWO-PANEL VIEW:

### **When Will You See Two Panels?**

You will see the **two-panel layout** (left side + right side) when a visit report has **company product data** filled in:

**LEFT PANEL (Company Products):**
- ✅ Shows if report has: Wondfo stock, competitor equipment, consumables data
- 🏭 Displays: ACCRE machines, reagents, equipment from your company

**RIGHT PANEL (Hospital Info):**
- ✅ Always shows
- 🏥 Displays: Basic info, contacts, visit details
- 📝 Hospital Summary (after import)

**If no company product data:**
- Only right panel shows (single panel view)
- Summary still appears at bottom of right panel

---

## 🔍 EXAMPLE: Lotus MCH

### **After importing summaries, when you click Lotus MCH report:**

**RIGHT PANEL shows:**
```
🏥 Hospital Information
- Hospital: Lotus MCH
- Address: Garment
- Sales Person: [name]
- ...other details...

📝 Hospital Summary
Hot priority facility in Garment. Uses Finecare (hormone), 
Mindray (chemistry), B&E (electrolyte). 10-20 tests/day. 
Interested in reagent placement; requested comparative 
analysis. Follow-up with Head Lab Technician, Medical Director.
```

**LEFT PANEL shows** (if product data exists):
```
🏭 Our Company Products
- ACCRE machines
- Reagent stock
- Competitor equipment
- Consumables
```

---

## ⚠️ IMPORTANT NOTES:

### **Why You Don't See Summaries Yet:**
❌ You have **NOT imported** the summaries yet!
❌ The import tool is ready, but you need to run it

### **After You Import:**
✅ Summaries will appear in visit reports immediately
✅ Look for the "📝 Hospital Summary" section
✅ It will show at the bottom of the right panel

### **Why You Don't See Two Panels:**
If you only see ONE panel (right side), it means:
- Visit report has no company product data filled in
- No Wondfo stock, competitor equipment, or consumables recorded
- **Solution**: Fill in product data in visit form when creating reports

---

## 🚀 QUICK ACTION CHECKLIST:

- [ ] Open `import-summaries.html`
- [ ] Upload `HOSPITAL_SUMMARIES_IMPORT.csv`
- [ ] Click "Import Summaries"
- [ ] Open `admin.html` → Visit Reports
- [ ] Click any hospital card (try Lotus MCH or Novamed Clinic)
- [ ] Scroll down to see "📝 Hospital Summary" section
- [ ] Done! ✅

---

## 💡 FOR FUTURE REPORTS:

**Old reports**: Use import tool (one-time bulk import)
**New reports**: Sales people write summaries directly in "Discussion Notes" field when submitting visit form

---

**Updated:** July 7, 2026  
**Next Action:** Import summaries using `import-summaries.html`  
**Time Needed:** 2 minutes ⚡

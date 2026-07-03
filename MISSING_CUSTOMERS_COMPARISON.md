# 🔍 CUSTOMER COMPARISON: Website vs 6-Month Report

**Date:** July 3, 2026  
**Purpose:** Identify customers in 6-month Excel report that are missing from website database

---

## 📊 SUMMARY

- **Website Total:** 67 customers (51 machine + 16 external)
- **6-Month Report Total:** 67 customers
- **Missing from Website:** 10 customers
- **In Website but Not in Report:** 16 customers (no consumption data)

---

## ❌ CUSTOMERS IN 6-MONTH REPORT BUT MISSING FROM WEBSITE

These customers appear in your Excel report with consumption data but are NOT in the website database:

### 1. **yehulshet internal medicine** (A.A)
- **Consumption:** 1 test
- **City:** Addis Ababa
- **Status:** ⚠️ NOT IN WEBSITE - Need to add

### 2. **United Nation economic commission** (A.A)
- **Consumption:** 42 tests (4.4% of A.A consumption)
- **City:** Addis Ababa
- **Note:** Website has "UNECA" (57 tests), this might be duplicate or different customer
- **Status:** ⚠️ VERIFY if same as UNECA or separate customer

### 3. **Abrak medical service plc** (A.A)
- **Consumption:** 1 test
- **City:** Addis Ababa
- **Status:** ⚠️ NOT IN WEBSITE - Need to add
- **Note:** Website has "Fikir Abrak Internal and MCH Center" - might be related?

### 4. **Lebu st mechael internal** (A.A)
- **Consumption:** 30 tests (2.3% of total)
- **City:** Addis Ababa
- **Status:** ⚠️ NOT IN WEBSITE - Need to add
- **Note:** Website has "Lubu Internal and MCH Clinic" - TYPO? "Lubu" vs "Lebu"

### 5. **mander trading plc** (A.A)
- **Consumption:** 1 test
- **City:** Addis Ababa
- **Status:** ⚠️ NOT IN WEBSITE - Need to add

### 6. **Medan pediatric clinic** (A.A)
- **Consumption:** 3 tests
- **City:** Addis Ababa
- **Status:** ⚠️ NOT IN WEBSITE - Need to add

### 7. **Alta medium clinic** (A.A)
- **Consumption:** 1 test
- **City:** Addis Ababa
- **Status:** ⚠️ NOT IN WEBSITE - Need to add
- **Note:** Website has "Alta Medium Clinic" in Adama (external) - Different customer!

### 8. **Jedunave Pharmacetical plc** (A.A)
- **Consumption:** 10 tests
- **City:** Addis Ababa
- **Status:** ⚠️ NOT IN WEBSITE - Need to add

### 9. **Gibe medium Hospital** (Jimma)
- **Consumption:** 6 tests
- **City:** Jimma
- **Status:** ⚠️ NOT IN WEBSITE - Need to add

### 10. **Alta Medium Clinic** (Adama - in report but showing 0 tests)
- **Consumption:** 0 tests
- **City:** Adama
- **Status:** ✅ Already in website as EXTERNAL customer

---

## ✅ CUSTOMERS VERIFIED IN BOTH WEBSITE AND REPORT

These customers exist in both and have matching or similar names:

1. **Biruhkids Pediatrics center** - ✅ Match (122 tests)
2. **UNECA** - ⚠️ Might be same as "United Nation economic commission" (verify)
3. **Hayat Hospital** - ✅ Match (44 tests)
4. **Dr.Shemse MCH Center** - ✅ Match (40 tests)
5. **Arada Georgis Specialized Medical** - ✅ Match (26 tests)
6. **Axon Neurology Center** - ✅ Match (21 tests)
7. **Senay Higher Clinic** - ✅ Match (20 tests)
8. **Addis Cardiac Hospital** - ✅ Match (20 tests)
9. **Uropshare Medical Service** - ✅ Match (18 tests)
10. **ACE Engineeering PLC** - ✅ Match (17 tests)
11. **Hasset Medium Clinic** - ✅ Match (14 tests)
12. **Birhan Ethiopia international Medicine** - ✅ Match (10 tests)
13. **Caring Internal Medicine Speciality** - ✅ Match (10 tests)
14. **Alem Tena Internal Medicine** - ✅ Match (9 tests)
15. **Hope Oncology Center** - ✅ Match (7 tests)
16. **Universe Internal Medicine** - ✅ Match (6 tests)
17. **Alem Gena Medical Services** - ✅ Match (5 tests)
18. **Lobe Midium Clinic** - ✅ Match (5 tests)
19. **Dr.Meliha Gyn/Obs** - ✅ Match (5 tests)
20. **Semah MCH** - ✅ Match (4 tests)
21. **AL-FEWZ Health care** - ✅ Match (3 tests)
22. **Legehar General Hospital** - ✅ Match (2 tests)
23. **Fikir Abrak (A90)** - ✅ Match (2 tests)

... and all other customers from the report

---

## 🔍 CUSTOMERS IN WEBSITE WITH ZERO CONSUMPTION

These customers are in your website database but had NO reagent consumption in the 6-month report:

### **Addis Ababa (9 inactive):**
1. Lucy health care plc - 0 tests
2. Lubu Internal and MCH Clinic - 0 tests (might be "Lebu st mechael internal"?)
3. Vital Internal Medicine - 0 tests
4. Fikir Abrak (A8) - 0 tests
5. Qelebet specialised clinic - 0 tests
6. Summit Health Center - 0 tests
7. Amin General Hospital - 0 tests
8. American Medical Center - 0 tests
9. Sold not installed - 0 tests (special case)

### **Jimma (2 inactive):**
1. Abajifar Medium Clinic (A8) - 0 tests
2. Geda Medical Laboratory - 0 tests

### **Other Cities (5 inactive):**
1. Alta Medium Clinic (Adama) - 0 tests
2. Arba Minch General Hospital - 0 tests
3. Rohobot General Hospital (Asella) - 0 tests
4. Robsen Clinic (D.D) - 0 tests
5. Mohammed Akle General Hospital (Awash) - 0 tests
6. Odo Dola Medium Clinic (Shakiso) - 0 tests

**Total Inactive:** 16 customers (23.9% of database)

---

## 🎯 ACTION PLAN

### **Step 1: Add Missing Customers to Website**

Add these 9 NEW customers to index.html:

1. ✏️ **yehulshet internal medicine** (A.A, 1 test)
2. ✏️ **Abrak medical service plc** (A.A, 1 test)
3. ✏️ **Lebu st mechael internal** (A.A, 30 tests) - IMPORTANT customer!
4. ✏️ **mander trading plc** (A.A, 1 test)
5. ✏️ **Medan pediatric clinic** (A.A, 3 tests)
6. ✏️ **Alta medium clinic** (A.A - different from Adama one, 1 test)
7. ✏️ **Jedunave Pharmacetical plc** (A.A, 10 tests)
8. ✏️ **Gibe medium Hospital** (Jimma, 6 tests)

### **Step 2: Verify Potential Duplicates**

1. **UNECA vs United Nation economic commission**
   - Website: "UNECA" (ID:6, A90 machine, 29/08/2024)
   - Report shows TWO entries:
     - "UNECA" - 57 tests
     - "United Nation economic commission" - 42 tests
   - **Action:** Confirm if these are 2 separate customers or same customer entered twice

2. **Lubu vs Lebu**
   - Website: "Lubu Internal and MCH Clinic" (ID:4, 0 tests)
   - Report: "Lebu st mechael internal" (30 tests)
   - **Action:** Likely TYPO - correct website name or confirm if different

3. **Abrak medical service vs Fikir Abrak**
   - Website: "Fikir Abrak Internal and MCH Center" (ID:25 and ID:29)
   - Report: "Abrak medical service plc" (1 test)
   - **Action:** Confirm if related or separate entities

### **Step 3: Add 6-Month Consumption Metrics to Website**

For each customer in the website, add a new field showing:
- Total 6-month consumption
- Top 3 reagents purchased
- Consumption trend (growing, stable, declining)
- Last order date

### **Step 4: Flag Inactive Customers**

Add a visual indicator for the 16 customers with zero consumption:
- ⚠️ "No orders in 6 months" badge
- Recommended action: Sales team follow-up

---

## 📝 DATA QUALITY NOTES

### **Spelling/Name Variations Found:**
- "Lobe" vs "Lobe Midium" (inconsistent spelling)
- "Lubu" vs "Lebu" (typo?)
- "UNECA" vs "United Nation economic commission" (abbreviation vs full name)
- "Alta" appears in both A.A and Adama (different clinics)

### **Recommendations:**
1. **Standardize customer names** across all systems
2. **Use unique Customer IDs** to avoid duplicate entries
3. **Regular database audits** to catch typos and duplicates
4. **Add "Also Known As" field** for customers with multiple names

---

## 💼 BUSINESS IMPACT

### **Discovered HIGH-VALUE Customers Missing from Database:**

1. **United Nation economic commission** - 42 tests (3.2% of total)
2. **Lebu st mechael internal** - 30 tests (2.3% of total)
3. **Jedunave Pharmacetical plc** - 10 tests (0.8% of total)

**Total missing consumption:** 83 tests = 6.4% of total volume!

These customers generated significant revenue but were not properly tracked in the system.

---

**Next Step:** Would you like me to:
1. ✏️ Add the 9 missing customers to your website index.html?
2. 🔄 Add 6-month consumption data to each customer record?
3. 🏷️ Add visual indicators for inactive customers?
4. 📊 Create a "Customer Performance" dashboard showing consumption metrics?

**Recommendation:** Do ALL of the above to have a complete, accurate system!

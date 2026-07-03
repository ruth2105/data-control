# 📥 Bulk Import Guide / 批量导入指南

## 🎉 New Feature: Bulk Import Visits / 新功能：批量导入拜访记录

Import multiple visit reports at once instead of entering them one by one!

一次导入多个拜访报告，而不是逐个输入！

---

## 🚀 How to Use / 使用方法

### **Step 1: Upload Updated Files / 上传更新文件**

1. Go to Netlify: https://app.netlify.com
2. Find: "dancing-pudding-81ccb5"
3. Click "Deploys"
4. **Drag & drop** `index.html`
5. Wait 30 seconds

### **Step 2: Open Your Site / 打开您的网站**

Visit: https://dancing-pudding-81ccb5.netlify.app/

### **Step 3: Log In / 登录**

Log in as any salesperson (or boss account if you have one)

### **Step 4: Go to Visit Form Tab / 前往拜访登记标签**

Click: **📝 拜访登记**

### **Step 5: Click Bulk Import Button / 点击批量导入按钮**

You'll see a new green button:
```
📥 批量导入 / Bulk Import
```

Click it!

### **Step 6: Fill Import Form / 填写导入表单**

1. **Select Salesperson / 选择业务员:**
   - Ephrata Tekola (埃弗拉塔·特科拉)
   - Kalkidan Awoke (卡尔基丹·阿沃克)
   - Tizita Tarekeg (蒂齐塔·塔雷克)

2. **Select Date / 选择日期:**
   - Auto-fills today's date
   - You can change it to any past date

3. **Paste Hospital Data / 粘贴医院数据:**
   - Open the prepared data files:
     - `KALKIDAN_IMPORT_DATA.txt` (47 facilities)
     - `EPHRATA_IMPORT_DATA.txt` (30 facilities)
   - Copy ALL the content
   - Paste into the text area

### **Step 7: Start Import / 开始导入**

Click: **✅ 开始导入 / Start Import**

You'll see:
- Confirmation dialog with count
- Progress indicator (0/47, 1/47, 2/47...)
- Success/Error count

### **Step 8: View Results / 查看结果**

After import completes:
- Click "📋 拜访报告" tab
- You'll see all imported reports!
- Each will have:
  - ✅ Hospital name
  - ✅ Salesperson
  - ✅ Date
  - ✅ Customer Potential (Hot/Warm/Cold)
  - ⚠️ Other fields empty (can be edited later)

---

## 📊 What Gets Imported / 导入的内容

For each line in the data file, the system creates a report with:

对于数据文件中的每一行，系统创建一个报告：

| Field / 字段 | Value / 值 | Source / 来源 |
|--------------|-----------|--------------|
| Hospital Name | From data | 从数据 |
| Salesperson | Selected by you | 您选择的 |
| Date | Selected by you | 您选择的 |
| Customer Potential | Hot/Warm/Cold | From data / 从数据 |
| Visit Type | "First contact" | Auto-filled / 自动填充 |
| All other fields | Empty | Can edit later / 稍后编辑 |

---

## 📝 Data Format / 数据格式

The import accepts these formats:

导入接受以下格式：

### **Format 1: Pipe Separator (Recommended) / 格式1：竖线分隔（推荐）**
```
Hospital Name | Hot
Another Hospital | Warm
Third Hospital | Cold
```

### **Format 2: Tab Separator / 格式2：制表符分隔**
```
Hospital Name    Hot
Another Hospital    Warm
```

### **Format 3: Multiple Spaces / 格式3：多个空格**
```
Hospital Name        Hot
Another Hospital     Warm
```

**The system automatically detects the format!**

**系统自动检测格式！**

---

## ✅ Benefits / 优势

### **Save Time / 节省时间:**
- Import 47 reports in 30 seconds
- Instead of 2-3 hours of manual entry
- 导入47条报告仅需30秒
- 而不是2-3小时手动输入

### **Reduce Errors / 减少错误:**
- Copy-paste from source document
- No typos
- 从源文档复制粘贴
- 无拼写错误

### **Quick Data Entry / 快速数据录入:**
- Focus on important fields later
- Get data into system immediately
- 稍后关注重要字段
- 立即将数据录入系统

---

## 📋 Prepared Data Files / 准备好的数据文件

I created two files ready to use:

我创建了两个可以直接使用的文件：

### **1. KALKIDAN_IMPORT_DATA.txt**
- 47 health facilities
- Kalkidan's visits
- Hot: 11 | Warm: 17 | Cold: 19

### **2. EPHRATA_IMPORT_DATA.txt**
- 30 health facilities
- Ephrata's visits
- Hot: 5 | Warm: 11 | Cold: 14

**Just open the file, copy all, paste, and import!**

**只需打开文件，全选复制，粘贴，然后导入！**

---

## 🎯 Step-by-Step Example / 分步示例

### **Import Kalkidan's Data / 导入Kalkidan的数据:**

1. Log in to your site
2. Click "📝 拜访登记"
3. Click "📥 批量导入"
4. Select: "卡尔基丹·阿沃克 (Kalkidan Awoke)"
5. Select date: e.g., 2026-06-20
6. Open: `KALKIDAN_IMPORT_DATA.txt`
7. Press Ctrl+A (select all)
8. Press Ctrl+C (copy)
9. Click in the text area
10. Press Ctrl+V (paste)
11. Click "✅ 开始导入"
12. Wait 30 seconds
13. Done! 47 reports created! ✅

### **Import Ephrata's Data / 导入Ephrata的数据:**

Repeat the same steps, but:
- Select: "埃弗拉塔·特科拉 (Ephrata Tekola)"
- Open: `EPHRATA_IMPORT_DATA.txt`
- Result: 30 reports created! ✅

---

## 🔧 After Import / 导入后

### **Edit Individual Reports / 编辑单个报告:**

1. Go to "📋 拜访报告" tab
2. Find the report you want to edit
3. Click "编辑 / Edit" button
4. Fill in additional details:
   - Contact person
   - Equipment information
   - Competitor analysis
   - Visit purpose
   - Progress notes
5. Click "💾 更新报告 / Update Report"

### **View Reports by Salesperson / 按业务员查看报告:**

Use the filter dropdown:
- 全部业务员 / All Salespersons
- Ephrata Tekola
- Kalkidan Awoke
- Tizita Tarekeg

---

## 📊 Summary / 总结

**Total Records to Import / 总共要导入的记录:**
- Kalkidan: 47 facilities
- Ephrata: 30 facilities
- **Total: 77 facilities** 🎉

**Time Saved / 节省的时间:**
- Manual entry: ~3-4 hours
- Bulk import: ~2 minutes
- **Saved: 3+ hours!** ⏰

**Customer Potential Breakdown / 客户潜力分类:**
- 🔥 Hot: 16 facilities (21%)
- 🌤️ Warm: 28 facilities (36%)
- ❄️ Cold: 33 facilities (43%)

---

## 💡 Tips / 提示

1. **Import in batches if you have many records**
   如果有很多记录，分批导入

2. **Use consistent date for each batch**
   每批使用一致的日期

3. **Edit important reports later**
   稍后编辑重要报告

4. **Export to Excel after import to verify**
   导入后导出到Excel以验证

5. **Boss account can see all imported reports**
   老板账户可以看到所有导入的报告

---

## ❓ Troubleshooting / 故障排除

**Problem: Import fails / 导入失败**
- Check internet connection
- Make sure Google Sheets is set up correctly
- Try smaller batches (10-20 at a time)

**Problem: Wrong salesperson / 业务员错误**
- You can edit individual reports later
- Or delete and re-import

**Problem: Wrong potential level / 潜力等级错误**
- Edit the report
- Change the dropdown to correct value
- Update

**Problem: Format not recognized / 格式无法识别**
- Use the prepared .txt files
- Or use format: `Hospital Name | Hot`

---

## 🎉 Ready to Import! / 准备导入！

1. Upload `index.html` to Netlify
2. Open `KALKIDAN_IMPORT_DATA.txt`
3. Copy all content
4. Go to your site
5. Click bulk import
6. Paste and import!
7. Repeat for Ephrata's data

**77 reports in under 5 minutes!** 🚀

**5分钟内完成77条报告！** 🚀


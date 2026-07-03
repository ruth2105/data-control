# 📱 Multi-Device Data Sync Instructions / 多设备数据同步说明

## 🎯 What You Need to Do / 您需要做什么

Your app currently saves data only on the current browser (localStorage). To make it work across all your devices, you need to:

您的应用目前仅将数据保存在当前浏览器中（localStorage）。要使其在所有设备上工作，您需要：

1. **Create a Google Sheet** to store the data / **创建Google表格**存储数据
2. **Deploy Google Apps Script** as a web API / **部署Google应用脚本**作为网络API
3. **Update the Web App URL** in your HTML file / **更新HTML文件中的网络应用网址**

---

## 📋 Step-by-Step Guide / 分步指南

### STEP 1: Create Your Google Sheet / 第1步：创建您的Google表格

1. Open / 打开: **https://sheets.google.com**
2. Click **+ Blank** / 点击**+空白**
3. Rename the sheet / 重命名表格: **客户拜访报告数据**
4. **Copy the Sheet ID** from the URL / **从网址复制表格ID**

   Example URL / 网址示例:
   ```
   https://docs.google.com/spreadsheets/d/ABC123XYZ456/edit
                                              ^^^^^^^^^^^^
                                              This is your Sheet ID
                                              这是您的表格ID
   ```

5. **Write down your Sheet ID!** / **记下您的表格ID！**

---

### STEP 2: Update Apps Script with Your Sheet ID / 第2步：使用您的表格ID更新应用脚本

1. Open the file: `appsscript.gs` / 打开文件：`appsscript.gs`
2. Find Line 1: / 找到第1行：
   ```javascript
   const SHEET_ID = '1lVTpBiw6LfSatgIMSOEpT6zG_5UVd3c_HzSTZxHGEzY';
   ```
3. **Replace the old ID with YOUR new Sheet ID**: / **用您的新表格ID替换旧ID**：
   ```javascript
   const SHEET_ID = 'YOUR_NEW_SHEET_ID_HERE';
   ```
4. Save the file / 保存文件

---

### STEP 3: Deploy Google Apps Script / 第3步：部署Google应用脚本

1. Go back to your Google Sheet / 回到您的Google表格
2. Click **Extensions** > **Apps Script** / 点击**扩展程序** > **应用脚本**
3. Delete any code in the editor / 删除编辑器中的任何代码
4. **Copy ALL code from your updated `appsscript.gs` file** / **从更新后的`appsscript.gs`文件复制所有代码**
5. **Paste it** into the Apps Script editor / **粘贴**到应用脚本编辑器
6. Click **Save** (💾 icon) / 点击**保存**（💾图标）
7. Name it: **Visit Reports API** / 命名：**拜访报告API**
8. Click **Deploy** > **New deployment** / 点击**部署** > **新部署**
9. Click gear icon ⚙️ > Select **Web app** / 点击齿轮图标⚙️ > 选择**网络应用**
10. Settings / 设置:
    - Execute as: **Me** / 执行身份：**我**
    - Who has access: **Anyone** / 访问权限：**任何人**
11. Click **Deploy** / 点击**部署**
12. **Authorize** (click Advanced > Go to project > Allow) / **授权**（点击高级>前往项目>允许）
13. **COPY THE WEB APP URL!** It looks like: / **复制网络应用网址！**它看起来像：
    ```
    https://script.google.com/macros/s/AKfycbx...ABC123.../exec
    ```
14. **Write down this URL!** / **记下这个网址！**

---

### STEP 4: Update Your HTML File / 第4步：更新您的HTML文件

Now you need to update `index.html` with your new Web App URL:

现在您需要使用新的网络应用网址更新`index.html`：

1. Open `index.html` / 打开`index.html`
2. Find Line ~1162 (search for `SCRIPT_URL`): / 找到第1162行左右（搜索`SCRIPT_URL`）：
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5es8aX99NaIQ7iLFE3FNTmee-ONfLmYZ6SgHYFNlJlzozG9EqB-OoabAue81xz26HUQ/exec';
   ```
3. **Replace with YOUR new Web App URL**: / **替换为您的新网络应用网址**：
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_NEW_URL_HERE/exec';
   ```
4. Save the file / 保存文件

---

### STEP 5: Enable Google Sheets API Calls / 第5步：启用Google表格API调用

The app is currently using `localStorage`. I need to update it to use Google Sheets API.

应用目前使用`localStorage`。我需要更新它以使用Google表格API。

**Tell me when you're ready with Steps 1-4, and I'll automatically update the code for you!**

**完成第1-4步后告诉我，我会自动为您更新代码！**

Just provide:
- ✅ Your new Sheet ID / 您的新表格ID
- ✅ Your new Web App URL / 您的新网络应用网址

---

## 🧪 How to Test / 如何测试

After I update the code:

我更新代码后：

1. Open `index.html` in **Browser 1** (e.g., Chrome on your laptop) / 在**浏览器1**中打开`index.html`（例如，笔记本电脑上的Chrome）
2. Log in and submit a visit report / 登录并提交拜访报告
3. Check your **Google Sheet** - you should see the data! / 检查您的**Google表格** - 您应该看到数据！
4. Open `index.html` in **Browser 2** (e.g., Firefox on the same laptop) / 在**浏览器2**中打开`index.html`（例如，同一台笔记本电脑上的Firefox）
5. Go to **📋 拜访报告** tab / 前往**📋拜访报告**标签
6. You should see the same report! / 您应该看到相同的报告！
7. Open on your **phone or another device** / 在您的**手机或其他设备**上打开
8. Data should sync! / 数据应该同步！

---

## ✅ What Will Change / 将会改变什么

### Before (Current) / 之前（当前）
- ❌ Data saved only in current browser / 数据仅保存在当前浏览器中
- ❌ Cannot see data on other devices / 无法在其他设备上看到数据
- ❌ Clearing browser cache deletes all data / 清除浏览器缓存会删除所有数据

### After (With Google Sheets) / 之后（使用Google表格）
- ✅ Data saved in Google Sheets (cloud) / 数据保存在Google表格中（云端）
- ✅ Access from any device with internet / 可从任何有互联网的设备访问
- ✅ Data is backed up automatically / 数据自动备份
- ✅ Multiple people can submit reports at the same time / 多人可以同时提交报告
- ✅ You can edit data directly in Google Sheets / 您可以直接在Google表格中编辑数据
- ✅ Excel export still works / Excel导出仍然有效

---

## 🎨 Code Changes I Will Make / 我将进行的代码更改

I will update these functions in `index.html`:

我将更新`index.html`中的这些函数：

1. **`submitVisitForm()`** - Send data to Google Sheets instead of localStorage / 将数据发送到Google表格而不是localStorage
2. **`getReports()`** - Fetch data from Google Sheets instead of localStorage / 从Google表格获取数据而不是localStorage
3. **`deleteReport()`** - Delete from Google Sheets instead of localStorage / 从Google表格删除而不是localStorage
4. **`renderReports()`** - Load from Google Sheets API / 从Google表格API加载
5. **`renderDashboard()`** - Load from Google Sheets API / 从Google表格API加载

---

## 📞 Ready? / 准备好了吗？

**Once you complete Steps 1-4, reply with:**

**完成第1-4步后，请回复：**

```
Ready! Here are my credentials:
- Sheet ID: [paste your Sheet ID here]
- Web App URL: [paste your Web App URL here]
```

**Then I'll automatically update your code!** 🚀

**然后我将自动更新您的代码！** 🚀

---

## ❓ Common Questions / 常见问题

**Q: Is it safe? / 安全吗？**
A: Yes! Your data is stored in your own Google Sheet. Only people with the Web App URL can access it. You can restrict access later if needed.

是的！您的数据存储在您自己的Google表格中。只有拥有网络应用网址的人才能访问它。如有需要，您可以稍后限制访问。

**Q: Is it free? / 免费吗？**
A: Yes! Google Apps Script is free for personal use with generous quotas.

是的！Google应用脚本个人使用免费，配额充足。

**Q: What if I already have data in localStorage? / 如果我在localStorage中已有数据怎么办？**
A: After switching to Google Sheets, your old localStorage data will remain in that browser, but new submissions will go to Google Sheets. You can manually re-enter old reports or I can help you migrate them.

切换到Google表格后，旧的localStorage数据将保留在该浏览器中，但新提交将进入Google表格。您可以手动重新输入旧报告，或者我可以帮助您迁移它们。

**Q: Can I still use Excel export? / 还能使用Excel导出吗？**
A: Yes! The Excel export will work exactly the same, pulling data from Google Sheets.

是的！Excel导出将完全相同，从Google表格提取数据。


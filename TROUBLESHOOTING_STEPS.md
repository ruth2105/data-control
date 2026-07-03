# 🔧 故障排除步骤 / Troubleshooting Steps

## 问题 / Problem
- 网站显示 "Showing 0 of 0 reports" (没有数据)
- 批量导入显示错误
- 无法提交表单

---

## 🎯 解决方案 / Solution: 3步骤

### 步骤 1️⃣: 更新 Google Apps Script

**非常重要！必须先做这个！/ VERY IMPORTANT! Must do this first!**

1. **打开 Google Sheet** / Open Google Sheet:
   ```
   https://docs.google.com/spreadsheets/d/1lVTpBiw6LfSatgIMSOEpT6zG_5UVd3c_HzSTZxHGEzY/edit
   ```

2. **点击菜单** / Click menu:
   - 扩展程序 → Apps Script
   - Extensions → Apps Script

3. **复制代码** / Copy code:
   - 打开您电脑上的文件: `c:\Users\user\Desktop\hospital list\appsscript.gs`
   - 复制所有内容 (Ctrl+A, Ctrl+C)

4. **粘贴到 Apps Script 编辑器** / Paste into Apps Script editor:
   - 删除编辑器中的所有旧代码
   - 粘贴新代码 (Ctrl+V)

5. **保存** / Save:
   - 点击 💾 保存图标
   - 或按 Ctrl+S

6. **部署新版本** / Deploy new version:
   
   **方法 A: 创建新部署 (如果是第一次)** / Method A: New deployment (if first time)
   - 点击 "部署" → "新建部署"
   - 点击齿轮图标 ⚙️ → 选择 "Web 应用"
   - 设置:
     * 执行身份: "我" (Me)
     * 谁有权访问: "任何人" (Anyone)
   - 点击 "部署"
   - 复制新的 Web App URL

   **方法 B: 更新现有部署 (推荐)** / Method B: Update existing deployment (recommended)
   - 点击 "部署" → "管理部署"
   - 找到现有的部署
   - 点击 ✏️ 编辑图标
   - 在 "版本" 下拉菜单中选择 "新建版本"
   - 添加描述: "Added customerPotential field"
   - 点击 "部署"
   - ✅ 完成！

7. **检查 URL 是否正确** / Verify URL is correct:
   - 在 index.html 中查找: `const SCRIPT_URL = '...'`
   - 应该是: `https://script.google.com/macros/s/AKfycbx5es8aX99NaIQ7iLFE3FNTmee-ONfLmYZ6SgHYFNlJlzozG9EqB-OoabAue81xz26HUQ/exec`
   - 如果不同，需要更新 index.html

---

### 步骤 2️⃣: 测试 Google Apps Script

**在部署后，测试它是否工作:**

1. **测试 GET 请求** (读取数据):
   - 在浏览器中打开:
   ```
   https://script.google.com/macros/s/AKfycbx5es8aX99NaIQ7iLFE3FNTmee-ONfLmYZ6SgHYFNlJlzozG9EqB-OoabAue81xz26HUQ/exec
   ```
   
   - 应该看到:
   ```json
   {"status":"ok","data":[]}
   ```
   
   - 如果看到错误，说明部署有问题

2. **检查 Google Sheet**:
   - 打开 Sheet: https://docs.google.com/spreadsheets/d/1lVTpBiw6LfSatgIMSOEpT6zG_5UVd3c_HzSTZxHGEzY/edit
   - 第一行应该有表头 (headers)
   - 如果没有表头，Apps Script 会在第一次提交数据时自动创建

---

### 步骤 3️⃣: 导入测试数据

**使用批量导入功能添加数据:**

1. **打开网站**:
   ```
   https://dancing-pudding-81ccb5.netlify.app/
   ```

2. **点击 "拜访登记" 标签** / Click "Visit Form" tab

3. **登录**:
   - 选择: 埃弗拉塔·特科拉 (Ephrata Tekola)
   - 密码: `Ephrata`
   - 点击登录

4. **点击 "📥 批量导入" 按钮**

5. **填写表单**:
   - 业务员: 埃弗拉塔·特科拉 (Ephrata Tekola)
   - 日期: 选择今天的日期
   - 医院数据: 复制并粘贴以下测试数据:
   ```
   Test Hospital One | Hot
   Test Hospital Two | Warm
   Test Hospital Three | Cold
   ```

6. **点击 "✅ 开始导入"**

7. **等待导入完成**:
   - 应该显示: "✅ 导入完成 / Import Complete"
   - 成功: 3 / 失败: 0

8. **检查结果**:
   - 点击 "📋 拜访报告" 标签
   - 应该看到 3 条记录
   - 如果看到数据，说明一切正常！✅

---

## 🐛 常见问题 / Common Issues

### 问题 1: "权限被拒绝" / "Permission denied"
**原因**: Apps Script 部署设置不正确
**解决**: 
- 重新部署，确保 "谁有权访问" 设置为 "任何人"
- 点击 "授权访问" 并允许所有权限

### 问题 2: 数据提交后没有显示
**原因**: 可能是缓存问题
**解决**:
- 刷新页面 (F5 或 Ctrl+R)
- 清除浏览器缓存
- 尝试无痕模式 (Ctrl+Shift+N)

### 问题 3: "SCRIPT_URL is not defined"
**原因**: JavaScript 变量未定义
**解决**:
- 打开 index.html
- 搜索 `const SCRIPT_URL`
- 确保它在任何使用它的函数之前定义

### 问题 4: 看到旧数据或没有 customerPotential 字段
**原因**: Sheet 中有旧数据，没有新字段
**解决 A (推荐)**: 手动添加列
- 打开 Google Sheet
- 在表头行找到最后一列
- 在 "customerCategory" 后面添加新列: "customerPotential"

**解决 B (危险)**: 清空 Sheet 重新开始
- ⚠️ 这会删除所有数据！
- 删除 Sheet 中的所有行
- Apps Script 会在下次提交时重新创建表头

---

## ✅ 成功标志 / Success Indicators

如果一切正常，您应该看到:

1. ✅ 批量导入显示 "导入完成" 没有错误
2. ✅ "拜访报告" 标签显示导入的数据
3. ✅ 可以点击每条记录查看详情
4. ✅ 统计栏显示正确的数字 (Hot/Warm/Cold 计数)
5. ✅ 可以按潜力筛选 (Hot/Warm/Cold)
6. ✅ Google Sheet 中可以看到数据

---

## 📞 仍然有问题？ / Still Having Issues?

如果完成这些步骤后仍然无法工作，请提供:

1. **错误消息截图** / Screenshot of error message
2. **Google Apps Script 日志** / Apps Script logs:
   - 在 Apps Script 编辑器中点击 "执行" → "查看日志"
3. **浏览器控制台错误** / Browser console errors:
   - 按 F12 打开开发者工具
   - 点击 "Console" 标签
   - 截图任何红色错误消息

我会帮助您解决！

---

**下一步行动 / Next Action:**
👉 **现在就去完成步骤 1️⃣ (更新 Google Apps Script)**

这是最重要的步骤，完成后其他问题会自动解决！

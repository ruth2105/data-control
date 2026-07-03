# 📊 Excel导出过滤指南 / Excel Export Filtering Guide

## 🎯 目的 / Purpose

本指南将教您如何使用导出的Excel文件进行数据过滤、排序和分析。
This guide teaches you how to filter, sort, and analyze data in the exported Excel file.

---

## 📥 第一步：导出数据 / Step 1: Export Data

### 如何导出 / How to Export

1. **登录系统**
   - 使用您的用户名和密码登录
   - Login with your username and password

2. **进入拜访管理页面**
   - 点击顶部 **"📋 拜访管理"** 标签
   - Click **"📋 Visit Management"** tab at the top

3. **点击导出按钮**
   - 找到 **"📥 导出Excel / Export Excel"** 按钮
   - 点击按钮
   - Click the **"📥 Export Excel"** button

4. **下载文件**
   - 文件自动下载：`Fremenatos_拜访报告_2026-06-30.xlsx`
   - File downloads automatically with today's date

---

## 📂 第二步：打开Excel文件 / Step 2: Open Excel File

### 文件结构 / File Structure

Excel文件包含4个工作表：
The Excel file contains 4 worksheets:

1. **📄 封面 / Cover**
   - 汇总统计信息
   - Summary statistics

2. **📋 拜访报告 / Visit Reports** ⭐ **主要工作表 / MAIN SHEET**
   - 完整的拜访数据（71个字段）
   - Complete visit data (71 fields)
   - 这是您进行过滤和分析的地方
   - This is where you filter and analyze

3. **📊 统计摘要 / Summary**
   - 业务员表现统计
   - Salesperson performance statistics
   - 客户类别分布
   - Customer category distribution

4. **📖 字段说明 / Legend**
   - 所有字段的说明
   - Description of all fields
   - 颜色编码指南
   - Color coding guide

### 打开主工作表 / Open Main Sheet

1. 打开下载的Excel文件
2. 点击 **"拜访报告 / Visit Reports"** 标签
3. 您将看到所有数据，带有彩色标题行

---

## 🎨 第三步：理解布局 / Step 3: Understand Layout

### 冻结窗格 / Frozen Panes ❄️

文件已自动设置冻结窗格：
The file has frozen panes automatically set:

- **第1列（A列）- 行号** 🔒
  - 向右滚动时，行号保持可见
  - Row numbers stay visible when scrolling right

- **第1-2行 - 标题行** 🔒
  - 向下滚动时，标题保持可见
  - Headers stay visible when scrolling down

**测试一下！**
- 向右滚动 → 行号跟随
- 向下滚动 → 标题跟随
- Scroll right → Row numbers follow
- Scroll down → Headers follow

### 颜色编码 / Color Coding 🌈

标题行使用颜色来分组字段：
Header row uses colors to group fields:

| 颜色 / Color | 字段组 / Field Group | 列 / Columns | 字段数 / Count |
|-------------|---------------------|-------------|---------------|
| 🔵 深蓝色 | 行号 / Row Numbers | A | 1 |
| 🔵 蓝色 | 基本信息 / Basic Info | B-S | 18 |
| 🟣 紫色 | 万孚设备 / Wondfo Equipment | T-AA | 8 |
| 🔴 红色 | 竞品设备 / Competitor Equipment | AB-AO | 14 |
| 🟢 绿色 | 耗材信息 / Consumables | AP-BJ | 21 |
| 🟠 橙色 | 其他信息 / Other Info | BK-BN | 4 |
| 🟣 紫色 | 进展跟踪 / Progress | BO-BR | 5 |

---

## 🔍 第四步：使用过滤功能 / Step 4: Use Filtering

### 自动过滤已启用 / Auto-Filter Enabled ✅

每个列标题都有一个 **下拉箭头 ▼**
Each column header has a **dropdown arrow ▼**

### 基本过滤 / Basic Filtering

#### 示例1：只显示某个业务员的数据
**Example 1: Show only one salesperson's data**

1. 找到 **"业务员 / Sales Person"** 列（D列）
2. 点击标题右侧的 **▼** 箭头
3. **取消勾选 "全选"**
4. **只勾选** 您想看的业务员，例如：
   - ✅ 埃弗拉塔·特科拉 (Ephrata Tekola)
5. 点击 **"确定"**
6. **结果**：只显示Ephrata的拜访记录

#### 示例2：只显示"Hot"潜力客户
**Example 2: Show only "Hot" potential customers**

1. 找到 **"🌡️ 客户潜力 / Potential"** 列（BN列）
2. 点击 **▼** 箭头
3. 取消勾选 "全选"
4. **只勾选 "Hot"**
5. 点击 **"确定"**
6. **结果**：只显示高潜力客户

#### 示例3：按日期范围过滤
**Example 3: Filter by date range**

1. 找到 **"填写日期 / Fill Date"** 列（C列）
2. 点击 **▼** 箭头
3. 选择 **"日期筛选"** → **"介于..."**
4. 输入开始日期和结束日期
5. 点击 **"确定"**
6. **结果**：只显示该日期范围内的记录

---

## 📊 第五步：多列过滤 / Step 5: Multi-Column Filtering

您可以同时对多个列应用过滤！
You can apply filters to multiple columns simultaneously!

### 高级示例：组合过滤
**Advanced Example: Combined Filtering**

**场景**：我想看Ephrata在1月份拜访的所有Hot客户
**Scenario**: I want to see all Hot customers visited by Ephrata in January

#### 步骤 / Steps:

1. **过滤业务员**
   - D列（业务员）→ ▼ → 只选 "Ephrata"
   
2. **过滤日期**
   - C列（填写日期）→ ▼ → 日期筛选 → 1月

3. **过滤潜力**
   - BN列（客户潜力）→ ▼ → 只选 "Hot"

4. **结果**：只显示符合所有3个条件的记录 ✅

### 清除过滤 / Clear Filters

#### 清除单个列的过滤
**Clear one column's filter:**
- 点击该列的 ▼ → 选择 **"清除筛选"**
- Click the column's ▼ → Select **"Clear Filter"**

#### 清除所有过滤
**Clear all filters:**
- Excel菜单：**数据** → **清除**
- Excel menu: **Data** → **Clear**

---

## ↕️ 第六步：排序数据 / Step 6: Sort Data

### 升序排序 / Sort Ascending ⬆️

1. 点击任意列的 **▼** 箭头
2. 选择 **"升序排序"** 或 **"Sort A to Z"**
3. 数据按该列从小到大排序

### 降序排序 / Sort Descending ⬇️

1. 点击任意列的 **▼** 箭头
2. 选择 **"降序排序"** 或 **"Sort Z to A"**
3. 数据按该列从大到小排序

### 排序示例 / Sorting Examples

**示例1：按提交时间排序**
- B列（提交时间）→ ▼ → 升序排序
- 最早的记录在最上面

**示例2：按医院名称排序**
- E列（医院名称）→ ▼ → 升序排序
- 按字母顺序A-Z排列

**示例3：按在班医生人数排序**
- N列（在班医生）→ ▼ → 降序排序
- 医生最多的医院在最上面

---

## 🔎 第七步：搜索功能 / Step 7: Search Function

### 在过滤器中搜索
**Search within filter:**

1. 点击任意列的 **▼** 箭头
2. 在过滤器下拉框顶部有 **"搜索"** 框
3. 输入文字，列表自动过滤
4. 勾选您要的项目

**示例**：
- 在"医院名称"列搜索 "General"
- 只显示名称包含 "General" 的医院

---

## 📈 第八步：数据分析技巧 / Step 8: Data Analysis Tips

### 技巧1：复制过滤后的数据
**Tip 1: Copy filtered data**

1. 应用您想要的过滤器
2. 选择过滤后的所有行
3. **Ctrl+C** 复制
4. 粘贴到新工作表进行进一步分析

### 技巧2：导出过滤结果
**Tip 2: Export filtered results**

1. 应用过滤器
2. **文件** → **另存为**
3. 保存为新的Excel文件
4. 与团队分享特定的数据视图

### 技巧3：使用Excel公式
**Tip 3: Use Excel formulas**

在新列中添加计算：
Add calculations in new columns:

```excel
// 在BR列后添加新列 "总潜力分数"
// Add new column after BR: "Total Potential Score"
=COUNTIF(BO:BO,"Hot")*3 + COUNTIF(BO:BO,"Warm")*2 + COUNTIF(BO:BO,"Cold")*1
```

### 技巧4：创建数据透视表
**Tip 4: Create Pivot Tables**

1. 选择所有数据（Ctrl+A）
2. **插入** → **数据透视表**
3. 拖拽字段进行多维分析
4. 快速生成汇总报告

**透视表示例**：
- 行：业务员
- 列：客户潜力
- 值：计数
- 结果：每个业务员的Hot/Warm/Cold客户数量

### 技巧5：条件格式
**Tip 5: Conditional Formatting**

突出显示重要数据：
Highlight important data:

1. 选择 **"客户潜力"** 列
2. **开始** → **条件格式** → **突出显示单元格规则**
3. **等于** → "Hot" → 红色填充
4. **结果**：所有Hot客户高亮显示

---

## 💡 常见使用场景 / Common Use Cases

### 场景1：每周业务员报告
**Scenario 1: Weekly salesperson report**

**目标**：生成Ephrata本周的拜访总结
**Goal**: Generate Ephrata's weekly visit summary

1. 过滤：业务员 = "Ephrata"
2. 过滤：填写日期 = 本周
3. 排序：按医院名称升序
4. 复制到新工作表
5. 发送给主管

### 场景2：高潜力客户跟进
**Scenario 2: High-potential customer follow-up**

**目标**：找出所有Hot客户，计划下次拜访
**Goal**: Find all Hot customers, plan next visits

1. 过滤：客户潜力 = "Hot"
2. 排序：按下次拜访日期升序
3. 查看"下次目标"列
4. 制定跟进计划

### 场景3：设备需求分析
**Scenario 3: Equipment demand analysis**

**目标**：分析哪些医院需要电解质分析仪
**Goal**: Analyze which hospitals need electrolyte analyzers

1. 过滤：电解质品牌 ≠ 空白
2. 查看"电解质产地"和"日化验"列
3. 识别替换机会

### 场景4：区域市场分析
**Scenario 4: Regional market analysis**

**目标**：分析A.A地区的市场情况
**Goal**: Analyze market situation in A.A region

1. 过滤：医院地址包含 "A.A" 或 "Addis"
2. 统计：
   - 总医院数
   - Hot/Warm/Cold分布
   - 主要竞争对手品牌

### 场景5：月度销售会议
**Scenario 5: Monthly sales meeting**

**目标**：准备本月销售会议材料
**Goal**: Prepare monthly sales meeting materials

1. 过滤：填写日期 = 本月
2. 按业务员分组统计：
   - 拜访次数
   - Hot客户数
   - 成交客户数
3. 创建数据透视表
4. 生成图表

---

## ⚠️ 注意事项 / Important Notes

### DO's ✅

- ✅ **定期导出数据备份**
  - Regularly export data for backup

- ✅ **使用过滤而不是删除行**
  - Use filters instead of deleting rows

- ✅ **在复制前应用过滤**
  - Apply filters before copying

- ✅ **保存过滤后的视图为新文件**
  - Save filtered views as new files

- ✅ **使用颜色编码快速定位字段组**
  - Use color coding to quickly locate field groups

### DON'Ts ❌

- ❌ **不要删除标题行**
  - Don't delete header rows

- ❌ **不要删除第A列（行号）**
  - Don't delete column A (row numbers)

- ❌ **不要在原文件中修改数据**
  - Don't modify data in the original file

- ❌ **不要取消冻结窗格**
  - Don't unfreeze panes

- ❌ **不要移除自动过滤**
  - Don't remove auto-filter

---

## 🆘 故障排除 / Troubleshooting

### 问题1：看不到下拉箭头
**Problem 1: Can't see dropdown arrows**

**解决方案**：
1. 点击任意数据单元格
2. Excel菜单：**数据** → **筛选**
3. 下拉箭头应该出现

### 问题2：标题没有冻结
**Problem 2: Headers not frozen**

**解决方案**：
1. 点击 **B3** 单元格（第一个数据单元格）
2. Excel菜单：**视图** → **冻结窗格** → **冻结拆分窗格**

### 问题3：过滤器不工作
**Problem 3: Filters not working**

**解决方案**：
1. 确保您点击的是数据区域内的单元格
2. 检查是否有合并的单元格
3. 重新应用自动过滤：**数据** → **筛选**

### 问题4：找不到某一列
**Problem 4: Can't find a column**

**解决方案**：
1. 使用 **Ctrl+F** 查找列名
2. 检查 **"字段说明 / Legend"** 工作表
3. 使用颜色编码定位字段组

### 问题5：数据显示为 "####"
**Problem 5: Data shows as "####"**

**解决方案**：
1. 列宽太窄
2. 双击列边界自动调整宽度
3. 或手动拖动列边界加宽

---

## 📚 Excel快捷键 / Excel Shortcuts

### 导航 / Navigation
- **Ctrl + Home** - 跳到A1单元格
- **Ctrl + End** - 跳到最后一个数据单元格
- **Ctrl + ↑/↓/←/→** - 跳到当前区域边缘

### 选择 / Selection
- **Ctrl + Shift + End** - 选择到最后
- **Ctrl + A** - 全选
- **Shift + 空格** - 选择整行
- **Ctrl + 空格** - 选择整列

### 过滤和排序 / Filter & Sort
- **Ctrl + Shift + L** - 开启/关闭自动过滤
- **Alt + ↓** - 打开活动单元格的过滤下拉菜单
- **Ctrl + Shift + O** - 清除过滤

### 复制粘贴 / Copy & Paste
- **Ctrl + C** - 复制
- **Ctrl + V** - 粘贴
- **Ctrl + X** - 剪切
- **Ctrl + Z** - 撤销

---

## 🎓 进阶技巧 / Advanced Techniques

### 1. 自定义数字格式
**Custom Number Formats**

为数字添加单位：
Add units to numbers:

1. 选择数字列（如"日化验"）
2. 右键 → **设置单元格格式**
3. 选择 **"自定义"**
4. 输入格式：`#,##0 "tests/day"`

### 2. 数据验证
**Data Validation**

为新列添加下拉列表：
Add dropdown lists to new columns:

1. 选择单元格
2. **数据** → **数据验证**
3. 允许：列表
4. 来源：Hot,Warm,Cold

### 3. VLOOKUP查找
**VLOOKUP Lookup**

关联其他数据：
Link to other data:

```excel
=VLOOKUP(E2, 医院表!A:D, 2, FALSE)
// 在医院表中查找E2的医院名称，返回第2列数据
```

### 4. 图表可视化
**Chart Visualization**

快速创建图表：
Quick chart creation:

1. 选择数据范围
2. **插入** → **推荐的图表**
3. 选择合适的图表类型
4. 自定义标题和颜色

---

## 📞 需要帮助？ / Need Help?

### 培训资源 / Training Resources

- **Excel基础教程**：Microsoft Office官方教程
- **YouTube视频**：搜索 "Excel filtering tutorial"
- **内部培训**：联系IT部门安排培训

### 技术支持 / Technical Support

如果您遇到问题：
If you encounter issues:

1. 检查本指南的故障排除部分
2. 询问同事是否遇到过类似问题
3. 联系IT支持团队

---

## ✅ 快速检查清单 / Quick Checklist

完成以下检查，确保您掌握了Excel过滤功能：
Complete this checklist to ensure you understand Excel filtering:

- [ ] 我可以导出Excel文件
- [ ] 我可以打开"拜访报告"工作表
- [ ] 我理解冻结窗格的作用
- [ ] 我理解颜色编码的含义
- [ ] 我可以对单个列应用过滤
- [ ] 我可以对多个列同时应用过滤
- [ ] 我可以清除过滤
- [ ] 我可以对列进行排序
- [ ] 我可以在过滤器中搜索
- [ ] 我可以复制过滤后的数据
- [ ] 我可以创建数据透视表
- [ ] 我可以应用条件格式

---

**文档版本 / Document Version:** 1.0
**最后更新 / Last Updated:** 2026-06-30
**作者 / Author:** Fremenatos Trading PLC IT Team

---

🎉 **恭喜！您现在是Excel数据过滤专家！**
🎉 **Congratulations! You are now an Excel filtering expert!**

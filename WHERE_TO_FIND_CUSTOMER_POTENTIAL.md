# 🌡️ 客户潜力功能位置指南
# Where to Find Customer Potential Feature

---

## 📍 客户潜力在哪里？/ Where is Customer Potential?

客户潜力功能在系统的 **4 个不同位置**：
Customer Potential feature appears in **4 different locations**:

---

## 1️⃣ 拜访登记表单 / Visit Form (Input)

**位置 / Location:** 📝 **拜访登记** 标签 / **Visit Form** tab

### 如何使用 / How to Use:

1. **点击标签 / Click tab:** 
   ```
   📝 拜访登记 / Visit Form
   ```

2. **登录系统 / Login:**
   - 选择您的姓名 / Select your name
   - 输入密码 / Enter password
   - 点击登录 / Click login

3. **向下滚动到表单底部 / Scroll down to bottom of form**

4. **找到字段 / Find the field:**
   ```
   🌡️ 客户潜力 / Customer Potential
   ```

5. **从下拉菜单选择 / Select from dropdown:**
   - 🔥 **热门客户 / Hot** (Ready to buy) - 准备购买的客户
   - 🌤️ **温暖客户 / Warm** (Interested) - 有兴趣的客户  
   - ❄️ **冷淡客户 / Cold** (Low interest) - 兴趣较低的客户

6. **这是必填字段！/ This is REQUIRED!**
   - 如果不选择，无法提交表单
   - If you don't select, form cannot be submitted

### 📸 在表单中的样子 / What it looks like in the form:

```
┌─────────────────────────────────────────┐
│ 🌡️ 客户潜力 / Customer Potential       │
├─────────────────────────────────────────┤
│ -- 请选择潜力等级 --                ▼   │
│                                         │
│ Options:                                │
│ 🔥 热门客户 / Hot (Ready to buy)       │
│ 🌤️ 温暖客户 / Warm (Interested)        │
│ ❄️ 冷淡客户 / Cold (Low interest)      │
└─────────────────────────────────────────┘
```

---

## 2️⃣ 批量导入功能 / Bulk Import (Quick Input)

**位置 / Location:** 📝 **拜访登记** 标签 → 📥 **批量导入** 按钮

### 如何使用 / How to Use:

1. **点击标签 / Click tab:**
   ```
   📝 拜访登记 / Visit Form
   ```

2. **登录后，点击按钮 / After login, click button:**
   ```
   📥 批量导入 / Bulk Import
   ```

3. **输入数据格式 / Input data format:**
   ```
   医院名称 | Hot
   医院名称 | Warm
   医院名称 | Cold
   ```

### 📝 批量导入示例 / Bulk Import Examples:

```
Lotus MCH | Hot
Ethiocare Medical Center | Warm
Rubira Medical Center | Cold
St. Mary Hospital | Hot
Royal Care Clinic | Warm
```

**支持的格式 / Supported formats:**
- `医院名称 | Hot` (竖线分隔 / Pipe separator)
- `医院名称    Hot` (多个空格 / Multiple spaces)
- `医院名称	Hot` (Tab 键 / Tab key)

**支持的值 / Supported values:**
- Hot / hot / 热 / HOT → 🔥 热门客户
- Warm / warm / 温 / WARM → 🌤️ 温暖客户
- Cold / cold / 冷 / COLD → ❄️ 冷淡客户

---

## 3️⃣ 拜访报告列表 / Visit Reports List (View & Filter)

**位置 / Location:** 📋 **拜访报告** 标签 / **Visit Reports** tab

### 功能 A: 筛选器 / Filter Dropdown

**在顶部搜索栏旁边 / Next to search bar at top:**

```
┌───────────────────────────────────────────────┐
│ 🔍 Search...  [Salesperson ▼] [Potential ▼]  │
└───────────────────────────────────────────────┘
```

**点击下拉菜单 / Click dropdown:**
```
🌡️ 客户潜力 / Customer Potential ▼

Options:
- 🌡️ 全部潜力 / All Potential
- 🔥 热门客户 / Hot Customers
- 🌤️ 温暖客户 / Warm Customers
- ❄️ 冷淡客户 / Cold Customers
```

### 功能 B: 统计栏 / Statistics Bar (可点击！/ Clickable!)

**在搜索栏下方 / Below search bar:**

```
┌─────────────────────────────────────────────────────┐
│ 🔥 20 Hot  |  🌤️ 48 Warm  |  ❄️ 58 Cold           │
│  (点击可筛选 / Click to filter)                     │
└─────────────────────────────────────────────────────┘
```

**点击任何统计框可立即筛选！/ Click any stat box to filter instantly!**

### 功能 C: 报告卡片上的徽章 / Badge on Report Cards

**每条报告显示潜力徽章 / Each report shows potential badge:**

```
┌──────────────────────────────────────────┐
│ 📍 Lotus MCH                       🔥 热门│
│ 👤 Ephrata Tekola                        │
│ 📅 2026-06-29                            │
└──────────────────────────────────────────┘
```

**颜色编码 / Color coding:**
- 🔥 **热门 / Hot** - 红色 (Red)
- 🌤️ **温暖 / Warm** - 黄色 (Yellow)
- ❄️ **冷淡 / Cold** - 蓝色 (Blue)

---

## 4️⃣ 报告详情弹窗 / Report Detail Modal

**位置 / Location:** 点击任何报告卡片 / Click any report card

### 在哪里显示 / Where it appears:

**在弹窗顶部，医院名称下方 / At top of modal, below hospital name:**

```
┌─────────────────────────────────────────────┐
│  Lotus MCH                           [✕]    │
│                                             │
│  🔥 热门客户  👤 Ephrata Tekola  📅 2026-06-29│
│                                             │
│  ═══════════════════════════════════════    │
│                                             │
│  📋 基本信息 / Basic Info                    │
│  ...                                        │
└─────────────────────────────────────────────┘
```

**显示完整标签 / Shows full label:**
- 🔥 热门客户 / Hot Customer
- 🌤️ 温暖客户 / Warm Customer
- ❄️ 冷淡客户 / Cold Customer

---

## 5️⃣ Excel 导出 / Excel Export

**位置 / Location:** 📋 **拜访报告** 标签 → 📥 **导出到Excel** 按钮

### 在 Excel 中的位置 / Location in Excel:

**列位置 / Column position:**
- 第 **69 列** / Column **69**
- 列标题 / Column header: `🌡️ 客户潜力 / Potential`

**在 Excel 中的显示 / Display in Excel:**
```
| ... | 客户类别 | 🌡️ 客户潜力 | 拜访进展 | ...
| ... | Category | Potential    | Progress | ...
| ... | ...      | Hot          | ...      | ...
| ... | ...      | Warm         | ...      | ...
| ... | ...      | Cold         | ...      | ...
```

---

## 📊 使用场景示例 / Usage Scenarios

### 场景 1: 录入新的拜访记录
### Scenario 1: Record New Visit

1. 去 **拜访登记** 标签
2. 填写表单
3. 在底部选择客户潜力: Hot/Warm/Cold
4. 提交

### 场景 2: 批量导入历史数据
### Scenario 2: Bulk Import Historical Data

1. 去 **拜访登记** 标签
2. 点击 **批量导入**
3. 粘贴数据格式: `医院名称 | Hot`
4. 导入

### 场景 3: 查看所有热门客户
### Scenario 3: View All Hot Customers

**方法 A / Method A:**
1. 去 **拜访报告** 标签
2. 点击统计栏中的 **🔥 20 Hot**
3. 立即筛选显示所有热门客户

**方法 B / Method B:**
1. 去 **拜访报告** 标签
2. 从下拉菜单选择 **🔥 热门客户**
3. 查看结果

### 场景 4: 更新客户潜力
### Scenario 4: Update Customer Potential

1. 去 **拜访报告** 标签
2. 找到要更新的记录
3. 点击卡片打开详情
4. 点击 **✏️ 编辑** 按钮
5. 修改客户潜力下拉菜单
6. 保存

---

## 🎨 视觉识别 / Visual Identification

### 如何快速识别客户潜力？/ How to quickly identify customer potential?

**通过颜色 / By color:**

| 潜力 / Potential | 颜色 / Color | 图标 / Icon | 文字 / Text |
|-----------------|-------------|------------|------------|
| Hot             | 🔴 红色 (Red)  | 🔥         | 热门 / Hot  |
| Warm            | 🟡 黄色 (Yellow) | 🌤️         | 温暖 / Warm |
| Cold            | 🔵 蓝色 (Blue) | ❄️         | 冷淡 / Cold |

**在界面上 / On the interface:**
- **报告卡片右上角** / Top-right of report cards
- **弹窗标题下方** / Below modal title
- **统计栏中** / In statistics bar

---

## ✅ 快速测试 / Quick Test

### 测试客户潜力功能是否正常工作:
### Test if Customer Potential is working:

1. **登录系统** / Login:
   - 网址 / URL: https://dancing-pudding-81ccb5.netlify.app/
   - 用户 / User: Ephrata Tekola
   - 密码 / Password: Ephrata

2. **使用批量导入** / Use bulk import:
   ```
   Test Hot Hospital | Hot
   Test Warm Hospital | Warm
   Test Cold Hospital | Cold
   ```

3. **去拜访报告标签** / Go to Visit Reports tab

4. **检查 / Check:**
   - ✅ 统计栏显示: 1 Hot, 1 Warm, 1 Cold
   - ✅ 可以点击统计框筛选
   - ✅ 每条记录显示彩色徽章
   - ✅ 可以从下拉菜单筛选

5. **如果看到以上内容，功能正常！✅**

---

## ❓ 常见问题 / FAQ

### Q1: 我可以不选择客户潜力吗？
### Q1: Can I skip Customer Potential?

**A:** 不可以！这是必填字段。如果您使用表单提交，必须选择。
**A:** No! This is a required field. If using the form, you must select.

### Q2: 我可以稍后更改客户潜力吗？
### Q2: Can I change Customer Potential later?

**A:** 可以！点击报告卡片 → 点击编辑按钮 → 更改下拉菜单 → 保存。
**A:** Yes! Click report card → Click edit button → Change dropdown → Save.

### Q3: 批量导入时必须包含客户潜力吗？
### Q3: Must I include Customer Potential in bulk import?

**A:** 是的！格式必须是: `医院名称 | Hot/Warm/Cold`
**A:** Yes! Format must be: `Hospital Name | Hot/Warm/Cold`

### Q4: 客户潜力会显示在 Excel 导出中吗？
### Q4: Does Customer Potential appear in Excel export?

**A:** 会！在第 69 列，标题是 "🌡️ 客户潜力 / Potential"
**A:** Yes! In column 69, header is "🌡️ 客户潜力 / Potential"

### Q5: 所有业务员都能看到客户潜力吗？
### Q5: Can all salespeople see Customer Potential?

**A:** 可以！客户潜力对所有登录用户可见。这是老板要求的功能。
**A:** Yes! Customer Potential is visible to all logged-in users. This is the boss's requirement.

---

## 📱 截图示例位置 / Screenshot Example Locations

如果您需要截图演示，请拍摄以下屏幕:
If you need screenshots for demonstration, capture these screens:

1. **拜访登记表单** - 向下滚动到底部显示客户潜力下拉菜单
2. **批量导入面板** - 显示数据输入格式
3. **拜访报告列表** - 显示统计栏和筛选器
4. **报告卡片** - 显示右上角的潜力徽章
5. **报告详情弹窗** - 显示标题下方的徽章

---

**需要更多帮助？告诉我您在哪个屏幕，我会给您具体指导！**
**Need more help? Tell me which screen you're on and I'll give you specific guidance!**

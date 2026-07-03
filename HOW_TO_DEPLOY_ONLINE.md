# 🌐 How to Deploy Your Project Online / 如何在线部署您的项目

## Why Deploy Online? / 为什么要在线部署？

Currently, you can only open `index.html` on your computer. To access from:
- 📱 Your phone / 您的手机
- 💻 Other computers / 其他电脑
- 🌍 Anywhere with internet / 任何有互联网的地方

You need to host it online!
您需要在线托管它！

---

## 🚀 Option 1: Netlify Drop (Easiest - No Code!)

### Steps / 步骤:

1. **Go to** / **访问**: https://app.netlify.com/drop

2. **Drag these files** into the drop zone / **将这些文件**拖到放置区:
   - ✅ `index.html`
   - ✅ `appsscript.gs` (optional, just for backup)

3. **Wait** 10 seconds / **等待**10秒

4. **Done!** You'll get a URL like:
   ```
   https://random-name-12345.netlify.app
   ```

5. **Access from anywhere!** / **从任何地方访问！**
   - Open this URL on your phone / 在手机上打开此网址
   - Share with your team / 与您的团队分享
   - Bookmark it / 将其加入书签

### Custom Domain (Optional) / 自定义域名（可选）:

You can change `random-name-12345` to something like:
- `fremenatos-crm.netlify.app`
- `hospital-visits.netlify.app`

Just click "Site settings" > "Change site name" in Netlify dashboard.

---

## 🔗 Option 2: GitHub Pages (Free Forever)

### Steps / 步骤:

1. **Create GitHub account** / **创建GitHub账户**:
   - Go to: https://github.com
   - Sign up (free)

2. **Create new repository** / **创建新仓库**:
   - Click: New repository
   - Name: `hospital-list`
   - Public
   - Create

3. **Upload files** / **上传文件**:
   - Click: "uploading an existing file"
   - Drag `index.html`
   - Commit changes

4. **Enable GitHub Pages** / **启用GitHub Pages**:
   - Go to: Settings > Pages
   - Source: main branch
   - Save

5. **Your URL will be** / **您的网址将是**:
   ```
   https://YOUR_USERNAME.github.io/hospital-list/
   ```

---

## 📱 Option 3: Google Drive (Quick & Simple)

### Steps / 步骤:

1. Upload `index.html` to Google Drive / 上传`index.html`到Google云端硬盘
2. Right-click > Share / 右键单击>共享
3. Change to "Anyone with the link" / 更改为"任何拥有链接的人"
4. Get shareable link / 获取可共享链接

⚠️ **Note**: This shows the HTML code, not the rendered page. Not recommended for this use case.

不推荐用于此用例。

---

## 🎯 Recommended: Use Netlify

**Why?** / **为什么？**
- ✅ Free forever / 永久免费
- ✅ Takes 30 seconds / 只需30秒
- ✅ No account needed for "Drop" / "Drop"无需账户
- ✅ HTTPS enabled / 启用HTTPS
- ✅ Fast CDN / 快速CDN
- ✅ Auto-updates (if you use Git) / 自动更新（如果使用Git）

---

## 📲 After Deploying

Once online, you can:

部署后，您可以：

1. **Access from phone** / **从手机访问**:
   - Open browser on phone / 在手机上打开浏览器
   - Type your Netlify URL / 输入您的Netlify网址
   - Add to home screen! / 添加到主屏幕！

2. **Share with team** / **与团队分享**:
   - Send URL to Ephrata, Kalkidan, Tizita / 将网址发送给Ephrata、Kalkidan、Tizita
   - They can log in and submit reports / 他们可以登录并提交报告

3. **Add to home screen (Mobile)** / **添加到主屏幕（移动设备）**:
   - iPhone: Safari > Share > Add to Home Screen
   - Android: Chrome > Menu (⋮) > Add to Home screen
   
   Now it looks like a real app! / 现在它看起来像一个真正的应用程序！

---

## 🔄 How to Update

### If using Netlify Drop:
- Just drag the new `index.html` to the same site
- It will update automatically / 它会自动更新

### If using GitHub Pages:
- Upload the new `index.html` to your repo
- Changes appear in 1-2 minutes / 更改将在1-2分钟内显示

---

## 🔐 Security Note / 安全提示

Your Web App URL (from Google Apps Script) should still be kept private!

您的网络应用网址（来自Google应用脚本）仍应保密！

The `SCRIPT_URL` in your code is visible to anyone, but they can only:
- ✅ Submit reports (if they know the password) / 提交报告（如果他们知道密码）
- ✅ View reports / 查看报告

To add more security, we can:
- Add IP restrictions / 添加IP限制
- Add API key authentication / 添加API密钥身份验证
- Use Firebase Authentication / 使用Firebase身份验证

(Ask me if you need this!)

---

## 🎉 Quick Start

**Try this NOW** / **现在试试**:

1. Go to: https://app.netlify.com/drop
2. Drag your `index.html` file
3. Wait 10 seconds
4. Copy the URL
5. Open it on your phone!

Takes less than 1 minute! 🚀
只需不到1分钟！🚀


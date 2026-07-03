# 🔄 How to Update Your Netlify Site / 如何更新您的Netlify网站

Your site: **https://dancing-pudding-81ccb5.netlify.app/**

---

## ✅ Method 1: Netlify Dashboard (Recommended)

### Steps / 步骤:

1. **Go to** / **访问**: https://app.netlify.com

2. **Log in** / **登录**:
   - Use the account you created
   - Or create a free account

3. **Find your site** / **找到您的网站**:
   - Look for: "dancing-pudding-81ccb5"
   - Click on it

4. **Update the site** / **更新网站**:
   - Click "Deploys" tab / 点击"部署"标签
   - Scroll down to "Need to update your site?"
   - **Drag and drop** your updated `index.html` file
   - Or click "Browse to upload"

5. **Wait 10-30 seconds** / **等待10-30秒**

6. **Done!** / **完成！**
   - Visit: https://dancing-pudding-81ccb5.netlify.app/
   - Clear browser cache (Ctrl+Shift+R) to see changes
   - 清除浏览器缓存（Ctrl+Shift+R）以查看更改

---

## 🎯 Method 2: Netlify CLI (For Power Users)

Install once, update anytime from command line!

### Installation / 安装:

```bash
npm install -g netlify-cli
```

### Link Your Site / 链接您的网站:

```bash
cd "c:\Users\user\Desktop\hospital list"
netlify link
```

Select: "dancing-pudding-81ccb5"

### Deploy Updates / 部署更新:

```bash
netlify deploy --prod
```

**That's it!** / **就这样！**

---

## 📱 Method 3: Netlify Drop (Creates NEW Site)

⚠️ **Warning**: This creates a NEW site with a different URL!

1. Go to: https://app.netlify.com/drop
2. Drag `index.html`
3. You get a NEW URL (not dancing-pudding)

**Not recommended** if you want to keep the same URL!

**不推荐**如果您想保持相同的网址！

---

## 🔗 Method 4: Connect to Git (Best for Teams)

### Why? / 为什么？
- ✅ Auto-deploy when you push changes / 推送更改时自动部署
- ✅ Version history / 版本历史
- ✅ Easy rollback / 轻松回滚
- ✅ Team collaboration / 团队协作

### Steps / 步骤:

1. **Create GitHub repository** / **创建GitHub仓库**:
   - Go to: https://github.com/new
   - Name: `hospital-list`
   - Create repository

2. **Upload your files to GitHub** / **上传文件到GitHub**:
   ```bash
   cd "c:\Users\user\Desktop\hospital list"
   git init
   git add index.html appsscript.gs
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/hospital-list.git
   git push -u origin main
   ```

3. **Connect Netlify to GitHub** / **连接Netlify到GitHub**:
   - Go to Netlify dashboard
   - Site settings > Build & deploy
   - Link repository
   - Choose: `hospital-list`

4. **Now, every time you push to GitHub, Netlify auto-updates!** 🚀
   **现在，每次推送到GitHub，Netlify都会自动更新！** 🚀

---

## 🆕 What Updates Have You Made?

To help you deploy the latest version, tell me what changes you've made:

- ✅ Did you complete Google Sheets setup?
- ✅ Do you have the new Sheet ID and Web App URL?
- ✅ Should I update the code to use Google Sheets now?

---

## 🎨 Rename Your Site (Optional)

Change `dancing-pudding-81ccb5` to something better!

### Steps:

1. Go to Netlify dashboard
2. Click on your site
3. Site settings
4. Click "Change site name"
5. Enter new name, like:
   - `fremenatos-crm`
   - `hospital-visits`
   - `visit-reports-ethiopia`

Your new URL will be:
```
https://YOUR-NEW-NAME.netlify.app/
```

---

## 🔄 Quick Update Checklist

Every time you make changes to `index.html`:

- [ ] Save the file / 保存文件
- [ ] Go to Netlify dashboard / 前往Netlify仪表板
- [ ] Drag & drop updated file / 拖放更新文件
- [ ] Wait for deployment / 等待部署
- [ ] Clear browser cache (Ctrl+Shift+R) / 清除浏览器缓存
- [ ] Test on your devices / 在您的设备上测试

---

## 💡 Pro Tips

### Clear Cache / 清除缓存:
- **Chrome/Firefox**: Ctrl + Shift + R
- **Safari**: Cmd + Shift + R
- **Mobile**: Clear browser data

### Test Before Deploy / 部署前测试:
1. Test locally (double-click index.html)
2. Make sure everything works
3. Then deploy to Netlify

### Keep Backups / 保留备份:
- Save old versions of index.html
- Name them: `index_backup_2026-06-27.html`
- Just in case you need to rollback

---

## 🚨 Troubleshooting / 故障排除

**Problem: Changes not showing**
- Solution: Clear browser cache (Ctrl+Shift+R)
- 解决方案：清除浏览器缓存

**Problem: "Deployment failed"**
- Check file size (should be < 10MB)
- Make sure file is valid HTML
- Try again in 5 minutes

**Problem: Old version still showing**
- Wait 1-2 minutes for CDN to update
- Clear cache
- Try incognito/private mode

---

## 📞 Need Help?

Just ask me:
- "How do I log into Netlify?"
- "Where is the Deploys tab?"
- "How do I clear my cache?"
- "Can you update the code for me?"

I'm here to help! 我在这里帮助您！


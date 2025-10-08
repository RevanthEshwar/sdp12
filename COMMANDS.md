# 🎯 Property Value Enhancer - Command Reference

## 🚀 Essential Commands

### Install Dependencies
```bash
npm install
```
**What it does**: Downloads all required packages (React, Vite, Tailwind, etc.)  
**When to use**: First time setup, or after pulling code changes  
**Time**: ~1-2 minutes

---

### Start Development Server
```bash
npm run dev
```
**What it does**: Starts local dev server with hot reload  
**URL**: http://localhost:5173  
**When to use**: Every time you want to work on the project  
**Press**: `Ctrl + C` to stop

---

### Build for Production
```bash
npm run build
```
**What it does**: Creates optimized production bundle in `/dist` folder  
**When to use**: Before deploying to production  
**Output**: Static files ready for hosting

---

### Preview Production Build
```bash
npm run preview
```
**What it does**: Previews the production build locally  
**When to use**: After building, to test production version  
**URL**: http://localhost:4173

---

## 🛠️ Troubleshooting Commands

### Clear Node Modules (if issues)
```bash
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### Clear Browser Data
Open browser console (F12) and run:
```javascript
localStorage.clear()
```
Then refresh the page.

### Check Node/NPM Version
```bash
node --version
npm --version
```
**Required**: Node 16+ and npm 7+

---

## 📦 Package Management

### Add New Package
```bash
npm install package-name
```

### Add Dev Package
```bash
npm install -D package-name
```

### Remove Package
```bash
npm uninstall package-name
```

### Update All Packages
```bash
npm update
```

---

## 🔧 PowerShell Setup (Windows)

If you get "scripts disabled" error:

### Option 1: Enable for Current User (Recommended)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Option 2: Bypass for Single Command
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

---

## 🌐 Deployment Commands

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Deploy to GitHub Pages
```bash
npm run build
# Then push /dist folder to gh-pages branch
```

---

## 🧹 Cleanup Commands

### Remove Build Files
```bash
Remove-Item -Recurse -Force dist
```

### Remove Node Modules
```bash
Remove-Item -Recurse -Force node_modules
```

### Full Clean Install
```bash
Remove-Item -Recurse -Force node_modules, dist, package-lock.json
npm install
```

---

## 📊 Useful NPM Scripts

Current scripts in `package.json`:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run linter (placeholder) |

---

## 🔍 Debugging Commands

### Check Port Usage
```bash
netstat -ano | findstr :5173
```

### Kill Process on Port
```bash
# Find PID from above command, then:
taskkill /PID <PID> /F
```

### View Vite Config
```bash
cat vite.config.js
```

### View Package Info
```bash
npm list
npm list --depth=0
```

---

## 🎨 Development Workflow

### Typical Session
```bash
# 1. Navigate to project
cd c:\Users\lenovo\OneDrive\Desktop\project

# 2. Start dev server
npm run dev

# 3. Make changes in code editor
# 4. Browser auto-refreshes

# 5. When done, stop server
# Press Ctrl + C
```

### Before Committing
```bash
# 1. Build to check for errors
npm run build

# 2. Preview build
npm run preview

# 3. Test in browser

# 4. Commit changes
git add .
git commit -m "Your message"
git push
```

---

## 🚨 Common Issues & Fixes

### Issue: "Cannot find module"
```bash
npm install
```

### Issue: "Port already in use"
```bash
# Vite will auto-assign another port
# Or kill the process using the port
```

### Issue: "EACCES permission error"
```bash
# Run PowerShell as Administrator
# Or use: npm install --unsafe-perm
```

### Issue: "Stale data in browser"
```javascript
// In browser console:
localStorage.clear()
// Then refresh
```

### Issue: "Tailwind styles not working"
```bash
# Check if PostCSS is installed
npm list postcss tailwindcss autoprefixer

# Reinstall if needed
npm install -D tailwindcss postcss autoprefixer
```

---

## 📱 Browser DevTools

### Open Console
- **Windows/Linux**: `F12` or `Ctrl + Shift + I`
- **Mac**: `Cmd + Option + I`

### Useful Console Commands
```javascript
// Clear localStorage
localStorage.clear()

// View all localStorage data
console.log(localStorage)

// View specific item
console.log(localStorage.getItem('pve:form'))

// Set item manually
localStorage.setItem('pve:form', JSON.stringify({...}))
```

---

## 🎯 Quick Reference Card

```
┌─────────────────────────────────────────┐
│  PROPERTY VALUE ENHANCER - QUICK REF    │
├─────────────────────────────────────────┤
│  Install:     npm install               │
│  Run:         npm run dev               │
│  Build:       npm run build             │
│  Preview:     npm run preview           │
│  Stop:        Ctrl + C                  │
│  Clear Data:  localStorage.clear()      │
└─────────────────────────────────────────┘
```

---

**Pro Tip**: Keep the dev server running while coding. Vite's hot module replacement (HMR) will instantly reflect your changes in the browser! 🔥

---

**Last Updated**: 2025-10-08

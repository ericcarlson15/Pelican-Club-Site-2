# Build Instructions for PelicanClubOS

## The Problem
You're getting an error because npm is looking for `package.json` in your home directory instead of in the project directory.

## Solution: Navigate to Your Project Directory First

### Step 1: Open Terminal and Navigate to Your Project

```bash
# Replace 'pelican-club-os' with your actual project folder name
cd ~/Desktop/pelican-club-os

# Or if your project is in a different location:
cd /path/to/your/project
```

**How to find your project path:**
- In Finder, locate your project folder
- Drag the folder into Terminal - it will show the full path
- Or right-click the folder, hold Option, and select "Copy as Pathname"

### Step 2: Verify You're in the Right Directory

```bash
# This should show your package.json file
ls -la

# You should see files like:
# - package.json
# - vite.config.ts
# - tsconfig.json
# - index.html
```

### Step 3: Install Dependencies

```bash
npm install
```

This will create a `node_modules` folder with all the required packages.

### Step 4: Build the Project

```bash
npm run build
```

This will create a `dist` folder with your production-ready files.

### Step 5: Test Locally (Optional)

```bash
npm run preview
```

This lets you test the built version locally before deploying.

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI (From Terminal)

```bash
# Install Vercel CLI globally (only need to do this once)
npm install -g vercel

# Make sure you're in your project directory
cd /path/to/your/project

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 2: Deploy via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   # Make sure you're in your project directory!
   cd /path/to/your/project
   
   git add .
   git commit -m "Add build configuration files"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings:
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`
   - Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. **Build locally first:**
   ```bash
   cd /path/to/your/project
   npm install
   npm run build
   ```

2. **Upload the dist folder:**
   - Go to https://vercel.com
   - Drag and drop the `dist` folder directly onto Vercel

## Troubleshooting

### Error: "Cannot find module 'package.json'"
- **Cause:** You're in the wrong directory
- **Fix:** Use `cd` to navigate to your project folder first

### Error: "Command 'npm' not found"
- **Cause:** Node.js is not installed
- **Fix:** Install Node.js from https://nodejs.org

### Error: "Permission denied"
- **Cause:** Insufficient permissions
- **Fix:** Try `sudo npm install` (use with caution)

### Build succeeds but no dist folder
- **Check:** Make sure the build actually completed without errors
- **Fix:** Delete `node_modules` and `package-lock.json`, then run `npm install` again

### TypeScript errors during build
- **Check:** Your `tsconfig.json` is properly configured
- **Fix:** Run `npm install typescript @types/react @types/react-dom`

## Quick Reference

```bash
# Complete deployment workflow:
cd /path/to/your/project        # Navigate to project
npm install                      # Install dependencies
npm run build                    # Build for production
npm run preview                  # Test locally (optional)
vercel --prod                    # Deploy to Vercel

# Or just push to GitHub and let Vercel auto-deploy:
cd /path/to/your/project
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Current Project Structure

Your project should have these files in the root directory:
- ✅ package.json (npm configuration)
- ✅ vite.config.ts (Vite build settings)
- ✅ tsconfig.json (TypeScript configuration)
- ✅ vercel.json (Vercel deployment settings)
- ✅ index.html (HTML entry point)
- ✅ App.tsx (Main React component)

After running `npm install`, you'll also have:
- node_modules/ (dependencies)
- package-lock.json (locked dependency versions)

After running `npm run build`, you'll have:
- dist/ (production build - this is what gets deployed)

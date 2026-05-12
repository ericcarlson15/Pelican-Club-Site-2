# Deployment Guide for Pelican Club OS

## ⚠️ IMPORTANT - Build Files Added!

Your project now includes all necessary build configuration files:
- `package.json` - Dependencies and build scripts
- `vite.config.ts` - Vite bundler configuration
- `tsconfig.json` - TypeScript configuration
- `index.html` - Entry HTML file
- `src/main.tsx` - React entry point
- `netlify.toml` - Netlify configuration

**You MUST push these new files to GitHub before deploying!**

---

## Quick Start - Netlify (Recommended)

### Steps:

1. **Push ALL new files to GitHub**
   
   a. Go to your GitHub repository
   
   b. Click "Add file" → "Upload files"
   
   c. Drag and drop these new files:
      - `package.json`
      - `vite.config.ts`
      - `tsconfig.json`
      - `tsconfig.node.json`
      - `index.html`
      - `netlify.toml`
      - The entire `src` folder (contains main.tsx)
   
   d. Scroll down and click "Commit changes"

2. **Deploy to Netlify**
   
   a. Go to [netlify.com](https://netlify.com)
   
   b. Click "Sign up" → Choose "GitHub" (easiest option)
   
   c. Authorize Netlify to access your GitHub
   
   d. Click "Add new site" → "Import an existing project"
   
   e. Click "Deploy with GitHub"
   
   f. Find and select your repository (e.g., "pelican-club-site")
   
   g. **Build settings:**
      - **Build command:** `npm install && npm run build`
      - **Publish directory:** `dist`
      - **Base directory:** (leave blank)
   
   h. Click "Deploy site"
   
   i. **Wait 3-5 minutes** - You can watch the build log
   
   j. Once complete, your site will be live! 🎉
      - URL will be something like: `https://random-name-123456.netlify.app`
   
   k. **Customize your URL:**
      - Go to Site settings → Domain management → Options
      - Click "Edit site name"
      - Change to something like: `pelican-club-os`
      - Your new URL: `https://pelican-club-os.netlify.app`

✅ **This should work perfectly!**

---

## Alternative - Vercel

If you prefer Vercel:

1. **Push all files to GitHub** (including updated `vercel.json`)

2. Go to [vercel.com](https://vercel.com) → Sign up with GitHub

3. Click "Add New" → "Project"

4. Select your repository

5. **Configure settings:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. Click "Deploy"

7. If you get "No Output Directory named 'dist' found" error:
   - Go to Project Settings → General → Build & Development Settings
   - Click "Override" on Output Directory
   - Enter: `dist`
   - Save and redeploy

8. Wait for build to complete

---

## Troubleshooting

### Build fails with "dist not found" or "command not found"
**Solution:** Make sure you uploaded ALL the new build files to GitHub:
- package.json
- vite.config.ts
- tsconfig.json
- index.html
- src/main.tsx

### Site deploys but shows blank page
**Solution:** Check the build logs for errors. Most common issues:
- Missing image files (make sure all images are uploaded)
- Missing audio files (make sure .mp3 files are uploaded)
- Incorrect file paths (check that all imports use correct paths)

### Build fails with dependency errors
**Solution:** In Netlify/Vercel settings, make sure build command is:
```
npm install && npm run build
```
Not just `npm run build`

### Site works on desktop but not mobile
The site should automatically detect mobile and switch to mobile layout. If it doesn't:
- Clear your browser cache
- Try in incognito/private mode
- Make sure all files were uploaded correctly

---

## Adding Your Soda Can Favicon

1. Save your soda can icon as `soda-can-icon.png`
2. Upload it to the `/public` folder in your GitHub repo
3. The site will automatically use it as the favicon

---

## Updating Your Site

When you want to make changes:

1. Make changes in Figma Make
2. Export the updated files
3. Upload the changed files to GitHub (same process as before)
4. Netlify/Vercel will automatically rebuild and deploy!

---

## Custom Domain (Optional)

Want to use your own domain like `pelicanclub.com`?

### On Netlify:
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to update your domain's DNS settings
4. Usually takes 24-48 hours to activate

### On Vercel:
1. Go to Project settings → Domains
2. Click "Add"
3. Enter your domain
4. Follow DNS configuration instructions

---

## Need Help?

Common issues and solutions:

**Q: Build is taking forever**
A: First build can take 3-5 minutes. Be patient!

**Q: Got an error about "patch-package"**
A: Make sure you uploaded `package.json` and it contains the scripts section

**Q: Site shows 404**
A: Make sure the publish directory is set to `dist` (not `build` or `public`)

**Q: Images aren't loading**
A: Make sure you uploaded all image files to GitHub. Check the exact file paths in your code.

**Q: Audio player isn't working**
A: Make sure all .mp3 files are uploaded. Check browser console for errors.

---

## Success Checklist

Before deploying, make sure you have:

- ✅ All source files uploaded to GitHub
- ✅ ALL new build configuration files uploaded (package.json, vite.config.ts, etc.)
- ✅ All images and audio files uploaded
- ✅ Build command set to: `npm install && npm run build`
- ✅ Publish directory set to: `dist`
- ✅ Waited 3-5 minutes for initial build

Once these are all checked, your site should deploy successfully! 🚀

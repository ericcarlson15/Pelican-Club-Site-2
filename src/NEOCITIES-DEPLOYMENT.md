# Neocities Deployment Guide

Neocities requires you to upload pre-built static files. Here's how to build and deploy your site.

---

## Step 1: Install Node.js (if you haven't already)

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS version** (recommended for most users)
3. Run the installer and follow the prompts
4. Verify installation:
   - Open Terminal (Mac) or Command Prompt (Windows)
   - Type: `node --version`
   - You should see something like `v18.17.0`

---

## Step 2: Download Your Project Files

1. Go to your GitHub repository
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Unzip the folder somewhere on your computer (like your Desktop)

---

## Step 3: Build the Dist Folder

### On Mac:

1. Open **Terminal**
2. Navigate to your project folder:
   ```bash
   cd ~/Desktop/pelican-club-site
   ```
   (Replace `pelican-club-site` with your actual folder name)

3. Install dependencies:
   ```bash
   npm install
   ```
   (This will take 2-3 minutes)

4. Build the site:
   ```bash
   npm run build
   ```
   (This creates the `dist` folder with all your site files)

### On Windows:

1. Open **Command Prompt** or **PowerShell**
2. Navigate to your project folder:
   ```cmd
   cd C:\Users\YourName\Desktop\pelican-club-site
   ```
   (Replace with your actual path)

3. Install dependencies:
   ```cmd
   npm install
   ```
   (This will take 2-3 minutes)

4. Build the site:
   ```cmd
   npm run build
   ```
   (This creates the `dist` folder)

---

## Step 4: Verify the Dist Folder

After running `npm run build`, you should see a new **`dist`** folder in your project directory containing:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [various image and audio files]
└── [other files]
```

This `dist` folder contains your complete website ready to upload!

---

## Step 5: Upload to Neocities

### Method 1: Web Upload (Easiest)

1. Log into [neocities.org](https://neocities.org)
2. Go to your site dashboard
3. Click **"Edit Site"**
4. **Delete all existing files** (if any) from Neocities
5. Open your `dist` folder on your computer
6. **Drag and drop ALL files from the dist folder** into the Neocities upload area
   - ⚠️ Important: Upload the FILES INSIDE the dist folder, not the dist folder itself
   - This includes: `index.html`, the `assets` folder, and any other files
7. Wait for all files to upload (may take a few minutes)
8. Click **"Save"** or wait for auto-save
9. Visit your site: `https://yourusername.neocities.org`

### Method 2: Neocities CLI (Advanced)

If you want to use command line:

1. Install Neocities CLI:
   ```bash
   npm install -g neocities
   ```

2. Login:
   ```bash
   neocities login
   ```

3. Upload your dist folder:
   ```bash
   neocities push dist
   ```

---

## Step 6: Verify Your Site Works

1. Visit `https://yourusername.neocities.org`
2. Check that:
   - ✅ All windows appear correctly
   - ✅ Dragging works
   - ✅ Audio player loads and plays music
   - ✅ YouTube videos load
   - ✅ All images display
   - ✅ Mobile version works on phone

---

## Common Issues & Solutions

### Issue: "Command not found: npm"
**Solution:** Node.js isn't installed. Go back to Step 1.

### Issue: "Cannot find module" errors during build
**Solution:** Run `npm install` again. Make sure you're in the correct folder.

### Issue: Build succeeds but dist folder is empty
**Solution:** Check for errors in the build output. Make sure all your image/audio files exist.

### Issue: Site loads but images/audio don't work
**Solution:** 
- Make sure ALL files in the `dist` folder were uploaded to Neocities
- Check that the `assets` folder uploaded completely
- Look for a `public` folder in your project and upload those files too

### Issue: Site works on desktop but not mobile
**Solution:** The mobile detection should work automatically. Try:
- Clearing browser cache
- Opening in private/incognito mode
- Check that all CSS files uploaded correctly

---

## Updating Your Site

When you make changes:

1. Make changes in your code
2. Run `npm run build` again
3. Upload the NEW `dist` folder contents to Neocities (replacing old files)
4. Your site will update instantly!

---

## Pro Tips

### Automated Deployment Script

Create a file called `deploy.sh` in your project root:

```bash
#!/bin/bash
echo "Building site..."
npm run build

echo "Deploying to Neocities..."
neocities push dist

echo "Done! Visit your site at https://yourusername.neocities.org"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Now you can deploy with one command:
```bash
./deploy.sh
```

### Keep Your Assets Organized

If you have custom images/audio:
1. Put them in a `public` folder in your project root
2. Vite will automatically copy them to `dist` during build
3. Reference them in your code with `/filename.png` or `/filename.mp3`

---

## File Size Limits

Neocities free accounts have limits:
- **1 GB** total storage
- **200 MB** per file

Your Pelican Club site should be well under these limits (probably 20-50 MB total).

If you hit limits:
- Compress images (use TinyPNG or similar)
- Compress audio files (use lower bitrate MP3s)
- Consider upgrading to Neocities Supporter ($5/month for unlimited storage)

---

## Success Checklist

Before deploying to Neocities:

- ✅ Node.js installed
- ✅ Project downloaded from GitHub
- ✅ `npm install` completed successfully
- ✅ `npm run build` completed successfully
- ✅ `dist` folder exists and contains files
- ✅ All files from `dist` folder uploaded to Neocities
- ✅ Site tested and working

Once these are all done, your site should be live! 🎉

---

## Need Help?

If you get stuck:

1. **Check the Terminal/Command Prompt output** - errors usually explain what's wrong
2. **Make sure you're in the right folder** - use `pwd` (Mac) or `cd` (Windows) to check
3. **Try deleting `node_modules` folder and running `npm install` again**
4. **Google the exact error message** - someone else has probably had the same issue

---

## Alternative: Use GitHub Pages Instead

If Neocities is too complicated, GitHub Pages is easier:

1. Push all your code to GitHub (including the build files)
2. Go to your repository Settings
3. Scroll to "Pages"
4. Source: Deploy from a branch
5. Branch: main / root
6. But you'll need to build and commit the `dist` folder to GitHub first

Or use Netlify/Vercel which build automatically (see main DEPLOYMENT.md)

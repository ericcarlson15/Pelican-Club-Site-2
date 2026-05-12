# Git Push Troubleshooting Guide

## Step 1: Check Where You Are

```bash
# Make sure you're in the project directory
pwd

# You should see something like: /Users/ericasellum/Desktop/pelican-club-os
# If you see just /Users/ericasellum, you need to cd into your project!
```

## Step 2: Check If Git Is Initialized

```bash
# Check if this is a git repository
git status

# If you get "not a git repository", run:
git init
```

## Step 3: Check Your Git Remote

```bash
# See if GitHub is connected
git remote -v

# You should see something like:
# origin  https://github.com/yourusername/pelican-club-os.git (fetch)
# origin  https://github.com/yourusername/pelican-club-os.git (push)
```

**If you see nothing, you need to add the remote:**
```bash
# Replace YOUR-USERNAME and YOUR-REPO with your actual GitHub info
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

**If the URL is wrong, update it:**
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

## Step 4: Check What Branch You're On

```bash
# See your current branch
git branch

# If you're on 'master' but GitHub uses 'main', rename it:
git branch -M main
```

## Common Errors & Solutions

### ❌ Error: "not a git repository"

**Solution:**
```bash
cd /path/to/your/project
git init
git add .
git commit -m "Initial commit"
```

### ❌ Error: "Permission denied (publickey)"

**Solution 1 - Use HTTPS instead of SSH:**
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push origin main
```

**Solution 2 - GitHub will ask for username/password or token:**
- Username: your GitHub username
- Password: use a Personal Access Token (not your GitHub password!)

**To create a Personal Access Token:**
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Vercel Deploy"
4. Check the "repo" scope
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password when pushing

### ❌ Error: "failed to push some refs"

**Solution:**
```bash
# Pull first, then push
git pull origin main --rebase
git push origin main

# Or force push (use with caution!)
git push origin main --force
```

### ❌ Error: "No such remote 'origin'"

**Solution:**
```bash
# Add your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### ❌ Error: "Please tell me who you are"

**Solution:**
```bash
git config --global user.email "your.email@example.com"
git config --global user.name "Your Name"

# Then try committing again
git commit -m "Your message"
```

### ❌ Error: "src refspec main does not match any"

**Solution:**
```bash
# You need to make a commit first
git add .
git commit -m "Initial commit"
git push origin main
```

### ❌ Nothing happens / No error

**Check:**
```bash
# See what files are staged
git status

# If files are untracked (red), add them:
git add .

# If files are staged (green) but not committed:
git commit -m "Your commit message"

# Then push:
git push origin main
```

## Complete Fresh Start (If All Else Fails)

```bash
# 1. Navigate to your project
cd /path/to/your/project

# 2. Remove old git folder (CAREFUL!)
rm -rf .git

# 3. Start fresh
git init

# 4. Add your Git identity
git config --global user.email "your.email@example.com"
git config --global user.name "Your Name"

# 5. Add all files
git add .

# 6. Make first commit
git commit -m "Initial commit"

# 7. Add GitHub remote (use YOUR GitHub repo URL!)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# 8. Push to GitHub
git branch -M main
git push -u origin main
```

## How to Find Your GitHub Repository URL

1. Go to your repository on **GitHub.com**
2. Click the green **"Code"** button
3. Make sure **HTTPS** is selected (not SSH)
4. Copy the URL: `https://github.com/username/repo-name.git`

## Verify Push Worked

1. Go to your repository on GitHub.com
2. Refresh the page
3. You should see all your files there with the latest commit message

## Alternative: Use GitHub Desktop (Easiest!)

If Terminal is giving you too much trouble:

1. **Download:** https://desktop.github.com
2. **Open GitHub Desktop**
3. **Add repository:** File → Add Local Repository
4. **Select your project folder**
5. **Publish:** Click "Publish repository" button
6. **Done!** Way easier than command line!

## Still Not Working?

**Share this information:**
1. What exact error message you're getting (screenshot or copy/paste)
2. What command you ran
3. Output of: `git remote -v`
4. Output of: `git status`
5. Output of: `pwd` (to confirm you're in the right directory)

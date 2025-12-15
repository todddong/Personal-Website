# GitHub Repository Setup

Your code is ready to push! Follow these steps to create your GitHub repository.

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `personal-website` (or any name you prefer)
   - **Description**: "Personal website showcasing projects, skills, and achievements"
   - **Visibility**: Choose **Public** (recommended) or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
cd "/Users/todd/Desktop/personal website"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with the repository name you chose

## Step 3: Verify

1. Go to your repository on GitHub
2. You should see all your files there
3. Your README.md will display on the repository homepage

## Next Steps

After pushing to GitHub, you can:
- Deploy to Vercel (see `DEPLOYMENT.md`)
- Share your repository with others
- Continue making changes and pushing updates

## Making Future Updates

Whenever you make changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

---

**Your code is already committed locally and ready to push!**


# Deployment Guide

Deploy your personal website to Vercel (recommended for Next.js) in just a few steps!

## Prerequisites

1. **GitHub Account** - Your code needs to be in a Git repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free)

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub (github.com → New repository)

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will automatically detect Next.js
5. Click **"Deploy"**
6. Wait 2-3 minutes for deployment to complete
7. Your site will be live at `your-project-name.vercel.app`

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add your custom domain (e.g., `todddong.com`)
3. Follow Vercel's DNS instructions

---

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From your project directory:
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No**
- Project name? (Press Enter for default)
- Directory? (Press Enter for `./`)
- Override settings? **No**

### Step 4: Production Deploy

For production deployment:
```bash
vercel --prod
```

---

## Important Notes

### Media Files
- All files in `public/` folder are automatically deployed
- Make sure all your photos and videos are committed to Git
- Large video files (>100MB) may need optimization

### Environment Variables
- Currently, no environment variables are needed
- If you add any later, set them in Vercel dashboard → Settings → Environment Variables

### Build Settings
- Vercel automatically detects Next.js
- Build Command: `next build` (automatic)
- Output Directory: `.next` (automatic)
- Install Command: `npm install` (automatic)

### Automatic Deployments
- Every push to `main` branch automatically deploys
- Preview deployments are created for pull requests

---

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript compiles without errors: `npm run build`
- Check Vercel build logs for specific errors

### Images Not Loading
- Verify all images are in `public/media/` folder
- Check file names match exactly (case-sensitive)
- Ensure images are committed to Git

### Video Not Playing
- Large video files may need compression
- Consider using a CDN or video hosting service for very large files
- Check browser console for video loading errors

---

## Quick Deploy Checklist

- [ ] Code is pushed to GitHub
- [ ] All media files are in `public/media/` folder
- [ ] `npm run build` succeeds locally
- [ ] Vercel account created
- [ ] Repository imported in Vercel
- [ ] Deployment successful
- [ ] Site loads correctly at Vercel URL

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Vercel Support: https://vercel.com/support


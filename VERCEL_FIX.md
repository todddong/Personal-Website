# Fixing Vercel Deployment Issues

## Problem
Vercel is building commit `959c06f` (old) instead of `f10851e` (latest with fixes).
This means Vercel is connected to the WRONG repository or not pulling latest changes.

## Solution: Reconnect Vercel to Correct Repository

### Step 1: Delete the Old Vercel Project
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find project: `todddong-personal-website`
3. Go to **Settings** → Scroll to bottom → **Delete Project**
4. Confirm deletion

### Step 2: Create New Project with Correct Repository
1. Click **"Add New Project"** in Vercel dashboard
2. Import from GitHub
3. Search for: **`Personal-Website`** (capital P, capital W)
4. Select: **`todddong/Personal-Website`**
5. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
6. Click **"Deploy"**

### Step 3: Verify Connection
After deployment starts, check:
- **Source**: Should show latest commit `f10851e`
- **Repository**: Should show `todddong/Personal-Website`
- **Build**: Should succeed without ESLint errors

---

## Alternative: Temporary Workaround (Not Recommended)

If you can't reconnect, you can temporarily disable ESLint during build:

**Edit `next.config.js`:**
```js
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};
```

**⚠️ Warning**: This hides errors but doesn't fix them. Better to fix the repository connection.

---

## Verify Correct Repository

Your correct repository:
- **Name**: `Personal-Website`
- **URL**: `https://github.com/todddong/Personal-Website.git`
- **Latest Commit**: `f10851e` (has ESLint fixes)

Wrong repository Vercel might be using:
- **Name**: `todddong-personal-website` (lowercase, different name)


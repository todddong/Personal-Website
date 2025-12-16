# Step-by-Step: Delete and Recreate Vercel Project

Follow these steps exactly to fix your Vercel deployment.

---

## Part 1: Delete the Old Project

### Step 1: Go to Vercel Dashboard
1. Open [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. You should see your dashboard with projects

### Step 2: Find Your Project
1. Look for project named: **`todddong-personal-website`**
2. Click on the project name to open it

### Step 3: Delete the Project
1. Click **"Settings"** tab (top navigation)
2. Scroll all the way down to the bottom of the Settings page
3. Find the **"Danger Zone"** section (red/border warning area)
4. Click **"Delete Project"** button
5. Type the project name to confirm: `todddong-personal-website`
6. Click **"Delete"** to confirm
7. ✅ Project deleted

---

## Part 2: Create New Project with Correct Repository

### Step 4: Start New Project
1. In Vercel dashboard, click the **"Add New..."** button (top right)
2. Select **"Project"** from dropdown

### Step 5: Import from GitHub
1. You'll see a list of your GitHub repositories
2. **IMPORTANT**: Look for repository named: **`Personal-Website`** (capital P, capital W)
   - ✅ Correct: `Personal-Website`
   - ❌ Wrong: `todddong-personal-website` or `personal-website`
3. Click **"Import"** button next to `Personal-Website`

### Step 6: Configure Project Settings
You'll see a configuration screen. Verify these settings:

**Framework Preset:**
- Should auto-detect: **Next.js**
- If not, select **"Next.js"** from dropdown

**Root Directory:**
- Leave as: **`./`** (default)

**Build and Output Settings:**
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

**Environment Variables:**
- Leave empty (you don't need any)

### Step 7: Deploy
1. Click **"Deploy"** button (bottom right)
2. Wait for deployment to start (takes 30-60 seconds)
3. You'll see build logs in real-time

---

## Part 3: Verify Everything Works

### Step 8: Check Deployment Status
After clicking Deploy, you'll see:

**Build Logs:**
- Should show: `Running "npm run build"`
- Should show: `Skipping linting` (because we disabled ESLint)
- Should complete successfully ✅

**Commit Hash:**
- Should show latest commit: **`4a20f11`** or newer
- ❌ Should NOT show: `959c06f` (old commit)

**Repository:**
- Should show: **`todddong/Personal-Website`**
- ✅ Correct repository name

### Step 9: Access Your Site
Once deployment succeeds:
1. You'll see a **"Visit"** button or link
2. Your site will be live at: `todddong-personal-website.vercel.app` (or similar)
3. Click to view your deployed website!

---

## Troubleshooting

### If you don't see `Personal-Website` in the repository list:
1. Make sure you're signed in with the correct GitHub account
2. Check that the repository exists: [github.com/todddong/Personal-Website](https://github.com/todddong/Personal-Website)
3. Try refreshing the Vercel page
4. Make sure the repository is **Public** (or you've granted Vercel access)

### If build still fails:
1. Check the build logs for specific errors
2. Verify the commit hash matches your latest GitHub commit
3. Make sure `next.config.js` has `eslint: { ignoreDuringBuilds: true }`

### If you see the wrong repository:
- **DO NOT** proceed with deployment
- Go back and make sure you selected `Personal-Website` (capital P, capital W)
- Delete and start over if needed

---

## Quick Checklist

Before deploying, verify:
- [ ] Old project `todddong-personal-website` is deleted
- [ ] Selected repository: `Personal-Website` (capital P, capital W)
- [ ] Framework: Next.js (auto-detected)
- [ ] Latest commit hash shown (not `959c06f`)
- [ ] Build completes successfully

---

## After Successful Deployment

Your site will be live! You can:
- Share the Vercel URL
- Add a custom domain (Settings → Domains)
- Set up automatic deployments (every push to `main` branch)

**Future updates:** Just push to GitHub, Vercel will auto-deploy! 🚀



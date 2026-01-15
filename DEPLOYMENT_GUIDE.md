# 🚀 Complete Beginner's Deployment Guide - Refiners Team Website

**Last Updated:** January 2026

This guide assumes you know **NOTHING** about deployment. We'll walk through every single step together!

---

## 📋 Table of Contents

1. [Prerequisites - What You Need First](#prerequisites)
2. [Download & Setup Your Project](#download-setup)
3. [Set Up Supabase (Backend Database)](#setup-supabase)
4. [Deploy to Vercel (Make Website Live)](#deploy-vercel)
5. [Configure Your Website](#configure-website)
6. [Test Everything](#test-everything)
7. [Common Issues & Solutions](#common-issues)

---

## 🎯 Prerequisites

### What You Need Before Starting:

1. **A Computer** (Windows, Mac, or Linux)
2. **Internet Connection**
3. **Email Address** (for signing up)
4. **About 30-45 minutes of time**

### Step 1: Install Node.js

Node.js lets you run the website code on your computer.

#### For Windows:

1. Go to: https://nodejs.org/
2. Download the **LTS** version (left button - recommended)
3. Run the installer
4. Click "Next" through all the steps
5. ✅ Check "Automatically install necessary tools" if asked
6. Click "Install"
7. Wait for it to finish

#### For Mac:

1. Go to: https://nodejs.org/
2. Download the **LTS** version (left button)
3. Open the downloaded `.pkg` file
4. Click "Continue" through all steps
5. Click "Install"
6. Enter your Mac password if asked

#### For Linux (Ubuntu/Debian):

Open Terminal and run:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Verify Installation:

Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux) and type:

```bash
node --version
```

**Expected Output:**
```
v20.11.0
```
(or similar version number starting with v18, v20, or higher)

```bash
npm --version
```

**Expected Output:**
```
10.2.4
```
(or similar)

✅ If you see version numbers, Node.js is installed!

❌ If you see "command not found" or error, close and reopen your terminal, then try again.

---

### Step 2: Install Git

Git helps you manage code versions.

#### For Windows:

1. Go to: https://git-scm.com/download/win
2. Download will start automatically
3. Run the installer
4. Click "Next" through all steps (default options are fine)
5. **IMPORTANT**: When asked about "Adjusting your PATH environment", select "Git from the command line and also from 3rd-party software"
6. Click "Install"

#### For Mac:

Open Terminal and run:

```bash
xcode-select --install
```

Click "Install" when prompted.

#### For Linux:

```bash
sudo apt-get update
sudo apt-get install git
```

#### Verify Installation:

```bash
git --version
```

**Expected Output:**
```
git version 2.43.0
```
(or similar)

---

### Step 3: Install VS Code (Code Editor)

VS Code is where you'll edit your website code.

1. Go to: https://code.visualstudio.com/
2. Download for your operating system
3. Install (click through all the defaults)
4. Open VS Code

#### Install Important VS Code Extensions:

1. Open VS Code
2. Click the **Extensions** icon (4 squares on left sidebar, or press `Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search and install these:
   - **ES7+ React/Redux/React-Native snippets** (by dsznajder)
   - **Tailwind CSS IntelliSense** (by Tailwind Labs)
   - **ESLint** (by Microsoft)
   - **Prettier - Code formatter** (by Prettier)
   - **TypeScript Vue Plugin (Volar)** (optional but helpful)

This will fix most red lines you see in VS Code!

---

### Step 4: Create Accounts

You need these **free** accounts:

#### A. GitHub Account (for code storage)

1. Go to: https://github.com/signup
2. Enter your email
3. Create a password
4. Choose a username
5. Verify you're not a robot
6. Click "Create account"
7. Verify your email

#### B. Vercel Account (for hosting the website)

1. Go to: https://vercel.com/signup
2. Click "Continue with GitHub"
3. Log in to GitHub
4. Click "Authorize Vercel"

✅ Now Vercel can access your GitHub!

#### C. Supabase Account (for database)

1. Go to: https://supabase.com/dashboard/sign-up
2. Click "Continue with GitHub"
3. Authorize Supabase

✅ All accounts created!

---

## 📥 Download & Setup Your Project

### Step 1: Get the Code from Figma Make

Since you're in Figma Make, you need to export your project:

1. In Figma Make, look for an **Export** or **Download** button
2. Download the project as a ZIP file
3. Extract the ZIP to a folder (e.g., `C:\Projects\refiners-team` or `~/Projects/refiners-team`)

### Step 2: Open Project in VS Code

1. Open VS Code
2. Click **File** → **Open Folder**
3. Navigate to your extracted project folder
4. Click "Select Folder"

✅ You should see your project files in the left sidebar!

### Step 3: Open Terminal in VS Code

1. In VS Code, click **Terminal** → **New Terminal** (or press `` Ctrl+` ``)
2. A terminal appears at the bottom of VS Code

### Step 4: Install Project Dependencies

In the terminal, type:

```bash
npm install
```

**What this does:** Downloads all the code libraries your website needs.

**Expected Output:**
```
added 1247 packages in 45s
```

**This might take 2-5 minutes.** ☕ Grab a coffee!

#### If you see errors about "package.json not found":

```bash
# Make sure you're in the right folder
pwd   # (Mac/Linux) or dir (Windows) - shows current folder

# Navigate to project folder if needed
cd path/to/your/project
```

### Step 5: Fix TypeScript/ESLint Errors

Create a file called `.vscode/settings.json` in your project:

1. In VS Code, right-click the left sidebar
2. Click "New Folder" → name it `.vscode`
3. Right-click `.vscode` → "New File" → name it `settings.json`
4. Paste this:

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

5. Save the file (`Ctrl+S` / `Cmd+S`)

**This fixes most red squiggly lines in VS Code!**

---

## 🗄️ Set Up Supabase (Backend Database)

### Step 1: Create a Supabase Project

1. Go to: https://supabase.com/dashboard
2. Click **"New project"**
3. Choose your organization (or create one if asked)
4. Fill in:
   - **Name:** `refiners-team` (or whatever you like)
   - **Database Password:** Create a strong password and **SAVE IT SOMEWHERE SAFE!** (You'll need this)
   - **Region:** Choose closest to your location (e.g., "US West" if you're in USA)
   - **Pricing Plan:** Free
5. Click **"Create new project"**

**Wait 2-3 minutes for Supabase to set up your database.**

### Step 2: Get Your Supabase Credentials

Once your project is ready:

1. In Supabase dashboard, click **"Projects Settings"** (gear icon on left sidebar)
2. Click **"Data API" and "API Keys"**
3. You'll see:
   - **Project URL** (looks like: `https://abcdefghijk.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
   - **service_role** key (another long string)

**Keep this page open!** We'll need these values soon.

### Step 3: Install Supabase CLI

The Supabase CLI helps you deploy backend code.

#### For Windows:

Open **PowerShell**:
1. Press Windows key
2. Type "PowerShell"
3. Right-click "Windows PowerShell"

Then run:

```powershell
# Install Scoop (package manager)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Install Supabase CLI
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

#### For Mac:

Open Terminal and run:

```bash
brew install supabase/tap/supabase
```

**Don't have Homebrew?** Install it first:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### For Linux:

```bash
# Download and install
curl -fsSL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar -xz

# Move to a directory in your PATH
sudo mv supabase /usr/local/bin/supabase

# Make executable
sudo chmod +x /usr/local/bin/supabase
```

#### Verify Installation:

Close and reopen your terminal, then:

```bash
supabase --version
```

**Expected Output:**
```
2.67.1
```
(or similar version)

---

### Step 4: Login to Supabase CLI

#### Login with verification code:

In your terminal:

```bash
supabase login
```

**Expected Output:**
```
Hello from Supabase! Press Enter to open browser and login automatically.
```
Press Enter and Copy the code.
Copy and Paste your code and press Enter.

**Expected Output:**
```
You are now logged in. Happy coding!
```

✅ If you see this, you're logged in!

❌ **If you see "command not found":**
- Close and reopen terminal
- Make sure Supabase CLI installed correctly (check `supabase --version`)

---

### Step 5: Link Your Project

Tell the Supabase CLI which project to use.

#### Get Your Project Reference ID:

1. In Supabase Dashboard, go to **Settings** → **General**
2. Find **"Reference ID/Project ID"** (looks like: `abcdefghijk`)
3. Copy it

#### Link the Project:

In VS Code terminal (make sure you're in your project folder):

```bash
supabase link --project-ref YOUR_PROJECT_REF_ID
```

Replace `YOUR_PROJECT_REF_ID` with the actual ID you copied.

**Example:**
```bash
supabase link --project-ref pbowmknhbzgbicjefezx
```

**Expected Output:**
```
Finished supabase link.
```

✅ Project linked!

---

### Step 6: Update Supabase Info File

Your project has a file called `/utils/supabase/info.tsx`. We need to update it with your Supabase credentials.

1. In VS Code, open `utils/supabase/info.tsx`
2. You'll see:

```typescript
export const projectId = "pbowmknhbzgbicjefezx"
export const publicAnonKey = "eyJhbGci..."
```

3. Replace with YOUR values:
   - `projectId`: Your Project Reference ID (just the ID part from the URL, e.g., `abcdefghijk`)
   - `publicAnonKey`: Your **anon public** key from Supabase Dashboard → Settings → API

**Example:**
```typescript
export const projectId = "abcdefghijk"
export const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTU3NjAwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

4. Save the file (`Ctrl+S` / `Cmd+S`)

---

### Step 7: Deploy the Edge Function

The Edge Function is your backend server that handles data.

### Install Deno

Windows: Open powershell
```bash
scoop install deno
```
Verify:
```bash
deno --version
```
Mac: Homebrew: 

```bash
brew install deno.
```
Verify:
```bash
deno --version
```

Linux: 
1. Open your terminal
2. Run the installation command:
```bash
curl -fsSL https://deno.land/install.sh | sh
```
This command downloads the latest Deno binary and places it in the ~/.deno directory.
3. Add Deno to your PATH environment variable: The installer will usually display the commands needed to add the Deno executable to your system's PATH. You need to add these lines to your shell's profile file (commonly `~/.bashrc`, `~/.bash_profile`, or `~/.zshrc`).For example, to add it to `~/.bashrc`, run:
```bash
echo 'export DENO_INSTALL="$HOME/.deno"' >> ~/.bashrc
echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.bashrc
```
4. Apply the changes: 
Reload your shell configuration for the changes to take effect in your current terminal session.
```bash
source ~/.bashrc
# or source ~/.zshrc if you use zsh
```
5. verify: 
```bash
deno --version
```
**next**

```bash
supabase functions new make-server-ccb86954
```

**Expected Output:**
```
Created new Function at supabase\functions\make-server-ccb86954
Generate VS Code settings for Deno? [Y/n]
```
Press Y

```bash
supabase functions deploy make-server-ccb86954
```

**This might take 1-2 minutes.**

❌ **If you see "no functions found":**

Make sure the file exists at `supabase/functions/server/index.tsx`. If not, the project structure might be different. Check if you have a `supabase` folder in your project.

---

### Step 8: Set Environment Secrets

The Edge Function needs 3 secret keys to work.

#### Where to Find These Values:

Go to Supabase Dashboard → **Settings** → **API**:

1. **SUPABASE_URL**: Copy "Project URL" (e.g., `https://abcdefghijk.supabase.co`)
2. **SUPABASE_ANON_KEY**: Copy "anon public" key
3. **SUPABASE_SERVICE_ROLE_KEY**: Copy "service_role" key ⚠️ **This is secret! Don't share it!**

#### Set the Secrets via CLI:

Run these commands ONE BY ONE, replacing the values:

*** Skip URL and ANON_KEY parts unless needed ***

```bash
supabase secrets set URL=https://YOUR_PROJECT_ID.supabase.co
```

Press Enter. **Expected Output:**
```
Secret URL successfully set
```

```bash
supabase secrets set ANON_KEY=your_anon_key_here
```

**Expected Output:**
```
Secret ANON_KEY successfully set
```

```bash
supabase secrets set SERVICE_ROLE_KEY=your_service_role_key_here
```

**Expected Output:**
```
Secret SERVICE_ROLE_KEY successfully set
```

#### Alternative: Set Secrets via Dashboard:

If CLI doesn't work:

1. Go to Supabase Dashboard
2. Click **Edge Functions** (in left sidebar)
3. Click on `make-server-ccb86954`
4. Click **"Settings"** tab
5. Scroll to **"Function Secrets"**
6. Click **"Add new secret"**
7. Add each secret:
   - Name: `SUPABASE_URL` → Value: (your project URL)
   - Name: `SUPABASE_ANON_KEY` → Value: (your anon key)
   - Name: `SUPABASE_SERVICE_ROLE_KEY` → Value: (your service role key)

---

### Step 9: Create Database Table

The website stores data in a table called `kv_store_ccb86954`.

1. In Supabase Dashboard, click **"SQL Editor"** (in left sidebar)
2. Should open a new query.
3. Paste this SQL code:

```sql
CREATE TABLE kv_store_ccb86954 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

4. Click **"Run"** (or press `Ctrl+Enter`)

**Expected Output:**
```
Success. No rows returned
```

✅ Table created!

#### Verify Table Was Created:

1. Click **"Table Editor"** (in left sidebar)
2. You should see `kv_store_ccb86954` in the list (or similar)

---

### Step 10: Test Your Backend

Let's make sure everything works!

Replace supabase/functions/make-server-ccb86954 if not already
```ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// Get environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL")!
const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY")!

// Initialize Supabase client
const supabase = createClient(supabaseUrl, serviceRoleKey)

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url)

    // Health endpoint
    if (url.pathname.endsWith("/health")) {
      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Handle POST requests
    if (req.method === "POST") {
      const body = await req.json()
      const name = body.name || "Guest"

      // Example: insert into your "users" table (replace with your table name)
      const { data, error } = await supabase
        .from("users") // <-- Replace with your table
        .insert([{ name }])
        .select()

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        })
      }

      return new Response(JSON.stringify({ message: `Hello ${name}!`, inserted: data }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Other methods not allowed
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
})
```
Replace ``"users"`` with the actual table you want to write to. In this case, replace with ``kv_store_ccb86954``

Save the file.

Deploy again
```bash
supabase functions deploy make-server-ccb86954
```


```bash
curl.exe "https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ccb86954/health"
  -H "Authorization: Bearer YOUR_ANON_KEY"
```
or if doesn't work, 
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ccb86954/health \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Replace:
- `YOUR_PROJECT_ID` with your project ID
- `YOUR_ANON_KEY` with your anon public key

**Example:**
```bash
curl.exe "https://abcdefghijk.supabase.co/functions/v1/make-server-ccb86954/health"
  -H "Authorization: Bearer eyJhbGciOiJI..."
```

**Expected Output:**
```json
{"status":"ok"}
```

✅ **If you see this, your backend is working!**

❌ **If you see errors**, check:
- Edge Function deployed? (Go to Supabase Dashboard → Edge Functions)
- Secrets set? (Check Function Settings)
- Table created? (Check Table Editor)

---

## 🚀 Deploy to Vercel (Make Website Live)

### Step 1: Create GitHub Repository

We need to put your code on GitHub so Vercel can deploy it.

#### Initialize Git in Your Project:

In VS Code terminal:

```bash
git init
```

**Expected Output:**
```
Initialized empty Git repository
```

#### Create .gitignore File:

Make sure you have a `.gitignore` file in your project root. If not, create one:

```bash
# Windows
echo node_modules/ > .gitignore
echo .env >> .gitignore
echo dist/ >> .gitignore
echo .DS_Store >> .gitignore

# Mac/Linux
cat > .gitignore << EOF
node_modules/
.env
dist/
.DS_Store
EOF
```

#### Commit Your Code:

```bash
git add .
git commit -m "Initial commit - Edu Refiners Team website"
```

**Expected Output:**
```
[main (root-commit) abc1234] Initial commit - Refiners Team website
 XX files changed, XXXX insertions(+)
```

#### Create Repository on GitHub:

1. Go to: https://github.com/new
2. Repository name: `Edu-Refiners`
3. Description: `Academic support organization website`
4. Choose **Public** (or Private if you prefer)
5. **DON'T** check "Initialize with README" (we already have code)
6. Click **"Create repository"**

#### Push Code to GitHub:

GitHub will show you commands. Copy them or use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/Edu-Refiners.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**Expected Output:**
```
Enumerating objects: XX, done.
Writing objects: 100%, done.
To https://github.com/YOUR_USERNAME/Edu-Refiners.git
 * [new branch]      main -> main
```

✅ Code is now on GitHub!

---

### Step 2: Deploy to Vercel

#### Connect GitHub to Vercel:

1. Go to: https://vercel.com/new
2. You'll see "Import Git Repository"
3. Find `Edu-Refiners` in the list
4. Click **"Import"**

#### Configure Project:

Vercel will show configuration options:

1. **Project Name:** `Edu-Refiners` (or change it)
2. **Framework Preset:** Should auto-detect "Vite" ✅
3. **Root Directory:** `.` (leave as default)
4. **Build Command:** Leave as `npm run build`
5. **Output Directory:** Leave as `dist`

#### Add Environment Variables:

Click **"Environment Variables"** to expand.

Add these TWO variables:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | Your Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon public key |

**Example:**
- `VITE_SUPABASE_URL` = `https://abcdefghijk.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

⚠️ **IMPORTANT:** Notice the `VITE_` prefix! This is required for Vite to use them.

#### Deploy:

Click **"Deploy"**

**Vercel will now:**
1. Clone your GitHub repository
2. Install dependencies
3. Build your website
4. Deploy it to the internet

**This takes 2-5 minutes.** ☕

You'll see a progress bar and logs.

**Expected Output:**
```
✓ Building...
✓ Deployment ready
```

✅ **When it's done, you'll see "Congratulations!" with a link to your live website!**

---

### Step 3: Get Your Website URL

After deployment:

1. Vercel shows your website URL (looks like: `https://refiners-team.vercel.app`)
2. Click the URL to open your website!

🎉 **Your website is now LIVE on the internet!**

---

## ⚙️ Configure Your Website

### Step 1: Test the Website

1. Open your Vercel URL
2. You should see the Refiners Team landing page

**Check if:**
- ✅ Page loads (not blank)
- ✅ Theme switcher works (toggle dark/light mode)
- ✅ Navigation menu works
- ✅ "About Us" button opens modal

### Step 2: Initialize Data

The first time, the website needs to set up default data.

**This should happen automatically**, but if you see empty sections:

1. Open your website
2. Press **F12** to open browser console
3. Run this command:

```javascript
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ccb86954/init', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ANON_KEY'
  }
}).then(r => r.json()).then(console.log)
```

Replace `YOUR_PROJECT_ID` and `YOUR_ANON_KEY`.

**Expected Output:**
```javascript
{message: "Initialized successfully"} 
// or
{message: "Already initialized"}
```

4. Refresh the page

---

### Step 3: Login to Admin Dashboard

1. Scroll to the footer of your website
2. Click **"Admin"** (small link in footer)
3. Enter password: `admin123`
4. Click "Login"

✅ Admin dashboard should open!

**First thing to do:** Change the default password!

1. Click **"Logo & Settings"** tab
2. Scroll to "Change Admin Password"
3. Current Password: `admin123`
4. New Password: (choose a strong password)
5. Click "Change Password"

✅ Password changed!

---

### Step 4: Add Your Content

Now you can customize everything through the admin dashboard!

#### Landing Page:
1. Click **"Landing Page"** tab
2. Edit welcome text and subtexts
3. Click "Save Changes"

#### Logo:
1. Click **"Logo & Settings"** tab
2. Upload your logo to **Cloudinary** (free):
   - Go to: https://cloudinary.com/users/register_free
   - Sign up for free account
   - Upload your logo image
   - Copy the **"Secure URL"** (right-click image → Copy URL)
3. Paste the URL in "Logo URL" field
4. Click "Save Logo"

#### Contacts:
1. Click **"Contacts"** tab
2. Click "Add Contact"
3. Fill in:
   - Name
   - Education
   - Subjects (e.g., "Mathematics, Physics")
   - Bio/Quote
   - Photo URL (upload to Cloudinary first)
   - Best At (e.g., "Algebra, Calculus")
4. Click "Save Changes"

#### Notices:
1. Click **"Notices"** tab
2. Click "Add Notice"
3. Fill in title, date, preview, and full content
4. Click "Save Changes"

#### Resources:
1. Click **"Resources"** tab
2. Click "Add Resource"
3. Fill in title, description, and items (one per line)
4. Choose an icon from dropdown
5. Click "Save Changes"

#### Footer:
1. Click **"Footer"** tab
2. Add your about text, email, and phone
3. Click "Save Changes"

#### About Modal:
1. Click **"About Modal"** tab
2. Write your story
3. Add goals (one per line)
4. Click "Save Changes"

---

## ✅ Test Everything

### Checklist:

Go through your website and verify:

- [ ] Website loads at your Vercel URL
- [ ] Theme switcher works (light/dark mode)
- [ ] Logo displays (if you uploaded one)
- [ ] Navigation bar works on desktop
- [ ] Hamburger menu works on mobile
- [ ] "Get Started" button scrolls to contacts
- [ ] Contact carousel shows and scrolls
- [ ] Notices section shows
- [ ] Resources section shows
- [ ] "About Us" button opens modal
- [ ] Footer displays correctly
- [ ] Admin login works with your new password
- [ ] Admin dashboard saves changes
- [ ] After saving in admin, changes appear on website

### Mobile Testing:

1. Open your website on your phone
2. Or in browser, press **F12** → Click device icon (mobile view)
3. Check everything works on small screens

---

## 🐛 Common Issues & Solutions

### Issue 1: "Build Failed" on Vercel

**Symptoms:**
```
Error: Build failed
```

**Solutions:**

#### A. Check Build Logs:
1. In Vercel dashboard → Deployments
2. Click the failed deployment
3. Click "View Build Logs"
4. Look for the error

#### B. Common Causes:

**TypeScript Errors:**
- Look for red lines in VS Code
- Fix them before deploying
- Or add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "noEmit": true,
    "skipLibCheck": true
  }
}
```

**Missing Dependencies:**
```bash
npm install
npm run build
```

If it fails locally, fix errors before deploying.

**Wrong Node Version:**
1. Create `vercel.json` in project root:
```json
{
  "buildCommand": "npm run build",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

#### C. Redeploy:
After fixing:
```bash
git add .
git commit -m "Fix build errors"
git push
```

Vercel will auto-deploy again.

---

### Issue 2: Website Shows But Is Unstyled

**Symptoms:**
- Website loads but looks broken
- No colors, everything stacked weird
- Plain HTML only

**Causes & Solutions:**

#### A. Build Output Directory Wrong:

1. Go to Vercel → Settings → General
2. Check "Output Directory" is set to: `dist`
3. If not, change it and redeploy

#### B. CSS Not Loading:

Check `index.html` has this:
```html
<link rel="stylesheet" href="/src/styles/theme.css" />
<link rel="stylesheet" href="/src/styles/fonts.css" />
```

#### C. Tailwind Not Working:

Check `vite.config.ts` has:
```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Then:
```bash
npm install
git add .
git commit -m "Fix Tailwind config"
git push
```

---

### Issue 3: Red Lines in VS Code

**Symptoms:**
- Lots of red squiggly lines in code
- "Cannot find module" errors

**Solutions:**

#### A. Restart TypeScript Server:

1. In VS Code, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type: `TypeScript: Restart TS Server`
3. Press Enter

#### B. Install Missing Types:

```bash
npm install --save-dev @types/node @types/react @types/react-dom
```

#### C. Update VS Code Settings:

Make sure you created `.vscode/settings.json` (from earlier)

#### D. Check tsconfig.json:

Should have:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

### Issue 4: "Failed to Fetch" Errors

**Symptoms:**
```
Error: Failed to fetch
TypeError: Failed to fetch
```

**Solutions:**

#### A. Check Edge Function Deployed:

1. Go to Supabase Dashboard → Edge Functions
2. Look for `make-server-ccb86954`
3. If not there, deploy it:
```bash
supabase functions deploy make-server-ccb86954
```

#### B. Check Secrets Are Set:

1. Supabase Dashboard → Edge Functions → `make-server-ccb86954`
2. Click "Settings"
3. Scroll to "Function Secrets"
4. Verify all 3 secrets are there:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

#### C. Check CORS:

Edge function should have (in `index.tsx`):
```typescript
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
```

#### D. Test Edge Function:

```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ccb86954/health \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Should return: `{"status":"ok"}`

---

### Issue 5: Admin Login Not Working

**Symptoms:**
- "Invalid password" error
- Can't access admin dashboard

**Solutions:**

#### A. Reset Password via Database:

1. Supabase Dashboard → Table Editor
2. Find table `kv_store_ccb86954`
3. Look for row where `key` = `admin_password`
4. Click to edit
5. Change `value` to: `"admin123"` (include the quotes!)
6. Save
7. Try logging in with: `admin123`

#### B. Check Data Initialized:

In browser console on your website:
```javascript
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ccb86954/init', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ANON_KEY'
  }
}).then(r => r.json()).then(console.log)
```

---

### Issue 6: Changes Don't Save in Admin Dashboard

**Symptoms:**
- Click "Save Changes"
- Says "Saved successfully"
- But changes don't appear on website

**Solutions:**

#### A. Hard Refresh Browser:

- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

#### B. Clear Browser Cache:

1. Press `F12` to open DevTools
2. Right-click the refresh button
3. Click "Empty Cache and Hard Reload"

#### C. Check Database:

1. Supabase Dashboard → Table Editor
2. Open `kv_store_ccb86954`
3. Check if your data is there
4. If yes, it's a caching issue (use hard refresh)
5. If no, check browser console for errors

#### D. Check Edge Function Logs:

1. Supabase Dashboard → Edge Functions
2. Click `make-server-ccb86954`
3. Click "Logs" tab
4. Look for errors when you click "Save"

---

### Issue 7: Supabase CLI Not Working

**Symptoms:**
```
supabase: command not found
```
or
```
'supabase' is not recognized as an internal or external command
```

**Solutions:**

#### Windows:

```powershell
# Close and reopen PowerShell as Administrator
# Then reinstall:
scoop install supabase
```

If Scoop isn't installed:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

#### Mac:

```bash
# Reinstall via Homebrew
brew update
brew upgrade supabase
```

#### Linux:

```bash
# Download latest version
curl -fsSL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz -o supabase.tar.gz

# Extract
tar -xzf supabase.tar.gz

# Move to PATH
sudo mv supabase /usr/local/bin/

# Make executable
sudo chmod +x /usr/local/bin/supabase

# Clean up
rm supabase.tar.gz
```

#### Verify:

Close and reopen terminal:
```bash
supabase --version
```

---

### Issue 8: Can't Login to Supabase CLI

**Symptoms:**
```
Invalid credentials
Authentication failed
```

**Solution - Use Access Token (New Method):**

1. Go to: https://supabase.com/dashboard/account/tokens
2. Click "Generate new token"
3. Name: `cli-access`
4. Click "Generate token"
5. **COPY IT IMMEDIATELY** (can't view again)
6. In terminal:
```bash
supabase login
```
7. Paste token when asked
8. Press Enter

Should show: `Logged in successfully!`

---

### Issue 9: Environment Variables Not Working

**Symptoms:**
- Website works locally but not on Vercel
- Console shows "undefined" for environment variables

**Solution:**

#### A. Check Vercel Environment Variables:

1. Vercel Dashboard → Your Project → Settings
2. Click "Environment Variables"
3. Verify these exist:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. **MUST have `VITE_` prefix!**

#### B. Redeploy:

1. Vercel Dashboard → Deployments
2. Click ⋯ (three dots) on latest deployment
3. Click "Redeploy"
4. Check "Use existing Build Cache" → **OFF**
5. Click "Redeploy"

#### C. Check Code Uses Correct Variable Names:

In `/utils/supabase/info.tsx`:
```typescript
export const projectId = "your-project-id"
export const publicAnonKey = "your-anon-key"
```

These should be **hardcoded**, not using environment variables.

Only the Vercel environment variables (`VITE_*`) are for the build process.

---

### Issue 10: Images Not Loading

**Symptoms:**
- Broken image icons
- Images don't show

**Solutions:**

#### A. Check Image URLs:

1. Must start with `https://`
2. Must be publicly accessible
3. Recommended: Use Cloudinary

#### B. Test Image URL:

1. Copy image URL from admin dashboard
2. Paste in new browser tab
3. Should load the image
4. If not, URL is wrong

#### C. Upload to Cloudinary:

1. Go to: https://cloudinary.com
2. Sign up (free)
3. Upload image
4. Click image → "Copy URL" → "Secure URL"
5. Paste in admin dashboard

---

## 📞 Need More Help?

### Check Logs:

**Browser Console:**
1. Press `F12`
2. Click "Console" tab
3. Look for red errors

**Vercel Logs:**
1. Vercel Dashboard → Deployments
2. Click deployment
3. Click "Runtime Logs"

**Supabase Logs:**
1. Supabase Dashboard → Edge Functions
2. Click `make-server-ccb86954`
3. Click "Logs"

### Documentation:

- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev/guide/
- **React Docs:** https://react.dev/

### Community Support:

- **Supabase Discord:** https://discord.supabase.com/
- **Vercel Discord:** https://vercel.com/discord
- **Stack Overflow:** https://stackoverflow.com/

---

## 🎓 Helpful Commands Reference

### Project Commands:

```bash
# Install dependencies
npm install

# Run locally (development)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Git Commands:

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull
```

### Supabase Commands:

```bash
# Login
supabase login

# Link project
supabase link --project-ref YOUR_REF_ID

# Deploy Edge Function
supabase functions deploy make-server-ccb86954

# Set secret
supabase secrets set SECRET_NAME=value

# List secrets
supabase secrets list

# Check status
supabase status
```

### Vercel Commands:

```bash
# Install Vercel CLI (optional)
npm install -g vercel

# Deploy from command line
vercel

# Deploy to production
vercel --prod
```

---

## 🎉 Congratulations!

If you made it here, your website should be:

✅ Live on the internet (Vercel)
✅ Connected to a database (Supabase)
✅ Fully functional with admin dashboard
✅ Customizable through the admin panel

**Your website URL:** `https://your-project-name.vercel.app`

### Next Steps:

1. **Customize your content** through the admin dashboard
2. **Add your logo** (upload to Cloudinary)
3. **Add contact profiles** with photos
4. **Create notices** to keep students updated
5. **Add resources** to help students
6. **Share your website** with students!

### Custom Domain (Optional):

Want a custom domain like `refiners-team.com`?

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records (Vercel will guide you)

---

## 📝 Maintenance

### How to Update Content:

1. Go to your website
2. Click "Admin" in footer
3. Login
4. Edit content
5. Click "Save Changes"
6. Changes appear immediately!

### How to Update Code:

1. Make changes in VS Code
2. Test locally: `npm run dev`
3. Commit and push:
```bash
git add .
git commit -m "Description of changes"
git push
```
4. Vercel auto-deploys in 2-3 minutes

### How to Backup Data:

1. Supabase Dashboard → Table Editor
2. Open `kv_store_ccb86954`
3. Click "..." → "Export to CSV"
4. Save the file somewhere safe

---

**You did it! 🎉 Your Refiners Team website is now live!**

If you run into any issues not covered here, check the logs and error messages - they usually tell you exactly what's wrong!

Happy teaching! 📚

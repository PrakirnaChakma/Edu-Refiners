# ✅ First Time Setup Checklist

**Use this checklist to make sure you don't miss anything!**

Print this out and check off each item as you complete it.

---

## 📋 Pre-Deployment Checklist

### Prerequisites (Do These First!)

- [ ] **Node.js installed** (run `node --version` to verify)
- [ ] **Git installed** (run `git --version` to verify)
- [ ] **VS Code installed** and opened
- [ ] **GitHub account created** (https://github.com/signup)
- [ ] **Vercel account created** (https://vercel.com/signup)
- [ ] **Supabase account created** (https://supabase.com/dashboard/sign-up)
- [ ] **Cloudinary account created** (https://cloudinary.com - for images)

### VS Code Setup

- [ ] **Extensions installed:**
  - [ ] ES7+ React/Redux/React-Native snippets
  - [ ] Tailwind CSS IntelliSense
  - [ ] ESLint
  - [ ] Prettier - Code formatter
- [ ] **Project folder opened** in VS Code
- [ ] **Terminal opened** in VS Code (View → Terminal or `` Ctrl+` ``)
- [ ] **`.vscode/settings.json` created** (see deployment guide)

### Project Setup

- [ ] **Dependencies installed** (`npm install` ran successfully)
- [ ] **No red errors** in terminal after `npm install`
- [ ] **Local server runs** (`npm run dev` works)
- [ ] **Website opens** in browser at `http://localhost:5173`

---

## 🗄️ Supabase Setup Checklist

### Create Project

- [ ] **Supabase project created**
  - Project name: ________________
  - Region selected: ________________
  - Database password saved: ☑️ (KEEP THIS SAFE!)

### Get Credentials

- [ ] **Project URL copied** (Settings → API)
  - Format: `https://[project-id].supabase.co`
  - Your URL: ________________________________
  
- [ ] **anon public key copied** (Settings → API)
  - Starts with: `eyJhbGci...`
  - Saved: ☑️
  
- [ ] **service_role key copied** (Settings → API)
  - Starts with: `eyJhbGci...`
  - ⚠️ KEEP SECRET! ⚠️
  - Saved: ☑️

### CLI Setup

- [ ] **Supabase CLI installed** (`supabase --version` works)
- [ ] **Access token generated** (https://supabase.com/dashboard/account/tokens)
- [ ] **Logged in to Supabase CLI** (`supabase login`)
- [ ] **Project linked** (`supabase link --project-ref YOUR_REF_ID`)

### Update Project Files

- [ ] **Updated `/utils/supabase/info.tsx`**
  - [ ] `projectId` = your project reference ID
  - [ ] `publicAnonKey` = your anon public key
  - [ ] File saved (Ctrl+S)

### Database Setup

- [ ] **Table created** (`kv_store_ccb86954`)
  - SQL ran successfully in SQL Editor
  - Table visible in Table Editor

### Edge Function Deployment

- [ ] **Edge Function deployed** (`supabase functions deploy make-server-ccb86954`)
- [ ] **Secrets set** (all 3):
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] **Edge Function visible** in Supabase Dashboard
- [ ] **Health check works** (curl command returns `{"status":"ok"}`)

---

## 🚀 Vercel Deployment Checklist

### Git Setup

- [ ] **Git initialized** (`git init`)
- [ ] **`.gitignore` file exists** (should ignore `node_modules`, `.env`, `dist`)
- [ ] **Code committed**
  ```bash
  git add .
  git commit -m "Initial commit"
  ```

### GitHub Setup

- [ ] **GitHub repository created**
  - Repository name: ________________
  - URL: ________________________________
- [ ] **Code pushed to GitHub**
  ```bash
  git remote add origin [YOUR_REPO_URL]
  git push -u origin main
  ```
- [ ] **Repository visible** on GitHub (open URL to verify)

### Vercel Deployment

- [ ] **Repository imported** to Vercel
- [ ] **Framework detected** as "Vite"
- [ ] **Build settings correct:**
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`
- [ ] **Environment variables added:**
  - [ ] `VITE_SUPABASE_URL` = (your Supabase URL)
  - [ ] `VITE_SUPABASE_ANON_KEY` = (your anon key)
- [ ] **First deployment completed** (no errors)
- [ ] **Website URL received**
  - Your URL: ________________________________
- [ ] **Website opens** at Vercel URL

---

## 🎨 Website Configuration Checklist

### Initial Data Setup

- [ ] **Data initialized** (automatic on first load OR manually via console)
- [ ] **Landing page shows** with default content
- [ ] **Theme switcher works** (can toggle light/dark)
- [ ] **Navigation works** (all menu items clickable)

### Admin Dashboard Access

- [ ] **Admin login works** (footer → "Admin" → password: `admin123`)
- [ ] **Admin dashboard opens** (no errors)
- [ ] **All tabs accessible:**
  - [ ] Landing Page
  - [ ] Logo & Settings
  - [ ] Contacts
  - [ ] Notices
  - [ ] Resources
  - [ ] Footer
  - [ ] About Modal

### Security

- [ ] **Admin password changed!** (from `admin123` to your own)
  - New password saved: ☑️
- [ ] **Can login** with new password
- [ ] **Test save works** (make a small edit and save)

### Content Upload

- [ ] **Logo uploaded:**
  - [ ] Image uploaded to Cloudinary
  - [ ] URL copied and pasted in admin
  - [ ] Logo saved and displays on website
  
- [ ] **Contact profiles added:**
  - [ ] At least 1 contact created
  - [ ] Photo URL added (from Cloudinary)
  - [ ] Information filled in
  - [ ] Saved successfully
  - [ ] Displays on website
  
- [ ] **Notices added:**
  - [ ] At least 1 notice created
  - [ ] Saved successfully
  - [ ] Displays on website
  
- [ ] **Resources added:**
  - [ ] At least 1 resource created
  - [ ] Saved successfully
  - [ ] Displays on website
  
- [ ] **Footer updated:**
  - [ ] About text filled
  - [ ] Email added
  - [ ] Phone added
  - [ ] Saved successfully
  
- [ ] **About Modal filled:**
  - [ ] Story written
  - [ ] Goals listed
  - [ ] Saved successfully
  - [ ] Modal opens and displays content

---

## ✅ Final Testing Checklist

### Desktop Testing

- [ ] **Chrome:**
  - [ ] Website loads
  - [ ] No console errors (F12 → Console)
  - [ ] All sections display correctly
  - [ ] Images load
  - [ ] Theme switcher works
  - [ ] Navigation works
  - [ ] Carousels scroll
  - [ ] Buttons clickable
  - [ ] Admin dashboard accessible
  
- [ ] **Firefox:**
  - [ ] Website loads
  - [ ] Everything works
  
- [ ] **Safari** (if on Mac):
  - [ ] Website loads
  - [ ] Everything works

### Mobile Testing

Open website on phone OR use browser DevTools mobile view (F12 → device icon):

- [ ] **Website loads** on mobile
- [ ] **Hamburger menu appears** (not desktop nav)
- [ ] **Hamburger menu opens** when clicked
- [ ] **Menu items work**
- [ ] **Content stacks vertically** (not horizontal)
- [ ] **Text is readable** (not too small)
- [ ] **Images fit screen** (not cut off)
- [ ] **Buttons are clickable** (not too small)
- [ ] **Contact cards stack** (not carousel on mobile)
- [ ] **Notices stack** (vertical scroll)
- [ ] **Footer displays** correctly

### Functionality Testing

- [ ] **Theme Switcher:**
  - [ ] Toggles between light and dark
  - [ ] Saves preference (refresh page, theme persists)
  
- [ ] **Navigation:**
  - [ ] "Home" scrolls to top
  - [ ] "Contacts" scrolls to contacts section
  - [ ] "Notices" scrolls to notices section
  - [ ] "Resources" scrolls to resources section
  - [ ] "About Us" opens modal
  
- [ ] **Logo:**
  - [ ] Displays (if uploaded)
  - [ ] Clickable
  - [ ] Returns to home when clicked
  
- [ ] **Get Started Button:**
  - [ ] Visible on landing page
  - [ ] Scrolls smoothly to contacts
  
- [ ] **Contact Section:**
  - [ ] Instruction text displays (if added)
  - [ ] Contact cards display
  - [ ] Horizontal scroll works (desktop)
  - [ ] Photos load
  - [ ] "View All Contacts" button works
  - [ ] Expand/collapse works on cards
  
- [ ] **Notices Section:**
  - [ ] Notices display
  - [ ] Vertical scroll works
  - [ ] "View All Notices" button works
  - [ ] Expand/collapse works
  - [ ] Search works on "View All" page
  
- [ ] **Resources Section:**
  - [ ] Resource cards display
  - [ ] Icons show correctly
  - [ ] Items listed properly
  
- [ ] **Footer:**
  - [ ] Contact info displays
  - [ ] "Admin" link visible (small)
  - [ ] Admin login modal opens
  
- [ ] **About Modal:**
  - [ ] Opens when "About Us" clicked
  - [ ] Story displays
  - [ ] Goals listed
  - [ ] Close button works
  - [ ] Click outside closes modal

### Admin Dashboard Testing

- [ ] **Login:**
  - [ ] Opens from footer
  - [ ] Accepts correct password
  - [ ] Rejects wrong password
  
- [ ] **All Tabs:**
  - [ ] Landing Page tab - edits work
  - [ ] Logo & Settings tab - uploads work
  - [ ] Contacts tab - add/edit/delete works
  - [ ] Notices tab - add/edit/delete works
  - [ ] Resources tab - add/edit/delete works
  - [ ] Footer tab - edits work
  - [ ] About Modal tab - edits work
  
- [ ] **Save Function:**
  - [ ] Shows "Saving..." when clicked
  - [ ] Shows success message
  - [ ] Changes appear on website (after refresh)
  
- [ ] **Password Change:**
  - [ ] Current password validation works
  - [ ] New password saves
  - [ ] Can login with new password

---

## 🎉 Launch Checklist

**Before sharing your website publicly:**

- [ ] **All content finalized:**
  - [ ] Landing page text reviewed
  - [ ] Logo uploaded and displays
  - [ ] At least 3 contact profiles added
  - [ ] At least 2 notices posted
  - [ ] At least 2 resources added
  - [ ] Footer information complete
  - [ ] About section filled out
  
- [ ] **Security:**
  - [ ] Admin password changed (NOT `admin123`)
  - [ ] Password stored safely
  - [ ] Don't share admin credentials
  
- [ ] **Quality Check:**
  - [ ] No placeholder text (e.g., "Lorem ipsum")
  - [ ] All images load correctly
  - [ ] No broken links
  - [ ] No console errors
  - [ ] Grammar and spelling checked
  
- [ ] **Performance:**
  - [ ] Website loads in under 3 seconds
  - [ ] Images optimized (under 500KB each)
  - [ ] No unnecessary large files
  
- [ ] **Mobile Friendly:**
  - [ ] Tested on actual mobile device
  - [ ] Everything readable and clickable
  - [ ] No horizontal scrolling (except carousels)
  
- [ ] **Backup Created:**
  - [ ] Database exported (CSV from Supabase)
  - [ ] Backup saved to safe location
  - [ ] Backup date: ________________

---

## 📊 Post-Launch Checklist

**After website is live:**

- [ ] **Share Website:**
  - [ ] URL shared with team members
  - [ ] URL shared with students
  - [ ] URL posted on social media (if applicable)
  
- [ ] **Monitor:**
  - [ ] Check website daily for first week
  - [ ] Monitor error logs (Vercel + Supabase)
  - [ ] Collect user feedback
  
- [ ] **Document:**
  - [ ] Website URL saved: ________________________________
  - [ ] Admin credentials stored safely
  - [ ] Deployment date: ________________
  - [ ] Maintenance schedule created
  
- [ ] **Optional Upgrades:**
  - [ ] Custom domain purchased
  - [ ] Custom domain connected to Vercel
  - [ ] Analytics added (Google Analytics, etc.)
  - [ ] SEO optimization

---

## 🔄 Maintenance Schedule

### Daily (First Week):
- [ ] Check website loads
- [ ] Check for error messages
- [ ] Respond to user feedback

### Weekly:
- [ ] Review analytics (if added)
- [ ] Update notices (if needed)
- [ ] Check all functionality still works

### Monthly:
- [ ] Update dependencies: `npm update`
- [ ] Backup database
- [ ] Review and archive old notices
- [ ] Check for security updates

### Quarterly:
- [ ] Review and update content
- [ ] Add new resources
- [ ] Update contact profiles
- [ ] Test on new browsers/devices

---

## 📝 Notes

**Write any important information here:**

**Admin Password:**
(Don't write it here if anyone can see this document!)

**Important Dates:**
- Setup Date: ________________
- Launch Date: ________________
- Last Backup: ________________
- Last Update: ________________

**Custom Settings:**
- Custom Domain: ________________
- Analytics ID: ________________
- Other: ________________________________

**Issues Encountered:**
1. ________________________________
2. ________________________________
3. ________________________________

**Solutions:**
1. ________________________________
2. ________________________________
3. ________________________________

---

## ✅ Completion Certificate

**I have completed all the steps in this checklist!**

- Your Name: ________________________________
- Date: ________________
- Website URL: ________________________________
- Status: 🎉 **LIVE AND RUNNING!** 🎉

**Congratulations!** Your Refiners Team website is now live and ready to help students! 🎓

---

**Need help?** Check:
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed setup instructions
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Fix common errors  
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Command cheat sheet

**Keep this checklist for future reference or when setting up another instance!**

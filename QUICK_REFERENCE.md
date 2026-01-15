# ⚡ Quick Reference Card - Refiners Team

**Print this and keep it handy!**

---

## 🔗 Important Links

| What | Where |
|------|-------|
| **Your Website** | `https://your-project.vercel.app` |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Supabase Dashboard** | https://supabase.com/dashboard |
| **GitHub Repository** | `https://github.com/YOUR_USERNAME/refiners-team` |
| **Cloudinary (Images)** | https://cloudinary.com/console |

---

## 💻 Common Commands

### Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install package-name
```

### Git (Saving Your Work)

```bash
# See what changed
git status

# Save changes
git add .
git commit -m "Describe what you changed"
git push

# Pull latest changes
git pull
```

### Supabase (Backend)

```bash
# Login
supabase login

# Deploy backend function
supabase functions deploy make-server-ccb86954

# Set a secret
supabase secrets set SECRET_NAME=value

# View secrets
supabase secrets list
```

### Vercel (Hosting)

**Mostly use the dashboard:** https://vercel.com/dashboard

Or via CLI:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

## 🗂️ Important Files

| File | What It Does |
|------|--------------|
| `src/app/App.tsx` | Main app component |
| `src/app/components/AdminDashboard.tsx` | Admin panel |
| `utils/supabase/info.tsx` | Supabase credentials |
| `supabase/functions/server/index.tsx` | Backend API |
| `package.json` | Dependencies list |
| `vite.config.ts` | Build configuration |
| `tsconfig.json` | TypeScript settings |

---

## 🔐 Credentials Locations

### Supabase Credentials

**Where:** Supabase Dashboard → Settings → API

- **Project URL**: `https://[PROJECT_ID].supabase.co`
- **anon public key**: `eyJhbGci...` (public, safe to expose)
- **service_role key**: `eyJhbGci...` (⚠️ SECRET! Never expose!)

### Vercel Environment Variables

**Where:** Vercel Dashboard → Settings → Environment Variables

- `VITE_SUPABASE_URL` = Your Project URL
- `VITE_SUPABASE_ANON_KEY` = Your anon public key

### Admin Password

**Default:** `admin123` (CHANGE THIS IMMEDIATELY!)

**How to change:**
1. Login to admin dashboard
2. Logo & Settings tab
3. Change Admin Password section

**Reset if forgotten:**
1. Supabase Dashboard → Table Editor
2. Table: `kv_store_ccb86954`
3. Find row: `key = 'admin_password'`
4. Edit `value` to: `"admin123"`

---

## 🐛 Quick Troubleshooting

### Website Not Loading?

1. Check Vercel deployment status
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Check browser console for errors (F12)

### Admin Can't Save Changes?

1. Check Edge Function deployed
2. Check Supabase secrets set
3. Check browser console for errors
4. Check Edge Function logs in Supabase

### Red Lines in VS Code?

1. `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. Close and reopen VS Code
3. Run: `npm install`

### Build Failed on Vercel?

1. Check build logs in Vercel
2. Test locally: `npm run build`
3. Fix errors shown in terminal
4. Push again: `git push`

### Images Not Loading?

1. Check URL starts with `https://`
2. Test URL in browser (should load image)
3. Use Cloudinary for hosting images

---

## 📱 Testing Checklist

**Before Going Live:**

- [ ] Test on Chrome
- [ ] Test on Firefox  
- [ ] Test on Safari
- [ ] Test on mobile (or browser mobile view)
- [ ] Test theme switcher
- [ ] Test navigation on desktop
- [ ] Test hamburger menu on mobile
- [ ] Test admin login
- [ ] Test saving in admin dashboard
- [ ] Test all links work
- [ ] Test images load
- [ ] Test contact carousel
- [ ] Test notices section
- [ ] Test "About Us" modal

---

## 🆘 When Things Go Wrong

### Step 1: Check Logs

**Browser Console:**
- Press F12 → Console tab
- Look for red errors

**Vercel Logs:**
- Dashboard → Deployments → Click deployment → Runtime Logs

**Supabase Logs:**
- Dashboard → Edge Functions → make-server-ccb86954 → Logs

### Step 2: Check Guides

1. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Full deployment steps
2. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues & fixes

### Step 3: Verify Setup

- [ ] Edge Function deployed?
- [ ] Supabase secrets set (all 3)?
- [ ] Vercel environment variables set (both)?
- [ ] Database table created?
- [ ] Data initialized?

---

## 🎯 Most Common Commands (Memorize These!)

```bash
# Local development
npm run dev

# Save your work
git add .
git commit -m "Your message"
git push

# Deploy backend
supabase functions deploy make-server-ccb86954

# Check what's running
ps aux | grep node   # (Mac/Linux)
tasklist | findstr node   # (Windows)
```

---

## 📞 Support Resources

| Issue | Where to Go |
|-------|-------------|
| Deployment help | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) |
| Error messages | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Supabase issues | https://supabase.com/docs |
| Vercel issues | https://vercel.com/docs |
| Code questions | https://stackoverflow.com |

---

## 🔄 Regular Maintenance

### Weekly:
- Check for error logs
- Test website functionality
- Backup database (export CSV from Supabase)

### Monthly:
- Update dependencies: `npm update`
- Check for security updates
- Review and archive old notices

### As Needed:
- Update content via admin dashboard
- Add new contact profiles
- Post new notices
- Add new resources

---

## 📊 Keyboard Shortcuts

### VS Code:
- `Ctrl+`` ` - Toggle terminal
- `Ctrl+Shift+P` - Command palette
- `Ctrl+P` - Quick file open
- `Ctrl+/` - Toggle comment
- `Ctrl+S` - Save file

### Browser DevTools:
- `F12` - Open DevTools
- `Ctrl+Shift+C` - Inspect element
- `Ctrl+Shift+R` - Hard refresh
- `Ctrl+Shift+Delete` - Clear cache

### General:
- `Ctrl+Z` - Undo
- `Ctrl+Shift+Z` - Redo
- `Ctrl+F` - Find
- `Ctrl+C` - Copy
- `Ctrl+V` - Paste

---

## 🎨 Cloudinary Quick Setup

**For uploading images (logo, contact photos, etc.):**

1. Sign up: https://cloudinary.com/users/register_free
2. Go to: Media Library
3. Click "Upload"
4. Select image
5. After upload, click image
6. Click "Copy URL" → Select "Secure URL"
7. Paste in admin dashboard

**Image URL format:**
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/filename.png
```

---

## 📝 Content Update Workflow

**To update website content:**

1. Open your website
2. Scroll to footer → Click "Admin"
3. Login with your password
4. Select appropriate tab:
   - Landing Page → Edit welcome text
   - Logo & Settings → Upload logo / change password
   - Contacts → Add/edit contact profiles
   - Notices → Add/edit notices
   - Resources → Add/edit study resources
   - Footer → Edit contact info
   - About Modal → Edit story and goals
5. Click "Save Changes"
6. Close admin dashboard
7. Hard refresh website to see changes

**That's it!** No coding required for content updates.

---

## 🔒 Security Checklist

- [ ] Changed default admin password (`admin123`)
- [ ] Don't share service_role key with anyone
- [ ] Keep Supabase dashboard password secure
- [ ] Enable 2FA on GitHub account
- [ ] Enable 2FA on Vercel account
- [ ] Regularly backup database
- [ ] Monitor Edge Function logs for suspicious activity

---

**Keep this handy! Bookmark this file in your browser for quick access.** 🔖

*Need more detailed help? Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)*

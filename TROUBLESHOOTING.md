# 🔧 Troubleshooting Guide - Refiners Team Website

This guide addresses common issues you might encounter.

---

## 🚨 "Failed to fetch" Error

### **Symptoms:**
- Console shows: `Error initializing: TypeError: Failed to fetch`
- Data doesn't load
- Website appears but with no content

### **Cause:**
The Edge Function is not deployed or Supabase environment variables are not set.

### **Solution:**

#### Step 1: Check if Edge Function is Deployed

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Edge Functions** in the left sidebar
4. Look for `make-server-ccb86954`
   - ❌ If NOT there → You need to deploy it
   - ✅ If there → Go to Step 2

#### Step 2: Deploy the Edge Function

In your terminal/command prompt:

```bash
# Login to Supabase (if not already)
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_ID
```

Replace `YOUR_PROJECT_ID` with your actual project ID. Find it here:
- In your Supabase URL: `https://YOUR_PROJECT_ID.supabase.co`
- Or in Supabase Dashboard → Settings → General → Reference ID

```bash
# Deploy the function
supabase functions deploy make-server-ccb86954
```

#### Step 3: Set Environment Secrets

The Edge Function needs these secrets to work:

1. In Supabase Dashboard → **Edge Functions**
2. Click on `make-server-ccb86954`
3. Go to **Secrets** tab
4. Add these three secrets:

| Secret Name | Where to Find It |
|------------|------------------|
| `SUPABASE_URL` | Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Settings → API → service_role (⚠️ Keep secret!) |

**To add a secret:**
- Click **"Add new secret"**
- Enter the name exactly as shown above
- Paste the value
- Click **"Save"**

Repeat for all three secrets.

#### Step 4: Redeploy After Adding Secrets

After adding secrets, deploy again:

```bash
supabase functions deploy make-server-ccb86954
```

#### Step 5: Test

1. Refresh your website
2. Open browser console (F12)
3. You should see data loading without errors!

---

## 🗄️ "Unexpected end of JSON input" Error

### **Symptoms:**
- Console shows JSON parsing errors
- Edge Function logs show errors

### **Cause:**
The database table `kv_store_ccb86954` doesn't exist yet.

### **Solution:**

The table should be created automatically, but if it's not:

1. Go to Supabase Dashboard → **Table Editor**
2. Click **"New table"**
3. Table name: `kv_store_ccb86954`
4. Add columns:
   - `key` - Type: `text` - Primary Key: ✅
   - `value` - Type: `jsonb`
5. Click **"Save"**

Then refresh your website - it should initialize the data automatically.

---

## 🔐 Admin Login Not Working

### **Symptom:**
- "Invalid password" error even with correct password
- Cannot access admin dashboard

### **Solutions:**

#### Option 1: Reset Password via Database

1. Go to Supabase Dashboard → **Table Editor**
2. Open table `kv_store_ccb86954`
3. Find row where `key` = `admin_password`
4. Edit the `value` to: `"admin123"` (include quotes!)
5. Save
6. Try logging in with `admin123`

#### Option 2: Check if Password Data Exists

1. Go to Table Editor → `kv_store_ccb86954`
2. Look for a row with `key` = `admin_password`
3. If it doesn't exist:
   - Click **"Insert row"**
   - `key`: `admin_password`
   - `value`: `"admin123"`
   - Save

---

## 📡 CORS Errors

### **Symptom:**
- Console shows: `Access to fetch ... has been blocked by CORS policy`

### **Solution:**

This shouldn't happen if Edge Function is deployed correctly, but if it does:

1. Check that your Edge Function has CORS enabled (it should by default)
2. Redeploy the function:
   ```bash
   supabase functions deploy make-server-ccb86954
   ```

---

## 🖼️ Images Not Loading

### **Symptom:**
- Broken image icons
- Images don't appear

### **Solutions:**

#### Check URL Format
- Must start with `https://`
- Must be publicly accessible
- Recommended: Use Cloudinary

#### Test Image URL
1. Copy the image URL
2. Paste in new browser tab
3. If image doesn't load → URL is wrong or not public

#### Cloudinary Setup
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Upload image
3. Click image → Get URL
4. Copy "Secure URL" (starts with `https://res.cloudinary.com/...`)
5. Paste in admin dashboard

---

## 🌐 Website Shows But No Data

### **Symptom:**
- Website loads
- No contacts, notices, or resources visible
- No console errors

### **Solution:**

The data hasn't been initialized yet.

1. Open browser console (F12)
2. Run this command:
   ```javascript
   fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ccb86954/init', {
     method: 'POST',
     headers: {
       'Authorization': 'Bearer YOUR_ANON_KEY'
     }
   }).then(r => r.json()).then(console.log)
   ```

   Replace:
   - `YOUR_PROJECT_ID` with your Supabase project ID
   - `YOUR_ANON_KEY` with your anon public key

3. Refresh the page

---

## 🚀 Vercel Deployment Issues

### **Build Failed**

#### Symptom:
Vercel shows build errors

#### Solution:
1. Check environment variables are set in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Make sure they match your Supabase project
3. Redeploy

### **Deployed But Not Working**

#### Symptom:
- Site deploys successfully
- But shows errors or no data

#### Solutions:

1. **Check Environment Variables:**
   - Vercel Dashboard → Your Project → Settings → Environment Variables
   - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct

2. **Check Edge Function:**
   - Make sure Edge Function is deployed to Supabase
   - Verify secrets are set in Supabase

3. **Clear Vercel Cache:**
   - Vercel Dashboard → Deployments
   - Click ⋯ (three dots) → Redeploy
   - Check "Use existing build cache" → OFF
   - Click Redeploy

---

## 🔍 How to Check Logs

### **Supabase Edge Function Logs**

1. Supabase Dashboard → **Edge Functions**
2. Click `make-server-ccb86954`
3. Click **"Logs"** tab
4. See real-time errors and requests

### **Browser Console**

1. Open your website
2. Press **F12** (or right-click → Inspect)
3. Click **"Console"** tab
4. Look for red error messages

### **Vercel Logs**

1. Vercel Dashboard → Your Project
2. Click **"Deployments"**
3. Click on latest deployment
4. Click **"Functions"** or **"Runtime Logs"**

---

## ⚡ Performance Issues

### **Slow Loading**

#### Solutions:

1. **Optimize Images:**
   - Use WebP format
   - Keep images under 500KB
   - Use Cloudinary auto-optimization

2. **Check Supabase Region:**
   - Choose region closest to your users
   - Can't change after creation, but can migrate

3. **Clear Browser Cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

## 🆘 Still Having Issues?

### Checklist:

- [ ] Edge Function deployed to Supabase?
- [ ] Supabase secrets set (all 3)?
- [ ] Database table `kv_store_ccb86954` exists?
- [ ] Environment variables set in Vercel?
- [ ] Browser console showing specific errors?
- [ ] Edge Function logs showing errors?

### Getting Help:

1. **Check Console Errors:**
   - Copy the exact error message
   - Search online for that specific error

2. **Supabase Documentation:**
   - [Edge Functions Guide](https://supabase.com/docs/guides/functions)
   - [Database Setup](https://supabase.com/docs/guides/database)

3. **Vercel Documentation:**
   - [Deployment Issues](https://vercel.com/docs/deployments/troubleshoot)

4. **Community Support:**
   - [Supabase Discord](https://discord.supabase.com/)
   - [Vercel Discord](https://vercel.com/discord)

---

## 📝 Quick Reference Commands

```bash
# Login to Supabase
supabase login

# Link project
supabase link --project-ref YOUR_PROJECT_ID

# Deploy Edge Function
supabase functions deploy make-server-ccb86954

# Check Supabase CLI version
supabase --version

# Update Supabase CLI
npm install -g supabase

# Build locally
npm run build

# Run dev server
npm run dev
```

---

**Remember:** Most issues are due to:
1. ❌ Edge Function not deployed
2. ❌ Supabase secrets not set
3. ❌ Environment variables missing in Vercel

Check these three things first! ✅

---

*Last updated: January 2026*

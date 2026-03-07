# 🚀 Supabase Setup Guide

Complete guide to add database functionality to Manasi's birthday website!

## 📋 What You Get

✅ **Photo Uploads** - Friends can upload photos from their phones  
✅ **Dynamic Guestbook** - Birthday wishes saved to database  
✅ **Photo Voting** - Like/vote on photos with live counts  
✅ **Real-time Updates** - See new messages appear instantly  
✅ **Admin Moderation** - Approve photos before they go live  

---

## 🎯 Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** (free tier is perfect!)
3. Sign up with GitHub, Google, or email
4. Create a new organization (name it whatever you want)

---

## 🗄️ Step 2: Create Your Project

1. Click **"New Project"**
2. Fill in the details:
   - **Name**: `manasi-birthday` (or any name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Free tier is fine!
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup to complete ☕

---

## 🔧 Step 3: Set Up the Database

### 3.1 Run the SQL Schema

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Open the file `supabase-schema.sql` from your website folder
4. Copy ALL the SQL code
5. Paste it into the SQL Editor
6. Click **"Run"** (bottom right)
7. You should see: ✅ Success! (3 tables created, functions added, etc.)

### 3.2 Verify Tables Created

1. Click **"Table Editor"** in the left sidebar
2. You should see 3 tables:
   - ✅ `photos` - For user-uploaded photos
   - ✅ `guestbook` - For birthday messages
   - ✅ `photo_votes` - For tracking votes

### 3.3 Check Storage Bucket

1. Click **"Storage"** in the left sidebar
2. You should see a bucket called: `birthday-photos`
3. It's set to **public** (anyone can view uploaded photos)

---

## 🔑 Step 4: Get Your API Credentials

1. Click **"Project Settings"** (gear icon in left sidebar)
2. Click **"API"** in the settings menu
3. You'll see two important values:

### Copy These Values:

**Project URL:**  
Example: `https://xyzabc123.supabase.co`

**Anon/Public Key (anon key):**  
Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZ...` (long string)

⚠️ **Important**: Keep these safe! Don't share them publicly.

---

## ⚙️ Step 5: Configure Your Website

1. Open your website folder
2. Open the file: `js/supabase-config.js`
3. Find these lines near the top:

```javascript
const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL',  // Replace this
    anonKey: 'YOUR_SUPABASE_ANON_KEY'  // Replace this
};
```

4. Replace with YOUR credentials:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://xyzabc123.supabase.co',  // Your Project URL
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'  // Your Anon Key
};
```

5. Save the file!

---

## 🧪 Step 6: Test It Out!

### Test Locally First:

1. Open `index.html` in your browser (double-click the file)
2. Open browser console (F12 or right-click → Inspect → Console)
3. You should see: `✅ Supabase initialized`

### Test the Guestbook:

1. Scroll to the **"Leave a Birthday Note"** section
2. Enter your name and a test message
3. Click **"Drop it in the mailbox!"**
4. Check your Supabase dashboard:
   - Go to **Table Editor** → `guestbook`
   - You should see your message there! 🎉

### Test Photo Upload:

1. Scroll to the **"Share Your Memories"** section
2. Click **"Upload a Photo"**
3. Select an image from your computer
4. Enter your name and optional caption
5. Click **"Upload Photo"**
6. Check Supabase:
   - **Table Editor** → `photos` (will show `approved: false`)
   - **Storage** → `birthday-photos` (your image file!)

---

## ✅ Step 7: Approve Photos (Admin Only)

Photos need approval before they appear on the website:

### Manual Approval:

1. Go to **Table Editor** → `photos`
2. Find the photo you want to approve
3. Click on the row to edit
4. Change `approved` from `false` to `true`
5. Save!
6. Refresh your website - the photo now appears! ✨

### Quick Approve All Script:

If you trust everyone, run this in SQL Editor:

```sql
UPDATE photos SET approved = true WHERE approved = false;
```

---

## 📱 Step 8: Share with Friends!

### For GitHub Pages:

1. Make sure all your changes are saved
2. Commit and push to GitHub
3. Enable GitHub Pages in repository settings
4. Share the URL with friends!

### For Netlify:

1. Drag your entire website folder to [netlify.com/drop](https://netlify.com/drop)
2. Get your instant URL
3. Share with friends!

### Features for Friends:

- 📸 **Upload photos** from their phones
- 💬 **Leave birthday wishes** in the guestbook
- ❤️ **Vote** on their favorite photos
- 👀 **See real-time updates** when others post

---

## 🎨 Customization Options

### Change Photo Approval Requirement:

If you want ALL photos to appear immediately (no approval):

**Option 1**: Change in `js/photo-uploads.js`, line ~22:
```javascript
approved: true  // Change from false to true
```

**Option 2**: Modify the SQL policy:
```sql
DROP POLICY "Anyone can view approved photos" ON photos;
CREATE POLICY "Anyone can view all photos" ON photos FOR SELECT USING (true);
```

### Limit File Size:

In `js/photo-uploads.js`, line ~30:
```javascript
if (file.size > 5 * 1024 * 1024) {  // Currently 5MB
```

Change `5` to whatever size you want (in megabytes)

### Add Email Notifications:

Supabase can send you emails when photos are uploaded! Set up in:
**Database** → **Webhooks** → **Create a new hook**

---

## 🐛 Troubleshooting

### "Failed to save" error:
- Check browser console (F12) for error details
- Verify your API keys are correct in `supabase-config.js`
- Make sure you ran ALL the SQL schema

### Photos not appearing:
- Check if `approved` is set to `true` in the database
- Verify the Storage bucket is set to **public**

### "Database not connected" message:
- Make sure `supabase-config.js` has your real credentials
- Check browser console for initialization errors
- Try clearing browser cache and reload

### Guestbook falls back to localStorage:
- This means Supabase isn't connected
- Check the URL and API key again
- Make sure you're online!

---

## 📊 Monitor Usage

Check your Supabase dashboard for:

- **Database** → See all tables and data
- **Storage** → View all uploaded photos
- **Auth** → User sessions (currently not used)
- **Logs** → Debug any errors

### Free Tier Limits:

- ✅ 500 MB database storage
- ✅ 1 GB file storage
- ✅ 50,000 monthly active users
- ✅ 2 GB bandwidth

Perfect for a birthday website! 🎉

---

## 🚀 Next Steps

Want to add more features?

- 📧 **Email notifications** when friends post
- 🔐 **Password protect** the website
- 📊 **Analytics** to see who visits
- 🎵 **Background music** player
- 💾 **Backup** all messages to a file

Let me know if you want help adding any of these!

---

## 📞 Need Help?

- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)
- Issues with the code? Check browser console (F12)
- Still stuck? Just ask! 😊

---

**Made with ❤️ for Manasi's Birthday! 🎂**

Enjoy the upgraded website with full database power! 🚀

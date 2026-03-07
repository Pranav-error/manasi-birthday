# 📸 Photo Upload & Database Features - Quick Reference

## 🎯 What Was Added

### New Files Created:
1. **`js/supabase-config.js`** - Database connection and API functions
2. **`js/photo-uploads.js`** - Photo upload UI and voting system
3. **`supabase-schema.sql`** - Database structure (run this in Supabase)
4. **`SUPABASE_SETUP.md`** - Complete step-by-step setup guide

### Modified Files:
1. **`index.html`** - Added photo upload section + Supabase script
2. **`script.js`** - Added initialization for new features
3. **`js/sections.js`** - Made guestbook dynamic with database
4. **`style.css`** - Added styling for upload section

---

## 🚀 Quick Start (5 Minutes)

1. **Create Supabase account** at [supabase.com](https://supabase.com)
2. **Create new project** (choose free tier)
3. **Run SQL**: Copy all from `supabase-schema.sql` → Supabase SQL Editor → Run
4. **Get credentials**: Project Settings → API → Copy URL + Anon Key
5. **Update config**: Edit `js/supabase-config.js` with your credentials
6. **Test it**: Open `index.html` in browser, try uploading a photo!

---

## 📁 Database Tables

### `photos` table:
- Stores user-uploaded photos
- Fields: file_path, file_url, caption, uploader_name, votes, approved
- Admin must approve photos before they appear

### `guestbook` table:
- Stores birthday wishes
- Fields: guest_name, message, created_at
- Appears instantly (no approval needed)

### `photo_votes` table:
- Tracks who voted on which photos
- Prevents duplicate voting

---

## 🎨 Features

### Photo Upload:
- Friends can upload photos from any device
- Max 5MB per photo
- Supports: JPG, PNG, GIF, WEBP
- Optional captions
- Admin approval required (configurable)

### Voting System:
- ❤️ Like button on each photo
- One vote per photo per browser
- Live vote counts
- Confetti animation on vote!

### Dynamic Guestbook:
- Messages saved to database
- Real-time updates (new messages appear live)
- Falls back to localStorage if database unavailable
- Post-it note style display

---

## ⚙️ Configuration

### Make All Photos Auto-Approve:

**Option 1**: Edit `js/photo-uploads.js` line 22:
```javascript
approved: true  // Change from false
```

**Option 2**: SQL command:
```sql
UPDATE photos SET approved = true WHERE approved = false;
```

### Change File Size Limit:

Edit `js/photo-uploads.js` line 30:
```javascript
if (file.size > 5 * 1024 * 1024) {  // 5MB
```

### Disable Photo Uploads:

Remove or hide the upload section in `index.html`:
```html
<!-- Comment out this section -->
<!-- <section id="photo-upload-section" class="section">
```

---

## 🔧 Admin Tasks

### Approve a Photo:
1. Go to Supabase → Table Editor → `photos`
2. Find the photo
3. Set `approved` to `true`
4. Photo appears on website immediately!

### Approve All Photos:
```sql
UPDATE photos SET approved = true;
```

### Delete a Photo:
1. Table Editor → `photos` → Delete row
2. Storage → `birthday-photos` → Delete file

### View All Messages:
- Table Editor → `guestbook` → See all wishes

### Check Votes:
- Table Editor → `photos` → See vote counts
- Table Editor → `photo_votes` → See who voted

---

## 📱 How Friends Use It

### Upload a Photo:
1. Scroll to "Share Your Memories" section
2. Click "📤 Upload a Photo"
3. Select image from phone/computer
4. Enter name + optional caption
5. Click "Upload Photo"
6. Wait for admin approval!

### Vote on Photos:
1. Scroll to "Friend Uploads" gallery
2. Click 🤍 button to vote
3. Button turns red ❤️
4. Can only vote once per photo

### Leave a Birthday Note:
1. Scroll to "Leave a Birthday Note"
2. Enter name and message
3. Click "Drop it in the mailbox!"
4. Message appears instantly!

---

## 🐛 Common Issues

### "Database not connected" message
**Fix**: Update `js/supabase-config.js` with your Supabase credentials

### Photos uploaded but not showing
**Fix**: Photos need approval! Go to Supabase → `photos` table → Set `approved = true`

### Guestbook not saving to database
**Fix**: Check browser console (F12) for errors. Verify Supabase connection.

### "Failed to upload" error
**Fix**: 
- Check file size (max 5MB)
- Verify file type (JPG, PNG, GIF, WEBP only)
- Check Supabase Storage bucket exists

---

## 🎯 Testing Checklist

Before sharing with friends:

- [ ] Supabase project created
- [ ] SQL schema executed successfully
- [ ] API credentials added to `supabase-config.js`
- [ ] Browser console shows: `✅ Supabase initialized`
- [ ] Test guestbook message saves to database
- [ ] Test photo upload works
- [ ] Test photo approval process
- [ ] Test voting system
- [ ] Website deployed (GitHub Pages / Netlify)
- [ ] Shared link with friends! 🎉

---

## 📊 Supabase Dashboard Quick Links

- **SQL Editor**: Run queries and commands
- **Table Editor**: View/edit all data
- **Storage**: Manage uploaded files
- **API Docs**: Auto-generated API documentation
- **Logs**: Debug errors and issues

---

## 🔒 Security Notes

- ✅ Row Level Security (RLS) enabled
- ✅ Public can only view approved photos
- ✅ Voting requires browser fingerprint
- ✅ File size limits enforced
- ✅ File type validation
- ⚠️ Anon key is public (safe for frontend)
- ⚠️ Keep service_role key secret (don't use in frontend)

---

## 💡 Future Enhancements

Want to add more?

- 🎵 Photo slideshows
- 📧 Email notifications on uploads
- 🔐 Admin password protection
- 💾 Export all data to CSV
- 📊 View analytics (most voted photos)
- 🖼️ Photo filters/effects
- 📱 Mobile app version
- 🎨 Custom themes

---

## 📞 Support

Need help? Check:
1. Browser console (F12) for errors
2. Supabase dashboard logs
3. `SUPABASE_SETUP.md` for detailed guide
4. Supabase docs: [supabase.com/docs](https://supabase.com/docs)

---

**🎂 Happy Birthday Manasi! Enjoy your super-powered website! 🚀**

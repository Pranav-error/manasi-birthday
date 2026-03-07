# 🎂 Birthday Website - Now Organized & Better!

## 📁 New File Structure

```
birthday-website/
├── index.html                  # Main HTML file
├── style.css                   # All styles
├── script.js                   # Main app + effects (legacy)
├── Pictures/                   # Your media files
└── js/                         # 📦 NEW! Modular JavaScript
    ├── config.js               # All configuration & text content
    ├── media-manifest.js       # 📸 YOUR PHOTOS → CAPTIONS MAPPING
    ├── utils.js                # Helper functions
    ├── gallery.js              # Gallery sections (polaroids, carousel, etc.)
    ├── sections.js             # Interactive sections (quiz, cake, etc.)
    └── generate-manifest.js    # 🛠️ Tool to auto-generate manifest
```

## 🎯 HOW TO FIX THE PHOTO-CAPTION MISMATCH

### The Problem
Photos were randomly shuffled, so captions never matched the actual photos.

### The Solution ✨
**Use the Media Manifest!** (`js/media-manifest.js`)

### Step 1: Open `js/media-manifest.js`

You'll see sections like this:

```javascript
polaroids: [
    { file: "AHCT6765.JPG", caption: "no context needed 😂" },
    { file: "AHIZ8240.JPG", caption: "main character energy ✨" },
    // ...
],
```

### Step 2: Customize!

1. **Reorder photos** - Just cut & paste lines to rearrange
2. **Change captions** - Edit the `caption:` field
3. **Add/remove** - Delete lines or add new ones

### Step 3: Refresh!

Save the file and reload your website. Photos will now appear **IN ORDER** with the **RIGHT CAPTIONS**!

## 🎨 Quick Customization Guide

### Change Birthday Person's Name
**File:** `js/config.js`  
**Line:** `friendName: "Birthday Girl"`  
Change to: `friendName: "Sarah"` (or whatever name)

### Change Birthday Date
**File:** `js/config.js`  
**Line:** `birthday: "2000-03-15"`  
Change to: `birthday: "YYYY-MM-DD"`

### Edit Roasts
**File:** `js/config.js`  
**Section:** `roasts: [...]`  
Add/edit/remove roasts from the array

### Edit Quiz Questions
**File:** `js/config.js`  
**Section:** `quizQuestions: [...]`  
Change questions and answers

### Edit the Secret Letter
**File:** `js/config.js`  
**Section:** `letterText: \`...\``  
Rewrite the entire letter

## 🛠️ Advanced: Auto-Generate Manifest

If you add/remove lots of photos:

```bash
cd js
node generate-manifest.js
```

This will scan your `Pictures/` folder and regenerate `media-manifest.js` with ALL your photos automatically organized!

Then just edit the captions.

## 📸 Recommended Photo Counts

- **Polaroids**: 30-50 photos (with captions)
- **Carousel Row 1**: 30-50 photos
- **Carousel Row 2**: 20-40 photos  
- **Mosaic**: 50-150 photos
- **Timeline**: 20-40 photos (with date labels)

## 🎉 Features

✅ Photos match their captions  
✅ Easy to reorder photos  
✅ Organized, modular code  
✅ Auto-generate manifest from folder  
✅ All customization in one place  

## 🆘 Troubleshooting

### "No photos showing"
- Check that `Pictures/` folder exists
- Check that filenames in `media-manifest.js` match actual files
- Check browser console for errors (F12)

### "Wrong photo with caption"
- Photos appear in the order they're listed in `media-manifest.js`
- Reorder the lines to change the order

### "Want to reset everything"
Run `node js/generate-manifest.js` to regenerate from scratch

## 💡 Tips

1. **Keep it organized**: Put related photos together in the manifest
2. **Be specific**: Use meaningful captions that match the actual photo
3. **Test often**: Refresh after each change to see results
4. **Backup**: Copy `media-manifest.js` before making big changes

---

Made with 💖 and ☕

Need help? Check the code comments or regenerate the manifest!

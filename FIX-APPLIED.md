✅ FIXED THE DUPLICATE VARIABLE ERROR!

## What Was Wrong:
The error "SyntaxError: Can't create duplicate variable: '$$'" happened because the same helper functions were defined in BOTH:
- `script.js` (old file)
- `js/utils.js` (new module)

When both files loaded, JavaScript saw the same variables declared twice and crashed.

## What I Fixed:
1. ✅ Removed duplicate utility functions from `script.js` ($, $$, rand, pick, shuffle, etc.)
2. ✅ Removed duplicate CONFIG object from `script.js`
3. ✅ Removed duplicate FILES_LIST from `script.js`
4. ✅ Added a note explaining the modular structure

Now `script.js` is clean and only contains:
- Entrance/doorbell logic
- Main initialization function
- Effect functions (these will be moved to js/effects.js later)

## 🎯 Next Step:
**Refresh your browser!** The website should now load correctly with no errors. 🎉

The photos should appear in order with the correct captions from `js/media-manifest.js`.

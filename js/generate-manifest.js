#!/usr/bin/env node
/**
 * 🎨 MEDIA MANIFEST GENERATOR
 * 
 * Run this script to automatically generate a complete media-manifest.js
 * with ALL your photos from the Pictures/ folder
 * 
 * Usage:
 *   node generate-manifest.js
 * 
 * This will scan your Pictures/ folder and create a structured manifest
 * that you can then customize with your own captions and labels.
 */

const fs = require('fs');
const path = require('path');

const PICTURES_DIR = path.join(__dirname, '..', 'Pictures');
const OUTPUT_FILE = path.join(__dirname, 'media-manifest.js');

// Media type detection
const VIDEO_EXTS = ['.mp4', '.mov', '.webm', '.avi', '.mkv'];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const SKIP_EXTS = ['.heic']; // Not supported in browsers

function getFileExtension(filename) {
    return path.extname(filename).toLowerCase();
}

function isMediaFile(filename) {
    const ext = getFileExtension(filename);
    return [...VIDEO_EXTS, ...IMAGE_EXTS].includes(ext) && !SKIP_EXTS.includes(ext);
}

function scanPicturesFolder() {
    try {
        const files = fs.readdirSync(PICTURES_DIR)
            .filter(file => {
                const fullPath = path.join(PICTURES_DIR, file);
                const stats = fs.statSync(fullPath);
                return stats.isFile() && isMediaFile(file);
            })
            .sort();
        
        console.log(`✅ Found ${files.length} media files`);
        return files;
    } catch (error) {
        console.error('❌ Error reading Pictures folder:', error.message);
        process.exit(1);
    }
}

function generateManifest(files) {
    const totalFiles = files.length;
    
    // Distribute files across sections (you can adjust these ratios)
    const polaroidCount = Math.min(50, Math.floor(totalFiles * 0.2));
    const carousel1Count = Math.min(40, Math.floor(totalFiles * 0.15));
    const carousel2Count = Math.min(25, Math.floor(totalFiles * 0.1));
    const timelineCount = Math.min(30, Math.floor(totalFiles * 0.12));
    const mosaicCount = Math.min(150, totalFiles - polaroidCount - carousel1Count - carousel2Count - timelineCount);
    
    let index = 0;
    
    // Helper to get next batch of files
    const getFiles = (count) => {
        const batch = files.slice(index, index + count);
        index += count;
        return batch;
    };
    
    const polaroids = getFiles(polaroidCount);
    const carousel1 = getFiles(carousel1Count);
    const carousel2 = getFiles(carousel2Count);
    const timeline = getFiles(timelineCount);
    const mosaic = getFiles(mosaicCount);
    
    // Default captions
    const polaroidCaptions = [
        "no context needed 😂", "main character energy ✨", "she didn't know I took this 📸",
        "chaotic good 🌪️", "the audacity 💀", "living legend 👑", "pure vibes 🌈",
        "caught in 4k 📷", "this is art tbh 🎨", "before it all went wrong 😅",
        "squad goals 🫶", "unhinged behavior 🤪", "the LOOK 👀", "unbothered queen 💅",
        "core memory unlocked 🧠", "sleep deprived but make it cute 😴", "serving LOOKS 🔥",
        "why is she like this 😭", "hot girl summer ☀️", "this is what peak performance looks like 💪",
    ];
    
    const timelineLabels = [
        "Day One 👶", "The Awkward Phase™", "Glow Up Started 🌟", "First Concert Cry 🎵",
        "The Legendary Road Trip 🚗", "Birthday Bash 2.0 🎉", "Festival Chaos 🎪", "Lazy Sunday Goals 🛋️",
        "That Night We Don't Talk About 🙊", "Holiday Shenanigans 🎄", "New Year, Same Us 🥳", "Best Day EVER ⭐",
        "Random Tuesday Energy 💫", "Unplanned Adventure 🗺️", "Movie Marathon Night 🍿", "Brunch Queens 🥞",
        "Friendship Goals Achieved ✅", "Creating Core Memories 🧠", "Squad Assembled 🦸‍♀️", "Throwback to THAT 📸",
        "Golden Hour Magic 🌅", "Top Tier Hangout 🏆", "Pure Chaos Energy ⚡", "Dance Floor Legends 💃",
        "Sunset Storytelling 🌇", "Late Night Philosophy 🌙", "Sunday Funday 🎈", "Park Adventures 🌳",
        "Winter Cozy Vibes 🧣", "Spring Energy ☀️",
    ];
    
    // Generate the manifest content
    let content = `/* ═══════════════════════════════════════════════════════════════
   📸 MEDIA MANIFEST — AUTO-GENERATED
   ═══════════════════════════════════════════════════════════════
   
   ✨ This file was automatically generated from your Pictures folder
   🎯 Total files: ${totalFiles}
   📝 Edit the captions and labels to personalize!
   
   ═══════════════════════════════════════════════════════════════ */

const MEDIA_MANIFEST = {
    
    // 📸 POLAROID WALL (${polaroids.length} photos)
    polaroids: [
`;
    
    polaroids.forEach((file, i) => {
        const caption = polaroidCaptions[i % polaroidCaptions.length];
        content += `        { file: "${file}", caption: "${caption}" },\n`;
    });
    
    content += `    ],
    
    // 🎞️ CAROUSEL ROW 1 (${carousel1.length} photos)
    carouselRow1: [
`;
    
    carousel1.forEach(file => {
        content += `        { file: "${file}" },\n`;
    });
    
    content += `    ],
    
    // 🎞️ CAROUSEL ROW 2 (${carousel2.length} photos)
    carouselRow2: [
`;
    
    carousel2.forEach(file => {
        content += `        { file: "${file}" },\n`;
    });
    
    content += `    ],
    
    // 🖼️ MOSAIC GALLERY (${mosaic.length} photos)
    mosaic: [
`;
    
    mosaic.forEach(file => {
        content += `        { file: "${file}" },\n`;
    });
    
    content += `    ],
    
    // 📅 TIMELINE (${timeline.length} photos)
    timeline: [
`;
    
    timeline.forEach((file, i) => {
        const label = timelineLabels[i % timelineLabels.length];
        content += `        { file: "${file}", label: "${label}" },\n`;
    });
    
    content += `    ],
};

// Default captions (fallback if manifest is empty)
const DEFAULT_POLAROID_CAPTIONS = ${JSON.stringify(polaroidCaptions, null, 4)};

const DEFAULT_TIMELINE_LABELS = ${JSON.stringify(timelineLabels, null, 4)};
`;
    
    return content;
}

// Main execution
console.log('🎨 Generating Media Manifest...\n');
const files = scanPicturesFolder();
const manifest = generateManifest(files);

fs.writeFileSync(OUTPUT_FILE, manifest, 'utf8');
console.log(`\n✅ Generated: ${OUTPUT_FILE}`);
console.log('\n💡 Next steps:');
console.log('   1. Open js/media-manifest.js');
console.log('   2. Customize captions for your photos');
console.log('   3. Reorder photos if needed');
console.log('   4. Refresh your website!\n');

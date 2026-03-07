#!/usr/bin/env node
/**
 * 📋 PHOTO ASSIGNMENT VIEWER
 * 
 * Run this to see which photos are assigned to which sections
 * Helps you verify your media-manifest.js configuration
 * 
 * Usage:
 *   node view-assignments.js
 */

// Read the media manifest
const manifestPath = './media-manifest.js';
let MEDIA_MANIFEST, DEFAULT_POLAROID_CAPTIONS, DEFAULT_TIMELINE_LABELS;

try {
    const manifestCode = require('fs').readFileSync(manifestPath, 'utf8');
    eval(manifestCode);
} catch (error) {
    console.error('❌ Error loading media-manifest.js:', error.message);
    process.exit(1);
}

console.log('\n🎨 ═══════════════════════════════════════════════════════');
console.log('   PHOTO ASSIGNMENTS SUMMARY');
console.log('═══════════════════════════════════════════════════════\n');

// Polaroids
console.log(`📸 POLAROIDS (${MEDIA_MANIFEST.polaroids.length} photos)`);
console.log('─'.repeat(60));
MEDIA_MANIFEST.polaroids.slice(0, 5).forEach((photo, i) => {
    console.log(`   ${i + 1}. ${photo.file}`);
    console.log(`      → "${photo.caption}"`);
});
if (MEDIA_MANIFEST.polaroids.length > 5) {
    console.log(`   ... and ${MEDIA_MANIFEST.polaroids.length - 5} more\n`);
} else {
    console.log('');
}

// Carousel Row 1
console.log(`🎞️  CAROUSEL ROW 1 (${MEDIA_MANIFEST.carouselRow1.length} photos)`);
console.log('─'.repeat(60));
MEDIA_MANIFEST.carouselRow1.slice(0, 5).forEach((photo, i) => {
    console.log(`   ${i + 1}. ${photo.file}`);
});
if (MEDIA_MANIFEST.carouselRow1.length > 5) {
    console.log(`   ... and ${MEDIA_MANIFEST.carouselRow1.length - 5} more\n`);
} else {
    console.log('');
}

// Carousel Row 2
console.log(`🎞️  CAROUSEL ROW 2 (${MEDIA_MANIFEST.carouselRow2.length} photos)`);
console.log('─'.repeat(60));
MEDIA_MANIFEST.carouselRow2.slice(0, 5).forEach((photo, i) => {
    console.log(`   ${i + 1}. ${photo.file}`);
});
if (MEDIA_MANIFEST.carouselRow2.length > 5) {
    console.log(`   ... and ${MEDIA_MANIFEST.carouselRow2.length - 5} more\n`);
} else {
    console.log('');
}

// Mosaic
console.log(`🖼️  MOSAIC GALLERY (${MEDIA_MANIFEST.mosaic.length} photos)`);
console.log('─'.repeat(60));
MEDIA_MANIFEST.mosaic.slice(0, 5).forEach((photo, i) => {
    console.log(`   ${i + 1}. ${photo.file}`);
});
if (MEDIA_MANIFEST.mosaic.length > 5) {
    console.log(`   ... and ${MEDIA_MANIFEST.mosaic.length - 5} more\n`);
} else {
    console.log('');
}

// Timeline
console.log(`📅 TIMELINE (${MEDIA_MANIFEST.timeline.length} photos)`);
console.log('─'.repeat(60));
MEDIA_MANIFEST.timeline.slice(0, 5).forEach((photo, i) => {
    console.log(`   ${i + 1}. ${photo.file}`);
    console.log(`      → "${photo.label}"`);
});
if (MEDIA_MANIFEST.timeline.length > 5) {
    console.log(`   ... and ${MEDIA_MANIFEST.timeline.length - 5} more\n`);
} else {
    console.log('');
}

// Summary
const totalAssigned = 
    MEDIA_MANIFEST.polaroids.length +
    MEDIA_MANIFEST.carouselRow1.length +
    MEDIA_MANIFEST.carouselRow2.length +
    MEDIA_MANIFEST.mosaic.length +
    MEDIA_MANIFEST.timeline.length;

console.log('═══════════════════════════════════════════════════════');
console.log(`📊 TOTAL PHOTOS ASSIGNED: ${totalAssigned}`);
console.log('═══════════════════════════════════════════════════════\n');

console.log('💡 To edit assignments:');
console.log('   1. Open js/media-manifest.js');
console.log('   2. Reorder, add, or remove photos');
console.log('   3. Edit captions and labels');
console.log('   4. Save and refresh your website!\n');

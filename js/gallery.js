/* ═══════════════════════════════════════════════════════════════
   📸 PHOTO GALLERY SECTIONS
   Polaroids, Carousels, Mosaic, Timeline
   ═══════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────
   POLAROID WALL 📸
   ────────────────────────────────────────────────────────────── */
function generatePolaroids() {
    const container = $('#polaroid-container');
    const photos = MEDIA_MANIFEST.polaroids;
    
    if (!photos || photos.length === 0) {
        console.warn('⚠️ No polaroids defined in MEDIA_MANIFEST. Add photos to js/media-manifest.js');
        return;
    }
    
    photos.forEach((photo) => {
        const pol = document.createElement('div');
        pol.className = 'polaroid reveal';
        pol.style.setProperty('--rot', rand(-8, 8) + 'deg');
        pol.style.setProperty('--tape-rot', rand(-10, 10) + 'deg');

        const mediaWrap = createMediaElement(photo.file, {
            containerStyle: 'width:100%;height:150px;overflow:hidden;border:1px solid #eee;'
        });
        pol.appendChild(mediaWrap);

        const caption = document.createElement('div');
        caption.className = 'polaroid-caption';
        caption.textContent = photo.caption || 'Memory ✨';
        pol.appendChild(caption);

        pol.addEventListener('click', () => openLightbox(photo.file));
        container.appendChild(pol);
    });
}

/* ──────────────────────────────────────────────────────────────
   CAROUSEL 🎞️
   ────────────────────────────────────────────────────────────── */
function generateCarousel() {
    const track1 = $('#carousel-track');
    const track2 = $('#carousel-track-2');
    const row1 = MEDIA_MANIFEST.carouselRow1;
    const row2 = MEDIA_MANIFEST.carouselRow2;
    
    if (!row1 || row1.length === 0) {
        console.warn('⚠️ No carousel row 1 photos defined in MEDIA_MANIFEST');
        return;
    }
    if (!row2 || row2.length === 0) {
        console.warn('⚠️ No carousel row 2 photos defined in MEDIA_MANIFEST');
        return;
    }

    // Duplicate for infinite scroll effect
    [...row1, ...row1].forEach(photo => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        const media = createMediaElement(photo.file, {
            containerStyle: 'width:100%;height:100%;'
        });
        item.appendChild(media);
        item.addEventListener('click', () => openLightbox(photo.file));
        track1.appendChild(item);
    });

    [...row2, ...row2].forEach(photo => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        const media = createMediaElement(photo.file, {
            containerStyle: 'width:100%;height:100%;'
        });
        item.appendChild(media);
        item.addEventListener('click', () => openLightbox(photo.file));
        track2.appendChild(item);
    });
}

/* ──────────────────────────────────────────────────────────────
   MOSAIC GALLERY 🖼️
   ────────────────────────────────────────────────────────────── */
function generateMosaic() {
    const grid = $('#mosaic-grid');
    const photos = MEDIA_MANIFEST.mosaic;
    
    if (!photos || photos.length === 0) {
        console.warn('⚠️ No mosaic photos defined in MEDIA_MANIFEST');
        return;
    }

    photos.forEach((photo, i) => {
        const tile = document.createElement('div');
        tile.className = 'mosaic-tile reveal';
        
        // Random span classes for visual interest
        if (i % 7 === 0) tile.classList.add('span-2');
        else if (i % 11 === 0) tile.classList.add('span-h');
        else if (i % 13 === 0) tile.classList.add('span-v');

        const media = createMediaElement(photo.file, {
            containerStyle: 'width:100%;height:100%;'
        });
        tile.appendChild(media);
        tile.addEventListener('click', () => openLightbox(photo.file));
        grid.appendChild(tile);
    });
}

/* ──────────────────────────────────────────────────────────────
   TIMELINE 📅
   ────────────────────────────────────────────────────────────── */
function generateTimeline() {
    const container = $('#timeline-container');
    const photos = MEDIA_MANIFEST.timeline;
    
    if (!photos || photos.length === 0) {
        console.warn('⚠️ No timeline photos defined in MEDIA_MANIFEST');
        return;
    }

    photos.forEach((photo) => {
        const entry = document.createElement('div');
        entry.className = 'timeline-entry';
        
        const card = document.createElement('div');
        card.className = 'timeline-card';

        const mediaWrap = createMediaElement(photo.file, {
            containerStyle: 'width:100%;height:180px;overflow:hidden;'
        });
        card.appendChild(mediaWrap);

        const textDiv = document.createElement('div');
        textDiv.className = 'timeline-text';
        textDiv.innerHTML = `
            <div class="timeline-label">${photo.label || 'Memory ✨'}</div>
            <div class="timeline-desc">A moment we'll never forget ✨</div>
        `;
        card.appendChild(textDiv);

        entry.appendChild(card);
        entry.addEventListener('click', () => openLightbox(photo.file));
        container.appendChild(entry);
    });
}

/* ──────────────────────────────────────────────────────────────
   LIGHTBOX 🖼️
   ────────────────────────────────────────────────────────────── */
let currentLightboxFile = '';
let allMediaFiles = [];

function setupLightbox() {
    // Collect all media files for navigation
    allMediaFiles = [
        ...MEDIA_MANIFEST.polaroids.map(p => p.file),
        ...MEDIA_MANIFEST.carouselRow1.map(p => p.file),
        ...MEDIA_MANIFEST.carouselRow2.map(p => p.file),
        ...MEDIA_MANIFEST.mosaic.map(p => p.file),
        ...MEDIA_MANIFEST.timeline.map(p => p.file),
    ].filter((v, i, a) => a.indexOf(v) === i); // unique only
    
    const lightbox = $('#lightbox');
    $('#lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    $('#lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });

    $('#lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('lightbox-hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

function openLightbox(filename) {
    currentLightboxFile = filename;
    updateLightbox();
    $('#lightbox').classList.remove('lightbox-hidden');
    document.body.style.overflow = 'hidden';
}

function navigateLightbox(direction) {
    const currentIndex = allMediaFiles.indexOf(currentLightboxFile);
    if (currentIndex === -1) return;
    
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = allMediaFiles.length - 1;
    if (newIndex >= allMediaFiles.length) newIndex = 0;
    
    currentLightboxFile = allMediaFiles[newIndex];
    updateLightbox();
}

function updateLightbox() {
    const img = $('#lightbox-img');
    const caption = $('#lightbox-caption');

    // Remove any existing video
    const oldVid = document.querySelector('#lightbox .lightbox-video');
    if (oldVid) oldVid.remove();

    const path = mediaPath(currentLightboxFile);

    if (isVideo(currentLightboxFile)) {
        img.style.display = 'none';
        const vid = document.createElement('video');
        vid.className = 'lightbox-video';
        vid.src = path;
        vid.controls = true;
        vid.autoplay = true;
        vid.style.cssText = 'max-width:85vw;max-height:85vh;border-radius:12px;border:4px solid white;box-shadow:0 20px 60px rgba(0,0,0,0.5);';
        img.parentElement.insertBefore(vid, img);
        
        const currentIndex = allMediaFiles.indexOf(currentLightboxFile);
        caption.textContent = `🎬 ${currentIndex + 1} / ${allMediaFiles.length}`;
    } else {
        img.style.display = '';
        img.src = path;
        
        const currentIndex = allMediaFiles.indexOf(currentLightboxFile);
        caption.textContent = `📸 ${currentIndex + 1} / ${allMediaFiles.length}`;
    }
}

function closeLightbox() {
    $('#lightbox').classList.add('lightbox-hidden');
    document.body.style.overflow = '';
    const vid = document.querySelector('#lightbox .lightbox-video');
    if (vid) {
        vid.pause();
        vid.remove();
    }
    $('#lightbox-img').style.display = '';
}

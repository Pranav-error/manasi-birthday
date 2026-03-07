/* ═══════════════════════════════════════════════════════════════
   📸 PHOTO UPLOAD SECTION
   ═══════════════════════════════════════════════════════════════
   
   This file handles user photo uploads and voting functionality.
   ═══════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────
   PHOTO UPLOAD
   ────────────────────────────────────────────────────────────── */

function setupPhotoUpload() {
    const uploadSection = $('#photo-upload-section');
    if (!uploadSection) return;

    const uploadBtn = $('#upload-photo-btn');
    const fileInput = $('#photo-file-input');
    const previewContainer = $('#upload-preview');
    const uploadForm = $('#photo-upload-form');
    const uploaderName = $('#uploader-name');
    const photoCaption = $('#photo-caption');
    const submitBtn = $('#submit-photo-btn');
    const cancelBtn = $('#cancel-upload-btn');

    let selectedFile = null;

    // Trigger file input when button clicked
    uploadBtn?.addEventListener('click', () => {
        fileInput?.click();
    });

    // Handle file selection
    fileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please select an image file (JPG, PNG, GIF, or WEBP)');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB');
            return;
        }

        selectedFile = file;
        showPreview(file);
        uploadForm?.classList.add('visible');
    });

    // Show image preview
    function showPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewContainer.innerHTML = `
                <img src="${e.target.result}" alt="Preview" class="upload-preview-img">
            `;
        };
        reader.readAsDataURL(file);
    }

    // Handle submit
    submitBtn?.addEventListener('click', async () => {
        if (!selectedFile) return;

        const name = uploaderName.value.trim();
        const caption = photoCaption.value.trim();

        if (!name) {
            alert('Please enter your name!');
            return;
        }

        // Check if Supabase is available
        if (typeof supabaseClient === 'undefined' || !supabaseClient) {
            alert('Photo upload requires database connection. Please contact the admin!');
            return;
        }

        // Disable button during upload
        submitBtn.disabled = true;
        submitBtn.textContent = 'Uploading...';

        const result = await uploadPhoto(selectedFile, caption, name);

        if (result.success) {
            launchConfetti(50);
            alert(`🎉 Photo uploaded successfully! Scroll down to see it in the gallery!`);
            
            // Reload gallery to show new photo
            setupUploadedPhotosGallery();
            
            // Reset form
            selectedFile = null;
            fileInput.value = '';
            uploaderName.value = '';
            photoCaption.value = '';
            previewContainer.innerHTML = '';
            uploadForm?.classList.remove('visible');
        } else {
            alert(`Failed to upload photo: ${result.error}`);
        }

        submitBtn.disabled = false;
        submitBtn.textContent = 'Upload Photo 📸';
    });

    // Handle cancel
    cancelBtn?.addEventListener('click', () => {
        selectedFile = null;
        fileInput.value = '';
        uploaderName.value = '';
        photoCaption.value = '';
        previewContainer.innerHTML = '';
        uploadForm?.classList.remove('visible');
    });
}

/* ──────────────────────────────────────────────────────────────
   USER UPLOADED PHOTOS GALLERY
   ────────────────────────────────────────────────────────────── */

async function setupUploadedPhotosGallery() {
    const gallery = $('#uploaded-photos-gallery');
    if (!gallery) return;

    // Check if Supabase is available
    if (typeof supabaseClient === 'undefined' || !supabaseClient) {
        gallery.innerHTML = '<p style="text-align: center; color: #888;">Database not connected</p>';
        return;
    }

    // Load all photos (approved = true)
    const result = await getPhotos(true);
    
    if (!result.success) {
        gallery.innerHTML = '<p style="text-align: center; color: #888;">Failed to load photos</p>';
        return;
    }

    // Clear gallery before re-rendering
    gallery.innerHTML = '';

    if (result.data.length === 0) {
        gallery.innerHTML = '<p class="no-photos-msg">No photos uploaded yet. Be the first! 📸</p>';
        return;
    }

    // Get voter fingerprint
    const voterFingerprint = getVoterFingerprint();

    // Display photos
    result.data.forEach(photo => {
        const photoCard = createUploadedPhotoCard(photo, voterFingerprint);
        gallery.appendChild(photoCard);
    });

    // Subscribe to real-time updates
    subscribeToPhotos((payload) => {
        if (payload.eventType === 'UPDATE' && payload.new.approved) {
            // Refresh gallery when new photos are approved
            setupUploadedPhotosGallery();
        }
    });
}

function createUploadedPhotoCard(photo, voterFingerprint) {
    const card = document.createElement('div');
    card.className = 'uploaded-photo-card';
    card.dataset.photoId = photo.id;

    // Check if user already voted (from localStorage)
    const votedPhotos = JSON.parse(localStorage.getItem('votedPhotos') || '[]');
    const hasVoted = votedPhotos.includes(photo.id);

    card.innerHTML = `
        <div class="uploaded-photo-wrapper">
            <img src="${photo.file_url}" alt="${photo.caption || 'Uploaded photo'}" class="uploaded-photo-img">
        </div>
        ${photo.caption ? `<p class="uploaded-photo-caption">${photo.caption}</p>` : ''}
        <div class="uploaded-photo-meta">
            <span class="photo-uploader">📷 ${photo.uploader_name}</span>
            <button class="vote-btn ${hasVoted ? 'voted' : ''}" data-photo-id="${photo.id}" ${hasVoted ? 'disabled' : ''}>
                ${hasVoted ? '❤️' : '🤍'} ${photo.votes}
            </button>
        </div>
    `;

    // Add vote handler
    const voteBtn = card.querySelector('.vote-btn');
    voteBtn.addEventListener('click', async () => {
        if (hasVoted) return;

        voteBtn.disabled = true;
        const result = await votePhoto(photo.id, 1);

        if (result.success) {
            voteBtn.textContent = `❤️ ${photo.votes + 1}`;
            voteBtn.classList.add('voted');
            
            // Save to localStorage
            votedPhotos.push(photo.id);
            localStorage.setItem('votedPhotos', JSON.stringify(votedPhotos));

            launchConfetti(15);
        } else {
            voteBtn.disabled = false;
            alert('Failed to vote. Please try again!');
        }
    });

    return card;
}

/* ──────────────────────────────────────────────────────────────
   UTILITIES
   ────────────────────────────────────────────────────────────── */

function getVoterFingerprint() {
    // Get or create a unique fingerprint for this browser
    let fingerprint = localStorage.getItem('voterFingerprint');
    if (!fingerprint) {
        fingerprint = 'voter_' + Date.now() + '_' + Math.random().toString(36).substring(7);
        localStorage.setItem('voterFingerprint', fingerprint);
    }
    return fingerprint;
}

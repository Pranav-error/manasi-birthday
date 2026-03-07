/* ═══════════════════════════════════════════════════════════════
   🗄️ SUPABASE CONFIGURATION
   ═══════════════════════════════════════════════════════════════ */

// ⚠️ IMPORTANT: Replace these with your actual Supabase credentials
// Get them from: https://app.supabase.com → Your Project → Settings → API

const SUPABASE_CONFIG = {
    url: 'https://dorwjagmlrdgoazuhray.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcndqYWdtbHJkZ29henVocmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4OTg0ODUsImV4cCI6MjA4ODQ3NDQ4NX0.x-F_q8YStVwYamAdH9LuRa8hvXTf2px3NbDn0E8HQQ8'
};

// Initialize Supabase client (loaded from CDN in index.html)
let supabaseClient;

function initSupabase() {
    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase library not loaded! Make sure to include it in index.html');
        return false;
    }
    
    // Access the supabase object from the global namespace
    const { createClient } = window.supabase;
    supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('✅ Supabase initialized');
    return true;
}

/* ═══════════════════════════════════════════════════════════════
   📸 PHOTO UPLOAD & MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */

async function uploadPhoto(file, caption, uploaderName) {
    try {
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `user-uploads/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabaseClient.storage
            .from('birthday-photos')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabaseClient.storage
            .from('birthday-photos')
            .getPublicUrl(filePath);

        // Save metadata to database
        const { data, error } = await supabaseClient
            .from('photos')
            .insert([
                {
                    file_path: filePath,
                    file_url: urlData.publicUrl,
                    caption: caption,
                    uploader_name: uploaderName,
                    votes: 0,
                    approved: true  // Auto-approve for friends
                }
            ])
            .select();

        if (error) throw error;

        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error uploading photo:', error);
        return { success: false, error: error.message };
    }
}

async function getPhotos(approved = true) {
    try {
        const { data, error } = await supabaseClient
            .from('photos')
            .select('*')
            .eq('approved', approved)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching photos:', error);
        return { success: false, error: error.message };
    }
}

async function votePhoto(photoId, increment = 1) {
    try {
        const { data, error } = await supabaseClient.rpc('increment_photo_votes', {
            photo_id: photoId,
            vote_change: increment
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error voting photo:', error);
        return { success: false, error: error.message };
    }
}

/* ═══════════════════════════════════════════════════════════════
   💬 GUESTBOOK MESSAGES
   ═══════════════════════════════════════════════════════════════ */

async function addGuestbookMessage(name, message) {
    try {
        const { data, error } = await supabaseClient
            .from('guestbook')
            .insert([
                {
                    guest_name: name,
                    message: message
                }
            ])
            .select();

        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error adding guestbook message:', error);
        return { success: false, error: error.message };
    }
}

async function getGuestbookMessages() {
    try {
        const { data, error } = await supabaseClient
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching guestbook messages:', error);
        return { success: false, error: error.message };
    }
}

/* ═══════════════════════════════════════════════════════════════
   📊 REAL-TIME SUBSCRIPTIONS
   ═══════════════════════════════════════════════════════════════ */

function subscribeToGuestbook(callback) {
    return supabaseClient
        .channel('guestbook-changes')
        .on('postgres_changes', 
            { event: 'INSERT', schema: 'public', table: 'guestbook' },
            (payload) => {
                console.log('New guestbook message:', payload);
                callback(payload.new);
            }
        )
        .subscribe();
}

function subscribeToPhotos(callback) {
    return supabaseClient
        .channel('photos-changes')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'photos' },
            (payload) => {
                console.log('Photo updated:', payload);
                callback(payload);
            }
        )
        .subscribe();
}

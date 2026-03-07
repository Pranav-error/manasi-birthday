-- ═══════════════════════════════════════════════════════════════
-- 🗄️ SUPABASE DATABASE SCHEMA
-- ═══════════════════════════════════════════════════════════════
-- 
-- Run this SQL in Supabase SQL Editor:
-- https://app.supabase.com → SQL Editor → New Query
--
-- ═══════════════════════════════════════════════════════════════

-- 📸 PHOTOS TABLE
-- Stores user-uploaded photos with metadata
CREATE TABLE IF NOT EXISTS photos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    caption TEXT,
    uploader_name TEXT NOT NULL,
    votes INTEGER DEFAULT 0,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 💬 GUESTBOOK TABLE
-- Stores birthday wishes from friends
CREATE TABLE IF NOT EXISTS guestbook (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 🎯 PHOTO VOTES TABLE
-- Track individual votes (prevents duplicate voting from same user)
CREATE TABLE IF NOT EXISTS photo_votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    photo_id UUID REFERENCES photos(id) ON DELETE CASCADE,
    voter_fingerprint TEXT NOT NULL,  -- Browser fingerprint or session ID
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(photo_id, voter_fingerprint)
);

-- ═══════════════════════════════════════════════════════════════
-- 🔧 FUNCTIONS
-- ═══════════════════════════════════════════════════════════════

-- Function to increment photo votes
CREATE OR REPLACE FUNCTION increment_photo_votes(photo_id UUID, vote_change INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE photos 
    SET votes = votes + vote_change,
        updated_at = NOW()
    WHERE id = photo_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ═══════════════════════════════════════════════════════════════
-- ⚡ TRIGGERS
-- ═══════════════════════════════════════════════════════════════

-- Auto-update updated_at on photos table
DROP TRIGGER IF EXISTS update_photos_updated_at ON photos;
CREATE TRIGGER update_photos_updated_at
    BEFORE UPDATE ON photos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════
-- 🔒 ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════

-- Disable RLS for photos (open access for friends)
ALTER TABLE photos DISABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook DISABLE ROW LEVEL SECURITY;
ALTER TABLE photo_votes DISABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════
-- 📦 STORAGE BUCKET
-- ═══════════════════════════════════════════════════════════════

-- Create storage bucket for photos (public access)
INSERT INTO storage.buckets (id, name, public)
VALUES ('birthday-photos', 'birthday-photos', true)
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 🎨 INDEXES (for better performance)
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_photos_approved ON photos(approved);
CREATE INDEX IF NOT EXISTS idx_photos_created_at ON photos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON guestbook(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_photo_votes_photo_id ON photo_votes(photo_id);

-- ═══════════════════════════════════════════════════════════════
-- ✅ DONE!
-- ═══════════════════════════════════════════════════════════════
-- 
-- Next steps:
-- 1. Copy your Supabase URL and Anon Key
-- 2. Update js/supabase-config.js with your credentials
-- 3. Test the connection!

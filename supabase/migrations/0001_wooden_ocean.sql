/*
  # Initial Schema Setup

  1. Tables
    - users (managed by Supabase Auth)
    - professionals
      - Professional profiles with their information
    - blog_posts
      - Community blog entries
    - comments
      - Comments on blog posts
    - live_streams
      - Live streaming sessions
    - resources
      - Educational resources and materials
    - contact_requests
      - User contact form submissions
    - events
      - Community events and workshops

  2. Security
    - Enable RLS on all tables
    - Set up appropriate access policies
*/

-- Professionals table
CREATE TABLE IF NOT EXISTS professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  image_url text NOT NULL,
  bio text NOT NULL,
  years_experience integer NOT NULL,
  specialties text[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES auth.users(id),
  title text NOT NULL,
  content text NOT NULL,
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Live streams table
CREATE TABLE IF NOT EXISTS live_streams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid REFERENCES auth.users(id),
  title text NOT NULL,
  description text NOT NULL,
  stream_url text,
  recording_url text,
  scheduled_for timestamptz NOT NULL,
  ended_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL, -- 'pdf', 'audio', 'image', 'video'
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contact requests table
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  professional_id uuid REFERENCES professionals(id),
  problem_description text NOT NULL,
  preferred_contact_time text NOT NULL,
  contact_info jsonb NOT NULL,
  is_emergency boolean DEFAULT false,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  event_date timestamptz NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public professionals are viewable by everyone" ON professionals
  FOR SELECT USING (true);

CREATE POLICY "Users can create blog posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Authors can update their posts" ON blog_posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can comment" ON comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Live streams are viewable by everyone" ON live_streams
  FOR SELECT USING (true);

CREATE POLICY "Resources are viewable by everyone" ON resources
  FOR SELECT USING (true);

CREATE POLICY "Users can create contact requests" ON contact_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

-- Insert sample professional profiles
INSERT INTO professionals (name, image_url, bio, years_experience, specialties) VALUES
(
  'Dra. María González',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
  'Especialista en trauma y recuperación emocional con amplia experiencia en terapia cognitivo-conductual.',
  15,
  ARRAY['Trauma', 'Ansiedad', 'Depresión']
),
(
  'Lic. Ana Martínez',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  'Terapeuta especializada en violencia de género y empoderamiento femenino.',
  8,
  ARRAY['Violencia de Género', 'Autoestima', 'Empoderamiento']
),
(
  'Dra. Carmen Rodríguez',
  'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80&w=400',
  'Psicóloga clínica con enfoque en terapia familiar y relaciones interpersonales.',
  12,
  ARRAY['Terapia Familiar', 'Relaciones', 'Duelo']
);
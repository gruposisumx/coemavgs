/*
  # Add advanced features

  1. New Tables
    - `user_profiles` - Extended user profile information
    - `blog_badges` - User achievement badges
    - `event_attendees` - Event registration and reminders
    - `blog_comments` - Blog post comments
    - `home_blocks` - Homepage content blocks

  2. Changes
    - Add new columns to existing tables
    - Add relationships between tables

  3. Security
    - Enable RLS on new tables
    - Add appropriate policies
*/

-- User profiles extension
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  display_name text,
  bio text,
  avatar_url text,
  location text,
  interests text[],
  social_links jsonb,
  notification_preferences jsonb DEFAULT '{"email":true,"blog":true,"events":true,"messages":true}'::jsonb,
  privacy_settings jsonb DEFAULT '{"showEmail":false,"showLocation":true,"showSocial":true}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog badges system
CREATE TABLE IF NOT EXISTS blog_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon_url text NOT NULL,
  criteria jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id uuid REFERENCES auth.users(id),
  badge_id uuid REFERENCES blog_badges(id),
  awarded_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);

-- Event attendance
CREATE TABLE IF NOT EXISTS event_attendees (
  event_id uuid REFERENCES events(id),
  user_id uuid REFERENCES auth.users(id),
  status text NOT NULL CHECK (status IN ('registered', 'attended', 'cancelled')),
  reminder_sent boolean DEFAULT false,
  registered_at timestamptz DEFAULT now(),
  PRIMARY KEY (event_id, user_id)
);

-- Blog comments
CREATE TABLE IF NOT EXISTS blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Homepage blocks
CREATE TABLE IF NOT EXISTS home_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('hero', 'features', 'testimonials', 'cta', 'stats', 'team', 'contact')),
  content text NOT NULL,
  enabled boolean DEFAULT true,
  "order" integer NOT NULL,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_blocks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view badges"
  ON blog_badges FOR SELECT
  USING (true);

CREATE POLICY "Users can view their badges"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events"
  ON event_attendees FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view event attendees"
  ON event_attendees FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their event registration"
  ON event_attendees FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can comment on posts"
  ON blog_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can view comments"
  ON blog_comments FOR SELECT
  USING (true);

CREATE POLICY "Users can edit their comments"
  ON blog_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Everyone can view home blocks"
  ON home_blocks FOR SELECT
  USING (true);

-- Insert sample badges
INSERT INTO blog_badges (name, description, icon_url, criteria) VALUES
('Bienvenida', 'Únete a nuestra comunidad', '/badges/welcome.svg', '{"type":"join"}'::jsonb),
('Escritora', 'Publica tu primera entrada', '/badges/writer.svg', '{"type":"post","count":1}'::jsonb),
('Comentarista', 'Participa en las conversaciones', '/badges/commenter.svg', '{"type":"comment","count":5}'::jsonb),
('Inspiradora', 'Recibe 50 likes en tus publicaciones', '/badges/inspiring.svg', '{"type":"likes","count":50}'::jsonb);

-- Add functions for badge awards
CREATE OR REPLACE FUNCTION check_and_award_badges()
RETURNS trigger AS $$
BEGIN
  -- Check post count badges
  IF NOT EXISTS (
    SELECT 1 FROM user_badges 
    WHERE user_id = NEW.author_id 
    AND badge_id = (SELECT id FROM blog_badges WHERE criteria->>'type' = 'post')
  ) THEN
    INSERT INTO user_badges (user_id, badge_id)
    SELECT NEW.author_id, id
    FROM blog_badges
    WHERE criteria->>'type' = 'post'
    AND (SELECT COUNT(*) FROM blog_posts WHERE author_id = NEW.author_id) >= (criteria->>'count')::int;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_badges_on_post
AFTER INSERT ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION check_and_award_badges();
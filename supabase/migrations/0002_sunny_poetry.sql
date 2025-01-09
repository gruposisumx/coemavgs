/*
  # Add Missing Tables and Data

  1. New Tables
    - resources
    - events
  
  2. Initial Data
    - Sample resources
    - Sample events
*/

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('pdf', 'audio', 'image', 'video')),
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  event_date timestamptz NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'resources'
  ) THEN
    ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Resources are viewable by everyone" ON resources FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'events'
  ) THEN
    ALTER TABLE events ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Events are viewable by everyone" ON events FOR SELECT USING (true);
  END IF;
END $$;

-- Insert initial data if tables are empty
INSERT INTO resources (title, description, type, url)
SELECT 
  'Guía de Autoayuda',
  'Recursos prácticos para el manejo del estrés y la ansiedad',
  'pdf',
  'https://example.com/guia.pdf'
WHERE NOT EXISTS (SELECT 1 FROM resources);

INSERT INTO events (title, description, location, event_date, image_url)
SELECT 
  'Taller de Empoderamiento',
  'Aprende herramientas prácticas para fortalecer tu autoestima',
  'Centro Comunitario',
  NOW() + interval '7 days',
  'https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&q=80&w=400'
WHERE NOT EXISTS (SELECT 1 FROM events);
/*
  # Tablas para gestión de recursos y profesionales

  1. Nuevas Tablas
    - `staff_resources`: Almacena recursos gestionados por el staff
    - `staff_professionals`: Gestión de perfiles profesionales
  
  2. Seguridad
    - RLS habilitado en todas las tablas
    - Políticas específicas para staff
*/

CREATE TABLE IF NOT EXISTS staff_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('text', 'video', 'audio', 'image')),
  category text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  status text NOT NULL DEFAULT 'visible',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS staff_professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  speciality text NOT NULL,
  experience_years integer NOT NULL,
  description text NOT NULL,
  email text NOT NULL UNIQUE,
  profile_image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE staff_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_professionals ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Recursos visibles para todos" ON staff_resources
  FOR SELECT USING (status = 'visible');

CREATE POLICY "Profesionales visibles para todos" ON staff_professionals
  FOR SELECT USING (true);
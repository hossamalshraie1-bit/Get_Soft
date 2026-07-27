-- ================================================================
-- GET SOFT — Supabase Full Database Schema & RLS Setup
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. جدول المشاريع (projects)
-- =============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('web', 'mobile', 'system', 'uiux', 'ecommerce', 'other')),
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  imagekit_file_id TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  client TEXT,
  project_url TEXT,
  year INTEGER,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "projects_public_read" ON projects;
DROP POLICY IF EXISTS "projects_admin_all" ON projects;
DROP POLICY IF EXISTS "projects_allow_all" ON projects;
DROP POLICY IF EXISTS "projects_full_access" ON projects;
CREATE POLICY "projects_full_access" ON projects FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- 2. جدول الخدمات (services)
-- =============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  price_from TEXT,
  popular BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "services_public_read" ON services;
DROP POLICY IF EXISTS "services_admin_all" ON services;
DROP POLICY IF EXISTS "services_allow_all" ON services;
DROP POLICY IF EXISTS "services_full_access" ON services;
CREATE POLICY "services_full_access" ON services FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- 3. جدول آراء العملاء (testimonials)
-- =============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  position TEXT,
  company TEXT,
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "testimonials_public_read" ON testimonials;
DROP POLICY IF EXISTS "testimonials_admin_all" ON testimonials;
DROP POLICY IF EXISTS "testimonials_allow_all" ON testimonials;
DROP POLICY IF EXISTS "testimonials_full_access" ON testimonials;
CREATE POLICY "testimonials_full_access" ON testimonials FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- 4. جدول إعدادات الموقع (site_settings)
-- =============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "settings_public_read" ON site_settings;
DROP POLICY IF EXISTS "settings_admin_all" ON site_settings;
DROP POLICY IF EXISTS "settings_allow_all" ON site_settings;
DROP POLICY IF EXISTS "settings_full_access" ON site_settings;
CREATE POLICY "settings_full_access" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- 5. جدول فريق العمل (team)
-- =============================================
CREATE TABLE IF NOT EXISTS team (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  imagekit_file_id TEXT,
  email TEXT,
  social_linkedin TEXT,
  social_github TEXT,
  social_twitter TEXT,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE team ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "team_public_read" ON team;
DROP POLICY IF EXISTS "team_admin_all" ON team;
DROP POLICY IF EXISTS "team_allow_all" ON team;
DROP POLICY IF EXISTS "team_full_access" ON team;
CREATE POLICY "team_full_access" ON team FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- 6. جدول الإحصائيات (stats)
-- =============================================
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0
);

ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "stats_public_read" ON stats;
DROP POLICY IF EXISTS "stats_admin_all" ON stats;
DROP POLICY IF EXISTS "stats_allow_all" ON stats;
DROP POLICY IF EXISTS "stats_full_access" ON stats;
CREATE POLICY "stats_full_access" ON stats FOR ALL USING (true) WITH CHECK (true);

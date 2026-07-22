-- =============================================
-- GET SOFT — Supabase Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. جدول المشاريع (Portfolio)
-- =============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('web', 'mobile', 'system', 'uiux', 'ecommerce', 'other')),
  image_url TEXT,
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

-- =============================================
-- 2. جدول الشهادات / آراء العملاء
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

-- =============================================
-- 3. جدول أعضاء الفريق
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

-- =============================================
-- 4. جدول الرسائل / التواصل
-- =============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 5. جدول الإحصائيات
-- =============================================
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0
);

-- =============================================
-- 6. جدول الخدمات
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

-- =============================================
-- 7. جدول إعدادات الموقع
-- =============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Triggers لتحديث updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- projects: قراءة عامة، كتابة للمشرفين فقط
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_public_read" ON projects FOR SELECT USING (true);
CREATE POLICY "projects_admin_all" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- testimonials: قراءة عامة للنشطين فقط
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "testimonials_public_read" ON testimonials FOR SELECT USING (active = true);
CREATE POLICY "testimonials_admin_all" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- team: قراءة عامة للنشطين فقط
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
CREATE POLICY "team_public_read" ON team FOR SELECT USING (active = true);
CREATE POLICY "team_admin_all" ON team FOR ALL USING (auth.role() = 'authenticated');

-- messages: كتابة عامة، قراءة للمشرفين فقط
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messages_public_insert" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "messages_admin_all" ON messages FOR ALL USING (auth.role() = 'authenticated');

-- stats: قراءة عامة
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "stats_public_read" ON stats FOR SELECT USING (true);
CREATE POLICY "stats_admin_all" ON stats FOR ALL USING (auth.role() = 'authenticated');

-- services: قراءة عامة
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services_public_read" ON services FOR SELECT USING (active = true);
CREATE POLICY "services_admin_all" ON services FOR ALL USING (auth.role() = 'authenticated');

-- site_settings: قراءة عامة
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "settings_admin_all" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- Seed Data — بيانات تجريبية
-- =============================================

-- الإحصائيات
INSERT INTO stats (label, value, icon, display_order) VALUES
  ('مشروع منجز', '+150', '🚀', 1),
  ('عميل راضٍ', '+80', '🤝', 2),
  ('سنوات خبرة', '+5', '⭐', 3),
  ('تقنية متقنة', '+20', '💻', 4);

-- الخدمات
INSERT INTO services (title, description, icon, features, popular, display_order) VALUES
  (
    'تطوير مواقع الويب',
    'نبني مواقع ويب احترافية وسريعة باستخدام أحدث التقنيات مثل Next.js وReact لضمان أفضل تجربة مستخدم وتحسين محركات البحث.',
    '🌐',
    ARRAY['Next.js & React', 'تصميم متجاوب', 'تحسين SEO', 'أداء عالي', 'لوحة تحكم'],
    true,
    1
  ),
  (
    'تطوير تطبيقات الموبايل',
    'نطور تطبيقات موبايل احترافية لنظامَي iOS وAndroid باستخدام React Native وFlutter للحصول على تجربة مستخدم استثنائية.',
    '📱',
    ARRAY['iOS & Android', 'React Native / Flutter', 'UI/UX احترافي', 'إشعارات فورية', 'تكامل APIs'],
    false,
    2
  ),
  (
    'تطوير الأنظمة المؤسسية',
    'نصمم وننفذ أنظمة إدارة متكاملة تناسب احتياجات شركتك، من ERP وCRM إلى أنظمة المخازن والمحاسبة.',
    '⚙️',
    ARRAY['ERP & CRM', 'إدارة المخازن', 'التقارير والإحصائيات', 'صلاحيات متعددة', 'دعم فني مستمر'],
    false,
    3
  ),
  (
    'تصميم UI/UX',
    'نصمم واجهات مستخدم جذابة وسهلة الاستخدام تجمع بين الجمال البصري والوظائف العملية لتحقيق أفضل تجربة للمستخدم.',
    '🎨',
    ARRAY['تصميم Figma', 'Prototyping', 'تجربة مستخدم UX', 'هوية بصرية', 'دليل التصميم'],
    false,
    4
  ),
  (
    'التجارة الإلكترونية',
    'نبني متاجر إلكترونية متكاملة مع بوابات دفع آمنة وإدارة مخزون ذكية وتجربة تسوق سلسة تزيد من مبيعاتك.',
    '🛒',
    ARRAY['بوابات دفع آمنة', 'إدارة المنتجات', 'تتبع الطلبات', 'تقارير المبيعات', 'SEO للمتاجر'],
    false,
    5
  ),
  (
    'الاستضافة والصيانة',
    'نوفر خدمات استضافة موثوقة وسريعة مع صيانة دورية وتحديثات منتظمة لضمان استمرارية عمل موقعك على مدار الساعة.',
    '🔧',
    ARRAY['استضافة سحابية', 'شهادة SSL مجانية', 'نسخ احتياطية', 'مراقبة 24/7', 'دعم فني فوري'],
    false,
    6
  );

-- آراء العملاء
INSERT INTO testimonials (name, position, company, content, rating, display_order) VALUES
  (
    'أحمد العمري',
    'المدير التنفيذي',
    'شركة الريادة التجارية',
    'تعاملنا مع Get Soft لتطوير نظام إدارة متكامل لشركتنا. النتيجة كانت مذهلة، الفريق محترف جداً والتسليم في الوقت المحدد. أنصح بهم بشدة.',
    5,
    1
  ),
  (
    'سارة المحمد',
    'مديرة التسويق',
    'متجر الأناقة',
    'صمموا لنا متجراً إلكترونياً رائعاً زاد من مبيعاتنا بنسبة 200%. التصميم احترافي والأداء ممتاز. سنتعاون معهم دائماً.',
    5,
    2
  ),
  (
    'خالد الزهراني',
    'مؤسس',
    'تطبيق توصيل السريع',
    'طوروا تطبيق التوصيل الخاص بنا بشكل رائع. واجهة المستخدم سلسة والأداء قوي. الفريق استجاب لكل طلباتنا باحترافية عالية.',
    5,
    3
  );

-- بيانات الفريق
INSERT INTO team (name, role, bio, display_order) VALUES
  ('محمد الغامدي', 'المدير التقني', 'خبرة أكثر من 8 سنوات في تطوير البرمجيات والأنظمة المؤسسية. متخصص في Next.js وNode.js وقواعد البيانات.', 1),
  ('ليلى الشمري', 'مصممة UI/UX', 'مصممة إبداعية بخبرة 6 سنوات في تصميم واجهات المستخدم. متخصصة في Figma وتجربة المستخدم.', 2),
  ('عمر السعد', 'مطور موبايل', 'مطور تطبيقات موبايل محترف بخبرة 5 سنوات في React Native وFlutter. نفّذ أكثر من 40 تطبيقاً ناجحاً.', 3),
  ('نورة الحربي', 'مديرة المشاريع', 'خبيرة في إدارة المشاريع التقنية بشهادة PMP. تضمن تسليم المشاريع في الوقت المحدد بأعلى جودة.', 4);

-- إعدادات الموقع
INSERT INTO site_settings (key, value) VALUES
  ('phone', '+966 50 000 0000'),
  ('email', 'info@getsoft.sa'),
  ('address', 'الرياض، المملكة العربية السعودية'),
  ('whatsapp', '+966500000000'),
  ('instagram', 'getsoft_sa'),
  ('twitter', 'getsoft_sa'),
  ('linkedin', 'getsoft'),
  ('working_hours', 'الأحد - الخميس: 9 صباحاً - 6 مساءً');

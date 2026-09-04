-- =============================================
-- TABLA: projects
-- =============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  type TEXT NOT NULL,
  location TEXT,
  distance_info TEXT,
  min_area_m2 INTEGER,
  total_price NUMERIC(12,2),
  down_payment NUMERIC(12,2),
  monthly_payment NUMERIC(12,2),
  monthly_months INTEGER,
  financing_info TEXT,
  amenities TEXT[],
  highlights TEXT[],
  hero_image_url TEXT,
  gallery_urls TEXT[],
  masterplan_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLA: leads
-- =============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  project_slug TEXT REFERENCES projects(slug),
  source TEXT DEFAULT 'web',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  stage TEXT NOT NULL DEFAULT 'nuevo',
  assigned_to UUID REFERENCES auth.users(id),
  priority TEXT DEFAULT 'normal',
  notes TEXT,
  next_followup_at TIMESTAMPTZ,
  contacted_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  lost_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLA: lead_activities
-- =============================================
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL,
  content TEXT,
  stage_from TEXT,
  stage_to TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLA: plot_units
-- =============================================
CREATE TABLE IF NOT EXISTS plot_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_slug TEXT REFERENCES projects(slug),
  unit_code TEXT NOT NULL,
  svg_element_id TEXT,
  area_m2 NUMERIC(8,2),
  price NUMERIC(12,2),
  status TEXT DEFAULT 'disponible',
  floor_plan_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_slug, unit_code)
);

-- =============================================
-- ÍNDICES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
CREATE INDEX IF NOT EXISTS idx_leads_project ON leads(project_slug);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activities_lead ON lead_activities(lead_id);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE plot_units ENABLE ROW LEVEL SECURITY;

-- Policies para leads
CREATE POLICY "Team can view all leads"
  ON leads FOR ALL TO authenticated USING (true);

CREATE POLICY "Anyone can create lead"
  ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Policies para activities
CREATE POLICY "Team can view all activities"
  ON lead_activities FOR ALL TO authenticated USING (true);

-- Policies para projects (públicos)
CREATE POLICY "Projects are public"
  ON projects FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Team can manage projects"
  ON projects FOR ALL TO authenticated USING (true);

-- Policies para plot_units (públicos)
CREATE POLICY "Plot units are public"
  ON plot_units FOR SELECT TO anon, authenticated USING (true);

-- =============================================
-- FUNCIÓN updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- SEED: 3 proyectos activos
-- =============================================
INSERT INTO projects (slug, name, tagline, description, type, location, distance_info, min_area_m2, total_price, down_payment, monthly_payment, financing_info, amenities, highlights, is_active, sort_order)
VALUES
(
  'silencia', 'Silencia', 'Donde la calma echa raíces.',
  'Un desarrollo de lotes residenciales en armonía con la naturaleza queretana. Espacios diseñados para quienes buscan tranquilidad sin alejarse de la ciudad.',
  'lote', 'Querétaro, QRO', '10 min del Parque Industrial Querétaro · Carretera 57 Qro-SLP',
  150, NULL, 26000, 3500,
  'Financiamiento directo sin intereses',
  ARRAY['Servicios progresivos', 'Propiedad privada', 'Libre construcción'],
  ARRAY['Lotes desde 150 m²', 'Enganche desde $26,000', 'Mensualidades desde $3,500', 'Financiamiento sin intereses', 'Entorno natural', 'Escrituración incluida'],
  true, 1
),
(
  'centenario', 'El Centenario', 'Invierte en tu futuro, en el lugar correcto.',
  'Desarrollo de lotes en una ubicación estratégica entre Corregidora y Guanajuato, con servicios y amenidades de primer nivel.',
  'lote', 'Entre Corregidora y Guanajuato', '20 min de Santa Bárbara · Junto a instalaciones Guardia Nacional',
  150, 340000, 20000, 3500,
  'Financiamiento directo sin intereses',
  ARRAY['Plaza comercial', 'Polideportivo', 'Centro médico'],
  ARRAY['Lotes desde 150 m²', 'Costo total $340,000', 'Enganche desde $20,000', 'Mensualidades desde $3,500', 'Financiamiento sin intereses', 'Servicios progresivos'],
  true, 2
),
(
  'acacia', 'Acacia', 'Tu nuevo comienzo está aquí.',
  'Casas de una planta con diseño moderno y funcional. Tu hogar propio con financiamiento directo y los mejores precios del mercado queretano.',
  'casa', 'Querétaro, QRO', '10 min del Parque Industrial Querétaro · Carretera 57',
  63, 1170000, 150000, 12000,
  'Primeros 12 meses sin intereses. Financiamiento directo disponible.',
  ARRAY['Cochera', 'Patio de servicio', 'Cocina equipada'],
  ARRAY['Casa 1 planta', 'Terreno 112 m² (7x16m)', 'Construcción 63 m²', '2 recámaras · 1 baño completo', 'Sala · Comedor · Cocina equipada', 'Enganche $150,000', '12 mensualidades de $12,000 sin intereses'],
  true, 3
)
ON CONFLICT (slug) DO NOTHING;

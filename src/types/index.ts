export interface Project {
  id?: string
  slug: 'silencia' | 'centenario' | 'acacia'
  name: string
  tagline: string
  description?: string
  type: 'lote' | 'casa'
  location: string
  distance_info: string
  min_area_m2: number
  total_price: number | null
  down_payment: number
  monthly_payment: number
  monthly_months?: number
  financing_info: string
  amenities: string[]
  highlights: string[]
  hero_image_url?: string
  gallery_urls?: string[]
  masterplan_url?: string
  is_active?: boolean
  sort_order?: number
}

export type LeadStage =
  | 'nuevo'
  | 'contactado'
  | 'cotizacion'
  | 'seguimiento'
  | 'ganado'
  | 'perdido'

export type LeadPriority = 'alta' | 'normal' | 'baja'

export type LeadSource =
  | 'web'
  | 'landing_silencia'
  | 'landing_centenario'
  | 'landing_acacia'
  | 'meta_ads'
  | 'whatsapp'
  | 'referido'

export interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  message?: string
  project_slug?: string
  source: LeadSource
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  stage: LeadStage
  assigned_to?: string
  priority: LeadPriority
  notes?: string
  next_followup_at?: string
  contacted_at?: string
  closed_at?: string
  lost_reason?: string
  created_at: string
  updated_at: string
}

export type ActivityType =
  | 'llamada'
  | 'whatsapp'
  | 'email'
  | 'nota'
  | 'stage_change'
  | 'cita'

export interface LeadActivity {
  id: string
  lead_id: string
  user_id?: string
  type: ActivityType
  content?: string
  stage_from?: string
  stage_to?: string
  created_at: string
}

export interface PlotUnit {
  id: string
  project_slug: string
  unit_code: string
  svg_element_id?: string
  area_m2?: number
  price?: number
  status: 'disponible' | 'reservado' | 'vendido'
  floor_plan_url?: string
  notes?: string
}

export interface CRMStats {
  stage: LeadStage
  total_leads: number
  new_this_week: number
  silencia: number
  centenario: number
  acacia: number
}

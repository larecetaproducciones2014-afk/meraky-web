import type { Project } from '../types'

export const projects: Project[] = [
  {
    slug: 'silencia',
    name: 'Silencia',
    tagline: 'Donde la calma echa raíces.',
    description: 'Un desarrollo de lotes residenciales en armonía con la naturaleza queretana. Espacios diseñados para quienes buscan tranquilidad sin alejarse de la ciudad.',
    type: 'lote',
    location: 'Querétaro, QRO',
    distance_info: '10 min del Parque Industrial Querétaro · Carretera 57 Qro-SLP',
    min_area_m2: 150,
    total_price: null,
    down_payment: 26000,
    monthly_payment: 3500,
    financing_info: 'Financiamiento directo sin intereses',
    amenities: ['Servicios progresivos', 'Propiedad privada', 'Libre construcción'],
    highlights: [
      'Lotes desde 150 m²',
      'Enganche desde $26,000',
      'Mensualidades desde $3,500',
      'Financiamiento sin intereses',
      'Entorno natural',
      'Escrituración incluida',
    ],
    hero_image_url: '/images/silencia/hero.jpg',
    gallery_urls: [],
    masterplan_url: '/maps/silencia-masterplan.svg',
    is_active: true,
    sort_order: 1,
  },
  {
    slug: 'centenario',
    name: 'El Centenario',
    tagline: 'Invierte en tu futuro, en el lugar correcto.',
    description: 'Desarrollo de lotes en una ubicación estratégica entre Corregidora y Guanajuato, con servicios y amenidades de primer nivel.',
    type: 'lote',
    location: 'Entre Corregidora y Guanajuato',
    distance_info: '20 min de Santa Bárbara · Junto a instalaciones Guardia Nacional',
    min_area_m2: 150,
    total_price: 340000,
    down_payment: 20000,
    monthly_payment: 3500,
    financing_info: 'Financiamiento directo sin intereses',
    amenities: ['Plaza comercial', 'Polideportivo', 'Centro médico'],
    highlights: [
      'Lotes desde 150 m²',
      'Costo total $340,000',
      'Enganche desde $20,000',
      'Mensualidades desde $3,500',
      'Financiamiento sin intereses',
      'Servicios progresivos',
    ],
    hero_image_url: '/images/centenario/hero.jpg',
    gallery_urls: [],
    masterplan_url: '/maps/centenario-masterplan.svg',
    is_active: true,
    sort_order: 2,
  },
  {
    slug: 'acacia',
    name: 'Acacia',
    tagline: 'Tu nuevo comienzo está aquí.',
    description: 'Casas de una planta con diseño moderno y funcional. Tu hogar propio con financiamiento directo y los mejores precios del mercado queretano.',
    type: 'casa',
    location: 'Querétaro, QRO',
    distance_info: '10 min del Parque Industrial Querétaro · Carretera 57',
    min_area_m2: 63,
    total_price: 1170000,
    down_payment: 150000,
    monthly_payment: 12000,
    monthly_months: 12,
    financing_info: 'Primeros 12 meses sin intereses. Financiamiento directo disponible.',
    amenities: ['Cochera', 'Patio de servicio', 'Cocina equipada'],
    highlights: [
      'Casa 1 planta',
      'Terreno 112 m² (7x16m)',
      'Construcción 63 m²',
      '2 recámaras · 1 baño completo',
      'Sala · Comedor · Cocina equipada',
      'Enganche $150,000',
      '12 mensualidades de $12,000 sin intereses',
    ],
    hero_image_url: '/images/acacia/hero.jpg',
    gallery_urls: [],
    masterplan_url: '/maps/acacia-masterplan.svg',
    is_active: true,
    sort_order: 3,
  },
]

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const WHATSAPP_NUMBER = '524427111960'

export const getWhatsAppLink = (text?: string) => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

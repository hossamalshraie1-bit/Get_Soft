'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  { key: 'all', label: 'الكل' },
  { key: 'web', label: 'مواقع الويب' },
  { key: 'mobile', label: 'تطبيقات' },
  { key: 'system', label: 'أنظمة' },
  { key: 'ecommerce', label: 'متاجر' },
]

const CATEGORY_LABELS = {
  web: 'تطوير ويب',
  mobile: 'تطبيق موبايل',
  system: 'نظام مؤسسي',
  uiux: 'تصميم UI/UX',
  ecommerce: 'متجر إلكتروني',
  other: 'أخرى',
}

// Placeholder projects when DB is empty
const DEMO_PROJECTS = [
  {
    id: 1,
    title: 'منصة التجارة الإلكترونية الذكية',
    category: 'ecommerce',
    image_url: null,
    tech_stack: ['Next.js', 'Supabase', 'Stripe'],
    client: 'متجر الأناقة',
    year: 2024,
  },
  {
    id: 2,
    title: 'تطبيق إدارة المطاعم',
    category: 'mobile',
    image_url: null,
    tech_stack: ['React Native', 'Node.js', 'MongoDB'],
    client: 'سلسلة مطاعم النخبة',
    year: 2024,
  },
  {
    id: 3,
    title: 'نظام ERP للشركات',
    category: 'system',
    image_url: null,
    tech_stack: ['React', 'PostgreSQL', 'Python'],
    client: 'شركة الريادة التجارية',
    year: 2023,
  },
  {
    id: 4,
    title: 'موقع وكالة سفر احترافي',
    category: 'web',
    image_url: null,
    tech_stack: ['Next.js', 'Tailwind', 'Supabase'],
    client: 'وكالة الأفق للسفر',
    year: 2024,
  },
  {
    id: 5,
    title: 'تطبيق توصيل السريع',
    category: 'mobile',
    image_url: null,
    tech_stack: ['Flutter', 'Firebase', 'Google Maps'],
    client: 'خدمة التوصيل',
    year: 2023,
  },
  {
    id: 6,
    title: 'موقع عيادة طبية متكامل',
    category: 'web',
    image_url: null,
    tech_stack: ['Next.js', 'Supabase', 'Stripe'],
    client: 'عيادة الرعاية الصحية',
    year: 2024,
  },
]

// Project color themes for placeholder
const CARD_THEMES = [
  { bg: 'linear-gradient(135deg, #1a0e00, #3d2b00)', text: '#e8c97a' },
  { bg: 'linear-gradient(135deg, #000d1a, #003366)', text: '#82aaff' },
  { bg: 'linear-gradient(135deg, #0a0012, #2d0055)', text: '#c792ea' },
  { bg: 'linear-gradient(135deg, #00120a, #004d20)', text: '#52e396' },
  { bg: 'linear-gradient(135deg, #120000, #550000)', text: '#f07178' },
  { bg: 'linear-gradient(135deg, #100800, #403000)', text: '#febc2e' },
]

function ProjectCard({ project, index }) {
  const theme = CARD_THEMES[index % CARD_THEMES.length]
  const categoryLabel = CATEGORY_LABELS[project.category] || project.category

  return (
    <article
      className="project-card"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      {/* Image */}
      <div className="project-card__image">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={`مشروع ${project.title}`}
            loading="lazy"
            itemProp="image"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: theme.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ fontSize: '3rem', opacity: 0.8 }}>
              {project.category === 'web' ? '🌐' :
               project.category === 'mobile' ? '📱' :
               project.category === 'system' ? '⚙️' :
               project.category === 'ecommerce' ? '🛒' : '💻'}
            </div>
            <div style={{ color: theme.text, fontSize: '0.8rem', fontWeight: 600, textAlign: 'center', padding: '0 20px' }}>
              {project.title}
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="project-card__body">
        <div className="project-card__category">{categoryLabel}</div>
        <h3 className="project-card__title" itemProp="name">{project.title}</h3>
        {project.client && (
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
            العميل: <span style={{ color: 'var(--gold-primary)' }}>{project.client}</span>
          </p>
        )}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="project-card__tech">
            {project.tech_stack.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

// ── Mobile Auto-Scrolling Carousel ──────────────────────────────────────────
function MobileCarousel({ projects }) {
  const trackRef = useRef(null)
  const isPaused = useRef(false)
  const posRef = useRef(0)
  const rafRef = useRef(null)
  const SPEED = 0.5 // px per frame

  const tick = useCallback(() => {
    if (!trackRef.current) return
    if (!isPaused.current) {
      posRef.current += SPEED
      const trackWidth = trackRef.current.scrollWidth / 2
      if (posRef.current >= trackWidth) posRef.current = 0
      trackRef.current.style.transform = `translateX(${posRef.current}px)`
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  const pause = () => { isPaused.current = true }
  const resume = () => { isPaused.current = false }

  // Duplicate projects for seamless loop
  const doubled = [...projects, ...projects]

  return (
    <div
      className="mobile-carousel"
      onMouseDown={pause}
      onMouseUp={resume}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      aria-label="معرض الأعمال — حرك للجانبين"
    >
      <div className="mobile-carousel__track" ref={trackRef}>
        {doubled.map((project, index) => (
          <div key={index} className="mobile-carousel__item">
            <ProjectCard project={project} index={index % projects.length} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function Portfolio({ projects = [], preview = false, hideHeader = false }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const displayProjects = projects.length > 0 ? projects : DEMO_PROJECTS
  const limit = preview ? 6 : displayProjects.length

  const filtered = activeFilter === 'all'
    ? displayProjects.slice(0, limit)
    : displayProjects.filter(p => p.category === activeFilter).slice(0, limit)

  return (
    <section className="section" id="portfolio" aria-labelledby="portfolio-heading">
      <div className="container">
        {/* Section Title */}
        {!hideHeader && (
          <div className="section-title reveal">
            <div className="section-title__tag">🎨 أعمالنا</div>
            <h2 className="section-title__heading" id="portfolio-heading">
              مشاريع <span className="text-gradient">نفخر</span> بها
            </h2>
            <div className="gold-divider" />
            <p className="section-title__description">
              نماذج من أفضل المشاريع التي أنجزناها لعملائنا في مختلف القطاعات.
            </p>
          </div>
        )}

        {/* Filter — desktop only, or full portfolio page */}
        {!preview && (
          <div className="portfolio-filter" role="tablist" aria-label="فلتر المشاريع">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                role="tab"
                aria-selected={activeFilter === cat.key}
                className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.key)}
                id={`filter-${cat.key}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Desktop Grid — always on portfolio page, hidden on home mobile */}
        <div className={`portfolio-grid ${preview ? 'portfolio-grid--desktop' : ''}`}>
          {filtered.map((project, index) => (
            <ProjectCard key={project.id || index} project={project} index={index} />
          ))}
        </div>

        {/* Mobile Auto-Scrolling Carousel — home page only */}
        {preview && <MobileCarousel projects={displayProjects.slice(0, limit)} />}

        {/* View All */}
        {preview && (
          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link href="/portfolio" className="btn btn-secondary btn--lg" id="view-all-portfolio">
              عرض جميع المشاريع ←
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

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



// Project color themes for placeholder cards
const CARD_THEMES = [
  { bg: 'linear-gradient(135deg, #1a0e00, #3d2b00)', text: '#e8c97a' },
  { bg: 'linear-gradient(135deg, #000d1a, #003366)', text: '#82aaff' },
  { bg: 'linear-gradient(135deg, #0a0012, #2d0055)', text: '#c792ea' },
  { bg: 'linear-gradient(135deg, #00120a, #004d20)', text: '#52e396' },
  { bg: 'linear-gradient(135deg, #120000, #550000)', text: '#f07178' },
  { bg: 'linear-gradient(135deg, #100800, #403000)', text: '#febc2e' },
]

function ProjectCard({ project, index, onSelect }) {
  const theme = CARD_THEMES[index % CARD_THEMES.length]
  const categoryLabel = CATEGORY_LABELS[project.category] || project.category

  // Resolve main image URL from image_url or images list
  let displayImage = project.image_url
  if (!displayImage && project.images) {
    if (Array.isArray(project.images) && project.images.length > 0) {
      displayImage = project.images[0]
    } else if (typeof project.images === 'string' && project.images.trim().length > 0) {
      displayImage = project.images.split(',')[0].trim()
    }
  }

  const techList = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : typeof project.tech_stack === 'string' && project.tech_stack.length > 0
      ? project.tech_stack.split(',').map((t) => t.trim())
      : []

  return (
    <article
      className="project-card"
      itemScope
      itemType="https://schema.org/CreativeWork"
      onClick={() => onSelect && onSelect(project)}
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div className="project-card__image">
        {displayImage ? (
          <img src={displayImage} alt={`مشروع ${project.title}`} loading="lazy" itemProp="image" />
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
              {project.category === 'web'
                ? '🌐'
                : project.category === 'mobile'
                  ? '📱'
                  : project.category === 'system'
                    ? '⚙️'
                    : project.category === 'ecommerce'
                      ? '🛒'
                      : '💻'}
            </div>
            <div style={{ color: theme.text, fontSize: '0.85rem', fontWeight: 700, textAlign: 'center', padding: '0 20px' }}>
              {project.title}
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      {/* <div className="project-card__body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="project-card__category">{categoryLabel}</div>
        <h3 className="project-card__title" itemProp="name">
          {project.title}
        </h3>

        {project.client && (
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
            العميل: <span style={{ color: 'var(--gold-primary)' }}>{project.client}</span>
          </p>
        )}

        {project.description && (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {project.description}
          </p>
        )}

        {techList.length > 0 && (
          <div className="project-card__tech" style={{ marginTop: 'auto', marginBottom: 'var(--space-3)' }}>
            {techList.map((tech, i) => (
              <span key={i} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', marginTop: techList.length > 0 ? 0 : 'auto' }}>
          <button
            type="button"
            className="btn btn-secondary btn--sm"
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', gap: '4px' }}
            onClick={(e) => {
              e.stopPropagation()
              onSelect && onSelect(project)
            }}
          >
            👁️ تفاصيل المشروع
          </button>

          {/* {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn--sm"
              style={{ justifyContent: 'center', fontSize: '0.8rem', padding: '0 12px' }}
              onClick={(e) => e.stopPropagation()}
              title="معاينة رابط المشروع المباشر"
            >
              🔗 زيارة ↗
            </a>
          )} */}
      {/* </div> */}
      {/* </div>  */}
    </article>
  )
}

// ── Project Modal Component ──────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) return null

  // Extract all images
  // Robust extraction of all project images
  let allImages = []
  const addImage = (url) => {
    if (!url) return
    let clean = String(url).trim()
    clean = clean.replace(/^[\[\]"'`\s]+|[\[\]"'`\s]+$/g, '')
    if (clean && (clean.startsWith('http') || clean.startsWith('/') || clean.startsWith('data:')) && !allImages.includes(clean)) {
      allImages.push(clean)
    }
  }

  if (project.image_url) addImage(project.image_url)

  if (project.images) {
    let rawImages = project.images
    if (typeof rawImages === 'string') {
      try {
        if (rawImages.trim().startsWith('[')) {
          rawImages = JSON.parse(rawImages)
        }
      } catch (e) { }
    }

    if (Array.isArray(rawImages)) {
      rawImages.forEach(addImage)
    } else if (typeof rawImages === 'string') {
      rawImages.split(',').forEach(addImage)
    }
  }

  const categoryLabel = CATEGORY_LABELS[project.category] || project.category

  const techList = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : typeof project.tech_stack === 'string' && project.tech_stack.length > 0
      ? project.tech_stack.split(',').map((t) => t.trim())
      : []

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم ورحمة الله، أود الاستفسار وطلب مشروع مماثل لـ: ${project.title}`
  )
  const whatsappUrl = `https://wa.me/967776158797?text=${whatsappMessage}`

  const handleNextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % allImages.length)
  }

  const handlePrevImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        className="project-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-primary, #0d0f17)',
          border: '1px solid var(--gold-border, rgba(212, 175, 55, 0.3))',
          borderRadius: '20px',
          maxWidth: '720px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إغلاق"
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 10,
            background: 'rgba(0,0,0,0.65)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            transition: 'all 0.2s ease',
          }}
        >
          ✕
        </button>

        {/* Image Slider / Gallery */}
        <div className="project-modal-gallery">
          {allImages.length > 0 ? (
            <div className="project-modal-image-wrapper">
              <img
                src={allImages[currentImgIndex]}
                alt={`${project.title} - صورة ${currentImgIndex + 1}`}
                className="project-modal-image"
                onClick={() => window.open(allImages[currentImgIndex], '_blank')}
                title="انقر لعرض الصورة بحجمها الكامل والتكبير في المتصفح"
                style={{ cursor: 'zoom-in' }}
              />

              {allImages.length > 1 && (
                <>
                  {/* Prev Arrow */}
                  <button
                    onClick={handlePrevImage}
                    className="project-modal-arrow project-modal-arrow--prev"
                    aria-label="الصورة السابقة"
                    title="الصورة السابقة"
                  >
                    ➔
                  </button>

                  {/* Next Arrow */}
                  <button
                    onClick={handleNextImage}
                    className="project-modal-arrow project-modal-arrow--next"
                    aria-label="الصورة التالية"
                    title="الصورة التالية"
                  >
                    ⬅
                  </button>

                  {/* Counter Badge */}
                  <div className="project-modal-counter">
                    {currentImgIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              لا تتوفر صور إضافية لهذا المشروع
            </div>
          )}

          {/* Thumbnails strip */}
          {allImages.length > 1 && (
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: '10px 16px',
                background: 'rgba(10,12,18,0.95)',
                overflowX: 'auto',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  style={{
                    border: currentImgIndex === idx ? '2px solid var(--gold-primary)' : '2px solid transparent',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    width: '60px',
                    height: '45px',
                    padding: 0,
                    cursor: 'pointer',
                    opacity: currentImgIndex === idx ? 1 : 0.5,
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body / Details */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'var(--bg-secondary)', color: 'var(--gold-primary)', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
              {categoryLabel}
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {project.title}
            </h2>
          </div>

          {(project.client || project.year) && (
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-card)', paddingBottom: '12px' }}>
              {project.client && (
                <div>
                  👤 العميل: <span style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>{project.client}</span>
                </div>
              )}
              {project.year && (
                <div>
                  📅 سنة الإنجاز: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{project.year}</span>
                </div>
              )}
            </div>
          )}

          {project.description && (
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-primary)', marginBottom: '6px' }}>
                📝 تفاصيل المشروع:
              </h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                {project.description}
              </p>
            </div>
          )}

          {techList.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-primary)', marginBottom: '8px' }}>
                🛠️ التقنيات المستخدمة:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {techList.map((tech, i) => (
                  <span key={i} className="tech-tag" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-card)' }}>
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ flex: 1, minWidth: '180px', justifyContent: 'center' }}
              >
                🔗 معاينة التطبيق / الموقع
              </a>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ flex: 1, minWidth: '180px', justifyContent: 'center', borderColor: '#25D366', color: '#25D366' }}
            >
              💬 طلب مشروع مماثل عبر الواتساب
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Auto-Scrolling Carousel for Desktop & iPad / Tablets ─────────────────────
function AutoProjectsCarousel({ projects, onSelect }) {
  const containerRef = useRef(null)
  const isPaused = useRef(false)
  const directionRef = useRef(1) // 1 = scroll forward, -1 = scroll backward

  const handleScroll = (dir) => {
    if (!containerRef.current) return
    const cardWidth = 389 // 365px + 24px gap
    const scrollAmount = dir === 'next' ? -cardWidth : cardWidth
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let animationFrameId
    const speed = 0.8

    const autoScroll = () => {
      if (!isPaused.current && el) {
        const maxScroll = el.scrollWidth - el.clientWidth

        // If content fits inside the container (fewer items), keep static!
        if (maxScroll > 10) {
          const currentScroll = Math.abs(el.scrollLeft)

          if (currentScroll >= maxScroll - 5) {
            directionRef.current = -1 // Turn back to start
          } else if (currentScroll <= 5) {
            directionRef.current = 1 // Go forward to end
          }

          el.scrollLeft -= speed * directionRef.current
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll)
    }

    animationFrameId = requestAnimationFrame(autoScroll)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div
      className="portfolio-carousel-wrapper"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
      onTouchStart={() => (isPaused.current = true)}
      onTouchEnd={() => (isPaused.current = false)}
    >
      {/* Controls Header */}
      <div className="portfolio-slider-controls">
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: 'auto', alignSelf: 'center' }}>
          ✨ تمرير تلقائي مفعل (توقف بالمؤشر للمعاينة) ↔️
        </span>
        <button onClick={() => handleScroll('prev')} className="portfolio-slider-arrow" aria-label="المشروع السابق" title="المشروع السابق">
          ➔
        </button>
        <button onClick={() => handleScroll('next')} className="portfolio-slider-arrow" aria-label="المشروع التالي" title="المشروع التالي">
          ⬅
        </button>
      </div>

      {/* Track */}
      <div className="portfolio-carousel-track" ref={containerRef}>
        {projects.map((project, index) => (
          <div key={project.id || index} className="portfolio-carousel-item">
            <ProjectCard project={project} index={index} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Mobile Auto-Scrolling Carousel (Ping-Pong back-and-forth) ────────────────
function MobileCarousel({ projects, onSelect }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const isPaused = useRef(false)
  const posRef = useRef(0)
  const directionRef = useRef(1) // 1 = right, -1 = left
  const rafRef = useRef(null)
  const SPEED = 0.8

  const tick = useCallback(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    if (!isPaused.current) {
      const maxScroll = track.scrollWidth - container.clientWidth

      // If cards fit within screen width, stay static!
      if (maxScroll <= 10) {
        posRef.current = 0
        track.style.transform = 'none'
      } else {
        posRef.current += SPEED * directionRef.current

        if (posRef.current >= maxScroll) {
          posRef.current = maxScroll
          directionRef.current = -1 // Reach right end -> turn left
        } else if (posRef.current <= 0) {
          posRef.current = 0
          directionRef.current = 1 // Reach left end -> turn right
        }

        track.style.transform = `translateX(${posRef.current}px)`
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  const pause = () => { isPaused.current = true }
  const resume = () => { isPaused.current = false }

  return (
    <div
      ref={containerRef}
      className="mobile-carousel"
      onMouseDown={pause}
      onMouseUp={resume}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      aria-label="معرض الأعمال — حرك للجانبين"
    >
      <div className="mobile-carousel__track" ref={trackRef}>
        {projects.map((project, index) => (
          <div key={project.id || index} className="mobile-carousel__item">
            <ProjectCard project={project} index={index} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function Portfolio({ projects = [], preview = false, hideHeader = false }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [loadedProjects, setLoadedProjects] = useState(projects)
  const [selectedProject, setSelectedProject] = useState(null)

  // Sync when server-side props update
  useEffect(() => {
    if (projects && projects.length > 0) {
      setLoadedProjects(projects)
    }
  }, [projects])

  const availableProjects = loadedProjects.length > 0 ? loadedProjects : []
  const baseProjects = preview ? availableProjects.slice(0, 10) : availableProjects

  const filtered =
    activeFilter === 'all'
      ? baseProjects
      : baseProjects.filter((p) => p.category === activeFilter)

  return (
    <section className="section" id="portfolio" aria-labelledby="portfolio-heading">
      <style>{`
        .portfolio-carousel-wrapper {
          position: relative;
          width: 100%;
          margin-top: var(--space-4);
        }
        .portfolio-slider-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .portfolio-slider-arrow {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--gold-border);
          color: var(--gold-primary);
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          flex-shrink: 0;
        }
        .portfolio-slider-arrow:hover {
          background: var(--gold-primary);
          color: #000;
          border-color: var(--gold-primary);
          transform: translateY(-2px) scale(1.06);
          box-shadow: 0 8px 24px var(--gold-glow);
        }
        .portfolio-slider-arrow:active {
          transform: translateY(0) scale(0.96);
        }
        .portfolio-carousel-track {
          display: flex;
          gap: var(--space-6);
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 12px 6px 28px 6px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .portfolio-carousel-track::-webkit-scrollbar {
          display: none;
        }
        .portfolio-carousel-item {
          flex: 0 0 365px;
          width: 365px;
          display: flex;
        }
        @media (max-width: 768px) {
          .portfolio-carousel-wrapper {
            display: none !important;
          }
        }
      `}</style>

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
              نماذج من أفضل المشاريع التي أنجزناها لعملائنا في مختلف القطاعات. اضغط على أي بطاقة لعرض كامل التفاصيل والصور.
            </p>
          </div>
        )}

        {/* Filter Bar — Full portfolio page only */}
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

        {/* Home Page Preview */}
        {preview ? (
          <>
            {/* Desktop & iPad / Tablet Slider */}
            <AutoProjectsCarousel projects={baseProjects} onSelect={setSelectedProject} />

            {/* Mobile Phone Carousel (Original Mobile Design) */}
            <MobileCarousel projects={baseProjects} onSelect={setSelectedProject} />
          </>
        ) : (
          /* Full Portfolio Page: Grid View */
          <div className="portfolio-grid">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id || index}
                project={project}
                index={index}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        )}

        {/* View All Button — Home page preview only */}
        {preview && (
          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link href="/portfolio" className="btn btn-secondary btn--lg" id="view-all-portfolio">
              عرض جميع المشاريع ←
            </Link>
          </div>
        )}
      </div>

      {/* Project Modal Details & Gallery Popup */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

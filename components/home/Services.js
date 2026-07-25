'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { getServices } from '@/lib/supabase'

const DEFAULT_SERVICES = [
  {
    id: 's1',
    icon: '🌐',
    title: 'تطوير مواقع الويب',
    description: 'نبني مواقع ويب احترافية وسريعة باستخدام Next.js وReact لضمان أفضل تجربة مستخدم وتحسين محركات البحث.',
    features: ['Next.js & React', 'تصميم متجاوب', 'تحسين SEO', 'أداء عالي', 'لوحة تحكم'],
    popular: true,
  },
  {
    id: 's2',
    icon: '📱',
    title: 'تطبيقات الجوال',
    description: 'نطور تطبيقات موبايل احترافية لـ iOS وAndroid بتجربة مستخدم استثنائية.',
    features: ['iOS & Android', 'React Native / Flutter', 'UI/UX احترافي', 'إشعارات فورية'],
    popular: false,
  },
  {
    id: 's3',
    icon: '⚙️',
    title: 'الأنظمة المؤسسية',
    description: 'نصمم وننفذ أنظمة إدارة متكاملة تناسب احتياجات شركتك من ERP وCRM إلى أنظمة المخازن.',
    features: ['ERP & CRM', 'إدارة المخازن', 'تقارير', 'صلاحيات متعددة'],
    popular: false,
  },
  {
    id: 's4',
    icon: '🎨',
    title: 'تصميم UI/UX',
    description: 'نصمم واجهات مستخدم جذابة وسهلة تجمع الجمال البصري بالوظائف العملية.',
    features: ['Figma', 'Prototyping', 'هوية بصرية', 'دليل التصميم'],
    popular: false,
  },
  {
    id: 's5',
    icon: '🛒',
    title: 'التجارة الإلكترونية',
    description: 'نبني متاجر إلكترونية متكاملة مع بوابات دفع آمنة وتجربة تسوق سلسة تزيد مبيعاتك.',
    features: ['بوابات دفع', 'إدارة المنتجات', 'تتبع الطلبات', 'SEO متاجر'],
    popular: false,
  },
  {
    id: 's6',
    icon: '🔧',
    title: 'الاستضافة والصيانة',
    description: 'استضافة موثوقة وسريعة مع صيانة دورية وتحديثات منتظمة على مدار الساعة.',
    features: ['استضافة سحابية', 'SSL مجاني', 'نسخ احتياطية', 'دعم 24/7'],
    popular: false,
  },
]

// ── Single Service Card ───────────────────────────────────────────────────────
function ServiceCard({ service, index, isWheelCard = false }) {
  const featureList = Array.isArray(service.features)
    ? service.features
    : typeof service.features === 'string' && service.features.length > 0
    ? service.features.split(',').map((f) => f.trim())
    : []

  return (
    <article
      className={`service-card${isWheelCard ? ' service-card--wheel' : ` reveal reveal-delay-${(index % 3) + 1}`}`}
      itemScope={!isWheelCard}
      itemType={!isWheelCard ? 'https://schema.org/Service' : undefined}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <div>
        {service.popular && (
          <div
            className="badge badge-gold"
            style={{ position: 'absolute', top: 'var(--space-3)', left: 'var(--space-3)', zIndex: 1 }}
          >
            ⭐ الأكثر طلباً
          </div>
        )}
        <span className="service-card__icon" aria-hidden="true">
          {service.icon || '⚡'}
        </span>
        <h3 className="service-card__title" itemProp={!isWheelCard ? 'name' : undefined}>
          {service.title}
        </h3>
        <p className="service-card__description" itemProp={!isWheelCard ? 'description' : undefined}>
          {service.description}
        </p>
        {featureList.length > 0 && (
          <ul className="service-card__features" aria-label={!isWheelCard ? `مميزات ${service.title}` : undefined}>
            {featureList.map((feature, fIndex) => (
              <li key={fIndex} className="service-card__feature">
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link href="/contact" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-6)' }}>
        طلب الخدمة
      </Link>
    </article>
  )
}

// ── Desktop Horizontal Carousel / Slider ──────────────────────────────────────
function ServicesDesktopSlider({ services }) {
  const sliderRef = useRef(null)

  const handleScroll = (dir) => {
    if (!sliderRef.current) return
    const cardWidth = 380
    // In RTL layouts, negative scrollLeft scrolls forward/next
    const scrollAmount = dir === 'next' ? -cardWidth : cardWidth
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="services-desktop-slider-wrapper">
      {/* Slider Navigation Header Controls */}
      <div className="services-slider-controls">
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: 'auto', alignSelf: 'center' }}>
          اسحب للتصفح أو استخدم الأسهم ↔️
        </span>
        <button
          onClick={() => handleScroll('prev')}
          className="services-slider-arrow"
          aria-label="الخدمة السابقة"
          title="الخدمة السابقة"
        >
          ➔
        </button>
        <button
          onClick={() => handleScroll('next')}
          className="services-slider-arrow"
          aria-label="الخدمة التالية"
          title="الخدمة التالية"
        >
          ⬅
        </button>
      </div>

      {/* Slider Track */}
      <div className="services-desktop-slider" ref={sliderRef}>
        {services.map((service, index) => (
          <div key={service.id || index} className="services-desktop-slider__item">
            <ServiceCard service={service} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Mobile Wheel Carousel ─────────────────────────────────────────────────────
function ServicesMobileStrip({ services }) {
  const [active, setActive] = useState(0)
  const total = services.length
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const goPrev = () => setActive((i) => (i - 1 + total) % total)
  const goNext = () => setActive((i) => (i + 1) % total)

  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(() => {
      goNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [active, total])

  const EASE = 'transform 0.55s cubic-bezier(0.34, 1.15, 0.64, 1), opacity 0.4s ease'

  const getCardStyle = (index) => {
    const rel = ((index - active) % total + total) % total

    if (rel === 0) {
      return {
        transform: 'translateX(-50%) translateY(0px) rotate(0deg) scale(1)',
        opacity: 1,
        zIndex: 5,
        pointerEvents: 'auto',
        transition: EASE,
      }
    }

    if (rel === 1) {
      return {
        transform: 'translateX(calc(-50% - 40%)) translateY(102%) rotate(15deg) scale(0.76)',
        opacity: 0.65,
        zIndex: 4,
        pointerEvents: 'auto',
        cursor: 'pointer',
        transition: EASE,
      }
    }

    if (rel === total - 1) {
      return {
        transform: 'translateX(calc(-50% + 40%)) translateY(102%) rotate(-15deg) scale(0.76)',
        opacity: 0.65,
        zIndex: 4,
        pointerEvents: 'auto',
        cursor: 'pointer',
        transition: EASE,
      }
    }

    return {
      transform: 'translateX(-50%) translateY(150%) scale(0.5)',
      opacity: 0,
      zIndex: 1,
      pointerEvents: 'none',
      transition: EASE,
    }
  }

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
    if (Math.abs(dx) < 40 || dy > Math.abs(dx)) return
    dx > 0 ? goPrev() : goNext()
  }

  const handleCardClick = (index) => {
    const rel = ((index - active) % total + total) % total
    if (rel === 1) goNext()
    else if (rel === total - 1) goPrev()
  }

  return (
    <div className="services-wheel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} aria-label="الخدمات — اسحب للتنقل">
      <div className="services-wheel__stage">
        {services.map((service, index) => {
          const rel = ((index - active) % total + total) % total
          return (
            <div
              key={service.id || index}
              className="services-wheel__slot"
              style={getCardStyle(index)}
              aria-hidden={rel === 0 ? undefined : 'true'}
              onClick={() => handleCardClick(index)}
            >
              <ServiceCard service={service} index={index} isWheelCard />
            </div>
          )
        })}
      </div>

      {total > 1 && (
        <div className="services-wheel__dots" role="tablist" aria-label="صفحات الخدمات">
          {services.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              className={`services-wheel__dot${i === active ? ' active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`الخدمة ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Services({ services = [], showAll = false, hideHeader = false }) {
  const [loadedServices, setLoadedServices] = useState(services)

  useEffect(() => {
    async function fetchLatest() {
      const data = await getServices()
      if (data && data.length > 0) {
        setLoadedServices(data)
      }
    }
    fetchLatest()
  }, [])

  const activeServices =
    loadedServices && loadedServices.length > 0
      ? loadedServices
      : services && services.length > 0
      ? services
      : DEFAULT_SERVICES

  const displayedServices = activeServices

  return (
    <section className="section" id="services" aria-labelledby="services-heading">
      <style>{`
        .services-desktop-slider-wrapper {
          position: relative;
          width: 100%;
          margin-top: var(--space-4);
        }
        .services-slider-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .services-slider-arrow {
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
        .services-slider-arrow:hover {
          background: var(--gold-primary);
          color: #000;
          border-color: var(--gold-primary);
          transform: translateY(-2px) scale(1.06);
          box-shadow: 0 8px 24px var(--gold-glow);
        }
        .services-slider-arrow:active {
          transform: translateY(0) scale(0.96);
        }
        .services-desktop-slider {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          padding: 12px 6px 28px 6px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .services-desktop-slider::-webkit-scrollbar {
          display: none;
        }
        .services-desktop-slider__item {
          flex: 0 0 350px;
          max-width: 380px;
          scroll-snap-align: start;
          display: flex;
        }
        @media (max-width: 768px) {
          .services-desktop-slider-wrapper {
            display: none;
          }
        }
      `}</style>

      <div className="container">
        {/* Section Title */}
        {!hideHeader && (
          <div className="section-title reveal">
            <div className="section-title__tag">⚡ خدماتنا</div>
            <h2 className="section-title__heading" id="services-heading">
              حلول تقنية <span className="text-gradient">متكاملة</span>
            </h2>
            <div className="gold-divider" />
            <p className="section-title__description">
              نقدم مجموعة شاملة من الخدمات التقنية لمساعدتك على بناء حضور رقمي قوي ومتميز.
            </p>
          </div>
        )}

        {/* Home Page Desktop Slider View */}
        {!showAll ? (
          <>
            <ServicesDesktopSlider services={displayedServices} />
            <ServicesMobileStrip services={displayedServices} />
          </>
        ) : (
          /* Services Page Grid View */
          <div className="services-grid">
            {displayedServices.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} index={index} />
            ))}
          </div>
        )}

        {/* View All Button — Home page preview only */}
        {!showAll && (
          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link href="/services" className="btn btn-secondary btn--lg" id="view-all-services">
              عرض جميع الخدمات ←
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

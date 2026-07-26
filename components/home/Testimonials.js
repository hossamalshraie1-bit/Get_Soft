'use client'

import { useState, useRef, useEffect } from 'react'
import { getTestimonials } from '@/lib/supabase'

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: 'أحمد العمري',
    position: 'المدير التنفيذي',
    company: 'شركة الريادة التجارية',
    content: 'تعاملنا مع Get Soft لتطوير نظام إدارة متكامل لشركتنا. النتيجة كانت مذهلة، الفريق محترف جداً والتسليم في الوقت المحدد. أنصح بهم بشدة لكل من يبحث عن جودة حقيقية.',
    rating: 5,
  },
  {
    id: 2,
    name: 'سارة المحمد',
    position: 'مديرة التسويق',
    company: 'متجر الأناقة',
    content: 'صمموا لنا متجراً إلكترونياً رائعاً زاد من مبيعاتنا بنسبة 200%. التصميم احترافي والأداء ممتاز. سنتعاون معهم دائماً في مشاريعنا القادمة.',
    rating: 5,
  },
  {
    id: 3,
    name: 'خالد الزهراني',
    position: 'مؤسس',
    company: 'تطبيق التوصيل السريع',
    content: 'طوروا تطبيق التوصيل الخاص بنا بشكل رائع. واجهة المستخدم سلسة والأداء قوي. الفريق استجاب لكل طلباتنا باحترافية عالية.',
    rating: 5,
  },
]

function StarRating({ rating }) {
  return (
    <div className="stars" aria-label={`التقييم: ${rating} من 5 نجوم`}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < rating ? 'var(--gold-primary)' : 'var(--text-muted)' }}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials({ testimonials = [] }) {
  const [loadedTestimonials, setLoadedTestimonials] = useState(testimonials)

  // Dynamic client sync with getTestimonials()
  useEffect(() => {
    async function fetchLatest() {
      const data = await getTestimonials()
      if (data && data.length > 0) {
        setLoadedTestimonials(data)
      }
    }
    fetchLatest()
  }, [])

  const activeTestimonials = (loadedTestimonials && loadedTestimonials.length > 0)
    ? loadedTestimonials
    : (testimonials && testimonials.length > 0)
      ? testimonials
      : DEFAULT_TESTIMONIALS

  const [activeIndex, setActiveIndex] = useState(0)
  const gridRef = useRef(null)

  // Listen to scroll to update dot indicator active state
  useEffect(() => {
    const container = gridRef.current
    if (!container) return

    const handleScroll = () => {
      const children = Array.from(container.children)
      if (children.length === 0) return

      const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2
      let closestIndex = 0
      let minDiff = Infinity

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect()
        const childCenter = rect.left + rect.width / 2
        const diff = Math.abs(containerCenter - childCenter)
        if (diff < minDiff) {
          minDiff = diff
          closestIndex = index
        }
      })

      setActiveIndex(closestIndex)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [activeTestimonials])

  const scrollToCard = (index) => {
    if (!gridRef.current) return
    const container = gridRef.current
    const child = container.children[index]
    if (child) {
      child.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
      setActiveIndex(index)
    }
  }

  return (
    <section
      className="section"
      id="testimonials"
      style={{ background: 'var(--bg-secondary)', overflow: 'hidden' }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        {/* Section Title */}
        <div className="section-title reveal">
          <div className="section-title__tag">💬 آراء عملائنا</div>
          <h2 className="section-title__heading" id="testimonials-heading">
            ماذا يقول <span className="text-gradient">عملاؤنا</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-title__description">
            نفخر بثقة عملائنا ونسعى دائماً لتجاوز توقعاتهم.
          </p>
        </div>

        {/* Testimonials Grid/Scroll-strip */}
        <div className="testimonials-grid" ref={gridRef}>
          {activeTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className={`testimonial-card reveal reveal-delay-${index + 1}`}
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="testimonial-card__quote" aria-hidden="true">"</div>

              <meta itemProp="reviewRating" content={testimonial.rating} />
              <p className="testimonial-card__content" itemProp="reviewBody">
                {testimonial.content}
              </p>

              <div className="testimonial-card__author" itemProp="author" itemScope itemType="https://schema.org/Person">
                <div
                  className="testimonial-card__avatar"
                  aria-label={`صورة ${testimonial.name}`}
                >
                  {testimonial.avatar_url ? (
                    <img src={testimonial.avatar_url} alt={testimonial.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    testimonial.name ? testimonial.name.charAt(0) : '👤'
                  )}
                </div>
                <div>
                  <div className="testimonial-card__name" itemProp="name">{testimonial.name}</div>
                  <div className="testimonial-card__position">
                    {testimonial.position}
                    {testimonial.company && ` — ${testimonial.company}`}
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicators — mobile only */}
        <div className="testimonials-dots" role="tablist" aria-label="مؤشرات التقييمات">
          {activeTestimonials.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === activeIndex}
              className={`testimonials-dot${index === activeIndex ? ' active' : ''}`}
              onClick={() => scrollToCard(index)}
              aria-label={`التقييم ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

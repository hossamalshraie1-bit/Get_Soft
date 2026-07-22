'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const TYPED_WORDS = ['مواقع الويب', 'تطبيقات الجوال', 'أنظمة مؤسسية', 'تصميم UI/UX']

export default function Hero() {
  const codeRef = useRef(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typing animation
  useEffect(() => {
    const word = TYPED_WORDS[wordIndex]
    let timeout

    if (!isDeleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % TYPED_WORDS.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex])

  // Code window reveal
  useEffect(() => {
    const lines = codeRef.current?.querySelectorAll('.hero__code-line')
    if (!lines) return
    lines.forEach((line, i) => {
      line.style.opacity = '0'
      setTimeout(() => {
        line.style.opacity = '1'
        line.style.transition = 'opacity 0.3s ease'
      }, 800 + i * 120)
    })
  }, [])

  return (
    <section className="hero" id="hero" aria-label="القسم الترحيبي">
      {/* Background */}
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow-1" aria-hidden="true" />
      <div className="hero__glow-2" aria-hidden="true" />
      <div className="hero__glow-3" aria-hidden="true" />

      <div className="container hero__container">
        {/* ===== Content Side ===== */}
        <div className="hero__content">
          <div className="hero__tag" aria-label="وسم تعريفي">
            <span className="hero__tag-dot" aria-hidden="true" />
            🚀 شركة برمجيات احترافية في السعودية
          </div>

          <h1 className="hero__title">
            نبني{' '}
            <span className="text-gradient">مستقبلك</span>
            <br />
            الرقمي بكود
            <br />
            يصنع الفارق
          </h1>

          {/* Typed text */}
          <div className="hero__typed-wrap" aria-live="polite" aria-label="خدماتنا">
            <span className="hero__typed-prefix">نتخصص في → </span>
            <span className="hero__typed-text">{displayed}</span>
            <span className="hero__typed-cursor" aria-hidden="true">|</span>
          </div>

          <p className="hero__subtitle">
            من تصميم المواقع الاحترافية إلى تطوير الأنظمة المؤسسية وتطبيقات الجوال —
            نقدم حلولاً تقنية متكاملة تساعد شركتك على النمو والتميز.
          </p>

          <div className="hero__actions">
            <Link href="/portfolio" className="btn btn-primary btn--lg" id="hero-portfolio-btn">
              🎨 شاهد أعمالنا
            </Link>
            <Link href="/contact" className="btn btn-secondary btn--lg" id="hero-contact-btn">
              💬 استشارة مجانية
            </Link>
          </div>

          {/* Trust badges */}
          <div className="hero__trust">
            <div className="hero__trust-item">
              <span className="hero__trust-icon">✅</span>
              <span>+150 مشروع منجز</span>
            </div>
            <div className="hero__trust-divider" aria-hidden="true" />
            <div className="hero__trust-item">
              <span className="hero__trust-icon">⭐</span>
              <span>تقييم 5 نجوم</span>
            </div>
            <div className="hero__trust-divider" aria-hidden="true" />
            <div className="hero__trust-item">
              <span className="hero__trust-icon">🕐</span>
              <span>دعم 24/7</span>
            </div>
          </div>
        </div>

        {/* ===== Code Window Visual Side ===== */}
        <div className="hero__visual" aria-hidden="true">
          {/* Floating cards */}
          <div className="hero__float-card hero__float-card--1">
            <span>🚀</span>
            <div>
              <div className="hero__float-title">مشروع جديد</div>
              <div className="hero__float-sub">تم التسليم بنجاح</div>
            </div>
          </div>
          <div className="hero__float-card hero__float-card--2">
            <span>⭐</span>
            <div>
              <div className="hero__float-title">تقييم العميل</div>
              <div className="hero__float-sub">ممتاز جداً 5/5</div>
            </div>
          </div>

          <div className="hero__code-window" ref={codeRef}>
            <div className="hero__code-header">
              <div className="hero__code-dots">
                <div className="hero__code-dot" />
                <div className="hero__code-dot" />
                <div className="hero__code-dot" />
              </div>
              <div className="hero__code-title">getsoft-app.jsx</div>
              <div className="hero__code-lang">JSX</div>
            </div>
            <div className="hero__code-body">
              <span className="hero__code-line"><span className="c-keyword">import</span> <span className="c-function">React</span> <span className="c-keyword">from</span> <span className="c-string">'react'</span></span>
              <span className="hero__code-line"><span className="c-comment">// ✨ Get Soft — نبني المستقبل الرقمي</span></span>
              <span className="hero__code-line"> </span>
              <span className="hero__code-line"><span className="c-keyword">const</span> <span className="c-function">GetSoft</span> = () =&gt; {'{'}</span>
              <span className="hero__code-line">  <span className="c-keyword">const</span> services = [</span>
              <span className="hero__code-line">    <span className="c-string">"تطوير مواقع الويب"</span>,</span>
              <span className="hero__code-line">    <span className="c-string">"تطبيقات الجوال"</span>,</span>
              <span className="hero__code-line">    <span className="c-string">"أنظمة مؤسسية"</span>,</span>
              <span className="hero__code-line">    <span className="c-string">"تصميم UI/UX"</span></span>
              <span className="hero__code-line">  ]</span>
              <span className="hero__code-line"> </span>
              <span className="hero__code-line">  <span className="c-keyword">return</span> (</span>
              <span className="hero__code-line">    <span className="c-tag">&lt;App</span></span>
              <span className="hero__code-line">      <span className="c-attr">quality</span>=<span className="c-value">"premium"</span></span>
              <span className="hero__code-line">      <span className="c-attr">delivery</span>=<span className="c-value">"onTime"</span></span>
              <span className="hero__code-line">      <span className="c-attr">support</span>=<span className="c-value">"24/7"</span></span>
              <span className="hero__code-line">    <span className="c-tag">/&gt;</span></span>
              <span className="hero__code-line">  )</span>
              <span className="hero__code-line">{'}'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-text">اكتشف المزيد</span>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-dot" />
        </div>
      </div>
    </section>
  )
}

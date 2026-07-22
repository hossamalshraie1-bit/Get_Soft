import Link from 'next/link'

const FEATURES = [
  {
    icon: '⚡',
    title: 'أداء عالي السرعة',
    desc: 'مواقع وتطبيقات محسّنة لأقصى أداء وسرعة تحميل تضمن تجربة مستخدم مثالية.',
  },
  {
    icon: '🔒',
    title: 'أمان من الدرجة الأولى',
    desc: 'أعلى معايير الأمان وحماية البيانات مع SSL وتشفير متقدم لحماية عملك.',
  },
  {
    icon: '📱',
    title: 'تصميم متجاوب 100%',
    desc: 'مواقع وتطبيقات تعمل بشكل مثالي على جميع الأجهزة والشاشات بدون استثناء.',
  },
  {
    icon: '🎯',
    title: 'تحسين محركات البحث',
    desc: 'تقنيات SEO متقدمة تضمن ظهور موقعك في صدارة نتائج جوجل وزيادة الزيارات.',
  },
  {
    icon: '🤝',
    title: 'دعم فني مستمر',
    desc: 'فريق دعم متوفر على مدار الساعة لضمان استمرارية عمل مشروعك دون انقطاع.',
  },
  {
    icon: '⏰',
    title: 'تسليم في الموعد',
    desc: 'نلتزم بالمواعيد المحددة دون تأخير مع الحفاظ على أعلى معايير الجودة.',
  },
]

export default function WhyUs() {
  return (
    <section className="section--lg" id="why-us" style={{ background: 'var(--bg-secondary)' }} aria-labelledby="whyus-heading">
      <div className="container">
        <div className="why-us__wrapper">
          {/* Left: Text */}
          <div className="reveal">
            <div className="section-title__tag" style={{ display: 'inline-flex', marginBottom: 'var(--space-6)' }}>
              🏆 لماذا نحن؟
            </div>
            <h2 id="whyus-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 'var(--space-6)', lineHeight: 1.2 }}>
              نبني شراكة
              <br />
              <span className="text-gradient">ناجحة معك</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
              نحن لسنا مجرد شركة برمجيات — نحن شريكك التقني الذي يفهم أهدافك ويعمل معك خطوة بخطوة لتحقيقها.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold-primary)' }}>98%</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>رضا العملاء</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold-primary)' }}>150+</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>مشروع ناجح</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold-primary)' }}>5+</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>سنوات خبرة</div>
              </div>
            </div>
            <Link href="/contact" className="btn btn-primary btn--lg" id="whyus-cta">
              تواصل معنا الآن
            </Link>
          </div>

          {/* Right: Features Grid */}
          <div className="features-grid">
            {FEATURES.map((feature, index) => (
              <div key={index} className={`feature-item reveal reveal-delay-${(index % 3) + 1}`}>
                <div className="feature-item__icon" aria-hidden="true">{feature.icon}</div>
                <div>
                  <h3 className="feature-item__title">{feature.title}</h3>
                  <p className="feature-item__desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

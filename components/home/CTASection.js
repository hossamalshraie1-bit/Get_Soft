import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="cta-section" id="cta" aria-labelledby="cta-heading">
      {/* Decorative lines */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '50%',
        right: '-100px',
        width: '400px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold-border))',
        transform: 'translateY(-50%)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '50%',
        left: '-100px',
        width: '400px',
        height: '1px',
        background: 'linear-gradient(270deg, transparent, var(--gold-border))',
        transform: 'translateY(-50%)',
      }} />

      <div className="container">
        <div className="reveal">
          <div className="section-title__tag" style={{ display: 'inline-flex', marginBottom: 'var(--space-6)' }}>
            🚀 ابدأ اليوم
          </div>
          <h2
            className="cta-section__title"
            id="cta-heading"
          >
            هل أنت مستعد لبناء
            <br />
            <span className="text-gradient">مشروعك الرقمي؟</span>
          </h2>
          <p className="cta-section__desc">
            تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك. فريقنا جاهز لمساعدتك.
          </p>

          {/* Stats Row */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-8)',
            justifyContent: 'center',
            marginBottom: 'var(--space-10)',
            flexWrap: 'wrap',
          }}>
            {[
              { value: 'مجاناً', label: 'الاستشارة الأولى' },
              { value: '48 ساعة', label: 'الرد على طلبك' },
              { value: '100%', label: 'ضمان الجودة' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--gold-primary)' }}>
                  {item.value}
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="cta-section__actions">
            <Link href="/contact" className="btn btn-primary btn--lg" id="cta-contact-btn">
              ابدأ مشروعك الآن 🚀
            </Link>
            <a
              href="https://wa.me/967770000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn--lg"
              id="cta-whatsapp-btn"
            >
              💬 واتساب
            </a>
            <a href="tel:+967770000000" className="btn btn-secondary btn--lg" id="cta-call-btn">
              📞 اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

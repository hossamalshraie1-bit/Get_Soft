import Link from 'next/link'

const SERVICES_LINKS = [
  { href: '/services#web', label: 'تطوير مواقع الويب' },
  { href: '/services#mobile', label: 'تطبيقات الجوال' },
  { href: '/services#systems', label: 'الأنظمة المؤسسية' },
  { href: '/services#uiux', label: 'تصميم UI/UX' },
  { href: '/services#ecommerce', label: 'التجارة الإلكترونية' },
]

const QUICK_LINKS = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'من نحن' },
  { href: '/portfolio', label: 'أعمالنا' },
  { href: '/contact', label: 'تواصل معنا' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src="/logo.png"
                alt="Get Soft Logo"
                style={{
                  height: '44px',
                  width: '44px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  boxShadow: '0 4px 12px rgba(201, 168, 76, 0.3)',
                  border: '1px solid var(--gold-border, rgba(201, 168, 76, 0.4))',
                }}
              />
              <div className="footer__brand-name" style={{ marginBottom: 0 }}>Get Soft</div>
            </div>
            <p className="footer__brand-desc">
              شركة برمجيات متخصصة في تطوير مواقع الويب الاحترافية، تطبيقات الجوال، الأنظمة المؤسسية وتصميم واجهات المستخدم. نبني حلولاً رقمية تصنع الفارق.
            </p>
            <div className="footer__social" aria-label="روابط التواصل الاجتماعي">
              <a
                href="https://twitter.com/getsoft_ye"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="تويتر"
                title="تابعنا على تويتر"
              >
                𝕏
              </a>
              <a
                href="https://instagram.com/getsoft"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="إنستغرام"
                title="تابعنا على إنستغرام"
              >
                📷
              </a>
              <a
                href="https://linkedin.com/company/getsoft"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="لينكد إن"
                title="تابعنا على لينكد إن"
              >
                in
              </a>
              <a
                href="https://wa.me/967776158797"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="واتساب"
                title="تواصل معنا على واتساب"
              >
                💬
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="روابط الخدمات">
            <h3 className="footer__heading">خدماتنا</h3>
            <ul className="footer__links">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Links */}
          <nav aria-label="روابط سريعة">
            <h3 className="footer__heading">روابط سريعة</h3>
            <ul className="footer__links">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="footer__heading">تواصل معنا</h3>
            <div className="footer__contact-item">
              <span className="footer__contact-icon" aria-hidden="true">📍</span>
              <div className="footer__contact-text">صنعاء، الجمهورية اليمنية</div>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon" aria-hidden="true">📞</span>
              <div>
                <a href="tel:+967776158797" className="footer__contact-text" style={{ color: 'var(--text-secondary)' }}>
                  +967 776 158 797
                </a>
              </div>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon" aria-hidden="true">✉️</span>
              <div>
                <a href="mailto:getsoft2025@gmail.com" className="footer__contact-text" style={{ color: 'var(--text-secondary)' }}>
                  getsoft2025@gmail.com
                </a>
              </div>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon" aria-hidden="true">🕐</span>
              <div className="footer__contact-text">الأحد - الخميس: 9ص - 6م</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} <strong style={{ color: 'var(--gold-primary)' }}>Get Soft</strong>. جميع الحقوق محفوظة.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
            <Link href="/privacy" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}>
              سياسة الخصوصية
            </Link>
            <Link href="/terms" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}>
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

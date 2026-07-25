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
            <div className="footer__brand-name">Get Soft</div>
            <p className="footer__brand-desc">
              شركة برمجيات متخصصة في تطوير مواقع الويب الاحترافية، تطبيقات الجوال، الأنظمة المؤسسية وتصميم واجهات المستخدم. نبني حلولاً رقمية تصنع الفارق.
            </p>
            <div className="footer__social" aria-label="روابط التواصل الاجتماعي">
              <a
                href="https://twitter.com/getsoft_sa"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="تويتر"
                title="تابعنا على تويتر"
              >
                𝕏
              </a>
              <a
                href="https://instagram.com/getsoft_sa"
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
                href="https://wa.me/966500000000"
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
              <div className="footer__contact-text">الرياض، المملكة العربية السعودية</div>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon" aria-hidden="true">📞</span>
              <div>
                <a href="tel:+966500000000" className="footer__contact-text" style={{ color: 'var(--text-secondary)' }}>
                  +966 50 000 0000
                </a>
              </div>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon" aria-hidden="true">✉️</span>
              <div>
                <a href="mailto:info@getsoft.sa" className="footer__contact-text" style={{ color: 'var(--text-secondary)' }}>
                  info@getsoft.sa
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

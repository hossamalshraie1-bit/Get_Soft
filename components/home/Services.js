import Link from 'next/link'

const DEFAULT_SERVICES = [
  {
    icon: '🌐',
    title: 'تطوير مواقع الويب',
    description: 'نبني مواقع ويب احترافية وسريعة باستخدام Next.js وReact لضمان أفضل تجربة مستخدم وتحسين محركات البحث.',
    features: ['Next.js & React', 'تصميم متجاوب', 'تحسين SEO', 'أداء عالي', 'لوحة تحكم'],
    popular: true,
  },
  {
    icon: '📱',
    title: 'تطبيقات الجوال',
    description: 'نطور تطبيقات موبايل احترافية لـ iOS وAndroid بتجربة مستخدم استثنائية.',
    features: ['iOS & Android', 'React Native / Flutter', 'UI/UX احترافي', 'إشعارات فورية'],
    popular: false,
  },
  {
    icon: '⚙️',
    title: 'الأنظمة المؤسسية',
    description: 'نصمم وننفذ أنظمة إدارة متكاملة تناسب احتياجات شركتك من ERP وCRM إلى أنظمة المخازن.',
    features: ['ERP & CRM', 'إدارة المخازن', 'تقارير', 'صلاحيات متعددة'],
    popular: false,
  },
  {
    icon: '🎨',
    title: 'تصميم UI/UX',
    description: 'نصمم واجهات مستخدم جذابة وسهلة تجمع الجمال البصري بالوظائف العملية.',
    features: ['Figma', 'Prototyping', 'هوية بصرية', 'دليل التصميم'],
    popular: false,
  },
  {
    icon: '🛒',
    title: 'التجارة الإلكترونية',
    description: 'نبني متاجر إلكترونية متكاملة مع بوابات دفع آمنة وتجربة تسوق سلسة تزيد مبيعاتك.',
    features: ['بوابات دفع', 'إدارة المنتجات', 'تتبع الطلبات', 'SEO متاجر'],
    popular: false,
  },
  {
    icon: '🔧',
    title: 'الاستضافة والصيانة',
    description: 'استضافة موثوقة وسريعة مع صيانة دورية وتحديثات منتظمة على مدار الساعة.',
    features: ['استضافة سحابية', 'SSL مجاني', 'نسخ احتياطية', 'دعم 24/7'],
    popular: false,
  },
]

export default function Services({ services, showAll = false }) {
  const activeServices = (services && services.length > 0) ? services : DEFAULT_SERVICES
  const displayedServices = showAll ? activeServices : activeServices.slice(0, 6)

  return (
    <section className="section" id="services" aria-labelledby="services-heading">
      <div className="container">
        {/* Section Title */}
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

        {/* Services Grid */}
        <div className="services-grid">
          {displayedServices.map((service, index) => (
            <article
              key={index}
              className={`service-card reveal reveal-delay-${(index % 3) + 1}`}
              itemScope
              itemType="https://schema.org/Service"
            >
              {service.popular && (
                <div className="badge badge-gold" style={{ position: 'absolute', top: 'var(--space-4)', left: 'var(--space-4)', zIndex: 1 }}>
                  ⭐ الأكثر طلباً
                </div>
              )}

              <span className="service-card__icon" aria-hidden="true">{service.icon}</span>

              <h3 className="service-card__title" itemProp="name">{service.title}</h3>

              <p className="service-card__description" itemProp="description">
                {service.description}
              </p>

              <ul className="service-card__features" aria-label={`مميزات ${service.title}`}>
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="service-card__feature">{feature}</li>
                ))}
              </ul>

              <Link href="/contact" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                طلب الخدمة
              </Link>
            </article>
          ))}
        </div>

        {/* View All Button */}
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

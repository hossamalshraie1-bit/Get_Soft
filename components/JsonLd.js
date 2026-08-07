export default function JsonLd() {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'جيت سوفت',
    alternateName: 'Get Soft',
    url: 'https://getsoft.vercel.app',
    logo: 'https://getsoft.vercel.app/logo.png',
    image: 'https://getsoft.vercel.app/logo.png',
    description:
      'جيت سوفت - Get Soft — شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية وتصميم واجهات المستخدم.',
    foundingDate: '2019',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'صنعاء',
      addressCountry: 'YE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+967-776-158-797',
      email: 'getsoft2025@gmail.com',
      availableLanguage: ['Arabic', 'English'],
    },
    sameAs: [
      'https://twitter.com/getsoft2025',
      'https://instagram.com/getsoft2025',
      'https://linkedin.com/company/getsoft',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات جيت سوفت للبرمجة والتطوير',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تطوير مواقع الويب' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تطوير تطبيقات الجوال' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تطوير الأنظمة المؤسسية' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تصميم UI/UX' } },
      ],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'جيت سوفت',
    alternateName: 'Get Soft',
    url: 'https://getsoft.vercel.app',
    description: 'جيت سوفت - Get Soft — شركة برمجيات وتصميم مواقع الويب',
    inLanguage: 'ar',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

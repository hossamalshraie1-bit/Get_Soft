import './globals.css'
import ScrollReveal from '@/components/layout/ScrollReveal'

export const metadata = {
  metadataBase: new URL('https://getsoft.ye'),

  title: {
    default: 'جيت سوفت | شركة برمجيات وتصميم مواقع الويب في الجمهورية اليمنية',
    template: '%s | جيت سوفت',
  },

  description:
    'جيت سوفت — شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية وتصميم واجهات المستخدم في اليمن. خبرة تقنية عالية وتسليم احترافي في الموعد.',

  keywords: [
    'شركة برمجيات',
    'تطوير مواقع الويب',
    'تصميم مواقع',
    'تطبيقات موبايل',
    'أنظمة مؤسسية',
    'تصميم UI UX',
    'Next.js',
    'React',
    'برمجة احترافية',
    'تطوير تطبيقات',
    'شركة تقنية',
    'الجمهورية اليمنية',
    'صنعاء',
    'اليمن',
    'Get Soft',
    'جيت سوفت',
  ],

  authors: [{ name: 'Get Soft', url: 'https://getsoft.ye' }],
  creator: 'Get Soft',
  publisher: 'Get Soft',

  alternates: {
    canonical: 'https://getsoft.ye',
    languages: { 'ar-YE': 'https://getsoft.ye' },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_YE',
    url: 'https://getsoft.ye',
    siteName: 'جيت سوفت',
    title: 'جيت سوفت | شركة برمجيات وتصميم مواقع الويب في اليمن',
    description:
      'شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية وتصميم واجهات المستخدم.',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'جيت سوفت — شركة برمجيات احترافية',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@getsoft_ye',
    creator: '@getsoft_ye',
    title: 'جيت سوفت | شركة برمجيات وتصميم مواقع الويب في اليمن',
    description:
      'شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، والأنظمة المؤسسية.',
    images: ['/logo.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },

  manifest: '/manifest.json',

  verification: {
    google: 'google7464326adc760ed7',
  },
}

// JSON-LD Structured Data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Get Soft',
  alternateName: 'جيت سوفت',
  url: 'https://getsoft.ye',
  logo: 'https://getsoft.ye/logo.png',
  description:
    'شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية وتصميم واجهات المستخدم في الجمهورية اليمنية.',
  foundingDate: '2019',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'صنعاء',
    addressCountry: 'YE',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+967-770-000-000',
    email: 'info@getsoft.ye',
    availableLanguage: ['Arabic'],
  },
  sameAs: [
    'https://twitter.com/getsoft_ye',
    'https://instagram.com/getsoft_ye',
    'https://linkedin.com/company/getsoft',
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 15.3694,
      longitude: 44.1910,
    },
    geoRadius: '500000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'خدمات البرمجة والتطوير',
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
  url: 'https://getsoft.ye',
  name: 'جيت سوفت',
  description: 'شركة برمجيات وتصميم مواقع الويب في اليمن',
  inLanguage: 'ar',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://getsoft.ye/portfolio?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080808" />
        <meta name="msapplication-TileColor" content="#080808" />

        {/* Explicit Favicon Links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ik.imagekit.io" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  )
}

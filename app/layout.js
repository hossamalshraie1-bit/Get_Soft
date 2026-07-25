import './globals.css'
import ScrollReveal from '@/components/layout/ScrollReveal'

export const metadata = {
  metadataBase: new URL('https://getsoft.sa'),

  title: {
    default: 'جيت سوفت | شركة برمجيات وتصميم مواقع الويب في المملكة العربية السعودية',
    template: '%s | جيت سوفت',
  },

  description:
    'جيت سوفت — شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية وتصميم واجهات المستخدم. خبرة تقنية عالية وتسليم احترافي في الموعد.',

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
    'المملكة العربية السعودية',
    'الرياض',
    'Get Soft',
    'جيت سوفت',
  ],

  authors: [{ name: 'Get Soft', url: 'https://getsoft.sa' }],
  creator: 'Get Soft',
  publisher: 'Get Soft',

  alternates: {
    canonical: 'https://getsoft.sa',
    languages: { 'ar-SA': 'https://getsoft.sa' },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://getsoft.sa',
    siteName: 'جيت سوفت',
    title: 'جيت سوفت | شركة برمجيات وتصميم مواقع الويب',
    description:
      'شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية وتصميم واجهات المستخدم.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'جيت سوفت — شركة برمجيات احترافية',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@getsoft_sa',
    creator: '@getsoft_sa',
    title: 'جيت سوفت | شركة برمجيات وتصميم مواقع الويب',
    description:
      'شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، والأنظمة المؤسسية.',
    images: ['/og-image.jpg'],
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
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },

  manifest: '/manifest.json',

  verification: {
    google: 'your-google-search-console-verification-code',
  },
}

// JSON-LD Structured Data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Get Soft',
  alternateName: 'جيت سوفت',
  url: 'https://getsoft.sa',
  logo: 'https://getsoft.sa/logo.png',
  description:
    'شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية وتصميم واجهات المستخدم.',
  foundingDate: '2019',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'الرياض',
    addressCountry: 'SA',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+966-50-000-0000',
    email: 'info@getsoft.sa',
    availableLanguage: ['Arabic'],
  },
  sameAs: [
    'https://twitter.com/getsoft_sa',
    'https://instagram.com/getsoft_sa',
    'https://linkedin.com/company/getsoft',
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 24.7136,
      longitude: 46.6753,
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
  url: 'https://getsoft.sa',
  name: 'جيت سوفت',
  description: 'شركة برمجيات وتصميم مواقع الويب',
  inLanguage: 'ar',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://getsoft.sa/portfolio?q={search_term_string}',
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

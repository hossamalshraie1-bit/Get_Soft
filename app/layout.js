import './globals.css'
import ScrollReveal from '@/components/layout/ScrollReveal'

export const metadata = {
  metadataBase: new URL('https://getsoft.vercel.app'),

  title: {
    default: 'جيت سوفت | شركة برمجة مواقع وتطبيقات وأنظمة ذكية',
    template: '%s | جيت سوفت',
  },

  applicationName: 'جيت سوفت',
  appleWebApp: {
    title: 'جيت سوفت',
    statusBarStyle: 'default',
    capable: true,
  },

  description:
    'جيت سوفت - Get Soft — شركة برمجيات متخصصة في تصميم وتطوير مواقع الويب الاحترافية، برمجة تطبيقات الجوال لـ Android و iOS، بناء الأنظمة المؤسسية الذكية، حلول التجارة الإلكترونية، وتصميم واجهات المستخدم (UI/UX) بأحدث التقنيات.',

  keywords: [
    'جيت سوفت',
    'Get Soft',
    'getsoft',
    'جيت سوفت للبرمجيات',
    'شركة برمجيات',
    'شركة برمجة',
    'تصميم مواقع الويب',
    'تطوير مواقع',
    'تصميم مواقع الكترونية',
    'مبرمج مواقع',
    'برمجة تطبيقات',
    'تطبيقات الموبايل',
    'تطبيقات الجوال',
    'تطبيقات اندرويد',
    'تطبيقات ايفون',
    'تصميم متجر الكتروني',
    'حلول برمجية',
    'تطوير النظم',
    'أنظمة مؤسسية',
    'أنظمة ذكية',
    'تصميم واجهات المستخدم',
    'شركة تصميم مواقع',
    'تصميم UI UX',
    'Next.js',
    'React',
    'برمجة احترافية',
    'شركة تقنية',
    'صنعاء',
    'اليمن',
    'الجمهورية اليمنية',
    'السعودية',
    'الرياض',
    'الامارات',
    'دبي',
    'الكويت',
    'قطر',
  ],

  authors: [{ name: 'جيت سوفت', url: 'https://getsoft.vercel.app' }],
  creator: 'جيت سوفت',
  publisher: 'جيت سوفت للبرمجيات',

  alternates: {
    canonical: 'https://getsoft.vercel.app',
    languages: { 'ar-YE': 'https://getsoft.vercel.app' },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_YE',
    url: 'https://getsoft.vercel.app',
    siteName: 'جيت سوفت',
    title: 'جيت سوفت | شركة برمجة مواقع وتطبيقات وأنظمة ذكية',
    description:
      'جيت سوفت - Get Soft — شركة برمجيات رائدة في تصميم وتطوير المواقع وتطبيقات الموبايل والأنظمة المخصصة لتوسيع نطاق أعمالك وحضورك الرقمي.',
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
    title: 'جيت سوفت | شركة برمجة مواقع وتطبيقات',
    description:
      'جيت سوفت - Get Soft — شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، والأنظمة المؤسسية.',
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-precomposed.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },

  manifest: '/manifest.json',

  verification: {
    google: 'google7464326adc760ed7',
  },
}

// JSON-LD Structured Data — الاسم الرسمي: جيت سوفت | alternateName: Get Soft
const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'جيت سوفت',
  alternateName: 'Get Soft',
  url: 'https://getsoft.vercel.app',
  image: '/logo.png',
  logo: '/logo.png',
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
    availableLanguage: ['Arabic'],
  },
  sameAs: [
    'https://twitter.com/getsoft2025',
    'https://instagram.com/getsoft2025',
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

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ik.imagekit.io" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
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

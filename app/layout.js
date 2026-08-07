import './globals.css'
import ScrollReveal from '@/components/layout/ScrollReveal'
import JsonLd from '@/components/JsonLd'

const BASE_URL = 'https://getsoft.vercel.app'

export async function generateMetadata({ params }) {
  const locale = (await params)?.locale || 'ar'
  const isAr = locale === 'ar'

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: isAr
        ? 'جيت سوفت | شركة برمجة مواقع وتطبيقات وأنظمة ذكية'
        : 'Get Soft | Web Development & Smart Systems Company',
      template: isAr ? '%s | جيت سوفت' : '%s | Get Soft',
    },
    description: isAr
      ? 'جيت سوفت - Get Soft — شركة برمجيات متخصصة في تصميم وتطوير مواقع الويب الاحترافية، برمجة تطبيقات الجوال، الأنظمة المؤسسية الذكية، حلول التجارة الإلكترونية وتصميم واجهات المستخدم UI/UX.'
      : 'Get Soft — A software company specializing in professional web design, mobile app development, smart enterprise systems, e-commerce solutions, and UI/UX design.',
    keywords: isAr
      ? [
        'جيت سوفت', 'Get Soft', 'getsoft', 'جيت سوفت للبرمجيات',
        'شركة برمجيات', 'شركة برمجة', 'تصميم مواقع الويب', 'تطوير مواقع',
        'تطبيقات الموبايل', 'تطبيقات الجوال', 'تطبيقات اندرويد', 'تطبيقات ايفون',
        'تصميم متجر الكتروني', 'أنظمة مؤسسية', 'أنظمة ذكية', 'تصميم UI UX',
        'صنعاء', 'اليمن', 'السعودية', 'الامارات', 'الكويت', 'قطر',
      ]
      : [
        'Get Soft', 'getsoft', 'software company', 'web development',
        'web design', 'mobile apps', 'android apps', 'ios apps',
        'e-commerce', 'enterprise systems', 'smart systems', 'UI UX design',
        'Next.js', 'React', 'professional programming', 'tech company',
        'Sanaa', 'Yemen', 'Saudi Arabia', 'UAE', 'Kuwait', 'Qatar',
      ],
    alternates: {
      canonical: '/',
      languages: { ar: '/ar', en: '/en' },
    },
    verification: {
      google: 'google7464326adc760ed7',
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
    openGraph: {
      type: 'website',
      locale: isAr ? 'ar_YE' : 'en_US',
      siteName: isAr ? 'جيت سوفت' : 'Get Soft',
      title: isAr
        ? 'جيت سوفت | شركة برمجة مواقع وتطبيقات وأنظمة ذكية'
        : 'Get Soft | Web & Mobile App Development Company',
      description: isAr
        ? 'جيت سوفت - Get Soft — شركة برمجيات رائدة في تصميم وتطوير المواقع وتطبيقات الموبايل والأنظمة المخصصة.'
        : 'Get Soft — A leading software company in web and mobile app design and development.',
      images: [
        {
          url: '/logo.png',
          width: 800,
          height: 800,
          alt: isAr ? 'شعار جيت سوفت' : 'Get Soft Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isAr
        ? 'جيت سوفت | شركة برمجة مواقع وتطبيقات'
        : 'Get Soft | Web & Mobile App Development Company',
      description: isAr
        ? 'جيت سوفت - Get Soft — شركة برمجيات متخصصة في تطوير مواقع الويب وتطبيقات الجوال.'
        : 'Get Soft — A software company specializing in web and mobile app development.',
      images: ['/logo.png'],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
  }
}

export default async function RootLayout({ children, params }) {
  const locale = (await params)?.locale || 'ar'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <JsonLd />
      </head>
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  )
}

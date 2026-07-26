import HomeClient from '@/components/HomeClient'
import { getStats, getServices, getProjects, getTestimonials } from '@/lib/supabase'

export const metadata = {
  title: 'Get Soft | للبرمجيات-تصميم مواقع الويب-تطبيقات الموبايل-انظمة ذكية',
  description:
    'Get Soft — شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية وتصميم UI/UX.',
  alternates: { canonical: 'https://getsoft.vercel.app' },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png?v=2', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png?v=2', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico?v=2'],
  },
}

export default async function HomePage() {
  // Fetch data from Supabase (server-side for SEO)
  const [stats, services, projects, testimonials] = await Promise.all([
    getStats(),
    getServices(),
    getProjects(null, null),
    getTestimonials(),
  ])

  return (
    <HomeClient
      stats={stats}
      services={services}
      projects={projects}
      testimonials={testimonials}
    />
  )
}

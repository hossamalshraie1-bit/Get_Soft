import HomeClient from '@/components/HomeClient'
import { getStats, getServices, getProjects, getTestimonials } from '@/lib/supabase'

export const metadata = {
  title: 'Get Soft | للبرمجيات-تصميم مواقع الويب-تطبيقات الموبايل-انظمة ذكية',
  description:
    'Get Soft — شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية وتصميم UI/UX.',
  alternates: { canonical: 'https://getsoft.vercel.app' },
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

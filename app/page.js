import HomeClient from '@/components/HomeClient'
import { getStats, getServices, getProjects, getTestimonials } from '@/lib/supabase'

export const metadata = {
  title: 'جيت سوفت | شركة برمجيات وتصميم مواقع الويب في السعودية',
  description:
    'جيت سوفت — شركة برمجيات متخصصة في تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية وتصميم UI/UX. خبرة +5 سنوات، +150 مشروع ناجح في المملكة العربية السعودية.',
  alternates: { canonical: 'https://getsoft.sa' },
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

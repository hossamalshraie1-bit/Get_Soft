import HomeClient from '@/components/HomeClient'
import { getStats, getServices, getProjects, getTestimonials } from '@/lib/supabase'



export const dynamic = 'force-dynamic'
export const revalidate = 0

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

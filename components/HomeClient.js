'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Services from '@/components/home/Services'
import Portfolio from '@/components/home/Portfolio'
import WhyUs from '@/components/home/WhyUs'
import Testimonials from '@/components/home/Testimonials'
import CTASection from '@/components/home/CTASection'

export default function HomeClient({ stats, services, projects, testimonials }) {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats stats={stats} />
        <Services services={services} />
        <Portfolio projects={projects} preview={true} />
        <WhyUs />
        <Testimonials testimonials={testimonials} />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

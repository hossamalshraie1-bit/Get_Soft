import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Portfolio from '@/components/home/Portfolio'
import { getProjects } from '@/lib/supabase'

export const metadata = {
  title: 'أعمالنا | Get Soft',
  description:
    'اكتشف مشاريعنا الناجحة في تطوير مواقع الويب، تطبيقات الجوال، والأنظمة المؤسسية. أكثر من 150 مشروع منجز لعملاء في الوطن العربي.',
  alternates: { canonical: 'https://getsoft.vercel.app/portfolio' },
  openGraph: {
    title: 'أعمالنا | Get Soft',
    description: 'معرض مشاريع Get Soft في البرمجة وتصميم المواقع.',
    url: 'https://getsoft.vercel.app/portfolio',
  },
}

export default async function PortfolioPage() {
  const projects = await getProjects()

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page Hero */}
        <section
          style={{
            paddingTop: '140px',
            paddingBottom: 'var(--space-16)',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-card)',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-labelledby="portfolio-page-heading"
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div className="container">
            <div className="section-title__tag" style={{ display: 'inline-flex', marginBottom: 'var(--space-4)' }}>
              🎨 أعمالنا
            </div>
            <h1 id="portfolio-page-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 'var(--space-4)' }}>
              مشاريع <span className="text-gradient">نفخر</span> بها
            </h1>
            <div className="gold-divider" />
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', margin: '0 auto', lineHeight: 1.7 }}>
              أكثر من 150 مشروع ناجح في مختلف القطاعات — كل مشروع قصة نجاح مع عميل راضٍ.
            </p>
          </div>
        </section>

        <Portfolio projects={projects} preview={false} hideHeader={true} />
      </main>
      <Footer />
    </>
  )
}

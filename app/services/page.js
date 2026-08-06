import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Services from '@/components/home/Services'
import { getServices } from '@/lib/supabase'

export const metadata = {
  title: 'خدماتنا',
  description:
    'جيت سوفت - Get Soft — اكتشف مجموعة خدماتنا التقنية الشاملة: تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية، تصميم UI/UX، التجارة الإلكترونية والاستضافة.',
  alternates: { canonical: 'https://getsoft.vercel.app/services' },
  openGraph: {
    title: 'جيت سوفت | خدماتنا',
    description: 'جيت سوفت - Get Soft — خدمات برمجية متكاملة للشركات والمؤسسات.',
    url: 'https://getsoft.vercel.app/services',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'خدمات Get Soft',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'تطوير مواقع الويب', url: 'https://getsoft.vercel.app/services#web' },
    { '@type': 'ListItem', position: 2, name: 'تطبيقات الجوال', url: 'https://getsoft.vercel.app/services#mobile' },
    { '@type': 'ListItem', position: 3, name: 'الأنظمة المؤسسية', url: 'https://getsoft.vercel.app/services#systems' },
    { '@type': 'ListItem', position: 4, name: 'تصميم UI/UX', url: 'https://getsoft.vercel.app/services#uiux' },
    { '@type': 'ListItem', position: 5, name: 'التجارة الإلكترونية', url: 'https://getsoft.vercel.app/services#ecommerce' },
    { '@type': 'ListItem', position: 6, name: 'الاستضافة والصيانة', url: 'https://getsoft.vercel.app/services#hosting' },
  ],
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <main id="main-content">
        {/* Page Hero */}
        <section
          style={{
            paddingTop: '80px',
            paddingBottom: '20px',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-card)',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-labelledby="services-page-heading"
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              height: '600px',
              background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div className="container">
            <div className="section-title__tag" style={{ display: 'inline-flex', marginBottom: 'var(--space-4)' }}>
              ⚡ خدماتنا
            </div>
            <h1 id="services-page-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 'var(--space-4)' }}>
              حلول تقنية <span className="text-gradient">متكاملة</span>
            </h1>
            <div className="gold-divider" />
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', margin: '0 auto', lineHeight: 1.7 }}>
              من الفكرة إلى التنفيذ — نقدم خدمات برمجية شاملة لمساعدتك على بناء حضور رقمي قوي.
            </p>
          </div>
        </section>

        <Services services={services} showAll={true} hideHeader={true} />
      </main>
      <Footer />
    </>
  )
}

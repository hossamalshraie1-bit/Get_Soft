import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'من نحن | Get Soft',
  description:
    'تعرف على شركة Get Soft، قصة نجاحنا، قيمنا، ورؤيتنا في تقديم أفضل الحلول البرمجية وتصميم مواقع الويب وتطبيقات الموبايل بأعلى جودة.',
  alternates: { canonical: 'https://getsoft.vercel.app/about' },
  openGraph: {
    title: 'من نحن | Get Soft',
    description: 'تعرف على قصة نجاح وقيم وفريق عمل Get Soft للبرمجيات.',
    url: 'https://getsoft.vercel.app/about',
  },
}

export default async function AboutPage() {
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
          aria-labelledby="about-heading"
        >
          <div className="container">
            <div className="section-title__tag" style={{ display: 'inline-flex', marginBottom: 'var(--space-4)' }}>
              ✨ قصة نجاحنا
            </div>
            <h1 id="about-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 'var(--space-4)' }}>
              من نحن - <span className="text-gradient">Get Soft</span>
            </h1>
            <div className="gold-divider" />
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              شريكك التقني الموثوق لبناء وتطوير المشاريع الرقمية والحلول البرمجية المبتكرة.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="section" aria-label="قصتنا وقيمنا">
          <div className="container">
            <div className="about-story__grid">
              <div>
                <h2 className="about-story__title">
                  رؤيتنا <span className="text-gradient">ورسالتنا</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-base)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
                  في <strong>Get Soft</strong>، نسعى لأن نكون الشركة الرائدة في مجال تقديم الحلول البرمجية وتصميم المواقع وتطوير الأنظمة الذكية في العالم العربي. نؤمن بأن التقنية هي عصب الأعمال الحديثة، ولذلك نكرس جهودنا لتقديم منتجات تقنية تفوق توقعات عملائنا.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-base)', lineHeight: 1.8 }}>
                  رسالتنا هي تمكين الشركات والمشاريع الناشئة من التحول الرقمي الكامل والسلس من خلال توظيف أفضل الممارسات البرمجية وأحدث التقنيات لإنتاج برمجيات عالية الكفاءة والأمان والسرعة.
                </p>
              </div>
              <div className="about-story__values">
                <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--gold-primary)', marginBottom: 'var(--space-4)', fontWeight: 700 }}>
                  قيمنا الأساسية ✨
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {[
                    { title: 'الالتزام بالجودة', desc: 'لا نرضى بغير الامتياز في جودة الأكواد والتصاميم.' },
                    { title: 'الشفافية الكاملة', desc: 'نشارك عملائنا تفاصيل تقدم المشروع خطوة بخطوة.' },
                    { title: 'الابتكار المستمر', desc: 'نواكب أحدث التقنيات العالمية ونطبقها في أعمالنا.' },
                    { title: 'دعم لا ينقطع', desc: 'شراكتنا تبدأ بعد تسليم المشروع عبر دعم فني متميز.' },
                  ].map((value, i) => (
                    <li key={i} style={{ display: 'flex', gap: 'var(--space-3)' }}>
                      <span style={{ color: 'var(--gold-primary)', fontSize: '1.2rem', fontWeight: 'bold' }}>✓</span>
                      <div>
                        <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{value.title}</strong>
                        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{value.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

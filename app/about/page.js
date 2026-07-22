import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/home/CTASection'
import { getTeam } from '@/lib/supabase'

export const metadata = {
  title: 'من نحن | جيت سوفت',
  description:
    'تعرف على شركة جيت سوفت، قصة نجاحنا، قيمنا، ورؤيتنا في تقديم أفضل الحلول البرمجية وتصميم مواقع الويب وتطبيقات الموبايل بأعلى جودة.',
  alternates: { canonical: 'https://getsoft.sa/about' },
  openGraph: {
    title: 'من نحن | جيت سوفت',
    description: 'تعرف على قصة نجاح وقيم وفريق عمل جيت سوفت للبرمجيات.',
    url: 'https://getsoft.sa/about',
  },
}

const DEFAULT_TEAM = [
  { name: 'محمد الغامدي', role: 'المدير التقني', bio: 'خبرة أكثر من 8 سنوات في تطوير البرمجيات والأنظمة المؤسسية. متخصص في Next.js وNode.js وقواعد البيانات.' },
  { name: 'ليلى الشمري', role: 'مصممة UI/UX', bio: 'مصممة إبداعية بخبرة 6 سنوات في تصميم واجهات المستخدم. متخصصة في Figma وتجربة المستخدم.' },
  { name: 'عمر السعد', role: 'مطور موبايل', bio: 'مطور تطبيقات موبايل محترف بخبرة 5 سنوات في React Native وFlutter. نفّذ أكثر من 40 تطبيقاً ناجحاً.' },
  { name: 'نورة الحربي', role: 'مديرة المشاريع', bio: 'خبرة في إدارة المشاريع التقنية وتوجيه فرق العمل لضمان جودة التسليم ورضا العملاء.' },
]

export default async function AboutPage() {
  const teamData = await getTeam()
  const team = teamData.length > 0 ? teamData : DEFAULT_TEAM

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
              من نحن - <span className="text-gradient">جيت سوفت</span>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-6)', fontWeight: 800 }}>
                  رؤيتنا <span className="text-gradient">ورسالتنا</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-base)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
                  في <strong>Get Soft</strong>، نسعى لأن نكون الشركة الرائدة في مجال تقديم الحلول البرمجية وتصميم المواقع وتطوير الأنظمة الذكية في العالم العربي. نؤمن بأن التقنية هي عصب الأعمال الحديثة، ولذلك نكرس جهودنا لتقديم منتجات تقنية تفوق توقعات عملائنا.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-base)', lineHeight: 1.8 }}>
                  رسالتنا هي تمكين الشركات والمشاريع الناشئة من التحول الرقمي الكامل والسلس من خلال توظيف أفضل الممارسات البرمجية وأحدث التقنيات لإنتاج برمجيات عالية الكفاءة والأمان والسرعة.
                </p>
              </div>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
                boxShadow: 'var(--shadow-gold)',
              }}>
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

        {/* Team Section */}
        <section className="section" style={{ background: 'var(--bg-secondary)' }} aria-labelledby="team-heading">
          <div className="container">
            <div className="section-title">
              <div className="section-title__tag">👥 عائلة جيت سوفت</div>
              <h2 className="section-title__heading" id="team-heading">
                فريق عمل <span className="text-gradient">محترف</span>
              </h2>
              <div className="gold-divider" />
              <p className="section-title__description">
                نخبة من المطورين والمصممين ومهندسي الأنظمة الملتزمين بالتميز والنجاح.
              </p>
            </div>

            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-card__avatar">
                    {member.avatar_url ? (
                      <img src={member.avatar_url} alt={member.name} />
                    ) : (
                      member.name.charAt(0)
                    )}
                  </div>
                  <h3 className="team-card__name">{member.name}</h3>
                  <div className="team-card__role">{member.role}</div>
                  <p className="team-card__bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  )
}

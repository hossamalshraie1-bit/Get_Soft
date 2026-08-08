import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'شروط الاستخدام',
  description: 'جيت سوفت - Get Soft — شروط وأحكام استخدام موقع شركة جيت سوفت للبرمجيات وتصميم المواقع.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="mb-6" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800 }}>شروط <span className="text-gradient">الاستخدام</span></h1>
          <div className="card">
            <p className="mb-4">يرجى قراءة شروط الاستخدام هذه بعناية قبل تصفح أو استخدام الخدمات المقدمة عبر موقع جيت سوفت (Get Soft).</p>

            <h3 style={{ color: 'var(--gold-primary)', marginTop: '20px', marginBottom: '10px' }}>1. قبول الشروط</h3>
            <p className="mb-4">باستخدامك لموقعنا، فإنك تقر بموافقتك على هذه الشروط والأحكام والالتزام بها بالكامل.</p>

            <h3 style={{ color: 'var(--gold-primary)', marginTop: '20px', marginBottom: '10px' }}>2. الملكية الفكرية</h3>
            <p className="mb-4">جميع محتويات الموقع من نصوص، أكواد، تصميمات، وشعارات هي ملك لشركة جيت سوفت (Get Soft)، ويُمنع نسخها أو إعادة استخدامها دون إذن كتابي مسبق.</p>

            <h3 style={{ color: 'var(--gold-primary)', marginTop: '20px', marginBottom: '10px' }}>3. الاستخدام المقبول</h3>
            <p className="mb-4">يُمنع استخدام الموقع بأي طريقة قد تلحق الضرر بالبنية التحتية للموقع أو تعطيل خدماتنا أو الإضرار بخصوصية المستخدمين الآخرين.</p>

            <h3 style={{ color: 'var(--gold-primary)', marginTop: '20px', marginBottom: '10px' }}>4. إخلاء المسؤولية</h3>
            <p>نسعى جاهدين لتقديم معلومات دقيقة ومحدثة، ولكننا لا نتحمل أي مسؤولية عن أي أخطاء غير مقصودة أو أضرار ناجمة عن استخدام أو عدم القدرة على استخدام هذا الموقع.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

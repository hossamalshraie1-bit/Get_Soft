import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'سياسة الخصوصية | جيت سوفت',
  description: 'سياسة الخصوصية وحماية البيانات لشركة جيت سوفت للبرمجيات وتصميم المواقع.',
  robots: { index: false, follow: true }, // عادة لا نريد أرشفة هذه الصفحات ولكن نريد تتبع الروابط
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="mb-6" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800 }}>سياسة <span className="text-gradient">الخصوصية</span></h1>
          <div className="card">
            <p className="mb-4">في جيت سوفت، نلتزم بحماية خصوصية وأمان معلومات زوار موقعنا وعملائنا. توضح هذه الصفحة كيفية جمع واستخدام وحماية البيانات التي تزودنا بها.</p>

            <h3 style={{ color: 'var(--gold-primary)', marginTop: '20px', marginBottom: '10px' }}>1. جمع المعلومات</h3>
            <p className="mb-4">نقوم بجمع المعلومات التي تقدمها لنا طواعية عند ملء نموذج الاتصال، مثل الاسم، البريد الإلكتروني، ورقم الهاتف، وذلك لغرض التواصل معك وتقديم الخدمة المطلوبة.</p>

            <h3 style={{ color: 'var(--gold-primary)', marginTop: '20px', marginBottom: '10px' }}>2. استخدام المعلومات</h3>
            <p className="mb-4">نستخدم معلوماتك للرد على استفساراتك، وتقديم الدعم الفني، وإرسال تحديثات حول خدماتنا أو مشاريعنا المشتركة، ولا نقوم ببيع أو مشاركة بياناتك مع أي طرف ثالث.</p>

            <h3 style={{ color: 'var(--gold-primary)', marginTop: '20px', marginBottom: '10px' }}>3. ملفات تعريف الارتباط (Cookies)</h3>
            <p className="mb-4">قد نستخدم ملفات تعريف الارتباط لتحسين تجربة تصفحك للموقع وفهم كيفية استخدام الزوار لخدماتنا.</p>

            <h3 style={{ color: 'var(--gold-primary)', marginTop: '20px', marginBottom: '10px' }}>4. التعديل على سياسة الخصوصية</h3>
            <p>نحتفظ بالحق في تعديل سياسة الخصوصية هذه في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة فور اعتمادها.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

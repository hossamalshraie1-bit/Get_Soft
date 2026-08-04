import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 20px 60px' }}>
        <div>
          <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--gold-primary)', marginBottom: '16px' }}>404</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>الصفحة غير موجودة</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
          <Link href="/" className="btn btn-primary">
            العودة للرئيسية ←
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

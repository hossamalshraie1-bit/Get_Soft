'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { sendMessage } from '@/lib/supabase'

export default function ContactClient({ initialSettings }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' })
    }, 4000)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      showToastMsg('يرجى ملء جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، الرسالة)', 'error')
      return
    }

    setLoading(true)
    const res = await sendMessage(form)
    setLoading(false)

    if (res.success) {
      showToastMsg('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } else {
      showToastMsg('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error')
    }
  }

  const settings = {
    phone: '+966 50 000 0000',
    email: 'info@getsoft.sa',
    address: 'الرياض، المملكة العربية السعودية',
    working_hours: 'الأحد - الخميس: 9 صباحاً - 6 مساءً',
    ...initialSettings,
  }

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
          aria-labelledby="contact-heading"
        >
          <div className="container">
            <div className="section-title__tag" style={{ display: 'inline-flex', marginBottom: 'var(--space-4)' }}>
              💬 تواصل معنا
            </div>
            <h1 id="contact-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 'var(--space-4)' }}>
              دعنا نتحدث عن <span className="text-gradient">مشروعك</span>
            </h1>
            <div className="gold-divider" />
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              سواء كانت لديك فكرة مشروع جديدة أو استفسار عن خدماتنا، نحن هنا لمساعدتك.
            </p>
          </div>
        </section>

        {/* Contact Grid Section */}
        <section className="section">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Information */}
              <div>
                <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-6)', fontWeight: 800 }}>
                  معلومات <span className="text-gradient">الاتصال</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', lineHeight: 1.8 }}>
                  فريقنا متواجد للرد على جميع استفساراتك وتقديم الاستشارات التقنية. لا تتردد في الاتصال بنا.
                </p>

                <div className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">📍</span>
                  <div>
                    <div className="contact-info__label">الموقع</div>
                    <div className="contact-info__value">{settings.address}</div>
                  </div>
                </div>

                <div className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">📞</span>
                  <div>
                    <div className="contact-info__label">الهاتف</div>
                    <div className="contact-info__value">
                      <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} style={{ color: 'inherit' }}>
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">✉️</span>
                  <div>
                    <div className="contact-info__label">البريد الإلكتروني</div>
                    <div className="contact-info__value">
                      <a href={`mailto:${settings.email}`} style={{ color: 'inherit' }}>
                        {settings.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">🕐</span>
                  <div>
                    <div className="contact-info__label">أوقات العمل</div>
                    <div className="contact-info__value">{settings.working_hours}</div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form">
                <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-6)', fontWeight: 800 }}>
                  أرسل لنا <span className="text-gradient">رسالة</span>
                </h2>
                <form onSubmit={handleSubmit} aria-label="نموذج الاتصال">
                  <div className="contact-form__grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">الاسم الكريم *</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="أدخل اسمك الكامل"
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">البريد الإلكتروني *</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="example@domain.com"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="contact-form__grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">رقم الجوال (اختياري)</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="05xxxxxxx"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-subject">موضوع الرسالة</label>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="ما هو موضوع استفسارك؟"
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                    <label className="form-label" htmlFor="contact-message">تفاصيل المشروع / الرسالة *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="يرجى وصف تفاصيل مشروعك أو سؤالك بدقة..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn--lg"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={loading}
                    id="submit-contact-form"
                  >
                    {loading ? 'جاري الإرسال...' : 'إرسال الرسالة 🚀'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Toast Notification */}
        <div className={`toast ${toast.show ? 'show' : ''} ${toast.type === 'error' ? 'error' : 'success'}`} role="alert" aria-live="assertive">
          <span>{toast.type === 'error' ? '❌' : '✨'}</span>
          <span>{toast.message}</span>
        </div>
      </main>
      <Footer />
    </>
  )
}

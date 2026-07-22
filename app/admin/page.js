'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getMessages, markMessageAsRead } from '@/lib/supabase'

export default function AdminPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages()
    }
  }, [isAuthenticated])

  const fetchMessages = async () => {
    setLoading(true)
    const data = await getMessages()
    setMessages(data)
    setLoading(false)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // بسيطة جداً لأغراض العرض والتحكم المحلي
    if (password === 'getsoft2026') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('كلمة المرور غير صحيحة!')
    }
  }

  const handleMarkRead = async (id) => {
    const success = await markMessageAsRead(id)
    if (success) {
      setMessages(messages.map(msg => msg.id === id ? { ...msg, read: true } : msg))
    }
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
            <h2 className="text-center mb-6">لوحة الإدارة <span className="text-gradient">Get Soft</span></h2>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-4">
                <label className="form-label" htmlFor="admin-password">كلمة المرور للدخول</label>
                <input
                  type="password"
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control text-center"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && <p style={{ color: '#ef4444', fontSize: 'var(--font-size-sm)', textAlign: 'center', marginBottom: 'var(--space-4)' }}>{error}</p>}
              <button type="submit" className="btn btn-primary w-full" id="admin-login-btn">
                دخول اللوحة
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800 }}>لوحة إدارة <span className="text-gradient">الرسائل</span></h1>
              <p style={{ color: 'var(--text-secondary)' }}>إدارة الرسائل الواردة من نموذج اتصل بنا</p>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="btn btn-secondary btn--sm">
              تسجيل خروج
            </button>
          </div>

          <div className="admin-card">
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-6)', fontWeight: 700 }}>الرسائل الواردة ({messages.length})</h2>

            {loading ? (
              <div className="flex justify-center items-center" style={{ minHeight: '200px' }}>
                <div className="spinner" />
              </div>
            ) : messages.length === 0 ? (
              <p className="text-center text-muted" style={{ padding: '40px' }}>لا توجد رسائل واردة حالياً.</p>
            ) : (
              <div className="overflow-hidden" style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>البريد الإلكتروني</th>
                      <th>الجوال</th>
                      <th>الموضوع</th>
                      <th>الرسالة</th>
                      <th>التاريخ</th>
                      <th>الحالة</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr key={msg.id} style={{ opacity: msg.read ? 0.7 : 1 }}>
                        <td style={{ fontWeight: msg.read ? 'normal' : 'bold' }}>{msg.name}</td>
                        <td><a href={`mailto:${msg.email}`} style={{ color: 'var(--gold-primary)' }}>{msg.email}</a></td>
                        <td>{msg.phone || '—'}</td>
                        <td>{msg.subject || '—'}</td>
                        <td style={{ maxWidth: '250px', whiteSpace: 'normal', wordBreak: 'break-word' }}>{msg.message}</td>
                        <td>{new Date(msg.created_at).toLocaleDateString('ar-SA')}</td>
                        <td>
                          {msg.read ? (
                            <span className="badge badge-dark" style={{ background: '#22c55e20', color: '#22c55e' }}>مقروءة</span>
                          ) : (
                            <span className="badge badge-gold" style={{ background: 'var(--gold-glow)', color: 'var(--gold-primary)' }}>جديدة</span>
                          )}
                        </td>
                        <td>
                          {!msg.read && (
                            <button
                              onClick={() => handleMarkRead(msg.id)}
                              className="btn btn-primary btn--sm"
                              id={`mark-read-${msg.id}`}
                            >
                              تحديد كمقروء
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

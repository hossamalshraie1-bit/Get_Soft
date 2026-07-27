'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { uploadToImageKit } from '@/lib/imagekit'
import { supabase } from '@/lib/supabase'

import {
  getProjects,
  getServices,
  getTestimonials,
  getSiteSettings,
  createProject,
  updateProject,
  deleteProject,
  createService,
  updateService,
  deleteService,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '@/lib/supabase'

const DEFAULT_SETTINGS = {
  hero_title: 'نبني المستقبل الرقمي لشركتك',
  hero_subtitle: 'نطور تطبيقات ومواقع ويب احترافية وأنظمة مؤسسية عالية الجودة تضمن نجاح مشروعك.',
  phone: '+967 776 158 797',
  email: 'getsoft2025@gmail.com',
  address: 'صنعاء، اليمن',
  working_hours: 'السبت - الخميس: 9 صباحاً - 6 مساءً',
  stat_projects: '50+',
  stat_experience: '+8',
  stat_clients: '100+',
  stat_satisfaction: '99%',
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Current active tab
  const [activeTab, setActiveTab] = useState('overview')

  // Notification Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const notify = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
  }

  // Datasets State (Initialized empty to load directly from Supabase)
  const [services, setServices] = useState([])
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [team, setTeam] = useState([])
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  // Search Filter Query
  const [searchQuery, setSearchQuery] = useState('')

  // Modals state for Adding / Editing items
  const [modalType, setModalType] = useState(null) // 'service', 'project', 'testimonial', 'team'
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [uploadingImages, setUploadingImages] = useState(false)

  // ImageKit Upload Handlers
  const handleImageFilesUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files || files.length === 0) return

    setUploadingImages(true)
    try {
      const uploadPromises = files.map((file) => uploadToImageKit(file))
      const results = await Promise.all(uploadPromises)
      const uploadedUrls = results.map((res) => res.url)

      const existingImages = Array.isArray(formData.images)
        ? formData.images
        : typeof formData.images === 'string' && formData.images.trim().length > 0
          ? formData.images.split(',').map((s) => s.trim())
          : formData.image_url
            ? [formData.image_url]
            : []

      const newImagesList = [...existingImages, ...uploadedUrls]
      const mainImageUrl = formData.image_url || newImagesList[0] || ''

      setFormData((prev) => ({
        ...prev,
        images: newImagesList,
        image_url: mainImageUrl,
      }))

      notify(`تم رفع ${results.length} صورة إلى ImageKit بنجاح 📸`)
    } catch (err) {
      console.error('ImageKit upload error:', err)
      notify('حدث خطأ أثناء رفع الصور، يرجى المحاولة لاحقاً', 'error')
    } finally {
      setUploadingImages(false)
    }
  }

  const handleRemoveImage = (indexToRemove) => {
    const currentImages = Array.isArray(formData.images)
      ? formData.images
      : typeof formData.images === 'string' && formData.images.trim().length > 0
        ? formData.images.split(',').map((s) => s.trim())
        : []

    const updatedImages = currentImages.filter((_, idx) => idx !== indexToRemove)
    const updatedMainUrl =
      formData.image_url === currentImages[indexToRemove]
        ? updatedImages[0] || ''
        : formData.image_url

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
      image_url: updatedMainUrl,
    }))
  }

  const handleSetMainImage = (url) => {
    setFormData((prev) => ({
      ...prev,
      image_url: url,
    }))
    notify('تم تعيين الصورة كصورة رئيسية للمشروع ⭐')
  }

  // Check Supabase session on mount and load data
  useEffect(() => {
    async function init() {
      try {
        // Check active Supabase session
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setIsAuthenticated(true)
        }

        // Load live data from Supabase
        const [pData, sData, tData, stData] = await Promise.all([
          getProjects(),
          getServices(),
          getTestimonials(),
          getSiteSettings(),
        ])

        if (pData) setProjects(pData)
        if (sData) setServices(sData)
        if (tData) setTestimonials(tData)
        if (stData && Object.keys(stData).length > 0) {
          setSettings((prev) => ({ ...prev, ...stData }))
        }
      } catch (e) {
        console.error('Error initializing admin page', e)
      }
    }
    init()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Helper sync to localStorage
  const saveServices = (data) => {
    setServices(data)
    localStorage.setItem('admin_services', JSON.stringify(data))
  }
  const saveProjects = (data) => {
    setProjects(data)
    localStorage.setItem('admin_projects', JSON.stringify(data))
  }
  const saveTestimonials = (data) => {
    setTestimonials(data)
    localStorage.setItem('admin_testimonials', JSON.stringify(data))
  }
  const saveTeam = (data) => {
    setTeam(data)
    localStorage.setItem('admin_team', JSON.stringify(data))
  }
  const saveSettingsData = (data) => {
    setSettings(data)
    localStorage.setItem('admin_settings', JSON.stringify(data))
  }

  // Handle Login via Supabase Auth
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoginLoading(true)
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة!')
        return
      }
      if (data?.session) {
        setIsAuthenticated(true)
        notify('تم تسجيل الدخول بنجاح ✨')
      }
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
  }

  // Modal Open Handler
  const openModal = (type, item = null) => {
    setModalType(type)
    setEditingItem(item)
    if (item) {
      setFormData({ ...item })
    } else {
      if (type === 'service') {
        setFormData({ icon: '⚡', title: '', description: '', features: '', popular: false })
      } else if (type === 'project') {
        setFormData({ title: '', category: 'web', client: '', year: new Date().getFullYear(), tech_stack: '', image_url: '' })
      } else if (type === 'testimonial') {
        setFormData({ name: '', position: '', company: '', content: '', rating: 5 })
      } else if (type === 'team') {
        setFormData({ name: '', role: '', bio: '', avatar_url: '' })
      }
    }
  }

  const closeModal = () => {
    setModalType(null)
    setEditingItem(null)
    setFormData({})
  }

  // Generic Submit Handler for Forms
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (modalType === 'service') {
      const payload = {
        ...formData,
        features: typeof formData.features === 'string'
          ? formData.features.split(',').map((s) => s.trim()).filter(Boolean)
          : formData.features || [],
      }

      if (editingItem) {
        const res = await updateService(editingItem.id, payload)
        if (res.success) notify('تم تعديل الخدمة بنجاح في Supabase ✨')
        else notify(res.error || 'حدث خطأ أثناء تعديل الخدمة', 'error')
      } else {
        const res = await createService(payload)
        if (res.success) notify('تمت إضافة الخدمة بنجاح إلى Supabase ✨')
        else notify(res.error || 'حدث خطأ أثناء إضافة الخدمة', 'error')
      }
      const updatedServices = await getServices()
      setServices(updatedServices)
    } else if (modalType === 'project') {
      const techStackArr = typeof formData.tech_stack === 'string'
        ? formData.tech_stack.split(',').map((s) => s.trim()).filter(Boolean)
        : Array.isArray(formData.tech_stack)
          ? formData.tech_stack
          : []

      const imagesArr = Array.isArray(formData.images)
        ? formData.images
        : typeof formData.images === 'string' && formData.images.trim().length > 0
          ? formData.images.split(',').map((s) => s.trim()).filter(Boolean)
          : formData.image_url
            ? [formData.image_url]
            : []

      const payload = {
        title: formData.title,
        category: formData.category || 'web',
        description: formData.description || '',
        client: formData.client || '',
        year: parseInt(formData.year) || new Date().getFullYear(),
        tech_stack: techStackArr,
        image_url: formData.image_url || imagesArr[0] || '',
        images: imagesArr,
        project_url: formData.project_url || '',
        featured: formData.featured || false,
      }

      if (editingItem) {
        const res = await updateProject(editingItem.id, payload)
        if (res.success) notify('تم تعديل المشروع بنجاح في Supabase 🎨')
        else notify(res.error || 'حدث خطأ أثناء تعديل المشروع', 'error')
      } else {
        const res = await createProject(payload)
        if (res.success) notify('تمت إضافة المشروع بنجاح إلى Supabase 🎨')
        else notify(res.error || 'حدث خطأ أثناء إضافة المشروع', 'error')
      }
      const updatedProjects = await getProjects()
      setProjects(updatedProjects)
    } else if (modalType === 'testimonial') {
      const payload = {
        name: formData.name,
        position: formData.position || '',
        company: formData.company || '',
        content: formData.content,
        rating: parseInt(formData.rating) || 5,
      }

      if (editingItem) {
        const res = await updateTestimonial(editingItem.id, payload)
        if (res.success) notify('تم تعديل الرأي بنجاح في Supabase 💬')
        else notify(res.error || 'حدث خطأ أثناء تعديل الرأي', 'error')
      } else {
        const res = await createTestimonial(payload)
        if (res.success) notify('تمت إضافة الرأي بنجاح إلى Supabase 💬')
        else notify(res.error || 'حدث خطأ أثناء إضافة الرأي', 'error')
      }
      const updatedTestimonials = await getTestimonials()
      setTestimonials(updatedTestimonials)
    }
    closeModal()
  }

  // Delete Item Handlers
  const handleDeleteService = async (id) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف هذه الخدمة من قواعد البيانات؟')) {
      const ok = await deleteService(id)
      if (ok) {
        notify('تم حذف الخدمة بنجاح من Supabase', 'error')
        const updated = await getServices()
        setServices(updated)
      } else {
        notify('حدث خطأ أثناء حذف الخدمة', 'error')
      }
    }
  }

  const handleDeleteProject = async (id) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف هذا المشروع من قواعد البيانات؟')) {
      const ok = await deleteProject(id)
      if (ok) {
        notify('تم حذف المشروع بنجاح من Supabase', 'error')
        const updated = await getProjects()
        setProjects(updated)
      } else {
        notify('حدث خطأ أثناء حذف المشروع', 'error')
      }
    }
  }

  const handleDeleteTestimonial = async (id) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف هذا الرأي من قواعد البيانات؟')) {
      const ok = await deleteTestimonial(id)
      if (ok) {
        notify('تم حذف الرأي بنجاح من Supabase', 'error')
        const updated = await getTestimonials()
        setTestimonials(updated)
      } else {
        notify('حدث خطأ أثناء حذف الرأي', 'error')
      }
    }
  }

  const handleSettingsSubmit = async (e) => {
    e.preventDefault()
    const res = await updateSiteSettings(settings)
    if (res.success) {
      notify('تم حفظ وتحديث إعدادات الموقع بنجاح في Supabase ✨')
      const updatedSettings = await getSiteSettings()
      if (updatedSettings && Object.keys(updatedSettings).length > 0) {
        setSettings((prev) => ({ ...prev, ...updatedSettings }))
      }
    } else {
      notify(res.error || 'حدث خطأ أثناء حفظ الإعدادات', 'error')
    }
  }

  // Render Login view if unauthenticated
  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '100px',
            paddingBottom: '80px',
            background: 'var(--bg-primary)',
          }}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '440px',
              margin: '0 auto',
              padding: 'var(--space-8)',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 0 40px rgba(201,168,76,0.12)',
            }}
          >
            {/* Logo & Title */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-7)' }}>
              <img
                src="/logo.png"
                alt="Get Soft Logo"
                style={{
                  height: '68px',
                  width: '68px',
                  margin: '0 auto var(--space-4)',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  display: 'block',
                  boxShadow: '0 6px 24px rgba(201,168,76,0.45)',
                  border: '2px solid var(--gold-border)',
                }}
              />
              <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 900, marginBottom: 'var(--space-2)' }}>
                لوحة التحكم <span className="text-gradient">Get Soft</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                أدخل بيانات حساب المدير للوصول إلى اللوحة
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="admin-email">📧 البريد الإلكتروني</label>
                <input
                  type="email"
                  id="admin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                  style={{ direction: 'ltr', textAlign: 'left' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="admin-password">🔒 كلمة المرور</label>
                <input
                  type="password"
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 14px',
                    color: '#ef4444',
                    fontSize: 'var(--font-size-sm)',
                    textAlign: 'center',
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loginLoading}
                style={{ justifyContent: 'center', width: '100%', marginTop: 'var(--space-2)', opacity: loginLoading ? 0.7 : 1 }}
              >
                {loginLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول ✨'}
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
      <main className="min-h-screen" style={{ paddingTop: '100px', paddingBottom: '80px', background: 'var(--bg-primary)' }}>
        <div className="container">
          {/* Admin Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: 'var(--space-6)' }}>
            <div>
              <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 900 }}>
                لوحة إدارة <span className="text-gradient">المنصة</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                إدارة كافة بيانات ومحتوى موقع Get Soft بدقة وسهولة
              </p>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary btn--sm">
              🚪 تسجيل خروج
            </button>
          </div>

          {/* Navigation Bar / Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-card)' }}>
            {[
              { id: 'overview', label: '📊 اللوحة العامة' },
              { id: 'services', label: `⚡ الخدمات (${services.length})` },
              { id: 'portfolio', label: `🎨 الأعمال (${projects.length})` },
              { id: 'testimonials', label: `💬 آراء العملاء (${testimonials.length})` },
              // { id: 'team', label: `👥 الفريق (${team.length})` },
              { id: 'settings', label: '⚙️ إعدادات الموقع' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSearchQuery('') }}
                className={`filter-btn ${activeTab === tab.id ? 'active' : ''}`}
                style={{ flexShrink: 0, padding: '8px 16px', fontSize: '0.85rem' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 📊 TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: 'var(--space-8)' }}>
                <div className="admin-card" style={{ marginBottom: 0 }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⚡</div>
                  <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>{services.length}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>إجمالي الخدمات النشطة</div>
                </div>
                <div className="admin-card" style={{ marginBottom: 0 }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎨</div>
                  <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>{projects.length}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>إجمالي الأعمال والمشاريع</div>
                </div>
                <div className="admin-card" style={{ marginBottom: 0 }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💬</div>
                  <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>{testimonials.length}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>آراء وتقييمات العملاء</div>
                </div>
                <div className="admin-card" style={{ marginBottom: 0 }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
                  <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>{team.length}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>أعضاء فريق العمل</div>
                </div>
              </div>

              <div className="admin-card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>🚀 اختصارات وسريعة</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button onClick={() => openModal('service')} className="btn btn-primary btn--sm">
                    + إضافة خدمة جديدة
                  </button>
                  <button onClick={() => openModal('project')} className="btn btn-primary btn--sm">
                    + إضافة مشروع جديد
                  </button>
                  <button onClick={() => openModal('testimonial')} className="btn btn-primary btn--sm">
                    + إضافة رأي عميل
                  </button>
                  {/* <button onClick={() => openModal('team')} className="btn btn-primary btn--sm">
                    + إضافة عضو فريق
                  </button> */}
                </div>
              </div>
            </div>
          )}

          {/* ⚡ TAB 2: SERVICES */}
          {activeTab === 'services' && (
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>إدارة الخدمات</h2>
                <button onClick={() => openModal('service')} className="btn btn-primary btn--sm">
                  + إضافة خدمة جديدة
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>الأيقونة</th>
                      <th>عنوان الخدمة</th>
                      <th>الوصف</th>
                      <th>المميزات</th>
                      <th>مميزة؟</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontSize: '1.5rem' }}>{item.icon}</td>
                        <td style={{ fontWeight: 'bold' }}>{item.title}</td>
                        <td style={{ maxWidth: '280px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.description}</td>
                        <td style={{ maxWidth: '200px', fontSize: '0.8rem' }}>{item.features}</td>
                        <td>
                          {item.popular ? (
                            <span style={{ background: 'var(--gold-glow)', color: 'var(--gold-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>مميزة ✨</span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>عادية</span>
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={() => openModal('service', item)} className="btn btn-secondary btn--sm" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                              تعديل
                            </button>
                            <button onClick={() => handleDeleteService(item.id)} className="btn btn-secondary btn--sm" style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#ef4444', borderColor: '#ef444440' }}>
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 🎨 TAB 3: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>إدارة معرض الأعمال ({projects.length})</h2>
                <button onClick={() => openModal('project')} className="btn btn-primary btn--sm">
                  + إضافة مشروع جديد
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>اسم المشروع</th>
                      <th>التصنيف</th>
                      <th>العميل والسنة</th>
                      <th>التقنيات</th>
                      <th>الوصف والرابط</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 'bold' }}>{item.title}</td>
                        <td>
                          <span style={{ background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--gold-primary)' }}>
                            {item.category}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.85rem' }}>
                          <div>{item.client || '—'}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.year || '2024'}</div>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '180px' }}>{item.tech_stack || '—'}</td>
                        <td style={{ maxWidth: '220px', fontSize: '0.8rem' }}>
                          {item.description && <div style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</div>}
                          {item.project_url && (
                            <a href={item.project_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-primary)', fontSize: '0.75rem', display: 'inline-block', marginTop: '2px' }}>
                              🔗 رابط المعاينة
                            </a>
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={() => openModal('project', item)} className="btn btn-secondary btn--sm" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                              تعديل
                            </button>
                            <button onClick={() => handleDeleteProject(item.id)} className="btn btn-secondary btn--sm" style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#ef4444', borderColor: '#ef444440' }}>
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 💬 TAB 4: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>إدارة آراء العملاء</h2>
                <button onClick={() => openModal('testimonial')} className="btn btn-primary btn--sm">
                  + إضافة رأي جديد
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>اسم العميل</th>
                      <th>المسمى والشركة</th>
                      <th>الرأي / المحتوى</th>
                      <th>التقييم</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonials.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 'bold' }}>{item.name}</td>
                        <td style={{ fontSize: '0.85rem' }}>{item.position} - {item.company}</td>
                        <td style={{ maxWidth: '300px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.content}</td>
                        <td style={{ color: 'var(--gold-primary)' }}>{'★'.repeat(item.rating || 5)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={() => openModal('testimonial', item)} className="btn btn-secondary btn--sm" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                              تعديل
                            </button>
                            <button onClick={() => handleDeleteTestimonial(item.id)} className="btn btn-secondary btn--sm" style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#ef4444', borderColor: '#ef444440' }}>
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 👥 TAB 5: TEAM */}
          {/* {activeTab === 'team' && (
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>إدارة فريق العمل</h2>
                <button onClick={() => openModal('team')} className="btn btn-primary btn--sm">
                  + إضافة عضو جديد
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>الدور / المسمى الوظيفي</th>
                      <th>النبذة المختصرة</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 'bold' }}>{item.name}</td>
                        <td style={{ color: 'var(--gold-primary)', fontSize: '0.85rem' }}>{item.role}</td>
                        <td style={{ maxWidth: '300px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.bio}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={() => openModal('team', item)} className="btn btn-secondary btn--sm" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                              تعديل
                            </button>
                            <button onClick={() => handleDeleteTeam(item.id)} className="btn btn-secondary btn--sm" style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#ef4444', borderColor: '#ef444440' }}>
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}



          {/* ⚙️ TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="admin-card" style={{ maxWidth: '800px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>إعدادات الموقع العامة</h2>

              <form onSubmit={handleSettingsSubmit}>
                <div className="form-group mb-4">
                  <label className="form-label">العنوان الرئيسي الهيرو</label>
                  <input
                    type="text"
                    value={settings.hero_title}
                    onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">الوصف الفرعي للهيرو</label>
                  <textarea
                    value={settings.hero_subtitle}
                    onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                    className="form-control"
                    rows={3}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">رقم الهاتف</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">العنوان المباشر</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mb-6">
                  <label className="form-label">أوقات العمل</label>
                  <input
                    type="text"
                    value={settings.working_hours}
                    onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  حفظ التعديلات العامة ✨
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Dynamic Modal for Create & Edit */}
        {modalType && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <div className="card" style={{ width: '100%', maxWidth: '550px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  {editingItem ? 'تعديل البيانات' : 'إضافة عنصر جديد'}
                </h3>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleFormSubmit}>
                {/* SERVICE FORM */}
                {modalType === 'service' && (
                  <>
                    <div className="form-group mb-3">
                      <label className="form-label">الأيقونة (Emoji)</label>
                      <input
                        type="text"
                        value={formData.icon || ''}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">عنوان الخدمة</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">الوصف</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="form-control"
                        rows={3}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">المميزات (مفصولة بفواصل)</label>
                      <input
                        type="text"
                        value={formData.features || ''}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        className="form-control"
                        placeholder="مميزة 1, مميزة 2, ..."
                      />
                    </div>
                    <div className="form-group mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        id="popular-check"
                        checked={formData.popular || false}
                        onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      />
                      <label htmlFor="popular-check" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>
                        تعيين كخدمة مميزة (Popular)
                      </label>
                    </div>
                  </>
                )}

                {/* PROJECT FORM */}
                {modalType === 'project' && (
                  <>
                    <div className="form-group mb-3">
                      <label className="form-label">اسم المشروع *</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="form-control"
                        placeholder="أدخل اسم المشروع"
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">فئة المشروع *</label>
                      <select
                        value={formData.category || 'web'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="form-control"
                      >
                        <option value="web">🌐 مواقع الويب (web)</option>
                        <option value="mobile">📱 تطبيقات الجوال (mobile)</option>
                        <option value="system">⚙️ أنظمة مؤسسية (system)</option>
                        <option value="ecommerce">🛒 متاجر إلكترونية (ecommerce)</option>
                        <option value="uiux">🎨 تصميم واجهات UI/UX (uiux)</option>
                        <option value="other">💻 أخرى (other)</option>
                      </select>
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">وصف المشروع</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="form-control"
                        rows={3}
                        placeholder="أدخل وصفاً مفصلاً للمشروع وأهدافه..."
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">اسم العميل</label>
                      <input
                        type="text"
                        value={formData.client || ''}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        className="form-control"
                        placeholder="اسم الشركة أو العميل صاحب المشروع"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">التقنيات المستخدمة (مفصولة بفواصل)</label>
                      <input
                        type="text"
                        value={formData.tech_stack || ''}
                        onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                        className="form-control"
                        placeholder="Next.js, React Native, Supabase, Stripe..."
                      />
                    </div>

                    {/* ImageKit File Upload Section */}
                    <div className="form-group mb-4">
                      <label className="form-label" style={{ fontWeight: 700 }}>
                        🖼️ صور المشروع (رفع مباشر من جهازك إلى ImageKit)
                      </label>

                      <div
                        style={{
                          border: '2px dashed var(--gold-border)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '20px',
                          textAlign: 'center',
                          background: 'var(--bg-secondary)',
                          cursor: 'pointer',
                          marginBottom: '16px',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <input
                          type="file"
                          id="project-images-upload"
                          accept="image/*"
                          multiple
                          onChange={handleImageFilesUpload}
                          disabled={uploadingImages}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="project-images-upload" style={{ cursor: 'pointer', display: 'block', margin: 0 }}>
                          {uploadingImages ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--gold-primary)' }}>
                              <div className="spinner" style={{ width: '20px', height: '20px' }} />
                              <span>جاري رفع الصور إلى ImageKit...</span>
                            </div>
                          ) : (
                            <div>
                              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📂</div>
                              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gold-primary)' }}>
                                اضغط هنا لاختيار صورة أو عدة صور من ملفاتك
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                يتم رفع الصور مباشرة وتوليد رابط سحابي معتمد عبر ImageKit
                              </div>
                            </div>
                          )}
                        </label>
                      </div>

                      {/* Display Uploaded Thumbnails Grid */}
                      {(() => {
                        const imagesList = Array.isArray(formData.images)
                          ? formData.images
                          : typeof formData.images === 'string' && formData.images.trim().length > 0
                            ? formData.images.split(',').map((s) => s.trim())
                            : formData.image_url
                              ? [formData.image_url]
                              : []

                        if (imagesList.length === 0) return null

                        return (
                          <div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                              الصور المرفوعة ({imagesList.length}):
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px' }}>
                              {imagesList.map((imgUrl, idx) => {
                                const isMain = formData.image_url === imgUrl || (!formData.image_url && idx === 0)
                                return (
                                  <div
                                    key={idx}
                                    style={{
                                      position: 'relative',
                                      borderRadius: '8px',
                                      overflow: 'hidden',
                                      border: isMain ? '2px solid var(--gold-primary)' : '1px solid var(--border-card)',
                                      aspectRatio: '1',
                                      background: '#000',
                                    }}
                                  >
                                    <img src={imgUrl} alt={`صورة ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    {isMain && (
                                      <span
                                        style={{
                                          position: 'absolute',
                                          top: '3px',
                                          right: '3px',
                                          background: 'var(--gold-primary)',
                                          color: '#000',
                                          fontSize: '0.6rem',
                                          fontWeight: 800,
                                          padding: '1px 5px',
                                          borderRadius: '3px',
                                        }}
                                      >
                                        رئيسية ⭐
                                      </span>
                                    )}
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'rgba(0,0,0,0.8)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '2px 4px',
                                      }}
                                    >
                                      {!isMain && (
                                        <button
                                          type="button"
                                          onClick={() => handleSetMainImage(imgUrl)}
                                          title="تعيين كصورة رئيسية"
                                          style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer', fontSize: '0.65rem' }}
                                        >
                                          ⭐
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveImage(idx)}
                                        title="حذف الصورة"
                                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', marginRight: 'auto' }}
                                      >
                                        🗑️
                                      </button>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })()}
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">رابط التطبيق أو الموقع (رابط مباشر / Google Play / App Store)</label>
                      <input
                        type="url"
                        value={formData.project_url || ''}
                        onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                        className="form-control"
                        placeholder="https://play.google.com/store/apps/... أو https://myproject.com"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">سنة الإنجاز</label>
                      <input
                        type="number"
                        value={formData.year || 2024}
                        onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                        className="form-control"
                        required
                      />
                    </div>
                  </>
                )}

                {/* TESTIMONIAL FORM */}
                {modalType === 'testimonial' && (
                  <>
                    <div className="form-group mb-3">
                      <label className="form-label">اسم العميل</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">المسمى الوظيفي</label>
                      <input
                        type="text"
                        value={formData.position || ''}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">اسم الشركة</label>
                      <input
                        type="text"
                        value={formData.company || ''}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">مضمون الرأي</label>
                      <textarea
                        value={formData.content || ''}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="form-control"
                        rows={3}
                        required
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label className="form-label">التقييم (من 1 إلى 5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={formData.rating || 5}
                        onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                        className="form-control"
                        required
                      />
                    </div>
                  </>
                )}

                {/* TEAM FORM */}
                {modalType === 'team' && (
                  <>
                    <div className="form-group mb-3">
                      <label className="form-label">الاسم</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">المسمى الوظيفي</label>
                      <input
                        type="text"
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label className="form-label">النبذة المختصرة</label>
                      <textarea
                        value={formData.bio || ''}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="form-control"
                        rows={3}
                        required
                      />
                    </div>
                  </>
                )}

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={closeModal} className="btn btn-secondary">
                    إلغاء
                  </button>
                  <button type="submit" className="btn btn-primary">
                    حفظ البيانات ✨
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        <div className={`toast ${toast.show ? 'show' : ''} ${toast.type === 'error' ? 'error' : 'success'}`}>
          <span>{toast.type === 'error' ? '❌' : '✨'}</span>
          <span>{toast.message}</span>
        </div>
      </main>
      <Footer />
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { uploadToImageKit } from '@/lib/imagekit'

// Initial Mock Datasets
const DEFAULT_SERVICES = [
  {
    id: 's1',
    icon: '🌐',
    title: 'تطوير مواقع الويب',
    description: 'نبني مواقع ويب احترافية وسريعة باستخدام Next.js وReact لضمان أفضل تجربة مستخدم وتحسين محركات البحث.',
    features: 'Next.js & React, تصميم متجاوب, تحسين SEO, أداء عالي, لوحة تحكم',
    popular: true,
  },
  {
    id: 's2',
    icon: '📱',
    title: 'تطبيقات الجوال',
    description: 'نطور تطبيقات موبايل احترافية لـ iOS وAndroid بتجربة مستخدم استثنائية.',
    features: 'iOS & Android, React Native / Flutter, UI/UX احترافي, إشعارات فورية',
    popular: false,
  },
  {
    id: 's3',
    icon: '⚙️',
    title: 'الأنظمة المؤسسية',
    description: 'نصمم وننفذ أنظمة إدارة متكاملة تناسب احتياجات شركتك من ERP وCRM إلى أنظمة المخازن.',
    features: 'ERP & CRM, إدارة المخازن, تقارير, صلاحيات متعددة',
    popular: false,
  },
  {
    id: 's4',
    icon: '🎨',
    title: 'تصميم UI/UX',
    description: 'نصمم واجهات مستخدم جذابة وسهلة تجمع الجمال البصري بالوظائف العملية.',
    features: 'Figma, Prototyping, هوية بصرية, دليل التصميم',
    popular: false,
  },
  {
    id: 's5',
    icon: '🛒',
    title: 'التجارة الإلكترونية',
    description: 'نبني متاجر إلكترونية متكاملة مع بوابات دفع آمنة وتجربة تسوق سلسة تزيد مبيعاتك.',
    features: 'بوابات دفع, إدارة المنتجات, تتبع الطلبات, SEO متاجر',
    popular: false,
  },
  {
    id: 's6',
    icon: '🔧',
    title: 'الاستضافة والصيانة',
    description: 'استضافة موثوقة وسريعة مع صيانة دورية وتحديثات منتظمة على مدار الساعة.',
    features: 'استضافة سحابية, SSL مجاني, نسخ احتياطية, دعم 24/7',
    popular: false,
  },
]

const DEFAULT_PROJECTS = [
  {
    id: 'p1',
    title: 'منصة التجارة الإلكترونية الذكية',
    category: 'ecommerce',
    client: 'متجر الأناقة',
    year: 2024,
    tech_stack: 'Next.js, Supabase, Stripe',
    image_url: '',
  },
  {
    id: 'p2',
    title: 'تطبيق إدارة المطاعم',
    category: 'mobile',
    client: 'سلسلة مطاعم النخبة',
    year: 2024,
    tech_stack: 'React Native, Node.js, MongoDB',
    image_url: '',
  },
  {
    id: 'p3',
    title: 'نظام ERP للشركات',
    category: 'system',
    client: 'شركة الريادة التجارية',
    year: 2023,
    tech_stack: 'React, PostgreSQL, Python',
    image_url: '',
  },
  {
    id: 'p4',
    title: 'موقع وكالة سفر احترافي',
    category: 'web',
    client: 'وكالة الأفق للسفر',
    year: 2024,
    tech_stack: 'Next.js, Tailwind, Supabase',
    image_url: '',
  },
  {
    id: 'p5',
    title: 'تطبيق التوصيل السريع',
    category: 'mobile',
    client: 'فليت اكسبرس',
    year: 2023,
    tech_stack: 'Flutter, Firebase, Google Maps',
    image_url: '',
  },
  {
    id: 'p6',
    title: 'موقع عيادة طبية متكامل',
    category: 'web',
    client: 'عيادة الرعاية الصحية',
    year: 2024,
    tech_stack: 'Next.js, Supabase, Stripe',
    image_url: '',
  },
  {
    id: 'p7',
    title: 'لوحة تحكم إدارية شاملة',
    category: 'system',
    client: 'مجموعة الأفق التقنية',
    year: 2024,
    tech_stack: 'React, Tailwind, Express',
    image_url: '',
  },
  {
    id: 'p8',
    title: 'متجر المنتجات العضوية',
    category: 'ecommerce',
    client: 'جرين لايف',
    year: 2024,
    tech_stack: 'Next.js, Shopify API',
    image_url: '',
  },
  {
    id: 'p9',
    title: 'تطبيق اللياقة والصحة',
    category: 'mobile',
    client: 'فتنس كلوپ',
    year: 2023,
    tech_stack: 'React Native, GraphQL',
    image_url: '',
  },
  {
    id: 'p10',
    title: 'منصة التعلم عن بُعد',
    category: 'web',
    client: 'أكاديمية المستقبل',
    year: 2024,
    tech_stack: 'Next.js, PostgreSQL, AWS',
    image_url: '',
  },
]

const DEFAULT_TESTIMONIALS = [
  {
    id: 't1',
    name: 'أحمد العمري',
    position: 'المدير التنفيذي',
    company: 'شركة الريادة التجارية',
    content: 'تعاملنا مع Get Soft لتطوير نظام إدارة متكامل لشركتنا. النتيجة كانت مذهلة، الفريق محترف جداً والتسليم في الوقت المحدد.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'سارة المحمد',
    position: 'مديرة التسويق',
    company: 'متجر الأناقة',
    content: 'صمموا لنا متجراً إلكترونياً رائعاً زاد من مبيعاتنا بنسبة 200%. التصميم احترافي والأداء ممتاز.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'خالد الزهراني',
    position: 'مؤسس',
    company: 'تطبيق التوصيل السريع',
    content: 'طوروا تطبيق التوصيل الخاص بنا بشكل رائع. واجهة المستخدم سلسة والأداء قوي. الفريق استجاب لكل طلباتنا.',
    rating: 5,
  },
]

const DEFAULT_TEAM = [
  { id: 'tm1', name: 'محمد الغامدي', role: 'المدير التقني', bio: 'خبرة أكثر من 8 سنوات في تطوير البرمجيات والأنظمة المؤسسية.', avatar_url: '' },
  { id: 'tm2', name: 'ليلى الشمري', role: 'مصممة UI/UX', bio: 'مصممة إبداعية بخبرة 6 سنوات في تصميم واجهات المستخدم.', avatar_url: '' },
  { id: 'tm3', name: 'عمر السعد', role: 'مطور موبايل', bio: 'مطور تطبيقات موبايل محترف بخبرة 5 سنوات في React Native وFlutter.', avatar_url: '' },
  { id: 'tm4', name: 'نورة الحربي', role: 'مديرة المشاريع', bio: 'خبرة في إدارة المشاريع التقنية وتوجيه فرق العمل.', avatar_url: '' },
]

const DEFAULT_SETTINGS = {
  hero_title: 'نبني المستقبل الرقمي لشركتك',
  hero_subtitle: 'نطور تطبيقات ومواقع ويب احترافية وأنظمة مؤسسية عالية الجودة تضمن نجاح مشروعك.',
  phone: '+966 50 000 0000',
  email: 'info@getsoft.sa',
  address: 'الرياض، المملكة العربية السعودية',
  working_hours: 'الأحد - الخميس: 9 صباحاً - 6 مساءً',
  stat_projects: '50+',
  stat_experience: '+8',
  stat_clients: '100+',
  stat_satisfaction: '99%',
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Current active tab
  const [activeTab, setActiveTab] = useState('overview')

  // Notification Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const notify = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
  }

  // Datasets State
  const [services, setServices] = useState(DEFAULT_SERVICES)
  const [projects, setProjects] = useState(DEFAULT_PROJECTS)
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS)
  const [team, setTeam] = useState(DEFAULT_TEAM)
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

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('admin_auth')
      if (savedAuth === 'true') setIsAuthenticated(true)

      const sServices = localStorage.getItem('admin_services')
      if (sServices) setServices(JSON.parse(sServices))

      const sProjects = localStorage.getItem('admin_projects')
      if (sProjects) setProjects(JSON.parse(sProjects))

      const sTestimonials = localStorage.getItem('admin_testimonials')
      if (sTestimonials) setTestimonials(JSON.parse(sTestimonials))

      const sTeam = localStorage.getItem('admin_team')
      if (sTeam) setTeam(JSON.parse(sTeam))

      const sSettings = localStorage.getItem('admin_settings')
      if (sSettings) setSettings(JSON.parse(sSettings))
    } catch (e) {
      console.error('Error loading admin state', e)
    }
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

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'getsoft2026') {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      setError('')
      notify('تم تسجيل الدخول بنجاح')
    } else {
      setError('كلمة المرور غير صحيحة!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
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
  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (modalType === 'service') {
      if (editingItem) {
        saveServices(services.map((s) => (s.id === editingItem.id ? { ...formData, id: s.id } : s)))
        notify('تم تعديل الخدمة بنجاح')
      } else {
        const newItem = { ...formData, id: 's_' + Date.now() }
        saveServices([newItem, ...services])
        notify('تمت إضافة الخدمة بنجاح')
      }
    } else if (modalType === 'project') {
      if (editingItem) {
        saveProjects(projects.map((p) => (p.id === editingItem.id ? { ...formData, id: p.id } : p)))
        notify('تم تعديل المشروع بنجاح')
      } else {
        const newItem = { ...formData, id: 'p_' + Date.now() }
        saveProjects([newItem, ...projects])
        notify('تمت إضافة المشروع بنجاح')
      }
    } else if (modalType === 'testimonial') {
      if (editingItem) {
        saveTestimonials(testimonials.map((t) => (t.id === editingItem.id ? { ...formData, id: t.id } : t)))
        notify('تم تعديل الرأي بنجاح')
      } else {
        const newItem = { ...formData, id: 't_' + Date.now() }
        saveTestimonials([newItem, ...testimonials])
        notify('تمت إضافة الرأي بنجاح')
      }
    } else if (modalType === 'team') {
      if (editingItem) {
        saveTeam(team.map((m) => (m.id === editingItem.id ? { ...formData, id: m.id } : m)))
        notify('تم تعديل بيانات العضو بنجاح')
      } else {
        const newItem = { ...formData, id: 'tm_' + Date.now() }
        saveTeam([newItem, ...team])
        notify('تمت إضافة العضو بنجاح')
      }
    }
    closeModal()
  }

  // Delete Item Handlers
  const handleDeleteService = (id) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف هذه الخدمة؟')) {
      saveServices(services.filter((s) => s.id !== id))
      notify('تم حذف الخدمة بنجاح', 'error')
    }
  }

  const handleDeleteProject = (id) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف هذا المشروع؟')) {
      saveProjects(projects.filter((p) => p.id !== id))
      notify('تم حذف المشروع بنجاح', 'error')
    }
  }

  const handleDeleteTestimonial = (id) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف هذا الرأي؟')) {
      saveTestimonials(testimonials.filter((t) => t.id !== id))
      notify('تم حذف الرأي بنجاح', 'error')
    }
  }

  const handleDeleteTeam = (id) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف هذا العضو؟')) {
      saveTeam(team.filter((tm) => tm.id !== id))
      notify('تم حذف العضو بنجاح', 'error')
    }
  }

  const handleSettingsSubmit = (e) => {
    e.preventDefault()
    saveSettingsData(settings)
    notify('تم حفظ إعدادات الموقع بنجاح ✨')
  }

  // Render Login view if unauthenticated
  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center" style={{ paddingTop: '130px', paddingBottom: '80px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '420px', margin: '0 auto', padding: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <span style={{ fontSize: '3rem' }}>🔐</span>
              <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginTop: 'var(--space-3)' }}>
                لوحة التحكم <span className="text-gradient">Get Soft</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
                أدخل كلمة المرور الخاصة بالمدير للوصول للوحة
              </p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-4">
                <label className="form-label" htmlFor="admin-password">كلمة المرور</label>
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
              <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center', width: '100%' }}>
                تسجيل الدخول ✨
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
              { id: 'team', label: `👥 الفريق (${team.length})` },
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
                  <button onClick={() => openModal('team')} className="btn btn-primary btn--sm">
                    + إضافة عضو فريق
                  </button>
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
          {activeTab === 'team' && (
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

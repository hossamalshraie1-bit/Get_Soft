import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  return (trimmed.startsWith('http://') || trimmed.startsWith('https://')) && !trimmed.includes('YOUR_SUPABASE')
}

export const supabase =
  isValidUrl(rawUrl) && rawKey && rawKey.trim().length > 0
    ? createClient(rawUrl.trim(), rawKey.trim())
    : null

// Helper to call server-side API with Service Role Key if client RLS fails
async function callServerDbApi(payload) {
  try {
    const res = await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    if (res.ok && json.success) return json
    return { success: false, error: json.error || 'حدث خطأ أثناء تنفيذ العملية' }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

// ============================
// Projects (المشاريع)
// ============================
export async function getProjects(category = null, featured = null) {
  if (supabase) {
    try {
      let query = supabase.from('projects').select('*').order('created_at', { ascending: false })
      if (category && category !== 'all') {
        query = query.eq('category', category)
      }
      if (featured !== null) {
        query = query.eq('featured', featured)
      }
      const { data, error } = await query
      if (!error && data) return data
    } catch (err) {
      console.error('Supabase getProjects error:', err)
    }
  }
  return []
}

export async function getProjectById(id) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
      if (!error && data) return data
    } catch (err) {
      console.error('Supabase getProjectById error:', err)
    }
  }
  return null
}

export const DEFAULT_SERVICES = [
  {
    id: 's1',
    icon: '💻',
    title: 'تطوير مواقع الويب',
    description: 'تصميم وتطوير مواقع ويب متجاوبة وسريعة وسهلة الاستخدام باستخدام أحدث التقنيات.',
    features: ['مواقع متجاوبة مع كافة الشاشات', 'تحسين محركات البحث SEO', 'سرعة أداء فائقة', 'لوحة تحكم سهلة'],
    popular: true,
  },
  {
    id: 's2',
    icon: '📱',
    title: 'تطبيقات الجوال',
    description: 'تطوير تطبيقات جوال احترافية لأنظمة iOS و Android بأداء عالٍ وتصميم جذاب.',
    features: ['أنظمة iOS و Android', 'واجهات مستخدم سلسة UI/UX', 'ربط مع الخوادم والـ APIs', 'إشعارات لحظية'],
    popular: true,
  },
  {
    id: 's3',
    icon: '⚙️',
    title: 'الأنظمة المؤسسية',
    description: 'بناء أنظمة برمجية مخصصة لإدارة العمليات والموارد والبيانات بكفاءة أمان عالية.',
    features: ['أنظمة ERP & CRM', 'إدارة المخازن والمبيعات', 'تقارير وإحصائيات دقيقة', 'أمان وحماية عالية للبيانات'],
    popular: false,
  },
  {
    id: 's4',
    icon: '🎨',
    title: 'تصميم واجهات UI/UX',
    description: 'تصميم واجهات تفاعلية وعصرية تمنح مستخدميك تجربة استثنائية وجذابة.',
    features: ['دراسة سلوك المستخدم', 'نماذج تفاعلية Prototype', 'تصاميم متجاوبة عصرية', 'هوية بصرية متكاملة'],
    popular: false,
  },
]

export const DEFAULT_TESTIMONIALS = [
  {
    id: 't1',
    name: 'م / أحمد علي',
    position: 'مدير تنفيذي',
    company: 'شركة التقنية الذكية',
    content: 'تعاملنا مع Get Soft في تطوير موقعنا وأنظمتنا الداخلية وكانت التجربة ممتازة جداً من حيث السرعة والاحترافية.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'أ / سارة عبد الله',
    position: 'مديرة تسويق',
    company: 'متجر الجودة الرقمية',
    content: 'تطبيق الموبايل الذي صممه فريق جيت سوفت تجاوز توقعاتنا وساعدنا في زيادة المبيعات وتجربة المستخدم بشكل ملحوظ.',
    rating: 5,
  },
]

// ============================
// Services (الخدمات)
// ============================
export async function getServices() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true })
      if (!error && data && data.length > 0) return data
    } catch (err) {
      console.error('Supabase getServices error:', err)
    }
  }
  return DEFAULT_SERVICES
}

// ============================
// Testimonials (آراء العملاء)
// ============================
export async function getTestimonials() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('testimonials').select('*')
      if (!error && data && data.length > 0) return data
    } catch (err) {
      console.error('Supabase getTestimonials error:', err)
    }
  }
  return DEFAULT_TESTIMONIALS
}

// ============================
// Team (الفريق)
// ============================
export async function getTeam() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('team').select('*').eq('active', true).order('display_order', { ascending: true })
      if (!error && data) return data
    } catch (err) {
      console.error('Supabase getTeam error:', err)
    }
  }
  return []
}

// ============================
// Stats (الإحصائيات)
// ============================
export async function getStats() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('stats').select('*').order('display_order', { ascending: true })
      if (!error && data) return data
    } catch (err) {
      console.error('Supabase getStats error:', err)
    }
  }
  return []
}

// ============================
// Site Settings (الإعدادات)
// ============================
export async function getSiteSettings() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('site_settings').select('*')
      if (!error && data) {
        const settingsObj = {}
        data.forEach((row) => {
          settingsObj[row.key] = row.value
        })
        return settingsObj
      }
    } catch (err) {
      console.error('Supabase getSiteSettings error:', err)
    }
  }
  return {}
}

export async function updateSiteSettings(settingsObj) {
  if (supabase) {
    try {
      const upsertRows = Object.entries(settingsObj).map(([key, value]) => ({ key, value }))
      const { error } = await supabase.from('site_settings').upsert(upsertRows, { onConflict: 'key' })
      if (!error) return { success: true }
    } catch (err) {
      console.warn('Direct client site_settings update failed, using server API:', err)
    }
  }
  return await callServerDbApi({ action: 'upsert_settings', data: settingsObj })
}

// ============================
// Admin CRUD Functions — Projects
// ============================
export async function createProject(projectData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('projects').insert([projectData]).select()
      if (!error && data) return { success: true, data: data[0] }
    } catch (err) {
      console.warn('Direct client createProject failed, using server API:', err)
    }
  }
  return await callServerDbApi({ action: 'insert', table: 'projects', data: projectData })
}

export async function updateProject(id, projectData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('projects').update(projectData).eq('id', id).select()
      if (!error && data) return { success: true, data: data[0] }
    } catch (err) {
      console.warn('Direct client updateProject failed, using server API:', err)
    }
  }
  return await callServerDbApi({ action: 'update', table: 'projects', id, data: projectData })
}

export async function deleteProject(id) {
  if (supabase) {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (!error) return true
    } catch (err) {
      console.warn('Direct client deleteProject failed, using server API:', err)
    }
  }
  const res = await callServerDbApi({ action: 'delete', table: 'projects', id })
  return res.success
}

// ============================
// Admin CRUD Functions — Services
// ============================
export async function createService(serviceData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('services').insert([serviceData]).select()
      if (!error && data) return { success: true, data: data[0] }
    } catch (err) {
      console.warn('Direct client createService failed, using server API:', err)
    }
  }
  return await callServerDbApi({ action: 'insert', table: 'services', data: serviceData })
}

export async function updateService(id, serviceData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('services').update(serviceData).eq('id', id).select()
      if (!error && data) return { success: true, data: data[0] }
    } catch (err) {
      console.warn('Direct client updateService failed, using server API:', err)
    }
  }
  return await callServerDbApi({ action: 'update', table: 'services', id, data: serviceData })
}

export async function deleteService(id) {
  if (supabase) {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id)
      if (!error) return true
    } catch (err) {
      console.warn('Direct client deleteService failed, using server API:', err)
    }
  }
  const res = await callServerDbApi({ action: 'delete', table: 'services', id })
  return res.success
}

// ============================
// Admin CRUD Functions — Testimonials
// ============================
export async function createTestimonial(testimonialData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('testimonials').insert([testimonialData]).select()
      if (!error && data) return { success: true, data: data[0] }
    } catch (err) {
      console.warn('Direct client createTestimonial failed, using server API:', err)
    }
  }
  return await callServerDbApi({ action: 'insert', table: 'testimonials', data: testimonialData })
}

export async function updateTestimonial(id, testimonialData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('testimonials').update(testimonialData).eq('id', id).select()
      if (!error && data) return { success: true, data: data[0] }
    } catch (err) {
      console.warn('Direct client updateTestimonial failed, using server API:', err)
    }
  }
  return await callServerDbApi({ action: 'update', table: 'testimonials', id, data: testimonialData })
}

export async function deleteTestimonial(id) {
  if (supabase) {
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id)
      if (!error) return true
    } catch (err) {
      console.warn('Direct client deleteTestimonial failed, using server API:', err)
    }
  }
  const res = await callServerDbApi({ action: 'delete', table: 'testimonials', id })
  return res.success
}

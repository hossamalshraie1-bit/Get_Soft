import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// التحقق من صحة الرابط لمنع أي أخطاء في تجميع المشاريـع
const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  return (trimmed.startsWith('http://') || trimmed.startsWith('https://')) && !trimmed.includes('YOUR_SUPABASE')
}

export const supabase =
  isValidUrl(rawUrl) && rawKey && rawKey.trim().length > 0
    ? createClient(rawUrl.trim(), rawKey.trim())
    : null

// Helper for local storage reading (client-side fallback)
function getLocalItem(key, fallback = []) {
  if (typeof window === 'undefined') return fallback
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (e) {
    return fallback
  }
}

function setLocalItem(key, data) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error(e)
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
      if (!error && data && data.length > 0) return data
    } catch (err) {
      console.warn('Supabase fetch error, falling back to localStorage:', err)
    }
  }

  const projects = getLocalItem('admin_projects', [])
  if (!category || category === 'all') return projects
  return projects.filter((p) => p.category === category)
}

export async function getProjectById(id) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
      if (!error && data) return data
    } catch (err) {
      console.warn('Supabase fetchById error:', err)
    }
  }

  const projects = getLocalItem('admin_projects', [])
  return projects.find((p) => p.id === id) || null
}

// ============================
// Services (الخدمات)
// ============================
export async function getServices() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true })
      if (!error && data && data.length > 0) return data
    } catch (err) {
      console.warn('Supabase getServices error:', err)
    }
  }
  return getLocalItem('admin_services', [])
}

// ============================
// Testimonials (آراء العملاء)
// ============================
export async function getTestimonials() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('testimonials').select('*').eq('active', true).order('display_order', { ascending: true })
      if (!error && data && data.length > 0) return data
    } catch (err) {
      console.warn('Supabase getTestimonials error:', err)
    }
  }
  return getLocalItem('admin_testimonials', [])
}

// ============================
// Team (الفريق)
// ============================
export async function getTeam() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('team').select('*').eq('active', true).order('display_order', { ascending: true })
      if (!error && data && data.length > 0) return data
    } catch (err) {
      console.warn('Supabase getTeam error:', err)
    }
  }
  return getLocalItem('admin_team', [])
}

// ============================
// Stats (الإحصائيات)
// ============================
export async function getStats() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('stats').select('*').order('display_order', { ascending: true })
      if (!error && data && data.length > 0) return data
    } catch (err) {
      console.warn('Supabase getStats error:', err)
    }
  }
  return getLocalItem('admin_stats', [])
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
      console.warn('Supabase getSiteSettings error:', err)
    }
  }
  return getLocalItem('admin_settings', {})
}

// ============================
// Admin CRUD Functions
// ============================
export async function createProject(projectData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('projects').insert([projectData]).select()
      if (!error && data) return { success: true, data: data[0] }
    } catch (err) {
      console.warn('Supabase createProject error:', err)
    }
  }

  const projects = getLocalItem('admin_projects', [])
  const newProj = { ...projectData, id: 'p_' + Date.now() }
  setLocalItem('admin_projects', [newProj, ...projects])
  return { success: true, data: newProj }
}

export async function updateProject(id, projectData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('projects').update(projectData).eq('id', id).select()
      if (!error && data) return { success: true, data: data[0] }
    } catch (err) {
      console.warn('Supabase updateProject error:', err)
    }
  }

  const projects = getLocalItem('admin_projects', [])
  const updated = projects.map((p) => (p.id === id ? { ...p, ...projectData } : p))
  setLocalItem('admin_projects', updated)
  return { success: true, data: projectData }
}

export async function deleteProject(id) {
  if (supabase) {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (!error) return true
    } catch (err) {
      console.warn('Supabase deleteProject error:', err)
    }
  }

  const projects = getLocalItem('admin_projects', [])
  setLocalItem('admin_projects', projects.filter((p) => p.id !== id))
  return true
}

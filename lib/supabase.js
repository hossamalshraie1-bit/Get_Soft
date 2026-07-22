// ⚠️ Supabase معطّل مؤقتاً أثناء تطوير الفرونت اند
// سيتم تفعيله لاحقاً عند ربط قاعدة البيانات

export const supabase = null

// ============================
// Projects (المشاريع)
// ============================
export async function getProjects(category = null, featured = null) {
  return []
}

export async function getProjectById(id) {
  return null
}

// ============================
// Testimonials (آراء العملاء)
// ============================
export async function getTestimonials() {
  return []
}

// ============================
// Team (الفريق)
// ============================
export async function getTeam() {
  return []
}

// ============================
// Stats (الإحصائيات)
// ============================
export async function getStats() {
  return []
}

// ============================
// Services (الخدمات)
// ============================
export async function getServices() {
  return []
}

// ============================
// Messages (الرسائل)
// ============================
export async function sendMessage({ name, email, phone, subject, message }) {
  return { success: true, data: null }
}

// ============================
// Site Settings (الإعدادات)
// ============================
export async function getSiteSettings() {
  return {}
}

// ============================
// Admin Functions
// ============================
export async function getMessages(onlyUnread = false) {
  return []
}

export async function markMessageAsRead(id) {
  return true
}

export async function createProject(projectData) {
  return { success: true, data: null }
}

export async function updateProject(id, projectData) {
  return { success: true, data: null }
}

export async function deleteProject(id) {
  return true
}


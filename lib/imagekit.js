/**
 * ImageKit Helper & Upload Handler
 * يساعد في بناء وترفيع صور ImageKit.io داخل مجلد /images
 */

const IMAGEKIT_URL = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/getsoft'

/**
 * بناء رابط صورة محسّن من ImageKit
 * @param {string} path - مسار الصورة في ImageKit
 * @param {Object} transforms - التحويلات (العرض، الارتفاع، الجودة)
 * @returns {string} - رابط الصورة المحسّن
 */
export function getImageKitUrl(path, transforms = {}) {
  if (!path) return '/images/placeholder.jpg'

  // إذا كان الرابط كاملاً بالفعل أو Base64
  if (path.startsWith('http') || path.startsWith('data:')) return path

  const {
    width,
    height,
    quality = 80,
    format = 'auto',
    fit = 'cover',
  } = transforms

  const params = []

  if (width) params.push(`w-${width}`)
  if (height) params.push(`h-${height}`)
  if (quality) params.push(`q-${quality}`)
  if (format) params.push(`f-${format}`)
  if (fit) params.push(`c-${fit}`)

  const transformString = params.length > 0 ? `tr:${params.join(',')}` : ''

  return transformString
    ? `${IMAGEKIT_URL}/${transformString}/${path}`
    : `${IMAGEKIT_URL}/${path}`
}

/**
 * دالة رفع الصور المباشرة إلى ImageKit.io داخل مجلد /images
 * @param {File} file - ملف الصورة المراد رفعها
 * @returns {Promise<Object>} - كائن يحتوي على url و fileId الخاص بالصورة
 */
export async function uploadToImageKit(file) {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', '/images')

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.error || 'فشل رفع الصورة إلى ImageKit')
    }

    const data = await response.json()
    return {
      url: data.url,
      fileId: data.fileId,
      name: data.name,
      filePath: data.filePath,
    }
  } catch (err) {
    console.error('uploadToImageKit error:', err)
    throw err
  }
}

export function getProjectCardImage(path) {
  return getImageKitUrl(path, { width: 600, height: 400, quality: 85 })
}

export function getTeamAvatarImage(path) {
  return getImageKitUrl(path, { width: 300, height: 300, quality: 90, fit: 'face' })
}

export function getHeroImage(path) {
  return getImageKitUrl(path, { width: 1920, height: 1080, quality: 90 })
}

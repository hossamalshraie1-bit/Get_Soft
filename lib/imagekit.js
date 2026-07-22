/**
 * ImageKit Helper
 * يساعد في بناء روابط الصور المحسّنة من ImageKit.io
 */

const IMAGEKIT_URL = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/placeholder'

/**
 * بناء رابط صورة محسّن من ImageKit
 * @param {string} path - مسار الصورة في ImageKit
 * @param {Object} transforms - التحويلات (العرض، الارتفاع، الجودة)
 * @returns {string} - رابط الصورة المحسّن
 */
export function getImageKitUrl(path, transforms = {}) {
  if (!path) return '/images/placeholder.jpg'

  // إذا كان الرابط كاملاً بالفعل
  if (path.startsWith('http')) return path

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
 * الحصول على صورة بأبعاد ثابتة لبطاقة المشروع
 */
export function getProjectCardImage(path) {
  return getImageKitUrl(path, { width: 600, height: 400, quality: 85 })
}

/**
 * الحصول على صورة الفريق (مربعة)
 */
export function getTeamAvatarImage(path) {
  return getImageKitUrl(path, { width: 300, height: 300, quality: 90, fit: 'face' })
}

/**
 * الحصول على صورة Hero (كبيرة)
 */
export function getHeroImage(path) {
  return getImageKitUrl(path, { width: 1920, height: 1080, quality: 90 })
}

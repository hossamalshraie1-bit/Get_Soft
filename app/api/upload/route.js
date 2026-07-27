import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const folder = formData.get('folder') || '/images'

    if (!file) {
      return NextResponse.json({ error: 'لم يتم تزويد أي ملف للرفع' }, { status: 400 })
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
    if (!privateKey) {
      return NextResponse.json({ error: 'مفتاح ImageKit الخاص غير معرّف في البيئة' }, { status: 500 })
    }

    // إعداد التوثيق والـ Basic Auth لمنصة ImageKit
    const authHeader = 'Basic ' + Buffer.from(privateKey + ':').toString('base64')

    // تجهيز formData لإرساله إلى ImageKit API
    const ikFormData = new FormData()
    ikFormData.append('file', file)
    ikFormData.append('fileName', typeof file === 'string' ? 'upload_' + Date.now() : (file.name || 'image_' + Date.now()))
    ikFormData.append('folder', folder)
    ikFormData.append('useUniqueFileName', 'true')

    const ikResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
      method: 'POST',
      headers: {
        Authorization: authHeader,
      },
      body: ikFormData,
    })

    if (!ikResponse.ok) {
      const errorText = await ikResponse.text()
      console.error('ImageKit Upload Error:', errorText)
      return NextResponse.json({ error: 'فشل رفع الصورة إلى ImageKit', details: errorText }, { status: ikResponse.status })
    }

    const ikData = await ikResponse.json()
    return NextResponse.json({
      success: true,
      url: ikData.url,
      fileId: ikData.fileId,
      name: ikData.name,
      filePath: ikData.filePath,
    })
  } catch (err) {
    console.error('Upload API Error:', err)
    return NextResponse.json({ error: 'حدث خطأ داخلي أثناء رفع الصورة', details: err.message }, { status: 500 })
  }
}

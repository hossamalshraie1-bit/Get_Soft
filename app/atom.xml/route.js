export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://getsoft.vercel.app'
  const updatedAt = new Date().toISOString()

  const entries = [
    {
      title: 'الرئيسية | Get Soft',
      url: `${baseUrl}`,
      description:
        'Get Soft — شركة برمجيات متخصصة في تطوير مواقع الويب وتطبيقات الجوال والأنظمة المؤسسية.',
    },
    {
      title: 'خدماتنا | Get Soft',
      url: `${baseUrl}/services`,
      description:
        'اكتشف مجموعة خدماتنا التقنية الشاملة: تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية، تصميم UI/UX، التجارة الإلكترونية والاستضافة.',
    },
    {
      title: 'أعمالنا | Get Soft',
      url: `${baseUrl}/portfolio`,
      description:
        'اكتشف محفظة مشاريعنا المتنوعة: مواقع ويب مبتكرة، تطبيقات جوال عالية الأداء، أنظمة مؤسسية متكاملة، حلول تجارة إلكترونية، وتصميم واجهات احترافي.',
    },
    {
      title: 'من نحن | Get Soft',
      url: `${baseUrl}/about`,
      description:
        'تعرف على شركة Get Soft، قصة نجاحنا وقيمنا وفريق العمل لتقديم أنسب الحلول التقنية.',
    },
    {
      title: 'تواصل معنا | Get Soft',
      url: `${baseUrl}/contact`,
      description:
        'تواصل معنا للحصول على استشارة مجانية أو لمناقشة مشروعك القادم. فريق Get Soft جاهز لمساعدتك.',
    },
    {
      title: 'سياسة الخصوصية | Get Soft',
      url: `${baseUrl}/privacy`,
      description: 'اقرأ سياسة الخصوصية الخاصة بشركة Get Soft وكيف نحمي بياناتك.',
    },
    {
      title: 'شروط الاستخدام | Get Soft',
      url: `${baseUrl}/terms`,
      description: 'شروط وأحكام استخدام موقع وخدمات شركة Get Soft للبرمجيات.',
    },
  ]

  const entriesXml = entries
    .map(
      (e) => `
  <entry>
    <id>${e.url}</id>
    <title type="text"><![CDATA[${e.title}]]></title>
    <link rel="alternate" type="text/html" href="${e.url}" />
    <updated>${updatedAt}</updated>
    <summary type="text"><![CDATA[${e.description}]]></summary>
    <author>
      <name>Get Soft</name>
      <email>getsoft2025@gmail.com</email>
    </author>
  </entry>`
    )
    .join('')

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ar">
  <id>${baseUrl}/atom.xml</id>
  <title type="text">Get Soft للبرمجيات</title>
  <subtitle type="text">شركة برمجيات متخصصة في تطوير مواقع الويب وتطبيقات الجوال والأنظمة المؤسسية</subtitle>
  <link rel="self" type="application/atom+xml" href="${baseUrl}/atom.xml" />
  <link rel="alternate" type="text/html" href="${baseUrl}" />
  <updated>${updatedAt}</updated>
  <author>
    <name>Get Soft</name>
    <email>getsoft2025@gmail.com</email>
    <uri>${baseUrl}</uri>
  </author>
  <rights>© ${new Date().getFullYear()} Get Soft. جميع الحقوق محفوظة.</rights>
  <generator uri="https://nextjs.org" version="15">Next.js</generator>
${entriesXml}
</feed>`

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

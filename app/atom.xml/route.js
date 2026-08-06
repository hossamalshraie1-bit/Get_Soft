export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://getsoft.vercel.app'
  const pubDate = new Date().toISOString()

  const routes = [
    {
      title: 'جيت سوفت | الرئيسية',
      url: `${baseUrl}`,
      description: 'جيت سوفت - Get Soft — شركة برمجيات متخصصة في تصميم وتطوير مواقع الويب الاحترافية وتطبيقات الجوال والأنظمة المؤسسية.',
    },
    {
      title: 'جيت سوفت | خدماتنا',
      url: `${baseUrl}/services`,
      description: 'جيت سوفت - Get Soft — اكتشف مجموعة خدماتنا التقنية الشاملة: تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية، تصميم UI/UX، التجارة الإلكترونية والاستضافة.',
    },
    {
      title: 'جيت سوفت | أعمالنا',
      url: `${baseUrl}/portfolio`,
      description: 'جيت سوفت - Get Soft — اكتشف محفظة مشاريعنا المتنوعة التي تشمل مواقع ويب مبتكرة، تطبيقات جوال عالية الأداء، أنظمة مؤسسية متكاملة، حلول تجارة إلكترونية، وتصميم واجهات احترافي.',
    },
    {
      title: 'جيت سوفت | من نحن',
      url: `${baseUrl}/about`,
      description: 'جيت سوفت - Get Soft — تعرف على شركة جيت سوفت، قصة نجاحها وقيمها وفريق العمل لتقديم أنسب الحلول التقنية.',
    },
    {
      title: 'جيت سوفت | تواصل معنا',
      url: `${baseUrl}/contact`,
      description: 'جيت سوفت - Get Soft — تواصل معنا للحصول على استشارة مجانية، دعم فني، أو لمناقشة مشروعك القادم. فريق جيت سوفت جاهز لمساعدتك في تحقيق أهدافك الرقمية.',
    }
  ]

  const itemsXml = routes
    .map(
      (item) => `
    <entry>
      <title><![CDATA[${item.title}]]></title>
      <link href="${item.url}" />
      <id>${item.url}</id>
      <updated>${pubDate}</updated>
      <summary><![CDATA[${item.description}]]></summary>
    </entry>`
    )
    .join('')

  const atomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>جيت سوفت للبرمجيات</title>
  <subtitle>خلاصة صفحات التوجيه والمشاريع لشركة جيت سوفت</subtitle>
  <link href="${baseUrl}/atom.xml" rel="self" />
  <link href="${baseUrl}" />
  <id>${baseUrl}/</id>
  <updated>${pubDate}</updated>
  <author>
    <name>جيت سوفت</name>
  </author>
${itemsXml}
</feed>`

  return new Response(atomFeed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://getsoft.vercel.app'
  const pubDate = new Date().toUTCString()

  const routes = [
    {
      title: 'الرئيسية | جيت سوفت (Get Soft)',
      url: `${baseUrl}`,
      description: 'Get Soft — شركة برمجيات متخصصة في تطوير مواقع الويب وتطبيقات الجوال والأنظمة المؤسسية.',
    },
    {
      title: 'خدماتنا | Get Soft',
      url: `${baseUrl}/services`,
      description: 'اكتشف مجموعة خدماتنا التقنية الشاملة: تطوير مواقع الويب، تطبيقات الجوال، الأنظمة المؤسسية، تصميم UI/UX، التجارة الإلكترونية والاستضافة.',
    },
    {
      title: 'أعمالنا | Get Soft',
      url: `${baseUrl}/portfolio`,
      description: 'اكتشف محفظة مشاريعنا المتنوعة التي تشمل مواقع ويب مبتكرة، تطبيقات جوال عالية الأداء، أنظمة مؤسسية متكاملة، حلول تجارة إلكترونية، وتصميم واجهات احترافي.',
    },
    {
      title: 'من نحن | Get Soft',
      url: `${baseUrl}/about`,
      description: 'تعرف على شركة Get Soft، قصة نجاحنا وقيمنا وفريق العمل لتقديم أنسب الحلول التقنية.',
    },
    {
      title: 'تواصل معنا | Get Soft',
      url: `${baseUrl}/contact`,
      description: 'تواصل معنا للحصول على استشارة مجانية، دعم فني، أو لمناقشة مشروعك القادم. فريق Get Soft جاهز لمساعدتك في تحقيق أهدافك الرقمية.',
    }
  ]

  const itemsXml = routes
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid>${item.url}</guid>
    </item>`
    )
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Get Soft للبرمجيات</title>
    <link>${baseUrl}</link>
    <description>خلاصة صفحات التوجيه والمشاريع لشركة Get Soft</description>
    <language>ar-SA</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}

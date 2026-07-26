import ContactClient from '@/components/ContactClient'
import { getSiteSettings } from '@/lib/supabase'

export const metadata = {
  title: 'تواصل معنا | Get Soft',
  description:
    'تواصل مع شركة Get Soft للبرمجيات . نحن هنا للإجابة على استفساراتك وتقديم استشارات مجانية حول تصميم المواقع، وتطوير التطبيقات والأنظمة.',
  alternates: { canonical: 'https://getsoft.vercel.app/contact' },
  openGraph: {
    title: 'تواصل معنا | Get Soft',
    description: 'تواصل معنا الآن لمناقشة مشروعك الرقمي القادم والحصول على استشارة مجانية.',
    url: 'https://getsoft.vercel.app/contact',
  },
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return <ContactClient initialSettings={settings} />
}

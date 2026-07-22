import ContactClient from '@/components/ContactClient'
import { getSiteSettings } from '@/lib/supabase'

export const metadata = {
  title: 'تواصل معنا | جيت سوفت',
  description:
    'تواصل مع شركة جيت سوفت للبرمجيات. نحن هنا للإجابة على استفساراتك وتقديم استشارات مجانية حول تصميم المواقع، وتطوير التطبيقات والأنظمة.',
  alternates: { canonical: 'https://getsoft.sa/contact' },
  openGraph: {
    title: 'تواصل معنا | جيت سوفت',
    description: 'تواصل معنا الآن لمناقشة مشروعك الرقمي القادم والحصول على استشارة مجانية.',
    url: 'https://getsoft.sa/contact',
  },
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return <ContactClient initialSettings={settings} />
}

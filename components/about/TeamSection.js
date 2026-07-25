'use client'

import { useState, useEffect } from 'react'
import { getTeam } from '@/lib/supabase'

const DEFAULT_TEAM = [
  { name: 'محمد الغامدي', role: 'المدير التقني', bio: 'خبرة أكثر من 8 سنوات في تطوير البرمجيات والأنظمة المؤسسية. متخصص في Next.js وNode.js وقواعد البيانات.' },
  { name: 'ليلى الشمري', role: 'مصممة UI/UX', bio: 'مصممة إبداعية بخبرة 6 سنوات في تصميم واجهات المستخدم. متخصصة في Figma وتجربة المستخدم.' },
  { name: 'عمر السعد', role: 'مطور موبايل', bio: 'مطور تطبيقات موبايل محترف بخبرة 5 سنوات في React Native وFlutter. نفّذ أكثر من 40 تطبيقاً ناجحاً.' },
  { name: 'نورة الحربي', role: 'مديرة المشاريع', bio: 'خبرة في إدارة المشاريع التقنية وتوجيه فرق العمل لضمان جودة التسليم ورضا العملاء.' },
]

export default function TeamSection({ initialTeam = [] }) {
  const [team, setTeam] = useState(initialTeam)

  useEffect(() => {
    async function fetchLatest() {
      const data = await getTeam()
      if (data && data.length > 0) {
        setTeam(data)
      }
    }
    fetchLatest()
  }, [])

  const activeTeam = team && team.length > 0 ? team : (initialTeam && initialTeam.length > 0 ? initialTeam : DEFAULT_TEAM)

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }} aria-labelledby="team-heading">
      <div className="container">
        <div className="section-title">
          <div className="section-title__tag">👥 عائلة جيت سوفت</div>
          <h2 className="section-title__heading" id="team-heading">
            فريق عمل <span className="text-gradient">محترف</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-title__description">
            نخبة من المطورين والمصممين ومهندسي الأنظمة الملتزمين بالتميز والنجاح.
          </p>
        </div>

        <div className="team-grid">
          {activeTeam.map((member, index) => (
            <div key={member.id || index} className="team-card">
              <div className="team-card__avatar">
                {member.avatar_url ? (
                  <img src={member.avatar_url} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  member.name ? member.name.charAt(0) : '👤'
                )}
              </div>
              <h3 className="team-card__name">{member.name}</h3>
              <div className="team-card__role">{member.role}</div>
              <p className="team-card__bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

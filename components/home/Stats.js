'use client'

import { useEffect, useRef, useState } from 'react'

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const numericTarget = parseInt(target.replace(/\D/g, ''))
          const prefix = target.startsWith('+') ? '+' : ''
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic
            setCount(Math.floor(eased * numericTarget))
            if (progress < 1) requestAnimationFrame(animate)
            else setCount(numericTarget)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  const numericTarget = parseInt(target.replace(/\D/g, ''))
  const prefix = target.startsWith('+') ? '+' : ''

  return <span ref={ref}>{prefix}{count}</span>
}

export default function Stats({ stats }) {
  const activeStats = (stats && stats.length > 0) ? stats : []
  return (
    <section className="stats-bar" aria-label="إحصائيات الشركة">
      <div className="container">
        <div className="stats-bar__grid">
          {activeStats.map((stat, index) => (
            <div key={index} className="stat-item reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <span className="stat-item__icon" aria-hidden="true">{stat.icon}</span>
              <div className="stat-item__value" aria-label={`${stat.value} ${stat.label}`}>
                <AnimatedCounter target={stat.value} />
              </div>
              <div className="stat-item__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

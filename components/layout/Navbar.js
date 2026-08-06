'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'الرئيسية', icon: '🏠' },
  { href: '/services', label: 'الخدمات', icon: '⚡' },
  { href: '/portfolio', label: 'أعمالنا', icon: '🎨' },
  { href: '/about', label: 'من نحن', icon: '👥' },
  { href: '/contact', label: 'تواصل', icon: '💬' },
]

function ThemeToggleBtn({ theme, onToggle, className = '' }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`theme-toggle-btn ${className}`}
      aria-label={isDark ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
      title={isDark ? 'التحويل للوضع النهاري (Light Mode)' : 'التحويل للوضع الليلي (Dark Mode)'}
    >
      <div className={`theme-toggle-icon ${isDark ? 'dark' : 'light'}`}>
        {isDark ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" fill="var(--gold-primary)" stroke="var(--gold-primary)" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="var(--gold-primary)" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="var(--gold-primary)" stroke="var(--gold-primary)" />
          </svg>
        )}
      </div>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState('dark')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Load initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  return (
    <>
      {/* ===== Desktop / Tablet Navbar ===== */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="القائمة الرئيسية">
        <div className="container navbar__inner">
          {/* Logo */}
          <div className="navbar__logo-wrap">
            <Link href="/" className="navbar__logo" aria-label="جيت سوفت - الصفحة الرئيسية">
              <img
                src="/logo.png"
                alt="جيت سوفت"
                style={{
                  height: '42px',
                  width: '42px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  boxShadow: '0 4px 12px rgba(201, 168, 76, 0.3)',
                  border: '1px solid var(--gold-border, rgba(201, 168, 76, 0.4))',
                }}
              />
              <h1 className="navbar__logo-text">جيت سوفت</h1>
            </Link>

            {/* Mobile Theme Toggle (only visible on mobile layout) */}
            <ThemeToggleBtn theme={theme} onToggle={toggleTheme} className="mobile-theme-btn" />
          </div>

          {/* Desktop Nav */}
          <ul className="navbar__nav" role="menubar">
            {NAV_LINKS.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  role="menuitem"
                  className={`navbar__link ${pathname === link.href ? 'active' : ''}`}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button & Desktop Theme Toggle */}
          <div className="navbar__actions" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <ThemeToggleBtn theme={theme} onToggle={toggleTheme} className="desktop-theme-btn" />
            <Link href="/contact" className="btn btn-primary navbar__cta">
              ابدأ مشروعك
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== Mobile Bottom Navigation Bar ===== */}
      <nav className="mobile-nav" role="navigation" aria-label="التنقل السفلي">
        <div className="mobile-nav__inner">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-nav__item ${pathname === link.href ? 'active' : ''}`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              <span className="mobile-nav__icon" aria-hidden="true">{link.icon}</span>
              <span className="mobile-nav__label">{link.label}</span>
              {pathname === link.href && <span className="mobile-nav__dot" aria-hidden="true" />}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}

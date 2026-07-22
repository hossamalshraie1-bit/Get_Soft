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
              <div className="navbar__logo-icon" aria-hidden="true">
                <span>G</span>
              </div>
              <span className="navbar__logo-text">Get Soft</span>
            </Link>

            {/* Mobile Theme Toggle (only visible on mobile layout) */}
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn mobile-theme-btn"
              aria-label="تبديل المظهر"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
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
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn desktop-theme-btn"
              aria-label="تبديل المظهر"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
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

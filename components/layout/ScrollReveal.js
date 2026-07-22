'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    )

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal')
      elements.forEach((el) => observer.observe(el))
    }

    // Run observation on mount and path change
    observeElements()

    // Observe changes in DOM to capture dynamic navigation content
    const mutationObserver = new MutationObserver(observeElements)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [pathname])

  return null
}

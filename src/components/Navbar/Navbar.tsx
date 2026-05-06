import { useState, useEffect } from 'react'
import logoSvg from '../../assets/logo.svg'
import './Navbar.css'

const navLinks = [
  { label: 'Beach Lessons', href: '#beach' },
  { label: 'Weekly Lessons', href: '#weekly' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 96)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const navbarClass = [
    'navbar',
    isScrolled ? 'navbar--scrolled' : '',
    isMenuOpen ? 'navbar--open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={navbarClass} data-state={isScrolled ? 'scrolled' : 'top'}>
      <div className="navbar__bar">
        <a href="#" className="navbar__logo" onClick={closeMenu}>
          <img
            src={logoSvg}
            alt="Aaron Grzanich Music Lessons on Maui"
            className="navbar__logo-img"
          />
        </a>

        <nav className="navbar__nav" aria-label="Site navigation">
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href} className="navbar__link">
              {label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <a href="#contact" className="navbar__cta">Book a Lesson</a>
          <a
            href="#contact"
            className="navbar__mobile-quick-cta"
            onClick={closeMenu}
          >
            Book
          </a>
          <button
            className="navbar__hamburger"
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            <span className="navbar__bar-line" />
            <span className="navbar__bar-line" />
            <span className="navbar__bar-line" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="navbar__mobile-menu"
          aria-hidden={false}
        >
          <nav aria-label="Mobile navigation">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="navbar__mobile-link"
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="navbar__mobile-cta" onClick={closeMenu}>
            Book a Lesson
          </a>
        </div>
      )}
    </header>
  )
}

export default Navbar

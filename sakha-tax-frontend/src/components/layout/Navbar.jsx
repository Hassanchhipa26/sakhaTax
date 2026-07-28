import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiPhoneCall } from 'react-icons/fi'
import { NAV_LINKS, BUSINESS } from '@/constants/site'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-white'
      }`}
    >
      <nav className="container-page flex items-center justify-between py-4" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Sakha Tax Consultancy home">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-primary)] font-display text-lg font-bold text-white">
            S
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold text-[var(--color-primary)] sm:text-lg">
              Sakha Tax
            </span>
            <span className="form-code -mt-0.5">Consultancy</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative py-1 font-medium text-sm transition-colors ${
                    isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-ink-soft)] hover:text-[var(--color-primary)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[var(--color-accent)]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]"
          >
            <FiPhoneCall className="h-4 w-4" aria-hidden="true" />
            {BUSINESS.phone}
          </a>
          <Link to="/contact" className="btn-primary">
            Book Consultation
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-primary)] md:hidden"
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-[var(--color-ledger)] bg-white md:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2.5 font-medium text-sm ${
                        isActive
                          ? 'bg-[var(--color-surface)] text-[var(--color-primary)]'
                          : 'text-[var(--color-ink-soft)]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2 flex flex-col gap-2 px-3">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
                  <FiPhoneCall className="h-4 w-4" aria-hidden="true" />
                  {BUSINESS.phone}
                </a>
                <Link to="/contact" className="btn-primary w-full" onClick={() => setIsOpen(false)}>
                  Book Consultation
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

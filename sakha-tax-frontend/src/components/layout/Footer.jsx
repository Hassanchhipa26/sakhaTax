import { Link } from 'react-router-dom'
import { FiPhoneCall, FiMail, FiMapPin, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { NAV_LINKS, BUSINESS } from '@/constants/site'
import { services } from '@/constants/services'

const Footer = () => {
  const year = new Date().getFullYear()
  const featuredServices = services.slice(0, 6)

  return (
    <footer className="bg-[var(--color-ink)] text-white/80">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-accent)] font-display text-lg font-bold text-[var(--color-ink)]">
              S
            </span>
            <span className="font-display text-lg font-bold text-white">Sakha Tax</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Registered tax and compliance partner for individuals and businesses across India —
            filings done right, deadlines never missed.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href={BUSINESS.social.facebook} aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]">
              <FiFacebook className="h-4 w-4" />
            </a>
            <a href={BUSINESS.social.instagram} aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]">
              <FiInstagram className="h-4 w-4" />
            </a>
            <a href={BUSINESS.social.linkedin} aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]">
              <FiLinkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="form-code text-white/50">Navigate</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-sm text-white/70 transition-colors hover:text-[var(--color-accent)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="form-code text-white/50">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {featuredServices.map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className="text-sm text-white/70 transition-colors hover:text-[var(--color-accent)]">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="text-sm font-semibold text-[var(--color-accent)]">
                View all services →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="form-code text-white/50">Get in Touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
              <span>{BUSINESS.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhoneCall className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
              <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-[var(--color-accent)]">{BUSINESS.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-[var(--color-accent)]">{BUSINESS.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>© {year} Sakha Tax Consultancy. All rights reserved.</p>
          <p className="font-mono">GSTIN registered · CA-assisted filings</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

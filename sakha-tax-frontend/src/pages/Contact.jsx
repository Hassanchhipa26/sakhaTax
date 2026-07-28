import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPhoneCall, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import PageHeader from '@/components/common/PageHeader'
import ContactForm from '@/components/common/ContactForm'
import { BUSINESS } from '@/constants/site'

const DETAILS = [
  { icon: FiPhoneCall, label: 'Phone', value: BUSINESS.phone, href: `tel:${BUSINESS.phoneRaw}` },
  { icon: FiMail, label: 'Email', value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
  { icon: FiMapPin, label: 'Address', value: BUSINESS.address },
]

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact Us | Sakha Tax Consultancy'
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Let's talk about your compliance needs"
        description="Fill out the form and our team will get back to you within one business day — or call us directly."
      />

      <section className="container-page grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.2fr]">
        {/* Business details + map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="rounded-xl border border-[var(--color-ledger)] p-6">
            <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Business Details</h2>
            <ul className="mt-5 space-y-4">
              {DETAILS.map((d) => (
                <li key={d.label} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <d.icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-[var(--color-ink-soft)]">
                      {d.label}
                    </span>
                    {d.href ? (
                      <a href={d.href} className="text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)]">
                        {d.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-[var(--color-ink)]">{d.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-[var(--color-ledger)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                <FiClock className="h-4 w-4" />
              </span>
              <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Business Hours</h2>
            </div>
            <ul className="ledger-grid">
              {BUSINESS.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-[var(--color-ink-soft)]">{h.day}</span>
                  <span className="font-mono text-xs font-medium text-[var(--color-ink)]">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Google Map placeholder */}
          <div className="overflow-hidden rounded-xl border border-[var(--color-ledger)]">
            <iframe
              title="Sakha Tax Consultancy location"
              src={BUSINESS.mapEmbedSrc}
              width="100%"
              height="240"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Map showing Sakha Tax Consultancy office location"
            />
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[var(--color-ledger)] p-6 shadow-sm sm:p-8"
        >
          <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Send Us an Inquiry</h2>
          <p className="mt-1.5 text-sm text-[var(--color-ink-soft)]">
            We typically respond within a few hours during business days.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default Contact

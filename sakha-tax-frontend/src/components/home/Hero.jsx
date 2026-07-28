import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'
import Button from '@/components/common/Button'

const FILING_CODES = [
  { code: 'ITR', label: 'Filed on time' },
  { code: 'GST', label: 'Fully reconciled' },
  { code: 'TDS', label: 'Zero mismatch' },
]

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)]">
      {/* Signature ledger-grid texture */}
      <div className="ledger-grid-fine pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--color-accent)]/20 blur-3xl" aria-hidden="true" />

      <div className="container-page relative grid grid-cols-1 items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="eyebrow text-[var(--color-accent)]">Tax &amp; Compliance Partner</span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.12] text-white sm:text-5xl lg:text-[3.25rem]">
            Every filing, on record.
            <br />
            Every deadline, met.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Sakha Tax Consultancy handles your ITR, GST, TDS, payroll and business registrations —
            precisely filed, fully compliant, and never late.
          </p>

          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
            <Button to="/contact" variant="primary">
              Book Consultation
            </Button>
            <Button href="tel:+919876543210" variant="outline">
              Contact Now
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            {['12+ years in practice', 'CA-reviewed filings', '4,500+ returns filed'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                <FiCheckCircle className="h-4 w-4 text-[var(--color-accent)]" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Signature "ledger document" panel */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-7"
        >
          <div className="flex items-center justify-between border-b border-[var(--color-ledger)] pb-4">
            <div>
              <p className="form-code">FORM · COMPLIANCE-STATUS</p>
              <p className="mt-1 font-display text-sm font-semibold text-[var(--color-ink)]">Client Filing Record</p>
            </div>
            <span className="rounded-full bg-[var(--color-success-bg)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-accent-dark)]">
              Up to date
            </span>
          </div>

          <ul className="ledger-grid mt-1">
            {FILING_CODES.map((row) => (
              <li key={row.code} className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <span className="form-code w-14 shrink-0 rounded bg-[var(--color-surface)] px-2 py-1 text-center">
                    {row.code}
                  </span>
                  <span className="text-sm text-[var(--color-ink-soft)]">{row.label}</span>
                </div>
                <FiCheckCircle className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
              </li>
            ))}
          </ul>

          <div className="mt-2 flex items-center justify-between rounded-lg bg-[var(--color-surface)] px-4 py-3">
            <span className="text-xs font-medium text-[var(--color-ink-soft)]">Next due date</span>
            <span className="font-mono text-xs font-semibold text-[var(--color-primary)]">GSTR-3B · 20th</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

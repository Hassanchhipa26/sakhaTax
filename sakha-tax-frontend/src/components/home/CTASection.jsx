import { motion } from 'framer-motion'
import Button from '@/components/common/Button'

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] py-16 sm:py-20">
      <div className="ledger-grid-fine pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="container-page relative flex flex-col items-center gap-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl"
        >
          Ready to bring your filings up to date?
        </motion.h2>
        <p className="max-w-xl text-white/70">
          Talk to a tax consultant today — no obligation, just clarity on what your business needs.
        </p>
        <div className="flex flex-col gap-3.5 sm:flex-row">
          <Button to="/contact" variant="primary">
            Book Free Consultation
          </Button>
          <Button href="tel:+919876543210" variant="outline">
            Call Now
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTASection

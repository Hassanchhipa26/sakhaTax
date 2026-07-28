import { motion } from 'framer-motion'

const PageHeader = ({ eyebrow, title, description }) => {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] py-16 sm:py-20">
      <div className="ledger-grid-fine pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          {eyebrow && <span className="eyebrow text-[var(--color-accent)]">{eyebrow}</span>}
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          {description && <p className="mt-4 text-white/70">{description}</p>}
        </motion.div>
      </div>
    </section>
  )
}

export default PageHeader

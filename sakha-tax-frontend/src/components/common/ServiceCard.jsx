import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'

/**
 * Service card styled as a filing/document tab — the form reference code (e.g. "ITR", "GST-REG")
 * sits like a stamped tab in the corner, tying the card to real tax-filing paperwork.
 */
const ServiceCard = ({ service, index = 0 }) => {
  const Icon = service.icon

  return (
    <motion.div
      id={service.slug}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col rounded-xl border border-[var(--color-ledger)] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-primary)]/5"
    >
      <span className="form-code absolute right-5 top-5 rounded bg-[var(--color-surface)] px-2 py-1">
        {service.code}
      </span>

      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary)]/8 text-[var(--color-primary)] transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold text-[var(--color-ink)]">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">{service.short}</p>

      <Link
        to={`/services#${service.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent-dark)]"
      >
        Learn More
        <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  )
}

export default ServiceCard

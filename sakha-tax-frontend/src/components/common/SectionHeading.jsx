import { motion } from 'framer-motion'

/**
 * Consistent section heading: eyebrow label + title + optional supporting copy.
 */
const SectionHeading = ({ eyebrow, title, description, align = 'left', light = false }) => {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`flex max-w-2xl flex-col gap-3 ${alignment}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`font-display text-3xl font-bold leading-tight sm:text-4xl ${light ? 'text-white' : 'text-[var(--color-ink)]'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed ${light ? 'text-white/70' : 'text-[var(--color-ink-soft)]'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeading

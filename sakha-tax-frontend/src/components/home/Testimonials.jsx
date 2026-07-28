import { motion } from 'framer-motion'
import { FiUser } from 'react-icons/fi'
import SectionHeading from '@/components/common/SectionHeading'
import { TESTIMONIALS } from '@/constants/site'

const Testimonials = () => {
  return (
    <section className="container-page py-20 sm:py-24">
      <SectionHeading
        eyebrow="Client Feedback"
        title="What our clients say"
        description="Real feedback from individuals and businesses we file for, quarter after quarter."
        align="center"
      />

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.1 }}
            className="flex flex-col rounded-xl border border-[var(--color-ledger)] bg-white p-6"
          >
            <blockquote className="flex-1 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--color-ledger)] pt-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <FiUser className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-[var(--color-ink)]">{t.name}</span>
                <span className="block text-xs text-[var(--color-ink-soft)]">{t.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}

export default Testimonials

import { motion } from 'framer-motion'
import { FiAward, FiClock, FiEye, FiUsers } from 'react-icons/fi'
import SectionHeading from '@/components/common/SectionHeading'
import { WHY_CHOOSE_US } from '@/constants/site'

const ICONS = [FiAward, FiClock, FiEye, FiUsers]

const WhyChooseUs = () => {
  return (
    <section className="bg-[var(--color-surface)] py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Sakha Tax"
          title="Built for accuracy, trusted for consistency"
          description="Compliance isn't a once-a-year task — it's a running record. Here's how we keep yours clean."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col items-start rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-[var(--color-ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

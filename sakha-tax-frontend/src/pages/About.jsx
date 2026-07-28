import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTarget, FiEye, FiAward, FiUsers } from 'react-icons/fi'
import PageHeader from '@/components/common/PageHeader'
import SectionHeading from '@/components/common/SectionHeading'
import CTASection from '@/components/home/CTASection'
import { useCountUp } from '@/hooks/useCountUp'

const TEAM = [
  { name: 'CA Rohan Mehta', role: 'Founder & Chartered Accountant', focus: 'Tax planning · Audit' },
  { name: 'Sneha Iyer', role: 'Senior GST Consultant', focus: 'GST registration · Returns' },
  { name: 'Vikram Rao', role: 'Payroll & Compliance Lead', focus: 'Payroll · PT · TDS' },
  { name: 'Anjali Kapoor', role: 'Company Registration Specialist', focus: 'Company · MSME · Partnership' },
]

const EXPERIENCE_ITEMS = [
  { value: 12, suffix: '+', label: 'Years of Practice' },
  { value: 4500, suffix: '+', label: 'Returns Filed' },
  { value: 900, suffix: '+', label: 'Businesses Registered' },
]

const ExperienceStat = ({ value, suffix, label }) => {
  const { ref, value: current } = useCountUp(value)
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-mono text-3xl font-bold text-[var(--color-primary)]">
        {current.toLocaleString('en-IN')}
        {suffix}
      </span>
      <span className="text-sm text-[var(--color-ink-soft)]">{label}</span>
    </div>
  )
}

const About = () => {
  useEffect(() => {
    document.title = 'About Us | Sakha Tax Consultancy'
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="About Sakha Tax"
        title="A compliance partner that treats your deadlines as our own"
        description="Founded on the principle that tax compliance should be precise, transparent and never a source of last-minute stress."
      />

      {/* Company Introduction */}
      <section className="container-page grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Who We Are</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            Sakha Tax Consultancy
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Sakha Tax Consultancy was founded to give individuals and small businesses access to
            the same disciplined, CA-reviewed compliance process that large enterprises rely on —
            without the overhead of an in-house finance team. What began as a single-desk tax
            practice has grown into a full compliance partner, handling income tax, GST, payroll
            and registrations for thousands of clients across sectors.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Every engagement follows the same principle: a documented process, a tracked deadline,
            and a team member accountable for it — so nothing depends on memory, and nothing slips.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-5 rounded-2xl border border-[var(--color-ledger)] bg-[var(--color-surface)] p-8 sm:grid-cols-3"
        >
          {EXPERIENCE_ITEMS.map((item) => (
            <ExperienceStat key={item.label} {...item} />
          ))}
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[var(--color-surface)] py-20 sm:py-24">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="rounded-xl bg-white p-8 shadow-sm"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              <FiTarget className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-[var(--color-ink)]">Our Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              To make tax and regulatory compliance simple, transparent and stress-free for every
              individual and business we serve — through accurate filings, clear communication and
              consistent follow-through.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-xl bg-white p-8 shadow-sm"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
              <FiEye className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-[var(--color-ink)]">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              To be the most trusted compliance partner for growing Indian businesses — known for
              reliability, accuracy and a genuinely helpful approach to every client relationship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us (detailed) */}
      <section className="container-page py-20 sm:py-24">
        <SectionHeading
          eyebrow="Our Difference"
          title="Why businesses choose Sakha Tax Consultancy"
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: FiAward, title: 'Certified & Experienced', text: '12+ years handling filings across individuals, startups and established enterprises.' },
            { icon: FiUsers, title: 'Dedicated Point of Contact', text: 'One consultant tracks your full compliance calendar — no repeated explanations.' },
            { icon: FiTarget, title: 'Accuracy First', text: 'Every filing is reviewed before submission, reducing notices and rework.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-xl border border-[var(--color-ledger)] p-6 text-center"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent-dark)]">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-[var(--color-ink)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Professional Team */}
      <section className="bg-[var(--color-surface)] py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Our Team" title="The people behind your filings" align="center" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-xl bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10 font-display text-lg font-bold text-[var(--color-primary)]">
                  {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold text-[var(--color-ink)]">{member.name}</h3>
                <p className="mt-1 text-xs text-[var(--color-secondary)]">{member.role}</p>
                <p className="mt-2 text-xs text-[var(--color-ink-soft)]">{member.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

export default About

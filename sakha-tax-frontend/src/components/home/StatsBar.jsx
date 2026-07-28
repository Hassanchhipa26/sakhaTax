import { STATS } from '@/constants/site'
import { useCountUp } from '@/hooks/useCountUp'

const StatItem = ({ value, suffix, label }) => {
  const { ref, value: current } = useCountUp(value)
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-4 text-center">
      <span className="font-mono text-3xl font-semibold text-white sm:text-4xl">
        {current.toLocaleString('en-IN')}
        {suffix}
      </span>
      <span className="text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">{label}</span>
    </div>
  )
}

const StatsBar = () => {
  return (
    <section className="bg-[var(--color-ink)]">
      <div className="container-page grid grid-cols-2 divide-x divide-white/10 py-10 sm:grid-cols-4">
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}

export default StatsBar

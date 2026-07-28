import SectionHeading from '@/components/common/SectionHeading'
import ServiceCard from '@/components/common/ServiceCard'
import Button from '@/components/common/Button'
import { services } from '@/constants/services'

const ServicesPreview = () => {
  const featured = services.slice(0, 6)

  return (
    <section className="container-page py-20 sm:py-24">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="What We Do"
          title="Compliance services built around your filings"
          description="From individual returns to full business compliance, each service is handled by specialists who track your deadlines so you don't have to."
        />
        <Button to="/services" variant="outline-dark" className="shrink-0">
          View All Services
        </Button>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}

export default ServicesPreview

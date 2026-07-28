import { useEffect } from 'react'
import PageHeader from '@/components/common/PageHeader'
import ServiceCard from '@/components/common/ServiceCard'
import CTASection from '@/components/home/CTASection'
import { services } from '@/constants/services'

const Services = () => {
  useEffect(() => {
    document.title = 'Our Services | Sakha Tax Consultancy'

    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
      }
    }
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Every compliance service your business needs, in one place"
        description="From individual tax filing to full company registration and ongoing compliance, each service below is handled end-to-end by a dedicated specialist."
      />

      <section className="container-page py-20 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}

export default Services

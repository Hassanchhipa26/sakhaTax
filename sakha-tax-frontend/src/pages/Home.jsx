import { useEffect } from 'react'
import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import ServicesPreview from '@/components/home/ServicesPreview'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Testimonials from '@/components/home/Testimonials'
import CTASection from '@/components/home/CTASection'

const Home = () => {
  useEffect(() => {
    document.title = 'Sakha Tax Consultancy | ITR, GST & Company Registration Experts'
  }, [])

  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  )
}

export default Home

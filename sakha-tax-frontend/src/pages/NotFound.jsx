import { useEffect } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import Button from '@/components/common/Button'

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found | Sakha Tax Consultancy'
  }, [])

  return (
    <section className="container-page flex flex-col items-center justify-center gap-5 py-32 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-primary)]">
        <FiAlertTriangle className="h-7 w-7" />
      </span>
      <h1 className="font-display text-3xl font-bold text-[var(--color-ink)]">Page Not Found</h1>
      <p className="max-w-md text-[var(--color-ink-soft)]">
        The page you're looking for doesn't exist or may have moved. Head back home or reach out
        to us directly.
      </p>
      <div className="flex gap-3">
        <Button to="/" variant="primary">Back to Home</Button>
        <Button to="/contact" variant="outline-dark">Contact Us</Button>
      </div>
    </section>
  )
}

export default NotFound

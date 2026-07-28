import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle, FiX } from 'react-icons/fi'

/**
 * Light-green success confirmation, shown after a successful contact form submission.
 * Auto-hides after `duration` ms.
 */
const SuccessAlert = ({ isOpen, onClose, duration = 6000 }) => {
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [isOpen, duration, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="mb-6 flex items-start gap-3 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-success-bg)] p-4"
        >
          <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent-dark)]" />
          <div className="flex-1">
            <p className="font-semibold text-sm text-[var(--color-ink)]">
              Thank you for contacting Sakha Tax Consultancy.
            </p>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
              Our team has received your inquiry. We will contact you shortly.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss confirmation"
            className="text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
          >
            <FiX className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SuccessAlert

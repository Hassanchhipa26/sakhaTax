import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiSend, FiAlertCircle } from 'react-icons/fi'
import SuccessAlert from '@/components/common/SuccessAlert'
import { services } from '@/constants/services'
import { INDIAN_MOBILE_REGEX } from '@/utils/validators'
import { submitContactForm } from '@/services/contactService'

const inputClass =
  'w-full rounded-md border border-[var(--color-ledger)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/60 transition-colors focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20'

const errorTextClass = 'mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600'

const ContactForm = () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = async (formData) => {
    setSubmitError('')
    try {
      await submitContactForm(formData)
      setShowSuccess(true)
      reset()
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message ||
          'Something went wrong while sending your inquiry. Please try again or call us directly.'
      )
    }
  }

  return (
    <div>
      <SuccessAlert isOpen={showSuccess} onClose={() => setShowSuccess(false)} />

      {submitError && (
        <div className={`${errorTextClass} mb-4 rounded-md bg-red-50 p-3`}>
          <FiAlertCircle className="h-4 w-4 shrink-0" />
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />
          {errors.name && (
            <p id="name-error" className={errorTextClass}>
              <FiAlertCircle className="h-3.5 w-3.5" /> {errors.name.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            id="mobile"
            type="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            className={inputClass}
            aria-invalid={errors.mobile ? 'true' : 'false'}
            aria-describedby={errors.mobile ? 'mobile-error' : undefined}
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: {
                value: INDIAN_MOBILE_REGEX,
                message: 'Enter a valid 10-digit Indian mobile number',
              },
            })}
          />
          {errors.mobile && (
            <p id="mobile-error" className={errorTextClass}>
              <FiAlertCircle className="h-3.5 w-3.5" /> {errors.mobile.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <p id="email-error" className={errorTextClass}>
              <FiAlertCircle className="h-3.5 w-3.5" /> {errors.email.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Service Required <span className="text-red-500">*</span>
          </label>
          <select
            id="service"
            defaultValue=""
            className={inputClass}
            aria-invalid={errors.service ? 'true' : 'false'}
            aria-describedby={errors.service ? 'service-error' : undefined}
            {...register('service', { required: 'Please select a service' })}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other">Other / Not Sure</option>
          </select>
          {errors.service && (
            <p id="service-error" className={errorTextClass}>
              <FiAlertCircle className="h-3.5 w-3.5" /> {errors.service.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell us briefly about your requirement"
            className={`${inputClass} resize-none`}
            {...register('message', {
              maxLength: { value: 800, message: 'Message must be under 800 characters' },
            })}
          />
          {errors.message && (
            <p className={errorTextClass}>
              <FiAlertCircle className="h-3.5 w-3.5" /> {errors.message.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
            <FiSend className="h-4 w-4" />
            {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm

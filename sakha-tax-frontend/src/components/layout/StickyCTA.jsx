import { FiPhoneCall } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { BUSINESS } from '@/constants/site'

const StickyCTA = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${BUSINESS.phoneRaw.replace('+', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
        style={{ height: '3.25rem', width: '3.25rem' }}
      >
        <FaWhatsapp className="h-6 w-6" />
      </a>
      <a
        href={`tel:${BUSINESS.phoneRaw}`}
        aria-label="Call us"
        className="flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg transition-transform hover:scale-105"
        style={{ height: '3.25rem', width: '3.25rem' }}
      >
        <FiPhoneCall className="h-5 w-5" />
      </a>
    </div>
  )
}

export default StickyCTA

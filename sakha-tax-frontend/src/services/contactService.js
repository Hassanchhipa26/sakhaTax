import api from './api'

/**
 * Submits a contact/inquiry form to the backend.
 * Expected backend route: POST /api/contact
 * Backend is not yet wired up — this call will fail gracefully until then.
 * @param {{name: string, mobile: string, email: string, service: string, message: string}} payload
 */
export const submitContactForm = async (payload) => {
  const { data } = await api.post('/contact', payload)
  return data
}

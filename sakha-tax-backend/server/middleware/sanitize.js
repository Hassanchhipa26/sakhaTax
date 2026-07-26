/**
 * Recursively strips Mongo operator keys ($, and keys containing '.') from an object,
 * preventing NoSQL injection via query/body/params.
 *
 * Express 5 makes `req.query` a read-only getter, so this mutates objects in place
 * instead of reassigning `req.query = ...` (which the popular express-mongo-sanitize
 * package still does, and which breaks under Express 5).
 */
const sanitizeValue = (value) => {
  if (Array.isArray(value)) {
    value.forEach(sanitizeValue)
    return value
  }

  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) {
      if (key.startsWith('$') || key.includes('.')) {
        delete value[key]
        continue
      }
      sanitizeValue(value[key])
    }
  }

  return value
}

export const mongoSanitize = (req, res, next) => {
  if (req.body) sanitizeValue(req.body)
  if (req.params) sanitizeValue(req.params)
  if (req.query) sanitizeValue(req.query)
  next()
}

export default mongoSanitize

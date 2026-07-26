/**
 * Wraps an async Express handler so rejected promises are forwarded to next(err)
 * instead of requiring a try/catch in every controller.
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

export default asyncHandler

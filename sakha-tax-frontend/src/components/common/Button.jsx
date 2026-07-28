import { Link } from 'react-router-dom'

const VARIANT_CLASS = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  'outline-dark': 'btn-outline-dark',
}

/**
 * Polymorphic button: renders a <Link> if `to` is given, an <a> if `href` is given,
 * otherwise a native <button>.
 */
const Button = ({ children, variant = 'primary', to, href, type = 'button', className = '', ...props }) => {
  const classes = `${VARIANT_CLASS[variant] || VARIANT_CLASS.primary} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button

import { Link } from 'react-router-dom'
import brandLogoIcon from '../assets/icons/brand-logo.svg'

function BrandLogo() {
  return (
    <Link to="/" className="inline-flex items-center">
      <img src={brandLogoIcon} alt="UAPE" className="h-6 w-auto shrink-0" />
    </Link>
  )
}

export default BrandLogo

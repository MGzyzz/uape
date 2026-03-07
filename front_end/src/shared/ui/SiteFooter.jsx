import { FaTelegramPlane, FaWhatsapp, FaYoutube, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa'
import footerTitleIcon from '../assets/icons/footer-title.svg'

const SOCIAL_LINKS = [
  { Icon: FaTelegramPlane, href: '#', label: 'Telegram',  hoverClass: 'uape-social-telegram' },
  { Icon: FaWhatsapp,      href: '#', label: 'WhatsApp',  hoverClass: 'uape-social-whatsapp' },
  { Icon: FaYoutube,       href: '#', label: 'YouTube',   hoverClass: 'uape-social-youtube' },
  { Icon: FaInstagram,     href: '#', label: 'Instagram', hoverClass: 'uape-social-instagram' },
]

function SiteFooter() {
  return (
    <footer className=" bg-uape-header">
      <div className="uape-section-shell uape-footer-shell">

        <img
          src={footerTitleIcon}
          alt="You're adaptive programming education"
          className="w-full"
        />

        <div className="mt-8 flex flex-col justify-between gap-6 border-t border-uape-border-soft pt-6 md:flex-row md:items-center">

          {/* Left — copyright */}
          <div className="text-white/55 text-sm leading-relaxed">
            <p>Project developed as part of a final qualification work</p>
            <p className="mt-1">&copy; Copyright 2026 UAPE</p>
          </div>

          {/* Right — social icons + contacts */}
          <div className="flex flex-col items-start gap-3 md:items-end">

            {/* Social icon buttons */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ Icon, href, label, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`uape-social-icon flex h-10 w-10 items-center justify-center rounded-lg bg-uape-form-bg text-white ${hoverClass}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white">
              <a href="mailto:example@gmail.com" className="flex items-center gap-2 transition hover:opacity-75">
                <FaEnvelope size={15} />
                example@gmail.com
              </a>
              <a href="tel:+77777777777" className="flex items-center gap-2 transition hover:opacity-75">
                <FaPhone size={15} />
                +7 777 777 7777
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}

export default SiteFooter

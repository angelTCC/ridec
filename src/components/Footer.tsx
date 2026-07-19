import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/eventos", label: "Eventos" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/blog", label: "Blog" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/eventos", label: "Eventos" },
  { href: "/oportunidades", label: "Oportunidades" },
];

const socials = [
  { icon: "/images/redes-sociales/icons8-instagram-50.svg", label: "Instagram", href: "#" },
  { icon: "/images/redes-sociales/icons8-facebook-50.svg", label: "Facebook", href: "#" },
  { icon: "/images/redes-sociales/icons8-linkedin-50.svg", label: "LinkedIn", href: "#" },
  { icon: "/images/redes-sociales/icons8-youtube-50.svg", label: "YouTube", href: "#" },
  { icon: "/images/redes-sociales/icons8-whatsapp-50.svg", label: "WhatsApp", href: "#" },
  { icon: "/images/redes-sociales/icons8-tiktok-50.svg", label: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              <Image src="/images/logo.png" alt="RIdeC" width={40} height={40} />
              <span>RIdeC</span>
            </Link>
            <p className="footer__brand-text">
              Red iberoamericana de estudiantes y profesionales que impulsa las
              ciencias básicas, reduce la deserción y genera comunidad.
            </p>
            <div className="footer__socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label={s.label}
                >
                  <Image src={s.icon} alt={s.label} width={20} height={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div className="footer__col">
            <h4 className="footer__heading">Navegación</h4>
            <ul className="footer__links">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer__link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div className="footer__col">
            <h4 className="footer__heading">Recursos</h4>
            <ul className="footer__links">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer__link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer__col">
            <h4 className="footer__heading">Contacto</h4>
            <ul className="footer__links footer__links--info">
              <li className="footer__info-item">
                <span>📧</span> contacto@ridec.org
              </li>
              <li className="footer__info-item">
                <span>📍</span> Lima, Perú
              </li>
              <li className="footer__info-item">
                <span>📱</span> +51 999 888 777
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} RIdeC — Red Iberoamericana de Ciencias. Todos los derechos reservados.
          </p>
          <div className="footer__legal">
            <Link href="#" className="footer__legal-link">Política de privacidad</Link>
            <Link href="#" className="footer__legal-link">Términos de uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

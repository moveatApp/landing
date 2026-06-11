import { Heart } from 'lucide-react';

const footerLinks = {
  producto: [
    { label: 'Features', href: '#solution' },
    { label: 'Cómo funciona', href: '#how-it-works' },
    { label: 'Precios', href: '#cta' },
  ],
  legal: [
    { label: 'Privacidad', href: '#!' },
    { label: 'Términos', href: '#!' },
    { label: 'Cookies', href: '#!' },
  ],
};

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-brand-dark text-white/80 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/Logo.png" alt="Moveat Logo" className="h-10 w-auto" />
              <span className="font-heading font-bold text-xl text-white">
                Mov<span className="text-brand-orange">Eat</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Convertí hábitos saludables en progreso real. Tu compañero de nutrición y fitness impulsado por IA.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Producto</h4>
            <ul className="space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-white/50 hover:text-brand-orange transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => e.preventDefault()}
                    className="text-white/50 hover:text-brand-orange transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Moveat. Todos los derechos reservados.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-brand-orange" /> para una vida más saludable
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'El Problema', href: '#problem' },
  { label: 'Solución', href: '#solution' },
  { label: 'Cómo Funciona', href: '#how-it-works' },
  { label: 'Beneficios', href: '#benefits' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a 
          href="#hero" 
          onClick={(e) => handleClick(e, '#hero')} 
          className="flex items-center gap-2 relative z-[101]"
        >
          <img
            src="/Logo.png"
            alt="Moveat Logo"
            className="h-10 w-auto"
          />
          <span className={`font-heading font-bold text-xl transition-colors ${
            isScrolled ? 'text-brand-dark' : 'text-white'
          }`}>
            Mov<span className="text-brand-orange">Eat</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-brand-orange ${
                isScrolled ? 'text-brand-text' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={(e) => handleClick(e, '#cta')}
            className="btn-primary px-5 py-2.5 rounded-full text-sm font-semibold inline-block active:scale-[0.98]"
          >
            Empezar ahora
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors relative z-[101] ${
            isScrolled || mobileOpen ? 'text-brand-dark' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-white shadow-2xl z-[99] border-t border-gray-100">
          <div className="px-6 py-8 space-y-4 max-w-md mx-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="block text-brand-text font-semibold text-lg py-3 hover:text-brand-orange transition-colors border-b border-gray-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={(e) => handleClick(e, '#cta')}
              className="btn-primary block text-center px-5 py-4 rounded-full text-base font-bold mt-6 active:scale-[0.98]"
            >
              Empezar ahora
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

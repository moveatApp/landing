import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import TypographyReveal from './TypographyReveal';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  'Registro ilimitado por WhatsApp',
  'Dashboard completo de progreso',
  'Sistema de logros y gamificación',
  'Soporte prioritario',
];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-badge', {
        scrollTrigger: {
          trigger: '.cta-badge',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      });

      gsap.utils.toArray<HTMLElement>('.cta-item').forEach((item, i) => {
        gsap.fromTo(item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden z-10"
    >
      <div className="bg-gradient-to-br from-brand-orange via-[#E03E00] to-brand-green rounded-[32px] border border-white/10 shadow-[0_30px_80px_rgba(255,90,31,0.18)] p-8 sm:p-12 md:p-16 relative overflow-hidden">
        {/* Glow Effects inside card */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/palti/salto_felicidad.png"
              alt="Palti saltando de felicidad"
              className="h-44 w-auto object-contain drop-shadow-[0_10px_20px_rgba(255,255,255,0.15)]"
            />
          </div>
          <div className="cta-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4.5 py-1.5 mb-8">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-semibold tracking-wide">Empezá hoy</span>
          </div>

          <TypographyReveal
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight tracking-tight text-center mx-auto"
            revealType="character"
            animationType="fadeInUp"
            fromDirection="bottom"
            stagger={0.02}
            duration={0.5}
          >
            Moveat te acompaña todos los días para que tu mejor versión sea tu nueva rutina.
          </TypographyReveal>

          <p className="cta-item text-white/80 text-lg max-w-2xl mx-auto mb-10 font-medium">
            Unite a miles de personas que ya transformaron sus hábitos. 
            El primer mes es gratis. Sin tarjeta de crédito.
          </p>

          {/* Benefits list */}
          <div className="cta-item flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Check className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="cta-item flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('¡Gracias por tu interés! Pronto nos pondremos en contacto.');
              }}
              className="bg-white text-brand-orange px-8 py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:scale-105 active:scale-[0.98] transition-all w-full sm:w-auto"
            >
              Comenzar ahora
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-white border-2 border-white/40 px-8 py-4 rounded-full text-base font-semibold hover:bg-white/10 active:scale-[0.98] transition-all w-full sm:w-auto text-center"
            >
              Conocer más
            </a>
          </div>

          <p className="cta-item text-white/50 text-sm mt-6">
            Sin compromiso. Cancelá cuando quieras.
          </p>
        </div>
      </div>
    </section>
  );
}

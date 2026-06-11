import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageCircle,
  Utensils,
  Dumbbell,
  BarChart3,
  Trophy,
  CheckCircle2,
} from 'lucide-react';
import TypographyReveal from './TypographyReveal';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MessageCircle,
    title: 'Registro Conversacional por WhatsApp',
    desc: 'Registrá comidas, actividades y hábitos usando lenguaje natural. La IA procesa y organiza la información por vos al instante.',
    iconBg: 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white',
  },
  {
    icon: Utensils,
    title: 'Análisis Nutricional Inteligente',
    desc: 'Estimación automática de calorías, proteínas, carbohidratos y grasas con solo describir lo que almorzaste.',
    iconBg: 'bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white',
  },
  {
    icon: Dumbbell,
    title: 'Seguimiento de Actividad Física',
    desc: 'Controlá tus entrenamientos y gasto energético. Registrá rutinas de fuerza, cardio o pasos diarios.',
    iconBg: 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white',
  },
  {
    icon: BarChart3,
    title: 'Dashboard de Progreso Interactivo',
    desc: 'Visualizá tus hábitos de manera clara. Gráficos interactivos y tendencias semanales para tomar mejores decisiones.',
    iconBg: 'bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white',
  },
  {
    icon: Trophy,
    title: 'Gamificación de Hábitos',
    desc: 'Mantené tus rachas activas, desbloqueá logros por constancia y competí en desafíos mensuales para sostener el hábito.',
    iconBg: 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white',
  },
  {
    icon: CheckCircle2,
    title: 'Todo en un Solo Lugar',
    desc: 'Olvidate de descargar múltiples aplicaciones. Moveat centraliza nutrición, fitness y hábitos en un solo dashboard.',
    iconBg: 'bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white',
  },
];

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.solution-badge', {
        scrollTrigger: {
          trigger: '.solution-badge',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      });

      gsap.from('.solution-desc', {
        scrollTrigger: {
          trigger: '.solution-desc',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.4,
      });

      gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Palti peek animation
      const paltiPeek = sectionRef.current?.querySelector('.palti-peek img');
      if (paltiPeek) {
        gsap.fromTo(paltiPeek,
          { y: 30, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: 0.2,
            scrollTrigger: {
              trigger: '.palti-peek',
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden z-10"
    >
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] border border-gray-200/30 shadow-[0_30px_80px_rgba(255,90,31,0.04)] p-8 sm:p-12 md:p-16 relative overflow-hidden">
        {/* Decorative inner light blur */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-green/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-16">
            <div className="solution-badge inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-lg px-4 py-1.5 mb-6 border border-brand-green/20">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wide">La solución</span>
            </div>

            <TypographyReveal
              className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brand-dark mb-6 tracking-tight text-center mx-auto"
              revealType="character"
              animationType="fadeInUp"
              fromDirection="bottom"
              stagger={0.02}
              duration={0.5}
            >
              Moveat simplifica tus hábitos cotidianos
            </TypographyReveal>

            <p className="solution-desc text-brand-text-light text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Olvidate de aplicaciones lentas y complejas. Con Moveat, todo el registro ocurre de manera natural y conversacional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`feature-card group bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/40 hover:border-brand-orange/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${i === 3 ? 'relative' : ''}`}
              >
                {i === 3 && (
                  <div className="palti-peek absolute -bottom-12 -left-10 z-0 pointer-events-none">
                    <img
                       src="/palti/comiendo_ensalada.png"
                       alt="Palti comiendo ensalada"
                       className="h-28 w-auto object-contain opacity-0"
                    />
                  </div>
                )}
                <div className="relative z-10">
                  <div className="font-heading font-black text-2xl text-brand-green/40 mb-4 group-hover:text-brand-green transition-colors tabular-nums">
                    0{i + 1}
                  </div>
                  <h3 className="font-heading font-bold text-xl text-brand-dark mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-brand-text-light text-sm sm:text-base leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Highlight */}
          <div className="mt-16 max-w-3xl mx-auto text-center border-t border-gray-200/30 pt-12">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark mb-4 tracking-tight text-wrap-balance">
              Nutrición sin contar gramos
            </h3>
            <p className="text-brand-text-light text-base mb-6 leading-relaxed">
              Olvidate de buscar en bases de datos infinitas. Con Moveat, solo le decís a Palti: <em className="text-brand-orange font-semibold">"Desayuné tostadas con huevo revuelto y un café con leche"</em>.
            </p>
            <p className="text-brand-text-light text-base mb-6 leading-relaxed">
              Nuestra IA analiza automáticamente los ingredientes, estima las porciones promedio y desglosa los macronutrientes en tu perfil en menos de 5 segundos.
            </p>
            <div className="flex items-center justify-center gap-2 text-brand-green font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
              Disponible 24/7 en tu WhatsApp
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

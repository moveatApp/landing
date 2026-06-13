import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
   MessageCircle,
   Utensils,
   Dumbbell,
   BarChart3,
   Trophy,
   CheckCircle2,
} from "lucide-react"
import TypographyReveal from "./TypographyReveal"

gsap.registerPlugin(ScrollTrigger)

const features = [
   {
      icon: MessageCircle,
      title: "Registro Conversacional por WhatsApp",
      desc: "Registrá comidas, actividades y hábitos usando lenguaje natural. La IA procesa y organiza la información por vos al instante.",
      iconBg:
         "bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white",
   },
   {
      icon: Utensils,
      title: "Análisis Nutricional Inteligente",
      desc: "Estimación automática de calorías, proteínas, carbohidratos y grasas con solo describir lo que almorzaste.",
      iconBg:
         "bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white",
   },
   {
      icon: Dumbbell,
      title: "Seguimiento de Actividad Física",
      desc: "Controlá tus entrenamientos y gasto energético. Registrá rutinas de fuerza, cardio o pasos diarios.",
      iconBg:
         "bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white",
   },
   {
      icon: BarChart3,
      title: "Dashboard de Progreso Interactivo",
      desc: "Visualizá tus hábitos de manera clara. Gráficos interactivos y tendencias semanales para tomar mejores decisiones.",
      iconBg:
         "bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white",
   },
   {
      icon: Trophy,
      title: "Gamificación de Hábitos",
      desc: "Mantené tus rachas activas, desbloqueá logros por constancia y competí en desafíos mensuales para sostener el hábito.",
      iconBg:
         "bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white",
   },
   {
      icon: CheckCircle2,
      title: "Todo en un Solo Lugar",
      desc: "Olvidate de descargar múltiples aplicaciones. Moveat centraliza nutrición, fitness y hábitos en un solo dashboard.",
      iconBg:
         "bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white",
   },
]

export default function Solution() {
   const sectionRef = useRef<HTMLElement>(null)

   useGSAP(
      () => {
         const ctx = gsap.context(() => {
            gsap.from(".solution-badge", {
               scrollTrigger: {
                  trigger: ".solution-badge",
                  start: "top 85%",
                  toggleActions: "play none none none",
               },
               scale: 0.8,
               opacity: 0,
               duration: 0.5,
               ease: "back.out(1.7)",
            })

            gsap.from(".solution-desc", {
               scrollTrigger: {
                  trigger: ".solution-desc",
                  start: "top 90%",
                  toggleActions: "play none none none",
               },
               y: 30,
               opacity: 0,
               duration: 0.6,
               ease: "power2.out",
               delay: 0.4,
            })

            gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
               gsap.fromTo(
                  card,
                  { y: 60, opacity: 0 },
                  {
                     y: 0,
                     opacity: 1,
                     duration: 0.7,
                     ease: "power2.out",
                     delay: i * 0.1,
                     scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none none",
                     },
                  },
               )
            })

            // Palti peek animation
            const paltiPeek = sectionRef.current?.querySelector(".palti-peek img")
            if (paltiPeek) {
               gsap.fromTo(
                  paltiPeek,
                  { y: 30, opacity: 0, scale: 0.8 },
                  {
                     y: 0,
                     opacity: 1,
                     scale: 1,
                     duration: 0.8,
                     ease: "back.out(1.7)",
                     delay: 0.2,
                     scrollTrigger: {
                        trigger: ".palti-peek",
                        start: "top 95%",
                        toggleActions: "play none none none",
                     },
                  },
               )
            }
         }, sectionRef)

         return () => ctx.revert()
      },
      { scope: sectionRef },
   )

   return (
      <section
         id="solution"
         ref={sectionRef}
         className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden z-10">
         <div className="p-8 sm:p-12 md:p-16 relative overflow-hidden">
            <div className="relative z-10">
               <div className="text-center mb-16">
                  <div className="solution-badge inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-lg px-4 py-1.5 mb-6 border border-brand-green/20">
                     <CheckCircle2 className="w-4 h-4" />
                     <span className="text-xs font-semibold tracking-wide">
                        La solución
                     </span>
                  </div>

                  <TypographyReveal
                     className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight text-center mx-auto"
                     revealType="character"
                     animationType="fadeInUp"
                     fromDirection="bottom"
                     stagger={0.02}
                     duration={0.5}>
                     Moveat simplifica tus hábitos cotidianos
                  </TypographyReveal>

                  <p className="solution-desc text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                     Olvidate de aplicaciones lentas y complejas. Con Moveat, todo el
                     registro ocurre de manera natural y conversacional.
                  </p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                  {features.map((feature, i) => (
                     <div
                        key={i}
                        className={`feature-card group bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${i === 3 ? "relative" : ""}`}>
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
                           <div className="font-heading font-black text-2xl text-brand-green/60 mb-4 group-hover:text-brand-green transition-colors tabular-nums">
                              0{i + 1}
                           </div>
                           <h3 className="font-heading font-bold text-xl text-white mb-3">
                              {feature.title}
                           </h3>
                           <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                              {feature.desc}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Feature Highlight removed */}
            </div>
         </div>
      </section>
   )
}

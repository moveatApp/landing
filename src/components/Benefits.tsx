import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
   Zap,
   Smartphone,
   MessageSquare,
   BarChart,
   Trophy,
   Target,
   Shield,
   Clock,
} from "lucide-react"
import TypographyReveal from "./TypographyReveal"

gsap.registerPlugin(ScrollTrigger)

const expectations = [
   {
      icon: Zap,
      title: "Menos fricción al registrar hábitos",
      desc: "WhatsApp es natural. Escribí sin abrir otra app.",
   },
   {
      icon: Smartphone,
      title: "Acceso rápido desde cualquier lugar",
      desc: "Tu asistente de salud siempre en el bolsillo.",
   },
   {
      icon: MessageSquare,
      title: "Interacción natural y conversacional",
      desc: "Sin formularios. Sin contadores. Solo conversar.",
   },
   {
      icon: BarChart,
      title: "Mayor constancia y seguimiento",
      desc: "Visualizá tu progreso y mantené el ritmo.",
   },
   {
      icon: Trophy,
      title: "Motivación continua mediante gamificación",
      desc: "Logros, rachas y recompensas que te impulsan.",
   },
   {
      icon: Target,
      title: "Metas personalizadas",
      desc: "Objetivos adaptados a tu estilo de vida real.",
   },
   {
      icon: Shield,
      title: "Privacidad y seguridad",
      desc: "Tus datos protegidos con encriptación de nivel bancario.",
   },
   {
      icon: Clock,
      title: "Resultados visibles en semanas",
      desc: "No esperes meses. Empezá a ver cambios rápido.",
   },
]

export default function Benefits() {
   const sectionRef = useRef<HTMLElement>(null)

   useGSAP(
      () => {
         const ctx = gsap.context(() => {
            gsap.from(".benefits-badge", {
               scrollTrigger: {
                  trigger: ".benefits-badge",
                  start: "top 85%",
                  toggleActions: "play none none none",
               },
               scale: 0.8,
               opacity: 0,
               duration: 0.5,
               ease: "back.out(1.7)",
            })

            gsap.from(".benefits-desc", {
               scrollTrigger: {
                  trigger: ".benefits-desc",
                  start: "top 90%",
                  toggleActions: "play none none none",
               },
               y: 30,
               opacity: 0,
               duration: 0.6,
               ease: "power2.out",
               delay: 0.4,
            })

            gsap.utils.toArray<HTMLElement>(".benefit-card").forEach((card, i) => {
               gsap.fromTo(
                  card,
                  { y: 50, opacity: 0 },
                  {
                     y: 0,
                     opacity: 1,
                     duration: 0.6,
                     ease: "power2.out",
                     delay: i * 0.08,
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
                  { y: 30, opacity: 0, scale: 0.8, rotate: 10 },
                  {
                     y: 0,
                     opacity: 1,
                     scale: 1,
                     rotate: 0,
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
         id="benefits"
         ref={sectionRef}
         className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden z-10">
         <div className="p-8 sm:p-12 md:p-16 relative overflow-hidden">
            <div className="relative z-10">
               <div className="text-center mb-16">
                  <div className="benefits-badge inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-lg px-4 py-1.5 mb-6 border border-brand-green/20">
                     <Target className="w-4 h-4" />
                     <span className="text-xs font-semibold tracking-wide">
                        Beneficios
                     </span>
                  </div>

                  <TypographyReveal
                     className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight text-center mx-auto"
                     revealType="character"
                     animationType="fadeInUp"
                     fromDirection="bottom"
                     stagger={0.02}
                     duration={0.5}>
                     Expectativas que Moveat supera cada día
                  </TypographyReveal>

                  <p className="benefits-desc text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-medium text-center">
                     Diseñada para personas reales con vidas reales. Moveat se adapta
                     a vos, no al revés.
                  </p>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                  {expectations.map((item, i) => (
                     <div
                        key={i}
                        className={`benefit-card group bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${i === 4 ? "relative" : ""}`}>
                        {i === 4 && (
                           <div className="palti-peek absolute -top-14 -right-6 z-0 pointer-events-none">
                              <img
                                 src="/palti/pulgar_arriba.png"
                                 alt="Palti pulgar arriba"
                                 className="h-24 w-auto object-contain opacity-0"
                              />
                           </div>
                        )}
                        <div className="relative z-10">
                           <div className="font-heading font-black text-2xl text-brand-green/60 mb-3 group-hover:text-brand-orange transition-colors tabular-nums">
                              0{i + 1}
                           </div>
                           <h3 className="font-heading font-bold text-base text-white mb-2">
                              {item.title}
                           </h3>
                           <p className="text-white/60 text-sm leading-relaxed">
                              {item.desc}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Consistency Feature */}
               <div className="mt-16 max-w-3xl mx-auto text-center border-t border-white/10 pt-12">
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-4 tracking-tight text-wrap-balance">
                     Consistencia sin culpas ni restricciones
                  </h3>
                  <p className="text-white/60 text-base mb-6 leading-relaxed">
                     El mayor obstáculo en la salud es la rigidez. Si comés algo
                     fuera de tu plan, las aplicaciones tradicionales te muestran
                     números rojos y alertas que generan frustración.
                  </p>
                  <p className="text-white/60 text-base mb-6 leading-relaxed">
                     Palti cree en el progreso sobre la perfección. En lugar de
                     juzgarte, reajusta tus metas del día de manera constructiva y te
                     da alternativas saludables para mantener tu racha sin estrés.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange rounded-lg px-4 py-1.5 border border-brand-orange/20 text-xs font-semibold tracking-wide">
                     Enfoque 100% positivo
                  </div>
               </div>

               {/* KPIs / Stats */}
               <div className="mt-20 bg-white/[0.02] backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/5 shadow-2xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                     {[
                        { value: "85%", label: "Consistencia Semanal" },
                        { value: "<10s", label: "Registro por Hábito" },
                        { value: "92%", label: "Progreso Visible" },
                        { value: "4.9/5", label: "Valoración IA" },
                     ].map((stat, i) => (
                        <div key={i} className="text-center">
                           <div className="font-heading font-black text-3xl sm:text-4xl text-brand-orange mb-2 tracking-tight tabular-nums">
                              {stat.value}
                           </div>
                           <div className="text-white/60 text-xs sm:text-sm font-medium tracking-wide">
                              {stat.label}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

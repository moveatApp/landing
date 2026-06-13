import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AlertTriangle, TrendingDown, Brain, CalendarX } from "lucide-react"
import TypographyReveal from "./TypographyReveal"

gsap.registerPlugin(ScrollTrigger)

const problems = [
   {
      icon: Brain,
      title: "Falta de Constancia",
      desc: "Los métodos tradicionales exigen un esfuerzo adicional de registro que rompe el hábito diario.",
   },
   {
      icon: TrendingDown,
      title: "Poca Motivación",
      desc: "Sin ver el impacto real de cada decisión diaria, la motivación desaparece a las pocas semanas.",
   },
   {
      icon: CalendarX,
      title: "Registro Tedioso",
      desc: "Contar calorías y pesar alimentos en aplicaciones complejas se siente como una tarea más de trabajo.",
   },
]

export default function Problem() {
   const sectionRef = useRef<HTMLElement>(null)

   useGSAP(
      () => {
         const ctx = gsap.context(() => {
            gsap.from(".problem-badge", {
               scrollTrigger: {
                  trigger: ".problem-badge",
                  start: "top 85%",
                  toggleActions: "play none none none",
               },
               scale: 0.8,
               opacity: 0,
               duration: 0.5,
               ease: "back.out(1.7)",
            })

            gsap.from(".problem-desc", {
               scrollTrigger: {
                  trigger: ".problem-desc",
                  start: "top 90%",
                  toggleActions: "play none none none",
               },
               y: 30,
               opacity: 0,
               duration: 0.6,
               ease: "power2.out",
               delay: 0.4,
            })

            gsap.utils.toArray<HTMLElement>(".problem-card").forEach((card, i) => {
               gsap.fromTo(
                  card,
                  { y: 60, opacity: 0 },
                  {
                     y: 0,
                     opacity: 1,
                     duration: 0.7,
                     ease: "power2.out",
                     delay: i * 0.15,
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
                  { y: 40, opacity: 0, scale: 0.8 },
                  {
                     y: 0,
                     opacity: 1,
                     scale: 1,
                     duration: 0.8,
                     ease: "back.out(1.7)",
                     delay: 0.3,
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
         id="problem"
         ref={sectionRef}
         className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden z-10">
         <div className="p-8 sm:p-12 md:p-16 relative overflow-hidden">

            <div className="relative z-10">
               <div className="text-center mb-20">
                  <div className="problem-badge inline-flex items-center gap-2 text-brand-orange rounded-lg px-4 py-1.5 mb-6">
                     <AlertTriangle className="w-4 h-4" />
                     <span className="text-xs font-semibold tracking-wide">
                        El desafío
                     </span>
                  </div>

                  <TypographyReveal
                     className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight text-center mx-auto"
                     revealType="character"
                     animationType="fadeInUp"
                     fromDirection="bottom"
                     stagger={0.02}
                     duration={0.5}>
                     ¿Por qué la mayoría abandona su camino saludable?
                  </TypographyReveal>

                  <p className="problem-desc text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                     Registrar hábitos no debería sentirse como un trabajo extra. Las
                     aplicaciones tradicionales fallan en lo más importante: la
                     simplicidad.
                  </p>
               </div>

               <div className="grid md:grid-cols-3 gap-8 relative">
                  {problems.map((problem, i) => (
                     <div
                        key={i}
                        className={`problem-card group bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${i === 1 ? "relative" : ""}`}>
                        {i === 1 && (
                           <div className="palti-peek absolute -top-16 -right-8 z-0 pointer-events-none">
                              <img
                                 src="/palti/cansado_tedioso.png"
                                 alt="Palti cansado"
                                 className="h-28 w-auto object-contain opacity-0"
                              />
                           </div>
                        )}
                        <div className="relative z-10">
                           <div className="font-heading font-black text-2xl text-brand-orange/60 mb-4 group-hover:text-brand-orange transition-colors tabular-nums">
                              0{i + 1}
                           </div>
                           <h3 className="font-heading font-bold text-xl text-white mb-3">
                              {problem.title}
                           </h3>
                           <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                              {problem.desc}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Visual representation removed */}
            </div>
         </div>
      </section>
   )
}

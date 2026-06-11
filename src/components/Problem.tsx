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
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] border border-gray-200/30 shadow-[0_30px_80px_rgba(255,90,31,0.04)] p-8 sm:p-12 md:p-16 relative overflow-hidden">
            {/* Decorative inner light blur */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-orange/[0.03] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
             <div className="text-center mb-20">
                <div className="problem-badge inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange rounded-lg px-4 py-1.5 mb-6 border border-brand-orange/20">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-semibold tracking-wide">
                         El desafío
                      </span>
                   </div>

                   <TypographyReveal
                      className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brand-dark mb-6 tracking-tight text-center mx-auto"
                      revealType="character"
                      animationType="fadeInUp"
                      fromDirection="bottom"
                      stagger={0.02}
                      duration={0.5}>
                      ¿Por qué la mayoría abandona su camino saludable?
                   </TypographyReveal>

                   <p className="problem-desc text-brand-text-light text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                      Registrar hábitos no debería sentirse como un trabajo extra. Las
                      aplicaciones tradicionales fallan en lo más importante: la
                      simplicidad.
                   </p>
                </div>

               <div className="grid md:grid-cols-3 gap-8 relative">
                  {problems.map((problem, i) => (
                     <div
                        key={i}
                        className={`problem-card group bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/40 hover:border-brand-orange/30 hover:-translate-y-1 ${i === 1 ? "relative" : ""}`}>
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
                            <div className="font-heading font-black text-2xl text-brand-orange/40 mb-4 group-hover:text-brand-orange transition-colors tabular-nums">
                               0{i + 1}
                            </div>
                           <h3 className="font-heading font-bold text-xl text-brand-dark mb-3">
                              {problem.title}
                           </h3>
                           <p className="text-brand-text-light text-sm sm:text-base leading-relaxed">
                              {problem.desc}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Visual representation */}
               <div className="mt-16 max-w-3xl mx-auto border-t border-gray-200/30 pt-12">
                  <div className="flex flex-col items-center gap-6">
                      <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark tracking-tight text-center text-wrap-balance">
                         El ciclo del abandono prematuro
                      </h3>
                      <p className="text-brand-text-light text-base text-center leading-relaxed max-w-xl">
                         Estudios de comportamiento demuestran que el{" "}
                         <strong className="text-brand-dark">
                            80% de las personas
                         </strong>{" "}
                         abandonan sus planes de bienestar durante los primeros 90
                         días.
                      </p>
                     <div className="w-full max-w-md bg-white/40 p-5 rounded-2xl border border-gray-200/30">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-brand-dark font-bold text-sm">
                              Fricción en apps tradicionales
                           </span>
                           <span className="text-brand-orange font-black text-base">
                              80% Deserción
                           </span>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                           <div
                              className="h-full bg-brand-orange rounded-full"
                              style={{ width: "80%" }}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

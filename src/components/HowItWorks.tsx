import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
   MessageCircle,
   Brain,
   ClipboardList,
   TrendingUp,
   Award,
   ArrowRight,
} from "lucide-react"
import TypographyReveal from "./TypographyReveal"

gsap.registerPlugin(ScrollTrigger)

const steps = [
   {
      icon: MessageCircle,
      title: "Escribís en WhatsApp",
      desc: "Contale a Moveat qué comiste, cuánto entrenaste o cómo te sentís. Usá lenguaje natural, como si chatearas con un amigo.",
      color: "bg-brand-green",
   },
   {
      icon: Brain,
      title: "La IA Entiende y Registra",
      desc: "Nuestra IA procesa tu mensaje al instante, desglosa los alimentos o entrenamientos y guarda la información en tu perfil.",
      color: "bg-brand-orange",
   },
   {
      icon: ClipboardList,
      title: "Tus Hábitos se Actualizan",
      desc: "En tiempo real, tu dashboard registra tu consumo de calorías, desglose de macronutrientes o actividad realizada.",
      color: "bg-brand-green",
   },
   {
      icon: TrendingUp,
      title: "Visualizás tu Progreso",
      desc: "Accedé a gráficos interactivos y tendencias históricas que te muestran tu evolución diaria y semanal sin complicaciones.",
      color: "bg-brand-orange",
   },
   {
      icon: Award,
      title: "Ganás Recompensas",
      desc: "Desbloqueá insignias y mantené vivas tus rachas de consistencia. La gamificación te mantiene motivado todos los días.",
      color: "bg-brand-green",
   },
]

export default function HowItWorks() {
   const sectionRef = useRef<HTMLElement>(null)
   const lineRef = useRef<HTMLDivElement>(null)
   const stepsContainerRef = useRef<HTMLDivElement>(null)

   useGSAP(
      () => {
         const ctx = gsap.context(() => {
            // Header badge animation
            gsap.from(".how-badge", {
               scrollTrigger: {
                  trigger: ".how-badge",
                  start: "top 85%",
                  toggleActions: "play none none none",
               },
               scale: 0.8,
               opacity: 0,
               duration: 0.5,
               ease: "back.out(1.7)",
            })

            // Subtitle
            gsap.from(".how-subtitle", {
               scrollTrigger: {
                  trigger: ".how-subtitle",
                  start: "top 90%",
                  toggleActions: "play none none none",
               },
               y: 30,
               opacity: 0,
               duration: 0.6,
               ease: "power2.out",
               delay: 0.3,
            })

            // Timeline line animation with scrub
            if (lineRef.current && stepsContainerRef.current) {
               gsap.fromTo(
                  lineRef.current,
                  { scaleY: 0 },
                  {
                     scaleY: 1,
                     ease: "none",
                     scrollTrigger: {
                        trigger: stepsContainerRef.current,
                        start: "top 75%",
                        end: "bottom 75%",
                        scrub: 0.5,
                     },
                  },
               )
            }

            // Animate step content
            gsap.utils.toArray<HTMLElement>(".step-animate").forEach((el) => {
               gsap.fromTo(
                  el,
                  { y: 60, opacity: 0 },
                  {
                     y: 0,
                     opacity: 1,
                     duration: 0.8,
                     ease: "power3.out",
                     scrollTrigger: {
                        trigger: el.closest(".step-card"),
                        start: "top 85%",
                        toggleActions: "play none none none",
                     },
                  },
               )
            })

            // Animate dots
            gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
               gsap.fromTo(
                  dot,
                  { scale: 0, opacity: 0 },
                  {
                     scale: 1,
                     opacity: 1,
                     duration: 0.5,
                     ease: "back.out(1.7)",
                     scrollTrigger: {
                        trigger: dot.closest(".step-card"),
                        start: "top 85%",
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
                  { x: 30, opacity: 0, scale: 0.8 },
                  {
                     x: 0,
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
         id="how-it-works"
         ref={sectionRef}
         className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden z-10">
         <div className="p-8 sm:p-12 md:p-16 relative overflow-hidden">
            <div className="relative z-10">
               <div className="text-center mb-20">
                  <div className="how-badge inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange rounded-lg px-4 py-1.5 mb-6 border border-brand-orange/20">
                     <ArrowRight className="w-4 h-4" />
                     <span className="text-xs font-semibold tracking-wide">
                        Paso a paso
                     </span>
                  </div>

                  <TypographyReveal
                     className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight text-center mx-auto"
                     revealType="character"
                     animationType="fadeInUp"
                     fromDirection="bottom"
                     stagger={0.02}
                     duration={0.5}>
                     Así de simple funciona Moveat
                  </TypographyReveal>

                  <p className="how-subtitle text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                     Sin formularios interminables ni configuraciones complejas. Solo
                     hablas, y Moveat se encarga del resto.
                  </p>
               </div>

               <div className="relative">
                  {/* Connecting Line (visible on desktop) - animated with scrub */}
                  <div
                     ref={lineRef}
                     className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-orange -translate-x-1/2 rounded-full origin-top"
                  />

                  <div ref={stepsContainerRef} className="space-y-12 md:space-y-0">
                     {steps.map((step, i) => (
                        <div
                           key={i}
                           className={`step-card relative md:grid md:grid-cols-2 md:gap-16 items-center ${
                              i !== 0 ? "md:mt-16" : ""
                           }`}>
                           {/* Content */}
                           <div
                              className={`${i % 2 === 1 ? "md:order-2" : ""} ${i === 2 ? "relative" : ""}`}>
                              {i === 2 && (
                                 <div className="palti-peek absolute -bottom-2 -right-36 z-0 pointer-events-none">
                                    <img
                                       src="/palti/corriendo.png"
                                       alt="Palti corriendo"
                                       className="h-24 w-auto object-contain opacity-0"
                                    />
                                 </div>
                              )}
                              <div className="step-animate relative z-10">
                                 <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-3 mb-4">
                                       <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-orange text-white font-black text-xs tabular-nums">
                                          {i + 1}
                                       </span>
                                       <h3 className="font-heading font-bold text-xl text-white">
                                          {step.title}
                                       </h3>
                                    </div>
                                    <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                                       {step.desc}
                                    </p>
                                 </div>
                              </div>
                           </div>

                           {/* Center dot on desktop */}
                           <div className="timeline-dot hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
                              <div
                                 className={`w-5 h-5 ${step.color} rounded-full border-4 border-[#0B0F19] shadow-md`}
                              />
                           </div>

                           {/* Empty side for layout */}
                           <div
                              className={`hidden md:block ${i % 2 === 1 ? "md:order-1" : ""}`}
                           />
                        </div>
                     ))}
                  </div>
               </div>

               {/* WhatsApp Mockup Section */}
               <div className="mt-24 bg-white/[0.02] backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/5 shadow-2xl">
                  <div className="grid lg:grid-cols-12 gap-12 items-center">
                     <div className="lg:col-span-6">
                        <span className="text-xs font-semibold text-brand-green tracking-wide bg-brand-green/10 px-3 py-1.5 rounded-lg border border-brand-green/20">
                           Demo en vivo
                        </span>
                        <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-4 mb-4 tracking-tight text-wrap-balance">
                           Hablar con tu salud es tan simple como chatear
                        </h3>
                        <p className="text-white/60 text-base mb-6 leading-relaxed">
                           Sin interfaces engorrosas. Palti te acompaña directamente en
                           WhatsApp. Solo decile qué hiciste o qué comiste, y su motor
                           de procesamiento natural registrará y analizará todo al
                           instante.
                        </p>
                        <div className="flex items-center gap-3 text-brand-green font-bold text-sm">
                           <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                           Procesamiento en tiempo real
                        </div>
                     </div>

                      {/* Mascot */}
                      <div className="lg:col-span-6 w-full flex justify-center">
                         <img
                            src="/palti/standing.png"
                            alt="Palti - Mascota de Moveat"
                            className="h-[28rem] sm:h-[32rem] w-auto object-contain drop-shadow-[0_20px_40px_rgba(255,90,31,0.25)]"
                         />
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

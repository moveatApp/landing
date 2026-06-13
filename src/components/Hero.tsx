import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowDown, Sparkles } from "lucide-react"

export default function Hero() {
   const sectionRef = useRef<HTMLElement>(null)
   const videoRef = useRef<HTMLVideoElement>(null)
   const headlineRef = useRef<HTMLHeadingElement>(null)
   const subheadRef = useRef<HTMLParagraphElement>(null)
   const ctaRef = useRef<HTMLDivElement>(null)
   const badgeRef = useRef<HTMLDivElement>(null)

   useGSAP(
      () => {
         const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

            // Video entrance
            tl.from(videoRef.current, {
               scale: 0.8,
               opacity: 0,
               y: 40,
               duration: 1,
               ease: "back.out(1.7)",
            })

            // Badge
            tl.from(
               badgeRef.current,
               {
                  y: 20,
                  opacity: 0,
                  duration: 0.6,
               },
               "-=0.4",
            )

            // Headline
            tl.from(
               headlineRef.current,
               {
                  y: 60,
                  opacity: 0,
                  duration: 0.8,
               },
               "-=0.3",
            )

            // Subheadline
            tl.from(
               subheadRef.current,
               {
                  y: 40,
                  opacity: 0,
                  duration: 0.7,
               },
               "-=0.4",
            )

            // CTA buttons
            tl.from(
               ctaRef.current?.children || [],
               {
                  y: 30,
                  opacity: 0,
                  stagger: 0.15,
                  duration: 0.6,
               },
               "-=0.3",
            )

            // Scroll indicator pulse
            gsap.to(".scroll-indicator", {
               y: 10,
               repeat: -1,
               yoyo: true,
               duration: 1.5,
               ease: "power1.inOut",
            })
         }, sectionRef)

         return () => ctx.revert()
      },
      { scope: sectionRef },
   )

   const scrollToProblem = () => {
      document.querySelector("#problem")?.scrollIntoView({ behavior: "smooth" })
   }

   return (
      <section
         id="hero"
         ref={sectionRef}
         className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
         {/* Background - solid dark warm */}
         <div className="absolute inset-0 bg-[#0F0E0C]" />

         {/* Animated Background Shapes */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl animate-float" />
            <div
               className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-brand-green/10 rounded-full blur-3xl animate-float"
               style={{ animationDelay: "3s" }}
            />
            <div
               className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl"
               style={{ animationDelay: "1.5s" }}
            />
         </div>

         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
               {/* Text and Actions */}
               <div className="lg:col-span-7 text-center lg:text-left">
                  {/* Badge */}
                  <div
                     ref={badgeRef}
                     className="inline-flex items-center gap-2 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-lg px-4 py-1.5 mb-8">
                     <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
                     <span className="text-white/95 text-xs font-semibold tracking-wide">
                        Registro por WhatsApp
                     </span>
                  </div>

                  {/* Headline */}
                  <h1
                     ref={headlineRef}
                     className="font-heading font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-white mb-6 leading-[1.1] tracking-tight text-wrap-balance">
                     Convertí hábitos saludables
                     <br />
                     <span className="text-brand-orange">en progreso real.</span>
                  </h1>

                  {/* Subheadline */}
                  <p
                     ref={subheadRef}
                     className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl lg:mx-0 mx-auto mb-10 leading-relaxed font-normal">
                     Moveat es tu compañero inteligente de nutrición y fitness.
                     Registrá comidas, entrenamientos y hábitos con IA conversacional
                     por WhatsApp. Visualizá tu progreso en un dashboard interactivo
                     y alcanzá tus metas con gamificación real.
                  </p>

                  {/* CTA Buttons */}
                  <div
                     ref={ctaRef}
                     className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4">
                      <a
                         href="https://dashboard.mov-eat.app/onboarding"
                         className="btn-primary w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 active:scale-[0.98]">
                         <Sparkles className="w-5 h-5" />
                         Comenzar gratis por WhatsApp
                      </a>
                     <a
                        href="#how-it-works"
                        onClick={(e) => {
                           e.preventDefault()
                           document
                              .querySelector("#how-it-works")
                              ?.scrollIntoView({ behavior: "smooth" })
                        }}
                        className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold border border-white/20 text-white hover:bg-white/[0.06] active:scale-[0.98] transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                        Ver cómo funciona
                     </a>
                  </div>
               </div>

               {/* Product Render */}
               <div className="lg:col-span-5 flex justify-center items-center w-full">
                  <video
                     ref={videoRef}
                     src="/demo.webm"
                     autoPlay
                     muted
                     loop
                     playsInline
                     className="h-[28rem] sm:h-[32rem] w-auto object-contain"
                  />
               </div>
            </div>
         </div>

         {/* Scroll Indicator */}
         <button
            onClick={scrollToProblem}
            className="scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 hover:text-white transition-colors">
            <ArrowDown className="w-5 h-5" />
         </button>
      </section>
   )
}

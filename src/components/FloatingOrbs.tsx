import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const orbs = [
   { top: "5%", left: "5%", size: 320, color: "bg-brand-orange/15", delay: 0 },
   { top: "18%", right: "10%", size: 384, color: "bg-brand-orange/15", delay: 0.5 },
   { top: "28%", left: "20%", size: 500, color: "bg-brand-orange/10", delay: 1.2 },
   {
      top: "38%",
      right: "5%",
      size: 600,
      color: "bg-brand-green/[0.08]",
      delay: 0.8,
   },
   { top: "48%", left: "8%", size: 320, color: "bg-brand-orange/15", delay: 1.5 },
   { top: "58%", right: "15%", size: 450, color: "bg-brand-orange/12", delay: 0.3 },
   { top: "68%", left: "62%", size: 384, color: "bg-brand-orange/15", delay: 2 },
   { top: "78%", right: "8%", size: 500, color: "bg-brand-green/[0.07]", delay: 1 },
   { top: "88%", left: "25%", size: 320, color: "bg-brand-orange/15", delay: 1.8 },
   { top: "77%", right: "72%", size: 384, color: "bg-brand-orange/15", delay: 0.6 },
]

export default function FloatingOrbs() {
   const containerRef = useRef<HTMLDivElement>(null)

   useGSAP(
      () => {
         const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".floating-orb").forEach((orb) => {
                const radius = gsap.utils.random(40, 80)
                const duration = gsap.utils.random(10, 18)
                const delay = parseFloat(orb.dataset.delay || "0")

                // Circular movement - X axis
                gsap.to(orb, {
                   x: radius,
                   duration: duration,
                   ease: "sine.inOut",
                   repeat: -1,
                   yoyo: true,
                   delay: delay,
                })

                // Circular movement - Y axis (quarter phase offset for circular motion)
                gsap.to(orb, {
                   y: radius,
                   duration: duration,
                   ease: "sine.inOut",
                   repeat: -1,
                   yoyo: true,
                   delay: delay + duration / 4,
                })

                // Subtle rotation
                gsap.to(orb, {
                   rotation: gsap.utils.random(-8, 8),
                   duration: duration * 1.5,
                   ease: "sine.inOut",
                   repeat: -1,
                   yoyo: true,
                   delay: delay,
                })

                // Opacity breathing: 50% to 100%
                gsap.to(orb, {
                   opacity: 1,
                   duration: duration * 0.6,
                   ease: "sine.inOut",
                   repeat: -1,
                   yoyo: true,
                   delay: delay + 0.5,
                })
            })
         }, containerRef)

         return () => ctx.revert()
      },
      { scope: containerRef },
   )

   return (
      <div
         ref={containerRef}
         className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
         {orbs.map((orb, i) => (
            <div
               key={i}
               className={`floating-orb absolute rounded-full blur-3xl ${orb.color}`}
               data-delay={orb.delay}
                style={{
                   top: orb.top,
                   left: orb.left,
                   right: orb.right,
                   width: orb.size,
                   height: orb.size,
                   opacity: 0.5,
                }}
            />
         ))}
      </div>
   )
}

'use client'

import { useEffect, useRef } from 'react'
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap'

const stats = [
  { value: 80, suffix: 'M+', label: 'Monthly Listeners', sub: 'Across all platforms' },
  { value: 6, suffix: '', label: 'Grammy Nominations', sub: 'Including Best Global Music Album' },
  { value: 100, suffix: '+', label: 'Number One Hits', sub: 'Across Africa and globally' },
  { value: 700, suffix: 'M+', label: 'YouTube Views', sub: 'Joro video alone: 300M' },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
  // Register plugins only once (safe & idempotent)
  registerGSAP();

  const ctx = gsap.context(() => {
    // === COUNTER ANIMATION (each stat gets its own safe proxy) ===
    numbersRef.current.forEach((el, i) => {
      if (!el || !sectionRef.current) return;

      const targetValue = stats[i].value;
      const proxy = { val: 0 };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            proxy,
            { val: 0 },
            {
              val: targetValue,
              duration: 2.8,
              ease: 'power3.out',
              onUpdate: () => {
                const displayVal = Math.floor(proxy.val);
                el.textContent = displayVal.toString();
              },
            }
          );
        },
      });
    });

    // === SECTION FADE-IN (kept exactly as you liked it) ===
    gsap.fromTo(
      sectionRef.current?.querySelectorAll('.stat-card') ?? [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, sectionRef); // ← scopes ALL animations to THIS section only

  // Cleanup – ONLY kills triggers created by THIS component
  return () => ctx.revert();
}, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 max-w-[1600px] mx-auto">
      <div className="text-center mb-16">
        <span className="section-label">By The Numbers</span>
        <h2 className="font-display text-4xl md:text-6xl font-light italic text-[var(--fg)] mt-4">
          A Career Defined By Records
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-card glass rounded-sm p-8 text-center hover-lift border border-[var(--border)] hover:border-gold/30 transition-colors duration-500"
          >
            <div className="flex items-end justify-center gap-0 mb-3">
              <span
                ref={(el) => {
                  numbersRef.current[i] = el
                }}
                className="font-mono-display text-6xl md:text-7xl text-gold leading-none"
              >
                {stat.value}
              </span>
              <span className="font-mono-display text-3xl md:text-4xl text-amber leading-none mb-1">
                {stat.suffix}
              </span>
            </div>
            <p className="font-display text-lg font-semibold text-[var(--fg)] mb-1">{stat.label}</p>
            <p className="text-xs text-[var(--fg-muted)] tracking-wide">{stat.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
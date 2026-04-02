'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const items = [
  'Grammy Nominated',
  'BET Award Winner',
  '3× MOBO Awards',
  '80M+ Monthly Listeners',
  'Billboard Hot 100',
  'Made in Lagos',
  'Starboy',
  'Born in Surulere',
  'Essence',
  'Rolling Stone Cover',
  'Coachella Headliner',
  'O2 Arena Sold Out',
];

export default function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Register GSAP (in case it's not already registered globally)
    if (!gsap.registerPlugin) {
      // You can import ScrollTrigger if needed later, but not required here
    }

    // Duplicate items once → creates perfect seamless infinite loop
    const duplicated = [...items, ...items];

    // GSAP infinite marquee (right-to-left, elegant speed)
    const marquee = gsap.to(track, {
      xPercent: -50,           // Moves exactly half (because we duplicated)
      duration: 35,            // Adjust for desired speed (higher = slower)
      ease: 'none',            // Linear = perfectly smooth infinite scroll
      repeat: -1,              // True infinite
    });

    // === Premium hover pause (feels very high-end) ===
    const pauseOnHover = () => marquee.pause();
    const resumeOnLeave = () => marquee.play();

    track.addEventListener('mouseenter', pauseOnHover);
    track.addEventListener('mouseleave', resumeOnLeave);

    // Cleanup
    return () => {
      marquee.kill();
      track.removeEventListener('mouseenter', pauseOnHover);
      track.removeEventListener('mouseleave', resumeOnLeave);
    };
  }, []);

  return (
    <div className="py-6 bg-gold/5 border-y border-gold/20 overflow-hidden">
      <div className="marquee-wrapper relative">
        {/* The scrolling track */}
        <div
          ref={trackRef}
          className="flex whitespace-nowrap will-change-transform"
        >
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-8 md:px-12"
            >
              <span className="font-mono-display text-base md:text-lg tracking-[3px] text-[var(--fg-muted)] uppercase whitespace-nowrap">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold/60 inline-block flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
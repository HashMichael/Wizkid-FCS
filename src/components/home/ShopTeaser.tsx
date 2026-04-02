'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap'
import MagneticButton from '@/components/ui/MagneticButton'

const featuredProducts = [
  {
    name: 'Wizkid Nike Starboy Black shirt',
    price: '$145',
    badge: 'Limited',
    image: '/merch1.jpg',
  },
  {
    name: 'Wizkid Starboy Hoodie',
    price: '$85',
    badge: null,
    image: '/merch2.webp',
  },
  {
    name: 'Made in Lagos round neck',
    price: '$280',
    badge: 'Tour Exclusive',
    image: '/merch3.jpg',
  },
]

export default function ShopTeaser() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    registerGSAP()
    gsap.fromTo(
      sectionRef.current?.querySelectorAll('.product-card') ?? [],
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    )
    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="section-label">Starboy Merch</span>
          <h2 className="font-display text-4xl md:text-6xl font-light italic text-[var(--fg)] mt-4">
            Wear The Culture
          </h2>
        </div>
        <MagneticButton href="/shop" variant="outline">
          View All <ArrowRight size={14} />
        </MagneticButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {featuredProducts.map((product, i) => (
          <Link
            key={i}
            href="/shop"
            className="product-card group relative overflow-hidden rounded-sm cursor-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="badge-limited">{product.badge}</span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                <div className="flex items-center gap-2 text-ivory text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  Shop Now <ArrowRight size={12} />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-[var(--fg)] font-medium text-sm">{product.name}</h3>
              <p className="text-gold text-sm mt-1">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ShoppingBag, X, Plus, Minus, ArrowRight } from 'lucide-react'
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap'
import { products, featuredDrop, type Product } from '@/lib/data/shop'
import MagneticButton from '@/components/ui/MagneticButton'

interface CartItem { product: Product; qty: number; size?: string }

function Countdown({ target }: { target: Date }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const update = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) })
    }
    update(); const id = setInterval(update, 1000); return () => clearInterval(id)
  }, [target])
  return (
    <div className="flex gap-4">
      {[{ v: t.d, l: 'D' }, { v: t.h, l: 'H' }, { v: t.m, l: 'M' }, { v: t.s, l: 'S' }].map(({ v, l }) => (
        <div key={l} className="text-center">
          <div className="font-mono-display text-3xl md:text-5xl text-gold">{String(v).padStart(2, '0')}</div>
          <div className="text-xs tracking-widest uppercase text-[var(--fg-muted)]">{l}</div>
        </div>
      ))}
    </div>
  )
}

export default function ShopPageClient() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [filterCat, setFilterCat] = useState<string>('all')
  const [hoveredImg, setHoveredImg] = useState<string | null>(null)
  const cartDrawerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const categories = ['all', 'apparel', 'accessories', 'music', 'collectibles']
  const filtered = filterCat === 'all' ? products : products.filter(p => p.category === filterCat)

  useEffect(() => {
    registerGSAP()
    gsap.fromTo('.product-card', { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.products-grid', start: 'top 80%', once: true } })
    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  useEffect(() => {
    if (!cartDrawerRef.current) return
    registerGSAP()
    gsap.to(cartDrawerRef.current, {
      x: cartOpen ? '0%' : '100%',
      duration: 0.6,
      ease: 'expo.inOut',
    })
    document.body.style.overflow = cartOpen ? 'hidden' : ''
  }, [cartOpen])

  useEffect(() => {
    if (!modalRef.current) return
    registerGSAP()
    if (selectedProduct) {
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'expo.out' })
    }
  }, [selectedProduct])

  const addToCart = (product: Product, size?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size)
      if (existing) return prev.map(i => i.product.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { product, qty: 1, size }]
    })
    setCartOpen(true)
    setSelectedProduct(null)
  }

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.product.price * i.qty, 0)

  useEffect(() => {
    gsap.fromTo('.product-card', { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: 'expo.out' })
  }, [filterCat])

  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="relative py-28 text-center overflow-hidden grain"
        style={{ background: 'linear-gradient(135deg, #0a0500 0%, #150a00 100%)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(255,107,0,0.2) 0%, transparent 50%)` }} />
        <div className="relative z-10">
          <span className="section-label mb-6 block">Official Store</span>
          <h1 className="font-mono-display text-[clamp(3rem,12vw,10rem)] text-ivory tracking-tight leading-none mb-6">
            STARBOY<br />MERCH
          </h1>
          <p className="text-[var(--fg-muted)] text-base max-w-md mx-auto">
            Exclusive apparel, accessories, and collectibles. Limited runs. Ship worldwide.
          </p>
        </div>
      </div>

      {/* Featured Drop */}
      <div className="py-16 px-6 lg:px-12 max-w-[1600px] mx-auto">
        <div className="relative rounded-sm overflow-hidden border border-gold/30 gold-glow">
          <div className="absolute inset-0">
            <Image src={featuredDrop.image} alt={featuredDrop.name} fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 60%, rgba(8,8,8,0.2) 100%)' }} />
          </div>
          <div className="relative z-10 p-10 md:p-16 max-w-lg">
            <span className="badge-limited mb-6 inline-block">{featuredDrop.badge}</span>
            <h2 className="font-display text-3xl md:text-5xl italic font-light text-ivory mb-4">
              {featuredDrop.name}
            </h2>
            <p className="text-[var(--fg-muted)] text-sm mb-8 leading-relaxed">{featuredDrop.description}</p>
            <div className="mb-8">
              <p className="section-label mb-3">Drop Countdown</p>
              <Countdown target={featuredDrop.dropDate} />
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-3xl italic text-gold">${featuredDrop.price}</span>
              <MagneticButton variant="primary">Notify Me</MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[60px] z-40 border-b border-[var(--border)] glass">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex gap-0">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilterCat(cat)}
                className={`px-5 py-4 text-xs tracking-widest uppercase transition-colors duration-300
                  ${filterCat === cat ? 'text-gold border-b border-gold' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'}`}>
                {cat}
              </button>
            ))}
          </div>
          {/* Cart icon */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 text-[var(--fg)] hover:text-gold transition-colors duration-300 relative py-4"
          >
            <ShoppingBag size={18} />
            <span className="text-xs">{totalItems > 0 ? `(${totalItems})` : ''}</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-gold text-obsidian text-[10px] rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(product => (
            <div key={product.id} className="product-card group cursor-none" onClick={() => { setSelectedProduct(product); setSelectedSize('') }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-3">
                <Image
                  src={hoveredImg === product.id && product.image2 ? product.image2 : product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500"
                  onMouseEnter={() => setHoveredImg(product.id)}
                  onMouseLeave={() => setHoveredImg(null)}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                  <span className="text-ivory text-xs tracking-widest uppercase border border-ivory/50 px-4 py-2">Quick View</span>
                </div>
                {product.badge && (
                  <div className="absolute top-3 left-3"><span className="badge-limited">{product.badge}</span></div>
                )}
                {product.isLimited && !product.badge && (
                  <div className="absolute top-3 right-3">
                    <span className="relative flex w-2 h-2">
                      <span className="ping-gold absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-[var(--fg)] text-sm font-medium mb-1 group-hover:text-gold transition-colors duration-300">{product.name}</h3>
              <p className="text-gold text-sm">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      <div
        ref={cartDrawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md z-[90] glass border-l border-[var(--border)] flex flex-col translate-x-full"
        style={{ background: 'var(--bg)' }}
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <h2 className="font-mono-display text-2xl text-[var(--fg)] tracking-wide">CART ({totalItems})</h2>
          <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-[var(--fg-muted)] text-center py-20 font-display italic text-xl">Your cart is empty.</p>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-4 glass rounded-sm border border-[var(--border)] p-4">
                <div className="relative w-16 h-20 flex-shrink-0 rounded-sm overflow-hidden">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[var(--fg)] text-sm font-medium mb-1">{item.product.name}</p>
                  {item.size && <p className="text-[var(--fg-muted)] text-xs mb-2">Size: {item.size}</p>}
                  <p className="text-gold text-sm">${item.product.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => setCart(c => c.map((ci, j) => j === i ? { ...ci, qty: Math.max(1, ci.qty - 1) } : ci))}
                      className="w-6 h-6 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-gold text-xs">
                      <Minus size={10} />
                    </button>
                    <span className="text-xs text-[var(--fg)]">{item.qty}</span>
                    <button onClick={() => setCart(c => c.map((ci, j) => j === i ? { ...ci, qty: ci.qty + 1 } : ci))}
                      className="w-6 h-6 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-gold text-xs">
                      <Plus size={10} />
                    </button>
                    <button onClick={() => setCart(c => c.filter((_, j) => j !== i))}
                      className="ml-auto text-[var(--fg-muted)] hover:text-amber text-xs">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-[var(--border)]">
            <div className="flex justify-between mb-6">
              <span className="text-[var(--fg-muted)] text-sm">Subtotal</span>
              <span className="text-[var(--fg)] font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-gold text-obsidian text-xs tracking-widest uppercase font-bold hover:bg-amber transition-colors duration-300 flex items-center justify-center gap-2">
              Checkout <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-6"
          style={{ background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(12px)' }}
          onClick={() => setSelectedProduct(null)}>
          <div ref={modalRef} className="glass rounded-sm border border-[var(--border)] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-80 aspect-square flex-shrink-0">
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
                {selectedProduct.badge && <div className="absolute top-4 left-4"><span className="badge-limited">{selectedProduct.badge}</span></div>}
              </div>
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <button onClick={() => setSelectedProduct(null)} className="float-right w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-gold mb-4">
                    <X size={14} />
                  </button>
                  <p className="section-label mb-2">{selectedProduct.category}</p>
                  <h2 className="font-display text-3xl italic font-light text-[var(--fg)] mb-2">{selectedProduct.name}</h2>
                  <p className="text-gold font-display text-2xl italic mb-6">${selectedProduct.price}</p>
                  <p className="text-[var(--fg-muted)] text-sm leading-relaxed mb-8">{selectedProduct.description}</p>

                  {selectedProduct.sizes && (
                    <div className="mb-8">
                      <p className="text-xs tracking-widest uppercase text-[var(--fg-muted)] mb-3">Size</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map(s => (
                          <button key={s} onClick={() => setSelectedSize(s)}
                            className={`w-12 h-10 text-xs border transition-all duration-300
                              ${selectedSize === s ? 'border-gold text-gold bg-gold/10' : 'border-[var(--border)] text-[var(--fg-muted)] hover:border-gold/50'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => addToCart(selectedProduct, selectedSize)}
                  disabled={!!selectedProduct.sizes && !selectedSize}
                  className="w-full py-4 bg-gold text-obsidian text-xs tracking-widest uppercase font-bold hover:bg-amber transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  {selectedProduct.sizes && !selectedSize ? 'Select a Size' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart overlay backdrop */}
      {cartOpen && (
        <div className="fixed inset-0 z-[85] bg-black/50" onClick={() => setCartOpen(false)} />
      )}
    </div>
  )
}

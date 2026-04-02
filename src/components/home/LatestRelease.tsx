'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ExternalLink, Pause } from 'lucide-react';
import { registerGSAP, gsap } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton';

const tracks = [
  { title: 'Trouble Mind', duration: '3:24', active: true },
  { title: 'Karamo', duration: '3:10', active: false },
  { title: 'Kese(Dance)', duration: '2:58', active: false },
  { title: 'Bad Girl(ft. Asake)', duration: '3:33', active: false },
  { title: 'Time', duration: '3:45', active: false },
];

export default function LatestRelease() {
  // ====================== REFS & STATE ======================
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Music player
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ====================== GSAP ANIMATIONS ======================
  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      if (barRef.current) {
        gsap.fromTo(
          barRef.current,
          { scaleX: 0 },
          {
            scaleX: 0.4,
            duration: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ====================== MUSIC PLAYER ======================
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error('Playback failed:', err));
    }
  };

  const handleEnded = () => setIsPlaying(false);

  // Sync audio state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // ====================== JSX ======================
  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {/* Album Art + Player */}
        <div ref={imgRef} className="w-full lg:w-[420px] xl:w-[500px] flex-shrink-0">
          <div className="relative aspect-square rounded-3xl overflow-hidden group gold-glow cursor-pointer">
            <Image
              src="/MORAYO.png"
              alt="Morayo"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Play / Pause Button */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <div className="play-btn flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-gold/90 hover:border-gold transition-all duration-300">
                {isPlaying ? (
                  <Pause size={32} className="text-white" />
                ) : (
                  <Play size={32} className="text-gold ml-1" />
                )}
              </div>
            </button>

            {/* Hidden Audio */}
            <audio
              ref={audioRef}
              src="/Wizkid-Troubled-Mind-(JustNaija.com).mp3"
              onEnded={handleEnded}
            />

            {/* Playing indicator */}
            {isPlaying && (
              <div className="absolute top-6 right-6 flex items-center gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400 delay-150" />
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400 delay-300" />
              </div>
            )}

            {/* Album badge */}
            <div className="absolute bottom-5 left-5">
              <span className="badge-limited">Latest Album</span>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div ref={contentRef} className="flex-1">
          <span className="section-label">Now Playing</span>
          <h2 className="font-display text-5xl md:text-7xl font-light italic text-[var(--fg)] mt-3 mb-2">
            Morayo
          </h2>
          <p className="text-[var(--fg-muted)] text-sm mb-8">
            2024 · Starboy / RCA Music · 16 tracks
          </p>

          {/* Progress bar (scroll animation) */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-[var(--fg-muted)] mb-2">
              <span>1:24</span>
              <span>3:24</span>
            </div>
            <div className="h-px bg-[var(--border)] relative">
              <div
                ref={barRef}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold to-amber origin-left"
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold border-2 border-[var(--bg)]"
                style={{ left: '40%' }}
              />
            </div>
          </div>

          {/* Tracklist */}
          <div className="space-y-1 mb-8">
            {tracks.map((track, i) => (
              <div
                key={track.title}
                className={`flex items-center justify-between py-3 px-4 rounded-sm cursor-pointer transition-all duration-300 group
                  ${track.active
                    ? 'bg-gold/10 border border-gold/20'
                    : 'hover:bg-[var(--bg-2)] border border-transparent'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs w-5 text-center ${
                      track.active ? 'text-gold' : 'text-[var(--fg-muted)]'
                    }`}
                  >
                    {track.active ? (
                      <span className="flex gap-0.5 items-end h-4">
                        {[1, 2, 3].map((b) => (
                          <span
                            key={b}
                            className="w-0.5 bg-gold waveform-bar rounded-full"
                            style={{ height: '100%', animationDelay: `${b * 0.15}s` }}
                          />
                        ))}
                      </span>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span
                    className={`text-sm ${
                      track.active
                        ? 'text-[var(--fg)]'
                        : 'text-[var(--fg-muted)] group-hover:text-[var(--fg)]'
                    } transition-colors`}
                  >
                    {track.title}
                  </span>
                </div>
                <span className="text-xs text-[var(--fg-muted)]">{track.duration}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <MagneticButton href="/music" variant="primary">
              Full Album
            </MagneticButton>
            <MagneticButton href="https://open.spotify.com" variant="outline">
              <ExternalLink size={14} />
              Stream on Spotify
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
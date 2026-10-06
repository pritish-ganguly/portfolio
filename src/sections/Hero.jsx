import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';

const greetings = [
  { text: 'Hello', lang: 'English' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'নমস্কার', lang: 'Bengali' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'مرحباً', lang: 'Arabic' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: 'Guten Tag', lang: 'German' },
  { text: '안녕하세요', lang: 'Korean' },
  { text: 'നമസ്കാരം', lang: 'Malayalam' },
  { text: 'ನಮಸ್ಕಾರ', lang: 'Kannada' },
  { text: 'வணக்கம்', lang: 'Tamil' },
  { text: 'నమస్కారం', lang: 'Telugu' },
  { text: 'สวัสดี', lang: 'Thai' }
];

export const Hero = ({ isLoaded }) => {
  const containerRef = useRef(null);
  const visualRef = useRef(null);
  const greetingRef = useRef(null);
  const labelRef = useRef(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Entrance animation
  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo('.hero-reveal', 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
        );
        gsap.fromTo(visualRef.current, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', delay: 0.4 }
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo('.hero-reveal', 
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
        );
        gsap.fromTo(visualRef.current, 
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.3 }
        );
      });
    }, containerRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [isLoaded]);

  // Greeting loop animation
  useEffect(() => {
    if (!isLoaded) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Keep static first greeting

    let ctx = gsap.context(() => {
      // Create a repeating timeline that controls the state progression
      const tl = gsap.timeline({ repeat: -1 });
      
      // For each greeting, we wait 2.5s, animate out, update state, animate in.
      // But since React state changes re-render, it's smoother to do DOM manipulation directly for the loop, 
      // OR use a timer. A simple setInterval + GSAP is cleanest to avoid complex React hydration issues.
    });

    let index = 0;
    let isActive = true;
    
    const cycleGreeting = () => {
      if (!isActive) return;
      
      const nextIndex = (index + 1) % greetings.length;
      
      const tl = gsap.timeline({
        onComplete: () => {
          if (!isActive) return;
          index = nextIndex;
          setCurrentIndex(nextIndex);
          
          gsap.fromTo([greetingRef.current, labelRef.current], 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );
        }
      });
      
      tl.to([greetingRef.current, labelRef.current], {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in"
      });
    };
    
    const intervalId = setInterval(cycleGreeting, 3000);
    
    return () => {
      isActive = false;
      clearInterval(intervalId);
      ctx.revert();
    };
  }, [isLoaded]);

  return (
    <section id="about" ref={containerRef} style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1, opacity: isLoaded ? 1 : 0 }}>
        <div className="hero-grid">
          
          {/* Text Content */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="hero-reveal" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent)' }}></div>
              <span className="metadata" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>INDEPENDENT DIGITAL PARTNER</span>
            </div>
            
            <h1 className="hero-reveal" style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', 
              fontWeight: 800, 
              lineHeight: 1.05, 
              letterSpacing: '-0.04em',
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
              maxWidth: '18ch'
            }}>
              Good ideas deserve better digital experiences.
            </h1>
            
            <p className="body-text hero-reveal" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '1.5rem', maxWidth: '42ch', lineHeight: 1.6 }}>
              Hi, I'm Pritish Ganguly, an independent digital partner based in Kolkata, India. I help startups, businesses and ambitious individuals turn ideas into polished digital experiences, intelligent software and reliable technical solutions.
            </p>

            <p className="body-text hero-reveal" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '48ch', lineHeight: 1.6 }}>
              By combining thoughtful design with computer science and engineering, I build solutions that look exceptional, solve real problems and are designed to grow with your goals.
            </p>
            
            <div className="hero-reveal" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="#contact" className="btn-primary" style={{ padding: '1rem 2rem', borderRadius: '99px' }}>
                START A PROJECT <ArrowRight size={18} />
              </a>
              <a href="#work" className="nav-link-hover" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                EXPLORE MY WORK <ArrowDown size={16} />
              </a>
            </div>
          </div>
          
          {/* Multilingual Greeting Visual */}
          <div className="hero-visual-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div ref={visualRef} style={{ 
              width: '100%', 
              height: '400px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative'
            }}>
              
              {/* Decorative Subtle Frame */}
              <div style={{ position: 'absolute', inset: '10%', border: '1px solid var(--border-color)', borderRadius: '50%', opacity: 0.3, pointerEvents: 'none' }}></div>
              <div style={{ position: 'absolute', inset: '20%', border: '1px dashed var(--border-color)', borderRadius: '50%', opacity: 0.2, pointerEvents: 'none' }}></div>
              
              <div aria-live="polite" aria-atomic="true" className="sr-only">
                {greetings[currentIndex].text} in {greetings[currentIndex].lang}
              </div>

              <div aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '160px', width: '100%' }}>
                <h2 
                  ref={greetingRef} 
                  style={{ 
                    fontSize: 'clamp(3rem, 6vw, 5rem)', 
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    textAlign: 'center',
                    willChange: 'transform, opacity',
                    whiteSpace: 'nowrap',
                    marginBottom: '1rem'
                  }}
                >
                  {greetings[currentIndex].text}
                </h2>
                <div 
                  ref={labelRef} 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '99px',
                    backgroundColor: 'var(--surface-main)',
                    willChange: 'transform, opacity'
                  }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></div>
                  <span className="metadata" style={{ margin: 0 }}>{greetings[currentIndex].lang}</span>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
      
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

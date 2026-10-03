import React, { useRef, useEffect } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';

export const Hero = ({ isLoaded }) => {
  const containerRef = useRef(null);
  const visualRef = useRef(null);
  const animationContext = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mm = gsap.matchMedia();

    animationContext.current = gsap.context(() => {
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo('.hero-reveal', 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
        );
        gsap.fromTo(visualRef.current, 
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.4 }
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo('.hero-reveal', 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
        );
        gsap.fromTo(visualRef.current, 
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.3 }
        );
      });
    }, containerRef);

    if (!prefersReducedMotion && visualRef.current) {
      const nodes = visualRef.current.querySelectorAll('.tech-node');
      const lines = visualRef.current.querySelectorAll('.tech-line');
      
      const onMove = (e) => {
        const { left, top, width, height } = visualRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(nodes, {
          x: (i) => (i % 2 === 0 ? x * 40 : x * -30),
          y: (i) => (i % 3 === 0 ? y * 40 : y * -30),
          duration: 1.5,
          ease: 'power2.out'
        });
        
        gsap.to(lines, {
          x: x * 15,
          y: y * 15,
          duration: 2,
          ease: 'power2.out'
        });
      };
      
      window.addEventListener('mousemove', onMove);
      return () => {
        window.removeEventListener('mousemove', onMove);
        mm.revert();
        animationContext.current?.revert();
      };
    }
    
    return () => {
      mm.revert();
      animationContext.current?.revert();
    };
  }, [isLoaded]);

  return (
    <section id="about" ref={containerRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px' }}>
      
      {/* Subtle Background Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, zIndex: 0, pointerEvents: 'none' }}>
        <svg width="100%" height="100%">
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--text-primary)" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, opacity: isLoaded ? 1 : 0 }}>
        <div className="hero-grid">
          
          {/* Editorial Text Content */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="hero-reveal" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent)' }}></div>
              <span className="metadata" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>Hi, I'm Pritish.</span>
            </div>
            
            <h1 className="hero-reveal" style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.05, 
              letterSpacing: '-0.04em',
              marginBottom: '1.5rem',
              color: 'var(--text-primary)'
            }}>
              YOUR IDEA.<br/>
              BUILT INTO<br/>
              <span style={{ color: 'var(--text-secondary)' }}>SOMETHING REAL.</span>
            </h1>
            
            <p className="body-text hero-reveal" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '1.5rem', maxWidth: '42ch', lineHeight: 1.6 }}>
              I build websites, digital products and intelligent systems that help people and businesses solve real problems.
            </p>

            <p className="body-text hero-reveal" style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '46ch', lineHeight: 1.6 }}>
              From high-performing websites and automation to AI-powered applications and technical infrastructure, I bring design, technology and problem-solving together. Have something you're trying to build, improve or figure out? Let's talk.
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
          
          {/* Asymmetrical Custom SVG Visual */}
          <div className="hero-visual-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div ref={visualRef} style={{ width: '100%', maxWidth: '700px', aspectRatio: '1/1', position: 'relative' }}>
              <svg viewBox="0 0 600 600" width="100%" height="100%" style={{ overflow: 'visible' }}>
                {/* Precise technical construction lines */}
                <g className="tech-line" stroke="var(--border-color)" strokeWidth="1" fill="none">
                  {/* Grid lines */}
                  <line x1="100" y1="0" x2="100" y2="600" opacity="0.3" />
                  <line x1="300" y1="0" x2="300" y2="600" opacity="0.3" />
                  <line x1="500" y1="0" x2="500" y2="600" opacity="0.3" />
                  <line x1="0" y1="150" x2="600" y2="150" opacity="0.3" />
                  <line x1="0" y1="300" x2="600" y2="300" opacity="0.3" />
                  <line x1="0" y1="450" x2="600" y2="450" opacity="0.3" />
                  
                  {/* Central architectural circles */}
                  <circle cx="300" cy="300" r="200" strokeWidth="1" opacity="0.5" />
                  <circle cx="300" cy="300" r="140" strokeDasharray="4 8" opacity="0.6" />
                  <circle cx="300" cy="300" r="80" strokeWidth="1" />
                </g>
                
                {/* Interactive solid nodes */}
                <g>
                  {/* Central Core */}
                  <rect className="tech-node" x="270" y="270" width="60" height="60" rx="12" fill="var(--surface-elevated)" stroke="var(--accent)" strokeWidth="2" />
                  <circle className="tech-node" cx="300" cy="300" r="6" fill="var(--accent)" />
                  
                  {/* Orbiting elements */}
                  <path className="tech-node" d="M100 300 L120 270 L140 300 Z" fill="var(--text-primary)" />
                  <rect className="tech-node" x="485" y="285" width="30" height="30" rx="4" fill="var(--text-secondary)" opacity="0.8" />
                  <circle className="tech-node" cx="300" cy="100" r="16" fill="var(--accent)" opacity="0.9" />
                  <circle className="tech-node" cx="300" cy="500" r="10" fill="var(--bg-main)" stroke="var(--text-primary)" strokeWidth="3" />
                  
                  <rect className="tech-node" x="160" y="160" width="40" height="40" rx="8" fill="var(--surface-main)" stroke="var(--border-color)" />
                  <rect className="tech-node" x="400" y="400" width="40" height="40" rx="20" fill="var(--surface-main)" stroke="var(--border-color)" />
                </g>
                
                {/* Connecting architectural lines */}
                <g stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.6">
                  <path className="tech-line" d="M 140 300 L 270 300" />
                  <path className="tech-line" d="M 485 300 L 330 300" />
                  <path className="tech-line" d="M 300 116 L 300 270" />
                  <path className="tech-line" d="M 300 490 L 300 330" />
                  
                  <path className="tech-line" d="M 180 180 L 270 270" strokeDasharray="3 3" />
                  <path className="tech-line" d="M 420 420 L 330 330" strokeDasharray="3 3" />
                </g>
              </svg>
            </div>
          </div>
          
        </div>
      </div>
      
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr;
            align-items: center;
          }
        }
        
        .hero-visual-container {
          opacity: 0.8;
          transition: opacity 0.5s ease;
        }
        
        .hero-visual-container:hover {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

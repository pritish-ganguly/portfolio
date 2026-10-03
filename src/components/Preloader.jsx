import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const percentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenPreloader === 'true' || prefersReducedMotion) {
      setIsVisible(false);
      onComplete();
      return;
    }

    document.body.style.overflow = 'hidden';
    const progressObj = { value: 0 };
    
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, { opacity: 1, duration: 0.1 });
      
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('hasSeenPreloader', 'true');
          document.body.style.overflow = '';
          setIsVisible(false);
          onComplete();
        }
      });

      // Initial progress to 40% to show activity
      tl.to(progressObj, {
        value: 40,
        duration: 0.5,
        ease: 'power1.out',
        onUpdate: updatePercent
      });

      // Simulate waiting for critical assets (e.g., fonts, first paint)
      // We push it to 80% over 1 second
      tl.to(progressObj, {
        value: 80,
        duration: 1.0,
        ease: 'power1.inOut',
        onUpdate: updatePercent
      });

      // Once loaded (or after a small delay), push to 100%
      tl.to(progressObj, {
        value: 100,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: updatePercent
      });

      tl.to({}, { duration: 0.3 }); // hold
      
      tl.to(containerRef.current, {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.inOut'
      });
      
      function updatePercent() {
        if (percentRef.current) {
          const val = Math.round(progressObj.value).toString().padStart(2, '0');
          percentRef.current.innerText = val + '%';
        }
      }
    }, containerRef);

    const failsafe = setTimeout(() => {
      document.body.style.overflow = '';
      setIsVisible(false);
      onComplete();
    }, 4000);

    return () => {
      ctx.revert();
      clearTimeout(failsafe);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-main)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        willChange: 'transform',
        opacity: 0
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--text-primary)' }}>
          PRITISH GANGULY
        </h1>
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span ref={percentRef} style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 300, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', lineHeight: 1 }}>
            00%
          </span>
        </div>
        
        <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--text-secondary)' }}>
          WEB. INTELLIGENCE. INFRASTRUCTURE.
        </p>
      </div>
    </div>
  );
};

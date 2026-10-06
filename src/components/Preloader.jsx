import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const sandTopRef = useRef(null);
  const sandBottomRef = useRef(null);
  const hourglassGroupRef = useRef(null);
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
    
    const ctx = gsap.context(() => {
      // Fade in preloader container instantly
      gsap.to(containerRef.current, { opacity: 1, duration: 0.1 });

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('hasSeenPreloader', 'true');
          document.body.style.overflow = '';
          setIsVisible(false);
          onComplete();
        }
      });

      // Hourglass animation sequence
      // 1. Drain the top sand
      tl.to(sandTopRef.current, {
        scaleY: 0,
        transformOrigin: "bottom center",
        duration: 1.5,
        ease: "power1.inOut"
      }, 0);

      // 2. Fill the bottom sand simultaneously
      tl.to(sandBottomRef.current, {
        scaleY: 1,
        transformOrigin: "bottom center",
        duration: 1.5,
        ease: "power1.inOut"
      }, 0);

      // 3. Optional flip or hold for elegance
      tl.to({}, { duration: 0.2 });

      // 4. Exit animation
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      });
      
    }, containerRef);

    // Hard failsafe
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
        willChange: 'opacity',
        opacity: 0
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        
        {/* SVG Hourglass */}
        <svg 
          ref={hourglassGroupRef}
          width="48" 
          height="64" 
          viewBox="0 0 48 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          {/* Glass outline */}
          <path 
            d="M 12 4 L 36 4 L 36 8 C 36 16 28 24 24 32 C 20 24 12 16 12 8 L 12 4 Z" 
            stroke="var(--text-primary)" 
            strokeWidth="2" 
            strokeLinejoin="round"
          />
          <path 
            d="M 12 60 L 36 60 L 36 56 C 36 48 28 40 24 32 C 20 40 12 48 12 56 L 12 60 Z" 
            stroke="var(--text-primary)" 
            strokeWidth="2" 
            strokeLinejoin="round"
          />
          {/* Caps */}
          <line x1="8" y1="4" x2="40" y2="4" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="60" x2="40" y2="60" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" />
          
          {/* Top Sand (Starts Full) */}
          <path 
            ref={sandTopRef}
            d="M 14 6 L 34 6 L 34 8 C 34 15 27 23 24 30 C 21 23 14 15 14 8 L 14 6 Z" 
            fill="var(--text-primary)" 
          />
          
          {/* Bottom Sand (Starts Empty) */}
          <path 
            ref={sandBottomRef}
            d="M 14 58 L 34 58 L 34 56 C 34 49 27 41 24 34 C 21 41 14 49 14 56 L 14 58 Z" 
            fill="var(--text-primary)" 
            style={{ transform: 'scaleY(0)', transformOrigin: 'bottom center' }}
          />
        </svg>

      </div>
    </div>
  );
};

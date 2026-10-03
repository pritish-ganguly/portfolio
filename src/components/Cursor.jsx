import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Cursor = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isFinePointer && !prefersReducedMotion) {
      setIsEnabled(true);
    }
  }, []);

  if (!isEnabled) return null;

  return <CursorEngine />;
};

const CursorEngine = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    // Use GSAP quickTo for highly performant following
    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    
    const xRing = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3.out" });

    // Initial position setup to prevent jumping from top-left
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      xDot(clientX);
      yDot(clientY);
      xRing(clientX);
      yRing(clientY);
    };

    const onMouseEnter = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"], .interactive');
      if (target) {
        gsap.to(ring, {
          scale: 1.5,
          opacity: 0.2,
          backgroundColor: 'var(--accent)',
          borderWidth: '0px',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: "auto"
        });
        gsap.to(dot, {
          scale: 0.5,
          duration: 0.2,
          overwrite: "auto"
        });
      }
    };

    const onMouseLeave = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"], .interactive');
      if (target) {
        gsap.to(ring, {
          scale: 1,
          opacity: 0.5,
          backgroundColor: 'transparent',
          borderWidth: '1px',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: "auto"
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.2,
          overwrite: "auto"
        });
      }
    };

    const onMouseOut = (e) => {
      if (e.relatedTarget === null) {
        gsap.to([dot, ring], { opacity: 0, duration: 0.2, overwrite: "auto" });
      }
    };
    
    const onMouseOver = () => {
      gsap.to(dot, { opacity: 1, duration: 0.2, overwrite: "auto" });
      gsap.to(ring, { opacity: 0.5, duration: 0.2, overwrite: "auto" });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseEnter, { passive: true });
    document.addEventListener('mouseout', onMouseLeave, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout', onMouseLeave);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference'
        }}
      />
      <div 
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '1px solid var(--text-primary)',
          opacity: 0.5,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'background-color 0.3s, border-width 0.3s'
        }}
      />
      <style>{`
        @media (pointer: fine) and (hover: hover) {
          @media (prefers-reduced-motion: no-preference) {
            body { cursor: none; }
            a, button, input, textarea, [role="button"] { cursor: none; }
          }
        }
      `}</style>
    </>
  );
};

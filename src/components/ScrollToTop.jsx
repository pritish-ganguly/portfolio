import React, { useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';

export const ScrollToTop = () => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const isVisible = useRef(false);

  useEffect(() => {
    // Setup scroll listener for performance
    const onScroll = () => {
      if (!containerRef.current || !circleRef.current) return;
      
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate progress (0 to 1)
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      
      // Update SVG stroke dashoffset directly (circumference is ~113.1)
      const circumference = 2 * Math.PI * 18;
      const offset = circumference - progress * circumference;
      circleRef.current.style.strokeDashoffset = offset;
      
      // Handle visibility
      if (scrollTop > 500 && !isVisible.current) {
        isVisible.current = true;
        gsap.to(containerRef.current, { 
          autoAlpha: 1, 
          y: 0, 
          duration: 0.4, 
          ease: 'power3.out' 
        });
      } else if (scrollTop <= 500 && isVisible.current) {
        isVisible.current = false;
        gsap.to(containerRef.current, { 
          autoAlpha: 0, 
          y: 20, 
          duration: 0.3, 
          ease: 'power2.in' 
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button
      ref={containerRef}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="scroll-to-top"
      style={{
        position: 'fixed',
        bottom: 'max(2rem, env(safe-area-inset-bottom))',
        right: 'max(2rem, env(safe-area-inset-right))',
        zIndex: 90,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--nav-bg-scrolled)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
        visibility: 'hidden',
        opacity: 0,
        transform: 'translateY(20px)'
      }}
    >
      {/* Background track circle */}
      <svg width="50" height="50" viewBox="0 0 50 50" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <circle 
          cx="25" 
          cy="25" 
          r="18" 
          fill="none" 
          stroke="var(--border-color)" 
          strokeWidth="2" 
        />
        {/* Progress circle */}
        <circle 
          ref={circleRef}
          cx="25" 
          cy="25" 
          r="18" 
          fill="none" 
          stroke="var(--accent)" 
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 18}
          strokeDashoffset={2 * Math.PI * 18}
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
      </svg>
      
      <ArrowUp size={20} color="var(--text-primary)" style={{ position: 'relative', zIndex: 1 }} className="scroll-arrow" />

      <style>{`
        .scroll-to-top:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }
        @media (hover: hover) {
          .scroll-to-top:hover .scroll-arrow {
            transform: translateY(-2px);
          }
          .scroll-arrow {
            transition: transform 0.2s ease;
          }
        }
        @media (max-width: 767px) {
          .scroll-to-top {
            bottom: max(1.5rem, env(safe-area-inset-bottom)) !important;
            right: max(1.5rem, env(safe-area-inset-right)) !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>
    </button>
  );
};

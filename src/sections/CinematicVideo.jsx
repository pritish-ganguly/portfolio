import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CinematicVideo = () => {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const videoWrapperRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Skip complex animation, rely on CSS fallback
    }

    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        // We pin the wrapper and scale the video up
        gsap.to(videoWrapperRef.current, {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=150%', // Scroll duration
            scrub: true,
            pin: pinWrapperRef.current,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
      }, containerRef);
      
      return () => ctx.revert();
    });
    
    mm.add("(max-width: 1023px)", () => {
      const ctx = gsap.context(() => {
        gsap.to(videoWrapperRef.current, {
          width: '100vw',
          height: '50vh', // Mobile doesn't necessarily need full vh
          borderRadius: '0px',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: true,
            pin: pinWrapperRef.current,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
      }, containerRef);
      
      return () => ctx.revert();
    });
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ position: 'relative', backgroundColor: 'var(--bg-main)' }}>
      {/* 
        This wrapper is what gets pinned. It holds the video centered.
        By pinning this inner div, the parent section acts as the scroll track 
        and reserves the necessary height (+150% from ScrollTrigger end).
      */}
      <div 
        ref={pinWrapperRef} 
        style={{ 
          width: '100%', 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <div 
          ref={videoWrapperRef} 
          className="video-cinematic-wrapper"
        >
          <video 
            src={`${import.meta.env.BASE_URL}media/hero-experience.mp4.mp4`}
            autoPlay 
            muted 
            loop 
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>
      
      <style>{`
        .video-cinematic-wrapper {
          width: 70vw;
          height: 60vh;
          max-width: 1200px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
          will-change: width, height, border-radius;
        }
        
        @media (max-width: 1023px) {
          .video-cinematic-wrapper {
            width: 85vw;
            height: 40vh;
            border-radius: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .video-cinematic-wrapper {
            width: 90vw;
            height: 60vh;
            max-width: 1000px;
            margin: 4rem auto;
            border-radius: 16px;
          }
        }
      `}</style>
    </section>
  );
};

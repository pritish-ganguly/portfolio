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
      return;
    }

    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        gsap.to(videoWrapperRef.current, {
          width: '100%',
          height: '100svh',
          borderRadius: '0px',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=150%',
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
      // For tablet and mobile, prioritize native scrolling.
      // Do not pin to avoid fighting touch scrolling.
      // Use a subtle scale effect that feels cinematic but flows naturally in the document.
      const ctx = gsap.context(() => {
        gsap.to(videoWrapperRef.current, {
          width: '100%',
          borderRadius: '0px',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
            pin: false // Removed pinning for touch devices
          }
        });
      }, containerRef);
      
      return () => ctx.revert();
    });
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ position: 'relative', backgroundColor: 'var(--bg-main)', overflow: 'hidden' }}>
      <div 
        ref={pinWrapperRef} 
        style={{ 
          width: '100%', 
          minHeight: '100svh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '2rem 0' // Provide spacing for the unpinned mobile version
        }}
        className="pin-wrapper"
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
          width: 70%;
          height: 70svh;
          max-width: 1400px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
          will-change: width, border-radius;
        }
        
        @media (max-width: 1023px) {
          .pin-wrapper {
            min-height: auto !important;
            padding: 4rem 0 !important;
          }
          .video-cinematic-wrapper {
            width: 85%;
            height: 50svh;
            border-radius: 16px;
          }
        }
        
        @media (max-width: 767px) {
          .video-cinematic-wrapper {
            width: 90%;
            height: 40svh;
            border-radius: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .video-cinematic-wrapper {
            width: 90%;
            height: 60svh;
            max-width: 1000px;
            margin: 0 auto;
            border-radius: 16px;
          }
        }
      `}</style>
    </section>
  );
};

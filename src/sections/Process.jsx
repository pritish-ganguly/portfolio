import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  "01 UNDERSTAND", "02 ANALYSE", "03 PLAN", 
  "04 BUILD", "05 TEST", "06 DELIVER"
];

export const Process = () => {
  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isDesktop, isMobile } = context.conditions;
        
        // Reset styles for recalculation
        gsap.set(progressRef.current, { clearProps: 'all' });
        gsap.set(nodesRef.current, { clearProps: 'all' });
        
        // Calculate dynamic dimensions
        const firstNode = nodesRef.current[0];
        const lastNode = nodesRef.current[5];
        if (!firstNode || !lastNode || !trackRef.current) return;
        
        const firstRect = firstNode.getBoundingClientRect();
        const lastRect = lastNode.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        if (isDesktop) {
          // Horizontal layout
          const trackLeft = firstRect.left - containerRect.left + (firstRect.width / 2);
          const trackRight = lastRect.left - containerRect.left + (lastRect.width / 2);
          const trackWidth = trackRight - trackLeft;
          
          gsap.set(trackRef.current, {
            left: trackLeft,
            top: 24, // Matches node circle center
            width: trackWidth,
            height: 2,
            bottom: 'auto'
          });
          
          gsap.set(progressRef.current, {
            width: '100%',
            height: '100%',
            scaleX: 0,
            transformOrigin: 'left center'
          });
          
        } else {
          // Vertical layout
          const trackTop = firstRect.top - containerRect.top + (firstRect.height / 2);
          const trackBottom = lastRect.top - containerRect.top + (lastRect.height / 2);
          const trackHeight = trackBottom - trackTop;
          
          // Left offset depends on mobile layout structure (the circle is 48px wide)
          // It's shifted by CSS. Let's place it exactly at the center of the first circle.
          const circleCenterLeft = firstNode.querySelector('.process-circle').getBoundingClientRect().left - containerRect.left + 24;
          
          gsap.set(trackRef.current, {
            left: circleCenterLeft,
            top: trackTop,
            height: trackHeight,
            width: 2,
            bottom: 'auto'
          });
          
          gsap.set(progressRef.current, {
            width: '100%',
            height: '100%',
            scaleY: 0,
            transformOrigin: 'top center'
          });
        }

        if (prefersReducedMotion) {
          gsap.set(progressRef.current, { scaleX: isDesktop ? 1 : undefined, scaleY: isMobile ? 1 : undefined });
          gsap.set(nodesRef.current, { opacity: 1 });
          gsap.set('.process-circle', { borderColor: 'var(--accent)', color: 'var(--accent)' });
          return;
        }

        // Setup ScrollTrigger for progress line
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom 75%",
            scrub: true
          }
        });

        tl.to(progressRef.current, {
          scaleX: isDesktop ? 1 : undefined,
          scaleY: isMobile ? 1 : undefined,
          ease: 'none'
        });

        // Setup individual node activation
        nodesRef.current.forEach((node, index) => {
          ScrollTrigger.create({
            trigger: node,
            start: "top center+=10%",
            end: "bottom top",
            onEnter: () => {
              gsap.to(node.querySelector('.process-circle'), {
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                backgroundColor: 'var(--surface-elevated)',
                duration: 0.3
              });
              gsap.to(node, { opacity: 1, duration: 0.3 });
            },
            onLeaveBack: () => {
              gsap.to(node.querySelector('.process-circle'), {
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-main)',
                duration: 0.3
              });
              gsap.to(node, { opacity: 0.5, duration: 0.3 });
            }
          });
          // Set initial inactive state
          gsap.set(node, { opacity: 0.5 });
        });

      });
    }, containerRef);
    
    // Recalculate on resize
    const onResize = () => ctx.revert(); // Force matchMedia to run again if needed, or simply ScrollTrigger.refresh
    window.addEventListener('resize', () => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      window.removeEventListener('resize', () => ScrollTrigger.refresh());
    };
  }, []);

  return (
    <section id="process" ref={containerRef} className="section-padding" style={{ backgroundColor: 'var(--bg-main)', position: 'relative' }}>
      <div className="container" style={{ position: 'relative' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <span className="eyebrow">18 / PROCESS</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem' }}>
            A SIMPLE PROCESS.<br/>A SERIOUS RESULT.
          </h2>
          <p className="body-text" style={{ marginInline: 'auto' }}>
            You do not need to arrive with a perfect technical brief.<br/>
            Start with the problem.<br/>
            I'll help work out the next step.
          </p>
        </div>
        
        <div className="process-visual" style={{ position: 'relative' }}>
          
          {/* Dynamic Geometry Track */}
          <div ref={trackRef} style={{ position: 'absolute', zIndex: 0 }}>
            {/* Dashed base line */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, var(--border-color) 50%, transparent 50%)', backgroundSize: '12px 2px', opacity: 0.5 }} className="track-base-desktop"></div>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to bottom, var(--border-color) 50%, transparent 50%)', backgroundSize: '2px 12px', opacity: 0.5 }} className="track-base-mobile"></div>
            
            {/* Active Progress line */}
            <div ref={progressRef} style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--accent)' }}></div>
          </div>
          
          <div className="process-grid">
            {stages.map((stage, i) => {
              const [num, title] = stage.split(' ');
              return (
                <div 
                  key={i} 
                  ref={el => nodesRef.current[i] = el}
                  className="process-node" 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}
                >
                  <div className="process-circle" style={{ 
                    width: '48px', height: '48px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--bg-main)',
                    border: '4px solid var(--surface-main)',
                    boxShadow: '0 0 0 2px var(--border-color)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '2rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    transition: 'box-shadow 0.3s ease'
                  }}>
                    {num}
                  </div>
                  <h3 className="heading-3" style={{ fontSize: '1.25rem', textAlign: 'center' }}>{title}</h3>
                </div>
              );
            })}
          </div>
          
        </div>
        
      </div>
      
      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1rem;
        }
        
        .track-base-mobile { display: none; }
        .track-base-desktop { display: block; }
        
        @media (max-width: 1023px) {
          .track-base-mobile { display: block; }
          .track-base-desktop { display: none; }
          
          .process-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
            position: relative;
            padding-left: 2rem;
          }
          
          .process-node {
            flex-direction: row !important;
            align-items: center !important;
            gap: 2rem;
          }
          
          .process-circle {
            margin-bottom: 0 !important;
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
};

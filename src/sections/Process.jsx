import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { num: '01', title: 'UNDERSTAND', desc: 'We start with your business goals, target audience, and the actual problem you are trying to solve.' },
  { num: '02', title: 'PLAN', desc: 'I architect the system, design the user experience, and choose the right technical stack for the job.' },
  { num: '03', title: 'BUILD', desc: 'I write clean, scalable code across frontend, backend, and infrastructure to bring the plan to life.' },
  { num: '04', title: 'REFINE', desc: 'Rigorous testing for performance, security, responsive behavior, and perfect animations.' },
  { num: '05', title: 'DELIVER', desc: 'Safe deployment, documentation, and handover of a digital product that actually works.' }
];

export const Process = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stInstance;
    let nodeTriggers = [];
    
    // We use a small timeout to ensure DOM layout is complete before measuring
    const initProcessLayout = () => {
      // Clear old triggers if recalculating
      if (stInstance) stInstance.kill();
      nodeTriggers.forEach(t => t.kill());
      nodeTriggers = [];
      
      const ctx = gsap.context(() => {
        if (!nodesRef.current[0] || !nodesRef.current[4] || !containerRef.current) return;
        
        const isDesktop = window.innerWidth >= 1024;
        const isMobile = !isDesktop;
        
        const firstNode = nodesRef.current[0];
        const lastNode = nodesRef.current[4];
        
        const visualRef = document.querySelector('.process-visual');
        const visualRect = visualRef.getBoundingClientRect();
        
        const firstRect = firstNode.querySelector('.process-circle').getBoundingClientRect();
        const lastRect = lastNode.querySelector('.process-circle').getBoundingClientRect();
        
        if (isDesktop) {
          // Horizontal layout
          const trackLeft = firstRect.left - visualRect.left + (firstRect.width / 2);
          const trackRight = lastRect.left - visualRect.left + (lastRect.width / 2);
          const trackWidth = trackRight - trackLeft;
          
          gsap.set(trackRef.current, {
            left: trackLeft,
            top: firstRect.top - visualRect.top + (firstRect.height / 2), 
            width: trackWidth,
            height: 2,
            bottom: 'auto'
          });
          
          gsap.set(progressRef.current, {
            width: '100%',
            height: '100%',
            scaleX: 0,
            scaleY: 1,
            transformOrigin: 'left center'
          });
          
        } else {
          // Vertical layout
          const trackTop = firstRect.top - visualRect.top + (firstRect.height / 2);
          const trackBottom = lastRect.top - visualRect.top + (lastRect.height / 2);
          const trackHeight = trackBottom - trackTop;
          
          const circleCenterLeft = firstRect.left - visualRect.left + (firstRect.width / 2);
          
          gsap.set(trackRef.current, {
            left: circleCenterLeft - 1, // center the 2px line
            top: trackTop,
            height: trackHeight,
            width: 2,
            bottom: 'auto'
          });
          
          gsap.set(progressRef.current, {
            width: '100%',
            height: '100%',
            scaleY: 0,
            scaleX: 1,
            transformOrigin: 'top center'
          });
        }

        if (prefersReducedMotion) {
          gsap.set(progressRef.current, { scaleX: 1, scaleY: 1 });
          gsap.set(nodesRef.current, { opacity: 1 });
          gsap.set('.process-circle', { borderColor: 'var(--accent)', color: 'var(--accent)' });
          return;
        }

        // Setup ScrollTrigger for progress line
        stInstance = ScrollTrigger.create({
          trigger: containerRef.current,
          start: isDesktop ? "top center" : "top 60%",
          end: isDesktop ? "bottom 75%" : "bottom 60%",
          animation: gsap.to(progressRef.current, {
            scaleX: isDesktop ? 1 : undefined,
            scaleY: isMobile ? 1 : undefined,
            ease: 'none'
          }),
          scrub: true
        });

        // Setup individual node activation
        nodesRef.current.forEach((node, index) => {
          const t = ScrollTrigger.create({
            trigger: node,
            start: isDesktop ? "top center+=10%" : "top 70%",
            end: isDesktop ? "bottom top" : "bottom 30%",
            onEnter: () => {
              gsap.to(node.querySelector('.process-circle'), {
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                backgroundColor: 'var(--surface-elevated)',
                scale: 1.1,
                duration: 0.3
              });
              gsap.to(node, { opacity: 1, duration: 0.3 });
            },
            onLeaveBack: () => {
              gsap.to(node.querySelector('.process-circle'), {
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-main)',
                scale: 1,
                duration: 0.3
              });
              gsap.to(node, { opacity: 0.4, duration: 0.3 });
            }
          });
          nodeTriggers.push(t);
          // Set initial inactive state
          gsap.set(node, { opacity: 0.4 });
        });

      }, containerRef);
    };

    // Use setTimeout to ensure fonts and layout are ready
    const timer = setTimeout(initProcessLayout, 100);
    
    // ResizeObserver is much more reliable than window.resize
    const resizeObserver = new ResizeObserver(() => {
      initProcessLayout();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (stInstance) stInstance.kill();
      nodeTriggers.forEach(t => t.kill());
      resizeObserver.disconnect();
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
                    marginBottom: '1.5rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    transition: 'box-shadow 0.3s ease'
                  }}>
                    {stage.num}
                  </div>
                  <h3 className="heading-3 process-title" style={{ fontSize: '1.25rem', textAlign: 'center', marginBottom: '0.5rem' }}>{stage.title}</h3>
                  <p className="body-text process-desc" style={{ textAlign: 'center', fontSize: '0.875rem', lineHeight: 1.5, maxWidth: '24ch' }}>
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
          
        </div>
        
      </div>
      
      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
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
          
          .process-title {
            text-align: left !important;
            margin-bottom: 0.25rem !important;
          }
          
          .process-desc {
            text-align: left !important;
            max-width: none !important;
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

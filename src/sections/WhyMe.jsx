import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statements = [
  "I START BY UNDERSTANDING THE PROBLEM.",
  "TECHNOLOGY SHOULD SERVE THE OBJECTIVE.",
  "I THINK ACROSS THE WHOLE SYSTEM.",
  "I BUILD FRONTEND, BACKEND AND INFRASTRUCTURE.",
  "I CARE ABOUT USABILITY.",
  "PRACTICAL SOLUTIONS OVER TECHNOLOGY FOR ITS OWN SAKE."
];

export const WhyMe = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray('.manifesto-panel');
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + containerRef.current.offsetWidth * (sections.length - 1)
          }
        });
      }, containerRef);
      return () => ctx.revert();
    });
    
    mm.add("(max-width: 1023px)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.manifesto-panel').forEach(panel => {
          gsap.from(panel.querySelector('.manifesto-text'), {
            y: 50,
            opacity: 0.3,
            scrollTrigger: {
              trigger: panel,
              start: "top center",
              end: "center center",
              scrub: true
            }
          });
        });
      }, containerRef);
      return () => ctx.revert();
    });
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-main)', overflow: 'hidden' }}>
      
      <div className="manifesto-container">
        <div style={{ position: 'absolute', top: '4rem', left: 'clamp(20px, 4vw, 64px)', zIndex: 10 }}>
          <span className="eyebrow" style={{ color: 'var(--bg-main)', opacity: 0.7 }}>02 / WHY ME</span>
        </div>
        
        <div className="manifesto-track">
          {statements.map((text, i) => (
            <div key={i} className="manifesto-panel" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(20px, 4vw, 64px)'
            }}>
              <h2 className="manifesto-text" style={{ 
                fontSize: 'clamp(3rem, 8vw, 8rem)', 
                fontWeight: 800, 
                lineHeight: 1, 
                letterSpacing: '-0.04em',
                maxWidth: '12ch'
              }}>
                {text}
              </h2>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .manifesto-container {
          position: relative;
        }
        
        .manifesto-track {
          display: flex;
          width: 600%;
          height: 100svh;
        }
        
        .manifesto-panel {
          width: 100%;
          height: 100svh;
        }
        
        @media (max-width: 1023px) {
          .manifesto-track {
            flex-direction: column;
            width: 100%;
            height: auto;
            padding: 8rem 0;
          }
          .manifesto-panel {
            width: 100%;
            height: auto;
            min-height: 50svh;
          }
        }
      `}</style>
    </section>
  );
};

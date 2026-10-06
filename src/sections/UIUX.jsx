import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  "User research", "Information architecture", "User flows", 
  "Wireframes", "UI design", "Responsive design", 
  "Design systems", "Interaction design", "Conversion UX", 
  "UX audits", "Accessibility", "Redesign"
];

export const UIUX = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ui-frame', {
        y: 60,
        opacity: 0,
        rotationX: 10,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ui-visual-container',
          start: 'top 70%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        <div className="ui-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="eyebrow">08 / UI / UX</span>
            <h2 className="heading-1" style={{ marginBottom: '2rem' }}>
              MAKE THE COMPLEX FEEL OBVIOUS.
            </h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {capabilities.map((cap, i) => (
                <span key={i} style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '99px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {cap}
                </span>
              ))}
            </div>
          </div>
          
          <div className="ui-visual-container" style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
            
            {/* Layer 1: Wireframe */}
            <div className="ui-frame" style={{ 
              position: 'absolute', 
              width: '80%', 
              height: '80%', 
              backgroundColor: 'var(--surface-main)',
              border: '2px dashed var(--border-color)',
              borderRadius: '16px',
              transform: 'translateZ(-100px) translateY(-30px) rotateX(10deg)',
              opacity: 0.4,
              padding: '2rem'
            }}>
              <div style={{ width: '40%', height: '20px', backgroundColor: 'var(--border-color)', marginBottom: '2rem' }}></div>
              <div style={{ width: '100%', height: '100px', backgroundColor: 'var(--border-color)', marginBottom: '1rem' }}></div>
              <div style={{ width: '100%', height: '100px', backgroundColor: 'var(--border-color)' }}></div>
            </div>
            
            {/* Layer 2: UI */}
            <div className="ui-frame" style={{ 
              position: 'absolute', 
              width: '85%', 
              height: '85%', 
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              transform: 'translateZ(-50px) translateY(-15px) rotateX(5deg)',
              opacity: 0.7,
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
              padding: '2rem'
            }}>
              <div style={{ width: '40%', height: '24px', backgroundColor: 'var(--text-secondary)', borderRadius: '4px', marginBottom: '2rem' }}></div>
              <div style={{ width: '100%', height: '120px', backgroundColor: 'var(--bg-main)', borderRadius: '8px', marginBottom: '1rem' }}></div>
              <div style={{ width: '100%', height: '120px', backgroundColor: 'var(--bg-main)', borderRadius: '8px' }}></div>
            </div>
            
            {/* Layer 3: Interaction */}
            <div className="ui-frame" style={{ 
              position: 'absolute', 
              width: '90%', 
              height: '90%', 
              backgroundColor: 'var(--surface-main)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              transform: 'translateZ(0) translateY(0) rotateX(0deg)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '50%', height: '32px', backgroundColor: 'var(--text-primary)', borderRadius: '6px' }}></div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '100px', height: '36px', borderRadius: '99px', backgroundColor: 'var(--accent)' }}></div>
                <div style={{ width: '100px', height: '36px', borderRadius: '99px', border: '1px solid var(--border-color)' }}></div>
              </div>
              <div style={{ flex: 1, backgroundColor: 'var(--bg-main)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--surface-main)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
      
      <style>{`
        .ui-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        
        @media (min-width: 1024px) {
          .ui-grid {
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techGroups = [
  { name: 'WEB', items: ['React', 'Next.js', 'Vite', 'HTML/CSS', 'JavaScript'] },
  { name: 'AI / ML', items: ['Python', 'Scikit-learn', 'NLP', 'LLMs', 'RAG'] },
  { name: 'AUTOMATION', items: ['Agents', 'Workflows', 'APIs'] },
  { name: 'NETWORKING', items: ['TCP/IP', 'BGP', 'OSPF', 'VLAN', 'DNS'] },
  { name: 'SECURITY', items: ['Threat Detection', 'Hardening', 'Audits'] },
  { name: 'CLOUD', items: ['Linux', 'Windows', 'Hosting', 'Deployment'] },
  { name: 'UI / UX', items: ['Figma', 'Wireframing', 'Prototyping'] },
  { name: 'SEO', items: ['Technical SEO', 'Analytics', 'Optimization'] }
];

export const TechnologyUniverse = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        if (!prefersReducedMotion) {
          gsap.to('.tech-orbit', {
            rotation: 360,
            duration: 60,
            repeat: -1,
            ease: "none"
          });
          
          gsap.to('.tech-item', {
            rotation: -360,
            duration: 60,
            repeat: -1,
            ease: "none"
          });
        }
      }, containerRef);
      return () => ctx.revert();
    });
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} id="skills" className="section-padding" style={{ backgroundColor: 'var(--surface-elevated)', overflow: 'hidden' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <span className="eyebrow">16 / THE STACK</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem', maxWidth: '15ch', marginInline: 'auto' }}>
            THE TOOLS I USE TO MAKE THINGS WORK.
          </h2>
        </div>
        
        {/* Desktop Orbit / Mobile Grid */}
        <div className="tech-universe-container">
          
          {/* Desktop Orbit View */}
          <div className="desktop-orbit" style={{ position: 'relative', width: '100%', height: '800px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Center Node */}
            <div style={{ 
              width: '120px', height: '120px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-main)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', fontWeight: 800, zIndex: 10,
              boxShadow: '0 0 40px rgba(0,0,0,0.1)'
            }}>
              PRITISH
            </div>
            
            {/* Orbits */}
            {[1, 2, 3].map(orbit => (
              <div key={orbit} style={{
                position: 'absolute',
                width: `${orbit * 250}px`,
                height: `${orbit * 250}px`,
                borderRadius: '50%',
                border: '1px dashed var(--border-color)',
                zIndex: 1
              }}></div>
            ))}
            
            {/* Tech Groups around orbits */}
            <div className="tech-orbit" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 5 }}>
              {techGroups.map((group, i) => {
                const angle = (i / techGroups.length) * Math.PI * 2;
                const radius = i % 2 === 0 ? 250 : 375;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <div key={group.name} className="tech-item" style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'var(--surface-main)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    minWidth: '180px',
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                  }}>
                    <span className="metadata" style={{ color: 'var(--accent)', marginBottom: '0.5rem', display: 'block' }}>{group.name}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {group.items.slice(0, 3).map(item => (
                        <span key={item} style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Grid View */}
          <div className="mobile-tech-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {techGroups.map((group) => (
              <div key={group.name} style={{ backgroundColor: 'var(--surface-main)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <span className="metadata" style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'block' }}>{group.name}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {group.items.map(item => (
                    <span key={item} style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      
      <style>{`
        .mobile-tech-grid { display: none !important; }
        .desktop-orbit { display: flex !important; }
        
        @media (max-width: 1023px) {
          .desktop-orbit { display: none !important; }
          .mobile-tech-grid { display: grid !important; }
        }
      `}</style>
    </section>
  );
};

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techGroups = [
  { name: 'NETWORKING & INFRA', items: ['TCP/IP & LAN/WAN', 'Routing & Switching', 'VLAN, DHCP, DNS', 'VPN & Firewalls', 'OSPF & BGP'] },
  { name: 'AI & ML', items: ['Python', 'Scikit-learn', 'NLP & TF-IDF', 'Linear SVM & RF', 'GenAI & LLMs (Learning)'] },
  { name: 'SECURITY & MONITORING', items: ['Threat Detection', 'Network Monitoring', 'Risk Scoring', 'Scapy'] },
  { name: 'WEB DEVELOPMENT', items: ['React & Vite', 'JavaScript', 'HTML/CSS', 'PHP', 'WordPress'] },
  { name: 'CLOUD & SYSTEMS', items: ['Linux', 'Windows', 'Basic Cloud Computing', 'Git & GitHub'] },
  { name: 'DIGITAL EXPERIENCES', items: ['UI / UX Design', 'Responsive Design', 'SEO', 'Automation'] }
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
            duration: 80,
            repeat: -1,
            ease: "none"
          });
          
          gsap.to('.tech-item', {
            rotation: -360,
            duration: 80,
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
          <span className="eyebrow">15 / THE STACK</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem', maxWidth: '20ch', marginInline: 'auto' }}>
            VERIFIED EXPERTISE & DIGITAL FOUNDATIONS.
          </h2>
          <p className="body-text" style={{ marginInline: 'auto' }}>
            A transparent view of my hands-on technical capabilities across systems, software, and intelligence.
          </p>
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
                    minWidth: '200px',
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                  }}>
                    <span className="metadata" style={{ color: 'var(--accent)', marginBottom: '0.75rem', display: 'block' }}>{group.name}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
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
          <div className="mobile-tech-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {techGroups.map((group) => (
              <div key={group.name} style={{ backgroundColor: 'var(--surface-main)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <span className="metadata" style={{ color: 'var(--accent)', marginBottom: '1.25rem', display: 'block' }}>{group.name}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {group.items.map(item => (
                    <span key={item} style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{item}</span>
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

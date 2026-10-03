import React, { useRef, useEffect } from 'react';
import { Globe, Server, Database, User, Code } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Systems = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sys-node', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const verifiedAreas = [
    "Linux", "Windows", "Cloud fundamentals", "Hosting", "DNS", 
    "Deployment", "Server fundamentals", "Performance", "Troubleshooting"
  ];

  const flow = [
    { label: "DOMAIN / DNS", icon: Globe },
    { label: "SERVER", icon: Server },
    { label: "APPLICATION", icon: Code },
    { label: "DATABASE", icon: Database },
    { label: "USER", icon: User }
  ];

  return (
    <section ref={containerRef} className="section-padding" style={{ backgroundColor: 'var(--surface-elevated)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="eyebrow">14 / SYSTEMS</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem' }}>
            THE SYSTEM BEHIND THE SCREEN.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', maxWidth: '800px', margin: '0 auto' }}>
            {verifiedAreas.map((area, i) => (
              <span key={i} style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '99px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {area}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ 
          marginTop: '4rem',
          padding: '4rem 2rem',
          backgroundColor: 'var(--surface-main)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem'
        }}>
          {flow.map((step, i) => (
            <div key={i} className="sys-node" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '70px', height: '70px', 
                  borderRadius: '16px', 
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-primary)'
                }}>
                  <step.icon size={28} />
                </div>
                <span className="metadata">{step.label}</span>
              </div>
              
              {i < flow.length - 1 && (
                <div style={{ color: 'var(--accent)', fontSize: '1.5rem', fontWeight: 400 }} className="hide-on-mobile">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
      <style>{`
        @media (max-width: 1023px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

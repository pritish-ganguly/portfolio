import React, { useRef, useEffect } from 'react';
import { User, Monitor, Network, Database, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Software = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Flow animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });
      
      tl.from('.arch-node', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power2.out'
      })
      .from('.arch-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.4,
        stagger: 0.2,
        ease: 'power2.out'
      }, "-=0.8");
      
      // Infinite pulse on connection dots
      gsap.to('.arch-dot', {
        y: 30,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        repeat: -1,
        ease: 'power1.inOut'
      });
      
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const capabilities = [
    "SaaS and dashboards", "Internal tools", "APIs and integrations",
    "Production hardening", "Web applications", "Backend systems"
  ];

  return (
    <section ref={sectionRef} className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        <div className="software-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
            <span className="eyebrow">06 / SOFTWARE</span>
            <h2 className="heading-1" style={{ marginBottom: '2rem', wordBreak: 'break-word', hyphens: 'auto' }}>
              SOFTWARE WITH A JOB TO DO.
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
              {capabilities.map((cap, i) => (
                <div key={i} style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, wordBreak: 'break-word' }}>
                  {cap}
                </div>
              ))}
            </div>
          </div>
          
          {/* Architecture Visual */}
          <div style={{ 
            backgroundColor: 'var(--surface-elevated)', 
            borderRadius: '24px', 
            padding: '3rem 1rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            border: '1px solid var(--border-color)',
            overflow: 'hidden'
          }}>
            
            <div className="arch-node" style={{...nodeStyle, maxWidth: '100%'}}>
              <User size={24} color="var(--accent)" />
              <span className="metadata">USER</span>
            </div>
            
            <div style={lineWrapperStyle}>
              <div className="arch-line" style={lineStyle}></div>
              <div className="arch-dot" style={dotStyle}></div>
            </div>
            
            <div className="arch-node" style={{...nodeStyle, maxWidth: '100%'}}>
              <Monitor size={24} color="var(--accent)" />
              <span className="metadata">FRONTEND</span>
            </div>
            
            <div style={lineWrapperStyle}>
              <div className="arch-line" style={lineStyle}></div>
              <div className="arch-dot" style={dotStyle}></div>
            </div>
            
            <div className="arch-node" style={{...nodeStyle, maxWidth: '100%'}}>
              <Network size={24} color="var(--accent)" />
              <span className="metadata">API / GATEWAY</span>
            </div>
            
            <div style={{ display: 'flex', width: '100%', maxWidth: '280px', position: 'relative', marginTop: '2rem', gap: '0.5rem' }}>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ height: '40px', width: '2px', backgroundColor: 'var(--border-color)', marginBottom: '1rem' }}></div>
                <div className="arch-node" style={{...nodeStyle, width: '100%', padding: '1rem 0.5rem'}}>
                  <Database size={24} color="var(--accent)" />
                  <span className="metadata" style={{ fontSize: '0.65rem' }}>DATABASE</span>
                </div>
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ height: '40px', width: '2px', backgroundColor: 'var(--border-color)', marginBottom: '1rem' }}></div>
                <div className="arch-node" style={{...nodeStyle, width: '100%', padding: '1rem 0.5rem'}}>
                  <Layers size={24} color="var(--accent)" />
                  <span className="metadata" style={{ fontSize: '0.65rem' }}>SERVICES</span>
                </div>
              </div>
              
            </div>
            
          </div>
          
        </div>
      </div>
      
      <style>{`
        .software-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        
        @media (min-width: 1024px) {
          .software-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
};

const nodeStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '1rem 2rem',
  backgroundColor: 'var(--surface-main)',
  border: '1px solid var(--border-color)',
  borderRadius: '16px',
  width: '200px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  position: 'relative',
  zIndex: 2
};

const lineWrapperStyle = {
  height: '60px',
  width: '2px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1
};

const lineStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: 'var(--border-color)'
};

const dotStyle = {
  position: 'absolute',
  top: '10px',
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: 'var(--accent)'
};

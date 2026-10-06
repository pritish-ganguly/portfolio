import React, { useRef, useEffect } from 'react';
import { Layout, Smartphone, Zap, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  "Landing pages", "Corporate websites", "E-commerce", 
  "React", "Next.js", "Motion and interactions", 
  "Responsive design", "Performance", "Production deployment"
];

export const Websites = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.web-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      });
      
      gsap.from('.browser-mockup', {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.browser-mockup',
          start: 'top 85%'
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-padding" style={{ backgroundColor: 'var(--surface-elevated)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="eyebrow web-reveal">05 / WEB</span>
          <h2 className="heading-1 web-reveal" style={{ marginBottom: '1.5rem', maxWidth: '20ch', marginInline: 'auto' }}>
            WEBSITES DESIGNED TO BE USED, NOT JUST LOOKED AT.
          </h2>
          <p className="body-text web-reveal" style={{ marginInline: 'auto', maxWidth: '60ch' }}>
            Designed, built and launched as one system,<br/>
            from the first screen to the live domain.
          </p>
        </div>
        
        <div className="web-grid">
          
          <div className="capabilities-list web-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 className="heading-3" style={{ marginBottom: '1.5rem' }}>Capabilities</h3>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {capabilities.map((cap, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span style={{ fontWeight: 500 }}>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <div className="feature-pill">
                <Layout size={20} />
                <span>Responsive</span>
              </div>
              <div className="feature-pill">
                <Zap size={20} />
                <span>Performant</span>
              </div>
              <div className="feature-pill">
                <Smartphone size={20} />
                <span>Mobile First</span>
              </div>
            </div>
          </div>
          
          <div className="browser-mockup" style={{ 
            backgroundColor: 'var(--bg-main)', 
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--surface-main)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFBD2E' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27C93F' }}></div>
              <div style={{ marginLeft: '1rem', backgroundColor: 'var(--bg-main)', padding: '0.25rem 1rem', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)', flex: 1, textAlign: 'center' }}>
                production-ready.com
              </div>
            </div>
            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Skeleton UI for visual */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--border-color)' }}></div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '60px', height: '12px', borderRadius: '6px', backgroundColor: 'var(--border-color)' }}></div>
                  <div style={{ width: '60px', height: '12px', borderRadius: '6px', backgroundColor: 'var(--border-color)' }}></div>
                </div>
              </div>
              <div style={{ width: '70%', height: '40px', borderRadius: '8px', backgroundColor: 'var(--border-color)', marginTop: '2rem' }}></div>
              <div style={{ width: '50%', height: '20px', borderRadius: '6px', backgroundColor: 'var(--border-color)', opacity: 0.5 }}></div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ width: '120px', height: '40px', borderRadius: '99px', backgroundColor: 'var(--accent)' }}></div>
                <div style={{ width: '120px', height: '40px', borderRadius: '99px', border: '1px solid var(--border-color)' }}></div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flex: 1 }}>
                <div style={{ flex: 1, backgroundColor: 'var(--border-color)', borderRadius: '12px', opacity: 0.3 }}></div>
                <div style={{ flex: 1, backgroundColor: 'var(--border-color)', borderRadius: '12px', opacity: 0.3 }}></div>
                <div style={{ flex: 1, backgroundColor: 'var(--border-color)', borderRadius: '12px', opacity: 0.3 }}></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <style>{`
        .web-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          margin-top: 4rem;
        }
        
        @media (min-width: 1024px) {
          .web-grid {
            grid-template-columns: 1fr 1.2fr;
            align-items: center;
          }
        }
        
        .feature-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: 1px solid var(--border-color);
          border-radius: 99px;
          color: var(--text-primary);
          font-weight: 500;
        }
      `}</style>
    </section>
  );
};

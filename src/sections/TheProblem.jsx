import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  { id: 'website', title: 'WEBSITE', desc: 'Your current platform is slow, hard to update, or fails to convert visitors into clients.', color: '#0066CC' },
  { id: 'ecommerce', title: 'E-COMMERCE', desc: 'You need a scalable storefront that handles complex catalogs and custom checkout flows.', color: '#10B981' },
  { id: 'automation', title: 'AUTOMATION', desc: 'Your team is wasting hours on manual data entry, repetitive emails, and disjointed systems.', color: '#F59E0B' },
  { id: 'ai', title: 'AI', desc: 'You have data and processes that could be optimized with machine learning, but lack the technical bridge.', color: '#8B5CF6' },
  { id: 'discovery', title: 'DISCOVERY', desc: 'You built a great product, but technical SEO issues are preventing search engines from finding it.', color: '#EC4899' },
  { id: 'systems', title: 'SYSTEMS', desc: 'Your infrastructure is fragile, downtime is frequent, and deployments are a manual nightmare.', color: '#06B6D4' }
];

export const TheProblem = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.problem-card', 
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%'
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-padding" style={{ backgroundColor: 'var(--surface-main)' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="problem-layout">
          
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div className="problem-sticky" style={{ position: 'sticky', top: '8rem' }}>
              <span className="eyebrow">03 / THE PROBLEM</span>
              <h2 className="heading-1" style={{ marginBottom: '1.5rem', maxWidth: '15ch' }}>
                WHAT ARE YOU<br/>TRYING TO FIX?
              </h2>
              <p className="body-text" style={{ maxWidth: '45ch' }}>
                Projects should start with the problem, not the technology. 
                The right solution depends on what needs to change, 
                what already exists and what the experience needs to achieve.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="problem-cards-grid">
            {problems.map((prob) => (
              <div 
                key={prob.id}
                className="problem-card"
                style={{
                  padding: '2.5rem',
                  backgroundColor: 'var(--surface-elevated)',
                  borderRadius: '24px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderLeft: `4px solid ${prob.color}`
                }}
              >
                <h3 className="heading-3" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{prob.title}</h3>
                <p className="body-text" style={{ fontSize: '1.0625rem' }}>{prob.desc}</p>
              </div>
            ))}
          </div>
          
        </div>
        
      </div>
      
      <style>{`
        @media (min-width: 1024px) {
          .problem-layout {
            grid-template-columns: 0.8fr 1.2fr !important;
            align-items: start;
          }
          .problem-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 1023px) {
          .problem-sticky {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

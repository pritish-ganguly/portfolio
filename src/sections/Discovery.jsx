import React, { useRef, useEffect } from 'react';
import { Search, MousePointerClick, Layout, Target, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Discovery = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.seo-node', {
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const capabilities = [
    "Technical SEO", "On-page SEO", "Keyword research", "Optimization", 
    "Metadata", "Site structure", "Internal linking", "Local SEO", 
    "Performance SEO", "Analytics", "Content strategy", "Search marketing", 
    "Conversion optimization", "Lead generation", "Audience research", "Campaign support", "Tracking"
  ];

  const flow = [
    { label: "DISCOVERY", icon: Search },
    { label: "SEARCH", icon: MousePointerClick },
    { label: "LANDING PAGE", icon: Layout },
    { label: "EXPERIENCE", icon: Zap },
    { label: "CONVERSION", icon: Target }
  ];

  return (
    <section ref={containerRef} className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="eyebrow">14 / DISCOVERY</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem' }}>
            BUILD IT.<br/>THEN HELP PEOPLE FIND IT.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', maxWidth: '1000px', margin: '0 auto' }}>
            {capabilities.map((cap, i) => (
              <span key={i} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '99px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {cap}
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
            <div key={i} className="seo-node" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '80px', height: '80px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)'
                }}>
                  <step.icon size={32} />
                </div>
                <span className="metadata">{step.label}</span>
              </div>
              
              {i < flow.length - 1 && (
                <div style={{ color: 'var(--border-color)', fontSize: '1.5rem', fontWeight: 400 }} className="hide-on-mobile">
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

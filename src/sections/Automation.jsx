import React, { useRef, useEffect } from 'react';
import { FileInput, Zap, Brain, Server, PlaySquare, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: 'input', label: 'INPUT', icon: FileInput, color: '#0066CC' },
  { id: 'trigger', label: 'TRIGGER', icon: Zap, color: '#F59E0B' },
  { id: 'logic', label: 'LOGIC / AI', icon: Brain, color: '#8B5CF6' },
  { id: 'system', label: 'SYSTEM', icon: Server, color: '#10B981' },
  { id: 'action', label: 'ACTION', icon: PlaySquare, color: '#EC4899' },
  { id: 'result', label: 'RESULT', icon: CheckCircle, color: '#06B6D4' }
];

export const Automation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });
      
      tl.from('.auto-step', {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out'
      })
      .from('.auto-connector', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.3,
        stagger: 0.15,
        ease: 'power1.inOut'
      }, "-=0.6");
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const capabilities = [
    "AI agents and assistants", "Workflow automation", "CRM/billing/auth integrations",
    "Internal bots", "AI workflows", "API automation", "Document processing", "Automated reporting"
  ];

  return (
    <section ref={containerRef} className="section-padding" style={{ backgroundColor: 'var(--surface-elevated)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="eyebrow">07 / AUTOMATION</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem', maxWidth: '20ch', marginInline: 'auto' }}>
            THE BUSYWORK,<br/>MADE TO DO ITSELF.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', maxWidth: '800px', margin: '0 auto' }}>
            {capabilities.map((cap, i) => (
              <span key={i} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '99px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {cap}
              </span>
            ))}
          </div>
        </div>
        
        {/* Automation Pipeline Visual */}
        <div style={{ 
          marginTop: '5rem',
          padding: '4rem 2rem', 
          backgroundColor: 'var(--surface-main)', 
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          overflowX: 'auto',
          overflowX: 'auto'
        }}>
          
          <div className="pipeline-container" style={{ display: 'flex', alignItems: 'center', minWidth: 'max-content' }}>
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                
                {/* Node */}
                <div className="auto-step" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '1rem',
                  width: '120px'
                }}>
                  <div style={{ 
                    width: '64px', height: '64px', 
                    borderRadius: '16px', 
                    backgroundColor: 'var(--bg-main)',
                    border: '1px solid var(--border-color)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 8px 16px ${step.color}15`
                  }}>
                    <step.icon size={28} color={step.color} />
                  </div>
                  <span className="metadata">{step.label}</span>
                </div>
                
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="auto-connector" style={{ 
                    width: '40px', 
                    height: '2px', 
                    backgroundColor: 'var(--border-color)',
                    margin: '0 10px',
                    position: 'relative',
                    top: '-15px'
                  }}>
                    <div style={{ 
                      position: 'absolute', right: '-4px', top: '-4px', 
                      width: '0', height: '0', 
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderLeft: '5px solid var(--border-color)'
                    }}></div>
                  </div>
                )}
                
              </React.Fragment>
            ))}
          </div>
          
        </div>
        
      </div>
      
      <style>{`
        .pipeline-container {
          padding: 1rem 0;
          width: fit-content;
          margin: 0 auto;
        }
        
        @media (max-width: 1023px) {
          .pipeline-container {
            margin: 0;
          }
        }
      `}</style>
    </section>
  );
};

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { clientWork } from '../data/clientWork';

gsap.registerPlugin(ScrollTrigger);

export const SelectedWork = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth + 100;
      
      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
      }, sectionRef);
      
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" style={{ backgroundColor: 'var(--bg-main)', overflow: 'hidden' }}>
      
      <div className="section-padding">
        <div className="container" style={{ marginBottom: '4rem' }}>
          <span className="eyebrow">17 / SELECTED WORK</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem', maxWidth: '20ch' }}>
            WORK THAT LIVES<br/>OUTSIDE THIS WEBSITE.
          </h2>
        </div>
        
        <div className="work-track-container">
          <div ref={trackRef} className="work-horizontal-track">
            {clientWork.map((project, i) => (
              <div key={project.id} className="work-card" style={{ 
                backgroundColor: 'var(--surface-main)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
                  <div>
                    <span className="metadata" style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.5rem' }}>{project.number} / {project.category}</span>
                    <h3 className="heading-2">{project.title}</h3>
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
                    VISIT <ExternalLink size={16} />
                  </a>
                </div>
                
                {/* Abstract Visual Representation */}
                <div style={{ 
                  flex: 1, 
                  backgroundColor: 'var(--surface-elevated)', 
                  borderRadius: '16px', 
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '3rem',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  <div style={{ width: '60%', height: '70%', backgroundColor: 'var(--surface-main)', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '30px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '6px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border-color)' }}></div>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border-color)' }}></div>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border-color)' }}></div>
                    </div>
                    <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ width: '70%', height: '24px', backgroundColor: 'var(--border-color)', borderRadius: '4px', opacity: 0.5 }}></div>
                      <div style={{ width: '40%', height: '16px', backgroundColor: 'var(--border-color)', borderRadius: '4px', opacity: 0.3 }}></div>
                      <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                         <div style={{ flex: 1, height: '80px', backgroundColor: 'var(--border-color)', borderRadius: '8px', opacity: 0.2 }}></div>
                         <div style={{ flex: 1, height: '80px', backgroundColor: 'var(--border-color)', borderRadius: '8px', opacity: 0.2 }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="body-text" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', maxWidth: '45ch' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {project.services.map((service, idx) => (
                      <span key={idx} className="metadata" style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '99px' }}>
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .work-track-container {
          padding-left: clamp(20px, 4vw, 64px);
        }
        
        .work-horizontal-track {
          display: flex;
          gap: 2rem;
          padding-right: clamp(20px, 4vw, 64px);
        }
        
        .work-card {
          flex: 0 0 85vw;
          min-height: 600px;
        }
        
        @media (max-width: 1023px) {
          .work-track-container {
            padding-right: 0;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 2rem;
          }
          
          .work-track-container::-webkit-scrollbar {
            display: none;
          }
          
          .work-card {
            flex: 0 0 90vw;
            padding: 2rem !important;
            min-height: 500px;
          }
        }
      `}</style>
    </section>
  );
};

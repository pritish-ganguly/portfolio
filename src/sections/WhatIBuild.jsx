import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Code2, Bot, Brain, Server, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { num: '01', title: 'WEB', desc: 'Build fast, responsive and purposeful websites and web applications.', icon: Globe, color: '#0066CC' },
  { num: '02', title: 'SOFTWARE', desc: 'Connect interfaces, applications, data and infrastructure into reliable digital systems.', icon: Code2, color: '#10B981' },
  { num: '03', title: 'AUTOMATION', desc: 'Reduce repetitive work with intelligent workflows and automation.', icon: Bot, color: '#F59E0B' },
  { num: '04', title: 'AI / ML', desc: 'Build practical AI-powered features and applications around real use cases.', icon: Brain, color: '#8B5CF6' },
  { num: '05', title: 'INFRASTRUCTURE', desc: 'Design and build practical technical solutions around connectivity, systems and infrastructure.', icon: Server, color: '#06B6D4' },
  { num: '06', title: 'GROWTH', desc: 'Technical SEO and discovery optimization to ensure your digital presence reaches its audience.', icon: Search, color: '#EC4899' },
];

export const WhatIBuild = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth + 100; // adding some buffer
      
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
    <section id="services" ref={sectionRef} style={{ backgroundColor: 'var(--bg-main)', overflow: 'hidden' }}>
      
      <div className="section-padding">
        <div className="container" style={{ marginBottom: '4rem' }}>
          <span className="eyebrow">04 / THE WORK</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem', maxWidth: '15ch' }}>
            FROM DIGITAL EXPERIENCES TO WORKING SYSTEMS.
          </h2>
          <p className="body-text">
            As a full-stack developer, I work across websites, digital products, AI-powered systems,<br/>
            automation and technical infrastructure, starting with the problem<br/>
            before deciding what to build.
          </p>
        </div>
        
        {/* Desktop Horizontal Track / Mobile Vertical or Touch Scroll */}
        <div className="track-container">
          <div ref={trackRef} className="horizontal-track">
            {categories.map((cat, i) => (
              <div key={cat.num} className="build-card" style={{ 
                backgroundColor: 'var(--surface-main)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                padding: '4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', right: '-20%', bottom: '-20%', opacity: 0.05, zIndex: 0, pointerEvents: 'none' }}>
                  <cat.icon size={400} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                
                <div style={{ zIndex: 1 }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '2rem' }}>
                    {cat.num}
                  </span>
                  <h3 className="heading-1" style={{ marginBottom: '2rem' }}>{cat.title}</h3>
                  <p className="body-text" style={{ fontSize: '1.5rem' }}>{cat.desc}</p>
                </div>
                
                <div style={{ zIndex: 1, marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '4px', backgroundColor: cat.color, borderRadius: '2px' }}></div>
                  <span className="metadata">Explore Capability</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .track-container {
          padding-left: clamp(20px, 4vw, 64px);
        }
        
        .horizontal-track {
          display: flex;
          gap: 2rem;
          padding-right: clamp(20px, 4vw, 64px);
        }
        
        .build-card {
          flex: 0 0 80vw;
          min-height: 500px;
        }
        
        @media (max-width: 1023px) {
          .track-container {
            padding-right: 0;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 2rem;
          }
          
          .track-container::-webkit-scrollbar {
            display: none;
          }
          
          .build-card {
            flex: 0 0 85vw;
            padding: 2.5rem !important;
            min-height: 400px;
          }
        }
      `}</style>
    </section>
  );
};

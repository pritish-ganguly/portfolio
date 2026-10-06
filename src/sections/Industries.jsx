import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Building2, UserCircle2, ShoppingCart, Briefcase, Factory, BookOpen, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { title: "Startups & Founders", desc: "MVPs, launch-ready websites and digital product concepts.", icon: Rocket },
  { title: "Small & Medium Businesses", desc: "Business websites, workflows and practical digital improvements.", icon: Building2 },
  { title: "Individuals & Professionals", desc: "Personal brands, portfolios and professional online presence.", icon: UserCircle2 },
  { title: "E-commerce & Retail", desc: "Online stores, customer journeys and digital commerce experiences.", icon: ShoppingCart },
  { title: "Agencies & Service Providers", desc: "Digital delivery, automation and web solutions for service-led businesses.", icon: Briefcase },
  { title: "Industrial & Technical Businesses", desc: "Clear digital experiences for engineering, infrastructure and technical services.", icon: Factory },
  { title: "Education & Learning", desc: "Educational websites and useful digital information experiences.", icon: BookOpen },
  { title: "Emerging & Innovation-Led Projects", desc: "AI-enabled concepts, software prototypes and workflow automation.", icon: Sparkles }
];

export const Industries = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.industry-card', 
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ backgroundColor: 'var(--surface-elevated)' }}>
      <div className="container">
        
        <div style={{ marginBottom: '4rem', maxWidth: '800px' }}>
          <span className="eyebrow">01 / INDUSTRIES I WORK WITH</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem' }}>
            INDUSTRIES I WORK WITH
          </h2>
          <p className="body-text" style={{ maxWidth: '65ch' }}>
            Different goals. Different challenges. The right digital approach starts with understanding your business, your audience and what you need to achieve.
          </p>
        </div>
        
        <div className="industries-grid">
          {industries.map((ind, i) => (
            <div key={i} className="industry-card" style={{ 
              backgroundColor: 'var(--surface-main)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '24px', 
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <div style={{ 
                width: '48px', height: '48px', 
                borderRadius: '12px', 
                backgroundColor: 'var(--bg-main)', 
                border: '1px solid var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
                marginBottom: '1.5rem'
              }}>
                <ind.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="heading-3" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{ind.title}</h3>
              <p className="body-text" style={{ fontSize: '0.9375rem', marginTop: 'auto', color: 'var(--text-secondary)' }}>{ind.desc}</p>
            </div>
          ))}
        </div>
        
      </div>
      
      <style>{`
        .industries-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        @media (min-width: 640px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .industries-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

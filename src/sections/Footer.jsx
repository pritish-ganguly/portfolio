import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const currentYear = new Date().getFullYear();

export const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      const ctx = gsap.context(() => {
        gsap.from('.footer-reveal', {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%'
          }
        });
      }, footerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <footer ref={footerRef} style={{ backgroundColor: 'var(--surface-elevated)', borderTop: '1px solid var(--border-color)', paddingTop: '8rem', paddingBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative large faint text in background */}
      <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: '100%', textAlign: 'center', pointerEvents: 'none', zIndex: 0, opacity: 0.02, color: 'var(--text-primary)' }}>
        <span style={{ fontSize: '20vw', fontWeight: 900, whiteSpace: 'nowrap', letterSpacing: '-0.05em' }}>PRITISH</span>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <div className="footer-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '8rem' }}>
          <span className="metadata" style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></div>
            Have a problem worth solving?
          </span>
          <h2 className="heading-1" style={{ 
            fontSize: 'clamp(3rem, 8vw, 7rem)', 
            fontWeight: 800, 
            lineHeight: 1, 
            letterSpacing: '-0.04em',
            marginBottom: '3rem',
            color: 'var(--text-primary)',
            maxWidth: '12ch'
          }}>
            LET'S<br/>BUILD<br/>SOMETHING<br/>USEFUL.
          </h2>
          <a href="#contact" className="btn-primary" style={{ padding: '1rem 2.5rem', borderRadius: '99px', fontSize: '1rem' }}>
            START A CONVERSATION <ArrowRight size={20} />
          </a>
        </div>
        
        <div className="footer-grid footer-reveal">
          
          {/* Brand & Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', display: 'block', marginBottom: '0.5rem' }}>PRITISH GANGULY</span>
              <span className="metadata" style={{ color: 'var(--text-secondary)' }}>Web. Intelligence. Infrastructure.</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="mailto:pritishganguly07@gmail.com" style={{ fontSize: '1.125rem', fontWeight: 500, transition: 'color 0.2s' }} className="nav-link-hover">pritishganguly07@gmail.com</a>
              <span className="metadata" style={{ color: 'var(--text-secondary)' }}>Kolkata, India</span>
            </div>
          </div>
          
          {/* Links Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <span className="metadata" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>NAVIGATION</span>
              <a href="#about" className="footer-link">About</a>
              <a href="#services" className="footer-link">Services</a>
              <a href="#skills" className="footer-link">Skills</a>
              <a href="#work" className="footer-link">Work</a>
              <a href="#projects" className="footer-link">Projects</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <span className="metadata" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>SOCIAL</span>
              <a href="https://github.com/pritish-ganguly" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
              <a href="https://www.linkedin.com/in/pritish-ganguly7/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
              <a href="mailto:pritishganguly07@gmail.com" className="footer-link">Email</a>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="footer-reveal" style={{ 
          paddingTop: '3rem', 
          marginTop: '4rem', 
          borderTop: '1px solid var(--border-color)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '1rem',
          alignItems: 'center'
        }}>
          <span className="metadata" style={{ color: 'var(--text-secondary)' }}>&copy; {currentYear} Pritish Ganguly.</span>
          <span className="metadata" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', borderRadius: '50%' }}></div>
            All systems operational.
          </span>
        </div>
        
      </div>
      
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .footer-link {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: var(--accent);
        }
      `}</style>
    </footer>
  );
};

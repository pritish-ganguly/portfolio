import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="contact" className="section-padding" style={{ backgroundColor: 'var(--surface-elevated)' }}>
      <div className="container">
        
        <div className="contact-grid">
          
          <div className="contact-reveal" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow">19 / START A PROJECT</span>
            <h2 className="heading-1" style={{ marginBottom: '1.5rem', maxWidth: '15ch' }}>
              LET'S TURN YOUR IDEA INTO SOMETHING GREAT.
            </h2>
            <p className="body-text" style={{ maxWidth: '40ch', marginBottom: '3rem' }}>
              Whether you're starting something new, improving an existing product, or looking for a smarter technical solution, let's build something that works for your business.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <span className="metadata" style={{ display: 'block', marginBottom: '0.25rem' }}>Email</span>
                  <a href="mailto:prithishganguly07@gmail.com" style={{ fontSize: '1.125rem', fontWeight: 500, wordBreak: 'break-all' }}>prithishganguly07@gmail.com</a>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="metadata" style={{ display: 'block', marginBottom: '0.25rem' }}>Location</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 500 }}>Kolkata, India</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-reveal" style={{ backgroundColor: 'var(--surface-main)', padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
            <ContactForm />
          </div>
          
        </div>
      </div>
      
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 0.8fr 1.2fr;
          }
        }
      `}</style>
    </section>
  );
};

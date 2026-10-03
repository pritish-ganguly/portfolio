import React, { useRef, useEffect } from 'react';
import { Package, Search, Layout, ShoppingCart, CreditCard, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const journey = [
  { label: 'PRODUCT', icon: Package },
  { label: 'DISCOVERY', icon: Search },
  { label: 'PRODUCT PAGE', icon: Layout },
  { label: 'CART', icon: ShoppingCart },
  { label: 'CHECKOUT', icon: CreditCard },
  { label: 'PURCHASE', icon: Check }
];

export const Commerce = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.commerce-node', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.commerce-visual',
          start: 'top 80%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const capabilities = [
    "Shopify", "Customization", "E-commerce UX", "Product catalogs", 
    "Storefronts", "Conversion optimization", "Payment integration", 
    "Store SEO", "Performance"
  ];

  return (
    <section ref={containerRef} className="section-padding" style={{ backgroundColor: 'var(--surface-elevated)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="eyebrow">10 / COMMERCE</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem' }}>
            FROM PRODUCT TO PURCHASE.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', maxWidth: '800px', margin: '0 auto' }}>
            {capabilities.map((cap, i) => (
              <span key={i} style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '99px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {cap}
              </span>
            ))}
          </div>
        </div>
        
        <div className="commerce-visual" style={{ 
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
          {journey.map((step, i) => (
            <div key={i} className="commerce-node" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '80px', height: '80px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)'
                }}>
                  <step.icon size={32} />
                </div>
                <span className="metadata">{step.label}</span>
              </div>
              
              {i < journey.length - 1 && (
                <div style={{ 
                  width: '40px', height: '2px', 
                  backgroundColor: 'var(--border-color)',
                  position: 'relative',
                  top: '-15px'
                }} className="hide-on-mobile">
                  <div style={{ position: 'absolute', right: 0, top: '-4px', width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '5px solid var(--border-color)' }}></div>
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

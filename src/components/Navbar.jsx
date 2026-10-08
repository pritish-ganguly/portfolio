import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Moon, Sun } from 'lucide-react';
import gsap from 'gsap';
import { useContactModal } from './ModalContext';

export const Navbar = ({ show }) => {
  const { openModal } = useContactModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef(null);

  useEffect(() => {
    if (show && navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, [show]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.mobile-link', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Projects', href: '#projects' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed',
        top: '1rem', 
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: 'calc(100% - 2rem)',
        maxWidth: '900px', // More compact width
        pointerEvents: 'none',
        opacity: 0
      }}>
        <div style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pointerEvents: 'auto',
          background: 'var(--nav-bg-scrolled)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-color)',
          borderRadius: '99px',
          padding: '0.375rem 0.5rem 0.375rem 1.25rem', // Tighter padding, slightly more on left for brand
          boxShadow: '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          {/* Logo / Brand */}
          <a href="#" className="nav-brand" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>PRITISH</span>
            <span className="brand-last-name" style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>GANGULY</span>
          </a>
          
          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '1.5rem' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} style={{ fontSize: '0.8125rem', fontWeight: 500, transition: 'color 0.2s' }} className="nav-link-hover">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div style={{ width: '1px', height: '14px', backgroundColor: 'var(--border-color)' }}></div>
            
            <button onClick={toggleTheme} aria-label="Toggle theme" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }} className="nav-link-hover theme-btn">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={(e) => { e.preventDefault(); openModal(e); }} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', borderRadius: '99px', letterSpacing: '0.05em' }}>
              START A PROJECT
            </button>
          </div>

          {/* Mobile Toggle */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} className="mobile-toggle">
            <button onClick={toggleTheme} aria-label="Toggle theme" style={{ padding: '0.5rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMobileMenuOpen(true)} aria-label="Open menu" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface-elevated)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'var(--bg-main)',
          zIndex: 100,
          display: 'flex', flexDirection: 'column',
          padding: '1.5rem clamp(20px, 4vw, 64px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>PRITISH</span>
              <span style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>GANGULY</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface-elevated)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
              <X size={20} />
            </button>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, overflowY: 'auto' }}>
            {[...navLinks, { name: 'Contact', href: '#contact' }, { name: 'Skills', href: '#skills' }].map((link) => (
              <li key={link.name} className="mobile-link">
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} style={{ fontSize: '2rem', fontWeight: 600 }}>
                  {link.name}
                </a>
              </li>
            ))}
            <li className="mobile-link" style={{ marginTop: '2rem' }}>
              <button onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); openModal(e); }} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                START A PROJECT
              </button>
            </li>
          </ul>
        </div>
      )}
      
      <style>{`
        .desktop-nav { display: none !important; }
        .mobile-toggle { display: flex !important; }
        
        .nav-link-hover {
          color: var(--text-secondary);
        }
        .nav-link-hover:hover { 
          color: var(--text-primary); 
        }
        
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        
        @media (max-width: 480px) {
          .brand-last-name {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

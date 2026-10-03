import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Moon, Sun } from 'lucide-react';
import gsap from 'gsap';

export const Navbar = ({ show }) => {
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
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#work' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
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
        top: '1.5rem', 
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: 'calc(100% - 2rem)',
        maxWidth: '1200px',
        pointerEvents: 'none',
        opacity: 0
      }}>
        <div style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pointerEvents: 'auto',
          background: 'var(--nav-bg-scrolled)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color)',
          borderRadius: '99px',
          padding: '0.75rem 1.5rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          {/* Logo / Brand */}
          <a href="#" className="nav-brand" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>PRITISH</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>GANGULY</span>
          </a>
          
          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '1.5rem' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} style={{ fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }} className="nav-link-hover">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-color)' }}></div>
            
            <button onClick={toggleTheme} aria-label="Toggle theme" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }} className="nav-link-hover">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem', borderRadius: '99px' }}>
              START A PROJECT
            </a>
          </div>

          {/* Mobile Toggle */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} className="mobile-toggle">
            <button onClick={toggleTheme} aria-label="Toggle theme" style={{ color: 'var(--text-secondary)' }}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
              <Menu size={24} />
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
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>PRITISH</span>
              <span style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>GANGULY</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, overflowY: 'auto' }}>
            {navLinks.map((link) => (
              <li key={link.name} className="mobile-link">
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} style={{ fontSize: '2rem', fontWeight: 600 }}>
                  {link.name}
                </a>
              </li>
            ))}
            <li className="mobile-link" style={{ marginTop: '2rem' }}>
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                START A PROJECT
              </a>
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
        
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        
        @media (max-width: 380px) {
          .nav-brand span {
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </>
  );
};

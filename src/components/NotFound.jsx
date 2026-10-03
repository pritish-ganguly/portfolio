import React from 'react';
import { ArrowLeft, Grid } from 'lucide-react';

export const NotFound = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Subtle Background SVG */}
      <div style={{ position: 'absolute', width: '100vw', height: '100vh', zIndex: 0, opacity: 0.05, pointerEvents: 'none' }}>
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--text-primary)" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          404
        </h1>
        <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>
          THIS PAGE WENT<br/>SOMEWHERE ELSE.
        </h2>
        <p className="body-text" style={{ marginInline: 'auto', marginBottom: '3rem' }}>
          The page you're looking for doesn't seem to exist anymore.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/" className="btn-primary">
            <ArrowLeft size={18} /> BACK HOME
          </a>
          <a href="/#work" className="btn-secondary">
            <Grid size={18} /> VIEW MY WORK
          </a>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { projects } from '../data/projects';

export const TechnicalProjects = () => {
  return (
    <section id="projects" className="section-padding" style={{ backgroundColor: 'var(--surface-elevated)', overflow: 'hidden' }}>
      <div className="container">
        
        <div style={{ marginBottom: '4rem' }}>
          <span className="eyebrow">17 / TECHNICAL WORK</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem', maxWidth: '20ch', overflowWrap: 'anywhere' }}>
            WHEN THE PROBLEM GETS TECHNICAL.
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          
          {projects.map((project) => (
            <div key={project.id} className="technical-card" style={{ 
              backgroundColor: 'var(--surface-main)', 
              borderRadius: '24px', 
              border: '1px solid var(--border-color)',
              padding: 'clamp(1.5rem, 4vw, 4rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2rem, 4vw, 3rem)',
              minWidth: 0,
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}>
              
              <div className="technical-grid" style={{ display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)', alignItems: 'flex-start' }}>
                <div style={{ minWidth: 0, maxWidth: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span className="metadata" style={{ color: 'var(--text-secondary)' }}>{project.number}</span>
                    <span className="metadata" style={{ color: 'var(--accent)' }}>{project.category}</span>
                  </div>
                  <h3 className="heading-2" style={{ marginBottom: '1.5rem', overflowWrap: 'anywhere', wordBreak: 'normal' }}>{project.title}</h3>
                  <p className="body-text" style={{ marginBottom: '2rem', overflowWrap: 'anywhere' }}>{project.description}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ minWidth: 0 }}>
                      <h4 className="metadata" style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>THE PROBLEM</h4>
                      <p className="body-text" style={{ fontSize: '1rem', overflowWrap: 'anywhere' }}>{project.problem}</p>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h4 className="metadata" style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>THE APPROACH</h4>
                      <p className="body-text" style={{ fontSize: '1rem', overflowWrap: 'anywhere' }}>{project.approach}</p>
                    </div>
                  </div>
                </div>
                
                <div style={{ minWidth: 0, maxWidth: '100%', backgroundColor: 'var(--bg-main)', padding: 'clamp(1.5rem, 3vw, 2rem)', borderRadius: '16px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}>
                  <h4 className="metadata" style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>CORE TECHNOLOGIES</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                    {project.technologies.map(tech => (
                      <span key={tech} className="metadata" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--surface-main)', border: '1px solid var(--border-color)', borderRadius: '99px', overflowWrap: 'anywhere', maxWidth: '100%' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className="metadata" style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>KEY FUNCTIONALITY</h4>
                  <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(150px, 100%), 1fr))', gap: '0.75rem' }}>
                    {project.functionality.map((func, i) => (
                      <li key={i} className="small-text" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', overflowWrap: 'anywhere' }}>
                        <span style={{ color: 'var(--accent)', flexShrink: 0 }}>•</span>
                        <span style={{ minWidth: 0 }}>{func}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {project.architecture.length > 0 && (
                <div style={{ minWidth: 0, maxWidth: '100%' }}>
                  <h4 className="metadata" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>PIPELINE ARCHITECTURE</h4>
                  <div className="pipeline-scroll" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', width: '100%' }}>
                    {project.architecture.map((step, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 'max-content' }}>
                        <div style={{ padding: 'clamp(1rem, 2vw, 1.5rem)', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 600 }}>
                          {step}
                        </div>
                        {i < project.architecture.length - 1 && (
                          <div style={{ color: 'var(--border-color)', fontSize: '1.5rem' }}>→</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
          ))}
          
        </div>
      </div>
      
      <style>{`
        .pipeline-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .pipeline-scroll::-webkit-scrollbar-thumb {
          background-color: var(--border-color);
          border-radius: 4px;
        }
        
        .technical-grid {
          grid-template-columns: 1fr;
        }
        
        @media (min-width: 1024px) {
          .technical-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
};

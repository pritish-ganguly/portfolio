import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  { id: 'website', title: 'WEBSITE', desc: 'Your current platform is slow, hard to update, or fails to convert visitors into clients.', color: '#0066CC' },
  { id: 'ecommerce', title: 'E-COMMERCE', desc: 'You need a scalable storefront that handles complex catalogs and custom checkout flows.', color: '#10B981' },
  { id: 'automation', title: 'AUTOMATION', desc: 'Your team is wasting hours on manual data entry, repetitive emails, and disjointed systems.', color: '#F59E0B' },
  { id: 'ai', title: 'AI', desc: 'You have data and processes that could be optimized with machine learning, but lack the technical bridge.', color: '#8B5CF6' },
  { id: 'discovery', title: 'DISCOVERY', desc: 'You built a great product, but technical SEO issues are preventing search engines from finding it.', color: '#EC4899' },
  { id: 'systems', title: 'SYSTEMS', desc: 'Your infrastructure is fragile, downtime is frequent, and deployments are a manual nightmare.', color: '#06B6D4' }
];

export const TheProblem = () => {
  const [activeProblem, setActiveProblem] = useState(problems[0]);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--surface-main)' }}>
      <div className="container">
        <div className="problem-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow">02 / THE PROBLEM</span>
            <h2 className="heading-1" style={{ marginBottom: '1.5rem' }}>
              WHAT ARE YOU<br/>TRYING TO FIX?
            </h2>
            <p className="body-text" style={{ marginBottom: '3rem' }}>
              Projects should start with the problem, not the technology.<br/>
              The right solution depends on what needs to change,<br/>
              what already exists and what the experience needs to achieve.
            </p>
            
            <div className="visual-panel" style={{ 
              backgroundColor: 'var(--surface-elevated)', 
              borderRadius: '24px', 
              padding: '3rem', 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              border: '1px solid var(--border-color)',
              transition: 'all 0.5s ease',
              borderLeft: `4px solid ${activeProblem.color}`
            }}>
              <h3 className="heading-3" style={{ marginBottom: '1rem', color: activeProblem.color }}>{activeProblem.title}</h3>
              <p className="body-text" style={{ color: 'var(--text-primary)', fontSize: '1.25rem' }}>
                {activeProblem.desc}
              </p>
            </div>
          </div>
          
          <div className="interactive-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
            {problems.map((prob) => (
              <button 
                key={prob.id}
                onClick={() => setActiveProblem(prob)}
                onMouseEnter={() => setActiveProblem(prob)}
                style={{
                  textAlign: 'left',
                  padding: '2rem',
                  backgroundColor: activeProblem.id === prob.id ? 'var(--text-primary)' : 'transparent',
                  color: activeProblem.id === prob.id ? 'var(--bg-main)' : 'var(--text-secondary)',
                  borderRadius: '16px',
                  border: activeProblem.id === prob.id ? '1px solid transparent' : '1px solid var(--border-color)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>{prob.title}</span>
                {activeProblem.id === prob.id && <ArrowRight size={24} />}
              </button>
            ))}
          </div>
          
        </div>
      </div>
      
      <style>{`
        .problem-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        
        @media (min-width: 1024px) {
          .problem-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        @media (max-width: 1023px) {
          .visual-panel {
            margin-bottom: 2rem;
            min-height: 250px;
          }
        }
      `}</style>
    </section>
  );
};

import React from 'react';
import { Database, BrainCircuit, Wrench, PlaySquare, CheckCircle2 } from 'lucide-react';

export const Agents = () => {
  const concepts = [
    "AI Agents", "Agentic AI", "RAG", "AI workflows", 
    "AI assistants", "Knowledge systems", "Workflow automation", 
    "API automation", "Document processing"
  ];

  const flow = [
    { label: "KNOWLEDGE", icon: Database },
    { label: "REASONING", icon: BrainCircuit },
    { label: "TOOLS", icon: Wrench },
    { label: "ACTION", icon: PlaySquare },
    { label: "RESULT", icon: CheckCircle2 }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--surface-elevated)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="eyebrow">11 / AGENTS</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem' }}>
            AI THAT CAN ACT,<br/>NOT JUST ANSWER.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', maxWidth: '800px', margin: '0 auto' }}>
            {concepts.map((concept, i) => (
              <span key={i} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '99px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {concept}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ 
          padding: '4rem 2rem',
          backgroundColor: 'var(--surface-main)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem'
        }}>
          {flow.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '80px', height: '80px', 
                  borderRadius: '16px', 
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-primary)'
                }}>
                  <step.icon size={32} />
                </div>
                <span className="metadata">{step.label}</span>
              </div>
              
              {i < flow.length - 1 && (
                <div style={{ color: 'var(--border-color)', fontSize: '2rem', fontWeight: 200 }} className="hide-on-mobile">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Intelligence = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ai-project', {
        y: 40,
        opacity: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const technologies = [
    "Python", "Scikit-learn", "NLP", "TF-IDF", "Linear SVM", 
    "Random Forest", "GenAI", "LLMs", "RAG", "AI applications", "Security analytics"
  ];

  const emailPipeline = ["EMAIL", "PARSER", "TF-IDF", "LINEAR SVM", "THREAT ANALYSIS", "RISK SCORE"];
  const netopsPipeline = ["NETWORK TRAFFIC", "SCAPY", "FLOW COLLECTION", "RANDOM FOREST", "THREAT DETECTION", "RISK SCORE", "SECURITY ALERT"];

  return (
    <section ref={containerRef} className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        
        <div style={{ marginBottom: '4rem' }}>
          <span className="eyebrow">10 / INTELLIGENCE</span>
          <h2 className="heading-1" style={{ marginBottom: '1.5rem' }}>
            USE AI WHERE IT ACTUALLY HELPS.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', maxWidth: '800px' }}>
            {technologies.map((tech, i) => (
              <span key={i} style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '99px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* Project 1 */}
          <div className="ai-project" style={{ padding: '3rem', backgroundColor: 'var(--surface-elevated)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
            <span className="metadata" style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'block' }}>PROJECT</span>
            <h3 className="heading-2" style={{ marginBottom: '2rem' }}>EMAIL SECURITY AI</h3>
            <p className="body-text" style={{ marginBottom: '3rem', maxWidth: '80ch' }}>
              Deterministic security decisioning system that scans .eml files and direct email text, 
              extracting TF-IDF features classified by a Linear SVM to generate risk scores (0-100) 
              on a Streamlit dashboard.
            </p>
            
            <div className="pipeline-scroll" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
              {emailPipeline.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 'max-content' }}>
                  <div style={{ padding: '1rem 2rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
                    {step}
                  </div>
                  {i < emailPipeline.length - 1 && (
                    <div style={{ color: 'var(--text-secondary)' }}>→</div>
                  )}
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
              {["Python", "Scikit-learn", "NLP", "TF-IDF", "Linear SVM", "Streamlit"].map(t => (
                <span key={t} className="metadata" style={{ padding: '4px 8px', backgroundColor: 'rgba(29,29,31,0.05)', borderRadius: '4px' }}>{t}</span>
              ))}
            </div>
          </div>
          
          {/* Project 2 */}
          <div className="ai-project" style={{ padding: '3rem', backgroundColor: 'var(--surface-elevated)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
            <span className="metadata" style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'block' }}>PROJECT</span>
            <h3 className="heading-2" style={{ marginBottom: '2rem' }}>NETOPS AI SOC</h3>
            <p className="body-text" style={{ marginBottom: '3rem', maxWidth: '80ch' }}>
              Network monitoring and security operations platform combining Scapy-based network flow collection, 
              Random Forest ML detection, and rule-based risk scoring for incident management.
            </p>
            
            <div className="pipeline-scroll" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
              {netopsPipeline.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 'max-content' }}>
                  <div style={{ padding: '1rem 2rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
                    {step}
                  </div>
                  {i < netopsPipeline.length - 1 && (
                    <div style={{ color: 'var(--text-secondary)' }}>→</div>
                  )}
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
              {["Python", "Scapy", "Scikit-learn", "Random Forest", "Streamlit", "SQLite"].map(t => (
                <span key={t} className="metadata" style={{ padding: '4px 8px', backgroundColor: 'rgba(29,29,31,0.05)', borderRadius: '4px' }}>{t}</span>
              ))}
            </div>
          </div>
          
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
      `}</style>
    </section>
  );
};

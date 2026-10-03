import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, Loader2 } from 'lucide-react';

export const Contact = () => {
  const [startTime] = useState(() => Math.floor(Date.now() / 1000));
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Add start time for backend validation
    data.start_time = startTime.toString();
    
    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--surface-elevated)' }}>
      <div className="container">
        
        <div className="contact-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow">21 / LET'S TALK</span>
            <h2 className="heading-1" style={{ marginBottom: '2rem' }}>
              HAVE A PROBLEM<br/>WORTH SOLVING?
            </h2>
            <p className="body-text" style={{ marginBottom: '3rem' }}>
              Tell me what you're trying to build, improve,<br/>automate or figure out.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <span className="metadata" style={{ display: 'block', marginBottom: '0.25rem' }}>Email</span>
                  <a href="mailto:pritishganguly07@gmail.com" style={{ fontSize: '1.125rem', fontWeight: 500 }}>pritishganguly07@gmail.com</a>
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
          
          <div style={{ backgroundColor: 'var(--surface-main)', padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
            
            {status === 'success' ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Message sent.</h3>
                <p className="body-text">Thank you for reaching out. I'll get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className="btn-secondary" style={{ marginTop: '2rem' }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Honeypot field for bot protection */}
                <input type="text" name="website_url" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="form-group">
                    <label htmlFor="name" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>NAME *</label>
                    <input type="text" id="name" name="name" required style={inputStyle} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>EMAIL *</label>
                    <input type="email" id="email" name="email" required style={inputStyle} />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="form-group">
                    <label htmlFor="company" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>COMPANY</label>
                    <input type="text" id="company" name="company" style={inputStyle} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="budget" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>BUDGET</label>
                    <select id="budget" name="budget" style={inputStyle}>
                      <option value="">Select range...</option>
                      <option value="<$5k">&lt; $5k</option>
                      <option value="$5k-$10k">$5k - $10k</option>
                      <option value="$10k-$25k">$10k - $25k</option>
                      <option value="$25k+">$25k+</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="service" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>SERVICE REQUIRED *</label>
                  <select id="service" name="service" required style={inputStyle}>
                    <option value="">Select service...</option>
                    <option value="Web Development">Web Development</option>
                    <option value="AI / Automation">AI / Automation</option>
                    <option value="Infrastructure / Systems">Infrastructure / Systems</option>
                    <option value="UI / UX Design">UI / UX Design</option>
                    <option value="SEO / Growth">SEO / Growth</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>MESSAGE *</label>
                  <textarea id="message" name="message" required rows="5" style={{...inputStyle, resize: 'vertical'}}></textarea>
                </div>
                
                {status === 'error' && (
                  <div style={{ color: '#EF4444', fontSize: '0.875rem', fontWeight: 500, padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                    {errorMessage}
                  </div>
                )}
                
                <button type="submit" disabled={status === 'submitting'} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {status === 'submitting' ? (
                    <><Loader2 size={18} className="spin" /> SENDING...</>
                  ) : (
                    <><Send size={18} /> START A CONVERSATION</>
                  )}
                </button>
                
              </form>
            )}
            
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
        
        @media (max-width: 767px) {
          .contact-grid form > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  backgroundColor: 'var(--bg-main)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontFamily: 'inherit',
  fontSize: '1rem',
  transition: 'border-color 0.2s, box-shadow 0.2s'
};

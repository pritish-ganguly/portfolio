import React, { useState, useEffect } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

export const CURRENCIES = [
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'GBP', label: 'British Pound', symbol: '£' },
  { code: 'INR', label: 'Indian Rupee', symbol: '₹' },
  { code: 'AED', label: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'AUD', label: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', label: 'Canadian Dollar', symbol: 'C$' },
  { code: 'SGD', label: 'Singapore Dollar', symbol: 'S$' },
  { code: 'CHF', label: 'Swiss Franc', symbol: 'CHF' },
  { code: 'JPY', label: 'Japanese Yen', symbol: '¥' }
];

export const BUDGET_RANGES = {
  general: [
    "Under 5,000",
    "5,000 - 10,000",
    "10,000 - 25,000",
    "25,000 - 50,000",
    "50,000+"
  ],
  INR: [
    "Under 1,00,000",
    "1,00,000 - 3,00,000",
    "3,00,000 - 10,00,000",
    "10,00,000 - 25,00,000",
    "25,00,000+"
  ],
  JPY: [
    "Under 500,000",
    "500,000 - 1,000,000",
    "1,000,000 - 3,000,000",
    "3,000,000 - 5,000,000",
    "5,000,000+"
  ]
};

export const PROJECT_TYPES = [
  "Website / Web Development",
  "Web Application",
  "AI / ML Solution",
  "Automation",
  "E-commerce",
  "UI / UX",
  "Digital System",
  "Technical / Infrastructure",
  "Other"
];

export const ContactForm = ({ onSuccess }) => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [timestamp, setTimestamp] = useState('');
  
  const [currency, setCurrency] = useState('USD');
  const [budgetOptions, setBudgetOptions] = useState(BUDGET_RANGES.general);

  useEffect(() => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
  }, []);

  useEffect(() => {
    if (currency === 'INR') {
      setBudgetOptions(BUDGET_RANGES.INR);
    } else if (currency === 'JPY') {
      setBudgetOptions(BUDGET_RANGES.JPY);
    } else {
      setBudgetOptions(BUDGET_RANGES.general);
    }
  }, [currency]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Add timestamp
    data.timestamp = timestamp;
    
    // Check honeypot
    if (data.honeypot || data.website_url) {
      setStatus('success');
      if (onSuccess) onSuccess();
      return;
    }
    
    try {
      const response = await fetch('/portfolio/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      let result;
      const textResponse = await response.text();
      
      try {
        result = JSON.parse(textResponse);
      } catch (err) {
        if (response.status === 405 || response.status === 404 || textResponse.includes('<html')) {
          throw new Error('Frontend/API integration verified locally; live email delivery requires testing on the PHP-enabled Hostinger environment.');
        }
        throw new Error('Server returned an invalid response.');
      }
      
      if (result.success) {
        setStatus('success');
        form.reset();
        if (onSuccess) onSuccess();
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong while sending your message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to connect to the server. Please try again later.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    backgroundColor: 'var(--bg-main)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: 'inherit'
  };

  if (status === 'success') {
    return (
      <div className="contact-success" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
          <CheckCircle2 size={32} />
        </div>
        <h3 className="heading-3" style={{ marginBottom: '1rem' }}>THANK YOU.</h3>
        <p className="body-text" style={{ maxWidth: '35ch' }}>
          Your message has been sent successfully.<br/>
          I'll get back to you as soon as possible.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-secondary" style={{ marginTop: '2rem' }}>
          SEND ANOTHER
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="reusable-contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      
      {/* Honeypots */}
      <input type="text" name="website_url" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
      <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
      
      <div className="form-row" style={{ display: 'grid', gap: '1.5rem' }}>
        <div className="form-group">
          <label htmlFor="name" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>NAME *</label>
          <input type="text" id="name" name="name" required style={inputStyle} />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>EMAIL *</label>
          <input type="email" id="email" name="email" required style={inputStyle} />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="company" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>COMPANY / ORGANIZATION</label>
        <input type="text" id="company" name="company" style={inputStyle} />
      </div>
      
      <div className="form-group">
        <label htmlFor="projectType" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>PROJECT TYPE *</label>
        <select id="projectType" name="projectType" required style={{...inputStyle, cursor: 'pointer'}}>
          <option value="">Select project type...</option>
          {PROJECT_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <div className="form-row" style={{ display: 'grid', gap: '1.5rem' }}>
        <div className="form-group">
          <label htmlFor="currency" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>CURRENCY *</label>
          <select 
            id="currency" 
            name="currency" 
            required 
            style={{...inputStyle, cursor: 'pointer'}}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={`${c.code} - ${c.label}`}>
                {c.code} - {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="budget" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>BUDGET *</label>
          <select id="budget" name="budget" required style={{...inputStyle, cursor: 'pointer'}}>
            <option value="">Select budget range...</option>
            {budgetOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="message" className="metadata" style={{ display: 'block', marginBottom: '0.5rem' }}>MESSAGE *</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows="5" 
          placeholder="Tell me a little about your project, goals, timeline or what you'd like to improve."
          style={{...inputStyle, resize: 'vertical', minHeight: '120px'}}
        ></textarea>
      </div>
      
      {status === 'error' && (
        <div style={{ color: '#EF4444', fontSize: '0.875rem', fontWeight: 500, padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
          {errorMessage}
        </div>
      )}
      
      <button type="submit" disabled={status === 'submitting'} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
        {status === 'submitting' ? (
          <><Loader2 size={18} className="spin" /> SENDING...</>
        ) : (
          <><Send size={18} /> SEND MESSAGE</>
        )}
      </button>
      
      <style>{`
        .form-row {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }
        .reusable-contact-form select:focus, 
        .reusable-contact-form input:focus, 
        .reusable-contact-form textarea:focus {
          border-color: var(--accent) !important;
        }
      `}</style>
    </form>
  );
};

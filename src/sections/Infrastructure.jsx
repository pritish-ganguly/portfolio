import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const Infrastructure = () => {
  const visualRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && visualRef.current) {
      const nodes = visualRef.current.querySelectorAll('.net-node');
      
      const onMove = (e) => {
        const { left, top, width, height } = visualRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(nodes, {
          x: (i) => x * (i % 2 === 0 ? 15 : -10),
          y: (i) => y * (i % 3 === 0 ? 15 : -10),
          duration: 1,
          ease: 'power2.out'
        });
      };
      
      window.addEventListener('mousemove', onMove);
      return () => {
        window.removeEventListener('mousemove', onMove);
      };
    }
  }, []);

  const networkTech = [
    "TCP/IP", "LAN/WAN", "Routing", "Switching", "VLAN", "DHCP", "DNS", 
    "NAT", "VPN", "OSPF", "BGP", "Firewall", "Network monitoring"
  ];
  
  const securityTech = [
    "Threat detection", "Monitoring", "Risk scoring", "Security alerts", 
    "Incident management", "Application security", "Hardening", "Auditing"
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        
        <div style={{ marginBottom: '4rem' }}>
          <span className="eyebrow">13 / INFRASTRUCTURE</span>
          <h2 className="heading-1" style={{ marginBottom: '2rem' }}>
            BEYOND THE BROWSER.
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 className="heading-3" style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Networking</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {networkTech.map(t => <span key={t} className="metadata" style={{ padding: '4px 8px', backgroundColor: 'var(--surface-elevated)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>{t}</span>)}
              </div>
            </div>
            <div>
              <h3 className="heading-3" style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Security</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {securityTech.map(t => <span key={t} className="metadata" style={{ padding: '4px 8px', backgroundColor: 'var(--surface-elevated)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
        
        <div ref={visualRef} style={{ 
          width: '100%', 
          backgroundColor: 'var(--surface-elevated)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          padding: '4rem 2rem',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <svg viewBox="0 0 800 400" width="100%" style={{ maxWidth: '800px', overflow: 'visible' }}>
            {/* Lines */}
            <g stroke="var(--border-color)" strokeWidth="2" fill="none">
              <path d="M 400 50 L 400 120" />
              <path d="M 400 160 L 400 230" />
              <path d="M 400 270 L 400 340" />
              <path d="M 400 250 L 200 340" />
              <path d="M 400 250 L 600 340" />
              <path d="M 200 380 L 150 420" />
              <path d="M 200 380 L 250 420" />
            </g>
            
            {/* Nodes */}
            <g className="net-node">
              <rect x="340" y="30" width="120" height="40" rx="4" fill="var(--surface-main)" stroke="var(--accent)" strokeWidth="2" />
              <text x="400" y="55" fill="var(--text-primary)" fontSize="14" fontWeight="600" textAnchor="middle">INTERNET</text>
            </g>
            
            <g className="net-node">
              <rect x="350" y="120" width="100" height="40" rx="4" fill="var(--surface-main)" stroke="#FF5F56" strokeWidth="2" />
              <text x="400" y="145" fill="var(--text-primary)" fontSize="14" fontWeight="600" textAnchor="middle">FIREWALL</text>
            </g>
            
            <g className="net-node">
              <circle cx="400" cy="250" r="30" fill="var(--surface-main)" stroke="var(--border-color)" strokeWidth="2" />
              <text x="400" y="255" fill="var(--text-primary)" fontSize="12" fontWeight="600" textAnchor="middle">ROUTER</text>
            </g>
            
            <g className="net-node">
              <rect x="360" y="340" width="80" height="40" rx="4" fill="var(--surface-main)" stroke="var(--border-color)" strokeWidth="2" />
              <text x="400" y="365" fill="var(--text-primary)" fontSize="12" fontWeight="600" textAnchor="middle">VPN</text>
            </g>
            
            <g className="net-node">
              <rect x="160" y="340" width="80" height="40" rx="4" fill="var(--surface-main)" stroke="var(--border-color)" strokeWidth="2" />
              <text x="200" y="365" fill="var(--text-primary)" fontSize="12" fontWeight="600" textAnchor="middle">SWITCH</text>
            </g>
            
            <g className="net-node">
              <rect x="560" y="340" width="80" height="40" rx="4" fill="var(--surface-main)" stroke="var(--border-color)" strokeWidth="2" />
              <text x="600" y="365" fill="var(--text-primary)" fontSize="12" fontWeight="600" textAnchor="middle">SERVER</text>
            </g>
            
            <g className="net-node">
              <rect x="110" y="420" width="80" height="30" rx="4" fill="var(--bg-main)" stroke="var(--border-color)" strokeWidth="1" />
              <text x="150" y="440" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">VLAN 10</text>
            </g>
            
            <g className="net-node">
              <rect x="210" y="420" width="80" height="30" rx="4" fill="var(--bg-main)" stroke="var(--border-color)" strokeWidth="1" />
              <text x="250" y="440" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">VLAN 20</text>
            </g>
            
            {/* Protocols floating */}
            <text x="420" y="200" fill="var(--text-secondary)" fontSize="10" fontWeight="bold">BGP / OSPF</text>
            <text x="320" y="100" fill="var(--text-secondary)" fontSize="10" fontWeight="bold">NAT / DNS</text>
          </svg>
        </div>
        
      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';

const tickerItems = [
  'ROBOTICS & AUTOMATION', 'TURBO BLOWERS', 'ADAPTIVE OPTICS',
  'FANUC VACUUM PUMP', 'FIELD SERVICE', 'FIBER LASER UPGRADE',
  'CO₂ TO FIBER RETROFIT', 'REMANUFACTURING', 'AMC CONTRACTS', 'SPARES & CONSUMABLES',
];

function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div style={{ background: '#FFCC00', overflow: 'hidden', whiteSpace: 'nowrap', padding: '14px 0', borderTop: '2px solid rgba(0,0,0,0.08)', borderBottom: '2px solid rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'inline-flex', animation: 'tickerScroll 35s linear infinite', willChange: 'transform' }}>
        {items.map((item, i) => (
          <span key={i} style={{ fontFamily: 'var(--FH)', fontWeight: 900, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1a1a1a', padding: '0 30px', display: 'inline-flex', alignItems: 'center', gap: '28px' }}>
            {item}<span style={{ color: 'rgba(0,0,0,0.25)', fontSize: '8px' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Remanufacturing() {
  return (
    <div style={{ fontFamily: 'var(--FB)' }}>

      {/* ── HERO ── */}
      <section style={{ height: '40vh', minHeight: '300px', background: '#e8eaed', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px 0 20px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', height: '100%', borderRadius: '24px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/homeimage1.png.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(4px) brightness(0.45)', transform: 'scale(1.05)' }} />
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
            <h1 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(32px, 6vw, 70px)', fontWeight: 900, color: '#FFCC00', letterSpacing: '4px', lineHeight: 1, margin: 0, textShadow: '0 4px 30px rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>
              REMANUFACTURING
            </h1>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── CONTENT ── */}
      <section style={{ background: '#f0f2f5', padding: '90px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center' }}>
            <div className="rv" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
              <img src="/homeinage3.png.jpg" alt="Laser Reconditioning" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div className="rv d1">
              <div style={{ display: 'inline-block', background: '#1a1a1a', color: '#FFCC00', fontFamily: 'var(--FH)', fontSize: '11px', fontWeight: 900, letterSpacing: '3px', padding: '6px 16px', borderRadius: '4px', marginBottom: '20px', textTransform: 'uppercase' }}>
                Remanufacturing Excellence
              </div>
              <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, color: '#1a1a1a', marginBottom: '24px', lineHeight: 1.1 }}>
                Laser <span style={{ color: '#FFCC00' }}>Reconditioning</span>
              </h2>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                Laser Experts India created the Laser Reconditioning process to restore your laser to “Like New” condition. Over time, dust from the aging discharge system contaminates the laser causing shorter component life and a reduction in cut quality and speed.
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                Only Laser Experts India has the experience necessary to disassemble any resonator, clean it completely and reassemble it correctly all the time. Laser Experts India developed the processes and special tools necessary not only to ensure correct installation, but also takes better measures to prevent known failures.
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9 }}>
                By performing the Periodic maintenance regularly, customers benefit from “Like New” beam quality and longer optics, blower, power supply, vacuum pump, and lens life. Customers will also see a reduction in power usage and assist gas consumption.
              </p>
              <div style={{ marginTop: '36px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-y">Get a Quote</Link>
                <Link to="/contact" className="btn-dk">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 CARDS ── */}
      <section style={{ background: '#e8eaed', padding: '90px 0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-block', background: '#1a1a1a', color: '#FFCC00', fontFamily: 'var(--FH)', fontSize: '11px', fontWeight: 900, letterSpacing: '3px', padding: '6px 16px', borderRadius: '4px', marginBottom: '18px', textTransform: 'uppercase' }}>
              Precision Remanufacturing
            </div>
            <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1 }}>
              The <span style={{ color: '#FFCC00' }}>Reconditioning Process</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="#FFCC00" strokeWidth="3" fill="none"/>
                    <path d="M20 32c0-6.6 5.4-12 12-12s12 5.4 12 12-5.4 12-12 12" stroke="#FFCC00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <circle cx="32" cy="32" r="4" fill="#FFCC00"/>
                  </svg>
                ),
                title: 'System Contamination',
                desc: 'Over time, dust from the aging discharge system contaminates the laser causing shorter component life and a reduction in cut quality and speed.',
                featured: false,
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
                    <rect x="12" y="12" width="40" height="40" rx="6" stroke="#FFCC00" strokeWidth="3" fill="none"/>
                    <path d="M22 32h20M32 22v20" stroke="#FFCC00" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Specialized Expertise',
                desc: 'Only Laser Experts India has the experience to disassemble any resonator, clean it completely, and reassemble it correctly using specialized tools developed to prevent known failures.',
                featured: true,
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
                    <path d="M12 48l14-20 10 14 8-22 8 28" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                ),
                title: 'Efficiency & Longevity',
                desc: 'Benefit from “Like New” beam quality and longer optics, blower, and vacuum pump life, while seeing a reduction in power usage and gas consumption.',
                featured: false,
              },
            ].map((card, i) => (
              <div key={i} className="rv" style={{ background: '#fff', borderRadius: '16px', padding: '48px 36px', textAlign: 'center', boxShadow: card.featured ? '0 8px 40px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.06)', border: card.featured ? '2px solid #FFCC00' : '1px solid #e8e8e8', transform: card.featured ? 'translateY(-8px)' : 'none', transition: 'all 0.35s ease', cursor: 'default' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = '#FFCC00'; }} onMouseLeave={e => { e.currentTarget.style.transform = card.featured ? 'translateY(-8px)' : 'none'; e.currentTarget.style.boxShadow = card.featured ? '0 8px 40px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = card.featured ? '#FFCC00' : '#e8e8e8'; }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255, 204, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  {card.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--FH)', fontSize: '20px', fontWeight: 900, color: '#1a1a1a', marginBottom: '16px', lineHeight: 1.2 }}>{card.title}</h3>
                <p style={{ fontFamily: 'var(--FS)', fontSize: '14px', color: '#666', lineHeight: 1.8, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#1a1a1a', padding: '70px 0', textAlign: 'center' }}>
        <div className="wrap">
          <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 900, color: '#fff', marginBottom: '20px' }}>
            Eliminate Machine Downtime – <span style={{ color: '#FFCC00' }}>Today</span>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', alignItems: 'center', marginTop: '36px' }}>
            <a href="tel:+917305054043" style={{ fontFamily: 'var(--FH)', fontSize: '18px', fontWeight: 900, color: '#FFCC00', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-phone-alt" /> +91 73050 54043
            </a>
            <Link to="/contact" className="btn-y" style={{ fontSize: '12px', padding: '14px 32px' }}>✉ Email Us Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Remanufacturing;

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

function OEM() {
  return (
    <div style={{ fontFamily: 'var(--FB)' }}>

      <section style={{ position: 'relative', height: 'calc(100vh - 130px)', minHeight: '480px', background: '#0a0a0a', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/homeimage1.png.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(4px) brightness(0.45)', transform: 'scale(1.05)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
          <h1 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(42px, 8vw, 100px)', fontWeight: 900, color: '#FFCC00', letterSpacing: '4px', lineHeight: 1, margin: 0, textShadow: '0 4px 30px rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>
            INTERNAL AND OEM
          </h1>
        </div>
      </section>

      <Ticker />

      <section style={{ background: '#e8eaed', padding: '90px 0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1 }}>
              Mirror Failure <span style={{ color: '#FFCC00' }}>Analysis</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              {
                title: 'Mirror Contamination',
                desc: 'Black discoloration or \'whitish smoke\' indicates water leakage from the mount or moisture in the beam purge.',
                featured: false,
              },
              {
                title: 'Beam Alignment Failure',
                desc: 'Beams not parallel through one or more axis can strike the lens holder, causing catastrophic failure.',
                featured: true,
              },
              {
                title: 'Beam Mode',
                desc: 'Neglecting cleaning every 3000 to 4000 hours leaves permanent dust residue on internal mirrors.',
                featured: false,
              },
            ].map((card, i) => (
              <div key={i} className="rv" style={{ background: '#fff', borderRadius: '16px', padding: '48px 36px', textAlign: 'center', boxShadow: card.featured ? '0 8px 40px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.06)', border: card.featured ? '2px solid #FFCC00' : '1px solid #e8e8e8', transform: card.featured ? 'translateY(-8px)' : 'none', transition: 'all 0.35s ease', cursor: 'default' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = '#FFCC00'; }} onMouseLeave={e => { e.currentTarget.style.transform = card.featured ? 'translateY(-8px)' : 'none'; e.currentTarget.style.boxShadow = card.featured ? '0 8px 40px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = card.featured ? '#FFCC00' : '#e8e8e8'; }}>
                <h3 style={{ fontFamily: 'var(--FH)', fontSize: '20px', fontWeight: 900, color: '#1a1a1a', marginBottom: '16px', lineHeight: 1.2 }}>{card.title}</h3>
                <p style={{ fontFamily: 'var(--FS)', fontSize: '15px', color: '#666', lineHeight: 1.8, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#f0f2f5', padding: '90px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center' }}>
            <div className="rv" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
              <img src="/oem-img.webp" alt="OEM Component Support" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div className="rv d1">
              <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, color: '#1a1a1a', marginBottom: '24px', lineHeight: 1.1 }}>
                The <span style={{ color: '#FFCC00' }}>Ultra Clean Method</span>
              </h2>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                Our special refurbishment technique removes the contamination and extends the optics life and thus reducing the customer’s maintenance cost. 
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                Periodic ULTRA-Cleaning of Discharge tubes prevents further deterioration of mirrors and ensure the quality BEAM DELIVERY LIKE NEW as always.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#1a1a1a', padding: '70px 0', textAlign: 'center' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
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

export default OEM;

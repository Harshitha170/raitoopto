import React, { useState } from 'react';
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

function TurboBlower() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ fontFamily: 'var(--FB)' }}>
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', padding: '20px' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '600px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <div style={{ background: '#0a0a0a', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5 style={{ fontFamily: 'var(--FH)', margin: 0, color: '#FFCC00', fontSize: '18px', fontWeight: 900, letterSpacing: '1px' }}>TURBO BLOWER</h5>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>
            <div style={{ padding: '30px', background: '#fff' }}>
              <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '2px', fontWeight: 700, color: '#FFCC00', marginBottom: '16px', background: '#1a1a1a', padding: '4px 10px', width: 'max-content', borderRadius: '4px' }}>ABOUT TURBO BLOWER</label>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '15px', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
                The turbo blower is not designed to withstand pressurization. If the oscillator is not stopped with the correct procedure, the pressure in the vacuum chamber in the oscillator becomes lower than atmosphere.
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '15px', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
                Opening the oil inlet under such a condition lets air enter the turbo blower. This flow of gas causes oil mist to enter the vacuum chamber of the oscillator, resulting in contamination of internal mirrors.
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '15px', color: '#444', lineHeight: 1.8, margin: 0 }}>
                Always contact LASER EXPERTS INDIA professionals to assist you to carry out your Laser cutting machine maintenance to prevent abnormal discharge.
              </p>
            </div>
          </div>
        </div>
      )}

      <section style={{ position: 'relative', height: 'calc(100vh - 130px)', minHeight: '480px', background: '#0a0a0a', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/homeimage1.png.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(4px) brightness(0.45)', transform: 'scale(1.05)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
          <h1 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(42px, 8vw, 100px)', fontWeight: 900, color: '#FFCC00', letterSpacing: '4px', lineHeight: 1, margin: 0, textShadow: '0 4px 30px rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>
            TURBO BLOWER
          </h1>
        </div>
      </section>

      <Ticker />

      <section style={{ background: '#f0f2f5', padding: '90px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center' }}>
            <div className="rv" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
              <img src="/turboblower1.webp" alt="Turbo Blower" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div className="rv d1">
              <div style={{ display: 'inline-block', background: '#1a1a1a', color: '#FFCC00', fontFamily: 'var(--FH)', fontSize: '11px', fontWeight: 900, letterSpacing: '3px', padding: '6px 16px', borderRadius: '4px', marginBottom: '20px', textTransform: 'uppercase' }}>
                Ensure Maximum Performance
              </div>
              <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, color: '#1a1a1a', marginBottom: '24px', lineHeight: 1.1 }}>
                Turbo Bowler <span style={{ color: '#FFCC00' }}>Reconditioning</span>
              </h2>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                Ensures Maximum Performance Turbo Bowler Laser Experts India specializes in the complete reconditioning of turbo blowers for your laser system. Our process includes a detailed inspection, cleaning, and replacing critical components to restore efficient operation and extend tool life.
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9 }}>
                We use only the highest quality bearings and seals, ensuring that your turbo blower performs at its best, reducing downtime and maintaining precision cutting quality.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
                <button onClick={() => setShowModal(true)} className="btn-y" style={{ background: '#1a1a1a', color: '#FFCC00', border: '1px solid #1a1a1a', cursor: 'pointer' }}>View Technical Requirements</button>
                <Link to="/contact" className="btn-y">Get a Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="technical" style={{ background: '#e8eaed', padding: '90px 0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-block', background: '#1a1a1a', color: '#FFCC00', fontFamily: 'var(--FH)', fontSize: '11px', fontWeight: 900, letterSpacing: '3px', padding: '6px 16px', borderRadius: '4px', marginBottom: '18px', textTransform: 'uppercase' }}>
              PRECISION COMPONENTS
            </div>
            <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1 }}>
              Supported <span style={{ color: '#FFCC00' }}>Models</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { title: 'A04B-0800-C017, C009', desc: 'Models: C1000E, C1000i-C' },
              { title: 'A04B-0800-C019, C011', desc: 'Models: C2000E, C2000iB, C2000i-C', featured: true },
              { title: 'A04B-0800-C025, C015', desc: 'Models: C4000E, C4000iB, C6000i-C' },
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
            <div className="rv d1">
              <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, color: '#1a1a1a', marginBottom: '24px', lineHeight: 1.1 }}>
                Custom Component <span style={{ color: '#FFCC00' }}>Analysis</span>
              </h2>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                If the oscillator is not stopped with the correct procedure, the pressure in the vacuum chamber in the oscillator becomes lower than atmosphere. Opening the oil inlet under such a condition lets air enter the turbo blower. This flow of gas causes oil mist to enter the vacuum chamber of the oscillator, resulting in contamination of internal mirrors.
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                If you do not conduct “Support function for start-up after turbo oil exchange“ after replacing the turbo blower oil, abnormal discharge may occur, which can become a cause of the trouble.
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                To avoid such kind of troubles always contact LASER EXPERTS INDIA professionals to assist you to carry out your Laser cutting machine maintenance.
              </p>
              <div style={{ display: 'flex', gap: '20px', fontFamily: 'var(--FH)', fontSize: '14px', fontWeight: 900, color: '#1a1a1a' }}>
                 <span>✓ 100% Precision</span>
                 <span>✓ OEM Standards</span>
              </div>
            </div>
            <div className="rv" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
              <img src="/turbo-diagram2.webp" alt="Turbo Diagram" style={{ width: '100%', height: 'auto', display: 'block' }} />
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

export default TurboBlower;

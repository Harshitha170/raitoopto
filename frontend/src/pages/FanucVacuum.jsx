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

function FanucVacuum() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ fontFamily: 'var(--FB)' }}>
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', padding: '20px' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '600px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <div style={{ background: '#0a0a0a', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5 style={{ fontFamily: 'var(--FH)', margin: 0, color: '#FFCC00', fontSize: '18px', fontWeight: 900, letterSpacing: '1px' }}>FANUC VACUUM PUMP</h5>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>
            <div style={{ padding: '30px', background: '#fff' }}>
              <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '2px', fontWeight: 700, color: '#FFCC00', marginBottom: '16px', background: '#1a1a1a', padding: '4px 10px', width: 'max-content', borderRadius: '4px' }}>ABOUT VACUUM PUMP</label>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '15px', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
                Your RESONATOR Vacuum pump needs a reconditioning or replacement once in every 10000 Hours. We provide complete SEAL KIT replacement which makes the pump work like new.
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '15px', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
                Genuine OEM provided spare parts like OIL, FILTER etc ensures best working condition of your machine. Vacuum pump condition directly affects beam delivery mechanisms and overall laser stability.
              </p>
            </div>
          </div>
        </div>
      )}

      <section style={{ position: 'relative', height: 'calc(100vh - 130px)', minHeight: '480px', background: '#0a0a0a', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/homeimage1.png.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(4px) brightness(0.45)', transform: 'scale(1.05)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
          <h1 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(36px, 7vw, 90px)', fontWeight: 900, color: '#FFCC00', letterSpacing: '4px', lineHeight: 1, margin: 0, textShadow: '0 4px 30px rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>
            FANUC VACUUM PUMP
          </h1>
        </div>
      </section>

      <Ticker />

      <section style={{ background: '#f0f2f5', padding: '90px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center' }}>
            <div className="rv" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
              <img src="/fanuc-img1.webp" alt="Fanuc Vacuum Pump" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div className="rv d1">
              <div style={{ display: 'inline-block', background: '#1a1a1a', color: '#FFCC00', fontFamily: 'var(--FH)', fontSize: '11px', fontWeight: 900, letterSpacing: '3px', padding: '6px 16px', borderRadius: '4px', marginBottom: '20px', textTransform: 'uppercase' }}>
                Ensures Maximum Performance
              </div>
              <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, color: '#1a1a1a', marginBottom: '24px', lineHeight: 1.1 }}>
                Fanuc Vacuum Pump <span style={{ color: '#FFCC00' }}>Reconditioning</span>
              </h2>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                Your resonator vacuum pump needs a reconditioning once in every 10,000 hours. We provide complete seal kit replacement which makes the pump work like new.
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                Our standardized recondition facility and test setup ensures a cent percent quality check before handing over to the customer. Genuine oem provided spare parts like oil, filter and others will ensure best working condition of your machine.  Lei has replaced 200 or more vacuum pumps all over india.
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '15px', fontWeight: 700, color: '#d32f2f', lineHeight: 1.5, marginBottom: '24px', padding: '16px', background: 'rgba(211,47,47,0.05)', borderRadius: '8px' }}>
                Check for gas output within 1 minute of startup to prevent reverse rotation.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <button onClick={() => setShowModal(true)} className="btn-y" style={{ background: '#1a1a1a', color: '#FFCC00', border: '1px solid #1a1a1a', cursor: 'pointer' }}>View Technical Requirements</button>
                <Link to="/contact" className="btn-y">Get a Quote</Link>
              </div>

              <div style={{ display: 'inline-block', background: 'transparent', border: '1px solid #1a1a1a', color: '#1a1a1a', fontFamily: 'var(--FH)', fontSize: '12px', fontWeight: 900, letterSpacing: '1px', padding: '6px 16px', borderRadius: '4px' }}>
                OEM Part Number: A90L-0001-0425
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="technical" style={{ background: '#e8eaed', padding: '90px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center' }}>
            <div className="rv d1">
              <div style={{ display: 'inline-block', background: '#1a1a1a', color: '#FFCC00', fontFamily: 'var(--FH)', fontSize: '11px', fontWeight: 900, letterSpacing: '3px', padding: '6px 16px', borderRadius: '4px', marginBottom: '20px', textTransform: 'uppercase' }}>
                Exhaust Pump Filter
              </div>
              <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, color: '#1a1a1a', marginBottom: '16px', lineHeight: 1.1 }}>
                OEM Filter <span style={{ color: '#FFCC00' }}>Service</span>
              </h2>
              <div style={{ marginBottom: '24px', fontFamily: 'var(--FH)', fontSize: '14px', fontWeight: 900, letterSpacing: '1px', color: '#666' }}>
                Model: A98L-0001-0911
              </div>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                Your RESONATOR Vacuum pump needs a reconditioning or replacement once in every 10000 Hours. We provide complete SEAL KIT replacement which makes the pump work like new. 
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                Our standardized Recondition Facility and test setup ensures 100% Quality check before handing over to the customer. Genuine OEN provided spare parts like OIL, FILTER etc ensures best working condition of your machine. 
              </p>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '28px' }}>
                LEI has replaced more than 200 Vacuum pumps all over India and middle east countries. We provide 12000 Hours warranty for all our refurbished vacuum pumps all over the world.
              </p>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
                {['10k Service Hour', '200+ Replacements', '12k Warranty'].map((stat, i) => (
                  <div key={i} style={{ background: '#fff', border: '1px solid #e0e0e0', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', fontFamily: 'var(--FH)', fontWeight: 900, color: '#1a1a1a' }}>
                    <span style={{ color: '#FFCC00', marginRight: '6px' }}>✓</span> {stat}
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '13px', color: '#888', fontStyle: 'italic', fontFamily: 'var(--FS)' }}>
                *We provide complete SEAL KIT replacements and 100% Quality Checks before customer delivery.*
              </div>
            </div>
            <div className="rv" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
              <img src="/fanuc-diagram2.webp" alt="Fanuc Diagram" style={{ width: '100%', height: 'auto', display: 'block' }} />
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

export default FanucVacuum;

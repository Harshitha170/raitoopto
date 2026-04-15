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

function AdaptiveOptics() {
  return (
    <div style={{ fontFamily: 'var(--FB)' }}>

      <section style={{ height: '40vh', minHeight: '300px', background: '#e8eaed', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px 0 20px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', height: '100%', borderRadius: '24px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/homeimage1.png.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(4px) brightness(0.45)', transform: 'scale(1.05)' }} />
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
            <h1 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(32px, 6vw, 70px)', fontWeight: 900, color: '#FFCC00', letterSpacing: '4px', lineHeight: 1, margin: 0, textShadow: '0 4px 30px rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>
              ADAPTIVE OPTICS
            </h1>
          </div>
        </div>
      </section>

      <Ticker />

      <section style={{ background: '#f0f2f5', padding: '90px 0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', paddingBottom: '60px' }}>
            <div style={{ display: 'inline-block', background: '#1a1a1a', color: '#FFCC00', fontFamily: 'var(--FH)', fontSize: '11px', fontWeight: 900, letterSpacing: '3px', padding: '6px 16px', borderRadius: '4px', marginBottom: '20px', textTransform: 'uppercase' }}>
              Failure Analysis
            </div>
            <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, color: '#1a1a1a', marginBottom: '24px', lineHeight: 1.1 }}>
              Adaptive Optics <span style={{ color: '#FFCC00' }}>(AO)</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div style={{ background: '#fff', padding: '24px 32px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderLeft: '4px solid #FFCC00' }}>
                <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.8, margin: 0 }}>
                  <strong>Mirror Contamination:</strong> Black discoloration often indicates water leakage from the mount or moisture in the beam purge.
                </p>
              </div>
              <div style={{ background: '#fff', padding: '24px 32px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderLeft: '4px solid #1a1a1a' }}>
                <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.8, margin: 0 }}>
                  <strong>Improper cleaning</strong> with tissue paper, acetone, or ethanol will gradually damage the coating.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#e8eaed', padding: '90px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) minmax(400px, 1.2fr)', gap: '60px', alignItems: 'center' }}>
            
            {/* TEXT */}
            <div className="rv d1">
              <div style={{ display: 'inline-block', background: '#1a1a1a', color: '#FFCC00', fontFamily: 'var(--FH)', fontSize: '11px', fontWeight: 900, letterSpacing: '3px', padding: '6px 16px', borderRadius: '4px', marginBottom: '20px', textTransform: 'uppercase' }}>
                The Ultra Clean Method
              </div>
              <h2 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900, color: '#1a1a1a', marginBottom: '24px', lineHeight: 1.1 }}>
                After <span style={{ color: '#FFCC00' }}>Refurbishment</span>
              </h2>
              <p style={{ fontFamily: 'var(--FS)', fontSize: '16px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                Our unique reconditioning method restores the original optical properties. The ULTRA CLEAN process ensures your AO mirror works like new, saving you 75% to 85% on maintenance costs.
              </p>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px', marginTop: '24px' }}>
                <div style={{ background: '#fff', border: '1px solid #FFCC00', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', fontFamily: 'var(--FH)', fontWeight: 900, color: '#1a1a1a', boxShadow: '0 4px 15px rgba(255,204,0,0.15)' }}>
                  85% Cost Savings
                </div>
                <div style={{ background: '#fff', border: '1px solid #1a1a1a', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', fontFamily: 'var(--FH)', fontWeight: 900, color: '#1a1a1a', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                  4,000h Service Interval
                </div>
              </div>

              <Link to="/contact" className="btn-dk" style={{ padding: '14px 32px' }}>Technical Details</Link>
            </div>

            {/* IMAGES */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div className="rv" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <img src="/adaptive-1.webp" alt="Adaptive Optics 1" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '200px' }} />
              </div>
              <div className="rv" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <img src="/adaptive2.webp" alt="Adaptive Optics 2" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '200px' }} />
              </div>
              <div className="rv" style={{ gridColumn: 'span 2', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <img src="/adaptive-3.webp" alt="Adaptive Optics 3" style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '280px', objectFit: 'cover' }} />
              </div>
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

export default AdaptiveOptics;

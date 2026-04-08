import React, { useState } from 'react';

// Linking exact images from the reference site based on standard naming
const SOURCES = [
  { title: 'IPG',          subtitle: 'Fiber Laser Source', img: '/ipg.webp' },
  { title: 'MAX',          subtitle: 'Laser Source',       img: '/max.webp' },
  { title: 'Raycus',       subtitle: 'Fiber Laser',        img: '/raycus.webp' },
  { title: 'Pulse',        subtitle: 'Laser',              img: '/pulse.webp' },
  { title: 'UV Laser',     subtitle: 'Marking Source',     img: '/uv-laser.webp' },
  { title: 'RF Co₂ Laser', subtitle: 'Laser Source',       img: '/rf-co2.webp' },
];

function Brands() {
  const [hoveredSource, setHoveredSource] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const hoveredIndex = SOURCES.findIndex(s => s.title === hoveredSource);
  const isLeftAligned = hoveredIndex >= 4; // Last two boxes (UV Laser, RF Co2)

  return (
    <section className="brands-sec sp" style={{ background: '#0a0a0a', padding: '120px 0', overflow: 'hidden', position: 'relative' }} onMouseMove={handleMouseMove}>
      
      {/* Floating Reveal Image Container - Hidden on mobile/tablet for better UX */}
      <div 
        className="floating-hover-reveal"
        style={{ 
          position: 'fixed',
          left: mousePos.x + (isLeftAligned ? -50 : 150),
          top: mousePos.y,
          transform: `translate(${isLeftAligned ? '-100%' : '0'}, -50%) scale(${hoveredSource ? 1 : 0})`,
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease, left 0.1s linear, top 0.1s linear',
          opacity: hoveredSource ? 1 : 0,
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '5px solid rgba(255,255,255,0.1)'
        }}
      >
        {hoveredSource && (
          <img 
            src={SOURCES[hoveredIndex]?.img} 
            alt={hoveredSource} 
            key={hoveredSource}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      <div className="wrap">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div style={{ display: 'inline-block', background: '#1a1a1a', color: '#FFCC00', fontFamily: 'var(--FH)', fontSize: '13px', fontWeight: 900, letterSpacing: '4px', padding: '8px 20px', borderRadius: '4px', marginBottom: '20px', textTransform: 'uppercase' }}>
            TRUSTED PARTNERS
          </div>
          <h2 style={{ color: '#fff', fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 900, fontFamily: 'var(--FH)', textTransform: 'uppercase', letterSpacing: '2px' }}>
             Brands We Service & Repairs
          </h2>
        </div>

        {/* 6 BOXES WHITE STRIP GRID (Exactly like the screenshot) */}
        <div className="brands-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(6, 1fr)', 
          background: '#fff',
          maxWidth: '100%',
          width: '100%'
        }}>
          {SOURCES.map((source, idx) => (
            <div 
              key={idx} 
              className="source-box"
              style={{
                background: 'transparent',
                borderRight: idx < 5 ? '1px solid #eaeaea' : 'none',
                minHeight: '220px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '20px',
                position: 'relative'
              }}
              onMouseEnter={() => setHoveredSource(source.title)}
              onMouseLeave={() => setHoveredSource(null)}
            >
              {/* MOBILE IMAGE (Show only on phone/tablet) */}
              <div className="mobile-source-img" style={{ display: 'none', marginBottom: '15px' }}>
                <img src={source.img} alt={source.title} style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '50%', border: '1px solid #eee' }} />
              </div>

              <h3 style={{ fontFamily: 'var(--FH)', fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 900, color: '#000', margin: '10px 0 10px', textTransform: 'uppercase' }}>
                {source.title}
              </h3>
              <p style={{ fontFamily: 'var(--FS)', fontSize: 'clamp(9px, 1vw, 11px)', color: '#999', margin: 0, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                {source.subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .source-box {
          transition: background 0.3s ease;
        }
        .source-box:hover {
          background: #fdfdfd !important;
        }
        @media (max-width: 1024px) {
           .floating-hover-reveal { display: none !important; }
           .mobile-source-img { display: block !important; }
        }
        @media (max-width: 960px) {
           .brands-grid {
              grid-template-columns: repeat(3, 1fr) !important;
           }
           .source-box:nth-child(3n) {
              border-right: none !important;
           }
           .source-box {
              border-bottom: 1px solid #eaeaea !important;
           }
        }
        @media (max-width: 600px) {
           .brands-grid {
              grid-template-columns: repeat(2, 1fr) !important;
           }
           .source-box:nth-child(even) {
              border-right: none !important;
              border-bottom: 1px solid #eaeaea !important;
           }
           .source-box:nth-child(n) {
              border-right: 1px solid #eaeaea;
           }
           .source-box:last-child {
               border-bottom: none !important;
           }
           .source-box:nth-last-child(2) {
               border-bottom: none !important;
           }
        }
      `}</style>
    </section>
  );
}

export default Brands;

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { network } from "../../data/siteData";

function GlobalWings() {
  const { t } = useTranslation();
  const wings = network;

  return (
    <section className="wings-sec sp" style={{ backgroundColor: '#0A0A0C', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background glow */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255,239,0,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255,239,0,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>

      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "80px", flexWrap: "wrap", gap: "30px", position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: "600px" }}>
            <div className="stag rv" style={{ marginBottom: "16px", color: 'var(--Y)', letterSpacing: '4px', fontWeight: 900 }}>EXTENDING OUR REACH</div>
            <h2 className="sh rv" style={{ fontSize: "clamp(32px, 5vw, 48px)", margin: 0, color: "#fff", fontWeight: 900 }}>
              Our Global <span className="yl">Wings</span>
            </h2>
          </div>
          <p className="bd rv" style={{ maxWidth: "450px", margin: 0, color: "rgba(255,255,255,0.5)", fontSize: '16px', lineHeight: 1.8 }}>
            A unified network of excellence—supporting heavy industries and manufacturing hubs across the globe with specialized laser expertise.
          </p>
        </div>

        <div className="wings-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', position: 'relative', zIndex: 1 }}>
          {wings.map((wing, i) => (
            <div 
              key={i} 
              className="rv" 
              style={{ 
                background: "rgba(255,255,255,0.03)",
                backdropFilter: 'blur(10px)',
                padding: "60px 45px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
                cursor: "pointer",
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = 'rgba(255,239,0,0.3)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.4)';
                e.currentTarget.querySelector('.wing-glow').style.opacity = '1';
                e.currentTarget.querySelector('.wing-img').style.transform = 'scale(1.1) rotate(-3deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.querySelector('.wing-glow').style.opacity = '0';
                e.currentTarget.querySelector('.wing-img').style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              {/* Internal Glow Effect */}
              <div className="wing-glow" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,239,0,0.08), transparent 70%)', transition: '0.4s', opacity: 0 }}></div>

              <div style={{ display: "flex", alignItems: "center", gap: "25px", marginBottom: "35px", position: 'relative', zIndex: 2 }}>
                <div 
                  style={{ 
                    width: "80px", height: "80px", background: "rgba(0,0,0,0.3)", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.5s ease"
                  }}
                  className="wing-img-wrap"
                >
                  {wing.logo ? (
                    <img src={wing.logo} alt={wing.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "12px", transition: '0.5s' }} className="wing-img" />
                  ) : (
                    <span style={{ fontSize: '32px' }}>{wing.icon}</span>
                  )}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--FH)", fontSize: "22px", fontWeight: 900, color: "#fff", margin: '0 0 5px', letterSpacing: '1px' }}>
                    {wing.name}
                  </h3>
                  <div style={{ width: '40px', height: '2px', background: 'var(--Y)' }}></div>
                </div>
              </div>
              
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "45px", minHeight: "70px", position: 'relative', zIndex: 2 }}>
                {wing.desc}
              </p>
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                {wing.link.startsWith("http") ? (
                  <a href={wing.link} target="_blank" rel="noopener noreferrer" 
                     style={{ 
                       display: "inline-flex", alignItems: "center", gap: "10px", fontWeight: 900, 
                       color: "var(--Y)", textDecoration: "none", fontSize: "12px", textTransform: "uppercase", 
                       letterSpacing: "3px", transition: "all 0.3s" 
                     }}>
                    EXPLORE NETWORK <span style={{ fontSize: '18px' }}>→</span>
                  </a>
                ) : (
                  <Link to={wing.link} 
                        style={{ 
                          display: "inline-flex", alignItems: "center", gap: "10px", fontWeight: 900, 
                          color: "var(--Y)", textDecoration: "none", fontSize: "12px", textTransform: "uppercase", 
                          letterSpacing: "3px", transition: "all 0.3s" 
                        }}>
                    EXPLORE NETWORK <span style={{ fontSize: '18px' }}>→</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GlobalWings;


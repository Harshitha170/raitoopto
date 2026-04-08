import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { testimonials } from '../../data/siteData';

function Testimonials() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = dir === 'l' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="testi-sec" style={{ position: "relative", overflow: "hidden" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "50px" }}>
          <div>
            <div className="stag rv">{t('reviews.tag', 'Client Reviews')}</div>
            <h2 className="sh rv">{t('reviews.title1', 'What Our')} <span className="yl">{t('reviews.title2', 'Clients Say')}</span></h2>
          </div>
          <div className="testi-nav rv" style={{ display: "flex", gap: "10px" }}>
             <button onClick={() => scroll('l')} className="btn-dk" style={{ padding: "12px", borderRadius: "50%", width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Previous"><i className="fas fa-chevron-left"></i></button>
             <button onClick={() => scroll('r')} className="btn-dk" style={{ padding: "12px", borderRadius: "50%", width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Next"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
        
        <div className="testi-scroll-container" ref={scrollRef} style={{ display: "flex", gap: "30px", overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: "30px", msOverflowStyle: "none", scrollbarWidth: "none" }}>
          {testimonials.map((testi, idx) => (
            <div className="tc rv" key={idx} style={{ 
              flex: "0 0 380px", scrollSnapAlign: "start", height: "auto", minHeight: "360px", 
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
              padding: "40px", borderRadius: "20px", border: "1px solid #e2e2d8",
              boxShadow: "0 20px 40px rgba(0,0,0,0.05)", position: "relative",
              transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "pointer"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-8px)"; e.currentTarget.style.boxShadow="0 25px 50px rgba(0,0,0,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 20px 40px rgba(0,0,0,0.05)"; }}
            >
              {/* Huge background quote mark */}
              <div style={{ position: 'absolute', top: 10, right: 20, fontSize: '120px', fontFamily: 'serif', color: 'rgba(255,239,0,0.15)', lineHeight: 1, userSelect: 'none', zIndex: 0 }}>
                "
              </div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="tc-stars" style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(testi.rating)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'var(--Y)' }}>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="tc-txt" style={{ fontSize: '16px', color: '#444', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '20px' }}>
                  "{testi.text}"
                </p>
                <a href="https://www.google.com/search?q=Laser+Experts+India+reviews" target="_blank" rel="noopener noreferrer" className="tc-gl" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 800, color: "var(--DARK)", background: "var(--Y)", padding: "6px 14px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "1px", textDecoration: "none", transition: "background 0.3s ease" }}>
                   <i className="fab fa-google"></i> {t('reviews.viewReview', 'View on Google')}
                </a>
              </div>
              
              <div className="tc-auth" style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.05)", display: 'flex', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 1 }}>
                <div className="tc-av" style={{ width: '50px', height: '50px', borderRadius: '50%', background: "var(--DARK)", color: "var(--Y)", display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '900', fontFamily: 'var(--FH)' }}>
                  {testi.name[0]}
                </div>
                <div>
                  <div className="tc-name" style={{ fontFamily: 'var(--FH)', fontSize: '16px', fontWeight: 900, color: 'var(--DARK)' }}>{testi.name}</div>
                  <div className="tc-role" style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>{testi.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .testi-scroll-container::-webkit-scrollbar { display: none; }
        .tc-gl:hover { background: var(--DARK) !important; color: #fff !important; }
      `}</style>
    </section>
  );
}

export default Testimonials;

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { services } from '../data/siteData';

function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="services-page">
      <div className="ph">
        <div className="ph-grid"></div>
        <div className="ph-glow"></div>
        <div className="wrap">
          <div className="ph-bc"><Link to="/">Home</Link> / Services</div>
          <h1>OUR <span className="yl">SERVICES</span></h1>
          <p>OEM-Standard Solutions for CO2 and Fiber Laser Systems.</p>
        </div>
      </div>

      <section className="sp">
        <div className="wrap">
          <div className="svc-g" style={{ background: 'none', border: 'none', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
            {services.map((svc) => (
              <div className="sc rv" key={svc.id} id={svc.slug} style={{ background: '#fff', border: '1px solid #E2E2D8', padding: '40px' }}>
                <div className="sc-num">0{svc.id}</div>
                <div className="sc-ico">
                   <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <h3 className="sc-title" style={{ fontSize: '18px', color: '#0A0A0C' }}>{svc.title}</h3>
                <p className="sc-desc" style={{ color: '#444455' }}>{svc.desc}</p>
                <div className="bd" style={{ fontSize: '14px', marginBottom: '25px' }}>
                  <strong>Key Benefits:</strong>
                  <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                    <li>OEM grade spare parts</li>
                    <li>Low cycle-time calibration</li>
                    <li>24*7 technical support</li>
                    <li>Certified expert engineers</li>
                  </ul>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <Link to={svc.link} className="btn-out" style={{ width: '100%', textAlign: 'center' }}>View Details</Link>
                  <Link to="/contact" className="btn-dk" style={{ width: '100%', textAlign: 'center' }}>Get Quote</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp" style={{ background: '#0A0A0C', color: '#fff' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div className="stag lt">Specialized Retrofitting</div>
          <h2 className="sh wh">Still Running <span className="yl">CO2</span>? Speed Up Today.</h2>
          <p className="bd lt" style={{ maxWidth: '750px', margin: '0 auto 30px' }}>
            Our retrofitting service can increase your productivity by up to 300% by replacing legacy CO2 sources with state-of-the-art Fiber sources.
          </p>
          <Link to="/contact" className="btn-y">Start Your Upgrade</Link>
        </div>
      </section>
    </div>
  );
}

export default Services;

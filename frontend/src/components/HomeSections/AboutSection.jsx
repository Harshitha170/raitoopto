import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const METRICS = [
  { value: '4000+', keyLabel: 'about.metric1', fallback: 'Machines Serviced', delay: '0s' },
  { value: '40+ Yrs', keyLabel: 'about.metric2', fallback: 'CNC Experience', delay: '0.1s' },
  { value: '98%', keyLabel: 'about.metric3', fallback: 'Repeat Customers', delay: '0.2s' },
  { value: '3+', keyLabel: 'about.metric4', fallback: 'Service Branches', delay: '0.3s' },
];

function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="about-sec sp">
      <div className="wrap">
        <div className="about-g">
          {/* LEFT VISUAL */}
          <div className="ab-vis" style={{ minHeight: '100%', display: 'flex' }}>
            <div className="ab-blk ab-main about-img-anim" style={{ 
                border: '2px solid var(--Y)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                padding: '0',
                width: '100%',
                flex: 1,
                display: 'flex',
                backgroundColor: '#0a0a0c'
             }}>
              <img src="/Aboutuspage.png.JPG" alt="About Laser Experts" style={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'contain', display: 'block', borderRadius: '4px' }} />
            </div>
            <div className="ab-yr">
              <div className="n">2017</div>
              <div className="l">Founded</div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <div className="stag">{t('about.tag', "Who We Are")}</div>
            <h2 className="sh">
              {t('about.title', 'About')} <span className="yl">Laser Experts India</span>
            </h2>
            <p className="bd" style={{ marginBottom: '28px' }}>
              {t('about.desc', "Founded in 2017, LEI has built a reputation as India's most trusted laser machine service company with 40+ years combined CNC experience and 10+ years in CO₂ & Fiber Laser services — serving 4000+ machines across India and UAE.")}
            </p>

            <p className="bd" style={{ marginBottom: '16px' }}>
              We specialize in deep-level hardware repair, complex CNC retrofitting, and preventative maintenance protocols. By choosing LEI, manufacturers secure uninterrupted production lines, supported by a specialized team available for emergency breakdown resolutions 24/7.
            </p>
            <p className="bd" style={{ marginBottom: '32px' }}>
              Unlike third-party generic repair shops, our engineers are strictly laser-focused. From high-power Fiber Optics source optimization to critical CO2 resonant cavity alignments, we bring an uncompromising OEM-grade accuracy right to your factory floor.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-dk">{t('about.talkExpert', 'Talk to an Expert')}</Link>
              <Link to="/about" className="btn-out">{t('about.learnMore', 'Learn More')}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
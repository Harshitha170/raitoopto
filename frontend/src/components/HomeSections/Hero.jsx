import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroSlider from './HeroSlider';

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="hero">
      <div className="hero-grid"></div>
      <div className="hero-glow"></div>
      <div className="hero-in">
        {/* LEFT CONTENT */}
        <div>
          <div className="h-badge">
            <span className="h-dot"></span>{t('hero.tag', "INDIA'S #1 LASER MACHINE SERVICE PROVIDER")}
          </div>
          <h1 className="h-title">
            {t('hero.title1', 'PRECISION')}{' '}
            <span className="yl">{t('hero.title2', 'LASER')}</span>{' '}
            {t('hero.title3', 'SOLUTIONS')}
          </h1>
          <p className="h-sub">
            {t('hero.subtitle', "Delivering OEM-quality service, repair, retrofitting and automation for CO₂ and Fiber Laser machines across India. Trusted by 4000+ industrial clients since 2017.")}
          </p>
          <div className="h-acts">
            <Link to="/services" className="btn-y">{t('hero.cta', 'Explore Services')}</Link>
            <Link to="/about" className="btn-out-wh">{t('hero.aboutCta', 'About LEI')}</Link>
          </div>
          <div className="h-stats" style={{ display: "flex", gap: "40px", marginTop: "45px", paddingTop: "30px", borderTop: "1px solid rgba(255,255,255,0.1)", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 auto", minWidth: "120px" }}>
              <div className="hs-n">4000+</div>
              <div className="hs-l">{t('hero.stat1', 'Machines Serviced')}</div>
            </div>
            <div style={{ flex: "1 1 auto", minWidth: "120px" }}>
              <div className="hs-n">10+</div>
              <div className="hs-l">{t('hero.stat2', 'Years Experience')}</div>
            </div>
            <div style={{ flex: "1 1 auto", minWidth: "120px" }}>
              <div className="hs-n">98%</div>
              <div className="hs-l">{t('hero.stat3', 'Success Rate')}</div>
            </div>
          </div>
        </div>

        {/* RIGHT SLIDER */}
        <div className="h-vis">
          <HeroSlider />
        </div>
      </div>
    </section>
  );
}

export default Hero;
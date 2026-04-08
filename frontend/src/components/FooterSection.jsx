import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SOCIAL_LINKS = {
  facebook:  "https://www.facebook.com/leibglr",
  instagram: "https://www.instagram.com/laser_expert",
  linkedin:  "https://www.linkedin.com/company/laserexpertsindia-com/",
  youtube:   "https://www.youtube.com/@laserexperts-servicefirst1778"
};

function FooterSection() {
  const { t } = useTranslation();

  return (
    <footer style={{ background: "#0A0A0C", padding: "80px 0 0", borderTop: "1px solid rgba(255,239,0,0.15)" }}>
      <div className="wrap">
        <div className="ft-g" style={{ marginBottom: "60px" }}>

          {/* Brand Column */}
          <div>
            <div style={{ marginBottom: "25px", display: "flex", alignItems: "center", gap: "15px" }}>
              <img
                src="/footer logo.jpeg"
                alt="LEI Logo"
                style={{ height: "65px", width: "65px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--Y)" }}
              />
              <div className="nlogo-txt" style={{ color: "#fff", fontWeight: 700, letterSpacing: "2px", lineHeight: 1.1 }}>
                {t('brand.name', 'LASER EXPERTS')}
                <small style={{ display: "block", fontSize: "10px", color: "var(--Y)" }}>{t('brand.tagline', 'SERVICE FIRST')}</small>
              </div>
            </div>
            <p style={{ color: "#ccc", fontSize: "14px", lineHeight: "1.8", marginBottom: "25px", maxWidth: "300px" }}>
              {t('footer.desc', "India's First CO₂ Laser Machine Service & Automation Solutions provider. Founded 2017 · 4000+ machines serviced across India and UAE.")}
            </p>
            <div className="ft-socs" style={{ display: "flex", gap: "12px" }}>
              <a href={SOCIAL_LINKS.facebook}  target="_blank" rel="noopener noreferrer" className="ft-soc fa-icon" style={{ background: "#1877F2" }}          aria-label="Facebook" ><i className="fab fa-facebook-f"   style={{ color: "#fff", fontSize: "18px" }}></i></a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="ft-soc fa-icon" style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }} aria-label="Instagram"><i className="fab fa-instagram"    style={{ color: "#fff", fontSize: "18px" }}></i></a>
              <a href={SOCIAL_LINKS.linkedin}  target="_blank" rel="noopener noreferrer" className="ft-soc fa-icon" style={{ background: "#0077b5" }}           aria-label="LinkedIn" ><i className="fab fa-linkedin-in" style={{ color: "#fff", fontSize: "18px" }}></i></a>
              <a href={SOCIAL_LINKS.youtube}   target="_blank" rel="noopener noreferrer" className="ft-soc fa-icon" style={{ background: "#FF0000" }}           aria-label="YouTube"  ><i className="fab fa-youtube"     style={{ color: "#fff", fontSize: "18px" }}></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="ft-ht">{t('footer.platform', 'PLATFORM')}</div>
            <ul className="ft-links">
              <li><Link to="/"        >{t('nav.home',    'Home')}</Link></li>
              <li><Link to="/about"   >{t('nav.about',   'About LEI')}</Link></li>
              <li><Link to="/services">{t('nav.services','Services')}</Link></li>
              <li><Link to="/gallery" >{t('nav.gallery', 'Gallery')}</Link></li>
              <li><Link to="/career"  >{t('nav.career',  'Career')}</Link></li>
              <li><Link to="/contact" >{t('nav.contact', 'Contact Us')}</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <div className="ft-ht">{t('footer.solutions', 'SOLUTIONS')}</div>
            <ul className="ft-links">
              <li><Link to="/services/field-service"          >{t('services.field-service.title',   'CNC & Laser Field Service')}</Link></li>
              <li><Link to="/services/maintenance"            >{t('services.maintenance.title',     'Laser Maintenance')}</Link></li>
              <li><Link to="/services/retrofit"               >{t('services.retrofit.title',        'CO₂ to Fiber Retrofit')}</Link></li>
              <li><Link to="/services/remanufacturing"        >{t('services.remanufacturing.title', 'Remanufacturing')}</Link></li>
              <li><Link to="/services/amc"                    >{t('services.amc.title',             'AMC Contracts')}</Link></li>
              <li><Link to="/services/spares"                 >{t('services.spares.title',          'Spares & Consumables')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="ft-ht" style={{ color: "var(--Y)", fontSize: "10px", letterSpacing: "3px", marginBottom: "25px", fontWeight: "900" }}>
              {t('footer.reach', 'REACH OUT')}
            </div>

            <div className="ft-ci" style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              <i className="fas fa-map-marker-alt" style={{ color: "var(--Y)", marginTop: "4px" }}></i>
              <a
                href="https://www.google.com/maps?q=27/3,+Anumepally+to+Begapalli+road,+Hosur"
                target="_blank" rel="noopener noreferrer"
                style={{ color: "#fff", fontSize: "14px", lineHeight: "1.5", fontWeight: "700", textDecoration: "none" }}
              >
                27/3, Anumepally to Begapalli road,<br />Zuzuvadi, Hosur – 635126, Tamil Nadu
              </a>
            </div>

            <div className="ft-ci" style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              <i className="fas fa-phone-alt" style={{ color: "var(--Y)", marginTop: "4px" }}></i>
              <a href="tel:+917305054043" style={{ color: "#fff", textDecoration: "none", fontSize: "14px", fontWeight: "700" }}>
                +91 73050 54043
              </a>
            </div>

            <div className="ft-ci" style={{ display: "flex", gap: "12px" }}>
              <i className="fas fa-envelope" style={{ color: "var(--Y)", marginTop: "4px" }}></i>
              <a href="mailto:info@laserxprts.com" style={{ color: "#fff", textDecoration: "none", fontSize: "14px", fontWeight: "700" }}>
                info@laserxprts.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ft-bot" style={{ padding: "30px 0", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ color: "#aaa", fontSize: "12px", fontWeight: "700" }}>
            © 2026 <span style={{ color: "var(--Y)" }}>{t('brand.name', 'LASER EXPERTS')}</span>. {t('footer.rights', 'All rights reserved.')}
          </div>
          <div style={{ color: "#666", fontSize: "10px", letterSpacing: "2px", fontWeight: "900" }}>
            {t('footer.tagline', 'PRECISION · PERFORMANCE · RELIABILITY')}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
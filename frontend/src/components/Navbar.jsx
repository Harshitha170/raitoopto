import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.jpg";
import { services } from "../data/siteData";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/laserexpertsindia",
  instagram: "https://www.instagram.com/laserexpertsindia",
  linkedin: "https://www.linkedin.com/company/laser-experts-india",
  youtube: "https://www.youtube.com/@laserexpertsindia"
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    if (code === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  const currentLang = (i18n.language || 'en').toUpperCase().substring(0, 2);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <>

      {/* 2. TOP CONTACT BAR */}
      {!location.pathname.startsWith('/admin') && (
        <div className="tp-bar new-tp-bar">
          <div className="wrap tp-flex">
            <div className="tp-contact">
              <a href="tel:+917305054043" className="tp-hl"><i className="fas fa-phone-alt"></i> +91 73050 54043</a>
              <a href="mailto:info@laserxprts.com" className="tp-hl"><i className="fas fa-envelope"></i> info@laserxprts.com</a>
            </div>
            <div className="tp-acts">
              <div className="tp-lang">
                <span className={currentLang === 'EN' ? 'active' : ''} onClick={() => changeLang('en')}>EN</span>
                <span className={currentLang === 'HI' ? 'active' : ''} onClick={() => changeLang('hi')}>HI</span>
                <span className={currentLang === 'AR' ? 'active' : ''} onClick={() => changeLang('ar')}>AR</span>
              </div>
              <div className="tp-socs">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className={`n ${isSticky ? "sticky" : ""}`}>
        <div className="wrap ni">
          <Link to="/" className="nl" onClick={closeMenu}>
             <img src={logo} alt="Laser Experts Logo" style={{ height: "60px", width: "auto" }} />
             <div className="nlogo-txt" style={{ color: "var(--DARK)", fontWeight: 800, fontSize: "20px", lineHeight: 1 }}>{t('brand.name')}<br/><small style={{ fontSize: "10px", letterSpacing: "2px", opacity: 0.7 }}>{t('brand.tagline')}</small></div>
          </Link>

          <ul className="nlinks">
            <li><Link to="/" className={isActive("/")} onClick={closeMenu}>{t('nav.home')}</Link></li>
            <li><Link to="/about" className={isActive("/about")} onClick={closeMenu}>{t('nav.about')}</Link></li>
            <li className="has-d">
              <Link to="/services" className={isActive("/services") || location.pathname.includes('/services/') ? "active" : ""} onClick={closeMenu} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                {t('nav.services')}
                <svg viewBox="0 0 24 24" style={{ width: "12px", height: "12px", fill: "currentColor" }}><path d="M7 10l5 5 5-5z"/></svg>
              </Link>
              <ul className="ndrop">
                <li><Link to="/services" onClick={closeMenu}>{t('nav.specialized', 'ALL SERVICES')}</Link></li>
                <li><Link to="/services/field-service" onClick={closeMenu}>{t('services.field-service.title', 'FIELD SERVICES')}</Link></li>
                <li><Link to="/services/amc-contracts" onClick={closeMenu}>{t('services.amc.title', 'AMC CONTRACTS')}</Link></li>
                <li><Link to="/services/spares-consumables" onClick={closeMenu}>{t('services.spares.title', 'SPARES AND CONSUMABLES')}</Link></li>
              </ul>
            </li>
            <li className="has-d">
              <Link to="/repairs/remanufacturing" className={isActive("/repairs/remanufacturing") || location.pathname.includes('/repairs/') ? "active" : ""} onClick={closeMenu} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                REPAIRS
                <svg viewBox="0 0 24 24" style={{ width: "12px", height: "12px", fill: "currentColor" }}><path d="M7 10l5 5 5-5z"/></svg>
              </Link>
              <ul className="ndrop" style={{ minWidth: '240px' }}>
                <li><Link to="/repairs/turbo-blowers" onClick={closeMenu}>TURBO BLOWERS</Link></li>
                <li><Link to="/repairs/fanuc-pump" onClick={closeMenu}>FANUC VACUUM PUMP</Link></li>
                <li><Link to="/repairs/adaptive-optics" onClick={closeMenu}>ADAPTIVE OPTICS</Link></li>
                <li><Link to="/services/internal-oem" onClick={closeMenu}>INTERNAL AND OEM</Link></li>
                <li><Link to="/repairs/remanufacturing" onClick={closeMenu}>VIEW ALL SERVICES</Link></li>
              </ul>
            </li>
            <li><Link to="/gallery" className={isActive("/gallery")} onClick={closeMenu}>{t('nav.gallery')}</Link></li>
            <li><Link to="/career" className={isActive("/career")} onClick={closeMenu}>{t('nav.career')}</Link></li>
            <li><Link to="/contact" className={isActive("/contact")} onClick={closeMenu}>{t('nav.contact')}</Link></li>
          </ul>

          <Link to="/contact" className="ncta">{t('nav.consult')}</Link>

          <button className="ham" onClick={toggleMenu} aria-label="Toggle Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`mnav ${isMenuOpen ? "open" : ""}`}>
        <button className="mcls" onClick={toggleMenu}>×</button>
        <Link to="/" onClick={closeMenu}>{t('nav.home')}</Link>
        <Link to="/about" onClick={closeMenu}>{t('nav.about')}</Link>
        <Link to="/services" onClick={closeMenu}>{t('nav.services')}</Link>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', width: '100%' }}>
          <span style={{ fontFamily: 'var(--FH)', fontSize: '9px', letterSpacing: '3px', color: 'rgba(255,239,0,0.5)' }}>REPAIRS</span>
          <Link to="/repairs/remanufacturing" onClick={closeMenu} style={{ fontSize: '14px' }}>REMANUFACTURING</Link>
          <Link to="/repairs/turbo-blowers" onClick={closeMenu} style={{ fontSize: '14px' }}>TURBO BLOWERS</Link>
          <Link to="/repairs/fanuc-pump" onClick={closeMenu} style={{ fontSize: '14px' }}>FANUC VACUUM PUMP</Link>
          <Link to="/repairs/adaptive-optics" onClick={closeMenu} style={{ fontSize: '14px' }}>ADAPTIVE OPTICS</Link>
          <Link to="/services/internal-oem" onClick={closeMenu} style={{ fontSize: '14px' }}>INTERNAL & OEM</Link>
        </div>
        <Link to="/gallery" onClick={closeMenu}>{t('nav.gallery')}</Link>
        <Link to="/career" onClick={closeMenu}>{t('nav.career')}</Link>
        <Link to="/contact" onClick={closeMenu}>{t('nav.contact')}</Link>
        <Link to="/admin" onClick={closeMenu} style={{ fontSize: "10px", marginTop: "20px", opacity: 0.5 }}>Admin Login</Link>
      </div>
    </>
  );
}

export default Navbar;
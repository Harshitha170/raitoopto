import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { services } from "../../data/siteData";
import { useTranslation } from "react-i18next";

/* ─── Animated Counter ─── */
function AnimatedCounter({ end, suffix = "", decimals = false, label, icon }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    let startTs = null;
    const tick = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      setCount(decimals ? (p * end).toFixed(1) : Math.floor(p * end));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(decimals ? end.toFixed(1) : end);
    };
    requestAnimationFrame(tick);
  }, [started, end, decimals]);

  return (
    <div ref={ref} className="stat-ctr rv" style={{ textAlign: "center", padding: "30px 10px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
        <span style={{ fontFamily: "var(--FH)", fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, color: "var(--Y)", lineHeight: 1 }}>
          {count}{suffix}
        </span>
        {icon && (
          <svg viewBox="0 0 24 24" style={{ width: "28px", height: "28px", fill: "var(--Y)", flexShrink: 0, marginBottom: "4px" }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )}
      </div>
      <div style={{ fontFamily: "var(--FS)", fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "2px", textTransform: "uppercase", marginTop: "10px" }}>
        {label}
      </div>
    </div>
  );
}

/* ─── Icon helper ─── */
function getIcon(type) {
  switch (type) {
    case "service": return <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"/>;
    case "repair":  return <g><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></g>;
    case "upgrade": return <g><path d="M12 2l9 4.9V17L12 22l-9-5.1V6.9zm0 2.18L5.23 7.84v2.79l6.77 3.7 6.77-3.7V7.84z"/></g>;
    case "amc":     return <g><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></g>;
    case "spares":  return <g><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></g>;
    case "chiller": return <g><path d="M3.34 7a10 10 0 1 1 17.32 10"/><path d="M16.05 6.05 13 9.1M13 9.1l-.5 4.5M13 9.1l4.5.5"/></g>;
    default:        return <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>;
  }
}

/* ─── Main Component ─── */
function ServicesSection() {
  const { t } = useTranslation();
  return (
    <section className="svc-sec sp">
      <div className="wrap">

        {/* HEADER */}
        <div className="svc-hdr">
          <div>
            <div className="stag lt rv">{t('services.tag')}</div>
            <h2 className="sh wh rv">{t('services.title1')} <span className="yl">{t('services.title2')}</span></h2>
          </div>
          <Link to="/services" className="btn-out-wh rv">{t('services.viewAll')} →</Link>
        </div>

        {/* SERVICES GRID */}
        <div className="svc-g">
          {services.map((svc, idx) => (
              <div className="sc">
                <div className="sc-num">0{idx + 1}</div>
                <div className="sc-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {getIcon(svc.icon)}
                  </svg>
                </div>
                <div className="sc-title">{t(`services.${svc.slug}.title`)}</div>
                <p className="sc-desc">{t(`services.${svc.slug}.desc`)}</p>
              <Link to={svc.link} className="sc-lnk">
                {t('services.learnMore')}
                <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
              </Link>
            </div>
          ))}
        </div>

        {/* ANIMATED COUNTERS */}
        <div className="stat-row rv">
          <AnimatedCounter end={4000} suffix="+" label={t('stats.machinesLabel')} />
          <div className="stat-div"></div>
          <AnimatedCounter end={40} suffix="+" label={t('stats.experienceLabel')} />
          <div className="stat-div"></div>
          <AnimatedCounter end={98} suffix="%" label={t('stats.successLabel')} />
          <div className="stat-div"></div>
          <AnimatedCounter end={4.8} suffix="" label={t('stats.ratingsLabel')} decimals />
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;
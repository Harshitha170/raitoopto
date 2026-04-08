import React from "react";
import { useTranslation } from "react-i18next";

function ZeroDowntime() {
  const { t } = useTranslation();

  const items = [
    {
      icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"/>,
      title: t('zeroDowntime.card1Title', 'Emergency Response'),
      desc:  t('zeroDowntime.card1Desc', 'Critical fault team mobilized within hours, not days.')
    },
    {
      icon: <path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/>,
      title: t('zeroDowntime.card2Title', '24/7 Support'),
      desc:  t('zeroDowntime.card2Desc', 'Round-the-clock technical assistance and remote diagnostics.')
    },
    {
      icon: <g><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></g>,
      title: t('zeroDowntime.card3Title', 'Certified Engineers'),
      desc:  t('zeroDowntime.card3Desc', 'OEM-trained specialists for all major laser machine brands.')
    },
    {
      icon: <g><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></g>,
      title: t('zeroDowntime.card4Title', 'Spare Parts Ready'),
      desc:  t('zeroDowntime.card4Desc', 'Stocked inventory for 24-48 hour pan-India delivery.')
    }
  ];

  return (
    <section className="sp why-sec" style={{ 
      position: "relative",
      background: "url('/machine1.png') center/cover no-repeat fixed"
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(255, 255, 255, 0.6)" }}></div>
      <div className="wrap border-box-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", position: "relative", zIndex: 1 }}>

        {/* LEFT */}
        <div className="rv">
          <div className="stag">{t('zeroDowntime.tag', 'Zero Downtime Promise')}</div>
          <h2 className="sh" style={{ fontSize: "48px", lineHeight: "1.1", marginBottom: "30px" }}>
            {t('zeroDowntime.title1', 'Built for')} <br/>
            <span className="yl">{t('zeroDowntime.title2', 'Maximum Uptime')}</span>
          </h2>
          <p className="bd" style={{ marginBottom: "40px", maxWidth: "450px" }}>
            {t('zeroDowntime.subtitle', "We understand that any machine breakdown stalls your entire production line. That's why we've re-engineered the standard service model.")}
          </p>
        </div>

        {/* RIGHT – 2×2 grid of feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
          {items.map((item, i) => (
            <div
              key={i}
              className="rv zd-card"
              style={{ padding: "30px 20px", background: "#fdfdfd", border: "1px solid #E2E2D8", borderRadius: "4px", transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
            >
              <div className="zd-ico" style={{ width: "50px", height: "50px", background: "var(--Y)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", transition: "all 0.4s" }}>
                <svg viewBox="0 0 24 24" style={{ width: "24px", height: "24px", fill: "none", stroke: "var(--DARK)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>
                  {item.icon}
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--FH)", fontSize: "15px", fontWeight: 800, marginBottom: "10px", color: "var(--DARK)" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ZeroDowntime;
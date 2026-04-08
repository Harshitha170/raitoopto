import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  const customStats = [
    { value: "4000+", label: "Machines Serviced" },
    { value: "40+ Yrs", label: "CNC Experience" },
    { value: "98%", label: "Repeat Customers" },
    { value: "3+", label: "Global Locations" }
  ];

  return (
    <section className="stats-about-section" style={{ padding: "100px 0", background: "var(--DARK)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="wrap">
        <div className="stats-grid-complex" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", alignItems: "center" }}>
          
          {/* LEFT: CONTENT */}
          <div className="stats-content">
            <div className="h-badge" style={{ marginBottom: "20px" }}>
              <span className="h-dot"></span> ABOUT LASER EXPERTS INDIA
            </div>
            <h2 className="rv motion-heading" style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "25px" }}>
              India's First <span className="yl">CO₂ Laser</span> Service & Automation Provider
            </h2>
            <p style={{ fontSize: "clamp(16px, 2vw, 18px)", opacity: 0.8, color: "#eee", lineHeight: 1.6, marginBottom: "40px" }}>
              Founded in 2017, LEI has built a reputation as India's most trusted laser machine service company with 40+ years combined CNC experience and 10+ years in CO₂ & Fiber Laser services — serving 4000+ machines across India and UAE.
            </p>
            <div className="h-acts" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <Link to="/contact" className="btn-y">Talk to an Expert</Link>
              <Link to="/about" className="btn-out-wh">Learn More</Link>
            </div>
          </div>

          {/* RIGHT: STATS GRID */}
          <div className="stats-mini-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
            {customStats.map((stat, idx) => (
              <div key={idx} className="stat-card-new" style={{ background: "rgba(255,255,255,0.03)", padding: "30px 20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center", transition: "0.3s" }}>
                <div style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "var(--Y)", marginBottom: "8px" }}>{stat.value}</div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#fff", opacity: 0.6, letterSpacing: "1px", textTransform: "uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Stats;

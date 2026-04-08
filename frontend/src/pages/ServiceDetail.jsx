import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { services } from "../data/siteData";

function ServiceDetail() {
  const { slug } = useParams();
  
  // Find the service based on the URL slug
  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div style={{ padding: "180px 20px", textAlign: "center", background: "var(--BG)", color: "#fff", minHeight: "60vh" }}>
        <h1 style={{ fontFamily: "var(--FH)", fontSize: "40px", color: "var(--Y)" }}>Service Not Found</h1>
        <p style={{ marginTop: "20px" }}>The service you are looking for does not exist.</p>
        <Link to="/services" className="btn-y" style={{ marginTop: "30px", display: "inline-block" }}>Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="ptPage">
      {/* HEADER */}
      <section className="pg-hdr" style={{ paddingTop: "140px", paddingBottom: "70px", background: "#0A0A0C", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="wrap border-box-wrap">
          <div className="stag lt rv">Service Overview</div>
          <h1 className="h-title rv" style={{ fontSize: "56px", margin: "15px 0 20px" }}>{service.title}</h1>
          <p className="bd lt rv" style={{ maxWidth: "600px", margin: "0 auto", fontSize: "16px" }}>{service.desc}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="sp" style={{ background: "#fff" }}>
        <div className="wrap border-box-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "60px" }}>
          
          {/* Main Info */}
          <div className="rv">
            <h2 style={{ fontFamily: "var(--FH)", fontSize: "32px", color: "var(--DARK)", marginBottom: "25px", fontWeight: 800 }}>Comprehensive {service.title} Solutions</h2>
            <p style={{ color: "#555", lineHeight: "1.8", fontSize: "16px", marginBottom: "20px" }}>
              At Laser Experts India, our <strong>{service.title}</strong> division is engineered to directly tackle machine inefficiencies, breakdowns, and maintenance challenges. 
              Understanding that every minute of downtime costs you revenue, we deploy specialized tools and OEM-certified parts to ensure your systems perform at their absolute peak state.
            </p>
            <p style={{ color: "#555", lineHeight: "1.8", fontSize: "16px", marginBottom: "40px" }}>
              Our dedicated response units treat every request with the highest urgency, delivering not just quick fixes, but long-term root-cause solutions that extend machine longevity and precision.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "40px" }}>
              <div style={{ padding: "25px", background: "#F8F8F2", borderRadius: "4px", borderLeft: "3px solid var(--Y)" }}>
                <h4 style={{ fontFamily: "var(--FH)", fontSize: "18px", color: "var(--DARK)", marginBottom: "10px" }}>Quality Standards</h4>
                <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6" }}>Strict adherence to global OEM benchmarks. We utilize verified diagnostic devices and genuine components to restore 100% functionality.</p>
              </div>
              <div style={{ padding: "25px", background: "#F8F8F2", borderRadius: "4px", borderLeft: "3px solid var(--Y)" }}>
                <h4 style={{ fontFamily: "var(--FH)", fontSize: "18px", color: "var(--DARK)", marginBottom: "10px" }}>Expert Engineers</h4>
                <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6" }}>Our team represents over 40 years of combined CNC and Laser Automation expertise, bringing elite troubleshooting capability directly to your floor.</p>
              </div>
            </div>
            
            <Link to="/contact" className="btn-dk">Schedule Assessment Now</Link>
          </div>

          {/* Sidebar */}
          <div className="rv">
            <div style={{ background: "var(--DARK)", padding: "40px 30px", borderRadius: "4px", color: "#fff", position: "sticky", top: "100px" }}>
              <h3 style={{ fontFamily: "var(--FH)", fontSize: "22px", color: "var(--Y)", marginBottom: "20px" }}>Need Immediate Support?</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: "1.6", marginBottom: "30px" }}>
                Don't let machine failure stall your production lines. Reach out to our emergency support desk for priority assistance.
              </p>
              <div style={{ paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>24*7 Helpline</div>
                <a href="tel:+917305054043" style={{ color: "#fff", fontSize: "20px", fontWeight: "700", textDecoration: "none" }}>+91 73050 54043</a>
              </div>
              <div>
                 <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>Sales & Inquiries</div>
                 <a href="mailto:sales@laserexpertsindia.com" style={{ color: "var(--Y)", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>sales@laserexpertsindia.com</a>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}

export default ServiceDetail;

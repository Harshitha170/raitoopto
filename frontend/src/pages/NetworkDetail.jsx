import React from "react";
import { useParams, Link } from "react-router-dom";
import { network } from "../data/siteData";

function NetworkDetail() {
  const { slug } = useParams();
  const item = network.find(n => n.slug === slug);

  if (!item) return <div className="sp" style={{ textAlign: "center" }}>Partner not found.</div>;

  return (
    <div className="site-main loaded">
      {/* Hero */}
      <section className="ph">
        <div className="ph-grid"></div>
        <div className="ph-glow"></div>
        <div className="wrap border-box-wrap">
          <div className="ph-bc"><Link to="/">Home</Link> / Network / {item.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "15px" }}>
             <span style={{ fontSize: "50px" }}>{item.icon}</span>
             <h1 style={{ margin: 0 }}>{item.name}</h1>
          </div>
          <p>{item.desc}</p>
        </div>
      </section>

      {/* Content */}
      <section className="sp" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ maxWidth: "800px" }}>
            <h2 className="sh" style={{ marginBottom: "25px" }}>Comprehensive <span className="yl">Overview</span></h2>
            <p className="bd" style={{ fontSize: "18px", marginBottom: "40px" }}>{item.longDesc}</p>
            
            <a href={item.link.startsWith("http") ? item.link : "#"} target={item.link.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="btn-dk" style={{ paddingTop: "15px", paddingBottom: "15px" }}>
               Visit {item.name} Official Website 
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NetworkDetail;

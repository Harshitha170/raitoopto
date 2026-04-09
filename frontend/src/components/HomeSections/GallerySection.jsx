import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const getFullUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE_URL}/${url.startsWith('/') ? url.slice(1) : url}`;
};

function GallerySection() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const CATEGORIES = ['All', 'Technical', 'Automation', 'Field Service', 'Upgrade', 'Spares', 'Maintenance','Workspace'];

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/gallery`)
      .then(r => r.json())
      .then(d => { if(Array.isArray(d)) setItems(d); })
      .catch(err => console.error("Gallery fetch failed", err));
  }, []);

  const filteredItems = activeCategory === 'All' 
    ? items.slice(0, 8) 
    : items.filter(item => item.category === activeCategory);

  return (
    <section className="sp" style={{ background: "#fdfdf3" }}>
      <div className="wrap">
        <div className="stag rv">Visual Portfolio</div>
        <h2 className="sh rv" style={{ marginBottom: "20px" }}>Precision <span className="yl">Work Gallery</span></h2>
        <p style={{ maxWidth: "600px", color: "#666", marginBottom: "40px" }}>Showcasing our excellence in laser machine installation, preventive maintenance, and complex automation solutions across India.</p>
        
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "50px" }}>
            {CATEGORIES.map(c => (
                <button 
                    key={c} 
                    onClick={() => setActiveCategory(c)}
                    style={{ 
                        padding: "8px 20px", 
                        background: activeCategory === c ? "var(--DARK)" : "transparent",
                        color: activeCategory === c ? "var(--Y)" : "var(--DARK)",
                        border: `1px solid ${activeCategory === c ? "var(--DARK)" : "#E2E2D8"}`,
                        borderRadius: "30px",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        transition: "0.3s"
                    }}
                >
                    {c}
                </button>
            ))}
        </div>

        {items.length === 0 ? (
          <div style={{ padding: "60px", background: "#fff", border: "1px dashed #ccc", textAlign: "center", borderRadius: "8px" }}>
            <div style={{ fontSize: "14px", color: "#888" }}>Gallery content is managed from Admin Portal.</div>
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
            gap: "20px" 
          }}>
            {filteredItems.map(item => (
              <div key={item._id} className="gallery-item" style={{ 
                height: "250px", 
                borderRadius: "4px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}>
                <img src={getFullUrl(item.imageUrl)} alt={item.caption} />
                <div className="gallery-ov" style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.8))", padding: "20px", color: "white", opacity: 0, transform: "translateY(20px)" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>{item.caption || "Industrial Work"}</div>
                    <div style={{ fontSize: "10px", color: "var(--Y)" }}>{item.category.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Link to="/gallery" className="btn-dk" style={{ padding: "12px 30px" }}>View Full Portfolio</Link>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;

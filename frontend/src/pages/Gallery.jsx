import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const CAT_COLORS = {
  Technical:    { bg: '#1e3a5f', accent: '#4fc3f7' },
  Automation:   { bg: '#2d1b4e', accent: '#ce93d8' },
  'Field Service': { bg: '#1b3a2d', accent: '#69f0ae' },
  UAE:          { bg: '#4a2000', accent: '#ffcc80' },
  Spares:       { bg: '#3e2723', accent: '#ff8a65' },
  Maintenance:  { bg: '#1a237e', accent: '#90caf9' },
  Workspace:    { bg: '#263238', accent: '#b0bec5' },
};

function Lightbox({ items, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const item = items[index];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };
  const handleNext = (e) => {
    e?.stopPropagation();
    setIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, index]);

  if (!item) return null;

  return (
    <div className="lb-overlay" onClick={onClose}>
      <button className="lb-nav-btn prev" onClick={handlePrev} aria-label="Previous"><i className="fas fa-chevron-left"></i></button>
      <button className="lb-nav-btn next" onClick={handleNext} aria-label="Next"><i className="fas fa-chevron-right"></i></button>
      
      <div className="lb-box" onClick={e => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose}>✕</button>
        {item.contentType === 'video' ? (
          <video src={item.imageUrl} controls autoPlay className="lb-media" />
        ) : (
          <img src={item.imageUrl} alt={item.caption} className="lb-media" />
        )}
        <div className="lb-caption">
          <div className="lb-cat" style={{ color: CAT_COLORS[item.category]?.accent || '#ffaa00' }}>
           {item.category}
          </div>
          <div className="lb-title">{item.caption || 'Industrial Solution'}</div>
          <div className="lb-counter">{index + 1} / {items.length}</div>
        </div>
      </div>
      <style>{`
        .lb-nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; width: 60px; height: 60px; border-radius: 50%; font-size: 24px; cursor: pointer; transition: 0.3s; z-index: 100; display: flex; align-items: center; justify-content: center; }
        .lb-nav-btn:hover { background: var(--Y); color: #000; }
        .lb-nav-btn.prev { left: 40px; }
        .lb-nav-btn.next { right: 40px; }
        .lb-counter { font-size: 10px; color: #888; margin-top: 5px; font-weight: 700; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 5px; }
        @media (max-width: 768px) {
          .lb-nav-btn { width: 40px; height: 40px; font-size: 18px; }
          .lb-nav-btn.prev { left: 10px; }
          .lb-nav-btn.next { right: 10px; }
        }
      `}</style>
    </div>
  );
}

function Gallery() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/gallery`).then(r => r.json()),
      fetch(`${API_BASE_URL}/api/categories`).then(r => r.json())
    ]).then(([galleryData, catData]) => {
      if (Array.isArray(galleryData)) setItems(galleryData);
      if (Array.isArray(catData)) setCategories(catData.map(c => c.name));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const allCategories = ['All', ...categories];
  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory);

  return (
    <div className="gallery-page">
      <div className="ph" style={{ minHeight: '35vh' }}>
        <div className="ph-grid"></div>
        <div className="ph-glow"></div>
        <div className="wrap">
          <div className="ph-bc"><Link to="/">Home</Link> / Gallery</div>
          <h1>WORK <span className="yl">SHOWCASE</span></h1>
          <p>India's Foremost Laser Automation &amp; Service Gallery.</p>
        </div>
      </div>

      <section className="sp" style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="gal-filters">
            {allCategories.map(cat => (
              <button
                key={cat}
                className={`gal-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >{cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px', color: '#888', fontSize: '14px' }}>
              <div className="gal-spinner"></div>
              Loading gallery...
            </div>
          ) : filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px', color: '#888', fontSize: '14px' }}>
              {items.length === 0 
                ? `Connection issues with server at ${API_BASE_URL}. If you just opened the site, please wait 60s for the server to wake up.` 
                : "No images in this category yet."
              }
            </div>
          ) : (
            <div className="gal-masonry">
              {filteredItems.map((item, idx) => {
                const colors = CAT_COLORS[item.category] || { bg: '#111', accent: '#ffaa00' };
                return (
                  <div key={item._id} className="gc rv" style={{ animationDelay: `${(idx % 8) * 0.06}s` }} onClick={() => setLightboxIndex(idx)}>
                     <div className="gc-media">
                        {item.contentType === 'video' ? (
                          <video src={item.imageUrl} muted loop playsInline className="gc-img" />
                        ) : (
                          <img src={item.imageUrl} alt={item.caption} className="gc-img" />
                        )}
                        <div className="gc-overlay">
                          <div className="gc-overlay-inner">
                            <div className="gc-tag" style={{ background: colors.accent, color: '#000' }}>{item.category}</div>
                            <div className="gc-caption">{item.caption || 'Industrial Solution'}</div>
                            <div className="gc-zoom">🔍 Click to Expand</div>
                          </div>
                        </div>
                     </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox 
          items={filteredItems} 
          initialIndex={lightboxIndex} 
          onClose={() => setLightboxIndex(null)} 
        />
      )}

      <div style={{ textAlign: 'center', padding: '80px 0', background: 'var(--DARK)', color: 'white' }}>
        <div className="wrap">
          <h2 className="sh" style={{ color: 'white', fontSize: '28px' }}>Looking for custom <span className="yl">Automation?</span></h2>
          <p style={{ margin: '20px 0 40px', color: '#888' }}>Our engineering team is ready to design and implement your next precision laser system.</p>
          <Link to="/contact" className="btn-y">Consult an Expert</Link>
        </div>
      </div>
    </div>
  );
}

export default Gallery;

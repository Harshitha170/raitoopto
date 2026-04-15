import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

/* ─── Branch data with corrected SVG coordinates ─── */
const BRANCHES = [
  {
    city: 'HOSUR (HQ)',
    addr: 'Zuzuvadi, Tamil Nadu',
    emoji: '🏭',
    color: '#FFEF00',
    textColor: '#0A0A0C',
    /* Tamil Nadu — near Bangalore border */
    x: 218, y: 482,
    mapLink: 'https://maps.google.com/?q=12.7409,77.8253'
  },
  {
    city: 'CHENNAI',
    addr: 'Ambattur Regional Office',
    emoji: '🎡',
    color: '#FFEF00',
    textColor: '#0A0A0C',
    /* East coast Tamil Nadu */
    x: 252, y: 468,
    mapLink: 'https://maps.google.com/?q=13.1143,80.1548'
  },
  {
    city: 'BANGALORE',
    addr: 'Peenya Industrial Area Phase 3',
    emoji: '🏛️',
    color: '#FFEF00',
    textColor: '#0A0A0C',
    /* Peenya, Bangalore - 560058 */
    x: 207, y: 462,
    mapLink: 'https://maps.google.com/?q=13.0287,77.5069'
  },
  {
    city: 'HYDERABAD',
    addr: 'Charminar District',
    emoji: '🕌',
    color: '#FFEF00',
    textColor: '#0A0A0C',
    /* Telangana — central south */
    x: 232, y: 388,
    mapLink: 'https://maps.google.com/?q=17.3616,78.4747'
  },
  {
    city: 'PUNE',
    addr: 'Pimpri-Chinchwad Industrial',
    emoji: '🏰',
    color: '#FFEF00',
    textColor: '#0A0A0C',
    /* Maharashtra — west central */
    x: 162, y: 358,
    mapLink: 'https://maps.google.com/?q=18.6298,73.7997'
  },
  {
    city: 'DELHI / NCR',
    addr: 'Okhla Industrial Area',
    emoji: '⛩️',
    color: '#FFEF00',
    textColor: '#0A0A0C',
    /* North India */
    x: 208, y: 148,
    mapLink: 'https://maps.google.com/?q=28.5355,77.3910'
  },
  {
    city: 'UAE',
    addr: 'Downtown Dubai',
    emoji: '🏙️',
    color: '#FFEF00',
    textColor: '#0A0A0C',
    /* Off-map left — west of India */
    x: 60, y: 268,
    mapLink: 'https://maps.google.com/?q=25.1972,55.2744'
  }
];

/* ─── Individual pin component ─── */
function LocationPin({ branch, idx, hoveredCity, setHoveredCity }) {
  const isHov = hoveredCity === branch.city;

  const handleClick = (e) => {
    e.stopPropagation();
    window.open(branch.mapLink, '_blank');
  };

  return (
    <g
      transform={`translate(${branch.x},${branch.y})`}
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
      onMouseEnter={() => setHoveredCity(branch.city)}
      onMouseLeave={() => setHoveredCity(null)}
    >
      {/* Outer pulse ring */}
      <circle
        r="22"
        fill={branch.color}
        opacity="0.15"
        style={{ animation: `pinPulse 2.5s ${idx * 0.4}s ease-in-out infinite` }}
      />
      {/* Inner ring */}
      <circle
        r="11"
        fill={branch.color}
        opacity="0.25"
        style={{ animation: `pinRing 2.5s ${idx * 0.4 + 0.2}s ease-in-out infinite` }}
      />
      {/* Pin body */}
      <circle
        r={isHov ? '13' : '9'}
        fill={branch.color}
        stroke={isHov ? '#fff' : branch.color}
        strokeWidth={isHov ? '2.5' : '0'}
        style={{
          transition: 'r 0.3s, filter 0.3s',
          filter: isHov ? `drop-shadow(0 0 10px ${branch.color})` : 'none'
        }}
      />
      {/* Emoji */}
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="9"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {branch.emoji}
      </text>

      {/* Hover Tooltip – appears on hover */}
      {isHov && (
        <g transform="translate(0, -52)" style={{ animation: 'infoWin 0.3s ease both' }}>
          <rect
            x="-62" y="-28" width="124" height="44"
            rx="8"
            fill="#0A0A0C"
            stroke={branch.color}
            strokeWidth="1.5"
          />
          {/* Pointer triangle */}
          <polygon points="0,20 -7,16 7,16" fill="#0A0A0C" />
          {/* City name */}
          <text
            x="0" y="-10"
            textAnchor="middle"
            fill="#fff"
            fontSize="9.5"
            fontWeight="900"
            fontFamily="Orbitron, sans-serif"
            letterSpacing="1"
          >
            {branch.city}
          </text>
          {/* Address */}
          <text
            x="0" y="5"
            textAnchor="middle"
            fill={branch.color}
            fontSize="7"
            fontFamily="Exo 2, sans-serif"
            fontWeight="700"
          >
            {branch.addr}
          </text>
          {/* Hint */}
          <text
            x="0" y="15"
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="5.5"
            fontFamily="Exo 2, sans-serif"
          >
            CLICK TO OPEN MAP
          </text>
        </g>
      )}
    </g>
  );
}

/* ─── India SVG Map ─── */
function IndiaMap({ t }) {
  const [hoveredCity, setHoveredCity] = useState(null);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0A0A0C 0%, #0d1424 100%)',
      borderRadius: '20px', padding: '32px',
      border: '1px solid rgba(255,239,0,0.12)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.45)'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{
          fontFamily: 'Orbitron, sans-serif', fontSize: '10px',
          letterSpacing: '4px', color: 'var(--Y)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
        }}>
          <span className="pulse-dot"></span>
          {t('contact.mapTitle', 'PAN-GLOBAL NETWORK')}
        </span>
      </div>

      {/* SVG Map */}
      <svg
        viewBox="0 0 370 580"
        style={{ width: '100%', maxWidth: '400px', display: 'block', margin: '0 auto' }}
        onClick={() => setHoveredCity(null)}
      >
        <defs>
          <style>{`
            @keyframes pinPulse { 0%,100% { r:22px; opacity:.15; } 50% { r:36px; opacity:0; } }
            @keyframes pinRing  { 0%,100% { r:11px; opacity:.25; } 50% { r:18px; opacity:0; } }
            @keyframes infoWin  { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
            .pulse-dot { width:6px; height:6px; background:var(--Y); border-radius:50%; display:inline-block; position:relative; }
            .pulse-dot::after { content:''; position:absolute; inset:0; border-radius:50%; background:var(--Y); animation:pulseDot 1.5s infinite; }
            @keyframes pulseDot { 0%{transform:scale(1);opacity:1;} 100%{transform:scale(2.8);opacity:0;} }
          `}</style>

          <radialGradient id="mapGrad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#1e3a1e" />
            <stop offset="100%" stopColor="#0c1a0c" />
          </radialGradient>

          {/* Subtle grid pattern */}
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,239,0,0.04)" strokeWidth="0.5"/>
          </pattern>
        </defs>

        {/* Grid background */}
        <rect width="370" height="580" fill="url(#grid)" opacity="0.5" />

        {/* India outline (simplified but proportionate) */}
        <path
          d="
            M178,28 L192,22 L208,24 L226,22 L244,28 L260,36 L276,46
            L292,58 L306,72 L318,88 L326,104 L330,122 L328,140
            L336,158 L340,176 L336,194 L344,212 L344,230
            L336,248 L328,264 L320,280 L314,296 L308,312
            L302,328 L296,344 L290,358 L284,372 L278,386
            L272,400 L266,414 L260,428 L254,442 L250,456
            L246,470 L242,484 L238,498 L234,512 L230,524
            L226,536 L222,548 L218,538 L214,524 L210,510
            L206,496 L202,482 L198,468 L194,454 L188,440
            L182,426 L176,412 L170,398 L164,384 L158,370
            L152,356 L146,342 L140,328 L134,314 L128,300
            L122,286 L116,272 L110,258 L104,244 L100,230
            L96,216 L92,202 L90,188 L92,174 L96,160
            L100,146 L104,132 L108,118 L114,105 L120,93
            L128,82 L136,72 L144,63 L152,55 L162,48
            L172,42 L178,28 Z
          "
          fill="url(#mapGrad)"
          stroke="rgba(255,239,0,0.18)"
          strokeWidth="1.2"
        />

        {/* UAE dashed connection line */}
        <line
          x1="75" y1="310" x2="102" y2="295"
          stroke="rgba(207,216,220,0.3)"
          strokeWidth="1" strokeDasharray="5,4"
        />
        <text x="42" y="295" fill="rgba(255,239,0,0.25)" fontSize="7" fontFamily="Exo 2,sans-serif">
          UAE NETWORK
        </text>

        {/* Branch pins */}
        {BRANCHES.map((branch, idx) => (
          <LocationPin
            key={branch.city}
            branch={branch}
            idx={idx}
            hoveredCity={hoveredCity}
            setHoveredCity={setHoveredCity}
          />
        ))}
      </svg>

      {/* Legend chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
        {BRANCHES.map(b => (
          <button
            key={b.city}
            onClick={() => window.open(b.mapLink, '_blank')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.04)', padding: '5px 12px',
              borderRadius: '20px', border: `1px solid ${b.color}50`,
              fontSize: '10px', fontFamily: 'Exo 2, sans-serif',
              color: '#ccc', cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${b.color}20`;
              e.currentTarget.style.borderColor = b.color;
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.borderColor = `${b.color}50`;
              e.currentTarget.style.color = '#ccc';
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: b.color, flexShrink: 0 }}></span>
            {b.emoji} {b.city}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Contact Page ─── */
function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  // Simple Math Captcha
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let str = '';
    for (let i = 0; i < 5; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(str);
  };

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError(t('contact.formRequired', 'Please fill in all required fields.'));
      return;
    }
    
    // Verify Captcha
    if (!captchaInput) {
      setError('Please enter the captcha characters.');
      return;
    }
    if (captchaInput !== captchaText) {
      setError('Incorrect Captcha. Please copy the exact letters/numbers.');
      generateCaptcha();
      setCaptchaInput('');
      return;
    }
    
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) setSubmitted(true);
      else setError(result.message || 'Failed to send message.');
    } catch {
      setError('Server is offline. Please try again later.');
    }
  };

  if (submitted) {
    return (
      <div className="ph" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div className="wrap">
          <div className="h-badge">Message Sent Successfully</div>
          <h1 className="h-title">THANK<span className="yl">YOU</span></h1>
          <p className="h-sub" style={{ margin: '0 auto 30px' }}>Your message has been received. Our team will get back to you within 24 hours.</p>
          <Link to="/" className="btn-y">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      {/* Page Hero */}
      <div className="ph">
        <div className="ph-grid"></div>
        <div className="ph-glow"></div>
        <div className="wrap">
          <div className="ph-bc"><Link to="/">{t('page.home', 'Home')}</Link> / {t('page.contact', 'Contact')}</div>
          <h1>{t('contact.pageTitle', 'CONTACT US')}</h1>
          <p>{t('contact.pageDesc', "India's First CO2 & Fiber Laser Service Experts at Your Fingertips.")}</p>
        </div>
      </div>

      {/* Contact + Form */}
      <section className="sp">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', alignItems: 'start' }} className="contact-form-grid">

            {/* Left – Contact Info */}
            <div>
              <div className="stag">{t('contact.tag', 'Get in Touch')}</div>
              <h2 className="sh">
                {t('contact.title', 'Ready to Resolve Your')}{' '}
                <span className="yl">{t('contact.titleHighlight', 'Downtime?')}</span>
              </h2>
              <p className="bd" style={{ marginBottom: '40px' }}>
                {t('contact.desc', 'Contact us for any laser machine service, repair, or retrofitting inquiries. Our experts are available 24/7 for emergency fault diagnosis.')}
              </p>

              <div className="ft-ci contact-info-bold">
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.07 7 11.85 7 9z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>
                <span>{t('contact.address', 'Hosur, Tamil Nadu — India (Head Office)')}</span>
              </div>
              <div className="ft-ci contact-info-bold">
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>
                <a href="tel:+917305054043">{t('contact.phone', '+91 73050 54043')}</a>
              </div>
              <div className="ft-ci contact-info-bold">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                <a href="mailto:info@laserxprts.com">{t('contact.email', 'info@laserxprts.com')}</a>
              </div>
            </div>

            {/* Right – Form */}
            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '40px', borderRadius: '8px', border: '1px solid #E2E2D8', boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="contact-form-grid">
                <div>
                  <label style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block', fontFamily: 'var(--FS)' }}>{t('contact.formName', 'Full Name')} *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #E2E2D8', borderRadius: '4px', fontFamily: 'var(--FS)' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block', fontFamily: 'var(--FS)' }}>{t('contact.formEmail', 'Email Address')} *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #E2E2D8', borderRadius: '4px', fontFamily: 'var(--FS)' }} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="contact-form-grid">
                <div>
                  <label style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block', fontFamily: 'var(--FS)' }}>{t('contact.formPhone', 'Phone Number')} *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #E2E2D8', borderRadius: '4px', fontFamily: 'var(--FS)' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block', fontFamily: 'var(--FS)' }}>{t('contact.formSubject', 'Subject')}</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #E2E2D8', borderRadius: '4px', fontFamily: 'var(--FS)' }} />
                </div>
              </div>
              <div style={{ marginBottom: '30px' }}>
                <label style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block', fontFamily: 'var(--FS)' }}>{t('contact.formMessage', 'How can we help?')} *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="5" style={{ width: '100%', padding: '12px', border: '1px solid #E2E2D8', borderRadius: '4px', fontFamily: 'var(--FS)', resize: 'vertical' }} required></textarea>
              </div>
              <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ background: '#eee', padding: '10px 15px', borderRadius: '4px', fontFamily: '"Courier New", Courier, monospace', fontWeight: '900', letterSpacing: '4px', fontSize: '18px', userSelect: 'none', fontStyle: 'italic', textDecoration: 'line-through 2px solid rgba(0,0,0,0.2)' }}>
                  {captchaText}
                </div>
                <input 
                  type="text" 
                  value={captchaInput} 
                  onChange={(e) => setCaptchaInput(e.target.value)} 
                  placeholder="Type characters *" 
                  style={{ width: '150px', padding: '12px', border: '1px solid #E2E2D8', borderRadius: '4px', fontFamily: 'var(--FS)' }} 
                  required 
                />
              </div>

              {error && <p style={{ color: '#ff4d4d', fontSize: '13px', marginBottom: '20px' }}>{error}</p>}
              <button type="submit" className="btn-dk" style={{ width: '100%', cursor: 'pointer' }}>
                {t('contact.formSubmit', 'Send Message')}
              </button>
            </form>
          </div>

          {/* Network Map Section */}
          <div style={{ marginTop: '100px', borderTop: '1px solid #eee', paddingTop: '80px' }}>
            <div className="stag">{t('contact.networkTag', 'Global Presence')}</div>
            <h2 className="sh" style={{ marginBottom: '16px' }}>
              {t('contact.networkTitle', 'Our Service')}{' '}
              <span className="yl">{t('contact.networkTitle2', 'Network — India & Beyond')}</span>
            </h2>
            <p className="bd" style={{ marginBottom: '50px', maxWidth: '600px' }}>
              {t('contact.networkDesc', 'LEI operates across all major Indian manufacturing hubs and extends its reach to the UAE, ensuring you always have an expert nearby.')}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '60px' }} className="contact-grid">
              {/* SVG Map */}
              <div>
                <IndiaMap t={t} />
              </div>

              {/* Branch Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
                {BRANCHES.map((b, i) => (
                  <a
                    key={b.city}
                    href={b.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rv"
                    style={{ 
                      display: 'flex', 
                      textDecoration: 'none', 
                      background: '#fff', 
                      borderRadius: '12px', 
                      overflow: 'hidden', 
                      border: '1px solid #E2E2D8',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
                    }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.transform = 'translateX(10px) translateY(-5px)'; 
                      e.currentTarget.style.borderColor = 'var(--Y)';
                      e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.transform = 'none'; 
                      e.currentTarget.style.borderColor = '#E2E2D8';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.02)';
                    }}
                  >
                    <div style={{ 
                      width: '110px', 
                      background: b.color, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '32px',
                      position: 'relative',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                       <div style={{ 
                         position: 'absolute', 
                         inset: 0, 
                         backgroundImage: `url(/hosur_chennai_bangalore_landmarks_1775456491251.png)`, 
                         backgroundSize: 'cover', 
                         backgroundPosition: '50% 50%',
                         opacity: 0.12,
                         filter: 'grayscale(100%) brightness(0.6)'
                       }}></div>
                       <span style={{ position: 'relative', zIndex: 1 }}>{b.emoji}</span>
                    </div>
                    <div style={{ flex: 1, padding: '18px' }}>
                       <div style={{ fontFamily: 'var(--FH)', fontSize: '14px', fontWeight: 900, color: 'var(--DARK)', marginBottom: '3px' }}>
                          {b.city}
                       </div>
                       <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.4 }}>
                          {b.addr}
                       </div>
                    </div>
                    <div style={{ width: '40px', background: 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <i className="fas fa-external-link-alt" style={{ fontSize: '12px', color: '#ccc' }}></i>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;

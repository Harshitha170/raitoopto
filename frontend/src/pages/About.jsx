import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AboutSection from '../components/HomeSections/AboutSection';
import Stats from '../components/HomeSections/Stats';

/* ─── Static video with custom audio controls ─── */
function ProcessVideo() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className="process-video-container"
      style={{
        borderRadius: '12px', overflow: 'hidden',
        backgroundColor: '#000', position: 'relative',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column'
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', minHeight: 'auto' }}
      >
        <source src="/process-video.mp4" type="video/mp4" />
      </video>
      
      {/* Audio Toggle Button */}
      <button 
        onClick={toggleMute}
        style={{
          position: 'absolute', bottom: '15px', right: '15px',
          background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', padding: '8px 16px', borderRadius: '20px',
          cursor: 'pointer', fontFamily: 'var(--FH)', fontSize: '10px',
          letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px',
          backdropFilter: 'blur(5px)', transition: 'background 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--Y)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
      >
        {isMuted ? '🔇 AUDIO OFF' : '🔊 AUDIO ON'}
      </button>
    </div>
  );
}

function Roadmap() {
  const milestones = [
    { year: '2017', title: 'The Beginning', desc: 'LEI was founded in Hosur, Tamil Nadu to disrupt the regional CO2 laser servicing market with affordable OEM quality.', badge: 'FOUNDATION' },
    { year: '2019', title: '1000+ Machines', desc: 'Crossed the 1,000 machines serviced mark, establishing a broader PAN-India network.', badge: 'MILESTONE' },
    { year: '2021', title: 'Fiber Laser Era', desc: 'Expanded our technical capabilities into high-power Fiber laser technologies and advanced retrofitting.', badge: 'EXPANSION' },
    { year: '2023', title: 'International Growth', desc: 'Extended operations to the UAE, marking our first international expansion and reaching 3000+ machines.', badge: 'GLOBAL' },
    { year: '2024', title: 'Innovation Apex', desc: 'Reached 4000+ machines globally and expanded network partnerships like Zuesskill Forge.', badge: 'PRESENT DAY' }
  ];

  return (
    <section className="sp" style={{ background: '#0A0A0C', color: '#fff', paddingTop: '100px', paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,239,0,0.03) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '10%', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,239,0,0.03) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <div className="stag rv lt" style={{ color: 'var(--Y)', marginBottom: '15px' }}>THE PIONEERING JOURNEY</div>
          <h2 className="sh rv wh" style={{ color: '#fff', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, lineHeight: 0.9 }}>
            Our <span className="yl">Innovation</span> Timeline
          </h2>
        </div>
        
        <div className="roadmap-container" style={{ position: 'relative', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
          <div className="roadmap-v-line" style={{ position: 'absolute', top: '0', bottom: '0', left: '50%', width: '2px', background: 'linear-gradient(to bottom, transparent, var(--Y), transparent)', transform: 'translateX(-50%)', opacity: 0.2 }} />
          
          <div className="roadmap-items-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {milestones.map((m, i) => (
              <div 
                key={i} 
                className={`roadmap-point-wrap ${i % 2 === 0 ? 'even' : 'odd'}`}
                style={{
                  display: 'flex',
                  justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                  alignItems: 'center',
                  width: '100%',
                  position: 'relative',
                  minHeight: '160px'
                }}
              >
                <div className="roadmap-dot" style={{
                  position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                  width: '12px', height: '12px', background: 'var(--Y)', borderRadius: '50%',
                  zIndex: 10, boxShadow: '0 0 15px var(--Y)'
                }} />

                <div 
                  className="roadmap-card" 
                  style={{
                    width: '44%',
                    background: 'rgba(255,255,255,0.02)',
                    padding: '30px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    textAlign: i % 2 === 0 ? 'right' : 'left',
                    transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div className="roadmap-year-bg" style={{ position: 'absolute', top: '10px', [i % 2 === 0 ? 'left' : 'right']: '20px', fontSize: '50px', fontWeight: 900, color: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }}>{m.year}</div>
                  <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--Y)', letterSpacing: '3px', marginBottom: '10px', textTransform: 'uppercase' }}>{m.badge}</div>
                  <h3 style={{ fontFamily: 'var(--FH)', fontSize: '22px', color: '#fff', marginBottom: '12px', fontWeight: 800 }}>{m.year}: {m.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '14px', lineHeight: 1.7 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  const leaders = [
    {
      name: 'PRABAKARAN',
      role: 'Founding Director',
      quote: '"Service is not just a department, it\'s our DNA. We eliminate downtime."',
      desc: 'With decades of experience traversing the most complex industrial scenarios across India and the Middle East, Prabakaran leads LEI with an uncompromising focus on technical perfection and an absolute commitment to zero-downtime promises.',
      img: '/Prabhakaran.webp',
      side: 'left'
    },
    {
      name: 'HARISHA PRABAKARAN',
      role: 'Director',
      quote: '"Innovation and precision move us forward. We are setting global benchmarks."',
      desc: "Spearheading the global growth strategies and operations, Harisha ensures that LEI's standard of OEM-grade servicing reaches new global benchmarks. Their vision expands operations from India to the global stage via Falcon Laser and Zuesskill.",
      img: '/Harisha.webp',
      side: 'right'
    }
  ];

  return (
    <section className="sp" style={{ background: '#F8F8F3', position: 'relative' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <div className="stag rv">GUIDED BY EXCELLENCE</div>
          <h2 className="sh rv" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900 }}>Visionary <span className="yl">Leadership</span></h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', maxWidth: '1100px', margin: '0 auto' }}>
          {leaders.map((L, idx) => (
            <div 
              key={idx}
              className="rv leader-card" 
              style={{ 
                display: 'flex', 
                flexDirection: L.side === 'left' ? 'row' : 'row-reverse',
                flexWrap: 'wrap', 
                gap: '0', 
                alignItems: 'stretch',
                background: '#fff', 
                borderRadius: '16px', 
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.05)',
                border: '1px solid #E2E2D8'
              }}
            >
              <div style={{ flex: '1 1 380px', position: 'relative', overflow: 'hidden', height: '420px' }}>
                <img src={L.img} alt={L.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.6s' }} 
                     className="leader-img" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)' }}></div>
                <div style={{ position: 'absolute', bottom: '25px', [L.side === 'left' ? 'left' : 'right']: '25px', textAlign: L.side === 'left' ? 'left' : 'right' }}>
                   <div style={{ background: 'var(--Y)', color: '#000', padding: '4px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: 900, letterSpacing: '2px', display: 'inline-block', marginBottom: '8px' }}>{L.role}</div>
                   <h3 style={{ color: '#fff', fontFamily: 'var(--FH)', fontSize: '28px', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>{L.name}</h3>
                </div>
              </div>
              
              <div style={{ flex: '1.2 1 450px', padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '30px', [L.side === 'left' ? 'right' : 'left']: '30px', fontSize: '100px', fontWeight: 900, color: 'rgba(0,0,0,0.02)', fontFamily: 'serif' }}>"</div>
                <h4 style={{ fontSize: '24px', color: 'var(--DARK)', fontStyle: 'italic', marginBottom: '25px', fontFamily: 'serif', lineHeight: 1.4, fontWeight: 300, position: 'relative' }}>
                   {L.quote}
                </h4>
                <p style={{ color: '#666', lineHeight: 1.8, fontSize: '16px', margin: 0 }}>
                   {L.desc}
                </p>
                <div style={{ marginTop: '35px', display: 'flex', gap: '15px' }}>
                   <div style={{ width: '35px', height: '1px', background: 'var(--Y)', marginTop: '10px' }}></div>
                   <span style={{ fontSize: '10px', letterSpacing: '2px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--DARK)' }}>LEI EXECUTIVE BOARD</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Full-screen video that pauses when scrolled away ─── */
function VideoSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // IntersectionObserver: play when ≥30% visible, pause otherwise
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        height: 'auto',
        aspectRatio: '16 / 9',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      >
        <source src="/process-video.mp4" type="video/mp4" />
      </video>

      {/* Subtle overlay for contrast */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />

      {/* Mute/Unmute toggle */}
      <button
        onClick={toggleMute}
        title={isMuted ? 'Unmute' : 'Mute'}
        style={{
          position: 'absolute', bottom: '36px', right: '36px', zIndex: 10,
          background: 'rgba(0,0,0,0.55)', border: '1.5px solid rgba(255,239,0,0.55)',
          width: '54px', height: '54px', borderRadius: '50%',
          color: 'var(--Y)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', transition: 'all 0.3s', backdropFilter: 'blur(6px)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--Y)'; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.55)'; e.currentTarget.style.color = 'var(--Y)'; }}
      >
        <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`} />
      </button>

      {/* Label overlay */}
      <div style={{
        position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--FH)', fontSize: '10px', letterSpacing: '4px',
        color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', pointerEvents: 'none'
      }}>
        OUR PROCESS IN ACTION
      </div>
    </div>
  );
}

function About() {

  const { t } = useTranslation();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="about-page">
      {/* Page Hero */}
      <div className="ph">
        <div className="ph-grid"></div>
        <div className="ph-glow"></div>
        <div className="wrap">
          <div className="ph-bc"><Link to="/">{t('page.home', 'Home')}</Link> / {t('page.about', 'About')}</div>
          <h1>ABOUT<span className="yl">LEI</span></h1>
          <p>{t('about.pageDesc', "India's First CO2 & Fiber Laser Service & Automation Experts.")}</p>
        </div>
      </div>

      <AboutSection />
      <Roadmap />
      <Leadership />

      <section className="sp" style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="about-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
            
            {/* Vision Section */}
            <div 
              className="rv d1" 
              style={{ 
                background: 'var(--DARK)', padding: '60px 45px', borderRadius: '16px', color: '#fff', 
                position: 'relative', overflow: 'hidden', cursor: 'default', minHeight: '380px'
              }}
              onMouseEnter={(e) => { e.currentTarget.querySelector('.mv-hov').style.height = '100%'; e.currentTarget.querySelector('.mv-hov').style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.querySelector('.mv-hov').style.height = '0'; e.currentTarget.querySelector('.mv-hov').style.opacity = '0'; }}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '45px', height: '45px', background: 'var(--Y)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                  <i className="fas fa-eye" style={{ color: '#000', fontSize: '20px' }}></i>
                </div>
                <h3 style={{ fontFamily: 'var(--FH)', fontSize: '26px', fontWeight: 900, marginBottom: '15px', letterSpacing: '1.5px' }}>OUR VISION</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.8 }}>To become the global gold standard for laser machine servicing, where "Laser Experts India" is synonymous with absolute precision.</p>
                <div style={{ marginTop: '25px', fontSize: '10px', color: 'var(--Y)', fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase' }}>HOVER FOR COMMITMENT</div>
              </div>
              <div className="mv-hov" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '0', background: 'var(--Y)', color: 'var(--DARK)', padding: '60px 45px', transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)', opacity: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                 <h4 style={{ fontFamily: 'var(--FH)', fontSize: '22px', fontWeight: 900, marginBottom: '15px' }}>GLOBAL BENCHMARK</h4>
                 <p style={{ fontWeight: 600, fontSize: '16px', lineHeight: 1.6 }}>We envision a world where manufacturing never stops. By 2030, we aim to have a direct service hub in every major industrial zone.</p>
              </div>
            </div>

            {/* Mission Section */}
            <div 
              className="rv d2" 
              style={{ 
                background: '#f9f9f9', padding: '60px 45px', borderRadius: '16px', color: 'var(--DARK)', 
                position: 'relative', overflow: 'hidden', cursor: 'default', minHeight: '380px', border: '1px solid #eee'
              }}
              onMouseEnter={(e) => { e.currentTarget.querySelector('.mv-hov').style.height = '100%'; e.currentTarget.querySelector('.mv-hov').style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.querySelector('.mv-hov').style.height = '0'; e.currentTarget.querySelector('.mv-hov').style.opacity = '0'; }}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '45px', height: '45px', background: 'var(--DARK)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                  <i className="fas fa-rocket" style={{ color: 'var(--Y)', fontSize: '20px' }}></i>
                </div>
                <h3 style={{ fontFamily: 'var(--FH)', fontSize: '26px', fontWeight: 900, marginBottom: '15px', letterSpacing: '1.5px' }}>OUR MISSION</h3>
                <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.8 }}>To empower manufacturers by providing elite-tier repair, remanufacturing, and automation upgrades that breathe new life into every machine.</p>
                <div style={{ marginTop: '25px', fontSize: '10px', color: 'var(--DARK)', fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.4 }}>HOVER FOR ACTION</div>
              </div>
              <div className="mv-hov" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '0', background: 'var(--DARK)', color: '#fff', padding: '60px 45px', transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)', opacity: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                 <h4 style={{ fontFamily: 'var(--FH)', fontSize: '22px', fontWeight: 900, marginBottom: '15px', color: 'var(--Y)' }}>PRECISION ACTION</h4>
                 <p style={{ fontWeight: 400, fontSize: '16px', lineHeight: 1.7, opacity: 0.8 }}>Our mission is executed daily by deployment of certified engineers and genuine OEM parts across the globe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Video Section — pauses when scrolled away */}
      <VideoSection />

      <Stats />
    </div>
  );
}

export default About;
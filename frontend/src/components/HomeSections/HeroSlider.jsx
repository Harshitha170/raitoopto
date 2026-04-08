import React, { useState, useEffect } from 'react';

const SLIDES = [
    {
        url: "/homeimage1.png.jpg",
        alt: "Fiber Laser Cutting"
    },
    {
        url: "/homeimage2.png.jpg",
        alt: "Laser Welding Robot"
    },
    {
        url: "/homeinage3.png.jpg",
        alt: "Laser Engraving Process"
    }
];

function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hero-slider-wrap" style={{ position: "relative", width: "100%", height: "clamp(300px, 65vh, 600px)", overflow: "hidden", borderRadius: "10px", boxShadow: "0 25px 65px rgba(0,0,0,0.45)", background: "#000", border: "1px solid rgba(255,239,0,0.15)" }}>
            {SLIDES.map((slide, idx) => (
                <div 
                    key={idx}
                    style={{ 
                        position: "absolute", 
                        top: 0, left: 0, right: 0, bottom: 0, 
                        opacity: idx === currentIndex ? 1 : 0,
                        transition: "opacity 1s ease-in-out",
                        transform: idx === currentIndex ? "scale(1)" : "scale(1.05)"
                    }}
                >
                    <img 
                        src={slide.url} 
                        alt={slide.alt} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                    <div style={{ position: "absolute", bottom: "20px", left: "20px", background: "rgba(0,0,0,0.6)", color: "var(--Y)", padding: "5px 15px", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", borderRadius: "2px" }}>
                        {slide.alt}
                    </div>
                </div>
            ))}
            
            {/* Custom Navigation Dots */}
            <div style={{ position: "absolute", bottom: "20px", right: "20px", display: "flex", gap: "8px" }}>
                {SLIDES.map((_, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setCurrentIndex(idx)}
                        style={{ 
                            width: "8px", height: "8px", borderRadius: "50%", 
                            background: idx === currentIndex ? "var(--Y)" : "rgba(255,255,255,0.3)",
                            cursor: "pointer", transition: "0.3s"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default HeroSlider;

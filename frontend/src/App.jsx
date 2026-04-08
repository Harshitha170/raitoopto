import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import FooterSection from "./components/FooterSection";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Gallery from "./pages/Gallery";
import Career from "./pages/Career";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import NetworkDetail from "./pages/NetworkDetail";
import Remanufacturing from "./pages/Remanufacturing";
import TurboBlower from "./pages/TurboBlower";
import FanucVacuum from "./pages/FanucVacuum";
import AdaptiveOptics from "./pages/AdaptiveOptics";
import OEM from "./pages/OEM";
import "./assets/css/style.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Initial Loader Timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Custom Cursor logic
    const moveCursor = (e) => {
      const cur = document.getElementById("cur");
      const cring = document.getElementById("cring");
      if (cur) { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; }
      if (cring) { cring.style.left = e.clientX + 'px'; cring.style.top = e.clientY + 'px'; }
    };
    window.addEventListener("mousemove", moveCursor);

    // Scroll reveal logic
    const handleScroll = () => {
      const elements = document.querySelectorAll(".rv");
      elements.forEach(el => {
        const pos = el.getBoundingClientRect().top;
        if (pos < window.innerHeight - 50) {
          el.classList.add("in");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    // Scroll reset on page change
    window.scrollTo(0, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return (
    <>
      {isLoading && (
        <div className="loader-screen">
          <div className="loader-box">
            {/* Corner brackets */}
            <div className="loader-bracket tl"></div>
            <div className="loader-bracket tr"></div>
            <div className="loader-bracket bl"></div>
            <div className="loader-bracket br"></div>
            {/* Scanning line */}
            <div className="loader-scan"></div>
            {/* Logo */}
            <div className="loader-logo">
              <span className="l-l">LASER</span><span className="l-r">EXPERTS</span>
            </div>
            <div className="loader-tagline">INDIA'S LASER AUTOMATION PIONEERS</div>
            <div className="loader-progress"></div>
            <div className="loader-pct">INITIALIZING SYSTEM...</div>
          </div>
        </div>
      )}
      <div id="cur"></div>
      <div id="cring"></div>
      <div className={`site-main ${isLoading ? 'loading' : 'loaded'}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/network/:slug" element={<NetworkDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/career" element={<Career />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/repairs/remanufacturing" element={<Remanufacturing />} />
          <Route path="/repairs/turbo-blowers" element={<TurboBlower />} />
          <Route path="/repairs/fanuc-pump" element={<FanucVacuum />} />
          <Route path="/repairs/adaptive-optics" element={<AdaptiveOptics />} />
          <Route path="/services/internal-oem" element={<OEM />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <FooterSection />
      </div>
    </>
  );
}

export default App;
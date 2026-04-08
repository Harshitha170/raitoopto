import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const processSteps = [
  {
    id: "01",
    key: "consultation",
    title: "Consultation",
    desc: "Detailed analysis and mapping of your specific laser requirement or issue.",
    icon: "💬",
    gradient: "linear-gradient(135deg, #FFEF00 0%, #FFB300 100%)",
    textColor: "#0A0A0C",
    bg: "/homeimage1.png.jpg"
  },
  {
    id: "02",
    key: "diagnosis",
    title: "Diagnosis",
    desc: "Technical evaluation to identify root causes using specialized diagnostic tools.",
    icon: "🔍",
    gradient: "linear-gradient(135deg, #FF6B35 0%, #E53935 100%)",
    textColor: "#fff",
    bg: "/homeimage2.png.jpg"
  },
  {
    id: "03",
    key: "execution",
    title: "Execution",
    desc: "Precision repair, calibration, or retrofit performed by certified laser engineers.",
    icon: "⚙️",
    gradient: "linear-gradient(135deg, #4FC3F7 0%, #0288D1 100%)",
    textColor: "#fff",
    bg: "/laser_machine_3_1774672095082.png"
  },
  {
    id: "04",
    key: "optimization",
    title: "Optimization",
    desc: "Testing and fine-tuning to ensure peak speed, stability, and zero downtime.",
    icon: "🚀",
    gradient: "linear-gradient(135deg, #69F0AE 0%, #00897B 100%)",
    textColor: "#0A0A0C",
    bg: "/homeinage3.png.jpg"
  }
];

function ProcessCard({ step, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="proc-hover-card"
      style={{ animationDelay: `${index * 0.12}s`, overflow: 'hidden', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Image */}
      <div
        className="proc-card-bg"
        style={{
          backgroundImage: `url(${step.bg})`,
          transform: hovered ? "scale(1.12)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        }}
      />

      {/* Gradient Overlay – removed on hover per request */}
      <div
        className="proc-card-gradient"
        style={{
          background: step.gradient,
          opacity: 0, 
        }}
      />

      {/* Dark overlay for readability when NOT hovered */}
      <div
        className="proc-card-dark"
        style={{ opacity: hovered ? 0 : 0.55, transition: "opacity 0.5s ease" }}
      />

      {/* Step Number – top left */}
      <div className="proc-card-num" style={{ color: hovered ? step.textColor : "#fff", transition: "color 0.4s" }}>
        {step.id}
      </div>

      {/* Icon – center, slides up on hover */}
      <div
        className="proc-card-icon"
        style={{ 
          transform: hovered ? "translateY(-30px) scale(1.2)" : "translateY(0) scale(1)",
          transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }}
      >
        {step.icon}
      </div>

      {/* Content revealed on hover - comes from down to up */}
      <div
        className="proc-card-content"
        style={{
          color: '#fff',
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(60px)",
          transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          textShadow: "0 2px 10px rgba(0,0,0,0.8)"
        }}
      >
        <div className="proc-card-title">{step.title}</div>
        <p className="proc-card-desc">{step.desc}</p>
      </div>

      {/* Title shown when NOT hovered */}
      <div
        className="proc-card-idle-title"
        style={{ 
          opacity: hovered ? 0 : 1, 
          transform: hovered ? "translateY(-20px)" : "translateY(0)",
          transition: "all 0.5s ease" 
        }}
      >
        {step.title}
      </div>
    </div>
  );
}

function ServiceProcess() {
  const { t } = useTranslation();
  return (
    <section className="proc-sec sp">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <div className="stag rv" style={{ color: "var(--Y)" }}>
            {t("process.tag", "HOW WE WORK")}
          </div>
          <h2 className="sh rv" style={{ color: "#fff" }}>
            {t("process.title1", "Our Service")}{" "}
            <span className="yl">{t("process.title2", "Process")}</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "16px auto 0", fontFamily: "var(--FS)", fontSize: "14px", lineHeight: 1.8 }}>
            {t("process.subtitle", "A systematic, expert-driven approach ensuring zero-downtime and peak laser performance.")}
          </p>
        </div>

        <div className="proc-hover-grid">
          {processSteps.map((step, i) => (
            <ProcessCard key={step.id} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceProcess;

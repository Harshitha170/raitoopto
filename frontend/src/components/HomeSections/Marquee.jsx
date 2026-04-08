import React from 'react';

const items = [
  "OEM QUALITY SERVICE", "CO2 LASER EXPERTS", "FIBER RETROFITTING", "PAN-INDIA REACH", "4000+ MACHINES", "ZERO DOWNTIME", "GENUINE SPARES"
];

function Marquee() {
  return (
    <div className="mq rv">
      <div className="mq-t">
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <div className="mq-item" key={idx}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;

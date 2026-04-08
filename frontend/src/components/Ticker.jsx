import React from 'react';

const TICKER_ITEMS = [
  "INDIA'S BEST LASER SERVICE",
  "CO₂ TO FIBER RETROFIT",
  "AMADA · TRUMPF · BYSTRONIC",
  "FANUC REPAIR EXPERTS",
  "4000+ MACHINES SERVICED",
  "INDIA & UAE COVERAGE",
  "AMC CONTRACTS AVAILABLE",
  "ZUES — ZERO UNPLANNED STOPPAGE",
  "PULSE · MAX · UV · RAYCUS · IPG"
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        <div className="t-track">
          {items.map((item, idx) => (
            <div key={idx} className="t-item">
              {item}<span className="t-diamond">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ticker;

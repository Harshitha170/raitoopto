import React from "react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <>
      {/* CTA SECTION */}
      <div className="ctab">
        <div className="wrap">
          <div className="ctab-in">
            <div>
              <div className="stag lt">Get in Touch</div>
              <h2 className="sh wh">
                Eliminate <span className="yl">Machine Downtime</span> — Today
              </h2>
              <p className="bd lt" style={{ maxWidth: "400px", marginTop: "8px" }}>
                India's best laser machine service network. One call gets you certified engineers nationwide.
              </p>
            </div>
            <div className="ctab-acts">
              <a href="tel:+917305054043" className="ctab-ph">+91 73050 54043</a>
              <Link to="/contact" className="btn-y">Email Us Now</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CTA;
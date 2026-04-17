import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError("Passwords do not match");
    setLoading(true);
    setError("");
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const res = await resp.json();
      if (resp.ok) {
        setSuccess("Password has been reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/admin"), 3000);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="reset-password-root" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0c0c0e", fontFamily: "'Inter', sans-serif", color: "#fff", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#151518", padding: "40px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
         <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 800, fontFamily: "Orbitron", margin: "0 0 10px" }}>New <span className="yl">Password</span></h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>Create a secure password for your administrator account.</p>
         </div>

         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>New Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", outline: "none" }} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", outline: "none" }} required />
            </div>

            {(error || success) && (
              <div style={{ background: error ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)", color: error ? "#ef4444" : "#10b981", padding: "12px", borderRadius: "12px", fontSize: "13px", fontWeight: 600, textAlign: "center" }}>
                {error || success}
              </div>
            )}

            <button type="submit" disabled={loading} style={{ width: "100%", padding: "18px", border: "none", borderRadius: "12px", background: "var(--Y)", color: "#000", fontWeight: 800, fontSize: "15px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "1.5px" }}>
               {loading ? "Updating..." : "Update Password"}
            </button>

            <div style={{ textAlign: "center" }}>
               <Link to="/admin" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>Back to Login</Link>
            </div>
         </form>
      </div>
    </div>
  );
}

export default ResetPassword;

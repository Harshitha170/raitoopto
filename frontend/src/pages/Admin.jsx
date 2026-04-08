import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/laserexpertsindia",
  instagram: "https://www.instagram.com/laserexpertsindia",
  linkedin: "https://www.linkedin.com/company/laser-experts-india",
  youtube: "https://www.youtube.com/@laserexpertsindia"
};

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("adminToken"));
  const [activeTab, setActiveTab] = useState("dashboard"); 
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [students, setStudents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobForm, setJobForm] = useState({ title: "", description: "", responsibilities: "", skills: "", minExperience: 0, maxExperience: 0, status: 'Published' });
  const [jdFile, setJdFile] = useState(null);
  const [activeJobId, setActiveJobId] = useState(null); 
  const [jobQuestions, setJobQuestions] = useState([]);
  const [jobQForm, setJobQForm] = useState({ questionText: "", questionType: "text", options: ["", "", "", ""], correctAnswer: 0, isMandatory: true });
  const [viewState, setViewState] = useState('list'); 
  const [editingQId, setEditingQId] = useState(null);
  const [galleryForm, setGalleryForm] = useState({ caption: "", category: "Workspace" });
  
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    if (code === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };
  const currentLang = (i18n.language || 'en').toUpperCase().substring(0, 2);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchData();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const res = await resp.json();
      if (resp.ok && res.token) {
        sessionStorage.setItem("adminToken", res.token);
        setToken(res.token);
        setIsLoggedIn(true);
      } else {
        setError(res.message || "Authentication failed.");
      }
    } catch (err) {
      setError("Server unreachable. Ensure backend is running on port 5000.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setToken(null);
    setSidebarOpen(false);
  };

  const fetchData = async (authToken = token) => {
    if(!authToken) return;
    try {
      const jResp = await fetch("${API_BASE_URL}/api/admin/jobs", { headers: { "x-auth-token": authToken } });
      const jData = await jResp.json();
      if (Array.isArray(jData)) setJobs(jData);

      const sResp = await fetch("${API_BASE_URL}/api/admin/students", { headers: { "x-auth-token": authToken } });
      const sData = await sResp.json();
      if (Array.isArray(sData)) setStudents(sData);

      const qResp = await fetch("${API_BASE_URL}/api/admin/all-questions", { headers: { "x-auth-token": authToken } });
      const qData = await qResp.json();
      if (Array.isArray(qData)) setAllQuestions(qData);

      const gResp = await fetch("${API_BASE_URL}/api/gallery");
      const gRes = await gResp.json();
      if (Array.isArray(gRes)) setGallery(gRes);

      const cResp = await fetch("${API_BASE_URL}/api/categories");
      const cRes = await cResp.json();
      if (Array.isArray(cRes)) {
        setCategories(cRes.map(c => c.name));
      }
    } catch (err) {
      setError("Data fetch failed. Backend may be offline.");
    }
    setLoading(false);
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      const resp = await fetch("${API_BASE_URL}/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ name: newCatName }),
      });
      if (resp.ok) {
        setSuccess("Category added!");
        setNewCatName("");
        fetchData();
      }
    } catch (err) { setError("Failed to add category."); }
  };

  const handleDeleteCategory = async (catName) => {
    if (!window.confirm(`Delete category "${catName}" and its associations?`)) return;
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/categories/${encodeURIComponent(catName)}`, {
        method: "DELETE",
        headers: { "x-auth-token": token },
      });
      if (resp.ok) {
        setSuccess("Category removed.");
        setTimeout(() => setSuccess(""), 5000);
        fetchData();
      }
    } catch (err) { setError("Failed to delete category."); }
  };

  const delGallery = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`${API_BASE_URL}/api/admin/gallery/${id}`, { method: "DELETE", headers: { "x-auth-token": token } });
    fetchData();
  };

  const deleteJob = async (id) => {
      if (!window.confirm("Are you sure?")) return;
      await fetch(`${API_BASE_URL}/api/admin/jobs/${id}`, { method: "DELETE", headers: { "x-auth-token": token } });
      setSuccess("Job deleted.");
      fetchData();
  };

  // LOGIN PAGE REMAINS AS PER EXACT SPECS
  if (!isLoggedIn) {
      return (
        <div className="admin-login-root" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f5f6f7", fontFamily: "'Inter', sans-serif" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <div className="login-form-card" style={{ width: "100%", maxWidth: "380px", background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 15px 35px rgba(0,0,0,0.06)", border: "1px solid #eee" }}>
               <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <div style={{ margin: "0 auto 15px", width: "40px", height: "40px" }}>
                    <svg viewBox="0 0 24 24" fill="var(--Y)"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                  </div>
                  <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#111", margin: "0 0 6px" }}>Admin Login</h1>
                  <p style={{ fontSize: "13px", color: "#888", fontWeight: 500, margin: 0 }}>Authorized personnel only</p>
               </div>

               <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: "8px" }}>Username</label>
                    <input type="text" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} placeholder="Username" style={{ width: "100%", padding: "14px 16px", borderRadius: "8px", border: "1.5px solid #eee", background: "#fafafa" }} required autoFocus />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: "8px" }}>Password</label>
                    <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="Password" style={{ width: "100%", padding: "14px 16px", borderRadius: "8px", border: "1.5px solid #eee", background: "#fafafa" }} required />
                  </div>
                  {error && <div style={{ background: "#fee", color: "#e00", padding: "10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, textAlign: "center" }}>{error}</div>}
                  <button type="submit" disabled={loading} style={{ width: "100%", padding: "16px", border: "none", borderRadius: "8px", background: "var(--Y)", color: "#000", fontWeight: 700, fontSize: "14px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "1px", marginTop: "10px" }}>{loading ? "Authenticating..." : "Login to Dashboard"}</button>
               </form>
               <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <Link to="/" style={{ color: "#777", fontSize: "12px", textDecoration: "none" }}><i className="fas fa-arrow-left"></i> Return to Site</Link>
               </div>
            </div>
          </div>
          <footer style={{ padding: "30px", textAlign: "center", borderTop: "1px solid #eee", background: "#fff" }}>
             <div style={{ fontSize: "11px", color: "#aaa", fontWeight: 700, letterSpacing: "1px" }}>© 2026 LASER EXPERTS INDIA • ADMIN MANAGEMENT SYSTEM</div>
          </footer>
        </div>
      );
  }

  return (
    <div className="admin-portal-v6" style={{ minHeight: "100vh", background: "#0c0c0e", display: "flex", flexDirection: "column", color: "#fff" }}>
      

      {/* NAVBAR */}
      <nav style={{ background: "#0A0A0C", borderBottom: "1px solid rgba(255,239,0,0.1)", position: "sticky", top: 0, zIndex: 1000 }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "70px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", color: "#fff", fontSize: "22px", cursor: "pointer" }}><i className="fas fa-bars"></i></button>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <div style={{ width: "30px", height: "30px" }}><svg viewBox="0 0 24 24" fill="var(--Y)"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg></div>
              <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: "14px", fontWeight: 900, color: "white", letterSpacing: "2px" }}>ADMIN <span className="yl">PORTAL</span></div>
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative" }}>
             <button onClick={() => fetchData()} style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "none", color: "#fff", cursor: "pointer" }}><i className="fas fa-sync"></i></button>
             
             <div 
               onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
               style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
             >
                <div style={{ color: "white", textAlign: "right", borderRight: "1px solid rgba(255,255,255,0.1)", paddingRight: "12px" }}>
                   <div style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px" }}>Administrator</div>
                   <div style={{ fontSize: "9px", opacity: 0.5 }}>Active Now</div>
                </div>
                <div style={{ 
                  width: "38px", height: "38px", border: "2px solid var(--Y)", 
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  borderRadius: "12px", background: "rgba(255,239,0,0.1)", color: "var(--Y)",
                  transition: "0.3s", transform: profileDropdownOpen ? "scale(1.05)" : "scale(1)"
                }}>
                  <i className="fas fa-user-shield"></i>
                </div>
             </div>

             {profileDropdownOpen && (
               <>
                 <div onClick={() => setProfileDropdownOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 999 }}></div>
                 <div style={{ 
                   position: "absolute", top: "55px", right: 0, width: "240px", 
                   background: "#fff", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.15)", 
                   padding: "20px", zIndex: 1000, border: "1px solid #eee",
                   animation: "dropdownFade 0.3s ease"
                 }}>
                   <div style={{ borderBottom: "1px solid #eee", paddingBottom: "12px", marginBottom: "12px" }}>
                      <div style={{ fontSize: "14px", fontWeight: 900, color: "#000" }}>LEI Super Admin</div>
                      <div style={{ fontSize: "10px", color: "#888", marginTop: "2px" }}>ID: LEI-ADMIN-2026-001</div>
                   </div>
                   <button style={{ width: "100%", textAlign: "left", padding: "8px 0", background: "none", border: "none", fontSize: "12px", color: "#555", cursor: "pointer", fontWeight: 600 }}>
                      <i className="fas fa-key" style={{ width: "20px", color: "var(--Y)" }}></i> Forgot Password?
                   </button>
                   <button onClick={handleLogout} style={{ width: "100%", textAlign: "left", padding: "8px 0", background: "none", border: "none", fontSize: "12px", color: "#ff4d4d", cursor: "pointer", fontWeight: 700, marginTop: "5px" }}>
                      <i className="fas fa-sign-out-alt" style={{ width: "20px" }}></i> Logout Session
                   </button>
                 </div>
               </>
             )}
          </div>
        </div>
      </nav>

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1999 }}></div>}
      
      {/* FIXED SIDEBAR UI */}
      <aside style={{
          position: "fixed", top: 0, left: sidebarOpen ? "0" : "-320px", width: "320px", height: "100vh",
          background: "#0c0c0e", color: "#fff", zIndex: 2000, transition: "0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          boxShadow: "25px 0 60px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.05)"
      }}>
         <div style={{ padding: "40px 30px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ 
                width: "36px", height: "36px", borderRadius: "10px", 
                background: "var(--Y)", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 15px rgba(255,239,0,0.3)"
              }}>
                <svg viewBox="0 0 24 24" fill="#000" style={{ width: "22px" }}><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
              </div>
              <span style={{ fontSize: "15px", fontWeight: 900, color: "#fff", letterSpacing: "2px", textTransform: "uppercase" }}>LEI <span className="yl">Admin</span></span>
           </div>
           <button onClick={() => setSidebarOpen(false)} style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "#fff", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", transition: "0.3s" }}>✕</button>
         </div>

         <nav className="sidebar-nav-v2" style={{ flex: 1, padding: "30px 0" }}>
            {[
              { id: 'dashboard', icon: 'fas fa-th-large', label: 'Console Home', color: '#6366f1' },
              { id: 'gallery', icon: 'fas fa-images', label: 'Media Library', color: '#ec4899' },
              { id: 'students', icon: 'fas fa-users', label: 'Candidate List', color: '#10b981' },
              { id: 'ats', icon: 'fas fa-chart-line', label: 'ATS Intelligence', color: '#8b5cf6' },
              { id: 'jobs', icon: 'fas fa-briefcase', label: 'Recruitment', color: '#f59e0b' }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }} 
                className="sidebar-item"
                style={{ 
                  width: "calc(100% - 30px)", margin: "4px 15px", padding: "16px 20px", border: "none", 
                  background: activeTab === item.id ? "rgba(255,255,255,0.05)" : "none", 
                  color: activeTab === item.id ? "#860c84" : "#888", 
                  borderRadius: "12px",
                  textAlign: "left", display: "flex", alignItems: "center", gap: "15px", cursor: "pointer", 
                  fontSize: "13px", fontWeight: "800", transition: "all 0.3s"
                }}
              >
                <div style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  background: activeTab === item.id ? item.color : "rgba(255,255,255,0.03)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: activeTab === item.id ? "#f5f111" : item.color,
                  transition: "all 0.3s"
                }}>
                  <i className={item.icon} style={{ fontSize: "14px" }}></i>
                </div>
                {item.label}
              </button>
            ))}
          </nav>

         <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <button onClick={handleLogout} style={{ width: "100%", padding: "15px", borderRadius: "10px", border: "2px solid #ff4d4d", background: "none", color: "#ff4d4d", fontSize: "12px", fontWeight: 900, cursor: "pointer" }}>
              <i className="fas fa-sign-out-alt"></i> SIGN OUT
            </button>
         </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "40px 0 60px" }}>
        <div className="wrap">
          <header style={{ marginBottom: "35px" }}>
             <div style={{ fontSize: "11px", color: "#888", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 700 }}>Console / {activeTab}</div>
             <h1 style={{ margin: 0, fontFamily: "Orbitron, sans-serif", fontSize: "26px" }}>{activeTab.toUpperCase()} <span className="yl">MANAGEMENT</span></h1>
          </header>

          {(error || success) && (
            <div style={{ padding: "15px", borderRadius: "10px", marginBottom: "20px", display: "flex", gap: "10px", background: error ? "#fff5f5" : "#f0fff4", color: error ? "#f03e3e" : "#2f9e44", border: `1px solid ${error ? '#ffe3e3' : '#dcfce7'}` }}>
                {error || success}
            </div>
          )}

          {/* DASHBOARD RESTORED RICHNESS */}
          {activeTab === 'dashboard' && (
            <div className="db-rich-view">
               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "25px", marginBottom: "40px" }}>
                  {[
                    { label: 'Applicants', val: students.length, icon: 'fas fa-users', color: '#6366f1' },
                    { label: 'Media Files', val: gallery.length, icon: 'fas fa-images', color: '#ec4899' },
                    { label: 'Active Roles', val: jobs.filter(j => j.status === 'Published').length, icon: 'fas fa-briefcase', color: '#10b981' },
                    { label: 'Sections', val: categories.length, icon: 'fas fa-tags', color: '#f59e0b' }
                  ].map((stat, idx) => (
                    <div key={idx} className="admin-stat-card">
                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                          <div>
                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "1px" }}>{stat.label}</div>
                            <div style={{ fontSize: "32px", fontWeight: 900, color: "#fff", marginTop: "5px" }}>{stat.val}</div>
                          </div>
                          <div style={{ 
                            width: "54px", height: "54px", borderRadius: "16px",
                            background: `rgba(${stat.color === '#6366f1' ? '99,102,241' : stat.color === '#ec4899' ? '236,72,153' : stat.color === '#10b981' ? '16,185,129' : '245,158,11'}, 0.2)`,
                            color: stat.color,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "22px"
                          }}>
                             <i className={stat.icon}></i>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>

               {/* ROLE-BASED APPLICATION BREAKDOWN (NEW) */}
               <div style={{ marginBottom: "40px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                     <h3 style={{ margin: 0, fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 800, color: "rgba(255,255,255,0.6)" }}>
                        <i className="fas fa-chart-pie" style={{ color: "var(--Y)", marginRight: "10px" }}></i> Application Velocity <span style={{ color: "var(--Y)" }}>By Role</span>
                     </h3>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                     {jobs.filter(j => j.status === 'Published').map((job, idx) => {
                        const count = students.filter(s => s.appliedRole === job.title || s.appliedJobId === job._id).length;
                        const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#3b82f6'];
                        const accent = colors[idx % colors.length];
                        
                        return (
                           <div key={job._id} className="admin-card" style={{ padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                              <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: accent }}></div>
                              <div style={{ flex: 1, paddingLeft: "10px" }}>
                                 <div style={{ fontSize: "13px", fontWeight: 900, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.title}</div>
                                 <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>Active Recruitment Pipeline</div>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                 <div style={{ fontSize: "28px", fontWeight: 900, color: accent }}>{count}</div>
                                 <div style={{ fontSize: "9px", fontWeight: 800, opacity: 0.6, textTransform: "uppercase" }}>Applications</div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>

               {students.length === 0 && jobs.length === 0 && (
                  <div style={{ background: "rgba(255,239,0,0.05)", border: "1.5px dashed var(--Y)", borderRadius: "20px", padding: "40px", textAlign: "center", marginBottom: "40px" }}>
                     <h2 style={{ fontSize: "20px", color: "#fff", marginBottom: "10px" }}>Dashboard is Empty</h2>
                     <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "20px" }}>Would you like to restore the professional sample entries (Jobs, Gallery & Applicants)?</p>
                     <button 
                        onClick={async () => {
                           setLoading(true);
                           const resp = await fetch('${API_BASE_URL}/api/admin/force-restore', { method: 'POST', headers: { 'x-auth-token': token } });
                           if(resp.ok) { setSuccess("Professional entries restored!"); fetchData(); }
                           else setError("Restore failed.");
                           setLoading(false);
                        }}
                        style={{ background: "var(--Y)", color: "#000", border: "none", padding: "12px 30px", borderRadius: "10px", fontWeight: 900, cursor: "pointer", textTransform: "uppercase" }}
                     >Restore Sample Data</button>
                  </div>
               )}

               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
                  {/* Recent Applications Preview */}
                  <div className="admin-card">
                     <div className="admin-card-header">
                        <h3 style={{ fontSize: "16px", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                           <i className="fas fa-file-alt" style={{ color: "var(--Y)" }}></i> Recent Applications
                        </h3>
                        <Link to="#" onClick={() => setActiveTab('students')} style={{ fontSize: "10px", fontWeight: 800, color: "var(--Y)", textDecoration: "none", textTransform: "uppercase" }}>View All</Link>
                     </div>
                     <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {students.slice(0, 5).map(s => (
                          <div key={s._id} className="preview-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>
                                   <i className="fas fa-user"></i>
                                </div>
                                <div>
                                   <div style={{ fontSize: "13px", fontWeight: 800 }}>{s.name}</div>
                                   <div style={{ fontSize: "11px", color: "#888" }}>{s.appliedRole}</div>
                                </div>
                             </div>
                             <div style={{ fontSize: "11px", fontWeight: 800, color: s.atsScore > 70 ? "#10b981" : "var(--Y)", background: s.atsScore > 70 ? "rgba(16,185,129,0.1)" : "rgba(255,239,0,0.1)", padding: "4px 8px", borderRadius: "6px" }}>{s.atsScore}% Score</div>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Top ATS Ranking Preview */}
                  <div className="admin-card">
                     <div className="admin-card-header">
                        <h3 style={{ fontSize: "16px", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                           <i className="fas fa-award" style={{ color: "var(--Y)" }}></i> Top Ranking Talent
                        </h3>
                        <Link to="#" onClick={() => setActiveTab('ats')} style={{ fontSize: "10px", fontWeight: 800, color: "var(--Y)", textDecoration: "none", textTransform: "uppercase" }}>Full View</Link>
                     </div>
                     <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {students.sort((a,b) => b.atsScore - a.atsScore).slice(0, 5).map((s, i) => (
                          <div key={s._id} style={{ display: "flex", alignItems: "center", gap: "15px", padding: "12px", borderRadius: "12px", background: i === 0 ? "rgba(255,239,0,0.05)" : "transparent", border: i === 0 ? "1px solid rgba(255,239,0,0.2)" : "1px solid transparent" }}>
                             <div style={{ 
                               width: "28px", height: "28px", borderRadius: "50%", 
                               background: i === 0 ? "var(--Y)" : i === 1 ? "#e2e8f0" : i === 2 ? "#fbbf24" : "rgba(255,255,255,0.1)", 
                               color: i < 3 ? "#000" : "#fff",
                               display: "flex", alignItems: "center", justifyContent: "center", 
                               fontSize: "12px", fontWeight: 900 
                             }}>
                                {i + 1}
                             </div>
                             <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "13px", fontWeight: 700 }}>{s.name}</div>
                                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>Qualified Candidate</div>
                             </div>
                             <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: "14px", fontWeight: 900, color: "#fff" }}>{s.atsScore}</div>
                                <div style={{ fontSize: "8px", opacity: 0.5, fontWeight: 700, textTransform: "uppercase" }}>Index</div>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* GALLERY SECTION RESTORED */}
          {activeTab === 'gallery' && (
             <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                {/* Category Management */}
                <div className="admin-card">
                   <h3 style={{ fontSize: "16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <i className="fas fa-tags" style={{ color: "#ec4899" }}></i> Category Management
                   </h3>
                   <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                      <input 
                        type="text" 
                        value={newCatName} 
                        onChange={(e) => setNewCatName(e.target.value)} 
                        placeholder="Enter new category name..." 
                        style={{ flex: 1, padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff" }} 
                      />
                      <button onClick={handleAddCategory} className="btn-dk-v2">Add Category</button>
                   </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                       {categories.map((c, i) => (
                         <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(236, 72, 153, 0.1)", padding: "4px 10px", borderRadius: "20px" }}>
                            <span style={{ color: "#ec4899", fontSize: "12px", fontWeight: 800 }}>{c}</span>
                            <button onClick={() => handleDeleteCategory(c)} style={{ background: "none", border: "none", color: "rgba(236,72,153,0.5)", cursor: "pointer", fontSize: "10px", padding: "0 2px" }}>✕</button>
                         </div>
                       ))}
                    </div>
                </div>

                <div className="admin-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                     <h3 style={{ fontSize: "18px", margin: 0 }}>Visual Library</h3>
                     <div style={{ display: "flex", gap: "10px" }}>
                        <select 
                          value={galleryForm.category} 
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                          style={{ padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "#0c0c0e", color: "#fff" }}
                        >
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button className="btn-y" style={{ borderRadius: "10px" }}>Upload Media</button>
                     </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
                    {gallery.map(g => (
                      <div key={g._id} className="gal-item-card" style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", position: "relative", background: "rgba(255,255,255,0.02)" }}>
                        <div style={{ height: "200px", background: "#000" }}>
                            {g.contentType === 'video' ? <video src={g.imageUrl} style={{width:"100%", height:"100%", objectFit:"cover"}} /> : <img src={g.imageUrl} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} />}
                        </div>
                        <div style={{ padding: "20px" }}>
                            <div style={{ fontSize: "14px", fontWeight: 800 }}>{g.caption || "Industrial Shot"}</div>
                            <div style={{ fontSize: "10px", color: "var(--Y)", fontWeight: 900, textTransform: "uppercase", marginTop: "5px" }}>{g.category}</div>
                            <button onClick={() => delGallery(g._id)} style={{ position: "absolute", top: "15px", right: "15px", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(240,62,62,0.1)", border: "none", color: "#f03e3e", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fas fa-trash"></i></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          )}

          {/* APPLICATIONS PAGE CLEANER */}
          {activeTab === 'students' && (
            <div className="admin-card">
               <div style={{ overflowX: "auto" }}>
                 <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px" }}>
                   <thead>
                     <tr style={{ textAlign: "left", background: "rgba(255,255,255,0.03)" }}>
                       <th style={{ padding: "20px", fontSize: "11px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", borderRadius: "12px 0 0 12px" }}>Candidate Name</th>
                       <th style={{ padding: "20px", fontSize: "11px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Targeted Role</th>
                       <th style={{ padding: "20px", fontSize: "11px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>ATS score</th>
                       <th style={{ padding: "20px", fontSize: "11px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textAlign: "center", borderRadius: "0 12px 12px 0" }}>Intervene</th>
                     </tr>
                   </thead>
                   <tbody>
                     {students.map(s => (
                       <tr key={s._id} style={{ background: "rgba(255,255,255,0.02)", transition: "0.3s" }}>
                         <td style={{ padding: "20px", borderRadius: "12px 0 0 12px" }}>
                            <div style={{ fontWeight: 800, fontSize: "14px", color: "#fff" }}>{s.name}</div>
                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{s.email}</div>
                         </td>
                         <td style={{ padding: "20px", fontWeight: 700, fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>{s.appliedRole}</td>
                         <td style={{ padding: "20px", textAlign: "center" }}>
                            <div style={{ display: "inline-block", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 900, background: s.atsScore > 75 ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: s.atsScore > 75 ? "#10b981" : "#f59e0b" }}>{s.atsScore}% Match</div>
                         </td>
                         <td style={{ padding: "20px", textAlign: "center", borderRadius: "0 12px 12px 0" }}>
                            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                               <a href={s.resumeUrl} target="_blank" rel="noreferrer" title="View Resume" style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><i className="fas fa-file-download"></i></a>
                               <button 
                                 onClick={async () => {
                                    if(window.confirm(`Notify ${s.name} about interview selection?`)) {
                                        setLoading(true);
                                        const resp = await fetch('${API_BASE_URL}/api/admin/send-selection-email', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                                            body: JSON.stringify({ studentId: s._id, email: s.email, name: s.name })
                                        });
                                        const res = await resp.json();
                                        if(res.success) {
                                             setSuccess(res.message);
                                             setTimeout(() => setSuccess(""), 10000);
                                         }
                                        else setError(res.message);
                                        setLoading(false);
                                    }
                                 }}
                                 title="Accept & Notify"
                                 style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", cursor: "pointer" }}
                               ><i className="fas fa-paper-plane"></i></button>
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          )}

          {/* ATS PAGE CLEANER */}
          {activeTab === 'ats' && (
            <div className="admin-card">
               <h3 style={{ marginBottom: "30px", fontSize: "20px", fontFamily: "Orbitron" }}>ATS <span className="yl">INTELLIGENCE</span></h3>
               <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                 {students.sort((a,b) => b.atsScore - a.atsScore).map((s, i) => (
                    <div key={s._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", background: i < 3 ? "rgba(99,102,241,0.05)" : "rgba(255,255,255,0.02)", borderRadius: "15px", border: i < 3 ? "1.5px solid #6366f1" : "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                         <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: i === 0 ? "var(--Y)" : "#000", color: i === 0 ? "#000" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 900 }}>{i+1}</div>
                         <div>
                            <div style={{ fontWeight: 800, color: "#fff" }}>{s.name}</div>
                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{s.appliedRole}</div>
                         </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                         <div style={{ fontSize: "20px", fontWeight: 900, color: i < 3 ? "#6366f1" : "#fff" }}>{s.atsScore}% <span style={{ fontSize: "10px", color: "#888", opacity: 0.5 }}>MATCH</span></div>
                      </div>
                    </div>
                 ))}
               </div>
            </div>
          )}

          {/* JOBS PAGE CLEANER */}
          {activeTab === 'jobs' && (
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
               {/* Create Job Form */}
               <div className="admin-card">
                  <h3 style={{ marginBottom: "30px", fontSize: "20px", fontFamily: "Orbitron", display: "flex", alignItems: "center", gap: "10px" }}>
                     <i className="fas fa-plus-circle" style={{ color: "#f59e0b" }}></i> Post a New <span style={{ color: "#f59e0b" }}>Role</span>
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                     <div>
                        <label style={{ fontSize: "11px", fontWeight: 900, textTransform: "uppercase", opacity: 0.4, marginBottom: "8px", display: "block" }}>Job Title</label>
                        <input type="text" value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff" }} />
                     </div>
                     <div>
                        <label style={{ fontSize: "11px", fontWeight: 900, textTransform: "uppercase", opacity: 0.4, marginBottom: "8px", display: "block" }}>Experience (Min - Max)</label>
                        <div style={{ display: "flex", gap: "10px" }}>
                           <input type="number" placeholder="Min" value={jobForm.minExperience} onChange={e => setJobForm({ ...jobForm, minExperience: e.target.value })} style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff" }} />
                           <input type="number" placeholder="Max" value={jobForm.maxExperience} onChange={e => setJobForm({ ...jobForm, maxExperience: e.target.value })} style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff" }} />
                        </div>
                     </div>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                     <label style={{ fontSize: "11px", fontWeight: 900, textTransform: "uppercase", opacity: 0.4, marginBottom: "8px", display: "block" }}>Description</label>
                     <textarea value={jobForm.description} onChange={e => setJobForm({ ...jobForm, description: e.target.value })} style={{ width: "100%", height: "100px", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                     <label style={{ fontSize: "11px", fontWeight: 900, textTransform: "uppercase", opacity: 0.4, marginBottom: "8px", display: "block" }}>Upload Detailed JD (PDF)</label>
                     <input type="file" onChange={e => setJdFile(e.target.files[0])} style={{ width: "100%", padding: "10px", border: "1px dashed #f59e0b", borderRadius: "8px", color: "rgba(255,255,255,0.4)" }} />
                  </div>
                  <button onClick={async () => {
                     setLoading(true);
                     const fd = new FormData();
                     Object.keys(jobForm).forEach(k => fd.append(k, jobForm[k]));
                     if(jdFile) fd.append('jdFile', jdFile);
                     const resp = await fetch('${API_BASE_URL}/api/admin/jobs', { method: 'POST', headers: { 'x-auth-token': token }, body: fd });
                     if(resp.ok) { setSuccess("Job Published!"); fetchData(); setJobForm({ title: "", description: "", responsibilities: "", skills: "", minExperience: 0, maxExperience: 0, status: 'Published' }); }
                     setLoading(false);
                  }} className="btn-y" style={{ width: "100%", padding: "18px", borderRadius: "12px", background: "#f59e0b", color: "#000" }}>Publish Post</button>
               </div>

               <div className="admin-card">
                  <h3 style={{ marginBottom: "25px", color: "#fff" }}>Active Job Openings</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>
                    {jobs.map(j => (
                      <div key={j._id}>
                        <div style={{ padding: "25px", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(245, 158, 11, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b" }}><i className="fas fa-briefcase"></i></div>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: "16px", color: "#fff" }}>{j.title}</div>
                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{j.status} • {j.minExperience}-{j.maxExperience} Yrs Exp</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button 
                                  onClick={() => {
                                      setActiveJobId(j._id);
                                      const qs = allQuestions.filter(q => q.jobId === j._id);
                                      setJobQuestions(qs);
                                  }}
                                  className="btn-dk-v2"
                                  style={{ padding: "10px 18px", fontSize: "11px" }}
                                >Questions ({allQuestions.filter(q => q.jobId === j._id).length})</button>
                                <button onClick={() => deleteJob(j._id)} style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(240,62,62,0.1)", border: "none", color: "#f03e3e", cursor: "pointer" }}><i className="fas fa-trash"></i></button>
                            </div>
                        </div>
                        
                        {/* Inline Questions Management */}
                        {activeJobId === j._id && (
                           <div style={{ marginTop: "20px", padding: "35px", background: "rgba(0,0,0,0.2)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
                                 <h4 style={{ fontSize: "15px", margin: 0, color: "#fff" }}>Add Assessment Question</h4>
                                 <button onClick={() => setActiveJobId(null)} style={{ border: "none", background: "none", color: "#fff", fontWeight: 900, cursor: "pointer", fontSize: "20px" }}>×</button>
                              </div>
                               <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "15px", marginBottom: "20px" }}>
                                 <input type="text" placeholder="Enter Question text..." value={jobQForm.questionText} onChange={e => setJobQForm({ ...jobQForm, questionText: e.target.value })} style={{ padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff" }} />
                                 <select value={jobQForm.questionType} onChange={e => setJobQForm({ ...jobQForm, questionType: e.target.value, correctAnswer: e.target.value === 'boolean' ? 'true' : 0, options: ["", "", "", ""] })} style={{ padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "#0c0c0e", color: "#fff" }}>
                                    <option value="text">Text Input</option>
                                    <option value="boolean">Yes/No</option>
                                    <option value="mcq">Multiple Choice (MCQ)</option>
                                 </select>
                              </div>

                              {/* MCQ Options with Correct Mark */}
                              {jobQForm.questionType === 'mcq' && (
                                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                                    {jobQForm.options.map((opt, i) => (
                                       <div key={i} style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                          <input type="text" placeholder={`Option ${i+1}`} value={opt} onChange={e => {
                                             const newOpts = [...jobQForm.options];
                                             newOpts[i] = e.target.value;
                                             setJobQForm({ ...jobQForm, options: newOpts });
                                          }} style={{ flex: 1, padding: "12px", paddingRight: "40px", borderRadius: "10px", border: jobQForm.correctAnswer === i ? "1px solid var(--Y)" : "1px solid rgba(255,255,255,0.1)", background: jobQForm.correctAnswer === i ? "rgba(255, 239, 0, 0.05)" : "rgba(255,255,255,0.02)", color: "#fff" }} />
                                          <button onClick={() => setJobQForm({ ...jobQForm, correctAnswer: i })} style={{ position: "absolute", right: "10px", width: "24px", height: "24px", borderRadius: "50%", border: "none", background: jobQForm.correctAnswer === i ? "var(--Y)" : "rgba(255,255,255,0.1)", color: "#000", cursor: "pointer", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                             {jobQForm.correctAnswer === i ? <i className="fas fa-check"></i> : ""}
                                          </button>
                                       </div>
                                    ))}
                                 </div>
                              )}

                              {/* Boolean / Yes-No Toggle */}
                              {jobQForm.questionType === 'boolean' && (
                                 <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                                    <button onClick={() => setJobQForm({ ...jobQForm, correctAnswer: 'true' })} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: jobQForm.correctAnswer === 'true' || jobQForm.correctAnswer === true ? "var(--Y)" : "rgba(255,255,255,0.05)", color: (jobQForm.correctAnswer === 'true' || jobQForm.correctAnswer === true) ? "#000" : "#fff", fontWeight: 800 }}>YES / TRUE</button>
                                    <button onClick={() => setJobQForm({ ...jobQForm, correctAnswer: 'false' })} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: jobQForm.correctAnswer === 'false' || jobQForm.correctAnswer === false ? "#f03e3e" : "rgba(255,255,255,0.05)", color: "#fff", fontWeight: 800 }}>NO / FALSE</button>
                                 </div>
                              )}

                              {/* Text Input Correct Value */}
                              {jobQForm.questionType === 'text' && (
                                 <div style={{ marginBottom: "20px" }}>
                                    <input type="text" placeholder="Enter Expected Correct Keyword (Optional)..." value={jobQForm.correctAnswer} onChange={e => setJobQForm({ ...jobQForm, correctAnswer: e.target.value })} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", color: "#fff" }} />
                                    <small style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", marginTop: "5px", display: "block" }}>* Text answers are matched loosely. If left empty, any answer is accepted.</small>
                                 </div>
                              )}

                              <div style={{ display: "flex", gap: "10px" }}>
                                 <button onClick={async () => {
                                    if(!jobQForm.questionText.trim()) return alert("Please enter the question text.");
                                    if(jobQForm.questionType === 'mcq' && jobQForm.options.some(o => !o.trim())) return alert("Please fill all MCQ options.");
                                    
                                    setLoading(true);
                                    try {
                                       const url = editingQId ? `${API_BASE_URL}/api/admin/questions/${editingQId}` : `${API_BASE_URL}/api/admin/jobs/${j._id}/questions`;
                                       const method = editingQId ? 'PUT' : 'POST';
                                       
                                       const resp = await fetch(url, {
                                          method: method,
                                          headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                                          body: JSON.stringify(jobQForm)
                                       });
                                       if(resp.ok) { 
                                          setSuccess(editingQId ? "Question Updated!" : "Question Published!"); 
                                          setTimeout(() => setSuccess(""), 3000);
                                          fetchData(); 
                                          setJobQForm({ questionText: "", questionType: "text", options: ["", "", "", ""], correctAnswer: 0, isMandatory: true }); 
                                          setEditingQId(null);
                                       }
                                    } catch (err) { setError("Operation failed."); }
                                    setLoading(false);
                                 }} className="btn-dk-v2" style={{ flex: 1, padding: "15px", background: "var(--Y)", color: "#000", fontWeight: 900 }}>
                                    {editingQId ? "Update Question" : "Publish & Link Question"}
                                 </button>
                                 {editingQId && (
                                    <button onClick={() => { setEditingQId(null); setJobQForm({ questionText: "", questionType: "text", options: ["", "", "", ""], correctAnswer: 0, isMandatory: true }); }} style={{ padding: "0 25px", borderRadius: "10px", border: "1.5px solid rgba(255,255,255,0.1)", background: "rgba(255,62,62,0.1)", color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: 800 }}>Cancel</button>
                                 )}
                              </div>

                              <div style={{ marginTop: "40px" }}>
                                 <div style={{ fontSize: "11px", fontWeight: 900, marginBottom: "15px", opacity: 0.4, textTransform: "uppercase", letterSpacing: "1px" }}>ACTIVE ASSESSMENT WORKFLOW</div>
                                 {allQuestions.filter(q => q.jobId === j._id).map((q, idx) => (
                                    <div key={q._id} style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", marginBottom: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
                                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                          <div style={{ flex: 1 }}>
                                             <div style={{ fontSize: "14px", color: "#fff", fontWeight: 700, marginBottom: "8px" }}>{idx+1}. {q.questionText}</div>
                                             <div style={{ display: "flex", gap: "10px" }}>
                                                <span style={{ fontSize: "10px", color: "var(--Y)", background: "rgba(255, 239, 0, 0.1)", padding: "2px 8px", borderRadius: "4px", fontWeight: 900 }}>{q.questionType.toUpperCase()}</span>
                                                <span style={{ fontSize: "10px", color: "#4ade80", fontWeight: 800 }}>
                                                   Correct: {q.questionType === 'mcq' ? (q.options[q.correctAnswer] || "Not Set") : (q.correctAnswer || "ANY").toString().toUpperCase()}
                                                </span>
                                             </div>
                                          </div>
                                          <div style={{ display: "flex", gap: "15px" }}>
                                             <button 
                                               onClick={() => {
                                                  setEditingQId(q._id);
                                                  setJobQForm({ 
                                                     questionText: q.questionText, 
                                                     questionType: q.questionType, 
                                                     options: q.options || ["", "", "", ""], 
                                                     correctAnswer: q.correctAnswer, 
                                                     isMandatory: q.isMandatory 
                                                  });
                                                  window.scrollTo({ top: 400, behavior: 'smooth' });
                                               }}
                                               style={{ border: "none", color: "var(--Y)", background: "none", cursor: "pointer", fontSize: "14px" }}
                                               title="Edit Question"
                                             ><i className="fas fa-edit"></i></button>
                                             <button onClick={async () => {
                                                if(window.confirm("Delete this question forever?")) {
                                                   await fetch(`${API_BASE_URL}/api/admin/questions/${q._id}`, { method: 'DELETE', headers: { 'x-auth-token': token } });
                                                   fetchData();
                                                }
                                             }} style={{ border: "none", color: "rgba(240,62,62,0.6)", background: "none", cursor: "pointer", fontSize: "14px" }}><i className="fas fa-trash-alt"></i></button>
                                          </div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: "#0c0c0e", padding: "40px 0", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "auto" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
             <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontWeight: 800, letterSpacing: "1px" }}>© 2026 LASER EXPERTS INDIA | PREMIUM ADMIN CONSOLE</div>
             <a 
               href="https://www.google.com/maps/search/Laser+Experts+India+Hosur/" 
               target="_blank" 
               rel="noopener noreferrer"
               style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}
             >
                <i className="fas fa-map-marker-alt" style={{ color: "var(--Y)" }}></i> Hosur HQ | Industrial Hub
             </a>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
             <button onClick={() => fetchData()} style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", padding: "12px 24px", borderRadius: "12px", fontSize: "11px", fontWeight: 800, cursor: "pointer", transition: "0.3s" }}>SYNC DATA</button>
             <button onClick={handleLogout} style={{ border: "none", background: "var(--Y)", color: "#000", padding: "12px 24px", borderRadius: "12px", fontSize: "11px", fontWeight: 800, cursor: "pointer" }}>END SESSION</button>
          </div>
        </div>
      </footer>

      <style>{`
        .sidebar-item { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .sidebar-item:hover { color: #fff !important; padding-left: 35px !important; background: #000 !important; border-radius: 12px; }
        .job-row-v2:hover { border-color: var(--Y) !important; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transform: translateY(-3px); }
        .gal-item-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .preview-row { transition: 0.3s; }
        .preview-row:hover { border-color: rgba(255,255,255,0.2) !important; background: rgba(255,255,255,0.06) !important; transform: translateX(8px); }
        
        @keyframes dropdownFade { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(255,239,0,0.4); } 70% { box-shadow: 0 0 0 10px rgba(255,239,0,0); } 100% { box-shadow: 0 0 0 0 rgba(255,239,0,0); } }

        .admin-profile-dropdown {
          position: absolute; top: 100%; right: 0; margin-top: 20px; width: 240px;
          background: #111116; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.6); z-index: 2000; overflow: hidden;
          animation: dropdownFade 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
          backdrop-filter: blur(10px);
        }

        .admin-card {
          background: rgba(30, 41, 59, 0.6); padding: 35px; border-radius: 28px; 
          border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.3); transition: all 0.4s;
          color: #fff;
        }
        .admin-card:hover { border-color: rgba(255,255,255,0.15); }

        .admin-card-header {
           display: flex; justify-content: space-between; alignItems: center; margin-bottom: 25px;
           border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 18px;
        }
        
        .admin-stat-card {
           background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%); 
           border: 1px solid rgba(255,255,255,0.08); padding: 30px; border-radius: 24px;
           transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
           display: flex; align-items: center; justify-content: space-between;
           position: relative; overflow: hidden;
        }
        .admin-stat-card:hover { 
          transform: translateY(-8px); 
          border-color: rgba(255,255,255,0.2);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4); 
        }

        .btn-dk-v2 {
          background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 24px; borderRadius: 12px; fontWeight: 800; cursor: pointer; transition: 0.3s;
        }
        .btn-dk-v2:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.3); }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0c0c0e; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}

export default Admin;

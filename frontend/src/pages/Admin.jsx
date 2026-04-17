import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './Admin.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const getFullUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') && !url.includes('localhost:5000')) return url;
  const cleanPath = url.replace(/^https?:\/\/[^\/]+\//, '').replace(/^\//, '');
  return `${API_BASE_URL}/${cleanPath}`;
};

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
  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState({ title: "", content: "" });
  const [blogPoster, setBlogPoster] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);
  
  const [jobForm, setJobForm] = useState({ title: "", description: "", responsibilities: "", skills: "", minExperience: 0, maxExperience: 0, status: 'Published' });
  const [jdFile, setJdFile] = useState(null);
  const [activeJobId, setActiveJobId] = useState(null); 
  const [jobQuestions, setJobQuestions] = useState([]);
  const [jobQForm, setJobQForm] = useState({ questionText: "", questionType: "text", options: ["", "", "", ""], correctAnswer: 0, isMandatory: true });
  const [viewState, setViewState] = useState('list'); 
  const [editingQId, setEditingQId] = useState(null);
  const [galleryForm, setGalleryForm] = useState({ caption: "", category: "Workspace" });
  const [galleryFile, setGalleryFile] = useState(null);
  
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Forgot Password States
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'forgot'
  const [forgotEmail, setForgotEmail] = useState("");

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
      setError(`CRITICAL: Server unreachable. Check backend status.`);
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const res = await resp.json();
      if (resp.ok) {
        setSuccess("Password reset link sent to your email!");
        setAuthMode("login");
      } else {
        setError(res.message);
      }
    } catch (err) { setError("Failed to send reset link."); }
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
    setLoading(true);
    try {
      const jResp = await fetch(`${API_BASE_URL}/api/admin/jobs`, { headers: { "x-auth-token": authToken } });
      const jData = await jResp.json();
      if (Array.isArray(jData)) setJobs(jData);

      const sResp = await fetch(`${API_BASE_URL}/api/admin/students`, { headers: { "x-auth-token": authToken } });
      const sData = await sResp.json();
      if (Array.isArray(sData)) setStudents(sData);

      const qResp = await fetch(`${API_BASE_URL}/api/admin/all-questions`, { headers: { "x-auth-token": authToken } });
      const qData = await qResp.json();
      if (Array.isArray(qData)) setAllQuestions(qData);

      const gResp = await fetch(`${API_BASE_URL}/api/gallery`);
      const gRes = await gResp.json();
      if (Array.isArray(gRes)) setGallery(gRes);

      const cResp = await fetch(`${API_BASE_URL}/api/categories`);
      const cRes = await cResp.json();
      if (Array.isArray(cRes)) {
        setCategories(cRes.map(c => c.name));
      }

      const bResp = await fetch(`${API_BASE_URL}/api/blogs`);
      const bData = await bResp.json();
      if (Array.isArray(bData)) setBlogs(bData);

    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // --- BLOG HANDLERS ---
  const handleBlogSubmit = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", blogForm.title);
      fd.append("content", blogForm.content);
      if (blogPoster) fd.append("poster", blogPoster);

      const url = editingBlogId 
        ? `${API_BASE_URL}/api/admin/blogs/${editingBlogId}` 
        : `${API_BASE_URL}/api/admin/blogs`;
      
      const resp = await fetch(url, {
        method: editingBlogId ? "PUT" : "POST",
        headers: { "x-auth-token": token },
        body: fd
      });

      if (resp.ok) {
        setSuccess(editingBlogId ? "Blog updated!" : "Blog published!");
        setBlogForm({ title: "", content: "" });
        setBlogPoster(null);
        setEditingBlogId(null);
        fetchData();
      }
    } catch (err) { setError("Blog operation failed."); }
    setLoading(false);
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    await fetch(`${API_BASE_URL}/api/admin/blogs/${id}`, { 
      method: "DELETE", 
      headers: { "x-auth-token": token } 
    });
    fetchData();
  };

  const handleGalleryUpload = async () => {
    if (!galleryFile) {
      setError("Please select a file to upload.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", galleryFile);
      fd.append("caption", galleryForm.caption);
      fd.append("category", galleryForm.category || (categories[0] || "Workspace"));

      const resp = await fetch(`${API_BASE_URL}/api/admin/gallery/upload`, {
        method: "POST",
        headers: { "x-auth-token": token },
        body: fd
      });
      if (resp.ok) {
        setSuccess("Media uploaded successfully!");
        setTimeout(() => setSuccess(""), 3000);
        setGalleryForm({ caption: "", category: categories[0] || "Workspace" });
        setGalleryFile(null);
        // Clear file input visually
        const fileInput = document.getElementById("galleryFileInput");
        if (fileInput) fileInput.value = "";
        fetchData();
      } else {
        const errorData = await resp.json();
        setError(errorData.message || "Failed to upload media.");
      }
    } catch (err) {
      setError("Upload failed.");
    }
    setLoading(false);
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/categories`, {
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
    if (!window.confirm(`Delete category "${catName}"?`)) return;
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/categories/${encodeURIComponent(catName)}`, {
        method: "DELETE",
        headers: { "x-auth-token": token },
      });
      if (resp.ok) {
        setSuccess("Category removed.");
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

  // --- LOGIN PAGE ---
  if (!isLoggedIn) {
      return (
        <div className="admin-auth-root" style={{ minHeight: "100vh", display: "flex", background: "#fff", fontFamily: "'Inter', sans-serif" }}>
          {/* LEFT SIDE: INFO (Tan Gradient) */}
          <div className="auth-left" style={{ 
            flex: "1", 
            background: "linear-gradient(135deg, #e3c19b 0%, #c19b6c 100%)", 
            display: "none", 
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            color: "#000"
          }}>
             <div style={{ textAlign: "center", maxWidth: "450px" }}>
                <div style={{ 
                  margin: "0 auto 30px", width: "80px", height: "80px", 
                  background: "rgba(0,0,0,0.1)", borderRadius: "20px", 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "24px", fontWeight: "900"
                }}>
                  RT
                </div>
                <h1 style={{ fontSize: "40px", fontWeight: "900", marginBottom: "20px" }}>Raitoopto</h1>
                <p style={{ fontSize: "16px", opacity: 0.8, lineHeight: "1.6", marginBottom: "40px" }}>
                   Your secure gateway to the world of industrial automation and advanced laser service management.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fas fa-shield-alt"></i></div>
                      <span style={{ fontWeight: 600, fontSize: "14px" }}>Multi-layer security with token protection</span>
                   </div>
                   <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fas fa-chart-line"></i></div>
                      <span style={{ fontWeight: 600, fontSize: "14px" }}>Real-time candidate indexing and ATS data</span>
                   </div>
                </div>
             </div>
          </div>

          <style>
             {`
               @media (min-width: 1024px) { .auth-left { display: flex !important; } }
               .auth-field:focus { border-color: #c19b6c !important; }
             `}
          </style>

          {/* RIGHT SIDE: FORM */}
          <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
             <div style={{ width: "100%", maxWidth: "420px" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                   <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#111", margin: "0 0 10px" }}>Welcome Back</h2>
                   <p style={{ color: "#666", fontSize: "14px" }}>Enter your credentials to access your account</p>
                </div>

                <div style={{ display: "flex", background: "#f5f5f5", padding: "5px", borderRadius: "12px", marginBottom: "35px" }}>
                   <button onClick={() => setAuthMode('login')} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: authMode === 'login' ? "#e3c19b" : "transparent", fontWeight: 700, cursor: "pointer", transition: "0.3s" }}>Sign In</button>
                   <button style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: "transparent", color: "#999", fontWeight: 700, cursor: "not-allowed" }}>Sign Up</button>
                </div>

                <form onSubmit={authMode === 'login' ? handleLogin : handleForgotPassword} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                   {authMode === 'login' ? (
                     <>
                        <div>
                          <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#333", marginBottom: "10px" }}>Username</label>
                          <div style={{ position: "relative" }}>
                             <i className="far fa-user" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#999" }}></i>
                             <input type="text" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} placeholder="admin" style={{ width: "100%", padding: "16px 16px 16px 45px", borderRadius: "12px", border: "1.5px solid #eee", fontSize: "15px", outline: "none" }} required className="auth-field" autoFocus />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#333", marginBottom: "10px" }}>Password</label>
                          <div style={{ position: "relative" }}>
                             <i className="fas fa-lock" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#999" }}></i>
                             <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••" style={{ width: "100%", padding: "16px 16px 16px 45px", borderRadius: "12px", border: "1.5px solid #eee", fontSize: "15px", outline: "none" }} required className="auth-field" />
                             <i className="far fa-eye" style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "#999", cursor: "pointer" }}></i>
                          </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "-5px" }}>
                           <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#666", cursor: "pointer" }}>
                              <input type="checkbox" style={{ width: "18px", height: "18px" }} /> Remember me
                           </label>
                           <button type="button" onClick={() => setAuthMode('forgot')} style={{ background: "none", border: "none", color: "#c19b6c", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>Forgot password?</button>
                        </div>
                     </>
                   ) : (
                     <div>
                        <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#333", marginBottom: "10px" }}>Work Email Address</label>
                        <div style={{ position: "relative" }}>
                           <i className="far fa-envelope" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#999" }}></i>
                           <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="Enter your email" style={{ width: "100%", padding: "16px 16px 16px 45px", borderRadius: "12px", border: "1.5px solid #eee", fontSize: "15px", outline: "none" }} required className="auth-field" />
                        </div>
                     </div>
                   )}

                   {(error || success) && (
                     <div style={{ 
                        padding: "12px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textAlign: "center",
                        background: error ? "#fff5f5" : "#f0fff4", color: error ? "#e03131" : "#2f9e44", border: `1px solid ${error ? '#ffc9c9' : '#b2f2bb'}`
                     }}>{error || success}</div>
                   )}

                   <button type="submit" disabled={loading} style={{ 
                      width: "100%", padding: "18px", border: "none", borderRadius: "12px", 
                      background: "#e3c19b", color: "#000", fontWeight: 800, fontSize: "16px", 
                      cursor: "pointer", transition: "0.3s", boxShadow: "0 4px 12px rgba(193,155,108,0.2)" 
                   }}>
                      {loading ? "Processing..." : "Sign In"}
                   </button>
                   
                   {authMode === 'forgot' && (
                     <button type="button" onClick={() => setAuthMode('login')} style={{ background: "none", border: "none", color: "#999", fontSize: "14px", fontWeight: 600, cursor: "pointer", width: "100%", textAlign: "center" }}>Back to Sign In</button>
                   )}
                </form>
             </div>
          </div>
        </div>
      );
  }

   return (
    <div className="admin-portal" style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", color: "#333", fontFamily: "'Inter', sans-serif" }}>
      
      {/* NAVBAR: BLACK CASE */}
      <nav style={{ background: "#000", color: "#fff", position: "sticky", top: 0, zIndex: 1000, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "70px", padding: "0 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", color: "#fff", fontSize: "20px", cursor: "pointer", opacity: 0.8 }}><i className="fas fa-bars"></i></button>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#fff" }}>
               <div style={{ fontSize: "20px", fontWeight: "900", color: "#e3c19b" }}>RT</div>
               <span style={{ fontSize: "14px", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" }}>Console</span>
            </Link>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
             <div className="nav-date" style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
             <div style={{ height: "30px", width: "1px", background: "rgba(255,255,255,0.1)" }}></div>
             <div style={{ position: "relative" }}>
                <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "8px 15px", borderRadius: "100px", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
                   <i className="fas fa-user-circle" style={{ fontSize: "18px", color: "#e3c19b" }}></i>
                   Admin
                   <i className={`fas fa-chevron-${profileDropdownOpen ? 'up' : 'down'}`} style={{ fontSize: "10px", opacity: 0.5 }}></i>
                </button>

                {profileDropdownOpen && (
                  <div style={{ 
                    position: "absolute", top: "50px", right: 0, width: "220px", 
                    background: "#fff", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", 
                    padding: "20px", zIndex: 1000, border: "1px solid #eee", color: "#333"
                  }}>
                    <div style={{ borderBottom: "1px solid #eee", paddingBottom: "12px", marginBottom: "12px" }}>
                       <div style={{ fontSize: "14px", fontWeight: 900, color: "#000" }}>System Admin</div>
                       <div style={{ fontSize: "10px", color: "#999", marginTop: "2px" }}>ID: RT-2026-X</div>
                    </div>
                    <button onClick={handleLogout} style={{ width: "100%", textAlign: "left", padding: "10px 0", background: "none", border: "none", fontSize: "13px", color: "#e03131", cursor: "pointer", fontWeight: 700 }}>
                       <i className="fas fa-sign-out-alt" style={{ marginRight: "10px" }}></i> Sign Out
                    </button>
                  </div>
                )}
             </div>
          </div>
        </div>
      </nav>

      
      {/* SIDEBAR LITE */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 1999, backdropFilter: "blur(2px)" }}></div>}
      <aside style={{
          position: "fixed", top: 0, left: sidebarOpen ? "0" : "-300px", width: "300px", height: "100vh",
          background: "#fff", color: "#333", zIndex: 2000, transition: "0.4s",
          boxShadow: "20px 0 50px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column",
          borderRight: "1.5px solid #f0f0f0"
      }}>
         <div style={{ padding: "30px", borderBottom: "1.5px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "16px", fontWeight: 900, color: "#111", textTransform: "uppercase", letterSpacing: "1px" }}>Management</div>
            <button onClick={() => setSidebarOpen(false)} style={{ background: "#f5f5f5", border: "none", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer" }}>✕</button>
         </div>

         <nav style={{ flex: 1, padding: "20px 0" }}>
            {[
               { id: 'dashboard', icon: 'fas fa-th-large', label: 'Dashboard' },
               { id: 'blogs', icon: 'fas fa-newspaper', label: 'Company News' },
               { id: 'gallery', icon: 'fas fa-images', label: 'Media Library' },
               { id: 'students', icon: 'fas fa-users', label: 'Candidates' },
               { id: 'ats', icon: 'fas fa-chart-bar', label: 'ATS Ranking' },
               { id: 'jobs', icon: 'fas fa-briefcase', label: 'Recruitment' }
            ].map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }} className={`sidebar-item-lite ${activeTab === item.id ? 'active' : ''}`}>
                 <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: activeTab === item.id ? "#c19b6c" : "#f5f5f5", display: "flex", align_items: "center", justifyContent: "center", color: activeTab === item.id ? "#fff" : "#999" }}>
                   <i className={item.icon} style={{ fontSize: "14px" }}></i>
                 </div>
                 {item.label}
              </button>
            ))}
         </nav>
      </aside>

      <main style={{ flex: 1, padding: "50px 0" }}>
        <div className="wrap">
           <div style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#c19b6c", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "8px" }}>System Console</div>
                <h1 style={{ margin: 0, fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 900 }}>Welcome Back, <span style={{ color: "#c19b6c" }}>Admin</span></h1>
              </div>
              <button onClick={fetchData} className="btn-lite" style={{ background: "#f5f5f5", border: "1.5px solid #eee", fontSize: "13px", color: "#666" }}>
                 <i className="fas fa-sync" style={{ marginRight: "10px" }}></i> Refresh Data
              </button>
           </div>

           {(error || success) && (
              <div style={{ 
                padding: "15px 25px", borderRadius: "12px", marginBottom: "30px", display: "flex", align_items: "center", gap: "15px",
                background: error ? "#fff5f5" : "#f0fff4", color: error ? "#e03131" : "#2f9e44", border: `1px solid ${error ? '#ffc9c9' : '#b2f2bb'}`
              }}>
                <i className={`fas fa-${error ? 'exclamation-circle' : 'check-circle'}`}></i> {error || success}
              </div>
           )}

           {/* DASHBOARD: LIGHT SOFT CARDS */}
           {activeTab === 'dashboard' && (
             <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "30px" }}>
                   {[
                     { label: 'Total Applicants', val: students.length, icon: 'fas fa-users', bg: '#eef2ff', color: '#6366f1' },
                     { label: 'Published News', val: blogs.length, icon: 'fas fa-newspaper', bg: '#fdf4ff', color: '#d946ef' },
                     { label: 'Media Assets', val: gallery.length, icon: 'fas fa-images', bg: '#f0fdf4', color: '#22c55e' },
                     { label: 'Active Roles', val: jobs.length, icon: 'fas fa-briefcase', bg: '#fff7ed', color: '#f97316' }
                   ].map((stat, i) => (
                     <div key={i} className="admin-card" style={{ display: "flex", justifyContent: "space-between", align_items: "center" }}>
                        <div>
                           <div style={{ fontSize: "13px", color: "#666", fontWeight: 600, marginBottom: "8px" }}>{stat.label}</div>
                           <div style={{ fontSize: "32px", fontWeight: 900 }}>{stat.val}</div>
                        </div>
                        <div style={{ width: "60px", height: "60px", background: stat.bg, borderRadius: "16px", display: "flex", align_items: "center", justifyContent: "center", color: stat.color, fontSize: "22px" }}>
                           <i className={stat.icon}></i>
                        </div>
                     </div>
                   ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "30px" }}>
                   <div className="admin-card">
                      <div style={{ display: "flex", justifyContent: "space-between", align_items: "center", marginBottom: "25px" }}>
                         <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>Recent Activity</h3>
                         <button onClick={() => setActiveTab('students')} style={{ background: "none", border: "none", color: "#c19b6c", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>View All</button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                         {students.slice(0, 5).map(s => (
                           <div key={s._id} style={{ display: "flex", justifyContent: "space-between", align_items: "center", padding: "15px", background: "#f9f9f9", borderRadius: "12px" }}>
                              <div style={{ display: "flex", align_items: "center", gap: "15px" }}>
                                 <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#fff", border: "1.5px solid #eee", fontSize: "14px", display: "flex", align_items: "center", justifyContent: "center" }}>{s.name[0]}</div>
                                 <div>
                                    <div style={{ fontSize: "14px", fontWeight: 800 }}>{s.name}</div>
                                    <div style={{ fontSize: "11px", color: "#999" }}>Applied for {s.appliedRole}</div>
                                 </div>
                              </div>
                              <div style={{ fontSize: "12px", fontWeight: 900, color: s.atsScore > 75 ? "#22c55e" : "#f97316" }}>{s.atsScore}% Match</div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="admin-card" style={{ background: "#fdf8f4", borderColor: "#e3c19b" }}>
                      <h3 style={{ margin: "0 0 15px", fontSize: "18px", fontWeight: 800 }}>System Logistics</h3>
                      <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6", marginBottom: "25px" }}>All core components are healthy. Real-time synchronization is active for candidates and media library.</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                         {[
                           { label: "Cloudinary Engine", status: "Connected", color: "#22c55e" },
                           { label: "MongoDB Pipeline", status: "Active", color: "#22c55e" },
                           { label: "Email SMTP Service", status: "Ready", color: "#22c55e" }
                         ].map((item, i) => (
                           <div key={i} style={{ fontSize: "12px", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
                              <span style={{ color: "#888" }}>{item.label}</span> 
                              <span style={{ color: item.color }}>{item.status}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
           )}

           {/* BLOGS MANAGEMENT */}
           {activeTab === 'blogs' && (
             <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
               <div className="admin-card">
                  <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "25px" }}>{editingBlogId ? "Modify News Entry" : "Create Company Update"}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                     <div>
                       <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Headline</label>
                       <input type="text" value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} className="input-lite" placeholder="Enter post title..." />
                     </div>
                     <div>
                       <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Detailed Content</label>
                       <textarea value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} className="input-lite" style={{ height: "250px", resize: "none" }} placeholder="Describe the news or update..." />
                     </div>
                     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "25px", align_items: "end" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Cover Media</label>
                          <input type="file" onChange={e => setBlogPoster(e.target.files[0])} style={{ width: "100%", padding: "12px", border: "1.5px dashed #ccc", borderRadius: "12px", fontSize: "13px" }} />
                        </div>
                        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                           {editingBlogId && <button onClick={() => { setEditingBlogId(null); setBlogForm({ title: "", content: "" }); }} className="btn-lite" style={{ border: "1.5px solid #eee", background: "#fff" }}>Discard</button>}
                           <button onClick={handleBlogSubmit} disabled={loading} className="btn-lite btn-lite-primary">{loading ? "Synchronizing..." : (editingBlogId ? "Update Live" : "Publish to Web")}</button>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="admin-card">
                  <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "30px" }}>Live Feed Archive</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "25px" }}>
                     {blogs.map(blog => (
                       <div key={blog._id} style={{ border: "1.5px solid #f5f5f5", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                          {blog.imageUrl && <img src={getFullUrl(blog.imageUrl)} style={{ width: "100%", height: "180px", objectFit: "cover" }} alt="" />}
                          <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                             <div style={{ fontSize: "11px", fontWeight: 800, color: "#c19b6c", textTransform: "uppercase", marginBottom: "10px" }}>{new Date(blog.date).toLocaleDateString()}</div>
                             <h4 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: 800, lineHeight: "1.4" }}>{blog.title}</h4>
                             <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", height: "60px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", marginBottom: "20px" }}>{blog.content}</p>
                             <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                                <button onClick={() => { setEditingBlogId(blog._id); setBlogForm({ title: blog.title, content: blog.content }); setActiveTab('blogs'); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1.5px solid #eef2ff", background: "#f8faff", color: "#6366f1", fontSize: "12px", fontWeight: 800 }}>Edit</button>
                                <button onClick={() => deleteBlog(blog._id)} style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#fff5f5", color: "#e03131", border: "none" }}><i className="fas fa-trash-alt"></i></button>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
             </div>
           )}

           {/* GALLERY */}
           {activeTab === 'gallery' && (
             <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                <div className="admin-card">
                   <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px" }}>Storage Segments</h3>
                   <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      {categories.map((c, i) => (
                        <div key={i} style={{ padding: "8px 18px", borderRadius: "100px", background: "#f8f9fa", border: "1.5px solid #eee", fontSize: "13px", fontWeight: 700, display: "flex", align_items: "center", gap: "10px" }}>
                           {c} <button onClick={() => handleDeleteCategory(c)} style={{ border: "none", background: "none", color: "#999", cursor: "pointer", fontSize: "16px" }}>×</button>
                        </div>
                      ))}
                      <input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} placeholder="+ Add Segment" style={{ border: "none", borderBottom: "1.5px solid #ddd", padding: "8px", outline: "none", fontSize: "13px", fontWeight: 600 }} />
                   </div>
                </div>

                <div className="admin-card">
                   <div style={{ display: "flex", justifyContent: "space-between", align_items: "center", marginBottom: "35px", flexWrap: "wrap", gap: "20px" }}>
                      <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 800 }}>Asset Repository</h3>
                      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                         <input type="text" placeholder="Caption" className="input-lite" style={{ width: "200px" }} value={galleryForm.caption} onChange={e => setGalleryForm({...galleryForm, caption: e.target.value})} />
                         <select value={galleryForm.category} className="input-lite" style={{ width: "160px" }} onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}>
                           {categories.map(c => <option key={c} value={c}>{c}</option>)}
                         </select>
                         <input type="file" onChange={e => setGalleryFile(e.target.files[0])} style={{ padding: "10px", border: "1.5px dashed #ccc", borderRadius: "12px", fontSize: "13px" }} />
                         <button onClick={handleGalleryUpload} className="btn-lite btn-lite-primary" disabled={loading}>Ingest Media</button>
                      </div>
                   </div>
                   <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
                      {gallery.map(g => (
                        <div key={g._id} style={{ border: "1.5px solid #f0f0f0", borderRadius: "20px", overflow: "hidden", position: "relative", height: "240px" }}>
                           {g.contentType === 'video' ? <video src={getFullUrl(g.imageUrl)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <img src={getFullUrl(g.imageUrl)} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />}
                           <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "15px", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", color: "#fff" }}>
                              <div style={{ fontSize: "12px", fontWeight: 800 }}>{g.caption || "Industrial Photo"}</div>
                              <div style={{ fontSize: "10px", opacity: 0.7, textTransform: "uppercase", marginTop: "4px" }}>{g.category}</div>
                           </div>
                           <button onClick={() => delGallery(g._id)} style={{ position: "absolute", top: "15px", right: "15px", background: "#fff", border: "none", width: "36px", height: "36px", borderRadius: "50%", color: "#e03131", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", cursor: "pointer" }}><i className="fas fa-trash-alt"></i></button>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           )}

           {/* CANDIDATES TABLE */}
           {activeTab === 'students' && (
             <div className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", align_items: "center", marginBottom: "30px" }}>
                   <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 800 }}>Applicant Database</h3>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
                     <thead>
                        <tr style={{ textAlign: "left", background: "#f8f9fa", color: "#666" }}>
                           <th style={{ padding: "18px 25px", fontSize: "12px", fontWeight: 800, borderRadius: "12px 0 0 12px" }}>IDENTITY</th>
                           <th style={{ padding: "18px 25px", fontSize: "12px", fontWeight: 800 }}>APPLIED POSITION</th>
                           <th style={{ padding: "18px 25px", fontSize: "12px", fontWeight: 800, textAlign: "center" }}>ATS SCORE</th>
                           <th style={{ padding: "18px 25px", fontSize: "12px", fontWeight: 800, textAlign: "center", borderRadius: "0 12px 12px 0" }}>OPERATIONS</th>
                        </tr>
                     </thead>
                     <tbody>
                        {students.map(s => (
                          <tr key={s._id} style={{ background: "#fdfdfd", transition: "0.2s" }}>
                             <td style={{ padding: "18px 25px", borderRadius: "12px 0 0 12px" }}>
                                <div style={{ fontWeight: 800, fontSize: "15px" }}>{s.name}</div>
                                <div style={{ fontSize: "12px", color: "#888" }}>{s.email}</div>
                             </td>
                             <td style={{ padding: "18px 25px", fontSize: "14px", fontWeight: 600 }}>{s.appliedRole}</td>
                             <td style={{ padding: "18px 25px", textAlign: "center" }}>
                                <span style={{ padding: "8px 16px", borderRadius: "100px", background: s.atsScore > 75 ? "#f0fdf4" : "#fff7ed", color: s.atsScore > 75 ? "#22c55e" : "#f97316", fontWeight: 900, fontSize: "12px" }}>{s.atsScore}% Index</span>
                             </td>
                             <td style={{ padding: "18px 25px", textAlign: "center", borderRadius: "0 12px 12px 0" }}>
                                <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                                   <a href={getFullUrl(s.resumeUrl)} target="_blank" rel="noreferrer" title="Download CV" style={{ padding: "10px", color: "#c19b6c", background: "#fdf8f4", borderRadius: "10px" }}><i className="fas fa-download"></i></a>
                                   <button 
                                     onClick={async () => {
                                        if(window.confirm(`Select ${s.name} for Interview?`)) {
                                            setLoading(true);
                                            const resp = await fetch(`${API_BASE_URL}/api/admin/send-selection-email`, {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                                                body: JSON.stringify({ studentId: s._id, email: s.email, name: s.name })
                                            });
                                            const res = await resp.json();
                                            if(res.success) setSuccess(res.message);
                                            else setError(res.message);
                                            setLoading(false);
                                        }
                                     }}
                                     style={{ padding: "10px", border: "none", background: "#f0fdf4", color: "#22c55e", borderRadius: "10px", cursor: "pointer" }}
                                   ><i className="fas fa-check-circle"></i></button>
                                   <button 
                                     onClick={async () => {
                                        if(window.confirm(`Reject ${s.name}'s application?`)) {
                                            setLoading(true);
                                            const resp = await fetch(`${API_BASE_URL}/api/admin/send-rejection-email`, {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                                                body: JSON.stringify({ studentId: s._id, email: s.email, name: s.name })
                                            });
                                            const res = await resp.json();
                                            if(res.success) setSuccess(res.message);
                                            else setError(res.message);
                                            setLoading(false);
                                        }
                                     }}
                                     style={{ padding: "10px", border: "none", background: "#fff5f5", color: "#e03131", borderRadius: "10px", cursor: "pointer" }}
                                   ><i className="fas fa-times-circle"></i></button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
                </div>
             </div>
           )}

           {/* RECRUITMENT PAGE */}
           {activeTab === 'jobs' && (
              <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                  <div className="admin-card">
                     <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "25px" }}>Configure New Recruitment</h3>
                     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Job Designation</label>
                          <input type="text" placeholder="e.g. Laser Systems Engineer" className="input-lite" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Visibility Status</label>
                          <select className="input-lite" value={jobForm.status} onChange={e => setJobForm({...jobForm, status: e.target.value})}>
                            <option value="Published">External (Live)</option>
                            <option value="Draft">Internal (Hidden)</option>
                            <option value="Closed">Archived</option>
                          </select>
                        </div>
                        <div style={{ gridColumn: "span 2" }}>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Role Definition</label>
                          <textarea placeholder="Summarize the core requirements..." className="input-lite" style={{ height: "100px", resize: "none" }} value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} />
                        </div>
                     </div>
                     <button 
                       onClick={async () => {
                          const resp = await fetch(`${API_BASE_URL}/api/admin/jobs`, {
                             method: 'POST',
                             headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                             body: JSON.stringify(jobForm)
                          });
                          if(resp.ok) { setSuccess("Position added to portal."); setJobForm({ title: "", description: "", responsibilities: "", skills: "", minExperience: 0, maxExperience: 0, status: 'Published' }); fetchData(); }
                       }}
                       className="btn-lite btn-lite-primary" style={{ marginTop: "25px" }}
                     >Create Opening</button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "25px" }}>
                     {jobs.map(j => (
                       <div key={j._id} className="admin-card" style={{ borderLeft: `5px solid ${j.status === 'Published' ? '#22c55e' : '#ff922b'}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", align_items: "center", marginBottom: "15px" }}>
                             <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>{j.title}</h4>
                             <span style={{ fontSize: "10px", padding: "4px 10px", borderRadius: "100px", background: "#f8f9fa", fontWeight: 800 }}>{j.status}</span>
                          </div>
                          <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.5", marginBottom: "20px" }}>{j.description.substring(0, 100)}...</p>
                          <div style={{ display: "flex", gap: "10px" }}>
                             <button onClick={() => deleteJob(j._id)} style={{ flex: 1, padding: "12px", borderRadius: "12px", background: "#fff5f5", color: "#e03131", border: "none", fontSize: "13px", fontWeight: 800 }}>Remove Position</button>
                          </div>
                       </div>
                     ))}
                  </div>
              </div>
           )}
        </div>
      </main>

      <footer style={{ padding: "40px", textAlign: "center", borderTop: "1.5px solid #f0f0f0", background: "#fff", fontSize: "12px", fontWeight: 700, color: "#999", letterSpacing: "1px" }}>
         &copy; 2026 RAITOOPTO &bull; PROFESSIONAL MANAGEMENT PLATFORM
      </footer>
    </div>
  );
}

export default Admin;

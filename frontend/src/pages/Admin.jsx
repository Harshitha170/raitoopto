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
  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password States
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'forgot'
  const [forgotEmail, setForgotEmail] = useState("");

  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const notify = (type, msg) => {
    if (type === 'error') {
      setError(msg);
      setTimeout(() => setError(""), 5000);
    } else {
      setSuccess(msg);
      setTimeout(() => setSuccess(""), 5000);
    }
  };

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
        notify('success', "Password reset link sent to your email!");
        setAuthMode("login");
      } else {
        notify('error', res.message);
      }
    } catch (err) { notify('error', "Failed to send reset link."); }
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
        notify('success', editingBlogId ? "Blog updated!" : "Blog published!");
        setBlogForm({ title: "", content: "" });
        setBlogPoster(null);
        setEditingBlogId(null);
        fetchData();
      }
    } catch (err) { notify('error', "Blog operation failed."); }
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
      notify('error', "Please select a file to upload.");
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
        notify('success', "Media uploaded successfully!");
        setGalleryForm({ caption: "", category: categories[0] || "Workspace" });
        setGalleryFile(null);
        // Clear file input visually
        const fileInput = document.getElementById("galleryFileInput");
        if (fileInput) fileInput.value = "";
        fetchData();
      } else {
        const errorData = await resp.json();
        notify('error', errorData.message || "Failed to upload media.");
      }
    } catch (err) {
      notify('error', "Upload failed.");
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
        notify('success', "Category added!");
        setNewCatName("");
        fetchData();
      }
    } catch (err) { notify('error', "Failed to add category."); }
  };

  const handleDeleteCategory = async (catName) => {
    if (!window.confirm(`Delete category "${catName}"?`)) return;
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/categories/${encodeURIComponent(catName)}`, {
        method: "DELETE",
        headers: { "x-auth-token": token },
      });
      if (resp.ok) {
        notify('success', "Category removed.");
        fetchData();
      }
    } catch (err) { notify('error', "Failed to delete category."); }
  };

  const delGallery = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`${API_BASE_URL}/api/admin/gallery/${id}`, { method: "DELETE", headers: { "x-auth-token": token } });
    fetchData();
  };

  const deleteJob = async (id) => {
      if (!window.confirm("Are you sure?")) return;
      await fetch(`${API_BASE_URL}/api/admin/jobs/${id}`, { method: "DELETE", headers: { "x-auth-token": token } });
      notify('success', "Job deleted.");
      fetchData();
  };

  // --- LOGIN PAGE ---
  if (!isLoggedIn) {
      return (
        <div className="admin-auth-root" style={{ minHeight: "100vh", display: "flex", background: "#f8f9fa", fontFamily: "'Inter', sans-serif" }}>
          {/* LEFT SIDE: INFO (Modern Dark Accent) */}
          <div className="auth-left" style={{ 
            flex: "1", 
            background: "#111", 
            display: "none", 
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            color: "#fff"
          }}>
             <div style={{ textAlign: "center", maxWidth: "450px" }}>
                <div style={{ 
                  margin: "0 auto 30px", width: "80px", height: "80px", 
                  background: "var(--primary)", borderRadius: "20px", 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "24px", fontWeight: "900", color: "#000"
                }}>
                  RT
                </div>
                <h1 style={{ fontSize: "40px", fontWeight: "900", marginBottom: "20px" }}>Raitoopto <span style={{ color: "var(--primary)" }}>Admin</span></h1>
                <p style={{ fontSize: "16px", opacity: 0.7, lineHeight: "1.6", marginBottom: "40px" }}>
                   Secure management portal for industrial automation recruitment and content workflows.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}><i className="fas fa-shield-alt"></i></div>
                      <span style={{ fontWeight: 600, fontSize: "14px", opacity: 0.8 }}>End-to-end encrypted session management</span>
                   </div>
                   <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}><i className="fas fa-microchip"></i></div>
                      <span style={{ fontWeight: 600, fontSize: "14px", opacity: 0.8 }}>Automated ATS Keyword Indexing</span>
                   </div>
                </div>
             </div>
          </div>

          <style>
             {`
               @media (min-width: 1024px) { .auth-left { display: flex !important; } }
               .auth-field:focus { border-color: var(--primary) !important; box-shadow: 0 0 0 4px var(--primary-light) !important; }
               .auth-btn:hover { background: var(--primary-dark) !important; transform: translateY(-2px); }
               .auth-btn:active { transform: translateY(0); }
             `}
          </style>

          {/* RIGHT SIDE: FORM */}
          <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
             <div style={{ width: "100%", maxWidth: "420px" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                   <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#111", margin: "0 0 10px" }}>{authMode === 'login' ? 'Welcome Back' : 'Recover Account'}</h2>
                   <p style={{ color: "#666", fontSize: "15px" }}>{authMode === 'login' ? 'Enter your credentials to access the console' : 'Enter your email to receive a password reset link'}</p>
                </div>

                <form onSubmit={authMode === 'login' ? handleLogin : handleForgotPassword} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                   {authMode === 'login' ? (
                     <>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#333", marginBottom: "8px" }}>Username</label>
                          <div style={{ position: "relative" }}>
                             <i className="far fa-user" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#999" }}></i>
                             <input type="text" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} placeholder="admin" style={{ width: "100%", padding: "16px 16px 16px 48px", borderRadius: "12px", border: "1.5px solid #eee", fontSize: "15px", outline: "none", transition: "0.3s" }} required className="auth-field" autoFocus />
                          </div>
                        </div>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                            <label style={{ fontSize: "13px", fontWeight: 700, color: "#333" }}>Password</label>
                            <button type="button" onClick={() => setAuthMode('forgot')} style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>Forgot Password?</button>
                          </div>
                          <div style={{ position: "relative" }}>
                             <i className="fas fa-lock" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#999" }}></i>
                             <input type={showPassword ? "text" : "password"} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••" style={{ width: "100%", padding: "16px 48px 16px 48px", borderRadius: "12px", border: "1.5px solid #eee", fontSize: "15px", outline: "none", transition: "0.3s" }} required className="auth-field" />
                             <i className={`far ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "#999", cursor: "pointer" }}></i>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                           <input type="checkbox" id="remember" style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                           <label htmlFor="remember" style={{ fontSize: "14px", color: "#666", cursor: "pointer" }}>Keep me logged in</label>
                        </div>
                     </>
                   ) : (
                     <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#333", marginBottom: "8px" }}>Work Email Address</label>
                        <div style={{ position: "relative" }}>
                           <i className="far fa-envelope" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#999" }}></i>
                           <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="admin@raitoopto.com" style={{ width: "100%", padding: "16px 16px 16px 48px", borderRadius: "12px", border: "1.5px solid #eee", fontSize: "15px", outline: "none", transition: "0.3s" }} required className="auth-field" />
                        </div>
                     </div>
                   )}

                   {(error || success) && (
                     <div style={{ 
                        padding: "14px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, textAlign: "left", display: "flex", alignItems: "center", gap: "10px",
                        background: error ? "#fff5f5" : "#f0fff4", color: error ? "#e03131" : "#2f9e44", border: `1px solid ${error ? '#ffc9c9' : '#b2f2bb'}`
                     }}>
                        <i className={`fas fa-${error ? 'exclamation-triangle' : 'check-circle'}`}></i>
                        {error || success}
                     </div>
                   )}

                   <button type="submit" disabled={loading} className="auth-btn" style={{ 
                      width: "100%", padding: "18px", border: "none", borderRadius: "12px", 
                      background: "var(--accent)", color: "#fff", fontWeight: 800, fontSize: "16px", 
                      cursor: "pointer", transition: "0.3s", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
                   }}>
                      {loading ? "AUTHENTICATING..." : (authMode === 'login' ? "SIGN IN" : "SEND RESET LINK")}
                   </button>
                   
                   {authMode === 'forgot' && (
                     <button type="button" onClick={() => setAuthMode('login')} style={{ background: "none", border: "none", color: "#666", fontSize: "14px", fontWeight: 700, cursor: "pointer", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                       <i className="fas fa-arrow-left"></i> Back to login
                     </button>
                   )}
                </form>

                <div style={{ marginTop: "60px", textAlign: "center", borderTop: "1px solid #eee", paddingTop: "30px" }}>
                   <p style={{ fontSize: "12px", color: "#999", fontWeight: 700, letterSpacing: "1px" }}>&copy; 2026 RAITOOPTO SYSTEMS</p>
                </div>
             </div>
          </div>
        </div>
      );
  }

   return (
    <div className="admin-portal" style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", color: "#333", fontFamily: "'Inter', sans-serif" }}>
      
      {/* NAVBAR: BLACK CASE */}
      <nav style={{ background: "#111", color: "#fff", position: "sticky", top: 0, zIndex: 1000, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", borderBottom: "2px solid #e3c19b" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "70px", padding: "0 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "#fff", width: "40px", height: "40px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fas fa-bars"></i></button>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "#fff" }}>
               <div style={{ fontSize: "22px", fontWeight: "900", color: "#e3c19b", letterSpacing: "1px" }}>RAITOOPTO</div>
               <div style={{ padding: "4px 8px", background: "#e3c19b", borderRadius: "4px", color: "#000", fontSize: "10px", fontWeight: "900" }}>ADMIN</div>
            </Link>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
             <div className="nav-date" style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</div>
             <div style={{ height: "24px", width: "1px", background: "rgba(255,255,255,0.1)" }}></div>
             <div style={{ position: "relative" }}>
                <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "8px 16px", borderRadius: "100px", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
                   <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#e3c19b", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 900 }}>A</div>
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
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1999, backdropFilter: "blur(4px)" }}></div>}
      <aside style={{
          position: "fixed", top: 0, left: sidebarOpen ? "0" : "-300px", width: "300px", height: "100vh",
          background: "#fff", color: "#333", zIndex: 2000, transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "25px 0 60px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column",
          borderRight: "1px solid #f0f0f0"
      }}>
         <div style={{ padding: "30px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
               <div style={{ width: "10px", height: "30px", background: "var(--primary)", borderRadius: "5px" }}></div>
               <div style={{ fontSize: "18px", fontWeight: 900, color: "#111", textTransform: "uppercase", letterSpacing: "1px" }}>Console</div>
            </div>
            <button onClick={() => setSidebarOpen(false)} style={{ background: "#f5f5f5", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fas fa-times"></i></button>
         </div>

         <nav style={{ flex: 1, padding: "20px 0" }}>
            {[
               { id: 'dashboard', icon: 'fas fa-th-large', label: 'Dashboard', color: '#6366f1' },
               { id: 'blogs', icon: 'fas fa-newspaper', label: 'Blogs', color: '#10b981' },
               { id: 'gallery', icon: 'fas fa-images', label: 'Gallery', color: '#ec4899' },
               { id: 'students', icon: 'fas fa-users', label: 'Applications', color: '#f59e0b' },
               { id: 'ats', icon: 'fas fa-chart-line', label: 'ATS Ranking', color: '#3b82f6' },
               { id: 'jobs', icon: 'fas fa-briefcase', label: 'Jobs', color: '#8b5cf6' }
            ].map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }} className={`sidebar-item-lite ${activeTab === item.id ? 'active' : ''}`}>
                 <div style={{ 
                   width: "36px", height: "36px", borderRadius: "10px", 
                   background: activeTab === item.id ? item.color : '#f8f9fa', 
                   display: "flex", alignItems: "center", justifyContent: "center", 
                   color: activeTab === item.id ? "#fff" : item.color,
                   boxShadow: activeTab === item.id ? `0 4px 12px ${item.color}44` : 'none',
                   transition: "0.3s"
                 }}>
                   <i className={item.icon} style={{ fontSize: "16px" }}></i>
                 </div>
                 <span style={{ fontWeight: activeTab === item.id ? 800 : 600 }}>{item.label}</span>
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
                padding: "15px 25px", borderRadius: "12px", marginBottom: "30px", display: "flex", alignItems: "center", gap: "15px",
                background: error ? "#fff5f5" : "#f0fff4", color: error ? "#e03131" : "#2f9e44", border: `1px solid ${error ? '#ffc9c9' : '#b2f2bb'}`
              }}>
                <i className={`fas fa-${error ? 'exclamation-circle' : 'check-circle'}`}></i> {error || success}
              </div>
           )}

           {/* DASHBOARD: PREMIUM CARDS */}
           {activeTab === 'dashboard' && (
             <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "30px" }}>
                   {[
                     { label: 'Applications', val: students.length, icon: 'fas fa-users', color: '#6366f1', bg: '#eef2ff' },
                     { label: 'Live Blogs', val: blogs.length, icon: 'fas fa-newspaper', color: '#10b981', bg: '#ecfdf5' },
                     { label: 'Media Assets', val: gallery.length, icon: 'fas fa-images', color: '#ec4899', bg: '#fdf2f8' },
                     { label: 'Active Jobs', val: jobs.length, icon: 'fas fa-briefcase', color: '#8b5cf6', bg: '#f5f3ff' }
                   ].map((stat, i) => (
                     <div key={i} className="admin-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `4px solid ${stat.color}` }}>
                        <div>
                           <div style={{ fontSize: "14px", color: "#666", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</div>
                           <div style={{ fontSize: "36px", fontWeight: 900 }}>{stat.val}</div>
                        </div>
                        <div className="stat-card-icon" style={{ background: stat.bg, color: stat.color }}>
                           <i className={stat.icon}></i>
                        </div>
                     </div>
                   ))}
                </div>

                {/* Job Role Wise Counts */}
                <div className="admin-card">
                   <h3 style={{ margin: "0 0 25px", fontSize: "18px", fontWeight: 800 }}>Role-wise Distribution</h3>
                   <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                      {jobs.map(job => {
                        const count = students.filter(s => s.appliedRole === job.title).length;
                        return (
                          <div key={job._id} style={{ padding: "15px", borderRadius: "12px", background: "#f8f9fa", border: "1px solid #eee" }}>
                             <div style={{ fontSize: "12px", color: "#888", fontWeight: 700, marginBottom: "5px" }}>{job.title}</div>
                             <div style={{ fontSize: "20px", fontWeight: 900, color: "var(--primary)" }}>{count} <span style={{ fontSize: "12px", color: "#999", fontWeight: 600 }}>Applicants</span></div>
                          </div>
                        );
                      })}
                   </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "30px" }}>
                   <div className="admin-card">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
                         <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>Recent Activity</h3>
                         <button onClick={() => setActiveTab('students')} style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>View All</button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                         {students.slice(0, 5).map(s => (
                           <div key={s._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", background: "#fdfdfd", border: "1.5px solid #f5f5f5", borderRadius: "16px", transition: "0.3s" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                 <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--primary-light)", color: "var(--primary)", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>{s.name[0]}</div>
                                 <div>
                                    <div style={{ fontSize: "14px", fontWeight: 800 }}>{s.name}</div>
                                    <div style={{ fontSize: "11px", color: "#888" }}>Applied for {s.appliedRole}</div>
                                 </div>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                 <div style={{ fontSize: "12px", fontWeight: 900, color: s.atsScore > 75 ? "#22c55e" : "#f59e0b" }}>{s.atsScore}% Score</div>
                                 <div style={{ fontSize: "9px", color: "#aaa", textTransform: "uppercase", marginTop: "2px" }}>{new Date(s.appliedDate || Date.now()).toLocaleDateString()}</div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="admin-card" style={{ background: "#111", color: "#fff", borderColor: "#333" }}>
                      <h3 style={{ margin: "0 0 15px", fontSize: "18px", fontWeight: 800, color: "var(--primary)" }}>System Reliability</h3>
                      <p style={{ fontSize: "14px", color: "#aaa", lineHeight: "1.6", marginBottom: "25px" }}>Real-time synchronization active. Cloudinary and MongoDB pipelines are operating at 100% health.</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                         {[
                           { label: "Storage Engine", status: "Operational", color: "#10b981", icon: "fa-cloud" },
                           { label: "Database Cluster", status: "Healthy", color: "#10b981", icon: "fa-database" },
                           { label: "Email Gateway", status: "Ready", color: "#10b981", icon: "fa-paper-plane" }
                         ].map((item, i) => (
                           <div key={i} style={{ fontSize: "13px", fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "10px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                 <i className={`fas ${item.icon}`} style={{ color: item.color, width: "16px" }}></i>
                                 <span style={{ color: "#eee" }}>{item.label}</span> 
                              </div>
                              <span style={{ color: item.color, fontSize: "11px", textTransform: "uppercase" }}>{item.status}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
           )}

           {/* ATS RANKING VIEW (New!) */}
           {activeTab === 'ats' && (
              <div className="admin-card">
                 <div style={{ marginBottom: "30px" }}>
                    <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 800 }}>Applicant ATS Insights</h3>
                    <p style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>Ranked list of candidates based on keyword matching and technical scores.</p>
                 </div>
                 <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px" }}>
                       <thead>
                          <tr style={{ textAlign: "left", color: "#888" }}>
                             <th style={{ padding: "12px 20px", fontSize: "12px", fontWeight: 800 }}>CANDIDATE</th>
                             <th style={{ padding: "12px 20px", fontSize: "12px", fontWeight: 800 }}>POSITION</th>
                             <th style={{ padding: "12px 20px", fontSize: "12px", fontWeight: 800 }}>MATCH RANK</th>
                             <th style={{ padding: "12px 20px", fontSize: "12px", fontWeight: 800, textAlign: "center" }}>STATUS</th>
                          </tr>
                       </thead>
                       <tbody>
                          {[...students].sort((a,b) => b.atsScore - a.atsScore).map((s, idx) => (
                            <tr key={s._id} style={{ background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.02)", borderRadius: "12px" }}>
                               <td style={{ padding: "18px 20px", borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                     <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800 }}>#{idx+1}</div>
                                     <div>
                                        <div style={{ fontWeight: 800, fontSize: "14px" }}>{s.name}</div>
                                        <div style={{ fontSize: "11px", color: "#999" }}>{s.email}</div>
                                     </div>
                                  </div>
                               </td>
                               <td style={{ padding: "18px 20px", fontWeight: 700, fontSize: "13px" }}>{s.appliedRole}</td>
                               <td style={{ padding: "18px 20px" }}>
                                  <div style={{ width: "100%", maxWidth: "150px", height: "8px", background: "#eee", borderRadius: "10px", position: "relative", overflow: "hidden" }}>
                                     <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${s.atsScore}%`, background: s.atsScore > 80 ? '#10b981' : (s.atsScore > 60 ? '#f59e0b' : '#ef4444') }}></div>
                                  </div>
                                  <div style={{ fontSize: "10px", fontWeight: 800, color: "#666", marginTop: "5px" }}>{s.atsScore}% RELEVANCY</div>
                               </td>
                               <td style={{ padding: "18px 20px", textAlign: "center", borderTopRightRadius: "12px", borderBottomRightRadius: "12px" }}>
                                  <span style={{ padding: "6px 14px", borderRadius: "100px", background: s.atsScore > 75 ? "#ecfdf5" : "#fffbeb", color: s.atsScore > 75 ? "#059669" : "#d97706", fontSize: "11px", fontWeight: 800 }}>
                                     {s.atsScore > 75 ? 'HIGH POTENTIAL' : 'REVIEW NEEDED'}
                                  </span>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           )}

           {/* APPLICATIONS LIST */}
           {activeTab === 'students' && (
             <div className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                   <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 800 }}>Candidate Operations</h3>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
                     <thead>
                        <tr style={{ textAlign: "left", background: "#f8f9fa", color: "#666" }}>
                           <th style={{ padding: "18px 25px", fontSize: "12px", fontWeight: 800, borderRadius: "12px 0 0 12px" }}>IDENTITY</th>
                           <th style={{ padding: "18px 25px", fontSize: "12px", fontWeight: 800 }}>POSITION</th>
                           <th style={{ padding: "18px 25px", fontSize: "12px", fontWeight: 800, textAlign: "center" }}>ATS SCORE</th>
                           <th style={{ padding: "18px 25px", fontSize: "12px", fontWeight: 800, textAlign: "center", borderRadius: "0 12px 12px 0" }}>ACTIONS</th>
                        </tr>
                     </thead>
                     <tbody>
                        {students.map(s => (
                          <tr key={s._id} className="preview-row" style={{ background: "#fff", transition: "0.2s" }}>
                             <td style={{ padding: "18px 25px", borderRadius: "12px 0 0 12px" }}>
                                <div style={{ fontWeight: 800, fontSize: "15px" }}>{s.name}</div>
                                <div style={{ fontSize: "12px", color: "#888" }}>{s.email}</div>
                             </td>
                             <td style={{ padding: "18px 25px", fontSize: "14px", fontWeight: 600 }}>{s.appliedRole}</td>
                             <td style={{ padding: "18px 25px", textAlign: "center" }}>
                                <span style={{ padding: "8px 16px", borderRadius: "100px", background: s.atsScore > 75 ? "#f1fdf4" : "#fefce8", color: s.atsScore > 75 ? "#16a34a" : "#ca8a04", fontWeight: 900, fontSize: "12px" }}>{s.atsScore}% Index</span>
                             </td>
                             <td style={{ padding: "18px 25px", textAlign: "center", borderRadius: "0 12px 12px 0" }}>
                                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                   <a href={getFullUrl(s.resumeUrl)} target="_blank" rel="noreferrer" title="View CV" style={{ padding: "10px", color: "var(--primary)", background: "var(--primary-light)", borderRadius: "10px", fontSize: "14px" }}><i className="fas fa-file-pdf"></i></a>
                                   <button 
                                     onClick={async () => {
                                        if(window.confirm(`Send selection email to ${s.name}?`)) {
                                            setLoading(true);
                                            const resp = await fetch(`${API_BASE_URL}/api/admin/send-selection-email`, {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                                                body: JSON.stringify({ studentId: s._id, email: s.email, name: s.name })
                                            });
                                            const res = await resp.json();
                                            if(res.success) notify('success', res.message);
                                            else notify('error', res.message);
                                            setLoading(false);
                                        }
                                     }}
                                     title="Send Selection Mail"
                                     style={{ padding: "10px", border: "none", background: "#ecfdf5", color: "#10b981", borderRadius: "10px", cursor: "pointer", fontSize: "14px" }}
                                   ><i className="fas fa-paper-plane"></i></button>
                                   <button 
                                     onClick={async () => {
                                        if(window.confirm(`Send rejection email to ${s.name}?`)) {
                                            setLoading(true);
                                            const resp = await fetch(`${API_BASE_URL}/api/admin/send-rejection-email`, {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                                                body: JSON.stringify({ studentId: s._id, email: s.email, name: s.name })
                                            });
                                            const res = await resp.json();
                                            if(res.success) notify('success', res.message);
                                            else notify('error', res.message);
                                            setLoading(false);
                                        }
                                     }}
                                     title="Send Rejection Mail"
                                     style={{ padding: "10px", border: "none", background: "#fef2f2", color: "#ef4444", borderRadius: "10px", cursor: "pointer", fontSize: "14px" }}
                                   ><i className="fas fa-envelope-open-text"></i></button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
                </div>
             </div>
           )}

           {/* JOBS MODULE */}
           {activeTab === 'jobs' && (
              <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                  <div className="admin-card">
                     <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "25px" }}>{editingJobId ? "Update Performance Role" : "Architect New Opportunity"}</h3>
                     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Job Designation</label>
                          <input type="text" placeholder="e.g. Laser Systems Engineer" className="input-lite" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Status</label>
                          <select className="input-lite" value={jobForm.status} onChange={e => setJobForm({...jobForm, status: e.target.value})}>
                            <option value="Published">External (Live)</option>
                            <option value="Draft">Internal (Hidden)</option>
                            <option value="Closed">Archived</option>
                          </select>
                        </div>
                        <div>
                           <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Exp Requirements (Min - Max Yrs)</label>
                           <div style={{ display: "flex", gap: "10px" }}>
                              <input type="number" placeholder="Min" className="input-lite" value={jobForm.minExperience} onChange={e => setJobForm({...jobForm, minExperience: e.target.value})} />
                              <input type="number" placeholder="Max" className="input-lite" value={jobForm.maxExperience} onChange={e => setJobForm({...jobForm, maxExperience: e.target.value})} />
                           </div>
                        </div>
                        <div style={{ gridColumn: "span 2" }}>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Prime Responsibilities</label>
                          <textarea placeholder="List core duties..." className="input-lite" style={{ height: "80px", resize: "none" }} value={jobForm.responsibilities} onChange={e => setJobForm({...jobForm, responsibilities: e.target.value})} />
                        </div>
                        <div style={{ gridColumn: "span 2" }}>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Skills Required (Comma separated)</label>
                          <input type="text" placeholder="Optics, PLC, Electronics..." className="input-lite" value={jobForm.skills} onChange={e => setJobForm({...jobForm, skills: e.target.value})} />
                        </div>
                        <div style={{ gridColumn: "span 2" }}>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>Abstract / Description</label>
                          <textarea placeholder="Summarize the core requirements..." className="input-lite" style={{ height: "100px", resize: "none" }} value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} />
                        </div>
                        <div>
                           <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#444", marginBottom: "10px" }}>JD Document (PDF)</label>
                           <input type="file" onChange={e => setJdFile(e.target.files[0])} style={{ width: "100%", padding: "12px", border: "1.5px dashed #ccc", borderRadius: "12px", fontSize: "13px" }} />
                        </div>
                     </div>
                     <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
                        <button 
                           onClick={async () => {
                              setLoading(true);
                              const fd = new FormData();
                              fd.append("title", jobForm.title);
                              fd.append("description", jobForm.description);
                              fd.append("responsibilities", jobForm.responsibilities);
                              fd.append("skills", jobForm.skills);
                              fd.append("minExperience", jobForm.minExperience);
                              fd.append("maxExperience", jobForm.maxExperience);
                              fd.append("status", jobForm.status);
                              if(jdFile) fd.append("jdFile", jdFile);

                              const url = editingJobId ? `${API_BASE_URL}/api/admin/jobs/${editingJobId}` : `${API_BASE_URL}/api/admin/jobs`;
                              const method = editingJobId ? 'PUT' : 'POST';

                              const resp = await fetch(url, {
                                 method: method,
                                 headers: { 'x-auth-token': token },
                                 body: fd
                              });
                              if(resp.ok) { 
                                 notify('success', editingJobId ? "Job updated." : "New job published."); 
                                 setJobForm({ title: "", description: "", responsibilities: "", skills: "", minExperience: 0, maxExperience: 0, status: 'Published' }); 
                                 setJdFile(null);
                                 setEditingJobId(null);
                                 fetchData(); 
                              } else {
                                 notify('error', "Failed to sync job.");
                              }
                              setLoading(false);
                           }}
                           className="btn-lite btn-lite-primary"
                        >{loading ? "Syncing..." : (editingJobId ? "Update Performance" : "Launch Position")}</button>
                        {editingJobId && <button onClick={() => { setEditingJobId(null); setJobForm({ title: "", description: "", responsibilities: "", skills: "", minExperience: 0, maxExperience: 0, status: 'Published' }); }} className="btn-lite" style={{ border: "1.5px solid #eee" }}>Cancel</button>}
                     </div>
                  </div>

                  {/* Test Questions Section (Visible when a job is present) */}
                  <div className="admin-card">
                     <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "25px" }}>Test Questionnaire Management</h3>
                     <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                           <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#999", marginBottom: "8px" }}>Select Job</label>
                              <select className="input-lite" value={activeJobId || ""} onChange={e => {
                                 setActiveJobId(e.target.value);
                                 const selectedJob = jobs.find(j => j._id === e.target.value);
                                 if(selectedJob) setJobQuestions(allQuestions.filter(q => q.jobId === selectedJob._id));
                              }}>
                                 <option value="">-- Choose Position --</option>
                                 {jobs.map(j => <option key={j._id} value={j._id}>{j.title}</option>)}
                              </select>
                           </div>
                           {activeJobId && (
                              <>
                              <div style={{ gridColumn: "span 2" }}>
                                 <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#999", marginBottom: "8px" }}>{editingQId ? "Edit Question" : "Add New Question"}</label>
                                 <input type="text" placeholder="Question text..." className="input-lite" value={jobQForm.questionText} onChange={e => setJobQForm({...jobQForm, questionText: e.target.value})} />
                              </div>
                              <div>
                                 <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#999", marginBottom: "8px" }}>Type</label>
                                 <select className="input-lite" value={jobQForm.questionType} onChange={e => setJobQForm({...jobQForm, questionType: e.target.value})}>
                                    <option value="text">Short Answer</option>
                                    <option value="mcq">Multiple Choice</option>
                                    <option value="boolean">True/False</option>
                                 </select>
                              </div>
                              </>
                           )}
                        </div>

                        {activeJobId && jobQForm.questionType === 'mcq' && (
                           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                              {jobQForm.options.map((opt, idx) => (
                                 <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                    <input type="radio" checked={jobQForm.correctAnswer === idx} onChange={() => setJobQForm({...jobQForm, correctAnswer: idx})} />
                                    <input type="text" placeholder={`Option ${idx+1}`} className="input-lite" value={opt} onChange={e => {
                                       const newOpts = [...jobQForm.options];
                                       newOpts[idx] = e.target.value;
                                       setJobQForm({...jobQForm, options: newOpts});
                                    }} />
                                 </div>
                              ))}
                           </div>
                        )}

                        {activeJobId && (
                           <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                              <button onClick={async () => {
                                 const url = editingQId ? `${API_BASE_URL}/api/admin/questions/${editingQId}` : `${API_BASE_URL}/api/admin/jobs/${activeJobId}/questions`;
                                 const method = editingQId ? 'PUT' : 'POST';
                                 const resp = await fetch(url, {
                                    method: method,
                                    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                                    body: JSON.stringify(jobQForm)
                                 });
                                 if(resp.ok) {
                                    notify('success', editingQId ? "Question updated." : "Question added.");
                                    setJobQForm({ questionText: "", questionType: "text", options: ["", "", "", ""], correctAnswer: 0, isMandatory: true });
                                    setEditingQId(null);
                                    fetchData();
                                 }
                              }} className="btn-lite btn-lite-primary">{editingQId ? "Update Question" : "Save Question"}</button>
                              {editingQId && <button onClick={() => { setEditingQId(null); setJobQForm({ questionText: "", questionType: "text", options: ["", "", "", ""], correctAnswer: 0, isMandatory: true }); }} className="btn-lite">Cancel</button>}
                           </div>
                        )}

                        {activeJobId && (
                           <div style={{ marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
                              <h4 style={{ fontSize: "14px", fontWeight: 800, marginBottom: "15px" }}>Active Questions ({allQuestions.filter(q => q.jobId === activeJobId).length})</h4>
                              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                 {allQuestions.filter(q => q.jobId === activeJobId).map(q => (
                                    <div key={q._id} style={{ padding: "12px 20px", background: "#f9f9f9", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                       <div style={{ fontSize: "14px", fontWeight: 600 }}>{q.questionText} <span style={{ fontSize: "10px", color: "#999", background: "#eee", padding: "2px 6px", borderRadius: "4px", marginLeft: "10px" }}>{q.questionType.toUpperCase()}</span></div>
                                       <div style={{ display: "flex", gap: "10px" }}>
                                          <button onClick={() => { setEditingQId(q._id); setJobQForm(q); }} style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontWeight: 700 }}>Edit</button>
                                          <button onClick={async () => {
                                             if(window.confirm("Delete this question?")) {
                                                await fetch(`${API_BASE_URL}/api/admin/questions/${q._id}`, { method: 'DELETE', headers: { 'x-auth-token': token } });
                                                fetchData();
                                             }
                                          }} style={{ background: "none", border: "none", color: "#e03131", cursor: "pointer", fontWeight: 700 }}>Delete</button>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "20px 0 0" }}>Existing Performance Roles</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "25px" }}>
                     {jobs.map(j => (
                       <div key={j._id} className="admin-card" style={{ borderLeft: `5px solid ${j.status === 'Published' ? '#10b981' : '#f59e0b'}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                             <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>{j.title}</h4>
                             <span style={{ fontSize: "10px", padding: "4px 10px", borderRadius: "100px", background: "#f8f9fa", fontWeight: 800, color: j.status === 'Published' ? "#10b981" : "#f59e0b" }}>{j.status.toUpperCase()}</span>
                          </div>
                          <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.5", marginBottom: "20px", height: "40px", overflow: "hidden" }}>{j.description}</p>
                          <div style={{ display: "flex", gap: "10px" }}>
                             <button onClick={() => { setEditingJobId(j._id); setJobForm(j); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ flex: 1, padding: "10px", borderRadius: "10px", background: "var(--primary-light)", color: "var(--primary)", border: "none", fontSize: "12px", fontWeight: 800, cursor: "pointer" }}>Edit Role</button>
                             <button onClick={() => deleteJob(j._id)} style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#fff5f5", color: "#e03131", border: "none" }}><i className="fas fa-trash-alt"></i></button>
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

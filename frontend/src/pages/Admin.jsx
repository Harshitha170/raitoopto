import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const [isHovered, setIsHovered] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { i18n } = useTranslation();

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
    } catch (err) {
      setError("Data fetch failed. Backend may be offline.");
    }
    setLoading(false);
  };

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
      setError(`CRITICAL: Server unreachable.`);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setToken(null);
    setSidebarOpen(false);
  };

  const handleGalleryUpload = async () => {
    if (!galleryFile) {
      setError("Please select a file to upload.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", galleryFile);
      fd.append("caption", galleryForm.caption);
      fd.append("category", galleryForm.category || "Workspace");

      const resp = await fetch(`${API_BASE_URL}/api/admin/gallery/upload`, {
        method: "POST",
        headers: { "x-auth-token": token },
        body: fd
      });
      if (resp.ok) {
        setSuccess("Media uploaded!");
        setGalleryForm({ caption: "", category: "Workspace" });
        setGalleryFile(null);
        fetchData();
      }
    } catch (err) { setError("Upload failed."); }
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
      if (resp.ok) { fetchData(); setNewCatName(""); }
    } catch (err) { setError("Failed to add category."); }
  };

  const handleDeleteCategory = async (catName) => {
    if (!window.confirm(`Delete category?`)) return;
    await fetch(`${API_BASE_URL}/api/admin/categories/${encodeURIComponent(catName)}`, { method: "DELETE", headers: { "x-auth-token": token } });
    fetchData();
  };

  const delGallery = async (id) => {
    if (!window.confirm("Delete media?")) return;
    await fetch(`${API_BASE_URL}/api/admin/gallery/${id}`, { method: "DELETE", headers: { "x-auth-token": token } });
    fetchData();
  };

  const deleteJob = async (id) => {
      if (!window.confirm("Delete role?")) return;
      await fetch(`${API_BASE_URL}/api/admin/jobs/${id}`, { method: "DELETE", headers: { "x-auth-token": token } });
      fetchData();
  };

  if (!isLoggedIn) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff", fontFamily: "'Inter', sans-serif" }}>
          <div style={{ width: "100%", maxWidth: "380px", background: "#fff", padding: "40px", borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0" }}>
               <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <div style={{ margin: "0 auto 15px", width: "40px", height: "40px" }}><svg viewBox="0 0 24 24" fill="#00684a"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg></div>
                  <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#111" }}>Admin Console</h1>
               </div>
               <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <input type="text" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} placeholder="Username" style={{ padding: "12px", borderRadius: "6px" }} required />
                  <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="Password" style={{ padding: "12px", borderRadius: "6px" }} required />
                  {error && <div style={{ color: "#e00", fontSize: "12px", textAlign: "center" }}>{error}</div>}
                  <button type="submit" disabled={loading} style={{ padding: "14px", border: "none", borderRadius: "8px", background: "#000", color: "#fff", fontWeight: 700, cursor: "pointer", marginTop: "10px", transition: "0.3s" }}>{loading ? "Authenticating..." : "SIGN IN"}</button>
               </form>
          </div>
        </div>
      );
  }

  return (
    <div className="admin-portal" style={{ minHeight: "100vh", background: "#ffffff", display: "flex", flexDirection: "column", color: "#111", fontFamily: "'Inter', sans-serif" }}>
      
      {/* NAVBAR */}
      <nav style={{ background: "#000", height: "56px", position: "sticky", top: 0, zIndex: 3000, color: "#fff", display: "flex", alignItems: "center", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" }}><i className="fas fa-bars"></i></button>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "22px" }}><svg viewBox="0 0 24 24" fill="#00ed64"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg></div>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px" }}>RAITOOPTO <span style={{ opacity: 0.6 }}>| ADMIN</span></div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
             <button onClick={() => fetchData()} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}><i className="fas fa-sync"></i></button>
             <button onClick={handleLogout} style={{ border: "1px solid #444", background: "none", color: "#fff", padding: "6px 15px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>LOGOUT</button>
          </div>
      </nav>

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 1999 }}></div>}
      
      {/* MONGODB STYLE SIDEBAR */}
      <aside 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "fixed", top: "56px", left: 0, width: isHovered || sidebarOpen ? "240px" : "70px", height: "calc(100vh - 56px)",
            background: "#fff", color: "#333", zIndex: 2000, transition: "0.2s cubic-bezier(0.2, 0, 0, 1)",
            boxShadow: isHovered || sidebarOpen ? "4px 0 20px rgba(0,0,0,0.08)" : "none", 
            display: "flex", flexDirection: "column", borderRight: "1px solid #e1e4e8", overflowX: "hidden"
          }}>
          
          <div style={{ padding: "20px 0", flex: 1, display: "flex", flexDirection: "column" }}>
             {/* ORGANIZATION HEADER - ONLY VISIBLE ON HOVER */}
             <div style={{ padding: "0 24px 15px", marginBottom: "15px", borderBottom: "1px solid #f0f0f0", opacity: isHovered || sidebarOpen ? 1 : 0, transition: "opacity 0.2s" }}>
                <div style={{ fontSize: "10px", color: "#888", textTransform: "uppercase", fontWeight: 700, whiteSpace: "nowrap" }}>Organization</div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#111", marginTop: "4px", whiteSpace: "nowrap" }}>Raitoopto Admin</div>
             </div>

             <nav style={{ flex: 1, padding: "0 12px" }}>
                {[
                  { id: 'dashboard', icon: 'fas fa-th-large', label: 'Console Home' },
                  { id: 'gallery', icon: 'fas fa-images', label: 'Media Gallery' },
                  { id: 'students', icon: 'fas fa-users', label: 'Candidate List' },
                  { id: 'ats', icon: 'fas fa-robot', label: 'ATS Intelligence' },
                  { id: 'jobs', icon: 'fas fa-briefcase', label: 'Open Opportunities' }
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); if(window.innerWidth < 1024) setSidebarOpen(false); }} 
                    style={{ 
                      width: "100%", padding: "12px 14px", border: "none", 
                      background: activeTab === item.id ? "#f0f2f5" : "none", 
                      color: activeTab === item.id ? "#00684a" : "#445566", 
                      borderRadius: "6px", textAlign: "left", display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", 
                      fontSize: "13px", fontWeight: "600", marginBottom: "4px",
                      transition: "0.2s",
                      borderLeft: activeTab === item.id ? "4px solid #00ed64" : "4px solid transparent"
                    }}
                  >
                    <i className={item.icon} style={{ width: "20px", fontSize: "16px", flexShrink: 0, textAlign: "center" }}></i> 
                    <span style={{ opacity: isHovered || sidebarOpen ? 1 : 0, transition: "opacity 0.2s", whiteSpace: "nowrap" }}>{item.label}</span>
                  </button>
                ))}
             </nav>

             {/* BOTTOM SETTINGS ICON */}
             <div style={{ padding: "15px 14px", borderTop: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "16px" }}>
                 <i className="fas fa-cog" style={{ width: "20px", fontSize: "16px", color: "#888", textAlign: "center" }}></i>
                 <span style={{ fontSize: "13px", fontWeight: "600", color: "#666", opacity: isHovered || sidebarOpen ? 1 : 0, transition: "opacity 0.2s" }}>Settings</span>
             </div>
          </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "40px 30px", marginLeft: isHovered || sidebarOpen ? "240px" : "70px", transition: "0.2s cubic-bezier(0.2, 0, 0, 1)" }}>
          <header style={{ marginBottom: "25px", borderBottom: "1px solid #e1e4e8", paddingBottom: "15px" }}>
             <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700 }}>{activeTab.toUpperCase()}</h1>
          </header>

          {activeTab === 'dashboard' && (
             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e1e4e8" }}>
                   <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", fontWeight: 700 }}>Total Candidates</div>
                   <div style={{ fontSize: "28px", fontWeight: 700, marginTop: "8px" }}>{students.length}</div>
                </div>
                <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e1e4e8" }}>
                   <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", fontWeight: 700 }}>Jobs Posted</div>
                   <div style={{ fontSize: "28px", fontWeight: 700, marginTop: "8px" }}>{jobs.length}</div>
                </div>
             </div>
          )}

          {activeTab === 'gallery' && (
             <div className="admin-card" style={{ background: "#fff", padding: "30px", borderRadius: "12px", border: "1px solid #e1e4e8" }}>
                <h3 style={{ marginBottom: "20px" }}>Gallery Management</h3>
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                   <input type="file" onChange={e => setGalleryFile(e.target.files[0])} />
                   <button onClick={handleGalleryUpload} style={{ background: "#00684a", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer" }}>Upload</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
                   {gallery.map(g => (
                      <div key={g._id} style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #eee" }}>
                         <img src={getFullUrl(g.imageUrl)} style={{ width: "100%", height: "150px", objectFit: "cover" }} alt="" />
                         <div style={{ padding: "10px", display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "12px" }}>{g.caption}</span>
                            <button onClick={() => delGallery(g._id)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}><i className="fas fa-trash"></i></button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {activeTab === 'students' && (
             <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e1e4e8", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                   <thead style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
                      <tr>
                         <th style={{ padding: "15px", textAlign: "left" }}>Name</th>
                         <th style={{ padding: "15px", textAlign: "left" }}>Role</th>
                         <th style={{ padding: "15px", textAlign: "center" }}>ATS Score</th>
                         <th style={{ padding: "15px", textAlign: "center" }}>Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {students.map(s => (
                         <tr key={s._id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                            <td style={{ padding: "15px" }}>{s.name}</td>
                            <td style={{ padding: "15px" }}>{s.appliedRole}</td>
                            <td style={{ padding: "15px", textAlign: "center" }}>{s.atsScore}%</td>
                            <td style={{ padding: "15px", textAlign: "center" }}>
                               <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                  <a href={getFullUrl(s.resumeUrl)} target="_blank" rel="noreferrer" style={{ color: "#444" }}><i className="fas fa-file-download"></i></a>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          )}

          {activeTab === 'ats' && (
             <div style={{ background: "#fff", padding: "30px", borderRadius: "12px", border: "1px solid #e1e4e8" }}>
                <h3 style={{ marginBottom: "20px" }}>ATS Ranking</h3>
                {students.sort((a,b) => b.atsScore - a.atsScore).map((s, i) => (
                   <div key={s._id} style={{ padding: "16px", background: "#ffffff", border: "1px solid #f0f0f0", marginBottom: "12px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                      <span>{i+1}. {s.name}</span>
                      <span style={{ fontWeight: 700 }}>{s.atsScore}% Match</span>
                   </div>
                ))}
             </div>
          )}

          {activeTab === 'jobs' && (
             <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ background: "#fff", padding: "30px", borderRadius: "12px", border: "1px solid #e1e4e8" }}>
                   <h3>Post Jobs</h3>
                   <input type="text" placeholder="Job Title" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} style={{ width: "100%", padding: "10px", margin: "10px 0" }} />
                   <textarea placeholder="Description" value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} style={{ width: "100%", height: "80px" }} />
                   <button onClick={async () => {
                      const fd = new FormData(); fd.append("title", jobForm.title); fd.append("description", jobForm.description);
                      const resp = await fetch(`${API_BASE_URL}/api/admin/jobs`, { method: "POST", headers: { "x-auth-token": token }, body: fd });
                      if(resp.ok) fetchData();
                   }} style={{ background: "#00684a", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", marginTop: "10px", cursor: "pointer" }}>Publish</button>
                </div>
                {jobs.map(j => (
                   <div key={j._id} style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e1e4e8", display: "flex", justifyContent: "space-between" }}>
                      <div>{j.title}</div>
                      <button onClick={() => deleteJob(j._id)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}><i className="fas fa-trash"></i></button>
                   </div>
                ))}
             </div>
          )}
      </main>

      <footer style={{ background: "#fff", padding: "30px 0", borderTop: "1px solid #eee", marginTop: "auto" }}>
         <div style={{ textAlign: "center", fontSize: "12px", color: "#888" }}>© 2026 Admin Portal</div>
      </footer>
    </div>
  );
}

export default Admin;

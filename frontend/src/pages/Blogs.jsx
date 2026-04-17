import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const getFullUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') && !url.includes('localhost:5000')) return url;
  const cleanPath = url.replace(/^https?:\/\/[^\/]+\//, '').replace(/^\//, '');
  return `${API_BASE_URL}/${cleanPath}`;
};

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/blogs`);
      const data = await resp.json();
      if (Array.isArray(data)) setBlogs(data);
    } catch (err) {
      console.error("Fetch blogs error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="blogs-page" style={{ minHeight: "100vh", background: "#0c0c0e", color: "#fff" }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ padding: "120px 0 80px", background: "linear-gradient(180deg, rgba(255,239,0,0.05) 0%, rgba(12,12,14,0) 100%)", textAlign: "center" }}>
        <div className="wrap">
           <div style={{ fontSize: "14px", fontWeight: 900, color: "var(--Y)", textTransform: "uppercase", letterSpacing: "4px", marginBottom: "15px" }}>Corporate Intelligence</div>
           <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontFamily: "Orbitron", fontWeight: 900, marginBottom: "20px" }}>Company <span className="yl">News & Updates</span></h1>
           <p style={{ maxWidth: "600px", margin: "0 auto", color: "rgba(255,255,255,0.6)", fontSize: "16px", lineHeight: "1.8" }}>Stay informed with the latest breakthroughs in laser technology, company milestones, and industrial automation trends from Raitoopto.</p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "40px 0 100px" }}>
        <div className="wrap">
           {loading ? (
             <div style={{ textAlign: "center", padding: "100px 0" }}>
                <div className="loader"></div>
                <p style={{ marginTop: "20px", color: "rgba(255,255,255,0.4)" }}>Fetching latest updates...</p>
             </div>
           ) : blogs.length > 0 ? (
             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "30px" }}>
                {blogs.map((blog) => (
                  <article key={blog._id} className="news-card" style={{ background: "#151518", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", transition: "0.4s", display: "flex", flexDirection: "column" }}>
                     {blog.imageUrl && (
                       <div style={{ height: "240px", overflow: "hidden", position: "relative" }}>
                          <img src={getFullUrl(blog.imageUrl)} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.6s" }} alt={blog.title} />
                          <div style={{ position: "absolute", top: "20px", left: "20px", background: "var(--Y)", color: "#000", padding: "6px 15px", borderRadius: "100px", fontSize: "12px", fontWeight: 900, textTransform: "uppercase" }}>Industry News</div>
                       </div>
                     )}
                     <div style={{ padding: "30px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.4)", fontSize: "12px", marginBottom: "15px", fontWeight: 700 }}>
                           <i className="far fa-calendar-alt" style={{ color: "var(--Y)" }}></i>
                           {new Date(blog.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                           <span style={{ opacity: 0.2 }}>|</span>
                           <span>By {blog.author}</span>
                        </div>
                        <h2 style={{ fontSize: "22px", fontFamily: "Orbitron", margin: "0 0 15px", lineHeight: "1.4" }}>{blog.title}</h2>
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: "1.8", marginBottom: "25px", flex: 1 }}>
                           {blog.content.length > 180 ? blog.content.substring(0, 180) + "..." : blog.content}
                        </p>
                        <Link to={`/blogs/${blog._id}`} style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--Y)", textDecoration: "none", fontSize: "13px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px" }}>
                           Read Full Story <i className="fas fa-arrow-right"></i>
                        </Link>
                     </div>
                  </article>
                ))}
             </div>
           ) : (
             <div style={{ textAlign: "center", padding: "100px 0", background: "rgba(255,255,255,0.02)", borderRadius: "30px", border: "1.5px dashed rgba(255,255,255,0.1)" }}>
                <i className="fas fa-newspaper" style={{ fontSize: "48px", color: "rgba(255,255,255,0.1)", marginBottom: "20px" }}></i>
                <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>No News Yet</h3>
                <p style={{ color: "rgba(255,255,255,0.4)" }}>Check back soon for exciting updates from Raitoopto.</p>
             </div>
           )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

export default Blogs;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const getFullUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') && !url.includes('localhost:5000')) return url;
  const cleanPath = url.replace(/^https?:\/\/[^\/]+\//, '').replace(/^\//, '');
  return `${API_BASE_URL}/${cleanPath}`;
};

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const resp = await fetch(`${API_BASE_URL}/api/blogs/${id}`);
        const data = await resp.json();
        setBlog(data);
      } catch (err) {
        console.error("Fetch blog detail error:", err);
      }
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div style={{ minHeight: "100vh", background: "#0c0c0e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="loader"></div></div>;

  if (!blog) return (
    <div style={{ minHeight: "100vh", background: "#0c0c0e", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Navbar />
      <h2 style={{ fontFamily: "Orbitron" }}>Post Not Found</h2>
      <Link to="/blogs" style={{ color: "var(--Y)", marginTop: "20px" }}>Back to News</Link>
      <FooterSection />
    </div>
  );

  return (
    <div className="blog-detail-page" style={{ minHeight: "100vh", background: "#0c0c0e", color: "#fff" }}>
      <Navbar />
      <section style={{ padding: "120px 0 80px" }}>
        <div className="wrap" style={{ maxWidth: "900px" }}>
           <Link to="/blogs" style={{ color: "var(--Y)", textDecoration: "none", fontSize: "14px", fontWeight: 700, display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
              <i className="fas fa-arrow-left"></i> BACK TO NEWS
           </Link>
           
           <div style={{ marginBottom: "40px" }}>
              <div style={{ fontSize: "12px", fontWeight: 900, color: "var(--Y)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "15px" }}>Corporate Intelligence</div>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontFamily: "Orbitron", fontWeight: 900, marginBottom: "20px", lineHeight: "1.2" }}>{blog.title}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", color: "rgba(255,255,255,0.4)", fontSize: "14px", fontWeight: 600 }}>
                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><i className="far fa-calendar-alt" style={{ color: "var(--Y)" }}></i> {new Date(blog.date).toLocaleDateString()}</div>
                 <div style={{ width: "4px", height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "50%" }}></div>
                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><i className="far fa-user" style={{ color: "var(--Y)" }}></i> By {blog.author}</div>
              </div>
           </div>

           {blog.imageUrl && (
             <div style={{ width: "100%", borderRadius: "30px", overflow: "hidden", marginBottom: "50px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <img src={getFullUrl(blog.imageUrl)} style={{ width: "100%", height: "auto", display: "block" }} alt={blog.title} />
             </div>
           )}

           <div className="blog-content" style={{ fontSize: "18px", lineHeight: "1.8", color: "rgba(255,255,255,0.8)", whiteSpace: "pre-wrap" }}>
              {blog.content}
           </div>

           <div style={{ marginTop: "80px", padding: "40px", background: "rgba(255,255,255,0.02)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
              <h3 style={{ fontSize: "20px", marginBottom: "15px", fontFamily: "Orbitron" }}>Interested in Industrial Automation?</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "30px" }}>Connect with our experts today to discuss your project requirements.</p>
              <Link to="/contact" className="btn-y" style={{ borderRadius: "100px", padding: "15px 40px" }}>GET A CONSULTATION</Link>
           </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
}

export default BlogDetail;

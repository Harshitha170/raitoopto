
$path = "c:\Users\jhars\OneDrive\Desktop\Raittoopto\frontend\src\pages\Admin.jsx"
$content = Get-Content $path -Raw

$oldTop = '         <div style={{ padding: "40px 30px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>'
$oldEnd = '         </div>'

# This is risky but I need to bypass the bridge's matching logic
$newContent = $content -replace '(?s)         <div style={{ padding: "40px 30px".*?         </div>', '          {/* MINI ICON STRIP */}
          <div style={{ width: "66px", background: "#f8f9fb", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0", gap: "28px" }}>
             <div style={{ color: "#00ed64", fontSize: "20px" }} title="Project Leaf"><i className="fas fa-leaf"></i></div>
             <div style={{ color: "#888", fontSize: "18px", opacity: 0.5 }}><i className="fas fa-database"></i></div>
             <div style={{ color: "#888", fontSize: "18px", opacity: 0.5 }}><i className="fas fa-stream"></i></div>
             <div style={{ color: "#888", fontSize: "18px", opacity: 0.5 }}><i className="fas fa-shield-alt"></i></div>
             <div style={{ marginTop: "auto", color: "#888", fontSize: "18px" }}><i className="fas fa-cog"></i></div>
          </div>

          {/* MAIN LABELS AREA */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 0" }}>
             <div style={{ padding: "0 15px 15px", marginBottom: "10px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ fontSize: "10px", color: "#888", textTransform: "uppercase", fontWeight: 700, letterSpacing: "1px" }}>Organization</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#111", marginTop: "4px" }}>Raittoopto Core</div>
             </div>'

Set-Content $path $newContent

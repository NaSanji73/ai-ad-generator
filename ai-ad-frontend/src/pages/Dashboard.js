import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

function Dashboard() {

  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [ad, setAd] = useState(null);
  const [image, setImage] = useState(null);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateAd = async () => {
    if (loading) return;
    if (!prompt) return;
  
    try {
      setLoading(true);
  
      const response = await fetch(`${API_BASE}/generate-ad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });
  
      if (!response.ok) {
        throw new Error("API failed");
      }
  
      const data = await response.json();
  
      console.log("FULL API RESPONSE:", data);
  
      setAd(data.ad);
      setImage(data.image);
  
    } catch {
      alert("Error generating ad");
    } finally {
      setLoading(false);
    }
  };

  const saveAd = async () => {
    if (!ad) return;
  
    try {
      const response = await fetch(`${API_BASE}/save-ad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ad)
      });
  
      if (!response.ok) {
        throw new Error("Save failed");
      }
  
      loadAds();
  
    } catch {
      alert("Error saving ad");
    }
  };

  const downloadImage = () => {
    if (!image) return;
  
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${image}`;
    link.download = "ai-ad.png";
    link.click();
  };

  const loadAds = async () => {
    try {
      const response = await fetch(`${API_BASE}/ads`);
  
      if (!response.ok) {
        throw new Error("Failed to load ads");
      }
  
      const data = await response.json();
      setAds(data);
  
    } catch {
      alert("Error loading ads");
    }
  };

  const logout = () => {
    navigate("/");
  };

  return (

    <div style={styles.page}>

      {/* NAVBAR */}

      <div style={styles.navbar}>

        <div style={styles.logo}>
          🚀 AI Ads
        </div>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>

      </div>

      {/* MAIN CONTAINER */}

      <div style={styles.container}>

        <h1 style={styles.title}>AI Marketing Studio</h1>

        <p style={styles.subtitle}>
          Generate creative marketing ads instantly using AI
        </p>

        {/* PROMPT INPUT */}

        <div style={styles.inputSection}>

          <input
            style={styles.input}
            placeholder="Example: Create an Instagram ad for a preimum skincare brand targeting women aged 20-30."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            style={styles.generateBtn}
            onClick={generateAd}
            disabled={loading}   
          >
            {loading ? "Generating..." : "Generate"}
          </button>

        </div>

        {/* BEFORE AD GENERATION */}

        {!ad && (
          <div style={styles.emptyState}>
            ✨ Generate your first AI-powered ad
          </div>
        )}

        {/* GENERATED AD */}

        {ad && (

        <div style={styles.resultCard}>

          <div style={styles.cardHeader}></div>

          <h2 style={styles.headline}>
            {ad.headline || "No headline"}
          </h2>

          <p style={styles.label}>Ad Copy</p>
          <p style={styles.adCopy}>
            {ad.ad_copy || ""}
          </p>

          <div style={styles.divider}></div>

          <p style={styles.label}>Caption</p>
          <p style={styles.caption}>
            {ad.caption || ""}
          </p>

          <p style={styles.label}>Call To Action</p>
          <div style={styles.ctaBox}>
            {ad.cta || ""}
          </div>

          <div style={styles.hashtagContainer}>
            {(ad.hashtags || "").split(" ").map((tag, index) => (
              <span key={index} style={styles.tag}>
                {tag}
              </span>    
            ))}
          </div>

        {/* IMAGE GENERATION */}

        <div style={styles.imageSection}>
  
          {image && (
            <img
              src={`data:image/png;base64,${image}`}
              style={styles.generatedImage}
              alt="Generated Ad"
            />
          )}

          {/* BUTTONS UNDER IMAGE */}
          <div style={styles.buttonRow}>
            
          <button
            style={{ ...styles.commonBtn, ...styles.downloadBtn }}
            onClick={downloadImage}
          >
            ⬇ Download
          </button>

          <button
            style={{ ...styles.commonBtn, ...styles.saveBtn }}
            onClick={saveAd}
          >
            💾 Save
          </button>

          </div>

        </div>

      </div>
  )}

        {/* LOAD ADS */}

        <button
          style={styles.loadBtn}
          onClick={loadAds}
        >
          Load Saved Ads
        </button>

        {/* SAVED ADS */}

        {ads.length > 0 && (

          <div style={styles.savedSection}>

            <h2>Saved Ads</h2>

            {ads.map((item, index) => (

              <div key={index} style={styles.savedCard}>

                <h3>{item.headline}</h3>

                <p>{item.caption}</p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

const styles = {

  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },

  logo: {
    fontSize: 20
  },

  logoutBtn: {
    padding: "8px 16px",
    borderRadius: 6,
    border: "none",
    background: "white",
    cursor: "pointer"
  },

  container: {
    background: "white",
    padding: 45,
    borderRadius: 15,
    width: "100%",
    maxWidth: 750,
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
  },

  title: {
    marginBottom: 5
  },

  subtitle: {
    color: "#666",
    marginBottom: 30
  },

  inputSection: {
    display: "flex",
    gap: 10,
    marginBottom: 30
  },

  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none"
  },

  generateBtn: {
    padding: "14px 24px",
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s"
  },

  resultCard: {
    marginTop: 25,
    padding: 35,
    borderRadius: 16,
    background: "white",
    border: "1px solid #eee",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "0.3s"
  },

  caption: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 1.6,
    marginBottom: 15
  },

  hashtags: {
    color: "#667eea",
    fontWeight: "bold"
  },

  script: {
    marginTop: 10,
    lineHeight: 1.6
  },

  loadBtn: {
    marginTop: 25,
    padding: "12px 20px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  },

  savedSection: {
    marginTop: 30
  },

  savedCard: {
    border: "1px solid #eee",
    padding: 15,
    marginTop: 10,
    borderRadius: 8
  },

  headline: {
  fontSize: 26,
  fontWeight: "bold",
  marginBottom: 15
},

adCopy: {
  fontSize: 16,
  lineHeight: 1.7,
  color: "#444",
  marginBottom: 15
},

divider: {
  height: 1,
  background: "#eee",
  margin: "15px 0"
},

ctaBox: {
  marginTop: 12,
  marginBottom: 15, 
  padding: "10px 14px",
  background: "#f0fdf4",
  color: "#16a34a",
  borderRadius: 8,
  fontWeight: "bold",
  display: "inline-block"
},

hashtagContainer: {
  marginTop: 15,
  display: "flex",
  flexWrap: "wrap",
  gap: 8
},

tag: {
  background: "#eef2ff",
  color: "#4f46e5",
  padding: "6px 10px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: "bold"
},

cardHeader: {
  height: 6,
  borderRadius: "16px 16px 0 0",
  background: "linear-gradient(90deg,#6366f1,#8b5cf6)"
},

label: {
  fontSize: 12,
  color: "#888",
  marginTop: 10,
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: 1
},

emptyState: {
  marginTop: 20,
  textAlign: "center",
  color: "#777",
  fontStyle: "italic"
},

imageSection: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",   // ✅ centers image
  marginTop: 20
},

generatedImage: {
  width: "100%",
  maxWidth: "480px",      // ✅ moderate size (IMPORTANT)
  height: "auto",
  borderRadius: 14,
  objectFit: "cover",
  boxShadow: "0 8px 20px rgba(0,0,0,0.18)"
},

buttonRow: {
  display: "flex",
  gap: 12,
  marginTop: 14,
  justifyContent: "center"
},

commonBtn: {
  minWidth: "140px",   // 🔥 same width
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px"
},

downloadBtn: {
  background: "#3b82f6",
  color: "white"
},

saveBtn: {
  background: "#16a34a",
  color: "white"
}

};

export default Dashboard;
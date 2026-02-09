import React, { useState } from "react";

export default function UIShowcase() {
  const [activeTab, setActiveTab] = useState("buttons");

  return (
    <div className="ui-showcase" style={{ padding: "40px 0" }}>
      <div className="page-header">
        <h1>UI Components Showcase</h1>
        <p>Advanced styling and interactive components</p>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "32px",
          borderBottom: "2px solid #e6e6ef",
          paddingBottom: "16px",
        }}
      >
        {["buttons", "cards", "badges", "effects"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-capitalize`}
            style={{
              padding: "8px 16px",
              background: activeTab === tab ? "#0b5fff" : "transparent",
              color: activeTab === tab ? "white" : "#111",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 160ms ease",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Buttons Section */}
      {activeTab === "buttons" && (
        <div className="showcase-section">
          <h2 className="gradient-text" style={{ marginBottom: "24px" }}>
            Button Variants
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "16px",
            }}
          >
            <button
              className="btn gradient"
              style={{ animation: "fadeIn 0.3s ease-out" }}
            >
              Gradient Button
            </button>
            <button
              className="btn outline"
              style={{ animation: "fadeIn 0.3s ease-out 0.05s both" }}
            >
              Outline Button
            </button>
            <button
              className="btn ghost"
              style={{ animation: "fadeIn 0.3s ease-out 0.1s both" }}
            >
              Ghost Button
            </button>
            <button
              className="btn small"
              style={{ animation: "fadeIn 0.3s ease-out 0.15s both" }}
            >
              Small Button
            </button>
            <button
              className="btn large"
              style={{ animation: "fadeIn 0.3s ease-out 0.2s both" }}
            >
              Large Button
            </button>
            <button
              className="btn"
              disabled
              style={{ animation: "fadeIn 0.3s ease-out 0.25s both" }}
            >
              Disabled Button
            </button>
          </div>
        </div>
      )}

      {/* Cards Section */}
      {activeTab === "cards" && (
        <div className="showcase-section">
          <h2 className="gradient-text" style={{ marginBottom: "24px" }}>
            Card Variations
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              className="card elevated"
              style={{ animation: "slideUp 0.4s ease-out" }}
            >
              <h3>Elevated Card</h3>
              <p style={{ color: "#666", margin: "0" }}>
                This card has a subtle shadow and lifts on hover
              </p>
            </div>
            <div
              className="card-hover"
              style={{
                padding: "20px",
                borderRadius: "8px",
                border: "2px solid #e6e6ef",
                animation: "slideUp 0.4s ease-out 0.05s both",
              }}
            >
              <h3>Hover Card</h3>
              <p style={{ color: "#666", margin: "0" }}>
                Smooth hover effect with automatic elevation
              </p>
            </div>
            <div
              className="neumorphic"
              style={{ animation: "slideUp 0.4s ease-out 0.1s both" }}
            >
              <h3>Neumorphic Card</h3>
              <p style={{ color: "#666", margin: "0" }}>
                Soft UI design with depth
              </p>
            </div>
            <div
              className="glass"
              style={{
                padding: "20px",
                animation: "slideUp 0.4s ease-out 0.15s both",
              }}
            >
              <h3>Glass Card</h3>
              <p style={{ color: "#666", margin: "0" }}>
                Glassmorphism effect with blur
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Badges Section */}
      {activeTab === "badges" && (
        <div className="showcase-section">
          <h2 className="gradient-text" style={{ marginBottom: "24px" }}>
            Badge Styles
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <span className="badge">Default</span>
            <span className="badge primary">Primary</span>
            <span className="badge success">Success</span>
            <span className="badge warning">Warning</span>
            <span className="badge danger">Danger</span>
            <span
              className="badge"
              style={{
                background: "linear-gradient(135deg, #0b5fff, #084fb8)",
                color: "white",
              }}
            >
              Gradient
            </span>
            <span
              className="badge"
              style={{
                background: "#f0f4ff",
                color: "#0b5fff",
                fontWeight: "600",
              }}
            >
              Accent
            </span>
            <span
              className="badge"
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                border: "2px solid #0b5fff",
                background: "white",
                color: "#0b5fff",
              }}
            >
              Outline
            </span>
          </div>
        </div>
      )}

      {/* Effects Section */}
      {activeTab === "effects" && (
        <div className="showcase-section">
          <h2 className="gradient-text" style={{ marginBottom: "24px" }}>
            Special Effects
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                padding: "20px",
                background: "white",
                borderRadius: "8px",
                border: "2px solid #e6e6ef",
              }}
            >
              <div
                className="float"
                style={{ fontSize: "32px", marginBottom: "12px" }}
              >
                🎈
              </div>
              <h4>Float Effect</h4>
              <p style={{ color: "#666", fontSize: "13px" }}>
                Smooth floating animation
              </p>
            </div>
            <div
              style={{
                padding: "20px",
                background: "white",
                borderRadius: "8px",
                border: "2px solid #e6e6ef",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>✨</div>
              <h4 className="gradient-text">Gradient Text</h4>
              <p style={{ color: "#666", fontSize: "13px" }}>
                Text with gradient fill
              </p>
            </div>
            <div
              className="glow-blue"
              style={{
                padding: "20px",
                background: "white",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>💡</div>
              <h4>Glow Effect</h4>
              <p style={{ color: "#666", fontSize: "13px" }}>
                Glowing box shadow on hover
              </p>
            </div>
            <div
              className="rotate-hover"
              style={{
                padding: "20px",
                background: "white",
                borderRadius: "8px",
                border: "2px solid #e6e6ef",
                cursor: "pointer",
                transition: "all 200ms ease",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>🎯</div>
              <h4>Rotate & Scale</h4>
              <p style={{ color: "#666", fontSize: "13px" }}>
                Rotation on hover
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Colors and Spacing */}
      <div
        style={{
          marginTop: "60px",
          borderTop: "2px solid #e6e6ef",
          paddingTop: "40px",
        }}
      >
        <h2 className="gradient-text" style={{ marginBottom: "24px" }}>
          Color Palette
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              padding: "20px",
              background: "#0b5fff",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Primary
          </div>
          <div
            style={{
              padding: "20px",
              background: "#084fb8",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Primary Dark
          </div>
          <div
            style={{
              padding: "20px",
              background: "#10b981",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Success
          </div>
          <div
            style={{
              padding: "20px",
              background: "#f59e0b",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Warning
          </div>
          <div
            style={{
              padding: "20px",
              background: "#ef4444",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Danger
          </div>
          <div
            style={{
              padding: "20px",
              background: "#f7f7fb",
              color: "#111",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "600",
              border: "2px solid #e6e6ef",
            }}
          >
            Surface
          </div>
        </div>
      </div>

      {/* Shadows Showcase */}
      <div
        style={{
          marginTop: "60px",
          borderTop: "2px solid #e6e6ef",
          paddingTop: "40px",
        }}
      >
        <h2 className="gradient-text" style={{ marginBottom: "24px" }}>
          Shadow Depths
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          <div
            className="shadow-sm"
            style={{
              padding: "20px",
              background: "white",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: "0", fontWeight: "600" }}>Shadow SM</p>
          </div>
          <div
            className="shadow-md"
            style={{
              padding: "20px",
              background: "white",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: "0", fontWeight: "600" }}>Shadow MD</p>
          </div>
          <div
            className="shadow-lg"
            style={{
              padding: "20px",
              background: "white",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: "0", fontWeight: "600" }}>Shadow LG</p>
          </div>
          <div
            className="shadow-xl"
            style={{
              padding: "20px",
              background: "white",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: "0", fontWeight: "600" }}>Shadow XL</p>
          </div>
          <div
            className="shadow-2xl"
            style={{
              padding: "20px",
              background: "white",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: "0", fontWeight: "600" }}>Shadow 2XL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

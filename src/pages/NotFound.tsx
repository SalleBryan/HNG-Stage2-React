"use client"

import { Link } from "react-router-dom"
import { Home, ArrowLeft, Leaf } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontSize: "120px",
            fontWeight: 700,
            color: "var(--accent-primary)",
            lineHeight: 1,
            marginBottom: "var(--space-lg)",
          }}
        >
          404
        </div>
        <h1 style={{ marginBottom: "var(--space-md)" }}>Page Not Found</h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-xl)",
            fontSize: "var(--font-size-lg)",
          }}
        >
          Oops! The page you're looking for seems to have wandered off like an autumn leaf in the wind.
        </p>

        <div
          className="card"
          style={{
            padding: "var(--space-xl)",
            marginBottom: "var(--space-xl)",
            background: "var(--color-surface)",
          }}
        >
          <p style={{ marginBottom: "var(--space-lg)", color: "var(--color-text-secondary)" }}>
            The page you requested doesn't exist or may have been moved. Here are some helpful links:
          </p>
          <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/" className="btn">
              <Home size={18} style={{ marginRight: "8px" }} />
              Go Home
            </Link>
            <button onClick={() => window.history.back()} className="btn secondary">
              <ArrowLeft size={18} style={{ marginRight: "8px" }} />
              Go Back
            </button>
          </div>
        </div>

        <div style={{ opacity: 0.3, display: "flex", justifyContent: "center" }}>
          <Leaf size={80} color="var(--accent-secondary)" />
        </div>
      </div>
    </div>
  )
}

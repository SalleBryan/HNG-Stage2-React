"use client"

import { Link } from "react-router-dom"
import { Ticket, BarChart3, Palette, Github, Twitter, Mail } from "lucide-react"
import { useAuth } from "../context/AuthProvider"

export default function Home() {
  const { user } = useAuth()

  return (
    <>
      <div className="container" style={{ paddingTop: "var(--space-xl)", paddingBottom: "var(--space-2xl)" }}>
        <div className="hero">
          <div className="hero-content">
            <h1>Manage Tickets with Autumn Elegance</h1>
            <p className="text-pretty">
              A beautiful, intuitive ticket management system designed with warm autumn aesthetics. Track, organize, and
              resolve tickets efficiently while enjoying a delightful user experience.
            </p>
            <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
              {user ? (
                <>
                  <Link to="/dashboard" className="btn">
                    Go to Dashboard
                  </Link>
                  <Link to="/tickets" className="btn secondary">
                    View Tickets
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth/signup" className="btn">
                    Get Started
                  </Link>
                  <Link to="/auth/login" className="btn secondary">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
          <div style={{ flex: "0 0 auto", position: "relative", zIndex: 1 }}>
            <img
              src="/autumn-leaves-ticket-management-illustration.jpg"
              alt="Ticket management illustration"
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-xl)",
              }}
            />
          </div>
        </div>

        <section style={{ marginTop: "var(--space-2xl)" }}>
          <h2 style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>Key Features</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-lg)",
            }}
          >
            <div className="card">
              <div
                style={{
                  marginBottom: "var(--space-md)",
                  color: "var(--accent-primary)",
                }}
              >
                <Ticket size={32} />
              </div>
              <h3>Intuitive Management</h3>
              <p>Create, update, and track tickets with an easy-to-use interface designed for efficiency.</p>
            </div>

            <div className="card">
              <div
                style={{
                  marginBottom: "var(--space-md)",
                  color: "var(--accent-primary)",
                }}
              >
                <BarChart3 size={32} />
              </div>
              <h3>Visual Dashboard</h3>
              <p>Get insights at a glance with beautiful statistics and status tracking.</p>
            </div>

            <div className="card">
              <div
                style={{
                  marginBottom: "var(--space-md)",
                  color: "var(--accent-primary)",
                }}
              >
                <Palette size={32} />
              </div>
              <h3>Autumn Theme</h3>
              <p>Enjoy a warm, cozy design with light and dark modes inspired by autumn colors.</p>
            </div>
          </div>
        </section>
      </div>

      <footer
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          marginTop: "var(--space-2xl)",
          padding: "var(--space-2xl) 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "var(--space-xl)",
              marginBottom: "var(--space-xl)",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-sm)",
                  marginBottom: "var(--space-md)",
                }}
              >
                <div className="logo">🍂</div>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "20px" }}>TicketFlow</span>
              </div>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                A beautiful ticket management system with autumn-inspired design.
              </p>
            </div>

            <div>
              <h4 style={{ marginBottom: "var(--space-md)", fontSize: "var(--font-size-md)" }}>Quick Links</h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-sm)",
                }}
              >
                <li>
                  <Link to="/" style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/login"
                    style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/signup"
                    style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ marginBottom: "var(--space-md)", fontSize: "var(--font-size-md)" }}>Connect</h4>
              <div style={{ display: "flex", gap: "var(--space-md)" }}>
                <a href="#" aria-label="GitHub" style={{ color: "var(--color-text-secondary)" }}>
                  <Github size={20} />
                </a>
                <a href="#" aria-label="Twitter" style={{ color: "var(--color-text-secondary)" }}>
                  <Twitter size={20} />
                </a>
                <a href="#" aria-label="Email" style={{ color: "var(--color-text-secondary)" }}>
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: "var(--space-lg)",
              textAlign: "center",
            }}
          >
            <p style={{ color: "var(--color-muted)", fontSize: "var(--font-size-sm)", margin: 0 }}>
              © {new Date().getFullYear()} TicketFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

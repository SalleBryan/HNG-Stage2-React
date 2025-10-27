"use client"

import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { useToast } from "../context/ToastProvider"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        showToast("Welcome back!", "success")
        navigate("/dashboard")
      } else {
        showToast("Invalid email or password", "error")
      }
    } catch (error) {
      showToast("An error occurred. Please try again.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container" style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <div className="card" style={{ padding: "var(--space-xl)" }}>
          <h1 style={{ textAlign: "center", marginBottom: "var(--space-lg)" }}>Welcome Back</h1>
          <p style={{ textAlign: "center", marginBottom: "var(--space-xl)", color: "var(--color-text-secondary)" }}>
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "var(--space-sm)",
                  fontWeight: 600,
                  fontSize: "var(--font-size-sm)",
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "var(--space-sm)",
                  fontWeight: 600,
                  fontSize: "var(--font-size-sm)",
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn" disabled={isLoading} style={{ width: "100%" }}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "var(--space-lg)", fontSize: "var(--font-size-sm)" }}>
            Don't have an account?{" "}
            <Link to="/auth/signup" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

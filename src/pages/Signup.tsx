"use client"

import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AlertCircle } from "lucide-react"
import { useAuth } from "../context/AuthProvider"
import { useToast } from "../context/ToastProvider"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const { signup } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const validateName = (value: string) => {
    if (!value.trim()) {
      return "Name is required"
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters"
    }
    return ""
  }

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return "Email is required"
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address"
    }
    return ""
  }

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required"
    }
    if (value.length < 6) {
      return "Password must be at least 6 characters"
    }
    return ""
  }

  const validateConfirmPassword = (value: string, passwordValue: string) => {
    if (!value) {
      return "Please confirm your password"
    }
    if (value !== passwordValue) {
      return "Passwords do not match"
    }
    return ""
  }

  const handleNameChange = (value: string) => {
    setName(value)
    setErrors((prev) => ({ ...prev, name: validateName(value) }))
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
      confirmPassword: confirmPassword ? validateConfirmPassword(confirmPassword, value) : "",
    }))
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(value, password) }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const nameError = validateName(name)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password)

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    })

    if (nameError || emailError || passwordError || confirmPasswordError) {
      return
    }

    setIsLoading(true)

    try {
      const success = await signup(name, email, password)
      if (success) {
        showToast("Account created successfully!", "success")
        navigate("/dashboard")
      } else {
        showToast("Email already exists", "error")
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
          <h1 style={{ textAlign: "center", marginBottom: "var(--space-lg)" }}>Create Account</h1>
          <p style={{ textAlign: "center", marginBottom: "var(--space-xl)", color: "var(--color-text-secondary)" }}>
            Join us to start managing your tickets
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  marginBottom: "var(--space-sm)",
                  fontWeight: 600,
                  fontSize: "var(--font-size-sm)",
                }}
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="John Doe"
                required
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <div
                  id="name-error"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-xs)",
                    marginTop: "var(--space-xs)",
                    color: "var(--leaf-rust)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  <AlertCircle size={14} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

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
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <div
                  id="email-error"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-xs)",
                    marginTop: "var(--space-xs)",
                    color: "var(--leaf-rust)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              )}
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
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                minLength={6}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <div
                  id="password-error"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-xs)",
                    marginTop: "var(--space-xs)",
                    color: "var(--leaf-rust)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  <AlertCircle size={14} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                style={{
                  display: "block",
                  marginBottom: "var(--space-sm)",
                  fontWeight: 600,
                  fontSize: "var(--font-size-sm)",
                }}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                minLength={6}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              />
              {errors.confirmPassword && (
                <div
                  id="confirm-password-error"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-xs)",
                    marginTop: "var(--space-xs)",
                    color: "var(--leaf-rust)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  <AlertCircle size={14} />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            <button type="submit" className="btn" disabled={isLoading} style={{ width: "100%" }}>
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "var(--space-lg)", fontSize: "var(--font-size-sm)" }}>
            Already have an account?{" "}
            <Link to="/auth/login" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

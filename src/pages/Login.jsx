import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useToastContext } from "../context/ToastProvider";

export default function Login() {
  const { login } = useAuth();
  const toast = useToastContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/tickets";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email) return "Email is required";
    if (!password) return "Password is required";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    const v = validate();
    if (v) {
      setErr(v);
      return;
    }
    try {
      setLoading(true);
      login({ email, password });
      toast?.push({ type: "success", title: "Signed in", message: `Welcome back!` });
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error.message || "Failed to sign in");
      toast?.push({ type: "error", title: "Sign in failed", message: error.message || "" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
      <h2>Sign in</h2>
      <p style={{ color: "var(--muted)", marginTop: 4 }}>Use the demo account <strong>test@ticketapp.local</strong> / <strong>Password123!</strong> or create your own.</p>

      <form onSubmit={handleSubmit} aria-describedby="login-help">
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-required="true"
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            required
            aria-required="true"
            placeholder="Enter your password"
          />
        </label>

        {err && <div role="alert" className="form-error" style={{ marginTop: 8 }}>{err}</div>}

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button className="btn" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          <Link to="/auth/signup" className="btn secondary" style={{ textDecoration: "none", alignSelf: "center" }}>Create account</Link>
        </div>
      </form>

      <div id="login-help" style={{ marginTop: 12, color: "var(--muted)", fontSize: 13 }}>
        If you forget your password, refresh the page to use the demo credentials (no email reset in the demo).
      </div>
    </div>
  );
}

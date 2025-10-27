// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useToastContext } from "../context/ToastProvider";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function passwordStrength(pw) {
  // simple check: min 8, includes number and letter
  if (!pw || pw.length < 8) return "Password must be at least 8 characters";
  if (!/[0-9]/.test(pw)) return "Password should include a number";
  if (!/[A-Za-z]/.test(pw)) return "Password should include a letter";
  return "";
}

export default function Signup() {
  const { signup } = useAuth();
  const toast = useToastContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!name || name.trim().length < 2) return setErr("Please provide your name (at least 2 characters)");
    if (!validateEmail(email)) return setErr("Please provide a valid email address");
    const pwErr = passwordStrength(password);
    if (pwErr) return setErr(pwErr);

    try {
      setLoading(true);
      signup({ name: name.trim(), email: email.trim(), password });
      toast?.push({ type: "success", title: "Account created", message: `Welcome, ${name}!` });
      navigate("/tickets", { replace: true });
    } catch (error) {
      setErr(error.message || "Signup failed");
      toast?.push({ type: "error", title: "Signup failed", message: error.message || "" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
      <h2>Create account</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Full name
          <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
        </label>

        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" inputMode="email" required placeholder="you@example.com" />
        </label>

        <label>
          Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Choose a strong password" />
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>
            Password must be at least 8 chars and include letters and numbers.
          </div>
        </label>

        {err && <div role="alert" className="form-error" style={{ marginTop: 8 }}>{err}</div>}

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button className="btn" type="submit" disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
        </div>
      </form>
    </div>
  );
}

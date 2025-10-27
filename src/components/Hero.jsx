// src/components/Hero.jsx
import React from "react";
import heroLight from "../assets/autumn/hero-wave-autumn-light.svg";
import heroDark from "../assets/autumn/hero-wave-autumn-dark.svg";

/* Simple theme-aware hero. Make sure assets exist at the paths above. */
export default function Hero() {
  const isDark = document.documentElement.classList.contains("theme-dark") || document.documentElement.dataset.theme === "dark";
  const src = isDark ? heroDark : heroLight;

  return (
    <section className="hero card" role="region" aria-label="Autumn hero">
      <div className="hero-content">
        <h1>Ship delightful fixes — with a warm autumn glow</h1>
        <p>Track issues, assign work, and move tickets to resolution. Built with accessibility, polish, and an autumn-first design system.</p>
        <div style={{ display:"flex", gap:12, marginTop:12 }}>
          <a className="btn" href="/auth/signup">Get started</a>
          <a className="btn secondary" href="/auth/login">Sign in</a>
        </div>
      </div>

      <div style={{ marginLeft: "auto" }}>
        <img src={src} alt="" aria-hidden="true" style={{ width: 420, maxWidth: "40vw", display: "block", transform: "translateY(-6px)" }} />
      </div>
    </section>
  );
}

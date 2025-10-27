import { Link } from "react-router-dom"
import heroLight from "../assets/autumn/hero-wave-autumn-light.svg"
import heroDark from "../assets/autumn/hero-wave-autumn-dark.svg"
import leaf1 from "../assets/autumn/leaf-1.svg"

/* Enhanced hero with better layout and decorative elements */
export default function Hero() {
  const isDark = document.documentElement.classList.contains("theme-dark") || document.documentElement.dataset.theme === "dark";
  const src = isDark ? heroDark : heroLight;

  return (
    <section className="hero" role="region" aria-label="Autumn hero">
      <div className="hero-content">
        <h1>Ship delightful fixes — with a warm autumn glow</h1>
        <p>Track issues, assign work, and move tickets to resolution. Built with accessibility, polish, and an autumn-first design system.</p>
        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <a className="btn" href="/auth/signup">Get started</a>
          <a className="btn secondary" href="/auth/login">Sign in</a>
        </div>
      </div>

      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img 
          src={src || "/placeholder.svg"} 
          alt="" 
          aria-hidden="true" 
          style={{ 
            width: "min(420px, 40vw)", 
            maxWidth: "100%",
            display: "block", 
            transform: "translateY(-6px)",
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))"
          }} 
        />
      </div>
    </section>
  );
}

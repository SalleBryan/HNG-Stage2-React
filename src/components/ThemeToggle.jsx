// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";

/**
 * ThemeToggle
 * - toggles between: light (default), autumn, dark
 * - persists to localStorage under "theme"
 * - writes class to <html> (theme-autumn or theme-dark) to apply CSS variables
 */
const THEMES = ["light", "autumn", "dark"];
const STORAGE_KEY = "theme";

function applyThemeToHtml(theme) {
  const el = document.documentElement;
  el.classList.remove("theme-autumn", "theme-dark");
  if (theme === "autumn") el.classList.add("theme-autumn");
  if (theme === "dark") el.classList.add("theme-dark");
  // light = no extra class (uses :root variables)
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // 1) check localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && THEMES.includes(stored)) return stored;
    } catch {}
    // 2) detect system dark preference as sensible default
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    applyThemeToHtml(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }, [theme]);

  // cycle themes on click
  function handleToggle() {
    const idx = THEMES.indexOf(theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next);
  }

  return (
    <button
      className="btn"
      onClick={handleToggle}
      aria-pressed={theme !== "light"}
      title={`Theme: ${theme} — click to change`}
      style={{ display: "inline-flex", gap: 8, alignItems: "center" }}
    >
      <span aria-hidden="true" style={{fontSize:14}}>🎨</span>
      <span style={{ fontSize: 14 }}>{theme}</span>
    </button>
  );
}

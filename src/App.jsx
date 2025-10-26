import React from 'react';
import { Link, Outlet } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/App.css";

export default function App() {
  return (
    <div className="app container">
      <header className="app-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}><a href="/" style={{ color: "inherit", textDecoration: "none" }}>Ticket Platform</a></h1>
          <p className="subtitle" style={{ marginTop: 6 }}>A simple scaffold — now with theming.</p>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* keep your nav Links here as before */}
          <nav style={{ display: "flex", gap: 10 }}>
            <a href="/" style={{ color: "var(--muted)" }}>Home</a>
            <a href="/dashboard" style={{ color: "var(--muted)" }}>Dashboard</a>
            <a href="/tickets" style={{ color: "var(--muted)" }}>Tickets</a>
          </nav>

          <ThemeToggle />
        </div>
      </header>

      <main className="app-main card" style={{ marginTop: 12 }}>
        <Outlet />
      </main>
    </div>
  );
}
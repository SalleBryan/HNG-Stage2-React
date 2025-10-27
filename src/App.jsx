// in src/App.jsx (top imports)
import Hero from "./components/Hero";
import ThemeToggle from "./components/ThemeToggle";
import useAuth from "./hooks/useAuth";
import { Link, Outlet } from "react-router-dom";

/* Replace your header JSX with this block inside App() render */
<header className="app-header container">
  <div className="brand">
    <div className="logo">TP</div>
    <div>
      <h1 style={{margin:0, fontSize:18}}>Ticket Platform</h1>
      <div style={{ fontSize:13, color:"var(--color-muted)" }}>Autumn-themed, accessible ticketing</div>
    </div>
  </div>

  <div style={{ display:"flex", gap:12, alignItems:"center" }}>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard" style={{ marginLeft: 8 }}>Dashboard</Link>
      <Link to="/tickets" style={{ marginLeft: 8 }}>Tickets</Link>
    </nav>

    <ThemeToggle />

    {session ? (
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <div style={{ textAlign:"right", fontSize:13 }}>
          <div style={{ fontWeight:700 }}>{session.user?.name}</div>
          <div style={{ color:"var(--color-muted)" }}>{session.user?.email}</div>
        </div>
        <button className="btn secondary" onClick={() => { logout(); }}>Logout</button>
      </div>
    ) : (
      <div style={{ display:"flex", gap:8 }}>
        <Link to="/auth/login" className="btn secondary">Sign in</Link>
        <Link to="/auth/signup" className="btn">Sign up</Link>
      </div>
    )}
  </div>
</header>

{/* then render hero on top-level landing route or home */}

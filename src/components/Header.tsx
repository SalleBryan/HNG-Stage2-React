"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { LogOut, LayoutDashboard, Ticket } from "lucide-react"
import { useAuth } from "../context/AuthProvider"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="app-header">
      <Link to="/" className="brand">
        <div className="logo">🍂</div>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "20px" }}>TicketFlow</span>
      </Link>

      <nav>
        {user ? (
          <>
            <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
              <LayoutDashboard size={18} style={{ marginRight: "6px" }} />
              Dashboard
            </Link>
            <Link to="/tickets" className={isActive("/tickets") ? "active" : ""}>
              <Ticket size={18} style={{ marginRight: "6px" }} />
              Tickets
            </Link>
            <button onClick={handleLogout} className="btn secondary" style={{ padding: "8px 16px" }}>
              <LogOut size={16} style={{ marginRight: "6px" }} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className={isActive("/auth/login") ? "active" : ""}>
              Login
            </Link>
            <Link to="/auth/signup" className={isActive("/auth/signup") ? "active" : ""}>
              Sign Up
            </Link>
          </>
        )}
        <ThemeToggle />
      </nav>
    </header>
  )
}

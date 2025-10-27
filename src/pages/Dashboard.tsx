"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { type Ticket, getTickets } from "../utils/ticketStorage"

export default function Dashboard() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    if (user) {
      const userTickets = getTickets(user.id)
      setTickets(userTickets)
    }
  }, [user])

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  }

  const recentTickets = tickets.slice(0, 5)

  return (
    <div className="container" style={{ paddingTop: "var(--space-xl)", paddingBottom: "var(--space-2xl)" }}>
      <div style={{ marginBottom: "var(--space-xl)" }}>
        <h1>Welcome back, {user?.name}! 👋</h1>
        <p style={{ color: "var(--color-text-secondary)" }}>Here's an overview of your ticket management</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "var(--space-lg)",
          marginBottom: "var(--space-2xl)",
        }}
      >
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tickets</div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--leaf-olive)" }}>
            {stats.open}
          </div>
          <div className="stat-label">Open</div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--accent-secondary)" }}>
            {stats.inProgress}
          </div>
          <div className="stat-label">In Progress</div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--muted-brown)" }}>
            {stats.closed}
          </div>
          <div className="stat-label">Closed</div>
        </div>
      </div>

      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "var(--space-lg)",
          }}
        >
          <h2 style={{ margin: 0 }}>Recent Tickets</h2>
          <Link to="/tickets" className="btn secondary" style={{ padding: "8px 16px" }}>
            View All
          </Link>
        </div>

        {recentTickets.length === 0 ? (
          <div style={{ textAlign: "center", padding: "var(--space-2xl)" }}>
            <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-lg)" }}>
              No tickets yet. Create your first ticket to get started!
            </p>
            <Link to="/tickets" className="btn">
              Create Ticket
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="card"
                style={{
                  padding: "var(--space-md)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "var(--space-md)",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, marginBottom: "var(--space-xs)", fontSize: "var(--font-size-lg)" }}>
                    {ticket.title}
                  </h3>
                  <p style={{ margin: 0, color: "var(--color-muted)", fontSize: "var(--font-size-sm)" }}>
                    {ticket.description.substring(0, 100)}
                    {ticket.description.length > 100 ? "..." : ""}
                  </p>
                </div>
                <span className={`status-pill status-${ticket.status}`}>
                  {ticket.status === "in-progress" ? "In Progress" : ticket.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

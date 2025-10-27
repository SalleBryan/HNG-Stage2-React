"use client"

import { Edit2, Trash2, Calendar } from "lucide-react"
import type { Ticket } from "../utils/ticketStorage"

interface TicketListProps {
  tickets: Ticket[]
  onEdit: (ticket: Ticket) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: "open" | "in-progress" | "closed") => void
}

export default function TicketList({ tickets, onEdit, onDelete, onStatusChange }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="card" style={{ padding: "var(--space-2xl)", textAlign: "center" }}>
        <p style={{ color: "var(--color-muted)", fontSize: "var(--font-size-lg)" }}>No tickets found</p>
      </div>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "var(--leaf-rust)"
      case "medium":
        return "var(--accent-secondary)"
      case "low":
        return "var(--leaf-olive)"
      default:
        return "var(--color-muted)"
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card ticket-item" style={{ padding: "var(--space-lg)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "var(--space-md)",
              marginBottom: "var(--space-md)",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "var(--font-size-xl)" }}>{ticket.title}</h3>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "var(--font-size-xs)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: getPriorityColor(ticket.priority),
                    border: `1px solid ${getPriorityColor(ticket.priority)}`,
                    background: `${getPriorityColor(ticket.priority)}15`,
                  }}
                >
                  {ticket.priority}
                </span>
              </div>
              <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>{ticket.description}</p>
              <p
                style={{
                  margin: 0,
                  marginTop: "var(--space-sm)",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--color-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-xs)",
                }}
              >
                <Calendar size={12} />
                Created: {new Date(ticket.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`status-pill status-${ticket.status}`}>
              {ticket.status === "in-progress" ? "In Progress" : ticket.status}
            </span>
          </div>

          <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
            <select
              value={ticket.status}
              onChange={(e) => onStatusChange(ticket.id, e.target.value as any)}
              style={{ padding: "8px 12px", fontSize: "var(--font-size-sm)" }}
              aria-label="Change ticket status"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <button onClick={() => onEdit(ticket)} className="btn secondary" style={{ padding: "8px 16px" }}>
              <Edit2 size={14} style={{ marginRight: "6px" }} />
              Edit
            </button>
            <button
              onClick={() => onDelete(ticket.id)}
              className="btn secondary"
              style={{ padding: "8px 16px", color: "var(--leaf-rust)" }}
            >
              <Trash2 size={14} style={{ marginRight: "6px" }} />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

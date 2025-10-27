"use client"

import { useState, type FormEvent, useEffect } from "react"
import type { Ticket } from "../utils/ticketStorage"

interface TicketFormProps {
  ticket?: Ticket | null
  onSubmit: (
    title: string,
    description: string,
    priority: "low" | "medium" | "high",
    status?: "open" | "in-progress" | "closed",
  ) => void
  onCancel: () => void
}

export default function TicketForm({ ticket, onSubmit, onCancel }: TicketFormProps) {
  const [title, setTitle] = useState(ticket?.title || "")
  const [description, setDescription] = useState(ticket?.description || "")
  const [priority, setPriority] = useState<"low" | "medium" | "high">(ticket?.priority || "medium")
  const [status, setStatus] = useState<"open" | "in-progress" | "closed">(ticket?.status || "open")

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title)
      setDescription(ticket.description)
      setPriority(ticket.priority)
      setStatus(ticket.status)
    }
  }, [ticket])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (ticket) {
      onSubmit(title, description, priority, status)
    } else {
      onSubmit(title, description, priority)
    }
  }

  return (
    <div className="card" style={{ maxWidth: "600px", width: "100%", padding: "var(--space-xl)" }}>
      <h2 style={{ marginBottom: "var(--space-lg)" }}>{ticket ? "Edit Ticket" : "Create New Ticket"}</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        <div>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "var(--space-sm)",
              fontWeight: 600,
              fontSize: "var(--font-size-sm)",
            }}
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter ticket title"
            required
            autoFocus
          />
        </div>

        <div>
          <label
            htmlFor="description"
            style={{
              display: "block",
              marginBottom: "var(--space-sm)",
              fontWeight: 600,
              fontSize: "var(--font-size-sm)",
            }}
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue or request"
            required
            rows={4}
          />
        </div>

        <div>
          <label
            htmlFor="priority"
            style={{
              display: "block",
              marginBottom: "var(--space-sm)",
              fontWeight: 600,
              fontSize: "var(--font-size-sm)",
            }}
          >
            Priority
          </label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as any)} required>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {ticket && (
          <div>
            <label
              htmlFor="status"
              style={{
                display: "block",
                marginBottom: "var(--space-sm)",
                fontWeight: 600,
                fontSize: "var(--font-size-sm)",
              }}
            >
              Status
            </label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value as any)} required>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        )}

        <div style={{ display: "flex", gap: "var(--space-md)", marginTop: "var(--space-md)" }}>
          <button type="submit" className="btn" style={{ flex: 1 }}>
            {ticket ? "Update Ticket" : "Create Ticket"}
          </button>
          <button type="button" onClick={onCancel} className="btn secondary" style={{ flex: 1 }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, Plus, BarChart3, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { useAuth } from "../context/AuthProvider"
import { useToast } from "../context/ToastProvider"
import { type Ticket, getTickets, createTicket, updateTicket, deleteTicket } from "../utils/ticketStorage"
import TicketForm from "../components/TicketForm"
import TicketList from "../components/TicketList"

export default function Tickets() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
  const [filter, setFilter] = useState<"all" | "open" | "in-progress" | "closed">("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (user) {
      loadTickets()
    }
  }, [user])

  const loadTickets = () => {
    if (user) {
      const userTickets = getTickets(user.id)
      setTickets(userTickets)
    }
  }

  const handleCreateTicket = (title: string, description: string, priority: "low" | "medium" | "high") => {
    if (!user) return

    const newTicket = createTicket(user.id, title, description, priority)
    setTickets([newTicket, ...tickets])
    setIsFormOpen(false)
    showToast("Ticket created successfully!", "success")
  }

  const handleUpdateTicket = (
    id: string,
    updates: { title?: string; description?: string; status?: string; priority?: string },
  ) => {
    if (!user) return

    const updated = updateTicket(user.id, id, updates)
    if (updated) {
      loadTickets()
      setEditingTicket(null)
      setIsFormOpen(false)
      showToast("Ticket updated successfully!", "success")
    }
  }

  const handleDeleteTicket = (id: string) => {
    if (!user) return

    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const deleted = deleteTicket(user.id, id)
      if (deleted) {
        loadTickets()
        showToast("Ticket deleted successfully!", "success")
      }
    }
  }

  const handleEditClick = (ticket: Ticket) => {
    setEditingTicket(ticket)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTicket(null)
  }

  const filteredTickets = useMemo(() => {
    let result = tickets

    if (filter !== "all") {
      result = result.filter((t) => t.status === filter)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.priority.toLowerCase().includes(query),
      )
    }

    return result
  }, [tickets, filter, searchQuery])

  const stats = useMemo(
    () => ({
      total: tickets.length,
      open: tickets.filter((t) => t.status === "open").length,
      inProgress: tickets.filter((t) => t.status === "in-progress").length,
      closed: tickets.filter((t) => t.status === "closed").length,
      highPriority: tickets.filter((t) => t.priority === "high").length,
      mediumPriority: tickets.filter((t) => t.priority === "medium").length,
      lowPriority: tickets.filter((t) => t.priority === "low").length,
    }),
    [tickets],
  )

  return (
    <div className="container" style={{ paddingTop: "var(--space-xl)", paddingBottom: "var(--space-2xl)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-xl)",
          flexWrap: "wrap",
          gap: "var(--space-md)",
        }}
      >
        <h1>My Tickets</h1>
        <button onClick={() => setIsFormOpen(true)} className="btn">
          <Plus size={18} style={{ marginRight: "8px" }} />
          Create Ticket
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "var(--space-md)",
          marginBottom: "var(--space-xl)",
        }}
      >
        <div className="stat-card" style={{ padding: "var(--space-md)" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)", marginBottom: "var(--space-xs)" }}
          >
            <BarChart3 size={16} style={{ color: "var(--color-muted)" }} />
            <div className="stat-label" style={{ fontSize: "var(--font-size-xs)" }}>
              Total
            </div>
          </div>
          <div className="stat-value" style={{ fontSize: "var(--font-size-2xl)" }}>
            {stats.total}
          </div>
        </div>

        <div className="stat-card" style={{ padding: "var(--space-md)" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)", marginBottom: "var(--space-xs)" }}
          >
            <AlertCircle size={16} style={{ color: "var(--leaf-olive)" }} />
            <div className="stat-label" style={{ fontSize: "var(--font-size-xs)" }}>
              Open
            </div>
          </div>
          <div className="stat-value" style={{ fontSize: "var(--font-size-2xl)", color: "var(--leaf-olive)" }}>
            {stats.open}
          </div>
        </div>

        <div className="stat-card" style={{ padding: "var(--space-md)" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)", marginBottom: "var(--space-xs)" }}
          >
            <Clock size={16} style={{ color: "var(--accent-secondary)" }} />
            <div className="stat-label" style={{ fontSize: "var(--font-size-xs)" }}>
              In Progress
            </div>
          </div>
          <div className="stat-value" style={{ fontSize: "var(--font-size-2xl)", color: "var(--accent-secondary)" }}>
            {stats.inProgress}
          </div>
        </div>

        <div className="stat-card" style={{ padding: "var(--space-md)" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)", marginBottom: "var(--space-xs)" }}
          >
            <CheckCircle2 size={16} style={{ color: "var(--muted-brown)" }} />
            <div className="stat-label" style={{ fontSize: "var(--font-size-xs)" }}>
              Closed
            </div>
          </div>
          <div className="stat-value" style={{ fontSize: "var(--font-size-2xl)", color: "var(--muted-brown)" }}>
            {stats.closed}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-lg)",
          flexWrap: "wrap",
          padding: "var(--space-md)",
          background: "var(--color-surface)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "var(--color-text-secondary)" }}>
          Priorities:
        </span>
        <span style={{ fontSize: "var(--font-size-sm)" }}>
          <span style={{ color: "var(--leaf-rust)", fontWeight: 600 }}>{stats.highPriority}</span> High
        </span>
        <span style={{ fontSize: "var(--font-size-sm)" }}>
          <span style={{ color: "var(--accent-secondary)", fontWeight: 600 }}>{stats.mediumPriority}</span> Medium
        </span>
        <span style={{ fontSize: "var(--font-size-sm)" }}>
          <span style={{ color: "var(--leaf-olive)", fontWeight: 600 }}>{stats.lowPriority}</span> Low
        </span>
      </div>

      <div style={{ marginBottom: "var(--space-lg)" }}>
        <div style={{ position: "relative", maxWidth: "500px" }}>
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-muted)",
            }}
          />
          <input
            type="search"
            placeholder="Search tickets by title, description, or priority..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: "40px",
              width: "100%",
            }}
            aria-label="Search tickets"
          />
        </div>
      </div>

      <div style={{ marginBottom: "var(--space-lg)" }}>
        <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
          {(["all", "open", "in-progress", "closed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={filter === status ? "btn" : "btn secondary"}
              style={{ padding: "8px 16px" }}
            >
              {status === "all" ? "All" : status === "in-progress" ? "In Progress" : status}
            </button>
          ))}
        </div>
      </div>

      {isFormOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "var(--space-lg)",
          }}
          onClick={handleCloseForm}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <TicketForm
              ticket={editingTicket}
              onSubmit={
                editingTicket
                  ? (title, description, priority, status) =>
                      handleUpdateTicket(editingTicket.id, { title, description, priority, status })
                  : handleCreateTicket
              }
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}

      <TicketList
        tickets={filteredTickets}
        onEdit={handleEditClick}
        onDelete={handleDeleteTicket}
        onStatusChange={(id, status) => handleUpdateTicket(id, { status })}
      />
    </div>
  )
}

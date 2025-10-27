// src/pages/TicketList.jsx
import React, { useEffect, useMemo, useState } from "react";
import TicketForm from "../components/TicketForm";
import TicketItem from "../components/TicketItem";
import TicketEditModal from "../components/TicketEditModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { getTickets, deleteTicket } from "../utils/storage";
import { useToastContext } from "../context/ToastProvider";
import useDebounce from "../hooks/useDebounce";
import useAuth from "../hooks/useAuth";
import "../styles/tickets.css";

export default function TicketList() {
  const { session } = useAuth();
  const ownerEmail = session?.user?.email;
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);

  // search / filters / sort UI state
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [statusFilter, setStatusFilter] = useState("all"); // all | open | in_progress | closed
  const [priorityFilter, setPriorityFilter] = useState("all"); // all | low | medium | high
  const [sortOrder, setSortOrder] = useState("newest"); // newest | oldest

  // confirm delete dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const toast = useToastContext();

  // initial load for current user
  useEffect(() => {
    setTickets(getTickets(ownerEmail));
  }, [ownerEmail]);

  // Create: parent receives new ticket from TicketForm
  function handleCreate(newTicket) {
    setTickets((prev) => [newTicket, ...prev]);
    toast?.push({ type: "success", title: "Ticket created", message: newTicket.title });
  }

  // Edit flows
  function handleEditOpen(ticket) {
    setEditingTicket(ticket);
  }
  function handleEditClose() {
    setEditingTicket(null);
  }
  function handleEditSaved(updatedTicket) {
    setTickets((prev) => prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)));
    toast?.push({ type: "success", title: "Ticket updated", message: updatedTicket.title });
  }

  // Delete flows: open confirm dialog first
  function requestDelete(ticket) {
    setToDelete(ticket);
    setConfirmOpen(true);
  }

  function performDelete(id) {
    if (!id) {
      setConfirmOpen(false);
      setToDelete(null);
      return;
    }
    const ok = deleteTicket(id);
    if (ok) {
      setTickets((prev) => prev.filter((t) => t.id !== id));
      toast?.push({ type: "success", title: "Deleted", message: "Ticket deleted." });
    } else {
      // fallback: refresh from storage
      setTickets(getTickets(ownerEmail));
      toast?.push({ type: "error", title: "Delete failed", message: "Could not delete ticket." });
    }
    setConfirmOpen(false);
    setToDelete(null);
  }

  // Filter / search / sort - derived list
  const visibleTickets = useMemo(() => {
    let list = Array.isArray(tickets) ? [...tickets] : [];

    // search matches title OR description (case-insensitive)
    if (debouncedQuery && debouncedQuery.trim() !== "") {
      const q = debouncedQuery.toLowerCase();
      list = list.filter((t) => {
        const title = (t.title || "").toLowerCase();
        const desc = (t.description || "").toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }

    // status filter (note: storage uses 'in_progress')
    if (statusFilter !== "all") {
      list = list.filter((t) => t.status === statusFilter);
    }

    // priority filter
    if (priorityFilter !== "all") {
      list = list.filter((t) => t.priority === priorityFilter);
    }

    // sort
    list.sort((a, b) => {
      if (sortOrder === "newest") return b.createdAt - a.createdAt;
      return a.createdAt - b.createdAt;
    });

    return list;
  }, [tickets, debouncedQuery, statusFilter, priorityFilter, sortOrder]);

  // toggle helpers for filter buttons
  function setStatusOrToggle(value) {
    setStatusFilter((prev) => (prev === value ? "all" : value));
  }
  function setPriorityOrToggle(value) {
    setPriorityFilter((prev) => (prev === value ? "all" : value));
  }

  // If no owner (not logged in), show prompt
  if (!ownerEmail) {
    return (
      <div className="card" style={{ maxWidth: 680, margin: "0 auto" }}>
        <h2>Tickets</h2>
        <p style={{ color: "var(--muted)" }}>Please sign in to view and manage your tickets.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Tickets</h2>

      {/* Create form - pass owner so storage records ownership */}
      <section style={{ marginBottom: 16 }}>
        <TicketForm onCreate={handleCreate} owner={ownerEmail} />
      </section>

      {/* Controls: search / filters / sort */}
      <section style={{ marginBottom: 12 }}>
        <div className="controls-row" role="region" aria-label="Search and filters">
          <div className="control-search">
            <label>
              Search
              <input
                placeholder="Search title or description..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search tickets by title or description"
              />
            </label>
          </div>

          <div className="control-filters">
            <div className="filter-group">
              <span>Status:</span>
              <button
                className={statusFilter === "open" ? "active" : ""}
                onClick={() => setStatusOrToggle("open")}
              >
                Open
              </button>
              <button
                className={statusFilter === "in_progress" ? "active" : ""}
                onClick={() => setStatusOrToggle("in_progress")}
              >
                In progress
              </button>
              <button
                className={statusFilter === "closed" ? "active" : ""}
                onClick={() => setStatusOrToggle("closed")}
              >
                Closed
              </button>
            </div>

            <div className="filter-group">
              <span>Priority:</span>
              <button
                className={priorityFilter === "low" ? "active" : ""}
                onClick={() => setPriorityOrToggle("low")}
              >
                Low
              </button>
              <button
                className={priorityFilter === "medium" ? "active" : ""}
                onClick={() => setPriorityOrToggle("medium")}
              >
                Medium
              </button>
              <button
                className={priorityFilter === "high" ? "active" : ""}
                onClick={() => setPriorityOrToggle("high")}
              >
                High
              </button>
            </div>

            <div className="filter-group">
              <label>
                Sort:
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets list */}
      <section>
        <h3>Your tickets</h3>
        {visibleTickets.length === 0 ? (
          <div className="ticket-empty">
            <p>No tickets match your search / filters — try clearing filters or creating a new ticket.</p>
          </div>
        ) : (
          <div className="ticket-list">
            {visibleTickets.map((t) => (
              <TicketItem
                key={t.id}
                ticket={t}
                onRequestDelete={requestDelete}
                onEdit={handleEditOpen}
              />
            ))}
          </div>
        )}
      </section>

      {/* Edit modal */}
      <TicketEditModal
        ticket={editingTicket}
        onClose={handleEditClose}
        onSaved={handleEditSaved}
      />

      {/* Confirm delete dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete ticket"
        message={`Delete "${toDelete?.title || ""}"? This action cannot be undone.`}
        onCancel={() => { setConfirmOpen(false); setToDelete(null); }}
        onConfirm={() => performDelete(toDelete?.id)}
      />
    </div>
  );
}

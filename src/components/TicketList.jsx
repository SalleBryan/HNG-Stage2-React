import React, { useEffect, useMemo, useState } from "react";
import TicketForm from "../components/TicketForm";
import TicketItem from "../components/TicketItem";
import TicketEditModal from "../components/TicketEditModal";
import { getTickets, deleteTicket } from "../utils/storage";
import "../styles/tickets.css";


//TicketList with search (title + description), filters (status, priority), and sort.

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);

  // UI state for search/filters/sort
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); // used for actual filtering
  const [statusFilter, setStatusFilter] = useState("all"); // all | open | in-progress | closed
  const [priorityFilter, setPriorityFilter] = useState("all"); // all | low | medium | high
  const [sortOrder, setSortOrder] = useState("newest"); // newest | oldest

  // Load tickets once on mount
  useEffect(() => {
    setTickets(getTickets());
  }, []);

  // Debounce query: update debouncedQuery 300ms after user stops typing
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(id);
  }, [query]);

  function handleCreate(newTicket) {
    setTickets((prev) => [newTicket, ...prev]);
  }

  function handleDelete(id) {
    const ok = deleteTicket(id);
    if (ok) setTickets((prev) => prev.filter((t) => t.id !== id));
    else setTickets(getTickets());
  }

  function handleEditOpen(ticket) {
    setEditingTicket(ticket);
  }

  function handleEditClose() {
    setEditingTicket(null);
  }

  function handleEditSaved(updatedTicket) {
    setTickets((prev) => prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)));
  }

  // Derived list: apply search (title + description), filters, and sorting
  const visibleTickets = useMemo(() => {
    // start from the in-memory tickets (which reflect storage)
    let list = Array.isArray(tickets) ? [...tickets] : [];

    // Search: match in title OR description (case-insensitive)
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter((t) => {
        const title = (t.title || "").toLowerCase();
        const desc = (t.description || "").toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }

    // Status filter
    if (statusFilter !== "all") {
      list = list.filter((t) => t.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== "all") {
      list = list.filter((t) => t.priority === priorityFilter);
    }

    // Sort
    list.sort((a, b) => {
      if (sortOrder === "newest") return b.createdAt - a.createdAt;
      return a.createdAt - b.createdAt;
    });

    return list;
  }, [tickets, debouncedQuery, statusFilter, priorityFilter, sortOrder]);

  // Quick helpers to toggle filters (for simple buttons)
  function setStatusOrToggle(value) {
    setStatusFilter((prev) => (prev === value ? "all" : value));
  }
  function setPriorityOrToggle(value) {
    setPriorityFilter((prev) => (prev === value ? "all" : value));
  }

  return (
    <div>
      <h2>Tickets</h2>

      <section style={{ marginBottom: 16 }}>
        <TicketForm onCreate={handleCreate} />
      </section>

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
                className={statusFilter === "in-progress" ? "active" : ""}
                onClick={() => setStatusOrToggle("in-progress")}
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

      <section>
        <h3>Your tickets</h3>
        {visibleTickets.length === 0 ? (
          <p>No tickets match your search / filters — try clearing filters or creating a new ticket.</p>
        ) : (
          <div className="ticket-list">
            {visibleTickets.map((t) => (
              <TicketItem
                key={t.id}
                ticket={t}
                onDelete={handleDelete}
                onEdit={handleEditOpen}
              />
            ))}
          </div>
        )}
      </section>

      <TicketEditModal
        ticket={editingTicket}
        onClose={handleEditClose}
        onSaved={handleEditSaved}
      />
    </div>
  );
}

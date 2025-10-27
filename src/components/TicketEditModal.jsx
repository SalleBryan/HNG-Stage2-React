// src/components/TicketEditModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { updateTicket } from "../utils/storage";

/**
 * Props:
 * - ticket: the ticket object to edit (or null to hide)
 * - onClose: () => void
 * - onSaved: (updatedTicket) => void
 */
export default function TicketEditModal({ ticket, onClose, onSaved }) {
  const [title, setTitle] = useState(ticket ? ticket.title : "");
  const [description, setDescription] = useState(ticket ? ticket.description : "");
  const [priority, setPriority] = useState(ticket ? ticket.priority : "medium");
  const [status, setStatus] = useState(ticket ? ticket.status : "open");
  const [error, setError] = useState("");
  const firstInput = useRef();

  // When ticket changes, reset local state
  useEffect(() => {
    setTitle(ticket ? ticket.title : "");
    setDescription(ticket ? ticket.description : "");
    setPriority(ticket ? ticket.priority : "medium");
    setStatus(ticket ? ticket.status : "open");
    setError("");
    if (ticket && firstInput.current) firstInput.current.focus();
  }, [ticket]);

  if (!ticket) return null;

  function validate() {
    if (!title || title.trim().length < 3) return "Title must be at least 3 characters";
    if (title.trim().length > 200) return "Title must be at most 200 characters";
    if (description && description.length > 1000) return "Description must be at most 1000 characters";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    try {
      const updated = updateTicket(ticket.id, { title, description, priority, status });
      if (onSaved) onSaved(updated);
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || "Failed to update");
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="edit-ticket-title">
      <div className="modal">
        <h3 id="edit-ticket-title">Edit ticket</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input ref={firstInput} value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <div style={{ display: "flex", justifyContent: "flex-end", color: "var(--muted)", fontSize: 13 }}>
            {title.trim().length}/200
          </div>

          <label>
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <div style={{ display: "flex", justifyContent: "flex-end", color: "var(--muted)", fontSize: 13 }}>
            {description.length}/1000
          </div>

          <label>
            Priority
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="open">Open</option>
              <option value="in_progress">In progress</option>
              <option value="closed">Closed</option>
            </select>
          </label>

          {error && <div className="form-error" role="alert">{error}</div>}

          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <button type="submit" className="btn" disabled={!!validate()}>Save</button>
            <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

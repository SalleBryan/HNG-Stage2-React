import React, { useEffect, useRef, useState } from "react";
import { updateTicket } from "../utils/storage";

export default function TicketEditModal({ ticket, onClose, onSaved }) {
  const [title, setTitle] = useState(ticket ? ticket.title : "");
  const [description, setDescription] = useState(ticket ? ticket.description : "");
  const [priority, setPriority] = useState(ticket ? ticket.priority : "medium");
  const [status, setStatus] = useState(ticket ? ticket.status : "open");
  const [error, setError] = useState("");
  const firstInput = useRef();

  // Reset local state on change
  useEffect(() => {
    setTitle(ticket ? ticket.title : "");
    setDescription(ticket ? ticket.description : "");
    setPriority(ticket ? ticket.priority : "medium");
    setStatus(ticket ? ticket.status : "open");
    setError("");
    // autofocus (best-effort)
    if (ticket && firstInput.current) firstInput.current.focus();
  }, [ticket]);

  if (!ticket) return null;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
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

          <label>
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

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
              <option value="in-progress">In progress</option>
              <option value="closed">Closed</option>
            </select>
          </label>

          {error && <div className="form-error" role="alert">{error}</div>}

          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

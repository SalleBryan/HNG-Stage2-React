// src/components/TicketForm.jsx
import React, { useEffect, useState } from "react";
import { createTicket } from "../utils/storage";

export default function TicketForm({ onCreate, owner }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ title: false, description: false });

  // validation helpers
  function validate() {
    if (!title || title.trim().length < 3) return "Title must be at least 3 characters";
    if (title.trim().length > 200) return "Title must be at most 200 characters";
    if (description && description.length > 1000) return "Description must be at most 1000 characters";
    return "";
  }

  const currentError = validate();

  useEffect(() => {
    // clear global error when field changes
    setError("");
  }, [title, description, priority]);

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ title: true, description: true });
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    try {
      const ticket = createTicket({ title, description, priority, owner });
      setTitle("");
      setDescription("");
      setPriority("medium");
      setTouched({ title: false, description: false });
      if (onCreate) onCreate(ticket);
    } catch (err) {
      setError(err.message || "Failed to create ticket");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ticket-form" aria-label="Create ticket form">
      <h3>Create a new ticket</h3>

      <label>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, title: true }))}
          required
          placeholder="Short summary"
          aria-invalid={!!(touched.title && currentError)}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <div style={{ color: (touched.title && currentError) ? "var(--danger)" : "var(--muted)", fontSize: 13 }}>
            {touched.title && currentError ? currentError : "Keep it short and descriptive"}
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>{title.trim().length}/200</div>
        </div>
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, description: true }))}
          placeholder="More details (optional)"
        />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6, fontSize: 13, color: "var(--muted)" }}>
          {description.length}/1000
        </div>
      </label>

      <label>
        Priority
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      {error && <div className="form-error" role="alert">{error}</div>}

      <div style={{ marginTop: 8 }}>
        <button type="submit" className="btn" disabled={!!validate()}>Create ticket</button>
      </div>
    </form>
  );
}

// src/components/TicketItem.jsx
import React from "react";

export default function TicketItem({ ticket, onRequestDelete, onEdit }) {
  if (!ticket) return null;
  const { id, title, description, priority, status, createdAt } = ticket;
  const time = new Date(createdAt).toLocaleString();

  const statusClass = status === "open" ? "status-open" : status === "in_progress" ? "status-progress" : "status-closed";

  return (
    <article className="ticket-item card" aria-labelledby={`t-${id}-title`} style={{ display: "flex", flexDirection:"column", gap:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
        <div>
          <h4 id={`t-${id}-title`} style={{ margin:0, fontFamily:"var(--font-heading)" }}>{title}</h4>
          <div style={{ marginTop:6, fontSize:13, color:"var(--color-muted)" }}>{description?.slice(0,140)}</div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:8, alignItems:"flex-end" }}>
          <div className={`status-pill ${statusClass}`} aria-hidden="true">{status === "open" ? "Open" : status === "in_progress" ? "In progress" : "Closed"}</div>
          <div style={{ fontSize:12, color:"var(--color-muted)" }}>{time}</div>
        </div>
      </div>

      <div style={{ display:"flex", justifyContent:"flex-end", gap:8 }}>
        <button onClick={() => onEdit && onEdit(ticket)} className="btn secondary">Edit</button>
        <button onClick={() => onRequestDelete && onRequestDelete(ticket)} className="btn secondary" style={{ borderColor:"rgba(0,0,0,0.06)" }}>Delete</button>
      </div>
    </article>
  );
}

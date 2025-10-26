import React from "react";

export default function TicketItem({ ticket, onDelete, onEdit }) {
  if (!ticket) return null;
  const { id, title, description, priority, status, createdAt } = ticket;
  const time = new Date(createdAt).toLocaleString();

  return (
    <article className="ticket-item" aria-labelledby={`t-${id}-title`}>
      <div className="ticket-main">
        <h4 id={`t-${id}-title`}>{title}</h4>
        <p className="ticket-meta">{priority} • {status} • {time}</p>
        {description && <p className="ticket-desc">{description}</p>}
      </div>

      <div className="ticket-actions">
        <button onClick={() => onEdit && onEdit(ticket)} aria-label={`Edit ${title}`}>Edit</button>
        <button onClick={() => onDelete && onDelete(id)} aria-label={`Delete ${title}`}>Delete</button>
      </div>
    </article>
  );
}

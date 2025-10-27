"use client"

/* Enhanced ticket item with better visual hierarchy and hover effects */
export default function TicketItem({ ticket, onRequestDelete, onEdit }) {
  if (!ticket) return null;
  const { id, title, description, priority, status, createdAt } = ticket;
  const time = new Date(createdAt).toLocaleString();

  const statusClass = status === "open" ? "status-open" : status === "in_progress" ? "status-progress" : "status-closed";
  const statusLabel = status === "open" ? "Open" : status === "in_progress" ? "In progress" : "Closed";
  
  const priorityColors = {
    low: { bg: 'rgba(107, 139, 58, 0.1)', color: 'var(--leaf-olive)' },
    medium: { bg: 'rgba(212, 160, 23, 0.1)', color: 'var(--leaf-gold)' },
    high: { bg: 'rgba(183, 65, 14, 0.1)', color: 'var(--leaf-rust)' }
  };
  
  const priorityStyle = priority ? priorityColors[priority] : null;

  return (
    <article className="ticket-item card" aria-labelledby={`t-${id}-title`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <h4 id={`t-${id}-title`} style={{ margin: 0, marginBottom: 8, fontFamily: "var(--font-heading)", fontSize: "var(--font-size-lg)" }}>
            {title}
          </h4>
          {description && (
            <p style={{ 
              margin: 0, 
              fontSize: "var(--font-size-sm)", 
              color: "var(--color-text-secondary)", 
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}>
              {description}
            </p>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          <div className={`status-pill ${statusClass}`} aria-label={`Status: ${statusLabel}`}>
            {statusLabel}
          </div>
          {priority && priorityStyle && (
            <div 
              style={{ 
                padding: "4px 10px", 
                borderRadius: "var(--radius-full)", 
                fontSize: "var(--font-size-xs)", 
                fontWeight: 700,
                background: priorityStyle.bg,
                color: priorityStyle.color,
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}
              aria-label={`Priority: ${priority}`}
            >
              {priority}
            </div>
          )}
        </div>
      </div>

      <div style={{ 
        fontSize: "var(--font-size-xs)", 
        color: "var(--color-muted)", 
        marginBottom: 16,
        paddingTop: 12,
        borderTop: "1px solid rgba(0, 0, 0, 0.06)"
      }}>
        {time}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button onClick={() => onEdit && onEdit(ticket)} className="btn secondary">
          Edit
        </button>
        <button 
          onClick={() => onRequestDelete && onRequestDelete(ticket)} 
          className="btn secondary" 
          style={{ color: "var(--leaf-rust)" }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

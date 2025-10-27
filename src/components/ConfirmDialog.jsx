import React from "react";

/**
 * Props:
 * - open (bool)
 * - title (string)
 * - message (string)
 * - onConfirm () => void
 * - onCancel () => void
 */
export default function ConfirmDialog({ open, title = "Confirm", message = "Are you sure?", onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="modal card" style={{ maxWidth: 520 }}>
        <h3 id="confirm-title">{title}</h3>
        <p style={{ color: "var(--muted)" }}>{message}</p>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 12 }}>
          <button className="btn secondary" onClick={onCancel}>Cancel</button>
          <button className="btn" onClick={onConfirm}>Yes, delete</button>
        </div>
      </div>
    </div>
  );
}

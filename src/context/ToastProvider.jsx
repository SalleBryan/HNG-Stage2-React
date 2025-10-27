// src/context/ToastProvider.jsx
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const ToastContext = createContext(null);
let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback(({ type = "info", title = "", message = "", duration = 4500 }) => {
    const id = nextId++;
    const item = { id, type, title, message };
    setToasts((t) => [...t, item]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((t) => t.filter(x => x.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter(x => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, push, remove }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={remove} />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastContext must be used inside ToastProvider");
  return ctx;
}

/* small presentational container — kept inside provider file for convenience */
function ToastContainer({ toasts, onRemove }) {
  return (
    <div aria-live="polite" style={{
      position: "fixed",
      right: 18,
      bottom: 18,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      maxWidth: 360
    }}>
      {toasts.map(t => (
        <div key={t.id} role="status" aria-label={t.title || t.message}
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92))",
            borderRadius: 10,
            padding: "10px 12px",
            boxShadow: "0 8px 26px rgba(17,17,17,0.08)",
            border: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            minWidth: 260
          }}>
          <div style={{ fontWeight: 700, color: t.type === "error" ? "var(--danger)" : "var(--accent-2)" }}>
            {t.type === "error" ? "⚠" : t.type === "success" ? "✔" : "ℹ"}
          </div>
          <div style={{ flex: 1 }}>
            {t.title && <div style={{ fontWeight: 700 }}>{t.title}</div>}
            {t.message && <div style={{ fontSize: 13, color: "var(--muted)" }}>{t.message}</div>}
          </div>
          <button aria-label="Dismiss" onClick={() => onRemove(t.id)} style={{
            border: "none", background: "transparent", cursor: "pointer", color: "var(--muted)"
          }}>✕</button>
        </div>
      ))}
    </div>
  );
}

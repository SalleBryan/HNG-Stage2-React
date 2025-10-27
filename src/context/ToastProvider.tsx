"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

interface ToastContextType {
  showToast: (message: string, type: "success" | "error" | "info") => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: "success" | "error" | "info") => {
    const id = crypto.randomUUID()
    const newToast = { id, message, type }
    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const getToastColor = (type: string) => {
    switch (type) {
      case "success":
        return "var(--leaf-olive)"
      case "error":
        return "var(--leaf-rust)"
      default:
        return "var(--accent-primary)"
    }
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: "var(--space-lg)",
          right: "var(--space-lg)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="toast"
            style={{
              borderLeft: `4px solid ${getToastColor(toast.type)}`,
              minWidth: "300px",
            }}
          >
            <p style={{ margin: 0, fontWeight: 600 }}>{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

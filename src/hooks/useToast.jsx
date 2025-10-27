import { useContext } from "react";
import { ToastContext } from "../context/ToastProvider";

/**
 * Note: we also exported useToastContext from provider file.
 * This hook is a convenience wrapper that tolerates missing provider (no-op).
 */
export default function useToast() {
  try {
    const ctx = useContext(require("../context/ToastProvider").ToastContext);
    if (!ctx) throw new Error();
    return ctx;
  } catch {
    // fallback no-op to avoid errors if provider not mounted
    return {
      push: () => {},
      remove: () => {}
    };
  }
}

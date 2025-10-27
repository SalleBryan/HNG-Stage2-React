// src/components/ProtectedRoute.jsx
import React, { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useToastContext } from "../context/ToastProvider";

/**
 * ProtectedRoute
 * - If no session: schedule a toast (after render) and redirect to /auth/login.
 * - We guard against repeated toasts using a ref.
 */
export default function ProtectedRoute({ children }) {
  const { session } = useAuth();
  const location = useLocation();
  const toast = useToastContext?.();
  const pushedRef = useRef(false);

  // Only schedule a toast when user is NOT signed in.
  // Use effect so the toast push happens after render (safe).
  useEffect(() => {
    if (!session && toast && !pushedRef.current) {
      // mark pushed so we don't repeat while this component re-renders multiple times
      pushedRef.current = true;
      // schedule the toast on next tick to be extra-safe (optional)
      const id = setTimeout(() => {
        try {
          toast.push({
            type: "error",
            title: "Not signed in",
            message: "Please sign in to continue."
          });
        } catch (e) {
          // swallow errors here to avoid breaking the UI
          // (toast may be missing or throw)
        }
      }, 0);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [session, toast]);

  if (!session) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

import React  from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
        return <Navigate to = "/login" replace />;
    }

    return children;
}
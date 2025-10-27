"use client"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "../src/App"
import Home from "../src/pages/Home"
import Login from "../src/pages/Login"
import Signup from "../src/pages/Signup"
import Tickets from "../src/pages/Tickets"
import Dashboard from "../src/pages/Dashboard"
import { AuthProvider } from "../src/context/AuthProvider"
import { ToastProvider } from "../src/context/ToastProvider"
import ProtectedRoute from "../src/components/ProtectedRoute"
import "../src/styles/index.css"
import "../src/styles/theme.css"

export default function Page() {
  React.useEffect(() => {
    // Mount the React app when this component loads
    const root = document.getElementById("react-root")
    if (root && !root.hasChildNodes()) {
      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <AuthProvider>
            <ToastProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="auth">
                      <Route path="login" element={<Login />} />
                      <Route path="signup" element={<Signup />} />
                    </Route>

                    <Route
                      path="tickets"
                      element={
                        <ProtectedRoute>
                          <Tickets />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ToastProvider>
          </AuthProvider>
        </React.StrictMode>,
      )
    }
  }, [])

  return <div id="react-root" style={{ width: "100%", height: "100%" }} />
}

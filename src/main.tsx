import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Tickets from "./pages/Tickets"
import NotFound from "./pages/NotFound"
import AuthProvider from "./components/AuthProvider"
import ProtectedRoute from "./components/ProtectedRoute"
import { ToastProvider } from "@/components/ui/toast"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/signup", element: <Signup /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tickets",
        element: (
          <ProtectedRoute>
            <Tickets />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tickets from "./pages/Tickets";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthProvider";
import { ToastProvider } from "./context/ToastProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/index.css";
import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
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

              <Route path="tickets" element={
                <ProtectedRoute><Tickets /></ProtectedRoute>
              } />
              <Route path="dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);

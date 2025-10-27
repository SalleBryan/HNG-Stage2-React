"use client"

import type React from "react"

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  return <>{children}</>
}

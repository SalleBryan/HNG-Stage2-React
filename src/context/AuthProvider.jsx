// src/context/AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import * as auth from "../utils/auth";
import { migrateTicketsToOwner } from "../utils/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => auth.getSession());

  useEffect(() => {
    // ensure demo user exists and migrate old tickets to demo user
    try {
      auth.seedDemoUser();
      migrateTicketsToOwner("test@ticketapp.local");
    } catch (e) {}

    function onStorage(e) {
      if (e.key === "ticketapp_session") {
        setSession(auth.getSession());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function doLogin(creds) {
    const s = auth.login(creds);
    setSession(s);
    return s;
  }
  function doSignup(creds) {
    const s = auth.signup(creds);
    setSession(s);
    return s;
  }
  function doLogout() {
    auth.logout();
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, login: doLogin, signup: doSignup, logout: doLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

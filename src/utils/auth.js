const SESSION_KEY = "ticketapp_session";
const USERS_KEY = "ticketapp_users";

/** Helper to generate a pseudo token */
function genToken() {
  return Math.random().toString(36).slice(2) + "-" + Date.now().toString(36);
}

/** Read users map from localStorage */
function _readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function _saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** Seed a friendly demo user if not present */
export function seedDemoUser() {
  try {
    const users = _readUsers();
    const demoEmail = "test@ticketapp.local";
    if (!users[demoEmail]) {
      users[demoEmail] = { name: "Demo User", email: demoEmail, password: "Password123!" };
      _saveUsers(users);
    }
  } catch (e) {
    /* ignore seeding errors */
  }
}

/** Signup: simple email+password storage (NOT SECURE — simulated only) */
export function signup({ name, email, password }) {
  if (!email || !password) throw new Error("email & password required");
  const users = _readUsers();
  const key = String(email).toLowerCase();
  if (users[key]) throw new Error("An account with that email already exists");
  users[key] = { name: String(name || ""), email: key, password };
  _saveUsers(users);
  // create session
  const session = { token: genToken(), user: { name: users[key].name, email: key }, createdAt: Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

/** Login: check stored users map */
export function login({ email, password }) {
  const users = _readUsers();
  const key = String(email).toLowerCase();
  const u = users[key];
  if (!u || u.password !== password) throw new Error("Invalid credentials");
  const session = { token: genToken(), user: { name: u.name, email: key }, createdAt: Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

/** Logout: clear session */
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

/** Get current session or null */
export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// src/utils/storage.js
// localStorage-backed helper with per-user support and strict validation
const STORAGE_KEY = "ticketapp_tickets";

function safeParse(json, fallback = []) {
  try {
    return JSON.parse(json) || fallback;
  } catch (err) {
    return fallback;
  }
}

/** Returns tickets array (newest first). If ownerEmail provided, returns only that owner's tickets */
export function getTickets(ownerEmail = undefined) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const tickets = safeParse(raw, []);
  if (!Array.isArray(tickets)) return [];
  let list = tickets;
  if (ownerEmail) {
    list = tickets.filter((t) => t.owner === ownerEmail);
  }
  return list.sort((a, b) => b.createdAt - a.createdAt);
}

export function saveTickets(tickets = []) {
  if (!Array.isArray(tickets)) {
    throw new Error("saveTickets expects an array");
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  return tickets;
}

function generateId() {
  return `t_${Date.now().toString(36)}_${Math.floor(Math.random() * 0xffff).toString(16)}`;
}

/** Normalize status values to spec: open | in_progress | closed */
function normalizeStatus(raw) {
  if (!raw) return "open";
  const map = {
    open: "open",
    "in-progress": "in_progress",
    in_progress: "in_progress",
    inprogress: "in_progress",
    closed: "closed",
  };
  const key = String(raw).toLowerCase();
  return map[key] || "open";
}

const VALID_PRIORITIES = ["low", "medium", "high"];

/** Migrate tickets without an owner to a default owner (useful for upgrade) */
export function migrateTicketsToOwner(defaultOwnerEmail) {
  if (!defaultOwnerEmail) return;
  const raw = localStorage.getItem(STORAGE_KEY);
  const tickets = safeParse(raw, []);
  let changed = false;
  const newTickets = tickets.map((t) => {
    if (!t.owner) {
      changed = true;
      return { ...t, owner: defaultOwnerEmail };
    }
    return t;
  });
  if (changed) saveTickets(newTickets);
  return changed;
}

/** Create a new ticket. Accepts optional ownerEmail to assign ownership. */
export function createTicket({
  title,
  description = "",
  status = "open",
  priority = "medium",
  assignee = "",
  owner = undefined,
}) {
  // validation
  if (!title || !String(title).trim()) {
    throw new Error("title is required");
  }
  const trimmedTitle = String(title).trim();
  if (trimmedTitle.length < 3 || trimmedTitle.length > 200) {
    throw new Error("title must be between 3 and 200 characters");
  }
  if (description && String(description).length > 1000) {
    throw new Error("description must be at most 1000 characters");
  }
  const p = (String(priority || "medium")).toLowerCase();
  const priorityNormalized = VALID_PRIORITIES.includes(p) ? p : "medium";

  const now = Date.now();
  const ticket = {
    id: generateId(),
    title: trimmedTitle,
    description: String(description || "").trim(),
    status: normalizeStatus(status),
    priority: priorityNormalized,
    assignee: String(assignee || "").trim(),
    owner: owner || null,
    createdAt: now,
    updatedAt: now,
  };

  const current = safeParse(localStorage.getItem(STORAGE_KEY), []);
  current.unshift(ticket);
  saveTickets(current);
  return ticket;
}

/** Update an existing ticket by id. Returns the updated ticket or null if not found */
export function updateTicket(id, updates = {}) {
  if (!id) throw new Error("id is required to updateTicket");

  const tickets = safeParse(localStorage.getItem(STORAGE_KEY), []);
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx === -1) return null;

  const existing = tickets[idx];

  // apply and validate updates
  const newTitle = updates.title !== undefined ? String(updates.title).trim() : existing.title;
  if (!newTitle || newTitle.length < 3 || newTitle.length > 200) {
    throw new Error("title must be between 3 and 200 characters");
  }

  const newDesc = updates.description !== undefined ? String(updates.description) : existing.description;
  if (newDesc && newDesc.length > 1000) {
    throw new Error("description must be at most 1000 characters");
  }

  const newPriority = updates.priority !== undefined ? String(updates.priority).toLowerCase() : existing.priority;
  const priorityNormalized = VALID_PRIORITIES.includes(newPriority) ? newPriority : existing.priority;

  const newStatus = updates.status !== undefined ? normalizeStatus(updates.status) : existing.status;

  const updated = {
    ...existing,
    ...updates,
    title: newTitle,
    description: newDesc,
    priority: priorityNormalized,
    status: newStatus,
    assignee: updates.assignee !== undefined ? String(updates.assignee).trim() : existing.assignee,
    updatedAt: Date.now(),
  };

  tickets[idx] = updated;
  saveTickets(tickets);
  return updated;
}

/** Delete a ticket by id. Returns true if deleted, false if not found */
export function deleteTicket(id) {
  const tickets = safeParse(localStorage.getItem(STORAGE_KEY), []);
  const filtered = tickets.filter((t) => t.id !== id);
  if (filtered.length === tickets.length) return false;
  saveTickets(filtered);
  return true;
}

/** Optional: clear all tickets (useful during development) */
export function clearAllTickets() {
  localStorage.removeItem(STORAGE_KEY);
}

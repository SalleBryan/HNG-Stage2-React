const STORAGE_KEY = "ticketapp_tickets";

function safeParse(json, fallback = []) {
    try {
        return JSON.parse(json) || fallback;
    } catch (err) {
        return fallback;
    }
}

export function getTickets() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const tickets = safeParse(raw, []);

    if (!Array.isArray(tickets)) return [];
    return tickets.sort((a, b) => b.createdAt - a.createdAt)
}

export function saveTickets(tickets = []) {
    if (!Array.isArray(tickets)) {
        throw new Error("saveTickets expects an array");
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    return tickets;
}

function generateId() {
    return `t_${Date.now().toString(36)}_${Math.random() * 0xffff.toString(16)}`;
}

export function createTicket({ title, description = "", status = "open", priority = "medium", assignee = "" }) {
    if (!title || !title.trim()) {
        throw new Error("Title is required");
    }

    const now = Date.now();
    const ticket = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        assignee: assignee.trim(),
        createdAt: now,
        updatedAt: now,
    };

    const current = getTickets();
    current.unshift(ticket);
    saveTickets(current);
    return ticket;

}

export function updateTicket(id, updates = {}) {
    if (!id) throw new Error("Ticket ID is required to update a ticket");

    const tickets = getTickets();
    const idx = tickets.findIndex(t => t.id === id);
    if (idx === -1) {
        return null;
    }

    const existing = tickets[idx];
    const updated = {
        ...existing,
        ...updates,
        title: updates.title !== undefined ? String(updates.title).trim() : existing.title,
        description: updates.description !== undefined ? String(updates.description).trim() : existing.description,
        assignee: updates.assignee !== undefined ? String(updates.assignee).trim() : existing.assignee,
        updatedAt: Date.now(),
    };
    tickets[idx] = updated;
    saveTickets(tickets);
    return updated;
}

export function deleteTicket(id) {
    const tickets = getTickets();
    const filtered = tickets.filter(t => t.id !== id);
    if (filtered.length === tickets.length) {
        return false;
    }
    saveTickets(filtered);
    return true;
}

export function clearAllTickets() {
    localStorage.removeItem(STORAGE_KEY);
}
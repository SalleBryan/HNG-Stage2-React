export interface Ticket {
  id: string
  userId: string
  title: string
  description: string
  status: "open" | "in-progress" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = "tickets"

export function getTickets(userId: string): Ticket[] {
  const tickets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  return tickets.filter((t: Ticket) => t.userId === userId)
}

export function createTicket(
  userId: string,
  title: string,
  description: string,
  priority: "low" | "medium" | "high",
): Ticket {
  const tickets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")

  const newTicket: Ticket = {
    id: crypto.randomUUID(),
    userId,
    title,
    description,
    status: "open",
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  tickets.push(newTicket)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))

  return newTicket
}

export function updateTicket(
  userId: string,
  ticketId: string,
  updates: Partial<Omit<Ticket, "id" | "userId" | "createdAt">>,
): Ticket | null {
  const tickets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  const index = tickets.findIndex((t: Ticket) => t.id === ticketId && t.userId === userId)

  if (index === -1) return null

  tickets[index] = {
    ...tickets[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
  return tickets[index]
}

export function deleteTicket(userId: string, ticketId: string): boolean {
  const tickets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  const filtered = tickets.filter((t: Ticket) => !(t.id === ticketId && t.userId === userId))

  if (filtered.length === tickets.length) return false

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}

// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getTickets } from "../utils/storage";
import StatsCard from "../components/StatsCard";
import PriorityBarChart from "../components/PriorityBarChart";
import StatusDonut from "../components/StatusDonut";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  // totals
  const total = tickets.length;
  const openCount = tickets.filter(t => t.status === "open").length;
  const inProgressCount = tickets.filter(t => t.status === "in-progress").length;
  const closedCount = tickets.filter(t => t.status === "closed").length;

  // priority counts
  const lowCount = tickets.filter(t => t.priority === "low").length;
  const mediumCount = tickets.filter(t => t.priority === "medium").length;
  const highCount = tickets.filter(t => t.priority === "high").length;

  // recent 5
  const recent = [...tickets].sort((a,b)=> b.createdAt - a.createdAt).slice(0,5);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <section className="cards-row">
        <StatsCard label="Total tickets" value={total} />
        <StatsCard label="Open" value={openCount} />
        <StatsCard label="In progress" value={inProgressCount} />
        <StatsCard label="Closed" value={closedCount} />
      </section>

      <section className="charts-row">
        <div className="chart-card">
          <h3>Priorities</h3>
          <PriorityBarChart data={{ low: lowCount, medium: mediumCount, high: highCount }} />
        </div>

        <div className="chart-card">
          <h3>Status breakdown</h3>
          <StatusDonut data={{ open: openCount, "in-progress": inProgressCount, closed: closedCount }} />
        </div>
      </section>

      <section className="recent-card">
        <h3>Recent tickets</h3>
        {recent.length === 0 ? <p>No tickets yet.</p> : (
          <ul className="recent-list" aria-live="polite">
            {recent.map(t => (
              <li key={t.id}>
                <strong>{t.title}</strong>
                <div className="small-meta">{t.priority} • {t.status} • {new Date(t.createdAt).toLocaleString()}</div>
                {t.description && <div className="recent-desc">{t.description}</div>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

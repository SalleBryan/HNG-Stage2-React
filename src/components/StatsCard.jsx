import React from "react";

export default function StatsCard({ label, value }) {
  return (
    <div className="stat-card" role="status" aria-label={`${label}: ${value}`}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

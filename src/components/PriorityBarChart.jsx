import React from "react";

/**
 * props:
 *  - data: { low: number, medium: number, high: number }
 *
 * Simple horizontal bars rendered with SVG + accessible labels.
 */
export default function PriorityBarChart({ data }) {
  const { low = 0, medium = 0, high = 0 } = data || {};
  const total = low + medium + high || 1; // avoid divide-by-zero
  // bars will be max width 240 (px) in the layout
  const maxWidth = 240;

  const items = [
    { key: "low", label: "Low", count: low },
    { key: "medium", label: "Medium", count: medium },
    { key: "high", label: "High", count: high },
  ];

  return (
    <div className="priority-bars" role="group" aria-label="Ticket priorities">
      {items.map(it => {
        const w = Math.round((it.count / total) * maxWidth);
        const pct = Math.round((it.count / total) * 100);
        return (
          <div key={it.key} className="priority-row">
            <div className="priority-label">{it.label}</div>
            <div className="priority-bar-wrap" aria-hidden="true">
              <svg width={maxWidth} height="14" viewBox={`0 0 ${maxWidth} 14`} preserveAspectRatio="none">
                <rect x="0" y="2" width={maxWidth} height="10" rx="5" fill="#f3f3f3" />
                <rect x="0" y="2" width={w} height="10" rx="5" fill={it.key === "high" ? "#f97316" : it.key === "medium" ? "#f59e0b" : "#60a5fa"} />
              </svg>
            </div>
            <div className="priority-count" aria-label={`${it.label} ${it.count}`}>{it.count} ({pct}%)</div>
          </div>
        );
      })}
    </div>
  );
}

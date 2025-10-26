import React from "react";

/**
 * data: { open: number, "in-progress": number, closed: number }
 * Renders a simple SVG donut (pie) chart.
 */
export default function StatusDonut({ data }) {
  const open = data.open || 0;
  const inProgress = data["in-progress"] || 0;
  const closed = data.closed || 0;
  const total = open + inProgress + closed || 1;

  // helper to create arc lengths based on percentages
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  // compute stroke-dasharray values for each segment
  const openPct = open / total;
  const inPct = inProgress / total;
  const closedPct = closed / total;

  // convert to dash lengths
  const openLen = openPct * circumference;
  const inLen = inPct * circumference;
  const closedLen = closedPct * circumference;

  // We will stack segments by offsetting strokeDashoffset
  let offset = 0;

  const segments = [
    { key: "open", value: openLen, color: "#60a5fa", label: `Open (${open})` },
    { key: "in-progress", value: inLen, color: "#f59e0b", label: `In progress (${inProgress})` },
    { key: "closed", value: closedLen, color: "#9CA3AF", label: `Closed (${closed})` },
  ];

  return (
    <div className="status-donut" role="img" aria-label={`Status breakdown: open ${open}, in progress ${inProgress}, closed ${closed}`}>
      <svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">
        <g transform="translate(70,70)">
          {/* background circle (light) */}
          <circle r={radius} fill="none" stroke="#f3f4f6" strokeWidth="20" />
          {segments.map((seg, i) => {
            const dash = `${seg.value} ${circumference - seg.value}`;
            // strokeDashoffset is negative offset from circle start; we rotate -90deg to start at top
            const dashOffset = -offset;
            offset += seg.value;
            return (
              <circle
                key={seg.key}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="20"
                strokeDasharray={dash}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt"
                transform="rotate(-90)"
              />
            );
          })}
        </g>
      </svg>

      <div className="donut-legend">
        <div><span className="dot" style={{background:"#60a5fa"}}></span> Open ({open})</div>
        <div><span className="dot" style={{background:"#f59e0b"}}></span> In progress ({inProgress})</div>
        <div><span className="dot" style={{background:"#9CA3AF"}}></span> Closed ({closed})</div>
      </div>
    </div>
  );
}

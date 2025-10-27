/* Enhanced stats card with better visual hierarchy and animation */
export default function StatsCard({ label, value, icon }) {
  return (
    <div className="stat-card" role="status" aria-label={`${label}: ${value}`}>
      {icon && (
        <div className="stat-icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

import { anxietyDimensions } from '../data/researchData.js';

function getBadgeClass(interp) {
  const map = { 'Very High': 'badge-veryhigh', 'High': 'badge-high', 'Moderate': 'badge-moderate', 'Low': 'badge-low', 'Agree': 'badge-agree', 'Disagree': 'badge-disagree', 'Strongly Agree': 'badge-agree', 'Strongly Disagree': 'badge-disagree' };
  return map[interp] || 'badge-moderate';
}
function getBarColor(interp) {
  const map = { 'Very High': 'var(--high)', 'High': 'var(--high)', 'Moderate': 'var(--moderate)' };
  return map[interp] || 'var(--moderate)';
}

export default function KpiCards() {
  return (
    <div className="kpi-row">
      {anxietyDimensions.map(d => (
        <div className="kpi-card" key={d.id}>
          <span className="kpi-label">{d.shortLabel}</span>
          <span className="kpi-value" style={{ color: d.interpretation === 'High' ? 'var(--high)' : 'var(--moderate)' }}>
            {d.wm.toFixed(2)}
          </span>
          <span className={`kpi-badge ${getBadgeClass(d.interpretation)}`}>{d.interpretation}</span>
          <div className="kpi-bar-track">
            <div
              className="kpi-bar-fill"
              style={{ width: `${(d.wm / 4) * 100}%`, background: getBarColor(d.interpretation) }}
            />
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>of 4.00 scale</span>
        </div>
      ))}
    </div>
  );
}

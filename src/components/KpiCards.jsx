import { anxietyDimensions, predictorRanking } from '../data/researchData.js';
import { Users, Activity, Lightbulb } from 'lucide-react';

function getColorVariable(interp) {
  const map = { 'Very High': 'var(--high)', 'High': 'var(--high)', 'Moderate': 'var(--moderate)', 'Agree': 'var(--agree)', 'Disagree': 'var(--disagree)', 'Low': 'var(--low)', 'Strongly Agree': 'var(--agree)', 'Strongly Disagree': 'var(--disagree)' };
  return map[interp] || 'var(--text-primary)';
}

function getBadgeClass(interp) {
  const map = { 'Very High': 'badge-veryhigh', 'High': 'badge-high', 'Moderate': 'badge-moderate', 'Low': 'badge-low', 'Agree': 'badge-agree', 'Disagree': 'badge-disagree', 'Strongly Agree': 'badge-agree', 'Strongly Disagree': 'badge-disagree' };
  return map[interp] || 'badge-moderate';
}

export default function KpiCards() {
  const highestAnxiety = [...anxietyDimensions].sort((a, b) => b.wm - a.wm)[0];
  const topFactor = predictorRanking[0];
  
  return (
    <div className="kpi-row">
      {/* 1. Total Students */}
      <div className="kpi-card">
        <span className="kpi-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          Total Students <Users size={16} />
        </span>
        <div className="kpi-val-row" style={{ marginTop: 'auto' }}>
          <span className="kpi-value" style={{ color: 'var(--text-primary)', fontSize: '42px', letterSpacing: '-0.04em' }}>
            237
          </span>
        </div>
        <span className="kpi-footer">Total Grade 12 Respondents</span>
      </div>

      {/* 2. Highest Anxiety Type */}
      <div className="kpi-card">
        <span className="kpi-label" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={16} /> Highest Anxiety
          </span>
          <strong style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.3 }}>{highestAnxiety.label}</strong>
        </span>
        <div className="kpi-val-row">
          <span className="kpi-value" style={{ color: getColorVariable(highestAnxiety.interpretation) }}>
            {highestAnxiety.wm.toFixed(2)}
          </span>
          <span className={`kpi-badge ${getBadgeClass(highestAnxiety.interpretation)}`}>
            {highestAnxiety.interpretation}
          </span>
        </div>
        <span className="kpi-footer">scale of 4.00</span>
      </div>

      {/* 3. Top Influencing Factor */}
      <div className="kpi-card">
        <span className="kpi-label" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lightbulb size={16} /> Top Influencing Factor
          </span>
          <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{topFactor.label}</strong>
        </span>
        <div className="kpi-val-row">
          <span className="kpi-value" style={{ color: getColorVariable(topFactor.interpretation) }}>
            {topFactor.wm.toFixed(2)}
          </span>
          <span className={`kpi-badge ${getBadgeClass(topFactor.interpretation)}`}>
            {topFactor.interpretation}
          </span>
        </div>
        <span className="kpi-footer">scale of 4.00</span>
      </div>
    </div>
  );
}

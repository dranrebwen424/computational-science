import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { anxietyDimensions, predictorRanking } from '../data/researchData.js';
import { Users, Activity, Lightbulb } from 'lucide-react';

function getColorVariable(interp) {
  const map = {
    'Very High': 'var(--high)', 'High': 'var(--high)',
    'Moderate': 'var(--moderate)', 'Agree': 'var(--agree)',
    'Disagree': 'var(--disagree)', 'Low': 'var(--low)',
  };
  return map[interp] || 'var(--text-primary)';
}

function getBadgeClass(interp) {
  const map = {
    'Very High': 'badge-veryhigh', 'High': 'badge-high',
    'Moderate': 'badge-moderate', 'Low': 'badge-low',
    'Agree': 'badge-agree', 'Disagree': 'badge-disagree',
  };
  return map[interp] || 'badge-moderate';
}

/** Animated number ticker — counts up from 0 to target */
function TickerNumber({ target, decimals = 0, style = {} }) {
  const elRef = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.6,
      delay: 0.4,
      ease: 'power3.out',
      onUpdate: () => {
        if (elRef.current) {
          elRef.current.textContent = obj.val.toFixed(decimals);
        }
      },
    });
  }, [target, decimals]);

  return (
    <span ref={elRef} style={style}>
      {(0).toFixed(decimals)}
    </span>
  );
}

export default function KpiCards() {
  const highestAnxiety = [...anxietyDimensions].sort((a, b) => b.wm - a.wm)[0];
  const topFactor = predictorRanking[0];

  return (
    <div className="kpi-row">

      {/* 1. Total Students */}
      <div className="kpi-card">
        <span className="kpi-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          Total Students <Users size={15} />
        </span>
        <div className="kpi-val-row" style={{ marginTop: 'auto' }}>
          <TickerNumber
            target={237}
            decimals={0}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '44px',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}
          />
        </div>
        <span className="kpi-footer">Grade 12 Respondents</span>
      </div>

      {/* 2. Highest Anxiety Type */}
      <div className="kpi-card">
        <span className="kpi-label" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={15} /> Highest Anxiety
          </span>
          <strong style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.3, fontWeight: 600 }}>
            {highestAnxiety.label}
          </strong>
        </span>
        <div className="kpi-val-row">
          <TickerNumber
            target={highestAnxiety.wm}
            decimals={2}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: getColorVariable(highestAnxiety.interpretation),
              lineHeight: 1,
            }}
          />
          <span className={`kpi-badge ${getBadgeClass(highestAnxiety.interpretation)}`}>
            {highestAnxiety.interpretation}
          </span>
        </div>
        <span className="kpi-footer">on a scale of 4.00</span>
      </div>

      {/* 3. Top Influencing Factor */}
      <div className="kpi-card">
        <span className="kpi-label" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lightbulb size={15} /> Top Influencing Factor
          </span>
          <strong style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>
            {topFactor.label}
          </strong>
        </span>
        <div className="kpi-val-row">
          <TickerNumber
            target={topFactor.wm}
            decimals={2}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: getColorVariable(topFactor.interpretation),
              lineHeight: 1,
            }}
          />
          <span className={`kpi-badge ${getBadgeClass(topFactor.interpretation)}`}>
            {topFactor.interpretation}
          </span>
        </div>
        <span className="kpi-footer">on a scale of 4.00</span>
      </div>

    </div>
  );
}

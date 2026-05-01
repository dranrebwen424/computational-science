import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const BADGE = {
  High: 'badge-high', Moderate: 'badge-moderate',
  Agree: 'badge-agree', Disagree: 'badge-disagree',
  'Very High': 'badge-veryhigh', 'Strongly Agree': 'badge-agree',
  'Strongly Disagree': 'badge-disagree', Low: 'badge-low',
};

// Bar representing a WM visually inside the panel
function MiniBar({ wm, interp }) {
  const colorMap = {
    High: 'var(--high)', Moderate: 'var(--moderate)',
    Agree: 'var(--agree)', Disagree: 'var(--disagree)',
    'Very High': '#fb7185', 'Strongly Agree': '#60a5fa',
    'Strongly Disagree': '#94a3b8', Low: '#4ade80',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
      <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${(wm / 4) * 100}%`, height: '100%', background: colorMap[interp] || 'var(--accent)', borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', minWidth: 30 }}>{wm.toFixed(2)}</span>
    </div>
  );
}

export default function RawDataPanel({ table, onClose }) {
  const panelRef = useRef();
  
  // Close on Escape key
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const { contextSafe } = useGSAP(() => {
    // Entrance animations
    gsap.from(panelRef.current, {
      x: '100%',
      duration: 0.6,
      ease: 'power4.out'
    });
    
    gsap.from('.panel-backdrop', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    gsap.from('.raw-indicator-row', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out',
      delay: 0.2
    });
  }, { scope: panelRef });

  const handleClose = contextSafe(() => {
    // Exit animations
    gsap.to('.panel-backdrop', { opacity: 0, duration: 0.3 });
    gsap.to(panelRef.current, {
      x: '100%',
      duration: 0.4,
      ease: 'power3.in',
      onComplete: onClose
    });
  });

  const isAnxiety = table.scaleType === 'anxiety';
  const scaleNote = isAnxiety
    ? 'Scale: 1.00–1.74 = Low · 1.75–2.49 = Moderate · 2.50–3.24 = High · 3.35–4.00 = Very High'
    : 'Scale: 1.00–1.74 = Strongly Disagree · 1.75–2.49 = Disagree · 2.50–3.24 = Agree · 3.35–4.00 = Strongly Agree';

  return (
    <>
      {/* Backdrop */}
      <div className="panel-backdrop" onClick={handleClose} />

      {/* Slide-in panel */}
      <aside className="raw-panel" ref={panelRef}>
        {/* Panel header */}
        <div className="raw-panel-header">
          <div>
            <div className="raw-panel-title">{table.fullTitle}</div>
            <div className="raw-panel-subtitle">
              {isAnxiety ? 'Anxiety Dimension' : 'Predictor Variable'} · Raw Indicator Data
            </div>
          </div>
          <button className="modal-close" onClick={handleClose} aria-label="Close panel">✕</button>
        </div>

        {/* Overall WM summary */}
        <div className="raw-panel-summary">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              {table.overallWM.toFixed(2)}
            </span>
            <span className={`kpi-badge ${BADGE[table.overallInterpretation] || ''}`}>
              {table.overallInterpretation}
            </span>
          </div>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Overall Weighted Mean (n = 237)</span>
          <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}>
            <div style={{
              width: `${(table.overallWM / 4) * 100}%`, height: '100%', borderRadius: 3,
              background: isAnxiety ? (table.overallInterpretation === 'High' ? 'var(--high)' : 'var(--moderate)') : (table.overallInterpretation === 'Agree' ? 'var(--agree)' : 'var(--disagree)'),
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>
            <span>1.00</span><span>2.00</span><span>3.00</span><span>4.00</span>
          </div>
        </div>

        {/* Indicator table */}
        <div className="raw-panel-body">
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Survey Indicators
          </div>
          {table.indicators.map((ind, i) => (
            <div key={i} className="raw-indicator-row">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', minWidth: 22 }}>Q{i + 1}</span>
                <span className={`kpi-badge ${BADGE[ind.interpretation] || ''}`} style={{ fontSize: 9, flexShrink: 0 }}>
                  {ind.interpretation}
                </span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-primary)', lineHeight: 1.5, margin: '0 0 6px', paddingLeft: 4 }}>
                {ind.shortText}
              </p>
              <MiniBar wm={ind.wm} interp={ind.interpretation} />
            </div>
          ))}
        </div>

        {/* Scale reference */}
        <div className="raw-panel-footer">
          <div style={{ fontSize: 9.5, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            📏 {scaleNote}
          </div>
          <div style={{ fontSize: 9.5, color: 'var(--text-muted)', marginTop: 4 }}>
            Source: {isAnxiety ? 'Chapter 4 — Level of English Language Anxiety' : 'Chapter 4 — Degree of Existence of Predictors'}, <em>researh.md</em>
          </div>
        </div>
      </aside>
    </>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const BADGE = {
  High: 'badge-high', Moderate: 'badge-moderate',
  Agree: 'badge-agree', Disagree: 'badge-disagree',
  'Very High': 'badge-veryhigh', 'Strongly Agree': 'badge-agree',
  'Strongly Disagree': 'badge-disagree', Low: 'badge-low',
};

const COLOR_MAP = {
  High: 'var(--high)', Moderate: 'var(--moderate)',
  Agree: 'var(--agree)', Disagree: 'var(--disagree)',
  'Very High': 'var(--high)', Low: 'var(--low)',
};

const SCALE_LABELS = { 1: 'Never', 2: 'Rarely', 3: 'Often', 4: 'Always' };

function FrequencyBar({ freq, color }) {
  if (!freq) return null;
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, fontWeight: 500, letterSpacing: '0.04em' }}>
        RESPONSE DISTRIBUTION (n = 237)
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 40 }}>
        {[1, 2, 3, 4].map(k => (
          <div key={k} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--text-secondary)' }}>{freq[k]}%</span>
            <div style={{
              width: '100%',
              height: `${Math.max(4, (freq[k] / 50) * 28)}px`,
              background: k >= 3 ? color : 'var(--border)',
              borderRadius: '3px 3px 0 0',
              opacity: k >= 3 ? 0.85 : 0.5,
              transition: 'height 0.6s ease'
            }} />
            <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{SCALE_LABELS[k]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniBar({ wm, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
      <div style={{ flex: 1, height: 5, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          width: `${(wm / 4) * 100}%`, height: '100%',
          background: color, borderRadius: 99,
          transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', minWidth: 32, textAlign: 'right' }}>
        {wm.toFixed(2)}
      </span>
    </div>
  );
}

export default function RawDataPanel({ table, onClose }) {
  const panelRef = useRef();

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const { contextSafe } = useGSAP(() => {
    gsap.from(panelRef.current, { x: '100%', duration: 0.55, ease: 'power4.out' });
    gsap.from('.panel-backdrop', { opacity: 0, duration: 0.35, ease: 'power2.out' });
    gsap.from('.rdp-indicator', {
      y: 16, opacity: 0, duration: 0.5, stagger: 0.06,
      ease: 'power2.out', delay: 0.2
    });
  }, { scope: panelRef });

  const handleClose = contextSafe(() => {
    gsap.to('.panel-backdrop', { opacity: 0, duration: 0.25 });
    gsap.to(panelRef.current, { x: '100%', duration: 0.4, ease: 'power3.in', onComplete: onClose });
  });

  const isAnxiety = table.scaleType === 'anxiety';
  const accentColor = isAnxiety
    ? (table.overallInterpretation === 'High' ? 'var(--high)' : 'var(--moderate)')
    : (table.overallInterpretation === 'Agree' ? 'var(--agree)' : 'var(--disagree)');

  return (
    <>
      <div className="panel-backdrop" onClick={handleClose} />

      <aside ref={panelRef} style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 160,
        width: 480, maxWidth: '95vw',
        background: '#FFFFFF',
        borderLeft: '1px solid rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.08)',
        fontFamily: 'var(--font-body)',
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: '28px 32px 20px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          background: '#FAFAFA',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                View Detailed Data
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.25 }}>
                {table.fullTitle}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                {isAnxiety ? 'Anxiety Dimension' : 'Predictor Variable'} · 5 survey indicators · n = 237
              </div>
            </div>
            <button
              onClick={handleClose}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', flexShrink: 0
              }}
              aria-label="Close"
            >✕</button>
          </div>
        </div>

        {/* ── Overall Summary ── */}
        <div style={{
          padding: '20px 32px',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          background: '#F7F8FA',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div>
              <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {table.overallWM.toFixed(2)}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>Overall Weighted Mean</div>
            </div>
            <div>
              <span className={`kpi-badge ${BADGE[table.overallInterpretation] || ''}`} style={{ fontSize: 11 }}>
                {table.overallInterpretation}
              </span>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>
                {isAnxiety ? 'on a 4-point anxiety scale' : 'on a 4-point agreement scale'}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, height: 6, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
              width: `${(table.overallWM / 4) * 100}%`, height: '100%',
              background: accentColor, borderRadius: 99,
              transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)', marginTop: 3 }}>
            <span>1.00</span><span>2.00</span><span>3.00</span><span>4.00</span>
          </div>
        </div>

        {/* ── Indicator List ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Survey Indicators
          </div>

          {table.indicators.map((ind, i) => {
            const c = COLOR_MAP[ind.interpretation] || 'var(--accent)';
            return (
              <div key={i} className="rdp-indicator" style={{
                background: '#F9FAFB',
                borderRadius: 16,
                padding: '18px 20px',
                border: '1px solid rgba(0,0,0,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 8,
                      background: c, color: '#fff',
                      fontSize: 10, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {i + 1}
                    </span>
                  </div>
                  <span className={`kpi-badge ${BADGE[ind.interpretation] || ''}`} style={{ fontSize: 9, flexShrink: 0 }}>
                    {ind.interpretation}
                  </span>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6, margin: '0 0 4px' }}>
                  {ind.fullText || ind.shortText}
                </p>

                <MiniBar wm={ind.wm} color={c} />
                {ind.freq && <FrequencyBar freq={ind.freq} color={c} />}
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: '16px 32px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          background: '#FAFAFA',
          fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.7
        }}>
          <div>
            📏 {isAnxiety
              ? 'Scale: 1.00–1.74 Low · 1.75–2.49 Moderate · 2.50–3.24 High · 3.35–4.00 Very High'
              : 'Scale: 1.00–1.74 Strongly Disagree · 1.75–2.49 Disagree · 2.50–3.24 Agree · 3.35–4.00 Strongly Agree'}
          </div>
          <div style={{ marginTop: 2 }}>
            Source: Chapter 4 · <em>Research Questionnaire, Doloeras et al. 2025–2026</em>
          </div>
        </div>
      </aside>
    </>
  );
}

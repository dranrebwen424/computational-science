const BADGE_COLOR = {
  High:       { bg: 'rgba(239,68,68,0.12)',   text: '#dc2626' },
  Moderate:   { bg: 'rgba(245,158,11,0.12)',  text: '#d97706' },
  Agree:      { bg: 'rgba(59,130,246,0.12)',  text: '#2563eb' },
  Disagree:   { bg: 'rgba(107,114,128,0.12)', text: '#6b7280' },
  'Very High':{ bg: 'rgba(239,68,68,0.15)',  text: '#dc2626' },
  Low:        { bg: 'rgba(16,185,129,0.12)',  text: '#059669' },
};

export function GlassTooltip({ active, payload, labelKey = 'name' }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const wm = d.wm?.toFixed(2) ?? d.value?.toFixed(2);
  const interp = d.interpretation;
  const label = d[labelKey] ?? d.name ?? d.label ?? '';
  const badge = BADGE_COLOR[interp] || BADGE_COLOR['Disagree'];

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: 14,
      padding: '12px 18px',
      minWidth: 160,
      maxWidth: 240,
      boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
      fontFamily: 'var(--font-body)',
      pointerEvents: 'none',
    }}>
      {/* Label */}
      <div style={{
        fontSize: 12, color: 'rgba(0,0,0,0.45)',
        fontWeight: 500, lineHeight: 1.4,
        marginBottom: 7,
        whiteSpace: 'normal',
      }}>
        {label}
      </div>

      {/* Value + Badge inline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <span style={{
          fontSize: 26, fontWeight: 700,
          color: '#111',
          letterSpacing: '-0.03em', lineHeight: 1,
        }}>
          {wm}
        </span>
        {interp && (
          <span style={{
            fontSize: 10, fontWeight: 700,
            background: badge.bg, color: badge.text,
            padding: '3px 9px', borderRadius: 99,
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            {interp}
          </span>
        )}
      </div>
    </div>
  );
}

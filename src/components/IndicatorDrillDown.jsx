import { useState } from 'react';
import { allTables } from '../data/researchData.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell
} from 'recharts';

function getBarColor(interp) {
  const map = { High: 'var(--high)', Moderate: 'var(--moderate)', Agree: 'var(--agree)', Disagree: 'var(--disagree)', 'Very High': '#fb7185' };
  return map[interp] || 'var(--accent)';
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const cls = { High: 'badge-high', Moderate: 'badge-moderate', Agree: 'badge-agree', Disagree: 'badge-disagree' };
  return (
    <div className="custom-tooltip">
      <div className="ct-label" style={{ whiteSpace: 'normal', lineHeight: 1.4 }}>{d.fullText}</div>
      <div className="ct-value">{d.wm.toFixed(2)}</div>
      <div className={`ct-interp ${cls[d.interpretation] || ''}`} style={{ display: 'inline-block', padding: '2px 7px', borderRadius: 4, marginTop: 4 }}>
        {d.interpretation}
      </div>
      <div style={{ marginTop: 5, fontSize: 10, color: 'var(--teal)' }}>🖱 Click bar to view full table data</div>
    </div>
  );
}

export default function IndicatorDrillDown({ showRefLines, onBarClick }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const table = allTables[activeIdx];
  const chartData = table.indicators.map((ind, i) => ({
    name: `Q${i + 1}`,
    fullText: ind.shortText,
    wm: ind.wm,
    interpretation: ind.interpretation,
  }));
  const isAnxiety = table.scaleType === 'anxiety';

  const handleClick = (data) => {
    if (data?.activePayload?.[0]) onBarClick(table);
  };

  return (
    <div className="card" style={{ flex: 1 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Indicator Drill-Down — {table.fullTitle}</div>
          <div className="card-subtitle">
            Overall WM: <strong style={{ color: 'var(--text-primary)' }}>{table.overallWM.toFixed(2)}</strong>
            &nbsp;·&nbsp;{table.overallInterpretation}
          </div>
          <div className="chart-clickable-hint">🖱 Click any bar to view full table data</div>
        </div>
      </div>
      <div className="tab-row">
        {allTables.map((t, i) => (
          <button key={i} className={`tab-btn ${activeIdx === i ? 'active' : ''}`} onClick={() => setActiveIdx(i)}>
            {t.title}
          </button>
        ))}
      </div>
      <div className="chart-wrap" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 4, right: 10, left: -10, bottom: 0 }}
            onClick={handleClick} style={{ cursor: 'pointer' }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3e" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#9da3b4', fontSize: 10 }} />
            <YAxis domain={[0, 4]} tickCount={9} tick={{ fill: '#9da3b4', fontSize: 10 }} tickFormatter={v => v.toFixed(2)} />
            <Tooltip content={<CustomTooltip />} />
            {showRefLines && isAnxiety && <>
              <ReferenceLine y={1.75} stroke="#4b5563" strokeDasharray="4 2" />
              <ReferenceLine y={2.50} stroke="#6366f1" strokeDasharray="4 2" />
              <ReferenceLine y={3.35} stroke="#ef4444" strokeDasharray="4 2" />
            </>}
            {showRefLines && !isAnxiety && <>
              <ReferenceLine y={1.75} stroke="#4b5563" strokeDasharray="4 2" />
              <ReferenceLine y={2.50} stroke="#6366f1" strokeDasharray="4 2" />
            </>}
            <Bar dataKey="wm" radius={[4, 4, 0, 0]} maxBarSize={48}
              label={{ position: 'top', fill: '#9da3b4', fontSize: 9, formatter: v => v.toFixed(2) }}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={getBarColor(entry.interpretation)} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ fontSize: '10px', color: 'var(--text-muted)', paddingTop: '2px' }}>
        {table.indicators.map((ind, i) => (
          <span key={i} style={{ display: 'block', lineHeight: 1.5 }}>
            <strong>Q{i + 1}:</strong> {ind.shortText}
          </span>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { allTables } from '../data/researchData.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell
} from 'recharts';

function getBarColor(interp) {
  const map = { High: 'var(--high)', Moderate: 'var(--moderate)', Agree: 'var(--agree)', Disagree: 'var(--disagree)', 'Very High': 'var(--high)' };
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
      <div className="card-header" style={{ flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="card-title">Top Anxiety Triggers</div>
        </div>
        <select 
          value={activeIdx} 
          onChange={(e) => setActiveIdx(Number(e.target.value))}
          style={{
            padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border)',
            background: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: '12px',
            fontFamily: 'var(--font-body)', outline: 'none', cursor: 'pointer'
          }}
        >
          {allTables.map((t, i) => (
            <option key={i} value={i}>{t.fullTitle || t.title}</option>
          ))}
        </select>
      </div>
      <div className="chart-wrap" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 12, right: 10, left: -10, bottom: 0 }}
            onClick={handleClick} style={{ cursor: 'pointer' }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-body)' }} />
            <YAxis domain={[0, 4]} tickCount={9} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickFormatter={v => v.toFixed(2)} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--surface-2)' }} />
            {showRefLines && isAnxiety && <>
              <ReferenceLine y={1.75} stroke="var(--text-muted)" strokeDasharray="4 2" />
              <ReferenceLine y={2.50} stroke="var(--accent)" strokeDasharray="4 2" />
              <ReferenceLine y={3.35} stroke="var(--high)" strokeDasharray="4 2" />
            </>}
            {showRefLines && !isAnxiety && <>
              <ReferenceLine y={1.75} stroke="var(--text-muted)" strokeDasharray="4 2" />
              <ReferenceLine y={2.50} stroke="var(--accent)" strokeDasharray="4 2" />
            </>}
            <Bar dataKey="wm" radius={[4, 4, 0, 0]} maxBarSize={48}
              label={{ position: 'top', fill: 'var(--text-primary)', fontSize: 10, fontWeight: 600, formatter: v => v.toFixed(2) }}>
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

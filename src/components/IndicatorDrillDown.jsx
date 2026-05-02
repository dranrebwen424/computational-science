import { useState } from 'react';
import { allTables } from '../data/researchData.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell
} from 'recharts';
import { GlassTooltip } from './GlassTooltip.jsx';

function getBarColor(interp) {
  const map = { High: 'var(--high)', Moderate: 'var(--moderate)', Agree: 'var(--agree)', Disagree: 'var(--disagree)', 'Very High': 'var(--high)' };
  return map[interp] || 'var(--accent)';
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
          className="premium-select"
          value={activeIdx} 
          onChange={(e) => setActiveIdx(Number(e.target.value))}
        >
          {allTables.map((t, i) => (
            <option key={i} value={i}>{t.fullTitle || t.title}</option>
          ))}
        </select>
      </div>
      <div className="chart-wrap" style={{ height: 200 }}>
        <div style={{ minWidth: 500, height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 12, right: 10, left: -10, bottom: 0 }}
              onClick={handleClick} style={{ cursor: 'pointer' }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-body)' }} />
            <YAxis domain={[0, 4]} tickCount={9} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickFormatter={v => v.toFixed(2)} />
            <Tooltip content={(props) => <GlassTooltip {...props} direction="bottom" labelKey="fullText" />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
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

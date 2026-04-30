import { anxietyDimensions, predictorVariables, allTables } from '../data/researchData.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';

const chartData = [
  ...anxietyDimensions.map(d => ({ name: d.shortLabel, wm: d.wm, interpretation: d.interpretation, type: 'anxiety', tableKey: d.tableKey })),
  ...predictorVariables.map(d => ({ name: d.shortLabel, wm: d.wm, interpretation: d.interpretation, type: 'predictor', tableKey: d.tableKey })),
];

function getBarColor(entry) {
  if (entry.type === 'anxiety') {
    return entry.interpretation === 'High' ? 'var(--high)' : 'var(--moderate)';
  }
  return entry.interpretation === 'Agree' ? 'var(--agree)' : 'var(--disagree)';
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const cls = { High: 'badge-high', Moderate: 'badge-moderate', Agree: 'badge-agree', Disagree: 'badge-disagree' };
  return (
    <div className="custom-tooltip">
      <div className="ct-label">{d.name}</div>
      <div className="ct-value">{d.wm.toFixed(2)}</div>
      <div className={`ct-interp ${cls[d.interpretation] || ''}`} style={{ display: 'inline-block', padding: '2px 7px', borderRadius: 4, marginTop: 4 }}>
        {d.interpretation}
      </div>
      <div className="ct-note" style={{ marginTop: 5 }}>
        {d.type === 'anxiety' ? 'Anxiety dimension · 1.75=Mod · 2.50=High · 3.35=V.High' : 'Predictor · 1.75=Disagree · 2.50=Agree'}
      </div>
      <div style={{ marginTop: 5, fontSize: 10, color: 'var(--teal)' }}>🖱 Click to view raw indicator data</div>
    </div>
  );
}

export default function AnxietyOverviewChart({ showRefLines, onBarClick }) {
  const handleClick = (data) => {
    if (data?.activePayload?.[0]?.payload?.tableKey !== undefined) {
      onBarClick(allTables[data.activePayload[0].payload.tableKey]);
    }
  };

  return (
    <div className="card" style={{ flex: 1 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Anxiety Dimensions & Predictor Variables — Overview</div>
          <div className="card-subtitle">Weighted means on a 4-point Likert scale (n = 237)</div>
          <div className="chart-clickable-hint">🖱 Click any bar to view raw indicator data</div>
        </div>
        <div className="legend">
          <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--high)' }} />High</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--moderate)' }} />Moderate</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--agree)' }} />Agree</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--disagree)' }} />Disagree</span>
        </div>
      </div>
      <div className="chart-wrap" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
            barCategoryGap="20%" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3e" horizontal={false} />
            <XAxis type="number" domain={[0, 4]} tickCount={9} tick={{ fill: '#9da3b4', fontSize: 10 }} tickFormatter={v => v.toFixed(2)} />
            <YAxis type="category" dataKey="name" width={105} tick={{ fill: '#9da3b4', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            {showRefLines && <>
              <ReferenceLine x={1.75} stroke="#4b5563" strokeDasharray="4 2" label={{ value: 'Mod.', position: 'top', fill: '#6b7280', fontSize: 9 }} />
              <ReferenceLine x={2.50} stroke="#6366f1" strokeDasharray="4 2" label={{ value: 'High/Agree', position: 'top', fill: '#8b5cf6', fontSize: 9 }} />
              <ReferenceLine x={3.35} stroke="#ef4444" strokeDasharray="4 2" label={{ value: 'V.High', position: 'top', fill: '#ef4444', fontSize: 9 }} />
            </>}
            <Bar dataKey="wm" radius={[0, 4, 4, 0]} maxBarSize={18}
              label={{ position: 'right', fill: '#9da3b4', fontSize: 10, formatter: v => v.toFixed(2) }}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={getBarColor(entry)} fillOpacity={0.9} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

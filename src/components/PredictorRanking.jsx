import { predictorRanking, allTables } from '../data/researchData.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';

const chartData = [...predictorRanking].sort((a, b) => a.wm - b.wm); // ascending for horizontal

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="custom-tooltip">
      <div className="ct-label">#{d.rank} — {d.label}</div>
      <div className="ct-value">{d.wm.toFixed(2)}</div>
      <div className={`ct-interp ${d.interpretation === 'Agree' ? 'badge-agree' : 'badge-disagree'}`}
        style={{ display: 'inline-block', padding: '2px 7px', borderRadius: 4, marginTop: 4 }}>
        {d.interpretation}
      </div>
      {d.isTop && <div className="ct-note" style={{ marginTop: 5, color: 'var(--teal)' }}>★ Strongest predictor of language anxiety</div>}
      <div style={{ marginTop: 5, fontSize: 10, color: 'var(--teal)' }}>🖱 Click to view raw indicator data</div>
    </div>
  );
}

export default function PredictorRanking({ showRefLines, onBarClick }) {
  const handleClick = (data) => {
    if (data?.activePayload?.[0]?.payload?.tableKey !== undefined) {
      onBarClick(allTables[data.activePayload[0].payload.tableKey]);
    }
  };

  return (
    <div className="card" style={{ flex: 1 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Major Predictors of Language Anxiety (Ranked)</div>
          <div className="card-subtitle">By overall weighted mean · n = 237</div>
          <div className="chart-clickable-hint">🖱 Click any bar to view raw indicator data</div>
        </div>
      </div>
      <div className="chart-wrap" style={{ height: 185 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 50, left: 10, bottom: 0 }}
            onClick={handleClick} style={{ cursor: 'pointer' }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3e" horizontal={false} />
            <XAxis type="number" domain={[2.0, 3.0]} tickCount={5} tick={{ fill: '#9da3b4', fontSize: 10 }} tickFormatter={v => v.toFixed(2)} />
            <YAxis type="category" dataKey="label" width={110} tick={{ fill: '#9da3b4', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            {showRefLines && <ReferenceLine x={2.50} stroke="#6366f1" strokeDasharray="4 2" label={{ value: 'Agree ↑', position: 'top', fill: '#8b5cf6', fontSize: 9 }} />}
            <Bar dataKey="wm" radius={[0, 4, 4, 0]} maxBarSize={22}
              label={{ position: 'right', fill: '#9da3b4', fontSize: 10, formatter: v => v.toFixed(2) }}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.isTop ? 'var(--teal)' : entry.interpretation === 'Agree' ? 'var(--agree)' : 'var(--disagree)'} fillOpacity={0.9} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--teal)' }} />Top Predictor</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--agree)' }} />Agree</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--disagree)' }} />Disagree</span>
      </div>
    </div>
  );
}

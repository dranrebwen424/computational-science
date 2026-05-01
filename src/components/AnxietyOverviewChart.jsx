import { anxietyDimensions, predictorVariables, allTables } from '../data/researchData.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';

const chartData = [
  ...anxietyDimensions.map(d => ({ name: d.label, wm: d.wm, interpretation: d.interpretation, type: 'anxiety', tableKey: d.tableKey })),
  ...predictorVariables.map(d => ({ name: d.label, wm: d.wm, interpretation: d.interpretation, type: 'predictor', tableKey: d.tableKey })),
];

function getBarColor(entry) {
  if (entry.type === 'anxiety') {
    return entry.interpretation === 'High' ? 'var(--high)' : 'var(--moderate)';
  }
  return entry.interpretation === 'Agree' ? 'var(--agree)' : 'var(--disagree)';
}

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <foreignObject x={x - 140} y={y - 18} width={130} height={36}>
      <div xmlns="http://www.w3.org/1999/xhtml" style={{ 
        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        textAlign: 'right', fontSize: '11px', color: 'var(--text-secondary)', 
        fontFamily: 'var(--font-body)', lineHeight: 1.3, wordWrap: 'break-word', paddingRight: '4px'
      }}>
        {payload.value}
      </div>
    </foreignObject>
  );
};



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
    <div className="card" style={{ flex: 2 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Which Type of Anxiety is the Highest?</div>
        </div>
        <div className="legend">
          <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--high)' }} />High</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--moderate)' }} />Moderate</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--agree)' }} />Agree</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--disagree)' }} />Disagree</span>
        </div>
      </div>
      <div className="chart-wrap" style={{ minHeight: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
            barCategoryGap="15%" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" domain={[0, 4]} tickCount={9} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickFormatter={v => v.toFixed(2)} />
            <YAxis type="category" dataKey="name" width={140} tick={<CustomYAxisTick />} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--surface-2)' }} />
            {showRefLines && <>
              <ReferenceLine x={1.75} stroke="var(--text-muted)" strokeDasharray="4 2" label={{ value: 'Mod.', position: 'top', fill: 'var(--text-muted)', fontSize: 9 }} />
              <ReferenceLine x={2.50} stroke="var(--accent)" strokeDasharray="4 2" label={{ value: 'High/Agree', position: 'top', fill: 'var(--accent)', fontSize: 9 }} />
              <ReferenceLine x={3.35} stroke="var(--high)" strokeDasharray="4 2" label={{ value: 'V.High', position: 'top', fill: 'var(--high)', fontSize: 9 }} />
            </>}
            <Bar dataKey="wm" radius={[0, 8, 8, 0]} maxBarSize={32}
              label={{ position: 'right', fill: 'var(--text-primary)', fontSize: 11, fontWeight: 600, formatter: v => v.toFixed(2) }}>
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

import { predictorRanking, allTables } from '../data/researchData.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';
import { GlassTooltip } from './GlassTooltip.jsx';

const chartData = [...predictorRanking].sort((a, b) => a.wm - b.wm); // ascending for horizontal

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <foreignObject x={x - 115} y={y - 18} width={110} height={36}>
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
          <div className="card-title">What Situation Causes the Most Anxiety?</div>
        </div>
      </div>
      <div className="chart-wrap" style={{ height: 260 }}>
        <div style={{ minWidth: 400, height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              onClick={handleClick} style={{ cursor: 'pointer' }} barCategoryGap="15%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" domain={[2.0, 3.0]} tickCount={5} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickFormatter={v => v.toFixed(2)} />
              <YAxis type="category" dataKey="label" width={115} tick={<CustomYAxisTick />} />
              <Tooltip content={(props) => <GlassTooltip {...props} direction="left" labelKey="label" />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
              {showRefLines && <ReferenceLine x={2.50} stroke="var(--accent)" strokeDasharray="4 2" label={{ value: 'Agree ↑', position: 'top', fill: 'var(--accent)', fontSize: 9 }} />}
              <Bar dataKey="wm" radius={[0, 8, 8, 0]} maxBarSize={32}
                label={{ position: 'right', fill: 'var(--text-primary)', fontSize: 11, fontWeight: 600, formatter: v => v.toFixed(2) }}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.isTop ? 'var(--teal)' : entry.interpretation === 'Agree' ? 'var(--agree)' : 'var(--disagree)'} fillOpacity={0.9} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="legend" style={{ marginTop: 12, justifyContent: 'center' }}>
        <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--teal)' }} />Top Predictor</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--agree)' }} />Agree</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--disagree)' }} />Disagree</span>
      </div>
    </div>
  );
}

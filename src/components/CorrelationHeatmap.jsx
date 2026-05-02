import { useState } from 'react';
import { correlationMatrix, allTables, correlationRowTableKeys, correlationColTableKeys } from '../data/researchData.js';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LabelList } from 'recharts';

const fullRowNames = {
  'comm': 'Communication Anxiety',
  'fear': 'Fear of Negative Evaluation',
  'test': 'Test Anxiety',
  'class': 'English Class Anxiety'
};
const fullColNames = {
  'conf': 'Self-Confidence',
  'prof': 'Language Proficiency',
  'peer': 'Peer Influence',
  'env':  'Classroom Environment'
};

function rToColor(r) {
  return r < 0 ? 'var(--teal)' : 'var(--high)';
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const isPos = d.rValue >= 0;
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: 14,
      padding: '12px 18px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
      fontFamily: 'var(--font-body)',
      minWidth: 160,
    }}>
      <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', marginBottom: 7, lineHeight: 1.4 }}>
        {d.y} × {d.x}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <span style={{ fontSize: 26, fontWeight: 700, color: '#111', letterSpacing: '-0.03em' }}>
          {d.rValue >= 0 ? '+' : ''}{d.rValue.toFixed(3)}
        </span>
        <span style={{
          fontSize: 10, fontWeight: 700,
          background: isPos ? 'rgba(239,68,68,0.12)' : 'rgba(42,106,100,0.12)',
          color: isPos ? '#dc2626' : '#0f766e',
          padding: '3px 9px', borderRadius: 99,
          textTransform: 'uppercase', letterSpacing: '0.05em'
        }}>
          {isPos ? 'Positive' : 'Negative'}
        </span>
      </div>
      <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)', marginTop: 4 }}>p = {d.p.toFixed(3)}</div>
    </div>
  );
}

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

const CustomXAxisTick = ({ x, y, payload }) => {
  return (
    <foreignObject x={x - 45} y={y + 8} width={90} height={50}>
      <div xmlns="http://www.w3.org/1999/xhtml" style={{ 
        width: '100%', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        textAlign: 'center', fontSize: '10px', color: 'var(--text-secondary)', 
        fontFamily: 'var(--font-body)', lineHeight: 1.3, wordWrap: 'break-word', overflow: 'hidden'
      }}>
        {payload.value}
      </div>
    </foreignObject>
  );
};

export default function CorrelationHeatmap({ onCellClick }) {
  const { rows, cols, cells } = correlationMatrix;
  const [selectedFilter, setSelectedFilter] = useState('all');

  const scatterData = [];
  rows.forEach((row, ri) => {
    if (selectedFilter !== 'all' && row.id !== selectedFilter) return;
    cols.forEach((col, ci) => {
      scatterData.push({
        x: fullColNames[col.id] || col.label,
        y: fullRowNames[row.id] || row.label,
        z: Math.max(0.1, Math.abs(cells[ri][ci].r)), 
        rValue: cells[ri][ci].r,
        p: cells[ri][ci].p,
        significant: cells[ri][ci].significant,
        ri, ci,
        rDisplay: cells[ri][ci].r > 0 ? `+${cells[ri][ci].r.toFixed(2)}` : cells[ri][ci].r.toFixed(2)
      });
    });
  });

  const handleClick = (data) => {
    if (data && data.payload) {
      const { ri, ci, rValue } = data.payload;
      onCellClick(allTables[correlationRowTableKeys[ri]], allTables[correlationColTableKeys[ci]], { r: rValue });
    }
  };

  return (
    <div className="card" style={{ flex: 1 }}>
      <div className="card-header" style={{ flexWrap: 'wrap', gap: 10, alignItems: 'flex-start' }}>
        <div>
          <div className="card-title">How are factors related to Anxiety?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '11.5px', fontWeight: 500, color: 'var(--text-secondary)', marginTop: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '3px', background: 'var(--high)' }} /> Positive Correlation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '3px', background: 'var(--teal)' }} /> Negative Correlation
            </div>
          </div>
        </div>
        <select 
          className="premium-select"
          value={selectedFilter} 
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="all">All Anxiety Types</option>
          {rows.map(r => (
            <option key={r.id} value={r.id}>{fullRowNames[r.id] || r.label}</option>
          ))}
        </select>
      </div>
      <div className="chart-wrap" style={{ height: selectedFilter === 'all' ? 340 : 180, marginTop: 10 }}>
        <div style={{ minWidth: 600, height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 50, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="category" dataKey="x" tick={<CustomXAxisTick />} interval={0} allowDuplicatedCategory={false} />
            <YAxis type="category" dataKey="y" tick={<CustomYAxisTick />} width={115} allowDuplicatedCategory={false} />
            <ZAxis type="number" dataKey="z" range={[60, 400]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={scatterData} onClick={handleClick} style={{ cursor: 'pointer' }}>
              {scatterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={rToColor(entry.rValue)} fillOpacity={0.8} />
              ))}
              <LabelList dataKey="rDisplay" position="top" style={{ fill: 'var(--text-primary)', fontSize: 10, fontWeight: 600 }} offset={8} />
            </Scatter>
          </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

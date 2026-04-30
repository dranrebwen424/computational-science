import { useState, useCallback } from 'react';
import { correlationMatrix, allTables, correlationRowTableKeys, correlationColTableKeys } from '../data/researchData.js';

function rToColor(r) {
  if (r < 0) {
    const t = Math.abs(r);
    return `rgb(${Math.round(30 - t * 10)},${Math.round(120 - t * 80)},${Math.round(100 + t * 155)})`;
  } else {
    const t = r;
    return `rgb(${Math.round(80 + t * 175)},${Math.round(100 - t * 80)},${Math.round(120 - t * 100)})`;
  }
}

function textColor(r) { return Math.abs(r) > 0.4 ? '#fff' : '#cbd5e1'; }

export default function CorrelationHeatmap({ onCellClick }) {
  const [tooltip, setTooltip] = useState(null);
  const { rows, cols, cells } = correlationMatrix;

  const handleEnter = useCallback((e, cell, rowLabel, colLabel) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ cell, rowLabel, colLabel, x: rect.left + rect.width / 2, y: rect.top });
  }, []);

  const handleClick = (cell, ri, ci) => {
    // Show row (anxiety dim) table when clicking
    onCellClick(allTables[correlationRowTableKeys[ri]], allTables[correlationColTableKeys[ci]], cell);
  };

  const CELL_W = 72, CELL_H = 52, ROW_LABEL_W = 88;

  return (
    <div className="card" style={{ flex: 1 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Correlation Heatmap</div>
          <div className="card-subtitle">Pearson r — Anxiety Dims. × Predictors · ★ = p &lt; .05</div>
          <div className="chart-clickable-hint">🖱 Click any cell to view raw indicator data for that row</div>
        </div>
      </div>
      <div className="heatmap-wrap">
        {/* Column labels */}
        <div style={{ display: 'grid', gridTemplateColumns: `${ROW_LABEL_W}px repeat(${cols.length}, ${CELL_W}px)`, gap: 3, marginBottom: 3 }}>
          <div />
          {cols.map(col => <div key={col.id} className="heatmap-col-label" style={{ width: CELL_W }}>{col.label}</div>)}
        </div>
        {/* Rows */}
        {rows.map((row, ri) => (
          <div key={row.id} style={{ display: 'grid', gridTemplateColumns: `${ROW_LABEL_W}px repeat(${cols.length}, ${CELL_W}px)`, gap: 3, marginBottom: 3 }}>
            <div className="heatmap-row-label" style={{ fontSize: 10 }}>{row.label}</div>
            {cols.map((col, ci) => {
              const cell = cells[ri][ci];
              return (
                <div key={col.id}
                  className={`heatmap-cell${cell.significant ? ' significant' : ''}`}
                  style={{ background: rToColor(cell.r), height: CELL_H, width: CELL_W }}
                  onMouseEnter={e => handleEnter(e, cell, row.label, col.label)}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => handleClick(cell, ri, ci)}
                >
                  <span className="heatmap-r" style={{ color: textColor(cell.r) }}>
                    {cell.r >= 0 ? '+' : ''}{cell.r.toFixed(3)}
                  </span>
                  {cell.significant && <span className="heatmap-sig">★</span>}
                </div>
              );
            })}
          </div>
        ))}
        {/* Color scale */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>−1.0</span>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'linear-gradient(to right, rgb(20,40,245), rgb(140,140,200), #fff, rgb(200,120,80), rgb(255,20,20))' }} />
          <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>+1.0</span>
        </div>
        <div style={{ fontSize: 9.5, color: 'var(--text-muted)', marginTop: 4 }}>
          None of the anxiety–predictor correlations reached significance (p &gt; .05)
        </div>
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div className="heatmap-tooltip" style={{ left: tooltip.x, top: tooltip.y - 130, transform: 'translateX(-50%)' }}>
          <div className="hm-tooltip-pair">{tooltip.rowLabel} × {tooltip.colLabel}</div>
          <div className="hm-tooltip-r">r = {tooltip.cell.r >= 0 ? '+' : ''}{tooltip.cell.r.toFixed(3)}</div>
          <div className="hm-tooltip-p">p = {tooltip.cell.p.toFixed(3)}</div>
          <div className={`hm-tooltip-sig ${tooltip.cell.significant ? 'hm-sig-yes' : 'hm-sig-no'}`}>
            {tooltip.cell.significant ? '★ Significant (p < .05)' : 'Not Significant (p > .05)'}
          </div>
          <div style={{ marginTop: 6, fontSize: 10, color: 'var(--teal)' }}>🖱 Click to view raw indicator data</div>
        </div>
      )}
    </div>
  );
}

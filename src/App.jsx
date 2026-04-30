import { useState } from 'react';
import KpiCards from './components/KpiCards.jsx';
import AnxietyOverviewChart from './components/AnxietyOverviewChart.jsx';
import IndicatorDrillDown from './components/IndicatorDrillDown.jsx';
import CorrelationHeatmap from './components/CorrelationHeatmap.jsx';
import PredictorRanking from './components/PredictorRanking.jsx';
import KeyFindingBanner from './components/KeyFindingBanner.jsx';
import SummaryModal from './components/SummaryModal.jsx';
import RawDataPanel from './components/RawDataPanel.jsx';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showRefLines, setShowRefLines] = useState(true);
  // panelTable: the allTables entry to display in the raw data panel, or null
  const [panelTable, setPanelTable] = useState(null);

  // For heatmap click, we show the row (anxiety dim) table
  const handleHeatmapCellClick = (rowTable) => {
    setPanelTable(rowTable);
  };

  return (
    <div className="app">

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="header">
        <div className="header-left">
          <span className="header-title">
            Language Anxiety in Oral Communication — Grade 12 | Mabini Colleges, Inc.
          </span>
          <span className="header-subtitle">
            n = 237 respondents &nbsp;·&nbsp; Descriptive-Correlational Design &nbsp;·&nbsp; 2025–2026
          </span>
        </div>
        <div className="header-actions">
          <div className="toggle-wrap">
            <div className={`toggle ${showRefLines ? 'on' : ''}`}
              onClick={() => setShowRefLines(v => !v)}
              role="switch" aria-checked={showRefLines} title="Toggle scale reference lines" />
            <span>Ref. Lines</span>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            📄 View Summary
          </button>
        </div>
      </header>

      {/* ── KPI Cards ─────────────────────────────────────────── */}
      <KpiCards />

      {/* ── Main Bento Grid ───────────────────────────────────── */}
      <div className="main-grid">

        {/* Left column */}
        <div className="left-col">
          <AnxietyOverviewChart
            showRefLines={showRefLines}
            onBarClick={setPanelTable}
          />
          <IndicatorDrillDown
            showRefLines={showRefLines}
            onBarClick={setPanelTable}
          />
        </div>

        {/* Right column */}
        <div className="right-col">
          <CorrelationHeatmap
            onCellClick={handleHeatmapCellClick}
          />
          <PredictorRanking
            showRefLines={showRefLines}
            onBarClick={setPanelTable}
          />
        </div>

      </div>

      {/* ── Key Finding Banner ─────────────────────────────────── */}
      <KeyFindingBanner />

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="footer">
        Study by Doloeras, Gallano, Gruba &amp; Padillo &nbsp;·&nbsp; Mabini Colleges, Inc. &nbsp;·&nbsp; RES+ 2025–2026
      </footer>

      {/* ── Summary Modal ─────────────────────────────────────── */}
      {showModal && <SummaryModal onClose={() => setShowModal(false)} />}

      {/* ── Raw Data Panel ────────────────────────────────────── */}
      {panelTable && (
        <RawDataPanel
          table={panelTable}
          onClose={() => setPanelTable(null)}
        />
      )}

    </div>
  );
}

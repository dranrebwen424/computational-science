import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import KpiCards from './components/KpiCards.jsx';
import AnxietyOverviewChart from './components/AnxietyOverviewChart.jsx';
import IndicatorDrillDown from './components/IndicatorDrillDown.jsx';
import CorrelationHeatmap from './components/CorrelationHeatmap.jsx';
import PredictorRanking from './components/PredictorRanking.jsx';
import RawDataPanel from './components/RawDataPanel.jsx';

export default function App() {
  const container = useRef();
  // panelTable: the allTables entry to display in the raw data panel, or null
  const [panelTable, setPanelTable] = useState(null);

  const { contextSafe } = useGSAP(() => {
    // Premium staggered reveal — spring physics
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.header-standalone', { y: -24, opacity: 0, duration: 0.9 })
      .from('.kpi-card', {
        y: 32, opacity: 0, scale: 0.97,
        duration: 0.7, stagger: 0.1,
        ease: 'back.out(1.4)'
      }, '-=0.5')
      .from('.bento-row > .card', {
        y: 36, opacity: 0,
        duration: 0.75, stagger: 0.12,
        ease: 'power4.out'
      }, '-=0.35')
      .from('.footer', { opacity: 0, y: 10, duration: 0.8 }, '-=0.3');

    // Subtle card hover lift
    const cards = gsap.utils.toArray('.card, .kpi-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', contextSafe(() => {
        gsap.to(card, {
          y: -5,
          boxShadow: '0 12px 32px rgba(16,24,40,0.10)',
          duration: 0.35,
          ease: 'power2.out'
        });
      }));
      card.addEventListener('mouseleave', contextSafe(() => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 1px 3px rgba(16,24,40,0.06)',
          duration: 0.5,
          ease: 'power3.out'
        });
      }));
    });
  }, { scope: container });

  // For heatmap click, we show the row (anxiety dim) table
  const handleHeatmapCellClick = (rowTable) => {
    setPanelTable(rowTable);
  };

  return (
    <div className="app" ref={container}>

      {/* ── Row 1: Header ───────────────────────────────────────────── */}
      <header className="header-standalone">
        <h1 className="header-title">Language Anxiety in Oral Communication</h1>
      </header>

      {/* ── Row 2: KPI Cards ─────────────────────────────────────────── */}
      <KpiCards />

      {/* ── Rows 3 & 4: Bento Grid ───────────────────────────────────── */}
      <div className="bento-grid">

        {/* Row 3 */}
        <div className="bento-row">
          <AnxietyOverviewChart onBarClick={setPanelTable} />
          <PredictorRanking onBarClick={setPanelTable} />
        </div>

        {/* Row 4 */}
        <div className="bento-row">
          <CorrelationHeatmap onCellClick={handleHeatmapCellClick} />
          <IndicatorDrillDown onBarClick={setPanelTable} />
        </div>

      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="footer">
        Study by Doloeras, Gallano, Gruba &amp; Padillo &nbsp;·&nbsp; RES+ 2025–2026
      </footer>

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

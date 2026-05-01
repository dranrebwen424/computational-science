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
    // Premium staggered reveal sequence
    const tl = gsap.timeline();
    
    tl.from('.header-standalone', { y: -20, opacity: 0, duration: 1, ease: 'power3.out' })
      .from('.kpi-card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)' }, '-=0.6')
      .from('.bento-row > .card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.4')
      .from('.footer', { opacity: 0, duration: 1 }, '-=0.4');

    // Interactive Hover Effects via GSAP
    const cards = gsap.utils.toArray('.card, .kpi-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', contextSafe(() => {
        gsap.to(card, { 
          y: -6, 
          boxShadow: '0 16px 40px rgba(0,0,0,0.06)', 
          duration: 0.4, 
          ease: 'power2.out' 
        });
      }));
      card.addEventListener('mouseleave', contextSafe(() => {
        gsap.to(card, { 
          y: 0, 
          boxShadow: '0 4px 20px rgba(0,0,0,0.01)', 
          duration: 0.6, 
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

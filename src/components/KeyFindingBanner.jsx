export default function KeyFindingBanner() {
  return (
    <div className="finding-banner">
      <div className="finding-icon">🔬</div>
      <div className="finding-content">
        <div className="finding-title">KEY STATISTICAL FINDING</div>
        <div className="finding-text">
          A <span className="finding-stat">significant negative correlation</span> was found between{' '}
          <span className="finding-stat">Self-Confidence</span> and{' '}
          <span className="finding-stat">Language Proficiency</span>:{' '}
          <span className="finding-stat">r(3) = −.896, p = .039</span>.{' '}
          As perceived language proficiency increases, self-reported lack of confidence decreases.{' '}
          All other predictor–anxiety correlations were <em>non-significant</em> (p &gt; .05),
          largely <strong style={{ color: 'var(--text-primary)' }}>accepting the null hypothesis</strong>.
        </div>
      </div>
    </div>
  );
}

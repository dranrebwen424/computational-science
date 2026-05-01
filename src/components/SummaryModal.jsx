import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function SummaryModal({ onClose }) {
  const overlayRef = useRef();
  const boxRef = useRef();

  const { contextSafe } = useGSAP(() => {
    gsap.from(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' });
    gsap.from(boxRef.current, { y: 30, scale: 0.95, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' });
  });

  const handleClose = contextSafe(() => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(boxRef.current, { y: 20, scale: 0.95, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onClose });
  });

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className="modal-box" ref={boxRef}>
        <div className="modal-header">
          <span className="modal-title">Research Summary</span>
          <button className="modal-close" onClick={handleClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">

          <h2>Study Overview</h2>
          <p><strong style={{color:'var(--text-primary)'}}>Title:</strong> Predictors of Language Anxiety in Oral Communication of Grade 12 Students of Mabini Colleges, Inc.</p>
          <p><strong style={{color:'var(--text-primary)'}}>Authors:</strong> Alma Doloeras, Abegail Gallano, Michelle Gruba, Princess Angelica Padillo</p>
          <p><strong style={{color:'var(--text-primary)'}}>Institution:</strong> Mabini Colleges, Inc. | Department of Education | RES+ 2025–2026</p>

          <h2>Objectives (Research Questions)</h2>
          <ul>
            <li><strong>RQ1:</strong> What is the level of English language anxiety among Grade 12 students in terms of Communication Anxiety, Fear of Negative Evaluation, Test Anxiety, and English Class Anxiety?</li>
            <li><strong>RQ2:</strong> What is the degree of existence of the predictors (Self-confidence, Language Proficiency, Peer Influence, Classroom Environment)?</li>
            <li><strong>RQ3:</strong> What are the major predictors of language anxiety in oral communication?</li>
            <li><strong>RQ4:</strong> What interventions may be proposed to address language anxiety?</li>
          </ul>

          <h2>Methodology</h2>
          <ul>
            <li><strong>Design:</strong> Quantitative, Descriptive-Correlational</li>
            <li><strong>Respondents:</strong> 237 Grade 12 students (from population of 617, Cochran formula)</li>
            <li><strong>Sampling:</strong> Stratified Random Sampling by academic strand (STEM, ABM, HUMSS, TVL, GAS)</li>
            <li><strong>Instrument:</strong> Researcher-made survey questionnaire (validated, pilot-tested, Cronbach's Alpha reliability)</li>
            <li><strong>Statistics:</strong> Weighted Mean, Percentage, Pearson Product-Moment Correlation Coefficient, Ranking</li>
          </ul>

          <h2>Rating Scales</h2>
          <p><strong style={{color:'var(--text-primary)'}}>Anxiety Dimensions:</strong> 3.35–4.00 = Very High | 2.50–3.24 = High | 1.75–2.49 = Moderate | 1.00–1.74 = Low</p>
          <p><strong style={{color:'var(--text-primary)'}}>Predictor Variables:</strong> 3.35–4.00 = Strongly Agree | 2.50–3.24 = Agree | 1.75–2.49 = Disagree | 1.00–1.74 = Strongly Disagree</p>

          <h2>Results — Anxiety Dimensions</h2>
          <table>
            <thead><tr><th>Dimension</th><th>Overall WM</th><th>Interpretation</th></tr></thead>
            <tbody>
              <tr><td>Communication Anxiety</td><td>2.92</td><td>High</td></tr>
              <tr><td>Fear of Negative Evaluation</td><td>2.79</td><td>High</td></tr>
              <tr><td>English Class Anxiety</td><td>2.38</td><td>Moderate</td></tr>
              <tr><td>Test Anxiety</td><td>2.25</td><td>Moderate</td></tr>
            </tbody>
          </table>

          <h2>Results — Predictor Variables</h2>
          <table>
            <thead><tr><th>Predictor</th><th>Overall WM</th><th>Interpretation</th></tr></thead>
            <tbody>
              <tr><td>Self-Confidence</td><td>2.52</td><td>Agree</td></tr>
              <tr><td>Peer Influence</td><td>2.50</td><td>Agree</td></tr>
              <tr><td>Classroom Environment</td><td>2.49</td><td>Disagree</td></tr>
              <tr><td>Language Proficiency</td><td>2.44</td><td>Disagree</td></tr>
            </tbody>
          </table>

          <h2>Pearson Correlation Matrix</h2>
          <p>Correlations between anxiety dimensions and predictor variables (n=5 per cell, 2-tailed):</p>
          <table>
            <thead>
              <tr><th></th><th>Self-Conf.</th><th>Lang. Prof.</th><th>Peer Infl.</th><th>Class Env.</th></tr>
            </thead>
            <tbody>
              <tr><td>Communication Anxiety</td><td>r=−.221, p=.721</td><td>r=.308, p=.614</td><td>r=−.280, p=.648</td><td>r=−.511, p=.379</td></tr>
              <tr><td>Fear of Neg. Eval.</td><td>r=−.615, p=.270</td><td>r=.689, p=.198</td><td>r=.295, p=.630</td><td>r=−.423, p=.478</td></tr>
              <tr><td>Test Anxiety</td><td>r=.048, p=.939</td><td>r=.064, p=.918</td><td>r=−.181, p=.770</td><td>r=−.389, p=.517</td></tr>
              <tr><td>English Class Anxiety</td><td>r=.157, p=.801</td><td>r=−.313, p=.608</td><td>r=−.167, p=.789</td><td>r=.474, p=.420</td></tr>
            </tbody>
          </table>
          <p><em>None of the anxiety–predictor correlations reached statistical significance (all p &gt; .05).</em></p>

          <h2>Key Statistical Finding</h2>
          <p>A statistically significant strong negative correlation was found between <strong style={{color:'var(--teal)'}}>Self-Confidence</strong> and <strong style={{color:'var(--teal)'}}>Language Proficiency</strong>: <strong style={{color:'var(--teal)'}}>r(3) = −.896, p = .039</strong>. This is the ONLY significant relationship in the study. The null hypothesis is largely accepted.</p>

          <h2>Major Findings & Conclusions</h2>
          <ul>
            <li>Grade 12 students experience <strong>High</strong> levels of Communication Anxiety (WM=2.92) and Fear of Negative Evaluation (WM=2.79).</li>
            <li>Test Anxiety (WM=2.25) and English Class Anxiety (WM=2.38) are at <strong>Moderate</strong> levels.</li>
            <li><strong>Self-Confidence</strong> is the strongest predictor (WM=2.52, Agree), followed by Peer Influence and Classroom Environment (both 2.50/2.49).</li>
            <li>Language Proficiency is the weakest predictor (WM=2.44, Disagree).</li>
            <li>Affective and social factors outweigh linguistic competence in influencing anxiety.</li>
          </ul>

          <h2>Proposed Interventions</h2>
          <ul>
            <li><strong>Progressive Oral Communication Activities</strong> — guided pair work, role-playing, low-stakes speaking tasks.</li>
            <li><strong>Error-tolerant Feedback Strategies</strong> — constructive feedback, peer encouragement, classroom norms against ridicule.</li>
            <li><strong>Alternative Assessment Methods</strong> — oral portfolios, recorded presentations, formative assessments.</li>
            <li><strong>Confidence-Enhancement Programs</strong> — regular speaking practice, goal-setting, cooperative learning over competition.</li>
          </ul>

        </div>
      </div>
    </div>
  );
}

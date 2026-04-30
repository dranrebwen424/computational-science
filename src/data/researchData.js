// researchData.js — All data sourced directly from researh.md (Chapters 4-5) and SPSS screenshot.
// NO data fabricated. All weighted means, r-values, and p-values are from the research paper.

export function getAnxietyLabel(wm) {
  if (wm >= 3.35) return 'Very High';
  if (wm >= 2.50) return 'High';
  if (wm >= 1.75) return 'Moderate';
  return 'Low';
}
export function getPredictorLabel(wm) {
  if (wm >= 3.35) return 'Strongly Agree';
  if (wm >= 2.50) return 'Agree';
  if (wm >= 1.75) return 'Disagree';
  return 'Strongly Disagree';
}

// Anxiety Dimensions — Table summaries (Chapter 4)
// tableKey maps to the corresponding allTables index (0-based)
export const anxietyDimensions = [
  { id: 'comm',  label: 'Communication Anxiety',       shortLabel: 'Comm. Anxiety',  wm: 2.92, interpretation: 'High',     tableKey: 0 },
  { id: 'fear',  label: 'Fear of Negative Evaluation', shortLabel: 'Fear of Eval.',  wm: 2.79, interpretation: 'High',     tableKey: 1 },
  { id: 'test',  label: 'Test Anxiety',                shortLabel: 'Test Anxiety',   wm: 2.25, interpretation: 'Moderate', tableKey: 2 },
  { id: 'class', label: 'English Class Anxiety',       shortLabel: 'Class Anxiety',  wm: 2.38, interpretation: 'Moderate', tableKey: 3 },
];

// Predictor Variables — Table summaries (Chapter 4)
export const predictorVariables = [
  { id: 'conf', label: 'Self-Confidence',      shortLabel: 'Self-Confidence',   wm: 2.52, interpretation: 'Agree',    tableKey: 4 },
  { id: 'prof', label: 'Language Proficiency', shortLabel: 'Lang. Proficiency', wm: 2.44, interpretation: 'Disagree', tableKey: 5 },
  { id: 'peer', label: 'Peer Influence',       shortLabel: 'Peer Influence',    wm: 2.50, interpretation: 'Agree',    tableKey: 6 },
  { id: 'env',  label: 'Classroom Environment',shortLabel: 'Class. Environ.',   wm: 2.49, interpretation: 'Disagree', tableKey: 7 },
];

// Table 1 — Communication Anxiety (Chapter 4)
export const table1 = {
  title: 'Comm. Anxiety', fullTitle: 'Communication Anxiety', scaleType: 'anxiety',
  overallWM: 2.92, overallInterpretation: 'High',
  indicators: [
    { shortText: 'Tense seeing "speech" on course outline',  wm: 2.78, interpretation: 'High' },
    { shortText: 'Anxious thinking about upcoming speech',   wm: 3.01, interpretation: 'High' },
    { shortText: 'Hands tremble while giving speech',        wm: 3.03, interpretation: 'High' },
    { shortText: 'Body feels tense during speech',           wm: 3.03, interpretation: 'High' },
    { shortText: 'Do poorly on speeches due to anxiety',     wm: 2.76, interpretation: 'High' },
  ],
};

// Table 2 — Fear of Negative Evaluation (Chapter 4)
export const table2 = {
  title: 'Fear of Eval.', fullTitle: 'Fear of Negative Evaluation', scaleType: 'anxiety',
  overallWM: 2.79, overallInterpretation: 'High',
  indicators: [
    { shortText: 'Embarrassed when making mistakes in class', wm: 2.88, interpretation: 'High' },
    { shortText: 'Worried accent sounds less fluent',         wm: 2.85, interpretation: 'High' },
    { shortText: 'Worried proficiency not good for class',    wm: 2.78, interpretation: 'High' },
    { shortText: 'Self-conscious about others\' perception',  wm: 2.73, interpretation: 'High' },
    { shortText: 'Afraid classmates will judge negatively',   wm: 2.74, interpretation: 'High' },
  ],
};

// Table 3 — Test Anxiety (Chapter 4)
export const table3 = {
  title: 'Test Anxiety', fullTitle: 'Test Anxiety', scaleType: 'anxiety',
  overallWM: 2.25, overallInterpretation: 'Moderate',
  indicators: [
    { shortText: 'Very nervous before English language test', wm: 2.15, interpretation: 'Moderate' },
    { shortText: 'Worried about poor test performance',       wm: 2.27, interpretation: 'Moderate' },
    { shortText: 'Stressed taking English test (fear failing)',wm: 2.28, interpretation: 'Moderate' },
    { shortText: 'Panic when asked to speak during test',     wm: 2.36, interpretation: 'Moderate' },
    { shortText: 'Confused and anxious preparing for test',   wm: 2.21, interpretation: 'Moderate' },
  ],
};

// Table 4 — English Class Anxiety (Chapter 4)
export const table4 = {
  title: 'Class Anxiety', fullTitle: 'English Class Anxiety', scaleType: 'anxiety',
  overallWM: 2.38, overallInterpretation: 'Moderate',
  indicators: [
    { shortText: 'Tremble when about to be called on',        wm: 2.51, interpretation: 'High' },
    { shortText: 'Afraid teacher corrects every mistake',     wm: 2.30, interpretation: 'Moderate' },
    { shortText: 'Feel others speak English better',          wm: 2.50, interpretation: 'High' },
    { shortText: 'More tense in English class than others',   wm: 2.22, interpretation: 'Moderate' },
    { shortText: 'Afraid others will laugh when speaking',    wm: 2.38, interpretation: 'Moderate' },
  ],
};

// Table 5 — Self-Confidence (Chapter 4)
export const table5 = {
  title: 'Self-Confidence', fullTitle: 'Self-Confidence', scaleType: 'predictor',
  overallWM: 2.52, overallInterpretation: 'Agree',
  indicators: [
    { shortText: 'Nervous when called to recite in English',      wm: 2.55, interpretation: 'Agree' },
    { shortText: 'Avoid participating due to lack of confidence', wm: 2.27, interpretation: 'Disagree' },
    { shortText: 'Embarrassed when making mistakes speaking',     wm: 2.58, interpretation: 'Agree' },
    { shortText: 'Doubt ability to express ideas clearly',        wm: 2.64, interpretation: 'Agree' },
    { shortText: 'Lose confidence with unexpected questions',     wm: 2.59, interpretation: 'Agree' },
  ],
};

// Table 6 — Language Proficiency (Chapter 4)
export const table6 = {
  title: 'Lang. Proficiency', fullTitle: 'Language Proficiency', scaleType: 'predictor',
  overallWM: 2.44, overallInterpretation: 'Disagree',
  indicators: [
    { shortText: 'Limited vocabulary makes anxious in class',   wm: 2.45, interpretation: 'Disagree' },
    { shortText: 'Nervous when unable to construct sentences',  wm: 2.56, interpretation: 'Agree' },
    { shortText: 'Anxious when not understanding instructions', wm: 2.39, interpretation: 'Disagree' },
    { shortText: 'Lack of fluency makes hesitant to speak',     wm: 2.43, interpretation: 'Disagree' },
    { shortText: 'Uncomfortable due to grammar difficulties',   wm: 2.37, interpretation: 'Disagree' },
  ],
};

// Table 7 — Peer Influence (Chapter 4)
export const table7 = {
  title: 'Peer Influence', fullTitle: 'Peer Influence', scaleType: 'predictor',
  overallWM: 2.50, overallInterpretation: 'Agree',
  indicators: [
    { shortText: 'Anxious when classmates laugh at mistakes',    wm: 2.68, interpretation: 'Agree' },
    { shortText: 'Compare skills with classmates; feel nervous', wm: 2.45, interpretation: 'Disagree' },
    { shortText: 'Lose confidence vs. better classmates',        wm: 2.34, interpretation: 'Disagree' },
    { shortText: 'Pressured by classmates\' expectations',       wm: 2.63, interpretation: 'Agree' },
    { shortText: 'Nervous when paired with good classmates',     wm: 2.43, interpretation: 'Disagree' },
  ],
};

// Table 8 — Classroom Environment (Chapter 4)
export const table8 = {
  title: 'Class. Environ.', fullTitle: 'Classroom Environment', scaleType: 'predictor',
  overallWM: 2.49, overallInterpretation: 'Disagree',
  indicators: [
    { shortText: 'Anxious when teacher speaks too fast',            wm: 2.39, interpretation: 'Disagree' },
    { shortText: 'Classroom atmosphere hinders participation',      wm: 2.23, interpretation: 'Disagree' },
    { shortText: 'More anxious in a competitive class',             wm: 2.70, interpretation: 'Agree' },
    { shortText: 'Group activities increase nervousness',           wm: 2.20, interpretation: 'Disagree' },
    { shortText: 'Less anxious in a supportive environment',        wm: 2.96, interpretation: 'Agree' },
  ],
};

export const allTables = [table1, table2, table3, table4, table5, table6, table7, table8];

// Pearson Correlation Matrix — rows: anxiety dims, cols: predictors
// From SPSS output (Screenshot 2026-04-29 232538.png) and stats.md
export const correlationMatrix = {
  rows: [
    { id: 'comm',  label: 'Comm. Anxiety' },
    { id: 'fear',  label: 'Fear of Eval.' },
    { id: 'test',  label: 'Test Anxiety' },
    { id: 'class', label: 'Class Anxiety' },
  ],
  cols: [
    { id: 'conf', label: 'Self-Confidence' },
    { id: 'prof', label: 'Lang. Proficiency' },
    { id: 'peer', label: 'Peer Influence' },
    { id: 'env',  label: 'Class. Environ.' },
  ],
  cells: [
    [ { r: -0.221, p: 0.721, significant: false }, { r:  0.308, p: 0.614, significant: false }, { r: -0.280, p: 0.648, significant: false }, { r: -0.511, p: 0.379, significant: false } ],
    [ { r: -0.615, p: 0.270, significant: false }, { r:  0.689, p: 0.198, significant: false }, { r:  0.295, p: 0.630, significant: false }, { r: -0.423, p: 0.478, significant: false } ],
    [ { r:  0.048, p: 0.939, significant: false }, { r:  0.064, p: 0.918, significant: false }, { r: -0.181, p: 0.770, significant: false }, { r: -0.389, p: 0.517, significant: false } ],
    [ { r:  0.157, p: 0.801, significant: false }, { r: -0.313, p: 0.608, significant: false }, { r: -0.167, p: 0.789, significant: false }, { r:  0.474, p: 0.420, significant: false } ],
  ],
};

// Predictor Ranking — by overall WM descending (Chapter 5 findings)
export const predictorRanking = [
  { rank: 1, label: 'Self-Confidence',     wm: 2.52, interpretation: 'Agree',    isTop: true,  tableKey: 4 },
  { rank: 2, label: 'Peer Influence',      wm: 2.50, interpretation: 'Agree',    isTop: false, tableKey: 6 },
  { rank: 3, label: 'Classroom Environ.',  wm: 2.49, interpretation: 'Disagree', isTop: false, tableKey: 7 },
  { rank: 4, label: 'Lang. Proficiency',   wm: 2.44, interpretation: 'Disagree', isTop: false, tableKey: 5 },
];

// Correlation rows also link to their indicator tables
export const correlationRowTableKeys = [0, 1, 2, 3]; // comm→table1, fear→table2, test→table3, class→table4
export const correlationColTableKeys = [4, 5, 6, 7]; // conf→table5, prof→table6, peer→table7, env→table8


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

export const table1 = {
  title: 'Comm. Anxiety', fullTitle: 'Communication Anxiety', scaleType: 'anxiety',
  overallWM: 2.92, overallInterpretation: 'High',
  indicators: [
    { shortText: 'Tense seeing "speech" on course outline', fullText: 'I feel tense when I see the words "speech" and "public speech" on a course outline when studying.', wm: 2.79, interpretation: 'High', freq: {1:9.3,2:23.2,3:46.8,4:20.7} },
    { shortText: 'Anxious thinking about upcoming speech', fullText: 'I get anxious when I think about a speech coming up.', wm: 3.01, interpretation: 'High', freq: {1:4.6,2:21.5,3:41.8,4:32.1} },
    { shortText: 'Hands tremble while giving speech', fullText: 'My hands tremble when I am giving a speech.', wm: 3.04, interpretation: 'High', freq: {1:8.4,2:19.4,3:32.1,4:40.1} },
    { shortText: 'Body feels tense during speech', fullText: 'Certain parts of my body feel very tense and rigid while giving a speech.', wm: 3.03, interpretation: 'High', freq: {1:6.8,2:20.3,3:35.9,4:37.1} },
    { shortText: 'Do poorly on speeches due to anxiety', fullText: 'I do poorly on speeches because I am anxious.', wm: 2.76, interpretation: 'High', freq: {1:10.5,2:28.3,3:35.4,4:25.7} },
  ],
};

export const table2 = {
  title: 'Fear of Eval.', fullTitle: 'Fear of Negative Evaluation', scaleType: 'anxiety',
  overallWM: 2.79, overallInterpretation: 'High',
  indicators: [
    { shortText: 'Embarrassed when making mistakes in class', fullText: 'I feel embarrassed when I make a mistake while speaking English in class.', wm: 2.88, interpretation: 'High', freq: {1:11.0,2:21.1,3:36.7,4:31.2} },
    { shortText: 'Worried accent sounds less fluent', fullText: 'I worry that my accent will make me sound less fluent in front of others.', wm: 2.86, interpretation: 'High', freq: {1:12.2,2:23.6,3:30.4,4:33.8} },
    { shortText: 'Worried proficiency not good for class', fullText: 'I worry that my English proficiency will not be good enough for class discussion.', wm: 2.78, interpretation: 'High', freq: {1:11.8,2:27.4,3:31.6,4:29.1} },
    { shortText: 'Self-conscious about others\' perception', fullText: 'I feel self-conscious when I speak in English because I\'m afraid of how others perceive me.', wm: 2.74, interpretation: 'High', freq: {1:10.5,2:30.8,3:32.9,4:25.7} },
    { shortText: 'Afraid classmates will judge negatively', fullText: 'I am afraid that my classmates will judge me negatively when I speak in English.', wm: 2.74, interpretation: 'High', freq: {1:14.8,2:26.2,3:29.1,4:30.0} },
  ],
};

export const table3 = {
  title: 'Test Anxiety', fullTitle: 'Test Anxiety', scaleType: 'anxiety',
  overallWM: 2.25, overallInterpretation: 'Moderate',
  indicators: [
    { shortText: 'Very nervous before English language test', fullText: 'I get very nervous before an English language test.', wm: 2.15, interpretation: 'Moderate', freq: {1:26.6,2:40.1,3:24.9,4:8.4} },
    { shortText: 'Worried about poor test performance', fullText: "I worry that I won't be able to perform well on English tests due to my language skills.", wm: 2.28, interpretation: 'Moderate', freq: {1:23.2,2:36.7,3:29.1,4:11.0} },
    { shortText: 'Stressed taking English test (fear failing)', fullText: 'I get stressed out when I have to take an English test because I fear failing.', wm: 2.29, interpretation: 'Moderate', freq: {1:24.5,2:35.9,3:26.2,4:13.5} },
    { shortText: 'Panic when asked to speak during test', fullText: "I panic when I'm asked to speak in English during a test.", wm: 2.36, interpretation: 'Moderate', freq: {1:20.3,2:34.6,3:33.8,4:11.4} },
    { shortText: 'Confused and anxious preparing for test', fullText: 'I start to feel confused and anxious when preparing for an English test.', wm: 2.21, interpretation: 'Moderate', freq: {1:22.4,2:44.7,3:22.4,4:10.5} },
  ],
};

export const table4 = {
  title: 'Class Anxiety', fullTitle: 'English Class Anxiety', scaleType: 'anxiety',
  overallWM: 2.38, overallInterpretation: 'Moderate',
  indicators: [
    { shortText: 'Tremble when about to be called on', fullText: "I tremble when I know that I'm going to be called on in language class.", wm: 2.51, interpretation: 'High', freq: {1:16.0,2:33.3,3:33.8,4:16.9} },
    { shortText: 'Afraid teacher corrects every mistake', fullText: 'I am afraid that my language teacher is ready to correct every mistake I make.', wm: 2.31, interpretation: 'Moderate', freq: {1:22.4,2:40.5,3:21.1,4:16.0} },
    { shortText: 'Feel others speak English better', fullText: 'I always feel that the other students speak the foreign language better than I do.', wm: 2.51, interpretation: 'High', freq: {1:19.0,2:30.4,3:31.6,4:19.0} },
    { shortText: 'More tense in English class than others', fullText: 'I feel more tense and nervous in my language class than in my other classes.', wm: 2.22, interpretation: 'Moderate', freq: {1:23.6,2:38.4,3:30.0,4:8.0} },
    { shortText: 'Afraid others will laugh when speaking', fullText: 'I am afraid that the other students will laugh at me when I speak the foreign language.', wm: 2.38, interpretation: 'Moderate', freq: {1:20.7,2:37.1,3:25.3,4:16.9} },
  ],
};

export const table5 = {
  title: 'Self-Confidence', fullTitle: 'Self-Confidence', scaleType: 'predictor',
  overallWM: 2.52, overallInterpretation: 'Agree',
  indicators: [
    { shortText: 'Nervous when called to recite in English', fullText: 'I feel nervous when I am called to recite in English.', wm: 2.56, interpretation: 'Agree', freq: {1:16.9,2:30.0,3:33.8,4:19.4} },
    { shortText: 'Avoid participating due to lack of confidence', fullText: 'I avoid participating in English discussions because I lack confidence.', wm: 2.27, interpretation: 'Disagree', freq: {1:21.9,2:42.6,3:21.5,4:13.9} },
    { shortText: 'Embarrassed when making mistakes speaking', fullText: 'I get embarrassed when I make mistakes in speaking English.', wm: 2.58, interpretation: 'Agree', freq: {1:11.4,2:37.1,3:33.3,4:18.1} },
    { shortText: 'Doubt ability to express ideas clearly', fullText: 'I doubt my ability to express ideas clearly in English.', wm: 2.64, interpretation: 'Agree', freq: {1:12.2,2:30.4,3:38.4,4:19.0} },
    { shortText: 'Lose confidence with unexpected questions', fullText: 'I lose confidence when the teacher asks me unexpected questions in English.', wm: 2.59, interpretation: 'Agree', freq: {1:12.7,2:33.8,3:35.4,4:18.1} },
  ],
};

export const table6 = {
  title: 'Lang. Proficiency', fullTitle: 'Language Proficiency', scaleType: 'predictor',
  overallWM: 2.44, overallInterpretation: 'Disagree',
  indicators: [
    { shortText: 'Limited vocabulary makes anxious in class', fullText: 'My limited English vocabulary makes me anxious in class.', wm: 2.46, interpretation: 'Disagree', freq: {1:17.3,2:32.9,3:36.7,4:13.1} },
    { shortText: 'Nervous when unable to construct sentences', fullText: 'I feel nervous when I cannot construct correct English sentences.', wm: 2.57, interpretation: 'Agree', freq: {1:13.1,2:30.4,3:43.5,4:13.1} },
    { shortText: 'Anxious when not understanding instructions', fullText: 'I get anxious when I cannot understand English instructions or lectures.', wm: 2.39, interpretation: 'Disagree', freq: {1:17.7,2:39.7,3:28.3,4:14.3} },
    { shortText: 'Lack of fluency makes hesitant to speak', fullText: 'My lack of fluency makes me hesitant to speak in English.', wm: 2.43, interpretation: 'Disagree', freq: {1:19.0,2:32.5,3:35.0,4:13.5} },
    { shortText: 'Uncomfortable due to grammar difficulties', fullText: 'I feel uncomfortable using English because of grammar difficulties.', wm: 2.38, interpretation: 'Disagree', freq: {1:21.5,2:30.8,3:36.3,4:11.4} },
  ],
};

export const table7 = {
  title: 'Peer Influence', fullTitle: 'Peer Influence', scaleType: 'predictor',
  overallWM: 2.50, overallInterpretation: 'Agree',
  indicators: [
    { shortText: 'Anxious when classmates laugh at mistakes', fullText: 'I feel anxious when my classmates laugh at my English mistakes.', wm: 2.69, interpretation: 'Agree', freq: {1:11.0,2:32.1,3:34.2,4:22.8} },
    { shortText: 'Compare skills with classmates; feel nervous', fullText: 'I compare my English skills with classmates and feel nervous.', wm: 2.45, interpretation: 'Disagree', freq: {1:19.0,2:31.2,3:35.4,4:14.3} },
    { shortText: 'Lose confidence vs. better classmates', fullText: 'I lose confidence when I think my classmates are better in English.', wm: 2.35, interpretation: 'Disagree', freq: {1:22.8,2:33.3,3:30.4,4:13.5} },
    { shortText: 'Pressured by classmates\' expectations', fullText: 'I feel pressured when classmates expect me to perform well in English.', wm: 2.63, interpretation: 'Agree', freq: {1:16.0,2:28.7,3:31.2,4:24.1} },
    { shortText: 'Nervous when paired with good classmates', fullText: 'I get nervous when I am paired with classmates who are good at English.', wm: 2.43, interpretation: 'Disagree', freq: {1:21.1,2:34.2,3:24.9,4:19.8} },
  ],
};

export const table8 = {
  title: 'Class. Environ.', fullTitle: 'Classroom Environment', scaleType: 'predictor',
  overallWM: 2.49, overallInterpretation: 'Disagree',
  indicators: [
    { shortText: 'Anxious when teacher speaks too fast', fullText: 'I feel anxious when the teacher speaks too fast in English.', wm: 2.39, interpretation: 'Disagree', freq: {1:20.7,2:33.3,3:32.1,4:13.9} },
    { shortText: 'Classroom atmosphere hinders participation', fullText: 'The classroom atmosphere makes me hesitant to participate in English activities.', wm: 2.24, interpretation: 'Disagree', freq: {1:22.8,2:40.1,3:27.8,4:9.3} },
    { shortText: 'More anxious in a competitive class', fullText: 'I feel more anxious when the class is too competitive.', wm: 2.70, interpretation: 'Agree', freq: {1:13.5,2:28.7,3:31.6,4:26.2} },
    { shortText: 'Group activities increase nervousness', fullText: 'Group activities in English class increase my nervousness.', wm: 2.21, interpretation: 'Disagree', freq: {1:23.6,2:40.1,3:28.3,4:8.0} },
    { shortText: 'Less anxious in a supportive environment', fullText: 'I feel less anxious when the teacher provides a supportive environment.', wm: 2.97, interpretation: 'Agree', freq: {1:12.7,2:19.4,3:26.6,4:41.4} },
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
  { rank: 3, label: 'Classroom Environment',  wm: 2.49, interpretation: 'Disagree', isTop: false, tableKey: 7 },
  { rank: 4, label: 'Language Proficiency',   wm: 2.44, interpretation: 'Disagree', isTop: false, tableKey: 5 },
];

// Correlation rows also link to their indicator tables
export const correlationRowTableKeys = [0, 1, 2, 3]; // comm→table1, fear→table2, test→table3, class→table4
export const correlationColTableKeys = [4, 5, 6, 7]; // conf→table5, prof→table6, peer→table7, env→table8


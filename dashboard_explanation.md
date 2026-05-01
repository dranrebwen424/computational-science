# Dashboard Explanation & Data Guide

## 1. Page Overview
The **Language Anxiety in Oral Communication Dashboard** is an interactive analytical tool designed to visualize the findings of a quantitative research study conducted on 237 Grade 12 students at Mabini Colleges, Inc. The dashboard translates raw survey data and statistical analysis into accessible, interactive visualizations to help users understand the levels, predictors, and correlations of English language anxiety.

## 2. Meaning of the Graphs

### **KPI Cards (Top Section)**
- **Meaning:** These provide immediate, high-level takeaways from the research, such as total respondents (237), the most prevalent anxiety type, the strongest predictor, and the most significant statistical finding.

### **Anxiety Overview Chart (Top Left)**
- **Meaning:** A bar chart comparing the overall levels of the four dimensions of language anxiety: Communication Anxiety, Fear of Negative Evaluation, Test Anxiety, and English Class Anxiety.
- **Interpretation:** Taller bars indicate a higher level of experienced anxiety in that specific dimension.

### **Indicator Drill-Down (Bottom Left)**
- **Meaning:** A detailed, interactive bar chart that breaks down a selected dimension (e.g., Communication Anxiety) into its specific survey questions (indicators).
- **Interpretation:** Allows users to pinpoint exactly *which* specific situations (e.g., "Hands tremble while giving a speech") trigger the highest anxiety or agreement.

### **Correlation Heatmap (Top Right)**
- **Meaning:** A color-coded matrix displaying the Pearson correlation coefficients between the four predictor variables (x-axis) and the four anxiety dimensions (y-axis).
- **Interpretation:** 
  - Colors represent the strength and direction of the relationship.
  - A positive value means as the predictor increases, anxiety increases. A negative value means as the predictor increases, anxiety decreases.
  - The intensity of the color indicates the strength of the correlation.

### **Predictor Ranking (Bottom Right)**
- **Meaning:** A bar chart ranking the four potential predictors of language anxiety: Self-Confidence, Language Proficiency, Peer Influence, and Classroom Environment.
- **Interpretation:** Shows which factors students agreed with the most as influencing their environment and internal state.

### **Interactive Elements (Raw Data Panel)**
- **Meaning:** Clicking on any bar or heatmap cell triggers a slide-out panel containing the "Raw Data."
- **Interpretation:** Gives researchers and users transparent access to the exact numerical tables, weighted means, and interpretations that fuel the visualizations.

---

## 3. The Data

The data feeding this dashboard originates from a structured, quantitative survey of Grade 12 students using Stratified Random Sampling across different academic strands (STEM, ABM, HUMSS, TVL, GAS). 

The dataset comprises two main categories:
1. **Anxiety Variables (Dependent):** Communication Anxiety, Fear of Negative Evaluation, Test Anxiety, English Class Anxiety.
2. **Predictor Variables (Independent):** Self-Confidence, Language Proficiency, Peer Influence, Classroom Environment.

---

## 4. How the Data is Calculated

The dashboard visualizations rely on two primary statistical methods:

### **Weighted Mean (WM)**
- **Calculation:** Survey responses were gathered using a 4-point Likert scale (e.g., 4=Strongly Agree, 1=Strongly Disagree). The Weighted Mean is calculated by multiplying each response value by the number of students who chose it, summing those products, and dividing by the total number of respondents (237).
- **Scales Used:**
  - **Anxiety Scale:** 1.00–1.74 (Low), 1.75–2.49 (Moderate), 2.50–3.24 (High), 3.35–4.00 (Very High)
  - **Predictor Scale:** 1.00–1.74 (Strongly Disagree), 1.75–2.49 (Disagree), 2.50–3.24 (Agree), 3.35–4.00 (Strongly Agree)

### **Pearson Correlation Coefficient (Pearson r)**
- **Calculation:** A statistical formula used (via SPSS) to measure the linear correlation between two sets of data (e.g., Self-Confidence scores vs. Fear of Negative Evaluation scores).
- **Interpretation:** 
  - Produces a value (r) between -1.0 and 1.0. 
  - Evaluated alongside a **p-value** to determine statistical significance. If p < .05, the correlation is considered statistically significant. (In this study, no significant correlations were found between predictors and anxiety, only a significant negative correlation between Self-Confidence and Language Proficiency).

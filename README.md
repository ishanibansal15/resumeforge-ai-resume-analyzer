# ResumeForge AI — Resume Analyzer

ResumeForge AI is a modern browser-based resume analysis platform designed to help students and job seekers improve ATS readiness, identify missing skills, compare resumes against target roles, and generate practical improvement suggestions.

## Features

- Resume text upload/paste workflow
- ATS-style overall score
- Detected technical skills
- Suggested skill gaps
- Section completeness analysis
- Keyword coverage scoring
- Impact-language scoring
- Target-role matching
- Role-specific hiring signals
- Interactive radar visualization
- Exportable analysis report
- Responsive UI
- Demo resume for instant testing

## Tech Stack

- React
- Vite
- JavaScript
- Recharts
- Lucide React
- CSS

## Run locally

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite.

Production build:

```bash
npm run build
npm run preview
```

## How the analysis works

The current portfolio version uses a transparent browser-side scoring engine. It extracts recognizable skills and resume sections, calculates weighted readiness scores, and compares resume text against role-specific keyword signals.

This approach keeps the demo private and requires no API key. A production extension could connect the scoring layer to an LLM API and a PDF/DOCX text-extraction service.

## Portfolio value

This project demonstrates:

- React component design
- State management
- Data-driven scoring
- Data visualization
- Responsive UI engineering
- File input handling
- Client-side report generation
- Product-oriented UX

## Disclaimer

ResumeForge AI provides portfolio/demo analysis and should not be treated as a guaranteed ATS score or employment prediction.

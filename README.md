# EduMap Kebbi — AI-Powered Education Intelligence Platform

> 3MTT Knowledge Showcase · Special Edition 2026
> NextGen Cohort · AI and Machine Learning Track
> Pillar 2: Education (FEED Framework)

---

## Live Demo
**https://69bb12de4accc7c33e90c0c2--edu-insights-kebbi.netlify.app/**

---

## The Problem
Kebbi State's Ministry of Education has no centralised view of teacher distribution,
SEN (Special Educational Needs) coverage, or 2025 curriculum reform readiness
across its 21 Local Government Areas.

Key gaps this platform surfaces:
- 4,823 licensed teachers for 287,440 students — but distribution is deeply unequal
- Only 312 SEN-certified teachers support 14,372 students with disabilities (ratio 1:46 — nearly double the recommended max of 1:25)
- 8 of 21 LGAs have zero qualified teachers for any of the 6 new mandatory 2025 trade subjects
- LGAs like Suru (82% gap) and Shanga (78% gap) are in critical shortage

---

## What EduMap Kebbi Does
It allows stakeholders to have a detailed and informed overview of state of education in the kebbi state. It has an interactive, browser-based education intelligence dashboard with 6 modules:

| Module | What it shows |
|---|---|
| Overview | State-wide KPIs — teachers, students, SEN metrics, gap severity |
| Teacher Density | Heatmap of all 21 LGAs by teachers per 1,000 students |
| Teacher Registry | Searchable, filterable registry by LGA, subject, TRCN status, SEN cert |
| School Directory | All schools by type (Mainstream / SEN / Inclusive), location, LGA |
| Academic Health | 2025 curriculum reform readiness grid + WAEC/NECO performance trends |
| AI Predictions | Teacher shortage forecasts to 2026 + AI intervention recommendations |

---

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript
- Chart.js — data visualisation (8+ chart types)
- IntersectionObserver API — scroll-triggered animations
- CSS animations — count-up metrics, progress bars, fade-in transitions
- Make.com AI connector — time-series forecasting layer
- Hosted on Netlify 

---

## AI Disclosure
Forecasts in the AI Predictions tab use time-series modelling via the Make.com
AI connector. All predictions are estimates based on simulated mock data.
In production, this layer connects to real TRCN and Ministry of Education feeds.

---

## Scalability
- Data layer is fully modular — swap one file to use real government data
- Architecture is deployable for any of Nigeria's 36 states
- AI layer upgradeable from simulated to live ML models as real data becomes available

---

## Project Info
- **Competition:** 3MTT Knowledge Showcase Special Edition 2026
- **Organiser:** 3MTT Nigeria
- **Track:** AI and Machine Learning
- **Individual submission** by UmmulKulsum Attahiru

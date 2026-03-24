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

The data used in the app is simulated to show the how the app unifies data, identifies gaps, provides insight and possible solutions based on the data provided.

---

## What EduMap Kebbi Does
It allows stakeholders to have a detailed and informed overview of state of education in the kebbi state. 
These stakeholders are:
1. State Ministry of Education officials who need state‑wide visibility to set recruitment priorities, budget allocations, and reform rollout plans
2. LGA Education Secretaries who require LGA‑specific dashboards to track teacher deployment and school readiness within their jurisdiction
3. School Administrators who can view their school’s data, understand curriculum compliance gaps, and flag resource needs to supervisors
 
 It has an interactive, browser-based education intelligence dashboard with 6 modules:

| Module | What it shows |
|---|---|
| Overview | State-wide KPIs — teachers, students, SEN metrics, gap severity |
| Teacher Density | Heatmap of all 21 LGAs by teachers per 1,000 students |
| Teacher Registry | Searchable, filterable registry by LGA, subject, TRCN status, SEN cert |
| School Directory | All schools by type (Mainstream / SEN / Inclusive), location, LGA |
| Academic Health | 2025 curriculum reform readiness grid + WAEC/NECO performance trends |
| AI Predictions | Teacher shortage forecasts to 2026 + AI intervention recommendations |

---

## Impact
Enables data‑driven teacher recruitment by highlighting the most critical LGAs for immediate intervention
Surfaces invisible SEN gaps, allowing targeted deployment of specialised teachers to underserved areas
Provides the Ministry with a clear curriculum compliance map, showing which LGAs are ready for the 2025 reform and which require urgent vocational teacher training
Reduces decision‑making cycles from weeks of manual data collection to real‑time dashboard access
Empowers education leaders at state, LGA, and school levels with a common intelligence layer

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
EduMap Kebbi is built to scale in three directions. First, the data layer is fully modular — replacing mock data with real API feeds or government exports requires only a single file swap. Second, the architecture is state‑agnostic; the same codebase can be redeployed for any of Nigeria’s 36 states plus FCT by updating the LGA dataset and branding, creating a potential national Education Intelligence Network. Third, the AI prediction layer can be upgraded from simulated forecasts to live machine learning models as real historical data becomes available, enabling increasingly accurate staffing projections over time.

---

## Project Info
- **Competition:** 3MTT Knowledge Showcase Special Edition 2026
- **Organiser:** 3MTT Nigeria
- **Track:** AI and Machine Learning
- **Individual submission** by UmmulKulsum Attahiru

# EduMap Kebbi dashboard restructure

## Goal
Refocus the dashboard on teacher shortages, deployment accountability, school core-subject coverage, and actionable recommendations while preserving authentication, the existing header structure, and Kebbi’s green–gold–white identity.

## Navigation and shell
- Replace the six tabs with: Overview, Teacher Gaps, Deployment, Schools, AI Recommendations.
- Keep login protection, password recovery, sign-out, seal/map imagery, and role context on the sign-in page only.
- Change the header subtitle to “Teacher Deployment & Gap Intelligence — Kebbi State”.
- Keep the accurate KbSUBEB March 2025 source notice rather than labelling verified statewide figures as simulated.

## Shared data and estimation rules
- Add one transparent, deterministic estimate layer derived from existing LGA teacher gaps and enrolment figures.
- Calculate shortage severity as `teacher gap ÷ (reported teachers + teacher gap)`. LGAs without a reported teacher total will remain unclassified rather than receive a misleading percentage.
- Split each LGA’s total gap into estimated Maths, English, and Science needs using a documented, stable weighting; preserve each LGA’s total after rounding.
- Estimate classroom, admin/area-office, and unverified deployment by LGA using stable LGA characteristics, with every estimated figure visibly labelled.
- Add school-level Maths, English, and Science coverage states: qualified, absent, or unqualified/unverified.
- Remove SEN-primary metrics and vocational-readiness data from the active dashboard experience.

## Tab changes

### 1. Overview
- Replace the four cards with Total Teachers Deployed, LGAs at Critical Shortage, Subject Gaps Identified, and Teachers Misdeployed (Estimated).
- Keep the teacher-gap severity chart across all 21 LGAs.
- Change the second chart to Top 8 LGAs by Teacher Count, excluding pending teacher totals.
- Keep the DNEMIS reconciliation note and official-source context.

### 2. Teacher Gaps
- Replace the named-teacher registry with the full 21-LGA operational table.
- Columns: LGA, Schools, Total Teachers, Maths Gap, English Gap, Science Gap, Pupil:Teacher Ratio, Urgency.
- Mark all subject figures “(est.)”; preserve “Data pending” for missing official school or teacher totals.
- Add the gold verification banner and retain Low / Moderate / High / Critical colours.

### 3. Deployment
- Create a new tab with estimated statewide cards for classroom-posted, admin/area-office posted, and unaccounted/unverified teachers, including percentages.
- Add the 21-LGA deployment table with totals, categories, and status based on classroom share: green above 85%, amber from 65–85%, red below 65%.
- Add the amber data-quality banner and pending states where official LGA teacher totals are unavailable.

### 4. Schools
- Keep all existing filters and empty states.
- Replace the cards with Total Schools, Full Core Coverage, and At Least One Core Gap.
- Replace the free-text subjects column with compact Maths / English / Science coverage indicators using green checks, red crosses, and amber dashes, with accessible labels.
- Retain School Name, LGA, Type, Location, Students, and Disabled.

### 5. AI Recommendations
- Refocus the former AI Predictions screen around the recommendations table and remove SEN, vocational-readiness, forecasting, subject-demand, and recruitment-cost charts/cards.
- Add the DNEMIS verification banner and Highest Urgency LGAs card.
- Expand columns to LGA, Priority, Gap Type, Recommended Action, Est. Teachers Needed, Students Affected.
- Keep the Generate AI Report interaction and update its summary language to match the new focus.

## Global cleanup and validation
- Remove active UI references to SEN-certified teachers, vocational subjects/readiness, TRCN mandate/compliance, 2027 compliance, and curriculum reform readiness.
- Use existing semantic colour tokens and Button components for interactive controls.
- Update app-specific page title and sharing descriptions while preserving the existing hosted social image.
- Verify all five tabs, filters, banners, tables, modal, mobile navigation, missing-data states, and authenticated access at desktop and mobile widths.

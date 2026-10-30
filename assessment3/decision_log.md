# Assessment 3 — Decision Log

This document summarizes the technical decisions made for the interactive map, live weather API, privacy measures, performance optimizations, and SEO/AIO metadata. It is under 500 words as required.

## 1. Embed Choice & Rationale

I embedded a Google Maps view centered on the exact coordinates of the Kananaskis Falls trailhead (50.88790, -115.13840). This provides a precise, familiar, and visual reference point for users exploring Alberta trails. Google Maps was chosen because it is reliable, widely supported, and offers responsive embedding without additional libraries.

The embed is wrapped in a responsive container to prevent layout shifts and improve Lighthouse performance. Lazy loading is applied to reduce initial page weight.

## 2. API Choice & Rationale

I used the **Open‑Meteo API** to fetch real‑time weather for Kananaskis Falls. Reasons for choosing Open‑Meteo:

- No API key required (ideal for student projects).
- Returns simple JSON with `current_weather`.
- Fast response times and good uptime.
- No cookies or user tracking.

The JavaScript uses `fetch()` with error handling, a fallback message for network failures, and graceful UI updates. The weather data is tied directly to the same coordinates used in the map embed for consistency.

## 3. Privacy & Tracking Measures

To reduce third‑party tracking:

- Added `<meta name="referrer" content="strict-origin-when-cross-origin">` globally.
- Used `referrerpolicy="no-referrer-when-downgrade"` on the map embed.
- Applied `sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"` to limit iframe capabilities.
- Enabled lazy loading to avoid unnecessary early requests.

**Residual tracking:**  
Google Maps may still collect IP‑based analytics, device information, and usage metrics. This cannot be fully disabled in an embedded context, but it is documented here as required.

## 4. Performance & Asset Optimization

Steps taken:

- Converted the hero image to **AVIF** and **WebP**, with a JPEG fallback using a `<picture>` element.
- Added explicit width/height attributes to reduce layout shifts.
- Lazy‑loaded all images and the iframe.
- Wrote minimal custom CSS (no frameworks → no unused CSS).
- Ensured JavaScript is module‑scoped and non‑blocking.

**Lighthouse Mobile Scores:**  
Performance ≥ 90  
SEO ≥ 90  
(Actual scores will be updated after final testing.)

## 5. SEO & AIO Metadata Added

I added the following metadata:

- `<title>` with clear keywords.
- `<meta name="description">` describing the page purpose.
- `<meta name="author">`.
- `<meta name="robots" content="index,follow">`.
- Open Graph tags:
  - `og:title`
  - `og:description`
  - `og:type`
  - `og:url`
  - `og:image`

These improve search engine visibility and social media previews.

## 6. Branching & Merge Strategy

Assessment 3 was developed in an isolated feature branch.  
Once validated, optimized, and Lighthouse‑tested, the branch will be **squash‑merged** into the main Kananaskis Trails repo containing Assessments 1 and 2.
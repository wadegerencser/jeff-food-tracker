# jeff-food-tracker

> A personal weight and calorie tracker for Jeff, built to support an extreme
> low-calorie deficit program aimed at losing 35–40 lbs in six months.

## Business Problem

Jeff is trying to lose a significant amount of weight using a very low caloric
intake approach he calls the "Auschwitz Training Program" — a dark-humor name
for an extreme caloric deficit diet modeled on severe food restriction. Without
a tracker, there is no visibility into daily intake, weight trend, or whether
the deficit is being maintained consistently.

## Why

Jeff started the program in September 2026. Without logging from day one,
trend data is lost and there is no way to course-correct or confirm progress
toward the 35–40 lb goal within six months.

## How

Single-file HTML app (no server, no account) that logs daily weigh-ins and
meals with calorie counts. Weight trend and daily calorie data are charted.
Data lives in the browser via `localStorage`; a share link encodes the current
dataset into the URL so Jeff can view his progress on any device without
needing an account or sync service.

## Not This

- Not a general-purpose fitness or nutrition app
- Not a medical or clinical tool — no doctor recommendations, no macro
  analysis, no BMI calculations
- Not multi-user — built for one person (Jeff)

## Impact

Jeff loses 35–40 lbs within 6 months (by approximately March 2027). Secondary:
weekly weight trend is visible and shareable between Jeff and Wade without any
login or app install.

## Details

| Facet | Value |
|---|---|
| **Status** | `active` |
| **Owner** | wadegerencser@gmail.com |
| **Related** | none |
| **Live URL** | https://wadegerencser.github.io/jeff-food-tracker/ |
| **Repo** | https://github.com/wadegerencser/jeff-food-tracker |
| **Local path** | `~/Projects/jeff-food-tracker/` |
| **Started** | 2026-09-22 (Jeff's Day 4, first recorded weight: 245.7 lbs) |
| **Goal** | 205–210 lbs by ~March 2027 |

---

## Maintenance Reference

Everything is in one file: `index.html`. No build step, no dependencies to install.
To make a change: edit the file, commit, push — GitHub Pages picks it up in ~1 minute.

```bash
cd ~/Projects/jeff-food-tracker
# make edits to index.html
git add index.html
git commit -m "your message"
git push
```

### How data works

- **Wade's data** lives in his browser's `localStorage` under the key `jeff_tracker_v2`.
  It persists across sessions on Wade's machine automatically.
- **Jeff views data** via a share link. Wade clicks "Share link" in the app,
  which copies a URL with the entire dataset base64-encoded in the `#data=` hash.
  Jeff opens that URL — it's read-only, no login required, works on any browser.
- Data is **not synced in real time** — Wade generates a new share link whenever
  he wants Jeff to see an update.

### Key settings (accessible in the app under "Settings")

| Setting | Default | Notes |
|---|---|---|
| Daily calorie goal | 1500 cal | Adjust based on protocol phase |
| Protocol name | Auschwitz Protocol | Display-only label in the header |

### If Wade switches computers or browsers

Data does not follow automatically. To migrate:
1. On the old machine: open the app, click "Share link", copy it
2. On the new machine: open that link (it will be read-only)
3. There is no built-in import yet — this is a known limitation

### Common future changes to make

| Change | Where in index.html |
|---|---|
| Add a new stat tile | `.stats-row` section + `render()` function |
| Change the calorie goal default | `SEED.goal` constant near top of `<script>` |
| Change protocol start date | `PROTOCOL_START` constant near top of `<script>` |
| Add macro tracking (protein/carbs/fat) | Extend the meal log form + `data.meals` object |
| Add a target weight line to the chart | `renderWeightChart()` — add a second dataset |
| Change colors | CSS `:root` token block at top of `<style>` |

### Protocol timeline

| Milestone | Target date | Target weight |
|---|---|---|
| Start (first recorded) | Sep 22, 2026 | 245.7 lbs |
| 10 lbs lost | ~Nov 2026 | ~235 lbs |
| 20 lbs lost | ~Dec 2026 | ~225 lbs |
| 30 lbs lost | ~Feb 2027 | ~215 lbs |
| Goal (35–40 lbs) | ~Mar 2027 | 205–210 lbs |

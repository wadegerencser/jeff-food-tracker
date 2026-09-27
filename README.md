# Jeff's Diet Program

> Jeff's personal calorie and weight tracker — built for one person and one goal. Not a general-purpose app.

## Business Problem

Jeff has no visibility into his daily calorie intake or output. Without logging, there is no way to know whether a calorie deficit is being maintained, where it is breaking down, or whether the program is working. His current workaround is guesswork — no app, no log, nothing to course-correct from.

## Why

Jeff is on the verge of a type 2 diabetes diagnosis. If his weight doesn't come down now, he may be forced out of his current role and into a trucking position. The window to reverse course without medical intervention is closing. Every week without a log is a week of trend data that can't be recovered.

## How

Single-file HTML app (no server, no account) built exclusively for Jeff that logs daily weigh-ins (to the tenth of a pound, e.g. 243.6 lbs) and meals with calorie counts. Weight trend and daily calorie data are charted. Data lives in the browser via `localStorage`; a share link encodes the current dataset into the URL so Jeff can view his progress on any device without needing an account or sync service.

### Real-time logging, not end-of-day reconstruction

The original version only worked if Jeff sat down at night and remembered everything he'd eaten. That failed in practice — one night he ate ~1,200 calories in a single restaurant sitting because he had no visibility into his running total before he ordered. The app now assumes Jeff opens it several times a day — before breakfast, before lunch, before dinner, before eating out — not once at bedtime:

- **Meal-type + time tracking.** Every meal is tagged Breakfast/Lunch/Dinner/Snack with a timestamp (`#mMealType`, `#mTime` in the Add Meal form), and Today's Food groups entries under those headers instead of one flat list.
- **Breakfast/Lunch/Dinner checklist pills** in the today panel show at a glance which of the day's 3 checkpoints are still unlogged (`#mealChecklist`, built in `render()`).
- **Pre-meal budget nudge.** The Add Meal card itself shows "You have N cal left for today before this meal" (`#mealBudgetNudge`), computed fresh from `goal - todayCals` every render — so the number Jeff needs *before* he orders is right where he's about to log, not buried in a stat tile elsewhere.
- **Recent foods.** The food search dropdown surfaces Jeff's last 5 distinct logged foods above the alphabetical list (`recentFoods()` in the food-picker IIFE) so a repeat meal is a 1-tap log, not a 3-tap search.
- **Logging streak.** A 🔥 streak badge next to "Day N" in the header counts consecutive days with at least one meal logged (`loggingStreak()`), hidden until it reaches 2+ days — a small habit-loop incentive to keep opening the app.

### Calorie tracking: ring + exercise, not just a static bar

Today's calorie progress is a circular ring (`#calRingFill`, SVG `stroke-dashoffset` animated on `%`  of daily goal) rather than a linear bar — chosen specifically to feel more like a "fill it in" habit-tracker than a flat progress meter. It turns from the accent color to red past 100% of goal.

Exercise is a first-class entry alongside meals, not an afterthought: `data.exercise` is a parallel array to `data.meals`, logged via a searchable activity picker (`EXERCISES` array + `#eActSearch`) with a duration field that auto-calculates calories burned (`calories per 30 min × duration/30`), still hand-editable afterward like the food picker.

### Deficit / pace: is Jeff actually going to make it?

A weekly red/green "zone" banner (`renderZoneBanner()`) answers the real question — not "did I eat too much today" but "given everything I've eaten *and* burned this week, am I still on track to hit my weight-loss pace." The math, using the standard 3,500 kcal ≈ 1 lb rule:

```
weeklyAllowance = dailyGoal × 7 + weeklyCaloriesBurned   (7-day rolling window)
weeklyBalance   = weeklyAllowance − weeklyCaloriesConsumed
projectedLoss   = weeklyLossGoal + weeklyBalance / 3500
zone            = green if weeklyBalance ≥ 0, else red
```

This means a heavy-eating day isn't necessarily "red" if exercise offsets it, and a red day isn't a moral failure — it's exactly the information Jeff needs *before* deciding whether to be stricter tomorrow. `weeklyLossGoal` (default 1.5 lbs/week — the middle of the CDC/Mayo Clinic-recommended 1–2 lbs/week safe range) is editable in Settings as the target pace changes over the program.

## Not This

Not a general-purpose fitness or nutrition app. Not a medical or clinical tool — no doctor recommendations, no macro breakdowns, no medication tracking, no BMI calculations, and no substitute for the physician monitoring Jeff's diabetes risk. Not multi-user or cloud-synced.

## Impact

Jeff reaches 225 lbs within 6 months (by approximately March 2027), reducing his type 2 diabetes risk and preserving his current career path. Secondary: Wade and Jeff have a shared, up-to-date view of daily progress without any login or app install required.

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
| **Goal** | 225 lbs by ~March 2027 |

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
| Protocol name | Jeff's 225 Program | Display-only label in the header |

### If Wade switches computers or browsers

Data does not follow automatically. To migrate:
1. On the old machine: open the app, click "Share link", copy it
2. On the new machine: open that link (it will be read-only)
3. There is no built-in import yet — this is a known limitation

### Daily email reminders (optional, separate infrastructure)

`functions/` contains a Firebase Cloud Function (`morningLogReminder`, `noonLogReminder`, `eveningLogReminder`) that emails Jeff at 8:00am, 12:00pm, and 5:30pm America/Phoenix daily, indefinitely, once deployed — a link straight back to this app plus a one-line nudge to log. This is genuinely separate infrastructure from the static site (needs Firebase Blaze billing + a SendGrid account), not wired up by default. See `REMINDER_SETUP.md` for the one-time setup steps. No real email address, phone number, or API key is ever committed to this repo — they're stored as Firebase Secret Manager values, referenced by name only.

### Common future changes to make

| Change | Where in index.html |
|---|---|
| Add a new stat tile | `.stats-row` section + `render()` function |
| Change the calorie goal default | `SEED.goal` constant near top of `<script>` |
| Change protocol start date | `PROTOCOL_START` constant near top of `<script>` |
| Add macro tracking (protein/carbs/fat) | Extend the meal log form + `data.meals` object |
| Add a target weight line to the chart | `renderWeightChart()` — add a second dataset |
| Change colors | CSS `:root` token block at top of `<style>` |
| Change meal type options (breakfast/lunch/dinner/snack) | `#mMealType` options + `MEAL_ORDER`/`MEAL_LABEL` in `render()` |
| Add a field to exercise entries | `#logExerciseBtn` handler + `data.exercise` object |
| Change the weekly loss goal default | `DEFAULT_DATA.weeklyLossGoal` constant near top of `<script>` |

### Protocol timeline

| Milestone | Target date | Target weight |
|---|---|---|
| Start (first recorded) | Sep 22, 2026 | 245.7 lbs |
| 10 lbs lost | ~Nov 2026 | ~235 lbs |
| 20 lbs lost | ~Dec 2026 | ~225 lbs |
| 30 lbs lost | ~Feb 2027 | ~215 lbs |
| Goal (35–40 lbs) | ~Mar 2027 | 205–210 lbs |

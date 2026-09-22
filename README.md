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

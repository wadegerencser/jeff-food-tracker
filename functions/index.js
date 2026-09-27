const { onSchedule } = require('firebase-functions/v2/scheduler');
const { defineSecret } = require('firebase-functions/params');
const sgMail = require('@sendgrid/mail');

// Set with:
//   firebase functions:secrets:set SENDGRID_API_KEY
//   firebase functions:secrets:set JEFF_EMAIL
//   firebase functions:secrets:set FROM_EMAIL
// Never commit real values for these — they are pulled from Secret Manager at
// runtime, not from this file or any file in the repo.
const SENDGRID_API_KEY = defineSecret('SENDGRID_API_KEY');
const JEFF_EMAIL        = defineSecret('JEFF_EMAIL');
const FROM_EMAIL        = defineSecret('FROM_EMAIL');

const TRACKER_URL = 'https://wadegerencser.github.io/jeff-food-tracker/';

async function sendReminder(subject, blurb) {
  sgMail.setApiKey(SENDGRID_API_KEY.value());
  await sgMail.send({
    to: JEFF_EMAIL.value(),
    from: FROM_EMAIL.value(),
    subject,
    text: `${blurb}\n\n${TRACKER_URL}\n\nLogging before you eat (not after) is what actually helps — check your remaining calories before you order or sit down to eat.`,
    html: `<p>${blurb}</p><p><a href="${TRACKER_URL}">Open the tracker</a></p><p>Logging before you eat (not after) is what actually helps — check your remaining calories before you order or sit down to eat.</p>`,
  });
}

const SCHEDULE_OPTS = (cron) => ({
  schedule: cron,
  timeZone: 'America/Phoenix',
  secrets: [SENDGRID_API_KEY, JEFF_EMAIL, FROM_EMAIL],
});

exports.morningLogReminder = onSchedule(
  SCHEDULE_OPTS('0 8 * * *'),
  async () => sendReminder(
    "Morning, Jeff — log today's food & exercise",
    "Quick reminder to open Jeff's Tracker and log your meals and exercise for today."
  )
);

exports.noonLogReminder = onSchedule(
  SCHEDULE_OPTS('0 12 * * *'),
  async () => sendReminder(
    'Midday check-in — log your morning',
    "Quick midday reminder to log what you've eaten and any exercise so far today."
  )
);

exports.eveningLogReminder = onSchedule(
  SCHEDULE_OPTS('30 17 * * *'),
  async () => sendReminder(
    'Evening check-in — log before dinner',
    "Quick reminder before dinner — log what you've had today and check your remaining calories."
  )
);

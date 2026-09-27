# Daily Reminder Email — One-Time Setup

Sends Jeff a reminder email every day at 8am America/Phoenix to log food and exercise. Deployed as a Firebase Cloud Function (`functions/index.js`). Do this once.

1. Install function dependencies:
   ```bash
   cd ~/Projects/jeff-food-tracker/functions && npm install
   ```

2. Log in to Firebase:
   ```bash
   firebase login
   ```

3. Point the CLI at this project:
   ```bash
   firebase use jeff-tracker
   ```

4. Confirm the project is on the **Blaze** (pay-as-you-go) plan. Cloud Functions + Cloud Scheduler cannot call out to SendGrid on the free Spark plan — check/upgrade at:
   https://console.firebase.google.com/project/jeff-tracker/usage/details

5. Create a free SendGrid account at https://sendgrid.com and verify a sender identity — the "from" address you'll send as. SendGrid will not deliver mail from an unverified sender.

6. Generate a SendGrid API key: Settings → API Keys → Create API Key → Restricted Access → enable Mail Send only.

7. Set the three secrets. Enter each value at the interactive prompt — never pass it as a command-line argument, since that leaks into shell history:
   ```bash
   firebase functions:secrets:set SENDGRID_API_KEY
   firebase functions:secrets:set JEFF_EMAIL
   firebase functions:secrets:set FROM_EMAIL
   ```

8. Deploy:
   ```bash
   firebase deploy --only functions
   ```

9. Verify it's live:
   ```bash
   firebase functions:log
   ```
   or check the Cloud Functions console. Once deployed, three functions fire automatically every day, America/Phoenix time, and continue indefinitely until deleted or disabled — no further action needed:
   - `morningLogReminder` — 8:00am
   - `noonLogReminder` — 12:00pm
   - `eveningLogReminder` — 5:30pm

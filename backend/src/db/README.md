# 🗄️ Driving School Backend Guide & API Integrations

## Overview

This directory contains the database schema migrations, seed scripts, and real notification integrations for the Drivinity Driving Academy REST API backend.

---

## 📁 Directory Structure

```
backend/src/
├── db/
│   ├── database.ts                      # Postgres pool connection & graceful fallback
│   ├── migrate.ts                       # Idempotent Migration Runner
│   ├── seed.ts                          # Initial database seed script
│   └── migrations/
│       ├── 001_initial_schema.sql        # Initial core tables
│       ├── 002_extend_driving_school_schema.sql # Core entities (users, instructors, vehicles, skills, badges)
│       └── 003_vehicle_unique_index.sql # Partial unique index on vehicles
├── services/
│   ├── badgeEngine.ts                   # Badge criteria evaluation engine
│   └── notificationService.ts           # Brevo Email & Twilio SMS provider integration
└── jobs/
    └── reminderCron.ts                  # Daily 08:00 AM booking reminder cron job
```

---

## 📧 Email (Brevo / Sendinblue) & 📱 SMS (Twilio) Setup Guide

### 1. Brevo Transactional Email Setup
1. Create or log in to your Brevo account at [brevo.com](https://www.brevo.com).
2. Obtain your API Key from [https://app.brevo.com/settings/keys/api](https://app.brevo.com/settings/keys/api).
3. Verify your sender email address at [https://app.brevo.com/senders](https://app.brevo.com/senders).
4. Add the following to your `backend/.env` file:
   ```env
   BREVO_API_KEY=xkeysib-your_brevo_api_key_here
   BREVO_SENDER_EMAIL=your_verified_sender@example.com
   ```

### 2. Twilio SMS Setup
1. Create an account at [twilio.com](https://twilio.com).
2. From your Twilio Console Dashboard, copy:
   - **Account SID** (starts with `AC...`)
   - **Auth Token**
   - **Twilio Phone Number** (e.g. `+1...` or Australian sender number)
3. Add to `backend/.env`:
   ```env
   TWILIO_ACCOUNT_SID=ACyour_twilio_account_sid_here
   TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
   TWILIO_PHONE_NUMBER=+61400000000
   ```

> **Note on Environment Fallback**: If `BREVO_API_KEY` or Twilio credentials are omitted from `.env`, the server logs a warning on startup and safely executes notification calls in graceful no-op mode without throwing exceptions or interrupting booking transactions.

---

## 🚀 How to Run Migrations & Seeds

### 1. Run Migrations Only
```bash
cd backend
npm run migrate
```

### 2. Run Seed Script Only
```bash
cd backend
npm run seed
```

### 3. Automatic Run on Server Startup
Running `npm run dev` automatically verifies PostgreSQL connectivity, executes pending migrations, populates seed data, initializes notification provider checks, and schedules the daily 08:00 AM reminder cron.

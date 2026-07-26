# Sakha Tax Consultancy — Backend API

Node.js + Express + MongoDB backend powering the contact form, email/SMS notifications, and the admin dashboard for Sakha Tax Consultancy.

## Tech Stack

- **Node.js / Express 5**
- **MongoDB / Mongoose**
- **JWT** authentication (admin dashboard)
- **Nodemailer** — email notifications
- **Twilio** — SMS notifications
- **express-validator** — request validation
- **Helmet, CORS, express-rate-limit** — security
- Custom Mongo-injection sanitization middleware (Express 5-safe — see note below)

## Getting Started

```bash
npm install
cp .env.example .env     # fill in real values — see table below
```

You need a running MongoDB instance. Either:
- Local: `mongod` running on `mongodb://127.0.0.1:27017`, or
- Cloud: a MongoDB Atlas connection string in `MONGODB_URI`

Then:

```bash
npm run seed:admin   # creates the first admin login for the dashboard
npm run dev          # starts on http://localhost:5000 with nodemon
```

## Scripts

| Command              | Description                                      |
|-----------------------|---------------------------------------------------|
| `npm run dev`          | Start with nodemon (auto-restart on changes)     |
| `npm start`             | Start in production mode                          |
| `npm run seed:admin`    | Create/update the first admin user for dashboard login |

## Folder Structure

```
server/
  config/        env.js (env loader/validation), db.js (Mongoose connection)
  controllers/    contactController, authController, inquiryController
  middleware/     auth (JWT protect), sanitize, rateLimiter, errorHandler
  models/         Inquiry.js, Admin.js
  routes/         contactRoutes, authRoutes, inquiryRoutes, index.js
  services/       emailService.js (Nodemailer), smsService.js (Twilio)
  utils/          asyncHandler, ApiError, generateToken, csvExport, seedAdmin
  validators/     contactValidator, authValidator, inquiryValidator
  app.js          Express app (middleware + routes)
  server.js       Entry point (DB connect + listen + graceful shutdown)
```

## API Documentation

Base URL: `{PORT}/api` (default `http://localhost:5000/api`)

### Public

**POST `/contact`** — submit a contact/inquiry form
```json
// Request
{
  "name": "Priya Shah",
  "mobile": "9876543210",
  "email": "priya@example.com",
  "service": "GST Registration",
  "message": "Need to register a new shop for GST."
}
```
```json
// 201 Response
{
  "success": true,
  "message": "Thank you for contacting Sakha Tax Consultancy. Our team has received your inquiry.",
  "data": { "id": "...", "name": "Priya Shah", "status": "New", "createdAt": "..." }
}
```
Validation errors return `400` with a `details` array. Duplicate submissions (same mobile number within 5 minutes) return `429`. Rate limited to 5 requests / 15 minutes per IP.

**GET `/health`** — service health check

### Auth

**POST `/auth/login`** — admin login
```json
// Request
{ "email": "admin@sakhatax.com", "password": "ChangeMe@123" }
```
```json
// 200 Response
{ "success": true, "data": { "token": "<jwt>", "admin": { "id": "...", "name": "...", "email": "..." } } }
```
Rate limited to 10 attempts / 15 minutes per IP.

**GET `/auth/me`** — current admin (requires `Authorization: Bearer <token>`)

### Admin — Inquiries (all require `Authorization: Bearer <token>`)

| Method | Route                     | Description                                      |
|--------|---------------------------|---------------------------------------------------|
| GET    | `/inquiries/stats`        | Dashboard cards: total, today, pending, completed |
| GET    | `/inquiries`               | List, paginated — query: `page`, `limit`, `search`, `status` |
| PATCH  | `/inquiries/:id/status`    | Update status — body: `{ "status": "Pending" }`   |
| DELETE | `/inquiries/:id`           | Delete an inquiry                                  |
| GET    | `/inquiries/export`        | Download CSV — optional query: `status`           |

## Environment Variables

| Variable               | Required | Description                                    |
|--------------------------|----------|--------------------------------------------------|
| `NODE_ENV`                | no       | `development` / `production`                     |
| `PORT`                     | no       | Defaults to `5000`                                |
| `CLIENT_URL`               | yes      | Frontend origin, used for CORS                    |
| `MONGODB_URI`               | yes      | MongoDB connection string                         |
| `JWT_SECRET`                | yes      | Long random string for signing JWTs                |
| `JWT_EXPIRES_IN`            | no       | Defaults to `7d`                                   |
| `EMAIL_HOST/PORT/USER/PASS` | no*      | SMTP credentials for Nodemailer                     |
| `OWNER_EMAIL`               | no*      | Where inquiry notification emails are sent          |
| `TWILIO_ACCOUNT_SID/AUTH_TOKEN/PHONE` | no* | Twilio credentials for SMS                |
| `OWNER_PHONE`               | no*      | Where inquiry notification SMS are sent             |
| `SEED_ADMIN_*`              | no       | Used only by `npm run seed:admin`                   |

\* Email/SMS are optional at runtime — if unset, the contact form still works and inquiries still save to MongoDB; notifications are just skipped (logged as a warning) rather than causing errors.

## Security Notes

- All inputs are validated with `express-validator` and sanitized against NoSQL injection via a custom middleware (`server/middleware/sanitize.js`). Note: the popular `express-mongo-sanitize` package reassigns `req.query`, which throws under Express 5 (where `req.query` is a read-only getter) — this project uses its own in-place-mutation sanitizer instead.
- Passwords are hashed with bcrypt (12 salt rounds).
- Rate limiting is applied globally and more strictly on `/contact` and `/auth/login`.
- `helmet()` sets standard security headers; CORS is restricted to `CLIENT_URL`.

## Deployment Guide

1. Provision MongoDB (Atlas recommended) and set `MONGODB_URI`.
2. Set all required env vars on your host (Render, Railway, EC2, etc.).
3. Run `npm run seed:admin` once against production `MONGODB_URI` to create the first admin login, then change the password after first login (there is currently no self-service change-password endpoint — extend `authController.js` to add one before going live with a real team).
4. Run `npm start` (or point your process manager, e.g. PM2, at `server/server.js`).
5. Set the frontend's `VITE_API_URL` to this API's public URL + `/api`.
6. Put the API behind HTTPS (e.g. via a reverse proxy or platform-provided TLS) — Helmet assumes a secure transport for full effect.

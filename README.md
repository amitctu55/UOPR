# UPCHAR — Enterprise Healthcare Platform

Secure, scalable healthcare management for patients, doctors, hospitals, and administrators.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS (`web/`) |
| State | Zustand (auth/theme), TanStack React Query |
| Backend | FastAPI (`app/`) with JWT-style session tokens + MFA demo |
| Charts | Recharts |

## Quick start

```bash
# Install Python + Node deps
.cursor/scripts/install.sh

# Terminal A — API on :8000
.cursor/scripts/start-dev.sh

# Terminal B — Web on :3000
.cursor/scripts/start-web.sh
```

Or manually:

```bash
source .venv/bin/activate && uvicorn app.main:app --reload --port 8000
npm --prefix web run dev
```

## Demo login

1. Open http://localhost:3000/login  
2. Pick a **demo role**  
3. Enter any **6-digit MFA code**  

API docs: http://localhost:8000/docs  

## Tests

```bash
source .venv/bin/activate
pytest
npm --prefix web run lint
npm --prefix web run build
```

## App map

- Landing `/`
- Auth `/login` `/register` `/mfa` `/forgot-password` `/verify-email`
- Dashboards `/dashboard/{patient,doctor,hospital,admin}`
- Modules appointments, patients, telemedicine, EHR, billing, reports, settings, messages, monitoring

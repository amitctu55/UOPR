# UPCHAR — Enterprise Healthcare Platform

Secure, scalable healthcare management for patients, doctors, hospitals, and administrators.

## Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **State:** Zustand (auth + theme), TanStack React Query
- **Charts:** Recharts
- **Icons:** Lucide (line icons)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo login

1. Go to **Log in**
2. Choose a **demo role** (Patient, Doctor, Hospital Admin, System Admin)
3. Continue and enter any **6-digit MFA code**

## App map

| Area | Routes |
|------|--------|
| Landing | `/` |
| Auth | `/login`, `/register`, `/mfa`, `/forgot-password`, `/verify-email` |
| Role dashboards | `/dashboard/patient`, `/doctor`, `/hospital`, `/admin` |
| Modules | `/dashboard/appointments`, `/patients/[id]`, `/telemedicine/[id]`, `/ehr/[id]`, `/billing`, `/reports`, `/settings`, `/messages`, `/monitoring` |

## Design

- Typography: **Sora** (display) + **Figtree** (UI)
- Palette: teal / care-green surfaces with coral / amber alerts
- Light + dark mode (toggle in header)
- Custom Tailwind components (no third-party UI kit)

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

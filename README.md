# RHRS Website (rhrsdemo2)

Rashtriya Hindu Rakshak Sangh — public website + admin panel.

## Stack
- **Frontend**: React 19 + Vite + Tailwind CSS v4 (existing SPA)
- **Backend**: Vercel serverless functions (`/api/*`)
- **Database & Storage**: Supabase (Postgres + file storage for gallery photos)
- **PDF generation**: `@react-pdf/renderer` (client-side, print-ready branded documents)

## Features
- **Member Services** (`#idcard`): ID Card, Appointment Letter, Donation Payment Slip — form bharne par server se official number milta hai, aur branded print-ready PDF download hota hai. Record DB me save hota hai.
- **Parikshan**: Registration form submits to backend with success confirmation.
- **Gallery**: Real photos rendered from the database (Events / Issues & Alerts tabs).
- **Admin Panel** (`/admin`): Login karke gallery manage karein — photos upload (drag-drop), title/caption/category edit, visible toggle, reorder, delete. Sath hi members/appointments/payments/registrations ke recent records dekhein.

## Setup

### 1. Supabase
- Supabase project banayein aur **SQL Editor** me `supabase/schema.sql` run karein (tables + `sequences` + `next_sequence()` + public `gallery` storage bucket).
- Supabase dashboard → **Project Settings → API** se `Project URL` aur `service_role` key copy karein.

### 2. Environment variables
Copy `.env.example` ko `.env` me (local `vercel dev` ke liye), ya Vercel dashboard → Settings → Environment Variables me ye set karein:

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-password
JWT_SECRET=long-random-string
```

> `service_role` key kabhi browser/frontend me expose nahi hoti — sirf `/api` functions me use hoti hai. `ADMIN_PASSWORD` aur `JWT_SECRET` ko strong rakhein.

### 3. Run locally
```bash
npm install
vercel dev      # site + api functions dono localhost par
```

Ya sirf frontend: `npm run dev`.

### 4. Deploy
Push karke Vercel se deploy karein (project `rhrsdemo2` already linked). Vercel `/api` folder ko automatically serverless functions ki tarah serve karta hai.

## API Endpoints
| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/login` | – | Admin login → JWT token |
| POST | `/api/members` | – | Create member, returns `member_id` |
| POST | `/api/appointments` | – | Create appointment, returns `appointment_no` |
| POST | `/api/payments` | – | Create payment, returns `receipt_no` |
| POST | `/api/parikshan` | – | Save parikshan registration |
| GET | `/api/gallery` | – | Public visible gallery photos |
| GET | `/api/admin/gallery` | ✅ | All photos (admin) |
| POST | `/api/admin/gallery` | ✅ | Add photo metadata |
| PATCH/DELETE | `/api/admin/gallery/[id]` | ✅ | Update / delete photo |
| POST | `/api/admin/upload-url` | ✅ | Signed upload URL for photo |
| GET | `/api/admin/records` | ✅ | Recent records for dashboard |

## Project structure
```
api/                 Vercel serverless functions (backend)
  _lib/              http helpers, supabase client, JWT auth, id generator
  login.js           admin login
  members.js / appointments.js / payments.js / parikshan.js
  gallery.js         public gallery
  admin/             admin-protected endpoints
public/fonts/        Devanagari fonts (Noto Sans Devanagari) for PDFs
src/
  pdfs/              @react-pdf documents (IdCard / Appointment / PaymentSlip)
  components/        site sections
  admin/             admin panel (login, dashboard, gallery manager, records)
  lib/api.js         fetch helpers
supabase/schema.sql  database schema + bucket setup
```

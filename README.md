# Dream Deco — Enterprise Authentication & Full-Stack Monorepo

Modern, clean, minimalist Black & White enterprise Authentication application built with **React**, **Vite**, **TypeScript**, **Node.js Express**, and **MongoDB Atlas**.

---

## 🌐 Live Production Deployment Registry

- **Frontend (Vercel)**: [https://dream-deco.vercel.app/](https://dream-deco.vercel.app/)
- **Backend API (Render)**: [https://dream-deco.onrender.com](https://dream-deco.onrender.com)
- **Database (MongoDB Atlas)**: `mongodb+srv://priyankpanchal2431_db_user:L2paoybODsSlJ0QC@dream-deco.widlbei.mongodb.net/dream_deco?retryWrites=true&w=majority`

---

## 📁 Explicit Explorer Directory Structure

```
Dream Deco/
├── frontend/                     # [ALL FRONTEND & UI CODE]
│   ├── public/                   # Static assets & favicons
│   ├── src/
│   │   ├── components/
│   │   │   ├── buttons/          # Button.tsx, Checkbox.tsx
│   │   │   ├── inputs/           # InputField.tsx
│   │   │   ├── layout/           # AuthLayout.tsx, Alert.tsx, Logo.tsx
│   │   │   └── pages/            # LoginForm, RegisterForm, ForgotPasswordForm, Dashboard
│   │   ├── functions/            # apiClient.ts, authService.ts (API client & auth functions)
│   │   ├── styles/               # CSS design tokens & stylesheets
│   │   ├── types/                # TypeScript interface definitions
│   │   ├── App.tsx               # Main view router
│   │   └── main.tsx              # React entry point
│   ├── index.html                # HTML shell
│   ├── package.json              # Frontend dependencies
│   ├── tsconfig.json             # TypeScript configuration
│   ├── vercel.json               # Vercel deployment rules
│   └── vite.config.ts            # Vite build configuration
│
├── backend/                      # [ALL BACKEND SERVER & DATABASE CODE]
│   ├── database/                 # db.js (MongoDB Connection) & User.js (User Schema)
│   ├── functions/                # authController.js (Register, Login, Reset Password logic)
│   ├── routes/                   # authRoutes.js (API REST endpoints)
│   ├── .env                    # Local credentials & secrets
│   ├── .env.example            # Environment template for Render
│   ├── index.js                # Express server entry point & health check
│   └── package.json            # Backend dependencies
│
├── package.json                  # Root monorepo script launcher ("npm run dev")
├── render.yaml                   # Render deployment manifest (rootDir: backend)
└── README.md                     # Monorepo navigation guide
```

---

## 🚀 Running Locally

```bash
# 1. Install all dependencies across workspace
npm run install:all

# 2. Start full-stack dev environment (Backend: 5001, Frontend: 5173)
npm run dev
```

Or run individual services:
```bash
# Start Backend Server only
npm run dev:backend

# Start Frontend UI only
npm run dev:frontend
```

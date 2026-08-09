# Dream Deco — Enterprise Authentication & Full-Stack Monorepo

Modern, clean, minimalist Black & White enterprise Authentication application built with **React**, **Vite**, **TypeScript**, **Node.js Express**, and **MongoDB Atlas**.

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
│   │   │   └── pages/            # Login, Register, Forgot Password, Dashboard
│   │   ├── functions/            # apiClient.ts, authService.ts (API logic & functions)
│   │   ├── styles/               # CSS design tokens & stylesheets
│   │   ├── types/                # TypeScript interface definitions
│   │   ├── App.tsx               # View router
│   │   └── main.tsx              # App entry point
│   ├── index.html                # HTML shell
│   ├── package.json              # Frontend dependencies
│   ├── tsconfig.json             # TypeScript configuration
│   ├── vercel.json               # Vercel SPA deployment rules
│   └── vite.config.ts            # Vite build configuration
│
├── backend/                      # [ALL BACKEND SERVER & DATABASE CODE]
│   ├── database/                 # MongoDB Atlas connection (db.js) & User schema (User.js)
│   ├── functions/                # API handlers & auth functions (authController.js)
│   ├── routes/                   # API REST endpoints (authRoutes.js)
│   ├── .env                    # Local credentials & secrets
│   ├── .env.example            # Environment template for Render
│   ├── index.js                # Express server entry point & health check
│   └── package.json            # Backend dependencies
│
├── package.json                  # Root monorepo script launcher ("npm run dev")
├── render.yaml                   # Render deployment manifest (rootDir: backend)
└── README.md                     # Full-stack documentation
```

---

## 🚀 Running Locally

To run both the **Backend Server (port 5001)** and **Frontend Application (port 5173)** simultaneously from the root directory:

```bash
# 1. Install all dependencies across workspace
npm run install:all

# 2. Start full-stack dev environment
npm run dev
```

Or run individual services:
```bash
# Start Backend Server only
npm run dev:backend

# Start Frontend UI only
npm run dev:frontend
```

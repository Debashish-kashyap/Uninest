# UniNest

UniNest is a student accommodation platform with a React/Vite frontend and an Express/MongoDB backend.

## Requirements

- Node.js 18 or newer
- MongoDB, or the backend's in-memory fallback for local development

## Run locally

Install dependencies in each package:

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm start
```

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

The backend runs on `http://localhost:5000` by default. Set `MONGO_URI` and `JWT_SECRET` in `backend/.env` before using a persistent database or deploying. Never commit `.env`.

## Build frontend

```powershell
cd frontend
npm run build
```

## Project layout

- `frontend/`: React application and Vite build
- `backend/`: Express API, authentication, listings, reviews, and uploads
- `backend/.env.example`: safe configuration template

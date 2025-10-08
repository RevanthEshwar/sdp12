# Property Value Enhancer (React + Vite + Tailwind)

A modern, responsive front-end to help Indian middle-class homeowners discover affordable, personalized ways to enhance property value.

## Tech
- React 18 + Vite
- React Router v6
- Tailwind CSS
- JavaScript (no TypeScript)

## Quick Start
```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build
npm run preview
```

## Project Structure
```
project/
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ styles/
│  │  └─ index.css
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ Footer.jsx
│  │  ├─ FormInput.jsx
│  │  └─ RecommendationCard.jsx
│  ├─ pages/
│  │  ├─ Landing.jsx
│  │  ├─ UserForm.jsx
│  │  ├─ Recommendations.jsx
│  │  └─ AdminDashboard.jsx
│  ├─ hooks/
│  │  └─ useLocalStorage.js
│  ├─ utils/
│  │  └─ recommendationEngine.js
│  └─ data/
│     └─ recommendations.js
└─ .gitignore
```

## Git Workflow (suggested)
- Create feature branches: `feat/ui-landing`, `feat/form`, `feat/admin-dashboard`
- Use conventional commits: `feat: add user form`, `fix: validation for budget`
- Open PRs and squash merge to `main`

## Notes
- Admin data is stored in `localStorage` for demo. Integrate an API later.
- The recommendation engine is a simple client-side filter/score system.
- Mobile-first responsive UI using TailwindCSS.

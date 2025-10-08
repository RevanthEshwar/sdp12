# Property Value Enhancer - Setup Guide

## Installation Steps

### 1. Enable PowerShell Script Execution (if needed)
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Project Features

### ✅ Implemented Pages
- **Dashboard** (`/`) - User dashboard with property cards and quick actions
- **Submit Property** (`/submit`) - Form to add property details with interactive UI
- **Recommendations** (`/recommendations`) - Personalized improvement ideas with filters
- **Admin Dashboard** (`/admin`) - Manage recommendations, approve properties

### ✅ UI Components
- **Sidebar** - Left navigation (hidden on dashboard)
- **QuickNav** - Right-side quick navigation panel (always visible)
- **Property Type Cards** - Interactive selection with icons
- **Recommendation Cards** - Full-width cards with icons, cost, and value addition
- **Admin Panel** - Stats, pending submissions table, CRUD for recommendations

### ✅ Features
- **LocalStorage Persistence** - Form data, properties, ideas, and saved items
- **Interactive Forms** - Property type selection, amenities checkboxes
- **Dynamic Filtering** - Budget, area, and type filters on recommendations
- **Save/Unsave Ideas** - Heart button to save favorite recommendations
- **Admin CRUD** - Add, edit, delete recommendations with inline form
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Gradient Buttons** - Modern blue-to-purple gradients matching mockups

## File Structure
```
src/
├── App.jsx                    # Main app with routing & context
├── main.jsx                   # Entry point
├── components/
│   ├── Sidebar.jsx           # Left sidebar navigation
│   ├── QuickNav.jsx          # Right quick navigation panel
│   └── FormInput.jsx         # Reusable form input wrapper
├── pages/
│   ├── Dashboard.jsx         # User dashboard with property cards
│   ├── UserForm.jsx          # Property submission form
│   ├── Recommendations.jsx   # Personalized recommendations list
│   └── AdminDashboard.jsx    # Admin panel with stats & CRUD
├── hooks/
│   └── useLocalStorage.js    # Custom hook for localStorage
├── utils/
│   └── recommendationEngine.js  # Scoring & filtering logic
├── data/
│   └── recommendations.js    # Default improvement ideas
└── styles/
    └── index.css             # Tailwind + custom styles
```

## Key Differences from Initial Design
- ❌ **Removed top navbar** - Using sidebar instead
- ✅ **Added QuickNav** - Right-side navigation matching mockups
- ✅ **Updated form fields** - City, locality, rooms, amenities
- ✅ **Card-based layouts** - Property cards, recommendation cards
- ✅ **Admin sidebar** - Separate admin navigation
- ✅ **Interactive buttons** - Hover effects, gradients, proper states

## Next Steps
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Navigate through all pages using QuickNav or Sidebar
4. Test form submission, save ideas, and admin CRUD operations

## Troubleshooting
- If npm commands don't work, enable script execution in PowerShell
- If port 5173 is busy, Vite will auto-assign another port
- Clear localStorage if you see stale data: `localStorage.clear()` in browser console

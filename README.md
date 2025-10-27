# TicketFlow — React Implementation

A modern, accessible ticket management web application with a beautiful autumn theme system. Built with React, TypeScript, and Tailwind CSS.

## 🎨 Features

### Core Functionality
- **Authentication System**: Simulated auth with localStorage persistence
- **Ticket Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Dashboard**: Real-time statistics showing Total, Open, In Progress, and Closed tickets
- **Search & Filter**: Find tickets by title and filter by status
- **Real-time Validation**: Debounced form validation with inline error messages
- **Toast Notifications**: User-friendly feedback for all actions
- **Protected Routes**: Automatic redirect to login for unauthenticated users

### Design & Theme System
- **Dual Theme Modes**: Autumn Light (warm, sunlit) and Autumn Dark (cozy, muted)
- **Design Tokens**: CSS variables for consistent styling across components
- **Seasonal Assets**: Custom SVG hero waves with leaf silhouettes
- **Autumn Color Palette**: Warm oranges, golden browns, olive greens
- **Accessible Animations**: Subtle motion that respects `prefers-reduced-motion`
- **Theme Persistence**: User preference saved to localStorage with system fallback

## 🛠 Tech Stack

- **Framework**: React 18.3+ with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Icons**: Lucide React (autumn-themed icon set)
- **Build Tool**: Vite
- **State Management**: React Context API
- **Storage**: localStorage for auth and tickets

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## 🎭 Design & Theme

### Theme System
The app implements a sophisticated autumn theme system with two modes:

**Autumn Light (Default)**
- Background: `#FFF8F2` (paper cream)
- Surface: `#FFF1E6` (warm white)
- Text: `#3B2F2F` (deep coffee)
- Accent: `#C14A16` (pumpkin orange)

**Autumn Dark (Cozy)**
- Background: `#1C1A18` (deep charcoal)
- Surface: `#262322` (warm gray)
- Text: `#F6EDE6` (cream)
- Accent: `#D96B2C` (warm orange)

### Theme Switcher
Located in the header, the theme toggle:
- Persists preference to `localStorage.theme`
- Falls back to `prefers-color-scheme` media query
- Fully keyboard accessible with ARIA labels
- Smooth transitions between modes

### Status Colors (Autumn Palette)
- **Open**: `#6B8B3A` (leaf olive)
- **In Progress**: `#D96B2C` (pumpkin amber)
- **Closed**: `#8C7B71` (muted brown)

### Typography
- **Headings**: Merriweather (warm serif)
- **Body**: Inter (clean sans-serif)
- **Scale**: 48px headlines → 14px captions (responsive)

### Seasonal Assets
Located in `/src/assets/autumn/`:
- `hero-wave-autumn-light.svg` — Wavy hero with leaf silhouettes
- `hero-wave-autumn-dark.svg` — Dark mode variant
- `leaf-1.svg`, `leaf-2.svg` — Decorative floating leaves
- `paper-texture.png` — Subtle grain overlay (optional)

### Motion & Interactions
- Gentle card lift on hover
- Subtle leaf float animation on hero
- Smooth theme transitions
- Loading skeleton shimmer
- **Respects `prefers-reduced-motion`** — all decorative animations disabled when requested

## ♿ Accessibility

### Compliance
- **WCAG AA**: All text meets 4.5:1 contrast ratio minimum
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Readers**: Semantic HTML with proper ARIA labels
- **Focus Indicators**: Visible focus rings on all focusable elements
- **Reduced Motion**: Respects user preference for reduced motion

### Checks Performed
- ✅ Color contrast verified with WebAIM Contrast Checker
- ✅ Keyboard navigation tested across all pages
- ✅ Screen reader tested with NVDA/VoiceOver
- ✅ Form validation announces errors to assistive tech
- ✅ Theme toggle accessible via keyboard and screen reader
- ✅ All images have descriptive alt text

## 🔐 Test Credentials

Use these credentials to test the authentication flow:

```
Email: test@ticketapp.local
Password: Password123!
```

## 📁 Project Structure

```
src/
├── assets/
│   └── autumn/          # Seasonal SVG and texture assets
├── components/
│   ├── Header.tsx       # Navigation with theme toggle
│   ├── ThemeToggle.tsx  # Theme switcher component
│   ├── TicketForm.tsx   # Create/edit ticket form
│   ├── TicketList.tsx   # Ticket display grid
│   └── ProtectedRoute.tsx
├── context/
│   ├── AuthProvider.tsx # Authentication context
│   └── ToastProvider.tsx # Toast notification system
├── pages/
│   ├── Home.tsx         # Landing page with hero
│   ├── Login.tsx        # Login form
│   ├── Signup.tsx       # Registration form
│   ├── Dashboard.tsx    # Stats overview
│   └── Tickets.tsx      # Ticket management
├── utils/
│   └── ticketStorage.ts # localStorage utilities
├── styles/
│   ├── index.css        # Global styles & tokens
│   ├── theme.css        # Theme variables
│   └── App.css          # Component styles
└── App.tsx              # Root component with routing
```

## 🎯 Data Model

### Ticket Schema
```typescript
interface Ticket {
  id: string;
  title: string;              // Required, 3-200 chars
  description?: string;       // Optional, max 1000 chars
  status: 'open' | 'in_progress' | 'closed';
  priority?: 'low' | 'medium' | 'high';
  createdAt: string;          // ISO date
  updatedAt: string;          // ISO date
}
```

### Validation Rules
- **Title**: Required, 3-200 characters
- **Status**: Required, must be one of: open, in_progress, closed
- **Description**: Optional, max 1000 characters
- **Priority**: Optional, must be one of: low, medium, high

## 🚀 Features in Detail

### Authentication
- Simulated authentication using localStorage
- Session stored as `localStorage.ticketapp_session`
- Automatic redirect for protected routes
- Logout clears session and returns to landing page

### Ticket CRUD
- **Create**: Modal form with real-time validation
- **Read**: Searchable, filterable ticket grid
- **Update**: Edit modal with pre-filled data
- **Delete**: Confirmation dialog before deletion

### Dashboard Statistics
- Total tickets count
- Open tickets count
- In Progress tickets count
- Closed tickets count
- Visual stat cards with autumn-themed icons

### Error Handling
- Inline validation errors beneath form fields
- Toast notifications for global messages
- Unauthorized access redirects with toast message
- Network failure handling with retry option

## 🐛 Known Issues

- None currently reported

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Replacing localStorage with a real backend API
- Implementing proper authentication with JWT/OAuth
- Adding unit and integration tests
- Setting up CI/CD pipeline
- Adding error boundary components
- Implementing proper state management (Redux/Zustand)

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---


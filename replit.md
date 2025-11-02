# 75 Hard Challenge Tracker

## Overview

A web application for tracking the 75 Hard Challenge - a mental toughness program requiring participants to complete 7 daily habits for 75 consecutive days. The application provides a grid-based interface inspired by Habitica and Streaks apps, emphasizing clarity, instant visual feedback, and zero-friction interaction. Users can track their progress across all 75 days, with automatic local storage persistence and real-time completion statistics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing with a single main tracker page at the root route.

**State Management**: React hooks (useState, useEffect) for local component state. No global state management library - progress data is persisted directly to browser localStorage.

**UI Component Library**: Shadcn UI components built on Radix UI primitives with Tailwind CSS for styling. Uses the "new-york" style variant with a neutral base color scheme.

**Design System**:
- Typography: Inter font family with systematic size hierarchy (32px titles, 20px headers, 14px body, 12px small text)
- Spacing: 12px-based spacing system for consistent margins, padding, and gaps
- Color palette: Custom colors defined via CSS variables (#2ECC71 for success/completed, #E74C3C for reset/warning, #3498DB for progress indicators)
- Responsive grid layout: 5-7 days per row on desktop, 3-4 on tablet, 1-2 on mobile

**Key Components**:
- `DayCard`: Container for a single day's 7 habit checkboxes with completion counter
- `HabitCheckbox`: Custom checkbox component with accessible button-based implementation
- `ProgressBar`: Visual progress tracker showing overall challenge completion percentage
- `ResetDialog`: Confirmation dialog for resetting all progress data

### Backend Architecture

**Server Framework**: Express.js running on Node.js with ESM module syntax.

**Data Layer**: In-memory storage implementation (`MemStorage` class) with interface-based design (`IStorage`) allowing future database integration. Currently configured for Drizzle ORM with PostgreSQL but not actively used - all data persistence happens client-side via localStorage.

**API Structure**: Minimal backend - routes placeholder exists in `server/routes.ts` but no API endpoints are currently implemented. The application functions as a fully client-side SPA with local data persistence.

**Development Server**: Vite middleware integrated into Express for hot module replacement during development. Production build serves static assets from `dist/public`.

### Data Storage Solutions

**Primary Storage**: Browser localStorage for persisting user progress across sessions.

**Storage Keys**:
- `75hard-progress`: JSON object containing completion status for all 75 days × 7 habits
- `75hard-last-check`: Timestamp for detecting day changes
- `75hard-actual-day`: Current day number in the challenge (1-75)
- `75hard-selected-day`: Currently viewed day in the UI

**Data Model**: Each day stores a `DayProgress` object with 7 boolean fields (workout1, workout2, diet, water, reading, sleep, photo).

**Database Configuration**: Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless` with schema in `shared/schema.ts`. Currently defines a `users` table (id, username, password) but this is not used by the tracker functionality. Database exists as infrastructure for potential future authentication/multi-user features.

### External Dependencies

**UI Framework**: 
- Radix UI primitives (@radix-ui/react-*) for accessible component foundations
- Tailwind CSS with PostCSS for utility-first styling
- class-variance-authority and clsx for conditional class composition

**Form & Validation**:
- @hookform/resolvers for form validation integration
- drizzle-zod for type-safe schema validation
- zod for runtime type checking

**Data Fetching**: 
- @tanstack/react-query for async state management (configured but not actively used since no API calls are made)

**Development Tools**:
- @replit/vite-plugin-runtime-error-modal for enhanced error display
- @replit/vite-plugin-cartographer and dev-banner for Replit-specific development features
- tsx for TypeScript execution in development

**Date Handling**: date-fns library for date manipulation and formatting.

**Build Tools**: esbuild for server-side bundling, Vite for client-side bundling with React plugin.
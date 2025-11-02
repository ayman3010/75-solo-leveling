# 75 SoloLeveling

## Overview
A dark, RPG-themed web application inspired by Solo Leveling to track daily progress through 75 days of quests. The app displays one level at a time with checkboxes for 7 daily quests and features automatic midnight reset functionality with glowing visual effects. Users log in with only a username (no password) and each user's data is stored separately.

## Purpose
Help users level up their life by providing a gaming-inspired interface to track daily quests. If any level's quests are incomplete at midnight, the system automatically resets to Level 1. Each user (identified by username) has their own separate progress tracking.

## Current State
Fully functional single-page application with:
- Username-based authentication (no password required)
- **Cross-device progress synchronization via PostgreSQL database**
- Single-day view with navigation between all 75 levels
- Automatic progress saving via API calls (syncs across all devices)
- Midnight reset logic that handles all edge cases (DST, month/year rollovers, multi-day gaps)
- Visual progress tracking with XP percentage and glowing effects
- Solo Leveling dark theme with purple/blue glowing effects on completed levels
- Complete data isolation between users
- **Mobile-optimized responsive design for iPhone and Android devices**

## Recent Changes (November 2, 2025)

### Database Backend & Cross-Device Sync
- **Migrated from localStorage to PostgreSQL database for cross-device synchronization**
- Implemented backend API with Express routes for user data management
- Created database schema with Drizzle ORM (users, userSettings, dayProgress tables)
- All user progress now syncs automatically across all devices
- Built RESTful API endpoints for authentication, settings, and progress tracking
- Integrated TanStack Query for efficient data fetching and caching

### Mobile Optimization
- **Optimized for iPhone 15 Pro and mobile devices in general**
- Added responsive breakpoints throughout the app (sm:, md: utilities)
- Adjusted padding, spacing, and font sizes for better mobile UX
- Made all touch targets larger (min 44px) for easier tapping
- Improved header layout to stack vertically on small screens
- Optimized button sizes and spacing for mobile
- Enhanced dialog and modal layouts for mobile screens
- Added proper viewport meta tags and iOS web app settings

### Previous Updates
- Applied complete Solo Leveling rebranding: Changed "75 Hard Challenge" to "75 SoloLeveling"
- Updated design theme: Dark gaming aesthetic with purple (#8B5CF6) and blue (#3B82F6) color scheme
- Added glowing visual effects to completed levels and progress bar
- Updated terminology: "Quests" instead of "habits", "Levels" instead of "days", "XP" for progress
- Changed default quest labels to Solo Leveling themed names
- Updated reflection section to "Quest Log" with gaming terminology
- Enhanced UI with tracking, spacing, and gaming-inspired typography
- Implemented single-level layout (showing one level at a time instead of all 75 levels)
- Added prev/next navigation buttons to move between levels
- Implemented robust midnight check system that:
  - Resets system if current level is incomplete at midnight
  - Resets system if more than one day passes between sessions
  - Handles DST transitions correctly using UTC calculations
  - Advances to next level automatically if current level is complete
- Separated actualDay (real progress) from selectedDay (navigation) to prevent manipulation
- Added comprehensive localStorage persistence for all state
- Added Settings dialog allowing users to customize all 7 quest labels with persistence
- Added daily quest log textarea to each level card for personal notes and thoughts
- Implemented getHabitBooleans helper to ensure quest log doesn't affect completion logic
- **Implemented username-based authentication system:**
  - Created LoginScreen component for user login
  - Username-only authentication (no password required)
  - Username validation (3-20 characters, alphanumeric with underscores/hyphens)
  - All localStorage keys scoped by username for data isolation
  - Login/logout functionality with user display in header
  - Automatic migration from old non-user-scoped keys to user-scoped keys
  - Complete data isolation between users (each user has separate progress)
  - State cleared on logout to prevent data leaks between users
- Bug fixes:
  - Fixed checkbox toggle issue (checkboxes can now be unchecked after checking)
  - Fixed quest log state isolation (each level has its own quest log, not shared)
  - Added Edit/Save button workflow for quest logs (instead of real-time updates)
  - Improved accessibility: full keyboard support with focus management
  - Fixed data leak when switching users (state now properly cleared on logout)

## Project Architecture

### Frontend Structure
- **Pages**: `/client/src/pages/tracker.tsx` - Main tracker page with single-level view and authentication
- **Components**:
  - `LoginScreen.tsx` - Username-only login screen with validation
  - `DayCard.tsx` - Displays a single level with 7 quest checkboxes and quest log textarea
  - `HabitCheckbox.tsx` - Individual checkbox component for each quest
  - `ProgressBar.tsx` - Visual XP progress indicator with glowing effects
  - `ResetDialog.tsx` - Confirmation dialog for manual system reset
  - `SettingsDialog.tsx` - Dialog for customizing quest labels

### Data Model
```typescript
interface DayProgress {
  workout1: boolean;
  workout2: boolean;
  diet: boolean;
  water: boolean;
  reading: boolean;
  sleep: boolean;
  photo: boolean;
  reflection: string; // Daily quest log notes (not counted toward completion)
}

interface HabitLabels {
  workout1: string;  // Default: "Elite Training Session"
  workout2: string;  // Default: "Shadow Realm Workout"
  diet: string;      // Default: "Hunter's Nutrition"
  water: string;     // Default: "Mana Recovery (Water)"
  reading: string;   // Default: "System Archives Study"
  sleep: string;     // Default: "Recovery Meditation"
  photo: string;     // Default: "Power Level Documentation"
}

type AllProgress = Record<number, DayProgress>; // Levels 1-75

// Helper function to extract only the 7 boolean quests (excluding quest log)
function getHabitBooleans(day: DayProgress): boolean[];
```

### Storage Strategy
Uses PostgreSQL database with API backend:
- **Database Tables:**
  - `users`: User accounts (username as primary key)
  - `userSettings`: User preferences and state (actualDay, selectedDay, lastCheck, customHabits)
  - `dayProgress`: Progress for each of 75 levels per user (7 quest booleans + reflection text)
- **API Endpoints:**
  - `POST /api/auth/login`: User authentication/creation
  - `GET/POST /api/user/:username/settings`: User settings management
  - `GET /api/user/:username/progress`: Fetch all progress data
  - `GET/POST /api/user/:username/progress/:day`: Individual level progress
  - `POST /api/user/:username/reset`: Reset all progress
- **localStorage usage:** Only stores current username for session persistence
- **Cross-device sync:** All data automatically syncs across devices via API calls
- Each user's data is completely isolated by username

### Midnight Reset Logic
The system checks every minute and on page load:
1. Compares current date with last check date (using YYYY-MM-DD strings)
2. If date has changed:
   - If >1 day passed → reset system
   - If current level incomplete → reset system
   - If current level complete → advance to next level
3. Uses UTC for date calculations to avoid DST issues

## Key Features
1. **Username Authentication**: Simple username-only login (no password required)
2. **Cross-Device Synchronization**: Progress automatically syncs across all your devices
3. **Data Isolation**: Each user has completely separate progress tracking
4. **Mobile-Optimized**: Fully responsive design for iPhone, Android, and all screen sizes
5. **Single Level View**: Shows only the current level with navigation
6. **7 Daily Quests** (customizable labels via Settings):
   - Elite Training Session (default)
   - Shadow Realm Workout (default)
   - Hunter's Nutrition (default)
   - Mana Recovery (Water) (default)
   - System Archives Study (default)
   - Recovery Meditation (default)
   - Power Level Documentation (default)
7. **Automatic Reset**: System resets to Level 1 if any level is incomplete at midnight
8. **Progress Tracking**: Visual XP bar showing total completion (X/525 quests) with glowing effects
9. **Persistent Storage**: All progress saved automatically via database API (syncs across devices)
10. **Level Navigation**: Move between levels to review or plan ahead
11. **Visual Completion**: Completed levels show purple glowing border effect
12. **Customizable Quests**: Edit quest labels in Settings to match your personal goals
13. **Quest Logs**: Add personal notes and thoughts for each level (doesn't affect completion)

## Design
- **Theme**: Solo Leveling inspired dark gaming aesthetic
- **Colors**: Purple primary (#8B5CF6), blue accent (#3B82F6), dark backgrounds (#0F0F1A, #1A1A2E)
- **Effects**: Glowing purple effects on completed levels and progress bar
- **Font**: Rajdhani for headers (gaming feel), Inter for body text
- **Layout**: Centered single-level card with navigation controls
- **Responsive**: Works on mobile and desktop devices

## Testing Coverage
- Username authentication and validation
- Login/logout flow
- Data isolation between users
- Single-level view display
- Navigation between levels (prev/next buttons)
- Checkbox toggling and state management
- Progress calculation and XP display
- localStorage persistence across page reloads
- Completed level visual indicators (purple glowing border)
- User-scoped data migration from old keys

## User Workflow
1. User opens app and sees login screen
2. User enters their username (3-20 characters, alphanumeric with underscores/hyphens)
3. User clicks "START LEVELING" to log in
4. User sees their current level (or Level 1 if new user)
5. User checks off quests as they complete them throughout the day
6. Progress automatically saves to localStorage (scoped to their username)
7. At midnight:
   - If all 7 quests complete → automatically advance to next level
   - If any quest incomplete → system resets to Level 1
8. User can navigate between levels to review past progress or plan ahead
9. User can click "Logout" to log out
10. Different users can log in and have completely separate progress
11. Manual system reset button available to start over at any time

## Technical Notes
- Built with React + TypeScript
- Uses Wouter for routing (single page app)
- Shadcn UI components with custom Solo Leveling theming
- **Backend:** Express.js with RESTful API
- **Database:** PostgreSQL (Neon-backed) with Drizzle ORM
- **State Management:** TanStack Query (React Query) for API calls and caching
- Username-only authentication (no password required)
- Checks for midnight every 60 seconds
- UTC-based date calculations prevent DST bugs
- Separation of actualDay and selectedDay prevents navigation from affecting reset logic
- Inline styles for glowing effects on completed levels and progress bar
- **Mobile-first responsive design** with Tailwind CSS breakpoints
- Touch-friendly UI with 44px minimum touch targets
- Optimized for iPhone 15 Pro and Android devices

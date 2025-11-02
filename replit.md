# 75 Hard Challenge Tracker

## Overview
A clean, minimalist web application to track daily progress through the 75 Hard Challenge. The app displays one day at a time with checkboxes for 7 daily habits and features automatic midnight reset functionality.

## Purpose
Help users complete the 75 Hard Challenge by providing a simple interface to track daily tasks. If any day's tasks are incomplete at midnight, the challenge automatically resets to Day 1.

## Current State
Fully functional single-page application with:
- Single-day view with navigation between all 75 days
- Automatic progress saving via localStorage
- Midnight reset logic that handles all edge cases (DST, month/year rollovers, multi-day gaps)
- Visual progress tracking with completion percentage

## Recent Changes (November 2, 2025)
- Implemented single-day layout (showing one day at a time instead of all 75 days)
- Added prev/next navigation buttons to move between days
- Implemented robust midnight check system that:
  - Resets challenge if current day is incomplete at midnight
  - Resets challenge if more than one day passes between sessions
  - Handles DST transitions correctly using UTC calculations
  - Advances to next day automatically if current day is complete
- Separated actualDay (real progress) from selectedDay (navigation) to prevent manipulation
- Added comprehensive localStorage persistence for all state
- Added Settings dialog allowing users to customize all 7 habit labels with persistence
- Added daily reflection textarea to each day card for personal notes and thoughts
- Implemented getHabitBooleans helper to ensure reflection doesn't affect completion logic

## Project Architecture

### Frontend Structure
- **Pages**: `/client/src/pages/tracker.tsx` - Main tracker page with single-day view
- **Components**:
  - `DayCard.tsx` - Displays a single day with 7 habit checkboxes and reflection textarea
  - `HabitCheckbox.tsx` - Individual checkbox component for each habit
  - `ProgressBar.tsx` - Visual progress indicator
  - `ResetDialog.tsx` - Confirmation dialog for manual reset
  - `SettingsDialog.tsx` - Dialog for customizing habit labels

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
  reflection: string; // Daily reflection notes (not counted toward completion)
}

interface HabitLabels {
  workout1: string;
  workout2: string;
  diet: string;
  water: string;
  reading: string;
  sleep: string;
  photo: string;
}

type AllProgress = Record<number, DayProgress>; // Days 1-75

// Helper function to extract only the 7 boolean habits (excluding reflection)
function getHabitBooleans(day: DayProgress): boolean[];
```

### Storage Strategy
Uses localStorage (no backend database needed):
- `75hard-progress`: All 75 days of progress data (includes habit checkboxes and reflections)
- `75hard-actual-day`: The real challenge day (1-75)
- `75hard-selected-day`: Currently viewing day (for navigation)
- `75hard-last-check`: Timestamp of last midnight check
- `75hard-custom-habits`: User's customized habit labels

### Midnight Reset Logic
The app checks every minute and on page load:
1. Compares current date with last check date (using YYYY-MM-DD strings)
2. If date has changed:
   - If >1 day passed → reset challenge
   - If current day incomplete → reset challenge
   - If current day complete → advance to next day
3. Uses UTC for date calculations to avoid DST issues

## Key Features
1. **Single Day View**: Shows only the current day with navigation
2. **7 Daily Habits** (customizable labels via Settings):
   - Workout 1 (default)
   - Workout 2 (default)
   - Diet (default)
   - Water (1 gallon - default)
   - Reading (10 pages - default)
   - Sleep (7+ hours - default)
   - Progress Photo (default)
3. **Automatic Reset**: Challenge resets to Day 1 if any day is incomplete at midnight
4. **Progress Tracking**: Visual progress bar showing total completion (X/525 tasks)
5. **Persistent Storage**: All progress saved automatically in localStorage
6. **Day Navigation**: Move between days to review or plan ahead
7. **Visual Completion**: Completed days show green border
8. **Customizable Habits**: Edit habit labels in Settings to match your personal 75 Hard rules
9. **Daily Reflections**: Add personal notes and thoughts for each day (doesn't affect completion)

## Design
- **Colors**: Success green (#2ECC71), destructive red (#E74C3C), clean backgrounds
- **Font**: Inter for clean, modern readability
- **Layout**: Centered single-day card with navigation controls
- **Responsive**: Works on mobile and desktop devices

## Testing Coverage
- Single-day view display
- Navigation between days (prev/next buttons)
- Checkbox toggling and state management
- Progress calculation and display
- localStorage persistence across page reloads
- Completed day visual indicators (green border)

## User Workflow
1. User opens app and sees Day 1 (or their current day)
2. User checks off tasks as they complete them throughout the day
3. Progress automatically saves to localStorage
4. At midnight:
   - If all 7 tasks complete → automatically advance to next day
   - If any task incomplete → challenge resets to Day 1
5. User can navigate between days to review past progress or plan ahead
6. Manual reset button available to start over at any time

## Technical Notes
- Built with React + TypeScript
- Uses Wouter for routing (single page app)
- Shadcn UI components for consistent design
- No backend required - all state in localStorage
- Checks for midnight every 60 seconds
- UTC-based date calculations prevent DST bugs
- Separation of actualDay and selectedDay prevents navigation from affecting reset logic

# 75 SoloLeveling

## Overview
A dark, RPG-themed web application inspired by Solo Leveling to track daily progress through 75 days of quests. The app displays one level at a time with checkboxes for 7 daily quests and features automatic midnight reset functionality with glowing visual effects.

## Purpose
Help users level up their life by providing a gaming-inspired interface to track daily quests. If any level's quests are incomplete at midnight, the system automatically resets to Level 1.

## Current State
Fully functional single-page application with:
- Single-day view with navigation between all 75 levels
- Automatic progress saving via localStorage
- Midnight reset logic that handles all edge cases (DST, month/year rollovers, multi-day gaps)
- Visual progress tracking with XP percentage and glowing effects
- Solo Leveling dark theme with purple/blue glowing effects on completed levels

## Recent Changes (November 2, 2025)
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
- Bug fixes:
  - Fixed checkbox toggle issue (checkboxes can now be unchecked after checking)
  - Fixed quest log state isolation (each level has its own quest log, not shared)
  - Added Edit/Save button workflow for quest logs (instead of real-time updates)
  - Improved accessibility: full keyboard support with focus management

## Project Architecture

### Frontend Structure
- **Pages**: `/client/src/pages/tracker.tsx` - Main tracker page with single-level view
- **Components**:
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
Uses localStorage (no backend database needed):
- `75sololeveling-progress`: All 75 levels of progress data (includes quest checkboxes and quest logs)
- `75sololeveling-actual-day`: The real system level (1-75)
- `75sololeveling-selected-day`: Currently viewing level (for navigation)
- `75sololeveling-last-check`: Timestamp of last midnight check
- `75sololeveling-custom-habits`: User's customized quest labels
- Includes automatic migration from old `75hard-*` keys for backwards compatibility

### Midnight Reset Logic
The system checks every minute and on page load:
1. Compares current date with last check date (using YYYY-MM-DD strings)
2. If date has changed:
   - If >1 day passed → reset system
   - If current level incomplete → reset system
   - If current level complete → advance to next level
3. Uses UTC for date calculations to avoid DST issues

## Key Features
1. **Single Level View**: Shows only the current level with navigation
2. **7 Daily Quests** (customizable labels via Settings):
   - Elite Training Session (default)
   - Shadow Realm Workout (default)
   - Hunter's Nutrition (default)
   - Mana Recovery (Water) (default)
   - System Archives Study (default)
   - Recovery Meditation (default)
   - Power Level Documentation (default)
3. **Automatic Reset**: System resets to Level 1 if any level is incomplete at midnight
4. **Progress Tracking**: Visual XP bar showing total completion (X/525 quests) with glowing effects
5. **Persistent Storage**: All progress saved automatically in localStorage
6. **Level Navigation**: Move between levels to review or plan ahead
7. **Visual Completion**: Completed levels show purple glowing border effect
8. **Customizable Quests**: Edit quest labels in Settings to match your personal goals
9. **Quest Logs**: Add personal notes and thoughts for each level (doesn't affect completion)

## Design
- **Theme**: Solo Leveling inspired dark gaming aesthetic
- **Colors**: Purple primary (#8B5CF6), blue accent (#3B82F6), dark backgrounds (#0F0F1A, #1A1A2E)
- **Effects**: Glowing purple effects on completed levels and progress bar
- **Font**: Rajdhani for headers (gaming feel), Inter for body text
- **Layout**: Centered single-level card with navigation controls
- **Responsive**: Works on mobile and desktop devices

## Testing Coverage
- Single-level view display
- Navigation between levels (prev/next buttons)
- Checkbox toggling and state management
- Progress calculation and XP display
- localStorage persistence across page reloads
- Completed level visual indicators (purple glowing border)

## User Workflow
1. User opens app and sees Level 1 (or their current level)
2. User checks off quests as they complete them throughout the day
3. Progress automatically saves to localStorage
4. At midnight:
   - If all 7 quests complete → automatically advance to next level
   - If any quest incomplete → system resets to Level 1
5. User can navigate between levels to review past progress or plan ahead
6. Manual system reset button available to start over at any time

## Technical Notes
- Built with React + TypeScript
- Uses Wouter for routing (single page app)
- Shadcn UI components with custom Solo Leveling theming
- No backend required - all state in localStorage
- Checks for midnight every 60 seconds
- UTC-based date calculations prevent DST bugs
- Separation of actualDay and selectedDay prevents navigation from affecting reset logic
- Inline styles for glowing effects on completed levels and progress bar

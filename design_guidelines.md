# 75 Hard Challenge Tracker - Design Guidelines

## Design Approach
**Utility-Focused Design System**: Drawing inspiration from Habitica and Streaks apps, this tracker prioritizes clarity, efficiency, and immediate usability. The design emphasizes grid-based organization, clear visual hierarchy, and instant feedback for user actions.

## Core Design Principles
1. **Scannable Grid Structure**: All 75 days visible in organized rows for quick progress overview
2. **Instant Visual Feedback**: Checkbox states clearly communicate completion status
3. **Progress Transparency**: Real-time percentage tracking motivates continued effort
4. **Zero Friction**: No unnecessary clicks, modals, or confirmation dialogs for checkbox toggles

## Typography System
- **Primary Font**: Inter (fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui)
- **Hierarchy**:
  - Page title: 32px/bold (Challenge Overview)
  - Section headers: 20px/semibold (Day numbers, Progress stats)
  - Body text: 14px/regular (Habit labels)
  - Small text: 12px/regular (Instructions, metadata)
- **Line height**: 1.5 for readability across all text

## Layout System
**Spacing Units**: Consistent 12px-based system
- Base unit: 12px (p-3 in Tailwind terms)
- Common spacing: 12px, 24px, 36px, 48px for margins/padding
- Grid gaps: 12px between items, 24px between day rows
- Container padding: 24px on mobile, 48px on desktop

**Grid Structure**:
- Desktop: 5-7 days per row (optimized for 1440px+ viewports)
- Tablet: 3-4 days per row (768px-1024px)
- Mobile: 1-2 days per row (max 640px)
- Each day card contains 7 vertically stacked habit checkboxes

## Color Palette (User-Specified)
- **Primary Success**: #2ECC71 (completed checkboxes, progress fill)
- **Completed State**: #27AE60 (darker green for fully completed days)
- **Reset/Warning**: #E74C3C (reset button, warning states)
- **Background**: #F8F9FA (main page background)
- **Text Primary**: #2C3E50 (headings, labels)
- **Progress Accent**: #3498DB (progress bar background/incomplete state)
- **Borders**: #E1E4E8 (subtle card borders, dividers)

## Component Library

### Day Card
- White background with 1px border (#E1E4E8)
- 12px padding around content
- Subtle shadow on hover: 0 2px 8px rgba(0,0,0,0.08)
- Border radius: 8px
- Day number header: semibold, 16px, #2C3E50
- When all 7 habits complete: border changes to #27AE60 (2px), background tint #F0FDF4

### Checkbox System
- Size: 20px × 20px squares
- Border: 2px solid #E1E4E8 (unchecked)
- Border radius: 4px
- Checked state: Background #2ECC71, white checkmark icon
- Label spacing: 8px to the right of checkbox
- Interactive area: 44px minimum touch target (for accessibility)
- Hover state: Border color darkens to #BDC3C7

### Progress Bar
- Full-width component at top of page
- Height: 48px
- Background: #3498DB (10% opacity)
- Fill: #2ECC71 gradient
- Rounded corners: 24px (pill shape)
- Text overlay: White text with completion percentage and count
- Centered: "234/525 tasks completed (44.6%)"

### Reset Button
- Background: #E74C3C
- Text: White, 14px, semibold
- Padding: 12px 24px
- Border radius: 8px
- Position: Top-right corner or below progress bar
- Confirmation modal (simple): White card with shadow, centered, 400px max-width

### Header Section
- Fixed position at top (sticky)
- Background: #F8F9FA with bottom border 1px #E1E4E8
- Contains: App title, progress bar, reset button
- Height: Auto with 24px padding
- Z-index: 100 to stay above scrolling content

## Responsive Behavior
**Breakpoints**:
- Mobile: < 640px (single column, stacked days)
- Tablet: 640px-1024px (2-3 column grid)
- Desktop: 1024px+ (5-7 column grid)

**Mobile Optimizations**:
- Progress bar text scales to 12px
- Day cards expand to full width minus 24px margins
- Checkboxes maintain 44px touch targets
- Header becomes sticky with smaller padding (16px)

## Visual Hierarchy
1. **Primary Focus**: Progress bar (largest, most colorful element)
2. **Secondary Focus**: Completed day cards (green border treatment)
3. **Tertiary Focus**: Current/incomplete day cards (standard state)
4. **Metadata**: Day numbers, habit labels (subtle, scannable)

## Interaction Patterns
- **Checkbox Toggle**: Single click/tap toggles state, saves immediately to localStorage
- **No Animations**: Instant state changes for performance and clarity
- **Scroll Behavior**: Smooth scroll with browser defaults, no custom parallax
- **Auto-save Indicator**: Subtle "Saved" text appears briefly (1s) after each toggle, fades out

## Accessibility Requirements
- WCAG AA contrast ratios: All text on backgrounds meets 4.5:1 minimum
- Keyboard navigation: Tab through checkboxes, Space to toggle, Enter on reset button
- Screen reader labels: "Day 1, Workout 1 of 2, checked" etc.
- Focus states: 2px solid #3498DB outline on all interactive elements

## Content Strategy
- Habit labels: "Workout 1", "Workout 2", "Diet", "Water (1 gallon)", "Reading (10 pages)", "Sleep (7+ hours)", "Progress Photo", "Daily Reflection"
- Instructional text at top: "Track your 75 Hard Challenge progress. Check off each task as you complete it daily."
- Empty state messaging if all unchecked: "Start your journey! Complete all 7 tasks each day for 75 days."

This minimalist, grid-focused design ensures users can quickly scan their progress, update their daily tasks with zero friction, and maintain motivation through clear visual progress indicators.
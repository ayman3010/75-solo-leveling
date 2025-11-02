# 75 SoloLeveling - Design Guidelines

## Design Approach
**Reference-Based Gaming Interface**: Drawing inspiration from Solo Leveling's system interface, League of Legends client, and Destiny 2's UI. This creates an immersive RPG progression tracker with dark, sleek gaming aesthetics while maintaining grid-based efficiency for tracking 75 days of "daily quests."

## Core Design Principles
1. **System Interface Immersion**: UI feels like an in-universe leveling system
2. **Glowing Visual Feedback**: Purple/blue glows indicate progress and completion
3. **RPG Progression**: Level advancement tied to completed days/quests
4. **Dark Gaming Aesthetic**: High contrast with strategic use of glow effects

## Typography System
- **Primary Font**: "Rajdhani" (bold, geometric, tech-feel) via Google Fonts
- **Secondary Font**: "Inter" for body text and small labels
- **Hierarchy**:
  - Page title/Level display: 48px/bold ("SYSTEM" header, "LEVEL 23")
  - Section headers: 24px/semibold ("DAILY QUESTS", "PROGRESS")
  - Quest labels: 16px/medium (habit names)
  - Stats/metadata: 14px/regular (completion counts, percentages)
  - Small UI text: 12px/regular (day numbers, timestamps)

## Layout System
**Spacing Units**: 16px base system (4, 8, 16, 24, 32, 48)
- Quest card padding: 16px
- Grid gaps: 16px between cards, 24px between rows
- Section spacing: 32px vertical between major sections
- Container padding: 24px mobile, 48px desktop
- Glow spread: 8px blur radius for standard glows, 16px for emphasis

**Grid Structure**:
- Desktop: 5 days per row (optimal for 1440px viewports)
- Tablet: 3 days per row (768px-1024px)
- Mobile: 1 day per row full-width

## Color Palette
- **Primary Glow**: #8B5CF6 (vibrant purple for active/completed states)
- **Secondary Glow**: #3B82F6 (electric blue for progress bars, accents)
- **Success State**: #A855F7 (lighter purple for completed quests)
- **Background Dark**: #0F0F1A (deep dark base)
- **Surface Dark**: #1A1A2E (cards, elevated surfaces)
- **Border Inactive**: #2D2D44 (subtle borders for incomplete states)
- **Border Active**: #8B5CF6 (glowing borders for completed/active states)
- **Text Primary**: #E0E0FF (bright, high contrast on dark)
- **Text Secondary**: #9CA3AF (dimmed text for labels)
- **Warning/Reset**: #EF4444 (red for reset actions)

## Component Library

### System Header (Hero)
- Full-width dark gradient background (#0F0F1A to #1A1A2E)
- Height: 400px desktop, 300px mobile
- Center-aligned content with glowing title "75 SOLO LEVELING SYSTEM"
- Subtitle: "ARISE AND CONQUER YOUR DAILY QUESTS"
- Decorative hex pattern overlay (subtle, 5% opacity)
- Level indicator: Large circular badge showing current level (Day/75)
- Stat counters: Total quests completed, current streak, completion rate

### Level Progress Bar
- Width: Full container with 32px margins
- Height: 64px
- Background: #1A1A2E with inset shadow
- Fill: Linear gradient (#3B82F6 to #8B5CF6) with animated glow
- Border: 2px solid #2D2D44, transforms to glowing #8B5CF6 at milestones
- Text overlay: "LEVEL 15 - 105/525 QUESTS COMPLETED (20%)"
- Progress segments: Subtle tick marks every 25% with glow effect
- Box shadow: 0 0 16px rgba(139, 92, 246, 0.3) on fill

### Day Quest Card
- Background: #1A1A2E
- Size: 280px width, auto height
- Padding: 16px
- Border: 1px solid #2D2D44 (inactive), 2px solid #8B5CF6 with glow (all complete)
- Border radius: 12px
- Day header: "DAY 01" in 20px Rajdhani bold, #E0E0FF
- Status badge: "INCOMPLETE" (gray) or "CLEARED" (glowing purple) in top-right
- Completed state: Box shadow 0 0 24px rgba(139, 92, 246, 0.4), background shifts to #1E1E32
- Hover state: Border glows subtly, lift 2px with smooth transition

### Quest Checkbox System
- Size: 24px × 24px hexagon shapes (gaming aesthetic)
- Background: #2D2D44 (unchecked), #8B5CF6 with glow (checked)
- Icon: Checkmark for complete, hollow hex for incomplete
- Labels: 16px Inter medium, #E0E0FF, 12px spacing to right
- Touch target: 48px minimum
- Checked glow: 0 0 8px rgba(139, 92, 246, 0.6)
- Quest types with icons: Workout (dumbbell), Diet (apple), Water (droplet), etc.
- Stack vertically with 12px gaps

### Stats Dashboard
- Position: Below hero, above day grid
- Background: #1A1A2E panel with subtle border
- Layout: 4-column grid on desktop (2-column mobile)
- Each stat card: Icon + Label + Large Number
- Stats: "Current Level", "Total XP", "Active Streak", "Completion Rate"
- Glow accents on high achievement numbers (>50% completion, >7 day streak)

### Reset System Modal
- Overlay: rgba(15, 15, 26, 0.95) with backdrop blur
- Modal card: 480px max-width, #1A1A2E background
- Border: 2px solid #EF4444 with red glow
- Title: "SYSTEM RESET WARNING" in 24px Rajdhani
- Warning text: "This will erase all progress. Action cannot be undone."
- Buttons: "CANCEL" (gray outlined) + "CONFIRM RESET" (red filled with glow)
- Button spacing: 16px gap, full-width on mobile

### Navigation/Controls
- Sticky header: 72px height, #0F0F1A background, bottom border 1px #2D2D44
- Left: App logo/icon with purple glow
- Center: Current day/level indicator
- Right: Reset button (outlined, red accent)

## Images Section
**Hero Background Image**: 
- Full-width atmospheric illustration featuring Solo Leveling style dark dungeon or system interface aesthetic
- Dimensions: 1920×400px desktop, 768×300px mobile
- Style: Dark purple/blue tones with glowing runic circles or hex patterns
- Overlay: Dark gradient (rgba(15, 15, 26, 0.7)) to ensure text readability
- Placement: Behind header content, covering entire hero section
- Buttons: Use backdrop-filter blur(12px) with semi-transparent backgrounds when placed over image

**Optional Decorative Elements**:
- Small glowing quest marker icons next to each quest type (24×24px SVGs)
- Level badge icon background (circular with hex pattern, 120×120px)

## Responsive Behavior
**Breakpoints**:
- Mobile: < 640px (single column, compressed stats)
- Tablet: 640px-1024px (3-column quest grid, 2-column stats)
- Desktop: 1024px+ (5-column quest grid, 4-column stats)

**Mobile Adjustments**:
- Hero height reduces to 300px
- Stats collapse to 2-column grid
- Quest cards expand full-width minus 24px margins
- Level display scales to 36px
- Glow effects reduced by 50% for performance

## Interaction Patterns
- **Quest Toggle**: Single click with 150ms purple flash animation on complete
- **Level-Up Notification**: Toast notification appears when completing Day X with "LEVEL UP!" message
- **Hover States**: Subtle glow intensification on interactive elements
- **Auto-Save**: Silent localStorage save, no UI indicator needed
- **Streak Tracking**: Consecutive completed days highlighted with flame icon

## Accessibility
- WCAG AA contrast: All purple/blue glows must have sufficient contrast text overlays
- Focus states: 3px glowing purple outline (#8B5CF6) on all interactive elements
- Keyboard navigation: Tab through quests, Space to toggle, Escape to close modals
- Screen reader: "Day 1 Quest System: Workout 1 of 2, completed" structure
- Reduced motion: Disable glow animations for prefers-reduced-motion users

## Visual Effects
- Subtle animated hex pattern on hero background (slow rotation, 2% opacity)
- Quest completion: Brief purple particle burst effect (CSS animation)
- Progress bar fill: Animated gradient shift over 2 seconds on update
- Card hover: Smooth 200ms transform and glow transition
- All glow effects: box-shadow with rgba purple/blue values, never exceed 24px blur
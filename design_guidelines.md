# Design Guidelines: Princess Amara Learning App

## Design Approach: Pocoyo-Style Educational Interface

**Primary Direction:** Clean, minimal children's educational design inspired by Pocoyo's distinctive aesthetic - white backgrounds, simple rounded shapes, bright accents, and clear visual hierarchy optimized for K-3 cognitive development.

---

## Core Visual System

### Typography Hierarchy
**Font Selection:** Fredoka (Google Fonts) - rounded, friendly, highly legible for early readers
- **Page Headers:** 2.5rem (40px), Bold (700)
- **Section Titles:** 1.75rem (28px), SemiBold (600)
- **Character Speech/Instructions:** 1.25rem (20px), Medium (500)
- **Body Text/Questions:** 1.125rem (18px), Regular (400)
- **Buttons/CTAs:** 1rem (16px), SemiBold (600), uppercase letter-spacing

### Layout & Spacing System
**Tailwind Units:** Consistently use 4, 6, 8, 12, 16 for spacing
- Container padding: `px-4 md:px-8`
- Section spacing: `py-12 md:py-16`
- Card/component gaps: `gap-6 md:gap-8`
- Between major sections: `mb-16`
- Component internal spacing: `p-6` or `p-8`

**Grid Structure:**
- Main container: `max-w-6xl mx-auto`
- Game cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Single-column max-width for text-heavy sections: `max-w-3xl`

---

## Component Library

### Navigation
Simple top bar with rounded corners and shadow:
- Logo/Princess Amara icon (left)
- Progress indicator (center) - star counter or badge display
- Settings/Parent Mode (right) - minimal icon button
- Fixed positioning on scroll with subtle shadow

### Princess Amara Character Guide
Persistent character element appearing throughout:
- Rounded portrait (96px × 96px) with soft shadow
- Speech bubble with rounded corners (border-radius: 24px)
- Animated entry (slide-in from right) when providing feedback
- Encouraging text snippets: "Great job!", "Let's try this together!", "You're amazing!"

### Math Mini-Game Cards
Large, touchable cards with generous padding:
- Rounded corners (border-radius: 20px)
- Soft shadow elevation (shadow-lg)
- Icon/illustration at top (128px × 128px)
- Game title, brief description
- "Play" button - large, rounded-full, with shadow
- Difficulty indicator - 1-3 stars in corner

### Historical Figure Cards
Portrait-style cards celebrating diversity:
- Circular portrait image (160px diameter)
- Name in bold beneath portrait
- 2-3 kid-friendly facts (short sentences)
- "Learn More" expandable section
- Bright accent border around card matching figure's cultural colors

### Answer Input Components
**For Math Games:**
- Large number buttons (80px × 80px) in rounded squares
- Multiple choice cards (tap to select, scale animation on press)
- Drag-and-drop zones with dotted outlines
- Visual feedback: correct (green checkmark animation), incorrect (gentle shake)

### Progress & Feedback
- Star collection display - filled stars for completed activities
- Badge showcase grid - unlockable achievements
- Gentle confetti animation on level completion
- Progress bar with rounded ends and gradient fill

---

## Page Layouts

### Home/Dashboard
**Hero Section (above fold):**
- Princess Amara welcome illustration (large, centered)
- Friendly greeting text
- "Start Learning" primary CTA button

**Activity Grid:**
- "Today's Math Games" section (3-column grid on desktop)
- "Meet a Hero" featured historical figure spotlight
- Recent achievements showcase

### Game Interface
**Fixed Header:**
- Back button (left)
- Question counter (center)
- Lives/hearts indicator (right)

**Main Game Area:**
- Question display (large, centered)
- Visual representation (illustrations, numbers, objects)
- Answer input area (buttons, cards, or interaction zones)
- Princess Amara feedback popup (appears after answer)

**Footer:**
- Progress dots showing question sequence
- Hint button (lightbulb icon)

### Historical Figures Gallery
Grid layout with filtering:
- Category tabs at top (Scientists, Inventors, Leaders, Artists)
- Card grid displaying 6-8 figures per view
- Modal popup for detailed biographical content with kid-friendly language

---

## Animations (Minimal & Purposeful)

**Character Interactions:**
- Princess Amara slides in/out (duration: 300ms, ease-in-out)
- Speech bubble pop-in (scale from 0.9 to 1, 200ms)

**User Feedback:**
- Correct answer: gentle scale pulse + sparkle effect
- Incorrect answer: horizontal shake (2-3px, 3 iterations, 150ms)
- Card selection: scale to 1.05, shadow increase

**Page Transitions:**
- Fade between sections (200ms)
- Slide-up for modals (300ms, ease-out)

**Constraints:** No continuous animations, no auto-playing carousels, no distracting motion

---

## Images

### Required Images:

1. **Princess Amara Character**
   - Full-body illustration for home page (simple, rounded Pocoyo-style)
   - Portrait version for guidance bubbles (circular, friendly expression)
   - Multiple expressions: happy, encouraging, celebrating

2. **Historical Figures**
   - 6-8 illustrated portraits in consistent Pocoyo-simplified style
   - Circular format, vibrant backgrounds
   - Each figure shown in cultural context (simple background elements)

3. **Math Game Icons**
   - Counting: colorful objects (apples, stars, blocks)
   - Addition: visual equations with friendly numbers
   - Patterns: geometric shapes in sequences
   - All illustrations with thick outlines, minimal detail

4. **Achievement Badges**
   - Star collector, Math Master, History Explorer badges
   - Simple icon-based designs with bright colors

**Hero Image:** No traditional hero image; instead use character-driven illustration with Princess Amara as the welcoming focal point on home page (occupies top 40% of viewport on desktop, full-width on mobile)

---

## Accessibility & Child-Friendly Features

- All interactive elements minimum 80px touch target
- High contrast text (dark on white, never gray on white)
- Clear focus states with thick, rounded outlines
- Large, legible typography throughout
- Consistent positioning of navigation elements
- Audio feedback option for non-readers
- No time pressure mechanics
- Forgiving error handling with encouragement

---

**Design Philosophy:** Create a joyful, distraction-free learning environment where every element serves educational purpose while maintaining Pocoyo's signature simplicity and warmth.
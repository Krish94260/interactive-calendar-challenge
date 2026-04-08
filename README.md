# Interactive Wall Calendar Component

A polished, interactive React/Next.js calendar component inspired by physical wall calendars. Built for the TakeYouForward Frontend Engineering Challenge.

### 🌐 [Live Demo](https://interactive-calendar-challenge.vercel.app/)

## Features

### Core Requirements
- **Wall Calendar Aesthetic**: Beautiful hero image with diagonal overlay design, spiral binding effect, and clean grid layout
- **Day Range Selector**: Click any date to start selection, click another to complete the range with visual feedback for start, end, and in-between dates
- **Integrated Notes Section**: Add, edit, and delete notes attached to selected date ranges with localStorage persistence
- **Fully Responsive Design**: 
  - Desktop: Side-by-side layout with hero image and notes panel
  - Mobile: Stacked vertical layout with touch-optimized interactions

### Creative Extras
- **Theme Switching**: Toggle between light and dark modes
- **Page Flip Animation**: Smooth 3D flip animation when changing months
- **Month/Year Picker**: Quick navigation modal to jump to any month
- **Holiday Markers**: US holidays marked with colored indicators
- **Staggered Animations**: Calendar days animate in with a wave effect
- **Keyboard Accessible**: Full keyboard navigation support
- **Date Range Info Bar**: Shows selected range with day count

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui
- **State Management**: React hooks with localStorage persistence
- **Animations**: CSS keyframe animations
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd interactive-wall-calendar

# Install dependencies
pnpm/npm install

# Start development server
pnpm/npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the calendar.

### Build for Production

```bash
pnpm/npm build
pnpm/npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Theme tokens and animations
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main page
├── components/
│   ├── calendar/
│   │   ├── wall-calendar.tsx    # Main calendar component
│   │   ├── calendar-grid.tsx    # Date grid with selection
│   │   ├── calendar-header.tsx  # Navigation controls
│   │   ├── hero-image.tsx       # Hero image with month overlay
│   │   ├── notes-section.tsx    # Notes management
│   │   ├── month-year-picker.tsx # Quick month navigation
│   │   └── date-range-info.tsx  # Selected range display
│   ├── theme-provider.tsx   # Dark/light mode support
│   └── ui/                  # shadcn/ui components
├── hooks/
│   └── use-calendar.ts      # Calendar state management
├── lib/
│   ├── calendar-types.ts    # TypeScript interfaces
│   ├── calendar-utils.ts    # Date utilities
│   └── utils.ts             # General utilities
└── public/
    └── images/              # Calendar hero images
```

## Usage Guide

### Selecting Dates
1. Click any date to start a selection (highlighted as range start)
2. Click another date to complete the range
3. The range is highlighted with the start and end dates visually distinct
4. Click "Clear selection" to reset

### Managing Notes
1. Select a date or date range
2. Type your note in the textarea
3. Press Cmd/Ctrl + Enter or click "Add Note" to save
4. Hover over notes to reveal edit/delete buttons
5. Notes persist in localStorage

### Navigation
- Use arrow buttons to go to previous/next month
- Click the month/year title to open the quick picker
- Click "Today" to jump to the current date

### Theme
- Click the sun/moon icon to toggle between light and dark modes
- Theme preference is saved to localStorage

## Design Decisions

1. **Component Architecture**: Separated concerns into focused components (grid, header, notes, hero) for maintainability and testing
2. **Custom Hook**: Centralized calendar logic in `useCalendar` hook for reusability
3. **CSS Variables**: Used design tokens for consistent theming and easy customization
4. **localStorage**: Chose client-side storage as per requirements (no backend needed)
5. **Accessibility**: Added ARIA labels, keyboard navigation, and screen reader text

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

MIT

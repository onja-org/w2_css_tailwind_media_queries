# Lab Design Specification: Tailwind Media Queries

## Core Concept
**Topic**: Tailwind Media Queries
**Learning Objective**: Students will be able to create responsive layouts using Tailwind's breakpoint utilities (sm:, md:, lg:, xl:, 2xl:) and understand mobile-first design principles
**Estimated Duration**: 3 hours
**Prerequisite Knowledge**: HTML structure, CSS basics, Tailwind utility classes, basic understanding of responsive design concepts

## Getting Started

1. Run `npm run serve` to start the lab server and open the dashboard
   - This will open the lab interface in your browser
   - If it doesn't open automatically, navigate to `http://localhost:8080/dashboard/index.html`
2. Resize your browser window to see the dashboard transform
3. Read the lessons, starting with intro.md, to understand responsive design principles
4. Follow the challenges in order, working in `lab/starter-template.html`
5. Run tests with `npm test` to check your progress (or use the "Run Tests" button in the lab interface or on the dashboard)

## Lab Overview

This lab uses a **Self-Revealing Interface with Morphing Environment** approach. The lab dashboard itself transforms completely at different breakpoints, teaching you responsive design by example:

- **Mobile (< 640px)**: Terminal-style interface with "TERMINAL-X" persona
- **Tablet (640px - 1024px)**: Playful interface with "TabbyGuide" persona
- **Desktop (1024px+)**: Professional developer environment with "DevPro Suite" persona

## Challenges

### Challenge 1 - The Responsive Card
Build a card component that transforms from a compact mobile list item to an expanded desktop feature.

### Challenge 2 - The Adaptive Navigation
Create navigation that shape-shifts like the lab itself:
- Mobile: Hamburger menu with slide-out drawer
- Tablet: Bottom tab bar with icons
- Desktop: Traditional top navigation with dropdowns

### Challenge 3 - The Content Choreographer
Build a dashboard where components appear/disappear/reorder based on screen size.

## Key Learning Points

- **Mobile-First Design**: Start with mobile styles, then enhance for larger screens
- **Breakpoint Utilities**: Use `sm:`, `md:`, `lg:`, `xl:`, `2xl:` prefixes
- **Responsive Utilities**: Show/hide content with responsive display classes
- **Layout Adaptation**: Transform layouts completely at different screen sizes

## File Structure

```
/dashboard
  - index.html            # Dashboard interface (Your starting point!)
  - ...                   # Other dashboard for functionality

/lessons
  - intro.md              # Introduction to responsive design
  - mobile-first.md       # Mobile-first methodology
  - breakpoint-reference.md # Tailwind breakpoint reference

/lab
  - starter-template.html # Your working file
  - solution-template.html # Example solution for reference

```

## Assessment

- Automated tests check for proper responsive utilities
- Visual regression tests ensure components work at all breakpoints
- Performance scoring based on utility efficiency
- Self-assessment through comparison with solutions

## Rules

1. **Use only Tailwind utility classes** (no custom CSS)
2. **Each component must work at all three major breakpoints**
3. **No inline styles** - encourage utility class usage
4. **Test at each breakpoint** before moving to next challenge

## Getting Help

- The lab interface provides contextual hints based on your current viewport
- Check the lessons folder for detailed explanations
- Run tests frequently to catch issues early
- Remember: Mobile-first means mobile styles are the default!

---

**Ready to begin?** Open `lab/index.html` and start your responsive design journey!

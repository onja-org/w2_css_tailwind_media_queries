# Tailwind CSS Breakpoint Reference

## Quick Reference Table

| Prefix | Min Width | CSS Equivalent | Common Devices |
|--------|-----------|----------------|----------------|
| (none) | 0px       | `@media (min-width: 0px)` | All devices (mobile-first base) |
| `sm:`  | 640px     | `@media (min-width: 640px)` | Large phones, small tablets |
| `md:`  | 768px     | `@media (min-width: 768px)` | Tablets, small laptops |
| `lg:`  | 1024px    | `@media (min-width: 1024px)` | Laptops, desktops |
| `xl:`  | 1280px    | `@media (min-width: 1280px)` | Large desktops |
| `2xl:` | 1536px    | `@media (min-width: 1536px)` | Very large screens |

## Understanding Mobile-First Breakpoints

### How Tailwind Breakpoints Work
Tailwind uses **min-width** media queries, which means:
- Base styles (no prefix) apply to ALL screen sizes
- Prefixed styles apply from that breakpoint and UP

```html
<!-- This text is blue on mobile, red on tablet+, green on desktop+ -->
<p class="text-blue-500 md:text-red-500 lg:text-green-500">
  Responsive text color
</p>
```

### Breakpoint Inheritance
Each breakpoint inherits styles from smaller breakpoints:

```
Mobile (0px+)     →  Base styles apply
  ↓
Tablet (768px+)   →  Base styles + md: styles apply
  ↓
Desktop (1024px+) →  Base styles + md: styles + lg: styles apply
```

## Detailed Breakpoint Guide

### Base Styles (No Prefix)
**Target**: All devices (mobile-first)
**Range**: 0px and up

```html
<!-- These styles apply to ALL screen sizes -->
<div class="bg-blue-500 p-4 text-white">
  Always blue background, 4 units padding
</div>
```

**Use for**:
- Essential mobile styles
- Default behavior for all devices
- Styles that should apply everywhere

### Small (`sm:`) - 640px+
**Target**: Large phones, small tablets
**Range**: 640px and up

```html
<!-- Mobile: single column, SM+: two columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**Common use cases**:
- Transition from single to multi-column layouts
- Increase text sizes slightly
- Show/hide minor elements
- Adjust spacing for larger phones

### Medium (`md:`) - 768px+
**Target**: Tablets, small laptops
**Range**: 768px and up

```html
<!-- Mobile: stacked, MD+: side-by-side -->
<div class="block md:flex md:items-center md:space-x-4">
  <img class="w-full md:w-32 md:h-32" src="..." alt="...">
  <div class="mt-4 md:mt-0">
    <h3 class="text-lg md:text-xl">Title</h3>
    <p class="text-gray-600">Description</p>
  </div>
</div>
```

**Common use cases**:
- Major layout changes (stacked → side-by-side)
- Navigation transformations
- Typography size increases
- Show additional content

### Large (`lg:`) - 1024px+
**Target**: Laptops, desktops
**Range**: 1024px and up

```html
<!-- Desktop gets hover effects and larger sizing -->
<button class="bg-blue-500 text-white px-4 py-2 rounded
               lg:px-6 lg:py-3 lg:text-lg lg:hover:bg-blue-600 lg:transition-colors">
  Button
</button>
```

**Common use cases**:
- Full desktop layouts
- Hover effects (don't work on mobile)
- Complex multi-column grids
- Larger typography and spacing

### Extra Large (`xl:`) - 1280px+
**Target**: Large desktops
**Range**: 1280px and up

```html
<!-- Even more spacing and content on very large screens -->
<div class="container mx-auto px-4 lg:px-8 xl:px-12">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <!-- 1 col mobile, 2 col tablet, 3 col desktop, 4 col large desktop -->
  </div>
</div>
```

**Common use cases**:
- Additional columns in grids
- Extra spacing and padding
- Larger container max-widths
- More complex layouts

### 2X Large (`2xl:`) - 1536px+
**Target**: Very large screens
**Range**: 1536px and up

```html
<!-- Ultra-wide screen optimizations -->
<div class="max-w-screen-xl mx-auto 2xl:max-w-screen-2xl">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
    <!-- Up to 5 columns on very large screens -->
  </div>
</div>
```

**Common use cases**:
- Ultra-wide screen layouts
- Maximum content width adjustments
- Extra-large typography
- Complex dashboard layouts

## Practical Examples

Try to reason about how these examples adapt at different breakpoints. Which styles will apply at all sizes? What changes as the screen gets larger?

### Example 1: Responsive Hero Section
```html
<section class="bg-gray-900 text-white py-12 px-4
                md:py-20 md:px-8
                lg:py-32
                xl:py-40">
  <div class="max-w-md mx-auto text-center
             md:max-w-2xl
             lg:max-w-4xl
             xl:max-w-6xl">
    <h1 class="text-3xl font-bold
               md:text-4xl
               lg:text-5xl
               xl:text-6xl">
      Responsive Hero Title
    </h1>
    <p class="mt-4 text-lg
             md:text-xl
             lg:text-2xl
             xl:mt-6">
      Subtitle that scales with screen size
    </p>
  </div>
</section>
```

### Example 2: Responsive Card Grid
```html
<div class="grid grid-cols-1 gap-4 p-4
           sm:grid-cols-2 sm:gap-6
           md:grid-cols-3 md:gap-8
           lg:grid-cols-4
           xl:grid-cols-5
           2xl:grid-cols-6">
  <!-- Cards scale from 1 column on mobile to 6 on ultra-wide -->
  <div class="bg-white rounded-lg shadow-md p-4
             md:p-6
             lg:hover:shadow-lg lg:transition-shadow">
    Card content
  </div>
</div>
```

### Example 3: Responsive Navigation
```html
<nav class="bg-white shadow-md px-4 py-3
           md:px-6
           lg:px-8">
  <div class="flex items-center justify-between
             lg:justify-start lg:space-x-8">

    <!-- Logo -->
    <div class="flex items-center">
      <img class="h-8 w-auto
                  md:h-10
                  lg:h-12" src="logo.png" alt="Logo">
    </div>

    <!-- Mobile menu button -->
    <button class="md:hidden">
      <svg class="h-6 w-6" fill="none" stroke="currentColor">
        <!-- Hamburger icon -->
      </svg>
    </button>

    <!-- Desktop navigation -->
    <div class="hidden md:flex md:items-center md:space-x-6
               lg:space-x-8">
      <a href="#" class="text-gray-700 hover:text-gray-900">Home</a>
      <a href="#" class="text-gray-700 hover:text-gray-900">About</a>
      <a href="#" class="text-gray-700 hover:text-gray-900">Contact</a>
    </div>
  </div>
</nav>
```

## Common Responsive Patterns

### 1. Progressive Enhancement
Start simple, add complexity:
```html
<!-- Mobile: simple button -->
<!-- Desktop: button with icon and hover effect -->
<button class="bg-blue-500 text-white px-4 py-2 rounded
               lg:flex lg:items-center lg:space-x-2 lg:px-6 lg:py-3
               lg:hover:bg-blue-600 lg:transition-colors">
  <span>Click me</span>
  <svg class="hidden lg:block w-4 h-4" fill="currentColor">
    <!-- Icon only shows on desktop -->
  </svg>
</button>
```

### 2. Content Choreography
Rearrange content at different sizes:
```html
<div class="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
  <div class="md:col-span-2 md:order-2">Main content</div>
  <div class="md:col-span-1 md:order-1">Sidebar</div>
</div>
```

### 3. Show/Hide Elements
```html
<!-- Mobile-only -->
<div class="block md:hidden">
  Simplified mobile content
</div>

<!-- Desktop-only -->
<div class="hidden md:block">
  Detailed desktop content
</div>

<!-- Tablet and up -->
<div class="hidden md:block">
  Tablet+ content
</div>
```

## Testing Your Breakpoints

### Browser Developer Tools
1. Open DevTools (F12)
2. Click the device toggle icon
3. Select different device sizes
4. Or manually resize the responsive view

### Common Testing Sizes
- **Mobile**: 375px, 414px
- **Tablet**: 768px, 1024px
- **Desktop**: 1280px, 1440px, 1920px

### What to Test
- ✅ Content doesn't overflow
- ✅ Touch targets are large enough (44px minimum)
- ✅ Text is readable at all sizes
- ✅ Navigation works on all devices
- ✅ Images scale properly
- ✅ Layouts don't break between breakpoints

## Best Practices

### 1. Start Mobile, Scale Up
```html
<!-- Good: Mobile-first approach -->
<div class="text-base md:text-lg lg:text-xl">
  Text that scales up
</div>

<!-- Avoid: Desktop-first approach -->
<div class="text-xl md:text-base">
  Text that scales down (not mobile-first)
</div>
```

### 2. Use Consistent Spacing Scale
```html
<!-- Good: Consistent spacing progression -->
<div class="p-4 md:p-6 lg:p-8 xl:p-12">
  Consistent spacing scale
</div>

<!-- Avoid: Random spacing jumps -->
<div class="p-2 md:p-10 lg:p-4">
  Inconsistent spacing
</div>
```

### 3. Group Related Responsive Classes
```html
<!-- Good: Grouped by property -->
<div class="w-full md:w-1/2 lg:w-1/3
           p-4 md:p-6 lg:p-8
           text-sm md:text-base lg:text-lg">
  Organized responsive classes
</div>
```

## Quick Tips

1. **Remember inheritance**: Each breakpoint inherits from smaller ones
2. **Test in between**: Check how your design looks between breakpoints
3. **Use appropriate breakpoints**: Not every style needs all breakpoints
4. **Start with content**: Let your content determine where breakpoints should be
5. **Performance matters**: More breakpoints = more CSS, use judiciously

## Breakpoint Decision Framework

Ask yourself:
- **Does this need to change?** Not every element needs responsive variants
- **At what size does it break?** Let content determine breakpoints
- **What's the user's goal?** Different devices = different user contexts
- **Is it touch-friendly?** Mobile users need larger touch targets

---

**Ready to practice?** Head back to the lab and start building responsive components with these breakpoints!

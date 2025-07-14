# Terminal Font for Mobile Persona

This file is a placeholder for the terminal font used in the mobile persona (TERMINAL-X).

## Font Information

- **Font Name**: JetBrains Mono
- **Usage**: Terminal persona interface on mobile devices
- **Source**: Google Fonts CDN
- **Fallbacks**: 'Courier New', monospace

## Implementation

The terminal font is loaded via Google Fonts CDN in the main lab HTML file:

```html
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
```

## Font Characteristics

- **Type**: Monospace
- **Weights**: 400 (Regular), 600 (Semi-bold), 700 (Bold)
- **Features**: 
  - Excellent readability
  - Coding-optimized character spacing
  - Distinctive programming ligatures
  - Retro terminal aesthetic

## CSS Usage

```css
.terminal-persona {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
}
```

## Alternative Fonts

If you want to use a different terminal font, consider:

- **Fira Code**: Great for programming with ligatures
- **Source Code Pro**: Adobe's coding font
- **Consolas**: Windows system monospace font
- **SF Mono**: Apple's system monospace font

## Browser Support

JetBrains Mono is well-supported across all modern browsers. The fallback fonts ensure compatibility with older browsers.

## Performance Note

The font is loaded from Google Fonts CDN for optimal performance and caching. If you need to use a local font file, you would place the .woff2 file in this directory and update the CSS accordingly.
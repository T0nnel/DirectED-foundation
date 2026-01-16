# iOS Safari & iPhone Compatibility Fixes

This document outlines all the iOS Safari and iPhone-specific compatibility fixes that have been implemented in the DirectEd Development Foundation website.

## Overview

The following fixes ensure optimal performance and user experience on iOS devices including iPhones and iPads running Safari.

## 1. Viewport Configuration (`index.html`)

### Meta Tags
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

**Purpose:**
- `viewport-fit=cover` - Enables proper handling of safe areas on iPhones with notches (iPhone X and later)
- `maximum-scale=1.0, user-scalable=no` - Prevents unwanted zoom behavior on iOS Safari
- `mobile-web-app-capable` - Enables full-screen mode when added to home screen
- `apple-mobile-web-app-status-bar-style` - Controls the status bar appearance on iOS

## 2. CSS Safe Area Support (`src/index.css`)

### Environment Variables
```css
--safe-area-inset-top: env(safe-area-inset-top, 0px);
--safe-area-inset-right: env(safe-area-inset-right, 0px);
--safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
--safe-area-inset-left: env(safe-area-inset-left, 0px);
```

**Purpose:**
- Ensures content is not obscured by iPhone notches, home indicators, or rounded corners
- Automatically adjusts padding on devices with safe area requirements

### Body Padding
```css
body {
  padding-top: var(--safe-area-inset-top);
  padding-bottom: var(--safe-area-inset-bottom);
  padding-left: var(--safe-area-inset-left);
  padding-right: var(--safe-area-inset-right);
}
```

## 3. Viewport Height Fix (`src/main.tsx`)

### Dynamic Viewport Height Calculation
```typescript
function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVh();
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);
```

**Purpose:**
- Fixes the common iOS Safari issue where `100vh` doesn't account for the address bar
- Updates dynamically when the address bar appears/disappears or on orientation change
- Use `calc(var(--vh, 1vh) * 100)` in CSS instead of `100vh` for accurate full-height elements

### CSS Implementation
```css
html {
  height: -webkit-fill-available;
}

body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}
```

## 4. Touch & Tap Optimizations

### Tap Highlight Removal
```css
body {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
```

**Purpose:**
- Removes the default iOS tap highlight (gray overlay)
- `touch-action: manipulation` disables double-tap zoom while keeping pinch zoom

### Text Size Adjustment
```css
body {
  -webkit-text-size-adjust: 100%;
}
```

**Purpose:**
- Prevents iOS Safari from automatically adjusting text size in landscape orientation

## 5. Momentum Scrolling

```css
body {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
}
```

**Purpose:**
- Enables smooth inertial scrolling on iOS (momentum scrolling)
- `overscroll-behavior: none` prevents pull-to-refresh interference in scrollable containers

## 6. Form Element Styling

```css
button, input, select, textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
```

**Purpose:**
- Removes default iOS Safari styling from form elements
- Allows custom styling to be applied consistently

## 7. Hardware Acceleration

### Transform Properties
All transform-based animations and hover effects include:
```css
-webkit-transform: translateZ(0);
transform: translateZ(0);
will-change: transform;
```

**Applied to:**
- `.glass-card` - Backdrop filter cards
- `.card-hover` - Interactive card components
- `.btn-enhanced` - Button animations
- All keyframe animations

**Purpose:**
- Triggers GPU acceleration for smoother animations on iOS devices
- `translateZ(0)` creates a new compositing layer
- `will-change` hints to the browser that the element will animate

## 8. Backdrop Filter Support

```css
.glass-card {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

**Purpose:**
- `-webkit-backdrop-filter` prefix ensures backdrop blur effects work on Safari
- Creates glassmorphism effects on iOS devices

## 9. WebKit Prefixes for Animations

All keyframe animations include `-webkit-transform` for maximum compatibility:

```css
@keyframes fadeUp {
  from {
    transform: translateY(30px) translateZ(0);
    -webkit-transform: translateY(30px) translateZ(0);
  }
  to {
    transform: translateY(0) translateZ(0);
    -webkit-transform: translateY(0) translateZ(0);
  }
}
```

**Applied to:**
- `@keyframes kenBurns`
- `@keyframes fadeUp`
- `@keyframes fadeIn`
- `@keyframes slideIn`
- `@keyframes scaleIn`
- `@keyframes float`

## 10. Filter Effects

```css
.btn-enhanced:hover {
  filter: brightness(1.05);
  -webkit-filter: brightness(1.05);
}
```

**Purpose:**
- Ensures filter effects work correctly on iOS Safari

## Testing Checklist

- [x] Safe area insets respected on iPhone X and later
- [x] No unwanted zoom on form element focus
- [x] Smooth momentum scrolling
- [x] Correct viewport height when address bar shows/hides
- [x] Hardware-accelerated animations perform smoothly
- [x] Backdrop blur effects render correctly
- [x] Touch interactions feel responsive
- [x] Works in both portrait and landscape orientations
- [x] No console warnings about deprecated features

## Browser Support

These fixes ensure full compatibility with:
- iOS Safari 12+
- iPadOS Safari 13+
- All modern iOS browsers (Chrome, Firefox on iOS use Safari's WebKit)

## Performance Benefits

1. **GPU Acceleration** - Offloads rendering to GPU for 60fps animations
2. **Reduced Jank** - Proper handling of iOS Safari's dynamic viewport
3. **Smooth Scrolling** - Native-feeling momentum scrolling
4. **Touch Optimized** - Disabled double-tap zoom while maintaining accessibility

## Notes for Developers

- Always test on actual iOS devices, not just simulators
- Consider using `calc(var(--vh, 1vh) * 100)` instead of `100vh` for full-height sections
- Use safe area insets when positioning fixed elements
- Test in both Safari and other iOS browsers (they all use WebKit)
- Test with iPhone SE (small screen) through iPhone 14 Pro Max (large screen + notch)

## Future Considerations

- Monitor for new iOS Safari features and requirements
- Update webkit prefixes as they become standardized
- Test with upcoming iOS versions in beta
- Consider Progressive Web App (PWA) enhancements for iOS

---

**Last Updated:** January 2026
**Tested On:** iOS Safari 17.x

# Quick CSS Class Reference 📚

## Button Classes

### Style Variants
```
.btn              - Default button (blue background)
.btn.gradient     - Gradient background with shadow
.btn.outline      - Transparent with colored border
.btn.ghost        - Minimal style with border
.btn.small        - Compact button
.btn.large        - Oversized button
.btn.fullwidth    - Full width button
.btn:disabled      - Disabled state (auto-applied)
```

## Card Classes

### Card Styles
```
.card            - Basic card (white bg, border)
.card.elevated   - Card with shadow
.card.compact    - Reduced padding
.card.interactive - Clickable styling
.card-hover      - Lift on hover
.neumorphic      - Soft UI design
.glass           - Glassmorphism effect
```

## Badge Classes

### Badge Variants
```
.badge           - Default gray badge
.badge.primary   - Blue badge
.badge.success   - Green badge
.badge.warning   - Orange badge
.badge.danger    - Red badge
```

## Text Classes

### Font Sizes
```
.text-sm         - 13px
.text-base       - 15px
.text-lg         - 18px
.text-xl         - 24px
.text-2xl        - 32px
```

### Text Styling
```
.text-center     - Center align
.text-right      - Right align
.text-muted      - Gray color
.text-accent     - Blue color
.text-danger     - Red color
.text-success    - Green color
.font-bold       - Weight 600
.font-medium     - Weight 500
.font-light      - Weight 400
.gradient-text   - Blue gradient fill
```

## Shadow Classes

### Shadow Depths
```
.shadow-sm       - Subtle (0 1px 2px)
.shadow-md       - Mild (0 4px 6px)
.shadow-lg       - Medium (0 10px 15px)
.shadow-xl       - Large (0 20px 25px)
.shadow-2xl      - Extra Large (0 25px 50px)
```

## Spacing Classes

### Margin Top
```
.mt-0            - margin-top: 0
.mt-8            - margin-top: 8px
.mt-12           - margin-top: 12px
.mt-16           - margin-top: 16px
.mt-24           - margin-top: 24px
```

### Margin Bottom
```
.mb-0            - margin-bottom: 0
.mb-8            - margin-bottom: 8px
.mb-12           - margin-bottom: 12px
.mb-16           - margin-bottom: 16px
.mb-24           - margin-bottom: 24px
```

### Padding
```
.p-8             - padding: 8px
.p-12            - padding: 12px
.p-16            - padding: 16px
.p-24            - padding: 24px
```

## Effect Classes

### Animation Effects
```
.float           - Floating motion (3s infinite)
.lift            - Elevation on hover
.ripple          - Click ripple animation
.rotate-hover    - Rotate & scale on hover
.scale-on-hover  - Smooth scale effect
.glow-blue       - Blue glow on hover
.glow-green      - Green glow
.glow-red        - Red glow
```

### Visual Effects
```
.gradient-text      - Gradient fill text
.underline-hover    - Animated underline
.blur               - Blur with unhover
.particles-bg       - Particle background
.animated-border    - Border animation
.animated-bg        - Background animation
.gradient-animation - Gradient shift loop
.glass              - Glassmorphic effect
.neumorphic         - Soft UI style
.perspective        - 3D perspective
```

## Transition Classes

### Animation Speeds
```
.transition         - Standard 160ms ease
.transition-fast    - Fast 80ms ease
.transition-slow    - Slow 300ms ease
.transition-none    - No transition
```

## Form Classes

### Input Styling
```
.form-group              - Input container
.form-group.error        - Error state (red border)
.error-message           - Error text (red)
.success-message         - Success text (green)
.input-icon              - Icon + input
.input-icon-element      - Icon positioning
.focus-ring              - Focus outline
```

## Loading Classes

### Loading States
```
.spinner         - Default spinner
.spinner-sm      - Small spinner
.spinner-lg      - Large spinner
.skeleton        - Skeleton loader
.skeleton-text   - Text skeleton
.skeleton-title  - Title skeleton
.skeleton-block   - Block skeleton
```

## List Classes

```
.list            - Styled list
.list li         - List items with borders
.list.compact li - Compact spacing
```

## Divider Classes

```
.divider              - Horizontal divider
.divider-vertical     - Vertical divider
.gradient-divider     - Gradient divider
```

## Color Classes

### Text Colors
```
Background: #111 (text-dark)
Muted: #666       (text-muted)
Accent: #0b5fff   (text-accent)
Danger: #ef4444   (text-danger)
Success: #10b981  (text-success)
```

## Animation Keyframes Reference

```css
@keyframes fadeIn           /* 0-100% opacity */
@keyframes slideUp          /* Y translate 16px, opacity change */
@keyframes slideInLeft      /* X translate -20px, opacity */
@keyframes slideInRight     /* X translate 20px, opacity */
@keyframes scaleIn          /* Scale 0.95 to 1 */
@keyframes bounce           /* Y translate 0 to -8px to 0 */
@keyframes glow             /* Box-shadow expand pulse */
@keyframes spin             /* 360° rotation */
@keyframes shimmer          /* Background animation */
@keyframes float            /* Y translate 0 to -10px */
@keyframes gradient-animation /* Gradient position shift */
@keyframes ripple           /* Scale 0 to 4 with opacity fade */
```

## Quick Snippets

### Floating Card
```html
<div class="card elevated float">
  <h3>Floating Card</h3>
  <p>Hovers above</p>
</div>
```

### Gradient Button
```html
<button class="btn gradient">Click Me</button>
```

### Badge Set
```html
<span class="badge primary">New</span>
<span class="badge success">Active</span>
<span class="badge danger">Urgent</span>
```

### Loading State
```html
<div class="spinner"></div>
<p>Loading...</p>
```

### Glassmorphic Card
```html
<div class="glass p-16" style="border-radius: 12px;">
  <h3>Glass Card</h3>
</div>
```

### Tooltip
```html
<div class="tooltip">
  Hover Text
  <span class="tooltip-text">Tooltip content</span>
</div>
```

### Animated Gradient
```html
<div class="animated-bg" style="padding: 40px; border-radius: 8px; color: white;">
  Gradient Background
</div>
```

### Icon with Ripple
```html
<button class="ripple" style="width: 50px; height: 50px; border-radius: 50%; border: none; background: #0b5fff; color: white; cursor: pointer;">
  ✓
</button>
```

## Responsive Classes

Classes automatically adapt at:
- **1200px**: Full layout
- **768px**: Tablet adjustments
- **480px**: Mobile single-column

No separate classes needed - all built-in!

## Accessibility

All classes maintain:
- WCAG AA contrast ratios
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- Touch-friendly sizing
- Print-friendly output

## Browser Compatibility

✅ Chrome/Edge (Latest)  
✅ Firefox (Latest)  
✅ Safari (Latest)  
✅ Mobile browsers  
✅ IE 11 (partially)  

---

**Pro Tips:**
1. Combine classes: `btn gradient float`
2. Use shadows with cards: `card elevated shadow-lg`
3. Stack spacing: `mt-16 mb-24 p-12`
4. Color variety: Mix `text-accent` with `badge primary`
5. Animations stack: `float scale-on-hover`

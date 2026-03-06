# Styles Directory

This directory contains global styles, CSS variables, and styling utilities for the application.

## Files

### `variables.css`
Contains all CSS custom properties (variables) for:
- Colors (primary, secondary, heritage types, neutrals)
- Spacing scale
- Typography (font families, sizes, weights, line heights)
- Border radius values
- Shadows
- Transitions
- Z-index layers
- Breakpoints

### `global.css`
Contains global styles including:
- CSS reset and base styles
- Typography defaults
- Form element styles
- Utility classes
- Scrollbar styling
- Print styles

## Usage

### Using CSS Variables
```css
.my-component {
  color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}
```

### Using Tailwind Classes
```jsx
<div className="container-responsive">
  <button className="btn btn-primary btn-lg">
    Click Me
  </button>
</div>
```

### Using CSS Modules
For component-specific styles, create a `.module.css` file:

```css
/* Button.module.css */
.button {
  composes: btn btn-primary from global;
  /* Additional component-specific styles */
}

.button:hover {
  transform: translateY(-2px);
}
```

```jsx
// Button.jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>Click</button>;
}
```

## Styling Approach

1. **Global Styles**: Use for app-wide resets, typography, and base element styles
2. **Tailwind Utilities**: Use for rapid prototyping and common patterns
3. **CSS Modules**: Use for component-specific styles that need scoping
4. **CSS Variables**: Use for theming and maintaining consistency

## Responsive Design

Use Tailwind's responsive prefixes:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>
```

Or use CSS media queries with breakpoint variables:
```css
@media (min-width: 768px) {
  .my-component {
    /* Tablet and up styles */
  }
}
```

## Heritage Type Colors

Special colors for heritage types:
- Mahjong: `--color-heritage-mahjong` / `badge-heritage-mahjong`
- Go: `--color-heritage-go` / `badge-heritage-go`
- Chess: `--color-heritage-chess` / `badge-heritage-chess`
- Dominoes: `--color-heritage-dominoes` / `badge-heritage-dominoes`

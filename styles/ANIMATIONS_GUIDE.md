# Animation Guide

This guide explains how to use animations and transitions in the application.

## Table of Contents

1. [Animation Classes](#animation-classes)
2. [Transition Utilities](#transition-utilities)
3. [React Components](#react-components)
4. [Custom Hooks](#custom-hooks)
5. [Accessibility](#accessibility)
6. [Best Practices](#best-practices)

## Animation Classes

### Fade Animations

```jsx
<div className="animate-fade-in">Fades in</div>
<div className="animate-fade-out">Fades out</div>
<div className="animate-fade-in-up">Fades in from bottom</div>
<div className="animate-fade-in-down">Fades in from top</div>
```

### Slide Animations

```jsx
<div className="animate-slide-in">Slides in from left</div>
<div className="animate-slide-in-right">Slides in from right</div>
<div className="animate-slide-up">Slides up</div>
<div className="animate-slide-down">Slides down</div>
```

### Scale Animations

```jsx
<div className="animate-scale-in">Scales in</div>
<div className="animate-zoom-in">Zooms in</div>
```

### Special Animations

```jsx
<div className="animate-bounce">Bounces</div>
<div className="animate-shake">Shakes</div>
<div className="animate-pulse">Pulses continuously</div>
<div className="animate-spin">Spins continuously</div>
```

### Animation Modifiers

```jsx
{/* Delays */}
<div className="animate-fade-in animate-delay-100">Delayed 100ms</div>
<div className="animate-fade-in animate-delay-200">Delayed 200ms</div>
<div className="animate-fade-in animate-delay-300">Delayed 300ms</div>

{/* Durations */}
<div className="animate-fade-in animate-fast">Fast (150ms)</div>
<div className="animate-fade-in animate-normal">Normal (300ms)</div>
<div className="animate-fade-in animate-slow">Slow (500ms)</div>
<div className="animate-fade-in animate-slower">Slower (1s)</div>
```

## Transition Utilities

### Basic Transitions

```jsx
<button className="transition-all hover:scale-105">
  Smooth transition on all properties
</button>

<div className="transition-colors hover:bg-blue-500">
  Transition colors only
</div>

<div className="transition-opacity hover:opacity-50">
  Transition opacity only
</div>

<div className="transition-transform hover:translate-x-2">
  Transition transform only
</div>
```

### Hover Effects

```jsx
<div className="hover-lift">Lifts up on hover</div>
<div className="hover-scale">Scales up on hover</div>
<div className="hover-brightness">Brightens on hover</div>
<div className="hover-opacity">Fades on hover</div>
```

## React Components

### PageTransition

Automatically animates page changes:

```jsx
import PageTransition from './components/PageTransition';

function App() {
  return (
    <PageTransition>
      <YourPageContent />
    </PageTransition>
  );
}
```

### AnimatedCard

Animates when element enters viewport:

```jsx
import AnimatedCard from './components/AnimatedCard';

function ProductList() {
  return (
    <div>
      {products.map((product) => (
        <AnimatedCard key={product.id} animation="animate-fade-in-up">
          <ProductCard product={product} />
        </AnimatedCard>
      ))}
    </div>
  );
}
```

Props:
- `animation`: Animation class to apply (default: 'animate-fade-in-up')
- `triggerOnce`: Animate only once (default: true)
- `threshold`: Intersection threshold (default: 0.1)

## Custom Hooks

### useInViewAnimation

Trigger animations when element enters viewport:

```jsx
import { useInViewAnimation } from '../hooks/useAnimation';

function MyComponent() {
  const { ref, isInView } = useInViewAnimation({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={isInView ? 'animate-fade-in' : 'opacity-0'}
    >
      Content
    </div>
  );
}
```

### useStaggerAnimation

Create staggered animations for lists:

```jsx
import { useStaggerAnimation } from '../hooks/useAnimation';

function ListComponent({ items }) {
  const { getStyle } = useStaggerAnimation(100); // 100ms between items

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="animate-fade-in-up"
          style={getStyle(index)}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

### useAnimationState

Manage animation state:

```jsx
import { useAnimationState } from '../hooks/useAnimation';

function Button() {
  const { animationClass, startAnimation } = useAnimationState();

  const handleClick = () => {
    startAnimation('animate-bounce', 500);
  };

  return (
    <button
      className={animationClass}
      onClick={handleClick}
    >
      Click me!
    </button>
  );
}
```

### usePrefersReducedMotion

Respect user's motion preferences:

```jsx
import { usePrefersReducedMotion } from '../hooks/useAnimation';

function AnimatedComponent() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={prefersReducedMotion ? '' : 'animate-fade-in'}>
      Content
    </div>
  );
}
```

## Accessibility

### Respecting User Preferences

The animation system automatically respects the `prefers-reduced-motion` media query. Users who have enabled reduced motion in their system settings will see minimal or no animations.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Best Practices

1. **Always provide fallbacks**: Ensure content is accessible even without animations
2. **Use semantic HTML**: Animations should enhance, not replace, semantic structure
3. **Test with reduced motion**: Always test your app with reduced motion enabled
4. **Avoid flashing**: Keep animations smooth and avoid rapid flashing that could trigger seizures

## Best Practices

### Performance

1. **Use CSS animations over JavaScript**: CSS animations are hardware-accelerated
2. **Animate transform and opacity**: These properties are cheap to animate
3. **Avoid animating layout properties**: Width, height, margin, padding cause reflows
4. **Use will-change sparingly**: Only for elements that will definitely animate

```css
/* Good - animates transform */
.good {
  transition: transform 0.3s;
}

.good:hover {
  transform: scale(1.1);
}

/* Bad - animates width */
.bad {
  transition: width 0.3s;
}

.bad:hover {
  width: 200px;
}
```

### Timing

1. **Fast interactions**: 150-200ms for hover effects
2. **Normal transitions**: 250-350ms for most animations
3. **Slow reveals**: 400-600ms for page transitions
4. **Continuous animations**: 1-2s for loading spinners

### Easing

1. **ease-out**: For elements entering (feels snappy)
2. **ease-in**: For elements exiting (feels natural)
3. **ease-in-out**: For elements that move position

### Staggering

When animating lists, stagger the animations:

```jsx
<div className="grid">
  {items.map((item, index) => (
    <div
      key={item.id}
      className="stagger-item"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {item.content}
    </div>
  ))}
</div>
```

### Loading States

Use skeleton screens with shimmer animation:

```jsx
<div className="skeleton" style={{ width: '100%', height: '200px' }} />
```

## Examples

### Product Card with Hover Effect

```jsx
function ProductCard({ product }) {
  return (
    <div className="card hover-lift transition-all">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
}
```

### Modal with Transitions

```jsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay animate-fade-in" onClick={onClose} />
      <div className="modal animate-scale-in">
        {children}
      </div>
    </>
  );
}
```

### Toast Notification

```jsx
function Toast({ message, type }) {
  return (
    <div className={`toast toast-${type} animate-slide-down`}>
      {message}
    </div>
  );
}
```

### Page Transition

```jsx
import { useLocation } from 'react-router-dom';
import PageTransition from './components/PageTransition';

function App() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </PageTransition>
  );
}
```

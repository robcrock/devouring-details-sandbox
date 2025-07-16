# Prototype Template

This is a standardized template for creating new Devouring Details prototypes.

## Usage

1. Copy this entire folder and rename it to your prototype name
2. Update the component name in `index.tsx` (replace "PrototypeName")
3. Implement your prototype following the established patterns
4. Add your component to the registry in `devouring-details-sandbox.tsx`

## File Structure

```
your-prototype/
├── index.tsx          # Main component file
├── hooks/            # Custom hooks (optional)
├── utils/            # Utility functions (optional)
└── README.md         # This file
```

## Best Practices

### Design System

- Use the provided design system (colors, spacing, typography)
- Background: `bg-gradient-to-br from-gray1 via-gray1 to-gray2/20`
- Text colors: `text-gray12` (primary), `text-gray11` (secondary)
- Accent color: `text-orange`
- Borders: `border-gray3/50` or `border-gray3/30`

### Motion Patterns

- Use Motion library (import from "motion/react")
- Follow spring physics: `damping: 45, stiffness: 600`
- Add subtle hover effects with `whileHover`
- Use consistent transition durations: `duration: 0.2`

### Component Structure

```typescript
// Main component with proper typing
export default function YourPrototype() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray1 via-gray1 to-gray2/20">
      {/* Your prototype content */}

      {/* Instructions overlay - recommended for user guidance */}
      <Instructions />
    </div>
  );
}

// Instructions component for user guidance
function Instructions() {
  return (
    <motion.div
      className="fixed z-20 -translate-x-1/2 bottom-8 left-1/2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="px-6 py-4 border shadow-xl bg-gray2/80 backdrop-blur-md rounded-2xl border-gray3/50">
        <p className="text-sm text-center text-gray11">
          Add your interaction instructions here
        </p>
      </div>
    </motion.div>
  );
}
```

### Imports and Dependencies

- Use TypeScript for all components
- Use relative imports: `import { clamp } from '../../shared/utils/clamp'`
- Use React.lazy for code splitting in registry
- Add dependencies to registry entry

### Responsive Design

- Desktop-focused design
- Use responsive Tailwind classes when needed
- Test at different viewport sizes

### Code Style

- Use functional components with TypeScript
- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Keep components self-contained and reusable

## Common Patterns

### Animation Setup

```typescript
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.2 }}
>
  Content
</motion.div>
```

### Hover Effects

```typescript
<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.2 }}
  className="cursor-pointer"
>
  Hover me
</motion.div>
```

### Using Shared Utilities

```typescript
import { clamp, lerp } from "../../shared/utils/clamp";
import { useAnimationFrame } from "../../shared/hooks/useAnimationFrame";
```

## Registry Entry Example

When adding to `devouring-details-sandbox.tsx`:

```typescript
"your-prototype-name": {
  name: "Your Prototype Name",
  category: "Prototypes",
  component: React.lazy(() => import("./your-prototype-name")),
  description: "Brief description of what this prototype demonstrates",
  dependencies: ["motion"],
  source: "your-prototype-name.tsx",
  principles: ["Motion", "Feedback", "Proximity"], // Add relevant principles
}
```

## Testing

1. Run `pnpm dev` to start the development server
2. Your prototype should appear in the sidebar under "Prototypes"
3. Test all interactions and animations
4. Verify responsive behavior
5. Check for console errors

## Documentation

- Add inline comments for complex logic
- Include interaction instructions in the UI
- Document any custom hooks or utilities
- Update this README if you add new patterns

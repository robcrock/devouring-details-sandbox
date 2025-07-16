# Shared Hooks

This directory contains reusable hooks that can be used across multiple prototypes.

## Available Hooks

- `useAnimationFrame` - Request animation frame hook for smooth animations

## Usage

Import hooks from `@/shared/hooks/[hook-name]` to maintain consistency across prototypes.

```typescript
import { useAnimationFrame } from "@/shared/hooks/useAnimationFrame";
```

## Contributing

When creating reusable hooks:

1. Add them to this shared directory
2. Include TypeScript types
3. Add usage documentation with examples
4. Update this README
5. Follow the existing code style and patterns

## Hook Documentation

### useAnimationFrame

Hook for running animations with requestAnimationFrame.

```typescript
import { useAnimationFrame } from "@/shared/hooks/useAnimationFrame";

function MyComponent() {
  useAnimationFrame((deltaTime) => {
    // Animation logic here
    console.log("Frame delta:", deltaTime);
  }, true);
}
```

**Parameters:**

- `callback: (deltaTime: number) => void` - Function to run on each frame
- `active: boolean` - Whether the animation should be active (default: true)

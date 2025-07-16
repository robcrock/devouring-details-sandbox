# Adding New Prototypes

This guide provides step-by-step instructions for adding new prototypes to the Devouring Details sandbox.

## Quick Start (30 seconds)

1. **Copy the template:**

   ```bash
   cp -r src/components/prototype-template src/components/your-prototype-name
   ```

2. **Update the component:**
   - Rename the component name in `index.tsx`
   - Implement your prototype

3. **Add to registry:**
   - Open `src/components/devouring-details-sandbox.tsx`
   - Add your component to the `componentRegistry`

## Detailed Instructions

### 1. Create Your Prototype

**Option A: Copy Template (Recommended)**

```bash
# Copy the template
cp -r src/components/prototype-template src/components/my-awesome-prototype

# Or on Windows
xcopy src\components\prototype-template src\components\my-awesome-prototype /E /I
```

**Option B: Manual Creation**
Create the following structure:

```
src/components/your-prototype-name/
├── index.tsx          # Main component
├── hooks/            # Custom hooks (optional)
├── utils/            # Utility functions (optional)
└── README.md         # Documentation
```

### 2. Implement Your Prototype

Update `index.tsx`:

```typescript
// Replace "MyAwesomePrototype" with your actual component name
export default function MyAwesomePrototype() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray1 via-gray1 to-gray2/20">
      {/* Your prototype implementation */}

      {/* Instructions overlay - optional but recommended */}
      <Instructions />
    </div>
  );
}

function Instructions() {
  return (
    <motion.div className="fixed z-20 -translate-x-1/2 bottom-8 left-1/2">
      <div className="px-6 py-4 border shadow-xl bg-gray2/80 backdrop-blur-md rounded-2xl border-gray3/50">
        <p className="text-sm text-center text-gray11">
          Add your interaction instructions here
        </p>
      </div>
    </motion.div>
  );
}
```

### 3. Add to Component Registry

Open `src/components/devouring-details-sandbox.tsx` and add:

```typescript
const componentRegistry: Record<string, ComponentInfo> = {
  // ... existing components ...
  "my-awesome-prototype": {
    name: "My Awesome Prototype",
    category: "Prototypes",
    component: React.lazy(() => import("./my-awesome-prototype")),
    description: "Brief description of what this prototype does",
    dependencies: ["motion"], // Add any dependencies
    source: "my-awesome-prototype.tsx",
    principles: ["Motion", "Feedback", "Proximity"], // Add relevant principles
  },
};
```

### 4. Test Your Prototype

```bash
pnpm dev
```

Your prototype will appear in the sidebar under "Prototypes".

## Common Patterns

### Scroll-based Interactions

```typescript
import { useScroll } from "motion/react";

const { scrollY } = useScroll();
```

### Mouse Proximity Effects

```typescript
// Create custom hook or use existing patterns
// See line-minimap for examples
```

### Animation Frame Loop

```typescript
import { useAnimationFrame } from "../../shared/hooks/useAnimationFrame";
```

### Value Clamping and Interpolation

```typescript
import { clamp, lerp, mapRange } from "../../shared/utils/clamp";
```

## Troubleshooting

### Component Not Appearing

- Check the import path in the registry
- Ensure the component has a default export
- Verify the registry key matches the folder name
- Check for TypeScript errors

### TypeScript Errors

- Ensure all props are properly typed
- Check for missing imports
- Use the existing type patterns as reference

### Styling Issues

- Check if Tailwind classes are available
- Ensure you're using the design system variables
- Verify CSS custom properties are defined
- Check for conflicting styles

## Examples

See existing prototypes for reference:

- `src/components/line-minimap/` - Complex scroll-based interaction
- `src/components/prototype-template/` - Clean starting point

## Documentation

When creating new prototypes:

1. Add a README.md in your prototype folder if it's complex
2. Document any custom hooks or utilities
3. Include interaction instructions in the UI
4. Add relevant principles to the registry entry

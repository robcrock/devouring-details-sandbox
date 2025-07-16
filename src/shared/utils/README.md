# Shared Utilities

This directory contains reusable utility functions that can be used across multiple prototypes.

## Available Utilities

- `clamp` - Clamp values between min/max
- `lerp` - Linear interpolation
- `mapRange` - Map values between ranges
- `random` - Random number utilities

## Usage

Import utilities from `@/shared/utils/[utility-name]` to maintain consistency across prototypes.

```typescript
import { clamp, lerp, mapRange, random } from "@/shared/utils/clamp";
```

## Contributing

When creating reusable utilities:

1. Add them to this shared directory
2. Include TypeScript types
3. Add usage documentation with examples
4. Update this README
5. Follow the existing code style and patterns

## Utility Documentation

### clamp

Clamps a value between a minimum and maximum value.

```typescript
import { clamp } from "@/shared/utils/clamp";

const value = 150;
const clamped = clamp(value, 0, 100); // Returns 100
```

**Parameters:**

- `value: number` - The value to clamp
- `min: number` - The minimum value
- `max: number` - The maximum value
- **Returns:** The clamped value

### lerp

Linear interpolation between two values.

```typescript
import { lerp } from "@/shared/utils/clamp";

const interpolated = lerp(0, 100, 0.5); // Returns 50
```

**Parameters:**

- `start: number` - Starting value
- `end: number` - Ending value
- `t: number` - Interpolation factor (0-1)
- **Returns:** Interpolated value

### mapRange

Maps a value from one range to another.

```typescript
import { mapRange } from "@/shared/utils/clamp";

const mapped = mapRange(50, 0, 100, 0, 1); // Returns 0.5
```

**Parameters:**

- `value: number` - The value to map
- `inMin: number` - Input range minimum
- `inMax: number` - Input range maximum
- `outMin: number` - Output range minimum
- `outMax: number` - Output range maximum
- **Returns:** Mapped value

### random

Generates a random number within a range.

```typescript
import { random } from "@/shared/utils/clamp";

const rand = random(0, 100); // Returns random number between 0 and 100
```

**Parameters:**

- `min: number` - Minimum value
- `max: number` - Maximum value
- **Returns:** Random number between min and max

# Devouring Details Sandbox

An interactive reference environment for exploring UI components and interaction patterns from the Devouring Details course by Rauno Freiberg.

## Overview

This sandbox provides a development environment where you can:

- Explore interactive components from the course
- View implementation details and source code
- Test and modify components in isolation
- Learn interaction design principles through hands-on experimentation

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd devouring-details-sandbox

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The sandbox will be available at `http://localhost:5173`

## Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm lint       # Run ESLint
```

## Project Structure

```
devouring-details-sandbox/
├── src/
│   ├── components/
│   │   ├── devouring-details-sandbox.tsx  # Main sandbox UI
│   │   ├── line-minimap/                  # Line minimap component
│   │   │   ├── index.tsx                  # Main component
│   │   │   ├── hooks/                     # Component-specific hooks
│   │   │   │   ├── useMouseX.ts
│   │   │   │   ├── useProximity.ts
│   │   │   │   ├── useRequestAnimationFrame.ts
│   │   │   │   └── useScrollX.ts
│   │   │   └── utils/                     # Component utilities
│   │   │       ├── constants.ts
│   │   │       ├── line-utils.ts
│   │   │       └── math-utils.ts
│   │   └── prototype-template/            # Template for new prototypes
│   ├── shared/                            # Shared utilities and hooks
│   │   ├── hooks/                         # Reusable React hooks
│   │   │   ├── useAnimationFrame.ts
│   │   │   └── README.md
│   │   └── utils/                         # Shared utility functions
│   │       ├── clamp.ts
│   │       └── README.md
│   ├── App.tsx                            # App entry point
│   ├── main.tsx                           # Main entry point
│   ├── index.css                          # Global styles + design system
│   └── vite-env.d.ts                      # Vite environment types
├── public/
│   └── fonts/                             # Custom fonts
├── CLAUDE.md                              # Documentation for AI assistants
├── ADDING_NEW_PROTOTYPES.md               # Guide for adding new components
└── package.json
```

## Adding New Components

1. Create your component in `src/components/` (organize complex components in folders with their utilities and hooks)
2. Add it to the component registry in `devouring-details-sandbox.tsx`:

```typescript
const componentRegistry: Record<string, ComponentInfo> = {
  "your-component": {
    name: "Your Component Name",
    category: "Prototypes",
    component: React.lazy(() => import("./your-component")),
    description: "Brief description",
    dependencies: ["motion"],
    source: "your-component.tsx",
    principles: ["Motion", "Feedback"],
  },
};
```

For detailed instructions, see [ADDING_NEW_PROTOTYPES.md](ADDING_NEW_PROTOTYPES.md).

## Design System

The project uses a custom design system with CSS custom properties defined in `src/index.css`. Key features:

- **Colors**: Gray scale, semantic colors (orange, red, blue, etc.)
- **Typography**: Custom "DD" font, responsive type scale
- **Spacing**: 4px base unit system
- **Shadows**: Layered shadow system for depth
- **Motion**: Spring-based animations with Motion (Framer Motion)

## Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Motion** - Animation library (successor to Framer Motion)
- **Tailwind CSS v4** - Utility-first CSS framework with custom theme
- **Lucide React** - Icon library

## Component Guidelines

When creating components:

1. Use TypeScript for all components
2. Follow the existing motion patterns with Motion
3. Ensure components are self-contained and reusable
4. Add proper documentation and examples
5. Test across different viewport sizes (desktop-focused)
6. Use the prototype template as a starting point

## Available Shared Resources

### Utilities

- `clamp` - Clamp values between min/max
- `lerp` - Linear interpolation
- `mapRange` - Map values between ranges
- `random` - Random number utilities

### Hooks

- `useAnimationFrame` - Request animation frame hook

## Recent Updates

- Updated to React 19 with latest features
- Migrated from Framer Motion to Motion library
- Enhanced Tailwind CSS v4 configuration
- Improved component organization and documentation
- Added prototype template for consistent new component creation

## Contributing

1. Follow the existing code style
2. Run `pnpm lint` before committing
3. Test your components thoroughly
4. Update the component registry when adding new components
5. Update documentation when adding shared utilities or hooks

## License

This project is for educational purposes as part of the Devouring Details course.

## Credits

Created by Rauno Freiberg for the [Devouring Details](https://devouring.io) course.

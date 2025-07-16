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
- pnpm (or npm/yarn)

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
pnpm typecheck  # Run TypeScript type checking
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
│   │   └── utilities/                     # Shared utilities
│   ├── App.tsx                           # App entry point
│   ├── main.tsx                          # Main entry point
│   └── index.css                         # Global styles + design system
├── public/
│   └── fonts/                            # Custom fonts
├── CLAUDE.md                             # Documentation for AI assistants
└── package.json
```

## Adding New Components

1. Create your component in `src/components/` (organize complex components in folders with their utilities and hooks)
2. Add it to the component registry in `devouring-details-sandbox.tsx`:

```typescript
const componentRegistry: Record<string, ComponentInfo> = {
  'your-component': {
    name: 'Your Component Name',
    category: 'Prototypes',
    component: React.lazy(() => import('./your-component')),
    description: 'Brief description',
    dependencies: ['framer-motion'],
    source: 'your-component.tsx',
    principles: ['Motion', 'Feedback']
  }
};
```

## Design System

The project uses a custom design system with CSS custom properties defined in `src/index.css`. Key features:

- **Colors**: Gray scale, semantic colors (orange, red, blue, etc.)
- **Typography**: Custom "DD" font, responsive type scale
- **Spacing**: 4px base unit system
- **Shadows**: Layered shadow system for depth
- **Motion**: Spring-based animations with Framer Motion

## Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Motion (Framer Motion)** - Animation library
- **Tailwind CSS v4** - Utility-first CSS framework with custom theme

## Component Guidelines

When creating components:
1. Use TypeScript for all components
2. Follow the existing motion patterns with Framer Motion
3. Ensure components are self-contained and reusable
4. Add proper documentation and examples
5. Test across different viewport sizes (desktop-focused)

## Recent Updates

- Refactored line-minimap component with improved file organization
- Fixed Tailwind CSS v4 configuration for proper utility class support
- Enhanced component rendering within the sandbox environment
- Removed excessive animation effects for cleaner UI

## Contributing

1. Follow the existing code style
2. Run `pnpm lint` before committing
3. Test your components thoroughly
4. Update the component registry when adding new components

## License

This project is for educational purposes as part of the Devouring Details course.

## Credits

Created by Rauno Freiberg for the [Devouring Details](https://devouring.io) course.
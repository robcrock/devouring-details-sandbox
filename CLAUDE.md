# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application that serves as an interactive sandbox for showcasing UI prototypes from the "Devouring Details" course. It provides a component gallery with dark mode support.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server (port 5173)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint

# Type checking (runs automatically with build)
tsc -b
```

## Architecture Overview

### Core Structure

The application is built around a sandbox pattern where individual UI prototypes are:
1. Registered in a component registry (`src/components/sandbox/devouring-details-sandbox.tsx`)
2. Lazy-loaded for performance
3. Displayed in an interactive preview interface

### Key Components

- **Main Sandbox** (`src/components/sandbox/devouring-details-sandbox.tsx`): The primary application shell that provides:
  - Component registry and routing
  - Dark mode toggle
  - Responsive sidebar navigation
  - Component preview area

- **Design System** (`src/index.css`): Comprehensive CSS design tokens including:
  - Color system with P3 color space support
  - Typography scale
  - Spacing and layout utilities
  - Motion/animation utilities
  - Tailwind CSS v4 with custom theme configuration

### Adding New Components

To add a new prototype to the sandbox:

1. Create your component in `src/components/[component-name]/`
2. Export it as the default export
3. Add it to the `components` array in `devouring-details-sandbox.tsx`:
   ```typescript
   {
     id: 'component-id',
     name: 'Component Name',
     component: lazy(() => import('../component-name/source')),
     sourceUrl: '/src/components/component-name/source.tsx'
   }
   ```

### Technology Stack

- **React 19.1.0**: UI framework
- **TypeScript 5.8.3**: Type safety with strict mode enabled
- **Vite 7.0.4**: Build tool and dev server
- **Motion (Framer Motion) 12.23.6**: Animation library
- **Lucide React**: Icon library

### TypeScript Configuration

- Strict mode enabled
- ES2022 target for modern features
- Separate configs for app code (`tsconfig.app.json`) and Node.js tooling (`tsconfig.node.json`)

### Known Issues

The sandbox component currently has duplicate imports that should be cleaned up for better maintainability.
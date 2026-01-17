# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React SPA rent calculator for flatmates that splits rent equitably based on room sizes and occupancy. Live at https://costmyflat.com.

**Stack**: React 18, TypeScript 5, Vite, MUI v5 (Material-UI)

## Commands

```bash
npm run dev        # Dev server on http://localhost:3000
npm run test       # Vitest in watch mode
npm run test:ci    # Vitest single run (for CI)
npm run build      # Production build to build/
npm run preview    # Preview production build
npm run prettier   # Format code
```

## Architecture

**State Management**: All state lives in `App.tsx` and flows down via props. No Redux/Context - uses React Hooks with a custom `usePersistentState` hook for localStorage persistence.

**Key Directories**:
- `src/components/app/` - Feature components (house, flatmates, rent)
- `src/common/utilities/` - Custom hooks and helpers
- `src/common/entities/` - TypeScript interfaces (RoomProps, FlatmateProps)

**Core Entities**:
- `RoomProps`: id, name, width, height, occupants[]
- `FlatmateProps`: id, name, color

**Patterns**:
- Functional components with TypeScript interfaces
- Barrel exports via index.tsx files
- Tests co-located with components (*.test.tsx)
- Immutable state updates via lodash `cloneDeep`
- Drag-and-drop via react-dnd

## Testing

Tests use Vitest with React Testing Library. A localStorage mock is in `setupTests.ts`. Most are smoke tests (render without crashing) plus unit tests for utilities.

## CI/CD

GitHub Actions on push: install → test → build → deploy to Netlify via webhook.

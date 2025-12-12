# Princess Amara Learning App

## Overview

Princess Amara's Learning Adventure is a K-3 educational app designed for early learners (kindergarten through 3rd grade). The app provides an engaging, minimalist learning experience through two primary educational paths: Math World and History World. Children progress through 20 total levels (10 math + 10 history) while being guided by Princess Amara and various historical figures.

The application emphasizes cultural diversity by featuring historically significant figures from underrepresented backgrounds, including The Moors (Islamic scholars and builders), Native American and African innovators, and Asian navigators and women pioneers. The design follows a Pocoyo-inspired aesthetic with clean white backgrounds, rounded shapes, bright accent colors, and simple animations to create a joyful, distraction-free learning environment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React with TypeScript for type-safe component development
- Wouter for lightweight client-side routing
- Vite as the build tool and development server

**UI Component System**
- Shadcn/ui component library (New York style variant) for consistent, accessible UI components
- Radix UI primitives providing the underlying accessible component architecture
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theming with light/dark mode support

**Design System**
- Custom color palette using HSL values defined in CSS variables
- Fredoka font family (Google Fonts) for child-friendly, readable typography
- Spacing system based on Tailwind's 4px grid (units: 4, 6, 8, 12, 16)
- Rounded corners and soft shadows for approachable, friendly UI elements
- Card-based layouts with elevation effects for visual hierarchy

**State Management**
- TanStack Query (React Query) for server state management and caching
- Local state management using React hooks (useState, useEffect)
- Client-side game progress stored in localStorage via custom storage utilities

**Game Logic & Progress Tracking**
- Level-based progression system with completion tracking
- Star-based reward system for completed activities
- Learning pattern tracking to monitor puzzle types, attempts, and completion speed
- Adaptive difficulty system (3 difficulty levels per game type)

### Backend Architecture

**Server Framework**
- Express.js HTTP server with middleware architecture
- TypeScript for type safety across the stack
- Custom logging middleware for request monitoring

**API Design**
- RESTful API endpoints prefixed with `/api`
- JSON request/response format
- Storage interface pattern for database abstraction

**Data Storage**
- In-memory storage implementation (`MemStorage`) for development
- Drizzle ORM configured for PostgreSQL (production-ready)
- Schema-first database design with type inference
- Migration system via Drizzle Kit

**Build & Deployment**
- ESBuild for server bundling with dependency optimization
- Vite for client bundling with code splitting
- Separate build outputs: `dist/index.cjs` (server), `dist/public` (client)
- Development mode with HMR (Hot Module Replacement)

### Database Schema

**Users Table**
- `id`: Primary key (UUID, auto-generated)
- `username`: Unique text identifier
- `password`: Text (hashed in production)

**Data Validation**
- Zod schemas for runtime validation
- Type inference from Drizzle schemas
- Integration with React Hook Form via `@hookform/resolvers`

### External Dependencies

**UI & Styling**
- `@radix-ui/*`: Accessible UI primitives (accordion, dialog, dropdown, etc.)
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`: Type-safe variant styling
- `clsx` + `tailwind-merge`: Conditional class composition

**Data & Forms**
- `@tanstack/react-query`: Server state management
- `react-hook-form`: Form handling
- `zod`: Schema validation
- `drizzle-orm`: PostgreSQL ORM
- `drizzle-zod`: Schema-to-Zod conversion

**Development Tools**
- `vite`: Frontend build tool and dev server
- `tsx`: TypeScript execution for development
- `esbuild`: Production build bundling
- `@replit/vite-plugin-*`: Replit-specific development plugins

**Routing & Navigation**
- `wouter`: Lightweight client-side routing (React Router alternative)

**Session Management**
- `express-session`: Session middleware (configured but not yet implemented)
- `connect-pg-simple`: PostgreSQL session store (available for production)

**Database**
- `pg`: PostgreSQL client library
- Schema location: `shared/schema.ts`
- Migrations directory: `./migrations`
- Connection via `DATABASE_URL` environment variable

**Google Fonts**
- Fredoka font family (weights: 300, 400, 500, 600, 700)
- Preconnected to Google Fonts CDN for performance

**Asset Management**
- Historical figure images stored in `attached_assets/generated_images/`
- Princess Amara character artwork
- Image assets referenced via Vite alias `@assets`
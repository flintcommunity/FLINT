# Flint

## Overview

Flint is a community platform for "vibecoders" - builders who use emerging technologies like AI and bitcoin to create innovative products. The application serves as both a public-facing marketing site and a members-only portal with resources for community members.

The platform handles user registration through Discord OAuth with invite-token gating, meaning new users must have a valid invite token to join the community.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router
- **UI Library**: Chakra UI v2 with custom theming
- **Styling Approach**: Component-based styling using Chakra's props system with responsive breakpoints
- **Typography**: EB Garamond as the primary font family
- **Color Scheme**: Warm cream/orange palette with primary background `#FEF8F3` and accent color `#FBB420`

### Backend Architecture
- **API Routes**: Next.js App Router API routes located in `src/app/api/`
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all database table definitions
- **Database Connection**: `server/db.ts` manages the PostgreSQL connection pool

### Authentication System
- **Method**: Discord OAuth 2.0 flow
- **Invite System**: Token-gated registration using bcrypt-hashed invite tokens
- **Session Management**: Custom session tokens stored in database and cookies
- **Flow**: User enters invite token → validates token → Discord OAuth → creates user and session

### Database Schema
Four main tables:
- `users`: Stores member info (email, Discord ID, Discord username)
- `inviteTokens`: Stores hashed invite tokens for gated access
- `sessions`: Manages user authentication sessions with expiration
- `apps`: Stores community app submissions for Kindling

### Route Structure
- `/` - Public landing page with marketing content
- `/signup` - Token-gated registration with Discord OAuth
- `/login` - Member login page
- `/dashboard` - Authenticated member dashboard
- `/members/*` - Members-only content (Field Guide, Resources, Ideas, Kindling)

### Path Aliases
- `@/*` → `./src/*`
- `@shared/*` → `./shared/*`
- `@server/*` → `./server/*`

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `pg` driver
- **Connection**: Requires `DATABASE_URL` environment variable

### Third-Party Services
- **Discord OAuth**: User authentication
  - Requires `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET` environment variables
  - Callback URL constructed using `REPLIT_DEV_DOMAIN` or localhost
- **Discord Bot**: Kindling notifications
  - Posts to #kindling channel when apps are submitted
  - Requires `DISCORD_BOT_TOKEN` and `DISCORD_KINDLING_CHANNEL_ID` environment variables
  - Implementation: `server/discord.ts`

### Key NPM Packages
- `drizzle-orm` / `drizzle-kit`: Database ORM and migrations
- `bcryptjs`: Password/token hashing
- `@chakra-ui/react`: UI component library
- `framer-motion`: Animation library (Chakra dependency)
- `react-icons` / `lucide-react`: Icon libraries
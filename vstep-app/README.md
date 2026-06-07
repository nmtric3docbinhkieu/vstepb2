# AI VSTEP Personal Coach - App

This folder contains the Next.js application for the AI VSTEP B2 personal learning system.

## Current Status

Phase: `PHASE 1 - AUTHENTICATION`

Implemented:

- Next.js App Router + TypeScript + TailwindCSS
- ESLint configuration
- Prettier configuration
- Husky pre-commit checks
- Initial source structure aligned with project standards
- Login API with JWT + HttpOnly cookie
- Protected dashboard route using middleware
- Logout API and session endpoint

## Environment Variables

Create `.env.local` based on `.env.example`:

```bash
AUTH_JWT_SECRET=replace_with_a_long_random_secret
AUTH_USER_EMAIL=student@example.com
AUTH_USER_PASSWORD=replace_with_secure_password
AUTH_USER_FULL_NAME=VSTEP Student
```

## Local Setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Quality Commands

```bash
npm run lint
npm run format:check
npm run build
```

## Notes

- Architecture, roadmap, and rules are managed in `../PROJECT_DOCS`.
- Development follows strict phase lock from `TASK_BOARD.md`.

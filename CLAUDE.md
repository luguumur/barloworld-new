# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Barloworld Mongolia LLC — official Caterpillar dealer website. Bilingual (Mongolian / English). Built on the SaaSBold v2.3.1 Next.js boilerplate.

## Commands

```bash
npm run dev          # HTTPS dev server (uses certificates/ dir)
npm run dev:http     # HTTP dev server (no certs required)
npm run build        # prisma generate && next build
npm run db:seed      # seed database via prisma/seed.js

npm run check-lint   # ESLint check
npm run fix-lint     # ESLint autofix
npm run check-format # Prettier check
npm run fix-format   # Prettier autofix

npx prisma migrate dev   # run migrations
npx prisma generate      # regenerate client after schema changes
npx prisma studio        # database GUI
```

There are no automated tests. After any schema change, run `npx prisma generate` before starting the dev server — the build script does this automatically.

## Architecture

### Route Groups

`src/app/(site)/` — all public and authenticated pages  
`src/app/(studio)/studio/` — embedded Sanity Studio  
`src/app/api/` — API routes (auth, webhooks, search, user management)

Middleware (`src/middleware.ts`) protects `/admin/*` (ADMIN role only) and `/user/*` (USER role only). Both require an authenticated session token.

### Two Content Sources

**Sanity CMS** (`src/sanity/`) — blog posts and authors only. Queries in `sanity-query.ts`, utils in `sanity-utils.ts`.

**Prisma / PostgreSQL** (Supabase) — everything else: Products, News, Deals, Mastheads, Magazines, Management team, Testimonials, Pages, Menu, Users. Schema in `prisma/schema.prisma`.

### Server Actions Pattern

All DB mutations go through `src/actions/<entity>.ts`. Every action file:

- Has `"use server"` at the top
- Calls `await isAuthorized()` for protected operations — throws `Error("Unauthorized")` if no session; returns `session.user` (guaranteed non-null)
- Wraps Prisma calls in try/catch using `handleTableMissing(error, fallback)` from `src/libs/prismaError.ts` to gracefully handle tables that don't exist yet (Prisma error P2021)
- Public-facing read functions (e.g. `getMastheadsPublic`, `getMenuForPublic`, `getPageBySlug`) skip `isAuthorized()`
- Uses `prisma.modelName` directly — never the old `prisma as unknown as {...}` cast pattern

### Admin Panel Pattern

Each admin entity follows this structure:

- `src/actions/<entity>.ts` — server actions (CRUD + exported types `*Row`, `*Input`)
- `src/components/Admin/<Entity>/index.tsx` — client container (receives pre-fetched data as props)
- `src/components/Admin/<Entity>/` — Form, ListTable, Topbar, Action, EmptyState components
- `src/app/(site)/admin/<entity>/page.tsx` — server component: fetches data, passes to container
- `src/app/(site)/admin/<entity>/new/page.tsx` and `[id]/edit/page.tsx` — form pages

Admin pages use `export const revalidate = 0` to disable caching.

### Bilingual Content

All Prisma content models have paired fields: `title` / `title_en`, `content` / `content_en`, etc. The `_en` variant holds English text; the primary field holds Mongolian. i18n is handled by `next-intl` (currently hardcoded to `"en"` locale in `src/i18n/request.ts`).

### File Uploads

Images are uploaded directly to S3 using presigned URLs. Flow:

1. Client calls `getSignedURL(type, size, prefix, name)` from `src/actions/upload.ts`
2. Client PUTs the file to the returned URL
3. The returned `key` is stored in the database
4. Images are served via `NEXT_PUBLIC_IMAGE_URL/<key>`

Max upload size: 2 MB. Accepted types: PNG, JPEG. S3 bucket: `barlo-files.s3.ap-southeast-1.amazonaws.com`.

### Auth

NextAuth with JWT strategy (`src/libs/auth.ts`). The JWT and session are extended with: `id`, `role` (`"ADMIN"` | `"USER"`), `subscriptionId`, `priceId`, `customerId`, `currentPeriodEnd`.

Three credential providers: `credentials` (email/password), `impersonate` (admin impersonating a user), `fetchSession` (session refresh). Also: GitHub, Google, Email (magic link).

### Integration Feature Flags

`integrations.config.tsx` at the project root controls which integrations are active:

| Flag                      | Current state |
| ------------------------- | ------------- |
| `isSanityEnabled`         | true          |
| `isAuthEnabled`           | true          |
| `isDatabaseSearchEnabled` | true          |
| `isAlgoliaEnabled`        | false         |
| `isOpenAIEnabled`         | false         |
| `isPaymentsEnabled`       | false         |

### Key Environment Variables

```
DATABASE_URL                  # Supabase PostgreSQL connection string
SHADOW_DATABASE_URL           # Required for Prisma migrations on Supabase
NEXT_PUBLIC_SANITY_PROJECT_ID
SANITY_API_KEY
AWS_S3_BUCKET                 # barlo-files
AWS_REGION                    # ap-southeast-1
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
NEXT_PUBLIC_IMAGE_URL         # Base URL for S3 images (e.g. https://...cloudfront.net)
SECRET                        # NextAuth secret
NEXTAUTH_URL
SITE_URL
SITE_NAME
```

### Stale Files to Remove

- `src/app/api/user/get-user/rotue.ts` — filename typo; replaced by `route.ts` in same directory
- `src/libs/uitls.ts` — filename typo; replaced by `src/libs/utils.ts`

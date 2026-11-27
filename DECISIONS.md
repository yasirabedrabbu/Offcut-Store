# Decisions

- The repository does not contain `references/`, so the implementation uses the written product brief as the source of truth.
- Supabase integration is isolated behind `src/lib/db`; local development can use the seeded flat data until environment variables are configured.
- Product media is represented by media IDs and neutral placeholders. No remote image URL is embedded in a component.
- Existing JavaScript routes remain temporarily during the foundation migration and are replaced incrementally by TypeScript routes.
- Checkout starts with cash on delivery. Online payment adapters are server-only extension points.
- The supplied visual references are treated as design direction, not downloadable application assets.
- The default storefront now uses the editorial reference pattern. The CSS rail remains a selectable component.
- Neutral blocks are intentional until admins upload media through Supabase Storage.
- Phase 5 checkout uses the database `place_order` function as the server pricing boundary.
- Vitest 2 is pinned because the newest Vitest release requires a newer Node type peer than this Next.js setup.
- Missing advanced provider adapters are represented by safe empty states rather than fake payment, courier, or messaging integrations.

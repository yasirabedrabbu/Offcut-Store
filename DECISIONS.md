# Decisions

- The repository does not contain `references/`, so the implementation uses the written product brief as the source of truth.
- Supabase integration is isolated behind `src/lib/db`; local development can use the seeded flat data until environment variables are configured.
- Product media is represented by media IDs and neutral placeholders. No remote image URL is embedded in a component.
- Existing JavaScript routes remain temporarily during the foundation migration and are replaced incrementally by TypeScript routes.
- Checkout starts with cash on delivery. Online payment adapters are server-only extension points.

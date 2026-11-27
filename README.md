# Offcut Store

Offcut is a customizable clothing storefront and operations dashboard for Bangladesh.
It uses Next.js App Router, TypeScript boundaries, Supabase, Zod, and flat token-based
CSS. The original 3D rail remains available as a hero variant; the default home page
uses the editorial storefront layout.

## Development

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment

Required for authentication, database, storage, and server actions:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=
```

Apply migrations from `supabase/migrations` in numeric order using the Supabase
dashboard or Supabase CLI. Create the `media` storage bucket and configure its
policies from migration `004_media.sql`.

## Routes

- Storefront: `/`, `/shop`, `/search`, `/collection/new`, `/cart`
- Account: `/login`, `/register`, `/account`
- Checkout: `/checkout`, `/track`
- Admin: `/admin`, `/admin/products`, `/admin/orders`, `/admin/media`,
  `/admin/appearance`, `/admin/analytics`

## Quality commands

```bash
npm run typecheck
npm run test
npm run check-lines
npm run check-banned-css
npm run build
npm run check
```

Every source, migration, config, and script file is limited to 100 lines by the
line checker. Visual effects use flat fills and borders. Media is represented by
database records and neutral placeholders until an administrator uploads assets.

## Architecture

- `app/`: existing JavaScript storefront routes and metadata.
- `src/app/`: TypeScript account, checkout, admin, and API routes.
- `src/components/`: reusable storefront, admin, auth, and checkout components.
- `src/lib/`: typed validation, auth, catalog, checkout, theme, content, and storage.
- `supabase/migrations/`: one numbered concern per migration.
- `scripts/`: repository compliance checks.

## Production notes

Configure Supabase Auth redirect URLs for the production domain. Never expose
service-role keys in browser code. Payment, courier, SMS, and email provider
credentials belong in server-side adapters and dashboard secrets.

## License

MIT

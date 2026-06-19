# Customer Support App

A small internal support-ticket tracker for Shopify-adjacent customer issues. It lets you:

- create a ticket with a title, Shopify order reference, and issue description
- view all tickets or filter by `active` / `resolved`
- edit ticket details
- toggle a ticket between active and resolved
- protect the app behind a simple password session

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Supabase, using a server-side service-role client

## Environment

Create `.env.local` with:

```bash
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
APP_PASSWORD=...
SESSION_SECRET=...
```

`SESSION_SECRET` should be a long random string. `APP_PASSWORD` is the password used on `/login`.

## Database

Create a `tickets` table in Supabase:

```sql
create table tickets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  order_ref text,
  status text not null default 'active' check (status in ('active', 'resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tickets_set_updated_at
before update on tickets
for each row
execute function set_updated_at();
```

Because the app uses `SUPABASE_SERVICE_ROLE_KEY`, keep all ticket reads and writes on the server.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run build
```

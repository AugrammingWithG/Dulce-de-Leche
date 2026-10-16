-- Dulce de Leche Cafe: database for the full build (Supabase / Postgres).
-- Mirrors the shapes in dulce-de-leche/lib/store.js, so swapping the proposal's browser storage
-- for Supabase is a change to that one file. Draft: review before running.

create table menu_items (
  id          text primary key,                 -- 'croissant', 'chivito', ...
  shelf       text not null,                    -- 'Pastries' | 'Cakes by the slice' | 'Cafe and savoury'
  name        text not null,
  description text not null default '',
  flavours    text[] not null default '{}',
  price       numeric(8,2),                     -- null = not on the website yet
  allergens   text[] not null default '{}',
  status      text not null default 'available' check (status in ('available', 'soldout', 'hidden')),
  photo_path  text,                             -- Supabase Storage path
  untracked   boolean not null default false,   -- made to order (coffee): no stock count
  add_on_to   text references menu_items(id),   -- chips → chivito
  sort        int not null default 0
);

create table orders (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  type        text not null check (type in ('pickup', 'cake', 'catering', 'other')),
  source      text not null default 'Website',  -- Website | Phone | Walk-in | Instagram | Email
  status      text not null,                    -- new → preparing → ready → collected; requested → confirmed → baking → ready → collected; enquiry → quoted → confirmed → delivered; or cancelled
  name        text not null,
  phone       text,
  email       text,
  pickup_day  date not null,
  pickup_time time not null,
  address     text,
  notes       text,
  total       numeric(8,2),
  cake        jsonb,                            -- occasion, tiers, serves, sponge, filling, frosting, drip, message, deposit, photo paths
  catering    jsonb,                            -- guests, company, details, delivery
  reminded    boolean not null default false
);
create table order_items (
  order_id uuid references orders(id) on delete cascade,
  item_id  text references menu_items(id),
  variant  text not null default 'Regular',
  qty      int not null check (qty > 0)
);

-- Shelf stock: how many were made each day (counter view → Stock), and counter sales until the till syncs.
create table stock_made    (day date, item_id text references menu_items(id), variant text, made int not null, primary key (day, item_id, variant));
create table counter_sales (day date, item_id text references menu_items(id), variant text, sold int not null default 0, primary key (day, item_id, variant));

create table settings (
  id               int primary key default 1 check (id = 1),
  cakes_per_day    int not null default 3,
  lead_days        jsonb not null default '{"Wedding":21,"Birthday":5,"Christening":5,"Something else":3}',
  closed_weekdays  int[] not null default '{}',
  closed_dates     date[] not null default '{}',
  text_templates   jsonb not null,              -- confirm / ready / reminder: { on, text }
  till_provider    text
);

-- Texts to customers: written here, sent by an Edge Function through the SMS provider.
create table messages (
  id        uuid primary key default gen_random_uuid(),
  order_id  uuid references orders(id) on delete set null,
  kind      text not null check (kind in ('confirm', 'ready', 'reminder')),
  to_phone  text not null,
  body      text not null,
  created_at timestamptz not null default now(),
  sent_at   timestamptz
);

-- Row-level security: customers may only create orders and read the public menu/settings;
-- staff (signed in) can do everything. Policies to be written with the auth setup.
alter table orders enable row level security;
alter table order_items enable row level security;
alter table messages enable row level security;

# Dulce de Leche Cafe: from proposal to live site

The proposal is built as the real site's foundation. When the client says yes, these are the swaps.

## Run it

- `npm run dev`: customer site at `/`, staff counter view at `/admin.html`, self-test at `/selftest.html` (resets the demo data).
- `npm run build`: production files in `dist/` (includes `lib/`).

## How it's put together

| File | What it is |
|---|---|
| `dulce-de-leche/index.html` | Customer website (3D case, menu, cake builder, order ahead, catering, visit) |
| `dulce-de-leche/admin.html` | Counter view: orders, stock, bake sheet, menu editor, texts, settings |
| `dulce-de-leche/lib/store.js` | **The one data layer.** Both pages read and write only through `window.DDL`. Browser storage today. |
| `dulce-de-leche/lib/i18n.js`, `i18n-es.js` | English/Spanish switch and the Spanish copy |
| `supabase/schema.sql` | Draft database matching the data layer |

## Swap list when they sign

1. **Data → Supabase.** Replace `read / write / subscribe` in `lib/store.js` with supabase-js calls and Realtime; tables in `supabase/schema.sql`. Remove the sample data (`seed`), the "Sample data" chips and the Pitch notes toggle.
2. **Staff login.** Supabase Auth in front of `admin.html`; row-level security so customers can only create orders.
3. **Payments.** Stripe or Square for pre-orders and cake deposits at "Pay and place order" / "Pay deposit".
4. **Texts.** An Edge Function sends rows from `messages` through Twilio (or similar). Templates are already editable in Settings → Texts.
5. **Till.** If they use Square/Lightspeed, sync sales and stock into `counter_sales` / `stock_made` (Settings → Till).
6. **Real content.** Logo files, photos (upload in Counter view → Menu, or replace the 3D renders), prices, descriptions, allergens (confirmed by the bakery), story copy, deposit and change terms, opening days.
7. **Spanish copy.** Have the owners read `lib/i18n-es.js` and correct anything that doesn't sound like them.
8. **Launch.** Domain, hosting, Google Business Profile (then show reviews in Visit), privacy policy, terms, ABN.

## Questions for the client

- Which till system? How many cakes per day? Deposit and cancellation rules? Delivery and which suburbs?
- Who handles orders at 5am, and on which device (tablet at the counter)?
- Spanish on the site: yes/no, and who checks the copy?

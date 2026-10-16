/* Dulce de Leche: the one data layer for the website and the counter view (admin).
 *
 * Today it keeps everything in the browser (localStorage) so the proposal works with no server.
 * For the real build, swap the bodies of read(), write() and subscribe() for Supabase calls
 * (tables: orders, menu_items, settings, messages, stock_counts — see supabase/schema.sql).
 * Every page talks only to window.DDL, so nothing else has to change.
 */
(function () {
  const KEY = 'ddl-store-v1', VERSION = 2;
  const pad = n => String(n).padStart(2, '0');
  const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const addDays = (iso, n) => { const d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n); return isoDate(d); };
  const TODAY = isoDate(new Date());
  const OPENING = '2026-10-20';
  const uid = () => Math.random().toString(36).slice(2, 9);
  const keyOf = (id, v) => `${id}|${v}`;

  // The menu the owners edit in the counter view. Prices stay null until they give us their price list.
  // Allergens are a starting point from the obvious ingredients and must be confirmed by the bakery.
  const DEFAULT_MENU = [
    { id: 'croissant', shelf: 'Pastries', name: 'Filled croissant', desc: 'Dulce de leche, chocolate, pistachio or berry.', flavours: ['Dulce de leche', 'Chocolate', 'Pistachio', 'Berry'], price: null, allergens: ['Gluten', 'Dairy', 'Egg', 'Tree nuts'], status: 'available' },
    { id: 'muffin', shelf: 'Pastries', name: 'Loaded muffin', desc: 'Kit Kat, berry and peach.', flavours: ['Kit Kat', 'Berry', 'Peach'], price: null, allergens: ['Gluten', 'Dairy', 'Egg'], status: 'available' },
    { id: 'alfajor', shelf: 'Pastries', name: 'Alfajor', desc: 'Dulce de leche sandwiched between soft biscuits.', flavours: ['Coconut', 'Chocolate'], price: null, allergens: ['Gluten', 'Dairy', 'Egg'], status: 'available' },
    { id: 'biscoff', shelf: 'Pastries', name: 'Biscoff pastry', desc: 'Flaky pastry with Lotus Biscoff.', flavours: [], price: null, allergens: ['Gluten', 'Dairy'], status: 'available' },
    { id: 'milhoja', shelf: 'Cakes by the slice', name: 'Milhoja', desc: 'Layers of puff pastry and dulce de leche, the Uruguayan classic.', flavours: [], price: null, allergens: ['Gluten', 'Dairy', 'Egg'], status: 'available' },
    { id: 'cheesecake', shelf: 'Cakes by the slice', name: 'Biscoff cheesecake', desc: 'Made with Lotus Biscoff.', flavours: [], price: null, allergens: ['Gluten', 'Dairy', 'Egg'], status: 'available' },
    { id: 'continental', shelf: 'Cakes by the slice', name: 'Continental cake', desc: 'Cream, sponge and fresh strawberries.', flavours: [], price: null, allergens: ['Gluten', 'Dairy', 'Egg'], status: 'available' },
    { id: 'chivito', shelf: 'Cafe and savoury', name: 'Chivito', desc: 'Uruguay’s famous steak sandwich, loaded and grilled.', flavours: [], price: 20, allergens: ['Gluten', 'Dairy', 'Egg'], status: 'available' },
    { id: 'chips', shelf: 'Cafe and savoury', name: 'Chips', desc: 'With your chivito.', flavours: [], price: 3, allergens: [], status: 'available', addOnTo: 'chivito' },
    { id: 'coffee', shelf: 'Cafe and savoury', name: 'Coffee', desc: 'Flat whites, lattes and cortados for the early start.', flavours: ['Flat white', 'Latte', 'Cortado'], price: null, allergens: ['Dairy'], status: 'available', untracked: true },
  ];
  const SHELVES = ['Pastries', 'Cakes by the slice', 'Cafe and savoury'];
  const ALLERGENS = ['Gluten', 'Dairy', 'Egg', 'Tree nuts', 'Peanuts', 'Soy', 'Sesame'];
  const DEFAULT_SETTINGS = {
    cakesPerDay: 3,
    lead: { Wedding: 21, Birthday: 5, Christening: 5, 'Something else': 3 },
    closedWeekdays: [],          // 0 = Sunday … 6 = Saturday
    closedDates: [],             // ISO dates, e.g. public holidays
    alerts: { sound: true, notify: false },
    texts: {
      confirm: { on: true, text: 'Hi {name}, thanks for your order! We’ll have it ready {day} at {time}. Dulce de Leche Cafe' },
      ready: { on: true, text: 'Hi {name}, your order is ready on the counter at Dulce de Leche. See you soon!' },
      reminder: { on: true, text: 'Hi {name}, a reminder that your {occasion} cake is ready for pickup tomorrow at {time}. Dulce de Leche Cafe' },
    },
    till: { provider: null },
  };

  // ---- Sample data, so the proposal feels alive. Labelled as sample in the UI and resettable. ----
  function seed() {
    const s = { v: VERSION, sample: true, seededFor: TODAY, orders: [], made: {}, counter: {}, menu: clone(DEFAULT_MENU), settings: clone(DEFAULT_SETTINGS), messages: [] };
    const y = addDays(TODAY, -1);
    const made = { 'croissant|Dulce de leche': 24, 'croissant|Chocolate': 18, 'croissant|Pistachio': 12, 'croissant|Berry': 12, 'muffin|Kit Kat': 12, 'muffin|Berry': 12, 'muffin|Peach': 8, 'alfajor|Coconut': 30, 'alfajor|Chocolate': 30, 'biscoff|Regular': 12, 'milhoja|Regular': 10, 'cheesecake|Regular': 8, 'continental|Regular': 8, 'chivito|Regular': 15, 'chips|Regular': 20 };
    s.made[TODAY] = { ...made, 'croissant|Pistachio': 8, 'continental|Regular': 2 }; s.made[y] = { ...made, 'croissant|Pistachio': 10, 'muffin|Peach': 10 };
    s.made[addDays(TODAY, 1)] = { ...made };
    s.counter[TODAY] = { 'croissant|Dulce de leche': 9, 'croissant|Chocolate': 5, 'croissant|Pistachio': 6, 'croissant|Berry': 4, 'muffin|Kit Kat': 3, 'muffin|Berry': 5, 'muffin|Peach': 2, 'alfajor|Coconut': 7, 'alfajor|Chocolate': 4, 'biscoff|Regular': 6, 'milhoja|Regular': 3, 'cheesecake|Regular': 2, 'coffee|Flat white': 21, 'coffee|Latte': 6, 'coffee|Cortado': 7, 'chivito|Regular': 2, 'chips|Regular': 2 };
    s.counter[y] = { 'croissant|Dulce de leche': 14, 'croissant|Chocolate': 9, 'croissant|Pistachio': 8, 'croissant|Berry': 6, 'muffin|Kit Kat': 4, 'muffin|Berry': 4, 'muffin|Peach': 3, 'alfajor|Coconut': 10, 'alfajor|Chocolate': 9, 'biscoff|Regular': 7, 'milhoja|Regular': 6, 'cheesecake|Regular': 5, 'continental|Regular': 3, 'coffee|Flat white': 25, 'coffee|Latte': 8, 'coffee|Cortado': 6, 'chivito|Regular': 9, 'chips|Regular': 7 };
    const o = (day, time, type, source, status, name, phone, items = [], extra = {}) => s.orders.push({ id: uid(), day, time, type, source, status, name, phone, items: items.map(([id, variant, qty]) => ({ id, variant, qty })), created: Date.now(), ...extra });
    const t1 = addDays(TODAY, 1);
    o(y, '06:15', 'pickup', 'Website', 'collected', 'Lucía', '0491 570 156', [['croissant', 'Dulce de leche', 2], ['coffee', 'Flat white', 2]]);
    o(y, '07:30', 'other', 'Phone', 'collected', 'Brightsmile Dental (sample)', '02 5550 1234', [['croissant', 'Chocolate', 6], ['croissant', 'Dulce de leche', 6]], { notes: 'Platter for the team' });
    o(y, '12:00', 'pickup', 'Instagram', 'collected', 'Rafa', '0491 570 157', [['chivito', 'Regular', 2], ['chips', 'Regular', 2]]);
    o(TODAY, '06:00', 'pickup', 'Website', 'collected', 'Lucía', '0491 570 156', [['croissant', 'Dulce de leche', 2], ['coffee', 'Flat white', 1]]);
    o(TODAY, '06:30', 'pickup', 'Phone', 'collected', 'Tom', '0491 570 158', [['croissant', 'Chocolate', 4], ['alfajor', 'Coconut', 6]]);
    o(TODAY, '07:15', 'other', 'Phone', 'ready', 'Oakline Realty (sample)', '02 5550 2468', [['croissant', 'Dulce de leche', 6], ['croissant', 'Chocolate', 6]], { notes: 'Morning meeting platter' });
    o(TODAY, '08:00', 'pickup', 'Website', 'ready', 'Priya', '0491 570 159', [['muffin', 'Kit Kat', 2], ['coffee', 'Latte', 2]]);
    o(TODAY, '09:30', 'pickup', 'Instagram', 'preparing', 'Marco', '0491 570 110', [['milhoja', 'Regular', 2], ['cheesecake', 'Regular', 1]]);
    o(TODAY, '10:00', 'cake', 'Website', 'ready', 'Ana', '0491 570 313', [], { cake: { occasion: 'Birthday', tiers: 2, serves: '20–25', sponge: 'Vanilla', filling: 'Dulce de leche', frosting: 'Blush', drip: 'Dulce de leche', message: 'Feliz cumpleaños Sofi', deposit: true } });
    o(TODAY, '12:30', 'pickup', 'Website', 'new', 'Jake', '0491 570 737', [['chivito', 'Regular', 2], ['chips', 'Regular', 2]]);
    o(TODAY, '13:00', 'pickup', 'Phone', 'new', 'Sofía', '0491 571 266', [['alfajor', 'Chocolate', 12]], { notes: 'Gift box please' });
    o(TODAY, '15:30', 'pickup', 'Website', 'new', 'Mateo', '0491 571 491', [['continental', 'Regular', 2], ['coffee', 'Cortado', 2]]);
    o(t1, '06:30', 'pickup', 'Website', 'new', 'Lucía', '0491 570 156', [['croissant', 'Dulce de leche', 2], ['coffee', 'Flat white', 1]]);
    o(t1, '07:00', 'other', 'Phone', 'new', 'Oakline Realty (sample)', '02 5550 2468', [['croissant', 'Pistachio', 6], ['croissant', 'Berry', 6], ['alfajor', 'Coconut', 12]], { notes: 'Friday breakfast' });
    o(t1, '09:00', 'catering', 'Email', 'enquiry', 'Riverbend office (sample)', '02 5550 3579', [], { catering: { guests: 25, company: 'Riverbend', details: 'Croissant platter: mixed flavours, and alfajores', delivery: true }, address: '12 Sample St, Narellan' });
    o(t1, '11:00', 'cake', 'Instagram', 'confirmed', 'Diego', '0491 571 804', [], { cake: { occasion: 'Birthday', tiers: 1, serves: '10–12', sponge: 'Chocolate', filling: 'Chocolate ganache', frosting: 'Chocolate', drip: 'Chocolate', message: 'Happy 8th Leo', deposit: true } });
    o(addDays(TODAY, 4), '10:00', 'cake', 'Phone', 'confirmed', 'Camila', '0491 572 549', [], { cake: { occasion: 'Christening', tiers: 2, serves: '20–25', sponge: 'Vanilla', filling: 'Strawberries and cream', frosting: 'Sky', drip: 'None', message: 'God bless Mateo', deposit: true } });
    o(addDays(TODAY, 6), '08:00', 'catering', 'Phone', 'quoted', 'Hillview Primary (sample)', '02 5550 4680', [], { catering: { guests: 60, company: 'Hillview Primary', details: 'Alfajor gift boxes: morning tea, plus milhoja slices', delivery: true }, address: '40 Example Rd, Narellan' });
    o(addDays(TODAY, 16), '14:00', 'cake', 'Website', 'requested', 'Valentina', '0491 572 665', [], { cake: { occasion: 'Wedding', tiers: 3, serves: '40–50', sponge: 'Vanilla', filling: 'Dulce de leche', frosting: 'Cream', drip: 'None', message: '', deposit: false } });
    const now = Date.now();
    s.messages.push({ id: uid(), kind: 'confirm', to: '0491 570 737', name: 'Jake', text: fill(s.settings.texts.confirm.text, { name: 'Jake', day: 'today', time: '12:30pm' }), at: now - 3.6e6 });
    s.messages.push({ id: uid(), kind: 'ready', to: '0491 570 159', name: 'Priya', text: fill(s.settings.texts.ready.text, { name: 'Priya' }), at: now - 1.2e6 });
    return s;
  }
  const clone = o => JSON.parse(JSON.stringify(o));
  function fill(t, v) { return String(t || '').replace(/\{(\w+)\}/g, (m, k) => v[k] ?? m); }

  // Older saves (v1) had only orders and stock: add the menu, settings and messages.
  function migrate(s) {
    if (s.v === VERSION) return s;
    s.menu = s.menu || clone(DEFAULT_MENU); s.settings = Object.assign(clone(DEFAULT_SETTINGS), s.settings || {}); s.messages = s.messages || [];
    s.v = VERSION; return s;
  }
  // Sample data is dated around the day it was made; on a later day, slide every date forward.
  function freshen(s) {
    if (!s.sample) return s;
    if (!s.seededFor) return seed();
    const diff = Math.round((new Date(TODAY + 'T00:00:00') - new Date(s.seededFor + 'T00:00:00')) / 864e5);
    if (!diff) return s;
    const shiftKeys = obj => Object.fromEntries(Object.entries(obj || {}).map(([d, v]) => [addDays(d, diff), v]));
    s.orders.forEach(o => { o.day = addDays(o.day, diff); });
    s.made = shiftKeys(s.made); s.counter = shiftKeys(s.counter); s.seededFor = TODAY;
    return s;
  }

  // ---- Storage adapter (swap for Supabase) ----
  function read() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    if (!s || !s.v) { s = seed(); write(s, true); return s; }
    const before = JSON.stringify([s.v, s.seededFor]);
    s = freshen(migrate(s));
    if (JSON.stringify([s.v, s.seededFor]) !== before) write(s, true);
    return s;
  }
  const channel = 'BroadcastChannel' in window ? new BroadcastChannel('ddl-store') : null;
  function write(s, quiet = false) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { console.warn('Could not save (storage full?)', e); }
    if (!quiet) channel?.postMessage('changed');
  }
  function subscribe(fn) {
    addEventListener('storage', e => { if (e.key === KEY) fn(); });
    channel?.addEventListener('message', () => fn());
  }

  // ---- Queries ----
  const isLiveShelfOrder = o => o.status !== 'cancelled' && (o.type === 'pickup' || o.type === 'other');
  function soldOn(s, day) {
    const m = {};
    for (const o of s.orders) if (o.day === day && isLiveShelfOrder(o)) for (const it of o.items) m[keyOf(it.id, it.variant)] = (m[keyOf(it.id, it.variant)] || 0) + it.qty;
    for (const [k, n] of Object.entries(s.counter[day] || {})) m[k] = (m[k] || 0) + n;
    return m;
  }
  function preordered(s, day) {
    const m = {};
    for (const o of s.orders) if (o.day === day && isLiveShelfOrder(o)) for (const it of o.items) m[keyOf(it.id, it.variant)] = (m[keyOf(it.id, it.variant)] || 0) + it.qty;
    return m;
  }
  function leftOn(s, day) {
    if (!s.made[day]) return null;
    const sold = soldOn(s, day), left = {};
    for (const [k, m] of Object.entries(s.made[day])) left[k] = m - (sold[k] || 0);
    return left;
  }
  const variantsOf = item => item.flavours && item.flavours.length ? item.flavours : ['Regular'];
  // Can a custom cake be booked for this day? Reads the owners' limits.
  function cakeDay(s, iso, occasion) {
    const st = s.settings, d = new Date(iso + 'T00:00:00');
    const earliest = addDays(TODAY, st.lead[occasion] ?? st.lead['Something else'] ?? 3);
    const count = s.orders.filter(o => o.type === 'cake' && o.day === iso && o.status !== 'cancelled').length;
    if (iso < OPENING || iso < earliest) return { ok: false, why: 'too soon to bake' };
    if (st.closedWeekdays.includes(d.getDay()) || st.closedDates.includes(iso)) return { ok: false, why: 'closed' };
    if (count >= st.cakesPerDay) return { ok: false, why: 'fully booked' };
    return { ok: true, left: st.cakesPerDay - count };
  }
  function earliestCakeDay(s, occasion) {
    for (let i = 0; i < 120; i++) { const iso = addDays(TODAY, i); if (cakeDay(s, iso, occasion).ok) return iso; }
    return null;
  }

  // ---- Commands ----
  function update(fn) { const s = read(); const r = fn(s); write(s); return r; }
  function addOrder(order) {
    return update(s => {
      const o = { id: uid(), created: Date.now(), source: 'Website', items: [], ...order };
      s.orders.push(o);
      queueText(s, 'confirm', o);
      return o;
    });
  }
  const fmtTime = hm => { if (!hm) return ''; const [h, m] = hm.split(':').map(Number); return `${h > 12 ? h - 12 : h || 12}:${pad(m)}${h >= 12 ? 'pm' : 'am'}`; };
  const fmtDayShort = iso => iso === TODAY ? 'today' : iso === addDays(TODAY, 1) ? 'tomorrow' : new Date(iso + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' });
  // Simulated SMS: queued here, sent by an SMS provider (e.g. Twilio) in the real build.
  function queueText(s, kind, o) {
    const t = s.settings.texts[kind]; if (!t || !t.on || !o.phone) return null;
    const msg = { id: uid(), kind, orderId: o.id, to: o.phone, name: o.name, at: Date.now(), text: fill(t.text, { name: (o.name || '').split(' ')[0], day: fmtDayShort(o.day), time: fmtTime(o.time), occasion: (o.cake?.occasion || 'celebration').toLowerCase() }) };
    s.messages.push(msg); return msg;
  }
  // Day-before reminders for cakes; safe to call on every load.
  function queueReminders(s) {
    const tomorrow = addDays(TODAY, 1); let n = 0;
    for (const o of s.orders) if (o.type === 'cake' && o.day === tomorrow && o.status !== 'cancelled' && !o.reminded) { if (queueText(s, 'reminder', o)) n++; o.reminded = true; }
    return n;
  }

  // Photos are scaled down in the browser before saving (the full build uploads them to Supabase Storage).
  function shrinkPhoto(file, max = 640) {
    return new Promise((res, rej) => {
      const img = new Image(), url = URL.createObjectURL(file);
      img.onload = () => { const k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', .82)); };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('unreadable image')); }; img.src = url;
    });
  }

  window.DDL = {
    shrinkPhoto,
    KEY, TODAY, OPENING, SHELVES, ALLERGENS, DEFAULT_MENU, DEFAULT_SETTINGS,
    isoDate, addDays, keyOf, uid, fill, fmtTime, variantsOf,
    read, write, update, subscribe, seed: () => { const s = seed(); write(s); return s; },
    soldOn, preordered, leftOn, cakeDay, earliestCakeDay,
    addOrder, queueText, queueReminders,
  };
})();

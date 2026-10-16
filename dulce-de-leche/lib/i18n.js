/* English / Spanish for the customer website.
 *
 * Text stays written in English in the page and the scripts; this file swaps each piece of text
 * (and placeholders, labels and tooltips) for its Spanish line when the visitor picks Español,
 * including text the page builds later (the order ticket, cake steps, calendar). Lines missing
 * from the dictionary simply stay in English, so nothing breaks while the copy is being finished.
 * Spanish here is Rioplatense (Uruguay): "vos", "medialunas", "torta". To be reviewed by the owners.
 */
(function () {
  const ES = window.DDL_ES || {};
  const RX = window.DDL_ES_RX || [];
  const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE']);
  const origText = new WeakMap(), lastSet = new WeakMap(), origAttr = new WeakMap();
  let lang = 'en';
  try { lang = localStorage.getItem('ddl-lang') || ((navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en'); } catch (e) {}

  function translate(s) {
    const lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0], k = s.trim();
    if (!k) return null;
    let v = ES[k];
    if (v == null) for (const [re, rep] of RX) { if (re.test(k)) { v = k.replace(re, rep); break; } }
    return v == null ? null : lead + v + trail;
  }
  function doText(n) {
    if (lang === 'es') {
      // If the page changed this text since we last translated it, the new value is the English source.
      if (!origText.has(n) || n.nodeValue !== lastSet.get(n)) origText.set(n, n.nodeValue);
      const es = translate(origText.get(n));
      if (es != null && n.nodeValue !== es) { n.nodeValue = es; }
      lastSet.set(n, n.nodeValue);
    } else if (origText.has(n)) {
      if (n.nodeValue === lastSet.get(n) && n.nodeValue !== origText.get(n)) n.nodeValue = origText.get(n);
      origText.delete(n); lastSet.delete(n);
    }
  }
  function doAttrs(el) {
    for (const a of ATTRS) {
      if (!el.hasAttribute(a)) continue;
      let o = origAttr.get(el); if (!o) { o = {}; origAttr.set(el, o); }
      if (lang === 'es') { const cur = el.getAttribute(a); if (o[a] == null || cur !== o['_' + a]) o[a] = cur; const es = translate(o[a]); if (es != null) { el.setAttribute(a, es); o['_' + a] = es; } }
      else if (o[a] != null) { el.setAttribute(a, o[a]); delete o[a]; delete o['_' + a]; }
    }
  }
  function walk(root) {
    if (root.nodeType === 3) { if (!SKIP.has(root.parentNode?.nodeName)) doText(root); return; }
    if (root.nodeType !== 1 || SKIP.has(root.nodeName) || root.closest?.('[data-no-i18n]')) return;
    doAttrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode: n => n.nodeType === 1 ? (SKIP.has(n.nodeName) || n.hasAttribute('data-no-i18n') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) : NodeFilter.FILTER_ACCEPT });
    let n; while ((n = w.nextNode())) { if (n.nodeType === 3) doText(n); else doAttrs(n); }
  }
  let busy = false;
  const mo = new MutationObserver(list => {
    if (busy || lang !== 'es') return; busy = true;
    for (const m of list) { if (m.type === 'characterData') doText(m.target); else m.addedNodes.forEach(walk); }
    mo.takeRecords(); busy = false;
  });
  function apply() {
    busy = true;
    document.documentElement.lang = lang === 'es' ? 'es-UY' : 'en-AU';
    walk(document.body); mo.takeRecords(); busy = false;
    const btn = document.getElementById('lang-toggle');
    if (btn) { btn.innerHTML = lang === 'es' ? '<span class="lt-full">English</span><span class="lt-short">EN</span>' : '<span class="lt-full">Español</span><span class="lt-short">ES</span>'; btn.setAttribute('lang', lang === 'es' ? 'en' : 'es'); btn.setAttribute('aria-label', lang === 'es' ? 'View in English' : 'Ver en español'); }
  }
  function set(l) { lang = l; try { localStorage.setItem('ddl-lang', l); } catch (e) {} apply(); }
  function start() {
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    document.getElementById('lang-toggle')?.addEventListener('click', () => set(lang === 'es' ? 'en' : 'es'));
    const q = new URLSearchParams(location.search).get('lang'); if (q === 'es' || q === 'en') lang = q;
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.I18N = { set, get lang() { return lang; }, t: s => (lang === 'es' ? translate(s) ?? s : s) };
})();

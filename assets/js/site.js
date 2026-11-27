/* =========================================================
   Logika situs: header, menu, kartu template, filter katalog
   ========================================================= */
(function (UK) {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Motif kawung sebagai latar (dipakai CSS lewat variabel) */
  document.documentElement.style.setProperty('--kawung', UK.kawungBG('#a8795b', 0.28));
  document.documentElement.style.setProperty('--kawung-light', UK.kawungBG('#d9b56a', 0.14));

  /* Ikon statis: <span data-icon="nama" data-size="18"></span> */
  $$('[data-icon]').forEach(function (el) { el.outerHTML = UK.icon(el.getAttribute('data-icon'), +el.getAttribute('data-size') || 20); });

  /* Link WhatsApp: <a data-wa="pesan">  */
  $$('[data-wa]').forEach(function (a) {
    a.href = UK.wa(a.getAttribute('data-wa') || 'Halo ' + UK.config.brand + ', saya mau tanya soal undangan digital.');
    a.target = '_blank'; a.rel = 'noopener';
  });

  /* Header: garis bawah saat scroll */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* Menu mobile */
  var mbtn = $('.menu-btn'), menu = $('#mobile-menu');
  if (mbtn && menu) {
    var setOpen = function (open) {
      menu.classList.toggle('open', open);
      mbtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mbtn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
      mbtn.innerHTML = UK.icon(open ? 'close' : 'menu', 22);
    };
    mbtn.addEventListener('click', function () { setOpen(!menu.classList.contains('open')); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); mbtn.focus(); } });
  }

  /* Muncul saat discroll */
  function observeReveal(root) {
    var els = $$('.reveal:not(.in)', root);
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (e, i) { e.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms'; io.observe(e); });
  }
  UK.observeReveal = observeReveal;

  /* Kartu template */
  UK.card = function (t) {
    var th = UK.themes[t.theme];
    var demo = 'demo.html#' + t.id;
    return '<article class="tpl-card reveal">' +
      '<a class="tpl-thumb" href="' + demo + '" aria-label="Lihat demo ' + UK.esc(t.name) + '">' +
        (t.badge ? '<span class="tpl-badge">' + t.badge + '</span>' : '') +
        '<div class="frame">' + UK.cover(th, false) + '</div>' +
        '<div class="overlay"><span>' + UK.icon('eye', 18) + 'Lihat demo</span></div>' +
      '</a>' +
      '<div class="tpl-body">' +
        '<div class="tags"><span class="tag strong">' + t.cat + '</span>' + t.events.map(function (e) { return '<span class="tag">' + e + '</span>'; }).join('') + '</div>' +
        '<h3>' + UK.esc(t.name) + '</h3>' +
        '<div class="tpl-price">mulai <b>Rp' + t.price + ' rb</b></div>' +
        '<div class="tpl-actions">' +
          '<a class="btn btn-outline btn-sm" href="' + demo + '">' + UK.icon('eye', 18) + 'Demo</a>' +
          '<a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="' + UK.wa('Halo ' + UK.config.brand + ', saya tertarik dengan template "' + t.name + '" (' + t.cat + ').') + '">' + UK.icon('whatsapp', 18) + 'Pesan</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  };

  /* ---------- Beranda ---------- */
  var heroScreen = $('#hero-screen');
  if (heroScreen) heroScreen.insertAdjacentHTML('afterbegin', UK.cover(UK.themes.wana, false));

  /* Gambar sampul tiap bagian = template pertama di bagian itu */
  var bySec = function (slug) { return UK.templates.filter(function (t) { return t.sec === slug; }); };
  var catGrid = $('#cat-grid');
  if (catGrid) {
    catGrid.innerHTML = UK.sections.map(function (c) {
      var list = bySec(c.slug);
      return '<a class="cat-card reveal" href="katalog.html#' + c.slug + '"><div class="cat-art">' + UK.cover(UK.themes[list[0].theme], false) + '</div>' +
        '<span class="count">' + list.length + ' template</span><h3>' + c.name + '</h3><p>' + c.desc + '</p></a>';
    }).join('');
  }

  var featured = $('#featured-grid');
  if (featured) featured.innerHTML = ['kayon-wana', 'senja-pantai', 'nur-hidayah', 'grand-ballroom'].map(function (id) {
    return UK.card(UK.templates.filter(function (t) { return t.id === id; })[0]);
  }).join('');

  var total = $('#tpl-total'); if (total) total.textContent = UK.templates.length;
  var secTotal = $('#sec-total'); if (secTotal) secTotal.textContent = UK.sections.length;

  /* ---------- Katalog: dikelompokkan per bagian ---------- */
  var grid = $('#catalog-grid');
  if (grid) {
    var state = { event: 'Semua', sec: 'Semua' };
    var events = ['Pernikahan', 'Khitanan', 'Aqiqah', 'Ulang Tahun'];
    var evSlug = function (e) { return e.toLowerCase().replace(/\s+/g, '-'); };

    var fromHash = function () {
      var h = decodeURIComponent(location.hash.slice(1));
      var c = UK.sections.filter(function (x) { return x.slug === h; })[0];
      if (c) state.sec = c.slug;
      var e = events.filter(function (x) { return evSlug(x) === h; })[0];
      if (e) state.event = e;
    };

    var chipGroup = function (el, list, key) {
      el.innerHTML = [{ v: 'Semua', l: 'Semua' }].concat(list).map(function (o) {
        return '<button type="button" class="chip" aria-pressed="' + (state[key] === o.v) + '" data-v="' + o.v + '">' + o.l + '</button>';
      }).join('');
      $$('.chip', el).forEach(function (b) {
        b.addEventListener('click', function () { state[key] = b.getAttribute('data-v'); render(true); });
      });
    };

    var render = function (fromUser) {
      chipGroup($('#f-event'), events.map(function (e) { return { v: e, l: e }; }), 'event');
      chipGroup($('#f-cat'), UK.sections.map(function (c) { return { v: c.slug, l: c.name }; }), 'sec');
      var match = function (t) { return state.event === 'Semua' || t.events.indexOf(state.event) > -1; };
      var secs = UK.sections.filter(function (c) { return state.sec === 'Semua' || c.slug === state.sec; });
      var n = 0;
      var html = secs.map(function (c) {
        var list = bySec(c.slug).filter(match);
        n += list.length;
        if (!list.length) return '';
        return '<section class="cat-section" id="bagian-' + c.slug + '" aria-labelledby="h-' + c.slug + '">' +
          '<header class="cat-section-head"><h2 id="h-' + c.slug + '">' + c.name + '</h2><p>' + c.desc + '</p></header>' +
          '<div class="tpl-grid">' + list.map(UK.card).join('') + '</div></section>';
      }).join('');
      $('#result-count').textContent = n + ' template ditemukan';
      $('#reset').hidden = state.event === 'Semua' && state.sec === 'Semua';
      grid.innerHTML = n ? html :
        '<div class="empty-state"><h3>Belum ada template untuk pilihan ini</h3><p>Kami bisa buatkan desain khusus sesuai acaramu.</p><a class="btn btn-primary" target="_blank" rel="noopener" href="' + UK.wa('Halo ' + UK.config.brand + ', saya mau minta desain undangan khusus.') + '">' + UK.icon('whatsapp', 18) + 'Minta desain khusus</a></div>';
      observeReveal(grid);
      if (fromUser) {
        try { history.replaceState(null, '', state.sec !== 'Semua' ? '#' + state.sec : location.pathname); } catch (e) {}
      }
    };

    $('#reset').addEventListener('click', function () { state.event = 'Semua'; state.sec = 'Semua'; render(true); });
    window.addEventListener('hashchange', function () { fromHash(); render(false); });
    fromHash(); render(false);
  }

  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  observeReveal(document);
})(window.UK);

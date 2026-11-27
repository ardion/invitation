/* =========================================================
   Undangan interaktif — demo.html#<id-template>
   Parameter opsional:  ?to=Nama+Tamu   (nama tamu di sampul)
                        ?live=1         (sembunyikan bar demo)
   ========================================================= */
(function (UK) {
  var app = document.getElementById('app');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var params = (function () { try { return new URLSearchParams(location.search); } catch (e) { return { get: function () { return null; } }; } })();
  var cdTimer = null, audio = null, io = null, layout = null;

  function pick() {
    var id = decodeURIComponent(location.hash.slice(1));
    return UK.templates.filter(function (t) { return t.id === id; })[0] || UK.templates[0];
  }
  function guest() { return (params.get('to') || '').trim() || 'Bapak/Ibu/Saudara/i'; }

  /* Muat layout (JS + CSS + font) hanya saat template itu dibuka */
  var loading = {}, failed = {};
  function addCss(href, cb) {
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href;
    if (cb) { l.onload = function () { cb(true); }; l.onerror = function () { cb(false); }; }
    document.head.appendChild(l);
  }
  /* Bila koneksi tamu lemah dan file layout tidak termuat dalam 8 detik,
     undangan tetap tampil dengan desain cadangan (bukan layar kosong). */
  UK.loadLayout = function (name, cb) {
    if (UK.layouts && UK.layouts[name]) return cb(true);
    if (!UK.sg) return cb(false);
    if (loading[name]) { loading[name].push(cb); return; }
    loading[name] = [cb];
    var left = 2, ok = true, finished = false;
    var finish = function () {
      if (finished) return;
      finished = true; clearTimeout(timer);
      var L = UK.layouts && UK.layouts[name], cbs = loading[name];
      loading[name] = null;
      if (L && L.fonts) addCss('https://fonts.googleapis.com/css2?family=' + L.fonts + '&display=swap');
      cbs.forEach(function (f) { f(ok && !!L); });
    };
    var step = function (res) { ok = ok && res; if (--left <= 0) finish(); };
    var timer = setTimeout(function () { ok = false; finish(); }, 8000);
    addCss('assets/css/layouts/' + name + '.css?v=' + UK.version, step);
    var s = document.createElement('script');
    s.src = 'assets/js/layouts/' + name + '.js?v=' + UK.version;
    s.onload = function () { step(true); }; s.onerror = function () { step(false); };
    document.head.appendChild(s);
  };

  function render() {
    var tpl = pick(), t = UK.themes[tpl.theme];
    if (t.layout && !(UK.layouts && UK.layouts[t.layout]) && !failed[t.layout]) {
      UK.loadLayout(t.layout, function (ok) { if (!ok) failed[t.layout] = true; render(); });
      return;
    }
    var e = UK.sample[tpl.events[0]], q = UK.quotes[tpl.quote], jw = !!t.jawa;
    stopMusic(); clearInterval(cdTimer); if (io) io.disconnect();
    document.title = tpl.name + ' · Demo Undangan · ' + UK.config.brand;
    document.body.classList.add('locked');

    var root = document.documentElement.style;
    ['bg', 'paper', 'ink', 'accent', 'deep', 'sky', 'fr'].forEach(function (k) { root.setProperty('--' + k, t[k]); });
    root.setProperty('--kawung', UK.kawungBG(t.accent, jw ? 0.22 : 0.12));
    var meta = document.querySelector('meta[name=theme-color]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
    meta.content = t.bg;

    var B = jw ? UK.band(t.accent) : '';
    var names = e.names.length > 1 ? e.names[0] + '<span class="amp">&amp;</span>' + e.names[1] : e.names[0];
    var heroNames = e.names.length > 1 ? e.names[0] + '<small>&amp;</small>' + e.names[1] : e.names[0];
    var corners = jw ? ['tl', 'tr', 'bl', 'br'].map(function (k) { return '<div class="cn ' + k + '" aria-hidden="true">' + UK.sulur(t.accent) + '</div>'; }).join('') : '';
    var bfs = ''; for (var i = 0; i < 7; i++) bfs += '<div class="bf" aria-hidden="true" style="left:' + (8 + Math.random() * 80).toFixed(0) + '%;top:' + (25 + Math.random() * 60).toFixed(0) + '%;--t:' + (5 + Math.random() * 4).toFixed(1) + 's;--dl:-' + (Math.random() * 5).toFixed(1) + 's">' + UK.butterfly + '</div>';
    var people = e.people.map(function (p, i) {
      return (i ? '<div class="and" aria-hidden="true">&amp;</div>' : '') +
        '<div class="person rv"><div class="arch' + (jw ? ' gebyok' : '') + '">' + (jw ? UK.medal(t.accent) : '') + UK.portrait(t, i === 1) + '</div><h3>' + UK.esc(p.n) + '</h3><p>' + UK.esc(p.d) + '</p></div>';
    }).join('');
    var evs = e.events.map(function (v) {
      return '<div class="ev rv"><h3>' + v.n + '</h3><div class="row">' + UK.icon('calendar', 16) + e.long + '</div><div class="row">' + UK.icon('clock', 16) + v.t + '</div></div>';
    }).join('');
    var mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(e.place);
    var orderUrl = UK.wa('Halo ' + UK.config.brand + ', saya mau pesan template "' + tpl.name + '".');
    var showBar = params.get('live') !== '1';

    var parts = {
      countdown: '<div class="cd" id="cd" role="timer" aria-label="Hitung mundur ke hari acara"></div>',
      rsvp:
        '<form class="form" id="rsvp" novalidate>' +
          '<div><label for="rn">Nama</label><input id="rn" name="nama" autocomplete="name" required><div class="err" id="rn-err" hidden>Nama wajib diisi.</div></div>' +
          '<div><label for="rh">Kehadiran</label><select id="rh" name="hadir"><option>Hadir</option><option>Berhalangan hadir</option><option>Masih ragu</option></select></div>' +
          '<div><label for="ru">Ucapan &amp; doa</label><textarea id="ru" name="ucapan"></textarea></div>' +
          '<button class="pbtn" type="submit">' + UK.icon('message', 18) + 'Kirim ucapan</button>' +
          '<div class="ok" id="rsvp-ok" role="status" hidden>Terima kasih, ucapanmu sudah tampil di bawah.</div>' +
        '</form>' +
        '<div class="wishes" id="wishes" aria-live="polite"></div>',
      /* e.banks = [{name, no, owner}, ...] untuk beberapa rekening; bila tidak ada, pakai e.bank */
      gift: (e.banks || [e.bank]).map(function (b) {
        return '<div class="rek"><small>' + UK.esc(b.name) + '</small><b class="rek-no">' + b.no + '</b><small>a.n. ' + UK.esc(b.owner) + ' (contoh)</small><br>' +
          '<button class="pbtn light copy" type="button">' + UK.icon('copy', 18) + '<span>Salin nomor</span></button></div>';
      }).join('')
    };

    /* Template dengan layout sendiri (assets/js/signature.js) */
    if (layout && layout.kill) layout.kill();
    layout = (t.layout && UK.layouts && UK.layouts[t.layout]) || null;
    document.body.setAttribute('data-layout', t.layout || 'classic');

    var bar = showBar ?
        '<nav class="demo-bar" aria-label="Kontrol demo">' +
          '<a href="katalog.html" aria-label="Kembali ke katalog">' + UK.icon('arrowLeft', 18) + '</a>' +
          '<span class="title sans">' + UK.esc(tpl.name) + '</span>' +
          '<button type="button" id="guest-btn" aria-expanded="false" aria-controls="guest-pop" aria-label="Ubah nama tamu">' + UK.icon('user', 18) + '</button>' +
          '<button type="button" id="replay" aria-label="Ulangi demo">' + UK.icon('refresh', 18) + '</button>' +
          '<a class="order" href="' + orderUrl + '" target="_blank" rel="noopener">' + UK.icon('whatsapp', 18) + 'Pesan</a>' +
        '</nav>' +
        '<div class="guest-pop" id="guest-pop" hidden><label for="guest-in">Nama tamu (contoh link personal)</label><input id="guest-in" maxlength="40" autocomplete="off" placeholder="Bapak Budi"><p>Di undangan asli, nama diambil dari link: <code>?to=Bapak+Budi</code></p></div>'
      : '';
    var musicBtn = '<button class="music" id="music" type="button" aria-label="Matikan musik" aria-pressed="true">' + UK.icon('music', 20) + '</button>';

    if (layout) {
      app.innerHTML = bar + layout.html({ tpl: tpl, t: t, e: e, q: q, guest: UK.esc(guest()), mapUrl: mapUrl, parts: parts }) + musicBtn;
      bind(tpl, e);
      window.scrollTo(0, 0);
      if (layout.intro) layout.intro();
      return;
    }

    app.innerHTML = bar +
      '<div class="cover" id="cover">' +
        '<div class="cover-inner">' +
          '<div class="art">' + UK.cover(t, true) + '</div>' +
          '<div class="info">' +
            '<div class="pre">' + e.pre + '</div>' +
            '<h1>' + names + '</h1>' +
            '<div class="to">Kepada Yth.</div>' +
            '<div class="guest" id="guest-name">' + UK.esc(guest()) + '</div>' +
            '<button class="open-btn" id="open-btn" type="button">' + UK.icon('mail', 18) + 'Buka Undangan</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<main class="inv" id="inv">' +
        '<section class="sec s-hero"' + (jw ? ' style="background-image:var(--kawung);background-size:56px"' : '') + '>' +
          '<div class="frame" aria-hidden="true"></div>' + corners + bfs +
          '<div class="content"><div class="pre">' + e.pre + '</div><h2>' + heroNames + '</h2><div class="dt">' + e.date + '</div><div class="hash">' + e.hash + '</div><div class="mouse" aria-hidden="true"></div></div>' +
        '</section>' +

        '<section class="sec s-dark">' +
          '<div class="oval rv">' + UK.portrait(t, false) + '</div>' +
          '<p class="quote rv">“' + q.text + '”</p>' + (q.src ? '<div class="qs rv">' + q.src + '</div>' : '') +
          '<div class="rv">' + UK.divider() + '</div>' +
        '</section>' +

        '<section class="sec s-paper' + (jw ? ' tex' : '') + '">' + B +
          '<p class="salam rv">' + t.greet + '</p>' +
          '<p class="lead rv">Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, kami bermaksud mengundang Bapak/Ibu/Saudara/i ' + e.intro + '</p>' +
          people +
        '</section>' +

        '<section class="sec s-paper">' + B +
          '<h2 class="s-title rv"><span class="script">Save the date</span>Waktu &amp; Tempat</h2>' + evs +
          '<div class="place rv">' + UK.icon('map', 18) + '<span>' + UK.esc(e.place) + '</span></div>' +
          '<a class="pbtn rv" href="' + mapUrl + '" target="_blank" rel="noopener">' + UK.icon('map', 18) + 'Buka Google Maps</a>' +
          '<div class="rv">' + parts.countdown + '</div>' +
        '</section>' +

        '<section class="sec s-paper' + (jw ? ' tex' : '') + '">' + B +
          '<h2 class="s-title rv"><span class="script">Momen kami</span>Galeri</h2>' +
          '<div class="gal rv"><div>Foto utama</div><div>Foto 2</div><div>Foto 3</div><div>Foto 4</div><div>Foto 5</div></div>' +
        '</section>' +

        '<section class="sec s-paper">' + B +
          '<h2 class="s-title rv"><span class="script">Doa &amp; restu</span>Konfirmasi Kehadiran</h2>' +
          '<div class="rv">' + parts.rsvp + '</div>' +
        '</section>' +

        '<section class="sec s-paper' + (jw ? ' tex' : '') + '">' + B +
          '<h2 class="s-title rv"><span class="script">Tanda kasih</span>Amplop Digital</h2>' +
          '<p class="lead rv">Doa restu Anda adalah hadiah terbaik. Bila ingin berbagi tanda kasih, dapat melalui:</p>' +
          '<div class="rv">' + parts.gift + '</div>' +
        '</section>' +

        '<footer class="thanks"><h2 class="rv">Terima kasih</h2><p class="rv">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.</p><small>Dibuat dengan ' + UK.config.brand + '</small></footer>' +
      '</main>' + musicBtn;

    bind(tpl, e);
    window.scrollTo(0, 0);
  }

  function bind(tpl, e) {
    var $ = function (id) { return document.getElementById(id); };
    $('open-btn').addEventListener('click', function () { openInvitation(e); });
    $('open-btn').focus({ preventScroll: true });

    if ($('replay')) $('replay').addEventListener('click', render);
    if ($('guest-btn')) {
      var pop = $('guest-pop'), btn = $('guest-btn'), inp = $('guest-in');
      btn.addEventListener('click', function () {
        var open = pop.hidden; pop.hidden = !open; btn.setAttribute('aria-expanded', open);
        if (open) inp.focus();
      });
      inp.addEventListener('input', function () { $('guest-name').textContent = inp.value.trim() || 'Bapak/Ibu/Saudara/i'; });
      inp.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' || ev.key === 'Enter') { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
    }

    /* RSVP demo: disimpan di halaman saja. Di produksi, kirim ke backend / Google Sheet. */
    var wishes = [{ n: 'Bu Sari', h: 'Hadir', u: 'Selamat berbahagia, semoga menjadi keluarga yang sakinah, mawaddah, warahmah.' }, { n: 'Mas Andi', h: 'Hadir', u: 'Lancar sampai hari H!' }];
    var draw = function () { $('wishes').innerHTML = wishes.map(function (w) { return '<div class="wish"><b>' + UK.esc(w.n) + ' <em>· ' + UK.esc(w.h) + '</em></b>' + UK.esc(w.u) + '</div>'; }).join(''); };
    draw();
    $('rsvp').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var n = $('rn').value.trim();
      $('rn-err').hidden = !!n; $('rn').setAttribute('aria-invalid', n ? 'false' : 'true');
      if (!n) { $('rn').focus(); return; }
      wishes.unshift({ n: n, h: $('rh').value, u: $('ru').value.trim() || '—' });
      draw(); this.reset(); $('rsvp-ok').hidden = false;
      setTimeout(function () { var ok = $('rsvp-ok'); if (ok) ok.hidden = true; }, 4000);
    });

    /* tombol salin di tiap kartu rekening (kelas .copy, nomor di .rek-no pada kartu yang sama) */
    Array.prototype.forEach.call(document.querySelectorAll('.copy'), function (b) {
      b.addEventListener('click', function () {
        var label = b.querySelector('span'), no = b.closest('.rek').querySelector('.rek-no').textContent.replace(/\s/g, '');
        var done = function (msg) { label.textContent = msg; setTimeout(function () { label.textContent = 'Salin nomor'; }, 2500); };
        try { navigator.clipboard.writeText(no).then(function () { done('Tersalin'); }, function () { done(no); }); } catch (er) { done(no); }
      });
    });

    $('music').addEventListener('click', function () { audio ? stopMusic() : startMusic(); });
  }

  function openInvitation(e) {
    var cover = document.getElementById('cover'), inv = document.getElementById('inv');
    if (cover.classList.contains('opening')) return;
    cover.classList.add('opening');
    inv.classList.add('live');
    var done = function () {
      cover.classList.add('gone');
      document.body.classList.remove('locked');
      if (layout) layout.watch(); else watch();
    };
    if (layout) layout.open(done); else setTimeout(done, reduce ? 50 : 1900);
    var m = document.getElementById('music'); m.classList.add('show');
    startMusic();
    startCountdown(e.target);
  }

  function watch() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.rv'));
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (x) { x.classList.add('in'); }); return; }
    io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: 0.15 });
    els.forEach(function (x) { io.observe(x); });
  }

  function startCountdown(target) {
    clearInterval(cdTimer);
    var tick = function () {
      var el = document.getElementById('cd'); if (!el) { clearInterval(cdTimer); return; }
      var d = Math.max(0, new Date(target) - new Date()), s = Math.floor(d / 1000);
      var v = [[Math.floor(s / 86400), 'Hari'], [Math.floor(s % 86400 / 3600), 'Jam'], [Math.floor(s % 3600 / 60), 'Menit'], [s % 60, 'Detik']];
      el.innerHTML = v.map(function (x) { return '<div><b>' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('');
    };
    tick(); cdTimer = setInterval(tick, 1000);
  }

  /* Musik contoh: denting pentatonik lembut via WebAudio (bukan lagu berhak cipta).
     Di produksi, ganti dengan <audio> berisi musik berlisensi. */
  function startMusic() {
    var btn = document.getElementById('music');
    try {
      stopMusic();
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      var ctx = new AC(), notes = [293.66, 329.63, 392, 440, 523.25, 587.33], i = 2;
      var ping = function () {
        var o = ctx.createOscillator(), g = ctx.createGain();
        i = Math.max(0, Math.min(notes.length - 1, i + Math.floor(Math.random() * 5) - 2));
        o.type = 'sine'; o.frequency.value = notes[i];
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
        o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 1.9);
      };
      ping(); audio = { ctx: ctx, timer: setInterval(ping, 700) };
      if (btn) { btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true'); btn.setAttribute('aria-label', 'Matikan musik'); btn.innerHTML = UK.icon('music', 20); }
    } catch (er) { audio = null; }
  }
  function stopMusic() {
    if (audio) { clearInterval(audio.timer); try { audio.ctx.close(); } catch (e) {} audio = null; }
    var btn = document.getElementById('music');
    if (btn) { btn.classList.remove('on'); btn.setAttribute('aria-pressed', 'false'); btn.setAttribute('aria-label', 'Nyalakan musik'); btn.innerHTML = UK.icon('musicOff', 20); }
  }

  window.addEventListener('hashchange', render);
  render();
})(window.UK);

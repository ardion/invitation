/* =========================================================
   INTI TEMPLATE: alat bersama untuk semua layout di assets/js/layouts/.
   Tiap layout ada di file sendiri (layouts/<nama>.js + css/layouts/<nama>.css)
   dan baru dimuat saat template itu dibuka (lihat UK.loadLayout di invitation.js).
   Butuh GSAP + ScrollTrigger + SplitText + DrawSVGPlugin (dimuat di demo.html).
   Tanpa GSAP atau bila pengguna memilih "kurangi gerakan",
   semua konten tetap tampil dan sampul langsung terbuka.

   Kontrak tiap layout:
     html(c)   -> string HTML (wajib punya #cover, #open-btn, #guest-name, #inv,
                  #cd, #rsvp, #wishes, #copy, #rek-no lewat c.parts)
     intro()   -> animasi diam di sampul
     open(fn)  -> animasi buka sampul, panggil fn saat selesai
     watch()   -> animasi isi undangan (scroll)
     kill()    -> bersihkan semua animasi
   ========================================================= */
(function (UK) {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx = null;

  function motion() { return !!window.gsap && !reduce; }
  function setup() {
    if (!window.gsap || setup.done) return;
    gsap.registerPlugin.apply(gsap, [window.ScrollTrigger, window.SplitText, window.DrawSVGPlugin].filter(Boolean));
    setup.done = true;
  }
  /* Semua animasi masuk ke satu gsap.context supaya bisa di-revert saat ganti template */
  function run(fn) {
    if (!motion()) return;
    setup();
    if (!ctx) ctx = gsap.context(function () {});
    ctx.add(fn);
  }
  function kill() { if (ctx) { ctx.revert(); ctx = null; } }
  function instant(done) { var c = document.getElementById('cover'); if (c) c.style.display = 'none'; done(); }

  /* Muncul bertahap saat discroll */
  function reveal(sel, from) {
    var els = gsap.utils.toArray(sel);
    if (!els.length) return;
    gsap.set(els, Object.assign({ autoAlpha: 0, y: 28 }, from || {}));
    ScrollTrigger.batch(els, {
      start: 'top 90%', once: true,
      onEnter: function (b) { gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12, overwrite: true }); }
    });
  }
  /* Teks muncul per huruf/kata/baris dari balik masker */
  function splitIn(el, type, vars, trigger) {
    if (!el || !window.SplitText) return gsap.timeline();
    var unit = type.split(',').pop().trim();
    var s = SplitText.create(el, { type: type, mask: unit });
    var targets = s[unit];
    return gsap.from(targets, Object.assign({ yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.04 }, vars || {},
      trigger ? { scrollTrigger: { trigger: trigger, start: 'top 85%', once: true } } : {}));
  }
  function drawOn(sel, scrub) {
    if (!window.DrawSVGPlugin) return;
    gsap.utils.toArray(sel).forEach(function (p) {
      gsap.fromTo(p, { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', ease: 'none', duration: 1.4,
        scrollTrigger: scrub ? { trigger: p, start: 'top 95%', end: 'top 45%', scrub: 0.6 } : { trigger: p, start: 'top 88%', once: true } });
    });
  }

  function namesOf(e, amp) { return e.names.length > 1 ? e.names[0] + amp + e.names[1] : e.names[0]; }
  function initials(e) { return e.names.map(function (n) { return n.charAt(0); }).join(e.names.length > 1 ? '&' : ''); }
  function evRows(e, cls) {
    return e.events.map(function (v, i) {
      return '<div class="' + cls + '" data-rv><span class="no">' + ['I', 'II', 'III', 'IV'][i] + '</span><h3>' + v.n + '</h3>' +
        '<p>' + UK.icon('calendar', 16) + e.long + '</p><p>' + UK.icon('clock', 16) + v.t + '</p></div>';
    }).join('');
  }
  function gallery(cls) {
    return '<div class="' + cls + '"><div data-ph>Foto utama</div><div data-ph>Foto 2</div><div data-ph>Foto 3</div><div data-ph>Foto 4</div><div data-ph>Foto 5</div></div>';
  }
  function common() {
    return {
      kill: kill,
      watchCommon: function () {
        reveal('#inv [data-rv]');
        /* foto galeri terbuka dari bawah seperti tirai */
        gsap.utils.toArray('#inv [data-ph]').forEach(function (p, i) {
          gsap.fromTo(p, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut', delay: (i % 2) * 0.12,
            scrollTrigger: { trigger: p, start: 'top 92%', once: true } });
        });
      }
    };
  }
  /* Blok isi standar. Tiap layout memberi prefix kelas (p) dan boleh mengganti
     cara menggambar judul, orang, dan acara, jadi susunan HTML & tampilannya
     tetap milik layout itu sendiri. */
  function blocks(c, o) {
    var e = c.e, p = o.p, pair = e.people.length > 1;
    var T = Object.assign({ quote: 'Pembuka', people: pair ? 'Mempelai' : 'Yang Berbahagia', events: 'Waktu & Tempat', gallery: 'Galeri', rsvp: 'Ucapan & Doa', gift: 'Tanda Kasih' }, o.titles || {});
    var head = o.head || function (k, title) { return '<h2 class="' + p + '-h" data-rv>' + title + '</h2>'; };
    var person = o.person || function (x, i) {
      return '<figure class="' + p + '-person" data-rv><div class="' + p + '-photo">' + UK.portrait(c.t, i === 1) + '</div><figcaption><h3>' + UK.esc(x.n) + '</h3><p>' + UK.esc(x.d) + '</p></figcaption></figure>';
    };
    var amp = o.amp !== undefined ? o.amp : '<div class="' + p + '-amp" data-rv>&amp;</div>';
    var event = o.event || function (v) {
      return '<div class="' + p + '-ev" data-rv><h3>' + v.n + '</h3><p>' + UK.icon('calendar', 16) + e.long + '</p><p>' + UK.icon('clock', 16) + v.t + '</p></div>';
    };
    var sec = function (k, inner) { return '<section class="' + p + '-sec ' + p + '-' + k + '">' + inner + '</section>'; };
    return {
      pair: pair,
      quote: sec('quote', head('quote', T.quote) + '<p class="' + p + '-quote">“' + c.q.text + '”</p>' + (c.q.src ? '<p class="' + p + '-src" data-rv>' + c.q.src + '</p>' : '')),
      people: sec('people', head('people', T.people) +
        '<p class="' + p + '-lead" data-rv>' + c.t.greet + '. Dengan memohon rahmat Tuhan Yang Maha Esa, kami mengundang Bapak/Ibu/Saudara/i ' + e.intro + '</p>' +
        e.people.map(person).join(pair ? amp : '')),
      events: sec('events', head('events', T.events) + e.events.map(event).join('') +
        '<p class="' + p + '-place" data-rv>' + UK.icon('map', 18) + '<span>' + UK.esc(e.place) + '</span></p>' +
        '<a class="pbtn" data-rv href="' + c.mapUrl + '" target="_blank" rel="noopener">' + UK.icon('map', 18) + 'Buka Google Maps</a>' +
        '<div class="' + p + '-cd" data-rv>' + c.parts.countdown + '</div>'),
      gallery: sec('gallery', head('gallery', T.gallery) + gallery(p + '-gal')),
      rsvp: sec('rsvp', head('rsvp', T.rsvp) + '<div data-rv>' + c.parts.rsvp + '</div>'),
      gift: sec('gift', head('gift', T.gift) + '<p class="' + p + '-lead" data-rv>Doa restu Anda adalah hadiah terbaik. Bila ingin berbagi tanda kasih, dapat melalui:</p><div data-rv>' + c.parts.gift + '</div>'),
      guest: '<div class="sg-to">Kepada Yth.</div><div class="sg-guest" id="guest-name">' + c.guest + '</div>',
      credit: '<small class="sg-credit">Dibuat dengan ' + UK.config.brand + '</small>'
    };
  }

  /* Kisah Kami: daftar babak perjalanan pasangan. photo(s, i) menggambar tempat foto tiap babak.
     Judul bagian seragam di semua template: "Kisah Kami" dan "Momen Kami". */
  function story(c, p, photo) {
    var st = c.e.story;
    if (!st || !st.length) return '';
    return '<ol class="' + p + '-stories">' + st.map(function (x, i) {
      return '<li class="' + p + '-st" data-rv>' + (photo ? photo(x, i) : '') +
        '<div class="' + p + '-st-body"><span class="' + p + '-st-y">' + x.y + '</span><h3>' + x.t + '</h3><p>' + x.d + '</p></div></li>';
    }).join('') + '</ol>';
  }

  UK.layouts = UK.layouts || {};
  UK.sg = { run: run, kill: kill, motion: motion, instant: instant, reveal: reveal, splitIn: splitIn, drawOn: drawOn,
            namesOf: namesOf, initials: initials, evRows: evRows, gallery: gallery, common: common, blocks: blocks, story: story,
            TITLES: { story: 'Kisah Kami', moments: 'Momen Kami' } };
})(window.UK);

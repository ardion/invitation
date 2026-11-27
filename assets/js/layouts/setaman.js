/* =========================================================
   KEMBANG SETAMAN: air siraman dilihat dari atas.
   Sampul: bokor kuningan berisi air dengan mawar, melati, dan kantil
   yang mengapung. Saat dibuka, riak menyebar dari tombol, kelopak
   terdorong ke tepi, dan air menjadi jernih.
   Isi: serba bundar dan di tengah, seperti permukaan bokor.
   ========================================================= */
(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, splitIn = S.splitIn;
  var L = S.common();
  L.fonts = 'Italiana&family=Mulish:ital,wght@0,400;0,600;0,700;1,400';

  var seed = 3;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  var PETAL = {
    mawar: '<svg viewBox="-14 -14 28 28"><path d="M0 -12 C9 -10 11 3 0 12 C-11 3 -9 -10 0 -12Z" fill="#a8323e"/><path d="M0 -8 C5 -6 6 2 0 8" fill="none" stroke="#c9505c" stroke-width="1.2"/></svg>',
    melati: '<svg viewBox="-14 -14 28 28"><g fill="#fffaf0" stroke="#e5dcc6" stroke-width=".6">' +
      [0, 72, 144, 216, 288].map(function (a) { return '<ellipse cx="0" cy="-6" rx="3.6" ry="6.4" transform="rotate(' + a + ')"/>'; }).join('') + '</g><circle r="2.4" fill="#e3bf4a"/></svg>',
    kantil: '<svg viewBox="-14 -14 28 28"><path d="M0 -13 C5 -6 5 6 0 13 C-5 6 -5 -6 0 -13Z" fill="#f1e3c2" stroke="#d9c79c" stroke-width=".6"/></svg>'
  };
  /* ring = true: kelopak melingkar di tepi, tidak menutupi teks di tengah */
  function petals(n, spread, ring) {
    seed = 3;
    var kinds = ['mawar', 'melati', 'mawar', 'kantil', 'melati'], s = '';
    for (var i = 0; i < n; i++) {
      var a = ring ? (i / n) * Math.PI * 2 + rnd() * 0.3 : rnd() * Math.PI * 2, r = ring ? spread * (0.92 + rnd() * 0.16) : Math.sqrt(rnd()) * spread, size = 22 + rnd() * 18;
      s += '<div class="st-pt" style="left:calc(50% + ' + (Math.cos(a) * r).toFixed(1) + 'vmin);top:calc(50% + ' + (Math.sin(a) * r).toFixed(1) + 'vmin);width:' + size.toFixed(0) + 'px;height:' + size.toFixed(0) + 'px;transform:rotate(' + (rnd() * 360).toFixed(0) + 'deg)" data-a="' + a.toFixed(3) + '">' + PETAL[kinds[i % kinds.length]] + '</div>';
    }
    return s;
  }

  L.html = function (c) {
    var e = c.e, t = c.t;
    var B = S.blocks(c, {
      p: 'st',
      titles: { quote: 'Doa pembuka', gallery: 'Kenangan', rsvp: 'Doa restu', gift: 'Tanda kasih' },
      head: function (k, title) { return '<header class="st-head" data-rv><span class="st-dot" aria-hidden="true">' + PETAL[k === 'events' || k === 'rsvp' ? 'mawar' : 'melati'] + '</span><h2>' + title + '</h2></header>'; },
      person: function (x, i) {
        return '<figure class="st-person" data-rv><div class="st-bowl"><div>' + UK.portrait(t, i === 1) + '</div></div><figcaption><h3>' + UK.esc(x.n) + '</h3><p>' + UK.esc(x.d) + '</p></figcaption></figure>';
      },
      amp: '<div class="st-amp" data-rv>&amp;</div>',
      event: function (v) {
        return '<div class="st-ev" data-rv><h3>' + v.n + '</h3><p>' + e.long + '</p><p class="st-time">' + v.t + '</p></div>';
      }
    });
    return '' +
      '<div class="sg-cover st-cover" id="cover">' +
        '<div class="st-water" aria-hidden="true"><div class="st-caustic"></div><div class="st-ripples"></div>' + petals(26, 40) + '</div>' +
        '<div class="st-rim" aria-hidden="true"></div>' +
        '<div class="st-info"><div class="sg-pre">' + e.pre + '</div><h1>' + S.namesOf(e, '<span>&amp;</span>') + '</h1>' + B.guest +
          '<button class="st-btn" id="open-btn" type="button">' + UK.icon('mail', 18) + 'Buka Undangan</button></div>' +
      '</div>' +
      '<main class="sg st" id="inv">' +
        '<section class="st-sec st-hero"><div class="st-ring" aria-hidden="true">' + petals(18, 44, true) + '</div>' +
          '<div class="st-hero-in"><p class="st-pre">' + e.pre + '</p><h2 class="st-names">' + S.namesOf(e, '<span>&amp;</span>') + '</h2><p class="st-date">' + e.date + '</p><p class="st-hash">' + e.hash + '</p></div>' +
        '</section>' +
        B.quote + B.people + B.events + B.gallery + B.rsvp + B.gift +
        '<footer class="st-end"><h2 data-rv>Matur nuwun</h2><p data-rv>Kehadiran dan doa restu Bapak/Ibu/Saudara/i adalah kebahagiaan bagi kami.</p>' + B.credit + '</footer>' +
      '</main>';
  };

  L.intro = function () {
    run(function () {
      gsap.from('.st-cover .st-pt', { scale: 0, autoAlpha: 0, duration: 0.9, ease: 'back.out(2)', stagger: { each: 0.03, from: 'random' } });
      gsap.from('.st-info > *', { y: 14, autoAlpha: 0, duration: 0.7, stagger: 0.1, delay: 0.5, ease: 'power2.out' });
      /* kelopak bergoyang pelan di permukaan air */
      gsap.utils.toArray('.st-cover .st-pt').forEach(function (p, i) {
        gsap.to(p, { x: 'random(-10, 10)', y: 'random(-10, 10)', rotation: '+=random(-25, 25)', duration: 3 + (i % 5) * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 });
      });
      ripple(0.5, 0.5, 2, 4);
    });
  };
  /* riak: lingkaran yang membesar lalu memudar */
  function ripple(x, y, n, every) {
    var box = document.querySelector('.st-ripples');
    if (!box) return;
    for (var i = 0; i < 3; i++) {
      var r = document.createElement('i');
      r.style.left = (x * 100) + '%'; r.style.top = (y * 100) + '%';
      box.appendChild(r);
      gsap.fromTo(r, { scale: 0, autoAlpha: 0.7 }, { scale: n, autoAlpha: 0, duration: 2.4, ease: 'power1.out', delay: i * 0.45, repeat: every ? -1 : 0, repeatDelay: every || 0 });
    }
  }

  L.open = function (done) {
    if (!motion()) return instant(done);
    run(function () {
      var b = document.getElementById('open-btn').getBoundingClientRect();
      ripple((b.left + b.width / 2) / innerWidth, (b.top + b.height / 2) / innerHeight, 8, 0);
      var tl = gsap.timeline({ onComplete: done });
      tl.to('.st-info', { autoAlpha: 0, duration: 0.5 }, 0.1);
      /* kelopak terdorong keluar dari pusat riak */
      gsap.utils.toArray('.st-cover .st-pt').forEach(function (p) {
        var a = +p.getAttribute('data-a');
        tl.to(p, { x: Math.cos(a) * innerWidth * 0.8, y: Math.sin(a) * innerHeight * 0.8, rotation: '+=120', duration: 1.8, ease: 'power2.inOut', overwrite: true }, 0.2);
      });
      tl.to('.st-water', { backgroundColor: '#f4efe2', duration: 1.2 }, 1.1)
        .to('.st-rim', { scale: 1.6, autoAlpha: 0, duration: 1.2, ease: 'power2.in' }, 1)
        .to('#cover', { autoAlpha: 0, duration: 0.5 }, 2.1);
    });
  };

  L.watch = function () {
    if (!motion()) return;
    run(function () {
      gsap.timeline()
        .from('.st-ring .st-pt', { scale: 0, duration: 0.8, ease: 'back.out(2)', stagger: { each: 0.04, from: 'random' } }, 0)
        .add(splitIn(document.querySelector('.st-names'), 'chars', { yPercent: 100, duration: 1, stagger: 0.04 }), 0.2)
        .from('.st-pre, .st-date, .st-hash', { autoAlpha: 0, y: 10, duration: 0.7, stagger: 0.12 }, 0.7);
      gsap.to('.st-ring', { rotation: 70, ease: 'none', scrollTrigger: { trigger: '.st-hero', start: 'top top', end: 'bottom top', scrub: true } });
      splitIn(document.querySelector('.st-quote'), 'lines', { duration: 1, stagger: 0.12 }, '.st-quote');
      L.watchCommon();
    });
  };
  UK.layouts.setaman = L;
})(window.UK);

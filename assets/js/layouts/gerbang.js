/* =========================================================
   GARDEN PARTY: pesta kebun di malam hari.
   Aset: lukisan Claude Monet 'The Path through the Irises' (1917), peoni
   Curtis's Botanical Magazine (1809) & The American Flora (1855), capung
   British Dragonflies. Semua domain publik/CC0.

   Momen utama: kebun lukisan Monet masih gelap. Tombol "Nyalakan lampu"
   ditekan -> untaian lampu di atas kebun menyala satu per satu, lalu
   seluruh kebun ikut terang.
   Isi: santai dan rata kiri. Foto digantung di tali dengan jepit,
   untaian lampu di antara bagian, kartu acara seperti kartu meja.
   ========================================================= */
(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, splitIn = S.splitIn, namesOf = S.namesOf;
  var L = S.common();
  L.fonts = 'Young+Serif&family=Figtree:wght@400;500;600;700';
  var IMG = 'assets/img/taman/';
  var uid = 0;

  function fl(kind, pos, w, rot, flip) {
    return '<div class="gp-fl k-' + kind + '" style="' + pos + ';width:' + w + '" aria-hidden="true"><img src="' + IMG + kind + '.png" alt="" loading="lazy" style="transform:rotate(' + rot + 'deg)' + (flip ? ' scaleX(-1)' : '') + '"></div>';
  }
  /* untaian lampu: kabel melengkung + bohlam di sepanjang kabel */
  function lights(n, sag) {
    var id = 'gpg' + (uid++), s = '<svg class="gp-lights" viewBox="0 0 400 ' + (sag + 40) + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><radialGradient id="' + id + '"><stop offset="0" stop-color="#fff6d8"/><stop offset=".4" stop-color="#ffd88a" stop-opacity=".8"/><stop offset="1" stop-color="#ffd88a" stop-opacity="0"/></radialGradient></defs>' +
      '<path d="M-10 8 Q200 ' + (sag * 2) + ' 410 8" fill="none" stroke="#3a3328" stroke-width="1.4"/>';
    for (var i = 1; i <= n; i++) {
      var t = i / (n + 1), x = (1 - t) * (1 - t) * -10 + 2 * (1 - t) * t * 200 + t * t * 410, y = (1 - t) * (1 - t) * 8 + 2 * (1 - t) * t * sag * 2 + t * t * 8;
      s += '<g class="gp-lb" transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"><circle class="halo" r="16" fill="url(#' + id + ')"/><rect x="-2.5" y="-2" width="5" height="5" fill="#3a3328"/><ellipse cy="9" rx="5" ry="7" fill="#ffe9b0"/></g>';
    }
    return s + '</svg>';
  }
  function hanging(items) {
    return '<div class="gp-line" aria-hidden="false"><svg class="gp-cord" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M-5 6 Q200 34 405 6" fill="none" stroke="#6d5a3f" stroke-width="1.6"/></svg>' +
      '<div class="gp-hang">' + items.join('') + '</div></div>';
  }
  /* hiasan bergerak: kunang-kunang (malam) & kelopak jatuh (siang) */
  function flies(n, cls) {
    var s = '<div class="gp-flies ' + cls + '" aria-hidden="true">';
    for (var i = 0; i < n; i++) s += '<i style="left:' + (6 + (i * 43) % 88) + '%;top:' + (20 + (i * 29) % 70) + '%"></i>';
    return s + '</div>';
  }
  function petals(n, cls) {
    var s = '<div class="gp-petals ' + cls + '" aria-hidden="true">';
    for (var i = 0; i < n; i++) s += '<i class="' + (i % 3 ? 'p' : 'r') + '" style="left:' + (4 + (i * 37) % 92) + '%"></i>';
    return s + '</div>';
  }
  /* capung: gambar berlatar putih, menyatu dengan latar terang lewat multiply */
  var DF = ['capung-1.jpg', 'capung-2.jpg', 'capung-4.jpg'];
  function dflies(n, cls) {
    var s = '<div class="gp-dflies ' + cls + '" aria-hidden="true">';
    for (var i = 0; i < n; i++) s += '<div class="gp-dfly"><img src="' + IMG + DF[i % DF.length] + '" alt="" loading="lazy"></div>';
    return s + '</div>';
  }
  function card(inner, cls) { return '<figure class="gp-card ' + (cls || '') + '"><span class="gp-peg" aria-hidden="true"></span>' + inner + '</figure>'; }
  /* img: potongan lukisan untuk galeri contoh; tanpa img = tempat foto pasangan */
  function photo(label, pos, img) {
    if (!img) return '<div class="gp-ph empty"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="17" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 42c1.5-9 7.5-13 15-13s13.5 4 15 13" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>' + label + '</span></div>';
    return '<div class="gp-ph" style="background-image:url(' + IMG + img + ');background-position:' + pos + '"><span>' + label + '</span></div>';
  }

  L.html = function (c) {
    var e = c.e, pair = e.people.length > 1;
    var people = e.people.map(function (p, i) {
      return card(photo(pair ? (i ? 'Foto mempelai wanita' : 'Foto mempelai pria') : 'Foto') +
        '<figcaption><h3>' + UK.esc(p.n) + '</h3><p>' + UK.esc(p.d) + '</p></figcaption>', i % 2 ? 'r' : 'l');
    });
    var evs = e.events.map(function (v, i) {
      return '<div class="gp-tent ' + (i % 2 ? 'r' : 'l') + '" data-rv><h3>' + v.n + '</h3><p>' + e.long + '</p><p class="gp-time">' + v.t + '</p></div>';
    }).join('');
    var g1 = ['monet-iris.jpg|20% 20%', 'monet-iris.jpg|70% 15%', 'monet-iris.jpg|40% 60%'], g2 = ['monet-iris.jpg|80% 70%', 'monet-iris.jpg|15% 85%'];
    var gl = function (list, off) {
      return list.map(function (g, i) { var p = g.split('|'); return card(photo('Foto ' + (i + off), p[1], p[0]), (i % 2 ? 'r' : 'l') + ' g'); });
    };
    return '' +
      '<div class="sg-cover gp-cover" id="cover">' +
        '<div class="gp-scene"><div class="gp-photo" style="background-image:url(' + IMG + 'monet-iris.jpg)"></div></div>' +
        '<div class="gp-cover-lights">' + lights(11, 70) + '</div><div class="gp-shade" aria-hidden="true"></div>' + flies(16, 'cover') +
        '<div class="gp-cover-in">' +
          '<p class="gp-pre">Kamu diundang ke pesta kebun</p>' +
          '<h1 class="gp-cnames">' + namesOf(e, '<span>&amp;</span>') + '</h1>' +
          '<p class="gp-when">' + e.long + '</p>' +
          '<div class="gp-to"><div class="sg-to">Untuk</div><div class="sg-guest" id="guest-name">' + c.guest + '</div></div>' +
          '<button class="gp-btn" id="open-btn" type="button">' + UK.icon('sparkle', 18) + 'Nyalakan lampu</button>' +
        '</div>' +
        '<div class="gp-flowers gp-f-cover">' + fl('peoni-pink', 'left:-18%;bottom:-16%', '58%', -8) + fl('peony-tree', 'right:-12%;bottom:-12%', '44%', 8, true) + '</div>' +
      '</div>' +

      '<main class="sg gp" id="inv">' +
        '<section class="gp-hero">' + lights(9, 46) + petals(8, 'hero') + dflies(2, 'hero') +
          '<div class="gp-flowers gp-f-hero">' + fl('peoni-pink', 'right:-22%;top:10%', '66%', 16, true) + fl('peony-tree', 'right:-16%;top:46%', '48%', -10) + '</div>' +
          '<p class="gp-pre">' + e.pre + '</p><h2 class="gp-names">' + e.names.map(function (n) { return '<span>' + n + '</span>'; }).join('<span class="amp">&amp;</span>') + '</h2>' +
          '<p class="gp-date">' + e.long + '</p><p class="gp-hash">' + e.hash + '</p>' +
        '</section>' +
        '<section class="gp-sec gp-quote-sec"><div class="gp-qbg" style="background-image:url(' + IMG + 'monet-iris.jpg)"></div>' +
          '<p class="gp-quote">' + c.q.text + '</p>' +
        '</section>' +
        '<section class="gp-sec gp-linen"><h2 class="gp-h" data-rv>' + (pair ? 'Tuan rumah malam ini' : 'Yang berbahagia') + '</h2>' +
          '<p class="gp-lead" data-rv>' + c.t.greet + '! Kami mengundang Bapak/Ibu/Saudara/i ' + e.intro + '</p>' + hanging(people) +
        '</section>' +
        (e.story ? '<section class="gp-sec gp-linen alt gp-story">' + dflies(1, 'story') + '<h2 class="gp-h" data-rv>' + S.TITLES.story + '</h2>' +
          S.story(c, 'gp', function (x, i) { return card(photo('Foto ' + (i + 1)), (i % 2 ? 'r' : 'l') + ' st'); }) + '</section>' : '') +
        '<section class="gp-sec gp-night">' + lights(7, 26) + flies(10, 'night') + '<h2 class="gp-h" data-rv>Kapan &amp; di mana</h2>' + evs +
          '<p class="gp-place" data-rv>' + UK.icon('map', 18) + '<span>' + UK.esc(e.place) + '</span></p>' +
          '<a class="pbtn light" data-rv href="' + c.mapUrl + '" target="_blank" rel="noopener">' + UK.icon('map', 18) + 'Lihat lokasi</a>' +
          '<div class="gp-cd" data-rv>' + c.parts.countdown + '</div>' +
        '</section>' +
        '<section class="gp-sec gp-linen gp-moments">' + dflies(1, 'moments') + '<h2 class="gp-h" data-rv>' + S.TITLES.moments + '</h2>' + hanging(gl(g1, 1)) + hanging(gl(g2, 4)) + '</section>' +
        '<section class="gp-sec gp-linen alt"><h2 class="gp-h" data-rv>Titip ucapan</h2><div data-rv>' + c.parts.rsvp + '</div></section>' +
        '<section class="gp-sec gp-night">' + lights(7, 26) + flies(10, 'night') + '<h2 class="gp-h" data-rv>Kado</h2>' +
          '<p class="gp-lead" data-rv>Kehadiran dan doa Anda sudah cukup. Bila ingin berbagi tanda kasih, dapat melalui:</p><div data-rv>' + c.parts.gift + '</div></section>' +
        '<footer class="gp-end">' + petals(8, 'end') + dflies(2, 'end') + '<div class="gp-flowers gp-f-end">' + fl('peony-tree', 'left:-12%;bottom:-14%', '46%', -8) + fl('peoni-pink', 'right:-20%;bottom:-10%', '64%', 6, true) + '</div>' +
          '<h2 data-rv>Sampai jumpa di kebun</h2><p data-rv>Datang dengan hati senang, sisanya biar kami yang siapkan.</p><p class="gp-sign" data-rv>' + namesOf(e, ' &amp; ') + '</p>' +
          '<small class="sg-credit">Dibuat dengan ' + UK.config.brand + '</small></footer>' +
      '</main>';
  };

  function sway(sel, amt) {
    gsap.utils.toArray(sel).forEach(function (f, i) {
      gsap.to(f, { rotation: (i % 2 ? 1 : -1) * amt, duration: 2.6 + (i % 3) * 0.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
  }

  function wander(scope) {
    gsap.utils.toArray(scope + ' .gp-flies i').forEach(function (f) {
      gsap.to(f, { x: 'random(-50, 50)', y: 'random(-40, 40)', duration: gsap.utils.random(3, 6), ease: 'sine.inOut', repeat: -1, repeatRefresh: true });
      gsap.fromTo(f, { autoAlpha: 0 }, { autoAlpha: 'random(0.5, 1)', duration: gsap.utils.random(0.6, 1.4), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: gsap.utils.random(0, 2) });
    });
  }
  function fall(scope) {
    gsap.utils.toArray(scope + ' .gp-petals i').forEach(function (pt) {
      var box = pt.parentNode, d = gsap.utils.random(7, 12);
      gsap.timeline({ repeat: -1, delay: -gsap.utils.random(0, d), repeatRefresh: true })
        .fromTo(pt, { y: -30, x: 0, rotation: 'random(0, 360)', autoAlpha: 0 }, { y: function () { return box.offsetHeight + 30; }, x: 'random(-60, 60)', rotation: '+=random(180, 400)', duration: d, ease: 'none' }, 0)
        .to(pt, { autoAlpha: 0.85, duration: 1 }, 0)
        .to(pt, { autoAlpha: 0, duration: 1 }, d - 1);
    });
  }

  L.intro = function () {
    run(function () {
      wander('.gp-cover');
      gsap.set('.gp-cover-lights .halo', { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' });
      gsap.set('.gp-cover-lights ellipse', { attr: { fill: '#6d624c' } });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.gp-flowers.gp-f-cover .gp-fl', { y: 160, autoAlpha: 0, duration: 1.4, stagger: 0.15 }, 0.1)
        .add(splitIn(document.querySelector('.gp-cnames'), 'lines', { duration: 1, stagger: 0.12 }), 0.4)
        .from('.gp-cover .gp-pre, .gp-when, .gp-to, .gp-btn', { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.6)
        /* satu bohlam berkedip, seolah ada yang mencoba menyalakan */
        .to('.gp-cover-lights .gp-lb:nth-child(5) .halo', { autoAlpha: 0.6, scale: 0.7, duration: 0.08, repeat: 3, yoyo: true }, 1.6);
      gsap.utils.toArray('.gp-flowers.gp-f-cover .gp-fl').forEach(function (f, i) {
        gsap.to(f, { rotation: i ? 2 : -2, duration: 3 + i * 0.6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 100%' });
      });
    });
  };

  L.open = function (done) {
    if (!motion()) return instant(done);
    run(function () {
      var bulbs = gsap.utils.toArray('.gp-cover-lights .gp-lb');
      var tl = gsap.timeline({ onComplete: done });
      tl.to('.gp-cover-in', { autoAlpha: 0, y: 20, duration: 0.5, ease: 'power2.in' }, 0)
        .to('.gp-flowers.gp-f-cover .gp-fl', { y: 220, duration: 0.9, ease: 'power2.in', stagger: 0.08, overwrite: true }, 0);
      /* bohlam menyala satu per satu, dengan sedikit kedip */
      bulbs.forEach(function (b, i) {
        var h = b.querySelector('.halo'), bulb = b.querySelector('ellipse');
        tl.to(bulb, { attr: { fill: '#ffe9b0' }, duration: 0.1 }, 0.35 + i * 0.13)
          .fromTo(h, { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1.5, duration: 0.18, ease: 'power1.out', transformOrigin: '50% 50%' }, '<')
          .to(h, { autoAlpha: 0.55, duration: 0.05, repeat: 1, yoyo: true }, '>');
      });
      tl.to('.gp-photo', { filter: 'brightness(1) saturate(1)', duration: 1.2, ease: 'power2.out' }, 0.35 + bulbs.length * 0.13 - 0.3)
        .to('.gp-shade', { opacity: 0, duration: 1 }, '<')
        .to('.gp-scene', { scale: 1.12, duration: 1.2, ease: 'power2.in' }, '>-0.2')
        .to('#cover', { autoAlpha: 0, duration: 0.6 }, '-=0.5');
    });
  };

  function darts(scope) {
    gsap.utils.toArray(scope + ' .gp-dfly').forEach(function (d, k) {
      var box = d.parentNode, W = box.offsetWidth, H = box.offsetHeight, R = gsap.utils.random;
      var pts = [], i;
      for (i = 0; i < 7; i++) pts.push([R(0.08, 0.86) * W, R(0.06, 0.8) * H]);
      pts.push(pts[0]);
      gsap.set(d, { x: pts[0][0], y: pts[0][1], rotation: R(-40, 40) });
      var tl = gsap.timeline({ repeat: -1, delay: k * 1.3 });
      for (i = 1; i < pts.length; i++) {
        var a = pts[i - 1], b = pts[i], ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI + 90;
        tl.to(d, { y: '+=4', duration: 0.18, ease: 'sine.inOut', yoyo: true, repeat: Math.round(R(6, 12)) })
          .to(d, { rotation: ang, duration: 0.25, ease: 'power2.out' })
          .to(d, { x: b[0], y: b[1], duration: R(0.45, 0.8), ease: 'power3.inOut' }, '<0.1');
      }
    });
  }

  L.watch = function () {
    if (!motion()) return;
    run(function () {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.gp-hero .gp-lb', { autoAlpha: 0, duration: 0.2, stagger: 0.1 }, 0)
        .from('.gp-flowers.gp-f-hero .gp-fl', { x: 140, autoAlpha: 0, duration: 1.4, stagger: 0.15 }, 0.1)
        .add(splitIn(document.querySelector('.gp-names'), 'chars', { yPercent: 110, duration: 0.8, ease: 'back.out(1.6)', stagger: 0.035 }), 0.3)
        .from('.gp-hero .gp-pre, .gp-date, .gp-hash', { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.1 }, 0.8);
      /* untaian lampu berayun pelan, halo bohlam berdenyut */
      gsap.utils.toArray('.gp-lights').forEach(function (s, i) {
        gsap.to(s, { rotation: i % 2 ? 0.8 : -0.8, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 0%' });
      });
      gsap.utils.toArray('.gp-lb .halo').forEach(function (h, i) {
        gsap.to(h, { opacity: 0.55, duration: 1.2 + (i % 4) * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });
      sway('.gp-flowers.gp-f-hero .gp-fl, .gp-flowers.gp-f-end .gp-fl', 2);
      fall('.gp-hero'); fall('.gp-end'); wander('.gp-night');
      darts('.gp-hero'); darts('.gp-story'); darts('.gp-moments'); darts('.gp-end');
      /* foto yang digantung bergoyang dari jepitnya */
      gsap.utils.toArray('.gp-card').forEach(function (cd, i) {
        gsap.fromTo(cd, { rotation: (i % 2 ? 4 : -4) }, { rotation: (i % 2 ? 1.5 : -1.5), duration: 2.4 + (i % 3) * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 0%' });
        gsap.from(cd, { y: -60, autoAlpha: 0, duration: 1, ease: 'back.out(1.4)', delay: (i % 3) * 0.12, scrollTrigger: { trigger: cd, start: 'top 92%', once: true } });
      });
      gsap.to('.gp-qbg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.gp-quote-sec', start: 'top bottom', end: 'bottom top', scrub: true } });
      splitIn(document.querySelector('.gp-quote'), 'lines', { duration: 1, stagger: 0.12 }, '.gp-quote');
      L.watchCommon();
    });
  };
  UK.layouts.gerbang = L;
})(window.UK);

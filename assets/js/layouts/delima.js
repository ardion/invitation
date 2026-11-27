/* =========================================================
   LUKIS DELIMA: kain toile merah, gerbang ukir, dan bangau.
   Aset (domain publik/CC0, diwarnai ulang satu warna merah):
   gerbang besi Johann Georg Oegg (1745), kain toile chinoiserie Prancis
   (c. 1780, Cooper Hewitt) & 'Les Travaux de la Manufacture' (MET),
   'Fall at Llanberis' (ukiran), bangau terbang Jacques Callot (1628, NGA),
   peoni & bangau Kono Bairei (Bairei kacho gafu, 1883).

   Momen utama: gerbang ukir tertutup di depan pemandangan air terjun.
   Tombol ditekan -> dua daun gerbang berayun terbuka (3D), kamera
   masuk ke pemandangan, lalu undangan muncul.
   Hiasan hidup: bangau yang mengepakkan sayap (sayap & badan bergerak
   terpisah), peoni sudut bergoyang dari pangkalnya, kelopak berjatuhan.
   ========================================================= */
(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, splitIn = S.splitIn, namesOf = S.namesOf;
  var L = S.common();
  L.fonts = 'Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@400;500;600';
  var A = 'assets/img/toile/', P = 'assets/img/delima/';

  /* foto berbingkai lengkung */
  function arch(src, label, cls) {
    return '<div class="dl-arch ' + (cls || '') + '"><div class="dl-arch-in" style="background-image:url(' + src + ')" role="img" aria-label="' + label + '"></div></div>';
  }
  /* peoni sudut: pos = tl / tr / bl / br */
  function corner(img, pos, w) {
    return '<div class="dl-cn ' + pos + '" style="width:' + w + '" aria-hidden="true"><img src="' + A + img + '.png" alt="" loading="lazy"></div>';
  }
  /* bangau: dua lapis gambar yang sama, sayap (atas) dan badan (bawah) bergerak terpisah */
  function crane(cls) {
    var im = '<img src="' + A + 'bangau-terbang.png" alt="">';
    return '<div class="dl-crane ' + (cls || '') + '" aria-hidden="true"><div class="dl-wing">' + im + '</div><div class="dl-body">' + im + '</div></div>';
  }
  function petals(n) {
    var s = '<div class="dl-petals" aria-hidden="true">';
    for (var i = 0; i < n; i++) s += '<i style="left:' + ((i * 43 + 6) % 94) + '%"></i>';
    return s + '</div>';
  }

  L.html = function (c) {
    var e = c.e, pair = e.people.length > 1;
    var people = e.people.map(function (p, i) {
      return '<figure class="dl-person" data-rv>' + arch(P + (i ? 'wanita.jpg' : 'pria.jpg'), pair ? (i ? 'Foto mempelai wanita' : 'Foto mempelai pria') : 'Foto') +
        '<figcaption><h3>' + UK.esc(p.n) + '</h3><p>' + UK.esc(p.d) + '</p></figcaption></figure>';
    }).join(pair ? '<p class="dl-amp" aria-hidden="true">&amp;</p>' : '');
    var evs = e.events.map(function (v) {
      return '<div class="dl-ev" data-rv>' + corner('peoni-1', 'tr', '46%') + '<h3>' + v.n + '</h3><p>' + UK.icon('calendar', 16) + e.long + '</p><p>' + UK.icon('clock', 16) + v.t + '</p>' +
        '<a class="dl-btn sm" href="' + c.mapUrl + '" target="_blank" rel="noopener">' + UK.icon('map', 16) + 'Lihat lokasi</a></div>';
    }).join('');
    var gal = '';
    for (var i = 1; i <= 6; i++) gal += '<figure class="dl-g g' + i + '" data-ph style="background-image:url(' + P + 'momen-' + i + '.jpg)"></figure>';

    return '' +
      '<div class="sg-cover dl-cover" id="cover">' +
        '<div class="dl-toile" style="background-image:url(' + A + 'toile-1.jpg)"></div>' +
        corner('peoni-1', 'tl', '64%') + corner('peoni-bangau', 'br', '62%') + crane('c1') +
        '<div class="dl-cover-in">' +
          '<p class="dl-pre">The Wedding of</p>' + arch(P + 'berdua.jpg', 'Foto berdua', 'big') +
          '<h1 class="dl-cnames">' + namesOf(e, ' <span>&amp;</span> ') + '</h1>' +
          '<p class="dl-when">' + e.long + '</p>' +
          '<div class="dl-to"><div class="sg-to">Kepada Yth.</div><div class="sg-guest" id="guest-name">' + c.guest + '</div></div>' +
          '<button class="dl-btn" id="open-btn" type="button">' + UK.icon('sparkle', 18) + 'Buka undangan</button>' +
        '</div>' +
        /* gerbang: pemandangan di belakang, dua daun pintu di depan */
        '<div class="dl-gate" aria-hidden="true"><div class="dl-view" style="background-image:url(' + A + 'air-terjun.jpg)"></div>' +
          '<div class="dl-door l" style="background-image:url(' + A + 'gerbang.png)"></div><div class="dl-door r" style="background-image:url(' + A + 'gerbang.png)"></div></div>' +
      '</div>' +

      '<main class="sg dl" id="inv">' +
        '<section class="dl-hero"><div class="dl-toile" style="background-image:url(' + A + 'toile-2.jpg)"></div>' + petals(10) +
          corner('peoni-1', 'tr', '58%') + corner('peoni-bangau', 'bl', '56%') + crane('c2') +
          '<p class="dl-pre">' + e.pre + '</p>' + arch(P + 'berdua-2.jpg', 'Foto berdua', 'mid') +
          '<h2 class="dl-names">' + namesOf(e, ' <span>&amp;</span> ') + '</h2><p class="dl-date">' + e.long + '</p>' +
        '</section>' +
        '<section class="dl-band">' + corner('peoni-1', 'tl', '50%') +
          '<p class="dl-quote">' + c.q.text + '</p>' + (c.q.src ? '<p class="dl-src" data-rv>' + c.q.src + '</p>' : '') + '</section>' +
        '<section class="dl-sec dl-paper"><h2 class="dl-h" data-rv>' + (pair ? 'Mempelai' : 'Yang berbahagia') + '</h2>' +
          '<p class="dl-lead" data-rv>' + c.t.greet + '. Dengan memohon rahmat Allah SWT, kami mengundang Bapak/Ibu/Saudara/i ' + e.intro + '</p>' + people + '</section>' +
        (e.story ? '<section class="dl-sec dl-story"><div class="dl-toile soft" style="background-image:url(' + A + 'toile-1.jpg)"></div>' + crane('c3') +
          '<h2 class="dl-h" data-rv>' + S.TITLES.story + '</h2>' +
          S.story(c, 'dl', function (x, i) { return '<div class="dl-st-ph" style="background-image:url(' + P + 'kisah-' + (i + 1) + '.jpg)"></div>'; }) + '</section>' : '') +
        '<section class="dl-band dl-cd-band"><h2 class="dl-h light" data-rv>Menuju hari bahagia</h2><div class="dl-cd" data-rv>' + c.parts.countdown + '</div></section>' +
        '<section class="dl-sec dl-paper"><h2 class="dl-h" data-rv>Waktu &amp; tempat</h2>' + evs +
          '<p class="dl-place" data-rv>' + UK.icon('map', 18) + '<span>' + UK.esc(e.place) + '</span></p></section>' +
        '<section class="dl-band dl-gal-band">' + crane('c4') + '<h2 class="dl-h light" data-rv>' + S.TITLES.moments + '</h2><div class="dl-gal">' + gal + '</div></section>' +
        '<section class="dl-sec dl-paper"><h2 class="dl-h" data-rv>Ucapan &amp; doa</h2><div data-rv>' + c.parts.rsvp + '</div></section>' +
        '<section class="dl-sec dl-paper alt"><h2 class="dl-h" data-rv>Tanda kasih</h2>' +
          '<p class="dl-lead" data-rv>Doa restu Anda adalah hadiah terbaik. Bila ingin berbagi tanda kasih, dapat melalui:</p><div data-rv>' + c.parts.gift + '</div></section>' +
        '<footer class="dl-end"><div class="dl-toile" style="background-image:url(' + A + 'toile-2.jpg)"></div>' + petals(8) + corner('peoni-bangau', 'bl', '70%') + crane('c5') +
          '<p class="dl-lead" data-rv>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.</p>' +
          '<h2 class="dl-names sm" data-rv>' + namesOf(e, ' <span>&amp;</span> ') + '</h2>' +
          '<small class="sg-credit">Dibuat dengan ' + UK.config.brand + '</small></footer>' +
      '</main>';
  };

  /* ---------- gerak ---------- */
  /* bangau: sayap mengepak dari pangkalnya, badan naik-turun, terbang melintas lalu kembali */
  function fly(sel, o) {
    gsap.utils.toArray(sel).forEach(function (cr, k) {
      var box = cr.parentNode, wing = cr.querySelector('.dl-wing');
      gsap.to(wing, { scaleY: 0.45, skewX: -6, duration: 0.42, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '56% 46%' });
      gsap.to(cr.querySelector('.dl-body'), { y: 3, duration: 0.42, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      var W = box.offsetWidth, H = box.offsetHeight, y0 = H * (o.y || 0.2);
      gsap.timeline({ repeat: -1, delay: k * 2 + (o.delay || 0), repeatDelay: o.wait || 3 })
        .fromTo(cr, { x: -cr.offsetWidth - 20, y: y0 + 40, rotation: 6 },
          { x: W + 20, y: y0 - 30, rotation: -4, duration: o.dur || 11, ease: 'none' })
        .to(cr, { y: '-=24', duration: (o.dur || 11) / 4, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 0);
    });
  }
  /* peoni sudut bergoyang dari pangkal yang menempel di tepi */
  function sway(sel) {
    gsap.utils.toArray(sel).forEach(function (f, i) {
      gsap.to(f, { rotation: (i % 2 ? 2.5 : -2.5), duration: 3.2 + (i % 3) * 0.7, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
  }
  function fall(scope) {
    gsap.utils.toArray(scope + ' .dl-petals i').forEach(function (pt) {
      var box = pt.parentNode, d = gsap.utils.random(8, 13);
      gsap.timeline({ repeat: -1, delay: -gsap.utils.random(0, d), repeatRefresh: true })
        .fromTo(pt, { y: -20, x: 0, rotation: 'random(0, 360)', rotationX: 0, autoAlpha: 0 },
          { y: function () { return box.offsetHeight + 20; }, x: 'random(-60, 60)', rotation: '+=random(120, 300)', rotationX: 'random(360, 720)', duration: d, ease: 'none' }, 0)
        .to(pt, { autoAlpha: 0.9, duration: 1 }, 0)
        .to(pt, { autoAlpha: 0, duration: 1 }, d - 1);
    });
  }

  L.intro = function () {
    run(function () {
      sway('.dl-cover .dl-cn'); fly('.dl-cover .dl-crane', { y: 0.16, dur: 12 });
      gsap.to('.dl-cover .dl-toile', { backgroundPosition: '50% 60%', duration: 30, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.dl-cover .dl-cn.tl', { x: -80, y: -80, autoAlpha: 0, duration: 1.4 }, 0)
        .from('.dl-cover .dl-cn.br', { x: 80, y: 80, autoAlpha: 0, duration: 1.4 }, 0.1)
        .from('.dl-cover .dl-arch', { scale: 0.85, autoAlpha: 0, duration: 1.2 }, 0.3)
        .add(splitIn(document.querySelector('.dl-cnames'), 'chars', { yPercent: 100, duration: 0.8, stagger: 0.03 }), 0.6)
        .from('.dl-cover .dl-pre, .dl-when, .dl-to, .dl-cover .dl-btn', { y: 14, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.9);
    });
  };

  L.open = function (done) {
    if (!motion()) return instant(done);
    run(function () {
      gsap.timeline({ onComplete: done })
        .to('.dl-cover-in, .dl-cover .dl-cn, .dl-cover .dl-crane', { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, 0)
        /* gerbang tertutup muncul, lalu berayun terbuka */
        .fromTo('.dl-gate', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.3)
        .fromTo('.dl-view', { scale: 1.05 }, { scale: 1.25, duration: 2.6, ease: 'power2.in' }, 0.8)
        .to('.dl-door.l', { rotationY: -105, duration: 1.8, ease: 'power3.inOut' }, 1.1)
        .to('.dl-door.r', { rotationY: 105, duration: 1.8, ease: 'power3.inOut' }, 1.1)
        .to('#cover', { autoAlpha: 0, duration: 0.7 }, 2.8);
    });
  };

  L.watch = function () {
    if (!motion()) return;
    run(function () {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.dl-hero .dl-arch', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut' }, 0.1)
        .from('.dl-hero .dl-cn.tr', { x: 90, y: -60, autoAlpha: 0, duration: 1.4 }, 0.2)
        .from('.dl-hero .dl-cn.bl', { x: -90, y: 60, autoAlpha: 0, duration: 1.4 }, 0.3)
        .add(splitIn(document.querySelector('.dl-names'), 'chars', { yPercent: 100, duration: 0.8, stagger: 0.03 }), 0.6)
        .from('.dl-hero .dl-pre, .dl-hero .dl-date', { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.1 }, 0.9);
      sway('#inv .dl-cn');
      fly('.dl-hero .dl-crane', { y: 0.12, dur: 12, delay: 1 });
      fly('.dl-story .dl-crane', { y: 0.06, dur: 13 });
      fly('.dl-gal-band .dl-crane', { y: 0.04, dur: 10 });
      fly('.dl-end .dl-crane', { y: 0.1, dur: 12 });
      fall('.dl-hero'); fall('.dl-end');
      gsap.utils.toArray('#inv .dl-toile').forEach(function (t) {
        gsap.fromTo(t, { backgroundPosition: '50% 30%' }, { backgroundPosition: '50% 70%', ease: 'none', scrollTrigger: { trigger: t.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      splitIn(document.querySelector('.dl-quote'), 'lines', { duration: 1, stagger: 0.12 }, '.dl-quote');
      /* foto mempelai & kisah terbuka dari bawah seperti tirai lengkung */
      gsap.utils.toArray('.dl-person .dl-arch, .dl-st-ph').forEach(function (a) {
        gsap.from(a, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: a, start: 'top 88%', once: true } });
      });
      L.watchCommon();
    });
  };
  UK.layouts.delima = L;
})(window.UK);

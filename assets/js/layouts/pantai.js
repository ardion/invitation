/* =========================================================
   SENJA DI PANTAI: undangan yang dibuka oleh ombak.
   Aset: lukisan laut Aivazovsky (1877), litografi pantai selatan Jawa Junghuhn
   (1854), kamboja Flora de Filipinas. Semua domain publik/CC0
   (lihat assets/img/CREDITS.md).

   Momen utama: tombol ditekan -> ombak berbuih menyapu layar dari bawah,
   lalu surut dan meninggalkan nama yang tertulis di pasir basah.
   Isi: bergantian pasir (terang) dan laut (gelap), dibatasi garis ombak
   yang terus bergerak pelan. Teks rata kiri, seperti catatan di tepi pantai.
   ========================================================= */
(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, splitIn = S.splitIn, namesOf = S.namesOf;
  var L = S.common();
  L.fonts = 'Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Manrope:wght@400;500;600;700';
  var IMG = 'assets/img/pantai/';

  /* jalur ombak yang bisa diulang tanpa sambungan: lebar 2400, digeser -50% */
  function wavePath(y, amp, len, h) {
    var d = 'M0 ' + y;
    for (var x = 0; x < 2400; x += len) d += ' q' + (len / 4) + ' ' + (-amp) + ' ' + (len / 2) + ' 0 t' + (len / 2) + ' 0';
    return d + ' V' + h + ' H0Z';
  }
  /* pembatas ombak antar bagian: dua lapis dengan kecepatan berbeda */
  function waves(top, bottom) {
    return '<svg class="pt-waves" viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true" style="background:' + top + '">' +
      '<path class="w1" d="' + wavePath(30, 14, 300, 70) + '" fill="' + bottom + '" opacity=".55"/>' +
      '<path class="w2" d="' + wavePath(40, 10, 240, 70) + '" fill="' + bottom + '"/>' +
      '<path class="w3" d="' + wavePath(41, 10, 240, 70).replace(/ V70 H0Z$/, '') + '" fill="none" stroke="#fbf8f3" stroke-width="2" opacity=".7"/></svg>';
  }
  /* ombak penyapu untuk membuka sampul */
  var wid = 0;
  function wash() {
    var g = 'pt-wg' + (wid++);
    return '<svg class="pt-wash" viewBox="0 0 1200 1600" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf8f3"/><stop offset=".12" stop-color="#e8f0ee"/><stop offset=".3" stop-color="#efe4d3"/><stop offset="1" stop-color="#efe4d3"/></linearGradient></defs>' +
      '<path class="lace" d="' + wavePath(70, 30, 200, 1600) + '" fill="#fbf8f3" opacity=".55"/>' +
      '<path d="' + wavePath(110, 34, 260, 1600) + '" fill="url(#' + g + ')"/></svg>';
  }
  /* tempat foto pasangan: contoh bergaya ilustrasi, diganti foto asli pelanggan */
  /* hiasan bergerak: camar melayang & kilau cahaya di air */
  function gulls(n, cls) {
    var s = '<div class="pt-gulls ' + cls + '" aria-hidden="true">';
    for (var i = 0; i < n; i++) s += '<svg class="pt-gull" viewBox="0 0 40 16" style="top:' + (6 + i * 9) + '%"><path d="M2 12 Q11 1 20 9 Q29 1 38 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
    return s + '</div>';
  }
  function glints(cls) {
    var s = '<div class="pt-glints ' + cls + '" aria-hidden="true">';
    for (var i = 0; i < 18; i++) s += '<i style="left:' + (18 + (i * 37) % 64) + '%;top:' + (64 + (i * 23) % 30) + '%;animation-delay:-' + ((i * 0.37) % 3).toFixed(2) + 's"></i>';
    return s + '</div>';
  }
  function photo(label) {
    return '<div class="pt-ph"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="17" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 42c1.5-9 7.5-13 15-13s13.5 4 15 13" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>' + label + '</span></div>';
  }

  L.html = function (c) {
    var e = c.e, pair = e.people.length > 1;
    var people = e.people.map(function (p, i) {
      return '<figure class="pt-person" data-rv>' + photo(pair ? (i ? 'Foto mempelai wanita' : 'Foto mempelai pria') : 'Foto', i ? '70% 60%' : '30% 40%') +
        '<figcaption><h3>' + UK.esc(p.n) + '</h3><p>' + UK.esc(p.d) + '</p></figcaption></figure>';
    }).join('');
    var evs = e.events.map(function (v) {
      var hh = (v.t.match(/\d{2}\.\d{2}/) || [''])[0];
      return '<div class="pt-ev" data-rv><span class="pt-time">' + hh + '</span><div><h3>' + v.n + '</h3><p>' + e.long + '</p><p>' + v.t + '</p></div></div>';
    }).join('');
    var slides = ['laut-senja.jpg|14% 50%', 'pantai-selatan.jpg|25% 50%', 'laut-tenang.jpg|62% 50%', 'pantai-selatan.jpg|88% 40%', 'laut-tenang.jpg|20% 70%'].map(function (g, i) {
      var p = g.split('|');
      return '<div class="pt-slide" data-ph style="background-image:url(' + IMG + p[0] + ');background-position:' + p[1] + '"><span>Foto ' + (i + 1) + '</span></div>';
    }).join('');
    var first = e.names[0], second = e.names[1];
    var namesHTML = second ? '<span>' + first + '</span><span class="amp">&amp;</span><span>' + second + '</span>' : '<span>' + first + '</span>';
    return '' +
      '<div class="sg-cover pt-cover" id="cover">' +
        '<div class="pt-photo" style="background-image:url(' + IMG + 'laut-senja.jpg)"></div><div class="pt-shade" aria-hidden="true"></div>' + glints('cover') + gulls(3, 'cover') +
        '<div class="pt-cover-in">' +
          '<p class="pt-pre">' + e.pre + '</p>' +
          '<h1 class="pt-cnames">' + namesHTML + '</h1>' +
          '<p class="pt-when">' + e.long + '</p>' +
          '<div class="pt-to">' + '<div class="sg-to">Kepada Yth.</div><div class="sg-guest" id="guest-name">' + c.guest + '</div></div>' +
          '<button class="pt-btn" id="open-btn" type="button">' + UK.icon('mail', 18) + 'Buka Undangan</button>' +
        '</div>' + wash() +
      '</div>' +

      '<main class="sg pt" id="inv">' +
        '<section class="pt-hero">' +
          '<img class="pt-kamboja" src="' + IMG + 'kamboja.jpg" alt="" aria-hidden="true">' + gulls(2, 'hero') +
          '<div class="pt-retreat" aria-hidden="true">' + wash() + '</div>' +
          '<p class="pt-pre">' + e.pre + '</p>' +
          '<h2 class="pt-names">' + namesHTML + '</h2>' +
          '<p class="pt-date">' + e.date.replace(/ · /g, '.') + '</p><p class="pt-hash">' + e.hash + '</p>' +
          '<div class="pt-shore">' + waves('transparent', '#1d2b40') + '</div>' +
        '</section>' +
        '<section class="pt-sec pt-quote-sec"><div class="pt-qbg" style="background-image:url(' + IMG + 'laut-tenang.jpg)"></div>' + glints('q') + gulls(2, 'q') +
          '<p class="pt-quote">' + c.q.text + '</p>' + (c.q.src ? '<p class="pt-src" data-rv>' + c.q.src + '</p>' : '') +
        '</section>' +
        waves('#1d2b40', '#efe4d3') +
        '<section class="pt-sec pt-sand">' +
          '<h2 class="pt-h" data-rv>' + (pair ? 'Kami berdua' : 'Yang berbahagia') + '</h2>' +
          '<p class="pt-lead" data-rv>' + c.t.greet + '. Dengan penuh syukur, kami mengundang Bapak/Ibu/Saudara/i ' + e.intro + '</p>' + people +
        '</section>' +
        (e.story ? '<section class="pt-sec pt-sand alt pt-story"><h2 class="pt-h" data-rv>' + S.TITLES.story + '</h2>' +
          S.story(c, 'pt', function (x, i) { return '<div class="pt-st-ph">' + photo('Foto ' + (i + 1)) + '</div>'; }) + '</section>' : '') +
        waves('#efe4d3', '#1d2b40') +
        '<section class="pt-sec pt-sea">' +
          '<h2 class="pt-h" data-rv>Waktu dan tempat</h2>' + evs +
          '<p class="pt-place" data-rv>' + UK.icon('map', 18) + '<span>' + UK.esc(e.place) + '</span></p>' +
          '<a class="pbtn light" data-rv href="' + c.mapUrl + '" target="_blank" rel="noopener">' + UK.icon('map', 18) + 'Buka Google Maps</a>' +
          '<div class="pt-cd" data-rv>' + c.parts.countdown + '</div>' +
        '</section>' +
        waves('#1d2b40', '#efe4d3') +
        '<section class="pt-sec pt-sand">' +
          '<h2 class="pt-h" data-rv>' + S.TITLES.moments + '</h2><p class="pt-hint" data-rv>Geser untuk melihat</p>' +
          '<div class="pt-strip" tabindex="0" aria-label="Galeri foto, geser ke samping">' + slides + '</div>' +
        '</section>' +
        '<section class="pt-sec pt-sand alt"><h2 class="pt-h" data-rv>Ucapan dan doa</h2><div data-rv>' + c.parts.rsvp + '</div></section>' +
        waves('#e7dac6', '#1d2b40') +
        '<section class="pt-sec pt-sea"><h2 class="pt-h" data-rv>Tanda kasih</h2>' +
          '<p class="pt-lead" data-rv>Doa restu Anda adalah hadiah terbaik. Bila ingin berbagi tanda kasih, dapat melalui:</p><div data-rv>' + c.parts.gift + '</div></section>' +
        '<footer class="pt-end"><div class="pt-ebg" style="background-image:url(' + IMG + 'pantai-selatan.jpg)"></div>' +
          '<h2 data-rv>Sampai jumpa di tepi pantai</h2><p data-rv>Kehadiran dan doa Bapak/Ibu/Saudara/i melengkapi hari bahagia kami.</p>' +
          '<p class="pt-sign" data-rv>' + namesOf(e, ' &amp; ') + '</p>' + B_credit() + '</footer>' +
      '</main>';
  };
  function B_credit() { return '<small class="sg-credit">Dibuat dengan ' + UK.config.brand + '</small>'; }

  function loopWaves() {
    gsap.utils.toArray('.pt-waves .w1, .pt-wash .lace').forEach(function (p) { gsap.to(p, { xPercent: -50, duration: 16, ease: 'none', repeat: -1 }); });
    gsap.utils.toArray('.pt-waves .w2, .pt-waves .w3').forEach(function (p) { gsap.to(p, { xPercent: -50, duration: 10, ease: 'none', repeat: -1 }); });
  }

  function fly(scope) {
    gsap.utils.toArray(scope + ' .pt-gull').forEach(function (g, i) {
      var d = gsap.utils.random(16, 26);
      gsap.fromTo(g, { left: '-12%' }, { left: '112%', duration: d, ease: 'none', repeat: -1, delay: -gsap.utils.random(0, d) });
      gsap.to(g, { y: 'random(-14, 14)', duration: gsap.utils.random(2, 3.4), ease: 'sine.inOut', yoyo: true, repeat: -1, repeatRefresh: true });
    });
  }

  L.intro = function () {
    run(function () {
      fly('.pt-cover');
      gsap.fromTo('.pt-photo', { scale: 1.12 }, { scale: 1, duration: 7, ease: 'sine.out' });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .add(splitIn(document.querySelector('.pt-cnames'), 'lines', { duration: 1.2, stagger: 0.14 }), 0.3)
        .from('.pt-cover .pt-pre, .pt-when, .pt-to, .pt-btn', { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.6);
    });
  };

  L.open = function (done) {
    if (!motion()) return instant(done);
    run(function () {
      gsap.set('.pt-hero .pt-names, .pt-hero .pt-pre, .pt-hero .pt-date, .pt-hero .pt-hash', { autoAlpha: 0 });
      gsap.timeline({ onComplete: done })
        .to('.pt-cover-in', { y: -40, autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, 0)
        /* ombak naik menyapu seluruh layar */
        .fromTo('.pt-cover .pt-wash', { yPercent: 100, autoAlpha: 1 }, { yPercent: -8, duration: 1.3, ease: 'power2.inOut' }, 0.1)
        .to('.pt-photo', { scale: 1.08, duration: 1.3, ease: 'power2.in' }, 0.1)
        .set('#cover', { autoAlpha: 0 });
    });
  };

  L.watch = function () {
    if (!motion()) {
      gsap && gsap.set && gsap.set('.pt-hero .pt-names, .pt-hero .pt-pre, .pt-hero .pt-date, .pt-hero .pt-hash', { autoAlpha: 1 });
      return;
    }
    run(function () {
      var names = document.querySelector('.pt-hero .pt-names');
      gsap.set(names, { autoAlpha: 1 });
      var split = window.SplitText ? SplitText.create(names, { type: 'chars' }) : null;
      gsap.timeline()
        /* air surut ke bawah, pasir basah terlihat */
        .fromTo('.pt-retreat', { yPercent: 0, autoAlpha: 1 }, { yPercent: 110, duration: 1.8, ease: 'power2.inOut' }, 0)
        /* nama muncul seperti digores di pasir, huruf demi huruf */
        .from(split ? split.chars : names, { autoAlpha: 0, scale: 1.25, filter: 'blur(6px)', duration: 0.6, ease: 'power2.out', stagger: 0.06 }, 0.7)
        .to('.pt-hero .pt-pre, .pt-hero .pt-date, .pt-hero .pt-hash', { autoAlpha: 1, duration: 0.8, stagger: 0.12 }, 1.3)
        .from('.pt-kamboja', { y: -40, rotation: -10, autoAlpha: 0, duration: 1.4, ease: 'power3.out' }, 0.9);
      loopWaves();
      fly('.pt-hero'); fly('.pt-quote-sec');
      gsap.to('.pt-qbg', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.pt-quote-sec', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('.pt-ebg', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.pt-end', start: 'top bottom', end: 'bottom top', scrub: true } });
      splitIn(document.querySelector('.pt-quote'), 'lines', { duration: 1.1, stagger: 0.14 }, '.pt-quote');
      L.watchCommon();
    });
  };
  UK.layouts.pantai = L;
})(window.UK);

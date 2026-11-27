/* =========================================================
   HIJAU PARAHYANGAN: sawah terasering di lereng pagi.
   Sampul: enam petak terasering bertumpuk di bawah langit subuh.
   Saat dibuka, kamera naik: petak depan turun paling cepat,
   petak jauh paling lambat, dan matahari terbit.
   Isi: zig-zag kiri-kanan, tiap bagian bertepi tangga seperti pematang.
   ========================================================= */
(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, splitIn = S.splitIn;
  var L = S.common();
  L.fonts = 'Yeseva+One&family=Karla:ital,wght@0,400;0,600;0,700;1,400';

  var GREENS = ['#c7d6a6', '#a9c283', '#86a865', '#5f8a4c', '#3f6b3a', '#27472f'];
  /* satu petak: tepi atas bergelombang + garis-garis pematang di dalamnya */
  function terrace(i) {
    var y0 = 300 + i * 52, amp = 14 + i * 3, ph = i * 1.3, d = 'M0 ' + y0, k;
    for (k = 0; k <= 400; k += 20) d += ' L' + k + ' ' + (y0 + Math.sin(k / 70 + ph) * amp).toFixed(1);
    d += ' L400 700 L0 700Z';
    var lines = '';
    for (var j = 1; j <= 3; j++) {
      var l = 'M0 ' + (y0 + j * 13);
      for (k = 0; k <= 400; k += 20) l += ' L' + k + ' ' + (y0 + j * 13 + Math.sin(k / 70 + ph) * amp * (1 - j * 0.15)).toFixed(1);
      lines += '<path d="' + l + '" fill="none" stroke="#e9f0d8" stroke-width="1" opacity="' + (0.5 - j * 0.1) + '"/>';
    }
    return '<g class="tr-layer" data-i="' + i + '"><path d="' + d + '" fill="' + GREENS[i] + '"/>' + lines + '</g>';
  }
  function landscape(cls) {
    var s = '<svg class="' + cls + '" viewBox="0 0 400 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
      '<defs><linearGradient id="' + cls + '-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fb7c9"/><stop offset=".55" stop-color="#f3d9b1"/><stop offset="1" stop-color="#f7e8c8"/></linearGradient></defs>' +
      '<rect class="tr-sky" width="400" height="700" fill="url(#' + cls + '-sky)"/>' +
      '<circle class="tr-sun" cx="290" cy="300" r="34" fill="#f7c873"/>' +
      '<path d="M0 300 Q90 230 170 270 T330 250 T400 262 V700 H0Z" fill="#8fa3a8" opacity=".55"/>';
    for (var i = 0; i < 6; i++) s += terrace(i);
    return s + '</svg>';
  }

  L.html = function (c) {
    var e = c.e, t = c.t, n = 0;
    var B = S.blocks(c, {
      p: 'tr',
      titles: { quote: 'Bubuka', gallery: 'Kenangan', rsvp: 'Doa restu', gift: 'Tanda kasih' },
      head: function (k, title) { return '<h2 class="tr-h" data-rv>' + title + '</h2>'; },
      person: function (x, i) {
        return '<figure class="tr-person" data-rv><div class="tr-photo">' + UK.portrait(t, i === 1) + '</div><figcaption><h3>' + UK.esc(x.n) + '</h3><p>' + UK.esc(x.d) + '</p></figcaption></figure>';
      },
      amp: '<div class="tr-amp" data-rv>&amp;</div>',
      event: function (v) {
        return '<div class="tr-ev" data-rv><h3>' + v.n + '</h3><p>' + UK.icon('calendar', 16) + e.long + '</p><p>' + UK.icon('clock', 16) + v.t + '</p></div>';
      }
    });
    return '' +
      '<div class="sg-cover tr-cover" id="cover">' + landscape('tr-land') +
        '<div class="tr-info"><div class="sg-pre">' + e.pre + '</div><h1>' + S.namesOf(e, ' &amp; ') + '</h1>' + B.guest +
          '<button class="tr-btn" id="open-btn" type="button">' + UK.icon('mail', 18) + 'Buka Undangan</button></div>' +
      '</div>' +
      '<main class="sg tr" id="inv">' +
        '<section class="tr-sec tr-hero">' + landscape('tr-hland') +
          '<div class="tr-hero-in"><p class="tr-pre">' + e.pre + '</p><h2 class="tr-names">' + e.names.join('<br><span>&amp;</span><br>') + '</h2><p class="tr-date">' + e.long + '</p><p class="tr-hash">' + e.hash + '</p></div>' +
        '</section>' +
        B.quote + B.people + B.events + B.gallery + B.rsvp + B.gift +
        '<footer class="tr-end"><h2 data-rv>Hatur nuhun</h2><p data-rv>Kehadiran dan doa restu Bapak/Ibu/Saudara/i adalah kebahagiaan bagi keluarga kami.</p>' + B.credit + '</footer>' +
      '</main>';
  };

  L.intro = function () {
    run(function () {
      gsap.timeline()
        .from('.tr-land .tr-layer', { yPercent: 18, autoAlpha: 0, duration: 1.2, ease: 'power3.out', stagger: 0.09 })
        .from('.tr-info > *', { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.09, ease: 'power2.out' }, 0.5);
      gsap.to('.tr-land .tr-sun', { attr: { cy: 288 }, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
  };

  L.open = function (done) {
    if (!motion()) return instant(done);
    run(function () {
      var tl = gsap.timeline({ onComplete: done });
      tl.to('.tr-info', { autoAlpha: 0, y: -20, duration: 0.5 }, 0);
      /* kamera naik: petak depan bergerak paling jauh */
      gsap.utils.toArray('.tr-land .tr-layer').forEach(function (g, i) {
        tl.to(g, { y: 140 + i * 90, duration: 1.8, ease: 'power2.inOut' }, 0.1);
      });
      tl.to('.tr-land .tr-sun', { attr: { cy: 160, r: 60 }, duration: 1.8, ease: 'power2.inOut', overwrite: true }, 0.1)
        .to('.tr-land .tr-sky', { opacity: 0.6, duration: 1.4 }, 0.4)
        .to('#cover', { autoAlpha: 0, duration: 0.6 }, 1.6);
    });
  };

  L.watch = function () {
    if (!motion()) return;
    run(function () {
      gsap.timeline()
        .add(splitIn(document.querySelector('.tr-names'), 'lines', { duration: 1, stagger: 0.12 }), 0.1)
        .from('.tr-pre, .tr-date, .tr-hash', { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.12 }, 0.5);
      /* parallax petak di hero */
      gsap.utils.toArray('.tr-hland .tr-layer').forEach(function (g, i) {
        gsap.to(g, { y: -(i + 1) * 22, ease: 'none', scrollTrigger: { trigger: '.tr-hero', start: 'top top', end: 'bottom top', scrub: true } });
      });
      /* tiap tepi tangga naik saat bagian masuk layar */
      gsap.utils.toArray('.tr .tr-sec:not(.tr-hero)').forEach(function (s) {
        gsap.from(s, { '--rise': '40px', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 92%', once: true } });
      });
      splitIn(document.querySelector('.tr-quote'), 'lines', { duration: 1, stagger: 0.1 }, '.tr-quote');
      L.watchCommon();
    });
  };
  UK.layouts.terasering = L;
})(window.UK);

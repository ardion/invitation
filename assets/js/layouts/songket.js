/* =========================================================
   RUMAH GADANG: tenun songket Minang.
   Sampul: benang emas ditenun di atas kain merah, membentuk motif
   pucuak rabuang (rebung) dan atap gonjong. Saat dibuka, kain
   terbelah ke atas dan ke bawah seperti selendang yang disibak.
   Isi: simetris, dengan pita songket yang ditenun di antara bagian.
   ========================================================= */
(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, splitIn = S.splitIn;
  var L = S.common();
  L.fonts = 'Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;1,6..96,400&family=Jost:wght@400;500;600';

  /* atap gonjong: empat tanduk melengkung */
  var GONJONG = 'M22 96 C26 70 18 36 0 4 C22 30 38 50 48 60 C58 50 70 40 76 20 C82 40 92 52 100 58 ' +
    'C108 52 118 40 124 20 C130 40 142 50 152 60 C162 50 178 30 200 4 C182 36 174 70 178 96Z';
  function weave() {
    var s = '<svg class="sk-weave" viewBox="0 0 300 420" aria-hidden="true"><g class="sk-weft" stroke="#d4a63a" stroke-width="1.1" fill="none">';
    for (var y = 20; y <= 400; y += 16) s += '<path d="M10 ' + y + ' H290"/>';
    s += '</g><g class="sk-motif" stroke="#e8c467" stroke-width="1.6" fill="none">';
    /* pucuak rabuang: deretan segitiga di atas dan bawah */
    [44, 380].forEach(function (y, k) {
      var d = '', dir = k ? -1 : 1;
      for (var x = 20; x < 290; x += 30) d += 'M' + x + ' ' + y + ' L' + (x + 15) + ' ' + (y - 26 * dir) + ' L' + (x + 30) + ' ' + y + ' ';
      s += '<path d="' + d + '"/>';
    });
    /* belah ketupat di tengah */
    for (var r = 0; r < 3; r++) s += '<path d="M150 ' + (130 + r * 4) + ' L' + (240 - r * 18) + ' 210 L150 ' + (290 - r * 4) + ' L' + (60 + r * 18) + ' 210Z"/>';
    s += '</g><path class="sk-roof" d="' + GONJONG + '" transform="translate(45 160) scale(1.05 .9)" fill="#1d1213" stroke="#d4a63a" stroke-width="1.4"/></svg>';
    return s;
  }
  function band() { return '<div class="sk-band" aria-hidden="true"></div>'; }
  function cap() { return '<svg class="sk-cap" viewBox="0 0 210 100" aria-hidden="true"><path d="' + GONJONG + '" fill="#1d1213" stroke="#d4a63a" stroke-width="2"/></svg>'; }

  L.html = function (c) {
    var e = c.e, t = c.t;
    var B = S.blocks(c, {
      p: 'sk',
      titles: { quote: 'Pambukaan', gallery: 'Kenangan', rsvp: 'Doa restu', gift: 'Tanda kasih' },
      head: function (k, title) { return band() + '<h2 class="sk-h" data-rv>' + title + '</h2>'; },
      person: function (x, i) {
        return '<figure class="sk-person" data-rv>' + cap() + '<div class="sk-photo">' + UK.portrait(t, i === 1) + '</div><figcaption><h3>' + UK.esc(x.n) + '</h3><p>' + UK.esc(x.d) + '</p></figcaption></figure>';
      },
      amp: '<div class="sk-amp" data-rv>&amp;</div>',
      event: function (v) {
        return '<div class="sk-ev" data-rv><h3>' + v.n + '</h3><p>' + e.long + '</p><p>' + v.t + '</p></div>';
      }
    });
    return '' +
      '<div class="sg-cover sk-cover" id="cover">' +
        '<div class="sk-half top" aria-hidden="true"></div><div class="sk-half bottom" aria-hidden="true"></div>' +
        '<div class="sk-stage">' + weave() +
          '<div class="sk-info"><div class="sg-pre">' + e.pre + '</div><h1>' + S.namesOf(e, '<span>&amp;</span>') + '</h1>' + B.guest +
            '<button class="sk-btn" id="open-btn" type="button">' + UK.icon('mail', 18) + 'Buka Undangan</button></div></div>' +
      '</div>' +
      '<main class="sg sk" id="inv">' +
        '<section class="sk-sec sk-hero">' + cap() +
          '<p class="sk-pre">' + e.pre + '</p><h2 class="sk-names">' + S.namesOf(e, '<span>&amp;</span>') + '</h2><p class="sk-date">' + e.long + '</p><p class="sk-hash">' + e.hash + '</p>' +
        '</section>' +
        B.quote + B.people + B.events + B.gallery + B.rsvp + B.gift +
        '<footer class="sk-end">' + band() + '<h2 data-rv>Tarimo kasih</h2><p data-rv>Kehadiran dan doa restu Bapak/Ibu/Saudara/i adalah kehormatan bagi kami sekeluarga.</p>' + B.credit + '</footer>' +
      '</main>';
  };

  L.intro = function () {
    run(function () {
      gsap.timeline()
        /* benang pakan ditenun satu per satu, bergantian dari kiri dan kanan */
        .fromTo('.sk-weft path', { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.6, ease: 'power1.inOut', stagger: 0.04 })
        .fromTo('.sk-weft path:nth-child(even)', { drawSVG: '100% 100%' }, { drawSVG: '0% 100%', duration: 0.6, ease: 'power1.inOut', stagger: 0.04 }, 0)
        .fromTo('.sk-motif path', { drawSVG: 0 }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut', stagger: 0.1 }, 0.6)
        .from('.sk-roof', { y: 40, autoAlpha: 0, duration: 0.9, ease: 'power3.out' }, 1.1)
        .from('.sk-info > *', { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, 1.3);
    });
  };

  L.open = function (done) {
    if (!motion()) return instant(done);
    run(function () {
      gsap.timeline({ onComplete: done })
        .to('.sk-stage', { scale: 0.92, autoAlpha: 0, duration: 0.6, ease: 'power2.in' })
        .to('.sk-half.top', { yPercent: -100, duration: 1.1, ease: 'power3.inOut' }, 0.45)
        .to('.sk-half.bottom', { yPercent: 100, duration: 1.1, ease: 'power3.inOut' }, 0.45)
        .set('#cover', { autoAlpha: 0 });
    });
  };

  L.watch = function () {
    if (!motion()) return;
    run(function () {
      gsap.timeline()
        .from('.sk-hero .sk-cap', { y: 30, autoAlpha: 0, duration: 1, ease: 'power3.out' }, 0)
        .add(splitIn(document.querySelector('.sk-names'), 'chars', { yPercent: 100, duration: 0.9, stagger: 0.035 }), 0.2)
        .from('.sk-pre, .sk-date, .sk-hash', { autoAlpha: 0, y: 10, duration: 0.7, stagger: 0.1 }, 0.6);
      /* pita songket ditenun dari tengah ke kedua sisi saat masuk layar */
      gsap.utils.toArray('.sk-band').forEach(function (b) {
        gsap.fromTo(b, { clipPath: 'inset(0 50% 0 50%)' }, { clipPath: 'inset(0 0% 0 0%)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: b, start: 'top 92%', once: true } });
      });
      splitIn(document.querySelector('.sk-quote'), 'lines', { duration: 1, stagger: 0.1 }, '.sk-quote');
      L.watchCommon();
    });
  };
  UK.layouts.songket = L;
})(window.UK);

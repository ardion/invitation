/* =========================================================
   SEKAR KEDHATON: batik tulis.
   Sampul: kain mori. Garis malam (lilin) tergambar membentuk kawung,
   lalu kain dicelup nila: latar berubah gelap, garis malam tetap terang
   (seperti batik sungguhan), dicelup soga, lalu kain mendekat ke mata.
   Isi: rata kiri dengan pita parang di sisi kiri sepanjang halaman.
   ========================================================= */
(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, splitIn = S.splitIn;
  var L = S.common();
  L.fonts = 'Prata&family=Lora:ital,wght@0,400;0,600;1,400';

  function kawung() {
    var s = '', k = 0;
    for (var y = 0; y < 4; y++) for (var x = 0; x < 4; x++) {
      var cx = 37.5 + x * 75, cy = 37.5 + y * 75;
      s += '<g class="ct-tile" style="--i:' + (k++) + '">' +
        '<ellipse cx="' + cx + '" cy="' + (cy - 17) + '" rx="12" ry="18"/><ellipse cx="' + cx + '" cy="' + (cy + 17) + '" rx="12" ry="18"/>' +
        '<ellipse cx="' + (cx - 17) + '" cy="' + cy + '" rx="18" ry="12"/><ellipse cx="' + (cx + 17) + '" cy="' + cy + '" rx="18" ry="12"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="3"/></g>';
    }
    return s;
  }
  function cloth() {
    return '<svg class="ct-cloth" viewBox="0 0 300 300" aria-hidden="true">' +
      '<defs><clipPath id="ct-clip"><rect width="300" height="300" rx="2"/></clipPath></defs>' +
      '<g clip-path="url(#ct-clip)"><rect width="300" height="300" fill="#efe3cc"/>' +
      '<circle class="ct-dye nila" cx="150" cy="150" r="0" fill="#22304d"/>' +
      '<circle class="ct-dye soga" cx="150" cy="150" r="0" fill="#5a3a22"/>' +
      '<g class="ct-wax" fill="none" stroke="#9a6a3a" stroke-width="1.6">' + kawung() + '</g>' +
      '<rect x="6" y="6" width="288" height="288" fill="none" stroke="#9a6a3a" stroke-width="1.4" class="ct-edge"/></g></svg>';
  }
  /* pita parang: dipakai sebagai latar CSS */
  var PARANG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34"><rect width="34" height="34" fill="#2c1d14"/>' +
    '<path d="M-17 34 L17 0 M0 34 L34 0 M17 34 L51 0" stroke="#9a6a3a" stroke-width="7"/>' +
    '<path d="M-17 34 L17 0 M0 34 L34 0 M17 34 L51 0" stroke="#efe3cc" stroke-width="1.2" stroke-dasharray="2 4"/></svg>') + '")';

  L.html = function (c) {
    var e = c.e, t = c.t;
    var B = S.blocks(c, {
      p: 'ct',
      titles: { quote: 'Pambuka', people: e.people.length > 1 ? 'Kedua mempelai' : 'Yang berbahagia', events: 'Waktu dan tempat', gallery: 'Kenangan', rsvp: 'Pangestu', gift: 'Tanda kasih' },
      head: function (k, title) { return '<header class="ct-head" data-rv><h2>' + title + '</h2><span class="ct-rule"></span></header>'; },
      person: function (x, i) {
        return '<figure class="ct-person" data-rv><div class="ct-frame"><div>' + UK.portrait(t, i === 1) + '</div></div><figcaption><h3>' + UK.esc(x.n) + '</h3><p>' + UK.esc(x.d) + '</p></figcaption></figure>';
      },
      amp: '<p class="ct-amp" data-rv>dan</p>'
    });
    return '' +
      '<div class="sg-cover ct-cover" id="cover">' +
        '<div class="ct-cloth-wrap">' + cloth() + '</div>' +
        '<div class="ct-info"><div class="sg-pre">' + e.pre + '</div><h1>' + S.namesOf(e, ' &amp; ') + '</h1>' + B.guest +
          '<button class="ct-btn" id="open-btn" type="button">' + UK.icon('mail', 18) + 'Buka Undangan</button></div>' +
      '</div>' +
      '<main class="sg ct" id="inv" style="--parang:' + PARANG.replace(/"/g, '&quot;') + '">' +
        '<div class="ct-rail" aria-hidden="true"></div>' +
        '<section class="ct-sec ct-hero">' +
          '<p class="ct-pre">' + e.pre + '</p>' +
          '<h2 class="ct-names">' + e.names.map(function (n) { return '<span>' + n + '</span>'; }).join('<em>&amp;</em>') + '</h2>' +
          '<p class="ct-date">' + e.long + '</p><p class="ct-hash">' + e.hash + '</p>' +
        '</section>' +
        B.quote + B.people + B.events + B.gallery + B.rsvp + B.gift +
        '<footer class="ct-end"><h2 data-rv>Matur nuwun</h2><p data-rv>Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.</p>' + B.credit + '</footer>' +
      '</main>';
  };

  L.intro = function () {
    run(function () {
      gsap.timeline()
        .from('.ct-cloth-wrap', { y: 30, autoAlpha: 0, duration: 0.9, ease: 'power3.out' })
        .fromTo('.ct-edge', { drawSVG: 0 }, { drawSVG: '100%', duration: 1, ease: 'power2.inOut' }, 0.3)
        /* malam ditorehkan petak demi petak, dari tengah ke luar */
        .fromTo('.ct-wax ellipse, .ct-wax circle', { drawSVG: 0 }, { drawSVG: '100%', duration: 0.7, ease: 'power1.inOut', stagger: { each: 0.018, from: 'center', grid: 'auto' } }, 0.5)
        .from('.ct-info > *', { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, 1.2);
    });
  };

  L.open = function (done) {
    if (!motion()) return instant(done);
    run(function () {
      gsap.timeline({ onComplete: done })
        .to('.ct-info', { autoAlpha: 0, y: 20, duration: 0.4 })
        /* celup nila: garis malam menahan warna, jadi tetap terang */
        .to('.ct-dye.nila', { attr: { r: 220 }, duration: 1.1, ease: 'power2.inOut' }, 0.2)
        .to('.ct-wax', { stroke: '#efe3cc', duration: 0.6 }, 0.6)
        .to('.ct-dye.soga', { attr: { r: 90 }, duration: 0.9, ease: 'power2.out' }, 1.2)
        .to('.ct-cloth-wrap', { scale: 6, rotation: 8, duration: 1.1, ease: 'power3.in' }, 1.9)
        .to('#cover', { autoAlpha: 0, duration: 0.45 }, 2.6);
    });
  };

  L.watch = function () {
    if (!motion()) return;
    run(function () {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.ct-rail', { scaleY: 0, transformOrigin: '50% 0%', duration: 1.4, ease: 'power2.inOut' }, 0)
        .add(splitIn(document.querySelector('.ct-names'), 'lines', { duration: 1, stagger: 0.14 }), 0.2)
        .from('.ct-pre, .ct-date, .ct-hash', { x: -16, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.6);
      gsap.utils.toArray('.ct-rule').forEach(function (r) {
        gsap.from(r, { scaleX: 0, transformOrigin: '0% 50%', duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: r, start: 'top 90%', once: true } });
      });
      splitIn(document.querySelector('.ct-quote'), 'lines', { duration: 1, stagger: 0.1 }, '.ct-quote');
      L.watchCommon();
    });
  };
  UK.layouts.canting = L;
})(window.UK);

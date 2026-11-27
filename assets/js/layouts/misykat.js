/* =========================================================
   NUR HIDAYAH: cahaya lentera dan ubin bintang.
   Aset: ubin Shah-i-Zinda Samarkand, litografi interior masjid Kairo karya
   David Roberts (1840-an). Semua domain publik
   (lihat assets/img/CREDITS.md).

   Momen utama: tombol ditekan -> cahaya lampu masjid membesar, lalu sebuah
   bintang delapan bermotif ubin mekar dari tengah sampai memenuhi layar.
   Isi: simetris dan di tengah. Bingkai berbentuk lengkung mihrab
   (lengkung runcing) berisi ubin, dengan lengkung krem di dalamnya.
   ========================================================= */
(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, splitIn = S.splitIn, namesOf = S.namesOf;
  var L = S.common();
  L.fonts = 'Amiri:ital,wght@0,400;0,700;1,400&family=Readex+Pro:wght@300;400;500;600';
  var IMG = 'assets/img/nur/';
  var BASMALAH = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
  /* lengkung runcing (mihrab) sebagai masker CSS */
  var ARCH = 'M0 140 V62 C0 34 26 14 50 0 C74 14 100 34 100 62 V140Z';
  var AMASK = 'url(&quot;data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" preserveAspectRatio="none"><path d="' + ARCH + '"/></svg>') + '&quot;)';
  /* bintang delapan: dua persegi bertumpuk */
  var STAR = (function () {
    var p = [];
    for (var k = 0; k < 16; k++) {
      var ang = (k * 22.5 - 90) * Math.PI / 180, r = k % 2 ? 37 : 50;
      p.push((50 + Math.cos(ang) * r).toFixed(2) + '% ' + (50 + Math.sin(ang) * r).toFixed(2) + '%');
    }
    return 'polygon(' + p.join(',') + ')';
  })();

  function mihrab(inner, cls) {
    return '<div class="nh-mihrab ' + (cls || '') + '" style="-webkit-mask-image:' + AMASK + ';mask-image:' + AMASK + '">' +
      '<div class="nh-mihrab-in" style="-webkit-mask-image:' + AMASK + ';mask-image:' + AMASK + '">' + inner + '</div></div>';
  }
  function photo(label) {
    return '<div class="nh-ph"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="17" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 42c1.5-9 7.5-13 15-13s13.5 4 15 13" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>' + label + '</span></div>';
  }
  function star(cls) { return '<span class="nh-star-m ' + (cls || '') + '" style="clip-path:' + STAR + '" aria-hidden="true"></span>'; }
  var BAND = '<div class="nh-band" aria-hidden="true"></div>';
  /* hiasan bergerak: butiran cahaya yang naik pelan dari lampu */
  function motes(n, cls) {
    var s = '<div class="nh-motes ' + cls + '" aria-hidden="true">';
    for (var i = 0; i < n; i++) s += '<i style="left:' + (8 + (i * 41) % 84) + '%;top:' + (55 + (i * 17) % 40) + '%"></i>';
    return s + '</div>';
  }

  L.html = function (c) {
    var e = c.e, pair = e.people.length > 1;
    var people = e.people.map(function (p, i) {
      return '<figure class="nh-person" data-rv>' + mihrab(photo(pair ? (i ? 'Foto mempelai wanita' : 'Foto mempelai pria') : 'Foto'), 'small') +
        '<figcaption><h3>' + UK.esc(p.n) + '</h3><p>' + UK.esc(p.d) + '</p></figcaption></figure>';
    }).join(pair ? '<div class="nh-amp" data-rv>' + star('tiny') + '</div>' : '');
    var evs = e.events.map(function (v) {
      return '<div class="nh-ev" data-rv>' + star() + '<h3>' + v.n + '</h3><p>' + e.long + '</p><p class="nh-time">' + v.t + '</p></div>';
    }).join('');
    var gal = ['masjid-ghoree.jpg|50% 50%', 'masjid-lengkung.jpg|50% 35%', 'masjid-ghoree.jpg|14% 50%', 'masjid-lengkung.jpg|20% 80%'].map(function (g, i) {
      var p = g.split('|');
      return '<div class="nh-gi" data-ph style="-webkit-mask-image:' + AMASK + ';mask-image:' + AMASK + ';background-image:url(' + IMG + p[0] + ');background-position:' + p[1] + '"><span>Foto ' + (i + 1) + '</span></div>';
    }).join('');
    return '' +
      '<div class="sg-cover nh-cover" id="cover">' +
        '<div class="nh-photo" style="background-image:url(' + IMG + 'masjid-ghoree.jpg)"></div>' +
        '<div class="nh-glow" aria-hidden="true"></div><div class="nh-shade" aria-hidden="true"></div>' + motes(22, 'cover') +
        '<div class="nh-cover-in">' +
          '<svg class="nh-arch-line" viewBox="0 0 100 140" preserveAspectRatio="none" aria-hidden="true"><path d="' + ARCH.replace('Z', '') + '" vector-effect="non-scaling-stroke"/></svg>' +
          '<p class="nh-basmalah" lang="ar" dir="rtl">' + BASMALAH + '</p>' +
          '<p class="nh-pre">' + e.pre + '</p>' +
          '<h1 class="nh-cnames">' + namesOf(e, ' <span>&amp;</span> ') + '</h1>' +
          '<div class="sg-to">Kepada Yth.</div><div class="sg-guest" id="guest-name">' + c.guest + '</div>' +
          '<button class="nh-btn" id="open-btn" type="button">' + UK.icon('mail', 18) + 'Buka Undangan</button>' +
        '</div>' +
        '<div class="nh-burst" aria-hidden="true" style="clip-path:' + STAR + '"></div>' +
      '</div>' +

      '<main class="sg nh" id="inv">' +
        '<section class="nh-hero">' + motes(14, 'hero') + BAND +
          mihrab('<p class="nh-basmalah" lang="ar" dir="rtl">' + BASMALAH + '</p><p class="nh-pre">' + e.pre + '</p>' +
            '<h2 class="nh-names">' + e.names.map(function (n) { return '<span>' + n + '</span>'; }).join('<span class="amp">&amp;</span>') + '</h2>' +
            '<p class="nh-date">' + e.long + '</p><p class="nh-hash">' + e.hash + '</p>', 'big') +
        '</section>' +
        '<section class="nh-sec nh-night"><div class="nh-nbg" style="background-image:url(' + IMG + 'masjid-lengkung.jpg)"></div>' + motes(16, 'night') +
          star('lamp') + '<p class="nh-quote">“' + c.q.text + '”</p>' + (c.q.src ? '<p class="nh-src" data-rv>' + c.q.src + '</p>' : '') +
        '</section>' +
        '<section class="nh-sec">' + BAND + '<h2 class="nh-h" data-rv>' + (pair ? 'Kedua Mempelai' : 'Yang Berbahagia') + '</h2>' +
          '<p class="nh-lead" data-rv>' + c.t.greet + '<br>Dengan memohon rahmat dan ridho Allah Swt., kami bermaksud mengundang Bapak/Ibu/Saudara/i ' + e.intro + '</p>' + people +
        '</section>' +
        (e.story ? '<section class="nh-sec nh-soft nh-story">' + BAND + '<h2 class="nh-h" data-rv>' + S.TITLES.story + '</h2>' +
          S.story(c, 'nh', function (x, i) { return mihrab(photo('Foto ' + (i + 1)), 'tiny'); }) + '</section>' : '') +
        '<section class="nh-sec nh-tile">' + '<h2 class="nh-h" data-rv>Waktu &amp; Tempat</h2>' + evs +
          '<p class="nh-place" data-rv>' + UK.icon('map', 18) + '<span>' + UK.esc(e.place) + '</span></p>' +
          '<a class="pbtn" data-rv href="' + c.mapUrl + '" target="_blank" rel="noopener">' + UK.icon('map', 18) + 'Buka Google Maps</a>' +
          '<div class="nh-cd" data-rv>' + c.parts.countdown + '</div>' +
        '</section>' +
        '<section class="nh-sec">' + BAND + '<h2 class="nh-h" data-rv>' + S.TITLES.moments + '</h2><div class="nh-gal">' + gal + '</div></section>' +
        '<section class="nh-sec nh-soft"><h2 class="nh-h" data-rv>Doa &amp; Ucapan</h2><div data-rv>' + c.parts.rsvp + '</div></section>' +
        '<section class="nh-sec nh-night plain"><h2 class="nh-h" data-rv>Tanda Kasih</h2>' +
          '<p class="nh-lead" data-rv>Doa restu Anda adalah hadiah terbaik. Bila ingin berbagi tanda kasih, dapat melalui:</p><div data-rv>' + c.parts.gift + '</div></section>' +
        '<footer class="nh-end">' + BAND + '<p class="nh-end-sal" data-rv>Wassalamualaikum Warahmatullahi Wabarakatuh</p>' +
          '<h2 data-rv>' + namesOf(e, ' &amp; ') + '</h2><p data-rv>Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan mendoakan.</p>' +
          '<small class="sg-credit">Dibuat dengan ' + UK.config.brand + '</small></footer>' +
      '</main>';
  };

  function rise(scope) {
    gsap.utils.toArray(scope + ' .nh-motes i').forEach(function (m) {
      var d = gsap.utils.random(5, 9);
      gsap.timeline({ repeat: -1, delay: -gsap.utils.random(0, d), repeatRefresh: true })
        .fromTo(m, { y: 0, x: 0, autoAlpha: 0, scale: 'random(0.6, 1.4)' }, { y: 'random(-260, -140)', x: 'random(-30, 30)', duration: d, ease: 'none' }, 0)
        .to(m, { autoAlpha: 0.9, duration: d * 0.3, ease: 'sine.out' }, 0)
        .to(m, { autoAlpha: 0, duration: d * 0.5, ease: 'sine.in' }, d * 0.5);
    });
  }

  L.intro = function () {
    run(function () {
      rise('.nh-cover');
      gsap.set('.nh-burst', { scale: 0, rotation: -45, autoAlpha: 0 });
      gsap.fromTo('.nh-photo', { scale: 1.1 }, { scale: 1, duration: 6, ease: 'sine.out' });
      gsap.to('.nh-glow', { opacity: 0.75, scale: 1.08, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.nh-arch-line path', { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 1.8, ease: 'power2.inOut' }, 0.2)
        .from('.nh-cover-in > *:not(.nh-arch-line)', { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.5);
    });
  };

  L.open = function (done) {
    if (!motion()) return instant(done);
    run(function () {
      gsap.killTweensOf('.nh-glow');
      gsap.timeline({ onComplete: done })
        .to('.nh-cover-in', { autoAlpha: 0, y: 20, duration: 0.5, ease: 'power2.in' }, 0)
        /* cahaya lentera membesar */
        .to('.nh-glow', { opacity: 1, scale: 2.4, duration: 1.1, ease: 'power2.in' }, 0.1)
        /* bintang ubin mekar dari tengah */
        .to('.nh-burst', { autoAlpha: 1, scale: 1.7, rotation: 0, duration: 1.5, ease: 'power3.inOut' }, 0.6)
        .to('#cover', { autoAlpha: 0, duration: 0.55 }, 1.95);
    });
  };

  L.watch = function () {
    if (!motion()) return;
    run(function () {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.nh-hero .nh-band', { scaleX: 0, duration: 1.1, ease: 'power3.inOut' }, 0)
        .from('.nh-mihrab.big', { scaleY: 0.55, scaleX: 0.8, autoAlpha: 0, transformOrigin: '50% 100%', duration: 1.3, ease: 'expo.out' }, 0.1)
        .from('.nh-mihrab.big .nh-basmalah', { autoAlpha: 0, y: 10, duration: 1 }, 0.6)
        .add(splitIn(document.querySelector('.nh-names'), 'chars', { yPercent: 100, duration: 0.9, stagger: 0.04 }), 0.75)
        .from('.nh-mihrab.big .nh-pre, .nh-date, .nh-hash', { autoAlpha: 0, y: 10, duration: 0.7, stagger: 0.1 }, 1);
      gsap.utils.toArray('#inv .nh-band').forEach(function (b, i) {
        if (!i) return;
        gsap.from(b, { scaleX: 0, duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: b, start: 'top 92%', once: true } });
      });
      gsap.to('.nh-nbg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.nh-night', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.from('.nh-star-m.lamp', { scale: 0, rotation: -90, duration: 1.2, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.nh-star-m.lamp', start: 'top 85%', once: true } });
      gsap.utils.toArray('.nh-ev .nh-star-m').forEach(function (s) {
        gsap.to(s, { rotation: 90, ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      rise('.nh-hero'); rise('.nh-night');
      gsap.to('.nh-star-m.lamp', { rotation: '+=360', duration: 60, ease: 'none', repeat: -1 });
      splitIn(document.querySelector('.nh-quote'), 'lines', { duration: 1, stagger: 0.12 }, '.nh-quote');
      L.watchCommon();
    });
  };
  UK.layouts.misykat = L;
})(window.UK);

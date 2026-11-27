/* =========================================================
   KAYON WANA: gunungan sebagai jendela ke lanskap Jawa.
   Aset: litografi Junghuhn (1854), bunga Redouté, kupu-kupu Jan Brandes
   (lihat assets/img/CREDITS.md). Semua domain publik / CC0.

   Alur:
   1. Sampul berbentuk gunungan berisi hutan Telaga Patengan, dihiasi mawar,
      lili, dan dua kupu-kupu yang hinggap.
   2. Buka: kabut naik; di baliknya jendela gunungan bertingkat memperlihatkan
      Dataran Dieng. Burung terbang keluar, kupu-kupu ikut terbang.
   3. Kamera menembus jendela ke dalam lanskap, lalu bingkai lengkung
      tumbuh di tengah hutan dan kupu-kupu beterbangan di sekitarnya.
   ========================================================= */
(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, splitIn = S.splitIn, drawOn = S.drawOn, namesOf = S.namesOf;
  var L = S.common();
  L.fonts = 'Marcellus&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500';
  var IMG = 'assets/img/kayon/';
  var G = UK.shapes.gunungan, uid = 0;
  var GMASK = 'url(&quot;data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="44 12 112 252" preserveAspectRatio="none"><path d="' + G + '"/></svg>') + '&quot;)';

  /* Jendela gunungan bertingkat: tiap tingkat beda warna = kesan timbul */
  function frame() {
    var m = 'wnm' + (uid++);
    var gp = function (k, fill) { return '<path d="' + G + '" fill="' + fill + '" transform="translate(200 330) scale(' + (2.55 * k) + ' ' + (1.58 * k) + ') translate(-100 -140)"/>'; };
    return '<svg class="wn-frame" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><mask id="' + m + '"><rect width="400" height="700" fill="#fff"/>' + gp(1, '#000') + '</mask></defs>' +
      '<g mask="url(#' + m + ')"><rect width="400" height="700" fill="#8d7c6d"/>' + gp(1.17, '#a08f7f') + gp(1.115, '#7b6b5e') + gp(1.065, '#a89786') + gp(1.03, '#685b50') + '</g></svg>';
  }
  function birds() {
    var s = '<svg class="wn-birds" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';
    for (var i = 0; i < 14; i++) s += '<g class="wn-bird"><path d="M-9 0 q4.5 -7 9 0 q4.5 -7 9 0" fill="none" stroke="#fffdf8" stroke-width="2.2" stroke-linecap="round"/></g>';
    return s + '</svg>';
  }
  /* bunga: div luar dianimasikan GSAP (goyang), img dalam memegang rotasi & cermin statis */
  function fl(kind, pos, w, rot, flip, extra) {
    return '<div class="wn-fl k-' + kind + ' ' + (extra || '') + '" style="' + pos + ';width:' + w + '" aria-hidden="true"><img src="' + IMG + kind + '.png" alt="" loading="lazy" style="transform:rotate(' + rot + 'deg)' + (flip ? ' scaleX(-1)' : '') + '"></div>';
  }
  function garland(kind) {
    if (kind === 'cover') return '<div class="wn-garland wn-g-cover">' +
      fl('rosa-indica', 'left:-16%;bottom:2%', '46%', -14, false) +
      fl('lilium', 'left:-4%;bottom:-16%', '42%', -6, false) +
      fl('rosa-indica', 'right:-18%;bottom:-6%', '60%', 10, true) +
      fl('lilium', 'right:16%;bottom:-26%', '34%', 6, true) + '</div>';
    if (kind === 'hero') return '<div class="wn-garland wn-g-hero">' +
      fl('lilium', 'left:-10%;bottom:-18%', '40%', -10, false) +
      fl('rosa-alba', 'left:14%;bottom:-24%', '50%', -4, false) +
      fl('rosa-indica', 'right:-12%;bottom:-8%', '42%', 12, true) +
      fl('rosa-alba', 'right:6%;bottom:-26%', '44%', 6, true) + '</div>';
    if (kind === 'top') return '<div class="wn-garland wn-g-top">' +
      fl('rosa-indica', 'left:-16%;top:-30%', '46%', 160, true) +
      fl('rosa-alba', 'right:-18%;top:-34%', '50%', 196, false) + '</div>';
    return '<div class="wn-garland wn-g-end">' +
      fl('rosa-alba', 'left:-12%;bottom:-20%', '52%', -6, false) +
      fl('lilium', 'right:-4%;bottom:-16%', '40%', 8, true) +
      fl('rosa-indica', 'left:34%;bottom:-30%', '36%', 0, false) + '</div>';
  }
  function bfs(n, cls) {
    var s = '<div class="wn-flies ' + cls + '" aria-hidden="true">';
    for (var i = 0; i < n; i++) s += '<div class="wn-bf"><img src="' + IMG + 'kupu-' + (i % 6 + 1) + '.png" alt=""></div>';
    return s + '</div>';
  }
  /* tempat foto: jelas sebagai contoh, diganti foto asli saat dipesan */
  function photo(label, cls) {
    return '<div class="wn-photo ' + cls + '"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="17" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 42c1.5-9 7.5-13 15-13s13.5 4 15 13" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>' + label + '</span></div>';
  }
  var ORN = '<svg class="wn-orn" viewBox="0 0 300 40" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">' +
    '<path d="M10 20 H112"/><path d="M290 20 H188"/>' +
    '<path d="M150 34 C138 26 124 22 126 12 C128 4 140 6 142 14 C144 22 134 24 132 18"/><path d="M150 34 C162 26 176 22 174 12 C172 4 160 6 158 14 C156 22 166 24 168 18"/>' +
    '<path d="M150 6 C144 12 144 18 150 22 C156 18 156 12 150 6Z"/><path d="M112 20 C118 14 122 16 120 22"/><path d="M188 20 C182 14 178 16 180 22"/></g></svg>';

  L.html = function (c) {
    var e = c.e, pair = e.people.length > 1;
    var kw = UK.kawungBG('#efe3cf', 0.5).replace(/"/g, '&quot;');
    var strips = '<div class="wn-strip l" aria-hidden="true" style="background-image:' + kw + '"></div><div class="wn-strip r" aria-hidden="true" style="background-image:' + kw + '"></div>';
    var people = e.people.map(function (p, i) {
      return '<figure class="wn-person" data-rv><div class="wn-gebyok">' + photo(pair ? (i ? 'Foto mempelai wanita' : 'Foto mempelai pria') : 'Foto', 'g') + '</div><h3>' + UK.esc(p.n) + '</h3><p>' + UK.esc(p.d) + '</p></figure>';
    }).join(pair ? '<div class="wn-amp" data-rv>&amp;</div>' : '');
    var evs = e.events.map(function (v) {
      return '<div class="wn-ev" data-rv><h3>' + v.n + '</h3><p>' + UK.icon('calendar', 16) + e.long + '</p><p>' + UK.icon('clock', 16) + v.t + '</p></div>';
    }).join('');
    var names3 = e.names.length > 1 ? '<span>' + e.names[0] + '</span><span class="amp">&amp;</span><span>' + e.names[1] + '</span>' : '<span>' + e.names[0] + '</span>';
    var gal = ['jendela.jpg|20% 30%', 'hutan.jpg|80% 40%', 'hutan.jpg|10% 70%', 'jendela.jpg|70% 20%', 'hutan.jpg|45% 55%'].map(function (g, i) {
      var p = g.split('|');
      return '<div data-ph style="background-image:url(' + IMG + p[0] + ');background-position:' + p[1] + '"><span>Foto ' + (i + 1) + '</span></div>';
    }).join('');
    return '' +
      '<div class="sg-cover wn-cover" id="cover"><div class="wn-stage">' +
        '<div class="wn-world" style="background-image:url(' + IMG + 'jendela.jpg)"></div>' +
        '<div class="wn-window">' + frame() + '</div>' + birds() + strips +
        '<div class="wn-panel">' +
          '<div class="wn-panel-art" style="background-image:linear-gradient(180deg, rgba(58,48,40,.5), rgba(58,48,40,.84) 70%), url(' + IMG + 'hutan-tegak.jpg);-webkit-mask-image:' + GMASK + ';mask-image:' + GMASK + '"></div>' +
          '<svg class="wn-panel-rim" viewBox="44 12 112 252" preserveAspectRatio="none" aria-hidden="true"><path d="' + G + '" vector-effect="non-scaling-stroke"/></svg>' +
          '<div class="wn-panel-in">' +
            '<div class="wn-pre">The Wedding Of</div><h1 class="wn-cnames">' + namesOf(e, ' &amp; ') + '</h1>' +
            '<div class="wn-coval">' + photo('Foto pasangan', 'o') + '</div>' +
            '<div class="sg-to">Kepada Yth.</div><div class="sg-guest" id="guest-name">' + c.guest + '</div>' +
            '<button class="wn-btn" id="open-btn" type="button">' + UK.icon('mail', 16) + 'Buka Undangan</button>' +
          '</div>' +
        '</div>' +
        garland('cover') + bfs(2, 'rest') +
        '<div class="wn-mist" aria-hidden="true"></div>' +
      '</div></div>' +

      '<main class="sg wn" id="inv">' +
        '<section class="wn-hero"><div class="wn-bg" style="background-image:url(' + IMG + 'hutan.jpg)"></div><div class="wn-veil" aria-hidden="true"></div>' + strips +
          '<div class="wn-arch"><div class="wn-pre">The Wedding Of</div><h2 class="wn-names">' + names3 + '</h2>' +
            '<div class="wn-date">' + e.date.replace(/ · /g, ' . ') + '</div><div class="wn-hash">' + e.hash + '</div><div class="mouse" aria-hidden="true"></div></div>' +
          garland('hero') + bfs(7, 'free') +
        '</section>' +
        '<section class="wn-taupe wn-q">' + garland('top') +
          '<div class="wn-oval" data-rv>' + photo('Foto pasangan', 'o') + '</div>' +
          '<p class="wn-quote">“' + c.q.text + '”</p>' + (c.q.src ? '<div class="wn-src" data-rv>' + c.q.src + '</div>' : '') + ORN +
        '</section>' +
        '<section class="wn-scenic"><div class="wn-bg dim" style="background-image:url(' + IMG + 'hutan.jpg)"></div>' +
          '<div class="wn-card"><p class="wn-salam" data-rv>' + c.t.greet + '</p>' +
            '<p class="wn-lead" data-rv>Dengan memohon rahmat dan ridho Allah Swt., kami bermaksud mengundang Bapak/Ibu/Saudara/i ' + e.intro + '</p>' + people + '</div>' +
        '</section>' +
        (e.story ? '<section class="wn-cream wn-story"><header class="wn-head" data-rv><span class="script">Perjalanan kami</span><h2>' + S.TITLES.story + '</h2></header>' +
          S.story(c, 'wn', function (x, i) { return '<div class="wn-st-ph">' + photo('Foto ' + (i + 1), 'g') + '</div>'; }) + '</section>' : '') +
        '<section class="wn-taupe">' + '<header class="wn-head" data-rv><span class="script">Save the date</span><h2>Waktu &amp; Tempat</h2></header>' + evs +
          '<p class="wn-place" data-rv>' + UK.icon('map', 18) + UK.esc(e.place) + '</p>' +
          '<a class="pbtn light" data-rv href="' + c.mapUrl + '" target="_blank" rel="noopener">' + UK.icon('map', 18) + 'Buka Google Maps</a>' +
          '<div data-rv>' + c.parts.countdown + '</div>' + ORN +
        '</section>' +
        '<section class="wn-cream"><header class="wn-head" data-rv><span class="script">Kenangan indah</span><h2>' + S.TITLES.moments + '</h2></header><div class="wn-gal">' + gal + '</div></section>' +
        '<section class="wn-cream alt"><header class="wn-head" data-rv><span class="script">Doa &amp; restu</span><h2>Ucapan</h2></header><div data-rv>' + c.parts.rsvp + '</div></section>' +
        '<section class="wn-taupe"><header class="wn-head" data-rv><span class="script">Tanda kasih</span><h2>Amplop Digital</h2></header>' +
          '<p class="wn-lead" data-rv>Doa restu Anda adalah hadiah terbaik. Bila ingin berbagi tanda kasih, dapat melalui:</p><div data-rv>' + c.parts.gift + '</div></section>' +
        '<footer class="wn-end"><div class="wn-bg dim" style="background-image:url(' + IMG + 'hutan.jpg)"></div>' +
          '<div class="wn-card"><h2 data-rv>Matur Nuwun</h2><p data-rv>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.</p>' +
            '<div class="wn-sign" data-rv>' + namesOf(e, ' &amp; ') + '</div></div>' +
          garland('end') + '<small class="wn-credit">Dibuat dengan ' + UK.config.brand + '</small></footer>' +
      '</main>';
  };

  /* kepak sayap + terbang acak, semuanya di dalam timeline agar ikut dibersihkan */
  function flutter(b, i, from) {
    var tl = gsap.timeline({ delay: (from && from.delay) || i * 0.08 });
    if (from) tl.fromTo(b, { x: from.x || 0, y: from.y || 0, scale: 0, autoAlpha: 0 }, { x: gsap.utils.random(-160, 160), y: gsap.utils.random(-300, 220), scale: gsap.utils.random(0.55, 1), autoAlpha: 1, rotation: gsap.utils.random(-25, 25), duration: 1.5, ease: 'power2.out' });
    tl.to(b, { x: 'random(-170, 170)', y: 'random(-320, 260)', rotation: 'random(-30, 30)', duration: gsap.utils.random(3.5, 5.5), ease: 'sine.inOut', repeat: -1, repeatRefresh: true });
    return tl;
  }
  function sway(sel) {
    gsap.utils.toArray(sel).forEach(function (f, i) {
      gsap.to(f, { rotation: i % 2 ? 2.5 : -2.5, duration: 3 + (i % 3) * 0.7, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 100%' });
    });
  }

  L.intro = function () {
    run(function () {
      gsap.set('.wn-world, .wn-window, .wn-birds', { autoAlpha: 0 });
      gsap.set('.wn-cover .wn-bf:nth-child(1)', { left: '12%', top: '70%', rotation: -20, scale: 0.6 });
      gsap.set('.wn-cover .wn-bf:nth-child(2)', { left: '78%', top: '64%', rotation: 18, scale: 0.5 });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.wn-panel', { scale: 0.92, autoAlpha: 0, duration: 1.2 })
        .fromTo('.wn-panel-rim path', { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 1.6, ease: 'power2.inOut' }, 0.2)
        .from('.wn-strip', { autoAlpha: 0, duration: 0.8 }, 0.3)
        .from('.wn-garland.wn-g-cover .wn-fl', { y: 140, autoAlpha: 0, duration: 1.3, stagger: 0.12 }, 0.3)
        .from('.wn-panel-in > *', { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.6)
        .from('.wn-cover .wn-bf', { autoAlpha: 0, scale: 0, duration: 0.6, stagger: 0.3 }, 1.4);
      sway('.wn-garland.wn-g-cover .wn-fl');
    });
  };

  L.open = function (done) {
    if (!motion()) return instant(done);
    run(function () {
      var birdEls = gsap.utils.toArray('.wn-bird');
      gsap.set(birdEls, { x: 200, y: 470, scale: 0.3, autoAlpha: 0 });
      gsap.set('.wn-hero .wn-arch', { autoAlpha: 0 });
      gsap.timeline({ onComplete: done })
        /* kupu-kupu yang hinggap ikut terbang pergi */
        .to('.wn-cover .wn-bf', { y: '-=420', x: '+=random(-80, 80)', rotation: 'random(-40, 40)', duration: 1.4, ease: 'power2.in', stagger: 0.1 }, 0)
        .to('.wn-panel-in', { autoAlpha: 0, duration: 0.4 }, 0)
        /* 1. kabut naik menutupi sampul */
        .fromTo('.wn-mist', { yPercent: 100, autoAlpha: 1 }, { yPercent: 0, duration: 0.9, ease: 'power2.inOut' }, 0.15)
        /* 2. di balik kabut: jendela gunungan */
        .set('.wn-panel, .wn-garland.wn-g-cover', { autoAlpha: 0 })
        .set('.wn-world, .wn-window, .wn-birds', { autoAlpha: 1 })
        .fromTo('.wn-world', { scale: 1.3 }, { scale: 1.15, duration: 1.7, ease: 'sine.out' })
        .to('.wn-mist', { yPercent: -100, duration: 1.1, ease: 'power2.inOut' }, '<')
        /* 3. burung terbang keluar */
        .to(birdEls, { x: 'random(10, 390)', y: 'random(40, 300)', scale: 'random(0.8, 1.5)', autoAlpha: 1, duration: 1.7, ease: 'power1.out', stagger: 0.05 }, '-=0.7')
        .to(birdEls, { autoAlpha: 0, duration: 0.4, stagger: 0.03 }, '-=0.5')
        /* 4. kamera menembus jendela ke lanskap */
        .to('.wn-window', { scale: 7, duration: 1.5, ease: 'power2.in', transformOrigin: '50% 47%' }, '-=1.1')
        .to('.wn-strip', { autoAlpha: 0, duration: 0.6 }, '<0.2')
        .to('.wn-world', { scale: 1, duration: 1.5, ease: 'power2.inOut' }, '<-0.2')
        .to('#cover', { autoAlpha: 0, duration: 0.6 }, '-=0.3');
    });
  };

  L.watch = function () {
    if (!motion()) return;
    run(function () {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.wn-hero .wn-arch', { autoAlpha: 0, scaleY: 0.2, scaleX: 0.7 }, { autoAlpha: 1, scaleY: 1, scaleX: 1, duration: 1.2, ease: 'expo.out' })
        .add(splitIn(document.querySelector('.wn-names'), 'chars', { yPercent: 100, duration: 0.9, stagger: 0.045 }), 0.45)
        .from('.wn-arch .wn-pre, .wn-date, .wn-hash, .wn-arch .mouse', { y: 14, autoAlpha: 0, duration: 0.7, stagger: 0.12 }, 0.8)
        .from('.wn-garland.wn-g-hero .wn-fl', { y: 160, autoAlpha: 0, duration: 1.4, stagger: 0.12 }, 0.15)
        .from('.wn-hero .wn-strip', { autoAlpha: 0, duration: 0.8 }, 0.2);
      gsap.utils.toArray('.wn-flies.free .wn-bf').forEach(function (b, i) { flutter(b, i, { delay: 0.3 + i * 0.09 }); });
      sway('.wn-garland.wn-g-hero .wn-fl, .wn-garland.wn-g-top .wn-fl, .wn-garland.wn-g-end .wn-fl');
      gsap.to('.wn-hero .wn-bg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.wn-hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.utils.toArray('.wn-garland.wn-g-top, .wn-garland.wn-g-end').forEach(function (g) {
        gsap.from(g.querySelectorAll('.wn-fl'), { y: g.classList.contains('wn-g-top') ? -90 : 90, autoAlpha: 0, duration: 1.3, ease: 'power3.out', stagger: 0.15, scrollTrigger: { trigger: g, start: 'top 95%', once: true } });
      });
      gsap.fromTo('.wn-q .wn-oval .wn-photo', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.wn-q .wn-oval', start: 'top bottom', end: 'bottom 40%', scrub: true } });
      splitIn(document.querySelector('.wn-quote'), 'lines', { duration: 1, stagger: 0.12 }, '.wn-quote');
      L.watchCommon();
      drawOn('.wn-orn path', true);
    });
  };
  UK.layouts.wana = L;
})(window.UK);

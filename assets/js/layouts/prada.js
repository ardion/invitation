/* =========================================================
   PAWIWAHAN PRADA: keraton Jawa, cokelat sogan dan emas prada.
   Desain dasar dari proyek Stitch milik pengguna ("Raka & Nadya, Pawiwahan Jawa 3D").
   Aset: ilustrasi buatan pengguna lewat Google Stitch (lihat assets/img/CREDITS.md).
   Bidang cokelat di antara lengan wayang dihapus, lalu lengan belakang dipotong
   terpisah supaya bisa digerakkan dari bahu.

   Momen utama: tombol ditekan -> gunungan naik dan berputar seperti dibuka dalang,
   kabut lewat, lalu tampak pendopo joglo di lembah dengan pohon bergoyang.
   Hiasan hidup: wayang putra & putri (lengan bergerak dari bahu, badan bergoyang
   dari tangkai), kupu-kupu (sayap kiri-kanan melipat 3D), gunungan & pohon bergoyang
   dari pangkal, kelopak melati berjatuhan.
   ========================================================= */
(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, splitIn = S.splitIn, namesOf = S.namesOf;
  var L = S.common();
  L.fonts = 'Playfair+Display:ital,wght@0,500;0,600;1,500&family=Raleway:wght@400;500;600&family=Red+Hat+Mono:wght@500';
  var A = 'assets/img/pawiwahan/', P = 'assets/img/delima/';

  function img(f, cls) { return '<img class="' + (cls || '') + '" src="' + A + f + '" alt="" loading="lazy">'; }
  /* wayang: badan + lengan belakang dipotong terpisah. who = putra / putri */
  function wayang(who, cls) {
    return '<div class="pp-wy ' + who + ' ' + (cls || '') + '" aria-hidden="true"><div class="pp-wy-in">' +
      img(who + '-lengan.png', 'pp-arm') + img(who + '-badan.png', 'pp-body') + '</div></div>';
  }
  /* kupu-kupu: gambar yang sama dibelah dua (kiri-kanan) dan dilipat dari garis badan */
  function bflies(n) {
    var s = '';
    for (var i = 0; i < n; i++) {
      s += '<div class="pp-bf" aria-hidden="true" style="width:' + (34 + (i * 7) % 16) + 'px"><div class="pp-bf-bob"><div class="pp-bf-in">' +
        img('kupu.png', 'w l') + img('kupu.png', 'w r') + '</div></div></div>';
    }
    return s;
  }
  function tree(pos) { return '<div class="pp-tree ' + pos + '" aria-hidden="true">' + img('pohon.png') + '</div>'; }
  function gunungan(cls) { return '<div class="pp-gn ' + (cls || '') + '" aria-hidden="true">' + img('gunungan.png') + '</div>'; }
  function melati(pos) { return '<div class="pp-ml ' + pos + '" aria-hidden="true">' + img('melati.png') + '</div>'; }
  /* bingkai: empat sudut emas diambil dari satu gambar, tengahnya warna kayu, tepi dalam memudar */
  function frame(cls) {
    var st = ' style="background-image:url(' + A + 'bingkai.jpg)"';
    return '<div class="pp-frame ' + cls + '" aria-hidden="true"><i class="tl"' + st + '></i><i class="tr"' + st + '></i><i class="bl"' + st + '></i><i class="br"' + st + '></i></div>';
  }
  function petals(n) {
    var s = '<div class="pp-petals" aria-hidden="true">';
    for (var i = 0; i < n; i++) s += '<i style="left:' + ((i * 37 + 9) % 92) + '%"></i>';
    return s + '</div>';
  }
  function photo(src, label, cls) {
    return '<div class="pp-ph ' + (cls || '') + '"><div class="pp-ph-in" style="background-image:url(' + src + ')" role="img" aria-label="' + label + '"></div></div>';
  }

  L.html = function (c) {
    var e = c.e, pair = e.people.length > 1;
    var people = e.people.map(function (p, i) {
      var who = i ? 'putri' : 'putra';
      return '<figure class="pp-person ' + (i ? 'rev' : '') + '">' +
        '<div class="pp-person-art">' + photo(P + (i ? 'wanita.jpg' : 'pria.jpg'), pair ? (i ? 'Foto mempelai wanita' : 'Foto mempelai pria') : 'Foto', 'arch') + wayang(who, 'side') + '</div>' +
        '<figcaption data-rv><h3>' + UK.esc(p.n) + '</h3><p>' + UK.esc(p.d) + '</p></figcaption></figure>';
    }).join(pair ? '<p class="pp-amp" aria-hidden="true">&amp;</p>' : '');
    var evs = e.events.map(function (v) {
      return '<article class="pp-ev" data-rv><h3>' + v.n + '</h3><p class="pp-mono">' + e.long + '</p><p class="pp-mono">' + v.t + '</p>' +
        '<a class="pp-btn sm" href="' + c.mapUrl + '" target="_blank" rel="noopener">' + UK.icon('map', 16) + 'Lihat lokasi</a></article>';
    }).join('');
    var gal = '';
    for (var i = 1; i <= 5; i++) gal += '<figure class="pp-g g' + i + '" data-ph style="background-image:url(' + P + 'momen-' + i + '.jpg)"></figure>';

    return '' +
      '<div class="sg-cover pp-cover" id="cover">' +
        frame('') +
        '<div class="pp-cover-in">' +
          '<p class="pp-pre">The Wedding of</p>' +
          '<h1 class="pp-cnames">' + namesOf(e, ' <span>&amp;</span> ') + '</h1>' +
          '<div class="pp-stage">' + wayang('putra', 'cv') + photo(P + 'berdua.jpg', 'Foto berdua', 'oval') + wayang('putri', 'cv') + '</div>' +
          '<div class="pp-to"><div class="sg-to">Kepada Yth.</div><div class="sg-guest" id="guest-name">' + c.guest + '</div></div>' +
          '<button class="pp-btn" id="open-btn" type="button">' + UK.icon('mail', 18) + 'Buka undangan</button>' +
        '</div>' +
        /* adegan pembuka: lembah + joglo + pohon, gunungan di depan, lalu kabut */
        '<div class="pp-open" aria-hidden="true">' +
          '<div class="pp-vale" style="background-image:url(' + A + 'lembah.jpg)"></div>' +
          '<div class="pp-joglo">' + img('joglo.png') + '</div>' + tree('l') + tree('r') +
          gunungan('big') + '<div class="pp-mist"></div>' +
        '</div>' +
      '</div>' +

      '<main class="sg pp" id="inv">' +
        /* 1. pembuka: kartu oval, melati atas-bawah, kupu-kupu */
        '<section class="pp-hero"><div class="pp-vale soft" style="background-image:url(' + A + 'lembah.jpg)"></div>' +
          melati('top') + melati('bot') + bflies(4) +
          '<div class="pp-oval"><p class="pp-pre dk">The Wedding of</p>' +
            '<h2 class="pp-names">' + namesOf(e, ' <span>&amp;</span> ') + '</h2>' +
            '<p class="pp-mono">' + e.long + '</p>' +
            '<a class="pp-scroll" href="#pp-ayat" aria-label="Gulir ke isi undangan"><i></i></a></div>' +
        '</section>' +
        /* 2. ayat: gelap, foto bulat, gunungan samar */
        '<section class="pp-dark pp-ayat" id="pp-ayat">' + gunungan('ghost') +
          photo(P + 'berdua-2.jpg', 'Foto berdua', 'round') +
          '<p class="pp-quote">' + c.q.text + '</p>' + (c.q.src ? '<p class="pp-src" data-rv>' + c.q.src + '</p>' : '') + '</section>' +
        /* 3. mempelai: foto lengkung berdampingan dengan wayang */
        '<section class="pp-sec"><p class="pp-pre dk" data-rv>' + c.t.greet + '</p><h2 class="pp-h" data-rv>' + (pair ? 'Mempelai' : 'Yang berbahagia') + '</h2>' +
          '<p class="pp-lead" data-rv>Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i ' + e.intro + '</p>' + people + '</section>' +
        /* 4. kisah kami: hijau keraton, garis waktu emas */
        (e.story ? '<section class="pp-teal pp-story">' + bflies(2) + '<h2 class="pp-h light" data-rv>' + S.TITLES.story + '</h2>' +
          S.story(c, 'pp', function (x, i) { return '<div class="pp-st-ph" style="background-image:url(' + P + 'kisah-' + (i + 1) + '.jpg)"></div>'; }) + '</section>' : '') +
        /* 5. hitung mundur: pendopo joglo diapit pohon */
        '<section class="pp-sec alt pp-cdsec"><h2 class="pp-h" data-rv>Menuju hari bahagia</h2>' +
          '<div class="pp-cd" data-rv>' + c.parts.countdown + '</div>' +
          '<div class="pp-scene">' + tree('l') + '<div class="pp-joglo">' + img('joglo.png') + '</div>' + tree('r') + '</div></section>' +
        /* 6. acara: gelap dengan bingkai emas */
        '<section class="pp-dark pp-acara">' + frame('soft') +
          '<h2 class="pp-h light" data-rv>Waktu &amp; tempat</h2>' + evs +
          '<p class="pp-place" data-rv>' + UK.icon('map', 18) + '<span>' + UK.esc(e.place) + '</span></p></section>' +
        /* 7. momen kami */
        '<section class="pp-sec pp-gal-sec">' + bflies(2) + '<h2 class="pp-h" data-rv>' + S.TITLES.moments + '</h2><div class="pp-gal">' + gal + '</div></section>' +
        '<section class="pp-sec alt"><h2 class="pp-h" data-rv>Ucapan &amp; doa</h2><div data-rv>' + c.parts.rsvp + '</div></section>' +
        '<section class="pp-teal pp-gift"><h2 class="pp-h light" data-rv>Tanda kasih</h2>' +
          '<p class="pp-lead light" data-rv>Doa restu Anda adalah hadiah terbaik. Bila ingin berbagi tanda kasih, dapat melalui:</p><div data-rv>' + c.parts.gift + '</div></section>' +
        /* penutup: lembah, gunungan, wayang berdua */
        '<footer class="pp-end"><div class="pp-vale" style="background-image:url(' + A + 'lembah.jpg)"></div>' + petals(9) + tree('l') + tree('r') + bflies(2) +
          '<p class="pp-lead" data-rv>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.</p>' +
          '<h2 class="pp-names sm" data-rv>' + namesOf(e, ' <span>&amp;</span> ') + '</h2>' +
          '<div class="pp-pair">' + wayang('putra', 'end') + gunungan('mid') + wayang('putri', 'end') + '</div>' +
          '<small class="sg-credit">Dibuat dengan ' + UK.config.brand + '</small></footer>' +
      '</main>';
  };

  /* ---------- gerak ---------- */
  var R = function (a, b) { return gsap.utils.random(a, b); };

  /* wayang: lengan berayun dari bahu, badan bergoyang dari tangkai seperti dipegang dalang */
  function puppet(sel) {
    gsap.utils.toArray(sel).forEach(function (w, i) {
      var putri = w.classList.contains('putri');
      gsap.to(w.querySelector('.pp-arm'), { rotation: putri ? -7 : 7, duration: 1.6 + (i % 3) * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1, repeatDelay: 0.6 });
      gsap.to(w.querySelector('.pp-wy-in'), { rotation: putri ? 1.6 : -1.6, y: -4, duration: 2.6 + (i % 2) * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
  }
  /* kupu-kupu: kepak di sayap, jalur di pembungkus, naik-turun di lapis tengah */
  /* zones: daftar area kosong [x0, x1, y0, y1] (pecahan ukuran bagian), dipakai bergiliran,
     supaya kupu-kupu tidak melintas di atas teks */
  function flutter(scope, zones) {
    gsap.utils.toArray(scope + ' .pp-bf').forEach(function (bf, k) {
      var z = zones[k % zones.length];
      var box = bf.parentNode, W = box.offsetWidth, H = box.offsetHeight, sp = 0.14 + (k % 3) * 0.03;
      var o = { duration: sp, ease: 'sine.inOut', yoyo: true, repeat: -1 };
      gsap.fromTo(bf.querySelector('.w.l'), { rotationY: 0 }, Object.assign({ rotationY: 70 }, o));
      gsap.fromTo(bf.querySelector('.w.r'), { rotationY: 0 }, Object.assign({ rotationY: -70 }, o));
      gsap.to(bf.querySelector('.pp-bf-bob'), { y: 10, duration: 0.9 + k * 0.15, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      var pts = [];
      for (var i = 0; i < 6; i++) pts.push([R(z[0], z[1]) * W, R(z[2], z[3]) * H]);
      pts.push(pts[0]);
      var tl = gsap.timeline({ repeat: -1, delay: k * 0.7 });
      gsap.set(bf, { x: pts[0][0], y: pts[0][1] });
      for (var j = 1; j < pts.length; j++) {
        var a = pts[j - 1], b = pts[j], ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI + 90, d = R(1.8, 3);
        tl.to(bf, { rotation: ang, duration: 0.45, ease: 'sine.inOut' }).to(bf, { x: b[0], y: b[1], duration: d, ease: 'sine.inOut' }, '<');
      }
    });
  }
  /* gunungan, pohon, melati: bergoyang dari pangkalnya, durasi berbeda supaya tidak serempak */
  function sway(sel, deg) {
    gsap.utils.toArray(sel).forEach(function (f, i) {
      gsap.to(f, { rotation: (i % 2 ? deg : -deg), duration: 3 + (i % 4) * 0.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
  }
  function fall(scope) {
    gsap.utils.toArray(scope + ' .pp-petals i').forEach(function (pt) {
      var box = pt.parentNode, d = R(8, 13);
      gsap.timeline({ repeat: -1, delay: -R(0, d), repeatRefresh: true })
        .fromTo(pt, { y: -20, x: 0, rotation: 'random(0, 360)', rotationX: 0, autoAlpha: 0 },
          { y: function () { return box.offsetHeight + 20; }, x: 'random(-50, 50)', rotation: '+=random(120, 300)', rotationX: 'random(360, 720)', duration: d, ease: 'none' }, 0)
        .to(pt, { autoAlpha: 0.95, duration: 1 }, 0)
        .to(pt, { autoAlpha: 0, duration: 1 }, d - 1);
    });
  }

  L.intro = function () {
    heroDone = false;
    run(function () {
      puppet('.pp-cover .pp-wy');
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.pp-cover .pp-ph', { scale: 0.85, autoAlpha: 0, duration: 1.1 }, 0.2)
        .from('.pp-cover .pp-wy.putra', { x: -60, autoAlpha: 0, duration: 1.2 }, 0.4)
        .from('.pp-cover .pp-wy.putri', { x: 60, autoAlpha: 0, duration: 1.2 }, 0.4)
        .add(splitIn(document.querySelector('.pp-cnames'), 'chars', { yPercent: 100, duration: 0.8, stagger: 0.03 }), 0.5)
        .from('.pp-cover .pp-pre, .pp-to, .pp-cover .pp-btn', { y: 14, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.9);
    });
  };

  L.open = function (done) {
    if (!motion()) return instant(done);
    run(function () {
      sway('.pp-open .pp-tree', 1.6);
      gsap.timeline({ onComplete: done })
        .to('.pp-cover-in', { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, 0)
        .fromTo('.pp-open', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.3)
        .fromTo('.pp-vale', { scale: 1.08 }, { scale: 1.22, duration: 4.4, ease: 'none' }, 0.3)
        /* gunungan naik dari bawah, berputar dua kali seperti dibuka dalang, lalu menyingkir */
        .fromTo('.pp-open .pp-gn', { yPercent: 70, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' }, 0.4)
        .to('.pp-open .pp-gn img', { rotationY: 720, duration: 1.6, ease: 'power2.inOut' }, 1.1)
        .to('.pp-open .pp-gn', { yPercent: -120, scale: 0.6, autoAlpha: 0, duration: 0.9, ease: 'power2.in' }, 2.6)
        .fromTo('.pp-mist', { autoAlpha: 0, xPercent: -40 }, { autoAlpha: 0.85, xPercent: 0, duration: 0.8, ease: 'sine.out' }, 2.4)
        .to('.pp-mist', { autoAlpha: 0, xPercent: 40, duration: 1, ease: 'sine.in' }, 3.2)
        .from('.pp-open .pp-joglo', { y: 40, autoAlpha: 0, duration: 1.2, ease: 'power3.out' }, 2.9)
        .from('.pp-open .pp-tree.l', { xPercent: -40, autoAlpha: 0, duration: 1.2 }, 2.9)
        .from('.pp-open .pp-tree.r', { xPercent: 40, autoAlpha: 0, duration: 1.2 }, 2.9)
        .add(heroIn, 4.7)
        .to('#cover', { autoAlpha: 0, duration: 0.8 }, 4.8);
    });
  };

  /* kartu oval masuk satu kali, tepat saat adegan joglo memudar (bukan setelah sampul hilang),
     supaya tidak terlihat diam dulu lalu muncul ulang */
  var heroDone = false;
  function heroIn() {
    if (heroDone) return;
    heroDone = true;
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.pp-oval', { scale: 0.9, autoAlpha: 0, duration: 1 }, 0.1)
      .from('.pp-hero .pp-ml.top', { yPercent: -60, autoAlpha: 0, duration: 1.2 }, 0.2)
      .from('.pp-hero .pp-ml.bot', { yPercent: 60, autoAlpha: 0, duration: 1.2 }, 0.3)
      .add(splitIn(document.querySelector('.pp-names'), 'chars', { yPercent: 100, duration: 0.8, stagger: 0.03 }), 0.5)
      .from('.pp-oval .pp-pre, .pp-oval .pp-mono, .pp-scroll', { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.1 }, 0.9)
      .from('.pp-hero .pp-bf', { autoAlpha: 0, duration: 1 }, 1);
    gsap.to('.pp-scroll i', { y: 8, autoAlpha: 0.4, duration: 0.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    flutter('.pp-hero', [[0.08, 0.9, 0.04, 0.16], [0.08, 0.9, 0.84, 0.95]]);
  }

  /* titik hinggap di pohon: diambil dari piksel daun yang benar-benar pekat (bukan bagian transparan),
     di sepertiga atas pohon, lalu dipetakan ke koordinat penutup. Pohon kanan dicerminkan lewat CSS. */
  function perchSpots(tree, E, minY, cb) {
    var src = tree.querySelector('img').src, im = new Image();
    im.onload = function () {
      var W = im.naturalWidth, H = im.naturalHeight, c = document.createElement('canvas');
      c.width = W; c.height = H;
      var g = c.getContext('2d'); g.drawImage(im, 0, 0);
      var d = g.getImageData(0, 0, W, H).data, b = tree.getBoundingClientRect(), sx = b.width / W, sy = b.height / H;
      var flip = tree.classList.contains('r'), pts = [];
      for (var y = Math.round(H * 0.08); y < H * 0.5; y += 6) {
        for (var x = 10; x < W - 10; x += 6) {
          var solid = true;
          for (var dy = -6; dy <= 6 && solid; dy += 6) for (var dx = -6; dx <= 6; dx += 6) if (d[((y + dy) * W + x + dx) * 4 + 3] < 200) { solid = false; break; }
          if (!solid) continue;
          var px = (flip ? W - x : x) * sx + b.left - E.left, py = y * sy + b.top - E.top;
          if (px > 26 && px < E.width - 26 && py > minY) pts.push([px, py]);
        }
      }
      cb(pts);
    };
    im.src = src;
  }

  /* penutup: tiap kupu-kupu punya pohon sendiri. Terbang di sekitar daun, hinggap tepat di daun sambil
     mengepak pelan, lalu terbang lagi di pohon yang sama (tidak pindah ke pohon seberang). */
  function treeFlit() {
    var e = document.querySelector('.pp-end');
    if (!e) return;
    var E = e.getBoundingClientRect(), m = 46;
    var pairB = e.querySelector('.pp-pair').getBoundingClientRect().bottom - E.top;
    gsap.utils.toArray('.pp-end .pp-bf').forEach(function (bf, k) {
      var tree = e.querySelector(k % 2 ? '.pp-tree.r' : '.pp-tree.l');
      perchSpots(tree, E, pairB + m, function (spots) {
        if (!spots.length) return;
        run(function () {
          var o = { duration: 0.15 + k * 0.03, ease: 'sine.inOut', yoyo: true, repeat: -1 };
          var flap = [gsap.fromTo(bf.querySelector('.w.l'), { rotationY: 0 }, Object.assign({ rotationY: 70 }, o)),
                      gsap.fromTo(bf.querySelector('.w.r'), { rotationY: 0 }, Object.assign({ rotationY: -70 }, o))];
          /* terbang: titik sekitar daun, sedikit di luar tajuk */
          var near = function () { var p = gsap.utils.random(spots); return [p[0] + R(-22, 22), Math.max(pairB + m, p[1] + R(-26, 10))]; };
          var pos = gsap.utils.random(spots), start = pos;
          gsap.set(bf, { x: pos[0], y: pos[1] });
          var go = function (tl, p, d) {
            var ang = Math.atan2(p[1] - pos[1], p[0] - pos[0]) * 180 / Math.PI + 90;
            tl.to(bf, { rotation: ang, duration: 0.35, ease: 'sine.inOut' }).to(bf, { x: p[0], y: p[1], duration: d, ease: 'sine.inOut' }, '<');
            pos = p;
          };
          var perch = function (tl) {
            go(tl, gsap.utils.random(spots), R(1.2, 1.6));
            tl.call(function () { flap.forEach(function (t) { gsap.to(t, { timeScale: 0.12, duration: 0.4 }); }); })
              .to(bf, { rotation: R(-25, 25), duration: 0.5, ease: 'sine.out' })
              .to({}, { duration: R(2.2, 3.4) })
              .call(function () { flap.forEach(function (t) { gsap.to(t, { timeScale: 1, duration: 0.3 }); }); });
          };
          var tl = gsap.timeline({ repeat: -1, delay: k * 2.5 });
          for (var c = 0; c < 2; c++) {
            for (var i = 0; i < 3; i++) go(tl, near(), R(1.1, 1.6));
            perch(tl);
          }
          /* kembali ke titik awal (juga titik hinggap) supaya putaran berikutnya menyambung tanpa lompat */
          go(tl, start, R(1.4, 2));
        });
      });
    });
  }

  L.watch = function () {
    if (!motion()) return;
    run(function () {
      heroIn();
      flutter('.pp-story', [[0.05, 0.25, 0.02, 0.08], [0.75, 0.95, 0.02, 0.08]]);
      flutter('.pp-gal-sec', [[0.05, 0.25, 0.01, 0.07], [0.75, 0.95, 0.01, 0.07]]);
      treeFlit();
      puppet('#inv .pp-wy');
      sway('#inv .pp-gn', 2); sway('#inv .pp-tree', 1.5); sway('#inv .pp-ml', 1.2);
      fall('.pp-end');
      gsap.utils.toArray('#inv .pp-vale').forEach(function (v) {
        gsap.fromTo(v, { backgroundPosition: '50% 30%' }, { backgroundPosition: '50% 70%', ease: 'none', scrollTrigger: { trigger: v.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      splitIn(document.querySelector('.pp-quote'), 'lines', { duration: 1, stagger: 0.12 }, '.pp-quote');
      /* foto terbuka dari bawah seperti tirai */
      gsap.utils.toArray('.pp-person .pp-ph, .pp-st-ph, .pp-ayat .pp-ph').forEach(function (a) {
        gsap.from(a, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: a, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray('.pp-person .pp-wy').forEach(function (w) {
        gsap.from(w, { autoAlpha: 0, x: w.parentNode.parentNode.classList.contains('rev') ? -40 : 40, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: w, start: 'top 85%', once: true } });
      });
      L.watchCommon();
    });
  };
  UK.layouts.prada = L;
})(window.UK);

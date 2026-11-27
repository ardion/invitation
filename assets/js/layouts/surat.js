(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, reveal = S.reveal, splitIn = S.splitIn,
      drawOn = S.drawOn, namesOf = S.namesOf, initials = S.initials, evRows = S.evRows, gallery = S.gallery, common = S.common;

  /* =========================================================
     2. SURAT BERSEGEL: amplop dengan segel lilin. Ketuk segel,
        tutup amplop terbuka, surat naik lalu menjadi halaman.
     ========================================================= */
  (function () {
    var L = common();
    function head(n, title) { return '<header class="sr-head" data-rv><span class="sr-num">' + n + '</span><h2>' + title + '</h2></header><hr class="sr-rule">'; }

    L.html = function (c) {
      var e = c.e, pair = e.people.length > 1, ring = (e.names.join(' & ') + ' · ' + e.date.replace(/ /g, '') + ' · ').toUpperCase();
      var people = e.people.map(function (p, i) {
        return '<figure class="sr-person" data-rv><div class="sr-stamp"><div>' + UK.portrait(c.t, i === 1) + '</div></div>' +
          '<figcaption><h3>' + UK.esc(p.n) + '</h3><p>' + UK.esc(p.d) + '</p></figcaption></figure>';
      }).join(pair ? '<div class="sr-amp" data-rv>&amp;</div>' : '');
      var agenda = e.events.map(function (v) {
        return '<div class="sr-row" data-rv><b>' + v.n + '</b><span>' + e.long + '</span><span>' + v.t + '</span></div>';
      }).join('');
      return '' +
        '<div class="sg-cover sr-cover" id="cover">' +
          '<div class="sr-env">' +
            '<div class="sr-back"></div>' +
            '<div class="sr-letter"><div class="sg-pre">' + e.pre + '</div><div class="sr-lnames">' + namesOf(e, ' &amp; ') + '</div><div class="sr-ldate">' + e.date + '</div></div>' +
            '<div class="sr-front"></div><div class="sr-flap"></div>' +
            '<button class="sr-seal" id="open-btn" type="button" aria-label="Buka undangan"><span aria-hidden="true">' + initials(e) + '</span></button>' +
          '</div>' +
          '<div class="sr-info"><div class="sg-to">Kepada Yth.</div><div class="sg-guest" id="guest-name">' + c.guest + '</div><p class="sr-hint">Ketuk segel untuk membuka</p></div>' +
        '</div>' +
        '<main class="sg sr" id="inv">' +
          '<section class="sr-hero">' +
            '<svg class="sr-post" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="srring" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0"/></defs>' +
              '<circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" stroke-width="1"/>' +
              '<text font-size="13" letter-spacing="3" fill="currentColor"><textPath href="#srring">' + UK.esc(ring + ring) + '</textPath></text></svg>' +
            '<div class="sg-pre">' + e.pre + '</div><h2 class="sr-names">' + namesOf(e, '<span>&amp;</span>') + '</h2>' +
            '<div class="sr-date">' + e.long + '</div>' +
          '</section>' +
          '<section class="sr-sec">' + head('01', 'Pembuka') +
            '<p class="sr-letterp" data-rv>' + c.t.greet + ',</p><p class="sr-quote" data-rv>' + c.q.text + '</p>' + (c.q.src ? '<p class="sr-src" data-rv>(' + c.q.src + ')</p>' : '') +
            '<p class="sr-letterp" data-rv>Dengan penuh syukur kami mengundang Bapak/Ibu/Saudara/i ' + e.intro + '</p>' +
          '</section>' +
          '<section class="sr-sec">' + head('02', pair ? 'Mempelai' : 'Yang Berbahagia') + '<div class="sr-people">' + people + '</div></section>' +
          '<section class="sr-sec">' + head('03', 'Agenda') + agenda +
            '<p class="sr-place" data-rv>' + UK.icon('map', 18) + UK.esc(e.place) + '</p>' +
            '<a class="pbtn" data-rv href="' + c.mapUrl + '" target="_blank" rel="noopener">' + UK.icon('map', 18) + 'Buka Google Maps</a>' +
            '<div data-rv>' + c.parts.countdown + '</div>' +
          '</section>' +
          '<section class="sr-sec">' + head('04', 'Galeri') + gallery('sr-gal') + '</section>' +
          '<section class="sr-sec">' + head('05', 'Balasan') + '<div data-rv>' + c.parts.rsvp + '</div></section>' +
          '<section class="sr-sec">' + head('06', 'Tanda Kasih') + '<p class="sr-letterp" data-rv>Doa restu Anda adalah hadiah terbaik. Bila ingin berbagi tanda kasih, dapat melalui:</p><div data-rv>' + c.parts.gift + '</div></section>' +
          '<footer class="sr-end"><p data-rv>Hormat kami,</p><div class="sr-sign">' + namesOf(e, ' &amp; ') + '</div>' +
            '<svg class="sr-swash" viewBox="0 0 240 30" aria-hidden="true"><path d="M6 20 C50 4 80 28 120 16 S200 2 234 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
            '<small>Dibuat dengan ' + UK.config.brand + '</small></footer>' +
        '</main>';
    };

    L.intro = function () {
      run(function () {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('.sr-env', { y: 60, rotation: -6, autoAlpha: 0, duration: 1.1 })
          .from('.sr-seal', { scale: 2.2, autoAlpha: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.3')
          .from('.sr-info > *', { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, '-=0.2');
        /* segel berdenyut pelan supaya terlihat bisa diketuk */
        gsap.to('.sr-seal', { scale: 1.06, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.8 });
      });
    };

    L.open = function (done) {
      if (!motion()) return instant(done);
      run(function () {
        gsap.killTweensOf('.sr-seal');
        gsap.timeline({ onComplete: done })
          .to('.sr-seal', { rotation: 10, duration: 0.07, repeat: 5, yoyo: true, ease: 'none' })
          .to('.sr-seal', { scale: 1.5, autoAlpha: 0, rotation: -30, duration: 0.35, ease: 'power2.in' })
          .to('.sr-info', { autoAlpha: 0, y: 20, duration: 0.3 }, '<')
          .to('.sr-flap', { rotationX: 180, duration: 0.7, ease: 'power2.inOut', transformPerspective: 900 })
          .set('.sr-flap', { zIndex: 1 }, '-=0.35')
          .to('.sr-letter', { yPercent: -62, duration: 0.8, ease: 'power3.out' })
          .set('.sr-letter', { zIndex: 6 })
          .to('.sr-env', { y: '30vh', duration: 0.7, ease: 'power2.in' }, '+=0.25')
          .to('.sr-letter', { scale: 4, autoAlpha: 0, duration: 0.7, ease: 'power2.in' }, '<')
          .to('#cover', { autoAlpha: 0, duration: 0.45 }, '-=0.4');
      });
    };

    L.watch = function () {
      if (!motion()) return;
      run(function () {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('.sr-post', { scale: 0.6, autoAlpha: 0, duration: 1.2 }, 0)
          .add(splitIn(document.querySelector('.sr-names'), 'chars', { yPercent: 100, stagger: 0.05, duration: 1 }), 0.2)
          .from('.sr-hero .sg-pre, .sr-date', { y: 14, autoAlpha: 0, duration: 0.7, stagger: 0.15 }, 0.6);
        /* cap pos berputar mengikuti scroll */
        gsap.to('.sr-post', { rotation: 140, ease: 'none', scrollTrigger: { trigger: '.sr-hero', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.utils.toArray('.sr-rule').forEach(function (r) {
          gsap.from(r, { scaleX: 0, duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: r, start: 'top 90%', once: true } });
        });
        L.watchCommon();
        /* foto galeri miring seperti diletakkan di meja, lalu lurus */
        gsap.utils.toArray('.sr-gal [data-ph]').forEach(function (p, i) {
          gsap.fromTo(p, { rotation: i % 2 ? 5 : -5 }, { rotation: i % 2 ? 1.2 : -1.2, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'center center', scrub: true } });
        });
        drawOn('.sr-swash path', true);
      });
    };
    UK.layouts.surat = L;
  })();
})(window.UK);

(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, reveal = S.reveal, splitIn = S.splitIn,
      drawOn = S.drawOn, namesOf = S.namesOf, initials = S.initials, evRows = S.evRows, gallery = S.gallery, common = S.common;

  /* =========================================================
     1. LAYAR KELIR: panggung wayang. Gunungan di layar yang
        diterangi blencong; saat dibuka, gunungan diputar lalu
        diangkat seperti dalang membuka lakon.
     ========================================================= */
  (function () {
    var L = common();
    function gun(cls, light) {
      var G = UK.shapes.gunungan;
      return '<svg class="' + cls + '" viewBox="40 8 120 262" aria-hidden="true">' +
        '<path class="g-fill" d="' + G + '"/>' +
        '<g class="g-carve" fill="none" stroke="' + light + '" stroke-width="1.3" stroke-linecap="round">' +
          '<path d="M100 252 V92"/><path d="M100 210 C82 196 72 180 70 158"/><path d="M100 210 C118 196 128 180 130 158"/>' +
          '<path d="M100 172 C88 158 84 138 86 118"/><path d="M100 172 C112 158 116 138 114 118"/>' +
          '<path d="M100 132 C94 118 94 104 100 88"/><path d="M80 262 V232 H120 V262"/><path d="M74 232 L100 216 L126 232"/>' +
          '<circle cx="70" cy="154" r="4"/><circle cx="130" cy="154" r="4"/><circle cx="86" cy="114" r="3.5"/><circle cx="114" cy="114" r="3.5"/>' +
        '</g>' +
        '<path class="g-line" d="' + G + '" fill="none" stroke-width="1.6"/></svg>';
    }
    function head(n, label, title) { return '<header class="kl-head" data-rv><span>Babak ' + n + ' · ' + label + '</span><h2>' + title + '</h2></header>'; }

    L.html = function (c) {
      var e = c.e, pair = e.people.length > 1;
      var people = e.people.map(function (p, i) {
        return '<figure class="kl-fig" data-rv><div class="kl-shadow" aria-hidden="true">' + UK.portrait(c.t, i === 1) + '</div>' +
          '<div class="kl-photo">' + UK.portrait(c.t, i === 1) + '</div><figcaption><h3>' + UK.esc(p.n) + '</h3><p>' + UK.esc(p.d) + '</p></figcaption></figure>' +
          (i === 0 && pair ? '<div class="kl-amp" data-rv>&amp;</div>' : '');
      }).join('');
      return '' +
        '<div class="sg-cover kl-cover" id="cover">' +
          '<div class="kl-screen" aria-hidden="true"><div class="kl-glow"></div>' + gun('kl-gun', '#f6d58a') + '<div class="kl-floor"></div></div>' +
          '<div class="kl-info">' +
            '<div class="sg-pre">' + e.pre + '</div>' +
            '<h1 class="kl-title">' + namesOf(e, '<span>&amp;</span>') + '</h1>' +
            '<div class="sg-to">Kepada Yth.</div><div class="sg-guest" id="guest-name">' + c.guest + '</div>' +
            '<button class="kl-btn" id="open-btn" type="button">' + UK.icon('sparkle', 18) + 'Buka Lakon</button>' +
          '</div>' +
        '</div>' +
        '<main class="sg kl" id="inv">' +
          '<section class="kl-hero">' + gun('kl-mini', '#7a2e1f') +
            '<div class="sg-pre">' + e.pre + '</div><h2 class="kl-names">' + namesOf(e, ' <em>&amp;</em> ') + '</h2>' +
            '<div class="kl-date">' + e.date + '</div><div class="kl-hash">' + e.hash + '</div>' +
          '</section>' +
          '<section class="kl-dark">' + head('I', 'Pambuka', 'Pembuka') +
            '<p class="kl-quote">“' + c.q.text + '”</p>' + (c.q.src ? '<div class="kl-src" data-rv>' + c.q.src + '</div>' : '') +
          '</section>' +
          '<section class="kl-sec">' + head('II', 'Paraga', pair ? 'Kedua Mempelai' : 'Yang Berbahagia') +
            '<p class="kl-lead" data-rv>' + c.t.greet + '.<br>Dengan memohon rahmat Tuhan Yang Maha Esa, kami mengundang Bapak/Ibu/Saudara/i ' + e.intro + '</p>' + people +
          '</section>' +
          '<section class="kl-sec kl-alt">' + head('III', 'Wekdal', 'Waktu &amp; Tempat') + evRows(e, 'kl-ev') +
            '<p class="kl-place" data-rv>' + UK.icon('map', 18) + UK.esc(e.place) + '</p>' +
            '<a class="pbtn" data-rv href="' + c.mapUrl + '" target="_blank" rel="noopener">' + UK.icon('map', 18) + 'Buka Google Maps</a>' +
            '<div data-rv>' + c.parts.countdown + '</div>' +
          '</section>' +
          '<section class="kl-sec">' + head('IV', 'Pepeling', 'Galeri') + gallery('kl-gal') + '</section>' +
          '<section class="kl-sec kl-alt">' + head('V', 'Pangestu', 'Doa &amp; Restu') + '<div data-rv>' + c.parts.rsvp + '</div></section>' +
          '<section class="kl-sec">' + head('VI', 'Tanda Tresna', 'Amplop Digital') +
            '<p class="kl-lead" data-rv>Doa restu Anda adalah hadiah terbaik. Bila ingin berbagi tanda kasih, dapat melalui:</p><div data-rv>' + c.parts.gift + '</div></section>' +
          '<footer class="kl-end">' + gun('kl-mini end', '#f6d58a') + '<h2 data-rv>Tancep Kayon</h2><p data-rv>Lakon kami selesai di sini. Terima kasih atas doa dan kehadiran Bapak/Ibu/Saudara/i.</p><small>Dibuat dengan ' + UK.config.brand + '</small></footer>' +
        '</main>';
    };

    L.intro = function () {
      run(function () {
        var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.kl-glow', { scale: 0.4, autoAlpha: 0, duration: 1.4 })
          .from('.kl-gun .g-fill', { autoAlpha: 0, duration: 1 }, 0.3)
          .fromTo('.kl-gun .g-line', { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 1.8, ease: 'power2.inOut' }, 0.3)
          .fromTo('.kl-gun .g-carve path, .kl-gun .g-carve circle', { drawSVG: 0 }, { drawSVG: '100%', duration: 1, stagger: 0.06 }, 0.9)
          .from('.kl-info > *', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 1.1);
        /* nyala api blencong bergetar pelan */
        gsap.to('.kl-glow', { opacity: 'random(0.78, 1)', scale: 'random(0.97, 1.03)', duration: 0.14, ease: 'none', repeat: -1, repeatRefresh: true, delay: 1.4 });
        gsap.to('.kl-gun', { rotation: 2, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 100%' });
      });
    };

    L.open = function (done) {
      if (!motion()) return instant(done);
      run(function () {
        gsap.killTweensOf('.kl-gun');
        gsap.timeline({ onComplete: done })
          .to('.kl-info', { autoAlpha: 0, y: 30, duration: 0.45, ease: 'power2.in' })
          .to('.kl-gun', { rotationY: 540, rotation: 0, duration: 1.3, ease: 'power2.inOut', transformPerspective: 700 }, 0)
          .to('.kl-gun', { y: '-110vh', duration: 0.9, ease: 'power3.in' }, '-=0.25')
          .to('.kl-glow', { scale: 7, opacity: 1, duration: 1.1, ease: 'power2.in' }, '<')
          .to('#cover', { autoAlpha: 0, duration: 0.5 }, '-=0.35');
      });
    };

    L.watch = function () {
      if (!motion()) return;
      run(function () {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .fromTo('.kl-hero .g-line', { drawSVG: 0 }, { drawSVG: '100%', duration: 1.6, ease: 'power2.inOut' }, 0)
          .fromTo('.kl-hero .g-carve path, .kl-hero .g-carve circle', { drawSVG: 0 }, { drawSVG: '100%', duration: 0.8, stagger: 0.05 }, 0.4)
          .add(splitIn(document.querySelector('.kl-names'), 'words,chars', { stagger: 0.035 }), 0.2)
          .from('.kl-hero .sg-pre, .kl-date, .kl-hash', { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.12 }, 0.7);
        splitIn(document.querySelector('.kl-quote'), 'lines', { duration: 1, stagger: 0.12 }, '.kl-quote');
        L.watchCommon();
        /* bayangan wayang bergeser mengikuti scroll, seperti lampu blencong */
        gsap.utils.toArray('.kl-fig').forEach(function (f) {
          gsap.fromTo(f.querySelector('.kl-shadow'), { x: -40, y: 18, rotation: -4 }, { x: 40, y: -6, rotation: 4, ease: 'none',
            scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
        gsap.fromTo('.kl-end .g-line', { drawSVG: 0 }, { drawSVG: '100%', ease: 'none', scrollTrigger: { trigger: '.kl-end', start: 'top 90%', end: 'top 35%', scrub: 0.6 } });
        gsap.set('.kl-end .g-carve', { autoAlpha: 0.5 });
      });
    };
    UK.layouts.kelir = L;
  })();
})(window.UK);

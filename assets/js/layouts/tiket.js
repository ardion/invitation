(function (UK) {
  var S = UK.sg, run = S.run, motion = S.motion, instant = S.instant, reveal = S.reveal, splitIn = S.splitIn,
      drawOn = S.drawOn, namesOf = S.namesOf, initials = S.initials, evRows = S.evRows, gallery = S.gallery, common = S.common;

  /* =========================================================
     3. TIKET PESTA: tiket masuk. Sobek potongan tiket, konfeti
        meledak, lalu masuk ke halaman pesta yang ceria.
     ========================================================= */
  (function () {
    var L = common();
    var COLORS = ['#ffb703', '#ef476f', '#06d6a0', '#ffffff', '#8ecae6'];
    function head(sticker, title) { return '<header class="tk-head"><span class="tk-sticker" data-pop>' + sticker + '</span><h2 data-words>' + title + '</h2></header>'; }

    L.html = function (c) {
      var e = c.e, conf = '';
      for (var i = 0; i < 44; i++) conf += '<i style="background:' + COLORS[i % COLORS.length] + ';' + (i % 3 ? '' : 'border-radius:50%;') + '"></i>';
      var balloons = [['#ef476f', 6, 12], ['#ffb703', 80, 6], ['#06d6a0', 82, 62], ['#ffffff', 4, 66]].map(function (b) {
        return '<svg class="tk-balloon" style="left:' + b[1] + '%;top:' + b[2] + '%" viewBox="0 0 40 80" aria-hidden="true"><ellipse cx="20" cy="20" rx="16" ry="19" fill="' + b[0] + '"/><path d="M18 38 l2 4 2 -4Z" fill="' + b[0] + '"/><path d="M20 42 Q14 56 22 66 T20 80" fill="none" stroke="#1e2a52" stroke-width="1" opacity=".5"/><ellipse cx="14" cy="13" rx="4" ry="6" fill="#fff" opacity=".35"/></svg>';
      }).join('');
      var people = e.people.map(function (p, i) {
        return '<figure class="tk-person" data-rv><div class="tk-ring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="10 9" stroke-linecap="round"/></svg><div>' + UK.portrait(c.t, i === 1) + '</div></div>' +
          '<figcaption><h3>' + UK.esc(p.n) + '</h3><p>' + UK.esc(p.d) + '</p></figcaption></figure>';
      }).join('');
      var evs = e.events.map(function (v) { return '<div class="tk-ev" data-rv><h3>' + v.n + '</h3><p>' + UK.icon('calendar', 16) + e.long + '</p><p>' + UK.icon('clock', 16) + v.t + '</p></div>'; }).join('');
      var hh = (e.events[0].t.match(/\d{2}\.\d{2}/) || [''])[0];
      return '' +
        '<div class="sg-cover tk-cover" id="cover">' +
          '<div class="tk-confetti" aria-hidden="true">' + conf + '</div>' +
          '<div class="tk-ticket">' +
            '<div class="tk-main"><div class="tk-label">Tiket masuk</div><div class="sg-pre">' + e.pre + '</div><h1>' + namesOf(e, ' &amp; ') + '</h1>' +
              '<div class="tk-meta"><span>Tanggal<b>' + e.date.replace(/ /g, '') + '</b></span><span>Jam<b>' + hh + '</b></span></div>' +
              '<div class="tk-for"><span class="sg-to">Untuk</span><span class="sg-guest" id="guest-name">' + c.guest + '</span></div></div>' +
            '<div class="tk-stub"><button class="tk-tear" id="open-btn" type="button">' + UK.icon('gift', 18) + 'Sobek tiket &amp; masuk</button><span class="tk-no" aria-hidden="true">No. 007</span></div>' +
          '</div>' +
        '</div>' +
        '<main class="sg tk" id="inv">' +
          '<section class="tk-hero">' + balloons +
            '<div class="tk-sticker big" data-pop>Kamu diundang!</div>' +
            '<div class="sg-pre">' + e.pre + '</div><h2 class="tk-names">' + namesOf(e, ' &amp; ') + '</h2><div class="tk-date">' + e.long + '</div><div class="tk-hash">' + e.hash + '</div>' +
          '</section>' +
          '<section class="tk-sec y">' + head('Halo!', 'Ada kabar gembira') +
            '<p class="tk-lead" data-rv>' + c.t.greet + '! Kami mengundang Bapak/Ibu/Saudara/i ' + e.intro + '</p>' + people +
            '<p class="tk-quote" data-rv>“' + c.q.text + '”</p>' +
          '</section>' +
          '<section class="tk-sec p">' + head('Catat!', 'Kapan &amp; di mana') + evs +
            '<p class="tk-place" data-rv>' + UK.icon('map', 18) + UK.esc(e.place) + '</p>' +
            '<a class="pbtn" data-rv href="' + c.mapUrl + '" target="_blank" rel="noopener">' + UK.icon('map', 18) + 'Lihat peta</a>' +
            '<div data-rv>' + c.parts.countdown + '</div>' +
          '</section>' +
          '<section class="tk-sec b">' + head('Cekrek', 'Galeri seru') + gallery('tk-gal') + '</section>' +
          '<section class="tk-sec y">' + head('Hadir?', 'Kirim ucapan') + '<div data-rv>' + c.parts.rsvp + '</div></section>' +
          '<section class="tk-sec p">' + head('Kado', 'Amplop digital') + '<p class="tk-lead" data-rv>Doa dan kehadiranmu sudah jadi kado terbaik. Bila ingin berbagi:</p><div data-rv>' + c.parts.gift + '</div></section>' +
          '<footer class="tk-end"><h2 data-words>Sampai ketemu di pesta!</h2><small>Dibuat dengan ' + UK.config.brand + '</small></footer>' +
        '</main>';
    };

    L.intro = function () {
      run(function () {
        gsap.timeline()
          .from('.tk-ticket', { y: 120, rotation: 12, autoAlpha: 0, duration: 0.9, ease: 'back.out(1.6)' })
          .from('.tk-main > *', { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.3')
          .from('.tk-tear', { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: 'back.out(3)' }, '-=0.2');
        gsap.to('.tk-ticket', { y: -8, rotation: -1.5, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 });
      });
    };

    L.open = function (done) {
      if (!motion()) return instant(done);
      run(function () {
        gsap.killTweensOf('.tk-ticket');
        var bits = gsap.utils.toArray('.tk-confetti i');
        gsap.set(bits, { x: 0, y: 0, autoAlpha: 1 });
        gsap.timeline({ onComplete: done })
          .to('.tk-stub', { rotation: -4, duration: 0.06, repeat: 3, yoyo: true, ease: 'none', transformOrigin: '0% 0%' })
          .to('.tk-stub', { rotation: 24, y: '80vh', x: 40, duration: 0.9, ease: 'power2.in' })
          .to(bits, { x: 'random(-190, 190)', y: 'random(-380, -120)', rotation: 'random(-540, 540)', duration: 0.8, ease: 'power3.out' }, '<0.1')
          .to(bits, { y: '+=520', autoAlpha: 0, duration: 1.3, ease: 'power1.in', stagger: { amount: 0.3, from: 'random' } }, '>-0.1')
          .to('.tk-ticket', { scale: 1.08, duration: 0.25, ease: 'power2.out' }, '<-0.6')
          .to('.tk-ticket', { y: '-110vh', rotation: -8, duration: 0.7, ease: 'back.in(1.4)' }, '<0.25')
          .to('#cover', { autoAlpha: 0, duration: 0.45 }, '-=0.5');
      });
    };

    L.watch = function () {
      if (!motion()) return;
      run(function () {
        gsap.timeline()
          .from('.tk-hero .tk-sticker', { scale: 0, rotation: -40, duration: 0.7, ease: 'back.out(3)' }, 0)
          .add(splitIn(document.querySelector('.tk-names'), 'chars', { yPercent: 120, duration: 0.7, ease: 'back.out(2.5)', stagger: 0.05 }), 0.15)
          .from('.tk-hero .sg-pre, .tk-date, .tk-hash', { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.5)
          .from('.tk-balloon', { y: 260, autoAlpha: 0, duration: 1.4, stagger: 0.12, ease: 'power2.out' }, 0);
        /* balon melayang lebih cepat dari scroll (parallax) */
        gsap.utils.toArray('.tk-balloon').forEach(function (b, i) {
          gsap.to(b, { y: -160 - i * 40, ease: 'none', scrollTrigger: { trigger: '.tk-hero', start: 'top top', end: 'bottom top', scrub: true } });
          gsap.to(b, { rotation: i % 2 ? 6 : -6, duration: 2 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 100%' });
        });
        gsap.utils.toArray('#inv .tk-head [data-pop]').forEach(function (s) {
          gsap.from(s, { scale: 0, rotation: gsap.utils.random(-50, 50), duration: 0.7, ease: 'back.out(3)', scrollTrigger: { trigger: s, start: 'top 88%', once: true } });
        });
        gsap.utils.toArray('#inv [data-words]').forEach(function (h) {
          splitIn(h, 'words', { yPercent: 120, duration: 0.6, ease: 'back.out(2)', stagger: 0.08 }, h);
        });
        L.watchCommon();
        gsap.to('.tk-ring svg', { rotation: 360, duration: 14, ease: 'none', repeat: -1 });
      });
    };
    L.fonts = 'Fredoka:wght@400;500;600;700';
    UK.layouts.tiket = L;
  })();
})(window.UK);

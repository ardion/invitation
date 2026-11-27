/* =========================================================
   ORNAMEN & IKON — semua SVG dibuat sendiri (bebas hak cipta)
   ========================================================= */
window.UK = window.UK || {};
(function (UK) {
  var uid = 0;

  /* ---------- Ikon garis (gaya Lucide, stroke 1.75) ---------- */
  var I = {
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    whatsapp: '<path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 7.8 19.6Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-1.9-.9-.8.8a3.8 3.8 0 0 1-2.3-2.3l.8-.8-.9-1.9Z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    musicOff: '<path d="M9 18V5l12-2v9"/><circle cx="6" cy="18" r="3"/><path d="m3 3 18 18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v3M16 3v3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    map: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8S10.5 3 8 4.5 9 8 12 8ZM12 8s1.5-5 4-3.5S15 8 12 8Z"/>',
    message: '<path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-5.6A8 8 0 1 1 21 12Z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.8 1.5-1.6 0-1.2-1-1.6-1-2.6 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7" r="1.2"/>',
    phone: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16M20 20v-4h-4"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    filter: '<path d="M3 5h18l-7 8.5V19l-4 2v-7.5Z"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9Z"/>'
  };
  UK.icon = function (name, size, extra) {
    size = size || 20;
    return '<svg class="ic' + (extra ? ' ' + extra : '') + '" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + I[name] + '</svg>';
  };

  /* ---------- Gunungan: siluet simetris bertepi gelombang api ---------- */
  function gunungan() {
    var R = [[0, 16], [6, 38], [15, 54], [31, 64], [25, 76], [41, 84], [33, 97], [49, 106], [43, 121], [52, 134], [52, 262]];
    var pts = R.map(function (p) { return [100 + p[0], p[1]]; });
    R.slice(1).reverse().forEach(function (p) { pts.push([100 - p[0], p[1]]); });
    var n = pts.length, mid = function (a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; };
    var m = mid(pts[n - 1], pts[0]), d = 'M' + m[0].toFixed(1) + ' ' + m[1].toFixed(1);
    for (var i = 0; i < n; i++) {
      var c = pts[i], e = mid(pts[i], pts[(i + 1) % n]);
      d += c[1] === 262 ? ' L' + c[0] + ' ' + c[1] : ' Q' + c[0].toFixed(1) + ' ' + c[1].toFixed(1) + ' ' + e[0].toFixed(1) + ' ' + e[1].toFixed(1);
    }
    return d + 'Z';
  }
  var SHAPES = {
    gunungan: gunungan(),
    arch: 'M44 262 V118 A56 56 0 0 1 156 118 V262Z',
    frame: 'M42 44 H158 V262 H42Z',
    circle: 'M100 66 a78 78 0 1 0 0.01 0Z'
  };
  UK.shapes = SHAPES;

  /* ---------- Motif batik kawung (tile 28x28) ---------- */
  function kawung(color, w, op) {
    return '<g fill="none" stroke="' + color + '" stroke-width="' + w + '" opacity="' + op + '"><ellipse cx="14" cy="7" rx="4.6" ry="7"/><ellipse cx="14" cy="21" rx="4.6" ry="7"/><ellipse cx="7" cy="14" rx="7" ry="4.6"/><ellipse cx="21" cy="14" rx="7" ry="4.6"/></g><circle cx="14" cy="14" r="1.5" fill="' + color + '" opacity="' + op + '"/>';
  }
  UK.kawungBG = function (c, op) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 28 28">' + kawung(c, 0.7, op || 0.22) + '</svg>';
    return 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '")';
  };

  /* ---------- Sulur sudut ---------- */
  UK.sulur = function (c) {
    return '<svg viewBox="0 0 90 90" aria-hidden="true"><g fill="none" stroke="' + c + '" stroke-width="1.6" stroke-linecap="round"><path d="M4 4 C40 4 62 20 62 44 C62 62 44 66 38 54 C34 44 44 38 50 44"/><path d="M4 4 C4 40 20 62 44 62 C62 62 66 44 54 38 C44 34 38 44 44 50"/><path d="M4 4 L26 26"/></g><g fill="' + c + '" opacity=".65"><path d="M24 12 q10 -3 15 6 q-10 3 -15 -6Z"/><path d="M12 24 q-3 10 6 15 q3 -10 -6 -15Z"/><path d="M46 20 q10 0 12 9 q-10 1 -12 -9Z"/><path d="M20 46 q0 10 9 12 q1 -10 -9 -12Z"/></g><circle cx="26" cy="26" r="3.2" fill="' + c + '"/></svg>';
  };

  /* ---------- Pita motif ombak (pembatas bagian) ---------- */
  UK.band = function (c) {
    var id = 'b' + (uid++);
    return '<svg class="band" width="100%" height="26" aria-hidden="true"><defs><pattern id="' + id + '" width="24" height="26" patternUnits="userSpaceOnUse"><path d="M0 18 C6 18 6 6 12 6 S18 18 24 18" fill="none" stroke="' + c + '" stroke-width="1.4"/><path d="M0 24 C6 24 6 12 12 12 S18 24 24 24" fill="none" stroke="' + c + '" stroke-width="1" opacity=".55"/></pattern></defs><rect width="100%" height="26" fill="url(#' + id + ')"/></svg>';
  };

  /* ---------- Pembatas ornamen tengah ---------- */
  UK.divider = function () {
    return '<svg class="orn" viewBox="0 0 150 20" aria-hidden="true"><path d="M0 10 H56 M94 10 H150" stroke="currentColor" stroke-width="1"/><path d="M75 2 C82 4 86 8 86 10 C86 12 82 16 75 18 C68 16 64 12 64 10 C64 8 68 4 75 2Z" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="75" cy="10" r="2.5" fill="currentColor"/></svg>';
  };

  /* ---------- Kupu-kupu ---------- */
  UK.butterfly = '<svg viewBox="0 0 26 22" aria-hidden="true"><path d="M13 11 C4 0 0 3 2 9 C3 13 8 13 13 11Z M13 11 C22 0 26 3 24 9 C23 13 18 13 13 11Z M13 11 C6 22 3 18 5 15 C6 13 10 12 13 11Z M13 11 C20 22 23 18 21 15 C20 13 16 12 13 11Z" fill="currentColor"/></svg>';

  /* ---------- Medali gebyok ---------- */
  UK.medal = function (c) {
    return '<svg class="med" viewBox="0 0 46 22" aria-hidden="true"><path d="M23 2 L27 12 L40 14 L30 18 L23 22 L16 18 L6 14 L19 12Z" fill="' + c + '"/><circle cx="23" cy="12" r="3" fill="#3b2a20"/></svg>';
  };

  /* ---------- Ilustrasi di dalam bingkai ---------- */
  function scene(t) {
    var s = '';
    switch (t.scene) {
      case 'joglo':
        s += '<path d="M44 196 L74 150 L92 172 L124 132 L156 190 V262 H44Z" fill="#8a7560" opacity=".35"/>';
        s += '<path d="M93 236 Q99 196 91 150 L109 150 Q101 196 107 236Z" fill="#4b3a2c"/>';
        s += '<g stroke="#4b3a2c" stroke-width="1.2" opacity=".8"><path d="M70 120 V168"/><path d="M78 126 V182"/><path d="M122 126 V184"/><path d="M130 120 V170"/><path d="M62 134 V160"/><path d="M138 134 V162"/></g>';
        s += '<g fill="#5a4636"><circle cx="100" cy="90" r="28"/><circle cx="74" cy="108" r="24"/><circle cx="126" cy="108" r="24"/><circle cx="58" cy="128" r="16"/><circle cx="142" cy="128" r="16"/><circle cx="100" cy="122" r="26"/></g>';
        s += '<g fill="#6e5843" opacity=".8"><circle cx="90" cy="82" r="12"/><circle cx="116" cy="100" r="11"/><circle cx="70" cy="104" r="10"/><circle cx="108" cy="118" r="12"/></g>';
        s += '<rect x="52" y="244" width="96" height="8" fill="#7a6248"/><rect x="58" y="238" width="84" height="6" fill="#8d7458"/>';
        s += '<g fill="#5b3e2b"><rect x="66" y="214" width="4" height="24"/><rect x="86" y="214" width="4" height="24"/><rect x="110" y="214" width="4" height="24"/><rect x="130" y="214" width="4" height="24"/></g><rect x="70" y="216" width="60" height="22" fill="#a07a56" opacity=".55"/>';
        s += '<path d="M50 216 Q56 214 66 202 H134 Q144 214 150 216Z" fill="#6b4d38"/><path d="M64 202 Q72 200 80 190 H120 Q128 200 136 202Z" fill="#7d5b43"/><path d="M78 190 Q86 188 92 180 H108 Q114 188 122 190Z" fill="#8a6548"/><path d="M96 180 L100 170 L104 180Z" fill="#c9a24a"/>';
        s += '<path d="M50 216 H150" stroke="#c9a24a" stroke-width="1.4" opacity=".8"/>';
        break;
      case 'masjid':
        s += '<rect x="64" y="150" width="72" height="100" fill="#f3f1e6" opacity=".9"/><path d="M64 150 a36 36 0 0 1 72 0Z" fill="' + t.accent + '"/><rect x="98" y="100" width="4" height="12" fill="' + t.accent + '"/><path d="M104 96 a7 7 0 1 0 0 12 a5.5 5.5 0 1 1 0 -12Z" fill="' + t.accent + '"/><rect x="48" y="130" width="12" height="120" fill="#e8e4d2"/><rect x="140" y="130" width="12" height="120" fill="#e8e4d2"/><path d="M48 130 l6 -16 l6 16Z M140 130 l6 -16 l6 16Z" fill="' + t.accent + '"/><path d="M92 250 v-30 a8 8 0 0 1 16 0 v30Z" fill="' + t.bg + '"/>';
        break;
      case 'gonjong':
        s += '<path d="M50 200 Q60 150 72 130 Q70 160 90 190 Q100 150 100 120 Q100 150 110 190 Q130 160 128 130 Q140 150 150 200Z" fill="' + t.deep + '"/><rect x="58" y="200" width="84" height="50" fill="' + t.bg + '"/><rect x="64" y="212" width="72" height="6" fill="' + t.accent + '"/><rect x="64" y="226" width="72" height="6" fill="' + t.accent + '"/>';
        break;
      case 'hills':
        s += '<path d="M40 230 Q80 140 110 200 Q130 150 164 230Z" fill="#2f5a43"/><path d="M40 250 Q90 190 164 250Z" fill="#4a7a5c"/><circle cx="130" cy="110" r="14" fill="' + t.accent + '" opacity=".8"/>';
        break;
      case 'columns':
        s += '<g fill="#fff" opacity=".9"><rect x="56" y="110" width="12" height="140"/><rect x="132" y="110" width="12" height="140"/><rect x="50" y="104" width="24" height="8"/><rect x="126" y="104" width="24" height="8"/></g><path d="M100 90 v34 M88 110 l12 14 l12 -14 M92 124 h16" stroke="' + t.accent + '" stroke-width="2" fill="none"/><circle cx="100" cy="132" r="5" fill="' + t.accent + '"/>';
        break;
      case 'garden':
        s += '<path d="M56 250 V150 a44 44 0 0 1 88 0 V250" fill="none" stroke="' + t.deep + '" stroke-width="5"/><g fill="' + t.deep + '" opacity=".85"><circle cx="58" cy="170" r="9"/><circle cx="64" cy="140" r="8"/><circle cx="84" cy="116" r="9"/><circle cx="112" cy="112" r="8"/><circle cx="138" cy="138" r="9"/><circle cx="144" cy="172" r="8"/></g><g fill="#fff" opacity=".9"><circle cx="70" cy="156" r="4"/><circle cx="130" cy="152" r="4"/><circle cx="100" cy="106" r="4"/></g>';
        break;
      case 'balloons':
        s += '<g><circle cx="76" cy="150" r="22" fill="' + t.deep + '"/><circle cx="108" cy="128" r="24" fill="' + t.accent + '"/><circle cx="134" cy="160" r="20" fill="#fff"/></g><g stroke="#fff" stroke-width="1.4" fill="none"><path d="M76 172 Q90 210 104 250"/><path d="M108 152 Q108 200 104 250"/><path d="M134 180 Q120 215 104 250"/></g>';
        break;
      case 'kelir':
        var kg = 'kg' + (uid++);
        s += '<defs><radialGradient id="' + kg + '"><stop offset="0" stop-color="#ffe9b0"/><stop offset=".55" stop-color="#d99a3e" stop-opacity=".55"/><stop offset="1" stop-color="#1b130d" stop-opacity="0"/></radialGradient></defs>';
        s += '<rect width="200" height="300" fill="#24180f"/><circle cx="100" cy="160" r="96" fill="url(#' + kg + ')"/>';
        s += '<path d="' + SHAPES.gunungan + '" transform="translate(100 170) scale(.6) translate(-100 -140)" fill="#140d08"/>';
        s += '<g transform="translate(100 170) scale(.6) translate(-100 -140)" fill="none" stroke="#f6d58a" stroke-width="2" opacity=".55"><path d="M100 250 V96"/><path d="M100 200 C80 186 70 170 68 150"/><path d="M100 200 C120 186 130 170 132 150"/><path d="M100 160 C88 146 84 128 86 112"/><path d="M100 160 C112 146 116 128 114 112"/></g>';
        break;
      case 'envelope':
        s += '<rect x="64" y="112" width="72" height="60" rx="3" fill="#fffaf1"/><path d="M68 116 H132 V150 H68Z" fill="#fff" opacity=".9"/><path d="M68 124 H120 M68 132 H112" stroke="' + t.accent + '" stroke-width="1.2" opacity=".5"/>';
        s += '<rect x="52" y="140" width="96" height="70" rx="4" fill="#efe2cc"/><path d="M52 140 L100 182 L148 140" fill="#e4d3b6" stroke="#cdb894" stroke-width="1"/>';
        s += '<circle cx="100" cy="180" r="11" fill="' + t.accent + '"/><circle cx="100" cy="180" r="7" fill="none" stroke="#f3c9c9" stroke-width="1" opacity=".6"/>';
        break;
      case 'ticket':
        s += '<g transform="rotate(-8 100 160)"><rect x="56" y="96" width="88" height="128" rx="10" fill="#fff8e7"/><rect x="56" y="186" width="88" height="38" rx="10" fill="' + t.accent + '"/><path d="M60 186 H140" stroke="' + t.ink + '" stroke-width="1.4" stroke-dasharray="4 4"/><circle cx="56" cy="186" r="6" fill="' + t.sky + '"/><circle cx="144" cy="186" r="6" fill="' + t.sky + '"/>';
        s += '<path d="M100 118 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2Z" fill="' + t.deep + '"/><rect x="72" y="160" width="56" height="6" rx="3" fill="' + t.ink + '" opacity=".75"/><rect x="80" y="172" width="40" height="4" rx="2" fill="' + t.ink + '" opacity=".4"/></g>';
        s += '<g fill="' + t.deep + '"><rect x="62" y="76" width="6" height="10" rx="1" transform="rotate(20 65 81)"/><rect x="136" y="84" width="6" height="10" rx="1" fill="' + t.accent + '" transform="rotate(-30 139 89)"/><circle cx="148" cy="236" r="3.5" fill="#fff"/><circle cx="52" cy="232" r="3" fill="' + t.accent + '"/></g>';
        break;
      default:
        s += '<circle cx="100" cy="140" r="46" fill="#fff" opacity=".55"/><circle cx="100" cy="140" r="30" fill="#fff" opacity=".6"/><path d="M60 250 Q100 180 140 250Z" fill="' + t.accent + '" opacity=".5"/>';
    }
    return s;
  }

  /* ---------- Rangkaian bunga di bawah cover ---------- */
  function flowers(t) {
    var s = '<g><path d="M0 300 L0 270 Q30 250 60 280 Q100 250 140 280 Q170 250 200 270 L200 300Z" fill="' + t.deep + '" opacity=".55"/>';
    [[30, 262, 16], [56, 272, 12], [84, 268, 14], [116, 270, 13], [146, 266, 15], [172, 262, 16], [14, 240, 10], [186, 240, 10]].forEach(function (p, i) {
      var c = t.melati ? '#fffaf0' : (i % 2 ? t.deep : t.accent);
      s += '<g transform="translate(' + p[0] + ' ' + p[1] + ')">';
      if (t.melati) for (var l = 0; l < 3; l++) s += '<ellipse cx="0" cy="' + (-p[2] * 0.9) + '" rx="' + (p[2] * 0.28) + '" ry="' + (p[2] * 0.7) + '" fill="#4f6238" opacity=".9" transform="rotate(' + (l * 110 - 110) + ')"/>';
      for (var k = 0; k < 5; k++) s += '<ellipse cx="0" cy="' + (-p[2] * 0.55) + '" rx="' + (p[2] * 0.34) + '" ry="' + (p[2] * 0.6) + '" fill="' + c + '" opacity=".95" ' + (t.melati ? 'stroke="#d9cdb4" stroke-width=".5" ' : '') + 'transform="rotate(' + (k * 72) + ')"/>';
      s += '<circle r="' + (p[2] * 0.22) + '" fill="' + (t.melati ? '#e8c64a' : '#f7efe3') + '"/></g>';
    });
    return s + '</g>';
  }

  /* ---------- Ilustrasi cover lengkap ---------- */
  UK.cover = function (t, birds) {
    /* template dengan aset gambar asli: tampilkan gambarnya langsung */
    if (t.thumb) return '<img class="thumb-img" src="' + t.thumb + '" alt="" loading="lazy">';
    var id = 'c' + (uid++), d = SHAPES[t.shape];
    var pat = t.jawa
      ? '<pattern id="p' + id + '" width="28" height="28" patternUnits="userSpaceOnUse">' + kawung(t.accent, 0.9, 0.55) + '</pattern>'
      : '<pattern id="p' + id + '" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M7 1 L13 7 L7 13 L1 7Z" fill="none" stroke="' + t.accent + '" stroke-width=".8" opacity=".45"/></pattern>';
    var svg = '<svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs><clipPath id="' + id + '"><path d="' + d + '"/></clipPath>' + pat + '</defs>' +
      '<rect width="200" height="300" fill="' + t.bg + '"/><rect width="200" height="300" fill="url(#p' + id + ')"/>' +
      '<path d="' + d + '" transform="translate(100 160) scale(1.09) translate(-100 -160)" fill="' + t.bg + '" stroke="' + t.accent + '" stroke-width="1.6" opacity=".9"/>' +
      '<path d="' + d + '" transform="translate(100 160) scale(1.045) translate(-100 -160)" fill="none" stroke="' + t.accent + '" stroke-width="1.2"/>' +
      '<g clip-path="url(#' + id + ')"><rect width="200" height="300" fill="' + t.sky + '"/>' + scene(t) + '</g>' +
      '<path d="' + d + '" fill="none" stroke="' + t.accent + '" stroke-width="2"/>' + flowers(t);
    if (birds) {
      for (var i = 0; i < 10; i++) {
        var x = 70 + Math.random() * 60, y = 120 + Math.random() * 60;
        svg += '<g class="bird" style="--d:' + (Math.random() * 0.9).toFixed(2) + 's;--x:' + Math.round(Math.random() * 160 - 80) + 'px"><path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' q4 -6 8 0 q4 -6 8 0" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>';
      }
    }
    return svg + '</svg>';
  };

  /* ---------- Potret placeholder (ganti dengan foto asli) ---------- */
  UK.portrait = function (t, fem) {
    return '<svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="100" height="130" fill="' + t.sky + '"/><rect y="90" width="100" height="40" fill="' + t.accent + '" opacity=".5"/><path d="M14 130 Q18 84 50 84 Q82 84 86 130Z" fill="' + t.bg + '"/><circle cx="50" cy="58" r="22" fill="#e8c9ac"/>' +
      (fem ? '<path d="M22 70 Q20 36 50 32 Q80 36 78 70 Q86 40 50 24 Q14 40 22 70Z" fill="' + t.deep + '" opacity=".9"/>'
           : '<path d="M30 52 Q32 32 50 32 Q68 32 70 52 Q60 40 50 40 Q40 40 30 52Z" fill="#2a2018"/><rect x="34" y="26" width="32" height="9" rx="3" fill="' + t.deep + '"/>') +
      '</svg>';
  };

  UK.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  };
})(window.UK);

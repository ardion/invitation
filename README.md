# Undangan Kita: Website Katalog Undangan Digital

Situs statis (HTML, CSS, JavaScript) tanpa proses build. Cukup unggah folder ini ke hosting.

## Struktur

```
undangan-kita/
├── index.html            # Beranda: hero, tema, template unggulan, fitur, cara pesan, paket, FAQ
├── katalog.html          # Katalog + filter acara & tema (bisa ditautkan: katalog.html#adat-jawa)
├── demo.html             # Undangan interaktif: demo.html#sekar-kedhaton
├── assets/
│   ├── css/style.css       # Gaya beranda & katalog
│   ├── css/invitation.css  # Gaya halaman undangan
│   └── js/
│       ├── data.js         # KONFIGURASI: brand, nomor WA, tema, daftar template, data contoh
│       ├── ornaments.js    # Ikon & ornamen SVG (gunungan, kawung, sulur, melati, joglo, dll.)
│       ├── site.js         # Logika beranda & katalog
│       └── invitation.js   # Logika undangan: sampul, animasi, countdown, RSVP, amplop, musik
└── design-system/MASTER.md # Warna, font, spasi, aturan desain
```

## Langkah pertama

1. Buka `assets/js/data.js`.
2. Ganti `whatsapp` dengan nomor bisnismu (format `62…`) dan `brand` bila perlu.
3. Sesuaikan harga di `UK.templates` dan di bagian Paket pada `index.html`.

## Menjalankan di komputer

Buka `index.html` langsung di browser, atau jalankan server lokal:

```bash
cd undangan-kita
python3 -m http.server 8000
# buka http://localhost:8000
```

## Menambah template

Tambahkan satu objek di `UK.templates` (`data.js`):

```js
{ id: 'sekar-arum', name: 'Sekar Arum', cat: 'Adat Jawa', events: ['Pernikahan'], price: 139, theme: 'jawa', quote: 'islam' }
```

Untuk warna baru, tambahkan entri di `UK.themes` lalu pakai namanya di `theme`.

### Template signature (animasi GSAP)

Tema yang punya `layout` (`kelir`, `surat`, `tiket`) memakai tata letak, sampul, dan animasinya sendiri dari `assets/js/signature.js` + `assets/css/signature.css`:

- **Layar Kelir**: panggung wayang, gunungan diputar lalu diangkat saat dibuka
- **Surat Bersegel**: amplop dengan segel lilin, foto mempelai berbingkai perangko
- **Tiket Pesta**: tiket yang disobek, konfeti, dan balon (ulang tahun/khitanan)

GSAP dimuat dari CDN di `demo.html`. Tanpa GSAP, atau bila HP memakai setelan "kurangi gerakan", undangan tetap tampil lengkap tanpa animasi.

## Link undangan untuk tamu

- Nama tamu: `demo.html?to=Bapak+Budi#sekar-kedhaton`
- Sembunyikan bar demo (untuk undangan asli): tambahkan `&live=1`

## Hosting gratis

Netlify (drag & drop folder), Vercel, GitHub Pages, atau Cloudflare Pages.

## Yang masih contoh, perlu diganti sebelum dipakai pelanggan

- **Data acara** di `UK.sample`. Untuk produksi, tiap pelanggan butuh datanya sendiri, misalnya satu file JSON per undangan atau database.
- **RSVP & ucapan** hanya tersimpan di halaman. Sambungkan ke backend (misalnya Google Sheets via Apps Script, Supabase, atau Firebase) supaya tersimpan.
- **Musik** masih berupa nada buatan WebAudio. Ganti dengan file musik berlisensi.
- **Potret & galeri** masih placeholder SVG. Ganti dengan foto asli.
- **Harga & paket** masih contoh.

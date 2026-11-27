# Undangan Kita: Design System (Master)

Sumber acuan untuk semua halaman situs. Disusun dengan skill ui-ux-pro-max.

## Arah visual
- **Pola halaman:** Hero, lalu tema, template unggulan, fitur, cara pesan, paket, FAQ, dan CTA. CTA utama ada di header dan setelah bagian paket.
- **Gaya:** Soft UI Evolution. Bayangan lembut, sudut membulat (16–24px), kontras teks terukur, dan fokus terlihat.
- **Nuansa:** hangat dan berbudaya Jawa. Ini kustom: palet dari database (pink romantis) tidak cocok dengan brief, jadi aksen emas `#A16207` diambil dari profil *E-commerce Luxury*, dan warna sogan serta krem ditambahkan manual.

## Warna (semantik)
| Token | Nilai | Pemakaian |
|---|---|---|
| `--color-background` | `#FBF7F0` krem | latar halaman |
| `--color-foreground` | `#2E1F16` sogan gelap | teks utama |
| `--color-muted` | `#F4ECE0` | latar bagian selang-seling, chip |
| `--color-muted-foreground` | `#6B5646` | teks sekunder (≥ 4.5:1 di atas krem) |
| `--color-card` | `#FFFDF9` | kartu |
| `--color-border` | `#E5D8C3` | garis |
| `--color-primary` | `#8B5E43` sogan | tombol utama (teks putih ≥ 4.5:1) |
| `--color-accent` | `#A16207` emas | eyebrow, badge, CTA kedua |
| `--color-ring` | `#A16207` | outline fokus |

Warna template undangan diatur per tema di `assets/js/data.js` (`UK.themes`).

## Tipografi
- **Judul:** Cormorant Infant 600/700
- **Aksen script:** Great Vibes (satu kata per judul, jangan untuk kalimat panjang)
- **Body/UI:** DM Sans 400–700, dasar 16px, line-height 1.6
- Pemasangan font dari database: *Great Vibes / Cormorant Infant* (wedding, invitation, elegant). DM Sans ditambahkan supaya teks UI dan form mudah dibaca.

## Spasi & bentuk
- Skala spasi: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 (density rendah, cocok untuk halaman marketing)
- Radius: 10 / 16 / 24 / pill
- Target sentuh minimal 44×44px; tombol utama 48px

## Gerak
- Muncul saat discroll: opacity + translateY 18px, 700ms, dengan stagger 70ms
- Hover 200–300ms; kartu naik 4px
- Semua animasi mematuhi `prefers-reduced-motion`

## Aturan
- Ikon hanya SVG garis (`UK.icon`), tidak memakai emoji
- Chip filter memakai `<button aria-pressed>`; di mobile chip bisa digeser horizontal
- Form selalu punya label terlihat, dan pesan error muncul di dekat field
- Ornamen (gunungan, kawung, sulur, melati) adalah SVG buatan sendiri dan ada di `assets/js/ornaments.js`

## Checklist sebelum rilis
- [ ] Ganti nomor WhatsApp & brand di `assets/js/data.js`
- [ ] Kontras teks ≥ 4.5:1
- [ ] Fokus keyboard terlihat
- [ ] Uji lebar 375 / 768 / 1024 / 1440px
- [ ] Ganti potret dan galeri placeholder dengan foto asli di undangan pelanggan

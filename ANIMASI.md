# Panduan animasi hiasan

Cara membuat hiasan yang hidup (burung, kupu-kupu, kelopak, bunga) di template Undangan Kita. Pelengkap aturan 1 dan 2 di `CLAUDE.md`.

## Prinsip

- **Bukan GIF atau video.** Semua gerak dijalankan di browser dengan GSAP (dan CSS bila cukup), memakai gambar lukisan atau ukiran lama.
  - GIF berat, warnanya hanya 256, tepinya bergerigi, dan geraknya selalu sama.
  - Dengan kode cukup satu gambar kecil. Jalur bisa diacak, dan gerak bisa mengikuti guliran atau sentuhan.
- **Gerak sungguhan, bukan gambar utuh yang digeser.** Pecah aset per bagian, lalu gerakkan tiap bagian dari titik sendinya.
- **Tiap template punya makhluk dan gerak sendiri.** Jangan mengulang hiasan yang sama di semua template. Contoh: kupu-kupu di Kayon Wana, capung di Garden Party, bangau di Lukis Delima.
- **Gerak hiasan tenang dan pelan.** Hiasan menghidupkan latar, bukan merebut perhatian dari nama dan isi undangan.
- **Hormati `prefers-reduced-motion`.** Tanpa gerak, hiasan diam di posisi yang tetap rapi.

## Teknik per jenis hiasan

### Kupu-kupu (paling meyakinkan)

- **Potong** gambar kupu-kupu tampak atas menjadi tiga lapis: sayap kiri, sayap kanan, dan badan. Masing-masing berupa PNG transparan dengan tepi dipudarkan.
- **Kepak:** tiap sayap diputar `rotationY` dari garis badan. Sayap kiri dari tepi kanannya, sayap kanan dari tepi kirinya. Pembungkus memakai `perspective`.
  - Saat terbang: kepak cepat sekitar 0,12–0,18 detik.
  - Saat hinggap: kepak lambat dan jarang.
- **Terbang:** jalur acak di dalam bagiannya, dengan naik-turun kecil. Kupu-kupu menghadap arah terbang, sesekali hinggap di bunga lalu terbang lagi.

### Burung (paling terbatas)

- **Dari satu gambar diam:** potong sayap dan badan. Sayap ditekan naik-turun (`scaleY` dan sedikit `skewX`) dari pangkal sayap, sementara badan ikut naik-turun sedikit. Hasilnya cukup bagus dari jauh dan dalam ukuran kecil.
- **Kepak alami butuh 2–4 pose sayap** (atas, tengah, bawah) dari burung yang sama, yang diganti-ganti cepat seperti bingkai film. Cari ukiran atau lukisan yang punya beberapa pose dari satu burung. Jangan dibuat dari foto.
- **Terbang:** melintas pelan, dengan jalur sedikit melengkung, lalu menghilang di luar layar dan kembali setelah jeda. Sesekali meluncur tanpa mengepak.

### Kelopak berguguran (sangat meyakinkan)

- Kelopak boleh berupa bentuk CSS kecil (gradasi radial) atau potongan kelopak dari lukisan.
- **Gerak:** jatuh pelan dengan arah dan kecepatan acak, bergoyang ke kiri-kanan, dan membalik dalam 3D (`rotationX` dan `rotationY` di dalam `perspective`).
- Tiap kelopak dimulai pada waktu berbeda (`delay` negatif acak), supaya tidak jatuh serentak.
- Muncul dan menghilang dengan pudar di awal dan akhir jatuhnya.

### Bunga dan daun bergoyang

- **Bunga utuh:** putar dari pangkal yang menempel di tepi layar (`transformOrigin` di pangkal), dengan sudut kecil 2–3°.
- **Lebih hidup:** pisahkan batang dan kepala bunga. Batang bergoyang dari pangkal, kepala mengangguk sedikit di ujung batang dengan waktu yang sedikit tertinggal.
- Bunga di sudut berbeda diberi durasi berbeda, supaya tidak bergerak serempak.

### Serangga kecil (capung, kunang-kunang)

- **Capung:** melayang bergetar di tempat, berbalik ke arah tujuan, lalu melesat cepat. Gambar berlatar putih memakai `mix-blend-mode: multiply` pada pembungkusnya.
- **Kunang-kunang:** titik cahaya yang berkeliaran acak dan berkedip pelan, hanya di bagian berlatar gelap.

### Cahaya dan latar

- Bokeh atau debu cahaya yang melayang naik pelan.
- Sapuan cahaya hangat yang sesekali melintas di atas gambar.
- Motif latar (misalnya kain toile) bergeser pelan mengikuti guliran.

## Pola teknis

- **Satu properti, satu tween.** Gerak terbang di pembungkus, kepak sayap di lapisan sayap, dan goyang di gambar dalamnya. Dua tween pada properti yang sama di satu elemen akan saling timpa dan membuat gambar macet di posisi miring.
- Pakai `repeat: -1` dan `repeatRefresh: true` untuk gerak acak yang terus berganti.
- Animasikan `transform` dan `opacity` saja, jangan `top`, `left`, `width`, atau `height`.
- Semua gerak dibuat di dalam `UK.sg.run(...)`, supaya dibersihkan saat ganti template.
- Wadah hiasan diberi `pointer-events: none` dan diletakkan di bawah teks dan tombol (aturan 8).
- Sebelum diserahkan, amati geraknya dari dekat di ukuran HP. Pastikan kepak, jalur, dan putarannya terlihat wajar, bukan hanya "bergerak".

## Contoh singkat: kepak kupu-kupu

```js
// HTML: .bf > .wing.l + .wing.r + .body  (pembungkus .bf punya perspective)
gsap.set('.bf .wing.l', { transformOrigin: '100% 50%' });
gsap.set('.bf .wing.r', { transformOrigin: '0% 50%' });
gsap.to('.bf .wing.l', { rotationY: 70, duration: 0.15, ease: 'sine.inOut', yoyo: true, repeat: -1 });
gsap.to('.bf .wing.r', { rotationY: -70, duration: 0.15, ease: 'sine.inOut', yoyo: true, repeat: -1 });
// jalur terbang di pembungkus, terpisah dari kepak
gsap.to('.bf', { x: 'random(0, 300)', y: 'random(0, 400)', duration: 'random(3, 6)', ease: 'sine.inOut', repeat: -1, repeatRefresh: true });
```

# Aturan desain template Undangan Kita

Berlaku untuk setiap template baru dan setiap perombakan template lama.

## Aturan utama

1. **Tidak ada gambar terpotong kaku.** Setiap potongan aset (bunga, ornamen, hewan) harus berakhir dengan tepi yang memudar halus (mask gradasi atau alpha yang dipudarkan). Batang, sisi, atau kotak kertas yang terpotong lurus tidak boleh terlihat.
2. **Harus ada animasi dan gerak.**
   - Satu momen pembuka yang berkesan, misalnya gerbang terbuka atau lampu menyala.
   - Hiasan yang bergerak terus di setiap bagian, misalnya bangau, capung, kelopak jatuh, atau bunga bergoyang.
   - Gerak harus sungguhan, bukan gambar utuh yang digeser: pecah aset per bagian (sayap dan badan, batang dan kepala bunga) lalu gerakkan dari titik sendinya.
   - Hormati `prefers-reduced-motion`: halaman tetap lengkap dan terbaca tanpa gerak.
   - Teknik per jenis hiasan (kupu-kupu, burung, kelopak, bunga, serangga) ada di `ANIMASI.md`. Baca sebelum membuat hiasan bergerak.
3. **Jangan pakai foto asli dalam desain.** Hiasan, latar, dan ornamen hanya dari lukisan, ukiran, atau ilustrasi lama. Foto hanya untuk foto pasangan pelanggan. Demo memakai foto contoh dari folder `fotoprewed` milik pengguna.
4. **Tidak boleh monoton.**
   - Tiap template punya identitas sendiri: palet, huruf, tata letak, dan momen pembuka yang berbeda dari template lain.
   - Di dalam satu template, bagian-bagiannya tidak boleh berulang dengan pola yang sama (judul + teks + kartu). Variasikan tata letak, dan selang-seling latar gelap dan terang.
   - Jangan menempel satu motif ornamen yang sama di mana-mana, misalnya kawung di semua latar.

## Aturan tambahan

5. **Aset hanya domain publik atau CC0.** Catat sumber dan lisensinya di `assets/img/CREDITS.md`. Jangan menggambar ilustrasi dengan kode. Jangan menyalin desain atau aset pesaing: contoh boleh ditiru alurnya, bukan gambarnya.
   - Pengecualian: ilustrasi buatan pengguna sendiri (misalnya dari proyek Google Stitch milik pengguna) boleh dipakai. Catat asalnya di `CREDITS.md`. Aturan 3 dan 6 tetap berlaku: gambar yang tampak seperti foto asli tidak dipakai.
6. **Isi aset harus bersih.** Tidak boleh ada bendera, logo, teks, tanda tangan, atau cap yang ikut terlihat.
7. **Bagian wajib.** Setiap template punya bagian "Kisah Kami" dan "Momen Kami" dengan judul persis seperti itu (`UK.sg.TITLES`).
8. **Hiasan tidak boleh menutupi isi.** Tombol, nama, dan teks penting selalu di atas hiasan dan bisa diketuk. Kontras teks minimal 4.5:1. Target ketuk minimal 44 px. Foto dan hiasan tidak boleh bersentuhan atau saling menumpang: beri jarak minimal 12 px, termasuk saat hiasan bergerak.
9. **Ringan dimuat.** Gambar dikompres (latar JPG, potongan transparan PNG), dimuat malas di luar layar pertama. Usahakan total aset satu template di bawah sekitar 3 MB.
10. **Uji di HP.** Cek di ukuran 375x812, dari sampul sampai penutup, tanpa galat di konsol, sebelum diserahkan.

## Cara kerja

- Kerjakan 1–2 template sekaligus, lalu minta review pengguna sebelum lanjut ke template berikutnya.
- Sebelum mengunduh aset, minta izin dengan menyebut nama berkas, sumber, dan perkiraan ukuran.
- Bila memakai skill desain (misalnya ui-ux-pro-max), saringlah hasilnya. Saran warna atau huruf yang generik tidak dipakai bila bertentangan dengan aturan di atas.

## Catatan teknis

- Layout ada di `assets/js/layouts/<nama>.js` dan `assets/css/layouts/<nama>.css`, lalu didaftarkan di `assets/js/data.js` (tema dan `UK.templates`).
- Beri awalan kelas yang unik per layout (misalnya `gp-`, `dl-`). Kelas umum seperti `.cover` bertabrakan dengan `invitation.css`.
- `signature.css` punya `.sg section, .sg footer { padding: 72px 26px }`. Selektor satu kelas seperti `.pp-sec` kalah, jadi tulis padding bagian sebagai `.pp .pp-sec`.
- Jangan menganimasikan properti yang sama pada satu elemen dengan dua tween sekaligus. Pisahkan ke elemen pembungkus.
- Jangan pakai CSS `transition` atau `transform` pada elemen yang digerakkan GSAP.
- Naikkan `UK.version` dan `?v=` setiap kali JS atau CSS berubah.

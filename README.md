# StreamKuy 🎬

Sebuah aplikasi web streaming sederhana namun elegan yang dibangun menggunakan **Node.js**, **Express**, dan **EJS**. Aplikasi ini mengambil data film dan anime secara real-time dari **TMDB API** dan menyediakan layanan streaming melalui embed player pihak ketiga.

## Fitur
*   🔥 **Trending Movies**: Menampilkan film paling populer minggu ini.
*   ⛩️ **Anime Support**: Bagian khusus untuk anime populer.
*   🔍 **Pencarian**: Cari film atau serial TV apa saja.
*   📱 **Responsive Design**: Tampilan 'Dark Mode' premium yang cocok di HP dan Desktop.
*   🇮🇩 **Subtitle Indonesia**: Menggunakan player yang mendukung multi-subtitle.

## Persyaratan
Sebelum memulai, pastikan Anda sudah menginstal:
*   [Node.js](https://nodejs.org/) (Versi 14 ke atas disarankan)

## Cara Pemasangan (Instalasi)

1.  **Clone Repository ini** (atau download zip-nya):
    ```bash
    git clone https://github.com/rizkiadp/StreamKuy-Api-From-TDMB.git
    cd StreamKuy-Api-From-TDMB
    ```

2.  **Install Dependencies**:
    Jalankan perintah ini di terminal untuk mengunduh paket yang dibutuhkan (Express, Axios, EJS, dll):
    ```bash
    npm install
    ```

3.  **Konfigurasi API Key**:
    *   Buat file baru bernama `.env` di folder root (sejajar dengan `server.js`).
    *   Salin isi dari `.env.example` (jika ada) atau isi manual seperti ini:
    ```env
    TMDB_API_KEY=v3_api_key_anda_disini
    PORT=3000
    ```
    *   *Catatan*: Dapatkan API Key gratis dengan mendaftar di [TheMovieDB.org](https://www.themoviedb.org/settings/api).

4.  **Jalankan Aplikasi**:
    ```bash
    npm start
    ```

5.  **Buka di Browser**:
    Akses alamat ini di browser Anda: `http://localhost:3000`

## Struktur Folder
*   `server.js`: Kode utama backend (Routing & API Fetching).
*   `views/`: Berisi file tampilan HTML (Template EJS).
*   `public/`: File statis seperti CSS dan Gambar.

## Kredit
*   Data Film & Gambar oleh [TMDB](https://www.themoviedb.org/).
*   Video Player oleh pihak ketiga (Embed sources).
*   Dibuat untuk tujuan edukasi.

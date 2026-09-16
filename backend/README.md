# Backend Setup & Google Sheets Leaderboard Guide

Turnamen **Web Trivia Marathon (Google One AI Pro 5TB Giveaway)** menggunakan Google Sheets sebagai basis data real-time dan Google Apps Script (GAS) sebagai REST POST endpoint backend.

---

## 1. Persiapan Google Spreadsheet

1. Buka [Google Sheets](https://sheets.new) dan beri nama spreadsheet: **`Trivia Marathon - Google One AI Pro`**.
2. Ubah nama sheet pertama menjadi **`Sheet1`**.
3. Di **`Sheet1`**, isi baris 1 (Header) dengan kolom berikut:

| Kolom A | Kolom B | Kolom C | Kolom D | Kolom E | Kolom F | Kolom G |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Timestamp` | `Telegram Username` | `Sesi Ke` | `Skor Sesi` | `Jumlah Benar` | `Total Durasi (Detik)` | `User Agent / Browser Info` |

---

## 2. Setup Rumus Leaderboard Otomatis (Sheet2)

1. Tambahkan sheet baru dan beri nama **`Sheet2`** (atau **`Leaderboard`**).
2. Buat header di baris 1:
   - **A1**: `Telegram Username`
   - **B1**: `Total Skor Akumulasi`
   - **C1**: `Jumlah Sesi Selesai`
   - **D1**: `Total Durasi (Detik)`
   - **E1**: `Status Sah (5 Sesi)`
3. Di sel **A2**, masukkan rumus untuk mengekstrak daftar unik peserta secara otomatis:
   ```excel
   =UNIQUE(FILTER(Sheet1!B2:B, Sheet1!B2:B <> ""))
   ```
4. Di sel **B2**, masukkan rumus total skor akumulasi (lalu drag ke bawah):
   ```excel
   =SUMIFS(Sheet1!D:D, Sheet1!B:B, A2)
   ```
5. Di sel **C2**, masukkan rumus penghitung sesi yang dikerjakan:
   ```excel
   =COUNTIF(Sheet1!B:B, A2)
   ```
6. Di sel **D2**, masukkan rumus total durasi (sebagai tie-breaker jika skor sama):
   ```excel
   =SUMIFS(Sheet1!F:F, Sheet1!B:B, A2)
   ```
7. Di sel **E2**, masukkan rumus verifikasi keabsahan syarat 5 sesi:
   ```excel
   =IF(C2 >= 5, "SAH (5/5)", "Belum Lengkap (" & C2 & "/5)")
   ```

---

## 3. Deploy Google Apps Script Web App

1. Di Google Sheets, klik menu **Extensions (Ekstensi)** > **Apps Script**.
2. Hapus kode default di file `Code.gs`, lalu salin seluruh isi file [`backend/Code.gs`](Code.gs).
3. Klik tombol **Save** (ikon disket).
4. Klik tombol biru **Deploy** di pojok kanan atas > pilih **New deployment**.
5. Klik ikon gerigi ⚙️ di sebelah "Select type" > pilih **Web app**.
6. Isi konfigurasi deployment:
   - **Description**: `Trivia Marathon v1.0`
   - **Execute as**: `Me (email kamu)`
   - **Who has access**: **`Anyone`** *(Sangat penting agar peserta bisa mengirim data tanpa login Google)*
7. Klik **Deploy**.
8. Berikan izin otorisasi (*Authorize Access*) jika diminta.
9. Salin URL Web App yang muncul (format: `https://script.google.com/macros/s/.../exec`).

---

## 4. Hubungkan Web App ke Frontend

Buka file [`js/config.js`](../js/config.js) dan tempelkan URL Web App ke variabel `GAS_ENDPOINT_URL`:

```javascript
// js/config.js
const CONFIG = {
  // ...
  GAS_ENDPOINT_URL: "https://script.google.com/macros/s/AKfycb.../exec",
  // ...
};
```

Jika `GAS_ENDPOINT_URL` dikosongkan, aplikasi secara otomatis berjalan dalam **Mode Demo/Lokal**, menyimpan log data di browser pengguna tanpa mengalami error.

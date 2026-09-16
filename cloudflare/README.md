# Panduan Deploy Cloudflare Pages + Cloudflare D1 Database

Aplikasi **Web Trivia Marathon** ini dirancang secara native untuk berjalan di infrastruktur serverless **Cloudflare Pages + Cloudflare D1 (Edge SQLite)**.

---

## 1. Persiapan Cloudflare CLI (Wrangler)

Pastikan kamu sudah login ke akun Cloudflare di terminal:
```bash
npx wrangler login
```

---

## 2. Membuat Database Cloudflare D1

Jalankan perintah berikut untuk membuat database D1:
```bash
npx wrangler d1 create trivia-db
```

Output terminal akan memberikan blok konfigurasi seperti ini:
```toml
[[d1_databases]]
binding = "DB"
database_name = "trivia-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

Salin `database_id` tersebut ke dalam file [`wrangler.toml`](../wrangler.toml).

---

## 3. Menjalankan Skema Database (Inisialisasi Tabel)

Eksekusi file skema SQL ke Cloudflare D1 remote:
```bash
npx wrangler d1 execute trivia-db --remote --file=./db/schema.sql
```

*(Untuk testing lokal dengan wrangler: ganti `--remote` dengan `--local`).*

---

## 4. Deploy ke Cloudflare Pages

### Opsi A: Deploy Langsung via Wrangler CLI
```bash
npx wrangler pages deploy . --project-name=trivia-marathon
```

Setelah project terbuat di Pages, sambungkan database D1 ke project Pages kamu:
1. Buka dashboard [Cloudflare Dashboard](https://dash.cloudflare.com) > **Workers & Pages**.
2. Pilih project **trivia-marathon** > **Settings** > **Functions**.
3. Di bagian **D1 database bindings**, klik **Add binding**:
   - Variable name: **`DB`**
   - D1 database: Pilih **`trivia-db`**
4. Di bagian **Environment variables**, tambahkan:
   - Variable name: **`ADMIN_SECRET_KEY`**
   - Value: `marathon2026` (atau password admin rahasia pilihanmu)
5. Klik **Save**.

### Opsi B: Deploy Otomatis via GitHub / GitLab
1. Push repository ini ke GitHub.
2. Di Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Pilih repository ini.
4. Build settings:
   - Framework preset: **None**
   - Build output directory: **`.`** (root)
5. Tambahkan D1 binding `DB` dan environment variable `ADMIN_SECRET_KEY` seperti pada langkah di atas.

---

## 5. Akses Aplikasi

1. **Halaman Peserta**: `https://<project-kamu>.pages.dev/`
   - Bersih tanpa tombol demo mode.
   - Sesi kuis otomatis terkunci sampai kamu membukanya dari admin.
2. **Command Center Admin**: `https://<project-kamu>.pages.dev/admin.html`
   - Masukkan PIN: `marathon2026` (atau sesuai `ADMIN_SECRET_KEY`).
   - Buka/kunci sesi 1–5 secara live dengan 1 klik tombol.
   - Pantau *Live Leaderboard* akumulasi real-time & ekspor ke CSV.

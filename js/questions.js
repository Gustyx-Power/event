/**
 * 150 Curated Bilingual Questions (5 Sessions x 30 Questions)
 * Composition per session: Exactly 10 Easy, 10 Medium, 10 Hard.
 * Themes:
 * - Session 1: Cloud Storage & Google Ecosystem
 * - Session 2: Artificial Intelligence & Gemini Evolution
 * - Session 3: Computing Foundations, Architecture & Hardware
 * - Session 4: Internet Protocols, Web & Cybersecurity
 * - Session 5: Grand Finale & Future Tech
 */

const questionsBank = {
  id: {
    // =========================================================================
    // SESI 1: CLOUD & EKOSISTEM GOOGLE
    // =========================================================================
    session1: [
      // 10 EASY
      {
        id: 1,
        difficulty: "easy",
        question: "Berapa kapasitas total cloud storage Google One yang menjadi hadiah utama giveaway ini?",
        options: ["1 TB", "2 TB", "5 TB", "10 TB"],
        correctIndex: 2
      },
      {
        id: 2,
        difficulty: "easy",
        question: "Berapa kuota penyimpanan gratis default yang diberikan pada akun Google standar?",
        options: ["5 GB", "15 GB", "25 GB", "50 GB"],
        correctIndex: 1
      },
      {
        id: 3,
        difficulty: "easy",
        question: "Layanan manakah berikut yang berkontribusi memakan kuota penyimpanan Google One?",
        options: ["Google Drive, Gmail, & Google Photos", "Google Search & YouTube Watch History", "Google Maps & Google Chrome Bookmarks", "Google Play Store downloads"],
        correctIndex: 0
      },
      {
        id: 4,
        difficulty: "easy",
        question: "Apa nama fitur langganan Google One yang memungkinkan pembagian penyimpanan dengan keluarga?",
        options: ["Family Sharing (Grup Keluarga)", "Google Peer Share", "Multi-User Drive Link", "Storage Broadcast"],
        correctIndex: 0
      },
      {
        id: 5,
        difficulty: "easy",
        question: "Berapa jumlah maksimal anggota keluarga (termasuk pengelola) dalam Google Family Sharing?",
        options: ["3 orang", "4 orang", "6 orang", "10 orang"],
        correctIndex: 2
      },
      {
        id: 6,
        difficulty: "easy",
        question: "Aplikasi pengolah kata berbasis web milik ekosistem Google adalah...",
        options: ["Google Sheets", "Google Slides", "Google Docs", "Google Keep"],
        correctIndex: 2
      },
      {
        id: 7,
        difficulty: "easy",
        question: "Fitur pencarian foto di Google Photos menggunakan teknologi canggih apa untuk mengenali wajah & objek?",
        options: ["Computer Vision & AI", "QR Code Scanner", "Metadata Exif saja", "Barcoding system"],
        correctIndex: 0
      },
      {
        id: 8,
        difficulty: "easy",
        question: "Apa nama layanan video conference resmi milik Google untuk pertemuan daring?",
        options: ["Google Duo", "Google Meet", "Google Hangouts Chat", "Google Talk"],
        correctIndex: 1
      },
      {
        id: 9,
        difficulty: "easy",
        question: "Apa kepanjangan dari satuan TB dalam kapasitas penyimpanan data komputer?",
        options: ["TeraByte", "TotalByte", "TrueByte", "TensByte"],
        correctIndex: 0
      },
      {
        id: 10,
        difficulty: "easy",
        question: "Sistem operasi smartphone yang dikembangkan oleh Google adalah...",
        options: ["iOS", "Android", "Symbian", "Tizen"],
        correctIndex: 1
      },

      // 10 MEDIUM
      {
        id: 11,
        difficulty: "medium",
        question: "Dalam paket Google One AI Premium, model AI tingkat lanjut apa yang disertakan ke dalam Gemini?",
        options: ["Gemini Nano", "Gemini Advanced", "Gemini Flash Basic", "Bard Lite"],
        correctIndex: 1
      },
      {
        id: 12,
        difficulty: "medium",
        question: "Berapa gigabyte (GB) nilai konversi desimal standar untuk 5 Terabyte (TB)?",
        options: ["500 GB", "1.000 GB", "5.000 GB", "50.000 GB"],
        correctIndex: 2
      },
      {
        id: 13,
        difficulty: "medium",
        question: "Di Google Photos, fitur AI apa yang memungkinkan pengguna menghapus objek tak diinginkan pada gambar secara instan?",
        options: ["Magic Eraser", "Photo Blender", "Clone Stamp 3D", "Pixel Clipper"],
        correctIndex: 0
      },
      {
        id: 14,
        difficulty: "medium",
        question: "Berapa lama item yang dihapus akan bertahan di 'Trash' (Sampah) Google Drive sebelum dihapus permanen otomatis?",
        options: ["7 hari", "14 hari", "30 hari", "60 hari"],
        correctIndex: 2
      },
      {
        id: 15,
        difficulty: "medium",
        question: "Apa nama fitur sinkronisasi desktop resmi untuk menyelaraskan file lokal komputer dengan Google Drive?",
        options: ["Google Drive for Desktop", "Backup & Sync Classic", "GSuite Linker", "Cloud Connector CLI"],
        correctIndex: 0
      },
      {
        id: 16,
        difficulty: "medium",
        question: "Fitur 'Magic Editor' di Google Photos pertama kali diperkenalkan secara eksklusif pada perangkat apa?",
        options: ["Google Pixel 8 Series", "Samsung Galaxy S20", "Google Nexus 6P", "Chromebook Pro"],
        correctIndex: 0
      },
      {
        id: 17,
        difficulty: "medium",
        question: "Batas ukuran file maksimal yang dapat diunggah ke Google Drive adalah...",
        options: ["1 TB", "2 TB", "5 TB", "10 TB"],
        correctIndex: 2
      },
      {
        id: 18,
        difficulty: "medium",
        question: "Apa nama teknologi sistem file terdistribusi proprietary milik Google yang mendasari komputasi skala masifnya?",
        options: ["Colossus (evolusi dari GFS)", "HDFS", "Ceph FS", "ZFS Redundant"],
        correctIndex: 0
      },
      {
        id: 19,
        difficulty: "medium",
        question: "Format kompresi gambar modern yang dipelopori oleh Google untuk efisiensi web adalah...",
        options: ["WebP", "GIF89a", "TIFF LZW", "BMP HighRes"],
        correctIndex: 0
      },
      {
        id: 20,
        difficulty: "medium",
        question: "Bila anggota grup Google One mengunggah file, siapakah pemilik kuota yang terpotong secara default?",
        options: ["Pemilik grup secara merata", "Anggota pengunggah file itu sendiri (dari kuota bersama)", "Semua anggota dipotong proporsional", "Penyimpanan server tidak terhitung"],
        correctIndex: 1
      },

      // 10 HARD
      {
        id: 21,
        difficulty: "hard",
        question: "Google Spanner mengandalkan hardware jam khusus apa untuk sinkronisasi waktu global dan konsistensi data absolut?",
        options: ["Atomic Clocks & GPS Receivers (TrueTime API)", "NTP Tier-1 Pool internet", "Rubidium Crystal RTC standar", "Local CPU tick counter clock"],
        correctIndex: 0
      },
      {
        id: 22,
        difficulty: "hard",
        question: "Dalam infrastruktur data center Google, apa nama arsitektur jaringan switching berbasis software (SDN) internal mereka?",
        options: ["Jupiter", "B4", "Andromeda", "Titan"],
        correctIndex: 0
      },
      {
        id: 23,
        difficulty: "hard",
        question: "Fitur keamanan perangkat Google Cloud dan hardware server fisik dienkripsi di level silikon menggunakan chip keamanan apa?",
        options: ["Titan Security Chip", "TPM 1.2 Generic", "SecuStore Enclave", "Knox Hardware Vault"],
        correctIndex: 0
      },
      {
        id: 24,
        difficulty: "hard",
        question: "Dalam Google Sheets, berapa batas maksimal jumlah sel (cells) per spreadsheet saat ini?",
        options: ["2 juta sel", "5 juta sel", "10 juta sel", "20 juta sel"],
        correctIndex: 2
      },
      {
        id: 25,
        difficulty: "hard",
        question: "Borg merupakan sistem orkestrasasi klaster internal Google yang menjadi inspirasi lahirnya open-source platform...",
        options: ["Kubernetes", "Docker Swarm", "Apache Mesos", "OpenStack"],
        correctIndex: 0
      },
      {
        id: 26,
        difficulty: "hard",
        question: "Protokol serialisasi data terstruktur biner berkecepatan tinggi yang diciptakan oleh Google adalah...",
        options: ["Protocol Buffers (Protobuf)", "MessagePack XML", "BSON Flat", "JSON-LD"],
        correctIndex: 0
      },
      {
        id: 27,
        difficulty: "hard",
        question: "Tingkat ketersediaan (durability) standar untuk Google Cloud Storage standard class dirancang sebesar...",
        options: ["99.9%", "99.999999999% (11 nines)", "99.99%", "99.999%"],
        correctIndex: 1
      },
      {
        id: 28,
        difficulty: "hard",
        question: "Mesin JavaScript performa tinggi yang dikembangkan Google untuk Google Chrome dan Node.js bernama...",
        options: ["SpiderMonkey", "V8 Engine", "JavaScriptCore", "ChakraCore"],
        correctIndex: 1
      },
      {
        id: 29,
        difficulty: "hard",
        question: "Apa nama mekanisme konsensus terdistribusi yang awalnya mendasari Chubby Lock Service di arsitektur Google?",
        options: ["Paxos Algorithm", "Raft Protocol", "Byzantine Fault PoW", "Gossip Protocol"],
        correctIndex: 0
      },
      {
        id: 30,
        difficulty: "hard",
        question: "Pada paket 5 TB Google One, berapa persentase diskon 'Google Store Cash Back' untuk pembelian perangkat keras (di negara yang mendukung)?",
        options: ["5%", "10%", "15%", "20%"],
        correctIndex: 1
      }
    ],

    // =========================================================================
    // SESI 2: ARTIFICIAL INTELLIGENCE & GEMINI EVOLUTION
    // =========================================================================
    session2: [
      // 10 EASY
      {
        id: 1,
        difficulty: "easy",
        question: "Apa nama keluarga model AI generatif multimodal terbaru yang dikembangkan oleh Google DeepMind?",
        options: ["Gemini", "Bard", "LaMDA", "PaLM"],
        correctIndex: 0
      },
      {
        id: 2,
        difficulty: "easy",
        question: "Apa kepanjangan dari singkatan LLM dalam dunia kecerdasan buatan?",
        options: ["Large Language Model", "Linear Logic Machine", "Local Learning Matrix", "Low Latency Module"],
        correctIndex: 0
      },
      {
        id: 3,
        difficulty: "easy",
        question: "Apa arti istilah 'Multimodal' pada model kecerdasan buatan seperti Gemini?",
        options: ["Bisa memproses berbagai format: teks, gambar, audio, dan video", "Hanya bisa berbicara dalam berbagai bahasa daerah", "Hanya bisa berjalan di multi-core processor", "Dapat membuat beberapa akun pengguna sekaligus"],
        correctIndex: 0
      },
      {
        id: 4,
        difficulty: "easy",
        question: "Instruksi atau teks pertanyaan yang diberikan pengguna ke sistem AI disebut...",
        options: ["Prompt", "Token", "Epoch", "Hyperlink"],
        correctIndex: 0
      },
      {
        id: 5,
        difficulty: "easy",
        question: "Lab riset AI milik Google yang menciptakan AlphaFold dan AlphaGo bernama...",
        options: ["Google DeepMind", "OpenAI", "Meta FAIR", "Anthropic Lab"],
        correctIndex: 0
      },
      {
        id: 6,
        difficulty: "easy",
        question: "Varian Gemini terkecil yang dirancang khusus untuk berjalan langsung secara on-device di smartphone adalah...",
        options: ["Gemini Nano", "Gemini Flash", "Gemini Pro", "Gemini Ultra"],
        correctIndex: 0
      },
      {
        id: 7,
        difficulty: "easy",
        question: "Fenomena ketika AI menghasilkan informasi palsu namun menyampaikannya dengan sangat percaya diri disebut...",
        options: ["Halusinasi (Hallucination)", "Overclocking", "Memory Leak", "Bit Rot"],
        correctIndex: 0
      },
      {
        id: 8,
        difficulty: "easy",
        question: "Apa nama chatbot AI generasi awal milik Google yang dirilis pada awal 2023 sebelum rebranding ke Gemini?",
        options: ["Bard", "Allo", "Google Now", "Cortana"],
        correctIndex: 0
      },
      {
        id: 9,
        difficulty: "easy",
        question: "Format unit terkecil pemrosesan teks (kata, suku kata, atau karakter) dalam model bahasa dinamakan...",
        options: ["Token", "Pixel", "Voxel", "Bytecode"],
        correctIndex: 0
      },
      {
        id: 10,
        difficulty: "easy",
        question: "Proses melatih model AI menggunakan kumpulan data masif disebut...",
        options: ["Model Training", "Prompt Engineering", "Model Quantization", "API Routing"],
        correctIndex: 0
      },

      // 10 MEDIUM
      {
        id: 11,
        difficulty: "medium",
        question: "Paper riset legendaris Google (2017) yang memperkenalkan arsitektur 'Transformer' berjudul...",
        options: ["Attention Is All You Need", "Deep Residual Learning", "Generative Adversarial Nets", "Mastering the Game of Go"],
        correctIndex: 0
      },
      {
        id: 12,
        difficulty: "medium",
        question: "Berapa kapasitas context window terobosan yang mampu dicapai oleh model Gemini 1.5 Pro?",
        options: ["32.000 tokens", "128.000 tokens", "1.000.000 hingga 2.000.000+ tokens", "50.000 tokens"],
        correctIndex: 2
      },
      {
        id: 13,
        difficulty: "medium",
        question: "Apa chip akselerator hardware khusus AI proprietary buatan Google yang digunakan melatih Gemini?",
        options: ["TPU (Tensor Processing Unit)", "NPU Snapdragon", "CUDA RTX", "Neural Engine M3"],
        correctIndex: 0
      },
      {
        id: 14,
        difficulty: "medium",
        question: "Teknik menyempurnakan model dasar dengan feedback preferensi manusia dikenal dengan singkatan...",
        options: ["RLHF (Reinforcement Learning from Human Feedback)", "LoRA Adapter", "Zero-Shot Learning", "K-Means Clustering"],
        correctIndex: 0
      },
      {
        id: 15,
        difficulty: "medium",
        question: "Arsitektur efisien yang digunakan model AI modern untuk mengaktifkan sub-jaringan spesifik per token disebut...",
        options: ["MoE (Mixture of Experts)", "Dense RNN", "Convolutional Layer 2D", "Hopfield Network"],
        correctIndex: 0
      },
      {
        id: 16,
        difficulty: "medium",
        question: "Teknik AI untuk menyambungkan dokumen internal pengguna ke LLM tanpa melatih ulang model disebut...",
        options: ["RAG (Retrieval-Augmented Generation)", "Fine-Tuning Full Weights", "Linear Regression", "GAN Synthesis"],
        correctIndex: 0
      },
      {
        id: 17,
        difficulty: "medium",
        question: "Sistem kecerdasan buatan Google DeepMind yang berhasil memecahkan prediksi struktur 3D protein secara akurat adalah...",
        options: ["AlphaFold", "AlphaTensor", "AlphaGeometry", "AlphaCode"],
        correctIndex: 0
      },
      {
        id: 18,
        difficulty: "medium",
        question: "Parameter 'Temperature' dalam setting LLM berfungsi untuk mengontrol...",
        options: ["Tingkat kreativitas dan acak pada respons", "Suhu panas fisik chip server GPU", "Kecepatan transfer data internet", "Ukuran maksimal memory token"],
        correctIndex: 0
      },
      {
        id: 19,
        difficulty: "medium",
        question: "Model sumber terbuka (open weights) keluarga Gemini yang dirilis Google untuk komunitas riset bernama...",
        options: ["Gemma", "Llama", "Mistral", "Falcon"],
        correctIndex: 0
      },
      {
        id: 20,
        difficulty: "medium",
        question: "Teknik 'Needle In A Haystack' (NIAH) dalam pengujian LLM digunakan untuk menguji...",
        options: ["Ketepatan mengingat data spesifik dalam context window yang sangat panjang", "Kecepatan rendering gambar", "Ketahanan terhadap serangan SQL Injection", "Kemampuan matematika aljabar dasar"],
        correctIndex: 0
      },

      // 10 HARD
      {
        id: 21,
        difficulty: "hard",
        question: "Mekanisme komputasi utama dalam arsitektur Transformer yang menghitung keterkaitan antar token bernama...",
        options: ["Scaled Dot-Product Self-Attention", "Backpropagation Through Time (BPTT)", "Stochastic Gradient Descent", "Maximum Likelihood Estimator"],
        correctIndex: 0
      },
      {
        id: 22,
        difficulty: "hard",
        question: "Metode positional encoding apa yang banyak diadopsi LLM modern untuk mendukung ekstrapolasi panjang konteks superior?",
        options: ["RoPE (Rotary Position Embedding)", "Absolute Sinusoidal Encoding", "Learned 1D Absolute Bias", "One-Hot Positional Bit"],
        correctIndex: 0
      },
      {
        id: 23,
        difficulty: "hard",
        question: "Pada generasi chip TPU v5p Google, berapa total FLOPS (BF16/FP16) peak per chip yang ditawarkan?",
        options: ["459 TFLOPS", "100 TFLOPS", "1.200 TFLOPS", "50 TFLOPS"],
        correctIndex: 0
      },
      {
        id: 24,
        difficulty: "hard",
        question: "Metode optimasi memori fine-tuning yang membekukan bobot asli dan menyisipkan matriks dekomposisi rank rendah adalah...",
        options: ["LoRA (Low-Rank Adaptation)", "Full FP32 Calibration", "Pruning Sparse 90%", "Gradient Clipping"],
        correctIndex: 0
      },
      {
        id: 25,
        difficulty: "hard",
        question: "Algoritma alignment alternatif pengganti RLHF yang langsung mengoptimalkan policy tanpa reward model terpisah adalah...",
        options: ["DPO (Direct Preference Optimization)", "PPO (Proximal Policy Optimization)", "Q-Learning Bellman", "A3C Actor Critic"],
        correctIndex: 0
      },
      {
        id: 26,
        difficulty: "hard",
        question: "Teknik kompresi bobot model AI dari FP16 menjadi INT8 atau INT4 untuk inferensi cepat disebut...",
        options: ["Quantization (Kuantisasi)", "Distillation", "Vectorization", "Tokenization"],
        correctIndex: 0
      },
      {
        id: 27,
        difficulty: "hard",
        question: "Dalam implementasi inference LLM, teknik caching yang menyimpan representasi Key dan Value untuk mencegah re-evaluasi disebut...",
        options: ["KV Cache", "LRU Page Cache", "DRAM Buffer Pool", "Instruction Prefetch Cache"],
        correctIndex: 0
      },
      {
        id: 28,
        difficulty: "hard",
        question: "Format floating point presisi 16-bit yang dikembangkan Google Brain dengan 8 bit exponent dan 7 bit mantissa bernama...",
        options: ["bfloat16 (Brain Floating Point)", "IEEE FP16 standar", "TensorFloat-32", "Fixed Point Q8"],
        correctIndex: 0
      },
      {
        id: 29,
        difficulty: "hard",
        question: "Metode evaluasi di mana LLM memverifikasi langkah reasoning dirinya sendiri langkah-demi-langkah dipopulerkan dengan konsep...",
        options: ["Chain-of-Thought (CoT) Prompting", "Few-Shot Classification", "Prefix Tuning", "Recurrent Feedback Loop"],
        correctIndex: 0
      },
      {
        id: 30,
        difficulty: "hard",
        question: "Framework komunikasi inter-koneksi optik superkomputer AI Google antar pod TPU dinamakan...",
        options: ["OCS (Optical Circuit Switch)", "InfiniBand Quantum", "RoCE v2 Ethernet", "NVLink NVSwitch"],
        correctIndex: 0
      }
    ],

    // =========================================================================
    // SESI 3: FONDASI KOMPUTASI & HARDWARE
    // =========================================================================
    session3: [
      // 10 EASY
      {
        id: 1,
        difficulty: "easy",
        question: "Komponen utama komputer yang bertindak sebagai 'otak' pemrosesan instruksi adalah...",
        options: ["CPU (Central Processing Unit)", "Power Supply Unit", "Heatsink Cooler", "Sound Card"],
        correctIndex: 0
      },
      {
        id: 2,
        difficulty: "easy",
        question: "Memori komputer yang bersifat 'volatile' (data hilang saat daya listrik dimatikan) adalah...",
        options: ["RAM (Random Access Memory)", "SSD NVMe", "Hard Disk Drive", "Optical Disc"],
        correctIndex: 0
      },
      {
        id: 3,
        difficulty: "easy",
        question: "Sistem bilangan berbasis 2 yang hanya menggunakan angka 0 dan 1 disebut...",
        options: ["Biner (Binary)", "Desimal", "Oktal", "Heksadesimal"],
        correctIndex: 0
      },
      {
        id: 4,
        difficulty: "easy",
        question: "Berapa jumlah bit dalam 1 Byte?",
        options: ["4 bit", "8 bit", "16 bit", "32 bit"],
        correctIndex: 1
      },
      {
        id: 5,
        difficulty: "easy",
        question: "Komponen pendingin yang ditempelkan di atas prosesor untuk menyalurkan panas disebut...",
        options: ["Thermal Paste & Heatsink", "Modem Card", "CMOS Battery", "Northbridge"],
        correctIndex: 0
      },
      {
        id: 6,
        difficulty: "easy",
        question: "Jenis media penyimpanan flash tanpa piringan mekanik berputar yang jauh lebih cepat dari HDD adalah...",
        options: ["SSD (Solid State Drive)", "Floppy Disk", "Pita Magnetik", "Tape Drive"],
        correctIndex: 0
      },
      {
        id: 7,
        difficulty: "easy",
        question: "Port konektivitas universal kabel modern yang berbentuk oval bolak-balik adalah...",
        options: ["USB Type-C", "VGA Port", "Serial DB9", "PS/2 Port"],
        correctIndex: 0
      },
      {
        id: 8,
        difficulty: "easy",
        question: "Chip memori kecil di motherboard yang menyimpan firmware booting dasar komputer dinamakan...",
        options: ["BIOS / UEFI ROM", "Virtual RAM", "L1 Cache", "Register File"],
        correctIndex: 0
      },
      {
        id: 9,
        difficulty: "easy",
        question: "Perangkat keras yang bertugas mengolah rendering grafis 3D dan video pada komputer adalah...",
        options: ["GPU (Graphics Processing Unit)", "Ethernet Card", "Capture Card", "RAID Controller"],
        correctIndex: 0
      },
      {
        id: 10,
        difficulty: "easy",
        question: "Berapa nilai heksadesimal dari angka desimal 15?",
        options: ["F", "E", "A", "10"],
        correctIndex: 0
      },

      // 10 MEDIUM
      {
        id: 11,
        difficulty: "medium",
        question: "Level cache CPU manakah yang memiliki kecepatan paling tinggi namun kapasitas paling kecil?",
        options: ["L1 Cache", "L2 Cache", "L3 Cache", "L4 eDRAM"],
        correctIndex: 0
      },
      {
        id: 12,
        difficulty: "medium",
        question: "Hukum empiris Gordon Moore (Moore's Law) memprediksi penggandaan jumlah transistor setiap kira-kira...",
        options: ["2 tahun (18-24 bulan)", "6 bulan", "5 tahun", "10 tahun"],
        correctIndex: 0
      },
      {
        id: 13,
        difficulty: "medium",
        question: "Protokol antarmuka berkecepatan tinggi yang dirancang khusus untuk SSD berbasis jalur PCIe disebut...",
        options: ["NVMe (Non-Volatile Memory Express)", "SATA III", "IDE ATA", "SCSI Ultra"],
        correctIndex: 0
      },
      {
        id: 14,
        difficulty: "medium",
        question: "Arsitektur set instruksi prosesor x86-64 tergolong ke dalam jenis arsitektur...",
        options: ["CISC (Complex Instruction Set Computer)", "RISC (Reduced Instruction Set Computer)", "VLIW Murni", "ASIC Tunggal"],
        correctIndex: 0
      },
      {
        id: 15,
        difficulty: "medium",
        question: "Teknik di mana satu inti fisik CPU dapat menjalankan dua untaian instruksi logis simultan dikenal di Intel sebagai...",
        options: ["Hyper-Threading (SMT)", "Turbo Boost Max", "Overclock Dynamic", "Branch Prediction"],
        correctIndex: 0
      },
      {
        id: 16,
        difficulty: "medium",
        question: "Standar memori RAM konsumen terbaru yang menawarkan kecepatan transfer tinggi dan on-die ECC adalah...",
        options: ["DDR5 SDRAM", "DDR3 SDRAM", "SDRAM PC133", "EDO RAM"],
        correctIndex: 0
      },
      {
        id: 17,
        difficulty: "medium",
        question: "Konfigurasi RAID disk yang menggabungkan mirroring dan striping untuk kecepatan sekaligus redundansi adalah...",
        options: ["RAID 10 (RAID 1+0)", "RAID 0", "RAID 1", "JBOD"],
        correctIndex: 0
      },
      {
        id: 18,
        difficulty: "medium",
        question: "Perusahaan manufaktur semikonduktor fabrikasi murni (foundry) terbesar di dunia yang memproduksi chip mutakhir adalah...",
        options: ["TSMC (Taiwan Semiconductor Manufacturing Co.)", "Foxconn Assembly", "Broadcom Inc.", "Texas Instruments"],
        correctIndex: 0
      },
      {
        id: 19,
        difficulty: "medium",
        question: "Hukum komputasi yang menyatakan bahwa percepatan paralel dibatasi oleh fraksi program yang harus berjalan sekuensial adalah...",
        options: ["Hukum Amdahl (Amdahl's Law)", "Hukum Little", "Hukum Metcalfe", "Hukum Fitts"],
        correctIndex: 0
      },
      {
        id: 20,
        difficulty: "medium",
        question: "Teknologi transistor 3D FinFET pertama kali diperkenalkan secara komersial oleh produsen prosesor...",
        options: ["Intel (Ivy Bridge 22nm)", "AMD (Bulldozer)", "IBM Power8", "Qualcomm Snapdragon"],
        correctIndex: 0
      },

      // 10 HARD
      {
        id: 21,
        difficulty: "hard",
        question: "Kerentanan keamanan hardware mikroprosesor spekulatif yang mengeksploitasi branch prediction dan cache timing bernama...",
        options: ["Meltdown & Spectre", "Heartbleed", "Stagefright", "Log4Shell"],
        correctIndex: 0
      },
      {
        id: 22,
        difficulty: "hard",
        question: "Proses litografi canggih menggunakan sinar ultraviolet ekstrem untuk mencetak sirkuit di bawah 7nm dinamakan...",
        options: ["EUV Lithography (Extreme Ultraviolet)", "DUV Immersion ArF", "Electron Beam Direct", "X-Ray Shadow Mask"],
        correctIndex: 0
      },
      {
        id: 23,
        difficulty: "hard",
        question: "Struktur arsitektur transistor masa depan pengganti FinFET dengan pita nanosheet horizontal yang ditumpuk disebut...",
        options: ["GAAFET (Gate-All-Around FET / RibbonFET)", "Planar MOSFET 2D", "Bipolar Junction NPN", "Vacuum Triode Array"],
        correctIndex: 0
      },
      {
        id: 24,
        difficulty: "hard",
        question: "Berapa bandwidth teoretis per lajur (lane) simplex pada antarmuka PCIe 5.0?",
        options: ["~4 GB/s per lane (~32 GT/s)", "~1 GB/s per lane", "~8 GB/s per lane", "~500 MB/s per lane"],
        correctIndex: 0
      },
      {
        id: 25,
        difficulty: "hard",
        question: "Memori grafis bertumpuk vertikal dengan bus ultra-lebar yang terhubung melalui TSV (Through-Silicon Vias) dinamakan...",
        options: ["HBM (High Bandwidth Memory)", "GDDR6X", "LPDDR5T", "SRAM QDR"],
        correctIndex: 0
      },
      {
        id: 26,
        difficulty: "hard",
        question: "Protokol koherensi cache standar industri yang banyak digunakan pada sistem multi-core adalah...",
        options: ["MESI Protocol (Modified, Exclusive, Shared, Invalid)", "Round-Robin Ring", "Token Ring FDDI", "CSMA/CD Loop"],
        correctIndex: 0
      },
      {
        id: 27,
        difficulty: "hard",
        question: "Arsitektur memori di mana waktu akses memori bervariasi bergantung pada lokasi prosesor terhadap bank RAM disebut...",
        options: ["NUMA (Non-Uniform Memory Access)", "UMA (Uniform Memory Access)", "SMP Symmetric", "Flat Shared DRAM"],
        correctIndex: 0
      },
      {
        id: 28,
        difficulty: "hard",
        question: "Pemberian daya dari bagian belakang wafer chip (Backside Power Delivery Network) di Intel dikenal dengan nama dagang...",
        options: ["PowerVia", "SuperFin", "HyperPower 3D", "SmartPower Rails"],
        correctIndex: 0
      },
      {
        id: 29,
        difficulty: "hard",
        question: "Buffer khusus dalam MMU prosesor yang mempercepat penerjemahan alamat virtual ke alamat fisik memori adalah...",
        options: ["TLB (Translation Lookaside Buffer)", "Instruction Pointer Ring", "DMA Channel Matrix", "Shadow Segment Register"],
        correctIndex: 0
      },
      {
        id: 30,
        difficulty: "hard",
        question: "Satu-satunya perusahaan di dunia yang mampu memproduksi mesin scanner litografi High-NA EUV komersial adalah...",
        options: ["ASML (Belanda)", "Nikon Precision", "Canon Semiconductor", "Applied Materials"],
        correctIndex: 0
      }
    ],

    // =========================================================================
    // SESI 4: INTERNET, WEB & CYBERSECURITY
    // =========================================================================
    session4: [
      // 10 EASY
      {
        id: 1,
        difficulty: "easy",
        question: "Protokol internet aman yang mengenkripsi pertukaran data antara browser web dan server ditandai dengan awalan...",
        options: ["HTTPS", "HTTP", "FTP", "TELNET"],
        correctIndex: 0
      },
      {
        id: 2,
        difficulty: "easy",
        question: "Sistem yang menerjemahkan nama domain yang mudah dibaca manusia (seperti google.com) menjadi alamat IP adalah...",
        options: ["DNS (Domain Name System)", "DHCP", "BGP", "SNMP"],
        correctIndex: 0
      },
      {
        id: 3,
        difficulty: "easy",
        question: "Alamat unik berupa empat kelompok angka desimal (contoh: 192.168.1.1) merupakan format alamat...",
        options: ["IPv4", "IPv6", "MAC Address", "Subnet Mask"],
        correctIndex: 0
      },
      {
        id: 4,
        difficulty: "easy",
        question: "Praktik penipuan digital di mana penyerang menyamar sebagai entitas terpercaya untuk mencuri kredensial akun disebut...",
        options: ["Phishing", "DDoS", "Brute-force", "Ransomware"],
        correctIndex: 0
      },
      {
        id: 5,
        difficulty: "easy",
        question: "Metode autentikasi yang mewajibkan kode kedua selain password (seperti OTP atau aplikasi authenticator) dinamakan...",
        options: ["2FA (Two-Factor Authentication)", "SSO Single Key", "Plain Password", "Zero Pin"],
        correctIndex: 0
      },
      {
        id: 6,
        difficulty: "easy",
        question: "File teks kecil yang disimpan situs web di browser pengguna untuk mengingat sesi login dan preferensi adalah...",
        options: ["Cookie", "Cache Memory", "Plugin DLL", "Favicon"],
        correctIndex: 0
      },
      {
        id: 7,
        difficulty: "easy",
        question: "Serangan siber yang membanjiri server dengan jutaan lalu lintas palsu agar layanan down disebut...",
        options: ["DDoS (Distributed Denial of Service)", "Trojan Horse", "Keylogger", "Adware"],
        correctIndex: 0
      },
      {
        id: 8,
        difficulty: "easy",
        question: "Kode status HTTP yang menandakan halaman tidak ditemukan di server adalah...",
        options: ["404 Not Found", "200 OK", "500 Internal Error", "301 Redirect"],
        correctIndex: 0
      },
      {
        id: 9,
        difficulty: "easy",
        question: "Jaringan privat terenkripsi yang menyamarkan lalu lintas internet dan IP publik pengguna disebut...",
        options: ["VPN (Virtual Private Network)", "VLAN", "PAN", "WAN"],
        correctIndex: 0
      },
      {
        id: 10,
        difficulty: "easy",
        question: "Jenis malware yang menyandera file pengguna dengan enkripsi dan meminta uang tebusan adalah...",
        options: ["Ransomware", "Spyware", "Worm", "Rootkit"],
        correctIndex: 0
      },

      // 10 MEDIUM
      {
        id: 11,
        difficulty: "medium",
        question: "Protokol HTTP/3 secara resmi dibangun di atas protokol transport layer baru berbasis UDP yang bernama...",
        options: ["QUIC", "TCP Fast Open", "SCTP", "DCCP"],
        correctIndex: 0
      },
      {
        id: 12,
        difficulty: "medium",
        question: "Versi protokol TLS modern yang menghapus cipher lemah dan memangkas handshake latency menjadi 1-RTT adalah...",
        options: ["TLS 1.3", "TLS 1.0", "SSL 3.0", "TLS 1.1"],
        correctIndex: 0
      },
      {
        id: 13,
        difficulty: "medium",
        question: "Prinsip keamanan modern 'Never trust, always verify' (Jangan pernah percaya, selalu verifikasi) adalah esensi dari...",
        options: ["Zero Trust Architecture", "Perimeter Defense", "DMZ Network", "Default Gateway Trust"],
        correctIndex: 0
      },
      {
        id: 14,
        difficulty: "medium",
        question: "Format token berbasis JSON ringkas dengan tanda tangan kriptografis yang umum digunakan untuk otorisasi API web adalah...",
        options: ["JWT (JSON Web Token)", "XML SAML 1.0", "YAML Stamp", "OAuth Cookie 1.0"],
        correctIndex: 0
      },
      {
        id: 15,
        difficulty: "medium",
        question: "Header HTTP keamanan yang menginstruksikan browser agar hanya berkomunikasi melalui HTTPS secara mutlak adalah...",
        options: ["HSTS (HTTP Strict Transport Security)", "CORS Origin", "X-Frame-Options", "Content-Type-Options"],
        correctIndex: 0
      },
      {
        id: 16,
        difficulty: "medium",
        question: "Kerentanan web di mana script berbahaya disuntikkan ke halaman yang dilihat pengguna lain disebut...",
        options: ["XSS (Cross-Site Scripting)", "CSRF", "SQL Injection", "Path Traversal"],
        correctIndex: 0
      },
      {
        id: 17,
        difficulty: "medium",
        question: "Protokol perutean (routing) inti yang mengarahkan lalu lintas data antar Autonomous System (AS) di internet global adalah...",
        options: ["BGP (Border Gateway Protocol)", "OSPF", "RIP v2", "EIGRP"],
        correctIndex: 0
      },
      {
        id: 18,
        difficulty: "medium",
        question: "Jaringan server global yang menyimpan cache konten statis dekat dengan lokasi geografis pengguna disebut...",
        options: ["CDN (Content Delivery Network)", "P2P Tracker", "Reverse DNS", "Edge Router Subnet"],
        correctIndex: 0
      },
      {
        id: 19,
        difficulty: "medium",
        question: "Standar enkripsi simetris modern yang paling banyak digunakan di dunia saat ini adalah...",
        options: ["AES (Advanced Encryption Standard)", "DES Klasik", "RC4", "MD5"],
        correctIndex: 0
      },
      {
        id: 20,
        difficulty: "medium",
        question: "Metode login modern tanpa password yang dipelopori FIDO Alliance menggunakan public-key cryptography disebut...",
        options: ["Passkeys", "Master Password", "Magic SMS Link", "Captcha v2"],
        correctIndex: 0
      },

      // 10 HARD
      {
        id: 21,
        difficulty: "hard",
        question: "Mekanisme pertukaran kunci kriptografis yang menghasilkan 'Perfect Forward Secrecy' (PFS) adalah...",
        options: ["ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)", "RSA Static Key Exchange", "Pre-Shared Key Fixed", "Triple DES ECB"],
        correctIndex: 0
      },
      {
        id: 22,
        difficulty: "hard",
        question: "Serangan terhadap algoritma hash kriptografis yang mengeksploitasi probabilitas benturan acak berakar pada...",
        options: ["Birthday Paradox (Birthday Attack)", "Pigeonhole Principle", "Monty Hall Problem", "Fibonacci Lattice"],
        correctIndex: 0
      },
      {
        id: 23,
        difficulty: "hard",
        question: "Teknik keamanan browser di mana setiap tab berjalan dalam proses OS terisolasi dengan privilege seminimal mungkin adalah...",
        options: ["Sandboxing & Site Isolation", "Just-In-Time Compilation", "Cross-Origin Embedding", "Memory Garbage Pool"],
        correctIndex: 0
      },
      {
        id: 24,
        difficulty: "hard",
        question: "Protokol enkripsi email ujung-ke-ujung (end-to-end) berbasis Web of Trust yang diciptakan Phil Zimmermann adalah...",
        options: ["PGP (Pretty Good Privacy)", "S/MIME", "DKIM", "DMARC"],
        correctIndex: 0
      },
      {
        id: 25,
        difficulty: "hard",
        question: "Record DNS yang memverifikasi bahwa server pengirim email memang diizinkan mengirim atas nama domain tersebut adalah...",
        options: ["SPF (Sender Policy Framework)", "CNAME Record", "PTR Reverse", "SOA Record"],
        correctIndex: 0
      },
      {
        id: 26,
        difficulty: "hard",
        question: "Kerapuhan keamanan 'Heartbleed' pada tahun 2014 mengeksploitasi bug buffer over-read pada implementasi library...",
        options: ["OpenSSL (fitur TLS Heartbeat)", "LibreSSL", "GnuTLS Core", "NSS Mozilla"],
        correctIndex: 0
      },
      {
        id: 27,
        difficulty: "hard",
        question: "Sistem log audit publik anti-pemalsuan sertifikat SSL/TLS yang digagas Google dinamakan...",
        options: ["Certificate Transparency (CT Logs)", "OCSP Stapling Live", "CRL Distribution Point", "Let's Encrypt ACME"],
        correctIndex: 0
      },
      {
        id: 28,
        difficulty: "hard",
        question: "Fungsi hashing kata sandi lambat yang dirancang khusus tahan terhadap akselerasi brute-force GPU/ASIC menggunakan komputasi memori tinggi adalah...",
        options: ["Argon2id", "SHA-256", "MD5", "CRC32"],
        correctIndex: 0
      },
      {
        id: 29,
        difficulty: "hard",
        question: "Struktur data probabilistik hemat memori yang digunakan router dan browser untuk mengecek keberadaan URL phishing secara cepat adalah...",
        options: ["Bloom Filter", "Red-Black Tree", "Hash Map B-Tree", "Linked List Ring"],
        correctIndex: 0
      },
      {
        id: 30,
        difficulty: "hard",
        question: "Mekanisme pengamanan perutean internet global dengan tanda tangan kriptografis untuk mencegah BGP Hijacking adalah...",
        options: ["RPKI (Resource Public Key Infrastructure)", "DNSSEC", "Anycast GeoIP", "MPLS Tagging"],
        correctIndex: 0
      }
    ],

    // =========================================================================
    // SESI 5: GRAND FINALE & FUTURE TECH
    // =========================================================================
    session5: [
      // 10 EASY
      {
        id: 1,
        difficulty: "easy",
        question: "Unit dasar informasi dalam komputasi kuantum yang dapat berada dalam kondisi superposisi adalah...",
        options: ["Qubit (Quantum Bit)", "Binary Bit", "Byte", "Pixel"],
        correctIndex: 0
      },
      {
        id: 2,
        difficulty: "easy",
        question: "Konsep komputasi di mana pemrosesan data dilakukan langsung di perangkat lokal (bukan di server cloud jauh) disebut...",
        options: ["Edge Computing (Edge AI)", "Mainframe Central", "Cold Storage", "FTP Archival"],
        correctIndex: 0
      },
      {
        id: 3,
        difficulty: "easy",
        question: "Mobil pintar otonom yang dapat mengemudi sendiri tanpa campur tangan sopir manusia menggunakan sensor radar, kamera, dan...",
        options: ["LiDAR", "NFC", "FM Radio", "Barcode Reader"],
        correctIndex: 0
      },
      {
        id: 4,
        difficulty: "easy",
        question: "Standar jaringan seluler generasi ke-5 yang menawarkan latency sangat rendah di bawah 5 milidetik adalah...",
        options: ["5G", "4G LTE", "3G HSDPA", "GPRS"],
        correctIndex: 0
      },
      {
        id: 5,
        difficulty: "easy",
        question: "Nama prosesor komputer kuantum 53-qubit Google yang pada tahun 2019 mengklaim pencapaian 'Quantum Supremacy' adalah...",
        options: ["Sycamore", "Willow", "Eagle", "Condor"],
        correctIndex: 0
      },
      {
        id: 6,
        difficulty: "easy",
        question: "Format biner baru untuk menjalankan kode kompilasi C++/Rust langsung di browser web dengan kecepatan native adalah...",
        options: ["WebAssembly (Wasm)", "ActiveX", "Adobe Flash", "Java Applet"],
        correctIndex: 0
      },
      {
        id: 7,
        difficulty: "easy",
        question: "Teknologi interface otak-komputer (Brain-Computer Interface / BCI) yang menghubungkan sinyal saraf langsung ke perangkat lunak dikembangkan oleh...",
        options: ["Neuralink", "OpenAI", "Boston Dynamics", "Waymo"],
        correctIndex: 0
      },
      {
        id: 8,
        difficulty: "easy",
        question: "Apa nama divisi robot otonom dan mobil tanpa sopir yang dinaungi oleh Alphabet (induk Google)?",
        options: ["Waymo", "Tesla FSD", "Uber Autonomous", "Cruise"],
        correctIndex: 0
      },
      {
        id: 9,
        difficulty: "easy",
        question: "Teknologi pencetakan objek fisik tiga dimensi lapis demi lapis berbasis file digital dinamakan...",
        options: ["3D Printing (Additive Manufacturing)", "Laser Hologram", "Lithography Subtractive", "Offset Press"],
        correctIndex: 0
      },
      {
        id: 10,
        difficulty: "easy",
        question: "Robot humanoid lincah yang mampu melakukan gerakan akrobatik dan parkour dikembangkan oleh perusahaan rekayasa...",
        options: ["Boston Dynamics (Atlas)", "Sony Robotics", "Honda Asimo Team", "iRobot Home"],
        correctIndex: 0
      },

      // 10 MEDIUM
      {
        id: 11,
        difficulty: "medium",
        question: "Fenomena mekanika kuantum di mana dua partikel saling terhubung secara instan tanpa mempedulikan jarak pemisah dinamakan...",
        options: ["Quantum Entanglement (Keterikatan Kuantum)", "Quantum Tunneling", "Wave-Particle Duality", "Zero-Point Energy"],
        correctIndex: 0
      },
      {
        id: 12,
        difficulty: "medium",
        question: "Standar API grafis web modern penerus WebGL yang memberikan akses komputasi GPU tingkat rendah di peramban adalah...",
        options: ["WebGPU", "Vulkan Desktop", "DirectX 12 Ultimate", "Metal Native"],
        correctIndex: 0
      },
      {
        id: 13,
        difficulty: "medium",
        question: "Pada Desember 2024, Google Quantum AI memperkenalkan chip prosesor kuantum 105-qubit mutakhir yang bernama...",
        options: ["Willow", "Sycamore", "Bristlecone", "Foxtail"],
        correctIndex: 0
      },
      {
        id: 14,
        difficulty: "medium",
        question: "Bidang kriptografi yang dirancang aman dan kebal dari ancaman dekripsi komputer kuantum berskala besar dikenal sebagai...",
        options: ["Post-Quantum Cryptography (PQC)", "Quantum Key Distribution", "Elliptic Curve 256", "Triple RSA"],
        correctIndex: 0
      },
      {
        id: 15,
        difficulty: "medium",
        question: "Algoritma kuantum yang terbukti secara teoretis dapat memfaktorkan bilangan bulat besar dalam waktu polinomial dan memecahkan enkripsi RSA adalah...",
        options: ["Shor's Algorithm", "Grover's Algorithm", "Deutsch-Jozsa Algorithm", "Bernstein-Vazirani"],
        correctIndex: 0
      },
      {
        id: 16,
        difficulty: "medium",
        question: "Teknologi jaringan satelit konstelasi orbit bumi rendah (LEO) yang menyediakan internet broadband global berlatensi rendah adalah...",
        options: ["Starlink & Project Kuiper", "Geostationary Inmarsat", "Iridium Voice Only", "GPS Block III"],
        correctIndex: 0
      },
      {
        id: 17,
        difficulty: "medium",
        question: "Metode komputasi yang meniru arsitektur jaringan saraf biologis otak manusia menggunakan sinapsis dan neuron buatan silikon disebut...",
        options: ["Neuromorphic Computing", "Quantum Annealing", "Optical Fiber Switching", "Cellular Automata"],
        correctIndex: 0
      },
      {
        id: 18,
        difficulty: "medium",
        question: "Sistem enkripsi revolusioner yang memungkinkan komputasi dan analisis dilakukan langsung di atas data terenkripsi tanpa harus didekripsi adalah...",
        options: ["FHE (Fully Homomorphic Encryption)", "Symmetric Block Cipher", "Diffie-Hellman Key Exchange", "Steganografi Digital"],
        correctIndex: 0
      },
      {
        id: 19,
        difficulty: "medium",
        question: "Sistem operasi real-time mikrokernel dengan jaminan keamanan formal (formally verified) yang banyak diriset untuk IoT masa depan adalah...",
        options: ["seL4 Microkernel", "FreeRTOS Generic", "VxWorks Classic", "QNX Neutrino"],
        correctIndex: 0
      },
      {
        id: 20,
        difficulty: "medium",
        question: "Komputasi optik (Photonic Computing) berupaya menggantikan elektron dengan partikel apa untuk memproses kalkulasi dengan kecepatan cahaya?",
        options: ["Foton (Photon)", "Neutron", "Positron", "Gluon"],
        correctIndex: 0
      },

      // 10 HARD
      {
        id: 21,
        difficulty: "hard",
        question: "Kode koreksi kesalahan kuantum (Quantum Error Correction) terkemuka yang menyusun qubit logis dari kisi qubit fisik 2D dinamakan...",
        options: ["Surface Code", "Shor 9-qubit Code", "Steane Code", "Bacon-Shor Subsystem"],
        correctIndex: 0
      },
      {
        id: 22,
        difficulty: "hard",
        question: "Skema Post-Quantum Cryptography standar NIST yang berbasis struktur kisi (lattice-based) untuk tanda tangan digital adalah...",
        options: ["ML-DSA (Dilithium) & SLH-DSA (SPHINCS+)", "RSA-4096", "ECDSA P-384", "Diffie-Hellman MODP"],
        correctIndex: 0
      },
      {
        id: 23,
        difficulty: "hard",
        question: "Algoritma pencarian kuantum yang memberikan percepatan kuadratik (quadratic speedup $O(\\sqrt{N})$) pada database tak terstruktur adalah...",
        options: ["Grover's Algorithm", "Shor's Factoring", "Quantum Phase Estimation", "HHL Linear Solver"],
        correctIndex: 0
      },
      {
        id: 24,
        difficulty: "hard",
        question: "Reaktor fusi nuklir berbentuk donat magnetik yang digunakan dalam eksperimen fusi terbesar dunia ITER dinamakan...",
        options: ["Tokamak", "Stellarator", "Inertial Confinement Laser", "Z-Pinch Fusion"],
        correctIndex: 0
      },
      {
        id: 25,
        difficulty: "hard",
        question: "Konsep fisika di mana fluks listrik mengalir tanpa hambatan (resistansi nol) pada suhu transisi tertentu disebut...",
        options: ["Superkonduktivitas (Superconductivity)", "Paramagnetisme", "Piezoelektrik", "Efek Hall Kuantum"],
        correctIndex: 0
      },
      {
        id: 26,
        difficulty: "hard",
        question: "Arsitektur agen AI otonom di mana beberapa model AI saling berkomunikasi, mengkritisi, dan mengeksekusi tools bersama dinamakan...",
        options: ["Multi-Agent Systems (MAS Orchestration)", "Monolithic Feedforward", "Static Finite State Machine", "Linear Regression Pipeline"],
        correctIndex: 0
      },
      {
        id: 27,
        difficulty: "hard",
        question: "Batas teoretis konsumsi energi minimum untuk menghapus satu bit informasi komputasi dirumuskan dalam...",
        options: ["Prinsip Landauer (Landauer's Principle)", "Batas Bekenstein", "Hukum Efisiensi Carnot", "Teorema Shannon-Hartley"],
        correctIndex: 0
      },
      {
        id: 28,
        difficulty: "hard",
        question: "Protokol konsensus kriptografis 'Zero-Knowledge Proof' non-interaktif ringkas yang banyak digunakan untuk skalabilitas privasi adalah...",
        options: ["zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge)", "Proof of Work (PoW)", "PBFT Consensus", "Raft State Machine"],
        correctIndex: 0
      },
      {
        id: 29,
        difficulty: "hard",
        question: "Penyimpanan data masa depan berbasis molekul biologis yang mampu menyimpan ratusan petabyte data dalam satu gram materi adalah...",
        options: ["Sintesis DNA Data Storage", "Optical Holographic Quartz", "Magnetoresistive MRAM", "Barium Ferrite Tape"],
        correctIndex: 0
      },
      {
        id: 30,
        difficulty: "hard",
        question: "Suhu operasional ekstrem tempat chip kuantum superkonduktor Google (seperti Willow) bekerja adalah sekitar...",
        options: ["~15 milikelvin (-273,135°C / mendekati nol mutlak)", "0°C", "-70°C", "77 Kelvin (-196°C)"],
        correctIndex: 0
      }
    ]
  },

  // ===========================================================================
  // ENGLISH TRANSLATIONS (EN)
  // Perfectly mirrored questions, options, and correctIndex
  // ===========================================================================
  en: {
    // SESI 1: CLOUD & GOOGLE ECOSYSTEM
    session1: [
      {
        id: 1,
        difficulty: "easy",
        question: "What is the total storage capacity of the Google One cloud plan featured as the grand prize in this giveaway?",
        options: ["1 TB", "2 TB", "5 TB", "10 TB"],
        correctIndex: 2
      },
      {
        id: 2,
        difficulty: "easy",
        question: "What is the default free cloud storage quota provided for any standard Google account?",
        options: ["5 GB", "15 GB", "25 GB", "50 GB"],
        correctIndex: 1
      },
      {
        id: 3,
        difficulty: "easy",
        question: "Which collection of services directly consumes your shared Google One storage allocation?",
        options: ["Google Drive, Gmail, & Google Photos", "Google Search & YouTube Watch History", "Google Maps & Google Chrome Bookmarks", "Google Play Store downloads"],
        correctIndex: 0
      },
      {
        id: 4,
        difficulty: "easy",
        question: "What is the official Google One feature that enables storage sharing with family members?",
        options: ["Google Family Sharing", "Google Peer Share", "Multi-User Drive Link", "Storage Broadcast"],
        correctIndex: 0
      },
      {
        id: 5,
        difficulty: "easy",
        question: "What is the maximum number of family members (including the manager) allowed in a Google Family group?",
        options: ["3 people", "4 people", "6 people", "10 people"],
        correctIndex: 2
      },
      {
        id: 6,
        difficulty: "easy",
        question: "Which web-based word processor belongs to Google's productivity suite?",
        options: ["Google Sheets", "Google Slides", "Google Docs", "Google Keep"],
        correctIndex: 2
      },
      {
        id: 7,
        difficulty: "easy",
        question: "What advanced technology does Google Photos utilize to recognize faces and objects across your pictures?",
        options: ["Computer Vision & AI", "QR Code Scanner", "Exif metadata only", "Barcoding system"],
        correctIndex: 0
      },
      {
        id: 8,
        difficulty: "easy",
        question: "What is Google's flagship video conferencing solution for online meetings?",
        options: ["Google Duo", "Google Meet", "Google Hangouts Chat", "Google Talk"],
        correctIndex: 1
      },
      {
        id: 9,
        difficulty: "easy",
        question: "What does the abbreviation TB stand for in computer storage capacity?",
        options: ["TeraByte", "TotalByte", "TrueByte", "TensByte"],
        correctIndex: 0
      },
      {
        id: 10,
        difficulty: "easy",
        question: "Which global mobile operating system is developed and maintained by Google?",
        options: ["iOS", "Android", "Symbian", "Tizen"],
        correctIndex: 1
      },

      // 10 MEDIUM
      {
        id: 11,
        difficulty: "medium",
        question: "In the Google One AI Premium tier, which advanced AI tier model is unlocked for Gemini?",
        options: ["Gemini Nano", "Gemini Advanced", "Gemini Flash Basic", "Bard Lite"],
        correctIndex: 1
      },
      {
        id: 12,
        difficulty: "medium",
        question: "What is the standard decimal gigabyte (GB) equivalent of a 5 Terabyte (TB) storage plan?",
        options: ["500 GB", "1,000 GB", "5,000 GB", "50,000 GB"],
        correctIndex: 2
      },
      {
        id: 13,
        difficulty: "medium",
        question: "In Google Photos, what is the AI-powered feature that erases photobombers and unwanted objects with a tap?",
        options: ["Magic Eraser", "Photo Blender", "Clone Stamp 3D", "Pixel Clipper"],
        correctIndex: 0
      },
      {
        id: 14,
        difficulty: "medium",
        question: "How long do deleted files remain in the Google Drive Trash before permanent deletion?",
        options: ["7 days", "14 days", "30 days", "60 days"],
        correctIndex: 2
      },
      {
        id: 15,
        difficulty: "medium",
        question: "What is the name of Google's official desktop application for syncing local computer files with Drive?",
        options: ["Google Drive for Desktop", "Backup & Sync Classic", "GSuite Linker", "Cloud Connector CLI"],
        correctIndex: 0
      },
      {
        id: 16,
        difficulty: "medium",
        question: "On which flagship smartphone line was Google Photos' generative 'Magic Editor' first launched?",
        options: ["Google Pixel 8 Series", "Samsung Galaxy S20", "Google Nexus 6P", "Chromebook Pro"],
        correctIndex: 0
      },
      {
        id: 17,
        difficulty: "medium",
        question: "What is the maximum supported single file upload size in Google Drive?",
        options: ["1 TB", "2 TB", "5 TB", "10 TB"],
        correctIndex: 2
      },
      {
        id: 18,
        difficulty: "medium",
        question: "What is Google's proprietary distributed cluster file system that evolved from GFS to power massive-scale storage?",
        options: ["Colossus", "HDFS", "Ceph FS", "ZFS Redundant"],
        correctIndex: 0
      },
      {
        id: 19,
        difficulty: "medium",
        question: "Which modern web image format was developed and championed by Google to replace JPEG and PNG?",
        options: ["WebP", "GIF89a", "TIFF LZW", "BMP HighRes"],
        correctIndex: 0
      },
      {
        id: 20,
        difficulty: "medium",
        question: "When a family member uploads files in Google One Family Sharing, who owns the deducted storage space?",
        options: ["Shared equally among everyone", "The individual family member who uploaded the file", "Deducted from the admin's personal drive", "Zero server consumption"],
        correctIndex: 1
      },

      // 10 HARD
      {
        id: 21,
        difficulty: "hard",
        question: "What specialized hardware clocks does Google Cloud Spanner rely on to guarantee global absolute consistency?",
        options: ["Atomic Clocks & GPS Receivers (TrueTime API)", "Internet NTP Tier-1 Pool", "Rubidium Crystal standard RTC", "Local CPU tick clock counter"],
        correctIndex: 0
      },
      {
        id: 22,
        difficulty: "hard",
        question: "What is the name of Google's internal software-defined network (SDN) data center fabric architecture?",
        options: ["Jupiter", "B4", "Andromeda", "Titan"],
        correctIndex: 0
      },
      {
        id: 23,
        difficulty: "hard",
        question: "Google Cloud server hardware and Pixel smartphones are secured at the silicon level using which proprietary chip?",
        options: ["Titan Security Chip", "TPM 1.2 Generic", "SecuStore Enclave", "Knox Hardware Vault"],
        correctIndex: 0
      },
      {
        id: 24,
        difficulty: "hard",
        question: "What is the current maximum cell limit for a single Google Sheets workbook?",
        options: ["2 million cells", "5 million cells", "10 million cells", "20 million cells"],
        correctIndex: 2
      },
      {
        id: 25,
        difficulty: "hard",
        question: "Which open-source container orchestration system was directly modeled after Google's internal Borg system?",
        options: ["Kubernetes", "Docker Swarm", "Apache Mesos", "OpenStack"],
        correctIndex: 0
      },
      {
        id: 26,
        difficulty: "hard",
        question: "What is Google's language-neutral, high-performance binary structured data serialization mechanism?",
        options: ["Protocol Buffers (Protobuf)", "MessagePack XML", "BSON Flat", "JSON-LD"],
        correctIndex: 0
      },
      {
        id: 27,
        difficulty: "hard",
        question: "What is the designed annual durability rating for standard storage objects in Google Cloud Storage?",
        options: ["99.9%", "99.999999999% (11 nines)", "99.99%", "99.999%"],
        correctIndex: 1
      },
      {
        id: 28,
        difficulty: "hard",
        question: "Which high-performance open-source JavaScript and WebAssembly engine was built by Google for Chrome and Node.js?",
        options: ["SpiderMonkey", "V8 Engine", "JavaScriptCore", "ChakraCore"],
        correctIndex: 1
      },
      {
        id: 29,
        difficulty: "hard",
        question: "What distributed consensus algorithm originally backed Google's Chubby distributed lock service?",
        options: ["Paxos Algorithm", "Raft Protocol", "Byzantine Fault PoW", "Gossip Protocol"],
        correctIndex: 0
      },
      {
        id: 30,
        difficulty: "hard",
        question: "In supported markets, what Google Store hardware cash back percentage does the 5 TB Google One plan provide?",
        options: ["5%", "10%", "15%", "20%"],
        correctIndex: 1
      }
    ],

    // SESI 2: AI & GEMINI
    session2: [
      {
        id: 1,
        difficulty: "easy",
        question: "What is the family name of Google DeepMind's flagship native multimodal AI models?",
        options: ["Gemini", "Bard", "LaMDA", "PaLM"],
        correctIndex: 0
      },
      {
        id: 2,
        difficulty: "easy",
        question: "What does the acronym LLM stand for in modern artificial intelligence?",
        options: ["Large Language Model", "Linear Logic Machine", "Local Learning Matrix", "Low Latency Module"],
        correctIndex: 0
      },
      {
        id: 3,
        difficulty: "easy",
        question: "What does 'Multimodal' signify in foundation AI models like Gemini?",
        options: ["Processes diverse formats seamlessly: text, images, audio, and video", "Understands regional dialects only", "Runs strictly on multi-core chips", "Generates multiple accounts simultaneously"],
        correctIndex: 0
      },
      {
        id: 4,
        difficulty: "easy",
        question: "What is the natural language instruction or query fed to an AI model called?",
        options: ["Prompt", "Token", "Epoch", "Hyperlink"],
        correctIndex: 0
      },
      {
        id: 5,
        difficulty: "easy",
        question: "Which Google research lab developed AlphaFold, AlphaGo, and co-built Gemini?",
        options: ["Google DeepMind", "OpenAI", "Meta FAIR", "Anthropic Lab"],
        correctIndex: 0
      },
      {
        id: 6,
        difficulty: "easy",
        question: "Which lightweight variant of Gemini is optimized to execute entirely on-device on smartphones?",
        options: ["Gemini Nano", "Gemini Flash", "Gemini Pro", "Gemini Ultra"],
        correctIndex: 0
      },
      {
        id: 7,
        difficulty: "easy",
        question: "What term describes an AI confidently stating incorrect or fabricated facts?",
        options: ["Hallucination", "Overclocking", "Memory Leak", "Bit Rot"],
        correctIndex: 0
      },
      {
        id: 8,
        difficulty: "easy",
        question: "What was the initial name of Google's public conversational AI chatbot prior to rebranding as Gemini?",
        options: ["Bard", "Allo", "Google Now", "Cortana"],
        correctIndex: 0
      },
      {
        id: 9,
        difficulty: "easy",
        question: "What is the basic sub-word unit of text processed by language models called?",
        options: ["Token", "Pixel", "Voxel", "Bytecode"],
        correctIndex: 0
      },
      {
        id: 10,
        difficulty: "easy",
        question: "What is the computational process of teaching an AI model over massive datasets called?",
        options: ["Model Training", "Prompt Engineering", "Model Quantization", "API Routing"],
        correctIndex: 0
      },

      // 10 MEDIUM
      {
        id: 11,
        difficulty: "medium",
        question: "What is the title of Google's seminal 2017 research paper introducing the Transformer architecture?",
        options: ["Attention Is All You Need", "Deep Residual Learning", "Generative Adversarial Nets", "Mastering the Game of Go"],
        correctIndex: 0
      },
      {
        id: 12,
        difficulty: "medium",
        question: "What milestone context window size was pioneered by Gemini 1.5 Pro?",
        options: ["32,000 tokens", "128,000 tokens", "1,000,000 to 2,000,000+ tokens", "50,000 tokens"],
        correctIndex: 2
      },
      {
        id: 13,
        difficulty: "medium",
        question: "Which custom hardware accelerator chip developed by Google powers Gemini training?",
        options: ["TPU (Tensor Processing Unit)", "Snapdragon NPU", "RTX Tensor Core", "M3 Neural Engine"],
        correctIndex: 0
      },
      {
        id: 14,
        difficulty: "medium",
        question: "What technique aligns model behavior using human evaluators' preferences?",
        options: ["RLHF (Reinforcement Learning from Human Feedback)", "LoRA Adapter", "Zero-Shot Learning", "K-Means Clustering"],
        correctIndex: 0
      },
      {
        id: 15,
        difficulty: "medium",
        question: "Which architecture design selectively routes input tokens to specialized sub-networks?",
        options: ["MoE (Mixture of Experts)", "Dense RNN", "Convolutional Layer 2D", "Hopfield Network"],
        correctIndex: 0
      },
      {
        id: 16,
        difficulty: "medium",
        question: "What framework augments LLM answers with real-time private document retrieval without fine-tuning?",
        options: ["RAG (Retrieval-Augmented Generation)", "Full FP32 Weight Retraining", "Linear Regression", "GAN Synthesis"],
        correctIndex: 0
      },
      {
        id: 17,
        difficulty: "medium",
        question: "Which breakthrough AI system by Google DeepMind solved the 50-year-old protein folding problem?",
        options: ["AlphaFold", "AlphaTensor", "AlphaGeometry", "AlphaCode"],
        correctIndex: 0
      },
      {
        id: 18,
        difficulty: "medium",
        question: "What does the 'Temperature' hyperparameter in generative LLMs primarily modulate?",
        options: ["Output randomness and creative divergence", "Physical GPU core heat", "Network bandwidth rate", "Token buffer sizing"],
        correctIndex: 0
      },
      {
        id: 19,
        difficulty: "medium",
        question: "What is Google's open-weights model family inspired by Gemini technology called?",
        options: ["Gemma", "Llama", "Mistral", "Falcon"],
        correctIndex: 0
      },
      {
        id: 20,
        difficulty: "medium",
        question: "In LLM benchmark evaluations, what does the 'Needle In A Haystack' (NIAH) test measure?",
        options: ["Exact fact retrieval accuracy across extreme context lengths", "Image rendering FPS", "SQL injection resilience", "Basic algebraic arithmetic"],
        correctIndex: 0
      },

      // 10 HARD
      {
        id: 21,
        difficulty: "hard",
        question: "What core mathematical computation in Transformers calculates the relevance between pairs of tokens?",
        options: ["Scaled Dot-Product Self-Attention", "Backpropagation Through Time", "Stochastic Gradient Descent", "Maximum Likelihood Estimator"],
        correctIndex: 0
      },
      {
        id: 22,
        difficulty: "hard",
        question: "Which positional encoding mechanism is widely utilized by top LLMs to preserve relative token positions?",
        options: ["RoPE (Rotary Position Embedding)", "Absolute Sinusoidal Encoding", "Learned 1D Absolute Bias", "One-Hot Positional Bit"],
        correctIndex: 0
      },
      {
        id: 23,
        difficulty: "hard",
        question: "What is the peak BF16/FP16 computing throughput per chip offered by Google's TPU v5p?",
        options: ["459 TFLOPS", "100 TFLOPS", "1,200 TFLOPS", "50 TFLOPS"],
        correctIndex: 0
      },
      {
        id: 24,
        difficulty: "hard",
        question: "Which fine-tuning parameter-efficiency technique freezes base weights and trains low-rank decomposition matrices?",
        options: ["LoRA (Low-Rank Adaptation)", "Full FP32 Calibration", "Pruning Sparse 90%", "Gradient Clipping"],
        correctIndex: 0
      },
      {
        id: 25,
        difficulty: "hard",
        question: "Which direct policy optimization algorithm eliminates the need for training a separate reward model in RLHF?",
        options: ["DPO (Direct Preference Optimization)", "PPO (Proximal Policy Optimization)", "Q-Learning Bellman", "A3C Actor Critic"],
        correctIndex: 0
      },
      {
        id: 26,
        difficulty: "hard",
        question: "What is the post-training compression process that converts FP16 model weights into INT8 or INT4?",
        options: ["Quantization", "Distillation", "Vectorization", "Tokenization"],
        correctIndex: 0
      },
      {
        id: 27,
        difficulty: "hard",
        question: "In autoregressive LLM inference, what caching mechanism prevents redundant recomputation of past attention states?",
        options: ["KV Cache", "LRU Page Cache", "DRAM Buffer Pool", "Instruction Prefetch Cache"],
        correctIndex: 0
      },
      {
        id: 28,
        difficulty: "hard",
        question: "Which 16-bit floating point format with 8 exponent bits was designed by Google Brain for deep learning?",
        options: ["bfloat16", "IEEE FP16 standard", "TensorFloat-32", "Fixed Point Q8"],
        correctIndex: 0
      },
      {
        id: 29,
        difficulty: "hard",
        question: "Which prompting methodology elicits intermediate reasoning steps from models before concluding answers?",
        options: ["Chain-of-Thought (CoT) Prompting", "Few-Shot Classification", "Prefix Tuning", "Recurrent Feedback Loop"],
        correctIndex: 0
      },
      {
        id: 30,
        difficulty: "hard",
        question: "What optical interconnect switching hardware links Google's TPU v4/v5 pods with extreme reconfigurability?",
        options: ["OCS (Optical Circuit Switch)", "InfiniBand Quantum", "RoCE v2 Ethernet", "NVLink NVSwitch"],
        correctIndex: 0
      }
    ],

    // SESI 3: COMPUTING & HARDWARE
    session3: [
      {
        id: 1,
        difficulty: "easy",
        question: "Which component is widely known as the 'brain' of the computer, executing program instructions?",
        options: ["CPU (Central Processing Unit)", "Power Supply Unit", "Heatsink Cooler", "Sound Card"],
        correctIndex: 0
      },
      {
        id: 2,
        difficulty: "easy",
        question: "Which volatile system memory loses its stored contents immediately when electrical power is cut?",
        options: ["RAM (Random Access Memory)", "NVMe SSD", "Hard Disk Drive", "Optical Disc"],
        correctIndex: 0
      },
      {
        id: 3,
        difficulty: "easy",
        question: "Which base-2 numeral system uses only digits 0 and 1?",
        options: ["Binary", "Decimal", "Octal", "Hexadecimal"],
        correctIndex: 0
      },
      {
        id: 4,
        difficulty: "easy",
        question: "How many bits constitute a single standard Byte?",
        options: ["4 bits", "8 bits", "16 bits", "32 bits"],
        correctIndex: 1
      },
      {
        id: 5,
        difficulty: "easy",
        question: "What thermal device is mounted on top of a CPU to absorb and dissipate heat away from the silicon?",
        options: ["Thermal Paste & Heatsink", "Modem Card", "CMOS Battery", "Northbridge"],
        correctIndex: 0
      },
      {
        id: 6,
        difficulty: "easy",
        question: "Which solid-state flash memory drive replaced mechanical hard drives with rotating platters?",
        options: ["SSD (Solid State Drive)", "Floppy Disk", "Magnetic Tape", "Tape Drive"],
        correctIndex: 0
      },
      {
        id: 7,
        difficulty: "easy",
        question: "Which reversible, oval-shaped universal port standard is prevalent in modern laptops and phones?",
        options: ["USB Type-C", "VGA Port", "Serial DB9", "PS/2 Port"],
        correctIndex: 0
      },
      {
        id: 8,
        difficulty: "easy",
        question: "Which motherboard ROM memory chip stores the low-level firmware initialization routines for PC bootup?",
        options: ["BIOS / UEFI ROM", "Virtual RAM", "L1 Cache", "Register File"],
        correctIndex: 0
      },
      {
        id: 9,
        difficulty: "easy",
        question: "Which specialized processor handles heavy parallel calculations for 3D graphics and video shaders?",
        options: ["GPU (Graphics Processing Unit)", "Ethernet Card", "Capture Card", "RAID Controller"],
        correctIndex: 0
      },
      {
        id: 10,
        difficulty: "easy",
        question: "What is the hexadecimal representation of the decimal number 15?",
        options: ["F", "E", "A", "10"],
        correctIndex: 0
      },

      // 10 MEDIUM
      {
        id: 11,
        difficulty: "medium",
        question: "Which CPU cache level delivers the lowest latency and fastest response time at the smallest capacity?",
        options: ["L1 Cache", "L2 Cache", "L3 Cache", "L4 eDRAM"],
        correctIndex: 0
      },
      {
        id: 12,
        difficulty: "medium",
        question: "According to Gordon Moore's empirical law, the density of transistors on an integrated circuit doubles every...",
        options: ["2 years (~18-24 months)", "6 months", "5 years", "10 years"],
        correctIndex: 0
      },
      {
        id: 13,
        difficulty: "medium",
        question: "Which host controller interface is purpose-built to unleash high-speed SSDs directly over PCIe lanes?",
        options: ["NVMe (Non-Volatile Memory Express)", "SATA III", "IDE ATA", "SCSI Ultra"],
        correctIndex: 0
      },
      {
        id: 14,
        difficulty: "medium",
        question: "The x86-64 instruction set architecture fundamentally belongs to which computing paradigm?",
        options: ["CISC (Complex Instruction Set Computer)", "RISC (Reduced Instruction Set Computer)", "Pure VLIW", "Single ASIC"],
        correctIndex: 0
      },
      {
        id: 15,
        difficulty: "medium",
        question: "What is Intel's implementation of simultaneous multithreading (running two threads per physical core) branded as?",
        options: ["Hyper-Threading", "Turbo Boost Max", "Overclock Dynamic", "Branch Prediction"],
        correctIndex: 0
      },
      {
        id: 16,
        difficulty: "medium",
        question: "Which contemporary desktop RAM standard provides dual 32-bit subchannels per DIMM and on-die ECC?",
        options: ["DDR5 SDRAM", "DDR3 SDRAM", "SDRAM PC133", "EDO RAM"],
        correctIndex: 0
      },
      {
        id: 17,
        difficulty: "medium",
        question: "Which nested RAID storage configuration combines data mirroring and block striping for both speed and redundancy?",
        options: ["RAID 10 (1+0)", "RAID 0", "RAID 1", "JBOD"],
        correctIndex: 0
      },
      {
        id: 18,
        difficulty: "medium",
        question: "Which pure-play semiconductor foundry located in Taiwan manufactures the world's most advanced chipsets?",
        options: ["TSMC (Taiwan Semiconductor Manufacturing Co.)", "Foxconn Assembly", "Broadcom Inc.", "Texas Instruments"],
        correctIndex: 0
      },
      {
        id: 19,
        difficulty: "medium",
        question: "Which computing law states that the theoretical speedup of a program running on parallel processors is limited by its serial part?",
        options: ["Amdahl's Law", "Little's Law", "Metcalfe's Law", "Fitts's Law"],
        correctIndex: 0
      },
      {
        id: 20,
        difficulty: "medium",
        question: "Which semiconductor manufacturer first commercialized 3D FinFET (Tri-Gate) transistors at 22nm?",
        options: ["Intel (Ivy Bridge)", "AMD (Bulldozer)", "IBM Power8", "Qualcomm Snapdragon"],
        correctIndex: 0
      },

      // 10 HARD
      {
        id: 21,
        difficulty: "hard",
        question: "Which hardware microarchitectural vulnerabilities exploit speculative execution and CPU cache timing channels?",
        options: ["Meltdown & Spectre", "Heartbleed", "Stagefright", "Log4Shell"],
        correctIndex: 0
      },
      {
        id: 22,
        difficulty: "hard",
        question: "What lithography technology using ~13.5nm wavelengths is essential for printing sub-7nm silicon features?",
        options: ["EUV Lithography (Extreme Ultraviolet)", "DUV Immersion ArF", "Electron Beam Direct", "X-Ray Shadow Mask"],
        correctIndex: 0
      },
      {
        id: 23,
        difficulty: "hard",
        question: "What nanosheet transistor geometry succeeds FinFET by wrapping the gate entirely around horizontal channel sheets?",
        options: ["GAAFET (Gate-All-Around / RibbonFET)", "Planar MOSFET 2D", "Bipolar Junction NPN", "Vacuum Triode Array"],
        correctIndex: 0
      },
      {
        id: 24,
        difficulty: "hard",
        question: "What is the theoretical simplex raw transfer bandwidth per lane in the PCIe 5.0 specification?",
        options: ["~4 GB/s per lane (~32 GT/s)", "~1 GB/s per lane", "~8 GB/s per lane", "~500 MB/s per lane"],
        correctIndex: 0
      },
      {
        id: 25,
        difficulty: "hard",
        question: "What 3D stacked high-performance memory uses through-silicon vias (TSVs) to connect directly to processors on a silicon interposer?",
        options: ["HBM (High Bandwidth Memory)", "GDDR6X", "LPDDR5T", "SRAM QDR"],
        correctIndex: 0
      },
      {
        id: 26,
        difficulty: "hard",
        question: "Which canonical 4-state cache coherence protocol maintains data consistency in multi-core symmetric systems?",
        options: ["MESI Protocol", "Round-Robin Ring", "Token Ring FDDI", "CSMA/CD Loop"],
        correctIndex: 0
      },
      {
        id: 27,
        difficulty: "hard",
        question: "What computer memory design results in varying latency depending on which CPU socket an address maps to?",
        options: ["NUMA (Non-Uniform Memory Access)", "UMA (Uniform Memory Access)", "SMP Symmetric", "Flat Shared DRAM"],
        correctIndex: 0
      },
      {
        id: 28,
        difficulty: "hard",
        question: "What is Intel's trademarked name for its backside power delivery network routing power beneath transistors?",
        options: ["PowerVia", "SuperFin", "HyperPower 3D", "SmartPower Rails"],
        correctIndex: 0
      },
      {
        id: 29,
        difficulty: "hard",
        question: "Which high-speed hardware lookup buffer within the MMU caches recent virtual-to-physical address mappings?",
        options: ["TLB (Translation Lookaside Buffer)", "Instruction Pointer Ring", "DMA Channel Matrix", "Shadow Segment Register"],
        correctIndex: 0
      },
      {
        id: 30,
        difficulty: "hard",
        question: "Which Dutch company stands as the sole manufacturer of commercial High-NA EUV lithography scanners?",
        options: ["ASML", "Nikon Precision", "Canon Semiconductor", "Applied Materials"],
        correctIndex: 0
      }
    ],

    // SESI 4: INTERNET, WEB & SECURITY
    session4: [
      {
        id: 1,
        difficulty: "easy",
        question: "Which secure internet protocol prefixes URLs to encrypt data transferred between client browsers and servers?",
        options: ["HTTPS", "HTTP", "FTP", "TELNET"],
        correctIndex: 0
      },
      {
        id: 2,
        difficulty: "easy",
        question: "Which system translates human-friendly domain names like google.com into numeric IP addresses?",
        options: ["DNS (Domain Name System)", "DHCP", "BGP", "SNMP"],
        correctIndex: 0
      },
      {
        id: 3,
        difficulty: "easy",
        question: "A dotted 32-bit address format like 192.168.1.1 belongs to which protocol standard?",
        options: ["IPv4", "IPv6", "MAC Address", "Subnet Mask"],
        correctIndex: 0
      },
      {
        id: 4,
        difficulty: "easy",
        question: "What is the deceptive social engineering practice of impersonating legitimate entities to steal credentials?",
        options: ["Phishing", "DDoS", "Brute-force", "Ransomware"],
        correctIndex: 0
      },
      {
        id: 5,
        difficulty: "easy",
        question: "What security process demands two distinct pieces of evidence before granting user access?",
        options: ["2FA (Two-Factor Authentication)", "SSO Single Key", "Plain Password", "Zero Pin"],
        correctIndex: 0
      },
      {
        id: 6,
        difficulty: "easy",
        question: "What small data snippets do websites store in your browser to maintain session states and cookies?",
        options: ["Cookies", "Cache Memory", "Plugin DLL", "Favicon"],
        correctIndex: 0
      },
      {
        id: 7,
        difficulty: "easy",
        question: "What cyberattack overwhelms target infrastructure with distributed traffic surges to knock it offline?",
        options: ["DDoS (Distributed Denial of Service)", "Trojan Horse", "Keylogger", "Adware"],
        correctIndex: 0
      },
      {
        id: 8,
        difficulty: "easy",
        question: "Which standard HTTP response status code indicates that the requested URL cannot be found on the server?",
        options: ["404 Not Found", "200 OK", "500 Internal Error", "301 Redirect"],
        correctIndex: 0
      },
      {
        id: 9,
        difficulty: "easy",
        question: "Which technology routes your internet connection through an encrypted tunnel to disguise your public IP?",
        options: ["VPN (Virtual Private Network)", "VLAN", "PAN", "WAN"],
        correctIndex: 0
      },
      {
        id: 10,
        difficulty: "easy",
        question: "What extortion malware encrypts victim storage volumes and demands payments for decryption keys?",
        options: ["Ransomware", "Spyware", "Worm", "Rootkit"],
        correctIndex: 0
      },

      // 10 MEDIUM
      {
        id: 11,
        difficulty: "medium",
        question: "HTTP/3 abandons TCP in favor of which UDP-based transport layer protocol pioneered by Google?",
        options: ["QUIC", "TCP Fast Open", "SCTP", "DCCP"],
        correctIndex: 0
      },
      {
        id: 12,
        difficulty: "medium",
        question: "Which modern TLS revision removed legacy cipher suites and cut TLS handshake latency to 1-RTT?",
        options: ["TLS 1.3", "TLS 1.0", "SSL 3.0", "TLS 1.1"],
        correctIndex: 0
      },
      {
        id: 13,
        difficulty: "medium",
        question: "Which security model operates on the doctrine of 'Never trust, always verify' across all network traffic?",
        options: ["Zero Trust Architecture", "Perimeter Defense", "DMZ Network", "Default Gateway Trust"],
        correctIndex: 0
      },
      {
        id: 14,
        difficulty: "medium",
        question: "What compact, URL-safe JSON container standard is widely used for cryptographically signed web API claims?",
        options: ["JWT (JSON Web Token)", "XML SAML 1.0", "YAML Stamp", "OAuth Cookie 1.0"],
        correctIndex: 0
      },
      {
        id: 15,
        difficulty: "medium",
        question: "Which HTTP header enforces that clients only connect to a site using secure HTTPS exclusively?",
        options: ["HSTS (HTTP Strict Transport Security)", "CORS Origin", "X-Frame-Options", "Content-Type-Options"],
        correctIndex: 0
      },
      {
        id: 16,
        difficulty: "medium",
        question: "What vulnerability permits malicious JavaScript injection into pages viewed by other users?",
        options: ["XSS (Cross-Site Scripting)", "CSRF", "SQL Injection", "Path Traversal"],
        correctIndex: 0
      },
      {
        id: 17,
        difficulty: "medium",
        question: "Which fundamental exterior gateway routing protocol directs IP packet paths between Autonomous Systems (AS)?",
        options: ["BGP (Border Gateway Protocol)", "OSPF", "RIP v2", "EIGRP"],
        correctIndex: 0
      },
      {
        id: 18,
        difficulty: "medium",
        question: "What geographically distributed network of proxy edge nodes accelerates static web asset delivery?",
        options: ["CDN (Content Delivery Network)", "P2P Tracker", "Reverse DNS", "Edge Router Subnet"],
        correctIndex: 0
      },
      {
        id: 19,
        difficulty: "medium",
        question: "What is the ubiquitous symmetric cipher standard (Rijndael) adopted globally for encryption?",
        options: ["AES (Advanced Encryption Standard)", "Legacy DES", "RC4", "MD5"],
        correctIndex: 0
      },
      {
        id: 20,
        difficulty: "medium",
        question: "What passwordless cryptographic authentication standard was standardized by the FIDO Alliance?",
        options: ["Passkeys", "Master Password", "Magic SMS Link", "Captcha v2"],
        correctIndex: 0
      },

      // 10 HARD
      {
        id: 21,
        difficulty: "hard",
        question: "Which ephemeral key exchange method ensures 'Perfect Forward Secrecy' even if long-term private keys leak?",
        options: ["ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)", "Static RSA Key Exchange", "Fixed Pre-Shared Key", "Triple DES ECB"],
        correctIndex: 0
      },
      {
        id: 22,
        difficulty: "hard",
        question: "Which cryptographic collision exploit stems from the mathematical probability of matching samples in a group?",
        options: ["Birthday Attack", "Pigeonhole Principle", "Monty Hall Problem", "Fibonacci Lattice"],
        correctIndex: 0
      },
      {
        id: 23,
        difficulty: "hard",
        question: "Which modern browser architecture partitions web origin domains into distinct sandboxed OS processes?",
        options: ["Site Isolation", "Just-In-Time Compilation", "Cross-Origin Embedding", "Memory Garbage Pool"],
        correctIndex: 0
      },
      {
        id: 24,
        difficulty: "hard",
        question: "What open encryption protocol based on a decentralized Web of Trust was authored by Phil Zimmermann?",
        options: ["PGP (Pretty Good Privacy)", "S/MIME", "DKIM", "DMARC"],
        correctIndex: 0
      },
      {
        id: 25,
        difficulty: "hard",
        question: "Which DNS TXT record lists IP addresses authorized to send emails on behalf of a given domain?",
        options: ["SPF (Sender Policy Framework)", "CNAME Record", "PTR Reverse", "SOA Record"],
        correctIndex: 0
      },
      {
        id: 26,
        difficulty: "hard",
        question: "The 2014 Heartbleed vulnerability was a catastrophic memory over-read flaw in which software library?",
        options: ["OpenSSL (TLS Heartbeat Extension)", "LibreSSL", "GnuTLS Core", "NSS Mozilla"],
        correctIndex: 0
      },
      {
        id: 27,
        difficulty: "hard",
        question: "What publicly auditable framework championed by Google mandates logging SSL/TLS certificate issuance?",
        options: ["Certificate Transparency (CT Logs)", "OCSP Stapling Live", "CRL Distribution Point", "Let's Encrypt ACME"],
        correctIndex: 0
      },
      {
        id: 28,
        difficulty: "hard",
        question: "Which memory-hard password hashing algorithm won the Password Hashing Competition (PHC) against GPU attacks?",
        options: ["Argon2id", "SHA-256", "MD5", "CRC32"],
        correctIndex: 0
      },
      {
        id: 29,
        difficulty: "hard",
        question: "What space-efficient probabilistic data structure is utilized to rapidly test malicious URL membership?",
        options: ["Bloom Filter", "Red-Black Tree", "Hash Map B-Tree", "Linked List Ring"],
        correctIndex: 0
      },
      {
        id: 30,
        difficulty: "hard",
        question: "Which cryptographic framework binds IP address blocks and ASNs to prevent global BGP Route Hijacking?",
        options: ["RPKI (Resource Public Key Infrastructure)", "DNSSEC", "Anycast GeoIP", "MPLS Tagging"],
        correctIndex: 0
      }
    ],

    // SESI 5: GRAND FINALE & FUTURE TECH
    session5: [
      {
        id: 1,
        difficulty: "easy",
        question: "What is the fundamental unit of quantum information capable of existing in superposition?",
        options: ["Qubit (Quantum Bit)", "Binary Bit", "Byte", "Pixel"],
        correctIndex: 0
      },
      {
        id: 2,
        difficulty: "easy",
        question: "What computing paradigm performs processing locally on the client device rather than in distant cloud servers?",
        options: ["Edge Computing (Edge AI)", "Mainframe Central", "Cold Storage", "FTP Archival"],
        correctIndex: 0
      },
      {
        id: 3,
        difficulty: "easy",
        question: "Self-driving autonomous vehicles navigate physical streets using cameras, radars, and pulsing laser sensors called...",
        options: ["LiDAR", "NFC", "FM Radio", "Barcode Reader"],
        correctIndex: 0
      },
      {
        id: 4,
        difficulty: "easy",
        question: "Which fifth-generation cellular telecom standard delivers sub-5ms low latency communication?",
        options: ["5G", "4G LTE", "3G HSDPA", "GPRS"],
        correctIndex: 0
      },
      {
        id: 5,
        difficulty: "easy",
        question: "What was Google's 53-qubit superconducting quantum processor that claimed Quantum Supremacy in 2019 named?",
        options: ["Sycamore", "Willow", "Eagle", "Condor"],
        correctIndex: 0
      },
      {
        id: 6,
        difficulty: "easy",
        question: "What low-level binary code format enables compiled C++/Rust to execute inside web browsers at near-native speeds?",
        options: ["WebAssembly (Wasm)", "ActiveX", "Adobe Flash", "Java Applet"],
        correctIndex: 0
      },
      {
        id: 7,
        difficulty: "easy",
        question: "Which company is developing direct brain-computer interfaces (BCI) with implantable thread electrodes?",
        options: ["Neuralink", "OpenAI", "Boston Dynamics", "Waymo"],
        correctIndex: 0
      },
      {
        id: 8,
        difficulty: "easy",
        question: "What is Alphabet's autonomous commercial self-driving robotaxi enterprise called?",
        options: ["Waymo", "Tesla FSD", "Uber Autonomous", "Cruise"],
        correctIndex: 0
      },
      {
        id: 9,
        difficulty: "easy",
        question: "What technology manufactures three-dimensional physical structures layer by layer from CAD models?",
        options: ["3D Printing (Additive Manufacturing)", "Laser Hologram", "Lithography Subtractive", "Offset Press"],
        correctIndex: 0
      },
      {
        id: 10,
        difficulty: "easy",
        question: "Which engineering firm engineered the acrobatic Atlas humanoid robot capable of parkour?",
        options: ["Boston Dynamics", "Sony Robotics", "Honda Asimo Team", "iRobot Home"],
        correctIndex: 0
      },

      // 10 MEDIUM
      {
        id: 11,
        difficulty: "medium",
        question: "What quantum mechanical phenomenon links two particles such that the state of one instantaneously determines the other?",
        options: ["Quantum Entanglement", "Quantum Tunneling", "Wave-Particle Duality", "Zero-Point Energy"],
        correctIndex: 0
      },
      {
        id: 12,
        difficulty: "medium",
        question: "Which modern web standard succeeds WebGL to provide low-overhead, direct compute and graphics access to GPUs?",
        options: ["WebGPU", "Vulkan Desktop", "DirectX 12 Ultimate", "Metal Native"],
        correctIndex: 0
      },
      {
        id: 13,
        difficulty: "medium",
        question: "In December 2024, Google Quantum AI unveiled its state-of-the-art 105-qubit quantum chip named...",
        options: ["Willow", "Sycamore", "Bristlecone", "Foxtail"],
        correctIndex: 0
      },
      {
        id: 14,
        difficulty: "medium",
        question: "What cryptographic domain encompasses mathematical algorithms resistant to cryptanalysis by quantum computers?",
        options: ["Post-Quantum Cryptography (PQC)", "Quantum Key Distribution", "Elliptic Curve 256", "Triple RSA"],
        correctIndex: 0
      },
      {
        id: 15,
        difficulty: "medium",
        question: "Which quantum algorithm can factor large composite integers in polynomial time, threatening RSA encryption?",
        options: ["Shor's Algorithm", "Grover's Algorithm", "Deutsch-Jozsa Algorithm", "Bernstein-Vazirani"],
        correctIndex: 0
      },
      {
        id: 16,
        difficulty: "medium",
        question: "Which satellite constellation deployment in Low Earth Orbit (LEO) provides low-latency global broadband internet?",
        options: ["Starlink & Project Kuiper", "Geostationary Inmarsat", "Iridium Voice Only", "GPS Block III"],
        correctIndex: 0
      },
      {
        id: 17,
        difficulty: "medium",
        question: "What computational architecture mimics the spike-based neural processing of the biological human brain?",
        options: ["Neuromorphic Computing", "Quantum Annealing", "Optical Fiber Switching", "Cellular Automata"],
        correctIndex: 0
      },
      {
        id: 18,
        difficulty: "medium",
        question: "What cryptographic technique allows analytical operations to be executed directly over ciphertexts without decryption?",
        options: ["FHE (Fully Homomorphic Encryption)", "Symmetric Block Cipher", "Diffie-Hellman Key Exchange", "Digital Steganography"],
        correctIndex: 0
      },
      {
        id: 19,
        difficulty: "medium",
        question: "Which formally verified, high-assurance microkernel operating system guarantees mathematical proof of bug-free security?",
        options: ["seL4 Microkernel", "Generic FreeRTOS", "VxWorks Classic", "QNX Neutrino"],
        correctIndex: 0
      },
      {
        id: 20,
        difficulty: "medium",
        question: "Photonic computing leverages which elementary particles of light to execute calculations at lightspeed?",
        options: ["Photons", "Neutrons", "Positrons", "Gluons"],
        correctIndex: 0
      },

      // 10 HARD
      {
        id: 21,
        difficulty: "hard",
        question: "Which prominent 2D geometric lattice quantum error-correcting architecture encodes fault-tolerant logical qubits?",
        options: ["Surface Code", "Shor 9-qubit Code", "Steane Code", "Bacon-Shor Subsystem"],
        correctIndex: 0
      },
      {
        id: 22,
        difficulty: "hard",
        question: "Which lattice-based signature scheme was standardized by NIST for primary post-quantum digital signatures?",
        options: ["ML-DSA (Dilithium) & SLH-DSA (SPHINCS+)", "RSA-4096", "ECDSA P-384", "Diffie-Hellman MODP"],
        correctIndex: 0
      },
      {
        id: 23,
        difficulty: "hard",
        question: "Which quantum search algorithm delivers a quadratic speedup of $O(\\sqrt{N})$ over unstructured search spaces?",
        options: ["Grover's Algorithm", "Shor's Factoring", "Quantum Phase Estimation", "HHL Linear Solver"],
        correctIndex: 0
      },
      {
        id: 24,
        difficulty: "hard",
        question: "What donut-shaped magnetic confinement fusion reactor vessel is utilized in the ITER global fusion project?",
        options: ["Tokamak", "Stellarator", "Inertial Confinement Laser", "Z-Pinch Fusion"],
        correctIndex: 0
      },
      {
        id: 25,
        difficulty: "hard",
        question: "What physical state of matter exhibits exact zero electrical resistance below a critical transition temperature?",
        options: ["Superconductivity", "Paramagnetism", "Piezoelectricity", "Quantum Hall Effect"],
        correctIndex: 0
      },
      {
        id: 26,
        difficulty: "hard",
        question: "Which autonomous software paradigm orchestrates multiple communicating AI models with distinct tool privileges?",
        options: ["Multi-Agent Systems (MAS)", "Monolithic Feedforward", "Static Finite State Machine", "Linear Regression Pipeline"],
        correctIndex: 0
      },
      {
        id: 27,
        difficulty: "hard",
        question: "Which thermodynamic principle sets the absolute minimum physical energy dissipation when erasing one bit of data?",
        options: ["Landauer's Principle", "Bekenstein Bound", "Carnot Efficiency Limit", "Shannon-Hartley Theorem"],
        correctIndex: 0
      },
      {
        id: 28,
        difficulty: "hard",
        question: "What zero-knowledge cryptographic proof construct enables rapid verification of complex proofs in concise payloads?",
        options: ["zk-SNARKs", "Proof of Work (PoW)", "PBFT Consensus", "Raft State Machine"],
        correctIndex: 0
      },
      {
        id: 29,
        difficulty: "hard",
        question: "Which macromolecular biological medium can theoretically store hundreds of petabytes of archival data per gram?",
        options: ["Synthetic DNA Data Storage", "Optical Holographic Quartz", "Magnetoresistive MRAM", "Barium Ferrite Tape"],
        correctIndex: 0
      },
      {
        id: 30,
        difficulty: "hard",
        question: "At what cryogenic operating temperature inside dilution refrigerators do Google's superconducting qubits compute?",
        options: ["~15 millikelvin (-273.135°C / close to absolute zero)", "0°C", "-70°C", "77 Kelvin (-196°C)"],
        correctIndex: 0
      }
    ]
  }
};

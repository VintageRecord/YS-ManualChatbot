import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  ArrowLeft,
  Bot,
  User,
  BookOpen,
  DollarSign,
  FileText,
  HelpCircle,
  ChevronRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import logoImg from "../../imports/image.png";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
  quickReplies?: string[];
}

interface KnowledgeEntry {
  keywords: string[];
  response: string;
  quickReplies?: string[];
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ["hello", "hi", "helo", "hai", "selamat", "start", "mula", "help", "tolong"],
    response:
      "Hello! Selamat datang ke Pembantu Kewangan Pendidikan Yayasan Sabah! 🎓\n\nSaya di sini untuk membantu anda mengenai:\n• Biasiswa & tajaan pendidikan\n• Pinjaman pelajar (PTPTN, JPA, MARA)\n• Kriteria kelayakan\n• Proses permohonan\n• Soalan lazim kewangan pendidikan\n\nBoleh saya bantu anda dengan apa?",
    quickReplies: [
      "Tentang Biasiswa Yayasan Sabah",
      "Pinjaman PTPTN",
      "Biasiswa JPA",
      "Panduan Permohonan",
    ],
  },
  {
    keywords: ["yayasan sabah", "biasiswa ys", "tajaan ys", "ys scholarship", "biasiswa sabah"],
    response:
      "🏫 **Biasiswa Yayasan Sabah**\n\nYayasan Sabah menawarkan pelbagai program biasiswa untuk pelajar Sabah cemerlang:\n\n**Program Biasiswa Utama:**\n1. **Biasiswa Penuh** – Menanggung yuran pengajian, elaun sara hidup, buku, dan tempat tinggal\n2. **Biasiswa Separuh** – Menanggung yuran pengajian sahaja\n3. **Pinjaman Boleh Balik** – Pinjaman dengan syarat boleh dilepas selepas berkhidmat\n\n**Bidang Pengajian yang Ditawarkan:**\n• Sains & Teknologi\n• Perubatan & Kesihatan\n• Undang-undang\n• Kejuruteraan\n• Perniagaan & Ekonomi\n• Pendidikan\n\nBoleh anda beritahu saya bidang pengajian yang anda minati?",
    quickReplies: [
      "Kelayakan Biasiswa YS",
      "Cara Memohon Biasiswa YS",
      "Dokumen Diperlukan",
      "Nilai Biasiswa",
    ],
  },
  {
    keywords: ["kelayakan biasiswa ys", "syarat biasiswa ys", "layak biasiswa", "kelayakan ys"],
    response:
      "✅ **Kelayakan Biasiswa Yayasan Sabah**\n\n**Syarat Asas:**\n• Warganegara Malaysia yang bermastautin di Sabah\n• Bumiputera Sabah (keutamaan)\n• Berumur tidak melebihi 25 tahun\n\n**Syarat Akademik:**\n• SPM: Minimum 5A (untuk peringkat diploma)\n• STPM/Matrikulasi: CGPA 3.0 ke atas\n• Ijazah: CGPA 3.5 ke atas (untuk pasca siswazah)\n\n**Syarat Kewangan:**\n• Pendapatan isi rumah tidak melebihi RM 5,000 sebulan (biasiswa penuh)\n• RM 5,001 – RM 10,000 (biasiswa separuh)\n\n**Syarat Tambahan:**\n• Tiada rekod jenayah\n• Sihat dari segi jasmani dan rohani\n• Aktif dalam kokurikulum (kelebihan)",
    quickReplies: [
      "Cara Memohon Biasiswa YS",
      "Dokumen Diperlukan",
      "Biasiswa JPA",
      "Pinjaman PTPTN",
    ],
  },
  {
    keywords: ["cara mohon biasiswa ys", "permohonan biasiswa ys", "apply biasiswa ys", "langkah biasiswa ys"],
    response:
      "📋 **Cara Memohon Biasiswa Yayasan Sabah**\n\n**Langkah 1: Semak Kelayakan**\nPastikan anda memenuhi semua syarat asas dan akademik yang ditetapkan.\n\n**Langkah 2: Sediakan Dokumen**\n• Sijil akademik (SPM/STPM/Diploma)\n• Kad Pengenalan & Kad Pengenalan ibu bapa\n• Slip gaji/Surat pendapatan ibu bapa\n• Surat tawaran universiti\n• Gambar terbaru berlatarbelakang biru\n• Surat rujukan dari guru/pensyarah\n\n**Langkah 3: Mohon Dalam Talian**\n• Layari portal rasmi Yayasan Sabah\n• Daftar akaun baru\n• Isi borang permohonan\n• Muat naik dokumen sokongan\n\n**Langkah 4: Temuduga**\n• Tunggu panggilan temuduga (1–3 bulan)\n• Hadir temuduga di pejabat Yayasan Sabah, KK\n\n**Langkah 5: Keputusan**\n• Keputusan dimaklumkan melalui e-mel/surat\n• Tandatangan perjanjian biasiswa",
    quickReplies: [
      "Dokumen Diperlukan",
      "Tarikh Permohonan",
      "Tips Temuduga",
      "Nilai Biasiswa",
    ],
  },
  {
    keywords: ["nilai biasiswa", "jumlah biasiswa", "berapa biasiswa", "elaun biasiswa"],
    response:
      "💰 **Nilai Biasiswa Yayasan Sabah**\n\n**Biasiswa Penuh (Dalam Negara):**\n• Yuran pengajian: Ditanggung penuh\n• Elaun sara hidup: RM 800 – RM 1,200/bulan\n• Elaun buku: RM 1,000/tahun\n• Elaun komputer riba: RM 3,000 (sekali sahaja)\n• Tempat tinggal: Disediakan atau elaun RM 300/bulan\n\n**Biasiswa Penuh (Luar Negara):**\n• Yuran pengajian: Ditanggung penuh\n• Elaun sara hidup: USD 1,500 – USD 2,500/bulan\n• Tiket kapal terbang pulang-pergi: Setahun sekali\n• Insurans kesihatan: Ditanggung penuh\n\n**Biasiswa Separuh:**\n• Yuran pengajian: 50% ditanggung\n• Elaun sara hidup: RM 400 – RM 600/bulan",
    quickReplies: [
      "Cara Memohon Biasiswa YS",
      "Obligasi Selepas Tamat Belajar",
      "Pinjaman PTPTN",
      "Biasiswa JPA",
    ],
  },
  {
    keywords: ["obligasi", "ikatan", "bond", "syarat selepas", "kena kerja"],
    response:
      "⚖️ **Obligasi Pemegang Biasiswa**\n\nSetelah menerima biasiswa Yayasan Sabah, anda perlu memenuhi obligasi berikut:\n\n**Biasiswa Dalam Negara:**\n• Wajib berkhidmat dengan Kerajaan Negeri Sabah atau badan berkaitan Yayasan Sabah selama **2x tempoh pengajian**\n• Contoh: Pengajian 3 tahun = 6 tahun berkhidmat\n\n**Biasiswa Luar Negara:**\n• Wajib berkhidmat selama **3x tempoh pengajian** di Sabah\n• Diutamakan untuk penempatan dalam agensi kerajaan negeri\n\n**Jika Gagal Memenuhi Obligasi:**\n• Perlu membayar balik keseluruhan nilai biasiswa\n• Dikenakan faedah 4% setahun\n• Tindakan undang-undang boleh diambil\n\n**Pelepasan Obligasi:**\n• Disebabkan kesihatan (dengan bukti perubatan)\n• Arahan khusus daripada YB Ketua Menteri",
    quickReplies: [
      "Cara Memohon Biasiswa YS",
      "Pinjaman PTPTN",
      "Biasiswa JPA",
      "Semak Kelayakan",
    ],
  },
  {
    keywords: ["ptptn", "pinjaman ptptn", "loan ptptn", "tabung pendidikan"],
    response:
      "🏦 **Pinjaman PTPTN (Perbadanan Tabung Pendidikan Tinggi Nasional)**\n\nPTPTN adalah pinjaman pendidikan utama yang ditawarkan oleh kerajaan Malaysia.\n\n**Jenis Pinjaman:**\n• **Pinjaman Standard** – Untuk semua pelajar layak\n• **Pinjaman Khas Pendapatan Rendah** – Yuran penuh ditanggung (pendapatan < RM 4,000)\n\n**Jumlah Pinjaman (Semester):**\n• Diploma: RM 5,000 – RM 10,000\n• Ijazah: RM 8,000 – RM 20,000\n• Luar Negara: Sehingga RM 100,000/tahun\n\n**Kadar Faedah:**\n• 1% setahun (sangat rendah berbanding pinjaman komersial)\n\n**Cara Bayar Balik:**\n• Bermula 12 bulan selepas tamat pengajian\n• Minimum RM 150 sebulan\n• Boleh dilanjutkan sehingga 20 tahun",
    quickReplies: [
      "Kelayakan PTPTN",
      "Cara Mohon PTPTN",
      "Pengecualian Bayar Balik PTPTN",
      "Dokumen PTPTN",
    ],
  },
  {
    keywords: ["kelayakan ptptn", "syarat ptptn", "layak ptptn"],
    response:
      "✅ **Kelayakan Permohonan PTPTN**\n\n**Syarat Utama:**\n• Warganegara Malaysia\n• Berumur tidak melebihi 45 tahun (semasa memohon)\n• Berdaftar di institusi pengajian tinggi (IPT) awam atau swasta yang diluluskan\n• Tidak pernah diisytiharkan bankrap\n\n**Syarat Akademik:**\n• Pelajar sepenuh masa\n• CGPA minimum 2.0 (untuk pembaharuan pinjaman)\n\n**Had Pendapatan (Pinjaman Khas):**\n• Pendapatan ibu bapa < RM 4,000/bulan → Pinjaman penuh yuran\n• RM 4,001 – RM 10,000/bulan → 50% pinjaman\n• > RM 10,000/bulan → 45% pinjaman\n\n**Tidak Layak Jika:**\n• Sudah mendapat biasiswa penuh\n• Menerima tajaan yang menanggung yuran penuh",
    quickReplies: [
      "Cara Mohon PTPTN",
      "Dokumen PTPTN",
      "Pengecualian Bayar Balik PTPTN",
      "Biasiswa YS",
    ],
  },
  {
    keywords: ["cara mohon ptptn", "permohonan ptptn", "apply ptptn", "langkah ptptn"],
    response:
      "📋 **Cara Memohon PTPTN – Langkah Demi Langkah**\n\n**Langkah 1: Daftar MyPTPTN**\n• Layari portal ptptn.gov.my\n• Klik 'Daftar' dan isi maklumat peribadi\n• Sahkan akaun melalui e-mel\n\n**Langkah 2: Log Masuk & Isi Borang**\n• Log masuk ke portal MyPTPTN\n• Pilih 'Permohonan Baharu'\n• Isi maklumat peribadi, keluarga, dan pengajian\n\n**Langkah 3: Muat Naik Dokumen**\n• Kad Pengenalan pemohon & ibu bapa\n• Slip gaji/Borang BE ibu bapa\n• Surat tawaran IPT\n• Sijil SPM/STPM\n• Penyata akaun bank\n\n**Langkah 4: Hantar & Pantau Status**\n• Hantar permohonan dalam talian\n• Semak status melalui portal MyPTPTN\n• Proses kelulusan: 2–4 minggu\n\n**Langkah 5: Tandatangan Perjanjian**\n• Hadir ke cawangan PTPTN berdekatan\n• Bawa dokumen asal untuk pengesahan\n• Tandatangan perjanjian pinjaman",
    quickReplies: [
      "Dokumen PTPTN",
      "Pengecualian Bayar Balik PTPTN",
      "Kelayakan PTPTN",
      "Biasiswa JPA",
    ],
  },
  {
    keywords: ["pengecualian ptptn", "lepas bayar ptptn", "waive ptptn", "convert ptptn biasiswa"],
    response:
      "🎉 **Pengecualian Bayar Balik PTPTN**\n\nPinjaman PTPTN anda boleh ditukar kepada biasiswa (tidak perlu dibayar balik) jika anda:\n\n**1. Pencapaian Akademik Cemerlang:**\n• Graduasi dengan Ijazah Kelas Pertama (CGPA ≥ 3.75)\n• Pinjaman penuh dilepaskan\n\n**2. Pendapatan Rendah:**\n• Pendapatan isi rumah < RM 4,000/bulan selepas graduasi\n• Permohonan penangguhan bayaran tersedia\n\n**3. Kecacatan Kekal:**\n• Pemegang pinjaman yang mendapat kecacatan kekal\n• Pinjaman dilepaskan sepenuhnya\n\n**4. Kematian:**\n• Baki pinjaman dilepaskan sepenuhnya\n\n**Diskaun Bayar Balik:**\n• Bayar sepenggal (lump sum): Diskaun 20%\n• Bayar tepat waktu berturut-turut: Diskaun 10%\n\n**Cara Mohon Pengecualian:**\n• Mohon melalui portal MyPTPTN selepas graduasi",
    quickReplies: [
      "Cara Mohon PTPTN",
      "Biasiswa YS",
      "Biasiswa JPA",
      "Pinjaman MARA",
    ],
  },
  {
    keywords: ["jpa", "biasiswa jpa", "jabatan perkhidmatan awam", "jpa scholarship"],
    response:
      "🌟 **Biasiswa JPA (Jabatan Perkhidmatan Awam)**\n\nBiasiswa JPA adalah antara biasiswa paling bergengsi di Malaysia, ditawarkan untuk pengajian dalam dan luar negara.\n\n**Program Biasiswa JPA:**\n1. **Biasiswa Persekutuan** – Untuk lepasan SPM ke universiti luar negara\n2. **Biasiswa Kecemerlangan** – Untuk pelajar ijazah pertama dalam negara\n3. **Biasiswa Hadiah Latihan Persekutuan (HLP)** – Untuk penjawat awam\n\n**Kelayakan Asas:**\n• Warganegara Malaysia\n• Keputusan SPM cemerlang (8A+ ke atas untuk luar negara)\n• CGPA 3.7+ (untuk peringkat ijazah)\n• Aktif dalam kokurikulum/kepimpinan\n\n**Nilai Biasiswa (Luar Negara):**\n• Yuran pengajian penuh\n• Elaun sara hidup: GBP 12,000–15,000/tahun (UK)\n• Tiket penerbangan tahunan\n• Elaun pakaian & buku\n\n**Obligasi:** 5–10 tahun berkhidmat dalam sektor awam",
    quickReplies: [
      "Cara Mohon Biasiswa JPA",
      "Kelayakan Biasiswa JPA",
      "Biasiswa YS",
      "Pinjaman PTPTN",
    ],
  },
  {
    keywords: ["cara mohon jpa", "permohonan jpa", "apply jpa"],
    response:
      "📋 **Cara Memohon Biasiswa JPA**\n\n**Langkah 1: Pantau Pengumuman**\n• JPA biasanya membuka permohonan setiap tahun (Jan–Mac)\n• Semak portal rasmi MyGOV atau esilav.jpa.gov.my\n\n**Langkah 2: Daftar Portal JPA**\n• Layari esilav.jpa.gov.my\n• Cipta akaun dengan Nombor IC\n• Masukkan keputusan SPM/STPM\n\n**Langkah 3: Isi Borang Permohonan**\n• Pilih program & bidang pengajian\n• Isi maklumat akademik & kokurikulum\n• Nyatakan universiti pilihan (luar negara)\n\n**Langkah 4: Sediakan Dokumen**\n• Kad Pengenalan\n• Slip SPM/STPM asal\n• Sijil kokurikulum & penghargaan\n• Surat sokongan sekolah\n• Gambar passport\n\n**Langkah 5: Temuduga & Ujian**\n• Ujian psikometrik dalam talian\n• Temuduga panel di Putrajaya\n• Ujian fizikal (untuk program tertentu)\n\n**Tempoh Keputusan:** 3–6 bulan",
    quickReplies: [
      "Kelayakan Biasiswa JPA",
      "Biasiswa YS",
      "Pinjaman MARA",
      "Tips Temuduga",
    ],
  },
  {
    keywords: ["mara", "pinjaman mara", "biasiswa mara", "majlis amanah rakyat"],
    response:
      "🏛️ **Pinjaman & Biasiswa MARA (Majlis Amanah Rakyat)**\n\nMARA menawarkan pinjaman pendidikan dan biasiswa khusus untuk pelajar Bumiputera.\n\n**Program MARA:**\n1. **Biasiswa MARA** – Untuk pelajar luar negara cemerlang\n2. **Pinjaman Pendidikan MARA** – Kadar faedah rendah 3%\n3. **Program Asasi MARA** – Untuk persediaan ke luar negara\n\n**Kelayakan:**\n• Warganegara Malaysia (Bumiputera)\n• SPM: Minimum 5A (pinjaman) / 8A (biasiswa)\n• CGPA 3.5+ (peringkat ijazah)\n• Pendapatan keluarga < RM 10,000/bulan\n\n**Jumlah Pinjaman:**\n• Diploma: RM 15,000 – RM 25,000/tahun\n• Ijazah Dalam Negara: RM 20,000 – RM 40,000/tahun\n• Ijazah Luar Negara: Sehingga RM 100,000/tahun\n\n**Cara Mohon:**\n• Layari portal mara.gov.my\n• Isi borang dalam talian\n• Hantar dokumen ke pejabat MARA terdekat",
    quickReplies: [
      "Pinjaman PTPTN",
      "Biasiswa JPA",
      "Biasiswa YS",
      "Panduan Permohonan Am",
    ],
  },
  {
    keywords: ["dokumen", "dokumen diperlukan", "senarai dokumen", "apa dokumen"],
    response:
      "📂 **Dokumen Yang Diperlukan (Umum)**\n\nBerikut adalah senarai dokumen yang biasanya diperlukan untuk semua permohonan biasiswa/pinjaman:\n\n**Dokumen Peribadi:**\n☐ Kad Pengenalan pemohon (salinan)\n☐ Sijil Lahir\n☐ Gambar terbaru berlatarbelakang biru (4 keping)\n\n**Dokumen Akademik:**\n☐ Sijil SPM (asal & salinan)\n☐ Sijil STPM/Diploma/Ijazah (jika ada)\n☐ Transkrip akademik terkini\n☐ Surat tawaran institusi pengajian\n\n**Dokumen Keluarga:**\n☐ Kad Pengenalan ibu bapa/penjaga\n☐ Slip gaji ibu bapa (3 bulan terkini)\n☐ Borang BE/B (jika berniaga sendiri)\n☐ Sijil kematian (jika ibu bapa meninggal)\n☐ Surat cerai (jika berkenaan)\n\n**Dokumen Sokongan:**\n☐ Sijil kokurikulum & pencapaian\n☐ Surat rujukan dari guru/pengetua\n☐ Penyata akaun bank (3 bulan)\n\n💡 **Tip:** Sediakan 3 set salinan untuk setiap dokumen!",
    quickReplies: [
      "Cara Memohon Biasiswa YS",
      "Cara Mohon PTPTN",
      "Tips Permohonan",
      "Tarikh Permohonan",
    ],
  },
  {
    keywords: ["tips", "nasihat", "petua", "tip permohonan", "tips temuduga"],
    response:
      "💡 **Tips Permohonan Biasiswa Yang Berjaya**\n\n**1. Mulakan Awal**\n• Kumpul semua dokumen 1–2 bulan sebelum tarikh tutup\n• Semak keputusan peperiksaan dan pastikan betul\n\n**2. Tulis Esei Peribadi Yang Menarik**\n• Ceritakan kisah unik anda\n• Jelaskan kenapa anda layak dan apa sumbangan anda kelak\n• Elakkan ayat klise: \"Saya ingin membantu masyarakat...\"\n\n**3. Dapatkan Surat Rujukan Terbaik**\n• Dari guru yang kenal anda dengan baik\n• Sertakan pencapaian spesifik anda\n• Minta sekurang-kurangnya 2 minggu sebelum tarikh hantar\n\n**4. Semak Semula Borang**\n• Baca semua soalan dengan teliti\n• Elak kesilapan ejaan dan tatabahasa\n• Mohon rakan atau ibu bapa semak\n\n**5. Sediakan Diri untuk Temuduga**\n• Ketahui latar belakang pemberi biasiswa\n• Latih kemahiran komunikasi\n• Berpakaian kemas dan profesional\n• Tiba 30 minit awal\n\n**6. Mohon Pelbagai Biasiswa**\n• Jangan hanya bergantung pada satu\n• Setiap biasiswa ada peluang yang berbeza",
    quickReplies: [
      "Cara Memohon Biasiswa YS",
      "Cara Mohon Biasiswa JPA",
      "Dokumen Diperlukan",
      "Tarikh Permohonan",
    ],
  },
  {
    keywords: ["tarikh", "deadline", "bila buka", "tarikh tutup", "bila mohon"],
    response:
      "📅 **Tarikh Permohonan Biasiswa & Pinjaman**\n\n**Biasiswa Yayasan Sabah:**\n• Permohonan dibuka: Biasanya Mac – Mei setiap tahun\n• Tarikh tutup: Bergantung kepada program\n• Keputusan: Jun – Ogos\n\n**Biasiswa JPA:**\n• Permohonan dibuka: Januari – Mac setiap tahun\n• Keputusan temuduga: April – Mei\n• Keputusan akhir: Jun – Julai\n\n**PTPTN:**\n• Permohonan dibuka: Sepanjang tahun\n• Mohon segera selepas menerima surat tawaran IPT\n• Proses kelulusan: 2–4 minggu\n\n**MARA:**\n• Permohonan biasiswa: Februari – April\n• Pinjaman pendidikan: Sepanjang tahun\n\n⚠️ **Penting:** Tarikh boleh berubah setiap tahun. Sentiasa semak portal rasmi masing-masing untuk maklumat terkini.\n\n📌 **Portal Rasmi:**\n• Yayasan Sabah: yayasansabah.gov.my\n• JPA: esilav.jpa.gov.my\n• PTPTN: ptptn.gov.my\n• MARA: mara.gov.my",
    quickReplies: [
      "Cara Memohon Biasiswa YS",
      "Cara Mohon PTPTN",
      "Dokumen Diperlukan",
      "Tips Permohonan",
    ],
  },
  {
    keywords: ["beza biasiswa pinjaman", "beza", "difference", "loan vs scholarship"],
    response:
      "🤔 **Perbezaan Biasiswa vs Pinjaman Pendidikan**\n\n| | **Biasiswa** | **Pinjaman** |\n|---|---|---|\n| **Bayar Balik** | Tidak perlu | Perlu dibayar balik |\n| **Faedah** | Tiada | Ada (PTPTN: 1%, MARA: 3%) |\n| **Obligasi** | Berkhidmat (bond) | Tiada (bayar je) |\n| **Kelayakan** | Sangat ketat | Lebih longgar |\n| **Nilai** | Biasanya lebih tinggi | Terhad mengikut tahap |\n| **Persaingan** | Sangat tinggi | Rendah |\n\n**Cadangan Strategi:**\n1. Mohon biasiswa dahulu (pilihan terbaik)\n2. Jika tidak berjaya, ambil PTPTN\n3. Boleh gabung: Biasiswa separuh + PTPTN\n\n💡 Pemegang biasiswa YS yang mempunyai pinjaman PTPTN boleh menuntut pembayaran balik PTPTN daripada Yayasan Sabah dalam sesetengah kes.",
    quickReplies: [
      "Tentang Biasiswa Yayasan Sabah",
      "Pinjaman PTPTN",
      "Biasiswa JPA",
      "Tips Permohonan",
    ],
  },
  {
    keywords: ["universiti", "ipt", "kolej", "institusi", "mana universiti"],
    response:
      "🎓 **Universiti & IPT Yang Diiktiraf**\n\n**Institusi Awam (IPTA) Dalam Negara:**\n• UMS – Universiti Malaysia Sabah\n• UPM, UM, UTM, UKM, USM, UiTM dan lain-lain\n• Politeknik & Kolej Komuniti KPT\n\n**Institusi Swasta (IPTS) Dalam Negara:**\n• UTAR, HELP, Taylor's, Sunway, Curtin Malaysia\n• UNITAR, OUM, UPSI Cawangan\n• Mesti mendapat kelulusan KPT\n\n**Universiti Luar Negara (Untuk Biasiswa JPA/MARA):**\n• UK: Oxford, Cambridge, Imperial, UCL, Manchester\n• Australia: Melbourne, ANU, Monash, Sydney\n• AS: MIT, Caltech, Ivy League\n• Jepun/Germany: Universiti teknikal terkemuka\n\n**Semak Senarai Penuh:**\n• Portal KPT: kpt.gov.my\n• Semak sama ada program anda diiktiraf MQA\n\n💡 Pastikan universiti dan program anda mendapat pengiktirafan MQA (Malaysian Qualifications Agency) untuk layak mendapat biasiswa/pinjaman kerajaan.",
    quickReplies: [
      "Biasiswa YS",
      "Pinjaman PTPTN",
      "Kelayakan PTPTN",
      "Panduan Permohonan",
    ],
  },
  {
    keywords: ["hubungi", "telefon", "emel", "contact", "alamat", "office"],
    response:
      "📞 **Hubungi Yayasan Sabah**\n\n**Ibu Pejabat:**\n📍 Menara Tun Mustapha\nTeluk Likas, Peti Surat 11623\n88817 Kota Kinabalu, Sabah\n\n📞 **Telefon:** +60 88-326300\n📠 **Faks:** +60 88-326424\n📧 **E-mel:** biasiswa@yayasansabah.gov.my\n🌐 **Laman Web:** yayasansabah.gov.my\n\n**Waktu Pejabat:**\n• Isnin – Khamis: 8:00 pagi – 5:00 petang\n• Jumaat: 8:00 pagi – 12:15 tengahari (Rehat)\n• Jumaat: 2:45 petang – 5:00 petang\n• Sabtu, Ahad & Cuti Umum: Tutup\n\n**Unit Biasiswa & Tajaan:**\n📞 +60 88-326300 Sambungan 1234\n📧 tajaan@yayasansabah.gov.my",
    quickReplies: [
      "Cara Memohon Biasiswa YS",
      "Dokumen Diperlukan",
      "Tarikh Permohonan",
      "Biasiswa JPA",
    ],
  },
];

const defaultResponse: Pick<KnowledgeEntry, "response" | "quickReplies"> = {
  response:
    "Maaf, saya tidak faham soalan anda sepenuhnya. Boleh anda cuba soal menggunakan kata kunci berikut?\n\n• 'biasiswa yayasan sabah' – untuk biasiswa YS\n• 'ptptn' – untuk pinjaman PTPTN\n• 'biasiswa jpa' – untuk biasiswa JPA\n• 'kelayakan' – untuk syarat kelayakan\n• 'dokumen' – untuk senarai dokumen\n• 'tarikh' – untuk tarikh permohonan\n• 'tips' – untuk tips permohonan\n• 'hubungi' – untuk maklumat hubungan\n\nAtau pilih topik di bawah:",
  quickReplies: [
    "Tentang Biasiswa Yayasan Sabah",
    "Pinjaman PTPTN",
    "Biasiswa JPA",
    "Tips Permohonan",
  ],
};

function findResponse(input: string): Pick<KnowledgeEntry, "response" | "quickReplies"> {
  const lower = input.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return { response: entry.response, quickReplies: entry.quickReplies };
    }
  }
  return defaultResponse;
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "bot",
  text: "Selamat datang ke Pembantu Kewangan Pendidikan Yayasan Sabah! 🎓\n\nSaya boleh membantu anda dengan maklumat tentang biasiswa, pinjaman pelajar, dan bantuan kewangan pendidikan. Pilih topik di bawah atau taip soalan anda:",
  timestamp: new Date(),
  quickReplies: [
    "Tentang Biasiswa Yayasan Sabah",
    "Pinjaman PTPTN",
    "Biasiswa JPA",
    "Pinjaman MARA",
    "Dokumen Diperlukan",
    "Tips Permohonan",
  ],
};

const CATEGORIES = [
  {
    icon: GraduationCap,
    label: "Biasiswa",
    color: "from-blue-500 to-blue-700",
    query: "Tentang Biasiswa Yayasan Sabah",
  },
  {
    icon: DollarSign,
    label: "Pinjaman",
    color: "from-green-500 to-green-700",
    query: "Pinjaman PTPTN",
  },
  {
    icon: FileText,
    label: "Dokumen",
    color: "from-orange-500 to-orange-700",
    query: "Dokumen Diperlukan",
  },
  {
    icon: HelpCircle,
    label: "FAQ",
    color: "from-purple-500 to-purple-700",
    query: "Beza biasiswa dan pinjaman",
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4340e] to-[#8B1A00] flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl rounded-bl-none px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/60"
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function formatText(text: string) {
  return text.split("\n").map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: bold }} />
        {i < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

export default function ChatbotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const { response, quickReplies } = findResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: response,
        timestamp: new Date(),
        quickReplies,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a0a08 50%, #0a1628 100%)" }}>
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #d4340e, transparent)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #0066cc, transparent)" }}
          animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #10b981, transparent)" }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center gap-4 px-4 md:px-8 py-4 backdrop-blur-xl bg-black/30 border-b border-white/10"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm hidden sm:block">Kembali</span>
        </button>

        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="absolute inset-0 bg-[#d4340e]/30 blur-lg rounded-full" />
            <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain relative z-10" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm tracking-wide">CHATBOT KEWANGAN PENDIDIKAN</div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs">Dalam Talian</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d4340e]" />
          <span className="text-white/70 text-xs">AI Pembantu</span>
        </div>
      </motion.header>

      {/* Category quick-access bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex gap-2 px-4 md:px-8 py-3 overflow-x-auto scrollbar-hide border-b border-white/5 bg-black/20"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => sendMessage(cat.query)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${cat.color} text-white text-xs font-medium whitespace-nowrap hover:opacity-90 active:scale-95 transition-all`}
          >
            <cat.icon className="w-3.5 h-3.5" />
            {cat.label}
          </button>
        ))}
        <button
          onClick={() => sendMessage("tarikh permohonan")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-700 text-white text-xs font-medium whitespace-nowrap hover:opacity-90 active:scale-95 transition-all"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Tarikh Mohon
        </button>
      </motion.div>

      {/* Messages area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-1">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-end gap-3 mb-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "bot"
                    ? "bg-gradient-to-br from-[#d4340e] to-[#8B1A00]"
                    : "bg-gradient-to-br from-blue-500 to-blue-700"
                }`}
              >
                {msg.role === "bot" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>

              <div className={`flex flex-col gap-2 max-w-[80%] md:max-w-[65%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                {/* Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-white/10 backdrop-blur-sm border border-white/10 rounded-bl-none text-white"
                      : "bg-gradient-to-br from-[#d4340e] to-[#8B1A00] rounded-br-none text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{formatText(msg.text)}</div>
                </div>

                {/* Timestamp */}
                <span className="text-white/30 text-xs px-1">
                  {msg.timestamp.toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit" })}
                </span>

                {/* Quick replies */}
                {msg.quickReplies && msg.role === "bot" && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {msg.quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => sendMessage(qr)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white text-xs transition-all active:scale-95"
                      >
                        {qr}
                        <ChevronRight className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 px-4 md:px-8 py-4 backdrop-blur-xl bg-black/30 border-t border-white/10"
      >
        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Taip soalan anda di sini... (cth: 'Bagaimana nak mohon PTPTN?')"
            className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d4340e] to-[#8B1A00] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-center text-white/25 text-xs mt-2">
          Maklumat ini adalah untuk panduan sahaja. Sila semak portal rasmi untuk maklumat terkini.
        </p>
      </motion.div>
    </div>
  );
}

import { motion } from "motion/react";
import { Calendar, ArrowRight, Megaphone } from "lucide-react";

const news = [
  {
    date: "15 Apr 2026",
    category: "Permohonan Terbuka",
    title: "Permohonan Tajaan & Pinjaman Pendidikan 2026 Kini Dibuka",
    excerpt:
      "Portal PTPS membuka permohonan untuk semua tajaan bagi sesi akademik 2026/2027. Tarikh akhir permohonan adalah 30 Jun 2026. Pelajar Sabah yang berkelayakan dipelawa untuk memohon.",
    image: "linear-gradient(135deg, #1a56db 0%, #1e3a8a 100%)",
    urgent: true,
  },
  {
    date: "22 Apr 2025",
    category: "Yayasan Sabah",
    title: "Pelajar Berkelayakan Dipelawa Pohon Tajaan Biasiswa & Pinjaman YS",
    excerpt:
      "Yayasan Sabah menjemput pelajar berkelayakan untuk memohon biasiswa, geran dan pinjaman pengajian tinggi bagi sesi akademik 2026 melalui portal PTPS.",
    image: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    urgent: false,
  },
  {
    date: "3 Jul 2024",
    category: "Pelancaran Rasmi",
    title: "Portal PTPS Dilancarkan Secara Rasmi oleh Ketua Menteri Sabah",
    excerpt:
      "Datuk Seri Hajiji Noor melancarkan Portal Tajaan Pendidikan Sabah (PTPS) di Menara Kinabalu sebagai inisiatif baharu di bawah Sabah Maju Jaya untuk memperkasa pendidikan anak Sabah.",
    image: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
    urgent: false,
  },
  {
    date: "1 Mac 2026",
    category: "BKNS",
    title: "Permohonan Anugerah Biasiswa TYT 2026 — CGPA 4.0 Syarat Utama",
    excerpt:
      "Biasiswa Kerajaan Negeri Sabah (BKNS) membuka permohonan untuk Anugerah Biasiswa TYT, Biasiswa Cemerlang dan Biasiswa Perdana bagi pelajar yang mencapai CGPA 4.0 dalam peperiksaan pertama.",
    image: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    urgent: false,
  },
  {
    date: "10 Feb 2026",
    category: "TSK",
    title: "Bantuan BUDI, BAIK & SUBFLY — Mohon Segera Sebelum Tempat Penuh",
    excerpt:
      "Pejabat Timbalan Setiausaha Kerajaan memaklumkan permohonan Bantuan Tunai Pendaftaran IPT (BUDI), Bantuan Komputer (BAIK) dan Subsidi Penerbangan (SUBFLY) kini terbuka.",
    image: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    urgent: false,
  },
  {
    date: "5 Jan 2026",
    category: "Baitulmal",
    title: "Bantuan Awal Pendidikan Baitulmal Sabah 2026 Dibuka",
    excerpt:
      "Perbadanan Baitulmal Negeri Sabah menawarkan bantuan awal pendidikan kepada pelajar baharu yang menyambung pengajian di IPTA, Politeknik, Matrikulasi dan peringkat Sijil.",
    image: "linear-gradient(135deg, #1a56db 0%, #f59e0b 100%)",
    urgent: false,
  },
];

export function NewsSection() {
  return (
    <section id="media" className="py-20 px-6 bg-gradient-to-b from-[#0d1b2f]/40 to-[#0a1628]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 bg-[#1a56db]/10 border border-[#1a56db]/30 rounded-full mb-4">
            <span className="text-[#1a56db] text-xs tracking-widest">PENGUMUMAN & BERITA</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-tight">
            BERITA & <span className="text-[#1a56db]">PENGUMUMAN</span>
          </h2>
          <div className="w-32 h-1 bg-[#1a56db] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Maklumat terkini mengenai tajaan, pinjaman dan pengumuman portal PTPS
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group bg-[#1a2942] rounded-xl overflow-hidden border transition-all cursor-pointer hover:-translate-y-1 duration-300 ${
                item.urgent ? "border-[#1a56db]/60 shadow-lg shadow-[#1a56db]/10" : "border-gray-700/50 hover:border-[#1a56db]/40"
              }`}
            >
              <div
                className="h-40 flex items-center justify-center relative overflow-hidden"
                style={{ background: item.image }}
              >
                {item.urgent && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    <span className="text-white text-xs font-medium">TERBUKA</span>
                  </div>
                )}
                <Megaphone className="w-12 h-12 text-white/30" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#1a56db]/20 text-[#1a56db] rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base text-white font-semibold mb-3 group-hover:text-[#1a56db] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>

                <button className="flex items-center gap-2 text-[#1a56db] text-sm hover:gap-3 transition-all font-medium">
                  <span>Baca Selanjutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-10 py-4 bg-transparent border-2 border-[#1a56db] text-[#1a56db] hover:bg-[#1a56db] hover:text-white transition-all transform hover:scale-105 text-sm tracking-widest rounded-sm">
            LIHAT SEMUA PENGUMUMAN
          </button>
        </motion.div>
      </div>
    </section>
  );
}

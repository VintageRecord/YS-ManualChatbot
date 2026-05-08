import { motion } from "motion/react";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";

const news = [
  {
    date: "15 Apr 2026",
    category: "Biasiswa",
    title: "Permohonan Tajaan Biasiswa 2026 Dibuka",
    excerpt: "Kumpulan Yayasan Sabah membuka permohonan biasiswa untuk pelajar cemerlang bagi tahun akademik 2026/2027.",
    image: "linear-gradient(135deg, #d4340e 0%, #b82d0c 100%)"
  },
  {
    date: "10 Apr 2026",
    category: "Pengumuman",
    title: "Pelancaran Program Latihan Kemahiran Digital",
    excerpt: "Program latihan percuma untuk 500 belia Sabah dalam bidang teknologi maklumat dan digital marketing.",
    image: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)"
  },
  {
    date: "5 Apr 2026",
    category: "Berita",
    title: "Kerjasama Strategik dengan Universiti Antarabangsa",
    excerpt: "YS menandatangani MoU dengan tiga universiti terkemuka untuk program pertukaran pelajar.",
    image: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
  },
  {
    date: "28 Mac 2026",
    category: "Aktiviti",
    title: "Program Pembangunan Komuniti Luar Bandar",
    excerpt: "Pelancaran inisiatif pembangunan infrastruktur di 15 kampung pedalaman Sabah.",
    image: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
  },
  {
    date: "20 Mac 2026",
    category: "Pengumuman",
    title: "Anugerah Kecemerlangan Akademik 2025",
    excerpt: "Majlis penganugerahan untuk 200 pelajar cemerlang yang menerima biasiswa YS tahun lepas.",
    image: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
  },
  {
    date: "12 Mac 2026",
    category: "Berita",
    title: "Pelaburan Tenaga Boleh Baharu",
    excerpt: "YS melancarkan projek solar farm berskala besar untuk menyokong tenaga hijau di Sabah.",
    image: "linear-gradient(135deg, #d4340e 0%, #b82d0c 100%)"
  }
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
          <h2 className="text-5xl md:text-6xl text-white mb-4 tracking-tight">
            MEDIA & <span className="text-[#d4340e]">BERITA</span>
          </h2>
          <div className="w-32 h-1 bg-[#d4340e] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Berita terkini dan pengumuman penting
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-[#1a2942] rounded-lg overflow-hidden border border-gray-700 hover:border-[#d4340e] transition-all cursor-pointer"
            >
              <div
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{ background: item.image }}
              >
                <Newspaper className="w-16 h-16 text-white/30" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{item.date}</span>
                  <span className="px-3 py-1 bg-[#d4340e]/20 text-[#d4340e] rounded-full text-xs">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-xl text-white mb-3 group-hover:text-[#d4340e] transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>

                <button className="flex items-center gap-2 text-[#d4340e] hover:gap-3 transition-all">
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
          <button className="px-10 py-4 bg-transparent border-2 border-[#d4340e] text-[#d4340e] hover:bg-[#d4340e] hover:text-white transition-all transform hover:scale-105 text-lg">
            LIHAT SEMUA BERITA
          </button>
        </motion.div>
      </div>
    </section>
  );
}

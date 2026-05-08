import { motion } from "motion/react";
import { Calendar, Megaphone, Image as ImageIcon, ChevronRight } from "lucide-react";

const newsItems = [
  {
    date: "15 Apr 2026",
    category: "Biasiswa",
    title: "Permohonan Biasiswa 2026 Dibuka",
    excerpt: "Kumpulan Yayasan Sabah membuka permohonan biasiswa untuk pelajar cemerlang bagi tahun akademik 2026/2027."
  },
  {
    date: "10 Apr 2026",
    category: "Pengumuman",
    title: "Pelancaran Program Latihan Kemahiran Digital",
    excerpt: "Program latihan percuma untuk 500 belia Sabah dalam bidang teknologi maklumat dan digital marketing."
  },
  {
    date: "5 Apr 2026",
    category: "Berita",
    title: "Kerjasama Strategik dengan Universiti Antarabangsa",
    excerpt: "YS menandatangani MoU dengan tiga universiti terkemuka untuk program pertukaran pelajar."
  },
  {
    date: "28 Mac 2026",
    category: "Aktiviti",
    title: "Program Pembangunan Komuniti Luar Bandar",
    excerpt: "Pelancaran inisiatif pembangunan infrastruktur di 15 kampung pedalaman Sabah."
  },
  {
    date: "20 Mac 2026",
    category: "Pengumuman",
    title: "Anugerah Kecemerlangan Akademik 2025",
    excerpt: "Majlis penganugerahan untuk 200 pelajar cemerlang yang menerima biasiswa YS tahun lepas."
  },
  {
    date: "12 Mac 2026",
    category: "Berita",
    title: "Pelaburan Tenaga Boleh Baharu",
    excerpt: "YS melancarkan projek solar farm berskala besar untuk menyokong tenaga hijau di Sabah."
  }
];

export function MediaSection() {
  return (
    <section id="media" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl text-[#0066cc] mb-4">
            Media & Pengumuman
          </h2>
          <div className="w-20 h-1 bg-[#0066cc] mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Berita terkini, pengumuman penting, dan liputan aktiviti Kumpulan Yayasan Sabah
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-blue-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-gray-500">{item.date}</span>
                  <span className="px-3 py-1 bg-blue-100 text-[#0066cc] rounded text-xs">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl text-gray-900 mb-3 group-hover:text-[#0066cc] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                <button className="text-[#0066cc] hover:underline flex items-center gap-2">
                  Baca Selanjutnya <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button className="px-8 py-3 bg-[#0066cc] text-white rounded hover:bg-[#0052a3] transition-colors">
            Lihat Semua Berita
          </button>
        </motion.div>
      </div>
    </section>
  );
}

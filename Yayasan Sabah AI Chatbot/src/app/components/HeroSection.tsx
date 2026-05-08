import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HeroSlideshow } from "./HeroSlideshow";

export function HeroSection() {
  return (
    <section id="hero" className="pt-32 pb-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <HeroSlideshow />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border-2 border-[#0066cc] rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-[#0066cc] rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📢</span>
            </div>
            <h3 className="text-xl text-[#0066cc] mb-3">Pengumuman Utama</h3>
            <p className="text-gray-700 mb-4">
              Permohonan Tajaan Biasiswa 2026 kini dibuka untuk pelajar-pelajar cemerlang Sabah
            </p>
            <button className="text-[#0066cc] hover:underline flex items-center gap-2">
              Baca Selanjutnya
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border-2 border-[#10b981] rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-[#10b981] rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📰</span>
            </div>
            <h3 className="text-xl text-[#10b981] mb-3">Berita Terkini</h3>
            <p className="text-gray-700 mb-4">
              Kumpulan Yayasan Sabah terus komited dalam menyediakan pendidikan berkualiti
            </p>
            <button className="text-[#10b981] hover:underline flex items-center gap-2">
              Lihat Berita
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border-2 border-[#f59e0b] rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-[#f59e0b] rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📅</span>
            </div>
            <h3 className="text-xl text-[#f59e0b] mb-3">Kalendar Acara</h3>
            <p className="text-gray-700 mb-4">
              Sertai program-program pembangunan kapasiti dan aktiviti kemasyarakatan kami
            </p>
            <button className="text-[#f59e0b] hover:underline flex items-center gap-2">
              Lihat Kalendar
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

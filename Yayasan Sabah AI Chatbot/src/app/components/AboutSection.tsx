import { motion } from "motion/react";
import { Target, Eye, History, Award } from "lucide-react";

export function AboutSection() {
  return (
    <section id="mengenai" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl text-[#0066cc] mb-4">
            Mengenai Kami
          </h2>
          <div className="w-20 h-1 bg-[#0066cc] mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Memacu pembangunan sosio-ekonomi rakyat Sabah sejak 1966
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow border-t-4 border-[#0066cc]"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-[#0066cc]" />
            </div>
            <h3 className="text-2xl text-[#0066cc] mb-4">Visi</h3>
            <p className="text-gray-700 leading-relaxed">
              Menjadi institusi korporat terkemuka yang menyumbang kepada pembangunan mampan
              dan kesejahteraan rakyat Sabah melalui pendidikan, pelaburan strategik, dan
              program pembangunan komuniti.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow border-t-4 border-[#10b981]"
          >
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-[#10b981]" />
            </div>
            <h3 className="text-2xl text-[#10b981] mb-4">Misi</h3>
            <p className="text-gray-700 leading-relaxed">
              Membangunkan modal insan melalui pendidikan berkualiti, memperkasa ekonomi melalui
              pelaburan berimpak tinggi, dan meningkatkan kualiti hidup masyarakat melalui
              program pembangunan yang inklusif.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow border-t-4 border-[#f59e0b]"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
              <History className="w-8 h-8 text-[#f59e0b]" />
            </div>
            <h3 className="text-2xl text-[#f59e0b] mb-4">Sejarah</h3>
            <p className="text-gray-700 leading-relaxed">
              Ditubuhkan pada 1966, Yayasan Sabah telah berkembang menjadi sebuah kumpulan
              korporat yang komprehensif dengan pelbagai syarikat subsidiari dalam sektor
              pendidikan, perhutanan, perladangan, dan pelancongan.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg p-12 shadow-md"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#0066cc] rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl text-[#0066cc]">Warisan Kami</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Selama lebih 50 tahun, Kumpulan Yayasan Sabah telah memainkan peranan penting dalam
                membentuk landskap sosio-ekonomi Sabah. Dari program biasiswa yang telah membantu
                beribu-ribu pelajar, hingga inisiatif pembangunan yang menyentuh kehidupan ratusan
                ribu rakyat Sabah.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Kami komited untuk terus memperkasa komuniti melalui pendekatan holistik yang
                menggabungkan pendidikan, pembangunan ekonomi, dan tanggungjawab sosial korporat.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center border border-blue-200">
                <div className="text-4xl text-[#0066cc] mb-2">1966</div>
                <div className="text-sm text-gray-600">Tahun Ditubuhkan</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center border border-green-200">
                <div className="text-4xl text-[#10b981] mb-2">30+</div>
                <div className="text-sm text-gray-600">Syarikat Subsidiari</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center border border-blue-200">
                <div className="text-4xl text-[#0066cc] mb-2">15K+</div>
                <div className="text-sm text-gray-600">Biasiswa Diberikan</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center border border-green-200">
                <div className="text-4xl text-[#10b981] mb-2">100K+</div>
                <div className="text-sm text-gray-600">Rakyat Terbantu</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

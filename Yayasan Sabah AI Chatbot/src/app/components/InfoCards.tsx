import { motion } from "motion/react";
import { Star, BookOpen, Handshake, GraduationCap, Heart } from "lucide-react";

const bodies = [
  {
    icon: Star,
    code: "BKNS",
    title: "Biasiswa Kerajaan Negeri Sabah",
    description:
      "Menawarkan Anugerah Biasiswa TYT, Biasiswa Cemerlang dan Biasiswa Perdana untuk peringkat Diploma, Ijazah Sarjana Muda dan Sarjana.",
    highlight: "CGPA 4.0 ke atas",
    gradient: "from-[#d4340e] to-[#8B1A00]",
    border: "border-[#d4340e]/40",
  },
  {
    icon: BookOpen,
    code: "MUIS",
    title: "Majlis Ugama Islam Sabah",
    description:
      "Dermasiswa pengajian tinggi untuk pelajar bukan Islam serta bantuan yuran pendaftaran awam dan tiket kapal terbang (sekali).",
    highlight: "Pelbagai Program",
    gradient: "from-[#0891b2] to-[#0e7490]",
    border: "border-[#0891b2]/40",
  },
  {
    icon: Handshake,
    code: "TSK",
    title: "Timbalan Setiausaha Kerajaan",
    description:
      "Bantuan Tunai Pendaftaran IPT (BUDI), Bantuan Komputer 2.0 (BAIK) dan Subsidi Penerbangan (SUBFLY) untuk pelajar layak.",
    highlight: "BUDI • BAIK • SUBFLY",
    gradient: "from-[#10b981] to-[#059669]",
    border: "border-[#10b981]/40",
  },
  {
    icon: GraduationCap,
    code: "YS",
    title: "Kumpulan Yayasan Sabah",
    description:
      "Biasiswa, geran dan pinjaman pengajian tinggi untuk semua peringkat dari Sijil hingga PhD bagi sesi akademik 2026.",
    highlight: "Sijil → PhD",
    gradient: "from-[#f59e0b] to-[#d97706]",
    border: "border-[#f59e0b]/40",
  },
  {
    icon: Heart,
    code: "BAITULMAL",
    title: "Perbadanan Baitulmal Sabah",
    description:
      "Bantuan awal pendidikan untuk pelajar yang menyambung pengajian di IPTA, Politeknik, Matrikulasi dan peringkat Sijil.",
    highlight: "IPTA & Politeknik",
    gradient: "from-[#8b5cf6] to-[#6d28d9]",
    border: "border-[#8b5cf6]/40",
  },
];

export function InfoCards() {
  return (
    <section id="mengenai" className="py-20 px-6 bg-[#0a1628]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 bg-[#d4340e]/10 border border-[#d4340e]/30 rounded-full mb-4">
            <span className="text-[#d4340e] text-xs tracking-widest">BADAN-BADAN PENAJA</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-tight">
            LIMA BADAN <span className="text-[#d4340e]">PENAJA UTAMA</span>
          </h2>
          <div className="w-32 h-1 bg-[#d4340e] mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Portal PTPS menyatukan lima badan penaja utama Sabah dalam satu platform permohonan yang mudah dan telus.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {bodies.map((body, index) => {
            const Icon = body.icon;
            return (
              <motion.div
                key={body.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden bg-[#1a2942] rounded-xl p-6 border ${body.border} hover:scale-105 transition-all duration-300`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${body.gradient}`}></div>

                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${body.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <div className={`inline-block px-2 py-0.5 rounded text-xs font-bold text-white bg-gradient-to-r ${body.gradient} mb-3`}>
                  {body.code}
                </div>

                <h3 className="text-white text-sm font-semibold mb-3 leading-snug">{body.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">{body.description}</p>

                <div className={`text-xs font-medium bg-gradient-to-r ${body.gradient} bg-clip-text text-transparent`}>
                  ✦ {body.highlight}
                </div>

                <div
                  className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br ${body.gradient} opacity-5 rounded-tl-full`}
                ></div>
              </motion.div>
            );
          })}
        </div>

        {/* Portal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm mb-4">
            Akses semua tajaan melalui satu portal — lebih mudah, lebih cepat.
          </p>
          <button
            onClick={() => document.querySelector("#cara-mohon")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-[#d4340e] text-white text-sm tracking-widest hover:bg-[#b82d0c] transition-all transform hover:scale-105 rounded-sm"
          >
            CARA MOHON
          </button>
        </motion.div>
      </div>
    </section>
  );
}

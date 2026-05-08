import { motion } from "motion/react";
import { Trophy, Award, Star, BookOpen, Gift, Landmark } from "lucide-react";

const programs = [
  {
    icon: Trophy,
    body: "BKNS",
    title: "Anugerah Biasiswa TYT",
    description:
      "Anugerah bergengsi Yg Dipertua Negeri Sabah untuk pelajar yang memperoleh CGPA 4.0 dalam peperiksaan pertama sahaja.",
    level: "Diploma • Ijazah • Sarjana",
    requirement: "CGPA 4.0 (Peperiksaan Pertama)",
    color: "#d4340e",
    bg: "from-[#d4340e]/10 to-[#8B1A00]/5",
  },
  {
    icon: Award,
    body: "BKNS",
    title: "Biasiswa Cemerlang",
    description:
      "Biasiswa penuh untuk pelajar cemerlang Sabah yang melanjutkan pengajian di institusi pengajian tinggi awam dan swasta.",
    level: "Diploma • Ijazah Sarjana Muda",
    requirement: "CGPA 3.75 ke atas",
    color: "#d4340e",
    bg: "from-[#d4340e]/10 to-[#8B1A00]/5",
  },
  {
    icon: Star,
    body: "MUIS",
    title: "Dermasiswa Pengajian Tinggi MUIS",
    description:
      "Dermasiswa untuk pelajar yang melanjutkan pengajian dalam bidang bukan pengajian Islam di peringkat ijazah dan diploma.",
    level: "Diploma • Ijazah",
    requirement: "Warganegara Sabah",
    color: "#0891b2",
    bg: "from-[#0891b2]/10 to-[#0e7490]/5",
  },
  {
    icon: Gift,
    body: "TSK",
    title: "Bantuan BUDI / BAIK / SUBFLY",
    description:
      "Bantuan Tunai Pendaftaran IPT (BUDI), Bantuan Komputer (BAIK) dan Subsidi Penerbangan (SUBFLY) untuk pelajar yang melanjutkan pengajian.",
    level: "Sijil • Diploma • Ijazah",
    requirement: "Pendapatan Isi Rumah < RM 10,000",
    color: "#10b981",
    bg: "from-[#10b981]/10 to-[#059669]/5",
  },
  {
    icon: Landmark,
    body: "Yayasan Sabah",
    title: "Biasiswa & Pinjaman Pengajian YS",
    description:
      "Biasiswa penuh, geran dan pinjaman pengajian tinggi oleh Yayasan Sabah untuk semua peringkat dari Sijil hingga PhD.",
    level: "Sijil • Diploma • Ijazah • Sarjana • PhD",
    requirement: "Bumiputera Sabah",
    color: "#f59e0b",
    bg: "from-[#f59e0b]/10 to-[#d97706]/5",
  },
  {
    icon: BookOpen,
    body: "Baitulmal",
    title: "Bantuan Awal Pendidikan",
    description:
      "Bantuan awal pendidikan untuk pelajar yang menyambung pengajian di IPTA, Politeknik, Kolej Matrikulasi dan peringkat Sijil.",
    level: "Sijil • Matrikulasi • Diploma • IPTA",
    requirement: "Pelajar Baharu Kelayakan",
    color: "#8b5cf6",
    bg: "from-[#8b5cf6]/10 to-[#6d28d9]/5",
  },
];

export function ProgramsGrid() {
  return (
    <section id="tajaan" className="py-20 px-6 bg-gradient-to-b from-[#0a1628]/40 to-[#0d1b2f]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 bg-[#d4340e]/10 border border-[#d4340e]/30 rounded-full mb-4">
            <span className="text-[#d4340e] text-xs tracking-widest">PROGRAM TAJAAN</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-tight">
            JENIS <span className="text-[#d4340e]">TAJAAN & BANTUAN</span>
          </h2>
          <div className="w-32 h-1 bg-[#d4340e] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pelbagai bentuk bantuan kewangan pendidikan yang tersedia melalui portal PTPS
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative bg-gradient-to-br ${program.bg} bg-[#1a2942] rounded-xl overflow-hidden border border-gray-700/50 hover:border-opacity-80 hover:shadow-2xl transition-all duration-300`}
                style={{ "--tw-border-opacity": "1" } as React.CSSProperties}
              >
                <div
                  className="absolute top-0 left-0 w-full h-0.5"
                  style={{ background: `linear-gradient(to right, ${program.color}, transparent)` }}
                ></div>

                <div className="p-7">
                  {/* Body badge */}
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4"
                    style={{ backgroundColor: `${program.color}30`, color: program.color, border: `1px solid ${program.color}40` }}
                  >
                    {program.body}
                  </div>

                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${program.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: program.color }} />
                  </div>

                  <h3 className="text-lg text-white font-semibold mb-3 leading-snug">{program.title}</h3>
                  <p className="text-gray-300 text-sm mb-5 leading-relaxed">{program.description}</p>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 text-xs w-24 flex-shrink-0">Peringkat:</span>
                      <span className="text-gray-300 text-xs">{program.level}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 text-xs w-24 flex-shrink-0">Kelayakan:</span>
                      <span className="text-xs font-medium" style={{ color: program.color }}>{program.requirement}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => document.querySelector("#cara-mohon")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 bg-[#d4340e] text-white tracking-widest hover:bg-[#b82d0c] transition-all transform hover:scale-105 text-sm rounded-sm"
          >
            MOHON SEKARANG
          </button>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { GraduationCap, Users, Building2, Leaf, Heart, Trophy } from "lucide-react";

const programs = [
  {
    icon: GraduationCap,
    title: "Pendidikan",
    description: "Biasiswa dan bantuan pendidikan dari tadika hingga universiti",
    count: "15K+",
    label: "Pelajar",
    color: "#d4340e"
  },
  {
    icon: Users,
    title: "Masyarakat",
    description: "Program pembangunan komuniti dan latihan kemahiran",
    count: "100K+",
    label: "Benefisiari",
    color: "#0891b2"
  },
  {
    icon: Building2,
    title: "Ekonomi",
    description: "Pelaburan strategik dan pembangunan perniagaan",
    count: "30+",
    label: "Syarikat",
    color: "#10b981"
  },
  {
    icon: Leaf,
    title: "Alam Sekitar",
    description: "Konservasi hutan dan pengurusan mampan",
    count: "50+",
    label: "Tahun",
    color: "#059669"
  },
  {
    icon: Heart,
    title: "Kebajikan",
    description: "Bantuan kesihatan dan sokongan sosial",
    count: "25K+",
    label: "Terbantu",
    color: "#f59e0b"
  },
  {
    icon: Trophy,
    title: "Sukan",
    description: "Pembangunan atlet dan kemudahan sukan",
    count: "500+",
    label: "Atlet",
    color: "#8b5cf6"
  }
];

export function ProgramsGrid() {
  return (
    <section id="aktiviti" className="py-20 px-6 bg-gradient-to-b from-[#0a1628]/40 to-[#0d1b2f]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl text-white mb-4 tracking-tight">
            PROGRAM <span className="text-[#d4340e]">KAMI</span>
          </h2>
          <div className="w-32 h-1 bg-[#d4340e] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pelbagai inisiatif yang direka untuk memajukan rakyat Sabah
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#1a2942] rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-[#d4340e]/20 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4340e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative p-8">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${program.color}20` }}
                  >
                    <Icon className="w-10 h-10" style={{ color: program.color }} />
                  </div>

                  <h3 className="text-2xl text-white mb-3">{program.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{program.description}</p>

                  <div className="flex items-end gap-2 pt-4 border-t border-gray-700">
                    <span className="text-4xl text-[#d4340e]">{program.count}</span>
                    <span className="text-gray-400 pb-1">{program.label}</span>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: program.color, clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                ></div>
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
          <button className="px-10 py-4 bg-[#d4340e] text-white hover:bg-[#b82d0c] transition-all transform hover:scale-105 text-lg">
            LIHAT SEMUA PROGRAM
          </button>
        </motion.div>
      </div>
    </section>
  );
}

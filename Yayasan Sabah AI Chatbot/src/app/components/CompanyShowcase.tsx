import { motion } from "motion/react";
import { Building, School, Hotel, Factory, TreePine, Hospital, ExternalLink } from "lucide-react";

const companies = [
  { icon: School, name: "Universiti Malaysia Sabah", category: "Pendidikan Tinggi" },
  { icon: School, name: "Kolej Yayasan Sabah", category: "Pendidikan Tinggi" },
  { icon: TreePine, name: "Yayasan Sabah Forestry", category: "Perhutanan" },
  { icon: Building, name: "Sawit Kinabalu", category: "Perladangan" },
  { icon: Hotel, name: "Sutera Harbour Resort", category: "Pelancongan" },
  { icon: Factory, name: "SabahGas", category: "Tenaga" },
  { icon: School, name: "Sekolah Menengah Sains Sabah", category: "Pendidikan Menengah" },
  { icon: Hospital, name: "Hospital Duchess of Kent", category: "Kesihatan" },
  { icon: Building, name: "Innoprise Corporation", category: "Korporat" }
];

export function CompanyShowcase() {
  return (
    <section id="direktori" className="py-20 px-6 bg-[#0a1628]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl text-white mb-4 tracking-tight">
            DIREKTORI <span className="text-[#d4340e]">KUMPULAN</span>
          </h2>
          <div className="w-32 h-1 bg-[#d4340e] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Rangkaian syarikat subsidiari dan institusi
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => {
            const Icon = company.icon;
            return (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-[#1a2942] rounded-lg p-6 hover:bg-[#1f2f49] border border-gray-700 hover:border-[#d4340e] transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-[#d4340e]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4340e]/20 transition-colors">
                    <Icon className="w-7 h-7 text-[#d4340e]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white mb-1 leading-snug group-hover:text-[#d4340e] transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-400">{company.category}</p>
                  </div>

                  <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-[#d4340e] opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-[#d4340e] to-[#b82d0c] rounded-xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

          <div className="relative z-10">
            <h3 className="text-4xl text-white mb-4">Ingin Bekerjasama?</h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Kami sentiasa terbuka untuk peluang kerjasama strategik yang boleh memberi manfaat kepada rakyat Sabah
            </p>
            <button className="px-10 py-4 bg-white text-[#d4340e] hover:bg-gray-100 transition-all transform hover:scale-105">
              HUBUNGI KAMI
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

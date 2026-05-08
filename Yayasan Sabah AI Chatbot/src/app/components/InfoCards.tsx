import { motion } from "motion/react";
import { Target, Eye, Lightbulb, Award } from "lucide-react";

const cards = [
  {
    icon: Eye,
    title: "VISI",
    description: "Menjadi institusi korporat terkemuka yang menyumbang kepada pembangunan mampan dan kesejahteraan rakyat Sabah.",
    gradient: "from-[#d4340e] to-[#b82d0c]"
  },
  {
    icon: Target,
    title: "MISI",
    description: "Membangunkan modal insan melalui pendidikan berkualiti dan memperkasa ekonomi melalui pelaburan strategik.",
    gradient: "from-[#0891b2] to-[#0e7490]"
  },
  {
    icon: Lightbulb,
    title: "NILAI",
    description: "Integriti, Kecemerlangan, Inovasi, dan Tanggungjawab Sosial dalam setiap aspek operasi kami.",
    gradient: "from-[#10b981] to-[#059669]"
  },
  {
    icon: Award,
    title: "PENCAPAIAN",
    description: "50+ tahun khidmat, 15,000+ biasiswa, 100,000+ rakyat terbantu, 30+ syarikat subsidiari.",
    gradient: "from-[#f59e0b] to-[#d97706]"
  }
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
          <h2 className="text-5xl md:text-6xl text-white mb-4 tracking-tight">
            MENGENAI <span className="text-[#d4340e]">KAMI</span>
          </h2>
          <div className="w-32 h-1 bg-[#d4340e] mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden bg-[#1a2942] rounded-lg p-6 border border-gray-700 hover:border-[#d4340e] transition-all"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradient}`}></div>

                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl text-white mb-3 tracking-wide">{card.title}</h3>
                <p className="text-gray-300 leading-relaxed">{card.description}</p>

                <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${card.gradient} opacity-5 rounded-tl-full`}></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { GraduationCap, Users, Trophy, Heart, Building2, Leaf } from "lucide-react";

const activities = [
  {
    icon: GraduationCap,
    title: "Program Pendidikan",
    description: "Biasiswa, bantuan pendidikan, dan pengurusan institusi pendidikan dari tadika hingga universiti.",
    color: "#0066cc"
  },
  {
    icon: Users,
    title: "Pembangunan Masyarakat",
    description: "Program latihan kemahiran, keusahawanan, dan pembangunan komuniti luar bandar.",
    color: "#10b981"
  },
  {
    icon: Trophy,
    title: "Sukan & Rekreasi",
    description: "Kemudahan sukan, program pembangunan atlet, dan aktiviti rekreasi untuk kesihatan masyarakat.",
    color: "#0891b2"
  },
  {
    icon: Heart,
    title: "Kebajikan Sosial",
    description: "Bantuan kebajikan, program kesihatan, dan sokongan untuk golongan memerlukan.",
    color: "#ef4444"
  },
  {
    icon: Building2,
    title: "Pembangunan Ekonomi",
    description: "Pelaburan strategik dalam perniagaan, hartanah, dan industri yang menjana ekonomi.",
    color: "#8b5cf6"
  },
  {
    icon: Leaf,
    title: "Alam Sekitar",
    description: "Program konservasi hutan, pengurusan perhutanan mampan, dan pemuliharaan biodiversiti.",
    color: "#059669"
  }
];

export function ActivitiesSection() {
  return (
    <section id="aktiviti" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl text-[#0066cc] mb-4">
            Aktiviti & Program
          </h2>
          <div className="w-20 h-1 bg-[#0066cc] mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Pelbagai inisiatif dan program yang direka untuk memajukan rakyat Sabah
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${activity.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: activity.color }} />
                </div>
                <h3 className="text-xl mb-3" style={{ color: activity.color }}>{activity.title}</h3>
                <p className="text-gray-600 leading-relaxed">{activity.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <button className="px-8 py-3 bg-[#0066cc] text-white rounded hover:bg-[#0052a3] transition-colors">
            Lihat Semua Program
          </button>
        </motion.div>
      </div>
    </section>
  );
}

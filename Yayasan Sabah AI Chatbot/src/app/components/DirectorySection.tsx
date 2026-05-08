import { motion } from "motion/react";
import { Building, School, Hotel, Factory, TreePine, Hospital } from "lucide-react";

const subsidiaries = [
  { icon: School, name: "Universiti Malaysia Sabah", category: "Pendidikan Tinggi" },
  { icon: School, name: "Kolej Yayasan Sabah", category: "Pendidikan Tinggi" },
  { icon: Building, name: "Sawit Kinabalu", category: "Perladangan" },
  { icon: TreePine, name: "Yayasan Sabah Forestry", category: "Perhutanan" },
  { icon: Hotel, name: "Sutera Harbour Resort", category: "Pelancongan" },
  { icon: Factory, name: "SabahGas", category: "Tenaga" },
  { icon: School, name: "Sekolah Menengah Sains Sabah", category: "Pendidikan Menengah" },
  { icon: Hospital, name: "Hospital Duchess of Kent", category: "Kesihatan" },
  { icon: Building, name: "Innoprise Corporation", category: "Korporat" }
];

export function DirectorySection() {
  return (
    <section id="direktori" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl text-[#0066cc] mb-4">
            Direktori Kumpulan
          </h2>
          <div className="w-20 h-1 bg-[#0066cc] mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Rangkaian syarikat subsidiari dan institusi di bawah Kumpulan Yayasan Sabah
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subsidiaries.map((subsidiary, index) => {
            const Icon = subsidiary.icon;
            return (
              <motion.div
                key={subsidiary.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg p-5 border border-gray-200 hover:border-[#0066cc] shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#0066cc]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 mb-1 leading-snug">{subsidiary.name}</h3>
                    <p className="text-sm text-gray-500">{subsidiary.category}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-[#0066cc] rounded-lg p-10 text-center text-white"
        >
          <h3 className="text-3xl mb-4">Ingin Bekerjasama?</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Kami sentiasa terbuka untuk peluang kerjasama strategik yang boleh memberi manfaat kepada rakyat Sabah
          </p>
          <button className="px-8 py-3 bg-white text-[#0066cc] rounded hover:bg-gray-100 transition-colors">
            Hubungi Kami
          </button>
        </motion.div>
      </div>
    </section>
  );
}

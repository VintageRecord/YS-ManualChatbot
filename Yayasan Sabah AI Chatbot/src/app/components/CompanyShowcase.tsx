import { motion } from "motion/react";
import { Search, UserPlus, ClipboardList, Upload, CheckCircle2, ArrowRight, FileText } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Semak Kelayakan",
    description:
      "Layari portal PTPS di ptps.sabah.gov.my dan klik 'Semak Kelayakan'. Masukkan maklumat peribadi dan akademik untuk mengetahui tajaan yang sesuai.",
    color: "#d4340e",
    tip: "Semak lebih awal — permohonan ditutup 30 Jun setiap tahun.",
  },
  {
    step: "02",
    icon: UserPlus,
    title: "Daftar Akaun",
    description:
      "Daftar akaun baharu menggunakan Nombor Kad Pengenalan anda. Sahkan pendaftaran melalui e-mel dan log masuk ke portal.",
    color: "#0891b2",
    tip: "Gunakan e-mel aktif yang selalu diperiksa.",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "Isi Borang Permohonan",
    description:
      "Isi borang permohonan dalam talian dengan lengkap. Pilih tajaan yang dikehendaki dan masukkan maklumat akademik, keluarga dan institusi pengajian.",
    color: "#10b981",
    tip: "Pastikan semua maklumat tepat sebelum meneruskan.",
  },
  {
    step: "04",
    icon: Upload,
    title: "Muat Naik Dokumen",
    description:
      "Muat naik dokumen yang diperlukan: Kad Pengenalan, transkrip akademik, slip gaji ibu bapa, surat tawaran IPT dan sijil kokurikulum.",
    color: "#f59e0b",
    tip: "Saiz fail maksimum: 2MB setiap dokumen (PDF/JPG).",
  },
  {
    step: "05",
    icon: CheckCircle2,
    title: "Hantar & Pantau Status",
    description:
      "Semak semula semua maklumat dan hantar permohonan. Pantau status permohonan melalui portal menggunakan nombor rujukan yang diberikan.",
    color: "#8b5cf6",
    tip: "Keputusan dimaklumkan melalui e-mel dan SMS.",
  },
];

const documents = [
  "Kad Pengenalan pemohon & ibu bapa",
  "Transkrip / Sijil akademik (SPM/STPM/Diploma)",
  "Surat tawaran institusi pengajian",
  "Slip gaji ibu bapa (3 bulan terkini)",
  "Gambar passport berlatarbelakang biru",
  "Sijil kokurikulum & pencapaian",
  "Penyata akaun bank (3 bulan)",
  "Borang BE / Surat akuan pendapatan",
];

export function CompanyShowcase() {
  return (
    <section id="cara-mohon" className="py-20 px-6 bg-[#0a1628]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 bg-[#d4340e]/10 border border-[#d4340e]/30 rounded-full mb-4">
            <span className="text-[#d4340e] text-xs tracking-widest">PANDUAN PERMOHONAN</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-tight">
            CARA <span className="text-[#d4340e]">MOHON</span>
          </h2>
          <div className="w-32 h-1 bg-[#d4340e] mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ikuti langkah-langkah mudah ini untuk memohon tajaan melalui Portal Tajaan Pendidikan Sabah
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4340e] via-[#10b981] to-[#8b5cf6] opacity-30 z-0"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-[#1a2942] rounded-xl p-5 border border-gray-700/50 hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: `${step.color}40` }}
                >
                  {/* Step number */}
                  <div
                    className="text-5xl font-black opacity-10 absolute top-4 right-4 leading-none"
                    style={{ color: step.color }}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>

                  {/* Step badge */}
                  <div
                    className="text-xs font-bold mb-2 tracking-widest"
                    style={{ color: step.color }}
                  >
                    LANGKAH {step.step}
                  </div>

                  <h3 className="text-white font-semibold mb-3 leading-snug">{step.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">{step.description}</p>

                  <div
                    className="text-xs italic border-t pt-3 mt-auto"
                    style={{ color: step.color, borderColor: `${step.color}30` }}
                  >
                    💡 {step.tip}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Documents Required */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-8 items-start"
        >
          <div className="bg-[#1a2942] rounded-xl p-8 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#d4340e]/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#d4340e]" />
              </div>
              <h3 className="text-white text-xl font-semibold">Dokumen Diperlukan</h3>
            </div>
            <div className="space-y-3">
              {documents.map((doc, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#d4340e] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-gradient-to-br from-[#d4340e] to-[#8B1A00] rounded-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-white text-2xl font-bold mb-3">Sedia untuk Mohon?</h3>
              <p className="text-white/80 mb-2 text-sm leading-relaxed">
                Portal permohonan dibuka <strong>Mac – Jun</strong> setiap tahun.
              </p>
              <p className="text-white/70 text-sm mb-6">
                Deadline permohonan: <strong className="text-white">30 Jun 2026</strong>
              </p>
              <a
                href="https://ptps.sabah.gov.my"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit px-6 py-3 bg-white text-[#d4340e] font-semibold text-sm rounded-sm hover:bg-gray-100 transition-all hover:scale-105"
              >
                Pergi ke Portal PTPS
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-white/50 text-xs mt-6">ptps.sabah.gov.my</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

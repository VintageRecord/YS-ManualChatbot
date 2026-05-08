import { motion } from "motion/react";
import { ChevronDown, Shield, Users, GraduationCap, CheckCircle } from "lucide-react";

const stats = [
  { value: "5", label: "Badan Penaja", icon: Shield },
  { value: "15K+", label: "Pelajar Dibantu", icon: Users },
  { value: "6", label: "Peringkat Pengajian", icon: GraduationCap },
  { value: "2024", label: "Tahun Ditubuhkan", icon: CheckCircle },
];

export function HeroBanner() {
  const scrollToNext = () => {
    const element = document.querySelector("#mengenai");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-40 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#d4340e]/20 border border-[#d4340e]/60 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#d4340e] animate-pulse"></span>
            <span className="text-[#d4340e] text-sm tracking-widest font-medium">PORTAL RASMI SABAH</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl text-white mb-4 tracking-tight leading-tight"
          >
            PORTAL TAJAAN &
            <br />
            <span className="text-[#d4340e]">PEMINJAMAN PENDIDIKAN</span>
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl">SABAH</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-gray-200 mb-4 leading-relaxed max-w-3xl mx-auto"
          >
            Satu portal, lima badan penaja — memudahkan akses kepada tajaan dan bantuan pendidikan untuk anak-anak Sabah.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-sm text-gray-400 mb-10 tracking-widest"
          >
            BKNS &nbsp;•&nbsp; MUIS &nbsp;•&nbsp; TSK &nbsp;•&nbsp; YAYASAN SABAH &nbsp;•&nbsp; BAITULMAL
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button
              onClick={() => document.querySelector("#cara-mohon")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-[#d4340e] text-white text-sm tracking-widest hover:bg-[#b82d0c] transition-all transform hover:scale-105 rounded-sm font-medium"
            >
              SEMAK KELAYAKAN
            </button>
            <button
              onClick={() => document.querySelector("#tajaan")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-transparent border-2 border-white text-white text-sm tracking-widest hover:bg-white hover:text-[#0a1628] transition-all rounded-sm font-medium"
            >
              JENIS TAJAAN
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
                >
                  <Icon className="w-5 h-5 text-[#d4340e] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-300 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white hover:text-[#d4340e] transition-colors"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}

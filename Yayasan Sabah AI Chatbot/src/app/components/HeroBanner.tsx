import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function HeroBanner() {
  const scrollToNext = () => {
    const element = document.querySelector("#mengenai");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-6 py-2 bg-[#d4340e]/20 border border-[#d4340e] rounded-full mb-6"
            >
              <span className="text-[#d4340e] text-sm tracking-widest">SELAMAT DATANG</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-8xl text-white mb-6 tracking-tight"
          >
            KUMPULAN
            <br />
            <span className="text-[#d4340e]">YAYASAN SABAH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed"
          >
            Memacu Pembangunan Sosio-Ekonomi Rakyat Sabah Sejak 1966
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-[#d4340e] text-white hover:bg-[#b82d0c] transition-all transform hover:scale-105">
              PROGRAM BIASISWA
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0a1628] transition-all">
              MAKLUMAT LANJUT
            </button>
          </motion.div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white hover:text-[#d4340e] transition-colors"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1615513946870-3b01d91af194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    title: "Keindahan Alam Sabah",
    description: "Gunung-ganang yang menakjubkan"
  },
  {
    url: "https://images.unsplash.com/photo-1697212187378-31138d145e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    title: "Warisan Sabah",
    description: "Pemandangan kampung tradisional"
  },
  {
    url: "https://images.unsplash.com/photo-1654180674774-45dbe0b3bdca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    title: "Keajaiban Pulau Sabah",
    description: "Perairan yang jernih dan indah"
  },
  {
    url: "https://images.unsplash.com/photo-1696919222885-60f2f673193b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    title: "Puncak Gunung Kinabalu",
    description: "Simbol kebanggaan Sabah"
  },
  {
    url: "https://images.unsplash.com/photo-1670308490572-600d71fd23fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    title: "Jalan Menuju Kemajuan",
    description: "Pembangunan infrastruktur Sabah"
  }
];

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setImageLoaded(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setImageLoaded(false);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {!imageLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-green-900/20 backdrop-blur-sm"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full"
                />
              </div>
            </motion.div>
          )}
          <motion.img
            src={slides[currentIndex].url}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 20 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-8 text-white"
          >
            <h3 className="text-3xl mb-2 drop-shadow-lg">{slides[currentIndex].title}</h3>
            <p className="text-lg opacity-90 drop-shadow-lg">{slides[currentIndex].description}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0066cc]/80 hover:bg-[#0066cc] rounded flex items-center justify-center transition-all"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0066cc]/80 hover:bg-[#0066cc] rounded flex items-center justify-center transition-all"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-4 py-2 rounded">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-[#0066cc] w-6"
                : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1080&q=80&fit=crop",
    caption: "Majlis Konvokesyen — Meraikan kejayaan graduan penerima biasiswa Sabah"
  },
  {
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1080&q=80&fit=crop",
    caption: "Program Pembelajaran — Pelajar cemerlang Sabah mencapai potensi terbaik mereka"
  },
  {
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1080&q=80&fit=crop",
    caption: "Anugerah Biasiswa — Majlis penyampaian biasiswa kepada pelajar layak Sabah"
  },
  {
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1080&q=80&fit=crop",
    caption: "Kolaborasi Pelajar — Program pembangunan modal insan anak Sabah"
  },
  {
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1080&q=80&fit=crop",
    caption: "Kampus Universiti — Destinasi pengajian penerima tajaan PTPS Sabah"
  },
  {
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1080&q=80&fit=crop",
    caption: "Komitmen Belajar — Pelajar Sabah memanfaatkan peluang tajaan pendidikan"
  }
];

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [animationType, setAnimationType] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setAnimationType(Math.floor(Math.random() * 5));
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setAnimationType(Math.floor(Math.random() * 5));
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setAnimationType(Math.floor(Math.random() * 5));
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setAnimationType(Math.floor(Math.random() * 5));
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const animationVariants = [
    // 3D Flip
    {
      enter: (direction: number) => ({
        scale: 0.8,
        opacity: 0,
        rotateY: direction > 0 ? 45 : -45,
        z: -100
      }),
      center: {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        z: 0
      },
      exit: (direction: number) => ({
        scale: 1.2,
        opacity: 0,
        rotateY: direction < 0 ? 45 : -45,
        z: 100
      })
    },
    // Fade & Zoom
    {
      enter: {
        scale: 0.7,
        opacity: 0
      },
      center: {
        scale: 1,
        opacity: 1
      },
      exit: {
        scale: 1.3,
        opacity: 0
      }
    },
    // Rotate & Scale
    {
      enter: (direction: number) => ({
        scale: 0.5,
        opacity: 0,
        rotate: direction > 0 ? 90 : -90
      }),
      center: {
        scale: 1,
        opacity: 1,
        rotate: 0
      },
      exit: (direction: number) => ({
        scale: 0.5,
        opacity: 0,
        rotate: direction < 0 ? 90 : -90
      })
    },
    // Slide & Fade
    {
      enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.9
      }),
      center: {
        x: 0,
        opacity: 1,
        scale: 1
      },
      exit: (direction: number) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.9
      })
    },
    // 3D Carousel
    {
      enter: (direction: number) => ({
        rotateY: direction > 0 ? 90 : -90,
        opacity: 0,
        x: direction > 0 ? 500 : -500
      }),
      center: {
        rotateY: 0,
        opacity: 1,
        x: 0
      },
      exit: (direction: number) => ({
        rotateY: direction < 0 ? 90 : -90,
        opacity: 0,
        x: direction < 0 ? 500 : -500
      })
    }
  ];

  const slideVariants = animationVariants[animationType];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#0d1b2f]/40 to-[#0a1628]/40 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl text-white mb-4 tracking-tight drop-shadow-lg">
            ACARA & <span className="text-[#1a56db]">AKTIVITI</span>
          </h2>
          <div className="w-32 h-1 bg-[#1a56db] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Galeri acara dan program yang telah dilaksanakan
          </p>
        </motion.div>

        <div className="relative" style={{ perspective: "2000px" }}>
          {/* Slideshow Container */}
          <div className="relative h-[500px] md:h-[650px] rounded-2xl overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  scale: { type: "spring", stiffness: 200, damping: 25 },
                  rotateY: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.4 },
                  z: { duration: 0.5 }
                }}
                className="absolute inset-0 border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* Background Image with Ken Burns Effect */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 5, ease: "linear" }}
                />

                {/* Gradient Overlay for caption visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black/40 backdrop-blur-md rounded-lg px-6 py-4 border border-white/10"
                  >
                    <p className="text-white text-xl md:text-2xl drop-shadow-2xl">
                      {slides[currentSlide].caption}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-sm hover:bg-[#2563eb] rounded-full flex items-center justify-center transition-colors border border-white/20 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white drop-shadow-lg" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-sm hover:bg-[#2563eb] rounded-full flex items-center justify-center transition-colors border border-white/20 z-10"
            >
              <ChevronRight className="w-6 h-6 text-white drop-shadow-lg" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all ${
                  index === currentSlide
                    ? "w-12 h-3 bg-[#2563eb]"
                    : "w-3 h-3 bg-white/30 hover:bg-white/50"
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

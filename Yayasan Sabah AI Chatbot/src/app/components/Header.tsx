import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../../imports/image.png";

const menuItems = [
  { label: "UTAMA", href: "#hero" },
  {
    label: "MENGENAI",
    href: "#mengenai",
    submenu: [
      { label: "Tentang Kami", href: "#mengenai" },
      { label: "Visi & Misi", href: "#mengenai" },
      {
        label: "Sejarah",
        href: "#mengenai",
        submenu: [
          { label: "Penubuhan", href: "#mengenai" },
          { label: "Pencapaian", href: "#mengenai" },
          { label: "Tonggak Sejarah", href: "#mengenai" }
        ]
      }
    ]
  },
  {
    label: "AKTIVITI",
    href: "#aktiviti",
    submenu: [
      { label: "Profil Korporat", href: "#aktiviti" },
      { label: "Carta Organisasi", href: "#aktiviti" },
      {
        label: "Lembaga Pemegang Amanah",
        href: "#aktiviti",
        submenu: [
          { label: "Ahli Lembaga", href: "#aktiviti" },
          { label: "Tanggungjawab", href: "#aktiviti" }
        ]
      }
    ]
  },
  {
    label: "DIREKTORI",
    href: "#direktori",
    submenu: [
      {
        label: "Pengurusan Atasan",
        href: "#direktori",
        submenu: [
          { label: "Pengarah Tinggi", href: "#direktori" },
          { label: "Timbalan Pengarah", href: "#direktori" },
          { label: "Pegawai Tinggi", href: "#direktori" }
        ]
      },
      { label: "Syarikat Berkaitan", href: "#direktori" }
    ]
  },
  {
    label: "MEDIA",
    href: "#media",
    submenu: [
      { label: "Berita Terkini", href: "#media" },
      {
        label: "Galeri Foto",
        href: "#media",
        submenu: [
          { label: "Galeri 2026", href: "#media" },
          { label: "Galeri 2025", href: "#media" },
          { label: "Galeri Arkib", href: "#media" }
        ]
      },
      { label: "Video", href: "#media" }
    ]
  },
  { label: "HUBUNGI", href: "#hubungi" }
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [mobileSubDropdown, setMobileSubDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveDropdown(null);
      setActiveSubDropdown(null);
      setMobileDropdown(null);
      setMobileSubDropdown(null);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-lg bg-black/30' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative flex flex-col items-center gap-4">
            {/* Logo and Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-[#d4340e]/20 blur-xl group-hover:blur-2xl transition-all"></div>
                <img
                  src={logoImg}
                  alt="Logo"
                  className="w-16 h-16 object-contain relative z-10 drop-shadow-2xl"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="text-white text-xs tracking-[0.3em] opacity-80 drop-shadow-lg">LAMAN WEB RASMI</div>
                <div className="text-white text-lg tracking-[0.4em] drop-shadow-lg">KUMPULAN YAYASAN SABAH</div>
                <div className="text-white/70 text-xs tracking-[0.2em] drop-shadow-lg">Sabah Foundation Group</div>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden lg:flex items-center gap-1"
            >
              {menuItems.map((item, index) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveDropdown(item.label)}
                  onMouseLeave={() => {
                    setActiveDropdown(null);
                    setActiveSubDropdown(null);
                  }}
                >
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => !item.submenu && scrollToSection(item.href)}
                    className="relative px-6 py-2 text-white text-sm tracking-widest overflow-hidden group flex items-center gap-1"
                  >
                    <span className="relative z-10 drop-shadow-lg">{item.label}</span>
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4 relative z-10 drop-shadow-lg" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3E2723] to-[#5D4037] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5D4037] group-hover:w-full transition-all duration-500"></div>
                  </motion.button>

                  {/* Dropdown Menu */}
                  {item.submenu && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 min-w-[250px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-50 overflow-visible"
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <div
                              key={subIndex}
                              className="relative overflow-visible"
                              onMouseEnter={() => subItem.submenu && setActiveSubDropdown(subItem.label)}
                              onMouseLeave={() => setActiveSubDropdown(null)}
                            >
                              <button
                                onClick={() => {
                                  if (!subItem.submenu) {
                                    scrollToSection(subItem.href);
                                    setActiveDropdown(null);
                                  }
                                }}
                                className={`w-full text-left px-6 py-3 text-white text-sm hover:bg-gradient-to-r hover:from-[#3E2723] hover:to-[#5D4037] transition-all border-b border-white/5 flex items-center justify-between ${
                                  subIndex === 0 ? "rounded-t-lg" : ""
                                } ${
                                  subIndex === item.submenu.length - 1 ? "rounded-b-lg border-b-0" : ""
                                }`}
                              >
                                <span>{subItem.label}</span>
                                {subItem.submenu && (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </button>

                              {/* Sub-Submenu */}
                              {subItem.submenu && (
                                <AnimatePresence>
                                  {activeSubDropdown === subItem.label && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -10 }}
                                      transition={{ duration: 0.2 }}
                                      className="absolute left-full top-0 ml-2 min-w-[220px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-[60]"
                                    >
                                      {subItem.submenu.map((subSubItem, subSubIndex) => (
                                        <button
                                          key={subSubIndex}
                                          onClick={() => {
                                            scrollToSection(subSubItem.href);
                                            setActiveDropdown(null);
                                            setActiveSubDropdown(null);
                                          }}
                                          className={`w-full text-left px-6 py-3 text-white text-sm hover:bg-gradient-to-r hover:from-[#3E2723] hover:to-[#5D4037] transition-all border-b border-white/5 ${
                                            subSubIndex === 0 ? "rounded-t-lg" : ""
                                          } ${
                                            subSubIndex === subItem.submenu.length - 1 ? "rounded-b-lg border-b-0" : ""
                                          }`}
                                        >
                                          {subSubItem.label}
                                        </button>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden absolute top-4 right-6 text-white p-2 hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm"
            >
              {isOpen ? <X className="w-6 h-6 drop-shadow-lg" /> : <Menu className="w-6 h-6 drop-shadow-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden backdrop-blur-xl bg-black/50 overflow-hidden border-t border-white/10"
            >
              <div className="px-6 py-4 space-y-2">
                {menuItems.map((item, index) => (
                  <div key={item.label}>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        if (item.submenu) {
                          setMobileDropdown(mobileDropdown === item.label ? null : item.label);
                        } else {
                          scrollToSection(item.href);
                        }
                      }}
                      className="w-full text-left px-4 py-3 text-white hover:bg-gradient-to-r hover:from-[#3E2723] hover:to-[#5D4037] transition-all rounded-lg border-l-4 border-transparent hover:border-white flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      {item.submenu && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </motion.button>

                    {/* Mobile Submenu */}
                    {item.submenu && (
                      <AnimatePresence>
                        {mobileDropdown === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 mt-2 space-y-2 overflow-hidden"
                          >
                            {item.submenu.map((subItem, subIndex) => (
                              <div key={subIndex}>
                                <button
                                  onClick={() => {
                                    if (subItem.submenu) {
                                      setMobileSubDropdown(mobileSubDropdown === subItem.label ? null : subItem.label);
                                    } else {
                                      scrollToSection(subItem.href);
                                      setMobileDropdown(null);
                                      setIsOpen(false);
                                    }
                                  }}
                                  className="w-full text-left px-4 py-2 text-white text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#3E2723] hover:to-[#5D4037] transition-all rounded-lg flex items-center justify-between"
                                >
                                  <span>{subItem.label}</span>
                                  {subItem.submenu && (
                                    <ChevronDown
                                      className={`w-3 h-3 transition-transform ${
                                        mobileSubDropdown === subItem.label ? "rotate-180" : ""
                                      }`}
                                    />
                                  )}
                                </button>

                                {/* Mobile Sub-Submenu */}
                                {subItem.submenu && (
                                  <AnimatePresence>
                                    {mobileSubDropdown === subItem.label && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="ml-4 mt-2 space-y-2 overflow-hidden"
                                      >
                                        {subItem.submenu.map((subSubItem, subSubIndex) => (
                                          <button
                                            key={subSubIndex}
                                            onClick={() => {
                                              scrollToSection(subSubItem.href);
                                              setMobileSubDropdown(null);
                                              setMobileDropdown(null);
                                              setIsOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-white text-xs bg-white/10 hover:bg-gradient-to-r hover:from-[#3E2723] hover:to-[#5D4037] transition-all rounded-lg"
                                          >
                                            {subSubItem.label}
                                          </button>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

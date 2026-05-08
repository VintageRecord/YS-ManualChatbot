import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../../imports/image.png";

const menuItems = [
  { label: "UTAMA", href: "#hero" },
  {
    label: "MENGENAI",
    href: "#mengenai",
    submenu: [
      { label: "Latar Belakang PTPS", href: "#mengenai" },
      { label: "Objektif Portal", href: "#mengenai" },
      { label: "Badan-Badan Penaja", href: "#mengenai" },
    ]
  },
  {
    label: "JENIS TAJAAN",
    href: "#tajaan",
    submenu: [
      { label: "Biasiswa KNS (BKNS)", href: "#tajaan" },
      { label: "Dermasiswa MUIS", href: "#tajaan" },
      { label: "Tajaan TSK", href: "#tajaan" },
      {
        label: "Yayasan Sabah",
        href: "#tajaan",
        submenu: [
          { label: "Biasiswa Penuh", href: "#tajaan" },
          { label: "Pinjaman Pengajian", href: "#tajaan" },
          { label: "Geran Pengajian", href: "#tajaan" },
        ]
      },
      { label: "Baitulmal Sabah", href: "#tajaan" },
    ]
  },
  {
    label: "CARA MOHON",
    href: "#cara-mohon",
    submenu: [
      { label: "Semak Kelayakan", href: "#cara-mohon" },
      { label: "Daftar & Log Masuk", href: "#cara-mohon" },
      { label: "Isi Borang Permohonan", href: "#cara-mohon" },
      { label: "Dokumen Diperlukan", href: "#cara-mohon" },
      { label: "Semak Status Permohonan", href: "#cara-mohon" },
    ]
  },
  {
    label: "PEMBAYARAN",
    href: "#pembayaran",
    submenu: [
      { label: "Bayar Balik Pinjaman", href: "#pembayaran" },
      { label: "Insentif & Rebat", href: "#pembayaran" },
      { label: "Jadual Pembayaran", href: "#pembayaran" },
    ]
  },
  { label: "HUBUNGI", href: "#hubungi" },
  { label: "YS CHATBOT", href: "", route: "/chatbot" },
];

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [mobileSubDropdown, setMobileSubDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAll = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setMobileDropdown(null);
    setMobileSubDropdown(null);
  };

  const scrollToSection = (href: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeAll();
    }
  };

  const handleNavClick = (item: { label: string; href: string; route?: string; submenu?: unknown[] }) => {
    if (item.route) {
      navigate(item.route);
      closeAll();
    } else if (!item.submenu) {
      scrollToSection(item.href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-lg bg-black/40" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="relative flex flex-col items-center gap-3">
            {/* Logo and Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-[#1a56db]/20 blur-xl group-hover:blur-2xl transition-all"></div>
                <img
                  src={logoImg}
                  alt="Logo"
                  className="w-14 h-14 object-contain relative z-10 drop-shadow-2xl"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="text-white text-[10px] tracking-[0.3em] opacity-70 drop-shadow-lg">LAMAN WEB RASMI</div>
                <div className="text-white text-sm font-semibold tracking-[0.15em] drop-shadow-lg leading-tight">
                  PORTAL TAJAAN & PEMINJAMAN
                </div>
                <div className="text-[#f0a500] text-sm font-semibold tracking-[0.15em] drop-shadow-lg leading-tight">
                  PENDIDIKAN SABAH
                </div>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden lg:flex items-center gap-0 flex-wrap justify-center"
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
                    transition={{ delay: index * 0.08 }}
                    onClick={() => handleNavClick(item)}
                    className={`relative px-4 py-2 text-white text-xs tracking-wider overflow-hidden group flex items-center gap-1.5 ${
                      item.route === "/chatbot"
                        ? "bg-gradient-to-r from-[#1a56db]/80 to-[#1e3a8a]/80 rounded-full border border-[#1a56db]/40 backdrop-blur-sm hover:from-[#1a56db] hover:to-[#1e3a8a] transition-all ml-2"
                        : ""
                    }`}
                  >
                    {item.route === "/chatbot" && (
                      <img src={logoImg} alt="YS" className="w-4 h-4 object-contain relative z-10" />
                    )}
                    <span className="relative z-10 drop-shadow-lg">{item.label}</span>
                    {item.submenu && (
                      <ChevronDown className="w-3 h-3 relative z-10 drop-shadow-lg" />
                    )}
                    {!item.route && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1a56db] group-hover:w-full transition-all duration-500"></div>
                      </>
                    )}
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
                          className="absolute top-full left-0 mt-2 min-w-[220px] bg-black/85 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-50 overflow-visible"
                        >
                          {item.submenu.map((subItem: any, subIndex: number) => (
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
                                className={`w-full text-left px-5 py-3 text-white text-xs hover:bg-gradient-to-r hover:from-[#1e3a8a] hover:to-[#2563eb] transition-all border-b border-white/5 flex items-center justify-between ${
                                  subIndex === 0 ? "rounded-t-lg" : ""
                                } ${
                                  subIndex === item.submenu.length - 1 ? "rounded-b-lg border-b-0" : ""
                                }`}
                              >
                                <span>{subItem.label}</span>
                                {subItem.submenu && <ChevronRight className="w-3 h-3" />}
                              </button>

                              {subItem.submenu && (
                                <AnimatePresence>
                                  {activeSubDropdown === subItem.label && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -10 }}
                                      transition={{ duration: 0.2 }}
                                      className="absolute left-full top-0 ml-2 min-w-[200px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-[60]"
                                    >
                                      {subItem.submenu.map((subSubItem: any, subSubIndex: number) => (
                                        <button
                                          key={subSubIndex}
                                          onClick={() => {
                                            scrollToSection(subSubItem.href);
                                            setActiveDropdown(null);
                                            setActiveSubDropdown(null);
                                          }}
                                          className={`w-full text-left px-5 py-3 text-white text-xs hover:bg-gradient-to-r hover:from-[#1e3a8a] hover:to-[#2563eb] transition-all border-b border-white/5 ${
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
              className="lg:hidden absolute top-3 right-4 text-white p-2 hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm"
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
              className="lg:hidden backdrop-blur-xl bg-black/60 overflow-hidden border-t border-white/10"
            >
              <div className="px-6 py-4 space-y-1">
                {menuItems.map((item, index) => (
                  <div key={item.label}>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        if (item.route) {
                          navigate(item.route);
                          closeAll();
                        } else if (item.submenu) {
                          setMobileDropdown(mobileDropdown === item.label ? null : item.label);
                        } else {
                          scrollToSection(item.href);
                        }
                      }}
                      className={`w-full text-left px-4 py-3 text-white text-sm transition-all rounded-lg flex items-center justify-between ${
                        item.route === "/chatbot"
                          ? "bg-gradient-to-r from-[#1a56db]/50 to-[#1e3a8a]/50 border border-[#1a56db]/30"
                          : "hover:bg-gradient-to-r hover:from-[#1e3a8a] hover:to-[#2563eb] border-l-4 border-transparent hover:border-[#1a56db]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.route === "/chatbot" && (
                          <img src={logoImg} alt="YS" className="w-5 h-5 object-contain" />
                        )}
                        {item.label}
                      </span>
                      {item.submenu && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </motion.button>

                    {item.submenu && (
                      <AnimatePresence>
                        {mobileDropdown === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 mt-1 space-y-1 overflow-hidden"
                          >
                            {item.submenu.map((subItem: any, subIndex: number) => (
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
                                  className="w-full text-left px-4 py-2 text-white text-xs bg-white/5 hover:bg-gradient-to-r hover:from-[#1e3a8a] hover:to-[#2563eb] transition-all rounded-lg flex items-center justify-between"
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

                                {subItem.submenu && (
                                  <AnimatePresence>
                                    {mobileSubDropdown === subItem.label && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="ml-4 mt-1 space-y-1 overflow-hidden"
                                      >
                                        {subItem.submenu.map((subSubItem: any, subSubIndex: number) => (
                                          <button
                                            key={subSubIndex}
                                            onClick={() => {
                                              scrollToSection(subSubItem.href);
                                              setMobileSubDropdown(null);
                                              setMobileDropdown(null);
                                              setIsOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-white text-xs bg-white/10 hover:bg-gradient-to-r hover:from-[#1e3a8a] hover:to-[#2563eb] transition-all rounded-lg"
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

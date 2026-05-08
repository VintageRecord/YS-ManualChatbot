import { useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../../imports/image.png";

interface SubSubItem {
  label: string;
  href: string;
}

interface SubMenuItem {
  label: string;
  href: string;
  submenu?: SubSubItem[];
}

interface NavItem {
  label: string;
  href: string;
  submenu?: SubMenuItem[];
}

const navItems: NavItem[] = [
  { label: "Utama", href: "#hero" },
  {
    label: "Mengenai",
    href: "#mengenai",
    submenu: [
      {
        label: "Tentang Kami",
        href: "#mengenai",
        submenu: [
          { label: "Profil Korporat", href: "#mengenai" },
          { label: "Carta Organisasi", href: "#mengenai" },
          { label: "Lembaga Pemegang Amanah", href: "#mengenai" }
        ]
      },
      {
        label: "Visi & Misi",
        href: "#mengenai",
        submenu: [
          { label: "Visi Strategik", href: "#mengenai" },
          { label: "Misi Korporat", href: "#mengenai" },
          { label: "Nilai Teras", href: "#mengenai" }
        ]
      },
      {
        label: "Sejarah",
        href: "#mengenai",
        submenu: [
          { label: "Penubuhan", href: "#mengenai" },
          { label: "Pencapaian", href: "#mengenai" },
          { label: "Perkembangan", href: "#mengenai" }
        ]
      }
    ]
  },
  {
    label: "Aktiviti",
    href: "#aktiviti",
    submenu: [
      {
        label: "Sosial",
        href: "#aktiviti",
        submenu: [
          { label: "Aktiviti Zon", href: "#aktiviti" },
          { label: "Pembangunan Kapasiti", href: "#aktiviti" },
          { label: "Pendidikan", href: "#aktiviti" }
        ]
      },
      {
        label: "Komersial",
        href: "#aktiviti",
        submenu: [
          { label: "Pelaburan", href: "#aktiviti" },
          { label: "Perdagangan", href: "#aktiviti" },
          { label: "Perniagaan", href: "#aktiviti" }
        ]
      },
      {
        label: "Tanggungjawab Sosial Korporat",
        href: "#aktiviti",
        submenu: [
          { label: "Program Komuniti", href: "#aktiviti" },
          { label: "Alam Sekitar", href: "#aktiviti" },
          { label: "Kebajikan", href: "#aktiviti" }
        ]
      }
    ]
  },
  {
    label: "Direktori",
    href: "#direktori",
    submenu: [
      {
        label: "Syarikat Subsidiari",
        href: "#direktori",
        submenu: [
          { label: "Kolej Teknologi Yayasan Sabah", href: "#direktori" },
          { label: "Perkembangan Kanak-Kanak", href: "#direktori" },
          { label: "University College Sabah Foundation", href: "#direktori" }
        ]
      },
      {
        label: "Institusi Pendidikan",
        href: "#direktori",
        submenu: [
          { label: "Perpustakaan Penyelidikan Borneo Tun Fuad Stephens", href: "#direktori" },
          { label: "Galeri Tun Mustapha", href: "#direktori" }
        ]
      },
      {
        label: "Kemudahan",
        href: "#direktori",
        submenu: [
          { label: "Program Sosioekonomi", href: "#direktori" },
          { label: "Program Kesihatan Pekerjaan", href: "#direktori" }
        ]
      }
    ]
  },
  {
    label: "Media",
    href: "#media",
    submenu: [
      {
        label: "Berita",
        href: "#media",
        submenu: [
          { label: "Berita Terkini", href: "#media" },
          { label: "Siaran Akhbar", href: "#media" },
          { label: "Liputan Media", href: "#media" }
        ]
      },
      {
        label: "Pengumuman",
        href: "#media",
        submenu: [
          { label: "Pengumuman Rasmi", href: "#media" },
          { label: "Notis", href: "#media" },
          { label: "Kenyataan", href: "#media" }
        ]
      },
      {
        label: "Galeri",
        href: "#media",
        submenu: [
          { label: "Galeri Foto", href: "#media" },
          { label: "Galeri Video", href: "#media" },
          { label: "Arkib", href: "#media" }
        ]
      }
    ]
  }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    closeTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }, 300);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="bg-[#0066cc] text-white py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={logoImg}
              alt="Yayasan Sabah Logo"
              className="w-14 h-14 object-contain bg-white rounded-full p-1"
            />
            <div>
              <h1 className="text-white leading-tight">Kumpulan Yayasan Sabah</h1>
              <p className="text-xs text-blue-100">Sabah Foundation Group</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded transition-colors"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="px-5 py-4 text-gray-700 hover:bg-blue-50 hover:text-[#0066cc] transition-all flex items-center gap-1 border-b-2 border-transparent hover:border-[#0066cc]"
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {item.submenu && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                    className="absolute top-full left-0 flex bg-white border border-gray-200 shadow-xl overflow-hidden z-50"
                  >
                    <div className="min-w-[200px] border-r border-gray-200">
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.label}
                          onClick={() => scrollToSection(subItem.href)}
                          onMouseEnter={() => setActiveSubmenu(subItem.label)}
                          className={`w-full px-4 py-3 text-left text-sm transition-colors border-l-4 ${
                            activeSubmenu === subItem.label
                              ? "border-[#0066cc] bg-blue-50 text-[#0066cc]"
                              : "border-transparent hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                    {activeSubmenu && (
                      <div className="min-w-[220px]">
                        {item.submenu
                          .find((sub) => sub.label === activeSubmenu)
                          ?.submenu?.map((subSubItem) => (
                            <button
                              key={subSubItem.label}
                              onClick={() => scrollToSection(subSubItem.href)}
                              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0066cc] transition-colors"
                            >
                              {subSubItem.label}
                            </button>
                          ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-200"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      if (item.submenu) {
                        setActiveDropdown(activeDropdown === item.label ? null : item.label);
                      } else {
                        scrollToSection(item.href);
                      }
                    }}
                    className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-[#0066cc] transition-colors flex items-center justify-between border-l-4 border-transparent hover:border-[#0066cc]"
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {item.submenu && activeDropdown === item.label && (
                    <div className="ml-4 mt-1 space-y-1 bg-gray-50 rounded-lg p-2">
                      {item.submenu.map((subItem) => (
                        <div key={subItem.label}>
                          <button
                            onClick={() => {
                              if (subItem.submenu) {
                                setActiveSubmenu(activeSubmenu === subItem.label ? null : subItem.label);
                              } else {
                                scrollToSection(subItem.href);
                              }
                            }}
                            className="w-full px-4 py-2 text-left text-gray-600 text-sm hover:bg-white hover:text-[#0066cc] rounded transition-colors flex items-center justify-between"
                          >
                            {subItem.label}
                            {subItem.submenu && (
                              <ChevronDown
                                className={`w-3 h-3 transition-transform ${
                                  activeSubmenu === subItem.label ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </button>
                          {subItem.submenu && activeSubmenu === subItem.label && (
                            <div className="ml-4 mt-1 space-y-1">
                              {subItem.submenu.map((subSubItem) => (
                                <button
                                  key={subSubItem.label}
                                  onClick={() => scrollToSection(subSubItem.href)}
                                  className="w-full px-4 py-2 text-left text-gray-600 text-xs hover:bg-white hover:text-[#0066cc] rounded transition-colors"
                                >
                                  {subSubItem.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

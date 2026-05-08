import { motion } from "motion/react";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import innopriselogo from "../../imports/image-3.png";
import sabahSoftwoodsLogo from "../../imports/image-4.png";
import shangrilaLogo from "../../imports/image-5.png";
import ucsLogo from "../../imports/image-6.png";

const companies = [
  { name: "HAP SENG PLANTATIONS", subtitle: "HOLDINGS BERHAD" },
  { name: "Innoprise Plantations", logo: innopriselogo },
  { name: "Sabah Holidays", subtitle: "Let nature refresh your spirit" },
  { name: "KTYS", subtitle: "KOLEJ TEKNOLOGI YAYASAN SABAH" },
  { name: "Sabah Softwoods Berhad", logo: sabahSoftwoodsLogo },
  { name: "Shangri-La Hotels & Resorts", logo: shangrilaLogo },
  { name: "Bioscape" },
  { name: "UCSF", logo: ucsLogo },
];

export function FooterSection() {
  return (
    <>
      {/* Pautan Kumpulan Berkaitan - Related Links Carousel */}
      <section className="py-16 overflow-hidden bg-black/30 backdrop-blur-md border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl text-white mb-4 drop-shadow-lg">Pautan Kumpulan Berkaitan</h2>
            <div className="w-24 h-1 bg-[#f59e0b] mx-auto"></div>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...companies, ...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-56 h-32 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 hover:border-[#f59e0b] transition-all border border-white/20"
              >
                <div className="flex flex-col items-center justify-center h-full text-center">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-w-full max-h-20 object-contain"
                    />
                  ) : (
                    <>
                      <p className="text-sm text-white drop-shadow-lg">
                        {company.name}
                      </p>
                      {company.subtitle && (
                        <p className="text-xs text-gray-300 mt-1 drop-shadow-lg">{company.subtitle}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hubungi Kami - Contact Footer */}
      <footer id="hubungi" className="bg-black/40 backdrop-blur-lg text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl text-white mb-4 drop-shadow-lg">Hubungi Kami</h2>
            <div className="w-32 h-1 bg-[#f59e0b] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Contact Info - Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f59e0b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-gray-300 mb-2 text-sm">Talian Utama</p>
                  <p className="text-white text-sm">+088 58 32 777</p>
                  <p className="text-white text-sm">+088 58 32 888</p>
                  <p className="text-white text-sm">+088 58 32 999</p>
                  <p className="text-white text-sm">+088 32 66 01</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f59e0b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-gray-300 mb-2 text-sm">Talian Mudah Alih</p>
                  <p className="text-white text-sm">+019 885 4567</p>
                  <p className="text-white text-sm">+013 886 4567</p>
                  <p className="text-white text-sm">+085 17 999 0101</p>
                  <p className="text-white text-sm">+085 17 999 0202</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Info - Column 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f59e0b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-gray-300 mb-2 text-sm">Pejabat Pengarah Tinggi</p>
                  <p className="text-white text-sm">+088 32 66 99</p>
                  <p className="text-white text-sm">+088 32 66 88</p>
                  <p className="text-white text-sm">+088 58 32 987</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f59e0b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-gray-300 mb-2 text-sm">Pejabat Timbalan Pengarah</p>
                  <p className="text-white text-sm">+088 32 66 77</p>
                  <p className="text-white text-sm">+088 32 66 66</p>
                  <p className="text-white text-sm">+088 58 33 87</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f59e0b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-gray-300 mb-2 text-sm">Pejabat Pegawas Tinggi</p>
                  <p className="text-white text-sm">+088 32 66 55</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Info - Column 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f59e0b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-gray-300 mb-2 text-sm">Emel</p>
                  <a href="mailto:bppysinfo@ysnet.org.my" className="text-white text-sm hover:text-[#f59e0b] transition-colors">
                    bppysinfo@ysnet.org.my
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f59e0b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-gray-300 mb-2 text-sm">Alamat</p>
                  <p className="text-white text-sm leading-relaxed">
                    Tingkat 11, Menara Tun Mustapha,<br />
                    Likas Bay, 88400 Kota Kinabalu,<br />
                    Sabah, Malaysia
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social & Visitor Count - Column 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl mb-6 text-white">Ikuti Kami</h3>
              <div className="flex gap-4 mb-6">
                <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-[#f59e0b] rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-[#f59e0b] rounded-lg flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-[#f59e0b] rounded-lg flex items-center justify-center transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-gray-300 text-sm mb-2">Pelawat</p>
                <p className="text-3xl text-[#f59e0b]">8,888,888</p>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2026 Kumpulan Yayasan Sabah. Hak Cipta Terpelihara.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#f59e0b] transition-colors">Dasar Privasi</a>
              <a href="#" className="hover:text-[#f59e0b] transition-colors">Terma & Syarat</a>
              <a href="#" className="hover:text-[#f59e0b] transition-colors">Penafian</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

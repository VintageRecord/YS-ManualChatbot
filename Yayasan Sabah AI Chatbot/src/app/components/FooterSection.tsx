import { motion } from "motion/react";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

const penaja = [
  { code: "BKNS", name: "Biasiswa Kerajaan Negeri Sabah", color: "#d4340e" },
  { code: "MUIS", name: "Majlis Ugama Islam Sabah", color: "#0891b2" },
  { code: "TSK", name: "Timbalan Setiausaha Kerajaan", color: "#10b981" },
  { code: "YS", name: "Kumpulan Yayasan Sabah", color: "#f59e0b" },
  { code: "BAITULMAL", name: "Perbadanan Baitulmal Sabah", color: "#8b5cf6" },
];

export function FooterSection() {
  return (
    <>
      {/* Badan Penaja Carousel */}
      <section id="pembayaran" className="py-14 overflow-hidden bg-black/30 backdrop-blur-md border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl text-white mb-2 drop-shadow-lg">Badan-Badan Penaja Portal PTPS</h2>
            <div className="w-24 h-1 bg-[#d4340e] mx-auto"></div>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            className="flex gap-6 px-4"
            animate={{ x: [0, -1400] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
          >
            {[...penaja, ...penaja, ...penaja].map((p, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-52 h-28 rounded-xl p-4 flex flex-col items-center justify-center text-center border backdrop-blur-sm transition-all"
                style={{ backgroundColor: `${p.color}15`, borderColor: `${p.color}40` }}
              >
                <div
                  className="text-xl font-black mb-1"
                  style={{ color: p.color }}
                >
                  {p.code}
                </div>
                <div className="text-white/70 text-xs leading-tight">{p.name}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Loan Repayment Info */}
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Insentif Rebat Lump Sum",
                desc: "Rebat 20% untuk bayaran sepenggal (lump sum) bagi pinjaman Yayasan Sabah.",
                color: "#d4340e",
              },
              {
                title: "Rebat Bayaran Konsisten",
                desc: "Rebat 10% untuk pemegang pinjaman yang membayar balik secara konsisten tanpa tunggakan.",
                color: "#10b981",
              },
              {
                title: "Penangguhan Pembayaran",
                desc: "Kemudahan penangguhan tersedia untuk graduan dengan pendapatan isi rumah di bawah RM 4,000.",
                color: "#0891b2",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <div className="w-1 h-8 rounded-full mb-3" style={{ backgroundColor: item.color }}></div>
                <h4 className="text-white font-semibold text-sm mb-2">{item.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hubungi Kami - Contact Footer */}
      <footer id="hubungi" className="bg-black/50 backdrop-blur-lg text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-white mb-2 drop-shadow-lg">Hubungi Kami</h2>
            <p className="text-gray-400 text-sm mb-4">Bahagian Pelajaran & Pinjaman Pengajian (BPPP) — Yayasan Sabah</p>
            <div className="w-32 h-1 bg-[#d4340e] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#d4340e]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#d4340e]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-2 tracking-widest">TELEFON</p>
                  <p className="text-white text-sm">+60 88-421123</p>
                  <p className="text-gray-400 text-xs mt-1">Bahagian BPPP Yayasan Sabah</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#d4340e]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#d4340e]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-2 tracking-widest">TALIAN PTPS</p>
                  <p className="text-white text-sm">+60 88-326300</p>
                  <p className="text-gray-400 text-xs mt-1">Ibu Pejabat Yayasan Sabah</p>
                </div>
              </div>
            </motion.div>

            {/* Email & Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#d4340e]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#d4340e]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-2 tracking-widest">E-MEL</p>
                  <a
                    href="mailto:bppysinfo@ysnet.org.my"
                    className="text-white text-sm hover:text-[#d4340e] transition-colors"
                  >
                    bppysinfo@ysnet.org.my
                  </a>
                  <p className="text-gray-400 text-xs mt-1">Pertanyaan BPPP</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#d4340e]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-[#d4340e]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-2 tracking-widest">PORTAL RASMI</p>
                  <a
                    href="https://ptps.sabah.gov.my"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm hover:text-[#d4340e] transition-colors flex items-center gap-1"
                  >
                    ptps.sabah.gov.my
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.yayasansabahgroup.org.my"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-xs hover:text-[#d4340e] transition-colors flex items-center gap-1 mt-1"
                  >
                    yayasansabahgroup.org.my
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#d4340e]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#d4340e]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-2 tracking-widest">ALAMAT</p>
                  <p className="text-white text-sm leading-relaxed">
                    Bahagian Pelajaran & Pinjaman Pengajian,<br />
                    Tingkat 11, Menara Tun Mustapha,<br />
                    Likas Bay, 88400 Kota Kinabalu,<br />
                    Sabah, Malaysia
                  </p>
                </div>
              </div>
              <div className="mt-4 ml-13 pl-1">
                <p className="text-gray-500 text-xs">
                  Waktu Pejabat:<br />
                  Isnin – Khamis: 8:00pg – 5:00ptg<br />
                  Jumaat: 8:00pg – 12:15tgh & 2:45ptg – 5:00ptg
                </p>
              </div>
            </motion.div>

            {/* Social & Visitor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm text-gray-400 tracking-widest mb-4">IKUTI KAMI</h3>
              <div className="flex gap-3 mb-6">
                <a
                  href="#"
                  className="w-11 h-11 bg-white/10 hover:bg-[#d4340e] rounded-lg flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 bg-white/10 hover:bg-[#d4340e] rounded-lg flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 bg-white/10 hover:bg-[#d4340e] rounded-lg flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1 tracking-widest">JUMLAH PELAWAT</p>
                <p className="text-3xl text-[#d4340e] font-bold">8,888,888</p>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <div>
              <p className="font-medium text-gray-400">Portal Tajaan & Peminjaman Pendidikan Sabah (PTPS)</p>
              <p>© 2026 Kumpulan Yayasan Sabah. Hak Cipta Terpelihara.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#d4340e] transition-colors">Dasar Privasi</a>
              <a href="#" className="hover:text-[#d4340e] transition-colors">Terma & Syarat</a>
              <a href="#" className="hover:text-[#d4340e] transition-colors">Penafian</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

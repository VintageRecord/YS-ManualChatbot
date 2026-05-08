import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0066cc] text-white">{/* Main Footer Content */}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 mb-8">
          <div className="lg:col-span-2">
            <h4 className="text-xl mb-4 border-b border-white/30 pb-2">Hubungi Kami</h4>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-blue-100 text-sm mb-2">Talian Utama</p>
                  <div className="space-y-1 text-sm">
                    <p>+088 58 32 777</p>
                    <p>+088 58 32 888</p>
                    <p>+088 58 32 999</p>
                    <p>+088 32 66 01</p>
                    <p>+088 58 33 01</p>
                  </div>
                </div>

                <div>
                  <p className="text-blue-100 text-sm mb-2">Talian Mudah Alih</p>
                  <div className="space-y-1 text-sm">
                    <p>+019 885 4567</p>
                    <p>+013 886 4567</p>
                    <p>+085 17 999 0101</p>
                    <p>+085 17 999 0202</p>
                  </div>
                </div>

                <div>
                  <p className="text-blue-100 text-sm mb-2">Pejabat Pengarah Tinggi</p>
                  <div className="space-y-1 text-sm">
                    <p>+088 32 66 99</p>
                    <p>+088 32 66 88</p>
                    <p>+088 58 32 987</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-blue-100 text-sm mb-2">Pejabat Timbalan Pengarah</p>
                  <div className="space-y-1 text-sm">
                    <p>+088 32 66 77</p>
                    <p>+088 32 66 66</p>
                    <p>+088 58 33 87</p>
                  </div>
                </div>

                <div>
                  <p className="text-blue-100 text-sm mb-2">Pejabat Pegawas Tinggi</p>
                  <div className="space-y-1 text-sm">
                    <p>+088 32 66 55</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Emel</p>
                      <a href="mailto:bppysinfo@ysnet.org.my" className="hover:text-blue-100 transition-colors">
                        bppysinfo@ysnet.org.my
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Alamat</p>
                      <p className="text-sm leading-relaxed">
                        Tingkat 11, Menara Tun Mustapha,<br />
                        Likas Bay, 88400 Kota Kinabalu,<br />
                        Sabah, Malaysia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl mb-4 border-b border-white/30 pb-2">Pautan Berguna</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-blue-100 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Soalan-Soalan Biasa
              </a></li>
              <li><a href="#" className="text-sm hover:text-blue-100 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Maklumat Kontraktor
              </a></li>
              <li><a href="#" className="text-sm hover:text-blue-100 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Penyata Kewangan
              </a></li>
              <li><a href="#" className="text-sm hover:text-blue-100 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Tender & Sebutharga
              </a></li>
              <li><a href="#" className="text-sm hover:text-blue-100 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Portal Pendidik
              </a></li>
              <li><a href="#" className="text-sm hover:text-blue-100 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Portal Pelajar
              </a></li>
              <li><a href="#" className="text-sm hover:text-blue-100 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Portal Ibu Bapa
              </a></li>
              <li><a href="#" className="text-sm hover:text-blue-100 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Maklum Balas
              </a></li>
              <li><a href="#" className="text-sm hover:text-blue-100 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Portal Data Terbuka
              </a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl mb-4 border-b border-white/30 pb-2">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0052a3] border-t border-white/20 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span>© 2026 Kumpulan Yayasan Sabah</span>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-blue-100 transition-colors">Dasar Privasi</a>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-blue-100 transition-colors">Terma & Syarat</a>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-blue-100 transition-colors">Penafian</a>
            </div>
            <div className="flex items-center gap-2">
              <span>Pelawat:</span>
              <span className="px-3 py-1 bg-white/20 rounded">8,888,888</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { motion } from "motion/react";
import innopriselogo from "../../imports/image-3.png";
import sabahSoftwoodsLogo from "../../imports/image-4.png";
import shangrilaLogo from "../../imports/image-5.png";
import ucsLogo from "../../imports/image-6.png";

export function RelatedLinksCarousel() {
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

  return (
    <div className="py-16 overflow-hidden bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="text-3xl text-[#0066cc] mb-2">Pautan Kumpulan Berkaitan</h2>
          <div className="w-20 h-1 bg-[#0066cc] mx-auto"></div>
        </div>
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
              className="flex-shrink-0 w-56 h-32 bg-white rounded p-4 hover:shadow-lg transition-all border border-gray-200"
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
                    <p className="text-sm text-gray-800">
                      {company.name}
                    </p>
                    {company.subtitle && (
                      <p className="text-xs text-gray-500 mt-1">{company.subtitle}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

import React from "react";
import Image from 'next/image';
import lang from "./lang.json";

function t(key, language) {
  return lang[key] && lang[key][language] ? lang[key][language] : key;
}

function SeoText(props) {
  const language = props.language;
  return (
    <div className="mt-6 bottom-16 mx-auto h-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
        {/* Left Column - Welcome Section */}
        <div className="space-y-6 h-full flex flex-col">
          <h2 className="lg:text-[40px] text-[24px] text-[#071016] font-semibold">
            {t("seotext_title", language)}
          </h2>
          <Image 
            src="../public/images/welcome-img.svg" 
            alt="Welcome to secure password generation" 
            className="sepia-60 w-full hover:sepia-0 transition-all duration-300 rounded-lg"
            loading="lazy"
            decoding="async"
            width={500}
          />
          <div className="space-y-4 flex-grow">
            <p className="text-[18px] text-[#071016] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_intro1", language) }} />
            <p className="text-[18px] text-[#071016] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_intro2", language) }} />
          </div>
        </div>
        {/* Right Column - Why Choose Us Section */}
        <div className="space-y-6 h-full flex flex-col">
          <h3 className="lg:text-[32px] text-[20px] text-[#071016] font-semibold">
            {t("seotext_why_title", language)}
          </h3>
          <div className="space-y-4 flex-grow">
            <p className="text-[18px] text-[#071016] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_why1", language) }} />
            <p className="text-[18px] text-[#071016] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_why2", language) }} />
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-[#2A4E63] mb-2">
              {t("seotext_features_title", language)}
            </h4>
            <ul className="text-[16px] text-[#071016] space-y-1">
              <li>• {t("seotext_feature1", language)}</li>
              <li>• {t("seotext_feature2", language)}</li>
              <li>• {t("seotext_feature3", language)}</li>
              <li>• {t("seotext_feature4", language)}</li>
              <li>• {t("seotext_feature5", language)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SeoText;

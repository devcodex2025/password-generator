import React from "react";
import lang from './lang.json';

function t(key, language) {
  return lang[key] && lang[key][language] ? lang[key][language] : key;
}

function SeoList(props) {
  const language = props.language;
  return (
    <div className="mt-6 bottom-16 mx-auto h-auto max-w-6xl px-4">
      <div className="items-center justify-between max-w-6xl">
        <h2 className="lg:text-[40px] text-[24px] text-[#071016] font-semibold mb-8">
          {t('seolist_title', language)}
        </h2>
        
        <div className="text-[18px] text-[#071016] leading-relaxed mb-8">
          <p className="mb-6" dangerouslySetInnerHTML={{ __html: t('seolist_intro1', language) }} />
          
          <p className="mb-6" dangerouslySetInnerHTML={{ __html: t('seolist_intro2', language) }} />
        </div>

        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Column 1 - Basic Password Security */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#2A4E63] mb-4">
              {t('seolist_basic_password_security_title', language)}
            </h3>
            <div className="space-y-4">
              <div dangerouslySetInnerHTML={{ __html: t('seolist_basic_password_security_1', language) }} />
              
              <div dangerouslySetInnerHTML={{ __html: t('seolist_basic_password_security_2', language) }} />
              
              <div dangerouslySetInnerHTML={{ __html: t('seolist_basic_password_security_3', language) }} />
            </div>
          </div>

          {/* Column 2 - Advanced Security */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#2A4E63] mb-4">
              {t('seolist_advanced_security_title', language)}
            </h3>
            <div className="space-y-4">
              <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_1', language) }} />
              
              <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_2', language) }} />
              
              <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_3', language) }} />
            </div>
          </div>

          {/* Column 3 - Best Practices */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#2A4E63] mb-4">
              {t('seolist_best_practices_title', language)}
            </h3>
            <div className="space-y-4">
              <div dangerouslySetInnerHTML={{ __html: t('seolist_best_practices_1', language) }} />
              
              <div dangerouslySetInnerHTML={{ __html: t('seolist_best_practices_2', language) }} />
              
              <div dangerouslySetInnerHTML={{ __html: t('seolist_best_practices_3', language) }} />
            </div>
          </div>
        </div>

        {/* Additional 2-column section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          {/* Additional Security Tips */}
          <div className="bg-blue-50 p-6 rounded-lg h-full flex flex-col">
            <h3 className="text-xl font-semibold text-[#2A4E63] mb-4">
              {t('seolist_additional_security_tips_title', language)}
            </h3>
            <div className="space-y-4 flex-grow">
              <div dangerouslySetInnerHTML={{ __html: t('seolist_additional_security_tips_1', language) }} />
              
              <div dangerouslySetInnerHTML={{ __html: t('seolist_additional_security_tips_2', language) }} />
            </div>
          </div>
          
          {/* Advanced Security Measures */}
          <div className="bg-green-50 p-6 rounded-lg h-full flex flex-col">
            <h3 className="text-xl font-semibold text-[#2A4E63] mb-4">
              {t('seolist_advanced_security_measures_title', language)}
            </h3>
            <div className="space-y-4 flex-grow">
              <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_measures_1', language) }} />
              
              <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_measures_2', language) }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoList;

import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Image from 'next/image';
import lang from "./lang.json";
import SEOKeywords from './SEOKeywords';
import ShareBlock from './ShareBlock';

function t(key, language) {
  return lang[key] && lang[key][language] ? lang[key][language] : key;
}

const SeoAccordion = ({ language }) => {
  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4 lg:px-8">
      <Accordion type="single" collapsible className="rounded-2xl border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#1c1c1c] shadow p-6 lg:p-8">
        {/* SEO Welcome Section */}
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-[20px] lg:text-[26px] text-[#071016] dark:text-[#e0e0e0] font-semibold hover:text-[#111827] transition-all duration-200">
            {t("seotext_title", language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-4">
              {/* Left Column - Introduction */}
              <div className="space-y-4">
                <Image 
                  src="/images/welcome-img.svg" 
                  alt="Welcome to Password Generator" 
                  className="w-full h-auto rounded-lg shadow-lg"
                  width={600}
                  height={400}
                  priority
                  />
                <div className="space-y-4">
                  <p className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_intro1", language) }} />
                  <p className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_intro2", language) }} />
                  <SEOKeywords language={language} />
                </div>
              </div>
              {/* Right Column - Why Choose Us */}
              <div className="space-y-4 flex-1">
                <h3 className="text-[20px] lg:text-[28px] text-[#111827] dark:text-[#e0e0e0] font-semibold">
                  {t("seotext_why_title", language)}
                </h3>
                <p className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_why1", language) }} />
                <p className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_why2", language) }} />
                <div className="bg-blue-50 dark:bg-[#2A4E63] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#111827] dark:text-[#e0e0e0] mb-2">
                    {t("seotext_features_title", language)}
                  </h4>
                  <ul className="text-[16px] text-[#071016] dark:text-[#e0e0e0] space-y-1">
                    <li>• {t("seotext_feature1", language)}</li>
                    <li>• {t("seotext_feature2", language)}</li>
                    <li>• {t("seotext_feature3", language)}</li>
                    <li>• {t("seotext_feature4", language)}</li>
                    <li>• {t("seotext_feature5", language)}</li>
                  </ul>
                </div>
              </div>
              <ShareBlock className="mt-6" language={language} />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* SEO List Section */}
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-[20px] lg:text-[26px] text-[#071016] dark:text-[#e0e0e0] font-semibold hover:text-[#111827] transition-all duration-200">
            {t("seolist_title", language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed mb-8">
              <p className="mb-6" dangerouslySetInnerHTML={{ __html: t('seolist_intro1', language) }} />
              <p className="mb-6" dangerouslySetInnerHTML={{ __html: t('seolist_intro2', language) }} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Column 1 - Basic Password Security */}
              <div className="bg-gray-50 dark:bg-[#23272f] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0] mb-4">
                  {t('seolist_basic_password_security_title', language)}
                </h3>
                <div className="space-y-4">
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_basic_password_security_1', language) }} />
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_basic_password_security_2', language) }} />
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_basic_password_security_3', language) }} />
                </div>
              </div>
              {/* Column 2 - Advanced Security */}
              <div className="bg-blue-50 dark:bg-[#2A4E63] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0] mb-4">
                  {t('seolist_advanced_security_title', language)}
                </h3>
                <div className="space-y-4">
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_1', language) }} />
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_2', language) }} />
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_3', language) }} />
                </div>
              </div>
              {/* Column 3 - Best Practices */}
              <div className="bg-green-50 dark:bg-[#166534] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0] mb-4">
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
              <div className="bg-blue-50 dark:bg-[#2A4E63] p-6 rounded-lg h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0] mb-4">
                  {t('seolist_additional_security_tips_title', language)}
                </h3>
                <div className="space-y-4 flex-grow">
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_additional_security_tips_1', language) }} />
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_additional_security_tips_2', language) }} />
                </div>
              </div>
              {/* Advanced Security Measures */}
              <div className="bg-green-50 dark:bg-[#166534] p-6 rounded-lg h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0] mb-4">
                  {t('seolist_advanced_security_measures_title', language)}
                </h3>
                <div className="space-y-4 flex-grow">
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_measures_1', language) }} />
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_measures_2', language) }} />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* How To Use Section */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-[20px] lg:text-[26px] text-[#071016] dark:text-[#e0e0e0] font-semibold hover:text-[#111827] transition-all duration-200">
            {t('howtouse_title', language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mt-4">
              {/* Left Column - Basic Steps */}
              <div className="space-y-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0]">
                  {t('howtouse_simple_steps', language)}
                </h3>
                <div className='text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed flex-grow'>
                  <p className='font-bold py-4' dangerouslySetInnerHTML={{ __html: t('howtouse_intro', language) }} />
                  <ol className='space-y-3 pl-4'>
                    <li dangerouslySetInnerHTML={{ __html: t('howtouse_step1', language) }} />
                    <li dangerouslySetInnerHTML={{ __html: t('howtouse_step2', language) }} />
                    <li dangerouslySetInnerHTML={{ __html: t('howtouse_step3', language) }} />
                  </ol>
                </div>
                <div className="bg-green-50 dark:bg-[#166534] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#111827] dark:text-[#e0e0e0] mb-2">
                    {t('howtouse_what_you_get', language)}
                  </h4>
                  <ul className="text-[16px] text-[#071016] dark:text-[#e0e0e0] space-y-1">
                    <li>• {t('howtouse_benefit1', language)}</li>
                    <li>• {t('howtouse_benefit2', language)}</li>
                    <li>• {t('howtouse_benefit3', language)}</li>
                    <li>• {t('howtouse_benefit4', language)}</li>
                    <li>• {t('howtouse_benefit5', language)}</li>
                  </ul>
                </div>
              </div>
              {/* Right Column - Security Tips */}
              <div className="space-y-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0]">
                  {t('howtouse_security_tips', language)}
                </h3>
                <div className='text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed flex-grow'>
                  <p className='font-bold py-4' dangerouslySetInnerHTML={{ __html: t('howtouse_security_tips_title', language) }} />
                  <ul className='space-y-3 pl-4'>
                    <li dangerouslySetInnerHTML={{ __html: t('howtouse_tip1', language) }} />
                    <li dangerouslySetInnerHTML={{ __html: t('howtouse_tip2', language) }} />
                    <li dangerouslySetInnerHTML={{ __html: t('howtouse_tip3', language) }} />
                    <li dangerouslySetInnerHTML={{ __html: t('howtouse_tip4', language) }} />
                  </ul>
                  <p className="mt-6" dangerouslySetInnerHTML={{ __html: t('howtouse_protect', language) }} />
                </div>
                <div className="bg-blue-50 dark:bg-[#2A4E63] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#111827] dark:text-[#e0e0e0] mb-2">
                    {t('howtouse_best_practices', language)}
                  </h4>
                  <ul className="text-[16px] text-[#071016] dark:text-[#e0e0e0] space-y-1">
                    <li>• <span dangerouslySetInnerHTML={{ __html: t('howtouse_best1', language) }} /></li>
                    <li>• <span dangerouslySetInnerHTML={{ __html: t('howtouse_best2', language) }} /></li>
                    <li>• <span dangerouslySetInnerHTML={{ __html: t('howtouse_best3', language) }} /></li>
                    <li>• <span dangerouslySetInnerHTML={{ __html: t('howtouse_best4', language) }} /></li>
                  </ul>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* About Us Section */}
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-[20px] lg:text-[26px] text-[#071016] dark:text-[#e0e0e0] font-semibold hover:text-[#111827] transition-all duration-200">
            {t('aboutus_title', language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mt-4">
              {/* Left Column - Who We Are */}
              <div className="space-y-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0]">
                  {t('aboutus_who_we_are', language)}
                </h3>
                <div className='text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed space-y-4 flex-grow'>
                  <p dangerouslySetInnerHTML={{ __html: t('aboutus_intro', language) }} />
                  <p dangerouslySetInnerHTML={{ __html: t('aboutus_team', language) }} />
                </div>
                <div className="bg-blue-50 dark:bg-[#2A4E63] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#111827] dark:text-[#e0e0e0] mb-2">
                    {t('aboutus_mission_title', language)}
                  </h4>
                  <p className="text-[16px] text-[#071016] dark:text-[#e0e0e0]">
                    {t('aboutus_mission', language)}
                  </p>
                </div>
              </div>
              {/* Right Column - What We Offer */}
              <div className="space-y-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0]">
                  {t('aboutus_offer_title', language)}
                </h3>
                <div className='text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed space-y-4 flex-grow'>
                  <ul className='space-y-3'>
                    <li dangerouslySetInnerHTML={{ __html: t('aboutus_offer_1', language) }} />
                    <li dangerouslySetInnerHTML={{ __html: t('aboutus_offer_2', language) }} />
                    <li dangerouslySetInnerHTML={{ __html: t('aboutus_offer_3', language) }} />
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-[#166534] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#111827] dark:text-[#e0e0e0] mb-2">
                    {t('aboutus_why_title', language)}
                  </h4>
                  <p className="text-[16px] text-[#071016] dark:text-[#e0e0e0]" dangerouslySetInnerHTML={{ __html: t('aboutus_why_1', language) }} />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Security Standards Compliance Section */}
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-[20px] lg:text-[26px] text-[#071016] dark:text-[#e0e0e0] font-semibold hover:text-[#111827] transition-all duration-200">
            {t('security_standards_title', language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-8">
              {/* Introduction */}
              <div className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: t('security_standards_intro', language) }} />
              </div>
              
              {/* NIST Compliance */}
              <div className="bg-blue-50 dark:bg-[#2A4E63] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0] mb-4">
                  {t('nist_compliance_title', language)}
                </h3>
                <div className="text-[16px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t('nist_compliance_desc', language) }} />
              </div>

              {/* PCI DSS Compliance */}
              <div className="bg-green-50 dark:bg-[#166534] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0] mb-4">
                  {t('pci_dss_compliance_title', language)}
                </h3>
                <div className="text-[16px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t('pci_dss_compliance_desc', language) }} />
              </div>

              {/* Security Features */}
              <div className="bg-gray-50 dark:bg-[#23272f] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#111827] dark:text-[#e0e0e0] mb-4">
                  {t('security_features_title', language)}
                </h3>
                <div className="text-[16px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t('security_features_list', language) }} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SeoAccordion; 
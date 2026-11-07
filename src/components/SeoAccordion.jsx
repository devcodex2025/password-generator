import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Image from 'next/image';
import lang from "./lang.json";
import SEOKeywords from './SEOKeywords';
import ShareBlock from './ShareBlock';

function t(key, language) {
  return lang[key] && lang[key][language] ? lang[key][language] : key;
}

function getTrustFaq(language) {
  return [
    {
      question: t('faq_length_question', language),
      answer: t('faq_length_answer', language),
    },
    {
      question: t('faq_passphrase_question', language),
      answer: t('faq_passphrase_answer', language),
    },
    {
      question: t('faq_wifi_question', language),
      answer: t('faq_wifi_answer', language),
    },
    {
      question: t('faq_ideas_question', language),
      answer: t('faq_ideas_answer', language),
    },
    {
      question: t('faq_create_question', language),
      answer: t('faq_create_answer', language),
    },
    {
      question: t('faq_manager_question', language),
      answer: t('faq_manager_answer', language),
    },
    {
      question: t('faq_storage_question', language),
      answer: t('faq_storage_answer', language),
    },
    {
      question: t('faq_sources_question', language),
      answer: t('faq_sources_answer', language),
    },
    {
      question: t('faq_trustworthy_question', language),
      answer: t('faq_trustworthy_answer', language),
    },
    // Kept visible so the FAQPage JSON-LD only ever lists questions the
    // user can actually see on the page (Google content-parity rule).
    {
      question: t('faq_review_question', language),
      answer: t('faq_review_answer', language),
    },
  ];
}

const SeoAccordion = ({ language }) => {
  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4 lg:px-8">
      <Accordion type="multiple" className="flex flex-col gap-3 rounded-2xl border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#1c1c1c] shadow p-4 lg:p-6">
        {/* SEO Welcome Section */}
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-[20px] lg:text-[26px] text-[#071016] dark:text-[#e0e0e0] font-semibold">
            {t("seotext_title", language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-4">
              {/* Left Column - Introduction */}
              <div className="space-y-4">
                <Image 
                  src="/images/welcome-img.svg" 
                  alt={t("seotext_img_alt", language) || "Welcome to Password Generator"} 
                  className="w-full h-auto rounded-lg shadow-lg"
                  width={600}
                  height={400}
                  loading="lazy"
                  />
                <div className="space-y-4">
                  <p className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_intro1", language) }} />
                  <p className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_intro2", language) }} />
                  <SEOKeywords language={language} />
                </div>
              </div>
              {/* Right Column - Why Choose Us */}
              <div className="space-y-4 flex-1">
                <h3 className="text-[20px] lg:text-[28px] text-[#071016] dark:text-[#e0e0e0] font-semibold">
                  {t("seotext_why_title", language)}
                </h3>
                <p className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_why1", language) }} />
                <p className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seotext_why2", language) }} />
                <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#071016] dark:text-[#e0e0e0] mb-2">
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
          <AccordionTrigger className="text-[20px] lg:text-[26px] text-[#071016] dark:text-[#e0e0e0] font-semibold">
            {t("seolist_title", language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed mb-8">
              <p className="mb-6" dangerouslySetInnerHTML={{ __html: t('seolist_intro1', language) }} />
              <p className="mb-6" dangerouslySetInnerHTML={{ __html: t('seolist_intro2', language) }} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Column 1 - Basic Password Security */}
              <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0] mb-4">
                  {t('seolist_basic_password_security_title', language)}
                </h3>
                <div className="space-y-4">
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_basic_password_security_1', language) }} />
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_basic_password_security_2', language) }} />
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_basic_password_security_3', language) }} />
                </div>
              </div>
              {/* Column 2 - Advanced Security */}
              <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0] mb-4">
                  {t('seolist_advanced_security_title', language)}
                </h3>
                <div className="space-y-4">
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_1', language) }} />
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_2', language) }} />
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_advanced_security_3', language) }} />
                </div>
              </div>
              {/* Column 3 - Best Practices */}
              <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0] mb-4">
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
              <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-6 rounded-lg h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0] mb-4">
                  {t('seolist_additional_security_tips_title', language)}
                </h3>
                <div className="space-y-4 flex-grow">
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_additional_security_tips_1', language) }} />
                  <div dangerouslySetInnerHTML={{ __html: t('seolist_additional_security_tips_2', language) }} />
                </div>
              </div>
              {/* Advanced Security Measures */}
              <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-6 rounded-lg h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0] mb-4">
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
          <AccordionTrigger className="text-[20px] lg:text-[26px] text-[#071016] dark:text-[#e0e0e0] font-semibold">
            {t('howtouse_title', language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mt-4">
              {/* Left Column - Basic Steps */}
              <div className="space-y-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
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
                <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#071016] dark:text-[#e0e0e0] mb-2">
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
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
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
                <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#071016] dark:text-[#e0e0e0] mb-2">
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
          <AccordionTrigger className="text-[20px] lg:text-[26px] text-[#071016] dark:text-[#e0e0e0] font-semibold">
            {t('aboutus_title', language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mt-4">
              {/* Left Column - Who We Are */}
              <div className="space-y-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
                  {t('aboutus_who_we_are', language)}
                </h3>
                <div className='text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed space-y-4 flex-grow'>
                  <p dangerouslySetInnerHTML={{ __html: t('aboutus_intro', language) }} />
                  <p dangerouslySetInnerHTML={{ __html: t('aboutus_team', language) }} />
                </div>
                <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#071016] dark:text-[#e0e0e0] mb-2">
                    {t('aboutus_mission_title', language)}
                  </h4>
                  <p className="text-[16px] text-[#071016] dark:text-[#e0e0e0]">
                    {t('aboutus_mission', language)}
                  </p>
                </div>
              </div>
              {/* Right Column - What We Offer */}
              <div className="space-y-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0]">
                  {t('aboutus_offer_title', language)}
                </h3>
                <div className='text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed space-y-4 flex-grow'>
                  <ul className='space-y-3'>
                    <li dangerouslySetInnerHTML={{ __html: t('aboutus_offer_1', language) }} />
                    <li dangerouslySetInnerHTML={{ __html: t('aboutus_offer_2', language) }} />
                    <li dangerouslySetInnerHTML={{ __html: t('aboutus_offer_3', language) }} />
                  </ul>
                </div>
                <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#071016] dark:text-[#e0e0e0] mb-2">
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
          <AccordionTrigger className="text-[20px] lg:text-[26px] text-[#071016] dark:text-[#e0e0e0] font-semibold">
            {t('security_standards_title', language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-8">
              {/* Introduction */}
              <div className="text-[18px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: t('security_standards_intro', language) }} />
              </div>
              
              {/* NIST Compliance */}
              <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0] mb-4">
                  {t('nist_compliance_title', language)}
                </h3>
                <div className="text-[16px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t('nist_compliance_desc', language) }} />
              </div>

              {/* PCI DSS Compliance */}
              <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0] mb-4">
                  {t('pci_dss_compliance_title', language)}
                </h3>
                <div className="text-[16px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t('pci_dss_compliance_desc', language) }} />
              </div>

              {/* Security Features */}
              <div className="border border-[#E5F6FF] bg-[#F7FCFF] dark:border-[#374151] dark:bg-[#23272f] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#071016] dark:text-[#e0e0e0] mb-4">
                  {t('security_features_title', language)}
                </h3>
                <div className="text-[16px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed" dangerouslySetInnerHTML={{ __html: t('security_features_list', language) }} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* FAQ Trust Section */}
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-[20px] lg:text-[26px] text-[#071016] dark:text-[#e0e0e0] font-semibold">
            {t('faq_accordion_title', language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-6">
              <div className="space-y-4">
                {getTrustFaq(language).map((item) => (
                  <div key={item.question} className="rounded-xl border border-[#D1E9FF] dark:border-[#374151] bg-[#F8FDFF] dark:bg-[#23272f] p-4">
                    <h3 className="text-lg font-semibold text-[#071016] dark:text-[#f8fafc]">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-[#374151] dark:text-[#dbeafe]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
              <aside className="rounded-xl border border-[#D1E9FF] dark:border-[#374151] bg-white dark:bg-[#111827] p-4">
                <h3 className="text-lg font-semibold text-[#071016] dark:text-[#f8fafc]">
                  E-E-A-T notes
                </h3>
                <dl className="mt-3 space-y-3 text-sm leading-relaxed text-[#374151] dark:text-[#dbeafe]">
                  <div>
                    <dt className="font-semibold text-[#071016] dark:text-white">Reviewed</dt>
                    <dd>April 2026</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#071016] dark:text-white">Method</dt>
                    <dd>Client-side password generation guidance, standards review, and privacy checks.</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#071016] dark:text-white">Sources</dt>
                    <dd className="mt-1 flex flex-wrap gap-2">
                      <a className="rounded-md text-[#2A4E63] dark:text-[#38beff] underline underline-offset-4 hover:text-[#1f3b4c] dark:hover:text-[#d7f2ff]" href="https://pages.nist.gov/800-63-4/sp800-63b.html" target="_blank" rel="noopener noreferrer">
                        NIST SP 800-63B
                      </a>
                      <a className="rounded-md text-[#2A4E63] dark:text-[#38beff] underline underline-offset-4 hover:text-[#1f3b4c] dark:hover:text-[#d7f2ff]" href="https://www.pcisecuritystandards.org/document_library/" target="_blank" rel="noopener noreferrer">
                        PCI DSS
                      </a>
                      <a className="rounded-md text-[#2A4E63] dark:text-[#38beff] underline underline-offset-4 hover:text-[#1f3b4c] dark:hover:text-[#d7f2ff]" href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener noreferrer">
                        HIBP k-anonymity
                      </a>
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SeoAccordion; 

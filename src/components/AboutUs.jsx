import React from 'react';
import lang from './lang.json';

function t(key, language) {
  return lang[key] && lang[key][language] ? lang[key][language] : key;
}

const AboutUs = ({ language }) => {
    return (
        <div className='mt-6 bottom-16 mx-auto h-auto max-w-6xl px-4'>
            <div className='items-center justify-between max-w-6xl'>
                <h2 className='lg:text-[40px] text-[24px] text-[#071016] font-semibold mb-8'>{t('aboutus_title', language)}</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                    {/* Left Column - Who We Are */}
                    <div className="space-y-6 h-full flex flex-col">
                        <h3 className="text-xl font-semibold text-[#2A4E63]">
                            {t('aboutus_who_we_are', language)}
                        </h3>
                        
                        <div className='text-[18px] text-[#071016] leading-relaxed space-y-4 flex-grow'>
                            <p dangerouslySetInnerHTML={{ __html: t('aboutus_intro', language) }} />
                            
                            <p dangerouslySetInnerHTML={{ __html: t('aboutus_team', language) }} />
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-[#2A4E63] mb-2">
                                {t('aboutus_mission_title', language)}
                            </h4>
                            <p className="text-[16px] text-[#071016]">
                                {t('aboutus_mission', language)}
                            </p>
                        </div>
                    </div>

                    {/* Right Column - What We Offer */}
                    <div className="space-y-6 h-full flex flex-col">
                        <h3 className="text-xl font-semibold text-[#2A4E63]">
                            {t('aboutus_offer_title', language)}
                        </h3>
                        
                        <div className='text-[18px] text-[#071016] leading-relaxed space-y-4 flex-grow'>
                            <ul className='space-y-3'>
                                <li dangerouslySetInnerHTML={{ __html: t('aboutus_offer_1', language) }} />
                                <li dangerouslySetInnerHTML={{ __html: t('aboutus_offer_2', language) }} />
                                <li dangerouslySetInnerHTML={{ __html: t('aboutus_offer_3', language) }} />
                            </ul>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-[#2A4E63] mb-2">
                                {t('aboutus_why_title', language)}
                            </h4>
                            <p className="text-[16px] text-[#071016] mb-3" dangerouslySetInnerHTML={{ __html: t('aboutus_why_1', language) }} />
                            <p className="text-[16px] text-[#071016]" dangerouslySetInnerHTML={{ __html: t('aboutus_why_2', language) }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;

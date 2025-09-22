import React from 'react';
import lang from './lang.json';

function t(key, language) {
  return lang[key] && lang[key][language] ? lang[key][language] : key;
}

function HowToUse(props) {
    const language = props.language;
    return (
        <div className='mt-6 bottom-16 mx-auto h-auto max-w-6xl px-4'>
            <div className='items-center justify-between max-w-6xl'>
                <h2 className='lg:text-[40px] text-[24px] text-[#071016] font-semibold mb-8'>{t('howtouse_title', language)}</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                    {/* Left Column - Basic Steps */}
                    <div className="space-y-6 h-full flex flex-col">
                        <h3 className="text-xl font-semibold text-[#2A4E63]">
                            {t('howtouse_simple_steps', language)}
                        </h3>
                        
                        <div className='text-[18px] text-[#071016] leading-relaxed flex-grow'>
                            <p className='font-bold py-4' dangerouslySetInnerHTML={{ __html: t('howtouse_intro', language) }} />
                            <ol className='space-y-3 pl-4'>
                                <li dangerouslySetInnerHTML={{ __html: t('howtouse_step1', language) }} />
                                <li dangerouslySetInnerHTML={{ __html: t('howtouse_step2', language) }} />
                                <li dangerouslySetInnerHTML={{ __html: t('howtouse_step3', language) }} />
                            </ol>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-[#2A4E63] mb-2">
                                {t('howtouse_what_you_get', language)}
                            </h4>
                            <ul className="text-[16px] text-[#071016] space-y-1">
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
                        <h3 className="text-xl font-semibold text-[#2A4E63]">
                            {t('howtouse_security_tips', language)}
                        </h3>
                        
                        <div className='text-[18px] text-[#071016] leading-relaxed flex-grow'>
                            <p className='font-bold py-4' dangerouslySetInnerHTML={{ __html: t('howtouse_security_tips_title', language) }} />
                            <ul className='space-y-3 pl-4'>
                                <li dangerouslySetInnerHTML={{ __html: t('howtouse_tip1', language) }} />
                                <li dangerouslySetInnerHTML={{ __html: t('howtouse_tip2', language) }} />
                                <li dangerouslySetInnerHTML={{ __html: t('howtouse_tip3', language) }} />
                                <li dangerouslySetInnerHTML={{ __html: t('howtouse_tip4', language) }} />
                            </ul>
                            
                            <p className="mt-6" dangerouslySetInnerHTML={{ __html: t('howtouse_protect', language) }} />
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-[#2A4E63] mb-2">
                                {t('howtouse_best_practices', language)}
                            </h4>
                            <ul className="text-[16px] text-[#071016] space-y-1">
                                <li>• <span dangerouslySetInnerHTML={{ __html: t('howtouse_best1', language) }} /></li>
                                <li>• <span dangerouslySetInnerHTML={{ __html: t('howtouse_best2', language) }} /></li>
                                <li>• <span dangerouslySetInnerHTML={{ __html: t('howtouse_best3', language) }} /></li>
                                <li>• <span dangerouslySetInnerHTML={{ __html: t('howtouse_best4', language) }} /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowToUse;

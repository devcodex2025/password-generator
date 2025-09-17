import React from 'react';
import semanticCore from '../../docs/semantic-core.json';

type SemanticCore = {
  keywords: {
    [lang: string]: {
      high: string[];
      medium: string[];
      low: string[];
    };
  };
};

const core = semanticCore as unknown as SemanticCore;

interface SEOKeywordsProps {
  language: string;
  className?: string;
}

const SEOKeywords: React.FC<SEOKeywordsProps> = ({ language, className }) => {
  const byLang = core.keywords[language] || core.keywords['en'];

  if (!byLang) return null;

  const high = byLang.high.slice(0, 3).join(', ');
  const medium = byLang.medium.slice(0, 2).join(', ');
  const low = byLang.low.slice(0, 1).join(', ');

  const textByLang: { [k: string]: (p: { high: string; medium: string; low: string }) => string } = {
    en: ({ high, medium, low }) => `Popular queries like ${high} help users find our tools, while topics such as ${medium} and details like ${low} ensure the content remains informative and natural.`,
    ua: ({ high, medium, low }) => `Популярні запити як ${high} допомагають знайти наш сервіс, а теми на кшталт ${medium} та деталі, наприклад ${low}, роблять контент інформативним і природним.`,
    es: ({ high, medium, low }) => `Consultas populares como ${high} ayudan a encontrar nuestras herramientas, mientras que temas como ${medium} y detalles como ${low} mantienen el contenido informativo y natural.`,
    fr: ({ high, medium, low }) => `Des requêtes populaires comme ${high} aident a trouver nos outils, tandis que des sujets comme ${medium} et des détails comme ${low} rendent le contenu informatif et naturel.`,
    de: ({ high, medium, low }) => `Beliebte Suchanfragen wie ${high} helfen, unsere Tools zu finden, während Themen wie ${medium} und Details wie ${low} den Inhalt informativ und natürlich halten.`,
    it: ({ high, medium, low }) => `Ricerche popolari come ${high} aiutano a trovare i nostri strumenti, mentre argomenti come ${medium} e dettagli come ${low} mantengono il contenuto informativo e naturale.`,
    pt: ({ high, medium, low }) => `Consultas populares como ${high} ajudam a encontrar nossas ferramentas, enquanto temas como ${medium} e detalhes como ${low} mantêm o conteúdo informativo e natural.`,
    ru: ({ high, medium, low }) => `Популярные запросы, такие как ${high}, помогают найти наши инструменты, а темы вроде ${medium} и детали, например ${low}, делают контент информативным и естественным.`,
    zh: ({ high, medium, low }) => `诸如 ${high} 等热门搜索有助于找到我们的工具，而 ${medium} 等主题及 ${low} 等细节让内容更自然且信息充分。`,
    ja: ({ high, medium, low }) => `「${high}」のような人気の検索はツールの発見につながり、${medium} といった話題や ${low} のような詳細が自然で有益な内容に貢献します。`,
    pl: ({ high, medium, low }) => `Popularne zapytania jak ${high} pomagają znaleźć nasze narzędzia, a tematy takie jak ${medium} oraz szczegóły jak ${low} sprawiają, że treść jest naturalna i wartościowa.`,
  };

  const textBuilder = textByLang[language] || textByLang['en'];
  const paragraph = textBuilder({ high, medium, low });

  return (
    <div className={className || ''}>
      <p className="text-[16px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed">
        {paragraph}
      </p>
    </div>
  );
};

export default SEOKeywords;



type SupportedLang = 'en' | 'ua' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'pl' | 'vi';

interface UnitTranslations {
  century: [singular: string, plural: string];
  year: [singular: string, plural: string];
  month: [singular: string, plural: string];
  day: [singular: string, plural: string];
  hour: [singular: string, plural: string];
  minute: [singular: string, plural: string];
  second: [singular: string, plural: string];
  instant: string;
  lessThanASecond: string;
}

const TRANSLATIONS: Record<SupportedLang, UnitTranslations> = {
  en: {
    century: ['century', 'centuries'],
    year: ['year', 'years'],
    month: ['month', 'months'],
    day: ['day', 'days'],
    hour: ['hour', 'hours'],
    minute: ['minute', 'minutes'],
    second: ['second', 'seconds'],
    instant: 'instant',
    lessThanASecond: 'less than a second',
  },
  ua: {
    century: ['століття', 'століть'],
    year: ['рік', 'років'],
    month: ['місяць', 'місяців'],
    day: ['день', 'днів'],
    hour: ['година', 'годин'],
    minute: ['хвилина', 'хвилин'],
    second: ['секунда', 'секунд'],
    instant: 'миттєво',
    lessThanASecond: 'менше ніж секунда',
  },
  es: {
    century: ['siglo', 'siglos'],
    year: ['año', 'años'],
    month: ['mes', 'meses'],
    day: ['día', 'días'],
    hour: ['hora', 'horas'],
    minute: ['minuto', 'minutos'],
    second: ['segundo', 'segundos'],
    instant: 'instantáneo',
    lessThanASecond: 'menos de un segundo',
  },
  fr: {
    century: ['siècle', 'siècles'],
    year: ['an', 'ans'],
    month: ['mois', 'mois'],
    day: ['jour', 'jours'],
    hour: ['heure', 'heures'],
    minute: ['minute', 'minutes'],
    second: ['seconde', 'secondes'],
    instant: 'instantané',
    lessThanASecond: 'moins d’une seconde',
  },
  de: {
    century: ['Jahrhundert', 'Jahrhunderte'],
    year: ['Jahr', 'Jahre'],
    month: ['Monat', 'Monate'],
    day: ['Tag', 'Tage'],
    hour: ['Stunde', 'Stunden'],
    minute: ['Minute', 'Minuten'],
    second: ['Sekunde', 'Sekunden'],
    instant: 'sofort',
    lessThanASecond: 'weniger als eine Sekunde',
  },
  it: {
    century: ['secolo', 'secoli'],
    year: ['anno', 'anni'],
    month: ['mese', 'mesi'],
    day: ['giorno', 'giorni'],
    hour: ['ora', 'ore'],
    minute: ['minuto', 'minuti'],
    second: ['secondo', 'secondi'],
    instant: 'istantaneo',
    lessThanASecond: 'meno di un secondo',
  },
  pt: {
    century: ['século', 'séculos'],
    year: ['ano', 'anos'],
    month: ['mês', 'meses'],
    day: ['dia', 'dias'],
    hour: ['hora', 'horas'],
    minute: ['minuto', 'minutos'],
    second: ['segundo', 'segundos'],
    instant: 'instantâneo',
    lessThanASecond: 'menos de um segundo',
  },
  ru: {
    century: ['век', 'веков'],
    year: ['год', 'лет'],
    month: ['месяц', 'месяцев'],
    day: ['день', 'дней'],
    hour: ['час', 'часов'],
    minute: ['минута', 'минут'],
    second: ['секунда', 'секунд'],
    instant: 'мгновенно',
    lessThanASecond: 'меньше секунды',
  },
  zh: {
    century: ['世纪', '世纪'],
    year: ['年', '年'],
    month: ['个月', '个月'],
    day: ['天', '天'],
    hour: ['小时', '小时'],
    minute: ['分钟', '分钟'],
    second: ['秒', '秒'],
    instant: '瞬间',
    lessThanASecond: '少于一秒',
  },
  ja: {
    century: ['世紀', '世紀'],
    year: ['年', '年'],
    month: ['ヶ月', 'ヶ月'],
    day: ['日', '日'],
    hour: ['時間', '時間'],
    minute: ['分', '分'],
    second: ['秒', '秒'],
    instant: '瞬時',
    lessThanASecond: '1秒未満',
  },
  pl: {
    century: ['wiek', 'wieków'],
    year: ['rok', 'lat'],
    month: ['miesiąc', 'miesięcy'],
    day: ['dzień', 'dni'],
    hour: ['godzina', 'godzin'],
    minute: ['minuta', 'minut'],
    second: ['sekunda', 'sekund'],
    instant: 'natychmiast',
    lessThanASecond: 'mniej niż sekunda',
  },
  vi: {
    century: ['thế kỷ', 'thế kỷ'],
    year: ['năm', 'năm'],
    month: ['tháng', 'tháng'],
    day: ['ngày', 'ngày'],
    hour: ['giờ', 'giờ'],
    minute: ['phút', 'phút'],
    second: ['giây', 'giây'],
    instant: 'tức thì',
    lessThanASecond: 'ít hơn một giây',
  },
};

function pickPlural(wordForms: [string, string], count: number, lang: SupportedLang): string {
  if (lang === 'en' || lang === 'es' || lang === 'fr' || lang === 'de' || lang === 'it' || lang === 'pt') {
    return count === 1 ? wordForms[0] : wordForms[1];
  }
  if (lang === 'zh' || lang === 'ja' || lang === 'vi') {
    return wordForms[0];
  }
  // Fallback for languages with complex pluralization: default to plural form
  return count === 1 ? wordForms[0] : wordForms[1];
}

export function formatCrackTime(enDisplay: string, langCode: string): string {
  const lang = (langCode.split('-')[0] as SupportedLang) || 'en';
  const tr = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const normalized = enDisplay.trim().toLowerCase();

  if (normalized === 'instant') {
    return tr.instant;
  }
  if (normalized === 'less than a second') {
    return tr.lessThanASecond;
  }

  // Handle bare plural without a leading number (e.g., "centuries") for better natural phrasing
  if (normalized === 'centuries') {
    switch (lang) {
      case 'ua':
        return 'кілька ' + TRANSLATIONS.ua.century[1]; // кілька століть
      case 'es':
        return 'varios ' + TRANSLATIONS.es.century[1];
      case 'fr':
        return 'plusieurs ' + TRANSLATIONS.fr.century[1];
      case 'de':
        return TRANSLATIONS.de.century[1];
      case 'it':
        return 'parecchi ' + TRANSLATIONS.it.century[1];
      case 'pt':
        return 'vários ' + TRANSLATIONS.pt.century[1];
      case 'ru':
        return 'несколько ' + TRANSLATIONS.ru.century[1];
      case 'zh':
        return TRANSLATIONS.zh.century[1];
      case 'ja':
        return TRANSLATIONS.ja.century[1];
      case 'pl':
        return 'kilka ' + TRANSLATIONS.pl.century[1];
      case 'vi':
        return 'nhiều ' + TRANSLATIONS.vi.century[1];
      default:
        return TRANSLATIONS.en.century[1];
    }
  }

  const match = normalized.match(/^(\d+[\d,\.]*)\s+(century|year|month|day|hour|minute|second)s?$/);
  if (match) {
    const numRaw = match[1];
    const unit = match[2] as keyof Omit<UnitTranslations, 'instant' | 'lessThanASecond'>;
    const num = Number(numRaw.replace(/[,]/g, ''));
    const unitForms = tr[unit];
    const localizedUnit = pickPlural(unitForms, num, lang);
    return `${numRaw} ${localizedUnit}`;
  }

  // Fallback: quick replacements of units inside arbitrary strings
  return enDisplay
    .replace(/centuries?/gi, tr.century[1])
    .replace(/years?/gi, tr.year[1])
    .replace(/months?/gi, tr.month[1])
    .replace(/days?/gi, tr.day[1])
    .replace(/hours?/gi, tr.hour[1])
    .replace(/minutes?/gi, tr.minute[1])
    .replace(/seconds?/gi, tr.second[1]);
}



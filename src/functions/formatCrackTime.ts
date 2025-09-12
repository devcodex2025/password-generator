type SupportedLang = 'en' | 'ua' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'pl';

interface UnitTranslations {
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
    year: ['rok', 'lat'],
    month: ['miesiąc', 'miesięcy'],
    day: ['dzień', 'dni'],
    hour: ['godzina', 'godzin'],
    minute: ['minuta', 'minut'],
    second: ['sekunda', 'sekund'],
    instant: 'natychmiast',
    lessThanASecond: 'mniej niż sekunda',
  },
};

function pickPlural(wordForms: [string, string], count: number, lang: SupportedLang): string {
  if (lang === 'en' || lang === 'es' || lang === 'fr' || lang === 'de' || lang === 'it' || lang === 'pt') {
    return count === 1 ? wordForms[0] : wordForms[1];
  }
  if (lang === 'zh' || lang === 'ja') {
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

  const match = normalized.match(/^(\d+[\d,\.]*)\s+(year|month|day|hour|minute|second)s?$/);
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
    .replace(/years?/gi, tr.year[1])
    .replace(/months?/gi, tr.month[1])
    .replace(/days?/gi, tr.day[1])
    .replace(/hours?/gi, tr.hour[1])
    .replace(/minutes?/gi, tr.minute[1])
    .replace(/seconds?/gi, tr.second[1]);
}



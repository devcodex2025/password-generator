const GUIDE_LOCALE_MAP: Record<string, string> = {
  ua: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-PT',
  ru: 'ru-RU',
  zh: 'zh-CN',
  ja: 'ja-JP',
  pl: 'pl-PL',
};

type GuideUiCopy = {
  minRead: (minutes: number) => string;
  updatedLabel: string;
  authorLabel: string;
  loadingLabel: string;
  guidesIntro: string;
  guidesHelper: string;
  contentsLabel: string;
  articleSummaryLabel: string;
  nextStepsLabel: string;
  backToGuidesLabel: string;
  contactLabel: string;
  imageAlt: (title: string) => string;
};

const GUIDE_UI_COPY: Record<string, GuideUiCopy> = {
  en: {
    minRead: (minutes) => `${minutes} min read`,
    updatedLabel: 'Updated',
    authorLabel: 'Author',
    loadingLabel: 'Loading...',
    guidesIntro: 'Explore practical, regularly updated guides about password security, password policy, breach response, and stronger account protection.',
    guidesHelper: 'Start with the topic that matches your current problem, then continue through related guides to build a stronger security routine.',
    contentsLabel: 'In this guide',
    articleSummaryLabel: 'Quick summary',
    nextStepsLabel: 'Next useful steps',
    backToGuidesLabel: 'Back to all guides',
    contactLabel: 'Contact the team',
    imageAlt: (title) => `${title} cover image`,
  },
  ua: {
    minRead: (minutes) => `${minutes} хв читання`,
    updatedLabel: 'Оновлено',
    authorLabel: 'Автор',
    loadingLabel: 'Завантаження...',
    guidesIntro: 'Ознайомтеся з практичними й регулярно оновлюваними гайдами про безпеку паролів, політики доступу та захист акаунтів.',
    guidesHelper: 'Почніть з теми, яка найкраще відповідає вашому поточному завданню, а потім перейдіть до пов’язаних гайдів.',
    contentsLabel: 'У цьому гайді',
    articleSummaryLabel: 'Коротко',
    nextStepsLabel: 'Наступні корисні кроки',
    backToGuidesLabel: 'До всіх гайдів',
    contactLabel: 'Зв’язатися з командою',
    imageAlt: (title) => `Обкладинка матеріалу: ${title}`,
  },
  es: {
    minRead: (minutes) => `${minutes} min de lectura`,
    updatedLabel: 'Actualizado',
    authorLabel: 'Autor',
    loadingLabel: 'Cargando...',
    guidesIntro: 'Explora guías prácticas y actualizadas sobre seguridad de contraseñas, políticas de acceso y protección de cuentas.',
    guidesHelper: 'Empieza por el tema que mejor encaje con tu problema actual y continúa con las guías relacionadas.',
    contentsLabel: 'En esta guía',
    articleSummaryLabel: 'Resumen rápido',
    nextStepsLabel: 'Siguientes pasos útiles',
    backToGuidesLabel: 'Volver a todas las guías',
    contactLabel: 'Contactar al equipo',
    imageAlt: (title) => `Imagen de portada: ${title}`,
  },
  fr: {
    minRead: (minutes) => `${minutes} min de lecture`,
    updatedLabel: 'Mis à jour',
    authorLabel: 'Auteur',
    loadingLabel: 'Chargement...',
    guidesIntro: 'Explorez des guides pratiques et mis à jour sur la sécurité des mots de passe, les politiques d’accès et la protection des comptes.',
    guidesHelper: 'Commencez par le sujet le plus proche de votre besoin actuel, puis poursuivez avec les guides liés.',
    contentsLabel: 'Dans ce guide',
    articleSummaryLabel: 'Résumé rapide',
    nextStepsLabel: 'Étapes utiles suivantes',
    backToGuidesLabel: 'Retour à tous les guides',
    contactLabel: 'Contacter l’équipe',
    imageAlt: (title) => `Image de couverture : ${title}`,
  },
  de: {
    minRead: (minutes) => `${minutes} Min. Lesezeit`,
    updatedLabel: 'Aktualisiert',
    authorLabel: 'Autor',
    loadingLabel: 'Wird geladen...',
    guidesIntro: 'Entdecken Sie praktische, aktuelle Leitfäden zu Passwortsicherheit, Zugriffsrichtlinien und Kontoschutz.',
    guidesHelper: 'Beginnen Sie mit dem Thema, das Ihr aktuelles Problem am besten trifft, und lesen Sie dann verwandte Leitfäden weiter.',
    contentsLabel: 'In diesem Leitfaden',
    articleSummaryLabel: 'Kurzfassung',
    nextStepsLabel: 'Nächste sinnvolle Schritte',
    backToGuidesLabel: 'Zurück zu allen Leitfäden',
    contactLabel: 'Team kontaktieren',
    imageAlt: (title) => `Titelbild: ${title}`,
  },
  it: {
    minRead: (minutes) => `${minutes} min di lettura`,
    updatedLabel: 'Aggiornato',
    authorLabel: 'Autore',
    loadingLabel: 'Caricamento...',
    guidesIntro: 'Esplora guide pratiche e aggiornate sulla sicurezza delle password, le policy di accesso e la protezione degli account.',
    guidesHelper: 'Inizia dal tema più vicino al tuo problema attuale e continua poi con le guide correlate.',
    contentsLabel: 'In questa guida',
    articleSummaryLabel: 'Sintesi rapida',
    nextStepsLabel: 'Prossimi passi utili',
    backToGuidesLabel: 'Torna a tutte le guide',
    contactLabel: 'Contatta il team',
    imageAlt: (title) => `Immagine di copertina: ${title}`,
  },
  pt: {
    minRead: (minutes) => `${minutes} min de leitura`,
    updatedLabel: 'Atualizado',
    authorLabel: 'Autor',
    loadingLabel: 'Carregando...',
    guidesIntro: 'Explore guias práticos e atualizados sobre segurança de senhas, políticas de acesso e proteção de contas.',
    guidesHelper: 'Comece pelo tema que melhor corresponde ao seu problema atual e siga para os guias relacionados.',
    contentsLabel: 'Neste guia',
    articleSummaryLabel: 'Resumo rápido',
    nextStepsLabel: 'Próximos passos úteis',
    backToGuidesLabel: 'Voltar para todos os guias',
    contactLabel: 'Falar com a equipe',
    imageAlt: (title) => `Imagem de capa: ${title}`,
  },
  ru: {
    minRead: (minutes) => `${minutes} мин чтения`,
    updatedLabel: 'Обновлено',
    authorLabel: 'Автор',
    loadingLabel: 'Загрузка...',
    guidesIntro: 'Изучайте практические и актуальные гайды по безопасности паролей, политикам доступа и защите аккаунтов.',
    guidesHelper: 'Начните с темы, которая лучше всего подходит под вашу текущую задачу, а затем переходите к связанным материалам.',
    contentsLabel: 'В этом гайде',
    articleSummaryLabel: 'Кратко',
    nextStepsLabel: 'Полезные следующие шаги',
    backToGuidesLabel: 'Ко всем гайдам',
    contactLabel: 'Связаться с командой',
    imageAlt: (title) => `Обложка материала: ${title}`,
  },
  zh: {
    minRead: (minutes) => `阅读 ${minutes} 分钟`,
    updatedLabel: '更新于',
    authorLabel: '作者',
    loadingLabel: '加载中...',
    guidesIntro: '浏览关于密码安全、访问策略和账户保护的实用更新指南。',
    guidesHelper: '先从最符合你当前问题的主题开始，再继续阅读相关指南。',
    contentsLabel: '本指南内容',
    articleSummaryLabel: '快速摘要',
    nextStepsLabel: '下一步建议',
    backToGuidesLabel: '返回全部指南',
    contactLabel: '联系团队',
    imageAlt: (title) => `${title} 封面图`,
  },
  ja: {
    minRead: (minutes) => `読了 ${minutes} 分`,
    updatedLabel: '更新日',
    authorLabel: '著者',
    loadingLabel: '読み込み中...',
    guidesIntro: 'パスワードセキュリティ、アクセス方針、アカウント保護に関する実践的で最新のガイドを確認できます。',
    guidesHelper: 'いまの課題に最も近いテーマから読み始め、関連ガイドへ進んでください。',
    contentsLabel: 'このガイドの内容',
    articleSummaryLabel: '要点',
    nextStepsLabel: '次に役立つステップ',
    backToGuidesLabel: 'すべてのガイドへ戻る',
    contactLabel: 'チームに連絡',
    imageAlt: (title) => `${title} のカバー画像`,
  },
  pl: {
    minRead: (minutes) => `${minutes} min czytania`,
    updatedLabel: 'Zaktualizowano',
    authorLabel: 'Autor',
    loadingLabel: 'Ładowanie...',
    guidesIntro: 'Przeglądaj praktyczne i aktualne poradniki o bezpieczeństwie haseł, politykach dostępu i ochronie kont.',
    guidesHelper: 'Zacznij od tematu najlepiej pasującego do Twojego obecnego problemu, a potem przejdź do powiązanych poradników.',
    contentsLabel: 'W tym poradniku',
    articleSummaryLabel: 'Szybkie podsumowanie',
    nextStepsLabel: 'Przydatne kolejne kroki',
    backToGuidesLabel: 'Wróć do wszystkich poradników',
    contactLabel: 'Skontaktuj się z zespołem',
    imageAlt: (title) => `Obraz okładki: ${title}`,
  },
};

function normalizeLocale(locale: string): string {
  const key = (locale || 'en').trim().toLowerCase().split(/[-_]/)[0];
  return key in GUIDE_UI_COPY ? key : 'en';
}

export function getGuidesUiCopy(locale: string): GuideUiCopy {
  return GUIDE_UI_COPY[normalizeLocale(locale)];
}

export function formatGuideDate(locale: string, dateValue: string): string {
  const parsed = new Date(`${dateValue}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  const key = normalizeLocale(locale);
  const resolvedLocale = GUIDE_LOCALE_MAP[key] || GUIDE_LOCALE_MAP.en;

  return new Intl.DateTimeFormat(resolvedLocale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(parsed);
}

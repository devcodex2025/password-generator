export const STATIC_PAGE_LOCALES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'] as const;

export type StaticPageLocale = (typeof STATIC_PAGE_LOCALES)[number];

export type StaticPageCopy = {
  home: string;
  privacyPolicy: string;
  termsOfService: string;
  contact: string;
  privacyTitle: string;
  privacyIntro: string;
  privacyBullets: string[];
  termsTitle: string;
  termsIntro: string;
  termsBullets: string[];
  contactTitle: string;
  contactIntro: string;
  contactEmailLabel: string;
  contactResponseLabel: string;
};

const COPY: Record<StaticPageLocale, StaticPageCopy> = {
  en: {
    home: 'Home',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    contact: 'Contact',
    privacyTitle: 'Privacy Policy',
    privacyIntro: 'We respect your privacy and process only the minimum technical data needed to run the website, protect security, and improve product quality.',
    privacyBullets: [
      'We do not store generated passwords on our servers.',
      'Analytics and cookies are used only for site performance and product improvements.',
      'You can manage cookie preferences at any time in the cookie settings.',
    ],
    termsTitle: 'Terms of Service',
    termsIntro: 'By using this website, you agree to use it lawfully and responsibly. The service is provided as-is without guarantees for specific business or legal outcomes.',
    termsBullets: [
      'Do not use the website for abusive, illegal, or automated attack-related activity.',
      'You are responsible for storing generated passwords securely.',
      'We may update these terms to reflect security, legal, or product changes.',
    ],
    contactTitle: 'Contact',
    contactIntro: 'If you have questions about privacy, terms, security, or content, contact us using the details below.',
    contactEmailLabel: 'Email',
    contactResponseLabel: 'Typical response time: 1-3 business days',
  },
  ua: {
    home: 'Головна',
    privacyPolicy: 'Політика конфіденційності',
    termsOfService: 'Умови використання',
    contact: 'Контакти',
    privacyTitle: 'Політика конфіденційності',
    privacyIntro: 'Ми поважаємо вашу конфіденційність і обробляємо лише мінімум технічних даних, необхідних для роботи сайту, безпеки та покращення продукту.',
    privacyBullets: [
      'Ми не зберігаємо згенеровані паролі на серверах.',
      'Аналітика та cookie використовуються лише для роботи сайту і розвитку продукту.',
      'Налаштування cookie можна змінити у будь-який момент.',
    ],
    termsTitle: 'Умови використання',
    termsIntro: 'Використовуючи сайт, ви погоджуєтесь використовувати його законно та відповідально. Сервіс надається «як є» без гарантій для окремих бізнесових чи юридичних цілей.',
    termsBullets: [
      'Заборонено використовувати сайт для зловмисної, незаконної чи атакувальної автоматизованої активності.',
      'Ви самостійно відповідаєте за безпечне зберігання згенерованих паролів.',
      'Ми можемо оновлювати ці умови відповідно до змін у безпеці, праві або продукті.',
    ],
    contactTitle: 'Контакти',
    contactIntro: 'Якщо у вас є питання щодо конфіденційності, умов, безпеки або контенту, звʼяжіться з нами за контактами нижче.',
    contactEmailLabel: 'Email',
    contactResponseLabel: 'Звичайний час відповіді: 1-3 робочі дні',
  },
  es: {
    home: 'Inicio',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos del Servicio',
    contact: 'Contacto',
    privacyTitle: 'Política de Privacidad',
    privacyIntro: 'Respetamos tu privacidad y procesamos solo los datos técnicos mínimos necesarios para operar el sitio, proteger la seguridad y mejorar el producto.',
    privacyBullets: [
      'No almacenamos contraseñas generadas en nuestros servidores.',
      'La analítica y las cookies se usan solo para rendimiento del sitio y mejoras del producto.',
      'Puedes gestionar tus preferencias de cookies en cualquier momento.',
    ],
    termsTitle: 'Términos del Servicio',
    termsIntro: 'Al usar este sitio, aceptas utilizarlo de forma legal y responsable. El servicio se proporciona tal cual, sin garantías para resultados legales o comerciales específicos.',
    termsBullets: [
      'No utilices el sitio para actividades abusivas, ilegales o relacionadas con ataques automatizados.',
      'Eres responsable de guardar de forma segura las contraseñas generadas.',
      'Podemos actualizar estos términos para reflejar cambios legales, de seguridad o del producto.',
    ],
    contactTitle: 'Contacto',
    contactIntro: 'Si tienes preguntas sobre privacidad, términos, seguridad o contenido, contáctanos con los datos a continuación.',
    contactEmailLabel: 'Correo',
    contactResponseLabel: 'Tiempo de respuesta habitual: 1-3 días laborables',
  },
  fr: {
    home: 'Accueil',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions d’Utilisation',
    contact: 'Contact',
    privacyTitle: 'Politique de Confidentialité',
    privacyIntro: 'Nous respectons votre vie privée et traitons uniquement les données techniques minimales nécessaires au fonctionnement du site, à la sécurité et à l’amélioration du produit.',
    privacyBullets: [
      'Nous ne stockons pas les mots de passe générés sur nos serveurs.',
      'Les analyses et cookies servent uniquement aux performances du site et à l’amélioration du produit.',
      'Vous pouvez gérer vos préférences de cookies à tout moment.',
    ],
    termsTitle: 'Conditions d’Utilisation',
    termsIntro: 'En utilisant ce site, vous acceptez une utilisation légale et responsable. Le service est fourni en l’état, sans garantie de résultat juridique ou commercial spécifique.',
    termsBullets: [
      'N’utilisez pas le site pour des activités abusives, illégales ou liées à des attaques automatisées.',
      'Vous êtes responsable du stockage sécurisé des mots de passe générés.',
      'Nous pouvons mettre à jour ces conditions selon les évolutions légales, de sécurité ou du produit.',
    ],
    contactTitle: 'Contact',
    contactIntro: 'Pour toute question sur la confidentialité, les conditions, la sécurité ou le contenu, contactez-nous via les informations ci-dessous.',
    contactEmailLabel: 'Email',
    contactResponseLabel: 'Délai de réponse habituel : 1-3 jours ouvrés',
  },
  de: {
    home: 'Start',
    privacyPolicy: 'Datenschutzerklärung',
    termsOfService: 'Nutzungsbedingungen',
    contact: 'Kontakt',
    privacyTitle: 'Datenschutzerklärung',
    privacyIntro: 'Wir respektieren Ihre Privatsphäre und verarbeiten nur die minimalen technischen Daten, die für Betrieb, Sicherheit und Produktverbesserung erforderlich sind.',
    privacyBullets: [
      'Generierte Passwörter werden nicht auf unseren Servern gespeichert.',
      'Analyse und Cookies werden nur für Performance und Produktverbesserung genutzt.',
      'Cookie-Einstellungen können jederzeit angepasst werden.',
    ],
    termsTitle: 'Nutzungsbedingungen',
    termsIntro: 'Durch die Nutzung dieser Website stimmen Sie einer rechtmäßigen und verantwortungsvollen Nutzung zu. Der Dienst wird wie gesehen ohne Garantie für konkrete geschäftliche oder rechtliche Ergebnisse bereitgestellt.',
    termsBullets: [
      'Keine missbräuchliche, illegale oder angriffsbezogene automatisierte Nutzung.',
      'Sie sind für die sichere Speicherung generierter Passwörter verantwortlich.',
      'Wir können diese Bedingungen bei rechtlichen, sicherheitsbezogenen oder produktbezogenen Änderungen aktualisieren.',
    ],
    contactTitle: 'Kontakt',
    contactIntro: 'Bei Fragen zu Datenschutz, Bedingungen, Sicherheit oder Inhalten kontaktieren Sie uns über die folgenden Angaben.',
    contactEmailLabel: 'E-Mail',
    contactResponseLabel: 'Typische Antwortzeit: 1-3 Werktage',
  },
  it: {
    home: 'Home',
    privacyPolicy: 'Informativa sulla Privacy',
    termsOfService: 'Termini di Servizio',
    contact: 'Contatti',
    privacyTitle: 'Informativa sulla Privacy',
    privacyIntro: 'Rispettiamo la tua privacy e trattiamo solo i dati tecnici minimi necessari per il funzionamento del sito, la sicurezza e il miglioramento del prodotto.',
    privacyBullets: [
      'Non memorizziamo le password generate sui nostri server.',
      'Analytics e cookie sono usati solo per prestazioni del sito e miglioramenti del prodotto.',
      'Puoi gestire le preferenze cookie in qualsiasi momento.',
    ],
    termsTitle: 'Termini di Servizio',
    termsIntro: 'Usando questo sito accetti un utilizzo legale e responsabile. Il servizio è fornito così com’è, senza garanzie su risultati legali o commerciali specifici.',
    termsBullets: [
      'Non utilizzare il sito per attività abusive, illegali o legate ad attacchi automatizzati.',
      'Sei responsabile della conservazione sicura delle password generate.',
      'Possiamo aggiornare questi termini per modifiche legali, di sicurezza o di prodotto.',
    ],
    contactTitle: 'Contatti',
    contactIntro: 'Per domande su privacy, termini, sicurezza o contenuti, contattaci tramite i dettagli qui sotto.',
    contactEmailLabel: 'Email',
    contactResponseLabel: 'Tempo medio di risposta: 1-3 giorni lavorativi',
  },
  pt: {
    home: 'Início',
    privacyPolicy: 'Política de Privacidade',
    termsOfService: 'Termos de Serviço',
    contact: 'Contato',
    privacyTitle: 'Política de Privacidade',
    privacyIntro: 'Respeitamos sua privacidade e processamos apenas os dados técnicos mínimos necessários para operar o site, proteger a segurança e melhorar o produto.',
    privacyBullets: [
      'Não armazenamos senhas geradas em nossos servidores.',
      'Análises e cookies são usados apenas para desempenho do site e melhorias do produto.',
      'Você pode gerenciar preferências de cookies a qualquer momento.',
    ],
    termsTitle: 'Termos de Serviço',
    termsIntro: 'Ao usar este site, você concorda em utilizá-lo de forma legal e responsável. O serviço é fornecido no estado em que se encontra, sem garantias para resultados legais ou comerciais específicos.',
    termsBullets: [
      'Não use o site para atividades abusivas, ilegais ou relacionadas a ataques automatizados.',
      'Você é responsável por armazenar com segurança as senhas geradas.',
      'Podemos atualizar estes termos para refletir mudanças legais, de segurança ou de produto.',
    ],
    contactTitle: 'Contato',
    contactIntro: 'Se você tiver dúvidas sobre privacidade, termos, segurança ou conteúdo, entre em contato pelos dados abaixo.',
    contactEmailLabel: 'Email',
    contactResponseLabel: 'Tempo típico de resposta: 1-3 dias úteis',
  },
  ru: {
    home: 'Главная',
    privacyPolicy: 'Политика конфиденциальности',
    termsOfService: 'Условия использования',
    contact: 'Контакты',
    privacyTitle: 'Политика конфиденциальности',
    privacyIntro: 'Мы уважаем вашу конфиденциальность и обрабатываем только минимальные технические данные, необходимые для работы сайта, безопасности и улучшения продукта.',
    privacyBullets: [
      'Мы не храним сгенерированные пароли на серверах.',
      'Аналитика и cookie используются только для производительности сайта и улучшения продукта.',
      'Вы можете изменить настройки cookie в любое время.',
    ],
    termsTitle: 'Условия использования',
    termsIntro: 'Используя сайт, вы соглашаетесь использовать его законно и ответственно. Сервис предоставляется «как есть» без гарантий конкретных бизнес- или юридических результатов.',
    termsBullets: [
      'Запрещено использовать сайт для злоупотреблений, незаконной деятельности или атакующей автоматизации.',
      'Вы сами отвечаете за безопасное хранение сгенерированных паролей.',
      'Мы можем обновлять условия при изменениях в праве, безопасности или продукте.',
    ],
    contactTitle: 'Контакты',
    contactIntro: 'Если у вас есть вопросы по конфиденциальности, условиям, безопасности или контенту, свяжитесь с нами по контактам ниже.',
    contactEmailLabel: 'Email',
    contactResponseLabel: 'Обычное время ответа: 1-3 рабочих дня',
  },
  zh: {
    home: '首页',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',
    contact: '联系我们',
    privacyTitle: '隐私政策',
    privacyIntro: '我们尊重您的隐私，仅处理网站运行、安全防护和产品改进所需的最少技术数据。',
    privacyBullets: [
      '我们不会在服务器上存储生成的密码。',
      '分析与 Cookie 仅用于网站性能与产品改进。',
      '您可以随时管理 Cookie 偏好设置。',
    ],
    termsTitle: '服务条款',
    termsIntro: '使用本网站即表示您同意以合法、负责的方式使用服务。本服务按现状提供，不对特定法律或商业结果作出保证。',
    termsBullets: [
      '禁止将网站用于滥用、违法或自动化攻击相关活动。',
      '您需自行负责妥善保存生成的密码。',
      '我们可能因法律、安全或产品变更更新本条款。',
    ],
    contactTitle: '联系我们',
    contactIntro: '如您对隐私、条款、安全或内容有疑问，请通过以下方式联系。',
    contactEmailLabel: '邮箱',
    contactResponseLabel: '通常回复时间：1-3 个工作日',
  },
  ja: {
    home: 'ホーム',
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約',
    contact: 'お問い合わせ',
    privacyTitle: 'プライバシーポリシー',
    privacyIntro: '当サイトはプライバシーを尊重し、サイト運用・セキュリティ・品質向上に必要な最小限の技術データのみを処理します。',
    privacyBullets: [
      '生成したパスワードをサーバーに保存しません。',
      '分析と Cookie はサイト性能と改善目的でのみ使用します。',
      'Cookie 設定はいつでも変更できます。',
    ],
    termsTitle: '利用規約',
    termsIntro: '本サイトを利用することで、合法かつ責任ある利用に同意したものとみなされます。本サービスは現状有姿で提供され、特定の法的・商業的結果を保証しません。',
    termsBullets: [
      '不正・違法・自動化攻撃関連の目的でサイトを利用しないでください。',
      '生成したパスワードの安全な保管は利用者の責任です。',
      '法令・セキュリティ・製品変更に応じて本規約を更新する場合があります。',
    ],
    contactTitle: 'お問い合わせ',
    contactIntro: 'プライバシー、規約、セキュリティ、コンテンツに関するご質問は以下よりご連絡ください。',
    contactEmailLabel: 'メール',
    contactResponseLabel: '通常の返信時間：1-3 営業日',
  },
  pl: {
    home: 'Strona główna',
    privacyPolicy: 'Polityka Prywatności',
    termsOfService: 'Warunki Korzystania',
    contact: 'Kontakt',
    privacyTitle: 'Polityka Prywatności',
    privacyIntro: 'Szanujemy Twoją prywatność i przetwarzamy tylko minimalne dane techniczne potrzebne do działania serwisu, bezpieczeństwa i ulepszania produktu.',
    privacyBullets: [
      'Nie przechowujemy wygenerowanych haseł na serwerach.',
      'Analityka i pliki cookie służą wyłącznie wydajności serwisu i rozwojowi produktu.',
      'Ustawieniami cookie możesz zarządzać w dowolnym momencie.',
    ],
    termsTitle: 'Warunki Korzystania',
    termsIntro: 'Korzystając z serwisu, zgadzasz się używać go zgodnie z prawem i odpowiedzialnie. Usługa jest dostarczana w stanie takim, w jakim jest, bez gwarancji określonych rezultatów prawnych lub biznesowych.',
    termsBullets: [
      'Nie używaj serwisu do działań nadużyciowych, nielegalnych ani związanych z automatycznymi atakami.',
      'Odpowiadasz za bezpieczne przechowywanie wygenerowanych haseł.',
      'Możemy aktualizować warunki wraz ze zmianami prawnymi, bezpieczeństwa lub produktu.',
    ],
    contactTitle: 'Kontakt',
    contactIntro: 'Jeśli masz pytania dotyczące prywatności, warunków, bezpieczeństwa lub treści, skontaktuj się z nami poniżej.',
    contactEmailLabel: 'Email',
    contactResponseLabel: 'Typowy czas odpowiedzi: 1-3 dni robocze',
  },
};

export function getStaticPageCopy(locale: string): StaticPageCopy {
  const normalized = (locale || 'en').trim().toLowerCase().split(/[-_]/)[0] as StaticPageLocale;
  return COPY[normalized] || COPY.en;
}

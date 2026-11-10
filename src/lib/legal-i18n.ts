export type LegalSection = {
  heading: string;
  body: string;
};

export type LegalDocument = {
  intro: string;
  sections: LegalSection[];
};

export type LegalCopy = {
  privacy: LegalDocument;
  terms: LegalDocument;
};

/**
 * Privacy policy and terms content. The old `privacyIntro`/`privacyBullets`
 * fields in `static-pages-i18n.ts` are no longer rendered: they claimed the
 * site does no advertising tracking, which contradicts the AdSense disclosure.
 */
export const LEGAL_COPY: Record<string, LegalCopy> = {
  en: {
    privacy: {
      intro:
        'This policy explains what data Generate Password To Me processes, why, and which choices you have. The short version: generated passwords never leave your browser, we do not require an account, and advertising cookies are used only after you consent.',
      sections: [
        {
          heading: 'Who we are',
          body: 'Generate Password To Me is an independent password-generation project. For privacy questions or data requests, write to support@generatepasswordto.me. We do not ask for your name, and you can use every tool without registering.',
        },
        {
          heading: 'What we collect',
          body: 'We process the minimum needed to run and protect the site: server and security logs (IP address, user agent, requested URL, timestamp), error diagnostics, and the content of messages you send through the contact form. Generated passwords are created locally in your browser and are never transmitted to or stored on our servers.',
        },
        {
          heading: 'Cookies and similar technologies',
          body: 'Necessary cookies store your theme, language preference, and consent choice. Analytics cookies are set only with consent and show aggregate usage, not individual passwords. A short-lived first-party geo cookie may store a country code so regional affiliate links resolve correctly. You can change or withdraw consent at any time through the cookie settings.',
        },
        {
          heading: 'Advertising and Google AdSense',
          body: 'When advertising is enabled, Google AdSense may use cookies, including the DoubleClick cookie, to serve and measure ads. Personalized advertising is used only after you grant the marketing category. If consent is denied, Google receives limited consent signals and serves non-personalized ads where applicable. You can opt out of personalized advertising at adssettings.google.com or aboutads.info.',
        },
        {
          heading: 'Legal bases and your rights',
          body: 'We rely on consent for analytics and advertising cookies, and on legitimate interests for security, diagnostics, and service reliability. Under the GDPR and similar laws you may request access, correction, deletion, restriction, portability, or object to processing, and you may complain to your local data protection authority. Write to support@generatepasswordto.me and we will respond within the period required by law.',
        },
        {
          heading: 'Retention, security, and changes',
          body: 'Security logs and support messages are kept only as long as needed for security and support, then deleted. Traffic is served over HTTPS, access to production systems is restricted, and we do not store generated passwords. We may update this policy when the service or the law changes; the revision date on this page reflects the latest version.',
        },
      ],
    },
    terms: {
      intro:
        'These terms describe how you may use Generate Password To Me. By accessing the site or using the generator, you agree to them. If you do not agree, please do not use the service.',
      sections: [
        {
          heading: 'Acceptance and scope',
          body: 'These terms apply to the website, the password generator, the guides, and any related tools. Additional notices on a page, such as an affiliate disclosure, form part of these terms for that page.',
        },
        {
          heading: 'The service and its limits',
          body: 'The service is free to use. Passwords are generated locally in your browser. We do not guarantee that a generated password is suitable for a specific account, system, or threat model; you are responsible for choosing the length, character set, and storage method.',
        },
        {
          heading: 'Acceptable use',
          body: 'Do not use the site to break the law, attack systems, send spam, scrape content at scale, or interfere with availability. Do not attempt to bypass rate limits, captchas, or other security controls. We may restrict access when we detect abuse.',
        },
        {
          heading: 'Intellectual property and third parties',
          body: 'The site content, brand, and code are protected by applicable intellectual property law. Guides may link to third-party products and services; some links are affiliate links and are disclosed on the page. We are not responsible for third-party sites, their content, or their privacy practices.',
        },
        {
          heading: 'Disclaimer and liability',
          body: 'The site is provided "as is" without warranties of any kind. To the extent permitted by law, we are not liable for indirect or consequential damages, data loss, or losses caused by using or being unable to use the service. Nothing in these terms limits rights that cannot be limited by law.',
        },
        {
          heading: 'No professional advice',
          body: 'The guides are educational. They do not replace a security audit, legal advice, or your organization’s own password policy. Verify recommendations against the standards and systems you actually use.',
        },
        {
          heading: 'Changes and contact',
          body: 'We may update the service and these terms. Material changes are reflected by the date on this page, and continued use after a change means acceptance. Questions about these terms: support@generatepasswordto.me.',
        },
      ],
    },
  },
  ua: {
    privacy: {
      intro:
        'Ця політика пояснює, які дані обробляє Generate Password To Me, для чого і які вибори ви маєте. Коротко: згенеровані паролі не залишають ваш браузер, акаунт не потрібен, а рекламні cookie використовуються лише після вашої згоди.',
      sections: [
        {
          heading: 'Хто ми',
          body: 'Generate Password To Me це незалежний проєкт генерації паролів. З питань приватності та запитів щодо даних пишіть на support@generatepasswordto.me. Ми не питаємо ваше ім’я, і всіма інструментами можна користуватися без реєстрації.',
        },
        {
          heading: 'Які дані ми збираємо',
          body: 'Ми обробляємо мінімум, потрібний для роботи й захисту сайту: серверні логи та логи безпеки (IP-адреса, user agent, URL, час), діагностику помилок і текст повідомлень, надісланих через форму контактів. Згенеровані паролі створюються локально у вашому браузері й ніколи не передаються на сервер і не зберігаються.',
        },
        {
          heading: 'Cookie та подібні технології',
          body: 'Необхідні cookie зберігають тему, мову та ваш вибір згоди. Аналітичні cookie встановлюються лише зі згодою і показують агреговане використання, а не окремі паролі. Короткоживуча власна geo-cookie може зберігати код країни, щоб регіональні партнерські посилання працювали коректно. Змінити або відкликати згоду можна в налаштуваннях cookie.',
        },
        {
          heading: 'Реклама та Google AdSense',
          body: 'Коли рекламу ввімкнено, Google AdSense може використовувати cookie, зокрема DoubleClick, для показу й вимірювання оголошень. Персоналізована реклама показується лише після надання згоди на маркетинг. Якщо згоду відхилено, Google отримує обмежені сигнали згоди й показує нерекламні оголошення, де це застосовно. Відмовитися від персоналізованої реклами можна на adssettings.google.com або aboutads.info.',
        },
        {
          heading: 'Правові підстави та ваші права',
          body: 'Для аналітичних і рекламних cookie ми покладаємося на згоду, а для безпеки, діагностики й надійності сервісу на законні інтереси. Відповідно до GDPR та подібних законів ви можете запросити доступ, виправлення, видалення, обмеження, перенесення даних або заперечити проти обробки, а також подати скаргу до свого наглядового органу. Пишіть на support@generatepasswordto.me, і ми відповімо у встановлений законом строк.',
        },
        {
          heading: 'Зберігання, безпека та зміни',
          body: 'Логи безпеки й повідомлення підтримки зберігаються лише стільки, скільки потрібно для безпеки та підтримки, після чого видаляються. Трафік передається через HTTPS, доступ до продакшн-систем обмежений, згенеровані паролі ми не зберігаємо. Політику може бути оновлено відповідно до змін сервісу або законодавства; дата на цій сторінці показує останню редакцію.',
        },
      ],
    },
    terms: {
      intro:
        'Ці умови описують, як можна користуватися Generate Password To Me. Отримуючи доступ до сайту або використовуючи генератор, ви погоджуєтеся з ними. Якщо ви не згодні, будь ласка, не користуйтеся сервісом.',
      sections: [
        {
          heading: 'Прийняття та сфера дії',
          body: 'Ці умови застосовуються до сайту, генератора паролів, довідників і пов’язаних інструментів. Додаткові повідомлення на сторінці, зокрема розкриття партнерських посилань, є частиною цих умов для відповідної сторінки.',
        },
        {
          heading: 'Сервіс і його обмеження',
          body: 'Сервіс безкоштовний. Паролі генеруються локально у вашому браузері. Ми не гарантуємо, що згенерований пароль підійде для конкретного акаунта, системи чи моделі загроз; ви відповідаєте за вибір довжини, набору символів і способу зберігання.',
        },
        {
          heading: 'Прийнятне використання',
          body: 'Не використовуйте сайт для порушення закону, атак на системи, спаму, масового збору контенту або перешкоджання доступності. Не намагайтеся обходити обмеження частоти, капчу чи інші засоби захисту. Ми можемо обмежити доступ у разі зловживань.',
        },
        {
          heading: 'Інтелектуальна власність і треті сторони',
          body: 'Контент, бренд і код сайту захищені чинним законодавством про інтелектуальну власність. Довідники можуть містити посилання на продукти третіх сторін; деякі з них є партнерськими і розкриваються на сторінці. Ми не відповідаємо за сайти третіх сторін, їхній контент чи політики приватності.',
        },
        {
          heading: 'Відмова від гарантій і відповідальність',
          body: 'Сайт надається «як є», без гарантій будь-якого виду. У межах, дозволених законом, ми не відповідаємо за непрямі чи похідні збитки, втрату даних або збитки через використання чи неможливість використання сервісу. Ніщо в цих умовах не обмежує права, які не можуть бути обмежені законом.',
        },
        {
          heading: 'Без професійних консультацій',
          body: 'Довідники мають освітній характер. Вони не замінюють аудит безпеки, юридичну консультацію чи власну політику паролів вашої організації. Перевіряйте рекомендації проти стандартів і систем, які ви фактично використовуєте.',
        },
        {
          heading: 'Зміни та контакти',
          body: 'Ми можемо оновлювати сервіс і ці умови. Суттєві зміни відображаються датою на цій сторінці, а подальше використання після зміни означає прийняття. Питання щодо умов: support@generatepasswordto.me.',
        },
      ],
    },
  },
  ru: {
    privacy: {
      intro:
        'Эта политика объясняет, какие данные обрабатывает Generate Password To Me, зачем и какие у вас есть варианты. Коротко: сгенерированные пароли не покидают ваш браузер, аккаунт не нужен, а рекламные cookie используются только после вашего согласия.',
      sections: [
        {
          heading: 'Кто мы',
          body: 'Generate Password To Me это независимый проект генерации паролей. По вопросам приватности и запросам о данных пишите на support@generatepasswordto.me. Мы не спрашиваем ваше имя, и всеми инструментами можно пользоваться без регистрации.',
        },
        {
          heading: 'Какие данные мы собираем',
          body: 'Мы обрабатываем минимум, необходимый для работы и защиты сайта: серверные логи и логи безопасности (IP-адрес, user agent, URL, время), диагностику ошибок и текст сообщений, отправленных через форму контактов. Сгенерированные пароли создаются локально в вашем браузере и никогда не передаются на сервер и не сохраняются.',
        },
        {
          heading: 'Cookie и похожие технологии',
          body: 'Необходимые cookie хранят тему, язык и ваш выбор согласия. Аналитические cookie устанавливаются только с согласия и показывают агрегированное использование, а не отдельные пароли. Кратковременная собственная geo-cookie может хранить код страны, чтобы региональные партнёрские ссылки работали корректно. Изменить или отозвать согласие можно в настройках cookie.',
        },
        {
          heading: 'Реклама и Google AdSense',
          body: 'Когда реклама включена, Google AdSense может использовать cookie, включая DoubleClick, для показа и измерения объявлений. Персонализированная реклама показывается только после согласия на маркетинг. Если согласие отклонено, Google получает ограниченные сигналы согласия и показывает нерекламные объявления, где это применимо. Отказаться от персонализированной рекламы можно на adssettings.google.com или aboutads.info.',
        },
        {
          heading: 'Правовые основания и ваши права',
          body: 'Для аналитических и рекламных cookie мы полагаемся на согласие, а для безопасности, диагностики и надёжности сервиса на законные интересы. Согласно GDPR и аналогичным законам вы можете запросить доступ, исправление, удаление, ограничение, перенос данных или возразить против обработки, а также подать жалобу в свой надзорный орган. Пишите на support@generatepasswordto.me, и мы ответим в установленный законом срок.',
        },
        {
          heading: 'Хранение, безопасность и изменения',
          body: 'Логи безопасности и сообщения поддержки хранятся только столько, сколько нужно для безопасности и поддержки, после чего удаляются. Трафик передаётся по HTTPS, доступ к продакшн-системам ограничен, сгенерированные пароли мы не храним. Политика может обновляться при изменении сервиса или законодательства; дата на этой странице показывает последнюю редакцию.',
        },
      ],
    },
    terms: {
      intro:
        'Эти условия описывают, как можно пользоваться Generate Password To Me. Получая доступ к сайту или используя генератор, вы соглашаетесь с ними. Если вы не согласны, пожалуйста, не пользуйтесь сервисом.',
      sections: [
        {
          heading: 'Принятие и область действия',
          body: 'Эти условия применяются к сайту, генератору паролей, руководствам и связанным инструментам. Дополнительные уведомления на странице, включая раскрытие партнёрских ссылок, являются частью этих условий для соответствующей страницы.',
        },
        {
          heading: 'Сервис и его ограничения',
          body: 'Сервис бесплатный. Пароли генерируются локально в вашем браузере. Мы не гарантируем, что сгенерированный пароль подойдёт для конкретного аккаунта, системы или модели угроз; вы отвечаете за выбор длины, набора символов и способа хранения.',
        },
        {
          heading: 'Приемлемое использование',
          body: 'Не используйте сайт для нарушения закона, атак на системы, спама, массового сбора контента или препятствования доступности. Не пытайтесь обходить ограничения частоты, капчу или другие средства защиты. Мы можем ограничить доступ при злоупотреблениях.',
        },
        {
          heading: 'Интеллектуальная собственность и третьи стороны',
          body: 'Контент, бренд и код сайта защищены действующим законодательством об интеллектуальной собственности. Руководства могут содержать ссылки на продукты третьих сторон; некоторые из них являются партнёрскими и раскрываются на странице. Мы не отвечаем за сайты третьих сторон, их контент или политики приватности.',
        },
        {
          heading: 'Отказ от гарантий и ответственность',
          body: 'Сайт предоставляется «как есть», без гарантий любого вида. В пределах, разрешённых законом, мы не отвечаем за косвенные или производные убытки, потерю данных или убытки из-за использования либо невозможности использования сервиса. Ничто в этих условиях не ограничивает права, которые не могут быть ограничены законом.',
        },
        {
          heading: 'Без профессиональных консультаций',
          body: 'Руководства носят образовательный характер. Они не заменяют аудит безопасности, юридическую консультацию или собственную политику паролей вашей организации. Проверяйте рекомендации по стандартам и системам, которые вы фактически используете.',
        },
        {
          heading: 'Изменения и контакты',
          body: 'Мы можем обновлять сервис и эти условия. Существенные изменения отражаются датой на этой странице, а дальнейшее использование после изменения означает принятие. Вопросы по условиям: support@generatepasswordto.me.',
        },
      ],
    },
  },
  es: {
    privacy: {
      intro:
        'Esta política explica qué datos procesa Generate Password To Me, por qué y qué opciones tienes. En resumen: las contraseñas generadas nunca salen de tu navegador, no hace falta cuenta y las cookies publicitarias solo se usan con tu consentimiento.',
      sections: [
        {
          heading: 'Quiénes somos',
          body: 'Generate Password To Me es un proyecto independiente de generación de contraseñas. Para preguntas de privacidad o solicitudes de datos, escribe a support@generatepasswordto.me. No pedimos tu nombre y puedes usar todas las herramientas sin registrarte.',
        },
        {
          heading: 'Qué datos recopilamos',
          body: 'Procesamos lo mínimo para operar y proteger el sitio: registros de servidor y seguridad (IP, agente de usuario, URL, fecha), diagnóstico de errores y el contenido de los mensajes enviados por el formulario. Las contraseñas se generan localmente en tu navegador y nunca se transmiten ni se almacenan.',
        },
        {
          heading: 'Cookies y tecnologías similares',
          body: 'Las cookies necesarias guardan el tema, el idioma y tu elección de consentimiento. Las de analítica solo se activan con consentimiento y muestran uso agregado, no contraseñas. Una cookie geo propia de corta duración puede guardar el país para resolver enlaces de afiliado. Puedes cambiar o retirar el consentimiento en la configuración de cookies.',
        },
        {
          heading: 'Publicidad y Google AdSense',
          body: 'Cuando la publicidad está activa, Google AdSense puede usar cookies, incluida DoubleClick, para mostrar y medir anuncios. La publicidad personalizada solo se usa tras otorgar la categoría de marketing. Si se deniega el consentimiento, Google recibe señales limitadas y muestra anuncios no personalizados cuando corresponde. Puedes desactivarla en adssettings.google.com o aboutads.info.',
        },
        {
          heading: 'Bases legales y tus derechos',
          body: 'Nos basamos en el consentimiento para cookies de analítica y publicidad, y en intereses legítimos para seguridad, diagnóstico y fiabilidad. Conforme al RGPD y leyes similares puedes solicitar acceso, rectificación, supresión, limitación, portabilidad u oposición, y reclamar ante tu autoridad de protección de datos. Escribe a support@generatepasswordto.me y responderemos en el plazo legal.',
        },
        {
          heading: 'Conservación, seguridad y cambios',
          body: 'Los registros de seguridad y mensajes de soporte se conservan solo lo necesario y luego se eliminan. El tráfico usa HTTPS, el acceso a producción está restringido y no almacenamos contraseñas. Podemos actualizar esta política cuando cambie el servicio o la ley; la fecha de esta página refleja la última versión.',
        },
      ],
    },
    terms: {
      intro:
        'Estos términos describen cómo puedes usar Generate Password To Me. Al acceder al sitio o usar el generador, los aceptas. Si no estás de acuerdo, no uses el servicio.',
      sections: [
        {
          heading: 'Aceptación y alcance',
          body: 'Estos términos se aplican al sitio, al generador de contraseñas, a las guías y a las herramientas relacionadas. Los avisos adicionales de una página, como la divulgación de afiliados, forman parte de estos términos para esa página.',
        },
        {
          heading: 'El servicio y sus límites',
          body: 'El servicio es gratuito. Las contraseñas se generan localmente en tu navegador. No garantizamos que una contraseña generada sea adecuada para una cuenta, sistema o modelo de amenaza concretos; tú eliges la longitud, el conjunto de caracteres y el método de almacenamiento.',
        },
        {
          heading: 'Uso aceptable',
          body: 'No uses el sitio para infringir la ley, atacar sistemas, enviar spam, extraer contenido a gran escala o interferir con la disponibilidad. No intentes eludir límites de frecuencia, captchas u otros controles. Podemos restringir el acceso si detectamos abuso.',
        },
        {
          heading: 'Propiedad intelectual y terceros',
          body: 'El contenido, la marca y el código están protegidos por la legislación de propiedad intelectual. Las guías pueden enlazar a productos de terceros; algunos enlaces son de afiliado y se divulgan en la página. No somos responsables de sitios de terceros, su contenido ni sus prácticas de privacidad.',
        },
        {
          heading: 'Exención de garantías y responsabilidad',
          body: 'El sitio se ofrece «tal cual», sin garantías de ningún tipo. En la medida permitida por la ley, no somos responsables de daños indirectos o consecuentes, pérdida de datos o pérdidas por usar o no poder usar el servicio. Nada aquí limita derechos que la ley no permite limitar.',
        },
        {
          heading: 'Sin asesoramiento profesional',
          body: 'Las guías son educativas. No sustituyen una auditoría de seguridad, asesoramiento legal ni la política de contraseñas de tu organización. Verifica las recomendaciones con los estándares y sistemas que realmente utilizas.',
        },
        {
          heading: 'Cambios y contacto',
          body: 'Podemos actualizar el servicio y estos términos. Los cambios materiales se reflejan en la fecha de esta página, y el uso continuado implica aceptación. Preguntas: support@generatepasswordto.me.',
        },
      ],
    },
  },
  fr: {
    privacy: {
      intro:
        'Cette politique explique quelles données Generate Password To Me traite, pourquoi et quels choix vous avez. En bref : les mots de passe générés ne quittent jamais votre navigateur, aucun compte n’est requis et les cookies publicitaires ne sont utilisés qu’avec votre consentement.',
      sections: [
        {
          heading: 'Qui nous sommes',
          body: 'Generate Password To Me est un projet indépendant de génération de mots de passe. Pour toute question de confidentialité ou demande relative aux données, écrivez à support@generatepasswordto.me. Nous ne demandons pas votre nom et tous les outils sont utilisables sans inscription.',
        },
        {
          heading: 'Données collectées',
          body: 'Nous traitons le minimum nécessaire au fonctionnement et à la sécurité du site : journaux serveur et de sécurité (adresse IP, agent utilisateur, URL, horodatage), diagnostics d’erreurs et contenu des messages envoyés via le formulaire. Les mots de passe sont générés localement dans votre navigateur et ne sont jamais transmis ni stockés.',
        },
        {
          heading: 'Cookies et technologies similaires',
          body: 'Les cookies nécessaires conservent le thème, la langue et votre choix de consentement. Les cookies d’analyse ne sont posés qu’avec consentement et montrent un usage agrégé, jamais les mots de passe. Un cookie géographique interne de courte durée peut conserver le pays pour résoudre les liens d’affiliation. Vous pouvez modifier ou retirer votre consentement dans les paramètres de cookies.',
        },
        {
          heading: 'Publicité et Google AdSense',
          body: 'Lorsque la publicité est activée, Google AdSense peut utiliser des cookies, dont le cookie DoubleClick, pour diffuser et mesurer les annonces. La publicité personnalisée n’est utilisée qu’après consentement à la catégorie marketing. En cas de refus, Google reçoit des signaux de consentement limités et diffuse des annonces non personnalisées lorsque cela s’applique. Vous pouvez vous y opposer sur adssettings.google.com ou aboutads.info.',
        },
        {
          heading: 'Bases légales et vos droits',
          body: 'Nous nous appuyons sur le consentement pour les cookies d’analyse et publicitaires, et sur l’intérêt légitime pour la sécurité, les diagnostics et la fiabilité. Conformément au RGPD et aux lois similaires, vous pouvez demander l’accès, la rectification, l’effacement, la limitation, la portabilité ou vous opposer au traitement, et saisir votre autorité de protection des données. Écrivez à support@generatepasswordto.me ; nous répondrons dans le délai légal.',
        },
        {
          heading: 'Conservation, sécurité et modifications',
          body: 'Les journaux de sécurité et messages de support sont conservés le temps nécessaire, puis supprimés. Le trafic passe par HTTPS, l’accès à la production est restreint et nous ne stockons pas les mots de passe générés. Cette politique peut être mise à jour ; la date de cette page indique la dernière version.',
        },
      ],
    },
    terms: {
      intro:
        'Ces conditions décrivent l’utilisation de Generate Password To Me. En accédant au site ou en utilisant le générateur, vous les acceptez. Si vous n’êtes pas d’accord, n’utilisez pas le service.',
      sections: [
        {
          heading: 'Acceptation et champ d’application',
          body: 'Ces conditions s’appliquent au site, au générateur de mots de passe, aux guides et aux outils associés. Les mentions supplémentaires d’une page, comme la divulgation d’affiliation, font partie de ces conditions pour cette page.',
        },
        {
          heading: 'Le service et ses limites',
          body: 'Le service est gratuit. Les mots de passe sont générés localement dans votre navigateur. Nous ne garantissons pas qu’un mot de passe généré convienne à un compte, un système ou un modèle de menace particulier ; vous choisissez la longueur, le jeu de caractères et le mode de stockage.',
        },
        {
          heading: 'Utilisation acceptable',
          body: 'N’utilisez pas le site pour enfreindre la loi, attaquer des systèmes, envoyer du spam, extraire massivement du contenu ou nuire à la disponibilité. Ne contournez pas les limites de débit, les captchas ou les autres contrôles. Nous pouvons restreindre l’accès en cas d’abus.',
        },
        {
          heading: 'Propriété intellectuelle et tiers',
          body: 'Le contenu, la marque et le code sont protégés par le droit de la propriété intellectuelle. Les guides peuvent renvoyer à des produits tiers ; certains liens sont affiliés et signalés sur la page. Nous ne sommes pas responsables des sites tiers, de leur contenu ni de leurs pratiques de confidentialité.',
        },
        {
          heading: 'Garanties et responsabilité',
          body: 'Le site est fourni « en l’état », sans garantie d’aucune sorte. Dans les limites permises par la loi, nous ne sommes pas responsables des dommages indirects ou consécutifs, des pertes de données ni des pertes liées à l’utilisation ou à l’impossibilité d’utiliser le service. Rien ici ne limite les droits que la loi interdit de limiter.',
        },
        {
          heading: 'Pas de conseil professionnel',
          body: 'Les guides sont éducatifs. Ils ne remplacent pas un audit de sécurité, un conseil juridique ou la politique de mots de passe de votre organisation. Vérifiez les recommandations au regard des normes et systèmes que vous utilisez réellement.',
        },
        {
          heading: 'Modifications et contact',
          body: 'Nous pouvons faire évoluer le service et ces conditions. Les changements importants sont reflétés par la date de cette page, et l’utilisation continue vaut acceptation. Questions : support@generatepasswordto.me.',
        },
      ],
    },
  },
  de: {
    privacy: {
      intro:
        'Diese Richtlinie erklärt, welche Daten Generate Password To Me verarbeitet, warum und welche Wahlmöglichkeiten Sie haben. Kurz gesagt: Generierte Passwörter verlassen Ihren Browser nie, ein Konto ist nicht nötig, und Werbe-Cookies werden nur mit Ihrer Einwilligung verwendet.',
      sections: [
        {
          heading: 'Wer wir sind',
          body: 'Generate Password To Me ist ein unabhängiges Projekt zur Passwortgenerierung. Bei Datenschutzfragen oder Datenanfragen schreiben Sie an support@generatepasswordto.me. Wir fragen Ihren Namen nicht ab, und alle Werkzeuge sind ohne Registrierung nutzbar.',
        },
        {
          heading: 'Welche Daten wir verarbeiten',
          body: 'Wir verarbeiten nur das Minimum für Betrieb und Sicherheit der Website: Server- und Sicherheitsprotokolle (IP-Adresse, User-Agent, URL, Zeitstempel), Fehlerdiagnosen und den Inhalt von Nachrichten über das Kontaktformular. Passwörter entstehen lokal in Ihrem Browser und werden weder übertragen noch gespeichert.',
        },
        {
          heading: 'Cookies und ähnliche Technologien',
          body: 'Notwendige Cookies speichern Theme, Sprache und Ihre Einwilligung. Analyse-Cookies werden nur mit Einwilligung gesetzt und zeigen aggregierte Nutzung, keine Passwörter. Ein kurzlebiges eigenes Geo-Cookie kann das Land speichern, damit regionale Partnerlinks funktionieren. Sie können Ihre Einwilligung jederzeit in den Cookie-Einstellungen ändern oder widerrufen.',
        },
        {
          heading: 'Werbung und Google AdSense',
          body: 'Wenn Werbung aktiviert ist, kann Google AdSense Cookies, einschließlich des DoubleClick-Cookies, zum Ausliefern und Messen von Anzeigen verwenden. Personalisierte Werbung erfolgt nur nach Einwilligung in die Marketing-Kategorie. Bei verweigerter Einwilligung erhält Google eingeschränkte Signale und zeigt, soweit anwendbar, nicht personalisierte Anzeigen. Widerspruch: adssettings.google.com oder aboutads.info.',
        },
        {
          heading: 'Rechtsgrundlagen und Ihre Rechte',
          body: 'Für Analyse- und Werbe-Cookies stützen wir uns auf Einwilligung, für Sicherheit, Diagnose und Zuverlässigkeit auf berechtigte Interessen. Nach DSGVO und ähnlichen Gesetzen können Sie Auskunft, Berichtigung, Löschung, Einschränkung, Übertragbarkeit oder Widerspruch verlangen und sich bei Ihrer Aufsichtsbehörde beschweren. Schreiben Sie an support@generatepasswordto.me; wir antworten innerhalb der gesetzlichen Frist.',
        },
        {
          heading: 'Speicherdauer, Sicherheit und Änderungen',
          body: 'Sicherheitsprotokolle und Support-Nachrichten werden nur so lange wie nötig aufbewahrt und danach gelöscht. Der Traffic läuft über HTTPS, der Zugriff auf Produktionssysteme ist beschränkt, und generierte Passwörter speichern wir nicht. Wir können diese Richtlinie aktualisieren; das Datum auf dieser Seite zeigt die letzte Fassung.',
        },
      ],
    },
    terms: {
      intro:
        'Diese Bedingungen beschreiben die Nutzung von Generate Password To Me. Mit dem Zugriff auf die Website oder der Nutzung des Generators stimmen Sie ihnen zu. Wenn Sie nicht einverstanden sind, nutzen Sie den Dienst bitte nicht.',
      sections: [
        {
          heading: 'Zustimmung und Geltungsbereich',
          body: 'Diese Bedingungen gelten für die Website, den Passwortgenerator, die Leitfäden und verwandte Werkzeuge. Zusätzliche Hinweise auf einer Seite, etwa eine Affiliate-Offenlegung, sind Teil dieser Bedingungen für diese Seite.',
        },
        {
          heading: 'Der Dienst und seine Grenzen',
          body: 'Der Dienst ist kostenlos. Passwörter werden lokal in Ihrem Browser erzeugt. Wir garantieren nicht, dass ein erzeugtes Passwort für ein bestimmtes Konto, System oder Bedrohungsmodell geeignet ist; Länge, Zeichensatz und Speicherung wählen Sie.',
        },
        {
          heading: 'Zulässige Nutzung',
          body: 'Nutzen Sie die Website nicht für Rechtsverstöße, Angriffe auf Systeme, Spam, massenhaftes Scraping oder Störungen der Verfügbarkeit. Umgehen Sie keine Ratenbegrenzungen, Captchas oder andere Schutzmaßnahmen. Bei Missbrauch können wir den Zugriff einschränken.',
        },
        {
          heading: 'Geistiges Eigentum und Dritte',
          body: 'Inhalte, Marke und Code sind urheber- und markenrechtlich geschützt. Leitfäden können auf Produkte Dritter verlinken; einige Links sind Affiliate-Links und auf der Seite gekennzeichnet. Für Websites Dritter, deren Inhalte oder Datenschutzpraktiken übernehmen wir keine Verantwortung.',
        },
        {
          heading: 'Gewährleistung und Haftung',
          body: 'Die Website wird „wie besehen“ ohne Gewährleistung bereitgestellt. Soweit gesetzlich zulässig, haften wir nicht für mittelbare oder Folgeschäden, Datenverlust oder Schäden durch Nutzung oder Nichtnutzbarkeit des Dienstes. Rechte, die gesetzlich nicht beschränkt werden können, bleiben unberührt.',
        },
        {
          heading: 'Keine professionelle Beratung',
          body: 'Die Leitfäden dienen der Information. Sie ersetzen kein Sicherheitsaudit, keine Rechtsberatung und keine Passwortrichtlinie Ihrer Organisation. Prüfen Sie Empfehlungen anhand der Standards und Systeme, die Sie tatsächlich verwenden.',
        },
        {
          heading: 'Änderungen und Kontakt',
          body: 'Wir können den Dienst und diese Bedingungen aktualisieren. Wesentliche Änderungen ergeben sich aus dem Datum dieser Seite; die weitere Nutzung gilt als Zustimmung. Fragen: support@generatepasswordto.me.',
        },
      ],
    },
  },
  it: {
    privacy: {
      intro:
        'Questa informativa spiega quali dati tratta Generate Password To Me, perché e quali scelte hai. In breve: le password generate non lasciano mai il browser, non serve un account e i cookie pubblicitari vengono usati solo con il tuo consenso.',
      sections: [
        {
          heading: 'Chi siamo',
          body: 'Generate Password To Me è un progetto indipendente di generazione di password. Per domande sulla privacy o richieste sui dati scrivi a support@generatepasswordto.me. Non chiediamo il tuo nome e tutti gli strumenti sono utilizzabili senza registrazione.',
        },
        {
          heading: 'Quali dati raccogliamo',
          body: 'Trattiamo il minimo necessario per gestire e proteggere il sito: log di server e sicurezza (indirizzo IP, user agent, URL, data), diagnostica degli errori e contenuto dei messaggi inviati dal modulo. Le password vengono generate localmente nel browser e non vengono mai trasmesse né memorizzate.',
        },
        {
          heading: 'Cookie e tecnologie simili',
          body: 'I cookie necessari salvano tema, lingua e la tua scelta di consenso. I cookie analitici si attivano solo con consenso e mostrano uso aggregato, non password. Un cookie geo proprietario di breve durata può salvare il paese per risolvere i link di affiliazione. Puoi modificare o revocare il consenso nelle impostazioni dei cookie.',
        },
        {
          heading: 'Pubblicità e Google AdSense',
          body: 'Quando la pubblicità è attiva, Google AdSense può usare cookie, incluso DoubleClick, per mostrare e misurare annunci. La pubblicità personalizzata è usata solo dopo il consenso alla categoria marketing. Se il consenso è negato, Google riceve segnali limitati e mostra annunci non personalizzati ove applicabile. Puoi disattivarla su adssettings.google.com o aboutads.info.',
        },
        {
          heading: 'Basi giuridiche e tuoi diritti',
          body: 'Ci basiamo sul consenso per i cookie analitici e pubblicitari e sul legittimo interesse per sicurezza, diagnostica e affidabilità. Ai sensi del GDPR e di leggi simili puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità o opposizione e presentare reclamo all’autorità di protezione dei dati. Scrivi a support@generatepasswordto.me; risponderemo nei termini di legge.',
        },
        {
          heading: 'Conservazione, sicurezza e modifiche',
          body: 'I log di sicurezza e i messaggi di supporto sono conservati solo quanto necessario e poi eliminati. Il traffico usa HTTPS, l’accesso alla produzione è limitato e non memorizziamo le password generate. Possiamo aggiornare questa informativa; la data in pagina indica l’ultima versione.',
        },
      ],
    },
    terms: {
      intro:
        'Questi termini descrivono come puoi usare Generate Password To Me. Accedendo al sito o usando il generatore li accetti. Se non sei d’accordo, non usare il servizio.',
      sections: [
        {
          heading: 'Accettazione e ambito',
          body: 'Questi termini si applicano al sito, al generatore di password, alle guide e agli strumenti correlati. Le informative aggiuntive di una pagina, come la disclosure di affiliazione, fanno parte di questi termini per quella pagina.',
        },
        {
          heading: 'Il servizio e i suoi limiti',
          body: 'Il servizio è gratuito. Le password sono generate localmente nel browser. Non garantiamo che una password generata sia adatta a uno specifico account, sistema o modello di minaccia; scegli tu lunghezza, set di caratteri e metodo di conservazione.',
        },
        {
          heading: 'Uso accettabile',
          body: 'Non usare il sito per violare la legge, attaccare sistemi, inviare spam, estrarre contenuti su larga scala o interferire con la disponibilità. Non aggirare limiti di frequenza, captcha o altri controlli. Possiamo limitare l’accesso in caso di abuso.',
        },
        {
          heading: 'Proprietà intellettuale e terze parti',
          body: 'Contenuti, marchio e codice sono protetti dalla legge sulla proprietà intellettuale. Le guide possono collegare prodotti di terzi; alcuni link sono di affiliazione e sono indicati nella pagina. Non siamo responsabili dei siti di terzi, dei loro contenuti o delle loro pratiche privacy.',
        },
        {
          heading: 'Garanzie e responsabilità',
          body: 'Il sito è fornito «così com’è», senza garanzie di alcun tipo. Nei limiti consentiti dalla legge non siamo responsabili di danni indiretti o consequenziali, perdita di dati o perdite derivanti dall’uso o dall’impossibilità di usare il servizio. Nessuna clausola limita diritti inderogabili.',
        },
        {
          heading: 'Nessuna consulenza professionale',
          body: 'Le guide sono educative. Non sostituiscono un audit di sicurezza, una consulenza legale o la policy password della tua organizzazione. Verifica i consigli rispetto agli standard e ai sistemi che usi davvero.',
        },
        {
          heading: 'Modifiche e contatti',
          body: 'Possiamo aggiornare il servizio e questi termini. Le modifiche sostanziali sono indicate dalla data in pagina e l’uso continuato vale come accettazione. Domande: support@generatepasswordto.me.',
        },
      ],
    },
  },
  pt: {
    privacy: {
      intro:
        'Esta política explica quais dados o Generate Password To Me trata, por quê e quais escolhas você tem. Em resumo: as senhas geradas nunca saem do seu navegador, não é preciso conta e cookies de publicidade só são usados com o seu consentimento.',
      sections: [
        {
          heading: 'Quem somos',
          body: 'O Generate Password To Me é um projeto independente de geração de senhas. Para dúvidas de privacidade ou pedidos sobre dados, escreva para support@generatepasswordto.me. Não pedimos seu nome e todas as ferramentas podem ser usadas sem cadastro.',
        },
        {
          heading: 'Quais dados coletamos',
          body: 'Tratamos o mínimo necessário para operar e proteger o site: registros de servidor e segurança (IP, user agent, URL, data), diagnóstico de erros e o conteúdo das mensagens enviadas pelo formulário. As senhas são geradas localmente no navegador e nunca são transmitidas nem armazenadas.',
        },
        {
          heading: 'Cookies e tecnologias semelhantes',
          body: 'Cookies necessários guardam tema, idioma e sua escolha de consentimento. Cookies de análise só são ativados com consentimento e mostram uso agregado, não senhas. Um cookie geográfico próprio de curta duração pode guardar o país para resolver links de afiliados. Você pode alterar ou retirar o consentimento nas configurações de cookies.',
        },
        {
          heading: 'Publicidade e Google AdSense',
          body: 'Quando a publicidade está ativa, o Google AdSense pode usar cookies, incluindo o DoubleClick, para exibir e medir anúncios. A publicidade personalizada só é usada após o consentimento para a categoria de marketing. Se o consentimento for negado, o Google recebe sinais limitados e exibe anúncios não personalizados quando aplicável. Você pode desativar em adssettings.google.com ou aboutads.info.',
        },
        {
          heading: 'Bases legais e seus direitos',
          body: 'Usamos consentimento para cookies de análise e publicidade e interesses legítimos para segurança, diagnóstico e confiabilidade. Nos termos do GDPR e leis semelhantes, você pode solicitar acesso, correção, exclusão, limitação, portabilidade ou oposição, e reclamar junto à autoridade de proteção de dados. Escreva para support@generatepasswordto.me; responderemos no prazo legal.',
        },
        {
          heading: 'Retenção, segurança e alterações',
          body: 'Registros de segurança e mensagens de suporte são mantidos apenas pelo tempo necessário e depois excluídos. O tráfego usa HTTPS, o acesso à produção é restrito e não armazenamos senhas geradas. Podemos atualizar esta política; a data nesta página indica a última versão.',
        },
      ],
    },
    terms: {
      intro:
        'Estes termos descrevem como você pode usar o Generate Password To Me. Ao acessar o site ou usar o gerador, você concorda com eles. Se não concordar, não use o serviço.',
      sections: [
        {
          heading: 'Aceitação e escopo',
          body: 'Estes termos se aplicam ao site, ao gerador de senhas, aos guias e às ferramentas relacionadas. Avisos adicionais em uma página, como a divulgação de afiliados, fazem parte destes termos para aquela página.',
        },
        {
          heading: 'O serviço e seus limites',
          body: 'O serviço é gratuito. As senhas são geradas localmente no navegador. Não garantimos que uma senha gerada seja adequada a uma conta, sistema ou modelo de ameaça específico; você escolhe o comprimento, o conjunto de caracteres e o método de armazenamento.',
        },
        {
          heading: 'Uso aceitável',
          body: 'Não use o site para infringir a lei, atacar sistemas, enviar spam, extrair conteúdo em massa ou prejudicar a disponibilidade. Não tente contornar limites de taxa, captchas ou outros controles. Podemos restringir o acesso em caso de abuso.',
        },
        {
          heading: 'Propriedade intelectual e terceiros',
          body: 'Conteúdo, marca e código são protegidos pela legislação de propriedade intelectual. Os guias podem linkar produtos de terceiros; alguns links são de afiliados e divulgados na página. Não somos responsáveis por sites de terceiros, seu conteúdo ou suas práticas de privacidade.',
        },
        {
          heading: 'Isenção de garantias e responsabilidade',
          body: 'O site é fornecido «como está», sem garantias de qualquer tipo. Na medida permitida por lei, não somos responsáveis por danos indiretos ou consequenciais, perda de dados ou prejuízos pelo uso ou impossibilidade de uso do serviço. Nada aqui limita direitos que a lei não permite limitar.',
        },
        {
          heading: 'Sem consultoria profissional',
          body: 'Os guias são educativos. Não substituem auditoria de segurança, consultoria jurídica ou a política de senhas da sua organização. Verifique as recomendações com os padrões e sistemas que você realmente usa.',
        },
        {
          heading: 'Alterações e contato',
          body: 'Podemos atualizar o serviço e estes termos. Mudanças materiais são refletidas pela data nesta página, e o uso contínuo significa aceitação. Dúvidas: support@generatepasswordto.me.',
        },
      ],
    },
  },
  pl: {
    privacy: {
      intro:
        'Ta polityka wyjaśnia, jakie dane przetwarza Generate Password To Me, dlaczego i jakie masz wybory. W skrócie: wygenerowane hasła nie opuszczają przeglądarki, konto nie jest potrzebne, a pliki cookie do reklam są używane tylko za Twoją zgodą.',
      sections: [
        {
          heading: 'Kim jesteśmy',
          body: 'Generate Password To Me to niezależny projekt generowania haseł. W sprawach prywatności i wniosków o dane pisz na support@generatepasswordto.me. Nie pytamy o imię i nazwisko, a wszystkie narzędzia działają bez rejestracji.',
        },
        {
          heading: 'Jakie dane zbieramy',
          body: 'Przetwarzamy minimum potrzebne do działania i ochrony strony: logi serwera i bezpieczeństwa (adres IP, user agent, URL, czas), diagnostykę błędów oraz treść wiadomości z formularza kontaktowego. Hasła są generowane lokalnie w przeglądarce i nigdy nie są przesyłane ani przechowywane.',
        },
        {
          heading: 'Pliki cookie i podobne technologie',
          body: 'Niezbędne pliki cookie przechowują motyw, język i wybór zgody. Pliki analityczne są ustawiane tylko za zgodą i pokazują zagregowane użycie, a nie hasła. Krótkotrwały własny plik geo może przechowywać kod kraju, aby linki afiliacyjne działały poprawnie. Zgodę możesz zmienić lub wycofać w ustawieniach cookie.',
        },
        {
          heading: 'Reklamy i Google AdSense',
          body: 'Gdy reklamy są włączone, Google AdSense może używać plików cookie, w tym DoubleClick, do wyświetlania i pomiaru reklam. Reklamy spersonalizowane są używane tylko po wyrażeniu zgody na marketing. Przy odmowie Google otrzymuje ograniczone sygnały zgody i wyświetla reklamy niespersonalizowane, jeśli ma to zastosowanie. Możesz zrezygnować na adssettings.google.com lub aboutads.info.',
        },
        {
          heading: 'Podstawy prawne i Twoje prawa',
          body: 'W przypadku plików analitycznych i reklamowych opieramy się na zgodzie, a w zakresie bezpieczeństwa, diagnostyki i niezawodności na uzasadnionym interesie. Zgodnie z RODO i podobnymi przepisami możesz żądać dostępu, sprostowania, usunięcia, ograniczenia, przenoszenia lub sprzeciwu, a także złożyć skargę do organu nadzorczego. Napisz na support@generatepasswordto.me; odpowiemy w ustawowym terminie.',
        },
        {
          heading: 'Przechowywanie, bezpieczeństwo i zmiany',
          body: 'Logi bezpieczeństwa i wiadomości pomocy technicznej przechowujemy tylko tak długo, jak to konieczne, a następnie usuwamy. Ruch jest szyfrowany HTTPS, dostęp do produkcji jest ograniczony, a wygenerowanych haseł nie przechowujemy. Polityka może się zmieniać; data na stronie wskazuje ostatnią wersję.',
        },
      ],
    },
    terms: {
      intro:
        'Te warunki opisują, jak możesz korzystać z Generate Password To Me. Korzystając ze strony lub generatora, akceptujesz je. Jeśli się nie zgadzasz, nie korzystaj z usługi.',
      sections: [
        {
          heading: 'Akceptacja i zakres',
          body: 'Warunki dotyczą strony, generatora haseł, poradników i powiązanych narzędzi. Dodatkowe informacje na stronie, takie jak ujawnienie linków afiliacyjnych, są częścią warunków dla tej strony.',
        },
        {
          heading: 'Usługa i jej ograniczenia',
          body: 'Usługa jest bezpłatna. Hasła są generowane lokalnie w przeglądarce. Nie gwarantujemy, że wygenerowane hasło będzie odpowiednie dla konkretnego konta, systemu lub modelu zagrożeń; długość, zestaw znaków i sposób przechowywania wybierasz sam.',
        },
        {
          heading: 'Dopuszczalne użycie',
          body: 'Nie używaj strony do łamania prawa, atakowania systemów, spamu, masowego pobierania treści ani zakłócania dostępności. Nie omijaj limitów częstotliwości, captcha ani innych zabezpieczeń. W przypadku nadużyć możemy ograniczyć dostęp.',
        },
        {
          heading: 'Własność intelektualna i strony trzecie',
          body: 'Treści, marka i kod są chronione prawem własności intelektualnej. Poradniki mogą linkować do produktów firm trzecich; część linków jest afiliacyjna i oznaczona na stronie. Nie odpowiadamy za strony trzecie, ich treści ani praktyki prywatności.',
        },
        {
          heading: 'Wyłączenie gwarancji i odpowiedzialność',
          body: 'Strona jest udostępniana „tak jak jest”, bez gwarancji jakiegokolwiek rodzaju. W zakresie dozwolonym przez prawo nie odpowiadamy za szkody pośrednie lub następcze, utratę danych ani straty wynikające z korzystania lub niemożności korzystania z usługi. Nic tutaj nie ogranicza praw, których nie można ograniczyć.',
        },
        {
          heading: 'Brak porad profesjonalnych',
          body: 'Poradniki mają charakter edukacyjny. Nie zastępują audytu bezpieczeństwa, porady prawnej ani polityki haseł Twojej organizacji. Weryfikuj zalecenia względem standardów i systemów, których naprawdę używasz.',
        },
        {
          heading: 'Zmiany i kontakt',
          body: 'Możemy aktualizować usługę i te warunki. Istotne zmiany są odzwierciedlone datą na stronie, a dalsze korzystanie oznacza akceptację. Pytania: support@generatepasswordto.me.',
        },
      ],
    },
  },
  zh: {
    privacy: {
      intro:
        '本政策说明 Generate Password To Me 处理哪些数据、为何处理以及您有哪些选择。简而言之：生成的密码不会离开您的浏览器，无需账户，广告 Cookie 仅在您同意后使用。',
      sections: [
        {
          heading: '我们是谁',
          body: 'Generate Password To Me 是一个独立的密码生成项目。隐私问题或数据请求请发送至 support@generatepasswordto.me。我们不会询问您的姓名，所有工具均可免注册使用。',
        },
        {
          heading: '我们收集哪些数据',
          body: '我们仅处理运行和保护网站所需的最少数据：服务器与安全日志（IP 地址、用户代理、请求 URL、时间戳）、错误诊断以及您通过联系表单发送的消息内容。密码在您的浏览器本地生成，绝不会传输到服务器或存储。',
        },
        {
          heading: 'Cookie 与类似技术',
          body: '必要 Cookie 用于保存主题、语言和您的同意选择。分析 Cookie 仅在您同意后设置，且只显示汇总使用情况，不包含密码。短期自有地理 Cookie 可能保存国家代码，以便正确解析区域联盟链接。您可随时在 Cookie 设置中更改或撤回同意。',
        },
        {
          heading: '广告与 Google AdSense',
          body: '启用广告后，Google AdSense 可能使用 Cookie（包括 DoubleClick）来投放和衡量广告。只有您同意营销类别后才会使用个性化广告。若拒绝同意，Google 会收到有限的同意信号，并在适用时投放非个性化广告。您可在 adssettings.google.com 或 aboutads.info 关闭个性化广告。',
        },
        {
          heading: '法律依据与您的权利',
          body: '分析及广告 Cookie 以同意为依据；安全、诊断和服务可靠性以合法利益为依据。根据 GDPR 及类似法律，您可请求访问、更正、删除、限制、可携带或反对处理，并可向当地数据保护机构投诉。请发送至 support@generatepasswordto.me，我们将在法律规定的期限内回复。',
        },
        {
          heading: '保留、安全与变更',
          body: '安全日志和支持消息仅在必要期间保留，随后删除。流量通过 HTTPS 传输，生产系统访问受限，我们不存储生成的密码。服务或法律变化时我们可能更新本政策；页面日期表示最新版本。',
        },
      ],
    },
    terms: {
      intro:
        '本条款说明您如何使用 Generate Password To Me。访问本站或使用生成器即表示您同意这些条款。如不同意，请勿使用本服务。',
      sections: [
        {
          heading: '接受与范围',
          body: '本条款适用于网站、密码生成器、指南及相关工具。页面上的附加说明（例如联盟链接披露）构成该页面条款的一部分。',
        },
        {
          heading: '服务及其限制',
          body: '本服务免费。密码在您的浏览器本地生成。我们不保证生成的密码适用于特定账户、系统或威胁模型；长度、字符集和存储方式由您自行选择。',
        },
        {
          heading: '可接受使用',
          body: '请勿利用本站违法、攻击系统、发送垃圾信息、大规模抓取内容或干扰可用性。请勿绕过速率限制、验证码或其他安全控制。发现滥用时我们可限制访问。',
        },
        {
          heading: '知识产权与第三方',
          body: '网站内容、品牌和代码受知识产权法保护。指南可能链接到第三方产品；部分链接为联盟链接并在页面披露。我们不对第三方网站、其内容或隐私做法负责。',
        },
        {
          heading: '免责声明与责任',
          body: '本站按“现状”提供，不附带任何保证。在法律允许的范围内，我们不对间接或后果性损害、数据丢失或因使用或无法使用服务造成的损失负责。本条款不限制法律不允许限制的权利。',
        },
        {
          heading: '非专业建议',
          body: '指南仅供教育参考，不能替代安全审计、法律建议或您组织的密码政策。请根据您实际使用的标准和系统核实建议。',
        },
        {
          heading: '变更与联系',
          body: '我们可能更新服务和本条款。重大变更以页面日期为准，变更后继续使用即视为接受。问题请联系 support@generatepasswordto.me。',
        },
      ],
    },
  },
  ja: {
    privacy: {
      intro:
        'このポリシーは、Generate Password To Me がどのようなデータを、なぜ処理し、どのような選択肢があるかを説明します。要点：生成されたパスワードはブラウザの外に出ず、アカウントは不要で、広告 Cookie は同意後にのみ使用されます。',
      sections: [
        {
          heading: '運営者',
          body: 'Generate Password To Me は独立したパスワード生成プロジェクトです。プライバシーに関する質問やデータ請求は support@generatepasswordto.me までお送りください。氏名は尋ねず、すべてのツールを登録なしで利用できます。',
        },
        {
          heading: '収集するデータ',
          body: 'サイトの運用と保護に必要な最小限のデータのみを処理します：サーバーおよびセキュリティログ（IP アドレス、ユーザーエージェント、URL、時刻）、エラー診断、お問い合わせフォームのメッセージ内容。パスワードはブラウザ内で生成され、送信も保存もされません。',
        },
        {
          heading: 'Cookie と類似技術',
          body: '必須 Cookie はテーマ、言語、同意の選択を保存します。分析 Cookie は同意がある場合のみ設定され、集計された利用状況を示し、パスワードは含みません。短期間の独自 geo Cookie が国コードを保存し、地域別アフィリエイトリンクを正しく解決する場合があります。Cookie 設定で同意を変更・撤回できます。',
        },
        {
          heading: '広告と Google AdSense',
          body: '広告が有効な場合、Google AdSense は DoubleClick Cookie を含む Cookie を使用して広告を配信・測定することがあります。パーソナライズ広告はマーケティングへの同意後のみ使用されます。同意がない場合、Google は限定的な同意シグナルを受け取り、該当する場合は非パーソナライズ広告を配信します。adssettings.google.com または aboutads.info で無効にできます。',
        },
        {
          heading: '法的根拠とあなたの権利',
          body: '分析・広告 Cookie は同意に、セキュリティ・診断・信頼性は正当な利益に基づきます。GDPR および類似法の下で、アクセス、訂正、削除、制限、移行、異議申立てを請求でき、監督機関に苦情を申し立てられます。support@generatepasswordto.me までご連絡ください。法定期限内に回答します。',
        },
        {
          heading: '保存期間、安全性、変更',
          body: 'セキュリティログとサポートメッセージは必要な期間のみ保存し、その後削除します。通信は HTTPS、本番環境へのアクセスは制限され、生成パスワードは保存しません。サービスや法令の変更に応じて本ポリシーを更新することがあります。ページの日付が最新版を示します。',
        },
      ],
    },
    terms: {
      intro:
        '本規約は Generate Password To Me の利用方法を定めます。サイトへのアクセスまたは生成ツールの利用により、本規約に同意したものとみなされます。同意しない場合はご利用くださいません。',
      sections: [
        {
          heading: '同意と適用範囲',
          body: '本規約は、サイト、パスワード生成ツール、ガイド、関連ツールに適用されます。アフィリエイト開示などページ上の追加表示は、そのページについて本規約の一部を構成します。',
        },
        {
          heading: 'サービスとその限界',
          body: '本サービスは無料です。パスワードはブラウザ内で生成されます。生成されたパスワードが特定のアカウント、システム、脅威モデルに適していることは保証しません。長さ、文字種、保存方法はご自身で選択してください。',
        },
        {
          heading: '許容される利用',
          body: '违法行為、システムへの攻撃、スパム送信、大規模なスクレイピング、可用性の妨害に利用しないでください。レート制限、CAPTCHA、その他の保護を回避しないでください。濫用を検知した場合、アクセスを制限することがあります。',
        },
        {
          heading: '知的財産と第三者',
          body: 'サイトのコンテンツ、ブランド、コードは知的財産法で保護されています。ガイドは第三者製品へリンクする場合があり、一部はアフィリエイトリンクとしてページに開示されます。第三者のサイト、内容、プライバシー慣行について責任を負いません。',
        },
        {
          heading: '保証の否認と責任',
          body: '本サイトは「現状のまま」提供され、いかなる保証も伴いません。法律で認められる範囲で、間接的・結果的損害、データ損失、サービスの利用または利用不能による損失について責任を負いません。法律上制限できない権利は制限されません。',
        },
        {
          heading: '専門的助言ではありません',
          body: 'ガイドは教育目的です。セキュリティ監査、法的助言、組織のパスワードポリシーの代替にはなりません。実際に使用する標準やシステムに照らして推奨事項を確認してください。',
        },
        {
          heading: '変更と連絡先',
          body: 'サービスおよび本規約を更新することがあります。重要な変更はページの日付に反映され、変更後の継続利用は同意とみなされます。お問い合わせ：support@generatepasswordto.me。',
        },
      ],
    },
  },
  vi: {
    privacy: {
      intro:
        'Chính sách này giải thích Generate Password To Me xử lý dữ liệu nào, vì sao và bạn có những lựa chọn gì. Tóm lại: mật khẩu được tạo không rời khỏi trình duyệt, không cần tài khoản và cookie quảng cáo chỉ được dùng khi bạn đồng ý.',
      sections: [
        {
          heading: 'Chúng tôi là ai',
          body: 'Generate Password To Me là một dự án tạo mật khẩu độc lập. Mọi câu hỏi về quyền riêng tư hoặc yêu cầu dữ liệu, vui lòng gửi đến support@generatepasswordto.me. Chúng tôi không hỏi tên bạn và mọi công cụ đều dùng được mà không cần đăng ký.',
        },
        {
          heading: 'Dữ liệu chúng tôi thu thập',
          body: 'Chúng tôi chỉ xử lý mức tối thiểu cần thiết để vận hành và bảo vệ trang: nhật ký máy chủ và bảo mật (địa chỉ IP, user agent, URL, thời gian), chẩn đoán lỗi và nội dung tin nhắn gửi qua biểu mẫu. Mật khẩu được tạo cục bộ trong trình duyệt và không bao giờ được truyền đi hoặc lưu trữ.',
        },
        {
          heading: 'Cookie và công nghệ tương tự',
          body: 'Cookie cần thiết lưu giao diện, ngôn ngữ và lựa chọn đồng ý của bạn. Cookie phân tích chỉ được đặt khi có đồng ý và hiển thị mức sử dụng tổng hợp, không chứa mật khẩu. Cookie geo nội bộ ngắn hạn có thể lưu mã quốc gia để liên kết tiếp thị khu vực hoạt động đúng. Bạn có thể thay đổi hoặc rút lại đồng ý trong cài đặt cookie.',
        },
        {
          heading: 'Quảng cáo và Google AdSense',
          body: 'Khi quảng cáo được bật, Google AdSense có thể dùng cookie, bao gồm DoubleClick, để phân phối và đo lường quảng cáo. Quảng cáo cá nhân hóa chỉ được dùng sau khi bạn đồng ý hạng mục tiếp thị. Nếu từ chối, Google nhận tín hiệu đồng ý hạn chế và hiển thị quảng cáo không cá nhân hóa khi áp dụng. Bạn có thể tắt tại adssettings.google.com hoặc aboutads.info.',
        },
        {
          heading: 'Cơ sở pháp lý và quyền của bạn',
          body: 'Chúng tôi dựa trên sự đồng ý cho cookie phân tích và quảng cáo, và lợi ích hợp pháp cho bảo mật, chẩn đoán và độ tin cậy. Theo GDPR và luật tương tự, bạn có thể yêu cầu truy cập, chỉnh sửa, xóa, hạn chế, chuyển dữ liệu hoặc phản đối xử lý, và khiếu nại với cơ quan bảo vệ dữ liệu. Gửi đến support@generatepasswordto.me; chúng tôi sẽ phản hồi trong thời hạn luật định.',
        },
        {
          heading: 'Lưu trữ, bảo mật và thay đổi',
          body: 'Nhật ký bảo mật và tin nhắn hỗ trợ chỉ được lưu trong thời gian cần thiết rồi xóa. Lưu lượng dùng HTTPS, quyền truy cập hệ thống sản xuất bị hạn chế và chúng tôi không lưu mật khẩu đã tạo. Chúng tôi có thể cập nhật chính sách này; ngày trên trang cho biết phiên bản mới nhất.',
        },
      ],
    },
    terms: {
      intro:
        'Các điều khoản này mô tả cách bạn sử dụng Generate Password To Me. Khi truy cập trang hoặc dùng công cụ tạo mật khẩu, bạn đồng ý với chúng. Nếu không đồng ý, vui lòng không sử dụng dịch vụ.',
      sections: [
        {
          heading: 'Chấp nhận và phạm vi',
          body: 'Các điều khoản áp dụng cho trang web, công cụ tạo mật khẩu, hướng dẫn và công cụ liên quan. Các thông báo bổ sung trên trang, như công bố liên kết tiếp thị, là một phần của điều khoản cho trang đó.',
        },
        {
          heading: 'Dịch vụ và giới hạn',
          body: 'Dịch vụ miễn phí. Mật khẩu được tạo cục bộ trong trình duyệt. Chúng tôi không bảo đảm mật khẩu tạo ra phù hợp với một tài khoản, hệ thống hay mô hình đe dọa cụ thể; bạn chịu trách nhiệm chọn độ dài, bộ ký tự và cách lưu trữ.',
        },
        {
          heading: 'Sử dụng được chấp nhận',
          body: 'Không dùng trang để vi phạm pháp luật, tấn công hệ thống, gửi thư rác, thu thập nội dung quy mô lớn hoặc gây ảnh hưởng đến khả năng truy cập. Không cố vượt giới hạn tần suất, captcha hoặc biện pháp bảo vệ khác. Chúng tôi có thể hạn chế truy cập khi phát hiện lạm dụng.',
        },
        {
          heading: 'Sở hữu trí tuệ và bên thứ ba',
          body: 'Nội dung, thương hiệu và mã nguồn được bảo hộ bởi pháp luật sở hữu trí tuệ. Hướng dẫn có thể liên kết đến sản phẩm bên thứ ba; một số liên kết là tiếp thị và được công bố trên trang. Chúng tôi không chịu trách nhiệm về trang bên thứ ba, nội dung hoặc chính sách riêng tư của họ.',
        },
        {
          heading: 'Tuyên bố từ chối bảo đảm và trách nhiệm',
          body: 'Trang được cung cấp «nguyên trạng», không kèm bảo đảm nào. Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm về thiệt hại gián tiếp hoặc hệ quả, mất dữ liệu hoặc tổn thất do việc sử dụng hay không thể sử dụng dịch vụ. Không điều khoản nào hạn chế quyền mà pháp luật không cho phép hạn chế.',
        },
        {
          heading: 'Không phải tư vấn chuyên môn',
          body: 'Hướng dẫn mang tính giáo dục. Chúng không thay thế kiểm toán bảo mật, tư vấn pháp lý hoặc chính sách mật khẩu của tổ chức bạn. Hãy đối chiếu khuyến nghị với tiêu chuẩn và hệ thống bạn thực sự dùng.',
        },
        {
          heading: 'Thay đổi và liên hệ',
          body: 'Chúng tôi có thể cập nhật dịch vụ và các điều khoản này. Thay đổi quan trọng được phản ánh bằng ngày trên trang, và việc tiếp tục sử dụng nghĩa là chấp nhận. Thắc mắc: support@generatepasswordto.me.',
        },
      ],
    },
  },
};

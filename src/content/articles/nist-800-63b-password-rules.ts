import type { LocalizedArticleContent } from '../articles';

export const en: LocalizedArticleContent = {
  title: 'NIST 800-63B Password Rules: A Practical 2026 Summary',
  excerpt:
    'A plain-language summary of NIST SP 800-63B password guidelines. Learn what changed, why complexity rules were dropped, and how to implement compliant password policies in your organization.',
  seoTitle: 'NIST 800-63B Password Rules Explained — 2026 Practical Guide | generatepasswordto.me',
  seoDescription:
    'Plain-language guide to NIST 800-63B password requirements. Covers minimum length, banned passwords, MFA, storage hashing, and step-by-step implementation for modern organizations.',
  keywords: [
    'NIST 800-63B password rules',
    'NIST password guidelines 2026',
    'password policy NIST',
    'modern password requirements',
    'NIST digital identity',
    'password compliance',
  ],
  sections: [
    {
      heading: 'What Is NIST SP 800-63B?',
      paragraphs: [
        'NIST Special Publication 800-63B is part of the Digital Identity Guidelines issued by the National Institute of Standards and Technology, a U.S. federal agency. While NIST standards are mandatory for U.S. government agencies, they have become the de facto global benchmark for password security. Organizations from financial institutions to tech startups reference NIST 800-63B when designing their authentication systems.',
        'The most recent revision fundamentally changed how the security community thinks about passwords. It rejected decades of conventional wisdom — mandatory complexity rules, periodic password changes, and security questions — in favor of evidence-based practices that actually improve security without degrading usability.',
        'Understanding these guidelines is essential whether you are a developer building an authentication system, an IT administrator managing company policy, or an individual trying to make informed security decisions. This guide translates the technical document into actionable recommendations.',
      ],
    },
    {
      heading: 'The Key Changes: What NIST Got Right',
      paragraphs: [
        'Drop mandatory complexity rules. NIST explicitly recommends against requiring uppercase letters, digits, or special characters. Research shows that forced complexity leads to predictable patterns: users capitalize the first letter, add "1!" at the end, or use common substitutions. These patterns are well-known to attackers and provide negligible security improvement. Instead, NIST focuses on password length as the primary strength indicator.',
        'Stop requiring periodic password changes. Forcing users to change passwords every 60 or 90 days causes them to make minimal incremental changes (Password1 → Password2 → Password3) or to choose simpler passwords they can remember despite frequent changes. NIST now recommends changing passwords only when there is evidence of compromise — a breach notification, suspicious activity, or malware detection.',
        'Screen against breached password lists. When a user creates or changes a password, check it against a list of known compromised passwords. The Have I Been Pwned Passwords API provides a free, privacy-preserving way to check over 900 million breached passwords using k-anonymity. If the password appears in a breach, reject it and explain why.',
        'Allow long passwords. Systems should accept passwords up to at least 64 characters. This supports passphrases and password manager-generated credentials. Truncating passwords silently — as some legacy systems do — is a serious security flaw that NIST explicitly prohibits.',
      ],
    },
    {
      heading: 'Minimum Length Requirements',
      paragraphs: [
        'NIST sets an absolute minimum of 8 characters for user-chosen passwords and 6 characters for randomly generated PINs. However, security researchers widely recommend 12 characters as a practical minimum and 15+ as ideal. The reasoning is straightforward: modern GPU-accelerated cracking tools can exhaust all 8-character passwords from a 95-character set in hours to days, depending on the hashing algorithm.',
        'For passwords that protect high-value assets (email master accounts, cryptocurrency wallets, server root access), 16+ characters or a 5+ word passphrase is strongly recommended. At this length, even if an attacker obtains the password hash, brute-force cracking becomes computationally infeasible with current technology.',
        'Systems must not impose a maximum password length below 64 characters. Many users employ password managers that generate 20-40 character passwords, and passphrases with separators can easily reach 30+ characters. Arbitrary length limits actively harm security by preventing users from using their preferred generation methods.',
      ],
      bullets: [
        '8 characters: NIST absolute minimum for user-chosen passwords',
        '12 characters: widely recommended practical minimum',
        '15+ characters: recommended for important accounts',
        '64 characters: minimum maximum length systems must support',
        '6 digits: minimum for randomly generated PINs or tokens',
      ],
    },
    {
      heading: 'Banned Password Lists and Dictionary Checks',
      paragraphs: [
        'NIST requires that new passwords be checked against a list of commonly used, expected, or compromised passwords. This list should include: passwords from previous breach corpuses (available through Have I Been Pwned or similar services); dictionary words; repetitive or sequential characters (aaaaaa, 123456, abcdef); context-specific words (the service name, username, email address).',
        'When a password is rejected, the system should provide a clear explanation: "This password has appeared in a known data breach. Please choose a different password." Generic error messages like "Password does not meet requirements" leave users confused and frustrated.',
        'The Have I Been Pwned Passwords API makes implementation straightforward. It uses k-anonymity: your application sends only the first 5 characters of the SHA-1 hash, receives all matching hash suffixes, and checks locally. The actual password never leaves the user\'s device, and the API operator cannot determine which password was checked.',
      ],
    },
    {
      heading: 'Password Storage: Hashing Requirements',
      paragraphs: [
        'NIST requires that passwords be stored using a memory-hard, one-way key derivation function. The recommended algorithms are Argon2id (the winner of the 2015 Password Hashing Competition), bcrypt with a work factor of at least 10, or PBKDF2-HMAC-SHA256 with at least 600,000 iterations (increased from the previous 10,000 recommendation).',
        'Argon2id is the preferred choice for new implementations. It is resistant to both GPU-based attacks (due to memory hardness) and side-channel attacks. Recommended parameters: at least 19 MiB of memory, 2 iterations, and 1 degree of parallelism. These parameters should be tuned so that hashing takes approximately 0.5-1 second on your server hardware.',
        'Never use plain cryptographic hash functions (MD5, SHA-1, SHA-256) for password storage. These are designed to be fast — exactly the opposite of what you want for password hashing. An attacker with a modern GPU can compute billions of SHA-256 hashes per second, but only a few thousand Argon2id hashes.',
        'Always use a unique, random salt for each password (at least 128 bits). The salt must be stored alongside the hash. This prevents precomputed rainbow table attacks and ensures that identical passwords produce different hash values.',
      ],
    },
    {
      heading: 'Multi-Factor Authentication',
      paragraphs: [
        'NIST strongly recommends multi-factor authentication for any system handling sensitive data. The three factors are: something you know (password), something you have (phone, hardware key), and something you are (biometric). MFA should combine at least two different factors.',
        'NIST classifies authenticators into three assurance levels (AAL1, AAL2, AAL3). AAL1 requires single-factor authentication. AAL2 requires two different factors and is suitable for most business applications. AAL3 requires a hardware-based authenticator and is needed for the highest-security applications.',
        'SMS-based one-time codes are classified as a "restricted" authenticator due to known vulnerabilities (SIM swapping, SS7 interception). While still better than no MFA, organizations should prefer TOTP apps (Google Authenticator, Authy) or FIDO2 hardware keys (YubiKey, Titan) for stronger assurance.',
        'When MFA is implemented, NIST allows relaxing some password requirements (such as minimum length) because the second factor provides additional protection. However, weak passwords remain a risk even with MFA — phishing attacks can capture both the password and the OTP simultaneously.',
      ],
    },
    {
      heading: 'Implementation Checklist',
      paragraphs: [
        'For developers and IT administrators implementing NIST-compliant password policies, here is a practical checklist. Start by removing any existing complexity requirements (mandatory uppercase, digit, symbol). Set the minimum length to 12 characters and maximum to at least 64. Implement a breached password check using the Have I Been Pwned Passwords API.',
        'Update your password storage to use Argon2id (preferred), bcrypt (minimum work factor 10), or PBKDF2-HMAC-SHA256 (minimum 600,000 iterations). If migrating from a weaker hash, rehash passwords transparently when users next log in. Ensure unique 128-bit random salts per password.',
        'Remove periodic password change requirements. Instead, implement breach detection: monitor for credential leaks affecting your users and force password changes only when compromise is detected. Add rate limiting to login endpoints (lock accounts after 10-20 failed attempts within a short window).',
        'Enable and encourage MFA, prioritizing FIDO2/WebAuthn hardware keys or TOTP apps. Offer clear enrollment instructions and recovery procedures. Store MFA backup codes securely and remind users to save them.',
      ],
      bullets: [
        'Remove complexity mandates (uppercase, digit, symbol requirements)',
        'Set minimum length to 12 characters, maximum to 64+',
        'Check passwords against breached lists (HIBP API)',
        'Use Argon2id / bcrypt / PBKDF2 for password storage',
        'Eliminate periodic password rotation',
        'Implement rate limiting on login attempts',
        'Deploy MFA (FIDO2 > TOTP > SMS)',
        'Provide clear error messages when passwords are rejected',
      ],
    },
  ],
};

export const ua: LocalizedArticleContent = {
  title: 'Правила паролів NIST 800-63B: практичний гід 2026',
  excerpt:
    'Зрозумілий виклад рекомендацій NIST SP 800-63B щодо паролів. Що змінилось, чому скасовані правила складності та як впровадити відповідну політику паролів у вашій організації.',
  seoTitle: 'Правила паролів NIST 800-63B — практичний гід 2026 | generatepasswordto.me',
  seoDescription:
    'Зрозумілий гід з вимог NIST 800-63B до паролів. Мінімальна довжина, заборонені паролі, MFA, хешування, покрокове впровадження для сучасних організацій.',
  keywords: [
    'NIST 800-63B правила паролів',
    'NIST рекомендації щодо паролів 2026',
    'політика паролів NIST',
    'сучасні вимоги до паролів',
    'NIST цифрова ідентичність',
    'відповідність вимогам паролів',
  ],
  sections: [
    {
      heading: 'Що таке NIST SP 800-63B?',
      paragraphs: [
        'NIST Special Publication 800-63B є частиною Рекомендацій з цифрової ідентичності, виданих Національним інститутом стандартів і технологій — федеральним агентством США. Хоча стандарти NIST є обов\'язковими для державних установ США, вони стали фактичним глобальним еталоном безпеки паролів. Організації від фінансових установ до технологічних стартапів посилаються на NIST 800-63B при проектуванні своїх систем аутентифікації.',
        'Найновіша редакція фундаментально змінила погляд спільноти безпеки на паролі. Вона відкинула десятиліття загальноприйнятої мудрості — обов\'язкові правила складності, періодичну зміну паролів та контрольні запитання — на користь заснованих на доказах практик, які дійсно покращують безпеку без погіршення зручності використання.',
        'Розуміння цих рекомендацій є критичним незалежно від того, чи ви розробник, що будує систему аутентифікації, IT-адміністратор, що управляє корпоративною політикою, чи індивідуальний користувач, що намагається приймати обґрунтовані рішення щодо безпеки. Цей гід перетворює технічний документ на практичні рекомендації.',
      ],
    },
    {
      heading: 'Ключові зміни: що NIST зробив правильно',
      paragraphs: [
        'Скасування обов\'язкових правил складності. NIST явно рекомендує не вимагати великих літер, цифр або спеціальних символів. Дослідження показують, що примусова складність веде до передбачуваних шаблонів: користувачі пишуть першу літеру з великої, додають "1!" в кінці або використовують поширені підстановки. Ці шаблони добре відомі зловмисникам і дають мінімальне покращення безпеки. Натомість NIST зосереджується на довжині пароля як основному індикаторі надійності.',
        'Відмова від періодичної зміни паролів. Примус користувачів змінювати паролі кожні 60 або 90 днів змушує їх робити мінімальні поступові зміни (Password1 → Password2 → Password3) або обирати простіші паролі, які вони можуть запам\'ятати попри часті зміни. NIST тепер рекомендує змінювати паролі лише за наявності доказів компрометації — повідомлення про витік, підозрілої активності або виявлення шкідливого ПЗ.',
        'Перевірка за списками скомпрометованих паролів. Коли користувач створює або змінює пароль, його потрібно перевірити за списком відомих скомпрометованих паролів. API Have I Been Pwned Passwords надає безкоштовний, конфіденційний спосіб перевірки понад 900 мільйонів скомпрометованих паролів за допомогою k-анонімності. Якщо пароль з\'являється у витоку, відхиліть його та поясніть чому.',
        'Дозвіл довгих паролів. Системи повинні приймати паролі довжиною до щонайменше 64 символів. Це підтримує парольні фрази та облікові дані, згенеровані менеджерами паролів. Тихе обрізання паролів — як роблять деякі застарілі системи — є серйозною вадою безпеки, яку NIST явно забороняє.',
      ],
    },
    {
      heading: 'Вимоги до мінімальної довжини',
      paragraphs: [
        'NIST встановлює абсолютний мінімум у 8 символів для паролів, обраних користувачем, та 6 символів для випадково згенерованих PIN-кодів. Однак дослідники безпеки широко рекомендують 12 символів як практичний мінімум і 15+ як ідеал. Обґрунтування просте: сучасні інструменти злому з прискоренням на GPU можуть перебрати всі 8-символьні паролі з набору 95 символів за години або дні, залежно від алгоритму хешування.',
        'Для паролів, що захищають високоцінні активи (основні акаунти пошти, криптогаманці, root-доступ до серверів), настійно рекомендується 16+ символів або парольна фраза з 5+ слів. При такій довжині, навіть якщо зловмисник отримає хеш пароля, brute-force злом стає обчислювально неможливим з поточними технологіями.',
        'Системи не повинні встановлювати максимальну довжину пароля менше 64 символів. Багато користувачів використовують менеджери паролів, що генерують 20-40 символьні паролі, а парольні фрази з роздільниками легко досягають 30+ символів. Довільні обмеження довжини активно шкодять безпеці, не дозволяючи користувачам використовувати свої бажані методи генерації.',
      ],
      bullets: [
        '8 символів: абсолютний мінімум NIST для обраних користувачем паролів',
        '12 символів: широко рекомендований практичний мінімум',
        '15+ символів: рекомендовано для важливих акаунтів',
        '64 символи: мінімальна максимальна довжина, яку системи повинні підтримувати',
        '6 цифр: мінімум для випадково згенерованих PIN-кодів або токенів',
      ],
    },
    {
      heading: 'Списки заборонених паролів та словникові перевірки',
      paragraphs: [
        'NIST вимагає, щоб нові паролі перевірялися за списком поширених, очікуваних або скомпрометованих паролів. Цей список повинен включати: паролі з попередніх витоків (доступні через Have I Been Pwned або подібні сервіси); словникові слова; повторювані або послідовні символи (aaaaaa, 123456, abcdef); контекстно-специфічні слова (назва сервісу, ім\'я користувача, email).',
        'Коли пароль відхиляється, система повинна надати чітке пояснення: "Цей пароль з\'являвся у відомому витоку даних. Будь ласка, оберіть інший пароль." Загальні повідомлення про помилки на кшталт "Пароль не відповідає вимогам" залишають користувачів розгубленими.',
        'API Have I Been Pwned Passwords робить впровадження простим. Він використовує k-анонімність: ваш застосунок надсилає лише перші 5 символів SHA-1 хешу, отримує всі відповідні суфікси хешів та перевіряє локально. Фактичний пароль ніколи не залишає пристрій користувача, і оператор API не може визначити, який пароль було перевірено.',
      ],
    },
    {
      heading: 'Зберігання паролів: вимоги до хешування',
      paragraphs: [
        'NIST вимагає, щоб паролі зберігалися з використанням пам\'ятеємної односторонньої функції виведення ключів. Рекомендовані алгоритми: Argon2id (переможець конкурсу хешування паролів 2015 року), bcrypt з фактором роботи не менше 10 або PBKDF2-HMAC-SHA256 з не менше 600 000 ітераціями (збільшено з попередньої рекомендації 10 000).',
        'Argon2id є кращим вибором для нових впроваджень. Він стійкий як до атак на GPU (завдяки вимогливості до пам\'яті), так і до атак побічного каналу. Рекомендовані параметри: щонайменше 19 МіБ пам\'яті, 2 ітерації та 1 ступінь паралелізму. Ці параметри слід налаштувати так, щоб хешування займало приблизно 0,5-1 секунди на вашому серверному обладнанні.',
        'Ніколи не використовуйте прості криптографічні хеш-функції (MD5, SHA-1, SHA-256) для зберігання паролів. Вони розроблені для швидкості — прямо протилежне тому, що потрібно для хешування паролів. Зловмисник з сучасним GPU може обчислити мільярди хешів SHA-256 за секунду, але лише кілька тисяч хешів Argon2id.',
        'Завжди використовуйте унікальну випадкову сіль для кожного пароля (не менше 128 біт). Сіль повинна зберігатися поряд з хешем. Це запобігає атакам за допомогою попередньо обчислених веселкових таблиць та гарантує, що однакові паролі дають різні хеш-значення.',
      ],
    },
    {
      heading: 'Багатофакторна аутентифікація',
      paragraphs: [
        'NIST настійно рекомендує багатофакторну аутентифікацію для будь-якої системи, що обробляє конфіденційні дані. Три фактори: щось, що ви знаєте (пароль), щось, що ви маєте (телефон, апаратний ключ), і щось, чим ви є (біометрія). MFA повинна поєднувати щонайменше два різних фактори.',
        'NIST класифікує аутентифікатори на три рівні впевненості (AAL1, AAL2, AAL3). AAL1 вимагає однофакторну аутентифікацію. AAL2 вимагає два різних фактори і підходить для більшості бізнес-застосунків. AAL3 вимагає апаратний аутентифікатор і потрібний для застосунків найвищого рівня безпеки.',
        'SMS-коди одноразового доступу класифікуються як "обмежений" аутентифікатор через відомі вразливості (SIM-swapping, перехоплення SS7). Хоча все ще краще, ніж відсутність MFA, організації повинні віддавати перевагу TOTP-застосункам (Google Authenticator, Authy) або FIDO2 апаратним ключам (YubiKey, Titan) для вищого рівня впевненості.',
        'Коли MFA впроваджено, NIST дозволяє послабити деякі вимоги до паролів (такі як мінімальна довжина), оскільки другий фактор забезпечує додатковий захист. Однак слабкі паролі залишаються ризиком навіть з MFA — фішингові атаки можуть одночасно захопити і пароль, і одноразовий код.',
      ],
    },
    {
      heading: 'Чеклист впровадження',
      paragraphs: [
        'Для розробників та IT-адміністраторів, що впроваджують політики паролів відповідно до NIST, ось практичний чеклист. Почніть з видалення будь-яких існуючих вимог складності (обов\'язкові великі літери, цифри, символи). Встановіть мінімальну довжину 12 символів та максимальну щонайменше 64. Впровадьте перевірку скомпрометованих паролів через API Have I Been Pwned Passwords.',
        'Оновіть зберігання паролів до використання Argon2id (краще), bcrypt (мінімальний фактор роботи 10) або PBKDF2-HMAC-SHA256 (мінімум 600 000 ітерацій). Якщо мігруєте з слабшого хешу, перехешуйте паролі прозоро, коли користувачі наступного разу увійдуть. Забезпечте унікальні 128-бітні випадкові солі для кожного пароля.',
        'Видаліть вимоги періодичної зміни паролів. Натомість впровадьте виявлення витоків: моніторте витоки облікових даних, що стосуються ваших користувачів, і примушуйте зміну паролів лише при виявленні компрометації. Додайте обмеження частоти на точки входу (блокування акаунтів після 10-20 невдалих спроб у короткому вікні).',
        'Увімкніть та заохочуйте MFA, надаючи пріоритет FIDO2/WebAuthn апаратним ключам або TOTP-застосункам. Надайте чіткі інструкції з реєстрації та процедури відновлення. Зберігайте резервні коди MFA надійно та нагадуйте користувачам зберегти їх.',
      ],
      bullets: [
        'Видаліть вимоги складності (великі літери, цифри, символи)',
        'Встановіть мінімальну довжину 12 символів, максимальну 64+',
        'Перевіряйте паролі за списками витоків (HIBP API)',
        'Використовуйте Argon2id / bcrypt / PBKDF2 для зберігання паролів',
        'Усуньте періодичну ротацію паролів',
        'Впровадьте обмеження частоти спроб входу',
        'Розгорніть MFA (FIDO2 > TOTP > SMS)',
        'Надавайте чіткі повідомлення при відхиленні паролів',
      ],
    },
  ],
};

export const es: LocalizedArticleContent = {
  title: 'Reglas de contraseñas NIST 800-63B: resumen práctico 2026',
  excerpt: 'Resumen en lenguaje sencillo de las directrices NIST SP 800-63B. Qué cambió, por qué se eliminaron las reglas de complejidad y cómo implementar políticas de contraseñas conformes.',
  seoTitle: 'Reglas NIST 800-63B explicadas — Guía práctica 2026 | generatepasswordto.me',
  seoDescription: 'Guía práctica de requisitos NIST 800-63B. Longitud mínima, contraseñas prohibidas, MFA, hashing y pasos de implementación para organizaciones modernas.',
  keywords: ['reglas contraseñas NIST 800-63B', 'directrices NIST contraseñas 2026', 'política contraseñas NIST', 'requisitos modernos contraseñas', 'identidad digital NIST', 'cumplimiento contraseñas'],
  sections: [
    { heading: '¿Qué es NIST SP 800-63B?', paragraphs: ['NIST SP 800-63B es parte de las Directrices de Identidad Digital emitidas por el Instituto Nacional de Estándares y Tecnología de EE.UU. Aunque obligatorias para agencias federales, se han convertido en el referente global de seguridad de contraseñas.', 'La revisión más reciente cambió fundamentalmente cómo la comunidad de seguridad piensa sobre contraseñas. Rechazó décadas de sabiduría convencional — reglas de complejidad obligatorias, cambios periódicos y preguntas de seguridad — a favor de prácticas basadas en evidencia.', 'Comprender estas directrices es esencial ya seas desarrollador, administrador de IT o usuario individual. Esta guía traduce el documento técnico en recomendaciones accionables.'] },
    { heading: 'Los cambios clave: lo que NIST acertó', paragraphs: ['Eliminar reglas de complejidad obligatorias. NIST recomienda explícitamente no exigir mayúsculas, dígitos o caracteres especiales. La investigación muestra que la complejidad forzada lleva a patrones predecibles. En su lugar, NIST se enfoca en la longitud como indicador principal de fortaleza.', 'Dejar de exigir cambios periódicos. Forzar cambios cada 60-90 días causa cambios mínimos incrementales (Password1 → Password2). NIST ahora recomienda cambiar solo cuando hay evidencia de compromiso.', 'Verificar contra listas de contraseñas filtradas. Usar la API Have I Been Pwned Passwords con k-anonimato para verificar más de 900 millones de contraseñas filtradas.', 'Permitir contraseñas largas. Los sistemas deben aceptar hasta al menos 64 caracteres. Truncar silenciosamente es una falla grave que NIST prohíbe explícitamente.'] },
    { heading: 'Requisitos de longitud mínima', paragraphs: ['NIST establece un mínimo absoluto de 8 caracteres para contraseñas elegidas por usuarios y 6 para PINs generados aleatoriamente. Sin embargo, 12 caracteres es el mínimo práctico recomendado y 15+ el ideal.', 'Para activos de alto valor (email principal, billeteras crypto, acceso root), se recomiendan 16+ caracteres o frases de 5+ palabras.', 'Los sistemas no deben imponer un máximo menor a 64 caracteres.'], bullets: ['8 caracteres: mínimo absoluto NIST', '12 caracteres: mínimo práctico recomendado', '15+ caracteres: recomendado para cuentas importantes', '64 caracteres: máximo mínimo que los sistemas deben soportar', '6 dígitos: mínimo para PINs generados aleatoriamente'] },
    { heading: 'Listas de contraseñas prohibidas y verificaciones de diccionario', paragraphs: ['NIST requiere verificar nuevas contraseñas contra listas de contraseñas comunes, esperadas o comprometidas. La lista debe incluir: contraseñas de filtraciones anteriores, palabras del diccionario, caracteres repetitivos o secuenciales, y palabras contextuales.', 'Cuando se rechaza una contraseña, el sistema debe proporcionar una explicación clara, no mensajes genéricos.', 'La API Have I Been Pwned usa k-anonimato: tu aplicación envía solo los primeros 5 caracteres del hash SHA-1 y verifica localmente. La contraseña nunca sale del dispositivo.'] },
    { heading: 'Almacenamiento de contraseñas: requisitos de hashing', paragraphs: ['NIST requiere almacenar contraseñas usando funciones de derivación de claves con uso intensivo de memoria. Los algoritmos recomendados son Argon2id, bcrypt (factor mínimo 10) o PBKDF2-HMAC-SHA256 (mínimo 600.000 iteraciones).', 'Argon2id es la opción preferida para nuevas implementaciones. Es resistente a ataques GPU y de canal lateral.', 'Nunca uses funciones hash criptográficas simples (MD5, SHA-1, SHA-256) para almacenar contraseñas. Un atacante con GPU moderno puede calcular miles de millones de hashes SHA-256 por segundo.', 'Siempre usa un salt aleatorio único por contraseña (mínimo 128 bits).'] },
    { heading: 'Autenticación multifactor', paragraphs: ['NIST recomienda fuertemente MFA para cualquier sistema que maneje datos sensibles. Los tres factores son: algo que sabes, algo que tienes, algo que eres.', 'NIST clasifica autenticadores en tres niveles (AAL1, AAL2, AAL3). AAL2 requiere dos factores diferentes y es adecuado para la mayoría de aplicaciones empresariales.', 'Los códigos SMS se clasifican como autenticador "restringido" por vulnerabilidades conocidas (SIM swapping, interceptación SS7). Se prefieren apps TOTP (Google Authenticator, Authy) o llaves FIDO2 (YubiKey).', 'Con MFA implementado, NIST permite relajar algunos requisitos de contraseñas, aunque las contraseñas débiles siguen siendo un riesgo.'] },
    { heading: 'Checklist de implementación', paragraphs: ['Elimina requisitos de complejidad existentes. Establece longitud mínima de 12 caracteres y máxima de al menos 64. Implementa verificación de contraseñas filtradas con HIBP API.', 'Actualiza el almacenamiento a Argon2id, bcrypt o PBKDF2. Si migras desde un hash más débil, rehashea transparentemente cuando los usuarios inicien sesión.', 'Elimina cambios periódicos de contraseñas. Implementa detección de filtraciones y limita intentos de inicio de sesión.', 'Habilita MFA priorizando FIDO2/WebAuthn o apps TOTP. Ofrece instrucciones claras de registro y recuperación.'], bullets: ['Eliminar mandatos de complejidad', 'Longitud mínima 12, máxima 64+', 'Verificar contra listas filtradas (HIBP API)', 'Usar Argon2id / bcrypt / PBKDF2', 'Eliminar rotación periódica', 'Limitar intentos de inicio de sesión', 'Desplegar MFA (FIDO2 > TOTP > SMS)', 'Mensajes claros al rechazar contraseñas'] },
  ],
};

export const fr: LocalizedArticleContent = {
  title: 'Règles de mots de passe NIST 800-63B : résumé pratique 2026',
  excerpt: 'Résumé en langage clair des directives NIST SP 800-63B. Ce qui a changé, pourquoi les règles de complexité ont été abandonnées et comment implémenter des politiques conformes.',
  seoTitle: 'Règles NIST 800-63B expliquées — Guide pratique 2026 | generatepasswordto.me',
  seoDescription: 'Guide pratique des exigences NIST 800-63B. Longueur minimale, mots de passe interdits, MFA, hachage et implémentation étape par étape.',
  keywords: ['règles mots de passe NIST 800-63B', 'directives NIST mots de passe 2026', 'politique mots de passe NIST', 'exigences modernes mots de passe', 'identité numérique NIST', 'conformité mots de passe'],
  sections: [
    { heading: 'Qu\'est-ce que NIST SP 800-63B ?', paragraphs: ['Le NIST SP 800-63B fait partie des Directives d\'Identité Numérique émises par le National Institute of Standards and Technology. Bien qu\'obligatoires pour les agences fédérales américaines, ces normes sont devenues la référence mondiale.', 'La révision la plus récente a fondamentalement changé la façon dont la communauté pense les mots de passe. Elle a rejeté des décennies de sagesse conventionnelle au profit de pratiques fondées sur des preuves.', 'Comprendre ces directives est essentiel que vous soyez développeur, administrateur IT ou utilisateur individuel.'] },
    { heading: 'Les changements clés : ce que NIST a bien fait', paragraphs: ['Abandonner les règles de complexité obligatoires. NIST déconseille explicitement d\'exiger majuscules, chiffres ou caractères spéciaux. La recherche montre que la complexité forcée mène à des modèles prévisibles.', 'Arrêter d\'exiger des changements périodiques. NIST recommande de ne changer que lorsqu\'il y a preuve de compromission.', 'Vérifier contre les listes de mots de passe compromis. L\'API Have I Been Pwned utilise la k-anonymisation pour vérifier plus de 900 millions de mots de passe.', 'Autoriser les mots de passe longs. Les systèmes doivent accepter au moins 64 caractères.'] },
    { heading: 'Exigences de longueur minimale', paragraphs: ['NIST fixe un minimum absolu de 8 caractères pour les mots de passe choisis et 6 pour les PINs aléatoires. Cependant, 12 caractères est le minimum pratique recommandé et 15+ l\'idéal.', 'Pour les actifs de haute valeur, 16+ caractères ou une phrase de 5+ mots est recommandé.', 'Les systèmes ne doivent pas imposer un maximum inférieur à 64 caractères.'], bullets: ['8 caractères : minimum absolu NIST', '12 caractères : minimum pratique recommandé', '15+ caractères : recommandé pour comptes importants', '64 caractères : maximum minimum supporté', '6 chiffres : minimum pour PINs générés aléatoirement'] },
    { heading: 'Listes de mots de passe interdits et vérifications', paragraphs: ['NIST exige que les nouveaux mots de passe soient vérifiés contre une liste de mots de passe courants, attendus ou compromis.', 'Le système doit fournir une explication claire lors du rejet, pas des messages génériques.', 'L\'API HIBP Passwords utilise la k-anonymisation : votre application n\'envoie que les 5 premiers caractères du hash SHA-1 et vérifie localement.'] },
    { heading: 'Stockage des mots de passe : exigences de hachage', paragraphs: ['NIST exige le stockage avec des fonctions de dérivation de clés à forte consommation de mémoire. Algorithmes recommandés : Argon2id, bcrypt (facteur minimum 10), ou PBKDF2-HMAC-SHA256 (minimum 600 000 itérations).', 'Argon2id est le choix préféré pour les nouvelles implémentations.', 'N\'utilisez jamais de fonctions de hachage simples (MD5, SHA-1, SHA-256). Un attaquant avec GPU moderne peut calculer des milliards de hashes SHA-256 par seconde.', 'Utilisez toujours un sel aléatoire unique par mot de passe (minimum 128 bits).'] },
    { heading: 'Authentification multifacteur', paragraphs: ['NIST recommande fortement le MFA. Les trois facteurs : quelque chose que vous savez, avez, êtes.', 'NIST classe les authentificateurs en trois niveaux (AAL1, AAL2, AAL3). AAL2 est adapté à la plupart des applications professionnelles.', 'Les codes SMS sont classés comme authentificateur « restreint » en raison de vulnérabilités connues. Préférez les apps TOTP ou les clés FIDO2.', 'Avec MFA, NIST autorise l\'assouplissement de certaines exigences, mais les mots de passe faibles restent un risque.'] },
    { heading: 'Checklist d\'implémentation', paragraphs: ['Supprimez les exigences de complexité. Longueur minimale 12, maximale au moins 64. Implémentez la vérification HIBP.', 'Mettez à jour le stockage vers Argon2id, bcrypt ou PBKDF2. Rehashage transparent lors de la prochaine connexion.', 'Supprimez les changements périodiques. Implémentez la détection de fuites et la limitation de tentatives.', 'Activez le MFA en priorité FIDO2/WebAuthn ou TOTP.'], bullets: ['Supprimer les mandats de complexité', 'Longueur min 12, max 64+', 'Vérifier contre listes compromises (HIBP)', 'Utiliser Argon2id / bcrypt / PBKDF2', 'Éliminer la rotation périodique', 'Limiter les tentatives de connexion', 'Déployer MFA (FIDO2 > TOTP > SMS)', 'Messages clairs lors du rejet'] },
  ],
};

export const de: LocalizedArticleContent = {
  title: 'NIST 800-63B Passwortregeln: Praktische Zusammenfassung 2026',
  excerpt: 'Verständliche Zusammenfassung der NIST SP 800-63B Passwort-Richtlinien. Was sich geändert hat, warum Komplexitätsregeln abgeschafft wurden und wie Sie konforme Passwortrichtlinien umsetzen.',
  seoTitle: 'NIST 800-63B Passwortregeln erklärt — Praktischer Leitfaden 2026 | generatepasswordto.me',
  seoDescription: 'Verständlicher Leitfaden zu NIST 800-63B Passwortanforderungen. Mindestlänge, verbotene Passwörter, MFA, Hashing und schrittweise Implementierung.',
  keywords: ['NIST 800-63B Passwortregeln', 'NIST Passwort-Richtlinien 2026', 'Passwortrichtlinie NIST', 'moderne Passwortanforderungen', 'NIST digitale Identität', 'Passwort-Compliance'],
  sections: [
    { heading: 'Was ist NIST SP 800-63B?', paragraphs: ['NIST SP 800-63B ist Teil der Digital Identity Guidelines des National Institute of Standards and Technology. Obwohl für US-Bundesbehörden verbindlich, sind sie zum globalen Standard geworden.', 'Die jüngste Revision hat die Sichtweise der Sicherheitsgemeinschaft auf Passwörter grundlegend verändert und Jahrzehnte konventioneller Weisheit verworfen.', 'Das Verständnis dieser Richtlinien ist essenziell, ob Sie Entwickler, IT-Administrator oder Endnutzer sind.'] },
    { heading: 'Die wichtigsten Änderungen: Was NIST richtig gemacht hat', paragraphs: ['Obligatorische Komplexitätsregeln abschaffen. NIST empfiehlt ausdrücklich, keine Großbuchstaben, Ziffern oder Sonderzeichen zu verlangen. Forschung zeigt, dass erzwungene Komplexität zu vorhersehbaren Mustern führt.', 'Periodische Passwortänderungen beenden. NIST empfiehlt jetzt nur bei Nachweis einer Kompromittierung zu ändern.', 'Gegen Breach-Listen prüfen. Die HIBP Passwords API ermöglicht die Prüfung von über 900 Millionen kompromittierten Passwörtern mit k-Anonymität.', 'Lange Passwörter erlauben. Systeme müssen bis mindestens 64 Zeichen akzeptieren.'] },
    { heading: 'Mindestlängenanforderungen', paragraphs: ['NIST setzt ein absolutes Minimum von 8 Zeichen für benutzergewählte Passwörter und 6 für zufällig generierte PINs. 12 Zeichen ist das empfohlene praktische Minimum, 15+ ideal.', 'Für hochwertige Assets werden 16+ Zeichen oder eine 5+ Wort-Passphrase empfohlen.', 'Systeme dürfen kein Maximum unter 64 Zeichen festlegen.'], bullets: ['8 Zeichen: NIST absolutes Minimum', '12 Zeichen: empfohlenes praktisches Minimum', '15+ Zeichen: empfohlen für wichtige Konten', '64 Zeichen: minimale Maximallänge', '6 Ziffern: Minimum für zufällige PINs'] },
    { heading: 'Verbotene Passwortlisten und Wörterbuchprüfungen', paragraphs: ['NIST verlangt die Prüfung neuer Passwörter gegen Listen häufiger, erwarteter oder kompromittierter Passwörter.', 'Bei Ablehnung muss das System eine klare Erklärung liefern.', 'Die HIBP API nutzt k-Anonymität: Nur die ersten 5 Zeichen des SHA-1-Hashs werden gesendet.'] },
    { heading: 'Passwortspeicherung: Hashing-Anforderungen', paragraphs: ['NIST verlangt speicherintensive Schlüsselableitungsfunktionen. Empfohlen: Argon2id, bcrypt (Mindestfaktor 10), PBKDF2-HMAC-SHA256 (mindestens 600.000 Iterationen).', 'Argon2id ist die bevorzugte Wahl für neue Implementierungen.', 'Verwenden Sie nie einfache kryptographische Hashfunktionen (MD5, SHA-1, SHA-256) für die Passwortspeicherung.', 'Verwenden Sie immer ein einzigartiges, zufälliges Salt pro Passwort (mindestens 128 Bit).'] },
    { heading: 'Multi-Faktor-Authentifizierung', paragraphs: ['NIST empfiehlt MFA für jedes System mit sensiblen Daten. Die drei Faktoren: Wissen, Besitz, Biometrie.', 'NIST klassifiziert Authentifikatoren in drei Stufen (AAL1-3). AAL2 ist für die meisten Geschäftsanwendungen geeignet.', 'SMS-Codes gelten als „eingeschränkter" Authentifikator. TOTP-Apps oder FIDO2-Schlüssel werden bevorzugt.', 'Mit MFA erlaubt NIST gelockerte Passwortanforderungen, aber schwache Passwörter bleiben ein Risiko.'] },
    { heading: 'Implementierungs-Checkliste', paragraphs: ['Entfernen Sie Komplexitätsanforderungen. Mindestlänge 12, Maximum mindestens 64. HIBP-Prüfung implementieren.', 'Speicherung auf Argon2id, bcrypt oder PBKDF2 aktualisieren. Transparentes Rehashing bei nächster Anmeldung.', 'Periodische Änderungen abschaffen. Breach-Erkennung und Login-Rate-Limiting implementieren.', 'MFA aktivieren mit Priorität FIDO2/WebAuthn oder TOTP.'], bullets: ['Komplexitätsvorgaben entfernen', 'Mindestlänge 12, Maximum 64+', 'Gegen Breach-Listen prüfen (HIBP)', 'Argon2id / bcrypt / PBKDF2 verwenden', 'Periodische Rotation eliminieren', 'Login-Versuche begrenzen', 'MFA bereitstellen (FIDO2 > TOTP > SMS)', 'Klare Ablehnungsmeldungen'] },
  ],
};

export const it: LocalizedArticleContent = {
  title: 'Regole password NIST 800-63B: riepilogo pratico 2026',
  excerpt: 'Riepilogo in linguaggio semplice delle linee guida NIST SP 800-63B. Cosa è cambiato, perché le regole di complessità sono state eliminate e come implementare politiche conformi.',
  seoTitle: 'Regole NIST 800-63B spiegate — Guida pratica 2026 | generatepasswordto.me',
  seoDescription: 'Guida pratica ai requisiti NIST 800-63B. Lunghezza minima, password vietate, MFA, hashing e implementazione passo-passo per organizzazioni moderne.',
  keywords: ['regole password NIST 800-63B', 'linee guida NIST password 2026', 'politica password NIST', 'requisiti moderni password', 'identità digitale NIST', 'conformità password'],
  sections: [
    { heading: 'Cos\'è NIST SP 800-63B?', paragraphs: ['Il NIST SP 800-63B fa parte delle Digital Identity Guidelines emesse dal National Institute of Standards and Technology. Sebbene obbligatorie per le agenzie federali USA, sono diventate il riferimento globale.', 'La revisione più recente ha cambiato fondamentalmente il modo in cui la comunità pensa alle password, rifiutando decenni di saggezza convenzionale.', 'Comprendere queste linee guida è essenziale per sviluppatori, amministratori IT e utenti individuali.'] },
    { heading: 'I cambiamenti chiave: cosa NIST ha fatto bene', paragraphs: ['Eliminare le regole di complessità obbligatorie. NIST sconsiglia esplicitamente di richiedere maiuscole, cifre o caratteri speciali. La complessità forzata porta a pattern prevedibili.', 'Stop ai cambi periodici. NIST ora raccomanda il cambio solo quando c\'è evidenza di compromissione.', 'Verifica contro liste di password violate. L\'API HIBP usa la k-anonimizzazione per verificare oltre 900 milioni di password.', 'Permettere password lunghe. I sistemi devono accettare almeno 64 caratteri.'] },
    { heading: 'Requisiti di lunghezza minima', paragraphs: ['NIST stabilisce un minimo assoluto di 8 caratteri per password scelte dall\'utente e 6 per PIN generati casualmente. 12 caratteri è il minimo pratico raccomandato, 15+ l\'ideale.', 'Per asset di alto valore, si raccomandano 16+ caratteri o frasi di 5+ parole.', 'I sistemi non devono imporre un massimo inferiore a 64 caratteri.'], bullets: ['8 caratteri: minimo assoluto NIST', '12 caratteri: minimo pratico raccomandato', '15+ caratteri: raccomandato per account importanti', '64 caratteri: massimo minimo supportato', '6 cifre: minimo per PIN generati casualmente'] },
    { heading: 'Liste password vietate e controlli dizionario', paragraphs: ['NIST richiede la verifica delle nuove password contro liste di password comuni, previste o compromesse.', 'Il sistema deve fornire una spiegazione chiara al rifiuto.', 'L\'API HIBP usa k-anonimizzazione: solo i primi 5 caratteri dell\'hash SHA-1 vengono inviati.'] },
    { heading: 'Archiviazione password: requisiti di hashing', paragraphs: ['NIST richiede funzioni di derivazione chiavi ad uso intensivo di memoria. Raccomandati: Argon2id, bcrypt (fattore minimo 10), PBKDF2-HMAC-SHA256 (minimo 600.000 iterazioni).', 'Argon2id è la scelta preferita per nuove implementazioni.', 'Non usate mai funzioni hash semplici (MD5, SHA-1, SHA-256) per le password.', 'Usate sempre un salt casuale unico per password (minimo 128 bit).'] },
    { heading: 'Autenticazione multifattore', paragraphs: ['NIST raccomanda fortemente MFA per qualsiasi sistema con dati sensibili. I tre fattori: qualcosa che sai, hai, sei.', 'NIST classifica gli autenticatori in tre livelli (AAL1-3). AAL2 è adatto alla maggior parte delle applicazioni business.', 'I codici SMS sono classificati come autenticatore "limitato". Si preferiscono app TOTP o chiavi FIDO2.', 'Con MFA, NIST permette di allentare alcuni requisiti, ma le password deboli restano un rischio.'] },
    { heading: 'Checklist di implementazione', paragraphs: ['Rimuovete i requisiti di complessità. Lunghezza minima 12, massima almeno 64. Implementate verifica HIBP.', 'Aggiornate l\'archiviazione a Argon2id, bcrypt o PBKDF2.', 'Eliminate i cambi periodici. Implementate rilevamento violazioni e limitazione tentativi.', 'Abilitate MFA con priorità FIDO2/WebAuthn o TOTP.'], bullets: ['Rimuovere mandati di complessità', 'Lunghezza min 12, max 64+', 'Verificare contro liste violate (HIBP)', 'Usare Argon2id / bcrypt / PBKDF2', 'Eliminare rotazione periodica', 'Limitare tentativi di accesso', 'Implementare MFA (FIDO2 > TOTP > SMS)', 'Messaggi chiari al rifiuto'] },
  ],
};

export const pt: LocalizedArticleContent = {
  title: 'Regras de senhas NIST 800-63B: resumo prático 2026',
  excerpt: 'Resumo em linguagem simples das diretrizes NIST SP 800-63B. O que mudou, por que as regras de complexidade foram eliminadas e como implementar políticas conformes.',
  seoTitle: 'Regras NIST 800-63B explicadas — Guia prático 2026 | generatepasswordto.me',
  seoDescription: 'Guia prático dos requisitos NIST 800-63B. Comprimento mínimo, senhas proibidas, MFA, hashing e implementação passo a passo para organizações modernas.',
  keywords: ['regras senhas NIST 800-63B', 'diretrizes NIST senhas 2026', 'política senhas NIST', 'requisitos modernos senhas', 'identidade digital NIST', 'conformidade senhas'],
  sections: [
    { heading: 'O que é NIST SP 800-63B?', paragraphs: ['O NIST SP 800-63B faz parte das Diretrizes de Identidade Digital emitidas pelo National Institute of Standards and Technology. Embora obrigatórias para agências federais dos EUA, tornaram-se referência global.', 'A revisão mais recente mudou fundamentalmente como a comunidade de segurança pensa sobre senhas, rejeitando décadas de sabedoria convencional.', 'Compreender essas diretrizes é essencial para desenvolvedores, administradores de TI e usuários individuais.'] },
    { heading: 'As mudanças principais: o que o NIST acertou', paragraphs: ['Eliminar regras de complexidade obrigatórias. NIST recomenda explicitamente não exigir maiúsculas, dígitos ou caracteres especiais. A complexidade forçada leva a padrões previsíveis.', 'Parar de exigir mudanças periódicas. NIST agora recomenda mudar apenas quando há evidência de comprometimento.', 'Verificar contra listas de senhas vazadas. A API HIBP usa k-anonimato para verificar mais de 900 milhões de senhas.', 'Permitir senhas longas. Os sistemas devem aceitar até pelo menos 64 caracteres.'] },
    { heading: 'Requisitos de comprimento mínimo', paragraphs: ['NIST estabelece mínimo absoluto de 8 caracteres para senhas escolhidas e 6 para PINs aleatórios. 12 caracteres é o mínimo prático recomendado, 15+ o ideal.', 'Para ativos de alto valor, 16+ caracteres ou frases de 5+ palavras são recomendados.', 'Sistemas não devem impor máximo menor que 64 caracteres.'], bullets: ['8 caracteres: mínimo absoluto NIST', '12 caracteres: mínimo prático recomendado', '15+ caracteres: recomendado para contas importantes', '64 caracteres: máximo mínimo suportado', '6 dígitos: mínimo para PINs aleatórios'] },
    { heading: 'Listas de senhas proibidas e verificações de dicionário', paragraphs: ['NIST exige verificação de novas senhas contra listas de senhas comuns, esperadas ou comprometidas.', 'O sistema deve fornecer explicação clara na rejeição.', 'A API HIBP usa k-anonimato: apenas os primeiros 5 caracteres do hash SHA-1 são enviados.'] },
    { heading: 'Armazenamento de senhas: requisitos de hashing', paragraphs: ['NIST exige funções de derivação de chaves com uso intensivo de memória. Recomendados: Argon2id, bcrypt (fator mínimo 10), PBKDF2-HMAC-SHA256 (mínimo 600.000 iterações).', 'Argon2id é a escolha preferida para novas implementações.', 'Nunca use funções hash simples (MD5, SHA-1, SHA-256) para senhas.', 'Sempre use um salt aleatório único por senha (mínimo 128 bits).'] },
    { heading: 'Autenticação multifator', paragraphs: ['NIST recomenda fortemente MFA para qualquer sistema com dados sensíveis. Os três fatores: algo que você sabe, tem, é.', 'NIST classifica autenticadores em três níveis (AAL1-3). AAL2 é adequado para a maioria das aplicações empresariais.', 'Códigos SMS são classificados como autenticador "restrito". Apps TOTP ou chaves FIDO2 são preferidas.', 'Com MFA, NIST permite relaxar alguns requisitos, mas senhas fracas continuam sendo risco.'] },
    { heading: 'Checklist de implementação', paragraphs: ['Remova requisitos de complexidade. Comprimento mínimo 12, máximo pelo menos 64. Implemente verificação HIBP.', 'Atualize o armazenamento para Argon2id, bcrypt ou PBKDF2.', 'Elimine mudanças periódicas. Implemente detecção de vazamentos e limitação de tentativas.', 'Habilite MFA priorizando FIDO2/WebAuthn ou TOTP.'], bullets: ['Remover mandatos de complexidade', 'Comprimento min 12, max 64+', 'Verificar contra listas vazadas (HIBP)', 'Usar Argon2id / bcrypt / PBKDF2', 'Eliminar rotação periódica', 'Limitar tentativas de login', 'Implantar MFA (FIDO2 > TOTP > SMS)', 'Mensagens claras na rejeição'] },
  ],
};

export const ru: LocalizedArticleContent = {
  title: 'Правила паролей NIST 800-63B: практическое руководство 2026',
  excerpt: 'Понятное изложение рекомендаций NIST SP 800-63B по паролям. Что изменилось, почему отменены правила сложности и как внедрить соответствующие политики.',
  seoTitle: 'Правила паролей NIST 800-63B — Практическое руководство 2026 | generatepasswordto.me',
  seoDescription: 'Понятное руководство по требованиям NIST 800-63B. Минимальная длина, запрещённые пароли, MFA, хеширование и пошаговое внедрение.',
  keywords: ['правила паролей NIST 800-63B', 'рекомендации NIST пароли 2026', 'политика паролей NIST', 'современные требования к паролям', 'цифровая идентичность NIST', 'соответствие требованиям паролей'],
  sections: [
    { heading: 'Что такое NIST SP 800-63B?', paragraphs: ['NIST SP 800-63B — часть Руководства по цифровой идентичности Национального института стандартов и технологий США. Хотя стандарты обязательны для федеральных агентств, они стали глобальным эталоном.', 'Последняя редакция фундаментально изменила взгляд на пароли, отвергнув десятилетия конвенциональной мудрости в пользу практик, основанных на доказательствах.', 'Понимание этих рекомендаций критически важно для разработчиков, IT-администраторов и обычных пользователей.'] },
    { heading: 'Ключевые изменения: что NIST сделал правильно', paragraphs: ['Отмена обязательных правил сложности. NIST явно рекомендует не требовать заглавных букв, цифр или специальных символов. Принудительная сложность ведёт к предсказуемым паттернам.', 'Прекращение периодической смены паролей. NIST теперь рекомендует менять только при доказательствах компрометации.', 'Проверка по спискам утечек. API HIBP Passwords использует k-анонимизацию для проверки более 900 миллионов паролей.', 'Разрешение длинных паролей. Системы должны принимать до минимум 64 символов.'] },
    { heading: 'Требования минимальной длины', paragraphs: ['NIST устанавливает абсолютный минимум 8 символов для пользовательских паролей и 6 для случайных PIN. 12 символов — рекомендуемый практический минимум, 15+ — идеал.', 'Для высокоценных активов рекомендуется 16+ символов или фраза из 5+ слов.', 'Системы не должны устанавливать максимум менее 64 символов.'], bullets: ['8 символов: абсолютный минимум NIST', '12 символов: рекомендуемый практический минимум', '15+ символов: рекомендовано для важных аккаунтов', '64 символа: минимальная максимальная длина', '6 цифр: минимум для случайных PIN'] },
    { heading: 'Списки запрещённых паролей и словарные проверки', paragraphs: ['NIST требует проверки новых паролей по спискам распространённых, ожидаемых или скомпрометированных паролей.', 'При отклонении система должна предоставить чёткое объяснение.', 'API HIBP использует k-анонимизацию: отправляются только первые 5 символов SHA-1 хеша.'] },
    { heading: 'Хранение паролей: требования к хешированию', paragraphs: ['NIST требует использование функций выведения ключей с интенсивным использованием памяти. Рекомендованы: Argon2id, bcrypt (минимальный фактор 10), PBKDF2-HMAC-SHA256 (минимум 600 000 итераций).', 'Argon2id — предпочтительный выбор для новых реализаций.', 'Никогда не используйте простые хеш-функции (MD5, SHA-1, SHA-256) для хранения паролей.', 'Всегда используйте уникальную случайную соль для каждого пароля (минимум 128 бит).'] },
    { heading: 'Многофакторная аутентификация', paragraphs: ['NIST настоятельно рекомендует MFA для любых систем с конфиденциальными данными. Три фактора: знание, владение, биометрия.', 'NIST классифицирует аутентификаторы на три уровня (AAL1-3). AAL2 подходит для большинства бизнес-приложений.', 'SMS-коды классифицируются как «ограниченный» аутентификатор. Предпочтительны TOTP-приложения или FIDO2-ключи.', 'С MFA NIST позволяет ослабить некоторые требования, но слабые пароли остаются риском.'] },
    { heading: 'Чеклист внедрения', paragraphs: ['Удалите требования сложности. Минимальная длина 12, максимальная минимум 64. Внедрите проверку HIBP.', 'Обновите хранение до Argon2id, bcrypt или PBKDF2. Прозрачное перехеширование при следующем входе.', 'Уберите периодическую смену. Внедрите обнаружение утечек и ограничение попыток входа.', 'Включите MFA с приоритетом FIDO2/WebAuthn или TOTP.'], bullets: ['Убрать требования сложности', 'Длина мин 12, макс 64+', 'Проверять по спискам утечек (HIBP)', 'Использовать Argon2id / bcrypt / PBKDF2', 'Устранить периодическую ротацию', 'Ограничить попытки входа', 'Развернуть MFA (FIDO2 > TOTP > SMS)', 'Чёткие сообщения при отклонении'] },
  ],
};

export const zh: LocalizedArticleContent = {
  title: 'NIST 800-63B密码规则：2026年实用总结',
  excerpt: '通俗易懂的NIST SP 800-63B密码指南总结。了解哪些变化，为什么取消复杂性规则，以及如何实施合规的密码策略。',
  seoTitle: 'NIST 800-63B密码规则详解 — 2026年实用指南 | generatepasswordto.me',
  seoDescription: 'NIST 800-63B密码要求实用指南。涵盖最小长度、禁用密码、MFA、哈希和现代组织的逐步实施。',
  keywords: ['NIST 800-63B密码规则', 'NIST密码指南2026', '密码策略NIST', '现代密码要求', 'NIST数字身份', '密码合规'],
  sections: [
    { heading: '什么是NIST SP 800-63B？', paragraphs: ['NIST SP 800-63B是美国国家标准与技术研究院发布的数字身份指南的一部分。虽然对美国联邦机构是强制性的，但已成为全球密码安全基准。', '最新修订从根本上改变了安全社区对密码的看法，否定了数十年的传统智慧，转向基于证据的实践。', '无论您是开发者、IT管理员还是普通用户，理解这些指南都至关重要。'] },
    { heading: '关键变化：NIST做对了什么', paragraphs: ['取消强制复杂性规则。NIST明确建议不要求大写字母、数字或特殊字符。研究表明强制复杂性导致可预测的模式。', '停止要求定期更换。NIST现在建议仅在有证据表明密码泄露时才更换。', '对照泄露列表检查。HIBP Passwords API使用k-匿名检查超过9亿个泄露密码。', '允许长密码。系统必须接受至少64个字符的密码。'] },
    { heading: '最小长度要求', paragraphs: ['NIST设定用户选择密码的绝对最低限度为8个字符，随机PIN为6个。12个字符是推荐的实际最低限度，15+为理想值。', '对于高价值资产，推荐16+字符或5+词的密码短语。', '系统不应设置低于64个字符的最大值。'], bullets: ['8字符：NIST绝对最低值', '12字符：推荐实际最低值', '15+字符：重要账户推荐', '64字符：系统必须支持的最低上限', '6位数：随机PIN最低值'] },
    { heading: '禁用密码列表和字典检查', paragraphs: ['NIST要求将新密码与常见、预期或已泄露密码列表进行核对。', '拒绝时系统必须提供清晰的解释，而非通用错误消息。', 'HIBP API使用k-匿名：仅发送SHA-1哈希的前5个字符，本地验证。'] },
    { heading: '密码存储：哈希要求', paragraphs: ['NIST要求使用内存密集型密钥派生函数。推荐：Argon2id、bcrypt（最低因子10）、PBKDF2-HMAC-SHA256（最少600,000次迭代）。', 'Argon2id是新实现的首选。', '永远不要使用简单的加密哈希函数（MD5、SHA-1、SHA-256）存储密码。', '始终为每个密码使用唯一的随机盐（至少128位）。'] },
    { heading: '多因素认证', paragraphs: ['NIST强烈建议对任何处理敏感数据的系统使用MFA。三个因素：知识、持有、生物特征。', 'NIST将认证器分为三个级别（AAL1-3）。AAL2适合大多数商业应用。', 'SMS验证码被列为"受限"认证器。优先选择TOTP应用或FIDO2密钥。', 'MFA实施后NIST允许放宽部分要求，但弱密码仍是风险。'] },
    { heading: '实施清单', paragraphs: ['移除复杂性要求。最小长度12，最大至少64。实施HIBP检查。', '更新存储到Argon2id、bcrypt或PBKDF2。下次登录时透明地重新哈希。', '取消定期更换。实施泄露检测和登录尝试限制。', '启用MFA，优先FIDO2/WebAuthn或TOTP。'], bullets: ['移除复杂性要求', '长度最小12，最大64+', '对照泄露列表检查（HIBP）', '使用Argon2id / bcrypt / PBKDF2', '消除定期轮换', '限制登录尝试', '部署MFA（FIDO2 > TOTP > SMS）', '拒绝时提供清晰消息'] },
  ],
};

export const ja: LocalizedArticleContent = {
  title: 'NIST 800-63Bパスワードルール：2026年実践サマリー',
  excerpt: 'NIST SP 800-63Bパスワードガイドラインの平易な要約。何が変わったか、なぜ複雑性ルールが廃止されたか、準拠ポリシーの実装方法を解説。',
  seoTitle: 'NIST 800-63Bパスワードルール解説 — 2026年実践ガイド | generatepasswordto.me',
  seoDescription: 'NIST 800-63Bパスワード要件の実践ガイド。最小長、禁止パスワード、MFA、ハッシュ、現代組織向けステップバイステップ実装。',
  keywords: ['NIST 800-63Bパスワードルール', 'NISTパスワードガイドライン2026', 'パスワードポリシーNIST', '最新パスワード要件', 'NISTデジタルアイデンティティ', 'パスワードコンプライアンス'],
  sections: [
    { heading: 'NIST SP 800-63Bとは？', paragraphs: ['NIST SP 800-63Bは米国国立標準技術研究所が発行するデジタルアイデンティティガイドラインの一部です。米国連邦機関には義務ですが、グローバル標準となっています。', '最新の改訂はセキュリティコミュニティのパスワードに対する考え方を根本的に変え、数十年の従来の知恵を否定しました。', '開発者、IT管理者、個人ユーザーのいずれにとっても、これらのガイドラインの理解は不可欠です。'] },
    { heading: '主要な変更点：NISTが正しかったこと', paragraphs: ['強制的な複雑性ルールの廃止。NISTは大文字、数字、特殊文字の要求を明示的に推奨しません。強制複雑性は予測可能なパターンにつながります。', '定期的なパスワード変更の停止。NISTは侵害の証拠がある場合のみ変更を推奨します。', '侵害リストとの照合。HIBP APIはk-匿名性を使用して9億以上の漏洩パスワードを検証。', '長いパスワードの許可。システムは少なくとも64文字まで受け入れるべきです。'] },
    { heading: '最小長要件', paragraphs: ['NISTはユーザー選択パスワードの絶対最小を8文字、ランダムPINを6文字に設定。12文字が推奨実践的最小値、15+が理想。', '高価値資産には16+文字または5+語のパスフレーズを推奨。', 'システムは64文字未満の最大値を設定すべきではありません。'], bullets: ['8文字：NIST絶対最小値', '12文字：推奨実践的最小値', '15+文字：重要アカウント推奨', '64文字：システム必須の最低上限', '6桁：ランダムPIN最小値'] },
    { heading: '禁止パスワードリストと辞書チェック', paragraphs: ['NISTは新しいパスワードを一般的、予想される、または侵害されたパスワードのリストと照合することを要求します。', '拒否時にはシステムは明確な説明を提供すべきです。', 'HIBP APIはk-匿名性を使用：SHA-1ハッシュの最初の5文字のみを送信します。'] },
    { heading: 'パスワード保存：ハッシュ要件', paragraphs: ['NISTはメモリ集約型の鍵導出関数を要求。推奨：Argon2id、bcrypt（最小ファクター10）、PBKDF2-HMAC-SHA256（最小600,000回）。', 'Argon2idは新規実装の推奨選択です。', '単純な暗号ハッシュ関数（MD5、SHA-1、SHA-256）をパスワード保存に使用しないでください。', '各パスワードに一意のランダムソルトを使用（最小128ビット）。'] },
    { heading: '多要素認証', paragraphs: ['NISTは機密データを扱うすべてのシステムにMFAを強く推奨。3つの要素：知識、所持、生体。', 'NISTは認証器を3レベルに分類（AAL1-3）。AAL2はほとんどのビジネスアプリに適切。', 'SMSコードは「制限付き」認証器。TOTPアプリまたはFIDO2キーが推奨。', 'MFA実装でNISTは一部要件の緩和を許可しますが、弱いパスワードはリスクのまま。'] },
    { heading: '実装チェックリスト', paragraphs: ['複雑性要件を削除。最小長12、最大少なくとも64。HIBP検証を実装。', 'ストレージをArgon2id、bcrypt、またはPBKDF2に更新。次回ログイン時に透過的に再ハッシュ。', '定期変更を廃止。侵害検出とログイン試行制限を実装。', 'MFAを有効化、FIDO2/WebAuthnまたはTOTPを優先。'], bullets: ['複雑性要件を削除', '最小長12、最大64+', '侵害リストと照合（HIBP）', 'Argon2id / bcrypt / PBKDF2を使用', '定期ローテーションを廃止', 'ログイン試行を制限', 'MFA導入（FIDO2 > TOTP > SMS）', '拒否時に明確なメッセージ'] },
  ],
};

export const pl: LocalizedArticleContent = {
  title: 'Zasady haseł NIST 800-63B: praktyczne podsumowanie 2026',
  excerpt: 'Zrozumiałe podsumowanie wytycznych NIST SP 800-63B dotyczących haseł. Co się zmieniło, dlaczego zniesiono zasady złożoności i jak wdrożyć zgodne polityki.',
  seoTitle: 'Zasady NIST 800-63B wyjaśnione — Praktyczny przewodnik 2026 | generatepasswordto.me',
  seoDescription: 'Praktyczny przewodnik po wymaganiach NIST 800-63B. Minimalna długość, zakazane hasła, MFA, hashowanie i wdrożenie krok po kroku.',
  keywords: ['zasady haseł NIST 800-63B', 'wytyczne NIST hasła 2026', 'polityka haseł NIST', 'nowoczesne wymagania haseł', 'tożsamość cyfrowa NIST', 'zgodność haseł'],
  sections: [
    { heading: 'Czym jest NIST SP 800-63B?', paragraphs: ['NIST SP 800-63B jest częścią Wytycznych Tożsamości Cyfrowej wydanych przez National Institute of Standards and Technology. Choć obowiązkowe dla agencji federalnych USA, stały się globalnym standardem.', 'Najnowsza rewizja fundamentalnie zmieniła podejście do haseł, odrzucając dekady konwencjonalnej mądrości na rzecz praktyk opartych na dowodach.', 'Zrozumienie tych wytycznych jest kluczowe dla programistów, administratorów IT i użytkowników indywidualnych.'] },
    { heading: 'Kluczowe zmiany: co NIST zrobił dobrze', paragraphs: ['Zniesienie obowiązkowych zasad złożoności. NIST wyraźnie odradza wymaganie wielkich liter, cyfr lub znaków specjalnych. Wymuszona złożoność prowadzi do przewidywalnych wzorców.', 'Koniec z okresowymi zmianami haseł. NIST teraz zaleca zmianę tylko gdy jest dowód na kompromitację.', 'Sprawdzanie wobec list wycieków. API HIBP używa k-anonimizacji do weryfikacji ponad 900 milionów haseł.', 'Pozwolenie na długie hasła. Systemy muszą akceptować co najmniej 64 znaki.'] },
    { heading: 'Wymagania minimalnej długości', paragraphs: ['NIST ustala absolutne minimum 8 znaków dla haseł użytkownika i 6 dla losowych PIN-ów. 12 znaków to zalecane minimum praktyczne, 15+ ideał.', 'Dla aktywów o wysokiej wartości zalecane jest 16+ znaków lub fraza 5+ słów.', 'Systemy nie powinny narzucać maksimum poniżej 64 znaków.'], bullets: ['8 znaków: absolutne minimum NIST', '12 znaków: zalecane minimum praktyczne', '15+ znaków: zalecane dla ważnych kont', '64 znaki: minimalne maksimum obsługiwane', '6 cyfr: minimum dla losowych PIN-ów'] },
    { heading: 'Listy zakazanych haseł i sprawdzanie słownikowe', paragraphs: ['NIST wymaga sprawdzania nowych haseł wobec list popularnych, oczekiwanych lub skompromitowanych haseł.', 'System powinien podać jasne wyjaśnienie przy odrzuceniu.', 'API HIBP używa k-anonimizacji: wysyłane jest tylko pierwszych 5 znaków hasha SHA-1.'] },
    { heading: 'Przechowywanie haseł: wymagania hashowania', paragraphs: ['NIST wymaga funkcji wyprowadzania kluczy intensywnie korzystających z pamięci. Zalecane: Argon2id, bcrypt (minimalny czynnik 10), PBKDF2-HMAC-SHA256 (minimum 600 000 iteracji).', 'Argon2id to preferowany wybór dla nowych implementacji.', 'Nigdy nie używaj prostych funkcji kryptograficznych (MD5, SHA-1, SHA-256) do haseł.', 'Zawsze używaj unikalnej losowej soli dla każdego hasła (minimum 128 bitów).'] },
    { heading: 'Uwierzytelnianie wieloskładnikowe', paragraphs: ['NIST mocno zaleca MFA dla każdego systemu z wrażliwymi danymi. Trzy czynniki: wiedza, posiadanie, biometria.', 'NIST klasyfikuje authenticatory na trzy poziomy (AAL1-3). AAL2 jest odpowiedni dla większości aplikacji biznesowych.', 'Kody SMS to „ograniczony" authenticator. Preferowane są aplikacje TOTP lub klucze FIDO2.', 'Przy MFA NIST pozwala na złagodzenie niektórych wymagań, ale słabe hasła pozostają ryzykiem.'] },
    { heading: 'Lista kontrolna wdrożenia', paragraphs: ['Usuń wymagania złożoności. Minimalna długość 12, maksymalna co najmniej 64. Wdróż sprawdzanie HIBP.', 'Zaktualizuj przechowywanie do Argon2id, bcrypt lub PBKDF2. Transparentne rehashowanie przy następnym logowaniu.', 'Usuń okresowe zmiany. Wdróż wykrywanie wycieków i ograniczanie prób logowania.', 'Włącz MFA z priorytetem FIDO2/WebAuthn lub TOTP.'], bullets: ['Usunąć wymagania złożoności', 'Długość min 12, max 64+', 'Sprawdzać wobec list wycieków (HIBP)', 'Używać Argon2id / bcrypt / PBKDF2', 'Wyeliminować okresową rotację', 'Ograniczyć próby logowania', 'Wdrożyć MFA (FIDO2 > TOTP > SMS)', 'Jasne komunikaty przy odrzuceniu'] },
  ],
};

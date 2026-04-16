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

import type { LocalizedArticleContent } from '../articles';

export const en: LocalizedArticleContent = {
  title: 'How to Create Strong Passwords in 2026: A Complete Guide',
  excerpt:
    'Learn how to create truly secure passwords using modern techniques recommended by NIST, OWASP, and cybersecurity experts. This guide covers entropy, password managers, passphrases, and common pitfalls to avoid.',
  seoTitle: 'How to Create Strong Passwords in 2026 — NIST Guidelines | generatepasswordto.me',
  seoDescription:
    'A practical 2026 guide to creating strong passwords. Covers NIST 800-63B guidelines, entropy calculations, passphrases, password managers, and step-by-step instructions for maximum account security.',
  keywords: [
    'how to create strong password',
    'strong password guide 2026',
    'NIST password guidelines',
    'secure password tips',
    'password entropy',
    'password best practices',
  ],
  sections: [
    {
      heading: 'Why Password Strength Still Matters in 2026',
      paragraphs: [
        'Despite the rise of biometrics and passkeys, passwords remain the primary authentication method for the vast majority of online accounts. According to the 2025 Verizon Data Breach Investigations Report, over 80% of hacking-related breaches still involve weak or stolen credentials. This means your password is often the only barrier between your private data and an attacker.',
        'Modern attackers use GPU-accelerated brute-force tools that can test billions of password combinations per second. A simple 8-character lowercase password can be cracked in under 5 minutes. However, a well-constructed 16-character password with mixed character types would take centuries to break with current technology.',
        'The good news is that creating a strong password does not require memorizing random strings of characters. Modern approaches like passphrases and password managers make security both accessible and practical. This guide walks you through every technique recommended by leading security standards.',
      ],
    },
    {
      heading: 'Understanding Password Entropy',
      paragraphs: [
        'Entropy is a mathematical measure of how unpredictable a password is. It is measured in bits: a password with 40 bits of entropy has 2^40 (about 1 trillion) possible combinations. Security experts generally recommend a minimum of 60 bits for standard accounts and 80+ bits for high-value targets like banking or email.',
        'The formula is straightforward: entropy = log2(pool_size^length). A 12-character password using uppercase letters (26), lowercase letters (26), digits (10), and symbols (33) draws from a pool of 95 characters. That gives approximately 79 bits of entropy — solid protection against offline attacks.',
        'However, entropy assumes the password is truly random. A password like "Password123!" technically uses all four character classes but has near-zero effective entropy because it follows a predictable pattern. Attackers maintain dictionaries of millions of such common patterns and test them first.',
      ],
      bullets: [
        '40 bits of entropy: minimum for low-risk accounts (forums, newsletters)',
        '60 bits: standard for most personal accounts (social media, shopping)',
        '80 bits: recommended for email, banking, and cloud storage',
        '100+ bits: ideal for cryptocurrency wallets and master passwords',
      ],
    },
    {
      heading: 'NIST 800-63B: What the Experts Actually Recommend',
      paragraphs: [
        'The National Institute of Standards and Technology (NIST) updated its Digital Identity Guidelines (SP 800-63B) to reflect modern research on password security. These guidelines have become the gold standard for organizations worldwide.',
        'Key NIST recommendations include: allow passwords up to 64 characters; require a minimum of 8 characters (12+ recommended); do NOT enforce arbitrary complexity rules (like requiring uppercase + number + symbol); do NOT require periodic password changes unless there is evidence of compromise; screen passwords against known breached password lists; and support paste functionality in password fields.',
        'The reasoning behind dropping complexity rules is compelling: forced complexity leads users to create predictable patterns like "Spring2026!" or "P@ssw0rd" — passwords that satisfy rules but are trivially cracked. Instead, NIST emphasizes length and unpredictability as the primary drivers of security.',
        'NIST also recommends that organizations implement rate limiting on login attempts, use multi-factor authentication (MFA), and hash stored passwords with modern algorithms like Argon2id or bcrypt with appropriate work factors.',
      ],
    },
    {
      heading: 'The Passphrase Approach: Memorable and Secure',
      paragraphs: [
        'A passphrase is a sequence of random words strung together, such as "correct-horse-battery-staple" (the famous XKCD example). When generated properly — using a word list of at least 7,776 entries (like the EFF Diceware list) — each word adds approximately 12.9 bits of entropy.',
        'A four-word passphrase provides roughly 52 bits of entropy, while a six-word passphrase reaches approximately 78 bits — comparable to a random 12-character password but far easier to type and remember. For critical accounts, use five or six words.',
        'Important rules for passphrases: use a truly random word selection method (dice or a cryptographic random generator — never pick words yourself); avoid famous quotes, song lyrics, or book titles; add a separator character between words (hyphens, dots, or spaces); and consider capitalizing one random word or inserting a digit for additional entropy without sacrificing memorability.',
      ],
      bullets: [
        '4 words: ~52 bits — suitable for medium-risk accounts',
        '5 words: ~65 bits — good for most personal accounts',
        '6 words: ~78 bits — strong for email and financial accounts',
        '7 words: ~90 bits — excellent for master passwords and crypto wallets',
      ],
    },
    {
      heading: 'Step-by-Step: Creating Your Password',
      paragraphs: [
        'For everyday accounts, use a password manager to generate and store unique random passwords of 16 or more characters. Your password manager handles the complexity, so each password can be maximally random without any memorization burden.',
        'For your master password (the one password you must memorize), use the passphrase method: roll dice or use a cryptographic generator to select 5-7 random words from a large word list. Write it down and store the paper in a secure physical location until you have it memorized, then destroy the paper.',
        'For accounts where you cannot use a password manager (such as your computer login or phone PIN), create a passphrase that is easy to type quickly. Practice typing it several times to build muscle memory. A passphrase like "maple-thunder-giraffe-socket-22" is both strong and typeable.',
        'Never reuse passwords across accounts. If one service is breached, attackers will automatically try those credentials on hundreds of other sites — a technique called credential stuffing. A unique password for each account limits the blast radius of any single breach.',
      ],
    },
    {
      heading: 'Common Password Mistakes to Avoid',
      paragraphs: [
        'Using personal information is the most common and dangerous mistake. Names of family members, pets, birthdays, anniversaries, phone numbers, and addresses are all easily discoverable through social media. Attackers build custom dictionaries from your public data before attempting any brute-force attack.',
        'Keyboard patterns like "qwerty", "123456", "zxcvbn", or "1qaz2wsx" appear secure because they look random, but they are among the first patterns tested by cracking tools. Similarly, simple substitutions (@ for a, 3 for e, 0 for o) add virtually no security because every cracking tool includes these leet-speak transformations.',
        'Incrementing passwords when forced to change them (Password1 → Password2 → Password3) provides no real security improvement. If an attacker obtains any version, they can trivially guess the others. This is precisely why NIST now recommends against mandatory periodic password changes.',
      ],
      bullets: [
        'Never use dictionary words without modification',
        'Avoid personal information (names, dates, addresses)',
        'Do not use keyboard patterns or sequences',
        'Never reuse passwords across multiple accounts',
        'Avoid simple character substitutions (@ for a, 3 for e)',
        'Do not increment passwords (Password1, Password2, etc.)',
      ],
    },
    {
      heading: 'Password Managers: Your Best Security Investment',
      paragraphs: [
        'A password manager generates, stores, and auto-fills unique random passwords for every account. Leading options include 1Password, Bitwarden (open source), and KeePass (offline). Each uses AES-256 encryption to protect your vault, with your master password as the decryption key.',
        'The primary advantage is eliminating password reuse entirely. With a password manager, every account gets a unique 20+ character random password. You only need to memorize one strong master password. Most managers also alert you when passwords appear in known breach databases.',
        'Choose a manager that supports your devices and browsers, offers emergency access for trusted contacts, and has undergone independent security audits. Bitwarden is an excellent free option with open-source code that anyone can audit. For teams, 1Password Business or Bitwarden Organizations provide shared vault capabilities.',
      ],
    },
    {
      heading: 'Beyond Passwords: Multi-Factor Authentication',
      paragraphs: [
        'Even the strongest password can be compromised through phishing, keyloggers, or server-side breaches. Multi-factor authentication (MFA) adds a second verification step — typically a time-based one-time password (TOTP) from an app like Google Authenticator or Authy, or a hardware security key like YubiKey.',
        'Enable MFA on every account that supports it, prioritizing email (your recovery hub), banking, cloud storage, and social media. Hardware security keys (FIDO2/WebAuthn) provide the strongest protection against phishing because they verify the actual website domain before authenticating.',
        'Store your MFA backup codes in your password manager or in a separate secure location. Losing access to your MFA device without backup codes can permanently lock you out of your accounts.',
      ],
    },
  ],
};

export const ua: LocalizedArticleContent = {
  title: 'Як створити надійний пароль у 2026 році: повний гід',
  excerpt:
    'Дізнайтеся, як створювати по-справжньому безпечні паролі за допомогою сучасних методів, рекомендованих NIST, OWASP та експертами з кібербезпеки. Цей гід охоплює ентропію, менеджери паролів, парольні фрази та поширені помилки.',
  seoTitle: 'Як створити надійний пароль у 2026 — гайд за стандартами NIST | generatepasswordto.me',
  seoDescription:
    'Практичний гід 2026 року зі створення надійних паролів. Рекомендації NIST 800-63B, розрахунок ентропії, парольні фрази, менеджери паролів та покрокові інструкції для максимальної безпеки акаунтів.',
  keywords: [
    'як створити надійний пароль',
    'гід зі створення паролів 2026',
    'рекомендації NIST щодо паролів',
    'безпечний пароль поради',
    'ентропія пароля',
    'найкращі практики паролів',
  ],
  sections: [
    {
      heading: 'Чому надійність пароля все ще важлива у 2026 році',
      paragraphs: [
        'Попри розвиток біометрії та passkeys, паролі залишаються основним методом аутентифікації для переважної більшості онлайн-акаунтів. За даними звіту Verizon Data Breach Investigations 2025, понад 80% зламів пов\'язані зі слабкими або вкраденими обліковими даними. Це означає, що ваш пароль часто є єдиним бар\'єром між вашими приватними даними та зловмисником.',
        'Сучасні хакери використовують інструменти brute-force з прискоренням на GPU, що перевіряють мільярди комбінацій паролів за секунду. Простий 8-символьний пароль з малих літер можна зламати менш ніж за 5 хвилин. Однак правильно сконструйований 16-символьний пароль зі змішаними типами символів потребуватиме століть для злому за допомогою сучасних технологій.',
        'Хороша новина полягає в тому, що створення надійного пароля не вимагає запам\'ятовування випадкових рядків символів. Сучасні підходи, такі як парольні фрази та менеджери паролів, роблять безпеку одночасно доступною та практичною. Цей гід проведе вас через кожну техніку, рекомендовану провідними стандартами безпеки.',
      ],
    },
    {
      heading: 'Розуміння ентропії пароля',
      paragraphs: [
        'Ентропія — це математична міра непередбачуваності пароля. Вона вимірюється в бітах: пароль з 40 бітами ентропії має 2^40 (приблизно 1 трильйон) можливих комбінацій. Експерти з безпеки зазвичай рекомендують мінімум 60 бітів для стандартних акаунтів і 80+ бітів для високоцінних цілей, таких як банкінг або електронна пошта.',
        'Формула проста: ентропія = log2(розмір_набору^довжина). 12-символьний пароль з використанням великих літер (26), малих літер (26), цифр (10) і символів (33) має набір з 95 символів. Це дає приблизно 79 бітів ентропії — надійний захист від офлайн-атак.',
        'Однак ентропія передбачає, що пароль є дійсно випадковим. Пароль на кшталт "Password123!" технічно використовує всі чотири класи символів, але має майже нульову ефективну ентропію, оскільки слідує передбачуваному шаблону. Зловмисники підтримують словники з мільйонів таких поширених шаблонів і перевіряють їх першими.',
      ],
      bullets: [
        '40 бітів ентропії: мінімум для акаунтів з низьким ризиком (форуми, розсилки)',
        '60 бітів: стандарт для більшості персональних акаунтів (соцмережі, магазини)',
        '80 бітів: рекомендовано для пошти, банкінгу та хмарного сховища',
        '100+ бітів: ідеально для криптогаманців та мастер-паролів',
      ],
    },
    {
      heading: 'NIST 800-63B: що насправді рекомендують експерти',
      paragraphs: [
        'Національний інститут стандартів і технологій (NIST) оновив свої Рекомендації з цифрової ідентичності (SP 800-63B), щоб відобразити сучасні дослідження безпеки паролів. Ці рекомендації стали золотим стандартом для організацій у всьому світі.',
        'Ключові рекомендації NIST: дозволяти паролі довжиною до 64 символів; вимагати мінімум 8 символів (рекомендовано 12+); НЕ нав\'язувати довільні правила складності (на кшталт обов\'язкових великих літер + цифр + символів); НЕ вимагати періодичної зміни паролів, якщо немає доказів компрометації; перевіряти паролі за списками відомих витоків; підтримувати функцію вставки у полях паролів.',
        'Обґрунтування відмови від правил складності переконливе: примусова складність змушує користувачів створювати передбачувані шаблони на кшталт "Spring2026!" або "P@ssw0rd" — паролі, що задовольняють правила, але тривіально зламуються. Натомість NIST наголошує на довжині та непередбачуваності як основних факторах безпеки.',
        'NIST також рекомендує організаціям впроваджувати обмеження частоти спроб входу, використовувати багатофакторну аутентифікацію (MFA) та хешувати збережені паролі сучасними алгоритмами, такими як Argon2id або bcrypt з відповідними параметрами складності.',
      ],
    },
    {
      heading: 'Парольні фрази: запам\'ятовувані та безпечні',
      paragraphs: [
        'Парольна фраза — це послідовність випадкових слів, з\'єднаних разом, наприклад "correct-horse-battery-staple" (знаменитий приклад XKCD). При правильній генерації — з використанням списку мінімум 7 776 слів (як EFF Diceware) — кожне слово додає приблизно 12,9 біта ентропії.',
        'Фраза з чотирьох слів забезпечує приблизно 52 біти ентропії, тоді як фраза з шести слів досягає приблизно 78 бітів — порівнянно з випадковим 12-символьним паролем, але набагато легше для введення та запам\'ятовування. Для критично важливих акаунтів використовуйте п\'ять або шість слів.',
        'Важливі правила для парольних фраз: використовуйте дійсно випадковий метод вибору слів (кубики або криптографічний генератор випадкових чисел — ніколи не обирайте слова самостійно); уникайте відомих цитат, текстів пісень або назв книг; додавайте символ-роздільник між словами (дефіси, крапки або пробіли); розгляньте можливість написання одного випадкового слова з великої літери або вставки цифри для додаткової ентропії без втрати запам\'ятовуваності.',
      ],
      bullets: [
        '4 слова: ~52 біти — підходить для акаунтів середнього ризику',
        '5 слів: ~65 бітів — добре для більшості персональних акаунтів',
        '6 слів: ~78 бітів — надійно для пошти та фінансових акаунтів',
        '7 слів: ~90 бітів — відмінно для мастер-паролів та криптогаманців',
      ],
    },
    {
      heading: 'Покрокова інструкція: створення вашого пароля',
      paragraphs: [
        'Для повсякденних акаунтів використовуйте менеджер паролів для генерації та зберігання унікальних випадкових паролів довжиною від 16 символів. Менеджер паролів бере на себе всю складність, тому кожен пароль може бути максимально випадковим без необхідності запам\'ятовування.',
        'Для мастер-пароля (єдиного пароля, який вам потрібно запам\'ятати) використовуйте метод парольної фрази: киньте кубики або використовуйте криптографічний генератор для вибору 5-7 випадкових слів з великого списку слів. Запишіть його та зберігайте папір у безпечному фізичному місці, поки не запам\'ятаєте, потім знищте папір.',
        'Для акаунтів, де ви не можете використовувати менеджер паролів (наприклад, вхід у комп\'ютер або PIN телефону), створіть парольну фразу, яку легко набирати швидко. Потренуйтеся набирати її кілька разів, щоб розвинути м\'язову пам\'ять. Фраза на кшталт "клен-грім-жирафа-розетка-22" одночасно надійна та зручна для набору.',
        'Ніколи не використовуйте паролі повторно для різних акаунтів. Якщо один сервіс зазнає витоку, зловмисники автоматично спробують ці облікові дані на сотнях інших сайтів — техніка, яка називається credential stuffing. Унікальний пароль для кожного акаунту обмежує наслідки будь-якого окремого витоку.',
      ],
    },
    {
      heading: 'Поширені помилки при створенні паролів',
      paragraphs: [
        'Використання особистої інформації — найпоширеніша та найнебезпечніша помилка. Імена членів сім\'ї, домашніх тварин, дати народження, річниці, номери телефонів та адреси — все це легко знайти через соціальні мережі. Зловмисники створюють персоналізовані словники з ваших публічних даних перед будь-якою спробою brute-force атаки.',
        'Клавіатурні шаблони на кшталт "qwerty", "123456", "zxcvbn" або "1qaz2wsx" виглядають безпечними, бо здаються випадковими, але вони серед перших шаблонів, які перевіряють інструменти злому. Так само прості підстановки (@ замість a, 3 замість e, 0 замість o) практично не додають безпеки, бо кожен інструмент злому включає ці leet-speak трансформації.',
        'Інкрементування паролів при примусовій зміні (Password1 → Password2 → Password3) не дає реального покращення безпеки. Якщо зловмисник отримає будь-яку версію, він тривіально вгадає інші. Саме тому NIST тепер рекомендує відмовитися від обов\'язкової періодичної зміни паролів.',
      ],
      bullets: [
        'Ніколи не використовуйте словникові слова без модифікації',
        'Уникайте особистої інформації (імена, дати, адреси)',
        'Не використовуйте клавіатурні шаблони або послідовності',
        'Ніколи не використовуйте паролі повторно для різних акаунтів',
        'Уникайте простих підстановок символів (@ замість a, 3 замість e)',
        'Не інкрементуйте паролі (Password1, Password2 і т.д.)',
      ],
    },
    {
      heading: 'Менеджери паролів: найкраща інвестиція в безпеку',
      paragraphs: [
        'Менеджер паролів генерує, зберігає та автоматично заповнює унікальні випадкові паролі для кожного акаунту. Серед провідних рішень — 1Password, Bitwarden (з відкритим кодом) та KeePass (офлайн). Кожен використовує шифрування AES-256 для захисту вашого сховища, з мастер-паролем як ключем розшифрування.',
        'Основна перевага — повне усунення повторного використання паролів. З менеджером паролів кожен акаунт отримує унікальний випадковий пароль довжиною 20+ символів. Вам потрібно запам\'ятати лише один надійний мастер-пароль. Більшість менеджерів також попереджають, коли паролі з\'являються у відомих базах витоків.',
        'Обирайте менеджер, який підтримує ваші пристрої та браузери, пропонує екстрений доступ для довірених контактів та пройшов незалежний аудит безпеки. Bitwarden — чудовий безкоштовний варіант з відкритим кодом, який будь-хто може перевірити. Для команд 1Password Business або Bitwarden Organizations надають можливості спільного сховища.',
      ],
    },
    {
      heading: 'Окрім паролів: багатофакторна аутентифікація',
      paragraphs: [
        'Навіть найнадійніший пароль може бути скомпрометований через фішинг, кейлогери або витоки на стороні сервера. Багатофакторна аутентифікація (MFA) додає другий крок перевірки — зазвичай одноразовий пароль на основі часу (TOTP) з програми, такої як Google Authenticator або Authy, або апаратний ключ безпеки, такий як YubiKey.',
        'Увімкніть MFA на кожному акаунті, який це підтримує, надаючи пріоритет електронній пошті (вашому центру відновлення), банкінгу, хмарному сховищу та соціальним мережам. Апаратні ключі безпеки (FIDO2/WebAuthn) забезпечують найнадійніший захист від фішингу, оскільки вони перевіряють фактичний домен веб-сайту перед аутентифікацією.',
        'Зберігайте резервні коди MFA у вашому менеджері паролів або в окремому безпечному місці. Втрата доступу до пристрою MFA без резервних кодів може назавжди заблокувати ваші акаунти.',
      ],
    },
  ],
};

export const es: LocalizedArticleContent = {
  title: 'Cómo crear contraseñas seguras en 2026: guía completa',
  excerpt:
    'Aprende a crear contraseñas verdaderamente seguras con técnicas modernas recomendadas por NIST, OWASP y expertos en ciberseguridad. Esta guía cubre entropía, gestores de contraseñas, frases de contraseña y errores comunes.',
  seoTitle: 'Cómo crear contraseñas seguras en 2026 — Directrices NIST | generatepasswordto.me',
  seoDescription:
    'Guía práctica 2026 para crear contraseñas seguras. Cubre directrices NIST 800-63B, cálculos de entropía, frases de contraseña, gestores y pasos detallados para máxima seguridad.',
  keywords: [
    'cómo crear contraseña segura',
    'guía contraseñas seguras 2026',
    'directrices NIST contraseñas',
    'consejos contraseña segura',
    'entropía contraseña',
    'mejores prácticas contraseñas',
  ],
  sections: [
    {
      heading: 'Por qué la fortaleza de las contraseñas sigue importando en 2026',
      paragraphs: [
        'A pesar del auge de la biometría y las passkeys, las contraseñas siguen siendo el método de autenticación principal para la gran mayoría de cuentas en línea. Según el informe Verizon Data Breach Investigations 2025, más del 80 % de las brechas relacionadas con hacking involucran credenciales débiles o robadas. Esto significa que tu contraseña suele ser la única barrera entre tus datos privados y un atacante.',
        'Los atacantes modernos utilizan herramientas de fuerza bruta aceleradas por GPU que prueban miles de millones de combinaciones por segundo. Una contraseña simple de 8 caracteres en minúsculas se puede descifrar en menos de 5 minutos. Sin embargo, una contraseña bien construida de 16 caracteres con tipos mixtos tardaría siglos en romperse con la tecnología actual.',
        'La buena noticia es que crear una contraseña segura no requiere memorizar cadenas aleatorias de caracteres. Enfoques modernos como las frases de contraseña y los gestores hacen que la seguridad sea accesible y práctica. Esta guía te lleva por cada técnica recomendada por los principales estándares de seguridad.',
      ],
    },
    {
      heading: 'Entendiendo la entropía de contraseñas',
      paragraphs: [
        'La entropía es una medida matemática de cuán impredecible es una contraseña. Se mide en bits: una contraseña con 40 bits de entropía tiene 2^40 (aproximadamente 1 billón) combinaciones posibles. Los expertos en seguridad generalmente recomiendan un mínimo de 60 bits para cuentas estándar y 80+ bits para objetivos de alto valor como banca o correo electrónico.',
        'La fórmula es directa: entropía = log2(tamaño_del_conjunto^longitud). Una contraseña de 12 caracteres usando mayúsculas (26), minúsculas (26), dígitos (10) y símbolos (33) tiene un conjunto de 95 caracteres. Esto da aproximadamente 79 bits de entropía — protección sólida contra ataques fuera de línea.',
        'Sin embargo, la entropía asume que la contraseña es verdaderamente aleatoria. Una contraseña como "Password123!" técnicamente usa las cuatro clases de caracteres pero tiene una entropía efectiva casi nula porque sigue un patrón predecible. Los atacantes mantienen diccionarios de millones de estos patrones comunes y los prueban primero.',
      ],
      bullets: [
        '40 bits de entropía: mínimo para cuentas de bajo riesgo (foros, boletines)',
        '60 bits: estándar para la mayoría de cuentas personales (redes sociales, compras)',
        '80 bits: recomendado para correo, banca y almacenamiento en la nube',
        '100+ bits: ideal para billeteras de criptomonedas y contraseñas maestras',
      ],
    },
    {
      heading: 'NIST 800-63B: lo que realmente recomiendan los expertos',
      paragraphs: [
        'El Instituto Nacional de Estándares y Tecnología (NIST) actualizó sus Directrices de Identidad Digital (SP 800-63B) para reflejar la investigación moderna sobre seguridad de contraseñas. Estas directrices se han convertido en el estándar de oro para organizaciones en todo el mundo.',
        'Las recomendaciones clave de NIST incluyen: permitir contraseñas de hasta 64 caracteres; requerir un mínimo de 8 caracteres (12+ recomendado); NO imponer reglas de complejidad arbitrarias (como requerir mayúscula + número + símbolo); NO requerir cambios periódicos de contraseña a menos que haya evidencia de compromiso; verificar contraseñas contra listas de contraseñas filtradas conocidas; y soportar la función de pegado en campos de contraseña.',
        'La razón detrás de eliminar las reglas de complejidad es convincente: la complejidad forzada lleva a los usuarios a crear patrones predecibles como "Spring2026!" o "P@ssw0rd" — contraseñas que satisfacen las reglas pero se descifran trivialmente. En cambio, NIST enfatiza la longitud y la impredecibilidad como los principales factores de seguridad.',
        'NIST también recomienda que las organizaciones implementen limitación de velocidad en intentos de inicio de sesión, usen autenticación multifactor (MFA) y almacenen contraseñas con hash usando algoritmos modernos como Argon2id o bcrypt con factores de trabajo apropiados.',
      ],
    },
    {
      heading: 'El enfoque de frases de contraseña: memorables y seguras',
      paragraphs: [
        'Una frase de contraseña es una secuencia de palabras aleatorias unidas, como "correct-horse-battery-staple" (el famoso ejemplo de XKCD). Cuando se genera correctamente — usando una lista de al menos 7.776 palabras (como la lista EFF Diceware) — cada palabra añade aproximadamente 12,9 bits de entropía.',
        'Una frase de cuatro palabras proporciona aproximadamente 52 bits de entropía, mientras que una de seis palabras alcanza aproximadamente 78 bits — comparable a una contraseña aleatoria de 12 caracteres pero mucho más fácil de escribir y recordar. Para cuentas críticas, usa cinco o seis palabras.',
        'Reglas importantes para frases de contraseña: usa un método de selección verdaderamente aleatorio (dados o un generador criptográfico — nunca elijas palabras tú mismo); evita citas famosas, letras de canciones o títulos de libros; añade un carácter separador entre palabras (guiones, puntos o espacios); y considera poner en mayúscula una palabra aleatoria o insertar un dígito para entropía adicional sin sacrificar memorabilidad.',
      ],
      bullets: [
        '4 palabras: ~52 bits — adecuado para cuentas de riesgo medio',
        '5 palabras: ~65 bits — bueno para la mayoría de cuentas personales',
        '6 palabras: ~78 bits — fuerte para correo y cuentas financieras',
        '7 palabras: ~90 bits — excelente para contraseñas maestras y billeteras cripto',
      ],
    },
    {
      heading: 'Paso a paso: creando tu contraseña',
      paragraphs: [
        'Para cuentas cotidianas, usa un gestor de contraseñas para generar y almacenar contraseñas aleatorias únicas de 16 o más caracteres. Tu gestor se encarga de la complejidad, así que cada contraseña puede ser máximamente aleatoria sin necesidad de memorización.',
        'Para tu contraseña maestra (la única que debes memorizar), usa el método de frase de contraseña: lanza dados o usa un generador criptográfico para seleccionar 5-7 palabras aleatorias de una lista grande. Anótala y guarda el papel en un lugar físico seguro hasta memorizarla, luego destruye el papel.',
        'Para cuentas donde no puedes usar un gestor (como el inicio de sesión de tu ordenador o PIN del teléfono), crea una frase fácil de teclear rápidamente. Practica escribirla varias veces para desarrollar memoria muscular. Una frase como "arce-trueno-jirafa-enchufe-22" es fuerte y fácil de teclear.',
        'Nunca reutilices contraseñas entre cuentas. Si un servicio sufre una brecha, los atacantes probarán automáticamente esas credenciales en cientos de otros sitios — una técnica llamada credential stuffing. Una contraseña única para cada cuenta limita el radio de explosión de cualquier brecha individual.',
      ],
    },
    {
      heading: 'Errores comunes con contraseñas que debes evitar',
      paragraphs: [
        'Usar información personal es el error más común y peligroso. Nombres de familiares, mascotas, cumpleaños, aniversarios, números de teléfono y direcciones son fácilmente descubribles a través de redes sociales. Los atacantes construyen diccionarios personalizados a partir de tus datos públicos antes de intentar cualquier ataque de fuerza bruta.',
        'Los patrones de teclado como "qwerty", "123456", "zxcvbn" o "1qaz2wsx" parecen seguros porque lucen aleatorios, pero están entre los primeros patrones que prueban las herramientas de cracking. Del mismo modo, las sustituciones simples (@ por a, 3 por e, 0 por o) no añaden prácticamente ninguna seguridad porque toda herramienta de cracking incluye estas transformaciones leet-speak.',
        'Incrementar contraseñas al cambiarlas forzosamente (Password1 → Password2 → Password3) no proporciona mejora real de seguridad. Si un atacante obtiene cualquier versión, puede adivinar trivialmente las demás. Esta es precisamente la razón por la que NIST ahora recomienda no hacer cambios periódicos obligatorios de contraseña.',
      ],
      bullets: [
        'Nunca uses palabras del diccionario sin modificación',
        'Evita información personal (nombres, fechas, direcciones)',
        'No uses patrones de teclado o secuencias',
        'Nunca reutilices contraseñas en múltiples cuentas',
        'Evita sustituciones simples de caracteres (@ por a, 3 por e)',
        'No incrementes contraseñas (Password1, Password2, etc.)',
      ],
    },
    {
      heading: 'Gestores de contraseñas: tu mejor inversión en seguridad',
      paragraphs: [
        'Un gestor de contraseñas genera, almacena y rellena automáticamente contraseñas aleatorias únicas para cada cuenta. Las opciones principales incluyen 1Password, Bitwarden (código abierto) y KeePass (sin conexión). Cada uno utiliza cifrado AES-256 para proteger tu bóveda, con tu contraseña maestra como clave de descifrado.',
        'La ventaja principal es eliminar completamente la reutilización de contraseñas. Con un gestor, cada cuenta obtiene una contraseña aleatoria única de 20+ caracteres. Solo necesitas memorizar una contraseña maestra fuerte. La mayoría de gestores también te alertan cuando las contraseñas aparecen en bases de datos de brechas conocidas.',
        'Elige un gestor que soporte tus dispositivos y navegadores, ofrezca acceso de emergencia para contactos de confianza y haya pasado auditorías de seguridad independientes. Bitwarden es una excelente opción gratuita con código abierto que cualquiera puede auditar. Para equipos, 1Password Business o Bitwarden Organizations proporcionan capacidades de bóveda compartida.',
      ],
    },
    {
      heading: 'Más allá de las contraseñas: autenticación multifactor',
      paragraphs: [
        'Incluso la contraseña más fuerte puede verse comprometida por phishing, keyloggers o brechas del lado del servidor. La autenticación multifactor (MFA) añade un segundo paso de verificación — típicamente una contraseña temporal basada en tiempo (TOTP) de una app como Google Authenticator o Authy, o una llave de seguridad de hardware como YubiKey.',
        'Activa MFA en cada cuenta que lo soporte, priorizando correo electrónico (tu centro de recuperación), banca, almacenamiento en la nube y redes sociales. Las llaves de seguridad de hardware (FIDO2/WebAuthn) proporcionan la protección más fuerte contra phishing porque verifican el dominio real del sitio web antes de autenticar.',
        'Guarda tus códigos de respaldo MFA en tu gestor de contraseñas o en otra ubicación segura separada. Perder acceso a tu dispositivo MFA sin códigos de respaldo puede bloquearte permanentemente de tus cuentas.',
      ],
    },
  ],
};

export const fr: LocalizedArticleContent = {
  title: 'Comment créer des mots de passe forts en 2026 : guide complet',
  excerpt:
    'Apprenez à créer des mots de passe véritablement sécurisés grâce aux techniques modernes recommandées par le NIST, l\'OWASP et les experts en cybersécurité. Ce guide couvre l\'entropie, les gestionnaires de mots de passe, les phrases secrètes et les erreurs courantes.',
  seoTitle: 'Comment créer des mots de passe forts en 2026 — Directives NIST | generatepasswordto.me',
  seoDescription:
    'Guide pratique 2026 pour créer des mots de passe forts. Couvre les directives NIST 800-63B, les calculs d\'entropie, les phrases secrètes, les gestionnaires et les étapes détaillées pour une sécurité maximale.',
  keywords: [
    'comment créer mot de passe fort',
    'guide mots de passe sécurisés 2026',
    'directives NIST mots de passe',
    'conseils mot de passe sécurisé',
    'entropie mot de passe',
    'meilleures pratiques mots de passe',
  ],
  sections: [
    {
      heading: 'Pourquoi la robustesse des mots de passe reste importante en 2026',
      paragraphs: [
        'Malgré l\'essor de la biométrie et des passkeys, les mots de passe restent la méthode d\'authentification principale pour la grande majorité des comptes en ligne. Selon le rapport Verizon Data Breach Investigations 2025, plus de 80 % des violations liées au piratage impliquent des identifiants faibles ou volés. Cela signifie que votre mot de passe est souvent la seule barrière entre vos données privées et un attaquant.',
        'Les attaquants modernes utilisent des outils de force brute accélérés par GPU capables de tester des milliards de combinaisons par seconde. Un simple mot de passe de 8 caractères en minuscules peut être craqué en moins de 5 minutes. Cependant, un mot de passe bien construit de 16 caractères avec des types de caractères mixtes prendrait des siècles à casser avec la technologie actuelle.',
        'La bonne nouvelle est que créer un mot de passe fort ne nécessite pas de mémoriser des chaînes aléatoires de caractères. Les approches modernes comme les phrases secrètes et les gestionnaires rendent la sécurité à la fois accessible et pratique. Ce guide vous accompagne à travers chaque technique recommandée par les principaux standards de sécurité.',
      ],
    },
    {
      heading: 'Comprendre l\'entropie des mots de passe',
      paragraphs: [
        'L\'entropie est une mesure mathématique de l\'imprévisibilité d\'un mot de passe. Elle se mesure en bits : un mot de passe avec 40 bits d\'entropie possède 2^40 (environ 1 billion) combinaisons possibles. Les experts en sécurité recommandent généralement un minimum de 60 bits pour les comptes standard et 80+ bits pour les cibles à haute valeur comme la banque ou le courriel.',
        'La formule est simple : entropie = log2(taille_du_pool^longueur). Un mot de passe de 12 caractères utilisant des majuscules (26), des minuscules (26), des chiffres (10) et des symboles (33) puise dans un ensemble de 95 caractères. Cela donne environ 79 bits d\'entropie — une protection solide contre les attaques hors ligne.',
        'Cependant, l\'entropie suppose que le mot de passe est véritablement aléatoire. Un mot de passe comme "Password123!" utilise techniquement les quatre classes de caractères mais a une entropie effective quasi nulle car il suit un modèle prévisible. Les attaquants maintiennent des dictionnaires de millions de tels modèles courants et les testent en premier.',
      ],
      bullets: [
        '40 bits d\'entropie : minimum pour les comptes à faible risque (forums, newsletters)',
        '60 bits : standard pour la plupart des comptes personnels (réseaux sociaux, achats)',
        '80 bits : recommandé pour le courriel, la banque et le stockage cloud',
        '100+ bits : idéal pour les portefeuilles crypto et les mots de passe maîtres',
      ],
    },
    {
      heading: 'NIST 800-63B : ce que recommandent vraiment les experts',
      paragraphs: [
        'Le National Institute of Standards and Technology (NIST) a mis à jour ses directives d\'identité numérique (SP 800-63B) pour refléter la recherche moderne sur la sécurité des mots de passe. Ces directives sont devenues la référence pour les organisations du monde entier.',
        'Les recommandations clés du NIST incluent : autoriser les mots de passe jusqu\'à 64 caractères ; exiger un minimum de 8 caractères (12+ recommandé) ; NE PAS imposer de règles de complexité arbitraires (comme exiger majuscule + chiffre + symbole) ; NE PAS exiger de changements périodiques de mot de passe sauf en cas de preuve de compromission ; vérifier les mots de passe contre les listes de fuites connues ; et prendre en charge la fonction coller dans les champs de mot de passe.',
        'La raison de l\'abandon des règles de complexité est convaincante : la complexité forcée amène les utilisateurs à créer des modèles prévisibles comme "Spring2026!" ou "P@ssw0rd" — des mots de passe qui satisfont les règles mais sont trivialement craqués. Au lieu de cela, le NIST met l\'accent sur la longueur et l\'imprévisibilité comme principaux facteurs de sécurité.',
        'Le NIST recommande également que les organisations mettent en place une limitation du nombre de tentatives de connexion, utilisent l\'authentification multifacteur (MFA) et hachent les mots de passe stockés avec des algorithmes modernes comme Argon2id ou bcrypt avec des facteurs de travail appropriés.',
      ],
    },
    {
      heading: 'L\'approche par phrase secrète : mémorable et sécurisée',
      paragraphs: [
        'Une phrase secrète est une séquence de mots aléatoires enchaînés, comme "correct-horse-battery-staple" (le célèbre exemple XKCD). Lorsqu\'elle est générée correctement — en utilisant une liste d\'au moins 7 776 mots (comme la liste EFF Diceware) — chaque mot ajoute environ 12,9 bits d\'entropie.',
        'Une phrase de quatre mots fournit environ 52 bits d\'entropie, tandis qu\'une phrase de six mots atteint environ 78 bits — comparable à un mot de passe aléatoire de 12 caractères mais beaucoup plus facile à taper et à retenir. Pour les comptes critiques, utilisez cinq ou six mots.',
        'Règles importantes pour les phrases secrètes : utilisez une méthode de sélection véritablement aléatoire (dés ou un générateur cryptographique — ne choisissez jamais les mots vous-même) ; évitez les citations célèbres, paroles de chansons ou titres de livres ; ajoutez un séparateur entre les mots (tirets, points ou espaces) ; et envisagez de mettre une majuscule à un mot aléatoire ou d\'insérer un chiffre pour une entropie supplémentaire sans sacrifier la mémorabilité.',
      ],
      bullets: [
        '4 mots : ~52 bits — adapté aux comptes à risque moyen',
        '5 mots : ~65 bits — bon pour la plupart des comptes personnels',
        '6 mots : ~78 bits — solide pour le courriel et les comptes financiers',
        '7 mots : ~90 bits — excellent pour les mots de passe maîtres et les portefeuilles crypto',
      ],
    },
    {
      heading: 'Étape par étape : créer votre mot de passe',
      paragraphs: [
        'Pour les comptes quotidiens, utilisez un gestionnaire de mots de passe pour générer et stocker des mots de passe aléatoires uniques de 16 caractères ou plus. Votre gestionnaire gère la complexité, donc chaque mot de passe peut être maximalement aléatoire sans aucun effort de mémorisation.',
        'Pour votre mot de passe maître (le seul que vous devez mémoriser), utilisez la méthode de phrase secrète : lancez des dés ou utilisez un générateur cryptographique pour sélectionner 5-7 mots aléatoires d\'une grande liste. Notez-le et conservez le papier dans un endroit physique sûr jusqu\'à ce que vous l\'ayez mémorisé, puis détruisez le papier.',
        'Pour les comptes où vous ne pouvez pas utiliser de gestionnaire (comme votre connexion ordinateur ou le PIN de téléphone), créez une phrase facile à taper rapidement. Entraînez-vous à la taper plusieurs fois pour développer la mémoire musculaire. Une phrase comme "érable-tonnerre-girafe-prise-22" est à la fois forte et facile à taper.',
        'Ne réutilisez jamais les mots de passe entre les comptes. Si un service subit une fuite, les attaquants essaieront automatiquement ces identifiants sur des centaines d\'autres sites — une technique appelée credential stuffing. Un mot de passe unique pour chaque compte limite le rayon d\'impact de toute fuite individuelle.',
      ],
    },
    {
      heading: 'Erreurs courantes à éviter avec les mots de passe',
      paragraphs: [
        'Utiliser des informations personnelles est l\'erreur la plus courante et la plus dangereuse. Les noms de famille, animaux de compagnie, dates de naissance, anniversaires, numéros de téléphone et adresses sont facilement découvrables via les réseaux sociaux. Les attaquants construisent des dictionnaires personnalisés à partir de vos données publiques avant toute tentative de force brute.',
        'Les motifs de clavier comme "azerty", "123456", "zxcvbn" ou "1qaz2wsx" semblent sécurisés car ils paraissent aléatoires, mais ils figurent parmi les premiers motifs testés par les outils de cracking. De même, les substitutions simples (@ pour a, 3 pour e, 0 pour o) n\'ajoutent pratiquement aucune sécurité car tout outil de cracking inclut ces transformations leet-speak.',
        'Incrémenter les mots de passe lors de changements forcés (Password1 → Password2 → Password3) n\'apporte aucune amélioration réelle de sécurité. Si un attaquant obtient une version quelconque, il peut trivialement deviner les autres. C\'est précisément pourquoi le NIST recommande désormais de ne pas imposer de changements périodiques obligatoires.',
      ],
      bullets: [
        'N\'utilisez jamais de mots du dictionnaire sans modification',
        'Évitez les informations personnelles (noms, dates, adresses)',
        'N\'utilisez pas de motifs de clavier ou de séquences',
        'Ne réutilisez jamais les mots de passe sur plusieurs comptes',
        'Évitez les substitutions simples de caractères (@ pour a, 3 pour e)',
        'N\'incrémentez pas les mots de passe (Password1, Password2, etc.)',
      ],
    },
    {
      heading: 'Gestionnaires de mots de passe : votre meilleur investissement sécurité',
      paragraphs: [
        'Un gestionnaire de mots de passe génère, stocke et remplit automatiquement des mots de passe aléatoires uniques pour chaque compte. Les options principales incluent 1Password, Bitwarden (open source) et KeePass (hors ligne). Chacun utilise le chiffrement AES-256 pour protéger votre coffre-fort, avec votre mot de passe maître comme clé de déchiffrement.',
        'L\'avantage principal est d\'éliminer complètement la réutilisation des mots de passe. Avec un gestionnaire, chaque compte obtient un mot de passe aléatoire unique de 20+ caractères. Vous n\'avez qu\'à mémoriser un seul mot de passe maître fort. La plupart des gestionnaires vous alertent également lorsque des mots de passe apparaissent dans des bases de données de fuites connues.',
        'Choisissez un gestionnaire qui prend en charge vos appareils et navigateurs, offre un accès d\'urgence pour les contacts de confiance et a fait l\'objet d\'audits de sécurité indépendants. Bitwarden est une excellente option gratuite avec un code open source que n\'importe qui peut auditer. Pour les équipes, 1Password Business ou Bitwarden Organizations offrent des fonctionnalités de coffre-fort partagé.',
      ],
    },
    {
      heading: 'Au-delà des mots de passe : authentification multifacteur',
      paragraphs: [
        'Même le mot de passe le plus fort peut être compromis par le phishing, les keyloggers ou les fuites côté serveur. L\'authentification multifacteur (MFA) ajoute une seconde étape de vérification — généralement un mot de passe temporaire basé sur le temps (TOTP) depuis une application comme Google Authenticator ou Authy, ou une clé de sécurité matérielle comme YubiKey.',
        'Activez la MFA sur chaque compte qui la prend en charge, en priorité sur le courriel (votre centre de récupération), la banque, le stockage cloud et les réseaux sociaux. Les clés de sécurité matérielles (FIDO2/WebAuthn) offrent la protection la plus forte contre le phishing car elles vérifient le domaine réel du site web avant l\'authentification.',
        'Conservez vos codes de secours MFA dans votre gestionnaire de mots de passe ou dans un autre emplacement sécurisé séparé. Perdre l\'accès à votre appareil MFA sans codes de secours peut vous bloquer définitivement hors de vos comptes.',
      ],
    },
  ],
};

export const de: LocalizedArticleContent = {
  title: 'Sichere Passwörter erstellen 2026: vollständiger Leitfaden',
  excerpt:
    'Lernen Sie, wie Sie mit modernen Techniken, die von NIST, OWASP und Cybersicherheitsexperten empfohlen werden, wirklich sichere Passwörter erstellen. Dieser Leitfaden behandelt Entropie, Passwort-Manager, Passphrasen und häufige Fehler.',
  seoTitle: 'Sichere Passwörter erstellen 2026 — NIST-Richtlinien | generatepasswordto.me',
  seoDescription:
    'Praktischer Leitfaden 2026 zur Erstellung sicherer Passwörter. Behandelt NIST 800-63B-Richtlinien, Entropie-Berechnungen, Passphrasen, Passwort-Manager und Schritt-für-Schritt-Anleitungen für maximale Sicherheit.',
  keywords: [
    'sicheres Passwort erstellen',
    'Passwort-Leitfaden 2026',
    'NIST Passwort-Richtlinien',
    'sichere Passwort-Tipps',
    'Passwort-Entropie',
    'Passwort Best Practices',
  ],
  sections: [
    {
      heading: 'Warum Passwortstärke 2026 immer noch wichtig ist',
      paragraphs: [
        'Trotz des Aufstiegs von Biometrie und Passkeys bleiben Passwörter die primäre Authentifizierungsmethode für die überwiegende Mehrheit der Online-Konten. Laut dem Verizon Data Breach Investigations Report 2025 sind über 80 % der hackingbezogenen Sicherheitsverletzungen mit schwachen oder gestohlenen Zugangsdaten verbunden. Das bedeutet, dass Ihr Passwort oft die einzige Barriere zwischen Ihren privaten Daten und einem Angreifer ist.',
        'Moderne Angreifer verwenden GPU-beschleunigte Brute-Force-Tools, die Milliarden von Passwortkombinationen pro Sekunde testen können. Ein einfaches 8-Zeichen-Passwort in Kleinbuchstaben kann in unter 5 Minuten geknackt werden. Ein gut konstruiertes 16-Zeichen-Passwort mit gemischten Zeichentypen würde jedoch mit aktueller Technologie Jahrhunderte zum Knacken benötigen.',
        'Die gute Nachricht ist, dass das Erstellen eines sicheren Passworts nicht das Auswendiglernen zufälliger Zeichenketten erfordert. Moderne Ansätze wie Passphrasen und Passwort-Manager machen Sicherheit zugänglich und praktisch zugleich. Dieser Leitfaden führt Sie durch jede Technik, die von führenden Sicherheitsstandards empfohlen wird.',
      ],
    },
    {
      heading: 'Passwort-Entropie verstehen',
      paragraphs: [
        'Entropie ist ein mathematisches Maß dafür, wie unvorhersehbar ein Passwort ist. Sie wird in Bits gemessen: Ein Passwort mit 40 Bits Entropie hat 2^40 (etwa 1 Billion) mögliche Kombinationen. Sicherheitsexperten empfehlen im Allgemeinen mindestens 60 Bits für Standardkonten und 80+ Bits für hochwertige Ziele wie Banking oder E-Mail.',
        'Die Formel ist einfach: Entropie = log2(Pool-Größe^Länge). Ein 12-Zeichen-Passwort mit Großbuchstaben (26), Kleinbuchstaben (26), Ziffern (10) und Symbolen (33) schöpft aus einem Pool von 95 Zeichen. Das ergibt ungefähr 79 Bits Entropie — solider Schutz gegen Offline-Angriffe.',
        'Entropie setzt jedoch voraus, dass das Passwort wirklich zufällig ist. Ein Passwort wie "Password123!" verwendet technisch alle vier Zeichenklassen, hat aber nahezu null effektive Entropie, da es einem vorhersehbaren Muster folgt. Angreifer pflegen Wörterbücher mit Millionen solcher gängigen Muster und testen sie zuerst.',
      ],
      bullets: [
        '40 Bits Entropie: Minimum für risikoarme Konten (Foren, Newsletter)',
        '60 Bits: Standard für die meisten persönlichen Konten (soziale Medien, Shopping)',
        '80 Bits: empfohlen für E-Mail, Banking und Cloud-Speicher',
        '100+ Bits: ideal für Kryptowährungs-Wallets und Master-Passwörter',
      ],
    },
    {
      heading: 'NIST 800-63B: Was die Experten wirklich empfehlen',
      paragraphs: [
        'Das National Institute of Standards and Technology (NIST) hat seine Digital Identity Guidelines (SP 800-63B) aktualisiert, um die moderne Forschung zur Passwortsicherheit widerzuspiegeln. Diese Richtlinien sind zum Goldstandard für Organisationen weltweit geworden.',
        'Die wichtigsten NIST-Empfehlungen umfassen: Passwörter bis zu 64 Zeichen zulassen; ein Minimum von 8 Zeichen verlangen (12+ empfohlen); KEINE willkürlichen Komplexitätsregeln erzwingen (wie Großbuchstabe + Zahl + Symbol); KEINE periodischen Passwortänderungen verlangen, es sei denn, es gibt Hinweise auf eine Kompromittierung; Passwörter gegen bekannte Breach-Listen prüfen; und die Einfügefunktion in Passwortfeldern unterstützen.',
        'Die Begründung für den Verzicht auf Komplexitätsregeln ist überzeugend: Erzwungene Komplexität führt dazu, dass Benutzer vorhersehbare Muster wie "Spring2026!" oder "P@ssw0rd" erstellen — Passwörter, die die Regeln erfüllen, aber trivial geknackt werden. Stattdessen betont NIST Länge und Unvorhersehbarkeit als primäre Sicherheitsfaktoren.',
        'NIST empfiehlt außerdem, dass Organisationen Rate-Limiting bei Anmeldeversuchen implementieren, Multi-Faktor-Authentifizierung (MFA) verwenden und gespeicherte Passwörter mit modernen Algorithmen wie Argon2id oder bcrypt mit angemessenen Work-Faktoren hashen.',
      ],
    },
    {
      heading: 'Der Passphrasen-Ansatz: einprägsam und sicher',
      paragraphs: [
        'Eine Passphrase ist eine Folge zufälliger Wörter, die aneinandergereiht werden, wie "correct-horse-battery-staple" (das berühmte XKCD-Beispiel). Bei korrekter Generierung — unter Verwendung einer Wortliste mit mindestens 7.776 Einträgen (wie die EFF-Diceware-Liste) — fügt jedes Wort ungefähr 12,9 Bits Entropie hinzu.',
        'Eine Vier-Wort-Passphrase bietet ungefähr 52 Bits Entropie, während eine Sechs-Wort-Passphrase ungefähr 78 Bits erreicht — vergleichbar mit einem zufälligen 12-Zeichen-Passwort, aber viel einfacher zu tippen und zu merken. Für kritische Konten verwenden Sie fünf oder sechs Wörter.',
        'Wichtige Regeln für Passphrasen: Verwenden Sie eine wirklich zufällige Auswahlmethode (Würfel oder ein kryptographischer Zufallsgenerator — wählen Sie nie selbst Wörter aus); vermeiden Sie berühmte Zitate, Songtexte oder Buchtitel; fügen Sie ein Trennzeichen zwischen den Wörtern ein (Bindestriche, Punkte oder Leerzeichen); und erwägen Sie, ein zufälliges Wort großzuschreiben oder eine Ziffer einzufügen für zusätzliche Entropie ohne Einbuße bei der Merkbarkeit.',
      ],
      bullets: [
        '4 Wörter: ~52 Bits — geeignet für Konten mit mittlerem Risiko',
        '5 Wörter: ~65 Bits — gut für die meisten persönlichen Konten',
        '6 Wörter: ~78 Bits — stark für E-Mail und Finanzkonten',
        '7 Wörter: ~90 Bits — hervorragend für Master-Passwörter und Krypto-Wallets',
      ],
    },
    {
      heading: 'Schritt für Schritt: Ihr Passwort erstellen',
      paragraphs: [
        'Für alltägliche Konten verwenden Sie einen Passwort-Manager, um einzigartige zufällige Passwörter mit 16 oder mehr Zeichen zu generieren und zu speichern. Ihr Passwort-Manager übernimmt die Komplexität, sodass jedes Passwort maximal zufällig sein kann, ohne dass Sie es sich merken müssen.',
        'Für Ihr Master-Passwort (das einzige Passwort, das Sie sich merken müssen) verwenden Sie die Passphrasen-Methode: Würfeln Sie oder verwenden Sie einen kryptographischen Generator, um 5-7 zufällige Wörter aus einer großen Wortliste auszuwählen. Schreiben Sie es auf und bewahren Sie das Papier an einem sicheren physischen Ort auf, bis Sie es auswendig können, dann vernichten Sie das Papier.',
        'Für Konten, bei denen Sie keinen Passwort-Manager verwenden können (wie Ihre Computer-Anmeldung oder Telefon-PIN), erstellen Sie eine Passphrase, die schnell zu tippen ist. Üben Sie das Tippen mehrmals, um Muskelgedächtnis aufzubauen. Eine Phrase wie "ahorn-donner-giraffe-steckdose-22" ist sowohl stark als auch gut tippbar.',
        'Verwenden Sie Passwörter niemals bei mehreren Konten wieder. Wenn ein Dienst gehackt wird, probieren Angreifer diese Zugangsdaten automatisch bei Hunderten anderer Websites aus — eine Technik namens Credential Stuffing. Ein einzigartiges Passwort für jedes Konto begrenzt den Schaden jedes einzelnen Datenlecks.',
      ],
    },
    {
      heading: 'Häufige Passwort-Fehler, die Sie vermeiden sollten',
      paragraphs: [
        'Die Verwendung persönlicher Informationen ist der häufigste und gefährlichste Fehler. Namen von Familienmitgliedern, Haustieren, Geburtstagen, Jubiläen, Telefonnummern und Adressen sind über soziale Medien leicht auffindbar. Angreifer erstellen personalisierte Wörterbücher aus Ihren öffentlichen Daten, bevor sie einen Brute-Force-Angriff starten.',
        'Tastaturmuster wie "qwertz", "123456", "zxcvbn" oder "1qaz2wsx" wirken sicher, weil sie zufällig aussehen, gehören aber zu den ersten Mustern, die Cracking-Tools testen. Ebenso fügen einfache Ersetzungen (@ für a, 3 für e, 0 für o) praktisch keine Sicherheit hinzu, da jedes Cracking-Tool diese Leet-Speak-Transformationen enthält.',
        'Das Inkrementieren von Passwörtern bei erzwungenen Änderungen (Password1 → Password2 → Password3) bietet keine echte Sicherheitsverbesserung. Wenn ein Angreifer eine beliebige Version erhält, kann er die anderen trivial erraten. Genau deshalb empfiehlt NIST jetzt, auf obligatorische periodische Passwortänderungen zu verzichten.',
      ],
      bullets: [
        'Verwenden Sie niemals Wörterbuchwörter ohne Modifikation',
        'Vermeiden Sie persönliche Informationen (Namen, Daten, Adressen)',
        'Verwenden Sie keine Tastaturmuster oder Sequenzen',
        'Verwenden Sie Passwörter niemals bei mehreren Konten wieder',
        'Vermeiden Sie einfache Zeichenersetzungen (@ für a, 3 für e)',
        'Inkrementieren Sie keine Passwörter (Password1, Password2 usw.)',
      ],
    },
    {
      heading: 'Passwort-Manager: Ihre beste Sicherheitsinvestition',
      paragraphs: [
        'Ein Passwort-Manager generiert, speichert und füllt automatisch einzigartige zufällige Passwörter für jedes Konto aus. Führende Optionen sind 1Password, Bitwarden (Open Source) und KeePass (offline). Jeder verwendet AES-256-Verschlüsselung zum Schutz Ihres Tresors, mit Ihrem Master-Passwort als Entschlüsselungsschlüssel.',
        'Der Hauptvorteil ist die vollständige Beseitigung der Passwort-Wiederverwendung. Mit einem Passwort-Manager erhält jedes Konto ein einzigartiges zufälliges Passwort mit 20+ Zeichen. Sie müssen sich nur ein starkes Master-Passwort merken. Die meisten Manager warnen Sie auch, wenn Passwörter in bekannten Breach-Datenbanken auftauchen.',
        'Wählen Sie einen Manager, der Ihre Geräte und Browser unterstützt, Notfallzugang für vertrauenswürdige Kontakte bietet und unabhängige Sicherheitsaudits durchlaufen hat. Bitwarden ist eine hervorragende kostenlose Option mit Open-Source-Code, den jeder prüfen kann. Für Teams bieten 1Password Business oder Bitwarden Organizations gemeinsame Tresor-Funktionalitäten.',
      ],
    },
    {
      heading: 'Über Passwörter hinaus: Multi-Faktor-Authentifizierung',
      paragraphs: [
        'Selbst das stärkste Passwort kann durch Phishing, Keylogger oder serverseitige Datenlecks kompromittiert werden. Die Multi-Faktor-Authentifizierung (MFA) fügt einen zweiten Verifizierungsschritt hinzu — typischerweise ein zeitbasiertes Einmalpasswort (TOTP) aus einer App wie Google Authenticator oder Authy oder ein Hardware-Sicherheitsschlüssel wie YubiKey.',
        'Aktivieren Sie MFA bei jedem Konto, das es unterstützt, wobei Sie E-Mail (Ihr Wiederherstellungszentrum), Banking, Cloud-Speicher und soziale Medien priorisieren. Hardware-Sicherheitsschlüssel (FIDO2/WebAuthn) bieten den stärksten Phishing-Schutz, da sie die tatsächliche Website-Domain vor der Authentifizierung überprüfen.',
        'Bewahren Sie Ihre MFA-Backup-Codes in Ihrem Passwort-Manager oder an einem separaten sicheren Ort auf. Den Zugang zu Ihrem MFA-Gerät ohne Backup-Codes zu verlieren, kann Sie dauerhaft aus Ihren Konten aussperren.',
      ],
    },
  ],
};

export const it: LocalizedArticleContent = {
  title: 'Come creare password sicure nel 2026: guida completa',
  excerpt:
    'Scopri come creare password veramente sicure con tecniche moderne raccomandate da NIST, OWASP ed esperti di cybersicurezza. Questa guida copre entropia, gestori di password, passphrase e gli errori comuni da evitare.',
  seoTitle: 'Come creare password sicure nel 2026 — Linee guida NIST | generatepasswordto.me',
  seoDescription:
    'Guida pratica 2026 per creare password sicure. Copre le linee guida NIST 800-63B, calcoli di entropia, passphrase, gestori di password e istruzioni passo-passo per la massima sicurezza.',
  keywords: [
    'come creare password sicura',
    'guida password sicure 2026',
    'linee guida NIST password',
    'consigli password sicura',
    'entropia password',
    'migliori pratiche password',
  ],
  sections: [
    {
      heading: 'Perché la robustezza delle password è ancora importante nel 2026',
      paragraphs: [
        'Nonostante la diffusione della biometria e delle passkey, le password rimangono il metodo di autenticazione principale per la stragrande maggioranza degli account online. Secondo il rapporto Verizon Data Breach Investigations 2025, oltre l\'80% delle violazioni legate all\'hacking coinvolgono credenziali deboli o rubate. Ciò significa che la vostra password è spesso l\'unica barriera tra i vostri dati privati e un attaccante.',
        'Gli attaccanti moderni utilizzano strumenti di forza bruta accelerati dalla GPU che possono testare miliardi di combinazioni di password al secondo. Una semplice password di 8 caratteri minuscoli può essere decifrata in meno di 5 minuti. Tuttavia, una password ben costruita di 16 caratteri con tipi di caratteri misti richiederebbe secoli per essere violata con la tecnologia attuale.',
        'La buona notizia è che creare una password sicura non richiede di memorizzare stringhe casuali di caratteri. Approcci moderni come le passphrase e i gestori di password rendono la sicurezza sia accessibile che pratica. Questa guida vi accompagna attraverso ogni tecnica raccomandata dai principali standard di sicurezza.',
      ],
    },
    {
      heading: 'Comprendere l\'entropia delle password',
      paragraphs: [
        'L\'entropia è una misura matematica di quanto sia imprevedibile una password. Si misura in bit: una password con 40 bit di entropia ha 2^40 (circa 1 bilione) combinazioni possibili. Gli esperti di sicurezza raccomandano generalmente un minimo di 60 bit per account standard e 80+ bit per obiettivi di alto valore come il banking o l\'email.',
        'La formula è semplice: entropia = log2(dimensione_pool^lunghezza). Una password di 12 caratteri che usa lettere maiuscole (26), minuscole (26), cifre (10) e simboli (33) attinge da un pool di 95 caratteri. Ciò dà approssimativamente 79 bit di entropia — una protezione solida contro attacchi offline.',
        'Tuttavia, l\'entropia presuppone che la password sia veramente casuale. Una password come "Password123!" utilizza tecnicamente tutte e quattro le classi di caratteri ma ha un\'entropia effettiva quasi nulla perché segue uno schema prevedibile. Gli attaccanti mantengono dizionari di milioni di tali schemi comuni e li testano per primi.',
      ],
      bullets: [
        '40 bit di entropia: minimo per account a basso rischio (forum, newsletter)',
        '60 bit: standard per la maggior parte degli account personali (social media, shopping)',
        '80 bit: raccomandato per email, banking e archiviazione cloud',
        '100+ bit: ideale per wallet di criptovalute e password master',
      ],
    },
    {
      heading: 'NIST 800-63B: cosa raccomandano davvero gli esperti',
      paragraphs: [
        'Il National Institute of Standards and Technology (NIST) ha aggiornato le sue Digital Identity Guidelines (SP 800-63B) per riflettere la ricerca moderna sulla sicurezza delle password. Queste linee guida sono diventate il gold standard per le organizzazioni di tutto il mondo.',
        'Le raccomandazioni chiave del NIST includono: consentire password fino a 64 caratteri; richiedere un minimo di 8 caratteri (12+ raccomandato); NON imporre regole di complessità arbitrarie (come richiedere maiuscola + numero + simbolo); NON richiedere cambi periodici della password a meno che non ci siano prove di compromissione; verificare le password contro liste di password violate note; e supportare la funzionalità di incolla nei campi password.',
        'La ragione per l\'abbandono delle regole di complessità è convincente: la complessità forzata porta gli utenti a creare schemi prevedibili come "Spring2026!" o "P@ssw0rd" — password che soddisfano le regole ma vengono decifrate banalmente. Invece, il NIST enfatizza lunghezza e imprevedibilità come i principali fattori di sicurezza.',
        'Il NIST raccomanda inoltre che le organizzazioni implementino il rate limiting sui tentativi di accesso, utilizzino l\'autenticazione multifattore (MFA) e memorizzino le password con hash usando algoritmi moderni come Argon2id o bcrypt con fattori di lavoro appropriati.',
      ],
    },
    {
      heading: 'L\'approccio passphrase: memorizzabile e sicuro',
      paragraphs: [
        'Una passphrase è una sequenza di parole casuali concatenate, come "correct-horse-battery-staple" (il famoso esempio XKCD). Quando generata correttamente — usando una lista di almeno 7.776 parole (come la lista EFF Diceware) — ogni parola aggiunge approssimativamente 12,9 bit di entropia.',
        'Una passphrase di quattro parole fornisce circa 52 bit di entropia, mentre una di sei parole raggiunge circa 78 bit — comparabile a una password casuale di 12 caratteri ma molto più facile da digitare e ricordare. Per account critici, usate cinque o sei parole.',
        'Regole importanti per le passphrase: usate un metodo di selezione veramente casuale (dadi o un generatore crittografico — non scegliete mai le parole da soli); evitate citazioni famose, testi di canzoni o titoli di libri; aggiungete un carattere separatore tra le parole (trattini, punti o spazi); e considerate di mettere in maiuscolo una parola casuale o inserire una cifra per entropia aggiuntiva senza sacrificare la memorizzabilità.',
      ],
      bullets: [
        '4 parole: ~52 bit — adatto per account a rischio medio',
        '5 parole: ~65 bit — buono per la maggior parte degli account personali',
        '6 parole: ~78 bit — forte per email e conti finanziari',
        '7 parole: ~90 bit — eccellente per password master e wallet crypto',
      ],
    },
    {
      heading: 'Passo dopo passo: creare la vostra password',
      paragraphs: [
        'Per gli account quotidiani, usate un gestore di password per generare e memorizzare password casuali uniche di 16 o più caratteri. Il vostro gestore gestisce la complessità, così ogni password può essere massimamente casuale senza alcuno sforzo di memorizzazione.',
        'Per la vostra password master (l\'unica password che dovete memorizzare), usate il metodo passphrase: lanciate dadi o usate un generatore crittografico per selezionare 5-7 parole casuali da una grande lista. Scrivetela e conservate il foglio in un luogo fisico sicuro finché non l\'avrete memorizzata, poi distruggete il foglio.',
        'Per account dove non potete usare un gestore (come l\'accesso al computer o il PIN del telefono), create una passphrase facile da digitare velocemente. Esercitatevi a digitarla più volte per sviluppare la memoria muscolare. Una frase come "acero-tuono-giraffa-presa-22" è sia forte che facile da digitare.',
        'Non riutilizzate mai le password tra diversi account. Se un servizio subisce una violazione, gli attaccanti proveranno automaticamente quelle credenziali su centinaia di altri siti — una tecnica chiamata credential stuffing. Una password unica per ogni account limita il raggio d\'impatto di qualsiasi singola violazione.',
      ],
    },
    {
      heading: 'Errori comuni con le password da evitare',
      paragraphs: [
        'Usare informazioni personali è l\'errore più comune e pericoloso. Nomi di familiari, animali domestici, compleanni, anniversari, numeri di telefono e indirizzi sono facilmente scopribili attraverso i social media. Gli attaccanti costruiscono dizionari personalizzati dai vostri dati pubblici prima di tentare qualsiasi attacco di forza bruta.',
        'Gli schemi da tastiera come "qwerty", "123456", "zxcvbn" o "1qaz2wsx" sembrano sicuri perché appaiono casuali, ma sono tra i primi schemi testati dagli strumenti di cracking. Allo stesso modo, le sostituzioni semplici (@ per a, 3 per e, 0 per o) non aggiungono praticamente nessuna sicurezza perché ogni strumento di cracking include queste trasformazioni leet-speak.',
        'Incrementare le password durante i cambi forzati (Password1 → Password2 → Password3) non fornisce alcun miglioramento reale della sicurezza. Se un attaccante ottiene una qualsiasi versione, può banalmente indovinare le altre. Questo è proprio il motivo per cui il NIST ora raccomanda di non imporre cambi periodici obbligatori delle password.',
      ],
      bullets: [
        'Non usate mai parole del dizionario senza modifica',
        'Evitate informazioni personali (nomi, date, indirizzi)',
        'Non usate schemi da tastiera o sequenze',
        'Non riutilizzate mai le password su più account',
        'Evitate sostituzioni semplici di caratteri (@ per a, 3 per e)',
        'Non incrementate le password (Password1, Password2, ecc.)',
      ],
    },
    {
      heading: 'Gestori di password: il vostro miglior investimento in sicurezza',
      paragraphs: [
        'Un gestore di password genera, memorizza e compila automaticamente password casuali uniche per ogni account. Le opzioni principali includono 1Password, Bitwarden (open source) e KeePass (offline). Ognuno utilizza la crittografia AES-256 per proteggere il vostro vault, con la password master come chiave di decrittazione.',
        'Il vantaggio principale è l\'eliminazione completa del riutilizzo delle password. Con un gestore, ogni account ottiene una password casuale unica di 20+ caratteri. Dovete memorizzare solo una password master forte. La maggior parte dei gestori vi avvisa anche quando le password compaiono in database di violazioni note.',
        'Scegliete un gestore che supporti i vostri dispositivi e browser, offra accesso di emergenza per contatti fidati e sia stato sottoposto a audit di sicurezza indipendenti. Bitwarden è un\'eccellente opzione gratuita con codice open source che chiunque può verificare. Per i team, 1Password Business o Bitwarden Organizations offrono funzionalità di vault condiviso.',
      ],
    },
    {
      heading: 'Oltre le password: autenticazione multifattore',
      paragraphs: [
        'Anche la password più forte può essere compromessa tramite phishing, keylogger o violazioni lato server. L\'autenticazione multifattore (MFA) aggiunge un secondo passaggio di verifica — tipicamente una password temporanea basata sul tempo (TOTP) da un\'app come Google Authenticator o Authy, o una chiave di sicurezza hardware come YubiKey.',
        'Attivate l\'MFA su ogni account che lo supporta, dando priorità all\'email (il vostro centro di recupero), al banking, all\'archiviazione cloud e ai social media. Le chiavi di sicurezza hardware (FIDO2/WebAuthn) offrono la protezione più forte contro il phishing perché verificano il dominio effettivo del sito web prima dell\'autenticazione.',
        'Conservate i vostri codici di backup MFA nel vostro gestore di password o in un\'altra posizione sicura separata. Perdere l\'accesso al dispositivo MFA senza codici di backup può bloccarvi permanentemente dai vostri account.',
      ],
    },
  ],
};

export const pt: LocalizedArticleContent = {
  title: 'Como criar senhas fortes em 2026: guia completo',
  excerpt:
    'Aprenda a criar senhas verdadeiramente seguras usando técnicas modernas recomendadas pelo NIST, OWASP e especialistas em cibersegurança. Este guia cobre entropia, gerenciadores de senhas, frases-senha e erros comuns a evitar.',
  seoTitle: 'Como criar senhas fortes em 2026 — Diretrizes NIST | generatepasswordto.me',
  seoDescription:
    'Guia prático 2026 para criar senhas fortes. Cobre diretrizes NIST 800-63B, cálculos de entropia, frases-senha, gerenciadores e instruções passo a passo para segurança máxima.',
  keywords: [
    'como criar senha forte',
    'guia senhas seguras 2026',
    'diretrizes NIST senhas',
    'dicas senha segura',
    'entropia de senha',
    'melhores práticas senhas',
  ],
  sections: [
    {
      heading: 'Por que a força das senhas ainda importa em 2026',
      paragraphs: [
        'Apesar do avanço da biometria e das passkeys, as senhas continuam sendo o principal método de autenticação para a grande maioria das contas online. Segundo o relatório Verizon Data Breach Investigations 2025, mais de 80% das violações relacionadas a hacking envolvem credenciais fracas ou roubadas. Isso significa que sua senha é frequentemente a única barreira entre seus dados privados e um atacante.',
        'Atacantes modernos usam ferramentas de força bruta aceleradas por GPU que podem testar bilhões de combinações de senhas por segundo. Uma senha simples de 8 caracteres minúsculos pode ser quebrada em menos de 5 minutos. No entanto, uma senha bem construída de 16 caracteres com tipos mistos de caracteres levaria séculos para ser quebrada com a tecnologia atual.',
        'A boa notícia é que criar uma senha forte não requer memorizar sequências aleatórias de caracteres. Abordagens modernas como frases-senha e gerenciadores de senhas tornam a segurança acessível e prática. Este guia apresenta cada técnica recomendada pelos principais padrões de segurança.',
      ],
    },
    {
      heading: 'Entendendo a entropia de senhas',
      paragraphs: [
        'Entropia é uma medida matemática de quão imprevisível uma senha é. É medida em bits: uma senha com 40 bits de entropia tem 2^40 (aproximadamente 1 trilhão) combinações possíveis. Especialistas em segurança geralmente recomendam um mínimo de 60 bits para contas padrão e 80+ bits para alvos de alto valor como banking ou email.',
        'A fórmula é direta: entropia = log2(tamanho_do_pool^comprimento). Uma senha de 12 caracteres usando letras maiúsculas (26), minúsculas (26), dígitos (10) e símbolos (33) utiliza um pool de 95 caracteres. Isso dá aproximadamente 79 bits de entropia — proteção sólida contra ataques offline.',
        'No entanto, a entropia assume que a senha é verdadeiramente aleatória. Uma senha como "Password123!" tecnicamente usa todas as quatro classes de caracteres, mas tem entropia efetiva quase zero porque segue um padrão previsível. Atacantes mantêm dicionários de milhões de tais padrões comuns e os testam primeiro.',
      ],
      bullets: [
        '40 bits de entropia: mínimo para contas de baixo risco (fóruns, newsletters)',
        '60 bits: padrão para a maioria das contas pessoais (redes sociais, compras)',
        '80 bits: recomendado para email, banking e armazenamento em nuvem',
        '100+ bits: ideal para carteiras de criptomoedas e senhas mestras',
      ],
    },
    {
      heading: 'NIST 800-63B: o que os especialistas realmente recomendam',
      paragraphs: [
        'O National Institute of Standards and Technology (NIST) atualizou suas Digital Identity Guidelines (SP 800-63B) para refletir a pesquisa moderna sobre segurança de senhas. Essas diretrizes se tornaram o padrão ouro para organizações em todo o mundo.',
        'As principais recomendações do NIST incluem: permitir senhas de até 64 caracteres; exigir um mínimo de 8 caracteres (12+ recomendado); NÃO impor regras de complexidade arbitrárias (como exigir maiúscula + número + símbolo); NÃO exigir alterações periódicas de senha a menos que haja evidência de comprometimento; verificar senhas contra listas de senhas vazadas conhecidas; e suportar a funcionalidade de colar em campos de senha.',
        'A razão para abandonar regras de complexidade é convincente: complexidade forçada leva os usuários a criar padrões previsíveis como "Spring2026!" ou "P@ssw0rd" — senhas que satisfazem as regras mas são trivialmente quebradas. Em vez disso, o NIST enfatiza comprimento e imprevisibilidade como os principais fatores de segurança.',
        'O NIST também recomenda que as organizações implementem limitação de taxa em tentativas de login, usem autenticação multifator (MFA) e armazenem senhas com hash usando algoritmos modernos como Argon2id ou bcrypt com fatores de trabalho apropriados.',
      ],
    },
    {
      heading: 'A abordagem de frases-senha: memoráveis e seguras',
      paragraphs: [
        'Uma frase-senha é uma sequência de palavras aleatórias unidas, como "correct-horse-battery-staple" (o famoso exemplo XKCD). Quando gerada corretamente — usando uma lista de pelo menos 7.776 palavras (como a lista EFF Diceware) — cada palavra adiciona aproximadamente 12,9 bits de entropia.',
        'Uma frase-senha de quatro palavras fornece aproximadamente 52 bits de entropia, enquanto uma de seis palavras alcança aproximadamente 78 bits — comparável a uma senha aleatória de 12 caracteres, mas muito mais fácil de digitar e lembrar. Para contas críticas, use cinco ou seis palavras.',
        'Regras importantes para frases-senha: use um método de seleção verdadeiramente aleatório (dados ou um gerador criptográfico — nunca escolha palavras você mesmo); evite citações famosas, letras de músicas ou títulos de livros; adicione um caractere separador entre as palavras (hifens, pontos ou espaços); e considere capitalizar uma palavra aleatória ou inserir um dígito para entropia adicional sem sacrificar a memorabilidade.',
      ],
      bullets: [
        '4 palavras: ~52 bits — adequado para contas de risco médio',
        '5 palavras: ~65 bits — bom para a maioria das contas pessoais',
        '6 palavras: ~78 bits — forte para email e contas financeiras',
        '7 palavras: ~90 bits — excelente para senhas mestras e carteiras cripto',
      ],
    },
    {
      heading: 'Passo a passo: criando sua senha',
      paragraphs: [
        'Para contas do dia a dia, use um gerenciador de senhas para gerar e armazenar senhas aleatórias únicas de 16 ou mais caracteres. Seu gerenciador cuida da complexidade, então cada senha pode ser maximamente aleatória sem nenhum esforço de memorização.',
        'Para sua senha mestra (a única senha que você precisa memorizar), use o método de frase-senha: lance dados ou use um gerador criptográfico para selecionar 5-7 palavras aleatórias de uma lista grande. Anote-a e guarde o papel em um local físico seguro até memorizar, depois destrua o papel.',
        'Para contas onde não pode usar um gerenciador (como o login do computador ou PIN do telefone), crie uma frase-senha fácil de digitar rapidamente. Pratique digitá-la várias vezes para desenvolver memória muscular. Uma frase como "bordo-trovão-girafa-tomada-22" é forte e fácil de digitar.',
        'Nunca reutilize senhas entre contas. Se um serviço sofrer uma violação, os atacantes tentarão automaticamente essas credenciais em centenas de outros sites — uma técnica chamada credential stuffing. Uma senha única para cada conta limita o raio de impacto de qualquer violação individual.',
      ],
    },
    {
      heading: 'Erros comuns com senhas a evitar',
      paragraphs: [
        'Usar informações pessoais é o erro mais comum e perigoso. Nomes de familiares, animais de estimação, aniversários, datas comemorativas, números de telefone e endereços são facilmente descobertos através das redes sociais. Atacantes constroem dicionários personalizados a partir dos seus dados públicos antes de tentar qualquer ataque de força bruta.',
        'Padrões de teclado como "qwerty", "123456", "zxcvbn" ou "1qaz2wsx" parecem seguros porque parecem aleatórios, mas estão entre os primeiros padrões testados pelas ferramentas de cracking. Da mesma forma, substituições simples (@ por a, 3 por e, 0 por o) praticamente não adicionam segurança porque toda ferramenta de cracking inclui essas transformações leet-speak.',
        'Incrementar senhas durante trocas forçadas (Password1 → Password2 → Password3) não proporciona melhoria real de segurança. Se um atacante obtiver qualquer versão, pode trivialmente adivinhar as demais. Esta é precisamente a razão pela qual o NIST agora recomenda não impor trocas periódicas obrigatórias de senha.',
      ],
      bullets: [
        'Nunca use palavras do dicionário sem modificação',
        'Evite informações pessoais (nomes, datas, endereços)',
        'Não use padrões de teclado ou sequências',
        'Nunca reutilize senhas em múltiplas contas',
        'Evite substituições simples de caracteres (@ por a, 3 por e)',
        'Não incremente senhas (Password1, Password2, etc.)',
      ],
    },
    {
      heading: 'Gerenciadores de senhas: seu melhor investimento em segurança',
      paragraphs: [
        'Um gerenciador de senhas gera, armazena e preenche automaticamente senhas aleatórias únicas para cada conta. As opções principais incluem 1Password, Bitwarden (código aberto) e KeePass (offline). Cada um usa criptografia AES-256 para proteger seu cofre, com sua senha mestra como chave de descriptografia.',
        'A principal vantagem é eliminar completamente a reutilização de senhas. Com um gerenciador, cada conta recebe uma senha aleatória única de 20+ caracteres. Você só precisa memorizar uma senha mestra forte. A maioria dos gerenciadores também alerta quando senhas aparecem em bancos de dados de violações conhecidas.',
        'Escolha um gerenciador que suporte seus dispositivos e navegadores, ofereça acesso de emergência para contatos de confiança e tenha passado por auditorias de segurança independentes. Bitwarden é uma excelente opção gratuita com código aberto que qualquer pessoa pode auditar. Para equipes, 1Password Business ou Bitwarden Organizations oferecem funcionalidades de cofre compartilhado.',
      ],
    },
    {
      heading: 'Além das senhas: autenticação multifator',
      paragraphs: [
        'Mesmo a senha mais forte pode ser comprometida por phishing, keyloggers ou violações do lado do servidor. A autenticação multifator (MFA) adiciona uma segunda etapa de verificação — tipicamente uma senha temporária baseada em tempo (TOTP) de um app como Google Authenticator ou Authy, ou uma chave de segurança de hardware como YubiKey.',
        'Ative a MFA em cada conta que a suporte, priorizando email (seu centro de recuperação), banking, armazenamento em nuvem e redes sociais. Chaves de segurança de hardware (FIDO2/WebAuthn) proporcionam a proteção mais forte contra phishing porque verificam o domínio real do site antes de autenticar.',
        'Guarde seus códigos de backup MFA no seu gerenciador de senhas ou em outro local seguro separado. Perder acesso ao seu dispositivo MFA sem códigos de backup pode bloquear você permanentemente das suas contas.',
      ],
    },
  ],
};

export const ru: LocalizedArticleContent = {
  title: 'Как создать надёжный пароль в 2026 году: полное руководство',
  excerpt:
    'Узнайте, как создавать по-настоящему безопасные пароли с помощью современных методов, рекомендованных NIST, OWASP и экспертами по кибербезопасности. Это руководство охватывает энтропию, менеджеры паролей, парольные фразы и распространённые ошибки.',
  seoTitle: 'Как создать надёжный пароль в 2026 — рекомендации NIST | generatepasswordto.me',
  seoDescription:
    'Практическое руководство 2026 года по созданию надёжных паролей. Рекомендации NIST 800-63B, расчёт энтропии, парольные фразы, менеджеры паролей и пошаговые инструкции для максимальной безопасности.',
  keywords: [
    'как создать надёжный пароль',
    'руководство по паролям 2026',
    'рекомендации NIST по паролям',
    'советы по безопасным паролям',
    'энтропия пароля',
    'лучшие практики паролей',
  ],
  sections: [
    {
      heading: 'Почему надёжность пароля по-прежнему важна в 2026 году',
      paragraphs: [
        'Несмотря на развитие биометрии и passkeys, пароли остаются основным методом аутентификации для подавляющего большинства онлайн-аккаунтов. Согласно отчёту Verizon Data Breach Investigations 2025, более 80% взломов связаны со слабыми или украденными учётными данными. Это означает, что ваш пароль зачастую — единственный барьер между вашими личными данными и злоумышленником.',
        'Современные атакующие используют инструменты brute-force с GPU-ускорением, проверяющие миллиарды комбинаций паролей в секунду. Простой 8-символьный пароль из строчных букв можно взломать менее чем за 5 минут. Однако правильно составленный 16-символьный пароль из смешанных типов символов потребует столетий для взлома с текущими технологиями.',
        'Хорошая новость в том, что создание надёжного пароля не требует запоминания случайных строк символов. Современные подходы — парольные фразы и менеджеры паролей — делают безопасность одновременно доступной и практичной. Это руководство проведёт вас через каждую технику, рекомендованную ведущими стандартами безопасности.',
      ],
    },
    {
      heading: 'Понимание энтропии пароля',
      paragraphs: [
        'Энтропия — это математическая мера непредсказуемости пароля. Она измеряется в битах: пароль с 40 битами энтропии имеет 2^40 (около 1 триллиона) возможных комбинаций. Эксперты по безопасности обычно рекомендуют минимум 60 бит для стандартных аккаунтов и 80+ бит для высокоценных целей, таких как банкинг или электронная почта.',
        'Формула проста: энтропия = log2(размер_набора^длина). 12-символьный пароль из прописных букв (26), строчных букв (26), цифр (10) и символов (33) использует набор из 95 символов. Это даёт примерно 79 бит энтропии — надёжная защита от офлайн-атак.',
        'Однако энтропия предполагает, что пароль действительно случаен. Пароль вроде "Password123!" технически использует все четыре класса символов, но имеет почти нулевую эффективную энтропию, так как следует предсказуемому шаблону. Атакующие поддерживают словари из миллионов таких распространённых шаблонов и проверяют их в первую очередь.',
      ],
      bullets: [
        '40 бит энтропии: минимум для аккаунтов с низким риском (форумы, рассылки)',
        '60 бит: стандарт для большинства личных аккаунтов (соцсети, покупки)',
        '80 бит: рекомендовано для почты, банкинга и облачного хранилища',
        '100+ бит: идеально для криптокошельков и мастер-паролей',
      ],
    },
    {
      heading: 'NIST 800-63B: что на самом деле рекомендуют эксперты',
      paragraphs: [
        'Национальный институт стандартов и технологий (NIST) обновил свои Рекомендации по цифровой идентификации (SP 800-63B), отражая современные исследования безопасности паролей. Эти рекомендации стали золотым стандартом для организаций по всему миру.',
        'Ключевые рекомендации NIST включают: разрешать пароли до 64 символов; требовать минимум 8 символов (рекомендуется 12+); НЕ навязывать произвольные правила сложности (вроде обязательных заглавных букв + цифр + символов); НЕ требовать периодической смены паролей без доказательств компрометации; проверять пароли по спискам известных утечек; и поддерживать вставку в поля паролей.',
        'Обоснование отказа от правил сложности убедительно: принудительная сложность заставляет пользователей создавать предсказуемые шаблоны вроде "Spring2026!" или "P@ssw0rd" — пароли, которые формально соответствуют правилам, но тривиально взламываются. Вместо этого NIST делает акцент на длине и непредсказуемости как главных факторах безопасности.',
        'NIST также рекомендует организациям внедрять ограничение частоты попыток входа, использовать многофакторную аутентификацию (MFA) и хешировать сохранённые пароли современными алгоритмами, такими как Argon2id или bcrypt с соответствующими параметрами сложности.',
      ],
    },
    {
      heading: 'Парольные фразы: запоминаемые и безопасные',
      paragraphs: [
        'Парольная фраза — это последовательность случайных слов, соединённых вместе, например "correct-horse-battery-staple" (знаменитый пример XKCD). При правильной генерации — с использованием списка минимум 7 776 слов (как EFF Diceware) — каждое слово добавляет примерно 12,9 бит энтропии.',
        'Фраза из четырёх слов обеспечивает примерно 52 бита энтропии, а из шести слов — примерно 78 бит, что сопоставимо со случайным 12-символьным паролем, но гораздо проще для набора и запоминания. Для критически важных аккаунтов используйте пять или шесть слов.',
        'Важные правила для парольных фраз: используйте по-настоящему случайный метод выбора (кубики или криптографический генератор — никогда не выбирайте слова сами); избегайте известных цитат, текстов песен или названий книг; добавляйте разделитель между словами (дефисы, точки или пробелы); рассмотрите написание одного случайного слова с заглавной буквы или вставку цифры для дополнительной энтропии без ущерба для запоминаемости.',
      ],
      bullets: [
        '4 слова: ~52 бита — подходит для аккаунтов среднего риска',
        '5 слов: ~65 бит — хорошо для большинства личных аккаунтов',
        '6 слов: ~78 бит — надёжно для почты и финансовых аккаунтов',
        '7 слов: ~90 бит — отлично для мастер-паролей и криптокошельков',
      ],
    },
    {
      heading: 'Пошаговая инструкция: создание вашего пароля',
      paragraphs: [
        'Для повседневных аккаунтов используйте менеджер паролей для генерации и хранения уникальных случайных паролей длиной от 16 символов. Менеджер берёт на себя всю сложность, поэтому каждый пароль может быть максимально случайным без необходимости запоминания.',
        'Для мастер-пароля (единственного пароля, который нужно запомнить) используйте метод парольной фразы: бросьте кубики или используйте криптографический генератор для выбора 5-7 случайных слов из большого списка. Запишите его и храните бумагу в безопасном физическом месте, пока не запомните, затем уничтожьте бумагу.',
        'Для аккаунтов, где нельзя использовать менеджер паролей (вход в компьютер или PIN телефона), создайте парольную фразу, которую легко быстро набирать. Потренируйтесь набирать её несколько раз для развития мышечной памяти. Фраза вроде "клён-гром-жираф-розетка-22" одновременно надёжная и удобная для набора.',
        'Никогда не используйте пароли повторно для разных аккаунтов. Если один сервис подвергнется утечке, злоумышленники автоматически попробуют эти учётные данные на сотнях других сайтов — техника, называемая credential stuffing. Уникальный пароль для каждого аккаунта ограничивает последствия любой отдельной утечки.',
      ],
    },
    {
      heading: 'Распространённые ошибки при создании паролей',
      paragraphs: [
        'Использование личной информации — самая распространённая и опасная ошибка. Имена членов семьи, домашних животных, дни рождения, годовщины, номера телефонов и адреса легко обнаруживаются через социальные сети. Атакующие составляют персонализированные словари из ваших публичных данных перед любой попыткой brute-force атаки.',
        'Клавиатурные шаблоны вроде "qwerty", "123456", "zxcvbn" или "1qaz2wsx" кажутся безопасными, потому что выглядят случайными, но они среди первых шаблонов, проверяемых инструментами взлома. Так же простые подстановки (@ вместо a, 3 вместо e, 0 вместо o) практически не добавляют безопасности, так как все инструменты взлома включают эти leet-speak преобразования.',
        'Инкрементирование паролей при принудительной смене (Password1 → Password2 → Password3) не даёт реального улучшения безопасности. Если злоумышленник получит любую версию, он тривиально угадает остальные. Именно поэтому NIST теперь рекомендует отказаться от обязательной периодической смены паролей.',
      ],
      bullets: [
        'Никогда не используйте словарные слова без модификации',
        'Избегайте личной информации (имена, даты, адреса)',
        'Не используйте клавиатурные шаблоны или последовательности',
        'Никогда не используйте пароли повторно для разных аккаунтов',
        'Избегайте простых подстановок символов (@ вместо a, 3 вместо e)',
        'Не инкрементируйте пароли (Password1, Password2 и т.д.)',
      ],
    },
    {
      heading: 'Менеджеры паролей: лучшая инвестиция в безопасность',
      paragraphs: [
        'Менеджер паролей генерирует, хранит и автоматически заполняет уникальные случайные пароли для каждого аккаунта. Ведущие решения включают 1Password, Bitwarden (с открытым кодом) и KeePass (офлайн). Каждый использует шифрование AES-256 для защиты вашего хранилища, а мастер-пароль служит ключом расшифровки.',
        'Главное преимущество — полное устранение повторного использования паролей. С менеджером каждый аккаунт получает уникальный случайный пароль длиной 20+ символов. Вам нужно запомнить только один надёжный мастер-пароль. Большинство менеджеров также предупреждают, когда пароли обнаруживаются в известных базах утечек.',
        'Выбирайте менеджер, который поддерживает ваши устройства и браузеры, предлагает экстренный доступ для доверенных контактов и прошёл независимый аудит безопасности. Bitwarden — отличный бесплатный вариант с открытым кодом, который может проверить любой. Для команд 1Password Business или Bitwarden Organizations предоставляют возможности общего хранилища.',
      ],
    },
    {
      heading: 'За пределами паролей: многофакторная аутентификация',
      paragraphs: [
        'Даже самый надёжный пароль может быть скомпрометирован через фишинг, кейлогеры или утечки на стороне сервера. Многофакторная аутентификация (MFA) добавляет второй шаг проверки — обычно одноразовый пароль на основе времени (TOTP) из приложения вроде Google Authenticator или Authy, или аппаратный ключ безопасности, такой как YubiKey.',
        'Включите MFA на каждом аккаунте, который его поддерживает, отдавая приоритет электронной почте (вашему центру восстановления), банкингу, облачному хранилищу и социальным сетям. Аппаратные ключи безопасности (FIDO2/WebAuthn) обеспечивают наиболее сильную защиту от фишинга, поскольку проверяют реальный домен веб-сайта перед аутентификацией.',
        'Храните резервные коды MFA в менеджере паролей или в отдельном безопасном месте. Потеря доступа к устройству MFA без резервных кодов может навсегда заблокировать ваши аккаунты.',
      ],
    },
  ],
};

export const zh: LocalizedArticleContent = {
  title: '2026年如何创建强密码：完整指南',
  excerpt:
    '了解如何使用NIST、OWASP和网络安全专家推荐的现代技术创建真正安全的密码。本指南涵盖熵值、密码管理器、密码短语和常见错误。',
  seoTitle: '2026年如何创建强密码 — NIST指南 | generatepasswordto.me',
  seoDescription:
    '2026年创建强密码的实用指南。涵盖NIST 800-63B指南、熵值计算、密码短语、密码管理器以及最大安全性的分步说明。',
  keywords: [
    '如何创建强密码',
    '2026密码安全指南',
    'NIST密码指南',
    '安全密码技巧',
    '密码熵值',
    '密码最佳实践',
  ],
  sections: [
    {
      heading: '为什么密码强度在2026年仍然重要',
      paragraphs: [
        '尽管生物识别和Passkey技术不断发展，密码仍然是绝大多数在线账户的主要身份验证方法。根据2025年Verizon数据泄露调查报告，超过80%的黑客相关数据泄露涉及弱密码或被盗凭证。这意味着你的密码往往是你的私人数据与攻击者之间的唯一屏障。',
        '现代攻击者使用GPU加速的暴力破解工具，每秒可以测试数十亿个密码组合。一个简单的8个小写字母密码可以在5分钟内被破解。然而，一个精心构建的16个字符混合类型密码，以当前技术需要几个世纪才能破解。',
        '好消息是，创建强密码并不需要记住随机字符串。密码短语和密码管理器等现代方法使安全变得既便捷又实用。本指南将带您了解主要安全标准推荐的每种技术。',
      ],
    },
    {
      heading: '理解密码熵值',
      paragraphs: [
        '熵值是衡量密码不可预测性的数学指标。以比特为单位：拥有40比特熵值的密码有2^40（约1万亿）种可能组合。安全专家通常建议标准账户至少60比特，银行或电子邮件等高价值目标至少80比特以上。',
        '公式很简单：熵值 = log2(字符池大小^长度)。一个使用大写字母(26)、小写字母(26)、数字(10)和符号(33)的12字符密码从95个字符的池中取值。这大约提供79比特的熵值——对离线攻击有可靠的保护。',
        '然而，熵值假设密码是真正随机的。像"Password123!"这样的密码虽然在技术上使用了所有四种字符类别，但因为遵循可预测的模式，其有效熵值几乎为零。攻击者维护着数百万这类常见模式的字典，并首先测试它们。',
      ],
      bullets: [
        '40比特熵值：低风险账户的最低要求（论坛、新闻通讯）',
        '60比特：大多数个人账户的标准（社交媒体、购物）',
        '80比特：推荐用于电子邮件、银行和云存储',
        '100+比特：加密货币钱包和主密码的理想选择',
      ],
    },
    {
      heading: 'NIST 800-63B：专家的真实建议',
      paragraphs: [
        '美国国家标准与技术研究院(NIST)更新了其数字身份指南(SP 800-63B)，以反映现代密码安全研究。这些指南已成为全球组织的黄金标准。',
        'NIST的关键建议包括：允许最长64个字符的密码；要求最少8个字符（建议12个以上）；不要强制执行任意复杂性规则（如要求大写字母+数字+符号）；除非有泄露证据，不要要求定期更改密码；对照已知泄露密码列表检查密码；支持密码字段的粘贴功能。',
        '放弃复杂性规则的理由令人信服：强制复杂性导致用户创建可预测的模式，如"Spring2026!"或"P@ssw0rd"——这些密码满足规则但极易被破解。相反，NIST强调长度和不可预测性是安全的主要驱动因素。',
        'NIST还建议组织对登录尝试实施速率限制，使用多因素认证(MFA)，并使用Argon2id或bcrypt等现代算法以适当的工作因子对存储的密码进行哈希处理。',
      ],
    },
    {
      heading: '密码短语方法：易记且安全',
      paragraphs: [
        '密码短语是将随机单词串在一起的序列，如"correct-horse-battery-staple"（著名的XKCD示例）。当正确生成时——使用至少7,776个词条的词表（如EFF Diceware列表）——每个词大约增加12.9比特的熵值。',
        '四个词的密码短语提供约52比特的熵值，六个词的短语达到约78比特——与12字符的随机密码相当，但更容易输入和记忆。对于关键账户，使用五到六个词。',
        '密码短语的重要规则：使用真正随机的选词方法（骰子或密码学随机生成器——永远不要自己选词）；避免名言、歌词或书名；在词之间添加分隔符（连字符、点或空格）；考虑将一个随机词大写或插入数字，以在不牺牲可记忆性的情况下增加熵值。',
      ],
      bullets: [
        '4个词：~52比特——适合中等风险账户',
        '5个词：~65比特——适合大多数个人账户',
        '6个词：~78比特——适合电子邮件和金融账户',
        '7个词：~90比特——适合主密码和加密钱包',
      ],
    },
    {
      heading: '分步指南：创建您的密码',
      paragraphs: [
        '对于日常账户，使用密码管理器生成和存储16个或更多字符的唯一随机密码。密码管理器处理所有复杂性，因此每个密码都可以最大程度随机，无需记忆负担。',
        '对于主密码（您必须记住的唯一密码），使用密码短语方法：掷骰子或使用密码学生成器从大型词表中选择5-7个随机词。将其写下来并存放在安全的物理位置，直到记住为止，然后销毁纸张。',
        '对于无法使用密码管理器的账户（如电脑登录或手机PIN），创建一个容易快速输入的密码短语。多次练习输入以建立肌肉记忆。像"枫树-雷电-长颈鹿-插座-22"这样的短语既强大又易于输入。',
        '永远不要在不同账户间重复使用密码。如果一个服务发生泄露，攻击者会自动在数百个其他网站上尝试这些凭证——这种技术称为凭证填充。每个账户使用唯一密码可以限制任何单次泄露的影响范围。',
      ],
    },
    {
      heading: '需要避免的常见密码错误',
      paragraphs: [
        '使用个人信息是最常见也最危险的错误。家庭成员姓名、宠物名、生日、纪念日、电话号码和地址都可以通过社交媒体轻松发现。攻击者在进行任何暴力破解之前，会先根据您的公开数据构建自定义字典。',
        '键盘模式如"qwerty"、"123456"、"zxcvbn"或"1qaz2wsx"看起来安全，因为它们看似随机，但它们是破解工具首先测试的模式。同样，简单替换（@代替a、3代替e、0代替o）几乎不增加安全性，因为所有破解工具都包含这些leet-speak转换。',
        '在强制更改时递增密码（Password1 → Password2 → Password3）不会带来真正的安全改善。如果攻击者获得任何版本，就能轻易猜出其他版本。这正是NIST现在建议不要强制定期更改密码的原因。',
      ],
      bullets: [
        '永远不要未经修改就使用字典词汇',
        '避免个人信息（姓名、日期、地址）',
        '不要使用键盘模式或序列',
        '永远不要在多个账户间重复使用密码',
        '避免简单的字符替换（@代替a、3代替e）',
        '不要递增密码（Password1、Password2等）',
      ],
    },
    {
      heading: '密码管理器：您最好的安全投资',
      paragraphs: [
        '密码管理器为每个账户生成、存储并自动填充唯一的随机密码。主要选择包括1Password、Bitwarden（开源）和KeePass（离线）。每个都使用AES-256加密保护您的密码库，以主密码作为解密密钥。',
        '主要优势是完全消除密码重复使用。使用密码管理器，每个账户都获得唯一的20+字符随机密码。您只需记住一个强主密码。大多数管理器还会在密码出现在已知泄露数据库中时发出警告。',
        '选择支持您的设备和浏览器、为可信联系人提供紧急访问且经过独立安全审计的管理器。Bitwarden是一个优秀的免费开源选择，任何人都可以审查。对于团队，1Password Business或Bitwarden Organizations提供共享密码库功能。',
      ],
    },
    {
      heading: '超越密码：多因素认证',
      paragraphs: [
        '即使最强的密码也可能通过钓鱼、键盘记录器或服务器端泄露被攻破。多因素认证(MFA)添加了第二个验证步骤——通常是来自Google Authenticator或Authy等应用的基于时间的一次性密码(TOTP)，或YubiKey等硬件安全密钥。',
        '在每个支持MFA的账户上启用它，优先考虑电子邮件（您的恢复中心）、银行、云存储和社交媒体。硬件安全密钥(FIDO2/WebAuthn)提供最强的反钓鱼保护，因为它们在认证前验证实际的网站域名。',
        '将您的MFA备份代码保存在密码管理器或另一个安全的单独位置。在没有备份代码的情况下丢失MFA设备的访问权限可能会永久锁定您的账户。',
      ],
    },
  ],
};

export const ja: LocalizedArticleContent = {
  title: '2026年に強力なパスワードを作成する方法：完全ガイド',
  excerpt:
    'NIST、OWASP、サイバーセキュリティ専門家が推奨する最新技術を使用して、本当に安全なパスワードを作成する方法を学びましょう。このガイドではエントロピー、パスワードマネージャー、パスフレーズ、よくある間違いについて解説します。',
  seoTitle: '2026年に強力なパスワードを作成する方法 — NISTガイドライン | generatepasswordto.me',
  seoDescription:
    '2026年版の強力なパスワード作成実践ガイド。NIST 800-63Bガイドライン、エントロピー計算、パスフレーズ、パスワードマネージャー、最大限のセキュリティのためのステップバイステップ手順を網羅。',
  keywords: [
    '強力なパスワードの作り方',
    'パスワードガイド2026',
    'NISTパスワードガイドライン',
    '安全なパスワードのコツ',
    'パスワードエントロピー',
    'パスワードベストプラクティス',
  ],
  sections: [
    {
      heading: '2026年にパスワードの強度がまだ重要な理由',
      paragraphs: [
        '生体認証やPasskeyの台頭にもかかわらず、パスワードはオンラインアカウントの大多数にとって依然として主要な認証方法です。2025年のVerizon Data Breach Investigations Reportによると、ハッキング関連の侵害の80%以上が弱いまたは盗まれた認証情報に関連しています。これはあなたのパスワードが、あなたの個人データと攻撃者の間の唯一の障壁であることが多いことを意味します。',
        '現代の攻撃者は、毎秒数十億のパスワード組み合わせをテストできるGPU加速のブルートフォースツールを使用します。単純な小文字8文字のパスワードは5分以内に解読できます。しかし、適切に構成された混合文字タイプの16文字パスワードは、現在の技術では解読に数世紀かかります。',
        '良いニュースは、強力なパスワードの作成にランダムな文字列の暗記は必要ないということです。パスフレーズやパスワードマネージャーなどの現代的なアプローチにより、セキュリティはアクセスしやすく実用的になっています。このガイドでは、主要なセキュリティ標準が推奨するすべての技術を紹介します。',
      ],
    },
    {
      heading: 'パスワードエントロピーを理解する',
      paragraphs: [
        'エントロピーとは、パスワードの予測不可能性を数学的に測定したものです。ビット単位で測定されます：40ビットのエントロピーを持つパスワードは2^40（約1兆）の可能な組み合わせがあります。セキュリティ専門家は一般的に、標準アカウントには最低60ビット、銀行やメールなどの高価値ターゲットには80ビット以上を推奨しています。',
        '計算式は簡単です：エントロピー = log2(プールサイズ^長さ)。大文字(26)、小文字(26)、数字(10)、記号(33)を使用する12文字のパスワードは95文字のプールから選択します。これは約79ビットのエントロピーを提供し、オフライン攻撃に対する堅実な保護となります。',
        'ただし、エントロピーはパスワードが本当にランダムであることを前提としています。「Password123!」のようなパスワードは技術的には4つの文字クラスすべてを使用していますが、予測可能なパターンに従っているため、実効エントロピーはほぼゼロです。攻撃者はこのような一般的なパターンの辞書を何百万件も維持し、最初にテストします。',
      ],
      bullets: [
        '40ビットのエントロピー：低リスクアカウントの最低ライン（フォーラム、ニュースレター）',
        '60ビット：ほとんどの個人アカウントの標準（SNS、ショッピング）',
        '80ビット：メール、銀行、クラウドストレージに推奨',
        '100ビット以上：暗号通貨ウォレットとマスターパスワードに最適',
      ],
    },
    {
      heading: 'NIST 800-63B：専門家が本当に推奨すること',
      paragraphs: [
        '米国国立標準技術研究所（NIST）は、パスワードセキュリティに関する最新の研究を反映するためにデジタルアイデンティティガイドライン（SP 800-63B）を更新しました。これらのガイドラインは世界中の組織のゴールドスタンダードとなっています。',
        'NISTの主要な推奨事項には以下が含まれます：最大64文字のパスワードを許可する；最低8文字を要求する（12文字以上推奨）；任意の複雑性ルールを強制しない（大文字＋数字＋記号の要求など）；侵害の証拠がない限り定期的なパスワード変更を要求しない；既知の流出パスワードリストに対してパスワードをスクリーニングする；パスワードフィールドでの貼り付け機能をサポートする。',
        '複雑性ルール廃止の理由は説得力があります：強制的な複雑性はユーザーに「Spring2026!」や「P@ssw0rd」のような予測可能なパターンを作成させます。これらはルールを満たしますが簡単に解読されます。代わりにNISTは、長さと予測不可能性をセキュリティの主要な要因として強調しています。',
        'NISTはまた、組織がログイン試行にレート制限を実装し、多要素認証（MFA）を使用し、Argon2idやbcryptなどの最新アルゴリズムで適切なワークファクターを用いて保存パスワードをハッシュ化することを推奨しています。',
      ],
    },
    {
      heading: 'パスフレーズアプローチ：覚えやすく安全',
      paragraphs: [
        'パスフレーズとは、「correct-horse-battery-staple」（有名なXKCDの例）のようなランダムな単語をつなげた配列です。適切に生成された場合——少なくとも7,776語のワードリスト（EFF Dicewareリストなど）を使用——各単語は約12.9ビットのエントロピーを追加します。',
        '4語のパスフレーズは約52ビットのエントロピーを提供し、6語のパスフレーズは約78ビットに達します。これはランダムな12文字パスワードに匹敵しますが、入力と記憶がはるかに簡単です。重要なアカウントには5語または6語を使用してください。',
        'パスフレーズの重要なルール：本当にランダムな選択方法を使用する（サイコロまたは暗号学的乱数生成器——自分で単語を選ばない）；有名な引用、歌詞、書籍タイトルを避ける；単語間に区切り文字を追加する（ハイフン、ピリオド、スペース）；記憶しやすさを犠牲にせずに追加のエントロピーのために、ランダムな単語を1つ大文字にするか数字を挿入することを検討する。',
      ],
      bullets: [
        '4語：~52ビット — 中リスクアカウントに適切',
        '5語：~65ビット — ほとんどの個人アカウントに良い',
        '6語：~78ビット — メールと金融アカウントに強力',
        '7語：~90ビット — マスターパスワードと暗号通貨ウォレットに最適',
      ],
    },
    {
      heading: 'ステップバイステップ：パスワードの作成',
      paragraphs: [
        '日常のアカウントには、パスワードマネージャーを使用して16文字以上のユニークなランダムパスワードを生成・保存してください。パスワードマネージャーが複雑さを処理するので、各パスワードは記憶の負担なく最大限にランダムにできます。',
        'マスターパスワード（唯一覚える必要があるパスワード）には、パスフレーズ方式を使用してください：サイコロを振るか暗号学的生成器を使用して、大きなワードリストから5-7個のランダムな単語を選択します。書き留めて、覚えるまで安全な物理的場所に紙を保管し、その後紙を破棄してください。',
        'パスワードマネージャーを使用できないアカウント（コンピュータのログインや携帯電話のPINなど）には、素早く入力しやすいパスフレーズを作成してください。筋肉記憶を構築するために何度か入力を練習してください。「楓-雷-キリン-コンセント-22」のようなフレーズは強力でありながら入力しやすいです。',
        'アカウント間でパスワードを再利用しないでください。あるサービスで侵害が発生すると、攻撃者は自動的にそれらの認証情報を何百もの他のサイトで試します。これはクレデンシャルスタッフィングと呼ばれる技術です。各アカウントにユニークなパスワードを使用することで、単一の侵害の被害範囲を限定できます。',
      ],
    },
    {
      heading: '避けるべき一般的なパスワードの間違い',
      paragraphs: [
        '個人情報の使用は最も一般的で危険な間違いです。家族の名前、ペット、誕生日、記念日、電話番号、住所はすべてソーシャルメディアを通じて容易に発見できます。攻撃者はブルートフォース攻撃を試みる前に、あなたの公開データからカスタム辞書を構築します。',
        '「qwerty」「123456」「zxcvbn」「1qaz2wsx」などのキーボードパターンはランダムに見えるため安全に感じますが、クラッキングツールが最初にテストするパターンの一つです。同様に、単純な文字置換（@でa、3でe、0でo）はほとんどセキュリティを追加しません。なぜならすべてのクラッキングツールがこれらのリートスピーク変換を含んでいるからです。',
        '強制変更時にパスワードをインクリメントすること（Password1→Password2→Password3）は実質的なセキュリティ向上をもたらしません。攻撃者がいずれかのバージョンを入手すれば、他のバージョンを簡単に推測できます。これがまさにNISTが現在、義務的な定期パスワード変更を推奨しない理由です。',
      ],
      bullets: [
        '修正なしに辞書の単語を使用しない',
        '個人情報を避ける（名前、日付、住所）',
        'キーボードパターンやシーケンスを使用しない',
        '複数のアカウントでパスワードを再利用しない',
        '単純な文字置換を避ける（@でa、3でe）',
        'パスワードをインクリメントしない（Password1、Password2など）',
      ],
    },
    {
      heading: 'パスワードマネージャー：最良のセキュリティ投資',
      paragraphs: [
        'パスワードマネージャーは、各アカウントのためにユニークなランダムパスワードを生成、保存、自動入力します。主要な選択肢には1Password、Bitwarden（オープンソース）、KeePass（オフライン）があります。それぞれAES-256暗号化を使用してボルトを保護し、マスターパスワードが復号鍵となります。',
        '主な利点はパスワードの再利用を完全に排除することです。パスワードマネージャーを使えば、各アカウントは20文字以上のユニークなランダムパスワードを取得します。覚える必要があるのは1つの強力なマスターパスワードだけです。ほとんどのマネージャーは、パスワードが既知の侵害データベースに出現した場合にも警告を発します。',
        'デバイスとブラウザをサポートし、信頼できる連絡先への緊急アクセスを提供し、独立したセキュリティ監査を受けたマネージャーを選択してください。Bitwardenは誰でも監査できるオープンソースコードを持つ優れた無料オプションです。チームには、1Password BusinessまたはBitwarden Organizationsが共有ボルト機能を提供します。',
      ],
    },
    {
      heading: 'パスワードを超えて：多要素認証',
      paragraphs: [
        '最も強力なパスワードでさえ、フィッシング、キーロガー、サーバー側の侵害によって漏洩する可能性があります。多要素認証（MFA）は第二の検証ステップを追加します。通常はGoogle AuthenticatorやAuthyなどのアプリからの時間ベースのワンタイムパスワード（TOTP）、またはYubiKeyなどのハードウェアセキュリティキーです。',
        'MFAをサポートするすべてのアカウントで有効にし、メール（復旧ハブ）、銀行、クラウドストレージ、ソーシャルメディアを優先してください。ハードウェアセキュリティキー（FIDO2/WebAuthn）は、認証前に実際のウェブサイトドメインを確認するため、フィッシングに対する最も強力な保護を提供します。',
        'MFAバックアップコードをパスワードマネージャーまたは別の安全な場所に保管してください。バックアップコードなしでMFAデバイスへのアクセスを失うと、アカウントから永久にロックアウトされる可能性があります。',
      ],
    },
  ],
};

export const pl: LocalizedArticleContent = {
  title: 'Jak tworzyć silne hasła w 2026 roku: kompletny przewodnik',
  excerpt:
    'Dowiedz się, jak tworzyć naprawdę bezpieczne hasła, korzystając z nowoczesnych technik zalecanych przez NIST, OWASP i ekspertów ds. cyberbezpieczeństwa. Ten przewodnik obejmuje entropię, menedżery haseł, frazy hasłowe i typowe błędy.',
  seoTitle: 'Jak tworzyć silne hasła w 2026 — wytyczne NIST | generatepasswordto.me',
  seoDescription:
    'Praktyczny przewodnik 2026 po tworzeniu silnych haseł. Obejmuje wytyczne NIST 800-63B, obliczenia entropii, frazy hasłowe, menedżery haseł i instrukcje krok po kroku dla maksymalnego bezpieczeństwa.',
  keywords: [
    'jak stworzyć silne hasło',
    'przewodnik po hasłach 2026',
    'wytyczne NIST dotyczące haseł',
    'wskazówki bezpieczne hasło',
    'entropia hasła',
    'najlepsze praktyki haseł',
  ],
  sections: [
    {
      heading: 'Dlaczego siła haseł nadal ma znaczenie w 2026 roku',
      paragraphs: [
        'Pomimo rozwoju biometrii i passkeys, hasła pozostają główną metodą uwierzytelniania dla zdecydowanej większości kont online. Według raportu Verizon Data Breach Investigations 2025, ponad 80% naruszeń związanych z hakowaniem dotyczy słabych lub skradzionych poświadczeń. Oznacza to, że twoje hasło jest często jedyną barierą między twoimi prywatnymi danymi a atakującym.',
        'Współcześni atakujący używają narzędzi brute-force z akceleracją GPU, które mogą testować miliardy kombinacji haseł na sekundę. Proste 8-znakowe hasło złożone z małych liter można złamać w mniej niż 5 minut. Jednak dobrze skonstruowane 16-znakowe hasło z mieszanymi typami znaków wymagałoby wieków do złamania przy obecnej technologii.',
        'Dobra wiadomość jest taka, że tworzenie silnego hasła nie wymaga zapamiętywania losowych ciągów znaków. Nowoczesne podejścia, takie jak frazy hasłowe i menedżery haseł, sprawiają, że bezpieczeństwo jest zarówno dostępne, jak i praktyczne. Ten przewodnik przeprowadzi cię przez każdą technikę zalecaną przez wiodące standardy bezpieczeństwa.',
      ],
    },
    {
      heading: 'Zrozumienie entropii haseł',
      paragraphs: [
        'Entropia to matematyczna miara nieprzewidywalności hasła. Mierzy się ją w bitach: hasło z 40 bitami entropii ma 2^40 (około 1 biliona) możliwych kombinacji. Eksperci ds. bezpieczeństwa generalnie zalecają minimum 60 bitów dla standardowych kont i 80+ bitów dla celów o wysokiej wartości, takich jak bankowość czy e-mail.',
        'Formuła jest prosta: entropia = log2(rozmiar_puli^długość). 12-znakowe hasło używające wielkich liter (26), małych liter (26), cyfr (10) i symboli (33) czerpie z puli 95 znaków. To daje około 79 bitów entropii — solidna ochrona przed atakami offline.',
        'Jednak entropia zakłada, że hasło jest naprawdę losowe. Hasło takie jak "Password123!" technicznie używa wszystkich czterech klas znaków, ale ma niemal zerową efektywną entropię, ponieważ podąża za przewidywalnym wzorem. Atakujący utrzymują słowniki milionów takich popularnych wzorców i testują je w pierwszej kolejności.',
      ],
      bullets: [
        '40 bitów entropii: minimum dla kont niskiego ryzyka (fora, newslettery)',
        '60 bitów: standard dla większości kont osobistych (media społecznościowe, zakupy)',
        '80 bitów: zalecane dla e-maila, bankowości i przechowywania w chmurze',
        '100+ bitów: idealne dla portfeli kryptowalut i haseł głównych',
      ],
    },
    {
      heading: 'NIST 800-63B: co naprawdę zalecają eksperci',
      paragraphs: [
        'National Institute of Standards and Technology (NIST) zaktualizował swoje wytyczne dotyczące tożsamości cyfrowej (SP 800-63B), aby odzwierciedlić nowoczesne badania nad bezpieczeństwem haseł. Te wytyczne stały się złotym standardem dla organizacji na całym świecie.',
        'Kluczowe zalecenia NIST obejmują: pozwalać na hasła do 64 znaków; wymagać minimum 8 znaków (zalecane 12+); NIE narzucać arbitralnych reguł złożoności (jak wymaganie wielkiej litery + cyfry + symbolu); NIE wymagać okresowych zmian haseł, chyba że istnieją dowody na kompromitację; sprawdzać hasła wobec znanych list wycieków; i wspierać funkcję wklejania w polach haseł.',
        'Uzasadnienie rezygnacji z reguł złożoności jest przekonujące: wymuszona złożoność prowadzi użytkowników do tworzenia przewidywalnych wzorców jak "Spring2026!" lub "P@ssw0rd" — haseł, które spełniają reguły, ale są trywialnie łamane. Zamiast tego NIST podkreśla długość i nieprzewidywalność jako główne czynniki bezpieczeństwa.',
        'NIST zaleca również, aby organizacje wdrożyły ograniczanie częstotliwości prób logowania, stosowały uwierzytelnianie wieloskładnikowe (MFA) i haszowały przechowywane hasła nowoczesnymi algorytmami, takimi jak Argon2id lub bcrypt z odpowiednimi parametrami złożoności.',
      ],
    },
    {
      heading: 'Podejście fraz hasłowych: łatwe do zapamiętania i bezpieczne',
      paragraphs: [
        'Fraza hasłowa to sekwencja losowych słów połączonych razem, np. "correct-horse-battery-staple" (słynny przykład XKCD). Gdy jest prawidłowo wygenerowana — przy użyciu listy co najmniej 7 776 słów (jak lista EFF Diceware) — każde słowo dodaje około 12,9 bita entropii.',
        'Czterowyrazowa fraza hasłowa zapewnia około 52 bitów entropii, podczas gdy sześciowyrazowa osiąga około 78 bitów — porównywalne z losowym 12-znakowym hasłem, ale znacznie łatwiejsze do wpisania i zapamiętania. Dla krytycznych kont używaj pięciu lub sześciu słów.',
        'Ważne zasady dla fraz hasłowych: używaj naprawdę losowej metody wyboru (kostki lub generator kryptograficzny — nigdy nie wybieraj słów samodzielnie); unikaj znanych cytatów, tekstów piosenek lub tytułów książek; dodaj znak separatora między słowami (myślniki, kropki lub spacje); rozważ napisanie jednego losowego słowa wielką literą lub wstawienie cyfry dla dodatkowej entropii bez poświęcania zapamiętywalności.',
      ],
      bullets: [
        '4 słowa: ~52 bity — odpowiednie dla kont średniego ryzyka',
        '5 słów: ~65 bitów — dobre dla większości kont osobistych',
        '6 słów: ~78 bitów — silne dla e-maila i kont finansowych',
        '7 słów: ~90 bitów — doskonałe dla haseł głównych i portfeli kryptowalut',
      ],
    },
    {
      heading: 'Krok po kroku: tworzenie hasła',
      paragraphs: [
        'Dla codziennych kont używaj menedżera haseł do generowania i przechowywania unikalnych losowych haseł o długości 16 lub więcej znaków. Twój menedżer obsługuje złożoność, więc każde hasło może być maksymalnie losowe bez obciążenia pamięci.',
        'Dla hasła głównego (jedynego hasła, które musisz zapamiętać) użyj metody frazy hasłowej: rzuć kostkami lub użyj generatora kryptograficznego, aby wybrać 5-7 losowych słów z dużej listy. Zapisz je i przechowuj papier w bezpiecznym fizycznym miejscu, aż zapamiętasz, potem zniszcz papier.',
        'Dla kont, w których nie możesz użyć menedżera haseł (jak logowanie do komputera czy PIN telefonu), stwórz frazę hasłową łatwą do szybkiego wpisania. Przećwicz wpisywanie jej kilka razy, aby zbudować pamięć mięśniową. Fraza taka jak "klon-grzmot-żyrafa-gniazdko-22" jest jednocześnie silna i łatwa do wpisania.',
        'Nigdy nie używaj haseł ponownie na różnych kontach. Jeśli jeden serwis zostanie naruszone, atakujący automatycznie wypróbują te poświadczenia na setkach innych stron — technika zwana credential stuffing. Unikalne hasło dla każdego konta ogranicza zakres szkód z każdego pojedynczego wycieku.',
      ],
    },
    {
      heading: 'Typowe błędy w hasłach, których należy unikać',
      paragraphs: [
        'Używanie informacji osobistych to najczęstszy i najniebezpieczniejszy błąd. Imiona członków rodziny, zwierząt domowych, daty urodzin, rocznice, numery telefonów i adresy są łatwo odkrywalne przez media społecznościowe. Atakujący budują spersonalizowane słowniki z twoich publicznych danych przed próbą jakiegokolwiek ataku brute-force.',
        'Wzory klawiaturowe jak "qwerty", "123456", "zxcvbn" lub "1qaz2wsx" wydają się bezpieczne, bo wyglądają losowo, ale są wśród pierwszych wzorców testowanych przez narzędzia do łamania. Podobnie proste podstawienia (@ za a, 3 za e, 0 za o) praktycznie nie dodają bezpieczeństwa, ponieważ każde narzędzie do łamania zawiera te transformacje leet-speak.',
        'Inkrementowanie haseł podczas wymuszonych zmian (Password1 → Password2 → Password3) nie zapewnia rzeczywistej poprawy bezpieczeństwa. Jeśli atakujący uzyska jakąkolwiek wersję, może trywialnie odgadnąć pozostałe. To właśnie dlatego NIST teraz zaleca rezygnację z obowiązkowych okresowych zmian haseł.',
      ],
      bullets: [
        'Nigdy nie używaj słów ze słownika bez modyfikacji',
        'Unikaj informacji osobistych (imiona, daty, adresy)',
        'Nie używaj wzorów klawiaturowych ani sekwencji',
        'Nigdy nie używaj haseł ponownie na wielu kontach',
        'Unikaj prostych podstawień znaków (@ za a, 3 za e)',
        'Nie inkrementuj haseł (Password1, Password2 itd.)',
      ],
    },
    {
      heading: 'Menedżery haseł: najlepsza inwestycja w bezpieczeństwo',
      paragraphs: [
        'Menedżer haseł generuje, przechowuje i automatycznie wypełnia unikalne losowe hasła dla każdego konta. Wiodące opcje to 1Password, Bitwarden (open source) i KeePass (offline). Każdy używa szyfrowania AES-256 do ochrony twojego sejfu, z hasłem głównym jako kluczem deszyfrującym.',
        'Główna zaleta to całkowite wyeliminowanie ponownego używania haseł. Z menedżerem haseł każde konto otrzymuje unikalne losowe hasło o długości 20+ znaków. Musisz zapamiętać tylko jedno silne hasło główne. Większość menedżerów ostrzega również, gdy hasła pojawiają się w znanych bazach wycieków.',
        'Wybierz menedżer, który obsługuje twoje urządzenia i przeglądarki, oferuje dostęp awaryjny dla zaufanych kontaktów i przeszedł niezależne audyty bezpieczeństwa. Bitwarden to doskonała darmowa opcja z otwartym kodem, który każdy może zaudytować. Dla zespołów 1Password Business lub Bitwarden Organizations zapewniają funkcje współdzielonego sejfu.',
      ],
    },
    {
      heading: 'Poza hasłami: uwierzytelnianie wieloskładnikowe',
      paragraphs: [
        'Nawet najsilniejsze hasło może zostać skompromitowane przez phishing, keyloggery lub naruszenia po stronie serwera. Uwierzytelnianie wieloskładnikowe (MFA) dodaje drugi krok weryfikacji — zazwyczaj jednorazowe hasło oparte na czasie (TOTP) z aplikacji takiej jak Google Authenticator lub Authy, lub sprzętowy klucz bezpieczeństwa jak YubiKey.',
        'Włącz MFA na każdym koncie, które to obsługuje, priorytetowo traktując e-mail (twoje centrum odzyskiwania), bankowość, przechowywanie w chmurze i media społecznościowe. Sprzętowe klucze bezpieczeństwa (FIDO2/WebAuthn) zapewniają najsilniejszą ochronę przed phishingiem, ponieważ weryfikują rzeczywistą domenę strony internetowej przed uwierzytelnieniem.',
        'Przechowuj kody zapasowe MFA w swoim menedżerze haseł lub w oddzielnym bezpiecznym miejscu. Utrata dostępu do urządzenia MFA bez kodów zapasowych może trwale zablokować dostęp do twoich kont.',
      ],
    },
  ],
};

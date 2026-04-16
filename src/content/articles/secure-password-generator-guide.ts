import type { LocalizedArticleContent } from '../articles';

export const en: LocalizedArticleContent = {
  title: 'Secure Password Generator: Full Guide to Safe Online Generation',
  excerpt:
    'How to configure password length, character sets, and standards for safer generated passwords. Covers CSPRNG, browser-based generation, and best practices for using password generators without registration.',
  seoTitle: 'Secure Password Generator Guide — No Registration Required | generatepasswordto.me',
  seoDescription:
    'Complete guide to using secure password generators safely. Covers how CSPRNG works, browser-based generation, recommended settings, and why no-registration generators protect your privacy.',
  keywords: [
    'secure password generator guide',
    'password generator without registration',
    'random password tool',
    'CSPRNG password generation',
    'password generator settings',
    'safe online password generator',
  ],
  sections: [
    {
      heading: 'Why Use a Password Generator?',
      paragraphs: [
        'Humans are fundamentally incapable of generating truly random passwords. Decades of research in cognitive psychology confirm that when people try to create "random" strings, they default to patterns: familiar letter sequences, keyboard adjacencies, personal associations, and cultural biases. A 2019 study at the University of Cambridge found that human-generated "random" passwords had 30-50% less entropy than truly random passwords of the same length.',
        'A password generator solves this by using a cryptographically secure pseudorandom number generator (CSPRNG) to select each character independently and uniformly from the defined character set. The result is a password with maximum entropy for its length — no patterns, no biases, no weaknesses.',
        'The security difference is measurable. A human-created 12-character password that looks random (like "kT9mP2xWq5rL") might have 40-60 bits of effective entropy due to unconscious patterns. A truly random 12-character password from the full printable ASCII set has 79 bits. That difference represents billions of years of additional cracking time.',
      ],
    },
    {
      heading: 'How Cryptographically Secure Generation Works',
      paragraphs: [
        'Modern browser-based password generators use the Web Crypto API, specifically the crypto.getRandomValues() function, which provides access to the operating system\'s CSPRNG. On Linux, this draws from /dev/urandom (seeded by hardware noise from interrupts, disk activity, and network events). On Windows, it uses BCryptGenRandom. On macOS, it uses SecRandomCopyBytes.',
        'The critical property of a CSPRNG is that its output is computationally indistinguishable from true randomness. Even if an attacker observes a million previous outputs, they cannot predict the next output with probability better than random chance. This is fundamentally different from JavaScript\'s Math.random(), which uses a deterministic algorithm (typically xoshiro256++) that is NOT suitable for security purposes.',
        'Our password generator at generatepasswordto.me runs entirely in your browser. No password is ever sent to any server. The generation happens locally using your device\'s CSPRNG through the Web Crypto API. You can verify this by disconnecting from the internet and confirming the generator still works — or by inspecting the source code, which is open source on GitHub.',
      ],
    },
    {
      heading: 'Recommended Password Length and Character Settings',
      paragraphs: [
        'For passwords stored in a password manager (where you never type them manually), use the maximum practical length. We recommend 20-24 characters as a standard baseline, using all four character classes: uppercase letters (A-Z), lowercase letters (a-z), digits (0-9), and symbols (!@#$%^&*). This provides approximately 131-157 bits of entropy — far beyond what any current or foreseeable technology can brute-force.',
        'For passwords you must type occasionally (Wi-Fi passwords, device PINs, offline encryption), 16 characters with all four classes provides approximately 105 bits of entropy — more than sufficient for any threat model. If the target system does not accept special characters (some legacy systems restrict this), 20 characters using letters and digits provides approximately 119 bits.',
        'For passphrases, use at least 5 words from a large word list (7,776+ words) for approximately 65 bits of entropy. For critical passphrases (master passwords, full-disk encryption), use 6-7 words for 78-91 bits. Our generator supports both random character and passphrase generation modes.',
      ],
      bullets: [
        'Password manager passwords: 20-24 characters, all character classes',
        'Typed passwords: 16 characters minimum, all character classes',
        'Legacy systems (no symbols): 20 characters, letters + digits',
        'Passphrases: 5 words minimum, 6-7 for critical accounts',
        'PINs: 8+ digits when possible (avoid 4-digit PINs)',
        'Wi-Fi passwords: 20+ characters (WPA3 supports up to 63)',
      ],
    },
    {
      heading: 'Why No-Registration Generators Are Safer',
      paragraphs: [
        'Many password generators require you to create an account before generating passwords. This is a red flag for several reasons. First, the account itself becomes a target — if the service is breached, the attacker knows which passwords you generated and potentially which services they were for. Second, requiring registration implies server-side generation, which means your passwords travel over the network and are at least temporarily present on the server.',
        'A no-registration generator like generatepasswordto.me operates entirely client-side. There is no account, no server communication, and no data retention. Your generated passwords exist only in your browser\'s memory until you copy them. Closing the tab erases them permanently. This architecture eliminates an entire category of risk.',
        'How to verify a generator is truly client-side: open your browser\'s developer tools (F12), go to the Network tab, generate a password, and check that no HTTP requests were made during generation. You should see zero outbound requests. If the generator makes any API calls during password generation, your password may be exposed.',
        'Additional privacy considerations: avoid generators that show ads (ad networks track user behavior and can potentially access page content); prefer generators with open-source code (you can verify the generation algorithm); and ensure the generator uses HTTPS (to prevent man-in-the-middle attacks on the page itself).',
      ],
    },
    {
      heading: 'Compliance-Aligned Generation: NIST and PCI DSS',
      paragraphs: [
        'NIST 800-63B does not specify how passwords should be generated, but its emphasis on length, randomness, and breach checking aligns perfectly with password generator best practices. A generator that produces 16+ character random passwords from a large character set satisfies NIST\'s intent for strong memorized secrets. Combined with HIBP breach checking (which our generator includes), you can create passwords that are both cryptographically strong and verified against known compromises.',
        'PCI DSS v4.0 requires passwords of at least 12 characters containing both alphabetic and numeric characters. Our generator\'s default settings exceed these requirements. For organizations handling payment data, generating passwords with a compliant tool provides documentation of due diligence in meeting Requirement 8.3.6.',
        'For organizations implementing automated password generation in their systems (user registration, password resets, temporary credentials), use server-side CSPRNG functions: Python\'s secrets module, Node.js\'s crypto.randomBytes(), Java\'s SecureRandom, or .NET\'s RandomNumberGenerator. Never use general-purpose random functions (random(), Math.random(), rand()) for security purposes.',
      ],
    },
    {
      heading: 'Common Generator Mistakes to Avoid',
      paragraphs: [
        'Generating a password and then modifying it. Users sometimes generate a random password, then change a few characters to something "memorable." This drastically reduces entropy because the modifications follow human patterns. If you need a memorable password, use the passphrase mode instead of modifying a random character password.',
        'Using the same generated password for multiple accounts. The point of a generator is to create unique passwords effortlessly. If you generate one password and reuse it across sites, you have defeated the entire purpose. Generate a new password for every account, every time.',
        'Storing generated passwords in plain text. After generating a secure password, do not paste it into a text file, sticky note, or unencrypted document. Copy it directly into your password manager. If you must temporarily store it elsewhere, delete the temporary copy immediately after saving it in the manager.',
        'Ignoring excluded character sets when required. Some services do not accept certain special characters in passwords. If your generated password is rejected, regenerate it with the appropriate character restrictions rather than manually removing characters (which introduces bias). Our generator allows you to customize which character classes are included.',
      ],
    },
    {
      heading: 'Step-by-Step: Generating Your First Secure Password',
      paragraphs: [
        'Step 1: Navigate to generatepasswordto.me. No account creation, no registration, no personal information required. The generator loads entirely in your browser.',
        'Step 2: Configure your settings. For most accounts, set length to 20 characters and enable all character classes (uppercase, lowercase, digits, symbols). For accounts with character restrictions, adjust accordingly.',
        'Step 3: Click Generate. The password is created using your browser\'s built-in CSPRNG. No data is sent to any server.',
        'Step 4: Optionally, use the built-in strength meter to verify the password\'s entropy. Our meter uses the zxcvbn library, which estimates crack time based on pattern matching rather than simple character counting.',
        'Step 5: Use the breach check feature to verify the password has not appeared in any known data breach. This sends only the first 5 characters of the SHA-1 hash to the Have I Been Pwned API — your actual password is never transmitted.',
        'Step 6: Copy the password directly to your password manager. Do not paste it anywhere else. Your generated password is now secured.',
      ],
      bullets: [
        'No registration required — fully client-side generation',
        'Customize length and character classes',
        'Built-in strength meter (zxcvbn library)',
        'Breach check via Have I Been Pwned (k-anonymity)',
        'Open-source code on GitHub for verification',
        'Supports 11 languages including Ukrainian and English',
      ],
    },
    {
      heading: 'Technical Details for Developers',
      paragraphs: [
        'For developers building password generation features, here are the key implementation requirements. Use only CSPRNG sources: Web Crypto API (browser), crypto.randomBytes() (Node.js), secrets.token_bytes() (Python), SecureRandom (Java), or RandomNumberGenerator (C#/.NET). Validate that your random source is properly seeded by the operating system.',
        'Generate passwords by selecting indices into the character set uniformly at random. Be aware of modulo bias: if your CSPRNG produces values in a range that is not a multiple of your character set size, the last few characters in the set will be slightly less likely. Use rejection sampling to eliminate this bias: generate a random value, and if it falls in the biased range, discard it and generate again.',
        'Never log generated passwords, even temporarily. Ensure passwords are held in memory only as long as necessary and are not captured by error reporting, analytics, or debugging tools. In web applications, consider using JavaScript\'s FinalizationRegistry or manual memory clearing to reduce exposure.',
        'Test your generator by running statistical randomness tests on its output. The NIST Statistical Test Suite (SP 800-22) can verify that your output is indistinguishable from true randomness. Alternatively, use simpler checks: character frequency should be approximately uniform, and sequential characters should show no correlation.',
      ],
    },
  ],
};

export const ua: LocalizedArticleContent = {
  title: 'Генератор паролів: повний гід з безпечної онлайн-генерації',
  excerpt:
    'Як налаштувати довжину пароля, набори символів та стандарти для безпечних згенерованих паролів. Охоплює CSPRNG, генерацію в браузері та найкращі практики генераторів без реєстрації.',
  seoTitle: 'Генератор паролів без реєстрації — безпечний гід | generatepasswordto.me',
  seoDescription:
    'Повний гід з безпечного використання генераторів паролів. Як працює CSPRNG, генерація в браузері, рекомендовані налаштування та чому генератори без реєстрації захищають конфіденційність.',
  keywords: [
    'безпечний генератор паролів гід',
    'генератор паролів без реєстрації',
    'інструмент випадкових паролів',
    'CSPRNG генерація паролів',
    'налаштування генератора паролів',
    'безпечний онлайн генератор паролів',
  ],
  sections: [
    {
      heading: 'Чому варто використовувати генератор паролів?',
      paragraphs: [
        'Люди фундаментально нездатні генерувати дійсно випадкові паролі. Десятиліття досліджень у когнітивній психології підтверджують: коли люди намагаються створити "випадкові" рядки, вони повертаються до шаблонів: знайомі послідовності літер, клавіатурні сусідства, особисті асоціації та культурні упередження. Дослідження 2019 року в Кембриджському університеті показало, що паролі, "випадково" створені людьми, мали на 30-50% менше ентропії.',
        'Генератор паролів вирішує це, використовуючи криптографічно безпечний генератор псевдовипадкових чисел (CSPRNG) для незалежного та рівномірного вибору кожного символу з визначеного набору. Результат — пароль з максимальною ентропією для своєї довжини.',
        'Різниця в безпеці вимірювана. Створений людиною 12-символьний пароль, що виглядає випадковим, може мати 40-60 бітів ефективної ентропії через несвідомі шаблони. Дійсно випадковий 12-символьний пароль має 79 бітів. Ця різниця — мільярди років додаткового часу злому.',
      ],
    },
    {
      heading: 'Як працює криптографічно безпечна генерація',
      paragraphs: [
        'Сучасні браузерні генератори паролів використовують Web Crypto API, зокрема функцію crypto.getRandomValues(), що надає доступ до CSPRNG операційної системи. На Linux це /dev/urandom (засіяний апаратним шумом). На Windows — BCryptGenRandom. На macOS — SecRandomCopyBytes.',
        'Критична властивість CSPRNG — його вихід обчислювально невідрізнимий від справжньої випадковості. Навіть спостерігаючи мільйон попередніх виходів, неможливо передбачити наступний. Це принципово відрізняється від Math.random() JavaScript, який використовує детерміністичний алгоритм, НЕ придатний для безпеки.',
        'Наш генератор на generatepasswordto.me працює повністю у вашому браузері. Жоден пароль ніколи не надсилається на сервер. Генерація відбувається локально через Web Crypto API. Ви можете перевірити це, відключившись від інтернету — або переглянувши відкритий код на GitHub.',
      ],
    },
    {
      heading: 'Рекомендовані налаштування довжини та символів',
      paragraphs: [
        'Для паролів у менеджері паролів (які ви ніколи не набираєте): 20-24 символи з усіма чотирма класами символів (великі літери, малі літери, цифри, символи). Це забезпечує приблизно 131-157 бітів ентропії — далеко за межами будь-якої поточної або передбачуваної технології злому.',
        'Для паролів, які потрібно іноді набирати (Wi-Fi, PIN пристроїв): 16 символів з усіма класами дає приблизно 105 бітів. Якщо система не приймає спеціальні символи, 20 символів з літерами та цифрами дають приблизно 119 бітів.',
        'Для парольних фраз: мінімум 5 слів з великого списку (7 776+ слів) для приблизно 65 бітів. Для критичних парольних фраз (мастер-паролі) — 6-7 слів для 78-91 біта.',
      ],
      bullets: [
        'Паролі менеджера: 20-24 символи, всі класи',
        'Паролі для набору: мінімум 16 символів',
        'Застарілі системи (без символів): 20 символів, літери + цифри',
        'Парольні фрази: мінімум 5 слів, 6-7 для критичних',
        'PIN-коди: 8+ цифр коли можливо',
        'Wi-Fi паролі: 20+ символів (WPA3 до 63)',
      ],
    },
    {
      heading: 'Чому генератори без реєстрації безпечніші',
      paragraphs: [
        'Багато генераторів вимагають створення акаунту. Це тривожний знак. По-перше, сам акаунт стає ціллю. По-друге, вимога реєстрації передбачає генерацію на стороні сервера, тобто ваші паролі подорожують мережею.',
        'Генератор без реєстрації, як generatepasswordto.me, працює повністю на стороні клієнта. Ніякого акаунту, ніякої серверної комунікації, ніякого зберігання даних. Згенеровані паролі існують лише в пам\'яті браузера до копіювання. Закриття вкладки стирає їх назавжди.',
        'Як перевірити, що генератор дійсно клієнтський: відкрийте інструменти розробника (F12), вкладку Network, згенеруйте пароль і переконайтесь, що HTTP-запитів не було. Якщо генератор робить API-виклики під час генерації — ваш пароль може бути розкритий.',
        'Додатково: уникайте генераторів з рекламою; віддавайте перевагу відкритому коду; переконайтесь у використанні HTTPS.',
      ],
    },
    {
      heading: 'Генерація відповідно до стандартів: NIST та PCI DSS',
      paragraphs: [
        'NIST 800-63B не вказує, як паролі повинні генеруватися, але наголос на довжині, випадковості та перевірці витоків ідеально узгоджується з генераторами. Генератор, що створює 16+ символьні випадкові паролі, задовольняє наміри NIST для надійних секретів.',
        'PCI DSS v4.0 вимагає паролів щонайменше 12 символів з буквами та цифрами. Стандартні налаштування нашого генератора перевищують ці вимоги.',
        'Для розробників: використовуйте серверні CSPRNG-функції: secrets Python, crypto.randomBytes() Node.js, SecureRandom Java або RandomNumberGenerator .NET. Ніколи не використовуйте загальні функції випадковості (random(), Math.random()) для безпеки.',
      ],
    },
    {
      heading: 'Поширені помилки при використанні генератора',
      paragraphs: [
        'Генерація пароля і потім його модифікація. Користувачі іноді генерують випадковий пароль, потім змінюють кілька символів. Це драматично знижує ентропію. Якщо потрібен запам\'ятовуваний пароль, використовуйте режим парольних фраз.',
        'Використання одного згенерованого пароля для кількох акаунтів. Сенс генератора — створювати унікальні паролі без зусиль. Генеруйте новий пароль для кожного акаунту.',
        'Зберігання згенерованих паролів у відкритому тексті. Після генерації не вставляйте пароль у текстовий файл або стікер. Копіюйте безпосередньо в менеджер паролів.',
        'Ігнорування обмежень символів. Деякі сервіси не приймають певні спеціальні символи. Перегенеруйте з відповідними обмеженнями, а не видаляйте символи вручну.',
      ],
    },
    {
      heading: 'Покрокова інструкція: генерація першого пароля',
      paragraphs: [
        'Крок 1: Перейдіть на generatepasswordto.me. Ніякої реєстрації чи особистої інформації.',
        'Крок 2: Налаштуйте параметри. Для більшості акаунтів: довжина 20 символів, всі класи символів увімкнені.',
        'Крок 3: Натисніть Генерувати. Пароль створюється вашим браузерним CSPRNG. Жодні дані не надсилаються на сервер.',
        'Крок 4: Перевірте надійність вбудованим метром на основі бібліотеки zxcvbn.',
        'Крок 5: Використайте функцію перевірки на витоки через Have I Been Pwned API (k-анонімність — лише перші 5 символів хешу).',
        'Крок 6: Скопіюйте пароль безпосередньо в менеджер паролів.',
      ],
      bullets: [
        'Без реєстрації — повністю клієнтська генерація',
        'Налаштування довжини та класів символів',
        'Вбудований метр надійності (бібліотека zxcvbn)',
        'Перевірка витоків через Have I Been Pwned (k-анонімність)',
        'Відкритий код на GitHub для перевірки',
        'Підтримка 11 мов, включаючи українську та англійську',
      ],
    },
  ],
};

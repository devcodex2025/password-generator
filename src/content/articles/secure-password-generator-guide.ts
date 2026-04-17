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

export const es: LocalizedArticleContent = {
  title: 'Guía del generador de contraseñas seguro: cómo funciona y por qué importa',
  excerpt: 'Cómo funcionan los generadores de contraseñas seguros por dentro. CSPRNG, Web Crypto API, entropía, generación sin registro y cumplimiento NIST/PCI DSS.',
  seoTitle: 'Generador de contraseñas seguro — Cómo funciona | generatepasswordto.me',
  seoDescription: 'Guía técnica sobre generadores de contraseñas seguros. CSPRNG, Web Crypto API, cálculos de entropía y por qué los generadores sin registro son más seguros.',
  keywords: ['generador contraseñas seguro', 'cómo funciona generador contraseñas', 'CSPRNG explicado', 'Web Crypto API contraseñas', 'generador sin registro', 'entropía contraseñas'],
  sections: [
    { heading: '¿Qué hace "seguro" a un generador de contraseñas?', paragraphs: ['Un generador seguro usa un CSPRNG (Generador de Números Pseudoaleatorios Criptográficamente Seguro). En navegadores, esto es la Web Crypto API (crypto.getRandomValues()). Math.random() NO es criptográficamente seguro.', 'La diferencia es predecibilidad. Math.random() usa algoritmos deterministas que pueden revertirse con suficientes muestras. Los CSPRNG obtienen entropía del hardware del sistema — interrupciones de dispositivos, jitter de CPU, ruido térmico.', 'Segundo requisito: distribución uniforme. Cada carácter en el espacio de contraseña debe tener exactamente la misma probabilidad.'] },
    { heading: 'La matemática de la entropía de contraseñas', paragraphs: ['La entropía mide la imprevisibilidad en bits: E = log₂(C^L), donde C es el tamaño del conjunto y L la longitud.', '12 caracteres del conjunto completo (95 ASCII imprimibles) = 78.8 bits. 16 caracteres = 105 bits. 20 caracteres = 131.4 bits.', 'Un atacante con capacidad de 1 billón de intentos/segundo necesitaría 9.6 × 10¹³ años para fuerza bruta de 128 bits de entropía.'] },
    { heading: 'Tipos de generadores de contraseñas', paragraphs: ['Generadores de caracteres aleatorios: mayor entropía por carácter. Ideal para cuentas almacenadas en gestor de contraseñas.', 'Generadores de frases: concatenan palabras aleatorias del diccionario. Menor densidad de entropía pero mucho más memorables.', 'Generadores de PIN: subconjunto de generadores de caracteres limitado a dígitos. 8 dígitos = solo 26.6 bits.', 'Generadores híbridos: combinan palabras con separadores y modificadores.'] },
    { heading: 'Ajustes recomendados por caso de uso', paragraphs: ['Elige la longitud y complejidad según la sensibilidad de la cuenta y la capacidad humana.'], bullets: ['Cuentas generales: 16 caracteres, todos los tipos', 'Alta seguridad (banca, crypto): 20+ caracteres, todos los tipos', 'Contraseña maestra: frase de 5-6 palabras', 'Sistemas legacy: 20 caracteres, letras + números', 'Wi-Fi: 20+ caracteres (WPA3 hasta 63)', 'PINs: 8+ dígitos cuando sea posible'] },
    { heading: 'Por qué los generadores sin registro son más seguros', paragraphs: ['Muchos generadores requieren crear cuenta. Señal de alarma. La cuenta se vuelve un objetivo y la generación probablemente es del lado del servidor.', 'Un generador sin registro como generatepasswordto.me funciona completamente del lado del cliente. Sin cuenta, sin comunicación con servidor, sin almacenamiento.', 'Cómo verificar: abra DevTools (F12), pestaña Network, genere una contraseña y confirme que no hubo peticiones HTTP.'] },
    { heading: 'Generación según estándares: NIST y PCI DSS', paragraphs: ['NIST 800-63B no especifica cómo generar contraseñas, pero el énfasis en longitud y aleatoriedad se alinea con generadores. 16+ caracteres aleatorios satisfacen la intención NIST.', 'PCI DSS v4.0 requiere mínimo 12 caracteres. Nuestros ajustes predeterminados superan estos requisitos.', 'Para desarrolladores: usen CSPRNG del servidor: secrets de Python, crypto.randomBytes() de Node.js, SecureRandom de Java.'] },
    { heading: 'Errores comunes al usar un generador', paragraphs: ['Generar y luego modificar la contraseña. Esto reduce la entropía dramáticamente.', 'Usar la misma contraseña generada para múltiples cuentas.', 'Guardar contraseñas generadas en texto plano.', 'Ignorar restricciones de caracteres del servicio.'] },
    { heading: 'Guía paso a paso: genera tu primera contraseña', paragraphs: ['Paso 1: Ve a generatepasswordto.me. Sin registro.', 'Paso 2: Configura parámetros. Para la mayoría: 20 caracteres, todas las clases.', 'Paso 3: Genera. Tu navegador CSPRNG crea la contraseña.', 'Paso 4: Verifica fortaleza con el medidor zxcvbn integrado.', 'Paso 5: Verifica filtraciones vía Have I Been Pwned (k-anonimato).', 'Paso 6: Copia directamente al gestor de contraseñas.'], bullets: ['Sin registro — generación 100% del lado del cliente', 'Longitud y clases de caracteres configurables', 'Medidor de fortaleza integrado (zxcvbn)', 'Verificación de filtraciones vía HIBP (k-anonimato)', 'Código abierto en GitHub', 'Soporte para 11 idiomas'] },
  ],
};

export const fr: LocalizedArticleContent = {
  title: 'Guide du générateur de mots de passe sécurisé : comment ça marche',
  excerpt: 'Comment fonctionnent les générateurs de mots de passe sécurisés. CSPRNG, Web Crypto API, entropie, génération sans inscription et conformité NIST/PCI DSS.',
  seoTitle: 'Générateur de mots de passe sécurisé — Comment ça marche | generatepasswordto.me',
  seoDescription: 'Guide technique sur les générateurs de mots de passe. CSPRNG, Web Crypto API, calculs d\'entropie et pourquoi les générateurs sans inscription sont plus sûrs.',
  keywords: ['générateur mots de passe sécurisé', 'comment fonctionne générateur', 'CSPRNG expliqué', 'Web Crypto API mots de passe', 'générateur sans inscription', 'entropie mots de passe'],
  sections: [
    { heading: 'Qu\'est-ce qui rend un générateur « sécurisé » ?', paragraphs: ['Un générateur sécurisé utilise un CSPRNG. Dans les navigateurs, c\'est la Web Crypto API (crypto.getRandomValues()). Math.random() n\'est PAS cryptographiquement sûr.', 'La différence est la prévisibilité. Les CSPRNG tirent l\'entropie du matériel système.', 'Distribution uniforme requise : chaque caractère a exactement la même probabilité.'] },
    { heading: 'Les mathématiques de l\'entropie', paragraphs: ['E = log₂(C^L). 12 caractères du jeu complet = 78,8 bits. 16 caractères = 105 bits. 20 = 131,4 bits.', 'Un attaquant à 1 billion d\'essais/seconde aurait besoin de 9,6 × 10¹³ ans pour 128 bits.'] },
    { heading: 'Types de générateurs', paragraphs: ['Caractères aléatoires : entropie maximale par caractère. Idéal avec un gestionnaire.', 'Phrases de passe : mots aléatoires du dictionnaire. Moins dense mais plus mémorable.', 'PIN : sous-ensemble de chiffres. 8 chiffres = 26,6 bits seulement.', 'Hybrides : mots + séparateurs + modificateurs.'] },
    { heading: 'Réglages recommandés par cas', paragraphs: ['Adaptez longueur et complexité selon la sensibilité.'], bullets: ['Comptes généraux : 16 caractères, tous types', 'Haute sécurité : 20+, tous types', 'Mot de passe maître : phrase 5-6 mots', 'Systèmes legacy : 20 caractères, lettres + chiffres', 'Wi-Fi : 20+ caractères', 'PIN : 8+ chiffres si possible'] },
    { heading: 'Pourquoi les générateurs sans inscription sont plus sûrs', paragraphs: ['Beaucoup exigent un compte — signe d\'alerte. Le compte devient une cible.', 'generatepasswordto.me fonctionne entièrement côté client.', 'Vérifiez : DevTools (F12), onglet Network, aucune requête HTTP lors de la génération.'] },
    { heading: 'Conformité NIST et PCI DSS', paragraphs: ['NIST 800-63B s\'aligne avec les générateurs. 16+ caractères aléatoires satisfont l\'intention.', 'PCI DSS v4.0 exige 12 caractères minimum. Nos réglages dépassent ces exigences.', 'Développeurs : utilisez les CSPRNG serveur appropriés.'] },
    { heading: 'Erreurs courantes', paragraphs: ['Modifier la sortie du générateur réduit l\'entropie.', 'Réutiliser un mot de passe généré pour plusieurs comptes.', 'Stocker en texte clair.', 'Ignorer les restrictions de caractères du service.'] },
    { heading: 'Guide étape par étape', paragraphs: ['Étape 1 : Allez sur generatepasswordto.me.', 'Étape 2 : Configurez. 20 caractères, toutes les classes.', 'Étape 3 : Générez. CSPRNG local.', 'Étape 4 : Vérifiez la force (zxcvbn).', 'Étape 5 : Vérification HIBP (k-anonymat).', 'Étape 6 : Copiez dans le gestionnaire.'], bullets: ['Sans inscription', 'Longueur et classes configurables', 'Indicateur de force (zxcvbn)', 'Vérification HIBP', 'Open source', '11 langues supportées'] },
  ],
};

export const de: LocalizedArticleContent = {
  title: 'Leitfaden zum sicheren Passwort-Generator: Wie er funktioniert',
  excerpt: 'Wie sichere Passwort-Generatoren funktionieren. CSPRNG, Web Crypto API, Entropie, Generierung ohne Registrierung und NIST/PCI DSS Konformität.',
  seoTitle: 'Sicherer Passwort-Generator — Wie er funktioniert | generatepasswordto.me',
  seoDescription: 'Technischer Leitfaden zu sicheren Passwort-Generatoren. CSPRNG, Web Crypto API, Entropieberechnungen und warum Generatoren ohne Registrierung sicherer sind.',
  keywords: ['sicherer Passwort-Generator', 'wie Passwort-Generator funktioniert', 'CSPRNG erklärt', 'Web Crypto API Passwörter', 'Generator ohne Registrierung', 'Passwort-Entropie'],
  sections: [
    { heading: 'Was macht einen Generator „sicher"?', paragraphs: ['Ein sicherer Generator nutzt CSPRNG. Im Browser: Web Crypto API (crypto.getRandomValues()). Math.random() ist NICHT kryptographisch sicher.', 'CSPRNGs beziehen Entropie von System-Hardware.', 'Gleichmäßige Verteilung: jedes Zeichen hat die gleiche Wahrscheinlichkeit.'] },
    { heading: 'Die Mathematik der Entropie', paragraphs: ['E = log₂(C^L). 12 Zeichen = 78,8 Bit. 16 = 105 Bit. 20 = 131,4 Bit.', '1 Billion Versuche/Sekunde = 9,6 × 10¹³ Jahre für 128 Bit.'] },
    { heading: 'Generator-Typen', paragraphs: ['Zufällige Zeichen: maximale Entropie pro Zeichen.', 'Passphrasen: zufällige Wörter. Weniger dicht aber merkbarer.', 'PIN: nur Ziffern. 8 Ziffern = nur 26,6 Bit.', 'Hybrid: Wörter + Trennzeichen.'] },
    { heading: 'Empfohlene Einstellungen', paragraphs: ['Passen Sie Länge und Komplexität an.'], bullets: ['Allgemein: 16 Zeichen, alle Typen', 'Hohe Sicherheit: 20+', 'Master-Passwort: 5-6 Wort Passphrase', 'Legacy: 20 Zeichen, Buchstaben + Zahlen', 'Wi-Fi: 20+', 'PINs: 8+ Ziffern'] },
    { heading: 'Warum Generatoren ohne Registrierung sicherer sind', paragraphs: ['Kontoerstellung = Warnsignal. generatepasswordto.me arbeitet komplett clientseitig.', 'Überprüfung: DevTools, Network-Tab, keine HTTP-Anfragen.'] },
    { heading: 'NIST und PCI DSS Konformität', paragraphs: ['NIST 800-63B passt zu Generatoren. 16+ zufällige Zeichen erfüllen die Intention.', 'PCI DSS v4.0 fordert 12 Zeichen Minimum.', 'Entwickler: Server-CSPRNGs verwenden.'] },
    { heading: 'Häufige Fehler', paragraphs: ['Generierte Ausgabe ändern reduziert Entropie.', 'Wiederverwendung generierter Passwörter.', 'Speicherung im Klartext.', 'Zeichenbeschränkungen ignorieren.'] },
    { heading: 'Schritt-für-Schritt-Anleitung', paragraphs: ['Schritt 1: generatepasswordto.me besuchen.', 'Schritt 2: 20 Zeichen, alle Klassen.', 'Schritt 3: Generieren. Lokaler CSPRNG.', 'Schritt 4: Stärke prüfen (zxcvbn).', 'Schritt 5: HIBP-Prüfung.', 'Schritt 6: In Passwort-Manager kopieren.'], bullets: ['Ohne Registrierung', 'Konfigurierbar', 'Stärkeanzeige (zxcvbn)', 'HIBP-Prüfung', 'Open Source', '11 Sprachen'] },
  ],
};

export const it: LocalizedArticleContent = {
  title: 'Guida al generatore di password sicuro: come funziona e perché è importante',
  excerpt: 'Come funzionano i generatori di password sicuri. CSPRNG, Web Crypto API, entropia, generazione senza registrazione e conformità NIST/PCI DSS.',
  seoTitle: 'Generatore password sicuro — Come funziona | generatepasswordto.me',
  seoDescription: 'Guida tecnica sui generatori di password sicuri. CSPRNG, Web Crypto API, calcoli di entropia e perché i generatori senza registrazione sono più sicuri.',
  keywords: ['generatore password sicuro', 'come funziona generatore password', 'CSPRNG spiegato', 'Web Crypto API password', 'generatore senza registrazione', 'entropia password'],
  sections: [
    { heading: 'Cosa rende un generatore "sicuro"?', paragraphs: ['Un generatore sicuro usa CSPRNG. Nel browser: Web Crypto API (crypto.getRandomValues()). Math.random() NON è crittograficamente sicuro.', 'I CSPRNG ottengono entropia dall\'hardware di sistema.', 'Distribuzione uniforme richiesta.'] },
    { heading: 'La matematica dell\'entropia', paragraphs: ['E = log₂(C^L). 12 caratteri = 78,8 bit. 16 = 105 bit. 20 = 131,4 bit.', '1 trilione di tentativi/sec = 9,6 × 10¹³ anni per 128 bit.'] },
    { heading: 'Tipi di generatori', paragraphs: ['Caratteri casuali: massima entropia per carattere.', 'Frasi: parole casuali dal dizionario. Meno denso ma più memorabile.', 'PIN: solo cifre. 8 cifre = solo 26,6 bit.', 'Ibridi: parole + separatori.'] },
    { heading: 'Impostazioni consigliate', paragraphs: ['Adattare lunghezza e complessità alla sensibilità.'], bullets: ['Generali: 16 caratteri, tutti i tipi', 'Alta sicurezza: 20+', 'Password master: frase 5-6 parole', 'Legacy: 20 caratteri, lettere + numeri', 'Wi-Fi: 20+', 'PIN: 8+ cifre'] },
    { heading: 'Perché i generatori senza registrazione sono più sicuri', paragraphs: ['Registrazione = segnale d\'allarme. generatepasswordto.me funziona completamente lato client.', 'Verifica: DevTools, tab Network, nessuna richiesta HTTP.'] },
    { heading: 'Conformità NIST e PCI DSS', paragraphs: ['NIST 800-63B si allinea con i generatori. 16+ caratteri casuali soddisfano l\'intento.', 'PCI DSS v4.0 richiede minimo 12 caratteri.', 'Sviluppatori: usate CSPRNG lato server.'] },
    { heading: 'Errori comuni', paragraphs: ['Modificare l\'output riduce l\'entropia.', 'Riutilizzare password generate.', 'Salvare in testo semplice.', 'Ignorare le restrizioni di caratteri.'] },
    { heading: 'Guida passo passo', paragraphs: ['Passo 1: Vai su generatepasswordto.me.', 'Passo 2: 20 caratteri, tutte le classi.', 'Passo 3: Genera. CSPRNG locale.', 'Passo 4: Verifica forza (zxcvbn).', 'Passo 5: Verifica HIBP.', 'Passo 6: Copia nel gestore password.'], bullets: ['Senza registrazione', 'Configurabile', 'Indicatore di forza (zxcvbn)', 'Verifica HIBP', 'Open source', '11 lingue supportate'] },
  ],
};

export const pt: LocalizedArticleContent = {
  title: 'Guia do gerador de senhas seguro: como funciona e por que importa',
  excerpt: 'Como funcionam os geradores de senhas seguros. CSPRNG, Web Crypto API, entropia, geração sem registro e conformidade NIST/PCI DSS.',
  seoTitle: 'Gerador de senhas seguro — Como funciona | generatepasswordto.me',
  seoDescription: 'Guia técnico sobre geradores de senhas seguros. CSPRNG, Web Crypto API, cálculos de entropia e por que geradores sem registro são mais seguros.',
  keywords: ['gerador senhas seguro', 'como funciona gerador senhas', 'CSPRNG explicado', 'Web Crypto API senhas', 'gerador sem registro', 'entropia senhas'],
  sections: [
    { heading: 'O que torna um gerador "seguro"?', paragraphs: ['Um gerador seguro usa CSPRNG. No navegador: Web Crypto API (crypto.getRandomValues()). Math.random() NÃO é criptograficamente seguro.', 'CSPRNGs obtêm entropia do hardware do sistema.', 'Distribuição uniforme necessária.'] },
    { heading: 'A matemática da entropia', paragraphs: ['E = log₂(C^L). 12 caracteres = 78,8 bits. 16 = 105 bits. 20 = 131,4 bits.', '1 trilhão de tentativas/seg = 9,6 × 10¹³ anos para 128 bits.'] },
    { heading: 'Tipos de geradores', paragraphs: ['Caracteres aleatórios: máxima entropia por caractere.', 'Frases-senha: palavras aleatórias. Menos denso mas mais memorável.', 'PIN: apenas dígitos. 8 dígitos = 26,6 bits.', 'Híbridos: palavras + separadores.'] },
    { heading: 'Configurações recomendadas', paragraphs: ['Adapte comprimento e complexidade à sensibilidade.'], bullets: ['Gerais: 16 caracteres, todos os tipos', 'Alta segurança: 20+', 'Senha mestra: frase 5-6 palavras', 'Legacy: 20 caracteres, letras + números', 'Wi-Fi: 20+', 'PINs: 8+ dígitos'] },
    { heading: 'Por que geradores sem registro são mais seguros', paragraphs: ['Registro = sinal de alerta. generatepasswordto.me funciona inteiramente no cliente.', 'Verifique: DevTools, aba Network, sem requisições HTTP.'] },
    { heading: 'Conformidade NIST e PCI DSS', paragraphs: ['NIST 800-63B alinha com geradores. 16+ caracteres aleatórios satisfazem a intenção.', 'PCI DSS v4.0 exige mínimo 12 caracteres.', 'Desenvolvedores: usem CSPRNGs do servidor.'] },
    { heading: 'Erros comuns', paragraphs: ['Modificar a saída reduz a entropia.', 'Reutilizar senhas geradas.', 'Salvar em texto puro.', 'Ignorar restrições de caracteres.'] },
    { heading: 'Guia passo a passo', paragraphs: ['Passo 1: Vá para generatepasswordto.me.', 'Passo 2: 20 caracteres, todas as classes.', 'Passo 3: Gere. CSPRNG local.', 'Passo 4: Verifique a força (zxcvbn).', 'Passo 5: Verificação HIBP.', 'Passo 6: Copie para o gerenciador.'], bullets: ['Sem registro', 'Configurável', 'Indicador de força (zxcvbn)', 'Verificação HIBP', 'Open source', '11 idiomas suportados'] },
  ],
};

export const ru: LocalizedArticleContent = {
  title: 'Руководство по безопасному генератору паролей: как он работает',
  excerpt: 'Как работают безопасные генераторы паролей. CSPRNG, Web Crypto API, энтропия, генерация без регистрации и соответствие NIST/PCI DSS.',
  seoTitle: 'Безопасный генератор паролей — Как он работает | generatepasswordto.me',
  seoDescription: 'Техническое руководство по безопасным генераторам паролей. CSPRNG, Web Crypto API, расчёты энтропии и почему генераторы без регистрации безопаснее.',
  keywords: ['безопасный генератор паролей', 'как работает генератор паролей', 'CSPRNG объяснение', 'Web Crypto API пароли', 'генератор без регистрации', 'энтропия паролей'],
  sections: [
    { heading: 'Что делает генератор «безопасным»?', paragraphs: ['Безопасный генератор использует CSPRNG. В браузере: Web Crypto API (crypto.getRandomValues()). Math.random() НЕ является криптографически безопасным.', 'CSPRNG получают энтропию от аппаратного обеспечения.', 'Требуется равномерное распределение.'] },
    { heading: 'Математика энтропии', paragraphs: ['E = log₂(C^L). 12 символов = 78,8 бит. 16 = 105 бит. 20 = 131,4 бит.', '1 триллион попыток/сек = 9,6 × 10¹³ лет для 128 бит.'] },
    { heading: 'Типы генераторов', paragraphs: ['Случайные символы: максимальная энтропия на символ.', 'Парольные фразы: случайные слова. Менее плотно, но более запоминаемо.', 'PIN: только цифры. 8 цифр = всего 26,6 бит.', 'Гибридные: слова + разделители.'] },
    { heading: 'Рекомендуемые настройки', paragraphs: ['Выбирайте длину и сложность по чувствительности.'], bullets: ['Общие: 16 символов, все типы', 'Высокая безопасность: 20+', 'Мастер-пароль: фраза 5-6 слов', 'Legacy: 20 символов, буквы + цифры', 'Wi-Fi: 20+', 'PIN: 8+ цифр'] },
    { heading: 'Почему генераторы без регистрации безопаснее', paragraphs: ['Регистрация = тревожный знак. generatepasswordto.me работает полностью на стороне клиента.', 'Проверка: DevTools, вкладка Network, никаких HTTP-запросов.'] },
    { heading: 'Соответствие NIST и PCI DSS', paragraphs: ['NIST 800-63B совместим с генераторами. 16+ случайных символов удовлетворяют намерению.', 'PCI DSS v4.0 требует минимум 12 символов.', 'Разработчикам: используйте серверные CSPRNG.'] },
    { heading: 'Распространённые ошибки', paragraphs: ['Модификация выхода генератора снижает энтропию.', 'Повторное использование сгенерированных паролей.', 'Хранение в открытом тексте.', 'Игнорирование ограничений символов.'] },
    { heading: 'Пошаговая инструкция', paragraphs: ['Шаг 1: Откройте generatepasswordto.me.', 'Шаг 2: 20 символов, все классы.', 'Шаг 3: Сгенерируйте. Локальный CSPRNG.', 'Шаг 4: Проверьте надёжность (zxcvbn).', 'Шаг 5: Проверка HIBP.', 'Шаг 6: Скопируйте в менеджер паролей.'], bullets: ['Без регистрации', 'Настраиваемый', 'Индикатор надёжности (zxcvbn)', 'Проверка HIBP', 'Открытый код', '11 языков'] },
  ],
};

export const zh: LocalizedArticleContent = {
  title: '安全密码生成器指南：工作原理与重要性',
  excerpt: '安全密码生成器的内部工作原理。CSPRNG、Web Crypto API、熵、无注册生成及NIST/PCI DSS合规。',
  seoTitle: '安全密码生成器 — 工作原理 | generatepasswordto.me',
  seoDescription: '安全密码生成器技术指南。CSPRNG、Web Crypto API、熵计算以及为什么无注册生成器更安全。',
  keywords: ['安全密码生成器', '密码生成器工作原理', 'CSPRNG详解', 'Web Crypto API密码', '无注册生成器', '密码熵'],
  sections: [
    { heading: '什么使生成器"安全"？', paragraphs: ['安全生成器使用CSPRNG。浏览器中是Web Crypto API（crypto.getRandomValues()）。Math.random()不是加密安全的。', 'CSPRNG从系统硬件获取熵。', '需要均匀分布。'] },
    { heading: '熵的数学', paragraphs: ['E = log₂(C^L)。12字符 = 78.8位。16 = 105位。20 = 131.4位。', '1万亿次/秒 = 9.6 × 10¹³年破解128位。'] },
    { heading: '生成器类型', paragraphs: ['随机字符：每个字符最大熵。', '密码短语：随机单词。密度低但更易记。', 'PIN：仅数字。8位 = 26.6位。', '混合：单词+分隔符。'] },
    { heading: '推荐设置', paragraphs: ['根据敏感度选择长度和复杂度。'], bullets: ['一般：16字符，所有类型', '高安全性：20+', '主密码：5-6词短语', '旧系统：20字符，字母+数字', 'Wi-Fi：20+', 'PIN：8+位'] },
    { heading: '为什么无注册生成器更安全', paragraphs: ['需要注册=警告信号。generatepasswordto.me完全在客户端运行。', '验证：DevTools，Network标签，无HTTP请求。'] },
    { heading: 'NIST和PCI DSS合规', paragraphs: ['NIST 800-63B与生成器一致。16+随机字符满足意图。', 'PCI DSS v4.0要求最少12字符。', '开发者：使用服务器端CSPRNG。'] },
    { heading: '常见错误', paragraphs: ['修改生成输出降低熵。', '重复使用生成的密码。', '明文保存。', '忽略字符限制。'] },
    { heading: '分步指南', paragraphs: ['步骤1：访问generatepasswordto.me。', '步骤2：20字符，所有类别。', '步骤3：生成。本地CSPRNG。', '步骤4：检查强度（zxcvbn）。', '步骤5：HIBP验证。', '步骤6：复制到密码管理器。'], bullets: ['无需注册', '可配置', '强度指示器（zxcvbn）', 'HIBP验证', '开源', '支持11种语言'] },
  ],
};

export const ja: LocalizedArticleContent = {
  title: '安全なパスワード生成器ガイド：仕組みと重要性',
  excerpt: '安全なパスワード生成器の内部動作。CSPRNG、Web Crypto API、エントロピー、登録不要の生成、NIST/PCI DSS準拠。',
  seoTitle: '安全なパスワード生成器 — 仕組み | generatepasswordto.me',
  seoDescription: '安全なパスワード生成器の技術ガイド。CSPRNG、Web Crypto API、エントロピー計算、登録不要の生成器が安全な理由。',
  keywords: ['安全パスワード生成器', 'パスワード生成器の仕組み', 'CSPRNG解説', 'Web Crypto APIパスワード', '登録不要生成器', 'パスワードエントロピー'],
  sections: [
    { heading: '何が生成器を「安全」にするか', paragraphs: ['安全な生成器はCSPRNGを使用。ブラウザではWeb Crypto API（crypto.getRandomValues()）。Math.random()は暗号的に安全ではない。', 'CSPRNGはシステムハードウェアからエントロピーを取得。', '均一分布が必要。'] },
    { heading: 'エントロピーの数学', paragraphs: ['E = log₂(C^L)。12文字 = 78.8ビット。16 = 105ビット。20 = 131.4ビット。', '1兆回/秒 = 128ビットに9.6 × 10¹³年。'] },
    { heading: '生成器の種類', paragraphs: ['ランダム文字：文字あたり最大エントロピー。', 'パスフレーズ：ランダム単語。密度は低いが覚えやすい。', 'PIN：数字のみ。8桁 = 26.6ビット。', 'ハイブリッド：単語+区切り。'] },
    { heading: '推奨設定', paragraphs: ['感度に合わせて長さと複雑さを選択。'], bullets: ['一般：16文字、全タイプ', '高セキュリティ：20+', 'マスターパスワード：5-6語フレーズ', 'レガシー：20文字、英数字', 'Wi-Fi：20+', 'PIN：8+桁'] },
    { heading: '登録不要の生成器が安全な理由', paragraphs: ['登録要求=警告サイン。generatepasswordto.meは完全にクライアントサイド。', '確認：DevTools、Networkタブ、HTTPリクエストなし。'] },
    { heading: 'NISTとPCI DSS準拠', paragraphs: ['NIST 800-63Bは生成器と整合。16+ランダム文字で意図を満たす。', 'PCI DSS v4.0は最低12文字。', '開発者：サーバーサイドCSPRNGを使用。'] },
    { heading: '一般的な間違い', paragraphs: ['生成出力の変更はエントロピーを低下。', '生成パスワードの再利用。', '平文保存。', '文字制限の無視。'] },
    { heading: 'ステップバイステップガイド', paragraphs: ['ステップ1：generatepasswordto.meにアクセス。', 'ステップ2：20文字、全クラス。', 'ステップ3：生成。ローカルCSPRNG。', 'ステップ4：強度確認（zxcvbn）。', 'ステップ5：HIBP検証。', 'ステップ6：パスワードマネージャーにコピー。'], bullets: ['登録不要', '設定可能', '強度インジケーター（zxcvbn）', 'HIBP検証', 'オープンソース', '11言語対応'] },
  ],
};

export const pl: LocalizedArticleContent = {
  title: 'Przewodnik po bezpiecznym generatorze haseł: jak działa i dlaczego to ważne',
  excerpt: 'Jak działają bezpieczne generatory haseł. CSPRNG, Web Crypto API, entropia, generowanie bez rejestracji i zgodność z NIST/PCI DSS.',
  seoTitle: 'Bezpieczny generator haseł — Jak działa | generatepasswordto.me',
  seoDescription: 'Techniczny przewodnik po bezpiecznych generatorach haseł. CSPRNG, Web Crypto API, obliczenia entropii i dlaczego generatory bez rejestracji są bezpieczniejsze.',
  keywords: ['bezpieczny generator haseł', 'jak działa generator haseł', 'CSPRNG wyjaśnione', 'Web Crypto API hasła', 'generator bez rejestracji', 'entropia haseł'],
  sections: [
    { heading: 'Co czyni generator "bezpiecznym"?', paragraphs: ['Bezpieczny generator używa CSPRNG. W przeglądarce: Web Crypto API (crypto.getRandomValues()). Math.random() NIE jest kryptograficznie bezpieczny.', 'CSPRNG czerpie entropię ze sprzętu systemowego.', 'Wymagany rozkład jednostajny.'] },
    { heading: 'Matematyka entropii', paragraphs: ['E = log₂(C^L). 12 znaków = 78,8 bitów. 16 = 105 bitów. 20 = 131,4 bitów.', '1 bilion prób/sek = 9,6 × 10¹³ lat na 128 bitów.'] },
    { heading: 'Typy generatorów', paragraphs: ['Losowe znaki: maksymalna entropia na znak.', 'Frazy hasłowe: losowe słowa. Mniej gęste ale bardziej zapamiętywalne.', 'PIN: tylko cyfry. 8 cyfr = 26,6 bitów.', 'Hybrydowe: słowa + separatory.'] },
    { heading: 'Zalecane ustawienia', paragraphs: ['Dostosuj długość i złożoność do wrażliwości.'], bullets: ['Ogólne: 16 znaków, wszystkie typy', 'Wysoka ochrona: 20+', 'Hasło główne: fraza 5-6 słów', 'Legacy: 20 znaków, litery + cyfry', 'Wi-Fi: 20+', 'PIN: 8+ cyfr'] },
    { heading: 'Dlaczego generatory bez rejestracji są bezpieczniejsze', paragraphs: ['Wymóg rejestracji = sygnał ostrzegawczy. generatepasswordto.me działa całkowicie po stronie klienta.', 'Weryfikacja: DevTools, zakładka Network, brak żądań HTTP.'] },
    { heading: 'Zgodność z NIST i PCI DSS', paragraphs: ['NIST 800-63B pasuje do generatorów. 16+ losowych znaków spełnia intencję.', 'PCI DSS v4.0 wymaga minimum 12 znaków.', 'Deweloperzy: używajcie serwerowych CSPRNG.'] },
    { heading: 'Częste błędy', paragraphs: ['Modyfikacja wyjścia generatora zmniejsza entropię.', 'Ponowne użycie wygenerowanych haseł.', 'Przechowywanie w tekście jawnym.', 'Ignorowanie ograniczeń znaków.'] },
    { heading: 'Przewodnik krok po kroku', paragraphs: ['Krok 1: Wejdź na generatepasswordto.me.', 'Krok 2: 20 znaków, wszystkie klasy.', 'Krok 3: Wygeneruj. Lokalny CSPRNG.', 'Krok 4: Sprawdź siłę (zxcvbn).', 'Krok 5: Weryfikacja HIBP.', 'Krok 6: Skopiuj do menedżera haseł.'], bullets: ['Bez rejestracji', 'Konfigurowalne', 'Wskaźnik siły (zxcvbn)', 'Weryfikacja HIBP', 'Open source', '11 języków'] },
  ],
};

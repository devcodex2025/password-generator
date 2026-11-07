import type { LocalizedArticleContent } from '../articles';

export const en: LocalizedArticleContent = {
  title: 'Passphrase vs Password: Entropy and Security Explained',
  excerpt:
    'Understand the mathematics behind password entropy and learn when passphrases outperform traditional passwords. Includes entropy calculations, Diceware methodology, and practical recommendations.',
  seoTitle: 'Passphrase vs Password: Entropy and Security Explained',
  seoDescription:
    'Deep dive into passphrase vs password security. Understand the mathematics behind password entropy and learn when passphrases outperform traditional passwords.',
  keywords: [
    'passphrase vs password',
    'password entropy explained',
    'diceware passphrase',
    'passphrase security',
    'entropy bits calculation',
    'password strength math',
  ],
  sections: [
    {
      heading: 'The Entropy Problem: Why Most Passwords Fail',
      paragraphs: [
        'Every password has a measurable property called entropy — the number of bits of randomness it contains. Higher entropy means more possible combinations an attacker must try. A password with 50 bits of entropy has 2^50 (about 1.1 quadrillion) possibilities. At 1 billion guesses per second, that takes roughly 13 days to exhaust. At 80 bits, even a trillion guesses per second would take 38,000 years.',
        'The critical insight is that entropy depends on how the password was generated, not how it looks. "Tr0ub4dor&3" appears complex but has about 28 bits of entropy because it follows a predictable pattern (dictionary word + common substitutions + appended symbols). Meanwhile, "correct horse battery staple" — four random words — provides approximately 44 bits from a 2,048-word list or 52 bits from the EFF 7,776-word list.',
        'Most password policies focus on character composition (uppercase, lowercase, digits, symbols) rather than actual entropy. This creates a false sense of security: "Summer2026!" satisfies every complexity requirement but falls to a dictionary attack in seconds.',
      ],
    },
    {
      heading: 'How Password Entropy Is Calculated',
      paragraphs: [
        'For a truly random password, entropy equals log₂(C^L), where C is the character set size and L is the length. A 12-character password from a 95-character set (printable ASCII) has log₂(95^12) ≈ 79 bits. A 16-character password from the same set reaches about 105 bits.',
        'For passphrases, entropy equals log₂(W^N), where W is the word list size and N is the number of words. Using the EFF large word list (7,776 words): 4 words give log₂(7776^4) ≈ 51.7 bits; 5 words give ≈ 64.6 bits; 6 words give ≈ 77.5 bits; 7 words give ≈ 90.5 bits.',
        'This calculation assumes the attacker knows your generation method. If an attacker knows you used a 4-word Diceware passphrase, they face 7,776^4 ≈ 3.7 trillion combinations. This is the conservative, realistic security measure — assuming the worst case where the attacker knows your exact method but not your specific words.',
      ],
      bullets: [
        '8 random characters (a-z): log₂(26^8) ≈ 37.6 bits',
        '12 random characters (a-z, A-Z, 0-9, symbols): log₂(95^12) ≈ 78.8 bits',
        '4 Diceware words: log₂(7776^4) ≈ 51.7 bits',
        '6 Diceware words: log₂(7776^6) ≈ 77.5 bits',
        '16 random characters (full ASCII): log₂(95^16) ≈ 105 bits',
        '8 Diceware words: log₂(7776^8) ≈ 103.4 bits',
      ],
    },
    {
      heading: 'The Case for Passphrases',
      paragraphs: [
        'Passphrases offer a unique advantage: they trade character-level complexity for length, achieving high entropy while remaining memorable and typeable. A six-word passphrase like "monarch-fabric-eleven-radar-canopy-walrus" has approximately 78 bits of entropy — matching a random 12-character password — but is far easier for a human to remember and type correctly.',
        'The memorability factor is not just convenience — it is a security advantage. When passwords are hard to remember, users write them down insecurely, reuse them across sites, or create predictable patterns. A passphrase you can actually remember without external aids is a passphrase you will use correctly, never reuse, and never need to reset.',
        'Passphrases also resist shoulder-surfing better than character passwords. An observer watching you type "k9$mP#2xLw" can memorize the characters, but watching someone type "correct horse battery staple" is much harder to retain as a sequence of words typed rapidly.',
        'The Diceware method, originally developed by Arnold Reinhold in 1995, uses physical dice rolls to select words from a numbered list. Each die roll is truly random — no computer algorithm needed. The EFF updated the word list in 2016 to use only common, easy-to-spell English words, making the resulting passphrases more practical.',
      ],
    },
    {
      heading: 'The Case for Random Passwords',
      paragraphs: [
        'Random character passwords achieve higher entropy per character than passphrases achieve per word. A 16-character random password from the full printable ASCII set provides about 105 bits of entropy — you would need 8 Diceware words to match that, resulting in a much longer string to type.',
        'For accounts managed by a password manager (where you never type the password manually), random character passwords are strictly superior. The password manager handles generation, storage, and auto-fill, so memorability is irrelevant. You can use 20, 30, or even 64-character random strings with zero effort.',
        'Random passwords are also more compact, which matters in systems with low maximum password length limits. Some legacy systems cap passwords at 16 or even 8 characters. In those constrained environments, maximizing entropy per character with a random password is essential.',
        'The key disadvantage of random passwords is that they are impossible to memorize. If you lose access to your password manager, recovery depends entirely on your backup strategy. This makes random passwords inappropriate for your master password or any credential you must enter from memory.',
      ],
    },
    {
      heading: 'When to Use Each Approach',
      paragraphs: [
        'Use passphrases for: your password manager master password (the one password you must memorize); computer login passwords (typed frequently from memory); phone unlock PINs (use a 6-8 digit random number or a short passphrase); full-disk encryption passwords (entered at boot, before your password manager is available); and any credential where you cannot rely on auto-fill.',
        'Use random character passwords for: all accounts stored in your password manager; API keys and tokens; service accounts; database passwords; and any credential that will be copy-pasted or auto-filled rather than typed from memory.',
        'For maximum security, combine both approaches: a strong passphrase as your master password (protecting access to the manager) and unique random passwords for every individual account (generated and managed by the password manager). This layered approach gives you the memorability of passphrases where you need it and the maximum entropy of random passwords everywhere else.',
      ],
    },
    {
      heading: 'Strengthening Your Passphrase',
      paragraphs: [
        'Start with a minimum of 5 words for personal accounts and 6-7 words for high-value targets. Use the EFF large word list or an equivalent list with at least 7,776 entries to ensure each word contributes approximately 12.9 bits of entropy.',
        'Consider adding one or two modifications: capitalize a random word, insert a digit between two words, or use an unusual separator character. For example, "monarch Fabric 11 radar-canopy-walrus" adds several bits of entropy without significantly hurting memorability. However, do not over-modify — the strength comes from word count and randomness, not from clever tricks.',
        'Never select words yourself. Human word selection is heavily biased toward common words, associated concepts, and culturally influenced choices. Always use dice or a cryptographic random number generator. If you think you are picking words randomly, you are almost certainly not — decades of research confirm that humans are poor random generators.',
      ],
      bullets: [
        'Minimum 5 words for standard accounts, 6-7 for critical ones',
        'Use dice or a CSPRNG — never pick words manually',
        'Add one small modification (capitalization, digit, separator)',
        'Use a word list with 7,776+ entries (EFF Diceware)',
        'Practice typing until you develop muscle memory',
        'Store a written backup in a physically secure location until memorized',
      ],
    },
    {
      heading: 'The Bottom Line',
      paragraphs: [
        'Both passphrases and random passwords can provide excellent security when used correctly. The choice depends on context: passphrases for human memory, random passwords for machine management. The worst choice is a "compromise" password that is neither fully random nor a proper passphrase — something like "Monkey123!" that a human chose because it seemed "strong enough."',
        'Whatever method you use, the single most important factor is uniqueness. A perfect passphrase reused across three sites is far less secure than three mediocre but unique passwords. Combined with a password manager and multi-factor authentication, either approach will protect your accounts against the vast majority of real-world attacks.',
      ],
    },
  ],
};

export const ua: LocalizedArticleContent = {
  title: 'Парольна фраза vs пароль: ентропія та безпека',
  excerpt:
    'Зрозумійте математику ентропії паролів та дізнайтеся, коли парольні фрази переважають традиційні паролі. Включає розрахунки ентропії, методологію Diceware та практичні рекомендації.',
  seoTitle: 'Парольна фраза vs пароль: ентропія та безпека',
  seoDescription:
    'Глибоке занурення в безпеку парольних фраз проти паролів. Створіть унікальний пароль у генераторі та збережіть його безпечно.',
  keywords: [
    'парольна фраза vs пароль',
    'ентропія пароля пояснення',
    'парольна фраза diceware',
    'безпека парольних фраз',
    'розрахунок бітів ентропії',
    'математика надійності пароля',
  ],
  sections: [
    {
      heading: 'Проблема ентропії: чому більшість паролів ненадійні',
      paragraphs: [
        'Кожен пароль має вимірювану властивість — ентропію, тобто кількість бітів випадковості, які він містить. Вища ентропія означає більше можливих комбінацій, які зловмисник повинен перебрати. Пароль з 50 бітами ентропії має 2^50 (приблизно 1,1 квадрильйона) можливостей. При 1 мільярді спроб на секунду знадобиться приблизно 13 днів для повного перебору. При 80 бітах навіть трильйон спроб на секунду потребуватиме 38 000 років.',
        'Критичний висновок: ентропія залежить від того, як пароль був згенерований, а не від того, як він виглядає. "Tr0ub4dor&3" виглядає складним, але має лише близько 28 бітів ентропії, бо слідує передбачуваному шаблону (словникове слово + поширені підстановки + додані символи). Тим часом "correct horse battery staple" — чотири випадкових слова — дає приблизно 44 біти зі списку 2 048 слів або 52 біти зі списку EFF 7 776 слів.',
        'Більшість політик паролів зосереджуються на складі символів (великі, малі літери, цифри, символи), а не на фактичній ентропії. Це створює хибне відчуття безпеки: "Summer2026!" задовольняє кожну вимогу складності, але падає під словниковою атакою за секунди.',
      ],
    },
    {
      heading: 'Як розраховується ентропія пароля',
      paragraphs: [
        'Для дійсно випадкового пароля ентропія дорівнює log₂(C^L), де C — розмір набору символів, а L — довжина. 12-символьний пароль з набору 95 символів (друковані ASCII) має log₂(95^12) ≈ 79 бітів. 16-символьний пароль з того ж набору досягає приблизно 105 бітів.',
        'Для парольних фраз ентропія дорівнює log₂(W^N), де W — розмір списку слів, а N — кількість слів. Використовуючи великий список EFF (7 776 слів): 4 слова дають log₂(7776^4) ≈ 51,7 біта; 5 слів дають ≈ 64,6 біта; 6 слів дають ≈ 77,5 біта; 7 слів дають ≈ 90,5 біта.',
        'Цей розрахунок передбачає, що зловмисник знає ваш метод генерації. Якщо зловмисник знає, що ви використовували 4-словну фразу Diceware, він стоїть перед 7 776^4 ≈ 3,7 трильйона комбінацій. Це консервативна, реалістична міра безпеки — припускаючи найгірший випадок, де зловмисник знає ваш точний метод, але не ваші конкретні слова.',
      ],
      bullets: [
        '8 випадкових символів (a-z): log₂(26^8) ≈ 37,6 біта',
        '12 випадкових символів (a-z, A-Z, 0-9, символи): log₂(95^12) ≈ 78,8 біта',
        '4 слова Diceware: log₂(7776^4) ≈ 51,7 біта',
        '6 слів Diceware: log₂(7776^6) ≈ 77,5 біта',
        '16 випадкових символів (повний ASCII): log₂(95^16) ≈ 105 бітів',
        '8 слів Diceware: log₂(7776^8) ≈ 103,4 біта',
      ],
    },
    {
      heading: 'Аргументи на користь парольних фраз',
      paragraphs: [
        'Парольні фрази пропонують унікальну перевагу: вони обмінюють складність на рівні символів на довжину, досягаючи високої ентропії при збереженні запам\'ятовуваності та зручності набору. Шестислівна парольна фраза на кшталт "монарх-тканина-одинадцять-радар-навіс-морж" має приблизно 78 бітів ентропії — стільки ж, як випадковий 12-символьний пароль — але набагато легша для запам\'ятовування та правильного набору.',
        'Фактор запам\'ятовуваності — це не просто зручність, а перевага безпеки. Коли паролі важко запам\'ятати, користувачі записують їх ненадійно, повторно використовують на різних сайтах або створюють передбачувані шаблони. Парольна фраза, яку ви дійсно можете запам\'ятати без зовнішніх засобів — це фраза, яку ви використовуватимете правильно, ніколи не повторюватимете та ніколи не потребуватимете скидання.',
        'Парольні фрази також краще протистоять підглядуванню через плече. Спостерігач, який дивиться, як ви набираєте "k9$mP#2xLw", може запам\'ятати символи, але стежити за тим, як хтось швидко набирає "correct horse battery staple", набагато складніше утримати в пам\'яті як послідовність слів.',
        'Метод Diceware, спочатку розроблений Арнольдом Рейнхольдом у 1995 році, використовує кидки фізичних кубиків для вибору слів з пронумерованого списку. Кожен кидок кубика є дійсно випадковим — жодного комп\'ютерного алгоритму не потрібно. EFF оновив список слів у 2016 році, щоб використовувати лише поширені, легкі для написання англійські слова, зробивши отримані фрази більш практичними.',
      ],
    },
    {
      heading: 'Аргументи на користь випадкових паролів',
      paragraphs: [
        'Випадкові символьні паролі досягають більшої ентропії на символ, ніж парольні фрази на слово. 16-символьний випадковий пароль з повного набору друкованих ASCII забезпечує близько 105 бітів ентропії — вам знадобиться 8 слів Diceware, щоб зрівнятися з цим, що дасть набагато довший рядок для набору.',
        'Для акаунтів, керованих менеджером паролів (де ви ніколи не набираєте пароль вручну), випадкові символьні паролі є безумовно кращими. Менеджер паролів бере на себе генерацію, зберігання та автозаповнення, тому запам\'ятовуваність не має значення. Ви можете використовувати 20, 30 або навіть 64-символьні випадкові рядки без жодних зусиль.',
        'Випадкові паролі також більш компактні, що важливо в системах з низьким обмеженням максимальної довжини пароля. Деякі застарілі системи обмежують паролі 16 або навіть 8 символами. У цих обмежених середовищах максимізація ентропії на символ за допомогою випадкового пароля є критичною.',
        'Головний недолік випадкових паролів — їх неможливо запам\'ятати. Якщо ви втратите доступ до менеджера паролів, відновлення повністю залежить від вашої стратегії резервного копіювання. Це робить випадкові паролі непридатними для вашого мастер-пароля або будь-яких облікових даних, які ви повинні вводити з пам\'яті.',
      ],
    },
    {
      heading: 'Коли використовувати кожен підхід',
      paragraphs: [
        'Використовуйте парольні фрази для: мастер-пароля менеджера паролів (єдиний пароль, який потрібно запам\'ятати); паролів входу в комп\'ютер (часто набираються з пам\'яті); PIN-кодів розблокування телефону (використовуйте 6-8 цифрове випадкове число або коротку парольну фразу); паролів повного шифрування диска (вводяться при завантаженні, до доступу менеджера паролів); та будь-яких облікових даних, де не можна покластися на автозаповнення.',
        'Використовуйте випадкові символьні паролі для: всіх акаунтів, збережених у менеджері паролів; API-ключів і токенів; сервісних акаунтів; паролів баз даних; та будь-яких облікових даних, які будуть копіюватися або автозаповнюватися, а не набиратися з пам\'яті.',
        'Для максимальної безпеки поєднуйте обидва підходи: надійну парольну фразу як мастер-пароль (захищає доступ до менеджера) та унікальні випадкові паролі для кожного окремого акаунту (генеруються та керуються менеджером паролів). Цей багатошаровий підхід дає вам запам\'ятовуваність парольних фраз там, де це потрібно, та максимальну ентропію випадкових паролів всюди інде.',
      ],
    },
    {
      heading: 'Підсилення вашої парольної фрази',
      paragraphs: [
        'Починайте з мінімум 5 слів для персональних акаунтів та 6-7 слів для високоцінних цілей. Використовуйте великий список EFF або еквівалентний список з мінімум 7 776 записами, щоб кожне слово вносило приблизно 12,9 біта ентропії.',
        'Розгляньте можливість додати одну-дві модифікації: напишіть випадкове слово з великої літери, вставте цифру між двома словами або використайте незвичний символ-роздільник. Наприклад, "монарх Тканина 11 радар-навіс-морж" додає кілька бітів ентропії без суттєвого погіршення запам\'ятовуваності. Однак не перестарайтеся з модифікаціями — сила походить від кількості слів і випадковості, а не від хитрих трюків.',
        'Ніколи не обирайте слова самостійно. Людський вибір слів сильно зміщений у бік поширених слів, пов\'язаних концептів та культурно зумовлених виборів. Завжди використовуйте кубики або криптографічний генератор випадкових чисел. Якщо ви думаєте, що обираєте слова випадково, ви майже напевно помиляєтесь — десятиліття досліджень підтверджують, що люди є поганими генераторами випадковості.',
      ],
      bullets: [
        'Мінімум 5 слів для стандартних акаунтів, 6-7 для критичних',
        'Використовуйте кубики або CSPRNG — ніколи не обирайте слова вручну',
        'Додайте одну невелику модифікацію (велика літера, цифра, роздільник)',
        'Використовуйте список слів з 7 776+ записами (EFF Diceware)',
        'Тренуйтеся набирати, поки не розвинете м\'язову пам\'ять',
        'Зберігайте записаний резерв у фізично безпечному місці до запам\'ятовування',
      ],
    },
    {
      heading: 'Висновок',
      paragraphs: [
        'І парольні фрази, і випадкові паролі можуть забезпечити відмінну безпеку при правильному використанні. Вибір залежить від контексту: парольні фрази для людської пам\'яті, випадкові паролі для машинного управління. Найгірший вибір — "компромісний" пароль, який не є ні повністю випадковим, ні правильною парольною фразою — щось на кшталт "Monkey123!", що людина обрала, бо здавалося "достатньо надійним."',
        'Який би метод ви не використовували, найважливіший фактор — унікальність. Ідеальна парольна фраза, використана повторно на трьох сайтах, набагато менш безпечна, ніж три посередні, але унікальні паролі. У поєднанні з менеджером паролів та багатофакторною аутентифікацією будь-який підхід захистить ваші акаунти від переважної більшості реальних атак.',
      ],
    },
  ],
};

export const es: LocalizedArticleContent = {
  title: 'Frase de contraseña vs contraseña: entropía y seguridad explicadas',
  excerpt: 'Comprende las matemáticas detrás de la entropía de contraseñas y aprende cuándo las frases de contraseña superan a las contraseñas tradicionales.',
  seoTitle: 'Frase de contraseña vs contraseña: entropía y seguridad',
  seoDescription: 'Análisis profundo de frases de contraseña vs contraseñas. Cubre matemáticas de entropía, listas Diceware, resistencia a fuerza bruta y cuándo usar cada enfoque.',
  keywords: ['frase de contraseña vs contraseña', 'entropía de contraseña explicada', 'frase diceware', 'seguridad de frase de contraseña', 'cálculo bits entropía', 'matemáticas fortaleza contraseña'],
  sections: [
    { heading: 'El problema de la entropía: por qué la mayoría de contraseñas fallan', paragraphs: ['Cada contraseña tiene una propiedad medible llamada entropía — el número de bits de aleatoriedad que contiene. Mayor entropía significa más combinaciones posibles que un atacante debe probar. Una contraseña con 50 bits de entropía tiene 2^50 (aproximadamente 1,1 cuatrillones) posibilidades. A mil millones de intentos por segundo, eso toma unos 13 días. A 80 bits, incluso un billón de intentos por segundo tomaría 38.000 años.', 'La idea clave es que la entropía depende de cómo se generó la contraseña, no de cómo se ve. "Tr0ub4dor&3" parece compleja pero tiene solo unos 28 bits de entropía porque sigue un patrón predecible. Mientras tanto, "correct horse battery staple" — cuatro palabras aleatorias — proporciona aproximadamente 44 bits de una lista de 2.048 palabras o 52 bits de la lista EFF de 7.776 palabras.', 'La mayoría de políticas de contraseñas se centran en la composición de caracteres en lugar de la entropía real. Esto crea una falsa sensación de seguridad: "Summer2026!" satisface cada requisito de complejidad pero cae ante un ataque de diccionario en segundos.'] },
    { heading: 'Cómo se calcula la entropía de contraseñas', paragraphs: ['Para una contraseña verdaderamente aleatoria, la entropía es log₂(C^L), donde C es el tamaño del conjunto de caracteres y L es la longitud. Una contraseña de 12 caracteres de un conjunto de 95 caracteres tiene ≈ 79 bits. Una de 16 caracteres alcanza unos 105 bits.', 'Para frases de contraseña, la entropía es log₂(W^N), donde W es el tamaño de la lista y N es el número de palabras. Con la lista EFF (7.776 palabras): 4 palabras dan ≈ 51,7 bits; 5 palabras ≈ 64,6 bits; 6 palabras ≈ 77,5 bits; 7 palabras ≈ 90,5 bits.', 'Este cálculo asume que el atacante conoce tu método de generación. Si un atacante sabe que usaste una frase Diceware de 4 palabras, enfrenta 7.776^4 ≈ 3,7 billones de combinaciones.'], bullets: ['8 caracteres aleatorios (a-z): log₂(26^8) ≈ 37,6 bits', '12 caracteres aleatorios (a-z, A-Z, 0-9, símbolos): log₂(95^12) ≈ 78,8 bits', '4 palabras Diceware: log₂(7776^4) ≈ 51,7 bits', '6 palabras Diceware: log₂(7776^6) ≈ 77,5 bits', '16 caracteres aleatorios (ASCII completo): log₂(95^16) ≈ 105 bits', '8 palabras Diceware: log₂(7776^8) ≈ 103,4 bits'] },
    { heading: 'El caso a favor de las frases de contraseña', paragraphs: ['Las frases ofrecen una ventaja única: cambian complejidad de caracteres por longitud, logrando alta entropía mientras permanecen memorables y fáciles de teclear. Una frase de seis palabras como "monarch-fabric-eleven-radar-canopy-walrus" tiene aproximadamente 78 bits de entropía — igualando una contraseña aleatoria de 12 caracteres — pero es mucho más fácil de recordar.', 'El factor de memorabilidad no es solo conveniencia — es una ventaja de seguridad. Cuando las contraseñas son difíciles de recordar, los usuarios las anotan de forma insegura, las reutilizan o crean patrones predecibles.', 'Las frases también resisten mejor la observación por encima del hombro que las contraseñas de caracteres. Un observador que te ve teclear "k9$mP#2xLw" puede memorizar los caracteres, pero ver a alguien teclear "correct horse battery staple" es mucho más difícil de retener.', 'El método Diceware, originalmente desarrollado por Arnold Reinhold en 1995, usa dados físicos para seleccionar palabras de una lista numerada. Cada tirada de dado es verdaderamente aleatoria. La EFF actualizó la lista en 2016 para usar solo palabras inglesas comunes y fáciles de deletrear.'] },
    { heading: 'El caso a favor de las contraseñas aleatorias', paragraphs: ['Las contraseñas aleatorias logran mayor entropía por carácter que las frases por palabra. Una contraseña aleatoria de 16 caracteres del conjunto ASCII proporciona unos 105 bits — necesitarías 8 palabras Diceware para igualar eso.', 'Para cuentas gestionadas por un gestor de contraseñas (donde nunca tecleas la contraseña manualmente), las contraseñas aleatorias son estrictamente superiores. El gestor maneja la generación, almacenamiento y auto-rellenado, así que la memorabilidad es irrelevante.', 'Las contraseñas aleatorias también son más compactas, lo que importa en sistemas con límites bajos de longitud máxima. Algunos sistemas antiguos limitan a 16 o incluso 8 caracteres.', 'La desventaja clave es que son esencialmente imposibles de memorizar. Si pierdes acceso a tu gestor, la recuperación depende completamente de tu estrategia de respaldo.'] },
    { heading: 'Cuándo usar cada enfoque', paragraphs: ['Usa frases de contraseña para: tu contraseña maestra del gestor; contraseñas de inicio de sesión del ordenador; PINs de teléfono; contraseñas de cifrado de disco completo; y cualquier credencial donde no puedas depender del auto-rellenado.', 'Usa contraseñas aleatorias para: todas las cuentas en tu gestor; claves API y tokens; cuentas de servicio; contraseñas de bases de datos; y cualquier credencial que será copiada-pegada o auto-rellenada.', 'Para máxima seguridad, combina ambos enfoques: una frase fuerte como contraseña maestra y contraseñas aleatorias únicas para cada cuenta individual.'] },
    { heading: 'Fortaleciendo tu frase de contraseña', paragraphs: ['Comienza con un mínimo de 5 palabras para cuentas personales y 6-7 para objetivos de alto valor. Usa la lista EFF o equivalente con al menos 7.776 entradas.', 'Considera añadir una o dos modificaciones: capitaliza una palabra aleatoria, inserta un dígito entre dos palabras o usa un separador inusual. Sin embargo, no modifiques en exceso — la fortaleza viene del conteo de palabras y la aleatoriedad, no de trucos ingeniosos.', 'Nunca selecciones palabras tú mismo. La selección humana está fuertemente sesgada hacia palabras comunes y conceptos asociados. Siempre usa dados o un generador criptográfico.'], bullets: ['Mínimo 5 palabras para cuentas estándar, 6-7 para críticas', 'Usa dados o CSPRNG — nunca elijas palabras manualmente', 'Añade una pequeña modificación (mayúscula, dígito, separador)', 'Usa lista de palabras con 7.776+ entradas (EFF Diceware)', 'Practica teclear hasta desarrollar memoria muscular', 'Guarda una copia escrita en un lugar físicamente seguro hasta memorizar'] },
    { heading: 'Conclusión', paragraphs: ['Tanto las frases como las contraseñas aleatorias pueden proporcionar excelente seguridad cuando se usan correctamente. La elección depende del contexto: frases para la memoria humana, contraseñas aleatorias para gestión por máquinas. La peor elección es una contraseña "de compromiso" que no es ni completamente aleatoria ni una frase apropiada.', 'Cualquiera que sea el método, el factor más importante es la unicidad. Una frase perfecta reutilizada en tres sitios es mucho menos segura que tres contraseñas mediocres pero únicas. Combinado con un gestor de contraseñas y autenticación multifactor, cualquier enfoque protegerá tus cuentas contra la gran mayoría de ataques reales.'] },
  ],
};

export const fr: LocalizedArticleContent = {
  title: 'Phrase secrète vs mot de passe : entropie et sécurité expliquées',
  excerpt: 'Comprenez les mathématiques derrière l\'entropie des mots de passe et apprenez quand les phrases secrètes surpassent les mots de passe traditionnels.',
  seoTitle: 'Phrase secrète vs mot de passe : entropie et sécurité expliquées',
  seoDescription: 'Analyse approfondie des phrases secrètes vs mots de passe. Utilisez le générateur pour créer un mot de passe unique et conservez-le en sécurité.',
  keywords: ['phrase secrète vs mot de passe', 'entropie mot de passe expliquée', 'phrase diceware', 'sécurité phrase secrète', 'calcul bits entropie', 'mathématiques force mot de passe'],
  sections: [
    { heading: 'Le problème de l\'entropie : pourquoi la plupart des mots de passe échouent', paragraphs: ['Chaque mot de passe possède une propriété mesurable appelée entropie — le nombre de bits d\'aléatoire qu\'il contient. Plus d\'entropie signifie plus de combinaisons possibles qu\'un attaquant doit essayer. Un mot de passe avec 50 bits d\'entropie a 2^50 possibilités. À un milliard d\'essais par seconde, cela prend environ 13 jours. À 80 bits, même un billion d\'essais par seconde prendrait 38 000 ans.', 'L\'idée clé est que l\'entropie dépend de la façon dont le mot de passe a été généré, pas de son apparence. "Tr0ub4dor&3" semble complexe mais n\'a qu\'environ 28 bits d\'entropie. Pendant ce temps, "correct horse battery staple" fournit environ 52 bits avec la liste EFF de 7 776 mots.', 'La plupart des politiques se concentrent sur la composition des caractères plutôt que l\'entropie réelle. Cela crée un faux sentiment de sécurité : "Summer2026!" satisfait toutes les exigences mais tombe face à une attaque par dictionnaire en secondes.'] },
    { heading: 'Comment l\'entropie des mots de passe est calculée', paragraphs: ['Pour un mot de passe vraiment aléatoire, l\'entropie = log₂(C^L), où C est la taille du jeu de caractères et L la longueur. Un mot de passe de 12 caractères d\'un ensemble de 95 a ≈ 79 bits.', 'Pour les phrases, l\'entropie = log₂(W^N), où W est la taille de la liste et N le nombre de mots. Avec la liste EFF (7 776 mots) : 4 mots ≈ 51,7 bits ; 5 mots ≈ 64,6 bits ; 6 mots ≈ 77,5 bits ; 7 mots ≈ 90,5 bits.', 'Ce calcul suppose que l\'attaquant connaît votre méthode de génération. C\'est la mesure de sécurité conservative et réaliste.'], bullets: ['8 caractères aléatoires (a-z) : log₂(26^8) ≈ 37,6 bits', '12 caractères aléatoires (a-z, A-Z, 0-9, symboles) : log₂(95^12) ≈ 78,8 bits', '4 mots Diceware : log₂(7776^4) ≈ 51,7 bits', '6 mots Diceware : log₂(7776^6) ≈ 77,5 bits', '16 caractères aléatoires (ASCII complet) : log₂(95^16) ≈ 105 bits', '8 mots Diceware : log₂(7776^8) ≈ 103,4 bits'] },
    { heading: 'L\'argument en faveur des phrases secrètes', paragraphs: ['Les phrases offrent un avantage unique : elles échangent la complexité de caractères contre la longueur, atteignant une haute entropie tout en restant mémorables. Une phrase de six mots a environ 78 bits d\'entropie — égalant un mot de passe aléatoire de 12 caractères — mais est bien plus facile à retenir.', 'Le facteur de mémorabilité n\'est pas qu\'une commodité — c\'est un avantage de sécurité. Quand les mots de passe sont difficiles à retenir, les utilisateurs les notent de façon non sécurisée ou les réutilisent.', 'Les phrases résistent aussi mieux à l\'observation par-dessus l\'épaule que les mots de passe en caractères.', 'La méthode Diceware, développée par Arnold Reinhold en 1995, utilise des dés physiques pour sélectionner des mots d\'une liste numérotée. L\'EFF a mis à jour la liste en 2016 pour utiliser uniquement des mots anglais courants.'] },
    { heading: 'L\'argument en faveur des mots de passe aléatoires', paragraphs: ['Les mots de passe aléatoires atteignent une entropie plus élevée par caractère. Un mot de passe de 16 caractères fournit environ 105 bits — il faudrait 8 mots Diceware pour égaler cela.', 'Pour les comptes gérés par un gestionnaire, les mots de passe aléatoires sont strictement supérieurs. Le gestionnaire gère tout, donc la mémorabilité est sans importance.', 'Les mots de passe aléatoires sont aussi plus compacts, ce qui compte dans les systèmes avec des limites de longueur basses.', 'L\'inconvénient clé est qu\'ils sont impossibles à mémoriser. Si vous perdez l\'accès à votre gestionnaire, la récupération dépend de votre stratégie de sauvegarde.'] },
    { heading: 'Quand utiliser chaque approche', paragraphs: ['Utilisez des phrases pour : votre mot de passe maître ; les connexions ordinateur ; les PINs de téléphone ; les mots de passe de chiffrement de disque ; et tout identifiant où vous ne pouvez pas compter sur le remplissage automatique.', 'Utilisez des mots de passe aléatoires pour : tous les comptes dans votre gestionnaire ; les clés API ; les comptes de service ; les mots de passe de base de données.', 'Pour une sécurité maximale, combinez les deux approches : une phrase forte comme mot de passe maître et des mots de passe aléatoires uniques pour chaque compte individuel.'] },
    { heading: 'Renforcer votre phrase secrète', paragraphs: ['Commencez avec un minimum de 5 mots pour les comptes personnels et 6-7 pour les cibles à haute valeur. Utilisez la liste EFF ou une liste équivalente avec au moins 7 776 entrées.', 'Envisagez d\'ajouter une ou deux modifications : mettez en majuscule un mot aléatoire, insérez un chiffre entre deux mots ou utilisez un séparateur inhabituel.', 'Ne sélectionnez jamais les mots vous-même. La sélection humaine est fortement biaisée vers les mots communs. Utilisez toujours des dés ou un générateur cryptographique.'], bullets: ['Minimum 5 mots pour comptes standard, 6-7 pour les critiques', 'Utilisez des dés ou un CSPRNG — ne choisissez jamais manuellement', 'Ajoutez une petite modification (majuscule, chiffre, séparateur)', 'Utilisez une liste de 7 776+ mots (EFF Diceware)', 'Entraînez-vous à taper jusqu\'à développer la mémoire musculaire', 'Conservez une copie écrite dans un lieu physiquement sûr'] },
    { heading: 'Conclusion', paragraphs: ['Les phrases et les mots de passe aléatoires peuvent offrir une excellente sécurité utilisés correctement. Le choix dépend du contexte : phrases pour la mémoire humaine, mots de passe aléatoires pour la gestion machine.', 'Quelle que soit la méthode, le facteur le plus important est l\'unicité. Une phrase parfaite réutilisée sur trois sites est bien moins sécurisée que trois mots de passe médiocres mais uniques.'] },
  ],
};

export const de: LocalizedArticleContent = {
  title: 'Passphrase vs Passwort: Entropie und Sicherheit erklärt',
  excerpt: 'Verstehen Sie die Mathematik hinter der Passwort-Entropie und lernen Sie, wann Passphrasen traditionelle Passwörter übertreffen. Enthält Entropie-Berechnungen, Diceware-Methodik und praktische Empfehlungen.',
  seoTitle: 'Passphrase vs Passwort: Entropie und Sicherheit erklärt',
  seoDescription: 'Tiefgehende Analyse von Passphrase vs Passwort-Sicherheit. Erzeugen Sie im Generator ein einzigartiges Passwort und speichern Sie es sicher.',
  keywords: ['Passphrase vs Passwort', 'Passwort-Entropie erklärt', 'Diceware-Passphrase', 'Passphrase-Sicherheit', 'Entropie-Bits-Berechnung', 'Passwortstärke-Mathematik'],
  sections: [
    { heading: 'Das Entropie-Problem: Warum die meisten Passwörter versagen', paragraphs: ['Jedes Passwort hat eine messbare Eigenschaft namens Entropie — die Anzahl der Zufälligkeitsbits. Höhere Entropie bedeutet mehr mögliche Kombinationen. Ein Passwort mit 50 Bits hat 2^50 Möglichkeiten. Bei einer Milliarde Versuche pro Sekunde dauert das etwa 13 Tage. Bei 80 Bits würde selbst eine Billion Versuche pro Sekunde 38.000 Jahre dauern.', 'Die entscheidende Erkenntnis ist, dass Entropie davon abhängt, wie das Passwort generiert wurde, nicht wie es aussieht. "Tr0ub4dor&3" hat nur etwa 28 Bits Entropie. Hingegen bieten "correct horse battery staple" etwa 52 Bits mit der EFF-Wortliste.', 'Die meisten Passwort-Richtlinien konzentrieren sich auf Zeichenkomposition statt auf tatsächliche Entropie. "Summer2026!" erfüllt jede Komplexitätsanforderung, fällt aber in Sekunden einem Wörterbuchangriff zum Opfer.'] },
    { heading: 'Wie Passwort-Entropie berechnet wird', paragraphs: ['Für ein wirklich zufälliges Passwort: Entropie = log₂(C^L). Ein 12-Zeichen-Passwort aus einem 95-Zeichen-Satz hat ≈ 79 Bits.', 'Für Passphrasen: Entropie = log₂(W^N). Mit der EFF-Liste (7.776 Wörter): 4 Wörter ≈ 51,7 Bits; 5 Wörter ≈ 64,6 Bits; 6 Wörter ≈ 77,5 Bits; 7 Wörter ≈ 90,5 Bits.', 'Diese Berechnung nimmt an, dass der Angreifer Ihre Generierungsmethode kennt — die konservative, realistische Sicherheitsmessung.'], bullets: ['8 zufällige Zeichen (a-z): log₂(26^8) ≈ 37,6 Bits', '12 zufällige Zeichen (a-z, A-Z, 0-9, Symbole): log₂(95^12) ≈ 78,8 Bits', '4 Diceware-Wörter: log₂(7776^4) ≈ 51,7 Bits', '6 Diceware-Wörter: log₂(7776^6) ≈ 77,5 Bits', '16 zufällige Zeichen (volles ASCII): log₂(95^16) ≈ 105 Bits', '8 Diceware-Wörter: log₂(7776^8) ≈ 103,4 Bits'] },
    { heading: 'Das Argument für Passphrasen', paragraphs: ['Passphrasen bieten einen einzigartigen Vorteil: Sie tauschen Zeichenkomplexität gegen Länge und erreichen hohe Entropie bei gleichzeitiger Merkbarkeit. Eine Sechs-Wort-Phrase hat etwa 78 Bits Entropie — vergleichbar mit einem zufälligen 12-Zeichen-Passwort.', 'Der Merkbarkeitsfaktor ist nicht nur Komfort — er ist ein Sicherheitsvorteil. Wenn Passwörter schwer zu merken sind, notieren Benutzer sie unsicher oder verwenden sie wieder.', 'Passphrasen widerstehen auch dem Schulter-Surfen besser als Zeichenpasswörter.', 'Die Diceware-Methode, ursprünglich 1995 von Arnold Reinhold entwickelt, verwendet physische Würfel zur Wortauswahl. Die EFF aktualisierte die Wortliste 2016 mit nur gebräuchlichen, leicht zu buchstabierenden englischen Wörtern.'] },
    { heading: 'Das Argument für zufällige Passwörter', paragraphs: ['Zufällige Passwörter erreichen höhere Entropie pro Zeichen. Ein 16-Zeichen-Passwort bietet etwa 105 Bits — man bräuchte 8 Diceware-Wörter, um das zu erreichen.', 'Für vom Passwort-Manager verwaltete Konten sind zufällige Passwörter streng überlegen, da die Merkbarkeit irrelevant ist.', 'Zufällige Passwörter sind auch kompakter, was bei Systemen mit niedrigen Längenbegrenzungen wichtig ist.', 'Der Hauptnachteil ist, dass sie unmöglich zu merken sind. Wenn Sie den Zugang zum Manager verlieren, hängt die Wiederherstellung von Ihrer Backup-Strategie ab.'] },
    { heading: 'Wann welcher Ansatz verwendet werden sollte', paragraphs: ['Verwenden Sie Passphrasen für: Ihr Master-Passwort; Computer-Anmeldung; Telefon-PINs; Festplattenverschlüsselung; und jede Anmeldung, bei der Sie nicht auf Auto-Fill vertrauen können.', 'Verwenden Sie zufällige Passwörter für: alle Konten im Manager; API-Schlüssel; Service-Konten; Datenbank-Passwörter.', 'Für maximale Sicherheit kombinieren Sie beide Ansätze: eine starke Passphrase als Master-Passwort und einzigartige zufällige Passwörter für jedes einzelne Konto.'] },
    { heading: 'Ihre Passphrase stärken', paragraphs: ['Beginnen Sie mit mindestens 5 Wörtern für persönliche Konten und 6-7 für hochwertige Ziele. Verwenden Sie die EFF-Liste oder eine gleichwertige mit mindestens 7.776 Einträgen.', 'Erwägen Sie eine oder zwei Modifikationen: ein zufälliges Wort großschreiben, eine Ziffer einfügen oder ein ungewöhnliches Trennzeichen verwenden.', 'Wählen Sie nie selbst Wörter aus. Die menschliche Wortauswahl ist stark zu gebräuchlichen Wörtern verzerrt. Verwenden Sie immer Würfel oder einen kryptographischen Generator.'], bullets: ['Mindestens 5 Wörter für Standardkonten, 6-7 für kritische', 'Würfel oder CSPRNG verwenden — nie manuell wählen', 'Eine kleine Modifikation hinzufügen (Großschreibung, Ziffer, Trennzeichen)', 'Wortliste mit 7.776+ Einträgen verwenden (EFF Diceware)', 'Tippen üben, bis Muskelgedächtnis entsteht', 'Schriftliche Kopie an physisch sicherem Ort aufbewahren'] },
    { heading: 'Fazit', paragraphs: ['Sowohl Passphrasen als auch zufällige Passwörter können bei korrekter Verwendung hervorragende Sicherheit bieten. Die Wahl hängt vom Kontext ab: Passphrasen für das menschliche Gedächtnis, zufällige Passwörter für maschinelle Verwaltung.', 'Welche Methode auch immer — der wichtigste Faktor ist Einzigartigkeit. Eine perfekte Passphrase, die auf drei Seiten wiederverwendet wird, ist weit weniger sicher als drei mittelmäßige, aber einzigartige Passwörter.'] },
  ],
};

export const it: LocalizedArticleContent = {
  title: 'Passphrase vs password: entropia e sicurezza spiegate',
  excerpt: 'Comprendete la matematica dietro l\'entropia delle password e scoprite quando le passphrase superano le password tradizionali. Include calcoli di entropia, metodologia Diceware e raccomandazioni pratiche.',
  seoTitle: 'Passphrase vs password: entropia e sicurezza spiegate',
  seoDescription: 'Analisi approfondita di passphrase vs password. Usa il generatore per creare una password unica e conservala in modo sicuro.',
  keywords: ['passphrase vs password', 'entropia password spiegata', 'passphrase diceware', 'sicurezza passphrase', 'calcolo bit entropia', 'matematica forza password'],
  sections: [
    { heading: 'Il problema dell\'entropia: perché la maggior parte delle password fallisce', paragraphs: ['Ogni password ha una proprietà misurabile chiamata entropia — il numero di bit di casualità che contiene. Maggiore entropia significa più combinazioni possibili. Una password con 50 bit di entropia ha 2^50 possibilità. A un miliardo di tentativi al secondo, servono circa 13 giorni. A 80 bit, anche un trilione di tentativi al secondo richiederebbe 38.000 anni.', 'L\'intuizione fondamentale è che l\'entropia dipende da come la password è stata generata, non da come appare. "Tr0ub4dor&3" ha solo circa 28 bit di entropia. Invece, "correct horse battery staple" fornisce circa 52 bit con la lista EFF.', 'La maggior parte delle politiche si concentra sulla composizione dei caratteri piuttosto che sull\'entropia reale. "Summer2026!" soddisfa ogni requisito ma cade in secondi a un attacco dizionario.'] },
    { heading: 'Come si calcola l\'entropia delle password', paragraphs: ['Per una password veramente casuale: entropia = log₂(C^L). Una password di 12 caratteri da un insieme di 95 ha ≈ 79 bit.', 'Per le passphrase: entropia = log₂(W^N). Con la lista EFF (7.776 parole): 4 parole ≈ 51,7 bit; 5 parole ≈ 64,6 bit; 6 parole ≈ 77,5 bit; 7 parole ≈ 90,5 bit.', 'Questo calcolo presuppone che l\'attaccante conosca il vostro metodo di generazione.'], bullets: ['8 caratteri casuali (a-z): log₂(26^8) ≈ 37,6 bit', '12 caratteri casuali (a-z, A-Z, 0-9, simboli): log₂(95^12) ≈ 78,8 bit', '4 parole Diceware: log₂(7776^4) ≈ 51,7 bit', '6 parole Diceware: log₂(7776^6) ≈ 77,5 bit', '16 caratteri casuali (ASCII completo): log₂(95^16) ≈ 105 bit', '8 parole Diceware: log₂(7776^8) ≈ 103,4 bit'] },
    { heading: 'L\'argomento a favore delle passphrase', paragraphs: ['Le passphrase offrono un vantaggio unico: scambiano complessità di caratteri con lunghezza, raggiungendo alta entropia rimanendo memorizzabili. Una frase di sei parole ha circa 78 bit di entropia — equivalente a una password casuale di 12 caratteri.', 'Il fattore memorizzabilità non è solo comodità — è un vantaggio di sicurezza. Quando le password sono difficili da ricordare, gli utenti le annotano in modo insicuro o le riutilizzano.', 'Le passphrase resistono meglio anche all\'osservazione alle spalle.', 'Il metodo Diceware, sviluppato da Arnold Reinhold nel 1995, usa dadi fisici per selezionare parole da una lista numerata. L\'EFF ha aggiornato la lista nel 2016.'] },
    { heading: 'L\'argomento a favore delle password casuali', paragraphs: ['Le password casuali raggiungono maggiore entropia per carattere. Una di 16 caratteri fornisce circa 105 bit — servirebbero 8 parole Diceware per eguagliarla.', 'Per account gestiti da un gestore, le password casuali sono strettamente superiori poiché la memorizzabilità è irrilevante.', 'Le password casuali sono anche più compatte, importante in sistemi con limiti di lunghezza bassi.', 'Lo svantaggio principale è che sono impossibili da memorizzare.'] },
    { heading: 'Quando usare ciascun approccio', paragraphs: ['Usate passphrase per: la password master del gestore; accessi al computer; PIN del telefono; crittografia del disco; e qualsiasi credenziale dove non potete affidarvi al riempimento automatico.', 'Usate password casuali per: tutti gli account nel gestore; chiavi API; account di servizio; password di database.', 'Per massima sicurezza, combinate entrambi: una passphrase forte come master e password casuali uniche per ogni account.'] },
    { heading: 'Rafforzare la vostra passphrase', paragraphs: ['Partite con minimo 5 parole per account personali e 6-7 per obiettivi ad alto valore. Usate la lista EFF o equivalente con almeno 7.776 voci.', 'Considerate di aggiungere una o due modifiche: capitalizzate una parola casuale, inserite una cifra o usate un separatore insolito.', 'Non selezionate mai le parole voi stessi. La selezione umana è fortemente orientata verso parole comuni. Usate sempre dadi o un generatore crittografico.'], bullets: ['Minimo 5 parole per account standard, 6-7 per critici', 'Usate dadi o CSPRNG — mai scegliere manualmente', 'Aggiungete una piccola modifica (maiuscola, cifra, separatore)', 'Usate una lista di 7.776+ parole (EFF Diceware)', 'Esercitatevi a digitare fino a sviluppare memoria muscolare', 'Conservate una copia scritta in luogo fisicamente sicuro'] },
    { heading: 'Conclusione', paragraphs: ['Sia le passphrase che le password casuali possono fornire eccellente sicurezza se usate correttamente. La scelta dipende dal contesto: passphrase per la memoria umana, password casuali per la gestione automatica.', 'Qualunque metodo usiate, il fattore più importante è l\'unicità. Una passphrase perfetta riutilizzata su tre siti è molto meno sicura di tre password mediocri ma uniche.'] },
  ],
};

export const pt: LocalizedArticleContent = {
  title: 'Frase-senha vs senha: entropia e segurança explicadas',
  excerpt: 'Entenda a matemática por trás da entropia de senhas e aprenda quando frases-senha superam senhas tradicionais. Inclui cálculos de entropia, metodologia Diceware e recomendações práticas.',
  seoTitle: 'Frase-senha vs senha: entropia e segurança explicadas',
  seoDescription: 'Análise profunda de frase-senha vs senha. Cobre matemática de entropia, listas Diceware, resistência a força bruta e quando usar cada abordagem.',
  keywords: ['frase-senha vs senha', 'entropia senha explicada', 'frase diceware', 'segurança frase-senha', 'cálculo bits entropia', 'matemática força senha'],
  sections: [
    { heading: 'O problema da entropia: por que a maioria das senhas falha', paragraphs: ['Toda senha possui uma propriedade mensurável chamada entropia — o número de bits de aleatoriedade que contém. Maior entropia significa mais combinações possíveis. Uma senha com 50 bits tem 2^50 possibilidades. A um bilhão de tentativas por segundo, leva cerca de 13 dias. A 80 bits, mesmo um trilhão de tentativas levaria 38.000 anos.', 'A percepção crítica é que a entropia depende de como a senha foi gerada, não de como ela parece. "Tr0ub4dor&3" tem apenas cerca de 28 bits. Enquanto isso, "correct horse battery staple" fornece aproximadamente 52 bits com a lista EFF.', 'A maioria das políticas foca na composição de caracteres em vez da entropia real. "Summer2026!" satisfaz todos os requisitos mas cai em segundos a um ataque de dicionário.'] },
    { heading: 'Como a entropia de senhas é calculada', paragraphs: ['Para uma senha verdadeiramente aleatória: entropia = log₂(C^L). Uma senha de 12 caracteres de um conjunto de 95 tem ≈ 79 bits.', 'Para frases-senha: entropia = log₂(W^N). Com a lista EFF (7.776 palavras): 4 palavras ≈ 51,7 bits; 5 palavras ≈ 64,6 bits; 6 palavras ≈ 77,5 bits; 7 palavras ≈ 90,5 bits.', 'Este cálculo assume que o atacante conhece seu método de geração.'], bullets: ['8 caracteres aleatórios (a-z): log₂(26^8) ≈ 37,6 bits', '12 caracteres aleatórios (a-z, A-Z, 0-9, símbolos): log₂(95^12) ≈ 78,8 bits', '4 palavras Diceware: log₂(7776^4) ≈ 51,7 bits', '6 palavras Diceware: log₂(7776^6) ≈ 77,5 bits', '16 caracteres aleatórios (ASCII completo): log₂(95^16) ≈ 105 bits', '8 palavras Diceware: log₂(7776^8) ≈ 103,4 bits'] },
    { heading: 'O argumento a favor das frases-senha', paragraphs: ['Frases-senha oferecem uma vantagem única: trocam complexidade de caracteres por comprimento, alcançando alta entropia enquanto permanecem memoráveis. Uma frase de seis palavras tem aproximadamente 78 bits de entropia — equivalente a uma senha aleatória de 12 caracteres.', 'O fator memorabilidade não é apenas conveniência — é uma vantagem de segurança. Quando senhas são difíceis de lembrar, usuários as anotam de forma insegura ou as reutilizam.', 'Frases-senha também resistem melhor à espionagem por cima do ombro.', 'O método Diceware, desenvolvido por Arnold Reinhold em 1995, usa dados físicos para selecionar palavras. A EFF atualizou a lista em 2016.'] },
    { heading: 'O argumento a favor das senhas aleatórias', paragraphs: ['Senhas aleatórias alcançam maior entropia por caractere. Uma de 16 caracteres fornece cerca de 105 bits — seriam necessárias 8 palavras Diceware para igualar.', 'Para contas gerenciadas por um gerenciador, senhas aleatórias são estritamente superiores, pois a memorabilidade é irrelevante.', 'Senhas aleatórias são também mais compactas, importante em sistemas com limites baixos de comprimento.', 'A principal desvantagem é que são impossíveis de memorizar.'] },
    { heading: 'Quando usar cada abordagem', paragraphs: ['Use frases-senha para: sua senha mestra; login do computador; PINs de telefone; criptografia de disco; e qualquer credencial onde não possa confiar no preenchimento automático.', 'Use senhas aleatórias para: todas as contas no gerenciador; chaves API; contas de serviço; senhas de banco de dados.', 'Para máxima segurança, combine ambas: uma frase-senha forte como mestra e senhas aleatórias únicas para cada conta.'] },
    { heading: 'Fortalecendo sua frase-senha', paragraphs: ['Comece com mínimo de 5 palavras para contas pessoais e 6-7 para alvos de alto valor. Use a lista EFF ou equivalente com pelo menos 7.776 entradas.', 'Considere adicionar uma ou duas modificações: capitalize uma palavra aleatória, insira um dígito ou use um separador incomum.', 'Nunca selecione palavras você mesmo. A seleção humana é fortemente enviesada para palavras comuns. Sempre use dados ou um gerador criptográfico.'], bullets: ['Mínimo 5 palavras para contas padrão, 6-7 para críticas', 'Use dados ou CSPRNG — nunca escolha manualmente', 'Adicione uma pequena modificação (maiúscula, dígito, separador)', 'Use lista de palavras com 7.776+ entradas (EFF Diceware)', 'Pratique digitação até desenvolver memória muscular', 'Guarde cópia escrita em local fisicamente seguro'] },
    { heading: 'Conclusão', paragraphs: ['Tanto frases-senha quanto senhas aleatórias podem fornecer excelente segurança quando usadas corretamente. A escolha depende do contexto: frases-senha para memória humana, senhas aleatórias para gestão por máquinas.', 'Qualquer que seja o método, o fator mais importante é a unicidade. Uma frase-senha perfeita reutilizada em três sites é muito menos segura que três senhas medíocres mas únicas.'] },
  ],
};

export const ru: LocalizedArticleContent = {
  title: 'Парольная фраза vs пароль: энтропия и безопасность',
  excerpt: 'Поймите математику энтропии паролей и узнайте, когда парольные фразы превосходят традиционные пароли. Включает расчёты энтропии, методологию Diceware и практические рекомендации.',
  seoTitle: 'Парольная фраза vs пароль: энтропия и безопасность',
  seoDescription: 'Глубокий анализ парольных фраз vs паролей. Математика энтропии, списки Diceware, устойчивость к brute-force и когда использовать каждый подход.',
  keywords: ['парольная фраза vs пароль', 'энтропия пароля объяснение', 'фраза diceware', 'безопасность парольной фразы', 'расчёт битов энтропии', 'математика стойкости паролей'],
  sections: [
    { heading: 'Проблема энтропии: почему большинство паролей уязвимы', paragraphs: ['Каждый пароль имеет измеримое свойство — энтропию — количество бит случайности. Пароль с 50 битами энтропии имеет 2^50 возможностей. При миллиарде попыток в секунду это займёт около 13 дней. При 80 битах даже триллион попыток в секунду потребует 38 000 лет.', 'Ключевой вывод: энтропия зависит от того, как пароль был создан, а не от того, как он выглядит. "Tr0ub4dor&3" имеет только ~28 бит энтропии. А "correct horse battery staple" обеспечивает ~52 бита со списком EFF.', 'Большинство политик фокусируются на составе символов, а не на реальной энтропии. "Summer2026!" удовлетворяет все требования, но падёт перед словарной атакой за секунды.'] },
    { heading: 'Как рассчитывается энтропия', paragraphs: ['Для по-настоящему случайного пароля: энтропия = log₂(C^L). 12-символьный пароль из набора 95 символов имеет ≈ 79 бит.', 'Для парольных фраз: энтропия = log₂(W^N). С EFF-списком (7 776 слов): 4 слова ≈ 51,7 бит; 5 слов ≈ 64,6 бит; 6 слов ≈ 77,5 бит; 7 слов ≈ 90,5 бит.', 'Расчёт предполагает, что атакующий знает ваш метод генерации — это консервативная, реалистичная оценка безопасности.'], bullets: ['8 случайных символов (a-z): log₂(26^8) ≈ 37,6 бит', '12 случайных символов (a-z, A-Z, 0-9, символы): log₂(95^12) ≈ 78,8 бит', '4 слова Diceware: log₂(7776^4) ≈ 51,7 бит', '6 слов Diceware: log₂(7776^6) ≈ 77,5 бит', '16 случайных символов (полный ASCII): log₂(95^16) ≈ 105 бит', '8 слов Diceware: log₂(7776^8) ≈ 103,4 бит'] },
    { heading: 'Аргументы в пользу парольных фраз', paragraphs: ['Парольные фразы обменивают сложность символов на длину, достигая высокой энтропии при сохранении запоминаемости. Фраза из шести слов имеет ~78 бит — сопоставимо с 12-символьным случайным паролем, но гораздо проще для запоминания.', 'Запоминаемость — это не просто удобство, это преимущество безопасности. Когда пароли трудно запомнить, пользователи записывают их небезопасно или используют повторно.', 'Парольные фразы также лучше противостоят подглядыванию через плечо.', 'Метод Diceware, разработанный Арнольдом Рейнхольдом в 1995 году, использует физические кубики для выбора слов. EFF обновила список в 2016 году.'] },
    { heading: 'Аргументы в пользу случайных паролей', paragraphs: ['Случайные пароли достигают более высокой энтропии на символ. 16-символьный пароль обеспечивает ~105 бит — нужно 8 слов Diceware для сравнения.', 'Для аккаунтов, управляемых менеджером паролей, случайные пароли строго превосходят, поскольку запоминаемость не важна.', 'Случайные пароли также более компактны, что важно в системах с низкими ограничениями длины.', 'Главный недостаток — их невозможно запомнить.'] },
    { heading: 'Когда использовать каждый подход', paragraphs: ['Используйте фразы для: мастер-пароля менеджера; входа в компьютер; PIN телефона; шифрования диска; и любых учётных данных без автозаполнения.', 'Используйте случайные пароли для: всех аккаунтов в менеджере; API-ключей; сервисных аккаунтов; паролей баз данных.', 'Для максимальной безопасности комбинируйте оба подхода: надёжная фраза как мастер-пароль и уникальные случайные пароли для каждого аккаунта.'] },
    { heading: 'Усиление вашей парольной фразы', paragraphs: ['Начните с минимум 5 слов для личных аккаунтов и 6-7 для высокоценных целей. Используйте список EFF или эквивалентный с минимум 7 776 записями.', 'Рассмотрите одну-две модификации: заглавная буква случайного слова, цифра между словами или необычный разделитель.', 'Никогда не выбирайте слова самостоятельно. Человеческий выбор слов сильно смещён к частотным словам. Всегда используйте кубики или криптографический генератор.'], bullets: ['Минимум 5 слов для стандартных аккаунтов, 6-7 для критических', 'Кубики или CSPRNG — никогда не выбирайте вручную', 'Одна небольшая модификация (заглавная, цифра, разделитель)', 'Список слов 7 776+ записей (EFF Diceware)', 'Тренируйтесь набирать до мышечной памяти', 'Храните записанную копию в физически безопасном месте'] },
    { heading: 'Итог', paragraphs: ['И парольные фразы, и случайные пароли обеспечивают отличную безопасность при правильном использовании. Выбор зависит от контекста: фразы для человеческой памяти, случайные пароли для машинного управления.', 'Какой бы метод вы ни использовали, самый важный фактор — уникальность. Идеальная фраза, использованная повторно на трёх сайтах, гораздо менее безопасна, чем три посредственных, но уникальных пароля.'] },
  ],
};

export const zh: LocalizedArticleContent = {
  title: '密码短语vs密码：熵值与安全性解析',
  excerpt: '了解密码熵值背后的数学原理，学习何时密码短语优于传统密码。 包含熵值计算、Diceware方法论和实用建议。 每个密码都有一个可测量的属性叫熵值——它包含的随机性位数。',
  seoTitle: '密码短语vs密码熵值 — 哪个更安全？ | generatepasswordto.me',
  seoDescription: '了解密码熵值背后的数学原理，学习何时密码短语优于传统密码。 包含熵值计算、Diceware方法论和实用建议。 深入分析密码短语与密码的安全性。',
  keywords: ['密码短语vs密码', '密码熵值解释', 'diceware密码短语', '密码短语安全', '熵值位数计算', '密码强度数学'],
  sections: [
    { heading: '熵值问题：为什么大多数密码失败', paragraphs: ['每个密码都有一个可测量的属性叫熵值——它包含的随机性位数。更高的熵值意味着攻击者必须尝试更多组合。50位熵值的密码有2^50种可能。每秒10亿次猜测需要约13天。80位时，即使每秒一万亿次也需要38,000年。', '关键洞察是：熵值取决于密码的生成方式，而非外观。"Tr0ub4dor&3"仅有约28位熵值。而"correct horse battery staple"用EFF 7,776词表提供约52位。', '大多数密码策略关注字符组成而非实际熵值。"Summer2026!"满足所有复杂性要求但几秒钟就被字典攻击破解。'] },
    { heading: '密码熵值如何计算', paragraphs: ['对于真正随机的密码：熵值 = log₂(C^L)。95字符集的12字符密码有≈79位。', '对于密码短语：熵值 = log₂(W^N)。EFF列表(7,776词)：4词≈51.7位；5词≈64.6位；6词≈77.5位；7词≈90.5位。', '此计算假设攻击者知道你的生成方法——这是保守、现实的安全度量。'], bullets: ['8个随机字符(a-z)：log₂(26^8) ≈ 37.6位', '12个随机字符(含符号)：log₂(95^12) ≈ 78.8位', '4个Diceware词：log₂(7776^4) ≈ 51.7位', '6个Diceware词：log₂(7776^6) ≈ 77.5位', '16个随机字符(完整ASCII)：log₂(95^16) ≈ 105位', '8个Diceware词：log₂(7776^8) ≈ 103.4位'] },
    { heading: '密码短语的优势', paragraphs: ['密码短语用长度换取字符复杂性，在保持易记的同时实现高熵值。六词短语约有78位熵值——与12字符随机密码相当，但更容易记忆。', '易记性不仅是便利——它是安全优势。当密码难以记忆时，用户会不安全地记录或重复使用。', '密码短语也比字符密码更能抵抗偷窥。', 'Diceware方法由Arnold Reinhold于1995年开发，使用物理骰子从编号列表中选词。EFF于2016年更新了词表。'] },
    { heading: '随机密码的优势', paragraphs: ['随机字符密码每个字符的熵值更高。16字符随机密码提供约105位——需要8个Diceware词才能匹配。', '对于密码管理器管理的账户，随机密码严格优越，因为记忆性无关紧要。', '随机密码也更紧凑，在有长度限制的系统中很重要。', '主要缺点是基本无法记忆。'] },
    { heading: '何时使用哪种方法', paragraphs: ['使用密码短语：主密码；电脑登录密码；手机PIN；磁盘加密密码；以及任何不能依赖自动填充的凭证。', '使用随机密码：管理器中的所有账户；API密钥和令牌；服务账户；数据库密码。', '为获得最大安全性，两种方法结合使用：强密码短语作为主密码，每个账户使用唯一的随机密码。'] },
    { heading: '加强你的密码短语', paragraphs: ['个人账户至少5个词，高价值目标6-7个词。使用EFF列表或至少7,776条目的等效列表。', '考虑添加一两个修改：将随机一个词大写、在两词之间插入数字或使用不常见的分隔符。', '永远不要自己选词。人类选词严重偏向常见词。始终使用骰子或密码学随机生成器。'], bullets: ['标准账户至少5个词，关键账户6-7个', '使用骰子或CSPRNG——永不手动选择', '添加一个小修改（大写、数字、分隔符）', '使用7,776+条目的词表（EFF Diceware）', '练习输入直到形成肌肉记忆', '在物理安全位置保存书面备份'] },
    { heading: '总结', paragraphs: ['正确使用时，密码短语和随机密码都能提供出色的安全性。选择取决于场景：密码短语用于人类记忆，随机密码用于机器管理。', '无论哪种方法，最重要的因素是唯一性。在三个网站重复使用的再强的密码短语远不如三个普通但唯一的密码安全。'] },
  ],
};

export const ja: LocalizedArticleContent = {
  title: 'パスフレーズvsパスワード：エントロピーとセキュリティの解説',
  excerpt: 'パスワードエントロピーの背後にある数学を理解し、パスフレーズが従来のパスワードを上回る場面を学びましょう。 エントロピー計算、Diceware方法論、実践的な推奨事項を含みます。',
  seoTitle: 'パスフレーズvsパスワードエントロピー — どちらが安全？ | generatepasswordto.me',
  seoDescription: 'パスフレーズvsパスワードの深い分析。 エントロピー数学、Dicewareワードリスト、ブルートフォース耐性、各アプローチの使い分けを解説。',
  keywords: ['パスフレーズvsパスワード', 'パスワードエントロピー解説', 'dicewareパスフレーズ', 'パスフレーズセキュリティ', 'エントロピービット計算', 'パスワード強度数学'],
  sections: [
    { heading: 'エントロピー問題：なぜほとんどのパスワードは失敗するか', paragraphs: ['すべてのパスワードにはエントロピーという測定可能な特性があります——含まれるランダムネスのビット数です。50ビットのパスワードは2^50の可能性を持ちます。毎秒10億回の推測で約13日かかります。80ビットでは毎秒1兆回でも38,000年かかります。', '重要な洞察は、エントロピーはパスワードの生成方法に依存し、見た目ではないということです。「Tr0ub4dor&3」は約28ビットしかありません。一方「correct horse battery staple」はEFFリストで約52ビットを提供します。', 'ほとんどのパスワードポリシーは実際のエントロピーではなく文字構成に焦点を当てています。「Summer2026!」はすべての複雑性要件を満たしますが、辞書攻撃で数秒で破られます。'] },
    { heading: 'パスワードエントロピーの計算方法', paragraphs: ['真にランダムなパスワードの場合：エントロピー = log₂(C^L)。95文字セットの12文字パスワードは≈79ビットです。', 'パスフレーズの場合：エントロピー = log₂(W^N)。EFFリスト(7,776語)で：4語≈51.7ビット、5語≈64.6ビット、6語≈77.5ビット、7語≈90.5ビット。', 'この計算は攻撃者があなたの生成方法を知っていると仮定します——保守的で現実的なセキュリティ測定です。'], bullets: ['8ランダム文字(a-z)：log₂(26^8) ≈ 37.6ビット', '12ランダム文字(記号含む)：log₂(95^12) ≈ 78.8ビット', '4 Diceware語：log₂(7776^4) ≈ 51.7ビット', '6 Diceware語：log₂(7776^6) ≈ 77.5ビット', '16ランダム文字(完全ASCII)：log₂(95^16) ≈ 105ビット', '8 Diceware語：log₂(7776^8) ≈ 103.4ビット'] },
    { heading: 'パスフレーズの利点', paragraphs: ['パスフレーズは文字の複雑さを長さと交換し、記憶可能なまま高いエントロピーを達成します。6語のフレーズは約78ビット——ランダムな12文字パスワードに匹敵しますが、はるかに覚えやすいです。', '記憶しやすさは利便性だけでなく、セキュリティ上の利点です。パスワードが覚えにくいと、ユーザーは不安全にメモしたり再利用したりします。', 'パスフレーズは肩越しの覗き見にも強いです。', 'Diceware方式は1995年にArnold Reinholdが開発し、物理的なサイコロで番号付きリストから単語を選びます。EFFは2016年にリストを更新しました。'] },
    { heading: 'ランダムパスワードの利点', paragraphs: ['ランダム文字パスワードは1文字あたりより高いエントロピーを達成します。16文字のランダムパスワードは約105ビット——8個のDiceware語が必要です。', 'パスワードマネージャーで管理するアカウントでは、記憶性が無関係なのでランダムパスワードが厳密に優れています。', 'ランダムパスワードはよりコンパクトで、長さ制限の低いシステムで重要です。', '主な欠点は基本的に暗記不可能なことです。'] },
    { heading: '各アプローチの使い分け', paragraphs: ['パスフレーズを使う場面：マスターパスワード、PCログイン、電話PIN、ディスク暗号化、自動入力に頼れない認証情報。', 'ランダムパスワードを使う場面：マネージャー内のすべてのアカウント、APIキー、サービスアカウント、データベースパスワード。', '最大のセキュリティには両方を組み合わせ：強力なパスフレーズをマスターパスワードに、各アカウントにユニークなランダムパスワードを使用。'] },
    { heading: 'パスフレーズの強化', paragraphs: ['個人アカウントは最低5語、高価値ターゲットは6-7語から始めます。EFFリストまたは7,776以上のエントリを持つ同等のリストを使用。', '1-2の修正を検討：ランダムな1語を大文字に、2語の間に数字を挿入、または珍しい区切り文字を使用。', '自分で単語を選ばないでください。人間の単語選択は一般的な単語に偏ります。常にサイコロまたは暗号学的生成器を使用。'], bullets: ['標準アカウント最低5語、重要なものは6-7語', 'サイコロかCSPRNG使用——手動選択禁止', '小さな修正を追加（大文字化、数字、区切り）', '7,776+エントリのワードリスト使用（EFF Diceware）', '筋肉記憶ができるまで入力練習', '物理的に安全な場所に書面バックアップを保管'] },
    { heading: 'まとめ', paragraphs: ['正しく使用すれば、パスフレーズもランダムパスワードも優れたセキュリティを提供できます。選択はコンテキスト次第：パスフレーズは人間の記憶用、ランダムパスワードはマシン管理用。', 'どの方法でも最も重要な要素はユニーク性です。3つのサイトで使い回したどんなに強いパスフレーズもは、3つの平凡でもユニークなパスワードよりはるかに安全性が低いです。'] },
  ],
};

export const pl: LocalizedArticleContent = {
  title: 'Fraza hasłowa vs hasło: entropia i bezpieczeństwo wyjaśnione',
  excerpt: 'Zrozum matematykę stojącą za entropią haseł i dowiedz się, kiedy frazy hasłowe przewyższają tradycyjne hasła. Zawiera obliczenia entropii, metodologię Diceware i praktyczne zalecenia.',
  seoTitle: 'Fraza hasłowa vs hasło: entropia i bezpieczeństwo wyjaśnione',
  seoDescription: 'Dogłębna analiza fraz hasłowych vs haseł. Obejmuje matematykę entropii, listy Diceware, odporność na brute-force i kiedy stosować każde podejście.',
  keywords: ['fraza hasłowa vs hasło', 'entropia hasła wyjaśniona', 'fraza diceware', 'bezpieczeństwo frazy hasłowej', 'obliczanie bitów entropii', 'matematyka siły hasła'],
  sections: [
    { heading: 'Problem entropii: dlaczego większość haseł zawodzi', paragraphs: ['Każde hasło ma mierzalną właściwość zwaną entropią — liczbę bitów losowości. Hasło z 50 bitami entropii ma 2^50 możliwości. Przy miliardzie prób na sekundę to około 13 dni. Przy 80 bitach nawet bilion prób na sekundę wymagałby 38 000 lat.', 'Kluczowy wniosek: entropia zależy od tego, jak hasło zostało wygenerowane, nie jak wygląda. "Tr0ub4dor&3" ma tylko ~28 bitów entropii. Natomiast "correct horse battery staple" daje ~52 bity z listy EFF.', 'Większość polityk koncentruje się na składzie znaków zamiast na rzeczywistej entropii. "Summer2026!" spełnia wszystkie wymagania, ale pada przy ataku słownikowym w sekundy.'] },
    { heading: 'Jak oblicza się entropię haseł', paragraphs: ['Dla naprawdę losowego hasła: entropia = log₂(C^L). 12-znakowe hasło z zestawu 95 znaków ma ≈ 79 bitów.', 'Dla fraz: entropia = log₂(W^N). Z listą EFF (7 776 słów): 4 słowa ≈ 51,7 bitów; 5 słów ≈ 64,6 bitów; 6 słów ≈ 77,5 bitów; 7 słów ≈ 90,5 bitów.', 'Obliczenie zakłada, że atakujący zna twoją metodę generowania — to konserwatywna, realistyczna miara bezpieczeństwa.'], bullets: ['8 losowych znaków (a-z): log₂(26^8) ≈ 37,6 bitów', '12 losowych znaków (z symbolami): log₂(95^12) ≈ 78,8 bitów', '4 słowa Diceware: log₂(7776^4) ≈ 51,7 bitów', '6 słów Diceware: log₂(7776^6) ≈ 77,5 bitów', '16 losowych znaków (pełne ASCII): log₂(95^16) ≈ 105 bitów', '8 słów Diceware: log₂(7776^8) ≈ 103,4 bitów'] },
    { heading: 'Argumenty za frazami hasłowymi', paragraphs: ['Frazy hasłowe oferują unikalną zaletę: zamieniają złożoność znaków na długość, osiągając wysoką entropię przy zachowaniu zapamiętywalności. Sześciowyrazowa fraza ma ~78 bitów entropii — równowartość 12-znakowego losowego hasła, ale znacznie łatwiejsza do zapamiętania.', 'Zapamiętywalność to nie tylko wygoda — to zaleta bezpieczeństwa. Gdy hasła są trudne do zapamiętania, użytkownicy zapisują je niebezpiecznie lub je powtarzają.', 'Frazy hasłowe lepiej też opierają się podglądaniu przez ramię.', 'Metoda Diceware, opracowana przez Arnolda Reinholda w 1995, używa fizycznych kostek do wyboru słów. EFF zaktualizowała listę w 2016.'] },
    { heading: 'Argumenty za losowymi hasłami', paragraphs: ['Losowe hasła osiągają wyższą entropię na znak. 16-znakowe hasło daje ~105 bitów — potrzebujesz 8 słów Diceware, żeby to dorównać.', 'Dla kont zarządzanych przez menedżer losowe hasła są ściśle lepsze, bo zapamiętywalność nie ma znaczenia.', 'Losowe hasła są też bardziej kompaktowe, co jest ważne w systemach z niskimi limitami długości.', 'Główna wada to niemożność zapamiętania.'] },
    { heading: 'Kiedy używać którego podejścia', paragraphs: ['Używaj fraz dla: hasła głównego menedżera; logowania do komputera; PIN-ów telefonu; szyfrowania dysku; i każdych poświadczeń, gdzie nie możesz polegać na auto-wypełnianiu.', 'Używaj losowych haseł dla: wszystkich kont w menedżerze; kluczy API; kont serwisowych; haseł baz danych.', 'Dla maksymalnego bezpieczeństwa łącz oba podejścia: silna fraza jako hasło główne i unikalne losowe hasła dla każdego konta.'] },
    { heading: 'Wzmacnianie frazy hasłowej', paragraphs: ['Zacznij od minimum 5 słów dla kont osobistych i 6-7 dla celów o wysokiej wartości. Używaj listy EFF lub równoważnej z co najmniej 7 776 wpisami.', 'Rozważ dodanie jednej lub dwóch modyfikacji: wielka litera losowego słowa, cyfra między słowami lub nietypowy separator.', 'Nigdy nie wybieraj słów samodzielnie. Ludzki wybór jest silnie skrzywiony ku popularnym słowom. Zawsze używaj kostek lub generatora kryptograficznego.'], bullets: ['Minimum 5 słów dla standardowych kont, 6-7 dla krytycznych', 'Używaj kostek lub CSPRNG — nigdy nie wybieraj ręcznie', 'Dodaj małą modyfikację (wielka litera, cyfra, separator)', 'Lista słów z 7 776+ wpisami (EFF Diceware)', 'Ćwicz wpisywanie aż do pamięci mięśniowej', 'Przechowuj pisemną kopię w fizycznie bezpiecznym miejscu'] },
    { heading: 'Podsumowanie', paragraphs: ['Zarówno frazy hasłowe, jak i losowe hasła mogą zapewnić doskonałe bezpieczeństwo przy prawidłowym użyciu. Wybór zależy od kontekstu: frazy dla ludzkiej pamięci, losowe hasła dla zarządzania maszynowego.', 'Niezależnie od metody, najważniejszy czynnik to unikalność. Idealna fraza hasłowa powtórzona na trzech stronach jest znacznie mniej bezpieczna niż trzy przeciętne, ale unikalne hasła.'] },
  ],
};

export const vi: LocalizedArticleContent = {
  title: 'Cụm mật khẩu và mật khẩu: entropy và bảo mật',
  excerpt:
    'Hiểu phép toán đằng sau entropy mật khẩu và khi nào cụm mật khẩu vượt trội mật khẩu thường. Gồm cách tính entropy, phương pháp Diceware và khuyến nghị thực tế.',
  seoTitle: 'Cụm mật khẩu và mật khẩu: entropy và bảo mật — mật khẩu mạnh nhất',
  seoDescription:
    'Hiểu phép toán đằng sau entropy mật khẩu và khi nào cụm mật khẩu vượt trội mật khẩu thường. Gồm cách tính entropy, phương pháp Diceware và khuyến nghị thực tế.',
  keywords: [
    'cụm mật khẩu passphrase là gì',
    'mật khẩu mạnh ngẫu nhiên',
    'mật khẩu mạnh dễ nhớ',
    'mật khẩu mạnh là gì',
    'mật khẩu mạnh nhất',
    'trình quản lý mật khẩu là gì',
  ],
  sections: [
    {
      heading: 'Vấn đề entropy: vì sao phần lớn mật khẩu thất bại',
      paragraphs: [
        'Mỗi mật khẩu có một thuộc tính đo được gọi là entropy — số bit ngẫu nhiên chứa trong đó. Entropy càng cao thì càng nhiều tổ hợp kẻ tấn công phải thử. Mật khẩu 50 bit entropy có 2^50 (khoảng 1,1 triệu tỷ) khả năng. Với 1 tỷ lần thử mỗi giây, cần khoảng 13 ngày để thử hết. Ở 80 bit, kể cả 1.000 tỷ lần thử mỗi giây cũng mất 38.000 năm.',
        'Điểm mấu chốt: entropy phụ thuộc cách mật khẩu được tạo, không phải vẻ ngoài. "Tr0ub4dor&3" trông phức tạp nhưng chỉ khoảng 28 bit vì theo khuôn mẫu dễ đoán (từ điển + thay thế phổ biến + ký hiệu). Trong khi "correct horse battery staple" — bốn từ ngẫu nhiên — cho khoảng 44 bit từ danh sách 2.048 từ hoặc 52 bit từ danh sách EFF 7.776 từ.',
        'Phần lớn chính sách mật khẩu tập trung vào thành phần ký tự (hoa, thường, số, ký hiệu) thay vì entropy thật. Tạo cảm giác an toàn giả: "Summer2026!" thỏa mọi yêu cầu phức tạp nhưng gục trước tấn công từ điển trong vài giây.',
      ],
    },
    {
      heading: 'Cách tính entropy mật khẩu',
      paragraphs: [
        'Với mật khẩu thật ngẫu nhiên, entropy bằng log₂(C^L), trong đó C là kích thước bộ ký tự và L là độ dài. Mật khẩu 12 ký tự từ bộ 95 ký tự (ASCII in được) có log₂(95^12) ≈ 79 bit. Mật khẩu 16 ký tự cùng bộ đạt khoảng 105 bit.',
        'Với cụm mật khẩu, entropy bằng log₂(W^N), trong đó W là kích thước danh sách từ và N là số từ. Dùng danh sách EFF lớn (7.776 từ): 4 từ cho log₂(7776^4) ≈ 51,7 bit; 5 từ ≈ 64,6 bit; 6 từ ≈ 77,5 bit; 7 từ ≈ 90,5 bit.',
        'Cách tính giả định kẻ tấn công biết phương pháp. Nếu biết bạn dùng cụm Diceware 4 từ, chúng đối mặt 7.776^4 ≈ 3,7 triệu tỷ tổ hợp. Đây là thước đo bảo mật thận trọng, thực tế — giả định xấu nhất: kẻ tấn công biết phương pháp nhưng không biết từ cụ thể.',
      ],
      bullets: [
        '8 ký tự ngẫu nhiên (a-z): log₂(26^8) ≈ 37,6 bit',
        '12 ký tự ngẫu nhiên (a-z, A-Z, 0-9, ký hiệu): log₂(95^12) ≈ 78,8 bit',
        '4 từ Diceware: log₂(7776^4) ≈ 51,7 bit',
        '6 từ Diceware: log₂(7776^6) ≈ 77,5 bit',
        '16 ký tự ngẫu nhiên (ASCII đầy đủ): log₂(95^16) ≈ 105 bit',
        '8 từ Diceware: log₂(7776^8) ≈ 103,4 bit',
      ],
    },
    {
      heading: 'Lợi thế của cụm mật khẩu',
      paragraphs: [
        'Cụm mật khẩu có lợi thế riêng: đánh đổi độ phức tạp từng ký tự lấy độ dài, đạt entropy cao mà vẫn dễ nhớ và dễ gõ. Cụm sáu từ như "monarch-fabric-eleven-radar-canopy-walrus" có khoảng 78 bit entropy — ngang mật khẩu ngẫu nhiên 12 ký tự — nhưng con người dễ nhớ và gõ đúng hơn nhiều.',
        'Khả năng ghi nhớ không chỉ là tiện lợi mà còn là lợi thế bảo mật. Khi mật khẩu khó nhớ, người dùng ghi lại không an toàn, dùng lại nhiều nơi hoặc tạo khuôn mẫu dễ đoán. Cụm mật khẩu bạn thật sự nhớ được sẽ được dùng đúng, không dùng lại và ít phải đặt lại.',
        'Cụm mật khẩu cũng khó bị nhìn trộm hơn. Người quan sát có thể nhớ chuỗi "k9$mP#2xLw", nhưng khó giữ trong đầu một chuỗi từ gõ nhanh như "correct horse battery staple".',
        'Phương pháp Diceware do Arnold Reinhold phát triển năm 1995, dùng xúc xắc thật để chọn từ từ danh sách đánh số. Mỗi lần gieo thật ngẫu nhiên, không cần thuật toán. Năm 2016, EFF cập nhật danh sách chỉ gồm từ tiếng Anh phổ biến, dễ viết, giúp cụm mật khẩu thực tế hơn.',
      ],
    },
    {
      heading: 'Lợi thế của mật khẩu ngẫu nhiên',
      paragraphs: [
        'Mật khẩu ký tự ngẫu nhiên đạt entropy trên mỗi ký tự cao hơn cụm mật khẩu trên mỗi từ. Mật khẩu 16 ký tự ngẫu nhiên từ bộ ASCII in được cho khoảng 105 bit — cần 8 từ Diceware mới ngang, tức chuỗi dài hơn nhiều để gõ.',
        'Với tài khoản do trình quản lý mật khẩu quản lý (không bao giờ gõ tay), mật khẩu ngẫu nhiên hoàn toàn vượt trội. Trình quản lý lo tạo, lưu và tự động điền, nên khả năng ghi nhớ không còn quan trọng. Bạn có thể dùng chuỗi 20, 30 hay 64 ký tự.',
        'Mật khẩu ngẫu nhiên cũng gọn hơn, quan trọng với hệ thống giới hạn độ dài thấp. Một số hệ thống cũ chặn ở 16 hoặc thậm chí 8 ký tự. Trong môi trường đó, tối đa entropy trên mỗi ký tự là thiết yếu.',
        'Nhược điểm chính: gần như không thể ghi nhớ. Nếu mất quyền truy cập trình quản lý, khôi phục phụ thuộc hoàn toàn vào chiến lược sao lưu. Vì vậy mật khẩu ngẫu nhiên không phù hợp cho mật khẩu chính hoặc thông tin phải nhập từ trí nhớ.',
      ],
    },
    {
      heading: 'Khi nào dùng cách nào',
      paragraphs: [
        'Dùng cụm mật khẩu cho: mật khẩu chính của trình quản lý (mật khẩu duy nhất phải nhớ); mật khẩu đăng nhập máy tính (gõ thường xuyên từ trí nhớ); PIN mở khóa điện thoại (dùng số ngẫu nhiên 6-8 chữ số hoặc cụm ngắn); mật khẩu mã hóa toàn ổ đĩa (nhập lúc khởi động, trước khi có trình quản lý); và mọi thông tin không thể dựa vào tự động điền.',
        'Dùng mật khẩu ký tự ngẫu nhiên cho: mọi tài khoản lưu trong trình quản lý; khóa API và token; tài khoản dịch vụ; mật khẩu cơ sở dữ liệu; và mọi thông tin sẽ được dán hoặc tự động điền thay vì gõ từ trí nhớ.',
        'Để bảo mật tối đa, kết hợp cả hai: cụm mật khẩu mạnh làm mật khẩu chính (bảo vệ quyền vào trình quản lý) và mật khẩu ngẫu nhiên riêng cho từng tài khoản (do trình quản lý tạo và quản lý). Cách phân lớp này cho bạn khả năng ghi nhớ khi cần và entropy tối đa ở mọi nơi khác.',
      ],
    },
    {
      heading: 'Tăng cường cụm mật khẩu',
      paragraphs: [
        'Bắt đầu với tối thiểu 5 từ cho tài khoản cá nhân và 6-7 từ cho mục tiêu giá trị cao. Dùng danh sách EFF lớn hoặc tương đương có ít nhất 7.776 mục để mỗi từ đóng góp khoảng 12,9 bit entropy.',
        'Có thể thêm một hai thay đổi: viết hoa một từ ngẫu nhiên, chèn chữ số giữa hai từ hoặc dùng dấu phân cách lạ. Ví dụ "monarch Fabric 11 radar-canopy-walrus" thêm vài bit mà không giảm đáng kể khả năng nhớ. Đừng sửa quá nhiều — sức mạnh đến từ số từ và tính ngẫu nhiên, không phải mẹo khéo léo.',
        'Tuyệt đối không tự chọn từ. Con người thiên lệch mạnh về từ phổ biến, khái niệm liên quan và lựa chọn văn hóa. Luôn dùng xúc xắc hoặc trình tạo số ngẫu nhiên bằng mật mã. Nếu bạn nghĩ mình đang chọn từ ngẫu nhiên thì gần như chắc chắn là không — nhiều thập kỷ nghiên cứu xác nhận con người tạo ngẫu nhiên rất kém.',
      ],
      bullets: [
        'Tối thiểu 5 từ cho tài khoản thường, 6-7 từ cho tài khoản quan trọng',
        'Dùng xúc xắc hoặc CSPRNG — không tự chọn từ',
        'Thêm một thay đổi nhỏ (viết hoa, chữ số, dấu phân cách)',
        'Dùng danh sách từ 7.776+ mục (EFF Diceware)',
        'Luyện gõ đến khi tạo phản xạ',
        'Lưu bản viết tay ở nơi an toàn cho đến khi nhớ',
      ],
    },
    {
      heading: 'Kết luận',
      paragraphs: [
        'Cả cụm mật khẩu và mật khẩu ngẫu nhiên đều bảo mật tốt khi dùng đúng. Lựa chọn phụ thuộc ngữ cảnh: cụm mật khẩu cho trí nhớ con người, mật khẩu ngẫu nhiên cho máy quản lý. Lựa chọn tệ nhất là mật khẩu "thỏa hiệp" không hoàn toàn ngẫu nhiên cũng không phải cụm mật khẩu đúng — kiểu "Monkey123!" mà người dùng tự chọn vì thấy "đủ mạnh".',
        'Dù dùng cách nào, yếu tố quan trọng nhất là tính duy nhất. Một cụm mật khẩu hoàn hảo dùng lại ở ba trang vẫn kém an toàn hơn ba mật khẩu tầm thường nhưng riêng biệt. Kết hợp trình quản lý mật khẩu và xác thực đa yếu tố, cả hai cách đều bảo vệ tài khoản trước phần lớn tấn công thực tế.',
      ],
    },
  ],
};

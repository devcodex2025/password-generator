import type { LocalizedArticleContent } from '../articles';

export const en: LocalizedArticleContent = {
  title: 'Passphrase vs Password: Entropy and Security Explained',
  excerpt:
    'Understand the mathematics behind password entropy and learn when passphrases outperform traditional passwords. Includes entropy calculations, Diceware methodology, and practical recommendations.',
  seoTitle: 'Passphrase vs Password Entropy — Which Is More Secure? | generatepasswordto.me',
  seoDescription:
    'Deep dive into passphrase vs password security. Covers entropy math, Diceware word lists, brute-force resistance, memorability trade-offs, and when to use each approach for maximum protection.',
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
        'The key disadvantage of random passwords is that they are essentially impossible to memorize. If you lose access to your password manager, recovery depends entirely on your backup strategy. This makes random passwords inappropriate for your master password or any credential you must enter from memory.',
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
  seoTitle: 'Парольна фраза vs пароль — що безпечніше? Ентропія | generatepasswordto.me',
  seoDescription:
    'Глибоке занурення в безпеку парольних фраз проти паролів. Математика ентропії, списки слів Diceware, стійкість до brute-force, компроміси запам\'ятовуваності та коли використовувати кожен підхід.',
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
        'Головний недолік випадкових паролів — їх фактично неможливо запам\'ятати. Якщо ви втратите доступ до менеджера паролів, відновлення повністю залежить від вашої стратегії резервного копіювання. Це робить випадкові паролі непридатними для вашого мастер-пароля або будь-яких облікових даних, які ви повинні вводити з пам\'яті.',
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

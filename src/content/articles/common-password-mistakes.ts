import type { LocalizedArticleContent } from '../articles';

export const en: LocalizedArticleContent = {
  title: 'Most Common Password Mistakes and How to Fix Them',
  excerpt:
    'Review the highest-risk password habits affecting millions of users and learn practical, step-by-step ways to replace them with secure routines that actually stick.',
  seoTitle: 'Common Password Mistakes & Fixes — Why 12 Characters Is Not Enough | generatepasswordto.me',
  seoDescription:
    'The most dangerous password habits in 2026 and how to fix them. Covers why 12-character passwords may be insufficient, reuse risks, pattern predictability, and actionable security improvements.',
  keywords: [
    'common password mistakes',
    'weak password examples',
    'password safety checklist',
    'why 12 character passwords are weak',
    'password reuse risks',
    'password security mistakes',
  ],
  sections: [
    {
      heading: 'The Password Problem in Numbers',
      paragraphs: [
        'Despite decades of security awareness campaigns, the most common passwords in 2025 remain embarrassingly predictable. NordPass\'s annual analysis of breached credential databases found that "123456" topped the list for the fifth consecutive year, used by over 4.5 million accounts. "password," "qwerty123," and "111111" rounded out the top five. These passwords can be cracked in under one second.',
        'More concerning is the scale of password reuse. A 2024 SpyCloud study found that 64% of users whose credentials appeared in one breach had reused the same password on at least one other account. Among users who appeared in multiple breaches, 72% were still using identical or highly similar passwords years later — even after receiving breach notifications.',
        'The financial impact is staggering. IBM\'s 2024 Cost of a Data Breach report found the average breach cost $4.88 million, with compromised credentials being the most common initial attack vector (16% of all breaches). For individuals, account takeover fraud cost consumers $12.5 billion in 2023, according to Javelin Strategy.',
      ],
    },
    {
      heading: 'Mistake #1: Passwords That Are Too Short',
      paragraphs: [
        'Many users and organizations still consider 8-character passwords acceptable. In 2026, this is dangerously inadequate. A modern GPU rig (8× NVIDIA RTX 4090) can exhaust all possible 8-character passwords from the full 95-character printable ASCII set in approximately 7 hours when attacking bcrypt hashes with work factor 5. Against faster hash functions like MD5 or SHA-1 (still used by some legacy systems), the same passwords fall in seconds.',
        'Even 12-character passwords may not provide sufficient margin depending on the hashing algorithm used by the service. Against a weak hash (MD5, SHA-1), a 12-character password from the full character set provides reasonable protection. But if the password follows a predictable pattern — a word, followed by digits, followed by a symbol — the effective search space shrinks dramatically.',
        'The fix: use a password manager to generate random passwords of at least 16 characters for every account. For passwords you must memorize, use a passphrase of at least 5 random words (approximately 65 bits of entropy). Length is your most powerful weapon — each additional character exponentially increases the time to crack.',
      ],
      bullets: [
        '8 characters: crackable in hours (bcrypt) or seconds (MD5/SHA-1)',
        '12 characters (patterned): may fall to dictionary + rule attacks in days',
        '12 characters (random): strong against most attacks',
        '16+ characters (random): effectively uncrackable with current technology',
        '5+ word passphrase: strong and memorable alternative',
      ],
    },
    {
      heading: 'Mistake #2: Password Reuse Across Accounts',
      paragraphs: [
        'Password reuse is the single most dangerous password habit because it transforms any single breach into a cascade of compromised accounts. When a service is breached and your password is exposed, attackers automatically test those credentials on hundreds of popular services — email providers, banks, social media, cloud storage, shopping sites. This technique, called credential stuffing, is fully automated and begins within hours of breach data becoming available.',
        'The scale of credential stuffing is enormous. Akamai reported over 193 billion credential stuffing attacks in 2020 alone. Even with a success rate below 1%, that represents hundreds of millions of successful account takeovers. Your "unimportant" forum password becomes the key to your bank account if it is the same password.',
        'The only reliable fix is a unique password for every account. A password manager makes this practical — you generate and store a unique random password for each service, and the manager handles auto-fill. With a password manager, you only need to memorize one strong master password. Bitwarden\'s free tier provides unlimited passwords across unlimited devices, making cost not a barrier.',
      ],
    },
    {
      heading: 'Mistake #3: Predictable Patterns and Substitutions',
      paragraphs: [
        'Users forced to create "complex" passwords overwhelmingly follow predictable patterns: capitalize the first letter, add a digit at the end, append a symbol. "Password1!" satisfies every complexity requirement but is among the first passwords tested by any cracking tool. Researchers at Carnegie Mellon found that when users are told to include uppercase, they capitalize the first character 89% of the time. When told to include digits, they append them at the end 78% of the time.',
        'Leet-speak substitutions (@ for a, 3 for e, 0 for o, $ for s) add negligible security. Every modern password cracking tool includes these transformations in its default rule sets. "P@$$w0rd" is functionally identical to "Password" in terms of cracking difficulty.',
        'Keyboard patterns (qwerty, zxcvbn, 1qaz2wsx, qazwsx) look random to humans but are well-known sequences that cracking tools check early. Similarly, patterns based on visual shapes on the keyboard (drawing an L, a Z, or a cross) are catalogued in attacker dictionaries.',
        'The fix: stop trying to create passwords from human-chosen patterns. Let a cryptographic random generator produce your passwords. If you must create a memorizable password, use the Diceware passphrase method with at least 5 truly random words. Human creativity is predictable; randomness is not.',
      ],
    },
    {
      heading: 'Mistake #4: Personal Information in Passwords',
      paragraphs: [
        'Names of partners, children, pets, birthdays, anniversaries, phone numbers, addresses, and sports teams are the building blocks of most user-created passwords. An attacker who spends 30 minutes on your social media profiles can build a targeted dictionary that dramatically narrows the search space.',
        'This type of targeted attack — sometimes called a "social engineering" dictionary attack — is particularly effective against high-value targets. But even automated attacks include databases of common names, dates in various formats, and popular sports teams. "Messi2026!" or "Jessica0903" are trivially crackable.',
        'Even seemingly obscure personal information is risky. Your mother\'s maiden name, the street you grew up on, your first car — these are answers to common security questions that may be discoverable through public records, genealogy sites, or social media posts. Never use information that could be researched or guessed by someone who knows you.',
      ],
    },
    {
      heading: 'Mistake #5: Storing Passwords Insecurely',
      paragraphs: [
        'Writing passwords on sticky notes attached to your monitor, saving them in an unencrypted text file on your desktop, emailing them to yourself, or storing them in a browser\'s built-in password manager without a device password are all high-risk storage methods.',
        'A 2024 Ponemon Institute study found that 59% of employees admitted to writing passwords on paper, and 42% shared passwords with colleagues via email or messaging. In a corporate environment, any of these practices can lead to unauthorized access and compliance violations.',
        'The fix: use a dedicated password manager with end-to-end encryption. For individuals, Bitwarden (free, open source) or 1Password ($2.99/month) provide secure storage with auto-fill across all devices. For teams, these same tools offer shared vaults with access controls and audit trails. If you must write a password on paper (for a master password during the memorization period), store it in a locked safe or security deposit box — not on a sticky note.',
      ],
    },
    {
      heading: 'Mistake #6: Ignoring Multi-Factor Authentication',
      paragraphs: [
        'The most common password mistake is not a password mistake at all — it is failing to enable multi-factor authentication when available. Microsoft reported in 2023 that 99.9% of compromised accounts did not have MFA enabled. This single action provides more protection than any password improvement.',
        'Many users skip MFA because they perceive it as inconvenient. Modern implementations have addressed this: biometric authentication on phones is instantaneous, hardware keys require a single tap, and TOTP apps generate codes in seconds. The 5 seconds of additional effort per login is negligible compared to the hours spent recovering from an account takeover.',
        'The fix: enable MFA on every account that offers it, starting with email, banking, and cloud storage. Use a TOTP app (Google Authenticator, Authy) or a hardware key (YubiKey) rather than SMS. When enabling MFA, generate and securely store backup codes in case you lose your authentication device.',
      ],
    },
    {
      heading: 'Your Password Security Checklist',
      paragraphs: [
        'Use this checklist to audit and improve your password security today. Each step makes a measurable difference — start with the highest-impact items and work down the list. The entire process takes about two hours and dramatically reduces your risk of account compromise.',
      ],
      bullets: [
        'Install a password manager (Bitwarden, 1Password, or KeePass)',
        'Create a strong master password using the 5+ word passphrase method',
        'Import existing passwords from your browser',
        'Enable MFA on your email accounts immediately',
        'Enable MFA on banking and financial accounts',
        'Run your password manager\'s health report to find reused passwords',
        'Replace all reused passwords with unique 16+ character random passwords',
        'Replace all passwords shorter than 12 characters',
        'Check haveibeenpwned.com for your email addresses',
        'Change passwords for any accounts appearing in breaches',
        'Enable MFA on social media, cloud storage, and shopping accounts',
        'Set up backup codes and store them securely',
        'Schedule a quarterly review of your password vault health',
      ],
    },
  ],
};

export const ua: LocalizedArticleContent = {
  title: 'Найпоширеніші помилки з паролями та як їх виправити',
  excerpt:
    'Огляд найнебезпечніших звичок з паролями, що впливають на мільйони користувачів, та практичні покрокові способи замінити їх безпечними рутинами, які дійсно працюють.',
  seoTitle: 'Поширені помилки з паролями — чому 12 символів недостатньо | generatepasswordto.me',
  seoDescription:
    'Найнебезпечніші звички з паролями у 2026 та як їх виправити. Чому 12-символьних паролів може бути мало, ризики повторного використання, передбачуваність шаблонів та покращення безпеки.',
  keywords: [
    'поширені помилки з паролями',
    'приклади слабких паролів',
    'чеклист безпеки паролів',
    'чому 12 символів мало',
    'ризики повторного використання паролів',
    'помилки безпеки паролів',
  ],
  sections: [
    {
      heading: 'Проблема паролів у цифрах',
      paragraphs: [
        'Попри десятиліття кампаній з підвищення обізнаності, найпоширеніші паролі у 2025 залишаються ганебно передбачуваними. Аналіз NordPass баз скомпрометованих облікових даних показав, що "123456" очолив список п\'ятий рік поспіль, використовуючись у понад 4,5 мільйона акаунтів. "password," "qwerty123" та "111111" завершили п\'ятірку. Ці паролі зламуються менш ніж за секунду.',
        'Ще більше непокоїть масштаб повторного використання паролів. Дослідження SpyCloud 2024 року показало, що 64% користувачів, чиї облікові дані з\'явились в одному витоку, повторно використовували той самий пароль щонайменше на одному іншому акаунті.',
        'Фінансовий вплив приголомшливий. Звіт IBM 2024 року показав, що середня вартість витоку даних становить $4,88 мільйона, а скомпрометовані облікові дані є найпоширенішим початковим вектором атаки (16% всіх витоків).',
      ],
    },
    {
      heading: 'Помилка №1: Занадто короткі паролі',
      paragraphs: [
        'Багато користувачів і організацій досі вважають 8-символьні паролі прийнятними. У 2026 це небезпечно. Сучасна GPU-установка (8× NVIDIA RTX 4090) може перебрати всі можливі 8-символьні паролі з повного набору 95 символів приблизно за 7 годин при атаці на bcrypt-хеші. Проти швидших хеш-функцій (MD5, SHA-1) ті ж паролі падають за секунди.',
        'Навіть 12-символьні паролі можуть не забезпечити достатній запас залежно від алгоритму хешування. Якщо пароль слідує передбачуваному шаблону — слово, за ним цифри, за ними символ — ефективний простір пошуку драматично скорочується.',
        'Виправлення: використовуйте менеджер паролів для генерації випадкових паролів довжиною щонайменше 16 символів. Для паролів, які потрібно запам\'ятати, використовуйте парольну фразу з мінімум 5 випадкових слів.',
      ],
      bullets: [
        '8 символів: зламуються за години (bcrypt) або секунди (MD5/SHA-1)',
        '12 символів (шаблонні): можуть впасти за дні під словниковою атакою',
        '12 символів (випадкові): надійні проти більшості атак',
        '16+ символів (випадкові): фактично незламні',
        '5+ слів парольна фраза: надійна та запам\'ятовувана альтернатива',
      ],
    },
    {
      heading: 'Помилка №2: Повторне використання паролів',
      paragraphs: [
        'Повторне використання паролів — найнебезпечніша звичка, бо вона перетворює будь-який окремий витік у каскад скомпрометованих акаунтів. Коли сервіс зазнає витоку і ваш пароль розкривається, зловмисники автоматично тестують ці облікові дані на сотнях популярних сервісів. Ця техніка — credential stuffing — повністю автоматизована і починається протягом годин.',
        'Масштаб credential stuffing величезний. Akamai повідомив про понад 193 мільярди таких атак лише у 2020 році. Ваш "неважливий" пароль від форуму стає ключем до банківського акаунту, якщо це той самий пароль.',
        'Єдине надійне виправлення — унікальний пароль для кожного акаунту. Менеджер паролів робить це практичним. Bitwarden безкоштовно надає необмежені паролі на необмежених пристроях.',
      ],
    },
    {
      heading: 'Помилка №3: Передбачувані шаблони та підстановки',
      paragraphs: [
        'Користувачі, змушені створювати "складні" паролі, переважно дотримуються передбачуваних шаблонів: велика перша літера, цифра в кінці, символ після. "Password1!" задовольняє кожну вимогу складності, але є серед перших перевірюваних паролів. Дослідники з Carnegie Mellon виявили, що при вимозі великих літер 89% пишуть першу з великої; при вимозі цифр 78% додають їх в кінці.',
        'Leet-speak підстановки (@ замість a, 3 замість e, 0 замість o) додають мінімальну безпеку. Кожен сучасний інструмент злому включає ці трансформації. "P@$$w0rd" функціонально ідентичний "Password" в плані складності злому.',
        'Клавіатурні шаблони (qwerty, zxcvbn, 1qaz2wsx) виглядають випадковими для людей, але є добре відомими послідовностями, які перевіряються першими.',
        'Виправлення: припиніть намагатися створювати паролі з людських шаблонів. Дозвольте криптографічному генератору випадкових чисел створювати ваші паролі.',
      ],
    },
    {
      heading: 'Помилка №4: Особиста інформація в паролях',
      paragraphs: [
        'Імена партнерів, дітей, домашніх тварин, дати народження, річниці, номери телефонів та улюблені спортивні команди — будівельні блоки більшості створених користувачами паролів. Зловмисник, який витратить 30 хвилин на ваші соцмережі, може побудувати цільовий словник, що драматично звужує простір пошуку.',
        'Навіть, здавалося б, маловідома особиста інформація є ризикованою. Дівоче прізвище матері, вулиця дитинства, перше авто — це відповіді на поширені контрольні запитання, які можуть бути знайдені через публічні записи або соцмережі.',
      ],
    },
    {
      heading: 'Помилка №5: Ненадійне зберігання паролів',
      paragraphs: [
        'Записування паролів на стікерах на моніторі, збереження у незашифрованому текстовому файлі, надсилання собі email-ом — все це методи зберігання з високим ризиком.',
        'Дослідження Ponemon Institute 2024 року виявило, що 59% працівників визнали записування паролів на папері, а 42% ділилися паролями з колегами через email або месенджери.',
        'Виправлення: використовуйте спеціалізований менеджер паролів з наскрізним шифруванням. Bitwarden (безкоштовний, відкритий код) або 1Password ($2.99/місяць) забезпечують безпечне зберігання з автозаповненням на всіх пристроях.',
      ],
    },
    {
      heading: 'Помилка №6: Ігнорування багатофакторної аутентифікації',
      paragraphs: [
        'Найпоширеніша помилка з паролями — це зовсім не помилка з паролями, а нехтування увімкненням MFA. Microsoft повідомив у 2023 році, що 99,9% скомпрометованих акаунтів не мали увімкненої MFA. Ця єдина дія забезпечує більший захист, ніж будь-яке покращення пароля.',
        'Багато користувачів пропускають MFA, вважаючи її незручною. Сучасні реалізації це вирішили: біометрична аутентифікація на телефонах миттєва, апаратні ключі вимагають одного дотику, TOTP-застосунки генерують коди за секунди.',
        'Виправлення: увімкніть MFA на кожному акаунті, починаючи з пошти, банкінгу та хмарного сховища. Використовуйте TOTP-застосунок або апаратний ключ замість SMS.',
      ],
    },
    {
      heading: 'Ваш чеклист безпеки паролів',
      paragraphs: [
        'Використовуйте цей чеклист для аудиту та покращення безпеки паролів сьогодні. Кожен крок робить вимірювану різницю. Весь процес займає близько двох годин і драматично знижує ризик компрометації акаунтів.',
      ],
      bullets: [
        'Встановіть менеджер паролів (Bitwarden, 1Password або KeePass)',
        'Створіть надійний мастер-пароль методом парольної фрази з 5+ слів',
        'Імпортуйте існуючі паролі з браузера',
        'Увімкніть MFA на акаунтах електронної пошти',
        'Увімкніть MFA на банківських та фінансових акаунтах',
        'Запустіть звіт здоров\'я менеджера паролів для пошуку повторюваних паролів',
        'Замініть усі повторювані паролі на унікальні 16+ символьні випадкові паролі',
        'Замініть усі паролі коротше 12 символів',
        'Перевірте haveibeenpwned.com для ваших email-адрес',
        'Змініть паролі для акаунтів, що з\'являлися у витоках',
        'Увімкніть MFA на соцмережах, хмарному сховищі та акаунтах покупок',
        'Налаштуйте резервні коди та зберігайте їх надійно',
        'Заплануйте щоквартальний перегляд здоров\'я сховища паролів',
      ],
    },
  ],
};

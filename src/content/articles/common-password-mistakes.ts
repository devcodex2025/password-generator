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

export const es: LocalizedArticleContent = {
  title: 'Los 6 errores más comunes con contraseñas y cómo corregirlos',
  excerpt: 'Errores reales de seguridad de contraseñas que exponen millones de cuentas. Contraseñas cortas, reutilización, patrones predecibles, información personal y almacenamiento inseguro.',
  seoTitle: 'Errores comunes con contraseñas — Guía de seguridad 2026 | generatepasswordto.me',
  seoDescription: 'Los 6 errores más peligrosos con contraseñas y correcciones prácticas. Cubre longitud, reutilización, patrones, información personal, almacenamiento y MFA.',
  keywords: ['errores comunes contraseñas', 'seguridad contraseñas', 'reutilización contraseñas', 'contraseñas débiles', 'mejores prácticas contraseñas', 'errores seguridad contraseñas'],
  sections: [
    { heading: 'Error #1: Contraseñas demasiado cortas', paragraphs: ['Las contraseñas de 8 caracteres ya no son seguras. Con GPUs modernas, un atacante puede probar todas las combinaciones en horas. NIST recomienda 12 como mínimo práctico y 15+ como ideal.', 'El tiempo de cracking crece exponencialmente con la longitud. Cada carácter adicional multiplica las posibilidades miles de veces.'], bullets: ['8 caracteres: se puede crackear en horas', '12 caracteres (patrón): días con ataque de diccionario', '12 caracteres (aleatorios): resistente a la mayoría de ataques', '16+ caracteres (aleatorios): prácticamente inviolable', '5+ palabras frase de contraseña: alternativa segura y memorable'] },
    { heading: 'Error #2: Reutilización de contraseñas', paragraphs: ['El hábito más peligroso. Una sola filtración se convierte en cascada de cuentas comprometidas mediante credential stuffing — técnica completamente automatizada.', 'Akamai reportó más de 193 mil millones de ataques de credential stuffing solo en 2020.', 'La solución: contraseña única por cuenta con un gestor de contraseñas. Bitwarden ofrece contraseñas ilimitadas gratis.'] },
    { heading: 'Error #3: Patrones predecibles y sustituciones', paragraphs: ['Mayúscula al inicio, número al final, símbolo después. "Password1!" cumple toda regla de complejidad pero es de las primeras en probarse.', 'Sustituciones leet-speak (@ por a, 3 por e) añaden seguridad mínima. Cada herramienta moderna incluye estas transformaciones.', 'Patrones de teclado (qwerty, zxcvbn) parecen aleatorios pero son secuencias conocidas.', 'Solución: deja que un generador criptográfico cree tus contraseñas.'] },
    { heading: 'Error #4: Información personal en contraseñas', paragraphs: ['Nombres de parejas, hijos, mascotas, fechas de nacimiento — los bloques de construcción de la mayoría de contraseñas. Un atacante con 30 minutos en tus redes sociales puede construir un diccionario dirigido.', 'Incluso información aparentemente oscura es riesgosa. Apellido de soltera de la madre, primera calle — son respuestas a preguntas de seguridad comunes encontrables en registros públicos.'] },
    { heading: 'Error #5: Almacenamiento inseguro de contraseñas', paragraphs: ['Notas adhesivas en el monitor, archivos de texto sin cifrar, emails a ti mismo — todos son métodos de alto riesgo.', 'Un estudio Ponemon 2024 encontró que 59% de empleados admitieron anotar contraseñas en papel.', 'Solución: usa un gestor con cifrado de extremo a extremo. Bitwarden (gratis) o 1Password ($2.99/mes).'] },
    { heading: 'Error #6: Ignorar la autenticación multifactor', paragraphs: ['Microsoft reportó en 2023 que el 99.9% de cuentas comprometidas no tenían MFA activado.', 'Las implementaciones modernas son convenientes: biometría instantánea, llaves hardware de un toque, apps TOTP en segundos.', 'Solución: activa MFA en cada cuenta, empezando por email y banca.'] },
    { heading: 'Tu checklist de seguridad de contraseñas', paragraphs: ['Usa este checklist para auditar tu seguridad hoy. Todo el proceso toma unas dos horas.'], bullets: ['Instalar un gestor de contraseñas', 'Crear una frase de contraseña maestra de 5+ palabras', 'Importar contraseñas existentes del navegador', 'Activar MFA en email', 'Activar MFA en cuentas financieras', 'Reemplazar contraseñas duplicadas', 'Reemplazar contraseñas menores de 12 caracteres', 'Verificar haveibeenpwned.com', 'Activar MFA en redes sociales y nube', 'Programar revisión trimestral'] },
  ],
};

export const fr: LocalizedArticleContent = {
  title: 'Les 6 erreurs de mots de passe les plus courantes et comment les corriger',
  excerpt: 'Erreurs réelles de sécurité des mots de passe qui exposent des millions de comptes. Mots de passe courts, réutilisation, modèles prévisibles et stockage non sécurisé.',
  seoTitle: 'Erreurs courantes de mots de passe — Guide de sécurité 2026 | generatepasswordto.me',
  seoDescription: 'Les 6 erreurs les plus dangereuses et corrections pratiques. Longueur, réutilisation, modèles, informations personnelles, stockage et MFA.',
  keywords: ['erreurs mots de passe courantes', 'sécurité mots de passe', 'réutilisation mots de passe', 'mots de passe faibles', 'bonnes pratiques mots de passe', 'erreurs sécurité'],
  sections: [
    { heading: 'Erreur #1 : Mots de passe trop courts', paragraphs: ['Les mots de passe de 8 caractères ne sont plus sûrs. Avec les GPU modernes, un attaquant peut essayer toutes les combinaisons en heures. NIST recommande 12 comme minimum pratique.', 'Le temps de craquage augmente exponentiellement avec la longueur.'], bullets: ['8 caractères : craquable en heures', '12 caractères (modèle) : jours en attaque dictionnaire', '12 caractères (aléatoires) : résistant', '16+ caractères (aléatoires) : pratiquement inviolable', '5+ mots phrase de passe : alternative sûre et mémorable'] },
    { heading: 'Erreur #2 : Réutilisation des mots de passe', paragraphs: ['L\'habitude la plus dangereuse. Une seule fuite devient une cascade via le credential stuffing.', 'Akamai a rapporté plus de 193 milliards d\'attaques en 2020.', 'Solution : mot de passe unique par compte avec un gestionnaire. Bitwarden est gratuit.'] },
    { heading: 'Erreur #3 : Modèles prévisibles', paragraphs: ['Majuscule au début, chiffre à la fin. "Password1!" passe toutes les règles mais est parmi les premiers testés.', 'Les substitutions leet-speak ajoutent une sécurité minimale.', 'Les motifs clavier (qwerty, zxcvbn) semblent aléatoires mais sont des séquences connues.', 'Solution : laissez un générateur cryptographique créer vos mots de passe.'] },
    { heading: 'Erreur #4 : Informations personnelles', paragraphs: ['Noms de partenaires, enfants, animaux, dates de naissance — la base de la plupart des mots de passe. Un attaquant sur vos réseaux sociaux peut construire un dictionnaire ciblé en 30 minutes.', 'Même les informations obscures sont risquées — nom de jeune fille, première rue.'] },
    { heading: 'Erreur #5 : Stockage non sécurisé', paragraphs: ['Post-it sur l\'écran, fichier texte non chiffré, email à soi-même — tous à haut risque.', 'Étude Ponemon 2024 : 59% des employés notent leurs mots de passe sur papier.', 'Solution : gestionnaire avec chiffrement de bout en bout.'] },
    { heading: 'Erreur #6 : Ignorer le MFA', paragraphs: ['Microsoft 2023 : 99,9% des comptes compromis n\'avaient pas de MFA.', 'Les implémentations modernes sont pratiques : biométrie, clés matérielles, apps TOTP.', 'Solution : activer le MFA partout, en commençant par email et banque.'] },
    { heading: 'Votre checklist de sécurité', paragraphs: ['Utilisez cette liste pour un audit aujourd\'hui.'], bullets: ['Installer un gestionnaire de mots de passe', 'Créer une phrase de passe maîtresse de 5+ mots', 'Importer les mots de passe du navigateur', 'Activer le MFA sur l\'email', 'Activer le MFA sur les comptes financiers', 'Remplacer les mots de passe dupliqués', 'Remplacer ceux de moins de 12 caractères', 'Vérifier haveibeenpwned.com', 'Activer le MFA sur réseaux sociaux et cloud', 'Planifier une révision trimestrielle'] },
  ],
};

export const de: LocalizedArticleContent = {
  title: 'Die 6 häufigsten Passwort-Fehler und wie man sie behebt',
  excerpt: 'Echte Passwort-Sicherheitsfehler, die Millionen von Konten gefährden. Kurze Passwörter, Wiederverwendung, vorhersagbare Muster und unsichere Speicherung.',
  seoTitle: 'Häufige Passwort-Fehler — Sicherheitsleitfaden 2026 | generatepasswordto.me',
  seoDescription: 'Die 6 gefährlichsten Passwort-Fehler und praktische Korrekturen. Länge, Wiederverwendung, Muster, persönliche Infos, Speicherung und MFA.',
  keywords: ['häufige Passwort-Fehler', 'Passwortsicherheit', 'Passwort-Wiederverwendung', 'schwache Passwörter', 'Passwort Best Practices', 'Sicherheitsfehler Passwörter'],
  sections: [
    { heading: 'Fehler #1: Zu kurze Passwörter', paragraphs: ['8-Zeichen-Passwörter sind nicht mehr sicher. Mit modernen GPUs kann ein Angreifer alle Kombinationen in Stunden durchprobieren. NIST empfiehlt 12 als praktisches Minimum.', 'Die Knackzeit wächst exponentiell mit der Länge.'], bullets: ['8 Zeichen: in Stunden knackbar', '12 Zeichen (Muster): Tage bei Wörterbuchangriff', '12 Zeichen (zufällig): widerstandsfähig', '16+ Zeichen (zufällig): praktisch unknackbar', '5+ Wort-Passphrase: sichere und merkbare Alternative'] },
    { heading: 'Fehler #2: Passwort-Wiederverwendung', paragraphs: ['Die gefährlichste Gewohnheit. Ein einziger Leak wird zur Kaskade durch Credential Stuffing.', 'Akamai berichtete 2020 über 193 Milliarden solcher Angriffe.', 'Lösung: einzigartiges Passwort pro Konto mit Passwort-Manager. Bitwarden ist kostenlos.'] },
    { heading: 'Fehler #3: Vorhersagbare Muster', paragraphs: ['Großbuchstabe am Anfang, Zahl am Ende. "Password1!" erfüllt jede Komplexitätsregel, wird aber zuerst getestet.', 'Leet-Speak-Substitutionen bieten minimale Sicherheit.', 'Tastaturmuster (qwerty, zxcvbn) wirken zufällig, sind aber bekannte Sequenzen.', 'Lösung: kryptographischen Generator verwenden.'] },
    { heading: 'Fehler #4: Persönliche Informationen', paragraphs: ['Partner-, Kinder-, Haustiernamen, Geburtstage — die Bausteine der meisten Passwörter. Ein Angreifer kann in 30 Minuten auf Ihren Social Media ein Zielwörterbuch erstellen.', 'Auch scheinbar obskure Infos sind riskant.'] },
    { heading: 'Fehler #5: Unsichere Speicherung', paragraphs: ['Haftnotizen am Monitor, unverschlüsselte Textdateien, E-Mails an sich selbst — alles Hochrisiko.', 'Ponemon-Studie 2024: 59% der Mitarbeiter notieren Passwörter auf Papier.', 'Lösung: Passwort-Manager mit Ende-zu-Ende-Verschlüsselung.'] },
    { heading: 'Fehler #6: MFA ignorieren', paragraphs: ['Microsoft 2023: 99,9% der kompromittierten Konten hatten kein MFA.', 'Moderne Implementierungen sind bequem: Biometrie, Hardware-Schlüssel, TOTP-Apps.', 'Lösung: MFA überall aktivieren, beginnend mit E-Mail und Banking.'] },
    { heading: 'Ihre Passwort-Sicherheits-Checkliste', paragraphs: ['Nutzen Sie diese Liste für ein Audit heute.'], bullets: ['Passwort-Manager installieren', 'Master-Passphrase mit 5+ Wörtern erstellen', 'Browser-Passwörter importieren', 'MFA bei E-Mail aktivieren', 'MFA bei Finanzkonten aktivieren', 'Doppelte Passwörter ersetzen', 'Passwörter unter 12 Zeichen ersetzen', 'haveibeenpwned.com prüfen', 'MFA bei Social Media und Cloud aktivieren', 'Vierteljährliche Überprüfung planen'] },
  ],
};

export const it: LocalizedArticleContent = {
  title: 'I 6 errori più comuni con le password e come correggerli',
  excerpt: 'Errori reali di sicurezza delle password che espongono milioni di account. Password corte, riutilizzo, pattern prevedibili e archiviazione insicura.',
  seoTitle: 'Errori comuni con le password — Guida sicurezza 2026 | generatepasswordto.me',
  seoDescription: 'I 6 errori più pericolosi e correzioni pratiche. Lunghezza, riutilizzo, pattern, info personali, archiviazione e MFA.',
  keywords: ['errori comuni password', 'sicurezza password', 'riutilizzo password', 'password deboli', 'migliori pratiche password', 'errori sicurezza password'],
  sections: [
    { heading: 'Errore #1: Password troppo corte', paragraphs: ['Le password di 8 caratteri non sono più sicure. Con GPU moderne, un attaccante può provare tutte le combinazioni in ore. NIST raccomanda 12 come minimo pratico.', 'Il tempo di cracking cresce esponenzialmente con la lunghezza.'], bullets: ['8 caratteri: crackabile in ore', '12 caratteri (pattern): giorni con attacco dizionario', '12 caratteri (casuali): resistente', '16+ caratteri (casuali): praticamente inviolabile', '5+ parole passphrase: alternativa sicura e memorabile'] },
    { heading: 'Errore #2: Riutilizzo delle password', paragraphs: ['L\'abitudine più pericolosa. Una singola violazione diventa cascata tramite credential stuffing.', 'Akamai ha riportato oltre 193 miliardi di attacchi nel 2020.', 'Soluzione: password unica per account con un gestore. Bitwarden è gratuito.'] },
    { heading: 'Errore #3: Pattern prevedibili', paragraphs: ['Maiuscola all\'inizio, numero alla fine. "Password1!" supera ogni regola ma è tra le prime testate.', 'Le sostituzioni leet-speak aggiungono sicurezza minima.', 'Pattern da tastiera (qwerty, zxcvbn) sembrano casuali ma sono sequenze note.', 'Soluzione: lascia che un generatore crittografico crei le tue password.'] },
    { heading: 'Errore #4: Informazioni personali', paragraphs: ['Nomi di partner, figli, animali, date di nascita — la base della maggior parte delle password.', 'Anche informazioni apparentemente oscure sono rischiose.'] },
    { heading: 'Errore #5: Archiviazione insicura', paragraphs: ['Post-it sul monitor, file di testo non cifrati, email a se stessi — tutti ad alto rischio.', 'Studio Ponemon 2024: 59% dei dipendenti ammette di scrivere password su carta.', 'Soluzione: gestore con crittografia end-to-end.'] },
    { heading: 'Errore #6: Ignorare il MFA', paragraphs: ['Microsoft 2023: 99,9% degli account compromessi non aveva MFA.', 'Le implementazioni moderne sono comode: biometria, chiavi hardware, app TOTP.', 'Soluzione: attivare MFA ovunque.'] },
    { heading: 'La tua checklist di sicurezza', paragraphs: ['Usa questa lista per un audit oggi.'], bullets: ['Installare un gestore di password', 'Creare una passphrase master di 5+ parole', 'Importare le password dal browser', 'Attivare MFA sull\'email', 'Attivare MFA sui conti finanziari', 'Sostituire password duplicate', 'Sostituire password sotto 12 caratteri', 'Verificare haveibeenpwned.com', 'Attivare MFA su social e cloud', 'Programmare revisione trimestrale'] },
  ],
};

export const pt: LocalizedArticleContent = {
  title: 'Os 6 erros mais comuns com senhas e como corrigi-los',
  excerpt: 'Erros reais de segurança de senhas que expõem milhões de contas. Senhas curtas, reutilização, padrões previsíveis e armazenamento inseguro.',
  seoTitle: 'Erros comuns com senhas — Guia de segurança 2026 | generatepasswordto.me',
  seoDescription: 'Os 6 erros mais perigosos com senhas e correções práticas. Comprimento, reutilização, padrões, informações pessoais, armazenamento e MFA.',
  keywords: ['erros comuns senhas', 'segurança senhas', 'reutilização senhas', 'senhas fracas', 'melhores práticas senhas', 'erros segurança senhas'],
  sections: [
    { heading: 'Erro #1: Senhas muito curtas', paragraphs: ['Senhas de 8 caracteres não são mais seguras. Com GPUs modernas, um atacante pode testar todas as combinações em horas. NIST recomenda 12 como mínimo prático.', 'O tempo de quebra cresce exponencialmente com o comprimento.'], bullets: ['8 caracteres: quebrável em horas', '12 caracteres (padrão): dias com ataque de dicionário', '12 caracteres (aleatórios): resistente', '16+ caracteres (aleatórios): praticamente inquebrável', '5+ palavras frase-senha: alternativa segura e memorável'] },
    { heading: 'Erro #2: Reutilização de senhas', paragraphs: ['O hábito mais perigoso. Um único vazamento se torna cascata via credential stuffing.', 'Akamai reportou mais de 193 bilhões de ataques em 2020.', 'Solução: senha única por conta com gerenciador. Bitwarden é gratuito.'] },
    { heading: 'Erro #3: Padrões previsíveis', paragraphs: ['Maiúscula no início, número no final. "Password1!" passa toda regra mas é das primeiras testadas.', 'Substituições leet-speak adicionam segurança mínima.', 'Padrões de teclado (qwerty, zxcvbn) parecem aleatórios mas são sequências conhecidas.', 'Solução: deixe um gerador criptográfico criar suas senhas.'] },
    { heading: 'Erro #4: Informações pessoais', paragraphs: ['Nomes de parceiros, filhos, pets, datas — a base da maioria das senhas.', 'Mesmo informações aparentemente obscuras são arriscadas.'] },
    { heading: 'Erro #5: Armazenamento inseguro', paragraphs: ['Post-its no monitor, arquivos de texto sem criptografia, emails para si mesmo — todos alto risco.', 'Estudo Ponemon 2024: 59% dos funcionários admitem anotar senhas em papel.', 'Solução: gerenciador com criptografia ponta a ponta.'] },
    { heading: 'Erro #6: Ignorar MFA', paragraphs: ['Microsoft 2023: 99,9% das contas comprometidas não tinham MFA.', 'Implementações modernas são convenientes: biometria, chaves hardware, apps TOTP.', 'Solução: ativar MFA em tudo.'] },
    { heading: 'Seu checklist de segurança', paragraphs: ['Use esta lista para uma auditoria hoje.'], bullets: ['Instalar gerenciador de senhas', 'Criar frase-senha mestra de 5+ palavras', 'Importar senhas do navegador', 'Ativar MFA no email', 'Ativar MFA em contas financeiras', 'Substituir senhas duplicadas', 'Substituir senhas com menos de 12 caracteres', 'Verificar haveibeenpwned.com', 'Ativar MFA em redes sociais e nuvem', 'Programar revisão trimestral'] },
  ],
};

export const ru: LocalizedArticleContent = {
  title: '6 самых распространённых ошибок с паролями и как их исправить',
  excerpt: 'Реальные ошибки безопасности паролей, из-за которых страдают миллионы аккаунтов. Короткие пароли, повторное использование, предсказуемые шаблоны и небезопасное хранение.',
  seoTitle: 'Распространённые ошибки с паролями — Руководство 2026 | generatepasswordto.me',
  seoDescription: '6 самых опасных ошибок с паролями и практические исправления. Длина, повторное использование, шаблоны, личная информация, хранение и MFA.',
  keywords: ['распространённые ошибки паролей', 'безопасность паролей', 'повторное использование паролей', 'слабые пароли', 'лучшие практики паролей', 'ошибки безопасности паролей'],
  sections: [
    { heading: 'Ошибка №1: Слишком короткие пароли', paragraphs: ['8-символьные пароли больше не безопасны. С современными GPU атакующий может перебрать все комбинации за часы. NIST рекомендует 12 как практический минимум.', 'Время взлома растёт экспоненциально с длиной.'], bullets: ['8 символов: взламывается за часы', '12 символов (шаблонные): дни при словарной атаке', '12 символов (случайные): устойчивы', '16+ символов (случайные): практически невзламываемые', '5+ слов парольная фраза: надёжная и запоминаемая'] },
    { heading: 'Ошибка №2: Повторное использование паролей', paragraphs: ['Самая опасная привычка. Одна утечка превращается в каскад через credential stuffing.', 'Akamai сообщил о более чем 193 миллиардах таких атак в 2020.', 'Решение: уникальный пароль для каждого аккаунта с менеджером паролей.'] },
    { heading: 'Ошибка №3: Предсказуемые шаблоны', paragraphs: ['Заглавная в начале, цифра в конце. "Password1!" проходит все правила, но проверяется первым.', 'Leet-speak подстановки дают минимальную безопасность.', 'Клавиатурные паттерны (qwerty, zxcvbn) выглядят случайно, но хорошо известны.', 'Решение: используйте криптографический генератор.'] },
    { heading: 'Ошибка №4: Личная информация', paragraphs: ['Имена партнёров, детей, питомцев, даты рождения — основа большинства паролей.', 'Даже кажущаяся неизвестной информация рискованна.'] },
    { heading: 'Ошибка №5: Небезопасное хранение', paragraphs: ['Стикеры на мониторе, незашифрованные текстовые файлы, email себе — всё высокий риск.', 'Исследование Ponemon 2024: 59% сотрудников признали запись паролей на бумаге.', 'Решение: менеджер паролей со сквозным шифрованием.'] },
    { heading: 'Ошибка №6: Игнорирование MFA', paragraphs: ['Microsoft 2023: 99,9% скомпрометированных аккаунтов не имели MFA.', 'Современные реализации удобны: биометрия, аппаратные ключи, TOTP-приложения.', 'Решение: включить MFA везде.'] },
    { heading: 'Ваш чеклист безопасности', paragraphs: ['Используйте этот чеклист для аудита сегодня.'], bullets: ['Установить менеджер паролей', 'Создать мастер-фразу из 5+ слов', 'Импортировать пароли из браузера', 'Включить MFA на почте', 'Включить MFA на финансовых аккаунтах', 'Заменить повторяющиеся пароли', 'Заменить пароли короче 12 символов', 'Проверить haveibeenpwned.com', 'Включить MFA в соцсетях и облаке', 'Запланировать квартальный аудит'] },
  ],
};

export const zh: LocalizedArticleContent = {
  title: '6个最常见的密码错误及修复方法',
  excerpt: '暴露数百万账户的真实密码安全错误。短密码、重复使用、可预测模式、个人信息和不安全存储。',
  seoTitle: '常见密码错误 — 2026年安全指南 | generatepasswordto.me',
  seoDescription: '6个最危险的密码错误和实用修复。长度、重复使用、模式、个人信息、存储和MFA。',
  keywords: ['常见密码错误', '密码安全', '密码重复使用', '弱密码', '密码最佳实践', '密码安全错误'],
  sections: [
    { heading: '错误#1：密码太短', paragraphs: ['8字符密码已不再安全。现代GPU可在数小时内尝试所有组合。NIST推荐12字符为实际最低值。', '破解时间随长度呈指数增长。'], bullets: ['8字符：数小时可破', '12字符（模式化）：字典攻击数天', '12字符（随机）：能抵御多数攻击', '16+字符（随机）：实际上无法破解', '5+词密码短语：安全且易记'] },
    { heading: '错误#2：重复使用密码', paragraphs: ['最危险的习惯。单次泄露通过撞库攻击变成连锁反应。', 'Akamai报告2020年有超过1930亿次撞库攻击。', '解决方案：每个账户使用唯一密码加密码管理器。'] },
    { heading: '错误#3：可预测的模式', paragraphs: ['开头大写、结尾数字。"Password1!"满足每条规则但最先被测试。', 'Leet-speak替换（@代a，3代e）安全性极低。', '键盘模式（qwerty）看似随机但是已知序列。', '解决方案：使用加密随机生成器。'] },
    { heading: '错误#4：密码中的个人信息', paragraphs: ['伴侣、孩子、宠物名字、生日——大多数密码的构建块。', '即使看似隐秘的信息也有风险。'] },
    { heading: '错误#5：不安全的存储', paragraphs: ['显示器上的便利贴、未加密文本、发邮件给自己——都是高风险。', 'Ponemon 2024研究：59%员工承认在纸上记录密码。', '解决方案：使用端到端加密的密码管理器。'] },
    { heading: '错误#6：忽视MFA', paragraphs: ['微软2023年报告：99.9%被入侵账户未启用MFA。', '现代实现很便捷：生物识别、硬件密钥、TOTP应用。', '解决方案：从邮箱和银行开始，到处启用MFA。'] },
    { heading: '你的密码安全清单', paragraphs: ['使用此清单进行安全审计。'], bullets: ['安装密码管理器', '创建5+词的主密码短语', '从浏览器导入密码', '邮箱启用MFA', '金融账户启用MFA', '替换重复密码', '替换12字符以下的密码', '检查haveibeenpwned.com', '社交媒体和云启用MFA', '安排季度审查'] },
  ],
};

export const ja: LocalizedArticleContent = {
  title: 'パスワードの6つの最も一般的な間違いとその修正方法',
  excerpt: '数百万のアカウントを危険にさらす実際のパスワードセキュリティの間違い。短いパスワード、再利用、予測可能なパターン、個人情報、安全でない保存。',
  seoTitle: '一般的なパスワードの間違い — 2026年セキュリティガイド | generatepasswordto.me',
  seoDescription: '最も危険なパスワードの間違い6つと実践的な修正。長さ、再利用、パターン、個人情報、保存、MFA。',
  keywords: ['一般的なパスワードの間違い', 'パスワードセキュリティ', 'パスワード再利用', '弱いパスワード', 'パスワードベストプラクティス', 'セキュリティ間違い'],
  sections: [
    { heading: '間違い#1：短すぎるパスワード', paragraphs: ['8文字パスワードはもう安全ではありません。現代のGPUで数時間で全組み合わせを試行可能。NISTは12文字を実用最小値として推奨。', '解読時間は長さに対して指数関数的に増加。'], bullets: ['8文字：数時間で解読可能', '12文字（パターン）：辞書攻撃で数日', '12文字（ランダム）：大半の攻撃に耐性', '16+文字（ランダム）：実質的に解読不能', '5+語パスフレーズ：安全で記憶可能'] },
    { heading: '間違い#2：パスワードの再利用', paragraphs: ['最も危険な習慣。クレデンシャルスタッフィングにより一つの漏洩が連鎖反応に。', 'Akamaiは2020年だけで1930億回以上の攻撃を報告。', '解決策：パスワードマネージャーで各アカウントに一意のパスワード。'] },
    { heading: '間違い#3：予測可能なパターン', paragraphs: ['先頭大文字、末尾数字。"Password1!"はすべてのルールを満たすが最初にテストされる。', 'リートスピーク置換はセキュリティをほとんど追加しない。', 'キーボードパターン（qwerty）はランダムに見えるが既知のシーケンス。', '解決策：暗号化ランダム生成器を使用。'] },
    { heading: '間違い#4：個人情報', paragraphs: ['パートナー、子供、ペットの名前、誕生日——ほとんどのパスワードの構成要素。', '一見知られていない情報もリスクがある。'] },
    { heading: '間違い#5：安全でない保存', paragraphs: ['モニターの付箋、暗号化されていないテキスト、自分へのメール——すべて高リスク。', 'Ponemon 2024：59%の従業員が紙にパスワードを書いたと認めた。', '解決策：エンドツーエンド暗号化のパスワードマネージャー。'] },
    { heading: '間違い#6：MFAの無視', paragraphs: ['Microsoft 2023：侵害されたアカウントの99.9%がMFA未設定。', '最新の実装は便利：生体認証、ハードウェアキー、TOTPアプリ。', '解決策：メールと銀行から始めてすべてでMFAを有効化。'] },
    { heading: 'パスワードセキュリティチェックリスト', paragraphs: ['このリストで今日監査を。'], bullets: ['パスワードマネージャーをインストール', '5+語のマスターパスフレーズを作成', 'ブラウザからパスワードをインポート', 'メールでMFAを有効化', '金融アカウントでMFA', '重複パスワードを置換', '12文字未満のパスワードを置換', 'haveibeenpwned.comで確認', 'SNSとクラウドでMFA', '四半期レビューを計画'] },
  ],
};

export const pl: LocalizedArticleContent = {
  title: '6 najczęstszych błędów z hasłami i jak je naprawić',
  excerpt: 'Prawdziwe błędy bezpieczeństwa haseł narażające miliony kont. Krótkie hasła, powtarzanie, przewidywalne wzorce i niebezpieczne przechowywanie.',
  seoTitle: 'Częste błędy z hasłami — Przewodnik bezpieczeństwa 2026 | generatepasswordto.me',
  seoDescription: '6 najniebezpieczniejszych błędów z hasłami i praktyczne poprawki. Długość, powtarzanie, wzorce, dane osobowe, przechowywanie i MFA.',
  keywords: ['częste błędy haseł', 'bezpieczeństwo haseł', 'powtarzanie haseł', 'słabe hasła', 'najlepsze praktyki haseł', 'błędy bezpieczeństwa haseł'],
  sections: [
    { heading: 'Błąd #1: Za krótkie hasła', paragraphs: ['Hasła 8-znakowe nie są już bezpieczne. Z nowoczesnym GPU atakujący może sprawdzić wszystkie kombinacje w godzinach. NIST zaleca 12 jako minimum praktyczne.', 'Czas łamania rośnie wykładniczo z długością.'], bullets: ['8 znaków: łamalne w godzinach', '12 znaków (wzorzec): dni przy ataku słownikowym', '12 znaków (losowe): odporne', '16+ znaków (losowe): praktycznie niełamalne', '5+ słów fraza hasłowa: bezpieczna i zapamiętywalna'] },
    { heading: 'Błąd #2: Powtarzanie haseł', paragraphs: ['Najniebezpieczniejszy nawyk. Jeden wyciek staje się kaskadą przez credential stuffing.', 'Akamai raportował ponad 193 miliardy takich ataków w 2020.', 'Rozwiązanie: unikalne hasło na konto z menedżerem haseł.'] },
    { heading: 'Błąd #3: Przewidywalne wzorce', paragraphs: ['Wielka litera na początku, cyfra na końcu. "Password1!" spełnia każdą regułę, ale jest testowany jako pierwszy.', 'Podstawienia leet-speak dodają minimalne bezpieczeństwo.', 'Wzorce klawiaturowe (qwerty, zxcvbn) wyglądają losowo, ale są znanymi sekwencjami.', 'Rozwiązanie: użyj kryptograficznego generatora.'] },
    { heading: 'Błąd #4: Dane osobowe', paragraphs: ['Imiona partnerów, dzieci, zwierząt, daty urodzenia — podstawa większości haseł.', 'Nawet pozornie mało znane informacje są ryzykowne.'] },
    { heading: 'Błąd #5: Niebezpieczne przechowywanie', paragraphs: ['Karteczki na monitorze, niezaszyfrowane pliki, email do siebie — wszystko wysokie ryzyko.', 'Badanie Ponemon 2024: 59% pracowników przyznało się do pisania haseł na papierze.', 'Rozwiązanie: menedżer z szyfrowaniem end-to-end.'] },
    { heading: 'Błąd #6: Ignorowanie MFA', paragraphs: ['Microsoft 2023: 99,9% skompromitowanych kont nie miało MFA.', 'Nowoczesne implementacje są wygodne: biometria, klucze sprzętowe, aplikacje TOTP.', 'Rozwiązanie: włącz MFA wszędzie.'] },
    { heading: 'Twoja lista kontrolna bezpieczeństwa', paragraphs: ['Użyj tej listy do audytu dzisiaj.'], bullets: ['Zainstaluj menedżera haseł', 'Utwórz frazę główną z 5+ słów', 'Importuj hasła z przeglądarki', 'Włącz MFA na emailu', 'Włącz MFA na kontach finansowych', 'Zamień powtarzające się hasła', 'Zamień hasła poniżej 12 znaków', 'Sprawdź haveibeenpwned.com', 'Włącz MFA w mediach społecznościowych i chmurze', 'Zaplanuj kwartalny przegląd'] },
  ],
};

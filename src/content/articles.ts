export const SUPPORTED_CONTENT_LANGUAGES = ['en', 'ua', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'pl'] as const;

export type ContentLanguage = (typeof SUPPORTED_CONTENT_LANGUAGES)[number];

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LocalizedArticleContent {
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  sections: ArticleSection[];
}

export interface ArticleEntry {
  slug: string;
  category: 'security-basics' | 'policy' | 'implementation' | 'incident-response';
  readingMinutes: number;
  updatedAt: string;
  author: string;
  content: Partial<Record<ContentLanguage, LocalizedArticleContent>>;
}

const article = (
  title: string,
  excerpt: string,
  seoTitle: string,
  seoDescription: string,
  keywords: string[],
  sections: ArticleSection[],
): LocalizedArticleContent => ({
  title,
  excerpt,
  seoTitle,
  seoDescription,
  keywords,
  sections,
});

const makeFallback = (title: string, excerpt: string, keywords: string[]): LocalizedArticleContent =>
  article(title, excerpt, `${title} | generatepasswordto.me`, excerpt, keywords, [
    {
      heading: 'Why this matters',
      paragraphs: [
        'Password security still decides how easily an attacker can take over an account, especially after credential leaks and phishing campaigns.',
        'This article currently acts as an editorial placeholder until the full localized version is published.',
      ],
      bullets: [
        'Document the user problem clearly.',
        'Add language-specific examples and screenshots.',
        'Refresh the article when standards or product UI change.',
      ],
    },
    {
      heading: 'Editorial to-do list',
      paragraphs: [
        'Expand this guide with practical examples, policy notes, and internal links to related articles.',
        'Keep the tone natural and helpful instead of writing for search engines first.',
      ],
      bullets: [
        'Write for a specific user intent.',
        'Avoid repetitive keyword phrasing.',
        'Show the next useful action near the conclusion.',
      ],
    },
  ]);

const STRONG_PASSWORDS_EN = article(
  'How to Create Strong Passwords in 2026',
  'A practical 2026 guide to creating strong passwords that hold up in real life, not just on paper.',
  'How to Create Strong Passwords in 2026 | generatepasswordto.me',
  'Learn how to create strong passwords in 2026, why length matters more than outdated complexity rules, and how to turn good advice into a usable routine.',
  ['how to create strong passwords', 'strong password tips 2026', 'secure password best practices', 'password length guide', 'create secure password'],
  [
    {
      heading: 'The biggest mistake is treating password advice like a checklist',
      paragraphs: [
        'Most people have heard some version of the same old rule set: add a capital letter, throw in a number, include a symbol, and do not repeat anything. The problem is that this style of advice often produces passwords that look complicated but are still easy to predict. Humans are very consistent. We put the capital letter at the beginning, the number at the end, and the symbol where it is easiest to remember. Attackers know that.',
        'In 2026, a strong password is not defined by how “weird” it looks at a glance. It is defined by how hard it is to guess, how unique it is, and whether it fits into a security routine you can actually maintain. A 20-character password made from an unpredictable mix of characters is far better than a short password that merely checks a website’s complexity boxes.',
        'That is why the most useful starting point is not complexity. It is predictability. If your password could plausibly be invented by a tired human on a busy day, it is probably weaker than you think.',
      ],
      bullets: [
        'Attackers test common human habits before they try true brute force.',
        'A password that follows a familiar pattern is weaker than one with more randomness, even if both include symbols and numbers.',
        'Uniqueness matters just as much as strength, because reuse turns one breach into many.',
      ],
    },
    {
      heading: 'Why length now matters more than clever substitutions',
      paragraphs: [
        'A short password can be broken because the search space is small. That is the simple reason length remains the single best upgrade for most users. Adding four or six extra characters usually improves security more than replacing the letter “a” with “@” or the letter “o” with “0”. Those substitutions are old, widely recognized, and heavily covered in cracking dictionaries.',
        'For everyday consumer accounts, 16 characters is a sensible modern baseline when the service allows it. For business-critical accounts, admin access, financial services, and email inboxes, it makes sense to go longer. The goal is not to hit a magic number but to create enough room that guessing becomes impractical.',
        'Passphrases are often the easiest way to do this well. A good passphrase is not a famous quote or a smooth sentence. It is a sequence you can remember but an attacker would never think to assemble. Random words plus a few non-obvious separators can create something long, usable, and resistant to the most common attacks.',
      ],
      bullets: [
        'Prefer 16+ characters where possible.',
        'Treat email, banking, and work access as high-priority accounts that deserve longer credentials.',
        'Do not confuse memorable with familiar: a passphrase should be personal to you, not culturally predictable.',
      ],
    },
    {
      heading: 'What modern guidance such as NIST really changed',
      paragraphs: [
        'One reason password advice feels contradictory is that older policies trained people to optimize for rule compliance rather than actual security. NIST 800-63B helped reset that conversation. It moved attention away from forced periodic password changes and rigid composition rules, and toward length, screening against compromised passwords, and blocking predictable choices.',
        'In practice, this means users do not benefit from being forced into awkward patterns every few weeks. They benefit from choosing a password that is long, unique, and not already exposed in breach data. They also benefit when services stop accepting obviously weak strings and allow password managers or passphrases without unnecessary friction.',
        'This shift matters because security fails when the user experience trains people to do the wrong thing. If a policy encourages tiny modifications like Winter2026!, Winter2026!!, and Winter2026!!!, it creates a false sense of improvement. A better system asks for fewer rituals and better decisions.',
      ],
      bullets: [
        'Long and unique beats short and complicated.',
        'Password resets should happen after risk events, not on an arbitrary calendar.',
        'Compromised-password screening is more useful than forcing cosmetic changes.',
      ],
    },
    {
      heading: 'A practical formula that works for real accounts',
      paragraphs: [
        'If you use a password manager, the simplest routine is also the strongest one: generate a long random password for each account and let the manager store it. That approach removes memory from the equation, which is usually where people make compromises. In that workflow, the only password you truly need to remember is the master password, and that one deserves extra care.',
        'If you are not using a password manager yet, start with your most sensitive accounts first. Make your email password unique. Then update banking, cloud storage, workplace access, and your main social accounts. This order matters because attackers often use email access to reset everything else.',
        'A useful compromise for people transitioning away from weak habits is to use a strong passphrase for the manager or for one or two memorized accounts, and truly random generated passwords for the rest. That is much safer than trying to invent ten “creative” passwords from scratch.',
      ],
      bullets: [
        'Use a manager-generated password whenever you do not need to memorize the credential.',
        'Protect the password manager and your email account first.',
        'If you must remember a password, make it long and original rather than short and “complex”.',
      ],
    },
    {
      heading: 'What to stop doing immediately',
      paragraphs: [
        'Many weak-password habits survive because they feel efficient. Reusing the same base across sites saves time. Adding the current year makes a password feel updated. Writing secrets into notes or chat apps feels convenient. Unfortunately, those are exactly the shortcuts that make credential theft scale.',
        'Another problem is emotional confidence. People often trust a password because it looks messy or because they invented it themselves. Attackers do not care whether a password feels clever. They care whether it fits the patterns seen in leaked data, common phrase lists, keyboard walks, sports teams, birthdays, fandom references, and seasonal updates.',
        'If you want a cleaner rule, use this one: any password that contains a predictable personal theme should be assumed weaker than it appears. Names, initials, repeated fragments, birth years, favorite clubs, and familiar substitutions all shrink the attacker’s work.',
      ],
      bullets: [
        'Do not reuse a base password with small edits across different services.',
        'Do not rely on seasonal updates like Summer2026! or Winter2026!.',
        'Do not store sensitive passwords in plain text notes, emails, or messenger drafts.',
      ],
    },
    {
      heading: 'A strong password is only one part of the outcome',
      paragraphs: [
        'Even an excellent password is not a complete security strategy. A strong password lowers the chance of credential guessing and reduces the blast radius of a breach when it is unique, but it does not stop phishing, infostealers, or account takeover through a compromised email session. That is why password quality should sit inside a broader routine that includes two-factor authentication, breach monitoring, and basic device hygiene.',
        'Still, passwords remain the front line for most accounts. They are the decision users make most often, and they are the easiest part of account security to improve right now. The good news is that the strongest routine is usually simpler than the old one: go longer, stay unique, use a manager where possible, and avoid predictable personal patterns.',
        'If your current method depends on memory tricks, annual tweaks, or a favorite base string, it is time to replace it. The best password is not the one that looks complicated. It is the one an attacker does not get to guess twice.',
      ],
      bullets: [
        'Pair strong passwords with 2FA for high-value accounts.',
        'Review compromised accounts after every known breach or phishing event.',
        'Use your generator as a tool, but build a repeatable habit around it.',
      ],
    },
  ],
);

const STRONG_PASSWORDS_UA = article(
  'Як створити надійний пароль у 2026 році',
  'Практичний гайд про те, як у 2026 році створювати надійні паролі без старих міфів і зайвої складності.',
  'Як створити надійний пароль у 2026 році | generatepasswordto.me',
  'Дізнайтеся, як створювати надійні паролі у 2026 році, чому довжина важливіша за застарілі правила складності, і як вибудувати безпечну звичку.',
  ['як створити надійний пароль', 'надійний пароль 2026', 'сильний пароль поради', 'довжина пароля', 'безпечний пароль'],
  [
    {
      heading: 'Головна помилка — думати про пароль як про формальність',
      paragraphs: [
        'Багато людей досі сприймають пароль як технічну вимогу: треба просто пройти форму реєстрації, додати велику літеру, цифру, символ — і все. Але така логіка давно застаріла. Вона вчить не безпеки, а підлаштуванню під чекліст. У результаті люди створюють паролі, які виглядають “складно”, але насправді дуже передбачувані.',
        'У 2026 році хороший пароль — це не той, що виглядає хаотично для людини. Це той, який складно вгадати, неможливо перевикористати в іншому сервісі й який реально вписується у вашу щоденну поведінку. Якщо пароль народжується з очевидного шаблону, з високою ймовірністю такий самий шаблон уже є в словниках для зламу.',
        'Тому починати треба не з питання “які символи додати”, а з питання “наскільки цей пароль передбачуваний для сторонньої людини або для скрипта, який працює на основі витоків”. Це набагато корисніша оптика.',
      ],
      bullets: [
        'Зловмисники спочатку тестують людські патерни, а не випадкові набори.',
        'Символ у кінці пароля не робить його автоматично сильним.',
        'Унікальність між сервісами так само важлива, як і складність.',
      ],
    },
    {
      heading: 'Чому довжина стала важливішою за “хитрі” заміни',
      paragraphs: [
        'Одна з найкорисніших змін останніх років у тому, що фокус поступово змістився з декоративної складності на довжину. Це логічно: короткий пароль має менший простір для перебору, а отже, програє навіть тоді, коли в ньому є спецсимволи. Натомість довгий пароль або добре побудована парольна фраза дає значно більше запасу міцності.',
        'Заміни на кшталт “a” на “@”, “o” на “0” чи “i” на “1” колись здавалися розумним трюком. Сьогодні це майже стандартний шум, який сучасні словники та cracking-правила враховують одразу. Тому пароль на 10 символів із такими замінами часто слабший за пароль на 18 символів без подібної театральної складності.',
        'Для більшості звичайних акаунтів сьогодні розумний мінімум — орієнтуватися на 16+ символів, якщо сервіс це дозволяє. Для пошти, банкінгу, робочих акаунтів, адміністративного доступу чи хмарного сховища варто йти ще далі. Довжина — це не магія, але це найпростіший і найефективніший спосіб посилити пароль.',
      ],
      bullets: [
        'Насамперед збільшуйте довжину, а вже потім думайте про дрібні ускладнення.',
        'Парольна фраза часто краща за короткий “складний” пароль.',
        'Не плутайте запам’ятовуваність із шаблонністю: знайома фраза — це не сильний секрет.',
      ],
    },
    {
      heading: 'Що на практиці змінили рекомендації NIST',
      paragraphs: [
        'Сучасні рекомендації на кшталт NIST 800-63B важливі не тому, що дали ще один список правил. Їхня цінність у тому, що вони повернули дискусію до реальної безпеки. Вони відсунули на другий план примусові регулярні зміни пароля й жорсткі композиційні вимоги, натомість підсвітили речі, які дійсно працюють: довжину, перевірку на скомпрометовані паролі та блокування очевидно слабких варіантів.',
        'Для користувача це означає просту річ: немає сенсу щомісяця вигадувати чергову версію одного й того самого пароля. Значно корисніше один раз створити довгий унікальний пароль і змінювати його після реального ризику: витоку, фішингового інциденту, підозрілої активності або компрометації пристрою.',
        'Це також важливо з точки зору UX. Погані політики привчають людей до поганих звичок: записувати пароль у незахищені нотатки, обирати мінімально дозволені комбінації або використовувати один базовий шаблон усюди. Хороша політика, навпаки, знімає зайве тертя й підштовхує до сильнішого рішення.',
      ],
      bullets: [
        'Сильний пароль має бути довгим, унікальним і не скомпрометованим.',
        'Регулярна зміна “для галочки” не дає тієї користі, яку їй часто приписують.',
        'Сервісам вигідніше блокувати слабкі паролі, ніж змушувати всіх до косметичних змін.',
      ],
    },
    {
      heading: 'Робоча схема для звичайного користувача',
      paragraphs: [
        'Найпростіший і найсильніший шлях — користуватися менеджером паролів і генерувати окремий довгий пароль для кожного сервісу. Це звучить як банальна порада, але саме вона найкраще вирішує ключову проблему: людська пам’ять погано масштабується. Коли акаунтів багато, люди неминуче починають спрощувати собі життя за рахунок безпеки.',
        'Якщо ви поки не готові повністю перейти на менеджер, почніть із найціннішого. Спочатку оновіть пароль для пошти. Потім для банку, хмарного диска, робочих акаунтів і соцмереж, які можна використати для відновлення доступу. Це дає реальний ефект уже на старті.',
        'Компромісний, але набагато кращий за старі звички варіант — мати один дуже сильний пароль або парольну фразу для менеджера, а для решти сервісів використовувати згенеровані випадкові паролі. Це значно безпечніше, ніж намагатися вигадати десять “трохи різних” людських паролів.',
      ],
      bullets: [
        'Захистіть пошту та менеджер паролів у першу чергу.',
        'Не намагайтеся запам’ятати десятки паролів вручну.',
        'Генератор паролів корисний лише тоді, коли ви не перевикористовуєте результат в інших сервісах.',
      ],
    },
    {
      heading: 'Що варто припинити робити вже зараз',
      paragraphs: [
        'Є кілька звичок, які здаються невинними, але системно знижують безпеку. По-перше, це повторне використання бази: один корінь пароля плюс назва сервісу, рік, символ або різна кількість знаків оклику. По-друге, це використання особистих маркерів: імен, нікнеймів, дат народження, назв команд, міст, улюблених серіалів або звичних скорочень.',
        'Ще одна небезпечна звичка — надмірна довіра до власної інтуїції. Людина часто вважає пароль сильним просто тому, що придумала його сама. Але атакувальники працюють не з відчуттями, а з частотністю патернів. Якщо мільйони людей мислять схоже, “оригінальний” пароль може виявитися типовим.',
        'Корисне правило тут дуже просте: якщо пароль містить передбачувану особисту логіку, вважайте його слабшим, ніж він вам здається. Надійний пароль не повинен нічого “натякати” про вас.',
      ],
      bullets: [
        'Не використовуйте той самий корінь пароля в різних сервісах.',
        'Не оновлюйте пароль лише додаванням нового року або сезону.',
        'Не зберігайте важливі паролі у відкритих нотатках, чернетках листів або месенджерах.',
      ],
    },
    {
      heading: 'Надійний пароль — це не фінал, а база',
      paragraphs: [
        'Навіть дуже сильний пароль не розв’язує всі проблеми. Він знижує ризик вгадування та мінімізує наслідки витоку, якщо є унікальним, але не захищає від фішингу, шкідливого ПЗ або скомпрометованої поштової сесії. Саме тому хороша парольна гігієна має поєднуватися з двофакторною автентифікацією, базовою перевіркою витоків та загальною безпекою пристроїв.',
        'Попри це, пароль все ще залишається однією з найважливіших точок захисту. І водночас це той елемент безпеки, який користувач може покращити найшвидше. Хороша новина в тому, що сучасна стратегія часто простіша за стару: довший пароль, менше шаблонів, більше унікальності, менше театрів складності.',
        'Якщо ваша нинішня система тримається на пам’яті, щорічних дрібних змінах і “креативному” базовому слові, варто її переглянути. Найкращий пароль у 2026 році — не той, що виглядає хитро. А той, який неможливо легко передбачити й небезпечно перевикористати.',
      ],
      bullets: [
        'Додавайте 2FA для критично важливих акаунтів.',
        'Після витоку або фішингової підозри змінюйте пароль без зволікань.',
        'Будуйте не окремий пароль, а стабільну звичку безпеки.',
      ],
    },
  ],
);

const STRONG_PASSWORDS_RU = article(
  'Как создать надёжный пароль в 2026 году',
  'Практическое руководство о том, как в 2026 году создавать надёжные пароли без устаревших мифов и лишней сложности.',
  'Как создать надёжный пароль в 2026 году | generatepasswordto.me',
  'Узнайте, как создавать надёжные пароли в 2026 году, почему длина важнее старых правил сложности и как выстроить рабочую привычку безопасности.',
  ['как создать надёжный пароль', 'сильный пароль 2026', 'советы по паролям', 'длина пароля', 'безопасный пароль'],
  [
    {
      heading: 'Проблема не в том, что люди не слышали советы, а в том, что советы часто плохие',
      paragraphs: [
        'Почти каждый пользователь слышал стандартные рекомендации: добавьте заглавную букву, цифру, символ и не используйте что-то слишком простое. Но такие советы часто приводят к паролям, которые только выглядят сложными. На практике они остаются предсказуемыми, потому что люди мыслят похожими шаблонами: заглавная буква в начале, цифра в конце, знакомое слово в основе.',
        'В 2026 году сильный пароль — это не набор визуального хаоса. Это пароль, который трудно угадать, нельзя безопасно повторно использовать и который встроен в нормальную пользовательскую привычку. Если пароль легко объяснить логикой его создания, скорее всего, он слабее, чем кажется.',
        'Поэтому полезнее спрашивать не “достаточно ли тут символов”, а “насколько этот пароль предсказуем для атакующего, который уже знает типичные человеческие сценарии”. Именно в этом и проходит граница между формальной и реальной защитой.',
      ],
      bullets: [
        'Атакующие знают популярные человеческие шаблоны лучше, чем многие пользователи.',
        'Внешняя сложность не равна высокой стойкости.',
        'Уникальность по сервисам — обязательная часть хорошего пароля.',
      ],
    },
    {
      heading: 'Почему длина стала главным параметром',
      paragraphs: [
        'Самый практичный вывод современной парольной гигиены прост: длинный пароль обычно лучше короткого “хитрого” пароля. Когда пароль короткий, пространство перебора остаётся ограниченным, и декоративные замены вроде “@” вместо “a” почти не спасают. Для современных инструментов взлома такие приёмы давно не новость.',
        'Именно поэтому в реальной жизни 16 символов и больше — гораздо более полезная цель, чем механическое соблюдение старых правил сложности. Особенно это важно для почты, банковских аккаунтов, рабочих систем, облачных сервисов и любых учётных записей, через которые можно восстановить доступ к другим сервисам.',
        'Парольная фраза здесь нередко оказывается лучшим компромиссом между стойкостью и удобством. Но она работает только тогда, когда построена не на известной цитате, не на банальной фразе и не на личном шаблоне, который легко угадать по вам.',
      ],
      bullets: [
        'Сначала увеличивайте длину, а потом уже смотрите на вторичные детали.',
        'Не переоценивайте замену букв цифрами и символами.',
        'Хорошая парольная фраза должна быть длинной и непредсказуемой, а не просто удобной.',
      ],
    },
    {
      heading: 'Что изменили современные стандарты вроде NIST 800-63B',
      paragraphs: [
        'Современные рекомендации по паролям стали полезнее именно потому, что ушли от театра безопасности. NIST 800-63B не пытается заставить пользователя каждые 30 или 60 дней придумывать новую вариацию старого пароля. Вместо этого акцент смещается на длину, проверку против известных утечек и отказ от очевидно слабых вариантов.',
        'Это важный разворот. Когда политика заставляет людей постоянно менять пароль без реального повода, они почти всегда идут по пути наименьшего сопротивления: меняют один символ, прибавляют год, меняют порядок знаков. Формально пароль новый, фактически — почти тот же.',
        'Хорошая современная политика делает другое: она позволяет пользователю выбрать действительно сильный пароль один раз, не мешает использовать менеджеры паролей и требует смены при реальном риске, а не по календарю.',
      ],
      bullets: [
        'Длина и уникальность важнее формальной композиции.',
        'Смена пароля после риска полезнее регулярной смены “по расписанию”.',
        'Блокировка скомпрометированных паролей — более сильная мера, чем бессмысленные усложнения.',
      ],
    },
    {
      heading: 'Рабочий подход для повседневных аккаунтов',
      paragraphs: [
        'Если у вас есть менеджер паролей, лучший маршрут очевиден: генерируйте длинный случайный пароль для каждого сервиса и храните его там. Это снимает ключевую проблему — человеку не нужно удерживать в памяти десятки секретов, а значит, меньше соблазна повторно использовать знакомую основу.',
        'Если вы пока не перешли на менеджер, не пытайтесь обновить всё сразу. Начните с электронной почты, потом переходите к банкингу, рабочим сервисам, облачным хранилищам и основным соцсетям. Такой порядок даёт максимальный выигрыш, потому что именно эти точки чаще всего используются для каскадного захвата доступа.',
        'Промежуточная рабочая схема тоже возможна: один действительно сильный пароль или парольная фраза для менеджера и случайные сгенерированные пароли для остального. Это всё равно намного лучше, чем десяток “почти одинаковых” пользовательских комбинаций.',
      ],
      bullets: [
        'Сначала защищайте почту и менеджер паролей.',
        'Генератор полезен тогда, когда пароль не повторяется на других сайтах.',
        'Не полагайтесь на память там, где лучше сработает система хранения.',
      ],
    },
    {
      heading: 'Какие привычки нужно прекращать без сожаления',
      paragraphs: [
        'Есть несколько сценариев, которые десятилетиями выглядят удобными и почти всегда заканчиваются плохо. Это повторное использование одной базы с разными хвостами, сезонные и годовые обновления вроде Autumn2026!, личные имена и даты, хранение важных паролей в простых заметках или пересылка их самому себе в почте.',
        'Отдельная проблема — вера в собственную изобретательность. Пользователь может считать пароль оригинальным просто потому, что придумал его сам. Но атакующий видит не один пароль, а миллионы примеров из утечек. На таком фоне “лично придуманный” пароль очень часто оказывается стандартным типом поведения.',
        'Хорошее правило простое: если в пароле есть читаемая личная логика, атакующий может использовать её против вас. Чем меньше пароль рассказывает о вас и ваших привычках, тем лучше.',
      ],
      bullets: [
        'Не используйте один и тот же корень для разных сервисов.',
        'Не обновляйте пароль косметически, добавляя новый год или знак.',
        'Не храните критичные пароли в открытом текстовом виде.',
      ],
    },
    {
      heading: 'Надёжный пароль — это база, а не вся стратегия',
      paragraphs: [
        'Даже отличный пароль не отменяет фишинг, вредоносное ПО, угон почтовой сессии или заражённое устройство. Но он всё равно остаётся базовым слоем защиты. Сильный уникальный пароль серьёзно снижает риск массового повторного взлома после утечки и делает жизнь атакующему значительно сложнее.',
        'Поэтому лучший результат даёт не отдельный “идеальный пароль”, а рабочая система: длинные и разные пароли, двухфакторная аутентификация там, где это важно, контроль за утечками и элементарная дисциплина при хранении учётных данных.',
        'Если ваша текущая схема держится на памяти, одной любимой основе и её сезонных вариациях, самое время заменить её на что-то взрослее. В 2026 году сильный пароль — это не фокус. Это спокойная, повторяемая и понятная практика.',
      ],
      bullets: [
        'Включайте 2FA для почты, банков и рабочих аккаунтов.',
        'После утечки или фишингового инцидента меняйте пароль сразу.',
        'Стройте рутину безопасности, а не набор разрозненных трюков.',
      ],
    },
  ],
);

const NIST_EN = article(
  'NIST 800-63B Password Rules: What Actually Matters',
  'A plain-English explanation of NIST 800-63B password guidance and what it changes for real users, teams, and product decisions.',
  'NIST 800-63B Password Rules Explained | generatepasswordto.me',
  'Understand the practical meaning of NIST 800-63B password guidance: length, breached-password screening, password managers, and the end of outdated reset rituals.',
  ['nist 800-63b password rules', 'nist password guidance', 'modern password policy', 'password policy 2026', 'nist 800-63b summary'],
  [
    {
      heading: 'Why NIST 800-63B still matters in 2026',
      paragraphs: [
        'NIST 800-63B is often quoted as if it were a list of isolated technical rules, but its real value is broader: it helped push password policy away from cosmetic complexity and toward measurable risk reduction. That matters because many organizations are still living with old policy templates that sound secure while quietly training users to make bad decisions.',
        'A good example is the classic “change your password every 90 days” rule. On paper, it sounds disciplined. In practice, it usually creates weak variations of the same password and more unsafe storage behavior. The user is not becoming more secure. The user is becoming more irritated and more likely to cheat the system.',
        'NIST contribution is that it treats authentication like a human system as much as a technical one. If a rule pushes people toward predictable workarounds, that rule is not helping. The standard is useful because it recognizes the difference.',
      ],
      bullets: [
        'NIST does not reward complexity theater.',
        'User behavior is part of security, not a side note.',
        'A strong policy lowers risk without encouraging predictable shortcuts.',
      ],
    },
    {
      heading: 'Length beats ritualized complexity',
      paragraphs: [
        'One of the most important practical takeaways from NIST guidance is that longer passwords are generally better than short passwords engineered to satisfy rigid character rules. This seems obvious now, but many password forms and internal policies still behave as if uppercase letters, numbers, and symbols automatically produce good security.',
        'The deeper point is not that symbols are useless. It is that forced composition rules often create a narrow set of human habits. When every employee learns to make a password by capitalizing the first letter, choosing a familiar root word, and adding a number plus symbol at the end, the resulting passwords become more guessable than the policy intended.',
        'NIST encourages systems to allow longer secrets and to stop punishing users for pasting manager-generated passwords or passphrases. That shift improves both usability and security at the same time, which is rare enough to be worth taking seriously.',
      ],
      bullets: [
        'Let users create long passwords and passphrases.',
        'Do not mistake a hard-to-read password for a hard-to-crack password.',
        'Policies should support password managers, not break them.',
      ],
    },
    {
      heading: 'Breached-password screening is one of the highest-value controls',
      paragraphs: [
        'NIST guidance is often discussed in terms of what it removed, but what it added matters just as much. Screening passwords against known compromised values is one of the most useful controls a service can deploy. It deals directly with the real world rather than with a hypothetical model of how strong a password “looks”.',
        'This is important because users regularly choose passwords that are not just weak in theory but already exposed in past breaches. A password might pass character requirements and still be an awful choice if it is close to common leaked credentials. Screening catches that gap in a way simplistic checklists never can.',
        'For users, the lesson is straightforward: if a service rejects a password as compromised, that is not unnecessary friction. It is a sign the service is doing one of the few things that genuinely lowers account takeover risk.',
      ],
      bullets: [
        'A password can be long enough and still be unsafe if it is already known in breach corpora.',
        'Compromised-password checks prevent obvious mistakes before they become incidents.',
        'This control is often more valuable than frequent forced password changes.',
      ],
    },
    {
      heading: 'What NIST says about password resets and rotation',
      paragraphs: [
        'Many teams still assume that scheduled password rotation is a baseline good practice. NIST challenges that assumption. The guidance does not support changing passwords on a timer without evidence of compromise or a specific operational reason. The reason is simple: routine rotation often creates password drift rather than meaningful renewal.',
        'When users are required to change passwords too often, they typically respond by keeping the same structure and adjusting it slightly. From the attacker point of view, that is a gift. If one version is exposed, the next version becomes easier to predict. In other words, frequent resets can create the illusion of control while preserving the same core weakness.',
        'A better model is event-driven change. Reset passwords when there is reason to think the secret has been exposed, phished, reused in a breach, or stored on an infected device. Outside those cases, focus on stronger initial passwords and better account monitoring.',
      ],
      bullets: [
        'Do not force periodic changes without a concrete risk trigger.',
        'Prioritize breach response, suspicious activity, and account compromise indicators.',
        'Stable strong passwords are often safer than frequently tweaked weak ones.',
      ],
    },
    {
      heading: 'How to apply NIST guidance in a product or internal policy',
      paragraphs: [
        'For product teams, the practical question is not “how do we reference NIST in a policy document?” but “what should change in the user flow?”. The best answers are operational: allow longer input lengths, permit pasted passwords, support managers, block compromised values, remove needless composition constraints, and avoid forcing resets without cause.',
        'For internal teams, the same logic applies. If your policy still requires short maximum lengths, forbids passphrases, or punishes users for copy-pasting from a manager, it is almost certainly working against modern best practice. Updating the PDF policy is the easy part. Fixing the product or directory settings is the real work.',
        'The goal is not to be fashionable. The goal is to remove controls that do not pull their weight and strengthen the ones that do. NIST remains useful because it gives teams permission to stop defending ineffective rituals.',
      ],
      bullets: [
        'Check maximum password length, not just minimum length.',
        'Review whether your login and reset forms work cleanly with password managers.',
        'Replace policy language that rewards compliance theater instead of reducing risk.',
      ],
    },
    {
      heading: 'The practical summary',
      paragraphs: [
        'If you remember only one thing from NIST 800-63B, let it be this: strong authentication policy should reduce predictable human failure, not create more of it. Long passwords, support for password managers, compromised-password screening, and event-driven resets do that. Cosmetic complexity rituals often do not.',
        'This is why the standard remains relevant even years after many teams first heard about it. Its lessons are still not fully implemented. A surprising number of organizations still force behaviors that modern guidance already showed to be counterproductive.',
        'The simplest test is honest: does your current password policy make it easier for a normal user to do the secure thing? If the answer is no, NIST is not just a reference document for you. It is a to-do list.',
      ],
      bullets: [
        'Length, uniqueness, and breach screening matter most.',
        'Policies should fit real user behavior, not imaginary perfect behavior.',
        'If a rule creates predictable workarounds, it probably needs to be replaced.',
      ],
    },
  ],
);

const NIST_UA = article(
  'Правила паролів NIST 800-63B: що справді важливо',
  'Зрозуміле пояснення рекомендацій NIST 800-63B і того, як вони змінюють реальну політику паролів для користувачів, команд і продуктів.',
  'Правила паролів NIST 800-63B: практичний розбір | generatepasswordto.me',
  'Розберіться, що на практиці означають рекомендації NIST 800-63B: довжина, перевірка на витоки, підтримка менеджерів паролів і відмова від застарілих ритуалів зміни.',
  ['nist 800-63b', 'правила паролів nist', 'політика паролів', 'сучасні правила паролів', 'nist 800-63b пояснення'],
  [
    {
      heading: 'Чому NIST 800-63B досі має значення',
      paragraphs: [
        'NIST 800-63B часто цитують як набір окремих правил, але його реальна цінність у тому, що він змінив саму логіку розмови про паролі. Документ допоміг змістити фокус із декоративної складності на реальне зниження ризику. Це важливо, тому що багато компаній і досі живуть зі старими політиками, які звучать солідно, але вчать користувачів неправильним звичкам.',
        'Класичний приклад — примусова зміна пароля кожні 60 або 90 днів. На папері така практика здається дисципліною. У житті вона часто породжує ланцюжок майже однакових паролів, додаткові нотатки з паролями та загальне роздратування користувачів. Тобто формально контроль є, а по суті безпека майже не зростає.',
        'Сила NIST у тому, що цей стандарт дивиться на автентифікацію не тільки як на технічну задачу. Він визнає: якщо правило штовхає людей до передбачуваних обхідних маневрів, правило не виконує свою функцію.',
      ],
      bullets: [
        'NIST зменшує роль “театру безпеки”.',
        'Поведінка користувача — частина моделі захисту.',
        'Хороша політика не тільки забороняє, а й допомагає обрати сильніше рішення.',
      ],
    },
    {
      heading: 'Довжина важливіша за ритуальну складність',
      paragraphs: [
        'Один із найпрактичніших висновків NIST — довгі паролі зазвичай кращі за короткі паролі, які насильно підганяють під жорсткі композиційні правила. Це звучить очевидно, але велика кількість форм і корпоративних політик досі працює так, ніби наявність великої літери, цифри й символу автоматично означає хороший рівень захисту.',
        'Проблема в тому, що такі правила часто народжують однакову людську поведінку. Люди беруть знайоме слово, ставлять велику літеру на початку, цифру та спецсимвол у кінці — і всі думають, що політика спрацювала. Насправді це просто стандартизований шаблон, який чудово знайомий інструментам для зламу.',
        'Саме тому сучасний підхід виглядає інакше: дозволяти довгі паролі, не ламати роботу менеджерів паролів, не заважати вставці з буфера обміну і не карати користувача за парольну фразу, якщо вона реально сильна.',
      ],
      bullets: [
        'Довгий пароль дає більше реального запасу міцності.',
        'Символи й цифри корисні, але самі по собі не гарантують безпеки.',
        'Система повинна підтримувати сильну поведінку, а не ускладнювати її.',
      ],
    },
    {
      heading: 'Перевірка на скомпрометовані паролі — один із найцінніших контролів',
      paragraphs: [
        'Часто про NIST говорять через те, що він “прибрав”, але не менш важливо те, що він підсвітив. Перевірка паролів на відомі витоки — одна з найкорисніших практик, які сервіс може впровадити. Вона працює не з абстрактною уявою про силу пароля, а з реальною історією компрометацій.',
        'Це має велике значення, тому що користувач може вибрати пароль, який формально проходить усі вимоги, але давно присутній у злитих базах або дуже близький до популярних скомпрометованих комбінацій. Саме тут звичайні правила на кшталт “8 символів, літера, цифра, знак” провалюються.',
        'Для користувача це теж важливий сигнал: якщо сервіс відхиляє пароль як уже скомпрометований, це не зайва бюрократія. Це одна з небагатьох перевірок, яка реально захищає від очевидної помилки ще до інциденту.',
      ],
      bullets: [
        'Пароль може бути довгим, але все одно небезпечним, якщо він уже відомий у витоках.',
        'Скринінг скомпрометованих значень ловить ризик, який не видно з простих правил.',
        'Для реальної безпеки це часто корисніше, ніж регулярна примусова зміна пароля.',
      ],
    },
    {
      heading: 'Що NIST говорить про зміну паролів і ротацію',
      paragraphs: [
        'У багатьох командах досі вважають, що примусова ротація — це ознака зрілої безпеки. NIST ставить це під сумнів. Стандарт не підтримує ідею зміни пароля “по календарю”, якщо немає ознак компрометації або конкретної операційної причини. І це дуже практична позиція.',
        'Коли користувача змушують змінювати пароль занадто часто, він зазвичай не вигадує повністю новий секрет. Він модифікує старий: додає інший рік, переставляє цифри, міняє один символ. Для атакувальника це означає, що наступний пароль часто легше передбачити, якщо попередній уже відомий.',
        'Значно сильніша модель — зміна після події ризику. Якщо пароль міг потрапити у витік, якщо був фішинг, якщо акаунт поводиться підозріло або пристрій заражений — ось тоді зміна потрібна негайно. Поза цими сценаріями краще мати стабільний сильний пароль, ніж нескінченну серію слабких варіацій.',
      ],
      bullets: [
        'Не змінюйте пароль просто тому, що минуло 90 днів.',
        'Реагуйте на ризикові події, а не на календар.',
        'Часта косметична зміна може бути гіршою за рідкісну, але змістовну.',
      ],
    },
    {
      heading: 'Як застосувати NIST у продукті або внутрішній політиці',
      paragraphs: [
        'Для продуктових команд головне питання звучить не “як красиво згадати NIST у документації”, а “що реально потрібно змінити у флоу користувача”. Відповідь здебільшого практична: підняти допустиму довжину, дозволити вставку пароля, забезпечити нормальну роботу менеджерів, перевіряти скомпрометовані значення та прибрати правила, які дають мало користі.',
        'Для внутрішніх ІТ-команд та безпекових політик логіка та сама. Якщо ваша система досі обрізає довгі паролі, не любить парольні фрази або ламає вставку з менеджера, то паперове посилання на NIST мало що змінює. Потрібно оновлювати не лише документ, а й фактичну поведінку системи.',
        'Тут і криється реальна зрілість: не у кількості правил, а в тому, наскільки вони зменшують ризик без зайвого тертя. NIST корисний саме тому, що дозволяє командам відмовитися від неефективних ритуалів без відчуття, що вони “послабили контроль”.',
      ],
      bullets: [
        'Перевірте не тільки мінімальну, а й максимальну довжину пароля.',
        'Подивіться, чи дружній ваш login flow до менеджерів паролів.',
        'Приберіть політичні вимоги, які створюють більше шуму, ніж користі.',
      ],
    },
    {
      heading: 'Короткий практичний висновок',
      paragraphs: [
        'Якщо звести NIST 800-63B до одного сенсу, він звучить так: сильна політика автентифікації повинна зменшувати передбачувані людські помилки, а не провокувати їх. Довгі паролі, підтримка менеджерів, перевірка на витоки й зміна після реального ризику працюють у цьому напрямку. Декоративна складність і календарна ротація часто ні.',
        'Саме тому цей документ і досі актуальний. Не тому, що він новий, а тому, що його уроки досі впроваджені не всюди. Багато команд ще живуть за правилами, які сучасна практика вже давно поставила під сумнів.',
        'Найчесніший тест дуже простий: чи допомагає ваша поточна політика звичайному користувачеві зробити справді безпечний вибір? Якщо відповідь негативна, то NIST для вас — це не просто стандарт. Це список конкретних покращень.',
      ],
      bullets: [
        'У центрі мають бути довжина, унікальність і перевірка на витоки.',
        'Політика повинна працювати з реальною поведінкою людей.',
        'Якщо правило породжує передбачувані обхідні маневри, його варто переглянути.',
      ],
    },
  ],
);

const NIST_RU = article(
  'Правила паролей NIST 800-63B: что действительно важно',
  'Понятное объяснение рекомендаций NIST 800-63B и того, как они меняют реальную политику паролей для пользователей, команд и продуктов.',
  'Правила паролей NIST 800-63B: практический разбор | generatepasswordto.me',
  'Разберитесь, что на практике означают рекомендации NIST 800-63B: длина, проверка на утечки, поддержка менеджеров паролей и отказ от устаревших ритуалов смены.',
  ['nist 800-63b', 'правила паролей nist', 'политика паролей', 'современные правила паролей', 'nist 800-63b объяснение'],
  [
    {
      heading: 'Почему NIST 800-63B всё ещё актуален',
      paragraphs: [
        'NIST 800-63B часто воспринимают как набор сухих требований, но его реальная ценность в другом: он помог перевести разговор о паролях из плоскости формальной сложности в плоскость реального снижения риска. Это важно, потому что многие компании до сих пор опираются на старые политики, которые хорошо звучат, но воспитывают плохое поведение.',
        'Типичный пример — обязательная смена пароля каждые 60 или 90 дней. На бумаге это кажется дисциплиной. В реальной жизни пользователь просто меняет один символ, добавляет новый год или записывает очередную версию в небезопасное место. Система получает “новый” пароль, а риск остаётся почти тем же.',
        'Сильная сторона NIST в том, что он признаёт: безопасность аутентификации зависит не только от правил, но и от того, как люди на них реагируют. Если правило системно толкает пользователя к обходным привычкам, оно не работает так, как задумывалось.',
      ],
      bullets: [
        'NIST снижает роль бессмысленного ритуала в политике паролей.',
        'Поведение пользователя — это часть модели угроз.',
        'Хорошая политика должна улучшать решение, а не только усложнять форму.',
      ],
    },
    {
      heading: 'Длина важнее ритуальной сложности',
      paragraphs: [
        'Один из ключевых выводов NIST заключается в том, что длинный пароль обычно лучше короткого пароля, созданного под жёсткие композиционные требования. Это не значит, что цифры и символы бесполезны. Это значит, что сами по себе они не дают той защиты, которую им часто приписывают.',
        'Когда организация требует “одну заглавную, одну цифру и один спецсимвол”, пользователи почти неизбежно приходят к одинаковым схемам. Они берут знакомое слово, ставят заглавную букву в начале, а цифру и символ — в конце. Формально пароль становится сложнее, фактически — лишь стандартизируется удобный шаблон.',
        'Современный подход выгоднее всем: разрешать длинные пароли, не ломать работу менеджеров, не запрещать вставку из буфера и не наказывать пользователя за длинную парольную фразу, если она действительно сильная.',
      ],
      bullets: [
        'Длина даёт более реальный запас стойкости, чем декоративные усложнения.',
        'Трудночитаемый пароль не всегда труднее взломать.',
        'Если система мешает менеджерам паролей, она мешает и безопасности.',
      ],
    },
    {
      heading: 'Проверка скомпрометированных паролей — одна из самых полезных мер',
      paragraphs: [
        'Говоря о NIST, часто вспоминают то, от чего он ушёл, но не менее важно то, что он усилил. Проверка пароля на уже известные утечки — один из самых ценных контролей, которые может внедрить сервис. Она работает с реальной историей компрометаций, а не с теоретическим ощущением силы.',
        'Это критично, потому что пароль может соответствовать формальным требованиям и всё равно быть плохим выбором. Если он уже присутствует в утечках или слишком близок к популярным скомпрометированным комбинациям, визуальная “сложность” уже мало что значит.',
        'Для пользователя здесь полезный вывод тоже прост: если сервис отклоняет пароль как скомпрометированный, это не прихоть. Это признак того, что платформа применяет действительно работающий контроль.',
      ],
      bullets: [
        'Длинный пароль тоже может быть плохим, если он уже известен из утечек.',
        'Проверка на компрометацию закрывает риск, который не виден в простом чеклисте.',
        'Эта мера часто полезнее регулярной принудительной смены пароля.',
      ],
    },
    {
      heading: 'Что NIST говорит о ротации и смене паролей',
      paragraphs: [
        'Во многих командах до сих пор считают, что принудительная ротация — это базовый признак зрелой безопасности. NIST с этим не соглашается. Стандарт не поддерживает идею смены пароля “по расписанию”, если нет признаков компрометации или другой конкретной причины.',
        'Причина очень практична: частая смена без повода почти всегда ведёт к предсказуемой модификации старого секрета. Пользователь не выдумывает новый пароль с нуля. Он меняет хвост, год, символ или порядок цифр. Если предыдущая версия уже утекла, следующая становится проще для предсказания.',
        'Сильнее работает событийный подход. Менять пароль нужно после утечки, фишинга, подозрительной активности, потери устройства или другого реального индикатора риска. В остальное время куда полезнее иметь один сильный пароль, чем длинную цепочку его слабых вариаций.',
      ],
      bullets: [
        'Не заставляйте людей менять пароль просто из-за даты в календаре.',
        'Меняйте пароль после события риска, а не ради процесса.',
        'Стабильный сильный пароль часто лучше, чем частая косметическая ротация.',
      ],
    },
    {
      heading: 'Как внедрять NIST в продукте и внутренней политике',
      paragraphs: [
        'Для продуктовой команды вопрос должен звучать не “как сослаться на NIST в документе”, а “что именно нужно поменять в форме входа, регистрации и сброса пароля”. Практический список обычно ясен: поддерживать длинный ввод, не ломать вставку, нормально работать с менеджерами паролей, проверять пароль по базе компрометаций и убирать правила, которые дают мало реальной пользы.',
        'Для внутренних ИТ-политик логика та же. Если у вас до сих пор действует маленький максимум длины, ограничения на фразы, запрет вставки или враждебность к менеджерам, то простая ссылка на NIST ничего не меняет. Нужна правка самой системы, а не только PDF-файла с политикой.',
        'Именно здесь становится видно, насколько команда готова к современной практике. Зрелость — не в количестве запретов, а в том, насколько правила действительно уменьшают риск без лишнего трения.',
      ],
      bullets: [
        'Проверьте максимальную длину пароля и работу формы с длинными значениями.',
        'Убедитесь, что менеджеры паролей не ломаются на логине и сбросе.',
        'Удалите правила, которые выглядят строго, но не приносят реальной пользы.',
      ],
    },
    {
      heading: 'Практический итог',
      paragraphs: [
        'Если свести NIST 800-63B к одной мысли, она будет такой: хорошая политика аутентификации должна уменьшать предсказуемые человеческие ошибки, а не создавать новые. Длинные пароли, поддержка менеджеров, проверка на утечки и смена после реального риска работают именно так. Ритуальная сложность и бессмысленная ротация — часто нет.',
        'Поэтому стандарт остаётся актуальным и сейчас. Не потому, что он “модный”, а потому, что его уроки до сих пор не везде внедрены. Во многих системах по-прежнему живут правила, от которых современные практики уже фактически отказались.',
        'Самая честная проверка проста: помогает ли ваша текущая политика обычному человеку сделать безопасный выбор? Если нет, то NIST для вас — не просто справочный документ, а план необходимых изменений.',
      ],
      bullets: [
        'Ставьте в центр длину, уникальность и проверку по утечкам.',
        'Политика должна работать с реальным поведением людей.',
        'Если правило рождает предсказуемые обходные привычки, его пора пересматривать.',
      ],
    },
  ],
);

const BREACH_EN = article(
  'What to Do After a Password Breach',
  'A calm, practical response plan for the first minutes, first day, and first week after a password breach or suspected credential leak.',
  'What to Do After a Password Breach | generatepasswordto.me',
  'Learn what to do after a password breach: protect your email first, rotate exposed passwords, enable 2FA, review devices, and stop a single leak from spreading.',
  ['what to do after a password breach', 'credential leak response', 'password breach checklist', 'account recovery after breach', 'exposed password steps'],
  [
    {
      heading: 'The first rule: do not panic, but do move quickly',
      paragraphs: [
        'People often respond to a password breach in one of two bad ways: either they freeze because they do not know where to start, or they rush into random password changes without understanding which accounts matter most. Neither response is ideal. The useful approach is structured urgency. You do not need panic. You do need order.',
        'A breached password becomes dangerous when it opens the door to other accounts. That means the first question is not “where did the leak happen?” It is “what else can be reached from this password or from the email account connected to it?” If the answer includes your primary email, work account, banking apps, or password manager, those rise to the top immediately.',
        'Think in terms of containment. Your first job is to prevent the breach from spreading. Investigation comes after that.',
      ],
      bullets: [
        'Containment before diagnosis.',
        'Protect the accounts that can reset or unlock everything else.',
        'A calm checklist beats chaotic action.',
      ],
    },
    {
      heading: 'Start with your email account and your password manager',
      paragraphs: [
        'If your email account is exposed or uses the same password as the breached service, it should be your first priority. Email is the recovery hub for most digital life. If an attacker can access it, they can often reset passwords for social media, shopping platforms, cloud storage, and workplace tools without touching the original breach again.',
        'The same logic applies to your password manager. If there is any chance the exposed password was reused for the manager, or if the manager vault depends on an email account that may be compromised, lock that down immediately. Change the master password if needed, review recovery settings, and make sure 2FA is active.',
        'This step feels obvious in hindsight, but many users waste time changing low-priority accounts first while leaving the real recovery infrastructure exposed.',
      ],
      bullets: [
        'Change your email password before low-value site passwords.',
        'Review recovery emails, backup codes, and 2FA methods.',
        'If the manager is at risk, secure it before everything else.',
      ],
    },
    {
      heading: 'Change reused passwords in order of damage potential',
      paragraphs: [
        'Once the central accounts are under control, the next task is to identify reuse. A password breach becomes much worse when the same or similar password appears across multiple services. The fastest way to reduce damage is to rotate those passwords in a smart order rather than alphabetically.',
        'Start with financial services, cloud storage, work tools, government portals, and any platform that stores sensitive personal information. Then move to social accounts, commerce sites, and community platforms. This order matters because not every account carries the same blast radius.',
        'If you use a password manager, this is where it starts saving time. Replace reused passwords with newly generated unique ones instead of inventing variations on the fly. If you are still working without a manager, this incident is usually the moment when adopting one stops being theoretical and becomes obviously useful.',
      ],
      bullets: [
        'Do not create variants of the exposed password.',
        'Rotate high-impact accounts first, not necessarily the breached site first.',
        'Use the incident as a turning point toward unique passwords everywhere.',
      ],
    },
    {
      heading: 'Turn on or upgrade two-factor authentication',
      paragraphs: [
        'After a breach, many people focus so intensely on passwords that they forget the second layer. That is a mistake. Two-factor authentication will not erase the fact that a password was exposed, but it can stop the breach from turning into a full account takeover. That makes it one of the highest-value actions in the first day after the incident.',
        'Prefer authenticator apps or hardware security keys where possible. SMS is better than nothing, but it is not the strongest option for high-value accounts. If a service supports stronger methods, use them, especially for email, work access, password managers, and financial tools.',
        'Also review backup methods. A strong 2FA setup is only as useful as its recovery path. If backup codes are missing, outdated, or stored carelessly, the account may still be fragile.',
      ],
      bullets: [
        'Enable 2FA on all critical accounts immediately after password rotation.',
        'Prefer authenticator apps or security keys over SMS where practical.',
        'Store backup codes securely and review them after changes.',
      ],
    },
    {
      heading: 'Review sessions, devices, and recovery settings',
      paragraphs: [
        'A password change is essential, but it is not always enough. If an attacker already opened an authenticated session, they may remain logged in until you explicitly sign out other devices or revoke sessions. That is why account review matters after the password itself has been replaced.',
        'Look for active sessions, connected devices, recovery phone numbers, forwarding rules, backup emails, authorized third-party apps, and recent security events. In email services, pay special attention to forwarding settings and app passwords. In social platforms, review linked applications and business roles. In work systems, notify internal security if policy requires it.',
        'You are not just changing a secret. You are checking whether the attacker left any doors open behind them.',
      ],
      bullets: [
        'Sign out other sessions where the platform allows it.',
        'Check whether recovery details were changed without your approval.',
        'Review forwarding rules, linked apps, and unusual device activity.',
      ],
    },
    {
      heading: 'What to do in the first week after the incident',
      paragraphs: [
        'Many users relax too early once the obvious passwords are changed. The first week still matters. Watch for password-reset emails you did not request, unfamiliar login alerts, missing messages, suspicious account notifications, and unusual payment or subscription events. Some attackers act immediately. Others wait until users drop their guard.',
        'This is also the right time to clean up the underlying weakness that made the breach dangerous. If reuse was the issue, remove reuse. If weak recovery settings were the issue, fix them. If the password was exposed through phishing, review how the attack looked and how you would recognize it earlier next time.',
        'A breach is stressful, but it is also unusually clarifying. It shows exactly where your security routine was too fragile. If you act on that lesson, the incident can become the last easy win an attacker gets from your accounts.',
      ],
      bullets: [
        'Monitor alerts and account behavior for several days after the initial fix.',
        'Correct the root habit, not just the single exposed password.',
        'Document what happened if the account is work-related or business-critical.',
      ],
    },
  ],
);

const BREACH_UA = article(
  'Що робити після витоку пароля',
  'Спокійний і практичний план дій на перші хвилини, перший день і перший тиждень після витоку пароля або підозри на компрометацію.',
  'Що робити після витоку пароля | generatepasswordto.me',
  'Дізнайтеся, що робити після витоку пароля: спершу захистити пошту, змінити повторно використані паролі, увімкнути 2FA і не дати одному інциденту поширитися далі.',
  ['що робити після витоку пароля', 'витік пароля дії', 'компрометація акаунта', 'пароль у витоку', 'чеклист після витоку'],
  [
    {
      heading: 'Перше правило — не панікувати, але й не зволікати',
      paragraphs: [
        'Після витоку пароля люди часто впадають у дві крайнощі. Хтось завмирає, бо не розуміє, із чого почати. Хтось, навпаки, хаотично змінює все підряд, не розуміючи, які акаунти є критичними. Обидві реакції неідеальні. Найкраще працює структурована терміновість: без паніки, але з чітким порядком дій.',
        'Небезпека витоку не в самому факті, що пароль десь опинився, а в тому, куди цей пароль може привести. Тому головне питання на старті — не “де саме стався витік”, а “які ще акаунти можна відкрити через цей пароль або через пов’язану з ним пошту”. Якщо там є email, робочий доступ, банк або менеджер паролів, вони стають пріоритетом номер один.',
        'Думайте не про розслідування, а про локалізацію збитку. Ваше перше завдання — не дізнатися все, а не дати інциденту розростися.',
      ],
      bullets: [
        'Спочатку локалізація, потім детальний аналіз.',
        'Найважливіші акаунти — ті, через які можна відновити доступ до інших.',
        'Чіткий чекліст ефективніший за хаотичну реакцію.',
      ],
    },
    {
      heading: 'Почніть із пошти та менеджера паролів',
      paragraphs: [
        'Якщо під загрозою поштовий акаунт або ви використовували той самий пароль у пошті, це має бути ваш перший крок. Саме пошта часто є центром відновлення доступу до більшості сервісів. Отримавши її, зловмисник може скидати паролі в соцмережах, маркетплейсах, хмарних сервісах і робочих системах без додаткового злому.',
        'Те саме стосується менеджера паролів. Якщо є хоча б мінімальна підозра, що пароль до нього повторювався або що пов’язана з ним пошта була під ризиком, захищайте менеджер негайно. За потреби змініть master password, перевірте recovery settings і переконайтеся, що 2FA увімкнена.',
        'На практиці багато людей витрачають дорогоцінний час на малозначущі акаунти, поки найважливіша інфраструктура відновлення лишається відкритою. Цього варто уникати.',
      ],
      bullets: [
        'Спочатку змініть пароль до пошти, а не до другорядних сайтів.',
        'Перевірте резервні методи відновлення та backup codes.',
        'Якщо під ризиком менеджер паролів, захистіть його до всього іншого.',
      ],
    },
    {
      heading: 'Змінюйте повторно використані паролі в правильному порядку',
      paragraphs: [
        'Витік одного пароля стає по-справжньому небезпечним тоді, коли той самий або дуже схожий пароль використовується в інших сервісах. Тому наступний крок — не просто “міняти все”, а змінювати в порядку потенційної шкоди.',
        'Почніть із банкінгу, хмарних сховищ, робочих акаунтів, державних сервісів і платформ, де є персональні або платіжні дані. Потім переходьте до соцмереж, магазинів, форумів і менш критичних акаунтів. Не кожен сервіс однаково небезпечний у разі компрометації.',
        'Якщо у вас є менеджер паролів, тут він особливо корисний: замість того щоб вигадувати варіації старого пароля, ви створюєте нові унікальні значення для кожного сервісу. Якщо менеджера ще немає, саме такий інцидент часто найкраще показує, чому його варто впровадити.',
      ],
      bullets: [
        'Не створюйте “оновлену версію” старого скомпрометованого пароля.',
        'Змінюйте спершу акаунти з найбільшим потенціалом збитку.',
        'Використайте момент, щоб повністю відмовитися від перевикористання.',
      ],
    },
    {
      heading: 'Увімкніть або посильте двофакторну автентифікацію',
      paragraphs: [
        'Після витоку багато хто настільки концентрується на зміні паролів, що забуває про другий шар захисту. Це помилка. 2FA не скасовує сам факт витоку, але дуже часто саме вона зупиняє інцидент до того, як він перетвориться на повноцінне захоплення акаунта.',
        'Там, де можливо, краще використовувати застосунок-аутентифікатор або апаратний ключ безпеки. SMS усе ще краще, ніж повна відсутність другого фактора, але для пошти, робочих систем, менеджера паролів і фінансових сервісів варто обирати сильніші методи.',
        'Не забудьте також про резервний контур: коди відновлення, резервну пошту, прив’язані телефони. Безпечна 2FA — це не лише спосіб входу, а й продуманий шлях відновлення після збою.',
      ],
      bullets: [
        'Додавайте 2FA на критичних акаунтах одразу після зміни пароля.',
        'За можливості використовуйте authenticator app або security key.',
        'Перевіряйте, де й як зберігаються резервні коди.',
      ],
    },
    {
      heading: 'Перегляньте сесії, пристрої й recovery settings',
      paragraphs: [
        'Зміна пароля — обов’язкова дія, але не завжди достатня. Якщо зловмисник уже встиг увійти в акаунт, активна сесія може зберігатися, поки ви окремо не вийдете з інших пристроїв або не відкличете сесії. Саме тому після зміни пароля потрібно перевірити стан акаунта глибше.',
        'Подивіться на активні сесії, підключені пристрої, правила переадресації, резервні адреси, прив’язані додатки, app passwords і журнал безпеки. Для пошти особливо важливо перевірити форвардинг і сторонні підключення. Для соцмереж — пов’язані застосунки та бізнес-доступи. Для робочих акаунтів — дотриматися внутрішньої процедури сповіщення безпекової команди.',
        'По суті, ви не просто міняєте секрет, а перевіряєте, чи не залишилося після зловмисника відчинених дверей.',
      ],
      bullets: [
        'Завершіть сторонні сесії, якщо сервіс це дозволяє.',
        'Перевірте, чи не були змінені recovery email або телефон.',
        'Перегляньте форвардинг, сторонні інтеграції та підозрілу активність.',
      ],
    },
    {
      heading: 'Що робити впродовж наступного тижня',
      paragraphs: [
        'Після першого хвилювання легко вирішити, що проблема вже закрита, щойно змінено головні паролі. Але наступний тиждень теж важливий. Слідкуйте за незапитаними листами про скидання пароля, незнайомими alert-ами входу, змінами в акаунтах, дивними списаннями або новими прив’язками.',
        'Саме тепер варто усунути першопричину. Якщо проблема була в перевикористанні, позбавтеся його повністю. Якщо слабким місцем стала пошта — посильте її. Якщо пароль опинився у витоку через фішинг, варто розібрати сценарій атаки й зрозуміти, як упізнати його наступного разу.',
        'Витік пароля — неприємна подія, але вона дуже чітко показує, де ваша безпекова рутина була надто крихкою. Якщо зробити висновки, інцидент перестає бути просто стресом і стає точкою дорослішання всієї системи доступів.',
      ],
      bullets: [
        'Спостерігайте за підозрілими подіями щонайменше кілька днів після інциденту.',
        'Виправляйте не лише наслідок, а й звичку, яка зробила витік небезпечним.',
        'Для робочих або бізнес-акаунтів документуйте, що сталося і що було змінено.',
      ],
    },
  ],
);

const BREACH_RU = article(
  'Что делать после утечки пароля',
  'Спокойный и практичный план действий на первые минуты, первый день и первую неделю после утечки пароля или подозрения на компрометацию.',
  'Что делать после утечки пароля | generatepasswordto.me',
  'Узнайте, что делать после утечки пароля: сначала защитить почту, сменить повторно используемые пароли, включить 2FA и не дать одному инциденту распространиться дальше.',
  ['что делать после утечки пароля', 'утечка пароля действия', 'компрометация аккаунта', 'пароль в утечке', 'чеклист после утечки'],
  [
    {
      heading: 'Первое правило — без паники, но и без промедления',
      paragraphs: [
        'После утечки пароля люди часто реагируют двумя неудачными способами. Одни замирают, потому что не понимают, с чего начать. Другие начинают хаотично менять всё подряд, не понимая, какие аккаунты действительно критичны. Намного лучше работает структурированная срочность: спокойно, но быстро.',
        'Опасность утечки не в самом факте, что пароль где-то появился, а в том, к каким ещё аккаунтам он может привести. Поэтому главный вопрос на старте — не “где именно произошла утечка”, а “что ещё можно открыть с помощью этого пароля или через связанную с ним почту”. Если это почта, рабочий доступ, банкинг или менеджер паролей, именно их нужно брать в работу первыми.',
        'Думайте не как расследователь, а как тот, кто локализует ущерб. Сначала нужно остановить распространение проблемы, а уже потом разбираться во всех деталях.',
      ],
      bullets: [
        'Сначала локализация, потом полное расследование.',
        'Главные аккаунты — те, через которые можно восстановить доступ ко всем остальным.',
        'Хороший чеклист эффективнее резких несистемных действий.',
      ],
    },
    {
      heading: 'Начните с почты и менеджера паролей',
      paragraphs: [
        'Если под угрозой почтовый аккаунт или если пароль от почты совпадал с утёкшим, это ваш первый приоритет. Почта остаётся центром восстановления доступа для большинства сервисов. Получив её, злоумышленник может менять пароли в соцсетях, магазинах, облачных платформах и рабочих инструментах без повторного взлома исходного сайта.',
        'То же относится к менеджеру паролей. Если есть хотя бы малейший шанс, что утёкший пароль использовался там же или что скомпрометирована почта, связанная с менеджером, действовать нужно сразу. При необходимости меняйте мастер-пароль, проверяйте recovery-настройки и включайте 2FA.',
        'На практике многие пользователи тратят драгоценное время на второстепенные сайты, пока главный канал восстановления доступа остаётся уязвимым. Это одна из самых дорогих ошибок после инцидента.',
      ],
      bullets: [
        'Сначала меняйте пароль от почты, а не от малозначимых сервисов.',
        'Проверьте резервные способы входа и восстановления.',
        'Если есть риск для менеджера паролей, защищайте его сразу.',
      ],
    },
    {
      heading: 'Меняйте повторно используемые пароли по степени ущерба',
      paragraphs: [
        'Утечка одного пароля становится по-настоящему опасной, когда тот же или очень похожий пароль использовался в других сервисах. Поэтому следующая задача — не просто “поменять всё”, а менять в правильном порядке.',
        'Начните с финансовых сервисов, облачных хранилищ, рабочих систем, государственных порталов и платформ с чувствительными персональными данными. Потом переходите к соцсетям, магазинам, форумам и менее критичным аккаунтам. Такой порядок важен, потому что не все сервисы одинаково опасны при компрометации.',
        'Если вы уже пользуетесь менеджером паролей, используйте его по назначению: заменяйте старые совпадающие пароли на новые уникальные, а не придумывайте вариации старого. Если менеджера ещё нет, именно такой инцидент обычно лучше всего показывает, почему без него неудобно и небезопасно.',
      ],
      bullets: [
        'Не создавайте новую версию скомпрометированного пароля с небольшими изменениями.',
        'Сначала закрывайте аккаунты с самым большим потенциальным ущербом.',
        'Используйте момент, чтобы окончательно уйти от повторного использования.',
      ],
    },
    {
      heading: 'Включите или усилите двухфакторную аутентификацию',
      paragraphs: [
        'После утечки многие настолько концентрируются на паролях, что забывают про второй слой защиты. Это ошибка. 2FA не отменяет факт компрометации, но очень часто именно она не даёт инциденту перерасти в полноценный захват аккаунта.',
        'Если есть выбор, отдавайте предпочтение приложению-аутентификатору или аппаратному ключу безопасности. SMS по-прежнему лучше, чем полное отсутствие второго фактора, но для почты, менеджеров паролей, рабочих сервисов и финансовых платформ более сильные методы предпочтительнее.',
        'Также обязательно проверьте резервный контур: backup codes, запасные адреса, телефоны восстановления. Безопасная 2FA — это не только вход, но и надёжный путь восстановления.',
      ],
      bullets: [
        'Подключайте 2FA на критичных аккаунтах сразу после смены пароля.',
        'По возможности используйте authenticator app или security key.',
        'Храните резервные коды безопасно и не забывайте их обновлять.',
      ],
    },
    {
      heading: 'Проверьте сессии, устройства и настройки восстановления',
      paragraphs: [
        'Смена пароля необходима, но этого не всегда достаточно. Если злоумышленник уже успел войти в аккаунт, его активная сессия может сохраниться, пока вы отдельно не завершите остальные входы или не отзовёте доступ. Поэтому следующий шаг — посмотреть на состояние аккаунта шире.',
        'Проверьте активные сессии, подключённые устройства, привязанные приложения, правила пересылки, app passwords, резервные адреса и журнал безопасности. В почте особенно важно искать подозрительные forwarding rules. В соцсетях — связанные приложения и бизнес-доступы. В рабочих системах — при необходимости уведомить внутреннюю службу безопасности.',
        'Иначе говоря, вы меняете не только секрет. Вы проверяете, не остались ли после злоумышленника открытые технические ходы.',
      ],
      bullets: [
        'Завершите посторонние сессии, если сервис это поддерживает.',
        'Проверьте, не были ли изменены recovery email и номер телефона.',
        'Просмотрите сторонние интеграции и аномальную активность устройств.',
      ],
    },
    {
      heading: 'Что делать в течение следующей недели',
      paragraphs: [
        'После первых срочных действий легко решить, что проблема уже закрыта. Но следующая неделя тоже важна. Наблюдайте за письмами о сбросе пароля, которые вы не запрашивали, за странными уведомлениями о входе, за новыми списаниями, изменениями настроек и любыми признаками повторной попытки доступа.',
        'Это также лучший момент, чтобы убрать первопричину. Если проблема была в повторном использовании — полностью уходите от неё. Если слабым местом оказалась почта — укрепляйте её. Если пароль утёк из-за фишинга, разберите сценарий атаки и зафиксируйте, как распознавать её в будущем.',
        'Утечка пароля неприятна, но она очень точно показывает слабые места в вашей системе доступа. Если использовать этот момент правильно, инцидент становится не просто стрессом, а толчком к более зрелой цифровой гигиене.',
      ],
      bullets: [
        'Наблюдайте за аккаунтами несколько дней после срочных изменений.',
        'Исправляйте причину, а не только отдельный пароль.',
        'Для рабочих или бизнес-аккаунтов зафиксируйте, что произошло и какие меры приняты.',
      ],
    },
  ],
);

const MANAGER_EN = article(
  'Password Manager vs Manual Storage',
  'A practical comparison of password managers and manual storage methods, with honest trade-offs instead of one-size-fits-all advice.',
  'Password Manager vs Manual Storage | generatepasswordto.me',
  'Compare password managers with notebooks, browser memory, notes apps, and spreadsheets to understand which storage method is actually safer in daily use.',
  ['password manager vs manual storage', 'store passwords safely', 'password manager guide', 'best way to store passwords', 'password vault comparison'],
  [
    {
      heading: 'The real comparison is not convenience versus security',
      paragraphs: [
        'People often frame the password-manager debate as if it were a trade-off between security and comfort. In practice, that is too simplistic. The real question is whether your storage method helps you maintain unique strong passwords at scale without creating new failure points. Once you look at it that way, many “manual” systems stop looking reliable very quickly.',
        'A person with five low-risk accounts can sometimes get away with memory and discipline for longer than they should. A person with dozens of consumer accounts, work systems, financial services, and shared tools usually cannot. The more accounts you juggle, the more your system is tested not in theory but on a tired Tuesday evening when you just want to log in and move on.',
        'That is why the best storage method is rarely the one that sounds the most secure in a vacuum. It is the one that still holds up when life becomes repetitive, rushed, and messy.',
      ],
      bullets: [
        'A storage method fails when it pushes you toward reuse.',
        'Scale changes the answer: five accounts and fifty accounts are different problems.',
        'Security habits need to survive ordinary human fatigue.',
      ],
    },
    {
      heading: 'Why manual storage feels safer than it usually is',
      paragraphs: [
        'Manual methods come in many forms: trying to remember everything, writing passwords in a notebook, keeping them in a phone note, saving them in a spreadsheet, or emailing them to yourself. The reason these methods persist is obvious: they feel understandable. You can see them, touch them, and explain them to yourself without trusting a dedicated product.',
        'The weakness appears over time. Memory systems lead to reuse and pattern-based variation. Plain-text notes are easy to copy, sync, misplace, or expose on a compromised device. Spreadsheets create a false sense of order while quietly centralizing your secrets in a format that was never designed for this job.',
        'Even paper has trade-offs. A physical notebook avoids cloud exposure, but it also creates a single object that can be lost, photographed, borrowed, or left too close to the devices it protects. Manual storage is not automatically reckless, but it becomes brittle much faster than most people admit.',
      ],
      bullets: [
        'The main risk of manual storage is not one dramatic failure but a pile of small compromises.',
        'Plain text and predictable naming make secrets easier to expose than people expect.',
        'Paper avoids some digital risks while creating physical ones.',
      ],
    },
    {
      heading: 'What password managers solve better than humans do',
      paragraphs: [
        'The strongest argument for a password manager is not encryption marketing. It is behavioral leverage. A manager makes unique long passwords realistic for ordinary users because it removes the memory burden. Once you stop trying to invent and remember dozens of credentials, your security ceiling rises immediately.',
        'A good manager also helps with routine hygiene: auto-fill reduces typos, vault search reduces time pressure, secure generation removes guesswork, and breach alerts or audit tools can highlight reuse and weak entries you might otherwise ignore. In other words, the manager is not just storage. It is a system for sustaining better decisions.',
        'This does not mean managers are magic. They concentrate value, which means the master password, recovery setup, and device security matter a lot. But for most people, a well-secured manager dramatically lowers the day-to-day probability of bad password behavior.',
      ],
      bullets: [
        'Managers make unique random passwords practical, not theoretical.',
        'A vault is valuable because it improves routine behavior, not only because it stores data.',
        'The master password and 2FA become especially important in this model.',
      ],
    },
    {
      heading: 'Where manual methods may still make sense',
      paragraphs: [
        'There are edge cases where manual storage is not absurd. Some people keep one or two recovery secrets offline in a protected physical location because they do not want those specific values stored digitally. Teams sometimes maintain emergency break-glass credentials under controlled physical procedures. A few users with very limited account footprints may keep a short offline record as a backup rather than as the primary system.',
        'The key is that these are constrained use cases, not a general recommendation. Manual storage works best when the number of secrets is small, the context is deliberate, and the storage is treated as backup rather than casual everyday workflow. The danger starts when a special-case method becomes the main operating model for everything.',
        'So the honest answer is not “manual storage is always wrong.” It is that manual storage usually breaks down first under scale, repetition, and convenience pressure, which is exactly where most users live.',
      ],
      bullets: [
        'Offline storage can be sensible for a few critical recovery secrets.',
        'Special-case backup storage is different from your everyday password system.',
        'If the method does not scale, it is not a strong default.',
      ],
    },
    {
      heading: 'A practical recommendation for most users',
      paragraphs: [
        'For most people, the best default is simple: use a reputable password manager, protect it with a strong master password, turn on two-factor authentication, and keep one carefully planned recovery path. That setup is not perfect, but it is far more resilient than memory, plain-text notes, or ad-hoc personal systems.',
        'If you are hesitant, you do not need to migrate everything in one sitting. Start with the accounts that matter most: your email, bank, cloud storage, work tools, and the services you use to reset other accounts. Then gradually replace reused or weak passwords as you encounter them.',
        'The real win is not that a manager sounds more professional. The win is that it lets you stop improvising. Good security is easier when your system does more of the discipline for you.',
      ],
      bullets: [
        'Start migration with email, finance, work, and recovery-critical services.',
        'Use the manager as your primary system, not as a side experiment.',
        'The right tool reduces dependence on memory and habit hacks.',
      ],
    },
    {
      heading: 'The bottom line',
      paragraphs: [
        'Manual storage often survives because it feels personal and controllable. Password managers win because they scale better and produce stronger habits. That difference matters more than ideology. The safest method is not the one that feels most independent. It is the one that makes secure behavior easier to repeat.',
        'If your current system depends on remembering slight variations, scattering passwords across notes, or trusting yourself to stay organized forever, it is already warning you that it will not age well. A manager is not a silver bullet, but for most users it is the most realistic path to better password hygiene.',
        'Use manual storage only where it is intentionally limited and clearly justified. Use a password manager for the rest.',
      ],
      bullets: [
        'Choose the system that improves behavior at scale.',
        'Manual methods work best as limited backup, not as the main workflow.',
        'For everyday use, a secure manager is usually the strongest default.',
      ],
    },
  ],
);

const MANAGER_UA = article(
  'Менеджер паролів чи ручне зберігання: що безпечніше',
  'Практичне порівняння менеджерів паролів і ручних способів зберігання без крайнощів та спрощень.',
  'Менеджер паролів чи ручне зберігання | generatepasswordto.me',
  'Порівняйте менеджери паролів із нотатками, пам’яттю, таблицями та паперовими записами, щоб зрозуміти, який підхід справді безпечніший у повсякденному житті.',
  ['менеджер паролів чи ручне зберігання', 'де зберігати паролі', 'менеджер паролів', 'як безпечно зберігати паролі', 'сховище паролів'],
  [
    {
      heading: 'Справжнє порівняння — не між зручністю та безпекою',
      paragraphs: [
        'Коли люди сперечаються про менеджери паролів, розмова часто зводиться до примітивної формули: або зручно, або безпечно. Насправді таке порівняння занадто плоске. Ключове питання інше: чи допомагає ваш спосіб зберігання підтримувати унікальні сильні паролі для багатьох сервісів без нових слабких місць.',
        'Людина з кількома акаунтами ще може деякий час покладатися на пам’ять, хоч і не надто успішно. Людина з десятками сервісів, робочими системами, банком, поштою, хмарними акаунтами й підписками майже неминуче починає спрощувати собі життя. І саме в цей момент “ручна система” зазвичай починає тріщати.',
        'Тому найкращий спосіб зберігання — не той, який виглядає найбільш “контрольованим” у теорії, а той, який не ламається в звичайному повсякденному режимі, коли ви втомлені, поспішаєте або просто не хочете витрачати ще 10 хвилин на логін.',
      ],
      bullets: [
        'Погана система штовхає до повторного використання паролів.',
        'Масштаб має значення: кілька акаунтів і кілька десятків — це різні задачі.',
        'Безпекова звичка повинна витримувати звичайне людське навантаження.',
      ],
    },
    {
      heading: 'Чому ручне зберігання часто здається безпечнішим, ніж є насправді',
      paragraphs: [
        'Ручні способи бувають різні: хтось намагається все запам’ятати, хтось пише в блокнот, хтось зберігає в нотатках телефону, таблицях або надсилає собі листи. Вони виживають не тому, що справді сильні, а тому, що здаються зрозумілими. Людині простіше довіряти тому, що вона бачить і може пояснити собі без стороннього інструмента.',
        'Проблема проявляється не відразу, а поступово. Пам’ять штовхає до повторів і дрібних варіацій. Нотатки в чистому тексті легко синхронізуються, копіюються або відкриваються на скомпрометованому пристрої. Таблиці створюють ілюзію порядку, але насправді централізують усі секрети у форматі, який взагалі не про безпеку.',
        'Навіть паперовий блокнот не є безумовно хорошим рішенням. Він уникає частини цифрових ризиків, але стає фізичним об’єктом, який можна загубити, сфотографувати, залишити поруч із робочим місцем або передати не тій людині. Ручне зберігання не завжди катастрофа, але воно стає крихким набагато швидше, ніж здається.',
      ],
      bullets: [
        'Ризик ручного зберігання часто складається з багатьох дрібних компромісів.',
        'Відкритий текст і прості назви роблять секрети вразливішими, ніж люди думають.',
        'Папір зменшує частину цифрових ризиків, але створює фізичні.',
      ],
    },
    {
      heading: 'Що менеджер паролів вирішує краще за людину',
      paragraphs: [
        'Найсильніший аргумент на користь менеджера паролів — не маркетинг про шифрування, а поведінковий ефект. Менеджер робить унікальні довгі паролі реалістичними для звичайної людини, бо знімає з неї тягар пам’яті. Як тільки вам більше не треба вигадувати та запам’ятовувати десятки облікових даних, стеля вашої безпеки різко зростає.',
        'Крім зберігання, хороший менеджер підтримує гігієну: генерація прибирає випадковість із процесу, автозаповнення економить час, пошук у vault зменшує тертя, а вбудовані перевірки допомагають побачити повтори або слабкі значення, які інакше роками залишалися б непоміченими.',
        'Це не означає, що менеджер магічний. Він концентрує цінність, а отже master password, recovery settings, 2FA і безпека пристроїв стають ще важливішими. Але для більшості користувачів добре налаштований менеджер різко знижує ймовірність поганих щоденних рішень.',
      ],
      bullets: [
        'Менеджер робить сильні унікальні паролі звичною практикою.',
        'Це не просто сховище, а система підтримки правильної поведінки.',
        'У такій моделі особливо важливо добре захистити master password.',
      ],
    },
    {
      heading: 'Коли ручний підхід все ж може бути доречним',
      paragraphs: [
        'Є окремі сценарії, де ручне зберігання не виглядає абсурдним. Наприклад, деякі люди тримають один-два recovery secrets офлайн у захищеному місці, бо не хочуть зберігати саме ці значення цифрово. Команди іноді мають аварійні break-glass credentials з фізичним контролем доступу. Дехто з мінімальною кількістю акаунтів використовує паперовий backup як запасний, а не основний спосіб.',
        'Ключове слово тут — обмеження. Ручний підхід працює більш-менш прийнятно тоді, коли секретів мало, сценарій чітко контрольований, а сам метод не перетворюється на щоденну звичку для всього. Проблеми починаються, коли спеціальний випадок стає повноцінною операційною системою для кожного логіна.',
        'Тому чесна відповідь не в тому, що ручне зберігання “завжди неправильне”. Воно просто значно гірше масштабується й набагато швидше руйнується під тиском звичайної людської зручності.',
      ],
      bullets: [
        'Офлайн-зберігання може бути розумним для обмеженого набору критичних секретів.',
        'Backup-сценарій — це не те саме, що основний робочий процес.',
        'Якщо підхід не масштабується, він слабкий як дефолт.',
      ],
    },
    {
      heading: 'Практична рекомендація для більшості користувачів',
      paragraphs: [
        'Для більшості людей найкращий базовий варіант виглядає просто: менеджер паролів, сильний master password, увімкнена двофакторна автентифікація та один добре продуманий recovery path. Це не ідеальна система, але вона набагато надійніша за пам’ять, plain-text нотатки або саморобні схеми.',
        'Якщо ви вагаєтеся, не треба переносити все за один вечір. Почніть із найважливіших акаунтів: пошта, банк, хмарні сервіси, робочі системи та все, через що відновлюються інші доступи. Потім поступово замінюйте старі паролі на нові унікальні, коли входите у сервіси.',
        'Головний виграш у тому, що ви перестаєте імпровізувати. Хороша безпека стає простішою, коли система бере частину дисципліни на себе.',
      ],
      bullets: [
        'Починайте міграцію з пошти, фінансів, роботи та recovery-критичних сервісів.',
        'Використовуйте менеджер як основний інструмент, а не як експеримент.',
        'Правильний інструмент зменшує залежність від пам’яті та “лайфхаків”.',
      ],
    },
    {
      heading: 'Підсумок',
      paragraphs: [
        'Ручне зберігання живе довго, бо створює відчуття особистого контролю. Менеджери паролів виграють не тому, що модні, а тому, що краще масштабуються і формують сильнішу поведінку. І це важливіше за ідеологію.',
        'Якщо ваша поточна система тримається на пам’яті, варіаціях одного базового пароля, нотатках або самодисципліні, вона вже натякає, що з роками стане гіршою. Менеджер — не чарівна паличка, але для більшості користувачів це найреалістичніший шлях до кращої гігієни паролів.',
        'Тримайте ручні методи для виняткових і чітко обмежених backup-сценаріїв. Для повсякденного використання сильніший дефолт — це добре захищений менеджер паролів.',
      ],
      bullets: [
        'Обирайте систему, яка покращує поведінку в масштабі.',
        'Ручні методи доречні як backup, але рідко як основний процес.',
        'Для щоденного життя менеджер зазвичай безпечніший і стабільніший.',
      ],
    },
  ],
);

const MANAGER_RU = article(
  'Менеджер паролей или ручное хранение: что безопаснее',
  'Практическое сравнение менеджеров паролей и ручных способов хранения без крайностей и иллюзий.',
  'Менеджер паролей или ручное хранение | generatepasswordto.me',
  'Сравните менеджеры паролей с памятью, заметками, таблицами и бумажными записями, чтобы понять, какой подход действительно безопаснее в повседневной жизни.',
  ['менеджер паролей или ручное хранение', 'где хранить пароли', 'менеджер паролей', 'как безопасно хранить пароли', 'хранилище паролей'],
  [
    {
      heading: 'Настоящее сравнение — не между удобством и безопасностью',
      paragraphs: [
        'Споры о менеджерах паролей часто сводятся к простой схеме: либо удобно, либо безопасно. Но в реальной жизни вопрос устроен сложнее. Главное — помогает ли ваш способ хранения поддерживать уникальные сильные пароли для большого числа сервисов без новых слабых мест.',
        'Человек с несколькими аккаунтами ещё может какое-то время опираться на память и самодисциплину. Человек с десятками входов, рабочими системами, банком, почтой и облачными сервисами почти неизбежно начинает искать упрощения. И именно в этот момент “ручная система” обычно начинает ломаться.',
        'Поэтому лучший метод хранения — не тот, который звучит наиболее независимым в теории, а тот, который выдерживает обычный ритм жизни, когда вы устали, спешите и не хотите каждый раз заново придумывать схему входа.',
      ],
      bullets: [
        'Плохой способ хранения подталкивает к повторному использованию.',
        'Пять аккаунтов и пятьдесят аккаунтов — это разные масштабы проблемы.',
        'Хорошая система должна работать даже в неидеальный день.',
      ],
    },
    {
      heading: 'Почему ручное хранение кажется безопаснее, чем оно есть',
      paragraphs: [
        'Ручные методы бывают разными: попытка всё запомнить, бумажный блокнот, заметки в телефоне, таблицы, письма самому себе. Они живут не потому, что особенно сильны, а потому что кажутся прозрачными. Пользователю проще доверять тому, что он может увидеть и объяснить себе без отдельного инструмента.',
        'Проблема проявляется постепенно. Память ведёт к повторению и вариациям одного и того же шаблона. Заметки в открытом виде легко копируются, синхронизируются и попадают на скомпрометированное устройство. Таблицы создают ощущение порядка, но по сути собирают все секреты в формате, который никогда не проектировался как безопасное хранилище.',
        'Даже бумага не решает всё автоматически. Блокнот можно потерять, оставить рядом с устройством, сфотографировать или одолжить не тому человеку. Ручное хранение не всегда катастрофично, но оно становится хрупким заметно раньше, чем кажется.',
      ],
      bullets: [
        'Риск ручного хранения складывается из многих небольших компромиссов.',
        'Открытый текст и простая структура делают секреты уязвимыми.',
        'Физический носитель убирает часть цифровых рисков, но приносит свои.',
      ],
    },
    {
      heading: 'Что менеджер паролей делает лучше человека',
      paragraphs: [
        'Главный плюс менеджера паролей — не красивые слова про шифрование, а то, что он снимает с пользователя задачу помнить и придумывать всё вручную. Как только уникальные длинные пароли становятся нормой, а не усилием, уровень вашей парольной гигиены резко растёт.',
        'Хороший менеджер помогает не только хранить, но и поддерживать порядок: генерирует новые значения, упрощает автозаполнение, снижает спешку при входе, помогает находить слабые или повторяющиеся записи. То есть это не просто сейф, а система, которая делает более безопасное поведение удобным.',
        'Конечно, менеджер не магия. Он концентрирует ценность, а значит мастер-пароль, 2FA, настройки восстановления и безопасность устройств становятся особенно важными. Но для большинства пользователей именно такой подход заметно уменьшает вероятность плохих ежедневных решений.',
      ],
      bullets: [
        'Менеджер делает сильные уникальные пароли реальным стандартом.',
        'Его ценность — в устойчивом поведении, а не только в хранении.',
        'В этой модели особенно важно хорошо защитить мастер-пароль.',
      ],
    },
    {
      heading: 'Где ручной подход всё же может быть оправдан',
      paragraphs: [
        'Существуют ограниченные сценарии, где ручное хранение не выглядит бессмысленным. Некоторые люди держат один-два критических recovery-secrets офлайн в физически защищённом месте. Команды иногда имеют аварийные break-glass credentials под жёстким контролем доступа. Пользователь с очень небольшим числом аккаунтов может использовать бумажный backup как запасной вариант.',
        'Но важен именно контекст ограничения. Ручной подход более-менее приемлем там, где секретов немного, сценарий чётко контролируется, а сама запись не становится повседневным способом работы со всеми входами.',
        'Проблемы начинаются тогда, когда специальный случай превращается в основной процесс. Если ручная схема должна обслуживать всю вашу цифровую жизнь, она почти наверняка начнёт проигрывать по мере роста нагрузки.',
      ],
      bullets: [
        'Офлайн-хранение может быть разумным для ограниченного числа критичных секретов.',
        'Резервное хранение — не то же самое, что повседневный рабочий процесс.',
        'Если метод не масштабируется, он слаб как базовый стандарт.',
      ],
    },
    {
      heading: 'Практическая рекомендация для большинства людей',
      paragraphs: [
        'Для большинства пользователей сильный базовый вариант выглядит так: менеджер паролей, хороший мастер-пароль, включённая двухфакторная аутентификация и продуманный сценарий восстановления. Это не идеальный мир, но такая система гораздо устойчивее памяти, заметок в открытом виде или самодельных схем.',
        'Если переход кажется сложным, не нужно мигрировать всё сразу. Начните с почты, финансов, облака, рабочих инструментов и сервисов, через которые можно восстановить остальные аккаунты. Потом постепенно заменяйте старые пароли на новые уникальные, когда будете встречаться с этими входами в обычной жизни.',
        'Главный выигрыш не в том, что менеджер звучит “профессионально”. Главный выигрыш в том, что вы перестаёте постоянно импровизировать.',
      ],
      bullets: [
        'Начинайте перенос с почты, денег, работы и recovery-критичных сервисов.',
        'Используйте менеджер как основную систему, а не как запасную игрушку.',
        'Хороший инструмент снижает зависимость от памяти и самодельных лайфхаков.',
      ],
    },
    {
      heading: 'Итог',
      paragraphs: [
        'Ручное хранение долго живёт, потому что создаёт ощущение личного контроля. Менеджеры паролей выигрывают потому, что лучше масштабируются и формируют более сильные привычки. Для повседневной безопасности это важнее, чем ощущение независимости.',
        'Если ваша текущая схема держится на памяти, вариациях одного корня, заметках или надежде на собственную организованность, она уже показывает свои пределы. Менеджер паролей не отменяет необходимости думать о безопасности, но делает хорошее поведение гораздо реалистичнее.',
        'Оставляйте ручные методы для исключений и строго ограниченных backup-сценариев. Во всех остальных случаях менеджер обычно является более сильным и устойчивым выбором.',
      ],
      bullets: [
        'Выбирайте систему, которая улучшает поведение в масштабе.',
        'Ручные методы хороши как исключение, а не как основной стандарт.',
        'Для ежедневного использования менеджер чаще всего безопаснее и стабильнее.',
      ],
    },
  ],
);

const PASSPHRASE_EN = article(
  'Passphrase vs Password: Entropy Explained Without Math Theater',
  'A practical guide to understanding passphrases, passwords, and entropy without turning security advice into abstract jargon.',
  'Passphrase vs Password: Entropy Explained | generatepasswordto.me',
  'Learn when a passphrase is stronger than a traditional password, how entropy works in real life, and why predictability matters more than visual complexity.',
  ['passphrase vs password', 'password entropy explained', 'passphrase entropy', 'strong passphrase', 'password randomness'],
  [
    {
      heading: 'Entropy is useful, but only if you translate it into real choices',
      paragraphs: [
        'Entropy is one of those security terms that gets repeated so often it starts to sound mystical. In plain language, entropy is just a way to talk about unpredictability. The more possible valid combinations an attacker has to consider, the higher the entropy and the harder the secret is to guess.',
        'The mistake is treating entropy like a math badge you earn by making a password look complicated. Entropy is not about visual chaos. It is about how many realistic guesses an attacker would need once human habits, common patterns, and leaked password behavior are taken into account.',
        'That is why a password can look noisy and still be weak, while a carefully constructed passphrase can look simple and still be strong. The deciding factor is not aesthetics. It is guessability.',
      ],
      bullets: [
        'Entropy measures unpredictability, not decoration.',
        'A messy-looking password can still be highly predictable.',
        'Human habits matter because attackers model them directly.',
      ],
    },
    {
      heading: 'Why passphrases often beat short complex passwords',
      paragraphs: [
        'A traditional password usually tries to compress complexity into a small space: symbols, numbers, mixed case, maybe a forced pattern. A passphrase works differently. It creates strength through length and less predictable structure. This is why a solid passphrase often gives better practical security than a short “complex” password that follows familiar human habits.',
        'The key phrase there is solid passphrase. A famous movie quote, song lyric, or motivational line is not a good passphrase. It may be long, but it is also culturally predictable. A strong passphrase needs enough randomness that it is not an obvious thought for another person or for a dictionary attack tuned to popular phrases.',
        'In practice, this means passphrases are strongest when they combine unusual word choices, personal logic that is not publicly visible, or random words arranged in a memorable but non-obvious way.',
      ],
      bullets: [
        'Length gives passphrases a major advantage.',
        'A famous quote is not a strong passphrase.',
        'Memorable is good; predictable is not.',
      ],
    },
    {
      heading: 'Where people misunderstand entropy the most',
      paragraphs: [
        'A common misunderstanding is thinking entropy comes from substituting characters in a familiar word. Turning “password” into “P@ssw0rd!” may increase visual complexity, but the structure is so common that cracking tools already expect it. The increase in effective unpredictability is much smaller than users imagine.',
        'Another misconception is believing that any long phrase is automatically secure. If the phrase is built from common words in a common order, or if it reflects something obvious about your life, the search space is not as large as it appears. Attackers do not start from pure brute force if they can use dictionaries, pattern rules, and contextual guesses first.',
        'Entropy becomes useful only when it changes behavior. That means choosing secrets that are less guessable in practice, not merely more elaborate in appearance.',
      ],
      bullets: [
        'Character substitutions rarely add as much protection as users think.',
        'Long does not automatically mean unpredictable.',
        'Attackers combine brute force with dictionaries and pattern rules.',
      ],
    },
    {
      heading: 'How to choose between a passphrase and a generated password',
      paragraphs: [
        'The answer depends on whether you need to remember the secret yourself. If the password will live in a password manager, a long random generated password is usually the best option. Memory is no longer part of the equation, so you can maximize randomness without caring whether it is pleasant to type.',
        'If you need to remember the secret directly, a strong passphrase is often the more realistic choice. It can be long enough to offer solid resistance while still being easier to retain than a random 20-character string. That matters because a password that users cannot manage often leads to insecure workarounds.',
        'So the choice is not ideological. Use generated randomness when storage makes that practical. Use a strong passphrase when memorability is genuinely required. The mistake is choosing the harder-to-maintain option and then compensating with bad habits.',
      ],
      bullets: [
        'Use random generated passwords when you do not need memory.',
        'Use strong passphrases when memorability truly matters.',
        'Choose the format that supports secure behavior, not just abstract strength.',
      ],
    },
    {
      heading: 'The practical takeaway',
      paragraphs: [
        'You do not need to become a mathematician to use entropy well. You only need to stop confusing appearance with unpredictability. Strong secrets are hard to guess because they resist the patterns attackers expect, not because they look dramatic to the human eye.',
        'Passphrases and passwords are both useful tools. A passphrase is often the better human-memory solution. A generated password is often the better stored-secret solution. The right choice depends on context, but the principle stays the same: reduce predictability first.',
        'If your current method depends on familiar roots, cosmetic substitutions, or culturally obvious phrases, entropy is not really working for you yet. Once your choices become less guessable in the real world, the theory starts helping.',
      ],
      bullets: [
        'Think in terms of guessability, not decoration.',
        'Use passphrases for memory, generated passwords for storage.',
        'Entropy matters only when it improves real-world unpredictability.',
      ],
    },
  ],
);

const PASSPHRASE_UA = article(
  'Парольна фраза чи пароль: як зрозуміти ентропію без зайвої математики',
  'Практичний матеріал про парольні фрази, звичайні паролі та ентропію без псевдонаукової подачі.',
  'Парольна фраза чи пароль: що означає ентропія | generatepasswordto.me',
  'Дізнайтеся, коли парольна фраза сильніша за звичайний пароль, як працює ентропія в реальному житті та чому передбачуваність важливіша за зовнішню складність.',
  ['парольна фраза чи пароль', 'ентропія пароля', 'парольна фраза', 'як створити сильну парольну фразу', 'передбачуваність пароля'],
  [
    {
      heading: 'Ентропія корисна лише тоді, коли її можна перевести в реальні рішення',
      paragraphs: [
        'Ентропія — один із тих термінів, які часто повторюють так довго, що він починає звучати майже магічно. Насправді в практичному сенсі йдеться просто про непередбачуваність. Чим більше реальних варіантів має перебрати зловмисник, тим вища ентропія і тим складніше вгадати секрет.',
        'Проблема починається тоді, коли ентропію сприймають як математичний бейджик, який видають за зовнішню “складність”. Ентропія не про те, наскільки драматично виглядає пароль. Вона про те, наскільки важко його передбачити з урахуванням людських патернів, популярних словників і типових витоків.',
        'Саме тому шумний на вигляд пароль може бути слабким, а добре продумана парольна фраза — сильною. Вирішує не картинка, а вгадуваність.',
      ],
      bullets: [
        'Ентропія вимірює непередбачуваність, а не декор.',
        'Пароль, який виглядає хаотично, не обов’язково сильний.',
        'Атакувальники враховують людські звички напряму.',
      ],
    },
    {
      heading: 'Чому парольні фрази часто виграють у коротких “складних” паролів',
      paragraphs: [
        'Класичний пароль зазвичай намагається вмістити складність у короткий обсяг: цифри, символи, регістри, іноді ще й штучний шаблон. Парольна фраза працює інакше — вона набирає силу за рахунок довжини та менш очевидної структури. Саме тому хороша парольна фраза часто дає кращу практичну безпеку, ніж короткий пароль, який лише формально виконує старі вимоги.',
        'Але ключове слово тут — хороша. Відома цитата, рядок пісні або банальна фраза — не сильна парольна фраза. Так, вона довша, але водночас культурно передбачувана. Сильна фраза повинна мати достатньо випадковості, щоб не бути очевидною ні для людини, ні для словникової атаки.',
        'На практиці це означає, що найкраще працюють незвичні слова, неочевидні комбінації та власна логіка, яку неможливо витягти з ваших публічних даних або типових шаблонів.',
      ],
      bullets: [
        'Довжина дає парольній фразі сильну перевагу.',
        'Популярна цитата — поганий варіант для безпеки.',
        'Запам’ятовуваність корисна, передбачуваність — шкідлива.',
      ],
    },
    {
      heading: 'Де ентропію найчастіше розуміють неправильно',
      paragraphs: [
        'Одна з найтиповіших помилок — думати, що ентропія з’являється автоматично, якщо замінити кілька букв цифрами чи символами. Варіант на кшталт “P@ssw0rd!” виглядає складніше, але його структура настільки типова, що сучасні cracking-інструменти враховують такі заміни з коробки. Реальний приріст непередбачуваності там значно менший, ніж здається.',
        'Інша помилка — вважати, що будь-яка довга фраза автоматично безпечна. Якщо це поширені слова у звичному порядку або щось, що легко пов’язати з вами, простір пошуку не такий уже й великий. Зловмисник не починає з “чистого” brute force, якщо може використати словники, патерни й контекст.',
        'Ентропія приносить користь лише тоді, коли реально змінює вибір користувача. Тобто коли ви створюєте менш вгадуваний секрет, а не просто красивішу імітацію складності.',
      ],
      bullets: [
        'Заміна букв на символи часто переоцінюється.',
        'Довжина без непередбачуваності не гарантує сили.',
        'Атакувальники поєднують перебір, словники та контекстні здогадки.',
      ],
    },
    {
      heading: 'Коли обирати парольну фразу, а коли — згенерований пароль',
      paragraphs: [
        'Все залежить від того, чи потрібно вам пам’ятати секрет самостійно. Якщо пароль зберігатиметься в менеджері паролів, довгий випадковий згенерований пароль зазвичай буде найкращим рішенням. Пам’ять тут не бере участі, тож можна максимізувати випадковість без турботи про зручність запам’ятовування.',
        'Якщо ж секрет треба утримувати в голові, сильна парольна фраза часто виглядає реалістичнішим варіантом. Вона може бути достатньо довгою для хорошого рівня захисту і водночас простішою для людини, ніж випадковий набір із двадцяти символів. Це важливо, бо незручний пароль часто закінчується небезпечними обхідними звичками.',
        'Отже, вибір тут не ідеологічний. Згенерований пароль — коли секрет можна безпечно зберігати. Сильна парольна фраза — коли її справді треба запам’ятати. Помилка — обрати найважчий для підтримки варіант і потім компенсувати це слабкими звичками.',
      ],
      bullets: [
        'Для зберігання краще підходять випадкові згенеровані паролі.',
        'Для запам’ятовування часто кращі сильні парольні фрази.',
        'Обирайте формат, який підтримує безпечну поведінку, а не лише абстрактну силу.',
      ],
    },
    {
      heading: 'Практичний висновок',
      paragraphs: [
        'Щоб правильно користуватися поняттям ентропії, не треба ставати математиком. Достатньо перестати плутати зовнішню складність із реальною непередбачуваністю. Сильний секрет складно вгадати не тому, що він виглядає драматично, а тому, що він не вкладається в очікувані патерни.',
        'І пароль, і парольна фраза можуть бути хорошими інструментами. Парольна фраза часто краща для людської пам’яті. Згенерований пароль — для зберігання в менеджері. Контекст визначає формат, але принцип той самий: спочатку зменшуйте передбачуваність.',
        'Якщо ваша поточна схема тримається на знайомих словах, косметичних замінах або очевидних фразах, то ентропія поки що працює не на вас. Вона починає приносити користь лише тоді, коли вибір стає менш вгадуваним у реальному світі.',
      ],
      bullets: [
        'Думайте про вгадуваність, а не про декор.',
        'Використовуйте фрази для пам’яті, згенеровані паролі — для зберігання.',
        'Ентропія має сенс лише тоді, коли покращує реальну непередбачуваність.',
      ],
    },
  ],
);

const PASSPHRASE_RU = article(
  'Парольная фраза или пароль: как понять энтропию без лишней математики',
  'Практичный материал о парольных фразах, обычных паролях и энтропии без псевдонаучной подачи.',
  'Парольная фраза или пароль: что означает энтропия | generatepasswordto.me',
  'Узнайте, когда парольная фраза сильнее обычного пароля, как работает энтропия в реальной жизни и почему предсказуемость важнее внешней сложности.',
  ['парольная фраза или пароль', 'энтропия пароля', 'парольная фраза', 'сильная парольная фраза', 'предсказуемость пароля'],
  [
    {
      heading: 'Энтропия полезна только тогда, когда её можно перевести в реальные решения',
      paragraphs: [
        'Энтропия — одно из тех слов в безопасности, которые часто звучат так, будто речь идёт о сложной магии. На практике всё проще: это способ говорить о непредсказуемости. Чем больше реальных вариантов нужно перебрать атакующему, тем выше энтропия и тем сложнее угадать секрет.',
        'Проблема начинается тогда, когда энтропию понимают как награду за внешний хаос. Энтропия не про то, насколько “страшно” выглядит пароль. Она про то, насколько трудно его предсказать с учётом человеческих привычек, словарей, утечек и типичных шаблонов.',
        'Поэтому пароль может выглядеть очень шумным и всё равно быть слабым, а хорошо построенная парольная фраза — наоборот, выглядеть проще и при этом быть сильной. Важен не внешний вид, а угадываемость.',
      ],
      bullets: [
        'Энтропия измеряет непредсказуемость, а не декорацию.',
        'Сложный на вид пароль не обязательно силён.',
        'Атакующие учитывают человеческие шаблоны напрямую.',
      ],
    },
    {
      heading: 'Почему парольные фразы часто лучше коротких сложных паролей',
      paragraphs: [
        'Обычный пароль пытается уместить сложность в маленьком объёме: символы, цифры, регистры, иногда искусственную структуру. Парольная фраза работает по-другому. Она набирает силу за счёт длины и менее очевидного построения. Поэтому хорошая фраза часто даёт лучшую практическую стойкость, чем короткий пароль, который просто формально соответствует требованиям.',
        'Но это верно только для хорошей парольной фразы. Известная цитата, строка песни или популярное выражение — плохой вариант. Она может быть длинной, но остаётся культурно предсказуемой. Сильная фраза должна содержать достаточно случайности, чтобы не быть очевидной ни для человека, ни для словарной атаки.',
        'На практике лучше всего работают необычные слова, нетривиальные сочетания и личная логика, которая не считывается из ваших публичных данных и не совпадает с типовым человеческим шаблоном.',
      ],
      bullets: [
        'Длина даёт парольной фразе большое преимущество.',
        'Популярная цитата не делает фразу сильной.',
        'Запоминаемость полезна, предсказуемость опасна.',
      ],
    },
    {
      heading: 'Где энтропию чаще всего понимают неправильно',
      paragraphs: [
        'Одна из самых популярных ошибок — считать, что энтропия автоматически появляется, если заменить несколько букв цифрами или символами. Вариант вроде “P@ssw0rd!” выглядит сложнее, но его структура настолько типична, что современные инструменты взлома давно учитывают такие замены. Реальный прирост непредсказуемости там намного меньше, чем кажется.',
        'Другая ошибка — думать, что любая длинная фраза автоматически сильная. Если это набор распространённых слов в обычном порядке или выражение, связанное с вами, пространство угадывания уже не так велико. Атакующий не начинает с чистого brute force, если может использовать словарь, паттерны и контекстные догадки.',
        'Энтропия полезна только тогда, когда меняет реальные решения. То есть когда вы создаёте менее угадываемый секрет, а не более театральную картинку.',
      ],
      bullets: [
        'Замены букв символами часто переоценены.',
        'Длинная фраза без непредсказуемости не гарантирует силу.',
        'В реальности атаки сочетают перебор, словари и правила.',
      ],
    },
    {
      heading: 'Когда выбирать парольную фразу, а когда — сгенерированный пароль',
      paragraphs: [
        'Всё зависит от того, нужно ли вам помнить секрет самостоятельно. Если пароль хранится в менеджере, длинный случайный сгенерированный вариант обычно лучше всего. Память тут не участвует, а значит можно максимизировать случайность без оглядки на удобство.',
        'Если же пароль нужно удерживать в голове, сильная парольная фраза часто оказывается более реалистичным решением. Она может быть достаточно длинной для хорошей стойкости и при этом проще для пользователя, чем случайная строка из двадцати символов. Это важно, потому что неудобные секреты часто приводят к небезопасным обходным привычкам.',
        'Поэтому выбор не идеологический. Генерируемая случайность лучше, когда есть надёжное хранение. Сильная фраза лучше, когда важна запоминаемость. Ошибка — выбирать формат, который слишком трудно поддерживать, а потом компенсировать это плохими привычками.',
      ],
      bullets: [
        'Для хранения лучше подходят случайные сгенерированные пароли.',
        'Для памяти часто лучше подходят сильные парольные фразы.',
        'Выбирайте формат, который помогает безопасному поведению.',
      ],
    },
    {
      heading: 'Практический вывод',
      paragraphs: [
        'Чтобы правильно использовать идею энтропии, не нужно превращать безопасность в лекцию по математике. Достаточно перестать путать внешний вид с реальной непредсказуемостью. Сильный секрет сложно угадать не потому, что он выглядит драматично, а потому, что он не совпадает с ожидаемыми паттернами.',
        'Пароль и парольная фраза — оба полезные инструменты. Фраза часто лучше работает для человеческой памяти. Сгенерированный пароль обычно лучше работает в менеджере. Контекст меняет формат, но принцип остаётся тем же: сначала убирайте предсказуемость.',
        'Если ваша текущая схема держится на знакомых словах, косметических заменах и очевидных фразах, энтропия пока работает не на вас. Она начинает помогать только тогда, когда секрет становится труднее угадать в реальном мире.',
      ],
      bullets: [
        'Думайте об угадываемости, а не об эффектности.',
        'Используйте фразы для памяти, случайные пароли — для хранения.',
        'Энтропия имеет смысл только тогда, когда повышает реальную непредсказуемость.',
      ],
    },
  ],
);

const TWO_FACTOR_EN = article(
  'Two-Factor Authentication Basics',
  'A practical introduction to 2FA: what it protects, where it fails, and how to choose stronger second factors without making recovery worse.',
  'Two-Factor Authentication Basics | generatepasswordto.me',
  'Learn how two-factor authentication works, why it matters after password reuse and phishing, and which 2FA methods make the most sense for important accounts.',
  ['two-factor authentication basics', '2fa setup guide', 'mfa security guide', 'best 2fa method', 'how 2fa works'],
  [
    {
      heading: '2FA is not about perfection, it is about raising the cost of takeover',
      paragraphs: [
        'Two-factor authentication is often described in a way that sounds absolute: turn it on and your account is safe. That is too simplistic. The real value of 2FA is that it forces an attacker to break more than one thing. If a password leaks, gets guessed, or is phished, the second factor can still interrupt the takeover.',
        'This matters because password problems rarely happen in isolation. Reuse, breach exposure, malware, and phishing all make passwords fragile in different ways. 2FA does not solve every one of those problems, but it changes the economics of the attack. Suddenly a stolen password is not enough on its own.',
        'That is why even basic 2FA often gives a meaningful security upgrade. It does not make you untouchable. It makes low-effort compromise much less likely.',
      ],
      bullets: [
        '2FA adds friction for attackers, not just for users.',
        'It is especially valuable when passwords are reused or phished.',
        'The goal is layered protection, not a fantasy of total immunity.',
      ],
    },
    {
      heading: 'Not all second factors are equally strong',
      paragraphs: [
        'The phrase “use 2FA” hides an important detail: the quality of the second factor matters. SMS codes are widespread and better than having nothing, but they are not the strongest choice for high-value accounts. Authenticator apps remove some telecom-related risks and are usually a better default. Hardware security keys go further and offer the strongest option for especially sensitive access.',
        'The right choice depends on the account and on your ability to maintain the method properly. For email, work access, cloud admin roles, password managers, and financial services, stronger second factors deserve real attention. For lower-risk accounts, the practical priority may simply be to enable something reliable rather than chase the perfect setup and do nothing.',
        'A common mistake is thinking the method with the most complexity is always the right answer. The stronger method is the one you will configure correctly, use consistently, and recover from safely if a device is lost.',
      ],
      bullets: [
        'SMS is helpful, but not ideal for the most sensitive accounts.',
        'Authenticator apps are usually the best balance for most users.',
        'Hardware keys are strongest where the account value justifies them.',
      ],
    },
    {
      heading: 'Recovery is part of 2FA, not an afterthought',
      paragraphs: [
        'A lot of users set up two-factor authentication and stop thinking at the exact moment when they should look at recovery. That is risky. If you lose your phone, reset your device, or change numbers, a weak recovery process can either lock you out or quietly reopen the account to an attacker.',
        'Good 2FA setup includes backup codes, updated recovery contacts, and a clear idea of what you would do if your main device disappeared today. If your recovery email is weak, if your phone number is outdated, or if your backup codes are saved casually in the same compromised device, the setup is more fragile than it looks.',
        'The second factor should make takeover harder without making recovery reckless. That balance matters as much as the login flow itself.',
      ],
      bullets: [
        'Store backup codes intentionally, not casually.',
        'Review recovery email addresses and phone numbers after enabling 2FA.',
        'Test whether your recovery plan is realistic before you need it.',
      ],
    },
    {
      heading: 'Where 2FA matters most',
      paragraphs: [
        'Not every account carries equal weight. If you only enable 2FA in a few places, choose the accounts that can unlock everything else or cause the biggest damage. Your primary email account belongs at the top of the list, because it is often the recovery hub for dozens of other services.',
        'After that, focus on password managers, banking apps, cloud storage, workplace tools, communication platforms, and major social accounts. These services either protect important data, hold financial value, or can be abused for further compromise.',
        'Once the high-impact accounts are covered, you can expand more broadly. But if you want a strong start, do not spread your effort evenly. Protect the accounts with the highest blast radius first.',
      ],
      bullets: [
        'Email should be one of the first accounts with 2FA enabled.',
        'Password managers and work accounts deserve stronger methods.',
        'Prioritize by recovery power and damage potential.',
      ],
    },
    {
      heading: 'The practical takeaway',
      paragraphs: [
        'Two-factor authentication is not a replacement for strong passwords. It is what turns strong passwords into a more resilient account security system. That distinction matters, because many compromises begin with a password but succeed because there is no second barrier.',
        'For most people, the most realistic high-value improvement is simple: use unique passwords, store them in a manager, enable 2FA on high-impact accounts, and set up recovery carefully. You do not need the most exotic configuration to be much safer than you are today.',
        'If your current setup has no second factor on email, finance, work, or password-management accounts, that gap is worth closing soon. In real incidents, 2FA often decides whether a stolen password becomes an inconvenience or a full takeover.',
      ],
      bullets: [
        '2FA works best when combined with strong unique passwords.',
        'Start with the accounts that matter most instead of trying to perfect everything at once.',
        'A realistic, well-maintained setup beats an ideal setup you never finish.',
      ],
    },
  ],
);

const TWO_FACTOR_UA = article(
  'Основи двофакторної автентифікації',
  'Практичний вступ до 2FA: що саме вона захищає, де може підвести і як обрати сильніший другий фактор без поганого recovery-сценарію.',
  'Основи двофакторної автентифікації | generatepasswordto.me',
  'Дізнайтеся, як працює двофакторна автентифікація, чому вона критична після витоків і фішингу та який метод 2FA розумно обрати для важливих акаунтів.',
  ['основи двофакторної автентифікації', '2fa що це', 'як працює 2fa', 'mfa безпека', 'найкращий метод 2fa'],
  [
    {
      heading: '2FA не про ідеальну безпеку, а про вищу ціну захоплення акаунта',
      paragraphs: [
        'Про двофакторну автентифікацію часто говорять так, ніби її достатньо просто “увімкнути”, і питання безпеки вирішене. Це занадто спрощено. Реальна цінність 2FA у тому, що вона змушує зловмисника зламати не один бар’єр, а щонайменше два. Якщо пароль витік, був вгаданий або викрадений через фішинг, другий фактор усе ще може зупинити захоплення.',
        'Це особливо важливо, тому що проблеми з паролями рідко бувають ізольованими. Повторне використання, витоки, інфостілери й фішинг роблять пароль крихким у різний спосіб. 2FA не лікує все одразу, але серйозно змінює умови атаки. Вкраденого пароля стає недостатньо.',
        'Саме тому навіть базова 2FA часто дає реальне посилення захисту. Вона не робить акаунт “невразливим”, але сильно зменшує шанси дешевого та швидкого захоплення.',
      ],
      bullets: [
        '2FA додає складність для зловмисника, а не лише крок для користувача.',
        'Вона особливо корисна, коли пароль могли вкрасти або перевикористати.',
        'Мета — багатошаровий захист, а не ілюзія абсолютної безпеки.',
      ],
    },
    {
      heading: 'Не всі другі фактори однаково сильні',
      paragraphs: [
        'Фраза “увімкніть 2FA” приховує важливу деталь: якість другого фактора має значення. SMS-коди поширені й точно кращі, ніж повна відсутність другого шару, але для акаунтів високої цінності це не найсильніший варіант. Застосунки-аутентифікатори знімають частину телеком-ризиків і часто дають кращий баланс. Апаратні security keys ідуть ще далі.',
        'Правильний вибір залежить від типу акаунта й від того, чи зможете ви підтримувати цей метод без хаосу. Для пошти, робочого доступу, адміністративних ролей, менеджерів паролів і фінансових сервісів сильніші фактори заслуговують окремої уваги. Для менш критичних акаунтів іноді важливіше просто увімкнути надійний базовий варіант, ніж гнатися за “ідеалом” і нічого не зробити.',
        'Типова помилка — думати, що найскладніший варіант автоматично найкращий. Насправді сильніший той метод, який ви правильно налаштуєте, стабільно використовуватимете й безпечно відновите у разі втрати пристрою.',
      ],
      bullets: [
        'SMS краще, ніж нічого, але не завжди достатньо для найважливіших акаунтів.',
        'Authenticator app — часто найкращий баланс для більшості людей.',
        'Security keys особливо доречні там, де вартість акаунта дуже висока.',
      ],
    },
    {
      heading: 'Recovery — це частина 2FA, а не дрібниця після налаштування',
      paragraphs: [
        'Багато користувачів увімкнули 2FA й на цьому зупинилися. Це ризиковано. Якщо ви втратите телефон, скинете пристрій або зміните номер, слабкий recovery path може або заблокувати вас самих, або непомітно відкрити зловмиснику іншу точку входу.',
        'Якісне налаштування 2FA включає резервні коди, актуальні recovery contacts і чітке розуміння того, що ви робитимете, якщо основний пристрій зникне вже сьогодні. Якщо резервна пошта слабка, номер застарілий, а backup codes лежать на тому самому компрометованому пристрої, система виглядає сильнішою, ніж є.',
        'Другий фактор має ускладнювати захоплення акаунта, але не перетворювати відновлення на хаос. І цей баланс важливий не менше, ніж сам спосіб входу.',
      ],
      bullets: [
        'Зберігайте backup codes свідомо, а не “десь у нотатках”.',
        'Після ввімкнення 2FA перевірте recovery email і номер телефону.',
        'План відновлення має бути реалістичним до того, як він знадобиться.',
      ],
    },
    {
      heading: 'Де 2FA потрібна насамперед',
      paragraphs: [
        'Не всі акаунти однаково важливі. Якщо ви можете увімкнути 2FA лише в кількох місцях, почніть із тих, які відкривають шлях до решти або створюють найбільший потенційний збиток. Пошта майже завжди вгорі списку, бо саме через неї відновлюється доступ до десятків сервісів.',
        'Далі — менеджери паролів, банкінг, хмарні сховища, робочі системи, месенджери та ключові соцмережі. Вони або містять важливі дані, або можуть стати плацдармом для подальших атак.',
        'Коли базовий перелік закритий, можна рухатися ширше. Але якщо потрібен сильний старт, не розмазуйте зусилля рівномірно. Спочатку захищайте акаунти з найбільшим blast radius.',
      ],
      bullets: [
        'Email має бути серед перших акаунтів із 2FA.',
        'Менеджери паролів і робочі системи вимагають особливої уваги.',
        'Пріоритезуйте не кількість, а потенційну шкоду.',
      ],
    },
    {
      heading: 'Практичний висновок',
      paragraphs: [
        'Двофакторна автентифікація не замінює сильні паролі. Вона робить систему доступу значно стійкішою. І це критично, бо багато компрометацій починаються саме з пароля, але стають справжнім інцидентом лише тому, що другого бар’єра не було.',
        'Для більшості людей найреалістичніше й найкорисніше покращення виглядає просто: унікальні паролі, менеджер паролів, 2FA на важливих акаунтах і продуманий recovery-сценарій. Не потрібна екзотична схема, щоб стати значно безпечнішими, ніж зараз.',
        'Якщо у вас досі немає другого фактора на пошті, фінансах, роботі або менеджері паролів, це одна з тих прогалин, які варто закривати найближчим часом. У реальних інцидентах саме 2FA часто вирішує, чи залишиться витік пароля просто неприємністю, чи перетвориться на повний takeover.',
      ],
      bullets: [
        '2FA найкраще працює разом із сильними унікальними паролями.',
        'Починайте з найважливіших акаунтів, а не з ідеального плану “на все одразу”.',
        'Реалістично налаштована система краща за ідеальну, яку ви так і не завершили.',
      ],
    },
  ],
);

const TWO_FACTOR_RU = article(
  'Основы двухфакторной аутентификации',
  'Практичное введение в 2FA: что именно она защищает, где может подвести и как выбрать более сильный второй фактор без плохого сценария восстановления.',
  'Основы двухфакторной аутентификации | generatepasswordto.me',
  'Узнайте, как работает двухфакторная аутентификация, почему она критична после утечек и фишинга и какой метод 2FA разумно выбрать для важных аккаунтов.',
  ['основы двухфакторной аутентификации', '2fa что это', 'как работает 2fa', 'mfa безопасность', 'лучший метод 2fa'],
  [
    {
      heading: '2FA — это не про идеальную защиту, а про более дорогой захват аккаунта',
      paragraphs: [
        'О двухфакторной аутентификации часто говорят так, будто достаточно просто включить её, и вопрос безопасности закрыт. Это слишком упрощённый взгляд. Реальная ценность 2FA в том, что злоумышленнику приходится преодолевать не один барьер, а как минимум два. Если пароль утёк, был угадан или украден через фишинг, второй фактор всё ещё может остановить захват.',
        'Это особенно важно потому, что проблемы с паролями редко бывают одиночными. Повторное использование, утечки, инфостилеры и фишинг делают пароль хрупким по-разному. 2FA не решает все эти проблемы сразу, но резко меняет условия атаки. Одного украденного пароля становится недостаточно.',
        'Поэтому даже базовая двухфакторная защита часто даёт реальный рост безопасности. Она не делает аккаунт неуязвимым, но сильно снижает вероятность дешёвого и быстрого компромисса.',
      ],
      bullets: [
        '2FA усложняет задачу атакующему, а не только пользователю.',
        'Она особенно полезна после утечек, фишинга и повторного использования паролей.',
        'Цель — многослойная защита, а не иллюзия абсолютной безопасности.',
      ],
    },
    {
      heading: 'Не все вторые факторы одинаково сильны',
      paragraphs: [
        'Фраза “включите 2FA” скрывает важную деталь: качество второго фактора имеет значение. SMS-коды широко распространены и лучше, чем полное отсутствие защиты, но для действительно важных аккаунтов это не самый сильный вариант. Приложения-аутентификаторы снимают часть телеком-рисков и обычно дают более разумный баланс. Аппаратные security keys идут ещё дальше.',
        'Правильный выбор зависит от аккаунта и от того, сможете ли вы поддерживать выбранный метод без хаоса. Для почты, рабочих систем, админ-доступа, менеджеров паролей и финансовых сервисов более сильные факторы заслуживают отдельного внимания. Для менее критичных аккаунтов иногда важнее просто включить надёжный базовый вариант, чем бесконечно искать идеал и не сделать ничего.',
        'Распространённая ошибка — думать, что самый сложный вариант автоматически самый правильный. На практике сильнее тот метод, который вы грамотно настроите, стабильно используете и безопасно восстановите при потере устройства.',
      ],
      bullets: [
        'SMS помогает, но не всегда достаточно хорош для самых ценных аккаунтов.',
        'Authenticator app часто даёт лучший баланс для большинства людей.',
        'Security keys особенно уместны там, где цена компрометации очень высока.',
      ],
    },
    {
      heading: 'Восстановление — это часть 2FA, а не мелочь после настройки',
      paragraphs: [
        'Многие включают двухфакторную аутентификацию и на этом перестают думать о сценарии доступа. Это опасно. Если вы потеряете телефон, смените номер или сбросите устройство, слабый recovery-процесс либо закроет доступ вам самим, либо неожиданно откроет новую дыру для атакующего.',
        'Хорошая настройка 2FA включает backup codes, актуальные контакты восстановления и внятный план действий на случай, если основной девайс исчезнет уже сегодня. Если резервная почта слаба, номер давно неактуален, а коды лежат на том же устройстве, которое может быть скомпрометировано, вся схема оказывается хрупкой.',
        'Второй фактор должен усложнять захват аккаунта, не превращая восстановление в аварию. Этот баланс не менее важен, чем сам способ входа.',
      ],
      bullets: [
        'Храните backup codes осознанно, а не случайно.',
        'После включения 2FA проверьте recovery email и телефон.',
        'План восстановления нужно продумать заранее, а не во время инцидента.',
      ],
    },
    {
      heading: 'Где 2FA важнее всего',
      paragraphs: [
        'Не все аккаунты одинаково важны. Если вы можете включить 2FA лишь в нескольких местах, начните с тех сервисов, которые открывают дорогу ко всем остальным или создают наибольший потенциальный ущерб. Почта почти всегда должна быть вверху списка, потому что именно через неё восстанавливается доступ к остальной цифровой жизни.',
        'Дальше идут менеджеры паролей, банки, облачные хранилища, рабочие инструменты, коммуникационные платформы и ключевые соцсети. Эти сервисы либо содержат важные данные, либо могут стать точкой для дальнейшего захвата.',
        'Когда критический минимум закрыт, можно расширять охват. Но если нужен сильный старт, не размазывайте усилия равномерно. Сначала закрывайте то, что даёт наибольший blast radius.',
      ],
      bullets: [
        'Почта должна быть одной из первых точек для включения 2FA.',
        'Менеджеры паролей и рабочие аккаунты заслуживают особого внимания.',
        'Приоритет нужно строить по последствиям компрометации.',
      ],
    },
    {
      heading: 'Практический вывод',
      paragraphs: [
        'Двухфакторная аутентификация не заменяет сильные пароли. Она превращает сильные пароли в более устойчивую систему защиты аккаунта. Это критично, потому что многие компрометации начинаются с пароля, но становятся серьёзным инцидентом только потому, что второго барьера не было.',
        'Для большинства людей самый полезный и реалистичный набор действий прост: уникальные пароли, менеджер паролей, 2FA на важных аккаунтах и продуманный recovery-сценарий. Не нужен экзотический сетап, чтобы стать заметно безопаснее.',
        'Если у вас до сих пор нет второго фактора на почте, финансах, рабочих аккаунтах или менеджере паролей, это одна из тех дыр, которые лучше закрыть как можно скорее. В реальных инцидентах именно 2FA часто определяет, останется ли украденный пароль неприятностью или превратится в полный takeover.',
      ],
      bullets: [
        '2FA лучше всего работает вместе с сильными уникальными паролями.',
        'Начинайте с самых важных аккаунтов, а не с идеального плана на всё сразу.',
        'Реалистично настроенная защита лучше идеальной схемы, которую вы так и не внедрили.',
      ],
    },
  ],
);

const COMMON_MISTAKES_EN = article(
  'Most Common Password Mistakes and Fixes',
  'A practical review of the password habits that quietly make accounts easier to compromise and how to replace them with stronger routines.',
  'Most Common Password Mistakes and Fixes | generatepasswordto.me',
  'Learn which password mistakes still cause account takeovers in 2026 and how to fix reuse, weak patterns, unsafe storage, and other common habits.',
  ['common password mistakes', 'weak password examples', 'password safety checklist', 'password mistakes to avoid', 'fix weak passwords'],
  [
    {
      heading: 'Reuse is still the mistake that causes the biggest chain reaction',
      paragraphs: [
        'The most damaging password habit is not always the most dramatic one. It is often simple reuse. One leaked password becomes a key that is tested against email, social platforms, shopping accounts, cloud storage, and work tools. Attackers do this because it works often enough to scale.',
        'Users reuse passwords because memory does not scale well. The problem is that one compromise then stops being local. A breach in a low-value site can become the entry point to your highest-value account if the same secret appears elsewhere.',
      ],
      bullets: [
        'Reuse turns one incident into many.',
        'The lower the effort needed to remember your system, the higher the temptation to repeat it.',
        'Unique passwords remain the strongest basic fix.',
      ],
    },
    {
      heading: 'People still trust visual complexity too much',
      paragraphs: [
        'A password that looks messy can still be predictable. Capital letter first, word in the middle, number and symbol at the end is one of the oldest and most common user-generated patterns. It passes forms. It does not always survive realistic guessing.',
        'The fix is not “more symbols everywhere.” The fix is less predictability: more length, less pattern repetition, and less personal logic that an attacker could infer from leaks or public data.',
      ],
      bullets: [
        'Visual chaos is not the same thing as unpredictability.',
        'Length and uniqueness usually beat decorative substitutions.',
      ],
    },
    {
      heading: 'Unsafe storage creates a hidden second problem',
      paragraphs: [
        'Weak password behavior is often paired with weak storage behavior. Notes apps, spreadsheets, chat drafts, and email threads may feel convenient, but they create exposure if a device or account is compromised. This is especially risky when passwords are stored in plain text and mixed with recovery information.',
        'A safer approach is to treat storage as part of the system, not as an afterthought. For most users, that means a password manager plus a deliberate recovery setup.',
      ],
      bullets: [
        'Do not treat plain-text notes as a long-term password system.',
        'Protect recovery details as carefully as the passwords themselves.',
      ],
    },
    {
      heading: 'The fix is usually simpler than the bad habit',
      paragraphs: [
        'Most common password mistakes come from trying to invent a personal shortcut that will scale forever. It rarely does. The stronger replacement is usually simpler: use a manager, generate unique passwords, protect your email, turn on 2FA, and stop relying on memory tricks.',
        'The goal is not to become perfect overnight. The goal is to stop doing the small things that make account takeover easy.',
      ],
      bullets: [
        'Replace clever habits with repeatable systems.',
        'Start with email, finance, work accounts, and your password manager.',
      ],
    },
  ],
);

const COMMON_MISTAKES_UA = article(
  'Найпоширеніші помилки з паролями та як їх виправити',
  'Практичний розбір звичок, які непомітно послаблюють акаунти, і способів замінити їх сильнішою рутиною.',
  'Найпоширеніші помилки з паролями та як їх виправити | generatepasswordto.me',
  'Дізнайтеся, які помилки з паролями досі найчастіше призводять до компрометації акаунтів і як виправити перевикористання, шаблони та небезпечне зберігання.',
  ['помилки з паролями', 'слабкий пароль приклади', 'як захистити пароль', 'типові помилки з паролями', 'безпека паролів'],
  [
    {
      heading: 'Перевикористання досі створює найнебезпечніший ланцюговий ефект',
      paragraphs: [
        'Найшкідливіша парольна звичка — не завжди найочевидніша. Дуже часто це звичайне перевикористання. Один витік перетворюється на ключ до пошти, соцмереж, маркетплейсів, хмарних сервісів і роботи, бо той самий пароль або дуже близька варіація вже використовується в інших місцях.',
        'Люди повторюють паролі не через легковажність, а тому що пам’ять погано масштабується. Але наслідок від цього не стає м’якшим: інцидент у другорядному сервісі може відкрити шлях до критично важливих акаунтів.',
      ],
      bullets: [
        'Один пароль у багатьох сервісах — це множник ризику.',
        'Унікальні паролі досі залишаються найціннішою базовою звичкою.',
      ],
    },
    {
      heading: 'Зовнішня “складність” часто вводить в оману',
      paragraphs: [
        'Пароль, який виглядає заплутано, не обов’язково сильний. Велика літера на початку, слово в середині, цифра і символ у кінці — один із найпоширеніших людських шаблонів. Такі паролі проходять форми, але не завжди добре витримують реалістичне вгадування.',
        'Виправлення тут не в тому, щоб просто додати ще один символ. Потрібно зменшити передбачуваність: більше довжини, менше шаблонів, менше особистої логіки, яку можна відновити з ваших даних чи типових патернів.',
      ],
      bullets: [
        'Візуальний хаос не дорівнює реальній стійкості.',
        'Довжина та унікальність зазвичай важливіші за декоративні заміни.',
      ],
    },
    {
      heading: 'Небезпечне зберігання створює другу приховану проблему',
      paragraphs: [
        'Слабка парольна поведінка часто йде поруч із небезпечним зберіганням. Нотатки, таблиці, листи самому собі чи чернетки в месенджерах виглядають зручними, але роблять секрети вразливими, якщо компрометується пристрій або обліковий запис. Особливо погано, коли пароль і дані для відновлення лежать поруч.',
        'Безпечніший підхід — ставитися до зберігання як до частини системи, а не як до випадкової дрібниці. Для більшості людей це означає менеджер паролів і продуманий recovery-сценарій.',
      ],
      bullets: [
        'Plain-text нотатки не є нормальним довгостроковим сховищем паролів.',
        'Recovery-дані треба захищати не менш уважно, ніж самі паролі.',
      ],
    },
    {
      heading: 'Виправлення часто простіше, ніж шкідлива звичка',
      paragraphs: [
        'Більшість типових помилок із паролями виникає через спробу придумати “власний хитрий спосіб”, який нібито працюватиме завжди. Насправді сильніша заміна зазвичай простіша: менеджер паролів, унікальні значення, захищена пошта, 2FA і менше надії на пам’ять.',
        'Мета не в тому, щоб за день стати ідеальним. Мета — прибрати дрібні звички, які роблять захоплення акаунта легким.',
      ],
      bullets: [
        'Замість “хитрощів” краще будувати повторювану систему.',
        'Починайте з пошти, фінансів, роботи та менеджера паролів.',
      ],
    },
  ],
);

const COMMON_MISTAKES_RU = article(
  'Самые распространённые ошибки с паролями и как их исправить',
  'Практичный разбор привычек, которые незаметно ослабляют аккаунты, и способов заменить их более сильной системой.',
  'Самые распространённые ошибки с паролями и как их исправить | generatepasswordto.me',
  'Узнайте, какие ошибки с паролями чаще всего приводят к компрометации аккаунтов и как исправить повторное использование, шаблоны и небезопасное хранение.',
  ['ошибки с паролями', 'слабый пароль примеры', 'безопасность паролей', 'типичные ошибки с паролями', 'как исправить слабый пароль'],
  [
    {
      heading: 'Повторное использование по-прежнему даёт самый опасный эффект домино',
      paragraphs: [
        'Самая вредная парольная привычка не всегда выглядит самой драматичной. Очень часто это обычное повторное использование. Один утёкший пароль превращается в ключ, который пробуют на почте, соцсетях, магазинах, облачных сервисах и рабочих инструментах.',
        'Люди повторяют пароли не потому, что не слышали советов, а потому что память плохо масштабируется. Но последствия от этого не становятся мягче: компрометация одного малозначимого сайта может открыть путь к действительно важным аккаунтам.',
      ],
      bullets: [
        'Один пароль на многих сервисах резко увеличивает ущерб.',
        'Уникальные пароли всё ещё остаются лучшим базовым улучшением.',
      ],
    },
    {
      heading: 'Внешняя сложность часто создаёт ложную уверенность',
      paragraphs: [
        'Пароль, который выглядит “навороченным”, не всегда действительно силён. Заглавная буква в начале, слово в середине, цифра и символ на конце — один из самых типичных человеческих шаблонов. Он помогает пройти форму, но не обязательно даёт хорошую устойчивость.',
        'Исправление здесь не в том, чтобы просто добавить ещё один знак. Нужна меньшая предсказуемость: больше длины, меньше шаблонов и меньше личной логики, которую можно угадать по вашим данным и привычкам.',
      ],
      bullets: [
        'Шумный вид не гарантирует реальную стойкость.',
        'Длина и уникальность обычно важнее декоративных замен.',
      ],
    },
    {
      heading: 'Небезопасное хранение создаёт вторую скрытую проблему',
      paragraphs: [
        'Слабое обращение с паролями часто сопровождается слабым хранением. Заметки, таблицы, письма самому себе и черновики в мессенджерах кажутся удобными, но делают секреты уязвимыми, если скомпрометирован аккаунт или устройство. Особенно плохо, когда пароль и данные для восстановления лежат рядом.',
        'Более сильный подход — считать хранение частью системы безопасности, а не бытовой мелочью. Для большинства людей это означает менеджер паролей и продуманный recovery-сценарий.',
      ],
      bullets: [
        'Plain-text заметки — плохой долгосрочный формат для паролей.',
        'Данные восстановления нужно защищать так же серьёзно, как и сами пароли.',
      ],
    },
    {
      heading: 'Исправление обычно проще, чем плохая привычка',
      paragraphs: [
        'Большинство типичных ошибок появляются из попытки придумать “свой хитрый способ”, который будет работать вечно. Обычно более сильная замена проще: менеджер паролей, уникальные значения, защищённая почта, 2FA и меньше надежды на память.',
        'Задача не в том, чтобы за один день стать идеальным. Задача в том, чтобы убрать маленькие привычки, которые делают захват аккаунта слишком лёгким.',
      ],
      bullets: [
        'Лучше система, чем набор маленьких хитростей.',
        'Начинайте с почты, финансов, работы и менеджера паролей.',
      ],
    },
  ],
);

const GENERATOR_GUIDE_EN = article(
  'Secure Password Generator: Full Guide',
  'A practical guide to using a password generator well instead of treating it like a random-button gimmick.',
  'Secure Password Generator: Full Guide | generatepasswordto.me',
  'Learn how to use a secure password generator correctly, choose the right length and character settings, and avoid common mistakes when copying generated passwords into real accounts.',
  ['secure password generator guide', 'random password tool', 'password generator settings', 'how to use password generator', 'best password length'],
  [
    { heading: 'A generator is only useful if you configure it intentionally', paragraphs: ['Password generators remove guesswork, but they still depend on your settings. If you always accept the shortest possible result or avoid symbols because they look awkward, you can end up with a weaker outcome than the tool could have produced.', 'The safest habit is to think in terms of account value. Email, finance, work tools, and password managers deserve stronger settings than throwaway accounts. A generator is strongest when it helps you match the secret to the real risk.'], bullets: ['Use longer outputs for high-value accounts.', 'Do not let “easy to read” silently become “easy to guess”.'] },
    { heading: 'Length should usually be your first adjustment', paragraphs: ['Users often obsess over symbol sets and forget the highest-value lever: length. In most cases, adding more characters gives a bigger security upgrade than tweaking one visual detail. That is especially true when the generator already gives you strong randomness.', 'If a site allows long passwords, use that freedom. Only trim length when a service forces a lower limit, and treat that as a limitation of the service, not as your preferred baseline.'], bullets: ['Increase length before fine-tuning character choices.', 'Let the site limit you only when it truly has to.'] },
    { heading: 'Generated passwords work best with good storage and good habits', paragraphs: ['A generated password is often too random to memorize comfortably, and that is fine. The right companion for a generator is usually a password manager. Without one, users often copy the generated password into a note, simplify it by hand, or reuse it in places where it no longer fits the original intent.', 'The tool is not just about creation. It is about preserving the strength of the result all the way through storage, copying, and future reuse decisions.'], bullets: ['Do not weaken a generated password after creating it.', 'Store generated passwords in a manager whenever possible.'] },
    { heading: 'Use the strength indicator as a decision tool, not decoration', paragraphs: ['A good generator should not only create passwords but also help you judge them. The strength indicator matters because it gives users fast feedback when a chosen length or character set is still not where it should be.', 'That feedback is most useful when you act on it: increase length, expand the character set if appropriate, and avoid settling for a merely acceptable result on a high-impact account.'], bullets: ['Treat weak or mediocre results as prompts to improve settings.', 'Use stronger presets for more sensitive accounts.'] },
  ],
);

const GENERATOR_GUIDE_UA = article(
  'Повний гайд із безпечного генератора паролів',
  'Практичний матеріал про те, як користуватися генератором паролів правильно, а не як випадковою кнопкою.',
  'Повний гайд із безпечного генератора паролів | generatepasswordto.me',
  'Дізнайтеся, як правильно користуватися генератором паролів, обирати довжину й набори символів та не втрачати силу результату під час зберігання.',
  ['генератор паролів гайд', 'як користуватися генератором паролів', 'налаштування генератора паролів', 'довжина пароля', 'безпечний генератор паролів'],
  [
    { heading: 'Генератор корисний лише тоді, коли ви свідомо обираєте налаштування', paragraphs: ['Генератор паролів прибирає здогадки, але все одно залежить від ваших рішень. Якщо ви щоразу лишаєте мінімальну довжину або уникаєте символів лише тому, що так “зручніше”, результат може бути слабшим, ніж дозволяє сам інструмент.', 'Найкраща звичка — підбирати параметри під цінність акаунта. Пошта, фінанси, робота й менеджер паролів заслуговують сильніших значень, ніж другорядні сервіси.'], bullets: ['Для важливих акаунтів використовуйте довші паролі.', 'Не дозволяйте “зручно читати” непомітно перетворитися на “легко вгадати”.'] },
    { heading: 'Довжина майже завжди має бути першим регулятором', paragraphs: ['Користувачі часто надто зосереджуються на символах і забувають про найцінніший параметр — довжину. У більшості випадків додаткові символи дають сильніше посилення безпеки, ніж дрібні візуальні зміни. Особливо якщо генератор уже дає хорошу випадковість.', 'Якщо сервіс дозволяє довгі паролі, варто цим користуватися. Скорочуйте лише тоді, коли сайт фізично обмежує значення.'], bullets: ['Спочатку збільшуйте довжину, а вже потім тонко налаштовуйте символи.', 'Нехай вас обмежує лише сервіс, а не стара звичка.'] },
    { heading: 'Згенерований пароль потребує хорошого зберігання і правильної поведінки', paragraphs: ['Згенерований пароль часто занадто випадковий, щоб комфортно тримати його в голові, і це нормально. Найкращий партнер для генератора — менеджер паролів. Без нього люди часто спрощують результат вручну, копіюють у незахищені нотатки або починають повторно використовувати сильний пароль не там, де треба.', 'Суть генератора не лише у створенні, а й у збереженні сили результату під час копіювання, зберігання та подальшого використання.'], bullets: ['Не послаблюйте пароль після генерації.', 'Зберігайте сильні результати в менеджері паролів.'] },
    { heading: 'Індикатор міцності — це інструмент рішення, а не декор', paragraphs: ['Хороший генератор має не лише створювати пароль, а й допомагати оцінити його. Саме для цього потрібен індикатор міцності: він швидко підказує, коли обрані налаштування все ще недостатні.', 'Найбільша користь від нього з’являється тоді, коли ви реально змінюєте параметри: додаєте довжину, розширюєте набір символів, обираєте сильніший preset для критичних акаунтів.'], bullets: ['Слабкий або посередній результат — це сигнал посилити налаштування.', 'Для важливих сервісів використовуйте сильніші пресети.'] },
  ],
);

const GENERATOR_GUIDE_RU = article(
  'Полный гайд по безопасному генератору паролей',
  'Практичный материал о том, как пользоваться генератором паролей правильно, а не как случайной кнопкой.',
  'Полный гайд по безопасному генератору паролей | generatepasswordto.me',
  'Узнайте, как правильно использовать генератор паролей, выбирать длину и наборы символов и не терять силу результата при хранении и использовании.',
  ['генератор паролей гайд', 'как пользоваться генератором паролей', 'настройки генератора паролей', 'длина пароля', 'безопасный генератор паролей'],
  [
    { heading: 'Генератор полезен только тогда, когда вы осознанно выбираете настройки', paragraphs: ['Генератор убирает догадки, но всё равно зависит от ваших параметров. Если вы каждый раз оставляете минимальную длину или отключаете символы просто ради удобства, итог может оказаться слабее, чем позволяет инструмент.', 'Хорошая привычка — подбирать настройки под ценность аккаунта. Почта, финансы, работа и менеджер паролей требуют более сильных параметров, чем второстепенные сервисы.'], bullets: ['Для важных аккаунтов выбирайте более длинные значения.', 'Не позволяйте удобству незаметно снижать стойкость.'] },
    { heading: 'Длина почти всегда должна быть первым рычагом', paragraphs: ['Пользователи часто слишком много думают о символах и забывают о самом сильном параметре — длине. В большинстве случаев дополнительные символы дают больший прирост защиты, чем косметические изменения в составе.', 'Если сервис допускает длинные пароли, используйте это преимущество. Урезать длину стоит только тогда, когда сайт действительно ограничивает ввод.'], bullets: ['Сначала увеличивайте длину, а уже потом тонко настраивайте состав.', 'Пусть вас ограничивает сервис, а не старая привычка.'] },
    { heading: 'Сгенерированный пароль требует хорошего хранения', paragraphs: ['Сильный сгенерированный пароль часто неудобно помнить, и это нормально. Лучший спутник генератора — менеджер паролей. Без него пользователи нередко ослабляют результат вручную, кидают его в заметки или начинают повторно использовать в других местах.', 'Сила генератора не только в создании, но и в том, чтобы не разрушить качество результата в момент хранения и дальнейшего использования.'], bullets: ['Не упрощайте сгенерированный пароль после создания.', 'Храните сильные пароли в менеджере, а не в plain-text заметках.'] },
    { heading: 'Индикатор силы нужен для действий, а не для красоты', paragraphs: ['Хороший генератор не только создаёт пароль, но и показывает, насколько выбранные настройки действительно сильны. Индикатор полезен именно тогда, когда вы на него реагируете: увеличиваете длину, меняете набор символов или выбираете более строгий пресет.', 'Для важных аккаунтов не стоит соглашаться на “нормально”. Генератор должен помогать доводить результат до уверенно сильного уровня.'], bullets: ['Средний результат — повод улучшить настройки.', 'Для критичных аккаунтов используйте более сильные профили генерации.'] },
  ],
);

const TEAM_POLICY_EN = article(
  'Team Password Policy Template',
  'A practical password policy framework for teams that want rules people can actually follow without lowering security.',
  'Team Password Policy Template | generatepasswordto.me',
  'Use this team password policy template to define length, uniqueness, password manager usage, breach response, and 2FA expectations in a realistic way.',
  ['team password policy template', 'company password policy', 'work password rules', 'password policy for teams', 'business password policy'],
  [
    { heading: 'A good team policy should reduce exceptions, not create them', paragraphs: ['Many internal password policies look strict on paper and fail in practice because they create so much friction that employees start building private workarounds. A useful policy should make the secure path clearer, not harder.', 'That usually means fewer decorative rules and more focus on outcomes: unique passwords, strong storage, 2FA, and clear response procedures after incidents.'], bullets: ['Write for real employee behavior, not idealized behavior.', 'A policy that nobody follows is only a document, not a control.'] },
    { heading: 'Set clear rules for uniqueness, storage, and recovery', paragraphs: ['The strongest baseline for a team is straightforward: no password reuse across services, password manager usage for work accounts, and stronger recovery handling for administrators and high-risk roles. Employees should know where secrets belong and where they absolutely do not.', 'This includes banning plain-text spreadsheets, casual note apps, and shared chat messages for credentials unless there is an explicit emergency procedure with compensating controls.'], bullets: ['Require unique passwords for every work system.', 'Define approved storage and recovery methods explicitly.'] },
    { heading: 'Policy should include incident response, not only prevention', paragraphs: ['A mature password policy does not stop at creation rules. It also explains what happens after suspected phishing, credential leakage, lost devices, or signs of account compromise. Without that section, teams improvise in the middle of stress.', 'Employees should know who to notify, which accounts must be rotated first, and when security teams need to revoke sessions or force resets.'], bullets: ['Tell people what to do after an incident, not just before one.', 'Speed and clarity matter more than policy volume.'] },
    { heading: 'The template is only useful if the product setup matches it', paragraphs: ['An internal password policy is weak if the technical environment contradicts it. If your forms reject long passwords, break password-manager paste, or limit characters in unpredictable ways, the written policy and the actual user experience are working against each other.', 'Policy and implementation should be reviewed together. Otherwise employees end up blamed for problems created by the system.'], bullets: ['Check product settings against the written policy.', 'Implementation quality is part of policy quality.'] },
  ],
);

const TEAM_POLICY_UA = article(
  'Шаблон парольної політики для команди',
  'Практичний каркас парольної політики для команд, яким потрібні правила, що працюють у реальному житті.',
  'Шаблон парольної політики для команди | generatepasswordto.me',
  'Скористайтеся цим шаблоном парольної політики, щоб зафіксувати довжину, унікальність, менеджери паролів, 2FA та дії після інцидентів у робочому середовищі.',
  ['шаблон парольної політики', 'парольна політика для компанії', 'правила паролів для команди', 'корпоративна парольна політика', 'політика паролів'],
  [
    { heading: 'Хороша політика має зменшувати винятки, а не множити їх', paragraphs: ['Багато внутрішніх парольних політик виглядають суворо лише на папері. На практиці вони створюють стільки тертя, що працівники починають вигадувати власні обхідні сценарії. Корисна політика повинна робити безпечний шлях зрозумілішим, а не складнішим.', 'Зазвичай це означає менше декоративних вимог і більше уваги до результату: унікальні паролі, правильне зберігання, 2FA та зрозуміла реакція на інциденти.'], bullets: ['Пишіть політику для реальної поведінки людей.', 'Політика, яку ніхто не виконує, не є робочим контролем.'] },
    { heading: 'Чітко визначте правила для унікальності, зберігання та recovery', paragraphs: ['Найсильніша базова модель для команди досить проста: жодного перевикористання між сервісами, менеджер паролів для робочих акаунтів і посилені recovery-вимоги для адміністраторів та високоризикових ролей. Працівники мають точно знати, де секрети можна тримати, а де — категорично ні.', 'Це також означає заборону на plain-text таблиці, випадкові нотатки й надсилання паролів у чати, якщо немає спеціальної аварійної процедури з компенсаційними контролями.'], bullets: ['Унікальні паролі для кожної робочої системи мають бути базовим правилом.', 'Схвалені методи зберігання й recovery треба описати прямо.'] },
    { heading: 'У політиці має бути розділ про інциденти, а не лише про профілактику', paragraphs: ['Зріла парольна політика не закінчується на вимогах до створення пароля. Вона також пояснює, що робити після фішингу, витоку, втрати пристрою чи підозри на компрометацію. Без цього команди починають імпровізувати в найгірший момент.', 'Працівники повинні знати, кого сповіщати, які акаунти змінювати першими та коли безпекова команда має відкликати сесії або примусово скидати доступ.'], bullets: ['Пояснюйте дії після інциденту, а не лише правила “до нього”.', 'Швидкість і ясність важливіші за обсяг документа.'] },
    { heading: 'Шаблон політики корисний лише тоді, коли система відповідає тексту', paragraphs: ['Внутрішня політика слабка, якщо технічне середовище їй суперечить. Якщо форми відкидають довгі паролі, ламають вставку з менеджера або дивно обмежують символи, написані правила й реальний UX працюють один проти одного.', 'Політику й технічну реалізацію треба перевіряти разом. Інакше працівників звинувачують у проблемах, які створила сама система.'], bullets: ['Зіставляйте системні налаштування з письмовою політикою.', 'Якість реалізації — це частина якості політики.'] },
  ],
);

const TEAM_POLICY_RU = article(
  'Шаблон парольной политики для команды',
  'Практичный каркас парольной политики для команд, которым нужны правила, работающие в реальной среде, а не только на бумаге.',
  'Шаблон парольной политики для команды | generatepasswordto.me',
  'Используйте этот шаблон парольной политики, чтобы определить длину, уникальность, менеджеры паролей, 2FA и действия после инцидентов в рабочей среде.',
  ['шаблон парольной политики', 'политика паролей для компании', 'рабочие правила паролей', 'корпоративная политика паролей', 'командная парольная политика'],
  [
    { heading: 'Хорошая политика должна уменьшать количество обходных путей', paragraphs: ['Многие внутренние парольные политики выглядят строго только на бумаге. На практике они создают столько трения, что сотрудники начинают строить собственные обходные схемы. Полезная политика должна делать безопасный путь понятнее, а не сложнее.', 'Обычно это означает меньше декоративных требований и больше внимания к результату: уникальные пароли, правильное хранение, 2FA и ясная реакция на инциденты.'], bullets: ['Пишите политику под реальное поведение сотрудников.', 'Документ, который никто не соблюдает, не является рабочим контролем.'] },
    { heading: 'Чётко опишите правила уникальности, хранения и восстановления', paragraphs: ['Сильная базовая модель для команды выглядит просто: никакого повторного использования между сервисами, менеджер паролей для рабочих учётных данных и усиленные recovery-требования для администраторов и критичных ролей. Сотрудники должны понимать, где секреты допустимо хранить, а где нет.', 'Это также означает запрет на plain-text таблицы, случайные заметки и пересылку паролей в чаты, если нет специально утверждённой аварийной процедуры.'], bullets: ['Уникальные пароли для каждой рабочей системы должны быть базой.', 'Разрешённые методы хранения и recovery нужно формулировать прямо.'] },
    { heading: 'Политика должна включать действия после инцидента', paragraphs: ['Зрелая парольная политика не ограничивается требованиями к созданию пароля. Она объясняет, что делать после фишинга, утечки, потери устройства или признаков компрометации. Без этого сотрудники начинают импровизировать в момент наибольшего давления.', 'Нужно заранее указать, кого уведомлять, какие аккаунты менять в первую очередь и когда служба безопасности должна отзывать сессии или принудительно сбрасывать доступ.'], bullets: ['Опишите действия после инцидента, а не только профилактику.', 'Скорость и ясность часто важнее объёма документа.'] },
    { heading: 'Шаблон полезен только тогда, когда система ему соответствует', paragraphs: ['Внутренняя политика слаба, если техническая среда ей противоречит. Если формы режут длинные пароли, ломают вставку из менеджера или странно ограничивают символы, письменные правила и реальный UX начинают конфликтовать.', 'Политику и реализацию нужно проверять вместе. Иначе ответственность за системную проблему перекладывается на сотрудников.'], bullets: ['Сверяйте технические настройки с текстом политики.', 'Качество реализации — это часть качества самой политики.'] },
  ],
);

const PCI_EN = article(
  'PCI DSS Password Requirements for Teams',
  'A practical explanation of PCI DSS password expectations and how teams can implement them without making security harder to follow.',
  'PCI DSS Password Requirements for Teams | generatepasswordto.me',
  'Understand what PCI DSS expects from password controls, authentication hygiene, and access management for teams that handle payment-related systems.',
  ['pci dss password requirements', 'compliance password policy', 'payment security passwords', 'pci dss authentication', 'password policy for pci'],
  [
    { heading: 'PCI DSS is about controlled access, not box-checking', paragraphs: ['PCI DSS matters because payment environments have a clear risk profile: if access is weak, the blast radius is not abstract. Teams handling cardholder data or connected systems need authentication controls that are strong, documented, and consistently enforced.', 'That means password policy under PCI should not be treated as an isolated rule. It belongs inside a broader access-control system that includes role scoping, logging, review, and strong authentication practices.'], bullets: ['PCI expectations make more sense when viewed through access control, not isolated password trivia.', 'The goal is to reduce abuse in high-impact environments.'] },
    { heading: 'Shared access and informal credential handling create immediate risk', paragraphs: ['One of the fastest ways to fail password hygiene in a payment environment is to normalize shared accounts, copied secrets, or informal admin access. Even before a formal audit, these habits make incident response and accountability harder.', 'Teams should know which systems require named access, how credentials are stored, when rotation is required, and how privileges are revoked when roles change.'], bullets: ['Named access is stronger than shared convenience.', 'Credential handling needs documented ownership.'] },
    { heading: 'Compliance works better when strong habits are easy to maintain', paragraphs: ['A PCI-aligned password policy should still respect usability. If a rule makes users rely on memory hacks, sticky notes, or constant manual resets, it may look strict while weakening day-to-day execution. Strong password managers, better access workflows, and reliable MFA often improve both compliance and actual security.', 'Teams do better when the secure path is also the easiest approved path.'], bullets: ['Do not confuse painful process with good compliance.', 'Operational usability supports better control quality.'] },
    { heading: 'Treat policy review as ongoing maintenance', paragraphs: ['PCI requirements should lead to regular review, not a one-time documentation sprint. Access lists, password handling, recovery methods, and role changes all need periodic verification if the control is going to stay real.', 'The strongest policy is one that still matches the environment six months later, not just the one that looked complete during drafting.'], bullets: ['Review password and access controls regularly.', 'Compliance decays quickly when ownership is unclear.'] },
  ],
);

const PCI_UA = article(
  'Вимоги PCI DSS до паролів для команд',
  'Практичне пояснення того, чого PCI DSS очікує від парольних контролів у командах, що працюють із платіжними системами.',
  'Вимоги PCI DSS до паролів для команд | generatepasswordto.me',
  'Розберіться, чого PCI DSS очікує від політики паролів, автентифікації та контролю доступу в командах, які працюють із платіжною інфраструктурою.',
  ['pci dss вимоги до паролів', 'парольна політика pci dss', 'безпека платіжних систем', 'автентифікація pci dss', 'pci dss паролі'],
  [
    { heading: 'PCI DSS — це насамперед про контроль доступу, а не про формальні галочки', paragraphs: ['PCI DSS важливий тому, що платіжне середовище має дуже конкретний ризик: слабкий доступ тут веде не до абстрактних втрат, а до реальних інцидентів із фінансовими та чутливими даними. Команди, які працюють із системами навколо карткових даних, повинні мати сильні, задокументовані й послідовні практики автентифікації.', 'Тому парольну політику в контексті PCI не можна сприймати як ізольоване правило. Вона є частиною ширшої системи контролю доступу: ролі, логування, перегляди, сильна автентифікація й відповідальність за облікові записи.'], bullets: ['Вимоги PCI логічніше читати через призму контролю доступу.', 'Мета — зменшити ризик зловживання в середовищі з високою ціною помилки.'] },
    { heading: 'Спільні акаунти й неформальне поводження з доступами створюють прямий ризик', paragraphs: ['Один із найшвидших способів зіпсувати парольну гігієну в платіжному середовищі — зробити нормою спільні акаунти, копіювання секретів і неформальний адмін-доступ. Ще до будь-якого аудиту це ламає підзвітність і ускладнює розбір інцидентів.', 'Команда повинна розуміти, які системи вимагають персоналізованого доступу, де зберігаються облікові дані, коли потрібна ротація і як відкликаються привілеї після зміни ролі або звільнення.'], bullets: ['Персоналізований доступ сильніший за спільну зручність.', 'Для облікових даних має бути зрозумілий власник і життєвий цикл.'] },
    { heading: 'Комплаєнс працює краще, коли сильні звички легко підтримувати', paragraphs: ['PCI-сумісна політика паролів усе одно повинна зважати на практичність. Якщо правило змушує людей покладатися на пам’ять, стікери або безкінечні ручні зміни, воно може виглядати строго, але послаблювати реальне виконання. Надійний менеджер паролів, кращі access workflows і стабільна MFA часто одночасно посилюють і комплаєнс, і безпеку.', 'Команди працюють краще тоді, коли безпечний шлях водночас є й найпростішим дозволеним шляхом.'], bullets: ['Болючий процес не дорівнює якісному комплаєнсу.', 'Операційна зручність часто посилює якість контролю.'] },
    { heading: 'Перегляд політики має бути регулярною практикою', paragraphs: ['Вимоги PCI повинні приводити не до одноразового написання документа, а до регулярного перегляду. Списки доступів, паролі, recovery methods і зміни ролей потрібно періодично перевіряти, інакше контроль швидко втрачає сенс.', 'Найсильніша політика — це та, що через пів року все ще відповідає реальному середовищу, а не лише добре виглядала під час створення.'], bullets: ['Парольні та access-контролі треба регулярно переглядати.', 'Комплаєнс швидко деградує, коли відповідальність розмита.'] },
  ],
);

const PCI_RU = article(
  'Требования PCI DSS к паролям для команд',
  'Практичное объяснение того, чего PCI DSS ожидает от парольных контролей в командах, работающих с платёжными системами.',
  'Требования PCI DSS к паролям для команд | generatepasswordto.me',
  'Разберитесь, чего PCI DSS ожидает от политики паролей, аутентификации и контроля доступа в командах, работающих с платёжной инфраструктурой.',
  ['pci dss требования к паролям', 'политика паролей pci dss', 'безопасность платёжных систем', 'аутентификация pci dss', 'pci dss пароли'],
  [
    { heading: 'PCI DSS — это прежде всего про контроль доступа, а не про формальные галочки', paragraphs: ['PCI DSS важен потому, что в платёжной среде риск очень конкретен: слабый доступ здесь приводит не к абстрактной теории, а к реальным инцидентам с финансовыми и чувствительными данными. Команды, работающие с системами вокруг карточной информации, должны иметь сильные, документированные и последовательно применяемые практики аутентификации.', 'Поэтому парольную политику в рамках PCI нельзя рассматривать как изолированное правило. Это часть более широкой системы контроля доступа: роли, логирование, проверки, сильная аутентификация и ответственность за учётные записи.'], bullets: ['Требования PCI логичнее читать через призму контроля доступа.', 'Цель — снизить риск злоупотребления в среде с высокой ценой ошибки.'] },
    { heading: 'Общие аккаунты и неформальное обращение с доступом создают прямой риск', paragraphs: ['Один из самых быстрых способов разрушить парольную гигиену в платёжной среде — сделать нормой общие аккаунты, копирование секретов и неформальный админ-доступ. Ещё до любого аудита это ломает подотчётность и усложняет расследование инцидентов.', 'Команда должна понимать, какие системы требуют персонального доступа, где хранятся учётные данные, когда нужна ротация и как отзывать привилегии после смены роли или увольнения.'], bullets: ['Персональный доступ сильнее общей “удобной” учётки.', 'У каждого секрета должен быть понятный владелец и жизненный цикл.'] },
    { heading: 'Комплаенс работает лучше, когда сильные привычки удобно поддерживать', paragraphs: ['PCI-ориентированная политика паролей всё равно должна быть практичной. Если правило заставляет сотрудников жить на памяти, стикерах или бесконечных ручных сменах, оно может выглядеть строго, но ухудшать реальное исполнение. Надёжный менеджер паролей, более качественные access workflows и стабильная MFA часто одновременно улучшают и комплаенс, и фактическую защиту.', 'Команды работают лучше тогда, когда безопасный путь одновременно является и самым простым разрешённым путём.'], bullets: ['Болезненный процесс не равен качественному комплаенсу.', 'Операционная удобность может усиливать качество контроля.'] },
    { heading: 'Политику нужно регулярно пересматривать', paragraphs: ['Требования PCI должны вести не к разовой подготовке документа, а к регулярному пересмотру. Списки доступа, обработка паролей, recovery-методы и изменения ролей нужно периодически проверять, иначе контроль быстро теряет реальность.', 'Самая сильная политика — та, которая через полгода всё ещё соответствует реальной среде, а не только красиво выглядела при написании.'], bullets: ['Контроли паролей и доступа нужно проверять регулярно.', 'Комплаенс быстро распадается, если неясно, кто за него отвечает.'] },
  ],
);

export const ARTICLE_CATALOG: ArticleEntry[] = [
  {
    slug: 'how-to-create-strong-passwords',
    category: 'security-basics',
    readingMinutes: 10,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: STRONG_PASSWORDS_EN,
      ua: STRONG_PASSWORDS_UA,
      ru: STRONG_PASSWORDS_RU,
    },
  },
  {
    slug: 'password-manager-vs-manual-storage',
    category: 'security-basics',
    readingMinutes: 9,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: MANAGER_EN,
      ua: MANAGER_UA,
      ru: MANAGER_RU,
    },
  },
  {
    slug: 'passphrase-vs-password-entropy',
    category: 'implementation',
    readingMinutes: 7,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: PASSPHRASE_EN,
      ua: PASSPHRASE_UA,
      ru: PASSPHRASE_RU,
    },
  },
  {
    slug: 'nist-800-63b-password-rules',
    category: 'policy',
    readingMinutes: 10,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: NIST_EN,
      ua: NIST_UA,
      ru: NIST_RU,
    },
  },
  {
    slug: 'pci-dss-password-requirements',
    category: 'policy',
    readingMinutes: 10,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: PCI_EN,
      ua: PCI_UA,
      ru: PCI_RU,
    },
  },
  {
    slug: 'what-to-do-after-password-breach',
    category: 'incident-response',
    readingMinutes: 9,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: BREACH_EN,
      ua: BREACH_UA,
      ru: BREACH_RU,
    },
  },
  {
    slug: 'two-factor-authentication-basics',
    category: 'security-basics',
    readingMinutes: 6,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: TWO_FACTOR_EN,
      ua: TWO_FACTOR_UA,
      ru: TWO_FACTOR_RU,
    },
  },
  {
    slug: 'common-password-mistakes',
    category: 'security-basics',
    readingMinutes: 7,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: COMMON_MISTAKES_EN,
      ua: COMMON_MISTAKES_UA,
      ru: COMMON_MISTAKES_RU,
    },
  },
  {
    slug: 'team-password-policy-template',
    category: 'implementation',
    readingMinutes: 9,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: TEAM_POLICY_EN,
      ua: TEAM_POLICY_UA,
      ru: TEAM_POLICY_RU,
    },
  },
  {
    slug: 'secure-password-generator-guide',
    category: 'implementation',
    readingMinutes: 8,
    updatedAt: '2026-04-15',
    author: 'GeneratePasswordTo Editorial Team',
    content: {
      en: GENERATOR_GUIDE_EN,
      ua: GENERATOR_GUIDE_UA,
      ru: GENERATOR_GUIDE_RU,
    },
  },
];

export function getArticleBySlug(slug: string): ArticleEntry | undefined {
  return ARTICLE_CATALOG.find((article) => article.slug === slug);
}

export function getLocalizedArticle(article: ArticleEntry, locale: string): LocalizedArticleContent {
  const language = (SUPPORTED_CONTENT_LANGUAGES.includes(locale as ContentLanguage) ? locale : 'en') as ContentLanguage;
  return article.content[language] || article.content.en || makeFallback(article.slug, article.slug, []);
}

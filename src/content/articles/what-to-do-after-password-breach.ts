import type { LocalizedArticleContent } from '../articles';

export const en: LocalizedArticleContent = {
  title: 'What to Do After a Password Breach: Step-by-Step Recovery',
  excerpt:
    'Your credentials were leaked in a data breach. Here is a step-by-step response plan covering password resets, monitoring, MFA setup, and long-term protection strategies.',
  seoTitle: 'What to Do After a Password Breach — Recovery Checklist 2026 | generatepasswordto.me',
  seoDescription:
    'Complete response plan after a password breach. Step-by-step guide covering immediate actions, password resets, monitoring for identity theft, MFA setup, and prevention strategies.',
  keywords: [
    'password breach recovery',
    'data breach response plan',
    'credentials leaked what to do',
    'account compromised checklist',
    'Have I Been Pwned check',
    'breach notification response',
  ],
  sections: [
    {
      heading: 'How to Know If You Have Been Breached',
      paragraphs: [
        'Data breaches happen constantly — over 3,200 publicly reported breaches exposed 353 million records in 2023 alone, according to the Identity Theft Resource Center. Many breaches go unreported for months or years. You might learn about a breach through a notification email from the affected service, a news report, a dark web monitoring alert, or by checking haveibeenpwned.com.',
        'Have I Been Pwned (HIBP) is a free service created by security researcher Troy Hunt that aggregates breach data. Enter your email address to see which breaches included your credentials. The service currently indexes over 14 billion breached accounts across 800+ breaches. It also offers a notification service that alerts you when your email appears in future breaches.',
        'Signs of compromised accounts include: password reset emails you did not request; login notifications from unknown locations or devices; changes to your account settings you did not make; contacts receiving messages you did not send; and unfamiliar transactions on financial accounts. If you notice any of these, treat the account as compromised immediately — do not wait for an official breach notification.',
      ],
    },
    {
      heading: 'Immediate Actions: The First 30 Minutes',
      paragraphs: [
        'Step 1: Change the password on the breached account immediately. Use your password manager to generate a new 20+ character random password. If you cannot access the account, initiate the password reset process through the service\'s recovery mechanism (email, phone, security questions).',
        'Step 2: If you reused the breached password on any other accounts, change those passwords immediately as well. This is the most critical step — credential stuffing attacks (where attackers try leaked credentials on hundreds of other services) begin within hours of a breach becoming known. Prioritize email, banking, and cloud storage accounts.',
        'Step 3: Enable multi-factor authentication (MFA) on the breached account and all accounts where you just changed passwords. Use a TOTP app (Google Authenticator, Authy, Microsoft Authenticator) or a hardware security key (YubiKey). Avoid SMS-based MFA if possible, as it is vulnerable to SIM swapping.',
        'Step 4: Check for unauthorized activity on the breached account. Review recent login sessions, connected applications, email forwarding rules, and account recovery settings. Attackers often set up persistence mechanisms — such as adding their email as a recovery address or connecting an OAuth application — that survive password changes.',
      ],
    },
    {
      heading: 'Email Accounts: The Priority Target',
      paragraphs: [
        'Your email account is the master key to your digital life. Most online services use email for password resets, which means an attacker who controls your email can take over virtually every other account you own. If your email credentials were breached, this account takes absolute priority.',
        'After changing your email password and enabling MFA, audit every aspect of the account: check email forwarding rules (attackers add forwarding to their own address); review connected applications and OAuth permissions; verify recovery phone numbers and backup email addresses; check for filters that auto-delete or auto-archive specific emails (attackers use this to hide their activity); and review recent sent messages for phishing emails sent to your contacts.',
        'If you use Gmail, visit myaccount.google.com/security to review recent security events, signed-in devices, and third-party access. For Microsoft accounts, use account.microsoft.com/security. Both services offer activity logs that show recent logins and actions.',
      ],
    },
    {
      heading: 'Financial Accounts: Protecting Your Money',
      paragraphs: [
        'If the breach involved a financial service, or if you reused the breached password on any financial account, take immediate additional steps. Contact your bank and credit card companies to report potential compromise. They can flag your accounts for suspicious activity, issue new card numbers, and place temporary holds if necessary.',
        'Place a fraud alert or credit freeze with the three major credit bureaus (Equifax, Experian, TransUnion). A fraud alert requires creditors to take extra steps to verify your identity before opening new accounts. A credit freeze is stronger — it prevents anyone from opening new accounts in your name until you temporarily lift the freeze.',
        'Monitor your bank and credit card statements daily for at least 30 days after the breach. Set up transaction alerts for any amount. Pay special attention to small test transactions ($1-5), which fraudsters use to verify that a stolen card is active before making larger purchases.',
        'In Ukraine and the EU, monitor your bank account via your banking app and contact your bank\'s fraud department. Ukraine\'s National Bank maintains a hotline for financial fraud. If you discover unauthorized transactions, file a report with both the bank and the Cyberpolice (cyberpolice.gov.ua).',
      ],
    },
    {
      heading: 'Checking Your Passwords Against Breach Databases',
      paragraphs: [
        'Beyond checking if your email was breached, you should verify whether your specific passwords have appeared in any known breach. The Have I Been Pwned Passwords API allows you to check passwords without transmitting them. It uses a technique called k-anonymity: only the first 5 characters of the SHA-1 hash are sent, and the full list of matching hashes is returned for local comparison.',
        'Most password managers integrate breach checking directly. 1Password\'s Watchtower, Bitwarden\'s vault health reports, and Dashlane\'s dark web monitoring all use HIBP or similar databases to flag compromised passwords in your vault. Run a full vault audit and change every password that appears in breach data.',
        'Our password generator includes a built-in breach check tool. Enter any password to instantly check it against the HIBP database. The check happens entirely in your browser — the full password is never sent to any server. Only the first 5 characters of the hash are transmitted, preserving your privacy while providing real-time breach data.',
      ],
    },
    {
      heading: 'Long-Term Protection Strategy',
      paragraphs: [
        'Adopt a password manager if you have not already. This is the single most effective step to prevent future credential-reuse breaches. With a password manager, every account gets a unique random password, so a breach at one service cannot cascade to others. Bitwarden (free, open source) and 1Password ($2.99/month) are excellent choices.',
        'Enable MFA on every account that supports it, prioritizing email, banking, cloud storage, and social media. Hardware security keys (YubiKey, Titan) provide the strongest protection and are phishing-resistant. If hardware keys are not available, use a TOTP app. Use SMS only as a last resort.',
        'Sign up for breach notifications. HIBP offers free email monitoring: enter your addresses at haveibeenpwned.com/NotifyMe. Google\'s Password Checkup (integrated into Chrome and Google accounts) also monitors your saved passwords against breach databases. Enable these features so you learn about breaches quickly rather than months later.',
        'Practice regular security hygiene: review your password manager vault quarterly for weak or old passwords; audit connected applications and OAuth permissions on your major accounts; keep your software updated (many breaches exploit known vulnerabilities in outdated software); and be vigilant about phishing — the most common way attackers obtain credentials.',
      ],
      bullets: [
        'Use a password manager with unique passwords for every account',
        'Enable MFA on all accounts (FIDO2 > TOTP > SMS)',
        'Sign up for HIBP breach notifications',
        'Audit your password vault quarterly',
        'Review OAuth and connected app permissions regularly',
        'Keep all software updated',
        'Learn to recognize phishing attacks',
        'Place a credit freeze if financial data was exposed',
      ],
    },
    {
      heading: 'Reporting and Legal Steps',
      paragraphs: [
        'In Ukraine, report cybercrime to the Cyberpolice at cyberpolice.gov.ua or by calling 0-800-505-170. Under GDPR (applicable through Ukraine\'s Data Protection Law alignment with EU standards), you have the right to be informed about breaches affecting your data and to request deletion of your data from the breached service.',
        'In the US, report identity theft to the FTC at identitytheft.gov, which creates a personalized recovery plan. File a report with your local police department as well — this documentation may be needed for bank and credit disputes. If the breach involved health records, file a complaint with the HHS Office for Civil Rights.',
        'Document everything: save breach notification emails, screenshot any unauthorized activity, record dates and times of your response actions, and keep copies of all correspondence with affected services. This documentation is essential for any future disputes, insurance claims, or legal proceedings.',
      ],
    },
  ],
};

export const ua: LocalizedArticleContent = {
  title: 'Що робити після витоку пароля: покрокове відновлення',
  excerpt:
    'Ваші облікові дані потрапили у витік даних. Ось покроковий план реагування: зміна паролів, моніторинг, налаштування MFA та стратегії довгострокового захисту.',
  seoTitle: 'Що робити після витоку пароля — чеклист відновлення 2026 | generatepasswordto.me',
  seoDescription:
    'Повний план реагування після витоку пароля. Покрокова інструкція: негайні дії, зміна паролів, моніторинг крадіжки особистості, налаштування MFA та стратегії запобігання.',
  keywords: [
    'відновлення після витоку пароля',
    'план реагування на витік даних',
    'що робити якщо вкрали пароль',
    'чеклист скомпрометованого акаунту',
    'перевірка Have I Been Pwned',
    'реагування на витік',
  ],
  sections: [
    {
      heading: 'Як дізнатися, чи зазнали ви витоку',
      paragraphs: [
        'Витоки даних відбуваються постійно — понад 3 200 публічно повідомлених витоків розкрили 353 мільйони записів лише у 2023 році, за даними Identity Theft Resource Center. Багато витоків залишаються неповідомленими місяцями або роками. Ви можете дізнатися про витік через повідомлення від постраждалого сервісу, новини, сповіщення моніторингу даркнету або перевіривши haveibeenpwned.com.',
        'Have I Been Pwned (HIBP) — безкоштовний сервіс, створений дослідником безпеки Троєм Хантом, що агрегує дані витоків. Введіть свою email-адресу, щоб побачити, які витоки включали ваші облікові дані. Сервіс наразі індексує понад 14 мільярдів скомпрометованих акаунтів з 800+ витоків.',
        'Ознаки скомпрометованих акаунтів: листи скидання пароля, які ви не запитували; повідомлення про вхід з невідомих місць; зміни в налаштуваннях акаунту; контакти отримують повідомлення, які ви не надсилали; та незнайомі транзакції на фінансових акаунтах. Якщо ви помітили будь-що з цього, вважайте акаунт скомпрометованим негайно.',
      ],
    },
    {
      heading: 'Негайні дії: перші 30 хвилин',
      paragraphs: [
        'Крок 1: Змініть пароль на скомпрометованому акаунті негайно. Використовуйте менеджер паролів для генерації нового випадкового пароля довжиною 20+ символів. Якщо не можете отримати доступ, ініціюйте скидання пароля.',
        'Крок 2: Якщо ви використовували скомпрометований пароль на інших акаунтах, змініть ці паролі негайно. Це найкритичніший крок — атаки credential stuffing починаються протягом годин після витоку. Надайте пріоритет пошті, банкінгу та хмарному сховищу.',
        'Крок 3: Увімкніть багатофакторну аутентифікацію (MFA) на скомпрометованому акаунті та всіх акаунтах, де ви щойно змінили паролі. Використовуйте TOTP-застосунок (Google Authenticator, Authy) або апаратний ключ (YubiKey). Уникайте SMS-MFA, якщо можливо.',
        'Крок 4: Перевірте несанкціоновану активність на скомпрометованому акаунті. Перегляньте останні сесії входу, підключені додатки, правила переадресації пошти та налаштування відновлення. Зловмисники часто встановлюють механізми збереження доступу, які переживають зміну пароля.',
      ],
    },
    {
      heading: 'Електронна пошта: пріоритетна ціль',
      paragraphs: [
        'Ваш акаунт електронної пошти — це головний ключ до вашого цифрового життя. Більшість сервісів використовують email для скидання паролів, що означає, що зловмисник, який контролює вашу пошту, може захопити практично кожен інший ваш акаунт. Якщо ваші облікові дані пошти потрапили у витік, цей акаунт має абсолютний пріоритет.',
        'Після зміни пароля пошти та увімкнення MFA, перевірте кожен аспект акаунту: правила переадресації (зловмисники додають переадресацію на свою адресу); підключені додатки та OAuth-дозволи; номери телефонів відновлення та резервні email; фільтри, що автоматично видаляють або архівують певні листи; та останні надіслані повідомлення.',
        'Якщо ви використовуєте Gmail, відвідайте myaccount.google.com/security для перегляду останніх подій безпеки, пристроїв та доступу третіх сторін.',
      ],
    },
    {
      heading: 'Фінансові акаунти: захист ваших грошей',
      paragraphs: [
        'Якщо витік стосувався фінансового сервісу або ви повторно використовували скомпрометований пароль на фінансовому акаунті, вживайте додаткових негайних заходів. Зв\'яжіться з банком та компаніями кредитних карток для повідомлення про потенційну компрометацію.',
        'Моніторте банківські та карткові виписки щодня протягом щонайменше 30 днів після витоку. Налаштуйте сповіщення про транзакції на будь-яку суму. Зверніть особливу увагу на малі тестові транзакції ($1-5), які шахраї використовують для перевірки активності вкраденої картки.',
        'В Україні моніторте банківський рахунок через мобільний застосунок банку та зверніться у відділ боротьби з шахрайством. Національний банк України має гарячу лінію з фінансового шахрайства. При виявленні несанкціонованих транзакцій подайте заяву і в банк, і в Кіберполіцію (cyberpolice.gov.ua).',
      ],
    },
    {
      heading: 'Перевірка паролів за базами витоків',
      paragraphs: [
        'Окрім перевірки, чи ваш email потрапив у витік, ви повинні перевірити, чи конкретні паролі з\'являлися у будь-якому відомому витоку. API Have I Been Pwned Passwords дозволяє перевірити паролі без їх передачі. Він використовує техніку k-анонімності: надсилаються лише перші 5 символів SHA-1 хешу, а повний список відповідних хешів повертається для локального порівняння.',
        'Більшість менеджерів паролів інтегрують перевірку витоків безпосередньо. Watchtower у 1Password, звіти про стан сховища Bitwarden та моніторинг даркнету Dashlane використовують HIBP або подібні бази для позначення скомпрометованих паролів у вашому сховищі.',
        'Наш генератор паролів включає вбудований інструмент перевірки на витоки. Введіть будь-який пароль для миттєвої перевірки за базою HIBP. Перевірка відбувається повністю у вашому браузері — повний пароль ніколи не надсилається на жоден сервер.',
      ],
    },
    {
      heading: 'Стратегія довгострокового захисту',
      paragraphs: [
        'Прийміть менеджер паролів, якщо ще цього не зробили. Це найефективніший крок для запобігання майбутнім витокам через повторне використання облікових даних. З менеджером паролів кожен акаунт отримує унікальний випадковий пароль, тому витік одного сервісу не може каскадуватися на інші.',
        'Увімкніть MFA на кожному акаунті, що підтримує цю функцію. Апаратні ключі безпеки (YubiKey, Titan) забезпечують найнадійніший захист та стійкі до фішингу. Якщо апаратні ключі недоступні, використовуйте TOTP-застосунок.',
        'Підпишіться на сповіщення про витоки. HIBP пропонує безкоштовний моніторинг email: введіть свої адреси на haveibeenpwned.com/NotifyMe. Google Password Checkup також моніторить збережені паролі за базами витоків.',
        'Практикуйте регулярну гігієну безпеки: переглядайте сховище менеджера паролів щокварталу; перевіряйте підключені додатки; оновлюйте програмне забезпечення; та будьте пильні щодо фішингу.',
      ],
      bullets: [
        'Використовуйте менеджер паролів з унікальними паролями для кожного акаунту',
        'Увімкніть MFA на всіх акаунтах (FIDO2 > TOTP > SMS)',
        'Підпишіться на сповіщення HIBP про витоки',
        'Перевіряйте сховище паролів щокварталу',
        'Регулярно переглядайте OAuth та дозволи додатків',
        'Оновлюйте все програмне забезпечення',
        'Навчіться розпізнавати фішингові атаки',
        'Заморозьте кредит, якщо фінансові дані були розкриті',
      ],
    },
    {
      heading: 'Звітування та юридичні кроки',
      paragraphs: [
        'В Україні повідомте про кіберзлочин Кіберполіцію на cyberpolice.gov.ua або за номером 0-800-505-170. Відповідно до Закону про захист персональних даних (узгодженого з GDPR), ви маєте право бути поінформованим про витоки ваших даних та запросити видалення ваших даних у постраждалого сервісу.',
        'У США повідомте про крадіжку ідентичності в FTC на identitytheft.gov, де створять персоналізований план відновлення. Подайте також заяву в місцеву поліцію — ця документація може знадобитися для банківських і кредитних суперечок.',
        'Документуйте все: зберігайте листи про витоки, робіть скріншоти несанкціонованої активності, записуйте дати та час ваших дій реагування, та зберігайте копії всього листування з постраждалими сервісами.',
      ],
    },
  ],
};

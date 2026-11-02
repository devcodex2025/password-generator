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

export const es: LocalizedArticleContent = {
  title: 'Qué hacer tras una filtración de contraseñas: guía paso a paso',
  excerpt: 'Una guía de respuesta a incidentes para cuando tus contraseñas se ven comprometidas. Priorización, recuperación de cuentas, prevención y pasos legales.',
  seoTitle: 'Qué hacer tras una filtración de contraseñas — Guía de respuesta 2026 | generatepasswordto.me',
  seoDescription: 'Guía paso a paso para responder a una filtración de contraseñas. Cubre verificación, priorización de cuentas, recuperación, prevención futura y pasos legales.',
  keywords: ['filtración de contraseñas qué hacer', 'respuesta a violación de contraseñas', 'contraseña comprometida', 'recuperación cuenta hackeada', 'guía respuesta incidente contraseñas', 'verificar filtración datos'],
  sections: [
    { heading: 'Cómo verificar que tus contraseñas fueron filtradas', paragraphs: ['Visita haveibeenpwned.com e introduce tu email. Troy Hunt mantiene más de 13 mil millones de cuentas filtradas. El sitio te dice qué servicios fueron comprometidos y qué datos se expusieron.', 'Señales de alerta incluyen: emails de restablecimiento no solicitados, inicios de sesión desde ubicaciones desconocidas, y transacciones no reconocidas.', 'Si usas un gestor de contraseñas como 1Password con Watchtower o Bitwarden con informes de filtración, activa la función de monitoreo.'] },
    { heading: 'Priorización: qué cuentas asegurar primero', paragraphs: ['Email principal primero — es la llave maestra para restablecer otras cuentas. Cambia la contraseña inmediatamente y habilita MFA con TOTP o llave de hardware.', 'Cuentas financieras segundo — banca, inversiones, crypto, PayPal. Revisa transacciones recientes.', 'Luego cuentas profesionales y redes sociales. Cualquier cuenta donde reutilizaste la contraseña filtrada debe ser cambiada.'] },
    { heading: 'Recuperación de cuentas paso a paso', paragraphs: ['Para cada cuenta comprometida: restablece con contraseña única de 16+ caracteres generada por un gestor, habilita MFA (FIDO2 > TOTP > SMS), revoca todas las sesiones activas, y revisa los registros de actividad.', 'Si el atacante cambió tu email de recuperación, usa los procedimientos de recuperación del servicio con verificación de identidad.', 'Revisa aplicaciones de terceros y permisos OAuth conectados a la cuenta comprometida. Revoca acceso sospechoso.'] },
    { heading: 'Crear una base de seguridad más fuerte', paragraphs: ['Adopta un gestor de contraseñas si aún no usas uno. 1Password, Bitwarden o KeePass generan y almacenan contraseñas únicas para cada servicio.', 'Habilita MFA en todas las cuentas que lo soporten. Prioriza llaves FIDO2 (YubiKey) sobre TOTP (Authy) sobre SMS.', 'Nunca reutilices contraseñas. Cada cuenta debe tener una contraseña única generada aleatoriamente.'] },
    { heading: 'Prevención a largo plazo', paragraphs: ['Configura alertas en Have I Been Pwned para tu email. Audita tu bóveda de contraseñas trimestralmente. Revisa regularmente los permisos OAuth.', 'Mantén todo el software actualizado. Aprende a reconocer ataques de phishing. Congela el crédito si se expusieron datos financieros.'], bullets: ['Suscribirse a alertas de HIBP', 'Auditar la bóveda trimestralmente', 'Revisar permisos OAuth regularmente', 'Actualizar todo el software', 'Aprender a detectar phishing', 'Congelar crédito si es necesario'] },
    { heading: 'Denuncia y pasos legales', paragraphs: ['En la UE, reporta a tu autoridad de protección de datos bajo GDPR. Tienes derecho a ser informado sobre filtraciones y solicitar la eliminación de tus datos.', 'En EE.UU., reporta robo de identidad en identitytheft.gov para un plan de recuperación personalizado.', 'Documenta todo: guarda correos de filtración, capturas de actividad no autorizada, y registra todas tus acciones de respuesta.'] },
  ],
};

export const fr: LocalizedArticleContent = {
  title: 'Que faire après une fuite de mots de passe : guide étape par étape',
  excerpt: 'Guide de réponse aux incidents lorsque vos mots de passe sont compromis. Priorisation, récupération de comptes, prévention et démarches légales.',
  seoTitle: 'Que faire après une fuite de mots de passe — Guide de réponse 2026 | generatepasswordto.me',
  seoDescription: 'Guide étape par étape pour répondre à une fuite de mots de passe. Vérification, priorisation, récupération, prévention et démarches légales.',
  keywords: ['fuite mots de passe que faire', 'réponse violation mots de passe', 'mot de passe compromis', 'récupération compte piraté', 'guide réponse incident', 'vérifier fuite données'],
  sections: [
    { heading: 'Comment vérifier si vos mots de passe ont été divulgués', paragraphs: ['Visitez haveibeenpwned.com et entrez votre email. Troy Hunt maintient plus de 13 milliards de comptes compromis.', 'Les signaux d\'alarme incluent : emails de réinitialisation non sollicités, connexions depuis des emplacements inconnus, transactions non reconnues.', 'Si vous utilisez un gestionnaire comme 1Password avec Watchtower ou Bitwarden, activez la surveillance.'] },
    { heading: 'Priorisation : quels comptes sécuriser en premier', paragraphs: ['Email principal d\'abord — c\'est la clé maîtresse. Changez le mot de passe et activez le MFA immédiatement.', 'Comptes financiers ensuite — banque, investissements, crypto, PayPal.', 'Puis comptes professionnels et réseaux sociaux. Tout compte où vous avez réutilisé le mot de passe compromis doit être changé.'] },
    { heading: 'Récupération de comptes étape par étape', paragraphs: ['Pour chaque compte : réinitialisez avec un mot de passe unique de 16+ caractères, activez le MFA, révoquez les sessions actives, vérifiez les journaux d\'activité.', 'Si l\'attaquant a changé votre email de récupération, utilisez les procédures de vérification d\'identité du service.', 'Vérifiez les applications tierces et les permissions OAuth connectées au compte compromis.'] },
    { heading: 'Créer une base de sécurité plus solide', paragraphs: ['Adoptez un gestionnaire de mots de passe. 1Password, Bitwarden ou KeePass génèrent et stockent des mots de passe uniques.', 'Activez le MFA partout. Priorisez les clés FIDO2 (YubiKey) sur TOTP (Authy) sur SMS.', 'Ne réutilisez jamais de mots de passe.'] },
    { heading: 'Prévention à long terme', paragraphs: ['Configurez des alertes HIBP. Auditez votre coffre-fort trimestriellement. Vérifiez régulièrement les permissions OAuth.', 'Maintenez tous les logiciels à jour. Apprenez à reconnaître le phishing.'], bullets: ['S\'abonner aux alertes HIBP', 'Auditer le coffre-fort trimestriellement', 'Vérifier les permissions OAuth', 'Mettre à jour tous les logiciels', 'Apprendre à détecter le phishing', 'Geler le crédit si nécessaire'] },
    { heading: 'Signalement et démarches légales', paragraphs: ['En France, signalez à la CNIL sous le RGPD. Vous avez droit à l\'information et à la suppression de vos données.', 'Aux États-Unis, signalez sur identitytheft.gov pour un plan personnalisé.', 'Documentez tout : conservez les emails de notification, captures d\'écran d\'activité non autorisée.'] },
  ],
};

export const de: LocalizedArticleContent = {
  title: 'Was tun nach einem Passwort-Leak: Schritt-für-Schritt-Anleitung',
  excerpt: 'Incident-Response-Leitfaden wenn Ihre Passwörter kompromittiert wurden. Priorisierung, Kontowiederherstellung, Prävention und rechtliche Schritte.',
  seoTitle: 'Was tun nach Passwort-Leak — Reaktionsleitfaden 2026 | generatepasswordto.me',
  seoDescription: 'Schritt-für-Schritt-Anleitung nach einem Passwort-Leak. Verifizierung, Priorisierung, Wiederherstellung, Prävention und rechtliche Schritte.',
  keywords: ['Passwort-Leak was tun', 'Passwort-Verletzung Reaktion', 'Passwort kompromittiert', 'gehacktes Konto wiederherstellen', 'Incident-Response Passwörter', 'Datenleck überprüfen'],
  sections: [
    { heading: 'So überprüfen Sie, ob Ihre Passwörter geleakt wurden', paragraphs: ['Besuchen Sie haveibeenpwned.com und geben Sie Ihre E-Mail ein. Troy Hunt pflegt über 13 Milliarden geleakte Konten.', 'Warnsignale: unaufgeforderte Reset-E-Mails, Anmeldungen von unbekannten Standorten, nicht erkannte Transaktionen.', 'Wenn Sie einen Passwort-Manager wie 1Password mit Watchtower oder Bitwarden nutzen, aktivieren Sie die Überwachungsfunktion.'] },
    { heading: 'Priorisierung: Welche Konten zuerst sichern', paragraphs: ['Haupt-E-Mail zuerst — sie ist der Generalschlüssel. Passwort sofort ändern und MFA aktivieren.', 'Finanzkonten als zweites — Bank, Investitionen, Crypto, PayPal.', 'Dann berufliche Konten und soziale Medien. Jedes Konto mit wiederverwendetem Passwort muss geändert werden.'] },
    { heading: 'Schritt-für-Schritt Kontowiederherstellung', paragraphs: ['Für jedes Konto: Zurücksetzen mit einzigartigem 16+ Zeichen Passwort, MFA aktivieren, aktive Sitzungen widerrufen, Aktivitätsprotokolle prüfen.', 'Wenn der Angreifer Ihre Wiederherstellungs-E-Mail geändert hat, nutzen Sie die Identitätsverifizierung des Dienstes.', 'Überprüfen Sie verbundene Drittanbieter-Apps und OAuth-Berechtigungen.'] },
    { heading: 'Eine stärkere Sicherheitsbasis schaffen', paragraphs: ['Nutzen Sie einen Passwort-Manager: 1Password, Bitwarden oder KeePass.', 'Aktivieren Sie MFA überall. Priorität: FIDO2-Schlüssel (YubiKey) vor TOTP (Authy) vor SMS.', 'Verwenden Sie nie Passwörter wieder.'] },
    { heading: 'Langfristige Prävention', paragraphs: ['Richten Sie HIBP-Benachrichtigungen ein. Prüfen Sie Ihren Tresor vierteljährlich. Überprüfen Sie OAuth-Berechtigungen regelmäßig.', 'Halten Sie Software aktuell. Lernen Sie Phishing zu erkennen.'], bullets: ['HIBP-Benachrichtigungen einrichten', 'Tresor vierteljährlich prüfen', 'OAuth-Berechtigungen überprüfen', 'Software aktuell halten', 'Phishing erkennen lernen', 'Kredit einfrieren bei Bedarf'] },
    { heading: 'Meldung und rechtliche Schritte', paragraphs: ['In der EU melden Sie unter DSGVO bei Ihrer Datenschutzbehörde. Sie haben Recht auf Information und Datenlöschung.', 'In den USA: identitytheft.gov für einen personalisierten Wiederherstellungsplan.', 'Dokumentieren Sie alles: Benachrichtigungen, Screenshots, Zeitstempel Ihrer Maßnahmen.'] },
  ],
};

export const it: LocalizedArticleContent = {
  title: 'Cosa fare dopo una violazione delle password: guida passo-passo',
  excerpt: 'Guida di risposta agli incidenti quando le tue password vengono compromesse. Prioritizzazione, recupero account, prevenzione e passi legali.',
  seoTitle: 'Cosa fare dopo una violazione password — Guida di risposta 2026 | generatepasswordto.me',
  seoDescription: 'Guida passo-passo per rispondere a una violazione delle password. Verifica, prioritizzazione, recupero, prevenzione e passi legali.',
  keywords: ['violazione password cosa fare', 'risposta violazione password', 'password compromessa', 'recupero account hackerato', 'guida risposta incidente', 'verificare violazione dati'],
  sections: [
    { heading: 'Come verificare se le tue password sono state violate', paragraphs: ['Visita haveibeenpwned.com e inserisci la tua email. Troy Hunt mantiene oltre 13 miliardi di account compromessi.', 'Segnali di allarme: email di reset non richieste, accessi da località sconosciute, transazioni non riconosciute.', 'Se usi un gestore come 1Password con Watchtower o Bitwarden, attiva il monitoraggio.'] },
    { heading: 'Prioritizzazione: quali account proteggere prima', paragraphs: ['Email principale prima — è la chiave maestra. Cambia la password e attiva MFA immediatamente.', 'Account finanziari secondo — banca, investimenti, crypto, PayPal.', 'Poi account professionali e social media. Ogni account con password riutilizzata deve essere cambiato.'] },
    { heading: 'Recupero account passo-passo', paragraphs: ['Per ogni account: reimposta con password unica di 16+ caratteri, attiva MFA, revoca sessioni attive, controlla i log di attività.', 'Se l\'attaccante ha cambiato la tua email di recupero, usa la verifica di identità del servizio.', 'Controlla le app di terze parti e i permessi OAuth collegati.'] },
    { heading: 'Creare una base di sicurezza più forte', paragraphs: ['Adotta un gestore di password: 1Password, Bitwarden o KeePass.', 'Attiva MFA ovunque. Priorità: chiavi FIDO2 (YubiKey) su TOTP (Authy) su SMS.', 'Non riutilizzare mai le password.'] },
    { heading: 'Prevenzione a lungo termine', paragraphs: ['Configura avvisi HIBP. Verifica il vault trimestralmente. Controlla regolarmente i permessi OAuth.', 'Mantieni il software aggiornato. Impara a riconoscere il phishing.'], bullets: ['Iscriversi agli avvisi HIBP', 'Verificare il vault trimestralmente', 'Controllare i permessi OAuth', 'Aggiornare il software', 'Riconoscere il phishing', 'Congelare il credito se necessario'] },
    { heading: 'Segnalazione e passi legali', paragraphs: ['Nell\'UE, segnala al Garante Privacy sotto il GDPR. Hai diritto a essere informato e a richiedere la cancellazione dei dati.', 'Negli USA: identitytheft.gov per un piano personalizzato.', 'Documenta tutto: conserva email di notifica, screenshot di attività non autorizzata.'] },
  ],
};

export const pt: LocalizedArticleContent = {
  title: 'O que fazer após um vazamento de senhas: guia passo a passo',
  excerpt: 'Guia de resposta a incidentes quando suas senhas são comprometidas. Priorização, recuperação de contas, prevenção e passos legais.',
  seoTitle: 'O que fazer após vazamento de senhas — Guia de resposta 2026 | generatepasswordto.me',
  seoDescription: 'Guia passo a passo para responder a um vazamento de senhas. Verificação, priorização, recuperação, prevenção e passos legais.',
  keywords: ['vazamento senhas o que fazer', 'resposta violação senhas', 'senha comprometida', 'recuperação conta hackeada', 'guia resposta incidente', 'verificar vazamento dados'],
  sections: [
    { heading: 'Como verificar se suas senhas vazaram', paragraphs: ['Visite haveibeenpwned.com e insira seu email. Troy Hunt mantém mais de 13 bilhões de contas comprometidas.', 'Sinais de alerta: emails de reset não solicitados, logins de locais desconhecidos, transações não reconhecidas.', 'Se usa um gerenciador como 1Password com Watchtower ou Bitwarden, ative o monitoramento.'] },
    { heading: 'Priorização: quais contas proteger primeiro', paragraphs: ['Email principal primeiro — é a chave mestra. Mude a senha e ative MFA imediatamente.', 'Contas financeiras em segundo — banco, investimentos, crypto, PayPal.', 'Depois contas profissionais e redes sociais. Toda conta com senha reutilizada deve ser alterada.'] },
    { heading: 'Recuperação de contas passo a passo', paragraphs: ['Para cada conta: redefina com senha única de 16+ caracteres, ative MFA, revogue sessões ativas, verifique logs de atividade.', 'Se o atacante mudou seu email de recuperação, use a verificação de identidade do serviço.', 'Verifique apps de terceiros e permissões OAuth conectadas.'] },
    { heading: 'Criar uma base de segurança mais forte', paragraphs: ['Adote um gerenciador de senhas: 1Password, Bitwarden ou KeePass.', 'Ative MFA em todos os lugares. Prioridade: chaves FIDO2 (YubiKey) sobre TOTP (Authy) sobre SMS.', 'Nunca reutilize senhas.'] },
    { heading: 'Prevenção a longo prazo', paragraphs: ['Configure alertas HIBP. Audite seu cofre trimestralmente. Revise permissões OAuth regularmente.', 'Mantenha o software atualizado. Aprenda a reconhecer phishing.'], bullets: ['Assinar alertas HIBP', 'Auditar cofre trimestralmente', 'Revisar permissões OAuth', 'Manter software atualizado', 'Reconhecer phishing', 'Congelar crédito se necessário'] },
    { heading: 'Denúncia e passos legais', paragraphs: ['Na UE, reporte à autoridade de proteção de dados sob GDPR. Você tem direito à informação e exclusão de dados.', 'Nos EUA: identitytheft.gov para um plano personalizado.', 'Documente tudo: guarde emails de notificação, capturas de atividade não autorizada.'] },
  ],
};

export const ru: LocalizedArticleContent = {
  title: 'Что делать после утечки паролей: пошаговое руководство',
  excerpt: 'Руководство по реагированию на инциденты при компрометации паролей. Приоритизация, восстановление аккаунтов, предотвращение и юридические шаги.',
  seoTitle: 'Что делать после утечки паролей — Руководство по реагированию 2026 | generatepasswordto.me',
  seoDescription: 'Пошаговое руководство по реагированию на утечку паролей. Проверка, приоритизация, восстановление, предотвращение и юридические шаги.',
  keywords: ['утечка паролей что делать', 'реагирование на взлом паролей', 'пароль скомпрометирован', 'восстановление взломанного аккаунта', 'руководство реагирование на инцидент', 'проверить утечку данных'],
  sections: [
    { heading: 'Как проверить, были ли ваши пароли скомпрометированы', paragraphs: ['Посетите haveibeenpwned.com и введите email. Трой Хант поддерживает базу из более чем 13 миллиардов скомпрометированных аккаунтов.', 'Тревожные сигналы: незапрошенные письма о сбросе пароля, входы из неизвестных мест, непризнанные транзакции.', 'Если вы используете менеджер паролей с мониторингом (1Password Watchtower, Bitwarden), включите отслеживание.'] },
    { heading: 'Приоритизация: какие аккаунты защитить первыми', paragraphs: ['Основная почта первой — это мастер-ключ. Немедленно смените пароль и включите MFA.', 'Финансовые аккаунты вторыми — банк, инвестиции, крипто, PayPal.', 'Затем рабочие аккаунты и соцсети. Любой аккаунт с повторно использованным паролем нужно изменить.'] },
    { heading: 'Пошаговое восстановление аккаунтов', paragraphs: ['Для каждого аккаунта: сбросьте с уникальным паролем 16+ символов, включите MFA, отзовите все активные сессии, проверьте журналы активности.', 'Если злоумышленник изменил email восстановления, используйте процедуру верификации личности сервиса.', 'Проверьте подключённые приложения и OAuth-разрешения.'] },
    { heading: 'Создание более прочной базы безопасности', paragraphs: ['Начните использовать менеджер паролей: 1Password, Bitwarden или KeePass.', 'Включите MFA везде. Приоритет: FIDO2-ключи (YubiKey) → TOTP (Authy) → SMS.', 'Никогда не используйте пароли повторно.'] },
    { heading: 'Долгосрочная профилактика', paragraphs: ['Настройте оповещения HIBP. Проводите аудит хранилища ежеквартально. Регулярно проверяйте OAuth-разрешения.', 'Обновляйте программное обеспечение. Научитесь распознавать фишинг.'], bullets: ['Подписаться на уведомления HIBP', 'Аудит хранилища ежеквартально', 'Проверять OAuth-разрешения', 'Обновлять ПО', 'Распознавать фишинг', 'Заморозить кредит при необходимости'] },
    { heading: 'Заявления и юридические шаги', paragraphs: ['В ЕС — сообщите в орган по защите данных по GDPR. Вы имеете право на информирование и удаление данных.', 'В США: identitytheft.gov для персонализированного плана восстановления.', 'Документируйте всё: сохраняйте уведомления, скриншоты несанкционированной активности.'] },
  ],
};

export const zh: LocalizedArticleContent = {
  title: '密码泄露后该怎么办：分步指南',
  excerpt: '密码被泄露时的事件响应指南。账户优先级、恢复步骤、预防措施和法律步骤。',
  seoTitle: '密码泄露后该怎么办 — 2026年响应指南 | generatepasswordto.me',
  seoDescription: '密码泄露后的分步响应指南。涵盖验证、账户优先级、恢复、预防和法律步骤。',
  keywords: ['密码泄露怎么办', '密码泄露响应', '密码被盗', '被黑账户恢复', '事件响应指南', '检查数据泄露'],
  sections: [
    { heading: '如何验证密码是否已泄露', paragraphs: ['访问haveibeenpwned.com输入邮箱。Troy Hunt维护着超过130亿个泄露账户的数据库。', '警告信号：未请求的重置邮件、来自未知位置的登录、未识别的交易。', '如果使用1Password的Watchtower或Bitwarden的泄露报告，请启用监控功能。'] },
    { heading: '优先级：先保护哪些账户', paragraphs: ['首先是主邮箱——它是万能钥匙。立即更改密码并启用MFA。', '其次是金融账户——银行、投资、加密货币、PayPal。', '然后是工作账户和社交媒体。任何重复使用泄露密码的账户都必须更改。'] },
    { heading: '分步账户恢复', paragraphs: ['对每个账户：使用16+字符的唯一密码重置，启用MFA，撤销所有活跃会话，检查活动日志。', '如果攻击者更改了恢复邮箱，请使用服务的身份验证程序。', '检查连接的第三方应用和OAuth权限。'] },
    { heading: '建立更强的安全基础', paragraphs: ['采用密码管理器：1Password、Bitwarden或KeePass。', '在所有地方启用MFA。优先级：FIDO2密钥（YubiKey）> TOTP（Authy）> SMS。', '永远不要重复使用密码。'] },
    { heading: '长期预防', paragraphs: ['设置HIBP警报。每季度审计密码库。定期检查OAuth权限。', '保持软件更新。学会识别网络钓鱼。'], bullets: ['订阅HIBP警报', '每季度审计密码库', '检查OAuth权限', '更新所有软件', '学会识别钓鱼', '必要时冻结信用'] },
    { heading: '举报和法律步骤', paragraphs: ['在欧盟，根据GDPR向数据保护机构举报。您有权被告知和删除数据。', '在美国：访问identitytheft.gov获取个性化恢复计划。', '记录一切：保存泄露通知邮件、未授权活动截图。'] },
  ],
};

export const ja: LocalizedArticleContent = {
  title: 'パスワード漏洩後にすべきこと：ステップバイステップガイド',
  excerpt: 'パスワードが侵害された場合のインシデント対応ガイド。優先順位付け、アカウント復旧、予防、法的手順を解説。',
  seoTitle: 'パスワード漏洩後の対処法 — 2026年対応ガイド | generatepasswordto.me',
  seoDescription: 'パスワード漏洩への段階的対応ガイド。検証、優先順位付け、復旧、予防、法的手順を網羅。',
  keywords: ['パスワード漏洩対処法', 'パスワード侵害対応', 'パスワード流出', 'ハッキングされたアカウント復旧', 'インシデント対応ガイド', 'データ漏洩確認'],
  sections: [
    { heading: 'パスワードが漏洩したか確認する方法', paragraphs: ['haveibeenpwned.comでメールアドレスを入力。Troy Huntが130億以上の漏洩アカウントを管理しています。', '警告サイン：未承認のリセットメール、不明な場所からのログイン、不明な取引。', '1PasswordのWatchtowerやBitwardenの漏洩レポートを使用している場合は監視を有効にしてください。'] },
    { heading: '優先順位：どのアカウントを最初に保護するか', paragraphs: ['メインメールが最優先——マスターキーです。パスワードを即座に変更しMFAを有効に。', '金融アカウントが次——銀行、投資、暗号資産、PayPal。', '次に仕事用アカウントとSNS。漏洩パスワードを再利用しているアカウントは全て変更が必要。'] },
    { heading: 'ステップバイステップアカウント復旧', paragraphs: ['各アカウント：16+文字のユニークなパスワードでリセット、MFA有効化、全アクティブセッション無効化、アクティビティログ確認。', '攻撃者が復旧メールを変更した場合、サービスの本人確認手続きを使用。', '接続されたサードパーティアプリとOAuth権限を確認。'] },
    { heading: 'より強固なセキュリティ基盤の構築', paragraphs: ['パスワードマネージャーを導入：1Password、Bitwarden、またはKeePass。', 'すべてでMFAを有効化。優先度：FIDO2キー（YubiKey）> TOTP（Authy）> SMS。', 'パスワードの再利用は絶対禁止。'] },
    { heading: '長期的な予防', paragraphs: ['HIBP通知を設定。四半期ごとにボールトを監査。OAuth権限を定期確認。', 'ソフトウェアを最新に保つ。フィッシングの見分け方を学ぶ。'], bullets: ['HIBP通知に登録', '四半期ボールト監査', 'OAuth権限の確認', 'ソフトウェア更新', 'フィッシング検知を学ぶ', '必要に応じて信用凍結'] },
    { heading: '報告と法的手順', paragraphs: ['EUではGDPRに基づきデータ保護当局に報告。情報を受ける権利とデータ削除を要求する権利があります。', '米国：identitytheft.govで個別復旧プランを取得。', 'すべてを記録：漏洩通知メール、不正アクティビティのスクリーンショット。'] },
  ],
};

export const pl: LocalizedArticleContent = {
  title: 'Co robić po wycieku haseł: przewodnik krok po kroku',
  excerpt: 'Przewodnik reagowania na incydenty gdy hasła zostały skompromitowane. Priorytetyzacja, odzyskiwanie kont, zapobieganie i kroki prawne.',
  seoTitle: 'Co robić po wycieku haseł — Przewodnik reagowania 2026 | generatepasswordto.me',
  seoDescription: 'Przewodnik krok po kroku reagowania na wyciek haseł. Weryfikacja, priorytetyzacja, odzyskiwanie, zapobieganie i kroki prawne.',
  keywords: ['wyciek haseł co robić', 'reakcja na naruszenie haseł', 'hasło skompromitowane', 'odzyskiwanie zhakowanego konta', 'przewodnik reagowania na incydent', 'sprawdzić wyciek danych'],
  sections: [
    { heading: 'Jak sprawdzić czy hasła wyciekły', paragraphs: ['Odwiedź haveibeenpwned.com i wpisz email. Troy Hunt utrzymuje bazę ponad 13 miliardów skompromitowanych kont.', 'Sygnały ostrzegawcze: niechciane emaile resetujące, logowania z nieznanych lokalizacji, nierozpoznane transakcje.', 'Jeśli używasz menedżera jak 1Password z Watchtower lub Bitwarden, włącz monitoring.'] },
    { heading: 'Priorytetyzacja: które konta zabezpieczyć najpierw', paragraphs: ['Główny email najpierw — to klucz główny. Natychmiast zmień hasło i włącz MFA.', 'Konta finansowe drugie — bank, inwestycje, krypto, PayPal.', 'Potem konta zawodowe i media społecznościowe. Każde konto z powtórzonym hasłem musi być zmienione.'] },
    { heading: 'Odzyskiwanie kont krok po kroku', paragraphs: ['Dla każdego konta: zresetuj z unikalnym hasłem 16+ znaków, włącz MFA, unieważnij sesje, sprawdź logi aktywności.', 'Jeśli atakujący zmienił email odzyskiwania, użyj procedury weryfikacji tożsamości.', 'Sprawdź połączone aplikacje i uprawnienia OAuth.'] },
    { heading: 'Budowanie silniejszej bazy bezpieczeństwa', paragraphs: ['Zaadoptuj menedżera haseł: 1Password, Bitwarden lub KeePass.', 'Włącz MFA wszędzie. Priorytet: klucze FIDO2 (YubiKey) > TOTP (Authy) > SMS.', 'Nigdy nie używaj haseł ponownie.'] },
    { heading: 'Długoterminowe zapobieganie', paragraphs: ['Ustaw alerty HIBP. Audytuj sejf kwartalnie. Regularnie sprawdzaj uprawnienia OAuth.', 'Aktualizuj oprogramowanie. Naucz się rozpoznawać phishing.'], bullets: ['Subskrybować alerty HIBP', 'Audyt sejfu kwartalnie', 'Sprawdzać uprawnienia OAuth', 'Aktualizować oprogramowanie', 'Rozpoznawać phishing', 'Zamrozić kredyt w razie potrzeby'] },
    { heading: 'Zgłaszanie i kroki prawne', paragraphs: ['W UE zgłoś do organu ochrony danych pod RODO. Masz prawo do informacji i usunięcia danych.', 'W USA: identitytheft.gov dla spersonalizowanego planu.', 'Dokumentuj wszystko: zachowaj emaile powiadomień, zrzuty ekranu nieautoryzowanej aktywności.'] },
  ],
};

export const vi: LocalizedArticleContent = {
  title: 'Cần làm gì sau khi mật khẩu bị rò rỉ: phục hồi từng bước',
  excerpt:
    'Thông tin đăng nhập của bạn bị lộ trong một vụ rò rỉ dữ liệu. Đây là kế hoạch ứng phó từng bước: đặt lại mật khẩu, giám sát, bật MFA và bảo vệ lâu dài.',
  seoTitle: 'Sau rò rỉ mật khẩu: tạo mật khẩu mạnh, bảo vệ tài khoản',
  seoDescription:
    'Kế hoạch ứng phó sau rò rỉ mật khẩu: việc cần làm ngay, giám sát đánh cắp danh tính, bật MFA, dùng trình quản lý mật khẩu và tạo mật khẩu mạnh.',
  keywords: [
    'mật khẩu mạnh là gì',
    'mật khẩu mạnh ngẫu nhiên',
    'mật khẩu mạnh nhất',
    'mật khẩu mạnh dễ nhớ',
    'trình quản lý mật khẩu là gì',
    'cụm mật khẩu passphrase là gì',
  ],
  sections: [
    {
      heading: 'Làm sao biết bạn đã bị rò rỉ',
      paragraphs: [
        'Rò rỉ dữ liệu xảy ra liên tục — hơn 3.200 vụ được báo cáo công khai đã làm lộ 353 triệu bản ghi chỉ trong năm 2023, theo Identity Theft Resource Center. Nhiều vụ không được báo trong nhiều tháng hoặc nhiều năm. Bạn có thể biết qua email thông báo từ dịch vụ bị ảnh hưởng, tin tức, cảnh báo giám sát dark web hoặc kiểm tra haveibeenpwned.com.',
        'Have I Been Pwned (HIBP) là dịch vụ miễn phí của nhà nghiên cứu bảo mật Troy Hunt, tổng hợp dữ liệu rò rỉ. Nhập địa chỉ email để xem vụ nào chứa thông tin của bạn. Dịch vụ hiện lập chỉ mục hơn 14 tỷ tài khoản bị xâm phạm trong 800+ vụ. HIBP còn có dịch vụ thông báo khi email xuất hiện trong vụ rò rỉ tương lai.',
        'Dấu hiệu tài khoản bị xâm phạm: email đặt lại mật khẩu bạn không yêu cầu; thông báo đăng nhập từ vị trí hoặc thiết bị lạ; thay đổi cài đặt bạn không thực hiện; người liên hệ nhận tin nhắn bạn không gửi; giao dịch lạ trên tài khoản tài chính. Nếu thấy bất kỳ dấu hiệu nào, hãy coi tài khoản đã bị xâm phạm ngay — đừng chờ thông báo chính thức.',
      ],
    },
    {
      heading: 'Hành động ngay: 30 phút đầu',
      paragraphs: [
        'Bước 1: đổi ngay mật khẩu tài khoản bị rò rỉ. Dùng trình quản lý tạo mật khẩu ngẫu nhiên 20+ ký tự. Nếu không vào được, hãy đặt lại qua cơ chế khôi phục (email, điện thoại, câu hỏi bảo mật).',
        'Bước 2: nếu đã dùng lại mật khẩu bị rò rỉ ở tài khoản khác, đổi ngay những mật khẩu đó. Đây là bước quan trọng nhất — tấn công nhồi thông tin đăng nhập bắt đầu trong vài giờ sau khi vụ rò rỉ được biết. Ưu tiên email, ngân hàng và lưu trữ đám mây.',
        'Bước 3: bật xác thực đa yếu tố (MFA) cho tài khoản bị rò rỉ và mọi tài khoản vừa đổi mật khẩu. Dùng ứng dụng TOTP (Google Authenticator, Authy, Microsoft Authenticator) hoặc khóa bảo mật phần cứng (YubiKey). Tránh MFA qua SMS nếu có thể vì dễ bị đổi SIM.',
        'Bước 4: kiểm tra hoạt động trái phép trên tài khoản bị rò rỉ. Xem phiên đăng nhập gần đây, ứng dụng đã kết nối, quy tắc chuyển tiếp email và cài đặt khôi phục. Kẻ tấn công thường tạo cơ chế duy trì truy cập — thêm email của chúng làm địa chỉ khôi phục hoặc kết nối ứng dụng OAuth — để sống sót sau khi đổi mật khẩu.',
      ],
    },
    {
      heading: 'Tài khoản email: mục tiêu ưu tiên',
      paragraphs: [
        'Tài khoản email là chìa khóa chính vào đời sống số của bạn. Hầu hết dịch vụ dùng email để đặt lại mật khẩu, nghĩa là kẻ kiểm soát email có thể chiếm gần như mọi tài khoản khác. Nếu thông tin email bị rò rỉ, tài khoản này ưu tiên tuyệt đối.',
        'Sau khi đổi mật khẩu email và bật MFA, hãy rà soát mọi khía cạnh: quy tắc chuyển tiếp (kẻ tấn công chuyển tới địa chỉ của chúng); ứng dụng kết nối và quyền OAuth; số điện thoại, email khôi phục; bộ lọc tự xóa hoặc lưu trữ email; và thư đã gửi để phát hiện lừa đảo.',
        'Với Gmail, vào myaccount.google.com/security để xem sự kiện bảo mật, thiết bị đăng nhập và quyền truy cập bên thứ ba. Với tài khoản Microsoft, dùng account.microsoft.com/security. Cả hai đều có nhật ký hoạt động gần đây.',
      ],
    },
    {
      heading: 'Tài khoản tài chính: bảo vệ tiền của bạn',
      paragraphs: [
        'Nếu vụ rò rỉ liên quan dịch vụ tài chính, hoặc bạn dùng lại mật khẩu bị rò rỉ ở tài khoản tài chính, hãy làm thêm ngay. Liên hệ ngân hàng và công ty thẻ để báo nguy cơ bị xâm phạm. Họ có thể gắn cờ tài khoản, phát hành số thẻ mới và tạm khóa khi cần.',
        'Đặt cảnh báo gian lận hoặc đóng băng tín dụng với Equifax, Experian và TransUnion. Cảnh báo buộc chủ nợ xác minh danh tính kỹ hơn; đóng băng mạnh hơn, chặn mọi tài khoản mới dưới tên bạn cho đến khi bạn gỡ.',
        'Theo dõi sao kê ngân hàng và thẻ hằng ngày trong ít nhất 30 ngày sau rò rỉ. Bật thông báo giao dịch cho mọi số tiền. Chú ý giao dịch thử nhỏ (1-5 USD) mà kẻ gian dùng để kiểm tra thẻ bị đánh cắp còn hoạt động trước khi mua lớn.',
        'Tại Ukraine và EU, theo dõi tài khoản qua ứng dụng ngân hàng và liên hệ bộ phận chống gian lận. Ngân hàng Quốc gia Ukraine có đường dây nóng về gian lận tài chính. Nếu phát hiện giao dịch trái phép, hãy báo cả ngân hàng và Cyberpolice (cyberpolice.gov.ua).',
      ],
    },
    {
      heading: 'Kiểm tra mật khẩu với cơ sở dữ liệu rò rỉ',
      paragraphs: [
        'Ngoài việc kiểm tra email, bạn nên xác minh mật khẩu cụ thể đã xuất hiện trong vụ rò rỉ nào chưa. API Have I Been Pwned Passwords cho phép kiểm tra mà không truyền mật khẩu. Nó dùng k-anonymity: chỉ gửi 5 ký tự đầu của hash SHA-1, nhận danh sách hash khớp để so sánh cục bộ.',
        'Phần lớn trình quản lý mật khẩu tích hợp kiểm tra rò rỉ. Watchtower của 1Password, báo cáo sức khỏe kho của Bitwarden và giám sát dark web của Dashlane đều dùng HIBP hoặc cơ sở dữ liệu tương tự để gắn cờ mật khẩu bị xâm phạm. Hãy chạy kiểm tra toàn kho và đổi mọi mật khẩu xuất hiện trong dữ liệu rò rỉ.',
        'Trình tạo mật khẩu của chúng tôi có công cụ kiểm tra rò rỉ tích hợp. Nhập mật khẩu để kiểm tra tức thì với cơ sở dữ liệu HIBP. Việc kiểm tra diễn ra hoàn toàn trong trình duyệt — mật khẩu đầy đủ không bao giờ được gửi tới máy chủ. Chỉ 5 ký tự đầu của hash được truyền, bảo vệ quyền riêng tư mà vẫn có dữ liệu rò rỉ thời gian thực.',
      ],
    },
    {
      heading: 'Chiến lược bảo vệ lâu dài',
      paragraphs: [
        'Hãy dùng trình quản lý mật khẩu nếu chưa có. Đây là bước hiệu quả nhất để tránh rò rỉ do dùng lại thông tin. Với trình quản lý, mỗi tài khoản có mật khẩu ngẫu nhiên riêng, nên một dịch vụ bị rò rỉ không lan sang tài khoản khác. Bitwarden (miễn phí, mã nguồn mở) và 1Password (2,99 USD/tháng) là lựa chọn tốt.',
        'Bật MFA trên mọi tài khoản hỗ trợ, ưu tiên email, ngân hàng, lưu trữ đám mây và mạng xã hội. Khóa bảo mật phần cứng (YubiKey, Titan) bảo vệ tốt nhất và chống lừa đảo trực tuyến. Nếu không có khóa phần cứng, dùng ứng dụng TOTP. Chỉ dùng SMS khi không còn cách nào khác.',
        'Đăng ký thông báo rò rỉ. HIBP có giám sát email miễn phí tại haveibeenpwned.com/NotifyMe. Google Password Checkup (tích hợp trong Chrome và tài khoản Google) cũng giám sát mật khẩu đã lưu với cơ sở dữ liệu rò rỉ. Bật các tính năng này để biết sớm thay vì vài tháng sau.',
        'Duy trì vệ sinh bảo mật: rà soát kho mỗi quý để tìm mật khẩu yếu hoặc cũ; kiểm tra ứng dụng kết nối và quyền OAuth; cập nhật phần mềm (nhiều vụ rò rỉ khai thác lỗ hổng đã biết); và cảnh giác lừa đảo trực tuyến — cách phổ biến nhất để lấy thông tin đăng nhập.',
      ],
      bullets: [
        'Dùng trình quản lý mật khẩu với mật khẩu riêng cho từng tài khoản',
        'Bật MFA trên mọi tài khoản (FIDO2 > TOTP > SMS)',
        'Đăng ký thông báo rò rỉ của HIBP',
        'Rà soát kho mật khẩu mỗi quý',
        'Kiểm tra quyền OAuth và ứng dụng kết nối thường xuyên',
        'Cập nhật mọi phần mềm',
        'Học cách nhận diện lừa đảo trực tuyến',
        'Đóng băng tín dụng nếu dữ liệu tài chính bị lộ',
      ],
    },
    {
      heading: 'Báo cáo và thủ tục pháp lý',
      paragraphs: [
        'Tại Ukraine, báo tội phạm mạng cho Cyberpolice tại cyberpolice.gov.ua hoặc gọi 0-800-505-170. Theo GDPR (áp dụng qua việc luật bảo vệ dữ liệu Ukraine hài hòa với tiêu chuẩn EU), bạn có quyền được thông báo về vụ rò rỉ ảnh hưởng dữ liệu của mình và yêu cầu dịch vụ bị rò rỉ xóa dữ liệu.',
        'Tại Mỹ, báo đánh cắp danh tính cho FTC tại identitytheft.gov để nhận kế hoạch khôi phục cá nhân hóa. Cũng nên báo cảnh sát địa phương — hồ sơ này có thể cần cho tranh chấp ngân hàng và tín dụng. Nếu hồ sơ y tế bị lộ, khiếu nại với Văn phòng Quyền Dân sự của HHS.',
        'Ghi lại mọi thứ: lưu email thông báo rò rỉ, chụp màn hình hoạt động trái phép, ghi ngày giờ các hành động ứng phó và giữ bản sao mọi thư từ với dịch vụ bị ảnh hưởng. Hồ sơ này cần thiết cho tranh chấp, bảo hiểm hoặc thủ tục pháp lý sau này.',
      ],
    },
  ],
};

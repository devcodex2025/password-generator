import type { LocalizedArticleContent } from '../articles';

export const en: LocalizedArticleContent = {
  title: 'Team Password Policy Template: A Ready-to-Use Framework',
  excerpt:
    'Use this comprehensive policy framework to standardize password security across your organization. Includes ready-to-adopt templates aligned with NIST 800-63B and PCI DSS v4.0.',
  seoTitle: 'Team Password Policy Template 2026 — NIST & PCI DSS Compliant | generatepasswordto.me',
  seoDescription:
    'Ready-to-use team password policy template aligned with NIST 800-63B and PCI DSS v4.0. Covers password creation, storage, rotation, MFA, incident response, and employee training requirements.',
  keywords: [
    'password policy template',
    'company password policy',
    'team security policy',
    'enterprise password guidelines',
    'password policy framework',
    'organizational password security',
  ],
  sections: [
    {
      heading: 'Why Your Team Needs a Written Password Policy',
      paragraphs: [
        'A written password policy transforms security from individual guesswork into organizational standard practice. Without one, team members use wildly different approaches: some use password managers with 20-character random passwords while others reuse "CompanyName2026" across every service. A clear policy eliminates this inconsistency and provides legal protection by demonstrating due diligence.',
        'Regulatory frameworks including PCI DSS, SOC 2, HIPAA, GDPR, and ISO 27001 require documented access control policies. During an audit or breach investigation, the first question is often "show me your password policy." Not having one — or having an outdated one — can result in compliance failures, higher fines, and greater liability.',
        'The policy template below is designed for teams of 5-500 people. It covers the essential requirements while remaining practical enough for daily use. Adapt the specific values (minimum lengths, rotation periods, tool choices) to your organization\'s risk profile and regulatory requirements.',
      ],
    },
    {
      heading: 'Section 1: Password Creation Requirements',
      paragraphs: [
        'Minimum password length: 14 characters for user accounts, 20 characters for administrative and service accounts. There is no maximum length limit. This exceeds the NIST 800-63B minimum (8) and PCI DSS v4.0 minimum (12) to provide additional margin against future advances in cracking technology.',
        'Complexity approach: we adopt the NIST-recommended approach of length over complexity. Passwords must not be exclusively numeric or exclusively alphabetic. Beyond this, no specific character class requirements are enforced. Users are encouraged but not forced to use mixed character types.',
        'Banned passwords: all passwords are checked against the Have I Been Pwned Passwords database at creation and change time. Passwords matching known breached credentials are rejected with a clear explanation. Additionally, passwords must not contain the user\'s username, email address, or the company name.',
        'Passphrase support: passphrases (sequences of random words) are encouraged as an alternative to random character passwords for credentials that must be memorized. A passphrase must contain at least 5 words from a large word list, with separators between words.',
      ],
      bullets: [
        'Minimum 14 characters for user accounts',
        'Minimum 20 characters for admin and service accounts',
        'No maximum length restriction',
        'Must not be exclusively numeric or exclusively alphabetic',
        'Checked against HIBP breached password database',
        'Must not contain username, email, or company name',
        'Passphrases of 5+ random words are accepted and encouraged',
      ],
    },
    {
      heading: 'Section 2: Password Manager Requirements',
      paragraphs: [
        'All team members must use the organization\'s approved password manager for all work-related accounts. The approved manager must: use AES-256 or XChaCha20 encryption; implement zero-knowledge architecture; have completed a third-party security audit within the past 24 months; support all platforms used by the team; and provide administrative controls for policy enforcement.',
        'Recommended options for teams: 1Password Business ($7.99/user/month) provides the most comprehensive admin controls, Watchtower breach monitoring, and travel mode. Bitwarden Teams ($4/user/month) offers excellent value with open-source transparency. Dashlane Business ($8/user/month) includes a VPN and dark web monitoring.',
        'Each team member must generate unique random passwords of at least 16 characters for every account. Password reuse across any accounts is prohibited. The password manager\'s built-in password generator must be used — human-created passwords are not permitted for work accounts.',
        'Master password requirements: the password manager master password must be a passphrase of at least 6 random words or a random password of at least 20 characters. This master password must be unique (not used for any other purpose) and must not be stored digitally outside the user\'s own memory. A paper backup may be kept in a locked personal safe during the initial memorization period.',
      ],
    },
    {
      heading: 'Section 3: Multi-Factor Authentication Policy',
      paragraphs: [
        'MFA is mandatory for all work accounts that support it. There are no exceptions for any user, including executives and temporary staff. MFA must be enabled within 24 hours of account creation. Accounts without MFA enabled after 48 hours will be suspended until MFA is configured.',
        'Approved MFA methods, in order of preference: FIDO2/WebAuthn hardware security keys (YubiKey 5 series, Google Titan); TOTP authenticator apps (Google Authenticator, Authy, Microsoft Authenticator); push notifications from the approved password manager; SMS-based codes (permitted only when no other method is available for a specific service).',
        'Hardware key requirements: team members with access to production systems, customer data, or financial systems must use hardware security keys as their primary MFA method. The organization provides two keys per qualifying employee — one for daily use and one backup stored securely at home. Lost keys must be reported within 2 hours.',
        'Backup and recovery: all MFA backup codes must be stored in the team password manager as a secure note. Each user must have at least two functional MFA methods registered for every critical account (e.g., hardware key + TOTP app). Recovery procedures are documented and tested annually.',
      ],
    },
    {
      heading: 'Section 4: Password Rotation and Lifecycle',
      paragraphs: [
        'Standard user accounts: passwords are NOT rotated on a fixed schedule. Consistent with NIST 800-63B guidance, mandatory periodic rotation is counterproductive. Passwords are changed only when: there is evidence of compromise; the password appears in a new breach database; the employee\'s role changes significantly; or the employee departs the organization.',
        'Administrative accounts: passwords are rotated every 180 days and immediately upon any suspicion of compromise. Admin passwords must be generated by the password manager (minimum 24 characters, fully random) and must never be shared.',
        'Service accounts and API keys: rotated every 90 days. All service account credentials must be stored in a secrets management system (HashiCorp Vault, AWS Secrets Manager, or equivalent) — never in source code, configuration files, or environment variables in shared repositories. Hard-coded credentials are a terminable offense.',
        'Departing employees: all passwords and access tokens associated with a departing employee must be rotated or revoked within 4 hours of departure notification. The IT team maintains a checklist of all systems requiring credential rotation when an employee leaves.',
      ],
    },
    {
      heading: 'Section 5: Incident Response for Credential Compromise',
      paragraphs: [
        'When a credential compromise is suspected or confirmed, the following procedure applies. Immediate (within 30 minutes): disable the compromised account; rotate the compromised credential; check for unauthorized access in audit logs; enable enhanced monitoring on the affected systems.',
        'Short-term (within 24 hours): determine the scope of compromise — what data was the account authorized to access? Review all actions taken by the compromised account in the past 30 days. If the compromised password was reused (a policy violation), rotate all accounts using that password. Notify affected parties as required by applicable regulations.',
        'Post-incident (within 7 days): conduct a root cause analysis documenting how the compromise occurred, what controls failed, and what process improvements are needed. Update the password policy if the incident reveals gaps. Provide targeted security training to the affected employee. Document the incident for compliance records.',
        'Breach notification timelines: GDPR requires notification within 72 hours of discovery; PCI DSS requires immediate notification to the payment brands; state-level breach notification laws vary. The legal team must be notified within 2 hours of any suspected breach involving customer data.',
      ],
    },
    {
      heading: 'Section 6: Training and Compliance',
      paragraphs: [
        'All employees must complete password security training within their first week and annually thereafter. Training covers: how to use the organization\'s password manager; how to create and manage passphrases; recognizing phishing attacks targeting credentials; proper handling of MFA devices and backup codes; and the incident reporting procedure.',
        'Compliance is verified through quarterly audits of the team password manager\'s health dashboard. Metrics tracked include: percentage of accounts using unique passwords; average password length; number of passwords appearing in breach databases; MFA adoption rate across all accounts; and time to remediate flagged issues.',
        'Policy violations are handled progressively: first violation receives additional training and a written warning; second violation receives a formal reprimand and mandatory supervised password hygiene session; third violation results in restricted system access pending a security review. Intentional violations (sharing credentials, disabling MFA, hard-coding secrets) may result in immediate disciplinary action.',
      ],
      bullets: [
        'Security training within first week + annual refresher',
        'Quarterly password health audits via manager dashboard',
        'Track: unique passwords, length, breach exposure, MFA rate',
        'Progressive discipline for policy violations',
        'Immediate action for intentional violations',
        'Document all training completion for compliance',
      ],
    },
    {
      heading: 'Adopting This Template',
      paragraphs: [
        'To implement this policy: first, get leadership buy-in by presenting the cost of credential-related breaches versus the cost of a password manager subscription. IBM reports the average breach costs $4.88 million — your password manager subscription is a fraction of a percent of that risk.',
        'Second, select and deploy your password manager before announcing the policy. Pre-configure team vaults, import any existing shared credentials, and create onboarding documentation. The smoother the transition, the higher the adoption rate.',
        'Third, announce the policy with a grace period (typically 30 days) for full compliance. During this period, provide hands-on help sessions where team members can set up their password managers, generate new passwords, and configure MFA with guidance from IT staff.',
        'Finally, review and update this policy at least annually. Security threats evolve, new tools emerge, and regulatory requirements change. Each review should incorporate lessons learned from any incidents during the previous year and feedback from team members about practical challenges.',
      ],
    },
  ],
};

export const ua: LocalizedArticleContent = {
  title: 'Шаблон політики паролів для команд: готовий фреймворк',
  excerpt:
    'Використовуйте цей комплексний фреймворк політики для стандартизації безпеки паролів у вашій організації. Включає готові шаблони, узгоджені з NIST 800-63B та PCI DSS v4.0.',
  seoTitle: 'Шаблон політики паролів для команд 2026 — NIST та PCI DSS | generatepasswordto.me',
  seoDescription:
    'Готовий шаблон політики паролів для команд, узгоджений з NIST 800-63B та PCI DSS v4.0. Створення, зберігання, ротація, MFA, реагування на інциденти та навчання співробітників.',
  keywords: [
    'шаблон політики паролів',
    'корпоративна політика паролів',
    'безпека паролів команди',
    'рекомендації паролів підприємства',
    'фреймворк політики паролів',
    'організаційна безпека паролів',
  ],
  sections: [
    {
      heading: 'Чому вашій команді потрібна письмова політика паролів',
      paragraphs: [
        'Письмова політика паролів перетворює безпеку з індивідуальних здогадок на організаційну стандартну практику. Без неї члени команди використовують кардинально різні підходи: одні користуються менеджерами паролів з 20-символьними випадковими паролями, інші повторно використовують "CompanyName2026" на кожному сервісі.',
        'Регуляторні фреймворки, включаючи PCI DSS, SOC 2, HIPAA, GDPR та ISO 27001, вимагають задокументованих політик контролю доступу. При аудиті або розслідуванні витоку перше питання часто: "покажіть вашу політику паролів." Відсутність або застарілість може призвести до провалу відповідності.',
        'Шаблон нижче розроблений для команд від 5 до 500 осіб. Адаптуйте конкретні значення під профіль ризику та регуляторні вимоги вашої організації.',
      ],
    },
    {
      heading: 'Розділ 1: Вимоги до створення паролів',
      paragraphs: [
        'Мінімальна довжина: 14 символів для облікових записів користувачів, 20 символів для адміністративних та сервісних. Максимальне обмеження довжини відсутнє. Це перевищує мінімум NIST (8) та PCI DSS v4.0 (12).',
        'Підхід до складності: ми приймаємо рекомендований NIST підхід довжини замість складності. Паролі не повинні бути виключно числовими або виключно буквеними. Додаткові вимоги до класів символів не нав\'язуються.',
        'Заборонені паролі: всі паролі перевіряються за базою Have I Been Pwned при створенні та зміні. Паролі не повинні містити ім\'я користувача, email або назву компанії.',
        'Підтримка парольних фраз: фрази з мінімум 5 випадкових слів з великого списку заохочуються як альтернатива для паролів, які потрібно запам\'ятати.',
      ],
      bullets: [
        'Мінімум 14 символів для користувачів',
        'Мінімум 20 символів для адмін та сервісних акаунтів',
        'Без обмеження максимальної довжини',
        'Не виключно числові та не виключно буквені',
        'Перевірка за базою HIBP скомпрометованих паролів',
        'Без імені користувача, email чи назви компанії',
        'Парольні фрази з 5+ слів прийнятні та заохочуються',
      ],
    },
    {
      heading: 'Розділ 2: Вимоги до менеджера паролів',
      paragraphs: [
        'Всі члени команди повинні використовувати затверджений менеджер паролів організації для всіх робочих акаунтів. Затверджений менеджер повинен: використовувати AES-256 або XChaCha20 шифрування; мати архітектуру zero-knowledge; пройти сторонній аудит безпеки протягом останніх 24 місяців.',
        'Рекомендовані опції: 1Password Business ($7.99/користувач/місяць) — найповніший адмін-контроль та Watchtower. Bitwarden Teams ($4/користувач/місяць) — відмінна вартість з відкритим кодом. Dashlane Business ($8/користувач/місяць) — включає VPN.',
        'Кожен член команди повинен генерувати унікальні випадкові паролі довжиною щонайменше 16 символів. Повторне використання паролів заборонене. Генератор менеджера паролів повинен використовуватися — створені людиною паролі не дозволені для робочих акаунтів.',
        'Мастер-пароль: парольна фраза з мінімум 6 випадкових слів або випадковий пароль з мінімум 20 символів. Повинен бути унікальним та не зберігатися цифрово поза пам\'яттю користувача.',
      ],
    },
    {
      heading: 'Розділ 3: Політика багатофакторної аутентифікації',
      paragraphs: [
        'MFA обов\'язкова для всіх робочих акаунтів. Винятків немає для жодного користувача, включаючи керівників та тимчасовий персонал. MFA повинна бути увімкнена протягом 24 годин після створення акаунту.',
        'Затверджені методи MFA за пріоритетом: FIDO2/WebAuthn апаратні ключі (YubiKey 5, Google Titan); TOTP-застосунки (Google Authenticator, Authy); push-повідомлення від менеджера паролів; SMS (лише коли інші методи недоступні).',
        'Вимоги до апаратних ключів: співробітники з доступом до продакшн-систем, даних клієнтів або фінансових систем повинні використовувати апаратні ключі. Організація надає два ключі на кваліфікованого працівника. Втрачені ключі повинні бути повідомлені протягом 2 годин.',
        'Резервне копіювання: всі резервні коди MFA зберігаються в менеджері паролів команди. Кожен користувач повинен мати щонайменше два функціональних методи MFA для кожного критичного акаунту.',
      ],
    },
    {
      heading: 'Розділ 4: Ротація та життєвий цикл паролів',
      paragraphs: [
        'Стандартні акаунти: паролі НЕ ротуються за фіксованим графіком. Відповідно до NIST 800-63B, обов\'язкова періодична ротація контрпродуктивна. Паролі змінюються лише при доказах компрометації, появі у базах витоків, суттєвій зміні ролі або звільненні.',
        'Адміністративні акаунти: ротація кожні 180 днів та негайно при підозрі компрометації. Мінімум 24 символи, повністю випадкові, ніколи не передаються.',
        'Сервісні акаунти та API-ключі: ротація кожні 90 днів. Зберігаються у системі управління секретами (HashiCorp Vault, AWS Secrets Manager) — ніколи у коді або конфігураційних файлах.',
        'Звільнення працівників: всі паролі та токени доступу повинні бути ротовані або відкликані протягом 4 годин після повідомлення про звільнення.',
      ],
    },
    {
      heading: 'Розділ 5: Реагування на інциденти',
      paragraphs: [
        'При підозрі або підтвердженні компрометації: негайно (30 хвилин) — вимкнути акаунт, ротувати облікові дані, перевірити аудит-логи, увімкнути посилений моніторинг.',
        'Короткостроково (24 години) — визначити обсяг компрометації, переглянути дії за останні 30 днів, ротувати всі акаунти з повторюваним паролем, повідомити заінтересовані сторони.',
        'Після інциденту (7 днів) — провести аналіз кореневих причин, оновити політику паролів, провести цільове навчання, задокументувати інцидент.',
        'Терміни повідомлення: GDPR — 72 години; PCI DSS — негайно; юридична команда — 2 години при витоку даних клієнтів.',
      ],
    },
    {
      heading: 'Розділ 6: Навчання та відповідність',
      paragraphs: [
        'Всі працівники проходять навчання з безпеки паролів протягом першого тижня та щорічно. Навчання охоплює: використання менеджера паролів; створення парольних фраз; розпізнавання фішингу; поводження з MFA-пристроями; процедуру звітування про інциденти.',
        'Відповідність перевіряється через щоквартальні аудити панелі здоров\'я менеджера паролів. Метрики: відсоток унікальних паролів; середня довжина; кількість паролів у базах витоків; рівень впровадження MFA; час усунення проблем.',
        'Порушення політики: перше — додаткове навчання та попередження; друге — офіційна догана та обов\'язкова сесія; третє — обмежений доступ. Навмисні порушення (передача паролів, вимкнення MFA, жорстке кодування секретів) можуть призвести до негайних дисциплінарних дій.',
      ],
      bullets: [
        'Навчання з безпеки в перший тиждень + щорічне оновлення',
        'Щоквартальні аудити здоров\'я паролів',
        'Метрики: унікальність, довжина, витоки, рівень MFA',
        'Прогресивна дисципліна за порушення',
        'Негайні дії за навмисні порушення',
        'Документування всіх навчань для відповідності',
      ],
    },
    {
      heading: 'Впровадження цього шаблону',
      paragraphs: [
        'Для впровадження: отримайте підтримку керівництва, представивши вартість витоків через облікові дані ($4.88 мільйона в середньому за IBM) проти вартості підписки на менеджер паролів.',
        'Оберіть та розгорніть менеджер паролів до оголошення політики. Попередньо налаштуйте командні сховища, імпортуйте існуючі облікові дані та створіть документацію з онбордингу.',
        'Оголосіть політику з пільговим періодом (зазвичай 30 днів). Проводьте сесії допомоги, де працівники налаштовують менеджери паролів та MFA за підтримки IT.',
        'Переглядайте та оновлюйте політику щонайменше щорічно з урахуванням інцидентів та зворотного зв\'язку команди.',
      ],
    },
  ],
};

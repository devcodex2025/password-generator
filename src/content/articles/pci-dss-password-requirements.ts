import type { LocalizedArticleContent } from '../articles';

export const en: LocalizedArticleContent = {
  title: 'PCI DSS Password Requirements for Teams in 2026',
  excerpt:
    'What PCI DSS v4.0 expects from password controls and how to align your team workflow without harming UX. Covers authentication requirements, password policies, and practical implementation strategies.',
  seoTitle: 'PCI DSS Password Requirements 2026 — Team Compliance Guide | generatepasswordto.me',
  seoDescription:
    'Complete guide to PCI DSS v4.0 password requirements. Covers minimum length, MFA mandates, service account controls, password rotation policies, and team implementation strategies.',
  keywords: [
    'PCI DSS password requirements',
    'PCI compliance password policy',
    'PCI DSS v4.0 authentication',
    'payment security passwords',
    'PCI password length',
    'compliance password guide',
  ],
  sections: [
    {
      heading: 'Understanding PCI DSS and Why It Matters',
      paragraphs: [
        'The Payment Card Industry Data Security Standard (PCI DSS) is a set of security requirements designed to protect cardholder data. Any organization that processes, stores, or transmits credit card information must comply. Version 4.0, released in March 2022 with a mandatory compliance deadline of March 31, 2025 (and extended requirements by March 2026), introduces significant changes to authentication requirements.',
        'Non-compliance can result in fines ranging from $5,000 to $100,000 per month, increased transaction fees, loss of the ability to process card payments, and liability for fraud losses. Beyond penalties, a breach involving cardholder data destroys customer trust and can result in class-action lawsuits.',
        'PCI DSS v4.0 aligns more closely with modern security practices, including NIST 800-63B recommendations. It acknowledges that rigid legacy password rules often reduce security by encouraging predictable user behavior. The updated standard provides more flexibility in how requirements are met while raising the bar for authentication overall.',
      ],
    },
    {
      heading: 'Password Length and Complexity in PCI DSS v4.0',
      paragraphs: [
        'PCI DSS v4.0 Requirement 8.3.6 specifies that passwords must be at least 12 characters (increased from the previous 7-character minimum). If the system cannot support 12 characters, the absolute minimum remains 8 characters, but this exception must be documented and justified. Organizations should plan to support 12+ characters across all systems.',
        'For complexity, PCI DSS v4.0 Requirement 8.3.6 mandates that passwords contain both numeric and alphabetic characters. While this is less demanding than many legacy policies that required uppercase, lowercase, digits, and symbols, it sets a baseline that prevents purely numeric PINs or purely alphabetic words from being used as system passwords.',
        'Importantly, PCI DSS v4.0 introduces a "customized approach" (Requirement 8.3.6.a) that allows organizations to use alternative authentication mechanisms (such as passphrases or longer minimum lengths without complexity mandates) if they can demonstrate equivalent or greater security through a documented risk analysis.',
      ],
    },
    {
      heading: 'Multi-Factor Authentication Requirements',
      paragraphs: [
        'PCI DSS v4.0 Requirement 8.4.2 mandates MFA for all access to the cardholder data environment (CDE), not just remote access as previously required. This is one of the most impactful changes. Every person accessing systems that store, process, or transmit cardholder data must authenticate with at least two of the three factors: knowledge (password), possession (token, smart card), or inherence (biometric).',
        'Requirement 8.4.3 extends MFA to all remote network access originating from outside the entity\'s network. This applies to VPN connections, remote desktop sessions, and any administrative access from external locations. The MFA must be implemented at the network or system level, not just the application level.',
        'For MFA implementation, PCI DSS requires that the authentication factors be independent — compromising one factor should not affect the integrity of other factors. The standard also requires that MFA cannot be bypassed by any user, including administrators. Replay resistance is mandatory: each authentication attempt must produce a unique, time-limited token.',
      ],
    },
    {
      heading: 'Password Change and Rotation Policies',
      paragraphs: [
        'PCI DSS v4.0 Requirement 8.3.9 mandates that user passwords be changed at least every 90 days. This diverges from NIST 800-63B, which recommends against periodic rotation. However, PCI DSS v4.0 provides the customized approach option: organizations can eliminate periodic rotation if they implement continuous, real-time analysis of each account\'s security posture through automated monitoring of compromise indicators.',
        'When passwords are changed, the new password must not be the same as any of the last four passwords used (Requirement 8.3.7). This prevents the simplest form of rotation gaming but does not fully address incremental changes. Organizations should consider checking for similarity to previous passwords as an additional control.',
        'For service accounts and application passwords, PCI DSS v4.0 Requirement 8.6.3 introduces new controls: passwords for service accounts must be changed periodically (at least every 12 months) and upon suspicion of compromise. Interactive service account passwords must be managed with the same rigor as user passwords. Hard-coded passwords in scripts and applications are explicitly prohibited.',
      ],
    },
    {
      heading: 'Account Lockout and Session Management',
      paragraphs: [
        'Requirement 8.3.4 mandates that user accounts be temporarily locked after no more than 10 invalid login attempts. The lockout duration must be at least 30 minutes, or until an administrator re-enables the account. This protects against online brute-force attacks while maintaining usability.',
        'Session idle timeout (Requirement 8.2.8) requires that sessions be automatically terminated after 15 minutes of inactivity. This prevents unauthorized access when users walk away from unlocked workstations. For systems where constant interaction is impractical (such as monitoring dashboards), alternative controls like screen locks with re-authentication may be acceptable.',
        'PCI DSS v4.0 also requires that all authentication credentials be encrypted during transmission (Requirement 8.3.2) and storage (Requirement 8.3.1). Passwords must never be stored in reversible encryption or plain text. The standard explicitly requires one-way hashing with a unique salt for each credential.',
      ],
    },
    {
      heading: 'Practical Implementation for Teams',
      paragraphs: [
        'Deploying a password manager across your team is the most effective way to meet PCI DSS password requirements while maintaining productivity. 1Password Business, Bitwarden Organizations, or Dashlane Business provide centralized policy enforcement, shared vaults for team credentials, automatic password generation meeting length and complexity requirements, and audit trails for compliance documentation.',
        'For service accounts and application credentials, use a secrets management solution like HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault. These tools provide automatic rotation, access logging, and encryption at rest — addressing Requirements 8.6.2, 8.6.3, and 8.3.1 in one solution.',
        'Document your password policy in writing, including: minimum length (12+ characters), complexity requirements, change frequency (90 days for users, 12 months for service accounts), MFA deployment scope, lockout thresholds, and session timeout settings. This documentation is required for PCI DSS compliance assessments.',
        'Train your team annually on password security practices. PCI DSS Requirement 12.6 mandates security awareness training that covers safe password creation, recognizing phishing attempts, and proper handling of authentication credentials. Track completion and keep records for audit purposes.',
      ],
      bullets: [
        'Deploy a team password manager (1Password Business, Bitwarden Org)',
        'Use secrets management for service accounts (Vault, AWS Secrets Manager)',
        'Document your complete password policy in writing',
        'Conduct annual security awareness training with records',
        'Implement MFA on all CDE access points',
        'Set up automated lockout after 10 failed login attempts',
        'Configure 15-minute idle session timeouts',
        'Schedule quarterly password policy reviews',
      ],
    },
    {
      heading: 'Common Compliance Pitfalls',
      paragraphs: [
        'Shared accounts are a frequent audit finding. PCI DSS Requirement 8.2.1 mandates that all users be assigned a unique ID before accessing system components. Shared admin accounts, shared root passwords, and generic team logins must be eliminated. Each person must have individual, traceable credentials.',
        'Hard-coded passwords in application code or configuration files violate Requirement 8.6.2. Scan your codebase for embedded credentials and migrate them to environment variables or a secrets manager. Common hiding spots include database connection strings, API integration files, deployment scripts, and Docker compose files.',
        'Vendor default passwords must be changed before any system goes into production (Requirement 2.1.1). This includes network equipment, software installations, database servers, and IoT devices. Maintain an inventory of all default credentials and verify they have been changed during system setup.',
        'Inadequate logging is another common failure. PCI DSS requires that all authentication events (successful logins, failed attempts, password changes, account lockouts) be logged with timestamps and user identification. These logs must be reviewed daily and retained for at least one year, with three months immediately available for analysis.',
      ],
    },
  ],
};

export const ua: LocalizedArticleContent = {
  title: 'Вимоги PCI DSS до паролів для команд у 2026 році',
  excerpt:
    'Що PCI DSS v4.0 вимагає від контролю паролів та як привести робочий процес команди у відповідність без шкоди для зручності. Вимоги до аутентифікації, політики паролів та практичні стратегії впровадження.',
  seoTitle: 'Вимоги PCI DSS до паролів 2026 — гід для команд | generatepasswordto.me',
  seoDescription:
    'Повний гід з вимог PCI DSS v4.0 до паролів. Мінімальна довжина, вимоги MFA, контроль сервісних акаунтів, ротація паролів та стратегії впровадження для команд.',
  keywords: [
    'вимоги PCI DSS до паролів',
    'PCI відповідність політика паролів',
    'PCI DSS v4.0 аутентифікація',
    'безпека платежів паролі',
    'PCI довжина пароля',
    'гід відповідності паролів',
  ],
  sections: [
    {
      heading: 'Розуміння PCI DSS та чому це важливо',
      paragraphs: [
        'Payment Card Industry Data Security Standard (PCI DSS) — це набір вимог безпеки, розроблених для захисту даних власників карток. Будь-яка організація, що обробляє, зберігає або передає інформацію кредитних карток, повинна відповідати цим вимогам. Версія 4.0, випущена у березні 2022 з обов\'язковим терміном відповідності 31 березня 2025 (та розширеними вимогами до березня 2026), вводить значні зміни у вимогах до аутентифікації.',
        'Невідповідність може призвести до штрафів від $5 000 до $100 000 на місяць, підвищених комісій за транзакції, втрати можливості обробляти карткові платежі та відповідальності за збитки від шахрайства. Окрім штрафів, витік даних власників карток руйнує довіру клієнтів і може призвести до колективних позовів.',
        'PCI DSS v4.0 більш тісно узгоджується з сучасними практиками безпеки, включаючи рекомендації NIST 800-63B. Він визнає, що жорсткі застарілі правила паролів часто знижують безпеку, заохочуючи передбачувану поведінку користувачів.',
      ],
    },
    {
      heading: 'Довжина та складність пароля в PCI DSS v4.0',
      paragraphs: [
        'PCI DSS v4.0 Вимога 8.3.6 вказує, що паролі повинні бути не менше 12 символів (збільшено з попереднього мінімуму 7 символів). Якщо система не може підтримувати 12 символів, абсолютний мінімум залишається 8 символів, але цей виняток повинен бути задокументований та обґрунтований.',
        'Щодо складності, PCI DSS v4.0 Вимога 8.3.6 вимагає, щоб паролі містили як цифрові, так і буквені символи. Хоча це менш вимогливо, ніж багато застарілих політик, це встановлює базову лінію.',
        'Важливо, що PCI DSS v4.0 вводить "кастомізований підхід" (Вимога 8.3.6.a), що дозволяє організаціям використовувати альтернативні механізми аутентифікації, якщо вони можуть продемонструвати еквівалентну або вищу безпеку через задокументований аналіз ризиків.',
      ],
    },
    {
      heading: 'Вимоги до багатофакторної аутентифікації',
      paragraphs: [
        'PCI DSS v4.0 Вимога 8.4.2 вимагає MFA для всього доступу до середовища даних власників карток (CDE), а не лише для віддаленого доступу. Кожна особа, що отримує доступ до систем з даними карток, повинна аутентифікуватися щонайменше двома з трьох факторів: знання (пароль), володіння (токен, смарт-карта) або біометрія.',
        'Вимога 8.4.3 поширює MFA на весь віддалений мережевий доступ ззовні. Це стосується VPN-з\'єднань, сесій віддаленого робочого столу та будь-якого адміністративного доступу з зовнішніх локацій.',
        'Для впровадження MFA, PCI DSS вимагає, щоб фактори аутентифікації були незалежними. MFA не може бути обійдена жодним користувачем, включаючи адміністраторів. Стійкість до повторного відтворення є обов\'язковою.',
      ],
    },
    {
      heading: 'Політики зміни та ротації паролів',
      paragraphs: [
        'PCI DSS v4.0 Вимога 8.3.9 вимагає зміни паролів користувачів щонайменше кожні 90 днів. Це розходиться з NIST 800-63B. Однак PCI DSS v4.0 надає кастомізований підхід: організації можуть усунути періодичну ротацію, якщо впровадять безперервний аналіз стану безпеки кожного акаунту.',
        'Новий пароль не повинен збігатися з жодним з останніх чотирьох використаних паролів (Вимога 8.3.7).',
        'Для сервісних акаунтів, Вимога 8.6.3 вводить нові контролі: паролі повинні змінюватися періодично (щонайменше раз на 12 місяців) та при підозрі на компрометацію. Жорстко закодовані паролі у скриптах та застосунках явно заборонені.',
      ],
    },
    {
      heading: 'Блокування акаунтів та управління сесіями',
      paragraphs: [
        'Вимога 8.3.4 вимагає тимчасового блокування акаунтів після не більше 10 невдалих спроб входу. Тривалість блокування — щонайменше 30 хвилин або до розблокування адміністратором.',
        'Тайм-аут неактивності сесії (Вимога 8.2.8) вимагає автоматичного завершення сесій після 15 хвилин неактивності.',
        'PCI DSS v4.0 також вимагає шифрування всіх облікових даних при передачі та зберіганні. Паролі ніколи не повинні зберігатися у зворотному шифруванні або відкритому тексті.',
      ],
    },
    {
      heading: 'Практичне впровадження для команд',
      paragraphs: [
        'Розгортання менеджера паролів по всій команді — найефективніший спосіб задовольнити вимоги PCI DSS, зберігаючи продуктивність. 1Password Business, Bitwarden Organizations або Dashlane Business забезпечують централізоване застосування політик, спільні сховища та аудит-трейли.',
        'Для сервісних акаунтів використовуйте рішення для управління секретами, такі як HashiCorp Vault, AWS Secrets Manager або Azure Key Vault. Ці інструменти забезпечують автоматичну ротацію, журналювання доступу та шифрування.',
        'Задокументуйте політику паролів у письмовому вигляді та проводьте щорічне навчання команди з безпеки паролів.',
      ],
      bullets: [
        'Розгорніть командний менеджер паролів (1Password Business, Bitwarden Org)',
        'Використовуйте управління секретами для сервісних акаунтів (Vault, AWS SM)',
        'Задокументуйте повну політику паролів',
        'Проводьте щорічне навчання з безпеки',
        'Впровадьте MFA на всіх точках доступу до CDE',
        'Блокування після 10 невдалих спроб входу',
        'Тайм-аут сесії 15 хвилин неактивності',
        'Квартальний перегляд політики паролів',
      ],
    },
    {
      heading: 'Поширені помилки при забезпеченні відповідності',
      paragraphs: [
        'Спільні акаунти — часта знахідка аудиту. PCI DSS Вимога 8.2.1 вимагає призначення унікального ID кожному користувачу. Спільні адмін-акаунти та загальні командні логіни повинні бути усунені.',
        'Жорстко закодовані паролі у коді застосунку порушують Вимогу 8.6.2. Проскануйте кодову базу на вбудовані облікові дані та перенесіть їх у змінні середовища або менеджер секретів.',
        'Паролі вендорів за замовчуванням повинні бути змінені до введення будь-якої системи в продакшн (Вимога 2.1.1). Це включає мережеве обладнання, програмні установки, сервери баз даних та IoT-пристрої.',
        'Неадекватне журналювання — ще одна поширена помилка. PCI DSS вимагає журналювання всіх подій аутентифікації з мітками часу та ідентифікацією користувачів. Ці журнали повинні переглядатися щодня та зберігатися щонайменше один рік.',
      ],
    },
  ],
};

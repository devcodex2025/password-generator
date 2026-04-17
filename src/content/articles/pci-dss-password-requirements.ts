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

export const es: LocalizedArticleContent = {
  title: 'Requisitos de contraseñas PCI DSS para equipos en 2026',
  excerpt: 'Lo que PCI DSS v4.0 espera de los controles de contraseñas y cómo alinear el flujo de trabajo de tu equipo sin dañar la UX. Cubre requisitos de autenticación, políticas y estrategias de implementación.',
  seoTitle: 'Requisitos de contraseñas PCI DSS 2026 — Guía de cumplimiento | generatepasswordto.me',
  seoDescription: 'Guía completa de requisitos de contraseñas PCI DSS v4.0. Longitud mínima, MFA obligatorio, cuentas de servicio, rotación y estrategias para equipos.',
  keywords: ['requisitos contraseñas PCI DSS', 'cumplimiento PCI contraseñas', 'autenticación PCI DSS v4.0', 'seguridad pagos contraseñas', 'longitud contraseña PCI', 'guía cumplimiento contraseñas'],
  sections: [
    { heading: 'Entendiendo PCI DSS y por qué importa', paragraphs: ['PCI DSS es un conjunto de requisitos de seguridad diseñados para proteger datos de tarjetahabientes. La versión 4.0 introduce cambios significativos en requisitos de autenticación, con fecha límite de cumplimiento en marzo 2026.', 'El incumplimiento puede resultar en multas de $5.000 a $100.000 mensuales, pérdida de la capacidad de procesar pagos y responsabilidad por pérdidas de fraude.', 'PCI DSS v4.0 se alinea más con prácticas modernas como NIST 800-63B, ofreciendo más flexibilidad en cómo se cumplen los requisitos.'] },
    { heading: 'Longitud y complejidad en PCI DSS v4.0', paragraphs: ['El Requisito 8.3.6 especifica que las contraseñas deben tener al menos 12 caracteres (aumentado desde el mínimo previo de 7). Si el sistema no soporta 12, el mínimo absoluto es 8, pero debe documentarse.', 'Para complejidad, se requiere que las contraseñas contengan caracteres numéricos y alfabéticos. Esto es menos exigente que muchas políticas legacy.', 'PCI DSS v4.0 introduce un "enfoque personalizado" que permite mecanismos alternativos si se puede demostrar seguridad equivalente mediante un análisis de riesgo documentado.'] },
    { heading: 'Requisitos de autenticación multifactor', paragraphs: ['El Requisito 8.4.2 exige MFA para todo acceso al entorno de datos de tarjetahabientes (CDE), no solo acceso remoto. Cada persona debe autenticarse con al menos dos de tres factores.', 'El Requisito 8.4.3 extiende MFA a todo acceso remoto desde fuera de la red. Aplica a VPN, escritorio remoto y acceso administrativo externo.', 'Los factores deben ser independientes — comprometer uno no debe afectar la integridad de otros. El MFA no puede ser evadido por ningún usuario, incluidos administradores.'] },
    { heading: 'Políticas de cambio y rotación de contraseñas', paragraphs: ['El Requisito 8.3.9 exige que las contraseñas se cambien cada 90 días. Esto difiere de NIST 800-63B. Sin embargo, el enfoque personalizado permite eliminar la rotación periódica si se implementa análisis continuo de seguridad.', 'La nueva contraseña no puede ser igual a las últimas cuatro (Requisito 8.3.7).', 'Para cuentas de servicio, las contraseñas deben cambiarse al menos cada 12 meses y ante sospecha de compromiso. Las contraseñas hardcodeadas están explícitamente prohibidas.'] },
    { heading: 'Bloqueo de cuentas y gestión de sesiones', paragraphs: ['Bloqueo temporal tras máximo 10 intentos inválidos, por al menos 30 minutos (Requisito 8.3.4).', 'Timeout de sesión inactiva tras 15 minutos (Requisito 8.2.8).', 'Todas las credenciales deben cifrarse durante transmisión y almacenamiento. Nunca almacenar en texto plano o cifrado reversible.'] },
    { heading: 'Implementación práctica para equipos', paragraphs: ['Desplegar un gestor de contraseñas (1Password Business, Bitwarden Organizations) es la forma más efectiva de cumplir. Proporcionan enforcement centralizado, bóvedas compartidas y pistas de auditoría.', 'Para cuentas de servicio, usar soluciones de gestión de secretos como HashiCorp Vault o AWS Secrets Manager.', 'Documentar la política por escrito y realizar capacitación anual de seguridad (Requisito 12.6).'], bullets: ['Desplegar gestor de contraseñas para el equipo', 'Gestión de secretos para cuentas de servicio', 'Documentar la política completa por escrito', 'Capacitación anual de seguridad con registros', 'MFA en todos los puntos de acceso al CDE', 'Bloqueo automático tras 10 intentos fallidos', 'Timeout de sesión inactiva de 15 minutos', 'Revisión trimestral de la política'] },
    { heading: 'Errores comunes de cumplimiento', paragraphs: ['Cuentas compartidas violan el Requisito 8.2.1 que exige ID único por usuario.', 'Contraseñas hardcodeadas en código violan el Requisito 8.6.2. Escanear el código y migrar a variables de entorno.', 'Las contraseñas predeterminadas de proveedores deben cambiarse antes de producción (Requisito 2.1.1).', 'El registro inadecuado es otro error común. PCI DSS requiere registrar todos los eventos de autenticación.'] },
  ],
};

export const fr: LocalizedArticleContent = {
  title: 'Exigences PCI DSS pour les mots de passe d\'équipe en 2026',
  excerpt: 'Ce que PCI DSS v4.0 attend des contrôles de mots de passe et comment aligner votre flux de travail d\'équipe. Couvre les exigences d\'authentification, les politiques et les stratégies d\'implémentation.',
  seoTitle: 'Exigences PCI DSS mots de passe 2026 — Guide de conformité | generatepasswordto.me',
  seoDescription: 'Guide complet des exigences PCI DSS v4.0 pour les mots de passe. Longueur minimale, MFA obligatoire, comptes de service, rotation et stratégies d\'équipe.',
  keywords: ['exigences mots de passe PCI DSS', 'conformité PCI mots de passe', 'authentification PCI DSS v4.0', 'sécurité paiements mots de passe', 'longueur mot de passe PCI', 'guide conformité mots de passe'],
  sections: [
    { heading: 'Comprendre PCI DSS et son importance', paragraphs: ['PCI DSS est un ensemble d\'exigences de sécurité pour protéger les données des titulaires de cartes. La version 4.0 introduit des changements majeurs, avec une date limite de conformité en mars 2026.', 'La non-conformité peut entraîner des amendes de 5 000 à 100 000 $ par mois et la perte de la capacité de traiter les paiements.', 'PCI DSS v4.0 s\'aligne davantage sur les pratiques modernes comme NIST 800-63B.'] },
    { heading: 'Longueur et complexité dans PCI DSS v4.0', paragraphs: ['L\'Exigence 8.3.6 spécifie au moins 12 caractères (augmenté de 7). Si le système ne supporte pas 12, le minimum absolu est 8 caractères, avec documentation.', 'Les mots de passe doivent contenir des caractères numériques et alphabétiques.', 'L\'« approche personnalisée » permet des mécanismes alternatifs avec une analyse de risque documentée.'] },
    { heading: 'Exigences d\'authentification multifacteur', paragraphs: ['L\'Exigence 8.4.2 impose le MFA pour tout accès au CDE, pas seulement l\'accès distant.', 'L\'Exigence 8.4.3 étend le MFA à tout accès réseau distant.', 'Les facteurs doivent être indépendants et le MFA ne peut être contourné par aucun utilisateur.'] },
    { heading: 'Politiques de changement et rotation', paragraphs: ['Changement tous les 90 jours (Exigence 8.3.9). L\'approche personnalisée permet d\'éliminer la rotation avec un suivi continu.', 'Le nouveau mot de passe ne peut pas être parmi les 4 derniers (Exigence 8.3.7).', 'Les comptes de service doivent changer au moins tous les 12 mois. Les mots de passe codés en dur sont interdits.'] },
    { heading: 'Verrouillage de compte et gestion de session', paragraphs: ['Verrouillage après maximum 10 tentatives invalides, pour au moins 30 minutes.', 'Timeout de session inactive après 15 minutes.', 'Toutes les données d\'authentification doivent être chiffrées en transit et au repos.'] },
    { heading: 'Implémentation pratique pour les équipes', paragraphs: ['Déployer un gestionnaire de mots de passe d\'équipe (1Password Business, Bitwarden Organizations) est la solution la plus efficace.', 'Pour les comptes de service, utiliser des solutions de gestion de secrets (HashiCorp Vault, AWS Secrets Manager).', 'Documenter la politique et former l\'équipe annuellement (Exigence 12.6).'], bullets: ['Déployer un gestionnaire de mots de passe d\'équipe', 'Gestion de secrets pour les comptes de service', 'Documenter la politique par écrit', 'Formation annuelle de sécurité', 'MFA sur tous les points d\'accès au CDE', 'Verrouillage après 10 tentatives échouées', 'Timeout de session inactive de 15 minutes', 'Révision trimestrielle de la politique'] },
    { heading: 'Erreurs courantes de conformité', paragraphs: ['Les comptes partagés violent l\'Exigence 8.2.1 exigeant un ID unique par utilisateur.', 'Les mots de passe codés en dur violent l\'Exigence 8.6.2.', 'Les mots de passe par défaut des fournisseurs doivent être changés avant la production (Exigence 2.1.1).', 'La journalisation inadéquate est une autre erreur courante.'] },
  ],
};

export const de: LocalizedArticleContent = {
  title: 'PCI DSS Passwortanforderungen für Teams 2026',
  excerpt: 'Was PCI DSS v4.0 von Passwortkontrollen erwartet und wie Sie den Team-Workflow anpassen. Authentifizierungsanforderungen, Passwortrichtlinien und Implementierungsstrategien.',
  seoTitle: 'PCI DSS Passwortanforderungen 2026 — Team-Compliance-Leitfaden | generatepasswordto.me',
  seoDescription: 'Vollständiger Leitfaden zu PCI DSS v4.0 Passwortanforderungen. Mindestlänge, MFA-Pflicht, Service-Konten, Rotation und Team-Strategien.',
  keywords: ['PCI DSS Passwortanforderungen', 'PCI Compliance Passwortrichtlinie', 'PCI DSS v4.0 Authentifizierung', 'Zahlungssicherheit Passwörter', 'PCI Passwortlänge', 'Compliance Passwort-Leitfaden'],
  sections: [
    { heading: 'PCI DSS verstehen und warum es wichtig ist', paragraphs: ['PCI DSS ist ein Sicherheitsstandard zum Schutz von Karteninhaberdaten. Version 4.0 bringt wesentliche Änderungen bei Authentifizierungsanforderungen mit Frist März 2026.', 'Nichtkonformität kann Strafen von $5.000 bis $100.000 monatlich und Verlust der Zahlungsverarbeitung bedeuten.', 'PCI DSS v4.0 orientiert sich stärker an modernen Praktiken wie NIST 800-63B.'] },
    { heading: 'Länge und Komplexität in PCI DSS v4.0', paragraphs: ['Anforderung 8.3.6: mindestens 12 Zeichen (erhöht von 7). Absolutes Minimum 8 Zeichen mit Dokumentation.', 'Passwörter müssen numerische und alphabetische Zeichen enthalten.', 'Der „angepasste Ansatz" erlaubt alternative Mechanismen mit dokumentierter Risikoanalyse.'] },
    { heading: 'Multi-Faktor-Authentifizierung', paragraphs: ['Anforderung 8.4.2: MFA für allen CDE-Zugang, nicht nur Remote.', 'Anforderung 8.4.3: MFA für allen Remote-Netzwerkzugang.', 'Faktoren müssen unabhängig sein und MFA kann von niemandem umgangen werden.'] },
    { heading: 'Passwortänderung und Rotation', paragraphs: ['Änderung alle 90 Tage (Anforderung 8.3.9). Der angepasste Ansatz erlaubt Verzicht auf Rotation mit kontinuierlicher Überwachung.', 'Neues Passwort darf nicht unter den letzten 4 sein (Anforderung 8.3.7).', 'Service-Konten: Änderung mindestens alle 12 Monate. Hart-kodierte Passwörter sind verboten.'] },
    { heading: 'Kontosperre und Session-Verwaltung', paragraphs: ['Sperre nach maximal 10 Fehlversuchen für mindestens 30 Minuten.', 'Session-Timeout nach 15 Minuten Inaktivität.', 'Alle Authentifizierungsdaten müssen verschlüsselt übertragen und gespeichert werden.'] },
    { heading: 'Praktische Implementierung für Teams', paragraphs: ['Einen Team-Passwort-Manager einsetzen (1Password Business, Bitwarden Organizations) ist am effektivsten.', 'Für Service-Konten: Secrets-Management (HashiCorp Vault, AWS Secrets Manager).', 'Richtlinie dokumentieren und jährliche Schulung durchführen (Anforderung 12.6).'], bullets: ['Team-Passwort-Manager einsetzen', 'Secrets-Management für Service-Konten', 'Vollständige Richtlinie dokumentieren', 'Jährliche Sicherheitsschulung', 'MFA an allen CDE-Zugangspunkten', 'Automatische Sperre nach 10 Fehlversuchen', '15-Minuten-Session-Timeout', 'Vierteljährliche Richtlinienüberprüfung'] },
    { heading: 'Häufige Compliance-Fehler', paragraphs: ['Gemeinsam genutzte Konten verstoßen gegen Anforderung 8.2.1 (einzigartige ID pro Benutzer).', 'Hart-kodierte Passwörter verstoßen gegen Anforderung 8.6.2.', 'Hersteller-Standardpasswörter müssen vor Produktion geändert werden (Anforderung 2.1.1).', 'Unzureichende Protokollierung ist ein weiterer häufiger Fehler.'] },
  ],
};

export const it: LocalizedArticleContent = {
  title: 'Requisiti password PCI DSS per team nel 2026',
  excerpt: 'Cosa richiede PCI DSS v4.0 per i controlli password e come allineare il workflow del team. Copre requisiti di autenticazione, politiche e strategie di implementazione.',
  seoTitle: 'Requisiti password PCI DSS 2026 — Guida alla conformità | generatepasswordto.me',
  seoDescription: 'Guida completa ai requisiti password PCI DSS v4.0. Lunghezza minima, MFA obbligatorio, account di servizio, rotazione e strategie per team.',
  keywords: ['requisiti password PCI DSS', 'conformità PCI password', 'autenticazione PCI DSS v4.0', 'sicurezza pagamenti password', 'lunghezza password PCI', 'guida conformità password'],
  sections: [
    { heading: 'Capire PCI DSS e perché è importante', paragraphs: ['PCI DSS è un insieme di requisiti di sicurezza per proteggere i dati dei titolari di carta. La versione 4.0 introduce cambiamenti significativi nell\'autenticazione, con scadenza marzo 2026.', 'La non conformità può comportare multe da $5.000 a $100.000 mensili e perdita della capacità di elaborare pagamenti.', 'PCI DSS v4.0 si allinea maggiormente con le pratiche moderne come NIST 800-63B.'] },
    { heading: 'Lunghezza e complessità in PCI DSS v4.0', paragraphs: ['Il Requisito 8.3.6 specifica almeno 12 caratteri (aumentato da 7). Minimo assoluto 8 con documentazione.', 'Le password devono contenere caratteri numerici e alfabetici.', 'L\'\"approccio personalizzato\" permette meccanismi alternativi con analisi di rischio documentata.'] },
    { heading: 'Requisiti di autenticazione multifattore', paragraphs: ['Il Requisito 8.4.2 impone MFA per tutto l\'accesso al CDE, non solo remoto.', 'Il Requisito 8.4.3 estende MFA a tutto l\'accesso di rete remoto.', 'I fattori devono essere indipendenti e il MFA non può essere aggirato da nessuno.'] },
    { heading: 'Politiche di cambio e rotazione password', paragraphs: ['Cambio ogni 90 giorni (Requisito 8.3.9). L\'approccio personalizzato permette di eliminare la rotazione con monitoraggio continuo.', 'La nuova password non può essere tra le ultime 4 (Requisito 8.3.7).', 'Account di servizio: cambio almeno ogni 12 mesi. Password hardcoded vietate.'] },
    { heading: 'Blocco account e gestione sessioni', paragraphs: ['Blocco dopo massimo 10 tentativi per almeno 30 minuti.', 'Timeout sessione inattiva dopo 15 minuti.', 'Tutte le credenziali devono essere cifrate in transito e a riposo.'] },
    { heading: 'Implementazione pratica per team', paragraphs: ['Distribuire un gestore password per team (1Password Business, Bitwarden Organizations) è la soluzione più efficace.', 'Per account di servizio: gestione segreti (HashiCorp Vault, AWS Secrets Manager).', 'Documentare la politica e formare il team annualmente (Requisito 12.6).'], bullets: ['Gestore password per team', 'Gestione segreti per account di servizio', 'Documentare la politica completa', 'Formazione annuale sulla sicurezza', 'MFA su tutti i punti di accesso CDE', 'Blocco automatico dopo 10 tentativi', 'Timeout sessione inattiva 15 minuti', 'Revisione trimestrale della politica'] },
    { heading: 'Errori comuni di conformità', paragraphs: ['Account condivisi violano il Requisito 8.2.1 (ID unico per utente).', 'Password hardcoded violano il Requisito 8.6.2.', 'Le password predefinite dei fornitori devono essere cambiate prima della produzione (Requisito 2.1.1).', 'Il logging inadeguato è un altro errore comune.'] },
  ],
};

export const pt: LocalizedArticleContent = {
  title: 'Requisitos de senhas PCI DSS para equipes em 2026',
  excerpt: 'O que o PCI DSS v4.0 espera dos controles de senhas e como alinhar o fluxo de trabalho da equipe. Cobre requisitos de autenticação, políticas e estratégias de implementação.',
  seoTitle: 'Requisitos de senhas PCI DSS 2026 — Guia de conformidade | generatepasswordto.me',
  seoDescription: 'Guia completo dos requisitos de senhas PCI DSS v4.0. Comprimento mínimo, MFA obrigatório, contas de serviço, rotação e estratégias para equipes.',
  keywords: ['requisitos senhas PCI DSS', 'conformidade PCI senhas', 'autenticação PCI DSS v4.0', 'segurança pagamentos senhas', 'comprimento senha PCI', 'guia conformidade senhas'],
  sections: [
    { heading: 'Entendendo PCI DSS e por que importa', paragraphs: ['PCI DSS é um conjunto de requisitos de segurança para proteger dados de titulares de cartão. A versão 4.0 introduz mudanças significativas, com prazo de conformidade em março 2026.', 'O não cumprimento pode resultar em multas de $5.000 a $100.000 mensais e perda da capacidade de processar pagamentos.', 'PCI DSS v4.0 se alinha mais com práticas modernas como NIST 800-63B.'] },
    { heading: 'Comprimento e complexidade no PCI DSS v4.0', paragraphs: ['O Requisito 8.3.6 especifica pelo menos 12 caracteres (aumentado de 7). Mínimo absoluto 8 com documentação.', 'Senhas devem conter caracteres numéricos e alfabéticos.', 'A "abordagem personalizada" permite mecanismos alternativos com análise de risco documentada.'] },
    { heading: 'Requisitos de autenticação multifator', paragraphs: ['O Requisito 8.4.2 exige MFA para todo acesso ao CDE, não apenas remoto.', 'O Requisito 8.4.3 estende MFA para todo acesso remoto de rede.', 'Os fatores devem ser independentes e o MFA não pode ser contornado por ninguém.'] },
    { heading: 'Políticas de alteração e rotação de senhas', paragraphs: ['Alteração a cada 90 dias (Requisito 8.3.9). A abordagem personalizada permite eliminar rotação com monitoramento contínuo.', 'A nova senha não pode ser igual às últimas 4 (Requisito 8.3.7).', 'Contas de serviço: alteração pelo menos a cada 12 meses. Senhas hardcoded são proibidas.'] },
    { heading: 'Bloqueio de conta e gerenciamento de sessão', paragraphs: ['Bloqueio após máximo 10 tentativas por pelo menos 30 minutos.', 'Timeout de sessão inativa após 15 minutos.', 'Todas as credenciais devem ser criptografadas em trânsito e em repouso.'] },
    { heading: 'Implementação prática para equipes', paragraphs: ['Implantar um gerenciador de senhas (1Password Business, Bitwarden Organizations) é a solução mais eficaz.', 'Para contas de serviço: gestão de segredos (HashiCorp Vault, AWS Secrets Manager).', 'Documentar a política e treinar a equipe anualmente (Requisito 12.6).'], bullets: ['Gerenciador de senhas para a equipe', 'Gestão de segredos para contas de serviço', 'Documentar a política completa', 'Treinamento anual de segurança', 'MFA em todos os pontos de acesso ao CDE', 'Bloqueio automático após 10 tentativas', 'Timeout de sessão inativa 15 minutos', 'Revisão trimestral da política'] },
    { heading: 'Erros comuns de conformidade', paragraphs: ['Contas compartilhadas violam o Requisito 8.2.1 (ID único por usuário).', 'Senhas hardcoded violam o Requisito 8.6.2.', 'Senhas padrão de fornecedores devem ser alteradas antes da produção (Requisito 2.1.1).', 'Logging inadequado é outro erro comum.'] },
  ],
};

export const ru: LocalizedArticleContent = {
  title: 'Требования PCI DSS к паролям для команд в 2026',
  excerpt: 'Что PCI DSS v4.0 ожидает от контроля паролей и как настроить рабочий процесс команды. Требования аутентификации, политики и стратегии внедрения.',
  seoTitle: 'Требования PCI DSS к паролям 2026 — Руководство по соответствию | generatepasswordto.me',
  seoDescription: 'Полное руководство по требованиям PCI DSS v4.0 к паролям. Минимальная длина, обязательный MFA, сервисные аккаунты, ротация и стратегии для команд.',
  keywords: ['требования PCI DSS к паролям', 'соответствие PCI пароли', 'аутентификация PCI DSS v4.0', 'безопасность платежей пароли', 'длина пароля PCI', 'руководство соответствие паролей'],
  sections: [
    { heading: 'Понимание PCI DSS и почему это важно', paragraphs: ['PCI DSS — набор требований безопасности для защиты данных держателей карт. Версия 4.0 вводит значительные изменения, крайний срок соответствия — март 2026.', 'Несоответствие может привести к штрафам от $5 000 до $100 000 в месяц и потере возможности обрабатывать платежи.', 'PCI DSS v4.0 больше соответствует современным практикам, включая NIST 800-63B.'] },
    { heading: 'Длина и сложность в PCI DSS v4.0', paragraphs: ['Требование 8.3.6: минимум 12 символов (увеличено с 7). Абсолютный минимум 8 с документацией.', 'Пароли должны содержать цифры и буквы.', '«Настраиваемый подход» позволяет альтернативные механизмы с документированным анализом рисков.'] },
    { heading: 'Требования многофакторной аутентификации', paragraphs: ['Требование 8.4.2: MFA для всего доступа к CDE, не только удалённого.', 'Требование 8.4.3: MFA для всего удалённого сетевого доступа.', 'Факторы должны быть независимыми, и MFA нельзя обойти никому.'] },
    { heading: 'Политики смены и ротации паролей', paragraphs: ['Смена каждые 90 дней (Требование 8.3.9). Настраиваемый подход позволяет отказ от ротации при непрерывном мониторинге.', 'Новый пароль не может быть среди последних 4 (Требование 8.3.7).', 'Сервисные аккаунты: смена минимум раз в 12 месяцев. Жёстко закодированные пароли запрещены.'] },
    { heading: 'Блокировка аккаунтов и управление сессиями', paragraphs: ['Блокировка после максимум 10 неудачных попыток на минимум 30 минут.', 'Таймаут неактивной сессии через 15 минут.', 'Все учётные данные должны шифроваться при передаче и хранении.'] },
    { heading: 'Практическое внедрение для команд', paragraphs: ['Развёртывание командного менеджера паролей (1Password Business, Bitwarden Organizations) — наиболее эффективное решение.', 'Для сервисных аккаунтов: управление секретами (HashiCorp Vault, AWS Secrets Manager).', 'Документировать политику и проводить ежегодное обучение (Требование 12.6).'], bullets: ['Командный менеджер паролей', 'Управление секретами для сервисных аккаунтов', 'Документирование полной политики', 'Ежегодное обучение безопасности', 'MFA на всех точках доступа к CDE', 'Автоблокировка после 10 попыток', 'Таймаут неактивной сессии 15 минут', 'Квартальный пересмотр политики'] },
    { heading: 'Распространённые ошибки соответствия', paragraphs: ['Общие аккаунты нарушают Требование 8.2.1 (уникальный ID для каждого).', 'Жёстко закодированные пароли нарушают Требование 8.6.2.', 'Пароли вендоров по умолчанию должны быть изменены до продакшна (Требование 2.1.1).', 'Неадекватное журналирование — ещё одна частая ошибка.'] },
  ],
};

export const zh: LocalizedArticleContent = {
  title: '2026年团队PCI DSS密码要求',
  excerpt: 'PCI DSS v4.0对密码控制的要求以及如何调整团队工作流程。涵盖认证要求、密码策略和实施策略。',
  seoTitle: 'PCI DSS密码要求2026 — 团队合规指南 | generatepasswordto.me',
  seoDescription: 'PCI DSS v4.0密码要求完整指南。最小长度、MFA强制、服务账户、轮换和团队策略。',
  keywords: ['PCI DSS密码要求', 'PCI合规密码策略', 'PCI DSS v4.0认证', '支付安全密码', 'PCI密码长度', '合规密码指南'],
  sections: [
    { heading: '理解PCI DSS及其重要性', paragraphs: ['PCI DSS是保护持卡人数据的安全要求集。4.0版本在认证方面引入重大变化，合规截止日期为2026年3月。', '不合规可导致每月$5,000至$100,000的罚款和丧失处理支付的能力。', 'PCI DSS v4.0更接近NIST 800-63B等现代安全实践。'] },
    { heading: 'PCI DSS v4.0中的长度和复杂性', paragraphs: ['要求8.3.6：至少12个字符（从7增加）。绝对最低8个字符需要文档。', '密码必须包含数字和字母字符。', '"定制方法"允许通过文档化的风险分析使用替代机制。'] },
    { heading: '多因素认证要求', paragraphs: ['要求8.4.2：CDE的所有访问都需MFA，不仅是远程访问。', '要求8.4.3：MFA扩展到所有远程网络访问。', '认证因素必须独立，MFA不能被任何人绕过。'] },
    { heading: '密码更换和轮换策略', paragraphs: ['每90天更换（要求8.3.9）。定制方法允许在持续监控下取消轮换。', '新密码不能与最近4个相同（要求8.3.7）。', '服务账户：至少每12个月更换。硬编码密码被明确禁止。'] },
    { heading: '账户锁定和会话管理', paragraphs: ['最多10次失败后锁定至少30分钟。', '15分钟不活动后会话超时。', '所有认证数据必须在传输和存储中加密。'] },
    { heading: '团队实施', paragraphs: ['部署团队密码管理器（1Password Business、Bitwarden Organizations）是最有效的方式。', '服务账户使用密钥管理（HashiCorp Vault、AWS Secrets Manager）。', '书面记录策略并进行年度安全培训（要求12.6）。'], bullets: ['部署团队密码管理器', '服务账户密钥管理', '完整书面策略文档', '年度安全培训', 'CDE所有访问点的MFA', '10次失败后自动锁定', '15分钟会话超时', '季度策略审查'] },
    { heading: '常见合规错误', paragraphs: ['共享账户违反要求8.2.1（每个用户唯一ID）。', '硬编码密码违反要求8.6.2。', '供应商默认密码必须在上线前更改（要求2.1.1）。', '不充分的日志记录是另一个常见错误。'] },
  ],
};

export const ja: LocalizedArticleContent = {
  title: '2026年チーム向けPCI DSSパスワード要件',
  excerpt: 'PCI DSS v4.0がパスワード管理に求めること、UXを損なわずにチームワークフローを適合させる方法。認証要件、ポリシー、実装戦略を解説。',
  seoTitle: 'PCI DSSパスワード要件2026 — チームコンプライアンスガイド | generatepasswordto.me',
  seoDescription: 'PCI DSS v4.0パスワード要件の完全ガイド。最小長、MFA義務化、サービスアカウント、ローテーション、チーム戦略。',
  keywords: ['PCI DSSパスワード要件', 'PCIコンプライアンスパスワード', 'PCI DSS v4.0認証', '決済セキュリティパスワード', 'PCIパスワード長', 'コンプライアンスパスワードガイド'],
  sections: [
    { heading: 'PCI DSSの理解とその重要性', paragraphs: ['PCI DSSはカード会員データを保護するためのセキュリティ要件です。v4.0は認証要件に大きな変更を導入し、コンプライアンス期限は2026年3月です。', '非準拠は月$5,000〜$100,000の罰金と決済処理能力の喪失につながります。', 'PCI DSS v4.0はNIST 800-63Bなどの最新プラクティスにより適合しています。'] },
    { heading: 'PCI DSS v4.0の長さと複雑性', paragraphs: ['要件8.3.6：最低12文字（7から引き上げ）。絶対最低8文字は文書化が必要。', 'パスワードは数字とアルファベットの両方を含む必要があります。', '「カスタマイズドアプローチ」により、文書化されたリスク分析で代替メカニズムが可能。'] },
    { heading: '多要素認証要件', paragraphs: ['要件8.4.2：リモートだけでなくCDEへのすべてのアクセスにMFA。', '要件8.4.3：すべてのリモートネットワークアクセスにMFA。', '認証要素は独立していなければならず、MFAは誰も回避できません。'] },
    { heading: 'パスワード変更とローテーションポリシー', paragraphs: ['90日ごとの変更（要件8.3.9）。カスタマイズドアプローチで継続監視によりローテーション不要に。', '新パスワードは過去4つと同じ不可（要件8.3.7）。', 'サービスアカウント：最低12ヶ月ごとに変更。ハードコードされたパスワードは禁止。'] },
    { heading: 'アカウントロックアウトとセッション管理', paragraphs: ['最大10回の失敗後、最低30分ロックアウト。', '15分の非アクティブでセッションタイムアウト。', 'すべての認証データは転送中と保存中に暗号化が必要。'] },
    { heading: 'チーム向け実践的実装', paragraphs: ['チームパスワードマネージャー（1Password Business、Bitwarden Organizations）の導入が最も効果的。', 'サービスアカウントにはシークレット管理（HashiCorp Vault、AWS Secrets Manager）。', 'ポリシーを文書化し、年次セキュリティ研修を実施（要件12.6）。'], bullets: ['チームパスワードマネージャーの導入', 'サービスアカウントのシークレット管理', '完全なポリシーの文書化', '年次セキュリティ研修', 'CDE全アクセスポイントのMFA', '10回失敗後の自動ロック', '15分セッションタイムアウト', '四半期ポリシーレビュー'] },
    { heading: '一般的なコンプライアンスの落とし穴', paragraphs: ['共有アカウントは要件8.2.1（ユーザーごとの一意のID）に違反。', 'ハードコードされたパスワードは要件8.6.2に違反。', 'ベンダーのデフォルトパスワードは本番前に変更が必要（要件2.1.1）。', '不十分なログ記録もよくある間違いです。'] },
  ],
};

export const pl: LocalizedArticleContent = {
  title: 'Wymagania PCI DSS dotyczące haseł dla zespołów w 2026',
  excerpt: 'Czego PCI DSS v4.0 oczekuje od kontroli haseł i jak dostosować workflow zespołu. Wymagania uwierzytelniania, polityki i strategie wdrożenia.',
  seoTitle: 'Wymagania PCI DSS dotyczące haseł 2026 — Przewodnik zgodności | generatepasswordto.me',
  seoDescription: 'Kompletny przewodnik po wymaganiach PCI DSS v4.0 dotyczących haseł. Minimalna długość, obowiązkowe MFA, konta serwisowe, rotacja i strategie zespołowe.',
  keywords: ['wymagania PCI DSS hasła', 'zgodność PCI hasła', 'uwierzytelnianie PCI DSS v4.0', 'bezpieczeństwo płatności hasła', 'długość hasła PCI', 'przewodnik zgodności haseł'],
  sections: [
    { heading: 'Zrozumienie PCI DSS i dlaczego jest ważne', paragraphs: ['PCI DSS to zestaw wymagań bezpieczeństwa chroniących dane posiadaczy kart. Wersja 4.0 wprowadza istotne zmiany, z terminem zgodności w marcu 2026.', 'Niezgodność może skutkować karami od $5 000 do $100 000 miesięcznie i utratą możliwości przetwarzania płatności.', 'PCI DSS v4.0 lepiej jest zgodny z nowoczesnymi praktykami jak NIST 800-63B.'] },
    { heading: 'Długość i złożoność w PCI DSS v4.0', paragraphs: ['Wymaganie 8.3.6: minimum 12 znaków (zwiększone z 7). Absolutne minimum 8 z dokumentacją.', 'Hasła muszą zawierać znaki numeryczne i alfabetyczne.', '„Podejście dostosowane" pozwala na alternatywne mechanizmy z udokumentowaną analizą ryzyka.'] },
    { heading: 'Wymagania uwierzytelniania wieloskładnikowego', paragraphs: ['Wymaganie 8.4.2: MFA dla całego dostępu do CDE, nie tylko zdalnego.', 'Wymaganie 8.4.3: MFA dla całego zdalnego dostępu sieciowego.', 'Czynniki muszą być niezależne i MFA nie może być obejście przez nikogo.'] },
    { heading: 'Polityki zmiany i rotacji haseł', paragraphs: ['Zmiana co 90 dni (Wymaganie 8.3.9). Podejście dostosowane pozwala na rezygnację z rotacji przy ciągłym monitoringu.', 'Nowe hasło nie może być wśród ostatnich 4 (Wymaganie 8.3.7).', 'Konta serwisowe: zmiana co najmniej co 12 miesięcy. Zakodowane hasła są zabronione.'] },
    { heading: 'Blokada konta i zarządzanie sesjami', paragraphs: ['Blokada po maksymalnie 10 próbach na minimum 30 minut.', 'Timeout sesji po 15 minutach nieaktywności.', 'Wszystkie dane uwierzytelniające muszą być szyfrowane w tranzycie i spoczynku.'] },
    { heading: 'Praktyczne wdrożenie dla zespołów', paragraphs: ['Wdrożenie menedżera haseł (1Password Business, Bitwarden Organizations) jest najskuteczniejsze.', 'Dla kont serwisowych: zarządzanie sekretami (HashiCorp Vault, AWS Secrets Manager).', 'Udokumentować politykę i przeprowadzać roczne szkolenie (Wymaganie 12.6).'], bullets: ['Menedżer haseł dla zespołu', 'Zarządzanie sekretami dla kont serwisowych', 'Pełna dokumentacja polityki', 'Roczne szkolenie bezpieczeństwa', 'MFA na wszystkich punktach dostępu CDE', 'Automatyczna blokada po 10 próbach', '15-minutowy timeout sesji', 'Kwartalny przegląd polityki'] },
    { heading: 'Częste błędy zgodności', paragraphs: ['Współdzielone konta naruszają Wymaganie 8.2.1 (unikalny ID dla użytkownika).', 'Zakodowane hasła naruszają Wymaganie 8.6.2.', 'Domyślne hasła dostawców muszą być zmienione przed produkcją (Wymaganie 2.1.1).', 'Niewystarczające logowanie to kolejny częsty błąd.'] },
  ],
};

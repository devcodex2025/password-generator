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

export const es: LocalizedArticleContent = {
  title: 'Plantilla de política de contraseñas para equipos: marco listo para usar',
  excerpt: 'Una plantilla de política de contraseñas lista para copiar basada en NIST 800-63B y PCI DSS v4.0. Cubre gestores de contraseñas, MFA, rotación, respuesta a incidentes y capacitación.',
  seoTitle: 'Plantilla de política de contraseñas para equipos — Marco NIST/PCI DSS | generatepasswordto.me',
  seoDescription: 'Plantilla de política de contraseñas descargable para equipos. Basada en NIST 800-63B y PCI DSS v4.0 con secciones sobre gestores, MFA, rotación e incidentes.',
  keywords: ['plantilla política contraseñas', 'política contraseñas equipo', 'plantilla seguridad contraseñas', 'política contraseñas NIST', 'plantilla contraseñas PCI DSS', 'política seguridad corporativa'],
  sections: [
    { heading: 'Por qué tu equipo necesita una política de contraseñas formal', paragraphs: ['El costo promedio de una brecha por credenciales comprometidas es de $4.88 millones (IBM 2024). Una política formal reduce este riesgo con expectativas claras.', 'Esta plantilla se basa en NIST 800-63B y PCI DSS v4.0.', 'Está diseñada para equipos de 5 a 500 personas con acceso a datos de clientes, financieros o propiedad intelectual.'] },
    { heading: 'Sección 1: Requisitos de contraseñas', paragraphs: ['Contraseñas de al menos 16 caracteres generadas por el generador del gestor. No se permiten contraseñas creadas por humanos para cuentas laborales.', 'Los sistemas deben aceptar hasta 64 caracteres y todos los caracteres Unicode. Las contraseñas se verifican contra la base HIBP.', 'La contraseña maestra debe ser una frase de al menos 6 palabras aleatorias.'] },
    { heading: 'Sección 2: Requisitos del gestor de contraseñas', paragraphs: ['Todos deben usar el gestor aprobado con cifrado AES-256 o XChaCha20 y arquitectura zero-knowledge.', 'Opciones recomendadas: 1Password Business, Bitwarden Teams, Dashlane Business.', 'Cada miembro genera contraseñas únicas de mínimo 16 caracteres. La reutilización está prohibida.'] },
    { heading: 'Sección 3: Política MFA', paragraphs: ['MFA obligatorio para todas las cuentas laborales sin excepciones. Debe habilitarse dentro de 24 horas de creación.', 'Métodos aprobados por prioridad: FIDO2/WebAuthn (YubiKey, Titan); TOTP (Google Authenticator, Authy); Push del gestor; SMS (solo si no hay alternativa).', 'Empleados con acceso a producción deben usar llaves de hardware. La organización proporciona dos llaves por empleado.'] },
    { heading: 'Sección 4: Rotación y ciclo de vida', paragraphs: ['Cuentas estándar: NO se rotan por calendario (NIST 800-63B). Solo se cambian ante evidencia de compromiso.', 'Cuentas administrativas: rotación cada 180 días y ante sospecha de compromiso. Mínimo 24 caracteres.', 'Cuentas de servicio y API: rotación cada 90 días vía gestión de secretos (HashiCorp Vault, AWS Secrets Manager).', 'Al salir un empleado: todas las credenciales rotadas o revocadas en 4 horas.'] },
    { heading: 'Sección 5: Respuesta a incidentes', paragraphs: ['Inmediato (30 min): deshabilitar cuenta, rotar credenciales, revisar logs.', 'Corto plazo (24h): determinar alcance, revisar actividad 30 días, rotar cuentas con contraseña reutilizada, notificar.', 'Post-incidente (7 días): análisis de causa raíz, actualizar política, capacitación dirigida, documentar.'] },
    { heading: 'Sección 6: Capacitación y cumplimiento', paragraphs: ['Capacitación en la primera semana y anualmente. Cubre: uso del gestor, creación de frases, detección de phishing, manejo de MFA, reporte de incidentes.', 'Auditorías trimestrales del panel de salud del gestor. Métricas: unicidad, longitud, filtraciones, adopción MFA.', 'Violaciones: primera — capacitación adicional; segunda — amonestación formal; tercera — acceso restringido.'], bullets: ['Capacitación en primera semana + actualización anual', 'Auditorías trimestrales de salud', 'Métricas: unicidad, longitud, filtraciones, MFA', 'Disciplina progresiva', 'Acción inmediata por violaciones intencionales', 'Documentar toda capacitación'] },
    { heading: 'Implementación de esta plantilla', paragraphs: ['Obtener apoyo ejecutivo presentando el costo de brechas ($4.88M) vs suscripción al gestor.', 'Elegir y desplegar el gestor antes de anunciar la política. Preconfigurar bóvedas, importar credenciales.', 'Anunciar con período de gracia (30 días). Sesiones de ayuda con soporte IT.', 'Revisar y actualizar anualmente.'] },
  ],
};

export const fr: LocalizedArticleContent = {
  title: 'Modèle de politique de mots de passe d\'équipe : cadre prêt à l\'emploi',
  excerpt: 'Un modèle de politique de mots de passe basé sur NIST 800-63B et PCI DSS v4.0. Couvre gestionnaires, MFA, rotation, réponse aux incidents et formation.',
  seoTitle: 'Modèle politique mots de passe équipe — Cadre NIST/PCI DSS | generatepasswordto.me',
  seoDescription: 'Modèle téléchargeable de politique mots de passe. Basé sur NIST 800-63B et PCI DSS v4.0 avec sections gestionnaires, MFA, rotation et incidents.',
  keywords: ['modèle politique mots de passe', 'politique mots de passe équipe', 'modèle sécurité mots de passe', 'politique NIST mots de passe', 'modèle PCI DSS', 'politique sécurité entreprise'],
  sections: [
    { heading: 'Pourquoi votre équipe a besoin d\'une politique formelle', paragraphs: ['Le coût moyen d\'une brèche par identifiants compromis est de 4,88 M$ (IBM 2024).', 'Ce modèle est basé sur NIST 800-63B et PCI DSS v4.0.', 'Conçu pour des équipes de 5 à 500 personnes.'] },
    { heading: 'Section 1 : Exigences de mots de passe', paragraphs: ['Minimum 16 caractères générés par le gestionnaire. Pas de mots de passe créés manuellement.', 'Les systèmes doivent accepter jusqu\'à 64 caractères. Vérification contre HIBP.', 'Le mot de passe maître doit être une phrase de 6+ mots aléatoires.'] },
    { heading: 'Section 2 : Gestionnaire de mots de passe', paragraphs: ['Tous doivent utiliser le gestionnaire approuvé avec chiffrement AES-256 ou XChaCha20.', 'Options : 1Password Business, Bitwarden Teams, Dashlane Business.', 'Mots de passe uniques de 16+ caractères. La réutilisation est interdite.'] },
    { heading: 'Section 3 : Politique MFA', paragraphs: ['MFA obligatoire sans exception. Activation sous 24h.', 'Par priorité : FIDO2/WebAuthn ; TOTP ; Push ; SMS (dernier recours).', 'Clés matérielles obligatoires pour l\'accès production. Deux clés par employé qualifié.'] },
    { heading: 'Section 4 : Rotation et cycle de vie', paragraphs: ['Comptes standards : PAS de rotation calendaire (NIST). Changement uniquement sur preuve de compromission.', 'Comptes admin : rotation tous les 180 jours. Minimum 24 caractères.', 'Comptes de service : rotation tous les 90 jours via gestion de secrets.', 'Départ employé : rotation de toutes les informations d\'identification sous 4 heures.'] },
    { heading: 'Section 5 : Réponse aux incidents', paragraphs: ['Immédiat (30 min) : désactiver, rotation, vérifier les logs.', 'Court terme (24h) : déterminer la portée, examiner 30 jours d\'activité.', 'Post-incident (7 jours) : analyse des causes, mise à jour politique.'] },
    { heading: 'Section 6 : Formation et conformité', paragraphs: ['Formation première semaine + annuellement.', 'Audits trimestriels. Métriques : unicité, longueur, fuites, adoption MFA.', 'Violations : avertissement, réprimande, restriction d\'accès.'], bullets: ['Formation première semaine + annuelle', 'Audits trimestriels', 'Métriques suivies', 'Discipline progressive', 'Action immédiate si intentionnel', 'Documentation complète'] },
    { heading: 'Mise en œuvre', paragraphs: ['Obtenir l\'appui de la direction.', 'Déployer le gestionnaire avant d\'annoncer la politique.', 'Annoncer avec période de grâce de 30 jours.', 'Réviser annuellement.'] },
  ],
};

export const de: LocalizedArticleContent = {
  title: 'Team-Passwortrichtlinie: einsatzbereites Framework',
  excerpt: 'Eine kopierfähige Passwortrichtlinie basierend auf NIST 800-63B und PCI DSS v4.0. Umfasst Passwort-Manager, MFA, Rotation, Incident Response und Schulung.',
  seoTitle: 'Team-Passwortrichtlinie — NIST/PCI DSS Framework | generatepasswordto.me',
  seoDescription: 'Herunterladbare Passwortrichtlinie für Teams. Basierend auf NIST 800-63B und PCI DSS v4.0.',
  keywords: ['Passwortrichtlinie Vorlage', 'Team Passwortrichtlinie', 'Passwort-Sicherheitsvorlage', 'NIST Passwortrichtlinie', 'PCI DSS Vorlage', 'Unternehmenssicherheitsrichtlinie'],
  sections: [
    { heading: 'Warum Ihr Team eine formale Richtlinie braucht', paragraphs: ['Durchschnittliche Kosten eines Credential-Breaches: $4,88 Mio. (IBM 2024).', 'Diese Vorlage basiert auf NIST 800-63B und PCI DSS v4.0.', 'Für Teams von 5-500 Personen.'] },
    { heading: 'Abschnitt 1: Passwortanforderungen', paragraphs: ['Mindestens 16 Zeichen, vom Manager generiert. Keine manuell erstellten Passwörter.', 'Systeme müssen bis 64 Zeichen akzeptieren. HIBP-Prüfung.', 'Master-Passwort: Passphrase mit 6+ zufälligen Wörtern.'] },
    { heading: 'Abschnitt 2: Passwort-Manager', paragraphs: ['Alle nutzen den genehmigten Manager mit AES-256 oder XChaCha20.', '1Password Business, Bitwarden Teams, Dashlane Business.', 'Einzigartige 16+ Zeichen Passwörter. Wiederverwendung verboten.'] },
    { heading: 'Abschnitt 3: MFA-Richtlinie', paragraphs: ['MFA für alle Konten ohne Ausnahme. Innerhalb 24h aktivieren.', 'Priorität: FIDO2/WebAuthn; TOTP; Push; SMS (Notfall).', 'Hardware-Schlüssel für Produktionszugang. Zwei Schlüssel pro Mitarbeiter.'] },
    { heading: 'Abschnitt 4: Rotation und Lebenszyklus', paragraphs: ['Standardkonten: KEINE kalendarische Rotation (NIST).', 'Admin-Konten: alle 180 Tage. Minimum 24 Zeichen.', 'Service-Konten: alle 90 Tage über Secrets-Management.', 'Mitarbeiteraustritt: alle Credentials innerhalb 4 Stunden rotieren.'] },
    { heading: 'Abschnitt 5: Incident Response', paragraphs: ['Sofort (30 Min): Konto deaktivieren, rotieren, Logs prüfen.', 'Kurzfristig (24h): Umfang bestimmen, 30 Tage Aktivität prüfen.', 'Nach Incident (7 Tage): Ursachenanalyse, Richtlinie aktualisieren.'] },
    { heading: 'Abschnitt 6: Schulung und Compliance', paragraphs: ['Schulung in der ersten Woche + jährlich.', 'Vierteljährliche Audits.', 'Verstöße: Warnung, Abmahnung, Zugangsbeschränkung.'], bullets: ['Schulung erste Woche + jährlich', 'Vierteljährliche Audits', 'Metriken verfolgen', 'Progressive Disziplin', 'Sofortige Maßnahmen bei vorsätzlichen Verstößen', 'Vollständige Dokumentation'] },
    { heading: 'Implementierung', paragraphs: ['Führungsunterstützung gewinnen.', 'Manager vor Richtlinienankündigung einrichten.', '30-Tage-Übergangsfrist.', 'Jährliche Überprüfung.'] },
  ],
};

export const it: LocalizedArticleContent = {
  title: 'Template di politica password per team: framework pronto all\'uso',
  excerpt: 'Un template di politica password basato su NIST 800-63B e PCI DSS v4.0. Copre gestori, MFA, rotazione, risposta agli incidenti e formazione.',
  seoTitle: 'Template politica password team — Framework NIST/PCI DSS | generatepasswordto.me',
  seoDescription: 'Template scaricabile di politica password per team basato su NIST 800-63B e PCI DSS v4.0.',
  keywords: ['template politica password', 'politica password team', 'template sicurezza password', 'politica NIST password', 'template PCI DSS', 'politica sicurezza aziendale'],
  sections: [
    { heading: 'Perché il tuo team ha bisogno di una politica formale', paragraphs: ['Costo medio di una violazione per credenziali compromesse: $4,88M (IBM 2024).', 'Questo template è basato su NIST 800-63B e PCI DSS v4.0.', 'Per team da 5 a 500 persone.'] },
    { heading: 'Sezione 1: Requisiti password', paragraphs: ['Minimo 16 caratteri generati dal gestore. Niente password create manualmente.', 'I sistemi devono accettare fino a 64 caratteri. Verifica HIBP.', 'Password master: frase di 6+ parole casuali.'] },
    { heading: 'Sezione 2: Gestore di password', paragraphs: ['Tutti devono usare il gestore approvato con crittografia AES-256 o XChaCha20.', '1Password Business, Bitwarden Teams, Dashlane Business.', 'Password uniche di 16+ caratteri. Riutilizzo vietato.'] },
    { heading: 'Sezione 3: Politica MFA', paragraphs: ['MFA obbligatorio senza eccezioni. Attivazione entro 24h.', 'Priorità: FIDO2/WebAuthn; TOTP; Push; SMS (ultima risorsa).', 'Chiavi hardware per accesso produzione. Due chiavi per dipendente.'] },
    { heading: 'Sezione 4: Rotazione e ciclo di vita', paragraphs: ['Account standard: NESSUNA rotazione calendario (NIST).', 'Account admin: ogni 180 giorni. Minimo 24 caratteri.', 'Account servizio: ogni 90 giorni tramite gestione segreti.', 'Uscita dipendente: rotazione entro 4 ore.'] },
    { heading: 'Sezione 5: Risposta agli incidenti', paragraphs: ['Immediato (30 min): disabilitare, ruotare, verificare log.', 'Breve termine (24h): determinare portata, esaminare 30 giorni.', 'Post-incidente (7 giorni): analisi cause, aggiornare politica.'] },
    { heading: 'Sezione 6: Formazione e conformità', paragraphs: ['Formazione prima settimana + annualmente.', 'Audit trimestrali.', 'Violazioni: avvertimento, richiamo formale, accesso limitato.'], bullets: ['Formazione prima settimana + annuale', 'Audit trimestrali', 'Metriche monitorate', 'Disciplina progressiva', 'Azione immediata per violazioni intenzionali', 'Documentazione completa'] },
    { heading: 'Implementazione', paragraphs: ['Ottenere supporto dirigenziale.', 'Distribuire il gestore prima dell\'annuncio.', 'Periodo di grazia 30 giorni.', 'Revisione annuale.'] },
  ],
};

export const pt: LocalizedArticleContent = {
  title: 'Template de política de senhas para equipes: framework pronto para uso',
  excerpt: 'Template de política de senhas baseado em NIST 800-63B e PCI DSS v4.0. Cobre gerenciadores, MFA, rotação, resposta a incidentes e treinamento.',
  seoTitle: 'Template política de senhas para equipes — Framework NIST/PCI DSS | generatepasswordto.me',
  seoDescription: 'Template de política de senhas para equipes baseado em NIST 800-63B e PCI DSS v4.0.',
  keywords: ['template política senhas', 'política senhas equipe', 'template segurança senhas', 'política NIST senhas', 'template PCI DSS', 'política segurança corporativa'],
  sections: [
    { heading: 'Por que sua equipe precisa de uma política formal', paragraphs: ['Custo médio de vazamento por credenciais: $4,88M (IBM 2024).', 'Este template é baseado em NIST 800-63B e PCI DSS v4.0.', 'Para equipes de 5 a 500 pessoas.'] },
    { heading: 'Seção 1: Requisitos de senhas', paragraphs: ['Mínimo 16 caracteres gerados pelo gerenciador. Sem senhas criadas manualmente.', 'Sistemas devem aceitar até 64 caracteres. Verificação HIBP.', 'Senha mestra: frase de 6+ palavras aleatórias.'] },
    { heading: 'Seção 2: Gerenciador de senhas', paragraphs: ['Todos devem usar o gerenciador aprovado com criptografia AES-256 ou XChaCha20.', '1Password Business, Bitwarden Teams, Dashlane Business.', 'Senhas únicas de 16+ caracteres. Reutilização proibida.'] },
    { heading: 'Seção 3: Política MFA', paragraphs: ['MFA obrigatório sem exceções. Ativação em 24h.', 'Prioridade: FIDO2/WebAuthn; TOTP; Push; SMS (último recurso).', 'Chaves de hardware para acesso à produção. Duas chaves por funcionário.'] },
    { heading: 'Seção 4: Rotação e ciclo de vida', paragraphs: ['Contas padrão: SEM rotação por calendário (NIST).', 'Contas admin: a cada 180 dias. Mínimo 24 caracteres.', 'Contas de serviço: a cada 90 dias via gestão de segredos.', 'Saída de funcionário: rotação em 4 horas.'] },
    { heading: 'Seção 5: Resposta a incidentes', paragraphs: ['Imediato (30 min): desabilitar, rotacionar, verificar logs.', 'Curto prazo (24h): determinar escopo.', 'Pós-incidente (7 dias): análise de causa raiz, atualizar política.'] },
    { heading: 'Seção 6: Treinamento e conformidade', paragraphs: ['Treinamento na primeira semana + anualmente.', 'Auditorias trimestrais.', 'Violações: advertência, repreensão formal, acesso restrito.'], bullets: ['Treinamento primeira semana + anual', 'Auditorias trimestrais', 'Métricas monitoradas', 'Disciplina progressiva', 'Ação imediata para violações intencionais', 'Documentação completa'] },
    { heading: 'Implementação', paragraphs: ['Obter apoio executivo.', 'Implantar gerenciador antes do anúncio.', 'Período de graça de 30 dias.', 'Revisão anual.'] },
  ],
};

export const ru: LocalizedArticleContent = {
  title: 'Шаблон политики паролей для команд: готовый фреймворк',
  excerpt: 'Готовый шаблон политики паролей на основе NIST 800-63B и PCI DSS v4.0. Менеджеры паролей, MFA, ротация, реагирование на инциденты и обучение.',
  seoTitle: 'Шаблон политики паролей для команд — Фреймворк NIST/PCI DSS | generatepasswordto.me',
  seoDescription: 'Шаблон политики паролей для команд на основе NIST 800-63B и PCI DSS v4.0.',
  keywords: ['шаблон политики паролей', 'политика паролей команды', 'шаблон безопасности паролей', 'политика NIST пароли', 'шаблон PCI DSS', 'корпоративная политика безопасности'],
  sections: [
    { heading: 'Зачем команде формальная политика', paragraphs: ['Средняя стоимость утечки через учётные данные: $4,88M (IBM 2024).', 'Этот шаблон основан на NIST 800-63B и PCI DSS v4.0.', 'Для команд от 5 до 500 человек.'] },
    { heading: 'Раздел 1: Требования к паролям', paragraphs: ['Минимум 16 символов от генератора менеджера. Никаких паролей, созданных вручную.', 'Системы должны принимать до 64 символов. Проверка HIBP.', 'Мастер-пароль: фраза из 6+ случайных слов.'] },
    { heading: 'Раздел 2: Менеджер паролей', paragraphs: ['Все используют утверждённый менеджер с AES-256 или XChaCha20.', '1Password Business, Bitwarden Teams, Dashlane Business.', 'Уникальные пароли 16+ символов. Повторное использование запрещено.'] },
    { heading: 'Раздел 3: Политика MFA', paragraphs: ['MFA обязательна без исключений. Активация в течение 24 часов.', 'Приоритет: FIDO2/WebAuthn; TOTP; Push; SMS (крайний случай).', 'Аппаратные ключи для доступа к продакшну. Два ключа на сотрудника.'] },
    { heading: 'Раздел 4: Ротация и жизненный цикл', paragraphs: ['Стандартные аккаунты: БЕЗ календарной ротации (NIST).', 'Админ-аккаунты: каждые 180 дней. Минимум 24 символа.', 'Сервисные аккаунты: каждые 90 дней через управление секретами.', 'Увольнение: ротация всех учётных данных за 4 часа.'] },
    { heading: 'Раздел 5: Реагирование на инциденты', paragraphs: ['Немедленно (30 мин): отключить, ротировать, проверить логи.', 'Краткосрочно (24ч): определить масштаб.', 'После инцидента (7 дней): анализ причин, обновление политики.'] },
    { heading: 'Раздел 6: Обучение и соответствие', paragraphs: ['Обучение в первую неделю + ежегодно.', 'Квартальные аудиты.', 'Нарушения: предупреждение, выговор, ограничение доступа.'], bullets: ['Обучение в первую неделю + ежегодно', 'Квартальные аудиты', 'Отслеживание метрик', 'Прогрессивная дисциплина', 'Немедленные меры за умышленные нарушения', 'Полная документация'] },
    { heading: 'Внедрение', paragraphs: ['Получить поддержку руководства.', 'Развернуть менеджер до объявления политики.', 'Льготный период 30 дней.', 'Ежегодный пересмотр.'] },
  ],
};

export const zh: LocalizedArticleContent = {
  title: '团队密码策略模板：即用型框架',
  excerpt: '基于NIST 800-63B和PCI DSS v4.0的密码策略模板。涵盖密码管理器、MFA、轮换、事件响应和培训。',
  seoTitle: '团队密码策略模板 — NIST/PCI DSS框架 | generatepasswordto.me',
  seoDescription: '基于NIST 800-63B和PCI DSS v4.0的团队密码策略模板。',
  keywords: ['密码策略模板', '团队密码策略', '密码安全模板', 'NIST密码策略', 'PCI DSS模板', '企业安全策略'],
  sections: [
    { heading: '为什么团队需要正式的密码策略', paragraphs: ['凭证泄露的平均成本：$488万（IBM 2024）。', '本模板基于NIST 800-63B和PCI DSS v4.0。', '适用于5-500人的团队。'] },
    { heading: '第1节：密码要求', paragraphs: ['最少16字符，由管理器生成。不允许手动创建密码。', '系统必须接受最多64字符。HIBP验证。', '主密码：6+随机词组成的短语。'] },
    { heading: '第2节：密码管理器', paragraphs: ['所有人使用批准的管理器，AES-256或XChaCha20加密。', '1Password Business、Bitwarden Teams、Dashlane Business。', '唯一16+字符密码。禁止重复使用。'] },
    { heading: '第3节：MFA策略', paragraphs: ['MFA无例外强制。24小时内启用。', '优先级：FIDO2/WebAuthn；TOTP；Push；SMS（最后手段）。', '生产访问必须使用硬件密钥。每位员工两把密钥。'] },
    { heading: '第4节：轮换和生命周期', paragraphs: ['标准账户：不按日历轮换（NIST）。', '管理员账户：每180天。最少24字符。', '服务账户：每90天通过密钥管理。', '员工离职：4小时内轮换所有凭证。'] },
    { heading: '第5节：事件响应', paragraphs: ['立即（30分钟）：禁用、轮换、检查日志。', '短期（24小时）：确定范围。', '事后（7天）：根因分析，更新策略。'] },
    { heading: '第6节：培训和合规', paragraphs: ['入职第一周+年度培训。', '季度审计。', '违规：警告、正式处分、限制访问。'], bullets: ['入职培训+年度更新', '季度审计', '跟踪指标', '渐进纪律', '故意违规立即行动', '完整文档'] },
    { heading: '实施', paragraphs: ['获得管理层支持。', '在宣布策略前部署管理器。', '30天过渡期。', '年度审查。'] },
  ],
};

export const ja: LocalizedArticleContent = {
  title: 'チームパスワードポリシーテンプレート：すぐに使えるフレームワーク',
  excerpt: 'NIST 800-63BとPCI DSS v4.0に基づくパスワードポリシーテンプレート。パスワードマネージャー、MFA、ローテーション、インシデント対応、トレーニングを網羅。',
  seoTitle: 'チームパスワードポリシーテンプレート — NIST/PCI DSSフレームワーク | generatepasswordto.me',
  seoDescription: 'NIST 800-63BとPCI DSS v4.0に基づくチームパスワードポリシーテンプレート。',
  keywords: ['パスワードポリシーテンプレート', 'チームパスワードポリシー', 'パスワードセキュリティテンプレート', 'NISTパスワードポリシー', 'PCI DSSテンプレート', '企業セキュリティポリシー'],
  sections: [
    { heading: 'なぜチームに正式なポリシーが必要か', paragraphs: ['資格情報侵害の平均コスト：$488万（IBM 2024）。', 'このテンプレートはNIST 800-63BとPCI DSS v4.0に基づいています。', '5〜500人のチーム向け。'] },
    { heading: 'セクション1：パスワード要件', paragraphs: ['最低16文字、マネージャーで生成。手動作成不可。', 'システムは64文字まで受け入れ。HIBP検証。', 'マスターパスワード：6+ランダム語のパスフレーズ。'] },
    { heading: 'セクション2：パスワードマネージャー', paragraphs: ['全員が承認されたマネージャーをAES-256またはXChaCha20で使用。', '1Password Business、Bitwarden Teams、Dashlane Business。', 'ユニーク16+文字パスワード。再利用禁止。'] },
    { heading: 'セクション3：MFAポリシー', paragraphs: ['MFA例外なし必須。24時間以内に有効化。', '優先度：FIDO2/WebAuthn；TOTP；Push；SMS（最終手段）。', '本番アクセスにはハードウェアキー必須。従業員1人2本。'] },
    { heading: 'セクション4：ローテーションとライフサイクル', paragraphs: ['標準アカウント：カレンダーローテーションなし（NIST）。', '管理者アカウント：180日ごと。最低24文字。', 'サービスアカウント：90日ごとシークレット管理経由。', '退職：4時間以内に全資格情報をローテーション。'] },
    { heading: 'セクション5：インシデント対応', paragraphs: ['即時（30分）：無効化、ローテーション、ログ確認。', '短期（24時間）：範囲特定。', '事後（7日）：根本原因分析、ポリシー更新。'] },
    { heading: 'セクション6：トレーニングとコンプライアンス', paragraphs: ['初週+年次トレーニング。', '四半期監査。', '違反：警告、正式譴責、アクセス制限。'], bullets: ['初週トレーニング+年次更新', '四半期監査', 'メトリクス追跡', '段階的処分', '意図的違反は即時対応', '完全な文書化'] },
    { heading: '実装', paragraphs: ['経営陣の支持を得る。', 'ポリシー発表前にマネージャーを導入。', '30日猶予期間。', '年次見直し。'] },
  ],
};

export const pl: LocalizedArticleContent = {
  title: 'Szablon polityki haseł dla zespołów: gotowy framework',
  excerpt: 'Szablon polityki haseł oparty na NIST 800-63B i PCI DSS v4.0. Menedżery haseł, MFA, rotacja, reagowanie na incydenty i szkolenia.',
  seoTitle: 'Szablon polityki haseł dla zespołów — Framework NIST/PCI DSS | generatepasswordto.me',
  seoDescription: 'Szablon polityki haseł dla zespołów oparty na NIST 800-63B i PCI DSS v4.0.',
  keywords: ['szablon polityki haseł', 'polityka haseł zespołu', 'szablon bezpieczeństwa haseł', 'polityka NIST hasła', 'szablon PCI DSS', 'korporacyjna polityka bezpieczeństwa'],
  sections: [
    { heading: 'Dlaczego zespół potrzebuje formalnej polityki', paragraphs: ['Średni koszt wycieku danych uwierzytelniających: $4,88M (IBM 2024).', 'Ten szablon oparty jest na NIST 800-63B i PCI DSS v4.0.', 'Dla zespołów 5-500 osób.'] },
    { heading: 'Sekcja 1: Wymagania haseł', paragraphs: ['Minimum 16 znaków generowanych przez menedżera. Bez ręcznego tworzenia.', 'Systemy muszą akceptować do 64 znaków. Weryfikacja HIBP.', 'Hasło główne: fraza z 6+ losowych słów.'] },
    { heading: 'Sekcja 2: Menedżer haseł', paragraphs: ['Wszyscy używają zatwierdzonego menedżera z AES-256 lub XChaCha20.', '1Password Business, Bitwarden Teams, Dashlane Business.', 'Unikalne hasła 16+ znaków. Ponowne użycie zabronione.'] },
    { heading: 'Sekcja 3: Polityka MFA', paragraphs: ['MFA obowiązkowe bez wyjątków. Aktywacja w 24h.', 'Priorytet: FIDO2/WebAuthn; TOTP; Push; SMS (ostateczność).', 'Klucze sprzętowe dla dostępu do produkcji. Dwa klucze na pracownika.'] },
    { heading: 'Sekcja 4: Rotacja i cykl życia', paragraphs: ['Konta standardowe: BEZ rotacji kalendarzowej (NIST).', 'Konta admin: co 180 dni. Minimum 24 znaki.', 'Konta serwisowe: co 90 dni przez zarządzanie sekretami.', 'Odejście pracownika: rotacja w 4 godziny.'] },
    { heading: 'Sekcja 5: Reagowanie na incydenty', paragraphs: ['Natychmiast (30 min): wyłączyć, rotować, sprawdzić logi.', 'Krótkoterminowo (24h): określić zakres.', 'Po incydencie (7 dni): analiza przyczyn, aktualizacja polityki.'] },
    { heading: 'Sekcja 6: Szkolenia i zgodność', paragraphs: ['Szkolenie w pierwszym tygodniu + rocznie.', 'Kwartalne audyty.', 'Naruszenia: ostrzeżenie, formalna nagana, ograniczony dostęp.'], bullets: ['Szkolenie pierwszy tydzień + roczne', 'Kwartalne audyty', 'Śledzenie metryk', 'Progresywna dyscyplina', 'Natychmiastowe działanie za celowe naruszenia', 'Pełna dokumentacja'] },
    { heading: 'Wdrożenie', paragraphs: ['Uzyskać wsparcie kierownictwa.', 'Wdrożyć menedżera przed ogłoszeniem polityki.', 'Okres przejściowy 30 dni.', 'Roczny przegląd.'] },
  ],
};

export const vi: LocalizedArticleContent = {
  title: 'Mẫu chính sách mật khẩu nhóm: khung sẵn dùng',
  excerpt:
    'Dùng khung chính sách toàn diện này để chuẩn hóa bảo mật mật khẩu trong tổ chức. Gồm mẫu sẵn dùng theo NIST 800-63B, PCI DSS v4.0 và đào tạo nhân viên.',
  seoTitle: 'Mẫu chính sách mật khẩu nhóm 2026: tạo mật khẩu mạnh',
  seoDescription:
    'Mẫu chính sách mật khẩu nhóm sẵn dùng theo NIST 800-63B và PCI DSS v4.0: tạo mật khẩu mạnh, lưu trữ, xoay vòng, MFA, ứng phó sự cố và đào tạo nhân viên.',
  keywords: [
    'trình quản lý mật khẩu là gì',
    'mật khẩu mạnh là gì',
    'mật khẩu mạnh ngẫu nhiên',
    'mật khẩu mạnh nhất',
    'mật khẩu mạnh dễ nhớ',
    'cụm mật khẩu passphrase là gì',
  ],
  sections: [
    {
      heading: 'Cách dùng mẫu này trong tổ chức',
      paragraphs: [
        'Mẫu phù hợp cho quản lý CNTT, nhân sự và trưởng nhóm cần ban hành chính sách trong một tuần. Sao chép khung, thay các giá trị trong ngoặc bằng quyết định của bạn, rồi đưa qua luật sư hoặc bộ phận tuân thủ. Với nhân sự mới, hãy đưa chính sách vào quy trình hội nhập và ký xác nhận; khi thay đổi công cụ, cập nhật mục quản lý thay đổi và thông báo trước.',
        'Đừng ban hành chính sách mà không có người chịu trách nhiệm kiểm tra và gia hạn hằng năm, nếu không tài liệu sẽ lỗi thời ngay sau lần thay đổi công cụ tiếp theo.',
      ],
    },
    {
      heading: 'Vì sao nhóm cần chính sách mật khẩu bằng văn bản',
      paragraphs: [
        'Chính sách mật khẩu bằng văn bản biến bảo mật từ phỏng đoán cá nhân thành chuẩn mực tổ chức. Không có chính sách, các thành viên dùng cách rất khác nhau: người dùng trình quản lý với mật khẩu ngẫu nhiên 20 ký tự, người dùng lại "CompanyName2026" cho mọi dịch vụ. Chính sách rõ ràng xóa bỏ sự thiếu nhất quán và tạo bảo vệ pháp lý bằng chứng minh nỗ lực hợp lý.',
        'Các khung quy định gồm PCI DSS, SOC 2, HIPAA, GDPR và ISO 27001 đều yêu cầu chính sách kiểm soát truy cập có hồ sơ. Khi kiểm toán hoặc điều tra rò rỉ, câu hỏi đầu tiên thường là "cho xem chính sách mật khẩu". Không có hoặc có bản lỗi thời có thể dẫn tới không tuân thủ, phạt cao hơn và trách nhiệm lớn hơn.',
        'Mẫu dưới đây dành cho nhóm 5-500 người. Mẫu bao gồm yêu cầu thiết yếu nhưng vẫn thực tế cho dùng hằng ngày. Hãy điều chỉnh giá trị cụ thể (độ dài tối thiểu, chu kỳ xoay vòng, công cụ) theo mức rủi ro và quy định của tổ chức.',
      ],
    },
    {
      heading: 'Phần 1: Yêu cầu tạo mật khẩu',
      paragraphs: [
        'Độ dài tối thiểu: 14 ký tự cho tài khoản người dùng, 20 ký tự cho tài khoản quản trị và dịch vụ. Không giới hạn độ dài tối đa. Mức này vượt tối thiểu NIST 800-63B (8) và PCI DSS v4.0 (12) để có thêm biên an toàn trước tiến bộ bẻ khóa.',
        'Cách tiếp cận độ phức tạp: áp dụng hướng NIST ưu tiên độ dài hơn độ phức tạp. Mật khẩu không được chỉ toàn số hoặc chỉ toàn chữ. Ngoài ra không bắt buộc nhóm ký tự cụ thể. Người dùng được khuyến khích nhưng không bị ép dùng nhiều loại ký tự.',
        'Mật khẩu bị cấm: mọi mật khẩu được kiểm tra với cơ sở dữ liệu Have I Been Pwned khi tạo và đổi. Mật khẩu trùng dữ liệu rò rỉ đã biết bị từ chối kèm giải thích rõ. Ngoài ra, mật khẩu không được chứa tên đăng nhập, email hoặc tên công ty.',
        'Hỗ trợ cụm mật khẩu: khuyến khích dùng cụm (chuỗi từ ngẫu nhiên) thay mật khẩu ký tự ngẫu nhiên cho thông tin phải ghi nhớ. Cụm phải có ít nhất 5 từ từ danh sách lớn, có dấu phân cách giữa các từ.',
      ],
      bullets: [
        'Tối thiểu 14 ký tự cho tài khoản người dùng',
        'Tối thiểu 20 ký tự cho tài khoản quản trị và dịch vụ',
        'Không giới hạn độ dài tối đa',
        'Không chỉ toàn số hoặc chỉ toàn chữ',
        'Kiểm tra với cơ sở dữ liệu mật khẩu bị rò rỉ HIBP',
        'Không chứa tên đăng nhập, email hoặc tên công ty',
        'Chấp nhận và khuyến khích cụm mật khẩu 5+ từ ngẫu nhiên',
      ],
    },
    {
      heading: 'Phần 2: Yêu cầu trình quản lý mật khẩu',
      paragraphs: [
        'Mọi thành viên phải dùng trình quản lý mật khẩu được tổ chức phê duyệt cho mọi tài khoản công việc. Trình quản lý được duyệt phải: dùng mã hóa AES-256 hoặc XChaCha20; có kiến trúc zero-knowledge; đã qua kiểm tra bảo mật độc lập trong 24 tháng gần nhất; hỗ trợ mọi nền tảng nhóm dùng; và có kiểm soát quản trị để áp chính sách.',
        'Lựa chọn khuyến nghị: 1Password Business (7,99 USD/người/tháng) có kiểm soát quản trị toàn diện nhất, giám sát rò rỉ Watchtower và travel mode. Bitwarden Teams (4 USD/người/tháng) giá trị tốt với mã nguồn mở minh bạch. Dashlane Business (8 USD/người/tháng) gồm VPN và giám sát dark web.',
        'Mỗi thành viên phải tạo mật khẩu ngẫu nhiên riêng ít nhất 16 ký tự cho mọi tài khoản. Cấm dùng lại mật khẩu giữa bất kỳ tài khoản nào. Phải dùng trình tạo tích hợp của trình quản lý — mật khẩu do người tạo không được phép cho tài khoản công việc.',
        'Yêu cầu mật khẩu chính: cụm ít nhất 6 từ ngẫu nhiên hoặc mật khẩu ngẫu nhiên ít nhất 20 ký tự. Mật khẩu chính phải duy nhất (không dùng cho mục đích khác) và không được lưu kỹ thuật số ngoài trí nhớ người dùng. Có thể giữ bản giấy trong két cá nhân có khóa trong thời gian đầu luyện nhớ.',
      ],
    },
    {
      heading: 'Phần 3: Chính sách xác thực đa yếu tố',
      paragraphs: [
        'MFA là bắt buộc cho mọi tài khoản công việc hỗ trợ. Không có ngoại lệ cho bất kỳ ai, kể cả lãnh đạo và nhân viên tạm thời. MFA phải được bật trong 24 giờ sau khi tạo tài khoản. Tài khoản chưa bật MFA sau 48 giờ sẽ bị tạm ngưng cho đến khi cấu hình xong.',
        'Phương thức MFA được duyệt, theo thứ tự ưu tiên: khóa bảo mật phần cứng FIDO2/WebAuthn (YubiKey 5, Google Titan); ứng dụng TOTP (Google Authenticator, Authy, Microsoft Authenticator); thông báo đẩy từ trình quản lý mật khẩu được duyệt; mã SMS (chỉ khi dịch vụ cụ thể không còn cách nào khác).',
        'Yêu cầu khóa phần cứng: thành viên truy cập hệ thống sản phẩm, dữ liệu khách hàng hoặc hệ thống tài chính phải dùng khóa phần cứng làm MFA chính. Tổ chức cấp hai khóa cho mỗi nhân viên đủ điều kiện — một dùng hằng ngày, một dự phòng cất an toàn ở nhà. Mất khóa phải báo trong 2 giờ.',
        'Dự phòng và khôi phục: mọi mã dự phòng MFA phải lưu trong trình quản lý mật khẩu nhóm dưới dạng ghi chú an toàn. Mỗi người phải đăng ký ít nhất hai phương thức MFA hoạt động cho mọi tài khoản quan trọng (ví dụ khóa phần cứng + ứng dụng TOTP). Quy trình khôi phục được ghi lại và kiểm tra hằng năm.',
      ],
    },
    {
      heading: 'Phần 4: Xoay vòng và vòng đời mật khẩu',
      paragraphs: [
        'Tài khoản người dùng thường: KHÔNG xoay vòng theo lịch cố định. Theo hướng dẫn NIST 800-63B, xoay vòng định kỳ bắt buộc phản tác dụng. Chỉ đổi khi: có bằng chứng bị xâm phạm; mật khẩu xuất hiện trong cơ sở dữ liệu rò rỉ mới; vai trò nhân viên thay đổi đáng kể; hoặc nhân viên rời tổ chức.',
        'Tài khoản quản trị: xoay vòng mỗi 180 ngày và ngay khi nghi bị xâm phạm. Mật khẩu quản trị phải do trình quản lý tạo (tối thiểu 24 ký tự, hoàn toàn ngẫu nhiên) và không bao giờ chia sẻ.',
        'Tài khoản dịch vụ và khóa API: xoay vòng mỗi 90 ngày. Mọi thông tin tài khoản dịch vụ phải lưu trong hệ thống quản lý bí mật (HashiCorp Vault, AWS Secrets Manager hoặc tương đương) — không bao giờ trong mã nguồn, tệp cấu hình hoặc biến môi trường ở kho chung. Gắn cứng thông tin đăng nhập là lỗi có thể bị sa thải.',
        'Nhân viên rời tổ chức: mọi mật khẩu và token truy cập liên quan phải được xoay vòng hoặc thu hồi trong 4 giờ sau thông báo nghỉ việc. Nhóm CNTT giữ danh sách kiểm tra mọi hệ thống cần xoay thông tin khi nhân viên rời đi.',
      ],
    },
    {
      heading: 'Phần 5: Ứng phó sự cố rò rỉ thông tin đăng nhập',
      paragraphs: [
        'Khi nghi ngờ hoặc xác nhận thông tin đăng nhập bị xâm phạm, áp dụng quy trình sau. Ngay lập tức (trong 30 phút): vô hiệu hóa tài khoản bị xâm phạm; xoay thông tin bị lộ; kiểm tra log kiểm toán tìm truy cập trái phép; bật giám sát tăng cường trên hệ thống bị ảnh hưởng.',
        'Ngắn hạn (trong 24 giờ): xác định phạm vi xâm phạm — tài khoản được quyền truy cập dữ liệu gì? Xem mọi hành động của tài khoản trong 30 ngày qua. Nếu mật khẩu bị lộ được dùng lại (vi phạm chính sách), xoay mọi tài khoản dùng mật khẩu đó. Thông báo cho bên liên quan theo quy định.',
        'Sau sự cố (trong 7 ngày): phân tích nguyên nhân gốc, ghi lại cách xâm phạm xảy ra, kiểm soát nào thất bại và cần cải tiến gì. Cập nhật chính sách mật khẩu nếu sự cố lộ khoảng trống. Đào tạo bảo mật có mục tiêu cho nhân viên bị ảnh hưởng. Ghi hồ sơ sự cố để tuân thủ.',
        'Thời hạn thông báo rò rỉ: GDPR yêu cầu thông báo trong 72 giờ sau khi phát hiện; PCI DSS yêu cầu báo ngay cho các thương hiệu thanh toán; luật thông báo rò rỉ cấp bang khác nhau. Nhóm pháp lý phải được thông báo trong 2 giờ khi nghi rò rỉ liên quan dữ liệu khách hàng.',
      ],
    },
    {
      heading: 'Phần 6: Đào tạo và tuân thủ',
      paragraphs: [
        'Mọi nhân viên phải hoàn thành đào tạo bảo mật mật khẩu trong tuần đầu và hằng năm sau đó. Nội dung gồm: cách dùng trình quản lý mật khẩu của tổ chức; cách tạo và quản lý cụm mật khẩu; nhận diện lừa đảo nhắm thông tin đăng nhập; xử lý đúng thiết bị MFA và mã dự phòng; và quy trình báo cáo sự cố.',
        'Tuân thủ được xác minh qua kiểm toán hằng quý bảng sức khỏe của trình quản lý mật khẩu nhóm. Chỉ số theo dõi gồm: tỷ lệ tài khoản dùng mật khẩu riêng; độ dài trung bình; số mật khẩu xuất hiện trong cơ sở dữ liệu rò rỉ; tỷ lệ dùng MFA; và thời gian khắc phục vấn đề bị gắn cờ.',
        'Vi phạm chính sách được xử lý tăng dần: lần đầu nhận đào tạo thêm và cảnh cáo bằng văn bản; lần hai nhận khiển trách chính thức và buổi vệ sinh mật khẩu có giám sát; lần ba bị hạn chế truy cập hệ thống chờ đánh giá bảo mật. Vi phạm cố ý (chia sẻ thông tin, tắt MFA, gắn cứng bí mật) có thể bị xử lý kỷ luật ngay.',
      ],
      bullets: [
        'Đào tạo bảo mật trong tuần đầu + nhắc lại hằng năm',
        'Kiểm toán sức khỏe mật khẩu hằng quý qua bảng điều khiển',
        'Theo dõi: mật khẩu riêng, độ dài, phơi lộ rò rỉ, tỷ lệ MFA',
        'Kỷ luật tăng dần với vi phạm chính sách',
        'Xử lý ngay với vi phạm cố ý',
        'Ghi hồ sơ hoàn thành đào tạo để tuân thủ',
      ],
    },
    {
      heading: 'Áp dụng mẫu này',
      paragraphs: [
        'Để triển khai: trước hết, thuyết phục lãnh đạo bằng cách so chi phí rò rỉ thông tin đăng nhập với chi phí đăng ký trình quản lý mật khẩu. IBM báo cáo chi phí rò rỉ trung bình 4,88 triệu USD — đăng ký trình quản lý chỉ là một phần nhỏ của rủi ro đó.',
        'Thứ hai, chọn và triển khai trình quản lý mật khẩu trước khi công bố chính sách. Cấu hình sẵn kho nhóm, nhập thông tin chia sẻ hiện có và tạo tài liệu hướng dẫn. Chuyển đổi càng mượt, tỷ lệ áp dụng càng cao.',
        'Thứ ba, công bố chính sách kèm thời gian ân hạn (thường 30 ngày) để tuân thủ đầy đủ. Trong thời gian này, tổ chức buổi hỗ trợ trực tiếp để thành viên thiết lập trình quản lý, tạo mật khẩu mới và cấu hình MFA với hướng dẫn của CNTT.',
        'Cuối cùng, xem xét và cập nhật chính sách ít nhất hằng năm. Mối đe dọa thay đổi, công cụ mới xuất hiện và quy định cũng đổi. Mỗi lần rà soát nên gồm bài học từ sự cố năm trước và phản hồi của thành viên về khó khăn thực tế.',
      ],
    },
  ],
};

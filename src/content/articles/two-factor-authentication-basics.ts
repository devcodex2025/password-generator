import type { LocalizedArticleContent } from '../articles';

export const en: LocalizedArticleContent = {
  title: 'Two-Factor Authentication Basics: A Complete 2026 Guide',
  excerpt:
    'A clear guide to 2FA methods, setup priorities, and common mistakes to avoid. Covers TOTP, hardware keys, SMS risks, and how to protect your accounts beyond passwords.',
  seoTitle: 'Two-Factor Authentication Basics: A Complete 2026 Guide',
  seoDescription:
    'Complete 2FA guide covering TOTP apps, hardware security keys, SMS risks, setup priorities, backup codes, and enterprise deployment. Use the generator to.',
  keywords: [
    '2FA setup guide',
    'two-factor authentication basics',
    'TOTP authenticator app',
    'YubiKey setup',
    'MFA security guide',
    'hardware security key',
  ],
  sections: [
    {
      heading: 'Why Passwords Alone Are Not Enough',
      paragraphs: [
        'Even a perfectly unique, high-entropy password can be compromised through phishing, keyloggers, man-in-the-middle attacks, or server-side breaches. Google\'s 2019 security study found that adding a recovery phone number (a basic second factor) blocked 100% of automated bot attacks, 99% of bulk phishing attacks, and 66% of targeted attacks. More sophisticated MFA methods like hardware keys blocked 100% of all three attack types.',
        'Two-factor authentication (2FA), also called multi-factor authentication (MFA), requires you to prove your identity with two different types of evidence: something you know (your password), something you have (a phone, hardware key, or smart card), or something you are (fingerprint, face, iris scan). Using two factors from different categories ensures that compromising one factor alone is not enough to access your account.',
        'The three primary 2FA methods available to consumers in 2026 are: time-based one-time passwords (TOTP) via authenticator apps, FIDO2/WebAuthn hardware security keys, and SMS or voice call codes. Each has different security properties, convenience trade-offs, and appropriate use cases.',
      ],
    },
    {
      heading: 'TOTP Authenticator Apps: The Practical Standard',
      paragraphs: [
        'TOTP (Time-based One-Time Password) apps generate a new 6-digit code every 30 seconds based on a shared secret established during setup. The code is computed locally on your device, so no internet connection is required for generation. Popular TOTP apps include Google Authenticator, Microsoft Authenticator, Authy, and Aegis (open-source Android app).',
        'To set up TOTP, the service shows you a QR code containing the shared secret. Your authenticator app scans this code and stores the secret. From that point on, the app generates codes that match what the server expects. Because the secret is shared at setup time and never transmitted again, TOTP is resistant to network interception.',
        'Security considerations: the shared secret is stored on your device, so a stolen or compromised device could expose all your TOTP secrets. Authy offers encrypted cloud backup of TOTP secrets, which provides recovery capability but introduces a cloud dependency. Google Authenticator now offers optional Google Account backup. Aegis allows encrypted local exports. Choose based on your preference for convenience versus cloud independence.',
        'TOTP limitations: the 30-second window means codes are briefly vulnerable to real-time phishing (where an attacker proxies your login and captures both password and TOTP code simultaneously). TOTP also does not verify the identity of the site you are logging into, so you might enter a code on a phishing site that looks identical to the real service. This is where hardware keys provide superior protection.',
      ],
    },
    {
      heading: 'Hardware Security Keys: Maximum Protection',
      paragraphs: [
        'FIDO2/WebAuthn hardware keys (YubiKey, Google Titan, SoloKeys) provide the strongest available consumer 2FA. When you register a key with a service, the key generates a unique cryptographic key pair. During login, the key signs a challenge from the server that includes the site\'s domain. This domain binding makes hardware keys immune to phishing: even if you click a phishing link, the key will not authenticate because the domain does not match.',
        'YubiKey 5 series supports USB-A, USB-C, NFC, and Lightning connections, covering virtually every device. Google Titan Keys offer USB-A/USB-C and Bluetooth options. SoloKeys provides open-source FIDO2 keys for the security-conscious. Prices range from $25-75 per key.',
        'For full protection, purchase at least two keys: register both with every service, use one daily and store the other in a secure location as a backup. If you lose your primary key, the backup key can still authenticate. Without a backup key, losing your primary key could lock you out of all your accounts.',
        'Hardware key deployment is expanding rapidly. Google, Microsoft, Apple, GitHub, Cloudflare, Facebook, Twitter, Coinbase, Binance, and most major services now support FIDO2 keys. Apple\'s passkey system, built on the same FIDO2 standard, is bringing hardware-key-level security to consumer devices through built-in biometric authentication.',
      ],
    },
    {
      heading: 'SMS and Voice Call 2FA: Known Weaknesses',
      paragraphs: [
        'SMS-based 2FA sends a one-time code to your phone number via text message. While better than no 2FA at all, SMS has well-documented vulnerabilities. SIM swapping (where an attacker convinces your mobile carrier to transfer your number to their SIM card) is the most serious threat. In 2024, the FBI reported over $68 million in losses from SIM-swap attacks.',
        'SS7 protocol vulnerabilities allow technically sophisticated attackers to intercept SMS messages without physical access to your phone. While these attacks require telecom-level access, they have been documented in real-world targeted attacks against high-value individuals.',
        'SMS codes are also delivered in plain text and may appear in lock screen notifications, making them vulnerable to shoulder-surfing. Some malware can read incoming SMS messages. And SMS codes, like TOTP, are vulnerable to real-time phishing attacks that capture the code as you enter it.',
        'Despite these weaknesses, SMS 2FA is dramatically better than no 2FA. If a service only offers SMS-based MFA, enable it. The vast majority of account compromises target accounts with no second factor at all. Upgrade to TOTP or hardware keys when available, but do not leave accounts unprotected because the only 2FA option is SMS.',
      ],
    },
    {
      heading: 'Setup Priority: Which Accounts First',
      paragraphs: [
        'Priority 1: Email accounts. Your email is the recovery point for almost every other account. Compromised email means an attacker can reset passwords everywhere. Enable MFA immediately on all email accounts, using the strongest method available.',
        'Priority 2: Financial accounts. Banking, investment platforms, cryptocurrency exchanges, and payment services (PayPal, Stripe). These accounts contain direct access to your money. Use hardware keys where supported.',
        'Priority 3: Cloud storage and work accounts. Google Workspace, Microsoft 365, Dropbox, iCloud. These contain years of personal and professional data. Compromising cloud storage often exposes enough information for full identity theft.',
        'Priority 4: Social media. Facebook, Instagram, Twitter/X, LinkedIn. These accounts are used for social engineering attacks against your contacts and can cause significant reputational damage. They also serve as OAuth login providers for many other services.',
        'Priority 5: Shopping and streaming. Amazon, Netflix, Spotify. While lower priority, compromised shopping accounts with saved payment methods can result in fraudulent purchases. Enable MFA on any account with stored payment information.',
      ],
    },
    {
      heading: 'Backup Codes and Recovery Planning',
      paragraphs: [
        'When you enable 2FA, most services provide a set of one-time backup codes (typically 8-10 codes). These are your emergency access method if you lose your 2FA device. Treat them with the same security as your master password, because they are effectively a bypass for your second factor.',
        'Store backup codes in your password manager as a secure note attached to the relevant account. If your password manager is also secured with MFA, ensure you have an independent recovery path (such as backup codes stored on paper in a safe, or a backup hardware key registered with the password manager).',
        'Plan your recovery hierarchy: your most critical accounts need at least two independent recovery methods. For example: primary hardware key + backup hardware key + backup codes stored in a fireproof safe. For less critical accounts: TOTP app + backup codes in your password manager is usually sufficient.',
        'If you use Authy with cloud backup enabled, losing your phone is less catastrophic: you can install Authy on a new device and restore your TOTP secrets. However, this adds a cloud dependency that security purists may wish to avoid. The trade-off between recovery convenience and minimized attack surface is a personal decision.',
      ],
    },
    {
      heading: 'Common 2FA Mistakes to Avoid',
      paragraphs: [
        'Using the same phone number for both 2FA and account recovery. If an attacker performs a SIM swap, they gain access to both your 2FA codes and your recovery mechanism. Use a separate phone number or, better yet, use hardware keys and backup codes instead of SMS entirely.',
        'Not having backup codes or a backup authentication method. If your phone is lost, stolen, or destroyed, you need an alternative way to access your accounts. Generate and securely store backup codes for every service where you enable 2FA.',
        'Taking screenshots of QR codes during TOTP setup. The QR code contains the secret that generates your OTP codes. A screenshot stored in your camera roll could be accessed by any app with photo permissions or synced to cloud storage. If you need to save the secret, use your password manager\'s secure notes or the authenticator app\'s encrypted export feature.',
        'Approving unexpected push notifications. Some MFA implementations use push notifications (tap to approve). Attackers send repeated login attempts, hoping you will approve one out of fatigue or confusion; this is called MFA fatigue or push bombing. Never approve a notification you did not initiate. Modern implementations now require entering a number displayed on the login screen to prevent this attack.',
      ],
      bullets: [
        'Do not use the same phone for 2FA SMS and account recovery',
        'Always generate and store backup codes',
        'Never screenshot TOTP QR codes',
        'Never approve unexpected MFA push notifications',
        'Register at least two hardware keys per account',
        'Use TOTP or hardware keys instead of SMS when available',
        'Test your recovery methods before you need them',
      ],
    },
  ],
};

export const ua: LocalizedArticleContent = {
  title: 'Основи двофакторної аутентифікації: повний гід 2026',
  excerpt:
    'Зрозумілий гід з методів 2FA, пріоритетів налаштування та поширених помилок. Охоплює TOTP, апаратні ключі, ризики SMS та захист акаунтів за межами паролів.',
  seoTitle: 'Основи двофакторної аутентифікації: повний гід 2026',
  seoDescription:
    'Повний гід з 2FA: TOTP-застосунки, апаратні ключі безпеки, ризики SMS, пріоритети налаштування, резервні коди та корпоративне впровадження. Створіть унікальний.',
  keywords: [
    'гід з налаштування 2FA',
    'основи двофакторної аутентифікації',
    'TOTP застосунок аутентифікатор',
    'налаштування YubiKey',
    'гід з безпеки MFA',
    'апаратний ключ безпеки',
  ],
  sections: [
    {
      heading: 'Чому одних паролів недостатньо',
      paragraphs: [
        'Навіть ідеально унікальний пароль з високою ентропією може бути скомпрометований через фішинг, кейлогери, атаки "людина посередині" або витоки на стороні сервера. Дослідження Google 2019 року показало, що додавання номера телефону для відновлення (базовий другий фактор) заблокувало 100% автоматизованих бот-атак, 99% масових фішингових атак та 66% цілеспрямованих атак. Більш досконалі методи MFA, такі як апаратні ключі, заблокували 100% усіх трьох типів атак.',
        'Двофакторна аутентифікація (2FA), також відома як багатофакторна аутентифікація (MFA), вимагає підтвердження ідентичності двома різними типами доказів: щось, що ви знаєте (пароль), щось, що ви маєте (телефон, апаратний ключ) або щось, чим ви є (відбиток пальця, обличчя).',
        'Три основних методи 2FA у 2026 році: одноразові паролі на основі часу (TOTP) через застосунки-аутентифікатори, апаратні ключі безпеки FIDO2/WebAuthn та SMS або голосові коди.',
      ],
    },
    {
      heading: 'TOTP-застосунки: практичний стандарт',
      paragraphs: [
        'TOTP (Time-based One-Time Password) застосунки генерують новий 6-значний код кожні 30 секунд на основі спільного секрету, встановленого при налаштуванні. Код обчислюється локально на вашому пристрої, тож інтернет-з\'єднання не потрібне. Популярні TOTP-застосунки: Google Authenticator, Microsoft Authenticator, Authy та Aegis (open-source для Android).',
        'Для налаштування TOTP сервіс показує QR-код зі спільним секретом. Ваш застосунок-аутентифікатор сканує цей код і зберігає секрет. Відтоді застосунок генерує коди, що відповідають очікуванням сервера.',
        'Обмеження TOTP: 30-секундне вікно означає, що коди короткий час вразливі до фішингу в реальному часі. TOTP також не перевіряє ідентичність сайту, тож ви можете ввести код на фішинговому сайті. Тут апаратні ключі забезпечують кращий захист.',
      ],
    },
    {
      heading: 'Апаратні ключі безпеки: максимальний захист',
      paragraphs: [
        'Апаратні ключі FIDO2/WebAuthn (YubiKey, Google Titan, SoloKeys) забезпечують найнадійнішу доступну споживчу 2FA. При реєстрації ключ генерує унікальну криптографічну пару ключів. При вході ключ підписує виклик сервера, що включає домен сайту. Це прив\'язування до домену робить апаратні ключі імунними до фішингу.',
        'YubiKey 5 серії підтримує USB-A, USB-C, NFC та Lightning, охоплюючи практично кожен пристрій. Google Titan Keys пропонують USB-A/USB-C та Bluetooth. SoloKeys надають ключі FIDO2 з відкритим кодом. Ціни від $25-75 за ключ.',
        'Для повного захисту придбайте щонайменше два ключі: зареєструйте обидва з кожним сервісом, використовуйте один щодня та зберігайте інший у безпечному місці як резерв.',
        'Розгортання апаратних ключів швидко розширюється. Google, Microsoft, Apple, GitHub, Cloudflare, Facebook та більшість великих сервісів тепер підтримують ключі FIDO2.',
      ],
    },
    {
      heading: 'SMS та голосова 2FA: відомі слабкості',
      paragraphs: [
        'SMS-2FA надсилає одноразовий код на ваш номер телефону. Хоча це краще, ніж відсутність 2FA, SMS має задокументовані вразливості. SIM-swapping (коли зловмисник переконує оператора перевести ваш номер на свою SIM-картку) є найсерйознішою загрозою. У 2024 році ФБР повідомило про понад $68 мільйонів збитків від SIM-swap атак.',
        'Вразливості протоколу SS7 дозволяють технічно досвідченим зловмисникам перехоплювати SMS без фізичного доступу до вашого телефону.',
        'Попри ці слабкості, SMS-2FA драматично краща за відсутність 2FA. Якщо сервіс пропонує лише SMS-MFA, увімкніть її. Переважна більшість компрометацій акаунтів спрямована на акаунти без другого фактору взагалі.',
      ],
    },
    {
      heading: 'Пріоритет налаштування: які акаунти першими',
      paragraphs: [
        'Пріоритет 1: акаунти електронної пошти. Ваш email це точка відновлення майже для кожного іншого акаунту. Скомпрометована пошта означає, що зловмисник може скинути паролі всюди.',
        'Пріоритет 2: фінансові акаунти. банкінг, інвестиційні платформи, криптобіржі та платіжні сервіси. Ці акаунти містять прямий доступ до ваших грошей.',
        'Пріоритет 3: хмарне сховище та робочі акаунти. Google Workspace, Microsoft 365, Dropbox, iCloud.',
        'Пріоритет 4: соціальні мережі. Facebook, Instagram, Twitter/X, LinkedIn. Ці акаунти використовуються для атак соціальної інженерії та як OAuth-провайдери.',
        'Пріоритет 5: покупки та стримінг. Amazon, Netflix, Spotify. Увімкніть MFA на будь-якому акаунті зі збереженими платіжними даними.',
      ],
    },
    {
      heading: 'Резервні коди та планування відновлення',
      paragraphs: [
        'При увімкненні 2FA більшість сервісів надають набір одноразових резервних кодів (зазвичай 8-10 кодів). Це ваш екстрений метод доступу при втраті 2FA-пристрою. Поводьтеся з ними як з мастер-паролем, адже вони є обходом вашого другого фактора.',
        'Зберігайте резервні коди у менеджері паролів як безпечну нотатку. Якщо менеджер також захищений MFA, забезпечте незалежний шлях відновлення (резервні коди на папері у сейфі або резервний апаратний ключ).',
        'Плануйте ієрархію відновлення: критичні акаунти потребують щонайменше два незалежних методи відновлення.',
      ],
    },
    {
      heading: 'Поширені помилки 2FA',
      paragraphs: [
        'Використання одного номера телефону для 2FA та відновлення акаунту. Якщо зловмисник здійснить SIM-swap, він отримає доступ і до ваших 2FA-кодів, і до механізму відновлення.',
        'Відсутність резервних кодів або резервного методу аутентифікації. Якщо телефон загублений, вкрадений або зламаний, вам потрібен альтернативний спосіб доступу.',
        'Скріншоти QR-кодів при налаштуванні TOTP. QR-код містить секрет, що генерує ваші OTP-коди. Скріншот у фотоплівці може бути доступний будь-якому додатку з дозволами на фото.',
        'Підтвердження несподіваних push-повідомлень. Зловмисники надсилають повторні спроби входу, сподіваючись на підтвердження від втоми; це називається MFA fatigue або push bombing. Ніколи не підтверджуйте повідомлення, які ви не ініціювали.',
      ],
      bullets: [
        'Не використовуйте один телефон для SMS-2FA та відновлення',
        'Завжди генеруйте та зберігайте резервні коди',
        'Ніколи не робіть скріншоти QR-кодів TOTP',
        'Ніколи не підтверджуйте несподівані push-повідомлення MFA',
        'Реєструйте щонайменше два апаратних ключі на акаунт',
        'Використовуйте TOTP або апаратні ключі замість SMS',
        'Тестуйте методи відновлення до того, як вони знадобляться',
      ],
    },
  ],
};

export const es: LocalizedArticleContent = {
  title: 'Fundamentos de la autenticación de dos factores (2FA)',
  excerpt: 'Cómo funciona 2FA, por qué las contraseñas solas no son suficientes, y una guía práctica para elegir e implementar el método correcto: SMS, TOTP, FIDO2/WebAuthn y llaves de hardware.',
  seoTitle: 'Fundamentos de la autenticación de dos factores (2FA)',
  seoDescription: 'Guía completa de autenticación de dos factores. Compara SMS, TOTP, FIDO2/WebAuthn y llaves de hardware. Usa el generador para crear una contraseña única y.',
  keywords: ['autenticación dos factores', 'guía 2FA', 'TOTP vs SMS', 'llaves de seguridad FIDO2', 'WebAuthn explicado', 'autenticación multifactor'],
  sections: [
    { heading: 'Por qué las contraseñas solas no son suficientes', paragraphs: ['Incluso una contraseña perfecta de 20 caracteres puede ser capturada por phishing, malware o filtraciones en el servidor. 2FA añade una segunda capa que requiere algo que tienes físicamente.', 'Con 2FA habilitado, un atacante con tu contraseña aún necesita tu segundo factor. Esto frustra el phishing masivo, credential stuffing y muchos ataques dirigidos.', 'Los tres factores de autenticación son: algo que sabes (contraseña), algo que tienes (teléfono, llave hardware), algo que eres (biometría).'] },
    { heading: '2FA basado en SMS: mejor que nada, pero con limitaciones', paragraphs: ['SMS 2FA envía un código de un solo uso vía mensaje de texto. Es el método más común pero el menos seguro por vulnerabilidades como SIM swapping e interceptación SS7.', 'NIST clasifica SMS como autenticador "restringido": aceptable pero no recomendado cuando hay alternativas mejores disponibles.', 'Si SMS es tu única opción, úsalo. Pero planea migrar a TOTP o llaves de hardware lo antes posible.'] },
    { heading: 'TOTP: contraseñas de un solo uso basadas en tiempo', paragraphs: ['TOTP genera códigos de 6 dígitos que rotan cada 30 segundos usando un secreto compartido. Apps populares: Google Authenticator, Authy, Microsoft Authenticator, 1Password.', 'La ventaja: funciona sin conexión y no depende de la red celular. No es vulnerable a SIM swapping.', 'Al configurar TOTP, guarda los códigos de respaldo de forma segura. Si pierdes tu dispositivo sin respaldos, puedes quedar bloqueado permanentemente.'] },
    { heading: 'FIDO2/WebAuthn: el estándar dorado', paragraphs: ['FIDO2/WebAuthn utiliza criptografía de clave pública. El servidor almacena solo la clave pública; la clave privada nunca sale de tu dispositivo. Es inmune al phishing por diseño.', 'Llaves de hardware como YubiKey y Google Titan proporcionan la mayor seguridad. También se usan passkeys integradas en dispositivos con Windows Hello o Touch ID.', 'FIDO2 proporciona resistencia al phishing, prueba de presencia del usuario y verificación del origen criptográfica. Es el método recomendado por NIST para AAL3.'] },
    { heading: 'Elegir el método correcto para cada caso', paragraphs: ['Para cuentas de alta seguridad (email, banca, crypto): llaves de hardware FIDO2 como método principal con TOTP como respaldo.', 'Para cuentas corporativas: FIDO2 con políticas MDM. El costo de una YubiKey (~$50) es insignificante comparado con una brecha.', 'Para cuentas personales generales: TOTP como mínimo. Cualquier 2FA es mejor que ninguno.'] },
    { heading: 'Errores comunes de 2FA', paragraphs: ['Usar el mismo teléfono para SMS 2FA y recuperación de cuenta. Si un atacante hace SIM swap, obtiene ambos.', 'No generar códigos de respaldo. Sin un método alternativo, perder el teléfono significa perder el acceso.', 'Hacer capturas de pantalla de códigos QR TOTP. El QR contiene el secreto: una captura en tu galería puede ser accedida por cualquier app.', 'Aprobar notificaciones push inesperadas. Los atacantes envían intentos repetidos esperando fatiga MFA (push bombing).'], bullets: ['No usar el mismo teléfono para SMS 2FA y recuperación', 'Siempre generar y guardar códigos de respaldo', 'Nunca capturar pantalla de QR TOTP', 'Nunca aprobar push MFA inesperados', 'Registrar al menos dos llaves hardware por cuenta', 'Usar TOTP o llaves hardware en lugar de SMS', 'Probar métodos de recuperación antes de necesitarlos'] },
  ],
};

export const fr: LocalizedArticleContent = {
  title: 'Les bases de l\'authentification à deux facteurs (2FA)',
  excerpt: 'Comment fonctionne le 2FA, pourquoi les mots de passe seuls ne suffisent pas, et guide pratique pour choisir et implémenter la bonne méthode : SMS, TOTP, FIDO2/WebAuthn.',
  seoTitle: 'Les bases de l\'authentification à deux facteurs (2FA)',
  seoDescription: 'Guide complet du 2FA. Compare SMS, TOTP, FIDO2/WebAuthn et clés matérielles. Protégez vos comptes au-delà des mots de passe. Utilisez le générateur pour créer.',
  keywords: ['authentification deux facteurs', 'guide 2FA', 'TOTP vs SMS', 'clés sécurité FIDO2', 'WebAuthn expliqué', 'authentification multifacteur'],
  sections: [
    { heading: 'Pourquoi les mots de passe seuls ne suffisent pas', paragraphs: ['Même un mot de passe parfait peut être capturé par le phishing ou une fuite serveur. Le 2FA ajoute une couche nécessitant quelque chose de physique.', 'Avec le 2FA activé, un attaquant avec votre mot de passe a encore besoin du second facteur.', 'Les trois facteurs : connaissance (mot de passe), possession (téléphone, clé), inhérence (biométrie).'] },
    { heading: 'SMS 2FA : mieux que rien, mais limité', paragraphs: ['Le SMS envoie un code unique par message texte. C\'est le plus courant mais le moins sécurisé (SIM swapping, interception SS7).', 'NIST classe le SMS comme authentificateur « restreint ».', 'Si le SMS est votre seule option, utilisez-le. Mais migrez vers TOTP ou clés matérielles dès que possible.'] },
    { heading: 'TOTP : mots de passe à usage unique temporels', paragraphs: ['TOTP génère des codes de 6 chiffres qui changent toutes les 30 secondes. Apps : Google Authenticator, Authy, Microsoft Authenticator, 1Password.', 'Avantage : fonctionne hors ligne, pas de dépendance au réseau cellulaire, pas vulnérable au SIM swapping.', 'Sauvegardez les codes de récupération. Sans backup, perdre votre appareil = perdre l\'accès.'] },
    { heading: 'FIDO2/WebAuthn : le standard de référence', paragraphs: ['FIDO2/WebAuthn utilise la cryptographie à clé publique. Le serveur ne stocke que la clé publique. Immunisé contre le phishing par conception.', 'Les clés matérielles YubiKey et Google Titan offrent la plus haute sécurité. Les passkeys intégrées (Windows Hello, Touch ID) sont aussi supportées.', 'FIDO2 offre résistance au phishing, preuve de présence utilisateur et vérification d\'origine cryptographique.'] },
    { heading: 'Choisir la bonne méthode', paragraphs: ['Haute sécurité (email, banque, crypto) : clés FIDO2 principales + TOTP en backup.', 'Entreprise : FIDO2 avec politiques MDM. Le coût d\'une YubiKey (~50$) est négligeable face à une brèche.', 'Comptes personnels : TOTP au minimum. N\'importe quel 2FA vaut mieux qu\'aucun.'] },
    { heading: 'Erreurs courantes du 2FA', paragraphs: ['Utiliser le même téléphone pour SMS 2FA et récupération de compte.', 'Ne pas générer de codes de récupération.', 'Faire des captures d\'écran des QR TOTP.', 'Approuver des notifications push inattendues (MFA fatigue / push bombing).'], bullets: ['Ne pas utiliser le même téléphone pour SMS et récupération', 'Toujours sauvegarder les codes de récupération', 'Ne jamais capturer les QR TOTP', 'Ne jamais approuver un push MFA inattendu', 'Enregistrer au moins deux clés matérielles', 'Préférer TOTP ou clés matérielles au SMS', 'Tester les méthodes de récupération en avance'] },
  ],
};

export const de: LocalizedArticleContent = {
  title: 'Grundlagen der Zwei-Faktor-Authentifizierung (2FA)',
  excerpt: 'Wie 2FA funktioniert, warum Passwörter allein nicht ausreichen, und ein praktischer Leitfaden zur Wahl der richtigen Methode: SMS, TOTP, FIDO2/WebAuthn.',
  seoTitle: 'Grundlagen der Zwei-Faktor-Authentifizierung (2FA)',
  seoDescription: 'Wie 2FA funktioniert, warum Passwörter allein nicht ausreichen, und ein praktischer Leitfaden zur Wahl der richtigen Methode: SMS, TOTP, FIDO2/WebAuthn.',
  keywords: ['Zwei-Faktor-Authentifizierung', '2FA-Leitfaden', 'TOTP vs SMS', 'FIDO2 Sicherheitsschlüssel', 'WebAuthn erklärt', 'Multi-Faktor-Authentifizierung'],
  sections: [
    { heading: 'Warum Passwörter allein nicht ausreichen', paragraphs: ['Selbst ein perfektes Passwort kann durch Phishing oder Server-Leaks erfasst werden. 2FA fügt eine Ebene hinzu, die physischen Besitz erfordert.', 'Mit 2FA braucht ein Angreifer mit Ihrem Passwort noch den zweiten Faktor.', 'Die drei Faktoren: Wissen (Passwort), Besitz (Telefon, Schlüssel), Inhärenz (Biometrie).'] },
    { heading: 'SMS-2FA: besser als nichts, aber begrenzt', paragraphs: ['SMS sendet einen Einmalcode per Textnachricht. Am häufigsten, aber am wenigsten sicher (SIM-Swapping, SS7-Abfangen).', 'NIST stuft SMS als „eingeschränkten" Authentifikator ein.', 'Falls SMS Ihre einzige Option ist, nutzen Sie es. Migrieren Sie aber zu TOTP oder Hardware-Schlüsseln.'] },
    { heading: 'TOTP: zeitbasierte Einmalpasswörter', paragraphs: ['TOTP generiert 6-stellige Codes, die alle 30 Sekunden wechseln. Apps: Google Authenticator, Authy, Microsoft Authenticator, 1Password.', 'Vorteil: funktioniert offline, keine Mobilfunkabhängigkeit, nicht anfällig für SIM-Swapping.', 'Sichern Sie Wiederherstellungscodes. Ohne Backup = Zugang verloren bei Geräteverlust.'] },
    { heading: 'FIDO2/WebAuthn: der Goldstandard', paragraphs: ['FIDO2/WebAuthn nutzt Public-Key-Kryptographie. Der Server speichert nur den öffentlichen Schlüssel. Von Natur aus phishing-resistent.', 'Hardware-Schlüssel wie YubiKey und Google Titan bieten höchste Sicherheit.', 'FIDO2 bietet Phishing-Resistenz, Anwesenheitsnachweis und kryptographische Herkunftsverifizierung.'] },
    { heading: 'Die richtige Methode wählen', paragraphs: ['Hohe Sicherheit (E-Mail, Bank, Crypto): FIDO2-Schlüssel + TOTP als Backup.', 'Unternehmen: FIDO2 mit MDM-Richtlinien. Eine YubiKey (~50$) ist nichts gegen einen Datenverlust.', 'Persönliche Konten: TOTP als Minimum. Jedes 2FA ist besser als keins.'] },
    { heading: 'Häufige 2FA-Fehler', paragraphs: ['Gleiches Telefon für SMS-2FA und Kontowiederherstellung.', 'Keine Wiederherstellungscodes generieren.', 'Screenshots von TOTP-QR-Codes machen.', 'Unerwartete Push-Benachrichtigungen bestätigen (MFA-Ermüdung / Push-Bombing).'], bullets: ['Nicht dasselbe Telefon für SMS und Wiederherstellung nutzen', 'Immer Wiederherstellungscodes sichern', 'Nie TOTP-QR-Codes screenshotten', 'Nie unerwartete MFA-Pushes bestätigen', 'Mindestens zwei Hardware-Schlüssel registrieren', 'TOTP oder Hardware-Schlüssel statt SMS', 'Wiederherstellungsmethoden vorab testen'] },
  ],
};

export const it: LocalizedArticleContent = {
  title: 'Fondamenti dell\'autenticazione a due fattori (2FA)',
  excerpt: 'Come funziona il 2FA, perché le password da sole non bastano, e guida pratica per scegliere il metodo giusto: SMS, TOTP, FIDO2/WebAuthn e chiavi hardware.',
  seoTitle: 'Fondamenti dell\'autenticazione a due fattori (2FA)',
  seoDescription: 'Come funziona il 2FA, perché le password da sole non bastano, e guida pratica per scegliere il metodo giusto: SMS, TOTP, FIDO2/WebAuthn e chiavi hardware.',
  keywords: ['autenticazione due fattori', 'guida 2FA', 'TOTP vs SMS', 'chiavi sicurezza FIDO2', 'WebAuthn spiegato', 'autenticazione multifattore'],
  sections: [
    { heading: 'Perché le password da sole non bastano', paragraphs: ['Anche una password perfetta può essere catturata dal phishing o da fughe server. Il 2FA aggiunge un livello che richiede possesso fisico.', 'Con il 2FA abilitato, un attaccante con la tua password ha ancora bisogno del secondo fattore.', 'I tre fattori: conoscenza (password), possesso (telefono, chiave), inerenza (biometria).'] },
    { heading: 'SMS 2FA: meglio di niente, ma limitato', paragraphs: ['SMS invia un codice monouso via messaggio. È il più comune ma il meno sicuro (SIM swapping, intercettazione SS7).', 'NIST classifica SMS come autenticatore "limitato".', 'Se SMS è l\'unica opzione, usalo. Ma migra a TOTP o chiavi hardware prima possibile.'] },
    { heading: 'TOTP: password monouso basate sul tempo', paragraphs: ['TOTP genera codici a 6 cifre che ruotano ogni 30 secondi. App: Google Authenticator, Authy, Microsoft Authenticator, 1Password.', 'Vantaggio: funziona offline, nessuna dipendenza dalla rete cellulare, non vulnerabile a SIM swapping.', 'Salva i codici di recupero in modo sicuro. Senza backup, perdere il dispositivo = perdere l\'accesso.'] },
    { heading: 'FIDO2/WebAuthn: lo standard d\'oro', paragraphs: ['FIDO2/WebAuthn usa crittografia a chiave pubblica. Il server conserva solo la chiave pubblica. Immune al phishing per design.', 'Chiavi hardware come YubiKey e Google Titan offrono la massima sicurezza.', 'FIDO2 fornisce resistenza al phishing, prova di presenza utente e verifica dell\'origine crittografica.'] },
    { heading: 'Scegliere il metodo giusto', paragraphs: ['Alta sicurezza (email, banca, crypto): chiavi FIDO2 + TOTP come backup.', 'Aziendale: FIDO2 con politiche MDM.', 'Account personali: TOTP come minimo. Qualsiasi 2FA è meglio di nessuno.'] },
    { heading: 'Errori comuni del 2FA', paragraphs: ['Usare lo stesso telefono per SMS 2FA e recupero account.', 'Non generare codici di recupero.', 'Fare screenshot dei QR TOTP.', 'Approvare notifiche push inaspettate (MFA fatigue / push bombing).'], bullets: ['Non usare lo stesso telefono per SMS e recupero', 'Sempre generare e salvare codici di recupero', 'Mai fare screenshot dei QR TOTP', 'Mai approvare push MFA inaspettati', 'Registrare almeno due chiavi hardware', 'Preferire TOTP o chiavi hardware a SMS', 'Testare i metodi di recupero in anticipo'] },
  ],
};

export const pt: LocalizedArticleContent = {
  title: 'Fundamentos da autenticação de dois fatores (2FA)',
  excerpt: 'Como o 2FA funciona, por que senhas sozinhas não bastam, e guia prático para escolher o método certo: SMS, TOTP, FIDO2/WebAuthn e chaves de hardware.',
  seoTitle: 'Fundamentos da autenticação de dois fatores (2FA): guia 2FA',
  seoDescription: 'Como o 2FA funciona, por que senhas sozinhas não bastam, e guia prático para escolher o método certo: SMS, TOTP, FIDO2/WebAuthn e chaves de hardware.',
  keywords: ['autenticação dois fatores', 'guia 2FA', 'TOTP vs SMS', 'chaves segurança FIDO2', 'WebAuthn explicado', 'autenticação multifator'],
  sections: [
    { heading: 'Por que senhas sozinhas não bastam', paragraphs: ['Mesmo uma senha perfeita pode ser capturada por phishing ou vazamento de servidor. O 2FA adiciona uma camada que requer posse física.', 'Com 2FA habilitado, um atacante com sua senha ainda precisa do segundo fator.', 'Os três fatores: conhecimento (senha), posse (telefone, chave), inerência (biometria).'] },
    { heading: 'SMS 2FA: melhor que nada, mas limitado', paragraphs: ['SMS envia um código único por mensagem. É o mais comum mas menos seguro (SIM swapping, interceptação SS7).', 'NIST classifica SMS como autenticador "restrito".', 'Se SMS é sua única opção, use. Mas migre para TOTP ou chaves de hardware assim que possível.'] },
    { heading: 'TOTP: senhas de uso único baseadas em tempo', paragraphs: ['TOTP gera códigos de 6 dígitos que mudam a cada 30 segundos. Apps: Google Authenticator, Authy, Microsoft Authenticator, 1Password.', 'Vantagem: funciona offline, sem dependência de rede celular, não vulnerável a SIM swapping.', 'Salve os códigos de recuperação. Sem backup, perder o dispositivo = perder o acesso.'] },
    { heading: 'FIDO2/WebAuthn: o padrão ouro', paragraphs: ['FIDO2/WebAuthn usa criptografia de chave pública. O servidor armazena apenas a chave pública. Imune a phishing por design.', 'Chaves de hardware como YubiKey e Google Titan oferecem a maior segurança.', 'FIDO2 fornece resistência a phishing, prova de presença do usuário e verificação de origem criptográfica.'] },
    { heading: 'Escolher o método certo', paragraphs: ['Alta segurança (email, banco, crypto): chaves FIDO2 + TOTP como backup.', 'Corporativo: FIDO2 com políticas MDM.', 'Contas pessoais: TOTP como mínimo. Qualquer 2FA é melhor que nenhum.'] },
    { heading: 'Erros comuns do 2FA', paragraphs: ['Usar o mesmo telefone para SMS 2FA e recuperação de conta.', 'Não gerar códigos de recuperação.', 'Fazer capturas de tela de QR TOTP.', 'Aprovar notificações push inesperadas (fadiga MFA / push bombing).'], bullets: ['Não usar mesmo telefone para SMS e recuperação', 'Sempre gerar e salvar códigos de recuperação', 'Nunca capturar tela de QR TOTP', 'Nunca aprovar push MFA inesperado', 'Registrar pelo menos duas chaves hardware', 'Preferir TOTP ou chaves hardware a SMS', 'Testar métodos de recuperação antecipadamente'] },
  ],
};

export const ru: LocalizedArticleContent = {
  title: 'Основы двухфакторной аутентификации (2FA)',
  excerpt: 'Как работает 2FA, почему одних паролей недостаточно, и практическое руководство по выбору метода: SMS, TOTP, FIDO2/WebAuthn и аппаратные ключи.',
  seoTitle: 'Основы двухфакторной аутентификации (2FA): руководство 2FA',
  seoDescription: 'Как работает 2FA, почему одних паролей недостаточно, и практическое руководство по выбору метода: SMS, TOTP, FIDO2/WebAuthn и аппаратные ключи.',
  keywords: ['двухфакторная аутентификация', 'руководство 2FA', 'TOTP vs SMS', 'ключи безопасности FIDO2', 'WebAuthn объяснение', 'многофакторная аутентификация'],
  sections: [
    { heading: 'Почему одних паролей недостаточно', paragraphs: ['Даже идеальный пароль может быть перехвачен фишингом или утечкой с сервера. 2FA добавляет уровень, требующий физического владения.', 'С включённым 2FA злоумышленнику с вашим паролем всё ещё нужен второй фактор.', 'Три фактора: знание (пароль), владение (телефон, ключ), биометрия.'] },
    { heading: 'SMS 2FA: лучше, чем ничего, но с ограничениями', paragraphs: ['SMS отправляет одноразовый код. Самый распространённый, но наименее безопасный (SIM swapping, перехват SS7).', 'NIST классифицирует SMS как «ограниченный» аутентификатор.', 'Если SMS единственный вариант, используйте его. Но мигрируйте на TOTP или аппаратные ключи.'] },
    { heading: 'TOTP: временные одноразовые пароли', paragraphs: ['TOTP генерирует 6-значные коды каждые 30 секунд. Приложения: Google Authenticator, Authy, Microsoft Authenticator, 1Password.', 'Преимущество: работает офлайн, не зависит от сети, не уязвим к SIM swapping.', 'Сохраните коды восстановления. Без бэкапа потеря устройства = потеря доступа.'] },
    { heading: 'FIDO2/WebAuthn: золотой стандарт', paragraphs: ['FIDO2/WebAuthn использует криптографию с открытым ключом. Сервер хранит только публичный ключ. Неуязвим к фишингу по дизайну.', 'Аппаратные ключи YubiKey и Google Titan обеспечивают наивысшую безопасность.', 'FIDO2 обеспечивает защиту от фишинга, подтверждение присутствия и криптографическую проверку источника.'] },
    { heading: 'Выбор правильного метода', paragraphs: ['Высокая безопасность (почта, банк, крипто): FIDO2-ключи + TOTP как резерв.', 'Корпоративный: FIDO2 с политиками MDM.', 'Личные аккаунты: TOTP минимум. Любой 2FA лучше, чем ничего.'] },
    { heading: 'Распространённые ошибки 2FA', paragraphs: ['Один телефон для SMS 2FA и восстановления аккаунта.', 'Отсутствие резервных кодов.', 'Скриншоты QR-кодов TOTP.', 'Подтверждение неожиданных push-уведомлений (MFA fatigue / push bombing).'], bullets: ['Не использовать один телефон для SMS и восстановления', 'Всегда генерировать резервные коды', 'Никогда не скриншотить QR-коды TOTP', 'Никогда не подтверждать неожиданные MFA push', 'Регистрировать минимум два аппаратных ключа', 'Использовать TOTP или ключи вместо SMS', 'Тестировать методы восстановления заранее'] },
  ],
};

export const zh: LocalizedArticleContent = {
  title: '双因素认证(2FA)基础知识',
  excerpt: '2FA如何工作，为什么仅密码不够，以及选择正确方法的实用指南：SMS、TOTP、FIDO2/WebAuthn和硬件密钥。',
  seoTitle: '2FA基础：双因素认证实用指南 | generatepasswordto.me',
  seoDescription: '2FA如何工作，为什么仅密码不够，以及选择正确方法的实用指南：SMS、TOTP、FIDO2/WebAuthn和硬件密钥。',
  keywords: ['双因素认证', '2FA指南', 'TOTP对比SMS', 'FIDO2安全密钥', 'WebAuthn详解', '多因素认证'],
  sections: [
    { heading: '为什么仅密码不够', paragraphs: ['即使足够强的密码也可能被钓鱼或服务器泄露捕获。2FA添加了需要物理持有的第二层。', '启用2FA后，拥有您密码的攻击者仍需要第二因素。', '三个认证因素：知识（密码）、持有（手机、密钥）、固有（生物特征）。'] },
    { heading: 'SMS 2FA：聊胜于无但有限制', paragraphs: ['SMS发送一次性验证码。最常见但最不安全（SIM卡交换、SS7拦截）。', 'NIST将SMS分类为"受限"认证器。', '如果SMS是唯一选择，请使用。但尽快迁移到TOTP或硬件密钥。'] },
    { heading: 'TOTP：基于时间的一次性密码', paragraphs: ['TOTP每30秒生成6位数代码。应用：Google Authenticator、Authy、Microsoft Authenticator、1Password。', '优势：离线工作，不依赖蜂窝网络，不受SIM交换影响。', '安全保存恢复代码。没有备份，丢失设备=丢失访问权限。'] },
    { heading: 'FIDO2/WebAuthn：黄金标准', paragraphs: ['FIDO2/WebAuthn使用公钥密码学。服务器仅存储公钥。设计上免疫钓鱼。', 'YubiKey和Google Titan等硬件密钥提供最高安全性。', 'FIDO2提供抗钓鱼、用户在场证明和加密来源验证。'] },
    { heading: '选择正确的方法', paragraphs: ['高安全性（邮箱、银行、加密货币）：FIDO2密钥+TOTP备份。', '企业：FIDO2配合MDM策略。', '个人账户：至少TOTP。任何2FA都比没有好。'] },
    { heading: '常见2FA错误', paragraphs: ['同一手机用于SMS 2FA和账户恢复。', '未生成恢复代码。', '对TOTP QR码截图。', '批准意外的推送通知（MFA疲劳/推送轰炸）。'], bullets: ['不要同一手机用于SMS和恢复', '始终生成并保存恢复代码', '永远不要截图TOTP QR码', '永远不要批准意外的MFA推送', '每个账户至少注册两个硬件密钥', '使用TOTP或硬件密钥代替SMS', '提前测试恢复方法'] },
  ],
};

export const ja: LocalizedArticleContent = {
  title: '二要素認証(2FA)の基礎知識',
  excerpt: '2FAの仕組み、パスワードだけでは不十分な理由、正しい方法の選び方：SMS、TOTP、FIDO2/WebAuthnとハードウェアキー。',
  seoTitle: '2FA基礎：二要素認証実践ガイド | generatepasswordto.me',
  seoDescription: '完全な2FAガイド。 SMS、TOTP、FIDO2/WebAuthn、ハードウェアキーを比較。 パスワード以上のアカウント保護を。',
  keywords: ['二要素認証', '2FAガイド', 'TOTP対SMS', 'FIDO2セキュリティキー', 'WebAuthn解説', '多要素認証'],
  sections: [
    { heading: 'なぜパスワードだけでは不十分か', paragraphs: ['どんなに強いパスワードでもフィッシングやサーバー漏洩で捕捉されます。2FAは物理的な所持を必要とする層を追加します。', '2FA有効時、パスワードを持つ攻撃者はまだ第二要素が必要です。', '3つの要素：知識（パスワード）、所持（電話、キー）、固有性（生体認証）。'] },
    { heading: 'SMS 2FA：ないよりましだが限定的', paragraphs: ['SMSはテキストメッセージでワンタイムコードを送信。最も一般的だが最も安全性が低い（SIMスワッピング、SS7傍受）。', 'NISTはSMSを「制限付き」認証器に分類。', 'SMSが唯一の選択肢なら使用を。ただしTOTPやハードウェアキーへの移行を計画してください。'] },
    { heading: 'TOTP：時間ベースのワンタイムパスワード', paragraphs: ['TOTPは30秒ごとに6桁のコードを生成。アプリ：Google Authenticator、Authy、Microsoft Authenticator、1Password。', 'メリット：オフライン動作、携帯ネットワーク不要、SIMスワッピング非脆弱。', 'リカバリーコードを安全に保存。バックアップなしでデバイスを紛失=アクセス喪失。'] },
    { heading: 'FIDO2/WebAuthn：ゴールドスタンダード', paragraphs: ['FIDO2/WebAuthnは公開鍵暗号を使用。サーバーは公開鍵のみ保存。設計上フィッシング耐性。', 'YubiKeyやGoogle Titanなどのハードウェアキーが最高のセキュリティ。', 'FIDO2はフィッシング耐性、ユーザー存在証明、暗号化オリジン検証を提供。'] },
    { heading: '適切な方法の選択', paragraphs: ['高セキュリティ（メール、銀行、暗号通貨）：FIDO2キー+TOTPバックアップ。', '企業：MDMポリシー付きFIDO2。', '個人アカウント：最低限TOTP。どんな2FAもないよりまし。'] },
    { heading: '一般的な2FAの間違い', paragraphs: ['SMS 2FAとアカウント復旧に同じ電話を使用。', 'リカバリーコードを生成しない。', 'TOTP QRコードのスクリーンショットを撮る。', '予期しないプッシュ通知を承認する（MFA疲労/プッシュボミング）。'], bullets: ['SMSと復旧に同じ電話を使わない', '常にリカバリーコードを生成・保存', 'TOTP QRコードを絶対にスクショしない', '予期しないMFAプッシュを承認しない', 'アカウントごとに最低2つのハードウェアキー', 'SMSよりTOTPやハードウェアキーを使用', '復旧方法を事前にテスト'] },
  ],
};

export const pl: LocalizedArticleContent = {
  title: 'Podstawy uwierzytelniania dwuskładnikowego (2FA)',
  excerpt: 'Jak działa 2FA, dlaczego same hasła nie wystarczą, i praktyczny przewodnik wyboru metody: SMS, TOTP, FIDO2/WebAuthn i klucze sprzętowe. Nawet idealne hasło może zostać przechwycone przez phishing lub wyciek serwera.',
  seoTitle: 'Podstawy uwierzytelniania dwuskładnikowego (2FA): przewodnik 2FA',
  seoDescription: 'Jak działa 2FA, dlaczego same hasła nie wystarczą, i praktyczny przewodnik wyboru metody: SMS, TOTP, FIDO2/WebAuthn i klucze sprzętowe. Utwórz unikalne hasło w.',
  keywords: ['uwierzytelnianie dwuskładnikowe', 'przewodnik 2FA', 'TOTP vs SMS', 'klucze bezpieczeństwa FIDO2', 'WebAuthn wyjaśnione', 'uwierzytelnianie wieloskładnikowe'],
  sections: [
    { heading: 'Dlaczego same hasła nie wystarczą', paragraphs: ['Nawet idealne hasło może zostać przechwycone przez phishing lub wyciek serwera. 2FA dodaje warstwę wymagającą fizycznego posiadania.', 'Z włączonym 2FA atakujący z Twoim hasłem wciąż potrzebuje drugiego czynnika.', 'Trzy czynniki: wiedza (hasło), posiadanie (telefon, klucz), cecha (biometria).'] },
    { heading: 'SMS 2FA: lepsze niż nic, ale ograniczone', paragraphs: ['SMS wysyła jednorazowy kod. Najpopularniejszy, ale najmniej bezpieczny (SIM swapping, przechwytywanie SS7).', 'NIST klasyfikuje SMS jako „ograniczony" authenticator.', 'Jeśli SMS to jedyna opcja, używaj. Ale migruj do TOTP lub kluczy sprzętowych.'] },
    { heading: 'TOTP: czasowe hasła jednorazowe', paragraphs: ['TOTP generuje 6-cyfrowe kody co 30 sekund. Aplikacje: Google Authenticator, Authy, Microsoft Authenticator, 1Password.', 'Zaleta: działa offline, bez zależności od sieci, niewrażliwy na SIM swapping.', 'Zapisz kody odzyskiwania. Bez backupu utrata urządzenia = utrata dostępu.'] },
    { heading: 'FIDO2/WebAuthn: złoty standard', paragraphs: ['FIDO2/WebAuthn używa kryptografii klucza publicznego. Serwer przechowuje tylko klucz publiczny. Odporny na phishing z założenia.', 'Klucze sprzętowe YubiKey i Google Titan oferują najwyższe bezpieczeństwo.', 'FIDO2 zapewnia odporność na phishing, dowód obecności użytkownika i kryptograficzną weryfikację pochodzenia.'] },
    { heading: 'Wybór właściwej metody', paragraphs: ['Wysoka ochrona (email, bank, krypto): klucze FIDO2 + TOTP jako backup.', 'Firmowy: FIDO2 z politykami MDM.', 'Konta osobiste: minimum TOTP. Jakiekolwiek 2FA jest lepsze niż żadne.'] },
    { heading: 'Częste błędy 2FA', paragraphs: ['Ten sam telefon do SMS 2FA i odzyskiwania konta.', 'Brak kodów odzyskiwania.', 'Zrzuty ekranu QR kodów TOTP.', 'Zatwierdzanie niespodziewanych powiadomień push (MFA fatigue / push bombing).'], bullets: ['Nie używać tego samego telefonu do SMS i odzyskiwania', 'Zawsze generować i przechowywać kody odzyskiwania', 'Nigdy nie robić zrzutów QR TOTP', 'Nigdy nie zatwierdzać niespodziewanych MFA push', 'Rejestrować minimum dwa klucze sprzętowe', 'Używać TOTP lub kluczy zamiast SMS', 'Testować metody odzyskiwania z wyprzedzeniem'] },
  ],
};

export const vi: LocalizedArticleContent = {
  title: 'Kiến thức cơ bản về xác thực hai yếu tố: hướng dẫn 2026',
  excerpt:
    'Hướng dẫn rõ ràng về các phương thức 2FA, thứ tự thiết lập và lỗi cần tránh. Gồm TOTP, khóa phần cứng, rủi ro SMS và cách bảo vệ tài khoản ngoài mật khẩu.',
  seoTitle: 'Kiến thức cơ bản về xác thực hai yếu tố: hướng dẫn 2026',
  seoDescription:
    'Hướng dẫn rõ ràng về các phương thức 2FA, thứ tự thiết lập và lỗi cần tránh. Gồm TOTP, khóa phần cứng, rủi ro SMS và cách bảo vệ tài khoản ngoài mật khẩu.',
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
      heading: 'Vì sao chỉ mật khẩu là chưa đủ',
      paragraphs: [
        'Kể cả mật khẩu hoàn toàn riêng biệt và entropy cao vẫn có thể bị xâm phạm qua lừa đảo trực tuyến, keylogger, tấn công xen giữa hoặc rò rỉ phía máy chủ. Nghiên cứu bảo mật của Google năm 2019 cho thấy thêm số điện thoại khôi phục (yếu tố thứ hai cơ bản) chặn 100% tấn công bot tự động, 99% lừa đảo hàng loạt và 66% tấn công có chủ đích. Khóa phần cứng chặn 100% cả ba loại.',
        'Xác thực hai yếu tố (2FA), còn gọi là xác thực đa yếu tố (MFA), yêu cầu chứng minh danh tính bằng hai loại bằng chứng khác nhau: thứ bạn biết (mật khẩu), thứ bạn có (điện thoại, khóa phần cứng, thẻ thông minh) hoặc thứ bạn là (vân tay, khuôn mặt, mống mắt). Dùng hai yếu tố khác nhóm bảo đảm xâm phạm một yếu tố là chưa đủ.',
        'Ba phương thức 2FA chính cho người dùng năm 2026: mật khẩu dùng một lần theo thời gian (TOTP) qua ứng dụng xác thực, khóa bảo mật phần cứng FIDO2/WebAuthn, và mã qua SMS hoặc cuộc gọi thoại. Mỗi cách có đặc tính bảo mật, mức tiện lợi và trường hợp dùng phù hợp riêng.',
      ],
    },
    {
      heading: 'Ứng dụng TOTP: chuẩn thực tế',
      paragraphs: [
        'Ứng dụng TOTP tạo mã 6 chữ số mới mỗi 30 giây dựa trên khóa bí mật chung thiết lập khi đăng ký. Mã được tính cục bộ trên thiết bị, không cần internet để tạo. Ứng dụng phổ biến: Google Authenticator, Microsoft Authenticator, Authy và Aegis (Android mã nguồn mở).',
        'Khi thiết lập TOTP, dịch vụ hiển thị mã QR chứa khóa bí mật. Ứng dụng quét mã và lưu khóa. Từ đó, ứng dụng tạo mã khớp với máy chủ. Vì khóa chỉ chia sẻ lúc thiết lập và không truyền lại, TOTP chống bị chặn trên mạng.',
        'Lưu ý bảo mật: khóa bí mật nằm trên thiết bị, nên thiết bị bị trộm hoặc xâm phạm có thể lộ mọi khóa TOTP. Authy có sao lưu đám mây mã hóa, giúp khôi phục nhưng phụ thuộc đám mây. Google Authenticator có sao lưu tài khoản Google tùy chọn. Aegis cho xuất cục bộ mã hóa. Chọn theo mức ưu tiên tiện lợi hay độc lập đám mây.',
        'Hạn chế của TOTP: cửa sổ 30 giây khiến mã có thể bị lừa đảo thời gian thực (kẻ tấn công chuyển tiếp đăng nhập và lấy cả mật khẩu lẫn mã TOTP). TOTP cũng không xác minh danh tính trang bạn đăng nhập, nên bạn có thể nhập mã trên trang giả giống hệt. Đây là lúc khóa phần cứng bảo vệ tốt hơn.',
      ],
    },
    {
      heading: 'Khóa bảo mật phần cứng: bảo vệ tối đa',
      paragraphs: [
        'Khóa phần cứng FIDO2/WebAuthn (YubiKey, Google Titan, SoloKeys) mang lại 2FA mạnh nhất cho người dùng. Khi đăng ký, khóa tạo cặp khóa mật mã riêng. Khi đăng nhập, khóa ký thử thách từ máy chủ có chứa tên miền trang. Ràng buộc tên miền khiến khóa miễn nhiễm lừa đảo trực tuyến: kể cả khi bấm link giả, khóa không xác thực vì tên miền không khớp.',
        'YubiKey 5 hỗ trợ USB-A, USB-C, NFC và Lightning, gần như mọi thiết bị. Google Titan có USB-A/USB-C và Bluetooth. SoloKeys cung cấp khóa FIDO2 mã nguồn mở. Giá 25-75 USD mỗi khóa.',
        'Để bảo vệ đầy đủ, mua ít nhất hai khóa: đăng ký cả hai với mọi dịch vụ, dùng một khóa hằng ngày và cất khóa kia an toàn làm dự phòng. Nếu mất khóa chính, khóa dự phòng vẫn xác thực được; không có khóa dự phòng có thể bị khóa khỏi mọi tài khoản.',
        'Việc dùng khóa phần cứng đang mở rộng nhanh. Google, Microsoft, Apple, GitHub, Cloudflare, Facebook, Twitter, Coinbase, Binance và phần lớn dịch vụ lớn đã hỗ trợ FIDO2. Hệ thống passkey của Apple, dựa trên cùng chuẩn FIDO2, mang bảo mật cấp khóa phần cứng tới thiết bị người dùng qua sinh trắc học tích hợp.',
      ],
    },
    {
      heading: 'SMS và gọi thoại: điểm yếu đã biết',
      paragraphs: [
        '2FA qua SMS gửi mã một lần tới số điện thoại. Dù tốt hơn không có 2FA, SMS có lỗ hổng đã được ghi nhận. Đổi SIM (kẻ tấn công thuyết phục nhà mạng chuyển số sang SIM của chúng) là mối đe dọa nghiêm trọng nhất. Năm 2024, FBI báo cáo thiệt hại hơn 68 triệu USD từ tấn công đổi SIM.',
        'Lỗ hổng giao thức SS7 cho phép kẻ tấn công có kỹ thuật chặn SMS mà không cần chạm vào điện thoại. Dù cần quyền truy cập cấp nhà mạng, các cuộc tấn công này đã được ghi nhận nhắm vào cá nhân giá trị cao.',
        'Mã SMS còn được gửi dạng văn bản thường và có thể hiện trên màn hình khóa, dễ bị nhìn trộm. Một số mã độc đọc được SMS đến. Và mã SMS, như TOTP, dễ bị lừa đảo thời gian thực lấy mã khi bạn nhập.',
        'Dù có điểm yếu, 2FA qua SMS vẫn tốt hơn hẳn không có 2FA. Nếu dịch vụ chỉ hỗ trợ SMS, hãy bật. Phần lớn vụ chiếm tài khoản nhắm vào tài khoản không có yếu tố thứ hai. Hãy nâng lên TOTP hoặc khóa phần cứng khi có, nhưng đừng để tài khoản không được bảo vệ chỉ vì lựa chọn duy nhất là SMS.',
      ],
    },
    {
      heading: 'Thứ tự thiết lập: tài khoản nào trước',
      paragraphs: [
        'Ưu tiên 1: email. Email là điểm khôi phục cho gần như mọi tài khoản khác. Email bị chiếm nghĩa là kẻ tấn công đặt lại được mật khẩu ở mọi nơi. Bật MFA ngay cho mọi tài khoản email bằng phương thức mạnh nhất.',
        'Ưu tiên 2: tài khoản tài chính. Ngân hàng, nền tảng đầu tư, sàn tiền mã hóa và dịch vụ thanh toán (PayPal, Stripe). Những tài khoản này tiếp cận trực tiếp tiền của bạn. Dùng khóa phần cứng khi được hỗ trợ.',
        'Ưu tiên 3: lưu trữ đám mây và tài khoản công việc. Google Workspace, Microsoft 365, Dropbox, iCloud. Chúng chứa nhiều năm dữ liệu cá nhân và nghề nghiệp. Lộ lưu trữ đám mây thường đủ thông tin để đánh cắp danh tính toàn diện.',
        'Ưu tiên 4: mạng xã hội. Facebook, Instagram, Twitter/X, LinkedIn. Những tài khoản này bị dùng cho tấn công kỹ thuật xã hội nhắm vào người liên hệ và có thể gây thiệt hại danh tiếng. Chúng còn là nhà cung cấp đăng nhập OAuth cho nhiều dịch vụ khác.',
        'Ưu tiên 5: mua sắm và giải trí. Amazon, Netflix, Spotify. Ít ưu tiên hơn, nhưng tài khoản mua sắm lưu phương thức thanh toán có thể bị dùng mua hàng gian lận. Bật MFA cho mọi tài khoản có lưu thông tin thanh toán.',
      ],
    },
    {
      heading: 'Mã dự phòng và kế hoạch khôi phục',
      paragraphs: [
        'Khi bật 2FA, hầu hết dịch vụ cung cấp bộ mã dự phòng dùng một lần (thường 8-10 mã). Đây là cách truy cập khẩn cấp nếu mất thiết bị 2FA. Hãy bảo vệ chúng như mật khẩu chính, vì chúng thực chất là đường vòng qua yếu tố thứ hai.',
        'Lưu mã dự phòng trong trình quản lý mật khẩu dưới dạng ghi chú an toàn gắn với tài khoản. Nếu trình quản lý cũng được bảo vệ bằng MFA, hãy có đường khôi phục độc lập (mã dự phòng viết trên giấy cất trong két, hoặc khóa phần cứng dự phòng đăng ký với trình quản lý).',
        'Lập thứ bậc khôi phục: tài khoản quan trọng nhất cần ít nhất hai cách khôi phục độc lập. Ví dụ: khóa phần cứng chính + khóa dự phòng + mã dự phòng trong két chống cháy. Với tài khoản ít quan trọng hơn: ứng dụng TOTP + mã dự phòng trong trình quản lý thường đủ.',
        'Nếu dùng Authy có sao lưu đám mây, mất điện thoại bớt thảm khốc: cài Authy trên máy mới và khôi phục khóa TOTP. Tuy nhiên, cách này thêm phụ thuộc đám mây mà người khắt khe về bảo mật có thể muốn tránh. Đánh đổi giữa tiện khôi phục và giảm bề mặt tấn công là quyết định cá nhân.',
      ],
    },
    {
      heading: 'Lỗi 2FA phổ biến cần tránh',
      paragraphs: [
        'Dùng cùng số điện thoại cho cả 2FA và khôi phục tài khoản. Nếu kẻ tấn công đổi SIM, chúng có cả mã 2FA lẫn cơ chế khôi phục. Hãy dùng số khác, hoặc tốt hơn là dùng khóa phần cứng và mã dự phòng thay vì SMS.',
        'Không có mã dự phòng hoặc phương thức xác thực dự phòng. Nếu điện thoại mất, bị trộm hoặc hỏng, bạn cần cách khác truy cập tài khoản. Tạo và lưu mã dự phòng an toàn cho mọi dịch vụ bật 2FA.',
        'Chụp màn hình mã QR khi thiết lập TOTP. Mã QR chứa khóa bí mật tạo mã OTP. Ảnh chụp trong thư viện có thể bị ứng dụng có quyền ảnh truy cập hoặc đồng bộ lên đám mây. Nếu cần lưu khóa, dùng ghi chú an toàn của trình quản lý mật khẩu hoặc tính năng xuất mã hóa của ứng dụng xác thực.',
        'Phê duyệt thông báo đẩy bất ngờ. Một số triển khai MFA dùng thông báo đẩy (chạm để duyệt). Kẻ tấn công gửi đăng nhập lặp lại, hy vọng bạn duyệt vì mệt mỏi hoặc bối rối; gọi là mệt mỏi MFA hay push bombing. Không bao giờ duyệt thông báo bạn không khởi tạo. Triển khai hiện đại yêu cầu nhập số hiển thị trên màn hình đăng nhập để chặn tấn công này.',
      ],
      bullets: [
        'Không dùng cùng số điện thoại cho SMS 2FA và khôi phục tài khoản',
        'Luôn tạo và lưu mã dự phòng',
        'Không chụp màn hình mã QR TOTP',
        'Không duyệt thông báo đẩy MFA bất ngờ',
        'Đăng ký ít nhất hai khóa phần cứng cho mỗi tài khoản',
        'Dùng TOTP hoặc khóa phần cứng thay vì SMS khi có thể',
        'Kiểm tra cách khôi phục trước khi cần đến',
      ],
    },
  ],
};

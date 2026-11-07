import type { LocalizedArticleContent } from '../articles';

export const en: LocalizedArticleContent = {
  title: 'Wi-Fi Password Guide: Creating and Changing a Strong Network Password',
  excerpt:
    'A practical guide to choosing a strong Wi-Fi password, changing it safely on your router, and keeping guests and smart devices on a separate network.',
  seoTitle: 'Wi-Fi Password Guide: Creating and Changing a Strong Network',
  seoDescription:
    'Learn how to create a strong Wi-Fi password, change it on your router, disable WPS, and separate guest devices without breaking your smart home.',
  keywords: [
    'wifi password',
    'wifi password generator',
    'strong wifi password',
    'change wifi password',
    'router password',
    'WPA3',
    'guest network',
  ],
  sections: [
    {
      heading: 'Why your Wi-Fi password deserves its own strategy',
      paragraphs: [
        'A Wi-Fi password protects more than internet access. Anyone who joins your network can often reach smart speakers, printers, network storage, and the router administration page. Once an attacker is inside the local network, weak device defaults and unpatched firmware become much easier to exploit.',
        'Most home networks still rely on a password that was chosen years ago, shared with visitors, and never changed after a device was sold or a roommate moved out. That is a normal human pattern, not a rare mistake. The practical fix is to treat the Wi-Fi password like any other credential: generate it randomly, store it in a password manager, and change it when the list of people who know it changes.',
        'This guide covers the password itself, the router settings that determine how much it matters, and a safe process for changing it without disconnecting every device in the house.',
      ],
    },
    {
      heading: 'What makes a Wi-Fi password strong',
      paragraphs: [
        'Length and randomness matter more than visual complexity. A 16-character random password drawn from a large alphabet gives an attacker an enormous search space, while a short password with a capital letter and an exclamation mark can still fall to a dictionary attack in minutes.',
        'For a home network, aim for at least 16 random characters, or a five- to six-word passphrase generated from a large word list. A longer password is also easier to type on a phone than a dense string of symbols, which matters when you need to reconnect guests and smart devices.',
        'Do not reuse your Wi-Fi password for email, banking, or a password manager. If it leaks from a router backup, a guest phone, or a printed note, the damage should stop at the network boundary.',
      ],
      bullets: [
        'Use at least 16 random characters, or 5-6 randomly chosen words.',
        'Prefer a cryptographically secure generator over a personal pattern.',
        'Keep the Wi-Fi password unique; never reuse an account password.',
        'Store it in a password manager and share it with a QR code when possible.',
      ],
    },
    {
      heading: 'How to change your Wi-Fi password',
      paragraphs: [
        'Open the router administration page from a device connected to the network. The address is usually printed on a sticker on the router, and common defaults include 192.168.1.1, 192.168.0.1, or a vendor-specific hostname. Sign in with the administrator password, not the Wi-Fi password; if the router still uses the factory administrator password, change that first.',
        'Find the wireless settings section and look for the security mode. Choose WPA3 if every device supports it, or WPA2/WPA3 mixed mode when older devices need compatibility. Avoid WEP and open networks entirely. Enter the new password, apply the settings, and reconnect your phone or laptop to confirm it works before changing anything else.',
        'Changing the Wi-Fi password disconnects every device that used the old one. Walk through the house afterwards and reconnect phones, laptops, TVs, consoles, printers, and smart-home devices. Keep the old password available only until the migration is complete, then delete any notes that contain it.',
      ],
      bullets: [
        'Sign in to the router with its administrator password.',
        'Set WPA3, or WPA2/WPA3 mixed mode for older devices.',
        'Use a freshly generated password, not a variation of the old one.',
        'Reconnect every device and remove old password notes afterwards.',
      ],
    },
    {
      heading: 'Choose a password you can type on a phone or TV remote',
      paragraphs: [
        'A password that is impossible to type invites shortcuts: a guest network with no password, a note taped to the fridge, or a shared password that never changes. Choose a format you can enter comfortably on the devices you actually use.',
        'A 16-character password with mixed case and digits is a good default. If your TV remote or game console makes symbols painful, a 5-6 word passphrase with hyphens is easier to type and still has strong entropy when the words are chosen randomly. Avoid substitutions such as replacing every "a" with "@"; they add little entropy and make the password harder to communicate.',
        'Many password managers can display the Wi-Fi password as a QR code. That is faster and less error-prone than reading a long string aloud, and it avoids writing the password on paper.',
      ],
    },
    {
      heading: 'Router settings that matter more than the password',
      paragraphs: [
        'A strong password cannot compensate for a router that accepts WPS PINs or exposes its administration page to the internet. After changing the password, review the settings that control how devices join and how the router is managed.',
        'Disable WPS unless you actively need it. The PIN method has a long history of brute-force weaknesses, and the push-button method can be abused by anyone with physical access. Keep remote administration disabled unless you understand the risk and have a specific need for it.',
        'Put guests and untrusted smart devices on a separate guest network. That network should have its own password, client isolation where available, and no access to the main LAN. Finally, install router firmware updates and replace hardware that no longer receives security fixes.',
      ],
      bullets: [
        'Disable WPS and remote administration.',
        'Use a guest network for visitors and inexpensive smart devices.',
        'Change the router administrator password from its factory default.',
        'Keep firmware updated and replace unsupported hardware.',
      ],
    },
    {
      heading: 'Home Wi-Fi versus public Wi-Fi',
      paragraphs: [
        'Your home Wi-Fi password controls who can join a network you trust. Public Wi-Fi is different: you do not control the router, other guests may be able to observe traffic, and captive portals can imitate familiar login pages. Treat public networks as untrusted even when they require a password.',
        'When you use public Wi-Fi, prefer HTTPS sites, avoid sensitive account changes on untrusted networks, and use a reputable VPN when you need to protect traffic from the local network. Turn off automatic joining for open networks so your phone does not connect silently to a lookalike access point.',
        'At home, the equivalent habit is to keep the guest network isolated and to review the list of connected devices from time to time. A device you do not recognize is a reason to change the Wi-Fi password and investigate, not just to rename the network.',
      ],
    },
    {
      heading: 'Good and bad Wi-Fi password examples',
      paragraphs: [
        'These examples are fictional and should not be used. They illustrate the difference between a password that only looks complex and one that is actually unpredictable.',
        'Bad examples follow a predictable template: a season, a year, a pet name, or a keyboard pattern. "Summer2026!" and "FluffyTheCat1" satisfy many complexity rules, but both are built from words and patterns that cracking tools try first. A router name such as "HomeWiFi-2026" makes the guess even easier.',
        'Good examples are randomly generated and long enough to resist guessing. A password such as "violet-harbor-cactus-42" is easy to type and memorable once, while a random 16-character string offers more entropy. Either is acceptable when it is unique, stored safely, and not derived from information shared on social media.',
      ],
    },
    {
      heading: 'Wi-Fi password FAQ',
      paragraphs: [
        'How long should a Wi-Fi password be? At least 16 random characters, or a 5-6 word passphrase. Longer is better, provided you will actually keep it unique and stored safely.',
        'Is a 12-character Wi-Fi password enough? It is better than a short password, but 16 characters or a strong passphrase gives a safer margin for a network that stays in use for years.',
        'How often should I change it? Change it when someone who knew it leaves, when a device is lost or sold, after a suspected compromise, or when you replace the router. Routine forced rotation is less important than removing access when the trust boundary changes.',
        'Can I use a passphrase instead of a random string? Yes. A randomly generated five- or six-word passphrase is strong and easier to type on a TV or console. Do not assemble it from a quote, song lyric, or a story about your life.',
        'What if I forget the new password? Check the password manager entry first. If it was never saved, connect to the router with an Ethernet cable and read or reset the Wi-Fi settings. A factory reset restores the default password but also wipes your configuration, so use it as a last resort.',
        'Should guests use the main network? Prefer a separate guest network with its own password and client isolation. It keeps visitor devices away from your printers, storage, and router administration page.',
      ],
    },
    {
      heading: 'Wi-Fi security checklist',
      paragraphs: [
        'Work through this list once, then revisit it when you replace a router or add a new category of device. The goal is not a perfectly locked-down network; it is a network where the important defaults are deliberate.',
      ],
      bullets: [
        'Wi-Fi password: 16+ random characters or a 5-6 word passphrase.',
        'Security mode: WPA3, or WPA2/WPA3 mixed mode for compatibility.',
        'WPS and remote administration: disabled unless required.',
        'Router administrator password: changed from the factory default.',
        'Guest network: separate password and client isolation enabled.',
        'Firmware: current, with a replacement plan for unsupported hardware.',
        'Device list: reviewed periodically for unknown clients.',
      ],
    },
  ],
};

export const ua: LocalizedArticleContent = {
  title: 'Wi-Fi пароль: як створити та змінити надійний пароль мережі',
  excerpt:
    'Практичний гід: як вибрати надійний пароль Wi-Fi, змінити його на роутері та відокремити гостьові й розумні пристрої в окрему мережу. Пароль Wi-Fi захищає не лише інтернет.',
  seoTitle: 'Wi-Fi пароль: як створити та змінити надійний пароль мережі',
  seoDescription:
    'Дізнайтеся, як створити надійний пароль Wi-Fi, змінити його на роутері, вимкнути WPS і захистити гостьові пристрої без шкоди для розумного дому.',
  keywords: [
    'пароль wifi',
    'пароль вай фай',
    'змінити пароль wifi',
    'надійний пароль wi-fi',
    'wpa3',
    'гостьова мережа',
    'роутер',
  ],
  sections: [
    {
      heading: 'Чому пароль Wi-Fi потребує окремої стратегії',
      paragraphs: [
        'Пароль Wi-Fi захищає не лише інтернет. Той, хто підключився до вашої мережі, часто бачить розумні колонки, принтери, мережеве сховище й сторінку адміністрування роутера. Слабкі заводські паролі пристроїв і застаріла прошивка полегшують атаку зсередини.',
        'Більшість домашніх мереж живуть із паролем, який вибрали роки тому, розповіли гостям і не змінили після продажу пристрою чи переїзду сусіда. Це звичайна людська поведінка, а не рідкісна помилка. Практичне рішення просте: ставтеся до пароля Wi-Fi як до будь-якого іншого облікового даного. Генеруйте його випадково, зберігайте в менеджері паролів і змінюйте, коли змінюється коло людей, які його знають.',
        'Далі йдеться про сам пароль, налаштування роутера, від яких залежить його користь, і безпечний порядок зміни без відключення всіх пристроїв у домі.',
      ],
    },
    {
      heading: 'Що робить пароль Wi-Fi надійним',
      paragraphs: [
        'Довжина і випадковість важливіші за зовнішню складність. Шістнадцять випадкових символів із великого алфавіту дають величезний простір для перебору. Короткий пароль із великою літерою та знаком оклику все одно падає від словникової атаки за хвилини.',
        'Для домашньої мережі беріть щонайменше 16 випадкових символів або парольну фразу з п\'яти-шести слів, згенерованих із великого списку. Довший пароль ще й зручніше вводити на телефоні, коли треба підключити гостя або новий пристрій.',
        'Не використовуйте пароль Wi-Fi для пошти, банкінгу чи менеджера паролів. Якщо він потрапить у резервну копію роутера, телефон гостя або паперову записку, збитки мають обмежитися мережею.',
      ],
      bullets: [
        'Щонайменше 16 випадкових символів або 5-6 випадкових слів.',
        'Генеруйте пароль криптографічно стійким генератором, а не власним шаблоном.',
        'Тримайте пароль Wi-Fi унікальним і не повторюйте пароль акаунта.',
        'Зберігайте його в менеджері паролів і діліться QR-кодом, коли це можливо.',
      ],
    },
    {
      heading: 'Як змінити пароль Wi-Fi',
      paragraphs: [
        'Відкрийте сторінку адміністрування роутера з пристрою, підключеного до мережі. Адреса зазвичай надрукована на наклейці корпусу: 192.168.1.1, 192.168.0.1 або власна назва хоста виробника. Входьте з паролем адміністратора, а не з паролем Wi-Fi. Якщо роутер досі використовує заводський пароль адміністратора, спершу змініть його.',
        'Знайдіть розділ бездротової мережі й подивіться на режим безпеки. Виберіть WPA3, якщо всі пристрої його підтримують, або змішаний WPA2/WPA3 для сумісності зі старішими пристроями. WEP і відкриті мережі не використовуйте взагалі. Введіть новий пароль, застосуйте налаштування й підключіть телефон або ноутбук, щоб перевірити результат до подальших змін.',
        'Після зміни пароля відключаються всі пристрої зі старим ключем. Пройдіться домом і підключіть телефони, ноутбуки, телевізори, консолі, принтери та розумні пристрої. Старий пароль тримайте лише до завершення міграції, а потім знищте записки з ним.',
      ],
      bullets: [
        'Увійдіть у роутер із паролем адміністратора.',
        'Увімкніть WPA3 або змішаний WPA2/WPA3 для старих пристроїв.',
        'Використайте свіжий згенерований пароль, а не варіацію старого.',
        'Підключіть усі пристрої й приберіть записки зі старим паролем.',
      ],
    },
    {
      heading: 'Виберіть пароль, який зручно вводити на телефоні й телевізорі',
      paragraphs: [
        'Пароль, який неможливо ввести, штовхає до обхідних шляхів: гостьова мережа без пароля, записка на холодильнику або спільний пароль, який ніколи не змінюють. Вибирайте формат, який ви реально зможете ввести на своїх пристроях.',
        'Шістнадцять символів із великими й малими літерами та цифрами — хороший стандарт. Якщо на пульті телевізора або консолі символи вводити незручно, парольна фраза з 5-6 слів через дефіс легша для введення, а випадкові слова зберігають високу ентропію. Не замінюйте кожну «а» на «@»: це додає мало ентропії й ускладнює передачу пароля.',
        'Багато менеджерів паролів показують пароль Wi-Fi як QR-код. Це швидше й менш схильне до помилок, ніж диктувати довгий рядок уголос, і не змушує записувати пароль на папері.',
      ],
    },
    {
      heading: 'Налаштування роутера, які важливіші за сам пароль',
      paragraphs: [
        'Надійний пароль не компенсує роутер, який приймає WPS PIN або відкриває сторінку адміністрування в інтернет. Після зміни пароля перевірте налаштування, які визначають, як пристрої підключаються і як керується роутер.',
        'Вимкніть WPS, якщо він вам справді не потрібен. PIN-метод давно має проблеми з перебором, а кнопку WPS може натиснути будь-хто з фізичним доступом. Віддалене адміністрування тримайте вимкненим, якщо не розумієте ризику й не маєте конкретної потреби.',
        'Виведіть гостей і недовірені розумні пристрої в окрему гостьову мережу. У неї має бути власний пароль, ізоляція клієнтів, якщо роутер її підтримує, і відсутність доступу до основної локальної мережі. Оновлюйте прошивку роутера й замінюйте обладнання, яке більше не отримує виправлень безпеки.',
      ],
      bullets: [
        'Вимкніть WPS і віддалене адміністрування.',
        'Використовуйте гостьову мережу для візитів і дешевих розумних пристроїв.',
        'Змініть заводський пароль адміністратора роутера.',
        'Оновлюйте прошивку й замінюйте непідтримуване обладнання.',
      ],
    },
    {
      heading: 'Домашня мережа і публічний Wi-Fi',
      paragraphs: [
        'Пароль домашнього Wi-Fi визначає, хто може приєднатися до мережі, якій ви довіряєте. Публічний Wi-Fi працює інакше: роутер вам не належить, інші гості можуть спостерігати за трафіком, а сторінки входу в гостьову мережу іноді імітують знайомі форми. Ставтеся до публічних мереж як до недовірених, навіть якщо для входу потрібен пароль.',
        'У публічному Wi-Fi віддавайте перевагу сайтам із HTTPS, не змінюйте важливі налаштування акаунтів у недовіреній мережі й використовуйте надійний VPN, коли треба захистити трафік від локальної мережі. Вимкніть автоматичне підключення до відкритих мереж, щоб телефон не приєднувався мовчки до схожої точки доступу.',
        'Удома аналогічна звичка — тримати гостьову мережу ізольованою й час від часу переглядати список підключених пристроїв. Незнайомий пристрій є приводом змінити пароль Wi-Fi і розібратися, а не просто перейменувати мережу.',
      ],
    },
    {
      heading: 'Приклади добрих і поганих паролів Wi-Fi',
      paragraphs: [
        'Ці приклади вигадані, не використовуйте їх. Вони показують різницю між паролем, який лише виглядає складним, і справді непередбачуваним.',
        'Погані приклади будуються за шаблоном: пора року, рік, ім\'я улюбленця або візерунок на клавіатурі. «Summer2026!» і «FluffyTheCat1» проходять багато вимог до складності, але обидва складаються зі слів і шаблонів, які інструменти зламу пробують першими. Назва мережі на кшталт «HomeWiFi-2026» ще більше спрощує вгадування.',
        'Добрі приклади генерують випадково й роблять достатньо довгими. Пароль «violet-harbor-cactus-42» легко ввести й запам\'ятати один раз, а випадковий рядок із 16 символів дає більше ентропії. Обидва варіанти придатні, якщо пароль унікальний, збережений безпечно й не пов\'язаний з інформацією з соцмереж.',
      ],
    },
    {
      heading: 'Часті запитання про пароль Wi-Fi',
      paragraphs: [
        'Якою має бути довжина пароля Wi-Fi? Щонайменше 16 випадкових символів або парольна фраза з 5-6 слів. Довший пароль кращий, якщо ви справді збережете його унікальним і безпечним.',
        'Чи достатньо 12 символів? Це краще за короткий пароль, але 16 символів або надійна парольна фраза дають більший запас для мережі, яка працюватиме роками.',
        'Як часто змінювати пароль? Коли хтось, хто його знав, виходить із дому чи команди; коли пристрій загубили або продали; після підозри на злам; коли ви міняєте роутер. Регулярна примусова ротація менш важлива, ніж вчасне позбавлення доступу.',
        'Чи можна замість випадкового рядка використати парольну фразу? Так. Випадкова фраза з п\'яти-шести слів надійна й зручніша для телевізора чи консолі. Не збирайте її з цитати, пісні або історії про своє життя.',
        'Що робити, якщо я забув новий пароль? Спершу перевірте запис у менеджері паролів. Якщо пароль не збережено, підключіться до роутера кабелем і подивіться або скиньте налаштування Wi-Fi. Заводське скидання повертає типовий пароль, але стирає конфігурацію, тому це крайній варіант.',
        'Чи можна пускати гостей в основну мережу? Краще дайте їм окрему гостьову мережу з власним паролем та ізоляцією клієнтів. Так пристрої відвідувачів не бачать ваших принтерів, сховища й сторінки адміністрування роутера.',
      ],
    },
    {
      heading: 'Чекліст безпеки Wi-Fi',
      paragraphs: [
        'Пройдіться цим списком один раз, а потім повертайтеся до нього, коли міняєте роутер або додаєте новий тип пристроїв. Мета не в ідеально закритій мережі, а в тому, щоб важливі типові налаштування були свідомими.',
      ],
      bullets: [
        'Пароль Wi-Fi: 16+ випадкових символів або фраза з 5-6 слів.',
        'Режим безпеки: WPA3 або змішаний WPA2/WPA3 для сумісності.',
        'WPS і віддалене адміністрування: вимкнено, якщо не потрібні.',
        'Пароль адміністратора роутера: змінений із заводського.',
        'Гостьова мережа: окремий пароль та ізоляція клієнтів.',
        'Прошивка: актуальна, з планом заміни непідтримуваного обладнання.',
        'Список пристроїв: періодично перевіряйте на незнайомі клієнти.',
      ],
    },
  ],
};

export const es: LocalizedArticleContent = {
  title: 'Contraseña wifi: cómo crear y cambiar una clave segura',
  excerpt:
    'Guía práctica para elegir una contraseña wifi segura, cambiarla en el router y separar invitados y dispositivos inteligentes en una red aparte.',
  seoTitle: 'Contraseña wifi: cómo crear y cambiar una clave segura',
  seoDescription:
    'Aprende a crear una contraseña wifi segura, cambiarla en el router, desactivar WPS y aislar invitados y dispositivos inteligentes sin romper tu hogar conectado.',
  keywords: [
    'contraseña wifi',
    'cambiar contraseña wifi',
    'contraseña wifi segura',
    'clave wifi',
    'wpa3',
    'red de invitados',
    'router',
  ],
  sections: [
    {
      heading: 'Por qué la contraseña wifi merece su propia estrategia',
      paragraphs: [
        'La contraseña wifi protege más que el acceso a internet. Quien entra en tu red suele ver altavoces inteligentes, impresoras, almacenamiento en red y la página de administración del router. Las claves de fábrica débiles y el firmware sin actualizar facilitan un ataque desde dentro.',
        'Muchos hogares siguen con la contraseña elegida hace años, compartida con visitas y nunca cambiada después de vender un dispositivo o de una mudanza. Es una conducta normal, no un error raro. La solución práctica es tratar la clave wifi como cualquier otra credencial: genérala al azar, guárdala en un gestor de contraseñas y cámbiala cuando cambie el círculo de personas que la conocen.',
        'Esta guía cubre la contraseña, los ajustes del router que determinan cuánto protege y un proceso seguro para cambiarla sin desconectar toda la casa.',
      ],
    },
    {
      heading: 'Qué hace fuerte a una contraseña wifi',
      paragraphs: [
        'La longitud y la aleatoriedad importan más que la complejidad visual. Una contraseña de 16 caracteres aleatorios ofrece un espacio de búsqueda enorme. Una clave corta con mayúscula y exclamación sigue cayendo ante un ataque de diccionario en minutos.',
        'Para una red doméstica, usa al menos 16 caracteres aleatorios o una frase de contraseña de cinco o seis palabras generadas con una lista amplia. Una clave larga también se teclea mejor en el móvil cuando conectas a una visita o a un dispositivo nuevo.',
        'No reutilices la contraseña wifi en el correo, la banca o el gestor de contraseñas. Si se filtra desde una copia de seguridad del router, el móvil de una visita o una nota de papel, el daño debe quedarse en la red.',
      ],
      bullets: [
        'Al menos 16 caracteres aleatorios o 5-6 palabras aleatorias.',
        'Genera la clave con un generador criptográfico, no con un patrón propio.',
        'Mantén la contraseña wifi única; no repitas la de una cuenta.',
        'Guárdala en un gestor y compártela con un código QR cuando puedas.',
      ],
    },
    {
      heading: 'Cómo cambiar la contraseña wifi',
      paragraphs: [
        'Abre la página de administración del router desde un dispositivo conectado a la red. La dirección suele estar en una etiqueta del router: 192.168.1.1, 192.168.0.1 o un nombre de host del fabricante. Entra con la contraseña de administrador, no con la clave wifi. Si el router aún usa la contraseña de fábrica del administrador, cámbiala primero.',
        'Busca la sección inalámbrica y revisa el modo de seguridad. Elige WPA3 si todos tus dispositivos lo admiten, o WPA2/WPA3 mixto cuando haya equipos antiguos. Evita WEP y las redes abiertas. Escribe la nueva clave, aplica los cambios y conecta un móvil o un portátil para comprobar que funciona antes de seguir.',
        'Al cambiar la contraseña se desconectan todos los equipos que usaban la anterior. Recorre la casa y reconecta móviles, portátiles, televisores, consolas, impresoras y dispositivos del hogar. Conserva la clave antigua solo hasta terminar la migración y destruye después cualquier nota que la contenga.',
      ],
      bullets: [
        'Entra al router con su contraseña de administrador.',
        'Activa WPA3 o WPA2/WPA3 mixto para equipos antiguos.',
        'Usa una clave recién generada, no una variación de la anterior.',
        'Reconecta todos los dispositivos y elimina las notas antiguas.',
      ],
    },
    {
      heading: 'Elige una contraseña que puedas teclear en el móvil o el televisor',
      paragraphs: [
        'Una contraseña imposible de teclear invita a atajos: una red de invitados sin clave, una nota pegada en la nevera o una contraseña compartida que nunca cambia. Elige un formato que puedas introducir con comodidad en los dispositivos que usas.',
        'Una clave de 16 caracteres con mayúsculas, minúsculas y números es un buen estándar. Si el mando del televisor o la consola hace que los símbolos duelan, una frase de 5-6 palabras con guiones es más fácil de teclear y conserva buena entropía cuando las palabras son aleatorias. Evita sustituir cada «a» por «@»: añade poca entropía y complica la comunicación.',
        'Muchos gestores de contraseñas muestran la clave wifi como código QR. Es más rápido y menos propenso a errores que dictar una cadena larga, y evita escribir la contraseña en papel.',
      ],
    },
    {
      heading: 'Ajustes del router que importan más que la contraseña',
      paragraphs: [
        'Una clave fuerte no compensa un router que acepta PIN de WPS o expone su página de administración a internet. Después de cambiar la contraseña, revisa los ajustes que controlan cómo se conectan los dispositivos y cómo se administra el router.',
        'Desactiva WPS salvo que lo necesites de verdad. El método PIN arrastra debilidades de fuerza bruta y el botón WPS lo puede pulsar cualquiera con acceso físico. Mantén desactivada la administración remota si no entiendes el riesgo y no tienes una necesidad concreta.',
        'Separa invitados y dispositivos inteligentes poco fiables en una red de invitados. Debe tener su propia clave, aislamiento de clientes cuando el router lo permita y ningún acceso a la red local principal. Actualiza el firmware y sustituye el hardware que ya no recibe parches de seguridad.',
      ],
      bullets: [
        'Desactiva WPS y la administración remota.',
        'Usa una red de invitados para visitas y dispositivos inteligentes baratos.',
        'Cambia la contraseña de administrador del router.',
        'Mantén el firmware al día y sustituye el hardware sin soporte.',
      ],
    },
    {
      heading: 'Red doméstica frente a wifi público',
      paragraphs: [
        'La contraseña de tu wifi doméstico controla quién entra en una red de confianza. El wifi público funciona distinto: el router no es tuyo, otros invitados pueden observar el tráfico y los portales cautivos a veces imitan formularios conocidos. Trata las redes públicas como no confiables aunque pidan una contraseña.',
        'En un wifi público, prioriza sitios con HTTPS, evita cambiar ajustes sensibles de la cuenta y usa una VPN de confianza cuando necesites proteger el tráfico de la red local. Desactiva la conexión automática a redes abiertas para que el móvil no se una en silencio a un punto de acceso parecido.',
        'En casa, la costumbre equivalente es mantener aislada la red de invitados y revisar de vez en cuando la lista de dispositivos conectados. Un equipo que no reconoces es motivo para cambiar la contraseña wifi e investigar, no solo para renombrar la red.',
      ],
    },
    {
      heading: 'Ejemplos de contraseñas wifi buenas y malas',
      paragraphs: [
        'Estos ejemplos son ficticios y no debes usarlos. Muestran la diferencia entre una clave que solo parece compleja y otra realmente impredecible.',
        'Los malos ejemplos siguen una plantilla: una estación, un año, el nombre de una mascota o un patrón de teclado. «Summer2026!» y «FluffyTheCat1» cumplen muchas reglas de complejidad, pero ambos se construyen con palabras y patrones que las herramientas de cracking prueban primero. Un nombre de red como «HomeWiFi-2026» facilita aún más la adivinanza.',
        'Los buenos ejemplos se generan al azar y son lo bastante largos. Una clave como «violet-harbor-cactus-42» es fácil de teclear y de recordar una vez, mientras que una cadena aleatoria de 16 caracteres aporta más entropía. Cualquiera de las dos sirve si es única, se guarda bien y no deriva de información publicada en redes sociales.',
      ],
    },
    {
      heading: 'Preguntas frecuentes sobre la contraseña wifi',
      paragraphs: [
        '¿Cuánto debe medir una contraseña wifi? Al menos 16 caracteres aleatorios o una frase de 5-6 palabras. Más larga es mejor, siempre que la mantengas única y guardada con seguridad.',
        '¿Bastan 12 caracteres? Es mejor que una clave corta, pero 16 caracteres o una frase sólida dan más margen para una red que seguirá en uso durante años.',
        '¿Cada cuánto debo cambiarla? Cuando alguien que la conocía se va de casa o del equipo, cuando pierdes o vendes un dispositivo, tras una sospecha de intrusión o cuando cambias el router. La rotación forzada importa menos que retirar el acceso cuando cambia la confianza.',
        '¿Puedo usar una frase en lugar de una cadena aleatoria? Sí. Una frase aleatoria de cinco o seis palabras es fuerte y más fácil de teclear en un televisor o una consola. No la armes con una cita, una canción o una historia sobre tu vida.',
        '¿Qué hago si olvido la nueva clave? Revisa primero la entrada del gestor de contraseñas. Si no la guardaste, conéctate al router por cable y consulta o restablece los ajustes wifi. Un restablecimiento de fábrica devuelve la clave por defecto, pero borra la configuración, así que déjalo como último recurso.',
        '¿Deben los invitados usar la red principal? Mejor dales una red de invitados con su propia clave y aislamiento de clientes. Así sus dispositivos no ven tus impresoras, tu almacenamiento ni la página de administración del router.',
      ],
    },
    {
      heading: 'Lista de comprobación de seguridad wifi',
      paragraphs: [
        'Recorre esta lista una vez y vuelve a ella cuando cambies de router o añadas una categoría nueva de dispositivos. El objetivo no es una red blindada, sino una red donde los ajustes importantes sean deliberados.',
      ],
      bullets: [
        'Contraseña wifi: 16+ caracteres aleatorios o una frase de 5-6 palabras.',
        'Modo de seguridad: WPA3 o WPA2/WPA3 mixto por compatibilidad.',
        'WPS y administración remota: desactivados salvo necesidad.',
        'Contraseña de administrador del router: cambiada de fábrica.',
        'Red de invitados: clave aparte y aislamiento de clientes activo.',
        'Firmware: actualizado y plan de sustitución del hardware sin soporte.',
        'Lista de dispositivos: revisada de vez en cuando en busca de clientes desconocidos.',
      ],
    },
  ],
};

export const fr: LocalizedArticleContent = {
  title: "Mot de passe Wi-Fi : créer et changer une clé sécurisée",
  excerpt:
    'Guide pratique pour choisir un mot de passe Wi-Fi solide, le changer sur le routeur et isoler les invités et objets connectés sur un réseau séparé.',
  seoTitle: 'Mot de passe Wi-Fi : créer et changer une clé sécurisée',
  seoDescription:
    'Apprenez à créer un mot de passe Wi-Fi sécurisé, à le changer sur le routeur, à désactiver WPS et à isoler les invités sans casser votre maison connectée.',
  keywords: [
    "mot de passe wifi",
    "changer mot de passe wifi",
    "mot de passe wi-fi sécurisé",
    "clé wifi",
    "wpa3",
    "réseau invité",
    "routeur",
  ],
  sections: [
    {
      heading: "Pourquoi le mot de passe Wi-Fi mérite sa propre stratégie",
      paragraphs: [
        "Le mot de passe Wi-Fi protège plus que l'accès à internet. Une personne qui rejoint votre réseau voit souvent les enceintes connectées, l'imprimante, le stockage réseau et la page d'administration du routeur. Les clés d'usine faibles et un micrologiciel non mis à jour facilitent une attaque depuis l'intérieur.",
        "Beaucoup de foyers gardent une clé choisie il y a des années, partagée avec des visiteurs et jamais changée après la vente d'un appareil ou un déménagement. C'est un comportement courant, pas une erreur rare. La solution pratique consiste à traiter la clé Wi-Fi comme n'importe quel identifiant : générez-la au hasard, stockez-la dans un gestionnaire de mots de passe et changez-la quand le cercle des personnes qui la connaissent évolue.",
        "Ce guide couvre la clé elle-même, les réglages du routeur qui déterminent son efficacité et une méthode sûre pour la changer sans déconnecter toute la maison.",
      ],
    },
    {
      heading: "Ce qui rend un mot de passe Wi-Fi solide",
      paragraphs: [
        "La longueur et le hasard comptent plus que la complexité apparente. Seize caractères aléatoires pris dans un grand alphabet créent un espace de recherche immense. Une clé courte avec une majuscule et un point d'exclamation tombe encore en quelques minutes face à une attaque par dictionnaire.",
        "Pour un réseau domestique, visez au moins 16 caractères aléatoires ou une phrase secrète de cinq à six mots tirés d'une grande liste. Une clé longue se saisit aussi plus facilement sur un téléphone quand vous connectez un invité ou un nouvel appareil.",
        "Ne réutilisez pas la clé Wi-Fi pour le courriel, la banque ou le gestionnaire de mots de passe. Si elle fuit depuis une sauvegarde du routeur, le téléphone d'un invité ou une note papier, les dégâts doivent s'arrêter à la frontière du réseau.",
      ],
      bullets: [
        "Au moins 16 caractères aléatoires ou 5 à 6 mots aléatoires.",
        "Générez la clé avec un générateur cryptographique, pas avec un schéma personnel.",
        "Gardez la clé Wi-Fi unique et ne réutilisez jamais un mot de passe de compte.",
        "Stockez-la dans un gestionnaire et partagez-la par QR code quand c'est possible.",
      ],
    },
    {
      heading: "Comment changer le mot de passe Wi-Fi",
      paragraphs: [
        "Ouvrez la page d'administration du routeur depuis un appareil connecté au réseau. L'adresse figure souvent sur une étiquette du routeur : 192.168.1.1, 192.168.0.1 ou un nom d'hôte du fabricant. Connectez-vous avec le mot de passe administrateur, pas avec la clé Wi-Fi. Si le routeur utilise encore le mot de passe administrateur d'usine, changez-le d'abord.",
        "Cherchez la section sans fil et vérifiez le mode de sécurité. Choisissez WPA3 si tous vos appareils le prennent en charge, ou WPA2/WPA3 mixte quand du matériel ancien doit rester compatible. Évitez WEP et les réseaux ouverts. Saisissez la nouvelle clé, appliquez les réglages et reconnectez un téléphone ou un ordinateur portable pour vérifier avant de continuer.",
        "Changer la clé déconnecte tous les appareils qui utilisaient l'ancienne. Faites le tour de la maison et reconnectez téléphones, ordinateurs, téléviseurs, consoles, imprimantes et objets connectés. Gardez l'ancienne clé jusqu'à la fin de la migration, puis détruisez toute note qui la contient.",
      ],
      bullets: [
        "Connectez-vous au routeur avec son mot de passe administrateur.",
        "Activez WPA3, ou WPA2/WPA3 mixte pour les appareils anciens.",
        "Utilisez une clé fraîchement générée, pas une variante de l'ancienne.",
        "Reconnectez tous les appareils et supprimez les anciennes notes.",
      ],
    },
    {
      heading: "Choisissez une clé que vous pouvez saisir sur un téléphone ou une télévision",
      paragraphs: [
        "Une clé impossible à saisir pousse aux raccourcis : réseau invité sans mot de passe, note collée sur le frigo ou clé partagée qui ne change jamais. Choisissez un format que vous pouvez réellement saisir sur les appareils que vous utilisez.",
        "Une clé de 16 caractères avec majuscules, minuscules et chiffres constitue un bon standard. Si la télécommande du téléviseur ou de la console rend les symboles pénibles, une phrase de 5 à 6 mots séparés par des tirets se saisit plus vite et garde une bonne entropie quand les mots sont aléatoires. Évitez de remplacer chaque « a » par « @ » : cela ajoute peu d'entropie et complique la transmission.",
        "Beaucoup de gestionnaires de mots de passe affichent la clé Wi-Fi sous forme de QR code. C'est plus rapide et moins sujet aux erreurs que dicter une longue chaîne, et cela évite d'écrire la clé sur papier.",
      ],
    },
    {
      heading: "Les réglages du routeur qui comptent plus que la clé",
      paragraphs: [
        "Une clé solide ne compense pas un routeur qui accepte les PIN WPS ou expose sa page d'administration sur internet. Après avoir changé la clé, passez en revue les réglages qui contrôlent la connexion des appareils et l'administration du routeur.",
        "Désactivez WPS sauf si vous en avez vraiment besoin. La méthode PIN traîne des faiblesses de force brute, et le bouton WPS peut être pressé par toute personne ayant un accès physique. Laissez l'administration à distance désactivée si vous ne comprenez pas le risque et n'avez pas de besoin précis.",
        "Placez les invités et les objets connectés peu fiables sur un réseau invité séparé. Il doit avoir sa propre clé, une isolation des clients quand le routeur le permet et aucun accès au réseau local principal. Mettez à jour le micrologiciel et remplacez le matériel qui ne reçoit plus de correctifs de sécurité.",
      ],
      bullets: [
        "Désactivez WPS et l'administration à distance.",
        "Utilisez un réseau invité pour les visiteurs et les objets connectés bon marché.",
        "Changez le mot de passe administrateur du routeur.",
        "Gardez le micrologiciel à jour et remplacez le matériel sans support.",
      ],
    },
    {
      heading: "Réseau domestique et Wi-Fi public",
      paragraphs: [
        "La clé de votre Wi-Fi domestique contrôle l'accès à un réseau de confiance. Le Wi-Fi public fonctionne autrement : le routeur ne vous appartient pas, d'autres invités peuvent observer le trafic et les portails captifs imitent parfois des formulaires familiers. Traitez les réseaux publics comme non fiables même s'ils demandent une clé.",
        "Sur un Wi-Fi public, privilégiez les sites en HTTPS, évitez de modifier des réglages sensibles du compte et utilisez un VPN réputé quand vous devez protéger le trafic du réseau local. Désactivez la connexion automatique aux réseaux ouverts pour que le téléphone ne rejoigne pas en silence un point d'accès ressemblant au vôtre.",
        "À la maison, l'habitude équivalente consiste à garder le réseau invité isolé et à consulter de temps en temps la liste des appareils connectés. Un appareil inconnu justifie de changer la clé Wi-Fi et d'enquêter, pas seulement de renommer le réseau.",
      ],
    },
    {
      heading: "Exemples de bons et de mauvais mots de passe Wi-Fi",
      paragraphs: [
        "Ces exemples sont fictifs et ne doivent pas être utilisés. Ils montrent la différence entre une clé qui semble complexe et une clé réellement imprévisible.",
        "Les mauvais exemples suivent un modèle : une saison, une année, le nom d'un animal ou un motif de clavier. « Summer2026! » et « FluffyTheCat1 » respectent beaucoup de règles de complexité, mais reposent sur des mots et des schémas que les outils de cassage essaient en premier. Un nom de réseau comme « HomeWiFi-2026 » rend la devinette encore plus simple.",
        "Les bons exemples sont générés au hasard et suffisamment longs. Une clé comme « violet-harbor-cactus-42 » se saisit et se retient facilement, tandis qu'une chaîne aléatoire de 16 caractères apporte plus d'entropie. Les deux conviennent si la clé est unique, stockée correctement et ne dérive pas d'informations publiées sur les réseaux sociaux.",
      ],
    },
    {
      heading: "Questions fréquentes sur le mot de passe Wi-Fi",
      paragraphs: [
        "Quelle longueur pour une clé Wi-Fi ? Au moins 16 caractères aléatoires ou une phrase de 5 à 6 mots. Plus long est mieux, à condition de garder la clé unique et bien stockée.",
        "Douze caractères suffisent-ils ? C'est mieux qu'une clé courte, mais 16 caractères ou une phrase solide donnent une marge plus confortable pour un réseau utilisé pendant des années.",
        "À quelle fréquence changer la clé ? Quand une personne qui la connaissait quitte le foyer ou l'équipe, quand un appareil est perdu ou vendu, après une suspicion d'intrusion ou quand vous changez de routeur. La rotation forcée compte moins que le retrait de l'accès au bon moment.",
        "Puis-je utiliser une phrase secrète au lieu d'une chaîne aléatoire ? Oui. Une phrase aléatoire de cinq ou six mots est solide et plus facile à saisir sur un téléviseur ou une console. Ne la construisez pas avec une citation, une chanson ou une histoire personnelle.",
        "Que faire si j'oublie la nouvelle clé ? Vérifiez d'abord l'entrée du gestionnaire de mots de passe. Si elle n'a pas été enregistrée, connectez-vous au routeur par câble et consultez ou réinitialisez les réglages Wi-Fi. Une réinitialisation d'usine restaure la clé par défaut mais efface la configuration : gardez-la en dernier recours.",
        "Les invités doivent-ils utiliser le réseau principal ? Préférez un réseau invité avec sa propre clé et une isolation des clients. Les appareils des visiteurs ne voient alors ni vos imprimantes, ni votre stockage, ni la page d'administration du routeur.",
      ],
    },
    {
      heading: "Liste de contrôle de la sécurité Wi-Fi",
      paragraphs: [
        "Parcourez cette liste une fois, puis revenez-y quand vous changez de routeur ou ajoutez une nouvelle catégorie d'appareils. L'objectif n'est pas un réseau parfaitement verrouillé, mais un réseau dont les réglages importants sont choisis consciemment.",
      ],
      bullets: [
        "Clé Wi-Fi : 16+ caractères aléatoires ou une phrase de 5 à 6 mots.",
        "Mode de sécurité : WPA3, ou WPA2/WPA3 mixte pour la compatibilité.",
        "WPS et administration à distance : désactivés sauf besoin réel.",
        "Mot de passe administrateur du routeur : changé par rapport à l'usine.",
        "Réseau invité : clé séparée et isolation des clients active.",
        "Micrologiciel : à jour, avec un plan de remplacement du matériel sans support.",
        "Liste des appareils : vérifiée régulièrement pour repérer les clients inconnus.",
      ],
    },
  ],
};

export const de: LocalizedArticleContent = {
  title: 'WLAN-Passwort: starkes Passwort erstellen und ändern',
  excerpt:
    'Praktischer Ratgeber: ein starkes WLAN-Passwort wählen, im Router ändern und Gäste sowie smarte Geräte in einem getrennten Netz isolieren. Das WLAN-Passwort schützt mehr als den Internetzugang.',
  seoTitle: 'WLAN-Passwort: starkes Passwort erstellen und ändern',
  seoDescription:
    'So erstellen Sie ein starkes WLAN-Passwort, ändern es im Router, deaktivieren WPS und trennen Gäste und smarte Geräte, ohne Ihr Zuhause zu lahmzulegen.',
  keywords: [
    'wlan passwort',
    'wlan passwort ändern',
    'passwort 12 zeichen',
    'passphrase',
    'wpa3',
    'gästenetz',
    'router',
  ],
  sections: [
    {
      heading: 'Warum das WLAN-Passwort eine eigene Strategie braucht',
      paragraphs: [
        'Das WLAN-Passwort schützt mehr als den Internetzugang. Wer in Ihrem Netz landet, sieht oft smarte Lautsprecher, Drucker, Netzwerkspeicher und die Administrationsseite des Routers. Schwache Werkseinstellungen und veraltete Firmware machen einen Angriff von innen leicht.',
        'Viele Haushalte nutzen noch das Passwort von vor Jahren, haben es mit Gästen geteilt und nach einem Geräteverkauf oder Umzug nie geändert. Das ist normales Verhalten, kein seltener Fehler. Die praktische Lösung: Behandeln Sie das WLAN-Passwort wie jeden anderen Zugang. Erzeugen Sie es zufällig, speichern Sie es im Passwort-Manager und ändern Sie es, wenn sich der Kreis der Personen ändert, die es kennen.',
        'Dieser Ratgeber behandelt das Passwort selbst, die Router-Einstellungen, die über seinen Nutzen entscheiden, und einen sicheren Ablauf für die Änderung, ohne das ganze Haus vom Netz zu nehmen.',
      ],
    },
    {
      heading: 'Was ein WLAN-Passwort stark macht',
      paragraphs: [
        'Länge und Zufall zählen mehr als sichtbare Komplexität. Sechzehn zufällige Zeichen aus einem großen Alphabet ergeben einen gewaltigen Suchraum. Ein kurzes Passwort mit Großbuchstaben und Ausrufezeichen fällt einem Wörterbuchangriff weiterhin in Minuten zum Opfer.',
        'Für ein Heimnetz nehmen Sie mindestens 16 zufällige Zeichen oder eine Passphrase aus fünf bis sechs Wörtern, die aus einer großen Liste gezogen wurden. Ein längeres Passwort lässt sich auch auf dem Telefon leichter tippen, wenn Sie einen Gast oder ein neues Gerät verbinden.',
        'Verwenden Sie das WLAN-Passwort nicht für E-Mail, Banking oder den Passwort-Manager. Wenn es aus einem Router-Backup, dem Telefon eines Gastes oder einem Notizzettel leckt, soll der Schaden an der Netzgrenze enden.',
      ],
      bullets: [
        'Mindestens 16 zufällige Zeichen oder 5-6 zufällige Wörter.',
        'Erzeugen Sie das Passwort mit einem kryptografischen Generator, nicht mit einem eigenen Muster.',
        'Halten Sie das WLAN-Passwort einzigartig und wiederholen Sie kein Kontopasswort.',
        'Speichern Sie es im Passwort-Manager und teilen Sie es nach Möglichkeit per QR-Code.',
      ],
    },
    {
      heading: 'So ändern Sie das WLAN-Passwort',
      paragraphs: [
        'Öffnen Sie die Administrationsseite des Routers von einem Gerät im Netz. Die Adresse steht meist auf einem Aufkleber: 192.168.1.1, 192.168.0.1 oder ein Herstellername. Melden Sie sich mit dem Administratorpasswort an, nicht mit dem WLAN-Passwort. Nutzt der Router noch das Werkstatt-Passwort, ändern Sie zuerst dieses.',
        'Suchen Sie den WLAN-Bereich und prüfen Sie den Sicherheitsmodus. Wählen Sie WPA3, wenn alle Geräte es unterstützen, oder WPA2/WPA3 gemischt für ältere Geräte. WEP und offene Netze lassen Sie weg. Tragen Sie das neue Passwort ein, übernehmen Sie die Einstellungen und verbinden Sie ein Telefon oder Notebook zur Kontrolle, bevor Sie weitermachen.',
        'Beim Wechsel trennt der Router alle Geräte mit dem alten Passwort. Gehen Sie durch die Wohnung und verbinden Sie Telefone, Notebooks, Fernseher, Konsolen, Drucker und smarte Geräte neu. Behalten Sie das alte Passwort nur bis zum Ende der Umstellung und vernichten Sie danach alle Notizen damit.',
      ],
      bullets: [
        'Melden Sie sich mit dem Administratorpasswort am Router an.',
        'Aktivieren Sie WPA3 oder WPA2/WPA3 gemischt für ältere Geräte.',
        'Verwenden Sie ein frisch erzeugtes Passwort, keine Abwandlung des alten.',
        'Verbinden Sie alle Geräte neu und entfernen Sie alte Notizen.',
      ],
    },
    {
      heading: 'Wählen Sie ein Passwort, das auf Telefon und Fernseher tippbar ist',
      paragraphs: [
        'Ein Passwort, das sich nicht eintippen lässt, führt zu Abkürzungen: ein Gästenetz ohne Passwort, ein Zettel am Kühlschrank oder ein geteiltes Passwort, das nie geändert wird. Wählen Sie ein Format, das Sie auf Ihren Geräten wirklich eingeben können.',
        'Sechzehn Zeichen mit Groß- und Kleinschreibung sowie Ziffern sind ein guter Standard. Wenn die Fernbedienung des Fernsehers oder der Konsole bei Sonderzeichen streikt, lässt sich eine Passphrase aus 5-6 Wörtern mit Bindestrichen leichter tippen und behält hohe Entropie, solange die Wörter zufällig gewählt sind. Ersetzen Sie nicht jedes „a“ durch „@“: Das bringt wenig Entropie und erschwert die Weitergabe.',
        'Viele Passwort-Manager zeigen das WLAN-Passwort als QR-Code. Das ist schneller und fehlerärmer als eine lange Zeichenkette vorzulesen, und es erspart den Zettel.',
      ],
    },
    {
      heading: 'Router-Einstellungen, die mehr zählen als das Passwort',
      paragraphs: [
        'Ein starkes Passwort gleicht keinen Router aus, der WPS-PINs akzeptiert oder seine Administrationsseite ins Internet stellt. Prüfen Sie nach dem Passwortwechsel die Einstellungen, die bestimmen, wie Geräte beitreten und wie der Router verwaltet wird.',
        'Deaktivieren Sie WPS, wenn Sie es nicht wirklich brauchen. Die PIN-Methode hat seit Jahren Schwächen gegen Brute-Force, und den WPS-Knopf kann jeder mit physischem Zugang drücken. Lassen Sie die Fernadministration aus, wenn Sie das Risiko nicht einschätzen können und keinen konkreten Bedarf haben.',
        'Setzen Sie Gäste und wenig vertrauenswürdige smarte Geräte in ein separates Gästenetz. Es braucht ein eigenes Passwort, wenn möglich Client-Isolation und keinen Zugang zum Hauptnetz. Aktualisieren Sie die Firmware und ersetzen Sie Hardware, die keine Sicherheitsupdates mehr erhält.',
      ],
      bullets: [
        'WPS und Fernadministration deaktivieren.',
        'Gästenetz für Besucher und günstige smarte Geräte nutzen.',
        'Das Administratorpasswort des Routers vom Werkstattwert ändern.',
        'Firmware aktuell halten und ungepflegte Hardware ersetzen.',
      ],
    },
    {
      heading: 'Heimnetz und öffentliches WLAN',
      paragraphs: [
        'Das Passwort Ihres Heim-WLANs kontrolliert den Zugang zu einem Netz, dem Sie vertrauen. Öffentliches WLAN funktioniert anders: Der Router gehört Ihnen nicht, andere Gäste können den Verkehr beobachten, und Captive Portals ahmen manchmal bekannte Anmeldeformulare nach. Behandeln Sie öffentliche Netze als nicht vertrauenswürdig, auch wenn sie ein Passwort verlangen.',
        'Nutzen Sie im öffentlichen WLAN bevorzugt HTTPS-Seiten, ändern Sie keine sensiblen Kontoeinstellungen und verwenden Sie ein seriöses VPN, wenn Sie den Verkehr vor dem lokalen Netz schützen müssen. Schalten Sie die automatische Verbindung zu offenen Netzen aus, damit das Telefon nicht still einem ähnlich benannten Zugangspunkt folgt.',
        'Zu Hause gehört dazu, das Gästenetz isoliert zu halten und ab und zu die Liste verbundener Geräte zu prüfen. Ein unbekanntes Gerät ist ein Grund, das WLAN-Passwort zu ändern und nachzuforschen, nicht nur das Netz umzubenennen.',
      ],
    },
    {
      heading: 'Beispiele für gute und schlechte WLAN-Passwörter',
      paragraphs: [
        'Diese Beispiele sind erfunden und nicht zur Nutzung gedacht. Sie zeigen den Unterschied zwischen einem Passwort, das nur komplex aussieht, und einem wirklich unvorhersehbaren.',
        'Schlechte Beispiele folgen einer Vorlage: Jahreszeit, Jahr, Tiername oder Tastaturmuster. „Summer2026!“ und „FluffyTheCat1“ erfüllen viele Komplexitätsregeln, bestehen aber aus Wörtern und Mustern, die Crack-Werkzeuge zuerst testen. Ein Netzname wie „HomeWiFi-2026“ macht das Raten noch leichter.',
        'Gute Beispiele entstehen zufällig und sind lang genug. Ein Passwort wie „violet-harbor-cactus-42“ lässt sich leicht tippen und einmal merken, während eine zufällige Zeichenkette mit 16 Zeichen mehr Entropie liefert. Beide taugen, wenn sie einzigartig sind, sicher gespeichert werden und nicht aus öffentlichen Profildaten stammen.',
      ],
    },
    {
      heading: 'Häufige Fragen zum WLAN-Passwort',
      paragraphs: [
        'Wie lang sollte ein WLAN-Passwort sein? Mindestens 16 zufällige Zeichen oder eine Passphrase aus 5-6 Wörtern. Länger ist besser, solange Sie es einzigartig und sicher speichern.',
        'Reichen 12 Zeichen? Das ist besser als ein kurzes Passwort, aber 16 Zeichen oder eine starke Passphrase geben mehr Spielraum für ein Netz, das jahrelang in Betrieb bleibt.',
        'Wie oft sollte ich es ändern? Wenn jemand, der es kannte, aus dem Haushalt oder Team ausscheidet, wenn ein Gerät verloren geht oder verkauft wird, nach einem Verdacht auf einen Einbruch oder beim Routerwechsel. Regelmäßige Zwangsrotation ist weniger wichtig als der rechtzeitige Entzug des Zugangs.',
        'Kann ich eine Passphrase statt einer zufälligen Zeichenkette nutzen? Ja. Eine zufällige Passphrase aus fünf oder sechs Wörtern ist stark und auf Fernseher oder Konsole leichter einzugeben. Bauen Sie sie nicht aus einem Zitat, Liedtext oder einer persönlichen Geschichte.',
        'Was tun, wenn ich das neue Passwort vergesse? Prüfen Sie zuerst den Passwort-Manager. Wenn es nicht gespeichert wurde, verbinden Sie den Router per Kabel und lesen oder setzen Sie die WLAN-Einstellungen zurück. Ein Werksreset stellt das Standardpasswort wieder her, löscht aber die Konfiguration. Nutzen Sie ihn als letztes Mittel.',
        'Sollen Gäste das Hauptnetz nutzen? Besser ist ein Gästenetz mit eigenem Passwort und Client-Isolation. So sehen Gästegeräte weder Ihre Drucker noch den Netzwerkspeicher oder die Router-Verwaltung.',
      ],
    },
    {
      heading: 'Checkliste für WLAN-Sicherheit',
      paragraphs: [
        'Gehen Sie die Liste einmal durch und kehren Sie dazu zurück, wenn Sie den Router wechseln oder eine neue Gerätegattung anschaffen. Das Ziel ist kein perfekt abgeriegeltes Netz, sondern ein Netz, dessen wichtige Voreinstellungen bewusst gewählt sind.',
      ],
      bullets: [
        'WLAN-Passwort: 16+ zufällige Zeichen oder eine Passphrase aus 5-6 Wörtern.',
        'Sicherheitsmodus: WPA3 oder WPA2/WPA3 gemischt für Kompatibilität.',
        'WPS und Fernadministration: aus, sofern nicht benötigt.',
        'Administratorpasswort des Routers: vom Werkstattwert geändert.',
        'Gästenetz: eigenes Passwort und Client-Isolation aktiv.',
        'Firmware: aktuell, mit Plan für den Austausch ungepflegter Hardware.',
        'Geräteliste: regelmäßig auf unbekannte Clients prüfen.',
      ],
    },
  ],
};

export const it: LocalizedArticleContent = {
  title: "Password Wi-Fi: come creare e cambiare una chiave sicura",
  excerpt:
    'Guida pratica per scegliere una password Wi-Fi solida, cambiarla sul router e isolare ospiti e dispositivi smart su una rete separata. La password Wi-Fi protegge più dell\'accesso a internet.',
  seoTitle: 'Password Wi-Fi: come creare e cambiare una chiave sicura',
  seoDescription:
    'Scopri come creare una password Wi-Fi sicura, cambiarla sul router, disattivare WPS e isolare ospiti e dispositivi smart senza fermare la casa connessa.',
  keywords: [
    "password wifi",
    "cambiare password wifi",
    "password wi-fi sicura",
    "chiave wifi",
    "wpa3",
    "rete ospiti",
    "router",
  ],
  sections: [
    {
      heading: "Perché la password Wi-Fi merita una strategia a parte",
      paragraphs: [
        "La password Wi-Fi protegge più dell'accesso a internet. Chi entra nella tua rete vede spesso casse intelligenti, stampanti, archiviazione di rete e la pagina di amministrazione del router. Le chiavi di fabbrica deboli e il firmware non aggiornato rendono facile un attacco dall'interno.",
        "Molte case usano ancora la password scelta anni fa, condivisa con gli ospiti e mai cambiata dopo la vendita di un dispositivo o un trasloco. È un comportamento normale, non un errore raro. La soluzione pratica è trattare la chiave Wi-Fi come qualsiasi altra credenziale: generarla a caso, salvarla in un gestore di password e cambiarla quando cambia il cerchio di persone che la conoscono.",
        "Questa guida copre la password, le impostazioni del router che ne determinano l'efficacia e una procedura sicura per cambiarla senza scollegare tutta la casa.",
      ],
    },
    {
      heading: "Cosa rende forte una password Wi-Fi",
      paragraphs: [
        "La lunghezza e la casualità contano più della complessità apparente. Sedici caratteri casuali presi da un alfabeto ampio creano uno spazio di ricerca enorme. Una chiave corta con una maiuscola e un punto esclamativo cade ancora in pochi minuti davanti a un attacco a dizionario.",
        "Per una rete domestica punta ad almeno 16 caratteri casuali o a una passphrase di cinque o sei parole scelte da una lista ampia. Una chiave lunga è anche più facile da digitare sul telefono quando colleghi un ospite o un dispositivo nuovo.",
        "Non riutilizzare la password Wi-Fi per email, banca o gestore di password. Se esce da un backup del router, dal telefono di un ospite o da un foglietto, il danno deve fermarsi al confine della rete.",
      ],
      bullets: [
        "Almeno 16 caratteri casuali o 5-6 parole casuali.",
        "Genera la chiave con un generatore crittografico, non con uno schema personale.",
        "Tieni la password Wi-Fi unica e non ripetere quella di un account.",
        "Salvala in un gestore e condividila con un codice QR quando puoi.",
      ],
    },
    {
      heading: "Come cambiare la password Wi-Fi",
      paragraphs: [
        "Apri la pagina di amministrazione del router da un dispositivo collegato alla rete. L'indirizzo è di solito su un'etichetta: 192.168.1.1, 192.168.0.1 o un nome host del produttore. Accedi con la password di amministrazione, non con la chiave Wi-Fi. Se il router usa ancora la password di fabbrica, cambiala per prima.",
        "Cerca la sezione wireless e controlla la modalità di sicurezza. Scegli WPA3 se tutti i dispositivi la supportano, oppure WPA2/WPA3 misto quando servono apparecchi più vecchi. Evita WEP e le reti aperte. Inserisci la nuova chiave, applica le impostazioni e collega un telefono o un portatile per verificare prima di proseguire.",
        "Cambiando la password si scollegano tutti i dispositivi che usavano la precedente. Fai il giro della casa e ricollega telefoni, portatili, televisori, console, stampanti e dispositivi smart. Tieni la vecchia chiave solo fino alla fine della migrazione, poi distruggi ogni nota che la contiene.",
      ],
      bullets: [
        "Accedi al router con la password di amministrazione.",
        "Attiva WPA3 o WPA2/WPA3 misto per i dispositivi più vecchi.",
        "Usa una chiave appena generata, non una variante della precedente.",
        "Ricollega tutti i dispositivi ed elimina le vecchie note.",
      ],
    },
    {
      heading: "Scegli una password che puoi digitare su telefono o televisore",
      paragraphs: [
        "Una password impossibile da digitare spinge verso scorciatoie: rete ospiti senza chiave, un foglietto sul frigorifero o una password condivisa che non cambia mai. Scegli un formato che puoi davvero inserire sui dispositivi che usi.",
        "Una chiave di 16 caratteri con maiuscole, minuscole e numeri è un buon standard. Se il telecomando del televisore o della console rende i simboli faticosi, una passphrase di 5-6 parole separate da trattini è più facile da digitare e conserva buona entropia quando le parole sono casuali. Evita di sostituire ogni «a» con «@»: aggiunge poca entropia e complica la condivisione.",
        "Molti gestori di password mostrano la chiave Wi-Fi come codice QR. È più veloce e meno soggetto a errori che dettare una stringa lunga, ed evita di scrivere la password su carta.",
      ],
    },
    {
      heading: "Impostazioni del router che contano più della password",
      paragraphs: [
        "Una chiave forte non compensa un router che accetta PIN WPS o espone la pagina di amministrazione su internet. Dopo aver cambiato la password, controlla le impostazioni che regolano l'accesso dei dispositivi e la gestione del router.",
        "Disattiva WPS se non ti serve davvero. Il metodo PIN ha debolezze note contro la forza bruta e il pulsante WPS può premerlo chiunque abbia accesso fisico. Lascia disattivata l'amministrazione remota se non capisci il rischio e non hai un'esigenza precisa.",
        "Metti ospiti e dispositivi smart poco affidabili su una rete ospiti separata. Deve avere una chiave propria, l'isolamento dei client quando il router lo consente e nessun accesso alla rete locale principale. Aggiorna il firmware e sostituisci l'hardware che non riceve più correzioni di sicurezza.",
      ],
      bullets: [
        "Disattiva WPS e l'amministrazione remota.",
        "Usa una rete ospiti per visitatori e dispositivi smart economici.",
        "Cambia la password di amministrazione del router.",
        "Mantieni aggiornato il firmware e sostituisci l'hardware senza supporto.",
      ],
    },
    {
      heading: "Rete domestica e Wi-Fi pubblico",
      paragraphs: [
        "La password del Wi-Fi domestico controlla chi entra in una rete di fiducia. Il Wi-Fi pubblico funziona diversamente: il router non è tuo, altri ospiti possono osservare il traffico e i portali captive a volte imitano moduli familiari. Tratta le reti pubbliche come non affidabili anche quando chiedono una password.",
        "Sul Wi-Fi pubblico preferisci i siti HTTPS, evita di modificare impostazioni sensibili dell'account e usa una VPN affidabile quando devi proteggere il traffico dalla rete locale. Disattiva la connessione automatica alle reti aperte, così il telefono non si collega in silenzio a un punto di accesso simile.",
        "A casa, l'abitudine equivalente è tenere isolata la rete ospiti e controllare ogni tanto l'elenco dei dispositivi collegati. Un dispositivo sconosciuto è un motivo per cambiare la password Wi-Fi e indagare, non solo per rinominare la rete.",
      ],
    },
    {
      heading: "Esempi di password Wi-Fi buone e cattive",
      paragraphs: [
        "Questi esempi sono inventati e non vanno usati. Mostrano la differenza tra una chiave che sembra solo complessa e una davvero imprevedibile.",
        "I cattivi esempi seguono uno schema: una stagione, un anno, il nome di un animale o un motivo da tastiera. «Summer2026!» e «FluffyTheCat1» rispettano molte regole di complessità, ma sono costruiti con parole e schemi che gli strumenti di cracking provano per primi. Un nome di rete come «HomeWiFi-2026» rende l'indovinello ancora più semplice.",
        "I buoni esempi sono generati a caso e abbastanza lunghi. Una chiave come «violet-harbor-cactus-42» è facile da digitare e da ricordare una volta, mentre una stringa casuale di 16 caratteri offre più entropia. Vanno bene entrambe se sono uniche, salvate in modo sicuro e non derivano da informazioni pubblicate sui social.",
      ],
    },
    {
      heading: "Domande frequenti sulla password Wi-Fi",
      paragraphs: [
        "Quanto deve essere lunga una password Wi-Fi? Almeno 16 caratteri casuali o una passphrase di 5-6 parole. Più lunga è meglio, purché resti unica e ben salvata.",
        "Bastano 12 caratteri? È meglio di una chiave corta, ma 16 caratteri o una passphrase solida danno più margine a una rete che resterà in uso per anni.",
        "Ogni quanto cambiarla? Quando una persona che la conosceva lascia la casa o il team, quando un dispositivo viene perso o venduto, dopo un sospetto accesso o quando cambi router. La rotazione forzata conta meno del togliere l'accesso quando cambia la fiducia.",
        "Posso usare una passphrase invece di una stringa casuale? Sì. Una passphrase casuale di cinque o sei parole è forte e più facile da digitare su televisore o console. Non costruirla con una citazione, una canzone o una storia personale.",
        "Cosa faccio se dimentico la nuova chiave? Controlla prima la voce nel gestore di password. Se non l'hai salvata, collegati al router via cavo e leggi o reimposta le impostazioni Wi-Fi. Un ripristino di fabbrica riporta la chiave predefinita ma cancella la configurazione: usalo come ultima risorsa.",
        "Gli ospiti devono usare la rete principale? Meglio una rete ospiti con chiave propria e isolamento dei client. Così i loro dispositivi non vedono stampanti, archiviazione o pagina di amministrazione del router.",
      ],
    },
    {
      heading: "Checklist di sicurezza Wi-Fi",
      paragraphs: [
        "Percorri questa lista una volta e torna quando cambi router o aggiungi una nuova categoria di dispositivi. L'obiettivo non è una rete blindata, ma una rete in cui le impostazioni importanti siano scelte con consapevolezza.",
      ],
      bullets: [
        "Password Wi-Fi: 16+ caratteri casuali o una passphrase di 5-6 parole.",
        "Modalità di sicurezza: WPA3 o WPA2/WPA3 misto per compatibilità.",
        "WPS e amministrazione remota: disattivati salvo necessità.",
        "Password di amministrazione del router: cambiata rispetto alla fabbrica.",
        "Rete ospiti: chiave separata e isolamento dei client attivo.",
        "Firmware: aggiornato, con un piano per sostituire l'hardware senza supporto.",
        "Elenco dispositivi: controllato ogni tanto per client sconosciuti.",
      ],
    },
  ],
};

export const pt: LocalizedArticleContent = {
  title: 'Senha Wi-Fi: como criar e trocar uma senha segura',
  excerpt:
    'Guia prático para escolher uma senha Wi-Fi forte, trocá-la no roteador e manter visitantes e dispositivos inteligentes em uma rede separada.',
  seoTitle: 'Senha Wi-Fi: como criar e trocar uma senha segura — senha wifi',
  seoDescription:
    'Aprenda a criar uma senha Wi-Fi segura, trocá-la no roteador, desativar o WPS e isolar visitantes e dispositivos inteligentes sem parar a casa conectada.',
  keywords: [
    'senha wifi',
    'trocar senha wifi',
    'senha wi-fi segura',
    'senha do roteador',
    'wpa3',
    'rede de convidados',
    'roteador',
  ],
  sections: [
    {
      heading: 'Por que a senha Wi-Fi merece uma estratégia própria',
      paragraphs: [
        'A senha Wi-Fi protege mais do que o acesso à internet. Quem entra na sua rede costuma ver caixas de som inteligentes, impressoras, armazenamento em rede e a página de administração do roteador. Senhas de fábrica fracas e firmware desatualizado facilitam um ataque por dentro.',
        'Muitas casas continuam com a senha escolhida anos atrás, compartilhada com visitas e nunca trocada depois da venda de um aparelho ou de uma mudança. É um comportamento comum, não um erro raro. A solução prática é tratar a senha Wi-Fi como qualquer outra credencial: gere aleatoriamente, guarde no gerenciador de senhas e troque quando mudar o círculo de pessoas que a conhecem.',
        'Este guia cobre a senha, os ajustes do roteador que definem o quanto ela protege e um processo seguro para trocá-la sem derrubar a casa inteira.',
      ],
    },
    {
      heading: 'O que torna uma senha Wi-Fi forte',
      paragraphs: [
        'Comprimento e aleatoriedade importam mais do que a complexidade visual. Dezesseis caracteres aleatórios de um alfabeto grande criam um espaço de busca enorme. Uma senha curta com maiúscula e exclamação ainda cai em um ataque de dicionário em minutos.',
        'Para uma rede doméstica, use pelo menos 16 caracteres aleatórios ou uma frase-senha de cinco ou seis palavras escolhidas de uma lista ampla. Uma senha longa também é mais fácil de digitar no celular quando você conecta uma visita ou um aparelho novo.',
        'Não reutilize a senha Wi-Fi no e-mail, no banco ou no gerenciador de senhas. Se ela vazar de um backup do roteador, do celular de uma visita ou de um papel, o dano deve parar na fronteira da rede.',
      ],
      bullets: [
        'Pelo menos 16 caracteres aleatórios ou 5-6 palavras aleatórias.',
        'Gere a senha com um gerador criptográfico, não com um padrão pessoal.',
        'Mantenha a senha Wi-Fi única e não repita a de uma conta.',
        'Guarde no gerenciador e compartilhe por QR code quando possível.',
      ],
    },
    {
      heading: 'Como trocar a senha Wi-Fi',
      paragraphs: [
        'Abra a página de administração do roteador em um aparelho conectado à rede. O endereço costuma estar numa etiqueta: 192.168.1.1, 192.168.0.1 ou um nome de host do fabricante. Entre com a senha de administrador, não com a senha Wi-Fi. Se o roteador ainda usa a senha de fábrica, troque essa primeiro.',
        'Procure a seção sem fio e confira o modo de segurança. Escolha WPA3 se todos os aparelhos aceitarem, ou WPA2/WPA3 misto quando houver equipamentos antigos. Evite WEP e redes abertas. Digite a nova senha, aplique as configurações e conecte um celular ou notebook para testar antes de continuar.',
        'Trocar a senha desconecta todos os aparelhos que usavam a anterior. Ande pela casa e reconecte celulares, notebooks, televisores, consoles, impressoras e dispositivos inteligentes. Mantenha a senha antiga só até o fim da migração e destrua depois qualquer anotação com ela.',
      ],
      bullets: [
        'Entre no roteador com a senha de administrador.',
        'Ative WPA3 ou WPA2/WPA3 misto para aparelhos antigos.',
        'Use uma senha recém-gerada, não uma variação da anterior.',
        'Reconecte todos os aparelhos e apague as anotações antigas.',
      ],
    },
    {
      heading: 'Escolha uma senha que dê para digitar no celular ou na TV',
      paragraphs: [
        'Uma senha impossível de digitar empurra para atalhos: rede de convidados sem senha, bilhete na geladeira ou senha compartilhada que nunca muda. Escolha um formato que você consiga mesmo inserir nos aparelhos que usa.',
        'Uma senha de 16 caracteres com maiúsculas, minúsculas e números é um bom padrão. Se o controle da TV ou do console torna os símbolos penosos, uma frase de 5-6 palavras separadas por hífens é mais fácil de digitar e mantém boa entropia quando as palavras são aleatórias. Evite trocar cada “a” por “@”: acrescenta pouca entropia e complica a transmissão.',
        'Muitos gerenciadores de senhas mostram a senha Wi-Fi como QR code. É mais rápido e menos sujeito a erro do que ditar uma sequência longa, e evita escrever a senha no papel.',
      ],
    },
    {
      heading: 'Ajustes do roteador que importam mais que a senha',
      paragraphs: [
        'Uma senha forte não compensa um roteador que aceita PIN do WPS ou expõe a página de administração na internet. Depois de trocar a senha, revise os ajustes que controlam como os aparelhos entram e como o roteador é gerenciado.',
        'Desative o WPS se você não precisa dele de verdade. O método PIN carrega fraquezas de força bruta e o botão WPS pode ser apertado por qualquer pessoa com acesso físico. Deixe a administração remota desligada se você não entende o risco e não tem uma necessidade concreta.',
        'Coloque visitantes e dispositivos inteligentes pouco confiáveis em uma rede de convidados separada. Ela precisa de senha própria, isolamento de clientes quando o roteador permite e nenhum acesso à rede local principal. Atualize o firmware e substitua o hardware que não recebe mais correções de segurança.',
      ],
      bullets: [
        'Desative o WPS e a administração remota.',
        'Use a rede de convidados para visitas e dispositivos inteligentes baratos.',
        'Troque a senha de administrador do roteador.',
        'Mantenha o firmware atualizado e substitua o hardware sem suporte.',
      ],
    },
    {
      heading: 'Rede doméstica e Wi-Fi público',
      paragraphs: [
        'A senha do Wi-Fi de casa controla quem entra em uma rede de confiança. O Wi-Fi público funciona de outro jeito: o roteador não é seu, outros convidados podem observar o tráfego e os portais de acesso às vezes imitam formulários conhecidos. Trate redes públicas como não confiáveis mesmo quando pedem senha.',
        'No Wi-Fi público, prefira sites com HTTPS, evite mudar ajustes sensíveis da conta e use uma VPN confiável quando precisar proteger o tráfego da rede local. Desligue a conexão automática a redes abertas para o celular não entrar em silêncio em um ponto de acesso parecido.',
        'Em casa, o hábito equivalente é manter a rede de convidados isolada e revisar de vez em quando a lista de aparelhos conectados. Um aparelho desconhecido é motivo para trocar a senha Wi-Fi e investigar, não apenas para renomear a rede.',
      ],
    },
    {
      heading: 'Exemplos de senhas Wi-Fi boas e ruins',
      paragraphs: [
        'Estes exemplos são fictícios e não devem ser usados. Eles mostram a diferença entre uma senha que apenas parece complexa e outra realmente imprevisível.',
        'Os exemplos ruins seguem um modelo: uma estação, um ano, o nome de um animal ou um padrão de teclado. “Summer2026!” e “FluffyTheCat1” cumprem muitas regras de complexidade, mas são montados com palavras e padrões que as ferramentas de quebra testam primeiro. Um nome de rede como “HomeWiFi-2026” facilita ainda mais o palpite.',
        'Os exemplos bons são gerados aleatoriamente e têm comprimento suficiente. Uma senha como “violet-harbor-cactus-42” é fácil de digitar e de memorizar uma vez, enquanto uma sequência aleatória de 16 caracteres entrega mais entropia. As duas servem se forem únicas, guardadas com segurança e não vierem de informações publicadas em redes sociais.',
      ],
    },
    {
      heading: 'Perguntas frequentes sobre a senha Wi-Fi',
      paragraphs: [
        'Qual deve ser o comprimento da senha Wi-Fi? Pelo menos 16 caracteres aleatórios ou uma frase de 5-6 palavras. Mais longa é melhor, desde que você a mantenha única e bem guardada.',
        'Doze caracteres bastam? É melhor que uma senha curta, mas 16 caracteres ou uma frase forte dão mais margem para uma rede que vai ficar em uso por anos.',
        'Com que frequência devo trocar? Quando alguém que sabia a senha sai de casa ou da equipe, quando um aparelho é perdido ou vendido, após suspeita de invasão ou quando você troca o roteador. A rotação forçada importa menos do que retirar o acesso quando a confiança muda.',
        'Posso usar uma frase em vez de uma sequência aleatória? Sim. Uma frase aleatória de cinco ou seis palavras é forte e mais fácil de digitar em uma TV ou console. Não a monte com uma citação, uma música ou uma história pessoal.',
        'O que faço se esquecer a nova senha? Confira primeiro a entrada no gerenciador de senhas. Se não salvou, conecte o roteador por cabo e leia ou redefina as configurações de Wi-Fi. Um reset de fábrica devolve a senha padrão, mas apaga a configuração, então deixe para o último caso.',
        'Os convidados devem usar a rede principal? Prefira uma rede de convidados com senha própria e isolamento de clientes. Assim os aparelhos deles não veem suas impressoras, o armazenamento nem a página de administração do roteador.',
      ],
    },
    {
      heading: 'Checklist de segurança do Wi-Fi',
      paragraphs: [
        'Passe por esta lista uma vez e volte a ela quando trocar o roteador ou adicionar uma nova categoria de aparelho. O objetivo não é uma rede blindada, mas uma rede em que os ajustes importantes sejam escolhidos com consciência.',
      ],
      bullets: [
        'Senha Wi-Fi: 16+ caracteres aleatórios ou uma frase de 5-6 palavras.',
        'Modo de segurança: WPA3 ou WPA2/WPA3 misto por compatibilidade.',
        'WPS e administração remota: desativados salvo necessidade.',
        'Senha de administrador do roteador: trocada em relação à de fábrica.',
        'Rede de convidados: senha separada e isolamento de clientes ativo.',
        'Firmware: atualizado, com plano para substituir hardware sem suporte.',
        'Lista de aparelhos: revisada de vez em quando em busca de clientes desconhecidos.',
      ],
    },
  ],
};

export const ru: LocalizedArticleContent = {
  title: 'Пароль Wi-Fi: как создать и сменить надёжный пароль',
  excerpt:
    'Практическое руководство: как выбрать надёжный пароль Wi-Fi, сменить его на роутере и изолировать гостей и умные устройства в отдельной сети.',
  seoTitle: 'Пароль Wi-Fi: как создать и сменить надёжный пароль',
  seoDescription:
    'Практическое руководство: как выбрать надёжный пароль Wi-Fi, сменить его на роутере и изолировать гостей и умные устройства в отдельной сети.',
  keywords: [
    'пароль wifi',
    'пароль вай фай',
    'сменить пароль wifi',
    'надёжный пароль wi-fi',
    'wpa3',
    'гостевая сеть',
    'роутер',
  ],
  sections: [
    {
      heading: 'Почему паролю Wi-Fi нужна отдельная стратегия',
      paragraphs: [
        'Пароль Wi-Fi защищает не только интернет. Тот, кто подключился к вашей сети, часто видит умные колонки, принтеры, сетевое хранилище и страницу администрирования роутера. Слабые заводские пароли устройств и устаревшая прошивка упрощают атаку изнутри.',
        'Многие домашние сети живут с паролем, который выбрали годы назад, рассказали гостям и не сменили после продажи устройства или переезда соседа. Это обычное поведение, а не редкая ошибка. Практическое решение простое: относитесь к паролю Wi-Fi как к любому другому учётному данному. Генерируйте его случайно, храните в менеджере паролей и меняйте, когда меняется круг людей, которые его знают.',
        'Дальше речь пойдёт о самом пароле, настройках роутера, от которых зависит его польза, и безопасном порядке смены без отключения всех устройств в доме.',
      ],
    },
    {
      heading: 'Что делает пароль Wi-Fi надёжным',
      paragraphs: [
        'Длина и случайность важнее внешней сложности. Шестнадцать случайных символов из большого алфавита дают огромное пространство поиска. Короткий пароль с заглавной буквой и восклицательным знаком всё равно падает от словарной атаки за минуты.',
        'Для домашней сети берите минимум 16 случайных символов или парольную фразу из пяти-шести слов, выбранных из большого списка. Длинный пароль ещё и удобнее вводить на телефоне, когда нужно подключить гостя или новое устройство.',
        'Не используйте пароль Wi-Fi для почты, банка или менеджера паролей. Если он утечёт из резервной копии роутера, телефона гостя или бумажной записки, ущерб должен ограничиться сетью.',
      ],
      bullets: [
        'Минимум 16 случайных символов или 5-6 случайных слов.',
        'Генерируйте пароль криптографически стойким генератором, а не своим шаблоном.',
        'Держите пароль Wi-Fi уникальным и не повторяйте пароль аккаунта.',
        'Храните его в менеджере паролей и делитесь QR-кодом, когда это возможно.',
      ],
    },
    {
      heading: 'Как сменить пароль Wi-Fi',
      paragraphs: [
        'Откройте страницу администрирования роутера с устройства, подключённого к сети. Адрес обычно напечатан на наклейке корпуса: 192.168.1.1, 192.168.0.1 или собственное имя хоста производителя. Входите с паролем администратора, а не с паролем Wi-Fi. Если роутер всё ещё использует заводской пароль администратора, сначала смените его.',
        'Найдите раздел беспроводной сети и посмотрите на режим безопасности. Выберите WPA3, если все устройства его поддерживают, или смешанный WPA2/WPA3 для совместимости со старыми устройствами. WEP и открытые сети не используйте вообще. Введите новый пароль, примените настройки и подключите телефон или ноутбук, чтобы проверить результат до дальнейших изменений.',
        'После смены пароля отключаются все устройства со старым ключом. Пройдите по дому и подключите телефоны, ноутбуки, телевизоры, консоли, принтеры и умные устройства. Старый пароль держите только до конца миграции, а затем уничтожьте записки с ним.',
      ],
      bullets: [
        'Войдите в роутер с паролем администратора.',
        'Включите WPA3 или смешанный WPA2/WPA3 для старых устройств.',
        'Используйте свежий сгенерированный пароль, а не вариацию старого.',
        'Подключите все устройства и уберите записки со старым паролем.',
      ],
    },
    {
      heading: 'Выберите пароль, который удобно вводить на телефоне и телевизоре',
      paragraphs: [
        'Пароль, который невозможно ввести, толкает к обходным путям: гостевая сеть без пароля, записка на холодильнике или общий пароль, который никогда не меняют. Выбирайте формат, который вы действительно сможете ввести на своих устройствах.',
        'Шестнадцать символов с заглавными и строчными буквами и цифрами — хороший стандарт. Если на пульте телевизора или консоли символы вводить неудобно, парольная фраза из 5-6 слов через дефис легче для ввода, а случайные слова сохраняют высокую энтропию. Не заменяйте каждую «а» на «@»: это добавляет мало энтропии и усложняет передачу пароля.',
        'Многие менеджеры паролей показывают пароль Wi-Fi как QR-код. Это быстрее и меньше подвержено ошибкам, чем диктовать длинную строку вслух, и не заставляет записывать пароль на бумаге.',
      ],
    },
    {
      heading: 'Настройки роутера, которые важнее самого пароля',
      paragraphs: [
        'Надёжный пароль не компенсирует роутер, который принимает WPS PIN или открывает страницу администрирования в интернет. После смены пароля проверьте настройки, которые определяют, как устройства подключаются и как управляется роутер.',
        'Отключите WPS, если он вам действительно не нужен. PIN-метод давно имеет проблемы с перебором, а кнопку WPS может нажать любой человек с физическим доступом. Удалённое администрирование держите выключенным, если не понимаете риск и не имеете конкретной потребности.',
        'Выведите гостей и недоверенные умные устройства в отдельную гостевую сеть. У неё должен быть собственный пароль, изоляция клиентов, если роутер её поддерживает, и отсутствие доступа к основной локальной сети. Обновляйте прошивку роутера и заменяйте оборудование, которое больше не получает исправлений безопасности.',
      ],
      bullets: [
        'Отключите WPS и удалённое администрирование.',
        'Используйте гостевую сеть для визитов и дешёвых умных устройств.',
        'Смените заводской пароль администратора роутера.',
        'Обновляйте прошивку и заменяйте неподдерживаемое оборудование.',
      ],
    },
    {
      heading: 'Домашняя сеть и публичный Wi-Fi',
      paragraphs: [
        'Пароль домашнего Wi-Fi определяет, кто может присоединиться к сети, которой вы доверяете. Публичный Wi-Fi работает иначе: роутер вам не принадлежит, другие гости могут наблюдать за трафиком, а страницы входа в гостевую сеть иногда имитируют знакомые формы. Относитесь к публичным сетям как к недоверенным, даже если для входа нужен пароль.',
        'В публичном Wi-Fi отдавайте предпочтение сайтам с HTTPS, не меняйте важные настройки аккаунтов в недоверенной сети и используйте надёжный VPN, когда нужно защитить трафик от локальной сети. Отключите автоматическое подключение к открытым сетям, чтобы телефон не присоединялся молча к похожей точке доступа.',
        'Дома аналогичная привычка — держать гостевую сеть изолированной и время от времени просматривать список подключённых устройств. Незнакомое устройство является поводом сменить пароль Wi-Fi и разобраться, а не просто переименовать сеть.',
      ],
    },
    {
      heading: 'Примеры хороших и плохих паролей Wi-Fi',
      paragraphs: [
        'Эти примеры вымышлены, не используйте их. Они показывают разницу между паролем, который только выглядит сложным, и действительно непредсказуемым.',
        'Плохие примеры строятся по шаблону: время года, год, имя питомца или узор на клавиатуре. «Summer2026!» и «FluffyTheCat1» проходят многие требования к сложности, но оба состоят из слов и шаблонов, которые инструменты взлома пробуют первыми. Название сети вроде «HomeWiFi-2026» ещё больше упрощает угадывание.',
        'Хорошие примеры генерируют случайно и делают достаточно длинными. Пароль «violet-harbor-cactus-42» легко ввести и запомнить один раз, а случайная строка из 16 символов даёт больше энтропии. Оба варианта подходят, если пароль уникален, сохранён безопасно и не связан с информацией из соцсетей.',
      ],
    },
    {
      heading: 'Частые вопросы о пароле Wi-Fi',
      paragraphs: [
        'Какой длины должен быть пароль Wi-Fi? Минимум 16 случайных символов или парольная фраза из 5-6 слов. Длиннее лучше, если вы действительно сохраните его уникальным и безопасным.',
        'Достаточно ли 12 символов? Это лучше короткого пароля, но 16 символов или надёжная парольная фраза дают больший запас для сети, которая будет работать годами.',
        'Как часто менять пароль? Когда человек, который его знал, уходит из дома или команды; когда устройство потеряли или продали; после подозрения на взлом; когда вы меняете роутер. Регулярная принудительная ротация менее важна, чем своевременное лишение доступа.',
        'Можно ли вместо случайной строки использовать парольную фразу? Да. Случайная фраза из пяти-шести слов надёжна и удобнее для телевизора или консоли. Не собирайте её из цитаты, песни или истории о своей жизни.',
        'Что делать, если я забыл новый пароль? Сначала проверьте запись в менеджере паролей. Если пароль не сохранён, подключитесь к роутеру кабелем и посмотрите или сбросьте настройки Wi-Fi. Заводской сброс возвращает стандартный пароль, но стирает конфигурацию, поэтому это крайний вариант.',
        'Можно ли пускать гостей в основную сеть? Лучше дайте им отдельную гостевую сеть с собственным паролем и изоляцией клиентов. Так устройства посетителей не видят ваши принтеры, хранилище и страницу администрирования роутера.',
      ],
    },
    {
      heading: 'Чеклист безопасности Wi-Fi',
      paragraphs: [
        'Пройдитесь по этому списку один раз, а затем возвращайтесь к нему, когда меняете роутер или добавляете новый тип устройств. Цель не в идеально закрытой сети, а в том, чтобы важные типовые настройки были осознанными.',
      ],
      bullets: [
        'Пароль Wi-Fi: 16+ случайных символов или фраза из 5-6 слов.',
        'Режим безопасности: WPA3 или смешанный WPA2/WPA3 для совместимости.',
        'WPS и удалённое администрирование: выключены, если не нужны.',
        'Пароль администратора роутера: изменён с заводского.',
        'Гостевая сеть: отдельный пароль и изоляция клиентов.',
        'Прошивка: актуальная, с планом замены неподдерживаемого оборудования.',
        'Список устройств: периодически проверяйте на незнакомые клиенты.',
      ],
    },
  ],
};

export const zh: LocalizedArticleContent = {
  title: 'Wi-Fi 密码：如何创建和修改安全密码',
  excerpt:
    '实用指南：如何选择强 Wi-Fi 密码、在路由器上修改密码，并把访客和智能设备隔离到独立网络。 Wi-Fi 密码保护的不只是上网权限。',
  seoTitle: 'Wi-Fi 密码：创建和修改安全密码的实用指南',
  seoDescription:
    '实用指南：如何选择强 Wi-Fi 密码、在路由器上修改密码，并把访客和智能设备隔离到独立网络。 了解如何创建安全的 Wi-Fi 密码、在路由器上修改密码、关闭 WPS，并在不影响智能家居的情况下隔离访客设备。',
  keywords: [
    'wifi 密码',
    '修改 wifi 密码',
    'wifi 密码 安全',
    '路由器 密码',
    'wpa3',
    '访客网络',
    '无线网络',
  ],
  sections: [
    {
      heading: '为什么 Wi-Fi 密码需要单独的策略',
      paragraphs: [
        'Wi-Fi 密码保护的不只是上网权限。接入你网络的人往往能看到智能音箱、打印机、网络存储和路由器管理页面。设备出厂密码太弱、固件长期不更新，会让内部攻击更容易得手。',
        '很多家庭仍在使用多年前设置的密码，告诉过访客，卖设备或搬家后也没改。这是常见习惯，不是罕见错误。实用做法是把 Wi-Fi 密码当成其他凭据一样管理：随机生成、存进密码管理器，并在知道密码的人发生变化时更换。',
        '本文讲密码本身、决定密码效果的路由器设置，以及不把全家设备断网的安全更换流程。',
      ],
    },
    {
      heading: '什么样的 Wi-Fi 密码才算强',
      paragraphs: [
        '长度和随机性比表面复杂更重要。16 位随机字符来自较大的字符集，搜索空间非常大。带一个大写字母和感叹号的短密码，仍然会在几分钟内被字典攻击破解。',
        '家庭网络建议使用至少 16 位随机字符，或从大词表中随机选出的五到六个单词组成的密码短语。密码更长，在手机上给访客或新设备输入时也更方便。',
        '不要把 Wi-Fi 密码复用到邮箱、银行或密码管理器。即使它从路由器备份、访客手机或纸质便签泄露，损失也应止步于网络边界。',
      ],
      bullets: [
        '至少 16 位随机字符，或 5-6 个随机单词。',
        '用加密安全的生成器创建密码，不要依赖个人规律。',
        'Wi-Fi 密码保持唯一，不要重复账户密码。',
        '存进密码管理器，能扫码时用二维码分享。',
      ],
    },
    {
      heading: '如何修改 Wi-Fi 密码',
      paragraphs: [
        '从已连接网络的设备打开路由器管理页面。地址通常印在机身标签上：192.168.1.1、192.168.0.1 或厂商的主机名。用管理员密码登录，而不是 Wi-Fi 密码。如果路由器还在用出厂管理员密码，先改掉它。',
        '找到无线设置，查看安全模式。所有设备都支持时选 WPA3，需要兼容旧设备时选 WPA2/WPA3 混合模式。不要使用 WEP 或开放网络。输入新密码、应用设置，先连接一台手机或笔记本确认可用，再继续。',
        '修改密码后，所有使用旧密码的设备都会断开。走一遍家里，重新连接手机、笔记本、电视、游戏机、打印机和智能设备。旧密码只保留到迁移结束，然后销毁写有它的便签。',
      ],
      bullets: [
        '用管理员密码登录路由器。',
        '启用 WPA3，旧设备可用 WPA2/WPA3 混合模式。',
        '使用新生成的密码，不要只改旧密码的几个字符。',
        '重新连接所有设备，并清理旧密码记录。',
      ],
    },
    {
      heading: '选择手机和电视都能顺利输入的密码',
      paragraphs: [
        '无法输入的密码会逼人走捷径：不设密码的访客网络、贴在冰箱上的便签，或者永远不换的共享密码。选择你实际能在设备上输入的格式。',
        '16 位大小写字母加数字是稳妥的默认值。如果电视遥控器或游戏机输入符号很痛苦，用连字符分隔的 5-6 个随机单词组成密码短语，输入更快，随机选词也能保持足够熵值。不要把每个“a”都换成“@”，那增加的熵很少，还会让密码更难传达。',
        '很多密码管理器可以把 Wi-Fi 密码显示成二维码。比大声念一长串字符更快、更少出错，也不用把密码写在纸上。',
      ],
    },
    {
      heading: '比密码更重要的路由器设置',
      paragraphs: [
        '强密码弥补不了接受 WPS PIN 或把管理页面暴露到公网的路由器。改完密码后，检查控制设备接入和管理方式的设置。',
        '不需要 WPS 就关掉。PIN 方式长期存在暴力破解弱点，WPS 按钮也可能被能接触到设备的人按下。如果不了解风险、也没有明确需求，就保持远程管理关闭。',
        '把访客和不太可信的智能设备放进单独的访客网络。它应有自己的密码、在路由器支持时启用客户端隔离，并且不能访问主局域网。更新路由器固件，替换已经停止安全更新的硬件。',
      ],
      bullets: [
        '关闭 WPS 和远程管理。',
        '访客和低价智能设备使用访客网络。',
        '修改路由器的出厂管理员密码。',
        '保持固件更新，替换不再受支持的硬件。',
      ],
    },
    {
      heading: '家庭网络与公共 Wi-Fi',
      paragraphs: [
        '家庭 Wi-Fi 密码决定谁能加入你信任的网络。公共 Wi-Fi 不一样：路由器不归你管，其他访客可能观察流量，强制门户有时会模仿熟悉的登录页面。即使需要密码，也把公共网络当成不可信环境。',
        '在公共 Wi-Fi 上优先访问 HTTPS 网站，不要修改敏感账户设置，需要保护流量时使用可靠的 VPN。关闭对开放网络的自动连接，避免手机悄悄接入一个相似的热点。',
        '在家里的对应习惯是保持访客网络隔离，并偶尔查看已连接设备列表。发现不认识的设备时，应该更换 Wi-Fi 密码并排查，而不是只改网络名称。',
      ],
    },
    {
      heading: '好与坏的 Wi-Fi 密码示例',
      paragraphs: [
        '以下示例都是虚构的，不要使用。它们展示“看起来复杂”和“真正不可预测”之间的差别。',
        '坏示例遵循模板：季节、年份、宠物名字或键盘图案。“Summer2026!” 和 “FluffyTheCat1” 能满足很多复杂度规则，但都由破解工具首先尝试的单词和模式组成。像 “HomeWiFi-2026” 这样的网络名称会让猜测更简单。',
        '好示例随机生成，长度足够。像 “violet-harbor-cactus-42” 这样的密码容易输入，也只需记一次；16 位随机字符串则提供更高熵值。只要密码唯一、保存安全、不来自社交媒体上的公开信息，两种都可以。',
      ],
    },
    {
      heading: 'Wi-Fi 密码常见问题',
      paragraphs: [
        'Wi-Fi 密码应该多长？至少 16 位随机字符，或 5-6 个单词的密码短语。只要保持唯一并安全保存，更长更好。',
        '12 位够吗？比短密码好，但 16 位或强密码短语能给长期使用的网络更大余量。',
        '多久换一次？知道密码的人离开家庭或团队时、设备丢失或出售后、怀疑被入侵时、换路由器时。定期强制轮换没有在信任关系变化时及时收回访问权重要。',
        '可以用密码短语代替随机字符串吗？可以。五到六个随机单词的短语很强，也更容易在电视或游戏机上输入。不要用名言、歌词或个人经历拼出来。',
        '忘记新密码怎么办？先查密码管理器。如果没有保存，用网线连接路由器查看或重置无线设置。恢复出厂设置会恢复默认密码，但会清空配置，所以只作为最后手段。',
        '访客应该用主网络吗？最好给他们单独的访客网络、独立密码和客户端隔离。这样访客设备看不到你的打印机、存储和路由器管理页面。',
      ],
    },
    {
      heading: 'Wi-Fi 安全检查清单',
      paragraphs: [
        '按这份清单检查一次，之后换路由器或增加新类型设备时再回来看。目标不是把网络锁死，而是让重要设置都经过有意识的选择。',
      ],
      bullets: [
        'Wi-Fi 密码：16 位以上随机字符，或 5-6 个单词的短语。',
        '安全模式：WPA3，兼容旧设备时用 WPA2/WPA3 混合。',
        'WPS 和远程管理：不需要就关闭。',
        '路由器管理员密码：已从出厂值修改。',
        '访客网络：独立密码并启用客户端隔离。',
        '固件：保持更新，并计划替换停止支持的硬件。',
        '设备列表：定期检查是否有陌生客户端。',
      ],
    },
  ],
};

export const ja: LocalizedArticleContent = {
  title: 'Wi-Fiパスワード：安全なパスワードの作り方と変更方法',
  excerpt:
    '強いWi-Fiパスワードの選び方、ルーターでの変更手順、ゲストとスマート家電を別ネットワークに分ける方法をまとめた実用ガイドです。',
  seoTitle: 'Wi-Fiパスワード：安全な作り方と変更方法',
  seoDescription:
    '安全なWi-Fiパスワードの作り方、ルーターでの変更、WPSの無効化、スマート家電を止めずにゲストを分離する方法を解説します。',
  keywords: [
    'wifi パスワード',
    'wi-fi パスワード 変更',
    'パスフレーズ',
    'wpa3',
    'ゲストネットワーク',
    'ルーター',
  ],
  sections: [
    {
      heading: 'Wi-Fiパスワードに専用の対策が必要な理由',
      paragraphs: [
        'Wi-Fiパスワードが守るのはインターネット接続だけではありません。ネットワークに参加した人は、スマートスピーカー、プリンター、ネットワークストレージ、ルーターの管理画面まで見えることがあります。機器の初期パスワードが弱く、ファームウェアが古いままだと、内部からの攻撃が容易になります。',
        '多くの家庭では、何年も前に決めたパスワードを来客に伝え、機器を売ったり引っ越したりしても変えていません。よくある行動で、珍しい失敗ではありません。実用的な解決策は、Wi-Fiパスワードを他の認証情報と同じように扱うことです。ランダムに生成し、パスワードマネージャーに保存し、知っている人の範囲が変わったら変更します。',
        'このガイドでは、パスワード自体、その効果を左右するルーター設定、家じゅうの接続を切らずに変更する手順を説明します。',
      ],
    },
    {
      heading: '強いWi-Fiパスワードの条件',
      paragraphs: [
        '見た目の複雑さより、長さとランダム性が重要です。大きな文字集合から選んだ16文字のランダムなパスワードは、総当たりの探索空間を大きく広げます。大文字と感嘆符を付けた短いパスワードは、辞書攻撃で数分で破られます。',
        '家庭のネットワークなら、16文字以上のランダムな文字列か、大きな単語リストから無作為に選んだ5〜6語のパスフレーズを使ってください。長いパスワードは、来客や新しい機器を接続するときにスマートフォンでも入力しやすくなります。',
        'Wi-Fiパスワードをメール、銀行、パスワードマネージャーで使い回さないでください。ルーターのバックアップ、来客のスマートフォン、紙のメモから漏れても、被害はネットワーク内で止まるべきです。',
      ],
      bullets: [
        '16文字以上のランダムな文字列、または5〜6語のランダムな単語。',
        '暗号学的に安全な生成器を使い、自分のパターンに頼らない。',
        'Wi-Fiパスワードは固有に保ち、アカウントのパスワードを再利用しない。',
        'パスワードマネージャーに保存し、可能ならQRコードで共有する。',
      ],
    },
    {
      heading: 'Wi-Fiパスワードの変更手順',
      paragraphs: [
        'ネットワークに接続した端末からルーターの管理画面を開きます。アドレスは本体のラベルに書かれていることが多く、192.168.1.1、192.168.0.1、メーカーのホスト名などです。Wi-Fiパスワードではなく、管理者パスワードでログインします。初期の管理者パスワードのままなら、先に変更してください。',
        'ワイヤレス設定を開き、セキュリティモードを確認します。すべての機器が対応していればWPA3、古い機器が必要ならWPA2/WPA3混合モードを選びます。WEPとオープンネットワークは使わないでください。新しいパスワードを入力して設定を適用し、続行する前にスマートフォンかノートPCで接続を確認します。',
        'パスワードを変えると、古いパスワードを使っていた機器はすべて切断されます。家中を回って、スマートフォン、ノートPC、テレビ、ゲーム機、プリンター、スマート家電を再接続してください。古いパスワードは移行が終わるまで残し、その後はメモを破棄します。',
      ],
      bullets: [
        '管理者パスワードでルーターにログインする。',
        'WPA3、または古い機器向けにWPA2/WPA3混合を有効にする。',
        '新しく生成したパスワードを使い、古いものの変形にしない。',
        'すべての機器を再接続し、古いメモを処分する。',
      ],
    },
    {
      heading: 'スマートフォンやテレビでも入力しやすいパスワードを選ぶ',
      paragraphs: [
        '入力できないパスワードは近道を招きます。パスワードなしのゲストネットワーク、冷蔵庫に貼ったメモ、ずっと変えない共有パスワードです。実際に使う機器で入力できる形式を選んでください。',
        '大文字・小文字・数字を含む16文字は良い標準です。テレビのリモコンやゲーム機で記号の入力がつらいなら、ハイフンで区切った5〜6語のパスフレーズが入力しやすく、単語がランダムなら十分なエントロピーを保てます。すべての「a」を「@」に置き換えるのはやめましょう。エントロピーはほとんど増えず、伝えるのが難しくなります。',
        '多くのパスワードマネージャーはWi-FiパスワードをQRコードで表示できます。長い文字列を読み上げるより速く、間違いも少なく、紙に書く必要もありません。',
      ],
    },
    {
      heading: 'パスワードより重要なルーター設定',
      paragraphs: [
        '強いパスワードでも、WPSのPINを受け付けたり管理画面をインターネットに公開したりするルーターは補えません。パスワードを変えたら、機器の接続方法とルーターの管理方法を決める設定を確認してください。',
        '本当に必要でなければWPSを無効にします。PIN方式には総当たりの弱点が長くあり、WPSボタンは物理的に触れる人なら誰でも押せます。リスクを理解しておらず、明確な必要もないなら、リモート管理はオフのままにします。',
        '来客と信頼度の低いスマート家電は、別のゲストネットワークに置きます。独自のパスワード、ルーターが対応していればクライアント分離、メインLANへのアクセスなし、という構成にします。ファームウェアを更新し、セキュリティ修正が届かない機器は買い替えてください。',
      ],
      bullets: [
        'WPSとリモート管理を無効にする。',
        '来客と安価なスマート家電にはゲストネットワークを使う。',
        'ルーターの管理者パスワードを初期値から変更する。',
        'ファームウェアを最新に保ち、サポート終了機器は交換する。',
      ],
    },
    {
      heading: '家庭のWi-Fiと公共Wi-Fi',
      paragraphs: [
        '家庭のWi-Fiパスワードは、信頼するネットワークに誰が入れるかを決めます。公共Wi-Fiは事情が違います。ルーターは自分のものではなく、他の利用者が通信を観察できる場合があり、キャプティブポータルが慣れたログイン画面を模すこともあります。パスワードが必要でも、公共ネットワークは信頼しない前提で使ってください。',
        '公共Wi-FiではHTTPSのサイトを優先し、重要なアカウント設定は変更せず、ローカルネットワークから通信を守りたいときは信頼できるVPNを使います。オープンネットワークへの自動接続を切り、スマートフォンが似た名前のアクセスポイントに黙ってつながらないようにします。',
        '家庭での同じ習慣は、ゲストネットワークを分離し、接続機器の一覧をときどき確認することです。見覚えのない機器があれば、ネットワーク名を変えるだけでなく、Wi-Fiパスワードを変更して原因を調べます。',
      ],
    },
    {
      heading: '良いWi-Fiパスワードと悪い例',
      paragraphs: [
        '以下の例は架空のもので、使用しないでください。見た目だけ複雑なパスワードと、本当に予測しにくいパスワードの違いを示しています。',
        '悪い例は季節、年、ペットの名前、キーボード配列といったテンプレートに従います。「Summer2026!」や「FluffyTheCat1」は多くの複雑さルールを満たしますが、破解ツールが最初に試す単語とパターンでできています。「HomeWiFi-2026」のようなネットワーク名は推測をさらに簡単にします。',
        '良い例はランダムに生成され、十分に長いものです。「violet-harbor-cactus-42」は入力しやすく一度覚えれば済みます。16文字のランダムな文字列はさらに高いエントロピーを持ちます。固有で安全に保存され、SNSの公開情報から作られていなければ、どちらも使えます。',
      ],
    },
    {
      heading: 'Wi-Fiパスワードのよくある質問',
      paragraphs: [
        'Wi-Fiパスワードはどれくらいの長さがいいですか？ 16文字以上のランダムな文字列か、5〜6語のパスフレーズが目安です。固有に保ち、安全に保存できるなら長いほど有利です。',
        '12文字で足りますか？ 短いパスワードよりは良いですが、16文字か強いパスフレーズのほうが、何年も使うネットワークには余裕があります。',
        'どのくらいの頻度で変えるべきですか？ パスワードを知っていた人が家やチームを離れるとき、機器を紛失・売却したとき、侵入を疑ったとき、ルーターを交換したときです。定期的な強制変更より、信頼関係が変わったときにアクセスを切るほうが重要です。',
        'ランダムな文字列の代わりにパスフレーズを使えますか？ 使えます。ランダムな5〜6語のパスフレーズは強く、テレビやゲーム機でも入力しやすいです。引用句、歌詞、自分の人生の話から組み立てないでください。',
        '新しいパスワードを忘れたら？ まずパスワードマネージャーの登録を確認します。保存していなければ、LANケーブルでルーターに接続し、Wi-Fi設定を確認するか初期化します。工場出荷状態に戻すと既定のパスワードに戻りますが、設定も消えるので最後の手段です。',
        '来客はメインネットワークを使うべきですか？ 独自のパスワードとクライアント分離を備えたゲストネットワークを用意してください。来客の機器からプリンター、ストレージ、ルーター管理画面が見えなくなります。',
      ],
    },
    {
      heading: 'Wi-Fiセキュリティチェックリスト',
      paragraphs: [
        'このリストを一度確認し、ルーターを交換したり新しい種類の機器を追加したりしたときに戻ってきてください。目的は完璧に閉じたネットワークではなく、重要な初期設定を意識して選ぶことです。',
      ],
      bullets: [
        'Wi-Fiパスワード：16文字以上のランダムな文字列、または5〜6語のパスフレーズ。',
        'セキュリティモード：WPA3、互換性が必要ならWPA2/WPA3混合。',
        'WPSとリモート管理：必要がなければ無効。',
        'ルーターの管理者パスワード：初期値から変更済み。',
        'ゲストネットワーク：別のパスワードとクライアント分離を有効化。',
        'ファームウェア：最新化し、サポート終了機器の交換を計画。',
        '機器一覧：定期的に見覚えのないクライアントを確認。',
      ],
    },
  ],
};

export const pl: LocalizedArticleContent = {
  title: 'Hasło Wi-Fi: jak stworzyć i zmienić bezpieczne hasło',
  excerpt:
    'Praktyczny przewodnik: jak wybrać silne hasło Wi-Fi, zmienić je w routerze i oddzielić gości oraz urządzenia inteligentne w osobnej sieci. Hasło Wi-Fi chroni więcej niż dostęp do internetu.',
  seoTitle: 'Hasło Wi-Fi: jak stworzyć i zmienić bezpieczne hasło',
  seoDescription:
    'Dowiedz się, jak stworzyć bezpieczne hasło Wi-Fi, zmienić je w routerze, wyłączyć WPS i odizolować gości oraz urządzenia inteligentne bez zatrzymywania domu.',
  keywords: [
    'hasło wifi',
    'zmiana hasła wifi',
    'hasło wi-fi',
    'hasło 12 znaków',
    'fraza hasłowa',
    'wpa3',
    'sieć gościnna',
  ],
  sections: [
    {
      heading: 'Dlaczego hasło Wi-Fi wymaga osobnej strategii',
      paragraphs: [
        'Hasło Wi-Fi chroni więcej niż dostęp do internetu. Ktoś, kto dołączy do twojej sieci, często widzi inteligentne głośniki, drukarki, pamięć sieciową i panel administracyjny routera. Słabe hasła fabryczne urządzeń i nieaktualny firmware ułatwiają atak od środka.',
        'Wiele domów nadal używa hasła wybranego lata temu, przekazanego gościom i niezmienionego po sprzedaży urządzenia czy przeprowadzce. To zwykłe zachowanie, nie rzadki błąd. Praktyczne rozwiązanie jest proste: traktuj hasło Wi-Fi jak każdy inny sekret. Generuj je losowo, przechowuj w menedżerze haseł i zmieniaj, gdy zmienia się krąg osób, które je znają.',
        'Ten przewodnik obejmuje samo hasło, ustawienia routera, które decydują o jego skuteczności, oraz bezpieczny proces zmiany bez odłączania całego domu.',
      ],
    },
    {
      heading: 'Co czyni hasło Wi-Fi silnym',
      paragraphs: [
        'Długość i losowość liczą się bardziej niż pozorna złożoność. Szesnaście losowych znaków z dużego alfabetu daje ogromną przestrzeń wyszukiwania. Krótkie hasło z wielką literą i wykrzyknikiem nadal pada ofiarą ataku słownikowego w kilka minut.',
        'Dla sieci domowej wybierz co najmniej 16 losowych znaków albo frazę hasłową z pięciu lub sześciu słów wylosowanych z dużej listy. Dłuższe hasło łatwiej też wpisać na telefonie, gdy podłączasz gościa lub nowe urządzenie.',
        'Nie używaj hasła Wi-Fi do poczty, banku ani menedżera haseł. Jeśli wycieknie z kopii routera, telefonu gościa albo kartki, szkody powinny zatrzymać się na granicy sieci.',
      ],
      bullets: [
        'Co najmniej 16 losowych znaków albo 5-6 losowych słów.',
        'Generuj hasło kryptograficznie bezpiecznym generatorem, nie własnym schematem.',
        'Trzymaj hasło Wi-Fi unikalne i nie powtarzaj hasła konta.',
        'Przechowuj je w menedżerze i udostępniaj kodem QR, gdy to możliwe.',
      ],
    },
    {
      heading: 'Jak zmienić hasło Wi-Fi',
      paragraphs: [
        'Otwórz panel administracyjny routera z urządzenia podłączonego do sieci. Adres zwykle jest na naklejce obudowy: 192.168.1.1, 192.168.0.1 albo nazwa hosta producenta. Zaloguj się hasłem administratora, a nie hasłem Wi-Fi. Jeśli router nadal używa fabrycznego hasła administratora, najpierw je zmień.',
        'Znajdź sekcję sieci bezprzewodowej i sprawdź tryb zabezpieczeń. Wybierz WPA3, jeśli wszystkie urządzenia go obsługują, albo mieszany WPA2/WPA3, gdy potrzebna jest zgodność ze starszym sprzętem. Unikaj WEP i sieci otwartych. Wpisz nowe hasło, zastosuj ustawienia i podłącz telefon lub laptop, żeby sprawdzić wynik przed dalszymi zmianami.',
        'Zmiana hasła rozłącza wszystkie urządzenia używające starego. Przejdź po domu i podłącz ponownie telefony, laptopy, telewizory, konsole, drukarki i urządzenia inteligentne. Stare hasło trzymaj tylko do końca migracji, a potem zniszcz wszystkie notatki, które je zawierają.',
      ],
      bullets: [
        'Zaloguj się do routera hasłem administratora.',
        'Włącz WPA3 albo mieszany WPA2/WPA3 dla starszych urządzeń.',
        'Użyj świeżo wygenerowanego hasła, nie wariantu starego.',
        'Podłącz wszystkie urządzenia i usuń stare notatki.',
      ],
    },
    {
      heading: 'Wybierz hasło, które wpiszesz na telefonie i telewizorze',
      paragraphs: [
        'Hasło, którego nie da się wpisać, zachęca do obejść: sieć gościnna bez hasła, kartka na lodówce albo wspólne hasło, którego nikt nie zmienia. Wybierz format, który naprawdę potrafisz wprowadzić na swoich urządzeniach.',
        'Szesnaście znaków z wielkimi i małymi literami oraz cyframi to dobry standard. Jeśli pilot telewizora albo konsoli utrudnia wpisywanie symboli, fraza z 5-6 słów rozdzielonych myślnikami jest łatwiejsza i zachowuje wysoką entropię, gdy słowa są losowe. Nie zamieniaj każdego „a” na „@”: dodaje to mało entropii i utrudnia przekazanie hasła.',
        'Wiele menedżerów haseł pokazuje hasło Wi-Fi jako kod QR. To szybsze i mniej podatne na błędy niż dyktowanie długiego ciągu, a przy tym nie wymaga zapisywania hasła na papierze.',
      ],
    },
    {
      heading: 'Ustawienia routera ważniejsze od hasła',
      paragraphs: [
        'Silne hasło nie zrekompensuje routera, który przyjmuje PIN WPS albo wystawia panel administracyjny do internetu. Po zmianie hasła sprawdź ustawienia odpowiadające za sposób dołączania urządzeń i zarządzanie routerem.',
        'Wyłącz WPS, jeśli naprawdę go nie potrzebujesz. Metoda PIN od lat ma słabości związane z atakiem siłowym, a przycisk WPS może nacisnąć każdy z fizycznym dostępem. Zostaw zdalną administrację wyłączoną, jeśli nie rozumiesz ryzyka i nie masz konkretnej potrzeby.',
        'Umieść gości i mało zaufane urządzenia inteligentne w osobnej sieci gościnnej. Powinna mieć własne hasło, izolację klientów, jeśli router ją obsługuje, i brak dostępu do głównej sieci lokalnej. Aktualizuj firmware i wymieniaj sprzęt, który nie dostaje już poprawek bezpieczeństwa.',
      ],
      bullets: [
        'Wyłącz WPS i zdalną administrację.',
        'Używaj sieci gościnnej dla odwiedzających i tanich urządzeń inteligentnych.',
        'Zmień fabryczne hasło administratora routera.',
        'Aktualizuj firmware i wymieniaj sprzęt bez wsparcia.',
      ],
    },
    {
      heading: 'Sieć domowa a publiczne Wi-Fi',
      paragraphs: [
        'Hasło domowego Wi-Fi kontroluje, kto wchodzi do sieci, której ufasz. Publiczne Wi-Fi działa inaczej: router nie należy do ciebie, inni goście mogą obserwować ruch, a portale logowania czasem imitują znane formularze. Traktuj publiczne sieci jako niezaufane, nawet gdy wymagają hasła.',
        'W publicznym Wi-Fi wybieraj strony HTTPS, nie zmieniaj ważnych ustawień konta i używaj zaufanego VPN, gdy musisz chronić ruch przed siecią lokalną. Wyłącz automatyczne łączenie z otwartymi sieciami, żeby telefon nie dołączał po cichu do podobnego punktu dostępu.',
        'W domu odpowiedni nawyk to izolowanie sieci gościnnej i okresowe sprawdzanie listy podłączonych urządzeń. Nieznane urządzenie to powód, by zmienić hasło Wi-Fi i zbadać sprawę, a nie tylko zmienić nazwę sieci.',
      ],
    },
    {
      heading: 'Przykłady dobrych i złych haseł Wi-Fi',
      paragraphs: [
        'Te przykłady są fikcyjne i nie należy ich używać. Pokazują różnicę między hasłem, które tylko wygląda na złożone, a naprawdę nieprzewidywalnym.',
        'Złe przykłady podążają za szablonem: pora roku, rok, imię zwierzaka albo wzór na klawiaturze. „Summer2026!” i „FluffyTheCat1” spełniają wiele zasad złożoności, ale składają się ze słów i wzorców, które narzędzia do łamania próbują najpierw. Nazwa sieci typu „HomeWiFi-2026” jeszcze ułatwia zgadywanie.',
        'Dobre przykłady są generowane losowo i wystarczająco długie. Hasło „violet-harbor-cactus-42” łatwo wpisać i zapamiętać raz, a losowy ciąg 16 znaków daje więcej entropii. Oba się nadają, jeśli hasło jest unikalne, bezpiecznie zapisane i nie pochodzi z publicznych informacji w mediach społecznościowych.',
      ],
    },
    {
      heading: 'Najczęstsze pytania o hasło Wi-Fi',
      paragraphs: [
        'Jak długie powinno być hasło Wi-Fi? Co najmniej 16 losowych znaków albo fraza z 5-6 słów. Dłuższe jest lepsze, jeśli utrzymasz je unikalne i bezpiecznie zapisane.',
        'Czy 12 znaków wystarczy? To lepiej niż krótkie hasło, ale 16 znaków albo mocna fraza dają większy zapas dla sieci używanej przez lata.',
        'Jak często je zmieniać? Gdy osoba, która je znała, wyprowadza się lub odchodzi z zespołu; gdy urządzenie zginie albo zostanie sprzedane; po podejrzeniu włamania; gdy wymieniasz router. Wymuszona rotacja jest mniej ważna niż odebranie dostępu, gdy zmienia się zaufanie.',
        'Czy zamiast losowego ciągu można użyć frazy hasłowej? Tak. Losowa fraza z pięciu lub sześciu słów jest silna i łatwiejsza do wpisania na telewizorze czy konsoli. Nie układaj jej z cytatu, piosenki ani historii o swoim życiu.',
        'Co zrobić, jeśli zapomnę nowego hasła? Najpierw sprawdź wpis w menedżerze haseł. Jeśli go nie zapisano, podłącz router kablem i odczytaj albo zresetuj ustawienia Wi-Fi. Reset fabryczny przywraca domyślne hasło, ale czyści konfigurację, więc traktuj go jako ostateczność.',
        'Czy goście powinni używać głównej sieci? Lepiej daj im osobną sieć gościnną z własnym hasłem i izolacją klientów. Urządzenia odwiedzających nie widzą wtedy twoich drukarek, pamięci sieciowej ani panelu routera.',
      ],
    },
    {
      heading: 'Lista kontrolna bezpieczeństwa Wi-Fi',
      paragraphs: [
        'Przejdź przez tę listę raz, a potem wracaj do niej, gdy zmieniasz router albo dodajesz nowy typ urządzeń. Celem nie jest szczelnie zamknięta sieć, tylko sieć, w której ważne ustawienia wybrano świadomie.',
      ],
      bullets: [
        'Hasło Wi-Fi: 16+ losowych znaków albo fraza z 5-6 słów.',
        'Tryb zabezpieczeń: WPA3 albo mieszany WPA2/WPA3 dla zgodności.',
        'WPS i zdalna administracja: wyłączone, jeśli nie są potrzebne.',
        'Hasło administratora routera: zmienione z fabrycznego.',
        'Sieć gościnna: osobne hasło i włączona izolacja klientów.',
        'Firmware: aktualny, z planem wymiany sprzętu bez wsparcia.',
        'Lista urządzeń: regularnie sprawdzana pod kątem nieznanych klientów.',
      ],
    },
  ],
};

export const vi: LocalizedArticleContent = {
  title: 'Mật khẩu Wi-Fi: cách tạo và đổi mật khẩu mạng an toàn',
  excerpt:
    'Hướng dẫn thực tế: chọn mật khẩu Wi-Fi mạnh, đổi trên router và tách khách cùng thiết bị thông minh sang mạng riêng. Mật khẩu Wi-Fi bảo vệ nhiều hơn quyền truy cập internet.',
  seoTitle: 'Mật khẩu Wi-Fi: cách tạo và đổi mật khẩu mạng an toàn',
  seoDescription:
    'Hướng dẫn thực tế: chọn mật khẩu Wi-Fi mạnh, đổi trên router và tách khách cùng thiết bị thông minh sang mạng riêng. Dùng trình tạo để tạo mật khẩu duy nhất và.',
  keywords: [
    'mật khẩu wifi',
    'đổi mật khẩu wifi',
    'mật khẩu wi-fi an toàn',
    'wpa3',
    'mạng khách',
    'router',
  ],
  sections: [
    {
      heading: 'Vì sao mật khẩu Wi-Fi cần một chiến lược riêng',
      paragraphs: [
        'Mật khẩu Wi-Fi bảo vệ nhiều hơn quyền truy cập internet. Người vào được mạng của bạn thường thấy loa thông minh, máy in, ổ lưu trữ mạng và trang quản trị router. Mật khẩu mặc định yếu và firmware cũ khiến một cuộc tấn công từ bên trong dễ thành công hơn.',
        'Nhiều gia đình vẫn dùng mật khẩu chọn từ nhiều năm trước, đã chia sẻ với khách và chưa đổi sau khi bán thiết bị hoặc chuyển nhà. Đó là thói quen bình thường, không phải lỗi hiếm gặp. Cách xử lý thực tế là coi mật khẩu Wi-Fi như mọi thông tin đăng nhập khác: tạo ngẫu nhiên, lưu trong trình quản lý mật khẩu và đổi khi nhóm người biết mật khẩu thay đổi.',
        'Hướng dẫn này nói về bản thân mật khẩu, các thiết lập router quyết định hiệu quả của nó và quy trình đổi an toàn mà không ngắt toàn bộ thiết bị trong nhà.',
      ],
    },
    {
      heading: 'Điều gì tạo nên mật khẩu Wi-Fi mạnh',
      paragraphs: [
        'Độ dài và tính ngẫu nhiên quan trọng hơn vẻ phức tạp bên ngoài. Mười sáu ký tự ngẫu nhiên từ một bảng chữ lớn tạo ra không gian tìm kiếm khổng lồ. Mật khẩu ngắn có một chữ hoa và dấu chấm than vẫn gục trước tấn công từ điển trong vài phút.',
        'Với mạng gia đình, hãy dùng ít nhất 16 ký tự ngẫu nhiên hoặc cụm mật khẩu gồm năm đến sáu từ lấy ngẫu nhiên từ danh sách lớn. Mật khẩu dài cũng dễ nhập hơn trên điện thoại khi bạn kết nối khách hoặc thiết bị mới.',
        'Không dùng lại mật khẩu Wi-Fi cho email, ngân hàng hay trình quản lý mật khẩu. Nếu nó lộ ra từ bản sao lưu router, điện thoại của khách hoặc tờ giấy ghi chú, thiệt hại nên dừng ở ranh giới mạng.',
      ],
      bullets: [
        'Ít nhất 16 ký tự ngẫu nhiên hoặc 5-6 từ ngẫu nhiên.',
        'Tạo mật khẩu bằng trình tạo an toàn về mật mã, không dùng mẫu cá nhân.',
        'Giữ mật khẩu Wi-Fi duy nhất và không lặp lại mật khẩu tài khoản.',
        'Lưu trong trình quản lý mật khẩu và chia sẻ bằng mã QR khi có thể.',
      ],
    },
    {
      heading: 'Cách đổi mật khẩu Wi-Fi',
      paragraphs: [
        'Mở trang quản trị router từ thiết bị đang kết nối mạng. Địa chỉ thường in trên nhãn máy: 192.168.1.1, 192.168.0.1 hoặc tên máy chủ của hãng. Đăng nhập bằng mật khẩu quản trị, không phải mật khẩu Wi-Fi. Nếu router vẫn dùng mật khẩu quản trị mặc định, hãy đổi nó trước.',
        'Tìm phần mạng không dây và xem chế độ bảo mật. Chọn WPA3 nếu mọi thiết bị hỗ trợ, hoặc WPA2/WPA3 kết hợp khi cần tương thích với thiết bị cũ. Tránh WEP và mạng mở. Nhập mật khẩu mới, áp dụng cài đặt và kết nối thử một điện thoại hoặc laptop trước khi làm tiếp.',
        'Đổi mật khẩu sẽ ngắt mọi thiết bị đang dùng mật khẩu cũ. Đi một vòng quanh nhà và kết nối lại điện thoại, laptop, tivi, máy chơi game, máy in và thiết bị thông minh. Chỉ giữ mật khẩu cũ đến khi chuyển xong, sau đó hủy mọi ghi chú có nó.',
      ],
      bullets: [
        'Đăng nhập router bằng mật khẩu quản trị.',
        'Bật WPA3 hoặc WPA2/WPA3 kết hợp cho thiết bị cũ.',
        'Dùng mật khẩu mới tạo, không dùng biến thể của mật khẩu cũ.',
        'Kết nối lại mọi thiết bị và xóa ghi chú cũ.',
      ],
    },
    {
      heading: 'Chọn mật khẩu dễ nhập trên điện thoại và tivi',
      paragraphs: [
        'Mật khẩu không thể nhập sẽ đẩy người dùng đến đường tắt: mạng khách không mật khẩu, tờ giấy dán tủ lạnh hoặc mật khẩu chung không bao giờ đổi. Hãy chọn định dạng bạn thực sự nhập được trên thiết bị của mình.',
        'Mười sáu ký tự gồm chữ hoa, chữ thường và số là mức mặc định tốt. Nếu điều khiển tivi hoặc máy chơi game khiến việc nhập ký tự đặc biệt khó chịu, cụm 5-6 từ nối bằng dấu gạch ngang dễ nhập hơn và vẫn giữ entropy cao khi các từ được chọn ngẫu nhiên. Đừng thay mọi chữ “a” bằng “@”: cách đó thêm rất ít entropy và làm mật khẩu khó truyền đạt hơn.',
        'Nhiều trình quản lý mật khẩu hiển thị mật khẩu Wi-Fi dưới dạng mã QR. Cách này nhanh hơn, ít lỗi hơn so với đọc một chuỗi dài và không buộc bạn ghi mật khẩu ra giấy.',
      ],
    },
    {
      heading: 'Thiết lập router quan trọng hơn mật khẩu',
      paragraphs: [
        'Mật khẩu mạnh không bù được cho router chấp nhận mã PIN WPS hoặc mở trang quản trị ra internet. Sau khi đổi mật khẩu, hãy xem lại các thiết lập quyết định cách thiết bị tham gia mạng và cách router được quản lý.',
        'Tắt WPS nếu bạn không thực sự cần. Phương thức PIN từ lâu có điểm yếu trước tấn công vét cạn, còn nút WPS thì ai có quyền truy cập vật lý cũng bấm được. Để quản trị từ xa ở trạng thái tắt nếu bạn không hiểu rủi ro và không có nhu cầu cụ thể.',
        'Đưa khách và thiết bị thông minh ít tin cậy sang mạng khách riêng. Mạng này cần mật khẩu riêng, cách ly thiết bị nếu router hỗ trợ và không có quyền truy cập mạng nội bộ chính. Cập nhật firmware và thay phần cứng không còn nhận bản vá bảo mật.',
      ],
      bullets: [
        'Tắt WPS và quản trị từ xa.',
        'Dùng mạng khách cho người đến chơi và thiết bị thông minh giá rẻ.',
        'Đổi mật khẩu quản trị mặc định của router.',
        'Giữ firmware cập nhật và thay thiết bị hết được hỗ trợ.',
      ],
    },
    {
      heading: 'Mạng gia đình và Wi-Fi công cộng',
      paragraphs: [
        'Mật khẩu Wi-Fi gia đình kiểm soát ai được vào một mạng bạn tin tưởng. Wi-Fi công cộng vận hành khác: router không thuộc về bạn, người khác có thể quan sát lưu lượng và cổng đăng nhập đôi khi bắt chước biểu mẫu quen thuộc. Hãy coi mạng công cộng là không đáng tin, kể cả khi cần mật khẩu để vào.',
        'Trên Wi-Fi công cộng, ưu tiên trang HTTPS, tránh đổi thiết lập tài khoản quan trọng và dùng VPN đáng tin khi cần bảo vệ lưu lượng khỏi mạng cục bộ. Tắt tự động kết nối với mạng mở để điện thoại không lặng lẽ nối vào một điểm truy cập giống tên.',
        'Ở nhà, thói quen tương đương là giữ mạng khách tách biệt và thỉnh thoảng xem danh sách thiết bị đã kết nối. Một thiết bị lạ là lý do để đổi mật khẩu Wi-Fi và tìm hiểu, không chỉ để đổi tên mạng.',
      ],
    },
    {
      heading: 'Ví dụ mật khẩu Wi-Fi tốt và xấu',
      paragraphs: [
        'Các ví dụ này là hư cấu và không nên dùng. Chúng cho thấy khác biệt giữa mật khẩu trông có vẻ phức tạp và mật khẩu thực sự khó đoán.',
        'Ví dụ xấu theo một mẫu: mùa, năm, tên thú cưng hoặc hình bàn phím. “Summer2026!” và “FluffyTheCat1” thỏa nhiều quy tắc phức tạp nhưng đều ghép từ những từ và mẫu mà công cụ bẻ khóa thử trước. Tên mạng như “HomeWiFi-2026” còn làm việc đoán dễ hơn.',
        'Ví dụ tốt được tạo ngẫu nhiên và đủ dài. Mật khẩu như “violet-harbor-cactus-42” dễ nhập và chỉ cần nhớ một lần, còn chuỗi 16 ký tự ngẫu nhiên cho entropy cao hơn. Cả hai đều ổn nếu mật khẩu duy nhất, được lưu an toàn và không bắt nguồn từ thông tin công khai trên mạng xã hội.',
      ],
    },
    {
      heading: 'Câu hỏi thường gặp về mật khẩu Wi-Fi',
      paragraphs: [
        'Mật khẩu Wi-Fi nên dài bao nhiêu? Ít nhất 16 ký tự ngẫu nhiên hoặc cụm 5-6 từ. Dài hơn vẫn tốt hơn nếu bạn giữ nó duy nhất và lưu an toàn.',
        'Mười hai ký tự có đủ không? Tốt hơn mật khẩu ngắn, nhưng 16 ký tự hoặc một cụm mật khẩu mạnh cho mạng dùng nhiều năm khoảng dự phòng lớn hơn.',
        'Bao lâu nên đổi một lần? Khi người từng biết mật khẩu rời khỏi nhà hoặc nhóm; khi mất hoặc bán thiết bị; sau khi nghi ngờ bị xâm nhập; khi đổi router. Việc thu hồi quyền truy cập đúng lúc quan trọng hơn xoay vòng định kỳ.',
        'Có thể dùng cụm mật khẩu thay cho chuỗi ngẫu nhiên không? Có. Cụm năm hoặc sáu từ ngẫu nhiên rất mạnh và dễ nhập trên tivi hay máy chơi game. Đừng ghép nó từ câu trích dẫn, lời bài hát hoặc câu chuyện cá nhân.',
        'Nếu quên mật khẩu mới thì sao? Kiểm tra mục trong trình quản lý mật khẩu trước. Nếu chưa lưu, hãy nối router bằng cáp và xem hoặc đặt lại cài đặt Wi-Fi. Khôi phục cài đặt gốc trả về mật khẩu mặc định nhưng xóa cấu hình, nên chỉ dùng khi cùng đường.',
        'Khách có nên dùng mạng chính? Nên tạo mạng khách riêng với mật khẩu riêng và cách ly thiết bị. Như vậy thiết bị của khách không thấy máy in, ổ lưu trữ hay trang quản trị router của bạn.',
      ],
    },
    {
      heading: 'Danh sách kiểm tra bảo mật Wi-Fi',
      paragraphs: [
        'Đi qua danh sách này một lần, rồi quay lại khi đổi router hoặc thêm một loại thiết bị mới. Mục tiêu không phải mạng bị khóa kín, mà là mạng có những thiết lập quan trọng được chọn một cách có chủ đích.',
      ],
      bullets: [
        'Mật khẩu Wi-Fi: 16+ ký tự ngẫu nhiên hoặc cụm 5-6 từ.',
        'Chế độ bảo mật: WPA3 hoặc WPA2/WPA3 kết hợp để tương thích.',
        'WPS và quản trị từ xa: tắt nếu không cần.',
        'Mật khẩu quản trị router: đã đổi khỏi giá trị mặc định.',
        'Mạng khách: mật khẩu riêng và bật cách ly thiết bị.',
        'Firmware: cập nhật, có kế hoạch thay phần cứng hết hỗ trợ.',
        'Danh sách thiết bị: kiểm tra định kỳ để tìm thiết bị lạ.',
      ],
    },
  ],
};

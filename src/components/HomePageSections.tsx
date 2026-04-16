'use client';

import Link from 'next/link';
import { ShieldCheck, Gauge, Wand2, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { normalizeLocale } from '@/lib/site-config';

type LocaleKey = 'en' | 'ua' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'pl';

type HomeCopy = {
  strengthBadge: string;
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: Array<{ title: string; text: string }>;
  strengthTitle: string;
  strengthIntro: string;
  strengthPoints: string[];
  stepsTitle: string;
  stepsIntro: string;
  steps: Array<{ title: string; text: string }>;
  ctaTitle: string;
  ctaText: string;
  primaryCta: string;
  secondaryCta: string;
  ctaBadge: string;
  utilityTitle: string;
  utilityItems: string[];
};

const COPY: Record<LocaleKey, HomeCopy> = {
  en: {
    strengthBadge: 'Password strength',
    benefitsTitle: 'Why people use this generator',
    benefitsIntro: 'The homepage now focuses on practical help: fast generation, instant strength feedback, and clear next steps.',
    benefits: [
      { title: 'Local generation', text: 'Passwords are created in your browser, so you can generate new options without sending them to a server.' },
      { title: 'Actionable strength feedback', text: 'You immediately see whether the current password is weak, strong, or ready for higher-risk accounts.' },
      { title: 'Useful security defaults', text: 'Length, character sets, and standards-based presets help you avoid common password mistakes.' },
    ],
    strengthTitle: 'Use the built-in password strength check',
    strengthIntro: 'The strength line under the generator is more than decoration. It helps you judge whether the current password is realistic for modern account protection.',
    strengthPoints: [
      'Increase length first when the result still looks weak.',
      'Keep each password unique for every account.',
      'Use the NIST or PCI preset when you need a stricter baseline.',
    ],
    stepsTitle: 'A simple flow that matches real usage',
    stepsIntro: 'Most visitors want to generate a password, quickly verify it, and move on. The homepage now supports that flow directly.',
    steps: [
      { title: 'Generate', text: 'Choose the required length and character sets, then create a new password in one click.' },
      { title: 'Check strength', text: 'Review the strength label and estimated crack time before copying anything important.' },
      { title: 'Use it safely', text: 'Copy the password for your account or read a guide if you need policy or best-practice context.' },
    ],
    ctaTitle: 'Need more than a random password?',
    ctaText: 'Open the guides section for practical security explainers, policy notes, and account-protection walkthroughs.',
    primaryCta: 'Open security guides',
    secondaryCta: 'Contact the team',
    ctaBadge: 'Helpful next step',
    utilityTitle: 'What this homepage helps you do',
    utilityItems: [
      'Generate a password quickly on mobile or desktop',
      'Compare custom settings with stronger presets',
      'Understand whether the current result is ready to use',
      'Jump into deeper guides without scrolling through filler text',
    ],
  },
  ua: {
    strengthBadge: 'Міцність пароля',
    benefitsTitle: 'Чому цим генератором зручно користуватися',
    benefitsIntro: 'Головна сторінка тепер зосереджена на реальній користі: швидка генерація, миттєва оцінка міцності та зрозумілі наступні кроки.',
    benefits: [
      { title: 'Локальна генерація', text: 'Паролі створюються у вашому браузері, тому ви можете генерувати нові варіанти без передавання їх на сервер.' },
      { title: 'Практична оцінка міцності', text: 'Ви одразу бачите, чи поточний пароль слабкий, достатньо сильний або підходить для важливих акаунтів.' },
      { title: 'Корисні безпечні налаштування', text: 'Довжина, набори символів і пресети на основі стандартів допомагають уникати типових помилок.' },
    ],
    strengthTitle: 'Скористайтеся вбудованою перевіркою міцності',
    strengthIntro: 'Рядок міцності під генератором — це не просто декор. Він допомагає оцінити, чи підходить пароль для сучасного рівня захисту.',
    strengthPoints: [
      'Спочатку збільшуйте довжину, якщо пароль усе ще виглядає слабким.',
      'Використовуйте унікальний пароль для кожного акаунта.',
      'Оберіть пресет NIST або PCI, якщо потрібна суворіша базова політика.',
    ],
    stepsTitle: 'Простий сценарій, який відповідає реальному використанню',
    stepsIntro: 'Більшість відвідувачів хочуть швидко створити пароль, перевірити його і перейти далі. Оновлена головна сторінка підтримує саме цей сценарій.',
    steps: [
      { title: 'Згенеруйте', text: 'Виберіть потрібну довжину й набори символів, а потім створіть новий пароль одним кліком.' },
      { title: 'Перевірте міцність', text: 'Подивіться на оцінку міцності та приблизний час злому, перш ніж копіювати пароль.' },
      { title: 'Використайте безпечно', text: 'Скопіюйте пароль для акаунта або відкрийте гайд, якщо потрібні пояснення чи практики.' },
    ],
    ctaTitle: 'Потрібно більше, ніж випадковий пароль?',
    ctaText: 'Перейдіть у розділ гайдів, щоб прочитати практичні матеріали про безпеку, політики та захист облікових записів.',
    primaryCta: 'Відкрити гайди',
    secondaryCta: 'Зв’язатися з командою',
    ctaBadge: 'Корисний наступний крок',
    utilityTitle: 'Що допомагає зробити ця головна сторінка',
    utilityItems: [
      'Швидко згенерувати пароль на мобільному чи десктопі',
      'Порівняти власні налаштування з сильнішими пресетами',
      'Зрозуміти, чи готовий поточний результат до використання',
      'Перейти до корисних гайдів без зайвого SEO-тексту',
    ],
  },
  es: {
    strengthBadge: 'Fortaleza de la contraseña',
    benefitsTitle: 'Por qué este generador resulta útil',
    benefitsIntro: 'La página principal ahora se centra en ayuda real: generación rápida, evaluación inmediata de fortaleza y siguientes pasos claros.',
    benefits: [
      { title: 'Generación local', text: 'Las contraseñas se crean en tu navegador, sin necesidad de enviarlas al servidor.' },
      { title: 'Fortaleza fácil de entender', text: 'Puedes ver al instante si la contraseña actual es débil, sólida o adecuada para cuentas importantes.' },
      { title: 'Ajustes seguros', text: 'La longitud, los conjuntos de caracteres y los ajustes predefinidos ayudan a evitar errores comunes.' },
    ],
    strengthTitle: 'Usa la comprobación de fortaleza integrada',
    strengthIntro: 'La línea de fortaleza debajo del generador te ayuda a decidir si la contraseña actual realmente merece ser usada.',
    strengthPoints: [
      'Aumenta primero la longitud si el resultado sigue siendo débil.',
      'Usa una contraseña diferente para cada cuenta.',
      'Elige NIST o PCI si necesitas una base más estricta.',
    ],
    stepsTitle: 'Un flujo simple y práctico',
    stepsIntro: 'La mayoría de las personas quiere generar una contraseña, revisarla y seguir adelante. La página principal ahora está pensada para eso.',
    steps: [
      { title: 'Genera', text: 'Elige la longitud y los caracteres necesarios, luego crea una nueva contraseña con un clic.' },
      { title: 'Verifica', text: 'Revisa la etiqueta de fortaleza y el tiempo estimado antes de copiarla.' },
      { title: 'Úsala bien', text: 'Copia la contraseña o abre una guía si necesitas contexto adicional.' },
    ],
    ctaTitle: '¿Necesitas más que una contraseña aleatoria?',
    ctaText: 'Abre la sección de guías para ver explicaciones prácticas sobre seguridad, políticas y protección de cuentas.',
    primaryCta: 'Abrir guías',
    secondaryCta: 'Contactar al equipo',
    ctaBadge: 'Siguiente paso útil',
    utilityTitle: 'Qué te ayuda a hacer esta página',
    utilityItems: [
      'Generar una contraseña rápido en móvil o escritorio',
      'Comparar ajustes personalizados con opciones más seguras',
      'Entender si el resultado actual ya es suficiente',
      'Ir a guías útiles sin pasar por texto de relleno',
    ],
  },
  fr: {
    strengthBadge: 'Solidité du mot de passe',
    benefitsTitle: 'Pourquoi ce générateur est utile',
    benefitsIntro: 'La page d’accueil met désormais l’accent sur l’utilité réelle : génération rapide, retour immédiat sur la solidité et actions claires.',
    benefits: [
      { title: 'Génération locale', text: 'Les mots de passe sont créés dans votre navigateur, sans envoi vers un serveur.' },
      { title: 'Lecture claire de la solidité', text: 'Vous voyez immédiatement si le mot de passe actuel est faible, solide ou adapté à un compte sensible.' },
      { title: 'Réglages plus sûrs', text: 'La longueur, les jeux de caractères et les préréglages aident à éviter les erreurs courantes.' },
    ],
    strengthTitle: 'Utilisez le contrôle de solidité intégré',
    strengthIntro: 'L’indicateur sous le générateur vous aide à vérifier si le mot de passe mérite réellement d’être utilisé.',
    strengthPoints: [
      'Augmentez d’abord la longueur si le résultat semble encore faible.',
      'Gardez un mot de passe unique pour chaque compte.',
      'Choisissez NIST ou PCI si vous avez besoin d’une base plus stricte.',
    ],
    stepsTitle: 'Un parcours simple et utile',
    stepsIntro: 'La plupart des visiteurs veulent générer un mot de passe, le vérifier puis continuer. La page d’accueil suit maintenant ce parcours.',
    steps: [
      { title: 'Générez', text: 'Choisissez la longueur et les caractères nécessaires, puis créez un mot de passe en un clic.' },
      { title: 'Vérifiez', text: 'Consultez le niveau de solidité et le temps estimé avant de copier le mot de passe.' },
      { title: 'Utilisez-le correctement', text: 'Copiez-le pour votre compte ou ouvrez un guide si vous avez besoin de contexte.' },
    ],
    ctaTitle: 'Besoin de plus qu’un mot de passe aléatoire ?',
    ctaText: 'Ouvrez la section des guides pour des explications pratiques sur la sécurité, les politiques et la protection des comptes.',
    primaryCta: 'Ouvrir les guides',
    secondaryCta: 'Contacter l’équipe',
    ctaBadge: 'Étape utile suivante',
    utilityTitle: 'Ce que cette page vous aide à faire',
    utilityItems: [
      'Générer rapidement un mot de passe sur mobile ou ordinateur',
      'Comparer des réglages personnalisés avec des préréglages plus solides',
      'Comprendre si le résultat actuel est prêt à l’emploi',
      'Accéder à des guides utiles sans texte de remplissage',
    ],
  },
  de: {
    strengthBadge: 'Passwortstärke',
    benefitsTitle: 'Warum dieser Generator praktisch ist',
    benefitsIntro: 'Die Startseite konzentriert sich jetzt auf echten Nutzen: schnelle Erstellung, direkte Stärkeanzeige und klare nächste Schritte.',
    benefits: [
      { title: 'Lokale Generierung', text: 'Passwörter werden direkt im Browser erstellt und nicht an einen Server gesendet.' },
      { title: 'Sofortiges Stärke-Feedback', text: 'Sie sehen sofort, ob das aktuelle Passwort schwach, stark oder für sensible Konten geeignet ist.' },
      { title: 'Sichere Voreinstellungen', text: 'Länge, Zeichensätze und Standards helfen dabei, typische Fehler zu vermeiden.' },
    ],
    strengthTitle: 'Nutzen Sie die integrierte Passwortprüfung',
    strengthIntro: 'Die Stärkeleiste unter dem Generator hilft Ihnen einzuschätzen, ob das aktuelle Passwort wirklich einsatzbereit ist.',
    strengthPoints: [
      'Erhöhen Sie zuerst die Länge, wenn das Ergebnis noch schwach wirkt.',
      'Verwenden Sie für jedes Konto ein eigenes Passwort.',
      'Wählen Sie NIST oder PCI, wenn Sie strengere Vorgaben brauchen.',
    ],
    stepsTitle: 'Ein einfacher Ablauf für echte Nutzung',
    stepsIntro: 'Die meisten Besucher wollen ein Passwort erstellen, kurz prüfen und weitergehen. Genau dafür ist die Startseite jetzt ausgelegt.',
    steps: [
      { title: 'Erstellen', text: 'Wählen Sie Länge und Zeichensätze und erzeugen Sie ein neues Passwort mit einem Klick.' },
      { title: 'Prüfen', text: 'Sehen Sie sich Stärke und geschätzte Knackzeit an, bevor Sie das Passwort kopieren.' },
      { title: 'Sicher verwenden', text: 'Kopieren Sie das Passwort oder öffnen Sie einen Leitfaden für mehr Kontext.' },
    ],
    ctaTitle: 'Sie brauchen mehr als nur ein Zufallspasswort?',
    ctaText: 'Öffnen Sie die Guides für praktische Erklärungen zu Sicherheit, Richtlinien und Kontoschutz.',
    primaryCta: 'Guides öffnen',
    secondaryCta: 'Team kontaktieren',
    ctaBadge: 'Sinnvoller nächster Schritt',
    utilityTitle: 'Wobei diese Startseite hilft',
    utilityItems: [
      'Schnell ein Passwort auf Mobilgerät oder Desktop erzeugen',
      'Eigene Einstellungen mit stärkeren Vorgaben vergleichen',
      'Erkennen, ob das aktuelle Ergebnis einsatzbereit ist',
      'Direkt zu hilfreichen Guides springen statt durch Fülltext zu scrollen',
    ],
  },
  it: {
    strengthBadge: 'Robustezza della password',
    benefitsTitle: 'Perché questo generatore è utile',
    benefitsIntro: 'La home ora punta sull’utilità reale: generazione rapida, feedback immediato sulla robustezza e passaggi chiari.',
    benefits: [
      { title: 'Generazione locale', text: 'Le password vengono create nel browser, senza inviarle a un server.' },
      { title: 'Controllo di robustezza immediato', text: 'Vedi subito se la password è debole, forte o adatta ad account importanti.' },
      { title: 'Impostazioni più sicure', text: 'Lunghezza, set di caratteri e preset aiutano a evitare errori comuni.' },
    ],
    strengthTitle: 'Usa il controllo integrato della robustezza',
    strengthIntro: 'L’indicatore sotto il generatore ti aiuta a capire se la password attuale è davvero pronta per essere usata.',
    strengthPoints: [
      'Aumenta prima la lunghezza se il risultato sembra ancora debole.',
      'Usa una password diversa per ogni account.',
      'Scegli NIST o PCI se ti serve una base più rigorosa.',
    ],
    stepsTitle: 'Un flusso semplice e pratico',
    stepsIntro: 'La maggior parte delle persone vuole generare una password, verificarla e andare avanti. La home ora segue proprio questo flusso.',
    steps: [
      { title: 'Genera', text: 'Scegli lunghezza e caratteri necessari, poi crea una nuova password con un clic.' },
      { title: 'Verifica', text: 'Controlla livello di robustezza e tempo stimato prima di copiare la password.' },
      { title: 'Usala bene', text: 'Copia la password oppure apri una guida se ti serve più contesto.' },
    ],
    ctaTitle: 'Ti serve più di una password casuale?',
    ctaText: 'Apri la sezione guide per spiegazioni pratiche su sicurezza, policy e protezione degli account.',
    primaryCta: 'Apri le guide',
    secondaryCta: 'Contatta il team',
    ctaBadge: 'Prossimo passo utile',
    utilityTitle: 'Cosa ti aiuta a fare questa home',
    utilityItems: [
      'Generare rapidamente una password da mobile o desktop',
      'Confrontare impostazioni personalizzate con preset più forti',
      'Capire se il risultato attuale è pronto all’uso',
      'Passare a guide utili senza testo riempitivo',
    ],
  },
  pt: {
    strengthBadge: 'Força da senha',
    benefitsTitle: 'Por que este gerador é útil',
    benefitsIntro: 'A página inicial agora foca no que realmente ajuda: geração rápida, feedback imediato de força e próximos passos claros.',
    benefits: [
      { title: 'Geração local', text: 'As senhas são criadas no seu navegador, sem envio para um servidor.' },
      { title: 'Força fácil de avaliar', text: 'Você vê na hora se a senha atual está fraca, forte ou pronta para contas mais sensíveis.' },
      { title: 'Configurações mais seguras', text: 'Comprimento, conjuntos de caracteres e presets ajudam a evitar erros comuns.' },
    ],
    strengthTitle: 'Use a verificação integrada de força',
    strengthIntro: 'A linha de força abaixo do gerador ajuda a decidir se a senha atual realmente está pronta para uso.',
    strengthPoints: [
      'Aumente primeiro o comprimento se o resultado ainda parecer fraco.',
      'Use uma senha única para cada conta.',
      'Escolha NIST ou PCI se precisar de uma base mais rígida.',
    ],
    stepsTitle: 'Um fluxo simples e útil',
    stepsIntro: 'A maioria das pessoas quer gerar uma senha, verificar e seguir em frente. A página inicial agora apoia exatamente isso.',
    steps: [
      { title: 'Gerar', text: 'Escolha comprimento e caracteres necessários, depois crie uma nova senha com um clique.' },
      { title: 'Verificar', text: 'Veja a força e o tempo estimado antes de copiar a senha.' },
      { title: 'Usar com segurança', text: 'Copie a senha ou abra um guia se precisar de mais contexto.' },
    ],
    ctaTitle: 'Precisa de mais do que uma senha aleatória?',
    ctaText: 'Abra a seção de guias para ver explicações práticas sobre segurança, políticas e proteção de contas.',
    primaryCta: 'Abrir guias',
    secondaryCta: 'Falar com a equipe',
    ctaBadge: 'Próximo passo útil',
    utilityTitle: 'O que esta página ajuda você a fazer',
    utilityItems: [
      'Gerar uma senha rápido no celular ou desktop',
      'Comparar configurações personalizadas com presets mais fortes',
      'Entender se o resultado atual já está pronto',
      'Ir para guias úteis sem texto de enchimento',
    ],
  },
  ru: {
    strengthBadge: 'Надёжность пароля',
    benefitsTitle: 'Почему этим генератором удобно пользоваться',
    benefitsIntro: 'Главная страница теперь сосредоточена на реальной пользе: быстрая генерация, мгновенная оценка надёжности и понятные следующие шаги.',
    benefits: [
      { title: 'Локальная генерация', text: 'Пароли создаются прямо в браузере, без отправки на сервер.' },
      { title: 'Понятная проверка надёжности', text: 'Вы сразу видите, слабый пароль, достаточно сильный или подходит для важных аккаунтов.' },
      { title: 'Безопасные настройки по умолчанию', text: 'Длина, наборы символов и пресеты помогают избегать типичных ошибок.' },
    ],
    strengthTitle: 'Используйте встроенную проверку надёжности',
    strengthIntro: 'Строка надёжности под генератором помогает понять, готов ли текущий пароль к реальному использованию.',
    strengthPoints: [
      'Сначала увеличивайте длину, если результат всё ещё кажется слабым.',
      'Используйте уникальный пароль для каждого аккаунта.',
      'Выберите NIST или PCI, если нужна более строгая база.',
    ],
    stepsTitle: 'Простой сценарий для реального использования',
    stepsIntro: 'Большинство пользователей хочет быстро создать пароль, проверить его и продолжить работу. Главная страница теперь поддерживает именно этот сценарий.',
    steps: [
      { title: 'Сгенерируйте', text: 'Выберите длину и нужные наборы символов, затем создайте пароль одним нажатием.' },
      { title: 'Проверьте', text: 'Посмотрите на уровень надёжности и примерное время взлома перед копированием.' },
      { title: 'Используйте безопасно', text: 'Скопируйте пароль или откройте гайд, если нужен дополнительный контекст.' },
    ],
    ctaTitle: 'Нужно больше, чем случайный пароль?',
    ctaText: 'Откройте раздел гайдов с практическими материалами по безопасности, политикам и защите аккаунтов.',
    primaryCta: 'Открыть гайды',
    secondaryCta: 'Связаться с командой',
    ctaBadge: 'Полезный следующий шаг',
    utilityTitle: 'Чем помогает эта главная страница',
    utilityItems: [
      'Быстро создать пароль на телефоне или компьютере',
      'Сравнить свои настройки с более сильными пресетами',
      'Понять, готов ли текущий результат к использованию',
      'Перейти к полезным гайдам без лишнего SEO-текста',
    ],
  },
  zh: {
    strengthBadge: '密码强度',
    benefitsTitle: '为什么这个生成器更实用',
    benefitsIntro: '首页现在更注重实际帮助：快速生成、即时强度反馈，以及清晰的下一步操作。',
    benefits: [
      { title: '本地生成', text: '密码直接在浏览器中生成，无需发送到服务器。' },
      { title: '强度反馈直观', text: '你可以立刻看到当前密码是否偏弱、足够强，或适合重要账户。' },
      { title: '更安全的默认设置', text: '长度、字符集和预设选项可帮助避免常见错误。' },
    ],
    strengthTitle: '使用内置密码强度检查',
    strengthIntro: '生成器下方的强度提示可以帮助你判断当前密码是否真的适合使用。',
    strengthPoints: [
      '如果结果仍然偏弱，先增加长度。',
      '每个账户都应使用不同的密码。',
      '如果需要更严格的基线，可选择 NIST 或 PCI 预设。',
    ],
    stepsTitle: '贴近真实使用场景的简单流程',
    stepsIntro: '大多数用户只想快速生成密码、检查一下，然后继续操作。现在的首页就是围绕这个流程设计的。',
    steps: [
      { title: '生成', text: '选择长度和所需字符集，然后一键生成新密码。' },
      { title: '检查', text: '复制前先查看强度标签和预计破解时间。' },
      { title: '安全使用', text: '可以直接复制使用，或者打开指南了解更多背景说明。' },
    ],
    ctaTitle: '你需要的不只是随机密码？',
    ctaText: '打开指南栏目，查看关于密码安全、策略和账户保护的实用内容。',
    primaryCta: '打开指南',
    secondaryCta: '联系团队',
    ctaBadge: '推荐下一步',
    utilityTitle: '这个首页能帮你完成什么',
    utilityItems: [
      '在手机或桌面端快速生成密码',
      '比较自定义设置和更强的预设方案',
      '判断当前结果是否已经可用',
      '无需阅读冗长填充内容就能进入实用指南',
    ],
  },
  ja: {
    strengthBadge: 'パスワード強度',
    benefitsTitle: 'このジェネレーターが使いやすい理由',
    benefitsIntro: 'トップページは、すぐ使える価値に集中しています。高速生成、即時の強度確認、次の行動が分かりやすくなりました。',
    benefits: [
      { title: 'ローカル生成', text: 'パスワードはブラウザ内で生成され、サーバーへ送信されません。' },
      { title: '強度をすぐ確認', text: '現在のパスワードが弱いか、十分強いか、重要なアカウント向けかをすぐ把握できます。' },
      { title: '安全な初期設定', text: '長さ、文字セット、プリセットにより、よくある失敗を避けやすくなります。' },
    ],
    strengthTitle: '内蔵の強度チェックを活用してください',
    strengthIntro: 'ジェネレーター下の強度表示は、現在のパスワードが本当に使えるかを判断する助けになります。',
    strengthPoints: [
      'まだ弱く見える場合は、まず文字数を増やしてください。',
      'アカウントごとに別のパスワードを使ってください。',
      'より厳しい基準が必要なら NIST または PCI を選んでください。',
    ],
    stepsTitle: '実際の使い方に合ったシンプルな流れ',
    stepsIntro: '多くの訪問者は、パスワードを作成し、確認して、すぐ使いたいだけです。トップページはその流れを支えます。',
    steps: [
      { title: '生成する', text: '必要な長さと文字セットを選び、ワンクリックで新しいパスワードを作成します。' },
      { title: '確認する', text: 'コピーする前に強度ラベルと推定時間を確認します。' },
      { title: '安全に使う', text: 'そのままコピーするか、必要に応じてガイドで背景知識を確認します。' },
    ],
    ctaTitle: 'ランダムなパスワード以上のものが必要ですか？',
    ctaText: 'ガイドセクションでは、セキュリティ、ポリシー、アカウント保護に関する実践的な説明を読めます。',
    primaryCta: 'ガイドを見る',
    secondaryCta: 'チームに連絡',
    ctaBadge: '役立つ次のステップ',
    utilityTitle: 'このトップページでできること',
    utilityItems: [
      'モバイルやデスクトップですばやくパスワードを生成する',
      'カスタム設定をより強いプリセットと比較する',
      '現在の結果がそのまま使えるか判断する',
      '長い埋め草テキストなしで役立つガイドへ進む',
    ],
  },
  pl: {
    strengthBadge: 'Siła hasła',
    benefitsTitle: 'Dlaczego ten generator jest praktyczny',
    benefitsIntro: 'Strona główna skupia się teraz na realnej pomocy: szybkim generowaniu, natychmiastowej ocenie siły i jasnych kolejnych krokach.',
    benefits: [
      { title: 'Generowanie lokalne', text: 'Hasła powstają w przeglądarce, bez wysyłania ich na serwer.' },
      { title: 'Czytelna ocena siły', text: 'Od razu widać, czy hasło jest słabe, mocne albo nadaje się do ważnych kont.' },
      { title: 'Bezpieczniejsze ustawienia', text: 'Długość, zestawy znaków i presety pomagają unikać typowych błędów.' },
    ],
    strengthTitle: 'Korzystaj z wbudowanej oceny siły hasła',
    strengthIntro: 'Wskaźnik pod generatorem pomaga ocenić, czy aktualne hasło naprawdę nadaje się do użycia.',
    strengthPoints: [
      'Najpierw zwiększ długość, jeśli wynik nadal wygląda słabo.',
      'Używaj innego hasła dla każdego konta.',
      'Wybierz NIST lub PCI, jeśli potrzebujesz bardziej rygorystycznej bazy.',
    ],
    stepsTitle: 'Prosty schemat zgodny z realnym użyciem',
    stepsIntro: 'Większość osób chce wygenerować hasło, szybko je sprawdzić i iść dalej. Strona główna wspiera teraz właśnie taki scenariusz.',
    steps: [
      { title: 'Generuj', text: 'Wybierz długość i potrzebne znaki, a następnie utwórz nowe hasło jednym kliknięciem.' },
      { title: 'Sprawdź', text: 'Zobacz poziom siły i szacowany czas przed skopiowaniem hasła.' },
      { title: 'Użyj bezpiecznie', text: 'Skopiuj hasło albo otwórz poradnik, jeśli potrzebujesz dodatkowego kontekstu.' },
    ],
    ctaTitle: 'Potrzebujesz czegoś więcej niż losowego hasła?',
    ctaText: 'Otwórz sekcję poradników z praktycznymi materiałami o bezpieczeństwie, politykach i ochronie kont.',
    primaryCta: 'Otwórz poradniki',
    secondaryCta: 'Skontaktuj się z zespołem',
    ctaBadge: 'Przydatny następny krok',
    utilityTitle: 'W czym pomaga ta strona główna',
    utilityItems: [
      'Szybko wygenerować hasło na telefonie lub komputerze',
      'Porównać własne ustawienia z mocniejszymi presetami',
      'Sprawdzić, czy obecny wynik nadaje się do użycia',
      'Przejść do przydatnych poradników bez przewijania zapychającego tekstu',
    ],
  },
};

const iconMap = [ShieldCheck, Gauge, Wand2] as const;

export default function HomePageSections({ language }: { language: string }) {
  const locale = normalizeLocale(language) as LocaleKey;
  const copy = COPY[locale] || COPY.en;
  const guidesHref = `/${locale}/guides`;
  const contactHref = `/${locale}/contact`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-12 space-y-8">
      <section className="rounded-[32px] border border-[#D9ECFF] dark:border-[#243447] bg-white dark:bg-[#171717] p-6 md:p-8 shadow-sm">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#071016] dark:text-[#e0e0e0]">{copy.benefitsTitle}</h2>
          <p className="mt-3 text-[16px] md:text-[18px] leading-7 text-[#425466] dark:text-[#c7c7c7]">{copy.benefitsIntro}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {copy.benefits.map((item, index) => {
            const Icon = iconMap[index];
            return (
              <article
                key={item.title}
                className="rounded-[24px] border border-[#E5F6FF] dark:border-[#2b3645] bg-[#F8FCFF] dark:bg-[#10161d] p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DFF2FB] dark:bg-[#17324a] text-[#2A4E63] dark:text-[#9bdfff]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#071016] dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#425466] dark:text-[#c7c7c7]">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <article className="rounded-[32px] border border-[#D9ECFF] dark:border-[#243447] bg-gradient-to-br from-[#F5FBFF] to-[#EAF7FF] dark:from-[#10161d] dark:to-[#0b2234] p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-[#09141f] px-3 py-1 text-sm font-medium text-[#2A4E63] dark:text-[#9bdfff]">
            <Gauge size={16} />
            {copy.strengthBadge}
          </div>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-[#071016] dark:text-white">{copy.strengthTitle}</h2>
          <p className="mt-3 text-[16px] md:text-[18px] leading-7 text-[#425466] dark:text-[#c7c7c7]">{copy.strengthIntro}</p>
          <ul className="mt-5 space-y-3">
            {copy.strengthPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm md:text-base leading-6 text-[#213547] dark:text-[#d7e4ef]">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#2A4E63] dark:text-[#7dd3fc]" size={18} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[32px] border border-[#D9ECFF] dark:border-[#243447] bg-white dark:bg-[#171717] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#071016] dark:text-white">{copy.utilityTitle}</h2>
          <ul className="mt-5 space-y-4">
            {copy.utilityItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm md:text-base leading-6 text-[#425466] dark:text-[#c7c7c7]">
                <ArrowRight className="mt-0.5 shrink-0 text-[#2A4E63] dark:text-[#9bdfff]" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-[32px] border border-[#D9ECFF] dark:border-[#243447] bg-white dark:bg-[#171717] p-6 md:p-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#071016] dark:text-white">{copy.stepsTitle}</h2>
          <p className="mt-3 text-[16px] md:text-[18px] leading-7 text-[#425466] dark:text-[#c7c7c7]">{copy.stepsIntro}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {copy.steps.map((step, index) => (
            <article key={step.title} className="rounded-[24px] border border-[#E5F6FF] dark:border-[#2b3645] bg-[#F8FCFF] dark:bg-[#10161d] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2A4E63] text-white dark:bg-[#9bdfff] dark:text-[#0b2234] font-semibold">
                {index + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#071016] dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#425466] dark:text-[#c7c7c7]">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-[#cfe7fb] dark:border-[#27445a] bg-[#2A4E63] dark:bg-[#0d2638] p-6 md:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-[#d9f2ff]">
              <BookOpen size={16} />
              {copy.ctaBadge}
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold">{copy.ctaTitle}</h2>
            <p className="mt-3 text-[16px] md:text-[18px] leading-7 text-[#d9ecf5]">{copy.ctaText}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={guidesHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#16394a] transition hover:bg-[#eaf7ff]"
            >
              {copy.primaryCta}
            </Link>
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {copy.secondaryCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export type ContactFaq = {
  question: string;
  answer: string;
};

export type ContactCopy = {
  intro: string;
  before: string;
  faq: ContactFaq[];
};

/** Contact page body, kept separate from the form labels in static-pages-i18n. */
export const CONTACT_COPY: Record<string, ContactCopy> = {
  en: {
    intro:
      'Use this page for questions about the generator, privacy, content corrections, partnership requests, or security reports. We read every message and usually reply within 1–3 business days. Please do not include real passwords, recovery codes, or other secrets.',
    before:
      'To help us answer faster, include the page URL, your browser and device, and the steps that led to the issue. For security reports, describe the impact and how to reproduce it without sharing live credentials.',
    faq: [
      {
        question: 'Is the generator free?',
        answer:
          'Yes. There is no account, no paywall, and no limit on how many passwords you generate.',
      },
      {
        question: 'Do you store generated passwords?',
        answer:
          'No. Passwords are created in your browser and never sent to our servers. We cannot recover a password for you.',
      },
      {
        question: 'How do I report a security issue?',
        answer:
          'Email support@generatepasswordto.me with the affected page, the impact, and reproduction steps. Do not include real credentials; use test data.',
      },
      {
        question: 'How do I request deletion of my data?',
        answer:
          'Email us from the address you used. We delete support messages and associated metadata unless we must keep them for legal or security reasons.',
      },
      {
        question: 'Can I embed the generator on my site?',
        answer:
          'The code is not licensed for redistribution or embedding without written permission. Link to the site instead.',
      },
      {
        question: 'Why do you show ads?',
        answer:
          'Advertising funds hosting and content. Ads are optional: they load only with marketing consent and never affect the generated passwords.',
      },
    ],
  },
  ua: {
    intro:
      'Ця сторінка для питань про генератор, приватність, виправлення контенту, партнерство або повідомлень про вразливості. Ми читаємо кожне повідомлення і зазвичай відповідаємо протягом 1–3 робочих днів. Будь ласка, не надсилайте справжні паролі, коди відновлення чи інші секрети.',
    before:
      'Щоб ми відповіли швидше, вкажіть URL сторінки, браузер і пристрій, а також кроки, які привели до проблеми. Для звітів про безпеку опишіть вплив і спосіб відтворення без реальних облікових даних.',
    faq: [
      {
        question: 'Генератор безкоштовний?',
        answer:
          'Так. Акаунт не потрібен, платного доступу немає, і кількість згенерованих паролів не обмежена.',
      },
      {
        question: 'Ви зберігаєте згенеровані паролі?',
        answer:
          'Ні. Паролі створюються у вашому браузері й не надсилаються на сервер. Ми не можемо відновити пароль за вас.',
      },
      {
        question: 'Як повідомити про вразливість?',
        answer:
          'Напишіть на support@generatepasswordto.me: постраждала сторінка, вплив і кроки відтворення. Не додавайте справжні облікові дані, використовуйте тестові.',
      },
      {
        question: 'Як запросити видалення моїх даних?',
        answer:
          'Напишіть з адреси, яку використовували. Ми видалимо повідомлення підтримки та пов’язані метадані, якщо їх не потрібно зберігати з юридичних чи безпекових причин.',
      },
      {
        question: 'Чи можна вбудувати генератор на свій сайт?',
        answer:
          'Код не ліцензовано для розповсюдження чи вбудовування без письмового дозволу. Натомість поставте посилання на сайт.',
      },
      {
        question: 'Чому на сайті є реклама?',
        answer:
          'Реклама фінансує хостинг і контент. Вона необов’язкова: вантажиться лише зі згодою на маркетинг і не впливає на згенеровані паролі.',
      },
    ],
  },
  ru: {
    intro:
      'Эта страница для вопросов о генераторе, приватности, исправлений контента, партнёрства или сообщений об уязвимостях. Мы читаем каждое сообщение и обычно отвечаем в течение 1–3 рабочих дней. Пожалуйста, не присылайте настоящие пароли, коды восстановления или другие секреты.',
    before:
      'Чтобы мы ответили быстрее, укажите URL страницы, браузер и устройство, а также шаги, которые привели к проблеме. Для отчётов о безопасности опишите влияние и способ воспроизведения без реальных учётных данных.',
    faq: [
      {
        question: 'Генератор бесплатный?',
        answer:
          'Да. Аккаунт не нужен, платного доступа нет, и количество сгенерированных паролей не ограничено.',
      },
      {
        question: 'Вы храните сгенерированные пароли?',
        answer:
          'Нет. Пароли создаются в вашем браузере и не отправляются на сервер. Мы не можем восстановить пароль за вас.',
      },
      {
        question: 'Как сообщить об уязвимости?',
        answer:
          'Напишите на support@generatepasswordto.me: затронутая страница, влияние и шаги воспроизведения. Не прикладывайте реальные учётные данные, используйте тестовые.',
      },
      {
        question: 'Как запросить удаление моих данных?',
        answer:
          'Напишите с адреса, который использовали. Мы удалим сообщения поддержки и связанные метаданные, если их не нужно хранить по юридическим или безопасности причинам.',
      },
      {
        question: 'Можно ли встроить генератор на свой сайт?',
        answer:
          'Код не лицензирован для распространения или встраивания без письменного разрешения. Вместо этого поставьте ссылку на сайт.',
      },
      {
        question: 'Почему на сайте есть реклама?',
        answer:
          'Реклама финансирует хостинг и контент. Она необязательна: загружается только с согласием на маркетинг и не влияет на сгенерированные пароли.',
      },
    ],
  },
  es: {
    intro:
      'Usa esta página para preguntas sobre el generador, privacidad, correcciones de contenido, colaboraciones o informes de seguridad. Leemos todos los mensajes y solemos responder en 1–3 días hábiles. No incluyas contraseñas reales, códigos de recuperación ni otros secretos.',
    before:
      'Para ayudarnos a responder más rápido, incluye la URL, tu navegador y dispositivo, y los pasos que provocaron el problema. En informes de seguridad, describe el impacto y cómo reproducirlo sin compartir credenciales reales.',
    faq: [
      {
        question: '¿El generador es gratuito?',
        answer:
          'Sí. No hay cuenta, ni pago, ni límite en la cantidad de contraseñas que generas.',
      },
      {
        question: '¿Guardáis las contraseñas generadas?',
        answer:
          'No. Se crean en tu navegador y nunca se envían a nuestros servidores. No podemos recuperar una contraseña por ti.',
      },
      {
        question: '¿Cómo informo de un problema de seguridad?',
        answer:
          'Escribe a support@generatepasswordto.me con la página afectada, el impacto y los pasos de reproducción. No incluyas credenciales reales; usa datos de prueba.',
      },
      {
        question: '¿Cómo solicito la eliminación de mis datos?',
        answer:
          'Escríbenos desde la dirección que usaste. Eliminamos los mensajes de soporte y sus metadatos salvo que debamos conservarlos por motivos legales o de seguridad.',
      },
      {
        question: '¿Puedo incrustar el generador en mi web?',
        answer:
          'El código no está licenciado para redistribución ni incrustación sin permiso escrito. Enlaza al sitio en su lugar.',
      },
      {
        question: '¿Por qué mostráis anuncios?',
        answer:
          'La publicidad financia el alojamiento y el contenido. Es opcional: solo se carga con consentimiento de marketing y nunca afecta a las contraseñas.',
      },
    ],
  },
  fr: {
    intro:
      'Cette page concerne les questions sur le générateur, la confidentialité, les corrections de contenu, les partenariats ou les signalements de sécurité. Nous lisons chaque message et répondons généralement sous 1 à 3 jours ouvrés. N’incluez pas de mots de passe réels, de codes de récupération ni d’autres secrets.',
    before:
      'Pour nous aider à répondre plus vite, indiquez l’URL, votre navigateur et appareil, ainsi que les étapes du problème. Pour un signalement de sécurité, décrivez l’impact et la reproduction sans partager d’identifiants réels.',
    faq: [
      {
        question: 'Le générateur est-il gratuit ?',
        answer:
          'Oui. Aucun compte, aucun paiement et aucune limite sur le nombre de mots de passe générés.',
      },
      {
        question: 'Stockez-vous les mots de passe générés ?',
        answer:
          'Non. Ils sont créés dans votre navigateur et ne sont jamais envoyés à nos serveurs. Nous ne pouvons pas récupérer un mot de passe pour vous.',
      },
      {
        question: 'Comment signaler un problème de sécurité ?',
        answer:
          'Écrivez à support@generatepasswordto.me avec la page concernée, l’impact et les étapes de reproduction. N’incluez pas d’identifiants réels ; utilisez des données de test.',
      },
      {
        question: 'Comment demander la suppression de mes données ?',
        answer:
          'Écrivez-nous depuis l’adresse utilisée. Nous supprimons les messages de support et les métadonnées associées, sauf obligation légale ou de sécurité.',
      },
      {
        question: 'Puis-je intégrer le générateur à mon site ?',
        answer:
          'Le code n’est pas sous licence pour la redistribution ou l’intégration sans autorisation écrite. Créez plutôt un lien vers le site.',
      },
      {
        question: 'Pourquoi affichez-vous des publicités ?',
        answer:
          'La publicité finance l’hébergement et le contenu. Elle est facultative : chargée uniquement avec le consentement marketing et sans effet sur les mots de passe.',
      },
    ],
  },
  de: {
    intro:
      'Diese Seite ist für Fragen zum Generator, Datenschutz, Inhaltskorrekturen, Partnerschaften oder Sicherheitsmeldungen. Wir lesen jede Nachricht und antworten in der Regel innerhalb von 1–3 Werktagen. Bitte senden Sie keine echten Passwörter, Wiederherstellungscodes oder andere Geheimnisse.',
    before:
      'Damit wir schneller antworten können, nennen Sie die URL, Browser und Gerät sowie die Schritte zum Problem. Bei Sicherheitsmeldungen beschreiben Sie Auswirkung und Reproduktion ohne echte Zugangsdaten.',
    faq: [
      {
        question: 'Ist der Generator kostenlos?',
        answer:
          'Ja. Es gibt kein Konto, keine Bezahlschranke und keine Begrenzung der generierten Passwörter.',
      },
      {
        question: 'Speichern Sie generierte Passwörter?',
        answer:
          'Nein. Passwörter entstehen in Ihrem Browser und werden nie an unsere Server gesendet. Wir können sie nicht wiederherstellen.',
      },
      {
        question: 'Wie melde ich ein Sicherheitsproblem?',
        answer:
          'Schreiben Sie an support@generatepasswordto.me mit betroffener Seite, Auswirkung und Reproduktionsschritten. Keine echten Zugangsdaten, bitte Testdaten verwenden.',
      },
      {
        question: 'Wie beantrage ich die Löschung meiner Daten?',
        answer:
          'Schreiben Sie von der verwendeten Adresse. Wir löschen Support-Nachrichten und zugehörige Metadaten, sofern keine rechtlichen oder sicherheitsrelevanten Gründe entgegenstehen.',
      },
      {
        question: 'Darf ich den Generator einbetten?',
        answer:
          'Der Code darf ohne schriftliche Erlaubnis weder weitergegeben noch eingebettet werden. Verlinken Sie stattdessen auf die Website.',
      },
      {
        question: 'Warum zeigen Sie Werbung?',
        answer:
          'Werbung finanziert Hosting und Inhalte. Sie ist optional: Sie lädt nur mit Marketing-Einwilligung und beeinflusst die Passwörter nicht.',
      },
    ],
  },
  it: {
    intro:
      'Questa pagina è per domande sul generatore, privacy, correzioni di contenuto, partnership o segnalazioni di sicurezza. Leggiamo ogni messaggio e di solito rispondiamo entro 1–3 giorni lavorativi. Non includere password reali, codici di recupero o altri segreti.',
    before:
      'Per aiutarci a rispondere più in fretta, indica l’URL, browser e dispositivo e i passaggi che hanno causato il problema. Per la sicurezza, descrivi impatto e riproduzione senza credenziali reali.',
    faq: [
      {
        question: 'Il generatore è gratuito?',
        answer:
          'Sì. Non serve un account, non c’è paywall e non c’è limite alle password generate.',
      },
      {
        question: 'Memorizzate le password generate?',
        answer:
          'No. Vengono create nel browser e non vengono mai inviate ai nostri server. Non possiamo recuperarle per te.',
      },
      {
        question: 'Come segnalo un problema di sicurezza?',
        answer:
          'Scrivi a support@generatepasswordto.me con pagina interessata, impatto e passaggi di riproduzione. Non includere credenziali reali; usa dati di test.',
      },
      {
        question: 'Come chiedo la cancellazione dei miei dati?',
        answer:
          'Scrivici dall’indirizzo usato. Eliminiamo i messaggi di supporto e i metadati associati salvo obblighi legali o di sicurezza.',
      },
      {
        question: 'Posso incorporare il generatore nel mio sito?',
        answer:
          'Il codice non è concesso in licenza per ridistribuzione o incorporamento senza permesso scritto. Meglio inserire un link al sito.',
      },
      {
        question: 'Perché mostrate pubblicità?',
        answer:
          'La pubblicità finanzia hosting e contenuti. È facoltativa: si carica solo con consenso marketing e non influisce sulle password.',
      },
    ],
  },
  pt: {
    intro:
      'Esta página é para dúvidas sobre o gerador, privacidade, correções de conteúdo, parcerias ou relatos de segurança. Lemos todas as mensagens e costumamos responder em 1–3 dias úteis. Não inclua senhas reais, códigos de recuperação ou outros segredos.',
    before:
      'Para ajudar na resposta, inclua a URL, navegador e dispositivo, e os passos que levaram ao problema. Em relatos de segurança, descreva o impacto e a reprodução sem compartilhar credenciais reais.',
    faq: [
      {
        question: 'O gerador é gratuito?',
        answer:
          'Sim. Não há conta, pagamento nem limite de senhas geradas.',
      },
      {
        question: 'Vocês armazenam as senhas geradas?',
        answer:
          'Não. Elas são criadas no navegador e nunca enviadas aos nossos servidores. Não podemos recuperar uma senha por você.',
      },
      {
        question: 'Como relatar um problema de segurança?',
        answer:
          'Escreva para support@generatepasswordto.me com a página afetada, o impacto e os passos de reprodução. Não inclua credenciais reais; use dados de teste.',
      },
      {
        question: 'Como solicitar a exclusão dos meus dados?',
        answer:
          'Escreva do endereço usado. Excluímos mensagens de suporte e metadados associados, salvo obrigação legal ou de segurança.',
      },
      {
        question: 'Posso incorporar o gerador no meu site?',
        answer:
          'O código não é licenciado para redistribuição ou incorporação sem permissão escrita. Prefira linkar para o site.',
      },
      {
        question: 'Por que vocês mostram anúncios?',
        answer:
          'A publicidade financia hospedagem e conteúdo. É opcional: carrega apenas com consentimento de marketing e não afeta as senhas.',
      },
    ],
  },
  pl: {
    intro:
      'Ta strona służy do pytań o generator, prywatność, poprawki treści, współpracę lub zgłoszenia bezpieczeństwa. Czytamy każdą wiadomość i zwykle odpowiadamy w ciągu 1–3 dni roboczych. Nie przesyłaj prawdziwych haseł, kodów odzyskiwania ani innych sekretów.',
    before:
      'Abyśmy odpowiedzieli szybciej, podaj URL strony, przeglądarkę i urządzenie oraz kroki prowadzące do problemu. W zgłoszeniach bezpieczeństwa opisz wpływ i sposób odtworzenia bez prawdziwych danych logowania.',
    faq: [
      {
        question: 'Czy generator jest darmowy?',
        answer:
          'Tak. Nie ma konta, płatności ani limitu liczby generowanych haseł.',
      },
      {
        question: 'Czy przechowujecie wygenerowane hasła?',
        answer:
          'Nie. Hasła powstają w przeglądarce i nie są wysyłane na nasze serwery. Nie możemy ich odzyskać.',
      },
      {
        question: 'Jak zgłosić problem bezpieczeństwa?',
        answer:
          'Napisz na support@generatepasswordto.me, podając stronę, wpływ i kroki odtworzenia. Nie dołączaj prawdziwych danych logowania; użyj testowych.',
      },
      {
        question: 'Jak poprosić o usunięcie moich danych?',
        answer:
          'Napisz z używanego adresu. Usuniemy wiadomości pomocy technicznej i powiązane metadane, chyba że musimy je zachować z powodów prawnych lub bezpieczeństwa.',
      },
      {
        question: 'Czy mogę osadzić generator na swojej stronie?',
        answer:
          'Kod nie jest licencjonowany do redystrybucji ani osadzania bez pisemnej zgody. Zamiast tego dodaj link do strony.',
      },
      {
        question: 'Dlaczego wyświetlacie reklamy?',
        answer:
          'Reklamy finansują hosting i treści. Są opcjonalne: ładują się tylko po zgodzie na marketing i nie wpływają na hasła.',
      },
    ],
  },
  zh: {
    intro:
      '本页用于咨询生成器、隐私、内容更正、合作或报告安全问题。我们会阅读每一条消息，通常在 1–3 个工作日内回复。请勿发送真实密码、恢复码或其他机密信息。',
    before:
      '为帮助我们更快回复，请提供页面 URL、浏览器和设备，以及导致问题的步骤。安全报告请描述影响和复现方法，不要提供真实凭据。',
    faq: [
      {
        question: '生成器免费吗？',
        answer: '是的。无需账户、无需付费，生成密码的数量没有限制。',
      },
      {
        question: '你们会存储生成的密码吗？',
        answer:
          '不会。密码在您的浏览器中生成，绝不会发送到我们的服务器。我们无法为您找回密码。',
      },
      {
        question: '如何报告安全问题？',
        answer:
          '请发送邮件至 support@generatepasswordto.me，说明受影响的页面、影响和复现步骤。请勿包含真实凭据，使用测试数据。',
      },
      {
        question: '如何申请删除我的数据？',
        answer:
          '请使用您联系过的邮箱写信。除非因法律或安全原因必须保留，我们会删除支持消息及相关元数据。',
      },
      {
        question: '我可以把生成器嵌入自己的网站吗？',
        answer:
          '未经书面许可，代码不得再分发或嵌入。请改为链接到本站。',
      },
      {
        question: '为什么显示广告？',
        answer:
          '广告用于支付托管和内容成本。广告是可选的：仅在您同意营销后加载，且不会影响生成的密码。',
      },
    ],
  },
  ja: {
    intro:
      'このページは、生成ツール、プライバシー、内容の訂正、提携、セキュリティ報告に関するお問い合わせ用です。すべてのメッセージを読み、通常 1〜3 営業日以内に返信します。実際のパスワード、復旧コード、その他の秘密情報は送らないでください。',
    before:
      '迅速に回答するため、ページの URL、ブラウザと端末、問題に至った手順をお知らせください。セキュリティ報告では、実際の認証情報を含めず、影響と再現方法を記載してください。',
    faq: [
      {
        question: '生成ツールは無料ですか？',
        answer: 'はい。アカウントも支払いも不要で、生成回数に制限はありません。',
      },
      {
        question: '生成したパスワードは保存されますか？',
        answer:
          'いいえ。パスワードはブラウザ内で生成され、当社のサーバーには送信されません。復元することもできません。',
      },
      {
        question: 'セキュリティ問題はどう報告しますか？',
        answer:
          'support@generatepasswordto.me に、影響を受けるページ、影響、再現手順を添えてご連絡ください。実際の認証情報は含めず、テストデータを使用してください。',
      },
      {
        question: '自分のデータの削除はどう申請しますか？',
        answer:
          '使用したメールアドレスからご連絡ください。法的またはセキュリティ上の理由で保持する必要がある場合を除き、サポートメッセージと関連メタデータを削除します。',
      },
      {
        question: '生成ツールを自分のサイトに埋め込めますか？',
        answer:
          '書面による許可なく、コードの再配布や埋め込みはできません。サイトへのリンクをご利用ください。',
      },
      {
        question: 'なぜ広告が表示されるのですか？',
        answer:
          '広告はホスティングとコンテンツの費用を賄います。任意であり、マーケティングへの同意がある場合のみ読み込まれ、パスワードには影響しません。',
      },
    ],
  },
  vi: {
    intro:
      'Trang này dành cho câu hỏi về công cụ tạo mật khẩu, quyền riêng tư, chỉnh sửa nội dung, hợp tác hoặc báo cáo bảo mật. Chúng tôi đọc mọi tin nhắn và thường trả lời trong 1–3 ngày làm việc. Vui lòng không gửi mật khẩu thật, mã khôi phục hoặc bí mật khác.',
    before:
      'Để chúng tôi trả lời nhanh hơn, hãy nêu URL, trình duyệt và thiết bị, cùng các bước dẫn đến sự cố. Với báo cáo bảo mật, mô tả tác động và cách tái hiện mà không chia sẻ thông tin đăng nhập thật.',
    faq: [
      {
        question: 'Công cụ có miễn phí không?',
        answer:
          'Có. Không cần tài khoản, không trả phí và không giới hạn số mật khẩu được tạo.',
      },
      {
        question: 'Các bạn có lưu mật khẩu đã tạo không?',
        answer:
          'Không. Mật khẩu được tạo trong trình duyệt và không bao giờ gửi đến máy chủ. Chúng tôi không thể khôi phục mật khẩu cho bạn.',
      },
      {
        question: 'Làm sao báo cáo sự cố bảo mật?',
        answer:
          'Gửi email đến support@generatepasswordto.me với trang bị ảnh hưởng, tác động và các bước tái hiện. Không kèm thông tin đăng nhập thật; hãy dùng dữ liệu thử nghiệm.',
      },
      {
        question: 'Làm sao yêu cầu xóa dữ liệu của tôi?',
        answer:
          'Hãy viết từ địa chỉ bạn đã dùng. Chúng tôi xóa tin nhắn hỗ trợ và siêu dữ liệu liên quan trừ khi phải giữ vì lý do pháp lý hoặc bảo mật.',
      },
      {
        question: 'Tôi có thể nhúng công cụ vào trang của mình không?',
        answer:
          'Mã không được cấp phép để phân phối lại hoặc nhúng nếu không có sự cho phép bằng văn bản. Hãy liên kết đến trang thay vì nhúng.',
      },
      {
        question: 'Vì sao có quảng cáo?',
        answer:
          'Quảng cáo chi trả chi phí lưu trữ và nội dung. Quảng cáo là tùy chọn: chỉ tải khi bạn đồng ý tiếp thị và không ảnh hưởng đến mật khẩu.',
      },
    ],
  },
};

export const FAQ_TITLE: Record<string, string> = {
  en: 'Frequently asked questions',
  ua: 'Часті запитання',
  ru: 'Частые вопросы',
  es: 'Preguntas frecuentes',
  fr: 'Questions fréquentes',
  de: 'Häufige Fragen',
  it: 'Domande frequenti',
  pt: 'Perguntas frequentes',
  pl: 'Najczęściej zadawane pytania',
  zh: '常见问题',
  ja: 'よくある質問',
  vi: 'Câu hỏi thường gặp',
};

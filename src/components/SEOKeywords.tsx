interface SEOKeywordsProps {
  language: string;
  className?: string;
}

const naturalTextByLang: Record<string, string> = {
  en: 'Our generator uses cryptographic randomness to create passwords that resist brute-force attacks. Each password is built entirely in your browser — nothing is sent to a server.',
  ua: 'Наш генератор використовує криптографічну випадковість для створення паролів, стійких до атак перебору. Кожен пароль створюється безпосередньо у вашому браузері — нічого не надсилається на сервер.',
  es: 'Nuestro generador utiliza aleatoriedad criptográfica para crear contraseñas resistentes a ataques de fuerza bruta. Cada contraseña se genera en tu navegador — nada se envía a un servidor.',
  fr: 'Notre générateur utilise un aléa cryptographique pour créer des mots de passe résistants aux attaques par force brute. Chaque mot de passe est généré dans votre navigateur — rien n\'est envoyé à un serveur.',
  de: 'Unser Generator nutzt kryptografische Zufälligkeit, um Passwörter zu erstellen, die Brute-Force-Angriffen widerstehen. Jedes Passwort wird direkt in Ihrem Browser erstellt — nichts wird an einen Server gesendet.',
  it: 'Il nostro generatore utilizza casualità crittografica per creare password resistenti agli attacchi brute-force. Ogni password viene generata nel tuo browser — nulla viene inviato a un server.',
  pt: 'Nosso gerador usa aleatoriedade criptográfica para criar senhas resistentes a ataques de força bruta. Cada senha é gerada no seu navegador — nada é enviado a um servidor.',
  ru: 'Наш генератор использует криптографическую случайность для создания паролей, устойчивых к атакам перебора. Каждый пароль создаётся прямо в вашем браузере — ничего не отправляется на сервер.',
  zh: '我们的生成器使用加密随机性创建能够抵御暴力攻击的密码。每个密码完全在您的浏览器中生成——不会发送到服务器。',
  ja: '当ジェネレーターは暗号学的乱数を使用し、総当たり攻撃に耐えるパスワードを作成します。すべてのパスワードはブラウザ内で生成され、サーバーには送信されません。',
  pl: 'Nasz generator wykorzystuje kryptograficzną losowość do tworzenia haseł odpornych na ataki brute-force. Każde hasło jest generowane w Twojej przeglądarce — nic nie jest wysyłane na serwer.',
  vi: 'Trình tạo của chúng tôi sử dụng tính ngẫu nhiên mật mã để tạo mật khẩu chống lại các cuộc tấn công brute-force. Mỗi mật khẩu được tạo hoàn toàn trong trình duyệt của bạn — không có gì được gửi đến máy chủ.',
};

const SEOKeywords: React.FC<SEOKeywordsProps> = ({ language, className }) => {
  const paragraph = naturalTextByLang[language] || naturalTextByLang['en'];

  return (
    <div className={className || ''}>
      <p className="text-[16px] text-[#071016] dark:text-[#e0e0e0] leading-relaxed">
        {paragraph}
      </p>
    </div>
  );
};

export default SEOKeywords;



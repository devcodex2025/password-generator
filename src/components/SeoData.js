import { getAvailableLanguages } from '../utils/languageUtils';

// Базові SEO дані для кожної мови
const seoDataMap = {
  en: {
    title: "Generate Strong Passwords with generatepasswordto.me | NIST & PCI DSS Compliant",
    description: "Enhance your online security with generatepasswordto.me! Our NIST 800-63B and PCI DSS compliant password generator creates cryptographically secure passwords. Trusted by financial institutions worldwide for maximum account protection.",
  },
  ua: {
    title: "Генерація Надійних Паролів на generatepasswordto.me | Відповідність NIST та PCI DSS",
    description: "Підвищте безпеку онлайн з generatepasswordto.me! Наш генератор паролів відповідає стандартам NIST 800-63B та PCI DSS, створюючи криптографічно безпечні паролі. Довіра фінансових установ по всьому світу для максимального захисту акаунтів.",
  },
  es: {
    title: "Genera contraseñas seguras con generatepasswordto.me | Cumple NIST y PCI DSS",
    description: "¡Mejora tu seguridad en línea con generatepasswordto.me! Nuestro generador de contraseñas cumple con NIST 800-63B y PCI DSS, creando contraseñas criptográficamente seguras. Confiado por instituciones financieras mundiales para máxima protección de cuentas.",
  },
  fr: {
    title: "Générez des mots de passe forts avec generatepasswordto.me | Conforme NIST et PCI DSS",
    description: "Améliorez votre sécurité en ligne avec generatepasswordto.me ! Notre générateur de mots de passe conforme aux normes NIST 800-63B et PCI DSS crée des mots de passe cryptographiquement sécurisés. Approuvé par les institutions financières mondiales pour une protection maximale des comptes.",
  },
  de: {
    title: "Generieren Sie starke Passwörter mit generatepasswordto.me | NIST & PCI DSS konform",
    description: "Verbessern Sie Ihre Online-Sicherheit mit generatepasswordto.me! Unser NIST 800-63B und PCI DSS konformer Passwort-Generator erstellt kryptographisch sichere Passwörter. Vertraut von Finanzinstituten weltweit für maximalen Kontenschutz.",
  },
  it: {
    title: "Genera password sicure con generatepasswordto.me | Conforme NIST e PCI DSS",
    description: "Migliora la tua sicurezza online con generatepasswordto.me! Il nostro generatore di password conforme a NIST 800-63B e PCI DSS crea password crittograficamente sicure. Fidato dalle istituzioni finanziarie mondiali per la massima protezione degli account.",
  },
  pt: {
    title: "Gere senhas fortes com generatepasswordto.me | Conforme NIST e PCI DSS",
    description: "Melhore sua segurança online com generatepasswordto.me! Nosso gerador de senhas em conformidade com NIST 800-63B e PCI DSS cria senhas criptograficamente seguras. Confiado por instituições financeiras mundiais para máxima proteção de contas.",
  },
  ru: {
    title: "Генерируйте надежные пароли с generatepasswordto.me | Соответствие NIST и PCI DSS",
    description: "Повысьте безопасность в интернете с generatepasswordto.me! Наш генератор паролей соответствует стандартам NIST 800-63B и PCI DSS, создавая криптографически безопасные пароли. Доверие финансовых учреждений по всему миру для максимальной защиты аккаунтов.",
  },
  zh: {
    title: "使用 generatepasswordto.me 生成强密码 | 符合 NIST 和 PCI DSS 标准",
    description: "通过 generatepasswordto.me 提升您的在线安全性！我们的密码生成器符合 NIST 800-63B 和 PCI DSS 标准，创建加密安全的密码。全球金融机构信赖，为账户提供最大保护。",
  },
  ja: {
    title: "generatepasswordto.me で強力なパスワードを生成 | NIST・PCI DSS準拠",
    description: "generatepasswordto.me でオンラインセキュリティを向上させましょう！NIST 800-63BとPCI DSSに準拠した当社のパスワードジェネレーターは、暗号的に安全なパスワードを作成します。世界中の金融機関に信頼され、アカウントの最大限の保護を提供します。",
  },
};

// Функція для автоматичного генерування SEO даних
const generateSeoData = () => {
  const availableLanguages = getAvailableLanguages();
  
  return availableLanguages.map(language => ({
    language,
    title: seoDataMap[language]?.title || seoDataMap.en.title,
    description: seoDataMap[language]?.description || seoDataMap.en.description,
  }));
};

// Експортуємо автоматично згенеровані дані
const seoData = generateSeoData();

export default seoData;

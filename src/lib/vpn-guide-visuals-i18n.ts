/**
 * Copy for VPN guide infographics & visual callouts (en + ua; other locales use en).
 */

export interface VpnGuideVisualStrings {
  statsTitle: string;
  statHotspotValue: string;
  statHotspotLabel: string;
  statCryptoValue: string;
  statCryptoLabel: string;
  statSpeedValue: string;
  statSpeedLabel: string;
  tunnelTitle: string;
  tunnelCaption: string;
  tunnelYou: string;
  tunnelEncrypted: string;
  tunnelVpnServer: string;
  tunnelOpenInternet: string;
  tunnelBadgeIp: string;
  tunnelBadgeDns: string;
  chipWireGuard: string;
  chipOpenVpn: string;
  chipAes: string;
  scenariosTitle: string;
  scenarioWifiTitle: string;
  scenarioWifiDesc: string;
  scenarioIspTitle: string;
  scenarioIspDesc: string;
  scenarioRemoteTitle: string;
  scenarioRemoteDesc: string;
  scenarioGeoTitle: string;
  scenarioGeoDesc: string;
  scenarioLimitTitle: string;
  scenarioLimitDesc: string;
  defenseTitle: string;
  defenseSubtitle: string;
  defensePassword: string;
  defensePasswordDesc: string;
  defense2fa: string;
  defense2faDesc: string;
  defenseVpn: string;
  defenseVpnDesc: string;
  checklistTitle: string;
  checklistAudit: string;
  checklistJurisdiction: string;
  checklistKill: string;
  checklistProtocol: string;
  checklistServers: string;
  checklistSplit: string;
  checklistDns: string;
  mythsVisualTitle: string;
  mythFact: string;
  mythFiction: string;
  myth1Claim: string;
  myth1Truth: string;
  myth2Claim: string;
  myth2Truth: string;
  myth3Claim: string;
  myth3Truth: string;
}

const en: VpnGuideVisualStrings = {
  statsTitle: 'At a glance',
  statHotspotValue: '~25%',
  statHotspotLabel: 'of public Wi-Fi hotspots had no encryption (Kaspersky, 2024)',
  statCryptoValue: 'AES-256',
  statCryptoLabel: 'or ChaCha20: typical VPN ciphers in 2026',
  statSpeedValue: '<10%',
  statSpeedLabel: 'typical speed overhead on WireGuard-class VPNs',
  tunnelTitle: 'How traffic flows with a VPN',
  tunnelCaption: 'Everything between your device and the VPN server is encrypted; observers on the local network see noise, not destinations.',
  tunnelYou: 'Your device',
  tunnelEncrypted: 'Encrypted tunnel',
  tunnelVpnServer: 'VPN server',
  tunnelOpenInternet: 'Websites & apps',
  tunnelBadgeIp: 'Real IP hidden',
  tunnelBadgeDns: 'DNS inside tunnel',
  chipWireGuard: 'WireGuard / NordLynx',
  chipOpenVpn: 'OpenVPN',
  chipAes: 'AES-256 · ChaCha20',
  scenariosTitle: 'When a VPN matters most',
  scenarioWifiTitle: 'Public Wi-Fi',
  scenarioWifiDesc: 'Coffee shops, airports, hotels: evil-twin and sniffing risks.',
  scenarioIspTitle: 'ISP & network logging',
  scenarioIspDesc: 'Hide which sites you visit from providers and local DNS.',
  scenarioRemoteTitle: 'Remote work',
  scenarioRemoteDesc: 'Extra encryption when accessing email, CRM, or client data.',
  scenarioGeoTitle: 'Travel & censorship',
  scenarioGeoDesc: 'Route through another region for access or safety.',
  scenarioLimitTitle: 'What a VPN does not fix',
  scenarioLimitDesc: 'Phishing, malware, and social engineering still need habits + 2FA.',
  defenseTitle: 'Defense in depth',
  defenseSubtitle: 'Three layers, three different attack surfaces',
  defensePassword: 'Unique passwords',
  defensePasswordDesc: 'Stops credential stuffing & reuse leaks.',
  defense2fa: '2FA / MFA',
  defense2faDesc: 'Blocks takeover even if a password leaks.',
  defenseVpn: 'VPN on risky networks',
  defenseVpnDesc: 'Encrypts the pipe; protects sessions on hostile Wi-Fi.',
  checklistTitle: 'Provider checklist',
  checklistAudit: 'Independently audited no-logs policy',
  checklistJurisdiction: 'Privacy-friendly jurisdiction',
  checklistKill: 'Kill switch on all your devices',
  checklistProtocol: 'Modern protocol (WireGuard-class)',
  checklistServers: 'Large, fast server network',
  checklistSplit: 'Split tunneling (when you need it)',
  checklistDns: 'Private DNS & leak protection',
  mythsVisualTitle: 'Reality check',
  mythFact: 'Fact',
  mythFiction: 'Myth',
  myth1Claim: '“A VPN makes me anonymous.”',
  myth1Truth: 'It hides your IP and encrypts transit, but not cookies, logins, or fingerprinting.',
  myth2Claim: '“Free VPNs are just as good.”',
  myth2Truth: 'Many monetize your data; a large share of free mobile VPNs have shipped malware.',
  myth3Claim: '“HTTPS means I do not need a VPN.”',
  myth3Truth: 'HTTPS protects content to one site; SNI/DNS/IP visibility is a separate problem.',
};

const ua: VpnGuideVisualStrings = {
  statsTitle: 'Коротко по цифрах',
  statHotspotValue: '~25%',
  statHotspotLabel: 'публічних Wi-Fi без шифрування (Kaspersky, 2024)',
  statCryptoValue: 'AES-256',
  statCryptoLabel: 'або ChaCha20: типові шифри VPN у 2026 році',
  statSpeedValue: '<10%',
  statSpeedLabel: 'типові втрати швидкості на VPN з WireGuard-класу',
  tunnelTitle: 'Як рухається трафік із VPN',
  tunnelCaption:
    'Усе між пристроєм і VPN-сервером зашифровано; у локальній мережі бачать шум, а не адреси сайтів.',
  tunnelYou: 'Ваш пристрій',
  tunnelEncrypted: 'Зашифрований тунель',
  tunnelVpnServer: 'VPN-сервер',
  tunnelOpenInternet: 'Сайти та сервіси',
  tunnelBadgeIp: 'Справжню IP приховано',
  tunnelBadgeDns: 'DNS у тунелі',
  chipWireGuard: 'WireGuard / NordLynx',
  chipOpenVpn: 'OpenVPN',
  chipAes: 'AES-256 · ChaCha20',
  scenariosTitle: 'Коли VPN найважливіший',
  scenarioWifiTitle: 'Публічний Wi-Fi',
  scenarioWifiDesc: 'Кав\'ярні, аеропорти, готелі: ризики підміни точки та сніфінгу.',
  scenarioIspTitle: 'Логи провайдера та мережі',
  scenarioIspDesc: 'Приховайте від відвідуваних сайтів провайдера та локальний DNS.',
  scenarioRemoteTitle: 'Віддалена робота',
  scenarioRemoteDesc: 'Додаткове шифрування для пошти, CRM або даних клієнтів.',
  scenarioGeoTitle: 'Подорожі та цензура',
  scenarioGeoDesc: 'Маршрут через інший регіон для доступу чи безпеки.',
  scenarioLimitTitle: 'Що VPN не вирішує',
  scenarioLimitDesc: 'Фішинг, шкідливе ПЗ і соціальна інженерія: потрібні звички і 2FA.',
  defenseTitle: 'Багаторівневий захист',
  defenseSubtitle: 'Три рівні, три різні поверхні атаки',
  defensePassword: 'Унікальні паролі',
  defensePasswordDesc: 'Стійкість до credential stuffing і повторного використання.',
  defense2fa: '2FA / MFA',
  defense2faDesc: 'Захист акаунту, навіть якщо пароль витік.',
  defenseVpn: 'VPN у ризикових мережах',
  defenseVpnDesc: 'Шифрує канал; захищає сесії у ворожому Wi-Fi.',
  checklistTitle: 'Чекліст провайдера',
  checklistAudit: 'Політика без логів з незалежним аудитом',
  checklistJurisdiction: 'Юрисдикція, дружня до приватності',
  checklistKill: 'Kill switch на всіх ваших пристроях',
  checklistProtocol: 'Сучасний протокол (класу WireGuard)',
  checklistServers: 'Велика й швидка мережа серверів',
  checklistSplit: 'Роздільне тунелювання (коли потрібно)',
  checklistDns: 'Приватний DNS і захист від витоків',
  mythsVisualTitle: 'Перевірка фактів',
  mythFact: 'Факт',
  mythFiction: 'Міф',
  myth1Claim: '«VPN робить мене анонімним».',
  myth1Truth: 'Приховує IP і шифрує канал, але не cookies, логіни чи відбиток браузера.',
  myth2Claim: '«Безкоштовні VPN такі ж хороші».',
  myth2Truth: 'Багато хто монетизує дані; значна частка безкоштовних мобільних VPN містила шкідників.',
  myth3Claim: '«HTTPS замінює VPN».',
  myth3Truth: 'HTTPS захищає вміст до одного сайту; видимість SNI/DNS/IP є окремою проблемою.',
};

export function getVpnGuideVisualStrings(locale: string): VpnGuideVisualStrings {
  if (locale === 'ua') return ua;
  return en;
}

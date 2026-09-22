// 真实的开发者/团队数据库
const PEOPLE_DATA = [
  {
    id: '2dust',
    name: '2dust',
    avatar: '💨',
    role: 'v2rayNG/v2rayN 开发者',
    status: '主导开发',
    badges: ['开源', '跨平台'],
    projects: ['v2rayng', 'v2rayn', 'v2fly'],
    bio: 'v2rayNG 和 v2rayN 的核心开发者',
    github: 'https://github.com/2dust'
  },
  {
    id: 'metacubex',
    name: 'MetaCubeX',
    avatar: '🎲',
    role: 'Clash Meta 团队',
    status: '团队开发',
    badges: ['开源', 'Mihomo'],
    projects: ['clash-meta-android', 'clash-verge-rev'],
    bio: 'Clash Meta (Mihomo) 核心开发团队',
    github: 'https://github.com/MetaCubeX'
  },
  {
    id: 'nekohasekai',
    name: 'nekohasekai',
    avatar: '🐱',
    role: 'sing-box 创始人',
    status: '内核血缘',
    badges: ['开源', '核心贡献者'],
    projects: ['sing-box', 'sagernet', 'matsuri', 'nekobox-android'],
    bio: 'sing-box 创始人，SagerNet 核心维护者',
    github: 'https://github.com/nekohasekai'
  },
  {
    id: 'kr328',
    name: 'Kr328',
    avatar: '🤖',
    role: 'Clash for Android 开发者',
    status: '主导开发',
    badges: ['开源', 'Android'],
    projects: ['clash-for-android'],
    bio: 'Clash for Android 的原作者',
    github: 'https://github.com/Kr328'
  },
  {
    id: 'yichengchen',
    name: 'yichengchen',
    avatar: '🍎',
    role: 'ClashX 开发者',
    status: '主导开发',
    badges: ['开源', 'macOS'],
    projects: ['clashx-pro'],
    bio: 'ClashX 和 ClashX Pro 的开发者',
    github: 'https://github.com/yichengchen'
  },
  {
    id: 'clash-verge-rev-team',
    name: 'Clash Verge Rev Team',
    avatar: '⚡',
    role: 'Clash Verge Rev 团队',
    status: '团队开发',
    badges: ['开源', '跨平台'],
    projects: ['clash-verge-rev'],
    bio: 'Clash Verge Rev 开发团队',
    github: 'https://github.com/clash-verge-rev'
  },
  {
    id: 'shadowsocks',
    name: 'Shadowsocks',
    avatar: '🔒',
    role: 'Shadowsocks 官方',
    status: '官方团队',
    badges: ['开源', '协议制定'],
    projects: ['shadowsocks-android', 'shadowsocksr-android'],
    bio: 'Shadowsocks 官方开发团队',
    github: 'https://github.com/shadowsocks'
  },
  {
    id: 'psiphon',
    name: 'Psiphon Inc',
    avatar: '🌐',
    role: 'Psiphon 官方',
    status: '官方团队',
    badges: ['开源', '非营利'],
    projects: ['psiphon-android'],
    bio: 'Psiphon 官方开发团队',
    website: 'https://psiphon.ca'
  },
  {
    id: 'proton',
    name: 'Proton AG',
    avatar: '🛡️',
    role: 'ProtonVPN 官方',
    status: '官方团队',
    badges: ['开源', '隐私保护'],
    projects: ['protonvpn-android'],
    bio: 'ProtonVPN 官方开发团队，注重隐私保护',
    website: 'https://protonvpn.com'
  },
  {
    id: 'wireguard',
    name: 'WireGuard',
    avatar: '🔐',
    role: 'WireGuard 官方',
    status: '官方团队',
    badges: ['开源', '现代协议'],
    projects: ['wireguard-android'],
    bio: 'WireGuard 官方开发团队',
    website: 'https://www.wireguard.com'
  }
];

// 根据应用 ID 获取相关人物
function getPeopleByApp(appId) {
  // 应用与开发者的关联映射
  const appPeopleMap = {
    // 2dust 相关
    'v2rayng': ['2dust'],
    'v2rayn': ['2dust'],
    'v2fly': ['2dust'],

    // MetaCubeX 相关
    'clash-meta-android': ['metacubex'],
    'clash-verge-rev': ['clash-verge-rev-team', 'metacubex'],
    'clash-nyanpasu': ['metacubex'],
    'ficlash': ['metacubex'],

    // nekohasekai 相关
    'sing-box': ['nekohasekai'],
    'sagernet': ['nekohasekai'],
    'matsuri': ['nekohasekai'],
    'nekobox-android': ['nekohasekai'],
    'karing': ['nekohasekai'],
    'hiddify': ['nekohasekai'],

    // Kr328 相关
    'clash-for-android': ['kr328'],

    // yichengchen 相关
    'clashx-pro': ['yichengchen'],

    // Shadowsocks 相关
    'shadowsocks-android': ['shadowsocks'],
    'shadowsocksr-android': ['shadowsocks'],

    // VPN 官方
    'psiphon-android': ['psiphon'],
    'protonvpn-android': ['proton'],
    'wireguard-android': ['wireguard']
  };

  const peopleIds = appPeopleMap[appId] || [];
  return peopleIds.map(id => PEOPLE_DATA.find(p => p.id === id)).filter(Boolean);
}

// 根据人物 ID 获取人物信息
function getPersonById(id) {
  return PEOPLE_DATA.find(p => p.id === id);
}

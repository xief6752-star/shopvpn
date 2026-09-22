// 应用详情页 V2 - 交互脚本

// 获取 URL 参数
function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// 获取平台图标
function getPlatformIcon(platform) {
  const icons = {
    'ios': '🍎',
    'android': '🤖',
    'windows': '🪟',
    'mac': '💻',
    'linux': '🐧',
    'openwrt': '📡',
    'router': '🔌',
    'harmonyos': '⚡',
    'steamdeck': '🎮'
  };
  return icons[platform.toLowerCase()] || '📱';
}

// 渲染应用详情
function renderAppDetail(app) {
  if (!app) {
    document.querySelector('.detail-container').innerHTML = `
      <div style="text-align: center; padding: 100px 20px;">
        <h2 style="color: var(--muted); margin-bottom: 16px;">未找到应用</h2>
        <a href="index-v2.html" style="color: var(--blue); text-decoration: none; font-weight: 600;">返回应用列表</a>
      </div>
    `;
    return;
  }

  // 更新页面标题
  document.getElementById('pageTitle').textContent = `${app.name} · mapforvpn`;
  document.getElementById('breadcrumbName').textContent = app.name;

  // 渲染应用头部
  const heroIcon = document.getElementById('heroIcon');
  if (app.logoUrl) {
    heroIcon.innerHTML = `<img src="${app.logoUrl}" alt="${app.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='${app.icon}';">`;
  } else {
    heroIcon.textContent = app.icon;
  }

  document.getElementById('appName').textContent = app.name;
  document.getElementById('appDeveloper').textContent = app.developer || '开发团队';
  document.getElementById('appDescription').textContent = app.description;

  // 下载按钮
  const downloadBtn = document.getElementById('downloadBtn');
  if (app.downloadUrl) {
    downloadBtn.href = app.downloadUrl;
    if (/apps\.apple\.com/.test(app.downloadUrl)) {
      downloadBtn.innerHTML = '<span>📥</span><span>App Store 下载</span>';
    } else if (/github\.com/.test(app.downloadUrl)) {
      downloadBtn.innerHTML = '<span>📥</span><span>GitHub 下载</span>';
    }
  } else {
    downloadBtn.style.display = 'none';
  }

  // 元信息
  document.getElementById('appPrice').textContent = app.price || '免费';
  document.getElementById('appStatus').textContent = app.codeStatus || '未公开';

  // 平台标签
  const platformBadges = document.getElementById('platformBadges');
  platformBadges.innerHTML = (app.platforms || []).map(platform => `
    <span class="platform-badge">
      <span>${getPlatformIcon(platform)}</span>
      <span>${platform}</span>
    </span>
  `).join('');

  // 核心信息
  document.getElementById('appCore').textContent = app.core || '未知';
  document.getElementById('appCodeStatus').textContent = app.codeStatus || '未公开';
  document.getElementById('appPriceInfo').textContent = app.price || '免费';
  document.getElementById('appPlatforms').textContent = (app.platforms || []).join('、');

  // 功能标签
  const appTags = document.getElementById('appTags');
  appTags.innerHTML = (app.tags || []).map(tag => `
    <span class="tag-item">${tag}</span>
  `).join('');

  // 相关链接
  const appLinks = document.getElementById('appLinks');
  const links = [];

  if (app.downloadUrl) {
    links.push({
      label: /apps\.apple\.com/.test(app.downloadUrl) ? 'App Store' : /github\.com/.test(app.downloadUrl) ? 'GitHub 仓库' : '下载地址',
      url: app.downloadUrl
    });
  }

  if (app.website) {
    links.push({ label: '官方网站', url: app.website });
  }

  if (app.github) {
    links.push({ label: 'GitHub', url: app.github });
  }

  if (app.telegram) {
    links.push({ label: 'Telegram', url: app.telegram });
  }

  if (links.length > 0) {
    appLinks.innerHTML = links.map(link => `
      <a href="${link.url}" class="link-item" target="_blank" rel="noopener noreferrer">
        <span class="link-label">${link.label}</span>
        <span class="link-icon">↗</span>
      </a>
    `).join('');
  } else {
    document.getElementById('linksSection').style.display = 'none';
  }

  // 渲染使用指南
  const guideSection = document.getElementById('guideSection');
  if (app.guide) {
    document.getElementById('guideQuickStart').textContent = app.guide.quickStart || '暂无快速开始指南';

    const guideFeatures = document.getElementById('guideFeatures');
    const guideFeaturesSection = document.getElementById('guideFeaturesSection');
    if (app.guide.features && app.guide.features.length > 0) {
      guideFeatures.innerHTML = app.guide.features.map(f => `<li>${f}</li>`).join('');
    } else {
      guideFeaturesSection.style.display = 'none';
    }

    const guideTips = document.getElementById('guideTips');
    const guideTipsSection = document.getElementById('guideTipsSection');
    if (app.guide.tips && app.guide.tips.length > 0) {
      guideTips.innerHTML = app.guide.tips.map(t => `<li>${t}</li>`).join('');
    } else {
      guideTipsSection.style.display = 'none';
    }
  } else {
    guideSection.style.display = 'none';
  }
}

// 初始化
const appId = getUrlParam('id');
if (appId && typeof APPS_DATA !== 'undefined') {
  const app = APPS_DATA.find(a => a.id === appId);
  renderAppDetail(app);
} else {
  renderAppDetail(null);
}

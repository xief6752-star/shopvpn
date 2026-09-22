// 应用商店 V2 - 交互脚本

// 筛选状态
const filters = {
  platform: 'all',
  core: 'all',
  status: 'all',
  price: 'all',
  search: ''
};

// 渲染应用卡片
function renderApps(apps) {
  const grid = document.getElementById('appsGrid');
  const resultCount = document.getElementById('resultCount');

  if (apps.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--muted);">未找到匹配的应用</div>';
    resultCount.textContent = '0';
    return;
  }

  grid.innerHTML = apps.map(app => `
    <a href="app-detail.html?id=${app.id}" class="app-card">
      <div class="app-header">
        <div class="app-icon">
          ${app.logoUrl
            ? `<img src="${app.logoUrl}" alt="${app.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
               <span class="icon-fallback">${app.icon}</span>`
            : `<span>${app.icon}</span>`
          }
        </div>
        <div class="app-info">
          <div class="app-name">${app.name}</div>
          <div class="app-developer">${app.developer}</div>
        </div>
        ${app.featured ? `<span class="app-badge">${app.featured}</span>` : ''}
      </div>
      <div class="app-description">${app.description}</div>
      <div class="app-footer">
        <div class="app-tags">
          ${app.tags.slice(0, 4).map((tag, i) =>
            `<span class="app-tag">${tag}</span>`
          ).join('')}
        </div>
        <span class="app-link">${app.downloadUrl && /apps\.apple\.com/.test(app.downloadUrl) ? 'App Store' : '下载'} ↗</span>
      </div>
    </a>
  `).join('');

  resultCount.textContent = apps.length;
}

// 筛选逻辑
function filterApps() {
  let filtered = [...APPS_DATA];

  // 平台筛选
  if (filters.platform !== 'all') {
    filtered = filtered.filter(app =>
      app.platforms.some(p => p.toLowerCase() === filters.platform)
    );
  }

  // 内核筛选
  if (filters.core !== 'all') {
    filtered = filtered.filter(app => {
      const coreText = `${app.core || ''} ${(app.tags || []).join(' ')}`;

      if (filters.core === '其他') {
        return !/(mihomo|clash\s*meta|sing-box|自研|xray|v2ray|meow-rs|clash-rs)/i.test(coreText);
      }

      return coreText.toLowerCase().includes(filters.core.toLowerCase());
    });
  }

  // 代码状态筛选
  if (filters.status !== 'all') {
    filtered = filtered.filter(app => app.codeStatus === filters.status);
  }

  // 价格筛选
  if (filters.price !== 'all') {
    filtered = filtered.filter(app => app.price === filters.price);
  }

  // 搜索筛选
  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(app =>
      app.name.toLowerCase().includes(query) ||
      (app.developer && app.developer.toLowerCase().includes(query)) ||
      app.description.toLowerCase().includes(query) ||
      app.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  renderApps(filtered);
}

// 平台菜单点击
document.getElementById('platformList').addEventListener('click', e => {
  const button = e.target.closest('.platform-item');
  if (!button) return;

  document.querySelectorAll('.platform-item').forEach(b => b.classList.remove('active'));
  button.classList.add('active');

  filters.platform = button.dataset.platform;
  filterApps();
});

// 筛选器点击
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filterType = btn.dataset.filter;
    const filterValue = btn.dataset.value;

    // 取消同组其他选中
    document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(b =>
      b.classList.remove('active')
    );
    btn.classList.add('active');

    filters[filterType] = filterValue;
    filterApps();
  });
});

// 搜索输入
document.getElementById('searchInput').addEventListener('input', e => {
  filters.search = e.target.value.trim();
  filterApps();
});

// 排序标签点击
document.querySelectorAll('.sort-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.sort-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    // 排序逻辑可以在这里添加
  });
});

// 键盘快捷键 Cmd+K 聚焦搜索
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
});

// 初始化渲染
filterApps();

// 更新平台统计数字
function updatePlatformCounts() {
  const counts = {
    all: APPS_DATA.length,
    android: 0,
    ios: 0,
    harmonyos: 0,
    windows: 0,
    mac: 0,
    linux: 0,
    openwrt: 0,
    router: 0,
    steamdeck: 0
  };

  APPS_DATA.forEach(app => {
    app.platforms.forEach(platform => {
      const key = platform.toLowerCase();
      if (counts.hasOwnProperty(key)) {
        counts[key]++;
      }
    });
  });

  // 更新 UI
  Object.keys(counts).forEach(platform => {
    const btn = document.querySelector(`[data-platform="${platform}"]`);
    if (btn) {
      const countEl = btn.querySelector('.platform-count');
      if (countEl) {
        countEl.textContent = counts[platform];
      }
    }
  });
}

updatePlatformCounts();

// 机场页面 V2 - 交互脚本

// 筛选状态
const filters = {
  tier: 'all',
  search: ''
};

// 渲染机场卡片
function renderAirports(airports) {
  const grid = document.getElementById('airportsGrid');
  const resultCount = document.getElementById('resultCount');

  if (airports.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--muted);">未找到匹配的机场</div>';
    resultCount.textContent = '0';
    return;
  }

  grid.innerHTML = airports.map(airport => `
    <a href="airport-review.html?id=${airport.id}" class="airport-card">
      <div class="airport-header">
        <div class="airport-info">
          <div class="airport-name">
            ${airport.name}
            <span class="airport-tier tier-${airport.tier}">${airport.tier}</span>
          </div>
          <div class="airport-slogan">${airport.description || airport.nameEn}</div>
        </div>
        <div class="airport-rating">
          <span>⭐</span>
          <span>${airport.rating}</span>
        </div>
      </div>

      <div class="airport-features">
        ${(airport.features || []).slice(0, 4).map(feature =>
          `<span class="airport-feature">${feature}</span>`
        ).join('')}
      </div>

      <div class="airport-price">
        <div class="price-label">月付起步价</div>
        <div class="price-value">
          ¥${airport.price.monthly}
          <small>/ 月</small>
        </div>
      </div>

      <div class="airport-footer">
        <div class="airport-tags">
          <span class="airport-tag">${airport.traffic || '流量充足'}</span>
          <span class="airport-tag">${airport.devices || 3} 设备</span>
        </div>
        <span class="airport-link">查看详情 ↗</span>
      </div>
    </a>
  `).join('');

  resultCount.textContent = airports.length;
}

// 筛选逻辑
function filterAirports() {
  let filtered = [...AIRPORTS_DATA];

  // 档位筛选
  if (filters.tier !== 'all') {
    filtered = filtered.filter(airport => airport.tier === filters.tier);
  }

  // 搜索筛选
  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(airport =>
      airport.name.toLowerCase().includes(query) ||
      airport.nameEn.toLowerCase().includes(query) ||
      airport.description.toLowerCase().includes(query) ||
      (airport.features || []).some(f => f.toLowerCase().includes(query)) ||
      (airport.tags || []).some(t => t.toLowerCase().includes(query))
    );
  }

  renderAirports(filtered);
}

// 档位菜单点击
document.getElementById('tierMenu').addEventListener('click', e => {
  const button = e.target.closest('.platform-item');
  if (!button) return;

  document.querySelectorAll('.platform-item').forEach(b => b.classList.remove('active'));
  button.classList.add('active');

  filters.tier = button.dataset.tier;
  filterAirports();
});

// 搜索输入
document.getElementById('searchInput').addEventListener('input', e => {
  filters.search = e.target.value.trim();
  filterAirports();
});

// 排序标签点击
document.querySelectorAll('.sort-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.sort-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const sortType = tab.dataset.sort;
    let sorted = [...AIRPORTS_DATA];

    if (sortType === 'price') {
      sorted.sort((a, b) => a.price.monthly - b.price.monthly);
    } else if (sortType === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    AIRPORTS_DATA.length = 0;
    AIRPORTS_DATA.push(...sorted);
    filterAirports();
  });
});

// 键盘快捷键
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
});

// 初始化渲染
filterAirports();

// 更新档位统计数字
function updateTierCounts() {
  const counts = {
    all: AIRPORTS_DATA.length,
    高端: 0,
    中端: 0,
    入门: 0
  };

  AIRPORTS_DATA.forEach(airport => {
    if (counts.hasOwnProperty(airport.tier)) {
      counts[airport.tier]++;
    }
  });

  // 更新 UI
  Object.keys(counts).forEach(tier => {
    const btn = document.querySelector(`[data-tier="${tier}"]`);
    if (btn) {
      const countEl = btn.querySelector('.platform-count');
      if (countEl) {
        countEl.textContent = counts[tier];
      }
    }
  });
}

updateTierCounts();

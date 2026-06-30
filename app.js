/* ============================================================
   STS Platform — Application Logic
   جامعة المجمعة · نادي الابتكار
   ============================================================ */

'use strict';

// ============================================================
// STATE
// ============================================================
const state = {
  currentUser: null,
  currentPage: 'dashboard',
  currentRole: null,
  lang: localStorage.getItem('sts_lang') || 'ar',
  theme: localStorage.getItem('sts_theme') || 'light',
  wizardStep: 1,
  wizardData: {},
  achievements: [],
  notifications: [],
  students: [],
  selectedAchievementId: null,
  approvalTarget: null,
};

// ============================================================
// TRANSLATIONS
// ============================================================
const T = {
  ar: {
    'brand.title': 'مركز الابتكار',
    'brand.sub': 'جامعة المجمعة  ',
    'login.title': 'تسجيل الدخول',
    'login.desc': 'أدخل بيانات حسابك للمتابعة',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.btn': 'دخول',
    'login.forgot': 'نسيت كلمة المرور؟',
    'login.register': 'إنشاء حساب',
    'login.demo': 'حسابات تجريبية (123456)',
    'register.title': 'إنشاء حساب',
    'register.desc': 'للطلاب فقط — بريد @s.mu.edu.sa',
    'register.name': 'الاسم الكامل',
    'register.email': 'البريد الجامعي',
    'register.password': 'كلمة المرور',
    'register.btn': 'إنشاء الحساب',
    'register.back': '← العودة لتسجيل الدخول',
    'forgot.title': 'استعادة كلمة المرور',
    'forgot.desc': 'أدخل بريدك وسنرسل لك رابط الاستعادة',
    'forgot.email': 'البريد الإلكتروني',
    'forgot.btn': 'إرسال الرابط',
    'forgot.back': '← العودة',
    'nav.theme': 'المظهر',
    'nav.logout': 'تسجيل الخروج',
    'wizard.title': 'توثيق إنجاز جديد',
    'page.dashboard': 'لوحة التحكم',
    'page.achievements': 'الإنجازات',
    'page.reports': 'التقارير',
    'page.notifications': 'التنبيهات',
    'page.profile': 'الملف الشخصي',
    'page.supervisor': 'لوحة المشرف',
    'page.admin': 'لوحة المسؤول',
    'page.students': 'الطلاب',
  },
  en: {
    'brand.title': 'Innovation Club',
    'brand.sub': 'Majmaah University · STS',
    'login.title': 'Sign In',
    'login.desc': 'Enter your credentials to continue',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.btn': 'Login',
    'login.forgot': 'Forgot password?',
    'login.register': 'Create account',
    'login.demo': 'Demo accounts (123456)',
    'register.title': 'Create Account',
    'register.desc': 'Students only — @s.mu.edu.sa email',
    'register.name': 'Full Name',
    'register.email': 'University Email',
    'register.password': 'Password',
    'register.btn': 'Create Account',
    'register.back': '← Back to Login',
    'forgot.title': 'Reset Password',
    'forgot.desc': 'Enter your email and we\'ll send a reset link',
    'forgot.email': 'Email Address',
    'forgot.btn': 'Send Reset Link',
    'forgot.back': '← Back',
    'nav.theme': 'Theme',
    'nav.logout': 'Sign Out',
    'wizard.title': 'Document New Achievement',
    'page.dashboard': 'Dashboard',
    'page.achievements': 'Achievements',
    'page.reports': 'Reports',
    'page.notifications': 'Notifications',
    'page.profile': 'Profile',
    'page.supervisor': 'Supervisor Panel',
    'page.admin': 'Admin Panel',
    'page.students': 'Students',
  }
};

function t(key) { return T[state.lang][key] || key; }

// ============================================================
// MOCK DATA
// ============================================================
const DEMO_USERS = {
  'supervisor@mu.edu.sa': { id: 'u2', name: 'د. سعد العتيبي',     role: 'supervisor', setupDone: true  },
  'admin@mu.edu.sa':      { id: 'u3', name: 'نظام الإدارة',       role: 'admin',      setupDone: true  },
};

const CATEGORIES = [
  { id: 'programming', label: 'برمجة',      icon: '💻' },
  { id: 'design',      label: 'تصميم',      icon: '🎨' },
  { id: 'management',  label: 'إداري',      icon: '📋' },
  { id: 'research',    label: 'بحث علمي',   icon: '🔬' },
  { id: 'ai',          label: 'ذكاء اصطناعي', icon: '🤖' },
  { id: 'security',    label: 'أمن معلومات', icon: '🔐' },
  { id: 'network',     label: 'شبكات',      icon: '🌐' },
  { id: 'mobile',      label: 'تطبيقات',    icon: '📱' },
  { id: 'data',        label: 'بيانات',     icon: '📊' },
  { id: 'cloud',       label: 'حوسبة سحابية', icon: '☁️' },
  { id: 'iot',         label: 'إنترنت الأشياء', icon: '📡' },
  { id: 'presentation',label: 'عروض',       icon: '🎤' },
  { id: 'teamwork',    label: 'عمل جماعي',  icon: '🤝' },
  { id: 'other',       label: 'أخرى',       icon: '⭐' },
];

const DURATIONS = [
  { id: 'lt1h',   label: 'أقل من ساعة' },
  { id: '1-3h',   label: 'من ١–٣ ساعات' },
  { id: '3-8h',   label: 'من ٣–٨ ساعات (يوم)' },
  { id: '1-3d',   label: 'من يوم إلى ٣ أيام' },
  { id: '1w',     label: 'أسبوع تقريبًا' },
  { id: 'gt1w',   label: 'أكثر من أسبوع' },
];

// Initialize mock achievements


// ============================================================
// THEME & LANG
// ============================================================
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = state.theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('sts_theme', state.theme);
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
}

function applyLang() {
  const isAr = state.lang === 'ar';
  document.documentElement.setAttribute('lang', state.lang);
  document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('data-lang', state.lang);
  const label = document.getElementById('lang-label');
  if (label) label.textContent = isAr ? 'EN' : 'ع';
  const authBtn = document.getElementById('auth-lang-btn');
  if (authBtn) authBtn.textContent = isAr ? 'EN' : 'ع';
  localStorage.setItem('sts_lang', state.lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (T[state.lang][key]) el.textContent = T[state.lang][key];
  });
}

function toggleLang() {
  state.lang = state.lang === 'ar' ? 'en' : 'ar';
  applyLang();
  if (state.currentUser) renderCurrentPage();
}

// ============================================================
// AUTH
// ============================================================
function showScreen(id) {
  ['login-form','register-form','forgot-form'].forEach(s => {
    document.getElementById(s)?.classList.add('hidden');
  });
  document.getElementById(id)?.classList.remove('hidden');
}

function fillDemo(email) {
  document.getElementById('login-email').value = email;
  document.getElementById('login-password').value = '123456';
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pwd   = document.getElementById('login-password').value;
  const err   = document.getElementById('login-error');

  if (!email || !pwd) { showError(err, 'يرجى إدخال البريد وكلمة المرور'); return; }

  const user = DEMO_USERS[email];
  if (!user || pwd !== '123456') { showError(err, 'البريد أو كلمة المرور غير صحيحة'); return; }

  err.classList.add('hidden');
  state.currentUser = { ...user, email };
  state.currentRole = user.role;

  if (!user.setupDone && user.role === 'student') {
    goToSetup();
  } else {
    goToApp();
  }
}

function handleRegister() {
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pwd   = document.getElementById('reg-password').value;
  const err   = document.getElementById('reg-error');

  if (!name || !email || !pwd) { showError(err, 'يرجى ملء جميع الحقول'); return; }
  if (!email.endsWith('@s.mu.edu.sa')) { showError(err, 'يجب أن ينتهي البريد بـ @s.mu.edu.sa'); return; }
  if (pwd.length < 6) { showError(err, 'كلمة المرور يجب أن تكون ٦ أحرف على الأقل'); return; }

  err.classList.add('hidden');
  state.currentUser = { id: 'new_' + Date.now(), name, email, role: 'student', setupDone: false };
  state.currentRole = 'student';
  showToast('تم إنشاء الحساب بنجاح ✓');
  goToSetup();
}

function handleForgot() {
  const email = document.getElementById('forgot-email').value.trim();
  const msg   = document.getElementById('forgot-msg');
  if (!email) { return; }
  msg.textContent = 'تم إرسال رابط الاستعادة إلى ' + email;
  msg.classList.remove('hidden');
  setTimeout(() => showScreen('login-form'), 3000);
}

function handleLogout() {
  state.currentUser = null;
  state.currentRole = null;
  document.getElementById('app-screen').classList.add('hidden');
  document.getElementById('auth-screen').classList.remove('hidden');
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  showScreen('login-form');
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

// ============================================================
// SETUP
// ============================================================
function goToSetup() {
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('setup-screen').classList.remove('hidden');
}

function setupNext(step) {
  [1,2,3].forEach(n => {
    document.getElementById('setup-step-' + n)?.classList.add('hidden');
    const s = document.querySelector('.setup-step[data-step="' + n + '"]');
    if (s) { s.classList.remove('active','done'); if (n < step) s.classList.add('done'); }
  });
  const activePanel = document.getElementById('setup-step-' + step);
  if (activePanel) activePanel.classList.remove('hidden');
  const activeStep = document.querySelector('.setup-step[data-step="' + step + '"]');
  if (activeStep) activeStep.classList.add('active');

  if (step === 3) {
    document.getElementById('setup-review').innerHTML = `
      <div><strong>الكلية:</strong> ${document.getElementById('s-college')?.value || '—'}</div>
      <div><strong>التخصص:</strong> ${document.getElementById('s-major')?.value || '—'}</div>
      <div><strong>القسم:</strong> ${document.getElementById('s-dept')?.value || '—'}</div>
      <div><strong>بداية التدريب:</strong> ${document.getElementById('s-start')?.value || '—'}</div>
      <div><strong>نهاية التدريب:</strong> ${document.getElementById('s-end')?.value || '—'}</div>
      <div><strong>المشرف:</strong> ${document.getElementById('s-supervisor')?.options[document.getElementById('s-supervisor')?.selectedIndex]?.text || '—'}</div>
    `;
  }
}

function completeSetup() {
  state.currentUser.setupDone = true;
  document.getElementById('setup-screen').classList.add('hidden');
  showToast('تم حفظ بياناتك بنجاح ✓');
  goToApp();
}

// ============================================================
// APP
// ============================================================
function goToApp() {
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('setup-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');
  renderSidebar();
  navigate('dashboard');
}

// ============================================================
// SIDEBAR
// ============================================================
const NAV_ITEMS = {
  student: [
    { id: 'dashboard',        icon: '🏠', label: 'لوحة التحكم', labelEn: 'Dashboard' },
    { id: 'achievements',     icon: '🏆', label: 'الإنجازات', labelEn: 'Achievements' },
    { id: 'achievements-new', icon: '➕', label: 'إضافة إنجاز', labelEn: 'New Achievement' },
    { id: 'reports',          icon: '📄', label: 'التقارير', labelEn: 'Reports' },
    { id: 'notifications',    icon: '🔔', label: 'التنبيهات', labelEn: 'Notifications' },
    { id: 'profile',          icon: '👤', label: 'الملف الشخصي', labelEn: 'Profile' },
  ],
  supervisor: [
    { id: 'supervisor',    icon: '🔍', label: 'لوحة المشرف', labelEn: 'Supervisor' },
    { id: 'notifications', icon: '🔔', label: 'التنبيهات', labelEn: 'Notifications' },
    { id: 'profile',       icon: '👤', label: 'الملف الشخصي', labelEn: 'Profile' },
  ],
  admin: [
    { id: 'admin',         icon: '⚙️', label: 'لوحة المسؤول', labelEn: 'Admin' },
    { id: 'students',      icon: '🎓', label: 'الطلاب', labelEn: 'Students' },
    { id: 'notifications', icon: '🔔', label: 'التنبيهات', labelEn: 'Notifications' },
    { id: 'profile',       icon: '👤', label: 'الملف الشخصي', labelEn: 'Profile' },
  ],
};

function renderSidebar() {
  const u = state.currentUser;
  if (!u) return;
  const av = document.getElementById('sidebar-avatar');
  if (av) av.textContent = u.name.charAt(0);
  const nm = document.getElementById('sidebar-name');
  if (nm) nm.textContent = u.name;
  const rb = document.getElementById('sidebar-role-badge');
  if (rb) rb.textContent = { student:'طالب', supervisor:'مشرف', admin:'مسؤول' }[u.role];

  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;
  const items = NAV_ITEMS[u.role] || [];
  nav.innerHTML = items.map(item => `
    <button class="nav-item ${state.currentPage === item.id ? 'active' : ''}" onclick="navigate('${item.id}')">
      <span class="nav-icon">${item.icon}</span>
      <span>${state.lang === 'en' ? item.labelEn : item.label}</span>
    </button>
  `).join('');

  const unread = state.notifications.filter(n => !n.is_read).length;
  document.getElementById('notif-count').textContent = unread;
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  sb.classList.toggle('open');
  ov.classList.toggle('hidden');
}

// ============================================================
// NAVIGATION
// ============================================================
function navigate(page) {
  if (page === 'achievements-new') { openWizard(); return; }
  state.currentPage = page;
  renderSidebar();
  renderCurrentPage();
  const sb = document.getElementById('sidebar');
  if (sb.classList.contains('open')) toggleSidebar();
}

function renderCurrentPage() {
  const pageTitles = {
    dashboard: 'لوحة التحكم', achievements: 'الإنجازات',
    reports: 'التقارير', notifications: 'التنبيهات', profile: 'الملف الشخصي',
    supervisor: 'لوحة المشرف', admin: 'لوحة المسؤول', students: 'الطلاب',
  };
  const title = document.getElementById('page-title');
  if (title) title.textContent = pageTitles[state.currentPage] || '';

  const container = document.getElementById('page-container');
  if (!container) return;

  const pages = {
    dashboard:     renderDashboard,
    achievements:  renderAchievements,
    reports:       renderReports,
    notifications: renderNotifications,
    profile:       renderProfile,
    supervisor:    renderSupervisor,
    admin:         renderAdmin,
    students:      renderStudents,
  };

  const fn = pages[state.currentPage];
  if (fn) container.innerHTML = fn();
  else container.innerHTML = '<div class="empty-state"><div class="empty-icon">🚧</div><div class="empty-title">قيد التطوير</div></div>';

  afterRender();
}

function afterRender() {
  // Animate stat values
  document.querySelectorAll('.stat-value[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const inc = Math.ceil(target / 20);
    const t = setInterval(() => {
      current = Math.min(current + inc, target);
      el.textContent = current;
      if (current >= target) clearInterval(t);
    }, 40);
  });

  // Animate chart bars
  document.querySelectorAll('.chart-bar[data-h]').forEach(el => {
    const h = el.getAttribute('data-h');
    setTimeout(() => { el.style.height = h + 'px'; }, 100);
  });
}

// ============================================================
// PAGES
// ============================================================

// ---- DASHBOARD ----
function renderDashboard() {
  const approved = state.achievements.filter(a => a.status === 'approved').length;
  const pending  = state.achievements.filter(a => a.status === 'pending').length;
  const rejected = state.achievements.filter(a => a.status === 'rejected').length;
  const total    = state.achievements.length;

  const chartData = [
    { label: 'برمجة', h: 90 }, { label: 'تصميم', h: 55 }, { label: 'ذكاء', h: 75 },
    { label: 'بيانات', h: 40 }, { label: 'أمن', h: 60 }, { label: 'أخرى', h: 30 },
  ];

  return `
    <div class="page-header">
      <div>
        <div class="page-heading">مرحبًا، ${state.currentUser.name.split(' ')[0]} 👋</div>
        <div class="page-subheading">إليك ملخص نشاطك التدريبي</div>
      </div>
      <button class="btn btn-primary" onclick="openWizard()">➕ إنجاز جديد</button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-value" data-target="${total}">0</div>
        <div class="stat-label">إجمالي الإنجازات</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-value" data-target="${approved}">0</div>
        <div class="stat-label">إنجازات معتمدة</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-value" data-target="${pending}">0</div>
        <div class="stat-label">قيد المراجعة</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-value" data-target="${Math.round((approved/Math.max(total,1))*100)}">0</div>
        <div class="stat-label">نسبة الاعتماد %</div>
      </div>
    </div>

    <div class="section-grid">
      <div class="card">
        <div class="card-header">
          <div class="card-title">📈 نشاط الإنجازات حسب المجال</div>
        </div>
        <div class="chart-bar-group">
          ${chartData.map(d => `
            <div class="chart-bar-wrap">
              <div class="chart-bar" data-h="${d.h}" style="height:0px"></div>
              <div class="chart-label">${d.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">⏱️ آخر النشاطات</div>
        </div>
        <div class="timeline">
          ${state.achievements.slice(0,3).map(a => `
            <div class="tl-item">
              <div class="tl-dot tl-${a.status}">${a.status==='approved'?'✓':a.status==='rejected'?'✕':'⏳'}</div>
              <div>
                <div class="tl-text">${a.description}</div>
                <div class="tl-time">${a.created_at} · <span class="badge badge-${a.status}">${statusLabel(a.status)}</span></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ---- ACHIEVEMENTS ----
function renderAchievements() {
  const filters = ['الكل', 'معتمد', 'قيد المراجعة', 'مرفوض'];
  const filterMap = { 'الكل': null, 'معتمد': 'approved', 'قيد المراجعة': 'pending', 'مرفوض': 'rejected' };

  return `
    <div class="page-header">
      <div>
        <div class="page-heading">الإنجازات</div>
        <div class="page-subheading">${state.achievements.length} إنجاز موثّق</div>
      </div>
      <button class="btn btn-primary" onclick="openWizard()">➕ إنجاز جديد</button>
    </div>

    <div class="filter-bar">
      ${filters.map(f => `
        <button class="filter-btn ${f==='الكل'?'active':''}"
          onclick="filterAchievements('${filterMap[f]}', this)">${f}</button>
      `).join('')}
      <input type="text" class="search-input" placeholder="بحث..." oninput="searchAchievements(this.value)" />
    </div>

    <div class="achievement-list" id="ach-list">
      ${renderAchievementItems(state.achievements)}
    </div>
  `;
}

function renderAchievementItems(list) {
  if (list.length === 0) return `
    <div class="empty-state">
      <div class="empty-icon">🏆</div>
      <div class="empty-title">لا توجد إنجازات</div>
      <div class="empty-desc">ابدأ بتوثيق إنجازك الأول</div>
    </div>`;

  return list.map(a => `
    <div class="achievement-item" onclick="viewAchievement('${a.id}')">
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-info">
        <div class="ach-title">${a.description}</div>
        <div class="ach-meta">${a.categoryLabel} · ${a.created_at}</div>
      </div>
      <div class="ach-actions">
        <span class="badge badge-${a.status}">${statusLabel(a.status)}</span>
        ${state.currentUser.role !== 'student' || a.status === 'pending' ? `
          <button class="btn btn-sm btn-ghost" onclick="event.stopPropagation(); editAchievement('${a.id}')">✏️</button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function filterAchievements(status, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const list = status ? state.achievements.filter(a => a.status === status) : state.achievements;
  const el = document.getElementById('ach-list');
  if (el) el.innerHTML = renderAchievementItems(list);
}

function searchAchievements(q) {
  const list = q ? state.achievements.filter(a => a.description.includes(q) || a.categoryLabel.includes(q)) : state.achievements;
  const el = document.getElementById('ach-list');
  if (el) el.innerHTML = renderAchievementItems(list);
}

function viewAchievement(id) {
  const a = state.achievements.find(x => x.id === id);
  if (!a) return;
  state.selectedAchievementId = id;

  const container = document.getElementById('page-container');
  const title = document.getElementById('page-title');
  if (title) title.textContent = 'تفاصيل الإنجاز';

  container.innerHTML = `
    <div class="page-header">
      <button class="btn btn-ghost" onclick="navigate('achievements')">← العودة</button>
      ${a.status === 'pending' ? `<button class="btn btn-ghost" onclick="editAchievement('${a.id}')">✏️ تعديل</button>` : ''}
    </div>

    <div class="card" style="margin-bottom:1rem">
      <div class="card-header">
        <div class="card-title">${a.icon} ${a.description}</div>
        <span class="badge badge-${a.status}">${statusLabel(a.status)}</span>
      </div>

      <div class="generated-statement">${a.ai_description}</div>

      <div class="divider"></div>
      <div class="section-grid" style="gap:.75rem;margin-top:.5rem">
        <div><div class="section-heading">المجال</div><div>${a.categoryLabel}</div></div>
        <div><div class="section-heading">نوع العمل</div><div>${a.work_type==='team'?'ضمن فريق':'فردي'}</div></div>
        <div><div class="section-heading">المدة</div><div>${DURATIONS.find(d=>d.id===a.duration)?.label||a.duration}</div></div>
        <div><div class="section-heading">الأثر</div><div>${a.outcome}</div></div>
      </div>

      ${a.supervisor_notes ? `
        <div class="divider"></div>
        <div class="section-heading">ملاحظات المشرف</div>
        <div style="background:var(--surface-2);padding:.75rem 1rem;border-radius:8px;font-size:.875rem;border:1px solid var(--border)">${a.supervisor_notes}</div>
      ` : ''}
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">📎 الأدلة</div>
        <button class="btn btn-sm btn-ghost" onclick="openModal('evidence-modal')">+ إضافة دليل</button>
      </div>
      <div class="evidence-list" id="ev-list">
        ${renderEvidenceList(a.evidence)}
      </div>
    </div>
  `;
}

function renderEvidenceList(evidence) {
  if (!evidence || evidence.length === 0) return `<div class="empty-state" style="padding:1.5rem">لا توجد أدلة مضافة</div>`;
  return evidence.map(e => `
    <div class="evidence-item" style="flex-direction:column;align-items:stretch;gap:.6rem">
      <div style="display:flex;align-items:center;gap:.75rem">
        <div class="ev-icon">${e.icon}</div>
        <div style="flex:1;min-width:0">
          ${e.url
            ? `<a href="${e.url}" target="_blank" class="ev-name" style="color:var(--navy);text-decoration:underline">${e.name}</a>`
            : `<div class="ev-name">${e.name}</div>`
          }
          <div class="ev-type">${e.type}${e.fileSize ? ' · ' + e.fileSize : ''}</div>
        </div>
        <button class="ev-del" onclick="removeEvidence('${e.id}')">✕</button>
      </div>
      ${e.dataURL ? `<img src="${e.dataURL}" alt="${e.name}" style="max-width:100%;max-height:180px;border-radius:8px;border:1px solid var(--border);object-fit:contain" />` : ''}
    </div>
  `).join('');
}

// ============================================================
// EVIDENCE — رفع ملفات حقيقي
// ============================================================

// الملف المحدد حاليًا (كـ DataURL للمعاينة)
let _selectedFile = null;

function switchEvidenceTab(tab) {
  document.getElementById('ev-panel-file').classList.toggle('hidden', tab !== 'file');
  document.getElementById('ev-panel-link').classList.toggle('hidden', tab !== 'link');
  document.getElementById('tab-file').classList.toggle('active', tab === 'file');
  document.getElementById('tab-link').classList.toggle('active', tab === 'link');
  _selectedFile = null;
  const preview = document.getElementById('upload-preview');
  if (preview) { preview.innerHTML = ''; preview.classList.add('hidden'); }
  const zone = document.getElementById('upload-zone');
  if (zone) zone.style.borderColor = '';
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  // تحقق الحجم (10MB)
  if (file.size > 10 * 1024 * 1024) {
    showToast('حجم الملف يتجاوز 10MB');
    e.target.value = '';
    return;
  }

  _selectedFile = file;

  // تحديث منطقة الرفع
  const zone   = document.getElementById('upload-zone');
  const icon   = document.getElementById('upload-icon');
  const label  = document.getElementById('upload-label');
  const preview = document.getElementById('upload-preview');

  const typeIcons = { 'image': '🖼️', 'application/pdf': '📄', 'video': '🎬' };
  const cat = file.type.startsWith('image/') ? 'image' : file.type === 'application/pdf' ? 'application/pdf' : file.type.startsWith('video/') ? 'video' : 'file';
  const ico = typeIcons[cat] || '📎';

  if (icon)  icon.textContent  = ico;
  if (label) label.textContent = file.name;
  if (zone)  zone.style.borderColor = 'var(--gold)';

  // معاينة الصور
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = ev => {
      preview.innerHTML = `<img src="${ev.target.result}" alt="معاينة" style="max-width:100%;max-height:160px;border-radius:8px;border:1px solid var(--border);object-fit:contain" />`;
      preview.classList.remove('hidden');
      // حفظ dataURL لاستخدامه في التقرير
      _selectedFile._dataURL = ev.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = `<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:8px;padding:.65rem 1rem;font-size:.82rem;color:var(--text-2)">${ico} ${file.name} — ${(file.size/1024).toFixed(0)} KB</div>`;
    preview.classList.remove('hidden');
  }
}

// دعم السحب والإفلات
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('dragover', e => {
    if (document.getElementById('evidence-modal')?.classList.contains('hidden')) return;
    e.preventDefault();
  });
  document.body.addEventListener('drop', e => {
    const modal = document.getElementById('evidence-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (!file) return;
    const input = document.getElementById('ev-file-input');
    // نستخدم DataTransfer لحقن الملف في الـ input
    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
    handleFileSelect({ target: input });
  });
});

function addEvidenceFile() {
  if (!_selectedFile) { showToast('اختر ملفًا أولًا'); return; }
  const name = document.getElementById('ev-name-file')?.value.trim() || _selectedFile.name;
  const cat  = _selectedFile.type.startsWith('image/') ? 'image'
             : _selectedFile.type === 'application/pdf' ? 'pdf'
             : _selectedFile.type.startsWith('video/') ? 'video' : 'file';
  const icons = { image:'🖼️', pdf:'📄', video:'🎬', file:'📎' };

  const a = state.achievements.find(x => x.id === state.selectedAchievementId);
  if (!a) return;

  a.evidence.push({
    id: 'e' + Date.now(),
    name,
    type: cat,
    icon: icons[cat],
    dataURL: _selectedFile._dataURL || null,  // للمعاينة والطباعة
    fileSize: ((_selectedFile.size)/1024).toFixed(0) + ' KB',
  });

  _selectedFile = null;
  closeModal('evidence-modal');
  // إعادة ضبط النموذج
  const fi = document.getElementById('ev-file-input'); if (fi) fi.value = '';
  const lbl = document.getElementById('upload-label'); if (lbl) lbl.textContent = 'اضغط لاختيار الملف أو اسحبه هنا';
  const ico = document.getElementById('upload-icon'); if (ico) ico.textContent = '📎';
  const pre = document.getElementById('upload-preview'); if (pre) { pre.innerHTML=''; pre.classList.add('hidden'); }
  const zn  = document.getElementById('upload-zone'); if (zn) zn.style.borderColor = '';
  const nm  = document.getElementById('ev-name-file'); if (nm) nm.value = '';

  document.getElementById('ev-list').innerHTML = renderEvidenceList(a.evidence);
  showToast('تم إضافة الدليل ✓');
}

function addEvidenceLink() {
  const name = document.getElementById('ev-name-link')?.value.trim();
  const url  = document.getElementById('ev-url-link')?.value.trim();
  if (!url) { showToast('أدخل الرابط'); return; }

  const a = state.achievements.find(x => x.id === state.selectedAchievementId);
  if (!a) return;

  a.evidence.push({
    id: 'e' + Date.now(),
    name: name || url,
    type: 'link',
    icon: '🔗',
    url,
  });

  closeModal('evidence-modal');
  const nm  = document.getElementById('ev-name-link'); if (nm) nm.value = '';
  const lnk = document.getElementById('ev-url-link');  if (lnk) lnk.value = '';
  document.getElementById('ev-list').innerHTML = renderEvidenceList(a.evidence);
  showToast('تم إضافة الرابط ✓');
}

function removeEvidence(eid) {
  const a = state.achievements.find(x => x.id === state.selectedAchievementId);
  if (a) {
    a.evidence = a.evidence.filter(e => e.id !== eid);
    document.getElementById('ev-list').innerHTML = renderEvidenceList(a.evidence);
  }
}

function editAchievement(id) {
  const a = state.achievements.find(x => x.id === id);
  if (!a) return;
  state.selectedAchievementId = id;
  const container = document.getElementById('page-container');
  const title = document.getElementById('page-title');
  if (title) title.textContent = 'تعديل الإنجاز';
  container.innerHTML = `
    <div class="page-header">
      <button class="btn btn-ghost" onclick="navigate('achievements')">← العودة</button>
    </div>
    <div class="card">
      <div class="form-group">
        <label>الوصف</label>
        <input type="text" class="form-input" id="edit-desc" value="${a.description}" />
      </div>
      <div class="form-group">
        <label>الأثر / النتيجة</label>
        <input type="text" class="form-input" id="edit-outcome" value="${a.outcome}" />
      </div>
      <div class="form-group">
        <label>نوع العمل</label>
        <select class="form-input form-select" id="edit-wtype">
          <option value="solo" ${a.work_type==='solo'?'selected':''}>فردي</option>
          <option value="team" ${a.work_type==='team'?'selected':''}>ضمن فريق</option>
        </select>
      </div>
      <button class="btn btn-primary" onclick="saveEdit()">حفظ التعديلات ✓</button>
    </div>
  `;
}

function saveEdit() {
  const a = state.achievements.find(x => x.id === state.selectedAchievementId);
  if (a) {
    a.description = document.getElementById('edit-desc').value;
    a.outcome     = document.getElementById('edit-outcome').value;
    a.work_type   = document.getElementById('edit-wtype').value;
    showToast('تم حفظ التعديلات ✓');
    navigate('achievements');
  }
}

// ---- REPORTS ----
function renderReports() {
  const total    = state.achievements.length;
  const approved = state.achievements.filter(a => a.status === 'approved');
  const pending  = state.achievements.filter(a => a.status === 'pending');
  const rejected = state.achievements.filter(a => a.status === 'rejected');

  // شروط الإتاحة: يجب وجود إنجاز معتمد واحد على الأقل + لا إنجازات معلّقة
  const hasApproved  = approved.length > 0;
  const hasPending   = pending.length > 0;
  const canGen       = hasApproved && !hasPending;

  // تحديد سبب المنع لعرضه للمستخدم
  let blockReason = '';
  if (total === 0) {
    blockReason = 'لم تُوثّق أي إنجازات بعد. أضف إنجازاتك أولًا ثم أرسلها للمشرف لمراجعتها.';
  } else if (!hasApproved && !hasPending) {
    blockReason = 'جميع إنجازاتك مرفوضة. راجع ملاحظات المشرف وأعد توثيق الإنجازات.';
  } else if (!hasApproved && hasPending) {
    blockReason = `إنجازاتك (${pending.length}) بانتظار موافقة المشرف. لا يمكن توليد التقرير قبل اعتماد إنجاز واحد على الأقل.`;
  } else if (hasApproved && hasPending) {
    blockReason = `يوجد ${pending.length} إنجاز لا يزال قيد المراجعة. يجب أن تُراجَع جميع الإنجازات قبل توليد التقرير.`;
  }

  return `
    <div class="page-header">
      <div>
        <div class="page-heading">التقارير الرسمية</div>
        <div class="page-subheading">يُشترط اعتماد المشرف لجميع الإنجازات قبل توليد التقرير</div>
      </div>
    </div>

    <!-- بطاقة حالة الشروط -->
    <div class="card" style="margin-bottom:1.25rem;border-color:${canGen ? 'var(--success)' : 'var(--warning)'}; background:${canGen ? 'var(--success-bg)' : 'var(--warning-bg)'}">
      <div style="display:flex;align-items:flex-start;gap:.85rem">
        <div style="font-size:1.6rem;flex-shrink:0">${canGen ? '✅' : '🔒'}</div>
        <div>
          <div style="font-weight:700;color:${canGen ? 'var(--success)' : 'var(--warning)'};margin-bottom:.35rem">
            ${canGen ? 'التقرير جاهز للتوليد' : 'التقرير محظور حتى موافقة المشرف'}
          </div>
          ${!canGen ? `<div style="font-size:.85rem;color:var(--text-2)">${blockReason}</div>` : `<div style="font-size:.85rem;color:var(--text-2)">${approved.length} إنجاز معتمد من المشرف — يمكنك الآن توليد التقرير الرسمي.</div>`}
        </div>
      </div>
    </div>

    <!-- شريط تتبع الشروط -->
    <div class="card" style="margin-bottom:1.25rem">
      <div class="card-title" style="margin-bottom:1rem">📋 متطلبات توليد التقرير</div>
      <div style="display:flex;flex-direction:column;gap:.65rem">
        <div style="display:flex;align-items:center;gap:.75rem;font-size:.875rem">
          <div style="width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;flex-shrink:0;
            background:${total > 0 ? 'var(--success-bg)' : 'var(--surface-2)'};
            color:${total > 0 ? 'var(--success)' : 'var(--text-3)'};
            border:2px solid ${total > 0 ? 'var(--success)' : 'var(--border)'}">
            ${total > 0 ? '✓' : '○'}
          </div>
          <span style="color:${total > 0 ? 'var(--text)' : 'var(--text-3)'}">توثيق إنجاز واحد على الأقل</span>
          ${total > 0 ? `<span class="badge badge-info" style="margin-right:auto">${total} إنجاز</span>` : ''}
        </div>
        <div style="display:flex;align-items:center;gap:.75rem;font-size:.875rem">
          <div style="width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;flex-shrink:0;
            background:${hasApproved ? 'var(--success-bg)' : 'var(--surface-2)'};
            color:${hasApproved ? 'var(--success)' : 'var(--text-3)'};
            border:2px solid ${hasApproved ? 'var(--success)' : 'var(--border)'}">
            ${hasApproved ? '✓' : '○'}
          </div>
          <span style="color:${hasApproved ? 'var(--text)' : 'var(--text-3)'}">اعتماد المشرف لإنجاز واحد على الأقل</span>
          ${hasApproved ? `<span class="badge badge-approved" style="margin-right:auto">${approved.length} معتمد</span>` : ''}
        </div>
        <div style="display:flex;align-items:center;gap:.75rem;font-size:.875rem">
          <div style="width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;flex-shrink:0;
            background:${!hasPending ? 'var(--success-bg)' : 'var(--danger-bg)'};
            color:${!hasPending ? 'var(--success)' : 'var(--danger)'};
            border:2px solid ${!hasPending ? 'var(--success)' : 'var(--danger)'}">
            ${!hasPending ? '✓' : `${pending.length}`}
          </div>
          <span style="color:${!hasPending ? 'var(--text)' : 'var(--text-3)'}">لا توجد إنجازات قيد المراجعة</span>
          ${hasPending ? `<span class="badge badge-pending" style="margin-right:auto">${pending.length} معلّق</span>` : ''}
        </div>
      </div>
    </div>

    <!-- معاينة التقرير — تظهر فقط عند اكتمال الشروط -->
    ${canGen ? `
    <div class="report-preview">
      <div class="report-watermark">STS</div>
      <div class="report-header-section">
        <div class="report-logo">◈</div>
        <div class="report-title-block">
          <h3>تقرير التدريب الميداني</h3>
          <p>نادي الابتكار · جامعة المجمعة</p>
          <p>${state.currentUser.name} · ${new Date().getFullYear()}</p>
        </div>
        <div class="report-qr">QR</div>
      </div>

      <div class="section-heading">الإنجازات المعتمدة من المشرف</div>
      ${approved.map((a, i) => `
        <div style="margin-bottom:.85rem;padding-bottom:.85rem;border-bottom:1px solid var(--border)">
          <div style="display:flex;align-items:center;gap:.5rem;font-weight:700;color:var(--text);margin-bottom:.35rem">
            <span>${i+1}.</span>
            <span>${a.icon}</span>
            <span>${a.description}</span>
            <span class="badge badge-approved" style="margin-right:auto">✓ معتمد</span>
          </div>
          <div style="font-size:.82rem;color:var(--text-2);line-height:1.8">${a.ai_description}</div>
          ${a.supervisor_notes ? `<div style="margin-top:.5rem;font-size:.78rem;color:var(--success);background:var(--success-bg);padding:.4rem .7rem;border-radius:6px">ملاحظة المشرف: ${a.supervisor_notes}</div>` : ''}
        </div>
      `).join('')}

      <div class="divider"></div>
      <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
        <button class="btn btn-navy" onclick="downloadReport()">📥 تحميل التقرير PDF</button>
        <button class="btn btn-ghost" onclick="showToast('تم نسخ رابط QR ✓')">🔗 مشاركة الرابط</button>
      </div>
    </div>
    ` : `
    <!-- حالة الحظر — عرض تفسيري بدلاً من التقرير -->
    <div class="card" style="text-align:center;padding:2.5rem 1.5rem">
      <div style="font-size:3.5rem;margin-bottom:1rem">🔒</div>
      <div style="font-size:1rem;font-weight:700;color:var(--text);margin-bottom:.5rem">التقرير غير متاح بعد</div>
      <div style="font-size:.875rem;color:var(--text-2);max-width:400px;margin:0 auto .25rem;line-height:1.7">${blockReason}</div>
      ${hasPending ? `<div style="margin-top:1.25rem"><button class="btn btn-ghost" onclick="navigate('achievements')">عرض الإنجازات ←</button></div>` : ''}
      ${total === 0 ? `<div style="margin-top:1.25rem"><button class="btn btn-primary" onclick="openWizard()">➕ إضافة إنجاز</button></div>` : ''}
    </div>
    `}
  `;
}

// ---- DOWNLOAD REPORT ----
function downloadReport() {
  const approved = state.achievements.filter(a => a.status === 'approved');
  const user = state.currentUser;
  const date = new Date().toLocaleDateString('ar-SA', { year:'numeric', month:'long', day:'numeric' });
  const year = new Date().getFullYear();

  // بناء محتوى الإنجازات
  const achievementsHTML = approved.map((a, i) => `
    <div class="rpt-item">
      <div class="rpt-item-title">${i+1}. ${a.icon} ${a.description}</div>
      <div class="rpt-item-body">${a.ai_description}</div>
      <div class="rpt-item-meta">
        المجال: ${a.categoryLabel} &nbsp;·&nbsp;
        المدة: ${DURATIONS.find(d => d.id === a.duration)?.label || a.duration} &nbsp;·&nbsp;
        نوع العمل: ${a.work_type === 'team' ? 'ضمن فريق' : 'فردي'}
      </div>
      ${a.supervisor_notes ? `<div class="rpt-note">ملاحظة المشرف: ${a.supervisor_notes}</div>` : ''}
      ${a.evidence && a.evidence.filter(e => e.dataURL).map(e => `
        <div class="rpt-evidence-img">
          <div class="rpt-evidence-label">📎 ${e.name}</div>
          <img src="${e.dataURL}" alt="${e.name}" />
        </div>
      `).join('') || ''}
      ${a.evidence && a.evidence.filter(e => e.url).map(e => `
        <div class="rpt-evidence-link">🔗 <a href="${e.url}">${e.name}</a></div>
      `).join('') || ''}
    </div>
  `).join('');

  const printHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8"/>
  <title>تقرير التدريب — ${user.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; }
    body {
      font-family: 'Noto Kufi Arabic', sans-serif;
      font-size: 13px;
      color: #1a2035;
      background: #fff;
      padding: 0;
      direction: rtl;
    }
    @page { size: A4; margin: 20mm 15mm; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none; }
    }

    /* Header */
    .rpt-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-bottom: 1rem;
      border-bottom: 3px solid #C9A84C;
      margin-bottom: 1.5rem;
    }
    .rpt-logo {
      font-size: 2.8rem;
      color: #C9A84C;
      flex-shrink: 0;
    }
    .rpt-titles h1 { font-size: 1.2rem; font-weight: 800; color: #1B3A6B; }
    .rpt-titles p  { font-size: .8rem; color: #5a6380; margin-top:.2rem; }
    .rpt-qr {
      margin-right: auto;
      width: 75px; height: 75px;
      border: 2px solid #DDE1EE;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.8rem;
      background: #F5F6FA;
      color: #9aa0b8;
      font-size: .65rem;
      text-align: center;
      flex-direction: column;
      gap: .2rem;
    }

    /* Info grid */
    .rpt-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: .5rem 2rem;
      background: #F0F2F8;
      border-radius: 8px;
      padding: .85rem 1rem;
      margin-bottom: 1.5rem;
      font-size: .82rem;
    }
    .rpt-info-row { display: flex; gap: .5rem; }
    .rpt-info-label { color: #5a6380; font-weight: 600; flex-shrink: 0; }
    .rpt-info-value { color: #1a2035; }

    /* Section */
    .rpt-section-title {
      font-size: .72rem;
      font-weight: 700;
      color: #9aa0b8;
      text-transform: uppercase;
      letter-spacing: .08em;
      margin-bottom: .85rem;
      padding-bottom: .4rem;
      border-bottom: 1px solid #DDE1EE;
    }

    /* Achievement item */
    .rpt-item {
      margin-bottom: 1.25rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid #DDE1EE;
      page-break-inside: avoid;
    }
    .rpt-item:last-child { border-bottom: none; }
    .rpt-item-title {
      font-weight: 700;
      font-size: .95rem;
      color: #1B3A6B;
      margin-bottom: .4rem;
    }
    .rpt-item-body {
      font-size: .82rem;
      color: #3a4060;
      line-height: 1.9;
      margin-bottom: .4rem;
    }
    .rpt-item-meta {
      font-size: .75rem;
      color: #9aa0b8;
    }
    .rpt-note {
      margin-top: .4rem;
      font-size: .78rem;
      color: #1a8a5a;
      background: #e6f7f0;
      padding: .35rem .65rem;
      border-radius: 5px;
    }
    .rpt-evidence-img { margin-top: .65rem; }
    .rpt-evidence-img img {
      max-width: 100%;
      max-height: 200px;
      object-fit: contain;
      border-radius: 6px;
      border: 1px solid #DDE1EE;
      display: block;
      margin-top: .3rem;
    }
    .rpt-evidence-label { font-size: .75rem; color: #5a6380; }
    .rpt-evidence-link  { font-size: .78rem; color: #1B3A6B; margin-top:.4rem; }
    .rpt-evidence-link a { color: #1B3A6B; }

    /* Badge */
    .rpt-badge {
      display: inline-block;
      padding: .15rem .55rem;
      border-radius: 20px;
      font-size: .7rem;
      font-weight: 700;
      background: #e6f7f0;
      color: #1a8a5a;
      margin-bottom: .5rem;
    }

    /* Footer */
    .rpt-footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 2px solid #C9A84C;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: .75rem;
      color: #9aa0b8;
    }
    .rpt-signature {
      text-align: center;
      border-top: 1px solid #DDE1EE;
      padding-top: .4rem;
      width: 160px;
      font-size: .8rem;
      color: #5a6380;
    }

    /* Print button */
    .print-btn {
      position: fixed;
      bottom: 1.5rem;
      left: 1.5rem;
      background: #1B3A6B;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: .75rem 1.5rem;
      font-size: .9rem;
      font-family: inherit;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(27,58,107,.3);
      z-index: 999;
    }
    .print-btn:hover { background: #2a4f8f; }
  </style>
</head>
<body>

  <button class="print-btn no-print" onclick="window.print()">🖨️ طباعة / حفظ PDF</button>

  <!-- Header -->
  <div class="rpt-header">
    <div class="rpt-logo">◈</div>
    <div class="rpt-titles">
      <h1>تقرير التدريب </h1>
      <p>مركز الابتكار · جامعة المجمعة · ${year}</p>
    </div>
    <div class="rpt-qr">
      <span style="font-size:1.4rem">▦</span>
      <span>QR</span>
    </div>
  </div>

  <!-- Student Info -->
  <div class="rpt-info">
    <div class="rpt-info-row"><span class="rpt-info-label">الاسم:</span><span class="rpt-info-value">${user.name}</span></div>
    <div class="rpt-info-row"><span class="rpt-info-label">البريد:</span><span class="rpt-info-value" style="direction:ltr;text-align:right">${user.email}</span></div>
    <div class="rpt-info-row"><span class="rpt-info-label">تاريخ التقرير:</span><span class="rpt-info-value">${date}</span></div>
    <div class="rpt-info-row"><span class="rpt-info-label">الإنجازات المعتمدة:</span><span class="rpt-info-value">${approved.length}</span></div>
  </div>

  <!-- Achievements -->
  <div class="rpt-section-title">الإنجازات المعتمدة من المشرف</div>
  ${achievementsHTML}

  <!-- Footer -->
  <div class="rpt-footer">
    <div>
      <div>مركز الابتكار — جامعة المجمعة</div>
      <div>تم توليد هذا التقرير بتاريخ ${date}</div>
    </div>
    <div class="rpt-signature">توقيع المشرف</div>
  </div>

</body>
</html>`;

  // فتح نافذة جديدة وطباعة
  const win = window.open('', '_blank', 'width=900,height=700');
  if (!win) { showToast('السماح بالنوافذ المنبثقة في المتصفح'); return; }
  win.document.write(printHTML);
  win.document.close();
  win.onload = () => {
    setTimeout(() => win.print(), 600);
  };
}


function renderNotifications() {
  const unread = state.notifications.filter(n => !n.is_read).length;
  return `
    <div class="page-header">
      <div>
        <div class="page-heading">التنبيهات</div>
        <div class="page-subheading">${unread} تنبيه غير مقروء</div>
      </div>
      ${unread > 0 ? `<button class="btn btn-ghost btn-sm" onclick="markAllRead()">تعليم الكل كمقروء</button>` : ''}
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      ${state.notifications.length === 0 ? `<div class="empty-state"><div class="empty-icon">🔔</div><div class="empty-title">لا توجد تنبيهات</div></div>` :
        state.notifications.map(n => `
          <div class="notif-item ${n.is_read ? '' : 'unread'}" onclick="readNotif('${n.id}')">
            <div class="notif-dot" style="${n.is_read?'opacity:.3':''}"></div>
            <div>
              <div class="notif-text" style="font-weight:${n.is_read?400:600}">${n.title}</div>
              <div class="notif-text">${n.message}</div>
              <div class="notif-time">${n.time}</div>
            </div>
          </div>
        `).join('')
      }
    </div>
  `;
}

function markAllRead() {
  state.notifications.forEach(n => n.is_read = true);
  document.getElementById('notif-count').textContent = '0';
  renderCurrentPage();
}

function readNotif(id) {
  const n = state.notifications.find(x => x.id === id);
  if (n) n.is_read = true;
  const unread = state.notifications.filter(x => !x.is_read).length;
  document.getElementById('notif-count').textContent = unread;
  renderCurrentPage();
}

// ---- PROFILE ----
function renderProfile() {
  const u = state.currentUser;
  return `
    <div class="page-heading" style="margin-bottom:1rem">الملف الشخصي</div>
    <div class="profile-avatar-section">
      <div class="profile-avatar-lg">${u.name.charAt(0)}</div>
      <div class="profile-name">${u.name}</div>
      <div class="profile-email">${u.email}</div>
      <span class="badge badge-info">${{student:'طالب', supervisor:'مشرف', admin:'مسؤول'}[u.role]}</span>
    </div>

    <div class="card" style="margin-bottom:1rem">
      <div class="card-title" style="margin-bottom:1rem">⚙️ إعدادات الحساب</div>
      <div class="form-group">
        <label>الاسم الكامل</label>
        <input type="text" class="form-input" value="${u.name}" id="prof-name" />
      </div>
      <div class="form-group">
        <label>البريد الإلكتروني</label>
        <input type="text" class="form-input" value="${u.email}" readonly style="opacity:.6" />
      </div>
      <div class="form-group">
        <label>كلمة المرور الجديدة</label>
        <input type="password" class="form-input" placeholder="••••••" id="prof-pwd" />
      </div>
      <button class="btn btn-primary" onclick="saveProfile()">حفظ التغييرات</button>
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:1rem">🎨 التفضيلات</div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--border)">
        <span>الوضع الليلي</span>
        <button class="btn btn-ghost btn-sm" onclick="toggleTheme()">${state.theme === 'dark' ? '☀️ نهاري' : '🌙 ليلي'}</button>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:.5rem 0">
        <span>اللغة</span>
        <button class="btn btn-ghost btn-sm" onclick="toggleLang()">${state.lang === 'ar' ? 'English' : 'العربية'}</button>
      </div>
    </div>
  `;
}

function saveProfile() {
  const name = document.getElementById('prof-name')?.value;
  if (name) state.currentUser.name = name;
  renderSidebar();
  showToast('تم حفظ التغييرات ✓');
}

// ---- SUPERVISOR ----
function renderSupervisor() {
  const myStudents = state.students.slice(0, 2); // Mock: supervisor's students
  const pending = state.achievements.filter(a => a.status === 'pending');

  return `
    <div class="page-header">
      <div>
        <div class="page-heading">لوحة المشرف</div>
        <div class="page-subheading">${myStudents.length} طلاب تحت إشرافي</div>
      </div>
    </div>

    <div class="stats-grid" style="margin-bottom:1.5rem">
      <div class="stat-card"><div class="stat-icon">🎓</div><div class="stat-value" data-target="${myStudents.length}">0</div><div class="stat-label">طلابي</div></div>
      <div class="stat-card"><div class="stat-icon">⏳</div><div class="stat-value" data-target="${pending.length}">0</div><div class="stat-label">بانتظار المراجعة</div></div>
      <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-value" data-target="${state.achievements.filter(a=>a.status==='approved').length}">0</div><div class="stat-label">معتمدة</div></div>
    </div>

    <div class="card" style="margin-bottom:1rem">
      <div class="card-header"><div class="card-title">⏳ إنجازات بانتظار المراجعة</div></div>
      ${pending.length === 0 ? `<div class="empty-state" style="padding:1.5rem"><div class="empty-icon">✅</div><div class="empty-title">لا توجد إنجازات معلقة</div></div>` :
        pending.map(a => `
          <div class="achievement-item" style="margin-bottom:.5rem">
            <div class="ach-icon">${a.icon}</div>
            <div class="ach-info">
              <div class="ach-title">${a.description}</div>
              <div class="ach-meta">${a.categoryLabel}   </div>
            </div>
            <div class="ach-actions">
              <button class="btn btn-sm btn-success" onclick="openApprovalModal('${a.id}', 'approve')">✓ اعتماد</button>
              <button class="btn btn-sm btn-danger" onclick="openApprovalModal('${a.id}', 'reject')">✕ رفض</button>
            </div>
          </div>
        `).join('')
      }
    </div>

    <div class="card">
      <div class="card-header"><div class="card-title">🎓 طلابي</div></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>الطالب</th><th>الكلية</th><th>الإنجازات</th><th>معتمد</th><th>معلّق</th></tr></thead>
          <tbody>
            ${myStudents.map(s => `
              <tr>
                <td><strong>${s.name}</strong><div style="font-size:.75rem;color:var(--text-3)">${s.uni_id}</div></td>
                <td>${s.college}</td>
                <td><span class="badge badge-info">${s.achievements}</span></td>
                <td><span class="badge badge-approved">${s.approved}</span></td>
                <td><span class="badge badge-${s.pending>0?'pending':'approved'}">${s.pending}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openApprovalModal(id, action) {
  const a = state.achievements.find(x => x.id === id);
  if (!a) return;
  state.approvalTarget = id;
  document.getElementById('approval-modal-title').textContent = action === 'approve' ? 'اعتماد الإنجاز' : 'رفض الإنجاز';
  document.getElementById('approval-modal-content').innerHTML = `
    <div class="card" style="border-color:var(--border)">
      <div style="font-weight:600;margin-bottom:.5rem">${a.icon} ${a.description}</div>
      <div style="font-size:.82rem;color:var(--text-2)">${a.ai_description}</div>
    </div>
  `;
  document.getElementById('supervisor-notes').value = '';
  openModal('approval-modal');
}

function reviewAchievement(status) {
  const a = state.achievements.find(x => x.id === state.approvalTarget);
  if (a) {
    a.status = status;
    a.supervisor_notes = document.getElementById('supervisor-notes').value;
    closeModal('approval-modal');
    showToast(status === 'approved' ? 'تم اعتماد الإنجاز ✓' : 'تم رفض الإنجاز');
    renderCurrentPage();
  }
}

// ---- ADMIN ----
function renderAdmin() {
  return `
    <div class="page-header">
      <div>
        <div class="page-heading">لوحة المسؤول</div>
        <div class="page-subheading">إدارة كاملة للمنصة</div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card"><div class="stat-icon">🎓</div><div class="stat-value" data-target="${state.students.length}">0</div><div class="stat-label">إجمالي الطلاب</div></div>
      <div class="stat-card"><div class="stat-icon">🏆</div><div class="stat-value" data-target="${state.achievements.length}">0</div><div class="stat-label">إجمالي الإنجازات</div></div>
      <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-value" data-target="${state.achievements.filter(a=>a.status==='approved').length}">0</div><div class="stat-label">معتمدة</div></div>
      <div class="stat-card"><div class="stat-icon">⏳</div><div class="stat-value" data-target="${state.achievements.filter(a=>a.status==='pending').length}">0</div><div class="stat-label">معلّقة</div></div>
    </div>

    <div class="card" style="margin-bottom:1rem">
      <div class="card-header">
        <div class="card-title">👥 المستخدمون</div>
        <button class="btn btn-primary btn-sm" onclick="showToast('إنشاء مستخدم — قيد التطوير')">+ إضافة</button>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>الاسم</th><th>البريد</th><th>الدور</th><th>الحالة</th><th>إجراء</th></tr></thead>
          <tbody>
            ${Object.entries(DEMO_USERS).map(([email, u]) => `
              <tr>
                <td><strong>${u.name}</strong></td>
                <td style="direction:ltr;text-align:right">${email}</td>
                <td><span class="badge badge-info">${{student:'طالب',supervisor:'مشرف',admin:'مسؤول'}[u.role]}</span></td>
                <td><span class="badge badge-approved">نشط</span></td>
                <td>
                  ${email !== state.currentUser.email ? `<button class="btn btn-sm btn-danger" onclick="showToast('تم تعطيل الحساب')">تعطيل</button>` : '<span style="color:var(--text-3);font-size:.8rem">أنت</span>'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ---- STUDENTS (ADMIN) ----
function renderStudents() {
  return `
    <div class="page-header">
      <div class="page-heading">سجل الطلاب</div>
    </div>

    <div class="filter-bar">
      <input type="text" class="search-input" placeholder="بحث بالاسم أو الرقم..." style="max-width:300px" oninput="filterStudents(this.value)" />
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      <div class="table-wrap">
        <table class="data-table" id="students-table">
          <thead><tr><th>الطالب</th><th>الكلية</th><th>التخصص</th><th>المشرف</th><th>الإنجازات</th><th>معتمد</th><th>معلّق</th></tr></thead>
          <tbody id="students-tbody">
            ${renderStudentRows(state.students)}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderStudentRows(list) {
  return list.map(s => `
    <tr>
      <td><strong>${s.name}</strong><div style="font-size:.75rem;color:var(--text-3)">${s.uni_id}</div></td>
      <td>${s.college}</td>
      <td>${s.major}</td>
      <td>${s.supervisor}</td>
      <td><span class="badge badge-info">${s.achievements}</span></td>
      <td><span class="badge badge-approved">${s.approved}</span></td>
      <td><span class="badge badge-${s.pending>0?'pending':'approved'}">${s.pending}</span></td>
    </tr>
  `).join('');
}

function filterStudents(q) {
  const list = q ? state.students.filter(s => s.name.includes(q) || s.uni_id.includes(q) || s.major.includes(q)) : state.students;
  const tb = document.getElementById('students-tbody');
  if (tb) tb.innerHTML = renderStudentRows(list);
}

// ============================================================
// WIZARD
// ============================================================
function openWizard() {
  state.wizardStep = 1;
  state.wizardData = {};
  renderWizardStep();
  openModal('wizard-modal');
}

function closeWizard() {
  closeModal('wizard-modal');
}

function renderWizardStep() {
  const body = document.getElementById('wizard-body');
  const next = document.getElementById('wiz-next');
  const back = document.getElementById('wiz-back');
  const prog = document.getElementById('wiz-progress');
  if (!body) return;

  // Update step indicators
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById('ws' + i);
    if (el) {
      el.classList.remove('active','done');
      if (i < state.wizardStep) el.classList.add('done');
      if (i === state.wizardStep) el.classList.add('active');
    }
  }

  back.style.display = state.wizardStep > 1 ? '' : 'none';
  next.textContent = state.wizardStep === 5 ? 'حفظ الإنجاز ✓' : 'التالي →';
  if (prog) prog.textContent = `الخطوة ${state.wizardStep} من 5`;

  const steps = {
    1: () => `
      <div class="section-heading" style="margin-bottom:.75rem">اختر مجال الإنجاز</div>
      <div class="category-grid" id="cat-grid">
        ${CATEGORIES.map(c => `
          <button class="cat-btn ${state.wizardData.category===c.id?'selected':''}" onclick="selectCategory('${c.id}')">
            <span class="cat-icon">${c.icon}</span>${c.label}
          </button>
        `).join('')}
      </div>
    `,
    2: () => `
      <div class="form-group">
        <label>ماذا فعلت في هذا الإنجاز؟</label>
        <textarea class="form-input" id="wiz-desc" rows="4" placeholder="اصف ما قمت به بإيجاز..." style="resize:vertical">${state.wizardData.description||''}</textarea>
      </div>
    `,
    3: () => `
      <div class="section-heading" style="margin-bottom:.75rem">كم استغرق هذا الإنجاز؟</div>
      <div class="duration-opts" id="dur-opts">
        ${DURATIONS.map(d => `
          <label class="radio-option ${state.wizardData.duration===d.id?'selected':''}" onclick="selectDuration('${d.id}', this)">
            <input type="radio" name="dur" value="${d.id}" ${state.wizardData.duration===d.id?'checked':''} />
            <div class="radio-circle"></div>
            <span>${d.label}</span>
          </label>
        `).join('')}
      </div>
    `,
    4: () => `
      <div class="section-heading" style="margin-bottom:.75rem">كيف أنجزته؟</div>
      <div class="duration-opts">
        <label class="radio-option ${state.wizardData.work_type==='solo'?'selected':''}" onclick="selectWorkType('solo', this)">
          <input type="radio" name="wt" value="solo" ${state.wizardData.work_type==='solo'?'checked':''} />
          <div class="radio-circle"></div>
          <span>👤 بشكل فردي</span>
        </label>
        <label class="radio-option ${state.wizardData.work_type==='team'?'selected':''}" onclick="selectWorkType('team', this)">
          <input type="radio" name="wt" value="team" ${state.wizardData.work_type==='team'?'checked':''} />
          <div class="radio-circle"></div>
          <span>👥 ضمن فريق</span>
        </label>
      </div>
    `,
    5: () => {
      const stmt = buildStatement();
      return `
        <div class="form-group">
          <label>الأثر والنتيجة</label>
          <input type="text" class="form-input" id="wiz-outcome" value="${state.wizardData.outcome||''}" placeholder="ما الذي حققته أو تعلمته؟" />
        </div>
        <div class="section-heading" style="margin-top:.5rem">العبارة المولّدة تلقائيًا</div>
        <div class="generated-statement" id="wiz-stmt">${stmt}</div>
      `;
    }
  };

  body.innerHTML = steps[state.wizardStep]?.() || '';
}

function selectCategory(id) {
  state.wizardData.category = id;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
  event.target.closest('.cat-btn')?.classList.add('selected');
}

function selectDuration(id, el) {
  state.wizardData.duration = id;
  document.querySelectorAll('.radio-option').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function selectWorkType(id, el) {
  state.wizardData.work_type = id;
  document.querySelectorAll('.radio-option').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function buildStatement() {
  const cat  = CATEGORIES.find(c => c.id === state.wizardData.category);
  const dur  = DURATIONS.find(d => d.id === state.wizardData.duration);
  const desc = state.wizardData.description || '...';
  const wt   = state.wizardData.work_type === 'team' ? 'ضمن فريق عمل' : 'بشكل فردي';
  const out  = state.wizardData.outcome || '...';
  const cn   = cat?.label || 'مجال متخصص';

  return `قمت بتنفيذ مهمة في مجال ${cn} تمثّلت في: ${desc}، وذلك ${wt} خلال ${dur?.label || '...'}.
مما أسفر عن: ${out}. يُجسّد هذا الإنجاز مهاراتي العملية خلال فترة التدريب في نادي الابتكار.`;
}

function wizardNext() {
  // Validation
  if (state.wizardStep === 1 && !state.wizardData.category) { showToast('اختر مجالًا أولًا'); return; }
  if (state.wizardStep === 2) {
    const desc = document.getElementById('wiz-desc')?.value.trim();
    if (!desc) { showToast('أدخل وصفًا للإنجاز'); return; }
    state.wizardData.description = desc;
  }
  if (state.wizardStep === 3 && !state.wizardData.duration) { showToast('اختر المدة الزمنية'); return; }
  if (state.wizardStep === 4 && !state.wizardData.work_type) { showToast('اختر نوع العمل'); return; }

  if (state.wizardStep === 5) {
    const outcome = document.getElementById('wiz-outcome')?.value.trim();
    if (!outcome) { showToast('أدخل الأثر والنتيجة'); return; }
    state.wizardData.outcome = outcome;
    saveAchievement();
    return;
  }

  state.wizardStep++;
  renderWizardStep();
}

function wizardPrev() {
  if (state.wizardStep > 1) { state.wizardStep--; renderWizardStep(); }
}

function saveAchievement() {
  const cat = CATEGORIES.find(c => c.id === state.wizardData.category);
  const newA = {
    id: 'a' + Date.now(),
    category: state.wizardData.category,
    categoryLabel: cat?.label || '',
    icon: cat?.icon || '⭐',
    description: state.wizardData.description,
    ai_description: buildStatement(),
    duration: state.wizardData.duration,
    work_type: state.wizardData.work_type,
    outcome: state.wizardData.outcome,
    status: 'pending',
    supervisor_notes: '',
    created_at: new Date().toISOString().split('T')[0],
    evidence: [],
  };
  state.achievements.unshift(newA);
  closeWizard();
  showToast('تم توثيق الإنجاز بنجاح ✓');
  navigate('achievements');
}

// ============================================================
// MODAL HELPERS
// ============================================================
function openModal(id) { document.getElementById(id)?.classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }


// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 3000);
}

// ============================================================
// HELPERS
// ============================================================
function statusLabel(s) {
  return { approved: 'معتمد', pending: 'قيد المراجعة', rejected: 'مرفوض' }[s] || s;
}

// Close modals on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
  }
});

// ============================================================
// INIT
// ============================================================
(function init() {
  applyTheme();
  applyLang();
})();
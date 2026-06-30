<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="light" data-lang="ar">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>منصة توثيق الإنجازات</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/styles.css" />
</head>
<body>

<!-- ===== AUTH SCREENS ===== -->
<div id="auth-screen" class="auth-screen">
  <div class="auth-bg">
    <div class="auth-orb auth-orb-1"></div>
    <div class="auth-orb auth-orb-2"></div>
  </div>
  <div class="auth-container">
    <div class="auth-brand">
      <div class="brand-logo">
        <span class="logo-icon">◈</span>
        <div>
          <div class="brand-title" data-i18n="brand.title">مركز الابتكار</div>
          <div class="brand-sub" data-i18n="brand.sub">جامعة المجمعة  </div>
        </div>
      </div>
    </div>

    <!-- Login Form -->
    <div id="login-form" class="auth-card">
      <h2 class="auth-heading" data-i18n="login.title">تسجيل الدخول</h2>
      <p class="auth-desc" data-i18n="login.desc">أدخل بيانات حسابك للمتابعة</p>
      <div class="form-group">
        <label data-i18n="login.email">البريد الإلكتروني</label>
        <input type="email" id="login-email" class="form-input" placeholder="example@s.mu.edu.sa" />
      </div>
      <div class="form-group">
        <label data-i18n="login.password">كلمة المرور</label>
        <input type="password" id="login-password" class="form-input" placeholder="••••••" />
      </div>
      <div id="login-error" class="form-error hidden"></div>
      <button class="btn btn-primary btn-full" onclick="handleLogin()" data-i18n="login.btn">دخول</button>
      <div class="auth-links">
        <button class="link-btn" onclick="showScreen('forgot-form')" data-i18n="login.forgot">نسيت كلمة المرور؟</button>
        <button class="link-btn" onclick="showScreen('register-form')" data-i18n="login.register">إنشاء حساب</button>
      </div>
      <div class="demo-accounts">
        <p class="demo-label" data-i18n="login.demo">حسابات تجريبية (123456)</p>
        <div class="demo-btns">
          <button class="demo-btn" onclick="fillDemo('student@mu.edu.sa')">طالب</button>
          <button class="demo-btn" onclick="fillDemo('supervisor@mu.edu.sa')">مشرف</button>
          <button class="demo-btn" onclick="fillDemo('admin@mu.edu.sa')">مسؤول</button>
        </div>
      </div>
    </div>

    <!-- Register Form -->
    <div id="register-form" class="auth-card hidden">
      <h2 class="auth-heading" data-i18n="register.title">إنشاء حساب</h2>
      <p class="auth-desc" data-i18n="register.desc">للطلاب فقط — بريد @s.mu.edu.sa</p>
      <div class="form-group">
        <label data-i18n="register.name">الاسم الكامل</label>
        <input type="text" id="reg-name" class="form-input" placeholder="  " />
      </div>
      <div class="form-group">
        <label data-i18n="register.email">البريد الجامعي</label>
        <input type="email" id="reg-email" class="form-input" placeholder="s123456@s.mu.edu.sa" />
      </div>
      <div class="form-group">
        <label data-i18n="register.password">كلمة المرور</label>
        <input type="password" id="reg-password" class="form-input" placeholder="••••••" />
      </div>
      <div id="reg-error" class="form-error hidden"></div>
      <button class="btn btn-primary btn-full" onclick="handleRegister()" data-i18n="register.btn">إنشاء الحساب</button>
      <div class="auth-links">
        <button class="link-btn" onclick="showScreen('login-form')" data-i18n="register.back">← العودة لتسجيل الدخول</button>
      </div>
    </div>

    <!-- Forgot Password Form -->
    <div id="forgot-form" class="auth-card hidden">
      <h2 class="auth-heading" data-i18n="forgot.title">استعادة كلمة المرور</h2>
      <p class="auth-desc" data-i18n="forgot.desc">أدخل بريدك وسنرسل لك رابط الاستعادة</p>
      <div class="form-group">
        <label data-i18n="forgot.email">البريد الإلكتروني</label>
        <input type="email" id="forgot-email" class="form-input" placeholder="example@s.mu.edu.sa" />
      </div>
      <div id="forgot-msg" class="form-success hidden"></div>
      <button class="btn btn-primary btn-full" onclick="handleForgot()" data-i18n="forgot.btn">إرسال الرابط</button>
      <div class="auth-links">
        <button class="link-btn" onclick="showScreen('login-form')" data-i18n="forgot.back">← العودة</button>
      </div>
    </div>

    <div class="auth-lang-toggle">
      <button onclick="toggleLang()" class="lang-btn-small" id="auth-lang-btn">EN</button>
    </div>
  </div>
</div>

<!-- ===== SETUP SCREEN ===== -->
<div id="setup-screen" class="setup-screen hidden">
  <div class="setup-container">
    <div class="setup-header">
      <div class="brand-logo" style="margin-bottom:0">
        <span class="logo-icon">◈</span>
        <div>
          <div class="brand-title">مركز الابتكار</div>
          <div class="brand-sub">استكمال الملف التدريبي</div>
        </div>
      </div>
    </div>
    <div class="setup-card">
      <div class="setup-progress">
        <div class="setup-step active" data-step="1"><span>١</span></div>
        <div class="setup-line"></div>
        <div class="setup-step" data-step="2"><span>٢</span></div>
        <div class="setup-line"></div>
        <div class="setup-step" data-step="3"><span>٣</span></div>
      </div>
      <div id="setup-step-1" class="setup-panel">
        <h3>البيانات الأكاديمية</h3>
        <div class="form-group">
          <label>الرقم الجامعي</label>
          <input type="text" id="s-uni-id" class="form-input" placeholder="441234567" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>الكلية</label>
            <select id="s-college" class="form-input form-select">
              <option>كلية الحاسب وتقنية المعلومات</option>
              <option>كلية الهندسة</option>
              <option>كلية إدارة الأعمال</option>
               <option>كلية الطب</option>
              <option>كلية العلوم</option>
            </select>
          </div>
          <div class="form-group">
            <label>التخصص</label>
            <input type="text" id="s-major" class="form-input" placeholder="علوم الحاسب" />
          </div>
        </div>
        <div class="form-group">
          <label>القسم</label>
          <input type="text" id="s-dept" class="form-input" placeholder="قسم التحليل البيانات" />
        </div>
        <button class="btn btn-primary" onclick="setupNext(2)">التالي →</button>
      </div>
      <div id="setup-step-2" class="setup-panel hidden">
        <h3>فترة التدريب</h3>
        <div class="form-row">
          <div class="form-group">
            <label>تاريخ البداية</label>
            <input type="date" id="s-start" class="form-input" />
          </div>
          <div class="form-group">
            <label>تاريخ النهاية</label>
            <input type="date" id="s-end" class="form-input" />
          </div>
        </div>
        <div class="setup-nav">
          <button class="btn btn-ghost" onclick="setupNext(1)">← السابق</button>
          <button class="btn btn-primary" onclick="setupNext(3)">التالي →</button>
        </div>
      </div>
      <div id="setup-step-3" class="setup-panel hidden">
        <h3>مراجعة وتأكيد</h3>
        <div class="review-card" id="setup-review"></div>
        <div class="setup-nav">
          <button class="btn btn-ghost" onclick="setupNext(2)">← السابق</button>
          <button class="btn btn-primary" onclick="completeSetup()">حفظ وبدء الاستخدام ✓</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ===== MAIN APP ===== -->
<div id="app-screen" class="app hidden">

  <!-- Sidebar -->
  <aside id="sidebar" class="sidebar">
    <div class="sidebar-brand">
      <span class="logo-icon">◈</span>
      <div>
        <div class="sidebar-title">منصه توثيق الإنجازات</div>
        <div class="sidebar-sub">مركز الابتكار</div>
      </div>
      <button class="sidebar-close" onclick="toggleSidebar()">✕</button>
    </div>

    <div class="sidebar-user">
      <div class="user-avatar" id="sidebar-avatar"></div>
      <div>
        <div class="user-name" id="sidebar-name"> </div>
        <div class="user-role-badge" id="sidebar-role-badge"></div>
      </div>
    </div>

    <nav class="sidebar-nav" id="sidebar-nav"></nav>

    <div class="sidebar-footer">
      <button class="footer-btn" onclick="toggleTheme()" title="تبديل المظهر">
        <span id="theme-icon">🌙</span> <span data-i18n="nav.theme">المظهر</span>
      </button>
      <button class="footer-btn" onclick="toggleLang()">
        <span>🌐</span> <span id="lang-label">EN</span>
      </button>
      <button class="footer-btn danger" onclick="handleLogout()">
        <span>⬅</span> <span data-i18n="nav.logout">تسجيل الخروج</span>
      </button>
    </div>
  </aside>

  <!-- Sidebar Overlay -->
  <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="toggleSidebar()"></div>

  <!-- Main -->
  <main class="main-content">
    <header class="topbar">
      <button class="menu-toggle" onclick="toggleSidebar()">☰</button>
      <div class="topbar-title" id="page-title">لوحة التحكم</div>
      <div class="topbar-actions">
        <button class="icon-btn notif-btn" onclick="navigate('notifications')" title="التنبيهات">
          🔔 <span class="notif-badge" id="notif-count">3</span>
        </button>
      </div>
    </header>

    <div class="page-container" id="page-container">
      <!-- Pages rendered by JS -->
    </div>
  </main>
</div>

<!-- ===== MODALS ===== -->
<!-- Achievement Wizard Modal -->
<div id="wizard-modal" class="modal-overlay hidden">
  <div class="modal-box wizard-box">
    <div class="modal-header">
      <h3 data-i18n="wizard.title">توثيق إنجاز جديد</h3>
      <button onclick="closeWizard()" class="modal-close">✕</button>
    </div>
    <div class="wizard-steps-bar">
      <div class="wstep active" id="ws1"><span>١</span> التصنيف</div>
      <div class="wstep" id="ws2"><span>٢</span> الوصف</div>
      <div class="wstep" id="ws3"><span>٣</span> المدة</div>
      <div class="wstep" id="ws4"><span>٤</span> النوع</div>
      <div class="wstep" id="ws5"><span>٥</span> الأثر</div>
    </div>
    <div class="wizard-body" id="wizard-body"></div>
    <div class="wizard-footer">
      <button class="btn btn-ghost" id="wiz-back" onclick="wizardPrev()" style="display:none">← السابق</button>
      <div class="wizard-progress-text" id="wiz-progress">الخطوة 1 من 5</div>
      <button class="btn btn-primary" id="wiz-next" onclick="wizardNext()">التالي →</button>
    </div>
  </div>
</div>

<!-- Evidence Modal -->
<div id="evidence-modal" class="modal-overlay hidden">
  <div class="modal-box">
    <div class="modal-header">
      <h3>إضافة دليل</h3>
      <button onclick="closeModal('evidence-modal')" class="modal-close">✕</button>
    </div>

    <!-- Tab toggle -->
    <div style="display:flex;gap:.5rem;margin-bottom:1rem">
      <button class="ev-tab-btn active" id="tab-file" onclick="switchEvidenceTab('file')">📎 رفع ملف</button>
      <button class="ev-tab-btn" id="tab-link" onclick="switchEvidenceTab('link')">🔗 رابط</button>
    </div>

    <!-- File tab -->
    <div id="ev-panel-file">
      <div class="form-group">
        <label>وصف الدليل</label>
        <input type="text" class="form-input" id="ev-name-file" placeholder="مثال: لقطة شاشة النظام..." />
      </div>
      <label class="upload-zone" id="upload-zone" for="ev-file-input">
        <input type="file" id="ev-file-input" accept="image/*,.pdf,.mp4,.docx,.xlsx,.pptx" style="display:none" onchange="handleFileSelect(event)" />
        <div class="upload-icon" id="upload-icon">📎</div>
        <div id="upload-label">اضغط لاختيار الملف أو اسحبه هنا</div>
        <div class="upload-hint">PNG, JPG, PDF, MP4, DOCX — حتى 10MB</div>
      </label>
      <div id="upload-preview" class="hidden" style="margin-top:.75rem"></div>
      <button class="btn btn-primary btn-full" onclick="addEvidenceFile()" style="margin-top:1rem">إضافة الدليل</button>
    </div>

    <!-- Link tab -->
    <div id="ev-panel-link" class="hidden">
      <div class="form-group">
        <label>عنوان الرابط</label>
        <input type="text" class="form-input" id="ev-name-link" placeholder="مثال: ملف Figma أو رابط GitHub..." />
      </div>
      <div class="form-group">
        <label>الرابط (URL)</label>
        <input type="url" class="form-input" id="ev-url-link" placeholder="https://..." dir="ltr" />
      </div>
      <button class="btn btn-primary btn-full" onclick="addEvidenceLink()" style="margin-top:.5rem">إضافة الرابط</button>
    </div>

  </div>
</div>

<!-- Approval Modal -->
<div id="approval-modal" class="modal-overlay hidden">
  <div class="modal-box">
    <div class="modal-header">
      <h3 id="approval-modal-title">مراجعة الإنجاز</h3>
      <button onclick="closeModal('approval-modal')" class="modal-close">✕</button>
    </div>
    <div id="approval-modal-content"></div>
    <div class="form-group" style="margin-top:1rem">
      <label>ملاحظات المشرف</label>
      <textarea class="form-input" id="supervisor-notes" rows="3" placeholder="أكتب ملاحظاتك هنا..."></textarea>
    </div>
    <div class="modal-actions">
      <button class="btn btn-danger" onclick="reviewAchievement('rejected')"> رفض</button>
      <button class="btn btn-success" onclick="reviewAchievement('approved')"> اعتماد</button>
    </div>
  </div>
</div>

<!-- Toast -->
<div id="toast" class="toast hidden"></div>

<script src="assets/app.js"></script>
</body>
</html>
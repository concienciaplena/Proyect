document.addEventListener("DOMContentLoaded", () => {
  /* ===================================================
     0. INICIALIZAR ESCALA DE TIPOGRAFÍA GLOBAL
     =================================================== */
  let currentFontScale = parseInt(localStorage.getItem("sonia_font_scale_v1") || "100", 10);
  function applyFontScale(scale) {
    currentFontScale = Math.min(125, Math.max(85, scale));
    document.documentElement.style.fontSize = currentFontScale + "%";
    localStorage.setItem("sonia_font_scale_v1", currentFontScale);
    const display = document.getElementById("fontScaleDisplay");
    if (display) display.textContent = currentFontScale + "%";
  }
  applyFontScale(currentFontScale);

  /* ===================================================
     1. ANIMACIÓN DEL LOGO, ENGRANAJE Y MENÚ HAMBURGUESA
     =================================================== */
  const logoInteractiveBtn = document.getElementById("logoInteractiveBtn");
  const adminGearContainer = document.getElementById("adminGearContainer");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebarNav = document.getElementById("sidebarNav");

  if (logoInteractiveBtn && adminGearContainer) {
    logoInteractiveBtn.addEventListener("click", () => {
      logoInteractiveBtn.classList.toggle("rotated");
      adminGearContainer.classList.toggle("gear-visible");
    });
  }

  if (hamburgerBtn && sidebarNav) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("open");
      sidebarNav.classList.toggle("active");
    });
  }

  /* ===================================================
     2. PRIVACIDAD, COOKIES Y DERECHOS ARCO
     =================================================== */
  const privacyModal = document.getElementById("privacyModal");
  const btnAcceptPrivacy = document.getElementById("btnAcceptPrivacy");
  const btnOpenPrivacyFooter = document.getElementById("btnOpenPrivacyFooter");
  const btnOpenCookiesFooter = document.getElementById("btnOpenCookiesFooter");

  if (!localStorage.getItem("sonia_privacy_accepted_v2") && privacyModal) {
    privacyModal.style.display = "flex";
  }

  if (btnAcceptPrivacy) {
    btnAcceptPrivacy.addEventListener("click", () => {
      localStorage.setItem("sonia_privacy_accepted_v2", "true");
      privacyModal.style.display = "none";
    });
  }

  if (btnOpenPrivacyFooter) {
    btnOpenPrivacyFooter.addEventListener("click", () => privacyModal.style.display = "flex");
  }

  if (btnOpenCookiesFooter) {
    btnOpenCookiesFooter.addEventListener("click", () => {
      alert("Política de Cookies: Consciencia Plena utiliza almacenamiento local técnico (localStorage) exclusivamente para guardar tus preferencias de interfaz y citas locales.");
    });
  }

  /* ===================================================
     3. SISTEMA SPA: NAVEGACIÓN ENTRE VISTAS PÚBLICAS
     =================================================== */
  const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
  const pageViews = document.querySelectorAll(".page-view");
  const topbarTitle = document.getElementById("topbarTitle");
  const topbarSub = document.getElementById("topbarSub");

  const viewTitles = {
    "view-inicio": { title: "¡Hola, bienvenido(a)!", sub: "Las emociones negativas no te hacen una persona negativa; te hacen humano." },
    "view-servicios": { title: "Servicios Terapéuticos", sub: "Atención psicológica profesional y enfocada." },
    "view-test": { title: "Centro de Cuestionarios", sub: "Test iniciales de autoevaluación guiada." }
  };

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetId = item.dataset.target;

      navItems.forEach(btn => btn.classList.remove("active"));
      pageViews.forEach(view => view.classList.remove("active"));

      item.classList.add("active");
      const targetView = document.getElementById(targetId);
      if (targetView) targetView.classList.add("active");

      if (viewTitles[targetId]) {
        topbarTitle.textContent = viewTitles[targetId].title;
        topbarSub.textContent = viewTitles[targetId].sub;
      }

      if (sidebarNav && sidebarNav.classList.contains("active")) {
        sidebarNav.classList.remove("active");
        if (hamburgerBtn) hamburgerBtn.classList.remove("open");
      }
    });
  });

  /* ===================================================
     4. DATOS EDITABLES: CHECK-IN, REFLEXIONES, PÍLDORAS Y SERVICIOS
     =================================================== */
  const defaultMoodList = [
    { id: "tranquilo", label: "Tranquilo(a)", icon: "", title: "Estado de Serenidad", text: "Aprovecha este momento de calma para reflexionar o practicar gratitud. Registrar qué facilitó esta tranquilidad te ayudará a replicarla." },
    { id: "ansioso", label: "Ansioso(a)", icon: "", title: "Manejo de Tensión", text: "La ansiedad es una respuesta defensiva de tu cuerpo. Intenta realizar 3 respiraciones profundas (4 segundos inhala, 8 segundos exhala) y recuerda que este malestar es temporal." },
    { id: "triste", label: "Triste", icon: "", title: "Validación y Permisividad", text: "Es completamente válido sentir desánimo. Trátate con compasión hoy y realiza una actividad pequeña de autocuidado que no requiera gran esfuerzo." },
    { id: "energia", label: "Con energía", icon: "", title: "Canalización Positiva", text: "¡Gran momento! Canaliza esa energía en proyectos pendientes, actividad física o expresar afecto a tus personas cercanas." },
    { id: "abrumado", label: "Abrumado(a)", icon: "", title: "Desaceleración y Foco", text: "Cuando todo parece demasiado, divide tus pendientes en pasos diminutos. Enfócate solo en la tarea más inmediata y haz una pausa de 5 minutos." }
  ];

  const defaultQuotes = [
    { body: '"El autocuidado no es un lujo, es una necesidad para tu salud emocional."', author: "— Enfoque Humanista" },
    { body: '"Tus emociones son señales de navegación, no decretos definitivos sobre quién eres."', author: "— Terapia Conductual" },
    { body: '"Reconocer que necesitas apoyo es el primer acto de valentía hacia tu bienestar."', author: "— Psic. Sonia Vargas" },
    { body: '"Aprender a poner límites saludables es una forma profunda de amor propio."', author: "— Psicoeducación" }
  ];

  const defaultPsychoPills = [
    { title: "Regulación Respiratoria 4-7-8", text: "Inhala en 4 segundos, sostén 7 segundos y exhala suavemente en 8 para desactivar el estrés." },
    { title: "Técnica de Anclaje 5-4-3-2-1", text: "Ante la ansiedad: observa 5 objetos, toca 4 texturas, escucha 3 sonidos, huele 2 aromas y prueba 1 sabor." },
    { title: "Validación Emocional", text: "Todas las emociones cumplen una función adaptativa. Sentir enojo o tristeza no te hace débil." }
  ];

  const defaultServices = [
    { title: "Terapia Individual", desc: "Acompañamiento especializado para el manejo del estrés, ansiedad, desarrollo de autoestima y superación de bloqueos emocionales." },
    { title: "Terapia de Pareja", desc: "Espacio neutral para fortalecer la comunicación asertiva, resolución pacífica de conflictos y reconstrucción de acuerdos mutuos." },
    { title: "Identidad & Duelo", desc: "Acompañamiento afirmativo, empático y profesional en procesos de transición de vida, pérdidas significativas e identidad personal." },
    { title: "Manejo de Ansiedad", desc: "Técnicas cognitivo-conductuales y regulación somática para recuperar el control sobre pensamientos intrusivos y tensión." }
  ];

  let moodList = JSON.parse(localStorage.getItem("sonia_mood_list_v2") || "null") || defaultMoodList;
  let quotes = JSON.parse(localStorage.getItem("sonia_quotes_v1") || "null") || defaultQuotes;
  let psychoPills = JSON.parse(localStorage.getItem("sonia_psycho_pills_v1") || "null") || defaultPsychoPills;
  let servicesList = JSON.parse(localStorage.getItem("sonia_services_v1") || "null") || defaultServices;

  // Render Check-In Emocional Dinámico
  const publicMoodSelector = document.getElementById("publicMoodSelector");
  const moodFeedbackBox = document.getElementById("moodFeedback");
  const moodIcon = document.getElementById("moodIcon");
  const moodTitle = document.getElementById("moodTitle");
  const moodText = document.getElementById("moodText");
  let activeMoodIndex = -1;

  function showMoodFeedbackByIndex(idx) {
    activeMoodIndex = idx;
    const data = moodList[idx];
    if (data && moodFeedbackBox) {
      moodIcon.textContent = data.icon || "";
      moodTitle.textContent = data.title;
      moodText.textContent = data.text;
      moodFeedbackBox.style.display = "block";
    } else if (moodFeedbackBox) {
      moodFeedbackBox.style.display = "none";
    }
  }

  function renderPublicMoodButtons() {
    if (!publicMoodSelector) return;
    publicMoodSelector.innerHTML = "";
    moodList.forEach((m, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mood-btn" + (idx === activeMoodIndex ? " active" : "");
      btn.textContent = m.label;
      btn.addEventListener("click", () => {
        document.querySelectorAll("#publicMoodSelector .mood-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        showMoodFeedbackByIndex(idx);
      });
      publicMoodSelector.appendChild(btn);
    });
  }
  renderPublicMoodButtons();

  // Render Reflexión Diaria
  let quoteIdx = 0;
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");
  const btnNewQuote = document.getElementById("btnNewQuote");

  function renderCurrentQuote() {
    if (!quoteText || !quoteAuthor) return;
    if (!quotes.length) {
      quoteText.textContent = '"El bienestar emocional comienza con un paso hacia ti mismo."';
      quoteAuthor.textContent = "— Consciencia Plena";
      return;
    }
    if (quoteIdx >= quotes.length) quoteIdx = 0;
    const bodyStr = quotes[quoteIdx].body.startsWith('"') ? quotes[quoteIdx].body : `"${quotes[quoteIdx].body}"`;
    const authStr = quotes[quoteIdx].author.startsWith("—") ? quotes[quoteIdx].author : `— ${quotes[quoteIdx].author}`;
    quoteText.textContent = bodyStr;
    quoteAuthor.textContent = authStr;
  }

  if (btnNewQuote) {
    btnNewQuote.addEventListener("click", () => {
      if (!quotes.length) return;
      quoteIdx = (quoteIdx + 1) % quotes.length;
      renderCurrentQuote();
    });
  }
  renderCurrentQuote();

  // Render Píldoras de Psicoeducación en Inicio
  function renderPublicPsychoPills() {
    const grid = document.getElementById("publicPsychoPillsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    psychoPills.forEach(pill => {
      const card = document.createElement("div");
      card.className = "psycho-pill-card";
      card.innerHTML = `
        <span class="pill-icon"></span>
        <div>
          <strong>${pill.title}</strong>
          <p class="text-muted text-sm" style="margin-top:0.3rem;">${pill.text}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  }
  renderPublicPsychoPills();

  // Render Catálogo de Servicios en Vista Servicios
  function renderPublicServices() {
    const grid = document.getElementById("publicServicesGrid");
    if (!grid) return;
    grid.innerHTML = "";
    servicesList.forEach(srv => {
      const card = document.createElement("div");
      card.className = "service-card-expanded";
      card.innerHTML = `
        <span class="service-icon-lg"></span>
        <h4>${srv.title}</h4>
        <p class="text-muted text-sm" style="margin: 0.8rem 0;">${srv.desc}</p>
        <button class="btn btn-primary open-booking-btn">Solicitar Consulta</button>
      `;
      grid.appendChild(card);
    });
  }
  renderPublicServices();

  /* ===================================================
     5. GESTIÓN DE NOTICIAS (CARRUSEL + CRUD ADMIN)
     =================================================== */
  let noticias = JSON.parse(localStorage.getItem("sonia_noticias_v3") || "null") || [
    { cat: "Bienestar", tit: "La importancia del sueño en la ansiedad", res: "Dormir menos de 7 horas incrementa los niveles de cortisol y estrés cognitivo diario.", cuerpo: "Estudios clínicos recientes demuestran que la falta persistente de sueño reparador altera el funcionamiento de la amígdala cerebral, incrementando la vulnerabilidad a episodios de ansiedad. Establecer rutinas de desconexión digital 1 hora antes de dormir ayuda a sincronizar el ritmo circadiano." },
    { cat: "Relaciones", tit: "Comunicación asertiva en pareja", res: "Técnicas de escucha activa para evitar conflictos y descalificaciones mutuas.", cuerpo: "La comunicación asertiva se fundamenta en la expresión clara de necesidades sin caer en juicios ni culpas sobre el otro. Aprender a validar las emociones de la pareja antes de responder reduce drásticamente las dinámicas defensivas." },
    { cat: "Identidad", tit: "Apoyo en el proceso de afirmación", res: "Contar con redes seguras disminuye drásticamente el aislamiento emocional.", cuerpo: "El acompañamiento en entornos informados y afirmativos fortalece la autoestima y brinda herramientas de resiliencia ante situaciones de estigma o discriminación en el entorno social o familiar." }
  ];

  let notiIdx = 0;
  let autoplayTimer = null;
  const newsCategory = document.getElementById("newsCategory");
  const newsTitleDisplay = document.getElementById("newsTitleDisplay");
  const newsSummary = document.getElementById("newsSummary");
  const indicatorsContainer = document.getElementById("indicatorsContainer");
  const newsCardContainer = document.getElementById("newsCardContainer");

  const newsDetailModal = document.getElementById("newsDetailModal");
  const closeNewsModal = document.getElementById("closeNewsModal");
  const modalNewsCategory = document.getElementById("modalNewsCategory");
  const modalNewsTitle = document.getElementById("modalNewsTitle");
  const modalNewsSource = document.getElementById("modalNewsSource");
  const modalNewsBody = document.getElementById("modalNewsBody");
  const btnOpenNewsDetail = document.getElementById("btnOpenNewsDetail");

  function renderNoticia(idx) {
    if (!noticias.length) {
      newsCategory.textContent = "Aviso";
      newsTitleDisplay.textContent = "Sin noticias publicadas";
      newsSummary.textContent = "Pronto compartiremos nuevos artículos.";
      indicatorsContainer.innerHTML = "";
      return;
    }
    if (idx >= noticias.length) notiIdx = 0;
    newsCategory.textContent = noticias[notiIdx].cat;
    newsTitleDisplay.textContent = noticias[notiIdx].tit;
    newsSummary.textContent = noticias[notiIdx].res;
    
    indicatorsContainer.innerHTML = "";
    noticias.forEach((_, i) => {
      const d = document.createElement("div");
      d.style.cssText = `width: 8px; height: 8px; border-radius: 50%; transition: background 0.3s; background: ${i === notiIdx ? "var(--accent-bright)" : "var(--input-border)"};`;
      indicatorsContainer.appendChild(d);
    });
  }

  function siguienteNoticia() {
    if (!noticias.length) return;
    notiIdx = (notiIdx + 1) % noticias.length;
    renderNoticia(notiIdx);
  }

  function anteriorNoticia() {
    if (!noticias.length) return;
    notiIdx = (notiIdx - 1 + noticias.length) % noticias.length;
    renderNoticia(notiIdx);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(siguienteNoticia, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  if (newsCardContainer) {
    newsCardContainer.addEventListener("mouseenter", stopAutoplay);
    newsCardContainer.addEventListener("mouseleave", startAutoplay);
  }

  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  if (btnPrev) btnPrev.addEventListener("click", () => { anteriorNoticia(); startAutoplay(); });
  if (btnNext) btnNext.addEventListener("click", () => { siguienteNoticia(); startAutoplay(); });

  function abrirModalLectura(idx) {
    if (!noticias.length) return;
    const item = noticias[idx];
    modalNewsCategory.textContent = item.cat;
    modalNewsTitle.textContent = item.tit;
    modalNewsSource.textContent = `Fuente: ${item.fuente || "Psic. Sonia Vargas"}`;
    modalNewsBody.textContent = item.cuerpo || item.res;
    newsDetailModal.style.display = "flex";
  }

  if (btnOpenNewsDetail) btnOpenNewsDetail.addEventListener("click", () => abrirModalLectura(notiIdx));
  if (newsTitleDisplay) newsTitleDisplay.addEventListener("click", () => abrirModalLectura(notiIdx));
  if (closeNewsModal) closeNewsModal.addEventListener("click", () => newsDetailModal.style.display = "none");

  renderNoticia(0);
  startAutoplay();

  /* ===================================================
     6. TOGGLE MODO OSCURO / CLARO
     =================================================== */
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeToggleBtnMobile = document.getElementById("themeToggleBtnMobile");
  const adminThemeToggleBtn = document.getElementById("adminThemeToggleBtn");
  const body = document.body;

  function aplicarTema(theme) {
    const icon = theme === "light" ? "☀️" : "☾";
    if (theme === "light") {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
    }
    if (themeToggleBtn) themeToggleBtn.textContent = icon;
    if (themeToggleBtnMobile) themeToggleBtnMobile.textContent = icon;
    if (adminThemeToggleBtn) adminThemeToggleBtn.textContent = icon;
  }

  const savedTheme = localStorage.getItem("sonia_theme_preference_v1") || "dark";
  aplicarTema(savedTheme);

  function alternarTema() {
    const isDark = body.classList.contains("dark-mode");
    const nextTheme = isDark ? "light" : "dark";
    aplicarTema(nextTheme);
    localStorage.setItem("sonia_theme_preference_v1", nextTheme);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener("click", alternarTema);
  if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener("click", alternarTema);
  if (adminThemeToggleBtn) adminThemeToggleBtn.addEventListener("click", alternarTema);

  /* ===================================================
     7. AUTENTICACIÓN Y VENTANA EXCLUSIVA DE ADMINISTRADOR
     =================================================== */
  const adminAuthModal = document.getElementById("adminAuthModal");
  const closeAdminAuthModal = document.getElementById("closeAdminAuthModal");
  const adminAuthForm = document.getElementById("adminAuthForm");
  const adminPasswordInput = document.getElementById("adminPasswordInput");
  const adminAuthError = document.getElementById("adminAuthError");

  const btnOpenAdminGear = document.getElementById("btnOpenAdminGear");
  const adminWorkspaceView = document.getElementById("adminWorkspaceView");
  const publicDashboardLayout = document.getElementById("publicDashboardLayout");
  const chatbotWrapper = document.getElementById("chatbotWrapper");
  const btnExitAdminWorkspace = document.getElementById("btnExitAdminWorkspace");

  function openAdminWorkspace() {
    publicDashboardLayout.style.display = "none";
    if (chatbotWrapper) chatbotWrapper.style.display = "none";
    adminWorkspaceView.style.display = "flex";
    renderAdminStats();
    renderAdminNewsList();
    renderAdminServicesList();
    renderAdminPillsList();
    renderAdminQuotesList();
    renderAdminMoodsList();
    renderAdminQuizEditor();
  }

  function closeAdminWorkspace() {
    adminWorkspaceView.style.display = "none";
    publicDashboardLayout.style.display = "flex";
    if (chatbotWrapper) chatbotWrapper.style.display = "flex";
    renderNoticia(0);
    renderPublicPsychoPills();
    renderPublicServices();
    renderCurrentQuote();
    renderPublicMoodButtons();
    if (activeMoodIndex >= 0 && moodList[activeMoodIndex]) showMoodFeedbackByIndex(activeMoodIndex);
    else if (moodFeedbackBox) moodFeedbackBox.style.display = "none";
  }

  if (btnOpenAdminGear && adminAuthModal) {
    btnOpenAdminGear.addEventListener("click", () => {
      adminAuthForm.reset();
      adminAuthError.style.display = "none";
      adminAuthModal.style.display = "flex";
      setTimeout(() => adminPasswordInput.focus(), 100);
    });
  }

  if (closeAdminAuthModal) {
    closeAdminAuthModal.addEventListener("click", () => {
      adminAuthModal.style.display = "none";
    });
  }

  if (adminAuthForm) {
    adminAuthForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (adminPasswordInput.value === "admin123") {
        adminAuthModal.style.display = "none";
        openAdminWorkspace();
      } else {
        adminAuthError.style.display = "block";
        adminPasswordInput.value = "";
        adminPasswordInput.focus();
      }
    });
  }

  if (btnExitAdminWorkspace) {
    btnExitAdminWorkspace.addEventListener("click", closeAdminWorkspace);
  }

  // Pestañas principales del Administrador
  const adminTabBtns = document.querySelectorAll(".admin-tab-btn");
  const adminTabPanels = document.querySelectorAll(".admin-tab-panel");

  adminTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.admintab;
      adminTabBtns.forEach(b => b.classList.remove("active"));
      adminTabPanels.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const panel = document.getElementById(targetTab);
      if (panel) panel.classList.add("active");

      if (targetTab === "admin-tab-stats") renderAdminStats();
      if (targetTab === "admin-tab-news") renderAdminNewsList();
      if (targetTab === "admin-tab-tests") renderAdminQuizEditor();
    });
  });

  // Sub-pestañas de "Contenido y Servicios"
  const contentSubtabBtns = document.querySelectorAll(".content-subtab-btn");
  const contentSubtabPanels = document.querySelectorAll(".content-subtab-panel");

  contentSubtabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetSub = btn.dataset.subtab;
      contentSubtabBtns.forEach(b => b.className = "btn btn-secondary content-subtab-btn");
      contentSubtabPanels.forEach(p => p.style.display = "none");
      btn.className = "btn btn-primary content-subtab-btn";
      const subPanel = document.getElementById(targetSub);
      if (subPanel) subPanel.style.display = "block";
    });
  });

  /* --- ADMIN: GESTIÓN DE SERVICIOS --- */
  const adminServiceForm = document.getElementById("adminServiceForm");
  const editServiceIndex = document.getElementById("editServiceIndex");
  const serviceFormHeading = document.getElementById("serviceFormHeading");
  const btnSubmitService = document.getElementById("btnSubmitService");
  const btnCancelEditService = document.getElementById("btnCancelEditService");

  function resetServiceForm() {
    adminServiceForm.reset();
    editServiceIndex.value = "-1";
    serviceFormHeading.textContent = "Agregar Nuevo Servicio";
    btnSubmitService.textContent = "Agregar Servicio";
    btnCancelEditService.style.display = "none";
  }

  function renderAdminServicesList() {
    const container = document.getElementById("adminServicesList");
    if (!container) return;
    container.innerHTML = "";
    servicesList.forEach((srv, idx) => {
      const card = document.createElement("div");
      card.className = "legal-box";
      card.style.cssText = "padding: 1rem; border-radius: 14px; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;";
      card.innerHTML = `
        <div>
          <h4 style="font-size: 0.98rem;">${srv.title}</h4>
          <p class="text-muted text-sm" style="margin-top: 0.3rem;">${srv.desc}</p>
        </div>
        <div style="display: flex; gap: 0.4rem; flex-shrink: 0;">
          <button type="button" class="btn btn-secondary btn-edit-srv" data-idx="${idx}" style="padding: 0.4rem 0.7rem; font-size: 0.78rem;">Editar</button>
          <button type="button" class="btn btn-secondary btn-del-srv" data-idx="${idx}" style="padding: 0.4rem 0.7rem; font-size: 0.78rem; color: #e57373;">Borrar</button>
        </div>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".btn-edit-srv").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        editServiceIndex.value = i;
        document.getElementById("adminServiceTitle").value = servicesList[i].title;
        document.getElementById("adminServiceDesc").value = servicesList[i].desc;
        serviceFormHeading.textContent = "Editando Servicio";
        btnSubmitService.textContent = "Guardar Cambios";
        btnCancelEditService.style.display = "inline-block";
      });
    });

    document.querySelectorAll(".btn-del-srv").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (confirm("¿Eliminar este servicio del catálogo?")) {
          servicesList.splice(i, 1);
          localStorage.setItem("sonia_services_v1", JSON.stringify(servicesList));
          if (parseInt(editServiceIndex.value, 10) === i) resetServiceForm();
          renderAdminServicesList();
          renderPublicServices();
        }
      });
    });
  }

  if (btnCancelEditService) btnCancelEditService.addEventListener("click", resetServiceForm);

  if (adminServiceForm) {
    adminServiceForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const idx = parseInt(editServiceIndex.value, 10);
      const item = {
        title: document.getElementById("adminServiceTitle").value.trim(),
        desc: document.getElementById("adminServiceDesc").value.trim()
      };
      if (idx >= 0 && servicesList[idx]) {
        servicesList[idx] = item;
        alert("Servicio actualizado.");
      } else {
        servicesList.push(item);
        alert("Servicio agregado al catálogo.");
      }
      localStorage.setItem("sonia_services_v1", JSON.stringify(servicesList));
      resetServiceForm();
      renderAdminServicesList();
      renderPublicServices();
    });
  }

  /* --- ADMIN: GESTIÓN DE PÍLDORAS DE PSICOEDUCACIÓN --- */
  const adminPillForm = document.getElementById("adminPillForm");
  const editPillIndex = document.getElementById("editPillIndex");
  const pillFormHeading = document.getElementById("pillFormHeading");
  const btnSubmitPill = document.getElementById("btnSubmitPill");
  const btnCancelEditPill = document.getElementById("btnCancelEditPill");

  function resetPillForm() {
    adminPillForm.reset();
    editPillIndex.value = "-1";
    pillFormHeading.textContent = "Agregar Nueva Píldora";
    btnSubmitPill.textContent = "Agregar Píldora";
    btnCancelEditPill.style.display = "none";
  }

  function renderAdminPillsList() {
    const container = document.getElementById("adminPillsList");
    if (!container) return;
    container.innerHTML = "";
    psychoPills.forEach((p, idx) => {
      const card = document.createElement("div");
      card.className = "legal-box";
      card.style.cssText = "padding: 1rem; border-radius: 14px; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;";
      card.innerHTML = `
        <div>
          <h4 style="font-size: 0.98rem;">${p.title}</h4>
          <p class="text-muted text-sm" style="margin-top: 0.3rem;">${p.text}</p>
        </div>
        <div style="display: flex; gap: 0.4rem; flex-shrink: 0;">
          <button type="button" class="btn btn-secondary btn-edit-pill" data-idx="${idx}" style="padding: 0.4rem 0.7rem; font-size: 0.78rem;">Editar</button>
          <button type="button" class="btn btn-secondary btn-del-pill" data-idx="${idx}" style="padding: 0.4rem 0.7rem; font-size: 0.78rem; color: #e57373;">Borrar</button>
        </div>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".btn-edit-pill").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        editPillIndex.value = i;
        document.getElementById("adminPillTitle").value = psychoPills[i].title;
        document.getElementById("adminPillText").value = psychoPills[i].text;
        pillFormHeading.textContent = "Editando Píldora";
        btnSubmitPill.textContent = "Guardar Cambios";
        btnCancelEditPill.style.display = "inline-block";
      });
    });

    document.querySelectorAll(".btn-del-pill").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (confirm("¿Eliminar esta píldora de psicoeducación?")) {
          psychoPills.splice(i, 1);
          localStorage.setItem("sonia_psycho_pills_v1", JSON.stringify(psychoPills));
          if (parseInt(editPillIndex.value, 10) === i) resetPillForm();
          renderAdminPillsList();
          renderPublicPsychoPills();
        }
      });
    });
  }

  if (btnCancelEditPill) btnCancelEditPill.addEventListener("click", resetPillForm);

  if (adminPillForm) {
    adminPillForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const idx = parseInt(editPillIndex.value, 10);
      const item = {
        title: document.getElementById("adminPillTitle").value.trim(),
        text: document.getElementById("adminPillText").value.trim()
      };
      if (idx >= 0 && psychoPills[idx]) {
        psychoPills[idx] = item;
        alert("Píldora actualizada.");
      } else {
        psychoPills.push(item);
        alert("Píldora agregada.");
      }
      localStorage.setItem("sonia_psycho_pills_v1", JSON.stringify(psychoPills));
      resetPillForm();
      renderAdminPillsList();
      renderPublicPsychoPills();
    });
  }

  /* --- ADMIN: GESTIÓN DE REFLEXIÓN DIARIA --- */
  const adminQuoteForm = document.getElementById("adminQuoteForm");
  const editQuoteIndex = document.getElementById("editQuoteIndex");
  const quoteFormHeading = document.getElementById("quoteFormHeading");
  const btnSubmitQuote = document.getElementById("btnSubmitQuote");
  const btnCancelEditQuote = document.getElementById("btnCancelEditQuote");

  function resetQuoteForm() {
    adminQuoteForm.reset();
    editQuoteIndex.value = "-1";
    quoteFormHeading.textContent = "Agregar Nueva Reflexión";
    btnSubmitQuote.textContent = "Agregar Reflexión";
    btnCancelEditQuote.style.display = "none";
  }

  function renderAdminQuotesList() {
    const container = document.getElementById("adminQuotesList");
    if (!container) return;
    container.innerHTML = "";
    quotes.forEach((q, idx) => {
      const card = document.createElement("div");
      card.className = "legal-box";
      card.style.cssText = "padding: 1rem; border-radius: 14px; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;";
      card.innerHTML = `
        <div>
          <p style="font-style: italic; font-size: 0.92rem;">${q.body}</p>
          <small class="text-muted">${q.author}</small>
        </div>
        <div style="display: flex; gap: 0.4rem; flex-shrink: 0;">
          <button type="button" class="btn btn-secondary btn-edit-quote" data-idx="${idx}" style="padding: 0.4rem 0.7rem; font-size: 0.78rem;">Editar</button>
          <button type="button" class="btn btn-secondary btn-del-quote" data-idx="${idx}" style="padding: 0.4rem 0.7rem; font-size: 0.78rem; color: #e57373;">Borrar</button>
        </div>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".btn-edit-quote").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        editQuoteIndex.value = i;
        document.getElementById("adminQuoteBody").value = quotes[i].body.replace(/^"|"$/g, "");
        document.getElementById("adminQuoteAuthor").value = quotes[i].author.replace(/^—\s*/, "");
        quoteFormHeading.textContent = "Editando Reflexión";
        btnSubmitQuote.textContent = "Guardar Cambios";
        btnCancelEditQuote.style.display = "inline-block";
      });
    });

    document.querySelectorAll(".btn-del-quote").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (confirm("¿Eliminar esta reflexión?")) {
          quotes.splice(i, 1);
          localStorage.setItem("sonia_quotes_v1", JSON.stringify(quotes));
          if (parseInt(editQuoteIndex.value, 10) === i) resetQuoteForm();
          renderAdminQuotesList();
          renderCurrentQuote();
        }
      });
    });
  }

  if (btnCancelEditQuote) btnCancelEditQuote.addEventListener("click", resetQuoteForm);

  if (adminQuoteForm) {
    adminQuoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const idx = parseInt(editQuoteIndex.value, 10);
      const rawBody = document.getElementById("adminQuoteBody").value.trim();
      const rawAuth = document.getElementById("adminQuoteAuthor").value.trim();
      const item = {
        body: `"${rawBody.replace(/^"|"$/g, "")}"`,
        author: `— ${rawAuth.replace(/^—\s*/, "")}`
      };
      if (idx >= 0 && quotes[idx]) {
        quotes[idx] = item;
        alert("Reflexión actualizada.");
      } else {
        quotes.push(item);
        alert("Reflexión agregada.");
      }
      localStorage.setItem("sonia_quotes_v1", JSON.stringify(quotes));
      resetQuoteForm();
      renderAdminQuotesList();
      renderCurrentQuote();
    });
  }

  /* --- ADMIN: GESTIÓN DE CHECK-IN EMOCIONAL (AGREGAR, EDITAR, BORRAR) --- */
  const adminMoodForm = document.getElementById("adminMoodForm");
  const editMoodIndex = document.getElementById("editMoodIndex");
  const moodFormHeading = document.getElementById("moodFormHeading");
  const btnSubmitMood = document.getElementById("btnSubmitMood");
  const btnCancelEditMood = document.getElementById("btnCancelEditMood");

  function resetMoodForm() {
    if (!adminMoodForm) return;
    adminMoodForm.reset();
    editMoodIndex.value = "-1";
    moodFormHeading.textContent = "Agregar Estado Emocional";
    btnSubmitMood.textContent = "Agregar Estado";
    btnCancelEditMood.style.display = "none";
  }

  function renderAdminMoodsList() {
    const container = document.getElementById("adminMoodsList");
    if (!container) return;
    container.innerHTML = "";
    moodList.forEach((m, idx) => {
      const card = document.createElement("div");
      card.className = "legal-box";
      card.style.cssText = "padding: 1rem; border-radius: 14px; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;";
      card.innerHTML = `
        <div>
          <span class="badge" style="font-size: 0.72rem; margin-bottom: 0.4rem;">${m.label}</span>
          <h4 style="font-size: 0.98rem;">${m.title}</h4>
          <p class="text-muted text-sm" style="margin-top: 0.3rem;">${m.text}</p>
        </div>
        <div style="display: flex; gap: 0.4rem; flex-shrink: 0;">
          <button type="button" class="btn btn-secondary btn-edit-mood" data-idx="${idx}" style="padding: 0.4rem 0.7rem; font-size: 0.78rem;">Editar</button>
          <button type="button" class="btn btn-secondary btn-del-mood" data-idx="${idx}" style="padding: 0.4rem 0.7rem; font-size: 0.78rem; color: #e57373;">Borrar</button>
        </div>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".btn-edit-mood").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        editMoodIndex.value = i;
        document.getElementById("adminMoodLabelInput").value = moodList[i].label;
        document.getElementById("adminMoodTitleInput").value = moodList[i].title;
        document.getElementById("adminMoodTextInput").value = moodList[i].text;
        moodFormHeading.textContent = "Editando Estado Emocional";
        btnSubmitMood.textContent = "Guardar Cambios";
        btnCancelEditMood.style.display = "inline-block";
      });
    });

    document.querySelectorAll(".btn-del-mood").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (moodList.length <= 1) {
          return alert("Debe haber al menos 1 estado emocional activo.");
        }
        if (confirm(`¿Eliminar el estado "${moodList[i].label}"?`)) {
          moodList.splice(i, 1);
          localStorage.setItem("sonia_mood_list_v2", JSON.stringify(moodList));
          if (parseInt(editMoodIndex.value, 10) === i) resetMoodForm();
          if (activeMoodIndex === i) activeMoodIndex = -1;
          renderAdminMoodsList();
          renderPublicMoodButtons();
        }
      });
    });
  }

  if (btnCancelEditMood) btnCancelEditMood.addEventListener("click", resetMoodForm);

  if (adminMoodForm) {
    adminMoodForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const idx = parseInt(editMoodIndex.value, 10);
      const labelVal = document.getElementById("adminMoodLabelInput").value.trim();
      const item = {
        id: labelVal.toLowerCase().replace(/\s+/g, "_"),
        label: labelVal,
        icon: "",
        title: document.getElementById("adminMoodTitleInput").value.trim(),
        text: document.getElementById("adminMoodTextInput").value.trim()
      };

      if (idx >= 0 && moodList[idx]) {
        moodList[idx] = item;
        alert("Estado emocional actualizado.");
      } else {
        moodList.push(item);
        alert("Nuevo estado emocional agregado.");
      }

      localStorage.setItem("sonia_mood_list_v2", JSON.stringify(moodList));
      resetMoodForm();
      renderAdminMoodsList();
      renderPublicMoodButtons();
    });
  }

  /* --- ADMIN: GESTIÓN DE NOTICIAS (CREAR, EDITAR, ELIMINAR) --- */
  const addNewsForm = document.getElementById("addNewsForm");
  const editNewsIndexInput = document.getElementById("editNewsIndex");
  const newsFormHeading = document.getElementById("newsFormHeading");
  const btnSubmitNews = document.getElementById("btnSubmitNews");
  const btnCancelEditNews = document.getElementById("btnCancelEditNews");
  const adminNewsListContainer = document.getElementById("adminNewsListContainer");

  function resetNewsForm() {
    addNewsForm.reset();
    editNewsIndexInput.value = "-1";
    newsFormHeading.textContent = "Publicar Nueva Noticia";
    btnSubmitNews.textContent = "Publicar Noticia";
    btnCancelEditNews.style.display = "none";
  }

  function renderAdminNewsList() {
    if (!adminNewsListContainer) return;
    adminNewsListContainer.innerHTML = "";
    if (!noticias.length) {
      adminNewsListContainer.innerHTML = "<p class='text-muted text-sm'>No hay noticias registradas.</p>";
      return;
    }
    noticias.forEach((n, idx) => {
      const card = document.createElement("div");
      card.className = "legal-box";
      card.style.cssText = "padding: 1rem; border-radius: 14px; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;";
      card.innerHTML = `
        <div>
          <span class="badge" style="font-size: 0.7rem;">${n.cat}</span>
          <h4 style="font-size: 0.98rem; margin-top: 0.4rem;">${n.tit}</h4>
          <p class="text-muted text-sm" style="margin-top: 0.2rem;">${n.res}</p>
        </div>
        <div style="display: flex; gap: 0.4rem; flex-shrink: 0;">
          <button type="button" class="btn btn-secondary btn-edit-news" data-idx="${idx}" style="padding: 0.4rem 0.7rem; font-size: 0.78rem;">Editar</button>
          <button type="button" class="btn btn-secondary btn-del-news" data-idx="${idx}" style="padding: 0.4rem 0.7rem; font-size: 0.78rem; color: #e57373;">Borrar</button>
        </div>
      `;
      adminNewsListContainer.appendChild(card);
    });

    document.querySelectorAll(".btn-edit-news").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        const item = noticias[i];
        editNewsIndexInput.value = i;
        document.getElementById("adminNewsCat").value = item.cat;
        document.getElementById("adminNewsTitle").value = item.tit;
        document.getElementById("adminNewsSource").value = item.fuente || "Psic. Sonia Vargas";
        document.getElementById("adminNewsBody").value = item.cuerpo || item.res;
        newsFormHeading.textContent = "Editando Noticia";
        btnSubmitNews.textContent = "Guardar Cambios";
        btnCancelEditNews.style.display = "inline-block";
      });
    });

    document.querySelectorAll(".btn-del-news").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        if (confirm("¿Seguro que deseas eliminar esta noticia?")) {
          noticias.splice(i, 1);
          localStorage.setItem("sonia_noticias_v3", JSON.stringify(noticias));
          if (parseInt(editNewsIndexInput.value, 10) === i) resetNewsForm();
          renderAdminNewsList();
          renderNoticia(0);
        }
      });
    });
  }

  if (btnCancelEditNews) {
    btnCancelEditNews.addEventListener("click", resetNewsForm);
  }

  if (addNewsForm) {
    addNewsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const idx = parseInt(editNewsIndexInput.value, 10);
      const bodyVal = document.getElementById("adminNewsBody").value;
      const obj = {
        cat: document.getElementById("adminNewsCat").value,
        tit: document.getElementById("adminNewsTitle").value,
        fuente: document.getElementById("adminNewsSource").value,
        res: bodyVal.length > 110 ? bodyVal.substring(0, 110) + "..." : bodyVal,
        cuerpo: bodyVal
      };

      if (idx >= 0 && noticias[idx]) {
        noticias[idx] = obj;
        alert("Noticia actualizada correctamente.");
      } else {
        noticias.unshift(obj);
        alert("Noticia publicada exitosamente.");
      }

      localStorage.setItem("sonia_noticias_v3", JSON.stringify(noticias));
      resetNewsForm();
      renderAdminNewsList();
      renderNoticia(0);
    });
  }

  /* --- ADMIN: TAMAÑO DE TIPOGRAFÍA GLOBAL --- */
  const btnFontDecrease = document.getElementById("btnFontDecrease");
  const btnFontIncrease = document.getElementById("btnFontIncrease");
  const btnFontReset = document.getElementById("btnFontReset");

  if (btnFontDecrease) btnFontDecrease.addEventListener("click", () => applyFontScale(currentFontScale - 5));
  if (btnFontIncrease) btnFontIncrease.addEventListener("click", () => applyFontScale(currentFontScale + 5));
  if (btnFontReset) btnFontReset.addEventListener("click", () => applyFontScale(100));

  /* ===================================================
     8. EXPORTACIÓN DE REPORTES A EXCEL / CSV
     =================================================== */
  function descargarCSV(filename, rows) {
    const processRow = (row) => row.map(val => `"${(val || "").toString().replace(/"/g, '""')}"`).join(",");
    const csvContent = "\uFEFF" + rows.map(processRow).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const btnExportCitas = document.getElementById("btnExportCitas");
  if (btnExportCitas) {
    btnExportCitas.addEventListener("click", () => {
      const citas = JSON.parse(localStorage.getItem("sonia_bookings_v3") || "[]");
      if (!citas.length) return alert("No hay citas registradas.");
      const rows = [["ID", "Fecha", "Horario", "Nombre", "Correo", "Notas", "Estado"]];
      citas.forEach(c => rows.push([c.id, c.date, c.timeSlot, c.name, c.email, c.notes, c.status]));
      descargarCSV("Reporte_Citas_SoniaVargas.csv", rows);
    });
  }

  const btnExportTest = document.getElementById("btnExportTest");
  if (btnExportTest) {
    btnExportTest.addEventListener("click", () => {
      const tests = JSON.parse(localStorage.getItem("sonia_test_results_v1") || "[]");
      if (!tests.length) return alert("No hay resultados de test registrados.");
      const rows = [["ID", "Tipo", "Nombre", "Correo", "Puntaje", "Fecha"]];
      tests.forEach(t => rows.push([t.id, t.tipo, t.nombre, t.email, t.puntaje, t.fecha]));
      descargarCSV("Reporte_Test_Resultados.csv", rows);
    });
  }

  /* ===================================================
     9. CHATBOT FLOTANTE
     =================================================== */
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const closeChatbot = document.getElementById("closeChatbot");
  const btnSendChat = document.getElementById("btnSendChat");
  const chatInput = document.getElementById("chatInput");
  const chatbotBody = document.getElementById("chatbotBody");

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener("click", () => {
      chatbotWindow.style.display = chatbotWindow.style.display === "none" ? "flex" : "none";
    });
  }
  if (closeChatbot && chatbotWindow) {
    closeChatbot.addEventListener("click", () => chatbotWindow.style.display = "none");
  }

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("chat-msg", sender === "user" ? "user-msg" : "bot-msg");
    msg.textContent = text;
    chatbotBody.appendChild(msg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  if (btnSendChat) btnSendChat.addEventListener("click", handleChat);
  if (chatInput) chatInput.addEventListener("keypress", (e) => { if (e.key === "Enter") handleChat(); });

  function handleChat() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "Entiendo. Puedes agendar una cita de orientación con Sonia directamente desde la vista de Inicio.";
      if (lower.includes("cita") || lower.includes("agendar")) reply = "¡Claro! Haz clic en 'Agendar Cita' dentro de la tarjeta de la Psicóloga Sonia.";
      if (lower.includes("hola")) reply = "¡Hola! ¿Cómo te sientes hoy? Estoy aquí para apoyarte.";
      if (lower.includes("triste")) reply = "Que mal que te sientas asi, podemos ayudar a tratarlo, te recomiendo que agendes una cita con la psicologa Sonia, para ayudarte";
      if (lower.includes("suicidio") || lower.includes("suicidarme")) reply = "Toma un momento, respira y piensa bien lo que haces, inspecciona tus emociones, lo que te recomiendo es que agendes una cita para poder apoyarte, ¡No estas solo!";
      if (lower.includes("solo")) reply = "No te sientas asi, no estas solo, te recomiendo que agendes una cita con la psicologa Sonia, para ayudarte";
      addMessage(reply, "bot");
    }, 600);
  }

  /* ===================================================
     10. AGENDA DE CITAS Y REGLAS
     =================================================== */
  const bookingModal = document.getElementById("bookingModal");
  const closeBookingModal = document.getElementById("closeBookingModal");
  const bookingDateInput = document.getElementById("bookingDate");
  const bookingTimeSelect = document.getElementById("bookingTime");
  const bookingForm = document.getElementById("bookingForm");
  const bookingSuccess = document.getElementById("bookingSuccess");
  const closeSuccessBtn = document.getElementById("closeSuccessBtn");
  const trafficLightBadge = document.getElementById("trafficLightBadge");

  const todayStr = new Date().toISOString().split("T")[0];
  if (bookingDateInput) bookingDateInput.min = todayStr;

  const masterTimeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00"
  ];

  function getBookings() { return JSON.parse(localStorage.getItem("sonia_bookings_v3") || "[]"); }

  function updateTimeSlots(dateStr) {
    if (!bookingTimeSelect) return;
    bookingTimeSelect.innerHTML = "";
    trafficLightBadge.style.display = "none";

    if (!dateStr) {
      bookingTimeSelect.innerHTML = '<option value="">-- Selecciona fecha --</option>';
      return;
    }
    const dObj = new Date(dateStr.split("-")[0], dateStr.split("-")[1] - 1, dateStr.split("-")[2]);
    if (dObj.getDay() === 0 || dObj.getDay() === 6) {
      bookingTimeSelect.innerHTML = '<option value="">Fin de semana no disponible</option>';
      trafficLightBadge.textContent = "No Hábil";
      trafficLightBadge.className = "traffic-pill traffic-red";
      trafficLightBadge.style.display = "block";
      return;
    }

    const reserved = getBookings().filter(b => b.date === dateStr && b.status !== "Cancelada").map(b => b.timeSlot);
    let disponibles = 0;
    masterTimeSlots.forEach(slot => {
      const opt = document.createElement("option");
      opt.value = slot;
      if (reserved.includes(slot)) { opt.textContent = `${slot} (Lleno)`; opt.disabled = true; } 
      else { opt.textContent = `${slot}`; disponibles++; }
      bookingTimeSelect.appendChild(opt);
    });

    trafficLightBadge.style.display = "block";
    if (disponibles >= 8) { trafficLightBadge.textContent = `Disponible (${disponibles})`; trafficLightBadge.className = "traffic-pill traffic-green"; }
    else if (disponibles > 0) { trafficLightBadge.textContent = `(${disponibles})`; trafficLightBadge.className = "traffic-pill traffic-yellow"; }
    else { trafficLightBadge.textContent = `Lleno`; trafficLightBadge.className = "traffic-pill traffic-red"; }
  }

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("open-booking-btn")) {
      document.getElementById("quizModal").style.display = "none";
      bookingForm.reset(); bookingSuccess.style.display = "none"; bookingForm.style.display = "block";
      updateTimeSlots(""); bookingModal.style.display = "flex";
    }
  });

  if (closeBookingModal) closeBookingModal.addEventListener("click", () => bookingModal.style.display = "none");
  if (bookingDateInput) bookingDateInput.addEventListener("change", (e) => updateTimeSlots(e.target.value));

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const list = getBookings();
      const newRecord = {
        id: "CIT-" + Date.now(), date: bookingDateInput.value, timeSlot: bookingTimeSelect.value,
        name: document.getElementById("clientName").value, email: document.getElementById("clientEmail").value,
        notes: document.getElementById("bookingNotes").value, status: "Confirmada"
      };
      list.push(newRecord);
      localStorage.setItem("sonia_bookings_v3", JSON.stringify(list));

      document.getElementById("successDetails").innerHTML = `<b>Folio:</b> ${newRecord.id}<br><b>Día:</b> ${newRecord.date} a las ${newRecord.timeSlot}<br><small>Cancelaciones max 24h antes.</small>`;
      bookingForm.style.display = "none"; bookingSuccess.style.display = "block";
    });
  }
  if (closeSuccessBtn) closeSuccessBtn.addEventListener("click", () => bookingModal.style.display = "none");

  /* ===================================================
     11. MIS CITAS
     =================================================== */
  const manageModal = document.getElementById("manageBookingModal");
  const btnOpenManageBooking = document.getElementById("btnOpenManageBooking");
  const closeManageModal = document.getElementById("closeManageModal");
  const btnSearchBooking = document.getElementById("btnSearchBooking");

  if (btnOpenManageBooking) {
    btnOpenManageBooking.addEventListener("click", () => { document.getElementById("userBookingsList").innerHTML = ""; manageModal.style.display = "flex"; });
  }
  if (closeManageModal) closeManageModal.addEventListener("click", () => manageModal.style.display = "none");

  if (btnSearchBooking) {
    btnSearchBooking.addEventListener("click", () => {
      const email = document.getElementById("searchBookingEmail").value.trim().toLowerCase();
      const list = getBookings().filter(b => b.email.toLowerCase() === email);
      const container = document.getElementById("userBookingsList");
      container.innerHTML = "";
      if (!list.length) return container.innerHTML = "<p class='text-muted'>Sin citas.</p>";
      list.forEach(b => {
        const item = document.createElement("div");
        item.style.cssText = "background:var(--input-bg); padding:1rem; border-radius:12px; margin-bottom:1rem; font-size:0.9rem; border:1px solid var(--glass-border);";
        const diff = (new Date(`${b.date}T${b.timeSlot.split(" - ")[0]}:00`) - new Date()) / 36e5;
        item.innerHTML = `<strong>${b.date} - ${b.timeSlot}</strong><br>Estado: ${b.status}<br>` + 
          (b.status === "Cancelada" ? "" : (diff >= 24 ? `<button class="btn btn-secondary cancel-btn" data-id="${b.id}" style="margin-top:0.5rem;color:#e57373;padding:0.3rem 0.6rem;">Cancelar</button>` : `<small style="color:orange">No cancelable (<24h)</small>`));
        container.appendChild(item);
      });
      document.querySelectorAll(".cancel-btn").forEach(btn => btn.addEventListener("click", (e) => {
        const all = getBookings(); const target = all.find(x => x.id === e.target.dataset.id);
        if(target) { target.status = "Cancelada"; localStorage.setItem("sonia_bookings_v3", JSON.stringify(all)); manageModal.style.display="none"; alert("Cancelada."); }
      }));
    });
  }

  /* ===================================================
     12. TEST EMOCIONALES (DINÁMICOS + AGREGAR/QUITAR + ESTADÍSTICAS)
     =================================================== */
  const defaultQuizData = {
    individual: { tit: "Test Individual", p: ["¿Dificultad para relajarte?", "¿Pérdida de motivación?", "¿Insomnio por preocupación?", "¿Tensión física constante?", "¿Dificultad para concentrarte?"] },
    pareja: { tit: "Test de Pareja", p: ["¿Discusiones sin solución?", "¿Temor a expresar desacuerdos?", "¿Distanciamiento afectivo?", "¿Tensión por finanzas?", "¿Falta de confianza?"] },
    identidad: { tit: "Test de Identidad", p: ["¿Incongruencia con género asignado?", "¿Ansiedad en entornos sociales?", "¿Deseo de modificar expresión?", "¿Falta de redes de apoyo?", "¿Dudas sobre cómo comunicarlo?"] }
  };

  let quizData = JSON.parse(localStorage.getItem("sonia_custom_quizzes_v1") || "null") || JSON.parse(JSON.stringify(defaultQuizData));

  function getQuizAccessStats() {
    return JSON.parse(localStorage.getItem("sonia_quiz_access_stats_v1") || '{"individual":0,"pareja":0,"identidad":0}');
  }

  function incrementQuizAccess(key) {
    const stats = getQuizAccessStats();
    stats[key] = (stats[key] || 0) + 1;
    localStorage.setItem("sonia_quiz_access_stats_v1", JSON.stringify(stats));
  }

  function renderAdminStats() {
    const grid = document.getElementById("adminStatsGrid");
    if (!grid) return;
    const accessStats = getQuizAccessStats();
    const completedList = JSON.parse(localStorage.getItem("sonia_test_results_v1") || "[]");
    const totalIngresos = (accessStats.individual || 0) + (accessStats.pareja || 0) + (accessStats.identidad || 0);

    const items = [
      { key: "individual", label: "Test Individual", titleMatch: "Test Individual" },
      { key: "pareja", label: "Test de Pareja", titleMatch: "Test de Pareja" },
      { key: "identidad", label: "Test de Identidad", titleMatch: "Test de Identidad" }
    ];

    grid.innerHTML = "";
    items.forEach(item => {
      const views = accessStats[item.key] || 0;
      const completed = completedList.filter(r => r.tipo === item.titleMatch).length;
      const pct = totalIngresos > 0 ? Math.round((views / totalIngresos) * 100) : 0;

      const card = document.createElement("div");
      card.className = "legal-box";
      card.style.cssText = "padding: 1.4rem; border-radius: 18px;";
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge">${item.label}</span>
          <strong style="color: var(--accent-bright); font-size: 0.9rem;">${pct}% del tráfico</strong>
        </div>
        <div style="margin: 1rem 0;">
          <div style="font-size: 2.2rem; font-weight: 700; font-family: 'Space Grotesk', sans-serif;">${views}</div>
          <small class="text-muted">Ingresos / Aperturas del cuestionario</small>
        </div>
        <div style="width: 100%; height: 8px; background: var(--input-bg); border-radius: 10px; overflow: hidden; margin-bottom: 0.8rem;">
          <div style="width: ${pct}%; height: 100%; background: var(--accent-bright); transition: width 0.4s;"></div>
        </div>
        <p class="text-muted text-sm">Evaluaciones finalizadas: <strong>${completed}</strong></p>
      `;
      grid.appendChild(card);
    });
  }

  const btnResetTestStats = document.getElementById("btnResetTestStats");
  if (btnResetTestStats) {
    btnResetTestStats.addEventListener("click", () => {
      if (confirm("¿Deseas reiniciar a 0 tanto los ingresos como el historial de evaluaciones finalizadas?")) {
        localStorage.setItem("sonia_quiz_access_stats_v1", '{"individual":0,"pareja":0,"identidad":0}');
        localStorage.setItem("sonia_test_results_v1", "[]");
        renderAdminStats();
      }
    });
  }

  // Editor Dinámico de Preguntas (Agregar / Quitar / Editar)
  const adminSelectQuizType = document.getElementById("adminSelectQuizType");
  const adminQuizQuestionsFields = document.getElementById("adminQuizQuestionsFields");
  const adminEditQuizForm = document.getElementById("adminEditQuizForm");
  const btnRestoreDefaultQuiz = document.getElementById("btnRestoreDefaultQuiz");
  const btnAddQuizQuestion = document.getElementById("btnAddQuizQuestion");

  function syncInputsToMemory(selectedKey) {
    const inputs = document.querySelectorAll(".admin-q-input");
    if (!inputs.length) return;
    const currentValues = [];
    inputs.forEach(inp => currentValues.push(inp.value));
    quizData[selectedKey].p = currentValues;
  }

  function renderAdminQuizEditor() {
    if (!adminSelectQuizType || !adminQuizQuestionsFields) return;
    const selected = adminSelectQuizType.value;
    const questions = quizData[selected].p;
    adminQuizQuestionsFields.innerHTML = "";

    questions.forEach((qText, i) => {
      const row = document.createElement("div");
      row.innerHTML = `
        <label class="text-sm text-muted">Pregunta ${i + 1}</label>
        <div style="display: flex; gap: 0.6rem; align-items: center; margin-top: 0.3rem;">
          <input type="text" class="input-field admin-q-input" data-qidx="${i}" value="${qText.replace(/"/g, '&quot;')}" placeholder="Escribe la pregunta..." required style="flex: 1;">
          <button type="button" class="btn btn-secondary btn-remove-q" data-qidx="${i}" style="padding: 0.75rem 1rem; color: #e57373; flex-shrink: 0;" title="Quitar pregunta">Quitar</button>
        </div>
      `;
      adminQuizQuestionsFields.appendChild(row);
    });

    document.querySelectorAll(".btn-remove-q").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idxToRemove = parseInt(e.target.dataset.qidx, 10);
        syncInputsToMemory(selected);
        if (quizData[selected].p.length <= 1) {
          return alert("El cuestionario debe tener al menos 1 pregunta.");
        }
        quizData[selected].p.splice(idxToRemove, 1);
        renderAdminQuizEditor();
      });
    });
  }

  if (btnAddQuizQuestion) {
    btnAddQuizQuestion.addEventListener("click", () => {
      const selected = adminSelectQuizType.value;
      syncInputsToMemory(selected);
      quizData[selected].p.push("");
      renderAdminQuizEditor();
      const allInputs = document.querySelectorAll(".admin-q-input");
      if (allInputs.length) allInputs[allInputs.length - 1].focus();
    });
  }

  if (adminSelectQuizType) {
    adminSelectQuizType.addEventListener("change", renderAdminQuizEditor);
  }

  if (adminEditQuizForm) {
    adminEditQuizForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const selected = adminSelectQuizType.value;
      const inputs = document.querySelectorAll(".admin-q-input");
      const updatedQuestions = [];
      inputs.forEach(inp => {
        if (inp.value.trim()) updatedQuestions.push(inp.value.trim());
      });
      if (!updatedQuestions.length) return alert("Agrega al menos una pregunta válida.");
      quizData[selected].p = updatedQuestions;
      localStorage.setItem("sonia_custom_quizzes_v1", JSON.stringify(quizData));
      renderAdminQuizEditor();
      alert(`Preguntas de "${quizData[selected].tit}" guardadas (${updatedQuestions.length} preguntas activas).`);
    });
  }

  if (btnRestoreDefaultQuiz) {
    btnRestoreDefaultQuiz.addEventListener("click", () => {
      const selected = adminSelectQuizType.value;
      if (confirm(`¿Restaurar las 5 preguntas originales de "${quizData[selected].tit}"?`)) {
        quizData[selected].p = [...defaultQuizData[selected].p];
        localStorage.setItem("sonia_custom_quizzes_v1", JSON.stringify(quizData));
        renderAdminQuizEditor();
      }
    });
  }

  const quizFeedbackMap = {
    individual: {
      estable: { icon: "", title: "Bienestar Emocional Estable", text: "Muestras un nivel equilibrado de manejo del estrés cotidiano. Tus respuestas reflejan que cuentas con recursos de afrontamiento funcionales. Mantén tus hábitos de autocuidado." },
      moderado: { icon: "", title: "Nivel de Tensión Moderado", text: "Presentas señales leves o moderadas de agotamiento y preocupación. Es un momento ideal para hacer una pausa, revisar tus espacios de descanso y fortalecer tu regulación emocional." },
      significativo: { icon: "", title: "Indicadores de Carga Emocional Elevada", text: "Tus respuestas reflejan una carga considerable de estrés o ansiedad que puede estar afectando tu día a día. Te recomendamos contar con un espacio terapéutico guiado para canalizarlo." }
    },
    pareja: {
      estable: { icon: "", title: "Dinámica Relacional Saludable", text: "Existe una buena base de comunicación y resolución de conflictos. Mantener el diálogo abierto fortalecerá los acuerdos mutuos a largo plazo." },
      moderado: { icon: "", title: "Fricciones en la Comunicación", text: "Se observan puntos de tensión recurrentes o momentos de distanciamiento afectivo. Trabajar en técnicas de escucha activa puede prevenir desgastes en el vínculo." },
      significativo: { icon: "", title: "Necesidad de Mediación Profesional", text: "Se identifican desacuerdos intensos y dificultades para alcanzar consensos. Un espacio neutro de terapia de pareja les brindará herramientas para reconstruir la confianza." }
    },
    identidad: {
      estable: { icon: "", title: "Proceso de Autoafirmación Claro", text: "Cuentas con claridad en tu autoaceptación y redes de apoyo saludables. Continúa cultivando espacios donde te sientas plenamente validado(a)." },
      moderado: { icon: "", title: "Etapa de Autoexploración", text: "Experimentas dudas o cierta aprensión respecto a la aceptación en tus entornos cotidianos. Un acompañamiento empático ayuda a procesar estas transiciones con confianza." },
      significativo: { icon: "", title: "Acompañamiento Afirmativo Recomendado", text: "Identificamos sentimientos de aislamiento o tensión respecto a tu expresión e identidad. Contar con un acompañamiento profesional afirmativo reforzará tu autoestima y seguridad." }
    }
  };

  const quizModal = document.getElementById("quizModal");
  const qWrapper = document.getElementById("questionsWrapper");
  const qForm = document.getElementById("quizForm");
  let currentQuizKey = "individual";
  
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("open-quiz-btn")) {
      currentQuizKey = e.target.dataset.quiz;
      incrementQuizAccess(currentQuizKey);

      const data = quizData[currentQuizKey];
      document.getElementById("quizModalTitle").textContent = data.tit;
      qWrapper.innerHTML = "";
      data.p.forEach((q, i) => {
        qWrapper.innerHTML += `<div class="question-block"><p class="question-title">${i+1}. ${q}</p>
        <div class="options-group">
          <label><input type="radio" name="q${i}" value="0" required> Nunca</label>
          <label><input type="radio" name="q${i}" value="1"> Raras veces</label>
          <label><input type="radio" name="q${i}" value="2"> Frecuente</label>
          <label><input type="radio" name="q${i}" value="3"> Siempre</label>
        </div></div>`;
      });
      qForm.reset(); document.getElementById("quizResult").style.display="none"; qForm.style.display="block";
      quizModal.style.display="flex";
    }
  });
  
  const closeQuizModal = document.getElementById("closeQuizModal");
  if (closeQuizModal) closeQuizModal.addEventListener("click", () => quizModal.style.display="none");

  if (qForm) {
    qForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let score = 0; 
      for(let v of new FormData(qForm).values()) score += parseInt(v);

      const totalQuestions = quizData[currentQuizKey].p.length;
      const maxScore = totalQuestions * 3;
      const ratio = maxScore > 0 ? score / maxScore : 0;

      const rb = document.getElementById("resultLevelBadge");
      const scorePill = document.getElementById("resultScorePill");
      const resultTitle = document.getElementById("resultTitle");
      const resultIcon = document.getElementById("resultIcon");
      const resultFeedback = document.getElementById("resultFeedback");

      scorePill.textContent = `Puntaje: ${score}/${maxScore}`;

      let levelKey = "estable";
      if(ratio <= 0.34) { 
        levelKey = "estable";
        rb.textContent = "Nivel: Estable"; 
        rb.style.background = "rgba(46, 125, 50, 0.2)"; 
        rb.style.color="#81c784"; 
        rb.style.borderColor = "#2e7d32";
      } else if(ratio <= 0.67) { 
        levelKey = "moderado";
        rb.textContent = "Nivel: Moderado"; 
        rb.style.background = "rgba(245, 127, 23, 0.2)"; 
        rb.style.color="#fff176"; 
        rb.style.borderColor = "#f57f17";
      } else { 
        levelKey = "significativo";
        rb.textContent = "Nivel: Elevado / Atención Recomendada"; 
        rb.style.background = "rgba(198, 40, 40, 0.2)"; 
        rb.style.color="#e57373"; 
        rb.style.borderColor = "#c62828";
      }

      const feedbackObj = quizFeedbackMap[currentQuizKey][levelKey];
      resultTitle.textContent = feedbackObj.title;
      resultIcon.textContent = feedbackObj.icon;
      resultFeedback.textContent = feedbackObj.text;

      const testResultsList = JSON.parse(localStorage.getItem("sonia_test_results_v1") || "[]");
      testResultsList.push({
        id: "TST-" + Date.now(),
        tipo: quizData[currentQuizKey].tit,
        nombre: document.getElementById("quizUserName").value || "Anónimo",
        email: document.getElementById("quizUserEmail").value || "No proporcionado",
        puntaje: `${score}/${maxScore} (${rb.textContent})`,
        fecha: new Date().toLocaleDateString()
      });
      localStorage.setItem("sonia_test_results_v1", JSON.stringify(testResultsList));

      qForm.style.display="none"; 
      document.getElementById("quizResult").style.display="block";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  /* ===================================================
     1. ANIMACIÓN DEL LOGO Y DESPLIEGUE DEL ENGRANAJE
     =================================================== */
  const logoInteractiveBtn = document.getElementById("logoInteractiveBtn");
  const adminGearContainer = document.getElementById("adminGearContainer");

  if (logoInteractiveBtn && adminGearContainer) {
    logoInteractiveBtn.addEventListener("click", () => {
      logoInteractiveBtn.classList.toggle("rotated");
      adminGearContainer.classList.toggle("gear-visible");
    });
  }

  /* ===================================================
     2. PRIVACIDAD, COOKIES Y DERECHOS ARCO
     =================================================== */
  const privacyModal = document.getElementById("privacyModal");
  const btnAcceptPrivacy = document.getElementById("btnAcceptPrivacy");
  const btnOpenPrivacyFooter = document.getElementById("btnOpenPrivacyFooter");
  const btnOpenCookiesFooter = document.getElementById("btnOpenCookiesFooter");

  if (!localStorage.getItem("sonia_privacy_accepted_v2")) {
    privacyModal.style.display = "flex";
  }

  btnAcceptPrivacy.addEventListener("click", () => {
    localStorage.setItem("sonia_privacy_accepted_v2", "true");
    privacyModal.style.display = "none";
  });

  if (btnOpenPrivacyFooter) {
    btnOpenPrivacyFooter.addEventListener("click", () => privacyModal.style.display = "flex");
  }

  if (btnOpenCookiesFooter) {
    btnOpenCookiesFooter.addEventListener("click", () => {
      alert("Política de Cookies: Consciencia Plena utiliza almacenamiento local técnico (localStorage) exclusivamente para guardar tus preferencias de interfaz y citas locales.");
    });
  }

  /* ===================================================
     3. SISTEMA SPA: NAVEGACIÓN ENTRE VISTAS
     =================================================== */
  const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
  const pageViews = document.querySelectorAll(".page-view");
  const topbarTitle = document.getElementById("topbarTitle");
  const topbarSub = document.getElementById("topbarSub");

  const viewTitles = {
    "view-inicio": { title: "¡Hola, bienvenido(a)!", sub: "Explora herramientas didácticas para tu bienestar mental." },
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
    });
  });

  /* ===================================================
     4. CHECK-IN EMOCIONAL Y REFLEXIONES
     =================================================== */
  const moodBtns = document.querySelectorAll(".mood-btn");
  const moodFeedbackBox = document.getElementById("moodFeedback");
  const moodIcon = document.getElementById("moodIcon");
  const moodTitle = document.getElementById("moodTitle");
  const moodText = document.getElementById("moodText");

  const moodData = {
    tranquilo: { icon: "🌱", title: "Estado de Serenidad", text: "Aprovecha este momento de calma para reflexionar o practicar gratitud. Registrar qué facilitó esta tranquilidad te ayudará a replicarla." },
    ansioso: { icon: "🫁", title: "Manejo de Tensión", text: "La ansiedad es una respuesta defensiva de tu cuerpo. Intenta realizar 3 respiraciones profundas (4 segundos inhala, 8 segundos exhala) y recuerda que este malestar es temporal." },
    triste: { icon: "💙", title: "Validación y Permisividad", text: "Es completamente válido sentir desánimo. Trátate con compasión hoy y realiza una actividad pequeña de autocuidado que no requiera gran esfuerzo." },
    energia: { icon: "⚡", title: "Canalización Positiva", text: "¡Gran momento! Canaliza esa energía en proyectos pendientes, actividad física o expresar afecto a tus personas cercanas." },
    abrumado: { icon: "🧠", title: "Desaceleración y Foco", text: "Cuando todo parece demasiado, divide tus pendientes en pasos diminutos. Enfócate solo en la tarea más inmediata y haz una pausa de 5 minutos." }
  };

  moodBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      moodBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const moodKey = btn.dataset.mood;
      const data = moodData[moodKey];
      if (data) {
        moodIcon.textContent = data.icon;
        moodTitle.textContent = data.title;
        moodText.textContent = data.text;
        moodFeedbackBox.style.display = "block";
      }
    });
  });

  const quotes = [
    { body: '"El autocuidado no es un lujo, es una necesidad para tu salud emocional."', author: "— Enfoque Humanista" },
    { body: '"Tus emociones son señales de navegación, no decretos definitivos sobre quién eres."', author: "— Terapia Conductual" },
    { body: '"Reconocer que necesitas apoyo es el primer acto de valentía hacia tu bienestar."', author: "— Psic. Sonia Vargas" },
    { body: '"Aprender a poner límites saludables es una forma profunda de amor propio."', author: "— Psicoeducación" }
  ];
  let quoteIdx = 0;
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");
  const btnNewQuote = document.getElementById("btnNewQuote");

  if (btnNewQuote) {
    btnNewQuote.addEventListener("click", () => {
      quoteIdx = (quoteIdx + 1) % quotes.length;
      quoteText.textContent = quotes[quoteIdx].body;
      quoteAuthor.textContent = quotes[quoteIdx].author;
    });
  }

  /* ===================================================
     5. GESTIÓN DE NOTICIAS & CARRUSEL AUTOMÁTICO
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
  const addNewsForm = document.getElementById("addNewsForm");

  function renderNoticia(idx) {
    if (!noticias.length) return;
    newsCategory.textContent = noticias[idx].cat;
    newsTitleDisplay.textContent = noticias[idx].tit;
    newsSummary.textContent = noticias[idx].res;
    
    indicatorsContainer.innerHTML = "";
    noticias.forEach((_, i) => {
      const d = document.createElement("div");
      d.style.cssText = `width: 8px; height: 8px; border-radius: 50%; transition: background 0.3s; background: ${i === idx ? "var(--accent-bright)" : "var(--input-border)"};`;
      indicatorsContainer.appendChild(d);
    });
  }

  function siguienteNoticia() {
    notiIdx = (notiIdx + 1) % noticias.length;
    renderNoticia(notiIdx);
  }

  function anteriorNoticia() {
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

  document.getElementById("btnPrev").addEventListener("click", () => { anteriorNoticia(); startAutoplay(); });
  document.getElementById("btnNext").addEventListener("click", () => { siguienteNoticia(); startAutoplay(); });

  function abrirModalLectura(idx) {
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

  if (addNewsForm) {
    addNewsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nueva = {
        cat: document.getElementById("adminNewsCat").value,
        tit: document.getElementById("adminNewsTitle").value,
        fuente: document.getElementById("adminNewsSource").value,
        res: document.getElementById("adminNewsBody").value.substring(0, 110) + "...",
        cuerpo: document.getElementById("adminNewsBody").value
      };
      noticias.unshift(nueva);
      localStorage.setItem("sonia_noticias_v3", JSON.stringify(noticias));
      addNewsForm.reset();
      document.getElementById("adminPanelModal").style.display = "none";
      renderNoticia(0);
      alert("Noticia publicada exitosamente.");
    });
  }

  renderNoticia(0);
  startAutoplay();

  /* ===================================================
     6. TOGGLE MODO OSCURO / CLARO
     =================================================== */
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const body = document.body;

  const savedTheme = localStorage.getItem("sonia_theme_preference_v1") || "dark";
  if (savedTheme === "light") {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    themeToggleBtn.textContent = "☀️";
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    themeToggleBtn.textContent = "🌙";
  }

  themeToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      themeToggleBtn.textContent = "☀️";
      localStorage.setItem("sonia_theme_preference_v1", "light");
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      themeToggleBtn.textContent = "🌙";
      localStorage.setItem("sonia_theme_preference_v1", "dark");
    }
  });

  /* ===================================================
     7. PANEL DE ADMINISTRACIÓN UNIFICADO
     =================================================== */
  const adminPanelModal = document.getElementById("adminPanelModal");
  const btnOpenAdminGear = document.getElementById("btnOpenAdminGear");
  const closeAdminPanelModal = document.getElementById("closeAdminPanelModal");

  const tabAdminNews = document.getElementById("tabAdminNews");
  const tabAdminExcel = document.getElementById("tabAdminExcel");
  const sectionAdminNews = document.getElementById("sectionAdminNews");
  const sectionAdminExcel = document.getElementById("sectionAdminExcel");

  if (btnOpenAdminGear) {
    btnOpenAdminGear.addEventListener("click", () => {
      const pass = prompt("Clave de acceso de administración:");
      if (pass === "admin123") {
        adminPanelModal.style.display = "flex";
      } else if (pass !== null) {
        alert("Clave incorrecta.");
      }
    });
  }

  if (closeAdminPanelModal) {
    closeAdminPanelModal.addEventListener("click", () => adminPanelModal.style.display = "none");
  }

  if (tabAdminNews && tabAdminExcel) {
    tabAdminNews.addEventListener("click", () => {
      tabAdminNews.className = "btn btn-primary";
      tabAdminExcel.className = "btn btn-secondary";
      sectionAdminNews.style.display = "block";
      sectionAdminExcel.style.display = "none";
    });

    tabAdminExcel.addEventListener("click", () => {
      tabAdminExcel.className = "btn btn-primary";
      tabAdminNews.className = "btn btn-secondary";
      sectionAdminNews.style.display = "none";
      sectionAdminExcel.style.display = "block";
    });
  }

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

  document.getElementById("btnExportCitas").addEventListener("click", () => {
    const citas = JSON.parse(localStorage.getItem("sonia_bookings_v3") || "[]");
    if (!citas.length) return alert("No hay citas registradas.");
    const rows = [["ID", "Fecha", "Horario", "Nombre", "Correo", "Notas", "Estado"]];
    citas.forEach(c => rows.push([c.id, c.date, c.timeSlot, c.name, c.email, c.notes, c.status]));
    descargarCSV("Reporte_Citas_SoniaVargas.csv", rows);
  });

  document.getElementById("btnExportTest").addEventListener("click", () => {
    const tests = JSON.parse(localStorage.getItem("sonia_test_results_v1") || "[]");
    if (!tests.length) return alert("No hay resultados de test registrados.");
    const rows = [["ID", "Tipo", "Nombre", "Correo", "Puntaje", "Fecha"]];
    tests.forEach(t => rows.push([t.id, t.tipo, t.nombre, t.email, t.puntaje, t.fecha]));
    descargarCSV("Reporte_Test_Resultados.csv", rows);
  });

  document.getElementById("btnExportBuzon").addEventListener("click", () => {
    const buzon = JSON.parse(localStorage.getItem("sonia_buzon_v1") || "[]");
    if (!buzon.length) return alert("No hay mensajes en el buzón.");
    const rows = [["Nombre", "Correo", "Mensaje", "Fecha"]];
    buzon.forEach(m => rows.push([m.nombre, m.email, m.mensaje, m.fecha]));
    descargarCSV("Reporte_Buzon_Consultas.csv", rows);
  });

  /* ===================================================
     9. CHATBOT FLOTANTE
     =================================================== */
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const closeChatbot = document.getElementById("closeChatbot");
  const btnSendChat = document.getElementById("btnSendChat");
  const chatInput = document.getElementById("chatInput");
  const chatbotBody = document.getElementById("chatbotBody");

  chatbotToggle.addEventListener("click", () => {
    chatbotWindow.style.display = chatbotWindow.style.display === "none" ? "flex" : "none";
  });
  closeChatbot.addEventListener("click", () => chatbotWindow.style.display = "none");

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("chat-msg", sender === "user" ? "user-msg" : "bot-msg");
    msg.textContent = text;
    chatbotBody.appendChild(msg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  btnSendChat.addEventListener("click", handleChat);
  chatInput.addEventListener("keypress", (e) => { if (e.key === "Enter") handleChat(); });

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
      addMessage(reply, "bot");
    }, 1000);
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
      trafficLightBadge.textContent = "🔴 No Hábil";
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
      else { opt.textContent = `${slot} `; disponibles++; }
      bookingTimeSelect.appendChild(opt);
    });

    trafficLightBadge.style.display = "block";
    if (disponibles >= 8) { trafficLightBadge.textContent = `Disponible (${disponibles})`; trafficLightBadge.className = "traffic-pill traffic-green"; }
    else if (disponibles > 0) { trafficLightBadge.textContent = `Media Dispo (${disponibles})`; trafficLightBadge.className = "traffic-pill traffic-yellow"; }
    else { trafficLightBadge.textContent = `Lleno`; trafficLightBadge.className = "traffic-pill traffic-red"; }
  }

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("open-booking-btn")) {
      document.getElementById("quizModal").style.display = "none";
      bookingForm.reset(); bookingSuccess.style.display = "none"; bookingForm.style.display = "block";
      updateTimeSlots(""); bookingModal.style.display = "flex";
    }
  });

  closeBookingModal.addEventListener("click", () => bookingModal.style.display = "none");
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
  document.getElementById("btnOpenManageBooking").addEventListener("click", () => { document.getElementById("userBookingsList").innerHTML = ""; manageModal.style.display = "flex"; });
  document.getElementById("closeManageModal").addEventListener("click", () => manageModal.style.display = "none");

  document.getElementById("btnSearchBooking").addEventListener("click", () => {
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

  /* ===================================================
     12. TEST EMOCIONALES Y RETROALIMENTACIÓN PSICOLÓGICA
     =================================================== */
  const quizData = {
    individual: { tit: "Test Individual", p: ["¿Dificultad para relajarte?", "¿Pérdida de motivación?", "¿Insomnio por preocupación?", "¿Tensión física constante?", "¿Dificultad para concentrarte?"] },
    pareja: { tit: "Test de Pareja", p: ["¿Discusiones sin solución?", "¿Temor a expresar desacuerdos?", "¿Distanciamiento afectivo?", "¿Tensión por finanzas?", "¿Falta de confianza?"] },
    identidad: { tit: "Test de Identidad", p: ["¿Incongruencia con género asignado?", "¿Ansiedad en entornos sociales?", "¿Deseo de modificar expresión?", "¿Falta de redes de apoyo?", "¿Dudas sobre cómo comunicarlo?"] }
  };

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
  
  document.getElementById("closeQuizModal").addEventListener("click", () => quizModal.style.display="none");

  qForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let score = 0; 
    for(let v of new FormData(qForm).values()) score += parseInt(v);

    const rb = document.getElementById("resultLevelBadge");
    const scorePill = document.getElementById("resultScorePill");
    const resultTitle = document.getElementById("resultTitle");
    const resultIcon = document.getElementById("resultIcon");
    const resultFeedback = document.getElementById("resultFeedback");

    scorePill.textContent = `Puntaje: ${score}/15`;

    let levelKey = "estable";
    if(score <= 5) { 
      levelKey = "estable";
      rb.textContent = "Nivel: Estable"; 
      rb.style.background = "rgba(46, 125, 50, 0.2)"; 
      rb.style.color="#81c784"; 
      rb.style.borderColor = "#2e7d32";
    } else if(score <= 10) { 
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

    // Guardar resultado en historial local para reportes
    const testResultsList = JSON.parse(localStorage.getItem("sonia_test_results_v1") || "[]");
    testResultsList.push({
      id: "TST-" + Date.now(),
      tipo: quizData[currentQuizKey].tit,
      nombre: document.getElementById("quizUserName").value || "Anónimo",
      email: document.getElementById("quizUserEmail").value || "No proporcionado",
      puntaje: `${score}/15 (${rb.textContent})`,
      fecha: new Date().toLocaleDateString()
    });
    localStorage.setItem("sonia_test_results_v1", JSON.stringify(testResultsList));

    qForm.style.display="none"; 
    document.getElementById("quizResult").style.display="block";
  });
});

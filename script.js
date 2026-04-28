const API_BASE = "";
const TOTAL_STEPS = 11;

const stepMeta = [
  {
    title: "Zostaw kontakt",
    subtitle: "Potem przejdziemy przez krótki brief."
  },
  {
    title: "Co chcesz zbudować?",
    subtitle: "Wybierz, czego mniej więcej potrzebujesz."
  },
  {
    title: "Format projektu",
    subtitle: "Wybierz szybki start albo indywidualny projekt."
  },
  {
    title: "Sfera biznesu",
    subtitle: "Dopasujemy system do Twojej branży."
  },
  {
    title: "Źródła klientów",
    subtitle: "Zaznacz miejsca, z których przychodzą klienci."
  },
  {
    title: "Styl strony",
    subtitle: "Wybierz klimat wizualny albo opisz go własnymi słowami."
  },
  {
    title: "Funkcje strony",
    subtitle: "Zaznacz elementy, które mają znaleźć się w systemie."
  },
  {
    title: "Co teraz nie działa?",
    subtitle: "Pokażemy, co system ma naprawić."
  },
  {
    title: "Opis projektu",
    subtitle: "Opisz krótko, co chcesz zbudować."
  },
  {
    title: "Podsumowanie briefu",
    subtitle: "Sprawdź dane przed wysłaniem."
  },
  {
    title: "Brief zapisany",
    subtitle: "Wracam z propozycją systemu pod Twój biznes."
  }
];

const projectGoals = [
  {
    id: "form-page",
    title: "Strona z formularzem",
    description: "Prosta strona, która zbiera zgłoszenia od klientów."
  },
  {
    id: "landing-brief",
    title: "Landing + ankieta",
    description: "Strona sprzedażowa połączona z krótkim briefem."
  },
  {
    id: "lead-system",
    title: "System zgłoszeń",
    description: "Struktura, która porządkuje zapytania i automatyzuje kontakt."
  },
  {
    id: "consulting",
    title: "Nie wiem — chcę doradztwa",
    description: "Doradzimy, co ma największy sens dla Twojego biznesu."
  }
];

const projectFormats = [
  {
    id: "template",
    badge: "Szybki start",
    title: "Template",
    price: "od 600 zł",
    description: "Szybka strona na sprawdzonej strukturze. Dopasowujemy teksty, kolory i ofertę."
  },
  {
    id: "custom",
    badge: "Indywidualnie",
    title: "Custom",
    price: "wycena indywidualna",
    description: "Projekt dopasowany pod Twój biznes, styl i klienta. Więcej strategii i customu."
  }
];

const businessTypes = [
  "Beauty",
  "Nails",
  "Barber",
  "Studio",
  "Konsultacje",
  "Lokalna usługa",
  "Inne"
];

const clientSources = [
  "Instagram",
  "TikTok",
  "Google",
  "WhatsApp",
  "Telegram",
  "Reklamy",
  "Polecenia",
  "Inne"
];

const visualStyles = [
  {
    id: "dark-premium",
    title: "Dark premium",
    icons: "⬛ + 🟡",
    emoji: "🌑",
    description: "Ciemny, luksusowy styl"
  },
  {
    id: "light-clean",
    title: "Light clean",
    icons: "⚪ + 🔵",
    emoji: "⚪",
    description: "Jasny, czysty, nowoczesny"
  },
  {
    id: "tech-glass",
    title: "Tech glass",
    icons: "🟣 + 🔵",
    emoji: "🧊",
    description: "Glass, blur, styl technologiczny"
  },
  {
    id: "beauty-soft",
    title: "Beauty soft",
    icons: "🌸 + ⚪",
    emoji: "🌸",
    description: "Delikatny, kobiecy styl"
  },
  {
    id: "minimal",
    title: "Minimal",
    icons: "⚫ + ⚪",
    emoji: "➖",
    description: "Prosty i czysty"
  },
  {
    id: "not-sure",
    title: "Nie wiem",
    icons: "❓",
    emoji: "❓",
    description: "Doradzimy Ci"
  }
];

const features = [
  "Oferta",
  "Cennik",
  "Formularz / ankieta",
  "Opinie",
  "FAQ",
  "Mapa",
  "Galeria",
  "Social links",
  "Powiadomienia",
  "Auto odpowiedź (DM / WhatsApp)",
  "Integracja z kalendarzem"
  "Automatyzacja Instagram (DM)",
  "Powiadomienia Telegram",
  "Potwierdzenie SMS",
  "Przypomnienia SMS",
  "Zbieranie leadów",
  "Auto follow-up",
  "Nie wiem (dobierz za mnie)"
];

const painPoints = [
  "Klienci pytają o to samo",
  "Chaos w wiadomościach",
  "Brak strony",
  "Słaba oferta",
  "Brak zapisów",
  "Chcę wyglądać bardziej premium",
  "Inne"
];

const state = {
  step: 1,

  name: "",
  phone: "+48 ",
  contactExtra: "",

  projectGoal: "",
  projectFormat: "",

  businessType: "",
  businessOther: "",

  clientSources: [],
  clientSourcesOther: "",

  visualStyle: "",
  visualDescription: "",

  features: [],

  painPoints: [],
  painDescription: "",

  projectDescription: "",

  submitting: false
};

const steps = [...document.querySelectorAll(".step")];

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const stepPill = document.getElementById("stepPill");
const stepTitle = document.getElementById("stepTitle");
const stepSubtitle = document.getElementById("stepSubtitle");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const contactExtraInput = document.getElementById("contactExtraInput");

const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");

const projectGoalGrid = document.getElementById("projectGoalGrid");
const projectFormatGrid = document.getElementById("projectFormatGrid");

const businessTypeGrid = document.getElementById("businessTypeGrid");
const businessOtherBox = document.getElementById("businessOtherBox");
const businessOtherInput = document.getElementById("businessOtherInput");

const clientSourcesGrid = document.getElementById("clientSourcesGrid");
const clientSourcesOtherBox = document.getElementById("clientSourcesOtherBox");
const clientSourcesOtherInput = document.getElementById("clientSourcesOtherInput");

const visualStyleGrid = document.getElementById("visualStyleGrid");
const visualDescriptionInput = document.getElementById("visualDescriptionInput");

const featuresGrid = document.getElementById("featuresGrid");

const painPointsGrid = document.getElementById("painPointsGrid");
const painDescriptionInput = document.getElementById("painDescriptionInput");

const projectDescriptionInput = document.getElementById("projectDescriptionInput");

const submitError = document.getElementById("submitError");

function normalizePhone(value) {
  let digits = String(value || "").replace(/\D/g, "");

  if (digits.startsWith("48")) {
    digits = digits.slice(2);
  }

  digits = digits.slice(0, 9);

  let result = "+48";
  if (digits.length > 0) result += ` ${digits.slice(0, 3)}`;
  if (digits.length > 3) result += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) result += ` ${digits.slice(6, 9)}`;

  return result === "+48" ? "+48 " : result;
}

function isValidName(value) {
  return String(value || "").trim().length >= 2;
}

function isValidPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("48");
}

function getLabelById(list, id) {
  const item = list.find((entry) => entry.id === id);
  return item?.title || "—";
}

function getBusinessLabel() {
  if (state.businessType === "Inne") {
    return state.businessOther.trim() || "Inne";
  }

  return state.businessType || "—";
}

function getProjectGoalLabel() {
  return getLabelById(projectGoals, state.projectGoal);
}

function getProjectFormatLabel() {
  const format = projectFormats.find((item) => item.id === state.projectFormat);
  if (!format) return "—";
  return `${format.title} — ${format.price}`;
}

function getVisualStyleLabel() {
  const style = visualStyles.find((item) => item.id === state.visualStyle);
  if (!style) return "—";
  return `${style.emoji} ${style.title}`;
}

function listText(values) {
  if (!Array.isArray(values) || values.length === 0) return "—";
  return values.join(", ");
}

function updateBindings() {
  const bindings = {
    name: state.name || "—",
    phone: state.phone || "—",
    contactExtra: state.contactExtra || "—",
    projectGoal: getProjectGoalLabel(),
    projectFormat: getProjectFormatLabel(),
    businessType: getBusinessLabel(),
    clientSources: listText(
      state.clientSources.includes("Inne") && state.clientSourcesOther.trim()
        ? [...state.clientSources.filter((item) => item !== "Inne"), state.clientSourcesOther.trim()]
        : state.clientSources
    ),
    visualStyle: getVisualStyleLabel(),
    visualDescription: state.visualDescription || "—",
    features: listText(state.features),
    painPoints: listText(state.painPoints),
    painDescription: state.painDescription || "—",
    projectDescription: state.projectDescription || "—"
  };

  Object.entries(bindings).forEach(([key, value]) => {
    document.querySelectorAll(`[data-bind="${key}"]`).forEach((el) => {
      el.textContent = value;
    });
  });
}

function updateHeader() {
  const meta = stepMeta[state.step - 1];

  stepTitle.textContent = meta.title;
  stepSubtitle.textContent = meta.subtitle;
  stepPill.textContent = `${state.step} / ${TOTAL_STEPS}`;

  const percent = Math.round((state.step / TOTAL_STEPS) * 100);
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${percent}%`;
}

function updateNav() {
  if (state.step === 11) {
    backBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    return;
  }

  backBtn.classList.remove("hidden");
  nextBtn.classList.remove("hidden");

  backBtn.style.visibility = state.step === 1 ? "hidden" : "visible";

  nextBtn.classList.remove("pulse");

  if (state.step === 10) {
    nextBtn.textContent = state.submitting ? "Wysyłanie..." : "Wyślij brief";
    nextBtn.classList.add("pulse");
  } else {
    nextBtn.textContent = "Dalej";
  }

  if (state.step === 1) {
    nextBtn.disabled = !(isValidName(state.name) && isValidPhone(state.phone));
  } else if (state.step === 2) {
    nextBtn.disabled = !state.projectGoal;
  } else if (state.step === 3) {
    nextBtn.disabled = !state.projectFormat;
  } else if (state.step === 4) {
    nextBtn.disabled = !state.businessType || (state.businessType === "Inne" && !state.businessOther.trim());
  } else if (state.step === 5) {
    nextBtn.disabled = state.clientSources.length === 0 || (state.clientSources.includes("Inne") && !state.clientSourcesOther.trim());
  } else if (state.step === 6) {
    nextBtn.disabled = !state.visualStyle;
  } else if (state.step === 7) {
    nextBtn.disabled = state.features.length === 0;
  } else if (state.step === 8) {
    nextBtn.disabled = state.painPoints.length === 0;
  } else if (state.step === 9) {
    nextBtn.disabled = !state.projectDescription.trim();
  } else if (state.step === 10) {
    nextBtn.disabled = state.submitting;
  } else {
    nextBtn.disabled = false;
  }
}

function showStep(step) {
  state.step = step;

  steps.forEach((section) => {
    section.classList.toggle("active", Number(section.dataset.step) === step);
  });

  updateHeader();
  updateBindings();
  updateNav();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function createOptionCard({ title, description, badge, price, active, onClick }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `option-card ${active ? "selected active" : ""}`;

  button.innerHTML = `
    ${badge ? `<span class="option-badge">${badge}</span>` : ""}
    <strong>${title}</strong>
    ${price ? `<span class="option-price">${price}</span>` : ""}
    ${description ? `<p>${description}</p>` : ""}
  `;

  button.addEventListener("click", onClick);
  return button;
}

function createPill({ label, active, onClick }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `choice-pill ${active ? "selected active" : ""}`;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function renderProjectGoals() {
  if (!projectGoalGrid) return;

  projectGoalGrid.innerHTML = "";

  projectGoals.forEach((goal) => {
    projectGoalGrid.appendChild(
      createOptionCard({
        title: goal.title,
        description: goal.description,
        active: state.projectGoal === goal.id,
        onClick: () => {
          state.projectGoal = goal.id;
          renderProjectGoals();
          updateBindings();
          updateNav();
        }
      })
    );
  });
}

function renderProjectFormats() {
  if (!projectFormatGrid) return;

  projectFormatGrid.innerHTML = "";

  projectFormats.forEach((format) => {
    projectFormatGrid.appendChild(
      createOptionCard({
        title: format.title,
        badge: format.badge,
        price: format.price,
        description: format.description,
        active: state.projectFormat === format.id,
        onClick: () => {
          state.projectFormat = format.id;
          renderProjectFormats();
          updateBindings();
          updateNav();
        }
      })
    );
  });
}

function renderBusinessTypes() {
  if (!businessTypeGrid) return;

  businessTypeGrid.innerHTML = "";

  businessTypes.forEach((type) => {
    businessTypeGrid.appendChild(
      createPill({
        label: type,
        active: state.businessType === type,
        onClick: () => {
          state.businessType = type;

          if (type !== "Inne") {
            state.businessOther = "";
            if (businessOtherInput) businessOtherInput.value = "";
          }

          renderBusinessTypes();
          updateBindings();
          updateNav();
        }
      })
    );
  });

  if (businessOtherBox) {
    businessOtherBox.classList.toggle("hidden", state.businessType !== "Inne");
  }
}

function toggleArrayValue(array, value) {
  if (array.includes(value)) {
    return array.filter((item) => item !== value);
  }

  return [...array, value];
}

function renderClientSources() {
  if (!clientSourcesGrid) return;

  clientSourcesGrid.innerHTML = "";

  clientSources.forEach((source) => {
    clientSourcesGrid.appendChild(
      createPill({
        label: source,
        active: state.clientSources.includes(source),
        onClick: () => {
          state.clientSources = toggleArrayValue(state.clientSources, source);

          if (!state.clientSources.includes("Inne")) {
            state.clientSourcesOther = "";
            if (clientSourcesOtherInput) clientSourcesOtherInput.value = "";
          }

          renderClientSources();
          updateBindings();
          updateNav();
        }
      })
    );
  });

  if (clientSourcesOtherBox) {
    clientSourcesOtherBox.classList.toggle("hidden", !state.clientSources.includes("Inne"));
  }
}

function renderVisualStyles() {
  if (!visualStyleGrid) return;

  visualStyleGrid.innerHTML = "";

  visualStyles.forEach((style) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `style-card ${state.visualStyle === style.id ? "selected active" : ""}`;

    button.innerHTML = `
      <div class="style-card-top">
        <span class="style-emoji">${style.emoji}</span>
        <span class="style-icons">${style.icons}</span>
      </div>
      <strong>${style.title}</strong>
      <p>${style.description}</p>
    `;

    button.addEventListener("click", () => {
      state.visualStyle = style.id;
      renderVisualStyles();
      updateBindings();
      updateNav();
    });

    visualStyleGrid.appendChild(button);
  });
}

function renderFeatures() {
  if (!featuresGrid) return;

  featuresGrid.innerHTML = "";

  features.forEach((feature) => {
    featuresGrid.appendChild(
      createPill({
        label: feature,
        active: state.features.includes(feature),
        onClick: () => {
          state.features = toggleArrayValue(state.features, feature);
          renderFeatures();
          updateBindings();
          updateNav();
        }
      })
    );
  });
}

function renderPainPoints() {
  if (!painPointsGrid) return;

  painPointsGrid.innerHTML = "";

  painPoints.forEach((pain) => {
    painPointsGrid.appendChild(
      createPill({
        label: pain,
        active: state.painPoints.includes(pain),
        onClick: () => {
          state.painPoints = toggleArrayValue(state.painPoints, pain);
          renderPainPoints();
          updateBindings();
          updateNav();
        }
      })
    );
  });
}

async function submitBrief() {
  submitError.textContent = "";
  state.submitting = true;
  updateNav();

  const payload = {
    name: state.name.trim(),
    phone: state.phone.trim(),
    contactExtra: state.contactExtra.trim(),

    projectGoal: getProjectGoalLabel(),
    projectGoalId: state.projectGoal,

    projectFormat: getProjectFormatLabel(),
    projectFormatId: state.projectFormat,

    businessType: getBusinessLabel(),
    businessOther: state.businessOther.trim(),

    clientSources: state.clientSources,
    clientSourcesOther: state.clientSourcesOther.trim(),

    visualStyle: getVisualStyleLabel(),
    visualStyleId: state.visualStyle,
    visualDescription: state.visualDescription.trim(),

    features: state.features,

    painPoints: state.painPoints,
    painDescription: state.painDescription.trim(),

    projectDescription: state.projectDescription.trim()
  };

  try {
    const response = await fetch(`${API_BASE}/api/brief`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.ok) {
      throw new Error(data?.error || "Nie udało się wysłać briefu.");
    }

    showStep(11);
  } catch (error) {
    submitError.textContent = error.message || "Błąd serwera.";
  } finally {
    state.submitting = false;
    updateNav();
  }
}

function nextStep() {
  if (state.step === 1) {
    const validName = isValidName(state.name);
    const validPhone = isValidPhone(state.phone);

    nameError.textContent = validName ? "" : "Wpisz poprawne imię";
    phoneError.textContent = validPhone ? "" : "Podaj poprawny numer telefonu";

    if (!validName || !validPhone) return;
    showStep(2);
    return;
  }

  if (state.step === 2) {
    if (!state.projectGoal) return;
    showStep(3);
    return;
  }

  if (state.step === 3) {
    if (!state.projectFormat) return;
    showStep(4);
    return;
  }

  if (state.step === 4) {
    if (!state.businessType) return;
    if (state.businessType === "Inne" && !state.businessOther.trim()) return;
    showStep(5);
    return;
  }

  if (state.step === 5) {
    if (state.clientSources.length === 0) return;
    if (state.clientSources.includes("Inne") && !state.clientSourcesOther.trim()) return;
    showStep(6);
    return;
  }

  if (state.step === 6) {
    if (!state.visualStyle) return;
    showStep(7);
    return;
  }

  if (state.step === 7) {
    if (state.features.length === 0) return;
    showStep(8);
    return;
  }

  if (state.step === 8) {
    if (state.painPoints.length === 0) return;
    showStep(9);
    return;
  }

  if (state.step === 9) {
    if (!state.projectDescription.trim()) return;
    showStep(10);
    return;
  }

  if (state.step === 10) {
    submitBrief();
  }
}

function prevStep() {
  if (state.step <= 1) return;
  showStep(state.step - 1);
}

function callMrozowski() {
  const phone = "+48532377701";

  try {
    window.location.href = `tel:${phone}`;
  } catch (error) {
    console.error("Call error:", error);
    navigator.clipboard?.writeText("532 377 701");
    alert("Nie udało się otworzyć połączenia. Numer został skopiowany: 532 377 701");
  }
}

window.callMrozowski = callMrozowski;

if (nameInput) {
  nameInput.addEventListener("input", (e) => {
    state.name = e.target.value;
    nameError.textContent = "";
    updateBindings();
    updateNav();
  });
}

if (phoneInput) {
  phoneInput.value = state.phone;

  phoneInput.addEventListener("keydown", (e) => {
    const pos = phoneInput.selectionStart || 0;

    if ((e.key === "Backspace" || e.key === "Delete") && pos <= 4) {
      e.preventDefault();
    }
  });

  phoneInput.addEventListener("input", (e) => {
    const formatted = normalizePhone(e.target.value);
    e.target.value = formatted;
    state.phone = formatted;
    phoneError.textContent = "";
    updateBindings();
    updateNav();
  });
}

if (contactExtraInput) {
  contactExtraInput.addEventListener("input", (e) => {
    state.contactExtra = e.target.value;
    updateBindings();
    updateNav();
  });
}

if (businessOtherInput) {
  businessOtherInput.addEventListener("input", (e) => {
    state.businessOther = e.target.value;
    updateBindings();
    updateNav();
  });
}

if (clientSourcesOtherInput) {
  clientSourcesOtherInput.addEventListener("input", (e) => {
    state.clientSourcesOther = e.target.value;
    updateBindings();
    updateNav();
  });
}

if (visualDescriptionInput) {
  visualDescriptionInput.addEventListener("input", (e) => {
    state.visualDescription = e.target.value;
    updateBindings();
    updateNav();
  });
}

if (painDescriptionInput) {
  painDescriptionInput.addEventListener("input", (e) => {
    state.painDescription = e.target.value;
    updateBindings();
    updateNav();
  });
}

if (projectDescriptionInput) {
  projectDescriptionInput.addEventListener("input", (e) => {
    state.projectDescription = e.target.value;
    updateBindings();
    updateNav();
  });
}

backBtn.addEventListener("click", prevStep);
nextBtn.addEventListener("click", nextStep);

renderProjectGoals();
renderProjectFormats();
renderBusinessTypes();
renderClientSources();
renderVisualStyles();
renderFeatures();
renderPainPoints();

updateBindings();
updateHeader();
updateNav();

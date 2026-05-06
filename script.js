const API_BASE = "";
const TOTAL_STEPS = 9;

const stepMeta = [
  { title: "Jaki masz typ biznesu?", subtitle: "Wybierz branżę. Szczegóły ustalimy po zgłoszeniu." },
  { title: "Skąd przychodzą klienci?", subtitle: "Możesz wybrać kilka źródeł." },
  { title: "Jaki styl strony Cię interesuje?", subtitle: "3 gotowe style lub własny kolor." },
  { title: "Co ma zawierać podstawowa strona?", subtitle: "Pakiet 600 zł + opcjonalne dodatki." },
  { title: "Ile sekcji mniej więcej potrzebujesz?", subtitle: "Jeśli nie wiesz, dobierzemy razem." },
  { title: "Jak się z Tobą skontaktować?", subtitle: "Podaj minimum telefon lub Instagram." },
  { title: "Krótko opisz, czego potrzebujesz", subtitle: "Ten krok jest opcjonalny." },
  { title: "Podsumowanie zgłoszenia", subtitle: "Sprawdź dane przed wysłaniem." },
  { title: "Zgłoszenie zapisane", subtitle: "Wracam z odpowiedzią i propozycją wdrożenia." }
];

const sectionCountOptions = ["4-5", "6-7", "8+", "Nie wiem, dobierzemy razem"];
const businessTypes = ["Barbershop", "Beauty", "Nails", "Lashes / brows", "Masaż", "Kosmetologia", "Online usługa", "Inny"];
const clientSources = ["Instagram", "TikTok", "Google", "WhatsApp", "Telegram", "Reklama", "Polecenia", "Jeszcze nie wiem"];

const visualStyles = [
  { id: "orange-black", title: "Orange / black", icons: "🟠 + ⬛", emoji: "🟠", description: "Ciepły kontrast" },
  { id: "white-blue", title: "White / blue", icons: "⚪ + 🔵", emoji: "🔵", description: "Jasny i czysty" },
  { id: "dark-violet", title: "Dark violet", icons: "🟣", emoji: "🟣", description: "Premium dark violet" },
  { id: "wlasny", title: "Chcę własny kolor", icons: "🎨", emoji: "🎨", description: "Dobierzemy na konsultacji" }
];

const features = [
  { label: "Oferta", type: "included" },
  { label: "Usługi i ceny", type: "included" },
  { label: "FAQ", type: "included" },
  { label: "Galeria", type: "included" },
  { label: "Rezerwacja / zapis", type: "included" },
  { label: "Kontakt", type: "included" },
  { label: "SMS / potwierdzenie", type: "included" },
  { label: "Własny kolor marki (+100 zł)", type: "addon" },
  { label: "Instagram automatyzacja", type: "addon" },
  { label: "Telegram powiadomienia", type: "addon" },
  { label: "Dodatkowa sekcja (+100 zł)", type: "addon" },
  { label: "Rozbudowany booking", type: "addon" }
];

const state = {
  step: 1,
  name: "",
  phone: "+48 ",
  contactExtra: "",
  sectionCount: "",
  businessType: "",
  businessOther: "",
  clientSources: [],
  clientSourcesOther: "",
  visualStyle: "",
  visualDescription: "",
  features: [],
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
const businessTypeGrid = document.getElementById("businessTypeGrid");
const businessOtherBox = document.getElementById("businessOtherBox");
const businessOtherInput = document.getElementById("businessOtherInput");
const clientSourcesGrid = document.getElementById("clientSourcesGrid");
const clientSourcesOtherBox = document.getElementById("clientSourcesOtherBox");
const clientSourcesOtherInput = document.getElementById("clientSourcesOtherInput");
const visualStyleGrid = document.getElementById("visualStyleGrid");
const visualDescriptionInput = document.getElementById("visualDescriptionInput");
const featuresGrid = document.getElementById("featuresGrid");
const projectDescriptionInput = document.getElementById("projectDescriptionInput");
const submitError = document.getElementById("submitError");

function normalizePhone(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("48")) digits = digits.slice(2);
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

function listText(values) {
  if (!Array.isArray(values) || values.length === 0) return "—";
  return values.join(", ");
}

function getBusinessLabel() {
  if (state.businessType === "Inny") return state.businessOther.trim() || "Inny";
  return state.businessType || "—";
}

function getVisualStyleLabel() {
  const style = visualStyles.find((item) => item.id === state.visualStyle);
  return style ? style.title : "—";
}

function updateBindings() {
  const bindings = {
    name: state.name || "—",
    phone: state.phone || "—",
    contactExtra: state.contactExtra || "—",
    projectGoal: state.sectionCount || "—",
    businessType: getBusinessLabel(),
    clientSources: listText(
      state.clientSources.includes("Jeszcze nie wiem") && state.clientSourcesOther.trim()
        ? [...state.clientSources.filter((item) => item !== "Jeszcze nie wiem"), state.clientSourcesOther.trim()]
        : state.clientSources
    ),
    visualStyle: getVisualStyleLabel(),
    features: listText(state.features),
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
  if (state.step === 9) {
    backBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    return;
  }

  backBtn.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  backBtn.style.visibility = state.step === 1 ? "hidden" : "visible";
  nextBtn.classList.remove("pulse");
  nextBtn.textContent = state.step === 8 ? (state.submitting ? "Wysyłanie..." : "Wyślij brief") : "Dalej";
  if (state.step === 8) nextBtn.classList.add("pulse");

  if (state.step === 1) {
    nextBtn.disabled = !state.businessType || (state.businessType === "Inny" && !state.businessOther.trim());
  } else if (state.step === 2) {
    nextBtn.disabled = state.clientSources.length === 0 || (state.clientSources.includes("Jeszcze nie wiem") && !state.clientSourcesOther.trim());
  } else if (state.step === 3) {
    nextBtn.disabled = !state.visualStyle;
  } else if (state.step === 4) {
    nextBtn.disabled = state.features.length === 0;
  } else if (state.step === 5) {
    nextBtn.disabled = !state.sectionCount;
  } else if (state.step === 6) {
    nextBtn.disabled = !isValidName(state.name) || !(isValidPhone(state.phone) || state.contactExtra.trim().length > 2);
  } else if (state.step === 8) {
    nextBtn.disabled = state.submitting;
  } else {
    nextBtn.disabled = false;
  }
}

function showStep(step) {
  state.step = step;
  steps.forEach((section) => section.classList.toggle("active", Number(section.dataset.step) === step));
  updateHeader();
  updateBindings();
  updateNav();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createPill({ label, active, onClick }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `choice-pill ${active ? "selected active" : ""}`;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function toggleArrayValue(array, value) {
  return array.includes(value) ? array.filter((item) => item !== value) : [...array, value];
}

function renderSectionCount() {
  if (!projectGoalGrid) return;
  projectGoalGrid.innerHTML = "";
  sectionCountOptions.forEach((option) => {
    projectGoalGrid.appendChild(
      createPill({
        label: option,
        active: state.sectionCount === option,
        onClick: () => {
          state.sectionCount = option;
          renderSectionCount();
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
          if (type !== "Inny") {
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
  businessOtherBox?.classList.toggle("hidden", state.businessType !== "Inny");
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
          if (!state.clientSources.includes("Jeszcze nie wiem")) {
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
  clientSourcesOtherBox?.classList.toggle("hidden", !state.clientSources.includes("Jeszcze nie wiem"));
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
    const label = feature.type === "included" ? `${feature.label} · w cenie` : `${feature.label} · dodatek`;
    featuresGrid.appendChild(
      createPill({
        label,
        active: state.features.includes(feature.label),
        onClick: () => {
          state.features = toggleArrayValue(state.features, feature.label);
          renderFeatures();
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
    businessType: getBusinessLabel(),
    clientSources: state.clientSources,
    clientSourcesOther: state.clientSourcesOther.trim(),
    visualStyle: getVisualStyleLabel(),
    visualStyleId: state.visualStyle,
    visualDescription: state.visualDescription.trim(),
    features: state.features,
    sectionCount: state.sectionCount,
    projectDescription: state.projectDescription.trim()
  };

  try {
    const response = await fetch(`${API_BASE}/api/brief`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.ok) throw new Error(data?.error || "Nie udało się wysłać briefu.");
    showStep(9);
  } catch (error) {
    submitError.textContent = error.message || "Błąd serwera.";
  } finally {
    state.submitting = false;
    updateNav();
  }
}

function nextStep() {
  if (state.step === 1) {
    if (!state.businessType) return;
    if (state.businessType === "Inny" && !state.businessOther.trim()) return;
    showStep(2);
    return;
  }
  if (state.step === 2) {
    if (state.clientSources.length === 0) return;
    if (state.clientSources.includes("Jeszcze nie wiem") && !state.clientSourcesOther.trim()) return;
    showStep(3);
    return;
  }
  if (state.step === 3) {
    if (!state.visualStyle) return;
    showStep(4);
    return;
  }
  if (state.step === 4) {
    if (state.features.length === 0) return;
    showStep(5);
    return;
  }
  if (state.step === 5) {
    if (!state.sectionCount) return;
    showStep(6);
    return;
  }
  if (state.step === 6) {
    const hasAlt = state.contactExtra.trim().length > 2;
    const hasPhone = isValidPhone(state.phone);
    nameError.textContent = isValidName(state.name) ? "" : "Wpisz poprawne imię";
    phoneError.textContent = hasPhone || hasAlt ? "" : "Podaj telefon lub kontakt alternatywny";
    if (!isValidName(state.name) || !(hasPhone || hasAlt)) return;
    showStep(7);
    return;
  }
  if (state.step === 7) {
    showStep(8);
    return;
  }
  if (state.step === 8) submitBrief();
}

function prevStep() {
  if (state.step <= 1) return;
  showStep(state.step - 1);
}

function callMrozowski() {
  const phone = "+48532377701";
  try {
    window.location.href = `tel:${phone}`;
  } catch {
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
    if ((e.key === "Backspace" || e.key === "Delete") && pos <= 4) e.preventDefault();
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

contactExtraInput?.addEventListener("input", (e) => {
  state.contactExtra = e.target.value;
  updateBindings();
  updateNav();
});

businessOtherInput?.addEventListener("input", (e) => {
  state.businessOther = e.target.value;
  updateBindings();
  updateNav();
});

clientSourcesOtherInput?.addEventListener("input", (e) => {
  state.clientSourcesOther = e.target.value;
  updateBindings();
  updateNav();
});

visualDescriptionInput?.addEventListener("input", (e) => {
  state.visualDescription = e.target.value;
  updateBindings();
  updateNav();
});

projectDescriptionInput?.addEventListener("input", (e) => {
  state.projectDescription = e.target.value;
  updateBindings();
  updateNav();
});

backBtn.addEventListener("click", prevStep);
nextBtn.addEventListener("click", nextStep);

renderSectionCount();
renderBusinessTypes();
renderClientSources();
renderVisualStyles();
renderFeatures();
updateBindings();
updateHeader();
updateNav();

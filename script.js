const API_BASE = "";
const TOTAL_STEPS = 9;

function L(key) {
  const lang =
    (typeof window.getCurrentLang === "function" ? window.getCurrentLang() : localStorage.getItem("lang")) || "pl";
  const pack = window.SITE_I18N;
  if (!pack || !pack.pl) return key;
  if (lang === "pl") return pack.pl[key] || "";
  return pack[lang]?.[key] ?? pack.pl[key] ?? "";
}

const WIZ_STEP_KEYS = [
  ["wizStep1Title", "wizStep1Sub"],
  ["wizStep2Title", "wizStep2Sub"],
  ["wizStep3Title", "wizStep3Sub"],
  ["wizStep4Title", "wizStep4Sub"],
  ["wizStep5Title", "wizStep5Sub"],
  ["wizStep6Title", "wizStep6Sub"],
  ["wizStep7Title", "wizStep7Sub"],
  ["wizStep8Title", "wizStep8Sub"],
  ["wizStep9Title", "wizStep9Sub"]
];

const BUSINESS_KEYS = [
  "bizBarbershop",
  "bizBeauty",
  "bizNails",
  "bizLashes",
  "bizMassage",
  "bizCosmetology",
  "bizOnline",
  "bizOther"
];

const CLIENT_KEYS = [
  "srcInstagram",
  "srcTikTok",
  "srcGoogle",
  "srcWhatsApp",
  "srcTelegram",
  "srcAds",
  "srcReferrals",
  "srcUnknown"
];

const SECTION_KEYS = ["sec45", "sec67", "sec8p", "secUnknown"];

const visualStyles = [
  { id: "orange-black", titleKey: "styleOrangeTitle", descKey: "styleOrangeDesc", icons: "🟠 + ⬛", emoji: "🟠" },
  { id: "white-blue", titleKey: "styleWhiteTitle", descKey: "styleWhiteDesc", icons: "⚪ + 🔵", emoji: "🔵" },
  { id: "dark-violet", titleKey: "styleVioletTitle", descKey: "styleVioletDesc", icons: "🟣", emoji: "🟣" },
  { id: "wlasny", titleKey: "styleCustomTitle", descKey: "styleCustomDesc", icons: "🎨", emoji: "🎨" }
];

const FEATURE_DEFS = [
  { key: "featOffer", type: "included" },
  { key: "featServices", type: "included" },
  { key: "featFaq", type: "included" },
  { key: "featGallery", type: "included" },
  { key: "featBooking", type: "included" },
  { key: "featContact", type: "included" },
  { key: "featSms", type: "included" },
  { key: "featBrandColor", type: "included" },
  { key: "featIgAuto", type: "addon" },
  { key: "featTg", type: "addon" },
  { key: "featExtraSection", type: "addon" },
  { key: "featAdvBooking", type: "addon" }
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
  if (state.businessType === "bizOther") return state.businessOther.trim() || L("bizOther");
  return state.businessType ? L(state.businessType) : "—";
}

function getVisualStyleLabel() {
  const style = visualStyles.find((item) => item.id === state.visualStyle);
  return style ? L(style.titleKey) : "—";
}

function getClientSourcesDisplayList() {
  const labels = state.clientSources.filter((k) => k !== "srcUnknown").map((k) => L(k));
  if (state.clientSources.includes("srcUnknown") && state.clientSourcesOther.trim()) {
    labels.push(state.clientSourcesOther.trim());
  }
  return labels;
}

function getClientSourcesPayload() {
  return getClientSourcesDisplayList();
}

function getFeaturesPayload() {
  return state.features.map((k) => L(k));
}

function updateBindings() {
  const bindings = {
    name: state.name || "—",
    phone: state.phone || "—",
    contactExtra: state.contactExtra || "—",
    projectGoal: state.sectionCount ? L(state.sectionCount) : "—",
    businessType: getBusinessLabel(),
    clientSources: listText(getClientSourcesDisplayList()),
    visualStyle: getVisualStyleLabel(),
    features: listText(getFeaturesPayload()),
    projectDescription: state.projectDescription || "—"
  };

  Object.entries(bindings).forEach(([key, value]) => {
    document.querySelectorAll(`[data-bind="${key}"]`).forEach((el) => {
      el.textContent = value;
    });
  });
}

function syncWizardCardHeads() {
  steps.forEach((section) => {
    const stepNum = Number(section.dataset.step);
    const keys = WIZ_STEP_KEYS[stepNum - 1];
    if (!keys) return;
    const head = section.querySelector(".card-head");
    if (!head) return;
    const h2 = head.querySelector("h2");
    const p = head.querySelector("p");
    if (h2) h2.textContent = L(keys[0]);
    if (p) p.textContent = L(keys[1]);
  });
}

function updateHeader() {
  if (!stepTitle || !stepSubtitle) return;
  const keys = WIZ_STEP_KEYS[state.step - 1];
  if (!keys) return;
  stepTitle.textContent = L(keys[0]);
  stepSubtitle.textContent = L(keys[1]);
  stepPill.textContent = `${state.step} / ${TOTAL_STEPS}`;
  const percent = Math.round((state.step / TOTAL_STEPS) * 100);
  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `${percent}%`;
  syncWizardCardHeads();
}

function updateNav() {
  if (!backBtn || !nextBtn) return;

  if (state.step === 9) {
    backBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    return;
  }

  backBtn.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  backBtn.style.visibility = state.step === 1 ? "hidden" : "visible";
  backBtn.textContent = L("wizBack");
  nextBtn.classList.remove("pulse");
  if (state.step === 8) {
    nextBtn.textContent = state.submitting ? L("wizSending") : L("wizSend");
    nextBtn.classList.add("pulse");
  } else {
    nextBtn.textContent = L("wizNext");
  }

  if (state.step === 1) {
    nextBtn.disabled =
      !state.businessType || (state.businessType === "bizOther" && !state.businessOther.trim());
  } else if (state.step === 2) {
    nextBtn.disabled =
      state.clientSources.length === 0 ||
      (state.clientSources.includes("srcUnknown") && !state.clientSourcesOther.trim());
  } else if (state.step === 3) {
    nextBtn.disabled = !state.visualStyle;
  } else if (state.step === 4) {
    nextBtn.disabled = state.features.length === 0;
  } else if (state.step === 5) {
    nextBtn.disabled = !state.sectionCount;
  } else if (state.step === 6) {
    nextBtn.disabled =
      !isValidName(state.name) || !(isValidPhone(state.phone) || state.contactExtra.trim().length > 2);
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
  SECTION_KEYS.forEach((key) => {
    projectGoalGrid.appendChild(
      createPill({
        label: L(key),
        active: state.sectionCount === key,
        onClick: () => {
          state.sectionCount = key;
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
  BUSINESS_KEYS.forEach((key) => {
    businessTypeGrid.appendChild(
      createPill({
        label: L(key),
        active: state.businessType === key,
        onClick: () => {
          state.businessType = key;
          if (key !== "bizOther") {
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
  businessOtherBox?.classList.toggle("hidden", state.businessType !== "bizOther");
}

function renderClientSources() {
  if (!clientSourcesGrid) return;
  clientSourcesGrid.innerHTML = "";
  CLIENT_KEYS.forEach((key) => {
    clientSourcesGrid.appendChild(
      createPill({
        label: L(key),
        active: state.clientSources.includes(key),
        onClick: () => {
          state.clientSources = toggleArrayValue(state.clientSources, key);
          if (!state.clientSources.includes("srcUnknown")) {
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
  clientSourcesOtherBox?.classList.toggle("hidden", !state.clientSources.includes("srcUnknown"));
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
      <strong>${L(style.titleKey)}</strong>
      <p>${L(style.descKey)}</p>
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
  FEATURE_DEFS.forEach((feature) => {
    const label =
      feature.type === "included"
        ? `${L(feature.key)} · ${L("wizFeatIn")}`
        : `${L(feature.key)} · ${L("wizFeatAddon")}`;
    featuresGrid.appendChild(
      createPill({
        label,
        active: state.features.includes(feature.key),
        onClick: () => {
          state.features = toggleArrayValue(state.features, feature.key);
          renderFeatures();
          updateBindings();
          updateNav();
        }
      })
    );
  });
}

async function submitBrief() {
  if (!submitError) return;
  submitError.textContent = "";
  state.submitting = true;
  updateNav();

  const payload = {
    name: state.name.trim(),
    phone: state.phone.trim(),
    contactExtra: state.contactExtra.trim(),
    businessType: getBusinessLabel(),
    clientSources: getClientSourcesPayload(),
    clientSourcesOther: state.clientSourcesOther.trim(),
    visualStyle: getVisualStyleLabel(),
    visualStyleId: state.visualStyle,
    visualDescription: state.visualDescription.trim(),
    features: getFeaturesPayload(),
    sectionCount: state.sectionCount ? L(state.sectionCount) : "",
    projectDescription: state.projectDescription.trim()
  };

  try {
    const response = await fetch(`${API_BASE}/api/brief`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.ok) throw new Error(data?.error || L("wizErrSubmit"));
    showStep(9);
  } catch (error) {
    submitError.textContent = error.message || L("wizErrServer");
  } finally {
    state.submitting = false;
    updateNav();
  }
}

function nextStep() {
  if (state.step === 1) {
    if (!state.businessType) return;
    if (state.businessType === "bizOther" && !state.businessOther.trim()) return;
    showStep(2);
    return;
  }
  if (state.step === 2) {
    if (state.clientSources.length === 0) return;
    if (state.clientSources.includes("srcUnknown") && !state.clientSourcesOther.trim()) return;
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
    nameError.textContent = isValidName(state.name) ? "" : L("wizErrName");
    phoneError.textContent = hasPhone || hasAlt ? "" : L("wizErrPhone");
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
    alert(L("alertPhoneCopy"));
  }
}

window.callMrozowski = callMrozowski;

window.refreshWizardAfterLang = function () {
  renderSectionCount();
  renderBusinessTypes();
  renderClientSources();
  renderVisualStyles();
  renderFeatures();
  syncWizardCardHeads();
  updateHeader();
  updateBindings();
  updateNav();
};

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

if (backBtn) backBtn.addEventListener("click", prevStep);
if (nextBtn) nextBtn.addEventListener("click", nextStep);

renderSectionCount();
renderBusinessTypes();
renderClientSources();
renderVisualStyles();
renderFeatures();
updateBindings();
updateHeader();
updateNav();

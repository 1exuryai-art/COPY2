const fs = require("fs");

const pl = {
  ...JSON.parse(fs.readFileSync(__dirname + "/_pl.json", "utf8")),
  ...JSON.parse(fs.readFileSync(__dirname + "/_wizard_pl.json", "utf8"))
};
const ru = {
  ...JSON.parse(fs.readFileSync(__dirname + "/_ru_from_pl.json", "utf8")),
  ...JSON.parse(fs.readFileSync(__dirname + "/_wizard_ru.json", "utf8"))
};
const en = {
  ...JSON.parse(fs.readFileSync(__dirname + "/_en_from_pl.json", "utf8")),
  ...JSON.parse(fs.readFileSync(__dirname + "/_wizard_en.json", "utf8"))
};

const patchRU = {
  heroTitle2: "клиента к заявке.",
  heroSub:
    "Премиальная страница, путь записи и система приёма клиентов для бизнесов, которые не хотят терять диалоги в DM, WhatsApp, Telegram и комментариях.",
  dashSources: "Входы",
  dashEffectValue: "Заявка",
  metric1: "Одна страница вместо хаоса в переписке",
  metric2: "От интереса до конкретного контакта",
  experienceChip: "СИСТЕМА ЗАЯВОК",
  phoneTitle: "Клиент проходит путь от интереса к заявке.",
  phoneCard4: "Приходит заявка",
  feature1Text:
    "Из Instagram, TikTok, Google, WhatsApp, Telegram, рекламы или обычной ссылки. Каждый вход ведёт к одной выверенной презентации.",
  detailsTitle: "Что входит за 600 zł?",
  detailsLead:
    "Премиальная страница под локальный бизнес: оффер, услуги и цены, FAQ, галерея, контакты и соцсети, запись / бронирование, SMS / базовое подтверждение, адаптация под нишу и фирменный цвет — всё в одной цене пакета.",
  detailsIncludedHeading: "Входит в цену:",
  detailsAddonsHeading: "Дополнительно:",
  detailsBackBtn: "Вернуться к демо",
  detailsInc1: "Премиум-страница под ваш бизнес",
  detailsInc2: "Оффер, услуги и цены",
  detailsInc3: "FAQ для клиентов",
  detailsInc4: "Галерея / фото",
  detailsInc5: "Контакт и соцсети",
  detailsInc6: "Запись / booking",
  detailsInc7: "SMS / базовое подтверждение",
  detailsInc8: "Адаптация под нишу",
  detailsInc9: "Фирменный / свой цвет в стоимости",
  detailsAdd2: "Дополнительная секция — +50 zł",
  detailsAdd3: "Автоматизация Instagram — отдельно",
  detailsAdd4: "Уведомления Telegram — отдельно",
  detailsAdd5: "Расширенный booking — отдельно",
  gearDetails: "Детали",
  gearBackDemo: "Вернуться к демо",
  navOffer: "Оферта",
  flowOffer: "Оферта"
};

const patchEN = {
  heroTitle1: "A page that guides",
  heroTitle2: "the client to a lead.",
  heroSub:
    "A premium page, booking path and client intake system for businesses that do not want to lose conversations in DM, WhatsApp, Telegram and comments.",
  dashEffectValue: "Lead",
  metric1: "One page instead of chaos in messages",
  metric2: "From interest to a concrete contact",
  experienceChip: "LEAD INTAKE",
  phoneTitle: "The client moves from interest to a lead.",
  phoneCard4: "A lead comes in",
  phoneCard4Tag: "done",
  detailsTitle: "What is included for 600 zł?",
  detailsLead:
    "A premium page for a local business: offer, services and prices, FAQ, gallery, contact and social media, booking / sign-up, SMS / basic confirmation, niche fit, and your brand color—all included in the package price.",
  detailsIncludedHeading: "Included:",
  detailsAddonsHeading: "Add-ons:",
  detailsBackBtn: "Back to demo",
  detailsInc1: "Premium page for your business",
  detailsInc2: "Offer, services and prices",
  detailsInc3: "Client FAQ",
  detailsInc4: "Gallery / photos",
  detailsInc5: "Contact and social media",
  detailsInc6: "Booking / request flow",
  detailsInc7: "SMS / basic confirmation",
  detailsInc8: "Niche adaptation",
  detailsInc9: "Custom / brand color included",
  detailsAdd2: "Additional section — +50 PLN",
  detailsAdd3: "Instagram automation — separately",
  detailsAdd4: "Telegram notifications — separately",
  detailsAdd5: "Advanced booking — separately",
  gearDetails: "Details",
  gearBackDemo: "Back to demo",
  chooseBtn: "Choose",
  addSourcesBtn: "Add entry points",
  bestChoiceBtn: "Best choice",
  offer2Title: "Entry points from many places",
  offer3Title: "Tailored to your business",
  productCard1Btn: "Pick this page",
  productCard2Btn: "See the flow",
  productCard3Btn: "Connect entry points",
  pricingTitle1: "Extended page",
  pricingTitle2: "for 600 zł.",
  productTitle1: "A ready system for your",
  productTitle2: "local business."
};

Object.assign(ru, patchRU);
Object.assign(en, patchEN);

const phPL = {
  wizPhBusinessOther: "Np. fizjo, trener, studio...",
  wizPhClientSource: "Np. link w bio, ulotki...",
  wizPhVisual: "Razem dobierzemy kolorystykę, jeśli wybierasz custom.",
  wizPhProject:
    "Np. salon beauty, 6 usług, zapis online, ciemny styl, kontakt przez Instagram.",
  wizPhName: "Np. Michał",
  wizPhPhone: "+48 123 456 789",
  wizPhContactExtra: "@username albo numer WhatsApp"
};
const phRU = {
  wizPhBusinessOther: "Напр. физиотерапевт, тренер, студия...",
  wizPhClientSource: "Напр. ссылка в био, листовки...",
  wizPhVisual: "Вместе подберем цветовую схему, если выбираете custom.",
  wizPhProject:
    "Напр. beauty-салон, 6 услуг, онлайн-запись, тёмный стиль, контакт через Instagram.",
  wizPhName: "Напр. Алексей",
  wizPhPhone: "+48 123 456 789",
  wizPhContactExtra: "@username или номер WhatsApp"
};
const phEN = {
  wizPhBusinessOther: "E.g. physio, coach, studio...",
  wizPhClientSource: "E.g. link in bio, flyers...",
  wizPhVisual: "We will choose the color palette together if you select custom.",
  wizPhProject:
    "E.g. beauty salon, 6 services, online booking, dark style, contact via Instagram.",
  wizPhName: "E.g. Alex",
  wizPhPhone: "+48 123 456 789",
  wizPhContactExtra: "@username or WhatsApp number"
};
Object.assign(pl, phPL);
Object.assign(ru, phRU);
Object.assign(en, phEN);

pl.tagTrust = "zaufanie";
ru.tagTrust = "доверие";
en.tagTrust = "trust";

const out = `window.SITE_I18N=${JSON.stringify({ pl, ru, en })};`;
fs.writeFileSync(__dirname + "/i18n-data.js", out);
console.log("Wrote i18n-data.js keys:", Object.keys(pl).length);

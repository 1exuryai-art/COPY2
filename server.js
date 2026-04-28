console.log("🚀 MROZOWSKI BRIEF SERVER STARTED");

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const TIMEZONE = process.env.TIMEZONE || "Europe/Warsaw";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || "";
const SMS_ENABLED = process.env.SMS_ENABLED === "true";

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

function normalizePhone(phone) {
  const cleaned = String(phone || "").replace(/\s/g, "");

  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("48")) return `+${cleaned}`;

  return `+48${cleaned}`;
}

function safeText(value) {
  const text = String(value || "").trim();
  return text || "—";
}

function listText(value) {
  if (!Array.isArray(value) || value.length === 0) return "—";
  return value.map(safeText).join(", ");
}

function formatNow() {
  return new Intl.DateTimeFormat("pl-PL", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

function buildTelegramMessage(data) {
  return [
    "🔥 NOWY BRIEF — MROZOWSKI AUTOMATION",
    "",
    "👤 KONTAKT",
    `Imię: ${safeText(data.name)}`,
    `Telefon: ${safeText(data.phone)}`,
    `Dodatkowy kontakt: ${safeText(data.contactExtra)}`,
    "",
    "🧩 PROJEKT",
    `Co trzeba zrobić: ${safeText(data.projectGoal)}`,
    `Format: ${safeText(data.projectFormat)}`,
    `Branża: ${safeText(data.businessType)}`,
    "",
    "📍 ŹRÓDŁA KLIENTÓW",
    listText(data.clientSources),
    data.clientSourcesOther ? `Inne: ${safeText(data.clientSourcesOther)}` : "",
    "",
    "🎨 STYL",
    `Styl: ${safeText(data.visualStyle)}`,
    `Opis stylu: ${safeText(data.visualDescription)}`,
    "",
    "⚙️ FUNKCJE",
    listText(data.features),
    "",
    "🧠 PROBLEMY",
    listText(data.painPoints),
    `Opis problemu: ${safeText(data.painDescription)}`,
    "",
    "📌 OPIS PROJEKTU",
    safeText(data.projectDescription),
    "",
    `🕒 Data zgłoszenia: ${formatNow()}`
  ]
    .filter(Boolean)
    .join("\n");
}

function buildClientSms(data) {
  return [
    "MROZOWSKI AUTOMATION:",
    "Dziękujemy za brief.",
    "Otrzymaliśmy Twoje zgłoszenie.",
    "Wrócimy z propozycją systemu pod Twój biznes.",
    "",
    `Projekt: ${safeText(data.projectFormat)}`
  ].join("\n");
}

async function sendTelegramMessage(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram env missing. Telegram message skipped.");
    return;
  }

  await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: TELEGRAM_CHAT_ID,
    text,
    disable_web_page_preview: true
  });
}

async function sendTwilioSms({ phone, message }) {
  if (!SMS_ENABLED) {
    console.log("SMS disabled. Skipping client SMS.");
    return;
  }

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.warn("Twilio env missing. SMS skipped.");
    return;
  }

  try {
    const twilioModule = await import("twilio");
    const twilio = twilioModule.default;
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: normalizePhone(phone)
    });
  } catch (error) {
    console.error("Twilio SMS error:", error.message);
  }
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "MROZOWSKI brief backend",
    timezone: TIMEZONE,
    telegramEnabled: Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID),
    smsEnabled: SMS_ENABLED,
    twilioConfigured: Boolean(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER)
  });
});

app.post("/api/brief", async (req, res) => {
  try {
    const data = req.body || {};

    const requiredFields = {
      name: data.name,
      phone: data.phone,
      projectGoal: data.projectGoal,
      projectFormat: data.projectFormat,
      businessType: data.businessType,
      visualStyle: data.visualStyle,
      projectDescription: data.projectDescription
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value || String(value).trim() === "")
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        ok: false,
        error: `Missing required fields: ${missingFields.join(", ")}`
      });
    }

    const telegramMessage = buildTelegramMessage(data);

    await sendTelegramMessage(telegramMessage);

    await sendTwilioSms({
      phone: data.phone,
      message: buildClientSms(data)
    });

    return res.status(200).json({
      ok: true,
      message: "Brief sent successfully"
    });
  } catch (error) {
    console.error("Brief error:", error.response?.data || error.message);

    return res.status(500).json({
      ok: false,
      error: error.response?.data?.description || error.message || "Internal server error"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MROZOWSKI brief app running on port ${PORT}`);
  console.log("PORT:", PORT);
  console.log("TIMEZONE:", TIMEZONE);
  console.log("TELEGRAM ENABLED:", Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID));
  console.log("SMS ENABLED:", SMS_ENABLED);
});

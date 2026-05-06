const fs = require("fs");
const https = require("https");

const pl = JSON.parse(fs.readFileSync(__dirname + "/_wizard_pl.json", "utf8"));

function gtx(text, tl) {
  const q = encodeURIComponent(text);
  const path = `/translate_a/single?client=gtx&sl=pl&tl=${tl}&dt=t&q=${q}`;
  return new Promise((resolve, reject) => {
    https
      .get(
        { hostname: "translate.googleapis.com", path, headers: { "User-Agent": "Mozilla/5.0" } },
        (res) => {
          let b = "";
          res.on("data", (c) => (b += c));
          res.on("end", () => {
            try {
              const j = JSON.parse(b);
              resolve((j[0] || []).map((x) => x[0]).join("") || text);
            } catch (e) {
              reject(e);
            }
          });
        }
      )
      .on("error", reject);
  });
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const ru = {};
  const en = {};
  const keys = Object.keys(pl);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const v = pl[k];
    process.stdout.write(`\r${i + 1}/${keys.length} ${k}`.padEnd(64));
    ru[k] = await gtx(v, "ru");
    await sleep(100);
    en[k] = await gtx(v, "en");
    await sleep(100);
  }
  fs.writeFileSync(__dirname + "/_wizard_ru.json", JSON.stringify(ru, null, 2));
  fs.writeFileSync(__dirname + "/_wizard_en.json", JSON.stringify(en, null, 2));
  console.log("\nWizard locales done.");
}

main().catch(console.error);

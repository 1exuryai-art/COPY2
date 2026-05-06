/**
 * One-off: build _ru_from_pl.json and _en_from_pl.json from _pl.json using gtx.
 * Run: node _gen_locales.cjs
 */
const fs = require("fs");
const https = require("https");

const pl = JSON.parse(fs.readFileSync(__dirname + "/_pl.json", "utf8"));

function gtx(text, tl) {
  const q = encodeURIComponent(text);
  const path = `/translate_a/single?client=gtx&sl=pl&tl=${tl}&dt=t&q=${q}`;
  return new Promise((resolve, reject) => {
    https
      .get(
        {
          hostname: "translate.googleapis.com",
          path,
          headers: { "User-Agent": "Mozilla/5.0" }
        },
        (res) => {
          let b = "";
          res.on("data", (c) => (b += c));
          res.on("end", () => {
            try {
              const j = JSON.parse(b);
              const out = (j[0] || []).map((x) => x[0]).join("");
              resolve(out || text);
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
    process.stdout.write(`\r${i + 1}/${keys.length} ${k}`.padEnd(60));
    try {
      ru[k] = await gtx(v, "ru");
      await sleep(120);
      en[k] = await gtx(v, "en");
      await sleep(120);
    } catch {
      ru[k] = v;
      en[k] = v;
    }
  }
  fs.writeFileSync(__dirname + "/_ru_from_pl.json", JSON.stringify(ru, null, 2));
  fs.writeFileSync(__dirname + "/_en_from_pl.json", JSON.stringify(en, null, 2));
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

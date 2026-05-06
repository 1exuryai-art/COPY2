const fs = require("fs");
const h = fs.readFileSync(__dirname + "/index.html", "utf8");
const pl = {};
const re = /data-i18n="([^"]+)"[^>]*>([\s\S]*?)<\//g;
let m;
while ((m = re.exec(h))) {
  const key = m[1];
  let text = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (!pl[key]) pl[key] = text;
}
console.log("keys", Object.keys(pl).length);
fs.writeFileSync(__dirname + "/_pl.json", JSON.stringify(pl, null, 2));

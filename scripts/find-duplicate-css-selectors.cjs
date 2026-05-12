const fs = require("fs");

const css = fs.readFileSync("styles/dashboard-theme.css", "utf8");

const matches = [
  ...css.matchAll(
    /(^|\n)\s*([.#][a-zA-Z0-9_-]+(?:__[a-zA-Z0-9_-]+)?(?:--[a-zA-Z0-9_-]+)?(?:\s+[.#][a-zA-Z0-9_-]+(?:__[a-zA-Z0-9_-]+)?(?:--[a-zA-Z0-9_-]+)?)?)\s*\{/g,
  ),
];

const counts = new Map();

for (const match of matches) {
  const selector = match[2].trim();
  counts.set(selector, (counts.get(selector) || 0) + 1);
}

for (const [selector, count] of [...counts.entries()].sort()) {
  if (count > 1) {
    console.log(count + "x " + selector);
  }
}

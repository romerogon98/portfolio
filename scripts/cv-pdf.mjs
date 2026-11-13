// Renders /cv to public/cv/Gonzalo-Romero_CV.pdf with headless Chrome, so the
// "Download CV" button serves a PDF whose text extracts with real spaces (the
// browser's own Save as PDF, Safari's especially, can drop them, which breaks
// ATS parsing on Indeed and similar). Re-run whenever the CV content changes:
//
//   npm run dev            (in another terminal)
//   npm run cv:pdf         (or: npm run cv:pdf -- http://localhost:3001/cv)
//
// Uses an installed Chrome/Brave; set CHROME_PATH to point at another one.
import { existsSync, writeFileSync } from "node:fs";
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://localhost:3000/cv";
const out = new URL("../public/cv/Gonzalo-Romero_CV.pdf", import.meta.url).pathname;

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chrome/Chromium found. Set CHROME_PATH to its executable.");
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath, headless: true });
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60_000 });
  if (!new URL(page.url()).pathname.startsWith("/cv")) {
    throw new Error(`Landed on ${page.url()} instead of the CV.`);
  }
  await page.evaluate(() => document.fonts.ready);
  const pdf = await page.pdf({ printBackground: true, preferCSSPageSize: true });
  writeFileSync(out, pdf);
  const pages = Buffer.from(pdf).toString("latin1").match(/\/Type\s*\/Page\b/g)?.length ?? 0;
  console.log(`Saved ${out} (${pages} page${pages === 1 ? "" : "s"})`);
  if (pages !== 1) console.warn("WARNING: the CV should fit on one A4 page.");
} finally {
  await browser.close();
}

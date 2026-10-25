import { chromium } from "playwright";

const URLS = [
  "https://prajwalkumar-portfolio.vercel.app/",
  "https://prajwalkumar-portfolio.vercel.app/who",
  "https://prajwalkumar-portfolio.vercel.app/recruiter",
  "https://prajwalkumar-portfolio.vercel.app/browse",
  "https://prajwalkumar-portfolio.vercel.app/contact",
  "https://prajwalkumar-portfolio.vercel.app/sessions",
  "https://prajwalkumar-portfolio.vercel.app/network"
];

async function runAudit() {
  console.log("Starting Quality & Performance Audit on live Vercel production...\n");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const results = [];

  for (const url of URLS) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    const startTime = Date.now();
    let responseStatus = 0;

    try {
      const response = await page.goto(url, { waitUntil: "networkidle", timeout: 25000 });
      responseStatus = response ? response.status() : 0;
    } catch (e) {
      console.warn(`Timeout/Warning on ${url}:`, e.message);
    }

    const totalTimeMs = Date.now() - startTime;

    // Extract Navigation & Paint timings
    const timing = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const paint = performance.getEntriesByType("paint");
      const fcp = paint.find((p) => p.name === "first-contentful-paint");

      // Resource breakdown
      const resources = performance.getEntriesByType("resource");
      let totalBytes = 0;
      let jsBytes = 0;
      let cssBytes = 0;
      let imgBytes = 0;
      let fontBytes = 0;

      for (const r of resources) {
        const size = r.transferSize || 0;
        totalBytes += size;
        if (r.initiatorType === "script" || r.name.endsWith(".js")) jsBytes += size;
        else if (r.initiatorType === "css" || r.name.endsWith(".css")) cssBytes += size;
        else if (r.initiatorType === "img" || /\.(png|webp|jpg|jpeg|svg)/.test(r.name)) imgBytes += size;
        else if (r.initiatorType === "font" || /\.(woff2|woff|ttf)/.test(r.name)) fontBytes += size;
      }

      return {
        ttfb: nav ? Math.round(nav.responseStart - nav.requestStart) : 0,
        domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : 0,
        loadComplete: nav ? Math.round(nav.loadEventEnd - nav.startTime) : 0,
        fcp: fcp ? Math.round(fcp.startTime) : 0,
        resourceCount: resources.length,
        totalTransferredKb: Math.round(totalBytes / 1024),
        jsKb: Math.round(jsBytes / 1024),
        cssKb: Math.round(cssBytes / 1024),
        imgKb: Math.round(imgBytes / 1024),
        fontKb: Math.round(fontBytes / 1024)
      };
    });

    // Check meta tags & SEO compliance
    const seo = await page.evaluate(() => {
      const title = document.title;
      const desc = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
      const h1s = Array.from(document.querySelectorAll("h1")).map((h) => h.innerText.trim());
      const imgsWithoutAlt = Array.from(document.querySelectorAll("img:not([alt])")).length;
      return { title, desc, h1Count: h1s.length, h1Text: h1s[0] || "", imgsWithoutAlt };
    });

    results.push({
      url: new URL(url).pathname,
      status: responseStatus,
      totalTimeMs,
      timing,
      seo,
      consoleErrors
    });

    await page.close();
  }

  await browser.close();

  console.log("=== PERFORMANCE & QUALITY AUDIT SUMMARY ===");
  console.log(JSON.stringify(results, null, 2));
}

runAudit().catch(console.error);

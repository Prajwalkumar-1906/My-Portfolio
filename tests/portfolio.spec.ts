import { test, expect } from "@playwright/test";

test.describe("Netflix 3D Portfolio Phase 2 E2E Tests", () => {
  test("1. Welcome Gate loads and transitions to Profile Selection (/who)", async ({ page }) => {
    await page.goto("/");
    // Gate heading
    await expect(page.locator("h1")).toContainText("PRAJWALKUMAR MADIWAL");
    
    // Time-aware greeting or welcome back
    const greeting = page.locator("text=/Good (morning|afternoon|evening)|Welcome back/i");
    await expect(greeting).toBeVisible();

    // Verify ENTER button is visible and click it
    const enterBtn = page.getByRole("button", { name: /ENTER/i });
    await expect(enterBtn).toBeVisible({ timeout: 6000 });
    await enterBtn.click();

    // Verify it transitions to /who (Who's Watching profile selector)
    await page.waitForURL("**/who", { timeout: 10000 });
    await expect(page.getByRole("heading", { name: /WHO'S WATCHING\?/i })).toBeVisible();
    
    // Check all 4 profile cards
    await expect(page.getByText("RECRUITER", { exact: true })).toBeVisible();
    await expect(page.getByText("JUST BROWSING", { exact: true })).toBeVisible();
    await expect(page.getByText("BOOK A SESSION", { exact: true })).toBeVisible();
    await expect(page.getByText("NETWORKER", { exact: true })).toBeVisible();
  });

  test("2. Deep links bypass the Welcome Gate directly", async ({ page }) => {
    // Direct link to /recruiter
    await page.goto("/recruiter");
    await expect(page.locator("h1")).toContainText("Prajwalkumar Madiwal");
    await expect(page.getByText("AI Intern @ ABB").first()).toBeVisible();

    // Direct link to /browse
    await page.goto("/browse");
    await expect(page.locator("h1")).toContainText("Explore The Show");
    await expect(page.getByText("Beyond the Code: Values & Service")).toBeVisible();

    // Direct link to /sessions
    await page.goto("/sessions");
    await expect(page.getByText(/REQUEST A CUSTOM SESSION QUOTE/i)).toBeVisible();

    // Direct link to /network
    await page.goto("/network");
    await expect(page.locator("h1")).toContainText("Let's Connect");

    // Skip param test
    await page.goto("/?skip=1");
    await page.waitForURL("**/who", { timeout: 8000 });
    await expect(page.getByRole("heading", { name: /WHO'S WATCHING\?/i })).toBeVisible();
  });

  test("3. Social links match exact verified URLs across the site", async ({ page }) => {
    await page.goto("/network");

    // Check Instagram exact URL
    const igLink = page.locator('a[href="https://www.instagram.com/foreverprajwalkumar/"]').first();
    await expect(igLink).toBeVisible();
    await expect(igLink).toHaveAttribute("target", "_blank");
    await expect(igLink).toHaveAttribute("rel", /noopener/);

    // Check X (Twitter) exact URL
    const xLink = page.locator('a[href="https://x.com/prajwalkumar_19"]').first();
    await expect(xLink).toBeVisible();
    await expect(xLink).toHaveAttribute("target", "_blank");

    // Check LinkedIn exact URL
    const liLink = page.locator('a[href="https://www.linkedin.com/in/prajwalkumarm/"]').first();
    await expect(liLink).toBeVisible();

    // Check GitHub exact URL
    const ghLink = page.locator('a[href="https://github.com/Prajwalkumar-1906"]').first();
    await expect(ghLink).toBeVisible();
  });

  test("4. Recruiter Page features: Job Fit Analyzer & Dual Resumes", async ({ page }) => {
    await page.goto("/recruiter");

    // Check Job Fit Analyzer is present
    await expect(page.getByText("JOB FIT ANALYZER")).toBeVisible();
    const textarea = page.locator("#jd-input");
    await expect(textarea).toBeVisible();

    // Paste sample job description
    await textarea.fill("Seeking a Full Stack Engineer with Next.js, TypeScript, React, Python, FastAPI and ML experience to build web solutions.");
    const analyzeBtn = page.getByRole("button", { name: /Run Job Fit Analysis/i });
    await analyzeBtn.click();

    // Wait for analysis result
    await expect(page.getByText(/Fit Assessment:/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Matching Skills & Stacks/i)).toBeVisible();

    // Dual Resumes section
    await expect(page.getByText("RESUME VERSIONS & QR ACCESS")).toBeVisible();
    await expect(page.getByText("AI/ML & Full-Stack Engineer").first()).toBeVisible();
    await expect(page.getByText("Data & Business Analyst").first()).toBeVisible();
    await expect(page.getByText("Updated: October 2026").first()).toBeVisible();
  });

  test("5. Speaker Session: Multi-step Quote Wizard", async ({ page }) => {
    await page.goto("/sessions");

    await expect(page.getByText(/REQUEST A CUSTOM SESSION QUOTE/i)).toBeVisible();
    // Step 1: select a session type button in the wizard
    const sessionCard = page.locator("#quote-section button").filter({ hasText: "Generative AI" }).first();
    await sessionCard.click();
    await page.getByRole("button", { name: /Continue/i }).click();

    // Step 2: audience
    const audienceCard = page.getByRole("button", { name: /Engineering & Computer Science Students/i });
    await audienceCard.click();
    await page.getByRole("button", { name: /Continue/i }).click();

    // Step 3: location
    await page.locator("#qw-institution").fill("Rajarajeswari College of Engineering");
    await page.locator("#qw-city").fill("Bengaluru, Karnataka");
    await page.getByRole("button", { name: /Continue/i }).click();

    // Step 4: travel
    await page.getByRole("button", { name: /Continue/i }).click();

    // Step 5: contact details
    await page.locator("#qw-name").fill("Prof. Testing User");
    await page.locator("#qw-email").fill("test.organizer@domain.edu");
    
    // Check if already dispatched or move to step 6 and submit
    const dispatched = page.getByText(/Quote Request Dispatched!/i);
    if (!await dispatched.isVisible()) {
      const continueBtn = page.getByRole("button", { name: /Continue/i });
      if (await continueBtn.isVisible()) {
        await continueBtn.click();
      }
      
      const submitBtn = page.getByRole("button", { name: /Submit Official Quote Request/i });
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
      }
    }

    // Success confirmation
    await expect(page.getByText(/Quote Request Dispatched!/i)).toBeVisible({ timeout: 10000 });
  });

  test("6. vCard API endpoint returns valid .vcf with social channels", async ({ request }) => {
    const response = await request.get("/api/vcard");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/vcard");
    
    const vcfText = await response.text();
    expect(vcfText).toContain("BEGIN:VCARD");
    expect(vcfText).toContain("FN:Prajwalkumar Madiwal");
    expect(vcfText).toContain("EMAIL;TYPE=INTERNET,PREF:pkm.digi@gmail.com");
    expect(vcfText).toContain("https://www.linkedin.com/in/prajwalkumarm/");
    expect(vcfText).toContain("https://github.com/Prajwalkumar-1906");
    expect(vcfText).toContain("https://www.instagram.com/foreverprajwalkumar/");
    expect(vcfText).toContain("https://x.com/prajwalkumar_19");
    expect(vcfText).toContain("END:VCARD");
  });

  test("7. Chatbot API grounding and fallback behavior", async ({ request }) => {
    // Known question
    const knownRes = await request.post("/api/chat", {
      data: { message: "What college does Prajwal attend?" }
    });
    expect(knownRes.status()).toBe(200);
    const knownData = await knownRes.json();
    expect(knownData.reply).toContain("Rajarajeswari College of Engineering");

    // Unknown question triggers strict fallback
    const unknownRes = await request.post("/api/chat", {
      data: { message: "What is his favorite pizza topping and secret password?" }
    });
    expect(unknownRes.status()).toBe(200);
    const unknownData = await unknownRes.json();
    expect(unknownData.reply).toContain("pkm.digi@gmail.com");
  });

  test("8. Contact API validation and submission", async ({ request }) => {
    // Failure case (invalid email, too short message)
    const failRes = await request.post("/api/contact", {
      data: {
        name: "A",
        email: "not-an-email",
        purpose: "hire",
        message: "short"
      }
    });
    expect(failRes.status()).toBe(400);

    // Success case
    const successRes = await request.post("/api/contact", {
      data: {
        name: "Recruiter Alice",
        email: "alice@techcorp.com",
        purpose: "hire",
        message: "Hello Prajwal, reviewing your profile for an AI Engineer position."
      }
    });
    expect(successRes.status()).toBe(200);
    const successData = await successRes.json();
    expect(successData.success).toBe(true);
  });

  test("9. Cinematic Logo & Entrance Portrait rendering", async ({ page }) => {
    // 1. Check Welcome Gate has correct portrait and logo
    await page.goto("/");
    const portraitImg = page.locator('img[src*="gate_portrait.webp"]');
    await expect(portraitImg).toBeVisible({ timeout: 8000 });

    // Logo check
    const logoText = page.locator('header').getByText("PRAJWAL", { exact: true });
    await expect(logoText).toBeVisible();

    // 2. Check /who profile selector has Cinematic Logo without overlap
    await page.goto("/who");
    const whoHeading = page.getByRole("heading", { name: /WHO'S WATCHING\?/i });
    await expect(whoHeading).toBeVisible();

    const whoLogo = page.locator('header').getByText("PRAJWAL", { exact: true });
    await expect(whoLogo).toBeVisible();

    // Verify both elements bounding boxes do not overlap vertically
    const logoBox = await whoLogo.boundingBox();
    const headingBox = await whoHeading.boundingBox();
    expect(logoBox).not.toBeNull();
    expect(headingBox).not.toBeNull();
    if (logoBox && headingBox) {
      // Header logo must sit above the heading
      expect(logoBox.y + logoBox.height).toBeLessThanOrEqual(headingBox.y);
    }
  });

  test("10. Ask Srushti Chatbot UI and conversation flow", async ({ page }) => {
    await page.goto("/browse");

    // Check the launcher button pill is 'ASK SRUSHTI'
    const launcherBtn = page.getByRole("button", { name: /Ask Srushti AI Assistant/i });
    await expect(launcherBtn).toBeVisible({ timeout: 8000 });
    await expect(launcherBtn).toContainText("ASK SRUSHTI");

    // Click to open chat
    await launcherBtn.click();

    // Dialog must be visible and have ASK SRUSHTI title
    const dialog = page.getByRole("dialog", { name: /AI Concierge/i });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("ASK SRUSHTI")).toBeVisible();

    // Greeting must introduce Srushti
    await expect(dialog.getByText(/Hello! I am Srushti/i)).toBeVisible();
  });

  test("11. /api/tts endpoint security, length limits, and fallback behavior", async ({ request }) => {
    // 1. Oversize text (>600 characters) must be rejected with 400
    const longText = "A".repeat(601);
    const oversizeRes = await request.post("/api/tts", {
      data: { text: longText, lang: "en-IN" }
    });
    expect(oversizeRes.status()).toBe(400);
    const oversizeData = await oversizeRes.json();
    expect(oversizeData.error).toContain("exceeds limit");

    // 2. Cross-origin request must be blocked with 403
    const crossOriginRes = await request.post("/api/tts", {
      headers: {
        origin: "https://malicious-external-site.com"
      },
      data: { text: "Hello", lang: "en-IN" }
    });
    expect(crossOriginRes.status()).toBe(403);
    const crossOriginData = await crossOriginRes.json();
    expect(crossOriginData.error).toContain("cross-origin");

    // 3. Fallback behavior when provider key is absent
    const normalRes = await request.post("/api/tts", {
      data: { text: "Hello from Srushti", lang: "en-IN" }
    });
    // If ELEVENLABS_API_KEY is not set on CI, it returns 503 with fallback: "browser"
    if (normalRes.status() === 503) {
      const data = await normalRes.json();
      expect(data.fallback).toBe("browser");
    } else {
      expect([200, 429]).toContain(normalRes.status());
    }
  });

  test("12. Cloned Voice Assistant UI, 3D Voice Orb, and transparency modal", async ({ page }) => {
    await page.goto("/browse");

    // Open chat
    const launcherBtn = page.getByRole("button", { name: /Ask Srushti AI Assistant/i });
    await launcherBtn.click();

    const dialog = page.getByRole("dialog", { name: /AI Concierge/i });
    await expect(dialog).toBeVisible();

    // Check transparency label
    await expect(dialog.getByText(/AI-generated voice of Srushti/i)).toBeVisible();

    // Click transparency info button to open disclosure modal
    const infoBtn = dialog.getByLabel(/View synthetic voice disclosure/i);
    await infoBtn.click();

    // Modal must be visible and explain synthetic voice
    await expect(page.getByText(/SYNTHETIC VOICE DISCLOSURE/i)).toBeVisible();
    await expect(page.getByText(/AI-Generated Female Voice/i)).toBeVisible();
    await expect(page.getByText(/Not a Live Person/i)).toBeVisible();

    // Close disclosure modal
    await page.getByRole("button", { name: /Understood/i }).click();

    // Check voice settings toggle exists
    const settingsBtn = dialog.getByTitle(/Voice Settings/i);
    await expect(settingsBtn).toBeVisible();
    await settingsBtn.click();

    // Speed buttons (0.9x, 1x, 1.15x)
    await expect(dialog.getByText("0.9x")).toBeVisible();
    await expect(dialog.getByText("1x")).toBeVisible();
    await expect(dialog.getByText("1.15x")).toBeVisible();
  });

  test("13. Security check: Provider API keys are never exposed in client bundles", async ({ page }) => {
    await page.goto("/browse");
    const htmlContent = await page.content();
    expect(htmlContent).not.toContain("ELEVENLABS_API_KEY");
    expect(htmlContent).not.toContain("xi-api-key");
  });
});

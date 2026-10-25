# PRAJWAL | World-Class Netflix-Style 3D Portfolio (Phase 2 Upgrade)

An interactive, streaming-inspired personal portfolio engineered to Netflix-grade UI/UX standards for **PRAJWALKUMAR MADIWAL** — Final-Year Computer Science Engineering scholar at RRCE Bengaluru, AI Intern at ABB, Data & Business Analyst, and Keynote Speaker.

Built with **Next.js 16 (Turbopack, App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js**, **Framer Motion**, **Web Audio API**, **Web Speech AI Assistant**, and **Playwright E2E Testing**.

---

## 🌟 Key Features & Architecture

### A. Cinematic Welcome Gate (`/`)
- Full-screen dark cinematic screen with slow red light-streak background and floating 3D dust particles.
- Central 3D parallax portrait with mouse/device tilt and red rim glow.
- Large Bebas Neue display heading: **PRAJWALKUMAR MADIWAL**.
- Typewriter subtitle rotating through verified roles:
  - *AI/ML & Full-Stack Engineer*
  - *Data & Business Analyst*
  - *Public Speaker & Thinker*
  - *Business Developer*
- **Time-Aware Greeting**: "Good morning / afternoon / evening" based on visitor's local clock, or "Welcome back" if previously visited.
- **ENTER Gesture**: Keyboard-accessible primary button (Enter/Space) unlocking Web Audio, transitioning through tudum chord reveal to `/who`.
- **Preloader Bar**: Silently buffers critical images and fonts (max 2.5s).
- **Direct Deep-Link Bypass**: `/recruiter`, `/browse`, `/sessions`, `/network`, `/contact`, and `/?skip=1` immediately bypass gate and intro.
- **Dynamic Open Graph & Twitter Card**: Generated dynamically (`/opengraph-image`) with portrait, verified roles, 8K+ follower badge, and "Open to Work" pill.

### B. Dedicated Profile Selector (`/who`)
- Netflix-grade "Who's Watching?" profile grid using Prajwal's updated high-definition photography:
  1. **RECRUITER** (`/recruiter`): Keynote podium portrait &bull; Fast-track skills, PlaceWise, Chukta & dual resumes.
  2. **JUST BROWSING** (`/browse`): Stage presentation portrait &bull; Billboard trailer, 3D journey & values.
  3. **BOOK A SESSION** (`/sessions`): Executive tech-park portrait &bull; Keynotes, GenAI labs & custom quote calculator.
  4. **NETWORKER** (`/network`): Sports trophy & cricket jersey portrait &bull; Social channels, Guestbook & collabs.

### C. Recruiter Suite (`/recruiter`)
- **Dual-Season Track Switcher**: Season 1 (AI/ML & Full-Stack) vs Season 2 (Data, BA & BD).
- **Job Fit Analyzer**: Recruiter pastes a job description; evaluated against verified knowledge base with honest "Strong / Partial / Not yet" ratings, matching skills, relevant projects, and explicit gaps. Zero inflated percentage claims.
- **Role Fit Finder**: 3-question hiring quiz recommending Season 1 or Season 2.
- **60-Second Skim Mode**: Modal executive brief with one-click PDF print/export (`window.print()`).
- **Dual Resume Vault**: Dedicated cards for Season 1 & Season 2 with last-updated date (October 2026) and mobile QR codes for instant device scanning.
- **Project Case Studies**: Expandable case studies featuring Problem, Approach, Scalable SVG Architecture Diagrams (PlaceWise, Chukta, Retention), Facts-Only Results, and What I Learned.

### D. Stage & Speaker Suite (`/sessions`)
- **Multi-Step Quote Request Wizard**: 6-step booking flow (Session Type &rarr; Audience &rarr; Date & City &rarr; Travel Logistics &rarr; Organizer Coordinates &rarr; Review & Submit) with progress bar and auto-dispatch to `pkm.digi@gmail.com`.
- **Speaker Reel Gallery**: Interactive photo grid with 3D tilt lightbox and video embed slots.
- **Printable Media Kit**: Short bio, long bio, high-res headshot download links, talk formats, and catalog topics.
- **Zero-Fabrication Testimonial System**: Modal form allowing attendees/organizers to submit reviews with consent for moderation.

### E. Network & Community Hub (`/network`)
- **5 Verified Social Link Cards**:
  - **Instagram**: [https://www.instagram.com/foreverprajwalkumar/](https://www.instagram.com/foreverprajwalkumar/) (`@foreverprajwalkumar`)
  - **X (Twitter)**: [https://x.com/prajwalkumar_19](https://x.com/prajwalkumar_19) (`@prajwalkumar_19`)
  - **LinkedIn**: [https://www.linkedin.com/in/prajwalkumarm/](https://www.linkedin.com/in/prajwalkumarm/) (verified 8K+ followers)
  - **GitHub**: [https://github.com/Prajwalkumar-1906](https://github.com/Prajwalkumar-1906)
  - **Email**: `pkm.digi@gmail.com`
- **Share My Profile Modal**: Web Share API, instant link copy, WhatsApp/LinkedIn/X share intents, and downloadable QR code PNG.
- **Downloadable vCard (.vcf)**: Native contact download (`/api/vcard`) with all 5 verified channels.
- **Wall of Wishes (Guestbook)**: Moderated community board with honeypot spam protection, profanity filtering, and email dispatch.
- **Thoughts Row**: MDX starter drafts (*AI Fairness in Hiring*, *Hackathon to Scalable Product*, *Public Speaking Tips for Engineers*).

### F. Site-Wide Enhancements
- **UI Language Switcher**: Fast toggling between English, Hindi (हिन्दी), and Kannada (ಕನ್ನಡ) for headings, CTAs, and navigation.
- **"Now Playing" Live Status**: Editable ticker in navbar (`PROFILE.nowPlaying`).
- **Verified Impact Counters**: 8K+ LinkedIn followers, 100+ students trained, 300+ summit attendees, 150+ leads/month, 200+ survey respondents, 15 vendors onboarded, Rs. 50,000+ raised, 30+ LeetCode problems, Top 5 of 30+ teams.
- **Command Palette (`Ctrl+K` / `Cmd+K`)**: Fast search across projects, skills, services, and actions (Download Resume, Book Session, Copy Email, Toggle Audio).
- **Audio Design**: Original synthesized Web Audio effects (tudum chord, hover, select, whoosh) with persistent sound toggle (default OFF).
- **PWA Ready**: Manifest, theme colors, and offline service worker.
- **Easter Eggs**: Tudum confetti burst + Konami code (`↑ ↑ ↓ ↓ ← → ← → b a`) unlocking the "Director's Cut" truthful fun facts modal.
- **AI Voice Assistant Upgrade**: Profile-specific suggested prompts, conversation transcript export (`.txt`), lead-capture handoff button, and multilingual speech synthesis/recognition (en-IN, hi-IN, kn-IN). Sanitized logging of unanswered queries to improve the knowledge base.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (Node 20, 22, and 24 tested)
- npm 9+

### 2. Installation
```bash
npm install
```

### 3. Running Locally
```bash
# Start development server
npm run dev

# Or build and run production server
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Running End-to-End Tests
```bash
npm test
```
Runs the 8 automated Playwright test suites covering:
1. Gate &rarr; Enter &rarr; Profile Selector transition
2. Deep links bypassing the Gate
3. Exact social URL verification
4. Job Fit Analyzer & Dual Resumes
5. Multi-step Quote Wizard flow
6. vCard API endpoint
7. Chatbot grounding & fallback
8. Contact API validation & honeypot spam rejection

---

## ⚙️ Environment Variables

Create `.env.local` based on `.env.example`:

```bash
# Web3Forms API Key for email delivery to pkm.digi@gmail.com
# Get a free key at https://web3forms.com
NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here

# Google Gemini API Key for server-side AI Chatbot & Job Fit matching
# Get key at https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-1.5-flash

# Optional Scheduling (Cal.com or Calendly)
NEXT_PUBLIC_CALENDLY_URL=https://cal.com/your-username/15min

# Optional Newsletter (Buttondown / Custom form action)
NEXT_PUBLIC_NEWSLETTER_URL=

# Optional Direct WhatsApp
NEXT_PUBLIC_WHATSAPP_PHONE=919876543210
```

---

## 📁 Decoupled Content Architecture

All portfolio facts and text content reside strictly in `/src/data/`:
- `profile.ts`: Bio, elevator pitch, links, now playing status, and verified metrics.
- `experience.ts`: ABB, KSST, Galaxy Systems, Dream Den.
- `projects.ts`: PlaceWise, Chukta, Customer Retention, Community Hero, Vendor Pipeline (with case study Problem, Approach, Architecture, and Lessons Learned).
- `services.ts`: 11 speaking & workshop offerings with formats and outcomes.
- `skills.ts`: Categorized technical competencies and 3D globe coordinates.
- `education.ts`: RRCE, Tungal, Sathya Sai Grama, and certifications.
- `knowledge.json`: Grounded Q&A knowledge base for the AI Assistant.
- `guestbook.ts`: Moderated approved community notes.
- `posts.ts`: Articles and drafts for the "Thoughts" row.

---

## 🎙️ Setting Up the Cloned Voice (Phase 3: Ask Srushti)

The portfolio features a server-side synthetic text-to-speech engine delivering a warm, articulate **Female AI voice** for **Srushti** (Prajwal's digital copilot), replacing default robotic browser speech while maintaining strict security, zero PII logging, and budget protection.

### 1. Generating & Configuring the Female Voice on ElevenLabs
1. Sign up for a free or creator account at [elevenlabs.io](https://elevenlabs.io).
2. Go to **Voices &rarr; VoiceLab**:
   - **Option A (Default Curated Voice)**: Use the built-in professional female voice `21m00Tcm4TlvDq8ikWAM` ("Rachel") or `EXAVITQu4vr4xnSDxMaL` ("Bella").
   - **Option B (Instant Voice Clone)**: Click **Add Voice &rarr; Instant Voice Cloning**. Upload 1 to 5 minutes of clean, noise-free consented female speech. Name it `Srushti - Copilot Voice`.
3. Copy the **Voice ID** from the voice card settings.
4. Obtain your API key from **Profile Settings &rarr; API Keys**.

### 2. Setting Environment Variables
Add the credentials to your local `.env.local` (and into Vercel Project Settings &rarr; Environment Variables):
```ini
# Server-side only — never exposed to client bundles
ELEVENLABS_API_KEY=your_actual_elevenlabs_api_key_here
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
TTS_PROVIDER=elevenlabs
TTS_DAILY_CHAR_LIMIT=50000
```

### 3. Pluggable Provider Architecture & Swapping
The TTS service uses a modular adapter pattern (`src/lib/tts/`):
- `types.ts`: `TTSProvider` contract (`synthesize({ text, lang, voiceId })`).
- `elevenlabs.ts`: ElevenLabs implementation using the `eleven_multilingual_v2` model for fluent English, Hindi, and Kannada.
- To add an alternative provider (e.g. Cartesia or Azure Speech), implement `TTSProvider` and set `TTS_PROVIDER=cartesia` in your environment.

### 4. Cost Control & Audio Caching
- **Daily Budget Cap**: Enforced by `TTS_DAILY_CHAR_LIMIT` (default 50,000 characters). When reached, the system silently falls back to local browser speech synthesis and displays a discreet notice.
- **SHA-256 Server Cache**: High-frequency replies (greetings, email directions, fallback messages) are cached in memory after first synthesis, consuming **0 API characters** and returning audio with **0ms latency**.
- **Long Reply Truncation**: Replies over 550 characters speak a concise 2-sentence intro plus *"The full comprehensive details are displayed on screen."* to avoid burning character credits.

### 5. Security & Transparency Rules
- **No Raw Voice Uploads**: Raw audio recordings are kept out of `/public` and permanently excluded via `.gitignore`.
- **API Guardrails**: `/api/tts` enforces Zod length validation (max 600 chars), per-IP rate limiting (30 req/min), and blocks unauthorized cross-origin requests.
- **Ethical Transparency**: The chat header displays a visible disclosure badge `AI-GENERATED FEMALE VOICE (SRUSHTI)` with an interactive info modal. The assistant strictly declines deceptive human impersonation or binding contractual quotes.

---

## 🚢 Deploying to Vercel & Custom Domain

1. **Deploy to Vercel**:
   ```bash
   git add .
   git commit -m "feat: complete phase 2 upgrade"
   git push origin main
   ```
   Import the repository on [vercel.com](https://vercel.com). Add the environment variables from `.env.example` in Vercel Project Settings &rarr; Environment Variables.
2. **Custom Domain**:
   - In Vercel &rarr; Settings &rarr; Domains, enter your custom domain (e.g. `prajwalkumar.com`).
   - Configure DNS records at your domain registrar (A record pointing to `76.76.21.21` or CNAME pointing to `cname.vercel-dns.com`).
   - SSL certificate will provision automatically.

---

## 📋 Prajwal's Action Checklist (Things You Must Do)

1. [ ] **Web3Forms Key**: Get a free key at [web3forms.com](https://web3forms.com) pointing to `pkm.digi@gmail.com` and put it in `.env.local` / Vercel.
2. [ ] **Gemini API Key**: Create a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey) and put it in `.env.local` / Vercel.
3. [x] **Resume PDFs**: Updated with latest official exported PDFs (Track 1: AIML & Full-Stack, Track 2: Data Scientist & Business Roles, and Combined Portfolio Dossier).
4. [ ] **Vendor Growth Pipeline Tech Stack**: Confirm finalized tools/frameworks for `technologies: []` in `/src/data/projects.ts` (currently marked with `// TODO: add stack`).
5. [ ] **Sathya Sai Grama Schooling Details**: Add specific completion years and highlights in `/src/data/education.ts` (currently marked with `// TODO: add details`).
6. [ ] **Photo Caption Confirmation**: Verify the caption for `IMG_20260614_122236.jpg` (*"Sai Krishan Premamrutham Hall"*) in `/src/components/browse/ValuesAndServiceBanner.tsx`.
7. [ ] **Cal.com Link**: If you want 1-click 15-min call scheduling, add `NEXT_PUBLIC_CALENDLY_URL` in `.env.local`.
8. [ ] **Hindi & Kannada Review**: Review translations in `/src/lib/i18n.ts` marked with `// TODO: review translations`.
9. [ ] **ElevenLabs Female Voice Setup**: Put `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID` in `.env.local` or Vercel Environment Variables to activate the cloned female voice for Srushti.

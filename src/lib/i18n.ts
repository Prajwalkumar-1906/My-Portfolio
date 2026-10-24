// Simple lightweight client i18n system for UI Headings, Navigation & CTAs
// Technical content remains in English.
// TODO: Review Hindi and Kannada translations with Prajwalkumar Madiwal

export type Language = "en" | "hi" | "kn";

export interface Translations {
  nav: {
    recruiter: string;
    browse: string;
    sessions: string;
    network: string;
    contact: string;
  };
  gate: {
    greetingMorning: string;
    greetingAfternoon: string;
    greetingEvening: string;
    welcomeBack: string;
    enter: string;
    skipRecruiter: string;
    openToWork: string;
  };
  headings: {
    whosWatching: string;
    nowPlaying: string;
    jobFitAnalyzer: string;
    roleFitFinder: string;
    requestQuote: string;
    valuesAndService: string;
    featuredWork: string;
    experienceSeason: string;
  };
  actions: {
    downloadResume: string;
    shareProfile: string;
    saveContact: string;
    quickApply: string;
    bookSession: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      recruiter: "Recruiter",
      browse: "Browse Show",
      sessions: "Book a Session",
      network: "Network",
      contact: "Contact"
    },
    gate: {
      greetingMorning: "Good morning,",
      greetingAfternoon: "Good afternoon,",
      greetingEvening: "Good evening,",
      welcomeBack: "Welcome back,",
      enter: "ENTER",
      skipRecruiter: "Skip to Recruiter",
      openToWork: "Open to Work"
    },
    headings: {
      whosWatching: "WHO'S WATCHING?",
      nowPlaying: "NOW STREAMING",
      jobFitAnalyzer: "Job Fit Analyzer",
      roleFitFinder: "Role Fit Finder",
      requestQuote: "Request a Session Quote",
      valuesAndService: "Beyond the Code: Values & Service",
      featuredWork: "Featured Original Productions",
      experienceSeason: "Career Episodes & Seasons"
    },
    actions: {
      downloadResume: "Download Resume",
      shareProfile: "Share Profile",
      saveContact: "Save Contact (vCard)",
      quickApply: "Instant Interview / Fit Check",
      bookSession: "Book a Keynote Session"
    }
  },
  hi: {
    // TODO: Verify Hindi translations with Prajwalkumar Madiwal
    nav: {
      recruiter: "भर्तीकर्ता (Recruiter)",
      browse: "शो देखें (Browse)",
      sessions: "सत्र बुक करें (Sessions)",
      network: "नेटवर्क (Network)",
      contact: "संपर्क (Contact)"
    },
    gate: {
      greetingMorning: "शुभ प्रभात,",
      greetingAfternoon: "शुभ दोपहर,",
      greetingEvening: "शुभ संध्या,",
      welcomeBack: "पुनः स्वागत है,",
      enter: "प्रवेश करें (ENTER)",
      skipRecruiter: "भर्तीकर्ता दृश्य पर जाएं",
      openToWork: "नियुक्ति के लिए उपलब्ध"
    },
    headings: {
      whosWatching: "कौन देख रहा है?",
      nowPlaying: "अभी चल रहा है",
      jobFitAnalyzer: "नौकरी योग्यता विश्लेषक",
      roleFitFinder: "भूमिका चयन सहायक",
      requestQuote: "भाषण / सत्र उद्धरण अनुरोध",
      valuesAndService: "कोड से परे: मूल्य एवं सेवा",
      featuredWork: "प्रमुख मूल प्रोजेक्ट्स",
      experienceSeason: "करियर सीज़न व अनुभव"
    },
    actions: {
      downloadResume: "बायोडाटा डाउनलोड करें",
      shareProfile: "प्रोफ़ाइल साझा करें",
      saveContact: "संपर्क सहेजें (vCard)",
      quickApply: "त्वरित साक्षात्कार जांच",
      bookSession: "मुख्य वक्ता सत्र बुक करें"
    }
  },
  kn: {
    // TODO: Verify Kannada translations with Prajwalkumar Madiwal
    nav: {
      recruiter: "ನೇಮಕಾತಿದಾರರು (Recruiter)",
      browse: "ವೀಕ್ಷಿಸಿ (Browse)",
      sessions: "ಭಾಷಣ ಕಾಯ್ದಿರಿಸಿ (Sessions)",
      network: "ನೆಟ್‌ವರ್ಕ್ (Network)",
      contact: "ಸಂಪರ್ಕಿಸಿ (Contact)"
    },
    gate: {
      greetingMorning: "ಶುಭೋದಯ,",
      greetingAfternoon: "ಶುಭ ಮಧ್ಯಾಹ್ನ,",
      greetingEvening: "ಶುಭ ಸಂಜೆ,",
      welcomeBack: "ಮತ್ತೆ ಸುಸ್ವಾಗತ,",
      enter: "ಪ್ರವೇಶಿಸಿ (ENTER)",
      skipRecruiter: "ನೇಮಕಾತಿದಾರರ ವೀಕ್ಷಣೆಗೆ ಹೋಗಿ",
      openToWork: "ಉದ್ಯೋಗಾವಕಾಶಕ್ಕೆ ಸಿದ್ಧ"
    },
    headings: {
      whosWatching: "ಯಾರು ವೀಕ್ಷಿಸುತ್ತಿದ್ದಾರೆ?",
      nowPlaying: "ಈಗ ಪ್ರಸಾರವಾಗುತ್ತಿದೆ",
      jobFitAnalyzer: "ಉದ್ಯೋಗ ಅರ್ಹತೆ ವಿಶ್ಲೇಷಕ",
      roleFitFinder: "ಸೂಕ್ತ ಹುದ್ದೆ ಮಾರ್ಗದರ್ಶಿ",
      requestQuote: "ಭಾಷಣ / ತರಬೇತಿ ಕೋರಿಕೆಯ ಕೋಟ್",
      valuesAndService: "ಕೋಡಿಂಗ್ ಮೀರಿ: ಮೌಲ್ಯಗಳು ಮತ್ತು ಸೇವೆ",
      featuredWork: "ಪ್ರಮುಖ ಮೂಲ ಯೋಜನೆಗಳು",
      experienceSeason: "ವೃತ್ತಿ ಅನುಭವದ ಸರಣಿ"
    },
    actions: {
      downloadResume: "ರೆಸ್ಯೂಮೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
      shareProfile: "ಪ್ರೊಫೈಲ್ ಹಂಚಿಕೊಳ್ಳಿ",
      saveContact: "ಸಂಪರ್ಕ ಉಳಿಸಿ (vCard)",
      quickApply: "ತಕ್ಷಣದ ಫಿಟ್ ಪರಿಶೀಲನೆ",
      bookSession: "ಭಾಷಣ ಆಯೋಜಿಸಿ"
    }
  }
};

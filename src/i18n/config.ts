import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import zh from "./locales/zh/translation.json";
import en from "./locales/en/translation.json";

const resources = {
  zh: {
    translation: zh,
  },
  en: {
    translation: en,
  },
};

const LANGUAGE_MAP: Record<string, string> = {
  zh: "zh-CN",
  en: "en",
};

const META_SELECTORS = {
  ogTitle: 'meta[property="og:title"]',
  ogDescription: 'meta[property="og:description"]',
  description: 'meta[name="description"]',
  keywords: 'meta[name="keywords"]',
  twitterTitle: 'meta[name="twitter:title"]',
  twitterDescription: 'meta[name="twitter:description"]',
} as const;

const updateHtmlLang = (lang: string) => {
  const htmlLang = LANGUAGE_MAP[lang] || LANGUAGE_MAP.zh;
  document.documentElement.setAttribute("lang", htmlLang);
};

const updateMetaContent = (selector: string, content: string) => {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute("content", content);
  }
};

const updateMetaTags = (lang: string) => {
  const getTranslation = (key: string): string => {
    const keys = key.split(".");
    const translation = resources[lang as keyof typeof resources]?.translation;
    if (!translation) return key;

    let value: unknown = translation;
    for (const k of keys) {
      if (typeof value === "object" && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  };

  const title = getTranslation("meta.title");
  const description = getTranslation("meta.description");
  const keywords = getTranslation("meta.keywords");

  document.title = title;

  updateMetaContent(META_SELECTORS.ogTitle, title);
  updateMetaContent(META_SELECTORS.ogDescription, description);
  updateMetaContent(META_SELECTORS.description, description);
  updateMetaContent(META_SELECTORS.twitterTitle, title);
  updateMetaContent(META_SELECTORS.twitterDescription, description);
  updateMetaContent(META_SELECTORS.keywords, keywords);
};

const initializeI18n = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "zh",
      supportedLngs: ["zh", "en"],
      defaultNS: "translation",
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "i18nextLng",
      },
      react: {
        useSuspense: false,
      },
    })
    .then(() => {
      const currentLang = i18n.language || "zh";
      updateHtmlLang(currentLang);
      updateMetaTags(currentLang);
    });

  i18n.on("languageChanged", (lng) => {
    updateHtmlLang(lng);
    updateMetaTags(lng);
    window.location.reload();
  });
};

initializeI18n();

export default i18n;


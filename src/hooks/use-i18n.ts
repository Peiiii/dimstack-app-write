import { useTranslation } from "react-i18next";

export function useI18n() {
  const { t, i18n } = useTranslation();
  return {
    t,
    i18n,
    changeLanguage: (lng: string) => i18n.changeLanguage(lng),
    currentLanguage: i18n.language,
  };
}


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { t, type LangCode } from "@/lib/translations";

export default function Home() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<LangCode>("en");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <div className="text-7xl mb-6">🌞</div>
      <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
        {t("title", lang)}
      </h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        {lang === "en"
          ? "Monitor your solar panel, save energy, and get smart suggestions — in your language."
          : t("loading", lang)}
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/85 active:scale-[0.96] mb-6"
      >
        {lang === "en" ? "Enter Dashboard →" : t("refresh", lang)}
      </button>
      <LanguageSelector currentLang={lang} onSelect={setLang} label={t("language", lang)} />
    </div>
  );
}

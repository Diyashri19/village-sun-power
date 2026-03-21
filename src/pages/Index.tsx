import { useState } from "react";
import { useSolarData } from "@/hooks/useSolarData";
import { t, type LangCode } from "@/lib/translations";
import { SolarCard } from "@/components/SolarCard";
import { LanguageSelector } from "@/components/LanguageSelector";

function parseOutputSections(output: string) {
  // Try to split the output into sections for the 5 cards
  // The API returns a single text block — we split by lines and distribute
  const lines = output.split("\n").filter((l) => l.trim());
  const chunkSize = Math.max(1, Math.ceil(lines.length / 5));
  return {
    todaySuggestion: lines.slice(0, chunkSize).join("\n") || "—",
    deviceUsage: lines.slice(chunkSize, chunkSize * 2).join("\n") || "—",
    systemAlert: lines.slice(chunkSize * 2, chunkSize * 3).join("\n") || "—",
    prediction: lines.slice(chunkSize * 3, chunkSize * 4).join("\n") || "—",
    savings: lines.slice(chunkSize * 4).join("\n") || "—",
  };
}

export default function Index() {
  const [lang, setLang] = useState<LangCode>("en");
  const { output, isLoading, isError, refresh } = useSolarData();

  const sections = output ? parseOutputSections(output) : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-8 py-6 border-b border-border">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
          {t("title", lang)}
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={refresh}
            className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/80 active:scale-[0.96]"
          >
            {t("refresh", lang)}
          </button>
          <LanguageSelector
            currentLang={lang}
            onSelect={setLang}
            label={t("language", lang)}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        {isLoading && (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground text-lg">{t("loading", lang)}</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-16">
            <p className="text-destructive text-xl font-semibold">{t("error", lang)}</p>
          </div>
        )}

        {!isLoading && !isError && !sections && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">{t("noData", lang)}</p>
          </div>
        )}

        {sections && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SolarCard
              title={t("todaySuggestion", lang)}
              content={sections.todaySuggestion}
              variant="green"
            />
            <SolarCard
              title={t("deviceUsage", lang)}
              content={sections.deviceUsage}
              variant="yellow"
            />
            <SolarCard
              title={t("systemAlert", lang)}
              content={sections.systemAlert}
              variant="white"
            />
            <SolarCard
              title={t("prediction", lang)}
              content={sections.prediction}
              variant="green"
            />
            <SolarCard
              title={t("savings", lang)}
              content={sections.savings}
              variant="yellow"
              className="md:col-span-2"
            />
          </div>
        )}
      </main>
    </div>
  );
}

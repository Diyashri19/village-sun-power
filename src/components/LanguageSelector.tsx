import { LANGUAGES, type LangCode } from "@/lib/translations";
import { useState } from "react";

interface LanguageSelectorProps {
  currentLang: LangCode;
  onSelect: (lang: LangCode) => void;
  label: string;
}

export function LanguageSelector({ currentLang, onSelect, label }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg bg-card px-4 py-3 text-sm font-medium text-foreground shadow-md transition-all duration-200 hover:bg-muted active:scale-[0.97] w-full"
      >
        <span>{label}</span>
        <span className="ml-auto text-secondary font-bold">
          {LANGUAGES.find((l) => l.code === currentLang)?.label}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 max-h-80 w-64 overflow-y-auto rounded-lg bg-card shadow-2xl border border-border">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onSelect(lang.code);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-sm transition-colors hover:bg-muted active:scale-[0.98] ${
                lang.code === currentLang ? "bg-primary/20 text-primary font-bold" : "text-foreground"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

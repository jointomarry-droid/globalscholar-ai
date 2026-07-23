"use client";

import { useTranslations } from "next-intl";

export default function FaqsPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">{t("faqs.title")}</h1>
        <p className="text-[var(--muted-foreground)]">
          {t("faqs.subtitle")}
        </p>
      </div>
    </div>
  );
}

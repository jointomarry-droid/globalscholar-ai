"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const t = useTranslations();
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">{t("nav.resources")}: {slug}</h1>
        <p className="text-[var(--muted-foreground)]">
          Blog post content coming soon.
        </p>
      </div>
    </div>
  );
}

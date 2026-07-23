import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, localeNames, type Locale } from '@/i18n/routing';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { FirebaseProvider } from '@/components/layout/firebase-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import '@/styles/globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const lang = locale as Locale;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://globalscholar.ai';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'GlobalScholar AI - From Admission to Global Career | AI-Powered Education Ecosystem',
      template: '%s | GlobalScholar AI',
    },
    description:
      'GlobalScholar AI is the trusted AI-powered global education ecosystem helping students discover 500,000+ scholarships from 50,000+ universities across 200+ countries.',
    openGraph: {
      type: 'website',
      locale: localeNames[lang]?.nativeName || 'English',
      url: baseUrl,
      siteName: 'GlobalScholar AI',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${baseUrl}/${l}`])
      ),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const lang = locale as Locale;
  const dir = localeNames[lang]?.dir || 'ltr';

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <FirebaseProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </FirebaseProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

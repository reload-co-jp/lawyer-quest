import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"
import { Kaisei_Tokumin, DotGothic16 } from "next/font/google"
import { HeaderNav } from "components/HeaderNav"
import {
  BASE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  OG_IMAGE,
  SITE_NAME,
  SITE_TITLE,
} from "lib/seo"
import "./reset.css"

const GA_ID = "G-1PYPBQGLTQ"
const isProd = process.env.NODE_ENV === "production"

const kaisei = Kaisei_Tokumin({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
})
const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  keywords: DEFAULT_KEYWORDS,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    title: "Lawyer Quest — 行政書士試験対策",
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawyer Quest — 行政書士試験対策",
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "ja",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" className={`${kaisei.className} ${dotGothic.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {isProd && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="site-logo">
              Lawyer <span>Quest</span>
            </Link>
            <HeaderNav />
          </div>
        </header>

        <main id="main" className="site-main">
          {children}
        </main>

        <footer className="site-footer">
          <p>
            Lawyer Quest — 行政書士試験対策。法律相談ではありません。{" "}
            <Link href="/about" style={{ color: "var(--text-2)" }}>
              運営者情報
            </Link>
          </p>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout

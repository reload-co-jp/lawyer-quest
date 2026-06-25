import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"
import { Kaisei_Tokumin, DotGothic16 } from "next/font/google"
import { HeaderNav } from "components/HeaderNav"
import { BASE_URL, DEFAULT_DESCRIPTION, OG_IMAGE, SITE_NAME } from "lib/seo"
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
    default: `${SITE_NAME} - 行政書士試験対策`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  keywords: [
    "行政書士",
    "行政書士試験",
    "行政書士試験対策",
    "行政法",
    "民法",
    "憲法",
    "過去問",
    "模擬試験",
  ],
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
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            height: "44px",
            backgroundColor: "rgba(10,10,10,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            padding: "0 1.25rem",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              width: "100%",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: ".375rem",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text-1)",
                  letterSpacing: "-.02em",
                }}
              >
                Lawyer Quest
              </span>
            </Link>

            <div
              style={{
                width: "1px",
                height: "16px",
                background: "var(--border-2)",
                flexShrink: 0,
              }}
            />

            <HeaderNav />
          </div>
        </header>

        <main
          style={{
            minHeight: "calc(100dvh - 44px - 48px)",
            padding: "2rem 1.25rem",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            height: "48px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: ".75rem", color: "var(--text-3)" }}>
            Lawyer Quest — 行政書士試験対策。法律相談ではありません。
          </p>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout

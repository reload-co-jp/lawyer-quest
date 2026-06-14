import Link from "next/link"
import { Kaisei_Tokumin } from "next/font/google"
import { HeaderNav } from "components/HeaderNav"
import "./reset.css"

const kaisei = Kaisei_Tokumin({ weight: ["400", "700"], subsets: ["latin"] })

const BASE_URL = "http://lawyer-quest.reload.co.jp"

export const metadata = {
  title: {
    default: "Lawyer Quest",
    template: "%s | Lawyer Quest",
  },
  description: "法律を、冒険のように攻略する。行政書士試験対策サイト。行政法・民法・憲法の要点を問題演習で定着。",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    siteName: "Lawyer Quest",
    title: "Lawyer Quest — 行政書士試験対策",
    description: "法律を、冒険のように攻略する。行政法・民法・憲法の要点を問題演習で定着させる学習サイト。",
    url: BASE_URL,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Lawyer Quest" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawyer Quest — 行政書士試験対策",
    description: "法律を、冒険のように攻略する。行政法・民法・憲法の要点を問題演習で定着させる学習サイト。",
    images: ["/og.svg"],
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" className={kaisei.className}>
      <body>
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
              <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-.02em" }}>
                Lawyer Quest
              </span>
            </Link>

            <div style={{ width: "1px", height: "16px", background: "var(--border-2)", flexShrink: 0 }} />

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

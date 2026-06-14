import Link from "next/link"
import "./reset.css"

export const metadata = {
  title: "Lawyer Quest",
  description: "法律を、冒険のように攻略する。行政書士試験対策サイト。",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body style={{ background: "#0f0f23", color: "#e2e8f0", fontFamily: "system-ui, sans-serif" }}>
        <header
          style={{
            backgroundColor: "#0d0d1f",
            borderBottom: "1px solid #2a2a5a",
            padding: ".75rem 1rem",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              href="/"
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: ".5rem" }}
            >
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#818cf8", letterSpacing: "-.02em" }}>
                ⚖️ Lawyer Quest
              </span>
            </Link>
            <nav style={{ display: "flex", gap: "1.25rem" }}>
              <Link href="/articles" style={{ fontSize: ".875rem", color: "#94a3b8", textDecoration: "none" }}>
                記事
              </Link>
              <Link href="/quests" style={{ fontSize: ".875rem", color: "#94a3b8", textDecoration: "none" }}>
                クエスト
              </Link>
              <Link href="/challenge/random" style={{ fontSize: ".875rem", color: "#94a3b8", textDecoration: "none" }}>
                ランダム
              </Link>
              <Link href="/retry" style={{ fontSize: ".875rem", color: "#94a3b8", textDecoration: "none" }}>
                再挑戦
              </Link>
              <Link href="/progress" style={{ fontSize: ".875rem", color: "#94a3b8", textDecoration: "none" }}>
                攻略率
              </Link>
            </nav>
          </div>
        </header>

        <main
          style={{
            minHeight: "calc(100dvh - 5rem)",
            padding: "1.5rem 1rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            backgroundColor: "#0d0d1f",
            borderTop: "1px solid #2a2a5a",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: ".75rem", color: "#64748b", margin: 0 }}>
            &copy; Lawyer Quest — 行政書士試験対策サイト。法律相談ではありません。
          </p>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout

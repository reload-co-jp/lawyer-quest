import type { FC } from "react"
import Link from "next/link"
import { getAllQuests, QUEST_COLORS } from "lib/quests"
import { getAllArticles } from "lib/articles"

const SUBJECT_VAR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
}

const Page: FC = () => {
  const quests = getAllQuests()
  const articles = getAllArticles().slice(0, 6)

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <div style={{ padding: "3.5rem 0 3rem" }}>
        <p style={{ fontSize: ".8125rem", color: "var(--accent)", fontWeight: 600, marginBottom: ".75rem", letterSpacing: ".04em", textTransform: "uppercase" }}>
          行政書士試験対策
        </p>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-1)",
            letterSpacing: "-.03em",
            lineHeight: 1.2,
            marginBottom: ".875rem",
          }}
        >
          法律を、冒険のように攻略する。
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--text-2)", marginBottom: "2rem", lineHeight: 1.7 }}>
          行政法・民法・憲法の要点を問題演習で定着させる学習サイト。
        </p>
        <div style={{ display: "flex", gap: ".625rem", flexWrap: "wrap" }}>
          <Link
            href="/quests"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".375rem",
              padding: ".5rem 1.125rem",
              background: "var(--accent-btn)",
              borderRadius: "var(--radius-sm)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: ".875rem",
              letterSpacing: "-.01em",
            }}
          >
            クエストを開始
          </Link>
          <Link
            href="/articles"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".375rem",
              padding: ".5rem 1.125rem",
              background: "transparent",
              border: "1px solid var(--border-2)",
              borderRadius: "var(--radius-sm)",
              color: "var(--text-2)",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: ".875rem",
            }}
          >
            学習記事を読む
          </Link>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".75rem" }}>
          <p style={{ fontSize: ".6875rem", color: "var(--text-3)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>
            学習記事
          </p>
          <Link href="/articles" style={{ fontSize: ".75rem", color: "var(--accent)", textDecoration: "none" }}>
            すべて見る →
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--border)" }}>
          {articles.map((article) => {
            const color = SUBJECT_VAR[article.subject] ?? "var(--accent)"
            return (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: ".625rem .875rem",
                  background: "var(--surface)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: ".625rem" }}>
                  <div style={{ width: "5px", height: "5px", background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: ".875rem", color: "var(--text-1)" }}>{article.title}</span>
                </div>
                <span style={{ fontSize: ".75rem", color: color, flexShrink: 0 }}>{article.subjectLabel}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1px", borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--border)" }}>
        {quests.map((quest) => {
          const color = SUBJECT_VAR[quest.id] ?? "var(--accent)"
          return (
            <Link
              key={quest.id}
              href={`/challenge/${quest.id}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: ".875rem 1rem",
                background: "var(--surface)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: color,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: ".9375rem", color: "var(--text-1)" }}>
                    {quest.title}
                  </p>
                  <p style={{ margin: 0, fontSize: ".8125rem", color: "var(--text-2)" }}>
                    {quest.description}
                  </p>
                </div>
              </div>
              <span style={{ color: "var(--text-3)", fontSize: ".875rem" }}>→</span>
            </Link>
          )
        })}

        <Link
          href="/challenge/random"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: ".875rem 1rem",
            background: "var(--surface)",
            textDecoration: "none",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--warning)", flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: ".9375rem", color: "var(--text-1)" }}>ランダムチャレンジ</p>
              <p style={{ margin: 0, fontSize: ".8125rem", color: "var(--text-2)" }}>全クエストからランダム10問</p>
            </div>
          </div>
          <span style={{ color: "var(--text-3)", fontSize: ".875rem" }}>→</span>
        </Link>

        <Link
          href="/retry"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: ".875rem 1rem",
            background: "var(--surface)",
            textDecoration: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--error)", flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: ".9375rem", color: "var(--text-1)" }}>再挑戦クエスト</p>
              <p style={{ margin: 0, fontSize: ".8125rem", color: "var(--text-2)" }}>間違えた問題をもう一度解く</p>
            </div>
          </div>
          <span style={{ color: "var(--text-3)", fontSize: ".875rem" }}>→</span>
        </Link>
      </div>
    </div>
  )
}

export default Page

import type { FC } from "react"
import Link from "next/link"
import { getAllQuests } from "lib/quests"
import { QUEST_COLORS } from "lib/quests"

const Page: FC = () => {
  const quests = getAllQuests()

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", padding: "3rem 0 2rem" }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#818cf8",
            margin: "0 0 .75rem",
            letterSpacing: "-.03em",
          }}
        >
          ⚖️ Lawyer Quest
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#94a3b8", margin: "0 0 .5rem" }}>
          法律を、冒険のように攻略する。
        </p>
        <p style={{ fontSize: ".875rem", color: "#64748b", margin: "0 0 2.5rem" }}>
          行政書士試験対策 — 行政法・民法・憲法
        </p>
        <Link
          href="/quests"
          style={{
            display: "inline-block",
            padding: ".875rem 2.5rem",
            background: "#4f46e5",
            borderRadius: ".75rem",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          クエストを開始する →
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem", marginTop: "1.5rem" }}>
        {quests.map((quest) => {
          const color = QUEST_COLORS[quest.id]
          return (
            <Link
              key={quest.id}
              href={`/challenge/${quest.id}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 1.25rem",
                background: "#1a1a3e",
                border: "1px solid #2a2a5a",
                borderLeft: `4px solid ${color}`,
                borderRadius: ".75rem",
                textDecoration: "none",
                color: "#e2e8f0",
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: 600 }}>{quest.title}</p>
                <p style={{ margin: ".25rem 0 0", fontSize: ".8125rem", color: "#94a3b8" }}>
                  {quest.description}
                </p>
              </div>
              <span style={{ color, fontWeight: 700, fontSize: "1.25rem" }}>→</span>
            </Link>
          )
        })}

        <Link
          href="/challenge/random"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.25rem",
            background: "#1a1a3e",
            border: "1px solid #f59e0b",
            borderRadius: ".75rem",
            textDecoration: "none",
            color: "#e2e8f0",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>ランダムチャレンジ</p>
            <p style={{ margin: ".25rem 0 0", fontSize: ".8125rem", color: "#94a3b8" }}>
              全クエストからランダム10問
            </p>
          </div>
          <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "1.25rem" }}>🎲</span>
        </Link>

        <Link
          href="/retry"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.25rem",
            background: "#1a1a3e",
            border: "1px solid #ef4444",
            borderRadius: ".75rem",
            textDecoration: "none",
            color: "#e2e8f0",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>再挑戦クエスト</p>
            <p style={{ margin: ".25rem 0 0", fontSize: ".8125rem", color: "#94a3b8" }}>
              間違えた問題をもう一度解く
            </p>
          </div>
          <span style={{ color: "#ef4444", fontWeight: 700, fontSize: "1.25rem" }}>⚔</span>
        </Link>
      </div>
    </div>
  )
}

export default Page

import type { FC } from "react"
import Link from "next/link"
import type { Quest } from "types/quest"
import { QUEST_COLORS } from "lib/quests"

type Props = {
  quest: Quest
  completionRate?: number
  accuracyRate?: number
  answeredQuestions?: number
  totalQuestions?: number
  lastPlayedAt?: string
}

export const QuestCard: FC<Props> = ({
  quest,
  completionRate = 0,
  accuracyRate = 0,
  answeredQuestions = 0,
  totalQuestions = 0,
  lastPlayedAt,
}) => {
  const color = QUEST_COLORS[quest.id]

  return (
    <div
      style={{
        background: "#1a1a3e",
        border: `1px solid #2a2a5a`,
        borderLeft: `4px solid ${color}`,
        borderRadius: ".75rem",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: ".75rem",
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: "1.125rem", color: "#e2e8f0" }}>{quest.title}</h2>
        <p style={{ margin: ".25rem 0 0", fontSize: ".8125rem", color: "#94a3b8" }}>
          {quest.description}
        </p>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div>
          <p style={{ margin: 0, fontSize: ".6875rem", color: "#64748b" }}>攻略率</p>
          <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color }}>
            {completionRate}%
          </p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: ".6875rem", color: "#64748b" }}>正答率</p>
          <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#e2e8f0" }}>
            {accuracyRate}%
          </p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: ".6875rem", color: "#64748b" }}>回答数</p>
          <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#e2e8f0" }}>
            {answeredQuestions}/{totalQuestions}
          </p>
        </div>
      </div>

      {lastPlayedAt && (
        <p style={{ margin: 0, fontSize: ".6875rem", color: "#64748b" }}>
          最終学習: {new Date(lastPlayedAt).toLocaleString("ja-JP")}
        </p>
      )}

      <div style={{ display: "flex", gap: ".75rem" }}>
        <Link
          href={`/quests/${quest.id}`}
          style={{
            padding: ".5rem 1rem",
            background: "transparent",
            border: `1px solid ${color}`,
            borderRadius: ".5rem",
            color,
            fontSize: ".875rem",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          詳細
        </Link>
        <Link
          href={`/challenge/${quest.id}`}
          style={{
            padding: ".5rem 1.25rem",
            background: color,
            border: "none",
            borderRadius: ".5rem",
            color: "#fff",
            fontSize: ".875rem",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          チャレンジ開始
        </Link>
      </div>
    </div>
  )
}

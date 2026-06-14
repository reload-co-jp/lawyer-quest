import type { FC } from "react"
import Link from "next/link"
import type { Quest } from "types/quest"

const SUBJECT_COLOR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
}

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
  const color = SUBJECT_COLOR[quest.id] ?? "var(--accent)"

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "1.125rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".25rem" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: color, flexShrink: 0 }} />
            <h2 style={{ fontSize: ".9375rem", fontWeight: 600, color: "var(--text-1)" }}>{quest.title}</h2>
          </div>
          <p style={{ fontSize: ".8125rem", color: "var(--text-2)", paddingLeft: "1.1875rem" }}>
            {quest.description}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: ".75rem",
          padding: ".875rem",
          background: "var(--surface-2)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        {[
          { label: "攻略率", value: `${completionRate}%`, highlight: true },
          { label: "正答率", value: `${accuracyRate}%`, highlight: false },
          { label: "回答数", value: `${answeredQuestions}/${totalQuestions}`, highlight: false },
        ].map(({ label, value, highlight }) => (
          <div key={label}>
            <p style={{ fontSize: ".6875rem", color: "var(--text-3)", marginBottom: ".25rem", letterSpacing: ".02em" }}>{label}</p>
            <p style={{ fontSize: ".9375rem", fontWeight: 700, color: highlight ? color : "var(--text-1)" }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {lastPlayedAt && (
        <p style={{ fontSize: ".75rem", color: "var(--text-3)" }}>
          最終学習: {new Date(lastPlayedAt).toLocaleString("ja-JP")}
        </p>
      )}

      <div style={{ display: "flex", gap: ".5rem" }}>
        <Link
          href={`/quests/${quest.id}`}
          style={{
            padding: ".4375rem .875rem",
            background: "transparent",
            border: "1px solid var(--border-2)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-2)",
            fontSize: ".8125rem",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          詳細
        </Link>
        <Link
          href={`/challenge/${quest.id}`}
          style={{
            padding: ".4375rem .875rem",
            background: "var(--accent-btn)",
            border: "none",
            borderRadius: "var(--radius-sm)",
            color: "#fff",
            fontSize: ".8125rem",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          チャレンジ開始 →
        </Link>
      </div>
    </div>
  )
}

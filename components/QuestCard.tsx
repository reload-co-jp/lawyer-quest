import type { FC } from "react"
import Link from "next/link"
import type { Quest } from "types/quest"
import type { QuestLearning } from "lib/stats"

const SUBJECT_COLOR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
  past_exam: "var(--past)",
}

const STATUS = {
  not_started: { label: "未着手", icon: "○", className: "badge" },
  in_progress: { label: "進行中", icon: "◐", className: "badge badge-warning" },
  completed: { label: "完了", icon: "✓", className: "badge badge-success" },
} as const

type Props = {
  quest: Quest
  total: number
  /** undefined until client-side progress is loaded */
  learning?: QuestLearning
}

export const QuestCard: FC<Props> = ({ quest, total, learning }) => {
  const color = SUBJECT_COLOR[quest.id] ?? "var(--accent)"
  const status = learning ? STATUS[learning.status] : null

  return (
    <article
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: ".875rem",
        borderTop: `3px solid ${color}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: ".75rem",
          alignItems: "flex-start",
        }}
      >
        <h3 style={{ fontSize: "1.0625rem", fontWeight: 700 }}>
          <Link href={`/quests/${quest.id}`} style={{ textDecoration: "none" }}>
            {quest.title}
          </Link>
        </h3>
        {status && (
          <span className={status.className}>
            <span aria-hidden>{status.icon}</span>
            {status.label}
          </span>
        )}
      </div>
      <p style={{ fontSize: ".875rem", color: "var(--text-2)", flex: 1 }}>
        {quest.description}
      </p>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: ".8125rem",
            color: "var(--text-2)",
            marginBottom: ".375rem",
          }}
        >
          <span>攻略率 {learning ? `${learning.completionRate}%` : "—"}</span>
          <span>
            {learning?.attempted ?? 0} / {total}問
            {learning && learning.answers > 0 && (
              <> · 正答率 {learning.accuracyRate}%</>
            )}
          </span>
        </div>
        <div className="bar" aria-hidden>
          <span
            style={{
              width: `${learning?.completionRate ?? 0}%`,
              background: color,
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: ".5rem" }}>
        <Link
          href={`/challenge/${quest.id}`}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          ▶ 挑戦する
        </Link>
        <Link href={`/quests/${quest.id}`} className="btn btn-secondary">
          詳細
        </Link>
      </div>
    </article>
  )
}

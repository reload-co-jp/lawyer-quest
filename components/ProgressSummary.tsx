import type { FC } from "react"
import type { UserProgress } from "types/progress"
import { getAllQuests } from "lib/quests"
import { calcAccuracyRate, calcCompletionRate } from "lib/stats"

const SUBJECT_COLOR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
  past_exam: "var(--past)",
}

export const ProgressSummary: FC<{ progress: UserProgress }> = ({ progress }) => {
  const quests = getAllQuests()
  const overallAccuracy = calcAccuracyRate(progress.totalCorrect, progress.totalChallenges)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "1.125rem 1.25rem",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {[
          { label: "総チャレンジ数", value: progress.totalChallenges, color: "var(--text-1)" },
          { label: "総正答数", value: progress.totalCorrect, color: "var(--success)" },
          { label: "全体正答率", value: `${overallAccuracy}%`, color: "var(--accent)" },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <p style={{ margin: "0 0 .25rem", fontSize: ".6875rem", color: "var(--text-3)", letterSpacing: ".02em" }}>
              {label}
            </p>
            <p style={{ margin: 0, fontSize: "1.375rem", fontWeight: 700, color, letterSpacing: "-.02em" }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {quests.map((quest) => {
        const qp = progress.questProgress[quest.id]
        if (!qp) return null
        const completion = calcCompletionRate(qp.answeredQuestions, qp.totalQuestions)
        const accuracy = calcAccuracyRate(qp.correctAnswers, qp.answeredQuestions)
        const color = SUBJECT_COLOR[quest.id] ?? "var(--accent)"

        return (
          <div
            key={quest.id}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "1rem 1.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".875rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0 }} />
              <p style={{ fontWeight: 600, color: "var(--text-1)", fontSize: ".9375rem" }}>
                {quest.title}
              </p>
            </div>

            <div style={{ marginBottom: ".625rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".3rem" }}>
                <span style={{ fontSize: ".75rem", color: "var(--text-3)" }}>攻略率</span>
                <span style={{ fontSize: ".75rem", fontWeight: 700, color }}>{completion}%</span>
              </div>
              <div style={{ height: "3px", background: "var(--surface-3)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ width: `${completion}%`, height: "100%", background: color, borderRadius: "2px" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div>
                <p style={{ margin: 0, fontSize: ".6875rem", color: "var(--text-3)" }}>正答率</p>
                <p style={{ margin: ".125rem 0 0", fontWeight: 600, color: "var(--text-1)", fontSize: ".875rem" }}>
                  {accuracy}%
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: ".6875rem", color: "var(--text-3)" }}>回答数</p>
                <p style={{ margin: ".125rem 0 0", fontWeight: 600, color: "var(--text-1)", fontSize: ".875rem" }}>
                  {qp.answeredQuestions} / {qp.totalQuestions}
                </p>
              </div>
              {qp.lastPlayedAt && (
                <div>
                  <p style={{ margin: 0, fontSize: ".6875rem", color: "var(--text-3)" }}>最終学習</p>
                  <p style={{ margin: ".125rem 0 0", fontWeight: 500, color: "var(--text-2)", fontSize: ".8125rem" }}>
                    {new Date(qp.lastPlayedAt).toLocaleDateString("ja-JP")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {progress.wrongQuestionIds.length > 0 && (
        <div
          style={{
            padding: ".875rem 1rem",
            background: "var(--surface)",
            border: "1px solid rgba(248,113,113,0.2)",
            borderRadius: "var(--radius)",
            display: "flex",
            alignItems: "center",
            gap: ".625rem",
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--error)", flexShrink: 0 }} />
          <p style={{ fontSize: ".875rem", color: "var(--text-2)", margin: 0 }}>
            再挑戦対象:{" "}
            <span style={{ fontWeight: 700, color: "var(--error)" }}>
              {progress.wrongQuestionIds.length}問
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

import type { FC } from "react"
import type { UserProgress } from "types/progress"
import { QUEST_COLORS, getAllQuests } from "lib/quests"
import { calcAccuracyRate, calcCompletionRate } from "lib/stats"

export const ProgressSummary: FC<{ progress: UserProgress }> = ({ progress }) => {
  const quests = getAllQuests()
  const overallAccuracy = calcAccuracyRate(progress.totalCorrect, progress.totalChallenges)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div
        style={{
          background: "#1a1a3e",
          border: "1px solid #2a2a5a",
          borderRadius: ".75rem",
          padding: "1.25rem",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: ".6875rem", color: "#64748b" }}>総チャレンジ数</p>
          <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0" }}>
            {progress.totalChallenges}
          </p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: ".6875rem", color: "#64748b" }}>総正答数</p>
          <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#22c55e" }}>
            {progress.totalCorrect}
          </p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: ".6875rem", color: "#64748b" }}>全体正答率</p>
          <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#818cf8" }}>
            {overallAccuracy}%
          </p>
        </div>
      </div>

      {quests.map((quest) => {
        const qp = progress.questProgress[quest.id]
        if (!qp) return null
        const completion = calcCompletionRate(qp.answeredQuestions, qp.totalQuestions)
        const accuracy = calcAccuracyRate(qp.correctAnswers, qp.answeredQuestions)
        const color = QUEST_COLORS[quest.id]

        return (
          <div
            key={quest.id}
            style={{
              background: "#1a1a3e",
              border: "1px solid #2a2a5a",
              borderLeft: `4px solid ${color}`,
              borderRadius: ".75rem",
              padding: "1rem 1.25rem",
            }}
          >
            <p style={{ margin: "0 0 .75rem", fontWeight: 600, color: "#e2e8f0" }}>
              {quest.title}
            </p>
            <div style={{ display: "flex", gap: "1.5rem", fontSize: ".875rem" }}>
              <div>
                <p style={{ margin: 0, fontSize: ".6875rem", color: "#64748b" }}>攻略率</p>
                <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginTop: ".25rem" }}>
                  <div
                    style={{
                      width: "100px",
                      height: "6px",
                      background: "#2a2a5a",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${completion}%`,
                        height: "100%",
                        background: color,
                        borderRadius: "3px",
                      }}
                    />
                  </div>
                  <span style={{ color, fontWeight: 700 }}>{completion}%</span>
                </div>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: ".6875rem", color: "#64748b" }}>正答率</p>
                <p style={{ margin: ".25rem 0 0", fontWeight: 700, color: "#e2e8f0" }}>{accuracy}%</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: ".6875rem", color: "#64748b" }}>回答</p>
                <p style={{ margin: ".25rem 0 0", fontWeight: 700, color: "#e2e8f0" }}>
                  {qp.answeredQuestions}/{qp.totalQuestions}問
                </p>
              </div>
            </div>
            {qp.lastPlayedAt && (
              <p style={{ margin: ".5rem 0 0", fontSize: ".6875rem", color: "#64748b" }}>
                最終学習: {new Date(qp.lastPlayedAt).toLocaleString("ja-JP")}
              </p>
            )}
          </div>
        )
      })}

      {progress.wrongQuestionIds.length > 0 && (
        <div
          style={{
            background: "#1a1a3e",
            border: "1px solid #ef4444",
            borderRadius: ".75rem",
            padding: "1rem 1.25rem",
          }}
        >
          <p style={{ margin: 0, fontSize: ".875rem", color: "#fca5a5" }}>
            ⚔ 再挑戦対象: <strong>{progress.wrongQuestionIds.length}問</strong>
          </p>
        </div>
      )}
    </div>
  )
}

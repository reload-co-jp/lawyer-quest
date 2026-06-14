"use client"

import { FC, useEffect, useState } from "react"
import Link from "next/link"
import type { WrongQuestion } from "types/progress"
import { getWrongQuestions, removeWrongQuestion } from "lib/storage"
import { getQuestionById } from "lib/questions"
import { getAreaById, getQuestById } from "lib/quests"

const SUBJECT_COLOR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
}

export const WrongClient: FC = () => {
  const [wrongs, setWrongs] = useState<WrongQuestion[]>([])

  useEffect(() => {
    setWrongs(getWrongQuestions().sort((a, b) => b.wrongCount - a.wrongCount))
  }, [])

  const handleMastered = (questionId: string) => {
    removeWrongQuestion(questionId)
    setWrongs((prev) => prev.filter((w) => w.questionId !== questionId))
  }

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-.02em" }}>
          間違えた問題
        </h1>
        {wrongs.length > 0 && (
          <Link
            href="/retry"
            style={{
              padding: ".4375rem .875rem",
              background: "var(--accent-btn)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: ".8125rem",
            }}
          >
            再挑戦クエスト →
          </Link>
        )}
      </div>

      {wrongs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎉</p>
          <p style={{ color: "var(--text-2)", fontSize: ".9375rem" }}>間違えた問題はありません</p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
          {wrongs.map((wrong, i) => {
            const question = getQuestionById(wrong.questionId)
            const area = getAreaById(wrong.areaId)
            const quest = getQuestById(wrong.questId)
            if (!question || !quest) return null
            const color = SUBJECT_COLOR[wrong.questId] ?? "var(--accent)"

            return (
              <div
                key={wrong.questionId}
                style={{
                  padding: "1rem",
                  background: "var(--surface)",
                  borderBottom: i < wrongs.length - 1 ? "1px solid var(--border)" : "none",
                  borderLeft: `2px solid ${color}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: ".5rem" }}>
                  <div style={{ display: "flex", gap: ".375rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: ".6875rem", padding: ".15rem .5rem", background: "var(--surface-2)", color, border: "1px solid var(--border)", fontWeight: 600 }}>
                      {quest.title}
                    </span>
                    {area && (
                      <span style={{ fontSize: ".6875rem", padding: ".15rem .5rem", background: "var(--surface-2)", color: "var(--text-2)", border: "1px solid var(--border)" }}>
                        {area.title}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: ".75rem", color: "var(--error)", fontWeight: 700, flexShrink: 0 }}>
                    ✗ {wrong.wrongCount}
                  </span>
                </div>

                <p style={{ margin: "0 0 .75rem", fontSize: ".875rem", color: "var(--text-1)", lineHeight: 1.65 }}>
                  {question.question}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ margin: 0, fontSize: ".6875rem", color: "var(--text-3)" }}>
                    {new Date(wrong.lastWrongAt).toLocaleDateString("ja-JP")}
                  </p>
                  <div style={{ display: "flex", gap: ".375rem" }}>
                    <button
                      onClick={() => handleMastered(wrong.questionId)}
                      style={{
                        padding: ".3rem .625rem",
                        background: "transparent",
                        border: "1px solid rgba(74,222,128,0.3)",
                        color: "var(--success)",
                        fontSize: ".75rem",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      攻略済み
                    </button>
                    <Link
                      href={`/questions/${wrong.questionId}`}
                      style={{
                        padding: ".3rem .625rem",
                        background: "transparent",
                        border: "1px solid var(--border-2)",
                        color: "var(--text-2)",
                        fontSize: ".75rem",
                        textDecoration: "none",
                      }}
                    >
                      詳細
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

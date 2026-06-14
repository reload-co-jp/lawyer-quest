"use client"

import { FC, useEffect, useState } from "react"
import Link from "next/link"
import type { WrongQuestion } from "types/progress"
import { getWrongQuestions, removeWrongQuestion } from "lib/storage"
import { getQuestionById } from "lib/questions"
import { getAreaById, getQuestById, QUEST_COLORS } from "lib/quests"

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
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0", margin: 0 }}>
          間違えた問題一覧
        </h1>
        {wrongs.length > 0 && (
          <Link
            href="/retry"
            style={{
              padding: ".625rem 1.25rem",
              background: "#ef4444",
              borderRadius: ".625rem",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: ".875rem",
            }}
          >
            ⚔ 再挑戦クエスト
          </Link>
        )}
      </div>

      {wrongs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</p>
          <p style={{ color: "#94a3b8" }}>間違えた問題はありません</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
          {wrongs.map((wrong) => {
            const question = getQuestionById(wrong.questionId)
            const area = getAreaById(wrong.areaId)
            const quest = getQuestById(wrong.questId)
            if (!question || !quest) return null
            const color = QUEST_COLORS[wrong.questId]

            return (
              <div
                key={wrong.questionId}
                style={{
                  background: "#1a1a3e",
                  border: "1px solid #2a2a5a",
                  borderLeft: `4px solid ${color}`,
                  borderRadius: ".75rem",
                  padding: "1rem 1.25rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".5rem" }}>
                  <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: ".75rem", padding: ".125rem .5rem", background: "#0f0f23", borderRadius: "999px", color }}>
                      {quest.title}
                    </span>
                    {area && (
                      <span style={{ fontSize: ".75rem", padding: ".125rem .5rem", background: "#0f0f23", borderRadius: "999px", color: "#94a3b8" }}>
                        {area.title}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: ".75rem", color: "#ef4444", fontWeight: 600 }}>
                    ✗ {wrong.wrongCount}回
                  </span>
                </div>

                <p style={{ margin: "0 0 .75rem", fontSize: ".9375rem", color: "#e2e8f0", lineHeight: 1.6 }}>
                  {question.question}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ margin: 0, fontSize: ".6875rem", color: "#64748b" }}>
                    最終: {new Date(wrong.lastWrongAt).toLocaleString("ja-JP")}
                  </p>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <button
                      onClick={() => handleMastered(wrong.questionId)}
                      style={{
                        padding: ".375rem .75rem",
                        background: "transparent",
                        border: "1px solid #22c55e",
                        borderRadius: ".5rem",
                        color: "#22c55e",
                        fontSize: ".75rem",
                        cursor: "pointer",
                      }}
                    >
                      攻略済みにする
                    </button>
                    <Link
                      href={`/questions/${wrong.questionId}`}
                      style={{
                        padding: ".375rem .75rem",
                        background: "transparent",
                        border: "1px solid #4f46e5",
                        borderRadius: ".5rem",
                        color: "#818cf8",
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

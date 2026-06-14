"use client"

import { FC, useEffect, useState } from "react"
import Link from "next/link"
import type { Question } from "types/question"
import { getWrongQuestions } from "lib/storage"
import { getQuestionsByIds } from "lib/questions"
import { shuffle } from "lib/shuffle"
import { ChallengeClient } from "components/ChallengeClient"

export const RetryClient: FC = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null)

  useEffect(() => {
    const wrongs = getWrongQuestions()
    const ids = wrongs.map((w) => w.questionId)
    const qs = getQuestionsByIds(ids)
    setQuestions(shuffle(qs))
  }, [])

  if (questions === null) return null

  if (questions.length === 0) {
    return (
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", padding: "4rem 1rem" }}>
        <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</p>
        <h2 style={{ color: "#e2e8f0", marginBottom: ".5rem" }}>再挑戦リストは空です</h2>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
          間違えた問題がないか、すべて攻略済みです。
        </p>
        <Link
          href="/quests"
          style={{
            padding: ".875rem 2rem",
            background: "#4f46e5",
            borderRadius: ".75rem",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          クエストに挑戦する
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          padding: ".75rem",
          background: "#1a1a3e",
          borderBottom: "2px solid #ef4444",
          marginBottom: "1rem",
          borderRadius: ".5rem",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700, color: "#ef4444" }}>
          ⚔ 再挑戦クエスト（{questions.length}問）
        </p>
      </div>
      <ChallengeClient questions={questions} questId="random" isRetry={true} />
    </div>
  )
}

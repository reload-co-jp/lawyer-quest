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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage読込はクライアント専用、初回マウント後のみ実行
    setQuestions(shuffle(getQuestionsByIds(ids)))
  }, [])

  if (questions === null) return null

  if (questions.length === 0) {
    return (
      <div style={{ maxWidth: "480px", margin: "4rem auto", textAlign: "center", padding: "0 1rem" }}>
        <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎉</p>
        <h2 style={{ color: "var(--text-1)", fontWeight: 700, marginBottom: ".5rem", fontSize: "1.125rem" }}>
          再挑戦リストは空です
        </h2>
        <p style={{ color: "var(--text-2)", marginBottom: "2rem", fontSize: ".875rem" }}>
          間違えた問題がないか、すべて攻略済みです。
        </p>
        <Link
          href="/quests"
          style={{
            padding: ".5rem 1.125rem",
            background: "var(--accent-btn)",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: ".875rem",
          }}
        >
          クエストに挑戦する →
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div
        style={{
          padding: ".625rem 1rem",
          background: "var(--surface)",
          borderBottom: "1px solid rgba(248,113,113,0.2)",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: ".625rem",
        }}
      >
        <div style={{ width: "5px", height: "5px", background: "var(--error)" }} />
        <p style={{ margin: 0, fontWeight: 600, color: "var(--error)", fontSize: ".875rem" }}>
          再挑戦クエスト — {questions.length}問
        </p>
      </div>
      <ChallengeClient questions={questions} questId="random" isRetry={true} />
    </div>
  )
}

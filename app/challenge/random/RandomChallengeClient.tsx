"use client"

import { FC, useEffect, useState } from "react"
import type { Question } from "types/question"
import { getAllQuestions } from "lib/questions"
import { shuffle } from "lib/shuffle"
import { ChallengeClient } from "components/ChallengeClient"

export const RandomChallengeClient: FC = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- クライアント専用ランダム生成、初回マウント後のみ実行
    setQuestions(shuffle(getAllQuestions()).slice(0, 10))
  }, [])

  if (!questions) return null

  return (
    <div>
      <div
        style={{
          padding: ".625rem 1rem",
          background: "var(--surface)",
          borderBottom: "1px solid rgba(251,191,36,0.2)",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: ".625rem",
        }}
      >
        <div style={{ width: "5px", height: "5px", background: "var(--warning)" }} />
        <p style={{ margin: 0, fontWeight: 600, color: "var(--warning)", fontSize: ".875rem" }}>
          ランダムチャレンジ — 10問
        </p>
      </div>
      <ChallengeClient questions={questions} questId="random" />
    </div>
  )
}

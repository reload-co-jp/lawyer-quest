"use client"

import { FC, useEffect, useState } from "react"
import type { Question } from "types/question"
import { getAllQuestions } from "lib/questions"
import { shuffle } from "lib/shuffle"
import { ChallengeClient } from "components/ChallengeClient"

export const RandomChallengeClient: FC = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null)

  useEffect(() => {
    const all = getAllQuestions()
    setQuestions(shuffle(all).slice(0, 10))
  }, [])

  if (!questions) return null

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          padding: ".75rem",
          background: "#1a1a3e",
          borderBottom: "2px solid #f59e0b",
          marginBottom: "1rem",
          borderRadius: ".5rem",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700, color: "#f59e0b" }}>🎲 ランダムチャレンジ（10問）</p>
      </div>
      <ChallengeClient questions={questions} questId="random" />
    </div>
  )
}

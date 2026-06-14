"use client"

import { FC, useState } from "react"
import Link from "next/link"
import type { Question } from "types/question"
import type { QuestId } from "types/quest"
import { ChoiceList } from "components/ChoiceList"
import { ExplanationBox } from "components/ExplanationBox"
import { recordAnswer } from "lib/storage"
import { removeWrongQuestion } from "lib/storage"
import { getAreaById } from "lib/quests"

type Props = {
  questions: Question[]
  questId: QuestId | "random"
  isRetry?: boolean
}

export const ChallengeClient: FC<Props> = ({ questions, questId, isRetry = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState<{ questionId: string; isCorrect: boolean }[]>([])
  const [finished, setFinished] = useState(false)
  const [mastered, setMastered] = useState<string[]>([])

  const current = questions[currentIndex]
  const area = current ? getAreaById(current.areaId) : null
  const progress = `${currentIndex + 1} / ${questions.length}`

  if (!current || finished) {
    const correct = results.filter((r) => r.isCorrect).length
    const total = results.length
    return (
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "2rem 1rem", textAlign: "center" }}>
        <div
          style={{
            background: "#1a1a3e",
            border: "1px solid #2a2a5a",
            borderRadius: "1rem",
            padding: "2rem",
          }}
        >
          <p style={{ fontSize: "2rem", marginBottom: ".5rem" }}>🏆</p>
          <h2 style={{ color: "#e2e8f0", margin: "0 0 1rem" }}>クエスト完了！</h2>
          <p style={{ fontSize: "2.5rem", fontWeight: 700, color: "#818cf8", margin: "0 0 .5rem" }}>
            {correct} / {total}
          </p>
          <p style={{ color: "#94a3b8", margin: "0 0 2rem" }}>
            正答率: {total > 0 ? Math.round((correct / total) * 100) : 0}%
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/quests"
              style={{
                padding: ".75rem 1.5rem",
                background: "transparent",
                border: "1px solid #4f46e5",
                borderRadius: ".625rem",
                color: "#818cf8",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              クエスト一覧へ
            </Link>
            <Link
              href="/progress"
              style={{
                padding: ".75rem 1.5rem",
                background: "#4f46e5",
                borderRadius: ".625rem",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              攻略率を確認
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSelect = (choiceId: string) => {
    if (revealed) return
    setSelectedAnswer(choiceId)
  }

  const handleReveal = () => {
    if (!selectedAnswer || revealed) return
    const isCorrect = selectedAnswer === current.answer
    setRevealed(true)

    recordAnswer({
      questionId: current.id,
      questId: questId === "random" ? current.questId : questId,
      areaId: current.areaId,
      selectedAnswer,
      isCorrect,
      answeredAt: new Date().toISOString(),
    })

    setResults((prev) => [...prev, { questionId: current.id, isCorrect }])
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(null)
      setRevealed(false)
    }
  }

  const handleMastered = () => {
    removeWrongQuestion(current.id)
    setMastered((prev) => [...prev, current.id])
    handleNext()
  }

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto", padding: "1rem" }}>
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link
          href={questId === "random" ? "/quests" : `/quests/${questId}`}
          style={{ fontSize: ".875rem", color: "#94a3b8", textDecoration: "none" }}
        >
          ← 戻る
        </Link>
        <span style={{ fontSize: ".875rem", color: "#94a3b8" }}>{progress}</span>
      </div>

      <div
        style={{
          background: "#1a1a3e",
          border: "1px solid #2a2a5a",
          borderRadius: ".75rem",
          padding: "1.25rem",
          marginBottom: "1rem",
        }}
      >
        <div style={{ marginBottom: ".75rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          {area && (
            <span
              style={{
                fontSize: ".75rem",
                padding: ".25rem .625rem",
                background: "#0f0f23",
                borderRadius: "999px",
                color: "#94a3b8",
              }}
            >
              {area.title}
            </span>
          )}
          <span
            style={{
              fontSize: ".75rem",
              padding: ".25rem .625rem",
              background: "#0f0f23",
              borderRadius: "999px",
              color: "#94a3b8",
            }}
          >
            難易度: {"★".repeat(current.difficulty)}{"☆".repeat(5 - current.difficulty)}
          </span>
          <span
            style={{
              fontSize: ".75rem",
              padding: ".25rem .625rem",
              background: "#0f0f23",
              borderRadius: "999px",
              color: "#94a3b8",
            }}
          >
            {current.format === "true_false" ? "○×問題" : "4択問題"}
          </span>
        </div>

        <p style={{ fontSize: "1rem", color: "#e2e8f0", lineHeight: 1.7, margin: 0 }}>
          {current.question}
        </p>
      </div>

      <ChoiceList
        choices={current.choices}
        selectedAnswer={selectedAnswer}
        correctAnswer={current.answer}
        onSelect={handleSelect}
        revealed={revealed}
      />

      {!revealed && (
        <button
          onClick={handleReveal}
          disabled={!selectedAnswer}
          style={{
            marginTop: "1rem",
            width: "100%",
            padding: ".875rem",
            background: selectedAnswer ? "#4f46e5" : "#2a2a5a",
            border: "none",
            borderRadius: ".625rem",
            color: selectedAnswer ? "#fff" : "#64748b",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: selectedAnswer ? "pointer" : "not-allowed",
          }}
        >
          解答する
        </button>
      )}

      {revealed && (
        <ExplanationBox
          question={current}
          selectedAnswer={selectedAnswer!}
          isCorrect={selectedAnswer === current.answer}
        />
      )}

      {revealed && (
        <div style={{ marginTop: "1rem", display: "flex", gap: ".75rem" }}>
          {isRetry && !mastered.includes(current.id) && (
            <button
              onClick={handleMastered}
              style={{
                flex: 1,
                padding: ".875rem",
                background: "transparent",
                border: "1px solid #22c55e",
                borderRadius: ".625rem",
                color: "#22c55e",
                fontSize: ".875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ✓ 攻略済みにする
            </button>
          )}
          <button
            onClick={handleNext}
            style={{
              flex: 2,
              padding: ".875rem",
              background: "#4f46e5",
              border: "none",
              borderRadius: ".625rem",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {currentIndex + 1 >= questions.length ? "結果を見る" : "次の問題 →"}
          </button>
        </div>
      )}
    </div>
  )
}

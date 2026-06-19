"use client"

import { FC, useState } from "react"
import Link from "next/link"
import type { Question } from "types/question"
import type { QuestId } from "types/quest"
import { ChoiceList } from "components/ChoiceList"
import { FillBlankAnswer } from "components/FillBlankAnswer"
import { ExplanationBox } from "components/ExplanationBox"
import { recordAnswer, removeWrongQuestion } from "lib/storage"
import { getAreaById } from "lib/quests"

type Props = {
  questions: Question[]
  questId: QuestId | "random"
  isRetry?: boolean
}

export const ChallengeClient: FC<Props> = ({
  questions,
  questId,
  isRetry = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({})
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState<
    { questionId: string; isCorrect: boolean }[]
  >([])
  const [finished, setFinished] = useState(false)
  const [mastered, setMastered] = useState<string[]>([])

  const current = questions[currentIndex]
  const area = current ? getAreaById(current.areaId) : null
  const isFillBlank = current?.format === "fill_blank"
  const isAnswerComplete = isFillBlank
    ? (current?.blanks?.every((b) => blankAnswers[b.id]) ?? false)
    : !!selectedAnswer
  const isCorrect = isFillBlank
    ? (current?.blanks?.every((b) => blankAnswers[b.id] === b.answer) ?? false)
    : selectedAnswer === current?.answer

  if (!current || finished) {
    const correct = results.filter((r) => r.isCorrect).length
    const total = results.length
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0
    return (
      <div
        style={{ maxWidth: "480px", margin: "3rem auto", padding: "0 1rem" }}
      >
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>🏆</p>
          <h2
            style={{
              color: "var(--text-1)",
              fontWeight: 700,
              marginBottom: ".5rem",
              fontSize: "1.125rem",
            }}
          >
            クエスト完了
          </h2>
          <p
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: "var(--accent)",
              letterSpacing: "-.03em",
              margin: ".5rem 0 .25rem",
            }}
          >
            {pct}
            <span style={{ fontSize: "1.25rem" }}>%</span>
          </p>
          <p
            style={{
              fontSize: ".875rem",
              color: "var(--text-2)",
              marginBottom: "2rem",
            }}
          >
            {correct} / {total} 問正解
          </p>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/quests"
              style={{
                padding: ".5rem 1rem",
                background: "transparent",
                border: "1px solid var(--border-2)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-2)",
                textDecoration: "none",
                fontSize: ".875rem",
                fontWeight: 500,
              }}
            >
              クエスト一覧
            </Link>
            <Link
              href="/progress"
              style={{
                padding: ".5rem 1rem",
                background: "var(--accent-btn)",
                borderRadius: "var(--radius-sm)",
                color: "#fff",
                textDecoration: "none",
                fontSize: ".875rem",
                fontWeight: 600,
              }}
            >
              攻略率を確認 →
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

  const handleBlankSelect = (blankId: string, choiceId: string) => {
    if (revealed) return
    setBlankAnswers((prev) => ({ ...prev, [blankId]: choiceId }))
  }

  const handleReveal = () => {
    if (!isAnswerComplete || revealed) return
    setRevealed(true)
    recordAnswer({
      questionId: current.id,
      questId: questId === "random" ? current.questId : questId,
      areaId: current.areaId,
      selectedAnswer: isFillBlank
        ? JSON.stringify(blankAnswers)
        : (selectedAnswer as string),
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
      setBlankAnswers({})
      setRevealed(false)
    }
  }

  const handleMastered = () => {
    removeWrongQuestion(current.id)
    setMastered((prev) => [...prev, current.id])
    handleNext()
  }

  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1rem" }}>
      <div
        style={{
          marginBottom: "1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href={questId === "random" ? "/quests" : `/quests/${questId}`}
          style={{
            fontSize: ".8125rem",
            color: "var(--text-2)",
            textDecoration: "none",
          }}
        >
          ← 戻る
        </Link>
        <span
          style={{
            fontSize: ".8125rem",
            color: "var(--text-3)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div
        style={{
          height: "2px",
          background: "var(--border)",
          borderRadius: "1px",
          marginBottom: "1.5rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--accent)",
            borderRadius: "1px",
          }}
        />
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "1.25rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: ".375rem",
            flexWrap: "wrap",
            marginBottom: ".875rem",
          }}
        >
          {area && (
            <span
              style={{
                fontSize: ".6875rem",
                padding: ".2rem .5rem",
                background: "var(--surface-2)",
                borderRadius: "99px",
                color: "var(--text-2)",
                border: "1px solid var(--border)",
              }}
            >
              {area.title}
            </span>
          )}
          <span
            style={{
              fontSize: ".6875rem",
              padding: ".2rem .5rem",
              background: "var(--surface-2)",
              borderRadius: "99px",
              color: "var(--text-2)",
              border: "1px solid var(--border)",
            }}
          >
            {"★".repeat(current.difficulty)}
            {"☆".repeat(5 - current.difficulty)}
          </span>
          <span
            style={{
              fontSize: ".6875rem",
              padding: ".2rem .5rem",
              background: "var(--surface-2)",
              borderRadius: "99px",
              color: "var(--text-2)",
              border: "1px solid var(--border)",
            }}
          >
            {current.format === "true_false"
              ? "○×"
              : current.format === "fill_blank"
                ? "穴埋め"
                : "4択"}
          </span>
          {current.examYear && (
            <span
              style={{
                fontSize: ".6875rem",
                padding: ".2rem .5rem",
                background: "var(--surface-2)",
                borderRadius: "99px",
                color: "var(--text-2)",
                border: "1px solid var(--border)",
              }}
            >
              {current.examYear}年度
            </span>
          )}
        </div>

        <p
          style={{
            fontSize: ".9375rem",
            color: "var(--text-1)",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {current.question}
        </p>
      </div>

      {isFillBlank ? (
        <FillBlankAnswer
          blanks={current.blanks ?? []}
          choices={current.choices}
          selectedAnswers={blankAnswers}
          onSelect={handleBlankSelect}
          revealed={revealed}
        />
      ) : (
        <ChoiceList
          choices={current.choices}
          selectedAnswer={selectedAnswer}
          correctAnswer={current.answer}
          onSelect={handleSelect}
          revealed={revealed}
        />
      )}

      {!revealed && (
        <button
          onClick={handleReveal}
          disabled={!isAnswerComplete}
          style={{
            marginTop: ".875rem",
            width: "100%",
            padding: ".75rem",
            background: isAnswerComplete
              ? "var(--accent-btn)"
              : "var(--surface-2)",
            border:
              "1px solid " +
              (isAnswerComplete ? "var(--accent-btn)" : "var(--border)"),
            borderRadius: "var(--radius-sm)",
            color: isAnswerComplete ? "#fff" : "var(--text-3)",
            fontSize: ".9375rem",
            fontWeight: 600,
            cursor: isAnswerComplete ? "pointer" : "not-allowed",
            letterSpacing: "-.01em",
          }}
        >
          解答する
        </button>
      )}

      {revealed && <ExplanationBox question={current} isCorrect={isCorrect} />}

      {revealed && (
        <div style={{ marginTop: ".875rem", display: "flex", gap: ".5rem" }}>
          {isRetry && !mastered.includes(current.id) && (
            <button
              onClick={handleMastered}
              style={{
                flex: 1,
                padding: ".75rem",
                background: "transparent",
                border: "1px solid rgba(74,222,128,0.3)",
                borderRadius: "var(--radius-sm)",
                color: "var(--success)",
                fontSize: ".8125rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ✓ 攻略済み
            </button>
          )}
          <button
            onClick={handleNext}
            style={{
              flex: 2,
              padding: ".75rem",
              background: "var(--accent-btn)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              color: "#fff",
              fontSize: ".9375rem",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "-.01em",
            }}
          >
            {currentIndex + 1 >= questions.length ? "結果を見る" : "次の問題 →"}
          </button>
        </div>
      )}
    </div>
  )
}

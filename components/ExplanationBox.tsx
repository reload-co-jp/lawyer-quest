import type { FC } from "react"
import type { Question } from "types/question"
import { SourceList } from "components/SourceList"
import { LawLinkList } from "components/LawLinkList"

type Props = {
  question: Question
  selectedAnswer: string
  isCorrect: boolean
}

export const ExplanationBox: FC<Props> = ({ question, selectedAnswer, isCorrect }) => {
  const correctChoice = question.choices.find((c) => c.id === question.answer)
  const selectedChoice = question.choices.find((c) => c.id === selectedAnswer)

  return (
    <div
      style={{
        marginTop: "1.5rem",
        padding: "1.25rem",
        background: "#1a1a3e",
        borderRadius: ".75rem",
        border: `2px solid ${isCorrect ? "#22c55e" : "#ef4444"}`,
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: isCorrect ? "#22c55e" : "#ef4444",
          marginBottom: ".75rem",
        }}
      >
        {isCorrect ? "✓ 正解！" : "✗ 不正解"}
      </div>

      {!isCorrect && (
        <div style={{ marginBottom: ".75rem", fontSize: ".875rem" }}>
          <span style={{ color: "#94a3b8" }}>あなたの回答: </span>
          <span style={{ color: "#ef4444" }}>{selectedChoice?.text}</span>
          <br />
          <span style={{ color: "#94a3b8" }}>正解: </span>
          <span style={{ color: "#22c55e" }}>{correctChoice?.text}</span>
        </div>
      )}

      <div style={{ fontSize: ".875rem", color: "#e2e8f0", lineHeight: 1.7, marginBottom: "1rem" }}>
        <p style={{ fontWeight: 600, color: "#a5b4fc", marginBottom: ".375rem" }}>解説</p>
        <p style={{ margin: 0 }}>{question.explanation}</p>
      </div>

      {question.point && (
        <div
          style={{
            padding: ".75rem",
            background: "#0f0f23",
            borderRadius: ".5rem",
            borderLeft: "3px solid #f59e0b",
            marginBottom: ".75rem",
          }}
        >
          <p style={{ fontSize: ".75rem", color: "#f59e0b", fontWeight: 600, margin: "0 0 .25rem" }}>
            ⚡ ポイント
          </p>
          <p style={{ fontSize: ".875rem", color: "#e2e8f0", margin: 0 }}>{question.point}</p>
        </div>
      )}

      {question.commonMistake && (
        <div
          style={{
            padding: ".75rem",
            background: "#0f0f23",
            borderRadius: ".5rem",
            borderLeft: "3px solid #ef4444",
            marginBottom: ".75rem",
          }}
        >
          <p style={{ fontSize: ".75rem", color: "#ef4444", fontWeight: 600, margin: "0 0 .25rem" }}>
            ⚠ ひっかけポイント
          </p>
          <p style={{ fontSize: ".875rem", color: "#e2e8f0", margin: 0 }}>{question.commonMistake}</p>
        </div>
      )}

      <SourceList sources={question.sources} />
      {question.lawLinks && question.lawLinks.length > 0 && (
        <LawLinkList lawLinks={question.lawLinks} />
      )}
    </div>
  )
}

import type { FC } from "react"
import type { Question } from "types/question"
import { SourceList } from "components/SourceList"
import { LawLinkList } from "components/LawLinkList"

type Props = {
  question: Question
  isCorrect: boolean
}

export const ExplanationBox: FC<Props> = ({ question, isCorrect }) => {
  const correctChoice = question.choices.find((c) => c.id === question.answer)
  const isFillBlank = question.format === "fill_blank"

  return (
    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: ".75rem",
      }}
    >
      <div
        style={{
          padding: "1rem",
          background: isCorrect ? "var(--success-soft)" : "var(--error-soft)",
          border: `1px solid ${isCorrect ? "var(--success-line)" : "var(--error-line)"}`,
          borderRadius: "var(--radius)",
          display: "flex",
          alignItems: "center",
          gap: ".625rem",
        }}
      >
        <span style={{ fontSize: "1.125rem" }}>{isCorrect ? "✓" : "✗"}</span>
        <div>
          <p
            style={{
              fontWeight: 700,
              color: isCorrect ? "var(--success)" : "var(--error)",
              fontSize: ".9375rem",
              margin: 0,
            }}
          >
            {isCorrect ? "正解" : "不正解"}
          </p>
          {!isCorrect && !isFillBlank && (
            <p
              style={{
                fontSize: ".8125rem",
                color: "var(--text-2)",
                margin: ".25rem 0 0",
              }}
            >
              正解: {correctChoice?.text}
            </p>
          )}
          {!isCorrect && isFillBlank && question.blanks && (
            <div style={{ margin: ".25rem 0 0" }}>
              {question.blanks.map((b) => {
                const choice = question.choices.find((c) => c.id === b.answer)
                return (
                  <p
                    key={b.id}
                    style={{
                      fontSize: ".8125rem",
                      color: "var(--text-2)",
                      margin: 0,
                    }}
                  >
                    ［{b.id}］: {choice?.text}
                  </p>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "1rem",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <p
          style={{
            fontSize: ".8125rem",
            fontWeight: 600,
            color: "var(--text-3)",
            marginBottom: ".5rem",
            letterSpacing: ".04em",
            textTransform: "uppercase",
          }}
        >
          解説
        </p>
        <p
          style={{
            fontSize: ".9375rem",
            color: "var(--text-1)",
            lineHeight: 1.85,
            margin: 0,
          }}
        >
          {question.explanation}
        </p>
      </div>

      {question.point && (
        <div
          style={{
            padding: ".875rem 1rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "3px solid var(--warning)",
            borderRadius: "var(--radius)",
          }}
        >
          <p
            style={{
              fontSize: ".8125rem",
              fontWeight: 600,
              color: "var(--warning)",
              marginBottom: ".375rem",
              letterSpacing: ".04em",
              textTransform: "uppercase",
            }}
          >
            ポイント
          </p>
          <p
            style={{
              fontSize: ".9375rem",
              color: "var(--text-1)",
              margin: 0,
              lineHeight: 1.85,
            }}
          >
            {question.point}
          </p>
        </div>
      )}

      {question.commonMistake && (
        <div
          style={{
            padding: ".875rem 1rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "3px solid var(--error)",
            borderRadius: "var(--radius)",
          }}
        >
          <p
            style={{
              fontSize: ".8125rem",
              fontWeight: 600,
              color: "var(--error)",
              marginBottom: ".375rem",
              letterSpacing: ".04em",
              textTransform: "uppercase",
            }}
          >
            ひっかけポイント
          </p>
          <p
            style={{
              fontSize: ".9375rem",
              color: "var(--text-1)",
              margin: 0,
              lineHeight: 1.85,
            }}
          >
            {question.commonMistake}
          </p>
        </div>
      )}

      <SourceList sources={question.sources} />
      {question.lawLinks && question.lawLinks.length > 0 && (
        <LawLinkList lawLinks={question.lawLinks} />
      )}
    </div>
  )
}

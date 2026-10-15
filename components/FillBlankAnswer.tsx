"use client"

import type { FC } from "react"
import type { Blank, Choice } from "types/question"

type Props = {
  blanks: Blank[]
  choices: Choice[]
  selectedAnswers: Record<string, string>
  onSelect: (blankId: string, choiceId: string) => void
  revealed: boolean
}

export const FillBlankAnswer: FC<Props> = ({
  blanks,
  choices,
  selectedAnswers,
  onSelect,
  revealed,
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
    {blanks.map((blank) => {
      const selected = selectedAnswers[blank.id]
      return (
        <div key={blank.id}>
          <p
            style={{
              fontSize: ".8125rem",
              fontWeight: 700,
              color: "var(--text-2)",
              marginBottom: ".5rem",
            }}
          >
            空欄［ {blank.id} ］
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".375rem" }}>
            {choices.map((choice) => {
              const isSelected = selected === choice.id
              const isCorrect = choice.id === blank.answer

              let bg = "var(--surface)"
              let border = "var(--border)"
              let color = "var(--text-2)"

              if (revealed) {
                if (isCorrect) {
                  bg = "var(--success-soft)"
                  border = "var(--success-line)"
                  color = "var(--success)"
                } else if (isSelected && !isCorrect) {
                  bg = "var(--error-soft)"
                  border = "var(--error-line)"
                  color = "var(--error)"
                } else {
                  color = "var(--text-3)"
                }
              } else if (isSelected) {
                bg = "var(--accent-soft)"
                border = "var(--accent-line)"
                color = "var(--accent)"
              }

              return (
                <button
                  key={choice.id}
                  onClick={() => !revealed && onSelect(blank.id, choice.id)}
                  disabled={revealed}
                  style={{
                    padding: ".375rem .75rem",
                    background: bg,
                    border: `1px solid ${border}`,
                    borderRadius: "var(--radius-sm)",
                    color,
                    fontSize: ".8125rem",
                    cursor: revealed ? "default" : "pointer",
                    fontWeight: isSelected ? 600 : 400,
                    lineHeight: 1.4,
                  }}
                >
                  {choice.id}. {choice.text}
                </button>
              )
            })}
          </div>
        </div>
      )
    })}
  </div>
)

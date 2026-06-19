"use client"

import type { FC } from "react"
import type { Choice } from "types/question"

type Props = {
  choices: Choice[]
  selectedAnswer: string | null
  correctAnswer: string
  onSelect: (choiceId: string) => void
  revealed: boolean
}

export const ChoiceList: FC<Props> = ({
  choices,
  selectedAnswer,
  correctAnswer,
  onSelect,
  revealed,
}) => (
  <ul
    style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: ".375rem",
    }}
  >
    {choices.map((choice) => {
      const isSelected = selectedAnswer === choice.id
      const isCorrect = choice.id === correctAnswer

      let bg = "var(--surface)"
      let border = "var(--border)"
      let color = "var(--text-1)"
      let labelColor = "var(--text-3)"

      if (revealed) {
        if (isCorrect) {
          bg = "rgba(74, 222, 128, 0.06)"
          border = "rgba(74, 222, 128, 0.3)"
          color = "var(--success)"
          labelColor = "var(--success)"
        } else if (isSelected && !isCorrect) {
          bg = "rgba(248, 113, 113, 0.06)"
          border = "rgba(248, 113, 113, 0.3)"
          color = "var(--error)"
          labelColor = "var(--error)"
        } else {
          color = "var(--text-3)"
        }
      } else if (isSelected) {
        bg = "rgba(94, 106, 210, 0.08)"
        border = "rgba(94, 106, 210, 0.5)"
        labelColor = "var(--accent)"
      }

      const label =
        choice.id === "true"
          ? "○"
          : choice.id === "false"
            ? "×"
            : choice.id.toUpperCase()

      return (
        <li key={choice.id}>
          <button
            onClick={() => !revealed && onSelect(choice.id)}
            disabled={revealed}
            style={{
              width: "100%",
              textAlign: "left",
              padding: ".75rem 1rem",
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: "var(--radius-sm)",
              color,
              fontSize: ".9375rem",
              cursor: revealed ? "default" : "pointer",
              lineHeight: 1.6,
              display: "flex",
              alignItems: "flex-start",
              gap: ".75rem",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: "1.375rem",
                height: "1.375rem",
                borderRadius: "50%",
                border: `1px solid ${border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: ".6875rem",
                fontWeight: 700,
                color: labelColor,
                marginTop: ".125rem",
              }}
            >
              {revealed && isCorrect
                ? "✓"
                : revealed && isSelected && !isCorrect
                  ? "✗"
                  : label}
            </span>
            <span>{choice.text}</span>
          </button>
        </li>
      )
    })}
  </ul>
)

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

export const ChoiceList: FC<Props> = ({ choices, selectedAnswer, correctAnswer, onSelect, revealed }) => (
  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".75rem" }}>
    {choices.map((choice) => {
      const isSelected = selectedAnswer === choice.id
      const isCorrect = choice.id === correctAnswer
      let bg = "#1a1a3e"
      let border = "#2a2a5a"
      let color = "#e2e8f0"

      if (revealed) {
        if (isCorrect) {
          bg = "#14532d"
          border = "#22c55e"
          color = "#86efac"
        } else if (isSelected && !isCorrect) {
          bg = "#450a0a"
          border = "#ef4444"
          color = "#fca5a5"
        }
      } else if (isSelected) {
        bg = "#1e1b4b"
        border = "#818cf8"
      }

      return (
        <li key={choice.id}>
          <button
            onClick={() => !revealed && onSelect(choice.id)}
            disabled={revealed}
            style={{
              width: "100%",
              textAlign: "left",
              padding: ".875rem 1.25rem",
              background: bg,
              border: `2px solid ${border}`,
              borderRadius: ".625rem",
              color,
              fontSize: ".9375rem",
              cursor: revealed ? "default" : "pointer",
              transition: "border-color .15s, background .15s",
              lineHeight: 1.5,
            }}
          >
            {revealed && isCorrect && "✓ "}
            {revealed && isSelected && !isCorrect && "✗ "}
            {choice.text}
          </button>
        </li>
      )
    })}
  </ul>
)

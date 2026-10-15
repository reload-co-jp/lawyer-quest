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
      gap: ".625rem",
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
          bg = "var(--success-soft)"
          border = "var(--success-line)"
          color = "var(--success)"
          labelColor = "var(--success)"
        } else if (isSelected && !isCorrect) {
          bg = "var(--error-soft)"
          border = "var(--error-line)"
          color = "var(--error)"
          labelColor = "var(--error)"
        } else {
          color = "var(--text-3)"
        }
      } else if (isSelected) {
        bg = "var(--accent-soft)"
        border = "var(--accent-line)"
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
            aria-pressed={!revealed ? isSelected : undefined}
            style={{
              width: "100%",
              textAlign: "left",
              padding: ".875rem 1rem",
              minHeight: "52px",
              background: bg,
              border: `${isSelected || (revealed && isCorrect) ? 2 : 1}px solid ${border}`,
              borderRadius: "var(--radius)",
              color,
              fontSize: "1rem",
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
            <span style={{ flex: 1 }}>{choice.text}</span>
            {(revealed ? isCorrect || isSelected : isSelected) && (
              <span
                className={
                  revealed
                    ? isCorrect
                      ? "badge badge-success"
                      : "badge badge-error"
                    : "badge"
                }
                style={{ alignSelf: "center" }}
              >
                {revealed ? (isCorrect ? "正解" : "あなたの解答") : "選択中"}
              </span>
            )}
          </button>
        </li>
      )
    })}
  </ul>
)

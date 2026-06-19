"use client"

import { FC, useState, useEffect, useRef } from "react"
import Link from "next/link"
import type { Question } from "types/question"
import { shuffle } from "lib/shuffle"
import { getFieldLabel, buildBalancedMockExam } from "lib/questions"
import { FillBlankAnswer } from "components/FillBlankAnswer"

type ExamCount = 20 | 40 | 60

type Phase = "setup" | "answering" | "results"

type Props = {
  allQuestions: Question[]
  examCounts?: ExamCount[]
  variant?: "random" | "balanced"
  layout?: "paged" | "all-in-one"
  title?: string
  description?: string
  poolNote?: string[]
}

const DEFAULT_POOL_NOTE = [
  "過去問200問からランダム出題",
  "解答中は正誤フィードバックなし",
  "未回答のまま次の問題に進める",
  "経過時間を計測（制限なし）",
]

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}分${s.toString().padStart(2, "0")}秒`
}

export const ExamClient: FC<Props> = ({
  allQuestions,
  examCounts = [20, 40, 60],
  variant = "random",
  layout = "paged",
  title = "過去問 模擬試験",
  description = "全問解答後にまとめて採点。解説は結果画面で確認できる。",
  poolNote = DEFAULT_POOL_NOTE,
}) => {
  const [phase, setPhase] = useState<Phase>("setup")
  const [count, setCount] = useState<ExamCount>(examCounts[0])
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [blankAnswers, setBlankAnswers] = useState<
    Record<string, Record<string, string>>
  >({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [reviewIndex, setReviewIndex] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const startExam = () => {
    const selected =
      variant === "balanced"
        ? buildBalancedMockExam()
        : shuffle(allQuestions).slice(0, count)
    setQuestions(selected)
    setAnswers({})
    setBlankAnswers({})
    setCurrentIndex(0)
    setElapsed(0)
    setPhase("answering")
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000)
  }

  const selectAnswer = (questionId: string, choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }))
  }

  const selectBlankAnswer = (
    questionId: string,
    blankId: string,
    choiceId: string
  ) => {
    setBlankAnswers((prev) => ({
      ...prev,
      [questionId]: { ...prev[questionId], [blankId]: choiceId },
    }))
  }

  const isQuestionAnswered = (q: Question): boolean =>
    q.format === "fill_blank"
      ? (q.blanks?.every((b) => blankAnswers[q.id]?.[b.id]) ?? false)
      : answers[q.id] !== undefined

  const isQuestionCorrect = (q: Question): boolean =>
    q.format === "fill_blank"
      ? (q.blanks?.every((b) => blankAnswers[q.id]?.[b.id] === b.answer) ??
        false)
      : answers[q.id] === q.answer

  const submitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase("results")
  }

  const answeredCount = questions.filter(isQuestionAnswered).length
  const allAnswered = answeredCount === questions.length

  const renderQuestionBody = (q: Question) => {
    const selectedAnswer = answers[q.id]
    return (
      <>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "2px solid var(--past)",
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
            {getFieldLabel(q) && (
              <span
                style={{
                  fontSize: ".6875rem",
                  padding: ".2rem .5rem",
                  background: "var(--surface-2)",
                  borderRadius: "99px",
                  color: "var(--past)",
                  border: "1px solid rgba(217,119,6,0.3)",
                }}
              >
                {getFieldLabel(q)}
              </span>
            )}
            {q.examYear && (
              <span
                style={{
                  fontSize: ".6875rem",
                  padding: ".2rem .5rem",
                  background: "var(--surface-2)",
                  borderRadius: "99px",
                  color: "var(--text-3)",
                  border: "1px solid var(--border)",
                }}
              >
                {q.examYear}年度
              </span>
            )}
            <span
              style={{
                fontSize: ".6875rem",
                padding: ".2rem .5rem",
                background: "var(--surface-2)",
                borderRadius: "99px",
                color: "var(--text-3)",
                border: "1px solid var(--border)",
              }}
            >
              {q.format === "true_false"
                ? "○×"
                : q.format === "fill_blank"
                  ? "穴埋め"
                  : "4択"}
            </span>
          </div>
          <p
            style={{
              fontSize: ".9375rem",
              color: "var(--text-1)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {q.question}
          </p>
        </div>

        {q.format === "fill_blank" ? (
          <div style={{ marginBottom: "1rem" }}>
            <FillBlankAnswer
              blanks={q.blanks ?? []}
              choices={q.choices}
              selectedAnswers={blankAnswers[q.id] ?? {}}
              onSelect={(blankId, choiceId) =>
                selectBlankAnswer(q.id, blankId, choiceId)
              }
              revealed={false}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              marginBottom: "1rem",
            }}
          >
            {q.choices.map((choice) => {
              const isSelected = selectedAnswer === choice.id
              return (
                <button
                  key={choice.id}
                  onClick={() => selectAnswer(q.id, choice.id)}
                  style={{
                    padding: ".75rem 1rem",
                    background: isSelected
                      ? "rgba(217,119,6,0.12)"
                      : "var(--surface)",
                    border: `1px solid ${isSelected ? "var(--past)" : "var(--border)"}`,
                    color: isSelected ? "var(--past)" : "var(--text-1)",
                    fontSize: ".875rem",
                    textAlign: "left",
                    cursor: "pointer",
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    gap: ".75rem",
                    alignItems: "flex-start",
                    lineHeight: 1.6,
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      fontWeight: 700,
                      color: isSelected ? "var(--past)" : "var(--text-3)",
                      minWidth: "1.25rem",
                    }}
                  >
                    {choice.id.toUpperCase()}
                  </span>
                  <span>{choice.text}</span>
                </button>
              )
            })}
          </div>
        )}
      </>
    )
  }

  if (phase === "setup") {
    return (
      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "0 1rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <Link
            href="/quests"
            style={{
              fontSize: ".8125rem",
              color: "var(--text-3)",
              textDecoration: "none",
            }}
          >
            ← クエスト一覧
          </Link>
        </div>
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--text-1)",
            marginBottom: ".375rem",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: ".875rem",
            color: "var(--text-3)",
            marginBottom: "2rem",
          }}
        >
          {description}
        </p>

        {examCounts.length > 1 && (
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: ".75rem",
                color: "var(--text-3)",
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              問題数を選択
            </p>
            <div style={{ display: "flex", gap: ".75rem" }}>
              {examCounts.map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  style={{
                    flex: 1,
                    padding: ".875rem .5rem",
                    background:
                      count === n ? "var(--past)" : "var(--surface-2)",
                    border: `1px solid ${count === n ? "var(--past)" : "var(--border)"}`,
                    color: count === n ? "#fff" : "var(--text-2)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: ".25rem",
                  }}
                >
                  <span>{n}問</span>
                  <span
                    style={{
                      fontSize: ".6875rem",
                      fontWeight: 400,
                      opacity: 0.8,
                    }}
                  >
                    {n === 60 ? "本番相当" : n === 40 ? "標準" : "ショート"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
            fontSize: ".8125rem",
            color: "var(--text-2)",
            lineHeight: 1.75,
          }}
        >
          {poolNote.map((note) => (
            <p key={note} style={{ margin: 0 }}>
              ・ {note}
            </p>
          ))}
        </div>

        <button
          onClick={startExam}
          style={{
            width: "100%",
            padding: ".875rem",
            background: "var(--past)",
            border: "none",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer",
            borderRadius: "var(--radius-sm)",
            letterSpacing: "-.01em",
          }}
        >
          試験開始 →
        </button>
      </div>
    )
  }

  if (phase === "answering" && layout === "all-in-one") {
    return (
      <div
        style={{ maxWidth: "640px", margin: "0 auto", padding: "0 1rem 2rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem",
          }}
        >
          <span
            style={{
              fontSize: ".8125rem",
              color: "var(--text-3)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ⏱ {formatTime(elapsed)}
          </span>
          <span style={{ fontSize: ".8125rem", color: "var(--text-3)" }}>
            回答済: {answeredCount}/{questions.length}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {questions.map((q, i) => (
            <div key={q.id}>
              <p
                style={{
                  fontSize: ".75rem",
                  color: "var(--text-3)",
                  fontWeight: 600,
                  letterSpacing: ".04em",
                  marginBottom: ".5rem",
                }}
              >
                問{i + 1}
              </p>
              {renderQuestionBody(q)}
            </div>
          ))}
        </div>

        <button
          onClick={submitExam}
          disabled={!allAnswered}
          style={{
            width: "100%",
            padding: ".875rem",
            background: allAnswered ? "var(--past)" : "var(--surface-2)",
            border: `1px solid ${allAnswered ? "var(--past)" : "var(--border)"}`,
            color: allAnswered ? "#fff" : "var(--text-3)",
            fontSize: ".9375rem",
            fontWeight: 700,
            cursor: allAnswered ? "pointer" : "not-allowed",
            borderRadius: "var(--radius-sm)",
            letterSpacing: "-.01em",
            marginTop: "1.5rem",
          }}
        >
          {allAnswered
            ? "採点する →"
            : `残り ${questions.length - answeredCount} 問未回答`}
        </button>
      </div>
    )
  }

  if (phase === "answering") {
    const current = questions[currentIndex]

    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              fontSize: ".8125rem",
              color: "var(--text-3)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {currentIndex + 1} / {questions.length}
          </span>
          <span
            style={{
              fontSize: ".8125rem",
              color: "var(--text-3)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ⏱ {formatTime(elapsed)}
          </span>
          <span style={{ fontSize: ".8125rem", color: "var(--text-3)" }}>
            回答済: {answeredCount}/{questions.length}
          </span>
        </div>

        {/* 問題ナビゲーション */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            marginBottom: "1.25rem",
            padding: ".75rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          {questions.map((q, i) => {
            const answered = answers[q.id] !== undefined
            const isCurrent = i === currentIndex
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: "28px",
                  height: "28px",
                  fontSize: ".6875rem",
                  fontWeight: isCurrent ? 700 : 400,
                  background: isCurrent
                    ? "var(--past)"
                    : answered
                      ? "rgba(217,119,6,0.2)"
                      : "var(--surface-2)",
                  border: `1px solid ${isCurrent ? "var(--past)" : answered ? "rgba(217,119,6,0.4)" : "var(--border)"}`,
                  color: isCurrent
                    ? "#fff"
                    : answered
                      ? "var(--past)"
                      : "var(--text-3)",
                  cursor: "pointer",
                  borderRadius: "4px",
                  lineHeight: 1,
                }}
              >
                {i + 1}
              </button>
            )
          })}
        </div>

        {renderQuestionBody(current)}

        {/* ナビゲーションボタン */}
        <div style={{ display: "flex", gap: ".5rem", marginBottom: ".75rem" }}>
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            style={{
              flex: 1,
              padding: ".625rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: currentIndex === 0 ? "var(--text-3)" : "var(--text-2)",
              fontSize: ".875rem",
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              borderRadius: "var(--radius-sm)",
            }}
          >
            ← 前の問題
          </button>
          <button
            onClick={() =>
              setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))
            }
            disabled={currentIndex === questions.length - 1}
            style={{
              flex: 1,
              padding: ".625rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color:
                currentIndex === questions.length - 1
                  ? "var(--text-3)"
                  : "var(--text-2)",
              fontSize: ".875rem",
              cursor:
                currentIndex === questions.length - 1
                  ? "not-allowed"
                  : "pointer",
              borderRadius: "var(--radius-sm)",
            }}
          >
            次の問題 →
          </button>
        </div>

        <button
          onClick={submitExam}
          disabled={!allAnswered}
          style={{
            width: "100%",
            padding: ".875rem",
            background: allAnswered ? "var(--past)" : "var(--surface-2)",
            border: `1px solid ${allAnswered ? "var(--past)" : "var(--border)"}`,
            color: allAnswered ? "#fff" : "var(--text-3)",
            fontSize: ".9375rem",
            fontWeight: 700,
            cursor: allAnswered ? "pointer" : "not-allowed",
            borderRadius: "var(--radius-sm)",
            letterSpacing: "-.01em",
          }}
        >
          {allAnswered
            ? "採点する →"
            : `残り ${questions.length - answeredCount} 問未回答`}
        </button>
      </div>
    )
  }

  // results phase
  const correct = questions.filter(isQuestionCorrect).length
  const total = questions.length
  const pct = Math.round((correct / total) * 100)

  const areaStats: Record<string, { correct: number; total: number }> = {}
  for (const q of questions) {
    const area = getFieldLabel(q) ?? "その他"
    if (!areaStats[area]) areaStats[area] = { correct: 0, total: 0 }
    areaStats[area].total += 1
    if (isQuestionCorrect(q)) areaStats[area].correct += 1
  }

  return (
    <div
      style={{ maxWidth: "640px", margin: "0 auto", padding: "0 1rem 3rem" }}
    >
      {/* スコアカード */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderLeft: "2px solid var(--past)",
          padding: "1.5rem",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: ".75rem",
            color: "var(--text-3)",
            fontWeight: 600,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            marginBottom: ".5rem",
          }}
        >
          模擬試験 結果
        </p>
        <p
          style={{
            fontSize: "3.5rem",
            fontWeight: 700,
            color: "var(--past)",
            letterSpacing: "-.03em",
            margin: ".25rem 0",
          }}
        >
          {pct}
          <span style={{ fontSize: "1.25rem" }}>%</span>
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--text-2)",
            margin: "0 0 .75rem",
          }}
        >
          {correct} / {total} 問正解
        </p>
        <p style={{ fontSize: ".8125rem", color: "var(--text-3)" }}>
          経過時間: {formatTime(elapsed)}
        </p>
      </div>

      {/* 分野別 */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          padding: "1rem 1.25rem",
          marginBottom: "1.25rem",
        }}
      >
        <p
          style={{
            fontSize: ".75rem",
            color: "var(--text-3)",
            fontWeight: 600,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            marginBottom: ".875rem",
          }}
        >
          分野別得点
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {Object.entries(areaStats).map(([area, stat]) => {
            const areaPct = Math.round((stat.correct / stat.total) * 100)
            return (
              <div key={area}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: ".25rem",
                  }}
                >
                  <span
                    style={{ fontSize: ".8125rem", color: "var(--text-2)" }}
                  >
                    {area}
                  </span>
                  <span
                    style={{
                      fontSize: ".8125rem",
                      color: "var(--text-1)",
                      fontWeight: 600,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {stat.correct}/{stat.total}問 ({areaPct}%)
                  </span>
                </div>
                <div
                  style={{
                    height: "4px",
                    background: "var(--border)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${areaPct}%`,
                      background:
                        areaPct >= 70
                          ? "var(--success)"
                          : areaPct >= 50
                            ? "var(--warning)"
                            : "var(--error)",
                      borderRadius: "2px",
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 問題一覧・解説 */}
      <p
        style={{
          fontSize: ".75rem",
          color: "var(--text-3)",
          fontWeight: 600,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          marginBottom: ".75rem",
        }}
      >
        全問解説
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          marginBottom: "1.5rem",
        }}
      >
        {questions.map((q, i) => {
          const isCorrect = isQuestionCorrect(q)
          const isOpen = reviewIndex === i

          return (
            <div
              key={q.id}
              style={{
                background: "var(--surface)",
                border: `1px solid ${isCorrect ? "rgba(74,222,128,0.2)" : "rgba(239,68,68,0.2)"}`,
                borderLeft: `2px solid ${isCorrect ? "var(--success)" : "var(--error)"}`,
              }}
            >
              <button
                onClick={() => setReviewIndex(isOpen ? null : i)}
                style={{
                  width: "100%",
                  padding: ".75rem 1rem",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: ".75rem",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    fontWeight: 700,
                    fontSize: ".875rem",
                    color: isCorrect ? "var(--success)" : "var(--error)",
                    minWidth: "1.5rem",
                  }}
                >
                  {isCorrect ? "○" : "✗"}
                </span>
                <span
                  style={{
                    fontSize: ".8125rem",
                    color: "var(--text-2)",
                    flex: 1,
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{ color: "var(--text-3)", marginRight: ".375rem" }}
                  >
                    問{i + 1}.
                  </span>
                  {q.question.length > 60
                    ? q.question.slice(0, 60) + "…"
                    : q.question}
                </span>
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: ".6875rem",
                    color: "var(--text-3)",
                  }}
                >
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: "0 1rem 1rem",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{
                      fontSize: ".875rem",
                      color: "var(--text-1)",
                      lineHeight: 1.75,
                      margin: ".875rem 0",
                    }}
                  >
                    {q.question}
                  </p>

                  <div style={{ marginBottom: ".875rem" }}>
                    {q.format === "fill_blank" ? (
                      <FillBlankAnswer
                        blanks={q.blanks ?? []}
                        choices={q.choices}
                        selectedAnswers={blankAnswers[q.id] ?? {}}
                        onSelect={() => {}}
                        revealed
                      />
                    ) : (
                      q.choices.map((choice) => {
                        const isAnswer = choice.id === q.answer
                        const isSelected = choice.id === answers[q.id]
                        return (
                          <div
                            key={choice.id}
                            style={{
                              padding: ".5rem .75rem",
                              marginBottom: "3px",
                              background: isAnswer
                                ? "rgba(74,222,128,0.06)"
                                : isSelected
                                  ? "rgba(239,68,68,0.06)"
                                  : "var(--surface-2)",
                              border: `1px solid ${isAnswer ? "rgba(74,222,128,0.25)" : isSelected ? "rgba(239,68,68,0.25)" : "var(--border)"}`,
                              fontSize: ".8125rem",
                              color: isAnswer
                                ? "var(--success)"
                                : isSelected
                                  ? "var(--error)"
                                  : "var(--text-2)",
                              display: "flex",
                              gap: ".5rem",
                            }}
                          >
                            <span style={{ fontWeight: 700, flexShrink: 0 }}>
                              {choice.id.toUpperCase()}.
                            </span>
                            <span>{choice.text}</span>
                            {isAnswer && (
                              <span
                                style={{ marginLeft: "auto", flexShrink: 0 }}
                              >
                                ✓ 正解
                              </span>
                            )}
                            {isSelected && !isAnswer && (
                              <span
                                style={{
                                  marginLeft: "auto",
                                  flexShrink: 0,
                                  color: "var(--error)",
                                }}
                              >
                                あなたの回答
                              </span>
                            )}
                          </div>
                        )
                      })
                    )}
                  </div>

                  <div
                    style={{
                      padding: ".75rem",
                      background: "var(--surface-2)",
                      borderLeft: "2px solid var(--accent)",
                      marginBottom: ".5rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: ".6875rem",
                        color: "var(--accent)",
                        fontWeight: 600,
                        marginBottom: ".25rem",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                      }}
                    >
                      解説
                    </p>
                    <p
                      style={{
                        fontSize: ".8125rem",
                        color: "var(--text-1)",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {q.explanation}
                    </p>
                  </div>

                  {q.point && (
                    <div
                      style={{
                        padding: ".625rem .75rem",
                        background: "var(--surface-2)",
                        borderLeft: "2px solid var(--warning)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: ".6875rem",
                          color: "var(--warning)",
                          fontWeight: 600,
                          marginBottom: ".25rem",
                          letterSpacing: ".06em",
                          textTransform: "uppercase",
                        }}
                      >
                        ポイント
                      </p>
                      <p
                        style={{
                          fontSize: ".8125rem",
                          color: "var(--text-1)",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {q.point}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ display: "flex", gap: ".5rem" }}>
        <button
          onClick={() => {
            setPhase("setup")
            setReviewIndex(null)
          }}
          style={{
            flex: 1,
            padding: ".75rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-2)",
            fontSize: ".875rem",
            cursor: "pointer",
            borderRadius: "var(--radius-sm)",
          }}
        >
          もう一度
        </button>
        <Link
          href="/quests"
          style={{
            flex: 1,
            padding: ".75rem",
            background: "var(--accent-btn)",
            color: "#fff",
            fontSize: ".875rem",
            fontWeight: 600,
            textDecoration: "none",
            textAlign: "center",
            borderRadius: "var(--radius-sm)",
          }}
        >
          クエスト一覧
        </Link>
      </div>
    </div>
  )
}

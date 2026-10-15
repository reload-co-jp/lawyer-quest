"use client"

import { FC, useEffect, useState } from "react"
import Link from "next/link"
import type { Question } from "types/question"
import type { QuestId } from "types/quest"
import { ChoiceList } from "components/ChoiceList"
import { FillBlankAnswer } from "components/FillBlankAnswer"
import { ExplanationBox } from "components/ExplanationBox"
import { BookmarkButton } from "components/BookmarkButton"
import {
  getAnswerHistory,
  recordAnswer,
  removeWrongQuestion,
} from "lib/storage"
import { getAreaById, getQuestById } from "lib/quests"
import { XP_CORRECT, XP_WRONG } from "lib/stats"

type Props = {
  questions: Question[]
  questId: QuestId | "random"
  isRetry?: boolean
}

type AnswerState = {
  selected: string | null
  blanks: Record<string, string>
  revealed: boolean
  isCorrect: boolean
}

const EMPTY: AnswerState = {
  selected: null,
  blanks: {},
  revealed: false,
  isCorrect: false,
}

const FORMAT_LABEL = { true_false: "○×", fill_blank: "穴埋め" } as const

export const ChallengeClient: FC<Props> = ({
  questions,
  questId,
  isRetry = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerState[]>([])
  const [finished, setFinished] = useState(false)
  const [mastered, setMastered] = useState<string[]>([])

  // ?resume=1 → start at the first question never answered before
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("resume")) return
    const done = new Set(getAnswerHistory().map((h) => h.questionId))
    const idx = questions.findIndex((q) => !done.has(q.id))
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL/localStorage読込はクライアント専用
    if (idx > 0) setCurrentIndex(idx)
  }, [questions])

  const current = questions[currentIndex]
  const state = answers[currentIndex] ?? EMPTY
  const results = answers.filter((a) => a?.revealed)

  if (!current || finished) {
    const correct = results.filter((r) => r.isCorrect).length
    const total = results.length
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0
    const xp = correct * XP_CORRECT + (total - correct) * XP_WRONG
    const cleared = total === questions.length
    return (
      <div style={{ maxWidth: "480px", margin: "2rem auto" }}>
        <div
          className="card pop-in"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <p aria-hidden style={{ fontSize: "2.5rem" }}>
            {cleared ? "🏆" : "📘"}
          </p>
          <h2
            className="pixel"
            style={{ fontSize: "1.25rem", margin: ".5rem 0" }}
          >
            {cleared ? "QUEST CLEAR!" : "演習終了"}
          </h2>
          <p
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: "var(--accent)",
            }}
          >
            {pct}
            <span style={{ fontSize: "1.25rem" }}>%</span>
          </p>
          <p className="muted">
            {correct} / {total} 問正解
          </p>
          <p
            className="badge badge-warning"
            style={{ margin: "1rem 0 1.5rem" }}
          >
            +{xp} XP 獲得
          </p>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {correct < total && (
              <Link href="/retry" className="btn btn-secondary">
                間違えた問題に再挑戦
              </Link>
            )}
            <Link href="/progress" className="btn btn-primary">
              学習状況を確認 →
            </Link>
          </div>
          <Link
            href="/quests"
            className="btn btn-ghost"
            style={{ marginTop: ".5rem" }}
          >
            クエスト一覧へ
          </Link>
        </div>
      </div>
    )
  }

  const area = getAreaById(current.areaId)
  const quest = getQuestById(current.questId)
  const isFillBlank = current.format === "fill_blank"
  const isAnswerComplete = isFillBlank
    ? (current.blanks?.every((b) => state.blanks[b.id]) ?? false)
    : !!state.selected

  const update = (patch: Partial<AnswerState>) =>
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = { ...state, ...patch }
      return next
    })

  const handleReveal = () => {
    if (!isAnswerComplete || state.revealed) return
    const isCorrect = isFillBlank
      ? (current.blanks?.every((b) => state.blanks[b.id] === b.answer) ?? false)
      : state.selected === current.answer
    update({ revealed: true, isCorrect })
    recordAnswer({
      questionId: current.id,
      questId: questId === "random" ? current.questId : questId,
      areaId: current.areaId,
      selectedAnswer: isFillBlank
        ? JSON.stringify(state.blanks)
        : (state.selected as string),
      isCorrect,
      answeredAt: new Date().toISOString(),
    })
  }

  const go = (i: number) => {
    setCurrentIndex(i)
    window.scrollTo({ top: 0 })
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) setFinished(true)
    else go(currentIndex + 1)
  }

  const handleMastered = () => {
    removeWrongQuestion(current.id)
    setMastered((prev) => [...prev, current.id])
    handleNext()
  }

  const remaining = questions.length - results.length
  const progress = (results.length / questions.length) * 100

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          marginBottom: ".625rem",
        }}
      >
        <Link
          href={questId === "random" ? "/quests" : `/quests/${questId}`}
          className="btn btn-ghost"
          style={{
            minHeight: "36px",
            padding: ".25rem .5rem",
            fontSize: ".875rem",
          }}
        >
          ← 中断して戻る
        </Link>
        <span
          style={{
            fontSize: ".875rem",
            color: "var(--text-2)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          問題 <b style={{ color: "var(--text-1)" }}>{currentIndex + 1}</b> /{" "}
          {questions.length}
          {"　"}残り {remaining}問
        </span>
      </div>

      <div
        className="bar"
        role="progressbar"
        aria-label="解答済みの問題数"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={results.length}
        style={{ marginBottom: "1.25rem" }}
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <section
        className="card"
        aria-label="問題"
        style={{
          padding: "clamp(1.125rem, 3vw, 1.75rem)",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: ".75rem",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: ".375rem", flexWrap: "wrap" }}>
            {quest && (
              <span className="badge">
                {quest.title.replace("クエスト", "")}
              </span>
            )}
            {area && <span className="badge">{area.title}</span>}
            <span className="badge">
              {FORMAT_LABEL[current.format as keyof typeof FORMAT_LABEL] ??
                "4択"}
            </span>
            <span
              className="badge"
              aria-label={`難易度 ${current.difficulty} / 5`}
            >
              {"★".repeat(current.difficulty)}
              {"☆".repeat(5 - current.difficulty)}
            </span>
            {current.examYear && (
              <span className="badge">{current.examYear}年度</span>
            )}
          </div>
          <BookmarkButton
            type="question"
            id={current.id}
            title={current.question.slice(0, 40)}
            path={`/questions/${current.id}`}
          />
        </div>

        <p
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.9,
            whiteSpace: "pre-wrap",
          }}
        >
          {current.question}
        </p>
      </section>

      {isFillBlank ? (
        <FillBlankAnswer
          blanks={current.blanks ?? []}
          choices={current.choices}
          selectedAnswers={state.blanks}
          onSelect={(blankId, choiceId) =>
            !state.revealed &&
            update({ blanks: { ...state.blanks, [blankId]: choiceId } })
          }
          revealed={state.revealed}
        />
      ) : (
        <ChoiceList
          choices={current.choices}
          selectedAnswer={state.selected}
          correctAnswer={current.answer}
          onSelect={(choiceId) =>
            !state.revealed && update({ selected: choiceId })
          }
          revealed={state.revealed}
        />
      )}

      {!state.revealed ? (
        <button
          onClick={handleReveal}
          disabled={!isAnswerComplete}
          className="btn btn-primary"
          style={{ marginTop: "1rem", width: "100%" }}
        >
          {isAnswerComplete ? "解答する" : "選択肢を選んでください"}
        </button>
      ) : (
        <ExplanationBox question={current} isCorrect={state.isCorrect} />
      )}

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: ".5rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => go(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="btn btn-ghost"
        >
          ← 前の問題
        </button>
        {state.revealed && isRetry && !mastered.includes(current.id) && (
          <button
            onClick={handleMastered}
            className="btn btn-secondary"
            style={{ color: "var(--success)", flex: 1 }}
          >
            ✓ 攻略済みにする
          </button>
        )}
        {state.revealed && (
          <button
            onClick={handleNext}
            className="btn btn-primary"
            style={{ flex: 2 }}
          >
            {currentIndex + 1 >= questions.length ? "結果を見る" : "次の問題 →"}
          </button>
        )}
      </div>
    </div>
  )
}

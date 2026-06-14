import type { FC } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getQuestionById, getAllQuestions } from "lib/questions"
import { getAreaById, getQuestById, QUEST_COLORS } from "lib/quests"

export function generateStaticParams() {
  return getAllQuestions().map((q) => ({ questionId: q.id }))
}
import { SourceList } from "components/SourceList"
import { LawLinkList } from "components/LawLinkList"

type Props = {
  params: Promise<{ questionId: string }>
}

const Page: FC<Props> = async ({ params }) => {
  const { questionId } = await params
  const question = getQuestionById(questionId)
  if (!question) notFound()

  const area = getAreaById(question.areaId)
  const quest = getQuestById(question.questId)
  const color = quest ? QUEST_COLORS[quest.id] : "#818cf8"

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/wrong" style={{ fontSize: ".875rem", color: "#94a3b8", textDecoration: "none" }}>
          ← 戻る
        </Link>
      </div>

      <div
        style={{
          background: "#1a1a3e",
          border: "1px solid #2a2a5a",
          borderLeft: `4px solid ${color}`,
          borderRadius: ".75rem",
          padding: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {quest && (
            <span style={{ fontSize: ".75rem", padding: ".25rem .625rem", background: "#0f0f23", borderRadius: "999px", color }}>
              {quest.title}
            </span>
          )}
          {area && (
            <span style={{ fontSize: ".75rem", padding: ".25rem .625rem", background: "#0f0f23", borderRadius: "999px", color: "#94a3b8" }}>
              {area.title}
            </span>
          )}
          <span style={{ fontSize: ".75rem", padding: ".25rem .625rem", background: "#0f0f23", borderRadius: "999px", color: "#94a3b8" }}>
            難易度: {"★".repeat(question.difficulty)}{"☆".repeat(5 - question.difficulty)}
          </span>
        </div>

        <h1 style={{ fontSize: "1rem", color: "#e2e8f0", lineHeight: 1.7, margin: "0 0 1.5rem", fontWeight: 400 }}>
          {question.question}
        </h1>

        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ fontSize: ".75rem", color: "#94a3b8", marginBottom: ".5rem", fontWeight: 600 }}>選択肢</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".5rem" }}>
            {question.choices.map((choice) => (
              <li
                key={choice.id}
                style={{
                  padding: ".625rem 1rem",
                  background: choice.id === question.answer ? "#14532d" : "#0f0f23",
                  border: `1px solid ${choice.id === question.answer ? "#22c55e" : "#2a2a5a"}`,
                  borderRadius: ".5rem",
                  fontSize: ".875rem",
                  color: choice.id === question.answer ? "#86efac" : "#94a3b8",
                }}
              >
                {choice.id === question.answer && "✓ "}{choice.text}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <p style={{ fontSize: ".75rem", color: "#a5b4fc", fontWeight: 600, marginBottom: ".375rem" }}>解説</p>
          <p style={{ fontSize: ".875rem", color: "#e2e8f0", lineHeight: 1.7, margin: 0 }}>
            {question.explanation}
          </p>
        </div>

        {question.point && (
          <div style={{ padding: ".75rem", background: "#0f0f23", borderRadius: ".5rem", borderLeft: "3px solid #f59e0b", marginBottom: ".75rem" }}>
            <p style={{ fontSize: ".75rem", color: "#f59e0b", fontWeight: 600, margin: "0 0 .25rem" }}>⚡ ポイント</p>
            <p style={{ fontSize: ".875rem", color: "#e2e8f0", margin: 0 }}>{question.point}</p>
          </div>
        )}

        {question.commonMistake && (
          <div style={{ padding: ".75rem", background: "#0f0f23", borderRadius: ".5rem", borderLeft: "3px solid #ef4444", marginBottom: ".75rem" }}>
            <p style={{ fontSize: ".75rem", color: "#ef4444", fontWeight: 600, margin: "0 0 .25rem" }}>⚠ ひっかけポイント</p>
            <p style={{ fontSize: ".875rem", color: "#e2e8f0", margin: 0 }}>{question.commonMistake}</p>
          </div>
        )}

        <SourceList sources={question.sources} />
        {question.lawLinks && question.lawLinks.length > 0 && (
          <LawLinkList lawLinks={question.lawLinks} />
        )}

        {question.updatedAt && (
          <p style={{ marginTop: "1rem", fontSize: ".6875rem", color: "#64748b" }}>
            更新日: {question.updatedAt}
            {question.legalAsOf && ` · 法令基準日: ${question.legalAsOf}`}
          </p>
        )}
      </div>
    </div>
  )
}

export default Page

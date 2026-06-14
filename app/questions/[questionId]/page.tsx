import type { FC } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getQuestionById, getAllQuestions } from "lib/questions"
import { getAreaById, getQuestById } from "lib/quests"
import { SourceList } from "components/SourceList"
import { LawLinkList } from "components/LawLinkList"

const BASE_URL = "http://lawyer-quest.reload.co.jp"

export function generateStaticParams() {
  return getAllQuestions().map((q) => ({ questionId: q.id }))
}

const SUBJECT_COLOR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
}

type Props = { params: Promise<{ questionId: string }> }

const Page: FC<Props> = async ({ params }) => {
  const { questionId } = await params
  const question = getQuestionById(questionId)
  if (!question) notFound()

  const area = getAreaById(question.areaId)
  const quest = getQuestById(question.questId)
  const color = quest ? (SUBJECT_COLOR[quest.id] ?? "var(--accent)") : "var(--accent)"

  const correctChoice = question.choices.find((c) => c.id === question.answer)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: question.question,
    inLanguage: "ja",
    url: `${BASE_URL}/questions/${question.id}`,
    educationalLevel: "professional",
    about: quest ? { "@type": "Thing", name: quest.title } : undefined,
    hasPart: {
      "@type": "Question",
      name: question.question,
      acceptedAnswer: correctChoice
        ? { "@type": "Answer", text: correctChoice.text, comment: question.explanation }
        : undefined,
    },
    isPartOf: { "@type": "WebSite", name: "Lawyer Quest", url: BASE_URL },
  }

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ marginBottom: "1.25rem" }}>
        <Link href="/wrong" style={{ fontSize: ".8125rem", color: "var(--text-3)", textDecoration: "none" }}>
          ← 戻る
        </Link>
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderLeft: `2px solid ${color}`,
          padding: "1.25rem",
          marginBottom: ".75rem",
        }}
      >
        <div style={{ display: "flex", gap: ".375rem", flexWrap: "wrap", marginBottom: ".875rem" }}>
          {quest && (
            <span style={{ fontSize: ".6875rem", padding: ".15rem .5rem", background: "var(--surface-2)", color, border: "1px solid var(--border)", fontWeight: 600 }}>
              {quest.title}
            </span>
          )}
          {area && (
            <span style={{ fontSize: ".6875rem", padding: ".15rem .5rem", background: "var(--surface-2)", color: "var(--text-2)", border: "1px solid var(--border)" }}>
              {area.title}
            </span>
          )}
          <span style={{ fontSize: ".6875rem", padding: ".15rem .5rem", background: "var(--surface-2)", color: "var(--text-2)", border: "1px solid var(--border)" }}>
            {"★".repeat(question.difficulty)}{"☆".repeat(5 - question.difficulty)}
          </span>
        </div>

        <p style={{ fontSize: ".9375rem", color: "var(--text-1)", lineHeight: 1.75, marginBottom: "1.25rem", fontWeight: 400 }}>
          {question.question}
        </p>

        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ fontSize: ".6875rem", color: "var(--text-3)", marginBottom: ".5rem", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>選択肢</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1px" }}>
            {question.choices.map((choice) => (
              <li
                key={choice.id}
                style={{
                  padding: ".625rem .875rem",
                  background: choice.id === question.answer ? "rgba(74,222,128,0.06)" : "var(--surface-2)",
                  border: `1px solid ${choice.id === question.answer ? "rgba(74,222,128,0.25)" : "var(--border)"}`,
                  fontSize: ".875rem",
                  color: choice.id === question.answer ? "var(--success)" : "var(--text-2)",
                  display: "flex",
                  gap: ".5rem",
                }}
              >
                {choice.id === question.answer && <span style={{ fontWeight: 700 }}>✓</span>}
                <span>{choice.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <p style={{ fontSize: ".6875rem", color: "var(--text-3)", fontWeight: 600, marginBottom: ".375rem", letterSpacing: ".06em", textTransform: "uppercase" }}>解説</p>
          <p style={{ fontSize: ".875rem", color: "var(--text-1)", lineHeight: 1.75, margin: 0 }}>
            {question.explanation}
          </p>
        </div>

        {question.point && (
          <div style={{ padding: ".75rem", background: "var(--surface-2)", borderLeft: "2px solid var(--warning)", marginBottom: ".75rem" }}>
            <p style={{ fontSize: ".6875rem", color: "var(--warning)", fontWeight: 600, marginBottom: ".25rem", letterSpacing: ".06em", textTransform: "uppercase" }}>ポイント</p>
            <p style={{ fontSize: ".875rem", color: "var(--text-1)", margin: 0 }}>{question.point}</p>
          </div>
        )}

        {question.commonMistake && (
          <div style={{ padding: ".75rem", background: "var(--surface-2)", borderLeft: "2px solid var(--error)", marginBottom: ".75rem" }}>
            <p style={{ fontSize: ".6875rem", color: "var(--error)", fontWeight: 600, marginBottom: ".25rem", letterSpacing: ".06em", textTransform: "uppercase" }}>ひっかけポイント</p>
            <p style={{ fontSize: ".875rem", color: "var(--text-1)", margin: 0 }}>{question.commonMistake}</p>
          </div>
        )}

        <SourceList sources={question.sources} />
        {question.lawLinks && question.lawLinks.length > 0 && (
          <LawLinkList lawLinks={question.lawLinks} />
        )}

        {question.updatedAt && (
          <p style={{ marginTop: "1rem", fontSize: ".6875rem", color: "var(--text-3)" }}>
            更新日: {question.updatedAt}
            {question.legalAsOf && ` · 法令基準日: ${question.legalAsOf}`}
          </p>
        )}
      </div>
    </div>
  )
}

export default Page

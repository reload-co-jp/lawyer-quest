import type { FC } from "react"
import { notFound } from "next/navigation"
import { getAllQuests } from "lib/quests"

export function generateStaticParams() {
  return getAllQuests().map((q) => ({ questId: q.id }))
}

import Link from "next/link"
import type { QuestId } from "types/quest"
import { getQuestById, getAreasByQuestId } from "lib/quests"
import { getQuestionsByQuestId } from "lib/questions"

const SUBJECT_COLOR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
}

type Props = { params: Promise<{ questId: string }> }

const Page: FC<Props> = async ({ params }) => {
  const { questId } = await params
  const quest = getQuestById(questId as QuestId)
  if (!quest) notFound()

  const areas = getAreasByQuestId(quest.id)
  const questions = getQuestionsByQuestId(quest.id)
  const color = SUBJECT_COLOR[quest.id] ?? "var(--accent)"

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: ".5rem" }}>
        <Link href="/quests" style={{ fontSize: ".8125rem", color: "var(--text-3)", textDecoration: "none" }}>
          クエスト
        </Link>
        <span style={{ color: "var(--text-3)", fontSize: ".8125rem" }}>/</span>
        <span style={{ fontSize: ".8125rem", color: "var(--text-2)" }}>{quest.title}</span>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".375rem" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: color }} />
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-.02em" }}>
            {quest.title}
          </h1>
        </div>
        <p style={{ fontSize: ".875rem", color: "var(--text-2)", paddingLeft: "1.1875rem", marginBottom: ".5rem" }}>
          {quest.description}
        </p>
        <p style={{ fontSize: ".8125rem", color: "var(--text-3)", paddingLeft: "1.1875rem" }}>
          全{questions.length}問
        </p>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: ".8125rem", fontWeight: 600, color: "var(--text-3)", letterSpacing: ".04em", textTransform: "uppercase", marginBottom: ".75rem" }}>
          エリア
        </h2>
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
          {areas.map((area, i) => {
            const areaQ = questions.filter((q) => q.areaId === area.id)
            return (
              <div
                key={area.id}
                style={{
                  padding: ".75rem 1rem",
                  background: "var(--surface)",
                  borderBottom: i < areas.length - 1 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: ".9375rem", fontWeight: 500, color: "var(--text-1)" }}>
                    {area.title}
                  </p>
                  {area.description && (
                    <p style={{ margin: ".125rem 0 0", fontSize: ".75rem", color: "var(--text-2)" }}>
                      {area.description}
                    </p>
                  )}
                </div>
                <span style={{ fontSize: ".75rem", color: "var(--text-3)", flexShrink: 0 }}>
                  {areaQ.length}問
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <Link
        href={`/challenge/${quest.id}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: ".625rem 1.25rem",
          background: "var(--accent-btn)",
          borderRadius: "var(--radius-sm)",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: ".9375rem",
          letterSpacing: "-.01em",
        }}
      >
        チャレンジ開始 →
      </Link>
    </div>
  )
}

export default Page

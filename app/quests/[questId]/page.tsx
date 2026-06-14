import type { FC } from "react"
import { notFound } from "next/navigation"
import { getAllQuests } from "lib/quests"

export function generateStaticParams() {
  return getAllQuests().map((q) => ({ questId: q.id }))
}
import Link from "next/link"
import type { QuestId } from "types/quest"
import { getQuestById, getAreasByQuestId, QUEST_COLORS } from "lib/quests"

import { getQuestionsByQuestId } from "lib/questions"

type Props = {
  params: Promise<{ questId: string }>
}

const Page: FC<Props> = async ({ params }) => {
  const { questId } = await params
  const quest = getQuestById(questId as QuestId)
  if (!quest) notFound()

  const areas = getAreasByQuestId(quest.id)
  const questions = getQuestionsByQuestId(quest.id)
  const color = QUEST_COLORS[quest.id]

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <Link href="/quests" style={{ fontSize: ".875rem", color: "#94a3b8", textDecoration: "none" }}>
          ← クエスト一覧
        </Link>
      </div>

      <div
        style={{
          background: "#1a1a3e",
          border: `1px solid #2a2a5a`,
          borderLeft: `4px solid ${color}`,
          borderRadius: ".75rem",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ margin: "0 0 .5rem", fontSize: "1.5rem", color: "#e2e8f0" }}>{quest.title}</h1>
        <p style={{ margin: "0 0 1rem", fontSize: ".875rem", color: "#94a3b8" }}>{quest.description}</p>
        <p style={{ margin: 0, fontSize: ".875rem", color: "#64748b" }}>
          全{questions.length}問
        </p>
      </div>

      <h2 style={{ fontSize: "1rem", color: "#94a3b8", marginBottom: "1rem" }}>エリア一覧</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: ".625rem", marginBottom: "2rem" }}>
        {areas.map((area) => {
          const areaQuestions = questions.filter((q) => q.areaId === area.id)
          return (
            <div
              key={area.id}
              style={{
                background: "#1a1a3e",
                border: "1px solid #2a2a5a",
                borderRadius: ".625rem",
                padding: ".875rem 1.125rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: "#e2e8f0" }}>{area.title}</p>
                {area.description && (
                  <p style={{ margin: ".125rem 0 0", fontSize: ".75rem", color: "#94a3b8" }}>
                    {area.description}
                  </p>
                )}
              </div>
              <span style={{ fontSize: ".8125rem", color: "#64748b" }}>{areaQuestions.length}問</span>
            </div>
          )
        })}
      </div>

      <Link
        href={`/challenge/${quest.id}`}
        style={{
          display: "block",
          textAlign: "center",
          padding: "1rem",
          background: color,
          borderRadius: ".75rem",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "1rem",
        }}
      >
        チャレンジ開始 →
      </Link>
    </div>
  )
}

export default Page

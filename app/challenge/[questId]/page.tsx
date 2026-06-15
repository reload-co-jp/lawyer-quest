import type { FC } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { QuestId } from "types/quest"
import { getQuestById, getAllQuests } from "lib/quests"
import { getQuestionsByQuestId } from "lib/questions"
import { ChallengeClient } from "components/ChallengeClient"

const BASE_URL = "https://lawyer-quest.reload.co.jp"

export function generateStaticParams() {
  return getAllQuests().map((q) => ({ questId: q.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ questId: string }> }): Promise<Metadata> {
  const { questId } = await params
  const quest = getQuestById(questId as QuestId)
  if (!quest) return {}
  return {
    title: `${quest.title} チャレンジ`,
    description: `行政書士試験対策 — ${quest.title}の問題演習。${quest.description}`,
    alternates: { canonical: `${BASE_URL}/challenge/${quest.id}` },
    openGraph: {
      title: `${quest.title} チャレンジ | Lawyer Quest`,
      description: `行政書士試験対策 — ${quest.title}の問題演習。${quest.description}`,
      url: `${BASE_URL}/challenge/${quest.id}`,
    },
  }
}

const SUBJECT_COLOR: Record<string, string> = {
  administrative_law: "var(--admin)",
  civil_law: "var(--civil)",
  constitutional_law: "var(--const)",
  past_exam: "var(--past)",
}

type Props = { params: Promise<{ questId: string }> }

const Page: FC<Props> = async ({ params }) => {
  const { questId } = await params
  const quest = getQuestById(questId as QuestId)
  if (!quest) notFound()

  const questions = getQuestionsByQuestId(quest.id)
  const color = SUBJECT_COLOR[quest.id] ?? "var(--accent)"

  return (
    <div>
      <div
        style={{
          padding: ".625rem 1rem",
          background: "var(--surface)",
          borderBottom: `1px solid ${color}`,
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: ".625rem",
        }}
      >
        <div style={{ width: "5px", height: "5px", background: color }} />
        <p style={{ margin: 0, fontWeight: 600, color, fontSize: ".875rem" }}>
          {quest.title} — {questions.length}問
        </p>
      </div>
      <ChallengeClient questions={questions} questId={quest.id} />
    </div>
  )
}

export default Page

import type { FC } from "react"
import { notFound } from "next/navigation"
import type { QuestId } from "types/quest"
import { getQuestById, getAllQuests, QUEST_COLORS } from "lib/quests"
import { getQuestionsByQuestId } from "lib/questions"
import { ChallengeClient } from "components/ChallengeClient"

export function generateStaticParams() {
  return getAllQuests().map((q) => ({ questId: q.id }))
}

type Props = {
  params: Promise<{ questId: string }>
}

const Page: FC<Props> = async ({ params }) => {
  const { questId } = await params
  const quest = getQuestById(questId as QuestId)
  if (!quest) notFound()

  const questions = getQuestionsByQuestId(quest.id)
  const color = QUEST_COLORS[quest.id]

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          padding: ".75rem",
          background: "#1a1a3e",
          borderBottom: `2px solid ${color}`,
          marginBottom: "1rem",
          borderRadius: ".5rem",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700, color }}>⚔ {quest.title}</p>
      </div>
      <ChallengeClient questions={questions} questId={quest.id} />
    </div>
  )
}

export default Page

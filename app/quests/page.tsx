import type { FC } from "react"
import { getAllQuests } from "lib/quests"
import { getQuestionsByQuestId } from "lib/questions"
import { QuestCard } from "components/QuestCard"

const Page: FC = () => {
  const quests = getAllQuests()

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-.02em", marginBottom: "1.5rem" }}>
        クエスト一覧
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        {quests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} totalQuestions={getQuestionsByQuestId(quest.id).length} />
        ))}
      </div>
    </div>
  )
}

export default Page

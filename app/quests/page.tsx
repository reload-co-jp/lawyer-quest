import type { FC } from "react"
import { getAllQuests } from "lib/quests"
import { getQuestionsByQuestId } from "lib/questions"
import { QuestCard } from "components/QuestCard"

const Page: FC = () => {
  const quests = getAllQuests()

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1.5rem" }}>
        クエスト一覧
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {quests.map((quest) => {
          const questions = getQuestionsByQuestId(quest.id)
          return (
            <QuestCard
              key={quest.id}
              quest={quest}
              totalQuestions={questions.length}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Page

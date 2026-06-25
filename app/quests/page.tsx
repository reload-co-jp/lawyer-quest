import type { FC } from "react"
import type { Metadata } from "next"
import { getAllQuests } from "lib/quests"
import { BASE_URL, buildMetadata } from "lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "クエスト一覧",
  description:
    "行政書士試験対策クエスト。行政法・民法・憲法・過去問の4科目から演習問題に挑戦。",
  path: "/quests",
})
import { getQuestionsByQuestId } from "lib/questions"
import { QuestCard } from "components/QuestCard"

const Page: FC = () => {
  const quests = getAllQuests()
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "行政書士試験対策クエスト",
    description:
      "行政法・民法・憲法・過去問の4科目から演習問題に挑戦できる学習クエスト。",
    url: `${BASE_URL}/quests`,
    inLanguage: "ja",
    numberOfItems: quests.length,
    itemListElement: quests.map((quest, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: quest.title,
      url: `${BASE_URL}/quests/${quest.id}`,
    })),
  }

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--text-1)",
          letterSpacing: "-.02em",
          marginBottom: "1.5rem",
        }}
      >
        クエスト一覧
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        {quests.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            totalQuestions={getQuestionsByQuestId(quest.id).length}
          />
        ))}
      </div>
    </div>
  )
}

export default Page

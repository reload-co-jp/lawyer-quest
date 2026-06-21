export const dynamic = "force-static"

import type { MetadataRoute } from "next"
import { getAllArticles } from "lib/articles"
import { getAllQuests } from "lib/quests"
import { getAllQuestions, getQuestionsByQuestId } from "lib/questions"
import { BASE_URL } from "lib/seo"
import type { QuestId } from "types/quest"

function questLastModified(questId: QuestId): string {
  const dates = getQuestionsByQuestId(questId).map((q) => q.updatedAt)
  return dates.length > 0 ? dates.sort().at(-1)! : new Date().toISOString()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles().map((a) => ({
    url: `${BASE_URL}/articles/${a.id}`,
    lastModified: a.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const quests = getAllQuests().map((q) => ({
    url: `${BASE_URL}/quests/${q.id}`,
    lastModified: questLastModified(q.id),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const questions = getAllQuestions().map((q) => ({
    url: `${BASE_URL}/questions/${q.id}`,
    lastModified: q.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/quests`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/articles`, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${BASE_URL}/exam-guide`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/study-guide`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${BASE_URL}/basics`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${BASE_URL}/general-knowledge`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${BASE_URL}/exam`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/mock-exam`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${BASE_URL}/challenge/random`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...getAllQuests().map((q) => ({
      url: `${BASE_URL}/challenge/${q.id}`,
      lastModified: questLastModified(q.id),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...quests,
    ...articles,
    ...questions,
  ]
}

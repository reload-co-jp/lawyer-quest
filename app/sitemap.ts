export const dynamic = "force-static"

import type { MetadataRoute } from "next"
import { getAllArticles } from "lib/articles"
import { getAllQuests } from "lib/quests"
import { getAllQuestions } from "lib/questions"

const BASE_URL = "https://lawyer-quest.reload.co.jp"

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles().map((a) => ({
    url: `${BASE_URL}/articles/${a.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const quests = getAllQuests().map((q) => ({
    url: `${BASE_URL}/quests/${q.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const questions = getAllQuestions().map((q) => ({
    url: `${BASE_URL}/questions/${q.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/quests`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/articles`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/exam-guide`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/exam`, changeFrequency: "monthly", priority: 0.7 },
    ...quests,
    ...articles,
    ...questions,
  ]
}

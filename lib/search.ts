import type { SearchItem } from "types/search"
import { getAllTerms } from "lib/glossary"
import { getAllArticles, getArticleSearchText } from "lib/articles"
import { getAllQuestions } from "lib/questions"

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + "…" : text
}

export function buildSearchIndex(): SearchItem[] {
  const glossaryItems: SearchItem[] = getAllTerms().map((t) => ({
    id: `glossary-${t.id}`,
    type: "glossary",
    title: t.term,
    subtitle: t.field,
    text: [t.reading, t.description, t.tags.join(" ")].filter(Boolean).join(" "),
    url: `/glossary/${t.id}`,
  }))

  const articleItems: SearchItem[] = getAllArticles().map((a) => ({
    id: `article-${a.id}`,
    type: "article",
    title: a.title,
    subtitle: a.subjectLabel,
    text: [a.excerpt, getArticleSearchText(a.id)].filter(Boolean).join(" "),
    url: `/articles/${a.id}`,
  }))

  const questionItems: SearchItem[] = getAllQuestions().map((q) => ({
    id: `question-${q.id}`,
    type: "question",
    title: truncate(q.question, 60),
    subtitle: q.topic,
    text: [q.question, q.explanation, q.point, q.commonMistake, q.tags.join(" ")]
      .filter(Boolean)
      .join(" "),
    url: `/questions/${q.id}`,
  }))

  return [...glossaryItems, ...articleItems, ...questionItems]
}
